import React from 'react';
import FilterDropdown from './FilterDropdown';
import "./FilterBar.css";

function FilterBar() {
<<<<<<< Updated upstream
    // Sample data for filter options
    const locationOptions = ['All Locations', 'Amsterdam', 'Rotterdam', 'Haarlem'];
    const sortOptions = ['All Sorting', 'Van laag naar hoog', 'Van hoog naar laag'];
    const priceOptions = ['All Prices', '€500', '€1000', '€1500'];
=======
  const [showLocationOptions, setShowLocationOptions] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showPriceOptions, setShowPriceOptions] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("Select a location");
  const [selectedSort, setSelectedSort] = useState("Select a sorting optio");
  const [selectedPrice, setSelectedPrice] = useState("Select a price option");
  const [itemsList, setItemsList] = useState(joblisting); // Gebruik de items van het geïmporteerde bestand
>>>>>>> Stashed changes

    return (
        <div className="filterbar">
            <div className="filter-con">
                <div className="filter_menu_items">
                    <FilterDropdown label="Locatie" selectedValue="All Locations" options={locationOptions} onSelect={(value) => console.log(value)} />
                    <FilterDropdown label="Sorteren" selectedValue="All Sorting" options={sortOptions} onSelect={(value) => console.log(value)} />
                    <FilterDropdown label="Prijs vanaf" selectedValue="All Prices" options={priceOptions} onSelect={(value) => console.log(value)} />
                </div>
                <button className="filter_search_btn">Zoeken</button>
            </div>
        </div>
    );
}

export default FilterBar;
