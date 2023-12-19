import { AxiosResponse } from "axios";
import { $api } from "../api";
import { ProductResponse } from "../models/response/ProductResponse";
import { IGetProductResponse } from "../models/response/IGetProductResponse";
import { IGetProductPayload } from "../models/request/IGetProductPayload";
import { IGetProductsFormOptionsResponse } from "../models/response/IGetProductsFormOptions";
import { IEditProductPayload } from "../models/request/IEditProductPayload";
import { IEditProductResponse } from "../models/response/IEditProductResponse";
import { IAddProductPayload } from "../models/request/IAddProductPayload";
import { IAddProductResponse } from "../models/response/IAddProductResponse";
import { IDeleteProduct } from "../models/response/IDeleteProductResponse";

export class ProductService {
    private baseUrl: string;

    public constructor(url: string) {
        this.baseUrl = url;
        this.getProducts = this.getProducts.bind(this);
    }

    public async getProducts(
        page = 1,
        perPage = 1,
    ): Promise<AxiosResponse<ProductResponse>> {
        return $api.get<ProductResponse>(`${this.baseUrl}/`, {
            params: {
                page: page - 1,
                perPage,
            },
        });
    }

    public async getProduct(
        payload: IGetProductPayload,
    ): Promise<AxiosResponse<IGetProductResponse>> {
        return $api.get<IGetProductResponse>(`${this.baseUrl}/${payload.id}`);
    }

    public async getProductsFormOptions(): Promise<AxiosResponse<IGetProductsFormOptionsResponse>> {
        return $api.get<IGetProductsFormOptionsResponse>(`${this.baseUrl}/form-options/list`);
    }

    public async editProduct(payload: IEditProductPayload): Promise<AxiosResponse<IEditProductResponse>> {
        return $api.put<IEditProductResponse>(`${this.baseUrl}/${payload.id}/edit`, payload);
    }

    public async addProduct(payload: IAddProductPayload): Promise<AxiosResponse<IAddProductResponse>> {
        return $api.post<IAddProductResponse>(`${this.baseUrl}/add`, payload);
    }

    public async deleteProduct(id: string): Promise<AxiosResponse<IDeleteProduct>> {
        return $api.delete<IDeleteProduct>(`${this.baseUrl}/${id}/delete`);
    }
}
