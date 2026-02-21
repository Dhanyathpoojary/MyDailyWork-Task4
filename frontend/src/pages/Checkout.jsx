import { useState } from "react";
import { useCart } from "/src/context/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Checkout() {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const clearCart = () => setCart([]);

  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [upiApp, setUpiApp] = useState("GPay");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (
      !formData.name ||
      !formData.phone ||
      !formData.address ||
      !formData.pincode
    ) {
      alert("Please fill all required fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/orders",
        {
          products: cart.map((item) => ({
            product: item._id,
            title: item.title,
            image_url: item.image_url,
            price: item.price,
            quantity: item.quantity,
          })),
          total: totalPrice,
          ...formData,
          paymentMethod:
            paymentMethod === "UPI" ? `UPI - ${upiApp}` : paymentMethod,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      clearCart();
      navigate("/success");
    } catch (error) {
      if (error.response) {
        alert(
          `Failed to place order: ${error.response.data.message || "Unauthorized"}`,
        );
      } else {
        alert("Failed to place order. Please try again.");
      }
    }
  };

  const methods = ["UPI", "Credit Card", "COD"];
  const upiApps = ["GPay", "PhonePe", "Paytm", "Other"];

  return (
    <div className="bg-[#0e0e0e] min-h-screen text-white py-24 px-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-16">
        {/* LEFT */}
        <div>
          <h1 className="text-4xl font-serif font-light mb-12 tracking-wide">
            Checkout
          </h1>

          <div className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              onChange={handleChange}
              className="w-full bg-transparent border border-neutral-700 px-5 py-4 focus:outline-none focus:border-[#c6a75e] transition"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className="w-full bg-transparent border border-neutral-700 px-5 py-4 focus:outline-none focus:border-[#c6a75e] transition"
            />

            <textarea
              name="address"
              placeholder="Delivery Address"
              rows="3"
              onChange={handleChange}
              className="w-full bg-transparent border border-neutral-700 px-5 py-4 focus:outline-none focus:border-[#c6a75e] transition"
            />

            <input
              type="text"
              name="pincode"
              placeholder="PIN Code"
              onChange={handleChange}
              className="w-full bg-transparent border border-neutral-700 px-5 py-4 focus:outline-none focus:border-[#c6a75e] transition"
            />

            {/* PAYMENT METHOD */}
            <div className="pt-8">
              <h2 className="text-xs tracking-[4px] mb-5 text-neutral-400">
                PAYMENT METHOD
              </h2>

              {/* METHOD TABS */}
              <div className="flex gap-3 mb-6">
                {methods.map((m) => (
                  <button
                    key={m}
                    onClick={() => setPaymentMethod(m)}
                    className={`flex-1 py-3 text-[11px] tracking-[2px] border transition-all duration-300 ${
                      paymentMethod === m
                        ? "bg-[#c6a75e] border-[#c6a75e] text-black"
                        : "border-neutral-700 text-neutral-400 hover:border-[#c6a75e] hover:text-white"
                    }`}
                  >
                    {m === "COD" ? "CASH" : m.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* UPI SUB OPTIONS */}
              {paymentMethod === "UPI" && (
                <div className="space-y-3">
                  <p className="text-[10px] tracking-[3px] text-neutral-500 mb-4">
                    SELECT UPI APP
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {upiApps.map((app) => (
                      <button
                        key={app}
                        onClick={() => setUpiApp(app)}
                        className={`py-3 px-4 text-[11px] tracking-[2px] border transition-all duration-300 flex items-center gap-3 ${
                          upiApp === app
                            ? "border-[#c6a75e] text-[#c6a75e] bg-[#c6a75e10]"
                            : "border-neutral-800 text-neutral-500 hover:border-neutral-600 hover:text-white"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full border flex-shrink-0 ${
                            upiApp === app
                              ? "bg-[#c6a75e] border-[#c6a75e]"
                              : "border-neutral-600"
                          }`}
                        />
                        {app}
                      </button>
                    ))}
                  </div>

                  <input
                    type="text"
                    placeholder={`Enter ${upiApp} UPI ID`}
                    className="w-full mt-4 bg-transparent border border-neutral-700 px-5 py-4 text-sm focus:outline-none focus:border-[#c6a75e] transition"
                  />
                </div>
              )}

              {/* CARD DETAILS */}
              {paymentMethod === "Credit Card" && (
                <div className="space-y-4">
                  <p className="text-[10px] tracking-[3px] text-neutral-500 mb-4">
                    CARD DETAILS
                  </p>
                  <input
                    type="text"
                    placeholder="4111 1111 1111 1111"
                    maxLength={19}
                    className="w-full bg-transparent border border-neutral-700 px-5 py-4 text-sm focus:outline-none focus:border-[#c6a75e] transition"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM / YY"
                      className="bg-transparent border border-neutral-700 px-5 py-4 text-sm focus:outline-none focus:border-[#c6a75e] transition"
                    />
                    <input
                      type="text"
                      placeholder="CVV"
                      maxLength={3}
                      className="bg-transparent border border-neutral-700 px-5 py-4 text-sm focus:outline-none focus:border-[#c6a75e] transition"
                    />
                  </div>
                </div>
              )}

              {/* COD MESSAGE */}
              {paymentMethod === "COD" && (
                <div className="border border-neutral-800 px-5 py-4 text-sm text-neutral-400 flex items-center gap-3">
                  <span className="text-[#c6a75e] text-lg">₹</span>
                  Pay with cash when your order is delivered.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT — ORDER SUMMARY */}
        <div className="border border-neutral-800 p-10 h-fit">
          <h2 className="text-xl font-serif mb-8 tracking-wide">
            Order Summary
          </h2>

          <div className="space-y-6 mb-10">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex justify-between text-sm border-b border-neutral-800 pb-4"
              >
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span>₹ {item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between text-lg mb-10 font-light">
            <span>Total</span>
            <span className="text-[#c6a75e]">₹ {totalPrice}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="w-full bg-[#c6a75e] text-black py-4 tracking-widest text-xs hover:opacity-90 transition"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
