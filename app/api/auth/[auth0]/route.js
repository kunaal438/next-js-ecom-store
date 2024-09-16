import User from '@/schema/User.schema';
import connectDB from '@/utils/backend/connectMongoDB';
import setAccessTokenCookie from '@/utils/backend/SetAccessTokenCookie.utils';
import { handleAuth, handleCallback } from '@auth0/nextjs-auth0';
import jwt from "jsonwebtoken"
import { redirect } from 'next/navigation';

const afterCallback = async (req, session, state) => {

    if(session.user){ // successful login

        const { email, name } = session.user;
        
        await connectDB();

        const userExists = await User.findOne({ email }).select('isAdmin _id');
        let userDocId;
        
        if(!userExists){
            
            const user = new User({
                fullname: name, email
            });

            const savedUser = await user.save();
            userDocId = savedUser._id;
            session.user.isAdmin = false;
             
        } else {
    
            userDocId = userExists._id;
            session.user.isAdmin = userExists.isAdmin;

        }

        const dataInToken = {
            _id: userDocId
        }

        const token = jwt.sign(dataInToken, process.env.JWTSecret);

        setAccessTokenCookie(token); 

        return session;

    } else {
        state.returnTo = `${process.env.AUTH0_BASE_URL}/auth/login`;
    }

}

export const GET = handleAuth({
    callback: handleCallback({ afterCallback }),
});