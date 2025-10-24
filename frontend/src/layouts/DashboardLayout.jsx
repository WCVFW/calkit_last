import { Outlet, NavLink } from "react-router-dom";
import { useState } from "react";
import { clearToken, clearUser, getUser } from "../lib/auth";
// Assuming you have an icon library, e.g., using Heroicons or a custom SVG
// For this example, I'll use a simple SVG for the menu button

export default function DashboardLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currentUser = getUser();
  const role = currentUser?.role || "USER";

  // Define common link styles
  const navLinkClass = ({ isActive }) =>
    `text-sm md:text-base transition-colors duration-200 py-1.5 px-3 rounded-lg ${
      isActive
        ? "text-[#0080FF] font-semibold bg-[#E6F3FF]"
        : "text-gray-600 hover:text-[#2E96FF] hover:bg-gray-100"
    }`;

  // Build navigation items depending on role
  const commonItems = [
    { to: "/dashboard", label: "Home", end: true },
    { to: "/dashboard/servicehub", label: "Service Hub" },
    { to: "/dashboard/calendar", label: "Calendar" },
  ];

  let navItems = [];
  if (role === "ADMIN") {
    navItems = [
      { to: "/dashboard/admin", label: "Admin Home" },
      { to: "/dashboard/admin/employees", label: "Employees" },
      { to: "/dashboard/reports", label: "Reports" },
      { to: "/dashboard/documents", label: "Documents" },
    ];
  } else if (role === "EMPLOYEE") {
    navItems = [
      { to: "/dashboard/employee", label: "Employee Home" },
      { to: "/dashboard/employee/tasks", label: "Tasks" },
      { to: "/dashboard/crm", label: "CRM" },
    ];
  } else {
    // Regular user
    navItems = [
      { to: "/dashboard", label: "Home", end: true },
      { to: "/dashboard/compliances", label: "Compliances" },
      { to: "/dashboard/servicehub", label: "Service Hub" },
      { to: "/dashboard/consult", label: "Consult" },
    ];
  }

  // Merge common items where appropriate
  if (role === "ADMIN") navItems = navItems.concat(commonItems);
  if (role === "EMPLOYEE") navItems = navItems.concat(commonItems);

  // Account controls (right-side)
  // We display an account icon with dropdown for profile/logout

  // attach logout handler once DOM is available
  if (typeof window !== 'undefined') {
    window.addEventListener('click', function(e) {
      if (e.target && e.target.id === 'logout-link') {
            clearToken();
        clearUser();
        window.dispatchEvent(new Event('auth:update'));
        window.location.href = '/login';
      }
    });
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
          {/* Logo */}
          <div className="w-auto text-[#0080FF] font-extrabold text-2xl">
            L<span className="text-gray-700">OGO</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="items-center hidden gap-2 lg:flex xl:gap-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={navLinkClass}
                end={item.end}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Account icon (desktop) */}
          <div className="items-center hidden gap-3 lg:flex">
            <div className="relative">
              <button
                id="account-btn"
                onClick={() => {
                  const menu = document.getElementById('account-menu');
                  if (menu) menu.classList.toggle('hidden');
                }}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200"
                aria-label="Account"
              >
                <svg className="w-6 h-6 text-gray-700" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A9 9 0 1118.879 6.196 9 9 0 015.12 17.804z"></path>
                </svg>
              </button>

              <div id="account-menu" className="absolute right-0 hidden py-2 mt-2 bg-white border rounded shadow-md w-44">
                <a href="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Account</a>
                <button id="logout-link" className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100">Logout</button>
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Menu Button (Visible below large screens) */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0080FF]"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {/* Menu Icon (Hamburger) */}
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                ></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Dropdown Menu (Conditionally Rendered) */}
        {isMenuOpen && (
          <div className="bg-white border-t border-gray-100 shadow-inner lg:hidden">
            <nav className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={navLinkClass}
                  end={item.end}
                  onClick={() => setIsMenuOpen(false)} // Close menu on link click
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-[1440px] mx-auto w-full">
        <Outlet />
      </main>
    </div>
  );
}
