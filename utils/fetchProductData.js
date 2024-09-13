import toast from "react-hot-toast";
import { toastStyle } from "./toastStyles";
import axios, { isAxiosError } from "axios";

const fetchProductData = async ({ id, fail_url }) => {

    if(!id) {
        throw toast.error("Product Id is not provided to fetch", toastStyle);
    }

    try {

        const response = await axios.get(`/api/product/${id}`);
        return response.data.product;

    } catch(err){
        if(isAxiosError(err)){
            toast.error(err.response.data.err, toastStyle);
        } 
        else {
            toast.error(err, toastStyle);
        }
        throw err;
    }

}

export default fetchProductData;