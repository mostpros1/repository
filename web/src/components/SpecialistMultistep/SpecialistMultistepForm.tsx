import { useState } from 'react';
import SearchChoreForm from "./SearchChoreForm/SearchChoreForm";
import { RegisterForm } from "../MultistepForm/RegisterForm";
import { FormEvent } from "react";
import { useMultistepForm } from "../../hooks/useMultistepForm";
import { useNavigate } from "react-router-dom";
import HomeButton from "../ui/HomeButton/HomeButton";
import TestQ from "./SpecialistQ/TestQ/TestQ";
import KvKForm from "./KvKForm/KvKForm";
import NoKvK from "./NoKvK/NoKvK";
import './/SpecialistMultistepForm.css';
import { Margin } from "@mui/icons-material";
import React from 'react';
import Calendar from './Calendar';
import { Auth } from 'aws-amplify';
import { AccountForm } from "../MultistepForm/AccountForm";
import { Datums } from "./Calendar.tsx";
import { dynamo } from "../../../declarations.ts";
import { stopXSS } from "./../../../../backend_functions/stopXSS.ts";
import { taal } from "../ui/NavBar/Navigation";


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
  bio: string;
  task: string;
  questions: Record<string, string>;
  dateTimeSpans: DateTimeSpan[];
  kvk: number;
  bedrijf: string;
};


interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  repeatPassword: string;
  dob: string;
  bio: string;
  region: string;
  postcode: string;
  profession: string;
  task: string;
  rating: 0;
  availibility: string[];
  kvk: number;
  bedrijf: string;

}
// const [isLoggingIn, setIsLoggingIn] = useState(true);

const INITIAL_DATA: FormData = {
  beroep: "",
  bio: "",
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
  },
  dateTimeSpans: [{ date: new Date(), startTime: "", endTime: "" }],
  task: '',
  kvk: 0,
  bedrijf: ''
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
        ...questionsSteps,
        <DateForm
          dateTimeSpans={data.dateTimeSpans}
          updateFields={(newFields) => setData((prev) => ({ ...prev, ...newFields }))}
        />,
        <AccountForm formConfig={"HOMEOWNER"} setError={() => { }} error={""} {...data} updateFields={updateFields} />,
        <KvKForm setShowNoKvK={setShowNoKvK} updateFields={updateFields} />,


      ],
      onStepChange: () => { },
    });

  function signUp(registerData: RegisterData): void {
    const { firstName, lastName, email, phoneNumber, password, /*bio,*/ region, postcode, profession, /*task, */rating, availibility, kvk, bedrijf } = registerData;


    const signUpProf = async () => {
      try {
        await Auth.signUp({
          username: email,
          password: password,
          attributes: {
            phone_number: phoneNumber,
            name: firstName,
            "custom:family_name": lastName,
          },
          autoSignIn: { enabled: true },
        });

        dynamo
          .put({
            Item: {
              id: Math.floor(Math.random() * 1000000000),
              //bio: bio !== undefined ? stopXSS(bio) : "", // Check if bio is not undefined
              email: email !== undefined ? stopXSS(email) : "", // Check if email is not undefined
              first_name: firstName !== undefined ? stopXSS(firstName) : "", // Check if firstName is not undefined
              last_name: lastName !== undefined ? stopXSS(lastName) : "", // Check if lastName is not undefined
              region: region !== undefined ? stopXSS(region) : "", // Check if region is not undefined
              postcode: postcode !== undefined ? stopXSS(postcode) : "", // Check if postcode is not undefined
              profession: profession !== undefined ? stopXSS(profession).toLowerCase() : "", // Check if profession is not undefined
              //task: task !== undefined ? stopXSS(task) : "", // Check if task is not undefined
              availibility: availibility, // Assuming availibility is already checked elsewhere
              rating: rating, // Assuming rating is already checked elsewhere
              kvk: kvk, // Assuming kvk is already checked elsewhere
              bedrijf: bedrijf !== undefined ? stopXSS(bedrijf) : "", // Check if bedrijf is not undefined
            },
            TableName: "Professionals",
          })
          .promise()
          .then(data => console.log(data.Attributes))
          .catch(console.error);

        dynamo
          .put({
            Item: {
              id: Math.floor(Math.random() * 1000000000),

              email: stopXSS(email),
              first_name: stopXSS(firstName),
              last_name: stopXSS(lastName),
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              status: "PENDING",
              user_role: "PROFESSIONAL"

            },
            TableName: "Users",
          })
          .promise()
          .catch(console.error)
          
          dynamo.put({
            TableName: "Uuids",
            Item: {
              id: Math.random().toString(36).substring(2),
              email: stopXSS(email),
              identifyingName: Math.random().toString(36).substring(2, 15)
            },
          }).promise();

        navigate(`/${taal}/confirm-mail`, { state: { email: email, postConfig: "PROFESSIONAL" } })
        } catch (error: any) {
        console.error('Error signing up:', error);
        //setError(error.message || 'Er is een fout opgetreden bij het aanmelden.');
      }
    };

    signUpProf();
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) {
      return next()
    } else {

      const userData: RegisterData = {
        email: data.email.trim(),
        password: data.password.trim(),
        repeatPassword: data.repeatPassword.trim(),
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        phoneNumber: data.phoneNumber.trim(),
        dob: "", // Add the 'dob' property here
        bio: data.bio,
        region: data.questions.question1,
        postcode: data.postCode,
        profession: data.beroep,
        task: data.task,
        availibility: Datums,
        kvk: data.kvk,
        bedrijf: data.bedrijf,
        rating: 0
      }
      console.log(Datums);
      try {
        console.log("prof: ", userData)
        signUp(userData);

      } catch (error) {
        console.error('Error signing up:', error);
        //setError(error.message || 'Er is een fout opgetreden bij het aanmelden.');
      }

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
