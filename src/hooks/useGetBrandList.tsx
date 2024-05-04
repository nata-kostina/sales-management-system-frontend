import { IGetBrandList } from "../models/responses/brand.response";
import { appService } from "../services";
import { useFetch } from "./shared/useFetch";

export const useGetBrandList = (): {
    fetchData: () => Promise<IGetBrandList>;
    isLoading: boolean;
} => {
    const { makeRequest, isLoading } = useFetch<IGetBrandList>();

    const fetchData = async () => {
        const response = await makeRequest(async () => appService.brand.getBrandList());
        return response;
    };

    return {
        fetchData,
        isLoading,
    };
};
