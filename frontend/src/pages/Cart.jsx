import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const shipping = subtotal > 0 ? 199 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-12">
        <h1 className="text-4xl font-serif font-light tracking-wide">
          Shopping Cart
        </h1>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {/* Cart Items */}
        <div className="space-y-10">
          {cart.length === 0 ? (
            <p className="text-neutral-400">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div key={item._id}>
                <div className="flex justify-between items-center">
                  {/* LEFT */}
                  <div className="flex items-center gap-6">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-sm"
                    />

                    <div>
                      <h2 className="text-lg font-serif">{item.title}</h2>

                      <p className="text-[10px] tracking-[2px] uppercase text-neutral-500 mt-1">
                        {item.category}
                      </p>

                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-500 text-xs mt-3 tracking-wide hover:opacity-80"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="text-right">
                    <p className="text-lg text-[#c6a75e] mb-4">₹{item.price}</p>

                    <div className="flex border border-neutral-700 text-sm">
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity - 1)
                        }
                        className="px-4 py-1 hover:bg-neutral-800 transition"
                      >
                        −
                      </button>

                      <div className="px-6 py-1 border-l border-r border-neutral-700">
                        {item.quantity}
                      </div>

                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                        className="px-4 py-1 hover:bg-neutral-800 transition"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="border-b border-neutral-800 mt-8"></div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        {cart.length > 0 && (
          <div className="mt-16 border border-neutral-800 p-8">
            <div className="space-y-4 text-neutral-400 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{shipping.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span>Tax (8%)</span>
                <span>₹{tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-neutral-800 my-6"></div>

            <div className="flex justify-between items-center text-xl font-serif">
              <span>Total</span>
              <span className="text-[#c6a75e]">₹{total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full mt-8 bg-[#c6a75e] text-black py-3 text-xs tracking-[3px] hover:opacity-90 transition"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        )}
      </div>

      <div className="h-20"></div>
    </div>
  );
}

export default Cart;
