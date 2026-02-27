import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

const SERVICES = [
  {
    id: 'real-estate',
    icon: '🏛️',
    name: 'Real Estate Advisory',
    tagline: 'Transaction advisory, site selection & asset management',
    desc: 'We advise developers, investors and family offices on the full real estate lifecycle — from site selection and feasibility to transaction structuring, asset management and divestment.',
    items: ['Site identification & due diligence','Development strategy & feasibility','Transaction advisory & deal structuring','Asset valuation & appraisal','Commercial lease structuring','Investment sales & divestment','Portfolio management','Regulatory & compliance advisory'],
    highlights: [
      { v:'₹2,100 Cr', l:'Entertainment & Retail Hub, Mumbai MMR — 85% pre-leased' },
      { v:'₹620 Cr',   l:'6-Property Heritage Hotel Portfolio, Rajasthan — 72% TTM occupancy' },
    ],
  },
  {
    id: 'retail',
    icon: '🛍️',
    name: 'Retail & Leasing Strategy',
    tagline: 'Brand mix, anchor structuring & fit-out coordination',
    desc: 'We help mall developers, mixed-use destination owners and retail brands maximise the value of their physical retail space through strategic brand mix, leasing negotiation and operational setup.',
    items: ['Retail market research & gap analysis','Brand mix strategy & category planning','Anchor & inline tenant leasing','Lease term structuring & negotiation','Fit-out coordination & design review','Signage & wayfinding strategy','Mall operations consultancy','Retail franchise expansion advisory'],
    highlights: [
      { v:'30+',  l:'Retail brand relationships across fashion, F&B and entertainment' },
      { v:'15 Cities', l:'Desi Brand retail franchise expansion mandate — ₹45 Cr capex' },
    ],
  },
  {
    id: 'hospitality',
    icon: '🏨',
    name: 'Hospitality Management',
    tagline: 'Hotel management, brand on-boarding & PMC',
    desc: 'From pre-opening planning to brand management contracts, India Gully provides end-to-end hospitality advisory — connecting developers with the right brands and ensuring seamless hotel launches.',
    items: ['Pre-opening planning & management','Brand selection & on-boarding','Hotel management advisory','Revenue management & yield strategy','Staff recruitment & training','FF&E / OS&E procurement','Mock-up room execution','Asset advisory & repositioning'],
    highlights: [
      { v:'15+',  l:'Hotel projects managed and advised across India' },
      { v:'20+',  l:'Hospitality brand relationships — Marriott to Lemon Tree' },
    ],
  },
  {
    id: 'entertainment',
    icon: '🎡',
    name: 'Entertainment Advisory',
    tagline: 'Theme parks, FECs & integrated destinations',
    desc: 'India Gully advises on large-format entertainment destinations — from concept development and operator selection to financial feasibility, project management and revenue optimisation.',
    items: ['Concept development & master planning','Entertainment operator identification','Financial feasibility & business plan','Technology & AV systems advisory','Attraction design & programming','Revenue mix & yield optimisation','Integrated destination planning','Project management & commissioning'],
    highlights: [
      { v:'₹4,500 Cr', l:'Integrated Entertainment Destination, Maharashtra — Phase 1 approved' },
      { v:'₹1,200 Cr+', l:'Entertainment City, Noida NCR — co-advised with Bhutani Group' },
    ],
  },
  {
    id: 'debt',
    icon: '⚖️',
    name: 'Debt & Special Situations',
    tagline: 'Structured debt advisory & distressed asset resolution',
    desc: 'We advise on structured debt arrangements, distressed asset turnarounds and special situation mandates — working with lenders, investors and promoters to maximise recovery and enterprise value.',
    items: ['Structured debt arrangement','Distressed asset resolution','IBC / NCLT process advisory','Asset monetisation','Debt restructuring & renegotiation','Promoter advisory','Lender advisory & due diligence','Special situation fund advisory'],
    highlights: [
      { v:'IBC', l:'IBC / NCLT process advisory for hotel and real estate assets' },
      { v:'Multi-sector', l:'Cross-vertical debt advisory leveraging hospitality, real estate and retail expertise' },
    ],
  },
]

app.get('/', (c) => {
  const content = `

<!-- SERVICES HERO -->
<div style="background:var(--ink);padding:7rem 0 5rem;position:relative;overflow:hidden;">
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.05) 1px,transparent 1px);background-size:72px 72px;"></div>
  <div class="wrap" style="position:relative;">
    <div style="max-width:700px;" class="fu">
      <div class="gr-lt"></div>
      <p class="eyebrow" style="margin-bottom:.875rem;">Advisory Services</p>
      <h1 class="h1" style="margin-bottom:1.5rem;">Five Verticals.<br><em style="color:var(--gold);font-style:italic;">One Partner.</em></h1>
      <p class="lead-lt" style="max-width:560px;margin-bottom:2rem;">Institutional-grade advisory across Real Estate, Retail, Hospitality, Entertainment and Debt — delivered by domain specialists with deep India market knowledge.</p>
      <div style="display:flex;flex-wrap:wrap;gap:.75rem;">
        ${SERVICES.map(s => `<a href="#${s.id}" class="btn btn-ghost" style="padding:.45rem 1rem;font-size:.72rem;">${s.name}</a>`).join('')}
      </div>
    </div>
  </div>
</div>

<!-- SERVICES DETAIL -->
${SERVICES.map((s, i) => `
<div id="${s.id}" class="${i%2===0 ? 'sec-wh' : 'sec-pd'}">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:5fr 4fr;gap:4.5rem;align-items:start;">
      <!-- Left -->
      <div>
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;">
          <span style="font-size:2.25rem;">${s.icon}</span>
          <div>
            <p class="eyebrow">Advisory Vertical</p>
          </div>
        </div>
        <h2 class="h2" style="margin-bottom:.75rem;">${s.name}</h2>
        <p style="font-size:.85rem;color:var(--gold);font-weight:500;letter-spacing:.04em;margin-bottom:1.25rem;">${s.tagline}</p>
        <p class="lead" style="margin-bottom:2rem;">${s.desc}</p>

        <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;">
          ${s.items.map(item => `
          <div style="display:flex;align-items:flex-start;gap:.6rem;padding:.625rem .875rem;background:var(--parch);border:1px solid var(--border);">
            <i class="fas fa-check" style="color:var(--gold);font-size:.65rem;margin-top:.28rem;flex-shrink:0;"></i>
            <span style="font-size:.8rem;color:var(--ink-soft);">${item}</span>
          </div>
          `).join('')}
        </div>
      </div>

      <!-- Right -->
      <div>
        <div style="background:var(--ink);padding:2rem;margin-bottom:1.5rem;">
          <p class="eyebrow-lt" style="margin-bottom:1.25rem;">Track Record</p>
          <div style="display:flex;flex-direction:column;gap:1rem;">
            ${s.highlights.map(h => `
            <div style="padding-bottom:1rem;border-bottom:1px solid rgba(255,255,255,.07);">
              <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2rem;color:var(--gold);line-height:1;margin-bottom:.35rem;">${h.v}</div>
              <p class="body-lt" style="font-size:.8rem;">${h.l}</p>
            </div>
            `).join('')}
          </div>
        </div>

        <div style="border:1px solid var(--border);padding:1.5rem;">
          <p style="font-size:.72rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.875rem;">Submit an Enquiry</p>
          <p class="body" style="margin-bottom:1.25rem;font-size:.8rem;">Interested in this advisory vertical? Reach out to discuss your mandate.</p>
          <a href="/contact?service=${s.id}" class="btn btn-g" style="width:100%;justify-content:center;">Discuss This Mandate</a>
        </div>
      </div>
    </div>
  </div>
</div>
`).join('')}

<!-- HORECA CTA -->
<div class="sec-md">
  <div class="wrap" style="display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;">
    <div>
      <div class="gr-lt"></div>
      <p class="eyebrow" style="margin-bottom:.75rem;">HORECA Solutions</p>
      <h2 class="h2-lt" style="margin-bottom:1.25rem;">Complete Supply<br>Chain for Hotels</h2>
      <p class="lead-lt" style="margin-bottom:2rem;">Kitchen equipment, FF&E, OS&E, linens, uniforms and guest amenities — procured to spec, delivered on schedule.</p>
      <a href="/horeca" class="btn btn-g">Explore HORECA Solutions</a>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(255,255,255,.06);">
      ${['FF&amp;E Procurement','OS&amp;E Sourcing','Kitchen Equipment','Linen &amp; Tableware','Uniforms','Guest Amenities','Turnkey Supply','Ongoing Contracts'].map(item => `
      <div style="padding:1.25rem;background:rgba(255,255,255,.02);">
        <i class="fas fa-check" style="color:var(--gold);font-size:.65rem;margin-right:.5rem;"></i>
        <span style="font-size:.78rem;color:rgba(255,255,255,.5);">${item}</span>
      </div>
      `).join('')}
    </div>
  </div>
</div>

<!-- CTA -->
<div class="sec-dk" style="position:relative;overflow:hidden;">
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse 60% 80% at 50% 50%,rgba(184,150,12,.05) 0%,transparent 70%);"></div>
  <div class="wrap" style="text-align:center;max-width:720px;margin:0 auto;position:relative;">
    <div class="gr-c"></div>
    <p class="eyebrow-lt" style="margin-bottom:.75rem;">Work With Us</p>
    <h2 class="h2-lt" style="margin-bottom:1.25rem;">Ready to Engage<br>India Gully?</h2>
    <p class="lead-lt" style="max-width:520px;margin:0 auto 2.5rem;">Submit a mandate enquiry and our leadership team will respond within 24 hours.</p>
    <div style="display:flex;flex-wrap:wrap;gap:.875rem;justify-content:center;">
      <a href="/contact" class="btn btn-g">Submit a Mandate Enquiry</a>
      <a href="/listings" class="btn btn-ghost-g">View Active Mandates</a>
    </div>
  </div>
</div>

`
  return c.html(layout('Advisory Services', content, {
    description: "India Gully advisory services — Real Estate, Retail & Leasing, Hospitality Management, Entertainment Advisory, Debt & Special Situations, HORECA Solutions."
  }))
})

export default app
