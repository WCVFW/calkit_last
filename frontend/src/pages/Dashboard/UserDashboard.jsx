import React, { useState, useEffect, useRef } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { clearToken, clearUser } from "../../lib/auth";

const navItems = [
  { to: "/dashboard/user/Home", label: "Home", end: true },
  { to: "/dashboard/user/my-orders", label: "My Orders" },
  { to: "/dashboard/user/compliances", label: "Compliances" },
  { to: "/dashboard/user/servicehub", label: "Service Hub" },
  { to: "/dashboard/user/crm", label: "CRM" },
  { to: "/dashboard/user/calendar", label: "Calendar" },
  { to: "/dashboard/user/documents", label: "Documents" },
  { to: "/dashboard/user/consult", label: "Consult" },
];

export default function UserDashboard() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const menuRef = useRef(null);
  const nav = useNavigate();

  const handleLogout = () => {
    clearToken();
    clearUser();
    nav("/");
  };

  const handleMyAccount = () => {
    setMenuOpen(false);
    nav("/dashboard/user/profile");
  };

  // Close dropdown and mobile nav on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 max-w-[1440px] mx-auto">
          {/* Left: Logo */}
          <div className="text-2xl font-extrabold text-[#0080FF]">LOGO</div>

          {/* Center: Desktop Nav */}
          <nav className="items-center justify-center flex-1 hidden gap-4 md:flex">
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

          {/* Right: User Icon + Mobile Menu Toggle */}
          <div className="flex items-center gap-2">
            {/* Account Menu */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                aria-label="Account"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-gray-700"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>

              {menuOpen && (
                <div className="absolute right-0 z-20 py-2 mt-2 bg-white border rounded shadow-md w-44">
                  <button
                    onClick={handleMyAccount}
                    className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
                  >
                    My Account
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Hamburger Button (Mobile) */}
            <button
              className="p-2 text-gray-700 rounded-lg md:hidden hover:bg-gray-100"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              aria-label="Toggle navigation"
            >
              {mobileNavOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation (slide-down menu) */}
        {mobileNavOpen && (
          <div className="bg-white border-t shadow-sm md:hidden animate-slideDown">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setMobileNavOpen(false)}
                className={({ isActive }) =>
                  `block px-6 py-3 text-sm transition ${
                    isActive
                      ? "bg-[#E6F3FF] text-[#0080FF] font-semibold"
                      : "text-gray-700 hover:bg-gray-100 hover:text-[#2E96FF]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      {/* ================= Main Content ================= */}
      <main className="flex-1 p-4 sm:p-6 max-w-[1440px] mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}

