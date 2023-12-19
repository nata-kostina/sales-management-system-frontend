import { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import { IRefreshResponse } from "../models/response/IRefreshResponse";
import { LocalStorageTokenKey } from "../utils/constants";
import { appService } from "../services";
import { IUser } from "../models/user.interface";

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
                const refreshToken = localStorage.getItem(
                    LocalStorageTokenKey,
                );
                if (!refreshToken) {
                    setToken("");
                    setIsAuth(false);
                    setIsLoading(false);
                    setUser(null);
                    return;
                }
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
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        checkAuth();
    }, [makeRequest]);
    return {
        isLoading,
        isAuth,
        token,
        user,
    };
};
