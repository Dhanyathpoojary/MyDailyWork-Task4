import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import axios from "axios";

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const checkout = async () => {
    await axios.post("http://localhost:5000/api/orders", {
      user: "YOUR_USER_ID",
      products: cart.map((item) => ({
        product: item._id,
        quantity: 1,
      })),
      totalAmount: total,
    });

    alert("Order placed successfully!");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Cart</h2>

      {cart.map((item) => (
        <div key={item._id}>
          {item.name} - ₹ {item.price}
          <button onClick={() => removeFromCart(item._id)}>Remove</button>
        </div>
      ))}

      <h3>Total: ₹ {total}</h3>
      <button onClick={checkout}>Checkout</button>
    </div>
  );
}

export default Cart;
