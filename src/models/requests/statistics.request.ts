import { SaleStatisticsOption } from "../../types/ui.types";

export interface IGetSalesStatisticsPayload {
    option: SaleStatisticsOption;
    year: number | null;
}

export interface IGetSalesStatisticsByCountriesPayload {
    year: number | null;
}

export type IGetSalesStatisticsByCategoriesPayload = IGetSalesStatisticsPayload;
