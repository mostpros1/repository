import NavBar from '../../components/ui/NavBar/NavBar'
import './SpecialistPage.css'
import SpecialistMultistep from '../../components/MultistepForm/SpecialistMultistepForm'

function SpecialistPage() {
  return (
    <>
      <NavBar />
      <div className='multistep-viewport'>
        <SpecialistMultistep />
      </div>
    </>
    
  )
}

export default SpecialistPage