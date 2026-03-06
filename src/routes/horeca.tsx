import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

const STEPS = [
  { n: '01', title: 'Requirements Brief',    desc: 'Submit your property details, category requirements, brand standards and budget envelope via the HORECA enquiry form.' },
  { n: '02', title: 'Specification & Quote', desc: 'Our team prepares detailed specifications, vendor shortlists and a GST-inclusive quote within 5 business days.' },
  { n: '03', title: 'Approval & PO',         desc: 'You review, approve and sign off. Purchase orders are raised with approved vendors under India Gully\'s procurement framework.' },
  { n: '04', title: 'Delivery & Handover',   desc: 'Goods are delivered, installed and snagged against specifications. Completion certificate issued upon sign-off.' },
]

// ── Public HORECA home page ──────────────────────────────────────────────────
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
        <h1 class="h1" style="margin-bottom:1.5rem;">Complete Supply<br>Chain for<br><em style="color:var(--gold);font-style:italic;">Hotels &amp; F&amp;B</em></h1>
        <p class="lead-lt" style="max-width:500px;margin-bottom:2rem;">Kitchen equipment, FF&amp;E, OS&amp;E, linens, uniforms and guest amenities, procured to spec, delivered on schedule for hotels and F&amp;B operators across India.</p>
        <div style="display:flex;gap:.875rem;flex-wrap:wrap;">
          <a href="/horeca/catalogue" class="btn btn-g"><i class="fas fa-th-list" style="margin-right:.5rem;"></i>Browse Catalogue</a>
          <a href="#enquiry" class="btn btn-ghost">Request a Quote</a>
        </div>
      </div>
      <div class="fu2" style="display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(255,255,255,.07);">
        ${[
          { n:'500+',    l:'SKUs in Catalogue' },
          { n:'₹50 Cr+', l:'Procurement Managed' },
          { n:'50+',     l:'Vendor Network' },
          { n:'15+',     l:'Hotels Supplied' },
        ].map(s => `
        <div style="padding:2rem 1.5rem;background:rgba(255,255,255,.03);text-align:center;">
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2.25rem;color:var(--gold);line-height:1;margin-bottom:.4rem;">${s.n}</div>
          <div style="font-size:.68rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.65);">${s.l}</div>
        </div>
        `).join('')}
      </div>
    </div>
  </div>
</div>

<!-- CATALOGUE PREVIEW CTA -->
<div style="background:var(--gold-pale);border-top:3px solid var(--gold);border-bottom:3px solid var(--gold);padding:2rem 0;">
  <div class="wrap" style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1.5rem;">
    <div>
      <p style="font-size:.72rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--gold);margin-bottom:.35rem;">Product Catalogue — Live &amp; Downloadable</p>
      <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:var(--ink);margin:0;">Browse 500+ SKUs across 8 categories. Download full catalogue as CSV or PDF.</h3>
    </div>
    <div style="display:flex;gap:.875rem;flex-wrap:wrap;">
      <a href="/horeca/catalogue" style="background:var(--gold);color:#fff;text-decoration:none;padding:.65rem 1.5rem;font-size:.78rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;display:inline-flex;align-items:center;gap:.5rem;"><i class="fas fa-th-large"></i>View Full Catalogue</a>
      <a href="/horeca/catalogue/download-page" style="background:#fff;color:var(--ink);text-decoration:none;border:1px solid var(--border);padding:.65rem 1.5rem;font-size:.78rem;font-weight:600;display:inline-flex;align-items:center;gap:.5rem;"><i class="fas fa-download" style="color:var(--gold);"></i>Download Catalogue</a>
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
        <div style="width:46px;height:46px;background:var(--gold);display:flex;align-items:center;justify-content:center;margin:0 auto 1.25rem;font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:#fff;font-weight:700;">${step.n}</div>
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.05rem;color:var(--ink);margin-bottom:.625rem;">${step.title}</h3>
        <p class="body" style="font-size:.8rem;">${step.desc}</p>
      </div>
      `).join('')}
    </div>
  </div>
</div>

<!-- PROPERTIES SUPPLIED -->
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
            <div><label class="ig-lbl">Full Name *</label><input type="text" name="name" class="ig-inp" required placeholder="Your full name"></div>
            <div><label class="ig-lbl">Company / Property *</label><input type="text" name="company" class="ig-inp" required placeholder="Hotel or company name"></div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;">
            <div><label class="ig-lbl">Email Address *</label><input type="email" name="email" class="ig-inp" required placeholder="your@email.com"></div>
            <div><label class="ig-lbl">Phone Number</label><input type="tel" name="phone" class="ig-inp" placeholder="+91 XXXXX XXXXX"></div>
          </div>
          <div><label class="ig-lbl">Property Location *</label><input type="text" name="location" class="ig-inp" required placeholder="City, State"></div>
          <div>
            <label class="ig-lbl">Supply Categories Required *</label>
            <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:.5rem;margin-top:.35rem;">
              ${['Kitchen Equipment','FF&E: Furniture','OS&E: Supplies','Linen &amp; Tableware','Staff Uniforms','Guest Amenities','Technology &amp; AV','Turnkey (All Categories)'].map(cat => `
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
              <option>₹25L to ₹1 Crore</option>
              <option>₹1 Cr – ₹5 Crore</option>
              <option>₹5 Cr – ₹25 Crore</option>
              <option>Above ₹25 Crore</option>
            </select>
          </div>
          <div><label class="ig-lbl">Additional Requirements</label><textarea name="message" class="ig-inp" placeholder="Describe your requirements, timeline, brand standards or any specific product preferences…"></textarea></div>
          <button type="submit" class="btn btn-g" style="width:100%;justify-content:center;padding:1rem;"><i class="fas fa-paper-plane" style="margin-right:.5rem;"></i>Submit HORECA Enquiry</button>
        </form>
      </div>
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
            ].map(pt => `<li style="display:flex;gap:.75rem;align-items:flex-start;"><i class="fas fa-check" style="color:var(--gold);font-size:.65rem;margin-top:.25rem;flex-shrink:0;"></i><span style="font-size:.8rem;color:rgba(255,255,255,.5);">${pt}</span></li>`).join('')}
          </ul>
        </div>
        <div style="border:1px solid var(--border);padding:1.5rem;">
          <p style="font-size:.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.875rem;">Direct Contact</p>
          <p style="font-size:.8rem;font-weight:600;color:var(--ink);margin-bottom:.5rem;">Pavan Manikonda</p>
          <p style="font-size:.72rem;color:var(--ink-muted);margin-bottom:.75rem;">Executive Director, HORECA</p>
          <div style="display:flex;flex-direction:column;gap:.6rem;">
            <a href="tel:+916282556067" style="display:flex;align-items:center;gap:.6rem;font-size:.8rem;color:var(--ink-soft);transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-soft)'"><i class="fas fa-phone" style="color:var(--gold);width:14px;font-size:.65rem;"></i>+91 62825 56067</a>
            <a href="mailto:pavan@indiagully.com" style="display:flex;align-items:center;gap:.6rem;font-size:.8rem;color:var(--ink-soft);transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-soft)'"><i class="fas fa-envelope" style="color:var(--gold);width:14px;font-size:.65rem;"></i>pavan@indiagully.com</a>
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

// ── Public Catalogue Page ─────────────────────────────────────────────────────
app.get('/catalogue', (c) => {
  const content = `

<!-- CATALOGUE HERO -->
<div style="background:var(--ink);padding:4rem 0 3rem;position:relative;overflow:hidden;">
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.04) 1px,transparent 1px);background-size:48px 48px;"></div>
  <div class="wrap" style="position:relative;">
    <p style="font-size:.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(184,150,12,.8);margin-bottom:.75rem;">
      <a href="/horeca" style="color:inherit;text-decoration:none;">HORECA Solutions</a> <span style="color:rgba(255,255,255,.3);margin:0 .4rem;">/</span> Product Catalogue
    </p>
    <div style="display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:1.5rem;">
      <div>
        <h1 style="font-family:'DM Serif Display',Georgia,serif;font-size:2.5rem;color:#fff;margin:0 0 .75rem;">HORECA Product Catalogue</h1>
        <p style="font-size:.875rem;color:rgba(255,255,255,.6);max-width:560px;margin:0;">
          Browse our complete catalogue of hotel &amp; restaurant supplies — kitchen equipment, crockery, linen, bar supplies, housekeeping, furniture, technology and safety.
        </p>
      </div>
      <div style="display:flex;gap:.75rem;flex-wrap:wrap;">
        <button onclick="igCatDownloadCSV()" style="background:var(--gold);color:#fff;border:none;padding:.65rem 1.25rem;font-size:.78rem;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:.5rem;letter-spacing:.04em;">
          <i class="fas fa-file-csv"></i>Download CSV
        </button>
        <button onclick="igCatDownloadPDF()" style="background:#fff;color:var(--ink);border:none;padding:.65rem 1.25rem;font-size:.78rem;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:.5rem;">
          <i class="fas fa-file-pdf" style="color:#dc2626;"></i>Download PDF
        </button>
        <a href="/horeca#enquiry" style="background:none;color:rgba(255,255,255,.7);border:1px solid rgba(255,255,255,.2);padding:.65rem 1.25rem;font-size:.78rem;font-weight:600;text-decoration:none;display:inline-flex;align-items:center;gap:.5rem;">
          <i class="fas fa-paper-plane"></i>Request Quote
        </a>
      </div>
    </div>
  </div>
</div>

<!-- STATS BAR -->
<div style="background:#fff;border-bottom:1px solid var(--border);padding:.875rem 0;">
  <div class="wrap">
    <div style="display:flex;align-items:center;gap:2.5rem;flex-wrap:wrap;" id="cat-stats-bar">
      <div style="display:flex;align-items:center;gap:.5rem;">
        <span style="font-size:.68rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-muted);">Total Products:</span>
        <span id="stat-total" style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--gold);">—</span>
      </div>
      <div style="display:flex;align-items:center;gap:.5rem;">
        <span style="font-size:.68rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-muted);">Categories:</span>
        <span id="stat-cats" style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--gold);">—</span>
      </div>
      <div style="display:flex;align-items:center;gap:.5rem;">
        <span style="font-size:.68rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-muted);">Featured:</span>
        <span id="stat-featured" style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--gold);">—</span>
      </div>
      <div style="margin-left:auto;font-size:.7rem;color:var(--ink-muted);">
        <i class="fas fa-circle" style="color:#16a34a;font-size:.45rem;margin-right:.3rem;"></i>Live catalogue — updated in real time
      </div>
    </div>
  </div>
</div>

<!-- FILTERS + CATALOGUE BODY -->
<div style="background:#f8f6f1;min-height:60vh;padding:2rem 0;">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:220px 1fr;gap:2rem;align-items:start;">

      <!-- SIDEBAR -->
      <div style="position:sticky;top:1.5rem;">
        <!-- Search -->
        <div style="background:#fff;border:1px solid var(--border);padding:1rem;margin-bottom:1rem;">
          <label style="font-size:.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);display:block;margin-bottom:.5rem;">Search Products</label>
          <div style="position:relative;">
            <i class="fas fa-search" style="position:absolute;left:.6rem;top:50%;transform:translateY(-50%);color:#94a3b8;font-size:.7rem;"></i>
            <input type="text" id="cat-search" class="ig-inp" placeholder="SKU, name, brand…" style="padding-left:1.75rem;font-size:.82rem;" oninput="igCatFilter()">
          </div>
        </div>

        <!-- Categories -->
        <div style="background:#fff;border:1px solid var(--border);">
          <div style="padding:.75rem 1rem;border-bottom:1px solid var(--border);font-size:.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);">Categories</div>
          <div id="cat-sidebar" style="padding:.25rem 0;">
            <div style="padding:.5rem 1rem;display:flex;justify-content:space-between;align-items:center;cursor:pointer;background:#fffbeb;border-left:3px solid var(--gold);" onclick="igCatSelectCategory('')" id="cat-btn-all">
              <span style="font-size:.8rem;font-weight:600;color:var(--ink);">All Categories</span>
              <span id="cat-count-all" style="font-size:.65rem;color:var(--gold);font-weight:700;">—</span>
            </div>
          </div>
        </div>

        <!-- Featured Filter -->
        <div style="background:#fff;border:1px solid var(--border);margin-top:1rem;padding:1rem;">
          <label style="display:flex;align-items:center;gap:.5rem;cursor:pointer;font-size:.8rem;color:var(--ink);">
            <input type="checkbox" id="cat-featured-only" onchange="igCatFilter()" style="accent-color:var(--gold);">
            <i class="fas fa-star" style="color:var(--gold);font-size:.7rem;"></i>
            Featured Products Only
          </label>
        </div>

        <!-- GST Filter -->
        <div style="background:#fff;border:1px solid var(--border);margin-top:1rem;padding:1rem;">
          <label style="font-size:.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);display:block;margin-bottom:.5rem;">GST Rate</label>
          <select id="cat-gst-filter" class="ig-inp" style="font-size:.78rem;" onchange="igCatFilter()">
            <option value="">All GST Rates</option>
            <option value="5">5%</option>
            <option value="12">12%</option>
            <option value="18">18%</option>
            <option value="28">28%</option>
          </select>
        </div>

        <!-- Download Box -->
        <div style="background:var(--gold-pale);border:1px solid rgba(184,150,12,.3);margin-top:1rem;padding:1rem;">
          <p style="font-size:.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);margin-bottom:.625rem;">Download Catalogue</p>
          <div style="display:flex;flex-direction:column;gap:.5rem;">
            <button onclick="igCatDownloadCSV()" style="background:var(--gold);color:#fff;border:none;padding:.5rem;font-size:.72rem;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:.4rem;">
              <i class="fas fa-file-csv"></i>Full Catalogue CSV
            </button>
            <button onclick="igCatDownloadPDF()" style="background:#fff;color:var(--ink);border:1px solid var(--border);padding:.5rem;font-size:.72rem;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:.4rem;">
              <i class="fas fa-file-pdf" style="color:#dc2626;"></i>Full Catalogue PDF
            </button>
            <button onclick="igCatDownloadFiltered()" style="background:#fff;color:var(--ink);border:1px solid var(--border);padding:.5rem;font-size:.72rem;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:.4rem;" id="btn-dl-filtered" style="display:none;">
              <i class="fas fa-filter" style="color:#2563eb;"></i>Download Filtered CSV
            </button>
          </div>
          <p style="font-size:.62rem;color:var(--ink-muted);margin-top:.5rem;line-height:1.5;">Includes SKU, name, category, price, GST, HSN, brand &amp; description.</p>
        </div>
      </div>

      <!-- PRODUCT GRID -->
      <div>
        <!-- Toolbar -->
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.75rem;margin-bottom:1.25rem;">
          <div>
            <span id="cat-result-count" style="font-size:.8rem;color:var(--ink-muted);">Loading products…</span>
            <span id="cat-active-filter" style="font-size:.72rem;color:var(--gold);margin-left:.5rem;font-weight:600;"></span>
          </div>
          <div style="display:flex;align-items:center;gap:.75rem;">
            <select id="cat-sort" class="ig-inp" style="font-size:.78rem;max-width:160px;" onchange="igCatFilter()">
              <option value="default">Sort: Default</option>
              <option value="name">Name A–Z</option>
              <option value="price_asc">Price: Low–High</option>
              <option value="price_desc">Price: High–Low</option>
              <option value="stock_asc">Stock: Low First</option>
              <option value="featured">Featured First</option>
            </select>
            <button onclick="igCatToggleView('grid')" id="btn-view-grid" style="background:var(--gold);color:#fff;border:none;padding:.4rem .6rem;cursor:pointer;" title="Grid view">
              <i class="fas fa-th-large" style="font-size:.75rem;"></i>
            </button>
            <button onclick="igCatToggleView('table')" id="btn-view-table" style="background:#fff;color:var(--ink);border:1px solid var(--border);padding:.4rem .6rem;cursor:pointer;" title="Table view">
              <i class="fas fa-list" style="font-size:.75rem;"></i>
            </button>
          </div>
        </div>

        <!-- Loading Spinner -->
        <div id="cat-loading" style="display:block;text-align:center;padding:4rem;color:var(--ink-muted);">
          <i class="fas fa-spinner fa-spin" style="font-size:2rem;color:var(--gold);"></i>
          <p style="margin-top:1rem;font-size:.85rem;">Loading catalogue…</p>
        </div>

        <!-- Grid View -->
        <div id="cat-grid-view" style="display:none;grid-template-columns:repeat(3,1fr);gap:1.25rem;"></div>

        <!-- Table View (hidden by default) -->
        <div id="cat-table-view" style="display:none;">
          <div style="background:#fff;border:1px solid var(--border);overflow-x:auto;">
            <table style="width:100%;border-collapse:collapse;font-size:.78rem;">
              <thead>
                <tr style="background:#f8f6f1;border-bottom:2px solid var(--border);">
                  <th style="padding:.625rem 1rem;text-align:left;font-size:.65rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-muted);">SKU</th>
                  <th style="padding:.625rem 1rem;text-align:left;font-size:.65rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-muted);">Product</th>
                  <th style="padding:.625rem 1rem;text-align:left;font-size:.65rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-muted);">Category</th>
                  <th style="padding:.625rem 1rem;text-align:left;font-size:.65rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-muted);">Unit</th>
                  <th style="padding:.625rem .75rem;text-align:right;font-size:.65rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-muted);">Price ₹</th>
                  <th style="padding:.625rem .75rem;text-align:right;font-size:.65rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-muted);">GST</th>
                  <th style="padding:.625rem .75rem;text-align:left;font-size:.65rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-muted);">HSN</th>
                  <th style="padding:.625rem .75rem;text-align:left;font-size:.65rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-muted);">Brand</th>
                  <th style="padding:.625rem .75rem;text-align:center;font-size:.65rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-muted);">Stock</th>
                </tr>
              </thead>
              <tbody id="cat-table-tbody" style=""></tbody>
            </table>
          </div>
        </div>

        <!-- Empty State -->
        <div id="cat-empty" style="display:none;text-align:center;padding:4rem;background:#fff;border:1px solid var(--border);">
          <i class="fas fa-box-open" style="font-size:2.5rem;color:var(--border);"></i>
          <p style="margin-top:1rem;font-size:.875rem;color:var(--ink-muted);">No products found matching your filters.</p>
          <button onclick="igCatClearFilters()" style="margin-top:.75rem;background:none;border:1px solid var(--border);padding:.5rem 1rem;font-size:.78rem;cursor:pointer;color:var(--gold);">Clear Filters</button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ENQUIRY CTA -->
<div style="background:var(--ink);padding:4rem 0;">
  <div class="wrap" style="text-align:center;">
    <p style="font-size:.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(184,150,12,.8);margin-bottom:.75rem;">Ready to Order?</p>
    <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:2rem;color:#fff;margin:0 0 1rem;">Get a Custom Quote for Your Property</h2>
    <p style="font-size:.875rem;color:rgba(255,255,255,.55);margin:0 auto 2rem;max-width:480px;">Our team will prepare a detailed specification and GST-inclusive quote within 5 business days.</p>
    <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
      <a href="/horeca#enquiry" class="btn btn-g"><i class="fas fa-paper-plane" style="margin-right:.4rem;"></i>Submit HORECA Enquiry</a>
      <a href="tel:+916282556067" style="background:none;color:rgba(255,255,255,.7);border:1px solid rgba(255,255,255,.2);padding:.65rem 1.5rem;font-size:.78rem;font-weight:600;text-decoration:none;display:inline-flex;align-items:center;gap:.5rem;"><i class="fas fa-phone"></i>+91 62825 56067</a>
    </div>
  </div>
</div>

<style>
  .prod-card { background:#fff; border:1px solid var(--border); transition:box-shadow .2s,transform .2s; }
  .prod-card:hover { box-shadow:0 8px 24px rgba(0,0,0,.09); transform:translateY(-2px); }
  .cat-badge { display:inline-flex; align-items:center; padding:.15rem .5rem; font-size:.62rem; font-weight:700; letter-spacing:.04em; text-transform:uppercase; border-radius:2px; }
  .cat-sidebar-btn { padding:.5rem 1rem; display:flex; justify-content:space-between; align-items:center; cursor:pointer; border-left:3px solid transparent; transition:background .15s; }
  .cat-sidebar-btn:hover { background:#fffbeb; }
  .cat-sidebar-btn.active { background:#fffbeb; border-left-color:var(--gold); }
</style>

<script>
// ── Catalogue Page State ──────────────────────────────────────────────────────
var _igCatProducts = [];
var _igCatCategories = [];
var _igCatView = 'grid';
var _igCatActiveCategory = '';
var _igCatFilterTimer = null;

// ── Fetch catalogue from API ──────────────────────────────────────────────────
function igCatLoad() {
  fetch('/api/horeca/catalogue', { credentials: 'include' })
    .then(function(r) { return r.ok ? r.json() : Promise.reject(r.status); })
    .then(function(d) {
      _igCatProducts = (d.products || []);
      _igCatCategories = (d.categories || []);
      var stats = d.stats || {};
      document.getElementById('stat-total').textContent = stats.total_products || _igCatProducts.length;
      document.getElementById('stat-cats').textContent = stats.total_categories || _igCatCategories.length;
      document.getElementById('stat-featured').textContent = stats.featured_count || 0;
      document.getElementById('cat-count-all').textContent = _igCatProducts.length;
      igCatBuildSidebar();
      document.getElementById('cat-loading').style.display = 'none';
      document.getElementById('cat-grid-view').style.display = 'grid';
      igCatFilter();
    })
    .catch(function(err) {
      // Fallback to public endpoint without session
      fetch('/api/horeca/catalogue')
        .then(function(r) { return r.json(); })
        .then(function(d) {
          _igCatProducts = (d.products || []);
          _igCatCategories = (d.categories || []);
          document.getElementById('cat-loading').style.display = 'none';
          document.getElementById('cat-grid-view').style.display = 'grid';
          document.getElementById('stat-total').textContent = _igCatProducts.length;
          document.getElementById('stat-cats').textContent = _igCatCategories.length;
          document.getElementById('stat-featured').textContent = _igCatProducts.filter(function(p){ return p.featured; }).length;
          document.getElementById('cat-count-all').textContent = _igCatProducts.length;
          igCatBuildSidebar();
          igCatFilter();
        })
        .catch(function() {
          document.getElementById('cat-loading').innerHTML = '<i class="fas fa-exclamation-triangle" style="color:#dc2626;font-size:1.5rem;"></i><p style="margin-top:.75rem;font-size:.85rem;color:#dc2626;">Unable to load catalogue. Please try refreshing the page.</p>';
        });
    });
}

function igCatBuildSidebar() {
  var sb = document.getElementById('cat-sidebar');
  var html = '<div class="cat-sidebar-btn active" onclick="igCatSelectCategory(\\'\\')" id="cat-btn-all">'
    + '<span style="font-size:.8rem;font-weight:600;color:var(--ink);">All Categories</span>'
    + '<span id="cat-count-all" style="font-size:.65rem;color:var(--gold);font-weight:700;">' + _igCatProducts.length + '</span>'
    + '</div>';
  _igCatCategories.forEach(function(cat) {
    var count = _igCatProducts.filter(function(p){ return p.category === cat.name; }).length;
    var iconColor = cat.color || '#475569';
    html += '<div class="cat-sidebar-btn" onclick="igCatSelectCategory(\\'' + cat.name.replace(/'/g,"\\'") + '\\')" id="cat-btn-' + cat.id + '">'
      + '<span style="font-size:.78rem;color:var(--ink);display:flex;align-items:center;gap:.4rem;"><i class="fas fa-' + (cat.icon||'box') + '" style="color:' + iconColor + ';font-size:.7rem;width:14px;"></i>' + cat.name + '</span>'
      + '<span style="font-size:.65rem;color:#94a3b8;font-weight:600;">' + count + '</span>'
      + '</div>';
  });
  sb.innerHTML = html;
}

function igCatSelectCategory(cat) {
  _igCatActiveCategory = cat;
  // Update sidebar active states
  document.querySelectorAll('.cat-sidebar-btn').forEach(function(b){ b.classList.remove('active'); });
  var activeBtn = cat ? document.getElementById('cat-btn-' + (_igCatCategories.find(function(c){ return c.name === cat; })||{}).id) : document.getElementById('cat-btn-all');
  if (activeBtn) activeBtn.classList.add('active');
  igCatFilter();
}

function igCatClearFilters() {
  _igCatActiveCategory = '';
  document.getElementById('cat-search').value = '';
  document.getElementById('cat-featured-only').checked = false;
  document.getElementById('cat-gst-filter').value = '';
  document.getElementById('cat-sort').value = 'default';
  igCatBuildSidebar();
  igCatFilter();
}

function igCatFilter() {
  var search = (document.getElementById('cat-search').value || '').toLowerCase().trim();
  var featuredOnly = document.getElementById('cat-featured-only').checked;
  var gstFilter = document.getElementById('cat-gst-filter').value;
  var sort = document.getElementById('cat-sort').value;

  var filtered = _igCatProducts.filter(function(p) {
    if (_igCatActiveCategory && p.category !== _igCatActiveCategory) return false;
    if (featuredOnly && !p.featured) return false;
    if (gstFilter && String(p.gst_rate) !== gstFilter) return false;
    if (search) {
      var hay = (p.name + ' ' + p.sku + ' ' + (p.brand||'') + ' ' + (p.description||'')).toLowerCase();
      if (!hay.includes(search)) return false;
    }
    return true;
  });

  // Sort
  if (sort === 'name') filtered.sort(function(a,b){ return a.name.localeCompare(b.name); });
  else if (sort === 'price_asc') filtered.sort(function(a,b){ return a.price - b.price; });
  else if (sort === 'price_desc') filtered.sort(function(a,b){ return b.price - a.price; });
  else if (sort === 'stock_asc') filtered.sort(function(a,b){ return a.stock - b.stock; });
  else if (sort === 'featured') filtered.sort(function(a,b){ return (b.featured?1:0) - (a.featured?1:0); });

  // Update count
  var label = _igCatActiveCategory ? (' in <strong>' + _igCatActiveCategory + '</strong>') : '';
  document.getElementById('cat-result-count').innerHTML = '<strong>' + filtered.length + '</strong> product' + (filtered.length !== 1 ? 's' : '') + label;
  document.getElementById('cat-active-filter').textContent = search ? '— search: "' + search + '"' : '';

  // Show/hide download filtered button
  var btnFiltered = document.getElementById('btn-dl-filtered');
  if (btnFiltered) btnFiltered.style.display = (filtered.length < _igCatProducts.length && filtered.length > 0) ? 'flex' : 'none';

  if (filtered.length === 0) {
    document.getElementById('cat-grid-view').style.display = 'none';
    document.getElementById('cat-table-view').style.display = 'none';
    document.getElementById('cat-empty').style.display = 'block';
    return;
  }
  document.getElementById('cat-empty').style.display = 'none';

  if (_igCatView === 'grid') {
    document.getElementById('cat-grid-view').style.display = 'grid';
    document.getElementById('cat-table-view').style.display = 'none';
    igCatRenderGrid(filtered);
  } else {
    document.getElementById('cat-grid-view').style.display = 'none';
    document.getElementById('cat-table-view').style.display = 'block';
    igCatRenderTable(filtered);
  }
}

function igCatRenderGrid(products) {
  var html = '';
  products.forEach(function(p) {
    var lowStock = p.stock <= p.reorder && p.stock > 0;
    var outOfStock = p.stock === 0;
    var stockColor = outOfStock ? '#dc2626' : (lowStock ? '#d97706' : '#16a34a');
    var stockText = outOfStock ? 'Out of Stock' : (lowStock ? 'Low Stock — ' + p.stock + ' left' : 'In Stock — ' + p.stock);
    var catColor = (_igCatCategories.find(function(c){ return c.name === p.category; }) || {}).color || '#475569';
    html += '<div class="prod-card">'
      + (p.featured ? '<div style="background:var(--gold);color:#fff;font-size:.6rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:.25rem .75rem;">★ Featured</div>' : '')
      + '<div style="padding:1.25rem;">'
      + '<div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.5rem;">'
      + '<span style="font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#94a3b8;">' + p.sku + '</span>'
      + '<span class="cat-badge" style="background:' + catColor + '22;color:' + catColor + ';">' + (p.category||'').split(' ')[0] + '</span>'
      + '</div>'
      + '<h3 style="font-size:.9rem;font-weight:700;color:var(--ink);margin:0 0 .35rem;line-height:1.35;">' + p.name + '</h3>'
      + (p.brand ? '<p style="font-size:.7rem;color:#94a3b8;margin:0 0 .75rem;"><i class="fas fa-tag" style="margin-right:.3rem;"></i>' + p.brand + '</p>' : '<div style="margin-bottom:.75rem;"></div>')
      + (p.description ? '<p style="font-size:.75rem;color:var(--ink-muted);line-height:1.5;margin:0 0 .875rem;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">' + p.description + '</p>' : '')
      + '<div style="display:flex;align-items:baseline;justify-content:space-between;margin-bottom:.5rem;">'
      + '<div style="font-family:\'DM Serif Display\',Georgia,serif;font-size:1.3rem;color:var(--gold);">₹' + (p.price||0).toLocaleString('en-IN') + '</div>'
      + '<div style="font-size:.7rem;color:#94a3b8;">per ' + (p.unit||'Piece') + '</div>'
      + '</div>'
      + '<div style="display:flex;align-items:center;justify-content:space-between;padding:.5rem 0;border-top:1px solid var(--border);">'
      + '<span style="font-size:.7rem;color:' + stockColor + ';font-weight:600;"><i class="fas fa-circle" style="font-size:.4rem;margin-right:.3rem;"></i>' + stockText + '</span>'
      + '<span style="font-size:.65rem;color:#94a3b8;">GST ' + (p.gst_rate||18) + '%</span>'
      + '</div>'
      + '<div style="margin-top:.5rem;display:flex;gap:.5rem;">'
      + '<span style="font-size:.65rem;color:#94a3b8;background:#f8f6f1;padding:.2rem .5rem;">HSN: ' + (p.hsn||'—') + '</span>'
      + '</div>'
      + '</div>'
      + '<div style="padding:.75rem 1.25rem;border-top:1px solid var(--border);background:#f8f6f1;">'
      + '<a href="/horeca#enquiry" style="display:block;text-align:center;background:var(--gold);color:#fff;text-decoration:none;padding:.45rem;font-size:.72rem;font-weight:700;letter-spacing:.04em;" onclick="igCatEnquire(event,\\'' + p.sku + '\\',\\'' + p.name.replace(/'/g,"\\'") + '\\')">'
      + '<i class="fas fa-paper-plane" style="margin-right:.3rem;"></i>Request Quote</a>'
      + '</div>'
      + '</div>';
  });
  document.getElementById('cat-grid-view').innerHTML = html;
}

function igCatRenderTable(products) {
  var html = '';
  products.forEach(function(p) {
    var lowStock = p.stock <= p.reorder && p.stock > 0;
    var outOfStock = p.stock === 0;
    var stockColor = outOfStock ? '#dc2626' : (lowStock ? '#d97706' : '#16a34a');
    var catColor = (_igCatCategories.find(function(c){ return c.name === p.category; }) || {}).color || '#475569';
    html += '<tr style="border-bottom:1px solid var(--border);">'
      + '<td style="padding:.625rem 1rem;"><span style="font-size:.7rem;font-weight:700;font-family:monospace;color:#0d9488;">' + p.sku + '</span>' + (p.featured ? ' <i class="fas fa-star" style="color:var(--gold);font-size:.55rem;"></i>' : '') + '</td>'
      + '<td style="padding:.625rem 1rem;"><span style="font-size:.8rem;font-weight:600;color:var(--ink);">' + p.name + '</span>' + (p.brand ? '<br><span style="font-size:.65rem;color:#94a3b8;">' + p.brand + '</span>' : '') + '</td>'
      + '<td style="padding:.625rem 1rem;"><span class="cat-badge" style="background:' + catColor + '22;color:' + catColor + ';">' + (p.category||'') + '</span></td>'
      + '<td style="padding:.625rem 1rem;font-size:.75rem;color:var(--ink-muted);">' + (p.unit||'Piece') + '</td>'
      + '<td style="padding:.625rem .75rem;text-align:right;font-family:\'DM Serif Display\',Georgia,serif;font-size:.9rem;color:var(--gold);">₹' + (p.price||0).toLocaleString('en-IN') + '</td>'
      + '<td style="padding:.625rem .75rem;text-align:right;font-size:.75rem;color:var(--ink-muted);">' + (p.gst_rate||18) + '%</td>'
      + '<td style="padding:.625rem .75rem;font-size:.7rem;color:#94a3b8;font-family:monospace;">' + (p.hsn||'—') + '</td>'
      + '<td style="padding:.625rem .75rem;font-size:.75rem;color:var(--ink-muted);">' + (p.brand||'—') + '</td>'
      + '<td style="padding:.625rem .75rem;text-align:center;"><span style="font-size:.72rem;font-weight:700;color:' + stockColor + ';">' + (p.stock||0) + '</span></td>'
      + '</tr>';
  });
  document.getElementById('cat-table-tbody').innerHTML = html || '<tr><td colspan="9" style="padding:2rem;text-align:center;color:var(--ink-muted);">No products found</td></tr>';
}

function igCatToggleView(view) {
  _igCatView = view;
  document.getElementById('btn-view-grid').style.background = view === 'grid' ? 'var(--gold)' : '#fff';
  document.getElementById('btn-view-grid').style.color = view === 'grid' ? '#fff' : 'var(--ink)';
  document.getElementById('btn-view-table').style.background = view === 'table' ? 'var(--gold)' : '#fff';
  document.getElementById('btn-view-table').style.color = view === 'table' ? '#fff' : 'var(--ink)';
  igCatFilter();
}

// ── Download Functions ────────────────────────────────────────────────────────
function igSaveCsv(filename, csv) {
  var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  setTimeout(function(){ URL.revokeObjectURL(url); }, 1000);
}

function igBuildCsv(products) {
  var headers = ['SKU', 'Product Name', 'Category', 'Unit', 'Price (INR)', 'GST Rate (%)', 'HSN Code', 'Brand', 'Stock Qty', 'Reorder Level', 'Featured', 'Description'];
  var rows = products.map(function(p) {
    return [
      p.sku,
      '"' + (p.name||'').replace(/"/g,"'") + '"',
      '"' + (p.category||'').replace(/"/g,"'") + '"',
      p.unit || 'Piece',
      p.price || 0,
      p.gst_rate || 18,
      p.hsn || '',
      '"' + (p.brand||'').replace(/"/g,"'") + '"',
      p.stock || 0,
      p.reorder || 0,
      p.featured ? 'Yes' : 'No',
      '"' + (p.description||'').replace(/"/g,"'").substring(0, 200) + '"'
    ].join(',');
  });
  return [headers.join(',')].concat(rows).join('\\n');
}

function igCatDownloadCSV() {
  var products = _igCatProducts.filter(function(p){ return p.active !== false; });
  if (products.length === 0) {
    alert('No products loaded yet. Please wait for the catalogue to load.');
    return;
  }
  // Try server-side download first for best quality
  fetch('/api/horeca/catalogue/download?format=csv', { credentials: 'include' })
    .then(function(r) {
      if (!r.ok) throw new Error('server download failed');
      return r.blob();
    })
    .then(function(blob) {
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'india-gully-horeca-catalogue-' + new Date().toISOString().slice(0,10) + '.csv';
      a.click();
      URL.revokeObjectURL(url);
      igShowToast('Catalogue CSV downloaded — ' + products.length + ' products', 'success');
    })
    .catch(function() {
      // Fallback: build CSV client-side
      igSaveCsv('india-gully-horeca-catalogue-' + new Date().toISOString().slice(0,10) + '.csv', igBuildCsv(products));
      igShowToast('Catalogue CSV downloaded — ' + products.length + ' products', 'success');
    });
}

function igCatDownloadFiltered() {
  var search = (document.getElementById('cat-search').value || '').toLowerCase().trim();
  var featuredOnly = document.getElementById('cat-featured-only').checked;
  var gstFilter = document.getElementById('cat-gst-filter').value;
  var filtered = _igCatProducts.filter(function(p) {
    if (_igCatActiveCategory && p.category !== _igCatActiveCategory) return false;
    if (featuredOnly && !p.featured) return false;
    if (gstFilter && String(p.gst_rate) !== gstFilter) return false;
    if (search) { var hay = (p.name+' '+p.sku+' '+(p.brand||'')+(p.description||'')).toLowerCase(); if (!hay.includes(search)) return false; }
    return true;
  });
  if (filtered.length === 0) { igShowToast('No products match current filters', 'warn'); return; }
  var catSuffix = _igCatActiveCategory ? ('-' + _igCatActiveCategory.replace(/[^a-z0-9]/gi, '-').toLowerCase()) : '';
  igSaveCsv('india-gully-horeca' + catSuffix + '-' + new Date().toISOString().slice(0,10) + '.csv', igBuildCsv(filtered));
  igShowToast('Filtered CSV downloaded — ' + filtered.length + ' products', 'success');
}

function igCatDownloadPDF() {
  igShowToast('Preparing printable PDF catalogue…', 'info');
  // Build a print-friendly page in a new window
  var products = _igCatProducts.filter(function(p){ return p.active !== false; });
  if (_igCatActiveCategory) products = products.filter(function(p){ return p.category === _igCatActiveCategory; });
  if (products.length === 0) { igShowToast('No products to export', 'warn'); return; }

  var rows = products.map(function(p, i) {
    return '<tr style="background:' + (i%2===0?'#fff':'#f8f9fa') + ';page-break-inside:avoid;">'
      + '<td style="padding:5px 8px;font-family:monospace;font-size:9px;color:#0d9488;white-space:nowrap;">' + p.sku + '</td>'
      + '<td style="padding:5px 8px;font-size:10px;font-weight:600;max-width:200px;">' + p.name + '</td>'
      + '<td style="padding:5px 8px;font-size:9px;color:#475569;">' + p.category + '</td>'
      + '<td style="padding:5px 8px;font-size:9px;">' + (p.unit||'Piece') + '</td>'
      + '<td style="padding:5px 8px;font-size:10px;font-weight:700;color:#B8960C;text-align:right;">₹' + (p.price||0).toLocaleString('en-IN') + '</td>'
      + '<td style="padding:5px 8px;font-size:9px;text-align:center;">' + (p.gst_rate||18) + '%</td>'
      + '<td style="padding:5px 8px;font-size:9px;font-family:monospace;">' + (p.hsn||'—') + '</td>'
      + '<td style="padding:5px 8px;font-size:9px;color:#64748b;">' + (p.brand||'—') + '</td>'
      + '<td style="padding:5px 8px;font-size:10px;text-align:center;color:' + (p.stock===0?'#dc2626':p.stock<=p.reorder?'#d97706':'#16a34a') + ';font-weight:600;">' + (p.stock||0) + '</td>'
      + '</tr>';
  }).join('');

  var catTitle = _igCatActiveCategory ? (' — ' + _igCatActiveCategory) : '';
  var html = '<!DOCTYPE html><html><head><meta charset="UTF-8">'
    + '<title>India Gully HORECA Catalogue' + catTitle + '</title>'
    + '<style>'
    + '@page{margin:15mm;size:A4 landscape;}'
    + 'body{font-family:Arial,sans-serif;margin:0;color:#111;}'
    + 'table{width:100%;border-collapse:collapse;}'
    + 'th{background:#1E1E1E;color:#fff;padding:6px 8px;font-size:8px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;text-align:left;}'
    + 'tr{border-bottom:1px solid #e8e0d0;}'
    + '.header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;padding-bottom:8px;border-bottom:2px solid #B8960C;}'
    + '.logo{font-family:Georgia,serif;font-size:18px;font-weight:700;}'
    + '.logo span{color:#B8960C;}'
    + '.meta{font-size:9px;color:#64748b;text-align:right;}'
    + '</style>'
    + '</head><body>'
    + '<div class="header">'
    + '<div><div class="logo">India <span>Gully</span> HORECA</div><div style="font-size:9px;color:#475569;margin-top:2px;">Product Catalogue' + catTitle + ' · ' + products.length + ' Products</div></div>'
    + '<div class="meta">Generated: ' + new Date().toLocaleDateString('en-IN', {day:'2-digit',month:'short',year:'numeric'}) + '<br>pavan@indiagully.com · +91 62825 56067<br>All prices in INR (excl. GST)</div>'
    + '</div>'
    + '<table><thead><tr>'
    + '<th>SKU</th><th>Product Name</th><th>Category</th><th>Unit</th><th style="text-align:right;">Price ₹</th><th style="text-align:center;">GST%</th><th>HSN</th><th>Brand</th><th style="text-align:center;">Stock</th>'
    + '</tr></thead><tbody>' + rows + '</tbody></table>'
    + '<div style="margin-top:10px;font-size:8px;color:#94a3b8;text-align:center;">India Gully Enterprise Platform · india-gully.pages.dev · GST: 27AAGCV0867P1ZN · All prices exclusive of GST</div>'
    + '</body></html>';

  var w = window.open('', '_blank', 'width=1200,height=800');
  if (w) {
    w.document.write(html);
    w.document.close();
    setTimeout(function(){ w.print(); }, 800);
  } else {
    igShowToast('Pop-up blocked. Please allow pop-ups and try again.', 'warn');
  }
}

function igCatEnquire(e, sku, name) {
  e.preventDefault();
  // Pre-fill enquiry form with product info
  igShowToast('Redirecting to enquiry form for ' + sku + '…', 'info');
  setTimeout(function(){
    window.location.href = '/horeca#enquiry';
  }, 700);
}

// ── Toast Helper (standalone, works without admin layout) ────────────────────
function igShowToast(msg, type) {
  var existing = document.querySelectorAll('.ig-pub-toast');
  var offset = existing.length * 60;
  var t = document.createElement('div');
  t.className = 'ig-pub-toast';
  var bg = type === 'success' ? '#16a34a' : type === 'warn' ? '#d97706' : type === 'info' ? '#2563eb' : '#dc2626';
  t.style.cssText = 'position:fixed;bottom:' + (1.5 + offset/16) + 'rem;right:1.5rem;background:' + bg + ';color:#fff;padding:.75rem 1.25rem;font-size:.78rem;font-weight:600;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,.2);max-width:320px;line-height:1.4;';
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(function(){ t.style.opacity = '0'; t.style.transition = 'opacity .4s'; setTimeout(function(){ t.remove(); }, 400); }, 3500);
}

// ── Init ──────────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', igCatLoad);
</script>
`
  return c.html(layout('HORECA Product Catalogue', content, {
    description: 'India Gully HORECA product catalogue — browse 500+ SKUs across kitchen equipment, crockery, linen, bar, housekeeping, furniture, technology and safety. Download CSV or PDF.'
  }))
})

// ── Download redirect page (for download link in nav/CTA) ────────────────────
app.get('/catalogue/download-page', (c) => {
  return c.redirect('/horeca/catalogue', 302)
})

// ── HORECA Customer Portal ────────────────────────────────────────────────────
app.get('/portal', (c) => {
  const body = `<!DOCTYPE html>
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
    .ig-input{width:100%;border:1px solid var(--border);padding:.5rem .75rem;font-size:.82rem;background:#fff;box-sizing:border-box;}
    .ig-input:focus{outline:none;border-color:var(--gold);}
    .badge{display:inline-flex;align-items:center;padding:.15rem .5rem;font-size:.65rem;font-weight:700;letter-spacing:.04em;text-transform:uppercase;border-radius:2px;}
    .prod-card{background:#fff;border:1px solid var(--border);transition:box-shadow .2s;}
    .prod-card:hover{box-shadow:0 4px 16px rgba(0,0,0,.08);}
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
    <div id="portal-welcome" style="font-size:.72rem;color:rgba(255,255,255,.7);">Loading…</div>
    <button onclick="igPortalCartToggle()" style="background:var(--gold);color:#fff;border:none;padding:.45rem 1rem;font-size:.75rem;font-weight:600;cursor:pointer;position:relative;">
      <i class="fas fa-shopping-cart" style="margin-right:.35rem;"></i>Cart
      <span id="cart-count" style="background:#dc2626;color:#fff;border-radius:50%;width:18px;height:18px;font-size:.58rem;display:inline-flex;align-items:center;justify-content:center;margin-left:.3rem;">0</span>
    </button>
    <button onclick="igPortalDownload()" style="background:none;border:1px solid rgba(255,255,255,.2);color:rgba(255,255,255,.8);padding:.45rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;">
      <i class="fas fa-download" style="margin-right:.3rem;"></i>Download Catalogue
    </button>
    <a href="/horeca" style="font-size:.68rem;color:rgba(255,255,255,.5);text-decoration:none;"><i class="fas fa-arrow-left" style="margin-right:.3rem;"></i>Back to Site</a>
  </div>
</div>

<div style="max-width:1280px;margin:0 auto;padding:2rem;">
  <!-- Stats Row -->
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:1rem;margin-bottom:2rem;" id="portal-stats">
    ${[
      {label:'Total Products',   value:'—', c:'#B8960C', icon:'box'},
      {label:'Categories',       value:'—', c:'#2563eb', icon:'folder'},
      {label:'Featured Items',   value:'—', c:'#7c3aed', icon:'star'},
      {label:'In Stock',         value:'—', c:'#16a34a', icon:'check-circle'},
      {label:'Low Stock Alerts', value:'—', c:'#dc2626', icon:'exclamation-triangle'},
    ].map(s=>`<div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.5rem;">
        <span style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#64748b;">${s.label}</span>
        <i class="fas fa-${s.icon}" style="color:${s.c};font-size:.75rem;"></i>
      </div>
      <div id="pstat-${s.label.replace(/\s+/g,'-').toLowerCase()}" style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:${s.c};line-height:1;">${s.value}</div>
    </div>`).join('')}
  </div>

  <div style="display:grid;grid-template-columns:220px 1fr;gap:1.5rem;">
    <!-- Category Sidebar -->
    <div style="background:#fff;border:1px solid var(--border);height:fit-content;">
      <div style="padding:.875rem 1rem;border-bottom:1px solid var(--border);font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:#64748b;">Browse Categories</div>
      <div id="portal-cat-sidebar">
        <div onclick="igPortalFilter('')" style="padding:.625rem 1rem;border-bottom:1px solid var(--border);cursor:pointer;display:flex;justify-content:space-between;align-items:center;background:#fffbeb;border-left:3px solid var(--gold);">
          <span style="font-size:.78rem;font-weight:600;color:var(--ink);">All Categories</span>
          <span id="portal-count-all" style="font-size:.63rem;color:#94a3b8;">—</span>
        </div>
      </div>
      <!-- Download Section in sidebar -->
      <div style="padding:1rem;border-top:1px solid var(--border);background:#fffbeb;">
        <p style="font-size:.65rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--gold);margin-bottom:.5rem;">Download</p>
        <button onclick="igPortalDownload()" style="width:100%;background:var(--gold);color:#fff;border:none;padding:.45rem;font-size:.72rem;font-weight:600;cursor:pointer;margin-bottom:.4rem;display:flex;align-items:center;justify-content:center;gap:.4rem;">
          <i class="fas fa-file-csv"></i>Full Catalogue CSV
        </button>
        <button onclick="igPortalDownloadPDF()" style="width:100%;background:#fff;color:var(--ink);border:1px solid var(--border);padding:.45rem;font-size:.72rem;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:.4rem;">
          <i class="fas fa-print" style="color:#475569;"></i>Print / Save PDF
        </button>
      </div>
    </div>

    <!-- Product Area -->
    <div>
      <div style="display:flex;gap:.75rem;margin-bottom:1.25rem;align-items:center;flex-wrap:wrap;">
        <div style="flex:1;position:relative;">
          <i class="fas fa-search" style="position:absolute;left:.75rem;top:50%;transform:translateY(-50%);color:#94a3b8;font-size:.72rem;"></i>
          <input type="text" id="portal-search" class="ig-input" placeholder="Search products by name, SKU, brand…" style="padding-left:2.25rem;" oninput="igPortalRender()">
        </div>
        <select id="portal-sort" class="ig-input" style="max-width:160px;font-size:.78rem;" onchange="igPortalRender()">
          <option value="">Sort: Default</option>
          <option value="name">Name A–Z</option>
          <option value="price_asc">Price: Low–High</option>
          <option value="price_desc">Price: High–Low</option>
          <option value="featured">Featured First</option>
        </select>
        <span id="portal-result-count" style="font-size:.75rem;color:#64748b;white-space:nowrap;"></span>
      </div>

      <!-- Loading -->
      <div id="portal-loading" style="display:block;text-align:center;padding:3rem;color:#94a3b8;">
        <i class="fas fa-spinner fa-spin" style="font-size:2rem;color:var(--gold);"></i>
        <p style="margin-top:.75rem;font-size:.85rem;">Loading catalogue…</p>
      </div>

      <div id="portal-product-grid" style="display:none;grid-template-columns:repeat(3,1fr);gap:1rem;"></div>
    </div>
  </div>
</div>

<script>
var _portalProducts = [];
var _portalCategories = [];
var _portalActiveCat = '';
var _portalCart = [];

function igPortalToast(msg, type) {
  var t = document.createElement('div');
  var bg = type==='success'?'#16a34a':type==='warn'?'#d97706':type==='info'?'#2563eb':'#dc2626';
  t.style.cssText='position:fixed;bottom:1.5rem;right:1.5rem;background:'+bg+';color:#fff;padding:.75rem 1.25rem;font-size:.78rem;font-weight:600;z-index:9999;box-shadow:0 4px 20px rgba(0,0,0,.2);';
  t.textContent=msg; document.body.appendChild(t);
  setTimeout(function(){ t.remove(); }, 3000);
}

function igPortalLoad() {
  fetch('/api/horeca/catalogue')
    .then(function(r){ return r.json(); })
    .then(function(d){
      _portalProducts = d.products || [];
      _portalCategories = d.categories || [];
      var stats = d.stats || {};
      // Update stat cards
      var total = stats.total_products || _portalProducts.length;
      var cats = stats.total_categories || _portalCategories.length;
      var featured = stats.featured_count || _portalProducts.filter(function(p){ return p.featured; }).length;
      var inStock = _portalProducts.filter(function(p){ return p.stock > p.reorder; }).length;
      var lowStock = _portalProducts.filter(function(p){ return p.stock > 0 && p.stock <= p.reorder; }).length;
      document.getElementById('pstat-total-products').textContent = total;
      document.getElementById('pstat-categories').textContent = cats;
      document.getElementById('pstat-featured-items').textContent = featured;
      document.getElementById('pstat-in-stock').textContent = inStock;
      document.getElementById('pstat-low-stock-alerts').textContent = lowStock;
      document.getElementById('portal-count-all').textContent = _portalProducts.length;
      document.getElementById('portal-welcome').innerHTML = 'Welcome — <strong style="color:#fff;">India Gully HORECA Portal</strong>';

      igPortalBuildSidebar();
      document.getElementById('portal-loading').style.display = 'none';
      document.getElementById('portal-product-grid').style.display = 'grid';
      igPortalRender();
    })
    .catch(function(){
      document.getElementById('portal-loading').innerHTML = '<p style="color:#dc2626;">Failed to load catalogue. Please refresh.</p>';
    });
}

function igPortalBuildSidebar() {
  var sb = document.getElementById('portal-cat-sidebar');
  var html = '<div onclick="igPortalFilter(\\'\\')" style="padding:.625rem 1rem;border-bottom:1px solid var(--border);cursor:pointer;display:flex;justify-content:space-between;align-items:center;background:#fffbeb;border-left:3px solid var(--gold);">'
    + '<span style="font-size:.78rem;font-weight:600;color:var(--ink);">All Categories</span>'
    + '<span style="font-size:.63rem;color:#94a3b8;">' + _portalProducts.length + '</span>'
    + '</div>';
  _portalCategories.forEach(function(cat){
    var cnt = _portalProducts.filter(function(p){ return p.category===cat.name; }).length;
    html += '<div onclick="igPortalFilter(\\'' + cat.name.replace(/'/g,"\\'") + '\\')" style="padding:.625rem 1rem;border-bottom:1px solid var(--border);cursor:pointer;display:flex;justify-content:space-between;align-items:center;" onmouseover="this.style.background=\\'#fffbeb\\'" onmouseout="this.style.background=\\'\\'"><span style="font-size:.78rem;color:var(--ink);"><i class=\\"fas fa-' + (cat.icon||'box') + '\\" style=\\"color:' + (cat.color||'#475569') + ';font-size:.7rem;margin-right:.35rem;\\"></i>' + cat.name + '</span><span style="font-size:.63rem;color:#94a3b8;">' + cnt + '</span></div>';
  });
  sb.innerHTML = html;
}

function igPortalFilter(cat) {
  _portalActiveCat = cat;
  igPortalRender();
}

function igPortalRender() {
  var search = (document.getElementById('portal-search').value||'').toLowerCase();
  var sort = (document.getElementById('portal-sort').value||'');
  var products = _portalProducts.filter(function(p){
    if (_portalActiveCat && p.category !== _portalActiveCat) return false;
    if (search) { var h=(p.name+' '+p.sku+' '+(p.brand||'')).toLowerCase(); if(!h.includes(search)) return false; }
    return true;
  });
  if (sort==='name') products.sort(function(a,b){ return a.name.localeCompare(b.name); });
  else if (sort==='price_asc') products.sort(function(a,b){ return a.price-b.price; });
  else if (sort==='price_desc') products.sort(function(a,b){ return b.price-a.price; });
  else if (sort==='featured') products.sort(function(a,b){ return (b.featured?1:0)-(a.featured?1:0); });

  document.getElementById('portal-result-count').textContent = products.length + ' product' + (products.length!==1?'s':'') + (_portalActiveCat?' in '+_portalActiveCat:'');
  var html = '';
  products.forEach(function(p){
    var lowStock = p.stock<=p.reorder&&p.stock>0;
    var outOfStock = p.stock===0;
    var sc = outOfStock?'#dc2626':(lowStock?'#d97706':'#16a34a');
    var st = outOfStock?'Out of Stock':(lowStock?'Low — '+p.stock+' left':p.stock+' in stock');
    var catColor = (_portalCategories.find(function(c){ return c.name===p.category; })||{}).color||'#475569';
    html += '<div class="prod-card">'
      + (p.featured?'<div style="background:var(--gold);color:#fff;font-size:.6rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:.25rem .75rem;">★ Featured</div>':'')
      + '<div style="padding:1.1rem;">'
      + '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.35rem;">'
      + '<span style="font-size:.62rem;font-weight:700;font-family:monospace;color:#0d9488;">' + p.sku + '</span>'
      + '<span style="font-size:.6rem;background:' + catColor + '22;color:' + catColor + ';padding:.15rem .4rem;font-weight:700;">' + (p.category||'').split(' ')[0] + '</span>'
      + '</div>'
      + '<h3 style="font-size:.875rem;font-weight:700;color:var(--ink);margin:0 0 .3rem;line-height:1.3;">' + p.name + '</h3>'
      + (p.brand?'<p style="font-size:.68rem;color:#94a3b8;margin:0 0 .5rem;"><i class="fas fa-tag" style="margin-right:.25rem;"></i>' + p.brand + '</p>':'')
      + '<div style="display:flex;align-items:baseline;gap:.4rem;margin-bottom:.35rem;">'
      + '<span style="font-family:\'DM Serif Display\',Georgia,serif;font-size:1.2rem;color:var(--gold);">₹' + (p.price||0).toLocaleString('en-IN') + '</span>'
      + '<span style="font-size:.68rem;color:#94a3b8;">per ' + (p.unit||'Piece') + ' · GST ' + (p.gst_rate||18) + '%</span>'
      + '</div>'
      + '<p style="font-size:.68rem;color:' + sc + ';font-weight:600;margin:0;"><i class="fas fa-circle" style="font-size:.4rem;margin-right:.25rem;"></i>' + st + '</p>'
      + '</div>'
      + '<div style="padding:.75rem 1.1rem;border-top:1px solid var(--border);display:flex;gap:.5rem;">'
      + '<input type="number" min="1" value="1" id="qty-' + p.sku.replace(/[^a-z0-9]/gi,'-') + '" style="width:50px;border:1px solid var(--border);padding:.3rem .4rem;font-size:.78rem;text-align:center;">'
      + '<button onclick="igPortalAddCart(\\'' + p.sku + '\\',\\'' + p.name.replace(/'/g,"\\'") + '\\')" style="flex:1;background:var(--gold);color:#fff;border:none;padding:.4rem;font-size:.72rem;font-weight:600;cursor:pointer;"><i class="fas fa-cart-plus" style="margin-right:.3rem;"></i>Add to Cart</button>'
      + '<a href="/horeca#enquiry" style="background:#f1f5f9;color:var(--ink);border:1px solid var(--border);padding:.4rem .6rem;font-size:.68rem;cursor:pointer;text-decoration:none;display:flex;align-items:center;" title="Request quote"><i class="fas fa-paper-plane" style="color:var(--gold);"></i></a>'
      + '</div>'
      + '</div>';
  });
  document.getElementById('portal-product-grid').innerHTML = html || '<div style="padding:3rem;text-align:center;color:#94a3b8;grid-column:span 3;">No products found</div>';
}

function igPortalAddCart(sku, name) {
  var qtyEl = document.getElementById('qty-' + sku.replace(/[^a-z0-9]/gi,'-'));
  var qty = parseInt((qtyEl||{}).value)||1;
  var existing = _portalCart.find(function(c){ return c.sku===sku; });
  if (existing) { existing.qty += qty; } else { _portalCart.push({sku:sku,name:name,qty:qty}); }
  document.getElementById('cart-count').textContent = _portalCart.reduce(function(a,c){ return a+c.qty; },0);
  igPortalToast(name + ' ×' + qty + ' added to cart', 'success');
}

function igPortalCartToggle() {
  if (_portalCart.length === 0) { igPortalToast('Cart is empty', 'info'); return; }
  var items = _portalCart.map(function(c){ return c.sku + ' — ' + c.name + ' ×' + c.qty; }).join('\\n');
  alert('Cart Contents:\\n\\n' + items + '\\n\\nSubmit enquiry at /horeca#enquiry with your cart details.');
}

function igPortalDownload() {
  if (_portalProducts.length === 0) { igPortalToast('Catalogue not loaded yet', 'warn'); return; }
  var cat = _portalActiveCat;
  var products = cat ? _portalProducts.filter(function(p){ return p.category===cat; }) : _portalProducts;
  var headers = ['SKU','Product Name','Category','Unit','Price (INR)','GST Rate (%)','HSN Code','Brand','Stock Qty','Description'];
  var rows = products.map(function(p){
    return [p.sku,'"'+(p.name||'').replace(/"/g,"'")+'"','"'+(p.category||'')+'"',p.unit||'Piece',p.price||0,p.gst_rate||18,p.hsn||'','"'+(p.brand||'')+'"',p.stock||0,'"'+(p.description||'').replace(/"/g,"'").substring(0,150)+'"'].join(',');
  });
  var csv = [headers.join(',')].concat(rows).join('\\n');
  var blob = new Blob([csv], {type:'text/csv;charset=utf-8;'});
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href=url; a.download='india-gully-horeca-catalogue-'+(cat?cat.replace(/[^a-z0-9]/gi,'-').toLowerCase()+'-':'')+new Date().toISOString().slice(0,10)+'.csv'; a.click();
  URL.revokeObjectURL(url);
  igPortalToast('Catalogue CSV downloaded — ' + products.length + ' products', 'success');
}

function igPortalDownloadPDF() {
  igPortalToast('Opening print view…', 'info');
  setTimeout(function(){ window.print(); }, 500);
}

document.addEventListener('DOMContentLoaded', igPortalLoad);
</script>
</body>
</html>`
  return c.html(body)
})

export default app
