import React from "react";

export default function ReportsPage() {
  const cards = [
    { label: "Total Revenue", value: "₹1,20,000" },
    { label: "New Leads", value: "42" },
    { label: "Closed Deals", value: "12" },
  ];
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-semibold">Reports</h1>
        <p className="text-slate-600 mt-2">Key metrics (sample).</p>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((c) => (
            <div key={c.label} className="border rounded-lg p-4">
              <div className="text-slate-600 text-sm">{c.label}</div>
              <div className="text-xl font-semibold mt-1">{c.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
