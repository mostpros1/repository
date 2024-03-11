import React from 'react';
import { useState } from 'react';
import TwoWorkers from '../../assets/2personenmettools.png'
import { useLocation } from 'react-router-dom';

type LocationData = {
  postCode: string
  stad: string
}

type LocationFormProps = LocationData & {
  updateFields: (fields: Partial<LocationData>) => void
}

export function LocationForm({ postCode, stad, updateFields }: LocationFormProps) {

  const location = useLocation();
  const [postcodeInput, setPostcodeInput] = useState(postCode);
  const [isValidPostcode, setValidPostcode] = useState(true);

  const [stadInput, setStadInput] = useState(stad);
  const [isValidStad, setValidStad] = useState(true);

  const handlePostcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPostcode = e.target.value;
    const postcodeRegex = /^\d{4}\s?[A-Za-z]{2}$/;
    const isValid = postcodeRegex.test(newPostcode);

    setValidPostcode(isValid);

    setPostcodeInput(newPostcode.slice(0, 6));

    if (isValid || newPostcode === "") {
      updateFields({ postCode: newPostcode.slice(0, 6) });
    }
  };

  const handleStadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStad = e.target.value;
    const stadRegex = /^[A-Za-z\s]+$/;
    const isValidStad = stadRegex.test(newStad);

    setValidStad(isValidStad);

    setStadInput(newStad);

    if (isValidStad || newStad === "") {
      updateFields({ stad: newStad });
    }
  };

  return (
    <>
      <div className="content-con">
        <img src={TwoWorkers} alt="" />
        <h2>
          {location.pathname === "/klussen" ? "Voer je postcode in om vakspecialisten in jouw omgeving te vinden" : "Voer je postcode in om klussen in jouw omgeving te vinden"}
        </h2>
      </div>
      <div className="form-inputs">
        <input
          type="text"
          required
          className={`form-input first-input ${isValidPostcode ? '' : 'invalid'}`}
          placeholder='Postcode'
          value={postcodeInput}
          onChange={handlePostcodeChange}
          pattern="\d{4}\s?[A-Za-z]{2}"
        />
        <input
          type="text"
          required
          className={`form-input second-input ${isValidStad ? '' : 'invalid'}`}
          placeholder='Stad'
          value={stadInput}
          onChange={handleStadChange}
          pattern="[A-Za-z\s]+"
        />
      </div>
      {!isValidPostcode && (
        <p className="error-message">Voer alstublieft een geldige postcode in (bijv. 1234AB)</p>
      )}

      {!isValidStad && (
        <p className="error-message">Voer alstublieft een geldige stad in (bijv. Amsterdam)</p>
      )}
    </>
  )
}