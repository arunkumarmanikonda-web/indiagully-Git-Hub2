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
  return `
<div style="margin-top:2.5rem;padding-top:2rem;border-top:1px solid var(--border);">
  <p style="font-size:.65rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:1rem;">${title}</p>
  <p style="font-size:.78rem;color:var(--ink-muted);margin-bottom:1.25rem;">${subtitle}</p>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);">
    ${brands.slice(0,8).map((b: any) => `
    <div style="background:#fff;padding:1.1rem .875rem;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:72px;gap:.5rem;transition:background .2s;" onmouseover="this.style.background='var(--parch)'" onmouseout="this.style.background='#fff'">
      <img src="${b.logo}" alt="${b.name}" style="height:24px;width:auto;object-fit:contain;filter:grayscale(100%);opacity:.6;transition:all .25s;"
           onmouseover="this.style.filter='grayscale(0)';this.style.opacity='1'" onmouseout="this.style.filter='grayscale(100%)';this.style.opacity='.6'"
           onerror="this.style.display='none';this.nextElementSibling.style.display='block'">
      <div style="display:none;font-size:.6rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-muted);text-align:center;">${b.name}</div>
    </div>`).join('')}
  </div>
</div>`
}

app.get('/', (c) => {
  const content = `

<!-- ══ SERVICES HERO ════════════════════════════════════════════════════ -->
<div style="background:var(--ink);padding:7rem 0 5rem;position:relative;overflow:hidden;">
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.045) 1px,transparent 1px);background-size:72px 72px;pointer-events:none;"></div>
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse 50% 60% at 30% 50%,rgba(184,150,12,.04) 0%,transparent 60%);pointer-events:none;"></div>
  <div class="wrap" style="position:relative;">
    <div style="max-width:720px;" class="fu">
      <div class="gr-lt"></div>
      <p class="eyebrow" style="margin-bottom:.875rem;">Advisory Services</p>
      <h1 class="h1" style="margin-bottom:1.5rem;">Six Verticals.<br><em style="color:var(--gold);font-style:italic;">One Partner.</em></h1>
      <p class="lead-lt" style="max-width:580px;margin-bottom:2rem;">Institutional-grade advisory across Real Estate, Retail, Hospitality, Entertainment, Debt & HORECA, delivered by domain specialists with deep India market knowledge.</p>
      <div style="display:flex;flex-wrap:wrap;gap:.65rem;">
        ${SERVICES.map(s => `<a href="#${s.id}" class="btn btn-ghost" style="padding:.42rem 1rem;font-size:.68rem;">${s.name}</a>`).join('')}
        <a href="/horeca" class="btn btn-ghost" style="padding:.42rem 1rem;font-size:.68rem;">HORECA Solutions</a>
      </div>
    </div>
  </div>
</div>

<!-- ══ SERVICES DETAIL ════════════════════════════════════════════════════ -->
${SERVICES.map((s, i) => `
<div id="${s.id}" class="${i%2===0 ? 'sec-wh' : 'sec-pd'}" style="padding-top:5rem;padding-bottom:5rem;">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:5fr 4fr;gap:4.5rem;align-items:start;">

      <!-- Left -->
      <div>
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;">
          <span style="font-size:2.25rem;">${s.icon}</span>
          <p class="eyebrow">Advisory Vertical</p>
        </div>
        <h2 class="h2" style="margin-bottom:.75rem;">${s.name}</h2>
        <p style="font-size:.875rem;color:var(--gold);font-weight:500;letter-spacing:.04em;margin-bottom:1.25rem;">${s.tagline}</p>
        <p class="lead" style="margin-bottom:2rem;">${s.desc}</p>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;">
          ${s.items.map(item => `
          <div style="display:flex;align-items:flex-start;gap:.6rem;padding:.625rem .875rem;background:${i%2===0?'var(--parch)':'#fff'};border:1px solid var(--border);">
            <i class="fas fa-check" style="color:var(--gold);font-size:.65rem;margin-top:.28rem;flex-shrink:0;"></i>
            <span style="font-size:.8rem;color:var(--ink-soft);">${item}</span>
          </div>`).join('')}
        </div>

        ${s.id === 'hospitality' ? brandLogoGrid(HOSPITALITY_BRANDS, 'Hotel Brand Partners', 'India Gully holds active advisory and management relationships with these hotel brands across India.') : ''}
        ${s.id === 'retail' ? brandLogoGrid(RETAIL_BRANDS, 'Retail Brand Partners', 'Active leasing relationships across fashion, F&B, entertainment and anchor categories.') : ''}
      </div>

      <!-- Right -->
      <div>
        <div style="background:var(--ink);padding:2rem;margin-bottom:1.5rem;">
          <p class="eyebrow-lt" style="margin-bottom:1.25rem;">Track Record</p>
          <div style="display:flex;flex-direction:column;gap:1rem;">
            ${s.highlights.map(h => `
            <div style="padding-bottom:1rem;border-bottom:1px solid rgba(255,255,255,.07);">
              <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2rem;color:var(--gold);line-height:1;margin-bottom:.35rem;">${h.v}</div>
              <p style="font-size:.8rem;color:rgba(255,255,255,.5);line-height:1.65;">${h.l}</p>
            </div>`).join('')}
          </div>
        </div>

        <div style="border:1px solid var(--border);padding:1.5rem;">
          <p style="font-size:.65rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.875rem;">Engage This Vertical</p>
          <p class="body" style="margin-bottom:1.25rem;font-size:.82rem;">Interested in this advisory vertical? Our team will respond within 24 hours.</p>
          <a href="/contact?service=${s.id}" class="btn btn-g" style="width:100%;justify-content:center;">Discuss Your Mandate</a>
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
    description: 'India Gully advisory services. Real Estate, Retail & Leasing, Hospitality Management, Entertainment Advisory, Debt & Special Situations, HORECA Solutions. Pan-India presence.'
  }))
})

export default app
