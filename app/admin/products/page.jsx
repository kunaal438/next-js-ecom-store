'use client';

import { resetProductReducer } from "@/reducer/product.redux";
import { faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const AdminProductsManagement = () => {

    const totalProdcuts = 0;

    const router = useRouter();
    const searchParams = useSearchParams();
    const queryObject = Object.fromEntries(searchParams.entries());
    const dispatch = useDispatch();

    const filterOptions = ["all", "men", "women", "accessories", "draft products", "archived products"];

    const [activeFilter, setActiveFilter] = useState(searchParams.get("filter") || filterOptions[0]);

    useEffect(() => {
        dispatch(resetProductReducer());
    }, [])

    const redirectForSearch = (searchKey) => {

        const newSearchParams = new URLSearchParams(queryObject);

        switch (searchKey.length) {

            case 0: 
                newSearchParams.delete("search");
                break;

            default: 
                newSearchParams.set("search", searchKey);
                break;

        }
        
        router.push(`?${newSearchParams.toString()}`);
    }

    const handleSearchBoxKeyDown = (e) => {
        if(e.key == "Enter"){ redirectForSearch(e.target.value) }
    }
    
    const handelSearchBoxBlur = (e) => {
        redirectForSearch(e.target.value);
    }

    const changeFilter = (index) => {

        const filter = filterOptions[index];
        const newSearchParams = new URLSearchParams(queryObject);

        setActiveFilter(filter);

        switch (filter) {

            case "all": 
                newSearchParams.delete("filter");
                break;

            default: 
                newSearchParams.set("filter", filter);
                break;

        }
        
        router.push(`?${newSearchParams.toString()}`);

    }

    return (
        <div className="relative w-full py-4">
            <div className="px-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-lg font-semibold text-black-100">Products in inventory - <span className="text-black-300">{totalProdcuts} Products</span></h1>
                    <Link href="/admin/products/add-product/details" className="flex items-center gap-3 p-3 bg-white-200 rounded-md px-5 border border-white-200 hover:border-white-300 hover:bg-white-100 duration-300">
                        <FontAwesomeIcon icon={faPlus} />
                        Add Product
                    </Link>
                </div>

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

        </div>
    )
}

export default AdminProductsManagement;