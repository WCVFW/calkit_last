import React, { useEffect, useMemo, useState } from "react";

export default function CompliancesPage() {
  // Seed data that represents "work based" and "other" compliances.
  const seed = [
    {
      id: "c1",
      name: "GST Filing - July 2025",
      category: "work",
      frequency: "Monthly",
      dueDate: "2025-08-10",
      status: "Pending",
      assignee: "Prakash",
      description:
        "Prepare and submit GST returns for the month. Collect invoices and reconcile input tax credit.",
    },
    {
      id: "c2",
      name: "TDS Quarterly Filing - Q2",
      category: "work",
      frequency: "Quarterly",
      dueDate: "2025-07-31",
      status: "In Progress",
      assignee: "Finance Team",
      description:
        "Compile TDS statements and file Form 24Q/26Q as applicable. Ensure TAN and challans are reconciled.",
    },
    {
      id: "c3",
      name: "Annual ROC Compliance",
      category: "other",
      frequency: "Yearly",
      dueDate: "2025-09-30",
      status: "Pending",
      assignee: "Company Secretary",
      description:
        "Prepare and file annual return with Registrar of Companies and ensure all board resolutions are attached.",
    },
    {
      id: "c4",
      name: "Income Tax Return (Company)",
      category: "other",
      frequency: "Yearly",
      dueDate: "2025-10-31",
      status: "Pending",
      assignee: "Tax Consultant",
      description: "Collect audited P&L and balance sheet to prepare and file company ITR.",
    },
  ];

  const [items, setItems] = useState(seed);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedId, setSelectedId] = useState(items[0]?.id || null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [pageSize] = useState(6);
  const [visibleCount, setVisibleCount] = useState(pageSize);

  useEffect(() => {
    // Keep selected item valid after filters/changes
    if (!items.find((i) => i.id === selectedId)) {
      setSelectedId(items[0]?.id || null);
    }
  }, [items, selectedId]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items
      .filter((it) => (activeCategory === "all" ? true : it.category === activeCategory))
      .filter((it) => (statusFilter === "all" ? true : it.status === statusFilter))
      .filter(
        (it) =>
          q === "" ||
          it.name.toLowerCase().includes(q) ||
          it.description.toLowerCase().includes(q) ||
          (it.assignee || "").toLowerCase().includes(q)
      )
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }, [items, query, activeCategory, statusFilter]);

  function toggleComplete(id) {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, status: it.status === "Completed" ? "Pending" : "Completed" } : it))
    );
  }

  function loadMore() {
    setVisibleCount((v) => v + pageSize);
  }

  // Accessibility: keyboard selection
  function selectNext() {
    const idx = filtered.findIndex((f) => f.id === selectedId);
    if (idx < 0 && filtered.length) setSelectedId(filtered[0].id);
    else if (idx < filtered.length - 1) setSelectedId(filtered[idx + 1].id);
  }
  function selectPrev() {
    const idx = filtered.findIndex((f) => f.id === selectedId);
    if (idx > 0) setSelectedId(filtered[idx - 1].id);
  }

  const selected = items.find((i) => i.id === selectedId) || filtered[0] || null;

  return (
    <div className="min-h-screen p-6 font-sans bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Compliances</h1>
              <p className="mt-1 text-sm text-slate-600">Track work-based and other statutory compliances for your account.</p>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <div className="inline-flex overflow-hidden bg-white border rounded-lg">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`px-3 py-2 text-sm ${activeCategory === "all" ? "bg-indigo-600 text-white" : "text-slate-700"}`}>
                  All
                </button>
                <button
                  onClick={() => setActiveCategory("work")}
                  className={`px-3 py-2 text-sm ${activeCategory === "work" ? "bg-indigo-600 text-white" : "text-slate-700"}`}>
                  Work Based
                </button>
                <button
                  onClick={() => setActiveCategory("other")}
                  className={`px-3 py-2 text-sm ${activeCategory === "other" ? "bg-indigo-600 text-white" : "text-slate-700"}`}>
                  Other Compliance
                </button>
              </div>

              <div className="ml-3">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-2 py-1 text-sm bg-white border rounded">
                  <option value="all">All statuses</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                aria-label="Search compliances"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, assignee or description"
                className="w-64 px-3 py-2 text-sm bg-white border rounded-md"
              />
              <div className="text-sm text-slate-500">{filtered.length} results</div>
            </div>
          </div>
        </header>

        <main className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* List */}
          <section className="lg:col-span-1">
            <div className="p-4 bg-white rounded-lg shadow">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-sm font-semibold">Compliance Items</h2>
                <div className="text-xs text-slate-500">Showing {Math.min(filtered.length, visibleCount)} of {filtered.length}</div>
              </div>

              <ul className="space-y-2 max-h-[60vh] overflow-auto pr-2">
                {filtered.slice(0, visibleCount).map((it) => (
                  <li
                    key={it.id}
                    onClick={() => setSelectedId(it.id)}
                    className={`cursor-pointer p-3 rounded-md border ${selectedId === it.id ? "border-indigo-500 bg-indigo-50" : "border-transparent hover:border-slate-200"}`}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-sm font-medium text-slate-900">{it.name}</div>
                        <div className="text-xs text-slate-500">{it.assignee} • {it.frequency}</div>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs font-medium ${it.status === 'Completed' ? 'text-emerald-600' : it.status === 'In Progress' ? 'text-amber-600' : 'text-slate-700'}`}>{it.status}</div>
                        <div className="text-xs text-slate-400">Due {new Date(it.dueDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </li>
                ))}

                {filtered.length === 0 && <li className="p-3 text-sm text-slate-500">No compliances match your filters.</li>}
              </ul>

              <div className="flex items-center justify-between mt-3">
                <div>
                  {visibleCount < filtered.length && (
                    <button onClick={loadMore} className="text-sm text-indigo-600">Load more</button>
                  )}
                </div>
                <div className="flex gap-2">
                  <button onClick={selectPrev} className="px-2 py-1 text-sm border rounded">Prev</button>
                  <button onClick={selectNext} className="px-2 py-1 text-sm border rounded">Next</button>
                </div>
              </div>
            </div>
          </section>

          {/* Details */}
          <section className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6 min-h-[60vh]">
              {selected ? (
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">{selected.name}</h3>
                      <div className="mt-1 text-sm text-slate-500">{selected.assignee} • {selected.frequency} • Due {new Date(selected.dueDate).toLocaleDateString()}</div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className={`text-sm px-3 py-1 rounded-full border ${selected.status === 'Completed' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-white border-slate-200 text-slate-700'}`}>{selected.status}</div>
                      <button
                        onClick={() => toggleComplete(selected.id)}
                        className="px-3 py-1 text-sm text-white bg-indigo-600 rounded">
                        {selected.status === "Completed" ? "Mark Pending" : "Mark Completed"}
                      </button>
                    </div>
                  </div>

                  <div className="mt-6 leading-relaxed text-slate-700">
                    {selected.description}
                  </div>

                  <div className="grid grid-cols-1 gap-4 mt-6 md:grid-cols-3">
                    <div className="p-4 rounded bg-gray-50">
                      <div className="text-xs text-slate-500">Category</div>
                      <div className="mt-1 font-medium capitalize">{selected.category === 'work' ? 'Work Based' : 'Other Compliance'}</div>
                    </div>
                    <div className="p-4 rounded bg-gray-50">
                      <div className="text-xs text-slate-500">Assigned To</div>
                      <div className="mt-1 font-medium">{selected.assignee}</div>
                    </div>
                    <div className="p-4 rounded bg-gray-50">
                      <div className="text-xs text-slate-500">Due Date</div>
                      <div className="mt-1 font-medium">{new Date(selected.dueDate).toLocaleDateString()}</div>
                    </div>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="px-4 py-2 text-sm text-indigo-600 border rounded">
                      View documents
                    </a>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="px-4 py-2 text-sm bg-white border rounded text-slate-700">
                      Add note
                    </a>
                  </div>
                </div>
              ) : (
                <div className="py-20 text-center text-slate-500">Select a compliance item from the left to see details.</div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
