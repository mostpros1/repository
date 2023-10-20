import './Specialistpage.css'
import Navbar from '../../components/ui/Navbar'
import SpecialistMultistep from '../../components/MultistepForm/SpecialistMultistepForm'

function Specialistpage() {
  return (
    <>
      <Navbar />
      <div className='multistep-viewport'>
        <SpecialistMultistep />
      </div>
    </>
    
  )
}

export default Specialistpage