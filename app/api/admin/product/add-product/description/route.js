import Product from "@/schema/Product.schema";
import validAdminRequest from "@/utils/backend/adminVerification.utils";
import connectDB from "@/utils/backend/connectMongoDB";
import validateProductDescriptionForm from "@/utils/form-validations/product-validations/product-description";

export const POST = async (req) => {

    const user = await validAdminRequest(req);
    
    if(user instanceof Response){
        return user;
    } 

    const formData = await req.json();

    const { id, description, materialCare } = formData;

    if(!id){
        return new Response(JSON.stringify({ err: "No Product ID Provided" }), { status: 403 });
    }

    const formValid = validateProductDescriptionForm(formData);

    if(!formValid.isValid){
        return new Response(JSON.stringify({
            err: formValid.error,
            type: "form-error"
        }), { status: 403 })
    }

    try {

        await connectDB();

        const product = await Product.findOneAndUpdate({ product_id: id }, { details: { description, materialCare } });

        if(!product){
            return new Response(JSON.stringify({ err: "Product not found" }), { status: 404 });
        }

        return new Response(null, { status: 200 })


    } catch(err) {
        console.log(err);
        return new Response(JSON.stringify({ err: err.message }), { status: 500 })
    }

}