// India Gully — Master Layout
// Minimalistic · Clean · Institutional · DM Sans + DM Serif Display

export function layout(title: string, content: string, opts?: {
  description?: string
  ogImage?: string
  bodyClass?: string
  noNav?: boolean
  noFooter?: boolean
}) {
  const desc = opts?.description || "India Gully — Celebrating Desiness. India's premier multi-vertical advisory firm across Real Estate, Retail, Hospitality, Entertainment, Debt & HORECA Solutions."
  const ogImg = opts?.ogImage || 'https://india-gully.pages.dev/static/og.jpg'

  return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="${desc}">
<meta property="og:title" content="${title} — India Gully">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${ogImg}">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<title>${title} — India Gully</title>
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 38 46'%3E%3Cpath d='M19 2C9 2 2 9.5 2 19.5C2 26.5 5.8 32.5 11.5 36L9 44H29L26.5 36C32.2 32.5 36 26.5 36 19.5C36 9.5 29 2 19 2Z' stroke='%23B8960C' stroke-width='1.5' fill='none'/%3E%3Cpath d='M23 8.5C18.5 8.5 15 11.5 14 15.5C13.2 18.5 14.5 21 17 22.5L14.5 27.5C16.5 28.5 18 29 19.5 29C22.5 29 25.5 27.5 27 25C28.5 22.5 28 19.5 25.5 18L27.5 13C26 10 24.5 8.5 23 8.5Z' fill='%23B8960C'/%3E%3Cellipse cx='20' cy='18' rx='3' ry='4' fill='%23111111'/%3E%3C/svg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
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
<style>
/* ── RESET ──────────────────────────────────── */
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --gold:#B8960C;--gold-lt:#D4AE2A;--gold-pale:#FAF6E8;--gold-muted:#F0E8C8;
  --ink:#111111;--ink-mid:#1E1E1E;--ink-soft:#444444;--ink-muted:#6B6B6B;--ink-faint:#A0A0A0;
  --parch:#FAF8F3;--parch-dk:#F2EDE3;--border:#E4DECE;
  --nav-h:72px;
  --r:0px;
}
html{scroll-behavior:smooth}
body{font-family:"DM Sans",system-ui,sans-serif;background:var(--parch);color:var(--ink);font-size:16px;line-height:1.65;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
img{max-width:100%;display:block}
a{color:inherit;text-decoration:none}

/* ── TYPOGRAPHY ─────────────────────────────── */
.f-serif{font-family:"DM Serif Display",Georgia,serif}
.eyebrow{font-size:.68rem;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:var(--gold)}
.eyebrow-lt{font-size:.68rem;font-weight:600;letter-spacing:.22em;text-transform:uppercase;color:rgba(184,150,12,.7)}
.h1{font-family:"DM Serif Display",Georgia,serif;font-size:clamp(2.75rem,6vw,5.5rem);line-height:1.06;color:#fff}
.h2{font-family:"DM Serif Display",Georgia,serif;font-size:clamp(2rem,4vw,3.25rem);line-height:1.1;color:var(--ink)}
.h2-lt{font-family:"DM Serif Display",Georgia,serif;font-size:clamp(2rem,4vw,3.25rem);line-height:1.1;color:#fff}
.h3{font-family:"DM Serif Display",Georgia,serif;font-size:clamp(1.25rem,2vw,1.75rem);line-height:1.2;color:var(--ink)}
.h3-lt{font-family:"DM Serif Display",Georgia,serif;font-size:clamp(1.25rem,2vw,1.75rem);line-height:1.2;color:#fff}
.lead{font-size:1.0625rem;line-height:1.8;color:var(--ink-soft)}
.lead-lt{font-size:1.0625rem;line-height:1.8;color:rgba(255,255,255,.55)}
.body{font-size:.9375rem;line-height:1.75;color:var(--ink-soft)}
.body-lt{font-size:.9375rem;line-height:1.75;color:rgba(255,255,255,.5)}
.caption{font-size:.75rem;letter-spacing:.06em;color:var(--ink-muted)}
.caption-lt{font-size:.75rem;letter-spacing:.06em;color:rgba(255,255,255,.35)}
.stat-n{font-family:"DM Serif Display",serif;font-size:2.75rem;line-height:1;color:var(--gold)}

/* ── GOLD RULE ──────────────────────────────── */
.gr{width:32px;height:1.5px;background:var(--gold);margin-bottom:1rem}
.gr-c{width:32px;height:1.5px;background:var(--gold);margin:0 auto 1rem}
.gr-lt{width:32px;height:1.5px;background:var(--gold);margin-bottom:1rem;opacity:.6}

/* ── LAYOUT ─────────────────────────────────── */
.wrap{max-width:1280px;margin:0 auto;padding:0 1.5rem}
.wrap-sm{max-width:900px;margin:0 auto;padding:0 1.5rem}
.sec{padding:5.5rem 0}
.sec-sm{padding:4rem 0}
.sec-dk{background:var(--ink);padding:5.5rem 0}
.sec-md{background:var(--ink-mid);padding:5.5rem 0}
.sec-wh{background:#fff;padding:5.5rem 0}
.sec-pc{background:var(--parch);padding:5.5rem 0}
.sec-pd{background:var(--parch-dk);padding:5.5rem 0}

/* ── BUTTONS ────────────────────────────────── */
.btn{display:inline-flex;align-items:center;gap:.5rem;padding:.7rem 1.85rem;font-size:.78rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;transition:all .22s ease;cursor:pointer;border:1.5px solid transparent;white-space:nowrap}
.btn-g{background:var(--gold);color:#fff;border-color:var(--gold)}
.btn-g:hover{background:transparent;color:var(--gold)}
.btn-go{border-color:var(--gold);color:var(--gold);background:transparent}
.btn-go:hover{background:var(--gold);color:#fff}
.btn-dk{background:var(--ink);color:#fff;border-color:var(--ink)}
.btn-dk:hover{background:transparent;color:var(--ink)}
.btn-dko{border-color:var(--ink);color:var(--ink);background:transparent}
.btn-dko:hover{background:var(--ink);color:#fff}
.btn-ghost{border-color:rgba(255,255,255,.3);color:#fff;background:transparent}
.btn-ghost:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.6)}
.btn-ghost-g{border-color:var(--gold);color:var(--gold);background:transparent}
.btn-ghost-g:hover{background:var(--gold);color:#fff}

/* ── NAVIGATION ─────────────────────────────── */
#mainNav{height:var(--nav-h);position:fixed;top:0;left:0;right:0;z-index:200;transition:background .35s,box-shadow .35s}
#mainNav.nav-solid{background:rgba(12,12,12,.97);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);box-shadow:0 1px 0 rgba(255,255,255,.05)}
#mainNav.nav-clear{background:transparent}
.nav-sp{height:var(--nav-h)}
.n-lk{font-size:.775rem;font-weight:500;letter-spacing:.05em;color:rgba(255,255,255,.68);padding:.45rem .8rem;transition:color .2s}
.n-lk:hover,.n-lk.on{color:#fff}
.n-drop{position:absolute;top:calc(100% + 10px);left:0;min-width:14rem;background:rgba(10,10,10,.98);border:1px solid rgba(255,255,255,.07);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);opacity:0;visibility:hidden;transform:translateY(-6px);transition:all .22s;z-index:300}
.n-par:hover .n-drop{opacity:1;visibility:visible;transform:translateY(0)}
.n-di{display:flex;align-items:center;gap:.75rem;padding:.65rem 1.1rem;font-size:.775rem;color:rgba(255,255,255,.55);transition:color .15s,background .15s}
.n-di:hover{color:#fff;background:rgba(255,255,255,.04)}

/* ── HERO CAROUSEL ──────────────────────────── */
.car{position:relative;overflow:hidden;height:100vh;min-height:600px;max-height:960px}
.car-track{display:flex;height:100%;transition:transform .95s cubic-bezier(.77,0,.175,1)}
.car-slide{flex:0 0 100%;position:relative;overflow:hidden}
.car-bg{position:absolute;inset:0;background-size:cover;background-position:center;transform:scale(1.08);transition:transform 10s ease-out}
.car-slide.on .car-bg{transform:scale(1)}
.car-ov{position:absolute;inset:0;background:linear-gradient(110deg,rgba(5,5,5,.82) 0%,rgba(5,5,5,.5) 50%,rgba(5,5,5,.2) 100%)}
.car-body{position:relative;z-index:2;height:100%;display:flex;align-items:center}
/* slide text anim */
.s-txt{opacity:0;transform:translateY(26px);transition:opacity .75s ease .35s,transform .75s ease .35s}
.car-slide.on .s-txt{opacity:1;transform:translateY(0)}
/* dots */
.car-dots{position:absolute;bottom:2.25rem;left:50%;transform:translateX(-50%);display:flex;gap:.45rem;z-index:10;align-items:center}
.c-dot{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.28);border:none;cursor:pointer;transition:all .3s;padding:0}
.c-dot.on{background:var(--gold);width:26px;border-radius:3px}
/* arrows */
.car-arr{position:absolute;top:50%;z-index:10;transform:translateY(-50%);width:46px;height:46px;border:1px solid rgba(255,255,255,.22);background:rgba(0,0,0,.22);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;cursor:pointer;color:#fff;font-size:.85rem;transition:all .22s}
.car-arr:hover{background:var(--gold);border-color:var(--gold)}
.car-prev{left:1.5rem}
.car-next{right:1.5rem}
/* counter */
.car-ct{position:absolute;top:1.75rem;right:1.75rem;z-index:10;font-size:.72rem;font-weight:600;letter-spacing:.14em;color:rgba(255,255,255,.4)}
.car-ct b{color:#fff;font-weight:600}
/* progress bar */
.car-pb{position:absolute;bottom:0;left:0;height:2px;background:var(--gold);z-index:10;width:0;transition:none}

/* ── TICKER ─────────────────────────────────── */
.ticker{overflow:hidden;background:var(--gold);padding:.5rem 0;position:relative;z-index:2}
.ticker-tr{display:flex;white-space:nowrap;animation:tick 60s linear infinite;will-change:transform}
.ticker-tr:hover{animation-play-state:paused}
@keyframes tick{from{transform:translateX(0)}to{transform:translateX(-50%)}}

/* ── CARDS ──────────────────────────────────── */
.card{background:#fff;border:1px solid var(--border);transition:border-color .25s,box-shadow .25s,transform .25s}
.card:hover{border-color:var(--gold);box-shadow:0 10px 36px rgba(0,0,0,.07)}
.card-lift:hover{transform:translateY(-4px);box-shadow:0 18px 52px rgba(0,0,0,.1)}

/* ── VERTICAL GRID ──────────────────────────── */
.vg{display:grid;grid-template-columns:repeat(3,1fr);border:1px solid var(--border)}
@media(max-width:860px){.vg{grid-template-columns:repeat(2,1fr)}}
@media(max-width:540px){.vg{grid-template-columns:1fr}}
.vg-cell{padding:2.75rem 2.25rem;background:#fff;border-right:1px solid var(--border);border-bottom:1px solid var(--border);transition:background .25s,border-color .25s;cursor:pointer}
.vg-cell:nth-child(3n){border-right:none}
.vg-cell:hover{background:var(--gold-pale);border-color:var(--gold)}
.vg-cell:hover .vg-arr{opacity:1;transform:translateX(0)}
.vg-arr{opacity:0;transform:translateX(-8px);transition:all .25s;font-size:.72rem;color:var(--gold)}

/* ── MANDATE CARD ───────────────────────────── */
.mc{background:#fff;border:1px solid var(--border);overflow:hidden;transition:border-color .25s,box-shadow .25s}
.mc:hover{border-color:var(--gold);box-shadow:0 10px 36px rgba(0,0,0,.08)}
.mc-head{background:var(--ink);padding:1.85rem;position:relative;overflow:hidden}
.mc-head::after{content:'';position:absolute;right:-1.5rem;top:-1.5rem;width:9rem;height:9rem;border-radius:50%;background:rgba(184,150,12,.06)}

/* ── BADGES ─────────────────────────────────── */
.badge{display:inline-block;padding:.2rem .6rem;font-size:.65rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase}
.b-g{background:rgba(184,150,12,.1);color:var(--gold);border:1px solid rgba(184,150,12,.22)}
.b-dk{background:rgba(17,17,17,.06);color:var(--ink);border:1px solid rgba(17,17,17,.1)}
.b-gr{background:rgba(22,163,74,.08);color:#15803d;border:1px solid rgba(22,163,74,.18)}
.b-bl{background:rgba(59,130,246,.08);color:#1d4ed8;border:1px solid rgba(59,130,246,.18)}
.b-re{background:rgba(220,38,38,.08);color:#b91c1c;border:1px solid rgba(220,38,38,.18)}

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
.sb-lk{display:flex;align-items:center;gap:.75rem;padding:.6rem .875rem;font-size:.78rem;font-weight:500;color:rgba(255,255,255,.5);border-radius:3px;transition:all .18s;cursor:pointer}
.sb-lk:hover{color:#fff;background:rgba(255,255,255,.05)}
.sb-lk.on{color:var(--gold);background:rgba(184,150,12,.11)}
.sb-sec{font-size:.62rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.18);padding:.5rem .875rem;margin-top:.75rem}

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
@keyframes fadeUp{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
.fu  {animation:fadeUp .6s ease both}
.fu1 {animation:fadeUp .6s ease .1s both}
.fu2 {animation:fadeUp .6s ease .2s both}
.fu3 {animation:fadeUp .6s ease .3s both}
.fu4 {animation:fadeUp .6s ease .4s both}

/* ── PORTAL CARD ────────────────────────────── */
.pc{background:#fff;border:1px solid rgba(255,255,255,.08);overflow:hidden;transition:transform .25s,box-shadow .25s}
.pc:hover{transform:translateY(-4px);box-shadow:0 20px 60px rgba(0,0,0,.4)}

/* ── ADMIN METRIC ───────────────────────────── */
.am{background:#fff;border:1px solid var(--border);padding:1.5rem 1.75rem}

/* ── PRINT ──────────────────────────────────── */
@media print{#mainNav,footer,.no-print{display:none!important}}

/* ── DIVIDER ────────────────────────────────── */
.divider{height:1px;background:var(--border)}
.divider-dk{height:1px;background:rgba(255,255,255,.07)}
</style>
</head>
<body class="${opts?.bodyClass || ''}">
${opts?.noNav ? '' : NAV}
${content}
${opts?.noFooter ? '' : FOOTER}
${SCRIPTS}
</body>
</html>`
}

// ── NAVIGATION ─────────────────────────────────────────────────────────────
const NAV = `
<div class="nav-sp"></div>
<nav id="mainNav" class="nav-clear">
  <div style="max-width:1280px;margin:0 auto;padding:0 1.25rem;height:100%;display:flex;align-items:center;justify-content:space-between;">

    <!-- LOGO -->
    <a href="/" style="display:flex;align-items:center;gap:.75rem;flex-shrink:0;">
      <svg width="28" height="34" viewBox="0 0 38 46" fill="none">
        <path d="M19 2C9 2 2 9.5 2 19.5C2 26.5 5.8 32.5 11.5 36L9 44H29L26.5 36C32.2 32.5 36 26.5 36 19.5C36 9.5 29 2 19 2Z" stroke="#B8960C" stroke-width="1.5" fill="none"/>
        <path d="M23 8.5C18.5 8.5 15 11.5 14 15.5C13.2 18.5 14.5 21 17 22.5L14.5 27.5C16.5 28.5 18 29 19.5 29C22.5 29 25.5 27.5 27 25C28.5 22.5 28 19.5 25.5 18L27.5 13C26 10 24.5 8.5 23 8.5Z" fill="#B8960C"/>
        <ellipse cx="20" cy="18" rx="3" ry="4" fill="#111"/>
      </svg>
      <div style="line-height:1;">
        <div class="f-serif" style="color:#fff;font-size:1rem;letter-spacing:.07em;">INDIA GULLY</div>
        <div style="font-size:.5rem;letter-spacing:.26em;text-transform:uppercase;color:var(--gold);margin-top:3px;">Celebrating Desiness</div>
      </div>
    </a>

    <!-- DESKTOP NAV -->
    <div class="hidden lg:flex items-center" style="gap:.15rem;">
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
      <a href="/insights" class="n-lk">Insights</a>
      <a href="/contact"  class="n-lk">Contact</a>
    </div>

    <!-- RIGHT -->
    <div class="hidden lg:flex items-center" style="gap:.75rem;">
      <div class="relative n-par" style="position:relative;">
        <button class="n-lk" style="display:flex;align-items:center;gap:.5rem;border:1px solid rgba(255,255,255,.15);padding:.42rem .9rem;">
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
    <button id="mobileBtn" class="lg:hidden" style="color:#fff;padding:.5rem;background:none;border:none;cursor:pointer;">
      <i class="fas fa-bars" style="font-size:1.1rem;"></i>
    </button>
  </div>

  <!-- MOBILE MENU -->
  <div id="mobileMenu" class="hidden lg:hidden" style="background:rgba(8,8,8,.98);border-top:1px solid rgba(255,255,255,.06);">
    <div style="padding:1rem 1.25rem;display:flex;flex-direction:column;gap:.15rem;">
      <a href="/"         style="display:block;padding:.7rem 0;font-size:.85rem;color:rgba(255,255,255,.65);border-bottom:1px solid rgba(255,255,255,.04);">Home</a>
      <a href="/about"    style="display:block;padding:.7rem 0;font-size:.85rem;color:rgba(255,255,255,.65);border-bottom:1px solid rgba(255,255,255,.04);">About</a>
      <a href="/services" style="display:block;padding:.7rem 0;font-size:.85rem;color:rgba(255,255,255,.65);border-bottom:1px solid rgba(255,255,255,.04);">Advisory Services</a>
      <a href="/horeca"   style="display:block;padding:.7rem 0;font-size:.85rem;color:rgba(255,255,255,.65);border-bottom:1px solid rgba(255,255,255,.04);">HORECA Solutions</a>
      <a href="/listings" style="display:block;padding:.7rem 0;font-size:.85rem;color:rgba(255,255,255,.65);border-bottom:1px solid rgba(255,255,255,.04);">Mandates</a>
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
  <div class="wrap" style="padding-top:5rem;padding-bottom:2.5rem;display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:3rem;">

    <!-- Brand -->
    <div>
      <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1.25rem;">
        <svg width="22" height="27" viewBox="0 0 38 46" fill="none">
          <path d="M23 8.5C18.5 8.5 15 11.5 14 15.5C13.2 18.5 14.5 21 17 22.5L14.5 27.5C16.5 28.5 18 29 19.5 29C22.5 29 25.5 27.5 27 25C28.5 22.5 28 19.5 25.5 18L27.5 13C26 10 24.5 8.5 23 8.5Z" fill="#B8960C"/>
        </svg>
        <div>
          <div class="f-serif" style="color:#fff;font-size:.9rem;letter-spacing:.06em;">INDIA GULLY</div>
          <div style="font-size:.48rem;letter-spacing:.24em;text-transform:uppercase;color:var(--gold);margin-top:2px;">Celebrating Desiness</div>
        </div>
      </div>
      <p style="font-size:.8rem;color:rgba(255,255,255,.3);line-height:1.8;max-width:300px;margin-bottom:1.25rem;">India's premier multi-vertical advisory firm. Strategy, transactions and enablement across Real Estate, Retail, Hospitality, Entertainment and HORECA.</p>
      <p style="font-size:.68rem;color:rgba(255,255,255,.15);line-height:1.7;">Vivacious Entertainment and Hospitality Pvt. Ltd.<br>New Delhi · CIN: U74900DL2017PTC000000</p>
    </div>

    <!-- Advisory -->
    <div>
      <p class="eyebrow" style="color:rgba(255,255,255,.2);margin-bottom:1.1rem;">Advisory</p>
      <ul style="list-style:none;display:flex;flex-direction:column;gap:.6rem;">
        ${['Real Estate','Retail &amp; Leasing','Hospitality','Entertainment','Debt &amp; Special Situations','HORECA Solutions'].map(s=>`<li><a href="/services" style="font-size:.8rem;color:rgba(255,255,255,.38);transition:color .2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.38)'">${s}</a></li>`).join('')}
      </ul>
    </div>

    <!-- Platform -->
    <div>
      <p class="eyebrow" style="color:rgba(255,255,255,.2);margin-bottom:1.1rem;">Platform</p>
      <ul style="list-style:none;display:flex;flex-direction:column;gap:.6rem;">
        ${[['Active Mandates','/listings'],['Insights','/insights'],['Submit Mandate','/contact'],['About Us','/about'],['Client Portal','/portal/client'],['Employee Portal','/portal/employee'],['Board Portal','/portal/board']].map(([l,h])=>`<li><a href="${h}" style="font-size:.8rem;color:rgba(255,255,255,.38);transition:color .2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.38)'">${l}</a></li>`).join('')}
      </ul>
    </div>

    <!-- Contact -->
    <div>
      <p class="eyebrow" style="color:rgba(255,255,255,.2);margin-bottom:1.1rem;">Contact</p>
      <ul style="list-style:none;display:flex;flex-direction:column;gap:.7rem;">
        <li style="display:flex;gap:.6rem;align-items:flex-start;font-size:.8rem;color:rgba(255,255,255,.38);"><i class="fas fa-map-marker-alt" style="color:var(--gold);font-size:.65rem;margin-top:.2rem;flex-shrink:0;"></i>New Delhi, India</li>
        <li><a href="tel:+918988988988" style="display:flex;gap:.6rem;align-items:center;font-size:.8rem;color:rgba(255,255,255,.38);transition:color .2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.38)'"><i class="fas fa-phone" style="color:var(--gold);font-size:.65rem;flex-shrink:0;"></i>+91 8988 988 988</a></li>
        <li><a href="mailto:info@indiagully.com" style="display:flex;gap:.6rem;align-items:center;font-size:.8rem;color:rgba(255,255,255,.38);transition:color .2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.38)'"><i class="fas fa-envelope" style="color:var(--gold);font-size:.65rem;flex-shrink:0;"></i>info@indiagully.com</a></li>
      </ul>
      <div style="margin-top:1.25rem;padding-top:1.25rem;border-top:1px solid rgba(255,255,255,.06);">
        <p style="font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.18);margin-bottom:.5rem;">Leadership Direct</p>
        <ul style="list-style:none;display:flex;flex-direction:column;gap:.35rem;">
          <li><a href="mailto:akm@indiagully.com"          style="font-size:.75rem;color:rgba(255,255,255,.3);" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.3)'">akm@indiagully.com</a></li>
          <li><a href="mailto:pavan@indiagully.com"        style="font-size:.75rem;color:rgba(255,255,255,.3);" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.3)'">pavan@indiagully.com</a></li>
          <li><a href="mailto:amit.jhingan@indiagully.com" style="font-size:.75rem;color:rgba(255,255,255,.3);" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.3)'">amit.jhingan@indiagully.com</a></li>
        </ul>
      </div>
    </div>
  </div>

  <div style="border-top:1px solid rgba(255,255,255,.05);">
    <div class="wrap" style="padding-top:.9rem;padding-bottom:.9rem;display:flex;flex-direction:column;gap:.5rem;align-items:center;justify-content:space-between;">
      <div style="display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;width:100%;gap:.75rem;">
        <p style="font-size:.68rem;color:rgba(255,255,255,.18);">© 2024 Vivacious Entertainment and Hospitality Pvt. Ltd. All rights reserved. India Gully™ is a registered brand.</p>
        <div style="display:flex;gap:1.25rem;font-size:.68rem;color:rgba(255,255,255,.18);">
          <a href="/legal/privacy"    onmouseover="this.style.color='rgba(255,255,255,.45)'" onmouseout="this.style.color='rgba(255,255,255,.18)'" style="transition:color .2s;">Privacy Policy</a>
          <a href="/legal/terms"      onmouseover="this.style.color='rgba(255,255,255,.45)'" onmouseout="this.style.color='rgba(255,255,255,.18)'" style="transition:color .2s;">Terms of Use</a>
          <a href="/legal/disclaimer" onmouseover="this.style.color='rgba(255,255,255,.45)'" onmouseout="this.style.color='rgba(255,255,255,.18)'" style="transition:color .2s;">Disclaimer</a>
          <span style="color:rgba(255,255,255,.1);">GSTIN: 07XXXXXX000XXX</span>
        </div>
      </div>
    </div>
  </div>
</footer>`

// ── SCRIPTS ─────────────────────────────────────────────────────────────────
const SCRIPTS = `
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
  if(mb && mm) mb.addEventListener('click', function(){ mm.classList.toggle('hidden'); });

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
    if(e.target && (e.target as HTMLElement).classList.contains('ig-modal')){
      (e.target as HTMLElement).style.display='none';
      document.body.style.overflow='';
    }
  });

  /* ── TOAST NOTIFICATIONS ──────────────────────────────────────────────── */
  window.igToast = function(msg, type){
    var el = document.createElement('div');
    el.style.cssText = 'position:fixed;bottom:1.5rem;right:1.5rem;z-index:9999;background:'+(type==='error'?'#dc2626':type==='warn'?'#d97706':'#15803d')+';color:#fff;padding:.75rem 1.25rem;font-size:.82rem;font-weight:500;box-shadow:0 8px 32px rgba(0,0,0,.25);max-width:360px;line-height:1.5;display:flex;align-items:center;gap:.6rem;';
    el.innerHTML = '<i class="fas fa-'+(type==='error'?'exclamation-circle':type==='warn'?'exclamation-triangle':'check-circle')+'"></i>' + msg;
    document.body.appendChild(el);
    setTimeout(function(){ el.style.transition='opacity .4s'; el.style.opacity='0'; setTimeout(function(){ el.remove(); },400); }, 3500);
  };

  /* ── INLINE PANEL TOGGLE ──────────────────────────────────────────────── */
  window.togglePanel = function(id){
    var p = document.getElementById(id);
    if(!p) return;
    var isHidden = p.style.display === 'none' || p.style.display === '';
    p.style.display = isHidden ? 'block' : 'none';
  };

  /* ── CONFIRM ACTION ───────────────────────────────────────────────────── */
  window.igConfirm = function(msg, cb){
    var overlay = document.createElement('div');
    overlay.style.cssText='position:fixed;inset:0;z-index:9998;background:rgba(0,0,0,.5);display:flex;align-items:center;justify-content:center;';
    overlay.innerHTML='<div style="background:#fff;padding:2rem;max-width:400px;width:90%;box-shadow:0 20px 60px rgba(0,0,0,.3);">'
      +'<p style="font-size:.95rem;color:#111;margin-bottom:1.5rem;line-height:1.6;">'+msg+'</p>'
      +'<div style="display:flex;gap:.75rem;justify-content:flex-end;">'
      +'<button id="igcNo" style="padding:.5rem 1.25rem;background:#f1f5f9;border:1px solid #e2e8f0;font-size:.82rem;cursor:pointer;font-weight:500;">Cancel</button>'
      +'<button id="igcYes" style="padding:.5rem 1.25rem;background:#B8960C;color:#fff;border:none;font-size:.82rem;cursor:pointer;font-weight:600;letter-spacing:.05em;">Confirm</button>'
      +'</div></div>';
    document.body.appendChild(overlay);
    overlay.querySelector('#igcNo')!.addEventListener('click',function(){ overlay.remove(); });
    overlay.querySelector('#igcYes')!.addEventListener('click',function(){ overlay.remove(); if(cb) cb(); });
  };

})();
</script>
<style>
/* ── MODAL OVERLAY ──────────────────────────────── */
.ig-modal{display:none;position:fixed;inset:0;z-index:9000;background:rgba(0,0,0,.55);align-items:center;justify-content:center;padding:1rem;}
.ig-modal-box{background:#fff;width:100%;max-width:600px;max-height:90vh;overflow-y:auto;position:relative;box-shadow:0 30px 80px rgba(0,0,0,.3);}
.ig-modal-box.wide{max-width:860px;}
.ig-modal-hd{padding:1.25rem 1.5rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;}
.ig-modal-bd{padding:1.5rem;}
.ig-modal-ft{padding:1rem 1.5rem;border-top:1px solid var(--border);display:flex;gap:.75rem;justify-content:flex-end;}
.ig-modal-close{background:none;border:none;cursor:pointer;color:var(--ink-muted);font-size:1rem;padding:.25rem;line-height:1;}
.ig-modal-close:hover{color:var(--ink);}
/* SLIDE PANEL */
.ig-panel{display:none;background:var(--parch-dk);border:1px solid var(--border);padding:1.5rem;margin-top:1rem;}
</style>`
