import { server } from "../../server";
import {
    loadUserRequest,
    loadUserSuccess,
    loadUserFail,
    getAnyUserRequest,
    getAnyUserSuccess,
    getAnyUserFailed,
    updateUserInfoRequest,
    updateUserInfoSuccess,
    updateUserInfoFailed
} from "../Reducers/user";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Update User Info
export const updateUserInformation = (email, username, dateOfBirth, name, phoneNumber) => async (dispatch) => {
    try {
        dispatch(updateUserInfoRequest());

        const { data } = await axios.put(
            `${server}/user/update-user-info`,
            {
                email,
                username,
                dateOfBirth,
                name,
                phoneNumber
            },
            {
                withCredentials: true,
                headers: {
                    "Access-Control-Allow-Credentials": true,
                },
            }
        );

        dispatch(updateUserInfoSuccess(data.user));
    } catch (error) {
        dispatch(updateUserInfoFailed(error.response.data.message));
    }
};

// Load User Data
export const loadUser = () => async (dispatch) => {
    try {
        dispatch(loadUserRequest());
        const { data } = await axios.get(`${server}/user/get-user`, {
            withCredentials: true,
        });
        dispatch(loadUserSuccess(data.user));
    } catch (error) {
        dispatch(loadUserFail(error.response.data.message));
    }
};

// Get Any User
export const getAnyUser = createAsyncThunk(
    "user/getAnyUser",
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `${server}/user/get-any-user/${userId}`,
                { withCredentials: true }
            );
            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

// Fetch Any User
export const fetchAnyUser = (userId) => async (dispatch) => {
    try {
        dispatch(getAnyUserRequest());
        const specificUser = await dispatch(getAnyUser(userId));
        dispatch(getAnyUserSuccess(specificUser.payload));
    } catch (error) {
        dispatch(getAnyUserFailed(error.payload));
    }
};
