/* eslint-disable react/no-unescaped-entities */
import InputField from "@/components/inputs/Input.component";
import TextArea from "@/components/inputs/TextArea.component";
import Loader from "@/components/Loader.component";
import { addProductSize, rearrageProductSizeOrder, updateProductSize } from "@/reducer/product.redux";
import { toastStyle } from "@/utils/toastStyles";
import { faChevronLeft, faChevronRight, faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

const AddProductSizesForm = () => {

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    //input ref 
    const sizeRef = useRef();
    const sizeDesRef = useRef();
    const sizeStockRef = useRef();

    // local size information states
    const [size, setSize] = useState("");
    const [sizeDes, setSizeDes] = useState("");
    const [sizeStock, setSizeStock] = useState(null);
    const [editingSize, setEditingSize] = useState(null);
    const [activeSizeBtn, setActiveSizeBtn] = useState("");

    const { sizes } = useSelector(state => state.product);
    const dispatch = useDispatch();

    const maxSizeNameLength = 5;
    const maxSizeDesLength = 100;

    const validateSizeInfo = () => {

        let isValid = true;
        let localErrors = {};

        if(!size.length){
            localErrors.size = "Provide the size name"
            isValid = false;
        } else if(size.length > maxSizeNameLength){
            localErrors.size = `Size name should be under ${maxSizeNameLength} characters`
            isValid = false;
        }

        if(!sizeDes.length){
            localErrors.sizeDes = "Provide side description to tell more about it, like length, width, height"
            isValid = false;
        } else if(sizeDes.length > maxSizeDesLength){
            localErrors.sizeDes = `Size description should be under ${maxSizeDesLength} characters`;
            isValid = false;
        }

        if(!sizeStock || sizeStock <= 0){
            localErrors.stock = "Provide product stock details",
            isValid = false;
        }

        if(!isValid){
            return { isValid, errors: localErrors }
        }

        return { isValid, info: { name: size.trim().toLowerCase(), des: sizeDes, stock: sizeStock } }

    }

    const addSize = () => {

        const sizeInfo = validateSizeInfo();

        if(!sizeInfo.isValid){
            setErrors(sizeInfo.errors);
            return;
        }

        for(let i = 0; i < sizes.length; i++){

            const { name } = sizes[i];

            if(name == sizeInfo.info.name){ 
                toast.error(`"${name}" size already exists.`, toastStyle);
                return;
            }

        }

        dispatch(addProductSize(sizeInfo.info));
        clearLocalData();

    }

    const updateSizeInfo = () => {        
        
        const sizeInfo = validateSizeInfo();

        if(!sizeInfo.isValid){
            setErrors(sizeInfo.errors);
            return;
        }

        for(let i = 0; i < sizes.length; i++){

            const { name } = sizes[i];

            if(name == sizeInfo.info.name && i != editingSize){ 
                toast.error(`"${name}" size already exists.`, toastStyle);
                return;
            }

        }

        dispatch(updateProductSize({ index: editingSize, size: sizeInfo.info }));
        clearLocalData();

    }

    const clearLocalData = () => {

        // reset input values
        sizeRef.current.value = "";
        sizeDesRef.current.value = "";
        sizeStockRef.current.value = "";

        // reset the states
        setSize("");
        setSizeDes("");
        setSizeStock("");
        setErrors({});
        setEditingSize(null);

    }

    const editSize = (i) => {

        const { name, des, stock } = sizes[i];

        sizeRef.current.value = name;
        sizeDesRef.current.value = des;
        sizeStockRef.current.value = stock;

        setSize(name);
        setSizeDes(des);
        setSizeStock(stock);
        setEditingSize(i);

    }

    return (
        <>
        { loading && <Loader /> }
        <div>
            
            <h1 className="capitalize text-lg font-semibold mb-10">Size Information</h1>

            {
                editingSize != null ?
                <p className="px-5 py-2 rounded-md bg-white-200/50 -mt-5 mb-8 border border-white-300 w-fit">Editing - <span className="font-semibold">"{sizes[editingSize].name}"</span> size</p>
                : ""
            }

            <div className="flex flex-col gap-4">

                <InputField 
                    refVal={sizeRef}
                    type="text"
                    placeholder="Size"
                    max={maxSizeNameLength}
                    displayError={errors.size}
                    onChange={(e) => setSize(e.target.value)}
                />
                
                <TextArea 
                    refVal={sizeDesRef}
                    placeholder="Size Description"
                    displayError={errors.sizeDes}
                    max={maxSizeDesLength}
                    onChange={(e) => setSizeDes(e.target.value)}
                />

                <InputField 
                    refVal={sizeStockRef}
                    type="number"
                    placeholder="Size Stock"
                    displayError={errors.stock}
                    onChange={(e) => setSizeStock(e.target.value)}
                />

                {
                    editingSize == null ?
                    <button onClick={addSize} className={"py-3 px-7 pl-5 bg-white-200/50 rounded-md w-fit flex items-center gap-3"}>
                            <FontAwesomeIcon icon={faPlus} className="scale-75 mt-0.5" />
                        Add Size
                    </button>
                    : 
                    <button onClick={updateSizeInfo} className={"py-3 px-7 bg-white-200/50 rounded-md w-fit flex items-center gap-3"}>
                       Save
                    </button>
                }

            </div>

            {
                (sizes.length && editingSize == null) ?
                <div className="text-black-100/50 mt-5">
                    <p> *Click on the sizes below to re-arrange the order or edit/delete them.  </p>
                    <p> **Order shown below will be consistent all over the site. Change the order of sizes if you like.  </p>
                </div> : ""
            }

            {
                editingSize != null ?
                <div className="text-black-100/50 mt-5">
                    <p> *You can work on other sizes after completing the edit. Click on save to save the changes.</p>
                </div>
                : ""
            }

            {
                editingSize == null ?
                <div className="mt-8 flex gap-4 flex-wrap gap-y-20 ">
                {
                    sizes.map((size, i) => {

                        const { name } = size;

                        return (
                            <div key={i} className="relative">
                                <button className={"w-16 h-16 flex items-center justify-center rounded-full border  font-semibold text-lg uppercase " + (activeSizeBtn == name ? " bg-black-300 text-white-100 " : " border-white-300 bg-white-100 text-black-300 ")} onFocus={() => setActiveSizeBtn(name)}>
                                {name}
                                </button>

                                {
                                    activeSizeBtn == name &&
                                    <div className="absolute left-1/2 -translate-x-1/2 flex gap-2 items-center mt-2">

                                        {
                                            (i != 0) && 
                                            <button className="small_btn" onClick={() => dispatch(rearrageProductSizeOrder({ index: i, type: "down" }))}>
                                                <FontAwesomeIcon icon={faChevronLeft} className="scale-75" />
                                            </button>
                                        }

                                        <button className="small_btn" onClick={() => editSize(i)}>
                                            <FontAwesomeIcon icon={faPen} className="scale-75" />
                                        </button>

                                        <button className="small_btn">
                                            <FontAwesomeIcon icon={faTrash} className="scale-75" />
                                        </button>

                                        {
                                            (i != sizes.length - 1) &&
                                            <button className="small_btn" onClick={() => dispatch(rearrageProductSizeOrder({ index: i, type: "up" }))}>
                                                <FontAwesomeIcon icon={faChevronRight} className="scale-75" />
                                            </button>
                                        }

                                    </div>
                                }

                            </div>
                        )
                    })
                }
                </div> : ""
            }

            <div className="flex items-center justify-between mt-12">
                <Link href="/admin/products/add-product/description" className="flex gap-4 py-3 px-8 font-semibold hover:bg-white-200/50 items-center">
                    <FontAwesomeIcon icon={faChevronLeft} />
                    Return to product's description
                </Link>

                <button className="primary_btn py-3 px-8 !rounded-md">
                    Save & Continue
                </button>
            </div>

        </div>
        </>
    )
}

export default AddProductSizesForm;