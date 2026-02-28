# India Gully Enterprise Platform

**Celebrating Desiness** | Multi-Vertical Advisory Firm  
Vivacious Entertainment and Hospitality Pvt. Ltd.

---

## 🌐 Live URLs

| Environment | URL |
|-------------|-----|
| **Production** | https://india-gully.pages.dev |
| **Latest Deploy** | https://e83c95da.india-gully.pages.dev |
| **Sandbox Preview** | http://localhost:3000 |

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

### Phase 2–4 — Portal UIs & ERP Modules (LIVE)

#### Portal Logins
| Portal | URL | Credentials |
|--------|-----|-------------|
| Client | `/portal/client` | demo@indiagully.com / Client@IG2024 / OTP: 000000 |
| Employee | `/portal/employee` | IG-EMP-0001 / Emp@IG2024 / OTP: 000000 |
| Board & KMP | `/portal/board` | IG-KMP-0001 / Board@IG2024 / OTP: 000000 |
| Super Admin | `/admin` | superadmin@indiagully.com / Admin@IG2024! / OTP: 000000 |

#### Client Portal
- Dashboard, Active Mandates, Proposals with e-sign (DocuSign flow)
- **Invoices** — view modal, Razorpay/UPI/NEFT/Cheque payment gateway, UTR capture
- **Documents** — KYC upload module (6 document types), download simulation
- **Messages** — read receipts (✓✓), file attachments, conversation switcher
- Profile with edit panel

#### Employee Portal
- Dashboard, Attendance heatmap, Leave management & approval
- Payslips with TDS/Tax Estimator (New Regime FY 2025-26)
- Form-16, Policies, Directory, Profile

#### Board & KMP Portal
- Dashboard, Meetings register, Voting audit trail
- Statutory registers, Board packs, Finance snapshot, Compliance calendar

#### Super Admin Console
- **Dashboard** — KPI cards, alert banner, activity feed, compliance grid
- **CMS** — full page editor with SEO, hero, body HTML, OG image, publish — **NOW with 6 tabs: Pages, Page Builder (drag-and-drop), AI Copy Assist (multi-variant copy generation), Approval Workflow (queue + settings), Branded Templates (6 + custom creator), SEO scores**
- **Users** — 8 accounts, role management, add/deactivate
- **Workflows** — 4-tab engine (Library, Visual Builder, Run History, Settings)
- **Finance ERP** (7 tabs): Invoices, P&L, **Account Ledger + Voucher entry** (NEW), **Bank Reconciliation** (NEW), Expenses, **GST / e-Invoice with IRN** (NEW), Reports
- **HR ERP** (5 tabs): Employees, Attendance, Leave, **Payroll Builder + TDS + Salary Structure** (NEW), Reports
- **Governance** (5 tabs): **Board Meeting Register + Agenda Builder**, **Voting Engine** (digital vote + tally), **Directors & KMP KYC Upload**, **Statutory Registers** (9 registers), Compliance Calendar
- **HORECA** (5 tabs): Catalogue, **Inventory Ledger** (stock levels, low-stock alerts), **Vendor Management** (7 vendors, tier rating), **Quote Builder** (→ convert to PO), **Purchase Orders** with approval flow
- **Contracts** — register, builder with clause library, template library, e-sign
- **Integrations** — 9 services (GST, Vyapar, Gmail, WhatsApp, R2, DocuSign, Zoho, SendGrid, Tally)
- **BI & Reports** — **Interactive Chart.js dashboards** (revenue vs expenses bar, expense doughnut, pipeline bar, monthly trend), **Self-Service Analytics Builder**, **Scheduled Reports** (4 configured), 9 on-demand reports
- **System Config** — Platform, SMTP, Security settings
- **Security & Audit** (5 tabs): **Full Audit Log with risk scoring**, **RBAC Matrix** (6 roles), **TOTP / 2FA per-user enrollment**, **Rate Limiting + PAN masking config**, **IP Whitelist + Session Management**

### Phase 5 — UX & Interactivity Enhancements (LIVE ✅)
- Notification bells on all portals, breadcrumbs, sidebar badges
- Admin notification alerts, Board & KMP portal upgrade
- Visual Workflow Builder, API deduplication, health v2025.03

### Phase 6 — Enterprise Security, ERP Depth, Interactive BI (LIVE ✅)

| Module | What's New |
|--------|-----------|
| **Security** | Security score banner, TOTP/2FA per-user enrollment table, RBAC matrix (6 roles), rate limiting rules, PAN/Aadhaar/bank masking config, IP whitelist + blocked IPs, active session termination |
| **Governance** | Digital voting engine (cast For/Against/Abstain, live tally), KYC upload per director, 9 statutory registers with view/export/add, agenda builder (add/remove items), meeting register with minutes editor |
| **HR ERP** | Salary structure config (8 components), TDS declaration table (auto-calculated taxable income + TDS/month per employee), expanded payroll register with medical allowance + payslip download, PF Challan generation |
| **Finance ERP** | Account ledger with opening/closing balance, voucher entry (Sales/Purchase/Payment/Receipt/Journal/Contra), bank reconciliation (auto-match + create JV for unmatched), e-Invoice with IRN generation + QR code, GST filing calendar with one-click filing |
| **Client Portal** | Multi-method payment gateway (Razorpay card/UPI/NEFT/Cheque), KYC upload module (6 document types), message read receipts (✓✓) + file attachment button |
| **HORECA** | Inventory ledger with stock levels + low-stock alerts + reorder button, vendor management (7 vendors, tier/rating/lead-time), purchase orders with approval workflow, quote-to-PO conversion |
| **BI & Reports** | 4 interactive Chart.js charts (revenue bar, expense doughnut, pipeline, trend), self-service analytics builder (dimension/metric/filter/chart selector), scheduled reports table (4 configured), on-demand export grid |
| **Sales Force Engine** | Dedicated `/admin/sales/*` module (7 routes): Dashboard with pipeline Kanban + conversion funnel, Leads & CRM with scoring + filters + add lead, Pipeline full Kanban view, Quotes Builder (6 quotes), Engagements tracker (5 engagements), Tasks manager (7 tasks + add), Analytics (revenue by vertical, monthly trend, team performance) — linked in Admin sidebar |
| **CMS v2** | 6-tab upgrade: **Pages** (edit + AI Assist + Submit buttons), **Page Builder** (drag-and-drop block library: 10 block types), **AI Copy Assist** (9 content types, 5 tones, 3–5 variants, history), **Approval Workflow** (queue with approve/reject, SLA settings, auto-publish rules), **Branded Templates** (6 templates + custom creator), **SEO** (score indicator per page, schema markup, sitemap regenerate + submit to Google) |

---

## 🔌 API Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/api/health` | System status & module list |
| POST | `/api/auth/login` | Portal authentication |
| POST | `/api/auth/admin` | Admin authentication |
| POST | `/api/auth/reset` | Password reset |
| POST | `/api/enquiry` | Public mandate enquiry |
| POST | `/api/horeca-enquiry` | HORECA quote request |
| POST | `/api/subscribe` | Newsletter subscription |
| GET | `/api/listings` | Active mandates JSON |
| GET | `/api/mandates` | Client mandates with progress |
| GET | `/api/invoices` | Invoice register with summary |
| GET | `/api/employees` | Employee directory |
| GET | `/api/finance/summary` | Finance KPIs |
| POST | `/api/attendance/checkin` | Attendance mark |
| POST | `/api/leave/apply` | Leave application |

---

## 📊 Code Metrics

| File | Lines | Description |
|------|-------|-------------|
| `src/routes/admin.tsx` | ~3,700 | Super Admin ERP console (all modules incl. CMS v2) |
| `src/routes/sales.tsx` | 805 | Sales Force Engine (7 routes) |
| `src/routes/portal.tsx` | 1,999 | All portal routes (Client, Employee, Board) |
| `src/lib/layout.ts` | 624 | Master layout, design system, utilities |
| `src/routes/api.tsx` | 269 | REST API endpoints |
| `src/index.tsx` | 137 | App entry point + legal pages |
| **Total** | **~7,534** | Compiled worker: 775 KB |

---

## 🏗️ Architecture

- **Platform:** Cloudflare Pages / Workers (edge runtime)
- **Framework:** Hono (TypeScript)
- **Frontend:** Server-side HTML + Tailwind CSS CDN + FontAwesome + Chart.js
- **Storage:** Cloudflare R2 (documents) — D1/KV ready
- **Integrations:** GST Portal, Vyapar, Gmail SMTP, WhatsApp Business, DocuSign, Zoho CRM, SendGrid, Tally Prime
- **Security:** TOTP 2FA, RBAC, IP whitelist, rate limiting, PAN masking, immutable audit log

## 👥 Leadership

| Name | Role | Email |
|------|------|-------|
| Arun Manikonda | Managing Director | akm@indiagully.com |
| Pavan Manikonda | Executive Director | pavan@indiagully.com |
| Amit Jhingan | President, Real Estate | amit.jhingan@indiagully.com |

---

## 🚀 Deployment Status

- **Platform:** Cloudflare Pages · Project: `india-gully`
- **Status:** ✅ Active — Phase 6 deployed (commit c982434)
- **Last Updated:** 28 Feb 2025
- **Tech Stack:** Hono + TypeScript + TailwindCSS CDN + Chart.js
