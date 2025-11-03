import axios from "axios";

// This should typically be set to your backend server URL (e.g., http://localhost:8080)
const API_BASE = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:8080' : ""); 

// Create the custom Axios instance
const api = axios.create({
    baseURL: API_BASE,
    timeout: 10000,
});

import { clearToken, clearUser, getToken } from "./auth";

// Attach auth token to requests using the Interceptor (CORRECT)
api.interceptors.request.use((config) => {
    // Read token using getToken which validates length
    const token = getToken();

    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        // Clear any stale session and notify if token is invalid
        clearToken();
        clearUser();
        try { window.dispatchEvent(new Event('auth:update')); } catch (e) {}
        // Helpful dev warning when making API requests without a token
        if (import.meta.env.DEV && String(config.url || "").startsWith('/api')) {
            // console.warn('No valid auth token available for API request:', config.method, config.url);
        }
    }
    return config;
});

// Global response interceptor to handle auth errors (401/403)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        try {
            const status = error?.response?.status;
            if (status === 401 || status === 403) {
                // Clear local session and notify other parts of the app
                clearToken();
                clearUser();
                try { window.dispatchEvent(new Event('auth:update')); } catch (e) {}

                // Redirect the user to login (best-effort)
                try { window.location.href = '/login'; } catch (e) {}
            }
        } catch (err) {
            // ignore
        }
        return Promise.reject(error);
    }
);

// --- API Endpoints ---

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
    update: (payload) => api.put("/api/user/me", payload),
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
    getAll: (options) => api.get("/api/orders", options || {}),
    myOrders: () => api.get("/api/orders/my-orders"),
    getById: (id) => api.get(`/api/orders/${id}`),
    create: (payload) => api.post("/api/orders", payload),
    update: (id, payload) => api.put(`/api/orders/${id}`, payload),
    delete: (id) => api.delete(`/api/orders/${id}`),
    // Documents
    addDocument: (orderId, file) => {
        const fd = new FormData();
        fd.append('file', file);
        return api.post(`/api/orders/${orderId}/documents`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
    },
    listDocuments: (orderId) => api.get(`/api/orders/${orderId}/documents`),
    verifyDocument: (orderId, docId) => api.post(`/api/orders/${orderId}/documents/${docId}/verify`),
    // Download
    downloadDocument: (orderId, docId) => api.get(`/api/orders/${orderId}/documents/${docId}/download`, { responseType: 'blob' }),
    // Payment
    pay: (orderId, payload) => api.post(`/api/orders/${orderId}/pay`, payload),
    // Assign
    assign: (orderId, payload) => api.post(`/api/orders/${orderId}/assign`, payload),
    listAssigned: (assigneeEmail) => api.get(`/api/orders/assigned${assigneeEmail ? `?assigneeEmail=${encodeURIComponent(assigneeEmail)}` : ''}`),
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
    // Upload file directly to server (stores in MySQL blob)
    upload: (formData) => api.post(`/api/docs/upload`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
    // Download document bytes
    downloadDocument: (documentId) => api.get(`/api/docs/${documentId}/download`, { responseType: 'blob' }),
    listMyDocs: () => api.get(`/api/docs/my-docs`),
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
    updateEmployee: (id, payload) => api.put(`/api/admin/employees/${id}`, payload),
    deleteEmployee: (id) => api.delete(`/api/admin/employees/${id}`),
};

// Service hub - aggregated dashboard/status for admin and employee
export const serviceHubAPI = {
    status: (role, email) => api.get(`/api/servicehub/status?role=${encodeURIComponent(role)}${email ? `&email=${encodeURIComponent(email)}` : ''}`),
    myOrders: (service) => api.get(`/api/servicehub/my-orders${service ? `?service=${encodeURIComponent(service)}` : ''}`),
    orders: (service) => api.get(`/api/servicehub/orders${service ? `?service=${encodeURIComponent(service)}` : ''}`),
};

// Services API (e.g., GST registration)
export const serviceAPI = {
    createGSTOrder: (payload) => api.post(`/api/services/gst/register`, payload),
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

// Export the custom Axios instance
export default api;