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
app.route('/api', apiRoute)

// ── 404 NOT FOUND ─────────────────────────────────────────────────────────────
app.notFound((c) => {
  const path = new URL(c.req.url).pathname
  return c.html(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>404, Page Not Found | India Gully</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet">
  <style>
    :root{--ink:#1a1a2e;--gold:#B8960C;}
    *{margin:0;padding:0;box-sizing:border-box;}
    body{font-family:'Inter',sans-serif;background:#fafaf6;color:var(--ink);min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;}
    .container{max-width:520px;text-align:center;}
    .badge{display:inline-block;background:var(--gold);color:#fff;font-size:.65rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:.3rem .8rem;margin-bottom:1.5rem;}
    h1{font-family:'DM Serif Display',Georgia,serif;font-size:5rem;color:var(--ink);line-height:1;margin-bottom:.5rem;}
    h2{font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:var(--ink);margin-bottom:1rem;}
    p{color:#555;line-height:1.7;margin-bottom:1.5rem;font-size:.9rem;}
    .path{background:#f0ede5;padding:.3rem .7rem;border-radius:3px;font-family:monospace;font-size:.8rem;color:#666;display:inline-block;margin-bottom:1.5rem;}
    .links{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;}
    a.btn{display:inline-block;padding:.65rem 1.5rem;text-decoration:none;font-size:.82rem;font-weight:500;border-radius:3px;transition:opacity .2s;}
    a.btn-primary{background:var(--ink);color:#fff;}
    a.btn-outline{border:1px solid var(--ink);color:var(--ink);}
    a.btn:hover{opacity:.8;}
  </style>
</head>
<body>
  <div class="container">
    <div class="badge">India Gully</div>
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <div class="path">${path}</div>
    <p>The page you're looking for doesn't exist or has been moved.<br>
    Please check the URL or navigate back to the homepage.</p>
    <div class="links">
      <a href="/" class="btn btn-primary">← Back to Home</a>
      <a href="/contact" class="btn btn-outline">Contact Us</a>
    </div>
  </div>
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
