import { useEffect, useState } from "react";
import axios from "axios";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const statusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "text-green-400 border-green-400";
      case "shipped":
        return "text-blue-400 border-blue-400";
      case "cancelled":
        return "text-red-400 border-red-400";
      default:
        return "text-[#c6a75e] border-[#c6a75e]";
    }
  };

  return (
    <div className="bg-[#0e0e0e] min-h-screen text-white py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-[#c6a75e] tracking-[6px] text-[10px] mb-3">
          YOUR HISTORY
        </p>
        <h1 className="text-4xl font-serif font-light tracking-wide mb-3">
          My Orders
        </h1>
        <div className="w-14 h-px bg-[#c6a75e] mb-14" />

        {loading && (
          <div className="flex flex-col items-center py-32">
            <div className="w-7 h-7 border border-[#c6a75e] border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-neutral-500 tracking-widest text-xs">
              LOADING...
            </p>
          </div>
        )}

        {!loading && orders.length === 0 && (
          <div className="flex flex-col items-center py-32 text-center">
            <div className="w-12 h-px bg-[#c6a75e] mb-6" />
            <p className="text-neutral-500 tracking-widest text-xs">
              NO ORDERS YET
            </p>
            <div className="w-12 h-px bg-[#c6a75e] mt-6" />
          </div>
        )}

        {!loading && orders.length > 0 && (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <div
                key={order._id}
                className="border border-neutral-800 hover:border-[#c6a75e] transition-all duration-300"
              >
                <div className="flex flex-wrap justify-between items-center gap-4 px-7 py-4 bg-[#111] border-b border-neutral-800">
                  <div className="flex items-center gap-4">
                    <span className="text-[#c6a75e] font-serif">
                      #{String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs text-neutral-500 font-mono">
                      {order._id}
                    </span>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="text-xs text-neutral-400">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span
                      className={`text-[10px] tracking-[2px] border px-3 py-1 ${statusColor(order.status)}`}
                    >
                      {order.status?.toUpperCase() || "PROCESSING"}
                    </span>
                  </div>
                </div>

                <div className="px-7 py-5 space-y-4">
                  {order.products?.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 border-b border-neutral-900 pb-4 last:border-0 last:pb-0"
                    >
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-14 h-14 object-cover border border-neutral-800 flex-shrink-0"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/100?text=N/A";
                        }}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-serif font-light">
                          {item.title}
                        </p>
                        <p className="text-neutral-500 text-xs mt-0.5">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-[#c6a75e] font-serif text-sm">
                        ₹ {item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap justify-between items-center gap-4 px-7 py-4 bg-[#111] border-t border-neutral-800">
                  <p className="text-xs text-neutral-500">
                    {order.address} — {order.paymentMethod}
                  </p>
                  <p className="text-[#c6a75e] font-serif text-lg">
                    ₹ {order.totalAmount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
