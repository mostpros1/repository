import React, { useEffect, useState } from 'react';
import './OverzichtProf.css';
import { dynamo } from '../../../declarations';
import { useNavigate } from 'react-router-dom';
import { v5 as uuidv5 } from 'uuid'; // Import the v5 function from uuid library
import { Auth } from 'aws-amplify';

interface Vaksspecialist {
  id: number;
  naam: string;
  specialisatie: string;
  email?: string;
  fotoUrl?: string; // Assuming there's a photo URL in your data
}

const NAMESPACE = '6ba7b810-9dad-11d1-80b4-00c04fd430c8'; // Example namespace for generating UUIDs

const OverzichtProf: React.FC = () => {
  const [vaksspecialisten, setVaksspecialisten] = useState<Vaksspecialist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dynamo.scan({
          TableName: "Professionals",
        }).promise();

        const convertedItems = data.Items?.map(item => ({
          id: item.id,
          naam: `${item.first_name} ${item.last_name}`,
          specialisatie: item.profession,
          email: item.email,
          fotoUrl: item.photo_url, // Adjust based on your actual data structure
        }));

        setVaksspecialisten(convertedItems || []);
      } catch (error) {
        console.error('Error fetching data from DynamoDB', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="loading">Bezig met laden...</div>;
  }

  const handleStartChat = async (email: string) => {
    const userInfo = await dynamo.query({
      TableName: "Users",
      IndexName: "username",
      KeyConditionExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": email
      }
    }).promise();

    if (userInfo.Items && userInfo.Items.length > 0) {
      handleContactClick(userInfo.Items[0].id);
    }

  };
  const handleContactClick = async (user_id) => {
    try {
      // Attempt to get the current authenticated user
      const currentAuthenticatedUser = await Auth.currentAuthenticatedUser();
  
      const groups = currentAuthenticatedUser.signInUserSession.accessToken.payload["cognito:groups"];
  
      if (groups?.includes("Professional")) {
        window.location.href = `/nl/pro-dashboard/chat?id=${user_id}`;
      } else if (groups?.includes("Homeowner")) {
        window.location.href = `/nl/homewowner-dashboard/chat?id=${user_id}`;
      } else {
        alert("Je moet ingelogt zijn");
        window.location.href = "/nl/login";
      }
    } catch (error) {
      // Handle the error case where the user is not authenticated
      console.error("Authentication error:", error);
      alert("Je moet ingelogt zijn");
      window.location.href = "/nl/login";
    }
  };

  return (
    <div className="overzicht-container">
      <h1>Overzicht van Vakspecialisten</h1>
      <div className="profiel-container">
        {vaksspecialisten.map((specialist) => (
          <div key={specialist.id} className="profiel-blok">
            <div className="profiel-foto">
              {specialist.fotoUrl ? (
                <img src={specialist.fotoUrl} alt={specialist.naam} />
              ) : (
                <div className="placeholder-foto"> Geen Foto</div>
              )}
            </div>
            <div className="profiel-info">
              <h2>{specialist.naam}</h2>
              <p>{specialist.specialisatie}</p>
              {specialist.email && (
                <button onClick={() => handleStartChat(specialist.email!)}>Contact opnemen</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverzichtProf;
