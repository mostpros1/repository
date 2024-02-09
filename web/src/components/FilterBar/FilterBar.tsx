import React from 'react';
import FilterDropdown from './FilterDropdown';
import "./FilterBar.css";

function FilterBar() {
    // Sample data for filter options
    const locationOptions = ['All Locations', 'Amsterdam', 'Rotterdam', 'Haarlem'];
    const sortOptions = ['All Sorting', 'Van laag naar hoog', 'Van hoog naar laag'];
    const priceOptions = ['All Prices', '€500', '€1000', '€1500'];

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
