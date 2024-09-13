'use client'

import { useRouter } from "next/navigation";
import AddProductPageTemplate from "../addProductPageTemplate";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import AddProductImagesForm from "@/components/add-product/forms/addProductImagesForm.component";
import AddProductImagesOutput from "@/components/add-product/output/addProductImagesOutput.component";

const AddProductImagesPage = () => {

    const router = useRouter();
    const { id, product_form_complete } = useSelector(state => state.product);

    useEffect(() => {

        if(!id){
            router.push('details');
        }
        else if(product_form_complete < 75){
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