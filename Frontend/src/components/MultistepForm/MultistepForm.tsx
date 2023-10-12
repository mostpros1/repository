import './Multistepform.css'
import { FormEvent } from "react"
import { LocationForm } from './AddressFrom'
import { CategoryForm } from './CategoryForm'
import { InfoForm } from './InfoForm'
import { EmailForm } from './EmailForm'
import { useState } from "react"
import { useMultistepForm } from '../../hooks/useMultistepForm'

type FormData = {
  postCode: string
  stad: string
  aanvullendeInformatie: string
  info: string
  email: string
}

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
    <EmailForm {...data} updateFields={updateFields}/>
  ])
  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isLastStep) return next()
    alert("success")
  }

  return (
    <form onSubmit={onSubmit}>
      <div className='form-con'>
        <div>{currentStepIndex + 1} / {steps.length}</div>
        {step}
        <div className='btn-wrapper'>
          {!isFirstStep && <button  type="button" onClick={back} className='form-btn back'>Vorige</button>}
          <button type="submit" className='form-btn'>{isLastStep ? "Verstuur" : "Volgende"}</button>
        </div>
      </div>
    </form>
  )
}

export default MultistepForm