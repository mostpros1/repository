import NavBar from '../../components/ui/NavBar/NavBar'
import './SpecialistPage.css'
import SpecialistMultistepForm2 from '../../components/SpecialistMultistep/SpecialistMultistepForm2.tsx'
import Footer from '../../components/ui/Footer/Footer'

function SpecialistPage() {
  return (
    <>
      <NavBar />
      <div className='multistep-viewport'>
        <SpecialistMultistepForm2 />
      </div>
      <Footer />
    </>
    
  )
}

export default SpecialistPage