import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { itemsPerPageDefault } from "../../utils/constants";
import { IProduct } from "../../models/entities/product.interface";

interface ProductState {
    products: IProduct[];
    total: number;
    page: number;
    perPage: number;
}

const initialState: ProductState = {
    products: [],
    total: 0,
    page: 1,
    perPage: itemsPerPageDefault,
};

const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<IProduct[]>) => {
            state.products = action.payload;
        },
        setProductsTotal: (state, action: PayloadAction<number>) => {
            state.total = action.payload;
        },
        setProductsPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setProductsPerPage: (state, action: PayloadAction<number>) => {
            state.perPage = action.payload;
        },
    },
});

export const { setProducts, setProductsPage, setProductsPerPage, setProductsTotal } =
    productSlice.actions;
export const productReducer = productSlice.reducer;

// export const selectIsAuth = (state: RootState) => state.auth.isAuth;
