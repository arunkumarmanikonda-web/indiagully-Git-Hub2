import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

const CATEGORIES = [
  { icon:'🍳', name:'Kitchen Equipment',     desc:'Commercial kitchens, cooking ranges, ovens, fryers, refrigeration systems and ventilation — specified to brand standards and local compliance.' },
  { icon:'🛏️', name:'FF&E Procurement',      desc:'Furniture, Fixtures & Equipment — beds, seating, casegoods, soft furnishings, lighting and all guestroom and public area FF&E.' },
  { icon:'🧴', name:'OS&E & Guest Amenities',desc:"Operating Supplies & Equipment — toiletries, minibar, stationery, amenity kits, laundry supplies, housekeeping consumables and branded guest amenities." },
  { icon:'🍽️', name:'Linen & Tableware',     desc:'Bed linen, bath linen, restaurant tableware, glassware, flatware, napery and F&B service equipment to hotel-grade specifications.' },
  { icon:'👔', name:'Uniforms & Workwear',   desc:'Branded uniforms for all departments — front office, F&B, housekeeping, engineering and management — including design, tailoring and supply.' },
  { icon:'📺', name:'Technology & AV',       desc:'GRMS, POS, property management systems integration, in-room entertainment, digital signage, background music and AV systems.' },
  { icon:'🧹', name:'Housekeeping Supplies', desc:'Cleaning chemicals, equipment, trolleys, laundry supplies and housekeeping consumables — maintained under service contracts.' },
  { icon:'📦', name:'Turnkey Procurement',   desc:'Full turnkey supply coordination for hotel pre-openings — single vendor accountability from specification to site delivery and installation sign-off.' },
]

const STEPS = [
  { n:'01', title:'Requirement Specification', desc:'We work with your project team and brand standards consultant to prepare complete FF&E, OS&E and kitchen equipment specifications.' },
  { n:'02', title:'Vendor Identification & Quoting', desc:'Our procurement network sources competitive quotes from approved vendors. We manage the RFQ, comparison and vendor selection process.' },
  { n:'03', title:'Quality & Compliance',     desc:'Samples reviewed against brand standards. All items validated for quality, fire safety certification and compliance before approval.' },
  { n:'04', title:'Delivery & Installation',  desc:'Coordinated delivery schedules aligned with your construction programme. Installation supervision and punch-list sign-off included.' },
]

app.get('/', (c) => {
  const content = `

<!-- HORECA HERO -->
<div style="background:var(--ink);padding:7rem 0 5rem;position:relative;overflow:hidden;">
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.05) 1px,transparent 1px);background-size:72px 72px;"></div>
  <div class="wrap" style="position:relative;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;">
      <div class="fu">
        <div class="gr-lt"></div>
        <p class="eyebrow" style="margin-bottom:.875rem;">HORECA Solutions</p>
        <h1 class="h1" style="margin-bottom:1.5rem;">End-to-End<br><em style="color:var(--gold);font-style:italic;">HORECA</em><br><span style="font-size:.6em;font-weight:300;color:rgba(255,255,255,.5);">Supply &amp; Procurement</span></h1>
        <p class="lead-lt" style="max-width:480px;margin-bottom:2rem;">Kitchen equipment, FF&amp;E, OS&amp;E, linens, uniforms and guest amenities — procured to brand specification, delivered on schedule for hotels and F&amp;B operators across India.</p>
        <div style="display:flex;gap:.875rem;flex-wrap:wrap;">
          <a href="#quote" class="btn btn-g">Request a Quote</a>
          <a href="/contact" class="btn btn-ghost">General Enquiry</a>
        </div>
      </div>
      <div class="fu2" style="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(255,255,255,.07);">
        ${[
          { n:'₹500 Cr+', l:'Procurement Facilitated' },
          { n:'15+',      l:'Hotel Projects Supplied' },
          { n:'100+',     l:'Vendor Relationships' },
          { n:'Pan-India',l:'Delivery Network' },
        ].map(s => `
        <div style="background:rgba(255,255,255,.03);padding:1.75rem;text-align:center;">
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2rem;color:var(--gold);line-height:1;">${s.n}</div>
          <div class="caption-lt" style="margin-top:.4rem;">${s.l}</div>
        </div>
        `).join('')}
      </div>
    </div>
  </div>
</div>

<!-- SUPPLY CATEGORIES -->
<div class="sec-wh">
  <div class="wrap">
    <div style="text-align:center;max-width:580px;margin:0 auto 3.5rem;">
      <div class="gr-c"></div>
      <p class="eyebrow" style="margin-bottom:.75rem;">What We Supply</p>
      <h2 class="h2">Eight Categories.<br>One Procurement Partner.</h2>
    </div>

    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;">
      ${CATEGORIES.map(cat => `
      <div class="card card-lift" style="padding:1.75rem;">
        <div style="font-size:2rem;margin-bottom:1rem;">${cat.icon}</div>
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);margin-bottom:.6rem;">${cat.name}</h3>
        <p class="body" style="font-size:.8rem;">${cat.desc}</p>
      </div>
      `).join('')}
    </div>
  </div>
</div>

<!-- PROCUREMENT PROCESS -->
<div class="sec-pd">
  <div class="wrap">
    <div style="text-align:center;max-width:580px;margin:0 auto 3.5rem;">
      <div class="gr-c"></div>
      <p class="eyebrow" style="margin-bottom:.75rem;">How It Works</p>
      <h2 class="h2">The India Gully<br>Procurement Process</h2>
    </div>

    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0;border:1px solid var(--border);">
      ${STEPS.map((step, i) => `
      <div style="padding:2.25rem 1.75rem;${i<3?'border-right:1px solid var(--border);':''}background:#fff;transition:background .25s;" onmouseover="this.style.background='var(--gold-pale)'" onmouseout="this.style.background='#fff'">
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:3rem;color:rgba(184,150,12,.2);line-height:1;margin-bottom:1.25rem;">${step.n}</div>
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.05rem;color:var(--ink);margin-bottom:.625rem;">${step.title}</h3>
        <p class="body" style="font-size:.8rem;">${step.desc}</p>
      </div>
      `).join('')}
    </div>
  </div>
</div>

<!-- BRAND PARTNERS -->
<div class="sec-wh">
  <div class="wrap">
    <div style="text-align:center;max-width:520px;margin:0 auto 3rem;">
      <div class="gr-c"></div>
      <p class="eyebrow" style="margin-bottom:.75rem;">Projects Supplied</p>
      <h2 class="h2">Hotels We've Supplied</h2>
    </div>

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;">
      ${[
        { brand:'Park Inn by Radisson, Delhi',     type:'FF&E / OS&E · Pre-Opening',     icon:'🔴' },
        { brand:'Cygnett Style Shubh, Ramnagar',   type:'Kitchen Equipment · OS&E',      icon:'🦢' },
        { brand:'Regenta Central, Noida',          type:'Full Turnkey Procurement',       icon:'🌸' },
        { brand:'Villa Hotel, Jim Corbett',        type:'OS&E · Linen · Amenities',       icon:'🌿' },
        { brand:'Bijolai Palace, Jodhpur',         type:'FF&E Specification & Supply',    icon:'🏰' },
        { brand:'100-Room Greenfield, Hosur',      type:'Full Pre-Opening Procurement',   icon:'🏗️' },
      ].map(p => `
      <div class="card" style="padding:1.5rem;display:flex;align-items:center;gap:1rem;">
        <span style="font-size:2rem;flex-shrink:0;">${p.icon}</span>
        <div>
          <h3 style="font-size:.9rem;font-weight:600;color:var(--ink);margin-bottom:.2rem;">${p.brand}</h3>
          <p class="caption">${p.type}</p>
        </div>
      </div>
      `).join('')}
    </div>
  </div>
</div>

<!-- QUOTE FORM -->
<div id="quote" class="sec-dk">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:1fr 1.4fr;gap:4.5rem;align-items:start;">
      <div>
        <div class="gr-lt"></div>
        <p class="eyebrow" style="margin-bottom:.75rem;">Procurement Enquiry</p>
        <h2 class="h2-lt" style="margin-bottom:1.25rem;">Request a<br>HORECA Quote</h2>
        <p class="lead-lt" style="margin-bottom:2rem;">Tell us about your project requirements and our procurement team will send you a detailed proposal within 48 hours.</p>
        <div style="display:flex;flex-direction:column;gap:.875rem;">
          ${[
            { icon:'check-circle', text:'Competitive pan-India vendor network' },
            { icon:'check-circle', text:'Brand standard compliance guaranteed' },
            { icon:'check-circle', text:'Site delivery & installation coordination' },
            { icon:'check-circle', text:'Post-supply service support available' },
          ].map(f => `
          <div style="display:flex;align-items:center;gap:.75rem;">
            <i class="fas fa-${f.icon}" style="color:var(--gold);font-size:.85rem;flex-shrink:0;"></i>
            <span style="font-size:.85rem;color:rgba(255,255,255,.55);">${f.text}</span>
          </div>
          `).join('')}
        </div>
      </div>

      <form class="ig-form" method="POST" action="/api/horeca-enquiry" style="display:flex;flex-direction:column;gap:1.25rem;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
          <div>
            <label class="ig-lbl">Your Name *</label>
            <input type="text" name="name" class="ig-inp" required placeholder="Full name">
          </div>
          <div>
            <label class="ig-lbl">Organisation *</label>
            <input type="text" name="organisation" class="ig-inp" required placeholder="Hotel / company name">
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
          <div>
            <label class="ig-lbl">Email *</label>
            <input type="email" name="email" class="ig-inp" required placeholder="your@email.com">
          </div>
          <div>
            <label class="ig-lbl">Phone *</label>
            <input type="tel" name="phone" class="ig-inp" required placeholder="+91 XXXXX XXXXX">
          </div>
        </div>
        <div>
          <label class="ig-lbl">Project Type *</label>
          <select name="project_type" class="ig-inp" required>
            <option value="">Select project type</option>
            <option>New Hotel Pre-Opening</option>
            <option>Hotel Renovation / Refurbishment</option>
            <option>Restaurant / F&B Outlet</option>
            <option>Ongoing Supply Contract</option>
            <option>One-Time Procurement</option>
          </select>
        </div>
        <div>
          <label class="ig-lbl">Categories Required *</label>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-top:.5rem;">
            ${['Kitchen Equipment','FF&E','OS&E / Amenities','Linen & Tableware','Uniforms','Technology & AV'].map(cat => `
            <label style="display:flex;align-items:center;gap:.5rem;font-size:.78rem;color:rgba(255,255,255,.5);cursor:pointer;">
              <input type="checkbox" name="categories" value="${cat}" style="accent-color:var(--gold);"> ${cat}
            </label>
            `).join('')}
          </div>
        </div>
        <div>
          <label class="ig-lbl">Procurement Budget (approx.)</label>
          <select name="budget" class="ig-inp">
            <option value="">Select range</option>
            <option>Under ₹25 Lakhs</option>
            <option>₹25L – ₹1 Crore</option>
            <option>₹1 Cr – ₹5 Crore</option>
            <option>₹5 Cr – ₹25 Crore</option>
            <option>₹25 Crore+</option>
          </select>
        </div>
        <div>
          <label class="ig-lbl">Project Details &amp; Requirements</label>
          <textarea name="details" class="ig-inp" placeholder="Describe your project, timeline and specific requirements…"></textarea>
        </div>
        <button type="submit" class="btn btn-g" style="width:100%;justify-content:center;">
          <i class="fas fa-paper-plane" style="margin-right:.5rem;"></i>Send Procurement Enquiry
        </button>
        <p style="font-size:.7rem;color:rgba(255,255,255,.25);text-align:center;">We respond within 48 business hours. All enquiries are strictly confidential.</p>
      </form>
    </div>
  </div>
</div>

`
  return c.html(layout('HORECA Solutions', content, {
    description: "India Gully HORECA Solutions — end-to-end FF&E, OS&E, kitchen equipment, linen, uniforms and guest amenity procurement for hotels and F&B operators across India."
  }))
})

export default app
