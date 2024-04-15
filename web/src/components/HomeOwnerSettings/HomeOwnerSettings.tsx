import React, { useState } from "react";
import "./HomeOwnerSettings.css";

const HomeOwnerSettings: React.FC = () => {
  // Define state for each field
  const [voornaam, setVoornaam] = useState("");
  const [achternaam, setAchternaam] = useState("");
  const [email, setEmail] = useState("");
  const [telefoonnummer, setTelefoonnummer] = useState("");

  // Function to handle the button click
  const updateGegevens = () => {
    // This function would update the data, for example sending it to an API
    // For now, we can just log it to the console
    console.log(voornaam, achternaam, email, telefoonnummer);
    alert("Gegevens updated!"); // Just a placeholder action
  };

  return (
    <div id="settings-con">
      <div className="settings-header">
        <p>Algemene Info</p>
      </div>
      <div className="settings-right-con">
        <div className="inner-settings-con">
          <div className="col-row">
            <p>Voornaam</p>
            <input
              type="text"
              placeholder="Type your Voornaam"
              value={voornaam}
              onChange={(e) => setVoornaam(e.target.value)}
            />
          </div>
          <div className="col-row">
            <p>Achternaam</p>
            <input
              type="text"
              placeholder="Type your Achternaam"
              value={achternaam}
              onChange={(e) => setAchternaam(e.target.value)}
            />
          </div>
          <div className="col-row">
            <p>Email</p>
            <input
              type="text"
              placeholder="Type your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="col-row">
            <p>Telefoonnummer</p>
            <input
              type="text"
              placeholder="Type your Phonenumber"
              value={telefoonnummer}
              onChange={(e) => setTelefoonnummer(e.target.value)}
            />
          </div>
        </div>
        <div className="save-btn">
          <button onClick={updateGegevens}>Gegevens wijzigen</button>
        </div>
      </div>
    </div>
  );
};

export default HomeOwnerSettings;
