import './Multistepform.css'
import { useState } from 'react'
import { FormEvent } from "react"
import { LocationForm } from './LocationForm'
import { CategoryForm } from './CategoryForm'
import { InfoForm } from './InfoForm'
import { EmailForm } from './EmailForm'
import { useMultistepForm } from '../../hooks/useMultistepForm'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'
import axios from 'axios'
type FormData = {
  postCode: string
  stad: string
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

  // const [isLoggingIn, setIsLoggingIn] = useState(true);
  
const INITIAL_DATA: FormData = {
  postCode: "",
  stad: "",
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
    <LoginForm {...data} updateFields={updateFields}/>,
    <RegisterForm {...data} updateFields={updateFields}/>
  ])
  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isLastStep) return next()
    // try {
    //   const response = await axios.get('http://localhost:3000/auth/users/2cfeeef2-8dc2-433a-9f0b-e83ccff8f3c6');
    //   console.log(response.data);
    // } catch (error) {
    //   console.error(error);
    // }
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