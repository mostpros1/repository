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

    try {
      const signUpUser = async (): Promise<void> => {
        await Auth.signUp({
          username: email,
          password: password,
          attributes: {
            phone_number: phoneNumber,
            given_name: firstName,
            family_name: lastName,
            birthdate: dob,
            'custom:user_type': user_type, 
            "custom:stripe_account": "1"// Include the custom attribute directly
          },
          autoSignIn: { enabled: true }
        });

        navigate('/bevestig-email', { state: { email: email } });
      };

      signUpUser();
    } catch (error: any) {
      console.error('Error signing up:', error);
      setError(error.message || 'Er is een fout opgetreden bij het aanmelden.');
    }
  }

  const handleSignUp = async () => {
    signUp(registerData, 'hoem_owner');
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