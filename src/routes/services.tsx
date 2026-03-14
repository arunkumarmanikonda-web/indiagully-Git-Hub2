import { Hono } from 'hono'
import { layout } from '../lib/layout'
import { HOSPITALITY_BRANDS, RETAIL_BRANDS, ADVISORY_PARTNERS } from '../lib/constants'

const app = new Hono()

const SERVICES = [
  {
    id: 'real-estate',
    icon: '🏛️',
    name: 'Real Estate Advisory',
    tagline: 'Transaction advisory, site selection & asset management',
    desc: 'We advise developers, investors and family offices on the full real estate lifecycle, from site selection and feasibility to transaction structuring, asset management and divestment. Our real estate practice spans commercial, hospitality and mixed-use assets across India.',
    items: ['Site identification & due diligence','Development strategy & feasibility','Transaction advisory & deal structuring','Asset valuation & appraisal','Commercial lease structuring','Investment sales & divestment','Portfolio management','Regulatory & compliance advisory'],
    highlights: [
      { v:'₹2,100 Cr', l:'Entertainment & Retail Hub, Mumbai MMR, 800,000 sq ft, 85% pre-leased' },
      { v:'₹620 Cr',   l:'6-Property Heritage Hotel Portfolio, Rajasthan, 72% TTM occupancy' },
    ],
    partners: [] as string[],
  },
  {
    id: 'retail',
    icon: '🛍️',
    name: 'Retail & Leasing Strategy',
    tagline: 'Brand mix, anchor structuring, leasing advisory & franchise expansion',
    desc: 'India Gully brings 30+ active retail brand relationships and deep mall-leasing expertise to developers, destination owners and retail brands. We cover every stage, from market research and brand mix strategy to lease negotiation, fit-out coordination and franchise expansion across Tier-1 and Tier-2 cities.',
    items: ['Retail market research & gap analysis','Brand mix strategy & category planning','Anchor & inline tenant leasing','Lease term structuring & negotiation','Fit-out coordination & design review','Signage & wayfinding strategy','Mall operations consultancy','Retail franchise expansion advisory','F&B destination advisory','Retail sales channel planning'],
    highlights: [
      { v:'30+',      l:'Active retail brand relationships across fashion, F&B and entertainment' },
      { v:'15 Cities', l:'Desi Brand retail franchise expansion mandate, ₹45 Cr, 36-month payback' },
    ],
    partners: ['Brand Partners'],
  },
  {
    id: 'hospitality',
    icon: '🏨',
    name: 'Hospitality Management',
    tagline: 'Hotel management, brand on-boarding & pre-opening PMC',
    desc: 'From pre-opening planning to brand management contracts, India Gully provides end-to-end hospitality advisory, connecting developers with the right brands and ensuring seamless hotel launches. We have on-boarded 15+ hotels across Marriott, Radisson, IHG, Cygnett, Regenta and more.',
    items: ['Pre-opening planning & management','Brand selection & on-boarding','Hotel management advisory','Revenue management & yield strategy','Staff recruitment & training','FF&E / OS&E procurement','Mock-up room execution','Asset advisory & repositioning'],
    highlights: [
      { v:'15+', l:'Hotel projects managed and advised across India' },
      { v:'20+', l:'Hospitality brand relationships. Marriott to Lemon Tree' },
    ],
    partners: ['Hotel Partners'],
  },
  {
    id: 'entertainment',
    icon: '🎡',
    name: 'Entertainment Advisory',
    tagline: 'Theme parks, FECs & integrated destinations',
    desc: 'India Gully advises on large-format entertainment destinations, from concept development and operator selection to financial feasibility, project management and revenue optimisation. Our active entertainment pipeline exceeds ₹5,700 Cr.',
    items: ['Concept development & master planning','Entertainment operator identification','Financial feasibility & business plan','Technology & AV systems advisory','Attraction design & programming','Revenue mix & yield optimisation','Integrated destination planning','Project management & commissioning'],
    highlights: [
      { v:'₹1,350 Cr+', l:'Entertainment City Limited divestment — Joint Transaction Advisors alongside EY' },
      { v:'₹500 Cr',    l:'Adlabs Imagica acquisition due diligence for Entertainment City Limited' },
    ],
    partners: [] as string[],
  },
  {
    id: 'debt',
    icon: '⚖️',
    name: 'Debt & Special Situations',
    tagline: 'Structured debt advisory & distressed asset resolution',
    desc: 'We advise on structured debt arrangements, distressed asset turnarounds and special situation mandates, working with lenders, investors and promoters to maximise recovery and enterprise value. Our cross-vertical expertise in hospitality, real estate and retail is a unique differentiator.',
    items: ['Structured debt arrangement','Distressed asset resolution','IBC / NCLT process advisory','Asset monetisation','Debt restructuring & renegotiation','Promoter advisory','Lender advisory & due diligence','Special situation fund advisory'],
    highlights: [
      { v:'IBC', l:'IBC / NCLT process advisory for hotel and real estate assets' },
      { v:'Multi-sector', l:'Cross-vertical debt advisory leveraging hospitality, real estate and retail expertise' },
    ],
    partners: [] as string[],
  },
]

// Helper: logo grid for brands
function brandLogoGrid(brands: any[], title: string, subtitle: string) {
  // Group by category
  const cats = [...new Set(brands.map((b: any) => b.cat))] as string[]
  return `
<div style="margin-top:2.5rem;padding-top:2rem;border-top:1px solid var(--border);">
  <p style="font-size:.65rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.5rem;">${title}</p>
  <p style="font-size:.78rem;color:var(--ink-muted);margin-bottom:1.5rem;">${subtitle}</p>
  ${cats.map((cat: string) => `
  <div style="margin-bottom:1.5rem;">
    <p style="font-size:.6rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--gold);margin-bottom:.75rem;padding-bottom:.4rem;border-bottom:1px solid rgba(184,150,12,.2);">${cat}</p>
    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:.75rem;">
      ${brands.filter((b: any) => b.cat === cat).map((b: any) => `
      <div style="background:var(--parch);padding:.875rem .75rem;display:flex;flex-direction:column;align-items:center;gap:.4rem;border:1px solid var(--border);transition:all .2s;"
           onmouseover="this.style.borderColor='${b.color}';this.style.background='white'"
           onmouseout="this.style.borderColor='var(--border)';this.style.background='var(--parch)'">
        <img src="${b.svg}" alt="${b.name}" width="140" height="56"
             style="width:140px;height:56px;object-fit:contain;border-radius:2px;"
             loading="lazy" decoding="async">
        <span style="font-size:.56rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-faint);text-align:center;">${b.name}</span>
      </div>`).join('')}
    </div>
  </div>`).join('')}
</div>`
}

app.get('/', (c) => {
  const content = `

<!-- ══ SERVICES HERO ════════════════════════════════════════════════════ -->
<div class="hero-dk">
  <div class="hero-dk-grid"></div>
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse 50% 65% at 30% 50%,rgba(184,150,12,.05) 0%,transparent 55%);pointer-events:none;"></div>
  <div style="position:absolute;bottom:0;left:0;right:0;height:100px;background:linear-gradient(to bottom,transparent,var(--ink));pointer-events:none;"></div>
  <div class="wrap" style="position:relative;">
    <div style="max-width:720px;" class="fu">
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;">
        <div style="width:40px;height:1px;background:linear-gradient(90deg,var(--gold),transparent);"></div>
        <span style="font-size:.6rem;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);">Advisory Services</span>
      </div>
      <h1 class="h1" style="margin-bottom:1.5rem;">Six Verticals.<br><em style="color:var(--gold);font-style:italic;">One Partner.</em></h1>
      <p class="lead-lt" style="max-width:580px;margin-bottom:2.5rem;">Institutional-grade advisory across Real Estate, Retail, Hospitality, Entertainment, Debt &amp; HORECA, delivered by domain specialists with deep India market knowledge.</p>
      <div style="display:flex;flex-wrap:wrap;gap:.625rem;">
        ${SERVICES.map((s: any) => `<a href="#${s.id}" class="btn btn-ghost btn-sm">${s.name}</a>`).join('')}
        <a href="/horeca" class="btn btn-ghost btn-sm">HORECA Solutions</a>
      </div>
    </div>
  </div>
</div>

<!-- ══ SERVICES DETAIL ════════════════════════════════════════════════════ -->
${SERVICES.map((s, i) => `
<div id="${s.id}" class="${i%2===0 ? 'sec-wh' : 'sec-pc'}" style="padding-top:6.5rem;padding-bottom:6.5rem;">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:5fr 4fr;gap:5rem;align-items:start;" class="mob-stack">

      <!-- Left -->
      <div class="reveal-l">
        <div style="display:flex;align-items:center;gap:1.25rem;margin-bottom:2rem;">
          <div class="ig-icon-box" style="width:64px;height:64px;">
            <span style="font-size:1.65rem;">${s.icon}</span>
          </div>
          <div>
            <span style="font-size:.58rem;font-weight:700;letter-spacing:.28em;text-transform:uppercase;color:var(--gold);">Advisory Vertical</span>
          </div>
        </div>
        <h2 class="h2" style="margin-bottom:.875rem;">${s.name}</h2>
        <p style="font-size:.875rem;color:var(--gold);font-weight:500;letter-spacing:.04em;margin-bottom:1.5rem;">${s.tagline}</p>
        <p class="lead" style="margin-bottom:2.5rem;">${s.desc}</p>

        <!-- Service items grid -->
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;">
          ${s.items.map((item: string) => `
          <div class="service-item">
            <div style="width:20px;height:20px;background:rgba(184,150,12,.1);border:1px solid rgba(184,150,12,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:.05rem;">
              <i class="fas fa-check" style="color:var(--gold);font-size:.52rem;"></i>
            </div>
            <span style="font-size:.82rem;color:var(--ink-soft);">${item}</span>
          </div>`).join('')}
        </div>

        ${s.id === 'hospitality' ? brandLogoGrid(HOSPITALITY_BRANDS, 'Hotel Brand Partners', 'India Gully holds active advisory and management relationships with these hotel brands across India.') : ''}
        ${s.id === 'retail' ? brandLogoGrid(RETAIL_BRANDS, 'Retail Brand Partners', 'Active leasing relationships across fashion, F&B, entertainment and anchor categories.') : ''}
      </div>

      <!-- Right -->
      <div class="reveal-r">
        <div style="background:var(--ink);padding:2.5rem;margin-bottom:1.75rem;position:relative;overflow:hidden;">
          <!-- Gold top accent -->
          <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--gold),var(--gold-lt),transparent);"></div>
          <p class="eyebrow-lt" style="margin-bottom:1.75rem;">Track Record</p>
          <div style="display:flex;flex-direction:column;gap:1.5rem;">
            ${s.highlights.map((h: any) => `
            <div style="padding-bottom:1.5rem;border-bottom:1px solid rgba(255,255,255,.06);transition:padding-left .2s;" onmouseover="this.style.paddingLeft='.75rem'" onmouseout="this.style.paddingLeft='0'">
              <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2.4rem;color:var(--gold);line-height:.95;margin-bottom:.5rem;letter-spacing:-.03em;">${h.v}</div>
              <p style="font-size:.83rem;color:rgba(255,255,255,.5);line-height:1.75;">${h.l}</p>
            </div>`).join('')}
          </div>
        </div>

        <div class="ig-callout" style="padding:2rem;">
          <p style="font-size:.6rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);margin-bottom:.75rem;">Engage This Vertical</p>
          <p style="font-size:.875rem;color:var(--ink-soft);line-height:1.8;margin-bottom:1.5rem;">Interested in this advisory vertical? Our leadership team reviews all submissions within 24 hours.</p>
          <div style="display:flex;flex-direction:column;gap:.625rem;margin-bottom:1.5rem;">
            ${[{icon:"check",t:"Board-level advisory experience"},{icon:"check",t:"Pan-India mandate pipeline"},{icon:"check",t:"24-hour response commitment"}].map(b=>`<div style="display:flex;align-items:center;gap:.5rem;font-size:.8rem;color:var(--ink-muted);"><i class="fas fa-${b.icon}" style="color:var(--gold);font-size:.6rem;flex-shrink:0;"></i>${b.t}</div>`).join('')}
          </div>
          <a href="/contact?service=${s.id}" class="btn btn-g" style="width:100%;justify-content:center;">Discuss Your Mandate <i class="fas fa-arrow-right" style="margin-left:.4rem;font-size:.6rem;"></i></a>
        </div>
      </div>
    </div>
  </div>
</div>
`).join('')}

<!-- ══ TRANSACTION ADVISORY PARTNERS ════════════════════════════════════ -->
<div class="sec-wh" style="padding-top:5rem;padding-bottom:5rem;">
  <div class="wrap">
    <div style="text-align:center;max-width:640px;margin:0 auto 3rem;">
      <div class="gr-c"></div>
      <p class="eyebrow" style="margin-bottom:.75rem;">Transaction Advisory</p>
      <h2 class="h2">Our Advisory Partners</h2>
      <p class="lead" style="margin-top:1rem;max-width:520px;margin-left:auto;margin-right:auto;">India Gully collaborates with globally recognised advisory and consulting firms on transaction mandates, bringing institutional credibility, multi-disciplinary expertise and deep financial rigour to every deal.</p>
    </div>

    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:1px;background:var(--border);margin-bottom:2rem;">
      ${ADVISORY_PARTNERS.map((p: any) => `
      <div style="background:#fff;padding:2.25rem 1.25rem;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.75rem;transition:background .2s;min-height:160px;" onmouseover="this.style.background='#f9f7f2'" onmouseout="this.style.background='#fff'">
        <div style="height:56px;display:flex;align-items:center;justify-content:center;">
          <img src="${p.logo}" alt="${p.name}" style="max-height:40px;max-width:130px;width:auto;height:auto;object-fit:contain;display:block;"
               onerror="this.style.display='none';this.parentElement.nextElementSibling.style.display='flex'">
        </div>
        <div style="display:none;height:56px;align-items:center;justify-content:center;">
          <span style="font-family:'DM Serif Display',Georgia,serif;font-size:1.3rem;font-weight:700;color:var(--ink);">${p.abbr}</span>
        </div>
        <div>
          <div style="font-size:.75rem;font-weight:700;color:var(--ink);margin-bottom:.2rem;">${p.name}</div>
          <div style="font-size:.62rem;letter-spacing:.08em;text-transform:uppercase;color:var(--gold);">${p.sub}</div>
        </div>
      </div>`).join('')}
    </div>

    <div style="border:1px solid var(--border);padding:1.25rem 1.5rem;display:flex;gap:.75rem;align-items:flex-start;max-width:820px;margin:0 auto;">
      <i class="fas fa-handshake" style="color:var(--gold);font-size:.875rem;margin-top:.1rem;flex-shrink:0;"></i>
      <p style="font-size:.8rem;color:var(--ink-muted);line-height:1.8;">India Gully works alongside EY, CBRE, ANAROCK, Pipara &amp; Co and Resurgent India on select mandates where multi-disciplinary expertise, spanning financial due diligence, real estate capital markets, property consultancy, chartered accounting and investment banking, is required for complex, large-format transactions.</p>
    </div>
  </div>
</div>

<!-- ══ HORECA CTA ═════════════════════════════════════════════════════════ -->
<div class="sec-md">
  <div class="wrap" style="display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;">
    <div>
      <div class="gr-lt"></div>
      <p class="eyebrow" style="margin-bottom:.75rem;">HORECA Solutions</p>
      <h2 class="h2-lt" style="margin-bottom:1.25rem;">Complete Supply<br>Chain for Hotels</h2>
      <p class="lead-lt" style="margin-bottom:2rem;">Kitchen equipment, FF&amp;E, OS&amp;E, linens, uniforms and guest amenities, procured to spec, delivered on schedule.</p>
      <a href="/horeca" class="btn btn-g">Explore HORECA Solutions</a>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(255,255,255,.06);">
      ${['FF&amp;E Procurement','OS&amp;E Sourcing','Kitchen Equipment','Linen &amp; Tableware','Uniforms','Guest Amenities','Turnkey Supply','Ongoing Contracts'].map(item => `
      <div style="padding:1.25rem;background:rgba(255,255,255,.02);">
        <i class="fas fa-check" style="color:var(--gold);font-size:.65rem;margin-right:.5rem;"></i>
        <span style="font-size:.78rem;color:rgba(255,255,255,.5);">${item}</span>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- ══ BOTTOM CTA ══════════════════════════════════════════════════════════ -->
<div class="sec-dk" style="position:relative;overflow:hidden;">
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse 60% 80% at 50% 50%,rgba(184,150,12,.05) 0%,transparent 70%);pointer-events:none;"></div>
  <div class="wrap" style="text-align:center;max-width:720px;margin:0 auto;position:relative;">
    <div class="gr-c"></div>
    <p class="eyebrow-lt" style="margin-bottom:.75rem;">Work With Us</p>
    <h2 class="h2-lt" style="margin-bottom:1.25rem;">Ready to Engage<br>India Gully?</h2>
    <p class="lead-lt" style="max-width:520px;margin:0 auto 2.5rem;">Submit a mandate enquiry and our leadership team will respond within 24 hours.</p>
    <div style="display:flex;flex-wrap:wrap;gap:.875rem;justify-content:center;">
      <a href="/contact"  class="btn btn-g">Submit a Mandate Enquiry</a>
      <a href="/listings" class="btn btn-ghost-g">View Active Mandates</a>
    </div>
  </div>
</div>

`
  return c.html(layout('Advisory Services', content, {
    description: 'India Gully advisory services. Real Estate, Retail & Leasing, Hospitality Management, Entertainment Advisory, Debt & Special Situations, HORECA Solutions. Pan-India presence.',
    canonical: 'https://india-gully.pages.dev/services',
    ogImage: 'https://india-gully.pages.dev/static/og.jpg',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      serviceType: 'Advisory Services',
      provider: { '@type': 'Organization', name: 'India Gully', url: 'https://india-gully.pages.dev' },
      areaServed: { '@type': 'Country', name: 'India' },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'India Gully Advisory Services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Real Estate Advisory' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Retail & Leasing' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Hospitality Management' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Entertainment Advisory' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Debt & Special Situations' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'HORECA Solutions' } }
        ]
      }
    }
  }))
})

export default app
