import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [signupComplete, setSignupComplete] = useState(false);
  const nav = useNavigate();

  // Validation helpers
  const isValidEmail = (v) => /\S+@\S+\.\S+/.test(v);
  const isValidPhone = (v) => /^[0-9+\-() ]{7,20}$/.test(v); // Match backend validation

  const submit = async (e) => {
    e.preventDefault();
    setMessage(null);

    // Frontend validation
    if (!fullName || !email || !phone || !password) {
      return setMessage("All fields are required");
    }
    if (fullName.length < 2 || fullName.length > 100) {
      return setMessage("Full name must be between 2 and 100 characters");
    }
    if (!isValidEmail(email)) return setMessage("Enter a valid email");
    if (!isValidPhone(phone)) return setMessage("Enter a valid phone number");
    if (password.length < 8)
      return setMessage("Password must be at least 8 characters");

    setLoading(true);
    try {
      // Create account on backend
      await axios.post("/api/auth/signup", { fullName, email, phone, password });

      // Request OTP for email verification (sent via email only)
      try {
        await axios.post("/api/auth/request-email-otp", { email });
      } catch (e) {
        console.warn("Could not send OTP email:", e?.message || e);
      }

      setMessage("Signup successful! We've sent a verification code to your email.");
      setSignupComplete(true);

      // Clear password field
      setPassword("");

      // Redirect user to verification page with email pre-filled
      nav(`/verify-otp?email=${encodeURIComponent(email)}`);
    } catch (err) {
      setMessage(
        err?.response?.data?.error || err?.response?.data?.message || "Signup failed. Try again later"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded shadow-lg">
        <h2 className="mb-6 text-xl font-semibold text-center">
          Create New Account
        </h2>

        <form onSubmit={submit}>
            <label className="block text-sm font-medium text-slate-700">
              Full Name
            </label>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              disabled={loading}
              className="mt-2 w-full border border-slate-300 px-3 py-2 rounded focus:ring-[#003366] focus:border-[#003366] outline-none disabled:bg-slate-100"
              placeholder="Full name"
            />

            <label className="block mt-4 text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="mt-2 w-full border border-slate-300 px-3 py-2 rounded focus:ring-[#003366] focus:border-[#003366] outline-none disabled:bg-slate-100"
              placeholder="you@domain.com"
            />

            <label className="block mt-4 text-sm font-medium text-slate-700">
              Phone
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={loading}
              className="mt-2 w-full border border-slate-300 px-3 py-2 rounded focus:ring-[#003366] focus:border-[#003366] outline-none disabled:bg-slate-100"
              placeholder="e.g. 9876543210"
            />

            <label className="block mt-4 text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              className="mt-2 w-full border border-slate-300 px-3 py-2 rounded focus:ring-[#003366] focus:border-[#003366] outline-none disabled:bg-slate-100"
              placeholder="Choose a password"
            />

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full bg-[#003366] text-white py-2 rounded transition-colors hover:bg-[#002244] disabled:bg-slate-400"
            >
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </form>

        {message && (
          <div
            className={`mt-4 p-3 rounded text-sm ${
              message.toLowerCase().includes("success") ||
              message.toLowerCase().includes("signup successful")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
