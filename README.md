# India Gully Enterprise Platform

**Celebrating Desiness** | Multi-Vertical Advisory Firm  
Vivacious Entertainment and Hospitality Pvt. Ltd.

---

## 🌐 Live URLs

| Environment | URL |
|-------------|-----|
| **Production** | https://india-gully.pages.dev |
| **Latest Deploy** | https://d2529cc3.india-gully.pages.dev |
| **🔍 Deep Audit Report** | https://india-gully.pages.dev/audit |
| **HORECA Customer Portal** | https://india-gully.pages.dev/horeca/portal |
| **GraphQL Playground** | https://india-gully.pages.dev/admin/api-docs |
| **Knowledge Hub** | https://india-gully.pages.dev/resources |
| **Careers** | https://india-gully.pages.dev/careers |
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

## 🚀 Phase 9 — Navigation Cleanup, Valuation Fix & Light-Mode Default (v20)

**Version: v20 | Build: 3.6 MB | Routes: 20+ all 200 OK | Deploy: https://d2529cc3.india-gully.pages.dev**  
**Commit: 0d58cca | Date: March 2026**

### ✅ Phase 9 Deliverables

| Area | What Changed |
|------|-------------|
| **Navigation slimmed** | Reduced top-level nav items from 11 to 6: Home · About · Advisory(dropdown) · Mandates · Insights · More(dropdown) · Contact. Compare, Our Work, Market Data moved into Advisory dropdown. Our Work, Resources, Testimonials, Careers moved into More dropdown. FA icons replace emoji in dropdown items. |
| **Valuation `[object Object]` bug** | Fixed incorrect `layout({title, body, ...})` object-syntax call — should be `layout(title, html, opts)`. This fixed the page title showing `[object Object] — India Gully`. |
| **Same bug in 3 more routes** | Fixed identical `layout({…})` object call in `compare.tsx`, `market-data.tsx`, and `testimonials.tsx` — all pages now render with correct titles. |
| **Light mode as default** | Removed system `prefers-color-scheme: dark` fallback from the early-init dark mode script. Site now defaults to **light mode** on every visit; dark mode only activates if the user explicitly toggles it. |
| **Dark mode CSS selectors** | Tightened the overly broad `[style*="background:#fff"]` selector that was incorrectly forcing dark backgrounds on inline-styled elements across the whole page tree. |

---

## 🚀 Phase 8 — UI Polish, Bug Fixes & Final QA (v19)

**Version: v19 | Build: 3.6 MB | Routes: 20+ all 200 OK | Deploy: https://61b06b68.india-gully.pages.dev**  
**Commit: fb611a8 | Date: March 2026**

### ✅ Phase 8 Deliverables

| Area | What Changed |
|------|-------------|
| **Contact page — Premium Success Panel** | Completely redesigned with dark gradient background, pulse-ring animation on check icon, "What Happens Next" 3-step timeline (Acknowledgement → Team Review → NDA & IM), advisor card (Arun Manikonda with phone/email), WhatsApp follow-up button, View Mandates + Sector Insights CTAs. |
| **HORECA Enquiry — Premium Success Panel** | Redesigned with dark green/teal gradient, pulse-ring animation, "What Happens Next" 3-step timeline (Acknowledgement → RFQ Review → Quote & Specs), HORECA advisor card (Pavan Manikonda), WhatsApp follow-up button to Pavan's number, Browse Catalogue + Another Enquiry CTAs. |
| **Contact JS bug fixes** | Fixed broken phone validation regex (`[\s\-()]` → simple `[^0-9+]`); simplified email validation to avoid esbuild-minification issues; both forms now validate correctly in production build. |
| **HORECA Catalogue Cards** | Enhanced image placeholder with layered radial gradient background, decorative circles, larger category icon, uppercase category label. Consistent 130px image area with smooth hover effects. |
| **pulse-ring animation** | Added `@keyframes pulse-ring` definition inline on contact and HORECA pages so the animated ring on success icons renders correctly. |
| **NDA / Listings verification** | Confirmed NDA gate → unlock flow works end-to-end: basic mandate info (sector, location, value, highlights) visible before NDA; full specs, longDesc, images, and EOI form unlock after NDA acceptance stored in sessionStorage. |

---

## 🚀 Phase 7 — Premium UX Polish, HORECA Catalogue & EOI Redesign (v18)

**Version: v18 | Build: 3.6 MB | Routes: 20+ all 200 OK | Deploy: https://039cca40.india-gully.pages.dev**  
**Commit: 2670eff → latest | Date: March 2026**

### ✅ Phase 7 Deliverables

| Area | What Changed |
|------|-------------|
| **Listings detail — Teaser Layer** | Basic mandate facts (sector, location, value, status, 2 teaser highlights) are visible to all visitors without NDA. Financial details, full specs, images, and the EOI form are revealed only after NDA acceptance. |
| **Listings detail — NDA Gate** | Redesigned floating side-panel; sticky CTA prompts user to accept NDA. After acceptance the page smoothly unlocks: images slide in, financial metrics reveal, EOI form activates. |
| **EOI Confirmation Panel** | Full premium redesign: gold shimmer animation, pulse-ring icon, animated step timeline (Acknowledgement → Advisory Review → Information Memorandum → Management Presentation), WhatsApp quick-contact button linking to Arun Manikonda (+91 98108 89134), share-mandate button. |
| **HORECA Catalogue** | Category-icon mapping (8 categories → FontAwesome icons + hex colors). Price cards now show ex-GST price AND GST-inclusive price. `igCatRenderGrid` and `igCatRenderTable` rebuilt with safe HTML entity quoting to prevent JS parse errors. Fixed `DM Serif Display` font inside inline `style=` attributes (escaped correctly). BOQ Excel export retained and polished. |
| **mandateContactPhone in EOI payload** | All `/api/enquiry` calls now pass `mandateContactPhone`; the API reads this and sets phone on the owner notification email correctly. |
| **JS quote-escaping fixes** | All template-literal `onclick` attributes now use `&#39;` HTML entities rather than backslash-escaped single quotes; eliminates runtime "Unexpected identifier" errors in the catalogue page. |

---

## 📄 All Public Routes (20+ routes, all 200 OK)

| Route | Description |
|-------|-------------|
| `/` | Home — 5-slide hero carousel, partner marquee, trust row |
| `/about` | Company overview, team bios, timeline, KPIs, marquee mandates |
| `/services` | 6 advisory verticals |
| `/listings` | 8 active mandates with NDA gate + EOI form |
| `/listings/:id` | Mandate detail — teaser open, full details after NDA |
| `/works` | Track record with timeline + vertical filter |
| `/insights` | 14 research articles across all sectors |
| `/contact` | WhatsApp float, team quick-dial, SLA badges |
| `/horeca` | HORECA solutions catalogue + enquiry form |
| `/horeca/catalogue` | 27-SKU product catalogue with category filter, grid/table view, PDF/Excel BOQ export |
| `/valuation` | Interactive 3-method property calculator |
| `/testimonials` | 8-card testimonial wall with sector filters |
| `/compare` | Side-by-side mandate comparison tool |
| `/market-data` | India real estate & hospitality market dashboard |
| `/resources` | 12-item knowledge hub with request-access modal |
| `/careers` | 5 open positions with apply-now modal |
| `/sitemap.xml` | Auto-generated XML sitemap |
| `/audit` | Deep security audit report |
| `/api/health` | Health check endpoint |
| `/api/horeca/catalogue` | JSON — 27 HORECA products |
| `/api/enquiry` (POST) | EOI / NDA submission + email notifications |
| `/api/horeca-enquiry` (POST) | HORECA procurement enquiry + email to Pavan |

---

## 🚀 Phase 6 — Premium Notifications, PDF Brochure & Excel BOQ (v17)

**Deploy: https://039cca40.india-gully.pages.dev | Commit: 2670eff**

| Area | What Changed |
|------|-------------|
| **Email notifications** | SendGrid owner + CC info@ + submitter confirmation for all EOI/NDA/HORECA submissions |
| **PDF Brochure** | Print-ready A4 HORECA brochure with cover, product table, contact details |
| **Excel BOQ** | HTML-based Excel export with SKU, HSN, price columns, GST-inc calculation |
| **Listings image fix** | NDA-gate image carousel with lazy loading and lightbox |

---

## 🚀 Phase 5 — Knowledge Hub, Careers & Platform Enrichment (v16)

**Deploy: https://94a4d60a.india-gully.pages.dev | Commit: a589e48**

| Area | What Changed |
|------|-------------|
| **`/resources`** | 12-resource Knowledge Hub with category filter, request-access modal, custom research CTA |
| **`/careers`** | 5 open positions with expandable JD details, apply-now modal |
| **Insights** | 2 new deep-dive articles: *India Retail Leasing 2026* + *Distressed Hospitality Assets 2026* |
| **`/about`** | "By The Numbers" section + "Recognition & Marquee Mandates" grid |
| **Navigation** | Desktop "More" dropdown with Resources, Testimonials, Careers |
| **Sitemap** | `/resources` and `/careers` added |

---

## 🚀 Phase 4 — Compare, Market Data & Page Upgrades (v15.4)

**Deploy: https://a2e8104c.india-gully.pages.dev | Commit: 0e5cd40**

| Area | What Changed |
|------|-------------|
| **`/compare`** | Side-by-side mandate comparison for up to 3 properties |
| **`/market-data`** | Real-estate & hospitality market intelligence dashboard |
| **`/works`** | Milestone timeline (2017–2026), animated stats counters |

---

## 🔐 Security Overview

| Metric | Value |
|--------|-------|
| Security Score | **100/100** |
| Open Findings | **0** |
| Auth | PBKDF2-SHA256 + RFC 6238 TOTP |
| Sessions | HttpOnly Secure KV cookies, 30-min TTL |
| CSRF | Synchronizer token pattern |
| Rate Limiting | 5 attempts → 5-min lockout |
| XSS | safeHtml encoding throughout |
| Data | DPDP consent banner, NDA gates |

---

## 📊 Data Architecture

- **Storage**: Cloudflare KV — enquiry logs, subscriptions, NDA acceptances, session tokens, valuation refs, resource requests, career applications
- **Key Patterns**: `IG-ENQ-{ts}`, `IG-VAL-{ts}-XXXX`, `IG-CMP-{ts}-XXXX`, `IG-RES-{ts}`, `IG-APP-{ts}`
- **Static Data**: 8 active listings (5 hospitality + 3 HORECA context), 14 insight articles, 12 resources, 5 careers, 8 testimonials, 27 HORECA SKUs across 8 categories

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Cloudflare Pages / Workers (Edge) |
| Framework | Hono v4 (TypeScript) |
| Build | esbuild via custom npm script |
| Frontend | Vanilla JS + TailwindCSS CDN + FontAwesome 6 |
| Fonts | DM Serif Display + DM Sans (Google Fonts) |
| Storage | Cloudflare KV |
| Auth | Custom PBKDF2-SHA256 + TOTP (RFC 6238) |
| Email | SendGrid API v3 |

---

## 📌 Deployment

```bash
# Build
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy dist --project-name india-gully

# Local development (PM2)
npm run build && pm2 start ecosystem.config.cjs
```

---

*India Gully — Celebrating Desiness since 2017 · CIN: U74999DL2017PTC323237 · GSTIN: 07AAGCV0867P1ZN*
