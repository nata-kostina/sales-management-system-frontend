/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import axios from "axios";
import { store } from "../store/store";
import { setToken } from "../store/slices/auth.slice";
import { AuthResponse } from "../models/responses/auth.response";

export const baseURL = import.meta.env.VITE_API_URL;

export const $api = axios.create({
    withCredentials: true,
    baseURL,
});

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${store.getState().auth.token}`;
    console.log(`${config.method} - Request - ${config.url}`);
    return config;
}, (error) => {
    const originalRequest = error.config;
    console.error(`${originalRequest.method} - Request - ${originalRequest.url}`);
});

$api.interceptors.response.use((config) => {
    return config;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !originalRequest._isRetry) {
        originalRequest._isRetry = true;
        try {
            const response = await axios.get<AuthResponse>("/api/auth/refresh", { withCredentials: true, baseURL });
            store.dispatch(setToken(response.data.accessToken));
            return await $api.request(originalRequest);
        } catch (e) {
            console.error("Not authorized");
        }
    }
    throw error;
});
