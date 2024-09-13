'use client'

import { useRouter } from "next/navigation";
import AddProductPageTemplate from "../addProductPageTemplate";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import AddProductImagesForm from "@/components/add-product/forms/addProductImagesForm.component";
import AddProductImagesOutput from "@/components/add-product/output/addProductImagesOutput.component";

const AddProductImagesPage = () => {

    const router = useRouter();
    const { id, maxPage } = useSelector(state => state.product);

    useEffect(() => {

        if(!id){
            router.push('details');
        }
        else if(maxPage < 4){
            router.push('sizes');
        }

    }, [id])

    return (
        <AddProductPageTemplate>
            <AddProductImagesForm />
            <AddProductImagesOutput />
        </AddProductPageTemplate>
    )
}

export default AddProductImagesPage;