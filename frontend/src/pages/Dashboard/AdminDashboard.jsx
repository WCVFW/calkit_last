import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import AdminEmployees from "./AdminEmployees";
import { HiOutlineUser } from "react-icons/hi"; // Person icon

const adminNavItems = [
  { to: "/dashboard/admin", label: "Home", end: true },
  { to: "/dashboard/admin/employees", label: "Employees" },
  { to: "/dashboard/admin/crm", label: "CRM" },
  { to: "/dashboard/admin/reports", label: "Reports" },
  { to: "/dashboard/admin/workflow-analytics", label: "Analytics" },
  { to: "/dashboard/admin/orders", label: "Orders" },
];

export default function AdminDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between px-6 py-4 max-w-[1440px] mx-auto">
          {/* Logo */}
          <div className="text-2xl font-extrabold text-[#0080FF]">
            A<span className="text-gray-700">DMIN</span>
          </div>

          {/* NavItems for desktop */}
          <nav className="hidden gap-3 mt-3 md:flex md:mt-0">
            {adminNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `px-3 py-1.5 text-sm rounded-md transition ${
                    isActive
                      ? "bg-[#E6F3FF] text-[#0080FF] font-semibold"
                      : "text-gray-600 hover:text-[#2E96FF] hover:bg-gray-100"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Account Dropdown */}
          <div className="relative mt-3 md:mt-0">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
            >
              <HiOutlineUser className="w-6 h-6 text-gray-700" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 z-50 w-48 py-2 mt-2 bg-white border rounded shadow-md">
                <a
                  href="/dashboard/admin/profile"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  My Account
                </a>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Nav */}
        <nav className="flex flex-wrap gap-2 px-6 py-3 bg-white shadow-sm md:hidden">
          {adminNavItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `px-3 py-1.5 text-sm rounded-md transition ${
                  isActive
                    ? "bg-[#E6F3FF] text-[#0080FF] font-semibold"
                    : "text-gray-600 hover:text-[#2E96FF] hover:bg-gray-100"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6 max-w-[1440px] mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
