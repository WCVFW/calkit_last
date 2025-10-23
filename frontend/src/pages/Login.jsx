import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setToken, setUser } from "../lib/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [mode, setMode] = useState("password"); // 'password' | 'phone'
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const nav = useNavigate();

  const loginPassword = async (e) => {
    e.preventDefault();
    if (!email || !password) return setMessage("Enter email and password");
    setLoading(true);
    try {
      const r = await axios.post("/api/auth/login", { email, password });
      setToken(r.data.token);
      setUser(r.data.user);
      window.dispatchEvent(new Event("auth:update"));
      nav("/dashboard");
    } catch (err) {
      setMessage(err?.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const sendPhoneOtp = async (e) => {
    e.preventDefault();
    if (!/^[0-9+\-() ]{7,20}$/.test(phone))
      return setMessage("Enter a valid phone number");
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/login-phone", { phone });
      setGeneratedOtp(response.data.code || "");
      setOtpSent(true);
      setMessage("OTP sent! Check the code displayed below.");
    } catch (err) {
      const errMsg = err?.response?.data?.error || err?.message || "Failed to send OTP";
      setMessage(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const verifyPhoneOtp = async (e) => {
    e.preventDefault();
    if (!otp) return setMessage("Enter OTP");
    setLoading(true);
    try {
      const r = await axios.post("/api/auth/verify-phone", {
        phone,
        code: otp,
      });
      setToken(r.data.token);
      setUser(r.data.user);
      window.dispatchEvent(new Event("auth:update"));
      nav("/dashboard");
    } catch (err) {
      setMessage(err?.response?.data?.error || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100"> 
      <div className="w-full max-w-md p-6 bg-white rounded shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-center">Login</h2>
        <div className="flex gap-2 mb-4">
          <button
            className={`flex-1 px-3 py-2 rounded transition-colors ${
              mode === "password"
                ? "bg-[#003366] text-white hover:bg-[#002244]"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
            onClick={() => {
              setMode("password");
              setOtpSent(false);
              setMessage(null);
            }}
          >
            Email & Password
          </button>
          <button
            className={`flex-1 px-3 py-2 rounded transition-colors ${
              mode === "phone"
                ? "bg-[#003366] text-white hover:bg-[#002244]"
                : "bg-slate-100 hover:bg-slate-200 text-slate-700"
            }`}
            onClick={() => {
              setMode("phone");
              setMessage(null);
            }}
          >
            Phone OTP
          </button>
        </div>

        {mode === "password" ? (
          <form onSubmit={loginPassword}>
            <label className="block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full border border-slate-300 px-3 py-2 rounded focus:ring-[#003366] focus:border-[#003366] outline-none"
              placeholder="you@domain.com"
            />
            <label className="block mt-4 text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full border border-slate-300 px-3 py-2 rounded focus:ring-[#003366] focus:border-[#003366] outline-none"
              placeholder="Your password"
            />
            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full bg-[#003366] text-white py-2 rounded transition-colors hover:bg-[#002244] disabled:bg-slate-400"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        ) : (
          <form onSubmit={otpSent ? verifyPhoneOtp : sendPhoneOtp}>
            <label className="block text-sm font-medium text-slate-700">
              Phone
            </label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              disabled={otpSent}
              className={`mt-2 w-full border border-slate-300 px-3 py-2 rounded focus:ring-[#003366] focus:border-[#003366] outline-none ${
                otpSent ? "bg-slate-50" : ""
              }`}
              placeholder="e.g. 9876543210"
            />

            {otpSent && generatedOtp && (
              <div className="p-4 mt-4 border border-blue-200 rounded-lg bg-blue-50">
                <p className="mb-2 text-sm font-medium text-blue-900">
                  Phone: +{phone}
                </p>
                <p className="mb-3 text-xs text-blue-700">
                  Your verification code:
                </p>
                <div className="p-3 text-center bg-blue-100 border-2 border-blue-300 rounded">
                  <p className="text-2xl font-bold text-[#003366] tracking-wider">
                    {generatedOtp}
                  </p>
                </div>
                <p className="mt-3 text-xs text-blue-700">
                  Code expires in 5 minutes
                </p>
              </div>
            )}

            {otpSent && (
              <>
                <label className="block mt-4 text-sm font-medium text-slate-700">
                  Enter OTP
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  maxLength="6"
                  className="mt-2 w-full border border-slate-300 px-3 py-2 rounded focus:ring-[#003366] focus:border-[#003366] outline-none text-center text-2xl tracking-widest"
                  placeholder="000000"
                />
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full bg-[#003366] text-white py-2 rounded transition-colors hover:bg-[#002244] disabled:bg-slate-400"
            >
              {loading
                ? otpSent
                  ? "Verifying..."
                  : "Sending..."
                : otpSent
                ? "Verify"
                : "Send OTP"}
            </button>

            {otpSent && (
              <button
                type="button"
                onClick={() => {
                  setOtpSent(false);
                  setOtp("");
                  setGeneratedOtp(null);
                  setMessage(null);
                }}
                className="mt-3 w-full border border-[#003366] text-[#003366] py-2 rounded transition-colors hover:bg-blue-50"
              >
                Use Different Phone
              </button>
            )}
          </form>
        )}
        {message && (
          <div
            className={`mt-4 p-3 rounded text-sm ${
              message.includes("success") || message.includes("sent")
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
