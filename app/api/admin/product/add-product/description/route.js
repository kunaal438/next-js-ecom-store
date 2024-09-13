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

    const { id, description, materialCare, isNew } = formData;

    if(!id){
        return new Response(JSON.stringify({ err: "No Product ID" }), { status: 403 });
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

        let productData = { details: { description, materialCare } };

        if(isNew){ // only changing the maxPage if its new / first time submit where maxPage is less than 3
            productData = {
                ...productData,
                maxPage: 3 // 3 -> for sizes page
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