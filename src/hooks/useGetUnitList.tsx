import { IGetUnitsResponse } from "../models/responses/unit.response";
import { appService } from "../services";
import { useFetch } from "./shared/useFetch";

export const useGetUnitList = (): {
    fetchData: () => Promise<IGetUnitsResponse>;
    isLoading: boolean;
} => {
    const { makeRequest, isLoading } = useFetch<IGetUnitsResponse>();

    const fetchData = async () => {
        const response = await makeRequest(async () => appService.unit.getUnits());
        return response;
    };

    return {
        fetchData,
        isLoading,
    };
};
