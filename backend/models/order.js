const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        title: String,
        image_url: String,
        price: Number,
        quantity: Number,
      },
    ],
    totalAmount: Number,
    name: String,
    phone: String,
    address: String,
    pincode: String,
    paymentMethod: String,
    status: { type: String, default: "Processing" },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
