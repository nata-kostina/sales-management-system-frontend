import { AxiosResponse } from "axios";
import { Key } from "react";
import { $api } from "../api";
import {
    IGetCustomerPayload,
    IEditCustomerPayload,
    IAddCustomerPayload,
} from "../models/requests/customer.request";
import {
    IGetCustomersResponse,
    IGetCustomerResponse,
    IEditCustomerResponse,
    IAddCustomerResponse,
    IGetCustomersListResponse,
} from "../models/responses/customer.response";
import { IDeletePayload, IGetCsvPayload } from "../models/requests/shared.request";

export class CustomerService {
    private baseUrl: string;

    public constructor(url: string) {
        this.baseUrl = url;
    }

    public async getCustomers(
        page = 1,
        perPage = 1,
        sort?: Key,
        order?: "ascend" | "descend" | null,
        filter?: Record<string, string>,
    ): Promise<AxiosResponse<IGetCustomersResponse>> {
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

    public async getCustomer(
        payload: IGetCustomerPayload,
    ): Promise<AxiosResponse<IGetCustomerResponse>> {
        return $api.get(`${this.baseUrl}/${payload.id}/`);
    }

    public async editCustomer(payload: IEditCustomerPayload): Promise<AxiosResponse<IEditCustomerResponse>> {
        return $api.put(`${this.baseUrl}/${payload.id}/edit/`, payload.customer);
    }

    public async addCustomer(payload: IAddCustomerPayload): Promise<AxiosResponse<IAddCustomerResponse>> {
        return $api.post(`${this.baseUrl}/add/`, payload);
    }

    public async delete(payload: IDeletePayload): Promise<AxiosResponse<void>> {
        return $api.delete(`${this.baseUrl}/`, { data: payload });
    }

    public async getCustomersList(payload: string): Promise<AxiosResponse<IGetCustomersListResponse>> {
        return $api.get(`${this.baseUrl}/list/`, { params: { name: payload } });
    }

    public async getCsv(payload: IGetCsvPayload): Promise<AxiosResponse<Blob>> {
        return $api.post(`${this.baseUrl}/get-csv`, payload, { responseType: "blob" });
    }
}
