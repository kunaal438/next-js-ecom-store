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

    const { id, sizes, isNew } = formData;

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

        let productData = { sizes };

        if(isNew){ // only changing the maxPage if its new / first time submit where maxPage is less than 4
            productData = {
                ...productData,
                maxPage: 4 // 4 -> for images page
            }
        }

        const product = await Product.findOneAndUpdate({ product_id: id }, productData);

        if(!product){
            return new Response(JSON.stringify({ err: "Product not found" }), { status: 404 });
        }

        return new Response(null, { status: 200 })


    } catch(err) {
        console.log(err);
        return new Response(JSON.stringify({ err: err.message }), { status: 500 })
    }


}