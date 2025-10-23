import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function UsersPage() {
  const users = [
    { id: 1, name: "Admin", email: "admin@example.com", role: "Admin" },
    { id: 2, name: "User", email: "user@example.com", role: "User" },
    { id: 3, name: "John Doe", email: "john@example.com", role: "User" },
    { id: 4, name: "Jane Smith", email: "jane@example.com", role: "Admin" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-6 min-h-screen bg-gray-50">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h1 className="text-2xl font-semibold">Users & Roles</h1>
        <p className="text-slate-600 mt-2">Manage access (sample data).</p>

        <div className="overflow-x-auto mt-6">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="py-3 pr-6 font-medium text-gray-700">Name</th>
                <th className="py-3 pr-6 font-medium text-gray-700">Email</th>
                <th className="py-3 pr-6 font-medium text-gray-700">Role</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {users.map((user, i) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 pr-6">{user.name}</td>
                    <td className="py-3 pr-6">{user.email}</td>
                    <td className="py-3 pr-6 font-medium text-gray-800">{user.role}</td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
