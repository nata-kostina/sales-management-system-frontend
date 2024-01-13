import { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import { appService } from "../services";
import { IRefreshResponse } from "../models/responses/auth.response";
import { IUser } from "../types/entities";

interface UseCheckAuthResponse {
    isLoading: boolean;
    isAuth: boolean;
    token: string;
    user: IUser | null;
}

export const useCheckAuth = (): UseCheckAuthResponse => {
    const [token, setToken] = useState("");
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState<IUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { makeRequest } = useFetch<IRefreshResponse>();

    useEffect(() => {
        const checkAuth = async () => {
            try {
                setIsLoading(true);

                const response = await makeRequest(() =>
                    appService.auth.refresh(),
                );
                setToken(response.accessToken);
                setIsAuth(true);
                setUser(response.user);
            } catch (error) {
                setIsAuth(false);
                setToken("");
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [makeRequest]);
    return {
        isLoading,
        isAuth,
        token,
        user,
    };
};
