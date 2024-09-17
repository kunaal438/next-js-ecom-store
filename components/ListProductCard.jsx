/* eslint-disable react/no-unescaped-entities */
import capitalizeFirstLetter from "@/utils/capitalizeFirstLetter";
import { getInCurreny } from "@/utils/currenyFormat";
import Image from "next/image";
import InputField from "./inputs/Input.component";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArchive, faEllipsis, faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import axios from "axios";
import handleErrorFromServer from "@/utils/errorHandling";
import Loader from "./Loader.component";
import DeleteConfirmation from "./deleteConfirmationDialogueBox.component";

const ListProductCard = ({ product }) => {

    const { product_id, title, brand, stock, images: [product_image], price: { sellingPrice, actualPrice }, archived } = product;

    const stockInpRef = useRef();

    const [loading, setLoading] = useState(false);
    const [productStock, setProductStock] = useState(stock);
    const [archivedStatus, setArchivedStatus] = useState(archived);
    const [archiveConfirmation, setArchiveConfirmation] = useState(false);
    const [deleteConfirmation, setDeleteConfirmation] = useState(false);
    const [actionsWindow, setActionWindow] = useState(false);
    
    useEffect(() => {
        setProductStock(stock);
        setArchivedStatus(archived);
        stockInpRef.current.value = stock;
    }, [stock, archived])

    const handleStockUpdate = async (e) => {
        
        e.preventDefault();
        
        if(!stockInpRef.current) { return }

        const unit = stockInpRef.current.value;

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
            
            window.location.reload();

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
                <Link href={`/product/${product_id}`} className="min-w-[100px] h-[120px] rounded-md overflow-hidden">
                    {
                        product_image ?
                        <Image src={product_image} width={100} height={200} className=" w-full h-full object-cover" priority alt="product image" />
                        :
                        <div className="w-full h-full bg-white-200 border border-white-300 rounded-md flex items-center justify-center">
                            <p className="text-black-100">No Image</p>
                        </div>
                    }
                </Link>
                <div className="min-w-[200px] flex flex-col justify-between h-[120px]">
                    <div>
                    <p className="font-medium text-black-100 uppercase line-clamp-1 text-nowrap">{brand}</p>
                    <Link href={archivedStatus ? `products/add-product/details?id=${product_id}` : `/product/${product_id}`} className="text-black-300 font-medium mt-2 text-base line-clamp-2 hover:underline">{capitalizeFirstLetter(title)}</Link>
                    </div>
                    <div className="flex gap-2 items-end text-base">
                        <p className="text-lg">{getInCurreny(sellingPrice)}</p>
                        <p className="font-medium text-black-100 line-through">MRP.{getInCurreny(actualPrice)}</p>
                    </div>  
                </div>                
            </div>
            <div className="flex gap-3">
            <div className="flex flex-col gap-1 max-md:hidden">
                <form onSubmit={handleStockUpdate} className="flex gap-2 items-center">
                    <InputField refVal={stockInpRef} name="unit" type="number" placeholder="Unit" value={stock} inputClasses="max-w-[120px] border-white-300" />
                    <button type="submit" className="text-nowrap border border-white-300 -mt-2 h-[50px] px-4 rounded-md bg-white-200/50">Update</button>
                </form>
                <p className="text-black-100">
                    In stock - 
                    <span className="font-semibold text-black-300">{productStock} Unit(s)</span>
                </p>
                </div>
                <div className="lg:hidden relative">
                    <button className="text-nowrap border border-white-300 h-[50px] w-[50px] bg-white-100 rounded-md" onBlur={() => setTimeout(() => { setActionWindow(false) }, 300)} onClick={() => setActionWindow(pre => !pre)}>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </button>
                    {
                        actionsWindow &&
                        <div className="absolute top-[55px] z-20 right-0 flex flex-col w-[100px] rounded-md bg-white-100 border border-white-300 text-center">
                            <Link href={`products/add-product/details?id=${product_id}`} title="edit" className="w-full px-3 py-2 border-b border-white-300">Edit</Link>

                            <button title={archivedStatus ? "unarchive" : "archive"} className="w-full px-3 py-2 border-b border-white-300" onClick={() => setArchiveConfirmation(true)}> { archivedStatus ? "Unarchive" : "Archive" } </button>

                            <button title="delete" onClick={() => setDeleteConfirmation(true)} className="w-full px-3 py-2 border-b border-white-300"> Delete </button>
                        </div>
                    }
                </div>
            </div>

            <div className="flex items-center gap-3 max-lg:hidden">
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