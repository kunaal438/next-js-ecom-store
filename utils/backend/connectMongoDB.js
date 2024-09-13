import mongoose from 'mongoose';

let cachedClient = null;
let cachedDb = null;

const connectDB = async () => {

    if (cachedDb) { return cachedDb }

    if (!cachedClient) {

        try {
            cachedClient = await mongoose.connect(process.env.MONGODB_URI, { autoIndex: true });
            console.log('Connection to mongodb is successful');
        } catch(err){
            console.log('Error occured while connecting to mongo database', err)
        }
        
    }

    cachedDb = cachedClient.connection.db;
    return cachedDb;

}

export default connectDB;