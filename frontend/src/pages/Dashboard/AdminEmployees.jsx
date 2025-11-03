import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,
  Send,
  User,
  Mail,
  Briefcase,
  X,
  Phone,
  MapPin,
  Camera,
  Trash2,
  Search,
  Check,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * AdminEmployees — polished design and full UI
 * - Search + filter
 * - Modal add/edit with image preview (drag & drop + file input)
 * - Responsive cards + list
 * - Delete confirmation
 * - Local toasts for success/error
 *
 * NOTE: This uses the same api entry points you used previously:
 * adminAPI.listEmployees(), adminAPI.createEmployee(payload), adminAPI.updateEmployee(id, payload), adminAPI.deleteEmployee(id)
 *
 * For image upload we keep a preview and send `image` as a dataURL string in payload (change to real upload if backend supports multipart).
 */

export default function AdminEmployees() {
  const navigate = useNavigate();

  // data + state
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  // ui
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success'|'error', message }

  // search & filter
  const [q, setQ] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  // delete confirm
  const [deletingId, setDeletingId] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // form
  const emptyForm = {
    fullName: "",
    email: "",
    mobile: "",
    role: "EMPLOYEE",
    address: "",
    password: "",
    imageFile: null,
    imagePreview: "", // data URL or existing URL
  };
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState("");

  // fetch employees
  const fetchEmployees = async () => {
    setLoading(true);
    setApiError(null);
    try {
      const mod = await import("../../lib/api");
      const res = await mod.adminAPI.listEmployees();
      const items = Array.isArray(res.data)
        ? res.data.map((e) => {
            const rawRole = e.role || (e.roles && e.roles.length ? e.roles[0] : 'USER');
            const role = (rawRole || '').toUpperCase() === 'CUSTOMER' ? 'USER' : (rawRole || 'USER');
            return {
              ...e,
              // backend returns phone and roles[]; normalize to frontend shape
              mobile: e.phone || '',
              role,
              image: e.image || '',
              address: e.address || '',
            };
          })
        : [];
      setEmployees(items);
    } catch (err) {
      console.error("Failed to list employees:", err);
      setApiError(err?.response?.data?.message || String(err) || "Failed to load");
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // filtered list
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return employees.filter((e) => {
      const matchesQ =
        !term ||
        (e.fullName || e.name || "")
          .toLowerCase()
          .includes(term) ||
        (e.email || "").toLowerCase().includes(term) ||
        (e.mobile || "").toLowerCase().includes(term);
      const matchesRole = !roleFilter || (e.role || "").toUpperCase() === roleFilter;
      return matchesQ && matchesRole;
    });
  }, [employees, q, roleFilter]);

  // small utility to show toasts
  const showToast = (t) => {
    setToast(t);
    setTimeout(() => setToast(null), 3500);
  };

  // ---- form helpers ----
  const openAdd = () => {
    setForm(emptyForm);
    setFormError("");
    setIsEditing(false);
    setEditingId(null);
    setShowModal(true);
  };

  const openEdit = (emp) => {
    setForm({
      fullName: emp.fullName || emp.name || "",
      email: emp.email || "",
      mobile: emp.mobile || "",
      role: emp.role || "EMPLOYEE",
      address: emp.address || "",
      password: "",
      imageFile: null,
      imagePreview: emp.image || "",
    });
    setFormError("");
    setIsEditing(true);
    setEditingId(emp.id);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setForm(emptyForm);
      setIsEditing(false);
      setEditingId(null);
      setFormError("");
    }, 200);
  };

  // image input and drag/drop
  const handleImageFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setForm((f) => ({ ...f, imageFile: file, imagePreview: e.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleFileInput = (e) => {
    handleImageFile(e.target.files?.[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer?.files?.[0];
    if (file) handleImageFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // submit create / update
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setFormError("");
    if (!form.fullName.trim() || !form.email.trim() || !form.mobile.trim()) {
      setFormError("Name, email and mobile are required.");
      return;
    }

    setSubmitting(true);
    try {
      const mod = await import("../../lib/api");

      // Build payload (this keeps image as dataURL in image field; replace with multipart upload if you have an upload endpoint)
      const payload = {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        mobile: form.mobile.trim(),
        role: form.role,
        address: form.address.trim(),
        image: form.imagePreview || "", // backend may accept URL or base64
        password: form.password || undefined,
      };

      if (isEditing && editingId) {
        await mod.adminAPI.updateEmployee(editingId, payload);
        showToast({ type: "success", message: "Employee updated" });
      } else {
        await mod.adminAPI.createEmployee(payload);
        showToast({ type: "success", message: "Employee created" });
      }

      await fetchEmployees();
      closeModal();
    } catch (err) {
      console.error("Save employee failed", err);
      setFormError(err?.response?.data?.message || String(err) || "Save failed");
      showToast({ type: "error", message: "Save failed" });
    } finally {
      setSubmitting(false);
    }
  };

  // delete
  const confirmDelete = (id) => {
    setDeletingId(id);
  };
  const cancelDelete = () => setDeletingId(null);

  const doDelete = async () => {
    if (!deletingId) return;
    setDeleteLoading(true);
    try {
      const mod = await import("../../lib/api");
      await mod.adminAPI.deleteEmployee(deletingId);
      showToast({ type: "success", message: "Employee deleted" });
      await fetchEmployees();
    } catch (err) {
      console.error("Delete failed", err);
      showToast({ type: "error", message: "Delete failed" });
    } finally {
      setDeleteLoading(false);
      setDeletingId(null);
    }
  };

  // message nav
  const handleMessage = (emp) => {
    navigate(`/chat?user=${encodeURIComponent(emp.email)}`);
  };

  // helper to normalize image src (handle relative paths, data URLs, and absolute URLs)
  const getImageSrc = (img) => {
    if (!img) return '';
    try {
      // Already a data URL or absolute URL
      if (img.startsWith('data:') || img.startsWith('http') || img.startsWith('//')) return img;
      // If looks like a base64 string without data: prefix, add a sensible default mime
      const base64Regex = /^[A-Za-z0-9+/=\n\r]+$/;
      // heuristic: long string and base64 chars
      if (typeof img === 'string' && img.length > 200 && base64Regex.test(img.replace(/\s+/g, ''))) {
        return 'data:image/jpeg;base64,' + img.replace(/\s+/g, '');
      }
    } catch (err) {}
    try {
      if (img.startsWith('/')) return window.location.origin + img;
    } catch (err) {}
    return window.location.origin + '/' + img;
  };

  // small helper for avatar display (initials fallback)
  const renderAvatar = (emp) => {
    if (emp.image) return getImageSrc(emp.image);
    const name = (emp.fullName || emp.name || emp.email || "").trim();
    if (!name) return "https://via.placeholder.com/64";
    const parts = name.split(" ");
    const initials = (parts[0]?.[0] || "") + (parts[1]?.[0] || "");
    // color circle with initials - we'll render as inline JSX
    return null; // handled specially by caller
  };

  return (
    <div className="max-w-6xl p-6 mx-auto">
      {/* header */}
      <div className="flex flex-col items-start justify-between gap-4 mb-6 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-semibold md:text-3xl text-slate-800">
            Employee Directory
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Add, edit and message employees. Includes mobile, address and image.
          </p>
        </div>

        <div className="flex items-center w-full gap-3 md:w-auto">
          {/* search */}
          <label className="relative flex-1 md:flex-none">
            <span className="absolute inset-y-0 flex items-center pointer-events-none left-3 text-slate-400">
              <Search size={16} />
            </span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by name, email or mobile..."
              className="pl-10 pr-3 py-2 w-full md:w-[360px] rounded-lg border border-slate-200 bg-white focus:ring-2 focus:ring-[#0080FF] outline-none"
            />
            {q && (
              <button
                onClick={() => setQ("")}
                className="absolute inset-y-0 flex items-center px-2 right-2 text-slate-400 hover:text-slate-600"
                aria-label="clear"
              >
                <X size={14} />
              </button>
            )}
          </label>

          {/* role filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="py-2 px-3 rounded-lg border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-[#0080FF] outline-none"
          >
            <option value="">All roles</option>
            <option value="ADMIN">Admin</option>
            <option value="EMPLOYEE">Employee</option>
            <option value="USER">User</option>
          </select>

          {/* add button */}
          <button
            onClick={openAdd}
            className="ml-2 inline-flex items-center gap-2 bg-[#0080FF] text-white px-4 py-2 rounded-lg shadow hover:bg-[#0066CC] transition"
          >
            <Plus size={16} />
            Add Employee
          </button>
        </div>
      </div>

      {/* body */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Section - Employee List */}
        <div className="space-y-6 lg:col-span-2">
          {/* Summary Card */}
          <div className="flex items-center justify-between p-5 border shadow-sm bg-gradient-to-r from-white to-slate-50 rounded-xl">
            <div>
              <div className="text-sm text-slate-500">Showing</div>
              <div className="text-xl font-semibold text-slate-800">
                {filtered.length} Employees
              </div>
            </div>
            <div className="text-sm text-slate-600">
              Total:{" "}
              <span className="font-medium text-slate-800">
                {employees.length}
              </span>
            </div>
          </div>

          {/* Employee Grid/List */}
          <div>
            {loading ? (
              <div className="p-8 text-center bg-white border shadow-sm rounded-xl text-slate-500">
                Loading employees...
              </div>
            ) : apiError ? (
              <div className="p-5 text-red-700 border border-red-200 shadow-sm rounded-xl bg-red-50">
                {String(apiError)}
              </div>
            ) : filtered.length === 0 ? (
              <div className="p-8 text-center bg-white border shadow-sm rounded-xl text-slate-500">
                No employees found.
              </div>
            ) : (
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {filtered.map((emp) => (
                  <li
                    key={emp.id || emp.email}
                    className="flex flex-col justify-between gap-4 p-5 bg-white border rounded-xl shadow-sm transition-all hover:shadow-lg hover:-translate-y-[3px]"
                  >
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      {emp.image ? (
                        <img
                          src={getImageSrc(emp.image)}
                          alt={emp.fullName}
                          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://via.placeholder.com/64'; }}
                          className="object-cover w-16 h-16 border rounded-full shadow-sm"
                        />
                      ) : (
                        <div className="flex items-center justify-center w-16 h-16 font-semibold border rounded-full shadow-inner bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600">
                          {(emp.fullName || emp.name || emp.email || "U")
                            .split(" ")
                            .map((p) => p[0])
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()}
                        </div>
                      )}

                      {/* Employee Info */}
                      <div className="space-y-1">
                        <div className="text-base font-semibold text-slate-800">
                          {emp.fullName || emp.name || emp.email}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Mail size={12} /> {emp.email}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Phone size={12} /> {emp.mobile || "N/A"}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <MapPin size={12} />{" "}
                          {emp.address
                            ? emp.address.length > 40
                              ? emp.address.slice(0, 40) + "..."
                              : emp.address
                            : "No address"}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-[#0066CC] bg-[#E6F0FF] rounded-md">
                            <Briefcase size={12} /> {emp.role || "Employee"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Role and Actions */}
                    <div className="flex flex-col items-start gap-3 pt-2 border-t sm:flex-row sm:justify-between sm:items-center border-slate-100">


                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => openEdit(emp)}
                          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-yellow-700 bg-yellow-50 rounded-md hover:bg-yellow-100 transition-all"
                        >
                          <Edit size={14} /> Edit
                        </button>
                        <button
                          onClick={() => handleMessage(emp)}
                          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-green-700 bg-green-50 rounded-md hover:bg-green-100 transition-all"
                        >
                          <Send size={14} /> Message
                        </button>
                        <button
                          onClick={() => confirmDelete(emp.id)}
                          className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 rounded-md hover:bg-red-100 transition-all"
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Right Section - Quick Panel */}
        <aside className="space-y-6">
          {/* Quick Actions */}
          <div className="p-5 bg-white border shadow-sm rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs text-slate-500">Quick Actions</div>
                <div className="text-sm font-semibold text-slate-800">Shortcuts</div>
              </div>
            </div>

            <div className="grid gap-3">
              <button
                onClick={openAdd}
                className="flex items-center justify-center gap-2 text-sm px-4 py-2 rounded-lg bg-[#0066CC] text-white hover:bg-[#0055AA] shadow-sm transition-all"
              >
                <Plus size={14} /> Add New Employee
              </button>
              <button
                onClick={() => {
                  setQ("");
                  setRoleFilter("");
                }}
                className="flex items-center justify-center gap-2 px-4 py-2 text-sm transition-all bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                <Check size={14} /> Clear Filters
              </button>
            </div>
          </div>

          {/* Recent Hires */}
          <div className="p-5 bg-white border shadow-sm rounded-xl">
            <div className="mb-3 text-xs text-slate-500">Recent Hires</div>
            <div className="space-y-3">
              {employees.slice(0, 4).map((e) => (
                <div
                  key={e.id || e.email}
                  className="flex items-center gap-3 p-2 transition rounded-lg hover:bg-slate-50"
                >
                  {e.image ? (
                    <img
                      src={getImageSrc(e.image)}
                      onError={(ev) => { ev.currentTarget.onerror = null; ev.currentTarget.src = 'https://via.placeholder.com/40'; }}
                      className="object-cover w-10 h-10 border rounded-full shadow-sm"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-10 h-10 font-medium border rounded-full shadow-inner bg-slate-100 text-slate-600">
                      {(e.fullName || e.name || e.email || "U")
                        .split(" ")
                        .map((p) => p[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </div>
                  )}
                  <div>
                    <div className="text-sm font-medium text-slate-800">
                      {e.fullName || e.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {e.role || "Employee"}
                    </div>
                  </div>
                </div>
              ))}

              {employees.length === 0 && (
                <div className="text-sm text-slate-500">No recent hires</div>
              )}
            </div>
          </div>
        </aside>
      </div>

      {/* Modal: add / edit */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ y: 10, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 10, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className="w-full max-w-2xl bg-white border shadow-xl rounded-2xl"
            >
              <form onSubmit={handleSubmit} className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-800">{isEditing ? "Edit Employee" : "Add Employee"}</h3>
                    <p className="mt-1 text-sm text-slate-500">Enter details — name, email, mobile, address and optionally upload a profile image.</p>
                  </div>
                  <div>
                    <button type="button" onClick={closeModal} className="p-2 rounded-md hover:bg-slate-100">
                      <X size={18} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2">
                  {/* image upload box */}
                  <div className="flex items-center gap-4 md:col-span-2">
                    <div
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      className="relative flex items-center justify-center border border-dashed rounded-full w-28 h-28 bg-slate-50 border-slate-200"
                    >
                      {form.imagePreview ? (
                        <img src={form.imagePreview} className="object-cover w-full h-full rounded-full" alt="preview" />
                      ) : (
                        <div className="flex flex-col items-center gap-1 text-slate-400">
                          <User size={28} />
                          <div className="text-xs">No image</div>
                        </div>
                      )}

                      <label className="absolute -bottom-2 right-0 bg-[#0080FF] rounded-full p-2 text-white cursor-pointer hover:bg-[#0066CC]">
                        <Camera size={14} />
                        <input type="file" accept="image/*" className="hidden" onChange={handleFileInput} />
                      </label>
                    </div>

                    <div className="flex-1">
                      <div className="mb-1 text-sm font-medium text-slate-700">Profile image</div>
                      <div className="text-xs text-slate-500">Drag & drop or click the camera to upload. Preview will be used as profile image.</div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm text-slate-600">Full name</label>
                    <input value={form.fullName} onChange={(e) => setForm(f => ({ ...f, fullName: e.target.value }))} className="mt-1 px-3 py-2 border rounded-lg w-full focus:ring-2 focus:ring-[#0080FF] outline-none" placeholder="Jane Doe" required />
                  </div>

                  <div>
                    <label className="text-sm text-slate-600">Email</label>
                    <input value={form.email} onChange={(e) => setForm(f => ({ ...f, email: e.target.value }))} type="email" className={`mt-1 px-3 py-2 border rounded-lg w-full outline-none ${isEditing ? "bg-slate-50 text-slate-500" : "focus:ring-2 focus:ring-[#0080FF]"}`} placeholder="jane@example.com" required disabled={isEditing} />
                  </div>

                  <div>
                    <label className="text-sm text-slate-600">Mobile</label>
                    <input value={form.mobile} onChange={(e) => setForm(f => ({ ...f, mobile: e.target.value }))} type="tel" className="mt-1 px-3 py-2 border rounded-lg w-full focus:ring-2 focus:ring-[#0080FF] outline-none" placeholder="+91 9876543210" required />
                  </div>

                  <div>
                    <label className="text-sm text-slate-600">Role</label>
                    <select value={form.role} onChange={(e) => setForm(f => ({ ...f, role: e.target.value }))} className="mt-1 px-3 py-2 border rounded-lg w-full focus:ring-2 focus:ring-[#0080FF] outline-none">
                      <option value="ADMIN">Admin</option>
                      <option value="EMPLOYEE">Employee</option>
                      <option value="USER">User</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="text-sm text-slate-600">Address</label>
                    <textarea value={form.address} onChange={(e) => setForm(f => ({ ...f, address: e.target.value }))} rows={3} className="mt-1 px-3 py-2 border rounded-lg w-full focus:ring-2 focus:ring-[#0080FF] outline-none" placeholder="Street, City, State, PIN" />
                  </div>

                  {!isEditing && (
                    <div>
                      <label className="text-sm text-slate-600">Password (optional)</label>
                      <input value={form.password} onChange={(e) => setForm(f => ({ ...f, password: e.target.value }))} type="password" className="mt-1 px-3 py-2 border rounded-lg w-full focus:ring-2 focus:ring-[#0080FF] outline-none" placeholder="Set a password" />
                    </div>
                  )}
                </div>

                {formError && <div className="mt-3 text-sm text-red-600">{formError}</div>}

                <div className="flex items-center justify-end gap-3 mt-5">
                  <button type="button" onClick={closeModal} className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200">Cancel</button>
                  <button type="submit" disabled={submitting} className="px-5 py-2 rounded-lg bg-[#0080FF] text-white hover:bg-[#0066CC]">
                    {submitting ? "Saving..." : isEditing ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* delete confirm */}
      <AnimatePresence>
        {deletingId && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.98, y: 8 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.98, y: 8 }} className="w-full max-w-md p-5 bg-white border rounded-lg shadow-lg">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-red-50">
                  <Trash2 size={20} className="text-red-700" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-medium">Confirm remove</h4>
                  <p className="mt-1 text-sm text-slate-500">This will permanently remove the employee. This action cannot be undone.</p>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button onClick={cancelDelete} className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200">Cancel</button>
                <button onClick={doDelete} disabled={deleteLoading} className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700">
                  {deleteLoading ? "Removing..." : "Remove"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* toast */}
      <div aria-live="polite" className="fixed z-50 right-6 bottom-6">
        <AnimatePresence>
          {toast && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className={`px-4 py-3 rounded-lg shadow ${toast.type === "success" ? "bg-green-50 border border-green-200 text-green-800" : "bg-red-50 border border-red-200 text-red-800"}`}>
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
