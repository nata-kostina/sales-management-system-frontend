import { IBrand } from "../entities/brand.interface";

export interface IGetBrandList {
    brands: Pick<IBrand, "id" | "name">[];
}

export interface IGetBrandsResponse {
    brands: IBrand[];
}
