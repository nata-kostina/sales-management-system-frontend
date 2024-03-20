import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { itemsPerPageDefault } from "../../utils/constants";
import { ISale } from "../../models/entities/sale.interface";

interface SaleState {
    sales: ISale[];
    total: number;
    page: number;
    perPage: number;
}

const initialState: SaleState = {
    sales: [],
    total: 0,
    page: 1,
    perPage: itemsPerPageDefault,
};

const saleSlice = createSlice({
    name: "sale",
    initialState,
    reducers: {
        setSales: (state, action: PayloadAction<ISale[]>) => {
            state.sales = action.payload;
        },
        setSalesTotal: (state, action: PayloadAction<number>) => {
            state.total = action.payload;
        },
        setSalesPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setSalesPerPage: (state, action: PayloadAction<number>) => {
            state.perPage = action.payload;
        },
    },
});

export const { setSales, setSalesPage, setSalesPerPage, setSalesTotal } =
    saleSlice.actions;
export const saleReducer = saleSlice.reducer;
