
function RegisterForm() {
  return (
    <div className="register-con">
        <h2>Maak een nieuwe account aan</h2>
        <form className="reg-form-con">
            <label htmlFor="">Voornaam:</label>
            <input type="text" placeholder="Voornaam"/>
            <label htmlFor="" >Achternaam:</label>
            <input type="text"  placeholder="Achternaam"/>
            <label htmlFor="">Email:</label>
            <input type="text" placeholder="Email"/>
            <label htmlFor="">Telefoonnummer:</label>
            <input type="text" placeholder="Telefoonnummer"/>
            <label htmlFor="">Wachtwoord:</label>
            <input type="text" placeholder="Wachtwoord"/>
            <label htmlFor="">Herhaal wachtwoord:</label>
            <input type="text" placeholder="Herhaal wachtwoord"/>
        </form>
        <div className="reg-link">Al een account? <a href="">Inloggen</a></div>
        <button className="form-btn register-btn">Maak account aan</button>
    </div>
  )
}

export default RegisterForm