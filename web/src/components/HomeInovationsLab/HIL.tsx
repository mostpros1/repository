import React from "react";
import img from "../../assets/dutch_steamboat_small 2.jpg";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import WbCloudyRoundedIcon from "@mui/icons-material/WbCloudyRounded";
import MemoryRoundedIcon from "@mui/icons-material/MemoryRounded";

import "./HIL.css";

function HIL() {
  return (
    <div id="root">
      <div className="main-content">
        <div className="image-container">
          <img src={img} alt="dutch steamboat" />
          <div className="text-overlay">
            <h1>Home Innovation Labs</h1>
            <p>Sustainable Value Creation</p>
          </div>
        </div>
      </div>
      <div className="grid-con">
        <p>
          <TrendingUpRoundedIcon />
          Growth
        </p>
        <p>
          <PeopleAltRoundedIcon />
          People
        </p>
        <p>
          <WbCloudyRoundedIcon />
          Cloud ICT
        </p>
        <p>
          <MemoryRoundedIcon />
          3 A.I Data
        </p>
      </div>
    </div>
  );
}

export default HIL;
