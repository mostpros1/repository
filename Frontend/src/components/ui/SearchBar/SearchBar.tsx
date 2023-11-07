import './SearchBar.css';
import specialists from '../../../data/specialists.js';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function Searchbar() {
  const [value, setValue] = useState('');
  const [showList, setShowList] = useState(false);

  const handleInputBlur = (e) => {
    if (!e.relatedTarget || e.relatedTarget.className !== 'search_dropdown_item') {
      setShowList(false);
    }
  };

  const handleInputFocus = () => {
    setShowList(true);
  };

  // Voeg een voorwaarde toe om alle specialisten weer te geven als de input leeg is
  const filteredSpecialists = value === '' ? specialists : specialists.filter((item: any) => {
    const searchTerm = value.toLowerCase();
    const fullName = item.name.toLowerCase();
    return fullName.startsWith(searchTerm);
  });

  const slicedSpecialists = filteredSpecialists.slice(0, 3);

  const specialistsRender = slicedSpecialists.map((item: any) => (
    <Link to="/klussen" key={item.id} className="search_dropdown_item">
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
