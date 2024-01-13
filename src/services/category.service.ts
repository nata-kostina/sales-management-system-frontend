import { AxiosResponse } from "axios";
import { IGetCategoryList } from "../models/response/IGetCategoryList";
import { $api } from "../api";

export class CategoryService {
    private baseUrl: string;

    public constructor(url: string) {
        this.baseUrl = url;
        this.getCategoryList = this.getCategoryList.bind(this);
    }

    public async getCategoryList(): Promise<AxiosResponse<IGetCategoryList>> {
        return $api.get(`${this.baseUrl}/list/`);
    }
}
