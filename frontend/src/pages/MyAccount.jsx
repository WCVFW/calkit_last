import React, { useEffect, useState } from "react";
import { getUser, clearUser, clearToken, setUser, getToken } from "../lib/auth"; 
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
    // FIX: State to track initial authentication loading to prevent re-fetch loop on 401
    const [isLoading, setIsLoading] = useState(true); 

    // Initialize form state when user data changes (e.g., on first load)
    useEffect(() => {
        if (user) {
            setForm({ fullName: user.fullName || user.name || "", phone: user.phone || "", password: "" });
        }
    }, [user]);

    // Fetch fresh user data on mount (and handle 401 Unauthorized)
    useEffect(() => {
        let mounted = true;
        if (!getToken()) {
            setIsLoading(false);
            if (!stored) {
                // Only navigate if there's also no user data in local storage
                nav("/login");
            }
            return;
        }

        (async () => {
            try {
                const r = await userAPI.me();
                if (!mounted) return;
                
                const u = r.data;
                // Reconstruct user object, preserving properties like 'role' from local storage
                const userObj = { id: u.id, fullName: u.fullName, email: u.email, phone: u.phone, role: stored?.role };
                
                setLocalUser(userObj);
                setUser(userObj); // Update local storage with fresh data
                
            } catch (err) {
                // Crucial 401 handling logic: clear session and redirect to login
                if (err?.response?.status === 401) {
                    console.error("Stale/Missing token detected. Clearing session and redirecting.");
                    
                    clearToken();
                    clearUser();
                    setLocalUser(null); // Clear local state immediately
                    
                    nav("/login"); 
                    return; // CRITICAL: Stop the async function from executing further
                }
                console.error("Failed to fetch user data:", err);
            } finally {
                if (mounted) {
                    setIsLoading(false); // Done fetching/checking auth status
                }
            }
        })();
        
        return () => { mounted = false; };
        // We include dependencies for correctness
    }, [nav, stored?.role]); 

    const logout = () => {
        clearToken();
        clearUser();
        setLocalUser(null); // Clear local state immediately
        // Dispatch event for other components to react to the auth change
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
            setMessage(r.data.message || "Profile Saved.");
            setForm((f) => ({ ...f, password: "" })); 
            
        } catch (err) {
            // Handle 401 during update too, just in case
            if (err?.response?.status === 401) {
                clearToken();
                clearUser();
                nav("/login"); 
                return; // Stop processing after redirect
            }
            setMessage(err?.response?.data?.message || err?.message || "Failed to save profile.");
        } finally {
            setLoading(false);
        }
    };

    // FIX: Show a loading state until authentication is checked or user data is fetched.
    if (isLoading || !user) {
        return (
            <div className="max-w-3xl py-10 mx-auto">
                <div className="p-6 bg-white rounded shadow">
                    <h2 className="mb-4 text-xl font-semibold">My Account</h2>
                    <p className="text-sm text-slate-600">Loading user data or fetching authentication status...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl py-10 mx-auto">
            <div className="p-6 bg-white rounded shadow">
                <h2 className="flex items-center justify-between mb-4 text-xl font-semibold">
                    My Account 
                    { !editing && 
                        <button 
                            onClick={() => setEditing(true)} 
                            className="ml-4 text-sm text-[#003366] bg-white border border-[#003366] px-3 py-1 rounded hover:bg-[#003366] hover:text-white transition"
                        >
                            Edit
                        </button> 
                    }
                </h2>

                {message && <div className="p-3 mb-4 text-sm text-green-700 border border-green-200 rounded bg-green-50">{message}</div>}

                {editing ? (
                    <form onSubmit={save} className="space-y-4">
                        <div>
                            <label className="block text-sm text-slate-600">Full Name</label>
                            <input 
                                value={form.fullName} 
                                onChange={(e) => setForm({ ...form, fullName: e.target.value })} 
                                className="w-full px-3 py-2 mt-1 border rounded" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-600">Email</label>
                            <input 
                                value={user.email} 
                                disabled 
                                className="w-full px-3 py-2 mt-1 border rounded cursor-not-allowed bg-slate-100" 
                            />
                            <p className="mt-1 text-xs text-slate-500">Email address cannot be changed here.</p>
                        </div>
                        <div>
                            <label className="block text-sm text-slate-600">Phone</label>
                            <input 
                                value={form.phone} 
                                onChange={(e) => setForm({ ...form, phone: e.target.value })} 
                                className="w-full px-3 py-2 mt-1 border rounded" 
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-600">New Password (optional)</label>
                            <input 
                                type="password" 
                                value={form.password} 
                                onChange={(e) => setForm({ ...form, password: e.target.value })} 
                                className="w-full px-3 py-2 mt-1 border rounded" 
                            />
                            <p className="mt-1 text-xs text-slate-500">Leave blank to keep current password.</p>
                        </div>
                        <div className="flex gap-2 pt-2">
                            <button 
                                type="submit" 
                                disabled={loading} 
                                className="bg-[#003366] text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-[#004488] transition"
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button 
                                type="button" 
                                onClick={() => { 
                                    setEditing(false); 
                                    // Reset form to current user values
                                    setForm({ fullName: user.fullName || '', phone: user.phone || '', password: '' }); 
                                    setMessage(null); 
                                }} 
                                className="px-4 py-2 transition border border-gray-300 rounded hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-slate-500">Name</p>
                                <p className="font-medium text-gray-800">{user.fullName || user.name || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Email</p>
                                <p className="font-medium text-gray-800">{user.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Phone</p>
                                <p className="font-medium text-gray-800">{user.phone || "N/A"}</p>
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Role</p>
                                <p className="font-medium text-gray-800">{user.role || "User"}</p>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-gray-200">
                            <button onClick={logout} className="px-4 py-2 text-white transition bg-red-600 rounded hover:bg-red-700">Logout</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}