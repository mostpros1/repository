import { FormEvent, useRef, useState } from 'react'
import { Auth } from 'aws-amplify'
import { cognitoClient, stripeClient } from '../../main'
import { useLocation, useNavigate } from 'react-router-dom'
import DigitInputs from '../../components/ui/DigitInputs/DigitInputs'
import ThumbsUp from '../../assets/thumbsup.svg'
import './BevestigEmailPage.css'

type PostConfig = {
    roleName: string
    nextPage: string
    onSuccess?: Function
}

function BevestigEmailPage() {

    const [isConfirmed, setIsConfirmed] = useState(false)
    const [userExists, setUserExists] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()
    const inputRef = useRef([])

    const userEmail = location.state === null ? "" : location.state.email

    function onSubmit(e: FormEvent) {
        e.preventDefault()
        let code: string = ""
        inputRef.current.forEach((input: HTMLInputElement) => { code += input.value })

        confirmSignUp(code)
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
            <a className="confirmemail-card_newCode" onClick={onNewCode}>Nieuwe code versturen</a>
        </form>
    </div>

    const confirmedPopup =
    <div className="confirmemail-container confirmed">
        <p className="confirmemail-card_title confirmed">Gelukt!</p>
        <div className="confirmemail-screen confirmed">
            <img src={ThumbsUp} alt="" />
        </div>
        <p className="confirmemail-card_text confirmed">Uw email is bevestigd. U wordt nu doorgestuurd naar de volgende pagina.</p>
    </div>

    const userExistsPopup =
    <div className="confirmemail-container confirmed">
        <p className="confirmemail-card_title confirmed">U bent al geverifieerd.</p>
        <p className="confirmemail-card_text confirmed">Uw account is al geverifieerd. U wordt nu doorgestuurd naar de volgende pagina.</p>
    </div>

    return (
        userExists ? userExistsPopup : isConfirmed ? confirmedPopup : form
    )
}

export default BevestigEmailPage