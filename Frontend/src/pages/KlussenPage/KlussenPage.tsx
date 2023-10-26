import NavBar from '../../components/ui/NavBar/NavBar'
import MultistepForm from '../../components/MultistepForm/MultistepForm'
import './KlussenPage.css'

function KlussenPage() {
  return (
    <>
        <NavBar />
        <div className='multistep-viewport'>
          <MultistepForm />
        </div>
    </>
  )
}

export default KlussenPage