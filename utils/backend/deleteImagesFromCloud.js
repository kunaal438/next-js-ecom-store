import cloudinary from "@/utils/cloudinaryConfig";
import extractPublicId from "@/utils/extractPublicID";

const deleteImagesFromCloud = async (images) => {

    try {
        await Promise.all(

            images.map(async img => {
                try {
                    
                    let publicId = extractPublicId(img);
                    await cloudinary.uploader.destroy(publicId);
    
                } catch(err){
                    console.log(err);
                    throw new Error(err);
                }
    
            })
    
        );
        return true;

    } catch(err){
        
        console.log(err);
        throw new Error(err);

    }

}

export default deleteImagesFromCloud;