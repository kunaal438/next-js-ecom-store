'use client';

import { logout } from "@/reducer/user.redux";
import { faArrowRightFromBracket, faBox, faBoxesStacked, faHome, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const SideNav = ({ className, closeFunc }) => {

    const { email: loggedInUserEmail } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const pathname = usePathname();

    const adminNavigations = [
        {
            name: "home",
            icon: faHome,
            link: "/"
        },
        {
            name: "products",
            icon: faBox,
            link: "/admin/products"
        },
        {
            name: "orders",
            icon: faBoxesStacked,
            link: "/admin/orders"
        }
    ];

    const isActive = (path) => pathname === path;

    const signOutUserFromSession = async () => {

        try {

            await axios.post('/api/email-login/logout');
            dispatch(logout());
            
            router.push('/api/auth/logout');
            
        } catch(err){
            console.error(err);
        }
    
    }

    return (
        <div className={" z-50 w-[300px] border-r border-white-200 min-h-cover sticky top-[80px] bg-white-100 py-4 duration-300 overflow-y-auto " + className}>

            {
                closeFunc &&
                <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white-200/50 absolute top-2 right-2" onClick={() => closeFunc(false)}>
                    <FontAwesomeIcon icon={faX} />
                </button>
            }
            <div className="px-4">
                <h1 className="font-semibold text-black-300 text-sm">Admin Navigation</h1>
                <hr className="border-white-200 mt-3" />
            </div>

            {
                adminNavigations.map((link, i) => {

                    const { name, icon, link: route } = link;

                    return (
                        <div key={i}>
                            <Link href={route} className={"relative px-4 h-16 flex items-center gap-4 w-full py-3 " + (isActive(route) ? "border-r-2 border-black-300" : "") }>
                                <span className="w-10 h-10 rounded-full bg-white-300/20 flex items-center justify-center">
                                    <FontAwesomeIcon icon={icon} className="-mt-1"/>
                                </span>
                                <p className="capitalize">{name}</p>
                            </Link>
                            {
                                i != adminNavigations.length - 1 && <hr className="border-white-200 mx-4" />
                            }
                        </div>
                    )

                })
            }

            <button className="w-full border-t border-white-200 absolute bg-white-100 text-red-300 text-left text-lg font-medium z-20 bottom-0 px-7 py-6 hover:bg-red-200/20"  onClick={signOutUserFromSession}>
                <FontAwesomeIcon icon={faArrowRightFromBracket} className="mr-2" />
                Sign Out
                <span className="block font-normal text-sm mt-2 text-black-300">{loggedInUserEmail}</span>
            </button>

        </div>
    )
}

const AdminSideNavbar = () => { 

    const [navVisible, setNavVisible] = useState(false);

    const pathname = usePathname();

    return (
        <div className="-z-10">
            <SideNav className="max-xl:hidden" />
            <div className="xl:hidden w-full h-[60px] bg-white-100 border border-white-300 sticky flex top-[80px]">
                <button className="font-medium px-12 border-b-2 border-black-300" onClick={() => setNavVisible(true)}>{pathname}</button>
                {/* <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white-200/50 absolute top-4 right-4" onClick={() => setNavVisible(false)}>
                    <FontAwesomeIcon icon={faX} />
                </button> */}
                <SideNav closeFunc={setNavVisible} className={ " !fixed top-[80px] " + (navVisible ? "left-0" : "-left-full")} />
            </div>
        </div>
    )

}

export default AdminSideNavbar;