/* eslint-disable no-debugger */
import { FC, useEffect } from "react";
import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { useFetch } from "../../hooks/useFetch";
import { appService } from "../../services";
import { AuthResponse } from "../../models/response/AuthResponse";
import { appController } from "../../controllers";
import { selectIsAuth } from "../../store/selector";
import { LocalStorageTokenKey } from "../../utils/constants";
import { PreloaderPortal } from "../../components/ui/Preloader/PreloaderPortal";

export const PrivateLayout: FC = () => {
    const isAuth = useAppSelector(selectIsAuth);
    const location = useLocation();
    const { isLoading, makeRequest } = useFetch<AuthResponse>(true);
    useEffect(() => {
        console.log("PrivateLayout useEffect");
        const checkAuth = async () => {
            try {
                console.log("checkAuth");
                console.log("isAuth ", isAuth);
                console.log("LocalStorageTokenKey: ", localStorage.getItem(LocalStorageTokenKey));
                const response = await makeRequest(async () => {
                    return appService.auth.refresh();
                });
                appController.auth.handleLogin(response);
            } catch (error) {
                console.log(`Error - PrivateLayout - ${error}`);
                appController.auth.handleLogout();
            }
        };

        checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log({ isLoading, isAuth });
    return isLoading ? <PreloaderPortal /> :
        isAuth ? (
            <Outlet />
        ) : (
            <Navigate to="/login" state={{ from: location }} />
        );
};
