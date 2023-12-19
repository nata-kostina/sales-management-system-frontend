import { IUser } from "../user.interface";

export interface IRefreshResponse {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}
