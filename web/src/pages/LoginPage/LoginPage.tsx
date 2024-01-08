import  { useState } from 'react';
// LoginPage.js
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../actions/userActions';
import { RootState } from '../../store';
import { Auth } from 'aws-amplify'
import { useNavigate } from 'react-router-dom'

import NavBar from '../../components/ui/NavBar/NavBar';
import { LoginForm } from '../../components/MultistepForm/LoginForm';
import Footer from '../../components/ui/Footer/Footer';

import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.user);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const updateLoginData = (fields) => {
    setLoginData((prevData) => ({ ...prevData, ...fields }));
  };

  const handleLogin = async () => {
    try {
      const { email, password } = loginData;
      await Auth.signIn(email, password);
      dispatch(setUser({ email }));
      navigate('/huiseigenaar-resultaat');
    } catch (error) {
      console.error('Fout bij inloggen:', error);
    }
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
