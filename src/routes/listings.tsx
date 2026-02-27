import { Hono } from 'hono'
import { layout } from '../lib/layout'
import { LISTINGS } from '../lib/constants'

const app = new Hono()

app.get('/', (c) => {
  const content = `

<!-- LISTINGS HERO -->
<div style="background:var(--ink);padding:7rem 0 5rem;position:relative;overflow:hidden;">
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.05) 1px,transparent 1px);background-size:72px 72px;"></div>
  <div class="wrap" style="position:relative;">
    <div style="max-width:740px;" class="fu">
      <div class="gr-lt"></div>
      <p class="eyebrow" style="margin-bottom:.875rem;">Active Mandates</p>
      <h1 class="h1" style="margin-bottom:1.5rem;">Investment<br><em style="color:var(--gold);font-style:italic;">Opportunities</em><br><span style="font-size:.6em;font-weight:300;color:rgba(255,255,255,.5);">of Institutional Grade</span></h1>
      <p class="lead-lt" style="max-width:580px;">Exclusive mandates across India's premier sectors. All opportunities subject to NDA. Information Memoranda available to qualified investors, family offices and institutional buyers upon request.</p>
    </div>
  </div>
</div>

<!-- PIPELINE STATS -->
<div style="background:var(--ink-mid);border-bottom:1px solid rgba(255,255,255,.06);">
  <div class="wrap" style="padding-top:0;padding-bottom:0;">
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0;border-left:1px solid rgba(255,255,255,.06);">
      ${[
        { n:'₹8,815 Cr+', l:'Total Active Pipeline' },
        { n:'6',          l:'Active Mandates' },
        { n:'4',          l:'Sectors Represented' },
        { n:'NDA Gated',  l:'All Mandates — Exclusive' },
      ].map(s => `
      <div style="padding:2rem 1.75rem;border-right:1px solid rgba(255,255,255,.06);text-align:center;">
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2.25rem;color:var(--gold);line-height:1;margin-bottom:.4rem;">${s.n}</div>
        <div style="font-size:.65rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.28);">${s.l}</div>
      </div>
      `).join('')}
    </div>
  </div>
</div>

<!-- ALL MANDATES GRID -->
<div class="sec-wh" style="padding-top:3rem;">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;">
      ${LISTINGS.map(l => `
      <div class="mc">
        <div class="mc-head">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1.25rem;">
            <span class="badge b-g">${l.status}</span>
            <span style="font-size:.68rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.3);">${l.sector}</span>
          </div>
          <div style="font-size:.72rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.35);margin-bottom:.35rem;">${l.location}</div>
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.35rem;color:#fff;line-height:1.25;">${l.title}</h3>
        </div>
        <div style="padding:1.5rem;">
          <p class="body" style="margin-bottom:1.25rem;">${l.desc}</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-bottom:1.25rem;">
            <div style="background:var(--parch);padding:.875rem;">
              <div class="caption" style="margin-bottom:.3rem;">Investment Scale</div>
              <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:var(--gold);line-height:1;">${l.value}</div>
            </div>
            <div style="background:var(--parch);padding:.875rem;">
              <div class="caption" style="margin-bottom:.3rem;">Sector</div>
              <div style="font-size:.85rem;font-weight:600;color:var(--ink);">${l.sector}</div>
            </div>
          </div>
          ${l.area ? `<div style="font-size:.78rem;color:var(--ink-muted);margin-bottom:.5rem;"><i class="fas fa-expand" style="color:var(--gold);margin-right:.4rem;font-size:.65rem;"></i>${l.area}</div>` : ''}
          ${(l as any).keys ? `<div style="font-size:.78rem;color:var(--ink-muted);margin-bottom:.5rem;"><i class="fas fa-key" style="color:var(--gold);margin-right:.4rem;font-size:.65rem;"></i>${(l as any).keys}</div>` : ''}
          ${(l as any).irr ? `<div style="font-size:.78rem;color:var(--ink-muted);margin-bottom:.5rem;"><i class="fas fa-chart-line" style="color:var(--gold);margin-right:.4rem;font-size:.65rem;"></i>IRR: ${(l as any).irr}</div>` : ''}
          <div style="display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:1.25rem;">
            ${l.tags.map(t => `<span class="badge b-dk">${t}</span>`).join('')}
          </div>
          <a href="/listings/${l.id}" class="btn btn-dk" style="width:100%;justify-content:center;">View Mandate Details</a>
        </div>
      </div>
      `).join('')}
    </div>

    <div style="text-align:center;margin-top:3rem;padding-top:2.5rem;border-top:1px solid var(--border);">
      <p style="font-size:.75rem;color:var(--ink-muted);margin-bottom:.875rem;">All mandates strictly by NDA · Information Memorandum available to qualified investors · Please contact us to execute NDA and proceed</p>
      <a href="/contact" class="btn btn-g">Submit Mandate Enquiry</a>
    </div>
  </div>
</div>

`
  return c.html(layout('Active Mandates', content, {
    description: 'India Gully active mandates — institutional-grade investment opportunities across Real Estate, Hospitality, Entertainment and Retail. All opportunities subject to NDA.'
  }))
})

// Individual mandate detail page
app.get('/:id', (c) => {
  const id = c.req.param('id')
  const listing = LISTINGS.find(l => l.id === id)
  if (!listing) return c.redirect('/listings')

  const l = listing as any

  const content = `

<!-- MANDATE DETAIL HERO -->
<div style="background:var(--ink);padding:7rem 0 4rem;position:relative;overflow:hidden;">
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.05) 1px,transparent 1px);background-size:72px 72px;"></div>
  <div class="wrap" style="position:relative;">
    <a href="/listings" style="display:inline-flex;align-items:center;gap:.5rem;font-size:.78rem;color:rgba(255,255,255,.4);margin-bottom:2rem;transition:color .2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.4)'">
      <i class="fas fa-arrow-left" style="font-size:.65rem;"></i> Back to All Mandates
    </a>
    <div style="display:grid;grid-template-columns:3fr 2fr;gap:4rem;align-items:start;" class="fu">
      <div>
        <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1.25rem;">
          <span class="badge b-g">${l.status}</span>
          <span style="font-size:.72rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.3);">${l.sector}</span>
        </div>
        <div style="font-size:.8rem;color:rgba(255,255,255,.35);margin-bottom:.4rem;">${l.location}</div>
        <h1 style="font-family:'DM Serif Display',Georgia,serif;font-size:clamp(2rem,4vw,3.25rem);color:#fff;line-height:1.1;margin-bottom:1.25rem;">${l.title}</h1>
        <p class="lead-lt">${l.desc}</p>
      </div>
      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);padding:2rem;">
        <p class="eyebrow-lt" style="margin-bottom:1.25rem;">Key Metrics</p>
        <div style="display:flex;flex-direction:column;gap:1rem;">
          <div style="padding-bottom:1rem;border-bottom:1px solid rgba(255,255,255,.07);">
            <div class="caption-lt" style="margin-bottom:.3rem;">Investment Scale</div>
            <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2.5rem;color:var(--gold);line-height:1;">${l.value}</div>
          </div>
          ${l.area ? `<div><div class="caption-lt" style="margin-bottom:.2rem;">Area</div><div style="font-size:.9rem;color:#fff;font-weight:500;">${l.area}</div></div>` : ''}
          ${l.keys ? `<div><div class="caption-lt" style="margin-bottom:.2rem;">Keys / Rooms</div><div style="font-size:.9rem;color:#fff;font-weight:500;">${l.keys}</div></div>` : ''}
          ${l.irr ? `<div><div class="caption-lt" style="margin-bottom:.2rem;">Projected IRR</div><div style="font-size:.9rem;color:var(--gold);font-weight:600;">${l.irr}</div></div>` : ''}
          ${l.preleased ? `<div><div class="caption-lt" style="margin-bottom:.2rem;">Pre-Leased</div><div style="font-size:.9rem;color:var(--gold);font-weight:600;">${l.preleased}</div></div>` : ''}
          ${l.occupancy ? `<div><div class="caption-lt" style="margin-bottom:.2rem;">TTM Occupancy</div><div style="font-size:.9rem;color:var(--gold);font-weight:600;">${l.occupancy}</div></div>` : ''}
          ${l.stage ? `<div><div class="caption-lt" style="margin-bottom:.2rem;">Stage</div><div style="font-size:.9rem;color:#fff;font-weight:500;">${l.stage}</div></div>` : ''}
        </div>
        <div style="margin-top:1.5rem;padding-top:1.5rem;border-top:1px solid rgba(255,255,255,.07);">
          <a href="/contact?mandate=${l.id}" class="btn btn-g" style="width:100%;justify-content:center;">Request Information Memorandum</a>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- MANDATE DETAIL CONTENT -->
<div class="sec-wh">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:2fr 1fr;gap:4rem;">
      <div>
        <div class="gr"></div>
        <p class="eyebrow" style="margin-bottom:.75rem;">Mandate Overview</p>
        <h2 class="h2" style="margin-bottom:1.5rem;">${l.title}</h2>
        <p class="lead" style="margin-bottom:2rem;">${l.desc}</p>

        <div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:2.5rem;">
          ${l.tags.map((t: string) => `<span class="badge b-g">${t}</span>`).join('')}
        </div>

        <div style="background:var(--parch);border:1px solid var(--border);padding:1.5rem;margin-bottom:2rem;">
          <p style="font-size:.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.75rem;">NDA & Access</p>
          <p style="font-size:.8rem;color:var(--ink-muted);line-height:1.75;">Access to the detailed Information Memorandum, financial models and site data is subject to execution of a mutual NDA. Please contact our team to proceed.</p>
        </div>
      </div>

      <!-- Sidebar -->
      <div style="display:flex;flex-direction:column;gap:1.25rem;">
        <div style="background:var(--ink);padding:1.75rem;">
          <p class="eyebrow-lt" style="margin-bottom:1.25rem;">Express Interest</p>
          <form class="ig-form" method="POST" action="/api/mandate-enquiry" style="display:flex;flex-direction:column;gap:.875rem;">
            <input type="hidden" name="mandate" value="${l.id}">
            <div>
              <label class="ig-lbl" style="color:rgba(255,255,255,.35);">Your Name *</label>
              <input type="text" name="name" class="ig-input" required placeholder="Full name">
            </div>
            <div>
              <label class="ig-lbl" style="color:rgba(255,255,255,.35);">Email *</label>
              <input type="email" name="email" class="ig-input" required placeholder="your@email.com">
            </div>
            <div>
              <label class="ig-lbl" style="color:rgba(255,255,255,.35);">Organisation</label>
              <input type="text" name="org" class="ig-input" placeholder="Fund / Family Office / Developer">
            </div>
            <div>
              <label class="ig-lbl" style="color:rgba(255,255,255,.35);">Message</label>
              <textarea name="message" class="ig-input" style="min-height:80px;" placeholder="Brief note on your interest…"></textarea>
            </div>
            <button type="submit" class="btn btn-g" style="width:100%;justify-content:center;">Request IM &amp; NDA</button>
          </form>
        </div>
        <div style="border:1px solid var(--border);padding:1.25rem;">
          <p style="font-size:.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.75rem;">Advisory Contact</p>
          <div style="display:flex;flex-direction:column;gap:.5rem;">
            <a href="tel:+919810889134" style="font-size:.8rem;color:var(--ink-soft);display:flex;align-items:center;gap:.5rem;transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-soft)'"><i class="fas fa-phone" style="color:var(--gold);width:14px;font-size:.65rem;"></i>+91 98108 89134</a>
            <a href="mailto:info@indiagully.com" style="font-size:.8rem;color:var(--ink-soft);display:flex;align-items:center;gap:.5rem;transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-soft)'"><i class="fas fa-envelope" style="color:var(--gold);width:14px;font-size:.65rem;"></i>info@indiagully.com</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- MORE MANDATES -->
<div class="sec-pd">
  <div class="wrap">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2rem;">
      <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:var(--ink);">More Active Mandates</h3>
      <a href="/listings" class="btn btn-dko" style="font-size:.72rem;">View All</a>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;">
      ${LISTINGS.filter(x => x.id !== id).slice(0,3).map(x => `
      <a href="/listings/${x.id}" class="card" style="padding:1.25rem;display:block;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.6rem;">
          <span class="badge b-g" style="font-size:.6rem;">${x.sector}</span>
          <span style="font-family:'DM Serif Display',Georgia,serif;font-size:1.25rem;color:var(--gold);">${x.value}</span>
        </div>
        <h4 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);margin-bottom:.3rem;">${x.title}</h4>
        <p class="caption">${x.location}</p>
      </a>
      `).join('')}
    </div>
  </div>
</div>

`
  return c.html(layout(listing.title, content, {
    description: `${listing.title} — ${listing.location} — ${listing.value} — India Gully active mandate advisory.`
  }))
})

export default app
