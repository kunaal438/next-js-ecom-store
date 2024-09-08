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
    keywords: ["fashion", "cloths", "apparels", "latest fashion cloths", "affordable cloths"], // keywords that will used by search engines to rank the site
    icons: {
        icon: "/assets/favicon.png", // define favicon
    },
    openGraph: {
        title: "E-commerce store: shop the latest trends",
        description: "Shop the latest trendy fashions clothes at an afforable price",
        url: process.env.NEXT_PUBLIC_BASE_URL,
        images: [
            {
                url: '',
                width: 800,
                height: 600,
                alt: "E-commercer store: shop trendy cloths at afforable price"
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',            // Shows a large image card
        site: '@',                     // Twitter handle of the website or business
        title: 'E-commerce store: shop the latest trends',  
        description: 'Shop the latest trendy fashions clothes at an afforable price', 
        images: [''], // URL of the image to display
    }
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