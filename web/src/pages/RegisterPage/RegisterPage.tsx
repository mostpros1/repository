import { useState } from 'react';
import { Auth } from 'aws-amplify';
import NavBar from '../../components/ui/NavBar/NavBar';
import { RegisterForm } from '../../components/MultistepForm/RegisterForm';
import Footer from '../../components/ui/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import { dynamo } from "./../../../../backend_functions/declerations.ts";
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

    try {
      await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
          name: firstName, // "given_name" is often used for the first name
          family_name: lastName, // "family_name" for the last name
          phone_number: phoneNumber,
        },
        autoSignIn: { enabled: true }
      });

      // Handle successful registration, e.g., redirect to another page
      navigate('/bevestig-email', { state: { email: email } });
    } catch (error: any) {
      // Handle registration error, e.g., show an error message
      console.error('Error signing up:', error);
      setError(error.message || 'Er is een fout opgetreden bij het aanmelden.');
    }
  };

  const updateRegisterData = (fields) => {
    setRegisterData((prevData) => ({ ...prevData, ...fields }));
  };

  return (
    <>
      <NavBar />
      <div className="registerForm_wrapper">
        <div className="registerForm_con">
          <RegisterForm {...registerData} updateFields={updateRegisterData} setError={setError} error={error} />
          <button className="button-sign-up" onClick={handleSignUp}>Sign Up</button>
        </div>
      </div>

    </>
  );
}

export default RegisterPage;
/*<Footer />*/