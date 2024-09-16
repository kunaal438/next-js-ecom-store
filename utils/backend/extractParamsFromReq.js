const extractParamsFromRequest = (req) => {
    
    const searchParams = new URLSearchParams(req.nextUrl.searchParams);
    let params = {};

    searchParams.forEach((value, key) => {
        params[key] = value;
    });

    return params;
}

export default extractParamsFromRequest;