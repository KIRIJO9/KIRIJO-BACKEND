import express from "express";
import { createProduct, deleteProduct, getAllProducts, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

router.post('/createproduct', createProduct);
router.get('/getallproducts', getAllProducts);
router.put('/updateproduct/:id', updateProduct);
router.delete('/deleteproduct/:id', deleteProduct);


export default router;