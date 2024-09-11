/* eslint-disable react/no-unescaped-entities */
'use client';

import InputField from "@/components/Input.component";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import ExtractFormData from "@/utils/ExtractFormData.utils";
import Loader from "@/components/Loader.component";
import axios, { isAxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/reducer/user.redux";
import signInWithGoogle from "@/utils/signInWithGoogle";
import toast from "react-hot-toast";
import { toastStyle } from "@/utils/toastStyles";
import validateAuthenticationData from "@/utils/form-validations/authentication-detaila";
 
const AuthPage = ({ params }) => {

    const [passwordVisible, setPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formErrors, setFormErrors] = useState({});
    const formRef = useRef(null);

    const { auth: isUserAuthenticated } = useSelector(state => state.user);

    const dispatch = useDispatch();

    const { route } = params;

    const router = useRouter();

    if(route != "login" && route != "signup"){
        notFound();
    }

    useEffect(() => {

        if(isUserAuthenticated){

            router.push("/");

        }

    }, [isUserAuthenticated])


    const continueWithGoogle = async () => {

        setLoading(true);

        const userLoggingIn = await signInWithGoogle();

        if(!userLoggingIn){
            setLoading(false);
        }

        try {

            const response = await axios.post('/api/auth/google-auth', userLoggingIn, {
                headers: {
                    'Authorization': `Bearer ${userLoggingIn.access_token}`
                }
            });

            setLoading(false);
            storeUserInSession(response.data);

        } catch(err){
            setLoading(false);

            if(isAxiosError(err)){

                const errInResponse = err.response.data;
                
                toast.error(errInResponse.err, toastStyle);
                console.error(errInResponse.err);
                return;
            }

            toast.error(err, toastStyle);
            console.error(err);

            return;
        }

    }

    const storeUserInSession = (dataToStore) => {

        const loggedInUser = { ...dataToStore, auth: true }

        localStorage.setItem('user', JSON.stringify(loggedInUser));
        dispatch(login(loggedInUser));

    }

    const handleSubmit = async (e) => {
        
        e.preventDefault();

        if(!formRef.current){return}

        const formData = ExtractFormData(formRef.current);
        const formValid = validateAuthenticationData(formData);
        
        if(!formValid.isValid) {
            setFormErrors(formValid.error);
            return;
        }

        setLoading(true);

        try {

            const response = await axios.post(`/api/auth/${route}`, formData);

            setLoading(false);
            storeUserInSession(response.data);

        } catch(err){
            setLoading(false);

            if(isAxiosError(err)){

                const errInResponse = err.response.data;

                if(errInResponse?.type == "form-error"){
                    setFormErrors(errInResponse.err)
                } 
                else {
                    toast.error(errInResponse.err, toastStyle);
                    console.error(errInResponse.err);
                }
                return;
            }

            toast.error(err, toastStyle);
            console.error(err);
            return;
        }
        
    }

    return (        
        <div className="w-full min-h-cover flex items-center justify-center">
            { loading && <Loader /> }
            <div className="relative w-[350px]">
                <h1 className="text-2xl font-medium text-center mb-14">{route == "login" ? "Log In" : "Sign Up"}</h1>

                <form ref={formRef} className="flex flex-col gap-2" onSubmit={handleSubmit}>
                    
                    {
                        route == "signup" && <InputField type="text" placeholder="Fullname" name="fullname" displayError={formErrors.fullname} />
                    }

                    <InputField type="email" placeholder="Email" name="email" displayError={formErrors.email} />

                    <div className="relative">
                        <InputField type={ passwordVisible ? "text" : "password" } placeholder="Password" name="password" displayError={formErrors.password} />
                        <FontAwesomeIcon icon={passwordVisible ? faEyeSlash : faEye} className="absolute right-3 top-4 cursor-pointer" tabIndex={0} onClick={() => setPasswordVisible(prev => !prev)} />
                    </div>

                    <button type="submit" className="primary_btn mt-5 w-fit block mx-auto">
                        {route == "login" ? "Log In" : "Sign Up"}
                    </button>

                </form>

                <div className="flex gap-2 items-center justify-center my-6">
                    <hr className="w-full border-white-300" />
                    <span className="text-white-300">OR</span>
                    <hr className="w-full border-white-300" />
                </div>

                <button className="primary_btn flex items-center justify-center gap-2 w-full" onClick={continueWithGoogle}>
                    <Image src="/assets/google-icon.png" width="14" height="14" alt="google icon" />
                    Continue with google
                </button>

                {
                    route == "login" ?
                    <p className="text-center mt-5">
                        Don't have an account ? <Link className="hover:underline" href="signup">Sign Up here</Link>
                    </p> :
                    <p className="text-center mt-5">
                    Already have an account ? <Link className="hover:underline" href="login">Login here</Link>
                </p>
                }

            </div>
        </div>
    )
}

export default AuthPage;