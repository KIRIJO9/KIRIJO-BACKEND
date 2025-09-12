import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email : {
        type: String,
        required: true,
    },
    otp : {
        type : String,
        required : true,
        unique : true
    },
    createdAt : {
        type : Date,
        default : Date.now,
        expires : 600
    }, 
    verified : {
        type: Boolean,
        default : false,
    }
})

const Otp = mongoose.model("Otp", otpSchema);

export default Otp