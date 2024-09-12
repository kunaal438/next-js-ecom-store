import Product from "@/schema/Product.schema";
import validAdminRequest from "@/utils/backend/adminVerification.utils";
import connectDB from "@/utils/backend/connectMongoDB";

export const POST = async (req) => {

    const user = await validAdminRequest();

    if(user instanceof Response){
        return user;
    }

    const { images, id } = await req.json();

    if(!id){
        return new Response(JSON.stringify({ err: "No product id provided" }), { status: 400 })
    }

    if(images.length != 4){
        return new Response(JSON.stringify({ err: "Only/At least 4 images can be stored" }), { status: 400 })
    }

    try {

        await connectDB();

        await Product.findOneAndUpdate({ product_id: id }, { images });

        return new Response(null, { status: 200 });

    } catch(err){
        console.log(err);
        return new Response(JSON.stringify({ err: err.message }), { status: 500 })
    }

}