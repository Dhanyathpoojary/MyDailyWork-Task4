const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

// GET PRODUCTS WITH FILTER
router.get("/", async (req, res) => {
  const { category, minPrice, maxPrice } = req.query;

  let filter = {};

  if (category) {
    filter.category = category;
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  try {
    const products = await Product.find(filter);
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
