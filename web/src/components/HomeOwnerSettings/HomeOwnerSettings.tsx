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
            {/* Add Account related settings here */}
          </div>
        </div>
      )}
      {activeTab === "Privacy" && (
        <div id="account-setting-content">
          <div id="account-setting-content-header">Privacy Settings</div>
          <div id="account-setting-content-body">
            {/* Add Privacy related settings here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeOwnerSecurity;
