import { auth, googleAuthProvider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

const signInWithGoogle = async () => {

    try {
        
        const result = await signInWithPopup(auth, googleAuthProvider);

        if(result?.user){
            
            let { user } = result;

            return { access_token: user.accessToken }
        }

        return null;

    } catch(err){
        console.error('error occur in continue with google - ', err);
    }

}

export default signInWithGoogle;