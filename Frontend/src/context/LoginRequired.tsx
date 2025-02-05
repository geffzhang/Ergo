import {Navigate, Outlet} from "react-router-dom";
import api from "../services/api";
import {useEffect, useState, createContext, useContext} from "react";
import {Spinner} from "@material-tailwind/react";

type UserType = {
    token: string | null;
    userId: string | null;
    username: string | null;
    email: string | null;
    role: string | null;
}

const UserContext = createContext<UserType>({
    token: null,
    userId: null,
    username: null,
    email: null,
    role: null,
});

export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}

type GetCurrentUserInfoResponseType = {
    isAuthenticated: boolean;
    userName: string;
    claims: {
        [key: string]: string;
    }
} | undefined;

export default function LoginRequired() {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [user, setUser] = useState<UserType>({
        token: null,
        userId: null,
        username: null,
        email: null,
        role: null,
    });

    useEffect(() => {
        const checkLogin = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setIsAuthenticated(false);
                return;
            }

            try {
                const response = await api.get<GetCurrentUserInfoResponseType>("/api/v1/Authentication/currentuserinfo", {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.status === 200 && response.data?.isAuthenticated) {
                    setIsAuthenticated(true);
                    setUser({
                        token: token,
                        userId: response.data?.claims?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
                        username: response.data?.userName,
                        email: response.data?.claims?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
                        role: response.data?.claims?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
                    })
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                setIsAuthenticated(false);
            }
        };

        checkLogin();
    }, []);

    if(isAuthenticated === null) {
        return (
            <div className="flex min-h-screen bg-gradient-to-r from-surface-darkest to-[#262133]">
                <Spinner className={'m-auto w-10 h-10'}/>
            </div>
        )
    }


    if(!isAuthenticated) {
        return <Navigate to="/auth/sign-in" replace/>;
    }

    return (
        <UserContext.Provider value={user}>
            <Outlet/>
        </UserContext.Provider>
    )

}