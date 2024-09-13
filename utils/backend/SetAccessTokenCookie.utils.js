import { cookies } from "next/headers";

const setAccessTokenCookie = (token) => {
    const cookieStore = cookies();

    cookieStore.set('access_token', token, {
        httpOnly: true,
        secure: process.env.NEXT_PUBLIC_NODE_ENV == 'production',
        path: '/',
        sameSite: 'Strict'
    })

}

export default setAccessTokenCookie;