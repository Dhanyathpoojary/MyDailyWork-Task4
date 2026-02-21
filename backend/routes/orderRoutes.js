const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not authorized" });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// CREATE ORDER
router.post("/", protect, async (req, res) => {
  try {
    const { products, total, name, phone, address, pincode, paymentMethod } =
      req.body;

    const order = new Order({
      user: req.user.id,
      products,
      totalAmount: total,
      name,
      phone,
      address,
      pincode,
      paymentMethod,
      status: "Processing",
    });

    const savedOrder = await order.save();
    res.json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: "Order creation failed" });
  }
});

// GET USER ORDERS
router.get("/", protect, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
});

// MOCK PAYMENT
router.put("/:id/pay", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    order.status = "Paid";
    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Payment update failed" });
  }
});

module.exports = router;
