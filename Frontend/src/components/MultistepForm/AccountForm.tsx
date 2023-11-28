import { Auth } from "aws-amplify"
import { LoginForm } from "./LoginForm"
import { RegisterForm } from "./RegisterForm"
import { useEffect, useState } from "react"

type AccountFormData = {
    email: string
    loginEmail: string
    loginPassword: string
    firstName: string
    lastName: string
    registerEmail: string
    phoneNumber: string
    registerPassword: string
    repeatRegisterPassword: string
}

type AccountFormProps = AccountFormData & {
    updateFields: (fields: Partial<AccountFormData>) => void
  }

const AccountForm = ({ email, loginEmail, loginPassword, firstName, lastName, registerEmail, phoneNumber, registerPassword, repeatRegisterPassword, updateFields }: AccountFormProps) => {

    const [fetched, setFetched] = useState<boolean>(false)
    const [limitExceeded, setLimitExceeded] = useState<boolean>(false)
    const [userExists, setUserExists] = useState<boolean>(false)

    useEffect(() => {
        Auth.confirmSignUp(email, '000000', { forceAliasCreation: false })
        .then(() => {
            setUserExists(true)
            setFetched(true)}
        )
        .catch((err: string) => {
            console.error(err)
            const errorActionMap: Record<string, () => void> = {    
                'UserNotFoundException':  () => { setFetched(true) },
                'NotAuthorizedException': () => { setUserExists(true); setFetched(true) },
                'AliasExistsException':   () => { setFetched(true) },
                'CodeMismatchException':  () => { setFetched(true) },
                'ExpiredCodeException':   () => { setFetched(true) },
                'LimitExceededException': () => { setLimitExceeded(true) },
                'default':                () => { setUserExists(false); setFetched(true) }
            };
            (errorActionMap[err] || errorActionMap['default'])()
        })
    }, [])
    

    const data = { loginEmail, loginPassword, firstName, lastName, registerEmail, phoneNumber, registerPassword, repeatRegisterPassword }

    return(
        <>
            { limitExceeded ? <p>Er zijn te veel API-calls gemaakt. Probeer het later nogmaals.</p> : <></> }
            { fetched ? userExists ? <LoginForm {...data} updateFields={updateFields}/> : <RegisterForm {...data} updateFields={updateFields}/> : <></> }
            
        </>
    )
}

export default AccountForm