import './MultistepForm.css'
import { useState } from 'react'
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
import { useNavigate } from 'react-router-dom'
import { AccountForm } from './AccountForm'

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
    repeatPassword: ""
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

  


  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useHomeOwnerMultistepForm({
      steps: [
        <LocationForm {...data} updateFields={updateFields} />,
        //<DateForm updateDate={updateDate} updateFields={updateFields}/>,
        <Calendar />,
        <InfoForm {...data} updateFields={updateFields} />,
        <AccountForm {...data} beroep='' formConfig='HOMEOWNER' updateFields={updateFields} setError={() => {}} error=""/>
      ],
      onStepChange: () => {}
    });

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
  
      if (userData.firstName == "" && userData.lastName == "" && userData.phoneNumber == "") {
        await Auth.signIn(userData.email, userData.password)
        .then(() => {
          navigate('/huiseigenaar-resultaat')
        })
        .catch((err) => {
          console.error(err)
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
          phone_number: userData.phoneNumber
        },
        autoSignIn: { enabled: true }
        })
        .then(() => {
          navigate('/bevestig-email', { state: { email: userData.email } })
        })
        .catch(async error => {
          if (error.code == 'UsernameExistsException') {
            await Auth.resendSignUp(userData.email)
            navigate('/bevestig-email', { state: { email: userData.email } })
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