import { ICustomer } from "../entities/customer.interface";

export interface IGetCustomersResponse {
    customers: ICustomer[];
    page: number;
    total: number;
}

export type IAddCustomerResponse = {
    customer: ICustomer;
};

export type IDeleteCustomerResponse = void;

export interface IGetCustomerResponse {
    customer: ICustomer;
}

export interface IGetCustomersListResponse {
    customers: ICustomer[];
}

export type IEditCustomerResponse = IGetCustomerResponse;
