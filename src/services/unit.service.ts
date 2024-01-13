import { AxiosResponse } from "axios";
import { $api } from "../api";
import { IGetUnitsResponse } from "../models/response/IGetUnitsResponse";

export class UnitService {
    private baseUrl: string;

    public constructor(url: string) {
        this.baseUrl = url;
        this.getUnits = this.getUnits.bind(this);
    }

    public async getUnits(): Promise<AxiosResponse<IGetUnitsResponse>> {
        return $api.get<IGetUnitsResponse>(`${this.baseUrl}/`);
    }

    public async getUnitList(): Promise<AxiosResponse<IGetUnitsResponse>> {
        return $api.get(`${this.baseUrl}/list/`);
    }
}
