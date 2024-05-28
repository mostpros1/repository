import React from "react";
import "./DataSafetyComp.css";
import datafetyimg from "../../assets/datesafety.png";

function DataSafetyComp() {
  return (
    <div className="data-safety-comp">
      <div className="content">
        <h2>Dataveiligheid</h2>
        <ol>
          <li><span className="number">1.</span> Infrastructuur</li>
          <li><span className="number">2.</span> Diefstal en privacy</li>
          <li><span className="number">3.</span> Back-ups</li>
        </ol>
      </div>
      <img src={datafetyimg} alt="Data Safety" className="data-safety-img" />
    </div>
  );
}

export default DataSafetyComp;
