import { ISales } from "../entities/sales.interface";

export interface CustomerResponse {
    sales: ISales[];
    page: number;
    total: number;
}
