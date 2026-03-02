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
    <div style="max-width:660px;" class="fu">
      <div class="gr-lt"></div>
      <p class="eyebrow" style="margin-bottom:.875rem;">Contact &amp; RFQ</p>
      <h1 class="h1" style="margin-bottom:1.5rem;">Let's Work<br><em style="color:var(--gold);font-style:italic;">Together</em></h1>
      <p class="lead-lt" style="max-width:520px;">Submit a mandate enquiry, HORECA RFQ or general inquiry. Our leadership team reviews all submissions within 24 hours.</p>
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
              <option>₹25 Cr – ₹100 Cr</option>
              <option>₹100 Cr – ₹500 Cr</option>
              <option>₹500 Cr – ₹2,000 Cr</option>
              <option>Above ₹2,000 Cr</option>
            </select>
          </div>

          <div>
            <label class="ig-lbl">Message / Brief *</label>
            <textarea name="message" class="ig-inp" required placeholder="Please provide a brief description of your project, mandate or enquiry — including sector, location and stage of development…"></textarea>
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
        <div style="background:var(--ink);padding:2rem;">
          <p class="eyebrow-lt" style="margin-bottom:1.25rem;">Leadership Direct</p>
          ${[
            { name:'Arun Manikonda',  title:'Managing Director',    init:'AM', photo:'https://www.genspark.ai/api/files/s/gUf0JwAa', ph:'+91 8988 988 988', em:'akm@indiagully.com' },
            { name:'Pavan Manikonda', title:'Executive Director',    init:'PM', photo:'https://www.genspark.ai/api/files/s/Q3swImT2', ph:'+91 62825 56067', em:'pavan@indiagully.com' },
            { name:'Amit Jhingan',    title:'President, Real Estate',init:'AJ', photo:'https://www.genspark.ai/api/files/s/LQZueDyt', ph:'+91 98999 93543', em:'amit.jhingan@indiagully.com' },
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

`
  return c.html(layout('Contact & Enquiry', content, {
    description: 'Contact India Gully — submit a mandate enquiry, HORECA RFQ or advisory request. Our leadership team responds within 24 hours.'
  }))
})

export default app
