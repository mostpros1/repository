import { ReactNode, useEffect, useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuthorization } from "../../hooks/useAuthorization";
import { UserRoles } from "../../types";

type ProtectedRouteProps = {
    allowedRoles: UserRoles[]
    page: ReactNode
    redirectTo: string
}

export const ProtectedRoute = ({ allowedRoles, page, redirectTo }: ProtectedRouteProps) => {
    const [isAuthChecked, setIsAuthChecked] = useState<boolean>(false)
    const isAuthorized = useAuthorization(allowedRoles)
    const navigate = useNavigate()

    const checkAuthorization = async () => {
        if (!isAuthorized && isAuthChecked) { navigate(redirectTo) }
    }

    useEffect(() => {
        if (!isAuthChecked) setIsAuthChecked(true)
    }, [isAuthorized])

    useEffect(() => {
        checkAuthorization()
    }, [isAuthChecked])

    return isAuthorized ? page : <></>
}