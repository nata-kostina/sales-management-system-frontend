import { AxiosResponse } from "axios";
import { $api } from "../api";
import { IGetBrandsResponse } from "../models/response/IGetBrandsResponse";
import { IGetBrandList } from "../models/response/IGetBrandList";

export class BrandService {
    private baseUrl: string;

    public constructor(url: string) {
        this.baseUrl = url;
        this.getBrands = this.getBrands.bind(this);
    }

    public async getBrands(): Promise<AxiosResponse<IGetBrandsResponse>> {
        return $api.get(`${this.baseUrl}/`);
    }

    public async getBrandList(): Promise<AxiosResponse<IGetBrandList>> {
        return $api.get(`${this.baseUrl}/list/`);
    }
}
