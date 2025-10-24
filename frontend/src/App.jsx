import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

/* ---------------------- Pages ---------------------- */
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import TalkToCA from "./pages/ConsultanExpert/talkToCA";
import TalkToIP from "./pages/ConsultanExpert/talkToIP";

/* ---------------------- Dashboard ---------------------- */
import DashboardIndex from "./pages/DashboardIndex";
import CompliancesPage from "./pages/Dashboard/CompliancesPage";
import CrmPage from "./pages/Dashboard/CrmPage";
import CalendarPage from "./pages/Dashboard/CalendarPage";
import DocumentsPage from "./pages/Dashboard/DocumentsPage";
import ReportsPage from "./pages/Dashboard/ReportsPage";
import ConsultPage from "./pages/Dashboard/ConsultPage";
import ServicesHub from "./pages/Dashboard/ServiceHub";
import MyAccount from "./pages/MyAccount";

/* ---------------------- Dashboards ---------------------- */
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import EmployeeDashboard from "./pages/Dashboard/EmployeeDashboard";
import UserDashboard from "./pages/Dashboard/UserDashboard";
const AdminEmployees = React.lazy(() => import("./pages/Dashboard/AdminEmployees"));

/* ---------------------- Components ---------------------- */
import ProtectedRoute from "./components/ProtectedRoute";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PageLoader from "./components/PageLoader";
import ServiceLoader from "./pages/ServiceLoader";
import CheckoutModal from "./components/CheckoutModal";

/* ---------------------- Auth ---------------------- */
import { initAuth, getUser, clearToken, clearUser } from "./lib/auth";

/* ===============================
   🔹 MAIN APP COMPONENT
   =============================== */
export default function App() {
  const [user, setUser] = useState(null);
  const [pageLoading, setPageLoading] = useState(false);

  const location = useLocation();

  // Initialize auth state
  useEffect(() => {
    const u = initAuth();
    setUser(u);

    const handler = () => setUser(getUser());
    window.addEventListener("auth:update", handler);
    return () => window.removeEventListener("auth:update", handler);
  }, []);

  // Logout function
  const logout = () => {
    clearToken();
    clearUser();
    setUser(null);
    window.dispatchEvent(new Event("auth:update"));
  };

  // Page loading effect
  useEffect(() => {
    setPageLoading(true);
    const timer = setTimeout(() => setPageLoading(false), 300);
    return () => clearTimeout(timer);
  }, [location]);

  // Hide header/footer on login/signup/consult pages
  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/ConsultanExpert/talkToIP";

  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-50 text-slate-900">
      <PageLoader show={pageLoading} />
      {!hideLayout && <Header user={user} logout={logout} />}

      <main className="container flex-1 mx-auto">
        <Routes>
          {/* ---------------------- Public Pages ---------------------- */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/ConsultanExpert/talkToCA" element={<TalkToCA />} />
          <Route path="/ConsultanExpert/talkToIP" element={<TalkToIP />} />

          {/* ---------------------- Dashboard Router ---------------------- */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardRouter user={user} />
              </ProtectedRoute>
            }
          />

          {/* ---------------------- USER DASHBOARD ---------------------- */}
          <Route
            path="/dashboard/user"
            element={
              <ProtectedRoute allowedRoles={["USER"]}>
                <UserDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardIndex />} />
            <Route path="compliances" element={<CompliancesPage />} />
            <Route path="servicehub" element={<ServicesHub />} />
            <Route path="crm" element={<CrmPage />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="consult" element={<ConsultPage />} />
            <Route path="profile" element={<MyAccount />} />
          </Route>

          {/* ---------------------- ADMIN DASHBOARD ---------------------- */}
          <Route
            path="/dashboard/admin"
            element={
              <ProtectedRoute allowedRoles={["ADMIN"]}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<div>Admin Home Overview</div>} />
            <Route path="employees" element={<AdminEmployees />} />
            <Route path="profile" element={<MyAccount />} />
          </Route>

          {/* ---------------------- EMPLOYEE DASHBOARD ---------------------- */}
          <Route
            path="/dashboard/employee"
            element={
              <ProtectedRoute allowedRoles={["EMPLOYEE"]}>
                <EmployeeDashboard />
              </ProtectedRoute>
            }
          />

          {/* ---------------------- Fallback / Loader ---------------------- */}
          <Route path="*" element={<ServiceLoader />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}
      <CheckoutModal />
    </div>
  );
}

/* ===============================
   🔹 ROLE-BASED DASHBOARD ROUTER
   =============================== */
function DashboardRouter({ user }) {
  if (!user) return <DashboardIndex />;

  switch (user.role) {
    case "ADMIN":
      return <AdminDashboard />;
    case "EMPLOYEE":
      return <EmployeeDashboard />;
    case "USER":
      return <UserDashboard />;
    default:
      return <ServiceLoader />;
  }
}
