import express from "express";
import { config } from "dotenv";
import authentication from "./routes/auth.router.js";
import productRoutes from "./routes/product.router.js";
import cartRoutes from "./routes/cart.router.js";
import orderRoutes from "./routes/order.router.js"
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
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("Error: MONGO_URI is not defined in .env file");
  process.exit(1); // Stop application as DB URI is critical
}

//Main functionality middleware
app.use("/api/auth", authentication)
app.use("/api/product", productRoutes) 
app.use("/api/cart", cartRoutes)
app.use("/api/product", productRoutes)

app.use("/api/order", orderRoutes);

app.listen(PORT, async ()=>{
    await connectDB(MONGO_URI)
    console.log(`Server is running at port ${PORT}`)
})