'use client'

import { useRouter } from "next/navigation";

const AddProductPage = () => {

    const router = useRouter();

    router.push("/admin/products/add-product/details")

    return null
    
}

export default AddProductPage;