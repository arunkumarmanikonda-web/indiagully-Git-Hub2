import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

const CATEGORIES = [
  { id:'ffe', icon:'🛋️', name:'FF&E', full:'Furniture, Fixtures & Equipment', items:['Guestroom Furniture (beds, wardrobes, writing desks)','Lobby & Public Area Seating','Restaurant & Banquet Furniture','Outdoor & Pool Furniture','Spa & Wellness Equipment','Reception & Front Desk Counters'] },
  { id:'ose', icon:'🧳', name:'OS&E', full:'Operating Supplies & Equipment', items:['Guestroom Amenities & Toiletries','Minibar & In-Room Supplies','Housekeeping Trolleys & Equipment','Key Card Systems & Door Hardware','Signage & Wayfinding','Safety & Security Equipment'] },
  { id:'kitchen', icon:'🍳', name:'Kitchen & Catering', full:'Kitchen Equipment & Catering', items:['Commercial Kitchen Equipment (ovens, fryers, grills)','Cold Storage & Refrigeration Systems','Dishwashing & Warewashing Systems','Food Preparation Equipment','Bar Equipment & Ice Machines','Banquet & Catering Trolleys'] },
  { id:'linen', icon:'🛏️', name:'Linen & Soft Furnishings', full:'Linen, Towelling & Soft Furnishings', items:['Bed Linen & Duvet Covers','Bath Towels, Bath Mats & Robes','Curtains, Drapes & Blackouts','Cushions, Pillows & Throws','Table Linen & Napkins','Pool & Spa Towels'] },
  { id:'tableware', icon:'🍽️', name:'Tableware', full:'Tableware, Crockery & Glassware', items:['Fine Dining Crockery & Bone China','Cutlery, Flatware & Silverware','Glassware & Bar Accessories','Serving Platters & Chafing Dishes','Tea & Coffee Service Sets','Buffet Display Equipment'] },
  { id:'uniforms', icon:'👔', name:'Uniforms', full:'Uniforms & Staff Apparel', items:['Front Office & Reception Uniforms','Food & Beverage Service Uniforms','Housekeeping & Laundry Uniforms','Kitchen & Chef Uniforms','Security & Concierge Uniforms','Customised & Branded Uniforms'] },
  { id:'amenities', icon:'🧴', name:'Guest Amenities', full:'Guest Amenities & Toiletries', items:['Branded Toiletry Sets','Shampoo, Conditioner & Soap','Dental & Shaving Kits','Sewing & Vanity Kits','Slippers & Shower Caps','Eco-Friendly / Sustainable Options'] },
  { id:'technology', icon:'📺', name:'Technology & AV', full:'Technology & AV Systems', items:['Smart Room Control Systems','In-Room Entertainment (TV, IPTV)','Conference & Boardroom AV','WiFi Infrastructure & Networking','CCTV & Access Control','Energy Management Systems'] },
]

app.get('/', (c) => {
  const content = `
  <!-- HORECA HERO -->
  <section class="relative py-32 bg-ig-dark overflow-hidden">
    <div class="absolute inset-0 opacity-5" style="background-image:linear-gradient(rgba(197,160,40,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(197,160,40,.3) 1px,transparent 1px);background-size:80px 80px;"></div>
    <div class="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <div class="flex items-center gap-3 mb-6">
          <div class="h-px w-12 bg-gold"></div>
          <span class="text-gold text-xs font-semibold tracking-widest uppercase">HORECA Solutions</span>
        </div>
        <h1 class="font-serif text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">Complete HORECA<br><em class="text-gold font-display">Supply Solutions</em></h1>
        <p class="text-gray-400 text-xl leading-relaxed mb-8">Hotel, Restaurant & Catering supplies — FF&E, OS&E, kitchen equipment, linen, tableware and more. End-to-end procurement from specification to delivery for hotels and F&B projects across India.</p>
        <div class="flex gap-4">
          <a href="#enquire" class="btn-gold inline-block">Request a Quote</a>
          <a href="#categories" class="btn-outline-gold inline-block">Browse Categories</a>
        </div>
      </div>
      
      <div class="grid grid-cols-2 gap-3">
        ${['Competitive Pricing','Approved Vendor Network','Project-Based Procurement','Ongoing Supply Contracts','Pan-India Delivery','Pre-Opening Specialists','FF&E Specification','Brand-Compliant Supply'].map(f => `
        <div class="flex items-center gap-3 p-4 border border-gray-700 hover:border-gold transition-colors">
          <i class="fas fa-check text-gold text-xs"></i>
          <span class="text-gray-300 text-sm">${f}</span>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- USP STRIP -->
  <div class="bg-gold py-8">
    <div class="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      <div><div class="font-serif text-2xl font-bold text-black">15+</div><div class="text-black text-xs uppercase tracking-widest opacity-70">Hotel Projects Supplied</div></div>
      <div><div class="font-serif text-2xl font-bold text-black">Pan-India</div><div class="text-black text-xs uppercase tracking-widest opacity-70">Delivery Network</div></div>
      <div><div class="font-serif text-2xl font-bold text-black">8</div><div class="text-black text-xs uppercase tracking-widest opacity-70">Supply Categories</div></div>
      <div><div class="font-serif text-2xl font-bold text-black">₹0</div><div class="text-black text-xs uppercase tracking-widest opacity-70">Hidden Costs. Ever.</div></div>
    </div>
  </div>

  <!-- CATEGORIES -->
  <section id="categories" class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <div class="gold-line-center">
          <span class="text-xs text-gold tracking-widest uppercase font-semibold">Supply Categories</span>
        </div>
        <h2 class="font-serif text-4xl lg:text-5xl font-bold text-ig-dark mt-3 mb-4">Everything Your Hotel Needs,<br>From One Trusted Partner</h2>
        <p class="text-gray-500 text-lg max-w-2xl mx-auto">We source from approved vendors across India and internationally — providing specification, procurement management and logistics for hotel pre-openings, renovations and ongoing operations.</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        ${CATEGORIES.map(cat => `
        <div class="border border-ig-border hover:border-gold transition-all duration-300 group">
          <div class="p-6 border-b border-ig-border bg-ig-cream group-hover:bg-gold group-hover:bg-opacity-5 transition-colors">
            <div class="flex items-center gap-4">
              <div class="text-4xl">${cat.icon}</div>
              <div>
                <h3 class="font-serif text-xl font-bold text-ig-dark group-hover:text-gold transition-colors">${cat.name}</h3>
                <p class="text-xs text-gray-500">${cat.full}</p>
              </div>
              <a href="/contact?service=horeca-${cat.id}" class="ml-auto btn-outline-gold text-xs py-2 px-4 flex-shrink-0">Request Catalogue</a>
            </div>
          </div>
          <div class="p-6">
            <ul class="grid grid-cols-1 gap-2">
              ${cat.items.map(item => `
              <li class="flex items-center gap-2 text-sm text-gray-600">
                <i class="fas fa-angle-right text-gold text-xs flex-shrink-0"></i>
                ${item}
              </li>
              `).join('')}
            </ul>
          </div>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- HOW IT WORKS -->
  <section class="py-24 bg-ig-dark">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <div class="gold-line-center">
          <span class="text-xs text-gold tracking-widest uppercase font-semibold">Our Process</span>
        </div>
        <h2 class="font-serif text-4xl font-bold text-white mt-3">How HORECA Procurement Works</h2>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style="background:rgba(255,255,255,.05);">
        ${[
          { step:'01', title:'Requirements Brief', desc:'You share your project brief, brand standards, quantities, timelines and budget parameters with our procurement team.' },
          { step:'02', title:'Specification & Sourcing', desc:'We prepare detailed specifications, identify approved vendors, and obtain competitive quotes from our verified supplier network.' },
          { step:'03', title:'Quote & Approval', desc:'We present a branded, GST-enabled quotation with full item-by-item breakdown. Revisions and approvals managed digitally.' },
          { step:'04', title:'Delivery & Handover', desc:'Pan-India logistics coordination, site delivery, quality inspection and handover documentation. Ongoing supply contracts available.' },
        ].map(s => `
        <div class="p-8 hover:bg-white hover:bg-opacity-5 transition-colors" style="background:rgba(255,255,255,.02);">
          <div class="font-serif text-5xl font-bold text-gold opacity-30 mb-4">${s.step}</div>
          <h3 class="font-serif text-xl font-semibold text-white mb-3">${s.title}</h3>
          <p class="text-gray-400 text-sm leading-relaxed">${s.desc}</p>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- QUOTE REQUEST FORM -->
  <section id="enquire" class="py-24 bg-ig-cream">
    <div class="max-w-4xl mx-auto px-6">
      <div class="text-center mb-12">
        <div class="gold-line-center">
          <span class="text-xs text-gold tracking-widest uppercase font-semibold">Get a Quote</span>
        </div>
        <h2 class="font-serif text-4xl font-bold text-ig-dark mt-3 mb-4">Request a HORECA Supply Quotation</h2>
        <p class="text-gray-500">Fill in your requirements and we will revert within 24 business hours with a detailed quotation.</p>
      </div>
      
      <div class="bg-white border border-ig-border p-8">
        <form class="ig-form" method="POST" action="/api/enquiry">
          <input type="hidden" name="type" value="horeca">
          <div class="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label class="ig-label">Your Name *</label>
              <input type="text" name="name" class="ig-input" required placeholder="Full Name">
            </div>
            <div>
              <label class="ig-label">Organisation *</label>
              <input type="text" name="org" class="ig-input" required placeholder="Company / Hotel Name">
            </div>
            <div>
              <label class="ig-label">Email Address *</label>
              <input type="email" name="email" class="ig-input" required placeholder="you@company.com">
            </div>
            <div>
              <label class="ig-label">Phone Number *</label>
              <input type="tel" name="phone" class="ig-input" required placeholder="+91 XXXXX XXXXX">
            </div>
          </div>
          
          <div class="mb-6">
            <label class="ig-label">Supply Categories Required *</label>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
              ${CATEGORIES.map(cat => `
              <label class="flex items-center gap-2 cursor-pointer p-3 border border-ig-border hover:border-gold transition-colors text-sm">
                <input type="checkbox" name="categories[]" value="${cat.id}" class="accent-gold">
                <span>${cat.icon} ${cat.name}</span>
              </label>
              `).join('')}
            </div>
          </div>
          
          <div class="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <label class="ig-label">Project Type</label>
              <select name="projectType" class="ig-input">
                <option value="">Select Project Type</option>
                <option>Hotel Pre-Opening</option>
                <option>Hotel Renovation / Refurbishment</option>
                <option>Restaurant / F&B Setup</option>
                <option>Banquet / Events Venue</option>
                <option>Ongoing Supply Contract</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label class="ig-label">Approximate Budget</label>
              <select name="budget" class="ig-input">
                <option value="">Select Range</option>
                <option>Under ₹25 Lakhs</option>
                <option>₹25 L — ₹1 Cr</option>
                <option>₹1 Cr — ₹5 Cr</option>
                <option>₹5 Cr — ₹20 Cr</option>
                <option>₹20 Cr+</option>
              </select>
            </div>
          </div>
          
          <div class="mb-6">
            <label class="ig-label">Project Details</label>
            <textarea name="details" class="ig-input" rows="4" placeholder="Describe your project, property type, number of rooms/covers, brand standards, required delivery timeline and any specific requirements..."></textarea>
          </div>
          
          <div class="mb-6">
            <label class="ig-label">Project Location</label>
            <input type="text" name="location" class="ig-input" placeholder="City, State">
          </div>
          
          <button type="submit" class="btn-gold w-full">
            <i class="fas fa-paper-plane mr-2"></i>Submit HORECA Enquiry
          </button>
          
          <p class="text-xs text-gray-400 text-center mt-4">By submitting this form, you agree to be contacted by India Gully's HORECA team. All enquiries are strictly confidential.</p>
        </form>
      </div>
    </div>
  </section>
  `
  return c.html(layout('HORECA Solutions', content, {
    description: 'India Gully HORECA Solutions — complete FF&E, OS&E, kitchen equipment, linen, tableware and HORECA supply procurement for hotels and restaurants across India.'
  }))
})

export default app
