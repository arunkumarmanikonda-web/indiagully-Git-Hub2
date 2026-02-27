import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

app.get('/', (c) => {
  const content = `
  <!-- ABOUT HERO -->
  <section class="relative py-32 bg-ig-dark overflow-hidden">
    <div class="absolute inset-0 opacity-5" style="background-image:linear-gradient(rgba(197,160,40,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(197,160,40,.3) 1px,transparent 1px);background-size:80px 80px;"></div>
    <div class="relative max-w-7xl mx-auto px-6">
      <div class="max-w-3xl fade-up">
        <div class="flex items-center gap-3 mb-6">
          <div class="h-px w-12 bg-gold"></div>
          <span class="text-gold text-xs font-semibold tracking-widest uppercase">About India Gully</span>
        </div>
        <h1 class="font-serif text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">Celebrating<br><em class="text-gold font-display">Desiness</em><br>Since 2017.</h1>
        <p class="text-gray-400 text-xl leading-relaxed">Vivacious Entertainment and Hospitality Pvt. Ltd. — a Delhi-based, multi-vertical enterprise advisory firm operating across Hospitality, Retail, Real Estate and Entertainment with a distinctly Indian identity.</p>
      </div>
    </div>
  </section>

  <!-- VISION & MISSION -->
  <section class="py-24 bg-white">
    <div class="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
      <div>
        <div class="gold-line">
          <span class="text-xs text-gold tracking-widest uppercase font-semibold">Our Purpose</span>
        </div>
        <h2 class="font-serif text-4xl font-bold text-ig-dark mt-3 mb-10">Vision &amp; Mission</h2>
        
        <div class="mb-8 p-8 border-l-4 border-gold bg-ig-cream">
          <div class="text-xs text-gold tracking-widest uppercase font-semibold mb-3">Vision</div>
          <p class="font-serif text-xl text-ig-dark leading-relaxed italic">"To be India's most respected diversified advisory enterprise — creating extraordinary experiences in hospitality and entertainment while delivering unmatched strategic value to our clients and stakeholders."</p>
        </div>
        
        <div class="p-8 border-l-4 border-ig-charcoal bg-ig-cream">
          <div class="text-xs text-ig-charcoal tracking-widest uppercase font-semibold mb-3">Mission</div>
          <p class="font-serif text-xl text-ig-dark leading-relaxed italic">"To combine deep sector expertise with operational excellence and global best practices, enabling our clients and ventures to achieve sustainable, scalable growth that benefits all stakeholders."</p>
        </div>
      </div>
      
      <div>
        <div class="gold-line">
          <span class="text-xs text-gold tracking-widest uppercase font-semibold">Core Values</span>
        </div>
        <h2 class="font-serif text-4xl font-bold text-ig-dark mt-3 mb-10">The Principles That Guide Us</h2>
        
        <div class="space-y-6">
          ${[
            { icon:'⚖️', name:'Integrity', desc:'Transparent, ethical conduct in every engagement. We act in the best interests of our clients and maintain the highest standards of professional ethics.' },
            { icon:'🏆', name:'Excellence', desc:'Relentless pursuit of the highest standards in everything we do — from mandate delivery to client communication and internal governance.' },
            { icon:'🤝', name:'Partnership', desc:'Long-term relationships built on trust, shared objectives and sustained value creation for clients, partners and the communities we operate in.' },
            { icon:'💡', name:'Innovation', desc:'Embracing new ideas, methodologies and technologies to solve complex challenges and create differentiated outcomes for our clients.' },
          ].map(v => `
          <div class="flex gap-5 p-5 hover:bg-ig-cream transition-colors group">
            <div class="text-3xl flex-shrink-0">${v.icon}</div>
            <div>
              <h3 class="font-serif text-lg font-bold text-ig-dark mb-1 group-hover:text-gold transition-colors">${v.name}</h3>
              <p class="text-gray-500 text-sm leading-relaxed">${v.desc}</p>
            </div>
          </div>
          `).join('')}
        </div>
      </div>
    </div>
  </section>

  <!-- TIMELINE -->
  <section class="py-24 bg-ig-cream">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <div class="gold-line-center">
          <span class="text-xs text-gold tracking-widest uppercase font-semibold">Our Story</span>
        </div>
        <h2 class="font-serif text-4xl lg:text-5xl font-bold text-ig-dark mt-3">A Legacy of Innovation</h2>
      </div>
      
      <div class="relative max-w-4xl mx-auto">
        <div class="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-ig-border md:-translate-x-px"></div>
        
        ${[
          { year:'2017', desc:'Incorporated as Vivacious Entertainment and Hospitality Pvt. Ltd. in New Delhi. Commenced advisory operations across Hospitality and Entertainment sectors with founding team.' },
          { year:'2018', desc:'Launched hotel management and pre-opening consultancy vertical. First mandates executed for Cygnett, Regenta and Radisson brand properties across North India.' },
          { year:'2019', desc:'Expanded into Real Estate consulting and Retail Leasing strategy — building a truly diversified advisory practice across four complementary verticals.' },
          { year:'2020', desc:'HORECA Supplies vertical launched. Providing end-to-end FF&E, OS&E and kitchen procurement for hotel pre-openings and renovations across India.' },
          { year:'2021', desc:'Launched India Gully brand identity, celebrating Desiness. Deepened retail leasing practice with 30+ brand relationships across fashion, F&B and entertainment.' },
          { year:'2023', desc:'Greenfield hotel projects in Hosur, Shirdi and Goa underway. Entertainment destination advisory scaled to ₹4,500 Cr pipeline. Debt & Special Situations vertical established.' },
          { year:'2024', desc:'Digital transformation initiative launched. India Gully Enterprise Platform (ERP) — integrated advisory management, governance and HORECA procurement system.' },
        ].map((t, i) => `
        <div class="relative flex md:items-center mb-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}">
          <div class="${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'} flex-1 pl-12 md:pl-0">
            <div class="bg-white p-6 border border-ig-border hover:border-gold transition-colors card-hover">
              <div class="font-serif text-3xl font-bold text-gold mb-2">${t.year}</div>
              <p class="text-gray-600 text-sm leading-relaxed">${t.desc}</p>
            </div>
          </div>
          <div class="absolute left-6 md:left-1/2 w-4 h-4 bg-gold border-4 border-white rounded-full md:-translate-x-2 z-10 flex-shrink-0"></div>
          <div class="flex-1 hidden md:block"></div>
        </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- LEADERSHIP TEAM -->
  <section class="py-24 bg-white" id="leadership">
    <div class="max-w-7xl mx-auto px-6">
      <div class="text-center mb-16">
        <div class="gold-line-center">
          <span class="text-xs text-gold tracking-widest uppercase font-semibold">Our People</span>
        </div>
        <h2 class="font-serif text-4xl lg:text-5xl font-bold text-ig-dark mt-3 mb-5">Board & Key Managerial<br>Personnel</h2>
        <p class="text-gray-500 text-lg max-w-2xl mx-auto">Our leadership team operates under the Companies Act, 2013 governance framework with full compliance to ICSI secretarial standards.</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        ${[
          { name:'Arun Manikonda', title:'Managing Director', role:'Director on Board & KMP', phone:'+91 9810889134', email:'akm@indiagully.com', init:'AM', bio:'Arun leads India Gully\'s strategic direction and client relationships, bringing deep expertise in multi-vertical enterprise advisory across hospitality, retail and real estate. As Managing Director and Director on Board, he oversees all major mandates and institutional partnerships.' },
          { name:'Pavan Manikonda', title:'Executive Director', role:'Director on Board & KMP', phone:'+91 6282556067', email:'pavan@indiagully.com', init:'PM', bio:'Pavan drives operational excellence and business development across India Gully\'s advisory verticals. As Executive Director and Director on Board, he leads execution across hospitality management, brand on-boarding and project delivery mandates.' },
          { name:'Amit Jhingan', title:'President, Real Estate', role:'Key Managerial Personnel (Not a Director)', phone:'+91 9899993543', email:'amit.jhingan@indiagully.com', init:'AJ', bio:'Amit leads India Gully\'s Real Estate advisory vertical as President — overseeing transaction advisory mandates, investment sales, asset management and real estate brokerage across commercial, hospitality and mixed-use assets nationwide.' },
        ].map(p => `
        <div class="border border-ig-border hover:border-gold transition-all duration-300 group card-hover">
          <!-- Profile Header -->
          <div class="p-8 bg-ig-dark text-center relative overflow-hidden">
            <div class="absolute inset-0" style="background:linear-gradient(135deg,rgba(197,160,40,.08),transparent);"></div>
            <div class="relative">
              <div class="w-20 h-20 mx-auto bg-gold flex items-center justify-center mb-4">
                <span class="font-serif text-2xl font-bold text-white">${p.init}</span>
              </div>
              <h3 class="font-serif text-xl font-bold text-white mb-1">${p.name}</h3>
              <p class="text-gold text-sm font-medium mb-1">${p.title}</p>
              <p class="text-gray-500 text-xs">${p.role}</p>
            </div>
          </div>
          <!-- Profile Body -->
          <div class="p-6">
            <p class="text-gray-500 text-sm leading-relaxed mb-5">${p.bio}</p>
            <div class="space-y-2">
              <a href="tel:${p.phone.replace(/\s/g,'')}" class="flex items-center gap-2 text-xs text-gray-400 hover:text-gold transition-colors">
                <i class="fas fa-phone w-4 text-gold"></i>${p.phone}
              </a>
              <a href="mailto:${p.email}" class="flex items-center gap-2 text-xs text-gray-400 hover:text-gold transition-colors">
                <i class="fas fa-envelope w-4 text-gold"></i>${p.email}
              </a>
            </div>
          </div>
        </div>
        `).join('')}
      </div>
      
      <!-- Governance Note -->
      <div class="mt-12 bg-ig-cream border border-ig-border p-6 max-w-3xl mx-auto text-center">
        <div class="text-xs text-gray-400 leading-relaxed">
          <i class="fas fa-shield-alt text-gold mr-2"></i>
          <strong class="text-ig-dark">Governance Note:</strong> India Gully operates under full compliance with the Companies Act, 2013. All Directors hold valid DIN as per MCA records. Board meetings, minutes and statutory registers are maintained per ICSI Secretarial Standards SS-1 and SS-2. MBP-1 and DIR-8 declarations are current.
        </div>
      </div>
    </div>
  </section>

  <!-- COMPANY INFORMATION -->
  <section class="py-24 bg-ig-dark">
    <div class="max-w-7xl mx-auto px-6">
      <div class="gold-line">
        <span class="text-xs text-gold tracking-widest uppercase font-semibold">Legal & Regulatory</span>
      </div>
      <h2 class="font-serif text-4xl font-bold text-white mt-3 mb-12">Company Information</h2>
      
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${[
          { label:'Legal Name', value:'Vivacious Entertainment and Hospitality Pvt. Ltd.' },
          { label:'Brand', value:'India Gully™' },
          { label:'CIN', value:'U74900DL2017PTC000000' },
          { label:'Incorporation', value:'2017, New Delhi, India' },
          { label:'Registered Office', value:'New Delhi, India' },
          { label:'GSTIN', value:'07XXXXXX000XXX' },
          { label:'Type', value:'Private Limited Company' },
          { label:'ROC', value:'Registrar of Companies, NCT of Delhi & Haryana' },
          { label:'Compliance', value:'Companies Act, 2013 · ICSI SS-1 & SS-2' },
        ].map(item => `
        <div class="p-5 border border-gray-700 hover:border-gold transition-colors">
          <div class="text-xs text-gray-600 uppercase tracking-widest mb-1">${item.label}</div>
          <div class="text-white font-medium text-sm">${item.value}</div>
        </div>
        `).join('')}
      </div>
    </div>
  </section>
  `
  return c.html(layout('About India Gully', content, {
    description: 'About India Gully — Celebrating Desiness since 2017. Learn about our leadership, vision, values and the story behind India\'s premier multi-vertical advisory firm.'
  }))
})

export default app
