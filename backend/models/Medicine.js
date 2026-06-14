//import mongoose
import mongoose from "mongoose";
//medicine schema
const medicineSchema = new mongoose.Schema({
    //medicine name 
    name:{
        type: String,
        required: true,

    },
    //decription
    description:{
        type: String,
    },
    //quantity available
    quantity:{
        type: Number,
        required: true,
        default: 0,
    },
    //medicine status
    status:{
        type: String,
        enum:["AVAILABLE","LOW_STOCK","OUT_OF_STOCK"],
        default: "AVAILABLE",
        },

    //location available
    location:{
        type: String,
        required:true,

    },
    //pharmacy name
    pharmacyName:{
        type: String,
        required: true,
    },
    //parmacy contact
    contactNumber:{
        type: String,
        required:true,

    },
    //is medicine rare or emergency
    isRare:{
        type: Boolean,
        default: true,

    },

},
{
    timestamps: true,
}
);
//create medicine model
const Medicine = mongoose.model("Medicine",medicineSchema);
//export model
export default Medicine;
