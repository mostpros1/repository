import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

import NavBar from '../../components/ui/NavBar/NavBar';
import { LoginForm } from '../../components/MultistepForm/LoginForm';
import Footer from '../../components/ui/Footer/Footer';

import './LoginPage.css';

//import { authenticateUser } from '../../../../backend_functions/authentecateUser.ts';

function LoginPage() {
  const navigate = useNavigate();
  const { updateUser } = useUser();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const authenticatedUser = await Auth.currentAuthenticatedUser();
        updateUser(authenticatedUser);
      } catch (error) {
        updateUser(null);
      }
    };

    checkAuthStatus();
  }, []);


  const handleLogin = async () => {
    try {
      const authenticatedUser = await Auth.signIn(loginData.email, loginData.password);
    
      
      navigate('/');
      console.log('Logged in user:', authenticatedUser);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };


  const updateLoginData = (fields: any) => {
    setLoginData((prevData) => ({ ...prevData, ...fields }));
  };

  return (
    <>
      <NavBar />
      <div className="loginForm_wrapper">
        <div className="loginForm_con">
          <LoginForm {...loginData} updateFields={updateLoginData} setUserExists={() => { }} handleLogin={handleLogin} setError={setError} error={error} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LoginPage;
