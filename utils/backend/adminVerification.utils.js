import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/schema/User.schema";
import connectDB from "./connectMongoDB";

const validAdminRequest = async (req) => {
    
    const cookieStore = cookies();
    const access_token = cookieStore.get('access_token').value;

    if(!access_token){
        return new Response(JSON.stringify({
            err: "Looks like you are not logged in. Please log in first before making request"
        }), { status: 403 })
    }

    try {
        
        const decodedToken = jwt.verify(access_token, process.env.JWTSecret);
        
        const { _id: userId } = decodedToken;

        await connectDB();

        const user = await User.findOne({ _id: userId }).select("isAdmin");

        if(!user.isAdmin){
            return new Response(JSON.stringify({
                err: "You are not authorized to access the data"
            }), { status: 403 })
        }

        return { admin: user.isAdmin, _id: userId };

    } catch(err){
        
        console.log(err);

        return new Response(JSON.stringify({
            err: "Invalid token provided. Not able to validate your indentity"
        }), { status: 500 })
        
    }
    
}

export default validAdminRequest;