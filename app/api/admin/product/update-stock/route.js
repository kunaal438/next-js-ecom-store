import Product from "@/schema/Product.schema";
import validAdminRequest from "@/utils/backend/adminVerification.utils"
import connectDB from "@/utils/backend/connectMongoDB";

export const PUT = async (req) => {

    const user = await validAdminRequest();

    if(user instanceof Response){
        return user;
    }

    try {

        const { product_id, stock } = await req.json();

        await connectDB();

        if(stock < 1){ 
            return new Response(JSON.stringify({ err: "Invalid stock value" }), { status: 403 })
        }

        await Product.findOneAndUpdate({ product_id }, { stock });

        return new Response(null, { status: 200 });


    } catch(err){
        console.log(err);
        return new Response(JSON.stringify({ err: err.message }), { status: 500 })
    }

}