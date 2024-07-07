import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allMeetings: [],
    userMeetings: [],
    sellerMeetings: [],
    loading: false,
    error: null,
};

const meetingSlice = createSlice({
    name: "meeting",
    initialState,
    reducers: {
        // Fetch All Meetings
        getAllMeetingsRequest: (state) => {
            state.loading = true;
        },
        getAllMeetingsSuccess: (state, action) => {
            state.loading = false;
            state.allMeetings = action.payload;
        },
        getAllMeetingsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Fetch User Meetings
        getUserMeetingsRequest: (state) => {
            state.loading = true;
        },
        getUserMeetingsSuccess: (state, action) => {
            state.loading = false;
            state.userMeetings = action.payload;
        },
        getUserMeetingsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // Fetch Seller Meetings
        getSellerMeetingsRequest: (state) => {
            state.loading = true;
        },
        getSellerMeetingsSuccess: (state, action) => {
            state.loading = false;
            state.sellerMeetings = action.payload;
        },
        getSellerMeetingsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        clearMeetingErrors: (state) => {
            state.error = null;
        },
    },
});

export const {
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
} = meetingSlice.actions;

export default meetingSlice.reducer;
