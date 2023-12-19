import { AxiosResponse } from "axios";
import { useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectIsLoading } from "../store/selector";
import { setGlobalIsLoading } from "../store/slices/ui.slice";

export function useFetch<TResponse>(initLoading?: boolean) {
    const [isLoading, setIsLoading] = useState<boolean>(!!initLoading);
    const [error, setError] = useState<boolean>(false);

    const makeRequest = useCallback(
        async function fn(request: () => Promise<AxiosResponse<TResponse>>) {
            try {
                setIsLoading(true);
                setError(false);
                const response = await request();
                return response.data;
            } catch (error) {
                console.log(error);
                setError(true);
                throw error;
                // if (error instanceof AxiosError || error instanceof Error) {
                //     throw error.message;
                // } else {
                //     throw new Error("Network error");
                // }
            } finally {
                console.log("finally", request);
                setIsLoading(false);
            }
        }, []);

    return {
        isLoading,
        makeRequest,
        error,
    };
}
