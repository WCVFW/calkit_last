import React from "react";

export default function CalendarPage() {
  const events = [
    { id: 1, date: "2025-01-10", title: "GST Filing Due" },
    { id: 2, date: "2025-01-15", title: "Client Meeting" },
  ];
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-semibold">Calendar</h1>
        <p className="text-slate-600 mt-2">Upcoming events (sample).</p>
        <ul className="mt-4 space-y-2">
          {events.map((e) => (
            <li key={e.id} className="border rounded-lg p-3 flex items-center justify-between">
              <span>{e.title}</span>
              <span className="text-slate-600 text-sm">{new Date(e.date).toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
