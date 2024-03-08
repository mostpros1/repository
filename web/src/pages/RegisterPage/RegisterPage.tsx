import { useState } from 'react';
import { Auth } from 'aws-amplify';
import NavBar from '../../components/ui/NavBar/NavBar';
import { RegisterForm } from '../../components/MultistepForm/RegisterForm';
import Footer from '../../components/ui/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import { addUser } from '../../../../backend_functions/addData.ts';
import { hashPassword } from '../../../../backend_functions/hashPassword.ts';
import { SignUp } from '@aws-amplify/ui-react/dist/types/components/Authenticator/SignUp/SignUp';



function RegisterPage() {

  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    repeatPassword: '',
    dob: '',
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
    dob: string;
  }

  function signUp(registerData: RegisterData, user_type: string): void {
    const { email, phoneNumber, password, firstName, lastName, dob } = registerData;

      const signUpUser = async () => {
        try {
          await Auth.signUp({
            username: email,
            password: password,
            attributes: {
              phone_number: phoneNumber,
              given_name: firstName,
              family_name: lastName,
              birthdate: dob,
              'custom:user_type': user_type,
            },
            autoSignIn: { enabled: true },
          });

          const user = await Auth.signIn(email, password);
          sessionStorage.setItem('accessToken', user.signInUserSession.accessToken.jwtToken);
          sessionStorage.setItem('idToken', user.signInUserSession.idToken.jwtToken);
          sessionStorage.setItem('refreshToken', user.signInUserSession.refreshToken.token);
        
        } catch (error: any) {
          console.error('Error signing up:', error);
          setError(error.message || 'Er is een fout opgetreden bij het aanmelden.');
        }
      };

      signUpUser();
    } catch (error: any) {
      console.error('Error signing up:', error);
      setError(error.message || 'Er is een fout opgetreden bij het aanmelden.');
    }
  }

  const handleSignUp = async () => {
    signUp(registerData, 'Homeowner');
    console.log(registerData);
  };signUpUser

  const updateRegisterData = (fields) => {
    setRegisterData((prevData) => ({ ...prevData, ...fields }));
  };

  return (
    <>
      <NavBar />
      <div className="registerForm_wrapper">
        <div className="registerForm_con">
          <RegisterForm {...registerData} updateFields={updateRegisterData} setError={setError} error={error} />
          <button onClick={handleSignUp}>Sign Up</button>
        </div>
      </div>

    </>
  );
}

export default RegisterPage;
/*<Footer />*/