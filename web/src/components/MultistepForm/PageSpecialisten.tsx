import React, { useState, useEffect } from 'react';
import './PageSpecialisten.css';
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import { dynamo } from "../../../../backend_functions/declerations";

const exampleSpecialists = [
  {
    id: 1,
    name: 'Jan Schilder',
    profession: 'Loodgieter',
    location: 'Haarlem',
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
    rating: 2,
    bio: 'Ik werk in en om de omgeving van Amsterdam. Voor hoge kwaliteit werk moet je bij mij zijn.',
  },
  {
    id: 3,
    name: 'Jan Schilder',
    profession: 'Loodgieter',
    location: 'Haarlem',
    price: 500,
    rating: 4.5,
    bio: 'Ik werk in en om de omgeving van Amsterdam. Voor hoge kwaliteit werk moet je bij mij zijn.',
  },
];

const PageSpecialisten = () => {
  const [location, setLocation] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [priceFrom, setPriceFrom] = useState('');

  useEffect(() => {
    // This function will be called automatically whenever location, sortBy, or priceFrom changes.
    applyFilters();
  }, [location, sortBy, priceFrom]); // These are the dependencies for the effect.

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handlePriceFromChange = (event) => {
    setPriceFrom(event.target.value);
  };

  const applyFilters = () => {
    let filteredSpecialists = exampleSpecialists;

    // Filter by location
    if (location) {
      filteredSpecialists = filteredSpecialists.filter(specialist => specialist.location.toLowerCase() === location);
    }

    // Filter by price
    if (priceFrom) {
      filteredSpecialists = filteredSpecialists.filter(specialist => specialist.price >= parseInt(priceFrom));
    }

    // Sort by criteria
    if (sortBy) {
      if (sortBy === 'priceLowHigh') {
        filteredSpecialists.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'priceHighLow') {
        filteredSpecialists.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'rating') {
        filteredSpecialists.sort((a, b) => b.rating - a.rating);
      }
    }

    setSpecialists(filteredSpecialists);
  };

  const [specialists, setSpecialists] = useState(exampleSpecialists);
  
//make a function to grab data behind the hashtag in the url and print it into the console


//backend niet verwijderen
  useEffect(() => {
      const hashTag = window.location.hash.replace("#", "").split("?")[0];
      console.log(hashTag);
      const task = window.location.hash.replace("#", "").split("?")[1];
      console.log(task);
    dynamo.query({
      TableName: "Specialists",
      IndexName: "profession",
      KeyConditionExpression: "profession = :profession",
      FilterExpression: "task = :task",
      ExpressionAttributeValues: {
        ":profession": hashTag,
        ":task": task,
      },
    }).promise()
      .then(data => {
        setSpecialists(data.Items)
        console.log(data.Items);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);


  return (

    <div className="filter-bar">
      <select value={location} onChange={handleLocationChange} className="filter-select">
        <option value="">Select a location</option>
        <option value="amsterdam">Amsterdam</option>
        <option value="rotterdam">Rotterdam</option>
        <option value="utrecht">Utrecht</option>
        <option value="haarlem">Haarlem</option>
      </select>
      <select value={sortBy} onChange={handleSortByChange} className="filter-select">
        <option value="">Sort by</option>
        <option value="priceLowHigh">Price: Low to High</option>
        <option value="priceHighLow">Price: High to Low</option>
        <option value="rating">Rating</option>
      </select>
      <div className="specialisten-container">
        {specialists.map((specialist) => (
          <div key={specialist.id} className="specialist-card">
            <div className="specialist-header">
              <div className="specialist-info-1">
                <h3>{specialist.name}</h3>
                <h5>{specialist.profession}</h5>
              </div>
            </div>
            <div className="specialist-info-2">
              <p>{specialist.bio}</p>
            </div>
            <button className="contact-button">Contact opnemen</button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PageSpecialisten;