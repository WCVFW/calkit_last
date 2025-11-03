import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default function CalendarPage() {
  const [events, setEvents] = useState([
    { id: "1", title: "GST Filing Due", date: "2025-01-10", color: "#EF4444" }, // Red
    { id: "2", title: "Client Meeting", date: "2025-01-15", color: "#10B981" }, // Green
    { id: "3", title: "Invoice Submission", date: "2025-01-20", color: "#3B82F6" }, // Blue
  ]);

  // Add event by clicking date
  const handleDateClick = (info) => {
    const title = prompt("Enter event title:");
    if (title) {
      const newEvent = {
        id: String(events.length + 1),
        title,
        date: info.dateStr,
        color: "#3B82F6",
      };
      setEvents([...events, newEvent]);
    }
  };

  // Click event details
  const handleEventClick = (info) => {
    alert(`📅 ${info.event.title}\nDate: ${info.event.start.toDateString()}`);
  };

  return (
    <div className="p-4 mx-auto md:p-6 lg:p-8 max-w-7xl">
      <div className="p-4 bg-white border border-gray-200 shadow-lg rounded-xl sm:p-6">
        {/* Header */}
        <div className="flex flex-col gap-3 pb-4 mb-6 border-b md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-800">
              🗓️ Event & Compliance Calendar
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage your deadlines and meetings. Click on a date to add a new event.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => alert("Google Calendar integration coming soon!")}
              className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Google Sync
            </button>

            <button
              onClick={() => alert("Click a date in the calendar to add an event.")}
              className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Quick Add
            </button>
          </div>
        </div>

        {/* Calendar + Event List */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Calendar Section (left, larger) */}
          <div className="p-2 bg-white border border-gray-200 rounded-lg shadow-inner md:col-span-2">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              height="550px"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              events={events}
              dateClick={handleDateClick}
              eventClick={handleEventClick}
              selectable={true}
              editable={false}
              nowIndicator={true}
              eventTextColor="#ffffff"
              buttonText={{
                today: "Today",
                month: "Month",
                week: "Week",
                day: "Day",
              }}
              dayCellDidMount={({ el, date }) => {
                if (date.toDateString() === new Date().toDateString()) {
                  el.style.border = "2px solid #3B82F6";
                  el.style.borderRadius = "4px";
                }
              }}
            />
          </div>

          {/* Event List (right side) */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg shadow-inner p-4 h-[550px] overflow-y-auto">
            <h2 className="mb-3 text-lg font-semibold text-gray-800">
              📋 Upcoming Events
            </h2>

            {events.length === 0 ? (
              <p className="text-sm text-gray-500">No upcoming events.</p>
            ) : (
              <ul className="space-y-3">
                {events
                  .sort((a, b) => new Date(a.date) - new Date(b.date))
                  .map((e) => (
                    <li
                      key={e.id}
                      className="flex items-center justify-between p-3 transition-all bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="inline-block w-3 h-3 rounded-full"
                          style={{ backgroundColor: e.color || "#3B82F6" }}
                        ></span>
                        <span className="text-sm font-medium text-gray-800">
                          {e.title}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(e.date).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                        })}
                      </span>
                    </li>
                  ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
