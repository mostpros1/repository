import NavBar from "../../components/ui/NavBar/NavBar"
import { RegisterForm } from "../../components/MultistepForm/RegisterForm"
import Footer from "../../components/ui/Footer/Footer"

import "./RegisterPage.css"

function RegisterPage() {
  return (
    <>
        <NavBar />
        <div className="registerForm_wrapper">
            <div className="registerForm_con">
                <RegisterForm />
            </div>          
        </div>
        <Footer />
    </>
  )
}

export default RegisterPage