import React, { useState, useEffect } from 'react';
import './PageSpecialisten.css';
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import { dynamo } from "../../../declarations";

const exampleSpecialists = [
  {
    id: 1,
    first_name: 'Jan',
    last_name: 'Schilder',
    profession: 'Loodgieter',
    region: 'Haarlem',
    //price: 500,
    rating: 4.5,
    bio: 'Ik werk in en om de omgeving van Amsterdam. Voor hoge kwaliteit werk moet je bij mij zijn.',
  },
  {
    id: 2,
    first_name: 'Jan',
    last_name: 'Schilder',
    profession: 'Loodgieter',
    region: 'Amsterdam',
    //price: 500,
    rating: 2,
    bio: 'Ik werk in en om de omgeving van Amsterdam. Voor hoge kwaliteit werk moet je bij mij zijn.',
  },
  {
    id: 3,
    first_name: 'Jan',
    last_name: 'Schilder',
    profession: 'Loodgieter',
    region: 'Haarlem',
    //price: 500,
    rating: 4.5,
    bio: 'Ik werk in en om de omgeving van Amsterdam. Voor hoge kwaliteit werk moet je bij mij zijn.',
  },
];

const PageSpecialisten = (updateDate, /*{ date }*/) => {
  const [location, setLocation] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [specialists, setSpecialists] = useState(exampleSpecialists);

  useEffect(() => {
    const applyFilters = () => {
      let filteredSpecialists = specialists;

      // Filter by location
      if (location) {
        filteredSpecialists = filteredSpecialists.filter(specialist => specialist.region.toLowerCase() === location);
      }

      // Filter by price
      /*if (priceFrom) {
        filteredSpecialists = filteredSpecialists.filter(specialist => specialist.price >= parseInt(priceFrom));
      }*/

      // Sort by criteria
      if (sortBy) {
        /*if (sortBy === 'priceLowHigh') {
          filteredSpecialists.sort((a, b) => a.price - b.price);
        } else if (sortBy === 'priceHighLow') {
          filteredSpecialists.sort((a, b) => b.price - a.price);
        } else*/  if (sortBy === 'rating') {
          filteredSpecialists.sort((a, b) => b.rating - a.rating);
        }
      }

      setSpecialists(filteredSpecialists);
    };

    // This function will be called automatically whenever location, sortBy, priceFrom, or specialists changes.
    applyFilters();
  }, [location, sortBy, priceFrom, specialists]); // Include 'specialists' in the dependency array.
  
  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  /*const handlePriceFromChange = (event) => {
    setPriceFrom(event.target.value);
  };*/

  //backend niet verwijderen
  useEffect(() => {
    let professionals: any[] = [];

    const profession = window.location.hash.replace("#", "").split("?")[0];

    const task = window.location.hash.replace("#", "").split("?")[1];

    dynamo.query({
      TableName: "Professionals",
      IndexName: "profession",
      KeyConditionExpression: "profession = :profession",
      FilterExpression: "task = :task",
      ExpressionAttributeValues: {
        ":profession": profession,
        ":task": task,
      },
    }).promise()
      .then(data => {

        const convertedItems = data.Items?.map(item => ({
          id: item.id,
          first_name: item.first_name,
          last_name: item.last_name,
          email: item.email,
          profession: item.profession,
          price: item.price,
          rating: item.rating,
          bio: item.bio,
          availibility: item.availibility,


        }));
        /*
                const Availability = JSON.parse(convertedItems[0].availibility);
                '{"dates":["2024-03-31","2024-04-01","2024-04-02"]}'
                console.log("Availability =", Availability);
        */

        if (convertedItems) {
          for (let i: number = 0; i < convertedItems.length; i++) {
            if (convertedItems[i].availibility) {
              const Availability = JSON.parse(convertedItems[i].availibility);

              for (let x: number = 0; x < Availability.dates.length; x++) {

                const selected = JSON.stringify(updateDate).replace('T', '"').split('"')[3];

                if (selected == Availability.dates[x]) {
                  professionals = [...professionals, convertedItems[i]];
                  break;
                }
              }
            }
          }
        setSpecialists(/*convertedItems*/professionals);


      }}).catch(err => {
        console.log(err);
      });

  }, [updateDate]);

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
                <h3>{specialist.first_name + " " + specialist.last_name}</h3>
                <h5>{specialist.profession}</h5>
                <h5>{specialist.region}</h5>
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
