import Product from "@/schema/Product.schema";
import validAdminRequest from "@/utils/backend/adminVerification.utils";
import connectDB from "@/utils/backend/connectMongoDB";
import validateProductSizes from "@/utils/form-validations/product-validations/product-sizes";

export const POST = async (req) => {

    const user = await validAdminRequest(req);
    
    if(user instanceof Response){
        return user;
    } 

    const formData = await req.json();

    const { id, sizes } = formData;

    if(!id){
        return new Response(JSON.stringify({ err: "No Product ID" }), { status: 403 });
    }

    for(let i = 0; i < sizes.length; i++){
            
        let size = sizes[i];

        const sizeInfo = validateProductSizes(size);

        if(!sizeInfo.isValid){
            return new Response(JSON.stringify({ err: "Sizes Data Structure is invalid." }), { status: 403 });
        }

    }

    try {

        await connectDB();

        const product = await Product.findOneAndUpdate({ product_id: id }, { sizes });

        if(!product){
            return new Response(JSON.stringify({ err: "Product not found" }), { status: 404 });
        }

        return new Response(null, { status: 200 })


    } catch(err) {
        console.log(err);
        return new Response(JSON.stringify({ err: err.message }), { status: 500 })
    }


}