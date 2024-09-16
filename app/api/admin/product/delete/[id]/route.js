import Product from "@/schema/Product.schema";
import validAdminRequest from "@/utils/backend/adminVerification.utils";
import connectDB from "@/utils/backend/connectMongoDB";
import deleteImagesFromCloud from "@/utils/backend/deleteImagesFromCloud";

export const DELETE = async (req, { params }) => {
    
    const { id } = params;

    if(!id){
        return new Response(JSON.stringify({ err: "No Product ID Provide to look for" }), { status: 400 })
    }
    
    const user = await validAdminRequest();

    if(user instanceof Response){
        return user;
    }

    try {

        await connectDB();

        const product = await Product.findOne({ product_id: id }).select("images");

        if(!product){
            return new Response(JSON.stringify({ err: "No product found" }), { status: 404 })
        }

        await deleteImagesFromCloud(product.images);

        await Product.findOneAndDelete({ product_id: id });

        return new Response(null, { status: 200 });

    } catch(err){
        console.log(err);
        return new Response(JSON.stringify({ err: err.message }), { status: 500 })
    }
}