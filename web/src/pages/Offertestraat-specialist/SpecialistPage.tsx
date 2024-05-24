import NavBar from '../../components/ui/NavBar/NavBar'
import './SpecialistPage.css'
import SpecialistMultistep from '../../components/SpecialistMultistep/SpecialistMultistepForm'
import SpecialistHome from '../../components/SpecialistMultistep/SpecialistHome'
import Footer from '../../components/ui/Footer/Footer'

function SpecialistPage() {
  return (
    <>
      <NavBar />
      <div className='multistep-viewportTwo'>
        <SpecialistMultistep />
        <SpecialistHome />
      </div>
      <Footer />
    </>
    
  )
}

export default SpecialistPage