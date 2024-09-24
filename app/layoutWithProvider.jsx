'use client'

import store from "@/store";
import { Provider } from "react-redux";
import UserAuthenticationState from "@/components/UserAuthenticationState.component";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar.component";
import { usePathname } from "next/navigation";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const LayoutWithProvider = ({ children }) => {

    const navbarToBeHiddenOnPaths = ["/admin/products/add-product/details", "/admin/products/add-product/description", "/admin/products/add-product/sizes", "/admin/products/add-product/images"];
    const pathname = usePathname();

    const showNavbar = !navbarToBeHiddenOnPaths.some(path => path == pathname);

    return (
        <Provider store={store}>

            <UserProvider>
                <UserAuthenticationState />
                <Toaster position="top-right" />
                { showNavbar && <Navbar /> }
                {children}
            </UserProvider>
            
        </Provider>
    )

};

export default LayoutWithProvider;