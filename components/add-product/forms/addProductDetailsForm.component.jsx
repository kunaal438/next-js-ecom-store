'use client'

import InputField from "@/components/inputs/Input.component";
import SelectInput from "@/components/inputs/SelectInput.component";
import { setProductActualPrice, setProductSellingPrice, setProductTitle, setProductStock, setProductBrand, addProductTags, removeProductTags, setProductColor, setProductCategory, setProductID, forwardForm } from "@/reducer/product.redux";
import { productCategories, productColors } from "@/utils/productDetails";
import { faBoxesStacked, faChevronLeft, faDollar, faTags, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import Link from "next/link";
import Loader from "@/components/Loader.component";
import ExtractFormData from "@/utils/ExtractFormData.utils";
import validateProductDetailsForm from "@/utils/form-validations/product-validations/product-details";
import axios, { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { toastStyle } from "@/utils/toastStyles";
import { useRouter } from "next/navigation";

const AddProductDetailsForm = () => {
    // loading state
    const [loading, setLoading] = useState(false);

    // form error state
    const [formErrors, setFormErrors] = useState({});
    const formRef = useRef();

    // color field states & ref
    const [localColorArray, setLocalColorArray] = useState(null);
    const [colorFieldFocused, setColorFieldFocused] = useState(false); 
    const [selectedColor, setSelectedColor] = useState(null); 
    const colorFieldRef = useRef();

    const { brand, title, stock, price: { sellingPrice, actualPrice }, category, color, tags, id } = useSelector(state => state.product);

    const dispatch = useDispatch();
    const router = useRouter()

    const maxBrandLength = 30;
    const maxTitleLength = 100;
    const maxTagsLimit = 10;
    const maxTagLength = 50;

    const handleSubmit = async (e) => {
        
        e.preventDefault();

        if(!formRef.current) { return }

        const formData = ExtractFormData(formRef.current);

        formData.tags = tags;

        const validForm = validateProductDetailsForm(formData);

        if(!validForm.isValid){ 
            setFormErrors(validForm.error);
            return;
        }

        setLoading(true);

        try {

            const response = await axios.post('/api/admin/product/add-product/details', { ...formData, id });

            setLoading(false);

            dispatch(setProductID(response.data.id));
            dispatch(forwardForm())
            router.push("description");

        } catch(err){
            setLoading(false);

            if(isAxiosError(err)){

                const errInResponse = err.response.data;

                if(errInResponse?.type == "form-error"){
                    setFormErrors(errInResponse.err)
                } 
                else {
                    toast.error(errInResponse.err, toastStyle);
                    console.error(errInResponse.err);
                }
                return;
            }

            toast.error(err, toastStyle);
            console.error(err);
            return;
        }

    }

    const handleTagInputKeyDown = (e) => {
        if(e.key == "Enter" || e.key == ","){
            // add the tag
            e.preventDefault();
            const tag = e.target.value;

            if(tag.length && !tags.includes(tag)){
                dispatch(addProductTags(tag));
                e.target.value = "";
            }

        }
    }

    const updateLocalColorArray = (e) => {
        const val = e.target.value.toLowerCase();

        if(!val.length){
            setLocalColorArray(null);
            return;
        }

        const arrayWithMatchedValue = productColors.filter(color => color.toLowerCase().startsWith(val));

        const localArrayWith5ColorsMax = arrayWithMatchedValue.slice(0, 5);

        setColorFieldFocused(true);
        setLocalColorArray(localArrayWith5ColorsMax);
        localArrayWith5ColorsMax.length && setSelectedColor(0);
    }

    const updateProductColor = (colorName, updatingOnBlur = false) => {

        if(!colorName.length || !colorName) { return };
        
        setFormErrors(prev => {
            return { ...prev, color: "" }
        })

        // handle color update
        
        if(!productColors.includes(colorName) && updatingOnBlur){
            setFormErrors(prev => {
                return { ...prev, color: "Please choose the suitable color from the options" }
            })
        } else {
            dispatch(setProductColor(colorName));
            colorFieldRef.current.value = colorName;
        }

    }

    const handleProductColorInputKeyDown = (e) => {

        if(!localColorArray){return}

        switch (e.key){

            case 'ArrowUp':
                e.preventDefault();
                setSelectedColor((prev) => {
                    if(prev - 1 >= 0){
                        return prev - 1
                    };
                    return prev;
                })
                break;

            case 'ArrowDown':
                e.preventDefault();
                setSelectedColor((prev) => {
                    if(prev + 1 < localColorArray.length){
                        return prev + 1
                    };
                    return prev;
                })
                break;

            case 'Enter':
                e.preventDefault();
                const colorName = localColorArray[selectedColor];
                if(colorName){
                    updateProductColor(colorName);
                    setColorFieldFocused(false);
                }
                break;

            default:
                break;

        }
    }

    const handleProductColorFieldBlur = () => {
        setTimeout(() => {

            updateProductColor(colorFieldRef.current.value, true)
            setColorFieldFocused(false);

        }, 200)
    }

    return (
        <>
        { loading && <Loader /> }
        <div>

            <h1 className="capitalize text-lg font-semibold">Product details</h1>

            <form ref={formRef} onSubmit={handleSubmit} className="mt-10 flex flex-col gap-4">

                <div>

                    <InputField 
                        value={brand} 
                        onChange={(e) => dispatch(setProductBrand(e.target.value))} 
                        max={maxBrandLength} 
                        type="text" 
                        name="brand" 
                        placeholder="Product Brand" 
                        displayError={formErrors.brand}
                    />

                    <span className="-mt-1 block text-sm text-right text-black-100/50">{brand.length}/{maxBrandLength} characters left</span>
                    
                </div>

                <div>

                    <InputField 
                        value={title} 
                        onChange={(e) => dispatch(setProductTitle(e.target.value))} 
                        max={maxTitleLength} 
                        type="text" 
                        name="title" 
                        placeholder="Product Title" 
                        displayError={formErrors.title}
                    />

                    <span className="-mt-1 block text-sm text-right text-black-100/50">{title.length}/{maxTitleLength} characters left</span>
                    
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">

                    <div className="flex max-xl:col-span-2">
                        <div className={"input-box-side-icon-parent " + (formErrors.stock?.length ? "!border-red-200" : "")}>
                            <FontAwesomeIcon icon={faBoxesStacked} />
                        </div>
                        <InputField 
                            type="number" 
                            name="stock" 
                            placeholder="Unit in stock" 
                            value={stock} 
                            onChange={(e) => dispatch(setProductStock(e.target.value))} 
                            inputClasses="rounded-tl-none rounded-bl-none"
                            displayError={formErrors.stock}
                            errorStyles="-ml-[50px] w-[calc(100%+50px)]"
                        />
                    </div>

                    <div className="flex">
                        <div className={"input-box-side-icon-parent " + (formErrors.sellingPrice?.length ? "!border-red-200" : "")}>
                            <FontAwesomeIcon icon={faTags} />
                        </div>
                        <InputField 
                            type="number" 
                            name="sellingPrice" 
                            placeholder="Selling Price" 
                            value={sellingPrice} 
                            onChange={(e) => dispatch(setProductSellingPrice(e.target.value))} 
                            inputClasses="rounded-tl-none rounded-bl-none"
                            displayError={formErrors.sellingPrice}
                            errorStyles="-ml-[50px] w-[calc(100%+50px)]"
                        />
                    </div>

                    <div className="flex">
                        <div className={"input-box-side-icon-parent " + (formErrors.actualPrice?.length ? "!border-red-200" : "")}>
                            <FontAwesomeIcon icon={faDollar} />
                        </div>
                        <InputField 
                            type="number" 
                            name="actualPrice" 
                            placeholder="Actual Price" 
                            value={actualPrice} 
                            onChange={(e) => dispatch(setProductActualPrice(e.target.value))} 
                            inputClasses="rounded-tl-none rounded-bl-none"
                            displayError={formErrors.actualPrice}
                            errorStyles="-ml-[50px] w-[calc(100%+50px)]"
                        />
                    </div>

                </div>

                <SelectInput
                    name="category"
                    value={category}
                    options={productCategories}
                    placeholder="Category"
                    displayError={formErrors.category}
                    onChange={(e) => dispatch(setProductCategory(e.target.value))}
                />

                {/* colors input */}
                <div className="relative">
                    <InputField
                        refVal={colorFieldRef}
                        type="text"
                        name="color"
                        displayError={formErrors.color}
                        value={color}
                        placeholder="Product Color"
                        onKeyDown={handleProductColorInputKeyDown}
                        onChange={updateLocalColorArray}
                        onBlur={handleProductColorFieldBlur}
                        inputClasses={"capitalize " + ((localColorArray != null && colorFieldFocused) ? "rounded-b-none" : "")}
                    />

                    {
                        (localColorArray != null && colorFieldFocused) &&
                        <div className={"bg-white-100 border border-white-200/50 absolute z-30 top-full left-0 w-full flex flex-col -mt-2 border-t-0 rounded-b-md shadow-[0px_7px_10px_rgba(0,0,0,0.075)] " + (formErrors.color?.length ? " -mt-10 " : "")}>
                            {
                                localColorArray.length ? 
                                localColorArray.map((colorName, i) => {
                                    return (
                                        <span role="button" tabIndex="0" onClick={() => updateProductColor(colorName)} key={i} className={"hover:bg-white-200/50 w-full capitalize text-left block px-4 py-3 border-white-200/50 " + (i != localColorArray.length - 1 ? " border-b " : " ") + (i == selectedColor ? "bg-white-200/50" : "")}>
                                            {colorName}
                                        </span>
                                    )
                                }) :
                                <div className="py-3 text-center">
                                    <p className="italic text-black-100">No Color Found</p>
                                </div>
                            }
                        </div>
                    }

                </div>

                {/* tags */}
                <div>
                    <InputField
                        type="text"
                        name="tags"
                        max={maxTagLength}
                        placeholder="Searching Tags"
                        onKeyDown={handleTagInputKeyDown}
                        inputClasses={ tags.length ? "rounded-b-none" : "" }
                        displayError={formErrors.tags}
                    />
                    {
                        tags.length > 0 &&
                        <div className="flex gap-4 flex-wrap p-5 border border-t-0 border-white-200 -mt-2 rounded-b-md mb-2">
                            {
                                tags.map((tag, i) => {
                                    return (
                                        <div key={i} className="flex gap-2 items-center bg-white-200/50 py-2 px-4 pr-2 rounded-full">
                                            <p>{tag}</p>
                                            <button className="bg-white-100 w-6 h-6 flex items-center justify-center rounded-full" onClick={() => dispatch(removeProductTags(i))}>
                                                <FontAwesomeIcon className="scale-75" icon={faX} />
                                            </button>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                    <div className="-mt-1 flex justify-between items-center">
                        <span className="block text-sm text-black-100/50">Press Enter or Comma Key to add the tag</span>
                        <span className="block text-sm text-black-100/50">{tags.length}/{maxTagsLimit} tags left</span>
                    </div>
                </div>
                
                <div className="flex items-center justify-between mt-8">
                    <Link href="/admin/products" className="flex gap-4 py-3 px-8 font-semibold hover:bg-white-200/50 items-center">
                        <FontAwesomeIcon icon={faChevronLeft} />
                        Return to products
                    </Link>

                    <button className="primary_btn py-3 px-8 !rounded-md" type="submit">
                        Save & Continue
                    </button>
                </div>

            </form>

        </div>
        </>
    )
}

export default AddProductDetailsForm;