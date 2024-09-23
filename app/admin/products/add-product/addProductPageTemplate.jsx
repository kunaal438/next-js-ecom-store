'use client'

import Loader from "@/components/Loader.component";
import { setProductReducer } from "@/reducer/product.redux";
import fetchProductData from "@/utils/fetchProductData";
import { faChevronRight, faEye, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const handleBeforeUnload = (event) => {
    const message = "You have unsaved changes. Are you sure you want to leave?";
    event.returnValue = message;
    return message;
};

const AddProductPageTemplate = ({ children }) => {

    const [formComponent, outputComponent] = children;
    const pathname = usePathname();
    
    const searchParams = useSearchParams();
    const queryObject = Object.fromEntries(searchParams.entries());
    const query = new URLSearchParams(queryObject);
    
    const [loading, setLoading] = useState(false);
    const [previewVisible, setPreivewVisible] = useState(false);

    const formSteps = ["details", "description", "sizes", "images"];
    const dispatch = useDispatch();
    const router = useRouter();

    const { maxPage } = useSelector(state => state.product);

    useEffect(() => {

        let product_id = query.get("id");
        
        if(product_id){
            setLoading(true);
            fetchProductData(product_id).then(data => {
                if(data){

                    document.title = "Editing - " + data.title; // setting page title 

                    dispatch(setProductReducer(data));
                    setLoading(false);
                }
            }).catch(err => { 
                setLoading(false);
                console.error(err); 
                router.push("/admin/products");
            })
        }

    }, [])

    useEffect(() => {

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        }
        
    }, [])

    return (
        loading ? <Loader /> :
        <div className="relative flex w-full min-h-[100vh]">
            {/* form */}
            <div className="relative w-full lg:w-[60%] h-full max-sm:px-10 max-lg:px-16 p-10 pr-16 pb-20">
                <div className="w-full lg:w-[80%] ml-auto h-full">
                    <div className="flex justify-between items-center max-md:mb-4 mb-12 ">
                        <Link href="/admin/products">
                            <Image src="/assets/logo.png" className="w-auto h-auto" width={125} height={17} alt="Logo" />
                        </Link>

                        <button className="flex gap-2 items-center p-2 sm:px-6 rounded-md bg-white-200/50 lg:hidden" onClick={() => setPreivewVisible(true)}>
                            <FontAwesomeIcon icon={faEye} />
                            Preview
                        </button>
                    </div>

                    {/* route */}
                    <div className="flex items-center max-sm:gap-0.5 gap-2 my-8">
                        {
                            formSteps.map((step,i) => {
                                return (
                                    <div key={i} className="flex gap-1 items-center">
                                        {/* <Link href={step} className={"capitalize hover:underline " + ( pathname.includes(step) ? " text-black-300 font-semibold " : " text-black-100 " ) + (i + 1 <= maxPage ? " pointer-events-auto ": " pointer-events-none ")}>{step}</Link> */}
                                        <Link href={step} className={"capitalize hover:underline " + ( pathname.includes(step) ? " text-black-300 font-semibold " : " text-black-100 " ) }>{step}</Link>
                                        {
                                            (i != formSteps.length - 1) && 
                                            <FontAwesomeIcon className="scale-[0.6] text-black-100" icon={faChevronRight} />
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>

                    {formComponent}
                    
                </div>
            </div>
            {/* output */}
            <div className={"sticky top-0 right-0 w-[40%] bg-white-200 h-[100vh] p-5 sm:p-10 max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:w-full overflow-auto " + (!previewVisible ? "max-lg:hidden" : "")}>
                <p className={"pt-2 text-black-100 mb-2 " + (pathname.includes("images") ? "" : "lg:mt-24 ")}>Preview</p>
                <button className="w-10 h-10 rounded-full flex items-center justify-center z-30 bg-white-100 border border-white-300/50 fixed right-5 top-5 lg:hidden" onClick={() => setPreivewVisible(false)}>
                    <FontAwesomeIcon icon={faX} />
                </button>
                <div className="relative w-full">
                    {outputComponent}
                </div>
            </div>
        </div>
    )
}

export default AddProductPageTemplate;