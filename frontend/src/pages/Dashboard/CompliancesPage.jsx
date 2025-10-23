import React from "react";

export default function CompliancesPage() {
  const items = [
    { name: "GST Filing", desc: "Monthly/Quarterly compliance" },
    { name: "TDS Filing", desc: "Tax deducted at source" },
    { name: "Annual Compliance", desc: "ROC + ITR" },
  ];
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-semibold">Compliances</h1>
        <p className="text-slate-600 mt-2">Manage and track statutory filings.</p>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((x) => (
            <div key={x.name} className="border rounded-lg p-4">
              <div className="font-medium">{x.name}</div>
              <div className="text-sm text-slate-600">{x.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
