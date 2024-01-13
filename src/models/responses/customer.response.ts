import { ICustomer } from "../entities/customer.interface";

export interface CustomerResponse {
    customers: ICustomer[];
    page: number;
    total: number;
}
