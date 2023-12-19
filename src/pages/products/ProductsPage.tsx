import { FC, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { ProductResponse } from "../../models/response/ProductResponse";
import { useFetch } from "../../hooks/useFetch";
import { appService } from "../../services";
import { appController } from "../../controllers";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ProductTable } from "./components/ProductTable";
import { Pagination } from "../../components/Pagination";
import { setProductsPage, setProductsPerPage } from "../../store/slices/product.slice";
import { itemsPerPageDefault } from "../../utils/constants";
import { Section } from "./components/Section";
import { Routes } from "../../types/routes";
import { Preloader } from "../../components/ui/Preloader/Preloader";

export const ProductsPage: FC = () => {
    const dispatch = useAppDispatch();
    const products = useAppSelector((state) => state.product.products);
    const totalProductsNum = useAppSelector((state) => state.product.total);
    const page = useAppSelector((state) => state.product.page);
    const perPage = useAppSelector((state) => state.product.perPage);

    const { isLoading, makeRequest } = useFetch<ProductResponse>(true);
    const fetchProducts = useCallback(
        async (productsPage = 1, productsPerPage = itemsPerPageDefault) => {
            try {
                const response = await makeRequest(
                    async () => appService.products.getProducts(productsPage, productsPerPage),
                );
                appController.products.handleGetProducts(response);
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
        await fetchProducts(page, value);
        dispatch(setProductsPerPage(value));
    };
    return (
        <>
            {isLoading && <Preloader />}
            <Section title="Product List" subtitle="Manage your products" name="section-products">
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
                                <ProductTable data={products} />
                            ) : <p>No data</p>}
                        </div>
                        <div className="card__footer">
                            <Pagination
                                total={totalProductsNum}
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
