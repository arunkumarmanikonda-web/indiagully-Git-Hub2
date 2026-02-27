import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

const SERVICES = [
  {
    id: 'real-estate',
    icon: '🏛️',
    name: 'Real Estate Advisory',
    tagline: 'Transaction Advisory & Asset Management',
    desc: 'Strategic advice across the hospitality and commercial real estate value chain — from site selection and development planning to asset management, lease structuring and divestment advisory. India Gully acts exclusively as Transaction Advisor on all real estate mandates.',
    offerings: ['Site selection & acquisition advisory','Asset valuation & portfolio review','Development strategy & operator selection','Lease structuring & tenant mix','Asset divestment & exit advisory','Commercial due diligence','Investment Information Memoranda','NDA-based mandate execution'],
    highlight: 'Transaction advisors to ₹2,100 Cr+ Mumbai MMR retail hub',
  },
  {
    id: 'retail',
    icon: '🛍️',
    name: 'Retail & Leasing Strategy',
    tagline: 'Mall Strategy · Brand Mix · Fit-Out Coordination',
    desc: 'We develop creative retail concepts, positioning and brand mix strategies — creating value-added partnerships between landlords and tenants that drive footfall, sales and sustainable retail success across India\'s malls and mixed-use developments.',
    offerings: ['Market research & demand assessment','Retail strategy & brand mix planning','Anchor & in-line leasing execution','Space design & architectural zoning','Tenant fit-out coordination','Signage & interactive media planning','Property management setup','Off-plan to opening support'],
    highlight: '30+ retail brand relationships including H&M, Zara, PVR, Starbucks',
  },
  {
    id: 'hospitality',
    icon: '🏨',
    name: 'Hospitality Management',
    tagline: 'Pre-Opening · Brand On-Boarding · Full Management',
    desc: 'Strategic and turnkey management consultants to hotels across India — from pre-opening planning and brand on-boarding to full hotel management, operations advisory and revenue strategy. Our deep relationships with 20+ hospitality brands give every project the right brand fit.',
    offerings: ['Pre-opening planning & management','Brand identification & on-boarding','Full hotel management contracts','Revenue & yield management','Staff recruitment & training','FF&E & OS&E procurement','Mock-up room execution','Asset management advisory'],
    highlight: '15+ hotel projects across Marriott, Radisson, Cygnett, Regenta brands',
  },
  {
    id: 'entertainment',
    icon: '🎡',
    name: 'Entertainment Advisory',
    tagline: 'Theme Parks · FECs · Integrated Destinations',
    desc: 'Specialised advisory for leisure, entertainment and theme park projects — one of our most distinctive capabilities, with landmark engagements including integrated entertainment destinations with investment scales of ₹1,200 Cr to ₹4,500 Cr.',
    offerings: ['Concept development & master planning','Commercial & financial feasibility','Operator selection & contract structuring','Attraction & experience design advisory','Revenue optimisation strategies','Integrated destination planning','Family Entertainment Centres (FECs)','Indoor & outdoor entertainment'],
    highlight: 'Co-advisors to ₹4,500 Cr integrated entertainment destination in Maharashtra',
  },
  {
    id: 'debt',
    icon: '⚖️',
    name: 'Debt & Special Situations',
    tagline: 'Structured Debt · Distressed Assets · Special Mandates',
    desc: 'Advisory on structured debt transactions, distressed asset resolution and special situation mandates in the hospitality, retail and real estate sectors. We bring deep sector knowledge to complex financial situations requiring both transactional and operational expertise.',
    offerings: ['Structured debt advisory','Distressed asset identification & resolution','One-time settlement (OTS) advisory','Asset reconstruction & turnaround','Lender negotiations & restructuring','NCLT/IBC advisory support','Special purpose mandates','Financial due diligence'],
    highlight: 'Experienced in IBC/NCLT hospitality asset resolutions',
  },
]

app.get('/', (c) => {
  const content = `
  <!-- SERVICES HERO -->
  <section class="relative py-32 bg-ig-dark overflow-hidden">
    <div class="absolute inset-0 opacity-5" style="background-image:linear-gradient(rgba(197,160,40,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(197,160,40,.3) 1px,transparent 1px);background-size:80px 80px;"></div>
    <div class="relative max-w-7xl mx-auto px-6">
      <div class="max-w-3xl">
        <div class="flex items-center gap-3 mb-6">
          <div class="h-px w-12 bg-gold"></div>
          <span class="text-gold text-xs font-semibold tracking-widest uppercase">Advisory Verticals</span>
        </div>
        <h1 class="font-serif text-5xl lg:text-7xl font-bold text-white mb-6">Strategy, Management<br>&amp; <em class="text-gold font-display">Execution</em>.<br>All Under One Roof.</h1>
        <p class="text-gray-400 text-xl leading-relaxed">From hotel management and retail leasing to HORECA procurement and entertainment advisory — we are end-to-end partners for India's hospitality and real estate ecosystem.</p>
      </div>
    </div>
  </section>

  <!-- SERVICE NAV TABS -->
  <div class="sticky top-20 z-40 bg-white border-b border-ig-border">
    <div class="max-w-7xl mx-auto px-6 flex overflow-x-auto">
      <a href="#real-estate" class="service-tab flex-shrink-0 px-6 py-4 text-sm font-medium text-gray-500 hover:text-gold border-b-2 border-transparent hover:border-gold transition-all">Real Estate</a>
      <a href="#retail" class="service-tab flex-shrink-0 px-6 py-4 text-sm font-medium text-gray-500 hover:text-gold border-b-2 border-transparent hover:border-gold transition-all">Retail & Leasing</a>
      <a href="#hospitality" class="service-tab flex-shrink-0 px-6 py-4 text-sm font-medium text-gray-500 hover:text-gold border-b-2 border-transparent hover:border-gold transition-all">Hospitality</a>
      <a href="#entertainment" class="service-tab flex-shrink-0 px-6 py-4 text-sm font-medium text-gray-500 hover:text-gold border-b-2 border-transparent hover:border-gold transition-all">Entertainment</a>
      <a href="#debt" class="service-tab flex-shrink-0 px-6 py-4 text-sm font-medium text-gray-500 hover:text-gold border-b-2 border-transparent hover:border-gold transition-all">Debt & Special</a>
      <a href="/horeca" class="service-tab flex-shrink-0 px-6 py-4 text-sm font-medium text-gold border-b-2 border-gold transition-all">HORECA Solutions →</a>
    </div>
  </div>

  <!-- SERVICE SECTIONS -->
  ${SERVICES.map((s, i) => `
  <section id="${s.id}" class="py-24 ${i % 2 === 0 ? 'bg-white' : 'bg-ig-cream'}">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid lg:grid-cols-2 gap-16 items-start">
        <div>
          <div class="text-6xl mb-6">${s.icon}</div>
          <div class="gold-line">
            <span class="text-xs text-gold tracking-widest uppercase font-semibold">${s.tagline}</span>
          </div>
          <h2 class="font-serif text-4xl lg:text-5xl font-bold text-ig-dark mt-3 mb-5">${s.name}</h2>
          <p class="text-gray-500 text-lg leading-relaxed mb-8">${s.desc}</p>
          
          <div class="bg-ig-dark p-6 mb-8">
            <div class="flex items-start gap-3">
              <i class="fas fa-star text-gold mt-1"></i>
              <div>
                <div class="text-xs text-gray-500 uppercase tracking-wider mb-1">Track Record Highlight</div>
                <p class="text-white font-medium text-sm">${s.highlight}</p>
              </div>
            </div>
          </div>
          
          <div class="flex gap-4">
            <a href="/contact?service=${s.id}" class="btn-gold inline-block">Enquire About This Service</a>
            <a href="/listings" class="btn-outline-gold inline-block">View Mandates</a>
          </div>
        </div>
        
        <div>
          <h3 class="font-serif text-2xl font-bold text-ig-dark mb-6">Service Scope</h3>
          <div class="grid grid-cols-1 gap-3">
            ${s.offerings.map((o, j) => `
            <div class="flex items-center gap-4 p-4 border border-ig-border hover:border-gold transition-colors group">
              <div class="w-8 h-8 bg-gold flex items-center justify-center flex-shrink-0">
                <span class="text-white text-xs font-bold">${String(j+1).padStart(2,'0')}</span>
              </div>
              <span class="text-gray-700 text-sm group-hover:text-ig-dark transition-colors font-medium">${o}</span>
            </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  </section>
  `).join('')}

  <!-- CTA -->
  <section class="py-24 bg-ig-dark">
    <div class="max-w-4xl mx-auto px-6 text-center">
      <div class="gold-line-center mb-6">
        <span class="text-xs text-gold tracking-widest uppercase font-semibold">Let's Work Together</span>
      </div>
      <h2 class="font-serif text-4xl lg:text-5xl font-bold text-white mb-5">Have a Mandate to Discuss?</h2>
      <p class="text-gray-400 text-xl mb-10">Our team is ready to assess your requirement and structure the right advisory engagement.</p>
      <div class="flex flex-wrap gap-4 justify-center">
        <a href="/contact" class="btn-gold inline-block">Submit Mandate Enquiry</a>
        <a href="/horeca" class="btn-outline-gold inline-block">HORECA Solutions</a>
      </div>
    </div>
  </section>
  `
  return c.html(layout('Advisory Services', content, {
    description: 'India Gully advisory services — Real Estate, Retail Leasing, Hospitality Management, Entertainment Advisory, Debt & Special Situations and HORECA Solutions.'
  }))
})

export default app
