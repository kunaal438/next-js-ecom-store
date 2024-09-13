import Product from "@/schema/Product.schema";
import connectDB from "@/utils/backend/connectMongoDB";

export const GET = async (req, { params }) => {

    const { id } = params;

    if(!id){
        return new Response(JSON.stringify({ 
            err: "No Product ID Provide to look for"
        }), { status: 400 })
    }

    try {

        await connectDB();

        const product = await Product.findOne({ product_id: id }).select(" title -_id ");

        if(!product){
            return new Response(JSON.stringify({ err: "Product you are lookiung for does not exists" }), { status: 404 })
        }

        return new Response(JSON.stringify({ title: product.title }), { status: 200 });

    } catch(err){
        console.log(err);
        return new Response(JSON.stringify({ err: err.message }), { status: 500 })
    }

}