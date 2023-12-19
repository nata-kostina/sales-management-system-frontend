import { IBrand } from "../brand.interface";
import { ICategory } from "../category.interface";
import { IUnit } from "../unit.interface";

export interface IGetProductsFormOptionsResponse {
    brands: IBrand[];
    units: IUnit[];
    categories: ICategory[];
}
