import NavBar from '../../components/ui/NavBar/NavBar'
import './SpecialistPage.css'
import SpecialistMultistepForm from '../../components/SpecialistMultistep/SpecialistMultistepForm.tsx'
import Footer from '../../components/ui/Footer/Footer'

function SpecialistPage() {
  return (
    <>
      <NavBar />
      <div className='multistep-viewport'>
        <SpecialistMultistepForm />
      </div>
      <Footer />
    </>
    
  )
}

export default SpecialistPage