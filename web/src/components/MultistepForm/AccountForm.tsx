import { Auth } from "aws-amplify"
import { LoginForm } from "./LoginForm"
import { RegisterForm } from "./RegisterForm"
import { useEffect, useState } from "react"
import SearchChoreForm from "../SpecialistMultistep/SearchChoreForm/SearchChoreForm"

type AccountFormData = {
    beroep: string
    postCode: string
    stad: string
    email: string
    firstName: string
    lastName: string
    phoneNumber: string
    password: string
    repeatPassword: string
}

type AccountFormProps = AccountFormData & {
    formConfig: 'HOMEOWNER' | 'SPECIALIST'
    updateFields: (fields: Partial<AccountFormData>) => void
  }

export function AccountForm ({ beroep, email, postCode, stad, firstName, lastName, phoneNumber, password, repeatPassword, formConfig, updateFields }: AccountFormProps) {

    const [fetched, setFetched] = useState<boolean>(false)
    const [limitExceeded, setLimitExceeded] = useState<boolean>(false)
    const [userExists, setUserExists] = useState<boolean>(false)

    const data = { beroep, email, postCode, stad, firstName, lastName, phoneNumber, password, repeatPassword }

    const formConfigMap: Record<typeof formConfig, [JSX.Element, JSX.Element]> = {
        'HOMEOWNER': [
            <LoginForm {...data} updateFields={updateFields} setUserExists={setUserExists} />,
            <RegisterForm {...data} updateFields={updateFields} setUserExists={setUserExists} />
        ],
        'SPECIALIST': [
            <SearchChoreForm {...data} updateFields={updateFields} />,
            <SearchChoreForm {...data} updateFields={updateFields} />
        ]
    }

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

    return(
        <>
            { limitExceeded ? <p>Er zijn te veel API-calls gemaakt. Probeer het later nogmaals.</p> : <></> }
            { fetched ? userExists ? formConfigMap[formConfig][0] : formConfigMap[formConfig][1] : <></> }
        </>
    )
}