import React, { useEffect, useState } from 'react';
import './OverzichtJobs.css';
import { dynamo } from '../../../declarations';

interface Klus {
  id: number;
  titel: string;
  beschrijving: string;
  status: string;
}

const OverzichtKlussen: React.FC = () => {
  const [klussen, setKlussen] = useState<Klus[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    dynamo.scan({
      TableName: "Professionals",
    }).promise()
     .then(data => {
      console.log("data: ", data.Items);
        if (data.Items){
          console.log("data: ", data.Items);
          // Transform data.Items into an array of Klus objects
          /*const klussenData = data.Items.map(item => ({
            id: item.id,
            titel: `${item.first_name} ${item.last_name}`, // Assuming you want to combine first_name and last_name into titel
            beschrijving: item.bio, // Assuming bio contains the description needed
            status: 'Available', // Or however you determine the status
            price: item.price,
            rating: item.rating,
          }));
  
          console.log("klussenData: ", klussenData);
          // Now set the transformed array to state
          setKlussen(klussenData);*/
        }
      })
      .catch(err => console.log("Error dynamo: ", err));
  }, []);

  if (loading) {
    return <div className="loading">Bezig met laden...</div>;
  }

  return (
    <div className="overzicht-klussen-container">
      <h1>Overzicht van alle klussen</h1>
      <div className="klussen-lijst">
        {klussen.map(klus => (
          <div key={klus.id} className="klus-card">
            <h2>{klus.titel}</h2>
            <p>{klus.beschrijving}</p>
            <p>Status: <span className={`status ${klus.status.replace(/\s+/g, '-').toLowerCase()}`}>{klus.status}</span></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverzichtKlussen;
