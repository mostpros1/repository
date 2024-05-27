import React from 'react';
import './OverzichtProf.css';

interface Vaksspecialist {
  id: number;
  naam: string;
  specialisatie: string;
  email: string;
}

const vaksspecialisten: Vaksspecialist[] = [
  { id: 1, naam: 'Jan de Vries', specialisatie: 'Elektricien', email: 'jan@voorbeeld.com' },
  { id: 2, naam: 'Piet Jansen', specialisatie: 'Loodgieter', email: 'piet@voorbeeld.com' },
  { id: 3, naam: 'Klaas Pieters', specialisatie: 'Timmerman', email: 'klaas@voorbeeld.com' },
  // Voeg meer vaksspecialisten toe hier
];

const OverzichtProf: React.FC = () => {
  return (
    <div className="overzicht-container">
      <h1>Overzicht van Vaksspecialisten</h1>
      <table className="overzicht-tabel">
        <thead>
          <tr>
            <th>Naam</th>
            <th>Specialisatie</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {vaksspecialisten.map((specialist) => (
            <tr key={specialist.id}>
              <td>{specialist.naam}</td>
              <td>{specialist.specialisatie}</td>
              <td>{specialist.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OverzichtProf;
