import React from "react";

export default function DocumentsPage() {
  const docs = [
    { id: 1, name: "Invoice-Jan.pdf", updatedAt: "2025-01-05T09:14:00Z" },
    { id: 2, name: "GST-Report.xlsx", updatedAt: "2025-01-08T12:30:00Z" },
  ];
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-semibold">Documents</h1>
        <p className="text-slate-600 mt-2">Recently updated documents (sample).</p>
        <div className="mt-4 space-y-2">
          {docs.map((d) => (
            <div key={d.id} className="border rounded-lg p-3 flex items-center justify-between">
              <span>{d.name}</span>
              <span className="text-slate-600 text-sm">{new Date(d.updatedAt).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
