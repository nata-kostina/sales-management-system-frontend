import { IProduct } from "../product.interface";

export interface IGetProductsResponse {
    products: IProduct[];
    page: number;
    total: number;
}
