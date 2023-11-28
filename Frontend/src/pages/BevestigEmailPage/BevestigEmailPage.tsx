import { FormEvent, useRef } from 'react'
import { Auth } from 'aws-amplify'
import { useLocation, useNavigate } from 'react-router-dom'
import DigitInputs from '../../components/ui/DigitInputs/DigitInputs'
import './BevestigEmailPage.css'

function BevestigEmailPage() {

    const location = useLocation()
    const navigate = useNavigate()
    const inputRef = useRef<any>([])

    const userEmail = location.state === null ? "" : location.state.email

    function onSubmit(e: FormEvent) {
        e.preventDefault()
        let code: string = ""
        inputRef.current.forEach((input: HTMLInputElement) => { code += input.value })

        Auth.confirmSignUp(userEmail, code)
        .catch(error => {
            console.error(error)
        })
        .then(result => { if (result == 'SUCCESS') navigate('success') })
    }

    return (
        <div className="bevestigemail_container">
            <form className="bevestigemail_card" onSubmit={onSubmit} autoComplete='off'>
                <div className="bevestigemail_header">
                    <p className="bevestigemail_title">Bevestig uw e-mailadres</p>
                    <hr/>
                </div>
                <b className="bevestigemail_text">Er is een verificatiecode verzonden naar uw e-mailadres.</b>
                <p className="bevestigemail_text">Zoek in uw inbox naar een code, en voer die hieronder in. Let op: de mail kan mogelijk in uw spamfolder beland zijn.</p>
                <DigitInputs amount={6} inputRef={inputRef} />
                <button className="bevestigemail_button" type="submit">Bevestigen</button>
                <b className="bevestigemail_newCode" onClick={() => Auth.resendSignUp(userEmail)}>Nieuwe code versturen</b>
            </form>
        </div>
    )
}

export default BevestigEmailPage