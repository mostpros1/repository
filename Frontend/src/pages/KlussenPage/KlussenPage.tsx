import Navbar from '../../components/ui/NavBar'
import MultistepForm from '../../components/MultistepForm/MultistepForm'
import './KlussenPage.css'

function KlussenPage() {
  return (
    <>
        <Navbar />
        <div className='multistep-viewport'>
          <MultistepForm />
        </div>
    </>
  )
}

export default KlussenPage