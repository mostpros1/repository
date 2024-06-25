import React, { useState } from "react";
import "./HomeOwnerSettings.css";

const HomeOwnerSecurity = () => {
  const [activeTab, setActiveTab] = useState("Security");
  const [password, setPassword] = useState("**********");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="account-settings">
      <div id="account-setting-content">
        <div id="account-setting-content-header">Security</div>
        <div id="account-setting-content-body">
          <div className="account-setting">
            <label>Wachtwoord</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <label>Herhaal wachtwoord</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <button
            id="save-password-settings"
            onClick={() => console.log("Password Changed!")}
          >
            Opslaan
          </button>
        </div>
      </div>
      
      {/* Account Details */}
      
      <div id="account-setting-content">
        <div id="account-setting-content-header">Account Details</div>
        <div id="account-setting-content-body">
          <div className="account-setting">
            <label>Email</label>
            <input type="email" placeholder="johndoe@gmail.com" />
          </div>
          <div className="account-setting">
            <label>Herhaal Email</label>
            <input type="email" placeholder="johndoe@gmail.com" />
          </div>
          <button id="accept-btn"> Bevestigen </button>
        </div>
      </div>
    </div>
  );
};

export default HomeOwnerSecurity;
