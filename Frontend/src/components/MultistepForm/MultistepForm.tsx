import './MultistepForm.css'
import { useState } from 'react'
import { FormEvent } from "react"
import { LocationForm } from './LocationForm'
import CategoryForm from './CategoryForm'
import { InfoForm } from './InfoForm'
import { EmailForm } from './EmailForm'
import { useHomeOwnerMultistepForm } from '../../hooks/useHomeOwnerMultistepform'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'
import axios from 'axios'

type FormData = {
  postCode: string
  stad: string
  questions: Record<string, string>;
  aanvullendeInformatie: string
  info: string
  email: string
  loginEmail: string
  loginPassword: string
  firstName: string
  lastName: string
  registerEmail: string
  phoneNumber: string
  registerPassword: string
  repeatRegisterPassword: string
}

const INITIAL_DATA: FormData = {
  postCode: "",
  stad: "",
  questions: {
    question1: "",
    question2: "",
    question3: "",
  },
  aanvullendeInformatie: "",
  info: "",
  email: "",
  loginEmail: "",
  loginPassword: "",
  firstName: "",
  lastName: "",
  registerEmail: "",
  phoneNumber: "",
  registerPassword: "",
  repeatRegisterPassword: ""
}

type Question = {
  key: string;
  label: string;
  options: string[];
};

const questionsData: Question[] = [
  {
    key: "question1",
    label: "Wat moet er gedaan worden",
    options: [
      "Nieuwe leiding aanleggen",
      "Kapotte leiding maken",
      "Gas leiding repareren",
      "Lekkage verhelpen",
      "Rioleren en afvoer onstoppen of reinigen",
      "Anders",
    ],
  },
  {
    key: "question2",
    label: "In welke gedeelte van de woning",
    options: [
      "Badkamer of toilet",
      "Keuken",
      "Slaapkamers",
      "Woonkamer",
      "Zolder",
      "Garage of schuur",
      "Anders"
    ],
  },
  {
    key: "question3",
    label: "Om welke onderdeel gaat het",
    options: [
      "Toilet",
      "Douche of bad",
      "Wasbak",
      "Wasmachine",
      "Anders",
    ],
  },
  // ... voeg andere vragen toe zoals nodig
];

function MultistepForm() {
  const [data, setData] = useState(INITIAL_DATA)
  
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

  const questionsSteps = questionsData.map((question) => (
    <CategoryForm
      key={question.key}
      question={question} // Voeg de vraag als prop toe
      questions={data.questions}
      updateQuestionAnswers={(answers) => {
        updateQuestionAnswers(question.key, answers[question.key] as string);
      }}
    />
  ));

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
  useHomeOwnerMultistepForm({
      steps: [
        <LocationForm {...data} updateFields={updateFields} />,
        ...questionsSteps,
        <InfoForm {...data} updateFields={updateFields} />,
        <EmailForm {...data} updateFields={updateFields} />,
        <LoginForm {...data} updateFields={updateFields} />,
        <RegisterForm {...data} updateFields={updateFields} />
      ],
      onStepChange: () => { },
    });
 
  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isLastStep) return next()
    if (data.registerPassword != data.repeatRegisterPassword) return console.log("Passwords do not match! (insert function that deals with it here)")
    const result = await axios.post("/auth/signup", {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.registerEmail,
      password: data.registerPassword
    })
    console.log(result.data);
    if (result.data.createTokenResult?.access_token) console.log("TODO: Store access tokens in front end for requests")
  }

  const stepWidth = 100 / steps.length;

  return (
    <form onSubmit={onSubmit} className='form-con'>
      <div className='progress-con'>
        <h3>Stap {currentStepIndex + 1} van {steps.length}</h3>
        <div className="progress-bar">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`progress-step ${index <= currentStepIndex ? "active" : ""}`}
              style={{ width: `${stepWidth}%` }}
            ></div>
          ))}
        </div>
      </div>

      {step}

      <div className='btn-wrapper'>
        {!isFirstStep && <button type="button" onClick={back} className='form-btn back'>Vorige</button>}
        <button type="submit" className='form-btn'>{isLastStep ? "Verstuur" : "Volgende"}</button>
      </div>
    </form>
  )
}

export default MultistepForm