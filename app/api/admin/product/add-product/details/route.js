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

    let { title, brand, color, category, tags, stock, sellingPrice, actualPrice, id, isNew } = formData;

    tags = tags.map(tag => tag.toLowerCase());

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

        let productData = {
            title, brand, color, category, tags, stock, price: { sellingPrice, actualPrice }
        }

        if(isNew){ // only changing the maxPage if its new / first time submit where maxPage is less than 2
            productData = {
                ...productData,
                maxPage: 2 // 2 -> for descriptions page
            }
        }

        if(id){

            await Product.findOneAndUpdate({ product_id: id }, productData);

            return new Response(JSON.stringify({ id }), { status: 200 });
        }

        let product_id = await generateProductDocID(title);
        
        productData = {
            ...productData,
            product_id
        }

        const product = new Product(productData);

        await product.save();

        return new Response(JSON.stringify({ id: product_id }), { status: 200 })

    } catch(err){
        console.error(err);
        return new Response(JSON.stringify({ err: err.message }), { status: 500 })
    }
    
}