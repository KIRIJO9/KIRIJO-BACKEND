import express from "express";
import { emailOtpVerification, emailVerification } from "../controllers/auth.controller.js";

const router = express.Router();


//route for email verification and otp verification
router.post("/email-verification-otp-sending", emailVerification)
router.post("/email-otp-verification", emailOtpVerification)


export default router