import Product from "@/schema/Product.schema";
import validAdminRequest from "@/utils/backend/adminVerification.utils";
import connectDB from "@/utils/backend/connectMongoDB";
import validateProductDetailsForm from "@/utils/form-validations/product-details";

export const POST = async (req) => {

    const user = await validAdminRequest(req);
    
    if(user instanceof Response){
        return user;
    } 
 
    const formData = await req.json();

    const { title, brand, color, category, tags, stock, sellingPrice, actualPrice } = formData;

    // validate form
    const validForm = validateProductDetailsForm(formData);

    if(!validForm.isValid){
        return new Response(JSON.stringify({
            err: validForm.error,
            type: "form-error"
        }), { status: 403 })
    }

    try {

        await connectDB();

        const product = new Product({
            title, brand, color, category, tags, stock, price: { sellingPrice, actualPrice }
        });

        const savedProduct = await product.save();

        return new Response(JSON.stringify({ _id: savedProduct._id }), { status: 200 })

    } catch(err){
        console.error(err);
        return new Response(JSON.stringify({ err: err.message }), { status: 500 })
    }
    
}