import React, { useEffect, useState } from 'react';
import './OverzichtProf.css';
import { dynamo } from '../../../declarations';

interface Vaksspecialist {
  id: number;
  naam: string;
  specialisatie: string;
  email?: string;
}

const OverzichtProf: React.FC = () => {
  const [vaksspecialisten, setVaksspecialisten] = useState<Vaksspecialist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  return (
    <div className="overzicht-container">
      <h1>Overzicht van Vakspecialisten</h1>
      <table className="overzicht-tabel">
        <thead>
          <tr>
            <th>Naam</th>
            <th>Specialisatie</th>
          </tr>
        </thead>
        <tbody>
          {vaksspecialisten.map((specialist) => (
            <tr key={specialist.id}>
              <td>{specialist.naam}</td>
              <td>{specialist.specialisatie}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OverzichtProf;
