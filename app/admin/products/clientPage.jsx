'use client';

import ListProductCard from "@/components/ListProductCard";
import { resetProductReducer } from "@/reducer/product.redux";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const ProductManagementClientPage = ({ products }) => {
    
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryObject = Object.fromEntries(searchParams.entries());
    const query = new URLSearchParams(queryObject);
    const page = query.get("page");
    const search = query.get("search");
    const dispatch = useDispatch();

    const filterOptions = ["all", "men's clothing", "women's clothing", "accessories", "archived products"];

    const [activeFilter, setActiveFilter] = useState(searchParams.get("filter") || filterOptions[0]);

    useEffect(() => { // reseting product reducer for "add-product" form
        dispatch(resetProductReducer())
    }, [])

    const redirectForSearch = (searchKey) => {

        switch (searchKey.length) {

            case 0: 
                query.delete("search");
                break;

            default: 
                query.set("search", searchKey);
                break;

        }
        
        router.push(`?${query.toString()}`);
    }

    const handleSearchBoxKeyDown = (e) => { e.key == "Enter" && redirectForSearch(e.target.value) }
    
    const handelSearchBoxBlur = (e) => { redirectForSearch(e.target.value) }

    const changeFilter = (index) => {

        const filter = filterOptions[index];

        setActiveFilter(filter);

        switch (filter) {

            case "all": 
                query.delete("filter");
                break;

            default: 
                query.set("filter", filter);
                break;

        }
        
        router.push(`?${query.toString()}`);

    }

    return (
        <>
        <div className="relative px-6">
            <div className="relative my-5">
                <input onKeyDown={handleSearchBoxKeyDown} onBlur={handelSearchBoxBlur} type="text" placeholder="Search Products" className="w-full h-[50px] bg-white-200 py-2 px-5 text-sm pl-12 rounded-md" />
                <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-5 top-1/2 -translate-y-1/2 text-black-200" />
            </div>
        </div>

        <div className="w-full py-4 border-y border-white-300 px-6 flex gap-3 items-center">
            
            <h3 className="uppercase mr-3">Filter</h3>

            {
                filterOptions.map((filter, i) => {
                    return (
                    <button onClick={() => changeFilter(i)} className={" capitalize flex gap-3 items-center " + (filter == activeFilter ? "text-black-300" : "text-black-100/60")} key={i}>
                        <span className={"w-4 h-4 border-[5px] rounded-full " + (filter == activeFilter ? "border-black-300" : "border-white-300")}></span>
                        {filter}
                    </button>
                    )
                })
            }
        </div>
        <div>
            <div className="flex items-center flex-wrap">
                {
                    page ?
                    <span className="rounded-md my-2 ml-2 block w-fit py-2 px-4 bg-white-200/50">Page - {page}</span>
                    : ""
                }
                {
                    activeFilter != 'all' &&
                    <span className="rounded-md my-2 ml-2 block w-fit py-2 px-4 bg-white-200/50 capitalize">{activeFilter}</span>
                }
                {
                    search ?
                    <span className="rounded-md my-2 ml-2 block w-fit py-2 px-4 bg-white-200/50"><FontAwesomeIcon icon={faMagnifyingGlass} className="scale-75 text-black-100 mr-2" /> {search}</span>
                    : ""
                }
            </div>
            {
                products.length ? 
                    products.map((product,i) => {
                        return <ListProductCard key={i} product={product} />
                    })
                : 
                <div className="w-full h-[500px] flex items-center justify-center flex-col">
                    <Image src="/assets/no-product.png" width={500} height={500} alt="no product image" priority />
                    <p className="text-black-200 -mt-10 capitalize font-medium">No product found</p>
                </div>
            }
        </div>
        </>
    )
}

export default ProductManagementClientPage;