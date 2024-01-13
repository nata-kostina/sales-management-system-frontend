import { IBrand } from "../brand.interface";

export interface IGetBrandList {
    brands: Pick<IBrand, "id" | "name">[];
}
