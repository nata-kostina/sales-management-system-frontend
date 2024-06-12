import { SorterResult } from "antd/es/table/interface";
import { useCallback } from "react";
import { appController } from "../../controllers";
import { ISale } from "../../models/entities/sale.interface";
import { IGetSalesResponse } from "../../models/responses/sales.response";
import { appService } from "../../services";
import { SaleFilter, TableFilter } from "../../types/filters";
import { FetchItems } from "../../types/functions";
import { itemsPerPageDefault } from "../../utils/constants";
import { extractValuesFromFilter } from "../../utils/helper";
import { useFetch } from "../shared/useFetch";

export const useGetSales = (): { fetchSales: FetchItems<ISale, SaleFilter>; isGetSalesLoading: boolean; } => {
    const { isLoading, makeRequest } = useFetch<IGetSalesResponse>(true);

    const fetchSales: FetchItems<ISale, SaleFilter> = useCallback(
        async (
            SalesPage = 1,
            SalesPerPage = itemsPerPageDefault,
            localSorter?: SorterResult<ISale>,
            localFilter?: TableFilter<SaleFilter>,
        ) => {
            try {
                const response = await makeRequest(
                    () => {
                        return appService.sale.getSales(
                            SalesPage,
                            SalesPerPage,
                            (localSorter?.order) ? Array.isArray(localSorter.field) ?
                                localSorter.field[localSorter.field.length - 1]
                                : localSorter.field as React.Key : undefined,
                            localSorter?.order,
                            extractValuesFromFilter<SaleFilter>(localFilter),
                        );
                    },
                );
                appController.sale.handleGetSales(response);
            } catch (error) {
                console.error("Error - sales");
            }
        }, [makeRequest]);

    return { fetchSales, isGetSalesLoading: isLoading };
};
