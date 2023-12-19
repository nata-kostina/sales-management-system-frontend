import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface UIState {
    isLoading: boolean;
}

const initialState: UIState = {
    isLoading: false,
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        setGlobalIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
    },
});

export const { setGlobalIsLoading } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
