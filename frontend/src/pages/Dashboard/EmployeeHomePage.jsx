import React, { useEffect, useState } from "react";
import {
  UserCircleIcon,
  ClipboardDocumentCheckIcon,
  ClockIcon,
  CheckCircleIcon,
  CurrencyRupeeIcon,
  ArrowPathIcon,
  MegaphoneIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { orderAPI } from "@/lib/api"; // your API helper for fetching data

export default function EmployeeHomePage() {
  const [employee, setEmployee] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ------------------ Fetch Employee Info ------------------
  useEffect(() => {
    const userStr = localStorage.getItem("authUser");
    const user = userStr ? JSON.parse(userStr) : null;
    setEmployee(user);
  }, []);

  // ------------------ Fetch Assigned Tasks ------------------
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const userStr = localStorage.getItem("authUser");
        const user = userStr ? JSON.parse(userStr) : null;
        if (!user || !user.email) return;

        const res = await orderAPI.listAssigned(user.email);
        setTasks(res?.data || []);
      } catch (err) {
        console.error("Failed to fetch tasks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // ------------------ Derived Stats ------------------
  const totalTasks = tasks.length;
  const inProgress = tasks.filter((t) => t.status === "IN_PROGRESS").length;
  const completed = tasks.filter((t) => t.status === "COMPLETED").length;
  const totalValue = tasks.reduce((sum, t) => sum + (t.totalAmount || 0), 0);

  // ------------------ Navigate to Task ------------------
  const handleView = (id) => navigate(`/dashboard/employee/task/${id}`);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="relative p-6 overflow-hidden text-white shadow-lg rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-500">
        <div className="relative z-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome back{employee?.name ? `, ${employee.name}` : ""} 👋
            </h1>
            <p className="text-blue-100">
              Here's an overview of your work summary and tasks.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <img
              src={employee?.avatar || ""}
              alt="Employee Avatar"
              className="object-cover w-16 h-16 border-2 border-white rounded-full shadow-md"
            />
            <div>
              <p className="text-lg font-semibold">{employee?.name || "Employee"}</p>
              <p className="text-sm text-blue-100">{employee?.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<ClipboardDocumentCheckIcon className="w-6 h-6 text-indigo-600" />}
          label="Total Tasks"
          value={totalTasks}
          color="text-indigo-600"
        />
        <StatCard
          icon={<ClockIcon className="w-6 h-6 text-yellow-600" />}
          label="In Progress"
          value={inProgress}
          color="text-yellow-600"
        />
        <StatCard
          icon={<CheckCircleIcon className="w-6 h-6 text-green-600" />}
          label="Completed"
          value={completed}
          color="text-green-600"
        />
        <StatCard
          icon={<CurrencyRupeeIcon className="w-6 h-6 text-blue-600" />}
          label="Total Value"
          value={`₹${totalValue.toLocaleString("en-IN")}`}
          color="text-blue-600"
        />
      </div>

      {/* Recent Tasks Section */}
      <div className="p-6 bg-white border border-gray-200 shadow-sm rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Tasks</h2>
          <button
            onClick={() => navigate("/dashboard/employee/tasks")}
            className="text-sm text-blue-600 hover:underline"
          >
            View All →
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <ArrowPathIcon className="w-8 h-8 mb-2 text-blue-500 animate-spin" />
            Loading tasks...
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-gray-500">No tasks assigned yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead>
                <tr className="text-gray-500 border-b">
                  <th className="px-4 py-2">#</th>
                  <th className="px-4 py-2">Task</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Created</th>
                  <th className="px-4 py-2 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {tasks.slice(0, 5).map((task, idx) => (
                  <tr key={task.id} className="transition hover:bg-gray-50">
                    <td className="px-4 py-2">{idx + 1}</td>
                    <td className="px-4 py-2 font-medium text-gray-900">
                      {task.title || task.serviceName || `Order #${task.id}`}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          task.status === "COMPLETED"
                            ? "bg-green-100 text-green-800"
                            : task.status === "IN_PROGRESS"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-indigo-100 text-indigo-800"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-green-700">
                      ₹{task.totalAmount?.toLocaleString("en-IN") || 0}
                    </td>
                    <td className="px-4 py-2 text-gray-500">
                      {task.createdAt
                        ? new Date(task.createdAt).toLocaleDateString("en-IN")
                        : "N/A"}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handleView(task.id)}
                        className="flex items-center justify-center w-8 h-8 mx-auto text-blue-600 transition rounded-full hover:bg-blue-100"
                      >
                        <EyeIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Announcements */}
      <div className="p-6 border border-indigo-100 shadow-sm bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl">
        <div className="flex items-center gap-3 mb-3">
          <MegaphoneIcon className="w-6 h-6 text-indigo-600" />
          <h2 className="text-lg font-semibold text-gray-900">Announcements</h2>
        </div>
        <ul className="space-y-2 text-gray-700 list-disc list-inside">
          <li>🎯 Submit your weekly task updates by Friday evening.</li>
          <li>🕒 Monthly review meeting scheduled on <b>15th Nov 2025</b>.</li>
          <li>💡 Remember to update task status after completing work.</li>
        </ul>
      </div>
    </div>
  );
}

// ------------------ Stat Card ------------------
function StatCard({ icon, label, value, color }) {
  return (
    <div className="flex items-center p-4 space-x-4 transition bg-white border border-gray-200 rounded-xl hover:shadow-md">
      <div className="p-3 bg-gray-100 rounded-lg">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
      </div>
    </div>
  );
}
