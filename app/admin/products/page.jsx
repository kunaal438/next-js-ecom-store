import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import ProductManagementClientPage from "./clientPage";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

const AdminProductsManagement = async ({ searchParams }) => {

    try {

        let totalProducts = 0;

        const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + 'api/admin/product/product-list', {
            params: { ...searchParams, totalDocs: true }, 
            headers: { Cookie: cookies().toString() }
        }); 

        const { products, totalDocs } = response.data;

        totalProducts = totalDocs;

        return (
            <div className="relative w-full">
                <div className="px-6 mt-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-lg font-semibold text-black-100">Products in inventory - <span className="text-black-300">{totalProducts} Products</span></h1>
                        <Link href="/admin/products/add-product/details" className="flex items-center gap-3 p-3 bg-white-200 rounded-md px-5 border border-white-200 hover:border-white-300 hover:bg-white-100 duration-300">
                            <FontAwesomeIcon icon={faPlus} />
                            Add Product
                        </Link>
                    </div>
                </div>
    
                <ProductManagementClientPage products={products} />
                
            </div>
        )

    } catch(err){
        // console.log(err);
        // redirect('/error');
    }

}

export default AdminProductsManagement;