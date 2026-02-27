import { Hono } from 'hono'
import { layout } from '../lib/layout'
import { STATS, LISTINGS, VERTICALS } from '../lib/constants'

const app = new Hono()

app.get('/', (c) => {
  const content = `
  <!-- HERO SECTION -->
  <section class="relative min-h-screen flex items-center overflow-hidden" style="background:linear-gradient(135deg,#0D0D0D 0%,#1A1A1A 45%,#141414 100%);">
    <!-- Gold grid overlay -->
    <div class="absolute inset-0 opacity-5" style="background-image:linear-gradient(rgba(197,160,40,.4) 1px,transparent 1px),linear-gradient(90deg,rgba(197,160,40,.4) 1px,transparent 1px);background-size:60px 60px;"></div>
    <!-- Gold radial glow -->
    <div class="absolute inset-0" style="background:radial-gradient(ellipse 80% 60% at 60% 50%,rgba(197,160,40,.07) 0%,transparent 70%);"></div>
    
    <div class="relative max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-16 items-center">
      <!-- LEFT: Content -->
      <div class="fade-up">
        <div class="flex items-center gap-3 mb-8">
          <div class="h-px w-12 bg-gold"></div>
          <span class="text-gold text-xs font-semibold tracking-widest uppercase" style="letter-spacing:.2em;">Multi-Vertical Advisory</span>
        </div>
        
        <h1 class="font-serif text-5xl lg:text-7xl font-bold text-white leading-none mb-6" style="line-height:1.05;">
          Celebrating<br>
          <span class="text-gold italic font-display" style="font-size:1.15em;">Desiness</span><br>
          <span style="font-size:.65em;font-weight:400;color:rgba(255,255,255,.7);">Across Every Vertical</span>
        </h1>
        
        <p class="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg">
          India Gully is India's premier advisory and transaction firm — bringing Big Four rigour to Real Estate, Retail, Hospitality, Entertainment and HORECA across the country.
        </p>
        
        <div class="flex flex-wrap gap-4 mb-12">
          <a href="/listings" class="btn-gold inline-block">View Active Mandates</a>
          <a href="/contact" class="btn-outline-gold inline-block">Submit an Enquiry</a>
        </div>
        
        <!-- Trust Badges -->
        <div class="flex flex-wrap gap-6 items-center">
          <div class="text-center">
            <div class="font-serif text-3xl font-bold text-gold">₹10K Cr+</div>
            <div class="text-xs text-gray-500 uppercase tracking-widest">Pipeline</div>
          </div>
          <div class="w-px h-12 bg-gray-700"></div>
          <div class="text-center">
            <div class="font-serif text-3xl font-bold text-gold">20+</div>
            <div class="text-xs text-gray-500 uppercase tracking-widest">Brand Partnerships</div>
          </div>
          <div class="w-px h-12 bg-gray-700"></div>
          <div class="text-center">
            <div class="font-serif text-3xl font-bold text-gold">15+</div>
            <div class="text-xs text-gray-500 uppercase tracking-widest">Hotel Projects</div>
          </div>
          <div class="w-px h-12 bg-gray-700"></div>
          <div class="text-center">
            <div class="font-serif text-2xl font-bold text-gold">Pan-India</div>
            <div class="text-xs text-gray-500 uppercase tracking-widest">Presence</div>
          </div>
        </div>
      </div>
      
      <!-- RIGHT: Feature Cards -->
      <div class="fade-up-2 hidden lg:block">
        <div class="relative">
          <!-- Main card -->
          <div class="bg-white bg-opacity-5 border border-white border-opacity-10 p-8 mb-4" style="backdrop-filter:blur(10px);">
            <div class="flex items-center justify-between mb-6">
              <div class="text-xs text-gray-500 uppercase tracking-widest">Featured Mandate</div>
              <div class="badge badge-gold">Active · Exclusive</div>
            </div>
            <h3 class="font-serif text-2xl text-white font-semibold mb-2">Integrated Entertainment Destination</h3>
            <p class="text-gray-400 text-sm mb-4">Maharashtra · Theme Park + Hotel + Retail · 200+ Acres</p>
            <div class="flex items-end justify-between">
              <div>
                <div class="text-xs text-gray-600 uppercase tracking-wider mb-1">Investment Scale</div>
                <div class="font-serif text-4xl font-bold text-gold">₹4,500 Cr</div>
              </div>
              <a href="/listings/entertainment-maharashtra" class="btn-outline-gold text-xs">View Mandate</a>
            </div>
          </div>
          
          <!-- Mini cards row -->
          <div class="grid grid-cols-2 gap-4">
            <div class="bg-white bg-opacity-5 border border-white border-opacity-10 p-5">
              <div class="text-gold text-2xl mb-2">🏛️</div>
              <div class="font-serif text-xl font-semibold text-white">₹2,100 Cr</div>
              <div class="text-xs text-gray-500 mt-1">Retail Hub · Mumbai MMR</div>
            </div>
            <div class="bg-white bg-opacity-5 border border-white border-opacity-10 p-5">
              <div class="text-gold text-2xl mb-2">🎡</div>
              <div class="font-serif text-xl font-semibold text-white">₹1,200 Cr+</div>
              <div class="text-xs text-gray-500 mt-1">Entertainment City · NCR</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce opacity-60">
      <span class="text-xs text-gray-500 tracking-widest uppercase">Scroll</span>
      <i class="fas fa-chevron-down text-gold text-xs"></i>
    </div>
  </section>

  <!-- MARQUEE TICKER -->
  <div class="bg-gold py-3 overflow-hidden">
    <div class="flex whitespace-nowrap" style="animation:ticker 40s linear infinite;">
      <span class="text-black text-xs font-semibold tracking-widest uppercase px-8">Real Estate Advisory</span>
      <span class="text-black opacity-40">◆</span>
      <span class="text-black text-xs font-semibold tracking-widest uppercase px-8">Retail Leasing Strategy</span>
      <span class="text-black opacity-40">◆</span>
      <span class="text-black text-xs font-semibold tracking-widest uppercase px-8">Hotel Management</span>
      <span class="text-black opacity-40">◆</span>
      <span class="text-black text-xs font-semibold tracking-widest uppercase px-8">Entertainment Advisory</span>
      <span class="text-black opacity-40">◆</span>
      <span class="text-black text-xs font-semibold tracking-widest uppercase px-8">Debt & Special Situations</span>
      <span class="text-black opacity-40">◆</span>
      <span class="text-black text-xs font-semibold tracking-widest uppercase px-8">HORECA Solutions</span>
      <span class="text-black opacity-40">◆</span>
      <span class="text-black text-xs font-semibold tracking-widest uppercase px-8">Transaction Advisory</span>
      <span class="text-black opacity-40">◆</span>
      <span class="text-black text-xs font-semibold tracking-widest uppercase px-8">Brand On-Boarding</span>
      <span class="text-black opacity-40">◆</span>
      <span class="text-black text-xs font-semibold tracking-widest uppercase px-8">Feasibility Studies</span>
      <span class="text-black opacity-40">◆</span>
      <span class="text-black text-xs font-semibold tracking-widest uppercase px-8">Project Management</span>
      <span class="text-black opacity-40">◆</span>
      <!-- repeat for seamless loop -->
      <span class="text-black text-xs font-semibold tracking-widest uppercase px-8">Real Estate Advisory</span>
      <span class="text-black opacity-40">◆</span>
      <span class="text-black text-xs font-semibold tracking-widest uppercase px-8">Retail Leasing Strategy</span>
      <span class="text-black opacity-40">◆</span>
      <span class="text-black text-xs font-semibold tracking-widest uppercase px-8">Hotel Management</span>
      <span class="text-black opacity-40">◆</span>
    </div>
  </div>

  <!-- ADVISORY VERTICALS -->
  <section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-6">
      <div class="max-w-2xl mb-16">
        <div class="gold-line">
          <span class="text-xs text-gold tracking-widest uppercase font-semibold">What We Do</span>
        </div>
        <h2 class="font-serif text-4xl lg:text-5xl font-bold text-ig-dark mt-3 mb-5">Six Verticals.<br>One Trusted Partner.</h2>
        <p class="text-gray-500 text-lg leading-relaxed">From strategy to execution, India Gully brings deep domain expertise and institutional-grade advisory to every engagement.</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-ig-border">
        ${VERTICALS.map((v, i) => `
        <div class="bg-white p-10 hover:bg-gold-pale transition-all duration-300 group cursor-pointer" onclick="window.location='/services#${v.id}'">
          <div class="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300">${v.icon}</div>
          <h3 class="font-serif text-xl font-bold text-ig-dark mb-3 group-hover:text-gold transition-colors">${v.name}</h3>
          <p class="text-gray-500 text-sm leading-relaxed mb-5">${v.desc}</p>
          <div class="flex items-center gap-2 text-gold text-xs font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all transform translate-y-1 group-hover:translate-y-0">
            <span>Explore Vertical</span>
            <i class="fas fa-arrow-right text-xs"></i>
          </div>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- FEATURED MANDATES SECTION (Sotheby's Style) -->
  <section class="py-24 bg-ig-cream">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div class="max-w-2xl">
          <div class="gold-line">
            <span class="text-xs text-gold tracking-widest uppercase font-semibold">Active Mandates</span>
          </div>
          <h2 class="font-serif text-4xl lg:text-5xl font-bold text-ig-dark mt-3 mb-4">Investment Opportunities<br>of Institutional Grade</h2>
          <p class="text-gray-500 text-lg">Exclusive mandates across India's premier sectors. All opportunities subject to NDA. Information Memoranda available to qualified investors upon request.</p>
        </div>
        <a href="/listings" class="btn-dark inline-block flex-shrink-0">View All Mandates</a>
      </div>
      
      <!-- Advisory Disclaimer -->
      <div class="bg-white border-l-4 border-gold p-4 mb-10 flex items-start gap-3">
        <i class="fas fa-info-circle text-gold mt-0.5"></i>
        <p class="text-xs text-gray-500 leading-relaxed">
          <strong class="text-ig-dark">Transaction Advisory Disclaimer:</strong> India Gully (Vivacious Entertainment and Hospitality Pvt. Ltd.) acts exclusively as <strong>Transaction Advisor</strong> on all mandates listed herein. We do not hold, own, develop or broker properties in our own capacity. All investment decisions must be independently assessed. Past performance is not indicative of future returns.
        </p>
      </div>
      
      <!-- Featured Listings Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        ${LISTINGS.filter(l => l.highlight).slice(0,3).map(l => `
        <div class="listing-card group">
          <!-- Listing Header -->
          <div class="relative h-52 flex items-end p-6 overflow-hidden" style="background:linear-gradient(135deg,#1A1A1A,#2D2D2D);">
            <div class="absolute inset-0 flex items-center justify-center opacity-5">
              <div class="font-serif text-9xl font-black text-white">${l.sector.charAt(0)}</div>
            </div>
            <div class="absolute top-4 left-4">
              <div class="badge badge-gold">${l.status}</div>
            </div>
            <div class="absolute top-4 right-4">
              <div class="text-xs text-gray-400 uppercase tracking-wider">${l.sector}</div>
            </div>
            <div class="relative">
              <div class="text-xs text-gray-400 uppercase tracking-wider mb-1">${l.location}</div>
              <h3 class="font-serif text-xl font-bold text-white">${l.title}</h3>
            </div>
          </div>
          
          <!-- Listing Body -->
          <div class="p-6">
            <p class="text-gray-500 text-sm leading-relaxed mb-5">${l.desc}</p>
            
            <!-- Key Metrics -->
            <div class="grid grid-cols-2 gap-3 mb-5">
              <div class="bg-ig-cream p-3">
                <div class="text-xs text-gray-400 uppercase tracking-wider mb-1">Investment</div>
                <div class="font-serif text-xl font-bold text-gold">${l.value}</div>
              </div>
              <div class="bg-ig-cream p-3">
                <div class="text-xs text-gray-400 uppercase tracking-wider mb-1">Sector</div>
                <div class="font-semibold text-ig-dark text-sm">${l.sector}</div>
              </div>
            </div>
            
            <div class="flex flex-wrap gap-1.5 mb-5">
              ${l.tags.map(t => `<span class="badge badge-dark text-xs">${t}</span>`).join('')}
            </div>
            
            <a href="/listings/${l.id}" class="btn-dark inline-block w-full text-center text-xs">View Mandate Details</a>
          </div>
        </div>
        `).join('')}
      </div>
      
      <div class="text-center">
        <p class="text-xs text-gray-400 mb-4">All mandates are strictly by NDA · Information Memorandum on request · For qualified investors, family offices and institutional buyers only</p>
        <a href="/listings" class="btn-outline-gold inline-block">View All 6 Active Mandates</a>
      </div>
    </div>
  </section>

  <!-- WHY INDIA GULLY - INSTITUTIONAL POSITIONING -->
  <section class="py-24 bg-ig-dark text-white relative overflow-hidden">
    <div class="absolute inset-0 opacity-5" style="background-image:radial-gradient(circle at 25% 50%,#C5A028 0%,transparent 50%),radial-gradient(circle at 75% 50%,#C5A028 0%,transparent 50%);"></div>
    <div class="relative max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <div class="gold-line-center">
          <span class="text-xs text-gold tracking-widest uppercase font-semibold">Our Proposition</span>
        </div>
        <h2 class="font-serif text-4xl lg:text-5xl font-bold mt-3 mb-5">The India Gully<br>Difference</h2>
        <p class="text-gray-400 text-lg max-w-2xl mx-auto">We bring institutional rigour, deep domain expertise and an unmatched network to every engagement — from ₹45 Cr retail expansions to ₹4,500 Cr entertainment destinations.</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px" style="background:rgba(255,255,255,.05);">
        <div class="p-10 hover:bg-white hover:bg-opacity-5 transition-colors group" style="background:rgba(255,255,255,.02);">
          <div class="w-12 h-12 border border-gold flex items-center justify-center mb-6 group-hover:bg-gold transition-all">
            <i class="fas fa-flag-india text-gold group-hover:text-white transition-colors"></i>
          </div>
          <h3 class="font-serif text-xl font-semibold mb-3">India-Deep Expertise</h3>
          <p class="text-gray-400 text-sm leading-relaxed">Born and built in India. We understand local markets, regulations, culture and consumer behaviour at a granular level across Tier 1, 2 and 3 cities.</p>
        </div>
        <div class="p-10 hover:bg-white hover:bg-opacity-5 transition-colors group" style="background:rgba(255,255,255,.02);">
          <div class="w-12 h-12 border border-gold flex items-center justify-center mb-6 group-hover:bg-gold transition-all">
            <i class="fas fa-handshake text-gold group-hover:text-white transition-colors"></i>
          </div>
          <h3 class="font-serif text-xl font-semibold mb-3">20+ Brand Relationships</h3>
          <p class="text-gray-400 text-sm leading-relaxed">Deep relationships with every major hotel brand from Marriott to Lemon Tree. We know which brand fits which project and can navigate brand negotiations with authority.</p>
        </div>
        <div class="p-10 hover:bg-white hover:bg-opacity-5 transition-colors group" style="background:rgba(255,255,255,.02);">
          <div class="w-12 h-12 border border-gold flex items-center justify-center mb-6 group-hover:bg-gold transition-all">
            <i class="fas fa-utensils text-gold group-hover:text-white transition-colors"></i>
          </div>
          <h3 class="font-serif text-xl font-semibold mb-3">HORECA End-to-End</h3>
          <p class="text-gray-400 text-sm leading-relaxed">One of the few consultants who also procure and supply — giving clients a single accountable partner from strategy through to FF&E delivery on site.</p>
        </div>
        <div class="p-10 hover:bg-white hover:bg-opacity-5 transition-colors group" style="background:rgba(255,255,255,.02);">
          <div class="w-12 h-12 border border-gold flex items-center justify-center mb-6 group-hover:bg-gold transition-all">
            <i class="fas fa-bolt text-gold group-hover:text-white transition-colors"></i>
          </div>
          <h3 class="font-serif text-xl font-semibold mb-3">Execution-Led</h3>
          <p class="text-gray-400 text-sm leading-relaxed">We stay involved through implementation — not just advisory. Turnkey delivery and hands-on project management is our operational differentiator.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CASE STUDIES / HOSPITALITY TRACK RECORD -->
  <section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-6">
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <div class="gold-line">
            <span class="text-xs text-gold tracking-widest uppercase font-semibold">Track Record</span>
          </div>
          <h2 class="font-serif text-4xl lg:text-5xl font-bold text-ig-dark mt-3 mb-4">Mandates Executed.<br>Relationships Built.</h2>
          <p class="text-gray-500 text-lg max-w-2xl">A selection of hospitality management, brand on-boarding and project mandates delivered across India.</p>
        </div>
        <a href="/services" class="btn-dark inline-block flex-shrink-0">All Services</a>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${[
          { title: 'Bijolai Palace, Jodhpur', sub: 'Heritage Hotel · Rajasthan', icon: '🏰', type: 'Hotel Management', desc: 'Strategic management consultancy for this iconic heritage palace. Mandate covers hotel management advisory, brand positioning and revenue strategy.' },
          { title: 'Cygnett Style Shubh, Ramnagar', sub: 'Business Hotel · Uttarakhand', icon: '🦢', type: 'Brand On-Boarding', desc: 'Brand on-boarding and pre-opening management for Cygnett Style Shubh at Ramnagar (Jim Corbett). Full pre-opening planning, training and launch management.' },
          { title: 'Regenta Central, Noida', sub: 'Business Hotel · Delhi NCR', icon: '🌸', type: 'Turnkey PMC', desc: 'Turnkey project management and brand on-boarding for Regenta Central Noida. Full advisory from project planning through pre-opening and launch.' },
          { title: 'Park Inn by Radisson, Delhi', sub: 'Business Hotel · Delhi', icon: '🔴', type: 'Pre-Opening', desc: 'Mock-up room execution and pre-opening support. FF&E specification and vendor management for the IP Extension property.' },
          { title: 'Villa Hotel, Jim Corbett', sub: 'Villa Resort · Uttarakhand', icon: '🌿', type: 'Turnkey + Equity', desc: 'Strategic cum turnkey management for this villa-styled eco resort. Project planning, execution, equity advisory and asset monetisation.' },
          { title: '100-Room Hotel, Hosur', sub: 'Business Hotel · Tamil Nadu', icon: '🏗️', type: 'Greenfield Turnkey', desc: 'Greenfield 100-room branded upscale hotel in Hosur. First branded upscale hotel of the industrial town on the TN-Karnataka border.' },
        ].map(p => `
        <div class="card-hover border border-ig-border p-8 group">
          <div class="flex items-start justify-between mb-4">
            <div class="text-3xl">${p.icon}</div>
            <div class="badge badge-gold">${p.type}</div>
          </div>
          <h3 class="font-serif text-lg font-bold text-ig-dark mb-1 group-hover:text-gold transition-colors">${p.title}</h3>
          <p class="text-xs text-gray-400 mb-4 uppercase tracking-wider">${p.sub}</p>
          <p class="text-gray-500 text-sm leading-relaxed">${p.desc}</p>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- BRAND ECOSYSTEM -->
  <section class="py-24 bg-ig-cream">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-14">
        <div class="gold-line-center">
          <span class="text-xs text-gold tracking-widest uppercase font-semibold">Our Ecosystem</span>
        </div>
        <h2 class="font-serif text-4xl font-bold text-ig-dark mt-3 mb-4">Trusted by India's<br>Leading Brands & Institutions</h2>
        <p class="text-gray-500 max-w-xl mx-auto">We have built long-term relationships with the nation's most recognised hospitality groups, retail brands and institutional investors.</p>
      </div>
      
      <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        ${['Marriott International','Radisson Hotel Group','IHG','Taj Hotels','Cygnett Hotels','Regenta / Royal Orchid','Lemon Tree Hotels','Bhutani Group','CBRE','EY','Ssamman Capital','ITC Hotels'].map(b => `
        <div class="bg-white border border-ig-border p-5 text-center hover:border-gold transition-colors group">
          <div class="text-gray-400 group-hover:text-ig-dark transition-colors text-xs font-semibold uppercase tracking-wide leading-tight">${b}</div>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- LEADERSHIP TEASER -->
  <section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div class="gold-line">
            <span class="text-xs text-gold tracking-widest uppercase font-semibold">Leadership</span>
          </div>
          <h2 class="font-serif text-4xl lg:text-5xl font-bold text-ig-dark mt-3 mb-5">Steered by<br>Industry Veterans</h2>
          <p class="text-gray-500 text-lg leading-relaxed mb-8">Our leadership team brings decades of combined experience across hospitality, real estate, retail and entertainment — having led marquee mandates for the country's most prominent developers, hotel brands and institutional investors.</p>
          <a href="/about" class="btn-dark inline-block">Meet the Leadership</a>
        </div>
        
        <div class="grid grid-cols-1 gap-4">
          ${[
            { name:'Arun Manikonda', title:'Managing Director', sub:'Director on Board & KMP', init:'AM', phone:'+91 98108 89134', email:'akm@indiagully.com' },
            { name:'Pavan Manikonda', title:'Executive Director', sub:'Director on Board & KMP', init:'PM', phone:'+91 62825 56067', email:'pavan@indiagully.com' },
            { name:'Amit Jhingan', title:'President, Real Estate', sub:'Key Managerial Personnel', init:'AJ', phone:'+91 98999 93543', email:'amit.jhingan@indiagully.com' },
          ].map(p => `
          <div class="flex items-center gap-5 p-5 border border-ig-border hover:border-gold transition-colors group card-hover">
            <div class="w-14 h-14 bg-ig-dark flex items-center justify-center flex-shrink-0">
              <span class="font-serif text-gold font-bold text-lg">${p.init}</span>
            </div>
            <div class="flex-1">
              <h3 class="font-serif text-lg font-bold text-ig-dark group-hover:text-gold transition-colors">${p.name}</h3>
              <p class="text-sm text-gray-500">${p.title}</p>
              <p class="text-xs text-gray-400">${p.sub}</p>
            </div>
            <div class="text-right flex-shrink-0">
              <a href="tel:${p.phone.replace(/\s/g,'')}" class="block text-xs text-gray-400 hover:text-gold transition-colors mb-1"><i class="fas fa-phone mr-1"></i>${p.phone}</a>
              <a href="mailto:${p.email}" class="block text-xs text-gray-400 hover:text-gold transition-colors"><i class="fas fa-envelope mr-1"></i>${p.email}</a>
            </div>
          </div>
          `).join('')}
        </div>
      </div>
    </div>
  </section>

  <!-- CTA SECTION -->
  <section class="py-24 bg-ig-dark relative overflow-hidden">
    <div class="absolute inset-0" style="background:linear-gradient(135deg,rgba(197,160,40,.08) 0%,transparent 60%);"></div>
    <div class="relative max-w-4xl mx-auto px-6 text-center">
      <div class="gold-line-center mb-6">
        <span class="text-xs text-gold tracking-widest uppercase font-semibold">Get in Touch</span>
      </div>
      <h2 class="font-serif text-4xl lg:text-6xl font-bold text-white mb-6">Ready to Work<br>With India Gully?</h2>
      <p class="text-gray-400 text-xl mb-10 leading-relaxed">Whether you are a developer, investor, brand, or operator — we bring the advisory depth, network and execution capability to deliver results.</p>
      <div class="flex flex-wrap gap-4 justify-center">
        <a href="/contact" class="btn-gold inline-block">Submit a Mandate Enquiry</a>
        <a href="/listings" class="btn-outline-gold inline-block">View Active Mandates</a>
        <a href="/horeca" class="btn-outline-gold inline-block">HORECA Supply Enquiry</a>
      </div>
    </div>
  </section>

  <style>
    @keyframes ticker { from { transform:translateX(0); } to { transform:translateX(-50%); } }
  </style>
  `
  return c.html(layout('Home', content, {
    description: "India Gully — Celebrating Desiness. India's premier multi-vertical advisory firm across Real Estate, Retail, Hospitality, Entertainment, Debt & HORECA Solutions. Pan-India presence."
  }))
})

export default app
