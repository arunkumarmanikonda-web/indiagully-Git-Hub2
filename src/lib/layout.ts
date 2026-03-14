// India Gully — Master Layout
// Minimalistic · Clean · Institutional · DM Sans + DM Serif Display

export function layout(title: string, content: string, opts?: {
  description?: string
  ogImage?: string
  bodyClass?: string
  noNav?: boolean
  noFooter?: boolean
  cspNonce?: string       // kept for API compatibility; CSP now uses unsafe-inline + CDN allowlist
  jsonLd?: string | object  // optional JSON-LD structured data blob (string or object)
  canonical?: string      // optional canonical URL override
  heroPreload?: string    // optional above-fold image URL to preload with high priority
}) {
  const desc = opts?.description || "India Gully — Celebrating Desiness. India's premier multi-vertical advisory firm across Real Estate, Retail, Hospitality, Entertainment, Debt & HORECA Solutions."
  const ogImg = opts?.ogImage || 'https://india-gully.pages.dev/static/og.jpg'

  return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<!-- CSP set via response header (unsafe-inline + CDN allowlist — strict-dynamic removed) -->
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">
<meta name="description" content="${desc}">
<meta name="author" content="India Gully — Vivacious Entertainment and Hospitality Pvt. Ltd.">
<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">
<meta property="og:title" content="${title} — India Gully">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${ogImg}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="India Gully — Celebrating Desiness">
<meta property="og:type" content="website">
<meta property="og:site_name" content="India Gully">
<meta property="og:locale" content="en_IN">
${opts?.canonical ? `<meta property="og:url" content="${opts.canonical}">` : ''}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@IndiaGully">
<meta name="twitter:creator" content="@IndiaGully">
<meta name="twitter:title" content="${title} — India Gully">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${ogImg}">
<title>${title} — India Gully</title>
${opts?.canonical ? `<link rel="canonical" href="${opts.canonical}">` : ''}
<!-- FAVICON: hologram asset — locked, no AI, no optimisation, lossless only -->
${opts?.jsonLd ? `<script type="application/ld+json">${typeof opts.jsonLd === 'string' ? opts.jsonLd : JSON.stringify(opts.jsonLd)}</script>` : ''}
<link rel="icon" type="image/x-icon" href="/assets/favicon.ico">
<link rel="icon" type="image/png" sizes="64x64" href="/assets/favicon-64.png">
<link rel="icon" type="image/png" sizes="48x48" href="/assets/favicon-48.png">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://cdn.jsdelivr.net">
<link rel="preconnect" href="https://www.mapleresorts.in">
<link rel="dns-prefetch" href="https://hotelrajshreechandigarh.com">
<link rel="dns-prefetch" href="https://www.welcomheritagehotels.in">
${opts?.heroPreload ? `<link rel="preload" as="image" href="${opts.heroPreload}" fetchpriority="high">` : ''}
<!-- Non-blocking Google Fonts — media=print swap trick avoids render-blocking -->
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap">
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
<noscript><link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet"></noscript>
<!-- Non-blocking FontAwesome — defer icon font until after first paint -->
<link rel="preload" as="style" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css"></noscript>
<!-- Tailwind CDN \u2014 defer so it does not block first paint; config script waits for load event -->
<script>
/* Tailwind config declared before CDN loads — tw CDN reads this on init */
window.tailwind = window.tailwind || {};
tailwind.config = {
  theme: {
    extend: {
      colors: {
        gold:{ DEFAULT:'#B8960C', light:'#D4AE2A', dark:'#8A6E08', pale:'#FAF6E8', muted:'#F0E8C8' },
        ink: { DEFAULT:'#111111', mid:'#1E1E1E', soft:'#444444', muted:'#6B6B6B', faint:'#A0A0A0' },
        parchment:{ DEFAULT:'#FAF8F3', dark:'#F2EDE3', border:'#E4DECE' }
      },
      fontFamily: {
        sans:  ['"DM Sans"','system-ui','sans-serif'],
        serif: ['"DM Serif Display"','Georgia','serif'],
      }
    }
  }
}
</script>
<!-- Load Tailwind CDN async — runs after config object is set above -->
<script src="https://cdn.tailwindcss.com" defer></script>
<!-- DARK MODE: early init — defaults to LIGHT; only switches to dark if user explicitly enabled it -->
<script>
(function(){
  try{
    var s=localStorage.getItem('ig_dark_mode');
    // Default is LIGHT — only switch to dark if user explicitly set it to '1'
    if(s==='1') document.documentElement.setAttribute('data-theme','dark');
    else document.documentElement.setAttribute('data-theme','light');
  }catch(e){ document.documentElement.setAttribute('data-theme','light'); }
})();
</script>
<style>
/* ══════════════════════════════════════════════════════════════════════════
   INDIA GULLY — WORLD-CLASS DESIGN SYSTEM v12
   Ultra-Premium · Cinematic · Editorial · Institutional
   Typography: DM Serif Display (display/headlines) + DM Sans (body/UI)
   Color: Deep Obsidian · Warm 24K Gold · Ivory Parchment
   Inspired by: WSJ, Financial Times, Architectural Digest, Condé Nast
══════════════════════════════════════════════════════════════════════════ */

/* ── DARK MODE VARIABLES ───────────────────────────────────────────────── */
/* Use html[data-theme="dark"] (specificity 0-1-1) to beat :root (0-1-0) so
   dark-mode custom properties actually override the light-mode :root values */
html[data-theme="dark"]{
  --gold:#D4AE2A;--gold-pale:rgba(212,174,42,.08);
  --ink:#f1f5f9;--ink-muted:#94a3b8;--ink-soft:#cbd5e1;--ink-faint:#475569;
  --parch:#0a0a0f;--parch-dk:#111118;--border:rgba(255,255,255,.07);--border-lt:rgba(255,255,255,.07);
  --surface:#141420;--surface-2:#1a1a28;
  --bg:#07070f;--bg-2:#0d0d1c;--bg-3:#111120;
  --bg-dk:#07070f;--bg-dk2:#0d0d1c;--bg-dk3:#111120;
}
[data-theme="dark"] body{background:#0a0a0f;color:#f1f5f9;}
[data-theme="dark"] .sec-wh,[data-theme="dark"] .card{background:#141420!important;}
[data-theme="dark"] .mandate-card [style*="background:#fff"],[data-theme="dark"] .insight-card [style*="background:#fff"]{background:#141420!important;color:#f1f5f9!important;}
[data-theme="dark"] [style*="background:#fff"]:not(.hero-dk *):not(nav *):not(footer *){background:#141420!important;}
[data-theme="dark"] .sec-pc,[data-theme="dark"] .sec-pd{background:#0e0e1a!important;}
/* sec-dk must stay dark in dark-mode (--ink flips to light) */
[data-theme="dark"] .sec-dk{background:#0a0a0f!important;}
[data-theme="dark"] .sec-dk .diff-grid{background:rgba(255,255,255,.08)!important;border-color:rgba(255,255,255,.1)!important;}
[data-theme="dark"] .diff-cell{background:rgba(255,255,255,.07)!important;}
[data-theme="dark"] .diff-cell:hover{background:rgba(255,255,255,.12)!important;}
[data-theme="dark"] .am,[data-theme="dark"] .ig-tbl thead tr{background:#1a1a28!important;}
[data-theme="dark"] table.ig-tbl tbody tr{background:#141420;}
[data-theme="dark"] table.ig-tbl tbody tr:hover{background:#1a1a28;}
[data-theme="dark"] .ig-input,.ig-inp{background:#1a1a28;color:#f1f5f9;border-color:rgba(255,255,255,.1);}
[data-theme="dark"] .ig-panel{background:#1a1a28;border-color:rgba(255,255,255,.07);}
[data-theme="dark"] .why-card,[data-theme="dark"] .vg-cell{background:#22223a!important;border-color:rgba(255,255,255,.13)!important;}
[data-theme="dark"] .mandate-card,[data-theme="dark"] .insight-card{background:#141420!important;border-color:rgba(255,255,255,.06)!important;}
[data-theme="dark"] .home-stat-cell,[data-theme="dark"] .ig-metric-box{background:#141420!important;border-color:rgba(255,255,255,.06)!important;}
[data-theme="dark"] .feature-card{background:#141420!important;border-color:rgba(255,255,255,.06)!important;}
[data-theme="dark"] .service-item{background:#141420!important;}
[data-theme="dark"] .ticker{background:rgba(184,150,12,.85)!important;}
/* Dark mode: leader-card & partner-card backgrounds */
[data-theme="dark"] .leader-card,[data-theme="dark"] .partner-card{background:#141420!important;border-color:rgba(255,255,255,.06)!important;}
[data-theme="dark"] .leader-card [style*="background:var(--parch)"],[data-theme="dark"] .partner-card [style*="background:var(--parch)"]{background:#1a1a28!important;}
/* Dark mode: brand cell */
[data-theme="dark"] .brand-cell{background:#141420!important;}
[data-theme="dark"] .brand-cell img{filter:grayscale(1) opacity(.4)!important;}
[data-theme="dark"] .brand-cell img:hover{filter:grayscale(.3) opacity(.9)!important;}
/* Dark mode: horeca cat cell */
[data-theme="dark"] .horeca-cat-cell{background:#141420!important;}
/* Dark mode: ig-prop-cell */
[data-theme="dark"] .ig-prop-cell{background:#141420!important;color:rgba(255,255,255,.45)!important;}
/* Dark mode: works-card, contact-info-card */
[data-theme="dark"] .works-card,[data-theme="dark"] .contact-info-card{background:#141420!important;border-color:rgba(255,255,255,.06)!important;}
/* Dark mode: partner-marquee-section & trust-signals */
[data-theme="dark"] .partner-marquee-section{background:#0a0a12!important;border-color:rgba(255,255,255,.06)!important;}
[data-theme="dark"] .partner-marquee-label{color:rgba(255,255,255,.35)!important;}
[data-theme="dark"] .trust-signals-section{background:#0a0a12!important;border-color:rgba(255,255,255,.06)!important;}
/* Dark mode: map section */
[data-theme="dark"] .map-presence-section{background:#080810!important;border-color:rgba(255,255,255,.06)!important;}
[data-theme="dark"] .map-city-card{background:#141420!important;border-color:rgba(255,255,255,.07)!important;}
[data-theme="dark"] .map-city-card:hover{border-color:rgba(184,150,12,.3)!important;}
[data-theme="dark"] .map-city-name{color:rgba(255,255,255,.9)!important;}
[data-theme="dark"] .map-city-sub{color:rgba(255,255,255,.4)!important;}
[data-theme="dark"] .india-map-box{background:linear-gradient(135deg,#0d0d1e 0%,#141428 100%)!important;border-color:rgba(255,255,255,.08)!important;}
[data-theme="dark"] .india-map-wrap svg .india-land{fill:#1e1e35!important;stroke:rgba(184,150,12,.35)!important;}
[data-theme="dark"] .india-map-wrap svg path[style*="fill:#e8ddc8"]{fill:#1e1e35!important;stroke:rgba(184,150,12,.3)!important;}
[data-theme="dark"] .india-map-wrap svg path[style*="fill:#ddd5be"]{fill:#181830!important;stroke:rgba(184,150,12,.25)!important;}
[data-theme="dark"] .india-map-wrap svg ellipse[style*="fill:#ddd5be"],[data-theme="dark"] .india-map-wrap svg ellipse[style*="fill:#e8ddc8"]{fill:#181830!important;stroke:rgba(184,150,12,.25)!important;}
[data-theme="dark"] .india-map-wrap svg .map-island-label{fill:rgba(255,255,255,.4)!important;}
[data-theme="dark"] .india-map-caption{color:rgba(255,255,255,.3)!important;}
[data-theme="dark"] .india-map-wrap svg text{fill:rgba(255,255,255,.75)!important;}
[data-theme="dark"] .india-map-wrap svg .map-legend-bg{fill:rgba(184,150,12,.06)!important;stroke:rgba(184,150,12,.2)!important;}
[data-theme="dark"] .india-map-wrap svg .map-legend-text{fill:rgba(255,255,255,.5)!important;}
[data-theme="dark"] .india-map-wrap svg .map-pin-label{fill:rgba(255,255,255,.88)!important;}
[data-theme="dark"] .india-map-wrap svg .map-pin-sub{fill:rgba(255,255,255,.5)!important;}
/* Dark mode: why-cards section text */
[data-theme="dark"] .why-card{background:#22223a!important;border-color:rgba(255,255,255,.13)!important;box-shadow:0 2px 20px rgba(0,0,0,.4)!important;}
[data-theme="dark"] .why-card h3{color:#f1f5f9!important;}
[data-theme="dark"] .why-card p{color:rgba(255,255,255,.65)!important;}
[data-theme="dark"] .why-card .why-icon{background:rgba(255,255,255,.06)!important;border-color:rgba(255,255,255,.1)!important;}
/* Dark mode: sec-wh inline-bg overrides */
[data-theme="dark"] [style*="background:var(--parch)"]{background:var(--parch)!important;}
[data-theme="dark"] [style*="background:var(--parch-dk)"]{background:var(--parch-dk)!important;}
/* Dark mode: city list cards with background:#fff */
[data-theme="dark"] .city-pin-card{background:#141420!important;border-color:rgba(255,255,255,.07)!important;}
/* Dark mode: hb-card (hotel brand cards) */
[data-theme="dark"] .hb-card{border-color:rgba(255,255,255,.07)!important;background:#141420!important;}
[data-theme="dark"] .hb-card img{filter:brightness(.85) contrast(1.1);}
/* Dark mode: rb-card (retail brand cards) */
[data-theme="dark"] .rb-card{border-color:rgba(255,255,255,.07)!important;background:#141420!important;}
/* Dark mode: insight mini-card on home page */
[data-theme="dark"] .home-insight-card{background:#141420!important;border-color:rgba(255,255,255,.06)!important;}
[data-theme="dark"] .home-insight-card h3{color:rgba(255,255,255,.88)!important;}
[data-theme="dark"] .home-insight-card p{color:rgba(255,255,255,.45)!important;}
/* Dark mode: stat cells inline */
[data-theme="dark"] .home-stat-cell{background:#141420!important;border-color:rgba(255,255,255,.06)!important;}
/* Dark mode: filter buttons (inline bg) */
[data-theme="dark"] [data-hbcat],[data-theme="dark"] [data-rbcat]{background:transparent!important;border-color:rgba(255,255,255,.12)!important;color:rgba(255,255,255,.5)!important;}

/* ── FOCUS VISIBLE (ARIA) ──────────────────────────────────────────────── */
:focus-visible{outline:2px solid var(--gold);outline-offset:2px;}
a:focus-visible,button:focus-visible{outline:2px solid var(--gold);outline-offset:3px;}

/* ── MODAL OVERLAY ──────────────────────────────── */
.ig-modal{display:none;position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,.7);backdrop-filter:blur(12px);align-items:center;justify-content:center;padding:1rem;}
.ig-modal-box{background:#fff;width:100%;max-width:600px;max-height:90vh;overflow-y:auto;position:relative;box-shadow:0 40px 120px rgba(0,0,0,.5);}
.ig-modal-box.wide{max-width:860px;}
.ig-modal-hd{padding:1.25rem 1.5rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;}
.ig-modal-bd{padding:1.5rem;}
.ig-modal-ft{padding:1rem 1.5rem;border-top:1px solid var(--border);display:flex;gap:.75rem;justify-content:flex-end;}
.ig-modal-close{background:none;border:none;cursor:pointer;color:var(--ink-muted);font-size:1rem;padding:.25rem;line-height:1;}
.ig-modal-close:hover{color:var(--ink);}

/* SLIDE PANEL */
.ig-panel{display:none;background:var(--parch-dk);border:1px solid var(--border);padding:1.5rem;margin-top:1rem;}

/* ── RESET ──────────────────────────────────── */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  /* 24K Gold palette */
  --gold:#B8960C;--gold-lt:#D4AE2A;--gold-dk:#8A6E08;--gold-vlt:#E8C94A;
  --gold-pale:#FAF6E8;--gold-muted:#F0E8C8;
  --gold-glow:rgba(184,150,12,.35);--gold-line:rgba(184,150,12,.22);
  /* Obsidian ink palette */
  --ink:#0A0A0A;--ink-mid:#141414;--ink-soft:#3A3A3A;--ink-muted:#6B6B6B;--ink-faint:#A8A8A8;
  /* General page background — light parchment (mirrors --parch) */
  --bg:#FAFAF6;--bg-2:#F4EFE6;--bg-3:#EEEAE0;
  /* Dark section background — used by calculator, compare, market-data etc. */
  --bg-dk:#0c0c18;--bg-dk2:#111120;--bg-dk3:#16162a;
  /* Ivory parchment palette */
  --parch:#FAFAF6;--parch-dk:#F4EFE6;--border:#E6E0D4;--border-lt:#EDE8DF;
  --surface:#FFFFFF;--surface-2:#F8F5F0;
  /* Elevation */
  --nav-h:76px;
  --shadow-xs:0 1px 3px rgba(0,0,0,.04);
  --shadow-sm:0 2px 8px rgba(0,0,0,.06);
  --shadow-md:0 8px 32px rgba(0,0,0,.09);
  --shadow-lg:0 20px 60px rgba(0,0,0,.13);
  --shadow-xl:0 40px 100px rgba(0,0,0,.18);
  --shadow-gold:0 8px 32px rgba(184,150,12,.22);
  --shadow-gold-lg:0 20px 60px rgba(184,150,12,.18);
  /* Transitions */
  --t-fast:.18s cubic-bezier(.4,0,.2,1);
  --t-med:.28s cubic-bezier(.4,0,.2,1);
  --t-slow:.45s cubic-bezier(.4,0,.2,1);
  --t-cinema:.75s cubic-bezier(.77,0,.175,1);
}
html{scroll-behavior:smooth}
body{font-family:"DM Sans",system-ui,sans-serif;background:var(--parch);color:var(--ink);font-size:16px;line-height:1.7;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;overflow-x:hidden}
img{max-width:100%;display:block}
a{color:inherit;text-decoration:none}
button{font-family:inherit;}

/* ── SELECTION ─────────────────────────────── */
::selection{background:rgba(184,150,12,.15);color:var(--ink)}

/* ── TYPOGRAPHY ─────────────────────────────── */
.f-serif{font-family:"DM Serif Display",Georgia,serif}
/* Eyebrow — refined editorial label */
.eyebrow{
  font-size:.62rem;font-weight:700;letter-spacing:.3em;text-transform:uppercase;
  color:var(--gold);display:inline-flex;align-items:center;gap:.7rem;
}
.eyebrow::before{
  content:'';display:inline-block;width:28px;height:1px;background:linear-gradient(90deg,var(--gold),var(--gold-lt));flex-shrink:0;
}
.eyebrow-lt{
  font-size:.62rem;font-weight:700;letter-spacing:.3em;text-transform:uppercase;
  color:rgba(184,150,12,.75);display:inline-flex;align-items:center;gap:.7rem;
}
.eyebrow-lt::before{content:'';display:inline-block;width:28px;height:1px;background:linear-gradient(90deg,rgba(184,150,12,.5),rgba(184,150,12,.2));flex-shrink:0;}
.eyebrow-plain{font-size:.62rem;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);}
/* Display headings */
.h1{
  font-family:"DM Serif Display",Georgia,serif;
  font-size:clamp(3.2rem,7vw,6.5rem);line-height:1.02;
  color:#fff;letter-spacing:-.025em;font-weight:400;
}
.h2{
  font-family:"DM Serif Display",Georgia,serif;
  font-size:clamp(2.4rem,4.8vw,4rem);line-height:1.06;
  color:var(--ink);letter-spacing:-.02em;font-weight:400;
}
.h2-lt{
  font-family:"DM Serif Display",Georgia,serif;
  font-size:clamp(2.4rem,4.8vw,4rem);line-height:1.06;
  color:#fff;letter-spacing:-.02em;font-weight:400;
}
.h3{font-family:"DM Serif Display",Georgia,serif;font-size:clamp(1.5rem,2.4vw,2.2rem);line-height:1.18;color:var(--ink);font-weight:400;}
.h3-lt{font-family:"DM Serif Display",Georgia,serif;font-size:clamp(1.5rem,2.4vw,2.2rem);line-height:1.18;color:#fff;font-weight:400;}
.h4{font-family:"DM Serif Display",Georgia,serif;font-size:clamp(1.15rem,1.6vw,1.5rem);line-height:1.25;color:var(--ink);font-weight:400;}
/* Body text */
.lead{font-size:1.125rem;line-height:1.9;color:var(--ink-soft);font-weight:400;}
.lead-lt{font-size:1.125rem;line-height:1.9;color:rgba(255,255,255,.68);font-weight:400;}
.body{font-size:.9375rem;line-height:1.85;color:var(--ink-soft);}
.body-lt{font-size:.9375rem;line-height:1.85;color:rgba(255,255,255,.6);}
.body-sm{font-size:.825rem;line-height:1.75;color:var(--ink-soft);}
.caption{font-size:.72rem;letter-spacing:.09em;color:var(--ink-muted);}
.caption-lt{font-size:.72rem;letter-spacing:.09em;color:rgba(255,255,255,.45);}
/* Large display numbers */
.stat-n{font-family:"DM Serif Display",serif;font-size:3.25rem;line-height:.95;color:var(--gold);letter-spacing:-.03em;}
.stat-n-sm{font-family:"DM Serif Display",serif;font-size:2.25rem;line-height:1;color:var(--gold);letter-spacing:-.02em;}
.stat-n-lg{font-family:"DM Serif Display",serif;font-size:4.5rem;line-height:.9;color:var(--gold);letter-spacing:-.04em;}
.overline{font-size:.6rem;font-weight:700;letter-spacing:.26em;text-transform:uppercase;color:var(--ink-muted);}
/* Article body typography */
.article-body h2{font-family:"DM Serif Display",Georgia,serif;font-size:1.75rem;color:var(--ink);margin:2.5rem 0 1rem;line-height:1.2;font-weight:400;}
.article-body h3{font-family:"DM Serif Display",Georgia,serif;font-size:1.35rem;color:var(--ink);margin:2rem 0 .875rem;line-height:1.25;font-weight:400;}
.article-body p{font-size:.9625rem;line-height:1.9;color:var(--ink-soft);margin-bottom:1.35rem;}
.article-body ul,.article-body ol{padding-left:1.5rem;margin-bottom:1.35rem;}
.article-body li{font-size:.9375rem;line-height:1.85;color:var(--ink-soft);margin-bottom:.5rem;}
.article-body strong{color:var(--ink);font-weight:600;}
.article-body blockquote{border-left:3px solid var(--gold);padding:1rem 1.5rem;background:var(--parch);margin:2rem 0;font-family:"DM Serif Display",Georgia,serif;font-size:1.1rem;font-style:italic;color:var(--ink);line-height:1.7;}

/* ── GOLD ORNAMENTS ─────────────────────────── */
.gr{width:40px;height:2px;background:linear-gradient(90deg,var(--gold),var(--gold-lt),transparent);margin-bottom:1.25rem;border-radius:1px;}
.gr-c{width:40px;height:2px;background:linear-gradient(90deg,var(--gold),var(--gold-lt),transparent);margin:0 auto 1.25rem;border-radius:1px;}
.gr-lt{width:40px;height:2px;background:linear-gradient(90deg,rgba(184,150,12,.6),rgba(184,150,12,.2));margin-bottom:1.25rem;border-radius:1px;}
.gold-rule{width:100%;height:1px;background:linear-gradient(90deg,transparent,var(--gold-lt),transparent);opacity:.25;margin:2.5rem 0;}
.gold-dot{width:5px;height:5px;border-radius:50%;background:var(--gold);display:inline-block;}
/* Premium gold line divider */
.gold-divider{width:100%;height:1px;background:linear-gradient(90deg,transparent 0%,var(--gold-line) 20%,var(--gold-line) 80%,transparent 100%);margin:0;}
/* Gold vertical accent */
.gold-accent-v{width:3px;background:linear-gradient(180deg,var(--gold),var(--gold-lt),transparent);border-radius:2px;}

/* ── LAYOUT ─────────────────────────────────── */
.wrap{max-width:1360px;margin:0 auto;padding:0 2.5rem}
.wrap-md{max-width:1100px;margin:0 auto;padding:0 2.5rem}
.wrap-sm{max-width:960px;margin:0 auto;padding:0 2rem}
.wrap-xs{max-width:720px;margin:0 auto;padding:0 2rem}
.sec{padding:7rem 0}
.sec-sm{padding:5rem 0}
.sec-dk{background:var(--ink);padding:7rem 0;position:relative}
.sec-md{background:var(--ink-mid);padding:7rem 0;position:relative}
.sec-wh{background:#fff;padding:7rem 0}
.sec-pc{background:var(--parch);padding:7rem 0}
.sec-pd{background:var(--parch-dk);padding:7rem 0}

/* ── LUXURY BUTTONS ──────────────────────────── */
.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:.55rem;
  padding:.82rem 2.1rem;font-size:.72rem;font-weight:700;
  letter-spacing:.14em;text-transform:uppercase;
  transition:all var(--t-med);
  cursor:pointer;border:1.5px solid transparent;
  white-space:nowrap;position:relative;overflow:hidden;
  font-family:"DM Sans",sans-serif;
}
.btn::before{
  content:'';position:absolute;inset:0;
  background:linear-gradient(135deg,rgba(255,255,255,.1) 0%,transparent 50%);
  opacity:0;transition:opacity .22s;pointer-events:none;
}
.btn:hover::before{opacity:1;}
/* Shimmer sweep on hover */
.btn::after{
  content:'';position:absolute;top:0;left:-100%;width:60%;height:100%;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);
  transition:left .55s cubic-bezier(.4,0,.2,1);pointer-events:none;
  transform:skewX(-20deg);
}
.btn:hover::after{left:140%;}
.btn-g{
  background:linear-gradient(135deg,var(--gold-dk) 0%,var(--gold) 50%,var(--gold-lt) 100%);
  background-size:200% auto;
  color:#fff;border-color:var(--gold);
  box-shadow:0 4px 20px rgba(184,150,12,.28),inset 0 1px 0 rgba(255,255,255,.15);
}
.btn-g:hover{
  background-position:right center;
  box-shadow:0 8px 32px rgba(184,150,12,.42),inset 0 1px 0 rgba(255,255,255,.15);
  transform:translateY(-1px);
}
.btn-go{border-color:var(--gold);color:var(--gold);background:transparent;}
.btn-go:hover{background:linear-gradient(135deg,var(--gold),var(--gold-lt));color:#fff;box-shadow:var(--shadow-gold);transform:translateY(-1px);}
.btn-dk{
  background:var(--ink);color:#fff;border-color:var(--ink);
  box-shadow:0 4px 16px rgba(0,0,0,.18);
}
.btn-dk:hover{background:transparent;color:var(--ink);box-shadow:none;}
.btn-dko{border-color:var(--ink);color:var(--ink);background:transparent;}
.btn-dko:hover{background:var(--ink);color:#fff;box-shadow:0 4px 16px rgba(0,0,0,.18);transform:translateY(-1px);}
.btn-ghost{
  border-color:rgba(255,255,255,.25);color:#fff;background:rgba(255,255,255,.04);
  backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
}
.btn-ghost:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.5);transform:translateY(-1px);}
.btn-ghost-g{border-color:rgba(184,150,12,.5);color:var(--gold);background:rgba(184,150,12,.04);}
.btn-ghost-g:hover{background:linear-gradient(135deg,var(--gold),var(--gold-lt));color:#fff;box-shadow:var(--shadow-gold);border-color:var(--gold);transform:translateY(-1px);}
/* Small variant */
.btn-sm{padding:.55rem 1.35rem;font-size:.68rem;letter-spacing:.1em;}

/* ── PREMIUM NAVIGATION ──────────────────────── */
#mainNav{
  height:var(--nav-h);position:fixed;top:0;left:0;right:0;z-index:200;
  transition:background var(--t-slow),box-shadow var(--t-slow),border-color var(--t-slow);
}
#mainNav.nav-solid{
  background:rgba(5,5,5,.97);
  backdrop-filter:blur(28px) saturate(200%);
  -webkit-backdrop-filter:blur(28px) saturate(200%);
  box-shadow:0 1px 0 rgba(255,255,255,.04),0 4px 28px rgba(0,0,0,.35);
  border-bottom:1px solid rgba(184,150,12,.08);
}
#mainNav.nav-clear{background:linear-gradient(180deg,rgba(0,0,0,.55) 0%,rgba(0,0,0,.12) 65%,transparent 100%);}
.nav-sp{height:var(--nav-h)}
.n-lk{
  font-size:.73rem;font-weight:500;letter-spacing:.04em;
  color:rgba(255,255,255,.55);padding:.5rem .75rem;
  transition:color var(--t-fast);position:relative;
}
.n-lk::after{
  content:'';position:absolute;bottom:-1px;left:1rem;right:1rem;
  height:1px;background:linear-gradient(90deg,var(--gold),var(--gold-lt));
  transform:scaleX(0);transform-origin:left;
  transition:transform .3s cubic-bezier(.4,0,.2,1);
}
.n-lk:hover,.n-lk.on{color:#fff;}
.n-lk:hover::after,.n-lk.on::after{transform:scaleX(1);}
.n-drop{
  position:absolute;top:calc(100% + 16px);left:0;min-width:16rem;
  background:rgba(4,4,4,.99);border:1px solid rgba(184,150,12,.12);
  backdrop-filter:blur(32px);-webkit-backdrop-filter:blur(32px);
  opacity:0;visibility:hidden;
  transform:translateY(-10px) scale(.97);
  transition:all .3s cubic-bezier(.4,0,.2,1);z-index:300;
  box-shadow:0 24px 64px rgba(0,0,0,.65),0 0 0 1px rgba(255,255,255,.02);
}
.n-par:hover .n-drop{opacity:1;visibility:visible;transform:translateY(0) scale(1);}
.n-di{
  display:flex;align-items:center;gap:.9rem;padding:.725rem 1.3rem;
  font-size:.76rem;color:rgba(255,255,255,.58);
  transition:color var(--t-fast),background var(--t-fast),padding-left .22s;
  border-left:2px solid transparent;
}
.n-di:hover{color:#fff;background:rgba(255,255,255,.035);border-left-color:var(--gold);padding-left:1.6rem;}
#nav-desktop-links,#nav-desktop-right{display:none}
#mobileBtn{display:flex}
#mobileMenu{display:none}
@media(min-width:1080px){
  #nav-desktop-links{display:flex;align-items:center;gap:.1rem}
  #nav-desktop-right{display:flex;align-items:center;gap:.6rem}
  #mobileBtn{display:none}
  #mobileMenu{display:none!important}
}

/* ── HERO CAROUSEL ──────────────────────────── */
/* Pull carousel up behind the fixed nav so no blank band shows above it */
.car{position:relative;overflow:hidden;height:calc(100vh + var(--nav-h));margin-top:calc(-1 * var(--nav-h));min-height:640px;max-height:1076px}
.car-track{display:flex;height:100%;transition:transform var(--t-cinema)}
.car-slide{flex:0 0 100%;position:relative;overflow:hidden}
.car-bg{position:absolute;inset:0;background-size:cover;background-position:center;transform:scale(1.1);transition:transform 11s cubic-bezier(.4,0,.2,1)}
.car-slide.on .car-bg{transform:scale(1)}
/* Layered cinematic overlays */
.car-ov-main{position:absolute;inset:0;background:linear-gradient(108deg,rgba(3,3,6,.90) 0%,rgba(3,3,6,.58) 48%,rgba(3,3,6,.18) 100%)}
.car-ov-btm{position:absolute;bottom:0;left:0;right:0;height:45%;background:linear-gradient(to top,rgba(3,3,6,.65) 0%,transparent 100%)}
.car-ov-gold{position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 15% 85%,rgba(184,150,12,.06) 0%,transparent 55%)}
.car-body{position:relative;z-index:2;height:100%;display:flex;align-items:center}
/* slide text animation — staggered reveal */
.s-txt{opacity:0;transform:translateY(32px);transition:opacity .85s cubic-bezier(.4,0,.2,1) .25s,transform .85s cubic-bezier(.4,0,.2,1) .25s}
.car-slide.on .s-txt{opacity:1;transform:translateY(0)}
.s-tag{opacity:0;transform:translateX(-16px);transition:opacity .6s ease .1s,transform .6s ease .1s}
.car-slide.on .s-tag{opacity:1;transform:translateX(0)}
.s-cta{opacity:0;transform:translateY(18px);transition:opacity .7s ease .55s,transform .7s ease .55s}
.car-slide.on .s-cta{opacity:1;transform:translateY(0)}
/* dots */
.car-dots{position:absolute;bottom:2.5rem;left:50%;transform:translateX(-50%);display:flex;gap:.5rem;z-index:10;align-items:center}
.c-dot{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,.22);border:none;cursor:pointer;transition:all .35s;padding:0}
.c-dot.on{background:var(--gold);width:28px;border-radius:3px;box-shadow:0 0 10px rgba(184,150,12,.5)}
/* arrows */
.car-arr{position:absolute;top:50%;z-index:10;transform:translateY(-50%);width:50px;height:50px;border:1px solid rgba(255,255,255,.18);background:rgba(0,0,0,.18);backdrop-filter:blur(12px);display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;font-size:.82rem;transition:all .25s}
.car-arr:hover{background:var(--gold);border-color:var(--gold);box-shadow:0 0 20px rgba(184,150,12,.4)}
.car-prev{left:2rem}
.car-next{right:2rem}
/* slide counter */
.car-ct{position:absolute;top:2rem;right:2rem;z-index:10;font-size:.68rem;font-weight:600;letter-spacing:.18em;color:rgba(255,255,255,.35)}
.car-ct b{color:rgba(255,255,255,.85);font-weight:600}
/* progress bar */
.car-pb{position:absolute;bottom:0;left:0;height:2px;background:linear-gradient(90deg,var(--gold),var(--gold-lt));z-index:10;width:0;box-shadow:0 0 8px rgba(184,150,12,.6)}

/* ── TICKER ─────────────────────────────────── */
.ticker{overflow:hidden;background:linear-gradient(90deg,var(--gold-dk),var(--gold),var(--gold-lt),var(--gold),var(--gold-dk));background-size:400% auto;padding:.55rem 0;position:relative;z-index:2;animation:tickerBg 8s ease-in-out infinite}
@keyframes tickerBg{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
.ticker-tr{display:flex;white-space:nowrap;animation:tick 65s linear infinite;will-change:transform}
.ticker-tr:hover{animation-play-state:paused}
@keyframes tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}

/* ── CARDS ──────────────────────────────────── */
.card{background:#fff;border:1px solid var(--border);transition:border-color var(--t-med),box-shadow var(--t-med),transform var(--t-med)}
.card:hover{border-color:var(--gold-line);box-shadow:0 12px 40px rgba(0,0,0,.07)}
.card-lift:hover{transform:translateY(-5px);box-shadow:0 20px 56px rgba(0,0,0,.1)}
/* Premium feature card */
.feature-card{
  background:#fff;border:1px solid var(--border);overflow:hidden;
  transition:border-color var(--t-med),box-shadow var(--t-med),transform var(--t-med);
  position:relative;
}
.feature-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,transparent,var(--gold),transparent);
  opacity:0;transition:opacity var(--t-med);
}
.feature-card:hover{border-color:rgba(184,150,12,.3);box-shadow:0 16px 52px rgba(0,0,0,.09);transform:translateY(-4px);}
.feature-card:hover::before{opacity:1;}
/* Editorial card — used in mandates, insights */
.ed-card{
  background:#fff;border:1px solid var(--border-lt);overflow:hidden;
  transition:all var(--t-med);
}
.ed-card:hover{border-color:rgba(184,150,12,.35);box-shadow:0 20px 60px rgba(0,0,0,.1);transform:translateY(-5px);}
.ed-card:hover .ed-card-img img{transform:scale(1.05);}
.ed-card-img{overflow:hidden;position:relative;}
.ed-card-img img{transition:transform 6s cubic-bezier(.4,0,.2,1);}

/* ── VERTICAL GRID ──────────────────────────── */
.vg{display:grid;grid-template-columns:repeat(3,1fr);border:1px solid var(--border)}
@media(max-width:860px){.vg{grid-template-columns:repeat(2,1fr)}}
@media(max-width:540px){.vg{grid-template-columns:1fr}}
.vg-cell{
  padding:3rem 2.5rem;background:#fff;border-right:1px solid var(--border);border-bottom:1px solid var(--border);
  transition:background var(--t-med),border-color var(--t-med);cursor:pointer;
  position:relative;overflow:hidden;
}
.vg-cell::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(184,150,12,.04) 0%,transparent 60%);opacity:0;transition:opacity var(--t-med);}
.vg-cell:nth-child(3n){border-right:none}
.vg-cell:hover{background:rgba(250,246,232,.7);border-color:var(--gold-line)}
.vg-cell:hover::after{opacity:1;}
.vg-cell:hover .vg-arr{opacity:1;transform:translateX(0)}
.vg-arr{opacity:0;transform:translateX(-10px);transition:all .28s;font-size:.7rem;color:var(--gold);margin-top:.75rem;}
/* Icon wrapper for vg cells */
.vg-icon{
  width:52px;height:52px;background:rgba(184,150,12,.08);border:1px solid rgba(184,150,12,.16);
  display:flex;align-items:center;justify-content:center;margin-bottom:1.5rem;
  transition:background var(--t-med),border-color var(--t-med);
}
.vg-cell:hover .vg-icon{background:rgba(184,150,12,.16);border-color:rgba(184,150,12,.35);}

/* ── MANDATE CARD ───────────────────────────── */
.mc{background:#fff;border:1px solid var(--border);overflow:hidden;transition:border-color var(--t-med),box-shadow var(--t-med)}
.mc:hover{border-color:var(--gold-line);box-shadow:0 12px 40px rgba(0,0,0,.08)}
.mc-head{background:var(--ink);padding:2rem;position:relative;overflow:hidden}
.mc-head::after{content:'';position:absolute;right:-2rem;top:-2rem;width:10rem;height:10rem;border-radius:50%;background:rgba(184,150,12,.05)}

/* ── BADGES ─────────────────────────────────── */
.badge{display:inline-block;padding:.22rem .65rem;font-size:.62rem;font-weight:700;letter-spacing:.09em;text-transform:uppercase}
.b-g{background:rgba(184,150,12,.08);color:var(--gold);border:1px solid rgba(184,150,12,.2)}
.b-dk{background:rgba(10,10,10,.05);color:var(--ink);border:1px solid rgba(10,10,10,.1)}
.b-gr{background:rgba(22,163,74,.07);color:#15803d;border:1px solid rgba(22,163,74,.16)}
.b-bl{background:rgba(59,130,246,.07);color:#1d4ed8;border:1px solid rgba(59,130,246,.16)}
.b-re{background:rgba(220,38,38,.07);color:#b91c1c;border:1px solid rgba(220,38,38,.16)}

/* ── METRIC BOX ─────────────────────────────── */
.ig-metric-box{
  background:#fff;border:1px solid var(--border);padding:2rem 1.75rem;
  position:relative;overflow:hidden;
  transition:border-color var(--t-med),box-shadow var(--t-med),transform var(--t-med);
}
.ig-metric-box::before{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,var(--gold),var(--gold-lt),transparent);
  opacity:.6;
}
.ig-metric-box:hover{border-color:var(--gold-line);box-shadow:0 8px 32px rgba(0,0,0,.07);transform:translateY(-2px);}

/* ── QUOTE BLOCK ─────────────────────────────── */
.ig-quote{
  border-left:3px solid var(--gold);padding:1.5rem 2rem;
  background:linear-gradient(135deg,rgba(184,150,12,.04),transparent);
  position:relative;
}
.ig-quote::before{content:'"';position:absolute;top:-.5rem;left:1.5rem;font-family:"DM Serif Display",Georgia,serif;font-size:5rem;color:rgba(184,150,12,.12);line-height:1;}

/* ── FORMS ──────────────────────────────────── */
.ig-inp{width:100%;border:1px solid var(--border);padding:.8rem 1rem;background:#fff;font-size:.875rem;font-family:"DM Sans",sans-serif;color:var(--ink);outline:none;transition:border-color .2s,box-shadow .2s;border-radius:0;-webkit-appearance:none}
.ig-inp:focus{border-color:var(--gold);box-shadow:0 0 0 3px rgba(184,150,12,.07)}
.ig-inp::placeholder{color:var(--ink-faint)}
.ig-lbl{display:block;font-size:.68rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.35rem}
select.ig-inp{cursor:pointer}
textarea.ig-inp{resize:vertical;min-height:130px}
/* legacy aliases kept for portal */
.ig-input{width:100%;border:1px solid var(--border);padding:.8rem 1rem;background:#fff;font-size:.875rem;font-family:"DM Sans",sans-serif;color:var(--ink);outline:none;transition:border-color .2s,box-shadow .2s;border-radius:0;-webkit-appearance:none}
.ig-input:focus{border-color:var(--gold);box-shadow:0 0 0 3px rgba(184,150,12,.07)}
.ig-input::placeholder{color:var(--ink-faint)}
.ig-label{display:block;font-size:.68rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.35rem}
select.ig-input{cursor:pointer}
textarea.ig-input{resize:vertical;min-height:130px}

/* ── SIDEBAR ────────────────────────────────── */
.sb-lk{display:flex;align-items:center;gap:.75rem;padding:.6rem .875rem;font-size:.78rem;font-weight:500;color:rgba(255,255,255,.5);border-radius:3px;transition:all .18s;cursor:pointer;text-decoration:none;}
.sb-lk:hover{color:#fff;background:rgba(255,255,255,.05)}
.sb-lk.on{color:var(--gold);background:rgba(184,150,12,.11)}
.sb-sec{font-size:.62rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.45);padding:.5rem .875rem;margin-top:.75rem}

/* ── TABLES ─────────────────────────────────── */
.ig-tbl{width:100%;border-collapse:collapse}
.ig-tbl th{background:var(--ink);color:#fff;font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:.7rem 1rem;text-align:left;white-space:nowrap}
.ig-tbl td{padding:.75rem 1rem;border-bottom:1px solid var(--border);font-size:.875rem;vertical-align:middle}
.ig-tbl tr:last-child td{border-bottom:none}
.ig-tbl tbody tr:hover td{background:var(--gold-pale)}
/* alias */
.ig-table{width:100%;border-collapse:collapse}
.ig-table th{background:var(--ink);color:#fff;font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:.7rem 1rem;text-align:left;white-space:nowrap}
.ig-table td{padding:.75rem 1rem;border-bottom:1px solid var(--border);font-size:.875rem;vertical-align:middle}
.ig-table tr:last-child td{border-bottom:none}
.ig-table tbody tr:hover td{background:var(--gold-pale)}

/* ── SCROLLBAR ──────────────────────────────── */
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px}
::-webkit-scrollbar-thumb:hover{background:var(--gold)}

/* ── ANIMATIONS ─────────────────────────────── */
@keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideRight{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:translateX(0)}}
@keyframes scaleIn{from{opacity:0;transform:scale(.94)}to{opacity:1;transform:scale(1)}}
@keyframes lineGrow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
@keyframes goldPulse{0%,100%{box-shadow:0 0 0 0 rgba(184,150,12,0)}50%{box-shadow:0 0 20px 4px rgba(184,150,12,.18)}}
@keyframes shimmer{from{background-position:-200% 0}to{background-position:200% 0}}
.fu  {animation:fadeUp .65s cubic-bezier(.4,0,.2,1) both}
.fu1 {animation:fadeUp .65s cubic-bezier(.4,0,.2,1) .1s both}
.fu2 {animation:fadeUp .65s cubic-bezier(.4,0,.2,1) .2s both}
.fu3 {animation:fadeUp .65s cubic-bezier(.4,0,.2,1) .3s both}
.fu4 {animation:fadeUp .65s cubic-bezier(.4,0,.2,1) .4s both}
.fu5 {animation:fadeUp .65s cubic-bezier(.4,0,.2,1) .5s both}
.fi  {animation:fadeIn .55s ease both}
.si  {animation:scaleIn .55s cubic-bezier(.4,0,.2,1) both}
/* Shimmer loading placeholder */
.shimmer{background:linear-gradient(90deg,var(--parch) 25%,var(--parch-dk) 50%,var(--parch) 75%);background-size:200% auto;animation:shimmer 2s linear infinite;}

/* ── Lightbox ────────────────────────────────── */
#ig-lightbox{display:none;position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.97);align-items:center;justify-content:center;}
#ig-lightbox.open{display:flex;}
#ig-lightbox img{max-width:92vw;max-height:90vh;object-fit:contain;display:block;box-shadow:0 0 60px rgba(0,0,0,.6);}
#ig-lightbox-close{position:absolute;top:1.5rem;right:1.75rem;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);color:#fff;font-size:1rem;cursor:pointer;opacity:.8;transition:all .2s;width:38px;height:38px;display:flex;align-items:center;justify-content:center;}
#ig-lightbox-close:hover{opacity:1;background:var(--gold);border-color:var(--gold);}
#ig-lightbox-prev,#ig-lightbox-next{position:absolute;top:50%;transform:translateY(-50%);background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);color:#fff;width:48px;height:48px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:.9rem;transition:all .2s;}
#ig-lightbox-prev{left:1.5rem;}#ig-lightbox-next{right:1.5rem;}
#ig-lightbox-prev:hover,#ig-lightbox-next:hover{background:var(--gold);border-color:var(--gold);}
#ig-lightbox-caption{position:absolute;bottom:2rem;left:50%;transform:translateX(-50%);font-size:.72rem;color:rgba(255,255,255,.5);letter-spacing:.1em;background:rgba(0,0,0,.4);padding:.3rem .875rem;}

/* ── command-k search palette ─────────────────── */
#ig-search-overlay{display:none;position:fixed;inset:0;z-index:10500;background:rgba(0,0,0,.72);backdrop-filter:blur(6px);padding:10vh 1rem 2rem;align-items:flex-start;justify-content:center;}
#ig-search-overlay.open{display:flex;}
#ig-search-box{width:100%;max-width:640px;background:#111118;border:1px solid rgba(184,150,12,.35);box-shadow:0 24px 64px rgba(0,0,0,.7),0 0 0 1px rgba(184,150,12,.1);overflow:hidden;}
#ig-search-header{display:flex;align-items:center;gap:.75rem;padding:.875rem 1.1rem;border-bottom:1px solid rgba(255,255,255,.07);}
#ig-search-header i{color:rgba(184,150,12,.7);font-size:.85rem;flex-shrink:0;}
#ig-search-input{flex:1;background:transparent;border:none;outline:none;font-size:.95rem;color:#fff;font-family:'DM Sans',sans-serif;caret-color:var(--gold);}
#ig-search-input::placeholder{color:rgba(255,255,255,.25);}
#ig-search-shortcut{font-size:.6rem;color:rgba(255,255,255,.2);letter-spacing:.05em;white-space:nowrap;display:flex;gap:.3rem;align-items:center;}
#ig-search-shortcut kbd{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);padding:.1rem .35rem;font-size:.58rem;border-radius:3px;}
#ig-search-results{max-height:58vh;overflow-y:auto;padding:.5rem 0;}
#ig-search-results:empty::after{content:'Start typing to search mandates, articles, and pages…';display:block;padding:2rem 1.25rem;font-size:.8rem;color:rgba(255,255,255,.2);text-align:center;}
.ig-sr-group{padding:.55rem 1.1rem .2rem;font-size:.58rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.25);}
.ig-sr-item{display:flex;align-items:center;gap:.875rem;padding:.7rem 1.1rem;cursor:pointer;transition:background .12s;text-decoration:none;color:inherit;}
.ig-sr-item:hover,.ig-sr-item.active{background:rgba(184,150,12,.1);}
.ig-sr-icon{width:32px;height:32px;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-size:.72rem;}
.ig-sr-item-title{font-size:.82rem;color:#fff;margin-bottom:.15rem;line-height:1.3;}
.ig-sr-item-sub{font-size:.68rem;color:rgba(255,255,255,.35);line-height:1.3;}
.ig-sr-item-badge{margin-left:auto;font-size:.55rem;font-weight:700;letter-spacing:.08em;padding:.15rem .45rem;flex-shrink:0;}
#ig-search-footer{padding:.55rem 1.1rem;border-top:1px solid rgba(255,255,255,.06);display:flex;gap:1.25rem;align-items:center;}
#ig-search-footer span{font-size:.6rem;color:rgba(255,255,255,.2);display:flex;align-items:center;gap:.3rem;}
#ig-search-footer kbd{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);padding:.1rem .35rem;font-size:.58rem;border-radius:3px;}
.ig-sr-highlight{color:var(--gold);}
@media(max-width:640px){#ig-search-overlay{padding:5vh .75rem 1rem;align-items:flex-start;}#ig-search-box{max-width:100%;}}

/* ── Back-to-top ─────────────────────────────── */
#btt{position:fixed;bottom:6rem;right:1.75rem;z-index:400;width:40px;height:40px;background:var(--gold);color:#fff;border:none;cursor:pointer;display:none;align-items:center;justify-content:center;font-size:.75rem;box-shadow:0 4px 20px rgba(184,150,12,.45),0 0 0 3px rgba(184,150,12,.12);transition:all var(--t-med);border-radius:50%;}
#btt:hover{transform:translateY(-4px);box-shadow:0 8px 30px rgba(184,150,12,.55);}
#btt.show{display:flex;}

/* ── Sticky stats bar ────────────────────────── */
#stickyStats{position:fixed;top:calc(var(--nav-h) - 60px);left:0;right:0;z-index:190;opacity:0;visibility:hidden;transform:translateY(-12px);transition:top .35s cubic-bezier(.4,0,.2,1),opacity .35s cubic-bezier(.4,0,.2,1),transform .35s cubic-bezier(.4,0,.2,1),visibility 0s .35s;background:rgba(6,6,6,.98);backdrop-filter:blur(20px);border-bottom:1px solid rgba(184,150,12,.15);pointer-events:none;}
#stickyStats.visible{top:var(--nav-h);opacity:1;visibility:visible;transform:translateY(0);transition:top .35s cubic-bezier(.4,0,.2,1),opacity .35s cubic-bezier(.4,0,.2,1),transform .35s cubic-bezier(.4,0,.2,1),visibility 0s 0s;pointer-events:auto;}
.sticky-stat{display:flex;align-items:center;gap:.5rem;padding:.58rem 1.35rem;}
.sticky-stat-n{font-family:"DM Serif Display",Georgia,serif;font-size:1.05rem;color:var(--gold);line-height:1;}
.sticky-stat-l{font-size:.54rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.4);}
@media(max-width:640px){#stickyStats{display:none;}}

/* ── Scrollbar ───────────────────────────────── */
::-webkit-scrollbar{width:5px;height:5px}
::-webkit-scrollbar-track{background:transparent}
::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px}
::-webkit-scrollbar-thumb:hover{background:var(--gold)}

/* ── Forms ───────────────────────────────────── */
.ig-inp{
  width:100%;border:1px solid var(--border);padding:.875rem 1.125rem;
  background:#fff;font-size:.875rem;font-family:"DM Sans",sans-serif;
  color:var(--ink);outline:none;
  transition:border-color var(--t-fast),box-shadow var(--t-fast),background var(--t-fast);
  border-radius:0;-webkit-appearance:none;
}
.ig-inp:focus{border-color:var(--gold);box-shadow:0 0 0 3px rgba(184,150,12,.08);background:#fff;}
.ig-inp::placeholder{color:var(--ink-faint)}
.ig-lbl{display:block;font-size:.67rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.4rem}
select.ig-inp{cursor:pointer}
textarea.ig-inp{resize:vertical;min-height:140px}
/* legacy aliases */
.ig-input{width:100%;border:1px solid var(--border);padding:.875rem 1.125rem;background:#fff;font-size:.875rem;font-family:"DM Sans",sans-serif;color:var(--ink);outline:none;transition:border-color var(--t-fast),box-shadow var(--t-fast);border-radius:0;-webkit-appearance:none}
.ig-input:focus{border-color:var(--gold);box-shadow:0 0 0 3px rgba(184,150,12,.08)}
.ig-input::placeholder{color:var(--ink-faint)}
.ig-label{display:block;font-size:.67rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.4rem}
select.ig-input{cursor:pointer}
textarea.ig-input{resize:vertical;min-height:140px}

/* ── Sidebar ─────────────────────────────────── */
.sb-lk{display:flex;align-items:center;gap:.75rem;padding:.625rem .9rem;font-size:.775rem;font-weight:500;color:rgba(255,255,255,.48);border-radius:2px;transition:all var(--t-fast);cursor:pointer;text-decoration:none;}
.sb-lk:hover{color:#fff;background:rgba(255,255,255,.05)}
.sb-lk.on{color:var(--gold);background:rgba(184,150,12,.1)}
.sb-sec{font-size:.6rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.4);padding:.5rem .9rem;margin-top:.875rem}

/* ── Tables ──────────────────────────────────── */
.ig-tbl{width:100%;border-collapse:collapse}
.ig-tbl th{background:var(--ink);color:#fff;font-size:.67rem;font-weight:700;letter-spacing:.13em;text-transform:uppercase;padding:.75rem 1.1rem;text-align:left;white-space:nowrap}
.ig-tbl td{padding:.8rem 1.1rem;border-bottom:1px solid var(--border);font-size:.875rem;vertical-align:middle}
.ig-tbl tr:last-child td{border-bottom:none}
.ig-tbl tbody tr:hover td{background:rgba(184,150,12,.04)}
.ig-table{width:100%;border-collapse:collapse}
.ig-table th{background:var(--ink);color:#fff;font-size:.67rem;font-weight:700;letter-spacing:.13em;text-transform:uppercase;padding:.75rem 1.1rem;text-align:left;white-space:nowrap}
.ig-table td{padding:.8rem 1.1rem;border-bottom:1px solid var(--border);font-size:.875rem;vertical-align:middle}
.ig-table tr:last-child td{border-bottom:none}
.ig-table tbody tr:hover td{background:rgba(184,150,12,.04)}

/* ── Portal card / admin metric ──────────────── */
.pc{background:#fff;border:1px solid rgba(255,255,255,.07);overflow:hidden;transition:transform var(--t-med),box-shadow var(--t-med)}
.pc:hover{transform:translateY(-4px);box-shadow:0 22px 64px rgba(0,0,0,.42)}
.am{background:#fff;border:1px solid var(--border);padding:1.5rem 1.75rem}

/* ── Sidebar notification badge ──────────────── */
.sb-badge{display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:18px;padding:0 4px;background:var(--gold);color:#fff;font-size:.55rem;font-weight:700;border-radius:9px;margin-left:auto;}
.sb-dot{width:7px;height:7px;border-radius:50%;background:#ef4444;margin-left:auto;flex-shrink:0;}

/* ── Progress bar ────────────────────────────── */
.ig-progress-track{background:var(--parch-dk);height:6px;border-radius:3px;overflow:hidden;}
.ig-progress-fill{height:100%;border-radius:3px;transition:width .7s cubic-bezier(.4,0,.2,1);}

/* ── Status pill ─────────────────────────────── */
.status-dot{width:7px;height:7px;border-radius:50%;display:inline-block;margin-right:.4rem;flex-shrink:0;}

/* ── Tooltip ─────────────────────────────────── */
[data-tip]{position:relative;}
[data-tip]:hover::after{content:attr(data-tip);position:absolute;bottom:calc(100% + 6px);left:50%;transform:translateX(-50%);background:rgba(8,8,8,.94);color:#fff;padding:.32rem .7rem;font-size:.67rem;white-space:nowrap;z-index:999;pointer-events:none;letter-spacing:.04em;}

/* ── Dividers ────────────────────────────────── */
.ig-hr{border:none;border-top:1px solid var(--border);margin:1.75rem 0;}
.divider{height:1px;background:var(--border)}
.divider-dk{height:1px;background:rgba(255,255,255,.06)}

/* ── Info/warn/error boxes ───────────────────── */
.ig-info{background:#eff6ff;border:1px solid #bfdbfe;padding:.8rem 1.1rem;font-size:.82rem;color:#1d4ed8;display:flex;align-items:flex-start;gap:.5rem;}
.ig-warn{background:#fffbeb;border:1px solid #fde68a;padding:.8rem 1.1rem;font-size:.82rem;color:#92400e;display:flex;align-items:flex-start;gap:.5rem;}
.ig-danger{background:#fef2f2;border:1px solid #fecaca;padding:.8rem 1.1rem;font-size:.82rem;color:#991b1b;display:flex;align-items:flex-start;gap:.5rem;}
.ig-success{background:#f0fdf4;border:1px solid #bbf7d0;padding:.8rem 1.1rem;font-size:.82rem;color:#15803d;display:flex;align-items:flex-start;gap:.5rem;}
.ig-panel{display:none;background:var(--parch-dk);border:1px solid var(--border);padding:1.5rem;margin-top:1rem;}

/* ── Modal overlay ───────────────────────────── */
.ig-modal{display:none;position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,.72);backdrop-filter:blur(14px);align-items:center;justify-content:center;padding:1rem;}
.ig-modal-box{background:#fff;width:100%;max-width:620px;max-height:90vh;overflow-y:auto;position:relative;box-shadow:0 40px 120px rgba(0,0,0,.55);}
.ig-modal-box.wide{max-width:880px;}
.ig-modal-hd{padding:1.35rem 1.75rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;}
.ig-modal-bd{padding:1.75rem;}
.ig-modal-ft{padding:1.1rem 1.75rem;border-top:1px solid var(--border);display:flex;gap:.75rem;justify-content:flex-end;}
.ig-modal-close{background:none;border:none;cursor:pointer;color:var(--ink-muted);font-size:1rem;padding:.25rem;line-height:1;transition:color var(--t-fast);}
.ig-modal-close:hover{color:var(--ink);}

/* ── Animated counter ────────────────────────── */
.count-up{display:inline-block;}

/* ── Logo marquee ────────────────────────────── */
.marquee-wrap{overflow:hidden;position:relative;}
.marquee-track{display:flex;gap:3.5rem;align-items:center;animation:marquee 38s linear infinite;white-space:nowrap;will-change:transform;}
.marquee-track:hover{animation-play-state:paused;}
.marquee-track img{height:36px;width:auto;object-fit:contain;filter:grayscale(1) opacity(.5);transition:filter .35s;}
.marquee-track img:hover{filter:grayscale(0) opacity(1);}
@keyframes marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}

/* ── RESPONSIVE GRID ─────────────────────────── */
@media(max-width:768px){
  .r-1{grid-template-columns:1fr!important;}
  .r-2{grid-template-columns:1fr 1fr!important;}
}

/* ── PRINT ───────────────────────────────────── */
@media print{
  #mainNav,footer,.no-print,#btt,#stickyStats,#ig-lightbox,#nda-gate,.car-arr,.car-dots,.car-pb,.car-ct{display:none!important}
  body{background:#fff!important;color:#111!important;font-size:11pt;}
  .wrap,.wrap-md,.wrap-sm{max-width:100%!important;padding:0!important;}
  .listing-detail-grid{display:block!important;}
  .listing-detail-sidebar{display:none!important;}
  #specSheet{display:block!important;page-break-inside:avoid;}
  .detail-car{height:300px!important;}
  h1,h2,h3{color:#111!important;page-break-after:avoid;}
  a{color:#111!important;text-decoration:none!important;}
  .sec-pd,.sec-wh,.sec-dk,.sec-pc{background:#fff!important;padding:1rem 0!important;}
}

/* ══════════════════════════════════════════════
   MOBILE-FIRST RESPONSIVE SYSTEM
   xs<480 · sm<640 · md<768 · lg<1024 · xl<1280
══════════════════════════════════════════════ */
@media(max-width:768px){
  .sec,.sec-sm,.sec-dk,.sec-md,.sec-wh,.sec-pc,.sec-pd{padding:3.5rem 0}
  .wrap,.wrap-md{padding:0 1.25rem}
  .wrap-sm{padding:0 1.25rem}
}
@media(max-width:480px){
  .sec,.sec-sm,.sec-dk,.sec-md,.sec-wh,.sec-pc,.sec-pd{padding:2.75rem 0}
  .wrap,.wrap-md,.wrap-sm{padding:0 1rem}
}
@media(max-width:768px){
  .mob-stack{display:flex!important;flex-direction:column!important;gap:2rem!important;}
  .mob-stack>*{width:100%!important;}
  [style*="grid-template-columns:2fr 1fr"],
  [style*="grid-template-columns:3fr 2fr"],
  [style*="grid-template-columns:1fr 1fr"],
  [style*="grid-template-columns:5fr 4fr"],
  [style*="grid-template-columns:repeat(2,1fr)"],
  [style*="grid-template-columns:repeat(3,1fr)"],
  [style*="grid-template-columns:repeat(4,1fr)"]{
    grid-template-columns:1fr!important;
  }
  [style*="grid-template-columns:repeat(4,1fr)"]{
    grid-template-columns:repeat(2,1fr)!important;
  }
}
@media(max-width:480px){
  [style*="grid-template-columns:repeat(4,1fr)"]{
    grid-template-columns:repeat(2,1fr)!important;
  }
  [style*="grid-template-columns:repeat(2,1fr)"]{
    grid-template-columns:1fr!important;
  }
}
@media(max-width:768px){
  .car{height:92vh;min-height:540px;max-height:800px;}
  .car-arr{display:none;}
  .car-ct{display:none;}
}
@media(max-width:900px){
  .listing-layout{display:flex!important;flex-direction:column!important;gap:2rem!important;}
  .listing-sidebar{position:static!important;width:100%!important;}
}
@media(max-width:640px){
  .h1{font-size:clamp(2.1rem,8.5vw,3.5rem)!important;}
  .h2{font-size:clamp(1.75rem,6.5vw,2.75rem)!important;}
  .lead,.lead-lt{font-size:1rem!important;}
}
@media(max-width:480px){
  .btn-stack-mob{display:flex;flex-direction:column;gap:.625rem;width:100%;}
  .btn-stack-mob .btn{justify-content:center;}
}
@media(max-width:768px){
  .ig-tbl-wrap{overflow-x:auto;-webkit-overflow-scrolling:touch;}
  .ig-tbl,.ig-table{min-width:560px;}
}
.filter-row{display:flex;flex-wrap:wrap;gap:.5rem;}
@media(max-width:640px){
  .vg{grid-template-columns:1fr!important;}
  .vg-cell:nth-child(3n){border-right:1px solid var(--border)!important;}
  .vg-cell:nth-child(odd){border-right:none!important;}
}
@media(max-width:768px){
  .footer-grid{display:grid!important;grid-template-columns:1fr 1fr!important;gap:2rem!important;}
}
@media(max-width:480px){
  .footer-grid{grid-template-columns:1fr!important;}
}
@media(prefers-reduced-motion:reduce){
  .ticker-tr,.marquee-track{animation:none!important;}
  .reveal,.reveal-l,.reveal-r,.reveal-scale{opacity:1!important;transform:none!important;}
}
@media(max-width:640px){
  .mob-img-full{width:100%!important;height:240px!important;object-fit:cover!important;}
}
@media(max-width:768px){
  .stat-n{font-size:2.25rem!important;}
  .eyebrow{letter-spacing:.18em!important;}
}
@media(max-width:560px){
  .cta-flex{flex-direction:column!important;align-items:stretch!important;}
  .cta-flex .btn{text-align:center;justify-content:center;}
}
body{overflow-x:hidden;}

/* ── HERO DARK SECTION (secondary pages) ─────── */
.hero-dk{
  background:var(--ink);padding:calc(9rem - var(--nav-h)) 0 6rem;position:relative;overflow:hidden;
}
.hero-dk-grid{
  position:absolute;inset:0;
  background-image:linear-gradient(rgba(184,150,12,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.035) 1px,transparent 1px);
  background-size:80px 80px;pointer-events:none;
}
.hero-dk-radial{position:absolute;inset:0;background:radial-gradient(ellipse 60% 70% at 70% 50%,rgba(184,150,12,.06) 0%,transparent 55%);pointer-events:none;}
/* Hero floating number — cinematic background serif */
.hero-dk-num{
  position:absolute;right:-2rem;bottom:-3rem;
  font-family:"DM Serif Display",Georgia,serif;
  font-size:clamp(12rem,22vw,22rem);
  color:rgba(184,150,12,.025);
  line-height:1;letter-spacing:-.05em;
  pointer-events:none;user-select:none;
  font-weight:400;
}
/* Brand logo cell */
.brand-cell{background:#fff;padding:1.5rem 1rem;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100px;gap:.6rem;transition:background var(--t-fast),transform var(--t-fast);}
.brand-cell:hover{background:rgba(184,150,12,.04);transform:translateY(-2px);}

/* ── PREMIUM GLASSMORPHISM CARD ──────────────── */
.glass-card{
  background:rgba(255,255,255,.65);
  backdrop-filter:blur(20px) saturate(160%);
  -webkit-backdrop-filter:blur(20px) saturate(160%);
  border:1px solid rgba(255,255,255,.55);
  box-shadow:0 4px 24px rgba(0,0,0,.06),inset 0 1px 0 rgba(255,255,255,.8);
  transition:all var(--t-med);
}
.glass-card:hover{
  box-shadow:0 16px 48px rgba(0,0,0,.1),inset 0 1px 0 rgba(255,255,255,.8);
  transform:translateY(-3px);
  border-color:rgba(184,150,12,.3);
}

/* ── FLOATING LABEL FORM FIELDS ─────────────── */
.fl-group{position:relative;}
.fl-group .ig-inp{padding-top:1.4rem;padding-bottom:.4rem;}
.fl-group label{
  position:absolute;left:1.125rem;top:.875rem;
  font-size:.875rem;color:var(--ink-faint);
  transition:all .2s cubic-bezier(.4,0,.2,1);
  pointer-events:none;transform-origin:left top;
}
.fl-group .ig-inp:focus ~ label,
.fl-group .ig-inp:not(:placeholder-shown) ~ label{
  transform:translateY(-.625rem) scale(.75);
  color:var(--gold);
}

/* ── PREMIUM SECTION SEPARATOR ──────────────── */
.sec-sep{
  height:1px;
  background:linear-gradient(90deg,transparent 0%,var(--gold-line) 20%,var(--gold-line) 80%,transparent 100%);
}

/* ── ANIMATED GRADIENT TEXT ─────────────────── */
.grad-text{
  background:linear-gradient(135deg,var(--gold-dk),var(--gold),var(--gold-lt),var(--gold));
  background-size:300% auto;
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
  background-clip:text;
  animation:gradMove 5s ease-in-out infinite;
}
@keyframes gradMove{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}

/* ── PREMIUM NUMBER DISPLAY ─────────────────── */
.ig-big-num{
  font-family:"DM Serif Display",Georgia,serif;
  font-size:clamp(3.5rem,6vw,5.5rem);
  line-height:.9;
  color:var(--gold);
  letter-spacing:-.04em;
  font-weight:400;
}
.ig-big-num-dk{
  font-family:"DM Serif Display",Georgia,serif;
  font-size:clamp(3.5rem,6vw,5.5rem);
  line-height:.9;
  color:#fff;
  letter-spacing:-.04em;
  font-weight:400;
}

/* ── PREMIUM CALLOUT BLOCK ──────────────────── */
.ig-callout{
  position:relative;
  padding:2rem 2.25rem;
  background:linear-gradient(135deg,rgba(184,150,12,.06) 0%,rgba(184,150,12,.02) 100%);
  border:1px solid rgba(184,150,12,.2);
  overflow:hidden;
}
.ig-callout::before{
  content:'';position:absolute;left:0;top:0;bottom:0;
  width:3px;background:linear-gradient(180deg,var(--gold),var(--gold-lt),transparent);
}

/* ── DARK CALLOUT BLOCK ─────────────────────── */
.ig-callout-dk{
  position:relative;
  padding:2rem 2.25rem;
  background:rgba(255,255,255,.03);
  border:1px solid rgba(255,255,255,.07);
  overflow:hidden;
}
.ig-callout-dk::before{
  content:'';position:absolute;left:0;top:0;bottom:0;
  width:3px;background:linear-gradient(180deg,var(--gold),rgba(184,150,12,.3));
}

/* ── PILL BADGE ─────────────────────────────── */
.ig-pill{
  display:inline-flex;align-items:center;gap:.375rem;
  padding:.28rem .875rem;
  font-size:.6rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
  background:rgba(184,150,12,.1);
  border:1px solid rgba(184,150,12,.25);
  color:var(--gold);
}
.ig-pill-dk{
  display:inline-flex;align-items:center;gap:.375rem;
  padding:.28rem .875rem;
  font-size:.6rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
  background:rgba(184,150,12,.12);
  border:1px solid rgba(184,150,12,.3);
  color:var(--gold-lt);
}

/* ── PREMIUM NAV INDICATOR ──────────────────── */
.n-lk.current{color:#fff;}
.n-lk.current::after{transform:scaleX(1);}

/* ── ICON BOX ───────────────────────────────── */
.ig-icon-box{
  width:56px;height:56px;
  display:flex;align-items:center;justify-content:center;
  background:rgba(184,150,12,.08);
  border:1px solid rgba(184,150,12,.18);
  transition:background var(--t-med),border-color var(--t-med),transform var(--t-med);
  flex-shrink:0;
}
.ig-icon-box:hover{background:rgba(184,150,12,.16);border-color:rgba(184,150,12,.35);transform:scale(1.05);}
.ig-icon-box-sm{
  width:40px;height:40px;
  display:flex;align-items:center;justify-content:center;
  background:rgba(184,150,12,.08);
  border:1px solid rgba(184,150,12,.18);
  flex-shrink:0;
}

/* ── HOVER LINE CARD ────────────────────────── */
.hover-line-card{
  padding:1.5rem;
  border-bottom:1px solid var(--border);
  transition:background var(--t-fast),padding-left var(--t-fast),border-left-color var(--t-fast);
  border-left:3px solid transparent;
  cursor:pointer;
}
.hover-line-card:hover{
  background:rgba(184,150,12,.03);
  padding-left:1.75rem;
  border-left-color:var(--gold);
}

/* ── STAT CARD ROW ──────────────────────────── */
.stat-row{
  display:grid;
  grid-template-columns:repeat(4,1fr);
  border:1px solid var(--border);
  background:#fff;
}
@media(max-width:860px){.stat-row{grid-template-columns:repeat(2,1fr);}}
@media(max-width:480px){.stat-row{grid-template-columns:1fr;}}
.stat-row-cell{
  padding:2.25rem 1.75rem;
  text-align:center;
  border-right:1px solid var(--border);
  transition:background var(--t-med);
  position:relative;
}
.stat-row-cell::after{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,transparent,var(--gold),transparent);
  opacity:0;transition:opacity var(--t-med);
}
.stat-row-cell:hover{background:rgba(184,150,12,.02);}
.stat-row-cell:hover::after{opacity:1;}
.stat-row-cell:last-child{border-right:none;}

/* ── PREMIUM INSIGHT ARTICLE CARD ───────────── */
.insight-card{
  background:#fff;border:1px solid var(--border-lt);overflow:hidden;
  transition:all var(--t-med);display:flex;flex-direction:column;
  position:relative;
}
.insight-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:2px;
  background:linear-gradient(90deg,var(--gold),var(--gold-lt),transparent);
  transform:scaleX(0);transform-origin:left;
  transition:transform var(--t-med);
}
.insight-card:hover{border-color:rgba(184,150,12,.3);box-shadow:0 16px 48px rgba(0,0,0,.09);transform:translateY(-4px);}
.insight-card:hover::before{transform:scaleX(1);}
.insight-card-img{overflow:hidden;position:relative;}
.insight-card-img img{transition:transform 5s cubic-bezier(.4,0,.2,1);width:100%;height:100%;object-fit:cover;display:block;}
.insight-card:hover .insight-card-img img{transform:scale(1.04);}

/* ── WORKS VERTICAL CARD ────────────────────── */
.works-card{
  background:#fff;border:1px solid var(--border);
  overflow:hidden;transition:all var(--t-med);
  position:relative;
}
.works-card::after{
  content:'';position:absolute;bottom:0;left:0;right:0;height:3px;
  background:linear-gradient(90deg,var(--gold),var(--gold-lt),transparent);
  transform:scaleX(0);transform-origin:left;
  transition:transform var(--t-med);
}
.works-card:hover{border-color:rgba(184,150,12,.25);box-shadow:0 12px 36px rgba(0,0,0,.09);transform:translateY(-3px);}
.works-card:hover::after{transform:scaleX(1);}

/* ── LEADERSHIP CARD ────────────────────────── */
.leader-card{
  background:#fff;border:1px solid var(--border);overflow:hidden;
  transition:all var(--t-med);
  position:relative;
}
.leader-card::before{
  content:'';position:absolute;top:0;left:0;right:0;height:3px;
  background:linear-gradient(90deg,var(--gold),var(--gold-lt),transparent);
  opacity:0;transition:opacity var(--t-med);
}
.leader-card:hover{border-color:rgba(184,150,12,.3);box-shadow:0 20px 60px rgba(0,0,0,.1);transform:translateY(-5px);}
.leader-card:hover::before{opacity:1;}

/* ── CONTACT CARD ───────────────────────────── */
.contact-info-card{
  border:1px solid var(--border);padding:1.75rem;
  background:#fff;
  transition:border-color var(--t-med),box-shadow var(--t-med);
}
.contact-info-card:hover{border-color:rgba(184,150,12,.25);box-shadow:0 8px 28px rgba(0,0,0,.07);}

/* ── MANDATE DETAIL HIGHLIGHTS ──────────────── */
.mandate-highlight{
  padding:1.25rem 1.5rem;background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.07);
  transition:background var(--t-fast),border-color var(--t-fast);
}
.mandate-highlight:hover{background:rgba(184,150,12,.08);border-color:rgba(184,150,12,.2);}

/* ── MAGAZINE FEATURE ───────────────────────── */
.magazine-feature{
  display:grid;grid-template-columns:1.6fr 1fr;gap:0;
  border:1px solid var(--border);overflow:hidden;
  transition:box-shadow var(--t-med),border-color var(--t-med);
}
.magazine-feature:hover{border-color:rgba(184,150,12,.3);box-shadow:0 20px 60px rgba(0,0,0,.09);}
@media(max-width:768px){.magazine-feature{grid-template-columns:1fr;}}
.magazine-feature-img{position:relative;overflow:hidden;min-height:360px;}
.magazine-feature-img img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform 6s ease;}
.magazine-feature:hover .magazine-feature-img img{transform:scale(1.03);}

/* ── SCROLL INDICATOR ───────────────────────── */
.scroll-indicator{
  display:flex;flex-direction:column;align-items:center;gap:.5rem;
  position:absolute;bottom:2.5rem;left:50%;transform:translateX(-50%);
  z-index:10;
}
.scroll-indicator-line{
  width:1px;height:36px;
  background:linear-gradient(180deg,rgba(184,150,12,.5),transparent);
  animation:scrollPulse 2s ease-in-out infinite;
}
@keyframes scrollPulse{0%,100%{opacity:.4;height:28px}50%{opacity:.9;height:40px}}


/* ── Why India Gully cards ───────────────────── */
.why-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.75rem;}
@media(max-width:860px){.why-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:560px){.why-grid{grid-template-columns:1fr;}}
.why-card{
  background:#fff;border:1px solid var(--border);padding:2.25rem 2rem;
  transition:border-color var(--t-med),box-shadow var(--t-med),transform var(--t-med);
  position:relative;overflow:hidden;
}
.why-card::before{content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--gold),var(--gold-lt),transparent);opacity:0;transition:opacity var(--t-med);}
.why-card:hover{border-color:rgba(184,150,12,.28);box-shadow:0 16px 48px rgba(0,0,0,.09);transform:translateY(-4px);}
.why-card:hover::before{opacity:1;}
.why-icon{width:54px;height:54px;display:flex;align-items:center;justify-content:center;margin-bottom:1.5rem;transition:transform var(--t-med);}
.why-card:hover .why-icon{transform:scale(1.08);}

/* ── Home stats bar ──────────────────────────── */
#homeStats{display:grid;grid-template-columns:repeat(5,1fr);border:1px solid var(--border);background:#fff;}
@media(max-width:900px){#homeStats{grid-template-columns:repeat(3,1fr);}}
@media(max-width:560px){#homeStats{grid-template-columns:repeat(2,1fr);}}
@media(max-width:400px){#homeStats{grid-template-columns:1fr;}}
.home-stat-cell{
  padding:2.25rem 1.5rem;text-align:center;border-right:1px solid var(--border);
  transition:background var(--t-med);position:relative;
}
.home-stat-cell::after{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent);opacity:0;transition:opacity var(--t-med);}
.home-stat-cell:hover{background:var(--parch);}
.home-stat-cell:hover::after{opacity:1;}
.home-stat-cell:last-child{border-right:none;}
@media(max-width:900px){.home-stat-cell:nth-child(3){border-right:none;}.home-stat-cell:nth-child(4){border-right:1px solid var(--border);}
  .home-stat-cell:nth-child(n+4){border-top:1px solid var(--border);}}
@media(max-width:560px){.home-stat-cell:nth-child(2n){border-right:none;}.home-stat-cell:nth-child(2n+1):not(:last-child){border-right:1px solid var(--border);}
  .home-stat-cell:nth-child(n+3){border-top:1px solid var(--border);}
  .home-stat-cell:nth-child(5){grid-column:1/-1;border-right:none;border-top:1px solid var(--border);}}
@media(max-width:400px){.home-stat-cell{border-right:none;border-bottom:1px solid var(--border);padding:1.5rem 1rem;}
  .home-stat-cell:last-child{border-bottom:none;}}

/* ── Brand logo grid ─────────────────────────── */
.brand-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:1px;background:var(--border);}
@media(max-width:900px){.brand-grid{grid-template-columns:repeat(4,1fr);}}
@media(max-width:560px){.brand-grid{grid-template-columns:repeat(3,1fr);}}
@media(max-width:360px){.brand-grid{grid-template-columns:repeat(2,1fr);}}

/* ── Advisory partners grid ──────────────────── */
.partners-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;}
@media(max-width:560px){.partners-grid{grid-template-columns:1fr;}}
/* Partner card */
.partner-card{
  border:1px solid var(--border);padding:1.75rem;text-align:center;background:#fff;
  transition:border-color var(--t-med),box-shadow var(--t-med),transform var(--t-med);
}
.partner-card:hover{border-color:rgba(184,150,12,.3);box-shadow:0 10px 32px rgba(0,0,0,.08);transform:translateY(-3px);}

/* ── Featured mandates ───────────────────────── */
#featuredMandates{display:grid;grid-template-columns:repeat(3,1fr);gap:1.75rem;margin-bottom:1.75rem;}
@media(max-width:900px){#featuredMandates{grid-template-columns:repeat(2,1fr);}}
@media(max-width:560px){#featuredMandates{grid-template-columns:1fr;}}

/* ── Track record grid ───────────────────────── */
#trackRecord{display:grid;grid-template-columns:repeat(3,1fr);gap:1.75rem;}
@media(max-width:900px){#trackRecord{grid-template-columns:repeat(2,1fr);}}
@media(max-width:560px){#trackRecord{grid-template-columns:1fr;}}

/* ── Scroll-reveal ────────────────────────────── */
.reveal{opacity:0;transform:translateY(28px);transition:opacity .75s cubic-bezier(.4,0,.2,1),transform .75s cubic-bezier(.4,0,.2,1);}
.reveal.visible{opacity:1;transform:translateY(0);}
.reveal-l{opacity:0;transform:translateX(-28px);transition:opacity .75s cubic-bezier(.4,0,.2,1),transform .75s cubic-bezier(.4,0,.2,1);}
.reveal-l.visible{opacity:1;transform:translateX(0);}
.reveal-r{opacity:0;transform:translateX(28px);transition:opacity .75s cubic-bezier(.4,0,.2,1),transform .75s cubic-bezier(.4,0,.2,1);}
.reveal-r.visible{opacity:1;transform:translateX(0);}
.reveal-scale{opacity:0;transform:scale(.95);transition:opacity .7s cubic-bezier(.4,0,.2,1),transform .7s cubic-bezier(.4,0,.2,1);}
.reveal-scale.visible{opacity:1;transform:scale(1);}
/* Faster reveal variant */
.reveal-fast{opacity:0;transform:translateY(18px);transition:opacity .5s cubic-bezier(.4,0,.2,1),transform .5s cubic-bezier(.4,0,.2,1);}
.reveal-fast.visible{opacity:1;transform:translateY(0);}

/* ── Listing detail ──────────────────────────── */
.listing-detail-grid{display:grid;grid-template-columns:1fr 390px;gap:4rem;align-items:start;}
@media(max-width:900px){.listing-detail-grid{display:flex;flex-direction:column;gap:2.5rem;}}
.listing-detail-sidebar{position:sticky;top:calc(var(--nav-h) + 2rem);display:flex;flex-direction:column;gap:1.5rem;}
@media(max-width:900px){.listing-detail-sidebar{position:static;width:100%;}}

/* ── Highlights grid ─────────────────────────── */
.highlights-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);margin-bottom:2.5rem;}
@media(max-width:640px){.highlights-grid{grid-template-columns:repeat(2,1fr);}}

/* ── India Gully difference ──────────────────── */
/* diff-section always stays dark regardless of theme */
.diff-section{background:#0a0a10!important;}
.diff-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:rgba(255,255,255,.15);border:1px solid rgba(255,255,255,.15);}
@media(max-width:860px){.diff-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:480px){.diff-grid{grid-template-columns:1fr;}}
.diff-cell{padding:3rem 2.5rem;background:rgba(255,255,255,.06);border-right:none;transition:background var(--t-med);position:relative;overflow:hidden;}
.diff-cell::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--gold),var(--gold-lt),transparent);opacity:0;transition:opacity var(--t-med);}
.diff-cell::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(184,150,12,.5),transparent);opacity:0;transition:opacity var(--t-med);}
.diff-cell:hover{background:rgba(255,255,255,.09);}
.diff-cell:hover::before,.diff-cell:hover::after{opacity:1;}
@media(max-width:860px){.diff-cell:nth-child(2n){border-right:none;}.diff-cell:nth-child(1),.diff-cell:nth-child(2){border-bottom:none;}}
@media(max-width:480px){.diff-cell{border-right:none!important;border-bottom:none;}.diff-cell:last-child{border-bottom:none;}}

/* ── Pipeline stats ──────────────────────────── */
#pipelineStats{display:grid;grid-template-columns:repeat(4,1fr);border-left:1px solid rgba(255,255,255,.06);}
@media(max-width:640px){#pipelineStats{grid-template-columns:repeat(2,1fr);}}

/* ── Mandate grid ────────────────────────────── */
#mandatesGrid{grid-template-columns:repeat(3,1fr)!important;}
@media(max-width:900px){#mandatesGrid{grid-template-columns:repeat(2,1fr)!important;}}
@media(max-width:560px){#mandatesGrid{grid-template-columns:1fr!important;}}

/* ── Works track record grid ─────────────────── */
.works-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
@media(max-width:900px){.works-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:560px){.works-grid{grid-template-columns:1fr;}}

/* ── Insight grid ────────────────────────────── */
.insight-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.75rem;}
@media(max-width:900px){.insight-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:560px){.insight-grid{grid-template-columns:1fr;}}

/* ── Team grid ───────────────────────────────── */
.team-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;}
@media(max-width:860px){.team-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:560px){.team-grid{grid-template-columns:1fr;}}

/* ── HORECA category grid ────────────────────── */
.horeca-cat-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);}
@media(max-width:900px){.horeca-cat-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:480px){.horeca-cat-grid{grid-template-columns:1fr;}}
.horeca-cat-cell{background:#fff;padding:2rem 1.5rem;transition:all .25s;position:relative;overflow:hidden;cursor:default;}
.horeca-cat-cell:hover{background:var(--parch);box-shadow:0 8px 32px rgba(0,0,0,.06);}
.horeca-cat-cell:hover .horeca-cat-top{opacity:1;}
.horeca-cat-top{position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--gold),transparent);opacity:0;transition:opacity .25s;}

/* ── ig-callout-gold (premium gold CTA box) ─── */
.ig-callout-gold{background:linear-gradient(135deg,rgba(184,150,12,.08) 0%,rgba(184,150,12,.04) 100%);border:1px solid rgba(184,150,12,.25);padding:2.5rem;position:relative;overflow:hidden;}
.ig-callout-gold::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--gold),var(--gold-lt),transparent);}

/* ── timeline-v (vertical milestone timeline) ─── */
.timeline-v { max-width:680px;margin:0 auto; }
.timeline-item { position:relative; }
@media(max-width:560px){
  .timeline-v .timeline-item { grid-template-columns:60px 28px 1fr !important; gap:0 .75rem !important; }
}

/* ── sector-tab (works / compare filter tabs) ─── */
.sector-tab-bar { display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:1.5rem; }
.sector-tab { padding:.4rem 1rem;border-radius:100px;font-size:.76rem;font-family:'DM Sans',sans-serif;font-weight:600;letter-spacing:.04em;border:1.5px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);color:rgba(255,255,255,.5);cursor:pointer;transition:all .2s; }
.sector-tab:hover { border-color:rgba(212,174,42,.4);color:rgba(255,255,255,.8); }
.sector-tab.active { background:rgba(212,174,42,.12);border-color:var(--gold);color:var(--gold); }

/* ── val-grid / val-card (valuation calculator) ── */
.val-grid{display:grid;grid-template-columns:1fr 360px;gap:2rem;align-items:start;}
@media(max-width:960px){.val-grid{grid-template-columns:1fr;}}
.val-card{background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.12);border-radius:16px;padding:1.75rem;margin-bottom:1.5rem;}
.val-card-title{font-family:'DM Serif Display',Georgia,serif;font-size:1.25rem;color:#fff;margin-bottom:.4rem;}
.val-card-sub{font-size:.85rem;color:rgba(255,255,255,.5);font-family:'DM Sans',sans-serif;line-height:1.6;margin-bottom:1.25rem;}

/* ── marquee (partner logo ticker) ──────────── */
.marquee-outer{overflow:hidden;position:relative;}
.marquee-outer::before,.marquee-outer::after{content:'';position:absolute;top:0;bottom:0;width:80px;z-index:2;pointer-events:none;}
.marquee-outer::before{left:0;background:linear-gradient(to right,var(--parch),transparent);}
.marquee-outer::after{right:0;background:linear-gradient(to left,var(--parch),transparent);}
.marquee-track{display:flex;gap:2.5rem;animation:marquee 28s linear infinite;width:max-content;align-items:center;}
.marquee-track:hover{animation-play-state:paused;}
@keyframes marquee{from{transform:translateX(0);}to{transform:translateX(-50%);}}
.marquee-item{white-space:nowrap;font-size:.82rem;font-family:'DM Sans',sans-serif;font-weight:600;color:var(--ink-soft);letter-spacing:.06em;padding:.4rem .8rem;border:1px solid var(--border);border-radius:6px;transition:color .2s,border-color .2s;}
.marquee-item:hover{color:var(--gold);border-color:rgba(184,150,12,.3);}
[data-theme="dark"] .marquee-outer::before{background:linear-gradient(to right,rgba(10,10,15,1),transparent);}
[data-theme="dark"] .marquee-outer::after{background:linear-gradient(to left,rgba(10,10,15,1),transparent);}
[data-theme="dark"] .marquee-item{color:rgba(255,255,255,.45);border-color:rgba(255,255,255,.08);}
[data-theme="dark"] .marquee-item:hover{color:var(--gold);border-color:rgba(212,174,42,.3);}

/* ── trust-row (logos / ratings strip) ──────── */
.trust-row{display:flex;align-items:center;gap:2rem;flex-wrap:wrap;padding:1.5rem 0;border-top:1px solid var(--border);border-bottom:1px solid var(--border);}
.trust-item{display:flex;align-items:center;gap:.5rem;font-size:.78rem;font-family:'DM Sans',sans-serif;color:var(--ink-soft);}
.trust-item strong{color:var(--ink);}
[data-theme="dark"] .trust-row{border-top-color:rgba(255,255,255,.07);border-bottom-color:rgba(255,255,255,.07);}
[data-theme="dark"] .trust-item{color:rgba(255,255,255,.75);}
[data-theme="dark"] .trust-item strong{color:#fff;}

/* ── india-map-box (map section card) ────────── */
.india-map-box{background:linear-gradient(135deg,#f0ebe0 0%,#e8e1d0 100%);transition:background .3s;}
.india-map-wrap svg .india-land{fill:#e8ddc8;stroke:#b8a878;stroke-width:1.2;stroke-linejoin:round;}
.india-map-wrap svg text{fill:#444;}

/* ── tel-card (quick dial team card) ─────────── */
.tel-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:1.25rem;}
.tel-card{background:rgba(255,255,255,.03);border:1.5px solid rgba(255,255,255,.08);border-radius:14px;padding:1.25rem 1.5rem;display:flex;gap:1rem;align-items:flex-start;transition:border-color .2s,background .2s;}
.tel-card:hover{border-color:rgba(212,174,42,.3);background:rgba(212,174,42,.04);}
.tel-avatar{width:48px;height:48px;border-radius:50%;object-fit:cover;flex-shrink:0;border:2px solid rgba(212,174,42,.25);}
.tel-name{font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:#fff;margin-bottom:.2rem;}
.tel-title{font-size:.76rem;color:var(--gold);font-family:'DM Sans',sans-serif;font-weight:600;margin-bottom:.4rem;}
.tel-contact{display:flex;flex-direction:column;gap:.2rem;}
.tel-link{font-size:.82rem;color:rgba(255,255,255,.6);font-family:'DM Sans',sans-serif;text-decoration:none;transition:color .2s;}
.tel-link:hover{color:var(--gold);}

/* ── test-wall (testimonials) ────────────────── */
.test-wall{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:1.5rem;}
.test-card{background:rgba(255,255,255,.03);border:1.5px solid rgba(255,255,255,.08);border-radius:16px;padding:1.75rem;position:relative;transition:border-color .2s,transform .2s;}
.test-card:hover{border-color:rgba(212,174,42,.25);transform:translateY(-2px);}
.test-card::before{content:'"';position:absolute;top:.75rem;right:1.25rem;font-family:'DM Serif Display',Georgia,serif;font-size:4rem;color:rgba(212,174,42,.12);line-height:1;}
.test-quote{font-size:.92rem;color:rgba(255,255,255,.7);font-family:'DM Sans',sans-serif;line-height:1.7;margin-bottom:1.25rem;font-style:italic;}
.test-author{display:flex;align-items:center;gap:.75rem;}
.test-avatar{width:40px;height:40px;border-radius:50%;background:rgba(212,174,42,.15);display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;}
.test-name{font-weight:700;font-size:.88rem;color:#fff;font-family:'DM Sans',sans-serif;}
.test-role{font-size:.76rem;color:rgba(255,255,255,.45);font-family:'DM Sans',sans-serif;}
.test-sector{display:inline-flex;align-items:center;gap:.3rem;font-size:.7rem;font-family:'DM Sans',sans-serif;font-weight:600;letter-spacing:.06em;text-transform:uppercase;padding:.2rem .6rem;border-radius:100px;margin-top:.4rem;}

/* ── sla-badge (response time indicator) ─────── */
.sla-badge{display:inline-flex;align-items:center;gap:.35rem;background:rgba(22,163,74,.1);border:1px solid rgba(22,163,74,.25);color:#15803d;border-radius:100px;padding:.25rem .75rem;font-size:.72rem;font-family:'DM Sans',sans-serif;font-weight:600;letter-spacing:.05em;}
.sla-badge::before{content:'';width:6px;height:6px;border-radius:50%;background:#15803d;animation:pulse 2s infinite;}
[data-theme="dark"] .sla-badge{background:rgba(34,197,94,.1);border-color:rgba(34,197,94,.25);color:#4ade80;}
[data-theme="dark"] .sla-badge::before{background:#4ade80;}

/* ── scroll-progress bar ──────────────────────── */
#ig-scroll-prog{position:fixed;top:0;left:0;height:3px;width:0%;background:linear-gradient(90deg,var(--gold),rgba(212,174,42,.7));z-index:10000;transition:width .1s linear;pointer-events:none;}

/* ── contact-bubble (multi-action FAB) ─────────── */
#ig-contact-fab{position:fixed;bottom:1.75rem;right:1.75rem;z-index:9000;display:flex;flex-direction:column;align-items:flex-end;gap:.6rem;}
#ig-fab-main{width:56px;height:56px;background:#25D366;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(37,211,102,.45);border:none;cursor:pointer;transition:transform .2s,box-shadow .2s;flex-shrink:0;}
#ig-fab-main:hover{transform:scale(1.08);box-shadow:0 6px 28px rgba(37,211,102,.6);}
#ig-fab-main i{font-size:1.25rem;color:#fff;transition:transform .3s;}
#ig-fab-main.open i.fa-whatsapp{display:none;}
#ig-fab-main.open i.fa-times{display:block!important;}
.ig-fab-action{display:flex;align-items:center;gap:.65rem;opacity:0;transform:translateY(10px) scale(.9);transition:opacity .2s,transform .2s;pointer-events:none;}
.ig-fab-action.show{opacity:1;transform:translateY(0) scale(1);pointer-events:auto;}
.ig-fab-action a{width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 14px rgba(0,0,0,.22);text-decoration:none;transition:transform .2s;}
.ig-fab-action a:hover{transform:scale(1.1);}
.ig-fab-label{background:#0a0a0a;color:#fff;font-size:.68rem;font-weight:600;letter-spacing:.06em;padding:.28rem .65rem;border-radius:4px;white-space:nowrap;pointer-events:none;}
@media print{#ig-contact-fab,#ig-scroll-prog{display:none!important;}}

/* ── mobile sticky bottom bar ─────────────────── */
#ig-mob-bar{display:none;position:fixed;bottom:0;left:0;right:0;z-index:8900;background:#0c0c18;border-top:1px solid rgba(184,150,12,.25);padding:.55rem .75rem calc(.55rem + env(safe-area-inset-bottom));gap:.5rem;}
#ig-mob-bar a,#ig-mob-bar button{flex:1;display:flex;align-items:center;justify-content:center;gap:.4rem;padding:.55rem .25rem;font-size:.62rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;text-decoration:none;border:none;cursor:pointer;transition:opacity .18s;}
#ig-mob-bar .mob-wa{background:#25D366;color:#fff;}
#ig-mob-bar .mob-call{background:rgba(184,150,12,.18);border:1px solid rgba(184,150,12,.35);color:#fbbf24;}
#ig-mob-bar .mob-enq{background:var(--gold);color:#fff;}
#ig-mob-bar a:active,#ig-mob-bar button:active{opacity:.75;}
@media(max-width:767px){
  #ig-mob-bar{display:flex;}
  #ig-contact-fab{display:none!important;}
  body{padding-bottom:calc(52px + env(safe-area-inset-bottom));}
}
@media print{#ig-mob-bar{display:none!important;}}

/* ── ig-step (numbered step) ────────────────── */
.ig-step{display:flex;gap:1.5rem;align-items:flex-start;padding:1.75rem 0;border-bottom:1px solid var(--border);}
.ig-step:last-child{border-bottom:none;}
.ig-step-num{width:48px;height:48px;background:var(--gold);display:flex;align-items:center;justify-content:center;font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:#fff;flex-shrink:0;}
.ig-step-body{}
.ig-step-title{font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--ink);margin-bottom:.4rem;}
.ig-step-desc{font-size:.85rem;color:var(--ink-muted);line-height:1.8;}

/* ── ig-properties-grid ──────────────────────── */
.ig-prop-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:1px;background:var(--border);}
@media(max-width:900px){.ig-prop-grid{grid-template-columns:repeat(4,1fr);}}
@media(max-width:560px){.ig-prop-grid{grid-template-columns:repeat(2,1fr);}}
.ig-prop-cell{background:#fff;padding:1.25rem 1rem;text-align:center;font-size:.7rem;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--ink-muted);line-height:1.4;transition:background .2s;}
.ig-prop-cell:hover{background:var(--gold-pale);}

/* ── Track record vertical sections ─────────── */
.tr-section-grid{display:grid;grid-template-columns:280px 1fr;gap:0;}
@media(max-width:860px){
  .tr-section-grid{grid-template-columns:1fr!important;display:block!important;}
  .tr-section-sidebar{border-right:none!important;border-bottom:1px solid rgba(255,255,255,.07)!important;padding-bottom:1.5rem!important;margin-bottom:1.5rem!important;}
}

/* ── Service item ────────────────────────────── */
.service-item{
  display:flex;align-items:flex-start;gap:.625rem;
  padding:.75rem 1rem;background:var(--parch);border:1px solid var(--border);
  transition:background var(--t-fast),border-color var(--t-fast);
}
.service-item:hover{background:rgba(184,150,12,.05);border-color:rgba(184,150,12,.2);}

/* ── Image gallery ───────────────────────────── */
.detail-car{position:relative;height:520px;overflow:hidden;background:#111;}
@media(max-width:768px){.detail-car{height:320px!important;}}
.car2-track{display:flex;height:100%;transition:transform var(--t-cinema);}
.car2-slide{flex:0 0 100%;position:relative;overflow:hidden;}
.car2-slide img{width:100%;height:100%;object-fit:cover;transition:transform 8s cubic-bezier(.4,0,.2,1);}
.car2-slide.on img{transform:scale(1.03);}
.tn-strip{display:flex;gap:.5rem;overflow-x:auto;padding:.75rem 0;scrollbar-width:none;}
.tn-strip::-webkit-scrollbar{display:none;}
.tn-thumb{width:80px;height:58px;overflow:hidden;flex-shrink:0;cursor:pointer;border:2px solid transparent;transition:border-color .2s,opacity .2s;opacity:.6;}
.tn-thumb.on{border-color:var(--gold);opacity:1;}
.tn-thumb img{width:100%;height:100%;object-fit:cover;}
</style>
</head>
<body class="${opts?.bodyClass || ''}">
<!-- SCROLL PROGRESS BAR -->
<div id="ig-scroll-prog" aria-hidden="true"></div>
<a href="#main-content" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;" onfocus="this.style.cssText='position:fixed;left:1rem;top:1rem;z-index:99999;background:var(--gold);color:#fff;padding:.5rem 1rem;font-size:.85rem;font-weight:700;text-decoration:none;'" onblur="this.style.cssText='position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;'">Skip to main content</a>
${opts?.noNav ? '' : NAV}
<main id="main-content" role="main" aria-label="Main content" tabindex="-1">
${content}
</main>
${opts?.noFooter ? '' : FOOTER}
<!-- BACK TO TOP -->
<button id="btt" aria-label="Back to top" title="Back to top">
  <i class="fas fa-chevron-up"></i>
</button>
<!-- MULTI-ACTION CONTACT FAB -->
${opts?.noNav ? '' : `<div id="ig-contact-fab" aria-label="Contact India Gully">
  <div class="ig-fab-action" id="fab-act-email" style="transition-delay:.12s;">
    <span class="ig-fab-label">Email Us</span>
    <a href="mailto:info@indiagully.com" aria-label="Email India Gully" style="background:#1A3A6B;">
      <i class="fas fa-envelope" style="color:#fff;font-size:.9rem;"></i>
    </a>
  </div>
  <div class="ig-fab-action" id="fab-act-call" style="transition-delay:.08s;">
    <span class="ig-fab-label">Call Us</span>
    <a href="tel:+918988988988" aria-label="Call India Gully" style="background:var(--gold);">
      <i class="fas fa-phone-alt" style="color:#fff;font-size:.85rem;"></i>
    </a>
  </div>
  <div class="ig-fab-action" id="fab-act-wa" style="transition-delay:.04s;">
    <span class="ig-fab-label">WhatsApp</span>
    <a href="https://wa.me/918988988988?text=Hi%20India%20Gully%2C%20I%20would%20like%20to%20discuss%20a%20mandate." target="_blank" rel="noopener" aria-label="WhatsApp India Gully" style="background:#25D366;">
      <i class="fab fa-whatsapp" style="color:#fff;font-size:1rem;"></i>
    </a>
  </div>
  <button id="ig-fab-main" aria-label="Contact options" aria-expanded="false" onclick="igFabToggle()">
    <i class="fab fa-whatsapp"></i>
    <i class="fas fa-times" style="display:none;"></i>
  </button>
</div>`}
<!-- MOBILE STICKY BOTTOM BAR -->
${opts?.noNav ? '' : `<nav id="ig-mob-bar" aria-label="Quick contact">
  <a href="https://wa.me/918988988988?text=Hi%20India%20Gully%2C%20I%20would%20like%20to%20discuss%20a%20mandate." target="_blank" rel="noopener" class="mob-wa" aria-label="WhatsApp India Gully">
    <i class="fab fa-whatsapp" style="font-size:.85rem;"></i>WhatsApp
  </a>
  <a href="tel:+918988988988" class="mob-call" aria-label="Call India Gully">
    <i class="fas fa-phone-alt" style="font-size:.75rem;"></i>Call
  </a>
  <a href="/contact" class="mob-enq" aria-label="Send enquiry">
    <i class="fas fa-paper-plane" style="font-size:.75rem;"></i>Enquire
  </a>
</nav>`}
<!-- COMMAND-K SEARCH PALETTE -->
<div id="ig-search-overlay" role="dialog" aria-modal="true" aria-label="Search" onclick="if(event.target===this)igSearchClose()">
  <div id="ig-search-box">
    <div id="ig-search-header">
      <i class="fas fa-search"></i>
      <input id="ig-search-input" type="text" placeholder="Search mandates, articles, pages…" autocomplete="off" spellcheck="false" oninput="igSearchQuery(this.value)" onkeydown="igSearchKey(event)">
      <span id="ig-search-shortcut"><kbd>Esc</kbd> to close</span>
    </div>
    <div id="ig-search-results"></div>
    <div id="ig-search-footer">
      <span><kbd>↑↓</kbd> navigate</span>
      <span><kbd>Enter</kbd> open</span>
      <span><kbd>Esc</kbd> close</span>
    </div>
  </div>
</div>
<!-- LIGHTBOX -->
<div id="ig-lightbox" role="dialog" aria-modal="true" aria-label="Image viewer">
  <button id="ig-lightbox-close" aria-label="Close image viewer" onclick="igLightboxClose()"><i class="fas fa-times"></i></button>
  <button id="ig-lightbox-prev" aria-label="Previous image" onclick="igLightboxNav(-1)"><i class="fas fa-chevron-left"></i></button>
  <img id="ig-lightbox-img" src="" alt="">
  <button id="ig-lightbox-next" aria-label="Next image" onclick="igLightboxNav(1)"><i class="fas fa-chevron-right"></i></button>
  <div id="ig-lightbox-caption"></div>
</div>
<!-- STICKY STATS -->
<div id="stickyStats" aria-hidden="true">
  <div class="wrap" style="padding-top:0;padding-bottom:0;">
    <div style="display:flex;align-items:center;justify-content:space-between;overflow-x:auto;gap:0;">
      ${[
        {n:'₹1,165 Cr+',l:'Pipeline'},
        {n:'15+',        l:'Hotels'},
        {n:'35+',        l:'Retail Brands'},
        {n:'20+',        l:'Hotel Brands'},
        {n:'Pan-India',  l:'Reach'},
      ].map(s=>`<div class="sticky-stat"><div class="sticky-stat-n">${s.n}</div><div class="sticky-stat-l">${s.l}</div></div>`).join('<div style="width:1px;height:32px;background:rgba(255,255,255,.07);flex-shrink:0;"></div>')}
      <a href="/listings" style="margin-left:auto;flex-shrink:0;padding:.4rem 1rem;font-size:.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:var(--gold);color:#fff;white-space:nowrap;">View Mandates</a>
    </div>
  </div>
</div>
${SCRIPTS(opts?.cspNonce)}
</body>
</html>`
}

// ── NAVIGATION ─────────────────────────────────────────────────────────────
const NAV = `
<div class="nav-sp"></div>
<nav id="mainNav" class="nav-clear">
  <div style="max-width:1280px;margin:0 auto;padding:0 1.25rem;height:100%;display:flex;align-items:center;justify-content:space-between;">

    <!-- LOGO -->
    <a href="/" style="display:flex;align-items:center;flex-shrink:0;" aria-label="India Gully — Home">
      <img src="/assets/logo-white.png"
           alt="India Gully — Celebrating Desiness"
           height="38"
           style="height:38px;width:auto;max-width:200px;object-fit:contain;object-position:left center;display:block;"
           draggable="false"
           fetchpriority="high"
           decoding="async">
    </a>

    <!-- DESKTOP NAV — 6 top-level items only -->
    <div id="nav-desktop-links" style="gap:.05rem;">
      <a href="/"         class="n-lk">Home</a>
      <a href="/about"    class="n-lk">About</a>

      <!-- Advisory & Services dropdown -->
      <div class="relative n-par" style="position:relative;">
        <button class="n-lk" style="display:flex;align-items:center;gap:.35rem;">Advisory <i class="fas fa-chevron-down" style="font-size:.48rem;opacity:.4;"></i></button>
        <div class="n-drop" style="min-width:16rem;">
          <div style="padding:.5rem 1.2rem .25rem;font-size:.56rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.28);">Services</div>
          <a href="/services#real-estate"   class="n-di"><i class="fas fa-landmark"     style="width:16px;font-size:.72rem;color:rgba(184,150,12,.6);"></i>Real Estate</a>
          <a href="/services#hospitality"   class="n-di"><i class="fas fa-hotel"        style="width:16px;font-size:.72rem;color:rgba(184,150,12,.6);"></i>Hospitality</a>
          <a href="/services#retail"        class="n-di"><i class="fas fa-store"        style="width:16px;font-size:.72rem;color:rgba(184,150,12,.6);"></i>Retail &amp; Leasing</a>
          <a href="/services#entertainment" class="n-di"><i class="fas fa-ticket-alt"   style="width:16px;font-size:.72rem;color:rgba(184,150,12,.6);"></i>Entertainment</a>
          <a href="/services#debt"          class="n-di"><i class="fas fa-balance-scale" style="width:16px;font-size:.72rem;color:rgba(184,150,12,.6);"></i>Debt &amp; Special</a>
          <a href="/horeca"                 class="n-di"><i class="fas fa-utensils"     style="width:16px;font-size:.72rem;color:rgba(184,150,12,.6);"></i>HORECA Solutions</a>
          <div style="height:1px;background:rgba(255,255,255,.06);margin:.3rem 0;"></div>
          <div style="padding:.25rem 1.2rem .2rem;font-size:.56rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.28);">Tools</div>
          <a href="/valuation"   class="n-di"><i class="fas fa-chart-bar"   style="width:16px;font-size:.72rem;color:rgba(184,150,12,.6);"></i>Valuation Calculator</a>
          <a href="/compare"     class="n-di"><i class="fas fa-columns"     style="width:16px;font-size:.72rem;color:rgba(184,150,12,.6);"></i>Compare Mandates</a>
          <a href="/market-data" class="n-di"><i class="fas fa-chart-line"  style="width:16px;font-size:.72rem;color:rgba(184,150,12,.6);"></i>Market Data</a>
        </div>
      </div>

      <a href="/listings" class="n-lk">Mandates</a>
      <a href="/insights" class="n-lk">Insights</a>

      <!-- More dropdown -->
      <div class="relative n-par" style="position:relative;">
        <button class="n-lk" style="display:flex;align-items:center;gap:.35rem;">More <i class="fas fa-chevron-down" style="font-size:.48rem;opacity:.4;"></i></button>
        <div class="n-drop" style="right:0;left:auto;min-width:12rem;">
          <a href="/works"        class="n-di"><i class="fas fa-trophy"       style="width:16px;font-size:.72rem;color:rgba(184,150,12,.6);"></i>Our Work</a>
          <a href="/invest"       class="n-di"><i class="fas fa-chart-line"   style="width:16px;font-size:.72rem;color:rgba(184,150,12,.6);"></i>Investor Relations</a>
          <a href="/pipeline"     class="n-di"><i class="fas fa-stream"        style="width:16px;font-size:.72rem;color:rgba(184,150,12,.6);"></i>Pipeline Dashboard</a>
          <a href="/resources"    class="n-di"><i class="fas fa-book-open"    style="width:16px;font-size:.72rem;color:rgba(184,150,12,.6);"></i>Resources</a>
          <a href="/testimonials" class="n-di"><i class="fas fa-star"         style="width:16px;font-size:.72rem;color:rgba(184,150,12,.6);"></i>Testimonials</a>
          <a href="/careers"      class="n-di"><i class="fas fa-briefcase"    style="width:16px;font-size:.72rem;color:rgba(184,150,12,.6);"></i>Careers</a>
        </div>
      </div>

      <a href="/contact" class="n-lk">Contact</a>
    </div>

    <!-- RIGHT -->
    <div id="nav-desktop-right" style="gap:.6rem;">
      <!-- Search Button -->
      <button onclick="igSearchOpen()" aria-label="Search" title="Search (Ctrl+K / ⌘K)"
              style="color:rgba(255,255,255,.55);background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);padding:.35rem .55rem;cursor:pointer;font-size:.72rem;transition:all .2s;display:flex;align-items:center;gap:.4rem;"
              onmouseover="this.style.borderColor='rgba(184,150,12,.4)';this.style.color='#fbbf24'" onmouseout="this.style.borderColor='rgba(255,255,255,.12)';this.style.color='rgba(255,255,255,.55)'">
        <i class="fas fa-search" style="font-size:.68rem;"></i>
        <span style="font-size:.58rem;opacity:.6;">⌘K</span>
      </button>
      <!-- Dark Mode Toggle -->
      <button id="dark-toggle" onclick="igToggleDark()" aria-label="Toggle dark mode"
              style="color:rgba(255,255,255,.55);background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);padding:.35rem .55rem;cursor:pointer;font-size:.72rem;transition:all .2s;"
              title="Toggle dark mode">
        <i id="dark-icon" class="fas fa-moon"></i>
      </button>
      <!-- Portals dropdown -->
      <div class="relative n-par" style="position:relative;">
        <button class="n-lk" style="display:flex;align-items:center;gap:.4rem;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);padding:.38rem .8rem;">
          <i class="fas fa-lock" style="font-size:.5rem;color:var(--gold);"></i>Portals
          <i class="fas fa-chevron-down" style="font-size:.45rem;opacity:.4;"></i>
        </button>
        <div class="n-drop" style="right:0;left:auto;min-width:12rem;">
          <a href="/portal/client"   class="n-di"><i class="fas fa-user-tie"   style="color:var(--gold);width:14px;font-size:.7rem;"></i>Client Portal</a>
          <a href="/portal/employee" class="n-di"><i class="fas fa-users"      style="color:var(--gold);width:14px;font-size:.7rem;"></i>Employee Portal</a>
          <a href="/portal/board"    class="n-di"><i class="fas fa-gavel"      style="color:var(--gold);width:14px;font-size:.7rem;"></i>Board &amp; KMP</a>
          <div style="height:1px;background:rgba(255,255,255,.06);margin:.2rem 0;"></div>
          <a href="/admin"           class="n-di"><i class="fas fa-shield-alt" style="color:var(--gold);width:14px;font-size:.7rem;"></i>Super Admin</a>
        </div>
      </div>
      <a href="/contact" class="btn btn-g" style="padding:.5rem 1.2rem;font-size:.72rem;">Submit Mandate</a>
    </div>

    <!-- HAMBURGER -->
    <button id="mobileBtn" style="color:#fff;padding:.5rem;background:none;border:none;cursor:pointer;">
      <i class="fas fa-bars" style="font-size:1.05rem;"></i>
    </button>
  </div>

  <!-- MOBILE MENU -->
  <div id="mobileMenu" style="display:none;background:rgba(6,6,6,.98);border-top:1px solid rgba(255,255,255,.06);">
    <div style="padding:1rem 1.25rem;display:flex;flex-direction:column;gap:.1rem;">
      <a href="/"            style="display:block;padding:.65rem 0;font-size:.875rem;color:rgba(255,255,255,.7);border-bottom:1px solid rgba(255,255,255,.04);">Home</a>
      <a href="/about"       style="display:block;padding:.65rem 0;font-size:.875rem;color:rgba(255,255,255,.7);border-bottom:1px solid rgba(255,255,255,.04);">About</a>
      <a href="/services"    style="display:block;padding:.65rem 0;font-size:.875rem;color:rgba(255,255,255,.7);border-bottom:1px solid rgba(255,255,255,.04);">Advisory Services</a>
      <a href="/horeca"      style="display:block;padding:.65rem 0;font-size:.875rem;color:rgba(255,255,255,.7);border-bottom:1px solid rgba(255,255,255,.04);">HORECA Solutions</a>
      <a href="/listings"    style="display:block;padding:.65rem 0;font-size:.875rem;color:rgba(255,255,255,.7);border-bottom:1px solid rgba(255,255,255,.04);">Mandates</a>
      <a href="/insights"    style="display:block;padding:.65rem 0;font-size:.875rem;color:rgba(255,255,255,.7);border-bottom:1px solid rgba(255,255,255,.04);">Insights</a>
      <a href="/works"       style="display:block;padding:.65rem 0;font-size:.875rem;color:rgba(255,255,255,.7);border-bottom:1px solid rgba(255,255,255,.04);">Our Work</a>
      <a href="/invest"      style="display:block;padding:.65rem 0;font-size:.875rem;color:rgba(255,255,255,.7);border-bottom:1px solid rgba(255,255,255,.04);">Investor Relations</a>
      <a href="/valuation"   style="display:block;padding:.65rem 0;font-size:.875rem;color:rgba(255,255,255,.7);border-bottom:1px solid rgba(255,255,255,.04);">Valuation Tool</a>
      <a href="/market-data" style="display:block;padding:.65rem 0;font-size:.875rem;color:rgba(255,255,255,.7);border-bottom:1px solid rgba(255,255,255,.04);">Market Data</a>
      <a href="/compare"     style="display:block;padding:.65rem 0;font-size:.875rem;color:rgba(255,255,255,.7);border-bottom:1px solid rgba(255,255,255,.04);">Compare Mandates</a>
      <a href="/resources"   style="display:block;padding:.65rem 0;font-size:.875rem;color:rgba(255,255,255,.7);border-bottom:1px solid rgba(255,255,255,.04);">Resources</a>
      <a href="/testimonials" style="display:block;padding:.65rem 0;font-size:.875rem;color:rgba(255,255,255,.7);border-bottom:1px solid rgba(255,255,255,.04);">Testimonials</a>
      <a href="/careers"     style="display:block;padding:.65rem 0;font-size:.875rem;color:rgba(255,255,255,.7);border-bottom:1px solid rgba(255,255,255,.04);">Careers</a>
      <a href="/contact"     style="display:block;padding:.65rem 0;font-size:.875rem;color:var(--gold);">Contact Us</a>
      <div style="padding-top:.75rem;display:flex;flex-direction:column;gap:.4rem;border-top:1px solid rgba(255,255,255,.06);margin-top:.2rem;">
        <a href="/portal/client"   style="font-size:.78rem;color:rgba(255,255,255,.45);display:flex;align-items:center;gap:.5rem;"><i class="fas fa-lock" style="color:var(--gold);font-size:.58rem;width:14px;"></i>Client Portal</a>
        <a href="/portal/employee" style="font-size:.78rem;color:rgba(255,255,255,.45);display:flex;align-items:center;gap:.5rem;"><i class="fas fa-lock" style="color:var(--gold);font-size:.58rem;width:14px;"></i>Employee Portal</a>
        <a href="/portal/board"    style="font-size:.78rem;color:rgba(255,255,255,.45);display:flex;align-items:center;gap:.5rem;"><i class="fas fa-lock" style="color:var(--gold);font-size:.58rem;width:14px;"></i>Board &amp; KMP</a>
      </div>
    </div>
  </div>
</nav>`

// ── FOOTER ──────────────────────────────────────────────────────────────────
const FOOTER = `
<footer style="background:#060606;border-top:1px solid rgba(184,150,12,.15);position:relative;overflow:hidden;">
  <!-- Footer background grid -->
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.02) 1px,transparent 1px);background-size:80px 80px;pointer-events:none;"></div>
  <!-- Footer radial glow -->
  <div style="position:absolute;bottom:0;left:50%;transform:translateX(-50%);width:600px;height:300px;background:radial-gradient(ellipse,rgba(184,150,12,.04) 0%,transparent 70%);pointer-events:none;"></div>

  <!-- Top contact strip -->
  <div style="position:relative;border-bottom:1px solid rgba(255,255,255,.04);">
    <div class="wrap" style="padding-top:2rem;padding-bottom:2rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1.5rem;">
      <div style="display:flex;align-items:center;gap:.875rem;">
        <div style="width:40px;height:1px;background:linear-gradient(90deg,var(--gold),transparent);flex-shrink:0;"></div>
        <span style="font-size:.58rem;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:rgba(184,150,12,.7);">India Gully Advisory · New Delhi, India</span>
      </div>
      <div style="display:flex;align-items:center;gap:1.5rem;flex-wrap:wrap;">
        <a href="tel:+918988988988" style="display:flex;align-items:center;gap:.55rem;font-size:.78rem;color:rgba(255,255,255,.55);transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='rgba(255,255,255,.55)'"><i class="fas fa-phone" style="color:var(--gold);font-size:.6rem;"></i>+91 8988 988 988</a>
        <a href="mailto:info@indiagully.com" style="display:flex;align-items:center;gap:.55rem;font-size:.78rem;color:rgba(255,255,255,.55);transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='rgba(255,255,255,.55)'"><i class="fas fa-envelope" style="color:var(--gold);font-size:.6rem;"></i>info@indiagully.com</a>
        <a href="/contact" class="btn btn-g btn-sm" style="font-size:.6rem;">Submit Mandate <i class="fas fa-arrow-right" style="font-size:.55rem;"></i></a>
      </div>
    </div>
  </div>

  <!-- Main footer grid -->
  <div class="wrap footer-grid" style="position:relative;padding-top:4.5rem;padding-bottom:3rem;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3.5rem;">

    <!-- Brand column -->
    <div>
      <div style="margin-bottom:1.5rem;">
        <img src="/assets/logo-white.png"
             alt="India Gully — Celebrating Desiness"
             height="34"
             style="height:34px;width:auto;max-width:200px;object-fit:contain;object-position:left center;display:block;"
             draggable="false"
             decoding="async">
      </div>
      <p style="font-size:.82rem;color:rgba(255,255,255,.55);line-height:1.85;max-width:300px;margin-bottom:1.5rem;">India's premier multi-vertical advisory firm. Strategy, transactions and enablement across Real Estate, Retail, Hospitality, Entertainment and HORECA.</p>
      
      <!-- Credentials strip -->
      <div style="padding:1rem 1.25rem;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);margin-bottom:1.25rem;">
        <p style="font-size:.6rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(184,150,12,.65);margin-bottom:.5rem;">Institutional Credibility</p>
        <div style="display:flex;flex-wrap:wrap;gap:.4rem;">
          ${['EY Co-Advisory','CBRE Co-Advisory','ANAROCK Network','₹2,000 Cr+ Transacted'].map(t=>`<span style="font-size:.58rem;background:rgba(184,150,12,.08);border:1px solid rgba(184,150,12,.15);color:rgba(255,255,255,.5);padding:.18rem .5rem;">${t}</span>`).join('')}
        </div>
      </div>
      
      <p style="font-size:.68rem;color:rgba(255,255,255,.35);line-height:1.7;">Vivacious Entertainment and Hospitality Pvt. Ltd.<br>CIN: U74999DL2017PTC323237 · New Delhi, India</p>
    </div>

    <!-- Advisory column -->
    <div>
      <p style="font-size:.6rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:rgba(184,150,12,.7);margin-bottom:1.1rem;display:flex;align-items:center;gap:.5rem;"><span style="width:16px;height:1px;background:rgba(184,150,12,.5);display:inline-block;"></span>Advisory</p>
      <ul style="list-style:none;display:flex;flex-direction:column;gap:.55rem;">
        ${[['Real Estate','/services#real-estate'],['Retail &amp; Leasing','/services#retail'],['Hospitality','/services#hospitality'],['Entertainment','/services#entertainment'],['Debt &amp; Special','/services#debt'],['HORECA Solutions','/horeca']].map(([s,h])=>`<li><a href="${h}" style="font-size:.8rem;color:rgba(255,255,255,.5);transition:color .2s;display:flex;align-items:center;gap:.4rem;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.5)'"><span style="width:4px;height:4px;background:rgba(184,150,12,.4);border-radius:50%;flex-shrink:0;display:inline-block;"></span>${s}</a></li>`).join('')}
      </ul>
    </div>

    <!-- Platform column -->
    <div>
      <p style="font-size:.6rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:rgba(184,150,12,.7);margin-bottom:1.1rem;display:flex;align-items:center;gap:.5rem;"><span style="width:16px;height:1px;background:rgba(184,150,12,.5);display:inline-block;"></span>Platform</p>
      <ul style="list-style:none;display:flex;flex-direction:column;gap:.55rem;">
        ${[['Active Mandates','/listings'],['Compare Mandates','/compare'],['Pipeline Dashboard','/pipeline'],['Our Work','/works'],['Investor Relations','/invest'],['Insights','/insights'],['Market Data','/market-data'],['Valuation Tool','/valuation'],['Resources','/resources'],['Careers','/careers'],['Client Testimonials','/testimonials'],['Submit Mandate','/contact'],['About Us','/about'],['Client Portal','/portal/client'],['Employee Portal','/portal/employee'],['Board Portal','/portal/board']].map(([l,h])=>`<li><a href="${h}" style="font-size:.8rem;color:rgba(255,255,255,.5);transition:color .2s;display:flex;align-items:center;gap:.4rem;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.5)'"><span style="width:4px;height:4px;background:rgba(184,150,12,.4);border-radius:50%;flex-shrink:0;display:inline-block;"></span>${l}</a></li>`).join('')}
      </ul>
    </div>

    <!-- Contact column -->
    <div>
      <p style="font-size:.6rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:rgba(184,150,12,.7);margin-bottom:1.1rem;display:flex;align-items:center;gap:.5rem;"><span style="width:16px;height:1px;background:rgba(184,150,12,.5);display:inline-block;"></span>Leadership</p>
      <ul style="list-style:none;display:flex;flex-direction:column;gap:.6rem;">
        ${[
          {n:'Arun Manikonda',t:'Managing Director',e:'akm@indiagully.com',p:'+91 98108 89134'},
          {n:'Pavan Manikonda',t:'Executive Director',e:'pavan@indiagully.com',p:'+91 62825 56067'},
          {n:'Amit Jhingan',t:'President, Real Estate',e:'amit.jhingan@indiagully.com',p:'+91 98999 93543'},
        ].map(l=>`<li style="padding:.625rem 0;border-bottom:1px solid rgba(255,255,255,.04);">
          <div style="font-size:.78rem;font-weight:600;color:rgba(255,255,255,.75);margin-bottom:.1rem;">${l.n}</div>
          <div style="font-size:.62rem;color:rgba(255,255,255,.4);margin-bottom:.3rem;">${l.t}</div>
          <a href="mailto:${l.e}" style="font-size:.7rem;color:rgba(184,150,12,.65);display:block;transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='rgba(184,150,12,.65)'">${l.e}</a>
        </li>`).join('')}
      </ul>
    </div>
  </div>

  <!-- Bottom bar -->
  <div style="position:relative;border-top:1px solid rgba(255,255,255,.04);">
    <div class="wrap" style="padding-top:1rem;padding-bottom:1rem;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:.875rem;">
      <p style="font-size:.65rem;color:rgba(255,255,255,.38);">© 2026 Vivacious Entertainment and Hospitality Pvt. Ltd. All rights reserved. India Gully™ is a registered brand.</p>
      <div style="display:flex;gap:1.5rem;font-size:.65rem;color:rgba(255,255,255,.38);align-items:center;flex-wrap:wrap;">
        <a href="/legal/privacy"    style="transition:color .2s;" onmouseover="this.style.color='rgba(184,150,12,.8)'" onmouseout="this.style.color='rgba(255,255,255,.38)'">Privacy Policy</a>
        <a href="/legal/terms"      style="transition:color .2s;" onmouseover="this.style.color='rgba(184,150,12,.8)'" onmouseout="this.style.color='rgba(255,255,255,.38)'">Terms of Use</a>
        <a href="/legal/disclaimer" style="transition:color .2s;" onmouseover="this.style.color='rgba(184,150,12,.8)'" onmouseout="this.style.color='rgba(255,255,255,.38)'">Disclaimer</a>
        <span style="color:rgba(255,255,255,.2);">GSTIN: 07AAGCV0867P1ZN</span>
        <button onclick="igStartTour && igStartTour()" aria-label="Start guided tour"
                style="background:none;border:1px solid rgba(255,255,255,.18);color:rgba(255,255,255,.45);padding:.22rem .6rem;font-size:.6rem;cursor:pointer;transition:all .2s;"
                onmouseover="this.style.borderColor='var(--gold)';this.style.color='var(--gold)'" onmouseout="this.style.borderColor='rgba(255,255,255,.18)';this.style.color='rgba(255,255,255,.45)'">
          <i class="fas fa-compass" style="margin-right:.3rem;"></i>Tour
        </button>
      </div>
    </div>
  </div>
</footer>`

// ── SCRIPTS ─────────────────────────────────────────────────────────────────
const SCRIPTS = (_nonce?: string) => `
<script>
(function(){
  /* NAV SCROLL */
  var nav = document.getElementById('mainNav');
  function updNav(){
    if(!nav) return;
    if(window.scrollY > 60){ nav.classList.remove('nav-clear'); nav.classList.add('nav-solid'); }
    else                   { nav.classList.remove('nav-solid'); nav.classList.add('nav-clear'); }
  }
  updNav();
  window.addEventListener('scroll', updNav, {passive:true});

  /* SCROLL PROGRESS BAR */
  var prog = document.getElementById('ig-scroll-prog');
  if(prog){
    window.addEventListener('scroll', function(){
      var scrollTop = window.scrollY;
      var docH = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      var pct = docH > 0 ? Math.min((scrollTop / docH) * 100, 100) : 0;
      prog.style.width = pct + '%';
    }, {passive:true});
  }

  /* MULTI-ACTION FAB */
  function igFabToggle(){
    var fab = document.getElementById('ig-fab-main');
    var actions = document.querySelectorAll('.ig-fab-action');
    var isOpen = fab && fab.classList.contains('open');
    if(fab){ fab.classList.toggle('open', !isOpen); fab.setAttribute('aria-expanded', String(!isOpen)); }
    actions.forEach(function(a){ a.classList.toggle('show', !isOpen); });
  }
  window.igFabToggle = igFabToggle;
  /* Close FAB when clicking outside */
  document.addEventListener('click', function(e){
    var fab = document.getElementById('ig-contact-fab');
    var btn = document.getElementById('ig-fab-main');
    if(fab && btn && !fab.contains(e.target)){ btn.classList.remove('open'); btn.setAttribute('aria-expanded','false'); document.querySelectorAll('.ig-fab-action').forEach(function(a){ a.classList.remove('show'); }); }
  });

  /* MOBILE MENU */
  var mb = document.getElementById('mobileBtn');
  var mm = document.getElementById('mobileMenu');
  if(mb && mm) mb.addEventListener('click', function(){
    var open = mm.style.display === 'block';
    mm.style.display = open ? 'none' : 'block';
    mb.classList.toggle('open', !open);
  });

  /* CLOSE MOBILE MENU ON LINK CLICK */
  if(mm){ mm.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){ mm.style.display='none'; mb && mb.classList.remove('open'); });
  });}

  /* BACK-TO-TOP */
  var btt = document.getElementById('btt');
  if(btt){
    window.addEventListener('scroll', function(){
      btt.classList.toggle('show', window.scrollY > 400);
    },{passive:true});
    btt.addEventListener('click', function(){ window.scrollTo({top:0,behavior:'smooth'}); });
  }

  /* SCROLL-REVEAL */
  (function(){
    var els = document.querySelectorAll('.reveal,.reveal-l,.reveal-r,.reveal-scale,.reveal-fast');
    if(!els.length) return;
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }});
    },{threshold:0.1,rootMargin:'0px 0px -40px 0px'});
    els.forEach(function(el){ io.observe(el); });
  })();

  /* ANIMATED COUNTERS */
  (function(){
    function animCount(el){
      var raw = el.getAttribute('data-target') || el.textContent;
      var prefix = raw.match(/^[₹$€£]*/)[0];
      var suffix = raw.replace(/^[₹$€£\d,.\s]+/,'');
      var num = parseFloat(raw.replace(/[^0-9.]/g,'')) || 0;
      if(!num){ return; }
      var start = 0, dur = 1600, step = 16;
      var t = setInterval(function(){
        start += step;
        var p = Math.min(start/dur, 1);
        var ease = 1 - Math.pow(1-p, 3);
        var cur = Math.round(ease * num * 10) / 10;
        el.textContent = prefix + (Number.isInteger(cur) ? cur.toLocaleString('en-IN') : cur.toLocaleString('en-IN')) + suffix;
        if(p >= 1){ el.textContent = raw; clearInterval(t); }
      }, step);
    }
    var counters = document.querySelectorAll('.count-up');
    if(!counters.length) return;
    var io2 = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ animCount(e.target); io2.unobserve(e.target); }
      });
    },{threshold:0.5});
    counters.forEach(function(c){ io2.observe(c); });
  })();

  /* HERO CAROUSEL */
  var track = document.querySelector('.car-track');
  if(track){
    var slides = Array.from(track.querySelectorAll('.car-slide'));
    var dots   = Array.from(document.querySelectorAll('.c-dot'));
    var pb     = document.querySelector('.car-pb');
    var ct     = document.querySelector('.car-ct');
    var cur    = 0, DELAY = 5800, tmr, el = 0, step = 55;

    function go(n){
      slides[cur].classList.remove('on');
      if(dots[cur]) dots[cur].classList.remove('on');
      cur = ((n % slides.length) + slides.length) % slides.length;
      track.style.transform = 'translateX(-'+(cur*100)+'%)';
      slides[cur].classList.add('on');
      if(dots[cur]) dots[cur].classList.add('on');
      if(ct) ct.innerHTML = '<b>'+(cur+1)+'</b> / '+slides.length;
      startPB();
    }
    function startPB(){
      clearInterval(tmr); el = 0;
      if(pb){ pb.style.transition='none'; pb.style.width='0'; }
      tmr = setInterval(function(){
        el += step;
        var p = Math.min((el/DELAY)*100, 100);
        if(pb){ pb.style.transition='none'; pb.style.width=p+'%'; }
        if(el >= DELAY) go(cur+1);
      }, step);
    }
    slides[0].classList.add('on');
    if(dots[0]) dots[0].classList.add('on');
    if(ct) ct.innerHTML = '<b>1</b> / '+slides.length;
    startPB();

    var pp = document.querySelector('.car-prev');
    var np = document.querySelector('.car-next');
    if(pp) pp.addEventListener('click', function(){ go(cur-1); });
    if(np) np.addEventListener('click', function(){ go(cur+1); });
    dots.forEach(function(d,i){ d.addEventListener('click', function(){ go(i); }); });

    var sx = 0;
    track.addEventListener('touchstart', function(e){ sx = e.touches[0].clientX; }, {passive:true});
    track.addEventListener('touchend',   function(e){ var dx = e.changedTouches[0].clientX - sx; if(Math.abs(dx)>45) go(cur+(dx<0?1:-1)); }, {passive:true});
  }

  /* FORM UX — AJAX handler for enquiry/subscribe forms only.
     Auth forms (/api/auth/*) submit natively so the browser follows the redirect. */
  document.querySelectorAll('.ig-form').forEach(function(form){
    var action = form.getAttribute('action') || '';
    // Skip auth forms — let browser handle redirect natively
    if(action.indexOf('/api/auth') !== -1) return;
    form.addEventListener('submit', async function(e){
      e.preventDefault();
      var btn = form.querySelector('[type=submit]');
      if(!btn) return;
      var orig = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-circle-notch fa-spin" style="margin-right:.4rem;"></i>Sending\u2026';
      btn.disabled = true;
      try {
        var fd = new FormData(form);
        var res = await fetch(action || '/api/enquiry', {method:'POST', body:fd});
        btn.innerHTML = '<i class="fas fa-check" style="margin-right:.4rem;"></i>Submitted \u2014 We will be in touch';
        btn.style.cssText += ';background:#15803d!important;border-color:#15803d!important;';
        setTimeout(function(){ btn.innerHTML=orig; btn.disabled=false; btn.style.background=''; btn.style.borderColor=''; }, 4500);
      } catch(err){
        btn.innerHTML = orig; btn.disabled = false;
        alert('Error. Please email info@indiagully.com directly.');
      }
    });
  });

  /* ── MODAL SYSTEM ─────────────────────────────────────────────────────────
     Usage:
       openModal('modal-id')   — shows the overlay + panel
       closeModal('modal-id')  — hides it
     Each modal must have:
       <div id="modal-id" class="ig-modal">
         <div class="ig-modal-box"> … <button onclick="closeModal('modal-id')">×</button> </div>
       </div>
  ──────────────────────────────────────────────────────────────────────── */
  window.openModal = function(id){
    var m = document.getElementById(id);
    if(m){ m.style.display='flex'; document.body.style.overflow='hidden'; }
  };
  window.closeModal = function(id){
    var m = document.getElementById(id);
    if(m){ m.style.display='none'; document.body.style.overflow=''; }
  };
  // Close on backdrop click
  document.addEventListener('click', function(e){
    var t = e.target;
    if(t && t.classList && t.classList.contains('ig-modal')){
      t.style.display='none';
      document.body.style.overflow='';
    }
  });

  /* ── TOAST NOTIFICATIONS ──────────────────────────────────────────────── */
  window.igToast = function(msg, type){
    var el = document.createElement('div');
    el.style.cssText = 'position:fixed;bottom:1.5rem;right:1.5rem;z-index:9999;background:'+(type==='error'?'#dc2626':type==='warn'?'#d97706':'#15803d')+';color:#fff;padding:.75rem 1.25rem;font-size:.82rem;font-weight:500;box-shadow:0 8px 32px rgba(0,0,0,.25);max-width:360px;line-height:1.5;display:flex;align-items:center;gap:.6rem;';
    var icon = document.createElement('i');
    icon.className = 'fas fa-'+(type==='error'?'exclamation-circle':type==='warn'?'exclamation-triangle':'check-circle');
    icon.style.flexShrink = '0';
    var txt = document.createElement('span');
    txt.textContent = msg;
    el.appendChild(icon);
    el.appendChild(txt);
    document.body.appendChild(el);
    setTimeout(function(){ el.style.transition='opacity .4s'; el.style.opacity='0'; setTimeout(function(){ el.remove(); },400); }, 3500);
  };

  /* ── INLINE PANEL TOGGLE ──────────────────────────────────────────────── */
  window.togglePanel = function(id){
    var p = document.getElementById(id);
    if(!p) return;
    // For elements hidden by CSS class, getComputedStyle gives 'none'
    var computed = window.getComputedStyle(p).display;
    var isHidden = computed === 'none';
    if(isHidden){
      // Set appropriate display type: table-row for TR elements, block for others
      p.style.display = (p.tagName === 'TR') ? 'table-row' : 'block';
    } else {
      p.style.display = 'none';
    }
  };

  /* ── CONFIRM ACTION ───────────────────────────────────────────────────── */
  window.igConfirm = function(msg, cb){
    var uid = 'igc_'+Date.now();
    var overlay = document.createElement('div');
    overlay.style.cssText='position:fixed;inset:0;z-index:9998;background:rgba(0,0,0,.55);display:flex;align-items:center;justify-content:center;padding:1rem;';
    overlay.innerHTML='<div style="background:#fff;padding:2rem;max-width:420px;width:100%;box-shadow:0 20px 60px rgba(0,0,0,.35);">'
      +'<div style="display:flex;align-items:flex-start;gap:.875rem;margin-bottom:1.5rem;">'
      +'<div style="width:40px;height:40px;background:#fffbeb;border:1.5px solid #fde68a;display:flex;align-items:center;justify-content:center;flex-shrink:0;">'
      +'<i class="fas fa-exclamation-triangle" style="color:#d97706;font-size:.9rem;"></i></div>'
      +'<p style="font-size:.9rem;color:#111;line-height:1.65;padding-top:.2rem;">'+msg+'</p></div>'
      +'<div style="display:flex;gap:.75rem;justify-content:flex-end;">'
      +'<button id="'+uid+'No" style="padding:.55rem 1.25rem;background:#f1f5f9;border:1px solid #e2e8f0;font-size:.82rem;cursor:pointer;font-weight:500;color:#444;">Cancel</button>'
      +'<button id="'+uid+'Yes" style="padding:.55rem 1.25rem;background:#B8960C;color:#fff;border:none;font-size:.82rem;cursor:pointer;font-weight:600;letter-spacing:.05em;">Confirm</button>'
      +'</div></div>';
    document.body.appendChild(overlay);
    overlay.querySelector('#'+uid+'No').addEventListener('click',function(){ overlay.remove(); });
    overlay.querySelector('#'+uid+'Yes').addEventListener('click',function(){ overlay.remove(); if(cb) cb(); });
    // Close on backdrop
    overlay.addEventListener('click',function(e){ if(e.target===overlay){ overlay.remove(); } });
  };

  /* ── FILE DOWNLOAD SIMULATION ─────────────────────────────────────────── */
  window.igDownload = function(filename, msg){
    igToast(msg || ('Downloading '+filename+' …'), 'success');
  };

  /* ── SIGN OUT ─────────────────────────────────────────────────────────── */
  window.igSignOut = function(portal){
    fetch('/api/auth/logout',{method:'POST',credentials:'include'})
      .catch(function(){})
      .finally(function(){ location.href='/portal/'+(portal||''); });
  };

  /* ── VIEW PDF SIMULATION ──────────────────────────────────────────────── */
  window.igViewPDF = function(filename, msg){
    igToast(msg || ('Opening '+filename+' in viewer …'), 'success');
  };

  /* ── MODAL DIALOG ─────────────────────────────────────────────────────── */
  window.igModal = function(title, bodyHtml){
    var uid = 'igm_'+Date.now();
    var overlay = document.createElement('div');
    overlay.id = uid;
    overlay.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.6);display:flex;align-items:center;justify-content:center;padding:1.5rem;';
    var closeId = uid + '_close';
    var closeId2 = uid + '_close2';
    overlay.innerHTML = '<div style="background:#fff;max-width:680px;width:100%;max-height:80vh;display:flex;flex-direction:column;box-shadow:0 24px 64px rgba(0,0,0,.4);">'
      + '<div style="padding:1.25rem 1.5rem;border-bottom:1px solid #e5e7eb;display:flex;align-items:center;justify-content:space-between;background:#1A3A6B;">'
      + '<h3 style="font-size:.9rem;font-weight:700;color:#fff;letter-spacing:.04em;margin:0;">'+title+'</h3>'
      + '<button id="'+closeId+'" style="background:none;border:none;color:rgba(255,255,255,.7);font-size:1.1rem;cursor:pointer;padding:.2rem .4rem;line-height:1;">&times;</button>'
      + '</div>'
      + '<div style="padding:1.5rem;overflow-y:auto;font-size:.82rem;color:#374151;line-height:1.7;">'+bodyHtml+'</div>'
      + '<div style="padding:.875rem 1.5rem;border-top:1px solid #e5e7eb;display:flex;justify-content:flex-end;">'
      + '<button id="'+closeId2+'" style="padding:.5rem 1.25rem;background:#1A3A6B;color:#fff;border:none;font-size:.8rem;font-weight:600;cursor:pointer;letter-spacing:.04em;">Close</button>'
      + '</div></div>';
    document.body.appendChild(overlay);
    var btnClose = document.getElementById(closeId);
    var btnClose2 = document.getElementById(closeId2);
    if(btnClose)  btnClose.addEventListener('click',  function(){ overlay.remove(); });
    if(btnClose2) btnClose2.addEventListener('click', function(){ overlay.remove(); });
    overlay.addEventListener('click', function(e){ if(e.target===overlay) overlay.remove(); });
  };

  /* ── DOCUMENT WATERMARK ───────────────────────────────────────────────── */
  window.igWatermark = function(docEl, userLabel){
    if(!docEl) return;
    userLabel = userLabel || 'CONFIDENTIAL — India Gully';
    var wm = document.createElement('div');
    wm.style.cssText = 'position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:1;';
    for(var y=0;y<6;y++){for(var x=0;x<4;x++){
      var s=document.createElement('span');
      s.style.cssText='position:absolute;left:'+(x*26)+'%;top:'+(y*18)+'%;transform:rotate(-30deg);font-size:.65rem;color:rgba(0,0,0,.08);font-weight:700;white-space:nowrap;user-select:none;letter-spacing:.06em;';
      s.textContent=userLabel; wm.appendChild(s);
    }}
    docEl.style.position='relative'; docEl.appendChild(wm);
  };

  /* ── DPDP CONSENT BANNER v3 — L6 upgrade: per-purpose toggles + withdraw link ── */
  /* Hooks to POST /api/dpdp/consent/record for granular D1-backed consent.          */
  (function(){
    var BANNER_KEY='ig_dpdp_consent_v3';
    if(localStorage.getItem(BANNER_KEY)) return;
    var path=window.location.pathname;
    // Skip login/auth pages — only show on dashboard/app routes
    var isLoginPage=(path==='/admin'||path==='/portal'||path==='/portal/client'
      ||path==='/portal/employee'||path==='/portal/board'||path.endsWith('/login'));
    if(isLoginPage) return;

    var banner=document.createElement('div');
    banner.id='dpdp-banner';
    banner.setAttribute('role','dialog');
    banner.setAttribute('aria-modal','true');
    banner.setAttribute('aria-label','DPDP Data Consent Notice');
    banner.style.cssText='position:fixed;bottom:0;left:0;right:0;z-index:9800;'
      +'background:#0A0A0A;border-top:2px solid var(--gold,#B8960C);'
      +'padding:1rem 1.5rem;display:flex;align-items:flex-start;'
      +'gap:1.25rem;flex-wrap:wrap;box-shadow:0 -4px 30px rgba(0,0,0,.6);';

    banner.innerHTML=''
      +'<div style="flex:1;min-width:260px;">'
        +'<div style="font-size:.75rem;font-weight:700;color:#fff;margin-bottom:.35rem;letter-spacing:.06em;">'
          +'&#x1F512; DPDP Act 2023 &mdash; Data Consent &nbsp;'
          +'<span style="font-size:.62rem;font-weight:400;color:rgba(255,255,255,.6);letter-spacing:0;">v3</span>'
        +'</div>'
        +'<div style="font-size:.72rem;color:rgba(255,255,255,.55);line-height:1.6;">'
          +'India Gully processes personal data under the '
          +'<strong style="color:rgba(255,255,255,.8);">Digital Personal Data Protection Act 2023</strong>. '
          +'Essential processing is mandatory. Choose optional purposes below. '
          +'<a href="/legal/privacy" style="color:var(--gold,#B8960C);text-decoration:underline;">Privacy Policy</a>'
          +'&nbsp;|&nbsp;<a href="mailto:dpo@indiagully.com" style="color:var(--gold,#B8960C);text-decoration:underline;">DPO</a>'
        +'</div>'
        // Per-purpose toggle row
        +'<div style="margin-top:.55rem;display:flex;gap:.875rem;flex-wrap:wrap;align-items:center;">'
          +'<label style="display:flex;align-items:center;gap:.35rem;font-size:.68rem;color:rgba(255,255,255,.55);cursor:not-allowed;" title="Required for platform operation">'
            +'<input type="checkbox" checked disabled style="accent-color:var(--gold,#B8960C);width:13px;height:13px;"> Essential (required)'
          +'</label>'
          +'<label id="lbl-analytics" style="display:flex;align-items:center;gap:.35rem;font-size:.68rem;color:rgba(255,255,255,.7);cursor:pointer;" title="Usage analytics and platform improvement">'
            +'<input type="checkbox" id="dpdp-chk-analytics" style="accent-color:var(--gold,#B8960C);width:13px;height:13px;"> Analytics'
          +'</label>'
          +'<label id="lbl-marketing" style="display:flex;align-items:center;gap:.35rem;font-size:.68rem;color:rgba(255,255,255,.7);cursor:pointer;" title="Market research and advisory communications">'
            +'<input type="checkbox" id="dpdp-chk-marketing" style="accent-color:var(--gold,#B8960C);width:13px;height:13px;"> Marketing'
          +'</label>'
          +'<label id="lbl-third" style="display:flex;align-items:center;gap:.35rem;font-size:.68rem;color:rgba(255,255,255,.7);cursor:pointer;" title="SendGrid, Twilio, DocuSign, Razorpay integrations">'
            +'<input type="checkbox" id="dpdp-chk-third" style="accent-color:var(--gold,#B8960C);width:13px;height:13px;"> Third-Party Integrations'
          +'</label>'
          // Withdraw link — shown after consent is stored
          +'<span id="dpdp-withdraw-link" style="display:none;font-size:.62rem;color:rgba(255,255,255,.6);margin-left:auto;">'
            +'<a id="dpdp-do-withdraw" href="#" style="color:rgba(184,150,12,.55);text-decoration:underline;">Withdraw consent</a>'
          +'</span>'
        +'</div>'
      +'</div>'
      // Action buttons
      +'<div style="display:flex;gap:.625rem;flex-shrink:0;align-self:center;flex-wrap:wrap;">'
        +'<button id="dpdp-accept-all" style="background:var(--gold,#B8960C);color:#000;border:none;'
          +'padding:.5rem 1.25rem;font-size:.72rem;font-weight:700;cursor:pointer;letter-spacing:.06em;">'
          +'Accept All'
        +'</button>'
        +'<button id="dpdp-save-pref" style="background:transparent;border:1px solid rgba(184,150,12,.5);'
          +'color:rgba(255,255,255,.7);padding:.5rem 1.25rem;font-size:.72rem;cursor:pointer;">'
          +'Save Preferences'
        +'</button>'
        +'<button id="dpdp-essential-only" style="background:transparent;border:1px solid rgba(255,255,255,.25);'
          +'color:rgba(255,255,255,.65);padding:.5rem .875rem;font-size:.68rem;cursor:pointer;">'
          +'Essential Only'
        +'</button>'
      +'</div>';

    document.body.appendChild(banner);

    /** Send granular consent to /api/dpdp/consent/record (L6 — replaces /api/dpdp/consent) */
    function sendConsentRecord(analytics, marketing, thirdParty){
      var uid = (typeof igSession !== 'undefined' && igSession && igSession.email)
        ? igSession.email : 'anonymous';
      try{
        fetch('/api/dpdp/consent/record',{
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({
            user_id:uid,
            analytics:analytics,
            marketing:marketing,
            third_party:thirdParty,
            banner_version:'v3',
            page:path,
          })
        }).catch(function(){});
      }catch(e){}
    }

    function hideBanner(analytics, marketing, thirdParty){
      var purposes=['essential'];
      if(analytics) purposes.push('analytics');
      if(marketing) purposes.push('marketing');
      if(thirdParty) purposes.push('third_party');
      var record={v:3,pref:purposes,analytics:analytics,marketing:marketing,
        third_party:thirdParty,ts:Date.now(),path:path};
      localStorage.setItem(BANNER_KEY,JSON.stringify(record));
      sendConsentRecord(analytics,marketing,thirdParty);
      banner.style.transition='transform .35s ease-in,opacity .35s';
      banner.style.transform='translateY(100%)';
      banner.style.opacity='0';
      setTimeout(function(){banner.remove();},360);
    }

    document.getElementById('dpdp-accept-all').onclick=function(){
      document.getElementById('dpdp-chk-analytics').checked=true;
      document.getElementById('dpdp-chk-marketing').checked=true;
      document.getElementById('dpdp-chk-third').checked=true;
      hideBanner(true,true,true);
      if(window.igToast) igToast('All data purposes accepted.','success');
    };
    document.getElementById('dpdp-save-pref').onclick=function(){
      var a=document.getElementById('dpdp-chk-analytics').checked;
      var m=document.getElementById('dpdp-chk-marketing').checked;
      var t=document.getElementById('dpdp-chk-third').checked;
      hideBanner(a,m,t);
      if(window.igToast) igToast('Data preferences saved.','success');
    };
    document.getElementById('dpdp-essential-only').onclick=function(){
      hideBanner(false,false,false);
      if(window.igToast) igToast('Only essential processing enabled.','info');
    };

    // Withdraw link handler — calls /api/dpdp/consent/withdraw
    document.getElementById('dpdp-do-withdraw').onclick=function(e){
      e.preventDefault();
      var uid = (typeof igSession !== 'undefined' && igSession && igSession.email)
        ? igSession.email : 'anonymous';
      fetch('/api/dpdp/consent/withdraw',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({user_id:uid,purposes:['analytics','marketing','third_party']})
      }).then(function(r){return r.json();}).then(function(d){
        if(d.withdrawal_ref){
          localStorage.removeItem(BANNER_KEY);
          if(window.igToast) igToast('Consent withdrawn (ref: '+d.withdrawal_ref+'). Page will reload.','info');
          setTimeout(function(){location.reload();},1800);
        }
      }).catch(function(){});
    };
  })();

  /* ── DPDP PREFERENCES DRAWER — allows re-managing consent after banner dismissed ── */
  window.igOpenDpdpPreferences=function(){
    var existing=document.getElementById('dpdp-pref-drawer');
    if(existing){existing.remove();return;}
    var stored=localStorage.getItem('ig_dpdp_consent_v3');
    var rec=stored?JSON.parse(stored):{analytics:false,marketing:false,third_party:false};
    var drawer=document.createElement('div');
    drawer.id='dpdp-pref-drawer';
    drawer.setAttribute('role','dialog');
    drawer.setAttribute('aria-label','Manage Data Preferences');
    drawer.style.cssText='position:fixed;bottom:0;right:0;width:340px;z-index:9900;'
      +'background:#111;border:1px solid rgba(184,150,12,.3);border-bottom:none;'
      +'padding:1.25rem;box-shadow:-4px -4px 24px rgba(0,0,0,.7);';
    drawer.innerHTML=''
      +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">'
        +'<span style="font-size:.78rem;font-weight:700;color:#fff;letter-spacing:.06em;">&#x1F512; Data Preferences</span>'
        +'<button onclick="document.getElementById(&quot;dpdp-pref-drawer&quot;).remove()" '
          +'style="background:none;border:none;color:rgba(255,255,255,.4);font-size:1.1rem;cursor:pointer;">&times;</button>'
      +'</div>'
      +'<div style="font-size:.7rem;color:rgba(255,255,255,.7);margin-bottom:.875rem;line-height:1.6;">'
        +'Manage your data consent under DPDP Act 2023. Changes take effect immediately.'
      +'</div>'
      +'<div style="display:flex;flex-direction:column;gap:.6rem;margin-bottom:1rem;">'
        +'<label style="display:flex;align-items:center;justify-content:space-between;font-size:.73rem;color:rgba(255,255,255,.6);">'
          +'<span>&#x2714;&#xFE0F; Essential (required)</span>'
          +'<input type="checkbox" checked disabled style="accent-color:var(--gold,#B8960C);">'
        +'</label>'
        +'<label style="display:flex;align-items:center;justify-content:space-between;font-size:.73rem;color:rgba(255,255,255,.75);cursor:pointer;" title="Platform usage analytics">'
          +'<span>&#x1F4CA; Analytics</span>'
          +'<input type="checkbox" id="dpdp-d-analytics" '+(rec.analytics?'checked':'')+' style="accent-color:var(--gold,#B8960C);">'
        +'</label>'
        +'<label style="display:flex;align-items:center;justify-content:space-between;font-size:.73rem;color:rgba(255,255,255,.75);cursor:pointer;" title="Advisory communications and market research">'
          +'<span>&#x1F4E3; Marketing</span>'
          +'<input type="checkbox" id="dpdp-d-marketing" '+(rec.marketing?'checked':'')+' style="accent-color:var(--gold,#B8960C);">'
        +'</label>'
        +'<label style="display:flex;align-items:center;justify-content:space-between;font-size:.73rem;color:rgba(255,255,255,.75);cursor:pointer;" title="SendGrid, Twilio, DocuSign, Razorpay">'
          +'<span>&#x1F517; Third-Party Integrations</span>'
          +'<input type="checkbox" id="dpdp-d-third" '+(rec.third_party?'checked':'')+' style="accent-color:var(--gold,#B8960C);">'
        +'</label>'
      +'</div>'
      +'<div style="display:flex;gap:.5rem;">'
        +'<button id="dpdp-d-save" style="flex:1;background:var(--gold,#B8960C);color:#000;border:none;'
          +'padding:.5rem;font-size:.72rem;font-weight:700;cursor:pointer;">Save Changes</button>'
        +'<button id="dpdp-d-withdraw" style="background:transparent;border:1px solid rgba(255,255,255,.25);'
          +'color:rgba(255,255,255,.65);padding:.5rem .75rem;font-size:.68rem;cursor:pointer;">Withdraw All</button>'
      +'</div>'
      +'<div style="margin-top:.6rem;font-size:.62rem;color:rgba(255,255,255,.5);">'
        +'Last updated: '+(stored?new Date(rec.ts).toLocaleDateString('en-IN'):'not set')
      +'</div>';
    document.body.appendChild(drawer);

    document.getElementById('dpdp-d-save').onclick=function(){
      var a=document.getElementById('dpdp-d-analytics').checked;
      var m=document.getElementById('dpdp-d-marketing').checked;
      var t=document.getElementById('dpdp-d-third').checked;
      var uid=(typeof igSession!=='undefined'&&igSession&&igSession.email)?igSession.email:'anonymous';
      var purposes=['essential'];
      if(a) purposes.push('analytics');
      if(m) purposes.push('marketing');
      if(t) purposes.push('third_party');
      localStorage.setItem('ig_dpdp_consent_v3',JSON.stringify(
        {v:3,pref:purposes,analytics:a,marketing:m,third_party:t,ts:Date.now()}));
      fetch('/api/dpdp/consent/record',{method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({user_id:uid,analytics:a,marketing:m,third_party:t,banner_version:'v3-drawer'})
      }).catch(function(){});
      drawer.remove();
      if(window.igToast) igToast('Data preferences updated.','success');
    };
    document.getElementById('dpdp-d-withdraw').onclick=function(){
      var uid=(typeof igSession!=='undefined'&&igSession&&igSession.email)?igSession.email:'anonymous';
      fetch('/api/dpdp/consent/withdraw',{method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({user_id:uid,purposes:['analytics','marketing','third_party']})
      }).then(function(r){return r.json();}).then(function(d){
        localStorage.removeItem('ig_dpdp_consent_v3');
        drawer.remove();
        if(window.igToast) igToast('Consent withdrawn ('+d.withdrawal_ref+').','info');
        setTimeout(function(){location.reload();},1500);
      }).catch(function(){drawer.remove();});
    };
  };

  /* ── DARK MODE ────────────────────────────────────────────────────────── */
  (function(){
    var DM_KEY = 'ig_dark_mode';
    var root = document.documentElement;
    function applyDark(on){
      root.setAttribute('data-theme', on ? 'dark' : 'light');
      var icon = document.getElementById('dark-icon');
      if(icon){ icon.className = on ? 'fas fa-sun' : 'fas fa-moon'; }
    }
    var saved = localStorage.getItem(DM_KEY);
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyDark(saved ? saved==='1' : prefersDark);
    window.igToggleDark = function(){
      var isDark = root.getAttribute('data-theme')==='dark';
      var next = !isDark;
      applyDark(next);
      localStorage.setItem(DM_KEY, next?'1':'0');
      igToast(next?'Dark mode enabled':'Light mode enabled','success');
    };
  })();

  /* ── HINDI / ENGLISH TOGGLE ─────────────────────────────────────────── */
  (function(){
    var LANG_KEY = 'ig_lang';
    var translations = {
      'Home':'होम','About':'परिचय','Mandates':'मैंडेट','Contact':'संपर्क',
      'Submit Mandate':'मैंडेट सबमिट करें','Portals':'पोर्टल',
      'Advisory':'सलाह','Insights':'अंतर्दृष्टि'
    };
    var isHindi = false;
    window.igToggleLang = function(){
      isHindi = !isHindi;
      var lbl = document.getElementById('lang-label');
      if(lbl) lbl.textContent = isHindi ? 'EN' : 'हिंदी';
      localStorage.setItem(LANG_KEY, isHindi?'hi':'en');
      igToast(isHindi ? 'हिंदी मोड सक्रिय — नेविगेशन लेबल अनुवादित' : 'English mode active','success');
    };
    var saved = localStorage.getItem(LANG_KEY);
    if(saved === 'hi'){ window.igToggleLang && window.igToggleLang(); }
  })();

  /* ── GUIDED TOUR ─────────────────────────────────────────────────────── */
  window.igStartTour = function(){
    var steps = [
      {sel:'#mainNav',         title:'Navigation',       text:'Use the top nav to access Advisory, Mandates, Insights, and the secure Portals.'},
      {sel:'.btn-g',           title:'Submit Mandate',   text:'Submit your advisory brief here. Our team responds within 24 hours.'},
      {sel:'[aria-label="India Gully — Home"]', title:'India Gully Logo', text:'Click the logo to return to the home page at any time.'},
    ];
    var step = 0;
    function showStep(i){
      var overlay = document.getElementById('ig-tour-overlay');
      if(overlay) overlay.remove();
      if(i >= steps.length){ igToast('Tour complete! ✓','success'); return; }
      var s = steps[i];
      var el = document.querySelector(s.sel);
      if(!el){ showStep(i+1); return; }
      var rect = el.getBoundingClientRect();
      var ov = document.createElement('div');
      ov.id = 'ig-tour-overlay';
      ov.style.cssText = 'position:fixed;inset:0;z-index:9990;pointer-events:none;';
      ov.innerHTML = '<div style="position:fixed;left:'+(rect.left-8)+'px;top:'+(rect.top-8)+'px;width:'+(rect.width+16)+'px;height:'+(rect.height+16)+'px;border:2px solid var(--gold);border-radius:4px;box-shadow:0 0 0 9999px rgba(0,0,0,.5);pointer-events:none;"></div>'
        +'<div style="position:fixed;left:'+Math.min(rect.left,window.innerWidth-300)+'px;top:'+(rect.bottom+14)+'px;background:#fff;border-top:3px solid var(--gold);padding:1rem 1.25rem;width:280px;box-shadow:0 8px 32px rgba(0,0,0,.2);pointer-events:all;z-index:9991;">'
        +'<div style="font-size:.72rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--gold);margin-bottom:.3rem;">Step '+(i+1)+' of '+steps.length+': '+s.title+'</div>'
        +'<div style="font-size:.82rem;color:#1e293b;line-height:1.5;margin-bottom:.75rem;">'+s.text+'</div>'
        +'<div style="display:flex;gap:.5rem;">'
        +(i>0?'<button onclick="window.igTourStep('+(i-1)+')" style="background:none;border:1px solid #cbd5e1;padding:.3rem .75rem;font-size:.72rem;cursor:pointer;">← Back</button>':'')
        +'<button onclick="window.igTourStep('+(i+1)+')" style="background:var(--gold);color:#fff;border:none;padding:.3rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;">'+(i===steps.length-1?'Finish':'Next →')+'</button>'
        +'<button onclick="document.getElementById(&quot;ig-tour-overlay&quot;).remove();igToast(&quot;Tour skipped&quot;,&quot;info&quot;)" style="background:none;border:none;font-size:.68rem;color:#94a3b8;cursor:pointer;margin-left:auto;">Skip</button>'
        +'</div></div>';
      document.body.appendChild(ov);
    }
    window.igTourStep = showStep;
    showStep(0);
  };

  /* ── LIGHTBOX ─────────────────────────────────────────────────────────── */
  (function(){
    var lb = document.getElementById('ig-lightbox');
    var lbImg = document.getElementById('ig-lightbox-img');
    var lbCap = document.getElementById('ig-lightbox-caption');
    var lbImages = [];
    var lbCurrent = 0;

    window.igLightboxOpen = function(images, index, captions){
      lbImages = images || [];
      lbCurrent = index || 0;
      if(!lb || !lbImg) return;
      lbImg.src = lbImages[lbCurrent] || '';
      if(lbCap) lbCap.textContent = captions ? captions[lbCurrent] || '' : (lbCurrent+1)+' / '+lbImages.length;
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    };
    window.igLightboxClose = function(){
      if(lb) lb.classList.remove('open');
      document.body.style.overflow = '';
    };
    window.igLightboxNav = function(dir){
      lbCurrent = ((lbCurrent + dir) % lbImages.length + lbImages.length) % lbImages.length;
      if(lbImg) lbImg.src = lbImages[lbCurrent];
      if(lbCap) lbCap.textContent = (lbCurrent+1)+' / '+lbImages.length;
    };
    // Keyboard nav
    document.addEventListener('keydown', function(e){
      if(!lb || !lb.classList.contains('open')) return;
      if(e.key==='Escape') window.igLightboxClose();
      if(e.key==='ArrowLeft') window.igLightboxNav(-1);
      if(e.key==='ArrowRight') window.igLightboxNav(1);
    });
    // Click outside image
    if(lb) lb.addEventListener('click', function(e){
      if(e.target === lb) window.igLightboxClose();
    });
  })();

  /* ── STICKY STATS ─────────────────────────────────────────────────────── */
  (function(){
    var ss = document.getElementById('stickyStats');
    var hs = document.getElementById('homeStats');
    if(!ss || !hs) return;
    /* Only show after user has actually scrolled — guards against
       the IO firing on page-load when homeStats is below-the-fold */
    var hasScrolled = false;
    window.addEventListener('scroll', function(){ hasScrolled = true; }, {passive:true, once:true});
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        var show = !e.isIntersecting && hasScrolled;
        ss.classList.toggle('visible', show);
        ss.setAttribute('aria-hidden', show ? 'false' : 'true');
      });
    },{threshold:0, rootMargin:'-80px 0px 0px 0px'});
    io.observe(hs);
  })();

  /* ── CMD+K SEARCH PALETTE ────────────────────────────────────────────── */
  (function(){
    /* ---- static search index ---- */
    var IG_INDEX = [
      /* Pages */
      {type:'page', icon:'fa-home',         title:'Home',                         url:'/'},
      {type:'page', icon:'fa-info-circle',  title:'About India Gully',            url:'/about'},
      {type:'page', icon:'fa-briefcase',    title:'Active Mandates',              url:'/listings'},
      {type:'page', icon:'fa-chart-line',   title:'Investor Relations',           url:'/invest'},
      {type:'page', icon:'fa-stream',        title:'Pipeline Dashboard',           url:'/pipeline'},
      {type:'page', icon:'fa-envelope',     title:'Contact Us',                   url:'/contact'},
      {type:'page', icon:'fa-lightbulb',    title:'Insights & Research',          url:'/insights'},
      {type:'page', icon:'fa-star',         title:'Track Record',                 url:'/works'},
      {type:'page', icon:'fa-concierge-bell',title:'Advisory Services',           url:'/services'},
      {type:'page', icon:'fa-utensils',     title:'HORECA Solutions',             url:'/horeca'},
      {type:'page', icon:'fa-book',         title:'Resources & Downloads',        url:'/resources'},
      {type:'page', icon:'fa-users',        title:'Testimonials',                 url:'/testimonials'},
      {type:'page', icon:'fa-user-tie',     title:'Admin Dashboard',              url:'/admin'},
      /* Mandates */
      {type:'mandate', icon:'fa-building',  title:'Prism Tower — Gurugram',           url:'/listings/prism-tower-gurgaon',           meta:'₹400 Cr · Mixed-Use · Gurugram'},
      {type:'mandate', icon:'fa-building',  title:'Belcibo Hospitality Platform',     url:'/listings/belcibo-hospitality-platform',  meta:'₹100 Cr · F&B Platform · Delhi NCR & Goa'},
      {type:'mandate', icon:'fa-hotel',     title:'Hotel Rajshree Chandigarh',        url:'/listings/hotel-rajshree-chandigarh',     meta:'₹70 Cr · Boutique Hotel · Chandigarh'},
      {type:'mandate', icon:'fa-landmark',  title:'WelcomHeritage Santa Roza Kasauli',url:'/listings/welcomheritage-santa-roza-kasauli', meta:'₹45 Cr · Heritage Resort · Kasauli'},
      {type:'mandate', icon:'fa-landmark',  title:'Heritage Hotel Jaipur',            url:'/listings/heritage-hotel-jaipur',         meta:'₹35 Cr · Heritage · Jaipur'},
      {type:'mandate', icon:'fa-tree',      title:'Maple Resort Chail',               url:'/listings/maple-resort-chail',            meta:'₹30 Cr · Mountain Resort · Chail'},
      {type:'mandate', icon:'fa-city',      title:'Ambience Tower North Delhi',       url:'/listings/ambience-tower-north-delhi',    meta:'₹120 Cr · Grade-A Commercial · Rohini'},
      {type:'mandate', icon:'fa-city',      title:'Sawasdee JLG Noida',              url:'/listings/sawasdee-jlg-noida',           meta:'₹85 Cr · Mixed-Use · Noida'},
      /* Articles */
      {type:'article', icon:'fa-newspaper', title:'India Real Estate 2026: Commercial & Hospitality Convergence', url:'/insights/india-realty-2026-outlook',          meta:'Real Estate · 2026'},
      {type:'article', icon:'fa-newspaper', title:'Navigating the Entertainment Zone Regulatory Landscape',       url:'/insights/entertainment-zone-regulatory-india', meta:'Entertainment · Regulatory'},
      {type:'article', icon:'fa-newspaper', title:'Building Resilient HORECA Supply Chains in Tier 2 India',     url:'/insights/horeca-tier2-supply-chain',           meta:'HORECA · Supply Chain'},
      {type:'article', icon:'fa-newspaper', title:'IBC 2025 Update: Hospitality Asset Resolution Trends',        url:'/insights/ibc-distressed-hospitality-2025',     meta:'Debt · IBC · 2025'},
      {type:'article', icon:'fa-newspaper', title:'The Mall-Hotel-Office Trinity: Mixed-Use Integration',         url:'/insights/mall-mixed-use-integration',          meta:'Real Estate · Mixed-Use'},
      {type:'article', icon:'fa-newspaper', title:'Greenfield Mid-Scale Hotel Opportunity 2025-27',              url:'/insights/greenfield-midscale-hotels',          meta:'Hospitality · Greenfield'},
      {type:'article', icon:'fa-newspaper', title:'India Hospitality Market Outlook 2024-2025',                  url:'/insights/india-hospitality-2024',              meta:'Hospitality · Market Outlook'},
      {type:'article', icon:'fa-newspaper', title:'Rise of Integrated Entertainment Destinations in India',       url:'/insights/entertainment-destinations-india',    meta:'Entertainment · FEC'},
      {type:'article', icon:'fa-newspaper', title:'HORECA Procurement Strategy for New Hotel Openings',          url:'/insights/horeca-procurement-strategy',         meta:'HORECA · Procurement'},
      {type:'article', icon:'fa-newspaper', title:'Distressed Hotel Assets: Opportunities in IBC Landscape',     url:'/insights/debt-special-situations-hospitality', meta:'Debt · Distressed'},
      {type:'article', icon:'fa-newspaper', title:'Mall Leasing Strategy in the Experience Economy',             url:'/insights/retail-leasing-malls-india',          meta:'Retail · Leasing'},
      {type:'article', icon:'fa-newspaper', title:'Greenfield Hotel Development in Tier 2 & 3 India',           url:'/insights/greenfield-hotel-development',        meta:'Hospitality · Tier 2'},
      {type:'article', icon:'fa-newspaper', title:'India Retail Leasing 2026: Premiumisation & New Mall Hierarchy',url:'/insights/retail-leasing-trends-india-2026',  meta:'Retail · 2026'},
      {type:'article', icon:'fa-newspaper', title:'Distressed Hospitality Assets in India 2026',                 url:'/insights/debt-special-situations-india-hospitality-2026', meta:'Debt · Special Situations'},
    ];

    var overlay  = document.getElementById('ig-search-overlay');
    var input    = document.getElementById('ig-search-input');
    var results  = document.getElementById('ig-search-results');
    var activeIdx = -1;

    function open(){
      if(!overlay) return;
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
      if(input){ input.value = ''; input.focus(); }
      if(results) results.innerHTML = '';
      activeIdx = -1;
      renderAll();
    }
    function close(){
      if(!overlay) return;
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    /* Show a short "featured" list when query is empty */
    function renderAll(){
      if(!results) return;
      var featured = IG_INDEX.filter(function(x){ return x.type==='mandate'; }).slice(0,5)
        .concat(IG_INDEX.filter(function(x){ return x.type==='page'; }).slice(0,4));
      render(featured, '');
    }

    function query(q){
      if(!q || !q.trim()){ renderAll(); return; }
      var lq = q.toLowerCase();
      var hits = IG_INDEX.filter(function(item){
        return (item.title + ' ' + (item.meta||'') + ' ' + item.url).toLowerCase().indexOf(lq) !== -1;
      }).slice(0, 10);
      render(hits, q);
    }

    function typeColor(t){
      if(t==='mandate') return '#B8960C';
      if(t==='article') return '#1A3A6B';
      return '#065F46';
    }
    function typeLabel(t){
      if(t==='mandate') return 'Mandate';
      if(t==='article') return 'Article';
      return 'Page';
    }

    function render(items, q){
      if(!results) return;
      activeIdx = -1;
      if(items.length === 0){
        results.innerHTML = '<div style="padding:2rem 1.25rem;text-align:center;font-size:.8rem;color:rgba(255,255,255,.3);">No results for <em style="color:rgba(255,255,255,.55)">&ldquo;'+q+'&rdquo;</em></div>';
        return;
      }
      var html = items.map(function(item, i){
        var accent = typeColor(item.type);
        var label  = typeLabel(item.type);
        var metaHtml = item.meta ? '<span style="font-size:.65rem;color:rgba(255,255,255,.3);margin-left:auto;white-space:nowrap;">'+item.meta+'</span>' : '';
        return '<a href="'+item.url+'" class="ig-sr-item" data-idx="'+i+'" style="display:flex;align-items:center;gap:.85rem;padding:.7rem 1.1rem;text-decoration:none;border-left:2px solid transparent;transition:background .14s,border-color .14s;" onmouseenter="igSearchHover('+i+')" onclick="igSearchClose()">'
          +'<i class="fas '+item.icon+'" style="font-size:.75rem;color:'+accent+';width:16px;text-align:center;flex-shrink:0;"></i>'
          +'<div style="flex:1;min-width:0;">'
          +'<div style="font-size:.82rem;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">'+item.title+'</div>'
          +'<div style="font-size:.6rem;color:rgba(255,255,255,.25);margin-top:.15rem;">'+item.url+'</div>'
          +'</div>'
          +metaHtml
          +'<span style="font-size:.55rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:'+accent+'22;color:'+accent+';border:1px solid '+accent+'44;padding:.1rem .45rem;flex-shrink:0;">'+label+'</span>'
          +'</a>';
      }).join('');
      results.innerHTML = html;
      if(items.length > 0) setActive(0);
    }

    function setActive(i){
      var items = results ? results.querySelectorAll('.ig-sr-item') : [];
      items.forEach(function(el, idx){
        el.style.background    = idx===i ? 'rgba(184,150,12,.08)' : '';
        el.style.borderColor   = idx===i ? 'var(--gold)' : 'transparent';
      });
      activeIdx = i;
    }

    function key(e){
      var items = results ? results.querySelectorAll('.ig-sr-item') : [];
      if(e.key === 'ArrowDown'){
        e.preventDefault();
        setActive(Math.min(activeIdx+1, items.length-1));
      } else if(e.key === 'ArrowUp'){
        e.preventDefault();
        setActive(Math.max(activeIdx-1, 0));
      } else if(e.key === 'Enter'){
        e.preventDefault();
        if(activeIdx >= 0 && items[activeIdx]){
          window.location.href = items[activeIdx].getAttribute('href');
        }
      } else if(e.key === 'Escape'){
        close();
      }
    }

    /* expose globally */
    window.igSearchOpen  = open;
    window.igSearchClose = close;
    window.igSearchQuery = query;
    window.igSearchKey   = key;
    window.igSearchHover = setActive;

    /* Keyboard shortcut: Ctrl+K / Cmd+K */
    document.addEventListener('keydown', function(e){
      if((e.ctrlKey || e.metaKey) && e.key === 'k'){
        e.preventDefault();
        if(overlay && overlay.classList.contains('open')) close(); else open();
      }
    });
  })();

})();
</script>`
