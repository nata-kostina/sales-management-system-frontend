import axios, { AxiosResponse } from "axios";
import { $api } from "../api";
import { AuthResponse, IRefreshResponse } from "../models/responses/auth.response";

export class AuthService {
    private baseUrl: string;

    public constructor(url: string) {
        this.baseUrl = url;
        this.login = this.login.bind(this);
        this.registration = this.registration.bind(this);
        this.refresh = this.refresh.bind(this);
        this.logout = this.logout.bind(this);
    }

    public async login(
        email: string,
        password: string,
    ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>(`${this.baseUrl}/login`, {
            email,
            password,
        });
    }

    public async registration(
        email: string,
        password: string,
    ): Promise<AxiosResponse<AuthResponse>> {
        return $api.post<AuthResponse>(`${this.baseUrl}/registration`, {
            email,
            password,
        });
    }

    public async refresh(): Promise<AxiosResponse<IRefreshResponse>> {
        return axios.get<IRefreshResponse>(
            `${$api.defaults.baseURL}${this.baseUrl}/refresh`,
            {
                withCredentials: true,
            },
        );
    }

    public async logout(): Promise<AxiosResponse<void>> {
        return $api.post(`${this.baseUrl}/logout`);
    }
}
