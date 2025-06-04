import mongoose from 'mongoose';

const connectDB = async()=>{
    const URI = process.env.MONGODB_URI;
    try {
        const connection = await mongoose.connect(URI);
        console.log(`Database Connected Successfully ${connection.connection.host}`);
        
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

export default connectDB;