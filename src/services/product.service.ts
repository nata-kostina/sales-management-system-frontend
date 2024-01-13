import { AxiosResponse } from "axios";
import { Key } from "react";
import { $api } from "../api";
import { IGetProductResponse } from "../models/response/IGetProductResponse";
import { IGetProductPayload } from "../models/request/IGetProductPayload";
import { IGetProductsFormOptionsResponse } from "../models/response/IGetProductsFormOptions";
import { IEditProductPayload } from "../models/request/IEditProductPayload";
import { IEditProductResponse } from "../models/response/IEditProductResponse";
import { IAddProductPayload } from "../models/request/IAddProductPayload";
import { IAddProductResponse } from "../models/response/IAddProductResponse";
import { IDeleteProductResponse } from "../models/response/IDeleteProductResponse";
import { IGetProductsResponse } from "../models/response/ProductResponse";
import { IDeleteProductPayload } from "../models/request/IDeleteProductPayload";

export class ProductService {
    private baseUrl: string;

    public constructor(url: string) {
        this.baseUrl = url;
        this.getProducts = this.getProducts.bind(this);
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
}
