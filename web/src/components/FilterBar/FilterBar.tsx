import "./FilterBar.css";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import joblisting from "../JobList/JobCards"; // Importeer de array met items
import gasleiding from "../../assets/Gasleiding.svg";
import Banenlijst from "./Banenlijst";
import { useState, useEffect } from "react";

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
  const [selectedLocation, setSelectedLocation] = useState("Alles");
  const [selectedSort, setSelectedSort] = useState("Selecteer een sorteeroptie");
  const [selectedPrice, setSelectedPrice] = useState("Select a price option");
  const [filteredItems, setFilteredItems] = useState<JobListingItem[]>([]); // Initialize with all items
  const joblisting: JobListingItem[] = [
    {
      id: 1,
      name: "Mark van bomen",
      distance: 2.3,
      title: "Kapotte leiding maken en lekkage verhelpen.",
      description: "De leiding is niet meer in  goede staat deze moet vervangen worden en....",
      img: gasleiding,
      location: "Rotterdam",
      availability: "4 dagen",
    },
    {
      id: 2,
      name: "Mark van bomen",
      distance: 10,
      title: "Kapotte leiding maken en lekkage verhelpen.",
      description: "De leiding is niet meer in  goede staat deze moet vervangen worden en....",
      img: gasleiding,
      location: "Utrecht",
      availability: "4 dagen",
    },
    {
      id: 3,
      name: "Mark van bomen",
      distance: 5,
      title: "Kapotte leiding maken en lekkage verhelpen.",
      description: "De leiding is niet meer in  goede staat deze moet vervangen worden en....",
      img: gasleiding,
      location: "Utrecht",
      availability: "4 dagen",
    },
    {
      id: 4,
      name: "Mark van bomen",
      distance: 2.3,
      title: "Kapotte leiding maken en lekkage verhelpen.",
      description: "De leiding is niet meer in  goede staat deze moet vervangen worden en....",
      img: gasleiding,
      location: "Amsterdam",
      availability: "4 dagen",
    },
    {
      id: 5,
      name: "Mark van bomen",
      distance: 4.5,
      title: "Kapotte leiding maken en lekkage verhelpen.",
      description: "De leiding is niet meer in  goede staat deze moet vervangen worden en....",
      img: gasleiding,
      location: "Haarlem",
      availability: "4 dagen",
    },
    {
      id: 6,
      name: "Mark van bomen",
      distance: 2.3,
      title: "Kapotte leiding maken en lekkage verhelpen.",
      description: "De leiding is niet meer in  goede staat deze moet vervangen worden en....",
      img: gasleiding,
      location: "Haarlem",
      availability: "4 dagen",
    },
    {
      id: 7,
      name: "Mark van bomen",
      distance: 3.3,
      title: "Kapotte leiding maken en lekkage verhelpen.",
      description: "De leiding is niet meer in  goede staat deze moet vervangen worden en....",
      img: gasleiding,
      location: "Amsterdam",
      availability: "4 dagen",
    },
    {
      id: 8,
      name: "Mark van bomen",
      distance: 2.3,
      title: "Kapotte leiding maken en lekkage verhelpen.",
      description: "De leiding is niet meer in  goede staat deze moet vervangen worden en....",
      img: gasleiding,
      location: "Amsterdam",
      availability: "4 dagen",
    },
    {
      id: 9,
      name: "Mark van bomen",
      distance: 55,
      title: "Kapotte leiding maken en lekkage verhelpen.",
      description: "De leiding is niet meer in  goede staat deze moet vervangen worden en....",
      img: gasleiding,
      location: "Rotterdam",
      availability: "4 dagen",
    },
    {
      id: 10,
      name: "Mark van bomen",
      distance: 2.3,
      title: "Kapotte leiding maken en lekkage verhelpen.",
      description: "De leiding is niet meer in  goede staat deze moet vervangen worden en....",
      img: gasleiding,
      location: "Haarlem",
      availability: "4 dagen",
    },
    {
      id: 11,
      name: "Mark van bomen",
      distance: 5,
      title: "Kapotte leiding maken en lekkage verhelpen.",
      description: "De leiding is niet meer in  goede staat deze moet vervangen worden en....",
      img: gasleiding,
      location: "Amsterdam",
      availability: "4 dagen",
    },
    {
      id: 12,
      name: "Mark van bomen",
      distance: 3.5,
      title: "Kapotte leiding maken en lekkage verhelpen.",
      description: "De leiding is niet meer in  goede staat deze moet vervangen worden en....",
      img: gasleiding,
      location: "Utrecht",
      availability: "4 dagen",
    },
    {
      id: 13,
      name: "Mark van bomen",
      distance: 5.6,
      title: "Kapotte leiding maken en lekkage verhelpen.",
      description: "De leiding is niet meer in  goede staat deze moet vervangen worden en....",
      img: gasleiding,
      location: "Haarlem",
      availability: "4 dagen",
    },
    {
      id: 14,
      name: "Mark van bomen",
      distance: 2.3,
      title: "Kapotte leiding maken en lekkage verhelpen.",
      description: "De leiding is niet meer in  goede staat deze moet vervangen worden en....",
      img: gasleiding,
      location: "Amsterdam",
      availability: "4 dagen",
    },
    {
      id: 15,
      name: "Mark van bomen",
      distance: 1.9,
      title: "Kapotte leiding maken en lekkage verhelpen.",
      description: "De leiding is niet meer in  goede staat deze moet vervangen worden en....",
      img: gasleiding,
      location: "Utrecht",
      availability: "4 dagen",
    },
    {
      id: 16,
      name: "Mark van bomen",
      distance: 2.3,
      title: "Kapotte leiding maken en lekkage verhelpen.",
      description: "De leiding is niet meer in  goede staat deze moet vervangen worden en....",
      img: gasleiding,
      location: "Utrecht",
      availability: "4 dagen",
    },
    {
      id: 17,
      name: "Mark van bomen",
      distance: 2.3,
      title: "Kapotte leiding maken en lekkage verhelpen.",
      description: "De leiding is niet meer in  goede staat deze moet vervangen worden en....",
      img: gasleiding,
      location: "Utrecht",
      availability: "4 dagen",
    },
    {
      id: 18,
      name: "Mark van bomen",
      distance: 2.3,
      title: "Kapotte leiding maken en lekkage verhelpen.",
      description: "De leiding is niet meer in  goede staat deze moet vervangen worden en....",
      img: gasleiding,
      location: "Utrecht",
      availability: "4 dagen",
    },
  ];
  useEffect(() => {
    console.log("Effect triggered");
    filterItems();
  }, [selectedLocation, selectedSort, selectedPrice]);
  const filterItems = () => {
    console.log("Filtering items");
    let filtered = [...joblisting]; // Copy array to prevent mutating original
    // Filter by location
    if (selectedLocation !== "All") {
      filtered = filtered.filter((item) => item.location === selectedLocation);
    }
    // Sort items
    sortItems(selectedSort, filtered);
    setFilteredItems(filtered);
  };
  const sortItems = (option: string, items: JobListingItem[]) => {
    switch (option) {
      case "Van laag naar hoog":
        items.sort((a, b) => a.distance - b.distance);
        break;
      case "Van hoog naar laag":
        items.sort((a, b) => b.distance - a.distance);
        break;
      case "Alfabetisch":
        items.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }
  };
  const locationOptions = ["Alles", "Amsterdam", "Rotterdam", "Haarlem"];
  const sortOptions = [
    "Van laag naar hoog",
    "Van hoog naar laag",
    "Alfabetisch",
  ];
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
    console.log("Search button clicked");
    filterItems();
  };
  return (
    <div className="filterbar">
      <div className="filter-con">
        <div className="filter_menu_items">
          {/* Location filter section */}
          <div className="filter_items_con">
            <p>Locatie</p>
            <div className="sort_text_con">
              <p onClick={() => setShowLocationOptions(!showLocationOptions)}>
                {selectedLocation}
              </p>
              <ExpandMoreIcon
                onClick={() => setShowLocationOptions(!showLocationOptions)}
              />
              {showLocationOptions && (
                <ul className="filter_items">
                  {locationOptions.map((option, index) => (
                    <li
                      key={index}
                      onClick={() => handleLocationSelect(option)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {/* Sort filter section */}
          <div className="filter_items_con">
            <p>Sorteren</p>
            <div className="sort_text_con">
              <p onClick={() => setShowSortOptions(!showSortOptions)}>
                {selectedSort}
              </p>
              <ExpandMoreIcon
                onClick={() => setShowSortOptions(!showSortOptions)}
              />
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
          {/* Price filter section */}
          <div className="filter_items_con">
            <p>Prijs vanaf</p>
            <div className="sort_text_con">
              <p onClick={() => setShowPriceOptions(!showPriceOptions)}>
                {selectedPrice}
              </p>
              <ExpandMoreIcon
                onClick={() => setShowPriceOptions(!showPriceOptions)}
              />
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
      </div>
      {/* Banenlijst sectie */}
      <Banenlijst />
    </div>
  );
}
export default FilterBar;
