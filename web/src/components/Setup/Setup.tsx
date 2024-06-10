import React from 'react';
import './Setup.css';

const SetupPage = () => {
  const tasks = [
    { id: 1, description: 'Maak een Stripe-account aan', completed: false },
    { id: 2, description: 'Voeg een profielfoto toe', completed: false },
    { id: 3, description: 'Verifieer je e-mailadres', completed: true },
    { id: 4, description: 'Voltooi je profielinformatie', completed: false },
  ];

  return (
    <div className="setup-page">
      <h1>Stel je account in</h1>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
            {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SetupPage;