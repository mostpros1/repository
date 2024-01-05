import { useEffect, useState } from "react";
import { Auth } from "aws-amplify";
import { UserRoles } from "../types"

export const useAuthorization = (allowedRoles: UserRoles[]) => {

    const [isAuthorized, setIsAuthorized] = useState<boolean>(false)

    async function checkAuth() {
        try {
            const user = await Auth.currentAuthenticatedUser()
            const userRoles = user?.signInUserSession?.accessToken?.payload['cognito:groups'] || []
            console.log(userRoles)
            if (allowedRoles.some(role => userRoles.includes(role))) setIsAuthorized(true)
        }
        catch (error) {
            console.error("Something went wrong:", error)
            setIsAuthorized(false)
        }
    }

    useEffect(() => {
        checkAuth()
    }, [])

    useEffect(() => {
        console.log(isAuthorized)
    }, [isAuthorized])

    return isAuthorized
}