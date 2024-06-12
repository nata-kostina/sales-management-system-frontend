import { FC } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AxiosError } from "axios";
import { LoginForm } from "./components/LoginForm/LoginForm";
import { Routes } from "../../types/routes";
import { appService } from "../../services";
import { useFetch } from "../../hooks/shared/useFetch";
import { appController } from "../../controllers";
import { ILoginFormValues, loginFormSchema } from "../../schemas/login.form.schema";
import { Hero } from "./components/Hero/Hero";
import { selectIsAuth } from "../../store/selector";
import { useAppSelector } from "../../store/hooks";
import { BgLogin } from "../../components/vectors/backgrounds/BgLogin";
import { PreloaderPortal } from "../../components/ui/Preloader/PreloaderPortal";
import { AuthResponse } from "../../models/responses/auth.response";
import { useModalOperationResult } from "../../hooks/shared/useModalOperationResult";

export const LoginPage: FC = () => {
    const auth = useAppSelector(selectIsAuth);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginFormValues>({
        resolver: yupResolver(loginFormSchema),
    });
    const { makeRequest, isLoading } = useFetch<AuthResponse>();
    const location = useLocation();
    const navigate = useNavigate();
    const { modalError } = useModalOperationResult();

    const login: SubmitHandler<ILoginFormValues> = async ({ email, password }) => {
        try {
            const response = await makeRequest(async () => {
                return appService.auth.login(email, password);
            });
            appController.auth.handleLogin(response);

            const prevUrl = location.state?.from?.pathname;
            if (prevUrl) {
                navigate(prevUrl);
            } else {
                navigate(`../${Routes.Account}`);
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                const data = error.response?.data;
                if (data?.errors && Array.isArray(data.errors) && data.errors.length !== 0) {
                    modalError(`Error! ${data.errors[0]}`);
                } else {
                    modalError(`Error! ${error.message}`);
                }
            } else {
                modalError("Error! Try again.");
            }
            appController.auth.handleLogout();
        }
    };

    return (
        <>
            {isLoading ? <PreloaderPortal /> :
                auth ? <Navigate to={`../${Routes.Account}`} /> :
                    (
                        <div className="page-wrapper page-wrapper-login">
                            <div className="page page-login">
                                <main id="main" className="main">
                                    <div className="page__inner">
                                        <div className="grid-item grid-item_form">
                                            <div className="container">
                                                <div className="grid-item__inner">
                                                    <LoginForm errors={errors} register={register} onSubmit={handleSubmit(login)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid-item grid-item_hero">
                                            <BgLogin />
                                            <Hero />
                                        </div>
                                    </div>
                                </main>
                            </div>
                        </div>
                    )}
        </>
    );
};
