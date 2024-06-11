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

  /*
  function signUp(registerData: RegisterData): void {
    const { email, phoneNumber, password, firstName, lastName } = registerData;

    const signUpUser = async () => {
      try {
        await Auth.signUp({
          username: email,
          password: password,
          attributes: {
            phone_number: phoneNumber,
            name: firstName,
            "custom:family_name": lastName,
          },
          autoSignIn: { enabled: true },
        });

        dynamo
          .put({
            Item: {
              id: Math.floor(Math.random() * 1000000000),
              name: stopXSS(firstName),
              family_name: stopXSS(lastName),
              email: stopXSS(email),
              phone_number: stopXSS(phoneNumber),
              created_at: new Date().toISOString(),
              user_type: "HOMEOWNER",
              stripeCustomerId: "",

              
              email: stopXSS(email),
              first_name: stopXSS(firstName),
              last_name: stopXSS(lastName),
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              status: "PENDING",
              user_role: "HOMEOWNER"
              
            },
            TableName: "Users",
          })
          .promise()
          .then((data) => console.log(data.Attributes))
          .catch(console.error);

        dynamo
          .put({
            TableName: "Uuids",
            Item: {
              id: Number(stopXSS(String(Math.random().toString(36).substring(2)))),
              email: stopXSS(email),
              identifyingName: Number(stopXSS(String(Math.random().toString(36).substring(2, 15))))
            },
          })
          .promise();

        const user = await Auth.signIn(email, password);
        sessionStorage.setItem('accessToken', user.signInUserSession.accessToken.jwtToken);
        sessionStorage.setItem('idToken', user.signInUserSession.idToken.jwtToken);
        sessionStorage.setItem('refreshToken', user.signInUserSession.refreshToken.token);
      
        //const postConfig = postConfigMap['HOMEOWNER'];
        console.log("Navigating with state:", {
          email: email,
          postConfig: "HOMEOWNER",
        });
        navigate(`/${taal}/confirm-mail#homeowner-dashboard`, {
          state: { email: email, postConfig: "HOMEOWNER" },
        });
      } catch (error: any) {
        console.error("Error signing up:", error);
        setError(
          error.message || "Er is een fout opgetreden bij het aanmelden."
        );
      }
    };

    signUpUser();
  }
  */

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
