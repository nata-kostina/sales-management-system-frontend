import { IGetUnitList } from "../models/response/IGetUnitList";
import { appService } from "../services";
import { useFetch } from "./useFetch";

export const useGetUnitList = (): {
    fetchData: () => Promise<IGetUnitList>;
    isLoading: boolean;
} => {
    const { makeRequest, isLoading } = useFetch<IGetUnitList>();

    const fetchData = async () => {
        const response = await makeRequest(async () => appService.units.getUnitList());
        return response;
    };

    return {
        fetchData,
        isLoading,
    };
};
