import { FormEvent, useRef, useState } from 'react'
import { Auth } from 'aws-amplify'
import { cognitoClient } from '../../main'
import { useLocation, useNavigate } from 'react-router-dom'
import DigitInputs from '../../components/ui/DigitInputs/DigitInputs'
import ThumbsUp from '../../assets/thumbsup.svg'
import './BevestigEmailPage.css'
import { sendMail } from "./../../../../backend_functions/email.ts"
import Stripe from 'stripe';
import { dynamo } from "../../../declarations.ts";
import { stopXSS } from '../../../../backend_functions/stopXSS.ts'


let taal = "nl";

if (window.location.pathname.split('/')[1] == "nl" || window.location.pathname.split('/')[1] == "en") {
    taal = window.location.pathname.split('/')[1];
}


type PostConfig = {
    roleName: string
    nextPage: string
    onSuccess?: Function
}

function BevestigEmailPage() {

    const [isConfirmed, setIsConfirmed] = useState(false)
    const [userExists, setUserExists] = useState(false)

    const location = useLocation();
    const navigate = useNavigate();
    const inputRef = useRef([]);

    console.log("Received state:", location.state);

    const url = window.location.href;

    const urlObj = new URL(url);

    const hash = urlObj.hash;

    const everythingAfterFirstHash = hash.substring(1);

    const userEmail = location.state === null ? "" : location.state.email
    const postConfigId = location.state === null ? "" : location.state.postConfig

    /*const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY, {
        apiVersion: '2023-10-16',
    });

    const postConfigMap: Record<string, PostConfig> = {
        'HOMEOWNER': {
            roleName: "Homeowner",
            nextPage: `/${taal}/` + everythingAfterFirstHash,
            onSuccess: () => {
                cognitoClient.adminAddUserToGroup({
                    UserPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
                    Username: userEmail,
                    GroupName: 'Homeowner',
                }).promise()

                    .then(async () => {
                        const stripeCustomer = await stripe.customers.create({
                            email: userEmail,
                          });
                          await cognitoClient.adminUpdateUserAttributes({
                            UserPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
                            Username: userEmail,
                            UserAttributes: [{ Name: 'custom:stripeCustomerId', Value: stripeCustomer.id }]
                          }).promise();
                        dynamo.query({
                            TableName: "Users",
                            IndexName: "username",
                            KeyConditionExpression: "email = :email",
                            ExpressionAttributeValues: {
                                ":email": userEmail,
                            },
                        }).promise() // Use.promise() here to get a Promise
                            .then(data => {
                                if (data.Items) {
                                    dynamo.update({
                                        TableName: "Users",
                                        Key: {
                                            id: data.Items[0].Id,
                                        },
                                        UpdateExpression: `set stripeCustomerId = :stripeCustomerId`,
                                        ExpressionAttributeValues: {
                                            ":stripeCustomerId": Number(stopXSS(String(stripeCustomer.id))),
                                        },
                                    }).promise() // And here as well
                                        .then(output => console.log(output.Attributes))
                                        .catch(console.error);
                                }
                                setTimeout(() => navigate(postConfigMap['HOMEOWNER'].nextPage), 3000);
                            })
                            .catch(error => console.error(error));

                    })
                    .catch(error => console.error(error));
            }
        },
        'PROFESSIONAL': {
            roleName: "Professional",
            nextPage: `/${taal}/pro-dashboard`,

            onSuccess: () => {
                cognitoClient.adminAddUserToGroup({
                    UserPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
                    Username: userEmail,
                    GroupName: 'Professional',
                }).promise()
                    .then(async () => {
                
                          const stripeCustomer = await stripe.customers.create({
                            email: userEmail,
                          });
                          await cognitoClient.adminUpdateUserAttributes({
                            UserPoolId: import.meta.env.VITE_AWS_USER_POOL_ID,
                            Username: userEmail,
                            UserAttributes: [{ Name: 'custom:stripeCustomerId', Value: stripeCustomer.id }]
                          }).promise();

                        dynamo.query({
                            TableName: "Users",
                            IndexName: "username",
                            KeyConditionExpression: "email = :email",
                            ExpressionAttributeValues: {
                                ":email": userEmail,
                            },
                        }).promise() // Use.promise() here to get a Promise
                            .then(data => {
                                if (data.Items) {
                                    dynamo.update({
                                        TableName: "Users",
                                        Key: {
                                            id: data.Items[0].Id,
                                        },
                                        UpdateExpression: `set stripeCustomerId = :stripeCustomerId`,
                                        ExpressionAttributeValues: {
                                            ":stripeCustomerId": Number(stopXSS(String(stripeCustomer.id))),
                                        },
                                    }).promise() // And here as well
                                        .then(output => console.log(output.Attributes))
                                        .catch(console.error);
                                }
                                setTimeout(() => navigate(postConfigMap['PROFESSIONAL'].nextPage), 3000);
                            })
                            .catch(error => console.error(error));
                    }).catch(error => console.error(error));
            }
        },
    }
    const postConfig = postConfigMap[postConfigId] || null

    async function confirmSignUp(code: string) {

        const confirmationResult = await Auth.confirmSignUp(userEmail, code)
            .catch(error => {
                console.error(error)
                const errorActionMap: Record<string, () => void> = {
                    "NotAuthorizedException": () => { setUserExists(true); setTimeout(() => navigate(postConfigMap[postConfigId].nextPage), 3000) },
                    "CodeMismatchException": () => { },
                    "default": () => { }
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
            sendMail(userEmail, "Uw account is geverifieerd", "Uw account is geverifieerd. U kunt nu inloggen op de website.", "<html><p>Uw account is geverifieerd. U kunt nu inloggen op de website.</p></html>")
        }
    }

    */
    //RESTAPI VERSION

    const postConfigMap: Record<string, PostConfig> = {
        'HOMEOWNER': {
            roleName: "Homeowner",
            nextPage: `/${taal}/` + everythingAfterFirstHash,
            onSuccess: () => {
                setTimeout(() => navigate(postConfigMap['HOMEOWNER'].nextPage), 3000);
            },
        },
        'PROFESSIONAL': {
            roleName: "Professional",
            nextPage: `/${taal}/pro-dashboard`,
            onSuccess: () => {
                setTimeout(() => navigate(postConfigMap['PROFESSIONAL'].nextPage), 3000);
            },
        },
    }

    async function confirmSignUp(code: string) {
        const apiUrl = "https://sppgt6xgr8.execute-api.eu-north-1.amazonaws.com/submit";
    
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userEmail: userEmail,
                    code: code,
                    postConfigId: postConfigId,
                }),
            });
    
            if (!response.ok) {
                throw new Error(`Network response was not ok, status code: ${response.status}`);
            }
    
            const contentType = response.headers.get('content-type');
            let data;
    
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                // Handle non-JSON response (if any)
                data = await response.text(); // Read the response as text
                // Assume success if a plain text response is received
                if (data === "Sign-up confirmed and user added to group.") {
                    data = { message: data, statusCode: 200 };
                }
            }
    
            console.log('Response data:', data);
    
            setIsConfirmed(true);
            const postConfig = postConfigMap[postConfigId] || null;
            postConfig.onSuccess && postConfig.onSuccess();
            window.location.href = window.location.origin + postConfig.nextPage;
            //navigate(postConfig.nextPage);
        } catch (error) {
            console.error('Error in confirmSignUp:', error);
            // Handle or propagate the error as needed
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
                    setTimeout(() => navigate(postConfigMap[postConfigId].nextPage), 3000)
                }
            })
    }
    const form =
        <div className="confirmemail-container">
            <form className="confirmemail-card" onSubmit={onSubmit}>
                <div className="confirmemail-card_header">
                    <p className="confirmemail-card_title">Bevestig uw e-mailadres</p>
                    <hr />
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
    );
}

export default BevestigEmailPage
