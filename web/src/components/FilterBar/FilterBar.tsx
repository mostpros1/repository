import "./FilterBar.css";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import gasleiding from "../../assets/Gasleiding.svg";
import { useState, useEffect } from 'react';
import JobCards from '../JobList/JobCards';

interface JobListingItem {
  id: number;
  name: string;
  distance: number;
  title: string;
  description: string;
  img: string;
  location: string;
  availability: string;
}

function FilterBar() {
  const [showLocationOptions, setShowLocationOptions] = useState(false);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [showPriceOptions, setShowPriceOptions] = useState(false);

  const [selectedLocation, setSelectedLocation] = useState("Select a location");
  const [selectedSort, setSelectedSort] = useState("Select a sorting option");
  const [selectedPrice, setSelectedPrice] = useState("Select a price option");
  const [filteredItems, setFilteredItems] = useState<JobListingItem[]>([]); // Initialize with all items
  const joblisting: JobListingItem[] = [
    {
      id: 1,
      name: "Mark",
      distance: 6,
      title: "gas lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Rotterdam",
      availability: "4 dagen",
    },

    {
      id: 2,
      name: "Mark",
      distance: 6,
      title: "gas lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Utrecht",
      availability: "4 dagen",
    },

    {
      id: 3,
      name: "Mark",
      distance: 5,
      title: "gas lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Utrecht",
      availability: "4 dagen",
    },

    {
      id: 4,
      name: "Mark",
      distance: 4,
      title: "gas lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Amsterdam",
      availability: "4 dagen",
    },

    {
      id: 5,
      name: "Mark",
      distance: 7,
      title: "gas lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Haarlem",
      availability: "4 dagen",
    },

    {
      id: 6,
      name: "Mark",
      distance: 2,
      title: "gas lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Haarlem",
      availability: "4 dagen",
    },

    {
      id: 7,
      name: "Mark",
      distance: 8,
      title: "gas lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Amsterdam",
      availability: "4 dagen",
    },

    {
      id: 8,
      name: "Mark",
      distance: 5,
      title: "gas lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Amsterdam",
      availability: "4 dagen",
    },

    {
      id: 9,
      name: "Mark",
      distance: 2,
      title: "gas lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Rotterdam",
      availability: "4 dagen",
    },

    {
      id: 10,
      name: "Mark",
      distance: 3,
      title: "gas lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Haarlem",
      availability: "4 dagen",
    },

    {
      id: 11,
      name: "Mark",
      distance: 5,
      title: "gas lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Amsterdam",
      availability: "4 dagen",
    },

    {
      id: 12,
      name: "Mark",
      distance: 8,
      title: "gas lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Utrecht",
      availability: "4 dagen",
    },
  ];

  useEffect(() => {
    filterItems();
  }, [selectedLocation, selectedSort, selectedPrice]);

  const filterItems = () => {
    let filtered = joblisting;

    // Filter by location
    if (selectedLocation !== "Select a location") {
      filtered = filtered.filter(item => item.location === selectedLocation);
    }
    setFilteredItems(filtered);
  };

  const locationOptions = ["All", "Amsterdam", "Rotterdam", "Haarlem"];
  const sortOptions = ["Van laag naar hoog", "Van hoog naar laag", "Alfabetisch"];
  const priceOptions = ["€100", "€200", "€300"];

  const handleLocationSelect = (option: string) => {
    setSelectedLocation(option);
    setShowLocationOptions(false);
  };

  const handleSortSelect = (option: string) => {
    setSelectedSort(option);
    setShowSortOptions(false);
  };

  const handlePriceSelect = (option: string) => {
    setSelectedPrice(option);
    setShowPriceOptions(false);
  };

  const handleSearch = () => {
    filterItems();
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
        <button className="filter_search_btn" onClick={handleSearch}>Zoeken</button>
      </div>
      <JobCards jobs={filteredItems} />
    </div>
  );
}

export default FilterBar;