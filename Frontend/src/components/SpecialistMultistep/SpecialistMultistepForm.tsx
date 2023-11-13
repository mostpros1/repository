import '../MultistepForm/MultistepForm.css'
import SearchChoreForm from './SearchChoreForm/SearchChoreForm'
import { RegisterForm } from '../MultistepForm/RegisterForm'
import { FormEvent } from "react"
import { useMultistepForm } from '../../hooks/useMultistepForm'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import HomeButton from '../ui/HomeButton/HomeButton'
import FirstSpecialistQ from './SpecialistQ/FirstSpecialistQ/FirstSpecialistQ'
import SecondSpecialistQ from './SpecialistQ/SecondSpecialistQ/SecondSpecialistQ'
import ThirdSpecialistQ from './SpecialistQ/ThridSpecialistQ/ThirdSpecialistQ'
import FourthSpecialistQ from './SpecialistQ/FourthSpecialistQ/FourthSpecialistQ'
// import axios from 'axios'

type FormData = {
  beroep: string
  email: string
  postCode: string
  stad: string
  firstName: string
  lastName: string
  registerEmail: string
  phoneNumber: string
  registerPassword: string
  repeatRegisterPassword: string
}

// const [isLoggingIn, setIsLoggingIn] = useState(true);

const INITIAL_DATA: FormData = {
  beroep: "",
  email: "",
  postCode: "",
  stad: "",
  firstName: "",
  lastName: "",
  registerEmail: "",
  phoneNumber: "",
  registerPassword: "",
  repeatRegisterPassword: ""
}
function SpecialistMultistepForm() {
  const [data, setData] = useState(INITIAL_DATA)
  function updateFields(fields: Partial<FormData>) {
    setData(prev => {
      return { ...prev, ...fields }
    })
  }
  const navigate = useNavigate();
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultistepForm([
    <SearchChoreForm {...data} updateFields={updateFields}/>,
    <RegisterForm {...data} updateFields={updateFields}/>,
    <FirstSpecialistQ />,
    <SecondSpecialistQ />,
    <ThirdSpecialistQ />,
    <FourthSpecialistQ />
  ])
  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) {
      return next();
    } else {
      console.log(data);
      navigate("/specialist-resultaat");
    }
  }

  const stepWidth = 100 / steps.length;

  return (
    <form onSubmit={onSubmit} className='form-con'>
      <HomeButton />
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

export default SpecialistMultistepForm