import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Payment() {
  const navigate = useNavigate();
  const { setCart } = useCart();
  const location = useLocation();

  const { customer, paymentMethod } = location.state || {};

  const handlePayment = () => {
    setCart([]);
    navigate("/success");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#020617] to-[#0f172a] flex items-center justify-center text-white">
      <div className="bg-slate-900 p-12 rounded-3xl shadow-2xl w-[450px]">
        <h1 className="text-3xl font-light text-center mb-10">
          Confirm Your Order
        </h1>

        <div className="space-y-4 text-slate-300">
          <div className="flex justify-between">
            <span>Name</span>
            <span className="text-white">{customer?.name}</span>
          </div>

          <div className="flex justify-between">
            <span>Phone</span>
            <span className="text-white">{customer?.phone}</span>
          </div>

          <div className="flex justify-between">
            <span>Payment</span>
            <span className="text-white">{paymentMethod}</span>
          </div>
        </div>

        <button
          onClick={handlePayment}
          className="w-full mt-12 bg-green-500 py-4 rounded-xl text-lg font-medium hover:bg-green-600 transition"
        >
          Pay & Place Order
        </button>
      </div>
    </div>
  );
}

export default Payment;
