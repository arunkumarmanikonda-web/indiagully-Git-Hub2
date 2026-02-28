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
            <a href="tel:+918988988988" style="display:flex;align-items:center;gap:.6rem;font-size:.8rem;color:var(--ink-soft);transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-soft)'"><i class="fas fa-phone" style="color:var(--gold);width:14px;font-size:.65rem;"></i>+91 8988 988 988</a>
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

// ── HORECA CUSTOMER PORTAL ────────────────────────────────────────────────────
app.get('/portal', (c) => {
  const categories = [
    {cat:'Kitchen Equipment', icon:'utensils',       color:'#0d9488', skus:24, inStock:21},
    {cat:'Crockery & Cutlery',icon:'concierge-bell', color:'#2563eb', skus:56, inStock:52},
    {cat:'Linen & Fabrics',   icon:'bed',            color:'#7c3aed', skus:18, inStock:15},
    {cat:'Front Office',      icon:'bell',           color:'#d97706', skus:12, inStock:12},
    {cat:'Housekeeping',      icon:'broom',          color:'#16a34a', skus:31, inStock:28},
    {cat:'Food & Beverage',   icon:'wine-glass-alt', color:'#dc2626', skus:45, inStock:40},
    {cat:'Maintenance',       icon:'tools',          color:'#475569', skus:19, inStock:17},
    {cat:'Technology',        icon:'desktop',        color:'#9f1239', skus:8,  inStock:8},
  ]
  const products = [
    {id:'SKU-KE-001',cat:'Kitchen Equipment',name:'Commercial Induction Range — 4 Burner',brand:'Vollrath',unit:'Unit',price:185000,tier_price:148000,stock:5,moq:1},
    {id:'SKU-KE-002',cat:'Kitchen Equipment',name:'Blast Freezer — 10-tray',              brand:'Williams',unit:'Unit',price:320000,tier_price:256000,stock:2,moq:1},
    {id:'SKU-CC-001',cat:'Crockery & Cutlery',name:'Fine Dining Crockery Set — 12 pieces', brand:'Wedgwood',unit:'Set', price:12500, tier_price:10000, stock:80,moq:10},
    {id:'SKU-CC-002',cat:'Crockery & Cutlery',name:'Silver-plate Cutlery — 24 piece set',  brand:'Oneida',  unit:'Set', price:8500,  tier_price:6800,  stock:45,moq:5},
    {id:'SKU-LF-001',cat:'Linen & Fabrics',   name:'Hotel Cotton Bedsheet Set — King',     brand:'Trident', unit:'Set', price:4200,  tier_price:3360,  stock:200,moq:20},
    {id:'SKU-LF-002',cat:'Linen & Fabrics',   name:'Bath Towel Set — 6 pcs (600 GSM)',     brand:'Spaces',  unit:'Set', price:2800,  tier_price:2240,  stock:150,moq:10},
    {id:'SKU-FB-001',cat:'Food & Beverage',   name:'Commercial Espresso Machine — 2 Group',brand:'La Marzocco',unit:'Unit',price:580000,tier_price:464000,stock:3,moq:1},
    {id:'SKU-FB-002',cat:'Food & Beverage',   name:'Bar Blender — Commercial Grade',       brand:'Vitamix', unit:'Unit',price:45000, tier_price:36000, stock:10,moq:1},
  ]
  const body = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>India Gully HORECA — Customer Portal</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">
    <style>
      :root{--gold:#B8960C;--ink:#111111;--border:#E8E0D0;}
      body{font-family:'DM Sans',sans-serif;background:#f8f6f1;margin:0;}
      .ig-label{font-size:.68rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;color:#64748b;display:block;margin-bottom:.3rem;}
      .ig-input{width:100%;border:1px solid var(--border);padding:.5rem .75rem;font-size:.82rem;background:#fff;box-sizing:border-box;}
      .ig-input:focus{outline:none;border-color:var(--gold);}
      .badge{display:inline-flex;align-items:center;padding:.15rem .5rem;font-size:.65rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;border-radius:2px;}
    </style>
  </head>
  <body>
  <!-- Portal Header -->
  <div style="background:#1E1E1E;border-bottom:2px solid var(--gold);padding:.875rem 2rem;display:flex;align-items:center;justify-content:space-between;">
    <div style="display:flex;align-items:center;gap:1rem;">
      <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:#fff;">India Gully <span style="color:var(--gold);">HORECA</span></div>
      <span style="font-size:.62rem;background:var(--gold);color:#fff;padding:.15rem .5rem;font-weight:700;letter-spacing:.06em;">CUSTOMER PORTAL</span>
    </div>
    <div style="display:flex;align-items:center;gap:1.5rem;">
      <div style="font-size:.72rem;color:rgba(255,255,255,.7);">Welcome, <strong style="color:#fff;">Rajasthan Resort Group</strong> <span style="color:var(--gold);">Premium Tier</span></div>
      <button onclick="igToast('Cart opened','info')" style="background:var(--gold);color:#fff;border:none;padding:.45rem 1rem;font-size:.75rem;font-weight:600;cursor:pointer;position:relative;"><i class="fas fa-shopping-cart" style="margin-right:.35rem;"></i>Cart <span style="background:#dc2626;color:#fff;border-radius:50%;width:16px;height:16px;font-size:.58rem;display:inline-flex;align-items:center;justify-content:center;margin-left:.3rem;">3</span></button>
      <a href="/horeca" style="font-size:.68rem;color:rgba(255,255,255,.5);text-decoration:none;"><i class="fas fa-arrow-left" style="margin-right:.3rem;"></i>Back to Site</a>
    </div>
  </div>

  <div style="max-width:1280px;margin:0 auto;padding:2rem;">
    <!-- Portal Stats -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:2rem;">
      ${[
        {label:'Your Orders',    value:'8',      sub:'Total placed', c:'#B8960C', icon:'box'},
        {label:'Pending Delivery',value:'1',     sub:'1 order in transit', c:'#d97706', icon:'truck'},
        {label:'Account Credit',  value:'₹2.5L', sub:'Available for use', c:'#16a34a', icon:'wallet'},
        {label:'Your Discount',   value:'20%',   sub:'Premium tier rate', c:'#7c3aed', icon:'tag'},
      ].map(s=>`<div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.5rem;">
          <span style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#64748b;">${s.label}</span>
          <i class="fas fa-${s.icon}" style="color:${s.c};font-size:.75rem;"></i>
        </div>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:${s.c};line-height:1;margin-bottom:.2rem;">${s.value}</div>
        <div style="font-size:.65rem;color:#94a3b8;">${s.sub}</div>
      </div>`).join('')}
    </div>

    <!-- Catalogue & Order Section -->
    <div style="display:grid;grid-template-columns:220px 1fr;gap:1.5rem;">
      <!-- Category Sidebar -->
      <div style="background:#fff;border:1px solid var(--border);height:fit-content;">
        <div style="padding:.875rem 1rem;border-bottom:1px solid var(--border);font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:#64748b;">Browse Categories</div>
        ${['All Categories',...categories.map(c=>c.cat)].map((cat,i)=>`<div onclick="igHorcFilter('${cat}')" style="padding:.625rem 1rem;border-bottom:1px solid ${i===0?'var(--gold)':'var(--border)'};cursor:pointer;display:flex;justify-content:space-between;align-items:center;background:${i===0?'#fffbeb':'#fff'};" onmouseover="this.style.background='#fffbeb'" onmouseout="this.style.background='${i===0?'#fffbeb':'#fff'}'">
          <span style="font-size:.78rem;color:var(--ink);">${cat}</span>
          ${i>0?`<span style="font-size:.63rem;color:#94a3b8;">${categories[i-1].inStock}</span>`:`<span style="font-size:.63rem;color:#94a3b8;">${categories.reduce((a,c)=>a+c.inStock,0)}</span>`}
        </div>`).join('')}
      </div>

      <!-- Products Grid -->
      <div>
        <!-- Search -->
        <div style="display:flex;gap:.75rem;margin-bottom:1.25rem;">
          <div style="flex:1;position:relative;">
            <i class="fas fa-search" style="position:absolute;left:.75rem;top:50%;transform:translateY(-50%);color:#94a3b8;font-size:.72rem;"></i>
            <input type="text" class="ig-input" placeholder="Search products by name, SKU, brand..." style="padding-left:2.25rem;">
          </div>
          <select class="ig-input" style="max-width:160px;"><option>Sort: Featured</option><option>Price: Low-High</option><option>In Stock First</option></select>
        </div>

        <!-- Product Cards -->
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;" id="product-grid">
          ${products.map(p=>`<div style="background:#fff;border:1px solid var(--border);">
            <div style="padding:1rem;border-bottom:1px solid var(--border);">
              <div style="font-size:.6rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#94a3b8;margin-bottom:.25rem;">${p.id} · ${p.brand}</div>
              <div style="font-size:.85rem;font-weight:600;color:var(--ink);margin-bottom:.35rem;line-height:1.35;">${p.name}</div>
              <div style="display:flex;align-items:baseline;gap:.5rem;">
                <span style="font-family:'DM Serif Display',Georgia,serif;font-size:1.15rem;color:var(--gold);">₹${p.tier_price.toLocaleString('en-IN')}</span>
                <span style="font-size:.7rem;color:#94a3b8;text-decoration:line-through;">₹${p.price.toLocaleString('en-IN')}</span>
                <span style="font-size:.62rem;background:#f0fdf4;color:#16a34a;padding:1px 4px;font-weight:700;">20% off</span>
              </div>
              <div style="font-size:.65rem;color:#94a3b8;margin-top:.2rem;">Per ${p.unit} · MOQ: ${p.moq} ${p.unit}</div>
            </div>
            <div style="padding:.875rem;">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.625rem;">
                <span style="font-size:.72rem;color:${p.stock>5?'#16a34a':p.stock>0?'#d97706':'#dc2626'};font-weight:600;"><i class="fas fa-circle" style="font-size:.5rem;margin-right:.3rem;"></i>${p.stock>0?p.stock+' in stock':'Out of stock'}</span>
                <button onclick="igToast('Stock check for ${p.id}: ${p.stock} units available','info')" style="background:none;border:1px solid var(--border);padding:.2rem .5rem;font-size:.62rem;cursor:pointer;color:#64748b;"><i class="fas fa-sync" style="margin-right:.2rem;"></i>Check</button>
              </div>
              <div style="display:flex;gap:.5rem;">
                <input type="number" min="${p.moq}" value="${p.moq}" style="width:55px;border:1px solid var(--border);padding:.3rem .5rem;font-size:.78rem;text-align:center;">
                <button onclick="igAddToCart('${p.id}','${p.name.replace(/'/g,'')}')" style="flex:1;background:var(--gold);color:#fff;border:none;padding:.4rem;font-size:.72rem;font-weight:600;cursor:pointer;"><i class="fas fa-cart-plus" style="margin-right:.3rem;"></i>Add to Cart</button>
              </div>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>

  <script>
  function igToast(msg,type){
    var t=document.createElement('div');
    var bg=type==='success'?'#16a34a':type==='warn'?'#d97706':type==='info'?'#2563eb':'#dc2626';
    t.style.cssText='position:fixed;bottom:1.5rem;right:1.5rem;background:'+bg+';color:#fff;padding:.75rem 1.25rem;font-size:.78rem;font-weight:600;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,.2);';
    t.textContent=msg; document.body.appendChild(t);
    setTimeout(function(){t.remove();},3000);
  }
  var cartCount=3;
  function igAddToCart(sku,name){
    cartCount++;
    document.querySelector('.fas.fa-shopping-cart').nextElementSibling.nextElementSibling.textContent=cartCount;
    igToast(name+' added to cart','success');
  }
  function igHorcFilter(cat){
    igToast('Filtering: '+cat,'info');
  }
  </script>
  </body>
  </html>`
  return c.html(body)
})

export default app
