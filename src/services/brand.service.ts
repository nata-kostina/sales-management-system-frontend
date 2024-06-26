import { AxiosResponse } from "axios";
import { $api } from "../api";
import { IGetBrandsResponse } from "../models/responses/brand.response";

export class BrandService {
    private baseUrl: string;

    public constructor(url: string) {
        this.baseUrl = url;
        this.getBrands = this.getBrands.bind(this);
    }

    public async getBrands(): Promise<AxiosResponse<IGetBrandsResponse>> {
        return $api.get(`${this.baseUrl}/`);
    }
}
