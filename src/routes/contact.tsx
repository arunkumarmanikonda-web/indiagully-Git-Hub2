import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

app.get('/', (c) => {
  const service = c.req.query('service') || ''
  const mandate = c.req.query('mandate') || ''
  const type = c.req.query('type') || ''
  
  const content = `
  <!-- CONTACT HERO -->
  <section class="relative py-28 bg-ig-dark overflow-hidden">
    <div class="absolute inset-0 opacity-5" style="background-image:linear-gradient(rgba(197,160,40,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(197,160,40,.3) 1px,transparent 1px);background-size:80px 80px;"></div>
    <div class="relative max-w-7xl mx-auto px-6">
      <div class="max-w-3xl">
        <div class="flex items-center gap-3 mb-6">
          <div class="h-px w-12 bg-gold"></div>
          <span class="text-gold text-xs font-semibold tracking-widest uppercase">Get in Touch</span>
        </div>
        <h1 class="font-serif text-5xl lg:text-7xl font-bold text-white mb-6">Contact &amp;<br><em class="text-gold font-display">Mandate Enquiry</em></h1>
        <p class="text-gray-400 text-xl leading-relaxed">Whether you have a mandate to discuss, a HORECA procurement requirement, or wish to explore an investment opportunity — our leadership team is ready to respond within one business day.</p>
      </div>
    </div>
  </section>

  <!-- CONTACT MAIN -->
  <section class="py-16 bg-ig-cream">
    <div class="max-w-7xl mx-auto px-6 grid lg:grid-cols-3 gap-12">
      <!-- LEFT: Contact Info -->
      <div>
        <div class="gold-line">
          <span class="text-xs text-gold tracking-widest uppercase font-semibold">Direct Access</span>
        </div>
        <h2 class="font-serif text-3xl font-bold text-ig-dark mt-3 mb-8">Leadership<br>Contacts</h2>
        
        <div class="space-y-6">
          ${[
            { name:'Arun Manikonda', title:'Managing Director', init:'AM', phone:'+91 9810889134', email:'akm@indiagully.com', note:'MD — Director on Board & KMP' },
            { name:'Pavan Manikonda', title:'Executive Director', init:'PM', phone:'+91 6282556067', email:'pavan@indiagully.com', note:'ED — Director on Board & KMP' },
            { name:'Amit Jhingan', title:'President, Real Estate', init:'AJ', phone:'+91 9899993543', email:'amit.jhingan@indiagully.com', note:'KMP — Real Estate Vertical' },
          ].map(p => `
          <div class="bg-white border border-ig-border p-5 hover:border-gold transition-colors">
            <div class="flex items-center gap-4 mb-3">
              <div class="w-10 h-10 bg-ig-dark flex items-center justify-center flex-shrink-0">
                <span class="font-serif text-gold text-sm font-bold">${p.init}</span>
              </div>
              <div>
                <div class="font-semibold text-ig-dark text-sm">${p.name}</div>
                <div class="text-xs text-gray-400">${p.note}</div>
              </div>
            </div>
            <a href="tel:${p.phone.replace(/\s/g,'')}" class="flex items-center gap-2 text-xs text-gray-500 hover:text-gold transition-colors mb-1">
              <i class="fas fa-phone text-gold w-3"></i>${p.phone}
            </a>
            <a href="mailto:${p.email}" class="flex items-center gap-2 text-xs text-gray-500 hover:text-gold transition-colors">
              <i class="fas fa-envelope text-gold w-3"></i>${p.email}
            </a>
          </div>
          `).join('')}
        </div>
        
        <!-- General Contact -->
        <div class="mt-8 bg-ig-dark p-6">
          <h3 class="font-serif text-lg font-bold text-white mb-4">General Enquiries</h3>
          <div class="space-y-3 text-sm">
            <div class="flex items-center gap-3 text-gray-400">
              <i class="fas fa-envelope text-gold w-4"></i>
              <a href="mailto:info@indiagully.com" class="hover:text-gold transition-colors">info@indiagully.com</a>
            </div>
            <div class="flex items-start gap-3 text-gray-400">
              <i class="fas fa-map-marker-alt text-gold w-4 mt-0.5"></i>
              <span>New Delhi, India</span>
            </div>
            <div class="flex items-center gap-3 text-gray-400">
              <i class="fas fa-clock text-gold w-4"></i>
              <span>Mon–Sat, 9:30am–6:30pm IST</span>
            </div>
          </div>
        </div>
        
        <!-- Portal Links -->
        <div class="mt-6">
          <h4 class="font-serif text-lg font-bold text-ig-dark mb-4">Secure Portals</h4>
          <div class="space-y-2">
            ${[
              { href:'/portal/client', icon:'user-tie', name:'Client Portal', desc:'Proposals, invoices, documents' },
              { href:'/portal/employee', icon:'users', name:'Employee Portal', desc:'HR, payslips, leave' },
              { href:'/portal/board', icon:'gavel', name:'Board & KMP Portal', desc:'Governance, meetings, MIS' },
            ].map(p => `
            <a href="${p.href}" class="flex items-center gap-4 p-4 bg-white border border-ig-border hover:border-gold transition-colors group">
              <i class="fas fa-${p.icon} text-gold w-5 text-center"></i>
              <div>
                <div class="text-sm font-medium text-ig-dark group-hover:text-gold transition-colors">${p.name}</div>
                <div class="text-xs text-gray-400">${p.desc}</div>
              </div>
              <i class="fas fa-lock text-gray-300 ml-auto text-xs"></i>
            </a>
            `).join('')}
          </div>
        </div>
      </div>
      
      <!-- RIGHT: Enquiry Form -->
      <div class="lg:col-span-2">
        <div class="bg-white border border-ig-border p-8">
          <div class="gold-line">
            <span class="text-xs text-gold tracking-widest uppercase font-semibold">Send an Enquiry</span>
          </div>
          <h2 class="font-serif text-3xl font-bold text-ig-dark mt-3 mb-6">Submit Mandate or<br>Service Enquiry</h2>
          
          <form class="ig-form" method="POST" action="/api/enquiry">
            <input type="hidden" name="preservice" value="${service}">
            <input type="hidden" name="premandate" value="${mandate}">
            <input type="hidden" name="pretype" value="${type}">
            
            <!-- Enquiry Type -->
            <div class="mb-6">
              <label class="ig-label">Enquiry Type *</label>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
                ${[
                  { val:'mandate', label:'Transaction Mandate', icon:'fa-file-contract' },
                  { val:'advisory', label:'Advisory Services', icon:'fa-chart-line' },
                  { val:'horeca', label:'HORECA Supply', icon:'fa-utensils' },
                  { val:'investment', label:'Investment Opportunity', icon:'fa-building' },
                  { val:'nda', label:'Execute NDA', icon:'fa-lock' },
                  { val:'general', label:'General Enquiry', icon:'fa-comment' },
                ].map(et => `
                <label class="flex items-center gap-2 p-3 border border-ig-border hover:border-gold transition-colors cursor-pointer text-sm has-[:checked]:border-gold has-[:checked]:bg-gold-pale">
                  <input type="radio" name="enquiry_type" value="${et.val}" class="accent-gold" ${type === et.val ? 'checked' : ''}>
                  <i class="fas ${et.icon} text-gold text-xs w-3"></i>
                  <span class="font-medium text-ig-dark">${et.label}</span>
                </label>
                `).join('')}
              </div>
            </div>
            
            <div class="grid md:grid-cols-2 gap-5 mb-5">
              <div>
                <label class="ig-label">Full Name *</label>
                <input type="text" name="name" class="ig-input" required placeholder="Your full name">
              </div>
              <div>
                <label class="ig-label">Designation / Role</label>
                <input type="text" name="designation" class="ig-input" placeholder="Director, CEO, CFO, etc.">
              </div>
              <div>
                <label class="ig-label">Organisation *</label>
                <input type="text" name="org" class="ig-input" required placeholder="Company name">
              </div>
              <div>
                <label class="ig-label">Phone Number *</label>
                <input type="tel" name="phone" class="ig-input" required placeholder="+91 XXXXX XXXXX">
              </div>
              <div>
                <label class="ig-label">Email Address *</label>
                <input type="email" name="email" class="ig-input" required placeholder="you@company.com">
              </div>
              <div>
                <label class="ig-label">City / Location</label>
                <input type="text" name="location" class="ig-input" placeholder="Delhi, Mumbai, etc.">
              </div>
            </div>
            
            <div class="mb-5">
              <label class="ig-label">Vertical of Interest</label>
              <select name="vertical" class="ig-input">
                <option value="">Select Vertical</option>
                <option value="real-estate" ${service === 'real-estate' ? 'selected' : ''}>Real Estate Advisory</option>
                <option value="retail" ${service === 'retail' ? 'selected' : ''}>Retail & Leasing</option>
                <option value="hospitality" ${service === 'hospitality' ? 'selected' : ''}>Hospitality Management</option>
                <option value="entertainment" ${service === 'entertainment' ? 'selected' : ''}>Entertainment Advisory</option>
                <option value="debt" ${service === 'debt' ? 'selected' : ''}>Debt & Special Situations</option>
                <option value="horeca">HORECA Solutions</option>
                <option value="multiple">Multiple Verticals</option>
              </select>
            </div>
            
            <div class="mb-5">
              <label class="ig-label">Brief Description of Your Requirement *</label>
              <textarea name="message" class="ig-input" rows="5" required placeholder="Please describe your requirement in detail. For mandates: asset type, location, size, investment scale, timeline. For HORECA: project type, quantity, delivery date. For advisory: current situation and objectives..."></textarea>
            </div>
            
            <div class="mb-5">
              <label class="ig-label">Investment Scale / Budget (Optional)</label>
              <select name="scale" class="ig-input">
                <option value="">Select Range</option>
                <option>Under ₹10 Cr</option>
                <option>₹10 Cr — ₹50 Cr</option>
                <option>₹50 Cr — ₹200 Cr</option>
                <option>₹200 Cr — ₹500 Cr</option>
                <option>₹500 Cr — ₹2,000 Cr</option>
                <option>₹2,000 Cr+</option>
                <option>Prefer not to disclose</option>
              </select>
            </div>
            
            <div class="mb-6 flex items-start gap-3">
              <input type="checkbox" name="nda_consent" id="nda_consent" class="mt-1 accent-gold">
              <label for="nda_consent" class="text-xs text-gray-500 leading-relaxed">I understand that India Gully will treat all information shared as strictly confidential and may request execution of a mutual NDA before sharing detailed mandate information. I consent to being contacted by the India Gully team regarding my enquiry.</label>
            </div>
            
            <button type="submit" class="btn-gold w-full text-sm">
              <i class="fas fa-paper-plane mr-2"></i>Submit Enquiry to India Gully
            </button>
            
            <p class="text-xs text-gray-400 text-center mt-4">We aim to respond within 1 business day. For urgent matters, please call directly.</p>
          </form>
        </div>
      </div>
    </div>
  </section>
  `
  return c.html(layout('Contact & Mandate Enquiry', content, {
    description: 'Contact India Gully — submit a mandate enquiry, explore advisory services or request a HORECA supply quotation. Leadership team contacts provided.'
  }))
})

export default app
