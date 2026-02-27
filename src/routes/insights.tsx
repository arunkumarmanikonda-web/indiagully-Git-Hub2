import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

const INSIGHTS = [
  { id:'real-estate-outlook-2024', cat:'Real Estate', tag:'Market Intelligence', title:'Indian Real Estate 2024: The Advisory Mandate Landscape', date:'December 2024', readTime:'8 min', excerpt:'As institutional capital flows back into India\'s hospitality and mixed-use real estate sector, transaction advisory mandates have surged. We analyse deal structures, pricing benchmarks and investor appetite across Tier 1 and 2 cities.' },
  { id:'hotel-brand-selection', cat:'Hospitality', tag:'Brand Advisory', title:'Choosing the Right Hotel Brand: A Framework for Indian Developers', date:'November 2024', readTime:'12 min', excerpt:'With 35+ international and domestic hotel brands competing for management contracts in India, developers face complex brand selection decisions. Our framework evaluates brand fit, fee structures, FF&E requirements and long-term IRR impact.' },
  { id:'entertainment-destinations-india', cat:'Entertainment', tag:'Sector Study', title:'India\'s Entertainment Destination Boom: Opportunity & Execution Risks', date:'October 2024', readTime:'10 min', excerpt:'From ₹4,500 Cr integrated entertainment destinations to 10,000 sq ft FECs, India\'s entertainment sector is witnessing unprecedented investment appetite. We assess concept viability, catchment analysis and operator landscape.' },
  { id:'horeca-procurement', cat:'HORECA', tag:'Operational Guide', title:'Pre-Opening HORECA Procurement: A 36-Point Checklist for Hotel GMs', date:'September 2024', readTime:'6 min', excerpt:'Pre-opening FF&E and OS&E procurement is one of the highest-risk phases of hotel development. This operational guide provides a structured approach to specification, vendor selection, timeline management and quality control.' },
  { id:'retail-leasing-strategy', cat:'Retail', tag:'Strategy', title:'Retail Leasing Strategy in India 2024: Beyond Anchor Dependency', date:'August 2024', readTime:'9 min', excerpt:'As traditional anchor tenant models face pressure from e-commerce and experience retail, mall developers need a more sophisticated approach to brand mix, zoning and lease structuring. We examine emerging models from our leasing practice.' },
  { id:'debt-special-situations-hospitality', cat:'Debt & Special Situations', tag:'Advisory Note', title:'Hospitality Asset Distress in India: IBC, NCLT and Value Recovery', date:'July 2024', readTime:'11 min', excerpt:'With a significant stock of stressed hospitality assets emerging from post-pandemic restructuring and IBC proceedings, specialised advisory is critical for lenders, acquirers and resolution professionals navigating these complex situations.' },
]

app.get('/', (c) => {
  const content = `
  <!-- INSIGHTS HERO -->
  <section class="relative py-28 bg-ig-dark overflow-hidden">
    <div class="absolute inset-0 opacity-5" style="background-image:linear-gradient(rgba(197,160,40,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(197,160,40,.3) 1px,transparent 1px);background-size:80px 80px;"></div>
    <div class="relative max-w-7xl mx-auto px-6">
      <div class="max-w-3xl">
        <div class="flex items-center gap-3 mb-6">
          <div class="h-px w-12 bg-gold"></div>
          <span class="text-gold text-xs font-semibold tracking-widest uppercase">Thought Leadership</span>
        </div>
        <h1 class="font-serif text-5xl lg:text-7xl font-bold text-white mb-6">Insights &amp;<br><em class="text-gold font-display">Research</em></h1>
        <p class="text-gray-400 text-xl leading-relaxed">Market intelligence, sector research and advisory perspectives from India Gully's leadership team — across Real Estate, Hospitality, Retail, Entertainment and HORECA.</p>
      </div>
    </div>
  </section>

  <!-- INSIGHTS GRID -->
  <section class="py-20 bg-ig-cream">
    <div class="max-w-7xl mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${INSIGHTS.map(ins => `
        <article class="bg-white border border-ig-border group card-hover overflow-hidden">
          <!-- Article Header -->
          <div class="p-7 border-b border-ig-border bg-ig-dark relative overflow-hidden h-40 flex flex-col justify-end">
            <div class="absolute inset-0" style="background:linear-gradient(135deg,rgba(197,160,40,.05),transparent);"></div>
            <div class="relative">
              <div class="flex items-center gap-2 mb-2">
                <span class="badge badge-gold text-xs">${ins.tag}</span>
              </div>
              <div class="text-xs text-gray-500">${ins.cat}</div>
            </div>
          </div>
          
          <!-- Article Body -->
          <div class="p-7">
            <h2 class="font-serif text-xl font-bold text-ig-dark mb-3 leading-snug group-hover:text-gold transition-colors">${ins.title}</h2>
            <p class="text-gray-500 text-sm leading-relaxed mb-5">${ins.excerpt}</p>
            
            <div class="flex items-center justify-between text-xs text-gray-400">
              <div class="flex items-center gap-3">
                <span><i class="fas fa-calendar mr-1 text-gold"></i>${ins.date}</span>
                <span><i class="fas fa-clock mr-1 text-gold"></i>${ins.readTime} read</span>
              </div>
              <a href="/insights/${ins.id}" class="text-gold hover:underline font-semibold flex items-center gap-1">
                Read <i class="fas fa-arrow-right text-xs"></i>
              </a>
            </div>
          </div>
        </article>
        `).join('')}
      </div>
      
      <div class="mt-12 text-center">
        <div class="bg-white border border-ig-border p-8 max-w-2xl mx-auto">
          <h3 class="font-serif text-2xl font-bold text-ig-dark mb-3">Subscribe to India Gully Insights</h3>
          <p class="text-gray-500 text-sm mb-6">Receive our market intelligence reports, sector analyses and mandate updates directly in your inbox.</p>
          <form class="ig-form flex gap-3" method="POST" action="/api/subscribe">
            <input type="email" name="email" class="ig-input flex-1" placeholder="your@email.com" required>
            <button type="submit" class="btn-gold flex-shrink-0">Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  </section>
  `
  return c.html(layout('Insights & Research', content, {
    description: 'India Gully Insights — market intelligence, sector research and thought leadership across Real Estate, Hospitality, Retail, Entertainment and HORECA.'
  }))
})

app.get('/:id', (c) => {
  const id = c.req.param('id')
  const insight = INSIGHTS.find(i => i.id === id)
  if (!insight) return c.redirect('/insights')
  
  const content = `
  <div class="bg-white border-b border-ig-border">
    <div class="max-w-7xl mx-auto px-6 py-3 text-sm">
      <a href="/insights" class="text-gray-400 hover:text-gold">← All Insights</a>
      <span class="text-gray-300 mx-2">/</span>
      <span class="text-ig-dark">${insight.cat}</span>
    </div>
  </div>
  
  <section class="py-16 bg-ig-cream">
    <div class="max-w-4xl mx-auto px-6">
      <div class="bg-white border border-ig-border p-10">
        <div class="flex items-center gap-3 mb-5">
          <span class="badge badge-gold">${insight.tag}</span>
          <span class="text-xs text-gray-400">${insight.cat}</span>
          <span class="text-xs text-gray-400">${insight.date}</span>
          <span class="text-xs text-gray-400">${insight.readTime} read</span>
        </div>
        
        <h1 class="font-serif text-4xl font-bold text-ig-dark mb-6 leading-tight">${insight.title}</h1>
        
        <div class="border-l-4 border-gold pl-6 mb-8">
          <p class="text-lg text-gray-600 font-serif italic leading-relaxed">${insight.excerpt}</p>
        </div>
        
        <div class="prose max-w-none text-gray-600 leading-relaxed space-y-5">
          <p>India Gully's advisory practice provides privileged access to market intelligence gathered across our active mandate portfolio, brand relationships and institutional network. The insights presented in this article are based on primary research, client engagements and market observations — not publicly available data alone.</p>
          
          <p class="text-ig-dark font-semibold">Full Content Available to Registered Users</p>
          
          <p>This research paper is available in full to registered India Gully portal users and NDA counterparties. To access the complete article, including our proprietary data, benchmarks and recommendations, please login to the Client Portal or submit your details below.</p>
        </div>
        
        <div class="mt-10 bg-ig-cream border border-ig-border p-6">
          <h3 class="font-serif text-xl font-bold text-ig-dark mb-4">Access Full Research</h3>
          <form class="ig-form grid md:grid-cols-3 gap-4" method="POST" action="/api/insight-request">
            <input type="hidden" name="insight" value="${insight.id}">
            <div>
              <label class="ig-label">Name</label>
              <input type="text" name="name" class="ig-input" placeholder="Your name" required>
            </div>
            <div>
              <label class="ig-label">Email</label>
              <input type="email" name="email" class="ig-input" placeholder="your@email.com" required>
            </div>
            <div class="flex items-end">
              <button type="submit" class="btn-gold w-full">Request Access</button>
            </div>
          </form>
        </div>
        
        <div class="mt-8 pt-8 border-t border-ig-border">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-ig-dark flex items-center justify-center">
              <span class="font-serif text-gold font-bold">IG</span>
            </div>
            <div>
              <p class="font-semibold text-ig-dark text-sm">India Gully Research</p>
              <p class="text-xs text-gray-400">Vivacious Entertainment and Hospitality Pvt. Ltd.</p>
              <p class="text-xs text-gold mt-1">info@indiagully.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  `
  return c.html(layout(insight.title, content, {
    description: insight.excerpt.slice(0, 160)
  }))
})

export default app
