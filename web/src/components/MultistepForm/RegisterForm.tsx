import { Dispatch, SetStateAction, useState } from "react"
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

type RegisterData = {
    firstName: string
    lastName: string
    email: string
    phoneNumber: string
    password: string
    repeatPassword: string
}

type RegisterFormProps = RegisterData & {
    updateFields: (fields: Partial<RegisterData>) => void;
    setUserExists?: Dispatch<SetStateAction<boolean>>;
};

export function RegisterForm({ email, firstName, lastName, phoneNumber, password, repeatPassword, updateFields, setUserExists }: RegisterFormProps) {

    return (
        <>
            <div className="register-container">
                <h2>Maak een nieuw account aan</h2>
                <div className="register-form-container">
                    <div className="register-form-input">
                        <label htmlFor="">Voornaam:</label>
                        <input
                            required
                            type="text"
                            placeholder='Voornaam'
                            value={firstName}
                            onChange={e => updateFields({ firstName: e.target.value })}
                        />
                    </div>
                    <div className="register-form-input">
                        <label htmlFor="" >Achternaam:</label>
                        <input
                            required
                            type="text"
                            placeholder='Achternaam'
                            value={lastName}
                            onChange={e => updateFields({ lastName: e.target.value })}
                        />
                    </div>
                    <div className="register-form-input">
                        <label htmlFor="">Email:</label>
                        <input
                            required
                            type="email"
                            placeholder='Email'
                            value={email}
                            onChange={e => updateFields({ email: e.target.value })}
                        />
                    </div>
                    <div className="register-form-input">
                        <label htmlFor="">Telefoonnummer:</label>
                        <PhoneInput
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
                            required
                            type="password"
                            placeholder='Wachtwoord (min. 6 tekens)'
                            value={password}
                            onChange={e => updateFields({ password: e.target.value })}
                        />
                    </div>
                    <div className="register-form-input password">
                        <label htmlFor="">Herhaal wachtwoord:</label>
                        <input
                            required
                            type="password"
                            placeholder='Herhaal wachtwoord'
                            value={repeatPassword}
                            onChange={e => updateFields({ repeatPassword: e.target.value })}
                        />

                    </div>
                </div>
                <div className="register-link">Al een account? <a
                    href="#"
                    onClick={() => setUserExists && setUserExists(true)}>Inloggen</a></div>
            </div>
        </>
    )
}