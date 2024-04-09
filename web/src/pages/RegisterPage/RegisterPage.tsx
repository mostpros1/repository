import { useState } from 'react';
import { Auth } from 'aws-amplify';
import NavBar from '../../components/ui/NavBar/NavBar';
import { RegisterForm } from '../../components/MultistepForm/RegisterForm';
import Footer from '../../components/ui/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import { dynamo } from "../../../declarations.ts";
import { stopXSS } from "./../../../../backend_functions/stopXSS.ts";


function RegisterPage() {

  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    repeatPassword: '',
  });

  const [error, setError] = useState('');

  const navigate = useNavigate()

  interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    repeatPassword: string;
  }

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

              /*
              email: stopXSS(email),
              first_name: stopXSS(firstName),
              last_name: stopXSS(lastName),
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              status: "PENDING",
              user_role: "HOMEOWNER"
              */
            },
            TableName: "Users",
          })
          .promise()
          .then(data => console.log(data.Attributes))
          .catch(console.error)


        /*const user = await Auth.signIn(email, password);
        sessionStorage.setItem('accessToken', user.signInUserSession.accessToken.jwtToken);
        sessionStorage.setItem('idToken', user.signInUserSession.idToken.jwtToken);
        sessionStorage.setItem('refreshToken', user.signInUserSession.refreshToken.token);
      */
        //const postConfig = postConfigMap['HOMEOWNER'];
        navigate('/bevestig-email', { state: { email: email, postConfig: "HOMEOWNER" } })
      } catch (error: any) {
        console.error('Error signing up:', error);
        setError(error.message || 'Er is een fout opgetreden bij het aanmelden.');
      }
    };

    signUpUser();
  }


  const handleSignUp = async () => {
    signUp(registerData);
    console.log(registerData);
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

          <RegisterForm setUserExists={undefined} {...registerData} updateFields={updateRegisterData} /*setError={setError}*/ error={error} />
          <button className="button-sign-up" onClick={handleSignUp}>Sign Up</button>
        </div>
      </div>

    </>
  );
}

export default RegisterPage;
/*<Footer />*/