import { AxiosResponse } from "axios";
import { Key } from "react";
import { $api } from "../api";
import {
    IAddProductPayload,
    IDeleteProductPayload,
    IEditProductPayload,
    IGetProductPayload,
} from "../models/requests/product.request";
import {
    IGetProductsResponse,
    IGetProductResponse,
    IGetProductsFormOptionsResponse,
    IEditProductResponse,
    IAddProductResponse,
    IDeleteProductResponse,
    IGetProductsListResponse,
} from "../models/responses/products.response";

export class ProductService {
    private baseUrl: string;

    public constructor(url: string) {
        this.baseUrl = url;
    }

    public async getProducts(
        page = 1,
        perPage = 1,
        sort?: Key,
        order?: "ascend" | "descend" | null,
        filter?: Record<string, string>,
    ): Promise<AxiosResponse<IGetProductsResponse>> {
        return $api.get(`${this.baseUrl}/`, {
            params: {
                page: page - 1,
                perPage,
                sort,
                order,
                ...filter,
            },
        });
    }

    public async getProduct(
        payload: IGetProductPayload,
    ): Promise<AxiosResponse<IGetProductResponse>> {
        return $api.get(`${this.baseUrl}/${payload.id}`);
    }

    public async getProductsFormOptions(): Promise<AxiosResponse<IGetProductsFormOptionsResponse>> {
        return $api.get(`${this.baseUrl}/form-options/list`);
    }

    public async editProduct(payload: IEditProductPayload): Promise<AxiosResponse<IEditProductResponse>> {
        return $api.put(`${this.baseUrl}/${payload.id}/edit`, payload.product);
    }

    public async addProduct(payload: IAddProductPayload): Promise<AxiosResponse<IAddProductResponse>> {
        return $api.post(`${this.baseUrl}/add`, payload);
    }

    public async deleteProduct(payload: IDeleteProductPayload): Promise<AxiosResponse<IDeleteProductResponse>> {
        return $api.delete(`${this.baseUrl}/`, { data: payload });
    }

    public async getProductsList(payload: string): Promise<AxiosResponse<IGetProductsListResponse>> {
        return $api.get(`${this.baseUrl}/list/`, { params: { name: payload } });
    }
}
