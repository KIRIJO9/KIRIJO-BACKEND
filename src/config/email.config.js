import { config } from "dotenv"
import nodemailer from "nodemailer"

config()

//object for sending mail
export const transporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASS
    }
})