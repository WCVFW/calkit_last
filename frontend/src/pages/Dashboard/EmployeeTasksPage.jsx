import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowPathIcon,
  EyeIcon,
  DocumentTextIcon,
  CurrencyRupeeIcon,
  CalendarIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  UserIcon,
  ClipboardDocumentCheckIcon,
} from "@heroicons/react/24/outline";
import { orderAPI } from "@/lib/api"; // <-- your backend API helper

export default function EmployeeTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filterStatus, setFilterStatus] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigate = useNavigate();

  // ------------------ Fetch Employee Assigned Tasks ------------------
  const fetchTasks = async () => {
    setRefreshing(true);
    try {
      const userStr = localStorage.getItem("authUser");
      const user = userStr ? JSON.parse(userStr) : null;
      if (!user || !user.email) return;

      const res = await orderAPI.listAssigned(user.email);
      const list = res?.data || [];

      // Ensure consistent structure
      const normalized = list.map((t) => ({
        id: t.id,
        title: t.title || t.serviceName || `Order #${t.id}`,
        customer: t.customerName || t.customerEmail || "Unknown",
        totalAmount: t.totalAmount || 0,
        createdAt: t.createdAt || t.created_at,
        status: t.status || "ASSIGNED",
        documents: t.documents || [],
      }));

      setTasks(normalized);
      setFiltered(normalized);
    } catch (err) {
      console.error("Error loading tasks:", err);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // ------------------ Filter Tasks ------------------
  useEffect(() => {
    if (filterStatus === "ALL") setFiltered(tasks);
    else setFiltered(tasks.filter((t) => t.status === filterStatus));
  }, [filterStatus, tasks]);

  // ------------------ Status Colors ------------------
  const statusClasses = {
    ASSIGNED: "bg-indigo-100 text-indigo-800",
    IN_PROGRESS: "bg-yellow-100 text-yellow-800",
    COMPLETED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  const progressPercent = (status) => {
    switch (status) {
      case "ASSIGNED": return 25;
      case "IN_PROGRESS": return 60;
      case "COMPLETED": return 100;
      default: return 0;
    }
  };

  // ------------------ Open Task ------------------
  const handleView = (id) => navigate(`/dashboard/employee/task/${id}`);

  // ------------------ Render ------------------
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Tasks</h1>
          <p className="text-gray-600">View and manage your assigned client tasks</p>
        </div>
        <button
          onClick={fetchTasks}
          disabled={refreshing}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          <ArrowPathIcon className={`w-5 h-5 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="ALL">All Tasks</option>
          <option value="ASSIGNED">Assigned</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>

        <span className="text-sm text-gray-500">
          {filtered.length} of {tasks.length} tasks
        </span>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <ArrowPathIcon className="w-10 h-10 mb-2 text-blue-500 animate-spin" />
          Loading tasks...
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 bg-white border rounded-xl">
          <ClipboardDocumentCheckIcon className="w-12 h-12 mb-3 text-gray-400" />
          <p className="text-gray-600">No tasks found for this filter.</p>
        </div>
      ) : (
        <>
          {/* Task Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((t) => {
              const progress = progressPercent(t.status);
              return (
                <div
                  key={t.id}
                  className="relative overflow-hidden transition bg-white border border-gray-200 rounded-2xl hover:shadow-lg"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{t.title}</h3>
                      <p className="text-xs text-gray-500">
                        Order #{t.id} • Created{" "}
                        {t.createdAt
                          ? new Date(t.createdAt).toLocaleDateString("en-IN")
                          : "N/A"}
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${statusClasses[t.status] || "bg-gray-100 text-gray-800"}`}
                    >
                      {t.status.replace(/_/g, " ")}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-4 space-y-4">
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Customer</p>
                        <p className="text-sm font-medium text-gray-800">{t.customer}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <CurrencyRupeeIcon className="w-4 h-4 text-green-600" />
                      <div>
                        <p className="text-xs text-gray-500">Order Value</p>
                        <p className="text-sm font-semibold text-green-700">
                          ₹{t.totalAmount.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>

                    {/* Documents */}
                    {t.documents && t.documents.length > 0 && (
                      <div className="p-2 mt-2 rounded-lg bg-gray-50">
                        <p className="flex items-center gap-1 mb-1 text-xs font-medium text-gray-600">
                          <DocumentTextIcon className="w-4 h-4 text-gray-400" />
                          Documents
                        </p>
                        <ul className="space-y-1 text-sm text-blue-600 underline">
                          {t.documents.map((doc, i) => (
                            <li key={i}>
                              <a href={doc.url} target="_blank" rel="noreferrer">
                                {doc.name || `Document ${i + 1}`}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between mb-1 text-xs text-gray-600">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            progress === 100
                              ? "bg-green-600"
                              : "bg-gradient-to-r from-blue-600 to-indigo-600"
                          }`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Buttons */}
                  <div className="flex items-center gap-2 p-4 border-t bg-gray-50">
                    <button
                      onClick={() => handleView(t.id)}
                      className="flex items-center justify-center flex-1 gap-2 px-3 py-2 text-sm font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                      <EyeIcon className="w-4 h-4" />
                      View Details
                    </button>
                    {t.status === "ASSIGNED" && (
                      <button
                        onClick={() => alert("Work started for this task!")}
                        className="flex items-center justify-center flex-1 gap-2 px-3 py-2 text-sm font-medium text-white transition bg-green-600 rounded-lg hover:bg-green-700"
                      >
                        Start Work
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-4 mt-10 sm:grid-cols-2 lg:grid-cols-4">
            <SummaryCard
              label="Total Tasks"
              value={tasks.length}
              color="text-blue-600"
            />
            <SummaryCard
              label="In Progress"
              value={tasks.filter((t) => t.status === "IN_PROGRESS").length}
              color="text-yellow-600"
            />
            <SummaryCard
              label="Completed"
              value={tasks.filter((t) => t.status === "COMPLETED").length}
              color="text-green-600"
            />
            <SummaryCard
              label="Total Value"
              value={`₹${tasks
                .reduce((s, t) => s + (t.totalAmount || 0), 0)
                .toLocaleString("en-IN")}`}
              color="text-indigo-600"
            />
          </div>
        </>
      )}
    </div>
  );
}

// ------------------ Summary Card Component ------------------
function SummaryCard({ label, value, color }) {
  return (
    <div className="p-4 transition bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md">
      <p className="text-xs font-semibold text-gray-500">{label}</p>
      <p className={`mt-2 text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
