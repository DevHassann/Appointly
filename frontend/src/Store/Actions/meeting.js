import axios from "axios";
import {
    getAllMeetingsRequest,
    getAllMeetingsSuccess,
    getAllMeetingsFailure,
    getUserMeetingsRequest,
    getUserMeetingsSuccess,
    getUserMeetingsFailure,
    getSellerMeetingsRequest,
    getSellerMeetingsSuccess,
    getSellerMeetingsFailure,
    clearMeetingErrors,
} from "../Reducers/meeting";
import { server } from "../../server";

// Get All Meetings
export const getAllMeetings = () => async (dispatch) => {
    try {
        dispatch(getAllMeetingsRequest());
        const { data } = await axios.get(`${server}/meeting/get-all-meetings`);
        dispatch(getAllMeetingsSuccess(data.data.meetings));
    } catch (error) {
        dispatch(getAllMeetingsFailure(error.message));
    }
};

// Get User Meetings
export const getUserMeetings = (userId) => async (dispatch) => {
    try {
        dispatch(getUserMeetingsRequest());
        const { data } = await axios.get(`${server}/meeting/get-all-user-meetings/${userId}`);
        dispatch(getUserMeetingsSuccess(data.data.meetings));
    } catch (error) {
        dispatch(getUserMeetingsFailure(error.message));
    }
};

// Get Seller Meetings
export const getSellerMeetings = (sellerId) => async (dispatch) => {
    try {
        dispatch(getSellerMeetingsRequest());
        const { data } = await axios.get(`${server}/meeting/get-all-seller-meetings/${sellerId}`);
        dispatch(getSellerMeetingsSuccess(data.data.meetings));
    } catch (error) {
        dispatch(getSellerMeetingsFailure(error.message));
    }
};

// Clear Meeting Errors
export const clearErrors = () => (dispatch) => {
    dispatch(clearMeetingErrors());
};
