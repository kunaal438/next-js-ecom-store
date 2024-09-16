'use client'

import { login } from "@/reducer/user.redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";

const UserAuthenticationState = () => {

    const dispatch = useDispatch();
    const { user } = useUser();

    useEffect(() => {
        
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if(!loggedInUser && user){
            
            let userDetail = { fullname: user.name, email: user.email, admin: user.isAdmin, auth: true }
            localStorage.setItem("user", JSON.stringify(userDetail));
            dispatch(login(userDetail))

        } else {
            loggedInUser && dispatch(login(loggedInUser))
        }

    }, [user])

    return null;
}

export default UserAuthenticationState;