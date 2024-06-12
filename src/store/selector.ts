import { RootState } from "./store";

export const selectIsAuth = (state: RootState): boolean => state.auth.isAuth;
export const selectBp = (state: RootState): string => state.ui.bp;
export const selectIsSidebarExpanded = (state: RootState): boolean => state.ui.isSidebarExpanded;
