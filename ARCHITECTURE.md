# India Gully Enterprise Platform
## Architecture Blueprint, Module SOW & Technical Documentation

**Version:** 2024.12  
**Classification:** Internal Technical Document  
**Prepared by:** Principal Enterprise Architect  
**Platform:** Cloudflare Pages + Edge Workers  
**Legal Entity:** Vivacious Entertainment and Hospitality Pvt. Ltd.  

---

## SECTION 1: SYSTEM OVERVIEW

### 1.1 Platform Architecture (Production)

```
┌──────────────────────────────────────────────────────────────────┐
│                    INDIA GULLY ENTERPRISE PLATFORM               │
│                     https://india-gully.pages.dev                │
├──────────────────┬───────────────────────────────────────────────┤
│  PRESENTATION    │  BACKEND LOGIC          │  DATA LAYER         │
│  LAYER           │  (Edge Workers)         │  (To be configured) │
├──────────────────┼─────────────────────────┼─────────────────────┤
│ Corporate Website│ Hono Framework (TSX)    │ Cloudflare D1 (SQL) │
│ Client Portal    │ REST API (/api/*)        │ Cloudflare KV       │
│ Employee Portal  │ Auth (JWT + TOTP)       │ Cloudflare R2       │
│ Board Portal     │ CMS Engine              │ Vyapar (via API)    │
│ Super Admin      │ ERP Modules             │ GST Portal (API)    │
│                  │ Workflow Engine         │                     │
└──────────────────┴─────────────────────────┴─────────────────────┘
```

### 1.2 Tech Stack

| Layer | Technology | Justification |
|-------|-----------|---------------|
| Runtime | Cloudflare Workers (V8) | Global edge, 0ms cold start |
| Framework | Hono v4 (TypeScript) | Lightweight, fast, Worker-native |
| Frontend | Hono JSX + Tailwind CDN | SSR, no build complexity |
| Fonts | Google Fonts (Playfair Display, Inter, Cormorant Garamond) | Premium typography |
| Icons | FontAwesome 6.5 | Comprehensive icon set |
| Build | Vite + @hono/vite-build | Fast builds, CF Pages optimised |
| DB (prod) | Cloudflare D1 (SQLite) | Globally replicated, serverless |
| Cache | Cloudflare KV | Session, CMS cache |
| Storage | Cloudflare R2 | Documents, contracts, brochures |
| Auth | JWT + TOTP (2FA) | Zero-trust, per-portal |
| CI/CD | Cloudflare Pages Git | Auto-deploy on push |

---

## SECTION 2: MODULE SCOPE OF WORK (SOW)

### MODULE 1: Corporate Website (LIVE)
**Status:** ✅ DEPLOYED at https://india-gully.pages.dev

#### Pages Live:
| Route | Page | Status |
|-------|------|--------|
| `/` | Home — Strategy-led hero, verticals, mandates, leadership | ✅ Live |
| `/about` | About — Vision, mission, timeline, leadership, governance | ✅ Live |
| `/services` | Advisory Verticals — 5 verticals with full scope | ✅ Live |
| `/horeca` | HORECA Solutions — 8 categories + quote form | ✅ Live |
| `/listings` | Mandates — 6 active mandates, Sotheby's style | ✅ Live |
| `/listings/:id` | Individual mandate detail + NDA form | ✅ Live |
| `/insights` | Thought leadership — 6 articles | ✅ Live |
| `/insights/:id` | Article detail + gated access | ✅ Live |
| `/contact` | Contact + mandate enquiry form | ✅ Live |

#### Design Specifications:
- **Brand Colour:** Gold `#C5A028`, Dark `#1A1A1A`, Cream `#F7F3E9`
- **Typography:** Playfair Display (serif headings), Cormorant Garamond (display italic), Inter (body)
- **Pattern:** Big Four institutional — clean, premium, data-driven
- **Property Presentation:** Sotheby's-style — dark headers, gold metrics, NDA-gated
- **CTA Primary:** `btn-gold` — Gold fill, white text, uppercase, letterspace
- **CTA Secondary:** `btn-outline-gold` — Gold border/text
- **CTA Tertiary:** `btn-dark` — Dark fill

### MODULE 2: Login Portals (LIVE)

| Portal | URL | Auth Method | Role |
|--------|-----|-------------|------|
| Portal Selection | `/portal` | — | Navigation |
| Client Portal | `/portal/client` | Client ID + Password + TOTP | Clients / Advisory Partners |
| Employee Portal | `/portal/employee` | Employee ID + Password + TOTP | All Employees |
| Board & KMP Portal | `/portal/board` | Director DIN/KMP ID + Password + TOTP | Directors + KMPs |
| Super Admin | `/admin` | Username + Password + TOTP | System Administrators |
| Client Dashboard | `/portal/client/dashboard` | — | Post-login |
| Admin Dashboard | `/admin/dashboard` | — | Post-login |

**Note:** Auth backends require D1 database configuration. Currently showing secure login UI with stubs.

### MODULE 3: Finance ERP (Designed, Pending D1)

#### Chart of Accounts (Standard India COA)
```
1000 - Assets
  1100 - Current Assets
    1110 - Cash & Bank
    1120 - Accounts Receivable
    1130 - Advances Paid
    1140 - GST Receivable (Input)
  1200 - Fixed Assets
    1210 - Furniture & Fixtures
    1220 - Computer Equipment

2000 - Liabilities
  2100 - Current Liabilities
    2110 - Accounts Payable
    2120 - Advances Received
    2130 - GST Payable (Output)
    2140 - TDS Payable
  2200 - Long-term Liabilities

3000 - Equity
  3100 - Share Capital
  3200 - Retained Earnings

4000 - Revenue
  4100 - Advisory Fees
  4200 - Transaction Advisory Fees
  4300 - HORECA Supply Revenue
  4400 - PMC Fees
  4500 - Retainer Income

5000 - Expenses
  5100 - Employee Costs
  5200 - Travel & Accommodation
  5300 - Office Expenses
  5400 - Professional Fees
  5500 - Marketing & Business Development
  5600 - Technology & Software
```

#### Voucher Types:
- **Sales Voucher:** Advisory invoice with GST (CGST + SGST / IGST)
- **Purchase Voucher:** Vendor bills with ITC eligibility
- **Receipt Voucher:** Client payments received
- **Payment Voucher:** Vendor/expense payments
- **Contra Voucher:** Bank-to-bank, bank-to-cash
- **Journal Voucher:** Provisions, accruals, adjustments
- **Debit Note:** Deduction claims from clients
- **Credit Note:** Refunds / adjustments issued

#### GST Compliance:
- CGST: 9% (intra-state services)
- SGST: 9% (intra-state services)
- IGST: 18% (inter-state services)
- GSTIN: 07XXXXXX000XXX (Delhi registration)
- Quarterly GSTR-1, Monthly GSTR-3B

#### Financial Reports:
- Profit & Loss Statement
- Balance Sheet (Schedule III compliant)
- Trial Balance
- Cash Flow Statement
- Bank Reconciliation Statement
- Debtors & Creditors Ageing
- GST Summary Report
- TDS Computation Report

### MODULE 4: HR ERP (Designed, Pending D1)

#### Employee Lifecycle:
1. **Onboarding:** Employee creation → auto Employee ID (IG-EMP-XXXX) → credentials generated → welcome email to personal email
2. **Attendance:** Daily IN/OUT → monthly summary → escalation on absence
3. **Leave Management:** Leave request → manager approval → HR confirmation → pay impact
4. **Payroll Processing:** Monthly CTC calculation → deductions (PF, ESI, PT, TDS) → net pay → payslip generation
5. **TDS:** Monthly TDS computation per Section 192 → Form-16 at year-end
6. **Exit:** Notice period tracking → clearance checklist → FnF settlement → Form-16 issue

#### Leave Types (India):
- Earned Leave (EL): 15 days/year
- Casual Leave (CL): 12 days/year
- Sick Leave (SL): 6 days/year
- Maternity Leave: 26 weeks (as per Maternity Benefit Act)
- Paternity Leave: 5 days
- Optional/Restricted Holidays: 2 days

#### Salary Components:
```
CTC Components:
+ Basic Salary (40-50% of CTC)
+ HRA (50% of Basic - Metro / 40% Non-Metro)
+ Special Allowance
+ LTA (Leave Travel Allowance)
+ Medical Allowance
+ Employer PF Contribution (12% of Basic)
+ Gratuity Provision (4.81% of Basic)

Deductions:
- Employee PF (12% of Basic, max ₹1,800/month)
- Employee ESI (0.75% of Gross, if applicable)
- Professional Tax (State-specific, Delhi: Nil)
- Income Tax (TDS per slab)
```

### MODULE 5: Governance (Designed, Pending D1)

#### Companies Act 2013 Compliance Framework:

**Board Meeting (Per SS-1):**
1. CS sends Notice + Agenda (minimum 7 days in advance)
2. Directors receive encrypted board pack
3. Meeting conducted (quorum: minimum 2 directors or 1/3rd)
4. Voting: Present/Absent/Dissent recorded per director
5. Minutes drafted within 15 days
6. Minutes circulated for confirmation
7. Minutes signed (MD/CS)
8. Statutory register updated

**Mandatory Filings:**
| Form | Description | Frequency |
|------|-------------|-----------|
| MGT-7 | Annual Return | Within 60 days of AGM |
| AOC-4 | Financial Statements | Within 30 days of AGM |
| DIR-3 KYC | Director KYC | Annual (Sep 30) |
| MBP-1 | Director Disclosure of Interest | At each meeting/change |
| DIR-8 | Declaration of Non-Disqualification | At first Board meeting of year |
| MSME-1 | Outstanding to MSME vendors | Half-yearly |

**Director Roles (RBAC):**
- View board materials: ✅
- Participate & vote: ✅
- Upload own KYC docs: ✅
- View approved financials: ✅
- Edit minutes: ❌
- Delete records: ❌
- Access employee data: ❌

**Company Secretary Role:**
- Create and circulate agendas: ✅
- Call meetings: ✅
- Manage voting: ✅
- Draft and finalise minutes: ✅
- Maintain minute books: ✅
- ROC compliance tracker: ✅
- Statutory registers management: ✅

### MODULE 6: CMS Engine (Designed)

#### Content Schema (D1 Table: `cms_content`):
```sql
CREATE TABLE cms_content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  key TEXT UNIQUE NOT NULL,          -- e.g., 'hero.tagline'
  value TEXT NOT NULL,               -- Content value
  content_type TEXT DEFAULT 'text',  -- text|html|json|image|video
  page TEXT,                         -- Which page
  section TEXT,                      -- Which section
  is_published BOOLEAN DEFAULT 1,
  version INTEGER DEFAULT 1,
  published_at DATETIME,
  updated_by TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### CMS Features:
- Drag-drop layout (planned: Tiptap/ProseMirror)
- Edit every word, button, banner from admin UI
- Auto image/video resize via Cloudflare Images
- SEO/meta/schema fields per page
- Version history (keep last 20 versions)
- Approval workflow (edit → review → approve → publish)
- Cache invalidation via Cloudflare Cache API
- AI copy enhancement (open-source, approval mandatory)

---

## SECTION 3: ERD (Entity Relationship Diagram)

```
USERS
  id PK | email | password_hash | role | portal | employee_id | last_login | is_active

EMPLOYEES
  id PK | employee_code | first_name | last_name | email_official | email_personal
  phone_official | phone_personal(MASKED) | department | designation | date_of_joining
  date_of_birth(MASKED) | pan(MASKED) | aadhaar(MASKED) | bank_account(MASKED)
  ctc | status | reports_to_id FK

ATTENDANCE
  id PK | employee_id FK | date | check_in | check_out | hours | status | remarks

LEAVE_REQUESTS
  id PK | employee_id FK | leave_type | from_date | to_date | days | reason
  status | approved_by FK | applied_at | decided_at

PAYROLL_RUNS
  id PK | month | year | status | run_by FK | total_gross | total_deductions | total_net | run_at

PAYSLIPS
  id PK | payroll_run_id FK | employee_id FK | basic | hra | special_allowance
  gross | pf_employee | pf_employer | esi | professional_tax | tds | net_payable

DIRECTORS
  id PK | name | din | designation | date_of_appointment | is_active
  pan(ENCRYPTED) | aadhaar_masked | email | phone | address(ENCRYPTED)

BOARD_MEETINGS
  id PK | meeting_type | meeting_number | date | time | venue | mode
  notice_sent_at | agenda | status | minutes_draft | minutes_final | cs_signed_at | md_signed_at

MEETING_ATTENDANCE
  id PK | meeting_id FK | director_id FK | attended | leave_of_absence | joining_time

RESOLUTIONS
  id PK | meeting_id FK | resolution_number | subject | text | voting_result | passed

RESOLUTION_VOTES
  id PK | resolution_id FK | director_id FK | vote | timestamp

CLIENTS
  id PK | company_name | contact_name | email | phone | address | pan | gstin | status

MANDATES
  id PK | client_id FK | title | sector | location | value | status | description
  is_nda_required | nda_signed_at | im_sent_at | assigned_to FK | created_at

ENQUIRIES
  id PK | enquiry_type | name | email | phone | org | vertical | message | scale
  mandate_id FK | source | status | assigned_to FK | created_at

QUOTES
  id PK | client_id FK | mandate_id FK | quote_number | date | valid_until
  subtotal | cgst | sgst | igst | total | status | version | created_by FK

QUOTE_ITEMS
  id PK | quote_id FK | description | hsn_sac | quantity | rate | amount | gst_rate

INVOICES
  id PK | client_id FK | mandate_id FK | invoice_number | date | due_date | quote_id FK
  subtotal | cgst | sgst | igst | total | paid_amount | status | created_by FK

VOUCHERS
  id PK | voucher_type | voucher_number | date | narration | amount | entity_id
  dr_account | cr_account | reference | created_by FK | is_reconciled

HORECA_CATALOGUE
  id PK | sku | name | category | sub_category | description | unit | rate | gst_rate
  vendor_id FK | lead_time_days | min_order_qty | is_active

HORECA_QUOTES
  id PK | client_id FK | quote_number | date | valid_until | project_type | location
  subtotal | cgst | sgst | igst | total | status | created_by FK

HORECA_QUOTE_ITEMS
  id PK | horeca_quote_id FK | sku_id FK | description | quantity | rate | amount

CMS_CONTENT
  id PK | key | value | content_type | page | section | is_published | version
  published_at | updated_by FK | created_at | updated_at

AUDIT_LOGS
  id PK | user_id FK | action | entity_type | entity_id | old_value | new_value
  ip_address | user_agent | correlation_id | timestamp
```

---

## SECTION 4: RBAC / ABAC MATRIX

| Resource | Super Admin | MD | CS | CFO | Director | Employee | Client |
|----------|------------|----|----|-----|----------|----------|--------|
| CMS Edit | FULL | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Finance Vouchers | FULL | VIEW | ❌ | FULL | VIEW(Board) | ❌ | OWN |
| Payroll | FULL | APPROVE | ❌ | RUN | ❌ | OWN PAYSLIP | ❌ |
| HR Records | FULL | VIEW | ❌ | ❌ | ❌ | OWN | ❌ |
| Board Materials | VIEW | VIEW | MANAGE | VIEW | VIEW | ❌ | ❌ |
| Meeting Minutes | FULL | SIGN | CREATE/SIGN | VIEW | VIEW+SIGN | ❌ | ❌ |
| Director KYC | FULL | OWN | VIEW | ❌ | OWN | ❌ | ❌ |
| Mandates | FULL | FULL | VIEW | VIEW | ❌ | OWN DEPT | OWN |
| Enquiries | FULL | VIEW | ❌ | ❌ | ❌ | ❌ | OWN |
| HORECA Quotes | FULL | VIEW | ❌ | FULL | ❌ | OWN DEPT | REQUEST |
| Contracts | FULL | APPROVE | VIEW | VIEW | VIEW | ❌ | OWN |
| Audit Logs | FULL | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| User Mgmt | FULL | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |
| Integrations | FULL | ❌ | ❌ | ❌ | ❌ | ❌ | ❌ |

**Key:** FULL=Create/Read/Update/Delete | VIEW=Read Only | OWN=Own Records | MANAGE=Create+Edit | RUN=Execute Process | SIGN=Digital Approval

---

## SECTION 5: OPENAPI SPECIFICATION (Key Endpoints)

```yaml
openapi: 3.0.3
info:
  title: India Gully Enterprise API
  version: 2024.12
  description: Enterprise API for India Gully Platform

servers:
  - url: https://india-gully.pages.dev/api

paths:
  /health:
    get:
      summary: System health check
      responses:
        '200':
          description: System operational
          
  /enquiry:
    post:
      summary: Submit enquiry (public)
      requestBody:
        content:
          application/x-www-form-urlencoded:
            schema:
              properties:
                type: { type: string, enum: [mandate, advisory, horeca, investment, nda, general] }
                name: { type: string, required: true }
                email: { type: string, required: true }
                phone: { type: string, required: true }
                org: { type: string, required: true }
                message: { type: string }
                vertical: { type: string }
                scale: { type: string }
      responses:
        '200':
          description: Enquiry received

  /auth/login:
    post:
      summary: Portal authentication
      requestBody:
        content:
          application/x-www-form-urlencoded:
            schema:
              properties:
                portal: { type: string, enum: [client, employee, board] }
                id: { type: string }
                password: { type: string }
                otp: { type: string }
      responses:
        '200':
          description: Auth token + portal redirect
        '401':
          description: Authentication failed

  /finance/vouchers:
    get:
      summary: List vouchers (authenticated)
      security:
        - bearerAuth: []
      parameters:
        - name: type
          in: query
          schema:
            type: string
        - name: from_date
          in: query
          schema:
            type: string
        - name: to_date
          in: query
          schema:
            type: string
      responses:
        '200':
          description: List of vouchers
        '401':
          description: Unauthorized

  /hr/employees:
    get:
      summary: List employees (admin/HR only)
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Employee list (personal data masked per RBAC)

  /governance/meetings:
    get:
      summary: Board meetings (board portal only)
      security:
        - bearerAuth: []
      responses:
        '200':
          description: Meeting list

components:
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
```

---

## SECTION 6: WORKFLOW DIAGRAMS

### 6.1 Mandate Enquiry → Advisory Engagement Workflow
```
Website Contact Form
       ↓
   Enquiry Stored (D1) + Notification Email to Arun / Pavan
       ↓
   Initial Call / Video Meeting
       ↓
   Mutual NDA Executed (DocuSign / E-Sign)
       ↓
   Information Memorandum Shared via Client Portal
       ↓
   Advisory Mandate Structured (Term Sheet)
       ↓
   Quote Generated (Finance ERP)
       ↓
   Quote → Contract (Contracting Engine)
       ↓
   Retainer Invoice Raised
       ↓
   Project Execution + Milestone Billing
       ↓
   Mandate Closure + Final Invoice
```

### 6.2 Board Meeting Workflow (SS-1 Compliant)
```
CS Creates Meeting Notice + Agenda
       ↓
   Notice Sent (7 days advance) via Encrypted Board Portal
       ↓
   Directors Acknowledge Receipt
       ↓
   Board Pack Distributed (encrypted PDF, watermarked)
       ↓
   Meeting Conducted (Physical / Video Conferencing)
       ↓
   Attendance & Quorum Recorded
       ↓
   Resolutions Tabled + Voted (Per Director Recorded)
       ↓
   Minutes Drafted by CS within 15 days
       ↓
   Minutes Circulated for Review
       ↓
   Directors Confirm/Object
       ↓
   MD & CS Sign Minutes
       ↓
   Minute Book Appended
       ↓
   Statutory Registers Updated (MBP-1, DIR-8)
```

### 6.3 Payroll Processing Workflow
```
HR Locks Attendance for Month (25th)
       ↓
   Leave Deductions Applied
       ↓
   Salary Components Computed
       ↓
   TDS Section 192 Applied
       ↓
   PF / ESI / PT Computed
       ↓
   Net Payable = Gross - All Deductions
       ↓
   Payroll Review (HR Manager)
       ↓
   CFO Approval
       ↓
   MD Approval (if >₹5L total payroll)
       ↓
   Bank File Generated (NEFT)
       ↓
   Payslips Generated (PDF, encrypted)
       ↓
   Payslips Delivered via Employee Portal
       ↓
   Salary Journal Posted to Finance ERP
       ↓
   TDS Challan 281 Generated for Deposit
```

---

## SECTION 7: CMS SCHEMA

```
Homepage CMS Keys:
  hero.tagline          → "Celebrating Desiness Across Every Vertical"
  hero.subtitle         → "India's premier multi-vertical advisory firm..."
  hero.cta_primary      → "View Active Mandates"
  hero.cta_secondary    → "Submit an Enquiry"
  
  stats.pipeline        → "₹10,000 Cr+"
  stats.brands          → "20+"
  stats.hotels          → "15+"
  stats.presence        → "Pan-India"
  
  about.tagline         → "Celebrating Desiness Since 2017"
  about.blurb           → "..."
  
  footer.disclaimer     → "..."
  footer.copyright      → "© 2024 Vivacious Entertainment..."
  
SEO Keys:
  seo.home.title        → "Home — India Gully"
  seo.home.description  → "..."
  seo.home.og_image     → "https://india-gully.pages.dev/assets/og.jpg"
  
  (Repeat pattern for all pages)

Banner Keys:
  banner.mandate_disclaimer → "India Gully acts as Transaction Advisor..."
  banner.nda_notice         → "All mandates subject to NDA..."
```

---

## SECTION 8: BI DASHBOARD CATALOGUE

### 8.1 Board Dashboard
- Pipeline Value (total advisory pipeline ₹)
- Active Mandates Count + Status
- Revenue MTD vs Target
- P&L Snapshot (current month)
- Bank Position (live from ERP)
- Outstanding Receivables Ageing
- Compliance Calendar (upcoming filings)

### 8.2 Finance Dashboard
- Daily Cash Position
- Revenue vs Budget (monthly)
- GST Input vs Output
- Top 10 Debtors by Outstanding
- Invoice Aging Report
- Expense Category Breakdown
- Voucher Volume by Type

### 8.3 HR Dashboard
- Headcount by Department
- Today's Attendance
- Leave Balance Summary
- Payroll Cost MTD
- TDS Computation Status
- Upcoming Anniversaries / Birthdays
- Open Leave Requests

### 8.4 Sales & Engagement Dashboard
- Enquiry Volume by Source
- Enquiry Status Pipeline (Funnel)
- Conversion: Enquiry → Mandate → Invoice
- Vertical-wise Revenue Split
- HORECA Quote Win Rate
- Top Clients by Revenue

---

## SECTION 9: SECURITY ARCHITECTURE

### Authentication
- **Portal-level isolation:** Separate auth routes per portal
- **Credential hashing:** bcrypt with salt rounds ≥ 12
- **TOTP (2FA):** Google Authenticator compatible (RFC 6238)
- **Session tokens:** JWT (HS256), 8-hour expiry
- **Refresh tokens:** 30-day sliding window, single-use
- **Password policy:** Min 12 chars, complexity required, 90-day rotation

### API Security
- **All API routes:** Bearer token required
- **DB-level enforcement:** Row-level security via user_id checks
- **Scoped exports:** Employees see own data only
- **Correlation IDs:** UUID on every request for tracing
- **Rate limiting:** Cloudflare Rate Limiting (100 req/min per IP)
- **Input validation:** All form inputs validated server-side
- **SQL injection:** Cloudflare D1 prepared statements only

### Data Protection
- **Director KYC:** AES-256 encrypted at rest in R2
- **Employee personal data:** Masked in API responses
- **Board documents:** Watermarked PDF, encrypted, signed URLs
- **Audit trails:** Immutable, append-only log table
- **GST/PAN data:** Encrypted field-level storage

---

## SECTION 10: DEPLOYMENT RUNBOOK

### 10.1 Production Deployment (Current)
```bash
# 1. Ensure Cloudflare API key is set
export CLOUDFLARE_API_TOKEN="your-token"

# 2. Install dependencies
cd /home/user/webapp && npm install

# 3. Build
npm run build

# 4. Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name india-gully

# Production URL: https://india-gully.pages.dev
```

### 10.2 D1 Database Setup (Phase 2)
```bash
# Create production D1
npx wrangler d1 create india-gully-production

# Update wrangler.jsonc with database_id
# Apply migrations
npx wrangler d1 migrations apply india-gully-production

# For local dev
npx wrangler d1 migrations apply india-gully-production --local
```

### 10.3 Environment Variables Required
```
# .dev.vars (local development)
JWT_SECRET=your-jwt-secret-min-32-chars
ADMIN_TOTP_SECRET=your-totp-secret
NOTIFICATION_EMAIL=info@indiagully.com
SMTP_HOST=smtp.your-provider.com
SMTP_PORT=587
SMTP_USER=your-smtp-user
SMTP_PASS=your-smtp-password
WHATSAPP_API_KEY=your-whatsapp-api-key
```

---

## SECTION 11: VYAPAR INTEGRATION SPEC

### Sync Strategy: Near-Real-Time CSV + API
```
Vyapar → Export (hourly/daily CSV):
  - Parties (Clients/Vendors)
  - Items (HORECA SKUs)
  - Quotes/Estimates
  - Sales Invoices
  - Purchase Bills
  - Payments

India Gully Platform → Import:
  - Parse CSV → validate → D1 upsert
  - Exception report: duplicates, mismatches, parsing errors
  - Reconciliation log with timestamps
  - Alert on sync failure >2 hours

API Integration (if Vyapar exposes API):
  POST /api/vyapar/sync → trigger manual sync
  GET /api/vyapar/status → last sync status, exception count
  GET /api/vyapar/exceptions → list unresolved exceptions
```

---

## SECTION 12: TEST & SECURITY PLAN

### Functional Tests
- [ ] All 13+ routes return HTTP 200
- [ ] Contact form submits successfully
- [ ] HORECA quote form works
- [ ] Portal login shows error on wrong credentials (not system error)
- [ ] NDA flow on listings
- [ ] Mobile responsive on all pages
- [ ] All internal links resolve

### Security Tests
- [ ] SQL injection on all form inputs
- [ ] XSS on all text inputs
- [ ] CSRF token on all POST forms (Phase 2)
- [ ] Rate limiting on API endpoints
- [ ] Portal isolation (client cannot access employee routes)
- [ ] Admin 2FA bypass attempt
- [ ] JWT expiry enforcement

### Performance Targets
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1
- TTFB on Cloudflare Edge: < 200ms
- Google PageSpeed: > 90 (mobile), > 95 (desktop)

---

## SECTION 13: CURRENT STATUS & NEXT STEPS

### ✅ COMPLETED (Phase 1 — LIVE)
- [x] Corporate website (9 pages)
- [x] Advisory verticals content
- [x] 6 active mandate listings (Sotheby's style)
- [x] HORECA solutions (8 categories + quote form)
- [x] Portal login UIs (Client, Employee, Board, Super Admin)
- [x] Client dashboard stub
- [x] Admin dashboard with CMS + Finance + HR + Governance panels
- [x] API endpoints (health, enquiry, subscribe, auth stubs)
- [x] Insights / Thought Leadership (6 articles)
- [x] Contact & Mandate Enquiry form
- [x] About page with governance section
- [x] Deployment to Cloudflare Pages

### 🔄 PHASE 2 — BACKEND DATABASE
- [ ] Cloudflare D1 creation and migration
- [ ] JWT authentication system
- [ ] Form submissions → D1 storage
- [ ] Notification emails via SMTP
- [ ] Client portal dashboard (live data)

### 🔄 PHASE 3 — ERP MODULES
- [ ] Finance ERP (vouchers, GST, reports)
- [ ] HR ERP (payroll, attendance, leave)
- [ ] Governance module (board meetings, minutes, voting)
- [ ] Contracting engine (templates, approval, e-sign)
- [ ] CMS drag-drop editor

### 🔄 PHASE 4 — INTEGRATIONS
- [ ] Vyapar sync (CSV/API)
- [ ] GST Portal API (GSTR filing)
- [ ] WhatsApp Business API
- [ ] DocuSign / eSigner integration
- [ ] Cloudflare Images (auto-resize)

---

## APPENDIX A: ASSUMPTIONS (Per Mandate)

1. **GST Registration:** Delhi (07) — CGST+SGST for intra-state; IGST for inter-state
2. **PF Applicability:** Applicable if headcount ≥ 20; provisioned in payroll
3. **ESI Applicability:** Applicable if headcount ≥ 10; gross salary ≤ ₹21,000/month
4. **Professional Tax (Delhi):** NIL (Delhi does not levy PT as of 2024)
5. **Board Composition:** Minimum 2 directors (both on board: Arun & Pavan Manikonda)
6. **AGM:** Private company exempt from AGM if all members consent in writing (Section 96)
7. **CS Requirement:** A Private Limited Company is required to appoint CS if paid-up capital ≥ ₹5 Crore
8. **CIN Format:** Placeholder used; actual CIN to be verified from MCA21 portal
9. **Mandate Disclaimer:** All listings carry Transaction Advisor disclaimer per SEBI/RERA guidance
10. **Data Localisation:** All data stored in Cloudflare's India region (via R2/D1) where available

---

*Document prepared by: India Gully Enterprise Architecture Team*  
*Last Updated: December 2024*  
*Classification: Internal — Confidential*
