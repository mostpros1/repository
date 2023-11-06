import React, { useState } from 'react';
import './Searchbar.css';
import specialists from '../../../data/specialists.js';
import { Link } from 'react-router-dom';

function Searchbar() {
  const [value, setValue] = useState('');
  const [showList, setShowList] = useState(false); // Nieuwe state voor het tonen/verbergen van de lijst

  const handleInputFocus = () => {
    setShowList(true); // Toon de lijst wanneer de input de focus krijgt
  };

  const handleInputBlur = () => {
    setShowList(false); // Verberg de lijst wanneer de input de focus verliest
  };

  const filteredSpecialists = specialists.filter((item: any) => {
    const searchTerm = value.toLowerCase();
    const fullName = item.name.toLowerCase();
    return fullName.startsWith(searchTerm);
  });

  const slicedSpecialists = filteredSpecialists.slice(0, 3);
  
  const specialistsRender = slicedSpecialists.map((item: any) => (
    <Link key={item.id} to="/klussen" className="search_dropdown_item">
      {item.name}
    </Link>
  ));

  return (
    <>
      <div className={showList ? "search-container_open" : "search-container"}>
        <label>Wat is je klus?</label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Bijvoorbeeld: loodgieter"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        <div className={showList ? "search_dropdown open" : "search_dropdown"} >
          {specialistsRender}
        </div>
      </div>
    </>
  );
}

export default Searchbar;
