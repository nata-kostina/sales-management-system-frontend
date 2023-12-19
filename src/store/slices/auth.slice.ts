/* eslint-disable no-debugger */
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../models/user.interface";

interface AuthState {
    isAuth: boolean;
    token: string;
    user: IUser | null;
}

const initialState: AuthState = {
    isAuth: false,
    token: "",
    user: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth(state, action: PayloadAction<boolean>) {
            state.isAuth = action.payload;
        },
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
        },
        setUser(state, action: PayloadAction<IUser | null>) {
            state.user = action.payload;
        },
    },
});

export const { setAuth, setToken, setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
