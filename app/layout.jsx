import Navbar from "@/components/Navbar.component";
import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import "./globals.css";
import LayoutWithProvider from "./layoutWithProvider";
import UserAuthenticationState from "@/components/UserAuthenticationState.component";
import { Toaster } from "react-hot-toast";

config.autoAddCss = false;

export const metadata = {
    title: "E-commerce store : shop the latest trends", // title of the page
    description: "Shop the latest trendy fashions clothes at an afforable price", // description of the page to help search engines
    icons: {
        icon: "/assets/favicon.png", // define favicon
    },
}

const RootLayout = ({ children }) => {

    return (
        <html lang="en">
            <body>
                <LayoutWithProvider>
                    
                    <UserAuthenticationState />
                    <Toaster position="top-right" />
                    <Navbar />
                    {children}

                </LayoutWithProvider>
			</body>
        </html>
    );
}

export default RootLayout;