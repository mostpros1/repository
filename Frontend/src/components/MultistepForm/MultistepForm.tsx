import './Multistepform.css'
import { useState } from 'react'
import { FormEvent } from "react"
import { LocationForm } from './LocationForm'
import { CategoryForm } from './CategoryForm'
import { InfoForm } from './InfoForm'
import { EmailForm } from './EmailForm'
import { useMultistepForm } from '../../hooks/useMultistepForm'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'

type FormData = {
  postCode: string
  stad: string
  aanvullendeInformatie: string
  info: string
  email: string
}

  // const [isLoggingIn, setIsLoggingIn] = useState(true);
  
const INITIAL_DATA: FormData = {
  postCode: "",
  stad: "",
  aanvullendeInformatie: "",
  info: "",
  email: "",
}

function MultistepForm() {
  const [data, setData] = useState(INITIAL_DATA)
  function updateFields(fields: Partial<FormData>) {
    setData(prev => {
      return { ...prev, ...fields }
    })
  }
  const {steps, currentStepIndex, step, isFirstStep,isLastStep, back, next} = useMultistepForm([
    <LocationForm {...data} updateFields={updateFields} />,
    <CategoryForm />,
    <InfoForm {...data} updateFields={updateFields}/>,
    <EmailForm {...data} updateFields={updateFields}/>,
    <LoginForm />,
    <RegisterForm />
  ])
  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isLastStep) return next()
    alert("success")
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