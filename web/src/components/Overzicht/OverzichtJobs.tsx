import React, { useEffect, useState } from 'react';
import './OverzichtJobs.css';
import { dynamo } from '../../../declarations';

interface Klus {
  currentStatus: string;
  id: number;
  profession: string;
  region: string;
  task: string
  user_email: string,
}

const OverzichtKlussen: React.FC = () => {
  const [klussen, setKlussen] = useState<Klus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    dynamo.scan({
      TableName: "Klussen",
      FilterExpression: "currentStatus = :statusVal",
      ExpressionAttributeValues: {
        ":statusVal": "pending"
      }
    }).promise()

      .then(data => {
        if (data.Items) {
          console.log("data.Items: ", data.Items);
          // Transform data.Items into an array of Klus objects
          const klussenData = data.Items.map(item => ({
            currentStatus: item.currentStatus,
            id: item.id,
            profession: item.profession,
            region: item.region,
            task: item.task,
            user_email: item.user_email,
          }));

          console.log("klussenData: ", klussenData);
          // Now set the transformed array to state
          setKlussen(klussenData);
        }
      })
      .catch(err => console.log("Error dynamo: ", err));
  }, []);

  /*if (loading) {
    return <div className="loading">Bezig met laden...</div>;
  }*/

  return (
    <div className="overzicht-klussen-container">
      <h1>Overzicht van alle klussen</h1>
      <div className="klussen-lijst">
        {klussen.map(klus => (
          <div key={klus.id} className="klus-card">
            <h2>{klus.profession}</h2>
            <p>{klus.task}</p>
            <p>Status: <span className={`status ${klus.currentStatus.replace(/\s+/g, '-').toLowerCase()}`}>{klus.currentStatus}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverzichtKlussen;
