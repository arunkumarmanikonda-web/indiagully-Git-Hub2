import { Hono } from 'hono'
import { layout } from '../lib/layout'
import { LISTINGS } from '../lib/constants'

const app = new Hono()

// All listings
app.get('/', (c) => {
  const content = `
  <!-- LISTINGS HERO -->
  <section class="relative py-28 bg-ig-dark overflow-hidden">
    <div class="absolute inset-0 opacity-5" style="background-image:linear-gradient(rgba(197,160,40,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(197,160,40,.3) 1px,transparent 1px);background-size:80px 80px;"></div>
    <div class="relative max-w-7xl mx-auto px-6">
      <div class="max-w-3xl">
        <div class="flex items-center gap-3 mb-6">
          <div class="h-px w-12 bg-gold"></div>
          <span class="text-gold text-xs font-semibold tracking-widest uppercase">Investment Mandates</span>
        </div>
        <h1 class="font-serif text-5xl lg:text-7xl font-bold text-white mb-6">Active Mandates &amp;<br>Investment Assets</h1>
        <p class="text-gray-400 text-xl leading-relaxed">Exclusive mandates across India's premier sectors — Hospitality · Real Estate · Entertainment · Heritage. Curated for qualified investors, family offices and institutional buyers.</p>
      </div>
    </div>
  </section>

  <!-- TRANSACTION ADVISORY DISCLAIMER -->
  <div class="bg-gold-pale border-b-2 border-gold">
    <div class="max-w-7xl mx-auto px-6 py-5 flex items-start gap-4">
      <i class="fas fa-balance-scale text-gold text-xl mt-0.5 flex-shrink-0"></i>
      <div>
        <p class="text-sm text-gray-700 leading-relaxed">
          <strong class="text-ig-dark">Transaction Advisory Disclaimer:</strong> India Gully (Vivacious Entertainment and Hospitality Pvt. Ltd.) acts <strong>exclusively as Transaction Advisor</strong> on all mandates listed herein. We do not hold, own, develop, build or broker these assets in our own capacity. All information provided is indicative and based on information received from clients. All investment decisions must be independently assessed with due diligence. Qualified investors are required to execute a mutual NDA prior to receiving Information Memoranda. Past returns are not indicative of future performance.
        </p>
      </div>
    </div>
  </div>

  <!-- STATS BAR -->
  <div class="bg-white border-b border-ig-border">
    <div class="max-w-7xl mx-auto px-6 py-6 flex flex-wrap gap-8">
      <div class="flex items-center gap-3"><div class="w-2 h-2 rounded-full bg-gold"></div><span class="text-xs text-gray-500 uppercase tracking-widest">6 Active Mandates</span></div>
      <div class="flex items-center gap-3"><div class="w-2 h-2 rounded-full bg-green-500"></div><span class="text-xs text-gray-500 uppercase tracking-widest">₹10,000 Cr+ Total Pipeline</span></div>
      <div class="flex items-center gap-3"><div class="w-2 h-2 rounded-full bg-gray-400"></div><span class="text-xs text-gray-500 uppercase tracking-widest">All Mandates by NDA</span></div>
      <div class="ml-auto">
        <a href="/contact?type=nda" class="btn-dark text-xs inline-block">Execute NDA to Proceed</a>
      </div>
    </div>
  </div>

  <!-- LISTINGS GRID -->
  <section class="py-16 bg-ig-cream">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        ${LISTINGS.map(l => `
        <div class="listing-card group" id="${l.id}">
          <!-- HEADER -->
          <div class="relative p-8 pb-6 overflow-hidden" style="background:linear-gradient(135deg,#1A1A1A,#2D2D2D);min-height:200px;">
            <div class="absolute inset-0 flex items-center justify-center opacity-4">
              <div class="font-serif text-9xl font-black text-white opacity-10">${l.sector.slice(0,2).toUpperCase()}</div>
            </div>
            <!-- Status Badge -->
            <div class="absolute top-5 right-5">
              <div class="badge badge-gold text-xs">${l.status}</div>
            </div>
            <!-- Sector -->
            <div class="absolute top-5 left-5">
              <div class="badge" style="background:rgba(255,255,255,.08);color:rgba(255,255,255,.6);border:1px solid rgba(255,255,255,.1);font-size:.7rem;letter-spacing:.1em;text-transform:uppercase;">${l.sector}</div>
            </div>
            <!-- Bottom content -->
            <div class="absolute bottom-5 left-8 right-8">
              <div class="flex items-center gap-2 mb-2">
                <i class="fas fa-map-marker-alt text-gold text-xs"></i>
                <span class="text-gray-400 text-xs uppercase tracking-wider">${l.location}</span>
              </div>
              <h3 class="font-serif text-2xl font-bold text-white">${l.title}</h3>
            </div>
          </div>
          
          <!-- METRICS -->
          <div class="px-8 pt-6 pb-0">
            <div class="grid grid-cols-3 gap-3 mb-5">
              <div class="text-center p-3 bg-ig-cream">
                <div class="font-serif text-xl font-bold text-gold">${l.value}</div>
                <div class="text-xs text-gray-400 uppercase tracking-wider mt-1">
                  ${l.sector === 'Hospitality' ? 'Project Cost' : 'Investment Scale'}
                </div>
              </div>
              <div class="text-center p-3 bg-ig-cream">
                <div class="font-semibold text-ig-dark text-sm">${l.area || l.properties || l.locations || l.gla || '₹45 Cr'}</div>
                <div class="text-xs text-gray-400 uppercase tracking-wider mt-1">
                  ${l.area ? 'Land Area' : l.properties ? 'Properties' : l.locations ? 'Locations' : l.gla ? 'GLA' : 'Capex'}
                </div>
              </div>
              <div class="text-center p-3 bg-ig-cream">
                <div class="font-semibold text-ig-dark text-sm">${l.preleased || l.keys || l.irr || l.partner || l.payback || l.components || l.occupancy || '—'}</div>
                <div class="text-xs text-gray-400 uppercase tracking-wider mt-1">
                  ${l.preleased ? 'Pre-Leased' : l.keys ? 'Keys / Rooms' : l.irr ? 'Proj. IRR' : l.partner ? 'Partner' : l.payback ? 'Payback' : l.occupancy ? 'Occupancy TTM' : 'Details'}
                </div>
              </div>
            </div>
            
            <p class="text-gray-500 text-sm leading-relaxed mb-5">${l.desc}</p>
            
            <div class="flex flex-wrap gap-1.5 mb-5">
              ${l.tags.map(t => `<span class="badge badge-dark text-xs">${t}</span>`).join('')}
            </div>
          </div>
          
          <!-- FOOTER -->
          <div class="px-8 pb-8 flex items-center justify-between">
            <div class="text-xs text-gray-400 flex items-center gap-1">
              <i class="fas fa-lock text-gold"></i>
              <span>NDA Required · IM on Request</span>
            </div>
            <div class="flex gap-3">
              <a href="/contact?mandate=${l.id}&type=nda" class="btn-dark text-xs inline-block">Execute NDA</a>
              <a href="/contact?mandate=${l.id}" class="btn-outline-gold text-xs inline-block">Enquire</a>
            </div>
          </div>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- NDA CTA -->
  <section class="py-20 bg-ig-dark">
    <div class="max-w-3xl mx-auto px-6 text-center">
      <div class="gold-line-center mb-6">
        <span class="text-xs text-gold tracking-widest uppercase font-semibold">Qualified Investors Only</span>
      </div>
      <h2 class="font-serif text-4xl font-bold text-white mb-5">Interested in a Specific Mandate?</h2>
      <p class="text-gray-400 text-lg mb-8">Sign a mutual NDA and receive the full Information Memorandum, financial projections, deal structure documents and advisory engagement terms.</p>
      <div class="flex flex-wrap gap-4 justify-center">
        <a href="/contact?type=nda" class="btn-gold inline-block">Initiate NDA Process</a>
        <a href="/contact" class="btn-outline-gold inline-block">General Enquiry</a>
      </div>
      <p class="text-xs text-gray-600 mt-6">All mandates are strictly confidential. Information provided to qualified parties only. India Gully acts as Transaction Advisor exclusively.</p>
    </div>
  </section>
  `
  return c.html(layout('Active Mandates & Investment Opportunities', content, {
    description: 'India Gully active mandates — exclusive investment opportunities across Entertainment, Real Estate, Hospitality and Heritage sectors. ₹10,000 Cr+ advisory pipeline.'
  }))
})

// Individual listing detail page
app.get('/:id', (c) => {
  const id = c.req.param('id')
  const listing = LISTINGS.find(l => l.id === id)
  if (!listing) return c.redirect('/listings')
  
  const content = `
  <!-- BACK NAV -->
  <div class="bg-white border-b border-ig-border">
    <div class="max-w-7xl mx-auto px-6 py-3 flex items-center gap-2 text-sm">
      <a href="/listings" class="text-gray-400 hover:text-gold transition-colors">← All Mandates</a>
      <span class="text-gray-300">/</span>
      <span class="text-ig-dark">${listing.title}</span>
    </div>
  </div>

  <!-- LISTING DETAIL -->
  <section class="py-16 bg-ig-cream">
    <div class="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-10">
      <!-- LEFT CONTENT -->
      <div class="lg:col-span-2">
        <!-- Header -->
        <div class="bg-ig-dark p-10 mb-8 relative overflow-hidden">
          <div class="absolute inset-0 opacity-5" style="background:radial-gradient(ellipse at 80% 50%,#C5A028,transparent 60%);"></div>
          <div class="relative">
            <div class="flex items-center gap-3 mb-4">
              <div class="badge badge-gold">${listing.status}</div>
              <div class="text-xs text-gray-500 uppercase tracking-wider">${listing.sector} · ${listing.location}</div>
            </div>
            <h1 class="font-serif text-4xl font-bold text-white mb-4">${listing.title}</h1>
            <p class="text-gray-400 text-lg leading-relaxed">${listing.desc}</p>
          </div>
        </div>
        
        <!-- Metrics Grid -->
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          <div class="bg-white p-6 border border-ig-border text-center">
            <div class="text-xs text-gray-400 uppercase tracking-widest mb-2">Investment Scale</div>
            <div class="font-serif text-3xl font-bold text-gold">${listing.value}</div>
          </div>
          <div class="bg-white p-6 border border-ig-border text-center">
            <div class="text-xs text-gray-400 uppercase tracking-widest mb-2">Sector</div>
            <div class="font-serif text-xl font-semibold text-ig-dark">${listing.sector}</div>
          </div>
          <div class="bg-white p-6 border border-ig-border text-center">
            <div class="text-xs text-gray-400 uppercase tracking-widest mb-2">Location</div>
            <div class="font-semibold text-ig-dark text-sm">${listing.location}</div>
          </div>
        </div>
        
        <!-- Tags -->
        <div class="flex flex-wrap gap-2 mb-8">
          ${listing.tags.map(t => `<span class="badge badge-gold">${t}</span>`).join('')}
        </div>
        
        <!-- Advisory Note -->
        <div class="bg-white border border-ig-border p-6">
          <div class="flex gap-3">
            <i class="fas fa-balance-scale text-gold text-xl mt-1"></i>
            <div>
              <h4 class="font-semibold text-ig-dark mb-2">Transaction Advisory Notice</h4>
              <p class="text-sm text-gray-500 leading-relaxed">India Gully (Vivacious Entertainment and Hospitality Pvt. Ltd.) acts exclusively as Transaction Advisor on this mandate. A mutual Non-Disclosure Agreement (NDA) is required before Information Memorandum and financial details can be shared. This listing is for indicative purposes only.</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- RIGHT SIDEBAR: ENQUIRY FORM -->
      <div>
        <div class="bg-white border border-ig-border p-6 sticky top-24">
          <h3 class="font-serif text-xl font-bold text-ig-dark mb-1">Enquire About This Mandate</h3>
          <p class="text-xs text-gray-400 mb-5">Qualified investors only. NDA required before IM is shared.</p>
          
          <form class="ig-form" method="POST" action="/api/enquiry">
            <input type="hidden" name="type" value="mandate">
            <input type="hidden" name="mandate" value="${listing.id}">
            <div class="space-y-4">
              <div>
                <label class="ig-label">Full Name *</label>
                <input type="text" name="name" class="ig-input" required placeholder="Your name">
              </div>
              <div>
                <label class="ig-label">Organisation *</label>
                <input type="text" name="org" class="ig-input" required placeholder="Fund / Family Office / Company">
              </div>
              <div>
                <label class="ig-label">Email *</label>
                <input type="email" name="email" class="ig-input" required placeholder="you@org.com">
              </div>
              <div>
                <label class="ig-label">Phone *</label>
                <input type="tel" name="phone" class="ig-input" required placeholder="+91 XXXXX XXXXX">
              </div>
              <div>
                <label class="ig-label">Investor Profile</label>
                <select name="profile" class="ig-input">
                  <option value="">Select Profile</option>
                  <option>Family Office</option>
                  <option>Institutional Investor</option>
                  <option>UHNI / HNI</option>
                  <option>PE / VC Fund</option>
                  <option>Developer / Operator</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label class="ig-label">Message</label>
                <textarea name="message" class="ig-input" rows="3" placeholder="Any specific questions or requirements..."></textarea>
              </div>
            </div>
            
            <div class="mt-4 flex items-start gap-2">
              <input type="checkbox" name="nda" id="nda" class="mt-1 accent-gold" required>
              <label for="nda" class="text-xs text-gray-500">I agree to execute a mutual NDA and understand this information is strictly confidential.</label>
            </div>
            
            <button type="submit" class="btn-gold w-full mt-4">
              <i class="fas fa-paper-plane mr-2"></i>Submit Enquiry
            </button>
          </form>
          
          <div class="mt-5 pt-5 border-t border-ig-border text-center">
            <p class="text-xs text-gray-400 mb-2">Or reach us directly:</p>
            <a href="tel:+919810889134" class="text-xs text-gold hover:underline block">+91 98108 89134</a>
            <a href="mailto:akm@indiagully.com" class="text-xs text-gold hover:underline block">akm@indiagully.com</a>
          </div>
        </div>
      </div>
    </div>
  </section>
  `
  return c.html(layout(listing.title, content, {
    description: `${listing.title} — ${listing.location}. Investment scale: ${listing.value}. India Gully acts as Transaction Advisor on this mandate.`
  }))
})

export default app
