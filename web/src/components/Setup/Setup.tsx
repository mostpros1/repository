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

  console.log(userData);

  useEffect(() => {
    async function fetchProfilePhoto() {
      try {
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
        console.error("Error fetching bio:", error);
      }
    }

    fetchProfilePhoto();
  }, []);


  const tasks = [
    { id: 1, description: 'Maak een Stripe-account aan', completed: !!userData['custom:stripeAccountId'] },
    { id: 2, description: 'Voeg een profielfoto toe', completed: profilePhoto },
    { id: 3, description: 'Verifieer je e-mailadres', completed: userData.email_verified },
    { id: 4, description: 'Voltooi je profielinformatie', completed: false },
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