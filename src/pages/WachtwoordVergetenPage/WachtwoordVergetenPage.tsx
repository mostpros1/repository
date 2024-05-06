import { FormEvent, useRef, useState } from "react"
import DigitInputs from "../../components/ui/DigitInputs/DigitInputs"
import './WachtwoordVergetenPage.css'
import { Auth } from "aws-amplify"

const WachtwoordVergetenPage = () => {

    const [codeSent, setCodeSent] = useState(false)
    const [fields, setFields] = useState({ email: "", newPassword: "", repeatNewPassword: "" })

    const codeInputRef = useRef([])

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (fields.email === "") return

        if (!codeSent) {
            Auth.forgotPassword(fields.email)
            setCodeSent(true)
        }
        else {
            if (fields.newPassword !== fields.repeatNewPassword) return
            let code: string = ""
            codeInputRef.current.forEach((input: HTMLInputElement) => { code += input.value })
            Auth.forgotPasswordSubmit(fields.email, code, fields.newPassword)
        }
    }

    return (
        <div className={codeSent ? "resetpassword-container codesent" : "resetpassword-container"}>
            <form className={codeSent ? "resetpassword-card codesent" : "resetpassword-card"} onSubmit={onSubmit}>
                <div className="resetpassword-card_header">
                    <p className="resetpassword-card_title">Wijzig uw wachtwoord</p>
                    <hr/>
                </div>
                <b className="resetpassword-card_text">Voer uw email in om uw wachtwoord te wijzigen.</b>
                <p className="resetpassword-card_text">Zoek daarna in uw inbox naar een code, en voer die hieronder in. Let op: de mail kan mogelijk in uw spamfolder beland zijn.</p>
                <div className="resetpassword-form_field">
                    <label htmlFor="email">Nieuw wachtwoord</label>
                    <input
                        name="email"
                        required
                        type="email"
                        placeholder="Bijv. joe@hhotmail.com"
                        value={fields.email}
                        readOnly={codeSent ? true : false}
                        onChange={e => setFields({...fields, email: e.target.value })}
                    />
                </div>
                { codeSent &&
                    <>
                        <DigitInputs amount={6} inputRef={codeInputRef}/>
                        <div className="resetpassword-form_field">
                            <label htmlFor="newPassword">Nieuw wachtwoord</label>
                            <input
                                name="newPassword"
                                required
                                type="password"
                                placeholder="Wachtwoord"
                                value={fields.newPassword}
                                onChange={e => setFields({...fields, newPassword: e.target.value })}
                            />
                        </div>
                        <div className="resetpassword-form_field">
                            <label htmlFor="repeatNewPassword">Herhaal nieuw wachtwoord</label>
                            <input
                                name="repeatNewPassword"
                                required
                                type="password"
                                placeholder="Herhaal wachtwoord"
                                value={fields.repeatNewPassword}
                                onChange={e => setFields({...fields, repeatNewPassword: e.target.value })}
                            />
                        </div>
                    </>
                }
                <button className="resetpassword-card_button" type="submit">Bevestigen</button>
                { codeSent && <a className="confirmemail-card_newCode" onClick={() => Auth.forgotPassword(fields.email)}>Nieuwe code versturen</a>}
            </form>
        </div>
    )
}

export default WachtwoordVergetenPage