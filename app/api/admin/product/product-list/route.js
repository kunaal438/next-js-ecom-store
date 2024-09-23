import Product from "@/schema/Product.schema";
import validAdminRequest from "@/utils/backend/adminVerification.utils"
import connectDB from "@/utils/backend/connectMongoDB";
import extractParamsFromRequest from "@/utils/backend/extractParamsFromReq";

export const GET = async (req) => {

    const user = await validAdminRequest();

    if(user instanceof Response){
        return user;
    }

    try {

        const { search, filter, page, productInInvetory } = extractParamsFromRequest(req);

        await connectDB();

        let filterQuery = { archived: false }
        const maxDocLimit = 10;
        const skipDocs = page ? (page - 1) * maxDocLimit : 0;
        const sortOrder = { createdAt: -1 }

        if(search && search.length){
            filterQuery = { 
                ...filterQuery, 
                title: { $regex: search, $options: 'i' } 
            }
        }

        switch(filter){

            case undefined:  
                break;

            case 'archived products':
                filterQuery = {
                    ...filterQuery,
                    archived: true
                }
                break;

            default:
                filterQuery = {
                    ...filterQuery,
                    category: filter,
                };  
                break;

        }

        const products = await Product.find(filterQuery).select(" product_id brand title stock price images archived -_id ").limit(maxDocLimit).skip(skipDocs).sort(sortOrder);

        const totalResults = await Product.countDocuments(filterQuery);

        let dataToSend = { products, totalDocs: totalResults }

        if(productInInvetory){
            let totalDocs = await Product.countDocuments();
            dataToSend = { ...dataToSend, productInInvetory: totalDocs || 0 }
        }

        return new Response(JSON.stringify(dataToSend), { status: 200 })

    } catch (err){
        console.log(err);
        return new Response(JSON.stringify({ err: err.message }), { status: 500 })
    }

}