import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number, 
        required: true
    },
    fabricType: {
        type: String
    },
    region: {
        type: String
    },
    stock: {
        type: Number,
        default: 0
    },
    images: {
        type: [String],
        default: []
    }
});

const Product = mongoose.model("Product", productSchema);

export default Product;