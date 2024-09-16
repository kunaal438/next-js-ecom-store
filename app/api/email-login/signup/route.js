import User from "@/schema/User.schema";
import connectDB from "@/utils/backend/connectMongoDB";
import setAccessTokenCookie from "@/utils/backend/SetAccessTokenCookie.utils";
import validateAuthenticationData from "@/utils/form-validations/authentication-detaila";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const POST = async (req) => {
    
    const formData = await req.json();
    const { fullname, email, password } = formData;

    const form = validateAuthenticationData(formData);

    if(!form.isValid){
        return new Response(JSON.stringify({
            err: form.error,
            type: "form-error"
        }), { status: 403 })
    }

    try {

        await connectDB(); // connecting to mongodb

        const userExists = await User.findOne({ email });

        if(userExists){
            
            return new Response(JSON.stringify({
                err: { email: 'Email is already in use, please use different email'}, 
                type: "form-error",
            }), { status: 409 })

        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            fullname, email, password: hashedPassword
        })

        const savedUser = await user.save();
        const dataInToken = { 
            _id: savedUser._id, 
        }

        const token = jwt.sign(dataInToken, process.env.JWTSecret);

        setAccessTokenCookie(token);

        return new Response(JSON.stringify({ fullname, email, admin: false }), { status: 200 })

    } catch(err) {
        console.log(err)
        return new Response(JSON.stringify({ err: err.message }), { status: 500 })
    }

}