# India Gully Enterprise Platform

**Celebrating Desiness** | Multi-Vertical Advisory Firm  
Vivacious Entertainment and Hospitality Pvt. Ltd.

---

## 🌐 Live URLs

| Environment | URL |
|-------------|-----|
| **Production** | https://india-gully.pages.dev |
| **Latest Deploy** | https://d0b3ecef.india-gully.pages.dev |
| **🔍 Deep Audit Report** | https://india-gully.pages.dev/audit |
| **HORECA Customer Portal** | https://india-gully.pages.dev/horeca/portal |
| **GraphQL Playground** | https://india-gully.pages.dev/admin/api-docs |
| **Knowledge Hub** | https://india-gully.pages.dev/resources |
| **Careers** | https://india-gully.pages.dev/careers |
| **Investor Relations** | https://india-gully.pages.dev/invest |
| **Pipeline Dashboard** | https://india-gully.pages.dev/pipeline |
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

## 🚀 Phase 10 — NDA Card Consistency, Color System Fixes & Nav Polish (v21)

**Version: v21 | Build: 3.6 MB | Routes: 20+ all 200 OK | Deploy: https://45c166af.india-gully.pages.dev**  
**Commit: 912b3db | Date: March 2026**

### ✅ Phase 10 Deliverables

| Area | What Changed |
|------|-------------|
| **NDA Card Consistency** | 5 listings with no public images now show an elegant dark placeholder (grid-pattern bg + radial gold glow + lock icon + property value + "Confidential · NDA Required") instead of a blank black box. All 8 cards now show an NDA lock badge (top-right corner) regardless of whether images exist. Fully consistent visual language across the mandates grid. |
| **Home page mandates** | Same fix applied to Featured Mandates section on home page — no-image cards show value + lock, all cards always display NDA badge. |
| **Marquee gradient bug** | Fixed `.marquee-outer::before/::after` gradient which was using `var(--bg)` (now light parchment). Changed to `rgba(255,255,255,.015)` matching the dark marquee container. |
| **val-card visibility** | Increased `val-card` border to `rgba(255,255,255,.12)` (from `.09`) for better visibility on dark `#0c0c18` background. |
| **Nav compact** | Reduced `.n-lk` padding to `.5rem .75rem` (from `1rem`); tightened desktop breakpoint to `1080px`; reduced letter-spacing to `.04em`. Nav no longer overflows on 1080px–1280px screens. |
| **`--bg` / `--bg-dk` system** | `--bg: #FAFAF6` (light parchment for light sections), `--bg-dk: #0c0c18` (dark for dark-bg sections). All dark sections (valuation, compare, market-data, testimonials, home trust strip, works timeline) use `var(--bg-dk)`. Light sections (about, careers) use `var(--bg)`. |

---

## 🚀 Phase 11 — SEO Foundation, Scroll UX, Contact FAB, Social Sharing & Investor Relations (v22)

**Version: v22 | Build: 3.7 MB | Routes: 21+ all 200 OK | Deploy: https://89f9072c.india-gully.pages.dev**  
**Commit: 08c0112 | Date: March 2026**

### ✅ Phase 11 Deliverables

| Area | What Changed |
|------|-------------|
| **SEO — Canonical URLs** | Added `canonical` meta tag to all missing routes: `about`, `services`, `works`, `contact`, `careers`. All 20+ pages now have correct canonical URLs pointing to `https://india-gully.pages.dev/…`. |
| **SEO — JSON-LD Schema** | Verified JSON-LD structured data (`WebPage` + `Organization`) on home, insights, invest pages for Google rich results. |
| **Scroll Progress Bar** | Gold thin progress bar (`#ig-scroll-prog`) at top of every page, animates with scroll position. Hidden on `@media print`. |
| **Global Contact FAB** | Fixed contact bubble (`#ig-contact-fab`) bottom-right on every page (except portal/admin). Three quick-action buttons: WhatsApp (green), Call (gold), Email (slate). Animates on hover. Hidden on print. |
| **Insights Social Sharing** | Article detail pages now show full social-share row: X/Twitter, LinkedIn, WhatsApp, Copy-Link buttons. Published meta line includes read time with clock icon. |
| **Insights Read Time** | All 20 articles have `readTime` metadata. Read time shown in article card meta and article detail footer. |
| **/invest — Investor Relations page** | New page at `/invest` with: dark hero + key metric strip (₹1,165 Cr+ pipeline, ₹2,000 Cr+ transacted, 15+ hotel mandates, 8 active mandates, 5 verticals), Why Partner section (6 advantage cards), Active Pipeline table (filterable by sector), NDA/Information Request form, Leadership contact cards, Legal Disclaimer. |
| **Nav & Footer — Investor Relations** | `/invest` added to desktop "More" dropdown (with chart-line icon), mobile menu, and footer quick-links. |
| **Dark mode fix — India Gully Difference** | `.diff-section` class forces `background:#0a0a10` regardless of theme. `[data-theme="dark"] .sec-dk` also overridden to `#0a0a0f !important` so the section is never washed out in dark mode. |
| **Trust Row readability** | Dark-mode `.trust-item` text raised to `rgba(255,255,255,.75)` (from `.5`); `strong` now `#fff`. Fully legible in both modes. |

### 🌐 New Page URLs
| Page | URL |
|------|-----|
| Investor Relations | https://india-gully.pages.dev/invest |

---

## 🚀 Phase 17 — Insights Expansion, Pipeline Dashboard, India Map, Header Fix, JS Fix (v29)

**Version: v29 | Build: 3.9 MB | Routes: 23+ all 200 OK | Deploy: https://d0b3ecef.india-gully.pages.dev**  
**Commit: 912302c | Date: March 2026**

### ✅ Phase 17 Deliverables

| Area | What Changed |
|------|-------------|
| **BUGFIX — Nav Header Bands** | **Root cause fixed**: `#stickyStats` was using `transform:translateY(-110%)` which moved it into the nav area visually. Changed to `opacity:0; visibility:hidden` approach — element is fully invisible when hidden and only becomes visible (opacity:1, visibility:visible, top:var(--nav-h)) after user scrolls. No CSS overlap possible. Nav renders cleanly on page load. |
| **BUGFIX — JS 'Unexpected identifier color'** | Fixed long-standing syntax error in the Cmd+K search palette's no-results `innerHTML` string — single quotes inside single-quoted string were terminating the string early, making `color` appear as a bare identifier. Fixed by using double-quote HTML attributes. All JS now parses without errors. |
| **17B — 3 New Insight Articles** | Added 3 deep-dive research articles: (1) **"Cloud Kitchens & Dark Stores: India's HORECA Infrastructure Revolution"** (HORECA, 9 min) — covers GMV, cloud kitchen formats, dark store real estate, investment models; (2) **"Hotel Brand Affiliation in India 2026: Choosing the Right Flag"** (Hospitality, 12 min) — comprehensive MC framework covering Marriott/IHG/Hyatt/domestic brands, contract terms, exit value; (3) **"Building India's Next Entertainment Destination"** (Entertainment, 10 min) — development economics, capex benchmarks, revenue models, operator structures. Insights count updated to 19. |
| **17B — Enhanced Author Byline Card** | Article detail sidebar now shows a premium dark "India Gully Research" byline card with IG monogram, 4-stat mini-grid (8+ Yrs Advisory, 40+ Contracts, ₹1,165 Cr Pipeline, 6 Sectors), category badge, publish date and CIN registration. Replaces the plain icon author block. |
| **17C — Pipeline Dashboard `/pipeline`** | New investor-facing pipeline dashboard at `/pipeline`. Features: (1) Hero with live pipeline indicator; (2) 5-KPI metrics bar; (3) Analytics section with SVG sector-mix donut chart (Real Estate 77.3%, Hospitality 21.1%, Debt 1.7%), deal-size distribution bar chart across 4 buckets, and stage-breakdown table; (4) Timeline view grouping all 8 mandates by stage (Active Fundraise → Due Diligence → Feasibility) with colored stage indicators and mandate cards; (5) NDA request CTA. Added to nav "More" dropdown. |
| **17D — India Map on Homepage** | Pan-India Presence section on `/` with SVG India outline map, animated pulsing pin for Delhi NCR (₹900 Cr, 3 mandates), static pins for Chandigarh, Kasauli/Chail, Jaipur and Mumbai. City list grid, hover tooltips with mandate details, Pipeline Dashboard CTA. |

---

## 🚀 Phase 16 — Save Mandates, HORECA 3-Step RFQ, Testimonials Carousel, Performance (v27)

**Version: v27 | Build: 3.8 MB | Routes: 22+ all 200 OK | Deploy: https://852a5a63.india-gully.pages.dev**  
**Commit: cd571d6 | Date: March 2026**

### ✅ Phase 16 Deliverables

| Area | What Changed |
|------|-------------|
| **16A — Home Insights Strip** | A "Recent Insights" mini-strip on the home page surfaces the 3 latest articles from `/insights` with category chip, read-time, title and arrow CTA. Styled in the dark editorial palette with gold accents. |
| **16B — Save Mandate Bookmarks** | Every mandate card on `/listings` now has a ♥ bookmark button. Saves/removes the mandate ID to `localStorage` under `ig_saved_mandates`. A "Saved (N)" toggle button in the filter bar shows the count badge and filters the grid to saved-only mandates. State survives page refreshes. |
| **16C — HORECA 3-Step Quick RFQ** | The HORECA Quick RFQ slide-out panel is rewritten as a 3-step wizard: Step 1 — Contact Details (name, company, email, phone); Step 2 — Supply Requirements (category checkboxes + property location + notes); Step 3 — Success screen with reference ID + WhatsApp CTA. Progress indicator, back/next navigation, inline validation, POST to `/api/horeca-enquiry`. |
| **16D — Testimonials Carousel** | `/testimonials` redesigned with an auto-advancing carousel at the top (5 s interval, pause-on-hover, touch swipe, prev/next arrows, dot indicators, animated progress bar). All 8 testimonials get 5-star ratings, sector icon badges, outcome pills, and scroll-triggered fade-in animation on the card wall. Stats strip shows 5.0 rating, 8+ clients, ₹1,165 Cr+, 100% NDA compliance. |
| **16E — Performance: Non-Blocking Resources** | Google Fonts and FontAwesome now load via `media="print" onload` swap trick — completely non-render-blocking (improves FCP/LCP). Tailwind CDN script gets `defer` attribute. Partner logos and advisory firm logos get `loading="lazy" decoding="async"`. `<link rel="preload" as="style">` hints added for both external CSS resources. |

---

## 🚀 Phase 15 — Cmd+K Search Palette, Mobile CTA Bar, Social Proof, Hero Stars, Works Improvements (v26)

**Version: v26 | Build: 3.8 MB | Routes: 22+ all 200 OK | Deploy: https://3e7281ee.india-gully.pages.dev**  
**Commit: bcf3e8f | Date: March 2026**

### ✅ Phase 15 Deliverables

| Area | What Changed |
|------|-------------|
| **15A — Mobile Sticky CTA Bar** | `#ig-mob-bar` shown on ≤768 px screens: 3 full-width tap targets — WhatsApp (green, pre-filled message), Call (+91 8988 988 988), Enquire (gold → `/contact`). Safe-area inset for iOS notch. Hidden on desktop; print-media hidden. |
| **15B — Cmd+K Search Palette** | Global `Ctrl+K` / `⌘K` shortcut opens a full-screen search overlay. 55-item index covers all Pages, 8 Active Mandates, 14 Insight Articles. Fuzzy substring matching, ↑↓ keyboard navigation, Enter to open, Esc to close, hover highlight. Shows featured mandates when query is empty. Data index embedded in layout.ts globally — works on every page. |
| **15C — Listing Social Proof Badge** | Each mandate detail sidebar now shows a view-counter widget: animated SVG ring fills based on simulated weekly views (42–210), count-up number animation, and an "N investors interested" badge that fades in after 600 ms. Seeded deterministically from listing ID for consistency. |
| **15D — Hero Star Particles** | Canvas-based star/particle overlay added to every hero carousel slide. 80–120 gently drifting gold particles, alpha-pulse twinkling animation. Paused on non-active slides to save CPU. Respects lazy-start (initialises after hero loads). |
| **15E — Works Page Improvements** | Summary stats now use `count-up` + `data-target` with IntersectionObserver animation (₹2,000 Cr+, N+ Mandates, 6 Verticals). Project cards grid becomes 2-col at ≤900 px and 1-col at ≤560 px via `.works-card-grid` responsive CSS. |

---

## 🚀 Phase 14 — OG Social Images, Home Proof Bar, Admin Enquiry Inbox & Performance (v25)

**Version: v25 | Build: 3.8 MB | Routes: 22+ all 200 OK | Deploy: https://b27bbc9b.india-gully.pages.dev**  
**Commit: 264998b | Date: March 2026**

### ✅ Phase 14 Deliverables

| Area | What Changed |
|------|-------------|
| **OG Social Images** | 3 custom AI-generated social share images: `/static/og.jpg` (default brand image), `/static/og-invest.jpg` (Investor Relations), `/static/og-listings.jpg` (Active Mandates). All 1200×630 format with dark luxury branding and gold typography. |
| **ogImage — all pages** | `ogImage` property added to every page's layout call (20+ pages): home, about, services, works, insights, contact, careers, invest, listings, horeca, resources, testimonials. Default fallback is `og.jpg`. |
| **Build script — static copy** | `npm run build` now runs `cp -r public/static/. dist/static/` after esbuild, ensuring all team photos, OG images, partner logos etc. are included in every Cloudflare Pages deployment. |
| **Home — Credentials Proof Bar** | New dark animated strip between stats and partner marquee. 14 credential chips scroll continuously: CERT-In Compliant, OWASP Top-10, EY Co-Advisory, ₹1,165 Cr+ Pipeline, 15+ Hotel Projects, 30+ Retail Brands, CBRE Co-Advisory, SEBI Advisory, MCA Registered, Pan-India Network, ₹2,000 Cr+ Transacted, 8+ Years, Mutual NDA Framework, 20+ Hospitality Brands. Pauses on hover. Respects `prefers-reduced-motion`. |
| **Hero preload** | `<link rel="preload" as="image" fetchpriority="high">` added for first hero slide image (`mapleresorts.in`) to improve LCP score. Layout accepts `heroPreload` opt on all pages. |
| **Admin — Enquiry Inbox** | New route `/admin/enquiries` (auth-protected). Reads all `enquiry:*` and `horeca_enquiry:*` keys from Cloudflare KV. Shows stats strip (Total, Today, Contact, EOI, NDA, HORECA), searchable table with type badges, name, email, phone, org, message preview, ref number, time-ago, and Reply button. Falls back to demo data in local dev. Filterable by type (All / EOI / NDA / Contact). Added to admin sidebar under Business group. |

### 🌐 New Asset URLs
| Asset | URL |
|-------|-----|
| Default OG image | https://india-gully.pages.dev/static/og.jpg |
| Investor Relations OG | https://india-gully.pages.dev/static/og-invest.jpg |
| Active Mandates OG | https://india-gully.pages.dev/static/og-listings.jpg |
| Enquiry Inbox | https://india-gully.pages.dev/admin/enquiries (auth required) |

---

## 🚀 Phase 13 — About Page Redesign, Listing Detail Share/WhatsApp, Contact Email API & Global UX (v24)

**Version: v24 | Build: 3.7 MB | Routes: 21+ all 200 OK | Deploy: https://7623bd78.india-gully.pages.dev**  
**Commit: f4d8ef2 | Date: March 2026**

### ✅ Phase 13 Deliverables

| Area | What Changed |
|------|-------------|
| **About — Timeline extended** | 2025 and 2026 milestones added: ₹1,165 Cr+ pipeline, co-advisory with EY, Debt & Special Situations scale; 2026 Investor Relations portal launch, CERT-In OWASP Top-10 compliance, 8 active mandates across 5 asset classes. |
| **About — Accolades strip** | New credentials & affiliations strip (dark band between By-the-Numbers and Recognition sections): CERT-In Compliant, OWASP Top-10 Secure, Mutual NDA Framework, SEBI-Compliant Advisory, EY Co-Advisory, CBRE Co-Advisory, MCA Registered, Pan-India Network. |
| **About — Count-up numbers** | "By The Numbers" stat cards use `count-up` class — numbers animate in with IntersectionObserver when the section scrolls into view. |
| **Listing detail — Share buttons** | Share row added to sidebar CTA box: X/Twitter, LinkedIn, WhatsApp share links + clipboard copy-link button. |
| **Listing detail — WhatsApp CTA** | Green WhatsApp Enquiry button in sidebar with pre-filled message including mandate title and value. |
| **Listing detail — Dark-mode fix** | "More Active Mandates" card body backgrounds changed from hardcoded `#fff` to `var(--parch)` — fully theme-aware. |
| **Contact form — Email API** | `/api/enquiry` now fires email notifications for `type: 'general'` (contact form): team notification to `info@indiagully.com` + CC to `akm@indiagully.com` + confirmation email to submitter with reference number and next steps. All via SendGrid. |
| **Contact form — UX improvements** | `d.success` check added — server-side errors now surface as inline form errors (not silent). Success path triggers `igToast('Enquiry submitted! A confirmation email has been sent.', 'success')`. |
| **Lazy loading** | `loading="lazy"` added to all team photos in `about.tsx`, vertical images in `works.tsx`, and article images in `insights.tsx`. |

---

## 🚀 Phase 12 — SEO Completion, Listings UX, /invest Polish & Dark Mode Fixes (v23)

**Version: v23 | Build: 3.7 MB | Routes: 21+ all 200 OK | Deploy: https://d098b3b6.india-gully.pages.dev**  
**Commit: 3cfc9cb | Date: March 2026**

### ✅ Phase 12 Deliverables

| Area | What Changed |
|------|-------------|
| **Canonical SEO — all pages** | Added absolute canonical URLs to `horeca.tsx` (main + catalogue), `resources.tsx`, and fixed `testimonials.tsx` relative → absolute. All 20+ pages now have correct canonical URLs. |
| **Sitemap — /invest added** | `/invest` with `priority: 0.85` and `changefreq: monthly` added to `/sitemap.xml`. Sitemap now covers all 21+ routes. |
| **/listings — Sort controls** | Sort bar added above mandate grid: Default Order, Value High→Low, Value Low→High, By Sector. Cards get `data-value` and `data-idx` attributes. Result count badge updates dynamically. |
| **/listings — Reset button** | One-click reset restores default sort + "All Mandates" filter. |
| **/listings — WhatsApp Enquire** | Green WhatsApp Enquire button on every mandate card with pre-filled message: "Hi, I am interested in [Mandate Title] — please share details / Information Memorandum." |
| **/listings — Canonical + title** | Page title improved to "Active Mandates — India Gully Advisory Pipeline". Canonical added. |
| **/listings — Dark mode cards** | Card body background changed from hardcoded `#fff` to `var(--parch)` (adapts to theme). |
| **/invest — Sector filter** | Filter pills (All, Real Estate, Hospitality, Heritage Hospitality, Mixed-Use) above pipeline grid with live JS filtering. |
| **/invest — Dark mode cards** | Pipeline card backgrounds changed from `#fff` to `var(--parch)`. `data-sector` added to each card for filtering. |

---

## 🚀 Phase 9 — Nav Slim, Layout Title Fix & Light Mode Default (v20)

**Version: v20 | Build: 3.6 MB | Routes: 20+ all 200 OK | Deploy: https://d2529cc3.india-gully.pages.dev**  
**Commit: dd14faa | Date: March 2026**

### ✅ Phase 9 Deliverables

| Area | What Changed |
|------|-------------|
| **Navigation** | Slimmed from 11 to 7 top-level items. Services & Tools moved into Advisory dropdown. Our Work, Resources, Testimonials, Careers moved to More dropdown. FA icons instead of emojis. |
| **Valuation title bug** | Fixed `[object Object]` title — was calling `layout({title:...})` instead of `layout('Title', html, opts)`. Fixed across compare, market-data, testimonials pages too. |
| **Light mode default** | Removed system dark-mode fallback. Site now defaults to light mode; dark mode only activates when user explicitly toggles. |
| **Dark mode CSS** | Tightened `[data-theme="dark"]` selectors to prevent overriding nav/footer/hero backgrounds. |

---



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
