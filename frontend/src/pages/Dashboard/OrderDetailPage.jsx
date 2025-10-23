import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  ClockIcon,
  UserIcon,
  CurrencyRupeeIcon,
} from "@heroicons/react/24/outline";

const WorkflowEventTimeline = ({ events }) => {
  return (
    <div className="relative">
      {events && events.length > 0 ? (
        <div className="space-y-4">
          {events.map((event, idx) => (
            <div key={event.id} className="relative pl-8">
              {idx < events.length - 1 && (
                <div className="absolute left-2 top-10 bottom-0 w-0.5 bg-gray-300"></div>
              )}
              <div className="absolute left-0 top-1 w-5 h-5 rounded-full bg-blue-500 border-4 border-white shadow-lg"></div>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-gray-900">{event.stage}</h3>
                  <span
                    className={`text-xs font-bold px-2 py-1 rounded-full ${
                      event.status === "COMPLETED"
                        ? "bg-green-100 text-green-800"
                        : event.status === "IN_PROGRESS"
                          ? "bg-blue-100 text-blue-800"
                          : event.status === "FAILED"
                            ? "bg-red-100 text-red-800"
                            : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {event.status.replace(/_/g, " ")}
                  </span>
                </div>
                <p className="text-sm text-gray-700 mb-2">
                  {event.description}
                </p>
                {event.details && (
                  <p className="text-xs text-gray-600 italic">
                    {event.details}
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  {new Date(event.createdAt).toLocaleDateString()}{" "}
                  {new Date(event.createdAt).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          No events recorded yet
        </div>
      )}
    </div>
  );
};

const StageActionButtons = ({ currentStage, orderId, onRefresh }) => {
  const [loading, setLoading] = useState(false);

  const handleAdvanceStage = async (nextStage) => {
    setLoading(true);
    try {
      await axios.post(`/api/workflow/orders/${orderId}/advance`, {
        nextStage: nextStage,
        description: `Advanced to ${nextStage}`,
      });
      onRefresh();
    } catch (error) {
      console.error("Error advancing stage:", error);
      alert("Failed to advance stage");
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteStage = async () => {
    setLoading(true);
    try {
      await axios.post(`/api/workflow/orders/${orderId}/complete`, {
        stage: currentStage,
        description: `Completed ${currentStage} stage`,
      });
      onRefresh();
    } catch (error) {
      console.error("Error completing stage:", error);
      alert("Failed to complete stage");
    } finally {
      setLoading(false);
    }
  };

  const stageSequence = [
    "WEB",
    "CRM",
    "SALES",
    "ONBD",
    "CASE",
    "EXEC",
    "GOVT",
    "QA",
    "DEL",
  ];
  const currentIndex = stageSequence.indexOf(currentStage);
  const nextStage =
    currentIndex < stageSequence.length - 1
      ? stageSequence[currentIndex + 1]
      : null;

  return (
    <div className="flex gap-3">
      <button
        onClick={handleCompleteStage}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition"
      >
        <CheckCircleIcon className="w-5 h-5" />
        Complete {currentStage}
      </button>
      {nextStage && (
        <button
          onClick={() => handleAdvanceStage(nextStage)}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
        >
          Move to {nextStage}
        </button>
      )}
    </div>
  );
};

export default function OrderDetailPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [progress, setProgress] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [progressRes, eventsRes] = await Promise.all([
        axios.get(`/api/workflow/orders/${orderId}/progress`),
        axios.get(`/api/workflow/orders/${orderId}/timeline`),
      ]);
      setProgress(progressRes.data);
      setEvents(eventsRes.data);
    } catch (error) {
      console.error("Error fetching order data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading order details...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 lg:p-10">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 mb-4 font-semibold"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back
        </button>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Order #{orderId}
        </h1>
        <p className="text-gray-600">
          Track and manage your service delivery workflow
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Order Summary */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Order Summary
            </h2>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-1">
                  Service Type
                </p>
                <p className="text-lg font-semibold text-gray-900">
                  GST Registration
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-1">
                  Order Value
                </p>
                <p className="text-lg font-semibold text-green-600">₹4,999</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-1">
                  Current Stage
                </p>
                <p className="text-lg font-semibold text-indigo-600">
                  {progress?.currentStage || "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 font-semibold mb-1">
                  Progress
                </p>
                <p className="text-lg font-semibold text-blue-600">
                  {progress?.completionPercentage || 0}%
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 h-3 rounded-full transition-all"
                  style={{ width: `${progress?.completionPercentage || 0}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-600 mt-2">
                {progress?.completionPercentage || 0}% Complete
              </p>
            </div>

            {/* Stage Actions */}
            {progress && (
              <StageActionButtons
                currentStage={progress.currentStage}
                orderId={orderId}
                onRefresh={fetchData}
              />
            )}
          </div>

          {/* Timeline of Events */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Workflow Timeline
            </h2>
            <WorkflowEventTimeline events={events} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Workflow Progress Card */}
          {progress && progress.stages && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Stage Progress
              </h3>
              <div className="space-y-3">
                {progress.stages.map((stage) => (
                  <div
                    key={stage.stage}
                    className={`p-3 rounded-lg border-l-4 transition ${
                      stage.status === "COMPLETED"
                        ? "bg-green-50 border-green-500"
                        : stage.status === "IN_PROGRESS"
                          ? "bg-blue-50 border-blue-500"
                          : "bg-gray-50 border-gray-300"
                    }`}
                  >
                    <p className="font-semibold text-sm text-gray-900">
                      {stage.sequence}. {stage.label}
                    </p>
                    <p
                      className={`text-xs mt-1 font-medium ${
                        stage.status === "COMPLETED"
                          ? "text-green-600"
                          : stage.status === "IN_PROGRESS"
                            ? "text-blue-600"
                            : "text-gray-600"
                      }`}
                    >
                      {stage.status.replace(/_/g, " ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active Exceptions */}
          {progress &&
            progress.exceptions &&
            progress.exceptions.length > 0 && (
              <div className="bg-red-50 rounded-2xl shadow-lg p-6 border-l-4 border-red-500">
                <div className="flex items-center gap-2 mb-4">
                  <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
                  <h3 className="text-lg font-bold text-gray-900">Issues</h3>
                </div>
                <div className="space-y-2">
                  {progress.exceptions.map((exc, idx) => (
                    <div key={idx} className="text-sm">
                      <p className="font-semibold text-red-800">{exc.stage}</p>
                      <p className="text-red-700 text-xs mt-1">
                        {exc.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Quick Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Info</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <UserIcon className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-gray-600">Assigned to</p>
                  <p className="font-semibold text-gray-900">John Doe</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ClockIcon className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-gray-600">Created</p>
                  <p className="font-semibold text-gray-900">Oct 15, 2024</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <DocumentTextIcon className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-gray-600">Documents</p>
                  <p className="font-semibold text-gray-900">4 files</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
