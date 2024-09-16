/* eslint-disable react/no-unescaped-entities */
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import { getInCurreny } from "@/utils/currenyFormat";
import Image from "next/image";
import InputField from "./inputs/Input.component";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArchive, faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import ExtractFormData from "@/utils/ExtractFormData.utils";
import axios from "axios";
import handleErrorFromServer from "@/utils/errorHandling";
import Loader from "./Loader.component";
import DeleteConfirmation from "./deleteConfirmationDialogueBox.component";

const ListProductCard = ({ product }) => {

    const { product_id, title, brand, stock, images: [product_image], price: { sellingPrice, actualPrice }, archived } = product;

    const formRef = useRef();

    const [loading, setLoading] = useState(false);
    const [productStock, setProductStock] = useState(stock);
    const [archivedStatus, setArchivedStatus] = useState(archived);
    const [archiveConfirmation, setArchiveConfirmation] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);

    const handleStockUpdate = async (e) => {
        
        e.preventDefault();
        
        if(!formRef.current) { return }

        const formData = ExtractFormData(formRef.current);
        const { unit } = formData;

        if(unit != productStock){ 
            try {
                
                setLoading(true);
                await axios.put('/api/admin/product/update-stock', { product_id, stock: Number(unit) });

                setLoading(false);
                setProductStock(unit);

            } catch(err){
                setLoading(false);
                handleErrorFromServer(err);
            }

        }

    }

    const setArchive = async () => {
        try {
            
            setLoading(true);
            setArchiveConfirmation(false);

            await axios.put('/api/admin/product/update-archive', { product_id, archived: !archivedStatus });
            
            setArchivedStatus(prev => !prev);
            setLoading(false);

        } catch(err){
            setLoading(false);
            handleErrorFromServer(err);
        }
    }

    const handleProductDelete = async () => {

        try {
            
            setLoading(true);
            setDeleteConfirmation(false);
            
            await axios.delete(`/api/admin/product/delete/${product_id}`);
            window.location.reload(); // reloads the page after deletion

        } catch(err){
            setLoading(false);
            handleErrorFromServer(err);
        }
        
    }

    return (
        <>
        {loading && <Loader />}

        {
            deleteConfirmation &&
            <DeleteConfirmation cancelFunc={() => setDeleteConfirmation(false)} deleteFunc={handleProductDelete}>
                <p className="text-black-100">Are you sure you want to delete <span className="font-semibold text-black-300">"{capitalizeFirstLetter(title)}"</span></p>
            </DeleteConfirmation>
        }

        {
            archiveConfirmation &&
            <div className="fixed top-0 left-0 w-full h-full z-30 bg-black-100/10 flex items-center justify-center">
                <div className="bg-white-100 py-4 px-6 rounded-md max-w-[320px]">
                    <h1 className="font-bold text-lg mb-2">Want to { archivedStatus ? "Unarchive" : "Archive" } ?</h1>
                    <p className="text-black-200 leading-8">
                        {
                            archivedStatus ? 
                            "By un-archiving the product, the product will be publicly accessible through the site (only if the product data in complete)"
                            :
                            "By archiving the product, the product will not be publicly visible throughout the site."
                        }
                    </p>
                    <div className="grid grid-cols-2 gap-2 mt-5">
                        <button className="primary_btn !px-5 !rounded-md !bg-white-200 !text-black-300" onClick={() => setArchiveConfirmation(false)}>Cancel</button>
                        <button className="primary_btn text-nowrap !px-3 !rounded-md !bg-red-300 !text-white-100" 
                            onClick={setArchive}
                        >Yes, { archivedStatus ? "Unarchive" : "Archive" } it</button>
                    </div>
                </div>
            </div>
        }

        <div className="p-6 flex items-center gap-2 justify-between border-y border-white-200">
            <div className="flex items-center gap-8">
                <Link href={`/product/${product_id}`} className="w-[100px] h-[120px] rounded-md overflow-hidden">
                    <Image src={product_image} width={100} height={200} className=" w-full h-full object-cover" priority alt="product image" />
                </Link>
                <div className="text-nowrap min-w-[300px] flex flex-col  py-2 justify-between h-[120px]">
                    <div>
                    <p className="font-medium text-black-100 uppercase">{brand}</p>
                    <Link href={`/product/${product_id}`} className="text-black-300 font-medium mt-2 text-base line-clamp-2 hover:underline">{capitalizeFirstLetter(title)}</Link>
                    </div>
                    <div className="flex gap-2 items-end text-base">
                        <p className="text-lg">{getInCurreny(sellingPrice)}</p>
                        <p className="font-medium text-black-100 line-through">MRP.{getInCurreny(actualPrice)}</p>
                    </div>  
                </div>                
            </div>
            <div className="flex flex-col gap-1">
                <form ref={formRef} onSubmit={handleStockUpdate} className="flex gap-2 items-center">
                    <InputField name="unit" type="number" placeholder="Unit" value={stock} inputClasses="max-w-[120px] border-white-300" />
                    <button type="submit" className="text-nowrap border border-white-300 -mt-2 h-[50px] px-4 rounded-md bg-white-200/50">Update stock</button>
                </form>
                <p className="text-black-100">
                    In stock - 
                    <span className="font-semibold text-black-300">{productStock} Unit(s)</span>
                </p>
            </div>

            <div className="flex items-center gap-3">
                <Link href={`products/add-product/details?id=${product_id}`} title="edit" className="text-nowrap border border-white-300 h-[50px] w-[50px] bg-white-100 rounded-full flex items-center justify-center">
                    <FontAwesomeIcon icon={faPencil} />
                </Link>

                <button title={archivedStatus ? "unarchive" : "archive"} className="relative text-nowrap border border-white-300 h-[50px] w-[50px] bg-white-100 rounded-full " onClick={() => setArchiveConfirmation(true)}>
                    {
                        archivedStatus &&
                        <span className="w-[80%] h-[2px] origin-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-black-300 absolute"></span>
                    }
                    <FontAwesomeIcon icon={faArchive} />
                </button>

                <button title="delete" className="text-nowrap border border-white-300 h-[50px] w-[50px] bg-white-100 rounded-full" onClick={() => setDeleteConfirmation(true)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                </button>
            </div>
        </div>
        </>
    )

}

export default ListProductCard;