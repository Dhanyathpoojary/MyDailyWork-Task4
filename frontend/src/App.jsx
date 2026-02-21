import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import { CartProvider } from "./context/CartContext";
import { AuthProvider, AuthContext } from "./context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" />;
  return children;
}

function Navbar() {
  const location = useLocation();

  const links = [
    { to: "/", label: "Home" },
    { to: "/cart", label: "Cart" },
    { to: "/orders", label: "Orders" },
    { to: "/login", label: "Login" },
    { to: "/register", label: "Register" },
  ];

  return (
    <nav className="border-b border-neutral-800 bg-[#0e0e0e] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-lg font-serif font-light tracking-[8px] text-white hover:text-[#c6a75e] transition duration-300 cursor-pointer">
            VELORA
          </h1>
        </Link>

        <div className="flex gap-8 text-[11px] tracking-[3px]">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`transition-all duration-300 pb-0.5 ${
                location.pathname === to
                  ? "text-[#c6a75e] border-b border-[#c6a75e]"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              {label.toUpperCase()}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="bg-[#0e0e0e] text-white min-h-screen">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/payment/:id" element={<Payment />} />
              <Route path="/success" element={<Success />} />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route path="/payment" element={<Payment />} />
              <Route
                path="/orders"
                element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
