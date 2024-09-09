import setAccessTokenCookie from "@/utils/backend/SetAccessTokenCookie.utils"

export const POST = async () => {

    setAccessTokenCookie('')

    return new Response(null, { status: 200 })

}