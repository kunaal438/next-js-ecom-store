import { configureStore } from "@reduxjs/toolkit";
import userReducer from "/reducer/user.redux.js";
import productReducer from "/reducer/product.redux.js";

const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer
    },
    devTools: process.env.NEXT_PUBLIC_NODE_ENV !== 'production'
})

export default store;