import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import ProductManagementClientPage from "./clientPage";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { cookies } from "next/headers";

const AdminProductsManagement = async ({ searchParams, res }) => {

    try {

        let totalProducts = 0;

        const response = await axios.get(process.env.NEXT_PUBLIC_BASE_URL + 'api/admin/product/product-list', {
            params: { ...searchParams }, 
            headers: { 
                Cookie: cookies().toString(),
            }
        }); 

        const { products, productInInvetory, totalDocs } = response.data;

        totalProducts = productInInvetory;

        return (
            <div className=" w-full">
                <div className="px-6 mt-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-lg font-semibold text-black-100">Products in inventory - <span className="text-black-300">{totalProducts} Products</span></h1>
                        <Link href="/admin/products/add-product/details" className="flex items-center gap-3 p-3 bg-white-200 rounded-md px-5 border border-white-200 hover:border-white-300 hover:bg-white-100 duration-300 max-sm:px-3 max-sm:rounded-full">
                            <FontAwesomeIcon icon={faPlus} />
                            <p className="max-sm:hidden">Add Product</p>
                        </Link>
                    </div>
                </div>
    
                <ProductManagementClientPage products={products} totalProducts={totalDocs} />
                
            </div>
        )

    } catch(err){
        console.log(err);
        return <h1>error</h1>
    }

}

export default AdminProductsManagement;