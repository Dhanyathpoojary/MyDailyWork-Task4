import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Success() {
  const navigate = useNavigate();

  // Generate random order ID
  const orderId = Math.random().toString(36).substring(2, 10).toUpperCase();

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center">
        {/* Check Icon */}
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 border border-[#c6a75e] rounded-full flex items-center justify-center text-[#c6a75e] text-3xl">
            ✓
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl font-serif font-light mb-6 tracking-wide">
          Order Confirmed
        </h1>

        <p className="text-neutral-400 text-sm leading-relaxed mb-10">
          Thank you for your purchase. Your order has been successfully placed
          and is being prepared with care. Estimated delivery within 3–5
          business days.
        </p>

        {/* Order ID Box */}
        <div className="border border-neutral-800 py-6 mb-12">
          <p className="text-xs tracking-[3px] text-neutral-500 mb-3">
            ORDER ID
          </p>
          <p className="text-lg font-serif text-[#c6a75e]">#{orderId}</p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button
            onClick={() => navigate("/")}
            className="bg-[#c6a75e] text-black px-8 py-3 text-xs tracking-[3px] hover:opacity-90 transition"
          >
            CONTINUE SHOPPING
          </button>

          <button
            onClick={() => navigate("/orders")}
            className="border border-neutral-700 px-8 py-3 text-xs tracking-[3px] hover:bg-neutral-900 transition"
          >
            VIEW ORDERS
          </button>
        </div>
      </div>
    </div>
  );
}

export default Success;
