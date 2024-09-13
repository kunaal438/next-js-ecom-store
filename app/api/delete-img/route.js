import validAdminRequest from "@/utils/backend/adminVerification.utils";
import cloudinary from "@/utils/cloudinaryConfig";
import extractPublicId from "@/utils/extractPublicID";

export const DELETE = async (req) => {

    const user = await validAdminRequest();

    if(user instanceof Response){
        return user;
    }

    const images = JSON.parse(req.headers.get('Image-List'));

    if(!images.length){
        return new Response(JSON.stringify({ err: "No image provided for delete" }, { status: 400 }))
    }

    await Promise.all(

        images.map(async img => {
            try {
                
                let publicId = extractPublicId(img);
                await cloudinary.uploader.destroy(publicId);

            } catch(err){
                console.log(err);
                return new Response(JSON.stringify({ err: err.message }), { status: 500 })
            }

        })

    )

    return new Response(null, { status: 200 })

}