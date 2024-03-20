import { FC, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { SorterResult } from "antd/es/table/interface";
import { useFetch } from "../../hooks/useFetch";
import { appService } from "../../services";
import { appController } from "../../controllers";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ProductTable } from "./components/ProductTable";
import { Pagination } from "../../components/Pagination/Pagination";
import { setProductsPage, setProductsPerPage } from "../../store/slices/product.slice";
import { itemsPerPageDefault } from "../../utils/constants";
import { Section } from "../../components/Section/Section";
import { PreloaderPortal } from "../../components/ui/Preloader/PreloaderPortal";
import { Routes } from "../../types/routes";
import { FetchItems } from "../../types/functions";
import { IProduct } from "../../models/entities/product.interface";
import { IGetProductsResponse } from "../../models/responses/products.response";

export const ProductsPage: FC = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.product.products);
    const totalItemsNum = useAppSelector((state) => state.product.total);
    const page = useAppSelector((state) => state.product.page);
    const perPage = useAppSelector((state) => state.product.perPage);

    const { isLoading, makeRequest } = useFetch<IGetProductsResponse>(true);
    const fetchProducts: FetchItems<IProduct> = useCallback(
        async (
            productsPage = 1,
            productsPerPage = itemsPerPageDefault,
            sorter?: SorterResult<IProduct>,
            filter?: Record<string, string>,
        ) => {
            try {
                const response = await makeRequest(
                    async () => {
                        return appService.products.getProducts(
                            productsPage,
                            productsPerPage,
                            (sorter?.order) ? sorter.field as React.Key : undefined,
                            sorter?.order,
                            filter,
                        );
                    },
                );
                appController.product.handleGetProducts(response);
            } catch (error) {
                console.error("Error - Products");
            }
        }, [makeRequest]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handlePageChange = async (value: number) => {
        await fetchProducts(value, perPage);
        dispatch(setProductsPage(value));
    };

    const handlePerPageChange = async (value: number) => {
        await fetchProducts(1, value);
        dispatch(setProductsPerPage(value));
    };
    return (
        <>
            {isLoading && <PreloaderPortal />}
            <Section title="Product List" name="section-products">
                <div className="card">
                    <div className="card__inner">
                        <div className="card__header">
                            <div className="section__toolbar">
                                <Link to={`../${Routes.AddProduct}`} relative="route" className="btn btn-add">
                                    <span className="btn__icon">+</span>
                                    <span className="btn__text">Add product</span>
                                </Link>
                            </div>
                        </div>
                        <div className="card__body">
                            {products ? (
                                <ProductTable data={products} fetchProducts={fetchProducts} />
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
