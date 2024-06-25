import React, { useState } from "react";
import "./HomeOwnerSettings.css";
import AWS from "aws-sdk";
import { Auth } from "aws-amplify";
import { Email } from "@mui/icons-material";
import { CognitoIdentityProviderClient, ChangePasswordCommand } from "@aws-sdk/client-cognito-identity-provider"; // ES Modules import
import { dynamo } from "../../../declarations";


const HomeOwnerSecurity = () => {
  const [activeTab, setActiveTab] = useState("Security");
  const [oldPassword, setOldPassword] = useState();
  const [newPassword, setNewPassword] = useState();
  const [email, setEmail] = useState();
  const [emailRepeat, setEmailRepeat] = useState();

  const handlePasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  const handlePasswordRepeatChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailRepeatChange = (e) => {
    setEmailRepeat(e.target.value);
  };

  async function changeEmailUsers(oldEmail: string, newEmail) {
    const UserData = await dynamo.query({
      TableName: "Users",
      IndexName: "username",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": oldEmail
      },
    }).promise()


    if (UserData.Items && UserData.Items.length > 0){
      dynamo.update({
        TableName: "Users",
        Key: {
          id: UserData.Items[0].id,
        },
        UpdateExpression: `set email = :email`,
        ExpressionAttributeValues: {
          ":email": newEmail,
        },
      })
      .promise()
      .then(data => console.log(data.Attributes))
      .catch(console.error)
    }

  }

  async function changeEmailPros(oldEmail: string, newEmail) {
    const ProData = await dynamo.query({
      TableName: "Professionals",
      IndexName: "emailIndex",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": oldEmail
      },
    }).promise()

    if (ProData.Items && ProData.Items.length > 0){
      dynamo.update({
        TableName: "Professionals",
        Key: {
          id: ProData.Items[0].id,
        },
        UpdateExpression: `set email = :email`,
        ExpressionAttributeValues: {
          ":email": newEmail,
        },
      })
      .promise()
      .then(data => console.log(data.Attributes))
      .catch(console.error)
    }

  }

  

  const submitEmail = async (email, emailRepeat) => {
    try {
      if (email !== emailRepeat) {
        console.log("Emails do not match");
        return;
      }

      console.log("Emails match");


      const currentAuthenticatedUser = await Auth.currentAuthenticatedUser();
      const username = currentAuthenticatedUser.username;
      console.log("Username: ", username);

      const groups = currentAuthenticatedUser.signInUserSession.accessToken.payload["cognito:groups"];

      if (groups?.includes("Professional")) {
        await changeEmailUsers(currentAuthenticatedUser.attributes.email, email);
        await changeEmailPros(currentAuthenticatedUser.attributes.email, email);
      } else if (groups?.includes("Homeowner")){
        await changeEmailUsers(currentAuthenticatedUser.attributes.email, email);
      }

      const params = {
        UserPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
        Username: username,
        UserAttributes: [
          {
            Name: 'email',
            Value: email
          },
          {
            Name: 'email_verified',
            Value: 'true' // Marking the new email as verified
          }
        ]
      };

      console.log("Params for updating user attributes: ", params);

      const cognito = new AWS.CognitoIdentityServiceProvider({
        region: import.meta.env.VITE_AWS_REGION,
        accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY
      });

      console.log("Cognito instance created");

      await new Promise((resolve, reject) => {
        cognito.adminUpdateUserAttributes(params, (err, data) => {
          if (err) {
            console.error("Error updating user attributes: ", err);
            alert("Error updating user attributes: " + err);
            reject(err);
          } else {
            console.log("Update response data: ", data);
            alert("Email adress veranderd");
            resolve(data);
          }
        });
      });

      // Optionally, confirm the attribute was updated
      const userData = await cognito.adminGetUser({
        UserPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
        Username: username
      }).promise();

      console.log("Updated user data: ", userData);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  // Change password function
  async function changePassword(oldPassword: string, newPassword: string) {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const data = await Auth.changePassword(user, oldPassword, newPassword);
      alert(data + " Wachtwoord Veranderd!!!");
    } catch (err) {
      alert("Probleem tijdens wachtwoord veranderen: " + err);
    }
  }


  const submitPassword = () => {
    changePassword(oldPassword || "", newPassword || "");
  }

  function changeEmail(){
    submitEmail(email, emailRepeat);
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
              value={oldPassword}
              onChange={handlePasswordChange}
            />
            <label>Nieuw wachtwoord</label>
            <input
              type="password"
              value={newPassword}
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
            <input type="email" placeholder="johndoe@gmail.com" onChange={handleEmailChange} />
          </div>
          <div className="account-setting">
            <label>Herhaal Email</label>
            <input type="email" placeholder="johndoe@gmail.com" />
          </div>
          <button id="accept-btn" onClick={changeEmail}> Bevestigen </button>
        </div>
      </div>
    </div>
  );
};

export default HomeOwnerSecurity;
