# 🛍️ VELORA – Premium MERN E-Commerce Platform  
### 🚀 Task 4 – MyDailyWork Internship

This project was developed as **Task 4** during my internship at **MyDailyWork**.  
It is a full-stack E-Commerce web application built using the **MERN stack (MongoDB, Express, React, Node.js)**.

VELORA delivers a premium dark-themed shopping experience with secure authentication, dynamic product management, cart functionality, and a professional checkout flow.

---

## 🌟 Key Features

### 🔐 User Authentication
- Secure Register & Login system
- JWT-based authentication
- Password hashing using Bcrypt
- Protected checkout access

### 🛒 Product Management
- Dynamic product display from MongoDB
- Category-based filtering
- Search functionality
- Price sorting (Low → High / High → Low)
- Clean premium product cards

### 🛍️ Shopping Cart
- Add to cart
- Update product quantity
- Remove items
- Real-time total calculation
- Cart state managed using React Context API

### 💳 Checkout System
- Delivery details form (Name, Phone, Address, PIN Code)
- Multiple payment options:
  - UPI (Demo)
  - Credit/Debit Card (Demo)
  - Cash on Delivery
- Order confirmation page
- Mock payment flow (for demonstration purpose)

### 🎨 UI / UX
- Premium Dark + Gold theme
- Fully responsive layout
- Minimal luxury design
- Clean typography & spacing

---

## 🛠️ Tech Stack

Frontend:
- React.js (Vite)
- Context API
- Tailwind CSS
- React Router
- Axios

Backend:
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt

---

## 📂 Project Structure

velora-ecommerce/
│
├── backend/
│   ├── models/        # User, Product, Order schemas
│   ├── routes/        # Auth, Product, Order APIs
│   ├── server.js      # Express server configuration
│   └── .env           # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── components/   # ProductCard, Navbar
│   │   ├── context/      # CartContext, AuthContext
│   │   ├── pages/        # Home, Cart, Checkout, Success
│   │   ├── App.jsx
│   │   └── main.jsx
│
└── README.md

---

## 🌐 Deployment

Frontend: Netlify / Vercel  
Backend: Render / Railway  
Database: MongoDB Atlas  

---

## 🎯 Internship Objective

This project demonstrates:

- Full MERN stack architecture implementation
- REST API development
- Secure authentication using JWT
- Cart and checkout workflow design
- MongoDB schema design
- Production-style UI/UX implementation
