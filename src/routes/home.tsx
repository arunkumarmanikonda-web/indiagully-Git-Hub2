import { Hono } from 'hono'
import { layout } from '../lib/layout'
import { VERTICALS, LISTINGS, HOSPITALITY_BRANDS, RETAIL_BRANDS, ADVISORY_PARTNERS } from '../lib/constants'

const app = new Hono()

// ── HERO SLIDES ─────────────────────────────────────────────────────────────
const SLIDES = [
  {
    bg: 'linear-gradient(135deg,#06060a 0%,#0f0f05 100%)',
    tag: 'Transaction Advisory · Pan-India',
    h1a: 'Celebrating',
    h1b: 'Desiness',
    h1c: 'Across Every Vertical',
    sub: "India Gully is India's premier multi-vertical advisory firm, bringing institutional rigour to Real Estate, Retail, Hospitality, Entertainment, Debt & HORECA Solutions.",
    cta1: { text: 'View Active Mandates', href: '/listings' },
    cta2: { text: 'Submit Mandate', href: '/contact' },
    img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1600&q=85',
  },
  {
    bg: 'linear-gradient(135deg,#040408 0%,#080412 100%)',
    tag: 'Active Mandate · Maharashtra · ₹4,500 Cr',
    h1a: 'Integrated',
    h1b: 'Entertainment',
    h1c: 'Destination. Maharashtra',
    sub: '200+ acres. Theme Park, Luxury Hotel & Retail Mall. Phase 1 approved. Exclusive transaction advisory mandate. First-of-its-kind project in India.',
    cta1: { text: 'View This Mandate', href: '/listings/entertainment-maharashtra' },
    cta2: { text: 'Request Brochure', href: '/contact' },
    img: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&q=85',
  },
  {
    bg: 'linear-gradient(135deg,#040a04 0%,#060f08 100%)',
    tag: 'Hotel Management · Brand On-Boarding · Pre-Opening',
    h1a: '15+ Hotels.',
    h1b: '20+ Brands.',
    h1c: 'One Trusted Partner.',
    sub: "From Marriott to Radisson to IHG, India Gully navigates brand negotiations, manages hotel openings and drives revenue strategy with institutional authority.",
    cta1: { text: 'Our Hospitality Practice', href: '/services#hospitality' },
    cta2: { text: 'Explore All Services', href: '/services' },
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=85',
  },
  {
    bg: 'linear-gradient(135deg,#080404 0%,#140808 100%)',
    tag: 'Retail Leasing · Brand Mix · Franchise Expansion',
    h1a: '30+ Retail',
    h1b: 'Brands.',
    h1c: 'Pan-India Leasing Expertise.',
    sub: 'Mall developers, mixed-use destinations and retail brands trust India Gully for brand mix strategy, anchor leasing, fit-out coordination and franchise roll-out.',
    cta1: { text: 'Retail & Leasing Practice', href: '/services#retail' },
    cta2: { text: 'Submit a Leasing Enquiry', href: '/contact' },
    img: 'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1600&q=85',
  },
]

app.get('/', (c) => {
  const content = `

<!-- ══ HERO CAROUSEL ════════════════════════════════════════════════════ -->
<div class="car">
  <div class="car-track">
    ${SLIDES.map((s, i) => `
    <div class="car-slide${i === 0 ? ' on' : ''}">
      <!-- Background image with Ken Burns -->
      <div class="car-bg" style="background-image:url('${s.img}');background-color:${s.bg.includes('#')?s.bg.split(' ').find((x:string)=>x.startsWith('#')):'#060606'};"></div>
      <!-- Dark cinematic overlay -->
      <div style="position:absolute;inset:0;background:linear-gradient(105deg,rgba(4,4,8,.88) 0%,rgba(4,4,8,.6) 55%,rgba(4,4,8,.2) 100%);pointer-events:none;"></div>
      <!-- Gold grid overlay -->
      <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.04) 1px,transparent 1px);background-size:72px 72px;pointer-events:none;"></div>
      <div class="car-ov"></div>
      <div class="car-body">
        <div class="wrap" style="width:100%;">
          <div class="s-txt" style="max-width:700px;">
            <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1.5rem;">
              <div style="width:36px;height:1.5px;background:var(--gold);"></div>
              <span class="eyebrow">${s.tag}</span>
            </div>
            <h1 class="h1" style="margin-bottom:1.5rem;">
              ${s.h1a}<br>
              <em style="font-style:italic;color:var(--gold);">${s.h1b}</em><br>
              <span style="font-size:.58em;font-weight:300;color:rgba(255,255,255,.5);">${s.h1c}</span>
            </h1>
            <p class="lead-lt" style="max-width:560px;margin-bottom:2.25rem;">${s.sub}</p>
            <div style="display:flex;flex-wrap:wrap;gap:.875rem;">
              <a href="${s.cta1.href}" class="btn btn-g">${s.cta1.text}</a>
              <a href="${s.cta2.href}" class="btn btn-ghost">${s.cta2.text}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    `).join('')}
  </div>

  <div class="car-ct"></div>
  <button class="car-arr car-prev"><i class="fas fa-chevron-left"></i></button>
  <button class="car-arr car-next"><i class="fas fa-chevron-right"></i></button>
  <div class="car-dots">
    ${SLIDES.map((_,i) => `<button class="c-dot${i===0?' on':''}"></button>`).join('')}
  </div>
  <div class="car-pb"></div>

  <div style="position:absolute;bottom:2rem;right:2rem;z-index:10;display:flex;align-items:center;gap:.5rem;opacity:.35;">
    <span style="font-size:.6rem;letter-spacing:.16em;text-transform:uppercase;color:#fff;">Scroll</span>
    <i class="fas fa-arrow-down" style="font-size:.6rem;color:var(--gold);animation:bounce 2s infinite;"></i>
  </div>
</div>
<style>@keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(4px)}}</style>

<!-- ══ GOLD TICKER ════════════════════════════════════════════════════════ -->
<div class="ticker">
  <div class="ticker-tr">
    ${['Real Estate Advisory','Retail Leasing Strategy','Hotel Management','Entertainment Advisory','Debt & Special Situations','HORECA Solutions','Transaction Advisory','Brand On-Boarding','Feasibility Studies','Project Management','Asset Management','Greenfield Hotels','Mall Leasing','FF&E Procurement','₹8,815 Cr+ Pipeline','15+ Hotel Projects','30+ Retail Brands'].map(t=>`<span style="font-size:.66rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:rgba(0,0,0,.8);padding:0 2.25rem;">${t}</span><span style="color:rgba(0,0,0,.3);font-size:.5rem;">◆</span>`).join('')}
    ${['Real Estate Advisory','Retail Leasing Strategy','Hotel Management','Entertainment Advisory','Debt & Special Situations','HORECA Solutions','Transaction Advisory','Brand On-Boarding','Feasibility Studies','Project Management','Asset Management','Greenfield Hotels','Mall Leasing','FF&E Procurement','₹8,815 Cr+ Pipeline','15+ Hotel Projects','30+ Retail Brands'].map(t=>`<span style="font-size:.66rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:rgba(0,0,0,.8);padding:0 2.25rem;">${t}</span><span style="color:rgba(0,0,0,.3);font-size:.5rem;">◆</span>`).join('')}
  </div>
</div>

<!-- ══ STATS BAR ══════════════════════════════════════════════════════════ -->
<div class="sec-wh" style="padding:3.5rem 0;border-bottom:1px solid var(--border);">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:0;border:1px solid var(--border);">
      ${[
        { n:'₹10,000 Cr+', l:'Advisory Pipeline' },
        { n:'15+',         l:'Hotel Projects' },
        { n:'30+',         l:'Retail Brand Partners' },
        { n:'20+',         l:'Hospitality Brands' },
        { n:'Pan-India',   l:'Operations Reach' },
      ].map((s,i) => `
      <div style="padding:2rem 1.5rem;text-align:center;${i<4?'border-right:1px solid var(--border);':''}">
        <div class="stat-n">${s.n}</div>
        <div style="font-size:.66rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);margin-top:.45rem;">${s.l}</div>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- ══ FEATURED MANDATES ══════════════════════════════════════════════════ -->
<div class="sec-pd" style="padding-top:5rem;">
  <div class="wrap">
    <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:3.5rem;flex-wrap:wrap;gap:1.5rem;">
      <div>
        <div class="gr"></div>
        <p class="eyebrow" style="margin-bottom:.75rem;">Active Mandates</p>
        <h2 class="h2" style="max-width:460px;">Investment Opportunities<br>of Institutional Grade</h2>
      </div>
      <div style="text-align:right;">
        <p class="body" style="max-width:360px;margin-bottom:1.25rem;">Exclusive mandates across Real Estate, Entertainment, Hospitality and Retail. All subject to NDA.</p>
        <a href="/listings" class="btn btn-dk">View All 6 Mandates</a>
      </div>
    </div>

    <!-- Featured 3-column grid with images -->
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;margin-bottom:1.5rem;">
      ${LISTINGS.filter((l: any) => l.highlight).slice(0,3).map((l: any) => {
        const img = l.images?.[0] || ''
        const ss = { active: { bg:'rgba(184,150,12,.12)', text:'#B8960C', border:'rgba(184,150,12,.3)' }, negotiation: { bg:'rgba(37,99,235,.1)', text:'#1d4ed8', border:'rgba(37,99,235,.25)' }, feasibility: { bg:'rgba(22,163,74,.08)', text:'#15803d', border:'rgba(22,163,74,.2)' } }[l.statusType] || { bg:'rgba(184,150,12,.12)', text:'#B8960C', border:'rgba(184,150,12,.3)' }
        return `
      <a href="/listings/${l.id}" style="display:block;background:#fff;border:1px solid var(--border);overflow:hidden;transition:all .3s;text-decoration:none;" onmouseover="this.style.borderColor='var(--gold)';this.style.boxShadow='0 16px 50px rgba(0,0,0,.1)';this.querySelector('img').style.transform='scale(1.04)'" onmouseout="this.style.borderColor='var(--border)';this.style.boxShadow='none';this.querySelector('img').style.transform='scale(1)'">
        <div style="height:230px;overflow:hidden;position:relative;background:#1a1a1a;">
          <img src="${img}" alt="${l.title}" style="width:100%;height:100%;object-fit:cover;transition:transform 6s ease;" loading="lazy">
          <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.65) 0%,rgba(0,0,0,.1) 60%,transparent 100%);"></div>
          <div style="position:absolute;top:1rem;left:1rem;">
            <span style="background:${l.sectorColor};color:#fff;font-size:.58rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:.25rem .65rem;">${l.sector}</span>
          </div>
          <div style="position:absolute;bottom:1rem;left:1rem;">
            <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:#fff;line-height:1;">${l.value}</div>
          </div>
        </div>
        <div style="padding:1.5rem;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.75rem;">
            <span style="background:${ss.bg};color:${ss.text};border:1px solid ${ss.border};font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:.2rem .6rem;">${l.status}</span>
            <span style="font-size:.7rem;color:var(--ink-muted);display:flex;align-items:center;gap:.3rem;"><i class="fas fa-map-marker-alt" style="color:var(--gold);font-size:.55rem;"></i>${l.locationShort}</span>
          </div>
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.15rem;color:var(--ink);line-height:1.25;margin-bottom:.35rem;">${l.title}</h3>
          <p style="font-size:.72rem;color:var(--gold);margin-bottom:.875rem;">${l.subtitle}</p>
          <p style="font-size:.82rem;color:var(--ink-muted);line-height:1.7;margin-bottom:1.1rem;">${l.desc}</p>
          <div style="display:flex;align-items:center;justify-content:space-between;padding-top:.875rem;border-top:1px solid var(--border);">
            <span style="font-size:.72rem;color:var(--gold);font-weight:600;text-transform:uppercase;letter-spacing:.06em;">View Mandate Details</span>
            <i class="fas fa-arrow-right" style="color:var(--gold);font-size:.65rem;"></i>
          </div>
        </div>
      </a>`
      }).join('')}
    </div>

    <!-- Remaining mandates as compact list -->
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.5rem;background:var(--ink);display:flex;align-items:center;justify-content:space-between;">
        <p style="font-size:.65rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.4);">More Active Mandates</p>
        <a href="/listings" style="font-size:.68rem;color:var(--gold);font-weight:600;letter-spacing:.08em;text-transform:uppercase;">View All →</a>
      </div>
      ${LISTINGS.filter((l: any) => !l.highlight).map((l: any) => `
      <a href="/listings/${l.id}" style="display:flex;align-items:center;gap:1.25rem;padding:1.1rem 1.5rem;border-bottom:1px solid var(--border);transition:background .2s;text-decoration:none;" onmouseover="this.style.background='var(--parch)'" onmouseout="this.style.background='transparent'">
        <div style="width:56px;height:44px;overflow:hidden;flex-shrink:0;background:#1a1a1a;">
          <img src="${l.images?.[0]||''}" alt="${l.title}" style="width:100%;height:100%;object-fit:cover;" loading="lazy">
        </div>
        <div style="flex:1;min-width:0;">
          <div style="font-size:.875rem;font-weight:600;color:var(--ink);margin-bottom:.15rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${l.title}</div>
          <div style="font-size:.72rem;color:var(--ink-muted);">${l.locationShort} · ${l.sector}</div>
        </div>
        <div style="flex-shrink:0;text-align:right;">
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--gold);">${l.value}</div>
          <div style="font-size:.62rem;color:var(--ink-faint);">${l.status}</div>
        </div>
      </a>`).join('')}
    </div>

    <div style="text-align:center;margin-top:2rem;">
      <p style="font-size:.75rem;color:var(--ink-muted);margin-bottom:.875rem;">All mandates strictly by NDA · Information Memorandum available to qualified investors & family offices</p>
    </div>
  </div>
</div>

<!-- ══ ADVISORY VERTICALS ═════════════════════════════════════════════════ -->
<div class="sec-wh">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:1fr 2fr;gap:4rem;align-items:start;margin-bottom:3.5rem;">
      <div>
        <div class="gr"></div>
        <p class="eyebrow" style="margin-bottom:.75rem;">Advisory Verticals</p>
        <h2 class="h2">Six Verticals.<br>One Trusted Partner.</h2>
      </div>
      <div style="display:flex;align-items:flex-end;justify-content:flex-end;">
        <p class="lead" style="max-width:420px;">From strategy to execution, India Gully delivers institutional-grade advisory across every sector it operates in.</p>
      </div>
    </div>
    <div class="vg">
      ${VERTICALS.map(v => `
      <div class="vg-cell" onclick="window.location='/services#${v.id}'">
        <div style="font-size:2rem;margin-bottom:1.25rem;">${v.icon}</div>
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.15rem;color:var(--ink);margin-bottom:.6rem;">${v.name}</h3>
        <p class="body" style="margin-bottom:1rem;">${v.desc}</p>
        <div class="vg-arr">Explore <i class="fas fa-arrow-right" style="margin-left:.3rem;font-size:.65rem;"></i></div>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- ══ THE INDIA GULLY DIFFERENCE ════════════════════════════════════════ -->
<div class="sec-dk">
  <div class="wrap">
    <div style="text-align:center;max-width:640px;margin:0 auto 3.5rem;">
      <div class="gr-c"></div>
      <p class="eyebrow-lt" style="margin-bottom:.75rem;">Our Proposition</p>
      <h2 class="h2-lt">The India Gully Difference</h2>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0;border:1px solid rgba(255,255,255,.07);">
      ${[
        { icon:'flag',      title:'India-Deep Expertise',    desc:'Born in India. We understand local markets, regulations, culture and consumer behaviour at granular depth across Tier 1, 2 and 3 cities.' },
        { icon:'handshake', title:'20+ Brand Relationships', desc:'Deep relationships with every major hotel brand. We know which brand fits which project and navigate negotiations with authority.' },
        { icon:'utensils',  title:'HORECA End-to-End',       desc:'One of the few consultants who also procure and supply, giving clients a single accountable partner from strategy to FF&E delivery.' },
        { icon:'bolt',      title:'Execution-Led',           desc:'We stay involved through implementation, not just advisory. Turnkey delivery and hands-on project management is our differentiator.' },
      ].map((d,i) => `
      <div style="padding:2.75rem 2.25rem;border-right:1px solid rgba(255,255,255,.07);${i===3?'border-right:none;':''}transition:background .25s;" onmouseover="this.style.background='rgba(255,255,255,.03)'" onmouseout="this.style.background='transparent'">
        <div style="width:44px;height:44px;border:1px solid rgba(184,150,12,.35);display:flex;align-items:center;justify-content:center;margin-bottom:1.5rem;transition:background .22s;" onmouseover="this.style.background='var(--gold)'" onmouseout="this.style.background='transparent'">
          <i class="fas fa-${d.icon}" style="color:var(--gold);font-size:.85rem;"></i>
        </div>
        <h3 class="h3-lt" style="font-size:1.1rem;margin-bottom:.75rem;">${d.title}</h3>
        <p class="body-lt">${d.desc}</p>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- ══ HOSPITALITY BRAND PARTNERS ════════════════════════════════════════ -->
<div class="sec-wh" style="padding-top:5rem;padding-bottom:5rem;">
  <div class="wrap">
    <div style="text-align:center;max-width:600px;margin:0 auto 3rem;">
      <div class="gr-c"></div>
      <p class="eyebrow" style="margin-bottom:.75rem;">Hospitality Partners</p>
      <h2 class="h2">Hotel Brands We<br>Work With</h2>
      <p class="lead" style="margin-top:1rem;">India Gully holds active relationships with India's most prominent hospitality brands, from global chains to homegrown operators.</p>
    </div>

    <!-- Logo grid with fallback text logos -->
    <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:1px;background:var(--border);margin-bottom:2.5rem;">
      ${HOSPITALITY_BRANDS.map((b: any) => `
      <div style="background:#fff;padding:1.25rem .875rem;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:90px;gap:.5rem;transition:background .2s;cursor:default;" onmouseover="this.style.background='var(--parch)'" onmouseout="this.style.background='#fff'">
        <img src="${b.svg}" alt="${b.name}" style="width:100px;height:40px;object-fit:contain;display:block;"
             onerror="this.onerror=null;this.src='';this.style.display='none';this.nextElementSibling.style.display='flex';">
        <div style="display:none;width:100px;height:40px;background:${b.color};align-items:center;justify-content:center;border-radius:2px;">
          <span style="font-size:.6rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#fff;text-align:center;padding:0 4px;">${b.name}</span>
        </div>
        <div style="font-size:.55rem;color:var(--ink-faint);letter-spacing:.06em;text-transform:uppercase;text-align:center;">${b.cat}</div>
      </div>`).join('')}
    </div>

    <div style="text-align:center;">
      <a href="/services#hospitality" class="btn btn-dko">Our Hospitality Practice</a>
    </div>
  </div>
</div>

<!-- ══ RETAIL BRAND PARTNERS ══════════════════════════════════════════════ -->
<div class="sec-pd" style="padding-top:5rem;padding-bottom:5rem;">
  <div class="wrap">
    <div style="text-align:center;max-width:600px;margin:0 auto 3rem;">
      <div class="gr-c"></div>
      <p class="eyebrow" style="margin-bottom:.75rem;">Retail Partners</p>
      <h2 class="h2">Retail Brands We<br>Advise & Place</h2>
      <p class="lead" style="margin-top:1rem;">30+ active retail brand relationships spanning anchor tenants, fashion, food & beverage and entertainment across malls and mixed-use destinations.</p>
    </div>

    <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:1px;background:var(--border);margin-bottom:2.5rem;">
      ${RETAIL_BRANDS.map((b: any) => `
      <div style="background:#fff;padding:1.25rem .875rem;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:90px;gap:.5rem;transition:background .2s;cursor:default;" onmouseover="this.style.background='var(--parch)'" onmouseout="this.style.background='#fff'">
        <img src="${b.svg}" alt="${b.name}" style="width:100px;height:40px;object-fit:contain;display:block;"
             onerror="this.onerror=null;this.src='';this.style.display='none';this.nextElementSibling.style.display='flex';">
        <div style="display:none;width:100px;height:40px;background:#1a1a1a;align-items:center;justify-content:center;border-radius:2px;">
          <span style="font-size:.6rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;color:#fff;text-align:center;padding:0 4px;">${b.name}</span>
        </div>
        <div style="font-size:.55rem;color:var(--ink-faint);letter-spacing:.06em;text-transform:uppercase;text-align:center;">${b.cat}</div>
      </div>`).join('')}
    </div>

    <div style="text-align:center;">
      <a href="/services#retail" class="btn btn-dko">Our Retail Practice</a>
    </div>
  </div>
</div>

<!-- ══ TRANSACTION ADVISORY PARTNERS ════════════════════════════════════ -->
<div class="sec-wh" style="padding-top:5rem;padding-bottom:5rem;">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:center;margin-bottom:3.5rem;">
      <div>
        <div class="gr"></div>
        <p class="eyebrow" style="margin-bottom:.75rem;">Transaction Advisory</p>
        <h2 class="h2">Our Advisory<br>Partners</h2>
        <p class="lead" style="margin-top:1.25rem;">India Gully collaborates with globally recognised advisory and consulting firms, bringing institutional credibility, financial rigour and sector depth to complex mandates.</p>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;">
        ${ADVISORY_PARTNERS.slice(0,4).map((p: any) => `
        <div style="border:1px solid var(--border);padding:1.5rem;text-align:center;background:#fff;transition:border-color .25s,box-shadow .25s;" onmouseover="this.style.borderColor='var(--gold)';this.style.boxShadow='0 8px 24px rgba(0,0,0,.07)'" onmouseout="this.style.borderColor='var(--border)';this.style.boxShadow='none'">
          <div style="display:flex;align-items:center;justify-content:center;margin-bottom:.875rem;min-height:48px;">
            <img src="${p.logo}" alt="${p.name}" style="max-width:110px;max-height:44px;width:auto;height:auto;object-fit:contain;display:block;"
                 onerror="this.style.display='none';this.parentElement.nextElementSibling.style.display='flex'">
            <div style="display:none;width:110px;height:40px;background:${p.color};align-items:center;justify-content:center;border-radius:2px;">
              <span style="font-size:.75rem;font-weight:800;letter-spacing:.06em;color:${p.textColor || '#fff'};text-align:center;">${p.abbr}</span>
            </div>
          </div>
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">${p.name}</div>
          <div style="font-size:.65rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);margin-top:.25rem;">${p.sub}</div>
        </div>`).join('')}
      </div>
    </div>

    <!-- 5th partner centred -->
    <div style="display:flex;justify-content:center;">
      ${ADVISORY_PARTNERS.slice(4).map((p: any) => `
      <div style="border:1px solid var(--border);padding:1.5rem 2.5rem;text-align:center;background:#fff;transition:border-color .25s,box-shadow .25s;" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='var(--border)'">
        <div style="display:flex;align-items:center;justify-content:center;margin-bottom:.875rem;min-height:48px;">
          <img src="${p.logo}" alt="${p.name}" style="max-width:140px;max-height:44px;width:auto;height:auto;object-fit:contain;display:block;"
               onerror="this.style.display='none';this.parentElement.nextElementSibling.style.display='flex'">
          <div style="display:none;width:110px;height:40px;background:${p.color};align-items:center;justify-content:center;border-radius:2px;">
            <span style="font-size:.75rem;font-weight:800;letter-spacing:.06em;color:${p.textColor || '#fff'};text-align:center;">${p.abbr}</span>
          </div>
        </div>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">${p.name}</div>
        <div style="font-size:.65rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);margin-top:.25rem;">${p.sub}</div>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- ══ TRACK RECORD ════════════════════════════════════════════════════════ -->
<div class="sec-pd" style="padding-top:5rem;">
  <div class="wrap">
    <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:3rem;flex-wrap:wrap;gap:1.5rem;">
      <div>
        <div class="gr"></div>
        <p class="eyebrow" style="margin-bottom:.75rem;">Track Record</p>
        <h2 class="h2">Mandates Executed.<br>Relationships Built.</h2>
      </div>
      <a href="/services" class="btn btn-dko">All Services</a>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;">
      ${[
        { title:'Bijolai Palace, Jodhpur',       loc:'Heritage Hotel · Rajasthan',    icon:'🏰', type:'Hotel Management',  desc:'Strategic management consultancy for this iconic heritage palace. Brand positioning, revenue strategy and operational excellence mandate.' },
        { title:'Cygnett Style Shubh, Ramnagar', loc:'Business Hotel · Uttarakhand',  icon:'🦢', type:'Brand On-Boarding',  desc:'Brand on-boarding and pre-opening management for Cygnett Style Shubh. Full pre-opening planning, training and launch execution.' },
        { title:'Regenta Central, Noida',         loc:'Business Hotel · Delhi NCR',   icon:'🌸', type:'Turnkey PMC',        desc:'Turnkey project management and brand on-boarding for Regenta Central Noida. Advisory from planning through pre-opening and launch.' },
        { title:'Park Inn by Radisson, Delhi',    loc:'Business Hotel · Delhi',       icon:'🔴', type:'Pre-Opening',        desc:'Mock-up room execution and pre-opening support. FF&E specification and vendor management for the IP Extension property.' },
        { title:'Villa Hotel, Jim Corbett',       loc:'Villa Resort · Uttarakhand',   icon:'🌿', type:'Turnkey + Equity',   desc:'Strategic cum turnkey management for this villa-styled eco resort. Project planning, execution, equity advisory and asset monetisation.' },
        { title:'100-Room Hotel, Hosur',          loc:'Business Hotel · Tamil Nadu',  icon:'🏗️', type:'Greenfield Turnkey', desc:'Greenfield 100-room branded upscale hotel in Hosur, first branded upscale hotel of the industrial town on the TN-Karnataka border.' },
      ].map(p => `
      <div class="card card-lift" style="padding:1.75rem;">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1rem;">
          <span style="font-size:2rem;">${p.icon}</span>
          <span style="background:rgba(184,150,12,.1);color:var(--gold);border:1px solid rgba(184,150,12,.22);font-size:.6rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:.2rem .6rem;">${p.type}</span>
        </div>
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--ink);margin-bottom:.3rem;">${p.title}</h3>
        <p style="font-size:.72rem;letter-spacing:.06em;color:var(--ink-muted);margin-bottom:.875rem;">${p.loc}</p>
        <p class="body">${p.desc}</p>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- ══ LEADERSHIP ════════════════════════════════════════════════════════ -->
<div class="sec-wh" style="padding-top:5rem;">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:1fr 1.6fr;gap:4.5rem;align-items:start;">
      <div>
        <div class="gr"></div>
        <p class="eyebrow" style="margin-bottom:.75rem;">Leadership</p>
        <h2 class="h2" style="margin-bottom:1.25rem;">Steered by<br>Industry Veterans</h2>
        <p class="lead" style="margin-bottom:2rem;">Our leadership brings decades of combined experience across hospitality, real estate, retail and entertainment, having led marquee mandates for India's most prominent developers, hotel brands and institutional investors.</p>
        <a href="/about" class="btn btn-dk">Meet the Full Team</a>
      </div>
      <div style="display:flex;flex-direction:column;gap:1rem;">
        ${[
          { name:'Arun Manikonda',  title:'Managing Director',      sub:'Director on Board & KMP',   init:'AM', photo:'/static/team/arun-manikonda.jpg', ph:'+91 98108 89134', em:'akm@indiagully.com', bio:'Founding Director with 20+ years across hospitality, real estate and entertainment.' },
          { name:'Pavan Manikonda', title:'Executive Director',      sub:'Director on Board & KMP',   init:'PM', photo:'/static/team/pavan-manikonda.jpg', ph:'+91 62825 56067', em:'pavan@indiagully.com', bio:'Drives operations and business development across HORECA, hotel management and new verticals.' },
          { name:'Amit Jhingan',    title:'President, Real Estate',  sub:'Key Managerial Personnel',  init:'AJ', photo:'/static/team/amit-jhingan.png', ph:'+91 98999 93543', em:'amit.jhingan@indiagully.com', bio:'Real Estate Vertical Head. Specialist in retail leasing, commercial transactions and entertainment city advisory.' },
        ].map(p => `
        <div class="card" style="padding:1.5rem;display:grid;grid-template-columns:auto 1fr auto;gap:1.25rem;align-items:center;">
          <div style="width:56px;height:56px;border-radius:50%;overflow:hidden;flex-shrink:0;border:2px solid var(--gold);background:var(--ink);">
            <img src="${p.photo}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;object-position:center top;"
                 onerror="this.onerror=null;this.style.display='none';this.parentElement.innerHTML='<div style=\'width:56px;height:56px;background:var(--ink);border-radius:50%;display:flex;align-items:center;justify-content:center;\'><span style=\'font-family:DM Serif Display,Georgia,serif;font-size:1.1rem;color:var(--gold);\'>${p.init}</span></div>';">
          </div>
          <div>
            <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.05rem;color:var(--ink);margin-bottom:.12rem;">${p.name}</div>
            <div style="font-size:.78rem;color:var(--ink-soft);">${p.title}</div>
            <div style="font-size:.68rem;color:var(--ink-muted);">${p.sub}</div>
            <div style="font-size:.75rem;color:var(--ink-soft);margin-top:.35rem;line-height:1.5;">${p.bio}</div>
          </div>
          <div style="text-align:right;flex-shrink:0;">
            <a href="tel:${p.ph.replace(/\\s/g,'')}" style="display:block;font-size:.72rem;color:var(--ink-muted);margin-bottom:.2rem;transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-muted)'"><i class="fas fa-phone" style="margin-right:.35rem;font-size:.6rem;"></i>${p.ph}</a>
            <a href="mailto:${p.em}" style="display:block;font-size:.72rem;color:var(--ink-muted);transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-muted)'"><i class="fas fa-envelope" style="margin-right:.35rem;font-size:.6rem;"></i>${p.em}</a>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </div>
</div>

<!-- ══ CTA ════════════════════════════════════════════════════════════════ -->
<div class="sec-dk" style="position:relative;overflow:hidden;">
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse 60% 80% at 50% 50%,rgba(184,150,12,.06) 0%,transparent 70%);pointer-events:none;"></div>
  <div class="wrap" style="text-align:center;max-width:820px;margin:0 auto;position:relative;">
    <div class="gr-c"></div>
    <p class="eyebrow-lt" style="margin-bottom:.75rem;">Get in Touch</p>
    <h2 class="h2-lt" style="margin-bottom:1.25rem;">Ready to Work<br>With India Gully?</h2>
    <p class="lead-lt" style="max-width:560px;margin:0 auto 2.5rem;">Whether you are a developer, investor, brand or operator, we bring the advisory depth, network and execution capability to deliver results.</p>
    <div style="display:flex;flex-wrap:wrap;gap:.875rem;justify-content:center;">
      <a href="/contact"  class="btn btn-g">Submit a Mandate Enquiry</a>
      <a href="/listings" class="btn btn-ghost-g">View Active Mandates</a>
      <a href="/horeca"   class="btn btn-ghost">HORECA Supply Enquiry</a>
    </div>
  </div>
</div>

`
  return c.html(layout('Home', content, {
    description: "India Gully. Celebrating Desiness. India's premier multi-vertical advisory firm across Real Estate, Retail, Hospitality, Entertainment, Debt & HORECA Solutions. ₹10,000 Cr+ advisory pipeline."
  }))
})

export default app
