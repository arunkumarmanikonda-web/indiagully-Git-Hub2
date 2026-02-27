import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

app.get('/', (c) => {
  const service = c.req.query('service') || ''
  const mandate = c.req.query('mandate') || ''

  const content = `

<!-- CONTACT HERO -->
<div style="background:var(--ink);padding:7rem 0 5rem;position:relative;overflow:hidden;">
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.05) 1px,transparent 1px);background-size:72px 72px;"></div>
  <div class="wrap" style="position:relative;">
    <div style="max-width:680px;" class="fu">
      <div class="gr-lt"></div>
      <p class="eyebrow" style="margin-bottom:.875rem;">Contact &amp; Enquiries</p>
      <h1 class="h1" style="margin-bottom:1.5rem;">Let's Work<br><em style="color:var(--gold);font-style:italic;">Together</em></h1>
      <p class="lead-lt" style="max-width:520px;">Submit a mandate enquiry, request an information memorandum, arrange a HORECA quote or contact our leadership team directly. We respond within 24 hours.</p>
    </div>
  </div>
</div>

<!-- MAIN CONTENT -->
<div class="sec-pc">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:1.5fr 1fr;gap:4rem;align-items:start;">

      <!-- ENQUIRY FORM -->
      <div>
        <div class="gr"></div>
        <p class="eyebrow" style="margin-bottom:.75rem;">Mandate Enquiry</p>
        <h2 class="h2" style="margin-bottom:2rem;">Submit Your Enquiry</h2>

        <form class="ig-form" method="POST" action="/api/enquiry" style="display:flex;flex-direction:column;gap:1.25rem;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
            <div>
              <label class="ig-lbl">Full Name *</label>
              <input type="text" name="name" class="ig-inp" required placeholder="Your full name">
            </div>
            <div>
              <label class="ig-lbl">Organisation *</label>
              <input type="text" name="organisation" class="ig-inp" required placeholder="Company / fund name">
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
            <div>
              <label class="ig-lbl">Email Address *</label>
              <input type="email" name="email" class="ig-inp" required placeholder="your@email.com">
            </div>
            <div>
              <label class="ig-lbl">Phone Number *</label>
              <input type="tel" name="phone" class="ig-inp" required placeholder="+91 XXXXX XXXXX">
            </div>
          </div>

          <div>
            <label class="ig-lbl">Enquiry Type *</label>
            <select name="type" class="ig-inp" required>
              <option value="">Select enquiry type</option>
              <option value="mandate" ${mandate ? 'selected' : ''}>Investment Mandate Enquiry</option>
              <option value="real-estate" ${service === 'real-estate' ? 'selected' : ''}>Real Estate Advisory</option>
              <option value="retail" ${service === 'retail' ? 'selected' : ''}>Retail &amp; Leasing Strategy</option>
              <option value="hospitality" ${service === 'hospitality' ? 'selected' : ''}>Hospitality Management</option>
              <option value="entertainment" ${service === 'entertainment' ? 'selected' : ''}>Entertainment Advisory</option>
              <option value="debt" ${service === 'debt' ? 'selected' : ''}>Debt &amp; Special Situations</option>
              <option value="horeca">HORECA Procurement</option>
              <option value="general">General Enquiry</option>
            </select>
          </div>

          ${mandate ? `
          <div>
            <label class="ig-lbl">Related Mandate</label>
            <input type="text" name="mandate" class="ig-inp" value="${mandate}" readonly style="background:var(--parch-dk);cursor:not-allowed;">
          </div>
          ` : ''}

          <div>
            <label class="ig-lbl">Investment / Transaction Scale</label>
            <select name="scale" class="ig-inp">
              <option value="">Select range (if applicable)</option>
              <option>Under ₹10 Crore</option>
              <option>₹10 Cr – ₹50 Crore</option>
              <option>₹50 Cr – ₹200 Crore</option>
              <option>₹200 Cr – ₹500 Crore</option>
              <option>₹500 Cr – ₹1,000 Crore</option>
              <option>₹1,000 Crore+</option>
            </select>
          </div>

          <div>
            <label class="ig-lbl">How Did You Hear About Us</label>
            <select name="source" class="ig-inp">
              <option value="">Select source</option>
              <option>Referral / Network</option>
              <option>Google Search</option>
              <option>LinkedIn</option>
              <option>Industry Event</option>
              <option>Publication / Media</option>
              <option>Existing Client</option>
            </select>
          </div>

          <div>
            <label class="ig-lbl">Your Message / Requirements *</label>
            <textarea name="message" class="ig-inp" required placeholder="Describe your project, mandate or enquiry in detail. Include location, scale, timeline and what you're looking for from India Gully."></textarea>
          </div>

          <div style="display:flex;align-items:flex-start;gap:.625rem;">
            <input type="checkbox" name="consent" id="consent" required style="accent-color:var(--gold);margin-top:.2rem;flex-shrink:0;">
            <label for="consent" style="font-size:.75rem;color:var(--ink-muted);cursor:pointer;line-height:1.6;">I confirm that I am submitting this enquiry in good faith and understand that India Gully will maintain confidentiality of all information shared. I consent to being contacted by the India Gully team.</label>
          </div>

          <button type="submit" class="btn btn-g" style="width:100%;justify-content:center;padding:.875rem;">
            <i class="fas fa-paper-plane" style="margin-right:.5rem;"></i>Submit Enquiry
          </button>
          <p style="font-size:.7rem;color:var(--ink-faint);text-align:center;">We respond within 24 business hours. All enquiries are strictly confidential.</p>
        </form>
      </div>

      <!-- CONTACT INFO SIDEBAR -->
      <div style="display:flex;flex-direction:column;gap:1.5rem;">

        <!-- Company -->
        <div style="background:var(--ink);padding:2rem;">
          <p class="eyebrow-lt" style="margin-bottom:1.25rem;">India Gully</p>
          <p style="font-size:.78rem;color:rgba(255,255,255,.35);line-height:1.75;margin-bottom:1.25rem;">Vivacious Entertainment and Hospitality Pvt. Ltd.<br>New Delhi, India</p>
          <div style="display:flex;flex-direction:column;gap:.75rem;">
            <a href="tel:+919810889134" style="display:flex;align-items:center;gap:.625rem;font-size:.825rem;color:rgba(255,255,255,.5);transition:color .2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.5)'">
              <i class="fas fa-phone" style="color:var(--gold);width:14px;font-size:.68rem;"></i>+91 98108 89134
            </a>
            <a href="mailto:info@indiagully.com" style="display:flex;align-items:center;gap:.625rem;font-size:.825rem;color:rgba(255,255,255,.5);transition:color .2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.5)'">
              <i class="fas fa-envelope" style="color:var(--gold);width:14px;font-size:.68rem;"></i>info@indiagully.com
            </a>
          </div>
        </div>

        <!-- Leadership Direct -->
        <div style="background:#fff;border:1px solid var(--border);padding:1.75rem;">
          <p style="font-size:.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:1.25rem;">Leadership Direct</p>
          <div style="display:flex;flex-direction:column;gap:1.25rem;">
            ${[
              { name:'Arun Manikonda',  title:'Managing Director',     ph:'+91 9810889134', em:'akm@indiagully.com',          init:'AM' },
              { name:'Pavan Manikonda', title:'Executive Director',     ph:'+91 6282556067', em:'pavan@indiagully.com',        init:'PM' },
              { name:'Amit Jhingan',    title:'President, Real Estate', ph:'+91 9899993543', em:'amit.jhingan@indiagully.com', init:'AJ' },
            ].map(p => `
            <div style="display:flex;gap:.875rem;align-items:center;padding-bottom:1.25rem;border-bottom:1px solid var(--border);" class="last:border-0 last:pb-0">
              <div style="width:40px;height:40px;background:var(--ink);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <span style="font-family:'DM Serif Display',Georgia,serif;font-size:.85rem;color:var(--gold);font-weight:700;">${p.init}</span>
              </div>
              <div style="flex:1;min-width:0;">
                <div style="font-size:.825rem;font-weight:600;color:var(--ink);margin-bottom:.1rem;">${p.name}</div>
                <div class="caption" style="margin-bottom:.3rem;">${p.title}</div>
                <a href="tel:${p.ph}" style="display:block;font-size:.72rem;color:var(--ink-muted);transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-muted)'">${p.ph}</a>
                <a href="mailto:${p.em}" style="display:block;font-size:.72rem;color:var(--ink-muted);transition:color .2s;overflow:hidden;text-overflow:ellipsis;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-muted)'">${p.em}</a>
              </div>
            </div>
            `).join('')}
          </div>
        </div>

        <!-- Portal Links -->
        <div style="background:var(--parch-dk);border:1px solid var(--border);padding:1.5rem;">
          <p style="font-size:.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:1rem;">Secure Portals</p>
          <div style="display:flex;flex-direction:column;gap:.5rem;">
            ${[
              { href:'/portal/client',   icon:'user-tie',   label:'Client Portal',   sub:'Proposals, invoices, documents' },
              { href:'/portal/employee', icon:'users',      label:'Employee Portal', sub:'HR, attendance, payslips' },
              { href:'/portal/board',    icon:'gavel',      label:'Board & KMP',     sub:'Governance, meetings, financials' },
            ].map(p => `
            <a href="${p.href}" style="display:flex;align-items:center;gap:.75rem;padding:.625rem .875rem;border:1px solid var(--border);background:#fff;transition:border-color .2s;" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='var(--border)'">
              <i class="fas fa-${p.icon}" style="color:var(--gold);font-size:.7rem;width:14px;flex-shrink:0;"></i>
              <div>
                <div style="font-size:.78rem;font-weight:600;color:var(--ink);">${p.label}</div>
                <div class="caption">${p.sub}</div>
              </div>
              <i class="fas fa-arrow-right" style="color:var(--ink-faint);font-size:.6rem;margin-left:auto;"></i>
            </a>
            `).join('')}
          </div>
        </div>

      </div>
    </div>
  </div>
</div>

`
  return c.html(layout('Contact & Enquiries', content, {
    description: "Contact India Gully — submit a mandate enquiry, request an IM, or arrange a HORECA quote. Our leadership team responds within 24 hours."
  }))
})

export default app
