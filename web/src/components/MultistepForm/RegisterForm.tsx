import { Dispatch, SetStateAction, useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n";

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
  const { t } = useTranslation();

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
  console.log(i18n.getResourceBundle('nl', 'translation'));
  console.log("Hello ", t("Voornaam:"));
  return (
    <>
      <div className="register-container">
        {error && (
          <div className="error-con">
            <p className="error-message">{error}</p>
          </div>
        )}
        <h2>{t("Maak een nieuw account aan")}</h2>
        <div className="register-form-container">
          <div className="register-form-input">
            <label htmlFor="firstName">{t("Voornaam:")}</label>
            <input
              pattern="[A-Za-z\s]+"
              required
              type="text"
              id="firstName"
              placeholder="Voornaam"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div>
          <div className="register-form-input">
            <label htmlFor="lastName">{t("Achternaam:")}</label>
            <input
              pattern="[A-Za-z\s]+"
              required
              type="text"
              id="lastName"
              placeholder="Achternaam"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
          <div className="register-form-input">
            <label htmlFor="email">{t("Email:")}</label>
            <input
              pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
              required
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => updateFields({ email: e.target.value })}
            />
          </div>
          <div className="register-form-input">
            <label htmlFor="phoneNumber">{t("Telefoonnummer:")}</label>
            <PhoneInput
              pattern="\+[0-9 ]{10,}"
              maxlength="14"
              defaultCountry="NL"
              placeholder="+31658349021"
              value={phoneNumber}
              onChange={(value) => {
                console.log("Telefoonnummer gewijzigd:", value);
                updateFields({ phoneNumber: value || "" });
              }}
            />
          </div>
          <div className="register-form-input">
            <label htmlFor="password">{t("Wachtwoord:")}</label>
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
            <label htmlFor="confirmPassword">{t("Herhaal wachtwoord:")}</label>
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
          {t("Al een account?")}{" "}
          <a href="#" onClick={() => setUserExists && setUserExists(true)}>
            {t("Inloggen")}
          </a>
        </div>
      </div>
    </>
  );

}