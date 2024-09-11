/* eslint-disable react/no-unescaped-entities */
import InputField from "@/components/inputs/Input.component";
import TextArea from "@/components/inputs/TextArea.component";
import Loader from "@/components/Loader.component";
import { addProductSize, rearrageProductSizeOrder, removeProductSize, updateProductSize } from "@/reducer/product.redux";
import validateProductSizes from "@/utils/form-validations/product-validations/product-sizes";
import { toastStyle } from "@/utils/toastStyles";
import { faChevronLeft, faChevronRight, faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios, { isAxiosError } from "axios";
import Link from "next/link";
import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const AddProductSizesForm = () => {

    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});

    //input ref 
    const sizeRef = useRef();
    const sizeDesRef = useRef();
    const sizeStockRef = useRef();

    const router = useRouter();

    // local size information states
    const [size, setSize] = useState("");
    const [sizeDes, setSizeDes] = useState("");
    const [sizeStock, setSizeStock] = useState(null);
    const [editingSize, setEditingSize] = useState(null);
    const [activeSizeBtn, setActiveSizeBtn] = useState("");
    const [deleteSize, setDeleteSize] = useState(null);

    const { sizes, id } = useSelector(state => state.product);
    const dispatch = useDispatch();

    const maxSizeNameLength = 5;
    const maxSizeDesLength = 50;

    const addSize = () => {

        const formData = { name: size, des: sizeDes, stock: sizeStock };
        const sizeInfo = validateProductSizes(formData);

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
        
        const formData = { name: size, des: sizeDes, stock: sizeStock };
        const sizeInfo = validateProductSizes(formData);

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

    const handleSubmit = async () => {
        
        if(!sizes.length){
            return;
        }

        for(let i = 0; i < sizes.length; i++){
            
            let size = sizes[i];

            const sizeInfo = validateProductSizes(size);
    
            if(!sizeInfo.isValid){
                toast.error("Sizes Data Structure is invalid.", toastStyle)
                return;
            }

        }

        setLoading(true);

        try {

            await axios.post('/api/admin/product/add-product/sizes', { sizes });

            setLoading(false);
            router.push("images")

        } catch(err){
            setLoading(false);

            if(isAxiosError(err)){

                const errInResponse = err.response.data;

                if(errInResponse?.type == "form-error"){
                    setErrors(errInResponse.err)
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

    return (
        <>
        { loading && <Loader /> }

        {
            deleteSize != null &&
            <div className="z-50 fixed top-0 left-0 w-full h-screen bg-black-100/10 flex items-center justify-center">
                <div className="min-w-[300px] p-7 rounded-xl px-8 relative bg-white-100 border border-white-300">
                    <h1 className="font-bold text-lg mb-2">Are you sure ??</h1>

                    <p className="my-3">Do you want to delete : </p>
                    <div className="p-3 bg-white-200/50 flex flex-col gap-2">
                        <p>Size - "{sizes[deleteSize].name}"</p>
                        <pre className="line-clamp-2 font-assistant">Description - "{sizes[deleteSize].des}"</pre>
                        <p>Stock - "{sizes[deleteSize].stock}"</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-5">
                        <button className="primary_btn !rounded-md !bg-white-200 !text-black-300" onClick={() => setDeleteSize(null)}>Cancel</button>
                        <button className="primary_btn !rounded-md !bg-red-300 !text-white-100" 
                            onClick={() => {
                                dispatch(removeProductSize(deleteSize));
                                setDeleteSize(null);
                            }}
                        >Yes, Delete it</button>
                    </div>
                </div>
            </div>
        }

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

                                        <button className="small_btn" onClick={() => setDeleteSize(i)}>
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

                <button className="primary_btn py-3 px-8 !rounded-md" onClick={handleSubmit}>
                    Save & Continue
                </button>
            </div>

        </div>
        </>
    )
}

export default AddProductSizesForm;