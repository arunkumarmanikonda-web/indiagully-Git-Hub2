# India Gully Enterprise Platform

**Celebrating Desiness** | Multi-Vertical Advisory Firm  
Vivacious Entertainment and Hospitality Pvt. Ltd.

---

## 🌐 Live URLs

| Environment | URL |
|-------------|-----|
| **Production** | https://india-gully.pages.dev |
| **Deployment** | https://cb325b74.india-gully.pages.dev |
| **Sandbox Preview** | https://3000-i8y68rnahl4h057gpqgck-583b4d74.sandbox.novita.ai |

---

## ✅ Completed Features (Phase 1 — LIVE)

### Corporate Website
- **Home:** Strategy-led hero, vertical showcase, active mandates, leadership, brand ecosystem, CTA
- **About:** Vision & mission, company timeline (2017–2024), board & KMP profiles, governance note, company information
- **Services:** 5 advisory verticals (Real Estate, Retail, Hospitality, Entertainment, Debt & Special Situations)
- **HORECA Solutions:** 8 supply categories with quote request form
- **Mandates & Listings:** 6 active mandates in Sotheby's-style (₹4,500 Cr to ₹45 Cr), NDA-gated
- **Insights:** 6 thought leadership articles (gated access)
- **Contact:** Mandate enquiry form with 6 enquiry types

### Portals (Login UIs)
- Portal Selection hub (`/portal`)
- Client Portal (`/portal/client`) — Client ID + Password + TOTP
- Employee Portal (`/portal/employee`) — Employee ID + Password + TOTP
- Board & KMP Portal (`/portal/board`) — Director DIN/ID + Password + TOTP
- Super Admin Console (`/admin`) — Username + Password + TOTP + Restricted

### Admin Dashboard
- System health monitoring (6 module indicators)
- Quick stats (enquiries, users, workflows, approvals)
- Platform module grid (12 modules)
- Audit log (real-time activity)
- CMS Quick Edit panel
- Finance ERP overview (revenue MTD, receivables, GST, bank balance)
- HR ERP overview (headcount, attendance, leave, payroll status)
- Governance panel (board events, director KYC status)

### API Endpoints
- `GET /api/health` — System status
- `POST /api/enquiry` — Public enquiry submission
- `POST /api/subscribe` — Insights subscription
- `POST /api/horeca/quote` — HORECA quote request
- `POST /api/auth/login` — Portal authentication (stub)
- `POST /api/auth/admin` — Admin authentication (stub)
- `POST /api/auth/reset` — Password reset (stub)

---

## 🔧 Features Not Yet Implemented (Phase 2-4)

### Phase 2 — Backend Database
- [ ] Cloudflare D1 database setup and migrations
- [ ] JWT authentication with 2FA (TOTP)
- [ ] Form data persistence (enquiries → D1)
- [ ] Email notifications (SMTP)
- [ ] Client portal (live data)
- [ ] Session management

### Phase 3 — ERP Modules
- [ ] Finance ERP (vouchers, P&L, Balance Sheet, GST)
- [ ] HR ERP (payroll, attendance, Form-16)
- [ ] Board Governance (meetings, voting, minutes)
- [ ] Contracting Engine (templates, e-sign)
- [ ] Full CMS drag-drop editor

### Phase 4 — Integrations
- [ ] Vyapar API/CSV sync
- [ ] GST Portal filing integration
- [ ] WhatsApp Business notifications
- [ ] Cloudflare R2 document storage
- [ ] DocuSign e-signature abstraction

---

## 📋 Route Summary

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Homepage |
| GET | `/about` | About India Gully |
| GET | `/services` | Advisory Verticals |
| GET | `/horeca` | HORECA Solutions |
| GET | `/listings` | Active Mandates |
| GET | `/listings/:id` | Mandate Detail |
| GET | `/insights` | Thought Leadership |
| GET | `/insights/:id` | Article Detail |
| GET | `/contact` | Contact & Enquiry |
| GET | `/portal` | Portal Selection |
| GET | `/portal/client` | Client Portal Login |
| GET | `/portal/employee` | Employee Portal Login |
| GET | `/portal/board` | Board Portal Login |
| GET | `/portal/client/dashboard` | Client Dashboard |
| GET | `/admin` | Admin Login |
| GET | `/admin/dashboard` | Admin Dashboard |
| GET | `/api/health` | Health Check |
| POST | `/api/enquiry` | Submit Enquiry |
| POST | `/api/subscribe` | Subscribe Insights |
| POST | `/api/horeca/quote` | HORECA Quote Request |
| POST | `/api/auth/login` | Portal Auth |
| POST | `/api/auth/admin` | Admin Auth |

---

## 🏗️ Data Architecture

### Data Models
- Users (portal authentication)
- Employees (HR, attendance, payroll)
- Directors (board governance, KYC)
- Clients (advisory relationships)
- Mandates (active transaction advisory mandates)
- Enquiries (inbound leads and requests)
- Quotes / Invoices / Vouchers (Finance ERP)
- Board Meetings / Resolutions / Minutes
- HORECA Catalogue / Quotes
- CMS Content (all website copy)
- Audit Logs (immutable activity trail)

### Storage Services
- **Cloudflare D1:** All relational data (employees, finance, governance, CMS)
- **Cloudflare KV:** Session tokens, CMS cache, rate limiting
- **Cloudflare R2:** Documents (board packs, contracts, brochures, payslips)

---

## 👥 Leadership (Locked)

| Name | Role | Contact |
|------|------|---------|
| Arun Manikonda | Managing Director (Director on Board & KMP) | akm@indiagully.com · +91 9810889134 |
| Pavan Manikonda | Executive Director (Director on Board & KMP) | pavan@indiagully.com · +91 6282556067 |
| Amit Jhingan | President, Real Estate (KMP, Not a Director) | amit.jhingan@indiagully.com · +91 9899993543 |

---

## 🚀 Deployment

- **Platform:** Cloudflare Pages
- **Project:** india-gully
- **Branch:** main → Production
- **Build Command:** `npm run build`
- **Output Dir:** `dist/`
- **Tech Stack:** Hono v4 + TypeScript + Cloudflare Workers
- **Status:** ✅ Active and Live

---

## 🛠️ Development

```bash
# Install
npm install

# Local dev
npm run dev

# Build
npm run build

# Deploy to Cloudflare
npx wrangler pages deploy dist --project-name india-gully
```

*Last Updated: December 2024*  
*Architecture Doc: /ARCHITECTURE.md*
