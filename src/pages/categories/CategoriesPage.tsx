import { FC, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { SorterResult } from "antd/es/table/interface";
import { useFetch } from "../../hooks/useFetch";
import { appService } from "../../services";
import { appController } from "../../controllers";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Pagination } from "../../components/Pagination/Pagination";
import { itemsPerPageDefault } from "../../utils/constants";
import { Section } from "../../components/Section/Section";
import { PreloaderPortal } from "../../components/ui/Preloader/PreloaderPortal";
import { FetchItems } from "../../types/functions";
import { ICategory } from "../../models/entities/category.interface";
import { CategoryTable } from "./components/CategoryTable";
import { IGetCategoriesResponse } from "../../models/responses/category.response";
import { setCategoriesPage, setCategoriesPerPage } from "../../store/slices/category.slice";
import { MessageService, messages } from "../../services/message.service";

export const CategoriesPage: FC = () => {
    const dispatch = useAppDispatch();
    const categories = useAppSelector((state) => state.category.categories);
    const totalItemsNum = useAppSelector((state) => state.category.total);
    const page = useAppSelector((state) => state.category.page);
    const perPage = useAppSelector((state) => state.category.perPage);

    const { isLoading, makeRequest } = useFetch<IGetCategoriesResponse>(true);
    const fetchCategories: FetchItems<ICategory> = useCallback(
        async (
            categoriesPage = 1,
            categoriesPerPage = itemsPerPageDefault,
            sorter?: SorterResult<ICategory>,
        ) => {
            try {
                const response = await makeRequest(
                    async () => {
                        return appService.categories.getCategories(
                            categoriesPage,
                            categoriesPerPage,
                            (sorter?.order) ? sorter.field as React.Key : undefined,
                            sorter?.order,
                        );
                    },
                );
                appController.category.handleGetCategories(response);
            } catch (error) {
                MessageService.error(messages.default);
            }
        }, [makeRequest]);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const handlePageChange = async (value: number) => {
        await fetchCategories(value, perPage);
        dispatch(setCategoriesPage(value));
    };

    const handlePerPageChange = async (value: number) => {
        await fetchCategories(1, value);
        dispatch(setCategoriesPerPage(value));
    };
    return (
        <>
            {isLoading && <PreloaderPortal />}
            <Section title="Category List" name="section-categories">
                <div className="card">
                    <div className="card__inner">
                        <div className="card__header">
                            <div className="section__toolbar">
                                <Link to="../categories/add" relative="path" className="btn btn-add">
                                    <span className="btn__icon">+</span>
                                    <span className="btn__text">Add category</span>
                                </Link>
                            </div>
                        </div>
                        <div className="card__body">
                            {categories ? (
                                <CategoryTable data={categories} fetchCategories={fetchCategories} />
                            ) : <p>No data</p>}
                        </div>
                        <div className="card__footer">
                            <Pagination
                                totalItemsNum={totalItemsNum}
                                perPage={perPage}
                                page={page}
                                handlePageChange={handlePageChange}
                                handlePerPageChange={handlePerPageChange}
                            />
                        </div>
                    </div>
                </div>
            </Section>
        </>
    );
};
