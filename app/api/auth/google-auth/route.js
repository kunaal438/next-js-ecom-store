import User from "@/schema/User.schema";
import connectDB from "@/utils/backend/connectMongoDB";
import { adminAuth } from "@/utils/backend/firebase-admin";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import setAccessTokenCookie from "@/utils/backend/SetAccessTokenCookie.utils";

export const POST = async (req) => {

    const req_headers = headers();

    const access_token = req_headers.get('authorization')?.split('Bearer ')[1];

    if(!access_token){
        return new Response(JSON.stringify({
            err: "Data is invalid. Please try again"
        }), { status: 400 })
    }

    try {

        const decocedToken = await adminAuth.verifyIdToken(access_token);

        const { email, name, uid } = decocedToken;
        
        await connectDB();

        const userExists = await User.findOne({ email }).select('google_auth _id');
        let userDocId;
        
        if(userExists){

            userDocId = userExists._id;

            if(!userExists.google_auth){
                await User.findOneAndUpdate({ email }, { google_auth: uid })
            } 
            else if(userExists.google_auth != uid) {
                
                return  new Response(JSON.stringify({
                    err: "Unable to verfiy your identity. Please try again or log in with password"
                }), { status: 403 })

            }
             
        } else {

            const user = new User({
                fullname: name, email, google_auth: uid
            });
    
            const savedUser = await user.save();
            userDocId = savedUser._id;

        }

        const dataInToken = {
            _id: userDocId
        }

        const token = jwt.sign(dataInToken, process.env.JWTSecret);

        setAccessTokenCookie(token);

        return new Response(JSON.stringify({ fullname: name, email }), { status: 200 })

    } catch(err){
        
        console.log(err);

        return new Response(JSON.stringify({
            err: "Some error occured while processing your request. Please try again."
        }), { status: 500 })
    }

}