import "./ViewProfessionals.css";
import React, { useState } from "react";
import rightarrow from "../../assets/right-arrow.svg";
import searchicon from "../../assets/searchicon.svg";
import viewProfessionalsIcon from "../../assets/view-prof.svg"; // Add the correct path and icon
import { Description } from "@mui/icons-material";

const ViewProfessionals = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const professionals = [
    {
      id: 1,
      name: "John Doe",
      profession: "Electrician",
      rating: 4.5,
      reviews: 20,
      Description:
        "Ik ben een professionele elektricien met 10 jaar ervaring. Ik heb aan verschillende projecten gewerkt en heb een goede staat van dienst in het afleveren van kwaliteitswerk.",
      profilePicture: "https://randomuser.me/api/portraits/men/1.jpg", // Add the profile picture path
    },
    {
      id: 2,
      name: "Michael Smith",
      profession: "Loodgieter",
      rating: 3,
      reviews: 2,
      Description:
        "Ik ben een professionele elektricien met 10 jaar ervaring. Ik heb aan verschillende projecten gewerkt en heb een goede staat van dienst in het afleveren van kwaliteitswerk.",
      profilePicture: "michael-smith.jpg", // Add the profile picture path
    },
    {
      id: 3,
      name: "John Doe",
      profession: "Dak dekker",
      rating: 3,
      reviews: 5,
      Description:
        "Ik ben een professionele elektricien met 10 jaar ervaring. Ik heb aan verschillende projecten gewerkt en heb een goede staat van dienst in het afleveren van kwaliteitswerk.",
      profilePicture: "john-doe.jpg", // Add the profile picture path
    },
    {
      id: 4,
      name: "John Doe",
      profession: "Hovenier",
      rating: 4.5,
      reviews: 10,
      Description:
        "Ik ben een ervaren hovenier met meer dan 15 jaar ervaring in tuindesign, aanleg en onderhoud. Mijn focus ligt op het creëren van prachtige en functionele buitenruimtes die de waarde van uw eigendom verhogen.",
      profilePicture: "john-doe.jpg", // Add the profile picture path
    },
  ];

  return (
    <div className="prof-con">
      <div className="view-professionals">
        {/* Searchbar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search professionals..."
            value={searchText}
            onChange={handleSearchChange}
          />
          <img src={searchicon} alt="Search" className="search-icon" />
        </div>
        {/*Professionals List */}
        <div className="professionals-list">
          {professionals.map((professional) => (
            <div key={professional.id} className="professional">
              <div className="professional-info">
                <img
                  src={professional.profilePicture}
                  alt={professional.name}></img>
                <h3>{professional.name}</h3>
                <p>{professional.profession}</p>
                <p>
                  {professional.rating} stars ({professional.reviews} reviews)
                </p>
                <p>{professional.Description}</p>
              </div>
              <div className="professional-actions">
                <img src={viewProfessionalsIcon} alt="View" />
                <img src={rightarrow} alt="View" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewProfessionals;
