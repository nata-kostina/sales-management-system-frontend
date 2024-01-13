import { FC, useEffect } from "react";
import { useLocation, Outlet, Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import { useFetch } from "../../hooks/useFetch";
import { appService } from "../../services";
import { appController } from "../../controllers";
import { selectIsAuth } from "../../store/selector";
import { PreloaderPortal } from "../../components/ui/Preloader/PreloaderPortal";
import { AuthResponse } from "../../models/responses/auth.response";

export const PrivateLayout: FC = () => {
    const isAuth = useAppSelector(selectIsAuth);
    const location = useLocation();
    const { isLoading, makeRequest } = useFetch<AuthResponse>(true);
    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await makeRequest(async () => {
                    return appService.auth.refresh();
                });
                appController.auth.handleLogin(response);
            } catch (error) {
                appController.auth.handleLogout();
            }
        };

        checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return isLoading ? <PreloaderPortal /> :
        isAuth ? (
            <Outlet />
        ) : (
            <Navigate to="/login" state={{ from: location }} />
        );
};
