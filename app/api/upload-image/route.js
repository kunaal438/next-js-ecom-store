import validAdminRequest from "@/utils/backend/adminVerification.utils";
import cloudinary from "@/utils/cloudinaryConfig";

export const POST = async (req) => {
    
    const user = await validAdminRequest(req);
    
    if(user instanceof Response){
        return user;
    } 

    try {

        const { img } = await req.json();

        if(!img){
            return new Response(JSON.stringify({ err: "No image provided for upload" }), { status: 400 })
        }

        const base64Data = img.replace(/^data:image\/\w+;base64,/, '');
        const result = await cloudinary.uploader.upload(`data:image/png;base64,${base64Data}`, {
            folder: "nextjs-store-images",
            use_filename: true,
            unique_filename: true
        });

        return new Response(JSON.stringify({ url: result.secure_url }), { status: 200 })

    } catch(err){

        console.log(err);
        return new Response(JSON.stringify({ err: err.message }), { status: 500 });
    }

}