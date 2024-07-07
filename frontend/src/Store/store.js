import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Reducers/user";
import sellerReducer from "./Reducers/seller";
import meetingReducer from "./Reducers/meeting";

const store = configureStore({
    reducer: {
        user: userReducer,
        seller: sellerReducer,
        meeting: meetingReducer,
    },
});

export default store;
