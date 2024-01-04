import { Auth } from "aws-amplify";
import { ReactNode, useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

type UserRoles = "Admin" | "Homeowner" | "Professional"

type ProtectedRouteProps = {
    allowedRoles: UserRoles[]
    page: ReactNode
}

export const ProtectedRoute = ({ allowedRoles, page }: ProtectedRouteProps) => {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
    const navigate = useNavigate()

    async function authenticate() {
        const user = await Auth.currentAuthenticatedUser()
        const userRoles = user?.signInUserSession?.accessToken?.payload['cognito:groups'] || []
        console.log(userRoles)
        if (allowedRoles.some(role => userRoles.includes(role))) setIsAuthenticated(true)
        else navigate("/")
    }

    useEffect(() => {
        authenticate()
    }, [])

    return isAuthenticated ? page : <></>
}