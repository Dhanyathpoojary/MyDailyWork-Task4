const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const seedProducts = async () => {
  try {
    await Product.deleteMany();

    await Product.insertMany([
      {
        title: "iPhone 15",
        description: "Latest Apple phone with advanced camera system.",
        price: 79999,
        image_url:
          "https://images.unsplash.com/photo-1695048133142-1a20484e8c7c",
        category: "Electronics",
        stock: 10,
      },
      {
        title: "Premium Sneakers",
        description: "Comfortable and stylish everyday wear sneakers.",
        price: 5999,
        image_url:
          "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519",
        category: "Fashion",
        stock: 15,
      },
    ]);

    console.log("Products Seeded Successfully ✅");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();
