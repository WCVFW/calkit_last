import React from "react";

export default function DocumentsPage() {
  const docs = [
    { id: 1, name: "Invoice-Jan.pdf", updatedAt: "2025-01-05T09:14:00Z" },
    { id: 2, name: "GST-Report.xlsx", updatedAt: "2025-01-08T12:30:00Z" },
  ];
  return (
    <div className="space-y-6">
      <div className="p-6 bg-white shadow rounded-xl">
        <h1 className="text-2xl font-semibold">Documents</h1>
        <p className="mt-2 text-slate-600">Recently updated documents (sample).</p>
        <div className="mt-4 space-y-2">
          {docs.map((d) => (
            <div key={d.id} className="flex items-center justify-between p-3 border rounded-lg">
              <span>{d.name}</span>
              <span className="text-sm text-slate-600">{new Date(d.updatedAt).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
