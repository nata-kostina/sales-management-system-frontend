import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { breakpoints, getBreakpoint } from "../../utils/helper";

interface UIState {
    bp: string;
    isSidebarExpanded: boolean;
}
const initialBp = getBreakpoint();
const initialState: UIState = {
    bp: initialBp,
    isSidebarExpanded: !(initialBp === breakpoints.Ms || initialBp === breakpoints.S),
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setBp(state, action: PayloadAction<string>) {
            state.bp = action.payload;
        },
        setIsSidebarExpanded(state, action: PayloadAction<boolean>) {
            state.isSidebarExpanded = action.payload;
        },
    },
});

export const { setBp, setIsSidebarExpanded } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
