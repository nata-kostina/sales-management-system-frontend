import { AxiosResponse } from "axios";
import { $api } from "../api";
import { IGetStatusesResponse } from "../models/responses/saleStatuses.response";

export class SaleStatusService {
    private baseUrl: string;

    public constructor(url: string) {
        this.baseUrl = url;
        this.getStatuses = this.getStatuses.bind(this);
    }

    public async getStatuses(): Promise<AxiosResponse<IGetStatusesResponse>> {
        return $api.get(`${this.baseUrl}/`);
    }
}
