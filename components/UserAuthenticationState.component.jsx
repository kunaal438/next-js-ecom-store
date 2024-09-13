'use client'

import { login } from "@/reducer/user.redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const UserAuthenticationState = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        
        const loggedInUser = JSON.parse(localStorage.getItem("user"));

        loggedInUser && dispatch(login(loggedInUser))

    }, [])

    return null;
}

export default UserAuthenticationState;