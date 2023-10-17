import facebook from '../../assets/facebook_.svg';
import google from '../../assets/google_.svg';
import instagram from '../../assets/instagram_.svg';

function LoginForm() {
  return (
    <div className='login-con'>
        <h2>Login om vakspecialist te vinden</h2>
        <div className='login-form-con'>
            <form className='login-form'>
                <label>Email</label>
                <input type="text" placeholder='Bijv. joe@hotmail.com'/>
                <label>Wachtwoord</label>
                <input type="text" placeholder='Wachtwoord'/>
            </form>
            <div className='login-link'>Nog geen account? <a href="#">Account aanmaken inschrijven als professional</a></div>
            <button className='form-btn login-btn'>Inloggen</button>    
        </div> 
         <div className='social-con'>
            <div>Of login met onderstaande opties</div>
            <div className='social-btn'><img src={facebook} alt="" /> Facebook</div>
            <div className='social-btn'><img src={google} alt="" />Gmail</div>
            <div className='social-btn'><img src={instagram} alt="" />Instagram</div>
        </div>   
    </div>
  )
}

export default LoginForm