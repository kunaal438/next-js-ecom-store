import Product from "@/schema/Product.schema";
import validAdminRequest from "@/utils/backend/adminVerification.utils"
import connectDB from "@/utils/backend/connectMongoDB";

export const PUT = async (req) => {

    const user = await validAdminRequest();

    if(user instanceof Response){
        return user;
    }

    try {

        const { product_id, archived } = await req.json();

        await connectDB();

        const product = await Product.findOne({ product_id }).select("images maxPage");

        if(!product.images.length || product.maxPage < 4){
            return new Response(JSON.stringify({ err: "Please complete product details to un-archive it" }))
        }

        await Product.findOneAndUpdate({ product_id }, { archived });

        return new Response(null, { status: 200 });

    } catch(err){
        console.log(err);
        return new Response(JSON.stringify({ err: err.message }), { status: 500 })
    }

}