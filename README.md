# India Gully Enterprise Platform

**Celebrating Desiness** | Multi-Vertical Advisory Firm  
Vivacious Entertainment and Hospitality Pvt. Ltd.

---

## 🌐 Live URLs

| Environment | URL |
|-------------|-----|
| **Production** | https://india-gully.pages.dev |
| **Latest Deploy** | https://bc351fc2.india-gully.pages.dev |
| **🔍 Deep Audit Report** | https://india-gully.pages.dev/audit |
| **HORECA Customer Portal** | https://india-gully.pages.dev/horeca/portal |
| **GraphQL Playground** | https://india-gully.pages.dev/admin/api-docs |
| **Sandbox Preview** | http://localhost:3000 |

---

## 🔐 Portal Access

All portals require credentials provisioned by the system administrator.  
**Credentials are never displayed on login pages** — contact `admin@indiagully.com` for evaluator access.

| Portal | URL | Authentication |
|--------|-----|---------------|
| Super Admin | `/admin` | Admin username + password + **RFC 6238 TOTP** |
| Client | `/portal/client` | Client email + password + **RFC 6238 TOTP** |
| Employee | `/portal/employee` | Employee ID + password + **RFC 6238 TOTP** |
| Board & KMP | `/portal/board` | Director DIN/KMP ID + password + **RFC 6238 TOTP** |

> 🔒 All portals enforce: PBKDF2-SHA256 password hashing · RFC 6238 TOTP server-side · HttpOnly Secure session cookies · CSRF synchronizer tokens · Server-side rate limiting (5 attempts → 5-min lockout) · 30-min session TTL.

---

## ✅ Completed Features

### Phase 1 — Corporate Website (LIVE)
- **Home:** Strategy-led hero, vertical showcase, active mandates, leadership, brand ecosystem
- **About:** Vision & mission, company timeline (2017–2024), board & KMP profiles, governance note
- **Services:** 5 advisory verticals (Real Estate, Retail, Hospitality, Entertainment, Debt & Special Situations)
- **HORECA Solutions:** 8 supply categories with quote request form
- **Mandates & Listings:** 6 active mandates (₹8,815 Cr total pipeline), NDA-gated
- **Insights:** 6 thought leadership articles with gated access
- **Contact:** Mandate enquiry form with 6 enquiry types
- **Legal Pages:** Privacy Policy, Terms of Use, Disclaimer (`/legal/*`)

---

### D-Round Security Hardening (LIVE ✅ — commit c8dcd91)

| ID | Fix | Verification |
|----|-----|-------------|
| **D1** | Removed credential banner + pseudo-TOTP from admin login | `curl /admin \| grep -c 'Admin@IG2024' → 0` |
| **D2** | Removed `DEMO_PASSWORDS` plaintext map from api.tsx | `grep -c 'DEMO_PASSWORDS' api.tsx → 0` |
| **D3** | Replaced /demo-access credential display with contact-admin guidance | `curl /portal/demo-access \| grep -c 'JBSWY3DP' → 0` |
| **D4** | Added CSP + full security headers (`_headers` + middleware) | `curl -I /admin` → HSTS, X-Frame-Options, CSP, etc. |
| **D5** | CORS restricted to `india-gully.pages.dev` only | `cors({origin: ['https://india-gully.pages.dev', ...]})` |
| **D6** | GitHub Actions CI/CD (build + gitleaks scan + deploy + smoke test) | `.github/workflows/ci.yml` |
| **D7** | D1 migration schema — 11 tables covering all ERP entities | `migrations/0001_initial_schema.sql` |
| **D8** | Build, test all routes, deploy, update README & audit report | HTTP 200 on all routes, production live |

---

### E-Round — P1–P3 Integrations (LIVE ✅ — commit ed13862)

| ID | Deliverable | Status |
|----|------------|--------|
| **E1** | KV-backed session middleware (IG_SESSION_KV, IG_RATELIMIT_KV, IG_AUDIT_KV) | ✅ Live |
| **E2** | D1 local migration applied (28 SQL commands, all tables) | ✅ Local |
| **E3** | Razorpay live integration — HMAC-SHA256 sig verification | ✅ Live (demo mode until secrets set) |
| **E4** | GST IRP e-invoice generation — NIC IRP v1.03 compatible | ✅ Live (stub + IRN SHA-256 hash) |
| **E5** | DocuSign envelope API — send, status, void | ✅ Live (demo mode until API key set) |
| **E6** | SendGrid email delivery integration | ✅ Live (demo mode until API key set) |
| **E7** | DPDP consent banner config + withdrawal endpoint | ✅ Live |
| **E8** | Statutory registers upgraded to D1-backed CRUD | ✅ Live (in-memory fallback) |
| **E9** | FSSAI renewal API + inspection scheduling | ✅ Live |
| **E10** | EPFO challan status + ECR generator | ✅ Live |
| **E11** | Architecture microservices roadmap (8 services) | ✅ `/api/architecture/microservices` |
| **E12** | FIDO2/WebAuthn configuration stub | ✅ `/api/security/fido2-config` |
| **E13** | MCA21 ROC filing schedule (AOC-4, MGT-7A, MSME-1) | ✅ `/api/compliance/mca-integration` |
| **E14** | Penetration test checklist (5 IDOR/XSS/CSRF/TLS categories) | ✅ `/api/security/pentest-checklist` |
| **E15** | Disaster Recovery plan (RTO 4h / RPO 24h, rollback procedure) | ✅ `/api/operations/dr-plan` |

---

### Phase 2–6 — Enterprise Platform (LIVE ✅)

| Module | URL | Features |
|--------|-----|---------|
| Super Admin ERP | `/admin/*` | CMS, Finance, HR, Governance, Contracts, HORECA, Security, BI |
| Client Portal | `/portal/client/*` | Mandates, invoices, payments, KYC, deliverables, messages |
| Employee Portal | `/portal/employee/*` | Attendance, leave, payslips, Form-16, tax declaration |
| Board & KMP Portal | `/portal/board/*` | Board packs, voting, statutory registers, governance |
| Sales Force | `/admin/sales/*` | CRM, pipeline, quotes, commission engine, e-sign |
| HORECA Portal | `/horeca/portal` | Tier pricing, catalogue, cart, order history |

---

### Enhancement Rounds A5–A12, B1–B9, C1–C9 (LIVE ✅)

All prior enhancement rounds are live. Key additions:
- **Governance:** Quorum tracker, digital minute book, SS-1/SS-2 notices, statutory registers
- **Finance ERP:** Multi-entity GL, e-Invoice IRN/QR, TDS 26Q, Form 26AS reconciliation, ITR tracker
- **HR ERP:** Form-16 portal, appraisals & OKR, onboarding wizard, TDS declaration
- **Security:** ABAC matrix, device fingerprint, DPDP consent, document watermark, breach notification
- **BI & Analytics:** Predictive analytics, OKR/KPI tracker, mandate risk scoring
- **CMS v2:** AI copy assist, page builder, approval workflow, digital asset manager
- **UX:** Dark mode, Hindi/English toggle, guided tour, WCAG focus indicators

---

## 🔌 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/health` | Platform status, version 2026.05, module list, security config |
| `GET` | `/api/auth/session` | Validate server-side KV session |
| `GET` | `/api/auth/csrf-token` | Issue CSRF token |
| `POST` | `/api/auth/login` | Portal login (PBKDF2 + RFC 6238 TOTP + KV session cookie) |
| `POST` | `/api/auth/admin` | Admin login with TOTP |
| `POST` | `/api/auth/logout` | Session invalidation (KV delete) |
| `POST` | `/api/auth/reset/request` | Password reset OTP (email P1) |
| `POST` | `/api/auth/reset/verify` | Verify OTP + set new password |
| `POST` | `/api/enquiry` | Mandate/advisory enquiry |
| `POST` | `/api/horeca-enquiry` | HORECA quote request |
| `POST` | `/api/subscribe` | Newsletter subscription |
| `GET` | `/api/listings` | Public mandates JSON |
| `GET` | `/api/mandates` | Client mandates with progress |
| `GET` | `/api/employees` | Employee directory |
| `GET` | `/api/finance/summary` | Finance KPIs |
| `GET` | `/api/compliance` | Upcoming compliance calendar |
| `GET` | `/api/kpi/summary` | OKR/KPI tracker data |
| `GET` | `/api/risk/mandates` | Mandate risk scores |
| `GET` | `/api/contracts/expiring` | Contracts expiring 30/60/90d |
| `GET` | `/api/finance/reconcile` | Bank reconciliation status |
| `GET` | `/api/governance/resolutions` | Board resolutions register |
| `GET/POST` | `/api/governance/registers/:type` | Statutory registers CRUD (D1-backed) |
| `POST` | `/api/payments/order` | Razorpay live order creation |
| `POST` | `/api/payments/verify-signature` | Razorpay HMAC-SHA256 sig verification |
| `POST` | `/api/finance/einvoice/generate` | GST IRP e-invoice (NIC v1.03 stub) |
| `POST` | `/api/finance/einvoice/cancel` | Cancel IRN |
| `POST` | `/api/contracts/esign/send-envelope` | DocuSign envelope creation |
| `GET` | `/api/contracts/esign/envelope/:id` | DocuSign envelope status |
| `POST` | `/api/dpdp/consent` | DPDP consent recording |
| `GET` | `/api/dpdp/banner-config` | DPDP consent banner configuration |
| `POST` | `/api/dpdp/consent/withdraw` | DPDP consent withdrawal |
| `POST` | `/api/dpdp/breach/notify` | Data breach notification |
| `POST` | `/api/notifications/send-email` | SendGrid email delivery |
| `GET` | `/api/horeca/fssai/compliance` | FSSAI licence + compliance checklist |
| `POST` | `/api/horeca/fssai/renewal` | FSSAI licence renewal request |
| `POST` | `/api/hr/epfo/ecr` | EPFO ECR v2.0 file generator |
| `GET` | `/api/hr/epfo/challan/:ecr_id` | EPFO challan payment status |
| `GET` | `/api/hr/esic/statement` | ESIC contribution statement |
| `GET` | `/api/architecture/microservices` | Micro-services migration roadmap |
| `GET` | `/api/security/fido2-config` | FIDO2/WebAuthn configuration |
| `GET` | `/api/compliance/mca-integration` | MCA21 ROC filing schedule |
| `GET` | `/api/security/pentest-checklist` | Penetration test checklist |
| `GET` | `/api/operations/dr-plan` | Disaster Recovery plan (RTO/RPO) |

---

## 🏗️ Architecture

- **Platform:** Cloudflare Pages / Workers (edge runtime, 97+ routes)
- **Framework:** Hono v4.12 (TypeScript)
- **Frontend:** Server-side HTML + Tailwind CSS CDN + FontAwesome + Chart.js
- **Auth:** PBKDF2-SHA256 + RFC 6238 TOTP + HttpOnly session cookie + CSRF synchronizer token
- **Storage:** Cloudflare D1 (schema ready) · R2 (documents) · KV (sessions, rate-limiting)
- **Headers:** HSTS, X-Frame-Options (DENY), X-Content-Type-Options, Referrer-Policy, CSP, Permissions-Policy
- **CI/CD:** GitHub Actions (build + type-check + gitleaks scan + CF Pages deploy + smoke test)

## 👥 Leadership

| Name | Role | Email |
|------|------|-------|
| Arun Manikonda | Managing Director | akm@indiagully.com |
| Pavan Manikonda | Executive Director | pavan@indiagully.com |
| Amit Jhingan | President, Real Estate | amit.jhingan@indiagully.com |

---

## 🚀 Deployment Status

- **Platform:** Cloudflare Pages · Project: `india-gully`
- **Status:** ✅ Active — E-Round (P1–P3) complete (commit ed13862)
- **Last Updated:** 28 Feb 2026
- **Tech Stack:** Hono + TypeScript + TailwindCSS CDN + Chart.js
- **Worker Size:** 1,216 KB · 120+ routes · 42+ API endpoints · 18 modules
- **KV Namespaces:** IG_SESSION_KV · IG_RATELIMIT_KV · IG_AUDIT_KV (all live)

---

## 🔍 Deep-Audit Report — v2026.05-E-Round (28 Feb 2026)

**Live Report:** https://india-gully.pages.dev/audit

### Current Security Posture

| Metric | D-Round | E-Round |
|--------|---------|--------|
| Security Score | 42/100 | **55/100** ↑ |
| Compliance Score | 47/100 | **52/100** ↑ |
| Functional Completeness | 72/100 | **78/100** ↑ |
| Production Readiness | ⚠️ P1 Phase | ⚠️ P2 Phase (D1 provisioning pending) |

### P0 & P1 Gates — All Cleared

| Gate | Status |
|------|--------|
| Remove hard-coded credentials from source | ✅ PBKDF2 hashes only |
| Remove credentials from HTML responses | ✅ Verified production |
| KV-backed session middleware | ✅ IG_SESSION_KV live |
| KV-backed rate-limiting | ✅ IG_RATELIMIT_KV live |
| KV-backed audit log | ✅ IG_AUDIT_KV live |
| RFC 6238 TOTP server-side | ✅ HMAC-SHA1, ±1 window |
| CSRF synchronizer token | ✅ MEM_CSRF + session-bound |
| HTTP security headers | ✅ HSTS, CSP, X-Frame-Options |
| CORS restricted | ✅ india-gully.pages.dev |
| CI/CD pipeline | ✅ GitHub Actions |
| D1 schema (local) | ✅ 28 SQL commands applied |

### Open Findings (from pen-test checklist)

| ID | Severity | Issue | Remediation |
|----|----------|-------|-------------|
| PT-001 | **High** | IDOR — API routes not validated against session user | ABAC middleware (P3) |
| PT-002 | **Medium** | XSS risk in dynamic HTML templates | DOMPurify or JSX auto-escaping |
| PT-003 | **Medium** | CSRF tokens in MEM_CSRF (not KV) | Bundle CSRF inside KV session |
| PT-004 | **Low** | CSP nonce not per-request on inline scripts | Per-request nonces in shells |

### Next Steps (F-Round — P3/Production cut-over)

| Item | Description | Timeline |
|------|-------------|----------|
| D1 provisioning | Grant D1:Edit permission to API token | Week 1 |
| ABAC middleware | Fix PT-001 IDOR — validate all routes against session | Week 2 |
| FIDO2 deployment | @simplewebauthn/server integration | Month 2 |
| Real IdP | Auth0/Keycloak replacing USER_STORE | Month 3 |
| Penetration test | CERT-In empanelled auditor | Month 3 |
| MCA API integration | Live e-filing (AOC-4, MGT-7A, MSME-1) | Month 4-6 |
