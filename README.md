# India Gully Enterprise Platform

**Celebrating Desiness** | Multi-Vertical Advisory Firm  
Vivacious Entertainment and Hospitality Pvt. Ltd.

---

## 🌐 Live URLs

| Environment | URL |
|-------------|-----|
| **Production** | https://india-gully.pages.dev |
| **Latest Deploy** | https://2fd4e7b4.india-gully.pages.dev |
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

#### Client Portal Pages (27 routes)
- Dashboard, Active Mandates with progress tracker, Proposals with e-sign
- **Invoices with payment flow** — view modal, payment modal, UTR capture
- Documents with download simulation, Messages with conversation UI
- Profile with edit panel

#### Employee Portal Pages
- Dashboard with notices + quick actions
- **Attendance** — calendar heatmap, check in/out with live clock, MTD stats
- Leave management — apply, balance, history
- **Payslips** — full breakdown modal, **TDS/Tax Estimator** (New Regime FY 2025-26)
- Form-16, Policies, Directory, Profile

#### Board & KMP Portal
- Dashboard, Meetings register, Voting with audit trail
- Statutory registers (expandable), Board packs (collapsible folders)
- Finance snapshot, Compliance calendar

#### Super Admin Console
- **Dashboard** — alert banner, 8 KPI cards, quick-action bar, activity feed, compliance grid
- **CMS** — full page editor with slug, SEO, hero, body HTML, OG image, publish
- **Users** — 8 user accounts, add/edit/deactivate, role management
- **Workflows** — 6 automated workflows with step/trigger viewer
- **Finance ERP** (tabbed):
  - Invoices with GST calc, auto-number, mark-paid, AR total
  - **Live P&L Statement** with period selector (Feb, Jan, Dec, FY 2024-25)
  - Expense ledger with category breakdown + donut
  - GSTR-3B filing, GST calendar
  - 9 report types (PDF + Excel export)
- **HR ERP** (tabbed):
  - Employee directory with onboarding, profile modal
  - Today's attendance + MTD summary
  - **Leave approval/reject flow** with pending queue
  - **Payroll register** with process workflow + bank transfer file
  - 6 HR report types
- **Governance** — board meeting scheduler, compliance calendar, statutory registers
- **HORECA** — SKU catalogue, quote builder with live calculator, PDF generation
- **Contracts** (tabbed):
  - Contract register with e-sign status
  - **Contract builder** with clause library (12 clauses)
  - Template library (6 templates)
  - **E-sign modal** (DocuSign workflow)
- **Integrations** — 9 services (GST Portal, Vyapar, Gmail, WhatsApp, R2, DocuSign, Zoho, SendGrid, Tally)
- **BI & Reports** — 9 report types with filters + PDF/Excel download
- **System Config** — Platform, SMTP, Security settings
- **Security & Audit** — Audit log, IP whitelist, 2FA stats

### Phase 5 — UX & Interactivity Enhancements (LIVE)
- **Notification bells** on all portals (Client, Employee, Admin) with dropdown panels
- **Breadcrumb navigation** in all portal headers
- **Sidebar badges** showing pending item counts
- **Admin notification alerts** (5 live alerts)

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
| `src/routes/portal.tsx` | 1,846 | All portal routes (Client, Employee, Board) |
| `src/routes/admin.tsx` | 1,843 | Super Admin ERP console |
| `src/routes/api.tsx` | 233 | REST API endpoints |
| `src/lib/layout.ts` | 624 | Master layout, CSS, navigation |
| `src/index.tsx` | 135 | App entry, route mounting |
| **Total** | **4,681** | **525 KB compiled worker** |

---

## 🏗️ Data Architecture

### Data Models
- Users, Employees, Directors, Clients, Mandates, Enquiries
- Invoices, Vouchers, Expenses, GST Records
- Board Meetings, Resolutions, Minutes
- HORECA SKUs, Quotes, Orders
- CMS Pages, Audit Logs, Workflows, Contracts

### Storage Services (Planned)
- **Cloudflare D1:** All relational data
- **Cloudflare KV:** Session tokens, cache
- **Cloudflare R2:** Documents, contracts, payslips

---

## 👥 Leadership

| Name | Role | Contact |
|------|------|---------|
| Arun Manikonda | Managing Director | akm@indiagully.com · +91 9810889134 |
| Pavan Manikonda | Executive Director | pavan@indiagully.com · +91 6282556067 |
| Amit Jhingan | President, Real Estate | amit.jhingan@indiagully.com · +91 9899993543 |

---

## 🚀 Deployment

- **Platform:** Cloudflare Pages
- **Project:** india-gully
- **Build:** `npm run build` → `dist/`
- **Tech:** Hono v4 + TypeScript + Cloudflare Workers
- **Status:** ✅ Active and Live

```bash
npm install        # Install dependencies
npm run build      # Build for production
npx wrangler pages deploy dist --project-name india-gully  # Deploy
```

---

## 🔮 Remaining Enhancements

### Phase 6 — Backend Database
- [ ] Cloudflare D1 database setup + migrations
- [ ] JWT authentication with real 2FA (TOTP via OTPAUTH)
- [ ] Form data persistence (enquiries, attendance, invoices → D1)
- [ ] Session management with KV tokens
- [ ] Email notifications via SMTP

### Phase 7 — Integrations
- [ ] Vyapar CSV/API sync
- [ ] GST Portal auto-filing
- [ ] WhatsApp Business notifications
- [ ] R2 document storage + signed URLs
- [ ] DocuSign webhook integration

*Last Updated: February 2025 · Phase 5 Complete*
