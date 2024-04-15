import React from 'react';
import './Jobs.css';

const professionals = [
    // Add the rest of your professionals here with the appropriate data
    { name: "Company name", function: "Function", rating: 5.0, reviews: 17 },
    { name: "Company name", function: "Function", rating: 6.0, reviews: 7 },
    { name: "Company name", function: "Function", rating: 8.0, reviews: 3 },
    { name: "Company name", function: "Function", rating: 3.0, reviews: 20 },
    { name: "Company name", function: "Function", rating: 2.0, reviews: 75 },
    { name: "Company name", function: "Function", rating: 9.0, reviews: 5 },
    { name: "Company name", function: "Function", rating: 1.0, reviews: 2 },
    // ... more professionals
  ];
  
  const Jobs = ({ name, function: role, rating, reviews }) => (
    <div className="card">
      <div className="card-header">
        <span className="company-name">{name}</span>
        <span className="function">{role}</span>
      </div>
      <div className="card-rating">
        <span className="stars">{'★'.repeat(Math.floor(rating))}</span>
        <span className="rating"> {rating} ({reviews} reviews)</span>
      </div>
      <button className="message-btn">Message</button>
      <a href="/profile" className="view-profile">view profile</a>
    </div>
  );
  
  const ProfessionalsList = () => (
    <div className="professionals-list">
      {professionals.map(professional => (
        <Jobs key={professional.name} {...professional} />
      ))}
    </div>
  );
  
export default Jobs;
