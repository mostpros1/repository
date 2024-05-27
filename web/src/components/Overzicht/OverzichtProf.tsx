import React, { useEffect, useState } from 'react';
import './OverzichtProf.css';

interface Vaksspecialist {
  id: number;
  naam: string;
  specialisatie: string;
  email: string;
}

const OverzichtProf: React.FC = () => {
  const [vaksspecialisten, setVaksspecialisten] = useState<Vaksspecialist[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simuleren van een API call
    const fetchVaksspecialisten = async () => {
      try {
        const response = await fetch('/api/vaksspecialisten'); // Vervang dit met de echte API endpoint
        const data = await response.json();
        setVaksspecialisten(data);
      } catch (error) {
        console.error('Fout bij het ophalen van de vaksspecialisten:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVaksspecialisten();
  }, []);

  if (loading) {
    return <div className="loading">Bezig met laden...</div>;
  }

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
