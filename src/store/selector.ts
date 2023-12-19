import { RootState } from "./store";

export const selectIsAuth = (state: RootState): boolean => state.auth.isAuth;
export const selectProductsTotal = (state: RootState): number =>
    state.product.total;
export const selectIsLoading = (state: RootState): boolean => state.ui.isLoading;
