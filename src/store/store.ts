import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./slices/product.slice";
import { authReducer } from "./slices/auth.slice";
import { uiReducer } from "./slices/ui.slice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        product: productReducer,
        ui: uiReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
