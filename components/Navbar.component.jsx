'use client'

import Image from "next/image";
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faMagnifyingGlass, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/reducer/user.redux";
import axios from "axios";

const Navbar = () => {

    const [userPanel, setUserPanel] = useState(false);
    const [searchBoxVisible, setSearchBoxVisible] = useState(false);

    const { auth: isUserAuthenticated, email: loggedInUserEmail, admin } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const handleBlurOnUserIcon = () => {
        setTimeout(() => {
            setUserPanel(false);
        }, 200)
    }

    const signOutUserFromSession = async () => {

        try {

            await axios.post('/api/auth/logout');

            dispatch(logout());
            
        } catch(err){
            console.error(err);
        }
    
    }

    return (

        <nav className="w-full h-[80px] py-2 px-[5vw] flex items-center justify-between border-b border-white-300">

            <Link href={"/"}>
                <Image src="/assets/logo.png" width={150} height={20} alt="Logo" />
            </Link>

            <div className="flex items-center max-sm:gap-3 gap-6">
                <Link href={""} className="py-3 px-2">Shop</Link>

                {/* search input */}
                <div className={"lg:relative absolute max-lg:w-full max-lg:h-[60px] max-lg:border-b max-lg:border-white-300 max-lg:top-[80px] max-lg:left-0 max-lg:bg-white-100 max-lg:z-50 max-lg:p-2.5 " + ( !searchBoxVisible && "max-lg:hidden" )}>
                    <input type="text" placeholder="Search Products" className="w-full lg:w-[450px] h-10 bg-white-200 py-2 px-3 text-sm pl-12 rounded-md" />
                    <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute max-lg:left-7 left-4 top-1/2 -translate-y-1/2 text-black-200" />
                </div>

                <button className="lg:hidden relative w-10 h-10 rounded-full bg-white-200 " onClick={() => setSearchBoxVisible(prev => !prev)}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>

                {
                    !isUserAuthenticated ?
                    <Link href={"/auth/login"} className="hover:underline">Log In</Link>
                    :
                    <>
                        <button className="relative w-10 h-10 rounded-full bg-white-200 ">
                            {/* <span className="absolute -top-2 -right-2 text-white-100 bg-black-300 rounded-full w-6 h-6 text-sm flex items-center justify-center">01</span> */}
                            <FontAwesomeIcon icon={faBagShopping} />
                        </button>

                        <div className="relative">
                            <button onClick={() => setUserPanel(preVal => !preVal)} onBlur={handleBlurOnUserIcon} className="relative w-10 h-10 rounded-full bg-white-200 ">
                                <FontAwesomeIcon icon={faUser} />
                            </button>

                            {
                                userPanel && 
                                <div className="absolute right-0 top-[110%] bg-white-100 border border-white-200/50 z-50">
                                    <Link href={"/orders"} className="p-4 capitalize text-black-100 block hover:bg-white-300/20">your orders</Link>
                                    {
                                        admin && <Link href={"/admin/products"} className="p-4 capitalize text-black-100 block hover:bg-white-300/20">Dashboard</Link>
                                    }
                                    <button className="text-left hover:bg-white-300/5 border-t border-white-200/50 text-lg p-4 font-medium" onClick={signOutUserFromSession}>
                                        Sign Out
                                        <span className="block font-normal text-sm mt-1 text-black-100">{loggedInUserEmail}</span>
                                    </button>
                                </div>
                            }

                        </div>
                    </>
                }

            </div>

        </nav>

    )
}

export default Navbar;