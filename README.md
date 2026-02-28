# India Gully Enterprise Platform

**Celebrating Desiness** | Multi-Vertical Advisory Firm  
Vivacious Entertainment and Hospitality Pvt. Ltd.

---

## 🌐 Live URLs

| Environment | URL |
|-------------|-----|
| **Production** | https://india-gully.pages.dev |
| **Latest Deploy** | https://5567855b.india-gully.pages.dev |
| **HORECA Customer Portal** | https://india-gully.pages.dev/horeca/portal |
| **Sandbox Preview** | http://localhost:3000 |

---

## 🔐 Test Login Credentials

| Portal | URL | ID | Password | OTP |
|--------|-----|----|----------|-----|
| Super Admin | `/admin` | superadmin@indiagully.com | Admin@IG2024! | 000000 |
| Client | `/portal/client` | demo@indiagully.com | Client@IG2024 | 000000 |
| Employee | `/portal/employee` | IG-EMP-0001 | Emp@IG2024 | 000000 |
| Board & KMP | `/portal/board` | IG-KMP-0001 | Board@IG2024 | 000000 |

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

### Phase 2–6 — Enterprise Platform (LIVE ✅)

#### Portal Logins
| Portal | URL | Credentials |
|--------|-----|-------------|
| Client | `/portal/client` | demo@indiagully.com / Client@IG2024 / OTP: 000000 |
| Employee | `/portal/employee` | IG-EMP-0001 / Emp@IG2024 / OTP: 000000 |
| Board & KMP | `/portal/board` | IG-KMP-0001 / Board@IG2024 / OTP: 000000 |
| Super Admin | `/admin` | superadmin@indiagully.com / Admin@IG2024! / OTP: 000000 |

---

### Audit Enhancement Round — All 10 Items Complete (LIVE ✅)

| ID | Module | Enhancements Delivered |
|----|--------|----------------------|
| R1 | **API Docs** | OpenAPI-compatible spec at `/admin/api-docs` — 24 endpoints, tag+auth labels, Swagger-style try-it |
| R2 | **Security (Zero-Trust)** | New tab 6: Zero-Trust policy toggles, device fingerprint registry, per-action re-auth matrix (9 sensitive actions), CSP header live view with all 6 HTTP security headers |
| R3 | **Data Protection** | DPDP Act 2023 consent banner, document watermark (10-tile grid on print/download), 6-field masking (PAN/Aadhaar/bank/salary/email/phone) |
| R4 | **Finance ERP** | +3 new tabs: Multi-Entity Ledger (3 entities, intercompany eliminations, consolidated P&L), E-Way Bill (generate EWB, GSTIN routing, register), TDS 26Q & Period Closing (vendor-wise TDS, Form 16A, year-end checklist with 9-step closer) |
| R5 | **HR ERP** | +2 new tabs: Tax Declaration Portal (live TDS estimator with 80C/80D/HRA/NPS sliders + regime toggle), Onboarding Wizard (7-step wizard, active onboardings tracker, bank+PF setup) |
| R6 | **Governance** | +2 new tabs: DSC & Signatures (DSC registry, pending signatures queue, digital director attendance, SS-1 format export), SS-1/SS-2 Notices (draft notices, compliance records, Companies Act 2013 checklist) |
| R7 | **Smart Contracts** | +3 new tabs: Renewals Tracker (6 contracts, expiry alerts, auto-renew config, reminder settings), Version Diff (4-version history, side-by-side diff viewer, revert), AI Risk Scanner (clause risk scoring, 4 risk categories, fix suggestions) |
| R8 | **HORECA Customer Portal** | New public route `/horeca/portal` — full customer-facing portal: tier-based pricing (Premium/Preferred/Standard/Trial), product catalogue (8 SKUs), add-to-cart, stock check, order history, portal account admin tab in admin HORECA |
| R9 | **BI & Analytics** | `/admin/kpi` — OKR/KPI tracker with 6 departments, 8 KPIs, add key result form. `/admin/risk` — Mandate Risk Scoring Dashboard (6 mandates, 5-factor radar, sector concentration heatmap) |
| R10 | **Build & Deploy** | All changes built (910 KB worker), tested (10/10 routes 200 OK), deployed to `india-gully.pages.dev` (commit d16c401) |

---

### Phase 6 — Enterprise Security, ERP Depth, Sales Force, CMS v2 (LIVE ✅)

| Module | What's New |
|--------|-----------|
| **Security** | Security score banner, TOTP/2FA per-user, RBAC matrix (6 roles), rate limiting, PAN/Aadhaar/bank masking, IP whitelist + session management |
| **Governance** | Digital voting engine, KYC per director, 9 statutory registers, agenda builder, meeting register |
| **HR ERP** | Salary structure (8 components), TDS declaration, payroll register, PF Challan |
| **Finance ERP** | Account ledger, voucher entry, bank reconciliation, e-Invoice with IRN+QR, GST calendar |
| **Client Portal** | Multi-method payments, KYC upload, message read receipts |
| **HORECA** | Inventory ledger + alerts, vendor tier/rating, PO approval workflow |
| **BI & Reports** | 4 interactive Chart.js charts, analytics builder, scheduled reports |
| **Sales Force Engine** | 7 routes (`/admin/sales/*`): Dashboard + Kanban, Leads CRM, Pipeline, Quotes, Engagements, Tasks, Analytics |
| **CMS v2** | Page Builder, AI Copy Assist (9 types, 5 tones), Approval Workflow, Branded Templates, SEO scoring |

---

## 🔌 API Endpoints (24 total)

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/health` | None | Platform status, version 2026.03, module list |
| POST | `/api/auth/login` | None | Portal login (client/employee/board) |
| POST | `/api/auth/admin` | None | Admin login with TOTP |
| POST | `/api/auth/reset` | None | Password reset trigger |
| POST | `/api/enquiry` | None | Mandate/advisory enquiry |
| POST | `/api/horeca-enquiry` | None | HORECA quote request |
| POST | `/api/subscribe` | None | Newsletter subscription |
| GET | `/api/listings` | None | Public mandates JSON |
| GET | `/api/mandates` | Portal | Client mandates with progress |
| GET | `/api/invoices` | Portal | Invoice register |
| GET | `/api/employees` | Admin | Employee directory |
| GET | `/api/finance/summary` | Admin | Finance KPIs |
| GET | `/api/compliance` | Admin | Upcoming compliance dates |
| GET | `/api/horeca/catalogue` | None | HORECA catalogue |
| GET | `/api/kpi/summary` | Admin | OKR/KPI tracker data |
| GET | `/api/risk/mandates` | Admin | Mandate risk scores |
| GET | `/api/contracts/expiring` | Admin | Contracts expiring 30/60/90d |
| GET | `/api/finance/reconcile` | Admin | Bank reconciliation status |
| GET | `/api/governance/resolutions` | Board | Board resolutions register |
| POST | `/api/attendance/checkin` | Portal | Employee check-in/out |
| POST | `/api/leave/apply` | Portal | Leave application |
| POST | `/api/hr/tds-declaration` | Portal | Investment declaration + TDS calc |
| POST | `/api/finance/voucher` | Admin | Double-entry voucher |
| POST | `/api/contracts/clause-check` | Admin | AI clause risk scanner |

---

## 📊 Code Metrics

| File | Lines | Description |
|------|-------|-------------|
| `src/routes/admin.tsx` | ~5,028 | Super Admin ERP (all modules) |
| `src/routes/sales.tsx` | 805 | Sales Force Engine (7 routes) |
| `src/routes/portal.tsx` | 1,999 | Client, Employee, Board portals |
| `src/routes/horeca.tsx` | 375 | HORECA public + customer portal |
| `src/lib/layout.ts` | 667 | Master layout, DPDP, watermark |
| `src/routes/api.tsx` | 421 | 24 REST API endpoints |
| `src/index.tsx` | ~137 | App entry + legal pages |
| **Total** | **~9,432** | **Compiled worker: 910 KB** |

---

## 🏗️ Architecture

- **Platform:** Cloudflare Pages / Workers (edge runtime, 92 routes)
- **Framework:** Hono (TypeScript)
- **Frontend:** Server-side HTML + Tailwind CSS CDN + FontAwesome + Chart.js
- **Storage:** Cloudflare R2 (documents) — D1/KV ready
- **Integrations:** GST Portal, Vyapar, Gmail SMTP, WhatsApp Business, DocuSign, Zoho CRM, SendGrid, Tally Prime
- **Security:** Zero-Trust, TOTP 2FA, RBAC/ABAC, IP whitelist, rate limiting, PAN/Aadhaar masking, device fingerprint, CSP headers, DPDP consent, document watermark, re-auth for sensitive actions, immutable audit log

## 👥 Leadership

| Name | Role | Email |
|------|------|-------|
| Arun Manikonda | Managing Director | akm@indiagully.com |
| Pavan Manikonda | Executive Director | pavan@indiagully.com |
| Amit Jhingan | President, Real Estate | amit.jhingan@indiagully.com |

---

## 🚀 Deployment Status

- **Platform:** Cloudflare Pages · Project: `india-gully`
- **Status:** ✅ Active — Audit Round complete (commit d16c401)
- **Last Updated:** 28 Feb 2026
- **Tech Stack:** Hono + TypeScript + TailwindCSS CDN + Chart.js
- **Worker Size:** 910 KB · 92 routes · 24 API endpoints · 17 modules
