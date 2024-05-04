import { SorterResult } from "antd/es/table/interface";
import { useCallback } from "react";
import { appController } from "../../controllers";
import { ICustomer } from "../../models/entities/customer.interface";
import { appService } from "../../services";
import { CustomerFilter, TableFilter } from "../../types/filters";
import { FetchItems } from "../../types/functions";
import { itemsPerPageDefault } from "../../utils/constants";
import { extractValuesFromFilter } from "../../utils/helper";
import { useFetch } from "../shared/useFetch";
import { IGetCustomersResponse } from "../../models/responses/customer.response";

export const useGetCustomers = (): { fetchCustomers: FetchItems<ICustomer, CustomerFilter>; isGetCustomersLoading: boolean; } => {
    const { isLoading, makeRequest } = useFetch<IGetCustomersResponse>(true);

    const fetchCustomers: FetchItems<ICustomer, CustomerFilter> = useCallback(
        async (
            CustomersPage = 1,
            CustomersPerPage = itemsPerPageDefault,
            localSorter?: SorterResult<ICustomer>,
            localFilter?: TableFilter<CustomerFilter>,
        ) => {
            try {
                const response = await makeRequest(
                    () => {
                        return appService.customer.getCustomers(
                            CustomersPage,
                            CustomersPerPage,
                            (localSorter?.order) ? localSorter.field as React.Key : undefined,
                            localSorter?.order,
                            extractValuesFromFilter<CustomerFilter>(localFilter),
                        );
                    },
                );
                appController.customer.handleGetCustomers(response);
            } catch (error) {
                console.error("Error - customers");
            }
        }, [makeRequest]);

    return { fetchCustomers, isGetCustomersLoading: isLoading };
};
