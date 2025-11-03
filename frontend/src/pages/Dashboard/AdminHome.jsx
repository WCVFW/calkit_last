import React from "react";
import { getUser } from "../../lib/auth";

export default function AdminHome() {
  const user = getUser();
  const name = user?.fullName || user?.name || user?.email || "Admin";

  return (
    <div className="max-w-4xl mx-auto">
      <div className="p-6 bg-white border rounded-md shadow-sm">
        <h1 className="text-2xl font-semibold text-gray-800">Welcome, {name}</h1>
        <p className="mt-2 text-sm text-gray-600">This is the Admin Home. Use the navigation above to manage employees, reports and more.</p>
      </div>

      {/* Quick summary / placeholders (non-invasive) */}
      <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="p-4 bg-white border rounded-md shadow-sm">
          <div className="text-xs text-gray-500">Active Employees</div>
          <div className="mt-2 text-xl font-bold text-gray-800">—</div>
        </div>
        <div className="p-4 bg-white border rounded-md shadow-sm">
          <div className="text-xs text-gray-500">Open Orders</div>
          <div className="mt-2 text-xl font-bold text-gray-800">—</div>
        </div>
        <div className="p-4 bg-white border rounded-md shadow-sm">
          <div className="text-xs text-gray-500">Pending Alerts</div>
          <div className="mt-2 text-xl font-bold text-gray-800">—</div>
        </div>
      </div>
    </div>
  );
}
