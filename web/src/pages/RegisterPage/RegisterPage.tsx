import { useState } from "react"
import NavBar from "../../components/ui/NavBar/NavBar"
import { RegisterForm } from "../../components/MultistepForm/RegisterForm"
import Footer from "../../components/ui/Footer/Footer"

import "./RegisterPage.css"

function RegisterPage() {

  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    repeatPassword: '',
  });

  const updateRegisterData = (fields) => {
    setRegisterData((prevData) => ({ ...prevData, ...fields }));
  };
  return (
    <>
        <NavBar />
        <div className="registerForm_wrapper">
            <div className="registerForm_con">
              <RegisterForm {...registerData} updateFields={updateRegisterData} />
            </div>          
        </div>
        <Footer />
    </>
  )
}

export default RegisterPage