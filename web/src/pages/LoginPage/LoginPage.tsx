import  { useState } from 'react';
// LoginPage.js
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../actions/userActions';
import { RootState } from '../../store';

import NavBar from '../../components/ui/NavBar/NavBar';
import { LoginForm } from '../../components/MultistepForm/LoginForm';
import Footer from '../../components/ui/Footer/Footer';

import './LoginPage.css';

function LoginPage() {

  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

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
          <LoginForm {...loginData} updateFields={updateLoginData} setUserExists={() => {}}/>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default LoginPage;
