import { Dispatch, SetStateAction, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

type RegisterData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  repeatPassword: string;
};

type RegisterFormProps = RegisterData & {
  updateFields: (fields: Partial<RegisterData>) => void;
  setUserExists?: Dispatch<SetStateAction<boolean>>;
  setError: (error: string) => void;
  error: string;
};



export function RegisterForm({
  email,
  firstName,
  lastName,
  phoneNumber,
  password,
  repeatPassword,
  updateFields,
  setUserExists,
  error,
}) {

  const [isValidFirstName, setValidFirstName] = useState(true);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValueFirstName = e.target.value;
    const inputFirstNameRegex = /^[A-Za-z\s]*$/; // Allow empty string
    const isValidFirstName = inputFirstNameRegex.test(inputValueFirstName);

    setValidFirstName(isValidFirstName);

    if (isValidFirstName || inputValueFirstName === '') {
      updateFields({ firstName: inputValueFirstName });
    }
  };

  const [isValidLastName, setValidLastName] = useState(true);

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValueLastName = e.target.value;
    const inputLastNameRegex = /^[A-Za-z\s]*$/; // Allow empty string
    const isValidLastName = inputLastNameRegex.test(inputValueLastName);

    setValidLastName(isValidLastName);

    if (isValidLastName || inputValueLastName === '') {
      updateFields({ lastName: inputValueLastName });
    }
  };

  // const sendDataToDynamoDB = (firstName, lastName) => {
  //   const params = {
  //     TableName: '', // replace with your table name
  //     Item: {
  //       // Assume your table's partition key is 'userId', adjust as necessary
  //       userId: `${Date.now()}`, // Example to generate unique ids, adjust based on your schema
  //       firstName: firstName,
  //       lastName: lastName,
  //       // Add other attributes here
  //     },
  //   };

  //   dynamoDb.put(params, (err, data) => {
  //     if (err) {
  //       console.error('Unable to add item. Error JSON:', JSON.stringify(err, null, 2));
  //     } else {
  //       console.log('Added item:', JSON.stringify(data, null, 2));
  //     }
  //   });
  // };


  return (
    <>
      <div className="register-container">
        {error && (
          <div className="error-con">
            <p className="error-message">{error}</p>
          </div>
        )}
        <h2>Maak een nieuw account aan</h2>
        <div className="register-form-container">
          <div className="register-form-input">
            <label htmlFor="">Voornaam:</label>
            <input
              pattern="[A-Za-z\s]+"
              required
              type="text"
              placeholder="Voornaam"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div>
          <div className="register-form-input">
            <label htmlFor="">Achternaam:</label>
            <input
              pattern="[A-Za-z\s]+"
              required
              type="text"
              placeholder="Achternaam"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <div className="register-form-input">
            <label htmlFor="">Email:</label>
            <input
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => updateFields({ email: e.target.value })}
            />
          </div>
          <div className="register-form-input">
            <label htmlFor="">Telefoonnummer:</label>
            <PhoneInput
              pattern="\+[0-9 ]{10,}"
              maxlength="14"
              defaultCountry="NL"
              placeholder="+31658349021"
              value={phoneNumber} // Gebruik direct de waarde uit RegisterData
              onChange={(value) => {
                console.log("Telefoonnummer gewijzigd:", value);
                updateFields({ phoneNumber: value || "" }); // Update de phoneNumber in RegisterData
              }}
            />
          </div>
          <div className="register-form-input">
            <label htmlFor="">Wachtwoord:</label>
            <input
              pattern=".{8,}"
              required
              type="password"
              id="password"
              placeholder="Wachtwoord (min. 8 tekens)"
              value={password}
              onChange={(e) => updateFields({ password: e.target.value })}
            />
          </div>
          <div className="register-form-input password">
            <label htmlFor="">Herhaal wachtwoord:</label>
            <input
              pattern=".{8,}"
              required
              type="password"
              id="confirmPassword"
              placeholder="Herhaal wachtwoord"
              value={repeatPassword}
              onChange={(e) => updateFields({ repeatPassword: e.target.value })}
            />
          </div>
        </div>
        <div className="register-link">
          Al een account?{" "}
          <a href="#" onClick={() => setUserExists && setUserExists(true)}>
            Inloggen
          </a>
        </div>
      </div>
    </>
  );
}