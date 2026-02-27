import { Hono } from 'hono'
import { layout } from '../lib/layout'
import { VERTICALS, LISTINGS } from '../lib/constants'

const app = new Hono()

const SLIDES = [
  {
    bg: 'linear-gradient(135deg,#0a0a0a 0%,#1a1a0a 100%)',
    tag: 'Transaction Advisory · Pan-India',
    h1a: 'Celebrating',
    h1b: 'Desiness',
    h1c: 'Across Every Vertical',
    sub: 'India Gully is India\'s premier multi-vertical advisory firm — bringing institutional rigour to Real Estate, Retail, Hospitality, Entertainment, Debt & HORECA.',
    cta1: { text: 'View Active Mandates', href: '/listings' },
    cta2: { text: 'Submit Mandate', href: '/contact' },
  },
  {
    bg: 'linear-gradient(135deg,#0a0a14 0%,#0a1020 100%)',
    tag: 'Real Estate · Entertainment · Maharashtra',
    h1a: '₹4,500 Crore',
    h1b: 'Entertainment',
    h1c: 'Destination · Maharashtra',
    sub: 'Mega integrated entertainment destination — Theme Park, Luxury Hotel and Retail across 200+ acres. Phase 1 approved. Exclusive advisory mandate.',
    cta1: { text: 'View This Mandate', href: '/listings/entertainment-maharashtra' },
    cta2: { text: 'Request Brochure', href: '/contact' },
  },
  {
    bg: 'linear-gradient(135deg,#0a0e0a 0%,#0f1a0a 100%)',
    tag: 'Hotel Management · Brand On-Boarding',
    h1a: '15+ Hotels.',
    h1b: '20+ Brands.',
    h1c: 'One Trusted Partner.',
    sub: 'From Marriott to Radisson to IHG — India Gully navigates brand negotiations, manages hotel openings and drives revenue strategy with authority.',
    cta1: { text: 'Our Hospitality Practice', href: '/services#hospitality' },
    cta2: { text: 'Explore All Services', href: '/services' },
  },
  {
    bg: 'linear-gradient(135deg,#0e0a0a 0%,#1a0e0a 100%)',
    tag: 'HORECA Procurement · FF&E / OS&E',
    h1a: 'End-to-End',
    h1b: 'HORECA',
    h1c: 'Supply Solutions',
    sub: 'Kitchen equipment, FF&E, OS&E, linens, uniforms and guest amenities — procured to spec, delivered on schedule for hotels and F&B operators across India.',
    cta1: { text: 'HORECA Solutions', href: '/horeca' },
    cta2: { text: 'Request a Quote', href: '/horeca' },
  },
]

app.get('/', (c) => {
  const content = `

<!-- ═══════════════════════════════════════════ HERO CAROUSEL -->
<div class="car">
  <div class="car-track">
    ${SLIDES.map((s, i) => `
    <div class="car-slide${i === 0 ? ' on' : ''}">
      <div class="car-bg" style="background:${s.bg};"></div>
      <!-- gold grid -->
      <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.06) 1px,transparent 1px);background-size:72px 72px;pointer-events:none;"></div>
      <!-- radial glow -->
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse 70% 60% at 60% 50%,rgba(184,150,12,.05) 0%,transparent 70%);pointer-events:none;"></div>
      <div class="car-ov"></div>
      <div class="car-body">
        <div class="wrap" style="width:100%;">
          <div class="s-txt" style="max-width:680px;">
            <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1.5rem;">
              <div style="width:36px;height:1.5px;background:var(--gold);"></div>
              <span class="eyebrow">${s.tag}</span>
            </div>
            <h1 class="h1" style="margin-bottom:1.5rem;">
              ${s.h1a}<br>
              <em style="font-style:italic;color:var(--gold);">${s.h1b}</em><br>
              <span style="font-size:.6em;font-weight:300;color:rgba(255,255,255,.55);">${s.h1c}</span>
            </h1>
            <p class="lead-lt" style="max-width:560px;margin-bottom:2rem;">${s.sub}</p>
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

  <!-- Counter -->
  <div class="car-ct"></div>

  <!-- Arrows -->
  <button class="car-arr car-prev"><i class="fas fa-chevron-left"></i></button>
  <button class="car-arr car-next"><i class="fas fa-chevron-right"></i></button>

  <!-- Dots -->
  <div class="car-dots">
    ${SLIDES.map((_,i) => `<button class="c-dot${i===0?' on':''}"></button>`).join('')}
  </div>

  <!-- Progress bar -->
  <div class="car-pb"></div>

  <!-- Scroll hint -->
  <div style="position:absolute;bottom:2.5rem;right:2rem;z-index:10;display:flex;align-items:center;gap:.5rem;opacity:.4;">
    <span style="font-size:.62rem;letter-spacing:.14em;text-transform:uppercase;color:#fff;">Scroll</span>
    <i class="fas fa-arrow-down" style="font-size:.62rem;color:var(--gold);"></i>
  </div>
</div>

<!-- ═══════════════════════════════════════════ TICKER -->
<div class="ticker">
  <div class="ticker-tr">
    ${['Real Estate Advisory','Retail Leasing Strategy','Hotel Management','Entertainment Advisory','Debt &amp; Special Situations','HORECA Solutions','Transaction Advisory','Brand On-Boarding','Feasibility Studies','Project Management','Asset Management','Greenfield Hotels','Mall Leasing','FF&amp;E Procurement'].map(t=>`<span style="font-size:.68rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:rgba(0,0,0,.75);padding:0 2.5rem;">${t}</span><span style="color:rgba(0,0,0,.3);font-size:.55rem;">◆</span>`).join('')}
    ${['Real Estate Advisory','Retail Leasing Strategy','Hotel Management','Entertainment Advisory','Debt &amp; Special Situations','HORECA Solutions','Transaction Advisory','Brand On-Boarding','Feasibility Studies','Project Management','Asset Management','Greenfield Hotels','Mall Leasing','FF&amp;E Procurement'].map(t=>`<span style="font-size:.68rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:rgba(0,0,0,.75);padding:0 2.5rem;">${t}</span><span style="color:rgba(0,0,0,.3);font-size:.55rem;">◆</span>`).join('')}
  </div>
</div>

<!-- ═══════════════════════════════════════════ STATS BAR -->
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
      <div style="padding:2rem 1.75rem;text-align:center;${i<4?'border-right:1px solid var(--border);':''}">
        <div class="stat-n">${s.n}</div>
        <div style="font-size:.68rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);margin-top:.45rem;">${s.l}</div>
      </div>
      `).join('')}
    </div>
  </div>
</div>

<!-- ═══════════════════════════════════════════ ADVISORY VERTICALS -->
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
        <div class="vg-arr">Explore <i class="fas fa-arrow-right" style="margin-left:.3rem;"></i></div>
      </div>
      `).join('')}
    </div>
  </div>
</div>

<!-- ═══════════════════════════════════════════ FEATURED MANDATES -->
<div class="sec-pd">
  <div class="wrap">
    <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:3rem;flex-wrap:wrap;gap:1.5rem;">
      <div>
        <div class="gr"></div>
        <p class="eyebrow" style="margin-bottom:.75rem;">Active Mandates</p>
        <h2 class="h2">Investment Opportunities<br>of Institutional Grade</h2>
      </div>
      <a href="/listings" class="btn btn-dk">View All Mandates</a>
    </div>

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;">
      ${LISTINGS.filter(l => l.highlight).slice(0,3).map(l => `
      <div class="mc">
        <div class="mc-head">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;">
            <span class="badge b-g">${l.status}</span>
            <span class="caption-lt">${l.sector}</span>
          </div>
          <div class="caption-lt" style="margin-bottom:.35rem;">${l.location}</div>
          <h3 class="h3-lt" style="font-size:1.2rem;">${l.title}</h3>
        </div>
        <div style="padding:1.5rem;">
          <p class="body" style="margin-bottom:1.25rem;">${l.desc}</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-bottom:1.25rem;">
            <div style="background:var(--parch);padding:.875rem;">
              <div class="caption" style="margin-bottom:.3rem;">Investment</div>
              <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:var(--gold);line-height:1;">${l.value}</div>
            </div>
            <div style="background:var(--parch);padding:.875rem;">
              <div class="caption" style="margin-bottom:.3rem;">Sector</div>
              <div style="font-size:.85rem;font-weight:600;color:var(--ink);">${l.sector}</div>
            </div>
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:1.25rem;">
            ${l.tags.map(t => `<span class="badge b-dk">${t}</span>`).join('')}
          </div>
          <a href="/listings/${l.id}" class="btn btn-dk" style="width:100%;justify-content:center;">View Mandate Details</a>
        </div>
      </div>
      `).join('')}
    </div>

    <div style="text-align:center;margin-top:2rem;">
      <p style="font-size:.72rem;color:var(--ink-muted);margin-bottom:.875rem;">All mandates strictly by NDA · Information Memorandum on request · For qualified investors, family offices &amp; institutional buyers only</p>
      <a href="/listings" class="btn btn-go">View All 6 Active Mandates</a>
    </div>
  </div>
</div>

<!-- ═══════════════════════════════════════════ INDIA GULLY DIFFERENCE -->
<div class="sec-dk">
  <div class="wrap">
    <div style="text-align:center;max-width:680px;margin:0 auto 3.5rem;">
      <div class="gr-c"></div>
      <p class="eyebrow-lt" style="margin-bottom:.75rem;">Our Proposition</p>
      <h2 class="h2-lt">The India Gully<br>Difference</h2>
    </div>

    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0;border:1px solid rgba(255,255,255,.07);">
      ${[
        { icon:'flag',        title:'India-Deep Expertise',     desc:'Born in India. We understand local markets, regulations, culture and consumer behaviour at granular depth across Tier 1, 2 and 3 cities.' },
        { icon:'handshake',   title:'20+ Brand Relationships',  desc:'Deep relationships with every major hotel brand. We know which brand fits which project and navigate brand negotiations with authority.' },
        { icon:'utensils',    title:'HORECA End-to-End',        desc:'One of the few consultants who also procure and supply — giving clients a single accountable partner from strategy through to on-site FF&E delivery.' },
        { icon:'bolt',        title:'Execution-Led',            desc:'We stay involved through implementation — not just advisory. Turnkey delivery and hands-on project management is our operational differentiator.' },
      ].map((d,i) => `
      <div style="padding:2.75rem 2.25rem;border-right:1px solid rgba(255,255,255,.07);${i===3?'border-right:none;':''}transition:background .25s;" onmouseover="this.style.background='rgba(255,255,255,.03)'" onmouseout="this.style.background='transparent'">
        <div style="width:44px;height:44px;border:1px solid rgba(184,150,12,.4);display:flex;align-items:center;justify-content:center;margin-bottom:1.5rem;transition:background .22s;" onmouseover="this.style.background='var(--gold)'" onmouseout="this.style.background='transparent'">
          <i class="fas fa-${d.icon}" style="color:var(--gold);font-size:.85rem;"></i>
        </div>
        <h3 class="h3-lt" style="font-size:1.1rem;margin-bottom:.75rem;">${d.title}</h3>
        <p class="body-lt">${d.desc}</p>
      </div>
      `).join('')}
    </div>
  </div>
</div>

<!-- ═══════════════════════════════════════════ TRACK RECORD -->
<div class="sec-wh">
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
        { title:'Bijolai Palace, Jodhpur',        loc:'Heritage Hotel · Rajasthan',      icon:'🏰', type:'Hotel Management',   desc:'Strategic management consultancy for this iconic heritage palace. Mandate covers hotel management advisory, brand positioning and revenue strategy.' },
        { title:'Cygnett Style Shubh, Ramnagar',  loc:'Business Hotel · Uttarakhand',    icon:'🦢', type:'Brand On-Boarding',   desc:'Brand on-boarding and pre-opening management for Cygnett Style Shubh at Ramnagar. Full pre-opening planning, training and launch management.' },
        { title:'Regenta Central, Noida',          loc:'Business Hotel · Delhi NCR',      icon:'🌸', type:'Turnkey PMC',         desc:'Turnkey project management and brand on-boarding for Regenta Central Noida. Advisory from planning through pre-opening and launch.' },
        { title:'Park Inn by Radisson, Delhi',     loc:'Business Hotel · Delhi',          icon:'🔴', type:'Pre-Opening',         desc:'Mock-up room execution and pre-opening support. FF&E specification and vendor management for the IP Extension property.' },
        { title:'Villa Hotel, Jim Corbett',        loc:'Villa Resort · Uttarakhand',      icon:'🌿', type:'Turnkey + Equity',    desc:'Strategic cum turnkey management for this villa-styled eco resort. Project planning, execution, equity advisory and asset monetisation.' },
        { title:'100-Room Hotel, Hosur',           loc:'Business Hotel · Tamil Nadu',     icon:'🏗️', type:'Greenfield Turnkey',  desc:'Greenfield 100-room branded upscale hotel in Hosur. First branded upscale hotel of the industrial town on the TN-Karnataka border.' },
      ].map(p => `
      <div class="card card-lift" style="padding:1.75rem;">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1rem;">
          <span style="font-size:2rem;">${p.icon}</span>
          <span class="badge b-g">${p.type}</span>
        </div>
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--ink);margin-bottom:.3rem;">${p.title}</h3>
        <p class="caption" style="margin-bottom:.875rem;">${p.loc}</p>
        <p class="body">${p.desc}</p>
      </div>
      `).join('')}
    </div>
  </div>
</div>

<!-- ═══════════════════════════════════════════ BRAND ECOSYSTEM -->
<div class="sec-pd">
  <div class="wrap">
    <div style="text-align:center;max-width:560px;margin:0 auto 3rem;">
      <div class="gr-c"></div>
      <p class="eyebrow" style="margin-bottom:.75rem;">Our Ecosystem</p>
      <h2 class="h2">Trusted by India's<br>Leading Brands</h2>
    </div>

    <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:1px;background:var(--border);">
      ${['Marriott International','Radisson Hotel Group','IHG Hotels','Taj Hotels','Cygnett Hotels','Regenta / Royal Orchid','Lemon Tree Hotels','Bhutani Group','EY Advisory','CBRE','ANAROCK','Pipara & Co','Resurgent India','ITC Hotels','Louvre Hotels','Sarovar Hotels'].map(b => `
      <div style="background:#fff;padding:1.25rem 1rem;text-align:center;transition:background .2s;" onmouseover="this.style.background='var(--gold-pale)'" onmouseout="this.style.background='#fff'">
        <div style="font-size:.7rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-muted);line-height:1.4;">${b}</div>
      </div>
      `).join('')}
    </div>
  </div>
</div>

<!-- ═══════════════════════════════════════════ TRANSACTION ADVISORY PARTNERS -->
<div class="sec-pd" style="padding-top:4rem;padding-bottom:4rem;">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:1fr 2fr;gap:4rem;align-items:start;margin-bottom:3rem;">
      <div>
        <div class="gr"></div>
        <p class="eyebrow" style="margin-bottom:.75rem;">Transaction Advisory</p>
        <h2 class="h2">Our Advisory<br>Partners</h2>
      </div>
      <p class="lead" style="padding-top:2rem;">India Gully collaborates with globally recognised advisory and consulting firms — bringing institutional credibility, financial rigour and sector depth to complex, large-format transaction mandates.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:1.25rem;">
      ${[
        { name:'Ernst & Young',  abbr:'EY',        sub:'Transaction Advisory & Assurance',  icon:'chart-bar',     color:'#2E2E2E' },
        { name:'CBRE',           abbr:'CBRE',       sub:'Real Estate & Capital Markets',     icon:'building',      color:'#003087' },
        { name:'ANAROCK',        abbr:'ANAROCK',    sub:'Property Consultants',              icon:'home',          color:'#E4003A' },
        { name:'Pipara & Co',    abbr:'PIPARA',     sub:'Chartered Accountants',             icon:'file-invoice',  color:'#1A5276' },
        { name:'Resurgent India',abbr:'RESURGENT',  sub:'Investment Banking',                icon:'chart-line',    color:'#1E8449' },
      ].map(p => `
      <div class="card card-lift" style="padding:1.75rem;text-align:center;">
        <div style="width:52px;height:52px;background:${p.color};display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;">
          <i class="fas fa-${p.icon}" style="color:#fff;font-size:.9rem;"></i>
        </div>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.05rem;color:var(--ink);margin-bottom:.3rem;">${p.name}</div>
        <div style="font-size:.66rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);margin-bottom:.4rem;">${p.abbr}</div>
        <div style="font-size:.72rem;color:var(--ink-muted);line-height:1.5;">${p.sub}</div>
      </div>
      `).join('')}
    </div>
  </div>
</div>

<!-- ═══════════════════════════════════════════ LEADERSHIP -->
<div class="sec-wh">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:1fr 1.6fr;gap:4.5rem;align-items:start;">
      <div>
        <div class="gr"></div>
        <p class="eyebrow" style="margin-bottom:.75rem;">Leadership</p>
        <h2 class="h2" style="margin-bottom:1.25rem;">Steered by<br>Industry Veterans</h2>
        <p class="lead" style="margin-bottom:2rem;">Our leadership team brings decades of combined experience across hospitality, real estate, retail and entertainment — having led marquee mandates for the country's most prominent developers, hotel brands and institutional investors.</p>
        <a href="/about" class="btn btn-dk">Meet the Team</a>
      </div>

      <div style="display:flex;flex-direction:column;gap:1rem;">
        ${[
          { name:'Arun Manikonda',  title:'Managing Director',          sub:'Director on Board & KMP',            init:'AM', ph:'+91 98108 89134', em:'akm@indiagully.com' },
          { name:'Pavan Manikonda', title:'Executive Director',          sub:'Director on Board & KMP',            init:'PM', ph:'+91 62825 56067', em:'pavan@indiagully.com' },
          { name:'Amit Jhingan',    title:'President, Real Estate',      sub:'Key Managerial Personnel',           init:'AJ', ph:'+91 98999 93543', em:'amit.jhingan@indiagully.com' },
        ].map(p => `
        <div class="card" style="padding:1.5rem;display:flex;align-items:center;gap:1.25rem;">
          <div style="width:52px;height:52px;background:var(--ink);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <span style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--gold);font-weight:700;">${p.init}</span>
          </div>
          <div style="flex:1;min-width:0;">
            <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--ink);margin-bottom:.15rem;">${p.name}</div>
            <div style="font-size:.8rem;color:var(--ink-soft);">${p.title}</div>
            <div class="caption">${p.sub}</div>
          </div>
          <div style="text-align:right;flex-shrink:0;">
            <a href="tel:${p.ph.replace(/\s/g,'')}" style="display:block;font-size:.73rem;color:var(--ink-muted);margin-bottom:.2rem;transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-muted)'"><i class="fas fa-phone" style="margin-right:.35rem;"></i>${p.ph}</a>
            <a href="mailto:${p.em}" style="display:block;font-size:.73rem;color:var(--ink-muted);transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-muted)'"><i class="fas fa-envelope" style="margin-right:.35rem;"></i>${p.em}</a>
          </div>
        </div>
        `).join('')}
      </div>
    </div>
  </div>
</div>

<!-- ═══════════════════════════════════════════ CTA -->
<div class="sec-dk" style="position:relative;overflow:hidden;">
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse 60% 80% at 50% 50%,rgba(184,150,12,.06) 0%,transparent 70%);pointer-events:none;"></div>
  <div class="wrap" style="text-align:center;max-width:820px;margin:0 auto;position:relative;">
    <div class="gr-c"></div>
    <p class="eyebrow-lt" style="margin-bottom:.75rem;">Get in Touch</p>
    <h2 class="h2-lt" style="margin-bottom:1.25rem;">Ready to Work<br>With India Gully?</h2>
    <p class="lead-lt" style="max-width:560px;margin:0 auto 2.5rem;">Whether you are a developer, investor, brand or operator — we bring the advisory depth, network and execution capability to deliver results.</p>
    <div style="display:flex;flex-wrap:wrap;gap:.875rem;justify-content:center;">
      <a href="/contact" class="btn btn-g">Submit a Mandate Enquiry</a>
      <a href="/listings" class="btn btn-ghost-g">View Active Mandates</a>
      <a href="/horeca"   class="btn btn-ghost">HORECA Supply Enquiry</a>
    </div>
  </div>
</div>

`
  return c.html(layout('Home', content, {
    description: "India Gully — Celebrating Desiness. India's premier multi-vertical advisory firm across Real Estate, Retail, Hospitality, Entertainment, Debt & HORECA Solutions. Pan-India presence."
  }))
})

export default app
