import './MultistepForm.css'
import { useState } from 'react'
import { FormEvent } from "react"
import { LocationForm } from './LocationForm'
import { CategoryForm } from './CategoryForm'
import { InfoForm } from './InfoForm'
import { EmailForm } from './EmailForm'
import { useMultistepForm } from '../../hooks/useMultistepForm'
import { Auth } from 'aws-amplify'
import { useNavigate } from 'react-router-dom'
import AccountForm from './AccountForm'

type FormData = {
  postCode: string
  stad: string
  category: string
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
  category: "",
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
  const navigate = useNavigate()

  function updateFields(fields: Partial<FormData>) {
    setData(prev => {
      return { ...prev, ...fields }
    })
  }

  const {steps, currentStepIndex, step, isFirstStep,isLastStep, back, next, goTo} = useMultistepForm([
    <LocationForm {...data} updateFields={updateFields} />,
    <CategoryForm {...data} updateFields={updateFields}/>,
    <InfoForm     {...data} updateFields={updateFields}/>,
    <EmailForm    {...data} updateFields={updateFields}/>,
    <AccountForm  {...data} updateFields={updateFields}/>
  ])
  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const userData = {
      email: data.registerEmail,
      password: data.registerPassword,
      repeatPassword: data.repeatRegisterPassword,
      name: data.firstName.trim() + " " + data.lastName.trim(),
      phoneNumber: data.phoneNumber
    }
    if (!isLastStep) return next()
    if (userData.password != userData.repeatPassword) return console.log("Passwords do not match! (insert function that deals with it here)")

    await Auth.signUp({
      username: userData.email,
      password: userData.password,
      attributes: {
        name: userData.name,
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
      }
    })
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
      <button type="button" onClick={() => goTo(3)}>go to email form</button>
    </form>
  )
}

export default MultistepForm