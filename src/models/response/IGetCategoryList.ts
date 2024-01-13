import { ICategory } from "../category.interface";

export interface IGetCategoryList {
    categories: Pick<ICategory, "id" | "name">[];
}
