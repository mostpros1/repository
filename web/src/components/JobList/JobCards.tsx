import React, { useState } from 'react';
import "./JobCards.css";
import gasleiding from "../../assets/Gasleiding.svg";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FilterBar from '../FilterBar/FilterBar'; // Import the FilterBar component


function JobCards() {
  const [filterLocation, setFilterLocation] = useState(""); // State variable for location filter

  let joblisting = [
    {
      id: 1,
      name: "Mark",
      distance: 1.1,
      title: "Gas Lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Rotterdam",
      availability: "4 dagen",
    },
    {
      id: 2,
      name: "Mark",
      distance: 1.1,
      title: "Gas Lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Utrecht",
      availability: "4 dagen",
    },
    {
      id: 3,
      name: "Mark",
      distance: 1.1,
      title: "Gas Lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Utrecht",
      availability: "4 dagen",
    },
    {
      id: 4,
      name: "Mark",
      distance: 1.1,
      title: "Gas Lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Amsterdam",
      availability: "4 dagen",
    },
    {
      id: 5,
      name: "Mark",
      distance: 1.1,
      title: "Gas Lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Haarlem",
      availability: "4 dagen",
    },
    {
      id: 6,
      name: "Mark",
      distance: 1.1,
      title: "Gas Lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Haarlem",
      availability: "4 dagen",
    },
    {
      id: 7,
      name: "Mark",
      distance: 1.1,
      title: "Gas Lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Amsterdam",
      availability: "4 dagen",
    },
    {
      id: 8,
      name: "Mark",
      distance: 1.1,
      title: "Gas Lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Amsterdam",
      availability: "4 dagen",
    },
    {
      id: 9,
      name: "Mark",
      distance: 1.1,
      title: "Gas Lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Rotterdam",
      availability: "4 dagen",
    },
    {
      id: 10,
      name: "Mark",
      distance: 1.1,
      title: "Gas Lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Haarlem",
      availability: "4 dagen",
    },
    {
      id: 11,
      name: "Mark",
      distance: 1.1,
      title: "Gas Lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Amsterdam",
      availability: "4 dagen",
    },
    {
      id: 12,
      name: "Mark",
      distance: 1.1,
      title: "Gas Lekkage",
      description: "Spreek je ananas uis als ananas of aanaanas?",
      img: gasleiding,
      location: "Utrecht",
      availability: "4 dagen",
    },
  ];
  const filteredJobs = joblisting.filter((job) => {
    return filterLocation === "" || job.location === filterLocation;
  });

  let jobCardsRender = filteredJobs.map((job) => {
    return (
      <div key={job.id} className="taskCard">
        <div className="user-detail">
          <h2>{job.name}</h2>
          <p>
            <LocationOnIcon />
            {job.distance}KM
          </p>
        </div>
        <div className="job-info">
          <h2 className="job-title">{job.title}</h2>
          <p className="job-desc">{job.description}</p>
        </div>
        <div className="jobInfo-extra-con">
          <div className="jobInfo-extra">
            <LocationOnIcon />
            <p>Locatie: {job.location}</p>
          </div>
          <div className="jobInfo-extra">
            <CalendarMonthIcon />
            <p>Binnen {job.availability}</p>
          </div>
        </div>
        <a className="mail_btn" href="mailto:teammostpros@gmail.com">
          Contact opnemen
        </a>
      </div>
    );
  });

  const handleLocationFilterChange = (event) => {
    setFilterLocation(event.target.value);
  };

  return (
    <div>
      {/* Location filter dropdown */}

      {/* Render filtered job cards */}
      {jobCardsRender}
    </div>
  );
}

export default JobCards;
