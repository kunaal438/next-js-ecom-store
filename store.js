import { configureStore } from "@reduxjs/toolkit";
import userReducer from "/reducer/user.redux.js";

const store = configureStore({
    reducer: {
        user: userReducer
    },
    devTools: process.env.NEXT_PUBLIC_NODE_ENV !== 'production'
})

export default store;