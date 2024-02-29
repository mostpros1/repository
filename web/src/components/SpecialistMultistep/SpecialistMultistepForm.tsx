import SearchChoreForm from "./SearchChoreForm/SearchChoreForm";
import { RegisterForm } from "../MultistepForm/RegisterForm";
import { FormEvent } from "react";
import { useMultistepForm } from "../../hooks/useMultistepForm";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeButton from "../ui/HomeButton/HomeButton";
import TestQ from "./SpecialistQ/TestQ/TestQ";
import KvKForm from "./KvKForm/KvKForm";
import NoKvK from "./NoKvK/NoKvK";
import './/SpecialistMultistepForm.css';
import { Margin } from "@mui/icons-material";
import React from 'react';
import { getItem } from '../../../../backend_functions/searchData.ts';
import { Auth } from 'aws-amplify';

import { addAvailibility } from '../../../../backend_functions/addData.ts';
import { addProfessionals } from '../../../../backend_functions/addData.ts';
import { dynamo } from '../../../../backend_functions/declerations.ts';

import Calendar from './Calendar';

export const professionalId: number = Math.floor(Math.random() * 1000000);


type DateTimeSpan = {
  date: Date;
  startTime: string;
  endTime: string;
};

type FormData = {
  beroep: string;
  email: string;
  postCode: string;
  stad: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  repeatPassword: string;
  questions: Record<string, string>;
  dateTimeSpans: DateTimeSpan[];
};

// const [isLoggingIn, setIsLoggingIn] = useState(true);

const INITIAL_DATA: FormData = {
  beroep: "",
  email: "",
  postCode: "",
  stad: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  password: "",
  repeatPassword: "",
  questions: {
    question1: "",
    question2: "",
    question3: "",
  },
  dateTimeSpans: [{ date: new Date(), startTime: "", endTime: "" }],
};

type Question = {
  key: string;
  label: string;
  options: string[];
};

const questionsData: Question[] = [
  {
    key: "question1",
    label: "In welke omgeving wilt u werken",
    options: [
      "Amsterdam",
      "Den Haag",
      "Rotterdam",
      "Groningen",
      "Utrecht",
      "Eindhoven",
    ],
  },
  {
    key: "question2",
    label: "Wat is uw specialisatie",
    options: [
      "Web Development",
      "Data Science",
      "Design",
      "Marketing",
      "Anders",
    ],
  },/*
  {
    key: "question3",
    label: "Wat is uw specialisaties",
    options: [
      "Web Developmenta",
      "Data Science",
      "Design",
      "Marketing",
      "Anders",
    ],
  },*/
  // ... voeg andere vragen toe zoals nodig
];

function SpecialistMultistepForm() {
  const [data, setData] = useState(INITIAL_DATA);
  const [showNoKvK, setShowNoKvK] = useState(false);

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => ({ ...prev, ...fields }));
  }

  function updateQuestionAnswers(questionKey: string, answer: string) {
    setData((prev) => {
      if (typeof prev === "function") {
        return prev as FormData;
      }

      const prevData = prev as FormData;

      return {
        ...prevData,
        questions: updateQuestions(prevData.questions, {
          [questionKey]: answer,
        }),
      };
    });
  }

  function updateQuestions(
    prevQuestions: Record<string, string>,
    answers: Record<string, string>
  ): Record<string, string> {
    const filteredAnswers: Record<string, string> = {};

    for (const key in answers) {
      if (Object.prototype.hasOwnProperty.call(answers, key)) {
        const value = answers[key];
        if (value !== undefined) {
          filteredAnswers[key] = value;
        }
      }
    }

    const updatedQuestions: Record<string, string> = {
      ...prevQuestions,
      ...filteredAnswers,
    };

    return updatedQuestions;
  }

  const navigate = useNavigate();

  const questionsSteps = questionsData.map((question) => (
    <TestQ
      key={question.key}
      question={question} // Voeg de vraag als prop toe
      questions={data.questions}
      updateQuestionAnswers={(answers) => {
        updateQuestionAnswers(question.key, answers[question.key] as string);
      }}
    />
  ));

  function DateForm({ dateTimeSpans, updateFields }) {
    const addDateTimeSpan = () => {
      if (dateTimeSpans.length < 5) {
        const newDateTimeSpan = { date: new Date(), startTime: "", endTime: "" };
        updateFields({ dateTimeSpans: [...dateTimeSpans, newDateTimeSpan] });
      }
    };

    const handleDateTimeSpanChange = (index, field, value) => {
      const updatedDateTimeSpans = dateTimeSpans.map((span, i) => {
        if (i === index) {
          return { ...span, [field]: field === 'date' ? new Date(value) : value };
        }
        return span;
      });
      updateFields({ dateTimeSpans: updatedDateTimeSpans });
    };

    const removeDateTimeSpan = (indexToRemove) => {
      if (dateTimeSpans.length > 1) {
        const updatedDateTimeSpans = dateTimeSpans.filter((_, index) => index !== indexToRemove);
        updateFields({ dateTimeSpans: updatedDateTimeSpans });
      }
    };

    return (
      <form action="" method="POST">
        <div>
          <h1>Selecteer uw beschikbaarheid:</h1>
          <Calendar />
        </div>
      </form>
    );
  }

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm({
      steps: [
        <SearchChoreForm {...data} updateFields={updateFields} />,
        <DateForm
          dateTimeSpans={data.dateTimeSpans}
          updateFields={(newFields) => setData((prev) => ({ ...prev, ...newFields }))}
        />,
        ...questionsSteps,
        <KvKForm setShowNoKvK={setShowNoKvK} />,
      ],
      onStepChange: () => { },
    });

  function queryUsers(username: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
      const params = {
        TableName: "users",
        IndexName: 'username',
        KeyConditionExpression: 'email = :username',
        ExpressionAttributeValues: {
          ':username': username
        }
      };

      dynamo.query(params, function (err, data) {
        if (err) {
          console.error('Unable to query. Error:', JSON.stringify(err, null, 2));
          reject(err);
        } else {
          if (data.Items && data.Items.length === 0) {
            console.log('User not found.');
            resolve(null);
          } else {
            console.log(data.Items && data.Items[0].email);
            resolve(data.Items && data.Items[0].email);
          }
        }
      });
    });
  }


  async function handelFormData(data: FormData) {
      /*const currentUser = await Auth.currentAuthenticatedUser();
      const { username, attributes } = currentUser;
      const { sub: userId } = attributes;
      const signInDetails = currentUser.signInUserSession;

      console.log(`The username: ${username}`);
      console.log(`The userId: ${userId}`);
      console.log(`The signInDetails: ${JSON.stringify(signInDetails)}`);
      const userData = getItem("users", userId);
      console.log(`The userData: ${JSON.stringify(userData)}`);*/

      //met de gegevens met de datums verwerken voor availibility.
      //const professionalId: number = Math.floor(Math.random() * 1000000);

      //const availibilityId: number = Math.floor(Math.random() * 1000000);


      try {
        const email = await queryUsers(data.email);
        if (email) {
          addProfessionals(professionalId, email, data.phoneNumber, data.postCode, data.questions.question1, data.questions.question2, "slug(moetnog)");
        } else {
          console.log('Email not found for the given username.');
        }
      } catch (err) {
        console.log(err);
      }
    }

  async function onSubmit(e: FormEvent) {
      e.preventDefault();
      if (!isLastStep) {
        return next();
      } else {
        console.log(data);
        queryUsers(data.email);
        handelFormData(data);
        navigate("/specialist-resultaat");
      }
    }

    const stepWidth = 100 / steps.length;

    return (
      <form onSubmit={onSubmit} className="form-con">
        <div className="progress-con">
          <h3>
            Stap {currentStepIndex + 1} van {steps.length}
          </h3>
          <div className="progress-bar">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`progress-step ${index <= currentStepIndex ? "active" : ""
                  }`}
                style={{ width: `${stepWidth}%` }}
              ></div>
            ))}
          </div>
        </div>
        {showNoKvK ? <NoKvK /> : <>{step}</>}
        <>
          <div className="btn-wrapper">
            <button
              type="button"
              onClick={() => {
                showNoKvK ? setShowNoKvK(false) : back();
              }}
              className={`form-btn back${showNoKvK ? " with-no-kvk" : ""}`}
              style={{ display: isFirstStep ? 'none' : 'inline-block' }}
            >
              Vorige
            </button>
            {showNoKvK ? <></> : <button type="submit" className="form-btn">
              {isLastStep ? "Verstuur" : "Volgende"}
            </button>}

          </div>
        </>
      </form>
    );
  }

  export default SpecialistMultistepForm;