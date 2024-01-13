import { IGetCategoryList } from "../models/response/IGetCategoryList";
import { appService } from "../services";
import { useFetch } from "./useFetch";

export const useGetCategoryList = (): {
    fetchData: () => Promise<IGetCategoryList>;
    isLoading: boolean;
} => {
    const { makeRequest, isLoading } = useFetch<IGetCategoryList>();

    const fetchData = async () => {
        const response = await makeRequest(async () => appService.categories.getCategoryList());
        return response;
    };

    return {
        fetchData,
        isLoading,
    };
};
