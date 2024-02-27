import "./SearchChoreForm.css"
import { useState } from 'react';

type SpecialistData = {
    email: string
    postCode: string
    stad: string
    beroep?: string
}

type SearchChoreFormProps = SpecialistData & {
    updateFields: (fields: Partial<SpecialistData>) => void
}


export default function SearchChoreForm({ beroep, email, postCode, stad, updateFields }: SearchChoreFormProps) {

    const [isValidBeroep, setValidBeroep] = useState(true);

    const handleBeroepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValueBeroep = e.target.value;
        const inputBeroepRegex = /^[A-Za-z\s]*$/; // Allow empty string
        const isValidBeroep = inputBeroepRegex.test(inputValueBeroep);

        setValidBeroep(isValidBeroep);

        if (isValidBeroep || inputValueBeroep === '') {
            updateFields({ beroep: inputValueBeroep });
        }
    };

    const [isValidEmail, setValidEmail] = useState(true);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValueEmail = e.target.value;
        const inputEmailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;
        const isValidEmail = inputEmailRegex.test(inputValueEmail);

        setValidEmail(isValidEmail);
        updateFields({ email: inputValueEmail });
    };

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
            <div className="search_chore_text_con">
                <h1>Zoek uw klus</h1>
                <p>Klussen worden gezocht in alle sectoren en door heel Nederland. Laat ons weten waar u wilt werken, dan helpen wij u bij het vinden van passende klussen.<br />
                    Als u een eenmansbedrijf hebt, voer uw eigen gegevens in. Als u meer mensen hebt die bij uw bedrijf werken, voer de gegevens van het contactpersoon in (bedrijfseigenaar of een filiaalmanager).</p>
            </div>
            <div className="search_chore_form">

                <label>Uw hoofdberoep</label>
                <input
                    type="text"
                    required
                    placeholder="Uw beroep"
                    className={`${isValidBeroep ? '' : 'invalid'}`}
                    value={beroep}
                    onChange={handleBeroepChange}
                    pattern="[A-Za-z\s]+"
                />
                {!isValidBeroep && (
                    <p className="error-message">Voer alstublieft een geldige beroep in</p>
                )}
                <label>Email:</label>
                <input
                    type="email"
                    required
                    placeholder="example@example.com"
                    pattern="^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$"
                    value={email}
                    onChange={handleEmailChange}
                />
                {!isValidEmail && (
                    <p className="error-message">Voer alstublieft een geldig e-mailadres in</p>
                )}

                <label>Postcode</label>
                <div className="search_chore_address">
                    <input
                        type="postcode"
                        required
                        placeholder="1234AB"
                        className={`${isValidPostcode ? '' : 'invalid'}`}
                        value={postcodeInput}
                        onChange={handlePostcodeChange}
                        pattern="\d{4}\s?[A-Za-z]{2}"
                    />
                    <input
                        type="text"
                        required
                        placeholder="Plaatsnaam"
                        className={`${isValidStad ? '' : 'invalid'}`}
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
                <p className="form_login">Al een account? <a href="#">Inloggen</a></p>
            </div>
        </>
    )
}
