import User from "@/schema/User.schema";
import connectDB from "@/utils/backend/connectMongoDB";
import setAccessTokenCookie from "@/utils/backend/SetAccessTokenCookie.utils";
import validateAuthenticationData from "@/utils/form-validations/authentication-detaila";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const POST = async (req) => {

    const formData = await req.json();
    const { email, password } = formData;
    
    const form = validateAuthenticationData(formData);

    if(!form.isValid){
        return new Response(JSON.stringify({
            err: form.error,
            type: "form-error"
        }), { status: 403 })
    }

    try {

        await connectDB();

        const user = await User.findOne({ email }).select("password fullname isAdmin _id");

        if(!user){
            return new Response(JSON.stringify({ 
                err: { email: "This email doesn't exists. Please check the email" },
                type: "form-error",
            }), { status: 404 })
        }

        if(!user.password){
            return new Response(JSON.stringify({ 
                err: { email: "This email is linked with google. You can only login through google with this account" },
                type: "form-error",
            }), { status: 403 })
        }

        const correctPassword = await bcrypt.compare(password, user.password);

        if(!correctPassword){
            return new Response(JSON.stringify({
                err: { password: "Incorrect Password" },
                type: "form-error",
            }), { status: 403 })
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWTSecret);
    
        setAccessTokenCookie(token);

        return new Response(JSON.stringify({ fullname: user.fullname, email, admin: user.isAdmin }), { status: 200 })

    } catch(err){
        console.log(err)
        return new Response(JSON.stringify({ err: err.message }), { status: 500 })
    }

}