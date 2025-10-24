import React from "react";
import AdminEmployees from "./AdminEmployees";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="p-6 bg-white shadow-lg rounded-xl">
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">Overview and administration tools.</p>
      </div>

      <div className="mt-6">
        <AdminEmployees />
      </div>
    </div>
  );
}
