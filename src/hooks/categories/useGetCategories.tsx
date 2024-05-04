import { SorterResult } from "antd/es/table/interface";
import { useCallback } from "react";
import { appController } from "../../controllers";
import { ICategory } from "../../models/entities/category.interface";
import { appService } from "../../services";
import { CategoryFilter, TableFilter } from "../../types/filters";
import { FetchItems } from "../../types/functions";
import { itemsPerPageDefault } from "../../utils/constants";
import { extractValuesFromFilter } from "../../utils/helper";
import { useFetch } from "../shared/useFetch";
import { IGetCategoriesResponse } from "../../models/responses/category.response";

export const useGetCategories = (): { fetchCategories: FetchItems<ICategory, CategoryFilter>; isGetCategoriesLoading: boolean; } => {
    const { isLoading, makeRequest } = useFetch<IGetCategoriesResponse>(true);

    const fetchCategories: FetchItems<ICategory, CategoryFilter> = useCallback(
        async (
            CategoriesPage = 1,
            CategoriesPerPage = itemsPerPageDefault,
            localSorter?: SorterResult<ICategory>,
            localFilter?: TableFilter<CategoryFilter>,
        ) => {
            try {
                const response = await makeRequest(
                    () => {
                        return appService.category.getCategories(
                            CategoriesPage,
                            CategoriesPerPage,
                            (localSorter?.order) ? localSorter.field as React.Key : undefined,
                            localSorter?.order,
                            extractValuesFromFilter<CategoryFilter>(localFilter),
                        );
                    },
                );
                appController.category.handleGetCategories(response);
            } catch (error) {
                console.error("Error - categories");
            }
        }, [makeRequest]);

    return { fetchCategories, isGetCategoriesLoading: isLoading };
};
