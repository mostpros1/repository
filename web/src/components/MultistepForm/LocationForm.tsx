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
        />
        <input
          type="text"
          required
          className="form-input second-input"
          placeholder='Stad'
          value={stad}
          onChange={e => updateFields({ stad: e.target.value })}
        />
      </div>
      {!isValidPostcode && (
        <p className="error-message">Please enter a valid postcode (e.g., 1234 AB)</p>
      )}
    </>
  )
}