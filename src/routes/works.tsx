import { Hono } from 'hono'
import { layout } from '../lib/layout'
import { TRACK_RECORD } from '../lib/constants'

const app = new Hono()

// ── COMPLETED WORKS / TRACK RECORD ────────────────────────────────────────────
app.get('/', (c) => {

  const verticals = [
    {
      id: 'real-estate',
      name: 'Real Estate',
      icon: 'building',
      color: '#1A3A6B',
      bg: 'rgba(26,58,107,.08)',
      border: 'rgba(26,58,107,.2)',
      data: TRACK_RECORD.realEstate,
      summary: '₹2,000+ Cr in transactions across South Delhi, Jaipur, Noida & Lutyens\' Delhi.',
      images: [],
    },
    {
      id: 'retail-leasing',
      name: 'Retail & Leasing',
      icon: 'store',
      color: '#B8960C',
      bg: 'rgba(184,150,12,.08)',
      border: 'rgba(184,150,12,.2)',
      data: TRACK_RECORD.retailLeasing,
      summary: '1,40,000+ sq ft leased across premium destinations in Noida, Delhi & Gurugram.',
      images: [],
    },
    {
      id: 'hospitality',
      name: 'Hospitality',
      icon: 'hotel',
      color: '#065F46',
      bg: 'rgba(6,95,70,.08)',
      border: 'rgba(6,95,70,.2)',
      data: TRACK_RECORD.hospitality,
      summary: '9 PMC & signage projects across Noida, Jim Corbett, Gurugram, Tamil Nadu & Aerocity.',
      images: [
        // Maple Resort Chail — official website images (real project)
        'https://www.mapleresorts.in/img/about/new-left1.jpg',
      ],
    },
    {
      id: 'entertainment',
      name: 'Entertainment',
      icon: 'ticket-alt',
      color: '#7C3AED',
      bg: 'rgba(124,58,237,.08)',
      border: 'rgba(124,58,237,.2)',
      data: TRACK_RECORD.entertainment,
      summary: '₹1,350+ Cr transactions including Adlabs Imagica due diligence & ECL divestment with EY.',
      images: [],
    },
    {
      id: 'debt',
      name: 'Debt & Special Situations',
      icon: 'balance-scale',
      color: '#92400E',
      bg: 'rgba(146,64,14,.08)',
      border: 'rgba(146,64,14,.2)',
      data: TRACK_RECORD.debt,
      summary: '₹1,350+ Cr structured advisory including joint divestment with EY.',
      images: [],
    },
    {
      id: 'horeca',
      name: 'HORECA Solutions',
      icon: 'utensils',
      color: '#C2410C',
      bg: 'rgba(194,65,12,.08)',
      border: 'rgba(194,65,12,.2)',
      data: TRACK_RECORD.horeca,
      summary: '9 major HORECA supply mandates including Mahindra Holidays, Accor, Regenta & Cygnett.',
      images: [],
    },
  ]

  const totalDeals = Object.values(TRACK_RECORD).reduce((s, v) => s + v.length, 0)

  const content = `

<!-- ══ HERO ═══════════════════════════════════════════════════════════════ -->
<div class="hero-dk">
  <div class="hero-dk-grid"></div>
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse 60% 80% at 20% 50%,rgba(184,150,12,.05) 0%,transparent 60%);pointer-events:none;"></div>
  <div style="position:absolute;bottom:0;left:0;right:0;height:100px;background:linear-gradient(to bottom,transparent,var(--ink));pointer-events:none;"></div>
  <div class="wrap" style="position:relative;">
    <div style="max-width:820px;" class="fu">
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;">
        <div style="width:40px;height:1px;background:linear-gradient(90deg,var(--gold),transparent);"></div>
        <span style="font-size:.6rem;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);">Our Portfolio</span>
      </div>
      <h1 class="h1" style="margin-bottom:1.75rem;">Completed Works &amp;<br><em style="color:var(--gold);font-style:italic;">Track Record</em></h1>
      <p class="lead-lt" style="max-width:640px;margin-bottom:3rem;">A portfolio of landmark transactions, project management mandates, leasing assignments and HORECA supply partnerships executed across India's premier sectors.</p>
      <div style="display:flex;flex-wrap:wrap;gap:.625rem;">
        <button onclick="filterVertical('all')" data-filter="all" class="vert-btn active"
                style="padding:.5rem 1.2rem;font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;border:1px solid var(--gold);background:var(--gold);color:#fff;cursor:pointer;transition:all .22s;">All Verticals</button>
        ${verticals.map((v: any) => `
        <button onclick="filterVertical('${v.id}')" data-filter="${v.id}" class="vert-btn"
                style="padding:.5rem 1.2rem;font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.03);color:rgba(255,255,255,.45);cursor:pointer;transition:all .22s;backdrop-filter:blur(4px);">${v.name}</button>`).join('')}
      </div>
    </div>
  </div>
</div>

<!-- ══ SUMMARY STATS ═════════════════════════════════════════════════════ -->
<div style="background:var(--ink-mid);border-bottom:1px solid rgba(255,255,255,.05);">
  <div class="wrap" style="padding-top:0;padding-bottom:0;">
    <div style="display:grid;grid-template-columns:repeat(4,1fr);border-left:1px solid rgba(255,255,255,.05);">
      ${[
        { n: '2000', prefix:'₹', suffix:' Cr+', l: 'Transactions Advised',  icon:'trophy' },
        { n: String(totalDeals),  prefix:'',  suffix:'+',     l: 'Mandates Delivered', icon:'check-circle' },
        { n: '6',                 prefix:'',  suffix:'',      l: 'Verticals Covered',  icon:'layer-group' },
        { n: null,                prefix:'',  suffix:'',      l: 'Geographic Reach',   icon:'map-marked-alt', text:'Pan-India' },
      ].map(s => `
      <div class="works-stat-cell" style="padding:2.25rem 2rem;border-right:1px solid rgba(255,255,255,.05);text-align:center;transition:background .22s;" onmouseover="this.style.background='rgba(184,150,12,.04)'" onmouseout="this.style.background='transparent'">
        <i class="fas fa-${s.icon}" style="font-size:.72rem;color:rgba(184,150,12,.35);margin-bottom:.625rem;display:block;"></i>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2.4rem;color:var(--gold);line-height:1;margin-bottom:.5rem;letter-spacing:-.02em;">
          ${s.n ? `<span style="font-size:.6em;">${s.prefix}</span><span class="count-up" data-target="${s.n}" data-prefix="${s.prefix}" data-suffix="${s.suffix}">0</span><span style="font-size:.65em;">${s.suffix}</span>` : `<span>${s.text}</span>`}
        </div>
        <div style="font-size:.6rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.45);">${s.l}</div>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- ══ ACHIEVEMENT TIMELINE ══════════════════════════════════════════════ -->
<div style="background:var(--bg-dk);padding:3.5rem 0;border-bottom:1px solid rgba(255,255,255,.06);">
  <div class="wrap">
    <div style="text-align:center;margin-bottom:2.5rem;">
      <p style="font-size:.6rem;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:.5rem;">Our Journey</p>
      <h2 class="h2" style="color:#fff;margin:0;">Milestone Timeline</h2>
    </div>
    <div class="timeline-v">
      ${[
        { year:'2017', icon:'🏛️', color:'#B8960C', title:'Founded', desc:'Vivacious Entertainment and Hospitality Pvt. Ltd. incorporated. Commenced advisory across Hospitality and Entertainment sectors.' },
        { year:'2018', icon:'🏨', color:'#065F46', title:'Hotel Management Vertical', desc:'First PMC and pre-opening consultancy mandates for Cygnett, Regenta and Radisson brand properties across North India.' },
        { year:'2019', icon:'🏢', color:'#1A3A6B', title:'Real Estate & Retail Expansion', desc:'Expanded into Real Estate consulting and Retail Leasing strategy, building a truly diversified advisory practice.' },
        { year:'2020', icon:'🍽️', color:'#7C3AED', title:'HORECA Division Launched', desc:'End-to-end FF&E, OS&E and kitchen procurement for hotel pre-openings. Now covers 500+ SKUs across 15+ hotel projects.' },
        { year:'2021', icon:'🌟', color:'#B8960C', title:'India Gully Brand', desc:'Brand identity launched, celebrating Desiness. 30+ retail brand relationships and deepened hospitality advisory.' },
        { year:'2023', icon:'⚖️', color:'#7F1D1D', title:'Pipeline Crosses ₹1,000 Cr', desc:'High-value asset sales in Chandigarh and Himachal Pradesh. Debt & Special Situations vertical established.' },
        { year:'2024', icon:'💻', color:'#1E40AF', title:'Digital Transformation', desc:'India Gully Enterprise Platform launched. Integrated ERP, HORECA procurement, compliance and governance systems.' },
        { year:'2026', icon:'🚀', color:'#B8960C', title:'₹1,165 Cr+ Pipeline', desc:'Active mandate pipeline covering 8 asset classes across Pan-India. Platform v2026.51 — 390+ routes, 100/100 security.' },
      ].map((m, i) => `
      <div class="timeline-item reveal" style="display:grid;grid-template-columns:80px 32px 1fr;gap:0 1.25rem;align-items:start;margin-bottom:2rem;position:relative;">
        <!-- Year -->
        <div style="text-align:right;padding-top:.35rem;">
          <span style="font-family:'DM Serif Display',Georgia,serif;font-size:1.15rem;color:${m.color};line-height:1;">${m.year}</span>
        </div>
        <!-- Dot + line -->
        <div style="display:flex;flex-direction:column;align-items:center;padding-top:.3rem;">
          <div style="width:32px;height:32px;border-radius:50%;background:${m.color}22;border:2px solid ${m.color};display:flex;align-items:center;justify-content:center;font-size:1rem;flex-shrink:0;z-index:1;">${m.icon}</div>
          ${i < 7 ? `<div style="width:2px;flex:1;min-height:40px;background:linear-gradient(to bottom,${m.color}44,transparent);margin-top:.4rem;"></div>` : ''}
        </div>
        <!-- Content -->
        <div style="padding-bottom:.75rem;">
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.05rem;color:#fff;margin-bottom:.3rem;">${m.title}</div>
          <p style="font-size:.85rem;color:rgba(255,255,255,.55);font-family:'DM Sans',sans-serif;line-height:1.65;margin:0;">${m.desc}</p>
        </div>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- ══ VERTICAL SECTIONS ═════════════════════════════════════════════════ -->
<div class="sec-pd" style="padding-top:4rem;">
  <div class="wrap">

    ${verticals.map(v => `
    <!-- ── VERTICAL: ${v.name} ──────────────────────────────── -->
    <div class="vertical-section" data-vertical="${v.id}"
         style="margin-bottom:4rem;padding-bottom:4rem;border-bottom:1px solid var(--border);">

      <!-- Vertical header -->
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:2.5rem;flex-wrap:wrap;gap:1.25rem;">
        <div style="display:flex;align-items:center;gap:1.25rem;">
          <div class="ig-icon-box" style="background:${v.bg};border-color:${v.border};">
            <i class="fas fa-${v.icon}" style="color:${v.color};font-size:1.1rem;"></i>
          </div>
          <div>
            <div style="font-size:.58rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:rgba(184,150,12,.7);margin-bottom:.3rem;">Vertical Track Record</div>
            <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:2rem;color:var(--ink);line-height:1.1;">${v.name}</h2>
            <p style="font-size:.85rem;color:var(--ink-muted);margin-top:.35rem;">${v.summary}</p>
          </div>
        </div>
        <div style="background:${v.bg};border:1px solid ${v.border};padding:.45rem 1rem;flex-shrink:0;display:flex;align-items:center;gap:.5rem;">
          <i class="fas fa-check-circle" style="color:${v.color};font-size:.65rem;"></i>
          <span style="font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:${v.color};">${v.data.length} Projects Delivered</span>
        </div>
      </div>

      <!-- Vertical Banner Image -->
      ${v.images && v.images.length > 0 ? `
      <div style="position:relative;height:220px;overflow:hidden;margin-bottom:2rem;border:1px solid ${v.border};">
        <img src="${v.images[0]}" alt="${v.name} vertical"
             style="width:100%;height:100%;object-fit:cover;transition:transform 6s ease;"
             onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'"
             loading="lazy">
        <div style="position:absolute;inset:0;background:linear-gradient(to right,${v.color}cc 0%,${v.color}33 60%,transparent 100%);"></div>
        <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.5) 0%,transparent 50%);"></div>
        <div style="position:absolute;bottom:1.5rem;left:1.5rem;">
          <div style="font-size:.62rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.7);margin-bottom:.3rem;">Completed Track Record</div>
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:#fff;line-height:1.1;">${v.name}</div>
        </div>
        <div style="position:absolute;top:1rem;right:1rem;background:rgba(0,0,0,.4);backdrop-filter:blur(8px);padding:.4rem .9rem;">
          <span style="font-size:.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#fff;">${v.data.length} Projects</span>
        </div>
      </div>` : ''}

      <!-- Project cards grid -->
      <div class="works-card-grid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;">
        ${v.data.map((p: any, idx: number) => `
        <div class="works-card" style="animation:fadeUp .5s ease ${idx * 0.06}s both;">
          <!-- Gold accent top strip -->
          <div style="height:3px;background:linear-gradient(90deg,${v.color},transparent);opacity:.75;"></div>
          <div style="padding:1.75rem;">
          <!-- Type badge + value -->
          <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1.25rem;flex-wrap:wrap;gap:.5rem;">
            <span style="background:${v.bg};color:${v.color};border:1px solid ${v.border};font-size:.57rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:.22rem .65rem;">${p.type}</span>
            ${p.value ? `<span style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:${v.color};letter-spacing:-.02em;">${p.value}</span>` : ''}
          </div>
          <!-- Title -->
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--ink);line-height:1.3;margin-bottom:.5rem;">${p.title}</h3>
          <!-- Location -->
          <p style="font-size:.68rem;letter-spacing:.06em;color:var(--ink-muted);display:flex;align-items:center;gap:.35rem;margin-bottom:.875rem;">
            <i class="fas fa-map-marker-alt" style="color:${v.color};font-size:.58rem;"></i>${p.location}
          </p>
          <!-- Description -->
          <p style="font-size:.825rem;color:var(--ink-soft);line-height:1.75;">${p.desc}</p>
          <!-- Tags -->
          ${p.tags && p.tags.length > 0 ? `
          <div style="display:flex;flex-wrap:wrap;gap:.35rem;margin-top:1rem;padding-top:1rem;border-top:1px solid var(--border);">
            ${p.tags.slice(0,3).map((t: string) => `<span style="background:${v.bg};color:${v.color};border:1px solid ${v.border};font-size:.57rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;padding:.17rem .5rem;">${t}</span>`).join('')}
          </div>` : ''}
          </div>
        </div>`).join('')}
      </div>
    </div>`).join('')}

    <!-- CTA footer -->
    <div style="text-align:center;padding-top:2rem;">
      <p style="font-size:.82rem;color:var(--ink-muted);margin-bottom:1.5rem;max-width:560px;margin-left:auto;margin-right:auto;line-height:1.8;">
        Interested in a specific vertical or looking to engage India Gully for your next mandate? Our team is available for qualified inquiries.
      </p>
      <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
        <a href="/listings" class="btn btn-g">View Active Mandates</a>
        <a href="/contact" class="btn btn-dko">Speak to Our Team</a>
      </div>
    </div>

  </div>
</div>

<style>
@media(max-width:900px){.works-card-grid{grid-template-columns:repeat(2,1fr)!important;}}
@media(max-width:560px){.works-card-grid{grid-template-columns:1fr!important;}.works-stat-cell{padding:1.5rem 1rem!important;}}
</style>
<script>
function filterVertical(id) {
  // Update buttons
  document.querySelectorAll('.vert-btn').forEach(function(b) {
    var isActive = b.dataset.filter === id;
    b.style.borderColor  = isActive ? 'var(--gold)' : 'rgba(255,255,255,.18)';
    b.style.background   = isActive ? 'var(--gold)' : 'transparent';
    b.style.color        = isActive ? '#fff' : 'rgba(255,255,255,.5)';
  });
  // Filter sections
  document.querySelectorAll('.vertical-section').forEach(function(sec) {
    sec.style.display = (id === 'all' || sec.dataset.vertical === id) ? 'block' : 'none';
  });
}

/* count-up for works stats (uses global layout count-up if available,
   otherwise runs its own IntersectionObserver) */
(function(){
  var els = document.querySelectorAll('.works-stat-cell .count-up');
  if(!els.length) return;
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(!entry.isIntersecting) return;
      var el = entry.target;
      io.unobserve(el);
      var target  = parseInt(el.getAttribute('data-target') || '0', 10);
      var suffix  = el.getAttribute('data-suffix') || '';
      var dur     = 1400;
      var t0      = performance.now();
      function step(now){
        var p = Math.min((now - t0) / dur, 1);
        var ease = 1 - Math.pow(1 - p, 3);
        el.textContent = String(Math.round(ease * target));
        if(p < 1) requestAnimationFrame(step);
        else el.textContent = String(target);
      }
      requestAnimationFrame(step);
    });
  }, {threshold:0.3});
  els.forEach(function(el){ io.observe(el); });
})();
</script>

`

  return c.html(layout('Track Record — Completed Works', content, {
    description: "India Gully's completed works and track record — landmark transactions, PMC projects, retail leasing and HORECA supply mandates across Real Estate, Hospitality, Entertainment, Retail and HORECA verticals.",
    canonical: 'https://india-gully.pages.dev/works',
    ogImage: 'https://india-gully.pages.dev/static/og.jpg',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Track Record — Completed Works',
      url: 'https://india-gully.pages.dev/works',
      description: 'India Gully completed works: ₹2,000+ Cr transactions advised, 15+ hotel projects, 30+ retail brands, 1,40,000+ sq ft leased.',
      publisher: { '@type': 'Organization', name: 'India Gully', url: 'https://india-gully.pages.dev' }
    }
  }))
})

export default app
