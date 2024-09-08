'use client'

import { login } from "@/reducer/user.redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getGoogleSigninResult } from "@/utils/signInWithGoogle";

const UserAuthenticationState = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        
        const loggedInUser = JSON.parse(localStorage.getItem("user"));

        if(loggedInUser){
            dispatch(login(loggedInUser));
        }

    }, [])

    return <div></div>
}

export default UserAuthenticationState;