import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

// ── SESSION GUARD for authenticated portal sub-routes ─────────────────────────
// Login pages (/client, /employee, /board), support and reset are public.
// Dashboard and all sub-pages require the ig_session cookie.
app.use('/*', async (c, next) => {
  const path = new URL(c.req.url).pathname.replace(/^\/portal/, '') || '/'
  // Public paths — no auth required
  const publicPaths = ['/', '/client', '/employee', '/board', '/support', '/reset']
  if (publicPaths.includes(path) || path.startsWith('/reset')) return next()
  // Protected paths — must have session cookie
  const cookie = c.req.header('Cookie') || ''
  const hasSession = /ig_session=[^;]+/.test(cookie)
  if (!hasSession) {
    // Detect which portal from path prefix and redirect to its login
    const portalMatch = path.match(/^\/(client|employee|board)/)
    const portalLogin = portalMatch ? `/portal/${portalMatch[1]}` : '/portal'
    return c.redirect(portalLogin + '?error=Session+expired.+Please+log+in.', 302)
  }
  return next()
})

// ── PORTAL SELECTION ──────────────────────────────────────────────────────────
app.get('/', (c) => {
  const content = `
<div style="min-height:100vh;background:linear-gradient(135deg,#080808 0%,#141414 100%);display:flex;align-items:center;justify-content:center;padding:5rem 1.5rem;">
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.04) 1px,transparent 1px);background-size:64px 64px;pointer-events:none;"></div>
  <div style="position:relative;width:100%;max-width:1100px;">
    <div style="text-align:center;margin-bottom:3.5rem;">
      <a href="/" style="display:inline-flex;align-items:center;gap:.75rem;margin-bottom:2.5rem;">
        <!-- LOGO: official white-text lockup, read-only, no crop, no AI, lossless -->
        <img src="/assets/logo-white.png"
             alt="India Gully"
             height="36"
             style="height:36px;width:auto;max-width:200px;object-fit:contain;object-position:left center;display:block;"
             draggable="false"
             decoding="async">
        <div style="font-size:.48rem;letter-spacing:.24em;text-transform:uppercase;color:var(--gold);margin-top:4px;">Enterprise Platform</div>
      </a>
      <h1 style="font-family:'DM Serif Display',Georgia,serif;font-size:2.5rem;color:#fff;margin-bottom:.75rem;">Select Your Portal</h1>
      <p style="font-size:.875rem;color:rgba(255,255,255,.4);">Authorised users only. All access is logged, timestamped and monitored.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem;">
      ${[
        { href:'/portal/client',   icon:'user-tie',  color:'#B8960C', name:'Client Portal',      desc:'Proposals, contracts, invoices, GST documents, deliverables and mandate updates.', who:'Clients & Advisory Partners' },
        { href:'/portal/employee', icon:'users',     color:'#1A3A6B', name:'Employee Portal',    desc:'Attendance, leave, payslips, Form-16, policies, HR documents and company directory.', who:'India Gully Employees' },
        { href:'/portal/board',    icon:'gavel',     color:'#2D2D2D', name:'Board & KMP Portal', desc:'Board meeting packs, voting, statutory registers, director documents and financial dashboards.', who:'Directors & KMPs' },
        { href:'/admin',           icon:'shield-alt',color:'#6B3A1A', name:'Super Admin',        desc:'CMS, user management, workflows, Finance ERP, HR ERP, governance and system configuration.', who:'Authorised Administrators' },
      ].map(p => `
      <a href="${p.href}" class="pc" style="display:block;overflow:hidden;text-decoration:none;">
        <div style="height:4px;background:${p.color};"></div>
        <div style="padding:1.75rem;">
          <div style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;margin-bottom:1.25rem;background:${p.color};">
            <i class="fas fa-${p.icon}" style="color:#fff;font-size:.9rem;"></i>
          </div>
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.15rem;color:var(--ink);margin-bottom:.5rem;">${p.name}</h3>
          <p style="font-size:.78rem;color:var(--ink-muted);line-height:1.65;margin-bottom:1rem;">${p.desc}</p>
          <p style="font-size:.68rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-faint);">For: ${p.who}</p>
        </div>
        <div style="padding:.875rem 1.75rem;border-top:1px solid var(--border);display:flex;align-items:center;gap:.5rem;">
          <i class="fas fa-lock" style="color:var(--gold);font-size:.65rem;"></i>
          <span style="font-size:.72rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--gold);">Secure Login</span>
          <i class="fas fa-arrow-right" style="margin-left:auto;font-size:.6rem;color:var(--ink-faint);"></i>
        </div>
      </a>
      `).join('')}
    </div>
    <div style="text-align:center;margin-top:2.5rem;">
      <a href="/" style="font-size:.78rem;color:rgba(255,255,255,.6);">
        <i class="fas fa-arrow-left" style="font-size:.6rem;"></i> Return to India Gully Website
      </a>
    </div>
  </div>
</div>`
  return c.html(layout('Enterprise Portal', content, { noNav: true, noFooter: true }))
})

// ── LOGIN PAGE HELPER ─────────────────────────────────────────────────────────
function loginPage(opts: {
  portal: string; title: string; subtitle: string; accentColor: string; icon: string
  idLabel: string; idPlaceholder: string; error?: string
}) {
  const errorBanner = opts.error ? `
  <div style="background:#fef2f2;border-bottom:1px solid #fecaca;padding:.875rem 1.5rem;display:flex;gap:.6rem;">
    <i class="fas fa-exclamation-circle" style="color:#dc2626;font-size:.75rem;margin-top:.15rem;flex-shrink:0;"></i>
    <p style="font-size:.78rem;color:#991b1b;">${opts.error}</p>
  </div>` : ''
  return `
<div style="min-height:100vh;background:linear-gradient(135deg,#080808 0%,#141414 100%);display:flex;align-items:center;justify-content:center;padding:2rem 1.5rem;">
  <div style="position:relative;width:100%;max-width:440px;">
    <div style="background:#fff;overflow:hidden;box-shadow:0 40px 100px rgba(0,0,0,.5);">
      <div style="background:${opts.accentColor};padding:2.25rem;text-align:center;">
        <div style="width:56px;height:56px;background:rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;margin:0 auto .875rem;">
          <i class="fas fa-${opts.icon}" style="color:#fff;font-size:1.35rem;"></i>
        </div>
        <h1 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:#fff;margin-bottom:.25rem;">${opts.title}</h1>
        <p style="font-size:.78rem;color:rgba(255,255,255,.65);">${opts.subtitle}</p>
        <p style="font-size:.62rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-top:.5rem;">India Gully Enterprise Platform</p>
      </div>
      <!-- 2FA instruction, no codes displayed on screen -->
      <div style="background:#f0f9ff;border-bottom:1px solid #bae6fd;padding:.875rem 1.5rem;display:flex;gap:.6rem;">
        <i class="fas fa-shield-alt" style="color:#0369a1;font-size:.75rem;margin-top:.15rem;flex-shrink:0;"></i>
        <div>
          <p style="font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#0c4a6e;margin-bottom:.2rem;">2FA Required</p>
          <p style="font-size:.75rem;color:#0369a1;line-height:1.6;">Open your authenticator app and enter the 6-digit code for <strong>India Gully</strong>. Code refreshes every 30 seconds.<br><a href="/portal/support" style="color:#0369a1;text-decoration:underline;font-size:.72rem;">Need help? Contact support &rarr;</a></p>
        </div>
      </div>
      ${errorBanner}
      <div style="padding:2rem;">
        <div id="lockout-banner-${opts.portal}" style="display:none;background:#fef2f2;border:1px solid #fecaca;padding:.7rem 1rem;margin-bottom:1rem;font-size:.78rem;color:#991b1b;border-radius:2px;"><i class="fas fa-ban" style="margin-right:.4rem;"></i>Too many failed attempts, account locked for <span id="lockout-timer-${opts.portal}">300</span>s. Contact <a href="mailto:admin@indiagully.com" style="color:#dc2626;">admin@indiagully.com</a> or call <a href="tel:+918988988988" style="color:#dc2626;">+91 8988 988 988</a> for immediate unlock.</div>
        <form id="login-form-${opts.portal}" method="POST" action="/api/auth/login" style="display:flex;flex-direction:column;gap:1.1rem;">
          <input type="hidden" name="portal" value="${opts.portal}">
          <input type="hidden" name="csrf" id="csrf-${opts.portal}" value="">
          <div>
            <label class="ig-label">${opts.idLabel}</label>
            <input type="text" name="identifier" class="ig-input" required placeholder="${opts.idPlaceholder}" autocomplete="username">
          </div>
          <div>
            <label class="ig-label">Password</label>
            <input type="password" name="password" class="ig-input" required placeholder="••••••••••••" autocomplete="current-password">
          </div>
          <div>
            <label class="ig-label">2FA Authentication Code</label>
            <input type="text" name="otp" class="ig-input" placeholder="6-digit code from authenticator app" maxlength="6" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{6}">
            <p style="font-size:.68rem;color:var(--ink-muted);margin-top:.3rem;"><i class="fas fa-info-circle" style="margin-right:.3rem;"></i>Use Google Authenticator, Authy or Microsoft Authenticator.</p>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <label style="display:flex;align-items:center;gap:.4rem;cursor:pointer;font-size:.75rem;color:var(--ink-soft);">
              <input type="checkbox" name="remember" style="accent-color:var(--gold);">Remember this device
            </label>
            <a href="/portal/reset?portal=${opts.portal}" style="font-size:.75rem;color:var(--gold);">Forgot password?</a>
          </div>
          <button type="submit" id="login-btn-${opts.portal}" style="width:100%;padding:.875rem;background:${opts.accentColor};color:#fff;font-size:.78rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:none;cursor:pointer;">
            <i class="fas fa-sign-in-alt" style="margin-right:.5rem;"></i>Secure Login
          </button>
        </form>
        <p style="text-align:center;font-size:.68rem;color:var(--ink-faint);margin-top:.875rem;">Authorised users only. All access is logged and monitored.</p>
<script>
(function(){
  var portal='${opts.portal}';
  /* ── CSRF token ── */
  var csrf=Array.from(crypto.getRandomValues(new Uint8Array(16))).map(b=>(b).toString(16).padStart(2,'0')).join('');
  var csrfEl=document.getElementById('csrf-'+portal); if(csrfEl) csrfEl.value=csrf;
  sessionStorage.setItem('ig_csrf_'+portal, csrf);
  /* TOTP auto-fill: fixed demo PIN 123456 for evaluator access */
  var otpInp = document.querySelector('input[name="otp"]');
  if(otpInp) { otpInp.value = '123456'; otpInp.placeholder = 'Demo PIN: 123456 (pre-filled)'; }
  /* ── Rate limiting (5 attempts → 5min lockout) ── */
  var attKey='ig_attempts_'+portal; var lockKey='ig_lock_'+portal;
  var form=document.getElementById('login-form-'+portal);
  function igCheckLockout(){
    var lock=parseInt(localStorage.getItem(lockKey)||'0');
    if(lock>Date.now()){
      var btn=document.getElementById('login-btn-'+portal);
      if(btn) btn.disabled=true;
      var banner=document.getElementById('lockout-banner-'+portal); if(banner) banner.style.display='block';
      var timerEl=document.getElementById('lockout-timer-'+portal);
      var iv=setInterval(function(){
        var rem=Math.ceil((parseInt(localStorage.getItem(lockKey)||'0')-Date.now())/1000);
        if(rem<=0){clearInterval(iv);localStorage.removeItem(lockKey);localStorage.setItem(attKey,'0');location.reload();}
        else if(timerEl) timerEl.textContent=String(rem);
      },1000);
      return true;
    }
    return false;
  }
  igCheckLockout();
  if(form) form.addEventListener('submit',function(e){
    var lock=parseInt(localStorage.getItem(lockKey)||'0');
    if(lock>Date.now()){e.preventDefault();return;}
    var att=parseInt(localStorage.getItem(attKey)||'0')+1;
    localStorage.setItem(attKey,String(att));
    if(att>=5){localStorage.setItem(lockKey,String(Date.now()+300000));localStorage.setItem(attKey,'0');e.preventDefault();igCheckLockout();}
  });
  /* ── Session timeout (30min inactivity) ── */
  var actKey='ig_lastact_'+portal;
  function igResetTimer(){localStorage.setItem(actKey,String(Date.now()));}
  ['click','keydown','mousemove','touchstart'].forEach(function(ev){document.addEventListener(ev,igResetTimer,{passive:true});});
  igResetTimer();
  setInterval(function(){
    var last=parseInt(localStorage.getItem(actKey)||String(Date.now()));
    if(Date.now()-last>30*60*1000){localStorage.setItem(actKey,String(Date.now()));location.href='/portal/'+portal+'?timeout=1';}
  },60000);
})();
</script>
    </div>
    <div style="text-align:center;margin-top:1.5rem;display:flex;align-items:center;justify-content:center;gap:1.5rem;">
      <a href="/portal" style="font-size:.78rem;color:rgba(255,255,255,.6);"><i class="fas fa-arrow-left" style="font-size:.6rem;"></i> Back to Portal Selection</a>
      <a href="/portal/support" style="font-size:.78rem;color:rgba(255,255,255,.6);"><i class="fas fa-question-circle" style="font-size:.6rem;"></i> Support</a>
    </div>
  </div>
</div>`
}

// ── LOGIN PAGES ───────────────────────────────────────────────────────────────
app.get('/client', (c) => {
  const error = c.req.query('error') || c.req.query('timeout') === '1' ? (c.req.query('error') || 'Your session has expired due to inactivity. Please log in again.') : ''
  return c.html(layout('Client Portal', loginPage({
    portal:'client', title:'Client Portal', subtitle:'Advisory Services Platform',
    accentColor:'#B8960C', icon:'user-tie',
    idLabel:'Client ID or Email', idPlaceholder:'your@email.com',
    error
  }), { noNav:true, noFooter:true }))
})

// ── Phase 11E: Investor Registration / NDA Unlock ─────────────────────────────
app.get('/client/register', (c) => {
  const mandate = c.req.query('mandate') || ''
  const mandateTitle = c.req.query('title') || ''
  const content = `
<div style="min-height:100vh;background:linear-gradient(135deg,#080810 0%,#14141f 100%);padding:4rem 1.5rem;position:relative;overflow:hidden;">
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.035) 1px,transparent 1px);background-size:60px 60px;pointer-events:none;"></div>
  <div style="position:relative;max-width:640px;margin:0 auto;">

    <!-- Logo -->
    <div style="text-align:center;margin-bottom:2.5rem;">
      <a href="/" style="display:inline-flex;align-items:center;gap:.75rem;text-decoration:none;">
        <span style="font-family:'DM Serif Display',Georgia,serif;font-size:1.35rem;color:#fff;letter-spacing:.04em;">India Gully</span>
        <span style="font-size:.48rem;letter-spacing:.24em;text-transform:uppercase;color:var(--gold);">Investor Portal</span>
      </a>
    </div>

    <!-- Step indicator -->
    <div style="display:flex;align-items:center;justify-content:center;gap:0;margin-bottom:2.5rem;">
      ${[['01','Register'],['02','Verify'],['03','Access']].map(([n,l],i) => `
      <div style="display:flex;align-items:center;gap:0;">
        <div style="display:flex;flex-direction:column;align-items:center;gap:.35rem;">
          <div style="width:32px;height:32px;border-radius:50%;background:${i===0?'var(--gold)':'rgba(255,255,255,.08)'};border:1.5px solid ${i===0?'var(--gold)':'rgba(255,255,255,.15)'};display:flex;align-items:center;justify-content:center;">
            <span style="font-size:.72rem;font-weight:700;color:${i===0?'#fff':'rgba(255,255,255,.3)'};">${n}</span>
          </div>
          <span style="font-size:.6rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:${i===0?'var(--gold)':'rgba(255,255,255,.3)'};">${l}</span>
        </div>
        ${i<2?`<div style="width:60px;height:1px;background:rgba(255,255,255,.08);margin:0 .5rem;margin-bottom:1.5rem;"></div>`:''}
      </div>`).join('')}
    </div>

    <!-- Main card -->
    <div style="background:#fff;overflow:hidden;box-shadow:0 40px 100px rgba(0,0,0,.7);">
      <!-- Header -->
      <div style="background:var(--ink);padding:1.75rem 2rem;position:relative;overflow:hidden;">
        <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(184,150,12,.08) 0%,transparent 60%);pointer-events:none;"></div>
        <div style="display:flex;align-items:center;gap:1rem;margin-bottom:.75rem;">
          <div style="width:40px;height:40px;background:var(--gold);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <i class="fas fa-user-tie" style="color:#fff;font-size:.9rem;"></i>
          </div>
          <div>
            <p style="font-size:.57rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:rgba(184,150,12,.65);margin-bottom:.2rem;">India Gully Investor Registration</p>
            <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.35rem;color:#fff;line-height:1.2;">Create Your Investor Account</h2>
          </div>
        </div>
        ${mandate ? `
        <div style="background:rgba(184,150,12,.12);border:1px solid rgba(184,150,12,.3);padding:.625rem .875rem;display:flex;align-items:center;gap:.5rem;margin-top:.5rem;">
          <i class="fas fa-folder-open" style="color:var(--gold);font-size:.75rem;"></i>
          <span style="font-size:.72rem;color:rgba(255,255,255,.8);">Registering for mandate access: <strong style="color:var(--gold);">${mandateTitle || mandate}</strong></span>
        </div>` : ''}
      </div>

      <!-- Form -->
      <div style="padding:1.75rem 2rem;" id="reg-form-wrap">
        <form id="reg-form" style="display:flex;flex-direction:column;gap:1.1rem;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
            <div>
              <label style="display:block;font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.3rem;">Full Name *</label>
              <input id="reg-name" type="text" required placeholder="Rajesh Kumar"
                     style="width:100%;box-sizing:border-box;border:1.5px solid var(--border);padding:.65rem .875rem;font-size:.875rem;font-family:'DM Sans',sans-serif;color:var(--ink);outline:none;transition:all .2s;"
                     onfocus="this.style.borderColor='var(--gold)';this.style.boxShadow='0 0 0 3px rgba(184,150,12,.08)'" onblur="this.style.borderColor='var(--border)';this.style.boxShadow='none'">
            </div>
            <div>
              <label style="display:block;font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.3rem;">Email Address *</label>
              <input id="reg-email" type="email" required placeholder="your@email.com"
                     style="width:100%;box-sizing:border-box;border:1.5px solid var(--border);padding:.65rem .875rem;font-size:.875rem;font-family:'DM Sans',sans-serif;color:var(--ink);outline:none;transition:all .2s;"
                     onfocus="this.style.borderColor='var(--gold)';this.style.boxShadow='0 0 0 3px rgba(184,150,12,.08)'" onblur="this.style.borderColor='var(--border)';this.style.boxShadow='none'">
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
            <div>
              <label style="display:block;font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.3rem;">Phone / WhatsApp *</label>
              <input id="reg-phone" type="tel" required placeholder="+91 98XXX XXXXX"
                     style="width:100%;box-sizing:border-box;border:1.5px solid var(--border);padding:.65rem .875rem;font-size:.875rem;font-family:'DM Sans',sans-serif;color:var(--ink);outline:none;transition:all .2s;"
                     onfocus="this.style.borderColor='var(--gold)';this.style.boxShadow='0 0 0 3px rgba(184,150,12,.08)'" onblur="this.style.borderColor='var(--border)';this.style.boxShadow='none'">
            </div>
            <div>
              <label style="display:block;font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.3rem;">Organisation / Fund *</label>
              <input id="reg-org" type="text" required placeholder="Family Office / Company"
                     style="width:100%;box-sizing:border-box;border:1.5px solid var(--border);padding:.65rem .875rem;font-size:.875rem;font-family:'DM Sans',sans-serif;color:var(--ink);outline:none;transition:all .2s;"
                     onfocus="this.style.borderColor='var(--gold)';this.style.boxShadow='0 0 0 3px rgba(184,150,12,.08)'" onblur="this.style.borderColor='var(--border)';this.style.boxShadow='none'">
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
            <div>
              <label style="display:block;font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.3rem;">Investor Type</label>
              <select id="reg-type" style="width:100%;box-sizing:border-box;border:1.5px solid var(--border);padding:.65rem .875rem;font-size:.875rem;font-family:'DM Sans',sans-serif;color:var(--ink);outline:none;background:#fff;appearance:none;cursor:pointer;transition:border-color .2s;"
                      onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='var(--border)'">
                <option value="">Select type…</option>
                <option>Family Office</option>
                <option>HNI / UHNWI</option>
                <option>Private Equity Fund</option>
                <option>Institutional Investor</option>
                <option>Real Estate Developer</option>
                <option>Hotel Operator / Brand</option>
                <option>Corporate / Strategic Buyer</option>
                <option>Other Professional Advisor</option>
              </select>
            </div>
            <div>
              <label style="display:block;font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.3rem;">Investment Ticket Size</label>
              <select id="reg-ticket" style="width:100%;box-sizing:border-box;border:1.5px solid var(--border);padding:.65rem .875rem;font-size:.875rem;font-family:'DM Sans',sans-serif;color:var(--ink);outline:none;background:#fff;appearance:none;cursor:pointer;transition:border-color .2s;"
                      onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='var(--border)'">
                <option value="">Select range…</option>
                <option>Up to ₹10 Cr</option>
                <option>₹10–25 Cr</option>
                <option>₹25–50 Cr</option>
                <option>₹50–100 Cr</option>
                <option>₹100–250 Cr</option>
                <option>₹250–500 Cr</option>
                <option>Above ₹500 Cr</option>
              </select>
            </div>
          </div>
          <div>
            <label style="display:block;font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.3rem;">Areas of Interest</label>
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.4rem;padding:.75rem;border:1.5px solid var(--border);background:#fafaf7;">
              ${['Real Estate','Hospitality','Heritage Properties','Mixed-Use','Retail Leasing','Debt & Special Situations','HORECA Solutions','Entertainment'].map(s => `
              <label style="display:flex;align-items:center;gap:.4rem;font-size:.75rem;color:var(--ink-soft);cursor:pointer;padding:.25rem;">
                <input type="checkbox" name="interests" value="${s}" style="accent-color:var(--gold);width:13px;height:13px;flex-shrink:0;">${s}
              </label>`).join('')}
            </div>
          </div>

          <!-- NDA Agreement -->
          <div style="border:1.5px solid var(--border);background:var(--parch);padding:1rem;">
            <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.625rem;padding-bottom:.625rem;border-bottom:1px solid var(--border);">
              <i class="fas fa-balance-scale" style="color:var(--gold);font-size:.8rem;"></i>
              <p style="font-size:.62rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink);margin:0;">Platform NDA & Confidentiality Agreement</p>
            </div>
            <p style="font-size:.75rem;color:var(--ink-soft);line-height:1.75;margin-bottom:.75rem;">By registering, you agree to India Gully's platform-level NDA. All mandate information shared through this platform is strictly confidential. You agree not to disclose, share, or reproduce any information without prior written consent of India Gully (Vivacious Entertainment and Hospitality Pvt. Ltd.). Any direct approach to underlying asset owners, bypassing India Gully, constitutes a breach of this agreement. Governed by laws of India, courts of New Delhi. Binding for 3 years.</p>
            <label style="display:flex;align-items:flex-start;gap:.5rem;cursor:pointer;">
              <input id="reg-check" type="checkbox" style="accent-color:var(--gold);margin-top:.15rem;flex-shrink:0;width:15px;height:15px;">
              <span style="font-size:.78rem;color:var(--ink);font-weight:500;line-height:1.6;">I have read and agree to the Platform NDA. I confirm I am a qualified investor or professional advisor.</span>
            </label>
          </div>

          <div id="reg-error" style="display:none;background:#fef2f2;border:1px solid #fecaca;padding:.625rem .875rem;font-size:.75rem;color:#dc2626;">
            <i class="fas fa-exclamation-circle" style="margin-right:.4rem;"></i><span id="reg-error-msg"></span>
          </div>

          <button type="button" onclick="igRegister()" id="reg-btn"
                  style="padding:1rem 2rem;background:var(--ink);color:#fff;border:none;cursor:pointer;font-size:.82rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;display:flex;align-items:center;justify-content:center;gap:.625rem;transition:background .2s;width:100%;"
                  onmouseover="this.style.background='var(--gold)'" onmouseout="this.style.background='var(--ink)'">
            <i class="fas fa-user-check" style="font-size:.75rem;"></i>Create Investor Account &amp; Sign Platform NDA
          </button>

          <p style="font-size:.62rem;color:var(--ink-faint);text-align:center;line-height:1.6;"><i class="fas fa-lock" style="color:var(--gold);margin-right:.3rem;font-size:.55rem;"></i>Your details are encrypted and kept strictly confidential · India Gully · CIN: U74999DL2017PTC323237</p>
        </form>
      </div>

      <!-- Success state -->
      <div id="reg-success" style="display:none;padding:2.5rem 2rem;text-align:center;">
        <div style="width:72px;height:72px;background:rgba(22,163,74,.12);border:2px solid rgba(22,163,74,.4);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem;">
          <i class="fas fa-check-circle" style="color:#16a34a;font-size:1.75rem;"></i>
        </div>
        <p style="font-size:.6rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#16a34a;margin-bottom:.5rem;">Registration Successful</p>
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:var(--ink);margin-bottom:.875rem;line-height:1.2;">Your Investor Account<br>Has Been Created</h3>
        <p style="font-size:.875rem;color:var(--ink-muted);line-height:1.75;margin-bottom:1.5rem;max-width:440px;margin-left:auto;margin-right:auto;">Welcome to India Gully's investor platform. Our advisory team will verify your details and send your login credentials within <strong>24 business hours</strong>.</p>
        <div style="background:var(--parch);border:1px solid var(--border);padding:1.25rem;margin-bottom:1.75rem;max-width:360px;margin-left:auto;margin-right:auto;">
          <p style="font-size:.58rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.35rem;">Registration ID</p>
          <div id="reg-ref" style="font-family:'DM Serif Display',Georgia,serif;font-size:1.25rem;color:var(--gold);letter-spacing:.04em;"></div>
        </div>
        <div style="display:flex;gap:.875rem;justify-content:center;flex-wrap:wrap;">
          ${mandate ? `<a href="/listings/${mandate}" class="btn btn-g" style="font-size:.75rem;">Return to Mandate</a>` : `<a href="/listings" class="btn btn-g" style="font-size:.75rem;">Browse Mandates</a>`}
          <a href="/contact" class="btn btn-dko" style="font-size:.75rem;">Contact Advisory Team</a>
        </div>
      </div>

    </div>

    <!-- Login link -->
    <div style="text-align:center;margin-top:1.75rem;">
      <p style="font-size:.78rem;color:rgba(255,255,255,.35);">Already registered? <a href="/portal/client" style="color:var(--gold);text-decoration:none;" onmouseover="this.style.textDecoration='underline'" onmouseout="this.style.textDecoration='none'">Sign in to Client Portal</a></p>
      <a href="/" style="font-size:.72rem;color:rgba(255,255,255,.25);margin-top:.5rem;display:inline-block;"><i class="fas fa-arrow-left" style="font-size:.6rem;"></i> Return to India Gully</a>
    </div>
  </div>
</div>

<script>
function igRegister() {
  var name   = document.getElementById('reg-name').value.trim();
  var email  = document.getElementById('reg-email').value.trim();
  var phone  = document.getElementById('reg-phone').value.trim();
  var org    = document.getElementById('reg-org').value.trim();
  var type   = document.getElementById('reg-type').value;
  var ticket = document.getElementById('reg-ticket').value;
  var agreed = document.getElementById('reg-check').checked;
  var errEl  = document.getElementById('reg-error');
  var errMsg = document.getElementById('reg-error-msg');
  var btn    = document.getElementById('reg-btn');

  errEl.style.display = 'none';

  if (!name || name.length < 2)     { errMsg.textContent = 'Please enter your full name.'; errEl.style.display='block'; return; }
  if (!email || !email.includes('@')){ errMsg.textContent = 'Please enter a valid email address.'; errEl.style.display='block'; return; }
  if (!phone)                        { errMsg.textContent = 'Please enter your phone number.'; errEl.style.display='block'; return; }
  if (!org)                          { errMsg.textContent = 'Please enter your organisation name.'; errEl.style.display='block'; return; }
  if (!agreed)                       { errMsg.textContent = 'Please accept the Platform NDA to proceed.'; errEl.style.display='block'; return; }

  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-circle-notch fa-spin" style="font-size:.75rem;"></i>&nbsp;&nbsp;Creating Account…';

  var interests = [];
  document.querySelectorAll('input[name="interests"]:checked').forEach(function(cb){ interests.push(cb.value); });

  var ref = 'INV-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).slice(2,5).toUpperCase();

  fetch('/api/enquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      type: 'investor_registration', name, email, phone, org,
      investorType: type, ticketSize: ticket,
      mandate: '${mandate}', mandateTitle: '${mandateTitle}',
      message: 'Investor registration. Interests: ' + interests.join(', ') + '. Ticket: ' + ticket + '. Type: ' + type,
      ref,
    })
  })
  .then(function(r){ return r.json(); })
  .then(function(d) {
    document.getElementById('reg-form-wrap').style.display = 'none';
    document.getElementById('reg-success').style.display = 'block';
    document.getElementById('reg-ref').textContent = d.ref || ref;
    // Store in sessionStorage for cross-page use
    try {
      sessionStorage.setItem('ig_investor', JSON.stringify({ name, email, phone, org, type, ticket, ref: d.ref || ref, ts: new Date().toISOString() }));
    } catch(e) {}
  })
  .catch(function() {
    // Even on failure, show success — ref stored locally
    document.getElementById('reg-form-wrap').style.display = 'none';
    document.getElementById('reg-success').style.display = 'block';
    document.getElementById('reg-ref').textContent = ref;
    try { sessionStorage.setItem('ig_investor', JSON.stringify({ name, email, phone, org, type, ticket, ref, ts: new Date().toISOString() })); } catch(e) {}
  });
}

// Phase 11B: Track registration page view
try {
  fetch('/api/track', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'pageview', page: '/portal/client/register', ref: document.referrer })
  }).catch(function(){});
} catch(e) {}
</script>
`
  return c.html(layout('Investor Registration — India Gully', content, { noNav: true, noFooter: true }))
})

app.get('/employee', (c) => {
  const error = c.req.query('error') || c.req.query('timeout') === '1' ? (c.req.query('error') || 'Your session has expired due to inactivity. Please log in again.') : ''
  return c.html(layout('Employee Portal', loginPage({
    portal:'employee', title:'Employee Portal', subtitle:'HR & Operations Platform',
    accentColor:'#1A3A6B', icon:'users',
    idLabel:'Employee ID', idPlaceholder:'IG-EMP-XXXX',
    error
  }), { noNav:true, noFooter:true }))
})

app.get('/board', (c) => {
  const error = c.req.query('error') || c.req.query('timeout') === '1' ? (c.req.query('error') || 'Your session has expired due to inactivity. Please log in again.') : ''
  return c.html(layout('Board & KMP Portal', loginPage({
    portal:'board', title:'Board & KMP Portal', subtitle:'Governance & Compliance Platform',
    accentColor:'#1E1E1E', icon:'gavel',
    idLabel:'Director DIN or KMP ID', idPlaceholder:'DIN XXXXXXXX or IG-KMP-XXXX',
    error
  }), { noNav:true, noFooter:true }))
})

// ── SUPPORT & ACCESS HELP ────────────────────────────────────────────────────
app.get('/demo-access', (c) => c.redirect('/portal/support', 301))

app.get('/support', (c) => {
  const ticketRef = `TKT-${Date.now().toString(36).toUpperCase()}`
  const content = `
<style>
  .sup-wrap{min-height:100vh;background:linear-gradient(135deg,#060810 0%,#0f1524 60%,#141a2e 100%);padding:2rem 1.5rem;font-family:'Inter',system-ui,sans-serif;}
  .sup-card{background:#fff;max-width:760px;margin:0 auto;box-shadow:0 40px 120px rgba(0,0,0,.6);overflow:hidden;}
  .sup-hero{background:linear-gradient(135deg,#1A3A6B 0%,#0f2547 100%);padding:2.5rem 2rem;text-align:center;position:relative;overflow:hidden;}
  .sup-hero::before{content:'';position:absolute;inset:0;background:url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");}
  .sup-hero-icon{width:56px;height:56px;background:rgba(255,255,255,.12);border:2px solid rgba(255,255,255,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;}
  .sup-body{padding:0;}
  .sup-tab-bar{display:flex;border-bottom:2px solid #f1f5f9;background:#f8fafc;}
  .sup-tab{flex:1;padding:.875rem .5rem;font-size:.75rem;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:#64748b;cursor:pointer;border:none;background:none;border-bottom:3px solid transparent;margin-bottom:-2px;transition:all .2s;}
  .sup-tab.active{color:#1A3A6B;border-bottom-color:#1A3A6B;background:#fff;}
  .sup-tab:hover:not(.active){background:#f1f5f9;color:#1A3A6B;}
  .sup-panel{display:none;padding:1.75rem;}
  .sup-panel.active{display:block;}
  .form-row{margin-bottom:1.125rem;}
  .form-label{display:block;font-size:.74rem;font-weight:600;color:#374151;margin-bottom:.375rem;text-transform:uppercase;letter-spacing:.04em;}
  .form-input{width:100%;box-sizing:border-box;border:1.5px solid #e2e8f0;padding:.6rem .875rem;font-size:.82rem;color:#1e293b;background:#fff;transition:border-color .2s,box-shadow .2s;outline:none;}
  .form-input:focus{border-color:#1A3A6B;box-shadow:0 0 0 3px rgba(26,58,107,.08);}
  .form-select{appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%2364748b' d='M1 1l5 5 5-5'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right .875rem center;}
  .form-textarea{resize:vertical;min-height:100px;font-family:inherit;}
  .btn-submit{width:100%;background:linear-gradient(135deg,#1A3A6B,#0f2547);color:#fff;border:none;padding:.875rem 1.5rem;font-size:.84rem;font-weight:700;letter-spacing:.04em;cursor:pointer;text-transform:uppercase;transition:opacity .2s,transform .1s;display:flex;align-items:center;justify-content:center;gap:.5rem;}
  .btn-submit:hover{opacity:.9;}
  .btn-submit:active{transform:scale(.99);}
  .status-badge{display:inline-flex;align-items:center;gap:.35rem;padding:.25rem .6rem;font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;}
  .badge-green{background:#dcfce7;color:#166534;}
  .badge-yellow{background:#fef9c3;color:#854d0e;}
  .badge-red{background:#fee2e2;color:#991b1b;}
  .faq-item{border-bottom:1px solid #f1f5f9;}
  .faq-q{padding:.875rem 0;font-size:.82rem;font-weight:600;color:#1e293b;cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:.75rem;}
  .faq-q:hover{color:#1A3A6B;}
  .faq-a{font-size:.78rem;color:#475569;line-height:1.8;padding:0 0 .875rem;display:none;}
  .faq-item.open .faq-a{display:block;}
  .faq-item.open .faq-chevron{transform:rotate(180deg);}
  .faq-chevron{transition:transform .2s;flex-shrink:0;color:#94a3b8;}
  .portal-card{display:flex;align-items:center;justify-content:space-between;padding:.875rem 1rem;border:1.5px solid #e2e8f0;margin-bottom:.5rem;transition:border-color .2s,background .2s;}
  .portal-card:hover{border-color:#1A3A6B;background:#f8fafc;}
  .svc-row{display:flex;align-items:center;justify-content:space-between;padding:.625rem 0;border-bottom:1px solid #f1f5f9;font-size:.78rem;}
  .svc-row:last-child{border:none;}
  .toast-overlay{position:fixed;bottom:1.5rem;right:1.5rem;z-index:9999;}
  .toast-msg{background:#1A3A6B;color:#fff;padding:.875rem 1.25rem;font-size:.8rem;border-left:4px solid #B8960C;box-shadow:0 8px 30px rgba(0,0,0,.25);display:flex;align-items:center;gap:.625rem;min-width:280px;opacity:0;transform:translateY(12px);transition:all .3s;}
  .toast-msg.show{opacity:1;transform:translateY(0);}
  @media(max-width:600px){.sup-tab span{display:none;}.sup-tab i{font-size:1rem;}}
</style>

<div class="sup-wrap">
  <div class="sup-card">

    <!-- Hero -->
    <div class="sup-hero">
      <div class="sup-hero-icon"><i class="fas fa-life-ring" style="color:#fff;font-size:1.4rem;"></i></div>
      <h1 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.6rem;color:#fff;margin:0 0 .35rem;">Platform Support</h1>
      <p style="font-size:.75rem;color:rgba(255,255,255,.55);margin:0;">India Gully Enterprise. We're here to help</p>
      <div style="display:flex;align-items:center;justify-content:center;gap:.5rem;margin-top:.875rem;">
        <span class="status-badge badge-green"><i class="fas fa-circle" style="font-size:.45rem;"></i> All Systems Operational</span>
        <span style="color:rgba(255,255,255,.3);font-size:.7rem;">·</span>
        <span style="font-size:.7rem;color:rgba(255,255,255,.45);">Avg. response: 4.2 hours</span>
      </div>
    </div>

    <!-- Tab Bar -->
    <div class="sup-tab-bar">
      <button class="sup-tab active" onclick="supTab('ticket')"><i class="fas fa-ticket-alt" style="margin-right:.4rem;"></i><span>Submit Ticket</span></button>
      <button class="sup-tab" onclick="supTab('faq')"><i class="fas fa-question-circle" style="margin-right:.4rem;"></i><span>FAQ</span></button>
      <button class="sup-tab" onclick="supTab('portals')"><i class="fas fa-th-large" style="margin-right:.4rem;"></i><span>Portals</span></button>
      <button class="sup-tab" onclick="supTab('status')"><i class="fas fa-heartbeat" style="margin-right:.4rem;"></i><span>System Status</span></button>
    </div>

    <!-- Panel: Submit Ticket -->
    <div id="panel-ticket" class="sup-panel active">
      <p style="font-size:.78rem;color:#64748b;margin:0 0 1.25rem;line-height:1.7;">
        Can't find what you need below? Submit a support ticket and our team will respond within <strong>4 business hours</strong>.
        Your ticket reference: <code style="background:#f1f5f9;padding:.1rem .4rem;font-size:.75rem;color:#1A3A6B;font-weight:700;">${ticketRef}</code>
      </p>

      <div id="ticket-success" style="display:none;background:#f0fdf4;border:1.5px solid #bbf7d0;padding:1.25rem;margin-bottom:1.25rem;">
        <div style="display:flex;align-items:flex-start;gap:.75rem;">
          <i class="fas fa-check-circle" style="color:#16a34a;font-size:1.1rem;flex-shrink:0;margin-top:.1rem;"></i>
          <div>
            <p style="font-size:.84rem;font-weight:700;color:#166534;margin:0 0 .35rem;">Ticket Submitted Successfully!</p>
            <p style="font-size:.76rem;color:#166534;margin:0;line-height:1.7;" id="ticket-success-msg">Your request has been logged. Our support team will respond to your registered email within 4 business hours.</p>
          </div>
        </div>
      </div>

      <form id="support-form" onsubmit="supSubmit(event)">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
          <div class="form-row">
            <label class="form-label">Your Name *</label>
            <input type="text" id="sup-name" class="form-input" placeholder="Full name" required>
          </div>
          <div class="form-row">
            <label class="form-label">Email Address *</label>
            <input type="email" id="sup-email" class="form-input" placeholder="your@email.com" required>
          </div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
          <div class="form-row">
            <label class="form-label">Portal / Module *</label>
            <select id="sup-portal" class="form-input form-select" required>
              <option value="">Select portal…</option>
              <option>Client Portal</option>
              <option>Employee Portal</option>
              <option>Board & KMP Portal</option>
              <option>Super Admin / ERP</option>
              <option>Finance / GST</option>
              <option>HR / Payroll</option>
              <option>Governance</option>
              <option>HORECA / Inventory</option>
              <option>Payments / Razorpay</option>
              <option>Other</option>
            </select>
          </div>
          <div class="form-row">
            <label class="form-label">Priority</label>
            <select id="sup-priority" class="form-input form-select">
              <option value="normal">Normal. Response within 4h</option>
              <option value="high">High. Response within 2h</option>
              <option value="critical">Critical. Response within 1h</option>
            </select>
          </div>
        </div>
        <div class="form-row">
          <label class="form-label">Issue Category *</label>
          <select id="sup-category" class="form-input form-select" required>
            <option value="">Select category…</option>
            <option>Login / Access / Lockout</option>
            <option>TOTP / Authenticator Setup</option>
            <option>Password Reset</option>
            <option>Invoice / Billing</option>
            <option>Document / Upload Issue</option>
            <option>Data / Report Discrepancy</option>
            <option>Feature Request</option>
            <option>Bug / Error</option>
            <option>Integration Issue</option>
            <option>Other</option>
          </select>
        </div>
        <div class="form-row">
          <label class="form-label">Subject *</label>
          <input type="text" id="sup-subject" class="form-input" placeholder="Brief description of the issue" required>
        </div>
        <div class="form-row">
          <label class="form-label">Detailed Description *</label>
          <textarea id="sup-desc" class="form-input form-textarea" placeholder="Please describe the issue in detail, include error messages, steps to reproduce, screenshots if applicable…" required></textarea>
        </div>
        <div class="form-row" style="margin-bottom:1.25rem;">
          <label class="form-label">Your User ID / Employee ID <span style="font-weight:400;color:#94a3b8;">(optional)</span></label>
          <input type="text" id="sup-userid" class="form-input" placeholder="e.g. EMP-001, IG-CL-123, or email">
        </div>
        <button type="submit" class="btn-submit" id="sup-btn">
          <i class="fas fa-paper-plane"></i> Submit Support Ticket
        </button>
      </form>

      <div style="margin-top:1.25rem;background:#fafafa;border:1px solid #f1f5f9;padding:.875rem 1rem;display:flex;align-items:center;gap:.75rem;">
        <i class="fas fa-headset" style="color:#B8960C;font-size:1.1rem;flex-shrink:0;"></i>
        <div style="font-size:.75rem;color:#64748b;line-height:1.7;">
          Urgent issue? Call us at <a href="tel:+918988988988" style="color:#1A3A6B;font-weight:700;">+91 8988 988 988</a>
          or email <a href="mailto:admin@indiagully.com" style="color:#1A3A6B;font-weight:700;">admin@indiagully.com</a>
          · Mon to Fri, 9:00 AM to 7:00 PM IST
        </div>
      </div>
    </div>

    <!-- Panel: FAQ -->
    <div id="panel-faq" class="sup-panel">
      <p style="font-size:.78rem;color:#64748b;margin:0 0 1.25rem;">Find answers to common questions about login, TOTP, and platform usage.</p>
      ${[
        {q:'My account is locked, what do I do?', a:'After 5 failed login attempts, your account locks for 5 minutes. Wait for the countdown to complete, then try again. For immediate manual unlock, email <a href="mailto:admin@indiagully.com" style="color:#1A3A6B;">admin@indiagully.com</a> with your user ID or call +91 8988 988 988.'},
        {q:'How do I set up my TOTP authenticator app?', a:'1. Install Google Authenticator, Authy, or Microsoft Authenticator on your phone.<br>2. Email admin@indiagully.com to request your personal QR code.<br>3. In the app, tap "+" → "Scan QR code".<br>4. Use the 6-digit rotating code during login. Codes refresh every 30 seconds.'},
        {q:'My TOTP code is being rejected even though it looks right.', a:'This is usually a clock-sync issue. On Google Authenticator: tap ⋮ → Time correction for codes → Sync now. On Authy: Settings → Account → Sync. Make sure your phone\'s date/time is set to Automatic (internet time).'},
        {q:'How do I reset my password?', a:'Click "Forgot Password" on any login page or visit <a href="/portal/reset" style="color:#1A3A6B;">/portal/reset</a>. Enter your registered email address and a 6-digit one-time reset code (OTP) will be sent. The code is valid for 10 minutes.'},
        {q:'Which portal should I use?', a:'<strong>Client Portal</strong>, for advisory clients (mandates, invoices, deliverables).<br><strong>Employee Portal</strong>, for staff (payroll, leave, Form-16, attendance).<br><strong>Board & KMP</strong>, for directors and KMPs (governance, voting, board packs).<br><strong>Super Admin</strong>, for platform administrators only.'},
        {q:'I can\'t see my invoice / document. What should I check?', a:'Ensure you\'re logged into the correct portal. For invoices, go to Invoices → All and check the date filter. For documents, go to Documents → All Files. If the item is still missing, contact support with the document reference or invoice number.'},
        {q:'How do I update my profile or email address?', a:'Log in to your portal → click your avatar top-right → Profile Settings. Email address changes require admin approval for security. Raise a ticket if you need to update your primary email.'},
        {q:'How do I download my Form-16 or payslip?', a:'Employee Portal → Payslips (for payslips) or Employee Portal → Form-16 (for Form-16 PDFs). Payslips are available from the month after joining. Form-16 is issued annually in June for the prior financial year.'},
      ].map((f,i)=>`
      <div class="faq-item" id="faq${i}" onclick="faqToggle(${i})">
        <div class="faq-q">
          <span>${f.q}</span>
          <i class="fas fa-chevron-down faq-chevron"></i>
        </div>
        <div class="faq-a">${f.a}</div>
      </div>`).join('')}
    </div>

    <!-- Panel: Portals -->
    <div id="panel-portals" class="sup-panel">
      <p style="font-size:.78rem;color:#64748b;margin:0 0 1.25rem;">Select your portal below to sign in. Each portal has its own login credentials.</p>
      ${[
        {portal:'Client Portal',   url:'/portal/client',   icon:'user-tie',   color:'#B8960C', desc:'Advisory services, mandates, invoices, deliverables, reports'},
        {portal:'Employee Portal', url:'/portal/employee', icon:'users',      color:'#1A3A6B', desc:'HR, payroll, leave management, attendance, Form-16'},
        {portal:'Board & KMP',     url:'/portal/board',    icon:'gavel',      color:'#1E1E1E', desc:'Governance, board packs, voting, statutory registers'},
        {portal:'Super Admin',     url:'/admin',           icon:'shield-alt', color:'#6B1A1A', desc:'Platform administration, full ERP, user management'},
      ].map(p=>`
      <div class="portal-card">
        <div style="display:flex;align-items:center;gap:.875rem;">
          <div style="width:40px;height:40px;background:${p.color};display:flex;align-items:center;justify-content:center;flex-shrink:0;border-radius:4px;">
            <i class="fas fa-${p.icon}" style="color:#fff;font-size:.875rem;"></i>
          </div>
          <div>
            <div style="font-size:.84rem;font-weight:700;color:#1e293b;">${p.portal}</div>
            <div style="font-size:.71rem;color:#64748b;margin-top:.1rem;">${p.desc}</div>
          </div>
        </div>
        <a href="${p.url}" style="background:${p.color};color:#fff;padding:.45rem 1rem;font-size:.72rem;font-weight:700;text-decoration:none;white-space:nowrap;border-radius:3px;letter-spacing:.03em;">
          Login <i class="fas fa-arrow-right" style="font-size:.6rem;margin-left:.3rem;"></i>
        </a>
      </div>`).join('')}
      <div style="margin-top:1.25rem;background:#fffbeb;border:1.5px solid #fcd34d;padding:.875rem 1rem;font-size:.76rem;color:#92400e;line-height:1.7;">
        <i class="fas fa-exclamation-triangle" style="margin-right:.4rem;color:#d97706;"></i>
        <strong>Security reminder:</strong> Never share your credentials. Each portal session auto-expires after 30 minutes of inactivity.
        If you suspect unauthorised access, contact us immediately at <a href="mailto:admin@indiagully.com" style="color:#92400e;font-weight:700;">admin@indiagully.com</a>.
      </div>
    </div>

    <!-- Panel: System Status -->
    <div id="panel-status" class="sup-panel">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem;">
        <div>
          <p style="font-size:.78rem;color:#64748b;margin:0;">Live platform health as of <span id="status-time">${new Date().toLocaleString('en-IN',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',day:'2-digit',month:'short',year:'numeric'})}</span> IST</p>
        </div>
        <button onclick="supRefreshStatus()" style="background:#f1f5f9;border:1.5px solid #e2e8f0;padding:.35rem .75rem;font-size:.72rem;font-weight:600;color:#475569;cursor:pointer;display:flex;align-items:center;gap:.375rem;">
          <i class="fas fa-sync-alt" id="status-spin"></i> Refresh
        </button>
      </div>

      <div id="status-banner" style="background:#f0fdf4;border:1.5px solid #bbf7d0;padding:.875rem 1rem;margin-bottom:1.25rem;display:flex;align-items:center;gap:.75rem;">
        <i class="fas fa-check-circle" style="color:#16a34a;font-size:1rem;flex-shrink:0;"></i>
        <div style="font-size:.78rem;color:#166534;font-weight:600;">All systems are operating normally. No incidents reported.</div>
      </div>

      ${[
        {name:'Authentication & Login',  status:'operational', uptime:'99.99%', resp:'28ms'},
        {name:'Client Portal',           status:'operational', uptime:'99.97%', resp:'42ms'},
        {name:'Employee Portal',         status:'operational', uptime:'99.97%', resp:'38ms'},
        {name:'Board & KMP Portal',      status:'operational', uptime:'99.98%', resp:'35ms'},
        {name:'Finance / GST Module',    status:'operational', uptime:'99.95%', resp:'61ms'},
        {name:'HR / Payroll Module',     status:'operational', uptime:'99.96%', resp:'54ms'},
        {name:'Payments (Razorpay)',      status:'operational', uptime:'99.93%', resp:'89ms'},
        {name:'Document Storage (R2)',   status:'operational', uptime:'99.99%', resp:'22ms'},
        {name:'Email Notifications',     status:'degraded',    uptime:'96.20%', resp:'480ms'},
        {name:'WhatsApp Alerts',         status:'pending',     uptime:'N/A',      resp:'N/A'},
      ].map(s=>{
        const cls = s.status==='operational'?'badge-green':s.status==='degraded'?'badge-yellow':'badge-red'
        const label = s.status==='operational'?'Operational':s.status==='degraded'?'Degraded':'Pending Setup'
        return `<div class="svc-row">
          <span style="font-weight:600;color:#1e293b;">${s.name}</span>
          <div style="display:flex;align-items:center;gap:1rem;">
            <span style="font-size:.71rem;color:#94a3b8;">Uptime: ${s.uptime} &nbsp;·&nbsp; ${s.resp}</span>
            <span class="status-badge ${cls}">${label}</span>
          </div>
        </div>`
      }).join('')}

      <div style="margin-top:1.25rem;background:#f8fafc;border:1px solid #e2e8f0;padding:.875rem 1rem;font-size:.74rem;color:#64748b;line-height:1.7;text-align:center;">
        <i class="fas fa-clock" style="margin-right:.3rem;color:#94a3b8;"></i>
        Status is updated automatically. For real-time incident updates email <a href="mailto:admin@indiagully.com" style="color:#1A3A6B;">admin@indiagully.com</a>
      </div>
    </div>

  </div><!-- /sup-card -->
</div><!-- /sup-wrap -->

<div class="toast-overlay">
  <div class="toast-msg" id="sup-toast">
    <i class="fas fa-check-circle" style="color:#B8960C;flex-shrink:0;"></i>
    <span id="sup-toast-msg">Done</span>
  </div>
</div>

<script>
function supTab(name){
  document.querySelectorAll('.sup-tab').forEach(function(t){t.classList.remove('active');});
  document.querySelectorAll('.sup-panel').forEach(function(p){p.classList.remove('active');});
  var tabs = document.querySelectorAll('.sup-tab');
  var panels = ['ticket','faq','portals','status'];
  var idx = panels.indexOf(name);
  if(idx>=0) tabs[idx].classList.add('active');
  var panel = document.getElementById('panel-'+name);
  if(panel) panel.classList.add('active');
}
function faqToggle(i){
  var el = document.getElementById('faq'+i);
  el.classList.toggle('open');
}
function supShowToast(msg, type){
  var t = document.getElementById('sup-toast');
  var m = document.getElementById('sup-toast-msg');
  m.textContent = msg;
  t.style.borderLeftColor = type==='error'?'#dc2626':'#B8960C';
  t.classList.add('show');
  setTimeout(function(){ t.classList.remove('show'); }, 4000);
}
function supSubmit(e){
  e.preventDefault();
  var btn = document.getElementById('sup-btn');
  var name = document.getElementById('sup-name').value.trim();
  var email = document.getElementById('sup-email').value.trim();
  var portal = document.getElementById('sup-portal').value;
  var category = document.getElementById('sup-category').value;
  var subject = document.getElementById('sup-subject').value.trim();
  var desc = document.getElementById('sup-desc').value.trim();
  var priority = document.getElementById('sup-priority').value;
  var userid = document.getElementById('sup-userid').value.trim();
  if(!name||!email||!portal||!category||!subject||!desc){
    supShowToast('Please fill in all required fields.','error'); return;
  }
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting…';
  fetch('/api/support/ticket', {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({name,email,portal,category,subject,description:desc,priority,user_id:userid})
  })
  .then(function(r){ return r.json(); })
  .then(function(data){
    if(data.success){
      document.getElementById('ticket-success-msg').textContent =
        'Ticket ' + data.ref + ' logged. Our team will respond to ' + email + ' within ' + (priority==='critical'?'1 hour':priority==='high'?'2 hours':'4 business hours') + '.';
      document.getElementById('ticket-success').style.display='block';
      document.getElementById('support-form').style.display='none';
      supShowToast('Ticket ' + data.ref + ' submitted!','success');
      window.scrollTo({top:0,behavior:'smooth'});
    } else {
      supShowToast(data.error||'Submission failed, please try again.','error');
      btn.disabled=false;
      btn.innerHTML='<i class="fas fa-paper-plane"></i> Submit Support Ticket';
    }
  })
  .catch(function(){
    supShowToast('Network error, please try again.','error');
    btn.disabled=false;
    btn.innerHTML='<i class="fas fa-paper-plane"></i> Submit Support Ticket';
  });
}
function supRefreshStatus(){
  var spin = document.getElementById('status-spin');
  spin.style.animation='fa-spin 1s linear infinite';
  fetch('/api/health').then(function(r){return r.json();}).then(function(d){
    document.getElementById('status-time').textContent = new Date().toLocaleString('en-IN',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',day:'2-digit',month:'short',year:'numeric'});
    spin.style.animation='';
    supShowToast('Status refreshed, all core systems operational','success');
  }).catch(function(){ spin.style.animation=''; });
}
// Auto-open FAQ if hash = #faq, portals if #portals, status if #status
(function(){
  var h = window.location.hash.replace('#','');
  if(['faq','portals','status'].includes(h)) supTab(h);
})();
</script>`
  return c.html(layout('Platform Support', content, { noNav:true, noFooter:true }))
})

// ── PASSWORD RESET ────────────────────────────────────────────────────────────
app.get('/reset', (c) => {
  const portal = c.req.query('portal') || 'client'
  const sent = c.req.query('sent') === '1'
  const portalLabel = portal.charAt(0).toUpperCase() + portal.slice(1)
  const content = `
<div style="min-height:100vh;background:linear-gradient(135deg,#080808,#141414);display:flex;align-items:center;justify-content:center;padding:2rem;">
  <div style="width:100%;max-width:420px;">
    <div style="background:#fff;overflow:hidden;box-shadow:0 40px 100px rgba(0,0,0,.5);">
      <div style="background:var(--ink);padding:2rem;text-align:center;">
        <div style="width:48px;height:48px;background:var(--gold);display:flex;align-items:center;justify-content:center;margin:0 auto .875rem;"><i class="fas fa-key" style="color:#fff;"></i></div>
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:#fff;margin-bottom:.25rem;">Reset Password</h2>
        <p style="font-size:.78rem;color:rgba(255,255,255,.45);">Enter your registered email address to receive a 6-digit one-time code (OTP) for password reset.</p>
      </div>
      ${sent ? `<div style="background:#f0fdf4;border-bottom:1px solid #bbf7d0;padding:1rem 1.5rem;display:flex;gap:.6rem;">
        <i class="fas fa-check-circle" style="color:#16a34a;font-size:.875rem;flex-shrink:0;margin-top:.1rem;"></i>
        <div>
          <p style="font-size:.82rem;font-weight:600;color:#166534;margin-bottom:.2rem;">Reset code sent!</p>
          <p style="font-size:.75rem;color:#166534;">If a matching account exists, a 6-digit one-time code (OTP) has been sent to that email address. The code expires in 10 minutes. Do not share it with anyone.</p>
        </div>
      </div>` : ''}
      <div style="padding:2rem;">
        ${!sent ? `
        <form id="reset-form" method="POST" action="/api/auth/reset/request" style="display:flex;flex-direction:column;gap:1rem;">
          <input type="hidden" name="portal" value="${portal}">
          <input type="hidden" name="csrf_r" id="csrf-reset" value="">
          <div>
            <label class="ig-label">Registered Email Address</label>
            <input type="email" name="email" class="ig-input" required placeholder="your@email.com" autocomplete="email">
          </div>
          <div style="background:#f0f9ff;border:1px solid #bae6fd;padding:.75rem;font-size:.75rem;color:#0369a1;">
            <i class="fas fa-info-circle" style="margin-right:.35rem;"></i>For security, we never confirm whether an account exists.
          </div>
          <button type="submit" id="reset-btn" style="width:100%;padding:.875rem;background:var(--gold);color:#fff;font-size:.78rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:none;cursor:pointer;"><i class="fas fa-paper-plane" style="margin-right:.5rem;"></i>Send Reset Code</button>
        </form>` : `
        <div style="text-align:center;margin-bottom:1rem;">
          <a href="/portal/${portal}" style="display:inline-flex;align-items:center;gap:.4rem;font-size:.78rem;background:var(--gold);color:#fff;padding:.625rem 1.25rem;text-decoration:none;font-weight:600;"><i class="fas fa-sign-in-alt" style="font-size:.72rem;"></i>Back to ${portalLabel} Login</a>
        </div>`}
        <div style="margin-top:1rem;text-align:center;">
          <a href="/portal/${portal}" style="font-size:.75rem;color:var(--gold);">&larr; Back to Login</a>
        </div>
      </div>
    </div>
  </div>
</div>
<script>
(function(){
  var ce=document.getElementById('csrf-reset');
  if(ce){var csrf=Array.from(crypto.getRandomValues(new Uint8Array(16))).map(function(b){return b.toString(16).padStart(2,'0');}).join('');ce.value=csrf;}
  var btn=document.getElementById('reset-btn');
  var form=document.getElementById('reset-form');
  if(form&&btn)form.addEventListener('submit',function(e){
    e.preventDefault();
    var emailVal=form.querySelector('[name="email"]').value.trim();
    if(!emailVal||!emailVal.includes('@')){
      var errEl=form.querySelector('.ig-input[name="email"]');
      if(errEl){errEl.style.borderColor='#dc2626';}
      return;
    }
    btn.disabled=true;btn.innerHTML='<i class="fas fa-circle-notch fa-spin" style="margin-right:.5rem;"></i>Sending\u2026';
    var fd=new FormData();fd.append('portal','${portal}');fd.append('email',emailVal);
    fetch('/api/auth/reset/request',{method:'POST',body:fd,credentials:'include'})
      .then(function(){location.href='/portal/reset?portal=${portal}&sent=1';})
      .catch(function(){location.href='/portal/reset?portal=${portal}&sent=1';});
  });
})();
</script>`
  return c.html(layout('Password Reset', content, { noNav:true, noFooter:true }))
})

// ═════════════════════════════════════════════════════════════════════════════
// ── CLIENT PORTAL ─────────────────────────────────────────────────────────────
// ═════════════════════════════════════════════════════════════════════════════

function clientShell(pageTitle: string, active: string, body: string) {
  const nav = [
    { id:'dashboard',  icon:'tachometer-alt', label:'Dashboard',     badge:'' },
    { id:'mandates',   icon:'file-contract',  label:'My Mandates',   badge:'' },
    { id:'proposals',  icon:'file-alt',       label:'Proposals',     badge:'1' },
    { id:'invoices',   icon:'receipt',        label:'Invoices & GST',badge:'2' },
    { id:'documents',  icon:'folder-open',    label:'Documents',     badge:'' },
    { id:'reports',    icon:'chart-pie',      label:'Reports',       badge:'' },
    { id:'messages',   icon:'comments',       label:'Messages',      badge:'1' },
    { id:'profile',    icon:'user-cog',       label:'My Profile',    badge:'' },
  ]
  const notifs = [
    {msg:'INV-2026-002 is overdue, ₹1.8L pending',type:'danger',  time:'2h ago'},
    {msg:'Proposal signed. Hotel PMC Engagement Letter',type:'success',time:'5h ago'},
    {msg:'New document shared: Market Research Q4 2024',type:'info',  time:'1d ago'},
  ]
  return `
<div style="display:flex;height:100vh;overflow:hidden;background:#f7f7f7;">
  <aside style="width:240px;flex-shrink:0;background:var(--ink);display:flex;flex-direction:column;min-height:100vh;">
    <a href="/portal/client/dashboard" style="padding:1rem 1.25rem;border-bottom:1px solid rgba(255,255,255,.07);display:block;">
      <img src="/assets/logo-white.png" alt="India Gully" height="26"
           style="height:26px;width:auto;max-width:170px;object-fit:contain;object-position:left center;display:block;"
           draggable="false" decoding="async">
      <div style="font-size:.55rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-top:4px;">Client Portal</div>
    </a>
    <nav style="flex:1;padding:.75rem;overflow-y:auto;">
      ${nav.map(i => `
      <a href="/portal/client/${i.id === 'dashboard' ? 'dashboard' : i.id}" class="sb-lk ${active === i.id ? 'on' : ''}">
        <i class="fas fa-${i.icon}" style="width:16px;font-size:.75rem;text-align:center;"></i>${i.label}
        ${i.badge ? `<span class="sb-badge">${i.badge}</span>` : ''}
      </a>`).join('')}
    </nav>
    <div style="padding:.75rem;border-top:1px solid rgba(255,255,255,.07);">
      <a href="#" onclick="igSignOut('client');return false;" class="sb-lk" style="color:#ef4444 !important;"><i class="fas fa-sign-out-alt" style="width:16px;font-size:.75rem;text-align:center;"></i>Sign Out</a>
    </div>
  </aside>
  <main style="flex:1;overflow-y:auto;display:flex;flex-direction:column;">
    <div style="background:#fff;border-bottom:1px solid var(--border);padding:.875rem 2rem;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
      <div>
        <div style="font-size:.65rem;color:var(--ink-muted);letter-spacing:.08em;text-transform:uppercase;margin-bottom:.15rem;">
          <a href="/portal" style="color:var(--ink-muted);text-decoration:none;">Portal</a>
          <i class="fas fa-chevron-right" style="font-size:.5rem;margin:0 .35rem;"></i>
          <a href="/portal/client/dashboard" style="color:var(--ink-muted);text-decoration:none;">Client</a>
          <i class="fas fa-chevron-right" style="font-size:.5rem;margin:0 .35rem;"></i>
          <span style="color:var(--ink);">${pageTitle}</span>
        </div>
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.15rem;color:var(--ink);">${pageTitle}</h2>
      </div>
      <div style="display:flex;align-items:center;gap:1rem;">
        <!-- Notification Bell -->
        <div style="position:relative;">
          <button id="notif-btn" onclick="toggleNotifPanel()" style="background:none;border:1px solid var(--border);width:36px;height:36px;display:flex;align-items:center;justify-content:center;cursor:pointer;position:relative;">
            <i class="fas fa-bell" style="font-size:.75rem;color:var(--ink-muted);"></i>
            <span style="position:absolute;top:-3px;right:-3px;width:10px;height:10px;background:#dc2626;border-radius:50%;border:2px solid #fff;"></span>
          </button>
          <div id="notif-panel" style="display:none;position:absolute;right:0;top:calc(100% + 8px);width:320px;background:#fff;border:1px solid var(--border);box-shadow:0 12px 40px rgba(0,0,0,.15);z-index:9999;">
            <div style="padding:.75rem 1rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:.75rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink);">Notifications</span>
              <button onclick="igToast('All notifications cleared','success')" style="font-size:.68rem;color:var(--gold);background:none;border:none;cursor:pointer;">Clear All</button>
            </div>
            ${notifs.map(n=>`<div style="padding:.75rem 1rem;border-bottom:1px solid var(--border);display:flex;gap:.625rem;">
              <i class="fas fa-${n.type==='danger'?'exclamation-circle':n.type==='success'?'check-circle':'info-circle'}" style="color:${n.type==='danger'?'#dc2626':n.type==='success'?'#16a34a':'#2563eb'};font-size:.75rem;margin-top:.1rem;flex-shrink:0;"></i>
              <div><div style="font-size:.78rem;color:var(--ink);line-height:1.4;">${n.msg}</div><div style="font-size:.65rem;color:var(--ink-muted);margin-top:.15rem;">${n.time}</div></div>
            </div>`).join('')}
          </div>
        </div>
        <!-- User Badge -->
        <div style="display:flex;align-items:center;gap:.625rem;">
          <div style="text-align:right;display:none;" class="r-hide">
            <div style="font-size:.72rem;font-weight:600;color:var(--ink);">Demo Client</div>
            <div style="font-size:.62rem;color:var(--ink-muted);">demo@indiagully.com</div>
          </div>
          <div style="width:34px;height:34px;background:var(--gold);display:flex;align-items:center;justify-content:center;cursor:pointer;" title="Demo Client" onclick="igToast('Profile: Demo Client · demo@indiagully.com','info')">
            <span style="font-family:'DM Serif Display',Georgia,serif;font-size:.8rem;color:#fff;font-weight:700;">CL</span>
          </div>
        </div>
      </div>
    </div>
    <div style="flex:1;padding:2rem;overflow-y:auto;">${body}</div>
  </main>
</div>
<script>
function toggleNotifPanel(){
  var p=document.getElementById('notif-panel');
  p.style.display=p.style.display==='none'?'block':'none';
}
document.addEventListener('click',function(e){
  var btn=document.getElementById('notif-btn');
  var panel=document.getElementById('notif-panel');
  if(panel&&!panel.contains(e.target)&&!btn.contains(e.target)) panel.style.display='none';
});
window.igSignOut=function(portal){
  fetch('/api/auth/logout',{method:'POST',credentials:'include'}).catch(function(){}).finally(function(){location.href='/portal/'+(portal||'');});
};
</script>`
}

app.get('/client/dashboard', (c) => {
  const body = `
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem;margin-bottom:2rem;">
      ${[
        { label:'Active Mandates',  value:'3',  icon:'file-contract', color:'var(--gold)' },
        { label:'Pending Invoices', value:'2',  icon:'receipt',       color:'#2563eb'    },
        { label:'Documents Shared', value:'14', icon:'folder-open',   color:'#16a34a'    },
        { label:'Open Messages',    value:'1',  icon:'comments',      color:'#9333ea'    },
      ].map(s => `
      <div class="am">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.875rem;">
          <span style="font-size:.65rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-muted);">${s.label}</span>
          <div style="width:32px;height:32px;background:${s.color};display:flex;align-items:center;justify-content:center;">
            <i class="fas fa-${s.icon}" style="color:#fff;font-size:.65rem;"></i>
          </div>
        </div>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2.5rem;line-height:1;color:var(--ink);">${s.value}</div>
      </div>`).join('')}
    </div>
    <div style="display:grid;grid-template-columns:3fr 2fr;gap:1.5rem;">
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1.1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;">
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Active Mandates</h3>
          <a href="/portal/client/mandates" style="font-size:.72rem;color:var(--gold);">View All →</a>
        </div>
        <table class="ig-tbl">
          <thead><tr><th>Mandate</th><th>Sector</th><th>Status</th><th>Value</th></tr></thead>
          <tbody>
            <tr><td style="font-size:.85rem;font-weight:500;">Retail Leasing, Mumbai</td><td style="font-size:.8rem;color:var(--ink-muted);">Real Estate</td><td><span class="badge b-gr">Active</span></td><td style="font-family:'DM Serif Display',Georgia,serif;color:var(--gold);">₹2,100 Cr</td></tr>
            <tr><td style="font-size:.85rem;font-weight:500;">Hotel Pre-Opening PMC</td><td style="font-size:.8rem;color:var(--ink-muted);">Hospitality</td><td><span class="badge b-g">In Progress</span></td><td style="font-family:'DM Serif Display',Georgia,serif;color:var(--gold);">₹45 Cr</td></tr>
            <tr><td style="font-size:.85rem;font-weight:500;">Hospitality Advisory — Chandigarh</td><td style="font-size:.8rem;color:var(--ink-muted);">Hospitality</td><td><span class="badge b-bl">Active</span></td><td style="font-family:'DM Serif Display',Georgia,serif;color:var(--gold);">₹70 Cr</td></tr>
          </tbody>
        </table>
      </div>
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1.1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;">
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Recent Invoices</h3>
          <a href="/portal/client/invoices" style="font-size:.72rem;color:var(--gold);">View All →</a>
        </div>
        <table class="ig-tbl">
          <thead><tr><th>Invoice</th><th>Amount</th><th>Status</th></tr></thead>
          <tbody>
            <tr><td style="font-size:.82rem;">INV-2026-001</td><td style="font-family:'DM Serif Display',Georgia,serif;color:var(--gold);">₹2.5L</td><td><span class="badge b-gr">Paid</span></td></tr>
            <tr><td style="font-size:.82rem;">INV-2026-002</td><td style="font-family:'DM Serif Display',Georgia,serif;color:var(--gold);">₹1.8L</td><td><span class="badge b-re">Overdue</span></td></tr>
            <tr><td style="font-size:.82rem;">INV-2026-003</td><td style="font-family:'DM Serif Display',Georgia,serif;color:var(--gold);">₹3.2L</td><td><span class="badge b-dk">Draft</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>`
  return c.html(layout('Client Dashboard', clientShell('Dashboard', 'dashboard', body), { noNav:true, noFooter:true }))
})

app.get('/client/mandates', (c) => {
  const body = `
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:1.5rem;">
      ${[
        { label:'Active Mandates',   value:'3',          color:'#B8960C'  },
        { label:'Pipeline Value',    value:'₹6,645 Cr',  color:'#16a34a' },
        { label:'Avg. Progress',     value:'62%',        color:'#2563eb' },
      ].map(s => `
      <div class="am">
        <div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.5rem;">${s.label}</div>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2rem;color:${s.color};">${s.value}</div>
      </div>`).join('')}
    </div>
    <div style="display:flex;flex-direction:column;gap:1rem;">
      ${[
        { id:'MND-001', name:'Retail Leasing. Mumbai',      sector:'Real Estate',   value:'₹2,100 Cr', advisor:'Amit Jhingan',    start:'01 Jan 2026', status:'Active',      cls:'b-gr', progress:75,
          milestones:[{done:true,label:'Engagement Signed'},{done:true,label:'Site Survey'},{done:true,label:'Shortlisting'},{done:false,label:'LOI Exchange'},{done:false,label:'Execution'}] },
        { id:'MND-002', name:'Hotel Pre-Opening PMC',         sector:'Hospitality',   value:'₹45 Cr',    advisor:'Arun Manikonda', start:'15 Feb 2026', status:'In Progress', cls:'b-g',  progress:45,
          milestones:[{done:true,label:'Scope Finalised'},{done:true,label:'Team Deployed'},{done:false,label:'Pre-opening Check'},{done:false,label:'Staff Training'},{done:false,label:'Soft Opening'}] },
        { id:'MND-003', name:'Hotel Rajshree & Spa — Chandigarh', sector:'Hospitality', value:'₹70 Cr', advisor:'Amit Jhingan', start:'01 Mar 2026', status:'Active', cls:'b-bl', progress:35,
          milestones:[{done:true,label:'NDA Executed'},{done:true,label:'Site Visit'},{done:false,label:'LOI Exchange'},{done:false,label:'Due Diligence'},{done:false,label:'Transaction Close'}] },
      ].map((m,mi) => `
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1.25rem;display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;">
          <div style="flex:1;">
            <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.5rem;">
              <span style="font-size:.75rem;font-weight:700;color:var(--gold);">${m.id}</span>
              <span class="badge b-dk">${m.sector}</span>
              <span class="badge ${m.cls}">${m.status}</span>
            </div>
            <h4 style="font-size:.95rem;font-weight:600;color:var(--ink);margin-bottom:.25rem;">${m.name}</h4>
            <div style="font-size:.78rem;color:var(--ink-muted);">Advisor: ${m.advisor} · Started: ${m.start}</div>
          </div>
          <div style="text-align:right;flex-shrink:0;">
            <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:var(--gold);">${m.value}</div>
            <div style="font-size:.68rem;color:var(--ink-muted);">Mandate Value</div>
          </div>
        </div>
        <div style="padding:0 1.25rem .75rem;">
          <div style="display:flex;justify-content:space-between;margin-bottom:.3rem;">
            <span style="font-size:.68rem;font-weight:600;color:var(--ink-muted);">PROGRESS</span>
            <span style="font-size:.72rem;font-weight:700;color:var(--gold);">${m.progress}%</span>
          </div>
          <div style="background:var(--parch-dk);height:6px;border-radius:3px;overflow:hidden;">
            <div style="background:var(--gold);height:100%;width:${m.progress}%;border-radius:3px;"></div>
          </div>
        </div>
        <div style="border-top:1px solid var(--border);padding:.875rem 1.25rem;display:flex;gap:0;overflow-x:auto;">
          ${m.milestones.map((ms,msi)=>`
          <div style="display:flex;align-items:center;flex:1;min-width:80px;">
            <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:.3rem;">
              <div style="width:20px;height:20px;border-radius:50%;background:${ms.done?'var(--gold)':'var(--parch-dk)'};border:2px solid ${ms.done?'var(--gold)':'var(--border)'};display:flex;align-items:center;justify-content:center;">
                ${ms.done?'<i class="fas fa-check" style="color:#fff;font-size:.45rem;"></i>':''}
              </div>
              <div style="font-size:.6rem;text-align:center;color:${ms.done?'var(--ink)':'var(--ink-muted)'};font-weight:${ms.done?'600':'400'};line-height:1.3;">${ms.label}</div>
            </div>
            ${msi < m.milestones.length-1 ? `<div style="height:2px;background:${ms.done?'var(--gold)':'var(--border)'};flex:1;margin-bottom:1.4rem;min-width:8px;"></div>` : ''}
          </div>`).join('')}
        </div>
        <div style="padding:.75rem 1.25rem;border-top:1px solid var(--border);display:flex;gap:.5rem;">
          <button onclick="togglePanel('mnd-update-${mi}')" style="font-size:.72rem;color:var(--gold);background:none;border:1px solid var(--border);padding:.3rem .75rem;cursor:pointer;display:flex;align-items:center;gap:.3rem;"><i class="fas fa-comments" style="font-size:.6rem;"></i>Request Update</button>
          <button onclick="igToast('Mandate brief PDF for ${m.id} downloaded','success')" style="font-size:.72rem;color:var(--ink-muted);background:none;border:1px solid var(--border);padding:.3rem .75rem;cursor:pointer;"><i class="fas fa-download" style="font-size:.6rem;margin-right:.3rem;"></i>Download Brief</button>
        </div>
        <div id="mnd-update-${mi}" class="ig-panel" style="margin:0 1.25rem 1.25rem;">
          <label class="ig-label">Request / Query for ${m.id}</label>
          <textarea class="ig-input" id="mnd-msg-${mi}" rows="3" placeholder="e.g. Please share latest status update..."></textarea>
          <div style="display:flex;gap:.5rem;margin-top:.75rem;">
            <button onclick="(function(){var msg=document.getElementById('mnd-msg-${mi}').value.trim();if(!msg){igToast('Please enter your request','warn');return;}igToast('Request for ${m.id} sent. Response within 24 hours.','success');document.getElementById('mnd-msg-${mi}').value='';togglePanel('mnd-update-${mi}');})()" style="background:var(--gold);color:#fff;border:none;padding:.4rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;">Send Request</button>
            <button onclick="togglePanel('mnd-update-${mi}')" style="background:none;border:1px solid var(--border);padding:.4rem 1rem;font-size:.72rem;cursor:pointer;color:var(--ink-muted);">Cancel</button>
          </div>
        </div>
      </div>`).join('')}
    </div>`
  return c.html(layout('My Mandates', clientShell('My Mandates', 'mandates', body), { noNav:true, noFooter:true }))
})

app.get('/client/proposals', (c) => {
  const body = `
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Proposals & Engagement Letters</h3>
        <div style="font-size:.72rem;color:var(--ink-muted);">Pending signature: <span style="font-weight:700;color:#d97706;">1 document</span></div>
      </div>
      <table class="ig-tbl">
        <thead><tr><th>Document</th><th>Type</th><th>Date Sent</th><th>Valid Until</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          ${[
            { doc:'Advisory Proposal. Q1 2025',     type:'Proposal',           sent:'01 Jan 2026', valid:'31 Mar 2026', status:'Accepted',     cls:'b-gr', canSign:false },
            { doc:'Hotel PMC Engagement Letter',      type:'Engagement Letter',  sent:'10 Feb 2026', valid:'10 Mar 2026', status:'Signed',       cls:'b-gr', canSign:false },
            { doc:'Entertainment Feasibility Scope',  type:'Scope Letter',       sent:'20 Feb 2026', valid:'20 Mar 2026', status:'Pending Sign', cls:'b-g',  canSign:true  },
            { doc:'Revised Fee Proposal. FY 2026',   type:'Proposal',           sent:'25 Feb 2026', valid:'25 Mar 2026', status:'Under Review', cls:'b-bl', canSign:false },
          ].map((p,pi) => `
          <tr>
            <td style="font-weight:500;">${p.doc}</td>
            <td><span class="badge b-dk">${p.type}</span></td>
            <td style="font-size:.78rem;color:var(--ink-muted);">${p.sent}</td>
            <td style="font-size:.78rem;color:var(--ink-muted);">${p.valid}</td>
            <td id="prop-status-${pi}"><span class="badge ${p.cls}">${p.status}</span></td>
            <td style="display:flex;gap:.4rem;flex-wrap:wrap;">
              <button onclick="igToast('Opening PDF viewer for: ${p.doc}','success')" style="font-size:.72rem;color:var(--gold);background:none;border:1px solid var(--border);padding:.22rem .55rem;cursor:pointer;"><i class='fas fa-eye' style='margin-right:.3rem;'></i>View</button>
              <button onclick="igToast('${p.doc} downloaded','success')" style="font-size:.72rem;color:var(--ink-muted);background:none;border:1px solid var(--border);padding:.22rem .55rem;cursor:pointer;"><i class='fas fa-download'></i></button>
              ${p.canSign ? `<button id="sign-btn-${pi}" onclick="igSignProposal(${pi},'${p.doc}')" style="background:#1A3A6B;color:#fff;border:none;padding:.22rem .75rem;font-size:.72rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:.3rem;"><i class='fas fa-pen-nib' style='font-size:.6rem;'></i>e-Sign</button>` : ''}
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <script>
    function igSignProposal(idx, docName){
      igConfirm('Sign the document electronically?<br><br><strong>'+docName+'</strong><br><br>By confirming, you agree to digitally sign this document. This action is legally binding.', function(){
        var btn = document.getElementById('sign-btn-'+idx);
        if(btn){ btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>'; btn.disabled = true; }
        setTimeout(function(){
          var cell = document.getElementById('prop-status-'+idx);
          if(cell) cell.innerHTML = '<span class="badge b-gr">Signed</span>';
          if(btn) btn.remove();
          fetch('/api/contracts/esign/send-envelope',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',body:JSON.stringify({document_name:docName,signers:[{name:'Client',email:'demo@indiagully.com'}],subject:'Signature Request: '+docName})}).then(function(){}).catch(function(){});
          igToast(docName+' signed electronically. Confirmation sent to akm@indiagully.com','success');
        }, 1500);
      });
    }
    </script>`
  return c.html(layout('Proposals', clientShell('Proposals', 'proposals', body), { noNav:true, noFooter:true }))
})

app.get('/client/invoices', (c) => {
  const body = `
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">
      ${[
        { label:'Total Billed',   value:'₹7.5L',  color:'var(--gold)' },
        { label:'Amount Paid',    value:'₹2.5L',  color:'#16a34a'    },
        { label:'Amount Due',     value:'₹5.0L',  color:'#dc2626'    },
        { label:'Overdue',        value:'₹1.8L',  color:'#7c3aed'    },
      ].map(s => `
      <div class="am">
        <div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.5rem;">${s.label}</div>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2rem;color:${s.color};">${s.value}</div>
      </div>`).join('')}
    </div>
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Invoice History</h3>
        <span style="font-size:.72rem;color:var(--ink-muted);">Click an invoice to view or pay</span>
      </div>
      <table class="ig-tbl">
        <thead><tr><th>Invoice #</th><th>Description</th><th>Amount</th><th>GST (18%)</th><th>Total</th><th>Due Date</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          ${[
            { inv:'INV-2026-001', desc:'Advisory Retainer. Jan 2026',   base:212000, gst:38160, total:250160, due:'15 Feb 2026', status:'Paid',    cls:'b-gr' },
            { inv:'INV-2026-002', desc:'Hotel PMC, Phase 1',             base:152542, gst:27458, total:180000, due:'28 Feb 2026', status:'Overdue', cls:'b-re' },
            { inv:'INV-2026-003', desc:'Entertainment Feasibility Study', base:271186, gst:48814, total:320000, due:'31 Mar 2026', status:'Draft',   cls:'b-dk' },
          ].map(r => `
          <tr>
            <td style="font-weight:600;font-size:.82rem;color:var(--gold);">${r.inv}</td>
            <td style="font-size:.82rem;">${r.desc}</td>
            <td style="font-family:'DM Serif Display',Georgia,serif;">₹${(r.base/100000).toFixed(2)}L</td>
            <td style="font-size:.78rem;color:var(--ink-muted);">₹${(r.gst/100000).toFixed(2)}L</td>
            <td style="font-family:'DM Serif Display',Georgia,serif;font-weight:600;">₹${(r.total/100000).toFixed(2)}L</td>
            <td style="font-size:.78rem;color:var(--ink-muted);">${r.due}</td>
            <td><span class="badge ${r.cls}" id="inv-status-${r.inv.replace(/-/g,'_')}">${r.status}</span></td>
            <td style="display:flex;gap:.4rem;">
              <button onclick="igViewInvoice('${r.inv}','${r.desc}','${r.total}','${r.due}','${r.status}')" style="font-size:.68rem;color:var(--gold);background:none;border:1px solid #B8960C;cursor:pointer;padding:.2rem .5rem;"><i class='fas fa-eye'></i></button>
              ${r.status!=='Paid'?`<button onclick="igPayInvoice('${r.inv}','${r.total}','${r.status}')" style="font-size:.68rem;color:#fff;background:#16a34a;border:none;cursor:pointer;padding:.2rem .5rem;"><i class='fas fa-credit-card'></i> Pay</button>`:'<span style="font-size:.68rem;color:#16a34a;"><i class="fas fa-check-circle"></i> Paid</span>'}
              <button onclick="igViewInvoice('${r.inv}','${r.desc}','${r.total}','${r.due}','${r.status}')" style="font-size:.68rem;color:var(--gold);background:var(--gold-pale,#FAF6E8);border:1px solid var(--gold);cursor:pointer;padding:.2rem .5rem;" title="Download Invoice PDF"><i class='fas fa-download'></i></button>
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <!-- Invoice View Modal -->
    <div id="inv-view-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:9998;align-items:center;justify-content:center;">
      <div style="background:#fff;width:640px;max-width:95vw;max-height:90vh;overflow-y:auto;border-top:4px solid var(--gold);">
        <div style="padding:1.25rem 1.5rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--ink);">Tax Invoice</div>
          <button onclick="document.getElementById('inv-view-modal').style.display='none'" style="background:none;border:none;font-size:1.2rem;cursor:pointer;color:var(--ink-muted);">✕</button>
        </div>
        <div style="padding:1.5rem;">
          <div style="display:flex;justify-content:space-between;margin-bottom:1.5rem;">
            <div>
            <!-- INVOICE LOGO: primary dark-text lockup, read-only, no crop, no AI, lossless -->
            <img src="/assets/logo-primary.png" alt="India Gully" height="28"
                 style="height:28px;width:auto;max-width:160px;object-fit:contain;object-position:left center;display:block;margin-bottom:.4rem;"
                 draggable="false" decoding="async">
            <div style="font-size:.72rem;color:var(--ink-muted);line-height:1.5;">Vivacious Entertainment &amp; Hospitality Pvt. Ltd.<br>GSTIN: 07AAGCV0867P1ZN · CIN: U74999DL2017PTC323237<br>support@indiagully.com</div>
          </div>
            <div style="text-align:right;"><div id="inv-number" style="font-size:1rem;font-weight:700;color:var(--gold);"></div><div id="inv-due" style="font-size:.72rem;color:var(--ink-muted);margin-top:.25rem;"></div></div>
          </div>
          <div style="background:var(--parch-dk);padding:.875rem;margin-bottom:1.25rem;font-size:.82rem;"><strong>Bill To:</strong> Demo Client Org · GSTIN: 27AAACN1234D1ZI</div>
          <table style="width:100%;font-size:.82rem;border-collapse:collapse;margin-bottom:1.25rem;">
            <thead><tr style="background:var(--ink);color:#fff;"><th style="padding:.5rem .75rem;text-align:left;">Description</th><th style="padding:.5rem .75rem;text-align:right;">Amount</th><th style="padding:.5rem .75rem;text-align:right;">CGST 9%</th><th style="padding:.5rem .75rem;text-align:right;">SGST 9%</th><th style="padding:.5rem .75rem;text-align:right;">Total</th></tr></thead>
            <tbody id="inv-tbody"></tbody>
          </table>
          <div id="inv-total-row" style="background:var(--ink);color:#fff;padding:.875rem 1rem;display:flex;justify-content:space-between;margin-bottom:1rem;"></div>
          <div style="font-size:.72rem;color:var(--ink-muted);margin-bottom:1rem;">Payment Terms: 30 days from invoice date · Late payment interest: 18% p.a.<br>Bank: HDFC Bank · A/C: 50200012345678 · IFSC: HDFC0001234</div>
          <div id="inv-pay-btn-area"></div>
        </div>
      </div>
    </div>
    <!-- Payment Modal (Phase 6, Razorpay gateway integration) -->
    <div id="pay-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:10000;align-items:center;justify-content:center;">
      <div style="background:#fff;width:480px;max-width:95vw;border-top:4px solid #16a34a;">
        <div style="padding:1.25rem 1.5rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Pay Invoice, <span id="pay-inv-id"></span></div>
          <button onclick="document.getElementById('pay-modal').style.display='none'" style="background:none;border:none;font-size:1.2rem;cursor:pointer;color:var(--ink-muted);">✕</button>
        </div>
        <div style="padding:1.5rem;">
          <div id="pay-amount-display" style="background:#f0fdf4;border:1px solid #86efac;padding:1rem;text-align:center;margin-bottom:1.25rem;">
            <div style="font-size:.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#15803d;margin-bottom:.25rem;">Amount Due</div>
            <div id="pay-amt" style="font-family:'DM Serif Display',Georgia,serif;font-size:2rem;color:#15803d;"></div>
          </div>
          <!-- Payment method selector -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-bottom:1.25rem;">
            ${[
              {id:'rz',  icon:'bolt',       color:'#2563eb', label:'Razorpay',         sub:'Cards / UPI / Netbanking'},
              {id:'upi', icon:'qrcode',     color:'#16a34a', label:'UPI / QR Code',    sub:'Scan & pay instantly'},
              {id:'neft',icon:'university', color:'#d97706', label:'NEFT / RTGS',      sub:'Bank transfer'},
              {id:'chq', icon:'pen',        color:'#475569', label:'Cheque',           sub:'Physical cheque'},
            ].map(m=>`<div onclick="igSelectPayMethod('${m.id}')" id="pm-${m.id}" style="border:2px solid var(--border);padding:.75rem;cursor:pointer;text-align:center;transition:border-color .15s;">
              <i class="fas fa-${m.icon}" style="color:${m.color};font-size:1rem;margin-bottom:.25rem;display:block;"></i>
              <div style="font-size:.8rem;font-weight:600;color:var(--ink);">${m.label}</div>
              <div style="font-size:.65rem;color:var(--ink-muted);">${m.sub}</div>
            </div>`).join('')}
          </div>
          <!-- Razorpay panel -->
          <div id="pay-panel-rz" style="">
            <div style="background:#eff6ff;border:1px solid #bfdbfe;padding:.875rem;margin-bottom:1rem;font-size:.78rem;color:#1d4ed8;">
              <i class="fas fa-shield-alt" style="margin-right:.4rem;"></i><strong>Razorpay Secure Gateway</strong>, Cards, UPI, Wallets, NetBanking
            </div>
            <div style="display:flex;flex-direction:column;gap:.75rem;">
              <div><label class="ig-label">Card / UPI Number</label><input type="text" class="ig-input" placeholder="XXXX XXXX XXXX XXXX / UPI ID" style="font-size:.82rem;"></div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;">
                <div><label class="ig-label">Expiry</label><input type="text" class="ig-input" placeholder="MM/YY" style="font-size:.82rem;"></div>
                <div><label class="ig-label">CVV</label><input type="password" class="ig-input" placeholder="•••" style="font-size:.82rem;"></div>
              </div>
              <div><label class="ig-label">Name on Card</label><input type="text" class="ig-input" placeholder="Cardholder name" style="font-size:.82rem;"></div>
            </div>
          </div>
          <!-- Bank transfer panel -->
          <div id="pay-panel-neft" style="display:none;">
            <div style="background:var(--parch-dk);border:1px solid var(--border);padding:.875rem;margin-bottom:1rem;font-size:.78rem;">
              <strong>Bank Details:</strong><br>HDFC Bank · A/C: 50200012345678 · IFSC: HDFC0001234 · India Gully
            </div>
            <div style="display:flex;flex-direction:column;gap:.625rem;">
              <div><label class="ig-label">UTR / Transaction Reference</label><input type="text" class="ig-input" id="pay-utr" placeholder="Enter UTR No." style="font-size:.82rem;"></div>
              <div><label class="ig-label">Payment Date</label><input type="date" class="ig-input" id="pay-date" style="font-size:.82rem;"></div>
            </div>
          </div>
          <!-- UPI panel -->
          <div id="pay-panel-upi" style="display:none;text-align:center;">
            <div style="font-size:.78rem;color:var(--ink-muted);margin-bottom:.75rem;">Scan QR code with any UPI app</div>
            <div style="width:140px;height:140px;margin:0 auto;background:repeating-linear-gradient(0deg,#e5e7eb 0px,#e5e7eb 2px,transparent 2px,transparent 8px),repeating-linear-gradient(90deg,#e5e7eb 0px,#e5e7eb 2px,transparent 2px,transparent 8px);border:2px solid var(--ink);display:flex;align-items:center;justify-content:center;font-size:.72rem;color:var(--ink-muted);">QR Code</div>
            <div style="font-size:.75rem;color:var(--ink-muted);margin-top:.5rem;">UPI ID: indiagully@hdfcbank</div>
          </div>
          <!-- Cheque panel -->
          <div id="pay-panel-chq" style="display:none;">
            <div style="background:var(--parch-dk);border:1px solid var(--border);padding:.875rem;font-size:.78rem;">
              <strong>Payee:</strong> Vivacious Entertainment & Hospitality Pvt. Ltd.<br><strong>Address:</strong> Registered Office, New Delhi
            </div>
            <div style="margin-top:.75rem;display:flex;flex-direction:column;gap:.5rem;">
              <div><label class="ig-label">Cheque Number</label><input type="text" class="ig-input" placeholder="Enter cheque number" style="font-size:.82rem;"></div>
              <div><label class="ig-label">Bank Name</label><input type="text" class="ig-input" placeholder="Issuing bank" style="font-size:.82rem;"></div>
            </div>
          </div>

          <button onclick="igConfirmPayment()" style="margin-top:1.25rem;background:#16a34a;color:#fff;border:none;padding:.65rem 1.5rem;font-size:.82rem;font-weight:600;cursor:pointer;width:100%;letter-spacing:.06em;text-transform:uppercase;"><i class="fas fa-lock" style="margin-right:.4rem;"></i>Pay Securely</button>
          <div style="font-size:.65rem;color:var(--ink-muted);text-align:center;margin-top:.625rem;"><i class="fas fa-shield-alt" style="margin-right:.2rem;"></i>256-bit SSL encrypted · PCI-DSS compliant · Razorpay secured</div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      var curInv = {};
      window.igViewInvoice = function(inv,desc,total,due,status){
        var totalNum = parseInt(total,10);
        curInv = {inv,total:totalNum,status};
        document.getElementById('inv-number').textContent = inv;
        document.getElementById('inv-due').innerHTML = 'Due: '+due+'<br>Status: <strong style="color:'+(status==='Paid'?'#16a34a':status==='Overdue'?'#dc2626':'#d97706')+';">'+status+'</strong>';
        var base=Math.round(totalNum/1.18);var gst=totalNum-base;var half=Math.round(gst/2);
        document.getElementById('inv-tbody').innerHTML='<tr style="border-bottom:1px solid var(--border);"><td style="padding:.5rem .75rem;">'+desc+'</td><td style="padding:.5rem .75rem;text-align:right;">₹'+base.toLocaleString('en-IN')+'</td><td style="padding:.5rem .75rem;text-align:right;">₹'+half.toLocaleString('en-IN')+'</td><td style="padding:.5rem .75rem;text-align:right;">₹'+half.toLocaleString('en-IN')+'</td><td style="padding:.5rem .75rem;text-align:right;font-weight:600;">₹'+totalNum.toLocaleString('en-IN')+'</td></tr>';
        document.getElementById('inv-total-row').innerHTML='<span style="font-weight:600;letter-spacing:.06em;text-transform:uppercase;font-size:.78rem;">Total Amount</span><span style="font-family:\'DM Serif Display\',Georgia,serif;font-size:1.25rem;color:var(--gold);">₹'+totalNum.toLocaleString('en-IN')+'</span>';
        document.getElementById('inv-pay-btn-area').innerHTML=
          '<div style="display:flex;gap:.75rem;margin-top:.25rem;">'
          +(status!=='Paid'
            ?'<button onclick="igPayInvoice(\''+inv+'\','+totalNum+',\''+status+'\')" style="background:#16a34a;color:#fff;border:none;padding:.6rem 1.25rem;font-size:.8rem;font-weight:600;cursor:pointer;flex:1;"><i class=\'fas fa-credit-card\' style=\'margin-right:.4rem;\'></i>Pay Invoice</button>'
            :'<div style="flex:1;text-align:center;padding:.875rem;background:#f0fdf4;border:1px solid #86efac;color:#15803d;font-size:.82rem;font-weight:600;"><i class=\'fas fa-check-circle\' style=\'margin-right:.4rem;\'></i>Paid. Thank you.</div>'
          )
          +'<button onclick="igDownloadInvoicePdf(\''+inv+'\')" style="background:var(--gold);color:#fff;border:none;padding:.6rem 1.25rem;font-size:.8rem;font-weight:600;cursor:pointer;"><i class=\'fas fa-download\' style=\'margin-right:.4rem;\'></i>Download PDF</button>'
          +'</div>';
        var m=document.getElementById('inv-view-modal');m.style.display='flex';m.style.alignItems='center';m.style.justifyContent='center';
      };
      window.igPayInvoice = function(inv,total,status){
        if(status==='Paid'){igToast('Invoice already paid','warn');return;}
        curInv={inv,total,status};
        document.getElementById('pay-inv-id').textContent=inv;
        document.getElementById('pay-amt').textContent='₹'+parseInt(total).toLocaleString('en-IN');
        var d=new Date();document.getElementById('pay-date').value=d.toISOString().split('T')[0];
        document.getElementById('inv-view-modal').style.display='none';
        var m=document.getElementById('pay-modal');m.style.display='flex';m.style.alignItems='center';m.style.justifyContent='center';
      };
      window.igConfirmPayment = function(){
        // Find the active panel: not hidden (display is '' or 'block', not 'none')
        var panels = ['rz','upi','neft','chq'];
        var activeMethod = 'rz';
        for(var pi=0; pi<panels.length; pi++){
          var pel = document.getElementById('pay-panel-'+panels[pi]);
          if(pel && pel.style.display !== 'none'){ activeMethod = panels[pi]; break; }
        }
        if(activeMethod==='neft'){
          var utr=document.getElementById('pay-utr').value.trim();
          if(!utr){igToast('Please enter UTR / Transaction reference','warn');return;}
        }
        if(activeMethod==='chq'){
          var chqNum=document.querySelector('#pay-panel-chq input').value.trim();
          if(!chqNum){igToast('Please enter the cheque number','warn');return;}
        }
        document.getElementById('pay-modal').style.display='none';
        fetch('/api/invoices/mark-paid',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',body:JSON.stringify({invoice_id:curInv.inv,amount:curInv.total})}).then(function(){}).catch(function(){});
        igToast('Payment of ₹'+parseInt(curInv.total).toLocaleString('en-IN')+' submitted. Awaiting finance verification.','success');
        var key='inv-status-'+curInv.inv.replace(/-/g,'_');
        var el=document.getElementById(key);
        if(el){el.innerHTML='Under Review';el.className='badge b-g';}
      };
      window.igSelectPayMethod = function(method){
        ['rz','upi','neft','chq'].forEach(function(m){
          document.getElementById('pay-panel-'+m).style.display=m===method?'':'none';
          var btn=document.getElementById('pm-'+m);
          if(btn) btn.style.borderColor=m===method?'#16a34a':'var(--border)';
        });
      };
      window.igDownloadInvoicePdf = function(inv){
        igToast('Generating PDF for '+inv+'…','info');
        fetch('/api/invoices/'+inv+'/pdf',{credentials:'include'})
          .then(function(r){ return r.ok ? r.json() : null; })
          .then(function(d){
            var label = d && d.filename ? d.filename : inv+'.pdf';
            igToast(label+' ready — printing invoice','success');
            // Trigger browser print of invoice modal as PDF
            window.print();
          })
          .catch(function(){
            igToast(inv+' PDF ready — use browser Print → Save as PDF','success');
            window.print();
          });
      };
    })();
    </script>`
  return c.html(layout('Invoices & GST', clientShell('Invoices & GST', 'invoices', body), { noNav:true, noFooter:true }))
})

app.get('/client/documents', (c) => {
  const body = `
    <!-- KYC Upload Banner -->
    <div style="background:#fffbeb;border:1px solid #fde68a;padding:.875rem 1.25rem;margin-bottom:1.5rem;display:flex;gap:.75rem;align-items:center;">
      <i class="fas fa-id-card" style="color:#d97706;font-size:1rem;flex-shrink:0;"></i>
      <div style="flex:1;">
        <div style="font-size:.82rem;font-weight:600;color:#92400e;">KYC Verification Required</div>
        <div style="font-size:.72rem;color:#78350f;margin-top:.1rem;">Please upload your KYC documents to activate full portal access and sign contracts electronically.</div>
      </div>
      <button onclick="togglePanel('kyc-upload-panel')" style="background:#d97706;color:#fff;border:none;padding:.4rem 1rem;font-size:.75rem;font-weight:600;cursor:pointer;flex-shrink:0;"><i class="fas fa-upload" style="margin-right:.3rem;"></i>Upload KYC</button>
    </div>

    <!-- KYC Upload Panel -->
    <div id="kyc-upload-panel" class="ig-panel" style="margin-bottom:1.5rem;">
      <h4 style="font-size:.82rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin-bottom:1rem;">KYC Document Upload</h4>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;">
        ${[
          {label:'PAN Card',              accept:'.pdf,.jpg,.png', hint:'Clear scan required'},
          {label:'Aadhaar Card (front)',  accept:'.pdf,.jpg,.png', hint:'Both sides required'},
          {label:'Company Registration',  accept:'.pdf',           hint:'Certificate of Incorporation'},
          {label:'GST Certificate',       accept:'.pdf',           hint:'GSTIN registration doc'},
          {label:'Bank Account Proof',    accept:'.pdf,.jpg',      hint:'Cancelled cheque / bank letter'},
          {label:'Address Proof',         accept:'.pdf,.jpg,.png', hint:'Utility bill / lease deed'},
        ].map((d,i)=>`
        <div style="border:1px solid var(--border);padding:.875rem;background:var(--parch-dk);">
          <div style="font-size:.8rem;font-weight:600;color:var(--ink);margin-bottom:.25rem;">${d.label}</div>
          <div style="font-size:.68rem;color:var(--ink-muted);margin-bottom:.5rem;">${d.hint}</div>
          <div style="display:flex;align-items:center;gap:.5rem;">
            <input type="file" id="kyc-file-${i}" accept="${d.accept}" style="display:none;" onchange="igKycFileSelected(${i},'${d.label}')">
            <button onclick="document.getElementById('kyc-file-${i}').click()" style="background:#fff;border:1px dashed #d97706;padding:.35rem .75rem;font-size:.72rem;cursor:pointer;color:#d97706;"><i class="fas fa-cloud-upload-alt" style="margin-right:.3rem;"></i>Choose File</button>
            <span id="kyc-file-name-${i}" style="font-size:.68rem;color:var(--ink-muted);">No file selected</span>
          </div>
        </div>`).join('')}
      </div>
      <div style="display:flex;gap:.75rem;">
        <button onclick="igSubmitKyc()" style="background:#d97706;color:#fff;border:none;padding:.5rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-paper-plane" style="margin-right:.4rem;"></i>Submit for Verification</button>
        <button onclick="togglePanel('kyc-upload-panel')" style="background:none;border:1px solid var(--border);padding:.5rem 1.25rem;font-size:.78rem;cursor:pointer;color:var(--ink-muted);">Cancel</button>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;margin-bottom:1.5rem;">
      ${[
        { name:'Agreements & Contracts', count:4, icon:'file-contract', color:'#4f46e5' },
        { name:'Proposals & Scope Letters', count:4, icon:'file-alt', color:'#B8960C'  },
        { name:'Invoices & GST Documents', count:3, icon:'receipt',    color:'#16a34a' },
        { name:'Reports & Deliverables',   count:3, icon:'chart-bar',  color:'#2563eb' },
      ].map(f => `
      <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;display:flex;align-items:center;gap:1rem;">
        <div style="width:44px;height:44px;background:${f.color};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <i class="fas fa-${f.icon}" style="color:#fff;font-size:.9rem;"></i>
        </div>
        <div>
          <div style="font-weight:600;font-size:.9rem;color:var(--ink);">${f.name}</div>
          <div style="font-size:.75rem;color:var(--ink-muted);">${f.count} documents</div>
        </div>
        <button onclick="igToast('Opening ${f.name} folder','success')" style="margin-left:auto;font-size:.72rem;color:var(--gold);background:none;border:none;cursor:pointer;padding:0;">Open →</button>
      </div>`).join('')}
    </div>
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Recent Documents</h3>
      </div>
      <table class="ig-tbl">
        <thead><tr><th>Document Name</th><th>Type</th><th>Shared By</th><th>Date</th><th>Size</th><th>Action</th></tr></thead>
        <tbody>
          ${[
            { name:'Advisory Agreement FY2026.pdf',      type:'Contract',   by:'Arun Manikonda', date:'01 Jan 2026', size:'1.2 MB'  },
            { name:'Hotel PMC Scope Letter.pdf',          type:'Letter',     by:'Arun Manikonda', date:'10 Feb 2026', size:'0.8 MB'  },
            { name:'Market Research Report Q4 2025.pdf', type:'Report',     by:'India Gully',    date:'15 Jan 2026', size:'4.5 MB'  },
            { name:'INV-2026-001 with GST.pdf',          type:'Invoice',    by:'Finance Team',   date:'15 Jan 2026', size:'0.3 MB'  },
          ].map(d => `
          <tr>
            <td style="font-weight:500;font-size:.85rem;"><i class="fas fa-file-pdf" style="color:#dc2626;margin-right:.4rem;font-size:.7rem;"></i>${d.name}</td>
            <td><span class="badge b-dk">${d.type}</span></td>
            <td style="font-size:.8rem;">${d.by}</td>
            <td style="font-size:.78rem;color:var(--ink-muted);">${d.date}</td>
            <td style="font-size:.78rem;color:var(--ink-muted);">${d.size}</td>
            <td><button onclick="igToast('Document downloaded successfully','success')" style="font-size:.72rem;color:var(--gold);background:none;border:none;cursor:pointer;padding:0;"><i class='fas fa-download' style='margin-right:.3rem;'></i>Download</button></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <script>
    window.igKycFileSelected = function(idx,label){
      var f=document.getElementById('kyc-file-'+idx);
      if(f&&f.files.length>0){ document.getElementById('kyc-file-name-'+idx).textContent=f.files[0].name; document.getElementById('kyc-file-name-'+idx).style.color='#16a34a'; }
    };
    window.igSubmitKyc = function(){
      var uploaded=0;
      for(var i=0;i<6;i++){ var f=document.getElementById('kyc-file-'+i); if(f&&f.files.length>0) uploaded++; }
      if(uploaded<2){ igToast('Please upload at least PAN Card and one additional document','warn'); return; }
      fetch('/api/documents/upload',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',body:JSON.stringify({type:'KYC',count:uploaded})}).then(function(){}).catch(function(){});
      igToast('KYC documents submitted ('+uploaded+'/6). Verification within 24-48 hours.','success');
      togglePanel('kyc-upload-panel');
    };
    </script>`
  return c.html(layout('Documents', clientShell('Documents', 'documents', body), { noNav:true, noFooter:true }))
})

app.get('/client/messages', (c) => {
  const body = `
    <div style="display:grid;grid-template-columns:1fr 2fr;gap:1.5rem;height:calc(100vh - 200px);">
      <div style="background:#fff;border:1px solid var(--border);overflow-y:auto;">
        <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);font-size:.82rem;font-weight:600;color:var(--ink);">Conversations</div>
        ${[
          { name:'Arun Manikonda', role:'Managing Director', email:'akm@indiagully.com',    msg:'Please review the updated proposal...', time:'10:30 AM', unread:1, color:'#B8960C', id:'conv-akm' },
          { name:'Amit Jhingan',   role:'President, Real Estate', email:'amit.jhingan@indiagully.com', msg:'Site visit confirmed for Thursday...', time:'Yesterday', unread:0, color:'#4f46e5', id:'conv-aj' },
          { name:'Finance Team',   role:'Billing & Accounts', email:'finance@indiagully.com', msg:'Invoice INV-2026-002 is due...', time:'2 days ago', unread:0, color:'#16a34a', id:'conv-fin' },
        ].map(c => `
        <div id="${c.id}" onclick="igSwitchConv(this,'${c.name}','${c.color}','${c.role}','${c.email}')" style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);cursor:pointer;display:flex;gap:.75rem;${c.id==='conv-akm'?'background:var(--parch-dk);':''}" onmouseover="if(this.style.background!=='var(--parch-dk)')this.style.background='var(--parch-dk)'" onmouseout="if(this.id!==document.getElementById('msg-active-conv').value)this.style.background=''">
          <div style="width:36px;height:36px;background:${c.color};display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:'DM Serif Display',Georgia,serif;color:#fff;font-size:.8rem;">${c.name[0]}</div>
          <div style="flex:1;min-width:0;">
            <div style="display:flex;justify-content:space-between;margin-bottom:.15rem;">
              <span style="font-size:.82rem;font-weight:600;color:var(--ink);">${c.name}</span>
              <span style="font-size:.68rem;color:var(--ink-muted);">${c.time}</span>
            </div>
            <div style="font-size:.72rem;color:var(--ink-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${c.msg}</div>
          </div>
          ${c.unread ? `<div id="badge-${c.id}" style="width:18px;height:18px;background:var(--gold);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.6rem;color:#fff;font-weight:700;flex-shrink:0;">${c.unread}</div>` : ''}
        </div>`).join('')}
      </div>
      <input type="hidden" id="msg-active-conv" value="conv-akm">
      <div style="background:#fff;border:1px solid var(--border);display:flex;flex-direction:column;">
        <div id="msg-header" style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:.75rem;">
          <div id="msg-hdr-avatar" style="width:36px;height:36px;background:#B8960C;display:flex;align-items:center;justify-content:center;font-family:'DM Serif Display',Georgia,serif;color:#fff;">A</div>
          <div>
            <div id="msg-hdr-name" style="font-size:.875rem;font-weight:600;color:var(--ink);">Arun Manikonda</div>
            <div id="msg-hdr-sub" style="font-size:.72rem;color:var(--ink-muted);">Managing Director · akm@indiagully.com</div>
          </div>
        </div>
        <div id="msg-thread" style="flex:1;padding:1.25rem;overflow-y:auto;display:flex;flex-direction:column;gap:1rem;">
          <div style="display:flex;gap:.75rem;">
            <div style="width:30px;height:30px;background:#B8960C;display:flex;align-items:center;justify-content:center;font-family:'DM Serif Display',Georgia,serif;color:#fff;font-size:.75rem;flex-shrink:0;">A</div>
            <div style="background:var(--parch-dk);padding:.75rem 1rem;max-width:75%;">
              <p style="font-size:.85rem;color:var(--ink);line-height:1.6;">Good morning! Please review the updated Q1 2025 proposal I've shared in your Documents section. Looking forward to your feedback.</p>
              <div style="display:flex;align-items:center;gap:.35rem;margin-top:.2rem;"><span style="font-size:.68rem;color:var(--ink-muted);">10:30 AM · 02 Mar 2026</span></div>
            </div>
          </div>
          <div style="display:flex;gap:.75rem;flex-direction:row-reverse;">
            <div style="width:30px;height:30px;background:var(--ink);display:flex;align-items:center;justify-content:center;font-family:'DM Serif Display',Georgia,serif;color:var(--gold);font-size:.75rem;flex-shrink:0;">C</div>
            <div style="background:var(--ink);padding:.75rem 1rem;max-width:75%;">
              <p style="font-size:.85rem;color:#fff;line-height:1.6;">Thank you, I will review it today and share my comments by EOD.</p>
              <div style="display:flex;align-items:center;gap:.35rem;justify-content:flex-end;margin-top:.2rem;">
                <span style="font-size:.68rem;color:rgba(255,255,255,.4);">11:15 AM · 02 Mar 2026</span>
                <span title="Read" style="font-size:.62rem;color:#60a5fa;">✓✓</span>
              </div>
            </div>
          </div>
        </div>
        <div style="padding:.875rem 1.25rem;border-top:1px solid var(--border);display:flex;gap:.5rem;align-items:center;">
          <button onclick="document.getElementById('msg-attach').click()" style="background:none;border:1px solid var(--border);width:34px;height:34px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;" title="Attach file"><i class="fas fa-paperclip" style="color:var(--ink-muted);font-size:.72rem;"></i></button>
          <input type="file" id="msg-attach" style="display:none;" onchange="igToast('File attached: '+this.files[0].name,'success')">
          <input id="msg-input" type="text" class="ig-input" placeholder="Type a message... (Enter to send)" style="flex:1;" onkeydown="if(event.key==='Enter'&&!event.shiftKey){event.preventDefault();igSendMsg();}">
          <button onclick="igSendMsg()" style="background:var(--gold);color:#fff;border:none;padding:.6rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;white-space:nowrap;"><i class="fas fa-paper-plane" style="margin-right:.3rem;font-size:.7rem;"></i>Send</button>
        </div>
      </div>
    </div>
    <script>
    function igSendMsg(){
      var inp = document.getElementById('msg-input');
      var msg = inp.value.trim();
      if(!msg){ igToast('Please type a message first','warn'); return; }
      var thread = document.getElementById('msg-thread');
      var div = document.createElement('div');
      div.style.cssText = 'display:flex;gap:.75rem;flex-direction:row-reverse;animation:fadeUp .3s ease';
      var t = new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',hour12:true});
      div.innerHTML = '<div style="width:30px;height:30px;background:var(--ink);display:flex;align-items:center;justify-content:center;font-family:\'DM Serif Display\',Georgia,serif;color:var(--gold);font-size:.75rem;flex-shrink:0;">C</div>'
        +'<div style="background:var(--ink);padding:.75rem 1rem;max-width:75%;">'
        +'<p style="font-size:.85rem;color:#fff;line-height:1.6;">'+msg.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')+'</p>'
        +'<div style="display:flex;align-items:center;gap:.35rem;justify-content:flex-end;margin-top:.2rem;"><span style="font-size:.68rem;color:rgba(255,255,255,.4);">'+t+' · Just now</span><span style="font-size:.62rem;color:rgba(255,255,255,.3);">✓</span></div>'
        +'</div>';
      thread.appendChild(div);
      thread.scrollTop = thread.scrollHeight;
      inp.value = '';
      fetch('/api/admin/audit',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',body:JSON.stringify({action:'message_sent',module:'Messages'})}).then(function(){}).catch(function(){});
      igToast('Message sent to '+document.getElementById('msg-hdr-name').textContent,'success');
      // Mark as read after 2s
      setTimeout(function(){ var ticks=div.querySelector('[style*="✓"]'); if(ticks){ticks.textContent='✓✓';ticks.style.color='#60a5fa';} },2000);
      // Remove unread badge
      var badge = document.getElementById('badge-'+document.getElementById('msg-active-conv').value);
      if(badge) badge.remove();
    }
    function igSwitchConv(el, name, color, role, email){
      // Update active state
      document.querySelectorAll('[id^="conv-"]').forEach(function(c){ c.style.background=''; });
      el.style.background = 'var(--parch-dk)';
      document.getElementById('msg-active-conv').value = el.id;
      document.getElementById('msg-hdr-name').textContent = name;
      document.getElementById('msg-hdr-avatar').textContent = name[0];
      document.getElementById('msg-hdr-avatar').style.background = color;
      // Update subtitle (role · email)
      var sub = document.getElementById('msg-hdr-sub');
      if(sub) sub.textContent = (role||'') + (email ? ' · ' + email : '');
      // Remove unread badge
      var badge = document.getElementById('badge-'+el.id);
      if(badge) badge.remove();
    }
    </script>`
  return c.html(layout('Messages', clientShell('Messages', 'messages', body), { noNav:true, noFooter:true }))
})

app.get('/client/profile', (c) => {
  const body = `
    <div style="display:grid;grid-template-columns:1fr 2fr;gap:1.5rem;">
      <div style="background:#fff;border:1px solid var(--border);padding:1.5rem;text-align:center;">
        <div style="width:80px;height:80px;background:var(--gold);border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:#fff;">C</div>
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--ink);">Demo Client</h3>
        <p style="font-size:.78rem;color:var(--ink-muted);margin-bottom:1rem;">Client Account</p>
        <span class="badge b-gr">Active</span>
        <div style="margin-top:1.25rem;padding-top:1.25rem;border-top:1px solid var(--border);">
          <p style="font-size:.72rem;color:var(--ink-muted);">Member since: Jan 2026</p>
          <p style="font-size:.72rem;color:var(--ink-muted);margin-top:.25rem;">Client ID: IG-CL-0001</p>
        </div>
      </div>
      <div style="background:#fff;border:1px solid var(--border);padding:1.5rem;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);margin-bottom:1.25rem;">Account Details</h3>
        <div style="display:flex;flex-direction:column;gap:1rem;">
          ${[
            { label:'Full Name',     value:'Demo Client'                     },
            { label:'Email Address', value:'demo@indiagully.com'             },
            { label:'Phone',         value:'+91 8988 988 988'               },
            { label:'Organisation',  value:'Demo Corp Pvt. Ltd.'             },
            { label:'GST Number',    value:'07XXXXXXXXXXX1ZX'               },
            { label:'PAN Number',    value:'XXXXX0000X'                     },
          ].map(f => `
          <div>
            <label class="ig-label">${f.label}</label>
            <div style="font-size:.875rem;color:var(--ink);background:var(--parch-dk);padding:.5rem .75rem;border:1px solid var(--border);">${f.value}</div>
          </div>`).join('')}
          <button onclick="togglePanel('client-profile-edit')" style="background:var(--gold);color:#fff;border:none;padding:.6rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;width:fit-content;margin-top:.5rem;">Edit Profile</button>
          <div id="client-profile-edit" class="ig-panel" style="margin-top:1rem;">
            <h4 style="font-size:.82rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:1rem;">Edit Account Details</h4>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:.875rem;">
              <div><label class="ig-label">Full Name</label><input type="text" class="ig-input" value="Demo Client" style="font-size:.82rem;"></div>
              <div><label class="ig-label">Email Address</label><input type="email" class="ig-input" value="demo@indiagully.com" style="font-size:.82rem;"></div>
              <div><label class="ig-label">Phone</label><input type="tel" class="ig-input" value="+91 8988 988 988" style="font-size:.82rem;"></div>
              <div><label class="ig-label">Organisation</label><input type="text" class="ig-input" value="Demo Corp Pvt. Ltd." style="font-size:.82rem;"></div>
              <div><label class="ig-label">GST Number</label><input type="text" class="ig-input" value="07XXXXXXXXXXX1ZX" style="font-size:.82rem;"></div>
              <div><label class="ig-label">PAN Number</label><input type="text" class="ig-input" value="XXXXX0000X" style="font-size:.82rem;"></div>
            </div>
            <div style="display:flex;gap:.75rem;margin-top:1rem;">
              <button onclick="fetch('/api/portal/profile/update',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',body:JSON.stringify({type:'client'})}).then(function(){igToast('Profile updated successfully','success');togglePanel('client-profile-edit');}).catch(function(){igToast('Profile updated successfully','success');togglePanel('client-profile-edit');})" style="background:var(--gold);color:#fff;border:none;padding:.5rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;">Save Changes</button>
              <button onclick="togglePanel('client-profile-edit')" style="background:none;border:1px solid var(--border);padding:.5rem 1.25rem;font-size:.78rem;cursor:pointer;color:var(--ink-muted);">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>`
  return c.html(layout('My Profile', clientShell('My Profile', 'profile', body), { noNav:true, noFooter:true }))
})

// ═════════════════════════════════════════════════════════════════════════════
// ── EMPLOYEE PORTAL ───────────────────────────────────────────────────────────
// ═════════════════════════════════════════════════════════════════════════════

function empShell(pageTitle: string, active: string, body: string) {
  const nav = [
    { id:'dashboard',  icon:'tachometer-alt',  label:'Dashboard',  badge:'' },
    { id:'attendance', icon:'calendar-check',  label:'Attendance', badge:'' },
    { id:'leave',      icon:'umbrella-beach',  label:'Leave',      badge:'1' },
    { id:'payslips',   icon:'money-check-alt', label:'Payslips',   badge:'' },
    { id:'form16',     icon:'file-invoice',    label:'Form-16',    badge:'' },
    { id:'documents',  icon:'folder-open',     label:'My Documents',badge:'' },
    { id:'policies',   icon:'book-open',       label:'Policies',   badge:'' },
    { id:'directory',  icon:'address-book',    label:'Directory',  badge:'' },
    { id:'profile',    icon:'user-cog',        label:'My Profile', badge:'' },
  ]
  const notifs = [
    {msg:'Leave application pending approval. Casual Leave 5-7 Mar',type:'warn',time:'1h ago'},
    {msg:'Payslip for February 2026 processed and available',type:'success',time:'3h ago'},
    {msg:'New policy update: Performance Review Process',type:'info',time:'2d ago'},
  ]
  return `
<div style="display:flex;height:100vh;overflow:hidden;background:#f7f7f7;">
  <aside style="width:240px;flex-shrink:0;background:#1A3A6B;display:flex;flex-direction:column;min-height:100vh;">
    <a href="/portal/employee/dashboard" style="padding:1rem 1.25rem;border-bottom:1px solid rgba(255,255,255,.1);display:block;">
      <img src="/assets/logo-white.png" alt="India Gully" height="26"
           style="height:26px;width:auto;max-width:170px;object-fit:contain;object-position:left center;display:block;"
           draggable="false" decoding="async">
      <div style="font-size:.55rem;letter-spacing:.2em;text-transform:uppercase;color:#93c5fd;margin-top:4px;">Employee Portal</div>
    </a>
    <nav style="flex:1;padding:.75rem;overflow-y:auto;">
      ${nav.map(i => `
      <a href="/portal/employee/${i.id === 'dashboard' ? 'dashboard' : i.id}" class="sb-lk ${active === i.id ? 'on' : ''}">
        <i class="fas fa-${i.icon}" style="width:16px;font-size:.75rem;text-align:center;"></i>${i.label}
        ${i.badge ? `<span class="sb-badge">${i.badge}</span>` : ''}
      </a>`).join('')}
    </nav>
    <div style="padding:.75rem;border-top:1px solid rgba(255,255,255,.1);">
      <a href="#" onclick="igSignOut('employee');return false;" class="sb-lk" style="color:#ef4444 !important;"><i class="fas fa-sign-out-alt" style="width:16px;font-size:.75rem;text-align:center;"></i>Sign Out</a>
    </div>
  </aside>
  <main style="flex:1;overflow-y:auto;display:flex;flex-direction:column;">
    <div style="background:#fff;border-bottom:1px solid var(--border);padding:.875rem 2rem;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
      <div>
        <div style="font-size:.65rem;color:var(--ink-muted);letter-spacing:.08em;text-transform:uppercase;margin-bottom:.15rem;">
          <a href="/portal" style="color:var(--ink-muted);text-decoration:none;">Portal</a>
          <i class="fas fa-chevron-right" style="font-size:.5rem;margin:0 .35rem;"></i>
          <a href="/portal/employee/dashboard" style="color:var(--ink-muted);text-decoration:none;">Employee</a>
          <i class="fas fa-chevron-right" style="font-size:.5rem;margin:0 .35rem;"></i>
          <span style="color:var(--ink);">${pageTitle}</span>
        </div>
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.15rem;color:var(--ink);">${pageTitle}</h2>
      </div>
      <div style="display:flex;align-items:center;gap:1rem;">
        <div style="position:relative;">
          <button id="emp-notif-btn" onclick="toggleEmpNotif()" style="background:none;border:1px solid var(--border);width:36px;height:36px;display:flex;align-items:center;justify-content:center;cursor:pointer;position:relative;">
            <i class="fas fa-bell" style="font-size:.75rem;color:var(--ink-muted);"></i>
            <span style="position:absolute;top:-3px;right:-3px;width:10px;height:10px;background:#dc2626;border-radius:50%;border:2px solid #fff;"></span>
          </button>
          <div id="emp-notif-panel" style="display:none;position:absolute;right:0;top:calc(100% + 8px);width:300px;background:#fff;border:1px solid var(--border);box-shadow:0 12px 40px rgba(0,0,0,.15);z-index:9999;">
            <div style="padding:.75rem 1rem;border-bottom:1px solid var(--border);font-size:.75rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink);">Notifications</div>
            ${notifs.map(n=>`<div style="padding:.75rem 1rem;border-bottom:1px solid var(--border);display:flex;gap:.625rem;">
              <i class="fas fa-${n.type==='warn'?'exclamation-triangle':n.type==='success'?'check-circle':'info-circle'}" style="color:${n.type==='warn'?'#d97706':n.type==='success'?'#16a34a':'#2563eb'};font-size:.75rem;margin-top:.1rem;flex-shrink:0;"></i>
              <div><div style="font-size:.78rem;color:var(--ink);line-height:1.4;">${n.msg}</div><div style="font-size:.65rem;color:var(--ink-muted);margin-top:.15rem;">${n.time}</div></div>
            </div>`).join('')}
          </div>
        </div>
        <div style="width:34px;height:34px;background:#1A3A6B;display:flex;align-items:center;justify-content:center;cursor:pointer;" title="Demo Employee" onclick="igToast('Profile: IG-EMP-0001 · Employee Portal','info')">
          <span style="font-family:'DM Serif Display',Georgia,serif;font-size:.8rem;color:#fff;font-weight:700;">EE</span>
        </div>
      </div>
    </div>
    <div style="flex:1;padding:2rem;overflow-y:auto;">${body}</div>
  </main>
</div>
<script>
function toggleEmpNotif(){var p=document.getElementById('emp-notif-panel');p.style.display=p.style.display==='none'?'block':'none';}
document.addEventListener('click',function(e){var btn=document.getElementById('emp-notif-btn');var panel=document.getElementById('emp-notif-panel');if(panel&&!panel.contains(e.target)&&btn&&!btn.contains(e.target))panel.style.display='none';});
window.igSignOut=window.igSignOut||function(portal){fetch('/api/auth/logout',{method:'POST',credentials:'include'}).catch(function(){}).finally(function(){location.href='/portal/'+(portal||'');});};

</script>`
}

app.get('/employee/dashboard', (c) => {
  const body = `
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem;margin-bottom:2rem;">
      ${[
        { label:'Leave Balance',     value:'12',  sub:'Days available',   icon:'umbrella-beach',  color:'#1A3A6B' },
        { label:'Attendance MTD',    value:'95%', sub:'Present this month', icon:'calendar-check', color:'#16a34a' },
        { label:'Pending Approvals', value:'1',   sub:'Leave pending',    icon:'clock',           color:'#d97706' },
        { label:'Payroll Month',     value:'Feb', sub:'2026, Processed', icon:'money-check-alt', color:'#7c3aed' },
      ].map(s => `
      <div class="am">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.875rem;">
          <span style="font-size:.65rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-muted);">${s.label}</span>
          <div style="width:32px;height:32px;background:${s.color};display:flex;align-items:center;justify-content:center;">
            <i class="fas fa-${s.icon}" style="color:#fff;font-size:.65rem;"></i>
          </div>
        </div>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2rem;line-height:1;color:var(--ink);margin-bottom:.25rem;">${s.value}</div>
        <div style="font-size:.72rem;color:var(--ink-muted);">${s.sub}</div>
      </div>`).join('')}
    </div>
    <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Recent Notices</h3>
        <a href="/portal/employee/policies" style="font-size:.72rem;color:var(--gold);">View All →</a>
      </div>
      ${[
        { date:'27 Feb 2026', title:'Q1 2026 Performance Reviews. Schedule Released',     type:'HR' },
        { date:'20 Feb 2026', title:'Office Closure. Holi 2026 (14th March)',             type:'Holiday' },
        { date:'15 Feb 2026', title:'Updated Travel & Expense Reimbursement Policy',       type:'Policy' },
      ].map(n => `
      <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);display:flex;gap:1rem;align-items:flex-start;">
        <span style="font-size:.68rem;color:var(--ink-muted);white-space:nowrap;min-width:90px;">${n.date}</span>
        <div>
          <span style="font-size:.85rem;font-weight:500;color:var(--ink);">${n.title}</span>
          <span style="margin-left:.5rem;font-size:.65rem;background:#dbeafe;color:#1d4ed8;padding:1px 6px;font-weight:600;">${n.type}</span>
        </div>
      </div>`).join('')}
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;">
      ${[
        { href:'/portal/employee/attendance', icon:'calendar-check', label:'Mark Attendance', color:'#1A3A6B' },
        { href:'/portal/employee/leave',      icon:'umbrella-beach', label:'Apply for Leave', color:'#16a34a' },
        { href:'/portal/employee/payslips',   icon:'money-check-alt',label:'View Payslips',   color:'#7c3aed' },
      ].map(q => `
      <a href="${q.href}" style="background:${q.color};padding:1.25rem;display:flex;align-items:center;gap:.875rem;text-decoration:none;transition:opacity .2s;" onmouseover="this.style.opacity='.88'" onmouseout="this.style.opacity='1'">
        <i class="fas fa-${q.icon}" style="color:#fff;font-size:1.1rem;"></i>
        <span style="font-size:.875rem;font-weight:600;color:#fff;">${q.label}</span>
        <i class="fas fa-arrow-right" style="margin-left:auto;color:rgba(255,255,255,.6);font-size:.7rem;"></i>
      </a>`).join('')}
    </div>`
  return c.html(layout('Employee Portal', empShell('Dashboard', 'dashboard', body), { noNav:true, noFooter:true }))
})

app.get('/employee/attendance', (c) => {
  const body = `
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:1rem;margin-bottom:1.5rem;">
      ${[
        { label:'Present (Feb)',  value:'18', color:'#16a34a' },
        { label:'Absent',         value:'1',  color:'#dc2626' },
        { label:'Late Arrivals',  value:'2',  color:'#d97706' },
        { label:'Attendance %',   value:'95%',color:'#2563eb' },
        { label:'Avg Hours/Day',  value:'9h 44m',color:'#7c3aed' },
      ].map(s => `
      <div class="am">
        <div style="font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.5rem;">${s.label}</div>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.6rem;color:${s.color};">${s.value}</div>
      </div>`).join('')}
    </div>
    <!-- Calendar heatmap -->
    <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;margin-bottom:1.5rem;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">February 2026, Calendar View</h3>
        <div style="display:flex;gap:.5rem;align-items:center;font-size:.68rem;color:var(--ink-muted);">
          <span style="width:12px;height:12px;background:#16a34a;display:inline-block;"></span>Present
          <span style="width:12px;height:12px;background:#dc2626;display:inline-block;margin-left:.5rem;"></span>Absent
          <span style="width:12px;height:12px;background:#d97706;display:inline-block;margin-left:.5rem;"></span>Late
          <span style="width:12px;height:12px;background:#e5e7eb;display:inline-block;margin-left:.5rem;"></span>Weekend/Holiday
        </div>
      </div>
      <div style="display:grid;grid-template-columns:repeat(7,1fr);gap:.35rem;text-align:center;">
        ${['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map(d=>`<div style="font-size:.65rem;font-weight:700;color:var(--ink-muted);padding:.25rem 0;">${d}</div>`).join('')}
        ${/* Feb 2026 starts on Sunday — in Mon-indexed week (Mon=0, Sun=6) that's offset 6 */ Array.from({length:6}).map(()=>`<div></div>`).join('')}
        ${Array.from({length:28},(_,i)=>{
          const d=i+1;
          const day=(i+6)%7; // Feb 1 2026 = Sunday, Mon-indexed: offset 6, so day=(i+6)%7; 0=Mon,6=Sun
          const isWknd=day>=5;
          const status = isWknd ? 'wknd' :
            [3,10,17].includes(d) ? 'late' :
            [18].includes(d) ? 'absent' : 'present';
          const bg = status==='wknd'?'#f3f4f6':status==='absent'?'#fef2f2':status==='late'?'#fffbeb':'#f0fdf4';
          const border = status==='wknd'?'#e5e7eb':status==='absent'?'#fca5a5':status==='late'?'#fcd34d':'#86efac';
          const tc = status==='wknd'?'#9ca3af':status==='absent'?'#dc2626':status==='late'?'#d97706':'#15803d';
          return `<div style="padding:.4rem .1rem;background:${bg};border:1px solid ${border};cursor:pointer;" title="${d} Feb, ${status==='wknd'?'Weekend':status==='absent'?'Absent':status==='late'?'Late Arrival':'Present'}" onclick="igToast('${d} Feb 2026, ${status==='wknd'?'Weekend/Holiday':status==='absent'?'Absent':status==='late'?'Late Arrival (after 9:30 AM)':'Present'}','${status==='absent'?'warn':'info'}')"><div style="font-size:.75rem;font-weight:600;color:${tc};">${d}</div>${!isWknd?`<div style="font-size:.58rem;color:${tc};margin-top:.1rem;">${status==='absent'?'ABS':status==='late'?'LATE':'PRE'}</div>`:''}</div>`;
        }).join('')}
      </div>
    </div>
    <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <div>
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">February 2026 Attendance Log</h3>
          <div id="att-clock" style="font-size:.75rem;color:var(--ink-muted);margin-top:.15rem;"></div>
        </div>
        <div style="display:flex;gap:.5rem;align-items:center;">
          <div id="att-status" style="font-size:.72rem;color:var(--ink-muted);padding:.25rem .75rem;border:1px solid var(--border);background:var(--parch-dk);">Status: Not checked in</div>
          <button id="checkin-btn" onclick="igAttendance('in')" style="background:#1A3A6B;color:#fff;border:none;padding:.35rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;"><i class='fas fa-sign-in-alt' style='margin-right:.3rem;'></i>Check In</button>
          <button id="checkout-btn" onclick="igAttendance('out')" style="background:var(--ink);color:#fff;border:none;padding:.35rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;opacity:.5;pointer-events:none;"><i class='fas fa-sign-out-alt' style='margin-right:.3rem;'></i>Check Out</button>
        </div>
      </div>
      <table class="ig-tbl">
        <thead><tr><th>Date</th><th>Day</th><th>Check In</th><th>Check Out</th><th>Hours</th><th>Status</th></tr></thead>
        <tbody id="att-tbody">
          ${[
            { date:'27 Feb', day:'Thu', in:'09:12 AM', out:'07:14 PM', hrs:'10h 2m',  ok:true  },
            { date:'26 Feb', day:'Wed', in:'09:05 AM', out:'06:55 PM', hrs:'9h 50m',  ok:true  },
            { date:'25 Feb', day:'Tue', in:'09:22 AM', out:'07:05 PM', hrs:'9h 43m',  ok:true  },
            { date:'24 Feb', day:'Mon', in:'09:00 AM', out:'06:30 PM', hrs:'9h 30m',  ok:true  },
            { date:'22 Feb', day:'Sat', in:'N/A',        out:'N/A',        hrs:'N/A',       ok:false },
            { date:'21 Feb', day:'Fri', in:'09:18 AM', out:'06:45 PM', hrs:'9h 27m',  ok:true  },
          ].map(r => `
          <tr>
            <td style="font-size:.82rem;font-weight:500;">${r.date}</td>
            <td style="font-size:.8rem;color:var(--ink-muted);">${r.day}</td>
            <td style="font-size:.82rem;">${r.in}</td>
            <td style="font-size:.82rem;">${r.out}</td>
            <td style="font-size:.82rem;">${r.hrs}</td>
            <td><span class="badge ${r.ok ? 'b-gr' : 'b-re'}">${r.ok ? 'Present' : 'Absent'}</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <script>
    (function(){
      var checkedIn = false;
      var checkInTime = null;
      // Live clock
      function updateClock(){
        var now = new Date();
        document.getElementById('att-clock').textContent = 'Today: '+now.toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'})+' · '+now.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:true});
      }
      updateClock();
      setInterval(updateClock, 1000);

      window.igAttendance = function(type){
        var now = new Date();
        var tStr = now.toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',hour12:true});
        var inBtn = document.getElementById('checkin-btn');
        var outBtn = document.getElementById('checkout-btn');
        var statusEl = document.getElementById('att-status');
        if(type === 'in'){
          if(checkedIn){ igToast('You are already checked in at '+checkInTime,'warn'); return; }
          checkedIn = true;
          checkInTime = tStr;
          inBtn.style.opacity = '.5';
          inBtn.style.pointerEvents = 'none';
          outBtn.style.opacity = '1';
          outBtn.style.pointerEvents = 'auto';
          statusEl.textContent = 'Checked in at ' + tStr;
          statusEl.style.color = '#15803d';
          statusEl.style.borderColor = '#16a34a';
          fetch('/api/admin/audit',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',body:JSON.stringify({action:'check_in',time:tStr,module:'Attendance'})}).then(function(){}).catch(function(){});
          igToast('Checked in at '+tStr+', attendance marked for today','success');
          // Add today to table
          var tbody = document.getElementById('att-tbody');
          var tr = document.createElement('tr');
          tr.style.background = '#f0fdf4';
          tr.innerHTML = '<td style="font-size:.82rem;font-weight:500;">Today</td>'
            +'<td style="font-size:.8rem;color:var(--ink-muted);">'+now.toLocaleDateString('en-IN',{weekday:'short'})+'</td>'
            +'<td style="font-size:.82rem;color:#15803d;font-weight:600;">'+tStr+'</td>'
            +'<td style="font-size:.82rem;color:var(--ink-muted);">N/A</td>'
            +'<td style="font-size:.82rem;color:var(--ink-muted);">In progress</td>'
            +'<td><span class="badge b-gr">Present</span></td>';
          tbody.insertBefore(tr, tbody.firstChild);
        } else {
          if(!checkedIn){ igToast('Please check in first before checking out','warn'); return; }
          checkedIn = false;
          inBtn.style.opacity = '1';
          inBtn.style.pointerEvents = 'auto';
          outBtn.style.opacity = '.5';
          outBtn.style.pointerEvents = 'none';
          statusEl.textContent = 'Checked out at ' + tStr;
          statusEl.style.color = '#b91c1c';
          statusEl.style.borderColor = '#dc2626';
          fetch('/api/admin/audit',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',body:JSON.stringify({action:'check_out',time:tStr,module:'Attendance'})}).then(function(){}).catch(function(){});
          igToast('Checked out at '+tStr+', have a great evening!','success');
          // Update today row
          var rows = document.getElementById('att-tbody').querySelectorAll('tr');
          if(rows[0]){
            rows[0].cells[3].textContent = tStr;
            rows[0].cells[3].style.color = '#15803d';
            rows[0].cells[3].style.fontWeight = '600';
            rows[0].cells[4].textContent = 'Logged';
            rows[0].style.background = '';
          }
        }
      };
    })();
    </script>`
  return c.html(layout('Attendance', empShell('Attendance', 'attendance', body), { noNav:true, noFooter:true }))
})

app.get('/employee/leave', (c) => {
  const body = `
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">
      ${[
        { type:'Casual Leave',  total:12, used:2, bal:10, color:'#1A3A6B' },
        { type:'Sick Leave',    total:12, used:0, bal:12, color:'#dc2626' },
        { type:'Earned Leave',  total:15, used:3, bal:12, color:'#16a34a' },
        { type:'Optional Holiday', total:2, used:0, bal:2, color:'#7c3aed' },
      ].map(l => `
      <div class="am">
        <div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.5rem;">${l.type}</div>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2rem;color:${l.color};margin-bottom:.25rem;">${l.bal}</div>
        <div style="font-size:.72rem;color:var(--ink-muted);">of ${l.total} days (${l.used} used)</div>
      </div>`).join('')}
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;">
      <div style="background:#fff;border:1px solid var(--border);padding:1.5rem;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);margin-bottom:1rem;">Apply for Leave</h3>
        <div style="display:flex;flex-direction:column;gap:.875rem;">
          <div>
            <label class="ig-label">Leave Type</label>
            <select id="lv-type" class="ig-input" onchange="igCalcDays()">
              <option value="Casual">Casual Leave (10 days remaining)</option>
              <option value="Sick">Sick Leave (12 days remaining)</option>
              <option value="Earned">Earned Leave (12 days remaining)</option>
            </select>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;">
            <div>
              <label class="ig-label">From Date</label>
              <input type="date" id="lv-from" class="ig-input" onchange="igCalcDays()" min="">
            </div>
            <div>
              <label class="ig-label">To Date</label>
              <input type="date" id="lv-to" class="ig-input" onchange="igCalcDays()" min="">
            </div>
          </div>
          <div id="lv-days-display" style="display:none;background:#f0fdf4;border:1px solid #86efac;padding:.6rem .875rem;font-size:.82rem;color:#15803d;font-weight:600;"></div>
          <div id="lv-error-display" style="display:none;background:#fef2f2;border:1px solid #fecaca;padding:.6rem .875rem;font-size:.82rem;color:#b91c1c;font-weight:600;"></div>
          <div>
            <label class="ig-label">Reason</label>
            <textarea id="lv-reason" class="ig-input" rows="3" placeholder="Brief reason for leave request..."></textarea>
          </div>
          <div>
            <label class="ig-label">Leave Contact (optional)</label>
            <input type="text" id="lv-contact" class="ig-input" placeholder="Who to contact in your absence">
          </div>
          <button onclick="igSubmitLeave()" style="background:#1A3A6B;color:#fff;border:none;padding:.7rem 1.5rem;font-size:.78rem;font-weight:600;cursor:pointer;width:fit-content;display:flex;align-items:center;gap:.4rem;"><i class='fas fa-paper-plane'></i>Submit Application</button>
        </div>
      </div>
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);">
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Leave History</h3>
        </div>
        <div id="lv-history-list">
        <table class="ig-tbl">
          <thead><tr><th>Dates</th><th>Type</th><th>Days</th><th>Status</th></tr></thead>
          <tbody>
            ${[
              { dates:'10-12 Jan 2026', type:'Casual',  days:'3', status:'Approved',  cls:'b-gr' },
              { dates:'25 Jan 2026',    type:'Sick',    days:'1', status:'Approved',  cls:'b-gr' },
              { dates:'14 Mar 2026',    type:'Optional',days:'1', status:'Approved',  cls:'b-gr' },
            ].map(r => `
            <tr>
              <td style="font-size:.8rem;">${r.dates}</td>
              <td><span class="badge b-dk">${r.type}</span></td>
              <td style="font-size:.82rem;">${r.days}</td>
              <td><span class="badge ${r.cls}">${r.status}</span></td>
            </tr>`).join('')}
          </tbody>
        </table>
        </div>
      </div>
    </div>
    <script>
    // Set min date for leave date pickers to today
    (function(){
      var today = new Date().toISOString().split('T')[0];
      var fromEl = document.getElementById('lv-from');
      var toEl = document.getElementById('lv-to');
      if(fromEl) fromEl.min = today;
      if(toEl) toEl.min = today;
    })();
    function igCalcDays(){
      var from = document.getElementById('lv-from').value;
      var to   = document.getElementById('lv-to').value;
      var disp = document.getElementById('lv-days-display');
      var err  = document.getElementById('lv-error-display');
      disp.style.display = 'none';
      err.style.display  = 'none';
      if(!from || !to) return;
      var d1 = new Date(from), d2 = new Date(to);
      if(d2 < d1){ err.textContent='To Date cannot be before From Date'; err.style.display='block'; return; }
      var diff = Math.round((d2-d1)/(1000*60*60*24))+1;
      disp.textContent = diff + ' day(s) requested. Working days will be calculated by HR.';
      disp.style.display = 'block';
    }
    function igSubmitLeave(){
      var from   = document.getElementById('lv-from').value;
      var to     = document.getElementById('lv-to').value;
      var reason = document.getElementById('lv-reason').value.trim();
      var err    = document.getElementById('lv-error-display');
      err.style.display = 'none';
      if(!from)  { err.textContent='Please select a From Date'; err.style.display='block'; return; }
      if(!to)    { err.textContent='Please select a To Date'; err.style.display='block'; return; }
      if(!reason){ err.textContent='Please provide a reason for your leave request'; err.style.display='block'; return; }
      var d1 = new Date(from), d2 = new Date(to);
      if(d2 < d1){ err.textContent='To Date cannot be before From Date'; err.style.display='block'; return; }
      var ref = 'LV-'+new Date().getFullYear()+'-'+String(Math.floor(Math.random()*900)+100);
      var type = document.getElementById('lv-type').value;
      var diff = Math.round((d2-d1)/(1000*60*60*24))+1;
      fetch('/api/hr/leave/apply',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',body:JSON.stringify({type:type,from:from,to:to,reason:reason,ref:ref,days:diff})}).then(function(){}).catch(function(){});
      igToast('Leave application submitted! Ref: '+ref+', '+diff+' day(s) pending approval','success');
      // Add to history
      var tbody = document.querySelector('#lv-history-list table tbody');
      var tr = document.createElement('tr');
      tr.style.background = '#fffbeb';
      var fromFmt = d1.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
      var toFmt   = d2.toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
      tr.innerHTML = '<td style="font-size:.8rem;">'+(from===to?fromFmt:fromFmt+', '+toFmt)+'</td>'
        +'<td><span class="badge b-dk">'+type+'</span></td>'
        +'<td style="font-size:.82rem;">'+diff+'</td>'
        +'<td><span class="badge b-g">Pending</span></td>';
      tbody.insertBefore(tr, tbody.firstChild);
      // Reset form
      document.getElementById('lv-from').value='';
      document.getElementById('lv-to').value='';
      document.getElementById('lv-reason').value='';
      document.getElementById('lv-contact').value='';
      document.getElementById('lv-days-display').style.display='none';
    }
    </script>`
  return c.html(layout('Leave', empShell('Leave Management', 'leave', body), { noNav:true, noFooter:true }))
})

app.get('/employee/payslips', (c) => {
  const body = `
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">
      ${[
        {label:'Gross CTC (Annual)',value:'₹15,00,000',color:'var(--ink)'},
        {label:'Net Pay (Feb)',value:'₹1,08,000',color:'var(--gold)'},
        {label:'YTD TDS Paid',value:'₹1,02,000',color:'#dc2626'},
        {label:'PF Contribution',value:'₹7,500/mo',color:'#2563eb'},
      ].map(s=>`<div class="am"><div style="font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.5rem;">${s.label}</div><div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.6rem;color:${s.color};">${s.value}</div></div>`).join('')}
    </div>
    <!-- Payslip Table -->
    <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Payslip History</h3>
        <button onclick="togglePanel('tds-calc-panel')" style="background:#1A3A6B;color:#fff;border:none;padding:.3rem .875rem;font-size:.68rem;font-weight:600;cursor:pointer;"><i class="fas fa-calculator" style="margin-right:.4rem;"></i>Tax Estimator</button>
      </div>
      <div id="tds-calc-panel" class="ig-panel" style="margin:.5rem 1rem;">
        <h4 style="font-size:.82rem;font-weight:700;color:var(--ink);margin-bottom:.875rem;">FY 2025-26 Tax Estimator (New Regime)</h4>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.75rem;margin-bottom:.875rem;">
          <div><label class="ig-label">Gross Annual CTC (₹)</label><input type="number" id="tc-ctc" class="ig-input" value="1500000" oninput="igCalcTax()" style="font-size:.82rem;"></div>
          <div><label class="ig-label">Annual PF (₹)</label><input type="number" id="tc-pf" class="ig-input" value="90000" oninput="igCalcTax()" style="font-size:.82rem;"></div>
          <div><label class="ig-label">Other Deductions (₹)</label><input type="number" id="tc-ded" class="ig-input" value="0" oninput="igCalcTax()" style="font-size:.82rem;"></div>
        </div>
        <div id="tc-result" style="background:var(--parch-dk);border:1px solid var(--border);padding:1rem;display:grid;grid-template-columns:repeat(4,1fr);gap:.75rem;">
          <div><div style="font-size:.6rem;font-weight:700;text-transform:uppercase;color:var(--ink-muted);letter-spacing:.08em;margin-bottom:.25rem;">Taxable Income</div><div id="tc-taxable" style="font-family:'DM Serif Display',Georgia,serif;font-size:1.25rem;color:var(--ink);">₹12,84,000</div></div>
          <div><div style="font-size:.6rem;font-weight:700;text-transform:uppercase;color:var(--ink-muted);letter-spacing:.08em;margin-bottom:.25rem;">Annual Tax</div><div id="tc-tax" style="font-family:'DM Serif Display',Georgia,serif;font-size:1.25rem;color:#dc2626;">₹1,02,000</div></div>
          <div><div style="font-size:.6rem;font-weight:700;text-transform:uppercase;color:var(--ink-muted);letter-spacing:.08em;margin-bottom:.25rem;">Monthly TDS</div><div id="tc-tds" style="font-family:'DM Serif Display',Georgia,serif;font-size:1.25rem;color:#d97706;">₹8,500</div></div>
          <div><div style="font-size:.6rem;font-weight:700;text-transform:uppercase;color:var(--ink-muted);letter-spacing:.08em;margin-bottom:.25rem;">Effective Rate</div><div id="tc-rate" style="font-family:'DM Serif Display',Georgia,serif;font-size:1.25rem;color:#2563eb;">6.8%</div></div>
        </div>
        <div id="tc-slab" style="margin-top:.875rem;font-size:.72rem;color:var(--ink-muted);line-height:1.9;"></div>
        <button onclick="togglePanel('tds-calc-panel')" style="margin-top:.875rem;background:none;border:1px solid var(--border);padding:.35rem .875rem;font-size:.72rem;cursor:pointer;color:var(--ink-muted);">Close</button>
      </div>
      <table class="ig-tbl">
        <thead><tr><th>Month</th><th>Gross</th><th>PF</th><th>PT</th><th>TDS</th><th>Net Pay</th><th>Days</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          ${[
            {month:'February 2026',gross:125000,pf:7500,pt:200,tds:9300,net:108000,days:20,cls:'b-gr'},
            {month:'January 2026', gross:125000,pf:7500,pt:200,tds:9300,net:108000,days:21,cls:'b-gr'},
            {month:'December 2025',gross:125000,pf:7500,pt:200,tds:9300,net:108000,days:22,cls:'b-gr'},
            {month:'November 2025',gross:125000,pf:7500,pt:200,tds:9300,net:108000,days:19,cls:'b-gr'},
            {month:'October 2025', gross:125000,pf:7500,pt:200,tds:9300,net:108000,days:23,cls:'b-gr'},
            {month:'September 2025',gross:125000,pf:7500,pt:200,tds:9300,net:108000,days:22,cls:'b-gr'},
          ].map(p => `
          <tr>
            <td style="font-weight:500;font-size:.85rem;">${p.month}</td>
            <td style="font-family:'DM Serif Display',Georgia,serif;">₹${(p.gross/1000).toFixed(0)}K</td>
            <td style="font-size:.78rem;color:#2563eb;">₹${(p.pf/1000).toFixed(0)}K</td>
            <td style="font-size:.78rem;color:var(--ink-muted);">₹${p.pt}</td>
            <td style="font-size:.78rem;color:#dc2626;">₹${(p.tds/1000).toFixed(1)}K</td>
            <td style="font-family:'DM Serif Display',Georgia,serif;color:var(--gold);">₹${(p.net/1000).toFixed(1)}K</td>
            <td style="font-size:.78rem;color:var(--ink-muted);">${p.days} days</td>
            <td><span class="badge ${p.cls}">Processed</span></td>
            <td style="display:flex;gap:.4rem;">
              <button onclick="igShowPayslip('${p.month}')" style="font-size:.68rem;color:var(--gold);background:none;border:1px solid #B8960C;cursor:pointer;padding:.2rem .5rem;"><i class='fas fa-eye'></i></button>
              <button onclick="igToast('Payslip PDF, ${p.month} downloading','success')" style="font-size:.68rem;color:var(--ink-muted);background:none;border:1px solid var(--border);cursor:pointer;padding:.2rem .5rem;"><i class='fas fa-download'></i></button>
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <!-- Payslip Detail Modal -->
    <div id="payslip-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:9999;align-items:center;justify-content:center;">
      <div style="background:#fff;width:600px;max-width:95vw;max-height:90vh;overflow-y:auto;border-top:4px solid var(--gold);">
        <div style="padding:1.25rem 1.5rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
          <div>
            <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--ink);">India Gully. Payslip</div>
            <div id="ps-month-title" style="font-size:.75rem;color:var(--ink-muted);margin-top:.15rem;"></div>
          </div>
          <button onclick="document.getElementById('payslip-modal').style.display='none'" style="background:none;border:none;font-size:1.2rem;cursor:pointer;color:var(--ink-muted);">✕</button>
        </div>
        <div style="padding:1.25rem 1.5rem;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.25rem;font-size:.82rem;">
            <div style="background:var(--parch-dk);padding:.875rem;"><strong>Employee:</strong> Demo Employee<br><strong>ID:</strong> IG-EMP-0001<br><strong>Dept:</strong> Operations<br><strong>Designation:</strong> Associate</div>
            <div style="background:var(--parch-dk);padding:.875rem;"><strong>PAN:</strong> XXXXX0000X<br><strong>UAN:</strong> 100123456789<br><strong>Bank:</strong> ****4521 (HDFC)<br><strong>Pay Period:</strong> <span id="ps-period"></span></div>
          </div>
          <table style="width:100%;font-size:.82rem;border-collapse:collapse;margin-bottom:1rem;">
            <thead><tr style="background:var(--ink);color:#fff;"><th style="padding:.5rem .75rem;text-align:left;">Earnings</th><th style="padding:.5rem .75rem;text-align:right;">Amount</th><th style="padding:.5rem .75rem;text-align:left;">Deductions</th><th style="padding:.5rem .75rem;text-align:right;">Amount</th></tr></thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--border);"><td style="padding:.45rem .75rem;">Basic Salary</td><td style="padding:.45rem .75rem;text-align:right;">₹62,500</td><td style="padding:.45rem .75rem;">Employee PF (12%)</td><td style="padding:.45rem .75rem;text-align:right;color:#2563eb;">₹7,500</td></tr>
              <tr style="border-bottom:1px solid var(--border);"><td style="padding:.45rem .75rem;">HRA</td><td style="padding:.45rem .75rem;text-align:right;">₹25,000</td><td style="padding:.45rem .75rem;">Professional Tax</td><td style="padding:.45rem .75rem;text-align:right;color:var(--ink-muted);">₹200</td></tr>
              <tr style="border-bottom:1px solid var(--border);"><td style="padding:.45rem .75rem;">Conveyance</td><td style="padding:.45rem .75rem;text-align:right;">₹5,000</td><td style="padding:.45rem .75rem;">Income Tax (TDS)</td><td style="padding:.45rem .75rem;text-align:right;color:#dc2626;">₹9,300</td></tr>
              <tr style="border-bottom:1px solid var(--border);"><td style="padding:.45rem .75rem;">Special Allowance</td><td style="padding:.45rem .75rem;text-align:right;">₹32,500</td><td style="padding:.45rem .75rem;color:var(--ink-muted);"></td><td style="padding:.45rem .75rem;"></td></tr>
              <tr style="background:var(--parch-dk);font-weight:700;"><td style="padding:.6rem .75rem;">Gross Earnings</td><td style="padding:.6rem .75rem;text-align:right;color:var(--gold);">₹1,25,000</td><td style="padding:.6rem .75rem;">Total Deductions</td><td style="padding:.6rem .75rem;text-align:right;color:#dc2626;">₹17,000</td></tr>
            </tbody>
          </table>
          <div style="background:var(--ink);color:#fff;padding:.875rem 1rem;display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
            <span style="font-weight:600;letter-spacing:.06em;text-transform:uppercase;font-size:.82rem;">Net Pay (Take Home)</span>
            <span style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:var(--gold);">₹1,08,000</span>
          </div>
          <div style="font-size:.7rem;color:var(--ink-muted);text-align:center;margin-bottom:1rem;">This is a computer-generated payslip and does not require a signature. · Employer PF: ₹7,500 · Gratuity Provisioning: ₹5,952</div>
          <div style="display:flex;gap:.75rem;">
            <button onclick="igToast('Payslip PDF downloading','success')" style="background:var(--gold);color:#fff;border:none;padding:.5rem 1.25rem;font-size:.75rem;font-weight:600;cursor:pointer;flex:1;"><i class="fas fa-download" style="margin-right:.4rem;"></i>Download PDF</button>
            <button onclick="document.getElementById('payslip-modal').style.display='none'" style="background:none;border:1px solid var(--border);padding:.5rem 1.25rem;font-size:.75rem;cursor:pointer;color:var(--ink-muted);">Close</button>
          </div>
        </div>
      </div>
    </div>
    <script>
    (function(){
      // Tax Calculator (New Regime FY 2025-26)
      window.igCalcTax = function(){
        var ctc = parseFloat(document.getElementById('tc-ctc').value)||0;
        var pf  = parseFloat(document.getElementById('tc-pf').value)||0;
        var ded = parseFloat(document.getElementById('tc-ded').value)||0;
        var std = 75000; // standard deduction new regime
        var taxable = Math.max(0, ctc - pf - ded - std);
        document.getElementById('tc-taxable').textContent = '₹'+taxable.toLocaleString('en-IN');
        // New regime slabs FY 2025-26
        // FY 2025-26 new regime slabs (Budget 2025): 0-3L=0%, 3-7L=5%, 7-10L=10%, 10-12L=15%, 12-15L=20%, >15L=30%
        var slabs = [{limit:300000,rate:0},{limit:700000,rate:.05},{limit:1000000,rate:.10},{limit:1200000,rate:.15},{limit:1500000,rate:.20},{limit:Infinity,rate:.30}];
        var tax=0, prev=0, slabDetails=[];
        for(var s of slabs){
          if(taxable<=prev) break;
          var chunk=Math.min(taxable,s.limit)-prev;
          var t=chunk*s.rate;
          if(chunk>0) slabDetails.push('₹'+(prev/100000).toFixed(1)+'L-₹'+(Math.min(taxable,s.limit)/100000).toFixed(1)+'L @'+(s.rate*100)+'% = ₹'+Math.round(t).toLocaleString('en-IN'));
          tax+=t; prev=s.limit;
        }
        if(taxable<=1200000) tax=0; // rebate u/s 87A — nil tax up to ₹12L taxable income (FY2025-26 Budget)
        var cess=tax*0.04;
        var total=tax+cess;
        var monthly=Math.round(total/12);
        var rate=ctc>0?((total/ctc)*100).toFixed(1):0;
        document.getElementById('tc-tax').textContent='₹'+Math.round(total).toLocaleString('en-IN');
        document.getElementById('tc-tds').textContent='₹'+monthly.toLocaleString('en-IN');
        document.getElementById('tc-rate').textContent=rate+'%';
        document.getElementById('tc-slab').innerHTML='<strong>Slab breakdown:</strong> '+(taxable<=1200000?'<span style="color:#15803d;">Nil tax — Rebate u/s 87A (Taxable income ≤ ₹12L, FY2025-26)</span>':slabDetails.join(' · '))+(cess>0?' + Cess ₹'+Math.round(cess).toLocaleString('en-IN'):'');
      };
      igCalcTax();

      // Payslip modal
      window.igShowPayslip = function(month){
        document.getElementById('ps-month-title').textContent = month;
        document.getElementById('ps-period').textContent = month;
        var modal = document.getElementById('payslip-modal');
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
      };
    })();
    </script>`
  return c.html(layout('Payslips & TDS', empShell('Payslips', 'payslips', body), { noNav:true, noFooter:true }))
})

app.get('/employee/form16', (c) => {
  const body = `
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Form-16 & TDS Documents</h3>
      </div>
      <table class="ig-tbl">
        <thead><tr><th>Financial Year</th><th>Assessment Year</th><th>Gross Income</th><th>Total TDS</th><th>Document</th><th>Action</th></tr></thead>
        <tbody>
          ${[
            { fy:'FY 2024-25', ay:'AY 2025-26', gross:'₹12,50,000', tds:'₹85,000', doc:'Form 16 Part A & B', status:'Available' },
            { fy:'FY 2023-24', ay:'AY 2024-25', gross:'₹11,80,000', tds:'₹76,500', doc:'Form 16 Part A & B', status:'Available' },
          ].map(r => `
          <tr>
            <td style="font-weight:500;">${r.fy}</td>
            <td style="font-size:.82rem;color:var(--ink-muted);">${r.ay}</td>
            <td style="font-family:'DM Serif Display',Georgia,serif;">${r.gross}</td>
            <td style="font-size:.82rem;color:#dc2626;">${r.tds}</td>
            <td style="font-size:.82rem;">${r.doc}</td>
            <td><button onclick="igToast('Form-16 for '+this.closest('tr').querySelector('td').textContent+' ready, downloading','success')" style="font-size:.72rem;color:var(--gold);background:none;border:none;cursor:pointer;padding:0;"><i class='fas fa-download'></i> Download</button></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>`
  return c.html(layout('Form-16', empShell('Form-16 & TDS', 'form16', body), { noNav:true, noFooter:true }))
})

app.get('/employee/policies', (c) => {
  const body = `
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;">
      ${[
        { name:'Employee Handbook 2026',               category:'HR',       updated:'01 Jan 2026', icon:'book-open' },
        { name:'Code of Conduct Policy',               category:'Compliance', updated:'01 Jan 2026', icon:'gavel'    },
        { name:'Travel & Expense Policy',              category:'Finance',  updated:'15 Feb 2026', icon:'plane'    },
        { name:'Leave Policy',                         category:'HR',       updated:'01 Jan 2026', icon:'calendar' },
        { name:'IT & Data Security Policy',            category:'IT',       updated:'01 Jan 2026', icon:'shield-alt' },
        { name:'Anti-Harassment & POSH Policy',        category:'Compliance', updated:'01 Jan 2026', icon:'users'   },
        { name:'Performance Review Process',           category:'HR',       updated:'27 Feb 2026', icon:'chart-bar' },
        { name:'Grievance Redressal Policy',           category:'HR',       updated:'01 Jan 2026', icon:'comments' },
      ].map(p => `
      <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;display:flex;align-items:center;gap:1rem;">
        <div style="width:40px;height:40px;background:#1A3A6B;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <i class="fas fa-${p.icon}" style="color:#fff;font-size:.8rem;"></i>
        </div>
        <div style="flex:1;">
          <div style="font-weight:500;font-size:.875rem;color:var(--ink);">${p.name}</div>
          <div style="font-size:.72rem;color:var(--ink-muted);margin-top:.15rem;">Updated: ${p.updated} · <span class="badge b-dk" style="font-size:.6rem;">${p.category}</span></div>
        </div>
        <button onclick="igToast('Opening: ${p.name}','success')" style="font-size:.72rem;color:var(--gold);white-space:nowrap;background:none;border:none;cursor:pointer;padding:0;"><i class='fas fa-eye'></i> View</button>
      </div>`).join('')}
    </div>`
  return c.html(layout('Policies', empShell('Company Policies', 'policies', body), { noNav:true, noFooter:true }))
})

app.get('/employee/directory', (c) => {
  const body = `
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;">
      ${[
        { name:'Arun Manikonda',  title:'Managing Director',     dept:'Leadership',  phone:'+91 9810 889 134', email:'akm@indiagully.com',           initials:'AK', color:'#B8960C' },
        { name:'Pavan Manikonda', title:'Executive Director',    dept:'Operations',  phone:'+91 6282 556 067', email:'pavan@indiagully.com',         initials:'PM', color:'#1A3A6B' },
        { name:'Amit Jhingan',    title:'President, Real Estate',dept:'Advisory',    phone:'+91 9899 993 543', email:'amit.jhingan@indiagully.com',  initials:'AJ', color:'#4f46e5' },
      ].map(e => `
      <div style="background:#fff;border:1px solid var(--border);padding:1.5rem;text-align:center;">
        <div style="width:64px;height:64px;background:${e.color};border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto .875rem;font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:#fff;">${e.initials}</div>
        <div style="font-weight:600;font-size:.95rem;color:var(--ink);margin-bottom:.2rem;">${e.name}</div>
        <div style="font-size:.78rem;color:var(--ink-muted);margin-bottom:.125rem;">${e.title}</div>
        <div style="font-size:.72rem;color:var(--ink-faint);margin-bottom:.875rem;">${e.dept}</div>
        <div style="display:flex;flex-direction:column;gap:.35rem;">
          <a href="mailto:${e.email}" style="font-size:.75rem;color:var(--gold);"><i class="fas fa-envelope" style="margin-right:.35rem;font-size:.65rem;"></i>${e.email}</a>
          <a href="tel:${e.phone.replace(/\\s/g,'')}" style="font-size:.75rem;color:var(--ink-muted);"><i class="fas fa-phone" style="margin-right:.35rem;font-size:.65rem;"></i>${e.phone}</a>
        </div>
      </div>`).join('')}
    </div>`
  return c.html(layout('Directory', empShell('Company Directory', 'directory', body), { noNav:true, noFooter:true }))
})

app.get('/employee/profile', (c) => {
  const body = `
    <div style="display:grid;grid-template-columns:1fr 2fr;gap:1.5rem;">
      <div style="background:#fff;border:1px solid var(--border);padding:1.5rem;text-align:center;">
        <div style="width:80px;height:80px;background:#1A3A6B;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:#fff;">E</div>
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--ink);">Demo Employee</h3>
        <p style="font-size:.78rem;color:var(--ink-muted);margin-bottom:.25rem;">Employee ID: IG-EMP-0001</p>
        <p style="font-size:.78rem;color:var(--ink-muted);margin-bottom:1rem;">Department: Operations</p>
        <span class="badge b-gr">Active</span>
      </div>
      <div style="background:#fff;border:1px solid var(--border);padding:1.5rem;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);margin-bottom:1.25rem;">My Details</h3>
        <div style="display:flex;flex-direction:column;gap:1rem;">
          ${[
            { label:'Full Name',       value:'Demo Employee'          },
            { label:'Employee ID',     value:'IG-EMP-0001'            },
            { label:'Designation',     value:'Operations Executive'   },
            { label:'Department',      value:'Operations'             },
            { label:'Date of Joining', value:'01 January 2025'        },
            { label:'Work Email',      value:'emp@indiagully.com'     },
            { label:'Phone',           value:'+91 8988 988 988'       },
            { label:'PAN Number',      value:'XXXXX0000X'             },
          ].map(f => `
          <div>
            <label class="ig-label">${f.label}</label>
            <div style="font-size:.875rem;color:var(--ink);background:var(--parch-dk);padding:.5rem .75rem;border:1px solid var(--border);">${f.value}</div>
          </div>`).join('')}
          <button onclick="togglePanel('emp-profile-edit')" style="background:#1A3A6B;color:#fff;border:none;padding:.6rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;width:fit-content;margin-top:.5rem;">Edit Profile</button>
          <div id="emp-profile-edit" class="ig-panel" style="margin-top:1rem;">
            <h4 style="font-size:.82rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:1rem;">Edit My Details</h4>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:.875rem;">
              <div><label class="ig-label">Full Name</label><input type="text" class="ig-input" value="Demo Employee" style="font-size:.82rem;"></div>
              <div><label class="ig-label">Phone</label><input type="tel" class="ig-input" value="+91 8988 988 988" style="font-size:.82rem;"></div>
              <div><label class="ig-label">Emergency Contact Name</label><input type="text" class="ig-input" placeholder="Emergency contact" style="font-size:.82rem;"></div>
              <div><label class="ig-label">Emergency Contact Phone</label><input type="tel" class="ig-input" placeholder="+91 XXXXX XXXXX" style="font-size:.82rem;"></div>
              <div><label class="ig-label">Bank Account (for salary)</label><input type="text" class="ig-input" placeholder="XXXX XXXX XXXX" style="font-size:.82rem;"></div>
              <div><label class="ig-label">IFSC Code</label><input type="text" class="ig-input" placeholder="SBIN0000XXX" style="font-size:.82rem;"></div>
            </div>
            <div style="display:flex;gap:.75rem;margin-top:1rem;">
              <button onclick="fetch('/api/portal/profile/update',{method:'POST',headers:{'Content-Type':'application/json'},credentials:'include',body:JSON.stringify({type:'employee'})}).then(function(){igToast('Profile updated successfully','success');togglePanel('emp-profile-edit');}).catch(function(){igToast('Profile updated successfully','success');togglePanel('emp-profile-edit');})" style="background:#1A3A6B;color:#fff;border:none;padding:.5rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;">Save Changes</button>
              <button onclick="togglePanel('emp-profile-edit')" style="background:none;border:1px solid var(--border);padding:.5rem 1.25rem;font-size:.78rem;cursor:pointer;color:var(--ink-muted);">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>`
  return c.html(layout('My Profile', empShell('My Profile', 'profile', body), { noNav:true, noFooter:true }))
})

// ═════════════════════════════════════════════════════════════════════════════
// ── BOARD & KMP PORTAL ────────────────────────────────────────────────────────
// ═════════════════════════════════════════════════════════════════════════════

function boardShell(pageTitle: string, active: string, body: string) {
  const nav = [
    { id:'dashboard',  icon:'tachometer-alt', label:'Dashboard'       },
    { id:'meetings',   icon:'gavel',          label:'Board Meetings'  },
    { id:'voting',     icon:'check-square',   label:'Voting'          },
    { id:'registers',  icon:'book',           label:'Statutory Reg.'  },
    { id:'packs',      icon:'file-alt',       label:'Board Packs'     },
    { id:'finance',    icon:'chart-bar',      label:'Finance Reports' },
    { id:'financials', icon:'chart-line',     label:'P&L / Financials'},
    { id:'governance', icon:'balance-scale',  label:'Governance Docs' },
    { id:'reports',    icon:'file-pdf',       label:'All Reports'     },
    { id:'compliance', icon:'shield-alt',     label:'Compliance'      },
  ]
  const notifs = [
    {msg:'Board Meeting Q3 Review, 15 Mar 2026 confirmed',type:'info',  time:'1h ago'},
    {msg:'Resolution RES-2026-004, Vote closes in 2 days', type:'warn',  time:'3h ago'},
    {msg:'GSTR-1 due 11 Mar. Finance team notified',      type:'warn',  time:'1d ago'},
    {msg:'DIN renewal reminder. Arun Manikonda expiry',   type:'danger', time:'2d ago'},
  ]
  return `
<div style="display:flex;height:100vh;overflow:hidden;background:#f7f7f7;">
  <aside style="width:240px;flex-shrink:0;background:#1E1E1E;display:flex;flex-direction:column;min-height:100vh;">
    <a href="/portal/board/dashboard" style="padding:1rem 1.25rem;border-bottom:1px solid rgba(255,255,255,.07);display:block;">
      <img src="/assets/logo-white.png" alt="India Gully" height="26"
           style="height:26px;width:auto;max-width:170px;object-fit:contain;object-position:left center;display:block;"
           draggable="false" decoding="async">
      <div style="font-size:.55rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-top:4px;">Board &amp; KMP</div>
    </a>
    <nav style="flex:1;padding:.75rem;overflow-y:auto;">
      ${nav.map(i => `
      <a href="/portal/board/${i.id === 'dashboard' ? 'dashboard' : i.id}" class="sb-lk ${active === i.id ? 'on' : ''}">
        <i class="fas fa-${i.icon}" style="width:16px;font-size:.75rem;text-align:center;"></i>${i.label}
      </a>`).join('')}
    </nav>
    <div style="padding:.75rem;border-top:1px solid rgba(255,255,255,.07);">
      <a href="#" onclick="igSignOut('board');return false;" class="sb-lk" style="color:#ef4444 !important;"><i class="fas fa-sign-out-alt" style="width:16px;font-size:.75rem;text-align:center;"></i>Sign Out</a>
    </div>
  </aside>
  <main style="flex:1;overflow-y:auto;display:flex;flex-direction:column;">
    <div style="background:#fff;border-bottom:1px solid var(--border);padding:.875rem 2rem;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
      <div>
        <div style="font-size:.62rem;color:var(--ink-muted);letter-spacing:.08em;text-transform:uppercase;margin-bottom:.15rem;">
          <a href="/portal" style="color:var(--ink-muted);text-decoration:none;">Portal</a>
          <i class="fas fa-chevron-right" style="font-size:.5rem;margin:0 .35rem;"></i>
          <a href="/portal/board/dashboard" style="color:var(--ink-muted);text-decoration:none;">Board & KMP</a>
          <i class="fas fa-chevron-right" style="font-size:.5rem;margin:0 .35rem;"></i>
          <span style="color:var(--ink);">${pageTitle}</span>
        </div>
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.15rem;color:var(--ink);">${pageTitle}</h2>
      </div>
      <div style="display:flex;align-items:center;gap:1rem;">
        <!-- Notification Bell -->
        <div style="position:relative;">
          <button id="brd-notif-btn" onclick="toggleBrdNotif()" style="background:none;border:1px solid var(--border);width:36px;height:36px;display:flex;align-items:center;justify-content:center;cursor:pointer;position:relative;">
            <i class="fas fa-bell" style="font-size:.75rem;color:var(--ink-muted);"></i>
            <span style="position:absolute;top:-3px;right:-3px;width:16px;height:16px;background:#dc2626;border-radius:50%;border:2px solid #fff;display:flex;align-items:center;justify-content:center;font-size:.5rem;color:#fff;font-weight:700;">4</span>
          </button>
          <div id="brd-notif-panel" style="display:none;position:absolute;right:0;top:calc(100% + 8px);width:320px;background:#fff;border:1px solid var(--border);box-shadow:0 12px 40px rgba(0,0,0,.15);z-index:9999;">
            <div style="padding:.75rem 1rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:.72rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink);">Board Alerts</span>
              <button onclick="igToast('All alerts cleared','success')" style="font-size:.65rem;color:var(--gold);background:none;border:none;cursor:pointer;">Clear All</button>
            </div>
            ${notifs.map(n=>`<div style="padding:.75rem 1rem;border-bottom:1px solid var(--border);display:flex;gap:.625rem;">
              <i class="fas fa-${n.type==='danger'?'exclamation-circle':n.type==='warn'?'exclamation-triangle':'info-circle'}" style="color:${n.type==='danger'?'#dc2626':n.type==='warn'?'#d97706':'#2563eb'};font-size:.75rem;margin-top:.1rem;flex-shrink:0;"></i>
              <div><div style="font-size:.78rem;color:var(--ink);line-height:1.4;">${n.msg}</div><div style="font-size:.65rem;color:var(--ink-muted);margin-top:.15rem;">${n.time}</div></div>
            </div>`).join('')}
          </div>
        </div>
        <!-- User badge -->
        <div style="display:flex;align-items:center;gap:.5rem;">
          <div style="text-align:right;">
            <div style="font-size:.72rem;font-weight:600;color:var(--ink);">Board Member</div>
            <div style="font-size:.6rem;color:var(--ink-muted);">Governance Portal</div>
          </div>
          <div style="width:34px;height:34px;background:#1E1E1E;display:flex;align-items:center;justify-content:center;cursor:pointer;" title="Board & KMP Member" onclick="igToast('Board & KMP Portal · Governance Access','info')">
            <i class="fas fa-gavel" style="color:var(--gold);font-size:.75rem;"></i>
          </div>
        </div>
      </div>
    </div>
    <div style="flex:1;padding:2rem;overflow-y:auto;">${body}</div>
  </main>
</div>
<script>
function toggleBrdNotif(){var p=document.getElementById('brd-notif-panel');p.style.display=p.style.display==='none'?'block':'none';}
document.addEventListener('click',function(e){var btn=document.getElementById('brd-notif-btn');var panel=document.getElementById('brd-notif-panel');if(panel&&!panel.contains(e.target)&&btn&&!btn.contains(e.target))panel.style.display='none';});
window.igSignOut=window.igSignOut||function(portal){fetch('/api/auth/logout',{method:'POST',credentials:'include'}).catch(function(){}).finally(function(){location.href='/portal/'+(portal||'');});};
</script>`
}

app.get('/board/dashboard', (c) => {
  const body = `
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem;margin-bottom:2rem;">
      ${[
        { label:'Next Board Meeting', value:'Mar 15', sub:'2026, Scheduled',    icon:'calendar',    color:'#1E1E1E' },
        { label:'Pending Resolutions',value:'2',      sub:'For director approval', icon:'check-square',  color:'#d97706' },
        { label:'Open Compliance',    value:'0',      sub:'All filings current',  icon:'check-circle', color:'#16a34a' },
        { label:'DIN Status',         value:'Active', sub:'All directors valid',  icon:'id-card',     color:'#2563eb' },
      ].map(s => `
      <div class="am">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.875rem;">
          <span style="font-size:.65rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-muted);">${s.label}</span>
          <div style="width:32px;height:32px;background:${s.color};display:flex;align-items:center;justify-content:center;">
            <i class="fas fa-${s.icon}" style="color:#fff;font-size:.65rem;"></i>
          </div>
        </div>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;line-height:1;color:var(--ink);margin-bottom:.25rem;">${s.value}</div>
        <div style="font-size:.72rem;color:var(--ink-muted);">${s.sub}</div>
      </div>`).join('')}
    </div>
    <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Upcoming Compliance Calendar</h3>
        <a href="/portal/board/compliance" style="font-size:.72rem;color:var(--gold);">Full Calendar →</a>
      </div>
      ${[
        { date:'15 Mar 2026', event:'Board Meeting. Q3 Review',           status:'Scheduled', cls:'b-gr' },
        { date:'31 Mar 2026', event:'Annual Accounts Filing (Form AOC-4)', status:'Due',       cls:'b-g'  },
        { date:'30 Jun 2026', event:'Annual Return Filing (Form MGT-7)',   status:'Upcoming',  cls:'b-dk' },
        { date:'30 Sep 2026', event:'Secretarial Audit (Form MR-3)',       status:'Upcoming',  cls:'b-dk' },
      ].map(n => `
      <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);display:flex;gap:1rem;align-items:center;">
        <span style="font-size:.72rem;color:var(--ink-muted);white-space:nowrap;min-width:90px;">${n.date}</span>
        <span style="font-size:.85rem;color:var(--ink);flex:1;">${n.event}</span>
        <span class="badge ${n.cls}">${n.status}</span>
      </div>`).join('')}
    </div>`
  return c.html(layout('Board & KMP Dashboard', boardShell('Dashboard', 'dashboard', body), { noNav:true, noFooter:true }))
})

app.get('/board/meetings', (c) => {
  const body = `
    <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Board Meeting Register</h3>
        <button onclick="togglePanel('board-sched-meeting')" style="background:#1E1E1E;color:#fff;border:none;padding:.35rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;"><i class='fas fa-plus' style='margin-right:.3rem;'></i>Schedule Meeting</button>
      </div>
      <table class="ig-tbl">
        <thead><tr><th>Meeting No.</th><th>Type</th><th>Date & Time</th><th>Venue</th><th>Quorum</th><th>Minutes</th><th>Status</th></tr></thead>
        <tbody>
          ${[
            { no:'BM-2026-03', type:'Board Meeting',   date:'15 Mar 2026 · 11:00 AM', venue:'Registered Office, New Delhi', quorum:'2/2',   minutes:'Pending',   cls:'b-g'  },
            { no:'BM-2026-02', type:'Board Meeting',   date:'15 Jan 2026 · 11:00 AM', venue:'Registered Office, New Delhi', quorum:'2/2',   minutes:'Approved',  cls:'b-gr' },
            { no:'BM-2026-01', type:'EGM',             date:'05 Jan 2026 · 10:00 AM', venue:'Video Conference',             quorum:'2/2',   minutes:'Approved',  cls:'b-gr' },
            { no:'BM-2024-04', type:'Board Meeting',   date:'15 Oct 2024 · 11:00 AM', venue:'Registered Office, New Delhi', quorum:'2/2',   minutes:'Approved',  cls:'b-gr' },
          ].map(m => `
          <tr>
            <td style="font-weight:600;font-size:.82rem;color:var(--gold);">${m.no}</td>
            <td><span class="badge b-dk">${m.type}</span></td>
            <td style="font-size:.82rem;">${m.date}</td>
            <td style="font-size:.8rem;color:var(--ink-muted);">${m.venue}</td>
            <td style="font-size:.82rem;">${m.quorum}</td>
            <td><span class="badge ${m.cls}">${m.minutes}</span></td>
            <td><button onclick="igToast('Opening board pack for '+this.closest('tr').querySelector('td').textContent,'success')" style="font-size:.72rem;color:var(--gold);background:none;border:none;cursor:pointer;padding:0;"><i class='fas fa-folder-open' style='margin-right:.3rem;'></i>View Pack</button></td>
          </tr>`).join('')}
        </tbody>
      </table>
      <!-- Schedule Meeting Inline Panel -->
      <div id="board-sched-meeting" class="ig-panel" style="margin:0 1.25rem 1.25rem;">
        <h4 style="font-size:.82rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:1rem;">Schedule New Board Meeting</h4>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;">
          <div><label class="ig-label">Meeting Type</label><select class="ig-input"><option>Board Meeting</option><option>EGM</option><option>AGM</option><option>Committee Meeting</option></select></div>
          <div><label class="ig-label">Meeting Date</label><input type="date" class="ig-input"></div>
          <div><label class="ig-label">Time</label><input type="time" class="ig-input" value="11:00"></div>
          <div><label class="ig-label">Venue</label><input type="text" class="ig-input" value="Registered Office, New Delhi"></div>
          <div><label class="ig-label">Mode</label><select class="ig-input"><option>In-Person</option><option>Video Conference</option><option>Hybrid</option></select></div>
          <div><label class="ig-label">Quorum Required</label><input type="text" class="ig-input" value="2 Directors" readonly></div>
        </div>
        <div><label class="ig-label" style="margin-top:.75rem;">Agenda Items</label><textarea class="ig-input" rows="3" placeholder="1. Approval of Q1 Financial Statements&#10;2. Review of Active Mandates&#10;3. Any Other Business"></textarea></div>
        <div style="display:flex;gap:.75rem;margin-top:1rem;">
          <button onclick="igToast('Board meeting scheduled. Notice sent to all directors.','success');togglePanel('board-sched-meeting')" style="background:#1E1E1E;color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class='fas fa-calendar-check' style='margin-right:.4rem;'></i>Schedule & Notify Directors</button>
          <button onclick="togglePanel('board-sched-meeting')" style="background:none;border:1px solid var(--border);padding:.55rem 1.25rem;font-size:.78rem;cursor:pointer;color:var(--ink-muted);">Cancel</button>
        </div>
      </div>
    </div>`
  return c.html(layout('Board Meetings', boardShell('Board Meetings', 'meetings', body), { noNav:true, noFooter:true }))
})

app.get('/board/voting', (c) => {
  const body = `
    <div style="display:flex;flex-direction:column;gap:1.25rem;">
      <h3 style="font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);">Pending Resolutions. Action Required</h3>
      ${[
        {
          res:'RES-2026-003', title:'Approval of Q3 FY2025-26 Financial Statements',
          desc:'Board resolution to approve standalone and consolidated financial statements for the quarter ended 31 December 2025.',
          date:'15 Mar 2026', type:'Ordinary Resolution',
        },
        {
          res:'RES-2026-004', title:'Re-appointment of M/s Pipara & Co. as Statutory Auditors',
          desc:'Board resolution to recommend re-appointment of Pipara & Co. as statutory auditors for FY 2025-26 to the shareholders.',
          date:'15 Mar 2026', type:'Special Resolution',
        },
      ].map((r,i) => `
      <div id="res-card-${i}" style="background:#fff;border:1px solid #fde68a;">
        <div style="background:#fffbeb;padding:1rem 1.25rem;border-bottom:1px solid #fde68a;display:flex;justify-content:space-between;align-items:flex-start;">
          <div>
            <span style="font-size:.72rem;font-weight:600;color:#92400e;">${r.res}</span>
            <span style="margin-left:.75rem;font-size:.68rem;background:#fef3c7;color:#92400e;padding:1px 6px;border-radius:2px;font-weight:600;">${r.type}</span>
          </div>
          <div style="display:flex;align-items:center;gap:.75rem;">
            <span style="font-size:.72rem;color:var(--ink-muted);">Meeting: ${r.date}</span>
            <div id="res-voted-${i}" style="display:none;padding:.25rem .75rem;font-size:.72rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;"></div>
          </div>
        </div>
        <div style="padding:1.25rem;">
          <h4 style="font-size:.95rem;font-weight:600;color:var(--ink);margin-bottom:.5rem;">${r.title}</h4>
          <p style="font-size:.82rem;color:var(--ink-muted);line-height:1.65;margin-bottom:1.25rem;">${r.desc}</p>
          <div id="res-actions-${i}" style="display:flex;gap:.75rem;">
            <button onclick="igVote(${i},'for','${r.res}')" style="background:#16a34a;color:#fff;border:none;padding:.6rem 1.5rem;font-size:.78rem;font-weight:600;cursor:pointer;flex:1;letter-spacing:.06em;text-transform:uppercase;"><i class="fas fa-check" style="margin-right:.4rem;"></i>Vote For</button>
            <button onclick="igVote(${i},'against','${r.res}')" style="background:#dc2626;color:#fff;border:none;padding:.6rem 1.5rem;font-size:.78rem;font-weight:600;cursor:pointer;flex:1;letter-spacing:.06em;text-transform:uppercase;"><i class="fas fa-times" style="margin-right:.4rem;"></i>Vote Against</button>
            <button onclick="igVote(${i},'abstain','${r.res}')" style="background:var(--parch-dk);color:var(--ink);border:1px solid var(--border);padding:.6rem 1.5rem;font-size:.78rem;font-weight:600;cursor:pointer;letter-spacing:.06em;text-transform:uppercase;">Abstain</button>
          </div>
        </div>
      </div>`).join('')}
      <h3 style="font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);margin-top:.5rem;">Passed Resolutions</h3>
      <div style="background:#fff;border:1px solid var(--border);">
        <table class="ig-tbl">
          <thead><tr><th>Resolution #</th><th>Title</th><th>Date</th><th>Type</th><th>Result</th></tr></thead>
          <tbody id="passed-res-tbody">
            ${[
              { res:'RES-2026-001', title:'Approval of Q3 Financials FY 2025-26', date:'05 Jan 2026', type:'Ordinary', result:'Passed Unanimously' },
              { res:'RES-2026-002', title:'Board Fee Revision for FY 2026',        date:'15 Jan 2026', type:'Ordinary', result:'Passed Unanimously' },
              { res:'RES-2024-012', title:'Appointment of Company Secretary',      date:'15 Oct 2024', type:'Ordinary', result:'Passed Unanimously' },
            ].map(r => `
            <tr>
              <td style="font-size:.82rem;font-weight:600;color:var(--gold);">${r.res}</td>
              <td style="font-size:.85rem;">${r.title}</td>
              <td style="font-size:.78rem;color:var(--ink-muted);">${r.date}</td>
              <td><span class="badge b-dk">${r.type}</span></td>
              <td><span class="badge b-gr">${r.result}</span></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
    <script>
    function igVote(idx, type, resId){
      var labels = {for:{text:'Voted For',bg:'#16a34a',badge:'b-gr',icon:'check',toast:'success'},against:{text:'Voted Against',bg:'#dc2626',badge:'b-re',icon:'times',toast:'error'},abstain:{text:'Abstained',bg:'#d97706',badge:'b-g',icon:'minus',toast:'warn'}};
      var lbl = labels[type];
      igConfirm('Confirm your vote '+type.toUpperCase()+' on resolution '+resId+'?', function(){
        var t = new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',hour12:true});
        // Update card
        var card = document.getElementById('res-card-'+idx);
        card.style.border = '1px solid '+(type==='for'?'#86efac':type==='against'?'#fca5a5':'#fde68a');
        card.style.background = (type==='for'?'#f0fdf4':type==='against'?'#fef2f2':'#fffbeb');
        // Show voted badge
        var badge = document.getElementById('res-voted-'+idx);
        badge.textContent = lbl.text + ' at ' + t;
        badge.style.cssText = 'background:'+lbl.bg+';color:#fff;padding:.25rem .75rem;font-size:.72rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;';
        badge.style.display = 'block';
        // Disable action buttons
        var actions = document.getElementById('res-actions-'+idx);
        actions.style.opacity = '.4';
        actions.style.pointerEvents = 'none';
        // Toast
        igToast('Vote '+type.toUpperCase()+' on '+resId+' recorded & timestamped at '+t, lbl.toast);
      });
    }
    </script>`
  return c.html(layout('Voting', boardShell('Voting & Resolutions', 'voting', body), { noNav:true, noFooter:true }))
})

app.get('/board/registers', (c) => {
  const body = `
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;margin-bottom:1.5rem;">
      ${[
        { name:'Register of Directors (MGT-7)',        desc:'Names, DINs, shareholding, appointments & resignations',           entries:2,  updated:'15 Jan 2026',
          data:[{col:'Name',v:'Arun Manikonda'},{col:'DIN',v:'XXXXXXXX'},{col:'Designation',v:'Managing Director'},{col:'Date of Appointment',v:'01 Apr 2017'},{col:'Shareholding',v:'50%'}] },
        { name:'Register of KMPs',                     desc:'KMP details, appointment dates, remuneration',                     entries:3,  updated:'15 Jan 2026',
          data:[{col:'Name',v:'Pavan Manikonda'},{col:'Designation',v:'Executive Director'},{col:'Date of Appointment',v:'01 Apr 2017'},{col:'Remuneration (FY2025)',v:'₹1,50,000 p.m.'}] },
        { name:'Register of Members',                  desc:'Shareholder names, addresses, shareholding pattern',               entries:2,  updated:'05 Jan 2026',
          data:[{col:'Shareholder 1',v:'Arun Manikonda, 50%'},{col:'Shareholder 2',v:'Pavan Manikonda, 50%'},{col:'Total Paid-up Capital',v:'₹1,00,000'},{col:'Face Value',v:'₹10 per share'}] },
        { name:'Register of Charges (CHG-7)',          desc:'All charges created, modified or satisfied',                       entries:0,  updated:'01 Jan 2026',
          data:[{col:'Status',v:'No charges registered'},{col:'Lenders',v:'Nil'},{col:'Secured Assets',v:'Nil'}] },
        { name:'Register of Contracts (AOC-2)',        desc:'Related party transactions requiring board approval',              entries:4,  updated:'15 Feb 2026',
          data:[{col:'Transaction 1',v:'Directors Remuneration FY2025'},{col:'Transaction 2',v:'Inter-company loan (if any)'},{col:'Transaction 3',v:'Premises lease agreement'},{col:'Approval Status',v:'Board Approved'}] },
        { name:'Register of Investments',              desc:'All investments made by the company',                              entries:0,  updated:'01 Jan 2026',
          data:[{col:'Status',v:'No investments as of date'},{col:'Subsidiaries',v:'Nil'},{col:'Associates',v:'Nil'}] },
      ].map((reg,ri) => `
      <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:.75rem;">
          <h4 style="font-size:.875rem;font-weight:600;color:var(--ink);line-height:1.4;">${reg.name}</h4>
          <span style="font-size:.68rem;font-weight:600;color:var(--gold);white-space:nowrap;margin-left:.5rem;">${reg.entries} entries</span>
        </div>
        <p style="font-size:.78rem;color:var(--ink-muted);line-height:1.5;margin-bottom:.875rem;">${reg.desc}</p>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.625rem;">
          <span style="font-size:.72rem;color:var(--ink-faint);">Last updated: ${reg.updated}</span>
          <div style="display:flex;gap:.5rem;">
            <button onclick="togglePanel('reg-view-${ri}')" style="font-size:.72rem;color:var(--gold);background:none;border:1px solid var(--border);padding:.25rem .625rem;cursor:pointer;">View Entries</button>
            <button onclick="igToast('${reg.name} PDF downloaded','success')" style="font-size:.72rem;color:var(--ink-muted);background:none;border:1px solid var(--border);padding:.25rem .625rem;cursor:pointer;"><i class="fas fa-download" style="font-size:.6rem;"></i></button>
          </div>
        </div>
        <div id="reg-view-${ri}" class="ig-panel">
          <div style="font-size:.75rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.75rem;">${reg.name}, Entries</div>
          ${reg.data.map(d=>`<div style="display:flex;justify-content:space-between;padding:.4rem 0;border-bottom:1px solid var(--border);"><span style="font-size:.78rem;color:var(--ink-muted);">${d.col}</span><span style="font-size:.82rem;color:var(--ink);font-weight:500;">${d.v}</span></div>`).join('')}
          <div style="display:flex;gap:.5rem;margin-top:.875rem;">
            <button onclick="igToast('Entry added to ${reg.name}','success')" style="background:var(--gold);color:#fff;border:none;padding:.35rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;"><i class="fas fa-plus" style="margin-right:.3rem;font-size:.6rem;"></i>Add Entry</button>
            <button onclick="togglePanel('reg-view-${ri}')" style="background:none;border:1px solid var(--border);padding:.35rem .875rem;font-size:.72rem;cursor:pointer;color:var(--ink-muted);">Close</button>
          </div>
        </div>
      </div>`).join('')}
    </div>`
  return c.html(layout('Statutory Registers', boardShell('Statutory Registers', 'registers', body), { noNav:true, noFooter:true }))
})

app.get('/board/packs', (c) => {
  const body = `
    <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Board Meeting Packs & Minutes</h3>
      </div>
      ${[
        { meeting:'BM-2026-03, March Board Meeting',  date:'15 Mar 2026', status:'Upcoming', cls:'b-g',
          files:[
            {name:'Board Meeting Notice.pdf',           type:'Notice',      size:'0.3 MB'},
            {name:'Q1 2025 Financial Statements.pdf',   type:'Finance',     size:'2.1 MB'},
            {name:'Proposed Resolutions RES-003.pdf',   type:'Resolution',  size:'0.4 MB'},
            {name:'Management Discussion & Analysis.pdf',type:'Report',     size:'1.5 MB'},
          ]},
        { meeting:'BM-2026-02, January Board Meeting', date:'15 Jan 2026', status:'Final', cls:'b-gr',
          files:[
            {name:'Board Meeting Minutes. Approved.pdf', type:'Minutes',   size:'0.8 MB'},
            {name:'FY2025 Q2 Financial Statements.pdf',   type:'Finance',   size:'1.9 MB'},
            {name:'Auditor Report Q2.pdf',                type:'Audit',     size:'1.2 MB'},
            {name:'Director Attendance Register.pdf',     type:'Register',  size:'0.2 MB'},
          ]},
        { meeting:'BM-2026-01, January EGM',           date:'05 Jan 2026', status:'Final', cls:'b-gr',
          files:[
            {name:'EGM Notice & Agenda.pdf',              type:'Notice',    size:'0.3 MB'},
            {name:'Proxy Form.pdf',                       type:'Form',      size:'0.1 MB'},
            {name:'Voting Results.pdf',                   type:'Voting',    size:'0.2 MB'},
          ]},
      ].map((p,pi) => `
      <div style="border-bottom:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;display:flex;justify-content:space-between;align-items:center;">
          <div style="display:flex;align-items:center;gap:.875rem;">
            <div style="width:36px;height:36px;background:#1E1E1E;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <i class="fas fa-folder" style="color:var(--gold);font-size:.75rem;"></i>
            </div>
            <div>
              <div style="font-weight:500;font-size:.875rem;color:var(--ink);">${p.meeting}</div>
              <div style="font-size:.72rem;color:var(--ink-muted);">${p.date} · ${p.files.length} documents</div>
            </div>
          </div>
          <div style="display:flex;align-items:center;gap:.75rem;">
            <span class="badge ${p.cls}">${p.status}</span>
            <button onclick="togglePanel('pack-${pi}')" style="font-size:.72rem;color:var(--gold);background:none;border:1px solid var(--border);padding:.3rem .75rem;cursor:pointer;display:flex;align-items:center;gap:.3rem;"><i class="fas fa-folder-open" style="font-size:.6rem;"></i>Open Pack</button>
            <button onclick="igToast('Downloading full pack for ${p.meeting}','success')" style="font-size:.72rem;color:var(--ink-muted);background:none;border:1px solid var(--border);padding:.3rem .6rem;cursor:pointer;"><i class="fas fa-download" style="font-size:.6rem;"></i></button>
          </div>
        </div>
        <div id="pack-${pi}" class="ig-panel" style="margin:0 1.25rem 1.25rem;background:#fafaf8;">
          <div style="font-size:.72rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.75rem;">Documents in this Pack</div>
          <div style="display:flex;flex-direction:column;gap:.4rem;">
            ${p.files.map(f=>`
            <div style="display:flex;align-items:center;justify-content:space-between;padding:.5rem .75rem;background:#fff;border:1px solid var(--border);">
              <div style="display:flex;align-items:center;gap:.625rem;">
                <i class="fas fa-file-pdf" style="color:#dc2626;font-size:.75rem;"></i>
                <div>
                  <div style="font-size:.82rem;font-weight:500;color:var(--ink);">${f.name}</div>
                  <div style="font-size:.68rem;color:var(--ink-muted);">${f.type} · ${f.size}</div>
                </div>
              </div>
              <div style="display:flex;gap:.4rem;">
                <button onclick="igToast('Opening ${f.name} in viewer','success')" style="background:none;border:1px solid var(--border);padding:.22rem .55rem;font-size:.65rem;cursor:pointer;color:var(--gold);"><i class="fas fa-eye"></i> View</button>
                <button onclick="igToast('${f.name} downloaded','success')" style="background:none;border:1px solid var(--border);padding:.22rem .55rem;font-size:.65rem;cursor:pointer;color:var(--ink-muted);"><i class="fas fa-download"></i></button>
              </div>
            </div>`).join('')}
          </div>
        </div>
      </div>`).join('')}
    </div>`
  return c.html(layout('Board Packs', boardShell('Board Packs & Minutes', 'packs', body), { noNav:true, noFooter:true }))
})

app.get('/board/finance', (c) => {
  const body = `
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">
      ${[
        { label:'Revenue FY2025',   value:'₹1.24 Cr', trend:'↑ YoY',    color:'#16a34a' },
        { label:'Net Profit',       value:'₹44.6L',   trend:'36% margin',color:'#2563eb' },
        { label:'Total Assets',     value:'₹3.2 Cr',  trend:'As of Dec', color:'#B8960C' },
        { label:'Net Worth',        value:'₹2.8 Cr',  trend:'Equity',    color:'#7c3aed' },
      ].map(s => `
      <div class="am">
        <div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.5rem;">${s.label}</div>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.6rem;color:${s.color};margin-bottom:.25rem;">${s.value}</div>
        <div style="font-size:.72rem;color:var(--ink-muted);">${s.trend}</div>
      </div>`).join('')}
    </div>
    <div style="background:#fff;border:1px solid var(--border);padding:1rem 1.25rem;">
      <div style="display:flex;gap:1rem;flex-wrap:wrap;">
        ${['P&L Statement FY2025', 'Balance Sheet FY2025', 'Cash Flow Statement', 'Auditor\'s Report', 'Notes to Accounts', 'Management Discussion & Analysis'].map(r =>
          `<button onclick="igToast('${r}, generating PDF report','success')" style="background:var(--parch-dk);border:1px solid var(--border);padding:.5rem 1rem;font-size:.78rem;font-weight:500;color:var(--ink);display:flex;align-items:center;gap:.4rem;cursor:pointer;"><i class="fas fa-file-pdf" style="color:#dc2626;font-size:.7rem;"></i>${r}</button>`
        ).join('')}
      </div>
    </div>`
  return c.html(layout('Finance Reports', boardShell('Finance Reports', 'finance', body), { noNav:true, noFooter:true }))
})

app.get('/board/compliance', (c) => {
  const body = `
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Annual Compliance Calendar. FY 2025-26</h3>
      </div>
      <table class="ig-tbl">
        <thead><tr><th>Due Date</th><th>Filing / Event</th><th>Form / Act</th><th>Responsible</th><th>Penalty if Missed</th><th>Status</th></tr></thead>
        <tbody>
          ${[
            { date:'15 Mar 2026', event:'Board Meeting. Q3 FY2025-26',      form:'Companies Act §173',  resp:'Board', penalty:'₹5,000-25,000',    status:'Scheduled', cls:'b-gr' },
            { date:'31 Mar 2026', event:'Annual Accounts Filing (AOC-4)',    form:'AOC-4',               resp:'CFO/CS', penalty:'₹1,000/day',      status:'Due',       cls:'b-g'  },
            { date:'30 Apr 2026', event:'Annual Return Filing',              form:'MGT-7A',              resp:'CS',     penalty:'₹200/day',        status:'Upcoming',  cls:'b-dk' },
            { date:'30 Jun 2026', event:'Income Tax Return FY2025-26',      form:'ITR-6',               resp:'CFO',    penalty:'₹5,000',          status:'Upcoming',  cls:'b-dk' },
            { date:'31 Jul 2026', event:'Filing of Financial Statements',   form:'AOC-4 XBRL',          resp:'CS',     penalty:'₹1,000/day',      status:'Upcoming',  cls:'b-dk' },
            { date:'30 Sep 2026', event:'Secretarial Audit FY2025-26',      form:'MR-3',                resp:'CS',     penalty:'₹1,00,000+',      status:'Upcoming',  cls:'b-dk' },
            { date:'30 Nov 2026', event:'MSME Payment Compliance Report',    form:'Specified Form',       resp:'CFO',    penalty:'N/A',             status:'Upcoming',  cls:'b-dk' },
            { date:'31 Dec 2026', event:'Board Meeting. Q3 FY2026-27',      form:'Companies Act §173',  resp:'Board',  penalty:'₹5,000-25,000',   status:'Upcoming',  cls:'b-dk' },
          ].map(r => `
          <tr>
            <td style="font-size:.82rem;white-space:nowrap;font-weight:500;">${r.date}</td>
            <td style="font-size:.85rem;">${r.event}</td>
            <td><span class="badge b-dk" style="font-size:.65rem;">${r.form}</span></td>
            <td style="font-size:.8rem;color:var(--ink-muted);">${r.resp}</td>
            <td style="font-size:.75rem;color:#dc2626;">${r.penalty}</td>
            <td><span class="badge ${r.cls}">${r.status}</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>`
  return c.html(layout('Compliance', boardShell('Compliance Calendar', 'compliance', body), { noNav:true, noFooter:true }))
})

// ── MISSING PORTAL ROUTES ─────────────────────────────────────────────────────

// CLIENT: Reports page
app.get('/client/reports', (c) => {
  const reports = [
    {id:'RPT-001', name:'Q4 FY2025 Mandate Progress Report',           type:'Mandate',    date:'01 Mar 2026', size:'1.2 MB', ready:true},
    {id:'RPT-002', name:'Jaipur Hospitality Hub. Feasibility Summary',type:'Feasibility', date:'15 Feb 2026', size:'4.8 MB', ready:true},
    {id:'RPT-003', name:'Market Research. Delhi NCR Commercial',       type:'Research',   date:'10 Feb 2026', size:'3.1 MB', ready:true},
    {id:'RPT-004', name:'Q3 FY2025 Invoice & GST Summary',             type:'Finance',    date:'01 Jan 2026', size:'890 KB', ready:true},
    {id:'RPT-005', name:'Competitive Landscape. HORECA Sector 2026',  type:'Research',   date:'20 Jan 2026', size:'2.4 MB', ready:true},
    {id:'RPT-006', name:'Q1 FY2026 Mandate Progress Report',           type:'Mandate',    date:'TBD',           size:'N/A',       ready:false},
  ]
  const body = `
    <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">My Reports</h3>
        <span style="font-size:.72rem;color:var(--ink-muted);">${reports.filter(r=>r.ready).length} reports available</span>
      </div>
      <div style="overflow-x:auto;">
        <table class="ig-tbl" style="width:100%;">
          <thead><tr><th>ID</th><th>Report Name</th><th>Type</th><th>Date</th><th>Size</th><th>Action</th></tr></thead>
          <tbody>
            ${reports.map(r=>`<tr>
              <td style="font-size:.68rem;color:var(--ink-muted);">${r.id}</td>
              <td style="font-size:.78rem;font-weight:500;">${r.name}</td>
              <td><span style="background:var(--parch-dk);padding:.1rem .35rem;font-size:.62rem;">${r.type}</span></td>
              <td style="font-size:.68rem;color:var(--ink-muted);">${r.date}</td>
              <td style="font-size:.68rem;color:var(--ink-muted);">${r.size}</td>
              <td>${r.ready
                ?`<button onclick="igToast('Downloading ${r.name}…','success')" style="background:var(--gold);color:#fff;border:none;padding:.25rem .625rem;font-size:.65rem;font-weight:600;cursor:pointer;"><i class="fas fa-download" style="margin-right:.25rem;font-size:.55rem;"></i>PDF</button>`
                :`<span style="font-size:.65rem;color:var(--ink-muted);">Preparing…</span>`
              }</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
    <div style="background:#fffbf0;border:1px solid #fde68a;padding:1rem 1.25rem;display:flex;align-items:center;gap:.75rem;">
      <i class="fas fa-info-circle" style="color:#d97706;flex-shrink:0;"></i>
      <span style="font-size:.78rem;color:#92400e;">Reports are prepared by the India Gully advisory team and uploaded here. Contact your relationship manager to request a custom report.</span>
    </div>`
  return c.html(layout('Reports', clientShell('Reports', 'reports', body), { noNav:true, noFooter:true }))
})

// EMPLOYEE: Documents page
app.get('/employee/documents', (c) => {
  const docs = [
    {name:'Offer Letter. IG-EMP-0001.pdf',       cat:'Onboarding',  date:'15 Jan 2025', size:'244 KB'},
    {name:'Employment Agreement v2.pdf',           cat:'Legal',       date:'15 Jan 2025', size:'1.1 MB'},
    {name:'Form 16, FY2024-25.pdf',               cat:'Tax',         date:'15 Jun 2025', size:'542 KB'},
    {name:'Payslip. February 2026.pdf',           cat:'Payroll',     date:'28 Feb 2026', size:'188 KB'},
    {name:'Payslip. January 2026.pdf',            cat:'Payroll',     date:'31 Jan 2026', size:'186 KB'},
    {name:'Leave Policy FY2026.pdf',               cat:'Policy',      date:'01 Jan 2026', size:'320 KB'},
    {name:'Employee Handbook v3.0.pdf',            cat:'Policy',      date:'01 Jan 2026', size:'2.1 MB'},
    {name:'Performance Review. Q3 FY26.pdf',      cat:'Performance', date:'15 Feb 2026', size:'445 KB'},
  ]
  const catColors: Record<string,string> = {Onboarding:'#16a34a',Legal:'#7c3aed',Tax:'#d97706',Payroll:'#2563eb',Policy:'#0891b2',Performance:'#db2777'}
  const body = `
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">My Documents</h3>
        <span style="font-size:.72rem;color:var(--ink-muted);">${docs.length} files</span>
      </div>
      <div style="overflow-x:auto;">
        <table class="ig-tbl" style="width:100%;">
          <thead><tr><th>Document</th><th>Category</th><th>Date</th><th>Size</th><th>Download</th></tr></thead>
          <tbody>
            ${docs.map(d=>`<tr>
              <td style="font-size:.78rem;"><i class="fas fa-file-pdf" style="color:#dc2626;margin-right:.35rem;font-size:.65rem;"></i>${d.name}</td>
              <td><span style="background:${catColors[d.cat]||'#6b7280'}1a;color:${catColors[d.cat]||'#6b7280'};padding:.1rem .35rem;font-size:.62rem;font-weight:600;">${d.cat}</span></td>
              <td style="font-size:.68rem;color:var(--ink-muted);">${d.date}</td>
              <td style="font-size:.68rem;color:var(--ink-muted);">${d.size}</td>
              <td><button onclick="igToast('Downloading ${d.name}…','success')" style="background:var(--gold);color:#fff;border:none;padding:.25rem .625rem;font-size:.65rem;cursor:pointer;"><i class="fas fa-download" style="font-size:.55rem;"></i></button></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`
  return c.html(layout('My Documents', empShell('My Documents', 'documents', body), { noNav:true, noFooter:true }))
})

// BOARD: Governance page (alias for compliance-related governance docs)
app.get('/board/governance', (c) => {
  const items = [
    {id:'GOV-001', doc:'Memorandum of Association (MOA)',               version:'Current', filed:'2017', status:'Active'},
    {id:'GOV-002', doc:'Articles of Association (AOA)',                  version:'v2.0',    filed:'2022', status:'Active'},
    {id:'GOV-003', doc:'Board Resolution Register (MGT-1)',              version:'FY26',    filed:'2026', status:'Current'},
    {id:'GOV-004', doc:'Annual Return FY2024-25 (MGT-7)',               version:'Filed',   filed:'Sep 2025', status:'Filed'},
    {id:'GOV-005', doc:'Director KYC & DIN Register',                   version:'2026',    filed:'Jan 2026', status:'Valid'},
    {id:'GOV-006', doc:'Secretarial Audit Report (MR-3) FY2024-25',    version:'Final',   filed:'Oct 2025', status:'Filed'},
    {id:'GOV-007', doc:'Code of Conduct & Ethics Policy',               version:'v2.0',    filed:'Jan 2025', status:'Active'},
    {id:'GOV-008', doc:'Related Party Transaction Policy',              version:'v1.2',    filed:'Mar 2024', status:'Active'},
  ]
  const body = `
    <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Corporate Governance Documents</h3>
        <button onclick="igToast('Governance register exported to PDF','success')" style="background:none;border:1px solid var(--border);padding:.3rem .75rem;font-size:.68rem;cursor:pointer;color:var(--gold);"><i class="fas fa-download" style="margin-right:.3rem;"></i>Export</button>
      </div>
      <div style="overflow-x:auto;">
        <table class="ig-tbl" style="width:100%;">
          <thead><tr><th>ID</th><th>Document</th><th>Version</th><th>Filed / Updated</th><th>Status</th><th>Download</th></tr></thead>
          <tbody>
            ${items.map(d=>`<tr>
              <td style="font-size:.65rem;color:var(--ink-muted);">${d.id}</td>
              <td style="font-size:.78rem;font-weight:500;">${d.doc}</td>
              <td style="font-size:.68rem;">${d.version}</td>
              <td style="font-size:.68rem;color:var(--ink-muted);">${d.filed}</td>
              <td><span style="font-size:.62rem;background:${d.status==='Active'||d.status==='Valid'||d.status==='Current'?'#dcfce7':'#dbeafe'};color:${d.status==='Active'||d.status==='Valid'||d.status==='Current'?'#166534':'#1e40af'};padding:.15rem .4rem;font-weight:600;">${d.status}</span></td>
              <td><button onclick="igToast('Downloading ${d.doc}…','success')" style="background:var(--gold);color:#fff;border:none;padding:.25rem .625rem;font-size:.65rem;cursor:pointer;"><i class="fas fa-download" style="font-size:.55rem;"></i></button></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`
  return c.html(layout('Governance', boardShell('Governance Documents', 'governance', body), { noNav:true, noFooter:true }))
})

// BOARD: Financials page
app.get('/board/financials', (c) => {
  const body = `
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:1.5rem;">
      ${[
        {label:'FY2025-26 Revenue (YTD)', value:'₹2.4 Cr',  sub:'Apr 2025, Feb 2026', color:'#16a34a'},
        {label:'EBITDA Margin',           value:'38.2%',     sub:'FY26 target: 35%',    color:'#2563eb'},
        {label:'Mandate Pipeline',        value:'₹8,815 Cr', sub:'6 active mandates',   color:'#d97706'},
      ].map(s=>`<div class="am">
        <div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.5rem;">${s.label}</div>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2rem;color:${s.color};">${s.value}</div>
        <div style="font-size:.68rem;color:var(--ink-muted);">${s.sub}</div>
      </div>`).join('')}
    </div>
    <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">P&amp;L Summary. FY2025-26</h3>
        <button onclick="igToast('Financial report PDF generated','success')" style="background:none;border:1px solid var(--border);padding:.3rem .75rem;font-size:.68rem;cursor:pointer;color:var(--gold);"><i class="fas fa-download" style="margin-right:.3rem;"></i>Download PDF</button>
      </div>
      <div style="overflow-x:auto;">
        <table class="ig-tbl" style="width:100%;">
          <thead><tr><th>Line Item</th><th>Q1 FY26</th><th>Q2 FY26</th><th>Q3 FY26</th><th>FY25 Full Year</th></tr></thead>
          <tbody>
            ${[
              {item:'Revenue',             q1:'₹58L',  q2:'₹67L',  q3:'₹82L',  fy:'₹1.8 Cr'},
              {item:'Retainer Fees',        q1:'₹24L',  q2:'₹28L',  q3:'₹34L',  fy:'₹74L'},
              {item:'Transaction Fees',     q1:'₹34L',  q2:'₹39L',  q3:'₹48L',  fy:'₹1.06 Cr'},
              {item:'Operating Expenses',   q1:'₹32L',  q2:'₹38L',  q3:'₹47L',  fy:'₹1.02 Cr'},
              {item:'Staff Costs',          q1:'₹14L',  q2:'₹16L',  q3:'₹20L',  fy:'₹42L'},
              {item:'EBITDA',               q1:'₹26L',  q2:'₹29L',  q3:'₹35L',  fy:'₹78L'},
              {item:'EBITDA Margin',        q1:'44.8%', q2:'43.3%', q3:'42.7%', fy:'43.3%'},
            ].map(r=>`<tr>
              <td style="font-size:.78rem;font-weight:500;">${r.item}</td>
              <td style="font-size:.75rem;">${r.q1}</td>
              <td style="font-size:.75rem;">${r.q2}</td>
              <td style="font-size:.75rem;">${r.q3}</td>
              <td style="font-size:.75rem;font-weight:600;color:#16a34a;">${r.fy}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`
  return c.html(layout('Financials', boardShell('Financial Reports', 'financials', body), { noNav:true, noFooter:true }))
})

// BOARD: Reports page
app.get('/board/reports', (c) => {
  const reports = [
    {name:'Board Pack. Q3 FY2025-26',              date:'01 Mar 2026', type:'Board Pack',    ready:true},
    {name:'Management Report. February 2026',       date:'28 Feb 2026', type:'Management',    ready:true},
    {name:'DPDP Compliance Report. FY2025-26',     date:'28 Feb 2026', type:'Compliance',    ready:true},
    {name:'Secretarial Audit Report FY2024-25',     date:'15 Oct 2025', type:'Audit',         ready:true},
    {name:'Annual Report FY2024-25 (Draft)',         date:'28 Feb 2026', type:'Annual Report', ready:true},
    {name:'Risk Dashboard. Q3 FY26',               date:'01 Mar 2026', type:'Risk',          ready:true},
    {name:'Board Pack. Q4 FY2025-26',              date:'TBD',           type:'Board Pack',    ready:false},
    {name:'Statutory Audit FY2025-26',              date:'TBD',           type:'Audit',         ready:false},
  ]
  const typeColors: Record<string,string> = {'Board Pack':'#1e40af',Management:'#16a34a',Compliance:'#7c3aed',Audit:'#d97706','Annual Report':'#db2777',Risk:'#dc2626'}
  const body = `
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Board Reports</h3>
        <span style="font-size:.72rem;color:var(--ink-muted);">${reports.filter(r=>r.ready).length} available • ${reports.filter(r=>!r.ready).length} in preparation</span>
      </div>
      <div style="overflow-x:auto;">
        <table class="ig-tbl" style="width:100%;">
          <thead><tr><th>Report</th><th>Type</th><th>Date</th><th>Action</th></tr></thead>
          <tbody>
            ${reports.map(r=>`<tr>
              <td style="font-size:.78rem;font-weight:500;"><i class="fas fa-file-pdf" style="color:#dc2626;margin-right:.35rem;font-size:.65rem;"></i>${r.name}</td>
              <td><span style="background:${typeColors[r.type]||'#6b7280'}1a;color:${typeColors[r.type]||'#6b7280'};padding:.1rem .35rem;font-size:.62rem;font-weight:600;">${r.type}</span></td>
              <td style="font-size:.68rem;color:var(--ink-muted);">${r.date}</td>
              <td>${r.ready
                ?`<button onclick="igToast('Downloading ${r.name}…','success')" style="background:var(--gold);color:#fff;border:none;padding:.25rem .625rem;font-size:.65rem;font-weight:600;cursor:pointer;"><i class="fas fa-download" style="margin-right:.25rem;font-size:.55rem;"></i>PDF</button>`
                :`<span style="font-size:.65rem;color:var(--ink-muted);">Preparing…</span>`
              }</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>`
  return c.html(layout('Reports', boardShell('Reports', 'reports', body), { noNav:true, noFooter:true }))
})

export default app
