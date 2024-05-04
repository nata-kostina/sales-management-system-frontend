import { IGetCategoriesResponse } from "../models/responses/category.response";
import {
    setCategories,
    setCategoriesPage,
    setCategoriesPerPage,
    setCategoriesTotal,
} from "../store/slices/category.slice";
import { store } from "../store/store";

export class CategoryController {
    public handleGetCategories(data: IGetCategoriesResponse): void {
        store.dispatch(setCategories(data.categories));
        store.dispatch(setCategoriesTotal(data.total));
        store.dispatch(setCategoriesPage(data.page + 1));
    }

    public handlePageChange(value: number): void {
        store.dispatch(setCategoriesPage(value));
    }

    public handlePerPageChange(value: number): void {
        store.dispatch(setCategoriesPerPage(value));
    }
}
