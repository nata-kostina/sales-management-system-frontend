import { IProduct } from "../product.interface";

export interface ProductResponse {
    products: IProduct[];
    page: number;
    total: number;
}
