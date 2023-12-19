import { IUser } from "../user.interface";

export interface AuthResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}
