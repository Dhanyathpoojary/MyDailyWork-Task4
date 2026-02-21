import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await axios.post("http://localhost:5000/api/auth/register", form);
      navigate("/login");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0e0e] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* HEADER */}
        <div className="mb-12 text-center">
          <p className="text-[#c6a75e] tracking-[6px] text-[10px] mb-3">
            JOIN US
          </p>
          <h2 className="text-4xl font-serif font-light tracking-wide">
            Create Account
          </h2>
          <div className="w-14 h-px bg-[#c6a75e] mx-auto mt-5" />
        </div>

        <form
          onSubmit={handleRegister}
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
              FULL NAME
            </p>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              autoComplete="off" // disable autofill for name
              className="w-full bg-transparent border border-neutral-700 px-5 py-4 text-sm focus:outline-none focus:border-[#c6a75e] transition"
            />
          </div>

          <div>
            <p className="text-[10px] tracking-[3px] text-neutral-500 mb-2">
              EMAIL
            </p>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
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
              name="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              autoComplete="new-password" // prevents password autofill
              className="w-full bg-transparent border border-neutral-700 px-5 py-4 text-sm focus:outline-none focus:border-[#c6a75e] transition"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#c6a75e] text-black py-4 text-xs tracking-[3px] hover:opacity-90 transition mt-2"
          >
            CREATE ACCOUNT
          </button>

          <p className="text-center text-xs text-neutral-500 pt-2">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#c6a75e] hover:opacity-80 transition"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
