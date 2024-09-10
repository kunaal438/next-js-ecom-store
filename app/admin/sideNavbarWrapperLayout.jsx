'use client'

import AdminSideNavbar from "@/components/AdminSideNavbar.component";
import { usePathname } from "next/navigation";

const SideNavbarWrapperLayout = () => {

    const sideNavToBeHiddenOnPaths = ["/admin/products/add-product"];
    const pathname = usePathname();

    const showSideNav = !sideNavToBeHiddenOnPaths.some(path => pathname.includes(path));

    return showSideNav && <AdminSideNavbar />
    
}

export default SideNavbarWrapperLayout;