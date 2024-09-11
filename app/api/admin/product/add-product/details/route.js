import Product from "@/schema/Product.schema";
import validAdminRequest from "@/utils/backend/adminVerification.utils";
import connectDB from "@/utils/backend/connectMongoDB";
import validateProductDetailsForm from "@/utils/form-validations/product-validations/product-details";
import generateDocID from "@/utils/generateDocID";

const generateProductDocID = async (title) => {
    let product_id = generateDocID(title);

    const productExists = await Product.findOne({ product_id });

    if(productExists){
        generateProductDocID();
    }

    return product_id;
}

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

        let product_id = await generateProductDocID(title);

        const product = new Product({
            product_id, title, brand, color, category, tags, stock, price: { sellingPrice, actualPrice }
        });

        await product.save();

        return new Response(JSON.stringify({ id: product_id }), { status: 200 })

    } catch(err){
        console.error(err);
        return new Response(JSON.stringify({ err: err.message }), { status: 500 })
    }
    
}