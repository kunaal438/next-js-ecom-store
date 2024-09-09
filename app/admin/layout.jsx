import AdminCheckWrapper from "@/components/AdminCheckWrapper";

export const metadata = {
    title: "Dashboard : Manage E-commercer store",
}

const AdminLayout = ({ children }) => {
    return (
        <div>
            <AdminCheckWrapper>
                { children }
            </AdminCheckWrapper>
        </div>
    )
}

export default AdminLayout;