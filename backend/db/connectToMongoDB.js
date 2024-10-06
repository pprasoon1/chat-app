const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 30000, // 30 seconds timeout
        });
        console.log("connected to database");
    } catch (error) {
        console.log("error connecting to database", error.message);
    }
};
