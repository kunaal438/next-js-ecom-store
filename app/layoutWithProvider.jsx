'use client'

import store from "@/store";
import { Provider } from "react-redux";
import UserAuthenticationState from "@/components/UserAuthenticationState.component";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar.component";
import { usePathname } from "next/navigation";

const LayoutWithProvider = ({ children }) => {

    const navbarToBeHiddenOnPaths = ["/admin/products/add-product"];
    const pathname = usePathname();

    const showNavbar = !navbarToBeHiddenOnPaths.some(path => pathname.includes(path));

    return (
        <Provider store={store}>

            <UserAuthenticationState />
            <Toaster position="top-right" />
            { showNavbar && <Navbar /> }
            {children}
            
        </Provider>
    )

};

export default LayoutWithProvider;