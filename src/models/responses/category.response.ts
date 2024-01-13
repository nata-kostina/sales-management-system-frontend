import { ICategory } from "../entities/category.interface";

export interface IGetCategoriesResponse {
    categories: ICategory[];
    page: number;
    total: number;
}
export interface IGetCategoryList {
    categories: Pick<ICategory, "id" | "name">[];
}

export type IDeleteCategoryResponse = void;

export type IAddCategoryResponse = {
    category: ICategory;
};

export interface IGetCategoryResponse {
    category: ICategory;
}

export type IEditCategoryResponse = IGetCategoryResponse;
