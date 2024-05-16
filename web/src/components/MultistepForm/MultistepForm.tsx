import './MultistepForm.css'
import { useState, useEffect } from 'react'
import { FormEvent } from "react"
import { LocationForm } from './LocationForm'
import { useQuestionData } from '../../data/MSFquestions'
import DateForm from './DateForm'
import { CategoryForm } from './CategoryForm'
import { InfoForm } from './InfoForm'
import { EmailForm } from './EmailForm'
import { useHomeOwnerMultistepForm } from '../../hooks/useHomeOwnerMultistepform'
import Calendar from './Calendar'
import kraan from '../../assets/kraan.svg'
import { Auth } from 'aws-amplify'
import { useUser } from "../../context/UserContext";
import { useNavigate } from 'react-router-dom'
import { AccountForm } from './AccountForm'
import PageSpecialisten from './PageSpecialisten'
import { userInfo } from 'os'
import { dynamo } from '../../../declarations'

type FormData = {
  postCode: string
  stad: string
  date: string;
  questions: Record<string, string>;
  aanvullendeInformatie: string
  info: string
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  password: string
  repeatPassword: string
  profession: string;
  task: string;
}

function MultistepForm() {
  const navigate = useNavigate()
  const questionsData = useQuestionData();

  const INITIAL_DATA: FormData = {
    postCode: "",
    stad: "",
    date: "",
    questions: Object.fromEntries(
      questionsData.map((question) => [question.key, ""])
    ),
    aanvullendeInformatie: "",
    info: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    repeatPassword: "",
    profession: "",
    task: "",
  }

  const [data, setData] = useState(INITIAL_DATA);

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => ({ ...prev, ...fields }));
  }

  const updateDate = (selectedDate: Date) => {
    const year = selectedDate.getFullYear();
    const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(selectedDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}T00:00:00.000Z`;
    updateFields({ date: formattedDate });
  };

  function updateQuestionAnswers(questionKey: string, answer: string) {
    setData((prev) => ({
      ...prev,
      questions: updateQuestions(prev.questions, {
        [questionKey]: answer,
      }),
    }));
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

  const optionImages = {
    "Nieuwe leiding aanleggen": kraan,
    "Kapotte leiding maken": kraan,
    "Anders": kraan
    // ... voeg andere opties en bijbehorende afbeeldingen toe
  };

  const questionsSteps = questionsData.map((question) => (
    <CategoryForm
      key={question.key}
      question={question}
      questions={data.questions}
      updateQuestionAnswers={(answers) => {
        updateQuestionAnswers(question.key, answers[question.key] as string);
      }}
      optionImages={optionImages}
    />
  ));


  const { user, updateUser } = useUser();

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useHomeOwnerMultistepForm(
    user ? {
      steps: [
        <LocationForm {...data} updateFields={updateFields} />,
        <DateForm updateDate={updateDate} updateFields={updateFields} />,
        <InfoForm {...data} updateFields={updateFields} />,
      ],
      onStepChange: () => { }
    } : {
      steps: [
        <LocationForm {...data} updateFields={updateFields} />,
        <DateForm updateDate={updateDate} updateFields={updateFields} />,
        <InfoForm {...data} updateFields={updateFields} />,
        <>
          <AccountForm {...data} beroep='' formConfig='HOMEOWNER' updateFields={updateFields} setError={() => { }} error="" />
        </>
      ],
      onStepChange: () => { }
    }
  );
  useEffect(() => {
    const profession = window.location.hash.replace("#", "").split("?")[0];
    const task = window.location.hash.replace("#", "").split("?")[1];


    updateFields({ profession, task });
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    console.log('Form Data:', data);
    if (!isLastStep) return next()


    const userData = {
      email: data.email,
      password: data.password,
      repeatPassword: data.repeatPassword,
      firstName: data.firstName.trim(),
      lastName: data.lastName.trim(),
      phoneNumber: data.phoneNumber
    }

    if (user) {
      const currentAuthenticatedUser = await Auth.currentAuthenticatedUser();

      dynamo
        .put({
          Item: {
            id: Math.floor(Math.random() * 1000000000),
            user_email: currentAuthenticatedUser.attributes.email,
            profession: data.profession,
            task: data.task,
            region: data.stad,
            currentStatus: "pending",
            date: `${new Date().getDate().toString().padStart(2, '0')}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${new Date().getFullYear()}`,
            chats: 0,
            isCurrent: true
          },
          TableName: "Klussen"
        })
        .promise()
        .catch(console.error)

        const profession = window.location.hash.replace("#", "").split("?")[0];
        const task = window.location.hash.replace("#", "").split("?")[1];

        const datum = new Date(data.date);
        const date = datum.toISOString().split('T')[0];
        navigate(`/home-owner-result#${profession}?${task}!${date}`);
    
      } else {
      if (userData.password != userData.repeatPassword) return console.log("Passwords do not match! (insert function that deals with it here)")
      await Auth.signUp({
        username: userData.email,
        password: userData.password,
        attributes: {
          phone_number: userData.phoneNumber,
          name: userData.firstName,
          "custom:family_name": userData.lastName,
        },
        autoSignIn: { enabled: true },
      })
        .then(() => {
          const profession = window.location.hash.replace("#", "").split("?")[0];
          const task = window.location.hash.replace("#", "").split("?")[1];

          const datum = new Date(data.date);
          const date = datum.toISOString().split('T')[0];
          navigate(`/nl/confirm-mail#home-owner-result#${profession}?${task}!${date}`, { state: { email: userData.email, postConfig: "HOMEOWNER" } })
        })
        .catch(async error => {
          if (error.code == 'UsernameExistsException') {
            await Auth.resendSignUp(userData.email)
            const profession = window.location.hash.replace("#", "").split("?")[0];
            const task = window.location.hash.replace("#", "").split("?")[1];

            const datum = new Date(data.date);
            const date = datum.toISOString().split('T')[0];
            navigate(`/nl/confirm-mail#home-owner-result#${profession}?${task}!${date}`, { state: { email: userData.email, postConfig: "HOMEOWNER" } })
          } else {
            console.error("foutmelding:", error)
          }
        })
    }
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
