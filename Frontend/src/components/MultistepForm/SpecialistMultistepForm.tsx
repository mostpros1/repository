import './Multistepform.css'
import { LocationForm } from './LocationForm'
import { CategoryForm } from './CategoryForm'
import { useMultistepForm } from '../../hooks/useMultistepForm'
import { Link } from 'react-router-dom'


function SpecialistMultistepForm() {

  const {steps, currentStepIndex, step, isFirstStep,isLastStep, back, next} = useMultistepForm([
    <LocationForm />,
    <CategoryForm />,   
  ])

  const stepWidth = 100 / steps.length;

  let lastStep = <Link to="/specialist-resultaat">Verstuur</Link>

  if(!isLastStep) {
    lastStep = <button onClick={next} className='form-btn'>Volgende</button>
  }

  return (  
    <div className='form-con'>
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
        {!isFirstStep && <button onClick={back} className='form-btn back'>Vorige</button>}  
        {lastStep}  
      </div>         
    </div> 
  )
}

export default SpecialistMultistepForm