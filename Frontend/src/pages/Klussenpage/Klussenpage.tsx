import Navbar from '../../components/ui/NavBar/Navbar'
import MultistepForm from '../../components/MultistepForm/MultistepForm'
import './Klussenpage.css'

function Klussenpage() {
  return (
    <>
        <Navbar />
        <div className='multistep-viewport'>
          <MultistepForm />
        </div>
    </>
  )
}

export default Klussenpage