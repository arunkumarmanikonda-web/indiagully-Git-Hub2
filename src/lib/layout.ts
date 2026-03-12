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
<meta property="og:title" content="${title} — India Gully">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${ogImg}">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
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
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,300;1,9..40,400&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css">
<script src="https://cdn.tailwindcss.com"></script>
<script>
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
<!-- DARK MODE: early init to prevent flash of unstyled content -->
<script>
(function(){
  try{
    var s=localStorage.getItem('ig_dark_mode');
    var sys=window.matchMedia&&window.matchMedia('(prefers-color-scheme:dark)').matches;
    if(s?s==='1':sys) document.documentElement.setAttribute('data-theme','dark');
    else document.documentElement.setAttribute('data-theme','light');
  }catch(e){}
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
[data-theme="dark"]{
  --gold:#D4AE2A;--gold-pale:rgba(212,174,42,.08);
  --ink:#f1f5f9;--ink-muted:#94a3b8;--ink-soft:#cbd5e1;--ink-faint:#475569;
  --parch:#0a0a0f;--parch-dk:#111118;--border:rgba(255,255,255,.07);
  --surface:#141420;--surface-2:#1a1a28;
}
[data-theme="dark"] body{background:#0a0a0f;color:#f1f5f9;}
[data-theme="dark"] .sec-wh,[data-theme="dark"] .card,[data-theme="dark"] [style*="background:#fff"]{background:#141420!important;}
[data-theme="dark"] .sec-pc,[data-theme="dark"] .sec-pd{background:#111118!important;}
[data-theme="dark"] .am,[data-theme="dark"] .ig-tbl thead tr{background:#1a1a28!important;}
[data-theme="dark"] table.ig-tbl tbody tr{background:#141420;}
[data-theme="dark"] table.ig-tbl tbody tr:hover{background:#1a1a28;}
[data-theme="dark"] .ig-input,.ig-inp{background:#1a1a28;color:#f1f5f9;border-color:rgba(255,255,255,.1);}
[data-theme="dark"] .ig-panel{background:#1a1a28;border-color:rgba(255,255,255,.07);}
[data-theme="dark"] .why-card,[data-theme="dark"] .vg-cell{background:#141420!important;border-color:rgba(255,255,255,.06)!important;}
[data-theme="dark"] .mandate-card,[data-theme="dark"] .insight-card{background:#141420!important;border-color:rgba(255,255,255,.06)!important;}
[data-theme="dark"] .home-stat-cell,[data-theme="dark"] .ig-metric-box{background:#141420!important;border-color:rgba(255,255,255,.06)!important;}
[data-theme="dark"] .feature-card{background:#141420!important;border-color:rgba(255,255,255,.06)!important;}
[data-theme="dark"] .service-item{background:#141420!important;}
[data-theme="dark"] .ticker{background:rgba(184,150,12,.85)!important;}

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
  font-size:.75rem;font-weight:500;letter-spacing:.05em;
  color:rgba(255,255,255,.55);padding:.5rem 1rem;
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
@media(min-width:1024px){
  #nav-desktop-links{display:flex;align-items:center;gap:.15rem}
  #nav-desktop-right{display:flex;align-items:center;gap:.75rem}
  #mobileBtn{display:none}
  #mobileMenu{display:none!important}
}

/* ── HERO CAROUSEL ──────────────────────────── */
.car{position:relative;overflow:hidden;height:100vh;min-height:640px;max-height:1000px}
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

/* ── Back-to-top ─────────────────────────────── */
#btt{position:fixed;bottom:2rem;right:2rem;z-index:400;width:44px;height:44px;background:var(--gold);color:#fff;border:none;cursor:pointer;display:none;align-items:center;justify-content:center;font-size:.8rem;box-shadow:0 4px 20px rgba(184,150,12,.45),0 0 0 3px rgba(184,150,12,.12);transition:all var(--t-med);}
#btt:hover{transform:translateY(-4px);box-shadow:0 8px 30px rgba(184,150,12,.55);}
#btt.show{display:flex;}

/* ── Sticky stats bar ────────────────────────── */
#stickyStats{position:fixed;top:var(--nav-h);left:0;right:0;z-index:190;transform:translateY(-100%);transition:transform .38s cubic-bezier(.4,0,.2,1);background:rgba(6,6,6,.98);backdrop-filter:blur(20px);border-bottom:1px solid rgba(184,150,12,.15);}
#stickyStats.visible{transform:translateY(0);}
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
  background:var(--ink);padding:8rem 0 5.5rem;position:relative;overflow:hidden;
}
.hero-dk-grid{
  position:absolute;inset:0;
  background-image:linear-gradient(rgba(184,150,12,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.04) 1px,transparent 1px);
  background-size:80px 80px;pointer-events:none;
}
.hero-dk-radial{position:absolute;inset:0;background:radial-gradient(ellipse 60% 70% at 70% 50%,rgba(184,150,12,.05) 0%,transparent 55%);pointer-events:none;}
/* Brand logo cell */
.brand-cell{background:#fff;padding:1.35rem 1rem;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:96px;gap:.55rem;transition:background var(--t-fast);}
.brand-cell:hover{background:var(--parch);}


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
.reveal{opacity:0;transform:translateY(24px);transition:opacity .7s cubic-bezier(.4,0,.2,1),transform .7s cubic-bezier(.4,0,.2,1);}
.reveal.visible{opacity:1;transform:translateY(0);}
.reveal-l{opacity:0;transform:translateX(-24px);transition:opacity .7s cubic-bezier(.4,0,.2,1),transform .7s cubic-bezier(.4,0,.2,1);}
.reveal-l.visible{opacity:1;transform:translateX(0);}
.reveal-r{opacity:0;transform:translateX(24px);transition:opacity .7s cubic-bezier(.4,0,.2,1),transform .7s cubic-bezier(.4,0,.2,1);}
.reveal-r.visible{opacity:1;transform:translateX(0);}
.reveal-scale{opacity:0;transform:scale(.96);transition:opacity .65s cubic-bezier(.4,0,.2,1),transform .65s cubic-bezier(.4,0,.2,1);}
.reveal-scale.visible{opacity:1;transform:scale(1);}

/* ── Listing detail ──────────────────────────── */
.listing-detail-grid{display:grid;grid-template-columns:1fr 390px;gap:4rem;align-items:start;}
@media(max-width:900px){.listing-detail-grid{display:flex;flex-direction:column;gap:2.5rem;}}
.listing-detail-sidebar{position:sticky;top:calc(var(--nav-h) + 2rem);display:flex;flex-direction:column;gap:1.5rem;}
@media(max-width:900px){.listing-detail-sidebar{position:static;width:100%;}}

/* ── Highlights grid ─────────────────────────── */
.highlights-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);margin-bottom:2.5rem;}
@media(max-width:640px){.highlights-grid{grid-template-columns:repeat(2,1fr);}}

/* ── India Gully difference ──────────────────── */
.diff-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0;border:1px solid rgba(255,255,255,.06);}
@media(max-width:860px){.diff-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:480px){.diff-grid{grid-template-columns:1fr;}}
.diff-cell{padding:3rem 2.5rem;border-right:1px solid rgba(255,255,255,.06);transition:background var(--t-med);position:relative;overflow:hidden;}
.diff-cell::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(184,150,12,.4),transparent);opacity:0;transition:opacity var(--t-med);}
.diff-cell:hover{background:rgba(255,255,255,.025);}
.diff-cell:hover::after{opacity:1;}
@media(max-width:860px){.diff-cell:nth-child(2n){border-right:none;}.diff-cell:nth-child(1),.diff-cell:nth-child(2){border-bottom:1px solid rgba(255,255,255,.06);}}
@media(max-width:480px){.diff-cell{border-right:none!important;border-bottom:1px solid rgba(255,255,255,.06);}.diff-cell:last-child{border-bottom:none;}}

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
        {n:'₹10,000 Cr+',l:'Pipeline'},
        {n:'15+',        l:'Hotels'},
        {n:'30+',        l:'Retail Brands'},
        {n:'20+',        l:'HB Partners'},
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

    <!-- LOGO: official white-text lockup — read-only, no crop, no AI, lossless -->
    <a href="/" style="display:flex;align-items:center;flex-shrink:0;" aria-label="India Gully — Home">
      <img src="/assets/logo-white.png"
           alt="India Gully — Celebrating Desiness"
           height="38"
           style="height:38px;width:auto;max-width:220px;object-fit:contain;object-position:left center;display:block;"
           draggable="false"
           fetchpriority="high"
           decoding="async">
    </a>

    <!-- DESKTOP NAV -->
    <div id="nav-desktop-links" style="gap:.15rem;">
      <a href="/"         class="n-lk">Home</a>
      <a href="/about"    class="n-lk">About</a>
      <div class="relative n-par" style="position:relative;">
        <button class="n-lk" style="display:flex;align-items:center;gap:.4rem;">Advisory <i class="fas fa-chevron-down" style="font-size:.5rem;opacity:.45;"></i></button>
        <div class="n-drop">
          <a href="/services#real-estate"   class="n-di"><span style="font-size:.85rem;">🏛️</span>Real Estate</a>
          <a href="/services#retail"        class="n-di"><span style="font-size:.85rem;">🛍️</span>Retail &amp; Leasing</a>
          <a href="/services#hospitality"   class="n-di"><span style="font-size:.85rem;">🏨</span>Hospitality</a>
          <a href="/services#entertainment" class="n-di"><span style="font-size:.85rem;">🎡</span>Entertainment</a>
          <a href="/services#debt"          class="n-di"><span style="font-size:.85rem;">⚖️</span>Debt &amp; Special</a>
          <div style="height:1px;background:rgba(255,255,255,.06);margin:.25rem 0;"></div>
          <a href="/horeca"                 class="n-di"><span style="font-size:.85rem;">🍽️</span>HORECA Solutions</a>
        </div>
      </div>
      <a href="/listings" class="n-lk">Mandates</a>
      <a href="/works" class="n-lk">Our Work</a>
      <a href="/insights" class="n-lk">Insights</a>
      <a href="/contact"  class="n-lk">Contact</a>
    </div>

    <!-- RIGHT -->
    <div id="nav-desktop-right" style="gap:.75rem;">
      <!-- Dark Mode Toggle -->
      <button id="dark-toggle" onclick="igToggleDark()" aria-label="Toggle dark mode"
              style="color:rgba(255,255,255,.6);background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.15);padding:.38rem .6rem;cursor:pointer;font-size:.75rem;transition:color .2s;"
              title="Toggle dark mode" data-tip="Dark mode">
        <i id="dark-icon" class="fas fa-moon"></i>
      </button>
      <!-- Hindi / English Toggle -->
      <button id="lang-toggle" onclick="igToggleLang()" aria-label="Switch language between English and Hindi"
              style="color:rgba(255,255,255,.6);background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.15);padding:.38rem .6rem;cursor:pointer;font-size:.72rem;font-weight:600;transition:color .2s;letter-spacing:.04em;"
              title="Switch to Hindi / English" data-tip="भाषा / Language">
        <span id="lang-label">हिंदी</span>
      </button>
      <div class="relative n-par" style="position:relative;">
        <button class="n-lk" style="display:flex;align-items:center;gap:.5rem;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.15);padding:.42rem .9rem;">
          <i class="fas fa-lock" style="font-size:.55rem;color:var(--gold);"></i>Portals
          <i class="fas fa-chevron-down" style="font-size:.48rem;opacity:.4;"></i>
        </button>
        <div class="n-drop" style="right:0;left:auto;min-width:13rem;">
          <a href="/portal/client"   class="n-di"><i class="fas fa-user-tie"    style="color:var(--gold);width:14px;font-size:.72rem;text-align:center;"></i>Client Portal</a>
          <a href="/portal/employee" class="n-di"><i class="fas fa-users"       style="color:var(--gold);width:14px;font-size:.72rem;text-align:center;"></i>Employee Portal</a>
          <a href="/portal/board"    class="n-di"><i class="fas fa-gavel"       style="color:var(--gold);width:14px;font-size:.72rem;text-align:center;"></i>Board &amp; KMP</a>
          <div style="height:1px;background:rgba(255,255,255,.06);margin:.25rem 0;"></div>
          <a href="/admin"           class="n-di"><i class="fas fa-shield-alt"  style="color:var(--gold);width:14px;font-size:.72rem;text-align:center;"></i>Super Admin</a>
        </div>
      </div>
      <a href="/contact" class="btn btn-g" style="padding:.55rem 1.4rem;">Submit Mandate</a>
    </div>

    <!-- HAMBURGER -->
    <button id="mobileBtn" style="color:#fff;padding:.5rem;background:none;border:none;cursor:pointer;">
      <i class="fas fa-bars" style="font-size:1.1rem;"></i>
    </button>
  </div>

  <!-- MOBILE MENU -->
  <div id="mobileMenu" style="display:none;background:rgba(8,8,8,.98);border-top:1px solid rgba(255,255,255,.06);">
    <div style="padding:1rem 1.25rem;display:flex;flex-direction:column;gap:.15rem;">
      <a href="/"         style="display:block;padding:.7rem 0;font-size:.85rem;color:rgba(255,255,255,.65);border-bottom:1px solid rgba(255,255,255,.04);">Home</a>
      <a href="/about"    style="display:block;padding:.7rem 0;font-size:.85rem;color:rgba(255,255,255,.65);border-bottom:1px solid rgba(255,255,255,.04);">About</a>
      <a href="/services" style="display:block;padding:.7rem 0;font-size:.85rem;color:rgba(255,255,255,.65);border-bottom:1px solid rgba(255,255,255,.04);">Advisory Services</a>
      <a href="/horeca"   style="display:block;padding:.7rem 0;font-size:.85rem;color:rgba(255,255,255,.65);border-bottom:1px solid rgba(255,255,255,.04);">HORECA Solutions</a>
      <a href="/listings" style="display:block;padding:.7rem 0;font-size:.85rem;color:rgba(255,255,255,.65);border-bottom:1px solid rgba(255,255,255,.04);">Mandates</a>
      <a href="/works" style="display:block;padding:.7rem 0;font-size:.85rem;color:rgba(255,255,255,.65);border-bottom:1px solid rgba(255,255,255,.04);">Our Work</a>
      <a href="/insights" style="display:block;padding:.7rem 0;font-size:.85rem;color:rgba(255,255,255,.65);border-bottom:1px solid rgba(255,255,255,.04);">Insights</a>
      <a href="/contact"  style="display:block;padding:.7rem 0;font-size:.85rem;color:rgba(255,255,255,.65);border-bottom:1px solid rgba(255,255,255,.04);">Contact</a>
      <div style="padding-top:.75rem;display:flex;flex-direction:column;gap:.5rem;">
        <a href="/portal/client"   style="font-size:.8rem;color:var(--gold);"><i class="fas fa-lock" style="margin-right:.5rem;font-size:.65rem;"></i>Client Portal</a>
        <a href="/portal/employee" style="font-size:.8rem;color:var(--gold);"><i class="fas fa-lock" style="margin-right:.5rem;font-size:.65rem;"></i>Employee Portal</a>
        <a href="/portal/board"    style="font-size:.8rem;color:var(--gold);"><i class="fas fa-lock" style="margin-right:.5rem;font-size:.65rem;"></i>Board &amp; KMP</a>
      </div>
    </div>
  </div>
</nav>`

// ── FOOTER ──────────────────────────────────────────────────────────────────
const FOOTER = `
<footer style="background:#080808;border-top:1px solid rgba(184,150,12,.12);">
  <div class="wrap footer-grid" style="padding-top:4rem;padding-bottom:2.5rem;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem;">

    <!-- Brand -->
    <div>
      <!-- FOOTER LOGO: official white-text lockup — read-only, no crop, no AI, lossless -->
      <div style="margin-bottom:1.25rem;">
        <img src="/assets/logo-white.png"
             alt="India Gully — Celebrating Desiness"
             height="32"
             style="height:32px;width:auto;max-width:200px;object-fit:contain;object-position:left center;display:block;"
             draggable="false"
             decoding="async">
      </div>
      <p style="font-size:.8rem;color:rgba(255,255,255,.65);line-height:1.8;max-width:300px;margin-bottom:1.25rem;">India's premier multi-vertical advisory firm. Strategy, transactions and enablement across Real Estate, Retail, Hospitality, Entertainment and HORECA.</p>
      <p style="font-size:.68rem;color:rgba(255,255,255,.45);line-height:1.7;">Vivacious Entertainment and Hospitality Pvt. Ltd.<br>New Delhi, India</p>
    </div>

    <!-- Advisory -->
    <div>
      <p class="eyebrow" style="color:rgba(184,150,12,.85);margin-bottom:1.1rem;">Advisory</p>
      <ul style="list-style:none;display:flex;flex-direction:column;gap:.6rem;">
        ${['Real Estate','Retail &amp; Leasing','Hospitality','Entertainment','Debt &amp; Special Situations','HORECA Solutions'].map(s=>`<li><a href="/services" style="font-size:.8rem;color:rgba(255,255,255,.65);transition:color .2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.65)'">${s}</a></li>`).join('')}
      </ul>
    </div>

    <!-- Platform -->
    <div>
      <p class="eyebrow" style="color:rgba(184,150,12,.85);margin-bottom:1.1rem;">Platform</p>
      <ul style="list-style:none;display:flex;flex-direction:column;gap:.6rem;">
        ${[['Active Mandates','/listings'],['Our Work','/works'],['Insights','/insights'],['Submit Mandate','/contact'],['About Us','/about'],['Client Portal','/portal/client'],['Employee Portal','/portal/employee'],['Board Portal','/portal/board']].map(([l,h])=>`<li><a href="${h}" style="font-size:.8rem;color:rgba(255,255,255,.65);transition:color .2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.65)'">${l}</a></li>`).join('')}
      </ul>
    </div>

    <!-- Contact -->
    <div>
      <p class="eyebrow" style="color:rgba(184,150,12,.85);margin-bottom:1.1rem;">Contact</p>
      <ul style="list-style:none;display:flex;flex-direction:column;gap:.7rem;">
        <li style="display:flex;gap:.6rem;align-items:flex-start;font-size:.8rem;color:rgba(255,255,255,.65);"><i class="fas fa-map-marker-alt" style="color:var(--gold);font-size:.65rem;margin-top:.2rem;flex-shrink:0;"></i>New Delhi, India</li>
        <li><a href="tel:+918988988988" style="display:flex;gap:.6rem;align-items:center;font-size:.8rem;color:rgba(255,255,255,.65);transition:color .2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.65)'"><i class="fas fa-phone" style="color:var(--gold);font-size:.65rem;flex-shrink:0;"></i>+91 8988 988 988</a></li>
        <li><a href="mailto:info@indiagully.com" style="display:flex;gap:.6rem;align-items:center;font-size:.8rem;color:rgba(255,255,255,.65);transition:color .2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.65)'"><i class="fas fa-envelope" style="color:var(--gold);font-size:.65rem;flex-shrink:0;"></i>info@indiagully.com</a></li>
      </ul>
      <div style="margin-top:1.25rem;padding-top:1.25rem;border-top:1px solid rgba(255,255,255,.06);">
        <p style="font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(184,150,12,.75);margin-bottom:.5rem;">Leadership Direct</p>
        <ul style="list-style:none;display:flex;flex-direction:column;gap:.35rem;">
          <li><a href="mailto:akm@indiagully.com"          style="font-size:.75rem;color:rgba(255,255,255,.6);" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.6)'">akm@indiagully.com</a></li>
          <li><a href="mailto:pavan@indiagully.com"        style="font-size:.75rem;color:rgba(255,255,255,.6);" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.6)'">pavan@indiagully.com</a></li>
          <li><a href="mailto:amit.jhingan@indiagully.com" style="font-size:.75rem;color:rgba(255,255,255,.6);" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.6)'">amit.jhingan@indiagully.com</a></li>
        </ul>
      </div>
    </div>
  </div>

  <div style="border-top:1px solid rgba(255,255,255,.05);">
    <div class="wrap" style="padding-top:.9rem;padding-bottom:.9rem;display:flex;flex-direction:column;gap:.5rem;align-items:center;justify-content:space-between;">
      <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;width:100%;gap:.75rem;">
        <p style="font-size:.68rem;color:rgba(255,255,255,.5);">© 2026 Vivacious Entertainment and Hospitality Pvt. Ltd. All rights reserved. India Gully™ is a registered brand.</p>
        <div style="display:flex;gap:1.25rem;font-size:.68rem;color:rgba(255,255,255,.5);align-items:center;">
          <a href="/legal/privacy"    onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.5)'" style="transition:color .2s;">Privacy Policy</a>
          <a href="/legal/terms"      onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.5)'" style="transition:color .2s;">Terms of Use</a>
          <a href="/legal/disclaimer" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.5)'" style="transition:color .2s;">Disclaimer</a>
          <span style="color:rgba(255,255,255,.4);">New Delhi, India</span>
          <button onclick="igStartTour && igStartTour()" aria-label="Start guided tour"
                  style="background:none;border:1px solid rgba(255,255,255,.25);color:rgba(255,255,255,.55);padding:.2rem .6rem;font-size:.62rem;cursor:pointer;transition:color .2s;"
                  onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.55)'">
            <i class="fas fa-compass" style="margin-right:.3rem;"></i>Tour
          </button>
        </div>
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
    var els = document.querySelectorAll('.reveal');
    if(!els.length) return;
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }});
    },{threshold:0.12});
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
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        ss.classList.toggle('visible', !e.isIntersecting);
        ss.setAttribute('aria-hidden', e.isIntersecting ? 'true' : 'false');
      });
    },{threshold:0, rootMargin:'-80px 0px 0px 0px'});
    io.observe(hs);
  })();

})();
</script>`
