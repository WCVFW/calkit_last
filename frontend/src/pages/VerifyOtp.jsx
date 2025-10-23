import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function VerifyEmail() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [searchParams] = useSearchParams();
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) setEmail(emailParam);
  }, [searchParams]);

  const verify = async (e) => {
    e?.preventDefault?.();
    if (!email || !code) return setMessage("Enter email and code");
    setLoading(true);
    try {
      await axios.post("/api/auth/verify-email", { email, code });
      setMessage("Email verified. You can now login.");
      setTimeout(() => nav("/login"), 1200);
    } catch (err) {
      setMessage(err?.response?.data?.error || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Verify Email</h2>
      <form onSubmit={verify}>
        <label className="block text-sm font-medium text-slate-700">
          Email
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full border px-3 py-2 rounded"
          placeholder="you@domain.com"
        />
        <label className="block text-sm font-medium text-slate-700 mt-4">
          OTP Code
        </label>
        <input
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="mt-2 w-full border px-3 py-2 rounded"
          placeholder="6-digit code"
        />
        <button
          disabled={loading}
          className="mt-4 w-full bg-[#003366] text-white py-2 rounded"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </form>
      {message && <div className="mt-3 text-sm text-slate-600">{message}</div>}
    </div>
  );
}
