Vakilsearch — Full Project Overview

Summary
-------
This repository contains a React frontend (Vite + Tailwind) and a Spring Boot backend (monolithic demo scaffold with JPA and MySQL/H2 support). The project implements a customer journey for legal/compliance services (Company Registration, Trademark, Tax, Documents) and backend process modules (CRM, onboarding, case management, workflow, AI touchpoints).

Top-level layout (what exists now)
---------------------------------
- frontend/  — React app (Vite + Tailwind)
  - public/ index.html
  - src/
    - App.jsx — main app and route definitions
    - components/ Header.jsx, Footer.jsx, PageLoader.jsx, ProtectedRoute.jsx, CheckoutModal.jsx, etc.
    - pages/ — service pages, dashboard pages (Dashboard, ServiceHub, BusinessSetup routes, Consult pages)
    - layouts/ DashboardLayout.jsx — dashboard layout and nav
    - lib/ api.js, auth.js, utils.js — HTTP client, auth helpers
- backend/ — Spring Boot backend
  - src/main/java/com/calzone/financial/ — application source
    - BackendApplication.java
    - auth/ — User entity, AuthService, AuthController, JwtUtil
    - crm/ — Lead entity, LeadController
    - casemgmt/ — CaseRecord, CaseController
    - document/ — Document entity, DocumentController
    - ai/ — AIController, MockAIService, DTOs
    - order/ — Order entity and controller
    - payments/ — PaymentsController (mock)
    - workflow/ — WorkflowController (mock endpoints: timeline, progress, analytics)
  - src/main/resources/
    - application.properties (MySQL defaults)
    - application-demo.properties (H2 demo profile)
    - static/index.html (backend-served demo UI)
  - pom.xml — Maven dependencies (Spring Boot, JPA, MySQL, H2, AWS SDK, etc.)

Key implemented features
------------------------
- Demo AI endpoints (mocked): POST /api/ai/chat, /api/ai/ocr/validate, /api/ai/docs/draft, /api/ai/kb/search, /api/ai/predict/eta, /api/ai/triage/objection
- Auth: register/login endpoints using JWT generation; controller now returns { token, user } payload so frontend can store user details
- Entities & APIs: Leads (/api/leads), Cases (/api/cases), Documents (/api/documents), Orders (/api/orders)
- Workflow & analytics mock endpoints for dashboard visualization (/api/workflow/...)
- Frontend Service Hub: displays services grid and now navigates to dedicated service pages (e.g., /BusinessSetup/plc)
- Checkout flow: CheckoutModal component to create an order and call mock payment endpoint, then redirect to order detail
- DashboardLayout: added account icon (top-right) with My Account and Logout, removed Users & Roles nav link per request
- Auth flow: frontend stores authToken and authUser in localStorage; axios interceptor attaches Authorization header automatically

Files added/modified (high level)
---------------------------------
- Added backend AI & workflow controllers and DTOs
  - backend/src/main/java/com/calzone/financial/ai/AIController.java
  - backend/src/main/java/com/calzone/financial/ai/MockAIService.java
  - backend/src/main/java/com/calzone/financial/ai/dto.java
- Auth changes:
  - backend/src/main/java/com/calzone/financial/auth/AuthService.java (now returns token + user)
  - backend/src/main/java/com/calzone/financial/auth/AuthController.java (returns same)
- Orders & Payments:
  - backend/src/main/java/com/calzone/financial/order/Order.java
  - backend/src/main/java/com/calzone/financial/order/OrderRepository.java
  - backend/src/main/java/com/calzone/financial/order/OrderController.java
  - backend/src/main/java/com/calzone/financial/payments/PaymentsController.java
- Workflow mock endpoints:
  - backend/src/main/java/com/calzone/financial/workflow/WorkflowController.java
- Frontend additions/changes:
  - frontend/src/components/CheckoutModal.jsx (new)
  - frontend/src/pages/Dashboard/ServiceHub.jsx (cards navigate to service pages; openCheckout event preserved)
  - frontend/src/App.jsx (mount CheckoutModal)
  - frontend/src/lib/auth.js (token keys standardized to authToken/authUser)
  - frontend/src/layouts/DashboardLayout.jsx (removed Users & Roles nav and added account icon + logout behavior)
- Docs modified/removed:
  - WORKFLOW.txt was emptied (per request)
  - Several README and md files were emptied earlier
  - backend/PROJECT_OVERVIEW.md and PROJECT_OVERVIEW_FULL.md created/updated

Auth & session control
----------------------
- Frontend stores token and user in localStorage keys: authToken, authUser (via src/lib/auth.js)
- Axios instance (src/lib/api.js) attaches Authorization header (Bearer token) for all requests
- Login flow (src/pages/Login.jsx) posts to /api/auth/login and stores token + user, dispatches "auth:update" event, and navigates to /dashboard
- Logout actions are available in Header (top-right) and DashboardLayout account dropdown. Logout clears authToken and authUser and emits "auth:update" then redirects to /login
- Backend AuthController returns { token, user } for login/register; JwtUtil is present for token generation and parsing. SecurityConfig currently allows all /api/** for demo; before production, enable JWT validation and RBAC enforcement.

Dashboard changes
-----------------
- The DashboardLayout navigation no longer shows "Users & Roles". Instead, a circular account icon appears in the top-right which opens a small menu with "My Account" (link to /dashboard/profile) and "Logout".
- Clicking a service card in Service Hub navigates the user to the dedicated service page (e.g., /BusinessSetup/plc) via react-router; if a page module is missing, ServiceLoader shows a friendly message.
- Checkout flow is available as a modal (triggered via "Get Started" or programmatically via the global openCheckout event), which creates an order via backend and triggers a mock payment.

Next recommended actions (priority)
----------------------------------
1. Enable JWT validation server-side and restrict API endpoints; integrate role checks for administrative actions.
2. Replace mock AI/OCR with real provider integrations (OpenAI for LLM, Google Vision/AWS Textract/Tesseract for OCR). Implement prompt templates, citation extraction, and hallucination mitigation.
3. Implement background workers (message queue or scheduled tasks) for government portal polling, status updates, and SLA risk detection.
4. Add robust file storage (S3 + signed URLs) and virus scanning for uploads.
5. Add Flyway migrations and seed scripts for MySQL; add a CI pipeline and unit/integration tests.
6. Harden security: HTTPS, secrets management, PII redaction, audit logs, and Sentry monitoring.

How to test current flows quickly
--------------------------------
- Start backend (demo/h2): mvn -f backend/pom.xml spring-boot:run -Dspring-boot.run.profiles=demo
- Start frontend: cd frontend && npm run dev
- Login: Use Signup page to create an account, then Login to access the dashboard. On login, you will be redirected to /dashboard and see the account icon in top-right. Use the Service Hub to click services and navigate to their pages.

If you want me to proceed with any of the next steps (OpenAI wiring, OCR, JWT enforcement, S3 integration, role-based UI), tell me which one to prioritize and I will implement it next.
