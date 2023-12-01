import { FormEvent, useRef } from 'react'
import { Auth } from 'aws-amplify'
import { useLocation, useNavigate } from 'react-router-dom'
import DigitInputs from '../../components/ui/DigitInputs/DigitInputs'
import './BevestigEmailPage.css'

function BevestigEmailPage() {

    const location = useLocation()
    const navigate = useNavigate()
    const inputRef = useRef([])

    const userEmail = location.state === null ? "" : location.state.email

    function onSubmit(e: FormEvent) {
        e.preventDefault()
        let code: string = ""
        inputRef.current.forEach((input: HTMLInputElement) => { code += input.value })

        Auth.confirmSignUp(userEmail, code)
        .catch(error => {
            console.error(error)
        })
        .then(result => { if (result == 'SUCCESS') navigate('/dashboard') })
    }

    return (
        <div className="confirmemail-container">
            <form className="confirmemail-card" onSubmit={onSubmit}>
                <div className="confirmemail-card_header">
                    <p className="confirmemail-card_title">Bevestig uw e-mailadres</p>
                    <hr/>
                </div>
                <b className="confirmemail-card_text">Er is een verificatiecode verzonden naar uw e-mailadres.</b>
                <p className="confirmemail-card_text">Zoek in uw inbox naar een code, en voer die hieronder in. Let op: de mail kan mogelijk in uw spamfolder beland zijn.</p>
                <DigitInputs amount={6} inputRef={inputRef} />
                <button className="confirmemail-card_button" type="submit">Bevestigen</button>
                <a className="confirmemail-card_newCode" onClick={() => Auth.resendSignUp(userEmail)}>Nieuwe code versturen</a>
            </form>
        </div>
    )
}

export default BevestigEmailPage