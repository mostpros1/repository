import React, { useState, useEffect } from 'react';
import './PageSpecialisten.css'; // Zorg ervoor dat je een CSS-bestand aanmaakt voor de styling
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";

// Voorbeeld van een specialistenlijst
const exampleSpecialists = [
  {
    id: 1,
    name: 'Jan Schilder',
    profession: 'Loodgieter',
    location: 'Amsterdam',
    price: 500,
    rating: 4.5,
    bio: 'Ik werk in en om de omgeving van Amsterdam. Voor hoge kwaliteit werk moet je bij mij zijn.',
  },
  {
    id: 2,
    name: 'Jan Schilder',
    profession: 'Loodgieter',
    location: 'Amsterdam',
    price: 500,
    rating: 4.5,
    bio: 'Ik werk in en om de omgeving van Amsterdam. Voor hoge kwaliteit werk moet je bij mij zijn.',
  },
  {
    id: 3,
    name: 'Jan Schilder',
    profession: 'Loodgieter',
    location: 'Amsterdam',
    price: 500,
    rating: 4.5,
    bio: 'Ik werk in en om de omgeving van Amsterdam. Voor hoge kwaliteit werk moet je bij mij zijn.',
  },
  {
    id: 4,
    name: 'Jan Schilder',
    profession: 'Loodgieter',
    location: 'Amsterdam',
    price: 500,
    rating: 4.5,
    bio: 'Ik werk in en om de omgeving van Amsterdam. Voor hoge kwaliteit werk moet je bij mij zijn.',
  },
  {
    id: 5,
    name: 'Jan Schilder',
    profession: 'Loodgieter',
    location: 'Amsterdam',
    price: 500,
    rating: 4.5,
    bio: 'Ik werk in en om de omgeving van Amsterdam. Voor hoge kwaliteit werk moet je bij mij zijn.',
  },
  {
    id: 6,
    name: 'Jan Schilder',
    profession: 'Loodgieter',
    location: 'Amsterdam',
    price: 500,
    rating: 4.5,
    bio: 'Ik werk in en om de omgeving van Amsterdam. Voor hoge kwaliteit werk moet je bij mij zijn.',
  },
  {
    id: 7,
    name: 'Jan Schilder',
    profession: 'Loodgieter',
    location: 'Amsterdam',
    price: 500,
    rating: 4.5,
    bio: 'Ik werk in en om de omgeving van Amsterdam. Voor hoge kwaliteit werk moet je bij mij zijn.',
  },
  {
    id: 8,
    name: 'Jan Schilder',
    profession: 'Loodgieter',
    location: 'Amsterdam',
    price: 500,
    rating: 4.5,
    bio: 'Ik werk in en om de omgeving van Amsterdam. Voor hoge kwaliteit werk moet je bij mij zijn.',
  },
  {
    id: 9,
    name: 'Jan Schilder',
    profession: 'Loodgieter',
    location: 'Amsterdam',
    price: 500,
    rating: 4.5,
    bio: 'Ik werk in en om de omgeving van Amsterdam. Voor hoge kwaliteit werk moet je bij mij zijn.',
  },
  // Voeg meer specialisten toe zoals nodig
];

const PageSpecialisten = () => {
  // Je kunt hier state gebruiken voor het laden van echte data
  const [specialists, setSpecialists] = useState(exampleSpecialists);

  // Deze effect kan worden gebruikt om data te laden van een API
  useEffect(() => {
    // Laad je specialisten data
    // setSpecialists(loadedSpecialists);
  }, []);

  return (
    <div className="specialisten-container">
      {specialists.map((specialist) => (
        <div key={specialist.id} className="specialist-card">
        <div className="specialist-header">
            <div className="specialist-image">
                <img src="arrowL.png"/>
            </div>
            <div className="specialist-info-1">
                <h3>{specialist.name}</h3>
                <h5>{specialist.profession}</h5>
            </div>
        </div>
          <div className="specialist-info-2">
            <p>{specialist.bio}</p>
            <div className="specialist-footer">
              <span className="rating"><FaStar /></span>
              <span className="rating"><FaStar /></span>
              <span className="rating"><FaStar /></span>
              <span className="rating"><FaStar /></span>
              <span className="rating"><FaStarHalf /></span>
              <span className="price">€{specialist.price}</span>
            </div>
          </div>
          <button className="contact-button">Contact opnemen</button>
        </div>
      ))}
    </div>
  );
};

export default PageSpecialisten;
