import React, { useState, useEffect } from 'react';
import './Setup.css';
import { Auth } from 'aws-amplify';
import { dynamo } from '../../../declarations';

const SetupPage = () => { // Removed async here

  // Step 1: Define a type for user data attributes
  type UserDataAttributes = {
    email_verified?: boolean;
    email?: string; // Marking as optional if not all users will have this attribute
    // Add other attributes as needed
  };

  // Step 2: Use the defined type when initializing useState
  const [userData, setUserData] = useState<UserDataAttributes>({});
  const [profilePhoto, setProfilePhoto] = useState(false);
  const [bio, setBio] = useState(false);


  useEffect(() => {
    async function fetchUserData() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const userData = user.attributes;
        setUserData(userData);

        // Check if email is verified

      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserData();
  }, []);

 

  useEffect(() => {
    async function fetchProfilePhoto() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        const userData = user.attributes;

        const output = await dynamo.query({
          TableName: 'Users',
          IndexName: 'username',
          KeyConditionExpression: 'email = :email',
          ExpressionAttributeValues: {
            ':email': userData.email,
          },
        }).promise();

        if (output && output.Items && output.Items.length > 0) {
          const user = output.Items[0];
          if (user.profielfoto !== undefined && user.profielfoto !== null) {
            setProfilePhoto(!!user.profilePhoto);
          }
          
        }

      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }

    async function grabBio() {
      try {

        const authenticatedUser = await Auth.currentAuthenticatedUser();
        const groups = authenticatedUser.signInUserSession.accessToken.payload["cognito:groups"];

        if (groups && groups.includes("Homeowner")) {
          
          setBio(true); // change when homeowner bio is implemented
        
        } else if (groups && groups.includes("Professional")) {
          const output = await dynamo.query({
            TableName: 'Professionals',
            IndexName: 'emailIndex',
            KeyConditionExpression: 'email = :email',
            ExpressionAttributeValues: {
              ':email': authenticatedUser.attributes.email,
            },
          }).promise();
  
          
          if (output && output.Items && output.Items.length > 0) {
            const user = output.Items[0];
            if (user.bio !== undefined && user.bio !== null) {
              
              setBio(!!user.bio);
            }
            
          }
        }
        

      } catch (error) {
        console.error("Error fetching bio:", error);
      }
    }


    fetchProfilePhoto();
    grabBio();
  }, []);


  const tasks = [
    { id: 1, description: 'Maak een Stripe-account aan', completed: !!userData['custom:stripeAccountId'] },
    //{ id: 2, description: 'Voeg een profielfoto toe', completed: profilePhoto },
    { id: 3, description: 'Verifieer je e-mailadres', completed: userData.email_verified },
    { id: 4, description: 'Voltooi je profielinformatie', completed: bio },
  ];

  return (
    <div className="setup-page">
      <h1>Stel je account in</h1>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            {task.description}
          </li>
        ))}
      </ul>
      {/* Render user data here */}
    </div>
  );
};

export default SetupPage;