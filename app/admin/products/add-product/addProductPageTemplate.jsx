'use client'

import Loader from "@/components/Loader.component";
import { setProductReducer } from "@/reducer/product.redux";
import fetchProductData from "@/utils/fetchProductData";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AddProductPageTemplate = ({ children }) => {

    const [formComponent, outputComponent] = children;
    const pathname = usePathname();

    const searchParams = useSearchParams();
    const queryObject = Object.fromEntries(searchParams.entries());
    const query = new URLSearchParams(queryObject);

    const [loading, setLoading] = useState(false);

    const { product_form_complete } = useSelector(state => state.product);

    const formSteps = ["details", "description", "sizes", "images"];
    const dispatch = useDispatch();
    const router = useRouter();

    const handleBeforeUnload = (event) => {
        const message = "You have unsaved changes. Are you sure you want to leave?";
        event.returnValue = message;
        return message;
    };

    useEffect(() => {

        let product_id = query.get("id");
        
        // fetch product info
        if(product_id){
            setLoading(true);
            fetchProductData({ id: product_id }).then(data => {
                if(data){
                    dispatch(setProductReducer(data));
                    setLoading(false);
                    console.log('set the product reducer')
                }
            }).catch(err => { 
                setLoading(false);
                router.push("/admin/products");
                console.error(err); 
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
                    <Image src="/assets/logo.png" className="mb-12" width={150} height={20} alt="Logo" />
                    </Link>

                    {/* route */}
                    <div className="flex items-center gap-2 my-8">
                        {
                            formSteps.map((step,i) => {
                                return (
                                    <div key={i} className="flex gap-1 items-center">
                                        <Link href={step} className={"capitalize hover:underline " + ( pathname.includes(step) ? " text-black-300 font-semibold " : " text-black-100 " ) + ( (product_form_complete/25 < i) ? "pointer-events-none" : "pointer-events-auto")}>{step}</Link>
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