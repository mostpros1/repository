import "./KvKForm.css";
import { Link } from "react-router-dom";
import { useState } from 'react';

function KvKForm({ setShowNoKvK }) {

  const [isValidCompany, setValidCompany] = useState(true);
  const [isValidKvK, setValidKvK] = useState(true);

  const handleCompanyChange = (e) => {
    const inputValue = e.target.value;
    const inputRegex = /^[A-Za-z\s]+$/;
    const isValid = inputRegex.test(inputValue);

    setValidCompany(isValid);

    if (isValid || inputValue === '') {
      // Handle state or other logic for valid input
    }
  };

  const handleKvKChange = (e) => {
    const inputValue = e.target.value;
    const inputRegex = /^[0-9]{8}$/;
    const isValid = inputRegex.test(inputValue);

    setValidKvK(isValid);

  };

  return (
    <div className="KvKForm_con">
      <h2>Bedrijf-situatie</h2>
      <p>Wat is de naam van je bedrijf?</p>
      <div className="KvK_inputs">
        <div className={`KvK_input ${isValidCompany ? '' : 'invalid'}`}>
          <label htmlFor="">Bedrijf naam</label>
          <input type="text" placeholder="Bedrijfsnaam" pattern="[A-Za-z\s]+" onChange={handleCompanyChange} required />
        </div>
        {!isValidCompany && (
          <p className="error-message">Voer alstublieft een geldige bedrijfsnaam in</p>
        )}

        <div className={`KvK_input ${isValidKvK ? '' : 'invalid'}`}>
          <label htmlFor="">KvK nummer:</label>
          <input type="text" placeholder="Uw KvK nummer" onChange={handleKvKChange} pattern="[0-9]{8}" required />
        </div>
        {!isValidKvK && (
          <p className="error-message">Voer alstublieft een geldig KvK nummer in (max 8 karakters)</p>
        )}
      </div>
      <div className="No_KvK">
        <Link to="#" onClick={() => setShowNoKvK(true)}>
          Ik heb geen KVK-nummer
        </Link>
      </div>
    </div>
  );
}

export default KvKForm;
