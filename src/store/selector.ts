import { RootState } from "./store";

export const selectIsAuth = (state: RootState): boolean => state.auth.isAuth;
export const selectProductsTotal = (state: RootState): number =>
    state.product.total;
export const selectBp = (state: RootState): string => state.ui.bp;
export const selectIsSidebarExpanded = (state: RootState): boolean => state.ui.isSidebarExpanded;
