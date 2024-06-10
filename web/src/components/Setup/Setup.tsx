import React, { useState, useEffect } from 'react';
import './SetupPage.css';

const SetupPage = () => {
  const [tasks, setTasks] = useState([
    { id: 1, description: 'Maak een Stripe-account aan', completed: false },
    { id: 2, description: 'Voeg een profielfoto toe', completed: false },
    { id: 3, description: 'Verifieer je e-mailadres', completed: true },
    { id: 4, description: 'Voltooi je profielinformatie', completed: false },
  ]);

  useEffect(() => {
    const savedTasksString = localStorage.getItem('tasks');
    let savedTasks;
    if (savedTasksString!== null) {
      savedTasks = JSON.parse(savedTasksString);
    } else {
      savedTasks = [];
    }
    if (savedTasks) {
      setTasks(savedTasks);
    }
  }, []);

  const toggleTaskCompletion = (taskId) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <div className="setup-page">
      <h1>Stel je account in</h1>
      <ul className="task-list">
        {tasks.map(task => (
          <li 
            key={task.id} 
            className={`task-item ${task.completed ? 'completed' : ''}`} 
            onClick={() => toggleTaskCompletion(task.id)}
          >
            {task.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SetupPage;
