import { AxiosResponse } from "axios";
import { $api } from "../api";
import { ProductResponse } from "../models/response/ProductResponse";

export class ProductService {
    private baseUrl: string;

    public constructor(url: string) {
        this.baseUrl = url;
        this.getCustomers = this.getCustomers.bind(this);
    }

    public async getCustomers(page: number = 1, perPage: number = 10): Promise<AxiosResponse<ProductResponse>> {
        return $api.get<ProductResponse>(`${this.baseUrl}/`, {
            params: {
                page,
                perPage
            }
        });
    }
}