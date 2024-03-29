import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./slices/product.slice";
import { authReducer } from "./slices/auth.slice";
import { uiReducer } from "./slices/ui.slice";
import { categoryReducer } from "./slices/category.slice";
import { customerReducer } from "./slices/customer.slice";
import { saleReducer } from "./slices/sale.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        category: categoryReducer,
        customer: customerReducer,
        sale: saleReducer,
        ui: uiReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
