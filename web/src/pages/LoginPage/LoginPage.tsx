import  { useState } from 'react';
import NavBar from '../../components/ui/NavBar/NavBar';
import { LoginForm } from '../../components/MultistepForm/LoginForm';
import Footer from '../../components/ui/Footer/Footer';

import './LoginPage.css';

function LoginPage() {

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const updateLoginData = (fields) => {
    setLoginData((prevData) => ({ ...prevData, ...fields }));
  };

  return (
    <>
      <NavBar />
      <div className="loginForm_wrapper">
        <div className="loginForm_con">
          <LoginForm {...loginData} updateFields={updateLoginData}} />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LoginPage;
