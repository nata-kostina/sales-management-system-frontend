import { AxiosResponse } from "axios";
import { useState, useCallback } from "react";

export function useFetch<TResponse>(initLoading?: boolean): {
    isLoading: boolean;
    makeRequest: (request: () => Promise<AxiosResponse<TResponse>>) => Promise<TResponse>;
    error: boolean;
} {
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
                console.error(error);
                setError(true);
                throw error;
            } finally {
                setIsLoading(false);
            }
        }, []);

    return {
        isLoading,
        makeRequest,
        error,
    };
}
