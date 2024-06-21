import React, { useEffect, useState } from "react";
import "./OverzichtJobs.css";
import { dynamo } from "../../../declarations";
import HandymanIcon from "@mui/icons-material/Handyman";

interface Klus {
  currentStatus: string;
  id: number;
  profession: string;
  region: string;
  task: string;
  user_email: string;
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
            user_email: item.user_email,
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

  const handleContactClick = (email: string) => {
    // Replace this with your actual routing logic
    window.location.href = `/chat?email=${email}`;
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
                  onClick={() => handleContactClick(klus.user_email)}
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
