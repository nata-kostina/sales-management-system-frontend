import { IGetBrandList } from "../models/response/IGetBrandList";
import { appService } from "../services";
import { useFetch } from "./useFetch";

export const useGetBrandList = (): {
    fetchData: () => Promise<IGetBrandList>;
    isLoading: boolean;
} => {
    const { makeRequest, isLoading } = useFetch<IGetBrandList>();

    const fetchData = async () => {
        const response = await makeRequest(async () => appService.brands.getBrandList());
        return response;
    };

    return {
        fetchData,
        isLoading,
    };
};
