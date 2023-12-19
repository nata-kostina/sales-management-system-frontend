import { ICategory } from "../category.interface";

export interface CustomerResponse {
    categories: ICategory[];
    page: number;
    total: number;
}
