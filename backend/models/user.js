//import mongoose
import mongoose from "mongoose";
//user schema
const userSchema = new mongoose.Schema({
    //user full name
    name: {
        type: String,
        required: true,
    },
    //user email
    email: {
       type: String,
         required: true,
            unique: true,
    },
    //user password
    password: {
        type: String,
        required: true,
        
    },
    role: {
        type: String,
        enum: ["USER","PHARMACY","ADMIN"],
        default: "USER",
    },
    },
    {
        timestamps: true,
    }

);
//create user model
const User = mongoose.model("User", userSchema);
//export user model
export default User;