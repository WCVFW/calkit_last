import React from "react";
import { getUser, clearUser, clearToken } from "../lib/auth";
import { useNavigate } from "react-router-dom";

export default function Account() {
  const user = getUser();
  const nav = useNavigate();

  const logout = () => {
    clearToken();
    clearUser();
    window.dispatchEvent(new Event("auth:update"));
    nav("/login");
  };

  return (
    <div className="max-w-3xl py-10 mx-auto">
      <div className="p-6 bg-white rounded shadow">
        <h2 className="mb-4 text-xl font-semibold">My Account</h2>
        {!user ? (
          <p className="text-sm text-slate-600">No user data. Please login.</p>
        ) : (
          <div className="space-y-3">
            <div>
              <p className="text-sm text-slate-500">Name</p>
              <p className="font-medium">{user.name || "-"}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Phone</p>
              <p className="font-medium">{user.phone || "-"}</p>
            </div>
            <div className="pt-4">
              <button onClick={logout} className="bg-[#003366] text-white px-4 py-2 rounded">Logout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
