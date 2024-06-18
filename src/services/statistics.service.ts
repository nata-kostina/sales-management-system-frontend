import { AxiosResponse } from "axios";
import { $api } from "../api";
import {
    IGetSalesStatisticsByCategoriesPayload,
    IGetSalesStatisticsByCountriesPayload,
    IGetSalesStatisticsPayload,
} from "../models/requests/statistics.request";
import {
    IGetBestsellersResponse,
    IGetGeneralSalesStatisticResponse,
    IGetSalesStatisticsByCategoriesResponse,
    IGetSalesStatisticsByCountriesResponse,
    IGetSalesStatisticsResponse,
} from "../models/responses/statistics.response";

export class StatisticsService {
    private baseUrl: string;

    public constructor(url: string) {
        this.baseUrl = url;
    }

    public async getSalesStatistics(payload: IGetSalesStatisticsPayload): Promise<AxiosResponse<IGetSalesStatisticsResponse>> {
        return $api.get(`${this.baseUrl}/sales`, {
            params: {
                option: payload.option,
                year: payload.year,
            },
        });
    }

    public async getSalesStatisticsByCountries(payload: IGetSalesStatisticsByCountriesPayload): Promise<AxiosResponse<IGetSalesStatisticsByCountriesResponse>> {
        return $api.get(`${this.baseUrl}/geo`, {
            params: {
                year: payload.year,
            },
        });
    }

    public async getSalesStatisticsByCategories(payload: IGetSalesStatisticsByCategoriesPayload): Promise<AxiosResponse<IGetSalesStatisticsByCategoriesResponse>> {
        return $api.get(`${this.baseUrl}/categories`, {
            params: {
                year: payload.year,
                option: payload.option,
            },
        });
    }

    public async getBestsellers(): Promise<AxiosResponse<IGetBestsellersResponse>> {
        return $api.get(`${this.baseUrl}/bestsellers`);
    }

    public async getGeneralStatistics(timezone: number): Promise<AxiosResponse<IGetGeneralSalesStatisticResponse>> {
        console.log({ timezone });
        return $api.get(`${this.baseUrl}/general`, {
            params: {
                tz: timezone,
            }
        });
    }
}
