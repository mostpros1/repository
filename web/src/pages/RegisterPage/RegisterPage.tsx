import { useState } from 'react';
import { Auth } from 'aws-amplify';
import NavBar from '../../components/ui/NavBar/NavBar';
import { RegisterForm } from '../../components/MultistepForm/RegisterForm';
import Footer from '../../components/ui/Footer/Footer';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css';
import { addUser } from '../../../../backend_functions/addData.ts';
import { hashPassword } from '../../../../backend_functions/hashPassword.ts';



function RegisterPage() {

  const [registerData, setRegisterData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    //phoneNumber: '',
    password: '',
    repeatPassword: '',
    dob: '',
  });

  const [error, setError] = useState('');

  const navigate = useNavigate()

  const handleSignUp = async () => {
    const { email, password, firstName, lastName, dob } = registerData;

    try {
      /*await Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
          name: firstName, // "given_name" is often used for the first name
          family_name: lastName, // "family_name" for the last name
          date_of_birth: dob,
        },
        autoSignIn: { enabled: true }
      });*/

      
      
      // Add user to database
      const  today = new Date();
      const status: string = "unverified";
      const hashedPassword = hashPassword(password);

      addUser(email, email, await hashedPassword, firstName, lastName, dob, String(today), String(today), status);
      
    
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
          <RegisterForm {...registerData} updateFields={updateRegisterData} setError={setError} error={error}/>
          <button onClick={handleSignUp}>Sign Up</button>
        </div>
      </div>
      
    </>
  );
}

export default RegisterPage;
/*<Footer />*/