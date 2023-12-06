import NavBar from '../../components/ui/NavBar/NavBar'
import MultistepForm from '../../components/MultistepForm/MultistepForm'
import Footer from '../../components/ui/Footer/Footer'
import './KlussenPage.css'

function KlussenPage() {
  return (
    <>
        <NavBar />
        <div className='multistep-viewport'>
          <MultistepForm />
        </div>
        <Footer />
    </>
  )
}

export default KlussenPage