//import mongoosde library
import mongoose from "mongoose";
//function to connect to the database
const connectDB = async () => {
    try {
        //connect unsing url from env file
        await mongoose.connect (process.env.MONGO_URL);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1); // Exit the process with failure
    }
};
//export the function
export default connectDB;
