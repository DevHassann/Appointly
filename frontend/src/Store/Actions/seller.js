import { server } from "../../server";
import {
    loadSellerFail,
    loadSellerRequest,
    loadSellerSuccess,
    getAllSellersRequest,
    getAllSellersSuccess,
    getAllSellersFailed,
    getAnySellerRequest,
    getAnySellerSuccess,
    getAnySellerFailed,
} from "../Reducers/seller";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Load Seller Data
export const loadSeller = (userId) => async (dispatch) => {
    try {
        dispatch(loadSellerRequest());
        const { data } = await axios.get(`${server}/seller/get-seller/${userId}`, {
            withCredentials: true,
        });
        dispatch(loadSellerSuccess(data.data));
    } catch (error) {
        dispatch(loadSellerFail(error.response.data.message));
    }
};

// Get All Sellers Data
export const getAllSellers = () => async (dispatch) => {
    try {
        dispatch(getAllSellersRequest());
        const { data } = await axios.get(`${server}/seller/get-all-sellers`, {
            withCredentials: true,
        });
        dispatch(getAllSellersSuccess(data.sellers));
    } catch (error) {
        dispatch(getAllSellersFailed(error.response.data.message));
    }
};

// Create an async thunk for getAnySeller
export const getAnySeller = createAsyncThunk(
    "seller/getAnySeller",
    async (sellerId, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${server}/seller/get-any-seller/${sellerId}`,
                { withCredentials: true }
            );
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// Create a separate action to dispatch the getAnySeller async thunk
export const fetchAnySeller = (sellerId) => async (dispatch) => {
    try {
        dispatch(getAnySellerRequest());
        const specificSeller = await dispatch(getAnySeller(sellerId));
        dispatch(getAnySellerSuccess(specificSeller.payload));
    } catch (error) {
        dispatch(getAnySellerFailed(error.payload));
    }
};