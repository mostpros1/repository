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
  });

  const [error, setError] = useState('');

  const navigate = useNavigate()

  const handleSignUp = async () => {
    const { email, password, firstName, lastName, phoneNumber } = registerData;

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
      navigate('/bevestig-email', { state: { email: email, postConfig: "HOMEOWNER" } })
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
          <button onClick={handleSignUp}>Sign Up</button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default RegisterPage;
