import React, { useState } from "react";
import "./HomeOwnerSecurity.css";

const HomeOwnerSecurity = () => {
  const [password, setPassword] = useState("**********");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handlePasswordChange = () => {
    // Hier zou je logica plaatsen om het wachtwoord te veranderen
  };

  const toggleTwoFactor = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    // Hier zou je aanvullende logica plaatsen voor het activeren van twee-factor-authenticatie
  };

  return (
    // Hier zou je de UI kunnen aanpassen om de gebruiker meer opties te geven
    <div>
      <div className="header-con">
      <p>Password & Security</p>
      </div>
      <div className="password-security">
        <label id="wachtwoord-con">Wachtwoord</label>
        <div className="field-input">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handlePasswordChange}>Wachtwoord wijzigen</button>
        </div>
        <div className="text-field">
          <label>2 Stap verificatie</label>
          <p>
            Door dit aan te doen beveilig u uw account van andere de mensen. U
            krijgt een persoonlijke code op gestuurd via sms of email.
          </p>
          <div className="toggle-switch">
            <label className="switch">
              <input
                type="checkbox"
                checked={twoFactorEnabled}
                onChange={toggleTwoFactor}
              />
              <span className="slider round"></span>
            </label>
            <label>2 Stap verificatie aanzetten</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeOwnerSecurity;
