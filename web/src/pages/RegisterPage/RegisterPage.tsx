import { useState } from 'react';
import { Auth } from 'aws-amplify';
import NavBar from '../../components/ui/NavBar/NavBar';
import { RegisterForm } from '../../components/MultistepForm/RegisterForm';
import Footer from '../../components/ui/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';


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
    const { email, phoneNumber, password, firstName, lastName } = registerData;

      const signUpUser = async () => {
        try {
          await Auth.signUp({
            username: email,
            password: password,
            attributes: {
              phone_number: phoneNumber,
              name: firstName,
              family_name: lastName,
              'custom:user_type': user_type,
            },
            autoSignIn: { enabled: true },
          });

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
    signUp(registerData, 'Homeowner');
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
          <RegisterForm {...registerData} updateFields={updateRegisterData} setError={setError} error={error} />
          <button onClick={handleSignUp}>Sign Up</button>
        </div>
      </div>

    </>
  );
}

export default RegisterPage;
/*<Footer />*/