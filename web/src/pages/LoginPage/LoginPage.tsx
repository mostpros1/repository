import { useEffect, useState } from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

import NavBar from '../../components/ui/NavBar/NavBar';
import { LoginForm } from '../../components/MultistepForm/LoginForm';
import Footer from '../../components/ui/Footer/Footer';

import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const { updateUser } = useUser();

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const authenticatedUser = await Auth.currentAuthenticatedUser();
      updateUser(authenticatedUser);
    } catch (error) {
      updateUser(null);
    }
  };

  const handleLogin = async () => {
    try {
      const authenticatedUser = await Auth.signIn(loginData.email, loginData.password);
      updateUser(authenticatedUser);
      navigate('/');
      console.log('Logged in user:', authenticatedUser);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const updateLoginData = (fields) => {
    setLoginData((prevData) => ({ ...prevData, ...fields }));
  };

  return (
    <>
      <NavBar />
      <div className="loginForm_wrapper">
        <div className="loginForm_con">
          <LoginForm {...loginData} updateFields={updateLoginData} setUserExists={() => {}} handleLogin={handleLogin} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LoginPage;
