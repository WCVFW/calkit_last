import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { clearToken, clearUser } from "../../lib/auth";

const navItems = [
  { to: "/dashboard/user", label: "Home", end: true },
  { to: "/dashboard/user/compliances", label: "Compliances" },
  { to: "/dashboard/user/servicehub", label: "Service Hub" },
  { to: "/dashboard/user/crm", label: "CRM" },
  { to: "/dashboard/user/calendar", label: "Calendar" },
  { to: "/dashboard/user/documents", label: "Documents" },
  { to: "/dashboard/user/reports", label: "Reports" },
  { to: "/dashboard/user/consult", label: "Consult" },
];

export default function UserDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    clearToken();
    clearUser();
    window.location.href = "/login";
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* ================= HEADER ================= */}
      <header className="bg-white shadow-sm">
        <div className="flex items-center justify-between px-6 py-4 max-w-[1440px] mx-auto">
          {/* Logo on the Left */}
          <div className="text-2xl font-extrabold text-[#0080FF]">
            L<span className="text-gray-700">OGO</span>
          </div>

          {/* Center Navigation */}
          <nav className="flex items-center justify-center flex-1 gap-4">
            {navItems.map((item) => (
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

          {/* Person Icon on the Right */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
              aria-label="Account"
            >
              <svg
                className="w-6 h-6 text-gray-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5.121 17.804A9 9 0 1118.879 6.196 9 9 0 015.12 17.804z"
                />
              </svg>
            </button>

            {menuOpen && (
              <div className="absolute right-0 py-2 mt-2 bg-white border rounded shadow-md w-44">
                <a
                  href="/dashboard/profile"
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
      </header>

      {/* ================= Main Content ================= */}
      <main className="flex-1 p-6 max-w-[1440px] mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
