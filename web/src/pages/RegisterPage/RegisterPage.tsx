import { useState } from "react";
import { Auth } from "aws-amplify";
import NavBar from "../../components/ui/NavBar/NavBar";
import { RegisterForm } from "../../components/MultistepForm/RegisterForm";
import Footer from "../../components/ui/Footer/Footer";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import { dynamo } from "../../../declarations.ts";
import { stopXSS } from "./../../../../backend_functions/stopXSS.ts";
import { taal } from "../../components/ui/NavBar/Navigation.tsx";
import { CompressOutlined } from "@mui/icons-material";

function RegisterPage() {

  const [error, setError] = useState("");

  const navigate = useNavigate();

  interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    repeatPassword: string;
  }

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    repeatPassword: "",
  });


  //REST API VERSIE

  async function signUpUser(userData) {
    console.log(JSON.stringify(userData));
    const { email } = userData;
    const url = 'https://xkvqft2ld6.execute-api.eu-north-1.amazonaws.com/registration'; // Replace with your API Gateway URL

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log('Response data:', response);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Response data:', data); // Log the response data

      navigate(`/${taal}/confirm-mail#homeowner-dashboard`, {
        state: { email: stopXSS(email), postConfig: "HOMEOWNER" },
      });
    } catch (error) {
      console.error('Error during sign up:', error);
    }
  }

  const handleSignUp = async () => {
    console.log(registerData);
    await signUpUser(registerData);
  };

  const updateRegisterData = (fields) => {
    setRegisterData((prevData) => ({ ...prevData, ...fields }));
  };


  return (
    <>
      <NavBar />
      <div className="registerForm_wrapper">
        <div className="registerForm_con">
          {/* <RegisterForm {...registerData} updateFields={updateRegisterData} setError={setError} error={error}/> */}

          <RegisterForm
            setUserExists={undefined}
            {...registerData}
            updateFields={updateRegisterData}
            /*setError={setError}*/ error={error}
          />
          <button className="button-sign-up" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RegisterPage;

/*<Footer />*/
