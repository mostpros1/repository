import './SpecialistPage.css'
import Navbar from '../../components/ui/NavBar'
import SpecialistMultistep from '../../components/MultistepForm/SpecialistMultistepForm'

function SpecialistPage() {
  return (
    <>
      <Navbar />
      <div className='multistep-viewport'>
        <SpecialistMultistep />
      </div>
    </>
    
  )
}

export default SpecialistPage