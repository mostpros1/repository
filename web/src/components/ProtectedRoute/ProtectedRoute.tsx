import { ReactNode, useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { UserRoles } from "../../types";
import { Auth } from "aws-amplify";

type ProtectedRouteProps = {
    allowedRoles: UserRoles[]
    page: ReactNode
    redirectTo: string
}

export const ProtectedRoute = ({ allowedRoles, page, redirectTo }: ProtectedRouteProps) => {
    const [isAuthorized, setIsAuthorized] = useState<boolean>(false)
    const navigate = useNavigate()

    async function checkAuthorization() {
        try {
            const user = await Auth.currentAuthenticatedUser()
            const userRoles = user?.signInUserSession?.accessToken?.payload['cognito:groups'] || []
            if (allowedRoles.some(role => userRoles.includes(role))) setIsAuthorized(true)
            else navigate(redirectTo)
        }
        catch (error) {
            console.error("Something went wrong:", error)
        }
    }

    useEffect(() => {
        checkAuthorization()
    }, [])

    return isAuthorized ? page : <></>
}