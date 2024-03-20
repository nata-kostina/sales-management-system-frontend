import { AxiosResponse } from "axios";
import { Key } from "react";
import { $api } from "../api";
import { IAddSaleResponse, IDeleteSaleResponse, IEditSaleResponse, IGetSaleFormOptionsResponse, IGetSaleResponse, IGetSalesResponse } from "../models/responses/sales.response";
import { IAddSalePayload, IDeleteSalePayload, IEditSalePayload, IGetSalePayload } from "../models/requests/sale.request";

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

    public async deleteSale(payload: IDeleteSalePayload): Promise<AxiosResponse<IDeleteSaleResponse>> {
        return $api.delete(`${this.baseUrl}/`, { data: payload });
    }
}
