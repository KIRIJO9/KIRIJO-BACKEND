import express from "express";
import { config } from "dotenv";
import authentication from "./routes/auth.router.js"

const app = express();
config()

const PORT = process.env.PORT

app.get("/", (req, res)=>{
    res.send("Hello")
})

app.use("/api/auth", authentication)

app.listen(PORT, async ()=>{
    console.log(`Server is running at port ${PORT}`)
})