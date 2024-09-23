'use client'

import { getInCurreny } from "@/utils/currenyFormat";
import { useSelector } from "react-redux";
import Image from "next/image";

const AddProductDetailsOutput = () => {

    const { title, brand, price: { sellingPrice, actualPrice }, images } = useSelector(state => state.product)

    return (
        <div className="w-full max-lg:min-h-[80vh] h-auto flex items-center justify-center">
            <div className="w-[350px] bg-white-100 p-10 rounded-md">

                <div className="relative bg-white-200/50 border border-white-300/20 h-[350px] rounded-sm">
                    {
                        images[0] &&
                        <Image src={images[0]} alt="image" className="w-full h-full object-cover" priority width={275} height={350} />
                    }
                </div>
                
                <div className="flex flex-col gap-2 mt-5">

                    {
                        brand.length ? 
                        <p className="font-bold uppercase -mb-2">{brand}</p> :
                        <div className="w-24 h-5 bg-white-200/50"></div>
                    }

                    {
                        title.length ? 
                        <p className="capitalize">{title}</p> :
                        <>
                        <div className="w-full h-5 bg-white-200/50"></div>
                        <div className="w-36 h-5 bg-white-200/50"></div>
                        </>
                    }

                    <div className="flex gap-4 items-center">
                        {
                            sellingPrice ? <p className="text-2xl">{getInCurreny(sellingPrice)}</p> :
                            <div className="w-14 h-10 bg-white-200/50"></div>
                        }
                        {
                            actualPrice ? <p className="text-lg line-through text-black-100/60">{getInCurreny(actualPrice)}</p> :
                            <div className="w-14 h-6 bg-white-200/50"></div>
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default AddProductDetailsOutput;