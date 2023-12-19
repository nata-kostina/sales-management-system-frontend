import { ProductResponse } from "../models/response/ProductResponse";
import { setProducts, setProductsTotal } from "../store/slices/product.slice";
import { store } from "../store/store";

export class ProductController {
    public handleGetProducts(data: ProductResponse): void {
        store.dispatch(setProducts(data.products));
        store.dispatch(setProductsTotal(data.total));
    }
}
