import AdminCheckWrapper from "@/components/AdminCheckWrapper";
import SideNavbarWrapperLayout from "./sideNavbarWrapperLayout";

export const metadata = {
    title: "Dashboard : Manage E-commercer store",
}

const AdminLayout = ({ children }) => {
    return (
        <div>
            <AdminCheckWrapper>
                <div className="flex">
                    <SideNavbarWrapperLayout />
                    { children }
                </div>
            </AdminCheckWrapper>
        </div>
    )
}

export default AdminLayout;