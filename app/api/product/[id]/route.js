import Product from "@/schema/Product.schema";
import connectDB from "@/utils/backend/connectMongoDB";

export const GET = async (req, { params }) => {

    const { id } = params;

    if(!id){
        return new Response(JSON.stringify({ err: "No Product ID Provide to look for" }), { status: 400 })
    }

    try {

        await connectDB();

        let product = await Product.findOne({ product_id: id }).select(" title brand stock price category color tags details sizes images maxPage -_id ");

        if(!product){
            return new Response(JSON.stringify({ err: "Product you are looking for does not exists" }), { status: 404 })
        }

        // replace "product_id" key wiht "id" for frontend
        return new Response(JSON.stringify({ product: { ...product._doc, id } }), { status: 200 });

    } catch(err){
        console.log(err);
        return new Response(JSON.stringify({ err: err.message }), { status: 500 })
    }

}