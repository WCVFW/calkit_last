import React, { useEffect, useState } from "react";
import { getUser, clearUser, clearToken, setUser } from "../lib/auth";
import { useNavigate } from "react-router-dom";
import { userAPI } from "../lib/api";

export default function Account() {
  const nav = useNavigate();
  const stored = getUser();
  const [user, setLocalUser] = useState(stored);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ fullName: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (user) {
      setForm({ fullName: user.fullName || user.name || "", phone: user.phone || "", password: "" });
    }
  }, [user]);

  useEffect(() => {
    // Fetch fresh user data
    let mounted = true;
    (async () => {
      try {
        const r = await userAPI.me();
        if (!mounted) return;
        const u = r.data;
        // r.data may be { id, fullName, email, phone }
        const userObj = { id: u.id, fullName: u.fullName, email: u.email, phone: u.phone, role: stored?.role };
        setLocalUser(userObj);
        setUser(userObj); // update local storage
      } catch (err) {
        // ignore
      }
    })();
    return () => { mounted = false; };
  }, []);

  const logout = () => {
    clearToken();
    clearUser();
    window.dispatchEvent(new Event("auth:update"));
    nav("/");
  };

  const save = async (e) => {
    e?.preventDefault?.();
    setMessage(null);
    setLoading(true);
    try {
      const payload = { fullName: form.fullName, phone: form.phone };
      if (form.password) payload.password = form.password;
      const r = await userAPI.update(payload);
      const updated = r.data.user;
      const userObj = { id: updated.id, fullName: updated.fullName, email: updated.email, phone: updated.phone, role: stored?.role };
      setLocalUser(userObj);
      setUser(userObj);
      setEditing(false);
      setMessage(r.data.message || "Saved");
      setForm((f) => ({ ...f, password: "" }));
    } catch (err) {
      setMessage(err?.response?.data?.message || err?.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="max-w-3xl py-10 mx-auto">
        <div className="p-6 bg-white rounded shadow">
          <h2 className="mb-4 text-xl font-semibold">My Account</h2>
          <p className="text-sm text-slate-600">No user data. Please login.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl py-10 mx-auto">
      <div className="p-6 bg-white rounded shadow">
        <h2 className="flex items-center justify-between mb-4 text-xl font-semibold">My Account { !editing && <button onClick={() => setEditing(true)} className="ml-4 text-sm text-[#003366] bg-white border border-[#003366] px-3 py-1 rounded">Edit</button> }</h2>

        {editing ? (
          <form onSubmit={save} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-600">Full Name</label>
              <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="w-full px-3 py-2 mt-1 border rounded" />
            </div>
            <div>
              <label className="block text-sm text-slate-600">Email</label>
              <input value={user.email} disabled className="w-full px-3 py-2 mt-1 border rounded bg-slate-50" />
            </div>
            <div>
              <label className="block text-sm text-slate-600">Phone</label>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-3 py-2 mt-1 border rounded" />
            </div>
            <div>
              <label className="block text-sm text-slate-600">New Password (optional)</label>
              <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full px-3 py-2 mt-1 border rounded" />
            </div>
            <div className="flex gap-2">
              <button type="submit" disabled={loading} className="bg-[#003366] text-white px-4 py-2 rounded">{loading ? 'Saving...' : 'Save'}</button>
              <button type="button" onClick={() => { setEditing(false); setForm({ fullName: user.fullName || '', phone: user.phone || '', password: '' }); setMessage(null); }} className="px-4 py-2 border rounded">Cancel</button>
            </div>
            {message && <div className="mt-2 text-sm text-slate-600">{message}</div>}
          </form>
        ) : (
          <div className="space-y-3">
            <div>
              <p className="text-sm text-slate-500">Name</p>
              <p className="font-medium">{user.fullName || user.name || "-"}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Email</p>
              <p className="font-medium">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-slate-500">Phone</p>
              <p className="font-medium">{user.phone || "-"}</p>
            </div>
            <div className="pt-4">
              <button onClick={logout} className="bg-[#003366] text-white px-4 py-2 rounded">Logout</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
