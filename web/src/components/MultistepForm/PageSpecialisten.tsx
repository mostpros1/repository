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
    location: 'Utrecht',
    price: 450,
    rating: 4.5,
    bio: 'Ik werk in en om de omgeving van Amsterdam. Voor hoge kwaliteit werk moet je bij mij zijn.',
  },
  {
    id: 6,
    name: 'Jan Schilder',
    profession: 'Loodgieter',
    location: 'Amsterdam',
    price: 200,
    rating: 4.5,
    bio: 'Ik werk in en om de omgeving van Amsterdam. Voor hoge kwaliteit werk moet je bij mij zijn.',
  },
  {
    id: 7,
    name: 'Jan Schilder',
    profession: 'Loodgieter',
    location: 'Amsterdam',
    price: 300,
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
      // Implement your filter logic here
      console.log({ location, sortBy, priceFrom });
      // Add the code to filter your data based on the selected values
    };
  
  const [specialists, setSpecialists] = useState(exampleSpecialists);
  useEffect(() => {
    dynamo.query({
        TableName: "Specialists",
        IndexName: "profession",
        KeyConditionExpression: "profession = :profession",
        ExpressionAttributeValues: {
            ":profession": "" // inplaats van de "" zet je de input van de zoek balk
        }
    }).promise()
        .then(data => {
            // Process the data and update the specialists state
            setSpecialists(data.Items);
        })
        .catch(err => {
            console.log(err);
        });
}, []);

  return (
    
    <div className="specialisten-container">
      <div className="filter-bar">
      <select value={location} onChange={handleLocationChange} className="filter-select">
        <option value="">Select a location</option>
        <option value="amsterdam">Amsterdam</option>
        <option value="rotterdam">Rotterdam</option>
        <option value="utrecht">Utrecht</option>
        // Add more options as needed
      </select>
      <select value={sortBy} onChange={handleSortByChange} className="filter-select">
        <option value="">Sort by</option>
        <option value="priceLowHigh">Price: Low to High</option>
        <option value="priceHighLow">Price: High to Low</option>
        <option value="rating">Rating</option>
        // Add more options as needed
      </select>
    </div>
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
