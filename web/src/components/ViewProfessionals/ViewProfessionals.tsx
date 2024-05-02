import './ViewProfessionals.css'
import React, { useState } from "react";
import rightarrow from "../../assets/right-arrow.svg";
import searchicon from "../../assets/searchicon.svg";
import viewProfessionalsIcon from "../../assets/view-prof.svg"; // Add the correct path and icon


const ViewProfessionals = () => {
    const [searchText, setSearchText] = useState("");

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    return (
        <div className="view-professionals">
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search professionals..."
                    value={searchText}
                    onChange={handleSearchChange}
                />
                <img src={searchicon} alt="Search" className="search-icon" />
            </div>
            {/* Rest of the component */}
        </div>
    );
};

export default ViewProfessionals;