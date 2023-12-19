import NavBar from "../../components/ui/NavBar/NavBar"
import { LoginForm } from "../../components/MultistepForm/LoginForm"
import Footer from "../../components/ui/Footer/Footer"

import "./LoginPage.css"

function LoginPage() {
  return (
    <>
        <NavBar />
        <div className="loginForm_wrapper">
            <div className="loginForm_con">
                <LoginForm />
            </div>
        </div> 
        <Footer />
    </>
  )
}

export default LoginPage