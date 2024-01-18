import { AxiosResponse } from "axios";
import { Key } from "react";
import { $api } from "../api";
import {
    IAddCategoryResponse,
    IDeleteCategoryResponse,
    IEditCategoryResponse,
    IGetCategoriesResponse,
    IGetCategoryList,
    IGetCategoryResponse,
} from "../models/responses/category.response";
import {
    IAddCategoryPayload,
    IDeleteCategoryPayload,
    IEditCategoryPayload,
    IGetCategoryPayload,
} from "../models/requests/category.request";

export class CategoryService {
    private baseUrl: string;

    public constructor(url: string) {
        this.baseUrl = url;
    }

    public async getCategoryList(): Promise<AxiosResponse<IGetCategoryList>> {
        return $api.get(`${this.baseUrl}/list/`);
    }

    public async getCategories(
        page = 1,
        perPage = 1,
        sort?: Key,
        order?: "ascend" | "descend" | null,
    ): Promise<AxiosResponse<IGetCategoriesResponse>> {
        return $api.get(`${this.baseUrl}/`, {
            params: {
                page: page - 1,
                perPage,
                sort,
                order,
            },
        });
    }

    public async deleteCategory(payload: IDeleteCategoryPayload): Promise<AxiosResponse<IDeleteCategoryResponse>> {
        return $api.delete(`${this.baseUrl}/`, { data: payload });
    }

    public async addCategory(payload: IAddCategoryPayload): Promise<AxiosResponse<IAddCategoryResponse>> {
        return $api.post(`${this.baseUrl}/add`, payload);
    }

    public async getCategory(payload: IGetCategoryPayload): Promise<AxiosResponse<IGetCategoryResponse>> {
        return $api.get(`${this.baseUrl}/${payload.id}`);
    }

    public async editProduct(payload: IEditCategoryPayload): Promise<AxiosResponse<IEditCategoryResponse>> {
        return $api.put(`${this.baseUrl}/${payload.id}/edit`, payload.category);
    }
}
