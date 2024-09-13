import extractPublicId from "@/utils/extractPublicID";
import Product from "@/schema/Product.schema";
import validAdminRequest from "@/utils/backend/adminVerification.utils";
import connectDB from "@/utils/backend/connectMongoDB";
import cloudinary from "@/utils/cloudinaryConfig";

export const POST = async (req) => {

    const user = await validAdminRequest();

    if(user instanceof Response){
        return user;
    }

    const { images, id, isNew } = await req.json();

    if(!id){
        return new Response(JSON.stringify({ err: "No product id provided" }), { status: 400 })
    }

    if(images.length != 4){
        return new Response(JSON.stringify({ err: "Only/At least 4 images can be stored" }), { status: 400 })
    }

    try {

        await connectDB();

        // get the images from database first and compare both arrays, if there is a url stored that is not present in the current data then delete that stored image from cloud.

        const product = await Product.findOne({ product_id: id }).select("images");

        const imagesUrlToRemove = product.images.filter((url) => !images.includes(url));

        if(imagesUrlToRemove.length){
            imagesUrlToRemove.map(async img => {
                try {
                    
                    let publicId = extractPublicId(img);
                    await cloudinary.uploader.destroy(publicId);
    
                } catch(err){
                    console.log(err);
                }
    
            })
        }

        let productData = { images };

        if(isNew){
            productData = {
                ...productData,
                archived: false
            }
        }
        
        await Product.findOneAndUpdate({ product_id: id }, productData);

        return new Response(null, { status: 200 });

    } catch(err){
        console.log(err);
        return new Response(JSON.stringify({ err: err.message }), { status: 500 })
    }

}