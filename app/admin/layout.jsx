import AdminCheckWrapper from "@/components/AdminCheckWrapper";
import AdminSideNavbar from "@/components/AdminSideNavbar.component";

export const metadata = {
    title: "Dashboard : Manage E-commercer store",
}

const AdminLayout = ({ children }) => {
    return (
        <div>
            <AdminCheckWrapper>
                <div className="flex">
                    <AdminSideNavbar />
                    { children }
                </div>
            </AdminCheckWrapper>
        </div>
    )
}

export default AdminLayout;