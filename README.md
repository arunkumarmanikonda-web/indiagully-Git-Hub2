# India Gully Enterprise Platform

**Celebrating Desiness** | Multi-Vertical Advisory Firm  
Vivacious Entertainment and Hospitality Pvt. Ltd.

---

## 🌐 Live URLs

| Environment | URL |
|-------------|-----|
| **Production** | https://india-gully.pages.dev |
| **Latest Deploy** | https://2a608e93.india-gully.pages.dev |
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
| `GET` | `/api/health` | Platform status, version 2026.04, module list, security config |
| `GET` | `/api/auth/session` | Validate server-side session |
| `GET` | `/api/auth/csrf-token` | Issue CSRF token |
| `POST` | `/api/auth/login` | Portal login (PBKDF2 + RFC 6238 TOTP + session cookie) |
| `POST` | `/api/auth/admin` | Admin login with TOTP |
| `POST` | `/api/auth/logout` | Session invalidation |
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
| `POST` | `/api/payments/create-order` | Razorpay order creation (P2: add key secret) |
| `POST` | `/api/payments/verify` | Razorpay payment verification |
| `POST` | `/api/dpdp/consent` | DPDP consent recording |
| `POST` | `/api/dpdp/breach/notify` | Data breach notification |

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
- **Status:** ✅ Active — D-Round security hardening complete (commit c8dcd91)
- **Last Updated:** 28 Feb 2026
- **Tech Stack:** Hono + TypeScript + TailwindCSS CDN + Chart.js
- **Worker Size:** 1,190 KB · 97+ routes · 25+ API endpoints · 18 modules

---

## 🔍 Deep-Audit Report — v2026.04-D-Round (28 Feb 2026)

**Live Report:** https://india-gully.pages.dev/audit

### Current Security Posture

| Metric | Before D-Round | After D-Round |
|--------|---------------|--------------|
| Security Score | 18/100 | **42/100** ↑ |
| Compliance Score | 47/100 | 47/100 (D1 schema ready) |
| Functional Completeness | 72/100 | 72/100 |
| Production Readiness | ❌ NOT READY | ⚠️ P1 Phase (P0 gates cleared) |

### P0 Gates — Status After D-Round

| Gate | Status |
|------|--------|
| Remove hard-coded credentials from source | ✅ **Done** — PBKDF2 hashes, no plaintext |
| Remove credentials from HTML responses | ✅ **Done** — admin login, demo-access, portal pages |
| Server-side session (HttpOnly cookie) | ✅ **Done** — SESSION_STORE + 30min TTL |
| RFC 6238 TOTP server-side | ✅ **Done** — HMAC-SHA1, ±1 window |
| Server-side CSRF validation | ✅ **Done** — CSRF_STORE + validateCSRF() |
| Server-side rate limiting | ✅ **Done** — checkRateLimit() per-IP |
| HTTP security headers (CSP, HSTS, etc.) | ✅ **Done** — _headers + middleware |
| CORS restricted to known origins | ✅ **Done** — india-gully.pages.dev |
| CI/CD pipeline | ✅ **Done** — .github/workflows/ci.yml |
| D1 schema for persistence | ✅ **Done** — migrations/0001_initial_schema.sql |

### P1 Backlog (Next Sprint — 2–6 weeks)

| Item | Description | Priority |
|------|-------------|----------|
| D1 provisioning | `wrangler d1 create india-gully-production` + migrate | High |
| Email delivery | SendGrid/Resend for password reset OTP | High |
| Bundle splitting | Reduce 1,190 KB worker — code-split large routes | Medium |
| Session persistence | Move SESSION_STORE to Cloudflare KV | High |

### P2 Backlog (6–12 weeks)

| Item | Description | Priority |
|------|-------------|----------|
| GST/IRP API | NIC IRP sandbox → production for e-invoice IRN | High |
| Razorpay live | Add `RAZORPAY_KEY_ID` + `RAZORPAY_KEY_SECRET` Cloudflare secrets | High |
| DocuSign live | Configure DocuSign integration + Aadhaar eSign | High |
| Statutory registers CRUD | Live modal CRUD backed by D1 | High |
| EPFO ECR generator | Live EPFO portal integration | Medium |
| FSSAI compliance module | HORECA food safety compliance | Medium |

### P3 Backlog (3–6 months)

| Item | Description | Priority |
|------|-------------|----------|
| Real IdP | Cloudflare Access / Auth0 / FIDO2 hardware keys | High |
| MCA/ROC integration | Live AGM, AOC-4, MGT-7 e-filing | High |
| TRACES integration | Form 26Q TDS filing, Form 16 generation | High |
| Penetration testing | Bi-annual pen-test + bug bounty programme | High |
| Disaster recovery | RTO/RPO definition, active-active clustering | Medium |
| Micro-services | Event-driven architecture (Kafka/NATS) | Medium |
