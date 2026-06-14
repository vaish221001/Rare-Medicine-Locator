//impoprt mongoose
import mongoose from "mongoose";
//emergency request schema
const emergencyREquestSchema = new mongoose.Schema({
    //medicine urgency
    medicineName:{
        type:String,
        required:true,

    },

      createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  
    //patient  name
    patientName:{
        type:String,
        required:true,

    },
    //laocatio 
    location:{
        type:String,
        required:true,

    },
    //urgency level
    urgencyLevel:{
        type:String,
        enum:["LOW","MEDIUM","HIGH","CRITICAL"],
        default:"HIGH",
    },
    //current request status
    status:{
        type:String,
enum:["PENDING","ACCEPTED","RESERVED","COMPLETED","CANCELLED"],
default:"PENDING",    
    },
    //pharmacy that accepted the request
    assignedPharmacy:{
        type:String,
        default:null,
    },
    reservedUntil:{
        type: Date,
        default:null,
    },
    //extra note
    note:{
        type:String,
    },

    
},
{
    timestamps: true,
}

);
//create model
const EmergencyRequest = mongoose.model("EmergencyRequest",emergencyREquestSchema);
export default EmergencyRequest;