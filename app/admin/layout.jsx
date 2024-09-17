import AdminCheckWrapper from "@/components/AdminCheckWrapper";
import SideNavbarWrapperLayout from "./sideNavbarWrapperLayout";

export const metadata = {
    title: "Dashboard : Manage E-commercer store",
}

const AdminLayout = ({ children }) => {
    return (
        <div>
            <AdminCheckWrapper>
                <div className="flex max-xl:flex-col">
                    <SideNavbarWrapperLayout />
                    { children }
                </div>
            </AdminCheckWrapper>
        </div>
    )
}

export default AdminLayout;