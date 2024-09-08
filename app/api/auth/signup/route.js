import User from "@/schema/User.schema";
import validateAuthForm from "@/utils/backend/AuthFormValidation.utils";
import connectDB from "@/utils/backend/connectMongoDB";
import setAccessTokenCookie from "@/utils/backend/SetAccessTokenCookie.utils";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const POST = async (req) => {
    
    const formData = await req.json();

    const { fullname, email, password } = formData;

    const form = validateAuthForm(formData);

    if(!form.valid) { 

        return new Response(
                JSON.stringify({ 
                err: form.error,
                type: "form-error",
                field: form.field
            }),
            { status: 403 }
        )

    }

    try {

        await connectDB(); // connecting to mongodb

        const userExists = await User.findOne({ email });

        if(userExists){
            
            return new Response(JSON.stringify({
                err: 'Email is already in use, please use different email', 
                type: "form-error", 
                field: "email" 
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

        return new Response(JSON.stringify({ fullname, email }), { status: 200 })

    } catch(err) {
        console.log(err)
        return new Response(JSON.stringify({ err: err.message }), { status: 500 })
    }

}