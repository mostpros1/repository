import React, { useEffect, useState } from 'react';
import './OverzichtJobs.css';

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
    const fetchKlussen = async () => {
      try {
        const response = await fetch('/api/klussen');
        const data = await response.json();
        setKlussen(data);
      } catch (error) {
        console.error('Fout bij het ophalen van de klussen:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKlussen();
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
