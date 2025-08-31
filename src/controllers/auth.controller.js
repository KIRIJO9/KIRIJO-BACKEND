import Client from "../models/client.model.js";
import Otp from "../models/otp.model.js";
import { generateOTP, sendOtpViaEmail, generateToken } from "../utils/misc.utils.js";
import bcrypt from "bcryptjs";

//Function for email verification and otp sending
export const emailVerification = async (req, res) => {
  const { email } = req.body
  try {
    const client = await Client.findOne({ email })
    //if the email already exists then sending the invalid message
    if (client) {
      return res.status(400).json({ message: "Email Already Exists" })
    }

    // generating otp
    const otp = generateOTP()
    const newOtp = new Otp({
      email,
      otp
    })
    //saving otp and sending otp
    await newOtp.save()
    await sendOtpViaEmail(email, otp)
    res.status(200).json({ success: true, message: `Otp Sent To ${email}` })
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ status: true, message: "Internal Server Error" });
  }
};

//function for otp verification
export const emailOtpVerification = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const isOtpThere = await Otp.findOne({ email, otp }); //fetching otp from database
    if (isOtpThere) { //if otp is there then success is true
      isOtpThere.verified = true;
      await isOtpThere.save();
      console.log(isOtpThere);
      return res.status(200).json({ success: true, message: "OTP Verified" })
    }
    return res.status(400).json({ success: false, message: "Invalid  or expired OTP" })
  } catch (error) {
    console.log("Email Verification Failed {Internal Server Error}")
    return res.status(500).json({ status: false, message: "Internal Server Error" })
  }
};

//function for signup
export const signup = async (req, res) => {
  const { email, name, password } = req.body;
  try {
    const otpRecord = await Otp.findOne({ email, verified: true });
    console.log(otpRecord);
    if (!otpRecord) {
      return res.status(400).json({ success: false, message: "Email not verified" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newClient = new Client({
      email,
      name,
      password: hashedPassword,
    });
    await newClient.save();

    // Delete OTP records for cleanup
    await Otp.deleteMany({ email });

    // Generate JWT token & send cookie
    const token = await generateToken(newClient._id, res);

    res.status(201).json({
      success: true,
      message: "Signup Successful",
      token, // optional if you want to send token in body also
      client: {
        id: newClient._id,
        name: newClient.name,
        email: newClient.email,
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//function for login
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find client by email
    const client = await Client.findOne({ email });
    if (!client) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Compare password using bcrypt
    const isPasswordMatch = await bcrypt.compare(password, client.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // Generate JWT token and set it as an HTTP-only cookie
    const token = await generateToken(client._id, res);

    // Respond with user info (token is in cookie)
    res.status(200).json({
      success: true,
      message: "Login successful",
      client: {
        id: client._id,
        name: client.name,
        email: client.email,
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//function for logout 
export const logout = (req, res) => {
  res.clearCookie("kirijo_cookie", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV !== "development"
  });
  res.status(200).json({
    success: true,
    message: "Logout successful"
  });
};
