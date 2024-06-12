import { IGetBrandsResponse } from "../models/responses/brand.response";
import { appService } from "../services";
import { useFetch } from "./shared/useFetch";

export const useGetBrandList = (): {
    fetchData: () => Promise<IGetBrandsResponse>;
    isLoading: boolean;
} => {
    const { makeRequest, isLoading } = useFetch<IGetBrandsResponse>();

    const fetchData = async () => {
        const response = await makeRequest(async () => appService.brand.getBrands());
        return response;
    };

    return {
        fetchData,
        isLoading,
    };
};
