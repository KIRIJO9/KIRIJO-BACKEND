import express from "express";
import { config } from "dotenv";
import authentication from "./routes/auth.router.js"
import { connectDB } from "./config/db.config.js";
import cookieParser from "cookie-parser";
import cors from "cors"

const app = express();
config()

//initial middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:5173",        //this needs to get modified at the time of hosting
    credentials : true
}))

//extracting the variables from .env file
const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

//Main functionality middleware
app.use("/api/auth", authentication) //this is authentication middleware

app.listen(PORT, async ()=>{
    await connectDB(MONGO_URI)
    console.log(`Server is running at port ${PORT}`)
})