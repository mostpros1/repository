import './MultistepForm.css';
import { LocationForm } from './LocationForm';
// import { CategoryForm } from './CategoryForm';
import { FormEvent, useState } from "react";
import { useMultistepForm } from '../../hooks/useMultistepForm';
import { useNavigate } from 'react-router-dom';

type FormData = {
  postCode: string
  stad: string
  category: string
}

// const [isLoggingIn, setIsLoggingIn] = useState(true);

const INITIAL_DATA: FormData = {
  postCode: "",
  stad: "",
  category: "",
}
function SpecialistMultistepForm() {
  const [data, setData] = useState(INITIAL_DATA)
  function updateFields(fields: Partial<FormData>) {
    setData(prev => {
      return { ...prev, ...fields }
    })
  }
  const navigate = useNavigate();
  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } = useMultistepForm({
    steps: [
      <LocationForm {...data} updateFields={updateFields} />,
      // <CategoryForm {...data} updateFields={updateFields}/>
    ],
    onStepChange: () => {}
  })
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