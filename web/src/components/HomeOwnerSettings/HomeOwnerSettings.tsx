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
      <div id="account-settings-tabs">
        <div
          className={`account-settings-tab ${activeTab === "Account" ? "active" : ""}`}
          onClick={() => setActiveTab("Account")}
        >
          Account
        </div>
        <div
          className={`account-settings-tab ${activeTab === "Security" ? "active" : ""}`}
          onClick={() => setActiveTab("Security")}
        >
          Security
        </div>
        <div
          className={`account-settings-tab ${activeTab === "Privacy" ? "active" : ""}`}
          onClick={() => setActiveTab("Privacy")}
        >
          Privacy
        </div>
      </div>
      {activeTab === "Security" && (
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
            <button id="save-password-settings" onClick={() => console.log("Password Changed!")}>Opslaan</button>
          </div>
        </div>
      )}
      {activeTab === "Account" && (
        <div id="account-setting-content">
          <div id="account-setting-content-header">Account Details</div>
          <div id="account-setting-content-body">
            <div className="account-setting">
              <label>Email</label>
              <input type="email" placeholder="johndoe@gmail.com" />
            </div>
            <div className="account-setting">
              <label>Re-enter Email</label>
              <input type="email" placeholder="johndoe@gmail.com" />
            </div>
            <button id="accept-btn"> Bevestigen </button>
          </div>
        </div>
      )}
      {activeTab === "Privacy" && (
        <div id="account-setting-content">
          <div id="account-setting-content-header">Privacy Settings</div>
          <div id="account-setting-content-body">

            <div className="account-setting">
              <label>Privacy Policy</label>
              <p></p>
              <input type="checkbox" />
            </div>
            <div className="account-setting">
              <label>Terms and Conditions</label>
              <input type="checkbox" />
            </div>
            <button id="accept-btn"> Accept </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeOwnerSecurity;
