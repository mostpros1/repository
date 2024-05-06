import { Auth } from "aws-amplify"
import { LoginForm } from "./LoginForm"
import { RegisterForm } from "./RegisterForm"
import { useEffect, useState } from "react"
import { useUser } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

type AccountFormData = {
    postCode: string
    stad: string
    email: string
    firstName: string
    lastName: string
    phoneNumber: string
    password: string
    repeatPassword: string
    beroep?: string
    formConfig?: "HOMEOWNER"
}

type AccountFormProps = AccountFormData & {
    updateFields: (fields: Partial<AccountFormData>) => void
    setError: (error: string) => void;
    error: string;
}

export function AccountForm({ email, postCode, stad, firstName, lastName, phoneNumber, password, repeatPassword, updateFields }: AccountFormProps) {

    const [fetched, setFetched] = useState<boolean>(false)
    const [limitExceeded, setLimitExceeded] = useState<boolean>(false)
    const [userExists, setUserExists] = useState<boolean>(false)

    const data = { email, postCode, stad, firstName, lastName, phoneNumber, password, repeatPassword }


    const { updateUser } = useUser();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleLogin = async () => {
        try {
          const authenticatedUser = await Auth.signIn(data.email, data.password);
          updateUser(authenticatedUser);
          //navigate('/nl/');
          console.log('Logged in user:', authenticatedUser);
        } catch (error: any) {
          console.error('Login failed:', error);
          setError(error.message || 'Er is een fout opgetreden bij het aanmelden.');
        }
      };

    const formConfig = {
        loginForm: <LoginForm handleLogin={() => handleLogin()} setError={() => { }} error={""} {...data} updateFields={updateFields} setUserExists={setUserExists} />,
        registerForm: <RegisterForm /*setError={() => { }}*/ error={""} {...data} updateFields={updateFields} setUserExists={setUserExists} />
    }
   



    useEffect(() => {
        Auth.confirmSignUp(email, '000000', { forceAliasCreation: false })
            .then(() => {
                setUserExists(true)
                setFetched(true)
            }
            )
            .catch(err => {
                console.error(err)
                const errorActionMap: Record<string, () => void> = {
                    'UserNotFoundException': () => { setFetched(true) },
                    'NotAuthorizedException': () => { setUserExists(true); setFetched(true) },
                    'AliasExistsException': () => { setFetched(true) },
                    'CodeMismatchException': () => { setUserExists(true); setFetched(true) },
                    'ExpiredCodeException': () => { setFetched(true) },
                    'LimitExceededException': () => { setLimitExceeded(true) },
                    'default': () => { setUserExists(false); setFetched(true) }
                };
                (errorActionMap[err.code] || errorActionMap['default'])()
            })
    }, [])

    return (
        <>
            {limitExceeded && <p>Er zijn te veel API-calls gemaakt. Probeer het later nogmaals.</p>}
            {fetched && userExists ? formConfig.loginForm : formConfig.registerForm}
        </>
    )
}