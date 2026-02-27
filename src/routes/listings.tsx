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
      <p class="eyebrow" style="margin-bottom:.875rem;">Active Investment Mandates</p>
      <h1 class="h1" style="margin-bottom:1.5rem;">Institutional Grade<br><em style="color:var(--gold);font-style:italic;">Opportunities</em></h1>
      <p class="lead-lt" style="max-width:560px;margin-bottom:2rem;">Exclusive mandates across India's premier investment sectors. India Gully acts as Transaction Advisor — connecting qualified investors and family offices with curated, high-quality deal flow.</p>
      <div style="display:flex;gap:.75rem;flex-wrap:wrap;margin-bottom:2.5rem;">
        ${['All Mandates','Entertainment','Real Estate','Heritage','Hospitality','Retail'].map((f,i) => `
        <button onclick="filterMandates('${f.toLowerCase().replace(' ','-')}')" id="f-${f.toLowerCase().replace(' ','-')}" class="btn ${i===0?'btn-g':'btn-ghost'}" style="padding:.45rem 1rem;font-size:.72rem;">${f}</button>
        `).join('')}
      </div>
    </div>
  </div>
</div>

<!-- DISCLAIMER -->
<div style="background:rgba(184,150,12,.08);border-bottom:1px solid rgba(184,150,12,.2);padding:.875rem 0;">
  <div class="wrap">
    <div style="display:flex;align-items:flex-start;gap:.75rem;">
      <i class="fas fa-info-circle" style="color:var(--gold);margin-top:.1rem;flex-shrink:0;font-size:.85rem;"></i>
      <p style="font-size:.72rem;color:var(--ink-muted);line-height:1.7;"><strong style="color:var(--ink);">Transaction Advisory Disclaimer:</strong> India Gully (Vivacious Entertainment and Hospitality Pvt. Ltd.) acts exclusively as <strong>Transaction Advisor</strong> on all mandates listed. We do not hold, own, develop or broker properties in our own capacity. Information is provided for qualified investors only. All investment decisions must be independently assessed. Past performance is not indicative of future returns. NDA required for detailed information memoranda.</p>
    </div>
  </div>
</div>

<!-- MANDATE GRID -->
<div class="sec-pc">
  <div class="wrap">
    <div id="mandateGrid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;">
      ${LISTINGS.map(l => `
      <div class="mc" data-sector="${l.sector.toLowerCase()}" data-id="${l.id}">
        <div class="mc-head">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem;">
            <span class="badge b-g">${l.status}</span>
            <span class="caption-lt">${l.sector}</span>
          </div>
          <div class="caption-lt" style="margin-bottom:.4rem;">${l.location}</div>
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.2rem;color:#fff;line-height:1.2;margin-bottom:.875rem;">${l.title}</h3>
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2.25rem;color:var(--gold);line-height:1;">${l.value}</div>
        </div>
        <div style="padding:1.5rem;">
          <p class="body" style="margin-bottom:1.25rem;font-size:.82rem;">${l.desc}</p>

          <!-- Key metrics -->
          <div style="display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:1.25rem;">
            ${l.tags.map(t => `<span class="badge b-dk">${t}</span>`).join('')}
            ${'area' in l ? `<span class="badge b-g">${(l as any).area}</span>` : ''}
            ${'stage' in l ? `<span class="badge b-bl">${(l as any).stage}</span>` : ''}
            ${'irr' in l ? `<span class="badge b-gr">IRR ${(l as any).irr}</span>` : ''}
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-bottom:1.25rem;">
            <a href="/listings/${l.id}" class="btn btn-dk" style="justify-content:center;font-size:.72rem;">View Details</a>
            <a href="/contact?mandate=${l.id}" class="btn btn-go" style="justify-content:center;font-size:.72rem;">Enquire</a>
          </div>
          <p style="font-size:.68rem;color:var(--ink-faint);text-align:center;"><i class="fas fa-lock" style="margin-right:.3rem;"></i>NDA required for Information Memorandum</p>
        </div>
      </div>
      `).join('')}
    </div>

    <div style="margin-top:3rem;text-align:center;">
      <p style="font-size:.75rem;color:var(--ink-muted);line-height:1.7;max-width:600px;margin:0 auto 1.25rem;">All mandates are exclusive advisory engagements. Information Memoranda are available to qualified investors, institutional buyers and family offices upon signing NDA. Contact our leadership team to discuss any mandate.</p>
      <a href="/contact" class="btn btn-dk">Submit a Mandate Enquiry</a>
    </div>
  </div>
</div>

<!-- PROCESS -->
<div class="sec-wh">
  <div class="wrap">
    <div style="text-align:center;max-width:560px;margin:0 auto 3.5rem;">
      <div class="gr-c"></div>
      <p class="eyebrow" style="margin-bottom:.75rem;">Advisory Process</p>
      <h2 class="h2">How We Work with<br>Investors &amp; Buyers</h2>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0;border:1px solid var(--border);">
      ${[
        { n:'01', title:'Initial Enquiry',          desc:'Submit your mandate interest or investment brief via our contact form. Our team responds within 24 hours.' },
        { n:'02', title:'Qualification & NDA',      desc:'We assess investor qualification and facilitate a mutual NDA before sharing any confidential information.' },
        { n:'03', title:'Information Memorandum',   desc:'Detailed IM shared covering project overview, financials, market analysis, risk factors and proposed structure.' },
        { n:'04', title:'Transaction Advisory',     desc:'We guide you through due diligence, term sheet, negotiation and closing — acting as your trusted Transaction Advisor.' },
      ].map((s,i) => `
      <div style="padding:2.25rem 1.75rem;${i<3?'border-right:1px solid var(--border);':''}background:#fff;transition:background .25s;" onmouseover="this.style.background='var(--gold-pale)'" onmouseout="this.style.background='#fff'">
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:3rem;color:rgba(184,150,12,.2);line-height:1;margin-bottom:1.25rem;">${s.n}</div>
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.05rem;color:var(--ink);margin-bottom:.625rem;">${s.title}</h3>
        <p class="body" style="font-size:.8rem;">${s.desc}</p>
      </div>
      `).join('')}
    </div>
  </div>
</div>

<script>
function filterMandates(f){
  var cards = document.querySelectorAll('.mc');
  var btns  = document.querySelectorAll('[id^="f-"]');
  btns.forEach(function(b){ b.classList.remove('btn-g'); b.classList.add('btn-ghost'); });
  var active = document.getElementById('f-'+f);
  if(active){ active.classList.add('btn-g'); active.classList.remove('btn-ghost'); }
  cards.forEach(function(card){
    if(f==='all-mandates' || card.dataset.sector===f || card.dataset.sector.includes(f)){
      card.style.display=''; 
    } else {
      card.style.display='none';
    }
  });
}
</script>
`
  return c.html(layout('Investment Mandates', content, {
    description: "India Gully active investment mandates — exclusive transaction advisory across Real Estate, Entertainment, Hospitality and Retail. ₹10,000 Cr+ pipeline. For qualified investors."
  }))
})

// Individual listing detail
app.get('/:id', (c) => {
  const id = c.req.param('id')
  const listing = LISTINGS.find(l => l.id === id)
  if (!listing) return c.redirect('/listings')

  const content = `
<div style="background:var(--ink);padding:7rem 0 5rem;position:relative;overflow:hidden;">
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.05) 1px,transparent 1px);background-size:72px 72px;"></div>
  <div class="wrap" style="position:relative;">
    <a href="/listings" style="display:inline-flex;align-items:center;gap:.5rem;font-size:.78rem;color:rgba(255,255,255,.4);margin-bottom:2rem;transition:color .2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.4)'"><i class="fas fa-arrow-left" style="font-size:.65rem;"></i>All Mandates</a>
    <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1rem;">
      <span class="badge b-g">${listing.status}</span>
      <span class="eyebrow">${listing.sector}</span>
    </div>
    <h1 class="h1" style="margin-bottom:.75rem;">${listing.title}</h1>
    <p style="font-size:1rem;color:rgba(255,255,255,.4);margin-bottom:1.5rem;">${listing.location}</p>
    <div style="font-family:'DM Serif Display',Georgia,serif;font-size:3.5rem;color:var(--gold);line-height:1;">${listing.value}</div>
  </div>
</div>

<div class="sec-pc">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:1fr 360px;gap:3rem;align-items:start;">
      <div>
        <div class="gr"></div>
        <p class="eyebrow" style="margin-bottom:.75rem;">Mandate Overview</p>
        <h2 class="h2" style="margin-bottom:1.25rem;">Transaction Summary</h2>
        <p class="lead" style="margin-bottom:2rem;">${listing.desc}</p>

        <div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:2rem;">
          ${listing.tags.map(t => `<span class="badge b-dk">${t}</span>`).join('')}
        </div>

        <div style="background:var(--parch-dk);border:1px solid var(--border);padding:1.5rem;margin-bottom:2rem;">
          <p style="font-size:.72rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.875rem;">Key Mandate Details</p>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
            <div><div class="caption" style="margin-bottom:.2rem;">Investment Scale</div><div style="font-weight:600;color:var(--ink);">${listing.value}</div></div>
            <div><div class="caption" style="margin-bottom:.2rem;">Sector</div><div style="font-weight:600;color:var(--ink);">${listing.sector}</div></div>
            <div><div class="caption" style="margin-bottom:.2rem;">Location</div><div style="font-weight:600;color:var(--ink);">${listing.location}</div></div>
            <div><div class="caption" style="margin-bottom:.2rem;">Status</div><div style="font-weight:600;color:var(--ink);">${listing.status}</div></div>
          </div>
        </div>

        <div style="background:#fff;border:1px solid var(--border);padding:1.5rem;">
          <p style="font-size:.72rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.875rem;"><i class="fas fa-lock" style="margin-right:.35rem;color:var(--gold);"></i>NDA-Gated Information</p>
          <p class="body" style="margin-bottom:1rem;font-size:.8rem;">The complete Information Memorandum — including detailed financials, market analysis, risk factors, site plans and proposed transaction structure — is available to qualified investors upon execution of NDA.</p>
          <div style="display:flex;gap:.75rem;">
            <a href="/contact?mandate=${listing.id}&action=nda" class="btn btn-g" style="flex:1;justify-content:center;">Request NDA &amp; IM</a>
          </div>
        </div>
      </div>

      <!-- SIDEBAR -->
      <div style="display:flex;flex-direction:column;gap:1rem;position:sticky;top:calc(var(--nav-h) + 1.5rem);">
        <div style="background:var(--ink);padding:1.75rem;">
          <p class="eyebrow-lt" style="margin-bottom:1.25rem;">Quick Enquiry</p>
          <form class="ig-form" method="POST" action="/api/mandate-enquiry" style="display:flex;flex-direction:column;gap:.875rem;">
            <input type="hidden" name="mandate_id" value="${listing.id}">
            <input type="hidden" name="mandate_name" value="${listing.title}">
            <div>
              <label class="ig-label" style="color:rgba(255,255,255,.4);">Full Name *</label>
              <input type="text" name="name" class="ig-input" required placeholder="Your name" style="background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.1);color:#fff;">
            </div>
            <div>
              <label class="ig-label" style="color:rgba(255,255,255,.4);">Email *</label>
              <input type="email" name="email" class="ig-input" required placeholder="your@email.com" style="background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.1);color:#fff;">
            </div>
            <div>
              <label class="ig-label" style="color:rgba(255,255,255,.4);">Phone *</label>
              <input type="tel" name="phone" class="ig-input" required placeholder="+91 XXXXX XXXXX" style="background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.1);color:#fff;">
            </div>
            <div>
              <label class="ig-label" style="color:rgba(255,255,255,.4);">Organisation</label>
              <input type="text" name="org" class="ig-input" placeholder="Company / fund name" style="background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.1);color:#fff;">
            </div>
            <button type="submit" class="btn btn-g" style="width:100%;justify-content:center;margin-top:.25rem;">
              <i class="fas fa-paper-plane" style="margin-right:.5rem;"></i>Send Enquiry
            </button>
            <p style="font-size:.65rem;color:rgba(255,255,255,.2);text-align:center;">All enquiries are strictly confidential.</p>
          </form>
        </div>

        <div style="background:#fff;border:1px solid var(--border);padding:1.5rem;">
          <p style="font-size:.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.875rem;">Direct Contact</p>
          <div style="display:flex;flex-direction:column;gap:.625rem;">
            <a href="tel:+919810889134" style="display:flex;align-items:center;gap:.5rem;font-size:.78rem;color:var(--ink-soft);transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-soft)'"><i class="fas fa-phone" style="color:var(--gold);width:12px;font-size:.65rem;"></i>+91 98108 89134</a>
            <a href="mailto:info@indiagully.com" style="display:flex;align-items:center;gap:.5rem;font-size:.78rem;color:var(--ink-soft);transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-soft)'"><i class="fas fa-envelope" style="color:var(--gold);width:12px;font-size:.65rem;"></i>info@indiagully.com</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`
  return c.html(layout(listing.title, content, {
    description: `${listing.title} — ${listing.location}. ${listing.value} investment mandate. ${listing.desc}`
  }))
})

export default app
