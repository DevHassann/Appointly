import { createSlice } from "@reduxjs/toolkit";
import { getAnySeller } from "../Actions/seller";

const initialState = {
    isAuthenticated: false,
    loading: false,
    seller: null,
    specificSeller: null,
    error: null,
    successMessage: null,
    isSeller: false,
    allSellers: [],
};

const sellerSlice = createSlice({
    name: "seller",
    initialState,
    reducers: {
        loadSellerRequest: (state) => {
            state.loading = true;
        },
        loadSellerSuccess: (state, action) => {
            state.isAuthenticated = true;
            state.loading = false;
            state.seller = action.payload;
            state.isSeller = true;
        },
        loadSellerFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.isAuthenticated = false;
            state.isSeller = false;
        },
        // Get All Sellers
        getAllSellersRequest: (state) => {
            state.loading = true;
        },
        getAllSellersSuccess: (state, action) => {
            state.loading = false;
            state.allSellers = action.payload;
        },
        getAllSellersFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Get Any Seller
        getAnySellerRequest: (state) => {
            state.loading = true;
        },
        getAnySellerSuccess: (state, action) => {
            state.loading = false;
            state.specificSeller = action.payload;
        },
        getAnySellerFailed: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.specificSeller = null;
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
            .addCase(getAnySeller.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAnySeller.fulfilled, (state, action) => {
                state.loading = false;
                state.specificSeller = action.payload;
                state.error = null;
            })
            .addCase(getAnySeller.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.specificSeller = null;
            });
    },
});

export const {
    loadSellerRequest,
    loadSellerSuccess,
    loadSellerFail,
    getAllSellersRequest,
    getAllSellersSuccess,
    getAllSellersFailed,
    getAnySellerRequest,
    getAnySellerSuccess,
    getAnySellerFailed,
    clearErrors,
    clearMessages,
} = sellerSlice.actions;

export default sellerSlice.reducer;
