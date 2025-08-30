import mongoose from "mongoose";

//function for connecting the backend with the cloud based database(MONGO DB ATLAS)
export const connectDB = async (MONGO_URI) => {
    try {
        const connection = await mongoose.connect(MONGO_URI)
        console.log(`Database connected successfully ${connection.connection.host}`)
    } catch (error) {
        console.error("Error Connecting to Database ", error.message)
    }
}