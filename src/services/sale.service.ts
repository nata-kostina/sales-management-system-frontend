import { AxiosResponse } from "axios";
import { Key } from "react";
import { $api } from "../api";
import {
    IAddSaleResponse,
    IEditSaleResponse,
    IGetSaleFormOptionsResponse,
    IGetSaleResponse,
    IGetSalesResponse,
} from "../models/responses/sales.response";
import {
    IAddSalePayload,
    IEditSalePayload,
    IGetSalePayload,
} from "../models/requests/sale.request";
import { IDeletePayload, IGetCsvPayload } from "../models/requests/shared.request";

export class SaleService {
    private baseUrl: string;

    public constructor(url: string) {
        this.baseUrl = url;
    }

    public async getSales(
        page = 1,
        perPage = 1,
        sort?: Key,
        order?: "ascend" | "descend" | null,
        filter?: Record<string, string | null>,
    ): Promise<AxiosResponse<IGetSalesResponse>> {
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

    public async getSale(
        payload: IGetSalePayload,
    ): Promise<AxiosResponse<IGetSaleResponse>> {
        return $api.get(`${this.baseUrl}/${payload.id}`);
    }

    public async getSaleFormOptions(): Promise<AxiosResponse<IGetSaleFormOptionsResponse>> {
        return $api.get(`${this.baseUrl}/form-options/list`);
    }

    public async editSale(payload: IEditSalePayload): Promise<AxiosResponse<IEditSaleResponse>> {
        return $api.put(`${this.baseUrl}/${payload.id}/edit`, payload.sale);
    }

    public async addSale(payload: IAddSalePayload): Promise<AxiosResponse<IAddSaleResponse>> {
        return $api.post(`${this.baseUrl}/add`, payload);
    }

    public async delete(payload: IDeletePayload): Promise<AxiosResponse<void>> {
        return $api.delete(`${this.baseUrl}/`, { data: payload });
    }

    public async getCsv(payload: IGetCsvPayload): Promise<AxiosResponse<Blob>> {
        return $api.post(`${this.baseUrl}/get-csv`, payload, { responseType: "blob" });
    }
}
