import { SaleStatisticsByCategoriesData, SaleStatisticsData } from "../../types/ui.types";
import { IProduct } from "../entities/product.interface";

export interface IGetSalesStatisticsResponse {
    data: SaleStatisticsData;
    minDate: number;
    maxDate: number;
}

export type IGetSalesStatisticsByCountriesResponse = IGetSalesStatisticsResponse;
export type IGetSalesStatisticsByCategoriesResponse = {
    data: SaleStatisticsByCategoriesData;
    minDate: number;
    maxDate: number;
};

export interface IGetBestsellersResponse {
    products: IProduct[];
}

export interface IGetGeneralSalesStatisticResponse {
    total: number;
    monthly: {
        amount: number;
        change: number;
    };
    weekly: {
        amount: number;
        change: number;
    };
}
