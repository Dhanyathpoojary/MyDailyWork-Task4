import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      login(res.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* HEADER */}
        <div className="mb-12 text-center">
          <p className="text-[#c6a75e] tracking-[6px] text-[10px] mb-3">
            WELCOME BACK
          </p>
          <h2 className="text-4xl font-serif font-light tracking-wide">
            Login
          </h2>
          <div className="w-14 h-px bg-[#c6a75e] mx-auto mt-5" />
        </div>

        <form
          onSubmit={handleLogin}
          className="border border-neutral-800 p-10 space-y-6"
          autoComplete="off" // disable autofill for the whole form
        >
          {error && (
            <p className="text-red-400 text-xs tracking-widest text-center">
              {error}
            </p>
          )}

          <div>
            <p className="text-[10px] tracking-[3px] text-neutral-500 mb-2">
              EMAIL
            </p>
            <input
              type="email"
              placeholder="you@example.com"
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off" // disable autofill for email
              className="w-full bg-transparent border border-neutral-700 px-5 py-4 text-sm focus:outline-none focus:border-[#c6a75e] transition"
            />
          </div>

          <div>
            <p className="text-[10px] tracking-[3px] text-neutral-500 mb-2">
              PASSWORD
            </p>
            <input
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password" // prevents password autofill
              className="w-full bg-transparent border border-neutral-700 px-5 py-4 text-sm focus:outline-none focus:border-[#c6a75e] transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#c6a75e] text-black py-4 text-xs tracking-[3px] hover:opacity-90 transition mt-4"
          >
            LOGIN
          </button>

          <p className="text-center text-xs text-neutral-500 pt-2">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#c6a75e] hover:opacity-80 transition"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
