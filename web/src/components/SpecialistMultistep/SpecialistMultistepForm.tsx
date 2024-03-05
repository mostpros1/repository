import "../MultistepForm/MultistepForm.css";
import SearchChoreForm from "./SearchChoreForm/SearchChoreForm";
import { RegisterForm } from "../MultistepForm/RegisterForm";
import { FormEvent, useEffect , useState } from "react";
import { useMultistepForm } from "../../hooks/useMultistepForm";
import { useNavigate } from "react-router-dom";
import HomeButton from "../ui/HomeButton/HomeButton";
import TestQ from "./SpecialistQ/TestQ/TestQ";
import KvKForm from "./KvKForm/KvKForm";
import NoKvK from "./NoKvK/NoKvK";
import { Auth } from "aws-amplify";
import { AccountForm } from "../MultistepForm/AccountForm";
type FormData = {
  email: string;
  postCode: string;
  stad: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  password: string;
  repeatPassword: string;
  questions: Record<string, string>;
};

// const [isLoggingIn, setIsLoggingIn] = useState(true);

const INITIAL_DATA: FormData = {
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

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm({
      steps: [
        <SearchChoreForm {...data} updateFields={updateFields} />,
        ...questionsSteps,
        <AccountForm setError={() => {}} error={""} {...data} updateFields={updateFields} />
        // <KvKForm setShowNoKvK={setShowNoKvK} />,
      ],
      onStepChange: () => { },
    });

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next()

    const userData = {
      email: data.email.trim(),
      password: data.password.trim(),
      repeatPassword: data.repeatPassword.trim(),
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      phoneNumber: data.phoneNumber.trim()
    }

    if (userData.firstName == "" && userData.lastName == "" && userData.phoneNumber == "") {
      await Auth.signIn(userData.email, userData.password)
      .then(() => {
        navigate('/specialist-resultaat')
      })
      .catch((err) => {
        console.error(err)
        if (err.code == 'UserNotConfirmedException') navigate('/bevestig-email', { state: { email: userData.email, postConfig: "PROFESSIONAL" } })
      })
    }
    else {
      if (userData.password != userData.repeatPassword) return console.log("Passwords do not match! (insert function that deals with it here)")
      await Auth.signUp({
      username: userData.email,
      password: userData.password,
      attributes: {
        name: userData.firstName,
        family_name: userData.lastName,
        email: userData.email,
        phone_number: userData.phoneNumber,
        "custom:group": "Professional"
      },
      autoSignIn: { enabled: true }
      })
      .then(() => {
        navigate('/bevestig-email', { state: { email: userData.email, postConfig: "PROFESSIONAL" } })
      })
      .catch(async error => {
        console.error(error)
        if (error.code == 'UsernameExistsException') {
          await Auth.resendSignUp(userData.email)
          navigate('/bevestig-email', { state: { email: userData.email, postConfig: "PROFESSIONAL" } })
        }
      })
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
      {showNoKvK ? <NoKvK /> : step}
      <div className="btn-wrapper">
        <button type="button" onClick={() => { showNoKvK ? setShowNoKvK(false) : back() }} className={`form-btn back${showNoKvK ? " with-no-kvk" : ""}`} style={{ display: isFirstStep ? 'none' : 'inline-block' }}>Vorige</button>
        <button type="submit" className='form-btn'>{isLastStep ? "Verstuur" : "Volgende"}</button>
      </div>
    </form>
  );
}
export default SpecialistMultistepForm;
