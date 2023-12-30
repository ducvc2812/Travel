import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        accessToken: null,
        refreshToken: null,
    },
    reducers: {
        login: (state, action: PayloadAction<any>) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        },
        logout: (state) => {
        state.user = null;
        state.accessToken = null;
        state.refreshToken = null;
        },
    },
    });
export const { login, logout } = authSlice.actions;