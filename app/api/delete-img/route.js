import validAdminRequest from "@/utils/backend/adminVerification.utils";
import deleteImagesFromCloud from "@/utils/backend/deleteImagesFromCloud";

export const DELETE = async (req) => {

    const user = await validAdminRequest();

    if(user instanceof Response){
        return user;
    }

    const images = JSON.parse(req.headers.get('Image-List'));

    if(!images.length){
        return new Response(JSON.stringify({ err: "No image provided for delete" }, { status: 400 }))
    }

    try {

        await deleteImagesFromCloud(images);

        return new Response(null, { status: 200 })

    } catch(err) {
        console.log(err);
        return new Response(JSON.stringify({ err: err.message }), { status: 500 })
    }

}