import Product from "../models/product.model.js";

export const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const getAllProducts = async (req, res) => {
  try {
    const { fabricType, region, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

    // Build filter object based on query parameters
    let filter = {};
    if (fabricType) filter.fabricType = fabricType;
    if (region) filter.region = region;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Pagination calculations
    const skip = (page - 1) * limit;

    // Query the database with filter, pagination applied
    const productsPromise = Product.find(filter)
      .skip(skip)
      .limit(Number(limit))
      .exec();
    const countPromise = Product.countDocuments(filter).exec();

    // Await both promises in parallel
    const [products, totalItems] = await Promise.all([productsPromise, countPromise]);

    // Calculate total pages
    const totalPages = Math.ceil(totalItems / limit);

    res.json({
      page: Number(page),
      limit: Number(limit),
      totalItems,
      totalPages,
      products,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json(product);
    } catch (err) {
        res.status(400).json({ errro: err.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }
        res.json({ message: "Product deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};