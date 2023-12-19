import { ICustomer } from "../customer.interface";

export interface CustomerResponse {
    customers: ICustomer[];
    page: number;
    total: number;
}
