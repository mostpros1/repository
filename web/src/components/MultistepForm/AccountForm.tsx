import { Auth } from "aws-amplify"
import { LoginForm } from "./LoginForm"
import { RegisterForm } from "./RegisterForm"
import { useEffect, useState } from "react"

type AccountFormData = {
    email: string
    firstName: string
    lastName: string
    phoneNumber: string
    password: string
    repeatPassword: string
}

type AccountFormProps = AccountFormData & {
    updateFields: (fields: Partial<AccountFormData>) => void
  }

export function AccountForm ({ email, firstName, lastName, phoneNumber, password, repeatPassword, updateFields }: AccountFormProps) {

    const [fetched, setFetched] = useState<boolean>(false)
    const [limitExceeded, setLimitExceeded] = useState<boolean>(false)
    const [userExists, setUserExists] = useState<boolean>(false)

    useEffect(() => {
        Auth.confirmSignUp(email, '000000', { forceAliasCreation: false })
        .then(() => {
            setUserExists(true)
            setFetched(true)}
        )
        .catch(err => {
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
            (errorActionMap[err.code] || errorActionMap['default'])()
        })
    }, [])
    

    const data = { email, firstName, lastName, phoneNumber, password, repeatPassword }

    return(
        <>
            { limitExceeded ? <p>Er zijn te veel API-calls gemaakt. Probeer het later nogmaals.</p> : <></> }
            { fetched ? userExists ? <LoginForm {...data} updateFields={updateFields} setUserExists={setUserExists}/> : <RegisterForm {...data} updateFields={updateFields} setUserExists={setUserExists}/> : <></> }
            
        </>
    )
}