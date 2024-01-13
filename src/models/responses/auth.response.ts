import { IUser } from "../entities/user.interface";

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}

export interface IRefreshResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}
