import express from "express";
import { emailOtpVerification, emailVerification, login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

//route for email verification and otp
router.post("/email-verification-otp-sending", emailVerification);
router.post("/email-otp-verification", emailOtpVerification);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

export default router