/* eslint-disable react/no-unescaped-entities */
'use client'

import { addProductImage, reArrageProductImageOrder, removeProductImage } from "@/reducer/product.redux";
import { faChevronLeft, faChevronRight, faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import getBase64Image from "@/utils/imageToBase64";
import Link from "next/link";
import DeleteConfirmation from "@/components/deleteConfirmationDialogueBox.component";
import axios from "axios";
import handleErrorFromServer from "@/utils/errorHandling";
import { handleBeforeUnload } from "@/app/admin/products/add-product/addProductPageTemplate";

const AddProductImagesForm = () => {

    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(0);

    const [deleteImage, setDeleteImage] = useState(null);
    const [activeImage, setActiveImage] = useState(null);

    const { images, id, maxPage } = useSelector(state => state.product);
    const dispatch = useDispatch();

    const maxUploadImagesLimit = 4;

    const handleImageFiles = async (e) => {
        const files = e.target.files;

        if(!files.length) { return };

        let localImagesLength = images.length;

        for(const file of files){
            
            if(localImagesLength < maxUploadImagesLimit){
                const base64Image = await getBase64Image(file);
                dispatch(addProductImage(base64Image));
                localImagesLength++;
            }            
            
        }
    }

    const deleteUploadedImagesForCloud = async (imagesURL) => {
        
        const imagesToDelete = imagesURL.filter((url) => !images.includes(url));
        try {

            await axios.delete('/api/delete-image', {
                headers: {
                  'Image-List': JSON.stringify(imagesToDelete), // Custom header
                }
            });

            console.log('Uploaded Images deleted from cloud because of some error occured while saving those images.....')

        } catch(err){
            console.error(err);
        }

    }

    const handleSubmit = async () => {
        
        if(images.length != maxUploadImagesLimit || !id){
            return;
        }

        setLoading(true);

        const imagesURL = [];

        for(let i = uploadingImage; i < images.length; i++){

            setUploadingImage(i);
            let img = images[i];

            // upload image 1 by one and store it in database;
            if(img.includes('https')){ // already a url
                imagesURL.push(img);
                continue;
            }

            try {
                // request to backend to upload the image
                const response = await axios.post('/api/upload-image', { img });

                const url = response.data.url;

                imagesURL.push(url);

            } catch(err){
                setLoading(false);
                handleErrorFromServer(err);
                break;
            }

        };

        if(imagesURL.length != maxUploadImagesLimit){ 
            // delete all the images stored in imagesURL only if they are not inside images reducer ( then only they will be recent ones )
            deleteUploadedImagesForCloud(imagesURL);
            setUploadingImage(0);
            return 
        }
        setUploadingImage(prev => prev + 1)

        try {

            const isNew = !(maxPage > 4);

            await axios.post("/api/admin/product/add-product/images", { images: imagesURL, id, isNew });

            setLoading(false);
            setUploadingImage(0);
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.location.href = "/admin/products";

        } catch(err){
            // delete all the images stored in imagesURL only if they are not inside images reducer ( then only they will be recent ones )
            deleteUploadedImagesForCloud(imagesURL);
            setLoading(false);
            setUploadingImage(0);
            handleErrorFromServer(err);
        }

    }

    return (
        <>
        { 
            loading && 
            <div className="w-full h-screen fixed top-0 left-0 flex items-center justify-center z-50 bg-white-100/95">
                <div className="flex items-center gap-2 flex-col">

                    <Image className=" select-none" src="/assets/loading.svg" width={80} height={80} alt="loading animation" />
                    <p>{ (uploadingImage > maxUploadImagesLimit - 1) ? "Saving Data.... Do not refresh the page" : `Uploading...... Image ${uploadingImage + 1}` }</p>

                </div>
            </div>
        }
        {
            deleteImage != null &&
            <DeleteConfirmation
                cancelFunc={() => setDeleteImage(null)}
                deleteFunc={() => {
                    dispatch(removeProductImage(deleteImage));
                    setDeleteImage(null);
                }}
            >
                <div className="relative max-sm:w-[200px] max-sm:h-[300px] w-[300px] h-[400px]">
                    <Image src={images[deleteImage]} width={300} height={500} className="w-full h-full object-cover rounded-sm" alt="Delete Image" />
                </div>
            </DeleteConfirmation>
        }
        <div>
            <h1 className="capitalize text-lg font-semibold">Product Images</h1>

            <div className="mt-10">
                
                <div className="flex gap-5 items-end">
                    <input name="files[]" multiple type="file" accept=".png, .jpg, .jpeg" hidden id="imagesUpload" onChange={handleImageFiles} />
                    <label htmlFor="imagesUpload" className="py-2 px-8 rounded-md bg-white-200/50 flex gap-3 items-center border border-white-300/50 cursor-pointer">
                        <FontAwesomeIcon icon={faUpload} />
                        Upload Images
                    </label>
                    <span className="text-black-100/50">{maxUploadImagesLimit - images.length}/{maxUploadImagesLimit} images left</span>
                </div>

                <div className="relative mt-7">

                {
                    images.length ?
                    <p className="text-black-100/50 mb-3">*Click on images below to re-arrage their order or delete them</p>
                    : ""
                }

                <div className=" flex gap-3 flex-wrap my-5">
                    {
                        images.length ? 
                        images.map((img, i) => {
                            return (
                                <div className="w-[120px] rounded-md bg-black-300 aspect-square relative" key={i}>
                                    <Image src={img} width={150} height={150} className="rounded-md w-full h-full object-cover" alt="Uploaded Image" onClick={() => setActiveImage(img)} />

                                    {
                                        activeImage == img &&
                                        <div className="absolute bottom-0 left-0 w-full flex gap-2 justify-center bg-black-300/60 backdrop-blur-sm rounded-b-md py-2">
                                            
                                            {
                                                i != 0 &&
                                                <button className="small_btn" onClick={() => dispatch(reArrageProductImageOrder({ index: i, type: "down" }))}>
                                                    <FontAwesomeIcon icon={faChevronLeft} className="scale-75" />
                                                </button>
                                            }

                                            <button className="small_btn" onClick={() => setDeleteImage(i)}>
                                                <FontAwesomeIcon icon={faTrash} className="scale-75" />
                                            </button>

                                            {
                                                i != images.length - 1 &&
                                                <button className="small_btn" onClick={() => dispatch(reArrageProductImageOrder({ index: i, type: "up" }))}>
                                                    <FontAwesomeIcon icon={faChevronRight} className="scale-75" />
                                                </button>
                                            }

                                        </div>
                                    }

                                </div>
                            )
                        })
                        : ""
                    }
                </div>

                </div>

                <div className="flex items-center justify-between mt-14">
                    <Link href="/admin/products/add-product/sizes" className="flex gap-4 py-3 px-8 font-semibold hover:bg-white-200/50 items-center">
                        <FontAwesomeIcon icon={faChevronLeft} />
                        Return to product's sizes
                    </Link>

                    <button className="primary_btn py-3 px-8 !rounded-md" onClick={handleSubmit}>
                        Save & Continue
                    </button>
                </div>

            </div>

        </div>
        </>
    )
}

export default AddProductImagesForm;