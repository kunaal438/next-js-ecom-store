'use client'

import { useDispatch, useSelector } from "react-redux";
import Loader from "./Loader.component";
import { useRouter } from "next/navigation";
import axios from "axios";
import { setAdminStatus } from "@/reducer/user.redux";
import { useEffect } from "react";

const AdminCheckWrapper = ({ children }) => {

    const adminLoggedIn = useSelector(state => state.user.adminVerified);
    const dispatch = useDispatch();
    const router = useRouter();

    const checkAdminLogin = async () => {
        try {

            const response = await axios.post('/api/admin/verify-admin');
            return response.data.isAdmin;

        } catch(err){
            console.error(err);
            return false;
        }
    }

    useEffect(() => {

        switch (adminLoggedIn) {

            case null:
                checkAdminLogin().then((status) => { dispatch(setAdminStatus(status)) });
                break;

            case false:
                router.push("/")
                break;

            default:
                break;

        }

    }, [adminLoggedIn])

    return (
        !adminLoggedIn ? <Loader /> :
        <div>
            { children }
        </div>
    )
}

export default AdminCheckWrapper;