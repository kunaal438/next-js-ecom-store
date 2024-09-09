import validAdminRequest from "@/utils/backend/adminVerification.utils";

export const POST = async (req) => {

    const user = await validAdminRequest(req);
    
    if(user instanceof Response){
        return user;
    }

    return new Response(JSON.stringify({ isAdmin: user.admin }))

}