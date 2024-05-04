import { IGetUnitList } from "../models/responses/unit.response";
import { appService } from "../services";
import { useFetch } from "./shared/useFetch";

export const useGetUnitList = (): {
    fetchData: () => Promise<IGetUnitList>;
    isLoading: boolean;
} => {
    const { makeRequest, isLoading } = useFetch<IGetUnitList>();

    const fetchData = async () => {
        const response = await makeRequest(async () => appService.unit.getUnitList());
        return response;
    };

    return {
        fetchData,
        isLoading,
    };
};
