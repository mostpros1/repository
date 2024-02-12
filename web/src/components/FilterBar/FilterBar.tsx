import "./FilterBar.css";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import joblisting from '../JobList/JobCards'; // Importeer de array met items

function FilterBar() {
  const [showLocationOptions, setShowLocationOptions] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showPriceOptions, setShowPriceOptions] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Select a location");
  const [selectedSort, setSelectedSort] = useState("Select a sorting option");
  const [selectedPrice, setSelectedPrice] = useState("Select a price option");
  const [itemsList, setItemsList] = useState(joblisting); // Gebruik de items van het geïmporteerde bestand

  const locationOptions = ["Amsterdam", "Rotterdam", "Haarlem"];
  const sortOptions = ["Van laag naar hoog", "Van hoog naar laag", "Alfabetisch"];
  const priceOptions = ["€100", "€200", "€300"];

  const handleLocationSelect = (option) => {
    setSelectedLocation(option);
    setShowLocationOptions(false);
  };

  const handleSortSelect = (option) => {
    setSelectedSort(option);
    setShowSortOptions(false);
    sortItems(option);
  };

  const handlePriceSelect = (option) => {
    setSelectedPrice(option);
    setShowPriceOptions(false);
  };

  return (
    <div className="filterbar">
      <div className="filter-con">
        <div className="filter_menu_items">
          <div className="filter_items_con">
            <p>Locatie</p>
            <div className="sort_text_con">
              <p onClick={() => setShowLocationOptions(!showLocationOptions)}>{selectedLocation}</p>
              <ExpandMoreIcon onClick={() => setShowLocationOptions(!showLocationOptions)} />
              {showLocationOptions && (
                <ul className="filter_items">
                  {locationOptions.map((option, index) => (
                    <li key={index} onClick={() => handleLocationSelect(option)}>
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="filter_items_con">
            <p>Sorteren</p>
            <div className="sort_text_con">
              <p onClick={() => setShowSortOptions(!showSortOptions)}>{selectedSort}</p>
              <ExpandMoreIcon onClick={() => setShowSortOptions(!showSortOptions)} />
              {showSortOptions && (
                <ul className="filter_items">
                  {sortOptions.map((option, index) => (
                    <li key={index} onClick={() => handleSortSelect(option)}>
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="filter_items_con">
            <p>Prijs vanaf</p>
            <div className="sort_text_con">
              <p onClick={() => setShowPriceOptions(!showPriceOptions)}>{selectedPrice}</p>
              <ExpandMoreIcon onClick={() => setShowPriceOptions(!showPriceOptions)} />
              {showPriceOptions && (
                <ul className="filter_items">
                  {priceOptions.map((option, index) => (
                    <li key={index} onClick={() => handlePriceSelect(option)}>
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        <button className="filter_search_btn">Zoeken</button>
      </div>
    </div>
  );
}

export default FilterBar;
function sortItems(option: any) {
  throw new Error("Function not implemented.");
}

