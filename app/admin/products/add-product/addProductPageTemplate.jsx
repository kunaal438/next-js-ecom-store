'use client'

import Loader from "@/components/Loader.component";
import { setProductReducer } from "@/reducer/product.redux";
import fetchProductData from "@/utils/fetchProductData";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
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

                    document.title = "Editing - " + data.title;

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
            <div className="relative w-[60%] h-full p-10 pr-16 pb-20">
                <div className="w-[80%] min-w-[500px] ml-auto h-full">
                    <Link href="/admin/products">
                        <Image src="/assets/logo.png" className="mb-12 w-auto h-auto" width={125} height={17} alt="Logo" />
                    </Link>

                    {/* route */}
                    <div className="flex items-center gap-2 my-8">
                        {
                            formSteps.map((step,i) => {
                                return (
                                    <div key={i} className="flex gap-1 items-center">
                                        <Link href={step} className={"capitalize hover:underline " + ( pathname.includes(step) ? " text-black-300 font-semibold " : " text-black-100 " ) + (i + 1 <= maxPage ? " pointer-events-auto ": " pointer-events-none " )}>{step}</Link>
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
            <div className="sticky top-0 right-0 w-[40%] bg-white-200 h-[100vh] px-10">
                <p className="mt-24 pt-2 text-black-100 mb-2">Preview</p>
                {outputComponent}
            </div>
        </div>
    )
}

export default AddProductPageTemplate;