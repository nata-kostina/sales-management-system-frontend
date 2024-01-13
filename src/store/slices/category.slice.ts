import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { itemsPerPageDefault } from "../../utils/constants";
import { ICategory } from "../../models/entities/category.interface";

interface CategoryState {
    categories: ICategory[];
    total: number;
    page: number;
    perPage: number;
}

const initialState: CategoryState = {
    categories: [],
    total: 0,
    page: 1,
    perPage: itemsPerPageDefault,
};

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategories: (state, action: PayloadAction<ICategory[]>) => {
            state.categories = action.payload;
        },
        setCategoriesTotal: (state, action: PayloadAction<number>) => {
            state.total = action.payload;
        },
        setCategoriesPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setCategoriesPerPage: (state, action: PayloadAction<number>) => {
            state.perPage = action.payload;
        },
    },
});

export const { setCategories, setCategoriesTotal, setCategoriesPage, setCategoriesPerPage } =
categorySlice.actions;
export const categoryReducer = categorySlice.reducer;

// export const selectIsAuth = (state: RootState) => state.auth.isAuth;
