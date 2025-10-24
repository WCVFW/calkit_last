import React, { useEffect, useState } from "react";
import { adminAPI } from "@/lib/api";

export default function AdminEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", password: "" });
  const [message, setMessage] = useState(null);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await adminAPI.listEmployees();
      setEmployees(res.data || []);
    } catch (e) {
      setMessage("Failed to load employees");
    } finally { setLoading(false); }
  };

  useEffect(() => { fetch(); }, []);

  const create = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      await adminAPI.createEmployee(form);
      setForm({ fullName: "", email: "", phone: "", password: "" });
      fetch();
      setMessage("Employee created");
    } catch (e) {
      setMessage(e?.response?.data?.message || "Create failed");
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete employee?")) return;
    try {
      await adminAPI.deleteEmployee(id);
      fetch();
    } catch (e) {
      setMessage("Delete failed");
    }
  };

  return (
    <div className="min-h-screen p-4 space-y-6 md:p-8 bg-gray-50">
      <div className="p-6 bg-white shadow-lg rounded-xl md:p-8">
        <h1 className="text-2xl font-semibold">Admin — Employees</h1>
        <p className="mt-1 text-slate-600">Manage employees (requires admin token).</p>

        <form className="grid grid-cols-1 gap-3 mt-4 sm:grid-cols-2" onSubmit={create}>
          <input placeholder="Full name" value={form.fullName} onChange={e=>setForm({...form, fullName:e.target.value})} className="p-2 border" />
          <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="p-2 border" />
          <input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} className="p-2 border" />
          <input placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} className="p-2 border" />
          <div className="sm:col-span-2">
            <button className="px-4 py-2 text-white bg-blue-600 rounded">Create employee</button>
          </div>
        </form>

        {message && <div className="mt-4 text-sm text-red-600">{message}</div>}

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="text-left border-b border-gray-200">
                <th className="py-3 pr-6 font-medium text-gray-700">ID</th>
                <th className="py-3 pr-6 font-medium text-gray-700">Name</th>
                <th className="py-3 pr-6 font-medium text-gray-700">Email</th>
                <th className="py-3 pr-6 font-medium text-gray-700">Phone</th>
                <th className="py-3 pr-6 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map(emp => (
                <tr key={emp.id} className="border-b border-gray-100">
                  <td className="py-3 pr-6">{emp.id}</td>
                  <td className="py-3 pr-6">{emp.fullName}</td>
                  <td className="py-3 pr-6">{emp.email}</td>
                  <td className="py-3 pr-6">{emp.phone}</td>
                  <td className="py-3 pr-6">
                    <button onClick={()=>remove(emp.id)} className="text-red-600">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
