'use client'

import { useRouter } from "next/navigation";
import AddProductPageTemplate from "../addProductPageTemplate";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import AddProductDescriptionForm from "@/components/add-product/forms/addProductDescriptionForm.component";
import AddProductDescriptionOutput from "@/components/add-product/output/addProductDescriptionOutput.component";

const AddProductDescriptionPage = () => {

    const router = useRouter();
    const { id, product_form_complete } = useSelector(state => state.product);

    useEffect(() => {

        if(!id || product_form_complete < 25){
            router.push('details');
        }

    }, [id])

    return (
        <AddProductPageTemplate>
            <AddProductDescriptionForm />
            <AddProductDescriptionOutput />
        </AddProductPageTemplate>
    )
}

export default AddProductDescriptionPage;