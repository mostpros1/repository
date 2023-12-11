import { FormEvent, useRef, useState } from 'react'
import { Auth } from 'aws-amplify'
import { useLocation, useNavigate } from 'react-router-dom'
import DigitInputs from '../../components/ui/DigitInputs/DigitInputs'
import ThumbsUp from '../../assets/thumbsup.svg'
import './BevestigEmailPage.css'

function BevestigEmailPage() {

    const [isConfirmed, setIsConfirmed] = useState(false)

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
        .then(result => { if (result == 'SUCCESS') {
            setIsConfirmed(true)
            setTimeout(() => navigate('/dashboard'), 3000)
        }})
    }

    const form =
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

    const confirmedPopup =
    <div className="confirmemail-container">
        <p className="confirmemail-card_title">Gelukt!</p>
        <div className="confirmemail-screen">
            <img src={ThumbsUp} alt="" />
        </div>
        <p className="confirmemail-card_text">Uw email is bevestigd. U wordt nu doorgestuurd naar de volgende pagina.</p>
    </div>

    return (
        isConfirmed ? 
        confirmedPopup : form
        
    )
}

export default BevestigEmailPage