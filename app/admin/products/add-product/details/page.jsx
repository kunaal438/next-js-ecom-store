import AddProductDetailsForm from "@/components/add-product/forms/addProductDetailsForm.component";
import AddProductDetailsOutput from "@/components/add-product/output/addProductDetailsOutput.component";
import AddProductPageTemplate from "../addProductPageTemplate";

const AddProductDetailsPage = () => {
    return (
        <AddProductPageTemplate>
            <AddProductDetailsForm />
            <AddProductDetailsOutput />
        </AddProductPageTemplate>
    )
    
}

export default AddProductDetailsPage;