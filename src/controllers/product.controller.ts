import { IGetProductsResponse } from "../models/responses/products.response";
import { setProducts, setProductsTotal, setProductsPage, setProductsPerPage } from "../store/slices/product.slice";
import { store } from "../store/store";

export class ProductController {
    public handleGetProducts(data: IGetProductsResponse): void {
        store.dispatch(setProducts(data.products));
        store.dispatch(setProductsTotal(data.total));
        store.dispatch(setProductsPage(data.page + 1));
    }

    public handlePageChange(value: number): void {
        store.dispatch(setProductsPage(value));
    }

    public handlePerPageChange(value: number): void {
        store.dispatch(setProductsPerPage(value));
    }
}
