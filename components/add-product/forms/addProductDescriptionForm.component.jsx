/* eslint-disable react/no-unescaped-entities */
import TextArea from "@/components/inputs/TextArea.component";
import Loader from "@/components/Loader.component";
import { forwardProductForm, setProductDescription, setProductMaterialCare } from "@/reducer/product.redux";
import handleErrorFromServer from "@/utils/errorHandling";
import ExtractFormData from "@/utils/ExtractFormData.utils";
import validateProductDescriptionForm from "@/utils/form-validations/product-validations/product-description";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddProductDescriptionForm = () => {

    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const formRef = useRef();
    
    const { details: { description, materialCare }, id, maxPage } = useSelector(state => state.product);

    const dispatch = useDispatch();
    const router = useRouter();

    const maxDescriptionLength = 2000;
    const maxMaterialCareLength = 1000;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!formRef.current || !id) { return }

        const formData = ExtractFormData(formRef.current);
        const formValid = validateProductDescriptionForm(formData);

        if(!formValid.isValid){
            setFormErrors(formValid.error);
            return;
        }

        setLoading(true);

        try {

            const isNew = !(maxPage > 2);

            await axios.post('/api/admin/product/add-product/description', { ...formData, id, isNew });

            setLoading(false);
            isNew && dispatch(forwardProductForm())
            router.push("sizes")

        } catch(err){
            setLoading(false);
            handleErrorFromServer(err, setFormErrors);
        }

    }

    return (
        <>
        { loading && <Loader /> }
        <div>

            <h1 className="capitalize text-lg font-semibold">Description</h1>
            
            <form ref={formRef} onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4">

                <div>
                    <TextArea 
                        name="description" 
                        placeholder="Product description" 
                        onChange={(e) => dispatch(setProductDescription(e.target.value))} 
                        value={description}
                        height={10}
                        max={maxDescriptionLength}
                        displayError={formErrors.description}
                    />
                    <span className="block text-right w-full text-black-100/50 -mt-3">{description.length}/{maxDescriptionLength} Characters left</span>
                </div>


                <div>
                    <TextArea 
                        name="materialCare" 
                        placeholder="Material & Care" 
                        onChange={(e) => dispatch(setProductMaterialCare(e.target.value))} 
                        value={materialCare}
                        max={maxMaterialCareLength}
                        displayError={formErrors.materialCare}
                    />
                    <span className="block text-right w-full text-black-100/50 -mt-3">{materialCare.length}/{maxMaterialCareLength} Characters left</span>
                </div>

                <div className="flex items-center justify-between mt-8">
                    <Link href="/admin/products/add-product/details" className="flex gap-4 py-3 !px-5 sm:!px-8 font-semibold hover:bg-white-200/50 items-center">
                        <FontAwesomeIcon icon={faChevronLeft} />
                        <p className="max-sm:capitalize"><span className="max-sm:hidden">Return to product's </span>details</p>
                    </Link>

                    <button className="primary_btn py-3 !px-5 sm:!px-8 !rounded-md" type="submit">
                        Save & Continue
                    </button>
                </div>

            </form>

        </div>
        </>
    )
}

export default AddProductDescriptionForm;