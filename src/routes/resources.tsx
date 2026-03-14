import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

// ── RESOURCE CATEGORIES ────────────────────────────────────────────────────
const RESOURCE_CATEGORIES = [
  { id: 'all',       label: 'All Resources',      icon: 'layer-group' },
  { id: 'horeca',    label: 'HORECA & Procurement', icon: 'utensils'    },
  { id: 'real-estate', label: 'Real Estate',       icon: 'building'    },
  { id: 'hospitality', label: 'Hospitality',        icon: 'hotel'       },
  { id: 'advisory',  label: 'Transaction Advisory', icon: 'chart-bar'   },
  { id: 'legal',     label: 'Legal & Compliance',   icon: 'balance-scale'},
]

// ── RESOURCES ─────────────────────────────────────────────────────────────
const RESOURCES = [
  // HORECA
  {
    id:       'horeca-procurement-checklist',
    cat:      'horeca',
    type:     'Checklist',
    typeIcon: 'clipboard-check',
    typeColor:'#15803d',
    title:    'Hotel Pre-Opening HORECA Procurement Checklist',
    desc:     'India Gully\'s master checklist for FF&E, OS&E and kitchen procurement across 8 category clusters. 500+ SKU reference guide for 40–200 key hotel openings.',
    tags:     ['FF&E', 'OS&E', 'Pre-Opening', 'Procurement'],
    pages:    '18 pages',
    updated:  'February 2026',
    access:   'Free — Email Required',
    icon:     'clipboard-list',
    img:      'https://hotelrajshreechandigarh.com/wp-content/uploads/2025/12/IMG_1157-1-scaled-1.webp',
  },
  {
    id:       'horeca-vendor-rfq-template',
    cat:      'horeca',
    type:     'Template',
    typeIcon: 'file-alt',
    typeColor:'#15803d',
    title:    'HORECA Vendor RFQ & Evaluation Template',
    desc:     'Standardised Request for Quotation format and vendor scoring matrix used by India Gully across 15+ hotel projects. Covers kitchen equipment, linen, uniforms, guest amenities.',
    tags:     ['RFQ', 'Vendor Management', 'Template'],
    pages:    '12 pages',
    updated:  'January 2026',
    access:   'Free — Email Required',
    icon:     'file-contract',
    img:      'https://hotelrajshreechandigarh.com/wp-content/uploads/2025/12/Hotel-Rajshree-5-scaled-e1765525431558.webp',
  },
  {
    id:       'tier2-hotel-procurement-case-study',
    cat:      'horeca',
    type:     'Case Study',
    typeIcon: 'book-open',
    typeColor:'#1d4ed8',
    title:    'Case Study: Hotel Rajshree & Spa, Chandigarh',
    desc:     'Full HORECA procurement case study for a 41-key boutique hotel in Chandigarh. Covers 12 vendor mobilisation, 14-week programme, 11% cost saving, 100% on-spec delivery.',
    tags:     ['Case Study', 'Chandigarh', 'Boutique Hotel'],
    pages:    '8 pages',
    updated:  'December 2025',
    access:   'Free — Email Required',
    icon:     'building',
    img:      'https://hotelrajshreechandigarh.com/wp-content/uploads/2025/12/IMG_1157-1-scaled-1.webp',
  },
  {
    id:       'horeca-cost-benchmarks-2026',
    cat:      'horeca',
    type:     'Research',
    typeIcon: 'chart-bar',
    typeColor:'#7C3AED',
    title:    'HORECA Procurement Cost Benchmarks India 2026',
    desc:     'India Gully\'s proprietary cost benchmarks for hotel FF&E and OS&E procurement across Tier 1, 2 and 3 cities. Based on ₹50 Cr+ cumulative procurement across 15+ hotels.',
    tags:     ['Benchmarks', 'Cost Data', 'Research', '2026'],
    pages:    '24 pages',
    updated:  'March 2026',
    access:   'Submit EOI — Advisory Clients',
    icon:     'chart-line',
    img:      'https://www.mapleresorts.in/images/slider/maple-resort-chail-1.jpg',
  },
  // Real Estate
  {
    id:       'hotel-valuation-guide-india',
    cat:      'real-estate',
    type:     'Guide',
    typeIcon: 'book',
    typeColor:'#B8960C',
    title:    'Hotel Valuation Methodology Guide — India',
    desc:     'A practitioner\'s guide to hotel valuation in India. Covers Cap Rate, DCF and Revenue Method approaches, city-specific cap rate benchmarks, and India Gully\'s integrated valuation framework.',
    tags:     ['Valuation', 'Methodology', 'Real Estate'],
    pages:    '28 pages',
    updated:  'February 2026',
    access:   'Free — Email Required',
    icon:     'calculator',
    img:      'https://www.mapleresorts.in/images/slider/maple-resort-chail-2.jpg',
  },
  {
    id:       'mixed-use-development-checklist',
    cat:      'real-estate',
    type:     'Checklist',
    typeIcon: 'clipboard-check',
    typeColor:'#1A3A6B',
    title:    'Mixed-Use Hotel + Office + Retail Development Checklist',
    desc:     'Due diligence checklist for mixed-use developments integrating hotel, office and retail components. Covers planning, structuring, leasing sequencing and exit strategy.',
    tags:     ['Mixed-Use', 'Due Diligence', 'Development'],
    pages:    '16 pages',
    updated:  'January 2026',
    access:   'Free — Email Required',
    icon:     'city',
    img:      'https://www.welcomheritagehotels.in/wp-content/uploads/2024/09/santa-roza-overview.jpg',
  },
  {
    id:       'india-realty-investor-deck-2026',
    cat:      'real-estate',
    type:     'Presentation',
    typeIcon: 'file-powerpoint',
    typeColor:'#B8960C',
    title:    'India Real Estate Investor Deck 2026',
    desc:     'India Gully\'s 2026 investor outlook covering commercial, hospitality and mixed-use real estate. Macro drivers, supply-demand dynamics, city-by-city cap rates, yield trends and India Gully\'s active pipeline.',
    tags:     ['Investor Deck', 'Outlook', '2026', 'Research'],
    pages:    '32 slides',
    updated:  'March 2026',
    access:   'Submit EOI — Qualified Investors',
    icon:     'presentation',
    img:      'https://hotelrajshreechandigarh.com/wp-content/uploads/2025/12/Hotel-Rajshree-5-scaled-e1765525431558.webp',
  },
  // Hospitality
  {
    id:       'greenfield-hotel-feasibility-template',
    cat:      'hospitality',
    type:     'Template',
    typeIcon: 'file-alt',
    typeColor:'#065F46',
    title:    'Greenfield Hotel Feasibility Study Template',
    desc:     'India Gully\'s standard feasibility template for Tier 2 and Tier 3 greenfield hotel developments. Covers demand study, P&L projections, debt sizing, brand selection and break-even analysis.',
    tags:     ['Feasibility', 'Greenfield', 'Template', 'Tier 2'],
    pages:    '20 pages',
    updated:  'December 2025',
    access:   'Free — Email Required',
    icon:     'hotel',
    img:      'https://www.mapleresorts.in/img/about/new-right1.jpg',
  },
  {
    id:       'hotel-management-contract-guide',
    cat:      'hospitality',
    type:     'Guide',
    typeIcon: 'book',
    typeColor:'#065F46',
    title:    'Hotel Management Contract Negotiation Guide',
    desc:     'Key-terms guide for hotel owners negotiating management contracts with international and domestic brands. Fee structures, performance tests, termination clauses, FF&E reserve provisions.',
    tags:     ['HMA', 'Management Contract', 'Brand Negotiation'],
    pages:    '22 pages',
    updated:  'November 2025',
    access:   'Free — Email Required',
    icon:     'file-signature',
    img:      'https://www.welcomheritagehotels.in/wp-content/uploads/2024/09/santa-roza-room.jpg',
  },
  // Advisory
  {
    id:       'nda-eoi-framework',
    cat:      'advisory',
    type:     'Framework',
    typeIcon: 'shield-alt',
    typeColor:'#B8960C',
    title:    'India Gully NDA & Expression of Interest Framework',
    desc:     'Overview of India Gully\'s NDA gate, EOI submission process, Information Memorandum access protocol and advisory engagement framework for qualified investors.',
    tags:     ['NDA', 'EOI', 'Process', 'Advisory'],
    pages:    '6 pages',
    updated:  'March 2026',
    access:   'Publicly Available',
    icon:     'handshake',
    img:      'https://hotelrajshreechandigarh.com/wp-content/uploads/2025/12/Hotel-Rajshree-5-scaled-e1765525431558.webp',
  },
  {
    id:       'distressed-asset-acquisition-playbook',
    cat:      'advisory',
    type:     'Playbook',
    typeIcon: 'book-open',
    typeColor:'#7F1D1D',
    title:    'Distressed Hospitality Asset Acquisition Playbook',
    desc:     'India Gully\'s step-by-step playbook for acquiring distressed hotel assets via OTS, IBC resolution or promoter restructuring. Covers due diligence, valuation, lender negotiation and post-acquisition turnaround.',
    tags:     ['Distressed Assets', 'IBC', 'Acquisition'],
    pages:    '30 pages',
    updated:  'February 2026',
    access:   'Submit EOI — Advisory Clients',
    icon:     'chess-rook',
    img:      'https://www.mapleresorts.in/images/slider/maple-resort-chail-1.jpg',
  },
  // Legal
  {
    id:       'fssai-licence-guide-horeca',
    cat:      'legal',
    type:     'Regulatory Guide',
    typeIcon: 'balance-scale',
    typeColor:'#7C3AED',
    title:    'FSSAI Licence Guide for HORECA Operators',
    desc:     'India Gully\'s compliance guide for FSSAI licencing requirements for hotels, restaurants and caterers. State-wise licence types, application process, renewal timelines and penalty framework.',
    tags:     ['FSSAI', 'Compliance', 'HORECA', 'Regulatory'],
    pages:    '14 pages',
    updated:  'January 2026',
    access:   'Free — Email Required',
    icon:     'clipboard-check',
    img:      'https://hotelrajshreechandigarh.com/wp-content/uploads/2025/12/IMG_1157-1-scaled-1.webp',
  },
]

// ── ROUTE ─────────────────────────────────────────────────────────────────
app.get('/', (c) => {
  const content = `

<!-- ══ HERO ══════════════════════════════════════════════════════════════ -->\n
<div class="hero-dk">
  <div class="hero-dk-grid"></div>
  <div class="hero-dk-radial"></div>
  <div style="position:absolute;bottom:0;left:0;right:0;height:120px;background:linear-gradient(to bottom,transparent,var(--ink));pointer-events:none;"></div>
  <div class="wrap" style="position:relative;">
    <div style="max-width:820px;" class="fu">
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;">
        <div style="width:40px;height:1px;background:linear-gradient(90deg,var(--gold),transparent);"></div>
        <span style="font-size:.6rem;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);">Knowledge Hub</span>
      </div>
      <h1 class="h1" style="margin-bottom:1.75rem;">Resources &amp;<br><em style="color:var(--gold);font-style:italic;">Downloads</em></h1>
      <p class="lead-lt" style="max-width:640px;margin-bottom:3rem;">Practical guides, templates, checklists and research drawn from India Gully's 8+ years of boots-on-the-ground execution across HORECA procurement, real estate transactions, hospitality advisory and regulatory compliance.</p>
      <!-- Stats row -->
      <div style="display:flex;flex-wrap:wrap;gap:2.5rem;">
        ${[
          { n: '12+', l: 'Resources' },
          { n: '8 yrs', l: 'Advisory Experience' },
          { n: '₹50 Cr+', l: 'Procurement Tracked' },
          { n: 'Free', l: 'Most Resources' },
        ].map(s => `<div><div style="font-family:'DM Serif Display',Georgia,serif;font-size:2rem;color:var(--gold);line-height:1;">${s.n}</div><div style="font-size:.6rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.45);margin-top:.25rem;">${s.l}</div></div>`).join('')}
      </div>
    </div>
  </div>
</div>

<!-- ══ CATEGORY FILTER ══════════════════════════════════════════════════ -->\n
<div style="background:var(--ink-mid);border-bottom:1px solid rgba(255,255,255,.06);position:sticky;top:0;z-index:100;backdrop-filter:blur(12px);">
  <div class="wrap" style="padding-top:0;padding-bottom:0;">
    <div style="display:flex;align-items:center;gap:.5rem;overflow-x:auto;padding:1rem 0;scrollbar-width:none;-webkit-overflow-scrolling:touch;">
      ${RESOURCE_CATEGORIES.map((cat, i) => `
      <button onclick="filterRes('${cat.id}')" data-rescat="${cat.id}" class="res-cat-btn${i===0?' active':''}"
              style="white-space:nowrap;padding:.45rem 1.1rem;font-size:.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:1px solid ${i===0?'var(--gold)':'rgba(255,255,255,.12)'};background:${i===0?'var(--gold)':'rgba(255,255,255,.03)'};color:${i===0?'#fff':'rgba(255,255,255,.45)'};cursor:pointer;transition:all .22s;flex-shrink:0;">
        <i class="fas fa-${cat.icon}" style="margin-right:.35rem;font-size:.6rem;"></i>${cat.label}
      </button>`).join('')}
    </div>
  </div>
</div>

<!-- ══ RESOURCES GRID ════════════════════════════════════════════════════ -->\n
<div class="sec-pd" style="padding-top:4rem;">
  <div class="wrap">
    <div id="resGrid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;">
      ${RESOURCES.map(r => `
      <!-- Resource card: ${r.id} -->
      <div class="res-card" data-rescat="${r.cat}" style="background:#fff;border:1px solid var(--border-lt);overflow:hidden;transition:all .28s;cursor:pointer;position:relative;"
           onmouseover="this.style.borderColor='rgba(184,150,12,.3)';this.style.boxShadow='0 16px 52px rgba(0,0,0,.1)';this.style.transform='translateY(-4px)'"
           onmouseout="this.style.borderColor='var(--border-lt)';this.style.boxShadow='none';this.style.transform='translateY(0)'">
        <!-- Image header -->
        <div style="height:160px;overflow:hidden;position:relative;background:#111;">
          <img src="${r.img}" alt="${r.title}" style="width:100%;height:100%;object-fit:cover;transition:transform 6s ease;" loading="lazy"
               onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
          <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.7),rgba(0,0,0,.1));"></div>
          <!-- Type badge -->
          <div style="position:absolute;top:.875rem;left:.875rem;background:${r.typeColor};color:#fff;padding:.2rem .65rem;font-size:.56rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;display:flex;align-items:center;gap:.3rem;">
            <i class="fas fa-${r.typeIcon}" style="font-size:.55rem;"></i>${r.type}
          </div>
          <!-- Access badge -->
          <div style="position:absolute;bottom:.875rem;right:.875rem;background:rgba(0,0,0,.55);backdrop-filter:blur(6px);padding:.2rem .55rem;font-size:.56rem;color:rgba(255,255,255,.75);letter-spacing:.04em;border:1px solid rgba(255,255,255,.12);">
            ${r.access.startsWith('Free') ? `<i class="fas fa-unlock" style="color:var(--gold);margin-right:.3rem;font-size:.5rem;"></i>` : `<i class="fas fa-lock" style="color:rgba(255,165,0,.7);margin-right:.3rem;font-size:.5rem;"></i>`}${r.access}
          </div>
        </div>
        <!-- Body -->
        <div style="padding:1.5rem;">
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.02rem;color:var(--ink);line-height:1.28;margin-bottom:.75rem;">${r.title}</h3>
          <p style="font-size:.8rem;color:var(--ink-muted);line-height:1.7;margin-bottom:1rem;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;">${r.desc}</p>
          <!-- Meta row -->
          <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem;flex-wrap:wrap;">
            <span style="font-size:.65rem;color:var(--ink-faint);display:flex;align-items:center;gap:.3rem;"><i class="fas fa-file-alt" style="color:var(--gold);font-size:.6rem;"></i>${r.pages}</span>
            <span style="font-size:.65rem;color:var(--ink-faint);display:flex;align-items:center;gap:.3rem;"><i class="fas fa-calendar" style="color:var(--gold);font-size:.6rem;"></i>${r.updated}</span>
          </div>
          <!-- Tags -->
          <div style="display:flex;flex-wrap:wrap;gap:.3rem;margin-bottom:1.1rem;">
            ${r.tags.map(t => `<span style="background:rgba(10,10,10,.04);border:1px solid var(--border);color:var(--ink-soft);font-size:.57rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:.15rem .5rem;">${t}</span>`).join('')}
          </div>
          <!-- CTA -->
          <button onclick="igRequestResource('${r.id}','${r.title}','${r.access}')"
                  style="width:100%;padding:.7rem;background:var(--ink);color:#fff;border:none;cursor:pointer;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;transition:background .22s;display:flex;align-items:center;justify-content:center;gap:.5rem;"
                  onmouseover="this.style.background='var(--gold)'" onmouseout="this.style.background='var(--ink)'">
            <i class="fas fa-${r.access.startsWith('Free') ? 'download' : 'envelope'}" style="font-size:.65rem;"></i>
            ${r.access.startsWith('Free') ? 'Request Access' : 'Submit EOI for Access'}
          </button>
        </div>
      </div>`).join('')}
    </div>

    <!-- Empty state -->
    <div id="resEmpty" style="display:none;text-align:center;padding:5rem 2rem;">
      <i class="fas fa-search" style="font-size:2rem;color:var(--ink-faint);margin-bottom:1rem;display:block;"></i>
      <p style="color:var(--ink-muted);">No resources found in this category.</p>
    </div>
  </div>
</div>

<!-- ══ REQUEST ACCESS MODAL ═══════════════════════════════════════════════ -->\n
<div id="res-modal" style="display:none;position:fixed;inset:0;z-index:9000;background:rgba(6,6,6,.88);backdrop-filter:blur(12px);align-items:center;justify-content:center;padding:1rem;">
  <div style="width:100%;max-width:480px;background:#fff;overflow:hidden;box-shadow:0 40px 100px rgba(0,0,0,.6);">
    <div style="background:var(--ink);padding:1.5rem 1.75rem;display:flex;align-items:center;justify-content:space-between;">
      <div style="display:flex;align-items:center;gap:.875rem;">
        <div style="width:40px;height:40px;background:var(--gold);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <i class="fas fa-download" style="color:#fff;font-size:.9rem;"></i>
        </div>
        <div>
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:#fff;margin-bottom:.1rem;" id="res-modal-title">Request Access</h3>
          <p style="font-size:.65rem;color:rgba(255,255,255,.4);">India Gully Knowledge Hub</p>
        </div>
      </div>
      <button onclick="document.getElementById('res-modal').style.display='none'"
              style="width:32px;height:32px;border:1px solid rgba(255,255,255,.15);background:transparent;color:rgba(255,255,255,.5);cursor:pointer;font-size:.85rem;display:flex;align-items:center;justify-content:center;"
              onmouseover="this.style.background='rgba(255,255,255,.08)'" onmouseout="this.style.background='transparent'">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div style="padding:1.5rem 1.75rem;">
      <p id="res-modal-desc" style="font-size:.8rem;color:var(--ink-muted);line-height:1.6;margin-bottom:1.25rem;padding:.875rem;background:var(--parch);border-left:3px solid var(--gold);"></p>
      <div style="display:flex;flex-direction:column;gap:.625rem;margin-bottom:1.25rem;">
        <div>
          <label style="display:block;font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.25rem;">Full Name *</label>
          <input id="res-name" type="text" placeholder="Your full name" autocomplete="name"
                 style="width:100%;box-sizing:border-box;border:1px solid var(--border);padding:.6rem .875rem;font-size:.875rem;color:var(--ink);font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s;"
                 onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='var(--border)'">
        </div>
        <div>
          <label style="display:block;font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.25rem;">Email Address *</label>
          <input id="res-email" type="email" placeholder="your@email.com" autocomplete="email"
                 style="width:100%;box-sizing:border-box;border:1px solid var(--border);padding:.6rem .875rem;font-size:.875rem;color:var(--ink);font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s;"
                 onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='var(--border)'">
        </div>
        <div>
          <label style="display:block;font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.25rem;">Organisation</label>
          <input id="res-org" type="text" placeholder="Company / Fund / Hotel (optional)" autocomplete="organization"
                 style="width:100%;box-sizing:border-box;border:1px solid var(--border);padding:.6rem .875rem;font-size:.875rem;color:var(--ink);font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s;"
                 onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='var(--border)'">
        </div>
      </div>
      <div id="res-modal-err" style="display:none;background:#fef2f2;border:1px solid #fecaca;padding:.5rem .75rem;margin-bottom:.875rem;font-size:.75rem;color:#dc2626;">
        <i class="fas fa-exclamation-circle" style="margin-right:.35rem;"></i>Please enter your name and a valid email address.
      </div>
      <div id="res-modal-success" style="display:none;background:#f0fdf4;border:1px solid #bbf7d0;padding:.875rem;margin-bottom:.875rem;font-size:.8rem;color:#166534;line-height:1.6;"></div>
      <button id="res-modal-submit" onclick="igSubmitResourceRequest()"
              style="width:100%;padding:.8rem;background:var(--ink);color:#fff;border:none;cursor:pointer;font-size:.75rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;transition:background .22s;display:flex;align-items:center;justify-content:center;gap:.5rem;"
              onmouseover="this.style.background='var(--gold)'" onmouseout="this.style.background='var(--ink)'">
        <i class="fas fa-paper-plane" style="font-size:.65rem;"></i>Send Access Request
      </button>
      <p style="font-size:.62rem;color:var(--ink-faint);margin-top:.75rem;text-align:center;line-height:1.6;">India Gully will send access details within 1 business day. Your information is confidential and used solely to fulfil this request. CIN: U74999DL2017PTC323237</p>
    </div>
  </div>
</div>

<!-- ══ CONTRIBUTE / CUSTOM RESEARCH CTA ══════════════════════════════════ -->\n
<div style="background:var(--ink-mid);border-top:1px solid rgba(255,255,255,.06);padding:4rem 0;">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:center;">
      <div>
        <p style="font-size:.6rem;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:.875rem;">Custom Research</p>
        <h2 class="h2" style="color:#fff;margin-bottom:1.25rem;">Need Bespoke Research or a Custom Report?</h2>
        <p style="color:rgba(255,255,255,.55);line-height:1.85;margin-bottom:2rem;">India Gully provides bespoke research mandates for institutional investors, developers and hotel owners. Custom feasibility studies, market demand analyses, procurement cost benchmarks and regulatory due diligence packages — all built on our proprietary transaction data and network intelligence.</p>
        <div style="display:flex;gap:1rem;flex-wrap:wrap;">
          <a href="/contact" class="btn btn-g">Commission Custom Research</a>
          <a href="/insights" style="display:inline-flex;align-items:center;gap:.5rem;font-size:.78rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.55);text-decoration:none;padding:.75rem 0;transition:color .2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.55)'">
            <i class="fas fa-newspaper" style="font-size:.65rem;"></i>Read Our Insights
          </a>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
        ${[
          { icon:'search', title:'Market Research', desc:'City-level demand studies, competitive landscape analysis, supply pipeline mapping' },
          { icon:'calculator', title:'Feasibility Studies', desc:'Financial feasibility for hotel, retail and mixed-use developments' },
          { icon:'gavel', title:'Regulatory Reports', desc:'FSSAI, licensing, zoning, NOC requirements for specific projects' },
          { icon:'chart-pie', title:'Investment Analysis', desc:'Valuation, IRR modelling, scenario analysis for acquisition decisions' },
        ].map(s => `
        <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);padding:1.25rem;transition:all .22s;" onmouseover="this.style.background='rgba(184,150,12,.05)';this.style.borderColor='rgba(184,150,12,.2)'" onmouseout="this.style.background='rgba(255,255,255,.03)';this.style.borderColor='rgba(255,255,255,.06)'">
          <i class="fas fa-${s.icon}" style="color:var(--gold);font-size:1rem;margin-bottom:.75rem;display:block;"></i>
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:.95rem;color:#fff;margin-bottom:.4rem;">${s.title}</div>
          <p style="font-size:.75rem;color:rgba(255,255,255,.4);line-height:1.6;margin:0;">${s.desc}</p>
        </div>`).join('')}
      </div>
    </div>
  </div>
</div>

<style>
@media(max-width:900px){#resGrid{grid-template-columns:repeat(2,1fr)!important;}}
@media(max-width:560px){#resGrid{grid-template-columns:1fr!important;}}
#res-modal.open{display:flex!important;}
</style>

<script>
var _resCurrentId = '', _resCurrentTitle = '', _resCurrentAccess = '';

function filterRes(cat) {
  var btns = document.querySelectorAll('.res-cat-btn');
  btns.forEach(function(b) {
    var isActive = b.dataset.rescat === cat;
    b.classList.toggle('active', isActive);
    b.style.borderColor = isActive ? 'var(--gold)' : 'rgba(255,255,255,.12)';
    b.style.background = isActive ? 'var(--gold)' : 'rgba(255,255,255,.03)';
    b.style.color = isActive ? '#fff' : 'rgba(255,255,255,.45)';
  });
  var cards = document.querySelectorAll('#resGrid .res-card');
  var visible = 0;
  cards.forEach(function(card) {
    var match = cat === 'all' || card.dataset.rescat === cat;
    card.style.display = match ? '' : 'none';
    if (match) visible++;
  });
  var empty = document.getElementById('resEmpty');
  if (empty) empty.style.display = visible === 0 ? 'block' : 'none';
}

function igRequestResource(id, title, access) {
  _resCurrentId = id;
  _resCurrentTitle = title;
  _resCurrentAccess = access;
  var modal = document.getElementById('res-modal');
  var titleEl = document.getElementById('res-modal-title');
  var descEl = document.getElementById('res-modal-desc');
  if (titleEl) titleEl.textContent = access.startsWith('Free') ? 'Request Access: ' + title : 'Submit EOI for: ' + title;
  if (descEl) descEl.textContent = access.startsWith('Free')
    ? 'Provide your details below. India Gully will send access credentials to your email within 1 business day.'
    : 'This resource is available to advisory clients and qualified investors. Submit your expression of interest and our team will be in touch.';
  var errEl = document.getElementById('res-modal-err');
  var succEl = document.getElementById('res-modal-success');
  var subBtn = document.getElementById('res-modal-submit');
  if (errEl) errEl.style.display = 'none';
  if (succEl) { succEl.style.display = 'none'; succEl.textContent = ''; }
  if (subBtn) subBtn.style.display = '';
  if (modal) modal.style.display = 'flex';
}

function igSubmitResourceRequest() {
  var name = document.getElementById('res-name').value.trim();
  var email = document.getElementById('res-email').value.trim();
  var org = document.getElementById('res-org').value.trim();
  var errEl = document.getElementById('res-modal-err');
  var succEl = document.getElementById('res-modal-success');
  var subBtn = document.getElementById('res-modal-submit');

  if (!name || !email || !/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(email)) {
    if (errEl) errEl.style.display = 'block';
    return;
  }
  if (errEl) errEl.style.display = 'none';
  if (subBtn) { subBtn.disabled = true; subBtn.innerHTML = '<i class="fas fa-spinner fa-spin" style="font-size:.65rem;margin-right:.4rem;"></i>Sending...'; subBtn.style.background = 'var(--ink-muted)'; }

  fetch('/api/enquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name,
      email: email,
      organisation: org,
      message: 'Resource access request: ' + _resCurrentTitle + ' (Access level: ' + _resCurrentAccess + ')',
      source: 'resources_page',
      resource_id: _resCurrentId,
    })
  })
  .then(function(r) { return r.json(); })
  .then(function(d) {
    if (subBtn) subBtn.style.display = 'none';
    if (succEl) {
      succEl.style.display = 'block';
      succEl.innerHTML = '<i class="fas fa-check-circle" style="margin-right:.5rem;color:#16a34a;"></i><strong>Request received!</strong> We\'ll send access details to <strong>' + email + '</strong> within 1 business day. Reference: ' + (d.ref || 'IG-RES-' + Date.now());
    }
  })
  .catch(function() {
    if (subBtn) { subBtn.disabled = false; subBtn.innerHTML = '<i class="fas fa-paper-plane" style="font-size:.65rem;"></i> Send Access Request'; subBtn.style.background = 'var(--ink)'; subBtn.onmouseover = function(){this.style.background='var(--gold)'}; subBtn.onmouseout = function(){this.style.background='var(--ink)'}; }
    if (errEl) { errEl.style.display = 'block'; errEl.innerHTML = '<i class="fas fa-exclamation-circle" style="margin-right:.35rem;"></i>Network error. Please email info@indiagully.com directly.'; }
  });
}

// Close modal on backdrop click
document.getElementById('res-modal').addEventListener('click', function(e){
  if (e.target === this) this.style.display = 'none';
});
</script>
`

  return c.html(layout('Resources & Downloads', content, {
    description: 'India Gully Knowledge Hub — free guides, checklists, templates and research covering HORECA procurement, hotel feasibility, real estate valuation and hospitality advisory. Download practical tools built from 8+ years of advisory experience.',
    canonical: 'https://india-gully.pages.dev/resources'
  }))
})

export default app
