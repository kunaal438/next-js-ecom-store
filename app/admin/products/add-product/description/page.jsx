'use client'

import { useRouter } from "next/navigation";
import AddProductPageTemplate from "../addProductPageTemplate";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const AddProductDescriptionPage = () => {

    const router = useRouter();
    const { id } = useSelector(state => state.product);

    useEffect(() => {

        if(!id){
            router.push('details');
        }

    }, [id])

    return (
        <AddProductPageTemplate>
            <h1>Description Form</h1>
            <h1>Preview</h1>
        </AddProductPageTemplate>
    )
}

export default AddProductDescriptionPage;