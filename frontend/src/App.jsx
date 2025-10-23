import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import HomePage from "./pages/Dashboard/HomePage";
import CompliancesPage from "./pages/Dashboard/CompliancesPage";
import CrmPage from "./pages/Dashboard/CrmPage";
import CrmDashboard from "./pages/Dashboard/CrmDashboard";
import OrderDetailPage from "./pages/Dashboard/OrderDetailPage";
import WorkflowAnalytics from "./pages/Dashboard/WorkflowAnalytics";
import LeadManagementPage from "./pages/Dashboard/LeadManagementPage";
import CalendarPage from "./pages/Dashboard/CalendarPage";
import DocumentsPage from "./pages/Dashboard/DocumentsPage";
import ReportsPage from "./pages/Dashboard/ReportsPage";
import ConsultPage from "./pages/Dashboard/ConsultPage";
import UsersPage from "./pages/Dashboard/UsersPage";
import Placeholder from "./pages/Placeholder";
import ServiceLoader from "./pages/ServiceLoader";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import VerifyOtp from "./pages/VerifyOtp";
import TalkToCA from "./pages/ConsultanExpert/talkToCA";
import TalkToIP from "./pages/ConsultanExpert/talkToIP";
import { initAuth, getUser, clearToken, clearUser } from "./lib/auth";
import PageLoader from "./components/PageLoader";
import ServicesHub from "./pages/Dashboard/ServiceHub";
import CheckoutModal from "./components/CheckoutModal";

export default function App() {
  const [user, setUser] = useState(null);
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    const u = initAuth();
    setUser(u);

    const handler = () => setUser(getUser());
    window.addEventListener("auth:update", handler);

    return () => window.removeEventListener("auth:update", handler);
  }, []);

  function logout() {
    clearToken();
    clearUser();
    setUser(null);
    window.dispatchEvent(new Event("auth:update"));
  }

  const location = useLocation();

  useEffect(() => {
    setPageLoading(true);
    const t = setTimeout(() => setPageLoading(false), 350);
    return () => clearTimeout(t);
  }, [location]);

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname.startsWith("/dashboard") ||
    location.pathname === "/ConsultanExpert/talkToIP";

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <PageLoader show={pageLoading} />
      {!hideLayout && <Header user={user} logout={logout} />}
      <main className="flex-1 container mx-auto">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/ConsultanExpert/talkToCA" element={<TalkToCA />} />
          <Route path="/ConsultanExpert/talkToIP" element={<TalkToIP />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<HomePage />} />
            <Route path="compliances" element={<CompliancesPage />} />
            <Route path="servicehub" element={<ServicesHub />} />
            <Route path="crm" element={<CrmPage />} />
            <Route path="crm-dashboard" element={<CrmDashboard />} />
            <Route path="leads" element={<LeadManagementPage />} />
            <Route path="orders/:orderId" element={<OrderDetailPage />} />
            <Route path="workflow-analytics" element={<WorkflowAnalytics />} />
            <Route path="calendar" element={<CalendarPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="consult" element={<ConsultPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="*" element={<Placeholder />} />
          </Route>
          <Route path="*" element={<ServiceLoader />} />
        </Routes>
      </main>
      {!hideLayout && <Footer />}
      <CheckoutModal />
    </div>
  );
}
