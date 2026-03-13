import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

app.get('/', (c) => {
  const service = c.req.query('service') || ''
  const mandate = c.req.query('mandate') || ''

  const content = `

<!-- CONTACT HERO -->
<div class="hero-dk">
  <div class="hero-dk-grid"></div>
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse 55% 70% at 60% 50%,rgba(184,150,12,.06) 0%,transparent 55%);pointer-events:none;"></div>
  <div style="position:absolute;bottom:0;left:0;right:0;height:120px;background:linear-gradient(to bottom,transparent,var(--ink));pointer-events:none;"></div>
  <!-- Floating accent -->
  <div style="position:absolute;right:5%;bottom:-2rem;font-family:'DM Serif Display',Georgia,serif;font-size:clamp(10rem,18vw,18rem);color:rgba(184,150,12,.025);line-height:1;pointer-events:none;user-select:none;">24h</div>
  <div class="wrap" style="position:relative;">
    <div style="max-width:720px;" class="fu">
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.75rem;">
        <div style="width:40px;height:1px;background:linear-gradient(90deg,var(--gold),transparent);"></div>
        <span style="font-size:.6rem;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);">Contact &amp; RFQ</span>
      </div>
      <h1 class="h1" style="margin-bottom:1.75rem;">Let's Work<br><em style="color:var(--gold);font-style:italic;">Together</em></h1>
      <p class="lead-lt" style="max-width:540px;margin-bottom:2.5rem;">Submit a mandate enquiry, HORECA RFQ or general inquiry. Our leadership team reviews all submissions within 24 hours.</p>
      <!-- Response commitments -->
      <div style="display:flex;flex-wrap:wrap;gap:1.5rem;">
        ${[{icon:"clock",t:"24h Response","s":"Guaranteed for all enquiries"},{icon:"shield-alt",t:"Confidential","s":"Mutual NDA framework"},{icon:"user-tie",t:"Leadership Review","s":"Direct to MD & ED"}].map(i=>`<div style="display:flex;align-items:center;gap:.625rem;"><div class="ig-icon-box-sm"><i class="fas fa-${i.icon}" style="color:var(--gold);font-size:.65rem;"></i></div><div><div style="font-size:.78rem;font-weight:600;color:#fff;">${i.t}</div><div style="font-size:.67rem;color:rgba(255,255,255,.45);">${i.s}</div></div></div>`).join('')}
      </div>
    </div>
  </div>
</div>

<!-- CONTACT BODY -->
<div class="sec-wh">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:3fr 2fr;gap:4.5rem;align-items:start;">

      <!-- FORM -->
      <div>
        <div class="gr"></div>
        <p class="eyebrow" style="margin-bottom:.75rem;">Submit an Enquiry</p>
        <h2 class="h2" style="margin-bottom:1.75rem;">Mandate &amp; Advisory<br>Enquiry Form</h2>

        <form class="ig-form" method="POST" action="/api/enquiry" style="display:flex;flex-direction:column;gap:1.25rem;">
          ${mandate ? `<input type="hidden" name="mandate_ref" value="${mandate}">` : ''}
          ${service ? `<input type="hidden" name="service_ref" value="${service}">` : ''}

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;">
            <div>
              <label class="ig-lbl">First Name *</label>
              <input type="text" name="first_name" class="ig-inp" required placeholder="First name">
            </div>
            <div>
              <label class="ig-lbl">Last Name *</label>
              <input type="text" name="last_name" class="ig-inp" required placeholder="Last name">
            </div>
          </div>

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;">
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
            <label class="ig-lbl">Organisation / Company</label>
            <input type="text" name="company" class="ig-inp" placeholder="Developer, Fund, Family Office, Operator…">
          </div>

          <div>
            <label class="ig-lbl">Enquiry Type *</label>
            <select name="enquiry_type" class="ig-inp" required>
              <option value="">Select type of enquiry</option>
              <option value="mandate" ${mandate ? 'selected' : ''}>Mandate / Investment Enquiry</option>
              <option value="advisory" ${service ? 'selected' : ''}>Advisory Services Enquiry</option>
              <option value="horeca">HORECA Supply Enquiry</option>
              <option value="hotel_mgmt">Hotel Management / Brand On-Boarding</option>
              <option value="retail">Retail Leasing Advisory</option>
              <option value="general">General Enquiry</option>
            </select>
          </div>

          <div>
            <label class="ig-lbl">Project / Mandate Location</label>
            <input type="text" name="location" class="ig-inp" placeholder="City, State or Region">
          </div>

          <div>
            <label class="ig-lbl">Project Scale / Investment Range</label>
            <select name="scale" class="ig-inp">
              <option value="">Select scale</option>
              <option>Below ₹25 Crores</option>
              <option>₹25 Cr, ₹100 Cr</option>
              <option>₹100 Cr, ₹500 Cr</option>
              <option>₹500 Cr, ₹2,000 Cr</option>
              <option>Above ₹2,000 Cr</option>
            </select>
          </div>

          <div>
            <label class="ig-lbl">Message / Brief *</label>
            <textarea name="message" class="ig-inp" required placeholder="Please provide a brief description of your project, mandate or enquiry, including sector, location and stage of development…"></textarea>
          </div>

          <div>
            <label style="display:flex;align-items:flex-start;gap:.6rem;cursor:pointer;font-size:.78rem;color:var(--ink-soft);">
              <input type="checkbox" name="nda_consent" required style="accent-color:var(--gold);margin-top:.15rem;flex-shrink:0;">
              I understand that all information shared with India Gully is subject to mutual confidentiality and will not be disclosed to third parties without consent.
            </label>
          </div>

          <button type="submit" class="btn btn-g" style="width:100%;justify-content:center;padding:1rem;font-size:.82rem;">
            <i class="fas fa-paper-plane" style="margin-right:.5rem;"></i>Submit Mandate Enquiry
          </button>

          <p style="font-size:.7rem;color:var(--ink-muted);line-height:1.65;text-align:center;">All enquiries are treated with strict confidentiality. Our leadership team reviews all submissions within 24 hours.</p>
        </form>

<script>
/* G5: Client-side form validation — phone format + spam protection */
(function(){
  var form = document.querySelector('.ig-form');
  if(!form) return;

  /* Inline error helper */
  function showErr(input, msg){
    var id = 'err-'+input.name;
    var existing = document.getElementById(id);
    if(existing) existing.remove();
    var el = document.createElement('p');
    el.id = id;
    el.style.cssText = 'font-size:.72rem;color:#dc2626;margin-top:.25rem;';
    el.innerHTML = '<i class="fas fa-exclamation-circle" style="margin-right:.25rem;"></i>' + msg;
    input.parentNode.appendChild(el);
    input.style.borderColor = '#dc2626';
  }
  function clearErr(input){
    var el = document.getElementById('err-'+input.name);
    if(el) el.remove();
    input.style.borderColor = '';
  }

  /* Phone validation: Indian mobile (+91 or 0, 10 digits) or international */
  function validatePhone(val){
    var cleaned = val.replace(/[\\s\\-().]/g,'');
    return /^(\\+91|0)?[6-9]\\d{9}$/.test(cleaned) || /^\\+\\d{7,15}$/.test(cleaned);
  }

  /* Honeypot field (spam protection) — hidden by CSS */
  var hp = document.createElement('input');
  hp.type = 'text'; hp.name = 'ig_hp'; hp.tabIndex = -1; hp.autocomplete = 'off';
  hp.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;';
  form.appendChild(hp);

  /* Submission rate-limit: max 3 attempts per 10 min */
  var submitKey = 'ig_contact_submits';
  var submitWindowKey = 'ig_contact_window';

  form.addEventListener('submit', function(e){
    var valid = true;
    var submitBtn = form.querySelector('button[type=submit]');

    /* Honeypot check */
    if(hp.value){ e.preventDefault(); return; }

    /* Rate limiting */
    var now = Date.now();
    var windowStart = parseInt(localStorage.getItem(submitWindowKey)||'0');
    var submits = parseInt(localStorage.getItem(submitKey)||'0');
    if(now - windowStart > 10*60*1000){ submits = 0; localStorage.setItem(submitWindowKey, String(now)); }
    if(submits >= 3){
      e.preventDefault();
      var existingRateErr = document.getElementById('rate-limit-err');
      if(!existingRateErr){
        var rateEl = document.createElement('div');
        rateEl.id = 'rate-limit-err';
        rateEl.style.cssText = 'background:#fef2f2;border:1px solid #fecaca;padding:.75rem 1rem;font-size:.78rem;color:#991b1b;margin-bottom:.5rem;';
        rateEl.innerHTML = '<i class="fas fa-ban" style="margin-right:.4rem;"></i>Too many submissions. Please wait 10 minutes before trying again.';
        form.insertBefore(rateEl, submitBtn);
      }
      return;
    }

    /* Name validation */
    ['first_name','last_name'].forEach(function(n){
      var inp = form.querySelector('[name='+n+']');
      if(!inp) return;
      clearErr(inp);
      var v = inp.value.trim();
      if(v.length < 2){ showErr(inp, 'Please enter at least 2 characters.'); valid = false; }
      else if(/[<>&"'\\\\]/.test(v)){ showErr(inp, 'Special characters not allowed.'); valid = false; }
    });

    /* Email validation */
    var emailInp = form.querySelector('[name=email]');
    if(emailInp){
      clearErr(emailInp);
      if(!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(emailInp.value.trim())){
        showErr(emailInp, 'Please enter a valid email address (e.g. you@example.com).'); valid = false;
      }
    }

    /* Phone validation */
    var phoneInp = form.querySelector('[name=phone]');
    if(phoneInp && phoneInp.value.trim()){
      clearErr(phoneInp);
      if(!validatePhone(phoneInp.value.trim())){
        showErr(phoneInp, 'Enter a valid Indian mobile (+91 XXXXX XXXXX) or international number.'); valid = false;
      }
    }

    /* Message minimum length */
    var msgInp = form.querySelector('[name=message]');
    if(msgInp){
      clearErr(msgInp);
      if(msgInp.value.trim().length < 20){
        showErr(msgInp, 'Please provide at least 20 characters in your message.'); valid = false;
      }
    }

    if(!valid){ e.preventDefault(); return; }

    /* Increment submit counter */
    localStorage.setItem(submitKey, String(submits + 1));

    /* Loading state */
    if(submitBtn){
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin" style="margin-right:.5rem;"></i>Submitting…';
    }
  });

  /* Real-time phone hint */
  var phoneInp2 = form.querySelector('[name=phone]');
  if(phoneInp2){
    phoneInp2.addEventListener('blur', function(){
      if(phoneInp2.value.trim() && !validatePhone(phoneInp2.value.trim())){
        showErr(phoneInp2, 'Enter a valid Indian mobile (+91 XXXXX XXXXX) or international number.');
      } else {
        clearErr(phoneInp2);
      }
    });
  }
})();
</script>
      </div>

      <!-- SIDEBAR INFO -->
      <div style="display:flex;flex-direction:column;gap:1.25rem;">

        <!-- Leadership Contacts -->
        <div style="background:var(--ink);padding:2.25rem;position:relative;overflow:hidden;">
          <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--gold),var(--gold-lt),transparent);opacity:.7;"></div>
          <p class="eyebrow-lt" style="margin-bottom:1.5rem;">Leadership Direct</p>
          ${[
            { name:'Arun Manikonda',  title:'Managing Director',    init:'AM', photo:'/static/team/arun-manikonda.jpg', ph:'+91 98108 89134', em:'akm@indiagully.com' },
            { name:'Pavan Manikonda', title:'Executive Director',    init:'PM', photo:'/static/team/pavan-manikonda.jpg', ph:'+91 62825 56067', em:'pavan@indiagully.com' },
            { name:'Amit Jhingan',    title:'President, Real Estate',init:'AJ', photo:'/static/team/amit-jhingan.png', ph:'+91 98999 93543', em:'amit.jhingan@indiagully.com' },
          ].map(p => `
          <div style="display:flex;align-items:center;gap:1rem;padding:.875rem 0;border-bottom:1px solid rgba(255,255,255,.06);">
            <div style="width:44px;height:44px;border-radius:50%;overflow:hidden;flex-shrink:0;border:2px solid var(--gold);background:var(--ink);">
              <img src="${p.photo}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;object-position:center top;"
                   onerror="this.onerror=null;this.style.display='none';this.parentElement.innerHTML='<div style=\'width:44px;height:44px;background:var(--gold);border-radius:50%;display:flex;align-items:center;justify-content:center;\'><span style=\'font-family:DM Serif Display,Georgia,serif;font-size:.85rem;color:#fff;font-weight:700;\'>${p.init}</span></div>';">
            </div>
            <div style="flex:1;min-width:0;">
              <div style="font-size:.85rem;font-weight:600;color:#fff;margin-bottom:.1rem;">${p.name}</div>
              <div style="font-size:.72rem;color:rgba(255,255,255,.65);margin-bottom:.35rem;">${p.title}</div>
              <a href="tel:${p.ph.replace(/\\s/g,'')}" style="font-size:.72rem;color:rgba(255,255,255,.65);display:block;transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='rgba(255,255,255,.65)'">${p.ph}</a>
              <a href="mailto:${p.em}" style="font-size:.72rem;color:rgba(255,255,255,.65);display:block;word-break:break-all;transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='rgba(255,255,255,.65)'">${p.em}</a>
            </div>
          </div>
          `).join('')}
        </div>

        <!-- Office Info -->
        <div style="border:1px solid var(--border);padding:1.5rem;">
          <p style="font-size:.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:1rem;">Office &amp; General</p>
          <ul style="list-style:none;display:flex;flex-direction:column;gap:.625rem;">
            <li style="display:flex;gap:.6rem;align-items:flex-start;font-size:.8rem;color:var(--ink-soft);"><i class="fas fa-map-marker-alt" style="color:var(--gold);font-size:.65rem;margin-top:.2rem;flex-shrink:0;width:14px;"></i>New Delhi, India</li>
            <li><a href="tel:+918988988988" style="display:flex;gap:.6rem;align-items:center;font-size:.8rem;color:var(--ink-soft);transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-soft)'"><i class="fas fa-phone" style="color:var(--gold);font-size:.65rem;width:14px;"></i>+91 8988 988 988</a></li>
            <li><a href="mailto:info@indiagully.com" style="display:flex;gap:.6rem;align-items:center;font-size:.8rem;color:var(--ink-soft);transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-soft)'"><i class="fas fa-envelope" style="color:var(--gold);font-size:.65rem;width:14px;"></i>info@indiagully.com</a></li>
          </ul>
        </div>

        <!-- Portals -->
        <div style="background:var(--parch);border:1px solid var(--border);padding:1.25rem;">
          <p style="font-size:.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.875rem;">Enterprise Portals</p>
          <div style="display:flex;flex-direction:column;gap:.5rem;">
            ${[
              { href:'/portal/client',   icon:'user-tie',  label:'Client Portal' },
              { href:'/portal/employee', icon:'users',     label:'Employee Portal' },
              { href:'/portal/board',    icon:'gavel',     label:'Board & KMP Portal' },
            ].map(p => `
            <a href="${p.href}" style="display:flex;align-items:center;gap:.6rem;font-size:.78rem;color:var(--ink-soft);padding:.5rem .625rem;border:1px solid var(--border);background:#fff;transition:all .2s;" onmouseover="this.style.borderColor='var(--gold)';this.style.color='var(--gold)'" onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--ink-soft)'">
              <i class="fas fa-${p.icon}" style="color:var(--gold);font-size:.65rem;width:14px;"></i>${p.label}
              <i class="fas fa-arrow-right" style="margin-left:auto;font-size:.6rem;"></i>
            </a>
            `).join('')}
          </div>
        </div>

        <!-- Disclaimer -->
        <div style="background:rgba(184,150,12,.05);border:1px solid rgba(184,150,12,.15);padding:1.125rem;">
          <p style="font-size:.7rem;color:var(--ink-muted);line-height:1.7;"><i class="fas fa-shield-alt" style="color:var(--gold);margin-right:.4rem;"></i>All information submitted is handled with strict confidentiality under our privacy policy and mutual NDA framework.</p>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ── TEAM QUICK-DIAL ───────────────────────────────────────────────── -->
<div style="background:var(--ink);padding:3.5rem 0;border-top:1px solid rgba(255,255,255,.07);">
  <div class="wrap">
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;margin-bottom:2rem;">
      <div>
        <p class="eyebrow" style="margin-bottom:.4rem;color:var(--gold);">Direct Line</p>
        <h2 class="h2" style="color:#fff;margin:0;">Leadership Quick Dial</h2>
      </div>
      <span class="sla-badge">Responds within 24 hours</span>
    </div>
    <div class="tel-grid" style="--bg:var(--ink);">
      <div class="tel-card">
        <img src="https://hotelrajshreechandigarh.com/wp-content/uploads/2025/12/IMG_1157-1-scaled-1.webp"
          alt="Arun Manikonda" class="tel-avatar"
          onerror="this.style.display='none';this.nextSibling.style.display='flex'">
        <div style="width:48px;height:48px;border-radius:50%;background:rgba(212,174,42,.15);display:none;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0;border:2px solid rgba(212,174,42,.3);">👔</div>
        <div>
          <div class="tel-name">Arun Manikonda</div>
          <div class="tel-title">Managing Director</div>
          <div class="tel-contact">
            <a href="tel:+918988988988" class="tel-link"><i class="fas fa-phone" style="width:14px;color:var(--gold);font-size:.7rem;"></i> +91 8988 988 988</a>
            <a href="mailto:akm@indiagully.com" class="tel-link"><i class="fas fa-envelope" style="width:14px;color:var(--gold);font-size:.7rem;"></i> akm@indiagully.com</a>
            <a href="https://wa.me/918988988988?text=Hi%20Arun%2C%20I%20would%20like%20to%20discuss%20a%20mandate." target="_blank" rel="noopener" class="tel-link" style="color:#25D366;"><i class="fab fa-whatsapp" style="width:14px;font-size:.8rem;"></i> WhatsApp</a>
          </div>
        </div>
      </div>
      <div class="tel-card">
        <div style="width:48px;height:48px;border-radius:50%;background:rgba(212,174,42,.15);display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0;border:2px solid rgba(212,174,42,.3);">👔</div>
        <div>
          <div class="tel-name">Pavan Manikonda</div>
          <div class="tel-title">Executive Director</div>
          <div class="tel-contact">
            <a href="tel:+918988988988" class="tel-link"><i class="fas fa-phone" style="width:14px;color:var(--gold);font-size:.7rem;"></i> +91 8988 988 988</a>
            <a href="mailto:info@indiagully.com" class="tel-link"><i class="fas fa-envelope" style="width:14px;color:var(--gold);font-size:.7rem;"></i> info@indiagully.com</a>
            <a href="https://wa.me/918988988988" target="_blank" rel="noopener" class="tel-link" style="color:#25D366;"><i class="fab fa-whatsapp" style="width:14px;font-size:.8rem;"></i> WhatsApp</a>
          </div>
        </div>
      </div>
      <div class="tel-card">
        <div style="width:48px;height:48px;border-radius:50%;background:rgba(212,174,42,.15);display:flex;align-items:center;justify-content:center;font-size:1.4rem;flex-shrink:0;border:2px solid rgba(212,174,42,.3);">🏨</div>
        <div>
          <div class="tel-name">Amit Jhingan</div>
          <div class="tel-title">President, Real Estate</div>
          <div class="tel-contact">
            <a href="tel:+918988988988" class="tel-link"><i class="fas fa-phone" style="width:14px;color:var(--gold);font-size:.7rem;"></i> +91 8988 988 988</a>
            <a href="mailto:info@indiagully.com" class="tel-link"><i class="fas fa-envelope" style="width:14px;color:var(--gold);font-size:.7rem;"></i> info@indiagully.com</a>
            <a href="https://wa.me/918988988988" target="_blank" rel="noopener" class="tel-link" style="color:#25D366;"><i class="fab fa-whatsapp" style="width:14px;font-size:.8rem;"></i> WhatsApp</a>
          </div>
        </div>
      </div>
    </div>

    <!-- SLA Badges Row -->
    <div class="trust-row" style="margin-top:2.5rem;--bg:var(--ink);">
      <div class="trust-item"><span class="sla-badge">24h Response</span><span style="margin-left:.5rem;">All enquiries acknowledged</span></div>
      <div class="trust-item"><span class="sla-badge" style="background:rgba(26,58,107,.12);border-color:rgba(93,141,239,.25);color:#93c5fd;">48h Quote</span><span style="margin-left:.5rem;">HORECA RFQs</span></div>
      <div class="trust-item"><span class="sla-badge" style="background:rgba(109,40,217,.1);border-color:rgba(109,40,217,.25);color:#c4b5fd;">Mutual NDA</span><span style="margin-left:.5rem;">Before all mandates</span></div>
      <div class="trust-item">
        <span style="font-size:.78rem;color:rgba(255,255,255,.5);">📍 New Delhi · Chandigarh · Pan-India</span>
      </div>
    </div>
  </div>
</div>

<!-- ── WHATSAPP FLOAT ─────────────────────────────────────────────────── -->
<a href="https://wa.me/918988988988?text=Hi%20India%20Gully%2C%20I%20would%20like%20to%20discuss%20a%20mandate%20or%20HORECA%20requirement."
   class="wa-float" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
</a>

`
  return c.html(layout('Contact & Enquiry', content, {
    description: 'Contact India Gully, submit a mandate enquiry, HORECA RFQ or advisory request. Our leadership team responds within 24 hours.'
  }))
})

export default app
