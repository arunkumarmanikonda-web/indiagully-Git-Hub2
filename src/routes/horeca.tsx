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
<div class="hero-dk">
  <div class="hero-dk-grid"></div>
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse 50% 65% at 25% 50%,rgba(184,150,12,.06) 0%,transparent 55%);pointer-events:none;"></div>
  <div style="position:absolute;bottom:0;left:0;right:0;height:100px;background:linear-gradient(to bottom,transparent,var(--ink));pointer-events:none;"></div>
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
          { n:'500+',    l:'SKUs in Catalogue',   icon:'th-list' },
          { n:'₹50 Cr+', l:'Procurement Managed', icon:'rupee-sign' },
          { n:'50+',     l:'Vendor Network',       icon:'handshake' },
          { n:'15+',     l:'Hotels Supplied',      icon:'hotel' },
        ].map(s => `
        <div style="padding:2rem 1.5rem;background:rgba(255,255,255,.03);text-align:center;transition:background .22s;position:relative;overflow:hidden;" onmouseover="this.style.background='rgba(184,150,12,.06)'" onmouseout="this.style.background='rgba(255,255,255,.03)'">
          <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(184,150,12,.3),transparent);"></div>
          <i class="fas fa-\${s.icon}" style="font-size:.75rem;color:rgba(184,150,12,.45);margin-bottom:.625rem;display:block;"></i>
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2.25rem;color:var(--gold);line-height:1;margin-bottom:.4rem;">\${s.n}</div>
          <div style="font-size:.68rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.65);">\${s.l}</div>
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


<!-- ══ SUPPLY CATEGORIES ════════════════════════════════════════════════ -->
<div class="sec-wh" style="padding-top:6rem;padding-bottom:6rem;">
  <div class="wrap">
    <div style="text-align:center;max-width:600px;margin:0 auto 3.5rem;">
      <div class="gr-c"></div>
      <p class="eyebrow" style="margin-bottom:.75rem;">8 Supply Categories</p>
      <h2 class="h2">Complete HORECA<br>Procurement Coverage</h2>
      <p class="lead" style="margin-top:1rem;">From kitchen equipment to guest amenities — India Gully sources, specifies and delivers across every supply category for hotel pre-openings and renovations.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);">
      ${[
        { icon:'chair',          name:'FF&E',                  desc:'Furniture, Fixtures & Equipment to brand standard. Guest rooms, lobby, restaurant, spa.',       color:'rgba(26,58,107,.1)' },
        { icon:'utensils',       name:'OS&E',                  desc:'Operating Supplies & Equipment. Tableware, glassware, silverware, kitchen smallwares.',         color:'rgba(184,150,12,.08)' },
        { icon:'fire-alt',       name:'Kitchen Equipment',     desc:'Commercial kitchen — ranges, ovens, refrigeration, warewashing to FSSAI and brand standards.',  color:'rgba(220,38,38,.07)' },
        { icon:'bed',            name:'Linen & Towelling',     desc:'Room linen, bath towels, pool towels to brand par stock specification (3–4× room count).',     color:'rgba(6,95,70,.07)' },
        { icon:'tshirt',         name:'Uniforms',              desc:'Staff uniforms across all departments. Design, procurement, tailoring, branding and logistics.',  color:'rgba(124,58,237,.07)' },
        { icon:'gift',           name:'Guest Amenities',       desc:'Brand-approved bathroom amenities, room stationery, in-room guest kits and branded items.',    color:'rgba(146,64,14,.07)' },
        { icon:'tools',          name:'SPA & Wellness',        desc:'Spa equipment, treatment beds, wellness product ranges, fitness equipment and AV systems.',    color:'rgba(22,163,74,.07)' },
        { icon:'clipboard-list', name:'Turnkey Packages',      desc:'Complete turnkey procurement from single vendor. Full project management and delivery.',        color:'rgba(184,150,12,.06)' },
      ].map(cat => `
      <div style="background:#fff;padding:2rem 1.5rem;transition:all .25s;position:relative;overflow:hidden;cursor:default;" onmouseover="this.style.background='var(--parch)';this.style.boxShadow='0 8px 32px rgba(0,0,0,.06)'" onmouseout="this.style.background='#fff';this.style.boxShadow='none'">
        <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--gold),transparent);opacity:0;transition:opacity .25s;" class="cat-top"></div>
        <div style="width:52px;height:52px;background:\${cat.color};border:1px solid rgba(184,150,12,.15);display:flex;align-items:center;justify-content:center;margin-bottom:1.25rem;">
          <i class="fas fa-\${cat.icon}" style="color:var(--gold);font-size:1.1rem;"></i>
        </div>
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.05rem;color:var(--ink);margin-bottom:.625rem;">\${cat.name}</h3>
        <p style="font-size:.8rem;color:var(--ink-muted);line-height:1.7;">\${cat.desc}</p>
      </div>`).join('')}
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
    <!-- Desktop step connector line -->
    <div style="position:relative;">
      <div style="position:absolute;top:1.5rem;left:calc(12.5% + 24px);right:calc(12.5% + 24px);height:1px;background:var(--border);z-index:0;display:none;" class="step-line"></div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0;position:relative;z-index:1;">
        ${STEPS.map(step => `
        <div style="padding:0 1.5rem;text-align:center;position:relative;">
          <div style="width:48px;height:48px;background:var(--gold);display:flex;align-items:center;justify-content:center;margin:0 auto 1.25rem;font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:#fff;font-weight:700;border:3px solid #fff;box-shadow:0 0 0 1px var(--border);position:relative;z-index:1;">${step.n}</div>
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.05rem;color:var(--ink);margin-bottom:.625rem;">${step.title}</h3>
          <p class="body" style="font-size:.8rem;">${step.desc}</p>
        </div>
        `).join('')}
      </div>
      <style>@media(min-width:640px){.step-line{display:block!important;}}</style>
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
    <div class="ig-prop-grid">
      ${['Marriott International','Radisson Hotels','Cygnett Hotels','Regenta / Royal Orchid','IHG Hotels','Park Inn by Radisson','Bijolai Palace','Lemon Tree Hotels','Taj Hotels','Accor Hotels','Mahindra Holidays','CGH Earth Hotels'].map(b => `
      <div class="ig-prop-cell">${b}</div>
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

        <!-- SUCCESS PANEL (hidden until submission) -->
        <style>@keyframes pulse-ring{0%{transform:scale(.9);opacity:.6}50%{transform:scale(1.15);opacity:.2}100%{transform:scale(.9);opacity:.6}}</style>
        <div id="horeca-success" style="display:none;background:linear-gradient(160deg,#08111f 0%,#0a1a1a 60%,#081510 100%);border:1px solid rgba(6,95,70,.5);position:relative;overflow:hidden;">
          <!-- Green bar -->
          <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,transparent 0%,#34d399 40%,rgba(52,211,153,.3) 100%);"></div>
          <!-- Radial glow -->
          <div style="position:absolute;top:-60px;right:-60px;width:200px;height:200px;background:radial-gradient(circle,rgba(52,211,153,.08) 0%,transparent 70%);pointer-events:none;"></div>

          <!-- Header -->
          <div style="padding:2.5rem 2.5rem 0;display:flex;flex-direction:column;align-items:center;text-align:center;gap:1.25rem;">
            <div style="position:relative;width:76px;height:76px;">
              <div style="position:absolute;inset:0;border-radius:50%;border:2px solid rgba(52,211,153,.2);animation:pulse-ring 2s cubic-bezier(.215,.61,.355,1) infinite;"></div>
              <div style="width:76px;height:76px;background:linear-gradient(135deg,rgba(52,211,153,.18),rgba(52,211,153,.04));border:2px solid rgba(52,211,153,.45);display:flex;align-items:center;justify-content:center;border-radius:50%;">
                <i class="fas fa-check" style="color:#34d399;font-size:1.75rem;"></i>
              </div>
            </div>
            <div>
              <p style="font-size:.58rem;font-weight:700;letter-spacing:.35em;text-transform:uppercase;color:rgba(52,211,153,.7);margin-bottom:.5rem;">HORECA Enquiry Submitted</p>
              <h3 style="font-family:Georgia,serif;font-size:1.7rem;color:#fff;line-height:1.15;margin-bottom:.75rem;font-weight:400;">Your enquiry has been received.</h3>
              <p style="font-size:.85rem;color:rgba(255,255,255,.5);line-height:1.8;max-width:460px;">Pavan Manikonda and our procurement team will respond within <strong style="color:rgba(255,255,255,.85);">48 business hours</strong> with a detailed specification and quotation.</p>
            </div>
            <div style="background:rgba(52,211,153,.06);border:1px solid rgba(52,211,153,.25);padding:1.1rem 2.5rem;width:100%;max-width:360px;">
              <p style="font-size:.55rem;font-weight:700;letter-spacing:.25em;text-transform:uppercase;color:rgba(52,211,153,.55);margin-bottom:.4rem;">Reference Number</p>
              <div id="horeca-success-ref" style="font-family:Georgia,serif;font-size:1.25rem;color:#34d399;letter-spacing:.05em;"></div>
            </div>
          </div>

          <!-- What happens next -->
          <div style="padding:1.75rem 2.5rem 0;">
            <p style="font-size:.6rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:rgba(255,255,255,.3);margin-bottom:1rem;text-align:center;">What Happens Next</p>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.875rem;">
              ${[
                { n:'01', icon:'envelope-open-text', title:'Acknowledgement', desc:'Confirmation email sent within minutes' },
                { n:'02', icon:'clipboard-list',     title:'RFQ Review',      desc:'HORECA team reviews your requirements' },
                { n:'03', icon:'file-invoice',       title:'Quote & Specs',   desc:'Detailed quote issued within 48h' },
              ].map((s: any) => `
              <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);padding:1rem .875rem;text-align:center;">
                <div style="font-size:.6rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(52,211,153,.45);margin-bottom:.5rem;">${s.n}</div>
                <div style="width:32px;height:32px;background:rgba(52,211,153,.08);border:1px solid rgba(52,211,153,.2);display:flex;align-items:center;justify-content:center;margin:0 auto .625rem;">
                  <i class="fas fa-${s.icon}" style="color:#34d399;font-size:.72rem;"></i>
                </div>
                <div style="font-size:.78rem;font-weight:600;color:#fff;margin-bottom:.3rem;">${s.title}</div>
                <div style="font-size:.7rem;color:rgba(255,255,255,.4);line-height:1.55;">${s.desc}</div>
              </div>`).join('')}
            </div>
          </div>

          <!-- HORECA contact advisor -->
          <div style="margin:1.5rem 2.5rem;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);padding:1.125rem 1.25rem;display:flex;align-items:center;gap:1rem;">
            <div style="width:44px;height:44px;border-radius:50%;background:rgba(52,211,153,.12);border:2px solid rgba(52,211,153,.3);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <span style="font-size:.85rem;font-weight:700;color:#34d399;">PM</span>
            </div>
            <div style="flex:1;min-width:0;">
              <div style="font-size:.82rem;font-weight:600;color:#fff;margin-bottom:.1rem;">Pavan Manikonda</div>
              <div style="font-size:.7rem;color:rgba(255,255,255,.4);">Executive Director · HORECA Solutions</div>
            </div>
            <div style="display:flex;flex-direction:column;gap:.35rem;align-items:flex-end;">
              <a href="tel:+916282556067" style="font-size:.72rem;color:rgba(255,255,255,.5);text-decoration:none;display:flex;align-items:center;gap:.35rem;" onmouseover="this.style.color='#34d399'" onmouseout="this.style.color='rgba(255,255,255,.5)'"><i class="fas fa-phone" style="font-size:.6rem;"></i>+91 62825 56067</a>
              <a href="mailto:pavan@indiagully.com" style="font-size:.72rem;color:rgba(255,255,255,.5);text-decoration:none;display:flex;align-items:center;gap:.35rem;" onmouseover="this.style.color='#34d399'" onmouseout="this.style.color='rgba(255,255,255,.5)'"><i class="fas fa-envelope" style="font-size:.6rem;"></i>pavan@indiagully.com</a>
            </div>
          </div>

          <!-- CTA buttons -->
          <div style="padding:0 2.5rem 2.5rem;display:flex;gap:.875rem;flex-wrap:wrap;justify-content:center;">
            <a href="/horeca/catalogue" style="display:inline-flex;align-items:center;gap:.5rem;padding:.75rem 1.5rem;background:var(--gold);color:#fff;text-decoration:none;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;"><i class="fas fa-th-list" style="font-size:.62rem;"></i>Browse Full Catalogue</a>
            <a href="https://wa.me/916282556067?text=Hi%20Pavan%2C%20I%20have%20submitted%20a%20HORECA%20enquiry%20and%20would%20like%20to%20follow%20up." target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:.5rem;padding:.75rem 1.5rem;background:#25D366;color:#fff;text-decoration:none;font-size:.72rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;"><i class="fab fa-whatsapp" style="font-size:.82rem;"></i>WhatsApp Follow-up</a>
            <a href="/horeca" onclick="document.getElementById('horeca-success').style.display='none';document.getElementById('horeca-form-wrap').style.display='block';return false;" style="display:inline-flex;align-items:center;gap:.5rem;padding:.75rem 1.25rem;border:1px solid rgba(255,255,255,.12);color:rgba(255,255,255,.55);text-decoration:none;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:rgba(255,255,255,.04);"><i class="fas fa-redo" style="font-size:.62rem;"></i>Another Enquiry</a>
          </div>
        </div>

        <!-- FORM WRAPPER -->
        <div id="horeca-form-wrap">
        <form id="horeca-form" class="ig-form" style="display:flex;flex-direction:column;gap:1.25rem;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;">
            <div><label class="ig-lbl">Full Name *</label><input id="hf-name" type="text" name="name" class="ig-inp" required placeholder="Your full name"></div>
            <div><label class="ig-lbl">Company / Property *</label><input id="hf-company" type="text" name="company" class="ig-inp" required placeholder="Hotel or company name"></div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;">
            <div><label class="ig-lbl">Email Address *</label><input id="hf-email" type="email" name="email" class="ig-inp" required placeholder="your@email.com"></div>
            <div><label class="ig-lbl">Phone Number</label><input id="hf-phone" type="tel" name="phone" class="ig-inp" placeholder="+91 XXXXX XXXXX"></div>
          </div>
          <div><label class="ig-lbl">Property Location *</label><input id="hf-location" type="text" name="location" class="ig-inp" required placeholder="City, State"></div>
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
            <select id="hf-budget" name="budget" class="ig-inp">
              <option value="">Select range</option>
              <option>Below ₹25 Lakhs</option>
              <option>₹25L to ₹1 Crore</option>
              <option>₹1 Cr – ₹5 Crore</option>
              <option>₹5 Cr – ₹25 Crore</option>
              <option>Above ₹25 Crore</option>
            </select>
          </div>
          <div><label class="ig-lbl">Additional Requirements</label><textarea id="hf-message" name="message" class="ig-inp" placeholder="Describe your requirements, timeline, brand standards or any specific product preferences…"></textarea></div>
          <!-- Error -->
          <div id="hf-err" style="display:none;background:#fef2f2;border:1px solid #fecaca;padding:.625rem .875rem;font-size:.75rem;color:#dc2626;"><i class="fas fa-exclamation-circle" style="margin-right:.4rem;"></i><span id="hf-err-msg">Please fill all required fields.</span></div>
          <button type="button" id="hf-submit" onclick="igSubmitHORECA()" class="btn btn-g" style="width:100%;justify-content:center;padding:1rem;"><i class="fas fa-paper-plane" style="margin-right:.5rem;"></i>Submit HORECA Enquiry</button>
        </form>
        </div>

        <script>
        function igSubmitHORECA() {
          var name = (document.getElementById('hf-name')||{}).value||'';
          var company = (document.getElementById('hf-company')||{}).value||'';
          var email = (document.getElementById('hf-email')||{}).value||'';
          var phone = (document.getElementById('hf-phone')||{}).value||'';
          var location = (document.getElementById('hf-location')||{}).value||'';
          var budget = (document.getElementById('hf-budget')||{}).value||'';
          var message = (document.getElementById('hf-message')||{}).value||'';
          var cats = Array.from(document.querySelectorAll('input[name="categories"]:checked')).map(function(el){return el.value;}).join(', ');
          var errEl = document.getElementById('hf-err');
          var errMsg = document.getElementById('hf-err-msg');
          function showErr(m){if(errMsg)errMsg.textContent=m;if(errEl)errEl.style.display='block';}
          name=name.trim();company=company.trim();email=email.trim();location=location.trim();
          if(!name||name.length<2){showErr('Please enter your full name.');return;}
          if(!email||!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(email)){showErr('Please enter a valid email address.');return;}
          if(!company||company.length<2){showErr('Please enter your company or property name.');return;}
          if(!location||location.length<2){showErr('Please enter the property location.');return;}
          if(errEl)errEl.style.display='none';
          var btn=document.getElementById('hf-submit');
          if(btn){btn.disabled=true;btn.innerHTML='<i class="fas fa-circle-notch fa-spin" style="margin-right:.5rem;"></i>Submitting…';}
          fetch('/api/horeca-enquiry',{
            method:'POST',headers:{'Content-Type':'application/json'},
            body:JSON.stringify({name:name,email:email,phone:phone,company:company,location:location,categories:cats,budget:budget,message:message})
          })
          .then(function(r){return r.json();})
          .then(function(d){
            var wrap=document.getElementById('horeca-form-wrap');
            var succ=document.getElementById('horeca-success');
            var refEl=document.getElementById('horeca-success-ref');
            if(wrap)wrap.style.display='none';
            if(succ)succ.style.display='block';
            if(refEl)refEl.textContent=d.ref||('IG-HORECA-'+Date.now());
            if(succ)succ.scrollIntoView({behavior:'smooth',block:'start'});
          })
          .catch(function(){
            if(btn){btn.disabled=false;btn.innerHTML='<i class="fas fa-paper-plane" style="margin-right:.5rem;"></i>Submit HORECA Enquiry';}
            showErr('Network error. Please email pavan@indiagully.com or call +91 62825 56067.');
          });
        }
        </script>
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
    description: 'India Gully HORECA Solutions — kitchen equipment, FF&E, OS&E, linens, uniforms and guest amenities for hotels and F&B operators across India.',
    canonical: 'https://india-gully.pages.dev/horeca'
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
        <button onclick="igCatDownloadPDF()" style="background:var(--gold);color:#fff;border:none;padding:.65rem 1.25rem;font-size:.78rem;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:.5rem;letter-spacing:.04em;">
          <i class="fas fa-file-pdf"></i>PDF Brochure
        </button>
        <button onclick="igCatDownloadBOQ()" style="background:#065F46;color:#fff;border:none;padding:.65rem 1.25rem;font-size:.78rem;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:.5rem;">
          <i class="fas fa-file-excel"></i>Excel BOQ
        </button>
        <button onclick="igCatDownloadCSV()" style="background:#fff;color:var(--ink);border:none;padding:.65rem 1.25rem;font-size:.78rem;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:.5rem;">
          <i class="fas fa-file-csv" style="color:#16a34a;"></i>Download CSV
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
            <button onclick="igCatDownloadPDF()" style="background:var(--gold);color:#fff;border:none;padding:.5rem;font-size:.72rem;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:.4rem;">
              <i class="fas fa-file-pdf"></i>Printable PDF Brochure
            </button>
            <button onclick="igCatDownloadBOQ()" style="background:#065F46;color:#fff;border:none;padding:.5rem;font-size:.72rem;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:.4rem;">
              <i class="fas fa-file-excel"></i>Excel BOQ (Bill of Qty)
            </button>
            <button onclick="igCatDownloadCSV()" style="background:#fff;color:var(--ink);border:1px solid var(--border);padding:.5rem;font-size:.72rem;font-weight:600;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:.4rem;">
              <i class="fas fa-file-csv" style="color:#16a34a;"></i>Full Catalogue CSV
            </button>
            <button onclick="igCatDownloadFiltered()" style="background:#fff;color:var(--ink);border:1px solid var(--border);padding:.5rem;font-size:.72rem;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:.4rem;" id="btn-dl-filtered" style="display:none;">
              <i class="fas fa-filter" style="color:#2563eb;"></i>Download Filtered CSV
            </button>
          </div>
          <p style="font-size:.62rem;color:var(--ink-muted);margin-top:.5rem;line-height:1.5;">PDF: professional A4 brochure. Excel: BOQ with quantity columns for procurement planning.</p>
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
      <button onclick="igQuickRFQOpen()" class="btn btn-g"><i class="fas fa-paper-plane" style="margin-right:.4rem;"></i>Quick RFQ</button>
      <a href="/horeca#enquiry" style="background:none;color:rgba(255,255,255,.7);border:1px solid rgba(255,255,255,.2);padding:.65rem 1.5rem;font-size:.78rem;font-weight:600;text-decoration:none;display:inline-flex;align-items:center;gap:.5rem;"><i class="fas fa-list-alt" style="margin-right:.4rem;"></i>Full Enquiry Form</a>
      <a href="tel:+916282556067" style="background:none;color:rgba(255,255,255,.7);border:1px solid rgba(255,255,255,.2);padding:.65rem 1.5rem;font-size:.78rem;font-weight:600;text-decoration:none;display:inline-flex;align-items:center;gap:.5rem;"><i class="fas fa-phone"></i>+91 62825 56067</a>
    </div>
  </div>
</div>

<!-- Phase 11C: Quick RFQ Floating Button + Slide-out Panel -->
<button onclick="igQuickRFQOpen()" id="rfq-fab"
        style="position:fixed;bottom:1.5rem;right:1.5rem;z-index:500;background:var(--gold);color:#fff;border:none;padding:.75rem 1.25rem;font-size:.78rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;display:flex;align-items:center;gap:.5rem;box-shadow:0 8px 28px rgba(184,150,12,.4);transition:all .2s;"
        onmouseover="this.style.background='#a37a08'" onmouseout="this.style.background='var(--gold)'">
  <i class="fas fa-file-invoice" style="font-size:.7rem;"></i>Quick RFQ
</button>

<div id="rfq-overlay" style="display:none;position:fixed;inset:0;z-index:999;background:rgba(0,0,0,.5);backdrop-filter:blur(4px);" onclick="igQuickRFQClose()"></div>
<div id="rfq-panel" style="position:fixed;top:0;right:-480px;width:min(480px,100vw);height:100vh;z-index:1000;background:#fff;overflow-y:auto;box-shadow:-8px 0 40px rgba(0,0,0,.2);transition:right .35s cubic-bezier(.77,0,.175,1);">
  <!-- Panel header -->
  <div style="background:var(--ink);padding:1.25rem 1.5rem;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:2;">
    <div style="display:flex;align-items:center;gap:.75rem;">
      <div style="width:36px;height:36px;background:var(--gold);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <i class="fas fa-file-invoice" style="color:#fff;font-size:.8rem;"></i>
      </div>
      <div>
        <p style="font-size:.55rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(184,150,12,.7);margin-bottom:.1rem;">HORECA Solutions</p>
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:#fff;margin:0;">Quick RFQ</h3>
      </div>
    </div>
    <button onclick="igQuickRFQClose()" style="background:none;border:1px solid rgba(255,255,255,.2);color:#fff;width:34px;height:34px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .2s;" onmouseover="this.style.background='rgba(255,255,255,.1)'" onmouseout="this.style.background='none'">
      <i class="fas fa-times" style="font-size:.8rem;"></i>
    </button>
  </div>

  <div style="padding:1.5rem;">
    <!-- Success state -->
    <div id="rfq-panel-success" style="display:none;text-align:center;padding:2rem 1rem;">
      <div style="width:64px;height:64px;background:rgba(22,163,74,.1);border:2px solid rgba(22,163,74,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;">
        <i class="fas fa-check" style="color:#16a34a;font-size:1.5rem;"></i>
      </div>
      <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.4rem;color:var(--ink);margin-bottom:.5rem;">RFQ Submitted!</h3>
      <p style="font-size:.82rem;color:var(--ink-muted);line-height:1.75;margin-bottom:1.25rem;">Pavan Manikonda will respond within 48 business hours with a detailed specification and quote.</p>
      <div style="background:var(--parch);border:1px solid var(--border);padding:.875rem;margin-bottom:1.25rem;">
        <p style="font-size:.6rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.25rem;">Reference</p>
        <div id="rfq-success-ref" style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--gold);"></div>
      </div>
      <div style="display:flex;gap:.75rem;flex-wrap:wrap;justify-content:center;">
        <a href="/horeca/catalogue" class="btn btn-g" style="font-size:.72rem;">Continue Browsing</a>
        <button onclick="igQuickRFQClose()" style="background:none;border:1px solid var(--border);padding:.5rem 1rem;font-size:.72rem;cursor:pointer;color:var(--ink);">Close</button>
      </div>
    </div>

    <!-- Form — 3-step wizard -->
    <div id="rfq-panel-form">

      <!-- Step indicator -->
      <div style="display:flex;align-items:center;gap:0;margin-bottom:1.5rem;padding-bottom:1.25rem;border-bottom:1px solid var(--border);">
        ${[1,2,3].map(n => `
        <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:.3rem;position:relative;">
          <div id="rfq-step-dot-${n}" style="width:30px;height:30px;border-radius:50%;background:${n===1?'var(--gold)':'var(--border)'};border:2px solid ${n===1?'var(--gold)':'var(--border)'};display:flex;align-items:center;justify-content:center;font-size:.62rem;font-weight:700;color:${n===1?'#fff':'var(--ink-muted)'};transition:all .3s;z-index:1;">${n}</div>
          <span id="rfq-step-lbl-${n}" style="font-size:.55rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${n===1?'var(--gold)':'var(--ink-faint)'};transition:color .3s;">${n===1?'Type':n===2?'Details':'Contact'}</span>
          ${n<3?`<div id="rfq-connector-${n}" style="position:absolute;top:15px;left:calc(50% + 15px);right:calc(-50% + 15px);height:2px;background:var(--border);transition:background .3s;"></div>`:''}
        </div>`).join('')}
      </div>

      <!-- STEP 1: Property type + supply categories -->
      <div id="rfq-step-1">
        <p style="font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.75rem;">Property Type</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-bottom:1.25rem;">
          ${['Hotel (New Opening)','Hotel (Refurbishment)','Restaurant / F&B','Resort / Boutique','Hospital / Institutional','Other'].map(t => `
          <label style="display:flex;align-items:center;gap:.5rem;border:1.5px solid var(--border);padding:.6rem .75rem;cursor:pointer;font-size:.75rem;color:var(--ink-soft);transition:all .2s;" class="rfq-type-opt" onclick="igRFQSelectType(this,'${t.replace(/'/g,"\\x27")}')">
            <input type="radio" name="rfq-prop-type" value="${t}" style="accent-color:var(--gold);flex-shrink:0;"> ${t}
          </label>`).join('')}
        </div>
        <p style="font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.75rem;">Supply Categories Needed</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:.35rem;border:1.5px solid var(--border);padding:.75rem;background:#fafaf7;">
          ${['FF&E','OS&E','Kitchen Equipment','Linen & Towelling','Uniforms','Guest Amenities','SPA & Wellness','Turnkey Package'].map(cat => `
          <label style="display:flex;align-items:center;gap:.4rem;font-size:.75rem;color:var(--ink-soft);cursor:pointer;padding:.2rem;">
            <input type="checkbox" name="rfq-cat" value="${cat}" style="accent-color:var(--gold);width:12px;height:12px;flex-shrink:0;"> ${cat}
          </label>`).join('')}
        </div>
        <div id="rfq-err-1" style="display:none;margin-top:.75rem;background:#fef2f2;border:1px solid #fecaca;padding:.5rem .75rem;font-size:.72rem;color:#dc2626;"></div>
        <button onclick="igRFQNextStep(1)" style="width:100%;margin-top:1.25rem;padding:.8rem;background:var(--gold);color:#fff;border:none;font-size:.78rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:.5rem;">
          Next: Property Details <i class="fas fa-arrow-right" style="font-size:.65rem;"></i>
        </button>
      </div>

      <!-- STEP 2: Property details -->
      <div id="rfq-step-2" style="display:none;">
        <div style="display:flex;flex-direction:column;gap:.875rem;">
          <div>
            <label style="display:block;font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.3rem;">Property / Company Name *</label>
            <input id="rfq-company" type="text" placeholder="Hotel / Restaurant name"
                   style="width:100%;box-sizing:border-box;border:1.5px solid var(--border);padding:.65rem .875rem;font-size:.875rem;font-family:'DM Sans',sans-serif;color:var(--ink);outline:none;transition:all .2s;"
                   onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='var(--border)'">
          </div>
          <div>
            <label style="display:block;font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.3rem;">Property Location *</label>
            <input id="rfq-location" type="text" placeholder="City, State"
                   style="width:100%;box-sizing:border-box;border:1.5px solid var(--border);padding:.65rem .875rem;font-size:.875rem;font-family:'DM Sans',sans-serif;color:var(--ink);outline:none;transition:all .2s;"
                   onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='var(--border)'">
          </div>
          <div>
            <label style="display:block;font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.3rem;">Rooms / Covers</label>
            <input id="rfq-rooms" type="text" placeholder="e.g. 80 rooms / 120 covers"
                   style="width:100%;box-sizing:border-box;border:1.5px solid var(--border);padding:.65rem .875rem;font-size:.875rem;font-family:'DM Sans',sans-serif;color:var(--ink);outline:none;transition:all .2s;"
                   onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='var(--border)'">
          </div>
          <div>
            <label style="display:block;font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.3rem;">Approx. Budget Range</label>
            <select id="rfq-budget"
                    style="width:100%;box-sizing:border-box;border:1.5px solid var(--border);padding:.65rem .875rem;font-size:.875rem;font-family:'DM Sans',sans-serif;color:var(--ink);outline:none;background:#fff;transition:all .2s;">
              <option value="">Select range (optional)</option>
              <option>Under \u20b925 Lakhs</option>
              <option>\u20b925\u201375 Lakhs</option>
              <option>\u20b975 Lakhs \u2013 \u20b91 Cr</option>
              <option>\u20b91 Cr \u2013 \u20b93 Cr</option>
              <option>\u20b93 Cr+</option>
            </select>
          </div>
          <div>
            <label style="display:block;font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.3rem;">Additional Notes</label>
            <textarea id="rfq-notes" rows="3" placeholder="Brand standards, timeline, special requirements\u2026"
                      style="width:100%;box-sizing:border-box;border:1.5px solid var(--border);padding:.65rem .875rem;font-size:.875rem;font-family:'DM Sans',sans-serif;color:var(--ink);outline:none;resize:vertical;min-height:80px;transition:all .2s;"
                      onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='var(--border)'"></textarea>
          </div>
        </div>
        <div id="rfq-err-2" style="display:none;margin-top:.75rem;background:#fef2f2;border:1px solid #fecaca;padding:.5rem .75rem;font-size:.72rem;color:#dc2626;"></div>
        <div style="display:flex;gap:.75rem;margin-top:1.25rem;">
          <button onclick="igRFQGoStep(1)" style="flex:0 0 auto;padding:.8rem 1.1rem;background:none;border:1.5px solid var(--border);color:var(--ink-muted);font-size:.75rem;cursor:pointer;">
            <i class="fas fa-arrow-left" style="font-size:.62rem;"></i>
          </button>
          <button onclick="igRFQNextStep(2)" style="flex:1;padding:.8rem;background:var(--gold);color:#fff;border:none;font-size:.78rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:.5rem;">
            Next: Your Contact <i class="fas fa-arrow-right" style="font-size:.65rem;"></i>
          </button>
        </div>
      </div>

      <!-- STEP 3: Contact + submit -->
      <div id="rfq-step-3" style="display:none;">
        <div style="display:flex;flex-direction:column;gap:.875rem;">
          <div>
            <label style="display:block;font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.3rem;">Full Name *</label>
            <input id="rfq-name" type="text" placeholder="Your full name"
                   style="width:100%;box-sizing:border-box;border:1.5px solid var(--border);padding:.65rem .875rem;font-size:.875rem;font-family:'DM Sans',sans-serif;color:var(--ink);outline:none;transition:all .2s;"
                   onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='var(--border)'">
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;">
            <div>
              <label style="display:block;font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.3rem;">Email *</label>
              <input id="rfq-email" type="email" placeholder="your@email.com"
                     style="width:100%;box-sizing:border-box;border:1.5px solid var(--border);padding:.65rem .875rem;font-size:.875rem;font-family:'DM Sans',sans-serif;color:var(--ink);outline:none;transition:all .2s;"
                     onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='var(--border)'">
            </div>
            <div>
              <label style="display:block;font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.3rem;">WhatsApp / Phone *</label>
              <input id="rfq-phone" type="tel" placeholder="+91 XXXXX XXXXX"
                     style="width:100%;box-sizing:border-box;border:1.5px solid var(--border);padding:.65rem .875rem;font-size:.875rem;font-family:'DM Sans',sans-serif;color:var(--ink);outline:none;transition:all .2s;"
                     onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='var(--border)'">
            </div>
          </div>
          <div id="rfq-summary-box" style="background:var(--parch);border:1px solid var(--border);padding:.875rem;font-size:.73rem;color:var(--ink-soft);line-height:1.75;display:none;">
            <p style="font-size:.58rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.4rem;">RFQ Summary</p>
            <div id="rfq-summary-text"></div>
          </div>
        </div>
        <div id="rfq-err-3" style="display:none;margin-top:.75rem;background:#fef2f2;border:1px solid #fecaca;padding:.5rem .75rem;font-size:.72rem;color:#dc2626;"></div>
        <div style="display:flex;gap:.75rem;margin-top:1.25rem;">
          <button onclick="igRFQGoStep(2)" style="flex:0 0 auto;padding:.8rem 1.1rem;background:none;border:1.5px solid var(--border);color:var(--ink-muted);font-size:.75rem;cursor:pointer;">
            <i class="fas fa-arrow-left" style="font-size:.62rem;"></i>
          </button>
          <button onclick="igQuickRFQSubmit()" id="rfq-submit-btn" style="flex:1;padding:.8rem;background:var(--gold);color:#fff;border:none;font-size:.78rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:.5rem;">
            <i class="fas fa-paper-plane" style="font-size:.7rem;"></i>Submit RFQ
          </button>
        </div>
        <div style="margin-top:.875rem;padding-top:.875rem;border-top:1px solid var(--border);text-align:center;">
          <p style="font-size:.62rem;color:var(--ink-muted);margin-bottom:.5rem;">Prefer WhatsApp?</p>
          <button onclick="igRFQWhatsApp()" style="width:100%;padding:.65rem;background:#25D366;color:#fff;border:none;font-size:.72rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:.4rem;">
            <i class="fab fa-whatsapp" style="font-size:.8rem;"></i>Send via WhatsApp
          </button>
        </div>
        <p style="font-size:.62rem;color:var(--ink-faint);text-align:center;margin-top:.75rem;"><i class="fas fa-lock" style="color:var(--gold);margin-right:.3rem;font-size:.52rem;"></i>Confidential \u00b7 Pavan Manikonda responds within 48h</p>
      </div>

    </div>
  </div>
</div>

<script>
var _rfqStep = 1;
var _rfqType = '';
var _rfqCats = [];

window.igQuickRFQOpen = function() {
  document.getElementById('rfq-overlay').style.display = 'block';
  document.getElementById('rfq-panel').style.right = '0';
  document.body.style.overflow = 'hidden';
  igRFQGoStep(1);
  _rfqType = ''; _rfqCats = [];
  ['rfq-name','rfq-email','rfq-phone','rfq-company','rfq-location','rfq-rooms','rfq-notes'].forEach(function(id){
    var el = document.getElementById(id); if(el) el.value = '';
  });
  var bd = document.getElementById('rfq-budget'); if(bd) bd.selectedIndex = 0;
  document.querySelectorAll('.rfq-type-opt').forEach(function(o){ o.style.borderColor='var(--border)'; o.style.background=''; });
  document.querySelectorAll('input[name="rfq-cat"]').forEach(function(cb){ cb.checked=false; });
  var pf = document.getElementById('rfq-panel-form'); if(pf) pf.style.display='block';
  var ps = document.getElementById('rfq-panel-success'); if(ps) ps.style.display='none';
};
window.igQuickRFQClose = function() {
  document.getElementById('rfq-overlay').style.display = 'none';
  document.getElementById('rfq-panel').style.right = '-480px';
  document.body.style.overflow = '';
};

function igRFQSelectType(el, type){
  _rfqType = type;
  document.querySelectorAll('.rfq-type-opt').forEach(function(o){
    o.style.borderColor = o===el ? 'var(--gold)' : 'var(--border)';
    o.style.background  = o===el ? 'rgba(184,150,12,.06)' : '';
  });
}

function igRFQGoStep(n){
  _rfqStep = n;
  [1,2,3].forEach(function(s){
    var stepEl = document.getElementById('rfq-step-'+s);
    if(stepEl) stepEl.style.display = s===n ? 'block' : 'none';
    var dot  = document.getElementById('rfq-step-dot-'+s);
    var lbl  = document.getElementById('rfq-step-lbl-'+s);
    var done = s < n; var active = s===n;
    if(dot){
      dot.style.background  = active?'var(--gold)':done?'#16a34a':'var(--border)';
      dot.style.borderColor = active?'var(--gold)':done?'#16a34a':'var(--border)';
      dot.style.color       = (active||done)?'#fff':'var(--ink-muted)';
      dot.innerHTML = done?'<i class="fas fa-check" style="font-size:.5rem;"></i>':String(s);
    }
    if(lbl) lbl.style.color = active?'var(--gold)':done?'#16a34a':'var(--ink-faint)';
    if(s<3){ var conn=document.getElementById('rfq-connector-'+s); if(conn) conn.style.background=s<n?'#16a34a':'var(--border)'; }
  });
}

function igRFQNextStep(from){
  if(from===1){
    _rfqCats = Array.from(document.querySelectorAll('input[name="rfq-cat"]:checked')).map(function(c){ return c.value; });
    var e1 = document.getElementById('rfq-err-1');
    if(!_rfqType){ e1.style.display='block'; e1.textContent='Please select a property type.'; return; }
    if(!_rfqCats.length){ e1.style.display='block'; e1.textContent='Please select at least one supply category.'; return; }
    e1.style.display='none'; igRFQGoStep(2);
  } else if(from===2){
    var company  = (document.getElementById('rfq-company')||{value:''}).value.trim();
    var location = (document.getElementById('rfq-location')||{value:''}).value.trim();
    var e2 = document.getElementById('rfq-err-2');
    if(!company){ e2.style.display='block'; e2.textContent='Please enter the property/company name.'; return; }
    if(!location){ e2.style.display='block'; e2.textContent='Please enter the property location.'; return; }
    e2.style.display='none';
    var budget=(document.getElementById('rfq-budget')||{value:''}).value;
    var rooms=(document.getElementById('rfq-rooms')||{value:''}).value;
    var sb=document.getElementById('rfq-summary-box'), st=document.getElementById('rfq-summary-text');
    if(st) st.innerHTML='<b>Type:</b> '+_rfqType+'<br><b>Categories:</b> '+_rfqCats.join(', ')+'<br><b>Property:</b> '+company+', '+location+(rooms?'<br><b>Rooms/Covers:</b> '+rooms:'')+(budget?'<br><b>Budget:</b> '+budget:'');
    if(sb) sb.style.display='block';
    igRFQGoStep(3);
  }
}

window.igRFQWhatsApp = function(){
  var name=( document.getElementById('rfq-name')||{value:''}).value.trim();
  var company=(document.getElementById('rfq-company')||{value:''}).value.trim();
  var loc=(document.getElementById('rfq-location')||{value:''}).value.trim();
  var msg='Hi Pavan, HORECA Quick RFQ\nType: '+_rfqType+'\nCategories: '+_rfqCats.join(', ')+(company?'\nProperty: '+company+(loc?', '+loc:''):'')+(name?'\nContact: '+name:'');
  window.open('https://wa.me/916282556067?text='+encodeURIComponent(msg),'_blank');
};

window.igQuickRFQSubmit = function(){
  var name=(document.getElementById('rfq-name')||{value:''}).value.trim();
  var email=(document.getElementById('rfq-email')||{value:''}).value.trim();
  var phone=(document.getElementById('rfq-phone')||{value:''}).value.trim();
  var company=(document.getElementById('rfq-company')||{value:''}).value.trim();
  var location=(document.getElementById('rfq-location')||{value:''}).value.trim();
  var notes=(document.getElementById('rfq-notes')||{value:''}).value.trim();
  var budget=(document.getElementById('rfq-budget')||{value:''}).value;
  var rooms=(document.getElementById('rfq-rooms')||{value:''}).value.trim();
  var e3=document.getElementById('rfq-err-3');
  if(!name){ e3.style.display='block'; e3.textContent='Please enter your name.'; return; }
  if(!email||!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)){ e3.style.display='block'; e3.textContent='Please enter a valid email.'; return; }
  if(!phone){ e3.style.display='block'; e3.textContent='Please enter your WhatsApp/phone number.'; return; }
  e3.style.display='none';
  var btn=document.getElementById('rfq-submit-btn');
  if(btn){ btn.disabled=true; btn.innerHTML='<i class="fas fa-circle-notch fa-spin" style="font-size:.7rem;"></i>\u00a0Submitting\u2026'; btn.style.background='rgba(184,150,12,.5)'; }
  fetch('/api/horeca-enquiry',{
    method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify({name,company,email,phone,location,categories:_rfqCats.join(', '),propType:_rfqType,budget,rooms,notes,source:'quick_rfq_wizard'})
  }).then(function(r){ return r.json(); }).then(function(d){
    document.getElementById('rfq-panel-form').style.display='none';
    var succ=document.getElementById('rfq-panel-success'); if(succ) succ.style.display='block';
    var refEl=document.getElementById('rfq-success-ref'); if(refEl) refEl.textContent=d.ref||('HRC-RFQ-'+Date.now());
    if(window.igToast) igToast('RFQ submitted \u2714 Reference: '+(d.ref||''),'success');
  }).catch(function(){
    if(btn){ btn.disabled=false; btn.innerHTML='<i class="fas fa-paper-plane" style="font-size:.7rem;"></i>\u00a0Submit RFQ'; btn.style.background='var(--gold)'; }
    if(e3){ e3.style.display='block'; e3.textContent='Network error. Please call +91 62825 56067 or use WhatsApp.'; }
  });
};
</script>

<style>
  .prod-card { background:#fff; border:1px solid var(--border); transition:box-shadow .2s,transform .2s; }
  .prod-card:hover { box-shadow:0 8px 24px rgba(0,0,0,.09); transform:translateY(-2px); }
  .prod-quote-btn { display:flex; align-items:center; justify-content:center; gap:.4rem; background:var(--gold); color:#fff; text-decoration:none; padding:.45rem .875rem; font-size:.7rem; font-weight:700; letter-spacing:.05em; text-transform:uppercase; transition:background .2s; }
  .prod-quote-btn:hover { background:#a37a08; }
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
  var catIconMap = {
    'Kitchen Equipment': 'fire', 'Crockery & Cutlery': 'concierge-bell',
    'Linen & Soft Furnishing': 'bed', 'Bar & Beverages': 'wine-glass-alt',
    'Housekeeping Supplies': 'broom', 'Furniture & Fixtures': 'couch',
    'Tech & POS Systems': 'desktop', 'Safety & Security': 'shield-alt',
    'Guest Amenities': 'spa', 'Staff Uniforms': 'tshirt', 'Technology & AV': 'tv'
  };
  var html = '';
  products.forEach(function(p) {
    var lowStock = p.stock <= p.reorder && p.stock > 0;
    var outOfStock = p.stock === 0;
    var stockColor = outOfStock ? '#dc2626' : (lowStock ? '#d97706' : '#16a34a');
    var stockBg    = outOfStock ? 'rgba(220,38,38,.07)' : (lowStock ? 'rgba(217,119,6,.07)' : 'rgba(22,163,74,.07)');
    var stockText  = outOfStock ? 'Out of Stock' : (lowStock ? 'Low — ' + p.stock + ' left' : 'In Stock');
    var catData    = _igCatCategories.find(function(c){ return c.name === p.category; }) || {};
    var catColor   = catData.color || '#475569';
    var catIcon    = catIconMap[p.category] || catData.icon || 'box';
    var priceIncGst = p.price ? Math.round(p.price * (1 + (p.gst_rate||18)/100)) : 0;

    html += '<div class="prod-card" style="display:flex;flex-direction:column;">'
      // Featured banner
      + (p.featured ? '<div style="background:linear-gradient(90deg,var(--gold),#a37a08);color:#fff;font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:.3rem .875rem;display:flex;align-items:center;gap:.3rem;"><i class="fas fa-star" style="font-size:.55rem;"></i>Featured SKU</div>' : '')
      // Image / category icon area
      + '<div style="height:130px;background:linear-gradient(145deg,' + catColor + '15 0%,' + catColor + '05 100%);position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;border-bottom:1px solid rgba(0,0,0,.06);overflow:hidden;">'
      + '<div style="position:absolute;bottom:-20px;right:-20px;width:90px;height:90px;border-radius:50%;background:' + catColor + '08;"></div>'
      + '<div style="position:absolute;top:-10px;left:-10px;width:60px;height:60px;border-radius:50%;background:' + catColor + '06;"></div>'
      + (p.image ? '<img src="' + p.image + '" alt="' + p.name.replace(/"/g,'') + '" style="max-height:110px;max-width:88%;object-fit:contain;position:relative;z-index:1;" loading="lazy">'
                 : '<div style="text-align:center;position:relative;z-index:1;"><div style="width:58px;height:58px;background:' + catColor + '20;border:1.5px solid ' + catColor + '40;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto .5rem;"><i class="fas fa-' + catIcon + '" style="color:' + catColor + ';font-size:1.25rem;"></i></div><span style="font-size:.58rem;color:' + catColor + ';font-weight:700;letter-spacing:.06em;text-transform:uppercase;opacity:.8;">' + (p.category||'').split(' & ')[0] + '</span></div>')
      + '</div>'
      // Content
      + '<div style="padding:1rem 1.1rem;flex:1;display:flex;flex-direction:column;gap:.35rem;">'
      + '<div style="display:flex;justify-content:space-between;align-items:center;">'
      + '<span style="font-size:.58rem;font-weight:700;letter-spacing:.1em;font-family:monospace;color:#0d9488;">' + p.sku + '</span>'
      + '<span style="font-size:.58rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:.15rem .45rem;background:' + catColor + '18;color:' + catColor + ';border:1px solid ' + catColor + '33;">' + p.hsn + '</span>'
      + '</div>'
      + '<h3 style="font-size:.875rem;font-weight:700;color:var(--ink);line-height:1.3;margin:0;">' + p.name + '</h3>'
      + (p.brand ? '<p style="font-size:.68rem;color:#94a3b8;margin:0;"><i class="fas fa-trademark" style="margin-right:.2rem;font-size:.55rem;"></i>' + p.brand + '</p>' : '')
      + (p.description ? '<p style="font-size:.72rem;color:var(--ink-muted);line-height:1.5;margin:0;flex:1;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">' + p.description + '</p>' : '<div style="flex:1;"></div>')
      // Price row
      + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:.35rem;padding:.625rem 0;border-top:1px solid var(--border);margin-top:.35rem;">'
      + '<div><div style="font-size:.55rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#94a3b8;margin-bottom:.15rem;">Ex-GST / ' + (p.unit||'Piece') + '</div><div style="font-family:Georgia,serif;font-size:1.15rem;color:var(--gold);">&#8377;' + (p.price||0).toLocaleString('en-IN') + '</div></div>'
      + '<div><div style="font-size:.55rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#94a3b8;margin-bottom:.15rem;">Inc. GST (' + (p.gst_rate||18) + '%)</div><div style="font-size:.88rem;font-weight:700;color:var(--ink);">&#8377;' + priceIncGst.toLocaleString('en-IN') + '</div></div>'
      + '</div>'
      // Stock + CTA
      + '<div style="display:flex;align-items:center;gap:.5rem;padding:.35rem .6rem;background:' + stockBg + ';border:1px solid ' + stockColor + '33;">'
      + '<i class="fas fa-circle" style="font-size:.35rem;color:' + stockColor + ';"></i>'
      + '<span style="font-size:.67rem;font-weight:600;color:' + stockColor + ';flex:1;">' + stockText + '</span>'
      + '</div>'
      + '</div>'
      // CTA footer
      + '<div style="padding:.625rem 1.1rem;border-top:1px solid var(--border);background:#fafaf7;">'
      + '<a href="/horeca#enquiry" class="prod-quote-btn" data-sku="' + p.sku.replace(/"/g,'') + '" data-name="' + p.name.replace(/"/g,'&quot;') + '" onclick="igCatEnquire(event,this.dataset.sku,this.dataset.name)">'
      + '<i class="fas fa-paper-plane" style="font-size:.6rem;"></i>Request Quote</a>'
      + '</div>'
      + '</div>';
  });
  document.getElementById('cat-grid-view').innerHTML = html || '<p style="padding:2rem;color:var(--ink-muted);">No products found.</p>';
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
      + '<td style="padding:.625rem .75rem;text-align:right;font-family:Georgia,serif;font-size:.9rem;color:var(--gold);">&#8377;' + (p.price||0).toLocaleString('en-IN') + '</td>'
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
  igShowToast('Preparing premium PDF brochure…', 'info');
  var products = _igCatProducts.filter(function(p){ return p.active !== false; });
  if (_igCatActiveCategory) products = products.filter(function(p){ return p.category === _igCatActiveCategory; });
  if (products.length === 0) { igShowToast('No products to export', 'warn'); return; }

  // Group by category
  var catMap = {};
  products.forEach(function(p){
    if (!catMap[p.category]) catMap[p.category] = [];
    catMap[p.category].push(p);
  });

  var catSections = Object.keys(catMap).map(function(cat) {
    var rows = catMap[cat].map(function(p, i) {
      var stockColor = p.stock===0?'#dc2626':(p.stock<=p.reorder?'#d97706':'#16a34a');
      return '<tr style="background:' + (i%2===0?'#fff':'#fafaf7') + ';page-break-inside:avoid;">'
        + '<td style="padding:5px 8px;font-family:monospace;font-size:8px;color:#0d9488;white-space:nowrap;border-bottom:1px solid #ede8df;">' + p.sku + '</td>'
        + '<td style="padding:5px 8px;border-bottom:1px solid #ede8df;"><div style="font-size:9.5px;font-weight:700;color:#111;">' + p.name + '</div>' + (p.brand?'<div style="font-size:7.5px;color:#94a3b8;margin-top:1px;">'+p.brand+'</div>':'') + '</td>'
        + '<td style="padding:5px 8px;font-size:8px;color:#475569;border-bottom:1px solid #ede8df;">' + (p.unit||'Piece') + '</td>'
        + '<td style="padding:5px 8px;font-size:10px;font-weight:700;color:#B8960C;text-align:right;border-bottom:1px solid #ede8df;">₹' + (p.price||0).toLocaleString('en-IN') + '</td>'
        + '<td style="padding:5px 8px;font-size:8px;text-align:center;border-bottom:1px solid #ede8df;">' + (p.gst_rate||18) + '%</td>'
        + '<td style="padding:5px 8px;font-size:8px;font-family:monospace;border-bottom:1px solid #ede8df;">' + (p.hsn||'—') + '</td>'
        + '<td style="padding:5px 8px;text-align:center;border-bottom:1px solid #ede8df;"><span style="font-size:9px;font-weight:700;color:'+stockColor+';">' + (p.stock||0) + '</span></td>'
        + '</tr>';
    }).join('');
    return '<tr style="page-break-inside:avoid;"><td colspan="7" style="padding:10px 8px 4px;background:#1A3A6B;"><span style="font-size:9px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#fff;">' + cat + '</span><span style="font-size:8px;color:rgba(255,255,255,.5);margin-left:8px;">' + catMap[cat].length + ' products</span></td></tr>'
      + rows;
  }).join('');

  var date = new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'long',year:'numeric'});
  var html = '<!DOCTYPE html><html><head><meta charset="UTF-8">'
    + '<title>India Gully HORECA Product Catalogue</title>'
    + '<style>'
    + '@page{margin:15mm 12mm;size:A4 landscape;}'
    + 'body{font-family:Arial,Helvetica,sans-serif;margin:0;color:#111;-webkit-print-color-adjust:exact;print-color-adjust:exact;}'
    + 'table{width:100%;border-collapse:collapse;}'
    + 'th{background:#111;color:#fff;padding:6px 8px;font-size:8px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;text-align:left;}'
    + '.page-header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px;padding-bottom:10px;border-bottom:3px solid #B8960C;}'
    + '.cover{background:linear-gradient(135deg,#0a1628,#1A3A6B);padding:24px;margin-bottom:20px;}'
    + '.badge-row{display:flex;gap:8px;margin:10px 0;}'
    + '.badge{background:rgba(184,150,12,.15);border:1px solid rgba(184,150,12,.3);padding:3px 10px;font-size:8px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#B8960C;}'
    + '@media print{.no-print{display:none!important;}tr{page-break-inside:avoid;}}'
    + '</style></head><body>'
    + '<div class="no-print" style="text-align:center;padding:12px;background:#f0fdf4;border:1px solid #a7f3d0;font-size:13px;font-family:Arial;margin-bottom:12px;">'
    + '✅ &nbsp;PDF brochure ready — click <strong>Print / Save as PDF</strong> in your browser to save. <button onclick="window.print()" style="margin-left:12px;background:#B8960C;color:#fff;border:none;padding:6px 16px;cursor:pointer;font-size:13px;font-weight:700;">🖨 Print / Save PDF</button></div>'
    + '<div class="cover"><div style="display:flex;justify-content:space-between;align-items:flex-start;">'
    + '<div><div style="font-size:8px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(184,150,12,.7);margin-bottom:6px;">India Gully · HORECA Solutions Division</div>'
    + '<div style="font-family:Georgia,serif;font-size:26px;color:#fff;line-height:1.15;margin-bottom:4px;">HORECA Product<br>Catalogue</div>'
    + '<div style="font-size:9px;color:rgba(255,255,255,.5);">Kitchen Equipment · FF&E · OS&E · Linen · Uniforms · Guest Amenities</div>'
    + '<div class="badge-row"><span class="badge">' + products.length + ' Products</span><span class="badge">' + Object.keys(catMap).length + ' Categories</span><span class="badge">GST Inclusive</span></div></div>'
    + '<div style="text-align:right;"><div style="font-size:9px;color:rgba(255,255,255,.5);">Generated: ' + date + '</div>'
    + '<div style="font-size:9px;color:rgba(255,255,255,.5);margin-top:4px;">Pavan Manikonda — HORECA Division</div>'
    + '<div style="font-size:9px;color:rgba(255,255,255,.5);">pavan@indiagully.com</div>'
    + '<div style="font-size:9px;color:rgba(255,255,255,.5);">+91 62825 56067</div>'
    + '<div style="font-size:8px;color:rgba(255,255,255,.35);margin-top:6px;">Vivacious Entertainment &amp; Hospitality Pvt. Ltd.<br>GSTIN: 07AAGCV0867P1ZN</div></div></div></div>'
    + '<table><thead><tr>'
    + '<th style="width:80px;">SKU</th><th>Product Name</th><th style="width:70px;">Unit</th><th style="width:90px;text-align:right;">Price (INR)</th><th style="width:50px;text-align:center;">GST%</th><th style="width:70px;">HSN Code</th><th style="width:50px;text-align:center;">Stock</th>'
    + '</tr></thead><tbody>' + catSections + '</tbody></table>'
    + '<div style="margin-top:14px;padding-top:8px;border-top:1px solid #e4dece;display:flex;justify-content:space-between;align-items:center;">'
    + '<div style="font-size:7.5px;color:#94a3b8;">All prices in INR exclusive of GST · Prices subject to change without notice · For latest pricing contact Pavan Manikonda</div>'
    + '<div style="font-size:7.5px;color:#94a3b8;">india-gully.pages.dev/horeca · pavan@indiagully.com · +91 62825 56067</div>'
    + '</div></body></html>';

  var w = window.open('', '_blank', 'width=1200,height=900');
  if (w) {
    w.document.write(html);
    w.document.close();
  } else {
    igShowToast('Pop-up blocked. Please allow pop-ups and try again.', 'warn');
  }
}

// ── Excel/BOQ Export ──────────────────────────────────────────────────────────
function igCatDownloadBOQ() {
  var products = _igCatProducts.filter(function(p){ return p.active !== false; });
  if (_igCatActiveCategory) products = products.filter(function(p){ return p.category === _igCatActiveCategory; });
  if (products.length === 0) { igShowToast('No products to export', 'warn'); return; }
  igShowToast('Building BOQ Excel…', 'info');

  // Group by category for BOQ sections
  var catMap = {};
  products.forEach(function(p){
    if (!catMap[p.category]) catMap[p.category] = [];
    catMap[p.category].push(p);
  });

  var date = new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'long',year:'numeric'});

  // Build HTML-based Excel (XLS-compatible HTML table)
  var rows = '';
  var rowNum = 1;
  Object.keys(catMap).forEach(function(cat) {
    // Category header row
    rows += '<tr style="background:#1A3A6B;">'
      + '<td colspan="13" style="font-size:11pt;font-weight:bold;color:#fff;padding:6px 8px;letter-spacing:.1em;text-transform:uppercase;">' + cat.toUpperCase() + ' (' + catMap[cat].length + ' items)</td>'
      + '</tr>';
    catMap[cat].forEach(function(p, i) {
      var price = p.price || 0;
      var gst = p.gst_rate || 18;
      var priceIncGst = Math.round(price * (1 + gst/100));
      rows += '<tr style="background:' + (i%2===0?'#fff':'#fafaf7') + ';">'
        + '<td style="padding:5px 6px;font-size:9pt;color:#555;">' + rowNum + '</td>'
        + '<td style="padding:5px 6px;font-size:8pt;font-family:monospace;color:#0d9488;">' + p.sku + '</td>'
        + '<td style="padding:5px 6px;font-size:9pt;font-weight:bold;">' + p.name + '</td>'
        + '<td style="padding:5px 6px;font-size:8pt;color:#555;">' + p.category + '</td>'
        + '<td style="padding:5px 6px;font-size:8pt;color:#666;">' + (p.brand||'—') + '</td>'
        + '<td style="padding:5px 6px;font-size:8pt;text-align:center;">' + (p.unit||'Piece') + '</td>'
        + '<td style="padding:5px 6px;font-size:9pt;text-align:right;font-weight:bold;color:#B8960C;">₹' + price.toLocaleString('en-IN') + '</td>'
        + '<td style="padding:5px 6px;font-size:8pt;text-align:center;">' + gst + '%</td>'
        + '<td style="padding:5px 6px;font-size:9pt;text-align:right;">₹' + priceIncGst.toLocaleString('en-IN') + '</td>'
        + '<td style="padding:5px 6px;font-size:8pt;text-align:center;font-family:monospace;">' + (p.hsn||'—') + '</td>'
        + '<td style="padding:5px 6px;font-size:9pt;text-align:center;font-weight:bold;color:' + (p.stock===0?'#dc2626':(p.stock<=p.reorder?'#d97706':'#16a34a')) + ';">' + (p.stock||0) + '</td>'
        + '<td style="padding:5px 6px;font-size:8pt;color:#888;"><!-- Qty --></td>'
        + '<td style="padding:5px 6px;font-size:8pt;color:#888;"><!-- Remarks --></td>'
        + '</tr>';
      rowNum++;
    });
  });

  var html = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">'
    + '<head><meta charset="UTF-8"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">'
    + '<!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>HORECA BOQ</x:Name>'
    + '<x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->'
    + '<style>td,th{border:1px solid #e4dece;}</style></head><body>'
    + '<table>'
    // Title rows
    + '<tr><td colspan="13" style="background:#0a1628;color:#B8960C;font-size:16pt;font-weight:bold;font-family:Georgia,serif;padding:10px 12px;">India Gully HORECA — Bill of Quantities (BOQ)</td></tr>'
    + '<tr style="background:#f8f6f1;"><td colspan="13" style="font-size:9pt;color:#555;padding:6px 12px;">Generated: ' + date + ' · Vivacious Entertainment &amp; Hospitality Pvt. Ltd. · GSTIN: 07AAGCV0867P1ZN · Contact: pavan@indiagully.com · +91 62825 56067</td></tr>'
    + '<tr><td colspan="13" style="padding:4px;background:#fff;"></td></tr>'
    // Column headers
    + '<tr style="background:#111;">'
    + '<th style="padding:6px 8px;font-size:9pt;color:#fff;text-align:center;">S.No</th>'
    + '<th style="padding:6px 8px;font-size:9pt;color:#fff;">SKU</th>'
    + '<th style="padding:6px 8px;font-size:10pt;color:#fff;">Product Name</th>'
    + '<th style="padding:6px 8px;font-size:9pt;color:#fff;">Category</th>'
    + '<th style="padding:6px 8px;font-size:9pt;color:#fff;">Brand</th>'
    + '<th style="padding:6px 8px;font-size:9pt;color:#fff;text-align:center;">Unit</th>'
    + '<th style="padding:6px 8px;font-size:9pt;color:#fff;text-align:right;">Unit Price (Ex-GST)</th>'
    + '<th style="padding:6px 8px;font-size:9pt;color:#fff;text-align:center;">GST Rate</th>'
    + '<th style="padding:6px 8px;font-size:9pt;color:#fff;text-align:right;">Price (Inc-GST)</th>'
    + '<th style="padding:6px 8px;font-size:9pt;color:#fff;">HSN Code</th>'
    + '<th style="padding:6px 8px;font-size:9pt;color:#fff;text-align:center;">Stock Qty</th>'
    + '<th style="padding:6px 8px;font-size:9pt;color:#B8960C;text-align:center;">Required Qty</th>'
    + '<th style="padding:6px 8px;font-size:9pt;color:#B8960C;">Remarks / Specs</th>'
    + '</tr>'
    + rows
    + '<tr><td colspan="13" style="padding:12px;background:#f8f6f1;font-size:8.5pt;color:#888;">* Prices are indicative and subject to change. Final pricing confirmed on Purchase Order. All prices in INR. India Gully HORECA Division · pavan@indiagully.com</td></tr>'
    + '</table></body></html>';

  var blob = new Blob([html], { type: 'application/vnd.ms-excel;charset=utf-8;' });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = 'india-gully-horeca-boq-' + new Date().toISOString().slice(0,10) + '.xls';
  a.click();
  URL.revokeObjectURL(url);
  igShowToast('BOQ Excel downloaded — ' + products.length + ' products, ready to fill quantities', 'success');
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
    description: 'India Gully HORECA product catalogue — browse 500+ SKUs across kitchen equipment, crockery, linen, bar, housekeeping, furniture, technology and safety. Download CSV or PDF.',
    canonical: 'https://india-gully.pages.dev/horeca/catalogue'
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
