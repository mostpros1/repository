// import { Dispatch, SetStateAction, useState } from 'react';
// import facebook from '../../assets/facebook_.svg';
// import google from '../../assets/google_.svg';
// import instagram from '../../assets/instagram_.svg';
// import { Link } from 'react-router-dom';

// type LoginData = {
//   email: string
//   password: string
// }

// type LoginFormProps = LoginData & {
//   updateFields: (fields: Partial<LoginData>) => void
//   setUserExists: Dispatch<SetStateAction<boolean>>
//   handleLogin: () => void;
//   setError: (error: string) => void;
//   error: string;
// }

// export function LoginForm({ email, password, updateFields, setUserExists, handleLogin, error }: LoginFormProps) {


//   return (
//     <>
//       <div className='login-con'>
//         {error && (
//           <div className="error-con">
//             <p className="error-message">{error}</p>
//           </div>
//         )}
//         <h2>Login om vakspecialist te vinden</h2>
//         <div className='login-form-con'>
//           <div className='login-form'>
//             <label>Email</label>
//             <input
//               required
//               type="email"
//               placeholder='Bijv. joe@hotmail.com'
//               value={email}
//               onChange={e => updateFields({ email: e.target.value })}
//             />
//             <label>Wachtwoord</label>
//             <input
//               required
//               type="password"
//               placeholder='Wachtwoord'
//               value={password}
//               onChange={e => updateFields({ password: e.target.value })}
//             />
//           </div>
//           <p className='login-link'>Nog geen account? <a href="#" onClick={() => setUserExists(false)}>Account aanmaken</a></p>
//           <Link className='login-link' to="/wachtwoord-vergeten">Wachtwoord vergeten?</Link>
//           <button className='Button-login' type="button" onClick={handleLogin}>
//             Login
//           </button>
//         </div>
//         <div className='social-con'>
//           <div>Of login met onderstaande opties</div>
//           <div className='social-btn'><img src={facebook} alt="" />Facebook</div>
//           <div className='social-btn'><img src={google} alt="" />Gmail</div>
//           <div className='social-btn'><img src={instagram} alt="" />Instagram</div>
//         </div>
//       </div>
//     </>
//   )
// }

/// new code 
import { Dispatch, SetStateAction, useState, KeyboardEvent } from 'react';
import facebook from '../../assets/facebook_.svg';
import google from '../../assets/google_.svg';
import instagram from '../../assets/instagram_.svg';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

type LoginData = {
  email: string;
  password: string;
};

type LoginFormProps = LoginData & {
  updateFields: (fields: Partial<LoginData>) => void;
  setUserExists: Dispatch<SetStateAction<boolean>>;
  handleLogin: () => void;
  setError: (error: string) => void;
  error: string;
}



export function LoginForm({ email, password, updateFields, setUserExists, handleLogin, error }: LoginFormProps) {


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
            />
            <label>Wachtwoord</label>
            <input
              required
              type="password"
              placeholder='Wachtwoord'
              value={password}
              onChange={e => updateFields({ password: e.target.value })}
            />
          </div>
          <p className='login-link'>Nog geen account? <a href="#" onClick={() => setUserExists(false)}>Account aanmaken</a></p>
          <Link className='login-link' to="/wachtwoord-vergeten">Wachtwoord vergeten?</Link>
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