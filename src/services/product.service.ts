import { AxiosResponse } from "axios";
import { Key } from "react";
import { $api } from "../api";
import {
    IAddProductPayload,
    IEditProductPayload,
    IGetProductPayload,
} from "../models/requests/product.request";
import {
    IGetProductsResponse,
    IGetProductResponse,
    IGetProductsFormOptionsResponse,
    IEditProductResponse,
    IAddProductResponse,
    IGetProductsListResponse,
} from "../models/responses/products.response";
import { IDeletePayload, IGetCsvPayload } from "../models/requests/shared.request";

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

    public async delete(payload: IDeletePayload): Promise<AxiosResponse<void>> {
        return $api.delete(`${this.baseUrl}/`, { data: payload });
    }

    public async getProductsList(payload: string): Promise<AxiosResponse<IGetProductsListResponse>> {
        return $api.get(`${this.baseUrl}/list/`, { params: { name: payload } });
    }

    public async getCsv(payload: IGetCsvPayload): Promise<AxiosResponse<Blob>> {
        return $api.post(`${this.baseUrl}/get-csv`, payload, { responseType: "blob" });
    }
}
