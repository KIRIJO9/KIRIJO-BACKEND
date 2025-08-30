import Client from "../models/client.model.js";
import Otp from "../models/otp.model.js";
import { generateOTP, sendOtpViaEmail } from "../utils/misc.utils.js";

//Function for email verification and otp sending
export const emailVerification = async (req, res) => {
    const { email } = req.body
    try {
        const client = await Client.findOne({email})
        //if the email already exists then sending the invalid message
        if(client){
            return res.status(400).json({message : "Email Already Exists"})
        }

        // generating otp
        const otp = generateOTP()
        const newOtp = new Otp({
            otp
        })
        //saving otp and sending otp
        await newOtp.save()
        await sendOtpViaEmail(email, otp)
        res.status(200).json({success : true, message : `Otp Sent To ${email}`})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({status : true, message : "Internal Server Error"});
    }
}

//function for otp verification
export const emailOtpVerification = async (req, res) => {
    const { otp } = req.body;
    try {
        const isOtpThere = await Otp.findOne({otp}); //fetching otp from database
        if(isOtpThere){ //if otp is there then success is true
            await Otp.findOneAndDelete({otp})
            return res.status(200).json({success : true, message : "Otp Verified"})
        }
        return res.status(400).json({success : false, message : "Invalid Otp"})
    } catch (error) {
        console.log("Email Verification Failed {Internal Server Error}")
        return res.status(500).json({status : false, message : "Internal Server Error"})
    }
}