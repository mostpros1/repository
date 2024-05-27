import React from 'react';
import './OverzichtJobs.css';

interface Klus {
  id: number;
  titel: string;
  beschrijving: string;
  status: string;
}

const klussen: Klus[] = [
  { id: 1, titel: 'Schilderen woonkamer', beschrijving: 'De muren van de woonkamer schilderen.', status: 'In uitvoering' },
  { id: 2, titel: 'Tuin opruimen', beschrijving: 'Bladeren en afval uit de tuin verwijderen.', status: 'Voltooid' },
  { id: 3, titel: 'Dakgoot schoonmaken', beschrijving: 'Dakgoten schoonmaken en bladeren verwijderen.', status: 'Nog te doen' },
  // Voeg meer klussen toe zoals nodig
];

const OverzichtKlussen: React.FC = () => {
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
