# India Gully Enterprise Platform

**Celebrating Desiness** | Multi-Vertical Advisory Firm  
Vivacious Entertainment and Hospitality Pvt. Ltd.

---

## 🌐 Live URLs

| Environment | URL |
|-------------|-----|
| **Production** | https://india-gully.pages.dev |
| **Latest Deploy** | https://94a4d60a.india-gully.pages.dev |
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

## 🚀 Phase 5 — Knowledge Hub, Careers & Platform Enrichment (v16)

**Version: v16 | Build: 3.5 MB | Routes: 17+ all 200 OK | Deploy: https://94a4d60a.india-gully.pages.dev**  
**Commit: a589e48 | Date: March 2026**

### ✅ Phase 5 Deliverables

| Area | What Changed |
|------|-------------|
| **`/resources`** | 12-resource Knowledge Hub with category filter, request-access modal, custom research CTA. Resources span HORECA, Real Estate, Hospitality, Advisory and Legal categories. |
| **`/careers`** | 5 open positions with expandable JD details, apply-now modal (posts to `/api/enquiry`), speculative CV CTA, "Why India Gully" section. |
| **Insights** | 2 new deep-dive articles: *India Retail Leasing 2026* (Retail, Mar 2026) + *Distressed Hospitality Assets 2026* (Debt & Special Situations, Mar 2026). Duplicate article ID fixed. |
| **`/about`** | Added "By The Numbers" section (8 KPIs) + "Recognition & Marquee Mandates" grid showing 5 headline transactions and 4 competitive differentiators. |
| **Navigation** | Desktop: "More" dropdown with Resources, Testimonials, Careers. Mobile: Resources + Careers added. Footer quicklinks updated. |
| **Sitemap** | `/resources` and `/careers` added with appropriate priorities. |

---

## 📄 All Public Routes (17 routes, all 200 OK)

| Route | Description |
|-------|-------------|
| `/` | Home — 5-slide hero carousel, partner marquee, trust row |
| `/about` | Company overview, team bios, timeline, KPIs, marquee mandates |
| `/services` | 6 advisory verticals |
| `/listings` | 8 active mandates with NDA gate + EOI form |
| `/works` | Track record with timeline + vertical filter |
| `/insights` | 14 research articles across all sectors |
| `/contact` | WhatsApp float, team quick-dial, SLA badges |
| `/horeca` | HORECA solutions catalogue + enquiry form |
| `/valuation` | Interactive 3-method property calculator |
| `/testimonials` | 8-card testimonial wall with sector filters |
| `/compare` | Side-by-side mandate comparison tool |
| `/market-data` | India real estate & hospitality market dashboard |
| `/resources` | 12-item knowledge hub with request-access modal |
| `/careers` | 5 open positions with apply-now modal |
| `/sitemap.xml` | Auto-generated XML sitemap |
| `/audit` | Deep security audit report |
| `/api/health` | Health check endpoint |

---

## 🚀 Phase 4 — Compare, Market Data & Page Upgrades (v15.4)

**Deploy: https://a2e8104c.india-gully.pages.dev | Commit: 0e5cd40**

| Area | What Changed |
|------|-------------|
| **`/compare`** | Side-by-side mandate comparison for up to 3 properties. Highlights delta, share URL generation |
| **`/market-data`** | Real-estate & hospitality market intelligence dashboard — 6 cities, 5 hotel segments, ₹1,165 Cr+ pipeline |
| **`/api/compare`** | POST endpoint — returns ref ID + share URL |
| **`/api/market-data`** | GET endpoint — city cap rates, hotel RevPAR benchmarks, pipeline value |
| **`/works`** | Milestone timeline (2017–2026), animated stats counters, vertical filter tabs |
| **`/about`** | Expandable team bio cards, achievement timeline |

---

## 🚀 Phase 3 — Valuation, Testimonials & UX Polish (v15)

**Deploy: https://bef789d0.india-gully.pages.dev | Commit: fe78fce**

| Area | What Changed |
|------|-------------|
| **`/valuation`** | Interactive 3-method property calculator |
| **`/api/valuation`** | POST endpoint with unique ref IDs |
| **`/testimonials`** | 8-card testimonial wall with sector filters |
| **Home** | Partner logo marquee, trust signals row |
| **Contact** | WhatsApp floating button, team quick-dial, SLA badges |

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
- **Static Data**: 8 active listings, 14 insight articles, 12 resources, 5 careers, 8 testimonials

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
