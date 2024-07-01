import React, { useEffect, useState } from "react";
import "./OverzichtJobs.css";
import { dynamo } from "../../../declarations";
import HandymanIcon from "@mui/icons-material/Handyman";
import { Auth } from "aws-amplify";

interface Klus {
  currentStatus: string;
  id: number;
  profession: string;
  region: string;
  task: string;
  user_id?: number;
  userEmail?: string
}

const OverzichtKlussen: React.FC = () => {
  const [klussen, setKlussen] = useState<Klus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    dynamo
      .scan({
        TableName: "Klussen",
        FilterExpression: "currentStatus = :statusVal",
        ExpressionAttributeValues: {
          ":statusVal": "pending",
        },
      })
      .promise()
      .then((data) => {
        if (data.Items) {
          console.log("data.Items: ", data.Items);
          const klussenData = data.Items.map((item) => ({
            currentStatus: item.currentStatus,
            id: item.id,
            profession: item.profession,
            region: item.region,
            task: item.task,
            user_id: item.user_id,
            userEmail: item.user_email,
          }));

          console.log("klussenData: ", klussenData);
          setKlussen(klussenData);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error dynamo: ", err);
        setLoading(false);
      });
  }, []);

  const handleContactClick = async (user_id, userEmail) => {
    try {
      // Attempt to get the current authenticated user
      const currentAuthenticatedUser = await Auth.currentAuthenticatedUser();
  
      const groups = currentAuthenticatedUser.signInUserSession.accessToken.payload["cognito:groups"];
  
      let userId;

      if (user_id == undefined){
        const output = await dynamo.query({
          TableName: "Users",
          IndexName: "username",
          KeyConditionExpression: "email = :email",
          ExpressionAttributeValues: {
            ":email": userEmail,
          }, 
        }).promise();

        if (output && output.Items && output.Items.length > 0) {
          userId = output.Items[0].id;
        }
      } else {
        userId = user_id;
      }

      if (groups?.includes("Professional")) {
        window.location.href = `/nl/pro-dashboard/chat?id=${userId}`;
      } else if (groups?.includes("Homeowner")) {
        window.location.href = `/nl/homewowner-dashboard/chat?id=${userId}`;
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

  if (loading) {
    return <div className="loading">Bezig met laden...</div>;
  }

  return (
    <div className="overzicht-klussen-container">
      <h1>Overzicht van alle klussen</h1>
      <div className="klussen-lijst">
        {klussen.map((klus) => (
          <div key={klus.id} className="klus-card">
            <div className="klus-card-content">
              <h2>{klus.profession}</h2>
              <p>Taak: {klus.task}</p>
              <p>Regio: {klus.region}</p>
              <div className="bottomrightLogo">
                <button
                  onClick={() => handleContactClick(klus.user_id, klus.userEmail)}
                  className="buttoncontact"
                >
                  Contact opnemen
                </button>
                <HandymanIcon />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverzichtKlussen;
