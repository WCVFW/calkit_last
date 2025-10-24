import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "";

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

// Attach auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  signup: (payload) => api.post("/api/auth/signup", payload),
  login: (payload) => api.post("/api/auth/login", payload),
  loginPhone: (payload) => api.post("/api/auth/login-phone", payload),
  verifyPhone: (payload) => api.post("/api/auth/verify-phone", payload),
  requestEmailOtp: (payload) => api.post("/api/auth/request-email-otp", payload),
  verifyEmail: (payload) => api.post("/api/auth/verify-email", payload),
  resetPassword: (payload) => api.post("/api/auth/reset-password", payload),
};

// User APIs
export const userAPI = {
  me: () => api.get("/api/user/me"),
};

// Workflow APIs
export const workflowAPI = {
  getTimeline: (orderId) => api.get(`/api/workflow/orders/${orderId}/timeline`),
  getProgress: (orderId) => api.get(`/api/workflow/orders/${orderId}/progress`),
  getCurrentStage: (orderId) => api.get(`/api/workflow/orders/${orderId}/current-stage`),
  createEvent: (orderId, payload) => api.post(`/api/workflow/orders/${orderId}/event`, payload),
  advanceStage: (orderId, payload) => api.post(`/api/workflow/orders/${orderId}/advance`, payload),
  completeStage: (orderId, payload) => api.post(`/api/workflow/orders/${orderId}/complete`, payload),
  failStage: (orderId, payload) => api.post(`/api/workflow/orders/${orderId}/fail`, payload),
  addException: (orderId, payload) => api.post(`/api/workflow/orders/${orderId}/exception`, payload),
  getActiveExceptions: (orderId) => api.get(`/api/workflow/orders/${orderId}/exceptions`),
  getAvailableStages: () => api.get(`/api/workflow/stages`),
};

// Workflow alerts & statistics
export const workflowAlertAPI = {
  getOrderAlerts: (orderId) => api.get(`/api/workflow/alerts/orders/${orderId}`),
  getUnresolvedForOrder: (orderId) => api.get(`/api/workflow/alerts/orders/${orderId}/unresolved`),
  getAllUnresolved: () => api.get(`/api/workflow/alerts/unresolved`),
  createAlert: (payload) => api.post(`/api/workflow/alerts`, payload),
  resolveAlert: (id, payload) => api.put(`/api/workflow/alerts/${id}/resolve`, payload),
  getUnresolvedCount: (orderId) => api.get(`/api/workflow/alerts/count/${orderId}`),
};

export const workflowStatsAPI = {
  dashboardStats: () => api.get(`/api/workflow/analytics/dashboard-stats`),
  stageStats: () => api.get(`/api/workflow/analytics/stage-stats`),
  exceptionStats: () => api.get(`/api/workflow/analytics/exception-stats`),
};

// Orders
export const orderAPI = {
  getAll: () => api.get("/api/orders"),
  getById: (id) => api.get(`/api/orders/${id}`),
  create: (payload) => api.post("/api/orders", payload),
  update: (id, payload) => api.put(`/api/orders/${id}`, payload),
  delete: (id) => api.delete(`/api/orders/${id}`),
};

// Leads
export const leadAPI = {
  getAll: () => api.get("/api/leads"),
  getById: (id) => api.get(`/api/leads/${id}`),
  create: (payload) => api.post("/api/leads", payload),
  update: (id, payload) => api.put(`/api/leads/${id}`, payload),
  delete: (id) => api.delete(`/api/leads/${id}`),
};

// Cases
export const caseAPI = {
  getAll: () => api.get("/api/cases"),
  getById: (id) => api.get(`/api/cases/${id}`),
  create: (payload) => api.post("/api/cases", payload),
  update: (id, payload) => api.put(`/api/cases/${id}`, payload),
  delete: (id) => api.delete(`/api/cases/${id}`),
};

// Documents / S3
export const docsAPI = {
  createUploadUrl: (payload) => api.post(`/api/docs/upload-url`, payload),
  downloadUrl: (payload) => api.post(`/api/docs/download-url`, payload),
};

// Payments
export const paymentsAPI = {
  createOrder: (payload) => api.post(`/api/payments/order`, payload),
  confirm: (payload) => api.post(`/api/payments/confirm`, payload),
  myPayments: () => api.get(`/api/payments/mine`),
  webhook: (payload, signature) => api.post(`/api/payments/webhook`, payload, { headers: { "X-Razorpay-Signature": signature } }),
};

// Admin
export const adminAPI = {
  createEmployee: (payload) => api.post(`/api/admin/employees`, payload),
  listEmployees: () => api.get(`/api/admin/employees`),
  getEmployee: (id) => api.get(`/api/admin/employees/${id}`),
  deleteEmployee: (id) => api.delete(`/api/admin/employees/${id}`),
};

// Process
export const processAPI = {
  getOrderProcess: (orderId) => api.get(`/api/process/orders/${orderId}`),
  addStage: (orderId, payload) => api.post(`/api/process/orders/${orderId}/stage`, payload),
};

// Execution
export const executionAPI = {
  executeCompanyReg: (payload) => api.post(`/api/execute/company-reg`, payload),
};

// Email verification
export const emailAPI = {
  sendVerification: (payload) => api.post(`/api/verify-email/send`, payload),
};

// AI endpoints
export const aiAPI = {
  chat: (payload) => api.post(`/api/ai/chat`, payload),
  ocrValidate: (payload) => api.post(`/api/ai/ocr/validate`, payload),
  draftDocument: (payload) => api.post(`/api/ai/docs/draft`, payload),
  kbSearch: (payload) => api.post(`/api/ai/kb/search`, payload),
  predictEta: (payload) => api.post(`/api/ai/predict/eta`, payload),
  triageObjection: (payload) => api.post(`/api/ai/triage/objection`, payload),
};

// Execution export
export default api;
