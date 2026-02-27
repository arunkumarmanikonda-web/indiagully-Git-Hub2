import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

const CATEGORIES = [
  { icon: '🍳', name: 'Kitchen Equipment',    desc: 'Commercial cooking ranges, ovens, fryers, refrigeration, dishwashers, ventilation hoods and cold storage units from leading global brands.' },
  { icon: '🛏️', name: 'FF&E — Furniture',     desc: 'Beds, sofas, chairs, tables, wardrobes, mirrors and all room furniture. Specified to brand standards and sourced to budget.' },
  { icon: '🧴', name: 'OS&E — Supplies',      desc: 'Operating supplies and equipment — cutlery, crockery, glassware, small appliances, cleaning equipment and back-of-house consumables.' },
  { icon: '🍽️', name: 'Linen & Tableware',    desc: 'Bed linen, bath towels, napkins, tablecloths and F&B tableware. Custom monogramming and brand colour matching available.' },
  { icon: '👔', name: 'Staff Uniforms',        desc: 'Front desk, F&B, housekeeping, security and management uniforms. Design, fabric selection, tailoring and volume procurement.' },
  { icon: '🌸', name: 'Guest Amenities',       desc: 'In-room toiletries, welcome kits, branded stationery, minibar items and guest experience accessories — curated to property positioning.' },
  { icon: '💻', name: 'Technology & AV',       desc: 'Smart room systems, in-room entertainment, property management system integration, AV for conferencing and back-of-house IT infrastructure.' },
  { icon: '📦', name: 'Turnkey Supply',        desc: 'End-to-end procurement management from specification, vendor identification and price negotiation through to delivery, installation and snagging.' },
]

const STEPS = [
  { n: '01', title: 'Requirements Brief',  desc: 'Submit your property details, category requirements, brand standards and budget envelope via the HORECA enquiry form.' },
  { n: '02', title: 'Specification & Quote', desc: 'Our team prepares detailed specifications, vendor shortlists and a GST-inclusive quote within 5 business days.' },
  { n: '03', title: 'Approval & PO',       desc: 'You review, approve and sign off. Purchase orders are raised with approved vendors under India Gully\'s procurement framework.' },
  { n: '04', title: 'Delivery & Handover', desc: 'Goods are delivered, installed and snagged against specifications. Completion certificate issued upon sign-off.' },
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
        <h1 class="h1" style="margin-bottom:1.5rem;">Complete Supply<br>Chain for<br><em style="color:var(--gold);font-style:italic;">Hotels & F&B</em></h1>
        <p class="lead-lt" style="max-width:500px;margin-bottom:2rem;">Kitchen equipment, FF&E, OS&E, linens, uniforms and guest amenities — procured to spec, delivered on schedule for hotels and F&B operators across India.</p>
        <div style="display:flex;gap:.875rem;flex-wrap:wrap;">
          <a href="#enquiry" class="btn btn-g">Request a Quote</a>
          <a href="#categories" class="btn btn-ghost">View Categories</a>
        </div>
      </div>
      <div class="fu2" style="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(255,255,255,.07);">
        ${[
          { n:'500+', l:'SKUs in Catalogue' },
          { n:'₹50 Cr+', l:'Procurement Managed' },
          { n:'50+', l:'Vendor Network' },
          { n:'15+', l:'Hotels Supplied' },
        ].map(s => `
        <div style="padding:2rem 1.5rem;background:rgba(255,255,255,.03);text-align:center;">
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2.25rem;color:var(--gold);line-height:1;margin-bottom:.4rem;">${s.n}</div>
          <div style="font-size:.68rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.3);">${s.l}</div>
        </div>
        `).join('')}
      </div>
    </div>
  </div>
</div>

<!-- SUPPLY CATEGORIES -->
<div class="sec-wh" id="categories">
  <div class="wrap">
    <div style="text-align:center;max-width:580px;margin:0 auto 3.5rem;">
      <div class="gr-c"></div>
      <p class="eyebrow" style="margin-bottom:.75rem;">Supply Categories</p>
      <h2 class="h2">Everything a Hotel Needs,<br>Sourced in One Place</h2>
    </div>

    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;">
      ${CATEGORIES.map(cat => `
      <div class="card card-lift" style="padding:1.75rem;">
        <span style="font-size:2rem;display:block;margin-bottom:1rem;">${cat.icon}</span>
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.05rem;color:var(--ink);margin-bottom:.6rem;">${cat.name}</h3>
        <p class="body" style="font-size:.8rem;">${cat.desc}</p>
      </div>
      `).join('')}
    </div>
  </div>
</div>

<!-- PROCUREMENT PROCESS -->
<div class="sec-pd">
  <div class="wrap">
    <div style="text-align:center;max-width:560px;margin:0 auto 3.5rem;">
      <div class="gr-c"></div>
      <p class="eyebrow" style="margin-bottom:.75rem;">How It Works</p>
      <h2 class="h2">4-Step Procurement<br>Process</h2>
    </div>

    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0;position:relative;">
      <div style="position:absolute;top:2.25rem;left:12.5%;right:12.5%;height:1px;background:var(--border);z-index:0;"></div>
      ${STEPS.map(step => `
      <div style="padding:0 1.5rem;text-align:center;position:relative;z-index:1;">
        <div style="width:46px;height:46px;background:var(--gold);display:flex;align-items:center;justify-content:center;margin:0 auto 1.25rem;font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:#fff;font-weight:700;">
          ${step.n}
        </div>
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.05rem;color:var(--ink);margin-bottom:.625rem;">${step.title}</h3>
        <p class="body" style="font-size:.8rem;">${step.desc}</p>
      </div>
      `).join('')}
    </div>
  </div>
</div>

<!-- BRANDS WE SUPPLY -->
<div class="sec-wh">
  <div class="wrap">
    <div style="text-align:center;max-width:560px;margin:0 auto 3rem;">
      <div class="gr-c"></div>
      <p class="eyebrow" style="margin-bottom:.75rem;">Properties We've Supplied</p>
      <h2 class="h2">Trusted by Leading<br>Hotel Groups</h2>
    </div>
    <div style="display:grid;grid-template-columns:repeat(6,1fr);gap:1px;background:var(--border);">
      ${['Marriott','Radisson','Cygnett Hotels','Regenta / Royal Orchid','IHG Hotels','Park Inn','Bijolai Palace','Lemon Tree','Park Inn by Radisson','Taj Hotels','Villa Hotel, Corbett','100-Room Hotel, Hosur'].map(b => `
      <div style="background:#fff;padding:1.25rem 1rem;text-align:center;transition:background .2s;" onmouseover="this.style.background='var(--gold-pale)'" onmouseout="this.style.background='#fff'">
        <div style="font-size:.7rem;font-weight:600;letter-spacing:.05em;text-transform:uppercase;color:var(--ink-muted);line-height:1.4;">${b}</div>
      </div>
      `).join('')}
    </div>
  </div>
</div>

<!-- ENQUIRY FORM -->
<div class="sec-pd" id="enquiry">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:5fr 4fr;gap:4rem;align-items:start;">
      <div>
        <div class="gr"></div>
        <p class="eyebrow" style="margin-bottom:.75rem;">Get a Quote</p>
        <h2 class="h2" style="margin-bottom:1.25rem;">HORECA Supply<br>Enquiry</h2>
        <p class="lead" style="margin-bottom:2.5rem;">Fill in the form and our HORECA team will respond with a detailed specification and quote within 5 business days.</p>

        <form class="ig-form" method="POST" action="/api/horeca-enquiry" style="display:flex;flex-direction:column;gap:1.25rem;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;">
            <div>
              <label class="ig-lbl">Full Name *</label>
              <input type="text" name="name" class="ig-inp" required placeholder="Your full name">
            </div>
            <div>
              <label class="ig-lbl">Company / Property *</label>
              <input type="text" name="company" class="ig-inp" required placeholder="Hotel or company name">
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;">
            <div>
              <label class="ig-lbl">Email Address *</label>
              <input type="email" name="email" class="ig-inp" required placeholder="your@email.com">
            </div>
            <div>
              <label class="ig-lbl">Phone Number</label>
              <input type="tel" name="phone" class="ig-inp" placeholder="+91 XXXXX XXXXX">
            </div>
          </div>
          <div>
            <label class="ig-lbl">Property Location *</label>
            <input type="text" name="location" class="ig-inp" required placeholder="City, State">
          </div>
          <div>
            <label class="ig-lbl">Supply Categories Required *</label>
            <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:.5rem;margin-top:.35rem;">
              ${['Kitchen Equipment','FF&E — Furniture','OS&E — Supplies','Linen & Tableware','Staff Uniforms','Guest Amenities','Technology & AV','Turnkey (All Categories)'].map(cat => `
              <label style="display:flex;align-items:center;gap:.5rem;font-size:.8rem;color:var(--ink-soft);cursor:pointer;">
                <input type="checkbox" name="categories" value="${cat}" style="accent-color:var(--gold);">${cat}
              </label>
              `).join('')}
            </div>
          </div>
          <div>
            <label class="ig-lbl">Budget Envelope (INR)</label>
            <select name="budget" class="ig-inp">
              <option value="">Select range</option>
              <option>Below ₹25 Lakhs</option>
              <option>₹25L – ₹1 Crore</option>
              <option>₹1 Cr – ₹5 Crore</option>
              <option>₹5 Cr – ₹25 Crore</option>
              <option>Above ₹25 Crore</option>
            </select>
          </div>
          <div>
            <label class="ig-lbl">Additional Requirements</label>
            <textarea name="message" class="ig-inp" placeholder="Describe your requirements, timeline, brand standards or any specific product preferences…"></textarea>
          </div>
          <button type="submit" class="btn btn-g" style="width:100%;justify-content:center;padding:1rem;">
            <i class="fas fa-paper-plane" style="margin-right:.5rem;"></i>Submit HORECA Enquiry
          </button>
        </form>
      </div>

      <!-- Info Panel -->
      <div style="display:flex;flex-direction:column;gap:1.25rem;">
        <div style="background:var(--ink);padding:2rem;">
          <p class="eyebrow-lt" style="margin-bottom:1.25rem;">Why India Gully HORECA?</p>
          <ul style="list-style:none;display:flex;flex-direction:column;gap:.875rem;">
            ${[
              'Single point of accountability from specification to delivery',
              'Vetted vendor network with proven quality track record',
              'GST-compliant invoicing and documentation',
              'Brand-standard specification writing included',
              'Bulk procurement pricing passed to clients',
              'Ongoing supply contracts for consumables and uniforms',
            ].map(pt => `
            <li style="display:flex;gap:.75rem;align-items:flex-start;">
              <i class="fas fa-check" style="color:var(--gold);font-size:.65rem;margin-top:.25rem;flex-shrink:0;"></i>
              <span style="font-size:.8rem;color:rgba(255,255,255,.5);">${pt}</span>
            </li>
            `).join('')}
          </ul>
        </div>
        <div style="border:1px solid var(--border);padding:1.5rem;">
          <p style="font-size:.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.875rem;">Direct Contact</p>
          <div style="display:flex;flex-direction:column;gap:.6rem;">
            <a href="tel:+919810889134" style="display:flex;align-items:center;gap:.6rem;font-size:.8rem;color:var(--ink-soft);transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-soft)'"><i class="fas fa-phone" style="color:var(--gold);width:14px;font-size:.65rem;"></i>+91 98108 89134</a>
            <a href="mailto:info@indiagully.com" style="display:flex;align-items:center;gap:.6rem;font-size:.8rem;color:var(--ink-soft);transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-soft)'"><i class="fas fa-envelope" style="color:var(--gold);width:14px;font-size:.65rem;"></i>info@indiagully.com</a>
          </div>
        </div>
        <div style="background:var(--gold-pale);border:1px solid rgba(184,150,12,.2);padding:1.25rem;">
          <p style="font-size:.72rem;color:var(--ink-muted);line-height:1.7;"><i class="fas fa-info-circle" style="color:var(--gold);margin-right:.4rem;"></i>All HORECA supplies are GST-compliant. Invoices issued under Vivacious Entertainment and Hospitality Pvt. Ltd. with full GSTIN documentation.</p>
        </div>
      </div>
    </div>
  </div>
</div>

`
  return c.html(layout('HORECA Solutions', content, {
    description: 'India Gully HORECA Solutions — kitchen equipment, FF&E, OS&E, linens, uniforms and guest amenities for hotels and F&B operators across India.'
  }))
})

export default app
