import { FormEvent, useRef, useState } from 'react'
import { Auth } from 'aws-amplify'
import { useLocation, useNavigate } from 'react-router-dom'
import DigitInputs from '../../components/ui/DigitInputs/DigitInputs'
import ThumbsUp from '../../assets/thumbsup.svg'
import './BevestigEmailPage.css'
import { stripeClient } from '../../main'
import { cognitoClient } from '../../main'
import { PostConfig } from './types';


function BevestigEmailPage() {

    const [isConfirmed, setIsConfirmed] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()
    const inputRef = useRef([])

    const userEmail = location.state === null ? "" : location.state.email
    const postConfigId = location.state === null ? "" : location.state.postConfig

     // Replace './types' with the correct path to the module containing the PostConfig type

    const postConfigMap: Record<string, PostConfig> = {
        'HOMEOWNER': {
            roleName: "Homeowner",
            nextPage: '/huiseigenaar-resultaat',
            onSuccess: () => setTimeout(() => navigate(postConfigMap['HOMEOWNER'].nextPage), 3000)
        },
        'PROFESSIONAL': {
            roleName: "Professional",
            nextPage: '/specialist-resultaat',
            onSuccess: () => {
                stripeClient.accounts.create({
                    type: 'standard',
                    email: userEmail,
                    country: 'NL',
                })
                

                .then(stripeAccount => {
                    cognitoClient.adminUpdateUserAttributes({
                        UserPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
                        Username: userEmail,
                        UserAttributes: [{
                            Name: 'custom:stripeAccountId',
                            Value: stripeAccount.id
                        }]
                    }).promise()
                    .then(() => {
                        stripeClient.accountLinks.create({
                            account: stripeAccount.id,
                            type: 'account_onboarding',
                            refresh_url: `${window.location.origin}/payments/onboarding-failed`,
                            return_url: `${window.location.origin}${postConfigMap['PROFESSIONAL'].nextPage}`
                        })
                        .then(result => window.location.href = result.url)
                        .catch(err => console.error(err))
                    })
                    .catch(err => console.error(err))
                })
                .catch(err => console.error(err))
            },
        }
    }
    const postConfig = postConfigMap[postConfigId] || null

    async function confirmSignUp(code: string) {
        
        const confirmationResult = await Auth.confirmSignUp(userEmail, code)
        .catch(error => {
            console.error(error)
            const errorActionMap: Record<string, () => void> = {
                "NotAuthorizedException": () => { setUserExists(true); setTimeout(() => navigate(postConfigMap[postConfigId].nextPage), 3000) },
                "CodeMismatchException": () => { },
                "default": () => {}
            };
            (errorActionMap[error.code] || errorActionMap['default'])()
        })
        const addToGroupResult = await cognitoClient.adminAddUserToGroup({
            UserPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
            Username: userEmail,
            GroupName: postConfig.roleName,
        }).promise()
        .catch(error => console.error(error))
        console.log(addToGroupResult)
        if (!addToGroupResult) return
        if (confirmationResult == 'SUCCESS') {
            setIsConfirmed(true)
            postConfig.onSuccess && postConfig.onSuccess()
        }
    }

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
            setTimeout(() => navigate('/huiseigenaar-resultaat'), 3000)
        }})
    }

    function onNewCode() {
        Auth.resendSignUp(userEmail)
        .catch(error => {
            if (error.code == "InvalidParameterException") {
                setUserExists(true)
                setTimeout(() => navigate(postConfigMap[postConfigId].nextPage), 3000)
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