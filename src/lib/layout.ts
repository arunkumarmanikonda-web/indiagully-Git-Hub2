// India Gully — Master Layout
// Minimalistic · Clean · Institutional · DM Sans + DM Serif Display

export function layout(title: string, content: string, opts?: {
  description?: string
  ogImage?: string
  bodyClass?: string
  noNav?: boolean
  noFooter?: boolean
  cspNonce?: string       // kept for API compatibility; CSP now uses unsafe-inline + CDN allowlist
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
<!-- FAVICON: hologram asset — locked, no AI, no optimisation, lossless only -->
<link rel="icon" type="image/x-icon" href="/assets/favicon.ico">
<link rel="icon" type="image/png" sizes="64x64" href="/assets/favicon-64.png">
<link rel="icon" type="image/png" sizes="48x48" href="/assets/favicon-48.png">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/assets/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/apple-touch-icon.png">
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
/* ── DARK MODE VARIABLES (in <head> to prevent FOUC) ──────────────────── */
[data-theme="dark"]{
  --gold:#e6b412;--gold-pale:rgba(230,180,18,.1);
  --ink:#e2e8f0;--ink-muted:#94a3b8;--ink-soft:#64748b;--ink-faint:#334155;
  --parchment:#0f172a;--parch-dk:#1e293b;--border:#334155;
}
[data-theme="dark"] body{background:#0f172a;color:#e2e8f0;}
[data-theme="dark"] .am,[data-theme="dark"] .ig-tbl thead tr,[data-theme="dark"] [style*="background:#fff"]{background:#1e293b!important;}
[data-theme="dark"] table.ig-tbl tbody tr{background:#1e293b;}
[data-theme="dark"] table.ig-tbl tbody tr:hover{background:#334155;}
[data-theme="dark"] .ig-input{background:#1e293b;color:#e2e8f0;border-color:#334155;}
[data-theme="dark"] .ig-panel{background:#1e293b;border-color:#334155;}
/* ── FOCUS VISIBLE (ARIA) ──────────────────────────────────────────────── */
:focus-visible{outline:2px solid var(--gold);outline-offset:2px;}
a:focus-visible,button:focus-visible{outline:2px solid var(--gold);outline-offset:3px;}
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
.lead-lt{font-size:1.0625rem;line-height:1.8;color:rgba(255,255,255,.75)}
.body{font-size:.9375rem;line-height:1.75;color:var(--ink-soft)}
.body-lt{font-size:.9375rem;line-height:1.75;color:rgba(255,255,255,.72)}
.caption{font-size:.75rem;letter-spacing:.06em;color:var(--ink-muted)}
.caption-lt{font-size:.75rem;letter-spacing:.06em;color:rgba(255,255,255,.6)}
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
#mainNav.nav-clear{background:linear-gradient(180deg,rgba(0,0,0,.55) 0%,transparent 100%)}
.nav-sp{height:var(--nav-h)}
.n-lk{font-size:.775rem;font-weight:500;letter-spacing:.05em;color:rgba(255,255,255,.68);padding:.45rem .8rem;transition:color .2s}
.n-lk:hover,.n-lk.on{color:#fff}
.n-drop{position:absolute;top:calc(100% + 10px);left:0;min-width:14rem;background:rgba(10,10,10,.98);border:1px solid rgba(255,255,255,.07);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);opacity:0;visibility:hidden;transform:translateY(-6px);transition:all .22s;z-index:300}
.n-par:hover .n-drop{opacity:1;visibility:visible;transform:translateY(0)}
.n-di{display:flex;align-items:center;gap:.75rem;padding:.65rem 1.1rem;font-size:.775rem;color:rgba(255,255,255,.72);transition:color .15s,background .15s}
.n-di:hover{color:#fff;background:rgba(255,255,255,.04)}
/* nav layout — no Tailwind CDN dependency; controls are hidden/shown via native CSS only */
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

/* ── SIDEBAR NOTIFICATION BADGE ─────────────── */
.sb-badge{display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:18px;padding:0 4px;background:var(--gold);color:#fff;font-size:.55rem;font-weight:700;border-radius:9px;margin-left:auto;}
.sb-dot{width:7px;height:7px;border-radius:50%;background:#ef4444;margin-left:auto;flex-shrink:0;}

/* ── PROGRESS BAR ───────────────────────────── */
.ig-progress-track{background:var(--parch-dk);height:6px;border-radius:3px;overflow:hidden;}
.ig-progress-fill{height:100%;border-radius:3px;transition:width .6s ease;}

/* ── STATUS PILL ────────────────────────────── */
.status-dot{width:7px;height:7px;border-radius:50%;display:inline-block;margin-right:.4rem;flex-shrink:0;}

/* ── TOOLTIP ────────────────────────────────── */
[data-tip]{position:relative;}
[data-tip]:hover::after{content:attr(data-tip);position:absolute;bottom:calc(100% + 5px);left:50%;transform:translateX(-50%);background:rgba(10,10,10,.92);color:#fff;padding:.3rem .625rem;font-size:.68rem;white-space:nowrap;border-radius:3px;z-index:999;pointer-events:none;}

/* ── DIVIDER ────────────────────────────────── */
.ig-hr{border:none;border-top:1px solid var(--border);margin:1.5rem 0;}

/* ── INLINE INFO BOX ────────────────────────── */
.ig-info{background:#eff6ff;border:1px solid #bfdbfe;padding:.75rem 1rem;font-size:.82rem;color:#1d4ed8;display:flex;align-items:flex-start;gap:.5rem;}
.ig-warn{background:#fffbeb;border:1px solid #fde68a;padding:.75rem 1rem;font-size:.82rem;color:#92400e;display:flex;align-items:flex-start;gap:.5rem;}
.ig-danger{background:#fef2f2;border:1px solid #fecaca;padding:.75rem 1rem;font-size:.82rem;color:#991b1b;display:flex;align-items:flex-start;gap:.5rem;}
.ig-success{background:#f0fdf4;border:1px solid #bbf7d0;padding:.75rem 1rem;font-size:.82rem;color:#15803d;display:flex;align-items:flex-start;gap:.5rem;}

/* ── RESPONSIVE GRID ────────────────────────── */
@media(max-width:768px){
  .r-1{grid-template-columns:1fr!important;}
  .r-2{grid-template-columns:1fr 1fr!important;}
}

/* ── PRINT ──────────────────────────────────── */
@media print{#mainNav,footer,.no-print{display:none!important}}

/* ── DIVIDER ────────────────────────────────── */
.divider{height:1px;background:var(--border)}
.divider-dk{height:1px;background:rgba(255,255,255,.07)}
</style>
</head>
<body class="${opts?.bodyClass || ''}">
<a href="#main-content" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;" onfocus="this.style.cssText='position:fixed;left:1rem;top:1rem;z-index:99999;background:var(--gold);color:#fff;padding:.5rem 1rem;font-size:.85rem;font-weight:700;text-decoration:none;'" onblur="this.style.cssText='position:absolute;left:-9999px;top:auto;width:1px;height:1px;overflow:hidden;'">Skip to main content</a>
${opts?.noNav ? '' : NAV}
<main id="main-content" role="main" aria-label="Main content" tabindex="-1">
${content}
</main>
${opts?.noFooter ? '' : FOOTER}
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
        ${[['Active Mandates','/listings'],['Insights','/insights'],['Submit Mandate','/contact'],['About Us','/about'],['Client Portal','/portal/client'],['Employee Portal','/portal/employee'],['Board Portal','/portal/board']].map(([l,h])=>`<li><a href="${h}" style="font-size:.8rem;color:rgba(255,255,255,.65);transition:color .2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.65)'">${l}</a></li>`).join('')}
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
  if(mb && mm) mb.addEventListener('click', function(){ mm.style.display = mm.style.display === 'block' ? 'none' : 'block'; });

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

})();
</script>`
