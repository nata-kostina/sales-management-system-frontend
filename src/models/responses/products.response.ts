import { IBrand } from "../entities/brand.interface";
import { ICategory } from "../entities/category.interface";
import { IImage } from "../entities/image.interface";
import { IProduct } from "../entities/product.interface";
import { IUnit } from "../entities/unit.interface";

export interface IGetProductsResponse {
    products: IProduct[];
    page: number;
    total: number;
}

export type IAddProductResponse = {
    product: IProduct;
};

export type IDeleteProductResponse = void;

export interface IGetProductResponse {
    product: IProduct;
}

export type IEditProductResponse = IGetProductResponse;

export interface IGetProductsFormOptionsResponse {
    brands: IBrand[];
    units: IUnit[];
    categories: ICategory[];
}

export interface IListProduct {
    id: string;
    name: string;
    image: IImage | null;
}

export interface IGetProductsListResponse {
    products: IListProduct[];
}
