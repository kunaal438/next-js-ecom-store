'use client'

import { useRouter } from "next/navigation";
import AddProductPageTemplate from "../addProductPageTemplate";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const AddProductImagesPage = () => {

    const router = useRouter();
    const { id } = useSelector(state => state.product);

    useEffect(() => {

        // if(!id){
        //     router.push('sizes');
        // }

    }, [id])

    return (
        <AddProductPageTemplate>
            <h1>Image form</h1>
            <h1>Image preview</h1>
        </AddProductPageTemplate>
    )
}

export default AddProductImagesPage;