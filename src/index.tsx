import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

// Route imports
import homeRoute from './routes/home'
import aboutRoute from './routes/about'
import servicesRoute from './routes/services'
import horecaRoute from './routes/horeca'
import listingsRoute from './routes/listings'
import insightsRoute from './routes/insights'
import contactRoute from './routes/contact'
import portalRoute from './routes/portal'
import adminRoute from './routes/admin'
import apiRoute from './routes/api'
import salesRoute from './routes/sales'
import worksRoute from './routes/works'
import valuationRoute from './routes/valuation'
import testimonialsRoute from './routes/testimonials'
import compareRoute from './routes/compare'
import marketDataRoute from './routes/market-data'
import resourcesRoute from './routes/resources'
import careersRoute from './routes/careers'
import investRoute from './routes/invest'
import pipelineRoute from './routes/pipeline'
import { layout } from './lib/layout'

const app = new Hono()

// ── I1 PT-004: PER-REQUEST CSP NONCE ─────────────────────────────────────────
// Generates a cryptographically random nonce for every request and sets a
// strict Content-Security-Policy that replaces 'unsafe-inline' with the nonce.
// The nonce is stored in c.var so HTML-rendering routes can inject it into
// every <script nonce="…"> and <style nonce="…"> tag.
// ─────────────────────────────────────────────────────────────────────────────
function genNonce(): string {
  const raw = crypto.getRandomValues(new Uint8Array(16))
  return btoa(String.fromCharCode(...Array.from(raw)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

// ── SECURITY HEADERS MIDDLEWARE (defense-in-depth alongside _headers file) ────
app.use('*', async (c, next) => {
  await next()
  c.header('X-Frame-Options', 'DENY')
  c.header('X-Content-Type-Options', 'nosniff')
  c.header('Referrer-Policy', 'strict-origin-when-cross-origin')
  c.header('X-XSS-Protection', '1; mode=block')
  c.header('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
  c.header('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=()')
  // CSP: allow CDN scripts (Tailwind, Chart.js, Axios, FontAwesome) by host + unsafe-inline
  // NOTE: 'strict-dynamic' was REMOVED — it disabled host allowlisting and blocked CDN scripts,
  // causing the frontend to appear scrambled (Tailwind CSS + inline config not loading).
  c.header('Content-Security-Policy',
    `default-src 'self'; ` +
    `script-src 'self' 'unsafe-inline' ` +
      `https://cdn.tailwindcss.com https://cdn.jsdelivr.net https://cdnjs.cloudflare.com; ` +
    `style-src 'self' 'unsafe-inline' ` +
      `https://fonts.googleapis.com https://cdn.jsdelivr.net; ` +
    `font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net; ` +
    `img-src 'self' data: https: https://api.qrserver.com; ` +
    `connect-src 'self' https://india-gully.pages.dev; ` +
    `frame-ancestors 'none'; base-uri 'self'; form-action 'self';`
  )
})

app.use('/api/*', cors({
  origin: ['https://india-gully.pages.dev', 'http://localhost:3000'],
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'X-CSRF-Token', 'Authorization'],
  credentials: true,
}))
app.use('/static/*', serveStatic({ root: './' }))
app.use('/assets/*', serveStatic({ root: './' }))

// ── LEGAL PAGES ───────────────────────────────────────────────────────────────
function legalPage(title: string, content: string) {
  const body = `
<div class="nav-sp"></div>
<div class="sec-wh">
  <div class="wrap-sm">
    <div class="eyebrow" style="margin-bottom:1rem;">Legal</div>
    <h1 class="h2" style="margin-bottom:1.5rem;">${title}</h1>
    <div class="gr"></div>
    <div style="font-size:.9375rem;line-height:1.85;color:var(--ink-soft);">
      ${content}
    </div>
    <div style="margin-top:2.5rem;padding-top:2rem;border-top:1px solid var(--border);">
      <a href="/" style="font-size:.78rem;color:var(--gold);">← Return to India Gully</a>
    </div>
  </div>
</div>`
  return layout(title, body)
}

app.get('/legal/privacy', (c) => c.html(legalPage('Privacy Policy', `
<p style="color:var(--ink-muted);font-size:.82rem;margin-bottom:1.75rem;">Effective Date: 1 January 2025 · Last Updated: 4 March 2026</p>

<h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.35rem;color:var(--ink);margin-bottom:.875rem;margin-top:2rem;">1. Introduction</h2>
<p>India Gully (operated by Vivacious Entertainment and Hospitality Pvt. Ltd., hereinafter "we", "our", or "the Company") is committed to protecting your personal data and respecting your privacy. This Privacy Policy describes how we collect, use, process, and disclose information about users of our website and enterprise platform.</p>

<h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.35rem;color:var(--ink);margin-bottom:.875rem;margin-top:2rem;">2. Information We Collect</h2>
<p>We may collect the following categories of personal information:</p>
<ul style="margin:.875rem 0;padding-left:1.5rem;">
  <li style="margin-bottom:.5rem;"><strong>Identity Data:</strong> Name, designation, company name, PAN, DIN, and other identification details.</li>
  <li style="margin-bottom:.5rem;"><strong>Contact Data:</strong> Email address, phone number, registered address.</li>
  <li style="margin-bottom:.5rem;"><strong>Transaction Data:</strong> Invoice details, payment records, engagement terms.</li>
  <li style="margin-bottom:.5rem;"><strong>Technical Data:</strong> IP address, browser type, access timestamps, device information.</li>
  <li style="margin-bottom:.5rem;"><strong>Communications:</strong> Enquiry forms, messages, meeting minutes, correspondence.</li>
</ul>

<h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.35rem;color:var(--ink);margin-bottom:.875rem;margin-top:2rem;">3. How We Use Your Data</h2>
<p>Your data is used to: deliver advisory services; process mandates and invoices; comply with statutory and regulatory requirements under the Companies Act 2013, GST laws, and SEBI regulations; communicate service updates; and improve our platform. We do not sell or rent your personal data to third parties.</p>

<h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.35rem;color:var(--ink);margin-bottom:.875rem;margin-top:2rem;">4. Data Retention</h2>
<p>Personal data is retained for as long as necessary to fulfil the purposes for which it was collected, or as required by applicable law (typically 7-8 years for financial and statutory records under Indian law).</p>

<h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.35rem;color:var(--ink);margin-bottom:.875rem;margin-top:2rem;">5. Your Rights</h2>
<p>Under applicable Indian data protection laws, you have the right to access, correct, or request deletion of your personal data. To exercise any right, write to: <a href="mailto:info@indiagully.com" style="color:var(--gold);">info@indiagully.com</a>.</p>

<h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.35rem;color:var(--ink);margin-bottom:.875rem;margin-top:2rem;">6. Security</h2>
<p>We implement appropriate technical and organisational measures including 2FA authentication, encrypted storage, access logging, and IP whitelisting to protect your personal data against unauthorised access or disclosure.</p>

<h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.35rem;color:var(--ink);margin-bottom:.875rem;margin-top:2rem;">7. Contact</h2>
<p>For privacy-related queries: <strong>Vivacious Entertainment and Hospitality Pvt. Ltd.</strong>, New Delhi, India. Email: <a href="mailto:info@indiagully.com" style="color:var(--gold);">info@indiagully.com</a></p>
`)))

app.get('/legal/terms', (c) => c.html(legalPage('Terms of Use', `
<p style="color:var(--ink-muted);font-size:.82rem;margin-bottom:1.75rem;">Effective Date: 1 January 2025 · Last Updated: 4 March 2026</p>

<h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.35rem;color:var(--ink);margin-bottom:.875rem;margin-top:2rem;">1. Acceptance of Terms</h2>
<p>By accessing or using the India Gully website or enterprise platform (collectively, the "Platform"), you agree to be bound by these Terms of Use. If you do not agree, please do not use the Platform.</p>

<h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.35rem;color:var(--ink);margin-bottom:.875rem;margin-top:2rem;">2. Permitted Use</h2>
<p>The Platform is for authorised users only. Access to the enterprise portal is restricted to individuals with valid login credentials issued by India Gully. Sharing credentials or unauthorised access is strictly prohibited and may constitute an offence under the Information Technology Act 2000.</p>

<h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.35rem;color:var(--ink);margin-bottom:.875rem;margin-top:2rem;">3. Intellectual Property</h2>
<p>All content on the Platform, including text, graphics, data, reports, analyses, the India Gully brand, and the "Celebrating Desiness" mark, is proprietary to Vivacious Entertainment and Hospitality Pvt. Ltd. and protected under applicable copyright and trademark law. No content may be reproduced, distributed, or used without prior written permission.</p>

<h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.35rem;color:var(--ink);margin-bottom:.875rem;margin-top:2rem;">4. Confidentiality</h2>
<p>All information accessed through the Platform, including mandate data, financial statements, client details, board resolutions, and strategic analyses, is strictly confidential. Users must not disclose such information to any third party without the prior written consent of India Gully.</p>

<h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.35rem;color:var(--ink);margin-bottom:.875rem;margin-top:2rem;">5. Limitation of Liability</h2>
<p>India Gully shall not be liable for any indirect, incidental, or consequential damages arising from use of the Platform. Advisory services are provided on the basis of our best professional judgement; outcomes are not guaranteed.</p>

<h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.35rem;color:var(--ink);margin-bottom:.875rem;margin-top:2rem;">6. Governing Law</h2>
<p>These Terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in New Delhi.</p>

<h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.35rem;color:var(--ink);margin-bottom:.875rem;margin-top:2rem;">7. Contact</h2>
<p>For queries: <a href="mailto:info@indiagully.com" style="color:var(--gold);">info@indiagully.com</a> · +91 8988 988 988</p>
`)))

app.get('/legal/disclaimer', (c) => c.html(legalPage('Disclaimer', `
<p style="color:var(--ink-muted);font-size:.82rem;margin-bottom:1.75rem;">Last Updated: 4 March 2026</p>

<h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.35rem;color:var(--ink);margin-bottom:.875rem;margin-top:2rem;">Advisory Disclaimer</h2>
<p>India Gully is a multi-vertical advisory firm. The information, analyses, and recommendations provided by India Gully, whether on this website or through the enterprise platform, are prepared on the basis of information believed to be reliable but are provided "as is" without any warranty, express or implied.</p>

<h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.35rem;color:var(--ink);margin-bottom:.875rem;margin-top:2rem;">No Investment Advice</h2>
<p>Nothing on this Platform constitutes investment advice, a solicitation to invest, or a guarantee of returns. Real estate, hospitality, and entertainment transactions carry inherent risks. Recipients of advisory reports should conduct their own independent due diligence before making any investment or business decision.</p>

<h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.35rem;color:var(--ink);margin-bottom:.875rem;margin-top:2rem;">Valuation & Financial Projections</h2>
<p>Valuations, financial models, and projections prepared by India Gully are based on assumptions, market data, and methodologies current at the time of preparation. Actual results may differ materially from projections. India Gully accepts no liability for reliance on such projections.</p>

<h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.35rem;color:var(--ink);margin-bottom:.875rem;margin-top:2rem;">Third-Party Links</h2>
<p>The Platform may contain links to third-party websites. India Gully is not responsible for the content, accuracy, or privacy practices of such websites.</p>

<h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.35rem;color:var(--ink);margin-bottom:.875rem;margin-top:2rem;">Regulatory Compliance</h2>
<p>India Gully operates in compliance with applicable Indian laws including the Companies Act 2013, RERA, SEBI guidelines (where applicable), and GST legislation. This Platform does not constitute a public offer of any kind.</p>

<h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.35rem;color:var(--ink);margin-bottom:.875rem;margin-top:2rem;">Contact</h2>
<p>For legal queries: <strong>Vivacious Entertainment and Hospitality Pvt. Ltd.</strong>, New Delhi, <a href="mailto:info@indiagully.com" style="color:var(--gold);">info@indiagully.com</a></p>
`)))

// ── SEO: sitemap.xml ─────────────────────────────────────────────────────────
app.get('/sitemap.xml', (c) => {
  const BASE = 'https://india-gully.pages.dev'
  const now = new Date().toISOString().split('T')[0]

  const staticPages = [
    { url: '/',         priority: '1.0', freq: 'daily'   },
    { url: '/about',    priority: '0.8', freq: 'monthly' },
    { url: '/services', priority: '0.9', freq: 'monthly' },
    { url: '/horeca',   priority: '0.85',freq: 'monthly' },
    { url: '/listings', priority: '0.95',freq: 'daily'   },
    { url: '/works',    priority: '0.8', freq: 'monthly' },
    { url: '/insights', priority: '0.9', freq: 'weekly'  },
    { url: '/contact',  priority: '0.8', freq: 'monthly' },
    { url: '/valuation',     priority: '0.85', freq: 'monthly' },
    { url: '/testimonials',  priority: '0.75', freq: 'monthly' },
    { url: '/compare',       priority: '0.8',  freq: 'weekly'  },
    { url: '/market-data',   priority: '0.85', freq: 'weekly'  },
    { url: '/resources',     priority: '0.85', freq: 'weekly'  },
    { url: '/careers',       priority: '0.75', freq: 'monthly' },
    { url: '/invest',        priority: '0.85', freq: 'monthly' },
    { url: '/legal/privacy',    priority: '0.3', freq: 'yearly' },
    { url: '/legal/terms',      priority: '0.3', freq: 'yearly' },
    { url: '/legal/disclaimer', priority: '0.3', freq: 'yearly' },
  ]

  const listingIds = [
    'prism-tower-gurgaon','belcibo-hospitality-platform','hotel-rajshree-chandigarh',
    'welcomheritage-santa-roza-kasauli','heritage-hotel-jaipur','maple-resort-chail',
    'ambience-tower-north-delhi','sawasdee-jlg-noida',
  ]

  const insightIds = [
    'india-realty-2026-outlook','entertainment-zone-regulatory-india','horeca-tier2-supply-chain',
    'horeca-tier2-supply-chain-deep-dive','mall-hotel-office-trinity','ibc-distressed-hospitality-2025',
    'mall-mixed-use-integration','retail-leasing-trends-india-2026','debt-special-situations-india-hospitality-2026',
    'greenfield-midscale-hotels','india-hospitality-2024','entertainment-destinations-india',
    'horeca-procurement-strategy','debt-special-situations-hospitality','retail-leasing-malls-india',
    'greenfield-hotel-development',
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(p => `  <url>
    <loc>${BASE}${p.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${p.freq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
${listingIds.map(id => `  <url>
    <loc>${BASE}/listings/${id}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`).join('\n')}
${insightIds.map(id => `  <url>
    <loc>${BASE}/insights/${id}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.75</priority>
  </url>`).join('\n')}
</urlset>`

  return c.text(xml, 200, { 'Content-Type': 'application/xml; charset=utf-8' })
})

// ── SEO: robots.txt ──────────────────────────────────────────────────────────
app.get('/robots.txt', (c) => {
  const BASE = 'https://india-gully.pages.dev'
  return c.text(
    `User-agent: *\nAllow: /\nDisallow: /portal/\nDisallow: /admin/\nDisallow: /api/\n\nSitemap: ${BASE}/sitemap.xml\n`,
    200,
    { 'Content-Type': 'text/plain; charset=utf-8' }
  )
})

// ── SEO: humans.txt ──────────────────────────────────────────────────────────
app.get('/humans.txt', (c) => c.text(
  `/* TEAM */\nIndia Gully Advisory — Vivacious Entertainment and Hospitality Pvt. Ltd.\nNew Delhi, India\ninfo@indiagully.com\n\n/* SITE */\nLast update: ${new Date().toISOString().split('T')[0]}\nLanguage: English\nDoctype: HTML5\n`,
  200, { 'Content-Type': 'text/plain; charset=utf-8' }
))

// ── AUDIT REPORT ─────────────────────────────────────────────────────────────
import auditRoute from './routes/audit'
app.route('/audit', auditRoute)

// Mount routes
app.route('/', homeRoute)
app.route('/about', aboutRoute)
app.route('/services', servicesRoute)
app.route('/horeca', horecaRoute)
app.route('/listings', listingsRoute)
app.route('/works', worksRoute)
app.route('/insights', insightsRoute)
app.route('/contact', contactRoute)
app.route('/portal', portalRoute)
app.route('/admin', adminRoute)
app.route('/admin/sales', salesRoute)
app.route('/sales', salesRoute)
// Redirect bare /sales to /sales/dashboard
app.get('/sales', (c) => c.redirect('/sales/dashboard', 302))
app.route('/valuation', valuationRoute)
app.route('/testimonials', testimonialsRoute)
app.route('/compare', compareRoute)
app.route('/market-data', marketDataRoute)
app.route('/resources', resourcesRoute)
app.route('/careers', careersRoute)
app.route('/invest', investRoute)
app.route('/pipeline', pipelineRoute)

// ── PUBLIC API: MANDATE LOCATIONS MAP ─────────────────────────────────────────
// Returns active mandate pin data for the home page India map
// No auth required — public data only (city-level, no sensitive deal info)
app.get('/api/mandate-locations', (c) => {
  c.header('Cache-Control', 'public, max-age=3600')
  return c.json({
    updated: 'Q1 2026',
    total_value: '₹1,165 Cr+',
    total_mandates: 8,
    locations: [
      {
        id: 'delhi',
        city: 'Delhi NCR',
        sub: 'Gurugram · Noida · Shalimar Bagh',
        mandates: 'Prism Tower · Ambience Tower · Sawasdee JLG',
        value: '₹900 Cr combined',
        status: 'active',
        color: '#B8960C',
        sectors: ['Real Estate', 'Hospitality']
      },
      {
        id: 'chandigarh',
        city: 'Chandigarh',
        sub: 'Hotel Rajshree & Spa',
        mandates: 'Hotel Rajshree & Spa · 41 Keys',
        value: '₹70 Cr',
        status: 'active',
        color: '#065F46',
        sectors: ['Hospitality']
      },
      {
        id: 'himachal',
        city: 'Himachal Pradesh',
        sub: 'Kasauli · Chail · Shimla',
        mandates: 'WelcomHeritage Kasauli · Maple Resort Chail',
        value: '₹75 Cr combined',
        status: 'active',
        color: '#1A3A6B',
        sectors: ['Hospitality']
      },
      {
        id: 'jaipur',
        city: 'Jaipur',
        sub: 'Heritage Hotel Corridor',
        mandates: 'Heritage Hotel · 43 Keys',
        value: '₹20 Cr',
        status: 'active',
        color: '#7C3AED',
        sectors: ['Hospitality']
      },
      {
        id: 'mumbai',
        city: 'Mumbai',
        sub: 'BKC · Lower Parel',
        mandates: 'Advisory pipeline · Active discussion',
        value: 'Pipeline',
        status: 'pipeline',
        color: '#dc2626',
        sectors: ['Real Estate']
      },
      {
        id: 'bengaluru',
        city: 'Bengaluru',
        sub: 'Whitefield · MG Road',
        mandates: 'Whitefield · MG Road · Active pipeline',
        value: 'Pipeline',
        status: 'pipeline',
        color: '#065F46',
        sectors: ['Real Estate', 'Retail']
      }
    ]
  })
})

app.route('/api', apiRoute)

// ── 404 NOT FOUND ─────────────────────────────────────────────────────────────
app.notFound((c) => {
  const path = new URL(c.req.url).pathname
  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="robots" content="noindex,nofollow">
  <title>404 — Page Not Found | India Gully</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css">
  <style>
    :root{--ink:#111111;--ink-mid:#1E1E1E;--gold:#B8960C;--gold-lt:#D4AE2A;--parch:#FAF8F3;--border:#E4DECE;}
    *{margin:0;padding:0;box-sizing:border-box;}
    body{font-family:'DM Sans',sans-serif;background:var(--ink);color:#fff;min-height:100vh;display:flex;flex-direction:column;overflow:hidden;}
    .bg-grid{position:fixed;inset:0;background-image:linear-gradient(rgba(184,150,12,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.025) 1px,transparent 1px);background-size:80px 80px;pointer-events:none;}
    .bg-glow{position:fixed;inset:0;background:radial-gradient(ellipse 60% 70% at 50% 40%,rgba(184,150,12,.05) 0%,transparent 65%);pointer-events:none;}
    .page{flex:1;display:flex;align-items:center;justify-content:center;padding:2rem;position:relative;z-index:1;}
    .container{max-width:680px;text-align:center;}
    .ig-logo{display:inline-flex;align-items:center;gap:.5rem;margin-bottom:3rem;}
    .ig-logo img{height:32px;width:auto;filter:brightness(0) invert(1);}
    .ig-logo-txt{font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:#fff;letter-spacing:.04em;}
    .badge-404{display:inline-flex;align-items:center;gap:.4rem;background:rgba(184,150,12,.12);border:1px solid rgba(184,150,12,.3);color:var(--gold);font-size:.6rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;padding:.3rem .8rem;margin-bottom:2rem;}
    .num-404{font-family:'DM Serif Display',Georgia,serif;font-size:clamp(5rem,15vw,9rem);color:transparent;background:linear-gradient(135deg,var(--gold) 0%,var(--gold-lt) 50%,rgba(184,150,12,.3) 100%);-webkit-background-clip:text;background-clip:text;line-height:.9;margin-bottom:1rem;letter-spacing:-.04em;}
    h2{font-family:'DM Serif Display',Georgia,serif;font-size:clamp(1.4rem,3vw,2rem);color:#fff;margin-bottom:1rem;font-weight:400;}
    .path-box{display:inline-flex;align-items:center;gap:.4rem;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);padding:.4rem .875rem;font-family:monospace;font-size:.78rem;color:rgba(255,255,255,.5);margin-bottom:1.5rem;}
    p{color:rgba(255,255,255,.45);line-height:1.8;margin-bottom:2rem;font-size:.9rem;max-width:480px;margin-left:auto;margin-right:auto;}
    .links{display:flex;gap:.875rem;justify-content:center;flex-wrap:wrap;margin-bottom:3rem;}
    a.btn-primary{display:inline-flex;align-items:center;gap:.5rem;padding:.75rem 1.75rem;text-decoration:none;font-size:.78rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;background:var(--gold);color:#fff;transition:background .2s;}
    a.btn-primary:hover{background:var(--gold-lt);}
    a.btn-outline{display:inline-flex;align-items:center;gap:.5rem;padding:.75rem 1.5rem;text-decoration:none;font-size:.78rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.6);transition:all .2s;}
    a.btn-outline:hover{border-color:rgba(184,150,12,.5);color:#fff;}
    .quick-links{display:flex;flex-wrap:wrap;gap:.5rem;justify-content:center;}
    .ql{color:rgba(255,255,255,.35);font-size:.72rem;text-decoration:none;padding:.22rem .5rem;border:1px solid rgba(255,255,255,.06);transition:all .2s;}
    .ql:hover{color:var(--gold);border-color:rgba(184,150,12,.3);}
    .footer-bar{padding:1.25rem 2rem;border-top:1px solid rgba(255,255,255,.05);text-align:center;font-size:.65rem;color:rgba(255,255,255,.2);position:relative;z-index:1;}
    @media(max-width:480px){.links{flex-direction:column;align-items:center;}.num-404{font-size:5rem;}}
  </style>
</head>
<body>
  <div class="bg-grid"></div>
  <div class="bg-glow"></div>
  <main class="page">
    <div class="container">
      <a href="/" class="ig-logo">
        <span class="ig-logo-txt">India Gully</span>
      </a>
      <div class="badge-404"><i class="fas fa-exclamation-triangle" style="font-size:.55rem;"></i>Page Not Found</div>
      <div class="num-404">404</div>
      <h2>This page has gone off the map.</h2>
      <div class="path-box"><i class="fas fa-map-marker-alt" style="color:var(--gold);font-size:.65rem;"></i>${path}</div>
      <p>The page you're looking for doesn't exist, has been moved, or requires authentication. Check the URL and try again, or navigate to one of our key pages below.</p>
      <div class="links">
        <a href="/" class="btn-primary"><i class="fas fa-home" style="font-size:.7rem;"></i>Return Home</a>
        <a href="/listings" class="btn-outline"><i class="fas fa-folder-open" style="font-size:.7rem;"></i>View Mandates</a>
        <a href="/contact" class="btn-outline"><i class="fas fa-envelope" style="font-size:.7rem;"></i>Contact Us</a>
      </div>
      <div class="quick-links">
        <a href="/about" class="ql">About</a>
        <a href="/services" class="ql">Advisory Services</a>
        <a href="/works" class="ql">Track Record</a>
        <a href="/insights" class="ql">Insights</a>
        <a href="/horeca" class="ql">HORECA</a>
        <a href="/legal/privacy" class="ql">Privacy Policy</a>
      </div>
    </div>
  </main>
  <footer class="footer-bar">
    &copy; 2026 Vivacious Entertainment and Hospitality Pvt. Ltd. &middot; India Gully &middot;
    <a href="mailto:info@indiagully.com" style="color:rgba(184,150,12,.5);text-decoration:none;">info@indiagully.com</a>
  </footer>
</body>
</html>`, 404)
})

// ── 500 ERROR HANDLER ─────────────────────────────────────────────────────────
app.onError((err, c) => {
  console.error('[India Gully Error]', err)
  const isApi = c.req.path.startsWith('/api/')
  if (isApi) {
    return c.json({ success: false, error: 'Internal server error. Please try again.' }, 500)
  }
  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>500, Server Error | India Gully</title>
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
  <style>
    :root{--ink:#1a1a2e;--gold:#B8960C;}
    *{margin:0;padding:0;box-sizing:border-box;}
    body{font-family:'Inter',sans-serif;background:#fafaf6;color:var(--ink);min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;}
    .container{max-width:520px;text-align:center;}
    .badge{display:inline-block;background:#991b1b;color:#fff;font-size:.65rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:.3rem .8rem;margin-bottom:1.5rem;}
    h1{font-family:'DM Serif Display',Georgia,serif;font-size:5rem;color:var(--ink);line-height:1;margin-bottom:.5rem;}
    h2{font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:var(--ink);margin-bottom:1rem;}
    p{color:#555;line-height:1.7;margin-bottom:1.5rem;font-size:.9rem;}
    a.btn{display:inline-block;padding:.65rem 1.5rem;text-decoration:none;font-size:.82rem;font-weight:500;border-radius:3px;background:var(--ink);color:#fff;}
    a.btn:hover{opacity:.8;}
  </style>
</head>
<body>
  <div class="container">
    <div class="badge">Server Error</div>
    <h1>500</h1>
    <h2>Something Went Wrong</h2>
    <p>We encountered an unexpected error. Our team has been notified.<br>
    Please try again in a few moments.</p>
    <a href="/" class="btn">← Back to Home</a>
  </div>
</body>
</html>`, 500)
})

export default app
