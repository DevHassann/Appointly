import { createSlice } from "@reduxjs/toolkit";
import { getAnyUser } from "../Actions/user";

const initialState = {
    isAuthenticated: false,
    loading: false,
    user: null,
    specificUser: null,
    error: null,
    successMessage: null,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loadUserRequest: (state) => {
            state.loading = true;
        },
        loadUserSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.loading = false;
            state.user = action.payload;
        },
        loadUserFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
        },

        // Get Any User By ID
        getAnyUserRequest: (state) => {
            state.loading = true;
        },
        getAnyUserSuccess: (state, action) => {
            state.loading = false;
            state.specificUser = action.payload;
        },
        getAnyUserFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.specificUser = null;
        },

        // Update User Info
        updateUserInfoRequest: (state) => {
            state.loading = true;
        },
        updateUserInfoSuccess: (state, action) => {
            state.loading = false;
            state.user = action.payload;
        },
        updateUserInfoFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
        clearMessages: (state) => {
            state.successMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAnyUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAnyUser.fulfilled, (state, action) => {
                state.loading = false;
                state.specificUser = action.payload;
                state.error = null;
            })
            .addCase(getAnyUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.specificUser = null;
            });
    },
});

export const {
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    getAnyUserRequest,
    getAnyUserSuccess,
    getAnyUserFailed,
    updateUserInfoRequest,
    updateUserInfoSuccess,
    updateUserInfoFailed,
    clearErrors,
    clearMessages,
} = userSlice.actions;

export default userSlice.reducer;
