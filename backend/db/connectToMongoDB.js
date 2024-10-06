import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000,
        });
        console.log("connected to database");
        

    } catch (error) {
        console.log("error connecting to database",error.message)
        
    }
}

export default connectToMongoDB;