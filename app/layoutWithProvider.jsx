'use client'

import store from "@/store";
import { Provider } from "react-redux";

const LayoutWithProvider = ({ children }) => {

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )

};

export default LayoutWithProvider;