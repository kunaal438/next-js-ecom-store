'use client'

import { useRouter } from "next/navigation";
import AddProductPageTemplate from "../addProductPageTemplate";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import AddProductSizesForm from "@/components/add-product/forms/addProductSizesForm.component";
import AddProductSizesOutput from "@/components/add-product/output/addProductSizesOutput.component";

const AddProductSizesPage = () => {

    const router = useRouter();
    const { id, maxPage } = useSelector(state => state.product);

    useEffect(() => {

        if(!id){
            router.push('details');
        }
        else if(maxPage < 3){
            router.push('description');
        }

    }, [id])

    return (
        <AddProductPageTemplate>
            <AddProductSizesForm />
            <AddProductSizesOutput />
        </AddProductPageTemplate>
    )
}

export default AddProductSizesPage;