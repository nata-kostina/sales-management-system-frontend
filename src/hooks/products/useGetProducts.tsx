import { SorterResult } from "antd/es/table/interface";
import { useCallback } from "react";
import { appController } from "../../controllers";
import { IProduct } from "../../models/entities/product.interface";
import { IGetProductsResponse } from "../../models/responses/products.response";
import { appService } from "../../services";
import { ProductFilter, TableFilter } from "../../types/filters";
import { FetchItems } from "../../types/functions";
import { itemsPerPageDefault } from "../../utils/constants";
import { extractValuesFromFilter } from "../../utils/helper";
import { useFetch } from "../shared/useFetch";

export const useGetProducts = (): { fetchProducts: FetchItems<IProduct, ProductFilter>; isGetProductsLoading: boolean; } => {
    const { isLoading, makeRequest } = useFetch<IGetProductsResponse>(true);

    const fetchProducts: FetchItems<IProduct, ProductFilter> = useCallback(
        async (
            page = 1,
            perPage = itemsPerPageDefault,
            sorter?: SorterResult<IProduct>,
            filter?: TableFilter<ProductFilter>,
        ) => {
            try {
                const response = await makeRequest(
                    () => {
                        return appService.product.getProducts(
                            page,
                            perPage,
                            (sorter?.order) ? sorter.field as React.Key : undefined,
                            sorter?.order,
                            extractValuesFromFilter<ProductFilter>(filter),
                        );
                    },
                );
                appController.product.handleGetProducts(response);
            } catch (error) {
                console.error("Error - products");
            }
        }, [makeRequest]);

    return { fetchProducts, isGetProductsLoading: isLoading };
};
