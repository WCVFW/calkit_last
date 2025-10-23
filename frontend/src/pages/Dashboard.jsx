import React, { useEffect, useState } from "react";
import axios from "axios";
import { openRazorpayCheckout } from "@/lib/utils";

// Static data for the small service cards, organized by tab

const defaultTab = "Licenses/Registrations";

export default function Dashboard() {
  const [leads, setLeads] = useState([]); // Kept for data fetching structure
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [errorLeads, setErrorLeads] = useState(null);
  const [user, setUser] = useState(null); // Kept for data fetching structure
  const [loadingUser, setLoadingUser] = useState(true);

  const [activeTab, setActiveTab] = useState(defaultTab); // State for the new tab system
  const [payments, setPayments] = useState([]);
  const [payLoading, setPayLoading] = useState(false);
  const [payMsg, setPayMsg] = useState("");

  // Static service hub items matching the image (Trademark Registration)
  const largeServiceCards = [
    {
      title: "Trademark Registration",
      desc: "Legal Protection For Your Brand Indemnity",
      to: "/Licenses/trademark",
      bgColor: "bg-[#5299F4]",
    },
    {
      title: "Trademark Registration",
      desc: "Legal Protection For Your Brand Indemnity",
      to: "/Licenses/trademark",
      bgColor: "bg-[#5299F4]",
    },
  ];

  useEffect(() => {
    let mounted = true;

    // Helper function for API calls (kept for structure)
    const fetchData = async (url, setter, errorSetter, isUser = false) => {
      try {
        const response = await axios.get(url);
        if (!mounted) return;
        const data = response.data;

        if (isUser) {
          setter(data);
        } else {
          if (Array.isArray(data)) setter(data);
          else if (data && Array.isArray(data.data)) setter(data.data);
          else if (data && Array.isArray(data.leads)) setter(data.leads);
          else setter([]);
        }
      } catch (err) {
        if (!mounted) return;
        errorSetter(err.message || "Failed to load");
        if (!isUser) setter([]);
      }
    };

    setLoadingLeads(true);
    fetchData("/api/leads", setLeads, setErrorLeads, false).finally(() => {
      if (mounted) setLoadingLeads(false);
    });

    setLoadingUser(true);
    fetchData("/api/user/me", setUser, () => setUser(null), true).finally(
      () => {
        if (mounted) setLoadingUser(false);
      },
    );

    fetchData("/api/payments/mine", setPayments, () => setPayments([]), false);

    return () => {
      mounted = false;
    };
  }, []);

  // --- Utility Components for cleaner JSX ---

  const NavLink = ({ children, href, active = false }) => (
    <a
      href={href}
      className={`text-[18px] transition-colors duration-200 py-2 px-3 rounded-t-lg ${
        active
          ? "text-[#0080FF] font-semibold bg-white shadow-inner relative z-10"
          : "text-gray-700 hover:text-[#2E96FF]"
      }`}
    >
      {children}
    </a>
  );

  const ServiceCardLarge = ({ title, desc, to, bgColor }) => (
    <a
      href={to}
      className={`flex-1 min-h-[65px] ${bgColor} rounded-xl transition-transform transform hover:scale-[1.01] shadow-lg`}
    >
      <div className="flex items-center p-4">
        <div>
          <div className="text-white font-semibold text-lg">{title}</div>
          <div className="text-xs text-opacity-90 text-white mt-1">{desc}</div>
        </div>
        {/* Arrow Icon matching the image */}
        <div className="ml-auto flex items-center justify-center">
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </div>
    </a>
  );

  const ComplianceCardSmall = ({ title, desc, to }) => (
    <a
      href={to}
      className="block bg-white border border-[#94C8FA] rounded-xl p-4 transition-transform transform hover:scale-[1.03] hover:shadow-lg shadow-md"
    >
      <div className="w-10 h-10 bg-[#E5F7F7] rounded-lg mb-3 flex items-center justify-center">
        {/* Placeholder Icon */}
        <svg
          className="w-5 h-5 text-[#5FA1F9]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      </div>
      <div className="font-semibold text-gray-800 text-sm">{title}</div>
      <div className="text-xs text-[#515554] mt-1 line-clamp-2">{desc}</div>
      <div className="mt-3 text-xs text-[#5FA1F9] font-bold hover:text-[#2E96FF] transition-colors">
        View Details
      </div>
    </a>
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-[Inter] p-4 md:p-0">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-md">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between px-6 py-4">
          <div className="w-auto text-[#0080FF] font-extrabold text-2xl">
            L<span className="text-gray-700">OGO</span>
          </div>
          <nav className="flex items-center gap-4 lg:gap-6 text-sm">
            <NavLink href="/dashboard">Home</NavLink>
            <NavLink href="/compliances">Compliances</NavLink>
            <NavLink href="/servicehub" active>
              Service Hub
            </NavLink>
            <NavLink href="/calendar">Calender</NavLink>
            <NavLink href="/documents">Documents</NavLink>
            <NavLink href="/reports">Reports</NavLink>
            <NavLink href="/consult">Consult</NavLink>
            <NavLink href="/users">Users & Roles</NavLink>
            <div className="text-gray-500 font-bold">...</div>
          </nav>
        </div>
      </header>

      {/* Main Content Container */}
      <div className="max-w-[1200px] mx-auto mt-8">
        <div className="bg-white rounded-xl shadow-2xl p-6 md:p-8">
          {/* Large Service Cards Section */}
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            {largeServiceCards.map((card, index) => (
              <ServiceCardLarge key={index} {...card} />
            ))}
          </div>

          {/* Tab Navigation (To simulate different pages) */}
          <nav className="flex flex-wrap border-b border-gray-200 mb-6 -mx-6 px-6 pt-4">
            {tabKeys.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 px-4 md:px-6 text-sm md:text-base font-medium transition-colors border-b-2
                  ${
                    activeTab === tab
                      ? "text-[#2E96FF] border-[#2E96FF] font-semibold"
                      : "text-gray-500 border-transparent hover:text-gray-800 hover:border-gray-300"
                  }`}
              >
                {tab}
              </button>
            ))}
          </nav>

          {/* Payments Quick Action */}
          <div className="mt-10 border-t pt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Payments</h3>
              <button
                disabled={payLoading}
                onClick={async () => {
                  setPayLoading(true);
                  setPayMsg("");
                  try {
                    const { data } = await axios.post("/api/payments/order", {
                      amount: 10000,
                      currency: "INR",
                      description: "Test Payment",
                    });
                    const resp = await openRazorpayCheckout({
                      orderId: data.orderId,
                      keyId: data.keyId,
                      amount: data.amount,
                      currency: data.currency,
                      name: "Calzone Financial",
                      description: data.description,
                    });
                    await axios.post("/api/payments/confirm", {
                      orderId: data.orderId,
                      paymentId: resp.razorpay_payment_id,
                    });
                    setPayMsg("Payment successful");
                    const list = await axios.get("/api/payments/mine");
                    setPayments(list.data || []);
                  } catch (e) {
                    setPayMsg(
                      e?.description ||
                        e?.message ||
                        "Payment failed or cancelled",
                    );
                  } finally {
                    setPayLoading(false);
                  }
                }}
                className="bg-[#003366] text-white px-4 py-2 rounded"
              >
                {payLoading ? "Processing..." : "Pay ₹100"}
              </button>
            </div>
            {payMsg && (
              <div className="text-sm mb-3 text-slate-600">{payMsg}</div>
            )}
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2 pr-4">Order</th>
                    <th className="py-2 pr-4">Payment</th>
                    <th className="py-2 pr-4">Amount</th>
                    <th className="py-2 pr-4">Status</th>
                    <th className="py-2 pr-4">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr key={p.id} className="border-b">
                      <td className="py-2 pr-4">{p.orderId}</td>
                      <td className="py-2 pr-4">{p.paymentId || "-"}</td>
                      <td className="py-2 pr-4">₹{(p.amount || 0) / 100}</td>
                      <td className="py-2 pr-4">{p.status}</td>
                      <td className="py-2 pr-4">
                        {p.createdAt
                          ? new Date(p.createdAt).toLocaleString()
                          : "-"}
                      </td>
                    </tr>
                  ))}
                  {payments.length === 0 && (
                    <tr>
                      <td className="py-2 pr-4" colSpan="5">
                        No payments yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* CRM Section */}
          <div className="mt-10 border-t pt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">CRM — Leads</h3>
              <div className="text-sm text-slate-600">
                {loadingUser
                  ? "Loading user..."
                  : user
                    ? `Welcome, ${user.name || user.email}`
                    : "Not signed in"}
              </div>
            </div>

            {/* Create Lead */}
            <LeadCreate
              onCreated={(lead) =>
                setLeads((prev) => [
                  { ...lead, created_at: new Date().toISOString() },
                  ...prev,
                ])
              }
            />

            {/* Lead List */}
            <div className="mt-6 overflow-x-auto">
              {loadingLeads ? (
                <div className="text-sm text-slate-600">Loading leads...</div>
              ) : errorLeads ? (
                <div className="text-sm text-red-600">{errorLeads}</div>
              ) : (
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="py-2 pr-4">Name</th>
                      <th className="py-2 pr-4">Service</th>
                      <th className="py-2 pr-4">Status</th>
                      <th className="py-2 pr-4">Created</th>
                      <th className="py-2 pr-4"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((l) => (
                      <LeadRow
                        key={l.id}
                        lead={l}
                        onUpdated={(patch) =>
                          setLeads((prev) =>
                            prev.map((x) =>
                              x.id === l.id ? { ...x, ...patch } : x,
                            ),
                          )
                        }
                        onDeleted={() =>
                          setLeads((prev) => prev.filter((x) => x.id !== l.id))
                        }
                      />
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

          {/* Bottom Call to Action Buttons */}
          <div className="mt-8 flex justify-end gap-4 border-t pt-6">
            <a
              href="/callback/general"
              className="inline-flex justify-center items-center border border-gray-400 text-gray-700 font-medium py-2.5 px-6 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
            >
              Request A Callback
            </a>
            <a
              href="/callback/expert"
              className="inline-flex justify-center items-center border border-gray-400 text-gray-700 font-medium py-2.5 px-6 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
            >
              Request A Callback
            </a>
          </div>
        </div>
      </div>

      {/* Footer / Spacer */}
      <div className="h-16" />
    </div>
  );
}

function LeadCreate({ onCreated }) {
  const [name, setName] = useState("");
  const [service, setService] = useState("");
  const [status, setStatus] = useState("New");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    if (!name) {
      setMsg("Enter lead name");
      return;
    }
    setLoading(true);
    setMsg("");
    try {
      const r = await axios.post("/api/leads", { name, service, status });
      onCreated?.(r.data);
      setName("");
      setService("");
      setStatus("New");
    } catch (e) {
      setMsg(e?.response?.data?.error || "Failed to create");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-slate-50 rounded-lg p-4 border">
      <div className="flex flex-col md:flex-row gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Lead name"
        />
        <input
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
          placeholder="Service (optional)"
        />
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border rounded px-3 py-2"
        >
          <option>New</option>
          <option>In Progress</option>
          <option>Closed</option>
        </select>
        <button
          disabled={loading}
          className="bg-[#003366] text-white px-4 py-2 rounded min-w-[110px]"
        >
          {loading ? "Adding..." : "Add Lead"}
        </button>
      </div>
      {msg && <div className="text-sm text-red-600 mt-2">{msg}</div>}
    </form>
  );
}

function LeadRow({ lead, onUpdated, onDeleted }) {
  const [status, setStatus] = useState(lead.status || "New");
  const [loading, setLoading] = useState(false);

  const update = async (patch) => {
    setLoading(true);
    try {
      await axios.put(`/api/leads/${lead.id}`, patch);
      onUpdated?.(patch);
    } catch (e) {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  const remove = async () => {
    if (!confirm("Delete lead?")) return;
    setLoading(true);
    try {
      await axios.delete(`/api/leads/${lead.id}`);
      onDeleted?.();
    } catch (e) {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr className="border-b">
      <td className="py-2 pr-4">{lead.name}</td>
      <td className="py-2 pr-4">{lead.service || "-"}</td>
      <td className="py-2 pr-4">
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            update({ status: e.target.value });
          }}
          className="border rounded px-2 py-1 text-xs"
        >
          <option>New</option>
          <option>In Progress</option>
          <option>Closed</option>
        </select>
      </td>
      <td className="py-2 pr-4">
        {lead.created_at ? new Date(lead.created_at).toLocaleString() : "-"}
      </td>
      <td className="py-2 pr-4 text-right">
        <button
          onClick={remove}
          disabled={loading}
          className="text-red-600 text-xs"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
