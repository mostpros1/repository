import React from "react";
import img from "../../assets/dutch_steamboat_small 2.jpg";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import WbCloudyRoundedIcon from "@mui/icons-material/WbCloudyRounded";
import MemoryRoundedIcon from "@mui/icons-material/MemoryRounded";
import "./HIL.css";

function HIL() {
  return (
    <div>
      <div className="image-container">
        <img src={img} alt="dutch steamboat" />
        <div className="text-overlay">
          <h1>Home Innovation Labs</h1>
          <p>Sustainable Value Creation</p>
        </div>
      </div>
      <div className="grid-con">
        <div className="grid-row">
          <div className="grid-col">
            <p>
              <TrendingUpRoundedIcon />
              Growth
            </p>
          </div>
          <div className="grid-col">
            <p>
              <PeopleAltRoundedIcon />
              People
            </p>
          </div>
          <div className="grid-col">
            <p>
              <WbCloudyRoundedIcon />
              Cloud ICT
            </p>
          </div>
          <div className="grid-col">
            <p>
              <MemoryRoundedIcon />
              A.I Data
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HIL;
