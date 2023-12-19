import { ISales } from "../sales.interface";

export interface CustomerResponse {
    sales: ISales[];
    page: number;
    total: number;
}
