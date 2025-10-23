import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8081";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// Attach auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Workflow APIs
export const workflowAPI = {
  getTimeline: (orderId) => api.get(`/api/workflow/orders/${orderId}/timeline`),
  getProgress: (orderId) => api.get(`/api/workflow/orders/${orderId}/progress`),
  getCurrentStage: (orderId) =>
    api.get(`/api/workflow/orders/${orderId}/current-stage`),

  createEvent: (orderId, payload) =>
    api.post(`/api/workflow/orders/${orderId}/event`, payload),
  advanceStage: (orderId, payload) =>
    api.post(`/api/workflow/orders/${orderId}/advance`, payload),
  completeStage: (orderId, payload) =>
    api.post(`/api/workflow/orders/${orderId}/complete`, payload),
  failStage: (orderId, payload) =>
    api.post(`/api/workflow/orders/${orderId}/fail`, payload),

  addException: (orderId, payload) =>
    api.post(`/api/workflow/orders/${orderId}/exception`, payload),
  getActiveExceptions: (orderId) =>
    api.get(`/api/workflow/orders/${orderId}/exceptions`),

  getAvailableStages: () => api.get(`/api/workflow/stages`),
};

// Order APIs
export const orderAPI = {
  getAll: () => api.get("/api/orders"),
  getById: (id) => api.get(`/api/orders/${id}`),
  create: (payload) => api.post("/api/orders", payload),
  update: (id, payload) => api.put(`/api/orders/${id}`, payload),
  delete: (id) => api.delete(`/api/orders/${id}`),
};

// Lead APIs
export const leadAPI = {
  getAll: () => api.get("/api/leads"),
  getById: (id) => api.get(`/api/leads/${id}`),
  create: (payload) => api.post("/api/leads", payload),
  update: (id, payload) => api.put(`/api/leads/${id}`, payload),
  delete: (id) => api.delete(`/api/leads/${id}`),
};

// Case APIs
export const caseAPI = {
  getAll: () => api.get("/api/cases"),
  getById: (id) => api.get(`/api/cases/${id}`),
  create: (payload) => api.post("/api/cases", payload),
  update: (id, payload) => api.put(`/api/cases/${id}`, payload),
  delete: (id) => api.delete(`/api/cases/${id}`),
};

export default api;
