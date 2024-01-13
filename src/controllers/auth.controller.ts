import { setAuth, setToken, setUser } from "../store/slices/auth.slice";
import { store } from "../store/store";
import { AuthResponse } from "../models/response/AuthResponse";

export class AuthController {
    public handleLogin(response: AuthResponse): void {
        store.dispatch(setAuth(true));
        store.dispatch(setToken(response.accessToken));
        store.dispatch(setUser(response.user));
    }

    public handleLogout(): void {
        store.dispatch(setToken(""));
        store.dispatch(setUser(null));
        store.dispatch(setAuth(false));
    }
}
