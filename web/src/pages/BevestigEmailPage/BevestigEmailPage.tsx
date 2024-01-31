import { FormEvent, useRef, useState } from 'react'
import { Auth } from 'aws-amplify'
import { cognitoClient } from '../../main'
import { useLocation, useNavigate } from 'react-router-dom'
import DigitInputs from '../../components/ui/DigitInputs/DigitInputs'
import ThumbsUp from '../../assets/thumbsup.svg'
import './BevestigEmailPage.css'

type PostConfig = {
    successPage: string
    roleName: string
}

function BevestigEmailPage() {

    const [isConfirmed, setIsConfirmed] = useState(false)
    const [userExists, setUserExists] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()
    const inputRef = useRef([])

    const userEmail = location.state === null ? "" : location.state.email
    const postConfigId = location.state === null ? "" : location.state.postConfig

    const postConfigMap: Record<string, PostConfig> = {
        'HOMEOWNER': {
            successPage: '/huiseigenaar-resultaat',
            roleName: "Homeowner",
        },
        'PROFESSIONAL': {
            successPage: '/specialist-resultaat',
            roleName: "Professional",
        }
    }
    const postConfig = postConfigMap[postConfigId] || null

    async function confirmSignUp(code: string) {
        const addToGroupResult = await cognitoClient.adminAddUserToGroup({
            UserPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
            Username: userEmail,
            GroupName: postConfig.roleName,
        }).promise()
        .catch(error => console.error(error))
        console.log(addToGroupResult)
        if (!addToGroupResult) return

        const confirmationResult = await Auth.confirmSignUp(userEmail, code)
        .catch(error => {
            console.error(error)
            const errorActionMap: Record<string, () => void> = {
                "NotAuthorizedException": () => { setUserExists(true); setTimeout(() => navigate(postConfig.successPage), 3000) },
                "CodeMismatchException": () => { },
                "default": () => {}
            };
            (errorActionMap[error.code] || errorActionMap['default'])()
        })
        if (confirmationResult == 'SUCCESS') {
            setIsConfirmed(true)
            setTimeout(() => navigate(postConfig.successPage), 3000)
        }
    }

    function onSubmit(e: FormEvent) {
        e.preventDefault()
        let code: string = ""
        inputRef.current.forEach((input: HTMLInputElement) => { code += input.value })

        confirmSignUp(code)
    }

    function onNewCode() {
        Auth.resendSignUp(userEmail)
        .catch(error => {
            if (error.code == "InvalidParameterException") {
                setUserExists(true)
                setTimeout(() => navigate('/huiseigenaar-resultaat'), 3000)
            }
        })
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