import { Dispatch, SetStateAction, useState } from 'react';
import facebook from '../../assets/facebook_.svg';
import google from '../../assets/google_.svg';
import instagram from '../../assets/instagram_.svg';
import { Link } from 'react-router-dom';

type LoginData = {
  email: string
  password: string
}

type LoginFormProps = LoginData & {
  updateFields: (fields: Partial<LoginData>) => void
  setUserExists: Dispatch<SetStateAction<boolean>>
  handleLogin: () => void;
  setError: (error: string) => void;
  error: string;
}

export function LoginForm({ email, password, updateFields, setUserExists, handleLogin, error }: LoginFormProps) {

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <>
      <div className='login-con'>
        {error && (
          <div className="error-con">
            <p className="error-message">{error}</p>
          </div>
        )}
        <h2>Login om vakspecialist te vinden</h2>
        <div className='login-form-con'>
          <div className='login-form'>
            <label>Email</label>
            <input
              required
              type="email"
              placeholder='Bijv. joe@hotmail.com'
              value={email}
              onChange={e => updateFields({ email: e.target.value })}
              onKeyPress={handleKeyPress}
            />
            <label>Wachtwoord</label>
            <input
              required
              type="password"
              placeholder='Wachtwoord'
              value={password}
              onChange={e => updateFields({ password: e.target.value })}
              onKeyPress={handleKeyPress}
            />
          </div>
          <p className='login-link'>Nog geen account? <a href="/nl/register" onClick={() => setUserExists(false)}>Account aanmaken</a></p>
          <Link className='login-link' to="/nl/forgot-password">Wachtwoord vergeten?</Link>
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </div>
        <div className='social-con'>
          <div>Of login met onderstaande opties</div>
          <div className='social-btn'><img src={facebook} alt="" />Facebook</div>
          <div className='social-btn'><img src={google} alt="" />Gmail</div>
          <div className='social-btn'><img src={instagram} alt="" />Instagram</div>
        </div>
      </div>
    </>
  )
}
