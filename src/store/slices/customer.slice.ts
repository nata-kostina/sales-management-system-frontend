import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { itemsPerPageDefault } from "../../utils/constants";
import { ICustomer } from "../../models/entities/customer.interface";

interface CustomerState {
    customers: ICustomer[];
    total: number;
    page: number;
    perPage: number;
}

const initialState: CustomerState = {
    customers: [],
    total: 0,
    page: 1,
    perPage: itemsPerPageDefault,
};

const customerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {
        setCustomers: (state, action: PayloadAction<ICustomer[]>) => {
            state.customers = action.payload;
        },
        setCustomersTotal: (state, action: PayloadAction<number>) => {
            state.total = action.payload;
        },
        setCustomersPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setCustomersPerPage: (state, action: PayloadAction<number>) => {
            state.perPage = action.payload;
        },
    },
});

export const { setCustomers, setCustomersPage, setCustomersPerPage, setCustomersTotal } =
    customerSlice.actions;
export const customerReducer = customerSlice.reducer;
