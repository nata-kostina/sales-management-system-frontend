import { setAuth, setToken, setUser } from "../store/slices/auth.slice";
import { store } from "../store/store";
import { AuthResponse } from "../models/response/AuthResponse";
import { LocalStorageTokenKey } from "../utils/constants";

export class AuthController {
    public handleLogin(response: AuthResponse): void {
        console.log("handleLogin");
        localStorage.setItem(LocalStorageTokenKey, response.accessToken);
        store.dispatch(setAuth(true));
        store.dispatch(setToken(response.accessToken));
        store.dispatch(setUser(response.user));
    }

    public handleLogout(): void {
        console.log("handleLogout");
        localStorage.removeItem(LocalStorageTokenKey);
        store.dispatch(setToken(""));
        store.dispatch(setUser(null));
        store.dispatch(setAuth(false));
    }
}
