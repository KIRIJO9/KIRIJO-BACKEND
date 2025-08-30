import express from "express";
import { config } from "dotenv";
import authentication from "./routes/auth.router.js"
import { connectDB } from "./config/db.config.js";

const app = express();
config()

const PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI


app.get("/", (req, res)=>{
    res.send("Hello")
})

app.use("/api/auth", authentication)

app.listen(PORT, async ()=>{
    await connectDB(MONGO_URI)
    console.log(`Server is running at port ${PORT}`)
})