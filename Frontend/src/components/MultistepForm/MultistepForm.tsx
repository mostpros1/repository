import './Multistepform.css'

import { AddressForm } from './AddressFrom'
import { CategoryForm } from './CategoryForm'
import { InfoForm } from './InfoForm'
import { EmailForm } from './EmailForm'

import { useMultistepForm } from '../../hooks/useMultistepForm'

function MultistepForm() {

  const { step, steps, currentStepIndex, isFirstStep, isLastStep, back, next} = useMultistepForm([<AddressForm />, <CategoryForm />, <InfoForm />, <EmailForm />
  ])

  return (
    <div className='form-con'>
        <div>Stap {currentStepIndex + 1} van {steps.length}</div>
        {step}
        <div className='btn-wrapper'>
          {!isFirstStep && <button onClick={back} className='form-btn back'>Vorige</button>}  
          <button onClick={next} className='form-btn'>{isLastStep ? "Verstuur" : "Volgende"}</button>  
        </div>    
        
    </div>
  )
}

export default MultistepForm