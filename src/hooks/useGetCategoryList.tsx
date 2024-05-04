import { IGetCategoryList } from "../models/responses/category.response";
import { appService } from "../services";
import { useFetch } from "./shared/useFetch";

export const useGetCategoryList = (): {
    fetchData: () => Promise<IGetCategoryList>;
    isLoading: boolean;
} => {
    const { makeRequest, isLoading } = useFetch<IGetCategoryList>();

    const fetchData = async () => {
        const response = await makeRequest(async () => appService.category.getCategoryList());
        return response;
    };

    return {
        fetchData,
        isLoading,
    };
};
