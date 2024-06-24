import React, { useState } from "react";
import "./HomeOwnerSettings.css";
import AWS from "aws-sdk";
import { Auth } from "aws-amplify";
import { Email } from "@mui/icons-material";
import { CognitoIdentityProviderClient, ChangePasswordCommand } from "@aws-sdk/client-cognito-identity-provider"; // ES Modules import


const HomeOwnerSecurity = () => {
  const [activeTab, setActiveTab] = useState("Security");
  const [password, setPassword] = useState("**********");
  const [passwordRepeat, setPasswordRepeat] = useState("**********");
  const [email, setEmail] = useState();
  const [emailRepeat, setEmailRepeat] = useState();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordRepeatChange = (e) => {
    setPasswordRepeat(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailRepeatChange = (e) => {
    setEmailRepeat(e.target.value);
  };

  const submitEmail = async () => {
    try {
      if (email !== emailRepeat) {
        console.log("Emails do not match");
        return;
      }
  
      console.log("Emails match");
  
      const currentAuthenticatedUser = await Auth.currentAuthenticatedUser();
      const username = currentAuthenticatedUser.username;
      console.log("Username: ", username);
  
      const params = {
        UserPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
        Username: username,
        UserAttributes: [
          {
            Name: 'email',
            Value: email
          }
        ]
      };
  
      const cognito = new AWS.CognitoIdentityServiceProvider({ region: "eu-north-1" });
  
      const data = await new Promise((resolve, reject) => {
        cognito.adminUpdateUserAttributes(params, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });
  
      console.log("Update response data: ", data);
  
      // Optionally, confirm the attribute was updated
      const userData = await cognito.adminGetUser({
        UserPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
        Username: username
      }).promise();
  
      console.log("Updated user data: ", userData);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

const login = async (username, password) => {
  try {
    const user = await Auth.signIn(username, password);
    const accessToken = user.signInUserSession.accessToken.jwtToken;
    return accessToken;
  } catch (error) {
    console.error("Error signing in", error);
    throw error;
  }
};

const client = new CognitoIdentityProviderClient({
  region: import.meta.env.VITE_AWS_REGION,
  accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
  secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
});

// Change password function
const changePassword = async (oldPassword, newPassword) => {
  const authenticatedUser = await Auth.currentAuthenticatedUser();
  const username = authenticatedUser.attributes.username;
  
  try {
    const accessToken = await login(username, oldPassword);
    
    const input = {
      PreviousPassword: oldPassword, // required
      ProposedPassword: newPassword, // required
      AccessToken: accessToken, // required
    };
    const command = new ChangePasswordCommand(input);
    const response = await client.send(command);
    console.log("Password change response: ", response);
  } catch (error) {
    console.error("Error changing password", error);
  }
};


const submitPassword = () => {
  changePassword(password, passwordRepeat);
}


  return (
    <div className="account-settings">
      <div id="account-setting-content">
        <div id="account-setting-content-header">Security</div>
        <div id="account-setting-content-body">
          <div className="account-setting">
            <label>huidig Wachtwoord</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
            />
            <label>Nieuw wachtwoord</label>
            <input
              type="password"
              value={passwordRepeat}
              onChange={handlePasswordRepeatChange}
            />
          </div>
          <button
            id="save-password-settings"
            onClick={submitPassword}
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
            <input type="email" placeholder="johndoe@gmail.com" onChange={handleEmailChange}/>
          </div>
          <div className="account-setting">
            <label>Re-enter Email</label>
            <input type="email" placeholder="johndoe@gmail.com" onChange={handleEmailRepeatChange}/>
          </div>
          <button id="accept-btn" onClick={submitEmail}> Bevestigen </button>
        </div>
      </div>
    </div>
  );
};

export default HomeOwnerSecurity;
