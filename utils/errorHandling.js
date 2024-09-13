import { isAxiosError } from "axios";
import toast from "react-hot-toast";
import { toastStyle } from "./toastStyles";

const handleErrorFromServer = (err, setFormErrors) => {
    
    if(isAxiosError(err)){
        const errInResponse = err.response.data;

        if(setFormErrors && errInResponse?.type == "form-error"){
            setFormErrors(errInResponse.err)
        } 
        else {
            toast.error(errInResponse.err, toastStyle);
            console.error(errInResponse.err);
        }

        return;
    }

    toast.error(err instanceof Error ? err.message : err, toastStyle);
    console.error(err);
    return;

}

export default handleErrorFromServer;