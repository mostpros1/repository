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
  questions: Record<string, string>;
  dateTimeSpans: DateTimeSpan[];
};


interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  repeatPassword: string;
  dob: string;

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
        <KvKForm setShowNoKvK={setShowNoKvK} />,


      ],
      onStepChange: () => { },
    });

  function signUp(registerData: RegisterData): void {
    const { email, phoneNumber, password, firstName, lastName } = registerData;

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
              name: stopXSS(firstName) + " " + stopXSS(lastName),
              email: stopXSS(email),
              profession: stopXSS(data.beroep),
              location: stopXSS(data.questions.question1),
              rating: "Unrated",
              bio: stopXSS(data.bio),
              availibility: Datums,
            },
            TableName: "Specialists",
          })
          .promise()
          .then(data => console.log(data.Attributes))
          .catch(console.error)

        dynamo
          .put({
            Item: {
              id: Math.floor(Math.random() * 1000000000),
              name: stopXSS(firstName),
              family_name: stopXSS(lastName),
              email: stopXSS(email),
              phone_number: stopXSS(phoneNumber),
              created_at: new Date().toISOString(),
              user_type: "PROFESSIONAL",
            },
            TableName: "users",
          })
          .promise()
          .then(data => console.log(data.Attributes))
          .catch(console.error)


        /*const user = await Auth.signIn(email, password);
        sessionStorage.setItem('accessToken', user.signInUserSession.accessToken.jwtToken);
        sessionStorage.setItem('idToken', user.signInUserSession.idToken.jwtToken);
        sessionStorage.setItem('refreshToken', user.signInUserSession.refreshToken.token);
      */
        navigate('/bevestig-email', { state: { email: email, postConfig: "PROFESSIONAL" } })
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
      console.log(data);
      navigate("/specialist-resultaat");
    }

    const userData: RegisterData = {
      email: data.email.trim(),
      password: data.password.trim(),
      repeatPassword: data.repeatPassword.trim(),
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      phoneNumber: data.phoneNumber.trim(),
      dob: "" // Add the 'dob' property here
    }
    console.log(Datums);
    /*try {
      signUp(userData);
    } catch (error) {
      console.error('Error signing up:', error);
      //setError(error.message || 'Er is een fout opgetreden bij het aanmelden.');
    }*/

  }

  const stepWidth = 100 / steps.length;


  function addProfessional(name: string, email: string, profession: string, location: string, price: number, rating: number, bio: string, availibility: string[]) {
    console.log(availibility);


    //availibility is als Datums opgeslagen

    const params = {
      TableName: "Specialists",
      Item: {
        id: Math.floor(Math.random() * 1000000),
        name: name,
        email: email,
        profession: profession,
        location: location,
        price: price,
        rating: rating,
        bio: bio,
        availibility: availibility,

      },
    };
    try {
      dynamo.put(params).promise();
    } catch (error) {
      console.error("Er is een fout opgetreden bij het opslaan: ", error);
      //delete user
    }
  }


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