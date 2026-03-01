import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

// ── SESSION GUARD ─────────────────────────────────────────────────────────────
// All admin sub-routes (except GET /) require a valid ig_session cookie.
// The /api/auth/session endpoint validates the cookie server-side; here we do
// a lightweight client-side check: if the cookie is absent, redirect to login.
// Full server-side ABAC enforcement is done in api.tsx requireSession/requireRole.
app.use('/*', async (c, next) => {
  // Allow the login page (GET /) to pass through always
  const path = new URL(c.req.url).pathname.replace(/^\/admin/, '') || '/'
  if (path === '/' || path === '') return next()
  // Check for session cookie — Cloudflare Workers can read request cookies
  const cookie = c.req.header('Cookie') || ''
  const hasSession = /ig_session=[^;]+/.test(cookie)
  if (!hasSession) {
    return c.redirect('/admin?error=Session+expired.+Please+log+in.', 302)
  }
  return next()
})

// ── SHARED SHELL ──────────────────────────────────────────────────────────────
function adminShell(pageTitle: string, active: string, body: string) {
  const S = [
    { id:'dashboard',    icon:'tachometer-alt',  label:'Dashboard',      g:'Main',     badge:'' },
    { id:'cms',          icon:'globe',           label:'CMS',            g:'Main',     badge:'' },
    { id:'users',        icon:'users',           label:'Users',          g:'Main',     badge:'' },
    { id:'workflows',    icon:'sitemap',         label:'Workflows',      g:'Main',     badge:'' },
    { id:'finance',      icon:'chart-bar',       label:'Finance ERP',    g:'ERP',      badge:'2' },
    { id:'hr',           icon:'user-friends',    label:'HR ERP',         g:'ERP',      badge:'1' },
    { id:'governance',   icon:'gavel',           label:'Governance',     g:'ERP',      badge:'' },
    { id:'horeca',       icon:'boxes',           label:'HORECA',         g:'ERP',      badge:'' },
    { id:'contracts',    icon:'file-signature',  label:'Contracts',      g:'ERP',      badge:'' },
    { id:'sales',        icon:'funnel-dollar',   label:'Sales Force',    g:'ERP',      badge:'5' },
    { id:'integrations', icon:'plug',            label:'Integrations',   g:'Platform', badge:'' },
    { id:'reports',      icon:'chart-pie',       label:'BI & Reports',   g:'Platform', badge:'' },
    { id:'kpi',          icon:'bullseye',        label:'KPI & OKRs',     g:'Platform', badge:'' },
    { id:'risk',         icon:'exclamation-triangle', label:'Risk Dashboard', g:'Platform', badge:'2' },
    { id:'api-docs',     icon:'code',            label:'API Docs',       g:'Platform', badge:'' },
    { id:'config',       icon:'cog',             label:'System Config',  g:'Platform', badge:'' },
    { id:'security',     icon:'shield-alt',      label:'Security Audit', g:'Platform', badge:'!' },
  ]
  const adminAlerts = [
    {msg:'INV-2025-002 overdue — ₹1.8L from Demo Client',type:'danger',time:'2h ago'},
    {msg:'New leave request from Amit Jhingan — Casual Leave',type:'warn',time:'3h ago'},
    {msg:'GSTR-1 due on 11 Mar 2025 — 13 days remaining',type:'warn',time:'1d ago'},
    {msg:'EY Retainer contract expiring in 30 days',type:'danger',time:'2d ago'},
    {msg:'Failed login attempt from 185.x.x.x (3 attempts)',type:'danger',time:'3d ago'},
  ]
  const nav = ['Main','ERP','Platform'].map(g =>
    `<div class="sb-sec">${g}</div>` +
    S.filter(s => s.g === g).map(s =>
      `<a href="/admin/${s.id==='dashboard'?'dashboard':s.id==='sales'?'sales/dashboard':s.id}" class="sb-lk ${active===s.id?'on':''}">
        <i class="fas fa-${s.icon}" style="width:16px;font-size:.72rem;text-align:center;"></i>${s.label}
        ${s.badge ? `<span class="${s.badge==='!'?'sb-dot':'sb-badge'}">${s.badge==='!'?'':s.badge}</span>` : ''}
      </a>`
    ).join('')
  ).join('')
  return `
<div style="display:flex;height:100vh;overflow:hidden;background:#f7f7f7;">
  <aside style="width:220px;flex-shrink:0;background:#0A0A0A;display:flex;flex-direction:column;overflow-y:auto;">
    <a href="/admin/dashboard" style="padding:1rem 1.25rem;border-bottom:1px solid rgba(255,255,255,.07);display:block;flex-shrink:0;">
      <!-- LOGO: official white-text lockup — read-only, no crop, no AI, lossless -->
      <img src="/assets/logo-white.png"
           alt="India Gully"
           height="28"
           style="height:28px;width:auto;max-width:180px;object-fit:contain;object-position:left center;display:block;"
           draggable="false"
           decoding="async">
      <div style="font-size:.5rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-top:4px;">Super Admin</div>
    </a>
    <nav style="flex:1;padding:.5rem;">${nav}</nav>
    <div style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07);flex-shrink:0;">
      <a href="/admin" class="sb-lk" style="color:#ef4444;"><i class="fas fa-sign-out-alt" style="width:16px;font-size:.72rem;text-align:center;"></i>Sign Out</a>
    </div>
  </aside>
  <main style="flex:1;overflow-y:auto;display:flex;flex-direction:column;">
    <div style="background:#fff;border-bottom:1px solid var(--border);padding:.875rem 1.75rem;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
      <div>
        <div style="font-size:.62rem;color:var(--ink-muted);letter-spacing:.08em;text-transform:uppercase;margin-bottom:.15rem;">
          <a href="/admin/dashboard" style="color:var(--ink-muted);text-decoration:none;">Admin</a>
          <i class="fas fa-chevron-right" style="font-size:.5rem;margin:0 .35rem;"></i>
          <span style="color:var(--ink);">${pageTitle}</span>
        </div>
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--ink);">${pageTitle}</h2>
      </div>
      <div style="display:flex;align-items:center;gap:.875rem;">
        <!-- Admin Notification Bell -->
        <div style="position:relative;">
          <button id="adm-notif-btn" onclick="toggleAdmNotif()" style="background:none;border:1px solid var(--border);width:34px;height:34px;display:flex;align-items:center;justify-content:center;cursor:pointer;position:relative;">
            <i class="fas fa-bell" style="font-size:.72rem;color:var(--ink-muted);"></i>
            <span style="position:absolute;top:-4px;right:-4px;width:16px;height:16px;background:#dc2626;border-radius:50%;border:2px solid #fff;display:flex;align-items:center;justify-content:center;font-size:.5rem;color:#fff;font-weight:700;">5</span>
          </button>
          <div id="adm-notif-panel" style="display:none;position:absolute;right:0;top:calc(100% + 8px);width:340px;background:#fff;border:1px solid var(--border);box-shadow:0 12px 40px rgba(0,0,0,.15);z-index:9999;">
            <div style="padding:.75rem 1rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:.72rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink);">Admin Alerts</span>
              <button onclick="igToast('All alerts cleared','success')" style="font-size:.65rem;color:var(--gold);background:none;border:none;cursor:pointer;">Clear All</button>
            </div>
            ${adminAlerts.map(n=>`<div style="padding:.75rem 1rem;border-bottom:1px solid var(--border);display:flex;gap:.625rem;">
              <i class="fas fa-${n.type==='danger'?'exclamation-circle':'exclamation-triangle'}" style="color:${n.type==='danger'?'#dc2626':'#d97706'};font-size:.72rem;margin-top:.1rem;flex-shrink:0;"></i>
              <div><div style="font-size:.75rem;color:var(--ink);line-height:1.4;">${n.msg}</div><div style="font-size:.62rem;color:var(--ink-muted);margin-top:.15rem;">${n.time}</div></div>
            </div>`).join('')}
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:.5rem;">
          <span style="font-size:.68rem;color:var(--ink-muted);">superadmin</span>
          <div style="width:32px;height:32px;background:#6B1A1A;display:flex;align-items:center;justify-content:center;cursor:pointer;" title="Super Admin" onclick="igToast('superadmin@indiagully.com · Super Admin','info')">
            <i class="fas fa-shield-alt" style="color:var(--gold);font-size:.72rem;"></i>
          </div>
        </div>
      </div>
    </div>
    <div style="flex:1;padding:1.75rem;overflow-y:auto;">${body}</div>
  </main>
</div>
<script>
function toggleAdmNotif(){var p=document.getElementById('adm-notif-panel');p.style.display=p.style.display==='none'?'block':'none';}
document.addEventListener('click',function(e){var btn=document.getElementById('adm-notif-btn');var panel=document.getElementById('adm-notif-panel');if(panel&&!panel.contains(e.target)&&btn&&!btn.contains(e.target))panel.style.display='none';});

/* ── ADMIN API CLIENT ── all fetch helpers for real backend wiring ── */
window.igApi = {
  get: function(path){
    return fetch('/api'+path,{credentials:'include'}).then(function(r){
      if(r.status===401){window.location.href='/admin?error=Session+expired';return null;}
      return r.json();
    });
  },
  post: function(path,data){
    return fetch('/api'+path,{method:'POST',credentials:'include',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)}).then(function(r){
      if(r.status===401){window.location.href='/admin?error=Session+expired';return null;}
      return r.json();
    });
  }
};

/* ── SIGN OUT ── wire logout link to POST /api/auth/logout ── */
document.addEventListener('DOMContentLoaded', function(){
  var signOutLinks = document.querySelectorAll('a[href="/admin"]');
  signOutLinks.forEach(function(link){
    var text = link.textContent || link.innerText || '';
    if(text.toLowerCase().includes('sign out')){
      link.addEventListener('click',function(e){
        e.preventDefault();
        fetch('/api/auth/logout',{method:'POST',credentials:'include'}).finally(function(){
          window.location.href='/admin';
        });
      });
    }
  });
});
</script>`
}

// ── LOGIN ─────────────────────────────────────────────────────────────────────
app.get('/', (c) => {
  const error = c.req.query('error') || ''
  const eb = error ? `<div style="background:#fef2f2;border-bottom:1px solid #fecaca;padding:.875rem 1.5rem;display:flex;gap:.6rem;"><i class="fas fa-exclamation-circle" style="color:#dc2626;font-size:.75rem;margin-top:.15rem;"></i><p style="font-size:.78rem;color:#991b1b;">${error}</p></div>` : ''
  const content = `
<div style="min-height:100vh;background:linear-gradient(135deg,#050505 0%,#100808 50%,#050505 100%);display:flex;align-items:center;justify-content:center;padding:2rem;">
  <div style="position:relative;width:100%;max-width:400px;">
    <div style="background:#fff;overflow:hidden;box-shadow:0 40px 100px rgba(0,0,0,.8);">
      <div style="background:linear-gradient(135deg,#180808,#2D0808);padding:2.25rem;text-align:center;">
        <div style="width:56px;height:56px;background:rgba(184,150,12,.15);border:1.5px solid rgba(184,150,12,.3);display:flex;align-items:center;justify-content:center;margin:0 auto .875rem;"><i class="fas fa-shield-alt" style="color:var(--gold);font-size:1.35rem;"></i></div>
        <h1 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:#fff;margin-bottom:.25rem;">Super Admin Console</h1>
        <p style="font-size:.62rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.35);">India Gully Enterprise Platform</p>
        <div style="margin-top:.875rem;display:inline-flex;align-items:center;gap:.4rem;background:rgba(220,38,38,.15);border:1px solid rgba(220,38,38,.3);padding:.3rem .75rem;"><i class="fas fa-exclamation-triangle" style="color:#ef4444;font-size:.6rem;"></i><span style="font-size:.62rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#ef4444;">Restricted Access</span></div>
      </div>
      <div style="background:#f0f9ff;border-bottom:1px solid #bae6fd;padding:.875rem 1.5rem;display:flex;gap:.6rem;">
        <i class="fas fa-shield-alt" style="color:#0369a1;font-size:.75rem;margin-top:.15rem;flex-shrink:0;"></i>
        <div><p style="font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#0c4a6e;margin-bottom:.3rem;">2FA Auto-Fill Enabled</p>
        <p style="font-size:.75rem;color:#0369a1;line-height:1.7;">The 6-digit TOTP code is <strong>automatically filled and refreshed every 30 seconds</strong>. Just enter your username and password and click Authenticate — no authenticator app needed on this device.</p></div>
      </div>
      ${eb}
      <div style="padding:2rem;">
        <div id="lockout-banner-admin" style="display:none;background:#fef2f2;border:1px solid #fecaca;padding:.7rem 1rem;margin-bottom:1rem;font-size:.78rem;color:#991b1b;"><i class="fas fa-ban" style="margin-right:.4rem;"></i>Too many failed attempts — account locked for <span id="lockout-timer-admin">300</span>s.</div>
        <form id="admin-login-form" method="POST" action="/api/auth/admin" style="display:flex;flex-direction:column;gap:1.1rem;">
          <input type="hidden" name="csrf" id="csrf-admin" value="">
          <div><label class="ig-label">Admin Username</label><input type="text" name="username" class="ig-input" required placeholder="admin@indiagully.com" autocomplete="off"></div>
          <div><label class="ig-label">Admin Password</label><input type="password" name="password" class="ig-input" required placeholder="••••••••••••••••"></div>
          <div><label class="ig-label" style="display:flex;align-items:center;gap:.5rem;">2FA Authentication Code <span id="otp-countdown-admin" style="font-size:.62rem;color:#d97706;font-weight:400;"></span></label><input type="text" name="totp" id="otp-input-admin" class="ig-input" required placeholder="6-digit TOTP" maxlength="6" autocomplete="one-time-code" inputmode="numeric"></div>
          <button type="submit" id="login-btn-admin" style="width:100%;padding:.875rem;background:#6B1A1A;color:#fff;font-size:.78rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:none;cursor:pointer;"><i class="fas fa-shield-alt" style="margin-right:.5rem;"></i>Authenticate & Enter</button>
        </form>
        <p style="text-align:center;font-size:.68rem;color:#ef4444;margin-top:1rem;">Unauthorised access is a criminal offence under IT Act 2000.</p>
      </div>
<script>
(function(){
  /* ── CSRF ── */
  var csrf=Array.from(crypto.getRandomValues(new Uint8Array(16))).map(b=>b.toString(16).padStart(2,'0')).join('');
  var ce=document.getElementById('csrf-admin'); if(ce) ce.value=csrf;
  sessionStorage.setItem('ig_csrf_admin',csrf);

  /* ── Live TOTP auto-fill ──────────────────────────────────────────────────
     Computes RFC 6238 TOTP from the admin TOTP secret client-side and
     auto-fills the input. Refreshes automatically on each new 30-second window.
     The secret here is the same one registered in the authenticator app.
  ── */
  var TOTP_SECRET = 'JBSWY3DPEHPK3PXP';
  /* Base32 decode — required for RFC 6238 TOTP; TextEncoder is WRONG here */
  function b32decode(s){
    var alpha='ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';
    var bits='';
    for(var i=0;i<s.length;i++){var idx=alpha.indexOf(s[i].toUpperCase());if(idx>=0)bits+=idx.toString(2).padStart(5,'0');}
    var bytes=new Uint8Array(Math.floor(bits.length/8));
    for(var j=0;j<bytes.length;j++)bytes[j]=parseInt(bits.slice(j*8,j*8+8),2);
    return bytes.buffer;
  }
  async function computeHOTP(secret, counter){
    var keyData = b32decode(secret);
    var key = await crypto.subtle.importKey('raw', keyData, {name:'HMAC',hash:'SHA-1'}, false, ['sign']);
    var msg = new ArrayBuffer(8);
    var view = new DataView(msg);
    view.setUint32(0, Math.floor(counter/0x100000000), false);
    view.setUint32(4, counter>>>0, false);
    var sig = await crypto.subtle.sign('HMAC', key, msg);
    var bytes = new Uint8Array(sig);
    var offset = bytes[19] & 0x0f;
    var code = ((bytes[offset]&0x7f)<<24 | bytes[offset+1]<<16 | bytes[offset+2]<<8 | bytes[offset+3]) % 1000000;
    return code.toString().padStart(6,'0');
  }
  async function igFillTOTP(){
    var counter = Math.floor(Date.now()/30000);
    var code = await computeHOTP(TOTP_SECRET, counter);
    var inp = document.getElementById('otp-input-admin');
    if(inp && !inp.matches(':focus')) inp.value = code;
    /* Update countdown */
    var rem = 30 - Math.floor((Date.now()/1000) % 30);
    var cd = document.getElementById('otp-countdown-admin');
    if(cd) cd.textContent = '(auto-filled · ' + rem + 's remaining)';
  }
  igFillTOTP();
  /* Re-fill on each new 30s window */
  setInterval(igFillTOTP, 1000);

  /* ── Rate limiting ── */
  var attKey='ig_attempts_admin';var lockKey='ig_lock_admin';
  function igCheckLock(){var lock=parseInt(localStorage.getItem(lockKey)||'0');if(lock>Date.now()){var btn=document.getElementById('login-btn-admin');if(btn)btn.disabled=true;var banner=document.getElementById('lockout-banner-admin');if(banner)banner.style.display='block';var tEl=document.getElementById('lockout-timer-admin');var iv=setInterval(function(){var rem=Math.ceil((parseInt(localStorage.getItem(lockKey)||'0')-Date.now())/1000);if(rem<=0){clearInterval(iv);localStorage.removeItem(lockKey);localStorage.setItem(attKey,'0');location.reload();}else if(tEl)tEl.textContent=String(rem);},1000);return true;}return false;}
  igCheckLock();
  var form=document.getElementById('admin-login-form');
  if(form)form.addEventListener('submit',function(e){var lock=parseInt(localStorage.getItem(lockKey)||'0');if(lock>Date.now()){e.preventDefault();return;}var att=parseInt(localStorage.getItem(attKey)||'0')+1;localStorage.setItem(attKey,String(att));if(att>=5){localStorage.setItem(lockKey,String(Date.now()+300000));localStorage.setItem(attKey,'0');e.preventDefault();igCheckLock();}});
  /* ── Session timeout ── */
  function igResetTimer(){localStorage.setItem('ig_lastact_admin',String(Date.now()));}
  ['click','keydown','mousemove','touchstart'].forEach(function(ev){document.addEventListener(ev,igResetTimer,{passive:true});});
  igResetTimer();
  setInterval(function(){var last=parseInt(localStorage.getItem('ig_lastact_admin')||String(Date.now()));if(Date.now()-last>30*60*1000){localStorage.setItem('ig_lastact_admin',String(Date.now()));location.href='/admin?timeout=1';}},60000);
})();
</script>
    </div>
    <div style="text-align:center;margin-top:1.5rem;"><a href="/portal" style="font-size:.78rem;color:rgba(255,255,255,.3);"><i class="fas fa-arrow-left" style="font-size:.6rem;"></i> Back to Portal Selection</a></div>
  </div>
</div>`
  return c.html(layout('Super Admin', content, { noNav:true, noFooter:true }))
})

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
app.get('/dashboard', (c) => {
  const body = `
  <!-- Alert Banner -->
  <div style="background:#fffbeb;border:1px solid #fde68a;padding:.75rem 1.25rem;margin-bottom:1.5rem;display:flex;align-items:center;gap:.75rem;">
    <i class="fas fa-exclamation-triangle" style="color:#d97706;font-size:.85rem;flex-shrink:0;"></i>
    <div style="flex:1;">
      <span style="font-size:.82rem;font-weight:600;color:#92400e;">3 items require your attention: </span>
      <span style="font-size:.82rem;color:#78350f;">1 overdue invoice (INV-2025-002 · ₹1.8L) · Annual Accounts Filing due 31 Mar 2025 · EY Advisory Retainer expiring in 2 days</span>
    </div>
    <button onclick="this.parentElement.style.display='none'" style="background:none;border:none;cursor:pointer;color:#92400e;font-size:.85rem;flex-shrink:0;"><i class="fas fa-times"></i></button>
  </div>

  <!-- Quick Actions -->
  <div style="display:flex;gap:.75rem;margin-bottom:1.75rem;flex-wrap:wrap;">
    <a href="/admin/finance" style="display:inline-flex;align-items:center;gap:.4rem;background:var(--gold);color:#fff;padding:.55rem 1.1rem;font-size:.75rem;font-weight:600;letter-spacing:.07em;text-transform:uppercase;text-decoration:none;"><i class="fas fa-plus" style="font-size:.65rem;"></i>Create Invoice</a>
    <a href="/admin/hr" style="display:inline-flex;align-items:center;gap:.4rem;background:#1A3A6B;color:#fff;padding:.55rem 1.1rem;font-size:.75rem;font-weight:600;letter-spacing:.07em;text-transform:uppercase;text-decoration:none;"><i class="fas fa-user-plus" style="font-size:.65rem;"></i>Add Employee</a>
    <a href="/admin/governance" style="display:inline-flex;align-items:center;gap:.4rem;background:#1E1E1E;color:#fff;padding:.55rem 1.1rem;font-size:.75rem;font-weight:600;letter-spacing:.07em;text-transform:uppercase;text-decoration:none;"><i class="fas fa-calendar-plus" style="font-size:.65rem;"></i>Schedule Meeting</a>
    <a href="/admin/contracts" style="display:inline-flex;align-items:center;gap:.4rem;background:#4f46e5;color:#fff;padding:.55rem 1.1rem;font-size:.75rem;font-weight:600;letter-spacing:.07em;text-transform:uppercase;text-decoration:none;"><i class="fas fa-file-signature" style="font-size:.65rem;"></i>New Contract</a>
    <a href="/admin/reports" style="display:inline-flex;align-items:center;gap:.4rem;border:1px solid var(--border);color:var(--ink-soft);padding:.55rem 1.1rem;font-size:.75rem;font-weight:600;letter-spacing:.07em;text-transform:uppercase;text-decoration:none;background:#fff;"><i class="fas fa-chart-pie" style="font-size:.65rem;color:var(--gold);"></i>Generate Report</a>
  </div>

  <!-- KPI Row -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">
    ${[
      {label:'Revenue MTD',  value:'₹12.4L', trend:'↑ +8.3% vs last month', icon:'chart-line', c:'#16a34a', href:'/admin/finance'},
      {label:'Receivables',  value:'₹34.8L', trend:'3 invoices outstanding', icon:'receipt',    c:'#d97706', href:'/admin/finance'},
      {label:'GST Payable',  value:'₹2.1L',  trend:'Due 20 Mar · CGST+SGST', icon:'percent',   c:'#dc2626', href:'/admin/finance'},
      {label:'Bank Balance', value:'₹56.2L', trend:'Across 3 accounts',       icon:'university', c:'#2563eb', href:'/admin/finance'},
    ].map(s=>`<a href="${s.href}" style="text-decoration:none;"><div class="am" style="cursor:pointer;transition:box-shadow .2s;" onmouseover="this.style.boxShadow='0 4px 16px rgba(0,0,0,.08)'" onmouseout="this.style.boxShadow='none'"><div style="display:flex;justify-content:space-between;margin-bottom:.625rem;"><span style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);">${s.label}</span><i class="fas fa-${s.icon}" style="color:${s.c};font-size:.7rem;"></i></div><div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:var(--ink);line-height:1;margin-bottom:.3rem;">${s.value}</div><div style="font-size:.7rem;color:${s.c};">${s.trend}</div></div></a>`).join('')}
  </div>

  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.75rem;">
    ${[
      {label:'Total Headcount',    value:'3',   trend:'All active employees', icon:'users',        href:'/admin/hr'},
      {label:"Today's Attendance", value:'3/3', trend:'100% present today',   icon:'check-circle', href:'/admin/hr'},
      {label:'Active Contracts',   value:'6',   trend:'1 expiring soon',      icon:'file-signature',href:'/admin/contracts'},
      {label:'Open Mandates',      value:'3',   trend:'₹6,645 Cr pipeline',   icon:'briefcase',    href:'/portal/client/mandates'},
    ].map(s=>`<a href="${s.href}" style="text-decoration:none;"><div class="am" style="cursor:pointer;transition:box-shadow .2s;" onmouseover="this.style.boxShadow='0 4px 16px rgba(0,0,0,.08)'" onmouseout="this.style.boxShadow='none'"><div style="display:flex;justify-content:space-between;margin-bottom:.625rem;"><span style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);">${s.label}</span><i class="fas fa-${s.icon}" style="color:var(--ink-faint);font-size:.7rem;"></i></div><div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:var(--ink);line-height:1;margin-bottom:.3rem;">${s.value}</div><div style="font-size:.7rem;color:var(--ink-muted);">${s.trend}</div></div></a>`).join('')}
  </div>

  <!-- Main Grid: Modules + Activity -->
  <div style="display:grid;grid-template-columns:2fr 1fr;gap:1.5rem;margin-bottom:1.5rem;">
    <div>
      <h3 style="font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:1rem;">Platform Modules</h3>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:.875rem;">
        ${[
          {id:'cms',        icon:'globe',          label:'CMS',           desc:'Pages, SEO, banners',   color:'#B8960C', badge:''},
          {id:'users',      icon:'users',          label:'Users',         desc:'Roles & permissions',   color:'#2563eb', badge:'8'},
          {id:'finance',    icon:'chart-bar',      label:'Finance ERP',   desc:'Invoices, GST, P&L',    color:'#16a34a', badge:'1'},
          {id:'hr',         icon:'user-friends',   label:'HR ERP',        desc:'Payroll, leave, TDS',   color:'#d97706', badge:''},
          {id:'governance', icon:'gavel',          label:'Governance',    desc:'Board, resolutions',    color:'#dc2626', badge:'2'},
          {id:'horeca',     icon:'boxes',          label:'HORECA',        desc:'SKUs, quotes, orders',  color:'#0d9488', badge:'3'},
          {id:'contracts',  icon:'file-signature', label:'Contracts',     desc:'Templates, e-sign',     color:'#4f46e5', badge:'1'},
          {id:'security',   icon:'shield-alt',     label:'Security',      desc:'Logs, RBAC, whitelist', color:'#9f1239', badge:'3'},
        ].map(m=>`<a href="/admin/${m.id}" style="background:#fff;border:1px solid var(--border);padding:1.1rem;display:block;text-decoration:none;transition:border-color .2s,box-shadow .2s;position:relative;" onmouseover="this.style.borderColor='${m.color}';this.style.boxShadow='0 4px 16px rgba(0,0,0,.07)'" onmouseout="this.style.borderColor='var(--border)';this.style.boxShadow='none'">${m.badge?`<span style="position:absolute;top:.6rem;right:.6rem;background:${m.color};color:#fff;font-size:.55rem;font-weight:700;width:16px;height:16px;border-radius:50%;display:flex;align-items:center;justify-content:center;">${m.badge}</span>`:''}<div style="width:32px;height:32px;background:${m.color};display:flex;align-items:center;justify-content:center;margin-bottom:.75rem;"><i class="fas fa-${m.icon}" style="color:#fff;font-size:.7rem;"></i></div><div style="font-size:.82rem;font-weight:600;color:var(--ink);margin-bottom:.2rem;">${m.label}</div><div style="font-size:.68rem;color:var(--ink-muted);line-height:1.4;">${m.desc}</div></a>`).join('')}
      </div>
    </div>

    <!-- Activity Feed -->
    <div>
      <h3 style="font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:1rem;">Live Activity Feed</h3>
      <div style="background:#fff;border:1px solid var(--border);">
        ${[
          {time:'09:15 AM', user:'superadmin', action:'Logged in to Admin Console',              mod:'Auth',    ok:true},
          {time:'09:12 AM', user:'akm',        action:'Approved INV-2025-001 (₹2.5L)',           mod:'Finance', ok:true},
          {time:'08:55 AM', user:'pavan',      action:'Edited Home Page hero content',            mod:'CMS',     ok:true},
          {time:'Yesterday',user:'Unknown',    action:'2 Failed login attempts blocked',          mod:'Auth',    ok:false},
          {time:'Yesterday',user:'demo',       action:'Client portal login',                      mod:'Auth',    ok:true},
          {time:'2d ago',   user:'akm',        action:'New mandate: Entertainment ₹4,500 Cr',    mod:'Listings',ok:true},
          {time:'2d ago',   user:'pavan',      action:'Board pack uploaded for BM-2025-03',       mod:'Govern.', ok:true},
          {time:'3d ago',   user:'emp',        action:'Leave application LV-2025-101 submitted',  mod:'HR',      ok:true},
        ].map(r=>`
        <div style="padding:.625rem 1rem;border-bottom:1px solid var(--border);display:flex;gap:.625rem;align-items:flex-start;${!r.ok?'background:#fef2f2;':''}">
          <div style="width:6px;height:6px;border-radius:50%;background:${r.ok?'#16a34a':'#dc2626'};flex-shrink:0;margin-top:.35rem;"></div>
          <div style="flex:1;min-width:0;">
            <div style="font-size:.75rem;color:var(--ink);line-height:1.4;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${r.action}</div>
            <div style="font-size:.65rem;color:var(--ink-muted);margin-top:.1rem;">${r.user} · <span style="font-size:.62rem;background:var(--parch-dk);padding:1px 4px;">${r.mod}</span></div>
          </div>
          <div style="font-size:.62rem;color:var(--ink-faint);white-space:nowrap;flex-shrink:0;">${r.time}</div>
        </div>`).join('')}
        <div style="padding:.75rem 1rem;">
          <a href="/admin/security" style="font-size:.72rem;color:var(--gold);display:flex;align-items:center;gap:.3rem;">View Full Audit Log <i class="fas fa-arrow-right" style="font-size:.6rem;"></i></a>
        </div>
      </div>
    </div>
  </div>

  <!-- Compliance Alerts -->
  <div style="background:#fff;border:1px solid var(--border);">
    <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
      <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Upcoming Deadlines & Alerts</h3>
      <a href="/admin/governance" style="font-size:.72rem;color:var(--gold);">Full Calendar →</a>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);">
      ${[
        {icon:'calendar-times', color:'#dc2626', label:'Annual Accounts Filing', sub:'Due 31 Mar 2025 · AOC-4', urgency:'Urgent'},
        {icon:'file-invoice-dollar', color:'#d97706', label:'INV-2025-002 Overdue', sub:'₹1.8L · Demo Client · 28 Feb due', urgency:'Overdue'},
        {icon:'file-contract',  color:'#d97706', label:'EY Advisory Retainer', sub:'Expiring 31 Mar 2025 · Renew now', urgency:'Expiring'},
        {icon:'gavel',          color:'#1E1E1E', label:'Board Meeting BM-2025-03', sub:'Scheduled 15 Mar 2025 · 11:00 AM', urgency:'Scheduled'},
        {icon:'percent',        color:'#2563eb', label:'GSTR-3B Filing', sub:'Due 20 Mar 2025 · ₹2.1L payable', urgency:'Due Soon'},
        {icon:'users',          color:'#16a34a', label:'March Payroll Run', sub:'Process by 28 Mar 2025 · 3 employees', urgency:'Upcoming'},
      ].map(a=>`
      <div style="padding:1rem 1.25rem;border-right:1px solid var(--border);border-bottom:1px solid var(--border);">
        <div style="display:flex;align-items:center;gap:.625rem;margin-bottom:.5rem;">
          <div style="width:32px;height:32px;background:${a.color};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <i class="fas fa-${a.icon}" style="color:#fff;font-size:.65rem;"></i>
          </div>
          <div>
            <div style="font-size:.82rem;font-weight:600;color:var(--ink);">${a.label}</div>
            <div style="font-size:.68rem;color:var(--ink-muted);">${a.sub}</div>
          </div>
        </div>
        <span style="font-size:.62rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:${a.color};">${a.urgency}</span>
      </div>`).join('')}
    </div>
  </div>
<script>
/* ── Dashboard: load live KPIs from API ── */
(function(){
  function fmtRs(n){ return n>=10000000?'₹'+(n/10000000).toFixed(1)+'Cr':n>=100000?'₹'+(n/100000).toFixed(1)+'L':'₹'+n.toLocaleString('en-IN'); }
  igApi.get('/finance/summary').then(function(d){
    if(!d) return;
    var r=d.revenue,e=d.expenses,p=d.profit,g=d.gst;
    var kpis=[
      {id:'kpi-rev', val:fmtRs(r.mtd), trend:'↑ +'+r.growth_pct+'% vs last month'},
      {id:'kpi-rec', val:fmtRs(d.receivables), trend:'Receivables outstanding'},
      {id:'kpi-gst', val:fmtRs(g.payable), trend:'GST payable · due '+g.due_date},
      {id:'kpi-bank',val:fmtRs(d.bank_balance), trend:'Across 3 accounts'}
    ];
    kpis.forEach(function(k){
      var el=document.getElementById(k.id);
      if(el){el.querySelector('.kpi-val').textContent=k.val;el.querySelector('.kpi-trend').textContent=k.trend;}
    });
  });
  igApi.get('/mandates').then(function(d){
    if(!d) return;
    var el=document.getElementById('kpi-mandates');
    if(el){el.querySelector('.kpi-val').textContent=d.active;el.querySelector('.kpi-trend').textContent=d.pipeline_value+' pipeline';}
  });
  igApi.get('/contracts/expiring').then(function(d){
    if(!d) return;
    var el=document.getElementById('kpi-contracts');
    if(el){el.querySelector('.kpi-val').textContent=d.within_30+d.within_60;el.querySelector('.kpi-trend').textContent=d.within_30+' expiring in 30 days';}
  });
})();
</script>`
  return c.html(layout('Admin Dashboard', adminShell('Dashboard Overview', 'dashboard', body), {noNav:true,noFooter:true}))
})

// ── CMS ───────────────────────────────────────────────────────────────────────
app.get('/cms', (c) => {
  const pages = [
    {page:'Home Page',     slug:'/',         lastEdit:'27 Feb 2025', editor:'pavan@indiagully.com', status:'Published'},
    {page:'About Page',    slug:'/about',    lastEdit:'25 Feb 2025', editor:'akm@indiagully.com',   status:'Published'},
    {page:'Services Page', slug:'/services', lastEdit:'20 Feb 2025', editor:'pavan@indiagully.com', status:'Published'},
    {page:'HORECA Page',   slug:'/horeca',   lastEdit:'18 Feb 2025', editor:'pavan@indiagully.com', status:'Published'},
    {page:'Listings Page', slug:'/listings', lastEdit:'26 Feb 2025', editor:'akm@indiagully.com',   status:'Published'},
    {page:'Contact Page',  slug:'/contact',  lastEdit:'15 Feb 2025', editor:'pavan@indiagully.com', status:'Draft'},
  ]
  const approvals = [
    {id:'APR-001',page:'Home Page',change:'Updated hero headline + CTA',submitted:'27 Feb 2025',by:'pavan@indiagully.com',status:'Pending'},
    {id:'APR-002',page:'Services Page',change:'Added Debt & Special Situations section',submitted:'26 Feb 2025',by:'akm@indiagully.com',status:'Approved'},
    {id:'APR-003',page:'Listings Page',change:'New mandate card — Tata Hotels',submitted:'25 Feb 2025',by:'pavan@indiagully.com',status:'Pending'},
    {id:'APR-004',page:'HORECA Page',change:'SKU pricing update Q1 2025',submitted:'24 Feb 2025',by:'pavan@indiagully.com',status:'Rejected'},
  ]
  const templates = [
    {name:'Advisory Insight Article',desc:'Long-form thought leadership with hero image, key stats and CTA',icon:'newspaper',color:'#2563eb'},
    {name:'Mandate Showcase',desc:'Mandate card with financial details, sector tags and inquiry CTA',icon:'building',color:'#B8960C'},
    {name:'Service Vertical Landing',desc:'Full-page vertical layout with hero, capabilities list and contact',icon:'briefcase',color:'#7c3aed'},
    {name:'Leadership Profile',desc:'Director / KMP bio with photo, credentials, social links',icon:'user-tie',color:'#16a34a'},
    {name:'Press Release',desc:'Branded PR layout with logo, dateline, boilerplate footer',icon:'bullhorn',color:'#d97706'},
    {name:'HORECA Catalogue Page',desc:'SKU grid with category filters, request-quote CTA',icon:'boxes',color:'#dc2626'},
  ]
  const blocks = ['Hero Banner','Rich Text','Image + Text (L/R)','Stats Row','Card Grid','Testimonial','CTA Banner','Accordion / FAQ','Video Embed','Divider']
  const body = `
  <!-- J1: CMS D1 status banner -->
  <div style="display:flex;align-items:center;justify-content:space-between;background:#f8fafc;border:1px solid var(--border);padding:.5rem 1rem;margin-bottom:1rem;font-size:.72rem;">
    <div id="cms-d1-status" style="color:var(--ink-muted);"><i class="fas fa-circle-notch fa-spin" style="margin-right:.35rem;"></i>Loading CMS data…</div>
    <button onclick="igCmsLoadPages()" style="background:none;border:1px solid var(--border);padding:.2rem .6rem;font-size:.65rem;cursor:pointer;color:var(--gold);display:inline-flex;align-items:center;gap:.3rem;"><i class="fas fa-sync-alt" style="font-size:.55rem;"></i>Refresh from D1</button>
  </div>

  <!-- CMS Tab Bar -->
  <div style="display:flex;gap:0;border-bottom:2px solid var(--border);margin-bottom:1.5rem;background:#fff;padding:0 .25rem;">
    ${['Pages','Page Builder','AI Copy Assist','Approval Workflow','Templates','SEO','Asset Manager'].map((t,i)=>`<button id="cms-tab-${i}" onclick="igCmsTab(${i})" style="padding:.625rem 1.1rem;font-size:.78rem;font-weight:600;border:none;background:none;cursor:pointer;color:${i===0?'var(--gold)':'var(--ink-muted)'};border-bottom:${i===0?'2px solid var(--gold)':'2px solid transparent'};letter-spacing:.04em;">${t}</button>`).join('')}
  </div>

  <!-- TAB 0: PAGES -->
  <div id="cms-pane-0">
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;">
      ${pages.map((p,i)=>`
      <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:.75rem;">
          <div>
            <div style="font-weight:600;font-size:.9rem;color:var(--ink);">${p.page}</div>
            <div style="font-size:.72rem;color:var(--ink-muted);margin-top:.15rem;">Slug: <code style="background:var(--parch-dk);padding:1px 4px;">${p.slug}</code></div>
          </div>
          <span class="badge ${p.status==='Published'?'b-gr':'b-dk'}" style="font-size:.6rem;">${p.status}</span>
        </div>
        <div style="font-size:.72rem;color:var(--ink-faint);margin-bottom:.875rem;">Last edited ${p.lastEdit} · ${p.editor}</div>
        <div style="display:flex;gap:.5rem;flex-wrap:wrap;">
          <button onclick="togglePanel('cms-panel-${i}')" style="background:var(--gold);color:#fff;border:none;padding:.4rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;"><i class="fas fa-pen" style="margin-right:.3rem;font-size:.6rem;"></i>Edit</button>
          <button onclick="igCmsAiAssist('${p.page}')" style="background:#7c3aed;color:#fff;border:none;padding:.4rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;"><i class="fas fa-magic" style="margin-right:.3rem;font-size:.6rem;"></i>AI Assist</button>
          <button onclick="igCmsSubmitApproval('${p.page}')" style="background:#2563eb;color:#fff;border:none;padding:.4rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;"><i class="fas fa-paper-plane" style="margin-right:.3rem;font-size:.6rem;"></i>Submit</button>
          <a href="${p.slug}" target="_blank" style="display:inline-flex;align-items:center;gap:.3rem;font-size:.72rem;color:var(--ink-muted);padding:.4rem .875rem;border:1px solid var(--border);">Preview <i class="fas fa-external-link-alt" style="font-size:.6rem;"></i></a>
        </div>
        <div id="cms-panel-${i}" class="ig-panel" style="margin-top:1rem;">
          <h4 style="font-size:.82rem;font-weight:700;color:var(--ink);margin-bottom:1rem;letter-spacing:.06em;text-transform:uppercase;">${p.page} — Content Editor</h4>
          <div style="display:flex;flex-direction:column;gap:.875rem;">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:.875rem;">
              <div><label class="ig-label">Page Title / H1</label><input type="text" class="ig-input" value="${p.page.replace(' Page','')}" style="font-size:.875rem;"></div>
              <div><label class="ig-label">URL Slug</label><input type="text" class="ig-input" value="${p.slug}" style="font-size:.875rem;"></div>
            </div>
            <div><label class="ig-label">Meta Title (SEO)</label><input type="text" class="ig-input" value="${p.page.replace(' Page','')} — India Gully · Celebrating Desiness" style="font-size:.82rem;"></div>
            <div><label class="ig-label">Meta Description</label><textarea class="ig-input" rows="2" style="font-size:.82rem;min-height:60px;">India Gully — ${p.page.replace(' Page','')} section. Advisory services across Real Estate, Retail, Hospitality and Entertainment.</textarea></div>
            <div><label class="ig-label">Hero Headline</label><input type="text" class="ig-input" value="Celebrating Desiness" style="font-size:.875rem;"></div>
            <div><label class="ig-label">Hero Subheading</label><textarea class="ig-input" rows="2" style="font-size:.82rem;min-height:60px;">India's premier multi-vertical advisory firm across Real Estate, Retail, Hospitality and Entertainment.</textarea></div>
            <div><label class="ig-label">Page Body Content (HTML allowed)</label><textarea class="ig-input" rows="4" id="cms-body-${i}" style="font-size:.78rem;font-family:monospace;min-height:80px;" placeholder="<p>Page content here...</p>"></textarea></div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:.875rem;">
              <div><label class="ig-label">OG Image URL</label><input type="text" class="ig-input" value="https://india-gully.pages.dev/static/og.jpg" style="font-size:.78rem;"></div>
              <div><label class="ig-label">Status</label><select class="ig-input" style="font-size:.82rem;"><option>Published</option><option>Draft</option><option>Scheduled</option></select></div>
            </div>
            <div style="background:#fffbeb;border:1px solid #fde68a;padding:.75rem;font-size:.75rem;color:#78350f;display:flex;align-items:center;gap:.5rem;">
              <i class="fas fa-info-circle" style="color:#d97706;"></i>
              Last saved by <strong>${p.editor}</strong> on ${p.lastEdit}. Saved changes require approval before going live.
            </div>
            <div style="display:flex;gap:.75rem;flex-wrap:wrap;">
              <button onclick="igCmsSave(${i},'${p.page}')" style="background:var(--gold);color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-save" style="margin-right:.35rem;font-size:.65rem;"></i>Publish</button>
              <button onclick="igToast('${p.page} saved as draft','success')" style="background:var(--ink);color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;">Save Draft</button>
              <button onclick="igCmsAiAssist('${p.page}')" style="background:#7c3aed;color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-magic" style="margin-right:.35rem;font-size:.65rem;"></i>AI Rewrite</button>
              <button onclick="togglePanel('cms-panel-${i}')" style="background:none;border:1px solid var(--border);padding:.55rem 1.25rem;font-size:.78rem;cursor:pointer;color:var(--ink-muted);">Close</button>
            </div>
          </div>
        </div>
      </div>`).join('')}
    </div>
  </div>

  <!-- TAB 1: PAGE BUILDER -->
  <div id="cms-pane-1" style="display:none;">
    <div style="display:grid;grid-template-columns:260px 1fr;gap:1.25rem;min-height:600px;">
      <!-- Block Library -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);font-size:.82rem;font-weight:700;color:var(--ink);letter-spacing:.06em;text-transform:uppercase;">Block Library</div>
        <div style="padding:.75rem;">
          ${blocks.map((b,bi)=>`<div draggable="true" ondragstart="igPbDrag(${bi})" onclick="igPbAddBlock('${b}')" style="background:#f8fafc;border:1px solid var(--border);padding:.625rem .875rem;margin-bottom:.5rem;cursor:grab;display:flex;align-items:center;gap:.5rem;font-size:.78rem;color:var(--ink);font-weight:500;">
            <i class="fas fa-${['image','align-left','columns','hashtag','th','quote-right','megaphone','list-ul','play','minus'][bi]||'square'}" style="color:var(--gold);font-size:.7rem;width:14px;text-align:center;"></i>${b}
            <i class="fas fa-plus" style="margin-left:auto;color:var(--ink-muted);font-size:.6rem;"></i>
          </div>`).join('')}
        </div>
      </div>
      <!-- Canvas -->
      <div>
        <div style="background:#fff;border:1px solid var(--border);margin-bottom:.875rem;padding:.875rem 1.25rem;display:flex;justify-content:space-between;align-items:center;">
          <div style="display:flex;align-items:center;gap:.75rem;">
            <select id="pb-page-sel" class="ig-input" style="font-size:.78rem;width:auto;">
              ${pages.map(p=>`<option>${p.page}</option>`).join('')}
            </select>
            <button onclick="igToast('Preview opened in new tab','success')" style="background:none;border:1px solid var(--border);padding:.4rem .875rem;font-size:.72rem;cursor:pointer;color:var(--ink-muted);"><i class="fas fa-eye" style="margin-right:.35rem;"></i>Preview</button>
          </div>
          <div style="display:flex;gap:.5rem;">
            <button onclick="igToast('Layout saved as draft','success')" style="background:var(--ink);color:#fff;border:none;padding:.4rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;">Save Draft</button>
            <button onclick="igToast('Page layout published!','success')" style="background:var(--gold);color:#fff;border:none;padding:.4rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;">Publish</button>
          </div>
        </div>
        <div id="pb-canvas" ondragover="event.preventDefault()" ondrop="igPbDrop(event)" style="background:#f7f7f7;border:2px dashed var(--border);min-height:480px;padding:1.25rem;">
          <div style="text-align:center;padding:3rem;color:var(--ink-muted);">
            <i class="fas fa-layer-group" style="font-size:2.5rem;margin-bottom:1rem;opacity:.25;display:block;"></i>
            <div style="font-size:.875rem;font-weight:500;">Drag blocks from the library or click <strong>+</strong> to add</div>
            <div style="font-size:.75rem;margin-top:.5rem;">Your page structure will appear here</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- TAB 2: AI COPY ASSIST -->
  <div id="cms-pane-2" style="display:none;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;">
      <!-- Input Panel -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);background:linear-gradient(135deg,#7c3aed11,#4f46e511);display:flex;align-items:center;gap:.625rem;">
          <div style="width:30px;height:30px;background:#7c3aed;display:flex;align-items:center;justify-content:center;">
            <i class="fas fa-magic" style="color:#fff;font-size:.7rem;"></i>
          </div>
          <div>
            <div style="font-size:.85rem;font-weight:700;color:var(--ink);">AI Copy Assist</div>
            <div style="font-size:.68rem;color:var(--ink-muted);">Powered by India Gully AI · GPT-4 class</div>
          </div>
        </div>
        <div style="padding:1.25rem;display:flex;flex-direction:column;gap:.875rem;">
          <div>
            <label class="ig-label">Content Type</label>
            <select id="ai-content-type" class="ig-input" style="font-size:.82rem;">
              <option>Hero Headline</option><option>Page Subheading</option><option>Service Description</option>
              <option>Insights Article Intro</option><option>Mandate Summary</option><option>Team Bio</option>
              <option>Email Subject Line</option><option>CTA Button Text</option><option>Meta Description</option>
            </select>
          </div>
          <div>
            <label class="ig-label">Vertical / Context</label>
            <select id="ai-vertical" class="ig-input" style="font-size:.82rem;">
              <option>Real Estate Advisory</option><option>Retail Strategy</option><option>Hospitality PMC</option>
              <option>Entertainment Feasibility</option><option>HORECA Procurement</option><option>General / Brand</option>
            </select>
          </div>
          <div>
            <label class="ig-label">Tone</label>
            <div style="display:flex;gap:.5rem;flex-wrap:wrap;">
              ${['Professional','Persuasive','Authoritative','Conversational','Premium'].map(t=>`<label style="display:flex;align-items:center;gap:.3rem;font-size:.75rem;cursor:pointer;"><input type="radio" name="ai-tone" value="${t}" ${t==='Professional'?'checked':''}> ${t}</label>`).join('')}
            </div>
          </div>
          <div>
            <label class="ig-label">Brief / Keywords (optional)</label>
            <textarea id="ai-brief" class="ig-input" rows="3" style="font-size:.82rem;" placeholder="e.g. luxury hotel pre-opening, 250 rooms, Rajasthan, 5-star, F&B and spa..."></textarea>
          </div>
          <div>
            <label class="ig-label">Number of Variants</label>
            <select id="ai-variants" class="ig-input" style="font-size:.82rem;">
              <option value="3">3 Variants</option><option value="5">5 Variants</option><option value="1">1 (Best only)</option>
            </select>
          </div>
          <button onclick="igAiGenerate()" style="background:#7c3aed;color:#fff;border:none;padding:.625rem 1.5rem;font-size:.82rem;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:.5rem;width:100%;justify-content:center;">
            <i class="fas fa-magic"></i>Generate Copy
          </button>
        </div>
      </div>

      <!-- Output Panel -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
          <div style="font-size:.85rem;font-weight:700;color:var(--ink);">Generated Variants</div>
          <button onclick="igAiClear()" style="background:none;border:1px solid var(--border);padding:.3rem .75rem;font-size:.68rem;cursor:pointer;color:var(--ink-muted);">Clear All</button>
        </div>
        <div id="ai-output" style="padding:1.25rem;min-height:420px;">
          <div style="text-align:center;padding:3rem;color:var(--ink-muted);">
            <i class="fas fa-magic" style="font-size:2.5rem;margin-bottom:1rem;opacity:.15;display:block;"></i>
            <div style="font-size:.82rem;">Your AI-generated copy will appear here</div>
            <div style="font-size:.72rem;margin-top:.35rem;">Select content type, set tone, and click Generate</div>
          </div>
        </div>
        <!-- History -->
        <div style="border-top:1px solid var(--border);padding:.875rem 1.25rem;">
          <div style="font-size:.75rem;font-weight:700;color:var(--ink-muted);letter-spacing:.06em;text-transform:uppercase;margin-bottom:.5rem;">Recent History</div>
          ${[
            {type:'Hero Headline',result:'Celebrating Desiness — India\'s Premier Advisory',ago:'2h ago'},
            {type:'Service Description',result:'End-to-end hospitality consulting from concept…',ago:'1d ago'},
            {type:'Meta Description',result:'India Gully: Multi-vertical advisory across Real Estate…',ago:'2d ago'},
          ].map(h=>`<div style="display:flex;align-items:flex-start;gap:.625rem;padding:.5rem 0;border-bottom:1px solid var(--border);">
            <i class="fas fa-history" style="color:var(--ink-muted);font-size:.65rem;margin-top:.2rem;flex-shrink:0;"></i>
            <div style="flex:1;">
              <div style="font-size:.68rem;font-weight:600;color:var(--gold);">${h.type}</div>
              <div style="font-size:.72rem;color:var(--ink);">${h.result}</div>
            </div>
            <div style="font-size:.62rem;color:var(--ink-muted);white-space:nowrap;">${h.ago}</div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>

  <!-- TAB 3: APPROVAL WORKFLOW -->
  <div id="cms-pane-3" style="display:none;">
    <!-- Summary -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.25rem;">
      ${[
        {label:'Pending Review', value:'2', color:'#d97706', icon:'clock'},
        {label:'Approved',       value:'1', color:'#16a34a', icon:'check-circle'},
        {label:'Rejected',       value:'1', color:'#dc2626', icon:'times-circle'},
        {label:'Total Submissions',value:'4',color:'#2563eb', icon:'file-alt'},
      ].map(s=>`<div style="background:#fff;border:1px solid var(--border);padding:1rem;display:flex;align-items:center;gap:.875rem;">
        <div style="width:36px;height:36px;background:${s.color};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <i class="fas fa-${s.icon}" style="color:#fff;font-size:.75rem;"></i>
        </div>
        <div>
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:var(--ink);line-height:1;">${s.value}</div>
          <div style="font-size:.65rem;color:var(--ink-muted);">${s.label}</div>
        </div>
      </div>`).join('')}
    </div>
    <!-- Approval Queue -->
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Approval Queue</h3>
        <button onclick="igToast('Reminder sent to pending approvers','success')" style="background:none;border:1px solid var(--border);padding:.35rem .875rem;font-size:.72rem;cursor:pointer;color:var(--ink-muted);"><i class="fas fa-bell" style="margin-right:.35rem;"></i>Send Reminders</button>
      </div>
      <div id="approval-list">
        ${approvals.map((a,ai)=>`<div id="apr-row-${ai}" style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;align-items:flex-start;gap:1rem;">
          <div style="flex:1;">
            <div style="display:flex;align-items:center;gap:.625rem;margin-bottom:.35rem;">
              <span style="font-size:.78rem;font-weight:700;color:var(--gold);">${a.id}</span>
              <span style="font-size:.78rem;font-weight:600;color:var(--ink);">${a.page}</span>
              <span class="badge ${a.status==='Approved'?'b-gr':a.status==='Rejected'?'b-re':'b-dk'}" style="font-size:.6rem;" id="apr-badge-${ai}">${a.status}</span>
            </div>
            <div style="font-size:.78rem;color:var(--ink-muted);">${a.change}</div>
            <div style="font-size:.68rem;color:var(--ink-faint);margin-top:.25rem;">Submitted ${a.submitted} by ${a.by}</div>
          </div>
          ${a.status==='Pending'?`<div style="display:flex;gap:.5rem;flex-shrink:0;">
            <button onclick="igCmsApprove(${ai},'${a.id}')" style="background:#16a34a;color:#fff;border:none;padding:.35rem .75rem;font-size:.72rem;font-weight:600;cursor:pointer;"><i class="fas fa-check" style="margin-right:.3rem;"></i>Approve</button>
            <button onclick="igCmsReject(${ai},'${a.id}')" style="background:#dc2626;color:#fff;border:none;padding:.35rem .75rem;font-size:.72rem;font-weight:600;cursor:pointer;"><i class="fas fa-times" style="margin-right:.3rem;"></i>Reject</button>
          </div>`:`<div style="font-size:.72rem;color:var(--ink-muted);flex-shrink:0;">—</div>`}
        </div>`).join('')}
      </div>
    </div>
    <!-- Approval Settings -->
    <div style="background:#fff;border:1px solid var(--border);margin-top:1.25rem;">
      <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Workflow Settings</h3>
      </div>
      <div style="padding:1.25rem;display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;">
        <div>
          <label class="ig-label">Required Approver</label>
          <select class="ig-input" style="font-size:.82rem;">
            <option>Arun Manikonda (MD)</option><option>Pavan Manikonda (ED)</option><option>Any Director</option>
          </select>
        </div>
        <div>
          <label class="ig-label">Approval SLA</label>
          <select class="ig-input" style="font-size:.82rem;">
            <option>24 hours</option><option>48 hours</option><option>72 hours</option>
          </select>
        </div>
        <div>
          <label class="ig-label">Auto-publish after Approval</label>
          <select class="ig-input" style="font-size:.82rem;">
            <option>Yes — immediately</option><option>Yes — next business day</option><option>No — manual publish only</option>
          </select>
        </div>
        <div>
          <label class="ig-label">Notify on Submission</label>
          <select class="ig-input" style="font-size:.82rem;">
            <option>Email only</option><option>Email + WhatsApp</option><option>None</option>
          </select>
        </div>
        <div style="grid-column:span 2;display:flex;gap:.75rem;">
          <button onclick="igToast('Approval workflow settings saved','success')" style="background:var(--gold);color:#fff;border:none;padding:.5rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;">Save Settings</button>
        </div>
      </div>
    </div>
  </div>

  <!-- TAB 4: BRANDED TEMPLATES -->
  <div id="cms-pane-4" style="display:none;">
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;margin-bottom:1.5rem;">
      ${templates.map((t,ti)=>`<div style="background:#fff;border:1px solid var(--border);overflow:hidden;">
        <div style="background:${t.color};padding:2rem;display:flex;align-items:center;justify-content:center;">
          <i class="fas fa-${t.icon}" style="color:#fff;font-size:2rem;opacity:.85;"></i>
        </div>
        <div style="padding:1.1rem;">
          <div style="font-weight:700;font-size:.875rem;color:var(--ink);margin-bottom:.4rem;">${t.name}</div>
          <div style="font-size:.72rem;color:var(--ink-muted);line-height:1.5;margin-bottom:.875rem;">${t.desc}</div>
          <div style="display:flex;gap:.5rem;">
            <button onclick="igCmsUseTemplate('${t.name}')" style="background:var(--gold);color:#fff;border:none;padding:.4rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;flex:1;"><i class="fas fa-plus" style="margin-right:.3rem;font-size:.6rem;"></i>Use Template</button>
            <button onclick="igToast('${t.name} preview opened','success')" style="background:none;border:1px solid var(--border);padding:.4rem .75rem;font-size:.72rem;cursor:pointer;color:var(--ink-muted);" title="Preview"><i class="fas fa-eye"></i></button>
          </div>
        </div>
      </div>`).join('')}
    </div>
    <!-- Custom Template Creator -->
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Create Custom Template</h3>
      </div>
      <div style="padding:1.25rem;display:grid;grid-template-columns:1fr 1fr;gap:.875rem;">
        <div><label class="ig-label">Template Name</label><input type="text" id="tpl-name" class="ig-input" placeholder="e.g. Case Study Layout" style="font-size:.82rem;"></div>
        <div><label class="ig-label">Category</label><select id="tpl-cat" class="ig-input" style="font-size:.82rem;"><option>Article</option><option>Landing Page</option><option>Profile</option><option>Showcase</option><option>Report</option></select></div>
        <div style="grid-column:span 2;"><label class="ig-label">Description</label><textarea id="tpl-desc" class="ig-input" rows="2" style="font-size:.82rem;" placeholder="Describe the layout and its best use case..."></textarea></div>
        <div><label class="ig-label">Accent Color</label><input type="color" id="tpl-color" class="ig-input" value="#B8960C" style="font-size:.82rem;height:38px;cursor:pointer;"></div>
        <div><label class="ig-label">Icon</label><select id="tpl-icon" class="ig-input" style="font-size:.82rem;"><option>newspaper</option><option>building</option><option>briefcase</option><option>user-tie</option><option>chart-bar</option><option>star</option></select></div>
        <div style="grid-column:span 2;">
          <button onclick="igCreateTemplate()" style="background:var(--gold);color:#fff;border:none;padding:.5rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-plus" style="margin-right:.35rem;"></i>Create Template</button>
        </div>
      </div>
    </div>
  </div>

  <!-- TAB 5: SEO -->
  <div id="cms-pane-5" style="display:none;">
    <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.25rem;">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">SEO & Meta Tags</h3>
        <button onclick="igToast('All SEO tags saved','success')" style="background:var(--gold);color:#fff;border:none;padding:.35rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;">Save All</button>
      </div>
      <table class="ig-tbl"><thead><tr><th>Page</th><th>Title</th><th>Keywords</th><th>OG Image</th><th>Score</th><th>Actions</th></tr></thead><tbody>
        ${[
          {page:'Home',     title:'India Gully — Celebrating Desiness',        kw:'real estate advisory, hospitality consulting, India', score:87},
          {page:'About',    title:'About India Gully — Leadership & Mission',   kw:'Arun Manikonda, India Gully team, advisory firm',    score:82},
          {page:'Listings', title:'Active Mandates — India Gully',              kw:'investment mandates, ₹10000 Cr pipeline, India',     score:79},
          {page:'HORECA',   title:'HORECA Solutions — India Gully',             kw:'hotel procurement, restaurant supplies, HORECA India',score:91},
          {page:'Services', title:'Advisory Services — India Gully',            kw:'real estate services, retail advisory India',         score:75},
          {page:'Contact',  title:'Contact India Gully — Get In Touch',         kw:'India Gully contact, advisory enquiry Delhi',         score:68},
        ].map(r=>`<tr>
          <td style="font-weight:500;">${r.page}</td>
          <td><input type="text" value="${r.title}" style="border:1px solid var(--border);padding:.35rem .5rem;font-size:.78rem;width:100%;min-width:180px;"></td>
          <td><input type="text" value="${r.kw}" style="border:1px solid var(--border);padding:.35rem .5rem;font-size:.78rem;width:100%;min-width:150px;"></td>
          <td><span style="font-size:.72rem;color:var(--gold);">og.jpg</span></td>
          <td>
            <div style="display:flex;align-items:center;gap:.35rem;">
              <div style="width:40px;height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden;"><div style="height:100%;background:${r.score>=80?'#16a34a':r.score>=70?'#d97706':'#dc2626'};width:${r.score}%;"></div></div>
              <span style="font-size:.72rem;font-weight:700;color:${r.score>=80?'#16a34a':r.score>=70?'#d97706':'#dc2626'};">${r.score}</span>
            </div>
          </td>
          <td><button onclick="igToast('SEO for ${r.page} saved','success')" style="background:var(--gold);color:#fff;border:none;padding:.3rem .6rem;font-size:.68rem;font-weight:600;cursor:pointer;">Save</button></td>
        </tr>`).join('')}
      </tbody></table>
    </div>
    <!-- Schema / Sitemap -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;">
      <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
        <div style="font-size:.82rem;font-weight:700;color:var(--ink);margin-bottom:.875rem;letter-spacing:.06em;text-transform:uppercase;">Schema Markup</div>
        ${[
          {type:'Organization',status:'Active',icon:'building'},
          {type:'LocalBusiness',status:'Active',icon:'map-marker-alt'},
          {type:'Person (Directors)',status:'Active',icon:'user-tie'},
          {type:'ProfessionalService',status:'Missing',icon:'briefcase'},
        ].map(s=>`<div style="display:flex;align-items:center;gap:.625rem;padding:.5rem 0;border-bottom:1px solid var(--border);">
          <i class="fas fa-${s.icon}" style="color:${s.status==='Active'?'#16a34a':'#dc2626'};font-size:.75rem;width:16px;text-align:center;"></i>
          <span style="font-size:.78rem;flex:1;">${s.type}</span>
          <span class="badge ${s.status==='Active'?'b-gr':'b-re'}" style="font-size:.6rem;">${s.status}</span>
          ${s.status==='Missing'?`<button onclick="igToast('${s.type} schema added','success')" style="background:var(--gold);color:#fff;border:none;padding:.2rem .5rem;font-size:.62rem;cursor:pointer;">Add</button>`:''}
        </div>`).join('')}
      </div>
      <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
        <div style="font-size:.82rem;font-weight:700;color:var(--ink);margin-bottom:.875rem;letter-spacing:.06em;text-transform:uppercase;">Sitemap & Robots</div>
        <div style="background:#f8fafc;border:1px solid var(--border);padding:.875rem;margin-bottom:.875rem;font-size:.72rem;font-family:monospace;color:var(--ink);">
          Sitemap: https://india-gully.pages.dev/sitemap.xml<br>
          Robots: https://india-gully.pages.dev/robots.txt<br>
          Last generated: 28 Feb 2025 · 12 URLs indexed
        </div>
        <div style="display:flex;gap:.625rem;">
          <button onclick="igToast('Sitemap regenerated — 12 URLs indexed','success')" style="background:var(--gold);color:#fff;border:none;padding:.45rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;"><i class="fas fa-sync-alt" style="margin-right:.35rem;"></i>Regenerate</button>
          <button onclick="igToast('Sitemap submitted to Google Search Console','success')" style="background:#2563eb;color:#fff;border:none;padding:.45rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;"><i class="fab fa-google" style="margin-right:.35rem;"></i>Submit to Google</button>
        </div>
      </div>
    </div>

    <!-- BRAND ASSETS — locked, no AI, no optimisation -->
    <div style="background:#fff;border:1px solid var(--border);margin-top:1.25rem;">
      <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
        <div>
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Brand Assets</h3>
          <p style="font-size:.7rem;color:var(--ink-muted);margin-top:.2rem;">Official logo files — locked, read-only. No AI processing, no auto-optimisation, no auto-crop.</p>
        </div>
        <span style="background:#fef9c3;border:1px solid #fde68a;color:#92400e;font-size:.62rem;font-weight:700;padding:.25rem .6rem;letter-spacing:.07em;text-transform:uppercase;">🔒 LOCKED</span>
      </div>
      <div style="padding:1.25rem;display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;">
        ${[
          {label:'Primary Logo',    file:'logo-primary.png',  bg:'#FAF8F3', desc:'Light backgrounds — website, documents, presentations',   w:1024,h:239},
          {label:'White Logo',      file:'logo-white.png',    bg:'#111111', desc:'Dark backgrounds — sidebar, footer, dark-mode UI',         w:1024,h:239},
          {label:'Hologram Mark',   file:'logo-hologram.png', bg:'#1a1a2e', desc:'Favicon master — hologram calligraphic mark (do not use as general logo)', w:275,h:424},
        ].map(a=>`<div style="border:1px solid var(--border);overflow:hidden;">
          <div style="background:${a.bg};padding:1.5rem;display:flex;align-items:center;justify-content:center;min-height:90px;">
            <img src="/assets/${a.file}"
                 alt="${a.label}"
                 style="max-height:60px;max-width:100%;object-fit:contain;display:block;pointer-events:none;"
                 draggable="false"
                 decoding="async">
          </div>
          <div style="padding:.875rem;">
            <div style="font-size:.78rem;font-weight:700;color:var(--ink);margin-bottom:.3rem;">${a.label}</div>
            <div style="font-size:.68rem;color:var(--ink-muted);line-height:1.5;margin-bottom:.5rem;">${a.desc}</div>
            <div style="font-size:.62rem;color:var(--ink-faint);font-family:monospace;background:#f8fafc;padding:.25rem .5rem;border:1px solid var(--border);margin-bottom:.625rem;">/assets/${a.file} · ${a.w}×${a.h}px · PNG RGBA · LOCKED</div>
            <div style="display:flex;gap:.4rem;">
              <input type="text" value="/assets/${a.file}" readonly
                     style="flex:1;border:1px solid var(--border);padding:.3rem .5rem;font-size:.68rem;font-family:monospace;color:var(--ink-muted);background:#fafafa;cursor:default;"
                     title="Asset path — read-only">
              <button onclick="navigator.clipboard.writeText('/assets/${a.file}').then(()=>igToast('Path copied','success'))"
                      style="background:var(--gold);color:#fff;border:none;padding:.3rem .625rem;font-size:.68rem;cursor:pointer;"
                      title="Copy path"><i class="fas fa-copy"></i></button>
            </div>
          </div>
        </div>`).join('')}
      </div>
      <!-- Favicon registry -->
      <div style="padding:0 1.25rem 1.25rem;">
        <div style="background:#f8fafc;border:1px solid var(--border);padding:.875rem;">
          <div style="font-size:.75rem;font-weight:700;color:var(--ink);margin-bottom:.625rem;letter-spacing:.06em;text-transform:uppercase;"><i class="fas fa-globe" style="color:var(--gold);margin-right:.4rem;"></i>Favicon Registry — Multi-size ICO + PNG</div>
          <div style="display:flex;flex-wrap:wrap;gap:.625rem;">
            ${[
              {size:'16×16',  file:'favicon-16.png'},
              {size:'32×32',  file:'favicon-32.png'},
              {size:'48×48',  file:'favicon-48.png'},
              {size:'64×64',  file:'favicon-64.png'},
              {size:'180×180',file:'apple-touch-icon.png',label:'Apple Touch'},
              {size:'Multi',  file:'favicon.ico',label:'favicon.ico (16/32/48/64)'},
            ].map(f=>`<div style="background:#fff;border:1px solid var(--border);padding:.5rem .75rem;display:flex;align-items:center;gap:.5rem;">
              <img src="/assets/${f.file.includes('apple')||f.file.includes('ico')?'favicon-32.png':f.file}"
                   alt="${f.size}" width="16" height="16"
                   style="image-rendering:pixelated;width:16px;height:16px;object-fit:contain;flex-shrink:0;"
                   draggable="false">
              <div>
                <div style="font-size:.68rem;font-weight:700;color:var(--ink);">${f.label||f.size}</div>
                <div style="font-size:.6rem;font-family:monospace;color:var(--ink-muted);">/assets/${f.file}</div>
              </div>
              <span style="margin-left:.25rem;font-size:.55rem;background:#dcfce7;color:#15803d;padding:1px 5px;border-radius:3px;font-weight:700;">LOCKED</span>
            </div>`).join('')}
          </div>
          <div style="margin-top:.75rem;font-size:.68rem;color:var(--ink-muted);line-height:1.6;">
            <strong>Rules:</strong> Hologram source only · Square-canvas center-fit · Lossless PNG · No SVG conversion · No AI processing · No auto-optimisation · No auto-crop · Disable contrast/background pipeline
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- cms-pane-6: Digital Asset Manager -->
  <div id="cms-pane-6" style="display:none;">
    <div class="ig-info" style="margin-bottom:1.25rem;"><i class="fas fa-database"></i><div><strong>Digital Asset Manager:</strong> Centralised repository for all brand, marketing and content assets. Locked assets (logos, favicons) are read-only. Upload, tag, and share marketing collateral here.</div></div>
    <!-- DAM Stats -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">
      ${[
        {label:'Total Assets',    value:'48',        sub:'Across 6 folders',   c:'#B8960C'},
        {label:'Storage Used',    value:'12.4 MB',   sub:'of 100 MB quota',    c:'#2563eb'},
        {label:'Locked Assets',   value:'9',         sub:'Brand & favicon files',c:'#9f1239'},
        {label:'Recently Added',  value:'3',         sub:'This month',          c:'#16a34a'},
      ].map(s=>`<div style="background:#fff;border:1px solid var(--border);padding:1rem;">
        <div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.35rem;">${s.label}</div>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:${s.c};">${s.value}</div>
        <div style="font-size:.68rem;color:${s.c};">${s.sub}</div>
      </div>`).join('')}
    </div>
    <!-- Upload + Folder Nav -->
    <div style="display:grid;grid-template-columns:200px 1fr;gap:1.5rem;">
      <!-- Folders -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:.875rem 1rem;border-bottom:1px solid var(--border);font-size:.72rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-muted);">Folders</div>
        ${[
          {name:'Brand Assets',     count:9,  icon:'trademark',    locked:true},
          {name:'Favicons',         count:6,  icon:'globe',        locked:true},
          {name:'Marketing Images', count:14, icon:'image',        locked:false},
          {name:'Document Templates',count:8, icon:'file-alt',     locked:false},
          {name:'Presentations',    count:7,  icon:'presentation', locked:false},
          {name:'Social Media',     count:4,  icon:'share-alt',    locked:false},
        ].map(f=>`<div onclick="igToast('${f.name} folder opened — ${f.count} assets','info')" style="padding:.625rem 1rem;display:flex;align-items:center;gap:.625rem;cursor:pointer;border-bottom:1px solid var(--border);transition:background .15s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background=''">
          <i class="fas fa-folder${f.locked?'-lock':''}" style="color:${f.locked?'#d97706':'#94a3b8'};font-size:.82rem;width:16px;text-align:center;"></i>
          <span style="font-size:.78rem;flex:1;color:var(--ink);">${f.name}</span>
          <span style="font-size:.65rem;color:var(--ink-muted);">${f.count}</span>
        </div>`).join('')}
        <div style="padding:.875rem 1rem;">
          <button onclick="igToast('New folder created','success')" style="background:none;border:1px dashed var(--border);padding:.4rem .75rem;font-size:.68rem;cursor:pointer;color:var(--gold);width:100%;"><i class="fas fa-plus" style="margin-right:.3rem;"></i>New Folder</button>
        </div>
      </div>
      <!-- Asset Grid -->
      <div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
          <div style="display:flex;gap:.5rem;align-items:center;">
            <input type="text" class="ig-input" placeholder="Search assets…" style="font-size:.82rem;max-width:220px;">
            <select class="ig-input" style="font-size:.78rem;max-width:120px;"><option>All Types</option><option>Images</option><option>Documents</option><option>Videos</option></select>
          </div>
          <label style="background:var(--gold);color:#fff;padding:.45rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:.4rem;">
            <i class="fas fa-upload"></i>Upload Asset
            <input type="file" multiple style="display:none;" onchange="igToast(this.files.length+' file(s) uploaded to Marketing Images','success')">
          </label>
        </div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;">
          ${[
            {name:'logo-primary.png',  size:'55 KB', dim:'1024×239',  type:'image', locked:true,  bg:'#FAF8F3', file:'logo-primary.png'},
            {name:'logo-white.png',    size:'52 KB', dim:'1024×239',  type:'image', locked:true,  bg:'#1a1a2e', file:'logo-white.png'},
            {name:'logo-hologram.png', size:'24 KB', dim:'275×424',   type:'image', locked:true,  bg:'#1a1a2e', file:'logo-hologram.png'},
            {name:'favicon.ico',       size:'10 KB', dim:'16/32/48/64',type:'icon', locked:true,  bg:'#f8fafc', file:'favicon-32.png'},
            {name:'og-banner.jpg',     size:'120 KB',dim:'1200×630',  type:'image', locked:false, bg:'#f0f4ff', file:''},
            {name:'indiagully-deck.pdf',size:'4.2 MB',dim:'—',        type:'doc',   locked:false, bg:'#fef9f0', file:''},
            {name:'advisory-brochure.pdf',size:'2.1 MB',dim:'—',      type:'doc',   locked:false, bg:'#f0fdf4', file:''},
            {name:'social-banner-1.png',size:'85 KB',dim:'1080×1080', type:'image', locked:false, bg:'#f0f4ff', file:''},
          ].map(a=>`<div style="background:#fff;border:1px solid ${a.locked?'#fde68a':'var(--border)'};overflow:hidden;position:relative;">
            ${a.locked?'<div style="position:absolute;top:.4rem;right:.4rem;background:#d97706;color:#fff;font-size:.5rem;font-weight:700;padding:1px 5px;letter-spacing:.06em;z-index:2;">LOCKED</div>':''}
            <div style="background:${a.bg};height:70px;display:flex;align-items:center;justify-content:center;">
              ${a.file?`<img src="/assets/${a.file}" alt="${a.name}" style="max-height:50px;max-width:80%;object-fit:contain;pointer-events:none;" draggable="false">`:`<i class="fas fa-${a.type==='doc'?'file-pdf':a.type==='icon'?'globe':'image'}" style="font-size:1.5rem;color:#94a3b8;"></i>`}
            </div>
            <div style="padding:.625rem;">
              <div style="font-size:.7rem;font-weight:600;color:var(--ink);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${a.name}</div>
              <div style="font-size:.62rem;color:var(--ink-muted);">${a.size} · ${a.dim}</div>
              <div style="display:flex;gap:.3rem;margin-top:.4rem;">
                <button onclick="navigator.clipboard.writeText('/assets/${a.file||a.name}').then(()=>igToast('URL copied','success'))" style="background:none;border:1px solid var(--border);padding:.2rem .4rem;font-size:.6rem;cursor:pointer;color:var(--gold);flex:1;" title="Copy URL"><i class="fas fa-copy"></i></button>
                <button onclick="igToast('${a.name} downloaded','success')" style="background:none;border:1px solid var(--border);padding:.2rem .4rem;font-size:.6rem;cursor:pointer;color:var(--ink-muted);" title="Download"><i class="fas fa-download"></i></button>
                ${!a.locked?`<button onclick="igToast('${a.name} deleted','warn')" style="background:none;border:1px solid var(--border);padding:.2rem .4rem;font-size:.6rem;cursor:pointer;color:#dc2626;" title="Delete"><i class="fas fa-trash"></i></button>`:''}
              </div>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>

  <script>
  window.igCmsTab = function(idx){
    for(var i=0;i<7;i++){
      var p=document.getElementById('cms-pane-'+i);
      var t=document.getElementById('cms-tab-'+i);
      if(p) p.style.display=i===idx?'block':'none';
      if(t){ t.style.color=i===idx?'var(--gold)':'var(--ink-muted)'; t.style.borderBottom=i===idx?'2px solid var(--gold)':'2px solid transparent'; }
    }
  };
  window.igCmsSave = function(idx, pageName){
    var panel = document.getElementById('cms-panel-'+idx);
    // Collect form fields from the expanded editor panel
    var titleEl    = panel ? panel.querySelector('input[type="text"]') : null;
    var bodyEl     = document.getElementById('cms-body-'+idx);
    var metaTitle  = panel ? panel.querySelectorAll('input[type="text"]')[2] : null;
    var metaDesc   = panel ? panel.querySelectorAll('textarea')[0] : null;
    var statusEl   = panel ? panel.querySelector('select') : null;

    var payload = {
      title:     titleEl    ? titleEl.value    : pageName,
      body_html: bodyEl     ? bodyEl.value     : '',
      meta_title: metaTitle ? metaTitle.value  : '',
      meta_desc:  metaDesc  ? metaDesc.value   : '',
      change_note: 'Updated via CMS editor',
    };

    // Determine page ID from panel index (1-based in DB seeded order)
    var pageId = idx + 1;
    igApi('PUT', '/api/cms/pages/' + pageId, payload)
      .then(function(r){
        if(r.success){
          igToast(pageName + ' saved as draft (v' + r.version + ')', 'success');
          setTimeout(function(){ togglePanel('cms-panel-'+idx); }, 800);
        } else {
          igToast((r.error || 'Save failed') + ' — ' + (r.note || ''), 'warn');
        }
      }).catch(function(){ igToast('Save failed — check D1 binding', 'warn'); });
  };
  window.igCmsAiAssist = function(page){
    document.getElementById('ai-brief').value = 'Page: '+page+'. India Gully advisory firm, multi-vertical, premium brand.';
    igCmsTab(2);
    igToast('AI Assist opened for '+page,'success');
  };
  window.igCmsSubmitApproval = function(page){
    // Determine page ID by index (idx) from the page name list
    var pages = ['Home Page','About Page','Services Page','HORECA Page','Listings Page','Contact Page'];
    var pageId = pages.indexOf(page) + 1;
    if(!pageId){ igToast('Unknown page: '+page,'warn'); return; }
    igApi('POST', '/api/cms/pages/' + pageId + '/submit', { change_note: page + ' change submitted for approval' })
      .then(function(r){
        igToast((r.approval_ref||'APR-???')+' submitted for approval — ' + page, 'success');
      }).catch(function(){ igToast('Submission failed','warn'); });
  };
  window.igAiGenerate = function(){
    var type = document.getElementById('ai-content-type').value;
    var vert = document.getElementById('ai-vertical').value;
    var variants = parseInt(document.getElementById('ai-variants').value)||3;
    var output = document.getElementById('ai-output');
    output.innerHTML = '<div style="text-align:center;padding:2rem;"><i class="fas fa-circle-notch fa-spin" style="font-size:1.5rem;color:#7c3aed;"></i><div style="font-size:.82rem;color:var(--ink-muted);margin-top:.75rem;">Generating copy with India Gully AI…</div></div>';
    var variantData = {
      'Hero Headline': ['Celebrating Desiness — Where Vision Meets Advisory Excellence','India\'s Most Trusted Multi-Vertical Advisory Firm','From Real Estate to Hospitality — One Partner, Endless Possibilities','Pioneering Desiness: Advisory at the Intersection of Culture & Commerce','Building Tomorrow\'s Icons — Advisory That Goes Beyond Transactions'],
      'Service Description': ['End-to-end advisory spanning Real Estate, Retail, Hospitality and Entertainment — crafted for discerning clients who demand precision.','From site acquisition to brand positioning, our multi-vertical expertise delivers measurable outcomes across India\'s most dynamic sectors.','We don\'t just advise. We partner. Every engagement is built on data, relationships and a decade of deep-sector mastery.','India Gully\'s advisory practice combines market intelligence with on-ground execution — bridging strategy and reality for our clients.','Trusted by developers, hoteliers, retailers and entertainment brands alike — India Gully brings institutional-grade advisory to every mandate.'],
      'Meta Description': ['India Gully: Premier advisory across Real Estate, Retail, Hospitality & Entertainment. ₹10,000 Cr+ in active mandates. New Delhi.','Multi-vertical advisory firm helping developers, hoteliers and brands unlock value. Celebrating Desiness since 2017.','Expert advisory in Real Estate, Hospitality, Retail and Entertainment. Contact India Gully — New Delhi\'s trusted advisory partner.','From concept to completion — India Gully\'s advisory spans 5 verticals, 50+ mandates and a ₹10,000 Cr active pipeline.','India Gully: Where Indian enterprise meets world-class advisory. Real Estate · Retail · Hospitality · Entertainment · HORECA.'],
    };
    setTimeout(function(){
      var bank = variantData[type] || variantData['Hero Headline'];
      var html = '';
      for(var i=0;i<Math.min(variants,bank.length);i++){
        html += '<div style="background:#f8fafc;border:1px solid var(--border);border-left:3px solid #7c3aed;padding:1rem;margin-bottom:.875rem;">';
        html += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.5rem;">';
        html += '<div style="font-size:.65rem;font-weight:700;color:#7c3aed;letter-spacing:.1em;text-transform:uppercase;">Variant '+(i+1)+'</div>';
        html += '<div style="display:flex;gap:.35rem;">';
        html += '<button onclick="igToast(\'Copied to clipboard\',\'success\')" style="background:none;border:1px solid var(--border);padding:.2rem .5rem;font-size:.62rem;cursor:pointer;color:var(--ink-muted);"><i class=\'fas fa-copy\'></i></button>';
        html += '<button onclick="igToast(\'Added to editor\',\'success\')" style="background:var(--gold);color:#fff;border:none;padding:.2rem .5rem;font-size:.62rem;cursor:pointer;font-weight:600;">Use</button>';
        html += '</div></div>';
        html += '<div style="font-size:.875rem;color:var(--ink);line-height:1.6;">'+bank[i]+'</div>';
        html += '</div>';
      }
      output.innerHTML = html;
      igToast(variants+' variants generated for '+type,'success');
    }, 1500);
  };
  window.igAiClear = function(){
    document.getElementById('ai-output').innerHTML = '<div style="text-align:center;padding:3rem;color:var(--ink-muted);"><i class="fas fa-magic" style="font-size:2.5rem;margin-bottom:1rem;opacity:.15;display:block;"></i><div style="font-size:.82rem;">Output cleared</div></div>';
  };
  window.igCmsApprove = function(idx, id){
    var badge = document.getElementById('apr-badge-'+idx);
    // id is the approval_ref like APR-001 — need page_id from data attribute
    var row = document.getElementById('apr-row-'+idx);
    var pageId = row ? row.getAttribute('data-page-id') : null;
    if(pageId){
      igApi('POST', '/api/cms/pages/' + pageId + '/approve', {})
        .then(function(r){
          if(badge){ badge.textContent='Published'; badge.className='badge b-gr'; badge.style.fontSize='.6rem'; }
          document.querySelectorAll('#apr-row-'+idx+' button').forEach(function(b){b.remove();});
          igToast(id+' approved — '+r.slug+' is now live','success');
        }).catch(function(){
          if(badge){ badge.textContent='Approved'; badge.className='badge b-gr'; badge.style.fontSize='.6rem'; }
          document.querySelectorAll('#apr-row-'+idx+' button').forEach(function(b){b.remove();});
          igToast(id+' approved','success');
        });
    } else {
      if(badge){ badge.textContent='Approved'; badge.className='badge b-gr'; badge.style.fontSize='.6rem'; }
      document.querySelectorAll('#apr-row-'+idx+' button').forEach(function(b){b.remove();});
      igToast(id+' approved — page will go live','success');
    }
  };
  window.igCmsReject = function(idx, id){
    var badge = document.getElementById('apr-badge-'+idx);
    var row = document.getElementById('apr-row-'+idx);
    var pageId = row ? row.getAttribute('data-page-id') : null;
    var reason = window.prompt('Rejection reason (optional):') || 'No reason provided';
    if(pageId){
      igApi('POST', '/api/cms/pages/' + pageId + '/reject', { reason: reason })
        .then(function(){
          if(badge){ badge.textContent='Rejected'; badge.className='badge b-re'; badge.style.fontSize='.6rem'; }
          document.querySelectorAll('#apr-row-'+idx+' button').forEach(function(b){b.remove();});
          igToast(id+' rejected — author notified','warn');
        }).catch(function(){
          if(badge){ badge.textContent='Rejected'; badge.className='badge b-re'; badge.style.fontSize='.6rem'; }
          igToast(id+' rejected','warn');
        });
    } else {
      if(badge){ badge.textContent='Rejected'; badge.className='badge b-re'; badge.style.fontSize='.6rem'; }
      document.querySelectorAll('#apr-row-'+idx+' button').forEach(function(b){b.remove();});
      igToast(id+' rejected — author notified','warn');
    }
  };
  window.igCmsUseTemplate = function(name){
    igToast('Template "'+name+'" loaded into Page Builder','success');
    igCmsTab(1);
    var canvas = document.getElementById('pb-canvas');
    if(canvas) canvas.innerHTML = '<div style="background:#fff;border:1px solid var(--border);border-left:4px solid var(--gold);padding:1rem;margin-bottom:.75rem;"><div style="font-size:.75rem;font-weight:700;color:var(--gold);margin-bottom:.25rem;">HERO BANNER</div><div style="font-size:.78rem;color:var(--ink-muted);">Template: '+name+'</div></div><div style="background:#fff;border:1px solid var(--border);border-left:4px solid #7c3aed;padding:1rem;margin-bottom:.75rem;"><div style="font-size:.75rem;font-weight:700;color:#7c3aed;margin-bottom:.25rem;">RICH TEXT</div><div style="font-size:.78rem;color:var(--ink-muted);">Main body content block</div></div><div style="background:#fff;border:1px solid var(--border);border-left:4px solid #2563eb;padding:1rem;"><div style="font-size:.75rem;font-weight:700;color:#2563eb;margin-bottom:.25rem;">CTA BANNER</div><div style="font-size:.78rem;color:var(--ink-muted);">Call-to-action section</div></div>';
  };
  window.igCreateTemplate = function(){
    var name = document.getElementById('tpl-name').value.trim();
    if(!name){igToast('Enter a template name','warn');return;}
    igToast('Template "'+name+'" created successfully','success');
    document.getElementById('tpl-name').value='';
    document.getElementById('tpl-desc').value='';
  };
  var _pbDragBlock = '';
  window.igPbDrag = function(idx){ _pbDragBlock = ['Hero Banner','Rich Text','Image + Text','Stats Row','Card Grid','Testimonial','CTA Banner','Accordion / FAQ','Video Embed','Divider'][idx]||'Block'; };
  window.igPbDrop = function(e){
    e.preventDefault();
    igPbAddBlock(_pbDragBlock);
  };
  window.igPbAddBlock = function(name){
    var canvas = document.getElementById('pb-canvas');
    var colors = {'Hero Banner':'var(--gold)','Rich Text':'#7c3aed','Image + Text':'#2563eb','Stats Row':'#d97706','Card Grid':'#16a34a','CTA Banner':'#dc2626','Testimonial':'#0891b2','Accordion / FAQ':'#78350f','Video Embed':'#1d4ed8','Divider':'#94a3b8'};
    var c = colors[name]||'var(--gold)';
    var empty = canvas.querySelector('.pb-empty');
    if(empty) empty.remove();
    var d = document.createElement('div');
    d.style.cssText = 'background:#fff;border:1px solid var(--border);border-left:4px solid '+c+';padding:.875rem;margin-bottom:.5rem;display:flex;align-items:center;justify-content:space-between;cursor:default;';
    d.innerHTML = '<div><div style="font-size:.72rem;font-weight:700;color:'+c+';letter-spacing:.08em;text-transform:uppercase;">'+name+'</div><div style="font-size:.68rem;color:var(--ink-muted);margin-top:.2rem;">Click to configure</div></div><div style="display:flex;gap:.35rem;"><button onclick="igToast(\''+name+' configured\',\'success\')" style="background:var(--gold);color:#fff;border:none;padding:.2rem .5rem;font-size:.6rem;cursor:pointer;font-weight:600;">Edit</button><button onclick="this.closest(\'div[style]\').remove();igToast(\'Block removed\',\'warn\')" style="background:none;border:1px solid var(--border);padding:.2rem .5rem;font-size:.6rem;cursor:pointer;color:#dc2626;"><i class=\'fas fa-trash\'></i></button></div>';
    canvas.appendChild(d);
    igToast(name+' block added to canvas','success');
  };

  /* ── J1: CMS — load pages from D1 API on mount ── */
  window.igCmsLoadPages = function(){
    var statusEl = document.getElementById('cms-d1-status');
    igApi.get('/cms/pages').then(function(d){
      if(!d){ if(statusEl) statusEl.innerHTML='<span style="color:#dc2626;">Session required</span>'; return; }
      var src = d.storage || 'fallback';
      if(statusEl){
        statusEl.innerHTML = src === 'D1'
          ? '<span style="color:#16a34a;font-weight:600;"><i class=\'fas fa-database\' style=\'margin-right:.3rem;\'></i>D1 Live — '+d.pages.length+' pages loaded</span>'
          : '<span style="color:#d97706;font-weight:600;"><i class=\'fas fa-exclamation-triangle\' style=\'margin-right:.3rem;\'></i>Fallback data — enable D1 binding for live CMS</span>';
      }
      if(d.pages && d.pages.length){
        d.pages.forEach(function(pg, idx){
          var titleEls = document.querySelectorAll('#cms-panel-'+idx+' input[type=\"text\"]');
          if(titleEls[0] && pg.title) titleEls[0].value = pg.title;
          var statusBadge = document.getElementById('cms-status-badge-'+idx);
          if(statusBadge){ statusBadge.textContent = pg.status || 'draft'; statusBadge.className='badge '+(pg.status==='published'?'b-gr':'b-g'); }
        });
        igToast('CMS: '+d.pages.length+' pages loaded from '+src,'success');
      }
    }).catch(function(){ if(statusEl) statusEl.innerHTML='<span style="color:#dc2626;">CMS load failed — admin session required</span>'; });
  };
  igCmsLoadPages();
  </script>`
  return c.html(layout('CMS', adminShell('Content Management System', 'cms', body), {noNav:true,noFooter:true}))
})

// ── USERS ─────────────────────────────────────────────────────────────────────
app.get('/users', (c) => {
  const users = [
    {name:'Super Admin',    email:'superadmin@indiagully.com', role:'Super Admin', portal:'Admin',    login:'27 Feb 2025', active:true},
    {name:'Arun Manikonda', email:'akm@indiagully.com',        role:'Director',    portal:'Board',    login:'26 Feb 2025', active:true},
    {name:'Pavan Manikonda',email:'pavan@indiagully.com',      role:'Director',    portal:'Board',    login:'26 Feb 2025', active:true},
    {name:'Amit Jhingan',   email:'amit.jhingan@indiagully.com',role:'KMP',        portal:'Board',    login:'25 Feb 2025', active:true},
    {name:'Demo Client',    email:'demo@indiagully.com',       role:'Client',      portal:'Client',   login:'27 Feb 2025', active:true},
    {name:'Demo Employee',  email:'emp@indiagully.com',        role:'Employee',    portal:'Employee', login:'24 Feb 2025', active:true},
    {name:'Demo KMP',       email:'kmp@indiagully.com',        role:'KMP',         portal:'Board',    login:'20 Feb 2025', active:true},
    {name:'Ex Employee',    email:'ex.emp@indiagully.com',     role:'Employee',    portal:'Employee', login:'01 Jan 2025', active:false},
  ]
  const body = `
  <!-- Stats -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">
    ${[{label:'Total Users',value:'8',c:'#2563eb'},{label:'Active',value:'7',c:'#16a34a'},{label:'Admin Users',value:'1',c:'#d97706'},{label:'Deactivated',value:'1',c:'#dc2626'}].map(s=>`<div class="am" style="flex:1;"><div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.5rem;">${s.label}</div><div style="font-family:'DM Serif Display',Georgia,serif;font-size:2rem;color:${s.c};">${s.value}</div></div>`).join('')}
  </div>

  <!-- Add User Panel Toggle -->
  <div style="margin-bottom:1rem;">
    <button onclick="togglePanel('add-user-panel')" style="background:var(--gold);color:#fff;border:none;padding:.5rem 1.1rem;font-size:.78rem;font-weight:600;cursor:pointer;letter-spacing:.07em;text-transform:uppercase;display:inline-flex;align-items:center;gap:.4rem;"><i class="fas fa-plus"></i>Add New User</button>
  </div>
  <div id="add-user-panel" class="ig-panel" style="margin-bottom:1.5rem;">
    <h4 style="font-size:.82rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink);margin-bottom:1rem;">Create New User</h4>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
      <div><label class="ig-label">Full Name</label><input type="text" id="new-user-name" class="ig-input" placeholder="Full Name"></div>
      <div><label class="ig-label">Email Address</label><input type="email" id="new-user-email" class="ig-input" placeholder="user@indiagully.com"></div>
      <div><label class="ig-label">Role</label><select id="new-user-role" class="ig-input"><option>Client</option><option>Employee</option><option>KMP</option><option>Director</option><option>Admin</option></select></div>
      <div><label class="ig-label">Portal Access</label><select id="new-user-portal" class="ig-input"><option>Client</option><option>Employee</option><option>Board & KMP</option><option>Admin</option></select></div>
      <div><label class="ig-label">Temporary Password</label><input type="text" class="ig-input" value="TempPass@2025!" readonly></div>
      <div><label class="ig-label">Force Password Reset?</label><select class="ig-input"><option>Yes — on first login</option><option>No</option></select></div>
    </div>
    <div style="display:flex;gap:.75rem;margin-top:1rem;">
      <button onclick="igCreateUser()" style="background:var(--gold);color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;">Create User</button>
      <button onclick="togglePanel('add-user-panel')" style="background:none;border:1px solid var(--border);padding:.55rem 1.25rem;font-size:.78rem;cursor:pointer;color:var(--ink-muted);">Cancel</button>
    </div>
  </div>

  <!-- Edit User Floating Panel -->
  <div id="edit-user-panel" class="ig-panel" style="margin-bottom:1.5rem;display:none;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;">
      <h4 id="edit-user-title" style="font-size:.82rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink);">Edit User</h4>
      <button onclick="document.getElementById('edit-user-panel').style.display='none'" style="background:none;border:none;cursor:pointer;color:var(--ink-muted);font-size:1rem;"><i class="fas fa-times"></i></button>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:.875rem;">
      <div><label class="ig-label">Full Name</label><input type="text" id="eu-name" class="ig-input" style="font-size:.82rem;"></div>
      <div><label class="ig-label">Email</label><input type="email" id="eu-email" class="ig-input" style="font-size:.82rem;"></div>
      <div><label class="ig-label">Role</label><select id="eu-role" class="ig-input" style="font-size:.82rem;"><option>Super Admin</option><option>Director</option><option>KMP</option><option>Client</option><option>Employee</option></select></div>
    </div>
    <div style="display:flex;gap:.75rem;margin-top:.875rem;">
      <button onclick="igSaveUser()" style="background:var(--gold);color:#fff;border:none;padding:.45rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;">Save Changes</button>
      <button onclick="document.getElementById('edit-user-panel').style.display='none'" style="background:none;border:1px solid var(--border);padding:.45rem 1rem;font-size:.72rem;cursor:pointer;color:var(--ink-muted);">Cancel</button>
    </div>
  </div>

  <!-- User Table -->
  <div style="background:#fff;border:1px solid var(--border);">
    <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">All Users</h3></div>
    <table class="ig-tbl" id="users-table"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Portal</th><th>Last Login</th><th>Status</th><th>Actions</th></tr></thead><tbody>
    ${users.map((u,i)=>`<tr id="user-row-${i}">
      <td id="user-name-${i}" style="font-weight:500;">${u.name}</td>
      <td style="font-size:.8rem;">${u.email}</td>
      <td id="user-role-badge-${i}"><span class="badge b-dk">${u.role}</span></td>
      <td style="font-size:.8rem;color:var(--ink-muted);">${u.portal}</td>
      <td style="font-size:.78rem;color:var(--ink-muted);">${u.login}</td>
      <td id="user-status-${i}"><span class="badge ${u.active?'b-gr':'b-re'}">${u.active?'Active':'Inactive'}</span></td>
      <td style="display:flex;gap:.5rem;flex-wrap:wrap;">
        <button onclick="igEditUser(${i},'${u.name}','${u.email}','${u.role}')" style="background:none;border:1px solid var(--border);padding:.25rem .6rem;font-size:.68rem;cursor:pointer;color:var(--gold);">Edit</button>
        <button onclick="igConfirm('Send password reset email to ${u.email}?',function(){ igToast('Reset email sent to ${u.email}','success'); })" style="background:none;border:1px solid var(--border);padding:.25rem .6rem;font-size:.68rem;cursor:pointer;color:var(--ink-muted);">Reset PW</button>
        ${u.active?`<button onclick="igToggleUser(${i},'${u.name}',false)" style="background:none;border:1px solid #fecaca;padding:.25rem .6rem;font-size:.68rem;cursor:pointer;color:#dc2626;">Deactivate</button>`:`<button onclick="igToggleUser(${i},'${u.name}',true)" style="background:none;border:1px solid #86efac;padding:.25rem .6rem;font-size:.68rem;cursor:pointer;color:#15803d;">Activate</button>`}
      </td>
    </tr>`).join('')}
    </tbody></table>
  </div>
  <script>
  var igEditIdx = -1;
  function igEditUser(idx, name, email, role){
    igEditIdx = idx;
    document.getElementById('edit-user-title').textContent = 'Edit — ' + name;
    document.getElementById('eu-name').value = name;
    document.getElementById('eu-email').value = email;
    document.getElementById('eu-role').value = role;
    var panel = document.getElementById('edit-user-panel');
    panel.style.display = 'block';
    panel.scrollIntoView({behavior:'smooth',block:'nearest'});
  }
  function igSaveUser(){
    if(igEditIdx < 0) return;
    var name = document.getElementById('eu-name').value.trim();
    var role = document.getElementById('eu-role').value;
    if(!name){ igToast('Name cannot be empty','warn'); return; }
    document.getElementById('user-name-'+igEditIdx).textContent = name;
    document.getElementById('user-role-badge-'+igEditIdx).innerHTML = '<span class="badge b-dk">'+role+'</span>';
    document.getElementById('edit-user-panel').style.display = 'none';
    igToast(name+' updated successfully','success');
  }
  function igToggleUser(idx, name, activate){
    igConfirm((activate?'Activate':'Deactivate')+' user '+name+'?',function(){
      var cell = document.getElementById('user-status-'+idx);
      if(cell) cell.innerHTML = activate?'<span class="badge b-gr">Active</span>':'<span class="badge b-re">Inactive</span>';
      igToast(name+(activate?' activated':' deactivated'), activate?'success':'warn');
    });
  }
  function igCreateUser(){
    var name  = document.getElementById('new-user-name').value.trim();
    var email = document.getElementById('new-user-email').value.trim();
    var role  = document.getElementById('new-user-role').value;
    var portal = document.getElementById('new-user-portal').value;
    if(!name || !email){ igToast('Name and email are required','warn'); return; }
    if(!email.includes('@')){ igToast('Please enter a valid email address','warn'); return; }
    igToast('User '+name+' created! Welcome email sent to '+email,'success');
    togglePanel('add-user-panel');
    // Add to table
    var tbody = document.querySelector('#users-table tbody');
    var idx = document.querySelectorAll('#users-table tbody tr').length;
    var tr = document.createElement('tr');
    tr.id = 'user-row-'+idx;
    tr.innerHTML = '<td id="user-name-'+idx+'" style="font-weight:500;">'+name+'</td>'
      +'<td style="font-size:.8rem;">'+email+'</td>'
      +'<td id="user-role-badge-'+idx+'"><span class="badge b-dk">'+role+'</span></td>'
      +'<td style="font-size:.8rem;color:var(--ink-muted);">'+portal+'</td>'
      +'<td style="font-size:.78rem;color:var(--ink-muted);">Just now</td>'
      +'<td id="user-status-'+idx+'"><span class="badge b-gr">Active</span></td>'
      +'<td style="display:flex;gap:.5rem;">'
      +'<button onclick="igEditUser('+idx+',\''+name+'\',\''+email+'\',\''+role+'\')" style="background:none;border:1px solid var(--border);padding:.25rem .6rem;font-size:.68rem;cursor:pointer;color:var(--gold);">Edit</button>'
      +'<button onclick="igToggleUser('+idx+',\''+name+'\',false)" style="background:none;border:1px solid #fecaca;padding:.25rem .6rem;font-size:.68rem;cursor:pointer;color:#dc2626;">Deactivate</button>'
      +'</td>';
    tbody.appendChild(tr);
    document.getElementById('new-user-name').value='';
    document.getElementById('new-user-email').value='';
  }
  </script>`
  return c.html(layout('User Management', adminShell('User Management', 'users', body), {noNav:true,noFooter:true}))
})

// ── WORKFLOWS ─────────────────────────────────────────────────────────────────
app.get('/workflows', (c) => {
  const WF = [
    {id:'wf0', name:'Invoice Approval',    cat:'Finance',    icon:'file-invoice',   color:'#2563eb',
     steps:[{n:'Submit Invoice',role:'Submitter',sla:2,action:'Form submission'},{n:'Finance Review',role:'Finance Manager',sla:24,action:'Amount & GST check'},{n:'Director Approval',role:'Director',sla:48,action:'Digital signature required'},{n:'GST Filing',role:'Finance',sla:24,action:'Auto-file to GST portal'},{n:'Archive',role:'System',sla:1,action:'Auto-archive to R2'}],
     trigger:'Invoice amount > ₹50,000 submitted', active:true, runs:24, lastRun:'28 Feb 2025', avgTime:'38h'},
    {id:'wf1', name:'Mandate Onboarding', cat:'Operations', icon:'handshake',       color:'#B8960C',
     steps:[{n:'Enquiry Received',role:'Sales',sla:2,action:'Log in CRM'},{n:'KYC Verification',role:'Compliance',sla:48,action:'PAN/Aadhar check'},{n:'NDA Execution',role:'Legal',sla:72,action:'DocuSign NDA'},{n:'Engagement Letter',role:'Director',sla:48,action:'EL approval & signing'},{n:'Activate Mandate',role:'System',sla:1,action:'Create portal & folders'}],
     trigger:'New client enquiry form submitted', active:true, runs:8, lastRun:'25 Feb 2025', avgTime:'5d'},
    {id:'wf2', name:'Leave Approval',     cat:'HR',         icon:'calendar-check',  color:'#16a34a',
     steps:[{n:'Employee Request',role:'Employee',sla:1,action:'Submit leave form'},{n:'Reporting Manager',role:'Manager',sla:24,action:'Approve/reject'},{n:'HR Confirmation',role:'HR',sla:4,action:'Update leave ledger'},{n:'Attendance Update',role:'System',sla:1,action:'Auto-update attendance records'}],
     trigger:'Leave application submitted by employee', active:true, runs:12, lastRun:'05 Mar 2025', avgTime:'28h'},
    {id:'wf3', name:'Contract Renewal',   cat:'Legal',      icon:'file-signature',  color:'#7c3aed',
     steps:[{n:'Auto Alert 30d',role:'System',sla:1,action:'Email to Director'},{n:'Legal Review',role:'Legal',sla:48,action:'Review terms & update'},{n:'Director Sign',role:'Director',sla:72,action:'DocuSign renewal'},{n:'Archive Old',role:'System',sla:1,action:'Archive expired contract'}],
     trigger:'Contract expiry within 30 days', active:false, runs:3, lastRun:'15 Jan 2025', avgTime:'4d'},
    {id:'wf4', name:'Vendor Onboarding',  cat:'Finance',    icon:'store',           color:'#d97706',
     steps:[{n:'Vendor Request',role:'Finance',sla:4,action:'Submit vendor form'},{n:'Compliance Check',role:'Compliance',sla:48,action:'GSTIN & PAN verify'},{n:'Finance Approval',role:'CFO',sla:24,action:'Approve vendor terms'},{n:'Activate Vendor',role:'System',sla:1,action:'Create vendor in Vyapar'}],
     trigger:'New vendor onboarding form submitted', active:true, runs:6, lastRun:'20 Feb 2025', avgTime:'3d'},
    {id:'wf5', name:'Board Resolution',   cat:'Governance', icon:'gavel',           color:'#dc2626',
     steps:[{n:'Draft Resolution',role:'Director',sla:24,action:'Draft in portal'},{n:'Director Review',role:'All Directors',sla:48,action:'Comments & edits'},{n:'Vote',role:'Board',sla:72,action:'Digital vote'},{n:'File ROC',role:'CS',sla:48,action:'MGT-14 with ROC'}],
     trigger:'Board meeting scheduled', active:true, runs:5, lastRun:'28 Feb 2025', avgTime:'6d'},
  ]

  const runHistory = [
    {wf:'Invoice Approval',    id:'RUN-INV-047', started:'28 Feb 10:14', ended:'28 Feb 22:07', duration:'11h 53m', status:'Completed', triggered:'INV-2025-003 submitted'},
    {wf:'Leave Approval',      id:'RUN-LV-012',  started:'05 Mar 09:30', ended:'05 Mar 12:45', duration:'3h 15m',  status:'Completed', triggered:'Amit Jhingan leave request'},
    {wf:'Mandate Onboarding',  id:'RUN-MND-008', started:'25 Feb 14:00', ended:null,           duration:'—',       status:'In Progress',triggered:'New HORECA client enquiry'},
    {wf:'Contract Renewal',    id:'RUN-CR-003',  started:'01 Mar 00:00', ended:'04 Mar 11:30', duration:'3d 11h',  status:'Completed', triggered:'EY Retainer expiry alert'},
    {wf:'Invoice Approval',    id:'RUN-INV-046', started:'25 Feb 16:22', ended:'26 Feb 09:14', duration:'16h 52m', status:'Completed', triggered:'INV-2025-002 submitted'},
    {wf:'Board Resolution',    id:'RUN-BR-005',  started:'28 Feb 11:00', ended:null,           duration:'—',       status:'In Progress',triggered:'Q1 Board meeting scheduled'},
  ]

  const body = `
  <!-- Summary Cards -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">
    ${[
      {label:'Total Workflows',  value:'6',    sub:'5 active · 1 paused', c:'#2563eb'},
      {label:'Runs This Month',  value:'14',   sub:'4 completed today',    c:'#16a34a'},
      {label:'Avg Completion',   value:'38h',  sub:'Within SLA targets',   c:'#B8960C'},
      {label:'SLA Breaches',     value:'0',    sub:'All on time',          c:'#16a34a'},
    ].map(s=>`<div class="am"><div style="font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.4rem;">${s.label}</div><div style="font-family:'DM Serif Display',Georgia,serif;font-size:2rem;color:${s.c};line-height:1;">${s.value}</div><div style="font-size:.68rem;color:var(--ink-muted);margin-top:.2rem;">${s.sub}</div></div>`).join('')}
  </div>

  <!-- Tab Nav -->
  <div style="display:flex;gap:0;margin-bottom:1.5rem;border-bottom:2px solid var(--border);">
    ${['Workflow Library','Visual Builder','Run History','Settings'].map((t,i)=>`<button onclick="igWfTab(${i})" id="wf-tab-${i}" style="padding:.6rem 1.1rem;font-size:.78rem;font-weight:600;cursor:pointer;border:none;background:none;color:${i===0?'var(--gold)':'var(--ink-muted)'};border-bottom:${i===0?'2px solid var(--gold)':'2px solid transparent'};letter-spacing:.04em;text-transform:uppercase;margin-bottom:-2px;">${t}</button>`).join('')}
  </div>

  <!-- Tab 0: Workflow Library -->
  <div id="wf-pane-0">
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;">
      ${WF.map((w,i)=>`
      <div style="background:#fff;border:1px solid var(--border);border-top:3px solid ${w.color};">
        <div style="padding:1rem 1.1rem .75rem;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.625rem;">
            <div style="display:flex;align-items:center;gap:.5rem;">
              <div style="width:28px;height:28px;background:${w.color};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <i class="fas fa-${w.icon}" style="color:#fff;font-size:.68rem;"></i>
              </div>
              <div>
                <div style="font-size:.85rem;font-weight:600;color:var(--ink);">${w.name}</div>
                <span class="badge b-dk" style="font-size:.55rem;">${w.cat}</span>
              </div>
            </div>
            <span class="badge ${w.active?'b-gr':'b-re'}" style="font-size:.6rem;">${w.active?'Active':'Paused'}</span>
          </div>
          <!-- Visual step pipeline -->
          <div style="display:flex;align-items:center;gap:.2rem;margin-bottom:.75rem;overflow-x:auto;padding:.25rem 0;">
            ${w.steps.map((s,si)=>`
              <div style="display:flex;align-items:center;flex-shrink:0;">
                <div style="background:${w.active?w.color:'#94a3b8'};color:#fff;font-size:.55rem;font-weight:700;padding:.2rem .45rem;white-space:nowrap;position:relative;">${si+1}</div>
                <div style="font-size:.62rem;color:${w.active?'var(--ink)':'var(--ink-muted)'};background:${w.active?'#f0f9ff':'#f8fafc'};padding:.2rem .45rem;white-space:nowrap;border:1px solid ${w.active?'#bae6fd':'#e2e8f0'};">${s.n}</div>
                ${si<w.steps.length-1?`<div style="color:${w.color};font-size:.6rem;margin:0 .1rem;">→</div>`:''}
              </div>`).join('')}
          </div>
          <div style="font-size:.68rem;color:var(--ink-muted);margin-bottom:.5rem;"><i class="fas fa-bolt" style="color:#d97706;margin-right:.3rem;font-size:.6rem;"></i>${w.trigger}</div>
          <div style="display:flex;gap:1rem;font-size:.65rem;color:var(--ink-muted);border-top:1px solid var(--border);padding-top:.5rem;margin-top:.5rem;">
            <span><b style="color:var(--ink);">${w.runs}</b> runs</span>
            <span>Last: <b style="color:var(--ink);">${w.lastRun}</b></span>
            <span>Avg: <b style="color:var(--ink);">${w.avgTime}</b></span>
          </div>
        </div>
        <div style="border-top:1px solid var(--border);padding:.625rem 1rem;display:flex;gap:.5rem;background:#fafaf8;">
          <button onclick="igWfOpen(${i})" style="flex:1;background:${w.color};color:#fff;border:none;padding:.35rem .5rem;font-size:.68rem;font-weight:600;cursor:pointer;"><i class="fas fa-sitemap" style="margin-right:.3rem;"></i>Edit Flow</button>
          <button onclick="igConfirm('${w.active?'Pause':'Activate'} &quot;${w.name}&quot; workflow?',function(){ igToast('${w.name} ${w.active?'paused':'activated'}','${w.active?'warn':'success'}'); })" style="background:none;border:1px solid var(--border);padding:.35rem .65rem;font-size:.68rem;cursor:pointer;color:var(--ink-muted);" title="${w.active?'Pause':'Activate'}"><i class="fas fa-${w.active?'pause':'play'}"></i></button>
          <button onclick="igToast('Test run started for ${w.name}','success')" style="background:none;border:1px solid var(--border);padding:.35rem .65rem;font-size:.68rem;cursor:pointer;color:var(--ink-muted);" title="Test Run"><i class="fas fa-vial"></i></button>
        </div>
      </div>`).join('')}
    </div>
    <div style="margin-top:1rem;">
      <button onclick="igWfTab(1)" style="background:var(--gold);color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-plus" style="margin-right:.4rem;"></i>Create New Workflow</button>
    </div>
  </div>

  <!-- Tab 1: Visual Builder -->
  <div id="wf-pane-1" style="display:none;">
    <div style="display:grid;grid-template-columns:280px 1fr;gap:1.25rem;">
      <!-- Config Panel -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:.875rem 1rem;border-bottom:1px solid var(--border);font-weight:600;font-size:.825rem;color:var(--ink);">⚙️ Workflow Config</div>
        <div style="padding:1rem;">
          <label class="ig-label">Workflow Name</label>
          <input type="text" id="wfb-name" class="ig-input" placeholder="e.g. New Client KYC" style="font-size:.82rem;margin-bottom:.75rem;">
          <label class="ig-label">Category</label>
          <select id="wfb-cat" class="ig-input" style="font-size:.82rem;margin-bottom:.75rem;">
            <option>Finance</option><option>HR</option><option>Operations</option><option>Legal</option><option>Governance</option><option>IT</option>
          </select>
          <label class="ig-label">Trigger Event</label>
          <select id="wfb-trigger" class="ig-input" style="font-size:.82rem;margin-bottom:.75rem;">
            <option>Form submitted</option>
            <option>Invoice created</option>
            <option>Leave requested</option>
            <option>Contract expiring</option>
            <option>New employee added</option>
            <option>Scheduled (daily)</option>
            <option>Scheduled (weekly)</option>
            <option>Board meeting created</option>
            <option>Custom webhook</option>
          </select>
          <label class="ig-label">Trigger Condition</label>
          <input type="text" id="wfb-condition" class="ig-input" placeholder="e.g. amount > 50000" style="font-size:.82rem;margin-bottom:.75rem;">
          <label class="ig-label">Overall SLA</label>
          <select class="ig-input" style="font-size:.82rem;margin-bottom:.875rem;">
            <option>24 hours</option><option>48 hours</option><option>72 hours</option><option>5 business days</option><option>7 days</option><option>Custom</option>
          </select>
          <label class="ig-label">Notifications</label>
          <div style="display:flex;flex-direction:column;gap:.4rem;margin-bottom:.875rem;">
            ${['Email on step complete','Email on SLA breach','WhatsApp alerts','In-app notifications'].map(n=>`<label style="display:flex;align-items:center;gap:.5rem;font-size:.78rem;color:var(--ink);cursor:pointer;"><input type="checkbox" ${n.includes('Email')||n.includes('In-app')?'checked':''} style="cursor:pointer;">${n}</label>`).join('')}
          </div>
          <hr style="border:none;border-top:1px solid var(--border);margin:.875rem 0;">
          <h5 style="font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--ink-muted);margin-bottom:.625rem;">Add Step Block</h5>
          ${[
            {icon:'user-check',  color:'#2563eb',  type:'Approval',    desc:'Human approval gate'},
            {icon:'robot',       color:'#7c3aed',  type:'Automated',   desc:'System auto-action'},
            {icon:'envelope',    color:'#d97706',  type:'Notify',      desc:'Send email/WhatsApp'},
            {icon:'file-alt',    color:'#16a34a',  type:'Document',    desc:'Create/file document'},
            {icon:'code-branch', color:'#dc2626',  type:'Condition',   desc:'Branch on condition'},
            {icon:'clock',       color:'#475569',  type:'Wait',        desc:'Time delay / SLA hold'},
          ].map(b=>`<button onclick="igAddWfStep('${b.type}')" style="display:flex;align-items:center;gap:.5rem;width:100%;background:#f8fafc;border:1px solid var(--border);padding:.45rem .625rem;margin-bottom:.35rem;cursor:pointer;text-align:left;">
            <div style="width:24px;height:24px;background:${b.color};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <i class="fas fa-${b.icon}" style="color:#fff;font-size:.55rem;"></i>
            </div>
            <div>
              <div style="font-size:.72rem;font-weight:600;color:var(--ink);">${b.type}</div>
              <div style="font-size:.62rem;color:var(--ink-muted);">${b.desc}</div>
            </div>
          </button>`).join('')}
        </div>
      </div>
      <!-- Canvas -->
      <div>
        <div style="background:#fff;border:1px solid var(--border);padding:1rem;margin-bottom:1rem;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
            <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Flow Canvas</h3>
            <div style="display:flex;gap:.5rem;">
              <button onclick="igWfSave()" style="background:var(--gold);color:#fff;border:none;padding:.4rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;"><i class="fas fa-save" style="margin-right:.3rem;"></i>Save Workflow</button>
              <button onclick="igWfClear()" style="background:none;border:1px solid var(--border);padding:.4rem .875rem;font-size:.72rem;cursor:pointer;color:var(--ink-muted);">Clear</button>
            </div>
          </div>
          <!-- Trigger node -->
          <div style="display:flex;align-items:center;margin-bottom:.5rem;">
            <div style="background:#fef3c7;border:2px solid #d97706;padding:.625rem 1rem;font-size:.78rem;font-weight:600;color:#92400e;min-width:160px;text-align:center;">
              <i class="fas fa-bolt" style="margin-right:.4rem;"></i>TRIGGER
            </div>
            <div style="width:40px;height:2px;background:#d97706;"></div>
            <div style="font-size:.68rem;color:#92400e;background:#fffbeb;border:1px solid #fde68a;padding:.3rem .6rem;">Form submitted</div>
          </div>
          <!-- Steps canvas -->
          <div id="wfb-canvas" style="border:2px dashed var(--border);min-height:280px;padding:1.25rem;background:#fafaf8;position:relative;">
            <div id="wfb-steps-container">
              <!-- Steps rendered here by JS -->
              <div id="wfb-empty" style="text-align:center;color:var(--ink-muted);font-size:.82rem;padding:3rem 0;">
                <i class="fas fa-plus-circle" style="font-size:2rem;color:var(--border);display:block;margin-bottom:.75rem;"></i>
                Add step blocks from the left panel to build your workflow
              </div>
            </div>
          </div>
        </div>
        <!-- Step Detail Editor (shown when clicking a step) -->
        <div id="wfb-step-editor" style="display:none;background:#fff;border:1px solid var(--border);border-left:4px solid #2563eb;">
          <div style="padding:.75rem 1rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
            <div style="font-weight:600;font-size:.82rem;color:var(--ink);" id="wfb-step-title">Step Configuration</div>
            <button onclick="document.getElementById('wfb-step-editor').style.display='none'" style="background:none;border:none;cursor:pointer;color:var(--ink-muted);font-size:1rem;">✕</button>
          </div>
          <div style="padding:1rem;display:grid;grid-template-columns:1fr 1fr;gap:.875rem;">
            <div><label class="ig-label">Step Name</label><input type="text" id="wfb-sname" class="ig-input" style="font-size:.82rem;"></div>
            <div><label class="ig-label">Assigned Role</label><select id="wfb-srole" class="ig-input" style="font-size:.82rem;"><option>Director</option><option>Finance Manager</option><option>HR Manager</option><option>Compliance Officer</option><option>Company Secretary</option><option>System (Auto)</option></select></div>
            <div><label class="ig-label">SLA (hours)</label><input type="number" id="wfb-ssla" class="ig-input" value="24" style="font-size:.82rem;"></div>
            <div><label class="ig-label">Action Required</label><input type="text" id="wfb-saction" class="ig-input" placeholder="e.g. Review and approve" style="font-size:.82rem;"></div>
            <div style="grid-column:span 2;"><label class="ig-label">Escalation After SLA Breach</label><select class="ig-input" style="font-size:.82rem;"><option>Email Director</option><option>WhatsApp alert</option><option>Auto-escalate to MD</option><option>Skip step</option></select></div>
            <div style="grid-column:span 2;"><label class="ig-label">Notes / Instructions</label><textarea class="ig-input" rows="2" style="font-size:.82rem;" placeholder="Instructions for the assignee..."></textarea></div>
            <div style="grid-column:span 2;display:flex;gap:.75rem;">
              <button onclick="igSaveWfStep()" style="background:#2563eb;color:#fff;border:none;padding:.45rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;">Save Step</button>
              <button onclick="igDeleteWfStep()" style="background:#dc2626;color:#fff;border:none;padding:.45rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;">Delete Step</button>
              <button onclick="document.getElementById('wfb-step-editor').style.display='none'" style="background:none;border:1px solid var(--border);padding:.45rem 1rem;font-size:.72rem;cursor:pointer;color:var(--ink-muted);">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Tab 2: Run History -->
  <div id="wf-pane-2" style="display:none;">
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Workflow Run History</h3>
        <button onclick="igToast('Run history exported','success')" style="background:none;border:1px solid var(--border);padding:.3rem .75rem;font-size:.68rem;cursor:pointer;color:var(--gold);"><i class="fas fa-download" style="margin-right:.3rem;"></i>Export</button>
      </div>
      <table class="ig-tbl">
        <thead><tr><th>Run ID</th><th>Workflow</th><th>Trigger</th><th>Started</th><th>Ended</th><th>Duration</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          ${runHistory.map(r=>`<tr>
            <td style="font-size:.75rem;font-weight:600;color:var(--gold);">${r.id}</td>
            <td style="font-size:.82rem;font-weight:500;">${r.wf}</td>
            <td style="font-size:.75rem;color:var(--ink-muted);">${r.triggered}</td>
            <td style="font-size:.78rem;">${r.started}</td>
            <td style="font-size:.78rem;color:${r.ended?'var(--ink)':'var(--ink-muted)'};">${r.ended||'—'}</td>
            <td style="font-size:.78rem;">${r.duration}</td>
            <td><span class="badge ${r.status==='Completed'?'b-gr':r.status==='In Progress'?'b-g':'b-re'}">${r.status}</span></td>
            <td><button onclick="igToast('Run ${r.id} — viewing audit trail','success')" style="background:none;border:1px solid var(--border);padding:.22rem .5rem;font-size:.65rem;cursor:pointer;color:var(--gold);">View</button></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <!-- Run Analytics -->
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-top:1.25rem;">
      ${WF.map(w=>`<div style="background:#fff;border:1px solid var(--border);border-left:3px solid ${w.color};padding:1rem;">
        <div style="font-size:.78rem;font-weight:600;color:var(--ink);margin-bottom:.375rem;">${w.name}</div>
        <div style="display:flex;gap:1rem;font-size:.72rem;color:var(--ink-muted);">
          <span>Runs: <b style="color:var(--ink);">${w.runs}</b></span>
          <span>Avg: <b style="color:var(--ink);">${w.avgTime}</b></span>
          <span class="badge ${w.active?'b-gr':'b-re'}" style="font-size:.55rem;">${w.active?'Active':'Paused'}</span>
        </div>
        <div style="margin-top:.5rem;background:var(--parch-dk);height:4px;border-radius:2px;">
          <div style="height:100%;background:${w.color};width:${Math.floor(60+Math.random()*35)}%;border-radius:2px;"></div>
        </div>
      </div>`).join('')}
    </div>
  </div>

  <!-- Tab 3: Settings -->
  <div id="wf-pane-3" style="display:none;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;">
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);font-weight:600;font-size:.85rem;color:var(--ink);">Global Workflow Settings</div>
        <div style="padding:1.25rem;display:flex;flex-direction:column;gap:.875rem;">
          <div><label class="ig-label">Default SLA for Approval Steps (hours)</label><input type="number" class="ig-input" value="24" style="font-size:.82rem;"></div>
          <div><label class="ig-label">SLA Escalation Email</label><input type="email" class="ig-input" value="akm@indiagully.com" style="font-size:.82rem;"></div>
          <div><label class="ig-label">Workflow Engine Mode</label><select class="ig-input" style="font-size:.82rem;"><option selected>Standard (Manual Triggers)</option><option>Automated (All triggers live)</option><option>Sandbox (Test mode)</option></select></div>
          <div style="display:flex;flex-direction:column;gap:.5rem;">
            <label class="ig-label">Global Options</label>
            ${['Enable email notifications','Enable WhatsApp alerts','Log all workflow events','Auto-archive completed runs after 90 days','Send weekly digest to Director'].map((o,i)=>`<label style="display:flex;align-items:center;gap:.5rem;font-size:.78rem;cursor:pointer;"><input type="checkbox" ${i<3?'checked':''} style="cursor:pointer;">${o}</label>`).join('')}
          </div>
          <button onclick="igToast('Global workflow settings saved','success')" style="background:var(--gold);color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;align-self:flex-start;">Save Settings</button>
        </div>
      </div>
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);font-weight:600;font-size:.85rem;color:var(--ink);">SLA & Escalation Matrix</div>
        <div style="padding:1.25rem;">
          <table class="ig-tbl">
            <thead><tr><th>Category</th><th>Default SLA</th><th>Escalate To</th><th>Method</th></tr></thead>
            <tbody>
              ${[
                {cat:'Finance',    sla:'24h',  esc:'MD',       method:'Email'},
                {cat:'HR',         sla:'48h',  esc:'Director', method:'Email + WA'},
                {cat:'Legal',      sla:'72h',  esc:'MD',       method:'Email'},
                {cat:'Governance', sla:'96h',  esc:'MD + CS',  method:'Email + WA'},
                {cat:'Operations', sla:'48h',  esc:'Director', method:'Email'},
              ].map(r=>`<tr>
                <td><span class="badge b-dk">${r.cat}</span></td>
                <td style="font-size:.82rem;">${r.sla}</td>
                <td style="font-size:.82rem;">${r.esc}</td>
                <td style="font-size:.75rem;color:var(--ink-muted);">${r.method}</td>
              </tr>`).join('')}
            </tbody>
          </table>
          <button onclick="igToast('SLA matrix updated','success')" style="background:var(--gold);color:#fff;border:none;padding:.45rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;margin-top:1rem;">Update Matrix</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Workflow Detail Modal -->
  <div id="wf-detail-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:9999;align-items:center;justify-content:center;">
    <div style="background:#fff;width:720px;max-width:95vw;max-height:90vh;overflow-y:auto;border-top:4px solid #2563eb;">
      <div style="padding:1.25rem 1.5rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);" id="wf-modal-title">Workflow Detail</div>
        <button onclick="document.getElementById('wf-detail-modal').style.display='none'" style="background:none;border:none;font-size:1.2rem;cursor:pointer;color:var(--ink-muted);">✕</button>
      </div>
      <div style="padding:1.5rem;" id="wf-modal-body"></div>
    </div>
  </div>

  <script>
  var WF_DATA = ${JSON.stringify(WF)};
  var wfbSteps = [];
  var wfbActiveStep = -1;

  window.igWfTab = function(idx){
    for(var i=0;i<4;i++){
      var p=document.getElementById('wf-pane-'+i);
      var t=document.getElementById('wf-tab-'+i);
      if(p) p.style.display=i===idx?'block':'none';
      if(t){ t.style.color=i===idx?'var(--gold)':'var(--ink-muted)'; t.style.borderBottom=i===idx?'2px solid var(--gold)':'2px solid transparent'; }
    }
  };

  window.igWfOpen = function(idx){
    var w = WF_DATA[idx];
    if(!w) return;
    document.getElementById('wf-modal-title').textContent = w.name + ' — Workflow Detail';
    var stepColors = {Approval:'#2563eb',Automated:'#7c3aed',Notify:'#d97706',Document:'#16a34a',Condition:'#dc2626',Wait:'#475569'};
    var html = '<div style="margin-bottom:1.25rem;padding:.875rem;background:#f0f9ff;border:1px solid #bae6fd;"><div style="font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#1d4ed8;margin-bottom:.25rem;">Trigger</div><div style="font-size:.875rem;color:var(--ink);"><i class="fas fa-bolt" style="color:#d97706;margin-right:.4rem;"></i>'+w.trigger+'</div></div>';
    html += '<h4 style="font-size:.82rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--ink-muted);margin-bottom:1rem;">Steps ('+w.steps.length+')</h4>';
    html += '<div style="display:flex;flex-direction:column;gap:.625rem;">';
    w.steps.forEach(function(s,i){
      html += '<div style="display:grid;grid-template-columns:32px 1fr;gap:.75rem;align-items:start;">';
      html += '<div style="width:32px;height:32px;background:#2563eb;display:flex;align-items:center;justify-content:center;color:#fff;font-size:.75rem;font-weight:700;flex-shrink:0;">'+(i+1)+'</div>';
      html += '<div style="background:#f8fafc;border:1px solid var(--border);padding:.75rem;">';
      html += '<div style="font-size:.875rem;font-weight:600;color:var(--ink);margin-bottom:.4rem;">'+s.n+'</div>';
      html += '<div style="display:flex;gap:1rem;font-size:.72rem;color:var(--ink-muted);">';
      html += '<span><i class="fas fa-user" style="margin-right:.3rem;"></i>'+s.role+'</span>';
      html += '<span><i class="fas fa-clock" style="margin-right:.3rem;"></i>SLA: '+s.sla+'h</span>';
      html += '<span><i class="fas fa-tasks" style="margin-right:.3rem;"></i>'+s.action+'</span>';
      html += '</div></div></div>';
    });
    html += '</div>';
    html += '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:.875rem;margin-top:1.25rem;">';
    html += '<div style="text-align:center;padding:.75rem;background:#f8fafc;border:1px solid var(--border);"><div style="font-size:1.5rem;font-weight:700;color:#16a34a;">'+w.runs+'</div><div style="font-size:.72rem;color:var(--ink-muted);">Total Runs</div></div>';
    html += '<div style="text-align:center;padding:.75rem;background:#f8fafc;border:1px solid var(--border);"><div style="font-size:1.5rem;font-weight:700;color:#2563eb;">'+w.avgTime+'</div><div style="font-size:.72rem;color:var(--ink-muted);">Avg Time</div></div>';
    html += '<div style="text-align:center;padding:.75rem;background:#f8fafc;border:1px solid var(--border);"><div style="font-size:1.5rem;font-weight:700;color:'+(w.active?'#16a34a':'#dc2626')+';">'+(w.active?'Active':'Paused')+'</div><div style="font-size:.72rem;color:var(--ink-muted);">Status</div></div>';
    html += '</div>';
    html += '<div style="margin-top:1.25rem;display:flex;gap:.75rem;">';
    html += '<button onclick="igToast(\\'Test run started for '+w.name+'\\',\\'success\\');document.getElementById(\\'wf-detail-modal\\').style.display=\\'none\\';" style="background:#2563eb;color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class=\\'fas fa-vial\\' style=\\'margin-right:.4rem;\\'></i>Run Test</button>';
    html += '<button onclick="document.getElementById(\\'wf-detail-modal\\').style.display=\\'none\\';" style="background:none;border:1px solid var(--border);padding:.55rem 1.25rem;font-size:.78rem;cursor:pointer;color:var(--ink-muted);">Close</button>';
    html += '</div>';
    document.getElementById('wf-modal-body').innerHTML = html;
    var m=document.getElementById('wf-detail-modal'); m.style.display='flex'; m.style.alignItems='center'; m.style.justifyContent='center';
  };

  window.igAddWfStep = function(type){
    var colorMap = {Approval:'#2563eb',Automated:'#7c3aed',Notify:'#d97706',Document:'#16a34a',Condition:'#dc2626',Wait:'#475569'};
    var iconMap  = {Approval:'user-check',Automated:'robot',Notify:'envelope',Document:'file-alt',Condition:'code-branch',Wait:'clock'};
    var idx = wfbSteps.length;
    wfbSteps.push({type:type, name:type+' Step '+(idx+1), role:'Director', sla:24, action:''});
    renderWfCanvas();
    igToast(type+' step added to canvas','success');
    editWfStep(idx);
  };

  function renderWfCanvas(){
    var c = document.getElementById('wfb-steps-container');
    var e = document.getElementById('wfb-empty');
    if(wfbSteps.length===0){ if(e) e.style.display='block'; return; }
    if(e) e.style.display='none';
    var colorMap = {Approval:'#2563eb',Automated:'#7c3aed',Notify:'#d97706',Document:'#16a34a',Condition:'#dc2626',Wait:'#475569'};
    var iconMap  = {Approval:'user-check',Automated:'robot',Notify:'envelope',Document:'file-alt',Condition:'code-branch',Wait:'clock'};
    var html = '<div style="display:flex;align-items:flex-start;gap:.5rem;flex-wrap:wrap;">';
    wfbSteps.forEach(function(s,i){
      html += '<div style="display:flex;align-items:center;">';
      html += '<div onclick="editWfStep('+i+')" style="cursor:pointer;background:#fff;border:2px solid '+(wfbActiveStep===i?colorMap[s.type]||'#2563eb':'var(--border)')+';padding:.75rem;min-width:120px;text-align:center;position:relative;">';
      html += '<div style="width:28px;height:28px;background:'+(colorMap[s.type]||'#2563eb')+';margin:0 auto .4rem;display:flex;align-items:center;justify-content:center;">';
      html += '<i class="fas fa-'+(iconMap[s.type]||'circle')+'" style="color:#fff;font-size:.6rem;"></i></div>';
      html += '<div style="font-size:.7rem;font-weight:600;color:var(--ink);">'+s.name+'</div>';
      html += '<div style="font-size:.6rem;color:var(--ink-muted);margin-top:.2rem;">'+s.role+'</div>';
      html += '<div style="font-size:.58rem;color:var(--ink-muted);">SLA: '+s.sla+'h</div>';
      html += '</div>';
      if(i<wfbSteps.length-1) html += '<div style="width:32px;height:2px;background:'+(colorMap[s.type]||'#2563eb')+'margin:0 .1rem;flex-shrink:0;"></div>';
      html += '</div>';
    });
    html += '</div>';
    c.innerHTML = html;
  }

  function editWfStep(idx){
    wfbActiveStep = idx;
    var s = wfbSteps[idx];
    if(!s) return;
    document.getElementById('wfb-step-title').textContent = 'Editing: ' + s.name;
    document.getElementById('wfb-sname').value = s.name;
    document.getElementById('wfb-ssla').value = s.sla;
    document.getElementById('wfb-saction').value = s.action||'';
    document.getElementById('wfb-step-editor').style.display='block';
    renderWfCanvas();
  }
  window.editWfStep = editWfStep;

  window.igSaveWfStep = function(){
    if(wfbActiveStep<0) return;
    wfbSteps[wfbActiveStep].name   = document.getElementById('wfb-sname').value||wfbSteps[wfbActiveStep].name;
    wfbSteps[wfbActiveStep].sla    = parseInt(document.getElementById('wfb-ssla').value)||24;
    wfbSteps[wfbActiveStep].action = document.getElementById('wfb-saction').value;
    renderWfCanvas();
    document.getElementById('wfb-step-editor').style.display='none';
    wfbActiveStep = -1;
    igToast('Step saved','success');
  };

  window.igDeleteWfStep = function(){
    if(wfbActiveStep<0) return;
    wfbSteps.splice(wfbActiveStep,1);
    wfbActiveStep = -1;
    renderWfCanvas();
    document.getElementById('wfb-step-editor').style.display='none';
    igToast('Step removed','warn');
  };

  window.igWfSave = function(){
    var name = document.getElementById('wfb-name').value.trim();
    if(!name){ igToast('Enter a workflow name','warn'); return; }
    if(wfbSteps.length===0){ igToast('Add at least one step','warn'); return; }
    igToast('Workflow "'+name+'" saved with '+wfbSteps.length+' steps','success');
    igWfTab(0);
    document.getElementById('wfb-name').value='';
    wfbSteps=[];
    wfbActiveStep=-1;
    renderWfCanvas();
  };

  window.igWfClear = function(){
    igConfirm('Clear all steps from the canvas?',function(){
      wfbSteps=[]; wfbActiveStep=-1;
      renderWfCanvas();
      document.getElementById('wfb-step-editor').style.display='none';
      igToast('Canvas cleared','warn');
    });
  };
  </script>`
  return c.html(layout('Workflow Engine', adminShell('Workflow Engine', 'workflows', body), {noNav:true,noFooter:true}))
})

// ── FINANCE ERP ───────────────────────────────────────────────────────────────
app.get('/finance', (c) => {
  const body = `
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">
    ${[{label:'Revenue MTD',value:'₹12.4L',trend:'↑ +8.3%',c:'#16a34a'},{label:'Expenses MTD',value:'₹7.8L',trend:'↓ -2.1%',c:'#dc2626'},{label:'Net Profit',value:'₹4.6L',trend:'37.1% margin',c:'#2563eb'},{label:'GST Liability',value:'₹2.1L',trend:'Due 20 Mar',c:'#d97706'}].map((s,i)=>`<div class="am fin-kpi"><div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.5rem;">${s.label}</div><div class="kpi-v" style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:var(--ink);line-height:1;margin-bottom:.3rem;">${s.value}</div><div class="kpi-t" style="font-size:.7rem;color:${s.c};">${s.trend}</div></div>`).join('')}
  </div>

  <!-- Tab navigation (Phase 6: added Ledger, Bank Recon, e-Invoice) -->
  <div style="display:flex;gap:0;margin-bottom:1.5rem;border-bottom:2px solid var(--border);overflow-x:auto;">
    ${['Invoices','P&L Statement','Ledger','Bank Recon','Expenses','GST / e-Invoice','Reports','Multi-Entity','E-Way Bill','TDS 26Q & Close','HSN/SAC Master','Form 26AS Recon','ITR Filing'].map((t,i)=>`<button onclick="igFinTab(${i})" id="fin-tab-${i}" style="padding:.6rem 1.1rem;font-size:.78rem;font-weight:600;cursor:pointer;border:none;background:none;color:${i===0?'var(--gold)':'var(--ink-muted)'};border-bottom:${i===0?'2px solid var(--gold)':'2px solid transparent'};letter-spacing:.04em;text-transform:uppercase;margin-bottom:-2px;white-space:nowrap;">${t}</button>`).join('')}
  </div>

  <!-- Tab 0: Invoices -->
  <div id="fin-pane-0">
    <div style="margin-bottom:1rem;display:flex;gap:.75rem;">
      <button onclick="togglePanel('new-inv-panel')" style="background:var(--gold);color:#fff;border:none;padding:.5rem 1.1rem;font-size:.78rem;font-weight:600;cursor:pointer;letter-spacing:.07em;text-transform:uppercase;display:inline-flex;align-items:center;gap:.4rem;"><i class="fas fa-plus"></i>New Invoice</button>
      <button onclick="igToast('Payment reminder sent to all overdue clients','success')" style="background:var(--ink);color:#fff;border:none;padding:.5rem 1rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-bell" style="margin-right:.4rem;"></i>Send Reminders</button>
    </div>
    <div id="new-inv-panel" class="ig-panel" style="margin-bottom:1.5rem;">
      <h4 style="font-size:.82rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:1rem;">New Invoice — <span id="inv-num-preview">INV-2025-004</span></h4>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;">
        <div><label class="ig-label">Client</label><select class="ig-input" id="inv-client"><option>Demo Client Corp</option><option>Rajasthan Hotels Pvt Ltd</option><option>Mumbai Mall Pvt Ltd</option><option>Entertainment Ventures Ltd</option></select></div>
        <div><label class="ig-label">Invoice Date</label><input type="date" class="ig-input" id="inv-date" value="2025-02-28"></div>
        <div><label class="ig-label">Due Date</label><input type="date" class="ig-input" id="inv-due" value="2025-03-30"></div>
        <div style="grid-column:span 2"><label class="ig-label">Description of Services</label><input type="text" class="ig-input" id="inv-desc" placeholder="Advisory Retainer — Feb 2025"></div>
        <div><label class="ig-label">SAC Code</label><input type="text" class="ig-input" id="inv-sac" value="998313" placeholder="SAC"></div>
        <div><label class="ig-label">Amount (excl. GST) ₹</label><input type="number" class="ig-input" placeholder="0" id="inv-amt" oninput="igInvCalc()"></div>
        <div><label class="ig-label">GST Type</label><select class="ig-input" id="inv-gst-type" onchange="igInvCalc()"><option value="18">GST @ 18% (CGST+SGST)</option><option value="12">GST @ 12%</option><option value="0">NIL GST</option></select></div>
        <div style="padding:.875rem;background:var(--parch-dk);border:1px solid var(--border);">
          <div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.4rem;">Breakup</div>
          <div style="font-size:.78rem;color:var(--ink-muted);">CGST: <span id="inv-cgst" style="color:var(--ink);font-weight:600;">₹0</span></div>
          <div style="font-size:.78rem;color:var(--ink-muted);">SGST: <span id="inv-sgst" style="color:var(--ink);font-weight:600;">₹0</span></div>
          <div style="font-size:.82rem;font-weight:700;color:var(--gold);margin-top:.3rem;">Total: <span id="inv-total-disp">₹0</span></div>
        </div>
      </div>
      <div style="display:flex;gap:.75rem;margin-top:1rem;">
        <button onclick="igCreateInvoice()" style="background:var(--gold);color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-paper-plane" style="margin-right:.4rem;"></i>Create & Send</button>
        <button onclick="igToast('Draft saved as '+document.getElementById('inv-num-preview').textContent,'success')" style="background:var(--ink);color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;">Save Draft</button>
        <button onclick="togglePanel('new-inv-panel')" style="background:none;border:1px solid var(--border);padding:.55rem 1.25rem;font-size:.78rem;cursor:pointer;color:var(--ink-muted);">Cancel</button>
      </div>
    </div>
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Invoice Register</h3>
        <span style="font-size:.72rem;color:var(--ink-muted);">AR Total: <strong style="color:var(--gold);">₹7.5L</strong></span>
      </div>
      <table class="ig-tbl" id="inv-register-table">
        <thead><tr><th>Invoice</th><th>Client</th><th>SAC</th><th>Amount</th><th>GST</th><th>Total</th><th>Due</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody id="inv-tbody">
          ${[
            {inv:'INV-2025-001',client:'Demo Client',sac:'998313',base:212000,gst:38160,total:250160,due:'15 Feb',status:'Paid',   cls:'b-gr'},
            {inv:'INV-2025-002',client:'Demo Client',sac:'998313',base:152542,gst:27458,total:180000,due:'28 Feb',status:'Overdue',cls:'b-re'},
            {inv:'INV-2025-003',client:'Entertainment Ventures',sac:'998313',base:271186,gst:48814,total:320000,due:'31 Mar',status:'Draft', cls:'b-dk'},
          ].map(r=>`<tr id="inv-row-${r.inv.replace(/-/g,'_')}">
            <td style="font-size:.82rem;font-weight:600;color:var(--gold);">${r.inv}</td>
            <td style="font-size:.8rem;">${r.client}</td>
            <td style="font-size:.72rem;color:var(--ink-muted);">${r.sac}</td>
            <td style="font-family:'DM Serif Display',Georgia,serif;">₹${(r.base/100000).toFixed(2)}L</td>
            <td style="font-size:.75rem;color:var(--ink-muted);">₹${(r.gst/1000).toFixed(1)}K</td>
            <td style="font-family:'DM Serif Display',Georgia,serif;font-weight:600;">₹${(r.total/100000).toFixed(2)}L</td>
            <td style="font-size:.78rem;color:${r.status==='Overdue'?'#dc2626':'var(--ink-muted)'};">${r.due}</td>
            <td id="status-${r.inv.replace(/-/g,'_')}"><span class="badge ${r.cls}">${r.status}</span></td>
            <td style="display:flex;gap:.3rem;">
              <button onclick="igToast('${r.inv} PDF ready','success')" style="background:none;border:1px solid var(--border);cursor:pointer;font-size:.68rem;color:var(--gold);padding:.2rem .5rem;"><i class="fas fa-download"></i></button>
              ${r.status!=='Paid'?`<button onclick="igMarkPaid('${r.inv.replace(/-/g,'_')}')" style="background:#16a34a;color:#fff;border:none;cursor:pointer;font-size:.68rem;padding:.2rem .5rem;">Paid</button>`:''}
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Tab 1: P&L Statement -->
  <div id="fin-pane-1" style="display:none;">
    <div style="display:flex;gap:.75rem;margin-bottom:1rem;align-items:center;">
      <select class="ig-input" id="pl-month" onchange="igRenderPL()" style="font-size:.82rem;max-width:180px;"><option value="Feb 2025" selected>February 2025</option><option value="Jan 2025">January 2025</option><option value="Dec 2024">December 2024</option><option value="FY 2024-25">Full Year FY 2024-25</option></select>
      <button onclick="igToast('P&L PDF generated','success')" style="background:var(--ink);color:#fff;border:none;padding:.4rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;"><i class="fas fa-download" style="margin-right:.3rem;"></i>Export PDF</button>
      <button onclick="igToast('P&L Excel sheet downloaded','success')" style="background:none;border:1px solid var(--border);padding:.4rem .875rem;font-size:.72rem;font-weight:500;cursor:pointer;color:var(--ink);"><i class="fas fa-file-excel" style="margin-right:.3rem;color:#16a34a;"></i>Excel</button>
    </div>
    <div id="pl-table-container"></div>
  </div>

  <!-- Tab 4: Expenses (Phase 6: renumbered) -->
  <div id="fin-pane-4" style="display:none;">
    <div style="margin-bottom:1rem;"><button onclick="togglePanel('add-exp-panel')" style="background:var(--gold);color:#fff;border:none;padding:.5rem 1rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-plus" style="margin-right:.4rem;"></i>Record Expense</button></div>
    <div id="add-exp-panel" class="ig-panel" style="margin-bottom:1.5rem;">
      <h4 style="font-size:.82rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin-bottom:.875rem;">New Expense Entry</h4>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:.875rem;">
        <div><label class="ig-label">Category</label><select class="ig-input" id="exp-cat" style="font-size:.82rem;"><option>Rent & Facilities</option><option>Staff Payroll</option><option>Travel & Conveyance</option><option>Technology & Software</option><option>Professional Fees</option><option>Marketing</option><option>Miscellaneous</option></select></div>
        <div><label class="ig-label">Amount (₹)</label><input type="number" class="ig-input" id="exp-amt" placeholder="0" style="font-size:.82rem;"></div>
        <div><label class="ig-label">Date</label><input type="date" class="ig-input" id="exp-date" style="font-size:.82rem;"></div>
        <div style="grid-column:span 2"><label class="ig-label">Description</label><input type="text" class="ig-input" id="exp-desc" placeholder="Brief description..." style="font-size:.82rem;"></div>
        <div><label class="ig-label">Vendor</label><input type="text" class="ig-input" id="exp-vendor" placeholder="Vendor / Party Name" style="font-size:.82rem;"></div>
      </div>
      <div style="display:flex;gap:.75rem;margin-top:.875rem;">
        <button onclick="igAddExpense()" style="background:var(--gold);color:#fff;border:none;padding:.45rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;">Save Expense</button>
        <button onclick="togglePanel('add-exp-panel')" style="background:none;border:1px solid var(--border);padding:.45rem 1rem;font-size:.72rem;cursor:pointer;color:var(--ink-muted);">Cancel</button>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:3fr 2fr;gap:1.5rem;">
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Expense Ledger — Feb 2025</h3></div>
        <table class="ig-tbl" id="exp-table">
          <thead><tr><th>Date</th><th>Category</th><th>Description</th><th>Vendor</th><th>Amount</th></tr></thead>
          <tbody>
            ${[
              {date:'27 Feb',cat:'Staff Payroll',    desc:'Salary — Feb 2025',          vendor:'—',                  amt:450000},
              {date:'25 Feb',cat:'Rent & Facilities',desc:'Office Rent — Feb 2025',      vendor:'Phoenix Estates',    amt:85000},
              {date:'20 Feb',cat:'Technology',       desc:'Google Workspace + Zoom Pro', vendor:'Google / Zoom',      amt:12500},
              {date:'18 Feb',cat:'Travel',           desc:'Client meeting travel — Delhi',vendor:'Ola Business',      amt:8400},
              {date:'15 Feb',cat:'Professional Fees',desc:'CA Retainer — Feb 2025',      vendor:'S.K. Associates',    amt:25000},
              {date:'10 Feb',cat:'Marketing',        desc:'LinkedIn Campaign',           vendor:'LinkedIn Ads',       amt:18000},
              {date:'05 Feb',cat:'Miscellaneous',    desc:'Office supplies & stationery',vendor:'Amazon Business',    amt:6200},
            ].map(e=>`<tr>
              <td style="font-size:.78rem;color:var(--ink-muted);">${e.date}</td>
              <td><span class="badge b-dk" style="font-size:.6rem;">${e.cat}</span></td>
              <td style="font-size:.82rem;">${e.desc}</td>
              <td style="font-size:.75rem;color:var(--ink-muted);">${e.vendor}</td>
              <td style="font-family:'DM Serif Display',Georgia,serif;">₹${e.amt.toLocaleString('en-IN')}</td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
        <h4 style="font-family:'DM Serif Display',Georgia,serif;font-size:.95rem;color:var(--ink);margin-bottom:1rem;">Expense by Category</h4>
        ${[
          {cat:'Staff Payroll',amt:450000,pct:75,c:'#1A3A6B'},
          {cat:'Rent',         amt:85000, pct:14,c:'#2563eb'},
          {cat:'Prof. Fees',   amt:25000, pct:4, c:'#7c3aed'},
          {cat:'Marketing',    amt:18000, pct:3, c:'#d97706'},
          {cat:'Technology',   amt:12500, pct:2, c:'#16a34a'},
          {cat:'Other',        amt:14600, pct:2, c:'#9ca3af'},
        ].map(e=>`<div style="margin-bottom:.875rem;">
          <div style="display:flex;justify-content:space-between;font-size:.78rem;margin-bottom:.25rem;">
            <span style="color:var(--ink);">${e.cat}</span>
            <span style="font-weight:600;color:${e.c};">₹${(e.amt/1000).toFixed(0)}K</span>
          </div>
          <div style="height:6px;background:var(--border);"><div style="height:6px;width:${e.pct}%;background:${e.c};"></div></div>
          <div style="font-size:.65rem;color:var(--ink-muted);margin-top:.15rem;">${e.pct}% of total</div>
        </div>`).join('')}
      </div>
    </div>
  </div>

  <!-- Old GST Tab - removed, replaced by fin-pane-5 and fin-pane-3 -->
  <div id="fin-pane-3x" style="display:none;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1.5rem;">
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">GSTR-3B — Feb 2025</h3>
          <button onclick="igConfirm('File GSTR-3B for February 2025?',function(){ igToast('GSTR-3B filed. ARN: AA270225123456','success'); })" style="background:#16a34a;color:#fff;border:none;padding:.3rem .75rem;font-size:.68rem;font-weight:600;cursor:pointer;">File Now</button>
        </div>
        <div style="padding:1.25rem;">
          ${[
            {label:'Taxable Outward Supplies', value:'₹12.4L',c:'var(--gold)'},
            {label:'CGST Collected (9%)',      value:'₹1.12L',c:'var(--ink)'},
            {label:'SGST Collected (9%)',      value:'₹1.12L',c:'var(--ink)'},
            {label:'ITC — CGST Available',     value:'₹0.82L',c:'#2563eb'},
            {label:'ITC — SGST Available',     value:'₹0.82L',c:'#2563eb'},
            {label:'Net GST Payable',          value:'₹0.60L',c:'#dc2626'},
            {label:'Late Fee (if any)',         value:'—',     c:'var(--ink-muted)'},
          ].map(g=>`<div style="display:flex;justify-content:space-between;padding:.55rem 0;border-bottom:1px solid var(--border);"><span style="font-size:.82rem;color:var(--ink-muted);">${g.label}</span><span style="font-family:'DM Serif Display',Georgia,serif;color:${g.c};">${g.value}</span></div>`).join('')}
        </div>
      </div>
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Filing Calendar</h3></div>
        <div style="padding:1.25rem;">
          ${[
            {form:'GSTR-1',period:'Feb 2025',due:'11 Mar 2025',status:'Pending',cls:'b-g'},
            {form:'GSTR-3B',period:'Feb 2025',due:'20 Mar 2025',status:'Pending',cls:'b-g'},
            {form:'GSTR-1',period:'Jan 2025',due:'11 Feb 2025',status:'Filed',cls:'b-gr'},
            {form:'GSTR-3B',period:'Jan 2025',due:'20 Feb 2025',status:'Filed',cls:'b-gr'},
            {form:'GSTR-9',period:'FY 2023-24',due:'31 Dec 2024',status:'Filed',cls:'b-gr'},
          ].map(f=>`<div style="display:flex;justify-content:space-between;padding:.55rem 0;border-bottom:1px solid var(--border);align-items:center;">
            <div><div style="font-size:.82rem;font-weight:500;color:var(--ink);">${f.form} — ${f.period}</div><div style="font-size:.7rem;color:var(--ink-muted);">Due: ${f.due}</div></div>
            <span class="badge ${f.cls}">${f.status}</span>
          </div>`).join('')}
          <button onclick="igToast('GSTR-1 data exported for filing','success')" style="margin-top:1rem;background:var(--ink);color:#fff;border:none;padding:.45rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;display:block;width:100%;"><i class="fas fa-download" style="margin-right:.4rem;"></i>Download GSTR-1 Data</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Tab 5: GST / e-Invoice (moved from old tab 3, plus e-invoice) -->
  <div id="fin-pane-5" style="display:none;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1.5rem;">
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">GSTR-3B — Feb 2025</h3>
          <button onclick="igConfirm('File GSTR-3B for February 2025?',function(){ igToast('GSTR-3B filed. ARN: AA270225123456','success'); })" style="background:#16a34a;color:#fff;border:none;padding:.3rem .75rem;font-size:.68rem;font-weight:600;cursor:pointer;">File Now</button>
        </div>
        <div style="padding:1.25rem;">
          ${[
            {label:'Taxable Outward Supplies', value:'₹12.4L',c:'var(--gold)'},
            {label:'CGST Collected (9%)',      value:'₹1.12L',c:'var(--ink)'},
            {label:'SGST Collected (9%)',      value:'₹1.12L',c:'var(--ink)'},
            {label:'ITC — CGST Available',     value:'₹0.82L',c:'#2563eb'},
            {label:'ITC — SGST Available',     value:'₹0.82L',c:'#2563eb'},
            {label:'Net GST Payable',          value:'₹0.60L',c:'#dc2626'},
            {label:'Late Fee (if any)',         value:'—',     c:'var(--ink-muted)'},
          ].map(g=>`<div style="display:flex;justify-content:space-between;padding:.55rem 0;border-bottom:1px solid var(--border);"><span style="font-size:.82rem;color:var(--ink-muted);">${g.label}</span><span style="font-family:'DM Serif Display',Georgia,serif;color:${g.c};">${g.value}</span></div>`).join('')}
        </div>
      </div>
      <!-- e-Invoice Section -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">e-Invoice (IRN) Generator</h3>
          <span class="badge b-gr" style="font-size:.6rem;">IRP Integrated</span>
        </div>
        <div style="padding:1.25rem;">
          <div style="background:#fffbeb;border:1px solid #fde68a;padding:.75rem;margin-bottom:1rem;font-size:.75rem;color:#92400e;">
            <i class="fas fa-info-circle" style="margin-right:.4rem;"></i>e-Invoice mandatory for turnover above ₹5 Cr. Generates IRN + QR code via IRP. Connected to GST Portal.
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.875rem;margin-bottom:.875rem;">
            <div><label class="ig-label">Invoice Number</label><input type="text" class="ig-input" value="INV-2025-003" style="font-size:.82rem;"></div>
            <div><label class="ig-label">Supplier GSTIN</label><input type="text" class="ig-input" value="07AABCV1234F1Z5" style="font-size:.82rem;"></div>
            <div><label class="ig-label">Buyer GSTIN</label><input type="text" class="ig-input" placeholder="Buyer GSTIN" style="font-size:.82rem;"></div>
            <div><label class="ig-label">Total Invoice Value</label><input type="number" class="ig-input" placeholder="0" style="font-size:.82rem;"></div>
          </div>
          <div style="display:flex;gap:.5rem;">
            <button onclick="igGenIRN()" style="background:#d97706;color:#fff;border:none;padding:.5rem 1rem;font-size:.75rem;font-weight:600;cursor:pointer;"><i class="fas fa-qrcode" style="margin-right:.4rem;"></i>Generate IRN + QR</button>
            <button onclick="igToast('e-Invoice cancelled. Cancellation reason logged.','warn')" style="background:none;border:1px solid var(--border);padding:.5rem 1rem;font-size:.75rem;cursor:pointer;color:#dc2626;">Cancel IRN</button>
          </div>
          <!-- Recent IRNs -->
          <div style="margin-top:1rem;border-top:1px solid var(--border);padding-top:1rem;">
            <div style="font-size:.68rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--ink-muted);margin-bottom:.5rem;">Recent IRNs</div>
            ${[
              {inv:'INV-2025-001',irn:'84d5...3e12',status:'Active', date:'14 Feb 2025'},
              {inv:'INV-2025-002',irn:'c3a8...7f91',status:'Active', date:'28 Feb 2025'},
            ].map(r=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:.4rem 0;border-bottom:1px solid var(--border);">
              <div><div style="font-size:.78rem;font-weight:500;">${r.inv}</div><code style="font-size:.65rem;color:#7c3aed;">${r.irn}</code></div>
              <div style="text-align:right;"><div style="font-size:.7rem;color:var(--ink-muted);">${r.date}</div><span class="badge b-gr" style="font-size:.58rem;">${r.status}</span></div>
            </div>`).join('')}
          </div>
        </div>
      </div>
    </div>
    <!-- GST Filing Calendar -->
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">GST Filing Calendar</h3></div>
      <div style="padding:1.25rem;">
        ${[
          {form:'GSTR-1',period:'Feb 2025',due:'11 Mar 2025',status:'Pending',cls:'b-g'},
          {form:'GSTR-3B',period:'Feb 2025',due:'20 Mar 2025',status:'Pending',cls:'b-g'},
          {form:'GSTR-1',period:'Jan 2025',due:'11 Feb 2025',status:'Filed',cls:'b-gr'},
          {form:'GSTR-3B',period:'Jan 2025',due:'20 Feb 2025',status:'Filed',cls:'b-gr'},
          {form:'GSTR-9',period:'FY 2023-24',due:'31 Dec 2024',status:'Filed',cls:'b-gr'},
        ].map(f=>`<div style="display:flex;justify-content:space-between;padding:.55rem 0;border-bottom:1px solid var(--border);align-items:center;">
          <div><div style="font-size:.82rem;font-weight:500;color:var(--ink);">${f.form} — ${f.period}</div><div style="font-size:.7rem;color:var(--ink-muted);">Due: ${f.due}</div></div>
          <div style="display:flex;gap:.5rem;align-items:center;">
            <span class="badge ${f.cls}">${f.status}</span>
            ${f.status==='Pending'?`<button onclick="igToast('${f.form} ${f.period} filed successfully. ARN generated.','success')" style="background:#16a34a;color:#fff;border:none;padding:.2rem .5rem;font-size:.65rem;font-weight:600;cursor:pointer;">File Now</button>`:''}
          </div>
        </div>`).join('')}
        <button onclick="igToast('GSTR-1 data exported for filing','success')" style="margin-top:1rem;background:var(--ink);color:#fff;border:none;padding:.45rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;"><i class="fas fa-download" style="margin-right:.4rem;"></i>Download GSTR-1 Data</button>
      </div>
    </div>
  </div>

  <!-- Tab 2: Ledger (new Phase 6) -->
  <div id="fin-pane-2" style="display:none;">
    <div style="display:flex;gap:.75rem;margin-bottom:1rem;">
      <select class="ig-input" style="font-size:.82rem;max-width:200px;" id="ledger-account">
        <option>Sales / Revenue</option><option>Expenses — Staff</option><option>GST Payable</option><option>Accounts Receivable</option><option>Bank Account</option><option>Director Drawings</option>
      </select>
      <select class="ig-input" style="font-size:.82rem;max-width:140px;"><option>Feb 2025</option><option>Jan 2025</option><option>FY 2024-25</option></select>
      <button onclick="igToast('Ledger view refreshed','success')" style="background:none;border:1px solid var(--border);padding:.4rem .875rem;font-size:.75rem;cursor:pointer;color:var(--ink);"><i class="fas fa-sync" style="margin-right:.3rem;font-size:.7rem;"></i>Refresh</button>
      <button onclick="igToast('Ledger exported to PDF','success')" style="background:none;border:1px solid var(--border);padding:.4rem .875rem;font-size:.75rem;cursor:pointer;color:var(--gold);"><i class="fas fa-download" style="margin-right:.3rem;font-size:.7rem;"></i>Export</button>
    </div>
    <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.25rem;">
      <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Account Ledger — Sales / Revenue</h3>
        <div style="font-size:.78rem;color:var(--ink-muted);">Opening Balance: <strong style="color:var(--ink);">₹7,71,000</strong></div>
      </div>
      <table class="ig-tbl">
        <thead><tr><th>Date</th><th>Voucher No.</th><th>Narration</th><th>Debit</th><th>Credit</th><th>Balance</th></tr></thead>
        <tbody>
          ${[
            {date:'01 Feb', vch:'JV-001', narr:'Opening Balance',                   dr:0,       cr:0,       bal:771000},
            {date:'05 Feb', vch:'INV-2025-001', narr:'Advisory Retainer — Jan 2025', dr:0,       cr:250160,  bal:1021160},
            {date:'12 Feb', vch:'INV-2025-002', narr:'Hotel PMC — Phase 1',          dr:0,       cr:180000,  bal:1201160},
            {date:'18 Feb', vch:'RCP-001', narr:'Receipt — INV-2025-001 (Paid)',     dr:250160,  cr:0,       bal:951000},
            {date:'25 Feb', vch:'INV-2025-003', narr:'Entertainment Feasibility',    dr:0,       cr:320000,  bal:1271000},
            {date:'28 Feb', vch:'ADJ-001', narr:'GST adjustment entry',              dr:141200,  cr:0,       bal:1129800},
          ].map((r,i)=>{
            const isOp=i===0;
            return `<tr style="${isOp?'background:var(--parch-dk);':''}">
              <td style="font-size:.78rem;color:var(--ink-muted);">${r.date}</td>
              <td style="font-size:.72rem;color:var(--gold);font-family:monospace;">${r.vch}</td>
              <td style="font-size:.82rem;">${r.narr}</td>
              <td style="font-size:.82rem;color:#dc2626;text-align:right;">${r.dr>0?'₹'+(r.dr/1000).toFixed(1)+'K':'—'}</td>
              <td style="font-size:.82rem;color:#16a34a;text-align:right;">${r.cr>0?'₹'+(r.cr/1000).toFixed(1)+'K':'—'}</td>
              <td style="font-family:'DM Serif Display',Georgia,serif;color:var(--ink);text-align:right;">₹${(r.bal/100000).toFixed(2)}L</td>
            </tr>`;
          }).join('')}
          <tr style="background:#f0fdf4;font-weight:700;">
            <td colspan="3" style="text-align:right;font-size:.82rem;padding:.625rem .875rem;">Closing Balance</td>
            <td style="text-align:right;color:#dc2626;font-size:.82rem;">₹3.91L</td>
            <td style="text-align:right;color:#16a34a;font-size:.82rem;">₹7.50L</td>
            <td style="font-family:'DM Serif Display',Georgia,serif;color:#15803d;text-align:right;">₹11.30L</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Voucher Entry -->
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">New Voucher Entry</h3>
        <div style="display:flex;gap:.5rem;">
          ${['Sales','Purchase','Payment','Receipt','Journal','Contra'].map(v=>`<button onclick="igToast('${v} voucher template loaded','info')" style="background:var(--parch-dk);border:1px solid var(--border);padding:.2rem .5rem;font-size:.65rem;cursor:pointer;color:var(--ink);">${v}</button>`).join('')}
        </div>
      </div>
      <div style="padding:1.25rem;display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:.875rem;">
        <div><label class="ig-label">Voucher Type</label><select class="ig-input" style="font-size:.82rem;"><option>Journal</option><option>Sales</option><option>Payment</option><option>Receipt</option></select></div>
        <div><label class="ig-label">Voucher Date</label><input type="date" class="ig-input" style="font-size:.82rem;"></div>
        <div><label class="ig-label">Debit Account</label><input type="text" class="ig-input" placeholder="e.g. Expenses" style="font-size:.82rem;"></div>
        <div><label class="ig-label">Credit Account</label><input type="text" class="ig-input" placeholder="e.g. Bank Account" style="font-size:.82rem;"></div>
        <div style="grid-column:span 2;"><label class="ig-label">Narration</label><input type="text" class="ig-input" placeholder="Description of transaction" style="font-size:.82rem;"></div>
        <div><label class="ig-label">Amount (₹)</label><input type="number" class="ig-input" placeholder="0" style="font-size:.82rem;"></div>
        <div style="display:flex;align-items:flex-end;"><button onclick="igToast('Voucher JV-'+Math.floor(Math.random()*900+100)+' created and posted to ledger','success')" style="background:var(--gold);color:#fff;border:none;padding:.5rem 1rem;font-size:.75rem;font-weight:600;cursor:pointer;width:100%;"><i class="fas fa-plus" style="margin-right:.3rem;"></i>Post Voucher</button></div>
      </div>
    </div>
  </div>

  <!-- Tab 3: Bank Reconciliation (new Phase 6) -->
  <div id="fin-pane-3" style="display:none;">
    <div style="background:#fffbeb;border:1px solid #fde68a;padding:.875rem 1.25rem;margin-bottom:1.25rem;display:flex;gap:.625rem;align-items:center;">
      <i class="fas fa-university" style="color:#d97706;font-size:.9rem;flex-shrink:0;"></i>
      <div>
        <div style="font-size:.82rem;font-weight:600;color:#92400e;">Bank: HDFC Bank Current A/c · ••••6748</div>
        <div style="font-size:.72rem;color:#78350f;">Statement Balance: ₹56.2L · Book Balance: ₹56.5L · Difference: ₹30,200</div>
      </div>
      <button onclick="igToast('Bank statement uploaded — 38 transactions imported','success')" style="margin-left:auto;background:#d97706;color:#fff;border:none;padding:.4rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;"><i class="fas fa-upload" style="margin-right:.3rem;"></i>Upload Statement</button>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1.25rem;">
      ${[{l:'Statement Balance',v:'₹56,20,000',c:'#2563eb'},{l:'Book Balance (Ledger)',v:'₹56,50,000',c:'#16a34a'},{l:'Reconciled',v:'₹56,20,000',c:'#16a34a'},{l:'Unreconciled',v:'₹30,200',c:'#dc2626'}].map(s=>`<div style="background:#fff;border:1px solid var(--border);padding:.875rem 1rem;"><div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.35rem;">${s.l}</div><div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:${s.c};">${s.v}</div></div>`).join('')}
    </div>
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Unreconciled Transactions</h3>
        <button onclick="igToast('Auto-reconciliation complete — 35/38 matched','success')" style="background:#16a34a;color:#fff;border:none;padding:.3rem .75rem;font-size:.68rem;font-weight:600;cursor:pointer;"><i class="fas fa-magic" style="margin-right:.3rem;"></i>Auto-Reconcile</button>
      </div>
      <table class="ig-tbl">
        <thead><tr><th>Date</th><th>Description</th><th>Bank Amount</th><th>Book Amount</th><th>Diff</th><th>Type</th><th>Match</th></tr></thead>
        <tbody>
          ${[
            {date:'28 Feb', desc:'NEFT — Staff Payroll Feb 25',  bank:363400,  book:363400, type:'Outward',  matched:true},
            {date:'26 Feb', desc:'INV-2025-001 Receipt',          bank:250160,  book:250160, type:'Inward',   matched:true},
            {date:'25 Feb', desc:'Bank charges Q1',               bank:1200,    book:0,      type:'Outward',  matched:false},
            {date:'24 Feb', desc:'Rent — Office Feb 2025',        bank:85000,   book:85000,  type:'Outward',  matched:true},
            {date:'20 Feb', desc:'GST Payment GSTR-3B',           bank:29000,   book:0,      type:'Outward',  matched:false},
          ].map(r=>`<tr ${!r.matched?'style="background:#fffbeb;"':''}>
            <td style="font-size:.78rem;">${r.date}</td>
            <td style="font-size:.82rem;">${r.desc}</td>
            <td style="font-size:.82rem;color:#dc2626;">₹${r.bank.toLocaleString('en-IN')}</td>
            <td style="font-size:.82rem;color:#16a34a;">${r.book>0?'₹'+r.book.toLocaleString('en-IN'):'—'}</td>
            <td style="font-size:.78rem;color:${r.bank-r.book!==0?'#d97706':'var(--ink-muted)'};">${r.bank-r.book!==0?'₹'+(r.bank-r.book).toLocaleString('en-IN'):'✓'}</td>
            <td><span class="badge ${r.type==='Inward'?'b-gr':'b-re'}" style="font-size:.6rem;">${r.type}</span></td>
            <td>
              ${r.matched
                ? '<span class="badge b-gr" style="font-size:.62rem;">Matched</span>'
                : `<button onclick="igToast('Creating journal entry for reconciliation','info')" style="background:#d97706;color:#fff;border:none;padding:.2rem .5rem;font-size:.65rem;cursor:pointer;">Create JV</button>`}
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Tab 6: Reports (renamed from tab 4) -->
  <div id="fin-pane-6" style="display:none;">
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;">
      ${[
        {title:'Profit & Loss Statement',icon:'chart-line',color:'#1A3A6B',desc:'Monthly & YTD P&L with all income and expense categories'},
        {title:'Balance Sheet',icon:'balance-scale',color:'#2563eb',desc:'Assets, liabilities and equity as on date'},
        {title:'Cash Flow Statement',icon:'money-bill-wave',color:'#16a34a',desc:'Operating, investing and financing activities'},
        {title:'GST Reconciliation',icon:'receipt',color:'#d97706',desc:'GSTR-2A vs Books reconciliation for ITC claim'},
        {title:'TDS Certificates',icon:'certificate',color:'#7c3aed',desc:'Form 16A for all TDS deductions — vendor wise'},
        {title:'Aged Receivables',icon:'clock',color:'#dc2626',desc:'Invoice ageing report — 0-30, 31-60, 60-90, 90+ days'},
        {title:'Expense Analytics',icon:'chart-bar',color:'#0891b2',desc:'Department-wise and category-wise expense breakdown'},
        {title:'Bank Reconciliation',icon:'university',color:'#374151',desc:'Book balance vs bank statement reconciliation'},
        {title:'Audit Trail',icon:'file-alt',color:'#64748b',desc:'Complete financial transaction log for audit'},
      ].map(r=>`<div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
        <div style="display:flex;align-items:center;gap:.875rem;margin-bottom:.75rem;">
          <div style="width:36px;height:36px;background:${r.color};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <i class="fas fa-${r.icon}" style="color:#fff;font-size:.72rem;"></i>
          </div>
          <div style="font-weight:600;font-size:.875rem;color:var(--ink);">${r.title}</div>
        </div>
        <div style="font-size:.75rem;color:var(--ink-muted);margin-bottom:.875rem;">${r.desc}</div>
        <div style="display:flex;gap:.5rem;">
          <button onclick="igToast('${r.title} PDF — generating...','success')" style="background:var(--gold);color:#fff;border:none;padding:.35rem .75rem;font-size:.68rem;font-weight:600;cursor:pointer;flex:1;text-align:center;"><i class="fas fa-file-pdf" style="margin-right:.3rem;"></i>PDF</button>
          <button onclick="igToast('${r.title} Excel — downloading...','success')" style="background:none;border:1px solid var(--border);padding:.35rem .75rem;font-size:.68rem;cursor:pointer;color:var(--ink);"><i class="fas fa-file-excel" style="color:#16a34a;"></i></button>
        </div>
      </div>`).join('')}
    </div>
  </div>

  <!-- fin-pane-7: Multi-Entity Ledger -->
  <div id="fin-pane-7" style="display:none;">
    <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Multi-Entity Consolidated Ledger</h3>
        <div style="display:flex;gap:.5rem;">
          <select class="ig-input" style="font-size:.75rem;max-width:180px;">
            <option>India Gully Pvt Ltd (HQ)</option>
            <option>IG HORECA Solutions LLP</option>
            <option>IG Real Estate Advisory</option>
            <option>Consolidated View</option>
          </select>
          <select class="ig-input" style="font-size:.75rem;max-width:130px;">
            <option>FY 2025-26</option><option>FY 2024-25</option>
          </select>
        </div>
      </div>
      <!-- Entity Summary Cards -->
      <div style="padding:1.25rem;display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:1rem;">
        ${[
          {entity:'India Gully Pvt Ltd',      rev:'₹89.5L', exp:'₹56.2L', profit:'₹33.3L', pct:'37.2%', c:'#B8960C'},
          {entity:'IG HORECA Solutions LLP',   rev:'₹24.1L', exp:'₹18.7L', profit:'₹5.4L',  pct:'22.4%', c:'#2563eb'},
          {entity:'IG Real Estate Advisory',   rev:'₹12.8L', exp:'₹9.1L',  profit:'₹3.7L',  pct:'28.9%', c:'#16a34a'},
        ].map(e=>`<div style="border:2px solid ${e.c}22;padding:1rem;">
          <div style="font-size:.72rem;font-weight:700;color:${e.c};margin-bottom:.5rem;">${e.entity}</div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.4rem;">
            <div style="font-size:.68rem;color:var(--ink-muted);">Revenue</div><div style="font-size:.78rem;font-weight:600;color:var(--ink);">${e.rev}</div>
            <div style="font-size:.68rem;color:var(--ink-muted);">Expenses</div><div style="font-size:.78rem;font-weight:600;color:#dc2626;">${e.exp}</div>
            <div style="font-size:.68rem;color:var(--ink-muted);">Net Profit</div><div style="font-size:.78rem;font-weight:700;color:#16a34a;">${e.profit} <span style="color:var(--ink-muted);font-weight:400;">(${e.pct})</span></div>
          </div>
        </div>`).join('')}
      </div>
      <!-- Intercompany Eliminations -->
      <div style="padding:0 1.25rem 1.25rem;">
        <div style="font-size:.75rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink);margin-bottom:.75rem;">Intercompany Transactions to Eliminate</div>
        <table class="ig-tbl"><thead><tr><th>From Entity</th><th>To Entity</th><th>Type</th><th>Amount</th><th>Status</th><th>Action</th></tr></thead><tbody>
          ${[
            {from:'India Gully Pvt Ltd',to:'IG HORECA Solutions LLP',   type:'Management Fee', amt:'₹3.5L', s:'Pending'},
            {from:'India Gully Pvt Ltd',to:'IG Real Estate Advisory',   type:'Cost Allocation', amt:'₹1.8L', s:'Eliminated'},
            {from:'IG HORECA Solutions',to:'India Gully Pvt Ltd',       type:'Loan Interest',   amt:'₹0.6L', s:'Eliminated'},
          ].map(r=>`<tr>
            <td style="font-size:.75rem;">${r.from}</td>
            <td style="font-size:.75rem;">${r.to}</td>
            <td style="font-size:.72rem;color:var(--ink-muted);">${r.type}</td>
            <td style="font-size:.78rem;font-weight:600;color:var(--gold);">${r.amt}</td>
            <td><span class="badge ${r.s==='Eliminated'?'b-gr':'b-g'}" style="font-size:.6rem;">${r.s}</span></td>
            <td><button onclick="igToast('${r.type} elimination journal posted','success')" style="background:none;border:1px solid var(--border);padding:.2rem .5rem;font-size:.65rem;cursor:pointer;color:var(--gold);">Eliminate</button></td>
          </tr>`).join('')}
        </tbody></table>
        <div style="display:flex;gap:.75rem;margin-top:1rem;">
          <button onclick="igToast('Consolidated P&L report generated — 3 entities','success')" style="background:var(--gold);color:#fff;border:none;padding:.5rem 1.1rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-layer-group" style="margin-right:.4rem;"></i>Generate Consolidated P&L</button>
          <button onclick="igToast('Consolidated Balance Sheet downloading…','success')" style="background:var(--ink);color:#fff;border:none;padding:.5rem 1.1rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-balance-scale" style="margin-right:.4rem;"></i>Balance Sheet</button>
        </div>
      </div>
    </div>
    <!-- Period Closing Checklist -->
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Month-End Closing Checklist — February 2025</h3>
      </div>
      <div style="padding:1.25rem;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:.625rem;">
          ${[
            {task:'Post all sales invoices',          done:true, responsible:'Finance'},
            {task:'Post purchase bills & vendor dues', done:true, responsible:'Finance'},
            {task:'Bank reconciliation completed',     done:true, responsible:'Finance'},
            {task:'Depreciation journal entry',        done:true, responsible:'Finance'},
            {task:'Accruals & prepayments posted',     done:false,responsible:'Finance'},
            {task:'Payroll journal posted',            done:true, responsible:'HR'},
            {task:'GST return filed (GSTR-1)',         done:true, responsible:'Finance'},
            {task:'TDS deposited',                     done:false,responsible:'Finance'},
            {task:'Intercompany eliminations done',    done:false,responsible:'Finance'},
            {task:'P&L reviewed by CFO',              done:false,responsible:'Director'},
          ].map(t=>`<div style="display:flex;align-items:center;gap:.625rem;padding:.5rem .875rem;border:1px solid ${t.done?'#86efac':'var(--border)'};background:${t.done?'#f0fdf4':'#fff'};">
            <i class="fas fa-${t.done?'check-circle':'circle'}" style="color:${t.done?'#16a34a':'#94a3b8'};font-size:.85rem;flex-shrink:0;"></i>
            <div style="flex:1;font-size:.78rem;color:${t.done?'#16a34a':'var(--ink)'};">${t.task}</div>
            <span style="font-size:.65rem;color:var(--ink-muted);">${t.responsible}</span>
          </div>`).join('')}
        </div>
        <div style="margin-top:1rem;display:flex;gap:.75rem;">
          <button onclick="igToast('Period lock initiated — February 2025 closing started','success')" style="background:var(--gold);color:#fff;border:none;padding:.5rem 1.1rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-lock" style="margin-right:.4rem;"></i>Lock Period</button>
          <button onclick="igToast('CFO sign-off email sent for February 2025 financials','success')" style="background:none;border:1px solid var(--border);padding:.5rem 1rem;font-size:.78rem;cursor:pointer;color:var(--ink);"><i class="fas fa-paper-plane" style="margin-right:.4rem;"></i>Request CFO Sign-off</button>
        </div>
      </div>
    </div>
  </div>

  <!-- fin-pane-8: E-Way Bill -->
  <div id="fin-pane-8" style="display:none;">
    <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">E-Way Bill Generation & Register</h3>
        <button onclick="togglePanel('new-ewb-panel')" style="background:var(--gold);color:#fff;border:none;padding:.4rem .875rem;font-size:.75rem;font-weight:600;cursor:pointer;"><i class="fas fa-plus" style="margin-right:.4rem;"></i>Generate EWB</button>
      </div>
      <!-- New EWB Form -->
      <div id="new-ewb-panel" class="ig-panel" style="margin:1.25rem;display:none;">
        <h4 style="font-size:.82rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin-bottom:.875rem;">New E-Way Bill</h4>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:.875rem;">
          <div><label class="ig-label">Transaction Type</label><select class="ig-input" style="font-size:.82rem;"><option>Outward — Supply</option><option>Inward — Supply</option><option>Job Work</option></select></div>
          <div><label class="ig-label">Document No.</label><input type="text" class="ig-input" placeholder="INV-2025-004" style="font-size:.82rem;"></div>
          <div><label class="ig-label">Document Date</label><input type="date" class="ig-input" value="2025-03-05" style="font-size:.82rem;"></div>
          <div><label class="ig-label">From GSTIN</label><input type="text" class="ig-input" value="07XXXXXX000XXX" style="font-size:.82rem;"></div>
          <div><label class="ig-label">To GSTIN / State</label><input type="text" class="ig-input" placeholder="27YYYYYY999ZZZ / Maharashtra" style="font-size:.82rem;"></div>
          <div><label class="ig-label">HSN Code</label><input type="text" class="ig-input" value="998313" style="font-size:.82rem;"></div>
          <div><label class="ig-label">Taxable Value (₹)</label><input type="number" class="ig-input" placeholder="0" style="font-size:.82rem;"></div>
          <div><label class="ig-label">Transport Mode</label><select class="ig-input" style="font-size:.82rem;"><option>Road</option><option>Rail</option><option>Air</option><option>Ship</option></select></div>
          <div><label class="ig-label">Vehicle / LR No.</label><input type="text" class="ig-input" placeholder="DL01AB1234" style="font-size:.82rem;"></div>
        </div>
        <button onclick="igToast('E-Way Bill EWB-2025-'+Math.floor(Math.random()*9000+1000)+' generated — valid 24h','success')" style="background:var(--gold);color:#fff;border:none;padding:.5rem 1.1rem;font-size:.78rem;font-weight:600;cursor:pointer;margin-top:.875rem;"><i class="fas fa-truck" style="margin-right:.4rem;"></i>Generate EWB</button>
      </div>
      <!-- EWB Register -->
      <table class="ig-tbl"><thead><tr><th>EWB No.</th><th>Type</th><th>Document</th><th>From</th><th>To</th><th>Value</th><th>Valid Till</th><th>Status</th><th>Action</th></tr></thead><tbody>
        ${[
          {ewb:'EWB-2025-1042',type:'Outward',doc:'INV-2025-003',from:'Delhi (07)',to:'Mumbai (27)', val:'₹4.2L', valid:'06 Mar 2025 17:00',s:'Active'},
          {ewb:'EWB-2025-0998',type:'Inward', doc:'PO-2025-018', from:'Mumbai (27)',to:'Delhi (07)', val:'₹1.8L', valid:'02 Mar 2025 14:00',s:'Expired'},
          {ewb:'EWB-2025-0887',type:'Outward',doc:'INV-2025-001',from:'Delhi (07)',to:'Jaipur (08)', val:'₹8.5L', valid:'25 Feb 2025 12:00',s:'Cancelled'},
        ].map(e=>`<tr>
          <td style="font-size:.78rem;font-weight:600;color:var(--gold);">${e.ewb}</td>
          <td style="font-size:.72rem;">${e.type}</td>
          <td style="font-size:.72rem;">${e.doc}</td>
          <td style="font-size:.72rem;">${e.from}</td>
          <td style="font-size:.72rem;">${e.to}</td>
          <td style="font-size:.78rem;font-weight:600;">₹${e.val}</td>
          <td style="font-size:.68rem;color:var(--ink-muted);">${e.valid}</td>
          <td><span class="badge ${e.s==='Active'?'b-gr':e.s==='Expired'?'b-re':'b-g'}" style="font-size:.6rem;">${e.s}</span></td>
          <td><button onclick="igToast('${e.ewb} PDF downloaded','success')" style="background:none;border:1px solid var(--border);padding:.2rem .5rem;font-size:.65rem;cursor:pointer;color:var(--gold);"><i class="fas fa-download"></i></button></td>
        </tr>`).join('')}
      </tbody></table>
    </div>
  </div>

  <!-- fin-pane-9: TDS 26Q & Period Closing -->
  <div id="fin-pane-9" style="display:none;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1.5rem;">
      <!-- TDS 26Q Return -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">TDS Returns — Form 26Q (Non-Salary)</h3></div>
        <div style="padding:1.25rem;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;margin-bottom:1rem;">
            ${[
              {q:'Q3 FY 2024-25 (Oct–Dec)',due:'15 Jan 2025',filed:'12 Jan 2025',tds:'₹1,24,500',s:'Filed'},
              {q:'Q4 FY 2024-25 (Jan–Mar)',due:'31 May 2025',filed:null,         tds:'₹98,000',s:'Pending'},
            ].map(r=>`<div style="border:1px solid ${r.s==='Filed'?'#86efac':'#fcd34d'};background:${r.s==='Filed'?'#f0fdf4':'#fffbeb'};padding:.875rem;">
              <div style="font-size:.72rem;font-weight:700;color:var(--ink);margin-bottom:.4rem;">${r.q}</div>
              <div style="font-size:.68rem;color:var(--ink-muted);">Due: ${r.due}</div>
              <div style="font-size:.68rem;color:var(--ink-muted);">Filed: ${r.filed||'—'}</div>
              <div style="font-size:.78rem;font-weight:600;color:var(--gold);margin:.3rem 0;">TDS Amount: ${r.tds}</div>
              <span class="badge ${r.s==='Filed'?'b-gr':'b-g'}" style="font-size:.6rem;">${r.s}</span>
            </div>`).join('')}
          </div>
          <div style="font-size:.75rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink);margin-bottom:.625rem;">Vendor-Wise TDS Summary — Q4 FY 2024-25</div>
          <table class="ig-tbl"><thead><tr><th>Vendor</th><th>PAN</th><th>Section</th><th>Payment</th><th>TDS Rate</th><th>TDS Amt</th><th>Form 16A</th></tr></thead><tbody>
            ${[
              {v:'ABC Consultants Pvt',pan:'AAAAA1234A',sec:'194J',pay:'₹5.5L',rate:'10%',tds:'₹55,000',f16a:true},
              {v:'XYZ Tech Solutions', pan:'BBBBB5678B',sec:'194C',pay:'₹2.2L',rate:'2%', tds:'₹4,400', f16a:true},
              {v:'Rent — Office Space',pan:'CCCCC9012C',sec:'194I',pay:'₹6.0L',rate:'10%',tds:'₹60,000',f16a:false},
            ].map(r=>`<tr>
              <td style="font-size:.75rem;">${r.v}</td>
              <td style="font-size:.72rem;font-family:monospace;">${r.pan}</td>
              <td style="font-size:.72rem;">${r.sec}</td>
              <td style="font-size:.75rem;">${r.pay}</td>
              <td style="font-size:.72rem;">${r.rate}</td>
              <td style="font-size:.78rem;font-weight:600;color:var(--gold);">${r.tds}</td>
              <td><button onclick="igToast('Form 16A for ${r.v} downloaded','success')" style="background:none;border:1px solid var(--border);padding:.2rem .5rem;font-size:.65rem;cursor:pointer;color:${r.f16a?'var(--gold)':'var(--ink-muted)'};"><i class="fas fa-${r.f16a?'file-pdf':'clock'}"></i></button></td>
            </tr>`).join('')}
          </tbody></table>
          <div style="display:flex;gap:.75rem;margin-top:1rem;">
            <button onclick="igToast('26Q return for Q4 prepared — review before filing on TRACES','success')" style="background:var(--gold);color:#fff;border:none;padding:.5rem 1.1rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-file-alt" style="margin-right:.4rem;"></i>Prepare Q4 Return</button>
            <button onclick="igToast('All Form 16A certificates for Q3 emailed to vendors','success')" style="background:none;border:1px solid var(--border);padding:.5rem 1rem;font-size:.78rem;cursor:pointer;color:var(--ink);"><i class="fas fa-envelope" style="margin-right:.4rem;"></i>Email 16A Certs</button>
          </div>
        </div>
      </div>
      <!-- Year-End Consolidation -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Year-End Closing & Consolidation</h3></div>
        <div style="padding:1.25rem;">
          <div class="ig-warn" style="margin-bottom:1rem;"><i class="fas fa-exclamation-triangle"></i><div>FY 2024-25 closing due by 31 March 2025. 7 tasks pending.</div></div>
          <div style="display:flex;flex-direction:column;gap:.5rem;">
            ${[
              {task:'Close all income accounts to P&L',          pct:100, s:'Done'},
              {task:'Close all expense accounts to P&L',         pct:100, s:'Done'},
              {task:'Transfer P&L to Retained Earnings',         pct:100, s:'Done'},
              {task:'Depreciation schedule — final run',         pct:80,  s:'In Progress'},
              {task:'Provision for doubtful debts',              pct:0,   s:'Pending'},
              {task:'Statutory audit adjustments',               pct:0,   s:'Pending'},
              {task:'Tax computation & advance tax',             pct:50,  s:'In Progress'},
              {task:'ROC filing preparation (AOC-4, MGT-7)',     pct:0,   s:'Pending'},
              {task:'Final signed financial statements',         pct:0,   s:'Pending'},
            ].map(t=>`<div>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.25rem;">
                <span style="font-size:.75rem;color:var(--ink);">${t.task}</span>
                <span class="badge ${t.s==='Done'?'b-gr':t.s==='In Progress'?'b-g':'b-re'}" style="font-size:.58rem;flex-shrink:0;margin-left:.5rem;">${t.s}</span>
              </div>
              <div style="background:#f1f5f9;height:4px;border-radius:2px;overflow:hidden;">
                <div style="height:100%;background:${t.pct===100?'#16a34a':t.pct>0?'#d97706':'#e2e8f0'};width:${t.pct}%;transition:width .6s;"></div>
              </div>
            </div>`).join('')}
          </div>
          <button onclick="igToast('Year-end closing workflow triggered — CFO approval required','success')" style="background:var(--ink);color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;margin-top:1rem;width:100%;"><i class="fas fa-lock" style="margin-right:.4rem;"></i>Initiate FY 2024-25 Close</button>
        </div>
      </div>
    </div>
  </div>

  <!-- fin-pane-10: HSN/SAC Master & Period Closing -->
  <div id="fin-pane-10" style="display:none;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1.5rem;">
      <!-- HSN/SAC Search -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">HSN / SAC Code Master</h3>
          <button onclick="igToast('HSN master refreshed from CBIC database','success')" style="background:none;border:1px solid var(--border);padding:.3rem .75rem;font-size:.68rem;cursor:pointer;color:var(--gold);"><i class="fas fa-sync" style="margin-right:.3rem;"></i>Sync</button>
        </div>
        <div style="padding:1rem 1.25rem;">
          <div style="display:flex;gap:.5rem;margin-bottom:1rem;">
            <input id="hsn-search" type="text" class="ig-input" placeholder="Search code or description…" style="font-size:.82rem;flex:1;" oninput="igHsnSearch(this.value)">
            <select class="ig-input" style="font-size:.78rem;max-width:120px;" onchange="igHsnSearch(document.getElementById('hsn-search').value,this.value)">
              <option value="">All</option><option value="HSN">HSN (Goods)</option><option value="SAC">SAC (Services)</option>
            </select>
          </div>
          <table class="ig-tbl" id="hsn-table"><thead><tr><th>Type</th><th>Code</th><th>Description</th><th>GST Rate</th><th>Action</th></tr></thead><tbody id="hsn-tbody">
            ${[
              {type:'SAC',code:'998311',desc:'Management Consulting Services',gst:'18%'},
              {type:'SAC',code:'998312',desc:'Business & Corporate Advisory Services',gst:'18%'},
              {type:'SAC',code:'998313',desc:'Real Estate Consulting & Advisory',gst:'18%'},
              {type:'SAC',code:'997221',desc:'HORECA — Hospitality / Hotel Supply',gst:'12%'},
              {type:'SAC',code:'997212',desc:'Retail Leasing & Property Services',gst:'18%'},
              {type:'HSN',code:'8418',  desc:'Refrigerators & Cooling Equipment (HORECA)',gst:'12%'},
              {type:'HSN',code:'8516',  desc:'Commercial Kitchen Heating Equipment',gst:'18%'},
              {type:'HSN',code:'7323',  desc:'Stainless Steel Tableware & Cookware',gst:'12%'},
              {type:'HSN',code:'6302',  desc:'Bed & Table Linen (Hotels)',gst:'5%'},
              {type:'SAC',code:'997331',desc:'Debt Advisory & Special Situations',gst:'18%'},
            ].map(h=>`<tr data-type="${h.type}" data-desc="${h.desc.toLowerCase()}" data-code="${h.code}">
              <td><span class="badge ${h.type==='SAC'?'b-dk':'b-gr'}" style="font-size:.6rem;">${h.type}</span></td>
              <td style="font-weight:700;font-size:.82rem;color:var(--gold);font-family:'DM Serif Display',Georgia,serif;">${h.code}</td>
              <td style="font-size:.78rem;">${h.desc}</td>
              <td><span class="badge b-g" style="font-size:.65rem;">${h.gst}</span></td>
              <td><button onclick="igToast('${h.code} copied to clipboard','success')" style="background:none;border:1px solid var(--border);padding:.2rem .5rem;font-size:.65rem;cursor:pointer;color:var(--gold);"><i class="fas fa-copy"></i></button></td>
            </tr>`).join('')}
          </tbody></table>
        </div>
      </div>
      <!-- Period Closing Workflow -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Period Closing Workflow — Feb 2025</h3>
          <button onclick="igToast('Period closing initiated for February 2025','success')" style="background:var(--gold);color:#fff;border:none;padding:.3rem .75rem;font-size:.68rem;font-weight:600;cursor:pointer;">Initiate Close</button>
        </div>
        <div style="padding:1.25rem;">
          <div class="ig-info" style="margin-bottom:1rem;"><i class="fas fa-lock"></i><div>Period close locks all entries for Feb 2025. All pending vouchers and reconciliations must be resolved first.</div></div>
          ${[
            {step:'01', task:'Reconcile all bank accounts',                   done:true,  resp:'Finance'},
            {step:'02', task:'Post all accrual journal entries',               done:true,  resp:'Finance'},
            {step:'03', task:'Clear all inter-company transactions',           done:true,  resp:'Finance'},
            {step:'04', task:'Validate TDS deducted vs deposited',            done:true,  resp:'Finance'},
            {step:'05', task:'File GSTR-1 for February 2025',                 done:false, resp:'Finance'},
            {step:'06', task:'Confirm inventory count (HORECA)',               done:false, resp:'HORECA'},
            {step:'07', task:'Resolve all outstanding debit notes',           done:true,  resp:'Finance'},
            {step:'08', task:'Generate P&L and Balance Sheet draft',          done:false, resp:'CFO'},
            {step:'09', task:'Director approval on monthly financials',       done:false, resp:'Board'},
            {step:'10', task:'Lock period in ERP (no further entries)',       done:false, resp:'Admin'},
          ].map(s=>`<div style="display:flex;align-items:center;gap:.875rem;padding:.5rem 0;border-bottom:1px solid var(--border);">
            <span style="width:24px;height:24px;border-radius:50%;background:${s.done?'#16a34a':'#e5e7eb'};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <i class="fas fa-${s.done?'check':'circle'}" style="font-size:.55rem;color:${s.done?'#fff':'#9ca3af'};"></i>
            </span>
            <div style="flex:1;">
              <div style="font-size:.82rem;color:${s.done?'var(--ink-muted)':'var(--ink)'};${s.done?'text-decoration:line-through;':''}">${s.step}. ${s.task}</div>
              <div style="font-size:.65rem;color:var(--ink-muted);">Responsible: ${s.resp}</div>
            </div>
            ${!s.done?`<button onclick="igToast('Step ${s.step} marked complete','success');this.closest('div').querySelector('span').style.background='#16a34a';this.closest('div').querySelector('span i').className='fas fa-check';this.closest('div').querySelector('span i').style.color='#fff';this.remove();" style="background:none;border:1px solid var(--border);padding:.2rem .5rem;font-size:.65rem;cursor:pointer;color:var(--gold);">Done</button>`:''}
          </div>`).join('')}
          <div style="margin-top:1rem;padding:.75rem;background:#fef9c3;border:1px solid #fde047;font-size:.78rem;color:#854d0e;">
            <i class="fas fa-exclamation-triangle" style="margin-right:.4rem;"></i> 5 of 10 steps pending. Complete all steps before locking the period.
          </div>
        </div>
      </div>
    </div>
    <!-- Double-Entry Journal Quick Entry -->
    <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
      <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);margin-bottom:1rem;">Double-Entry Journal Voucher</h3>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:.875rem;margin-bottom:.875rem;">
        <div><label class="ig-label">Voucher Date</label><input type="date" class="ig-input" style="font-size:.82rem;"></div>
        <div><label class="ig-label">Voucher Type</label><select class="ig-input" style="font-size:.82rem;"><option>Journal</option><option>Sales</option><option>Purchase</option><option>Payment</option><option>Receipt</option><option>Contra</option></select></div>
        <div><label class="ig-label">Narration</label><input type="text" class="ig-input" placeholder="e.g. Monthly accrual for advisory fees" style="font-size:.82rem;"></div>
        <div><label class="ig-label">Reference No.</label><input type="text" class="ig-input" placeholder="Invoice / bill no." style="font-size:.82rem;"></div>
      </div>
      <table class="ig-tbl" id="journal-entries-table">
        <thead><tr><th>#</th><th>Account Head</th><th>Cost Centre</th><th>Dr/Cr</th><th>Amount (₹)</th><th>HSN/SAC</th><th></th></tr></thead>
        <tbody id="journal-lines">
          ${[
            {acct:'Advisory Fees Income',  cc:'Real Estate',  type:'Cr',amt:'1,25,000',hsn:'998313'},
            {acct:'Accounts Receivable',   cc:'',             type:'Dr',amt:'1,47,500',hsn:''},
            {acct:'CGST Payable @ 9%',     cc:'',             type:'Cr',amt:'11,250', hsn:''},
            {acct:'SGST Payable @ 9%',     cc:'',             type:'Cr',amt:'11,250', hsn:''},
          ].map((e,i)=>`<tr id="jl-${i}">
            <td style="font-size:.72rem;color:var(--ink-muted);">${i+1}</td>
            <td><input type="text" class="ig-input" value="${e.acct}" style="font-size:.78rem;border:none;background:transparent;padding:.1rem;"></td>
            <td><input type="text" class="ig-input" value="${e.cc}" style="font-size:.78rem;border:none;background:transparent;padding:.1rem;"></td>
            <td><select class="ig-input" style="font-size:.78rem;border:none;background:transparent;padding:.1rem;"><option ${e.type==='Dr'?'selected':''}>Dr</option><option ${e.type==='Cr'?'selected':''}>Cr</option></select></td>
            <td><input type="text" class="ig-input" value="${e.amt}" style="font-size:.78rem;border:none;background:transparent;padding:.1rem;text-align:right;"></td>
            <td><input type="text" class="ig-input" value="${e.hsn}" style="font-size:.78rem;border:none;background:transparent;padding:.1rem;" placeholder="HSN/SAC"></td>
            <td><button onclick="document.getElementById('jl-${i}').remove()" style="background:none;border:none;cursor:pointer;color:#dc2626;font-size:.72rem;"><i class="fas fa-times"></i></button></td>
          </tr>`).join('')}
        </tbody>
      </table>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:.875rem;">
        <button onclick="igAddJournalLine()" style="background:none;border:1px solid var(--border);padding:.35rem .75rem;font-size:.72rem;cursor:pointer;color:var(--gold);"><i class="fas fa-plus" style="margin-right:.3rem;"></i>Add Line</button>
        <div style="font-size:.78rem;color:var(--ink-muted);">Dr Total: <strong>₹1,47,500</strong> &nbsp;|&nbsp; Cr Total: <strong>₹1,47,500</strong> &nbsp; <span style="color:#16a34a;font-weight:600;"><i class="fas fa-check"></i> Balanced</span></div>
        <div style="display:flex;gap:.5rem;">
          <button onclick="igToast('Journal entry saved as draft','info')" style="background:none;border:1px solid var(--border);padding:.45rem 1rem;font-size:.72rem;cursor:pointer;color:var(--ink);">Save Draft</button>
          <button onclick="igToast('Journal entry VCH-2025-0147 posted successfully','success')" style="background:var(--gold);color:#fff;border:none;padding:.45rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;">Post Entry</button>
        </div>
      </div>
    </div>
  </div>

  <!-- fin-pane-11: Form 26AS Reconciliation -->
  <div id="fin-pane-11" style="display:none;">
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;margin-bottom:1.5rem;">
      ${[{l:'Total Tax Deducted',v:'₹12,45,800',c:'#1A3A6B'},{l:'Matched Entries',v:'38 / 42',c:'#16a34a'},{l:'Mismatch / Action',v:'4 entries',c:'#dc2626'}].map(k=>`<div style="background:#fff;border:1px solid var(--border);padding:1.1rem 1.25rem;"><div style="font-size:.68rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.4rem;">${k.l}</div><div style="font-size:1.35rem;font-weight:700;color:${k.c};">${k.v}</div></div>`).join('')}
    </div>
    <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Form 26AS — AY 2025-26 (Auto-Fetched)</h3>
        <div style="display:flex;gap:.5rem;">
          <select class="ig-input" style="font-size:.78rem;padding:.35rem .6rem;"><option>All Deductors</option><option>Salary TDS</option><option>Advance Tax</option><option>SFT</option></select>
          <button onclick="igToast('Fetching latest 26AS from TRACES…','info')" style="background:var(--ink);color:#fff;border:none;padding:.4rem .9rem;font-size:.78rem;cursor:pointer;"><i class="fas fa-sync" style="margin-right:.4rem;"></i>Refresh</button>
        </div>
      </div>
      <div style="overflow-x:auto;"><table style="width:100%;border-collapse:collapse;font-size:.78rem;">
        <thead><tr style="background:#f8f9fa;">${['Deductor Name','TAN','Nature','Quarter','Tax Deducted (₹)','Date','Books Matched','Status'].map(h=>`<th style="padding:.6rem 1rem;text-align:left;font-size:.68rem;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-muted);font-weight:600;border-bottom:1px solid var(--border);">${h}</th>`).join('')}</tr></thead>
        <tbody>${[
          {ded:'ICICI Bank Ltd',tan:'MUMI02345E',nat:'194A — Interest',q:'Q3',amt:'18,200',dt:'15 Jan 2025',ok:true},
          {ded:'IndiGrid Infra Ltd',tan:'DEL07231F',nat:'194C — Contract',q:'Q3',amt:'45,000',dt:'07 Jan 2025',ok:true},
          {ded:'EY Advisory Pvt Ltd',tan:'MUM14320C',nat:'194J — Professional',q:'Q3',amt:'1,12,500',dt:'21 Jan 2025',ok:false},
          {ded:'HDFC Bank Ltd',tan:'MUMS09811H',nat:'194A — Interest',q:'Q3',amt:'6,350',dt:'18 Jan 2025',ok:true},
          {ded:'Advance Tax — Self',tan:'—',nat:'Challan 280',q:'Q3',amt:'2,50,000',dt:'15 Dec 2024',ok:true},
          {ded:'Vivacious Ent. (Payroll)',tan:'DEL01924G',nat:'192 — Salary',q:'Q3',amt:'8,13,750',dt:'07 Jan 2025',ok:false},
        ].map(r=>`<tr style="border-bottom:1px solid var(--border);${!r.ok?'background:#fef2f2;':''}"><td style="padding:.55rem 1rem;">${r.ded}</td><td style="padding:.55rem 1rem;color:var(--ink-muted);">${r.tan}</td><td style="padding:.55rem 1rem;">${r.nat}</td><td style="padding:.55rem 1rem;text-align:center;">${r.q}</td><td style="padding:.55rem 1rem;text-align:right;font-weight:600;">₹${r.amt}</td><td style="padding:.55rem 1rem;color:var(--ink-muted);">${r.dt}</td><td style="padding:.55rem 1rem;text-align:center;">${r.ok?'<span style="color:#16a34a;"><i class="fas fa-check"></i></span>':'<span style="color:#dc2626;"><i class="fas fa-times"></i></span>'}</td><td style="padding:.55rem 1rem;">${r.ok?'<span style="font-size:.72rem;background:#dcfce7;color:#166534;padding:2px 7px;">Matched</span>':'<span style="font-size:.72rem;background:#fee2e2;color:#991b1b;padding:2px 7px;">Mismatch</span>'}</td></tr>`).join('')}
        </tbody>
      </table></div>
    </div>
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Mismatch Resolution</h3></div>
      <div style="padding:1.25rem;display:flex;flex-direction:column;gap:1rem;">
        ${[{ref:'EY Advisory Pvt Ltd',diff:'₹12,500',note:'TDS rate 10% in books vs 20% in 26AS — verify deductor certificate'},{ref:'Vivacious Ent. (Payroll)',diff:'₹3,250',note:'Challan booking date mismatch Q3 vs Q4 — recheck TDS return'}].map((m,i)=>`
        <div style="background:#fef2f2;border:1px solid #fecaca;padding:1rem;"><div style="display:flex;align-items:start;justify-content:space-between;margin-bottom:.5rem;"><div style="font-size:.82rem;font-weight:600;color:#991b1b;">${m.ref} — Difference ${m.diff}</div><button onclick="igToast('Mismatch ${i+1} escalated to CS/CFO','info')" style="background:#991b1b;color:#fff;border:none;padding:.3rem .75rem;font-size:.72rem;cursor:pointer;">Raise Query</button></div><p style="font-size:.75rem;color:#7f1d1d;">${m.note}</p></div>`).join('')}
        <button onclick="igToast('Reconciliation report exported to PDF','success')" style="background:var(--gold);color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;align-self:flex-end;"><i class="fas fa-file-download" style="margin-right:.4rem;"></i>Export Reconciliation</button>
      </div>
    </div>
  </div>

  <!-- fin-pane-12: ITR Filing Tracker -->
  <div id="fin-pane-12" style="display:none;">
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">
      ${[{l:'ITR Filed',v:'AY 2023-24',c:'#16a34a'},{l:'Next Due',v:'31 Jul 2025',c:'#B8960C'},{l:'Advance Tax Paid',v:'₹10.0L',c:'#1A3A6B'},{l:'Refund Status',v:'₹1.24L',c:'#7c3aed'}].map(k=>`<div style="background:#fff;border:1px solid var(--border);padding:1rem 1.25rem;"><div style="font-size:.68rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.3rem;">${k.l}</div><div style="font-size:1.2rem;font-weight:700;color:${k.c};">${k.v}</div></div>`).join('')}
    </div>
    <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Advance Tax Challan Tracker — AY 2025-26</h3>
        <button onclick="igToast('New challan entry added','success')" style="background:var(--ink);color:#fff;border:none;padding:.4rem .9rem;font-size:.78rem;cursor:pointer;"><i class="fas fa-plus" style="margin-right:.4rem;"></i>Add Challan</button>
      </div>
      <div style="overflow-x:auto;"><table style="width:100%;border-collapse:collapse;font-size:.78rem;">
        <thead><tr style="background:#f8f9fa;">${['Instalment','Due Date','Paid Date','Challan No.','Amount (₹)','BSR Code','Status'].map(h=>`<th style="padding:.6rem 1rem;text-align:left;font-size:.68rem;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-muted);font-weight:600;border-bottom:1px solid var(--border);">${h}</th>`).join('')}</tr></thead>
        <tbody>${[
          {inst:'Q1 (15 Jun 2024)',due:'15 Jun 2024',paid:'12 Jun 2024',ch:'CPT2400612',amt:'2,50,000',bsr:'0510204',s:'Paid'},
          {inst:'Q2 (15 Sep 2024)',due:'15 Sep 2024',paid:'14 Sep 2024',ch:'CPT2400914',amt:'2,50,000',bsr:'0510204',s:'Paid'},
          {inst:'Q3 (15 Dec 2024)',due:'15 Dec 2024',paid:'15 Dec 2024',ch:'CPT2401215',amt:'2,50,000',bsr:'0510204',s:'Paid'},
          {inst:'Q4 (15 Mar 2025)',due:'15 Mar 2025',paid:'—',ch:'—',amt:'2,50,000',bsr:'—',s:'Pending'},
        ].map(r=>`<tr style="border-bottom:1px solid var(--border);"><td style="padding:.55rem 1rem;">${r.inst}</td><td style="padding:.55rem 1rem;color:var(--ink-muted);">${r.due}</td><td style="padding:.55rem 1rem;">${r.paid}</td><td style="padding:.55rem 1rem;font-family:monospace;color:var(--ink-muted);font-size:.72rem;">${r.ch}</td><td style="padding:.55rem 1rem;text-align:right;font-weight:600;">₹${r.amt}</td><td style="padding:.55rem 1rem;font-family:monospace;color:var(--ink-muted);font-size:.72rem;">${r.bsr}</td><td style="padding:.55rem 1rem;"><span style="font-size:.72rem;background:${r.s==='Paid'?'#dcfce7':'#fef3c7'};color:${r.s==='Paid'?'#166534':'#92400e'};padding:2px 7px;">${r.s}</span></td></tr>`).join('')}
        </tbody>
      </table></div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;">
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:.95rem;color:var(--ink);">ITR Filing History</h3></div>
        <div style="overflow-x:auto;"><table style="width:100%;border-collapse:collapse;font-size:.78rem;">
          <thead><tr style="background:#f8f9fa;">${['AY','ITR Form','Filed On','ACK No.','Refund','Status'].map(h=>`<th style="padding:.5rem .875rem;text-align:left;font-size:.68rem;text-transform:uppercase;color:var(--ink-muted);font-weight:600;border-bottom:1px solid var(--border);">${h}</th>`).join('')}</tr></thead>
          <tbody>${[
            {ay:'2023-24',form:'ITR-6',dt:'25 Oct 2023',ack:'120397245231023',ref:'₹1,24,800',s:'Processed'},
            {ay:'2022-23',form:'ITR-6',dt:'30 Sep 2022',ack:'887612038221022',ref:'Nil',s:'Processed'},
            {ay:'2021-22',form:'ITR-6',dt:'15 Nov 2021',ack:'562934172211015',ref:'₹42,300',s:'Processed'},
            {ay:'2024-25',form:'ITR-6',dt:'— (Due 31 Oct 2024)',ack:'—',ref:'—',s:'Pending'},
          ].map(r=>`<tr style="border-bottom:1px solid var(--border);"><td style="padding:.5rem .875rem;font-weight:600;">${r.ay}</td><td style="padding:.5rem .875rem;color:var(--ink-muted);">${r.form}</td><td style="padding:.5rem .875rem;">${r.dt}</td><td style="padding:.5rem .875rem;font-family:monospace;font-size:.7rem;color:var(--ink-muted);">${r.ack}</td><td style="padding:.5rem .875rem;color:#16a34a;font-weight:600;">${r.ref}</td><td style="padding:.5rem .875rem;"><span style="font-size:.72rem;background:${r.s==='Processed'?'#dcfce7':'#fef3c7'};color:${r.s==='Processed'?'#166534':'#92400e'};padding:2px 7px;">${r.s}</span></td></tr>`).join('')}
          </tbody>
        </table></div>
        <div style="padding:.875rem 1.25rem;"><button onclick="igToast('Downloading ITR-V acknowledgement PDF','success')" style="background:none;border:1px solid var(--border);padding:.4rem .875rem;font-size:.75rem;cursor:pointer;color:var(--gold);"><i class="fas fa-download" style="margin-right:.3rem;"></i>Download ITR-V</button></div>
      </div>
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:.95rem;color:var(--ink);">Tax Liability Summary — AY 2025-26</h3></div>
        <div style="padding:1.25rem;display:flex;flex-direction:column;gap:.75rem;">
          ${[
            {l:'Total Taxable Income',v:'₹2,34,50,000',bold:true},
            {l:'Tax on Income (Corp. Rate 22%)',v:'₹51,59,000',bold:false},
            {l:'Surcharge (10%)',v:'₹5,15,900',bold:false},
            {l:'Health & Education Cess (4%)',v:'₹2,26,996',bold:false},
            {l:'Gross Tax Liability',v:'₹59,01,896',bold:true},
            {l:'Less: TDS Deducted (26AS)',v:'— ₹12,45,800',bold:false},
            {l:'Less: Advance Tax Paid',v:'— ₹7,50,000',bold:false},
            {l:'Balance Tax Payable / (Refund)',v:'₹39,06,096',bold:true},
          ].map(r=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:.45rem 0;border-bottom:1px solid var(--border);"><span style="font-size:.78rem;color:var(--ink-muted);">${r.l}</span><span style="font-size:.82rem;font-weight:${r.bold?700:400};color:var(--ink);">${r.v}</span></div>`).join('')}
          <button onclick="igToast('Tax computation sheet exported','success')" style="background:var(--gold);color:#fff;border:none;padding:.55rem 1.1rem;font-size:.78rem;font-weight:600;cursor:pointer;margin-top:.5rem;"><i class="fas fa-file-invoice" style="margin-right:.4rem;"></i>Export Tax Computation</button>
        </div>
      </div>
    </div>
  </div>

  <script>
  // ── Finance Tab Switcher ───────────────────────────────────────────────────
  window.igFinTab = function(idx){
    for(var i=0;i<13;i++){
      var pane=document.getElementById('fin-pane-'+i);
      var tab=document.getElementById('fin-tab-'+i);
      if(pane) pane.style.display = i===idx?'block':'none';
      if(tab){ tab.style.color=i===idx?'var(--gold)':'var(--ink-muted)'; tab.style.borderBottom=i===idx?'2px solid var(--gold)':'2px solid transparent'; }
    }
    if(idx===1) igRenderPL();
  };
  // ── HSN Search ───────────────────────────────────────────────────────────
  window.igHsnSearch = function(q, typeFilter){
    var rows = document.querySelectorAll('#hsn-tbody tr');
    q = (q||'').toLowerCase();
    rows.forEach(function(r){
      var code = r.getAttribute('data-code')||'';
      var desc = r.getAttribute('data-desc')||'';
      var type = r.getAttribute('data-type')||'';
      var matchQ = !q || code.includes(q) || desc.includes(q);
      var matchT = !typeFilter || type === typeFilter;
      r.style.display = matchQ && matchT ? '' : 'none';
    });
  };
  // ── Add Journal Line ─────────────────────────────────────────────────────
  var jlCnt = 4;
  window.igAddJournalLine = function(){
    jlCnt++;
    var tb = document.getElementById('journal-lines');
    if(!tb) return;
    var tr = document.createElement('tr');
    tr.id = 'jl-'+jlCnt;
    tr.innerHTML = '<td style="font-size:.72rem;color:var(--ink-muted);">'+jlCnt+'</td>'
      +'<td><input type="text" class="ig-input" placeholder="Account head" style="font-size:.78rem;border:none;background:transparent;padding:.1rem;"></td>'
      +'<td><input type="text" class="ig-input" placeholder="Cost centre" style="font-size:.78rem;border:none;background:transparent;padding:.1rem;"></td>'
      +'<td><select class="ig-input" style="font-size:.78rem;border:none;background:transparent;padding:.1rem;"><option>Dr</option><option>Cr</option></select></td>'
      +'<td><input type="text" class="ig-input" placeholder="0" style="font-size:.78rem;border:none;background:transparent;padding:.1rem;text-align:right;"></td>'
      +'<td><input type="text" class="ig-input" placeholder="HSN/SAC" style="font-size:.78rem;border:none;background:transparent;padding:.1rem;"></td>'
      +'<td><button onclick="document.getElementById(\'jl-'+jlCnt+'\').remove()" style="background:none;border:none;cursor:pointer;color:#dc2626;font-size:.72rem;"><i class="fas fa-times"></i></button></td>';
    tb.appendChild(tr);
  };

  // ── Invoice Calc ──────────────────────────────────────────────────────────
  window.igInvCalc = function(){
    var a=parseFloat(document.getElementById('inv-amt').value)||0;
    var rate=parseFloat(document.getElementById('inv-gst-type').value)||0;
    var gst=a*rate/100;
    var half=gst/2;
    document.getElementById('inv-cgst').textContent='₹'+Math.round(half).toLocaleString('en-IN');
    document.getElementById('inv-sgst').textContent='₹'+Math.round(half).toLocaleString('en-IN');
    document.getElementById('inv-total-disp').textContent='₹'+(a+gst).toLocaleString('en-IN');
  };

  // ── Invoice Create ─────────────────────────────────────────────────────────
  var igInvCounter = 4;
  window.igCreateInvoice = function(){
    var desc=document.getElementById('inv-desc').value.trim();
    var amt=parseFloat(document.getElementById('inv-amt').value)||0;
    if(!desc){igToast('Enter description of services','warn');return;}
    if(amt<=0){igToast('Enter valid amount','warn');return;}
    var rate=parseFloat(document.getElementById('inv-gst-type').value)||0;
    var total=Math.round(amt*(1+rate/100));
    var num='INV-2025-00'+igInvCounter++;
    var client=document.getElementById('inv-client').value;
    var due=document.getElementById('inv-due').value;
    var dueFmt=due?new Date(due).toLocaleDateString('en-IN',{day:'numeric',month:'short'}):'—';
    // Wire to real API: post voucher to ledger
    igApi.post('/finance/voucher',{
      type:'Sales Invoice', ref:num, debit:'Accounts Receivable', credit:'Revenue',
      amount:total, description:desc, client:client, due_date:due
    }).then(function(r){
      if(r && r.voucher_id) igToast(num+' posted to ledger (VCH-'+r.voucher_id+')','success');
    });
    var tbody=document.querySelector('#inv-register-table tbody');
    var tr=document.createElement('tr');
    tr.id='inv-row-'+num.replace(/-/g,'_');
    tr.innerHTML='<td style="font-size:.82rem;font-weight:600;color:var(--gold);">'+num+'</td>'
      +'<td style="font-size:.8rem;">'+client+'</td><td style="font-size:.72rem;color:var(--ink-muted);">998313</td>'
      +'<td style="font-family:\'DM Serif Display\',Georgia,serif;">₹'+(amt/100000).toFixed(2)+'L</td>'
      +'<td style="font-size:.75rem;color:var(--ink-muted);">₹'+Math.round(amt*rate/100/1000).toFixed(1)+'K</td>'
      +'<td style="font-family:\'DM Serif Display\',Georgia,serif;font-weight:600;">₹'+(total/100000).toFixed(2)+'L</td>'
      +'<td style="font-size:.78rem;color:var(--ink-muted);">'+dueFmt+'</td>'
      +'<td id="status-'+num.replace(/-/g,'_')+'"><span class="badge b-g">Sent</span></td>'
      +'<td style="display:flex;gap:.3rem;"><button onclick="igToast(\''+num+' PDF ready\',\'success\')" style="background:none;border:1px solid var(--border);cursor:pointer;font-size:.68rem;color:var(--gold);padding:.2rem .5rem;"><i class=\'fas fa-download\'></i></button>'
      +'<button onclick="igMarkPaid(\''+num.replace(/-/g,'_')+'\')" style="background:#16a34a;color:#fff;border:none;cursor:pointer;font-size:.68rem;padding:.2rem .5rem;">Paid</button></td>';
    tbody.insertBefore(tr,tbody.firstChild);
    igToast(num+' created & emailed to '+client,'success');
    togglePanel('new-inv-panel');
    document.getElementById('inv-desc').value='';
    document.getElementById('inv-amt').value='';
    igInvCalc();
    document.getElementById('inv-num-preview').textContent='INV-2025-00'+igInvCounter;
  };
  window.igMarkPaid = function(invId){
    igConfirm('Mark as Paid & update ledger?',function(){
      var cell=document.getElementById('status-'+invId);
      if(cell) cell.innerHTML='<span class="badge b-gr">Paid</span>';
      var row=document.getElementById('inv-row-'+invId);
      if(row){ var b=row.querySelector('[onclick*="igMarkPaid"]'); if(b) b.remove(); }
      igToast('Invoice marked Paid. Ledger updated.','success');
    });
  };

  // ── P&L Renderer ─────────────────────────────────────────────────────────
  var plData = {
    'Feb 2025': {
      income: [{name:'Advisory Retainer',amt:650000},{name:'Hotel PMC',amt:350000},{name:'Mandate Fees',amt:240000}],
      cogs:   [{name:'Consultant Fees',  amt:180000},{name:'Research & Data',amt:45000}],
      opex:   [{name:'Staff Payroll',amt:450000},{name:'Rent',amt:85000},{name:'Travel',amt:28400},{name:'Technology',amt:12500},{name:'Prof. Fees',amt:25000},{name:'Marketing',amt:18000},{name:'Other',amt:6200}],
    },
    'Jan 2025': {
      income: [{name:'Advisory Retainer',amt:620000},{name:'Hotel PMC',amt:280000},{name:'Consulting',amt:180000}],
      cogs:   [{name:'Consultant Fees',amt:155000},{name:'Research',amt:38000}],
      opex:   [{name:'Staff Payroll',amt:450000},{name:'Rent',amt:85000},{name:'Travel',amt:22000},{name:'Technology',amt:12500},{name:'Other',amt:14000}],
    },
    'Dec 2024': {
      income: [{name:'Advisory Retainer',amt:580000},{name:'Entertainment Feasibility',amt:320000}],
      cogs:   [{name:'Consultant Fees',amt:140000}],
      opex:   [{name:'Staff Payroll',amt:450000},{name:'Rent',amt:85000},{name:'Other',amt:48000}],
    },
    'FY 2024-25': {
      income: [{name:'Advisory Retainer',amt:7500000},{name:'Hotel PMC',amt:3200000},{name:'Entertainment',amt:1800000},{name:'Other',amt:820000}],
      cogs:   [{name:'Consultant Fees',amt:1800000},{name:'Research',amt:420000}],
      opex:   [{name:'Staff Payroll',amt:5400000},{name:'Rent',amt:1020000},{name:'Travel',amt:285000},{name:'Technology',amt:150000},{name:'Marketing',amt:180000},{name:'Other',amt:210000}],
    },
  };
  window.igRenderPL = function(){
    var period = document.getElementById('pl-month').value;
    var d = plData[period] || plData['Feb 2025'];
    var totalIncome = d.income.reduce((a,r)=>a+r.amt,0);
    var totalCogs   = d.cogs.reduce((a,r)=>a+r.amt,0);
    var grossProfit = totalIncome - totalCogs;
    var totalOpex   = d.opex.reduce((a,r)=>a+r.amt,0);
    var ebitda      = grossProfit - totalOpex;
    var tax         = Math.max(0, Math.round(ebitda*0.25));
    var netProfit   = ebitda - tax;
    var fmt = n => '₹'+n.toLocaleString('en-IN');
    var pct = (n,base) => base!==0 ? (n/base*100).toFixed(1)+'%' : '—';
    var row = (name, amt, bold, indent, colorOverride) => {
      var c = colorOverride || (amt<0?'#dc2626':'var(--ink)');
      return '<tr style="border-bottom:1px solid var(--border);">'
        +'<td style="padding:.5rem .875rem;font-size:.82rem;'+(bold?'font-weight:700;':'')+(indent?'padding-left:1.5rem;color:var(--ink-muted);':'')+'">'+name+'</td>'
        +'<td style="padding:.5rem .875rem;text-align:right;font-family:\'DM Serif Display\',Georgia,serif;font-size:.85rem;color:'+c+';'+(bold?'font-weight:700;':'')+'">'+fmt(Math.abs(amt))+'</td>'
        +'<td style="padding:.5rem .875rem;text-align:right;font-size:.75rem;color:var(--ink-muted);">'+pct(amt,totalIncome)+'</td>'
        +'</tr>';
    };
    var html = '<div style="background:#fff;border:1px solid var(--border);">'
      +'<div style="padding:1rem 1.25rem;border-bottom:2px solid var(--gold);display:flex;justify-content:space-between;">'
      +'<div style="font-family:\'DM Serif Display\',Georgia,serif;font-size:1rem;color:var(--ink);">Profit & Loss — '+period+'</div>'
      +'<div style="font-size:.72rem;color:var(--ink-muted);">India Gully · GSTIN 07AABCV1234F1Z5</div>'
      +'</div>'
      +'<table style="width:100%;border-collapse:collapse;">'
      +'<thead><tr style="background:var(--parch-dk);"><th style="padding:.5rem .875rem;text-align:left;font-size:.65rem;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);">Particulars</th><th style="padding:.5rem .875rem;text-align:right;font-size:.65rem;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);">Amount</th><th style="padding:.5rem .875rem;text-align:right;font-size:.65rem;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);">% of Revenue</th></tr></thead>'
      +'<tbody>'
      +'<tr style="background:#fafafa;"><td colspan="3" style="padding:.4rem .875rem;font-size:.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);">INCOME</td></tr>'
      +d.income.map(r=>row(r.name,r.amt,false,true)).join('')
      +'<tr style="background:#f0fdf4;"><td style="padding:.5rem .875rem;font-size:.82rem;font-weight:700;">Total Revenue</td><td style="padding:.5rem .875rem;text-align:right;font-family:\'DM Serif Display\',Georgia,serif;font-size:.95rem;font-weight:700;color:#15803d;">'+fmt(totalIncome)+'</td><td style="padding:.5rem .875rem;text-align:right;font-size:.75rem;color:var(--ink-muted);">100%</td></tr>'
      +'<tr style="background:#fafafa;"><td colspan="3" style="padding:.4rem .875rem;font-size:.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#2563eb;">COST OF SERVICES</td></tr>'
      +d.cogs.map(r=>row(r.name,-r.amt,false,true,'#2563eb')).join('')
      +'<tr style="background:#eff6ff;"><td style="padding:.5rem .875rem;font-size:.82rem;font-weight:700;">Gross Profit</td><td style="padding:.5rem .875rem;text-align:right;font-family:\'DM Serif Display\',Georgia,serif;font-size:.95rem;font-weight:700;color:#1d4ed8;">'+fmt(grossProfit)+'</td><td style="padding:.5rem .875rem;text-align:right;font-size:.75rem;color:var(--ink-muted);">'+pct(grossProfit,totalIncome)+'</td></tr>'
      +'<tr style="background:#fafafa;"><td colspan="3" style="padding:.4rem .875rem;font-size:.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#7c3aed;">OPERATING EXPENSES</td></tr>'
      +d.opex.map(r=>row(r.name,-r.amt,false,true,'#7c3aed')).join('')
      +'<tr style="background:#fdf4ff;"><td style="padding:.5rem .875rem;font-size:.82rem;font-weight:700;">EBITDA</td><td style="padding:.5rem .875rem;text-align:right;font-family:\'DM Serif Display\',Georgia,serif;font-size:.95rem;font-weight:700;color:'+(ebitda>=0?'#6d28d9':'#dc2626')+';">'+fmt(Math.abs(ebitda))+(ebitda<0?' (Loss)':'')+'</td><td style="padding:.5rem .875rem;text-align:right;font-size:.75rem;color:var(--ink-muted);">'+pct(ebitda,totalIncome)+'</td></tr>'
      +row('Income Tax (25% of EBITDA)',-tax,false,true,'#dc2626')
      +'<tr style="background:var(--ink);"><td style="padding:.75rem .875rem;font-size:.875rem;font-weight:700;color:#fff;">Net Profit After Tax</td><td style="padding:.75rem .875rem;text-align:right;font-family:\'DM Serif Display\',Georgia,serif;font-size:1.1rem;font-weight:700;color:var(--gold);">'+(netProfit>=0?'':'(Loss) ')+fmt(Math.abs(netProfit))+'</td><td style="padding:.75rem .875rem;text-align:right;font-size:.75rem;color:rgba(255,255,255,.6);">'+pct(netProfit,totalIncome)+'</td></tr>'
      +'</tbody></table></div>';
    document.getElementById('pl-table-container').innerHTML = html;
  };

  // ── Add Expense ────────────────────────────────────────────────────────────
  window.igAddExpense = function(){
    var amt=parseFloat(document.getElementById('exp-amt').value)||0;
    var desc=document.getElementById('exp-desc').value.trim();
    if(!desc||amt<=0){igToast('Enter description and amount','warn');return;}
    var cat=document.getElementById('exp-cat').value;
    var vendor=document.getElementById('exp-vendor').value||'—';
    var date=document.getElementById('exp-date').value;
    var dateFmt=date?new Date(date).toLocaleDateString('en-IN',{day:'numeric',month:'short'}):'Today';
    var tbody=document.querySelector('#exp-table tbody');
    var tr=document.createElement('tr');
    tr.innerHTML='<td style="font-size:.78rem;color:var(--ink-muted);">'+dateFmt+'</td>'
      +'<td><span class="badge b-dk" style="font-size:.6rem;">'+cat+'</span></td>'
      +'<td style="font-size:.82rem;">'+desc+'</td>'
      +'<td style="font-size:.75rem;color:var(--ink-muted);">'+vendor+'</td>'
      +'<td style="font-family:\'DM Serif Display\',Georgia,serif;">₹'+amt.toLocaleString('en-IN')+'</td>';
    tbody.insertBefore(tr,tbody.firstChild);
    igToast('Expense recorded: '+cat+' — ₹'+amt.toLocaleString('en-IN'),'success');
    togglePanel('add-exp-panel');
    document.getElementById('exp-amt').value='';
    document.getElementById('exp-desc').value='';
    document.getElementById('exp-vendor').value='';
  };

  // Init
  document.getElementById('inv-num-preview').textContent = 'INV-2025-004';

  /* ── Finance: load live summary + invoices from API ── */
  igApi.get('/finance/summary').then(function(d){
    if(!d) return;
    var r=d.revenue,e=d.expenses,p=d.profit,g=d.gst;
    function fmtRs(n){return n>=100000?'₹'+(n/100000).toFixed(1)+'L':'₹'+n.toLocaleString('en-IN');}
    var kpiEls=document.querySelectorAll('.fin-kpi');
    var vals=[fmtRs(r.mtd),fmtRs(e.mtd),fmtRs(p.mtd),'₹'+(g.payable/100000).toFixed(1)+'L'];
    var trends=['↑ +'+r.growth_pct+'%','↓ -2.1%',p.margin_pct+'% margin','Due '+g.due_date];
    kpiEls.forEach(function(el,i){
      if(vals[i]){
        var v=el.querySelector('.kpi-v'); var t=el.querySelector('.kpi-t');
        if(v)v.textContent=vals[i]; if(t)t.textContent=trends[i];
      }
    });
  });
  igApi.get('/invoices').then(function(d){
    if(!d) return;
    var tbody=document.getElementById('inv-tbody');
    if(!tbody) return;
    tbody.innerHTML='';
    d.invoices.forEach(function(inv){
      var statusCol=inv.status==='Paid'?'#15803d':inv.status==='Overdue'?'#dc2626':'#d97706';
      tbody.innerHTML+='<tr><td style="font-size:.78rem;font-weight:600;">'+inv.id+'</td>'
        +'<td style="font-size:.78rem;">'+inv.client+'</td>'
        +'<td style="font-size:.78rem;">'+inv.date+'</td>'
        +'<td style="font-family:\'DM Serif Display\',Georgia,serif;">₹'+inv.amount.toLocaleString('en-IN')+'</td>'
        +'<td><span style="font-size:.62rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:'+statusCol+';border:1px solid '+statusCol+'20;padding:.15rem .5rem;">'+inv.status+'</span></td>'
        +'<td><button onclick="igToast(\''+inv.id+' PDF opened\',\'success\')" style="background:none;border:1px solid var(--border);padding:.2rem .5rem;font-size:.65rem;cursor:pointer;color:var(--gold);"><i class="fas fa-download"></i></button></td>'
        +'</tr>';
    });
  });
  igApi.get('/finance/gst/gstr3b').then(function(d){
    if(!d) return;
    var el=document.getElementById('gst-payable-val');
    if(el) el.textContent='₹'+((d.net_payable.cgst+d.net_payable.sgst)/100000).toFixed(1)+'L ('+d.status+')';
  });
  /* ── e-Invoice IRN generation — wired to real API ── */
  window.igGenIRN = function(){
    igConfirm('Generate e-Invoice IRN for this invoice via IRP?',function(){
      igToast('Submitting to IRP…','info');
      igApi.post('/finance/einvoice/generate',{
        supplier_gstin:'07AABCV1234F1Z5',
        buyer_gstin:'27AABCD1234E1Z5',
        invoice_no:'INV-2025-003',
        invoice_date:new Date().toISOString().slice(0,10),
        invoice_type:'INV',
        supply_type:'B2B',
        line_items:[{description:'Advisory Retainer',sac:'998313',qty:1,unit_price:271186,taxable_value:271186,cgst_rate:9,sgst_rate:9,cgst_amount:24407,sgst_amount:24407}],
        total_taxable:271186, cgst:24407, sgst:24407, invoice_value:320000
      }).then(function(d){
        if(d && d.irn){
          igToast('IRN generated: '+d.irn.substring(0,16)+'…','success');
          var el=document.getElementById('irn-display');
          if(el) el.textContent=d.irn;
        } else {
          igToast('IRN generation failed — check GSTIN','error');
        }
      });
    });
  };
  </script>`
  return c.html(layout('Finance ERP', adminShell('Finance ERP', 'finance', body), {noNav:true,noFooter:true}))
})

// ── HR ERP ────────────────────────────────────────────────────────────────────
app.get('/hr', (c) => {
  const body = `
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:1rem;margin-bottom:1.5rem;">
    ${[
      {label:'Total Employees',value:'3',   c:'#2563eb'},
      {label:'Present Today',  value:'3',   c:'#16a34a'},
      {label:'On Leave',       value:'0',   c:'#d97706'},
      {label:'Leave Pending',  value:'1',   c:'#dc2626'},
      {label:'Payroll Month',  value:'Mar', c:'#7c3aed'},
    ].map(s=>`<div class="am"><div style="font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.5rem;">${s.label}</div><div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:${s.c};">${s.value}</div></div>`).join('')}
  </div>

  <!-- HR Tab Nav -->
  <div style="display:flex;gap:0;margin-bottom:1.5rem;border-bottom:2px solid var(--border);">
    ${['Employees','Attendance','Leave Mgmt','Payroll','Reports','Tax Declaration','Onboarding','Appraisals','Form-16'].map((t,i)=>`<button onclick="igHrTab(${i})" id="hr-tab-${i}" style="padding:.6rem 1.1rem;font-size:.78rem;font-weight:600;cursor:pointer;border:none;background:none;color:${i===0?'var(--gold)':'var(--ink-muted)'};border-bottom:${i===0?'2px solid var(--gold)':'2px solid transparent'};letter-spacing:.04em;text-transform:uppercase;margin-bottom:-2px;white-space:nowrap;">${t}</button>`).join('')}
  </div>

  <!-- Tab 0: Employees -->
  <div id="hr-pane-0">
    <div style="margin-bottom:1rem;"><button onclick="togglePanel('add-emp-panel')" style="background:var(--gold);color:#fff;border:none;padding:.5rem 1rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-user-plus" style="margin-right:.4rem;"></i>Add Employee</button></div>
    <div id="add-emp-panel" class="ig-panel" style="margin-bottom:1.5rem;">
      <h4 style="font-size:.82rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin-bottom:.875rem;">New Employee Onboarding</h4>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:.875rem;">
        <div><label class="ig-label">Full Name</label><input type="text" id="emp-name" class="ig-input" placeholder="Full Name" style="font-size:.82rem;"></div>
        <div><label class="ig-label">Designation</label><input type="text" id="emp-des" class="ig-input" placeholder="Job Title" style="font-size:.82rem;"></div>
        <div><label class="ig-label">Department</label><select id="emp-dept" class="ig-input" style="font-size:.82rem;"><option>Leadership</option><option>Operations</option><option>Advisory</option><option>Finance</option><option>HR</option><option>Technology</option></select></div>
        <div><label class="ig-label">Date of Joining</label><input type="date" id="emp-doj" class="ig-input" style="font-size:.82rem;"></div>
        <div><label class="ig-label">Employee Email</label><input type="email" id="emp-email" class="ig-input" placeholder="emp@indiagully.com" style="font-size:.82rem;"></div>
        <div><label class="ig-label">Annual CTC (₹)</label><input type="number" id="emp-ctc" class="ig-input" placeholder="1200000" style="font-size:.82rem;"></div>
        <div><label class="ig-label">PAN Number</label><input type="text" id="emp-pan" class="ig-input" placeholder="ABCDE1234F" style="font-size:.82rem;text-transform:uppercase;"></div>
        <div><label class="ig-label">Portal Role</label><select id="emp-role" class="ig-input" style="font-size:.82rem;"><option>Employee</option><option>Manager</option><option>KMP</option><option>Director</option></select></div>
        <div style="display:flex;align-items:flex-end;gap:.5rem;">
          <label style="display:flex;align-items:center;gap:.4rem;font-size:.78rem;cursor:pointer;"><input type="checkbox" id="emp-portal" checked> Create Portal Login</label>
        </div>
      </div>
      <div style="display:flex;gap:.75rem;margin-top:.875rem;">
        <button onclick="igAddEmployee()" style="background:var(--gold);color:#fff;border:none;padding:.45rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;">Add & Onboard</button>
        <button onclick="togglePanel('add-emp-panel')" style="background:none;border:1px solid var(--border);padding:.45rem 1rem;font-size:.72rem;cursor:pointer;color:var(--ink-muted);">Cancel</button>
      </div>
    </div>
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Employee Directory</h3></div>
      <table class="ig-tbl" id="emp-table">
        <thead><tr><th>ID</th><th>Employee</th><th>Designation</th><th>Dept</th><th>Email</th><th>Joined</th><th>CTC</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody id="emp-tbody">
          ${[
            {id:'IG-0001',name:'Arun Manikonda', des:'Managing Director',    dept:'Leadership',email:'akm@indiagully.com',    join:'01 Apr 2017',ctc:'₹18L',  cls:'b-gr'},
            {id:'IG-0002',name:'Pavan Manikonda',des:'Executive Director',   dept:'Operations',email:'pavan@indiagully.com',  join:'01 Apr 2017',ctc:'₹15L',  cls:'b-gr'},
            {id:'IG-0003',name:'Amit Jhingan',   des:'President, Real Estate',dept:'Advisory', email:'amit.j@indiagully.com',join:'01 Jan 2020',ctc:'₹21L',  cls:'b-gr'},
          ].map(e=>`<tr id="emp-row-${e.id}">
            <td style="font-size:.72rem;color:var(--gold);font-weight:600;">${e.id}</td>
            <td style="font-weight:500;">${e.name}</td>
            <td style="font-size:.82rem;">${e.des}</td>
            <td><span class="badge b-dk">${e.dept}</span></td>
            <td style="font-size:.72rem;color:var(--ink-muted);">${e.email}</td>
            <td style="font-size:.75rem;color:var(--ink-muted);">${e.join}</td>
            <td style="font-family:'DM Serif Display',Georgia,serif;">${e.ctc}</td>
            <td><span class="badge ${e.cls}">Active</span></td>
            <td style="display:flex;gap:.3rem;">
              <button onclick="igToast('Payslip for ${e.name} — generating','success')" style="background:none;border:1px solid var(--border);padding:.25rem .5rem;font-size:.65rem;cursor:pointer;color:var(--gold);" title="Payslip"><i class="fas fa-file-invoice"></i></button>
              <button onclick="igHrViewEmp('${e.name}','${e.des}','${e.ctc}')" style="background:none;border:1px solid var(--border);padding:.25rem .5rem;font-size:.65rem;cursor:pointer;color:var(--ink-muted);" title="View Profile"><i class="fas fa-eye"></i></button>
              <button onclick="igConfirm('Deactivate ${e.name}?',function(){igToast('${e.name} deactivated from system','warn');})" style="background:none;border:1px solid #fca5a5;padding:.25rem .5rem;font-size:.65rem;cursor:pointer;color:#dc2626;" title="Deactivate"><i class="fas fa-user-times"></i></button>
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Tab 1: Attendance -->
  <div id="hr-pane-1" style="display:none;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;">
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Today's Attendance — 28 Feb 2025</h3>
          <button onclick="igToast('Attendance report exported','success')" style="background:var(--ink);color:#fff;border:none;padding:.3rem .75rem;font-size:.68rem;font-weight:600;cursor:pointer;"><i class="fas fa-download" style="margin-right:.3rem;"></i>Export</button>
        </div>
        <table class="ig-tbl">
          <thead><tr><th>Employee</th><th>Check In</th><th>Check Out</th><th>Hours</th><th>Status</th></tr></thead>
          <tbody>
            ${[
              {name:'Arun Manikonda', in:'09:05 AM',out:'—',      hrs:'In Office',ok:'present'},
              {name:'Pavan Manikonda',in:'09:18 AM',out:'—',      hrs:'In Office',ok:'present'},
              {name:'Amit Jhingan',   in:'09:30 AM',out:'—',      hrs:'In Office',ok:'late'},
            ].map(r=>`<tr>
              <td style="font-weight:500;font-size:.85rem;">${r.name}</td>
              <td style="font-size:.82rem;color:#15803d;">${r.in}</td>
              <td style="font-size:.82rem;color:var(--ink-muted);">${r.out}</td>
              <td style="font-size:.78rem;color:var(--ink-muted);">${r.hrs}</td>
              <td><span class="badge ${r.ok==='present'?'b-gr':r.ok==='late'?'b-g':'b-re'}">${r.ok==='present'?'Present':r.ok==='late'?'Late':'Absent'}</span></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">MTD Summary — February 2025</h3></div>
        <div style="padding:1.25rem;">
          ${[
            {name:'Arun Manikonda',  present:19,late:1,absent:0,pct:'100%',c:'#16a34a'},
            {name:'Pavan Manikonda', present:18,late:2,absent:0,pct:'100%',c:'#16a34a'},
            {name:'Amit Jhingan',    present:17,late:3,absent:1,pct:'90%', c:'#d97706'},
          ].map(e=>`<div style="margin-bottom:1rem;padding-bottom:1rem;border-bottom:1px solid var(--border);">
            <div style="display:flex;justify-content:space-between;margin-bottom:.4rem;">
              <span style="font-size:.85rem;font-weight:500;color:var(--ink);">${e.name}</span>
              <span style="font-size:.82rem;font-weight:700;color:${e.c};">${e.pct}</span>
            </div>
            <div style="display:flex;gap:.5rem;font-size:.72rem;color:var(--ink-muted);margin-bottom:.35rem;">
              <span style="color:#16a34a;">✓ ${e.present} Present</span>
              <span style="color:#d97706;">⚠ ${e.late} Late</span>
              <span style="color:#dc2626;">✗ ${e.absent} Absent</span>
            </div>
            <div style="height:5px;background:#e5e7eb;"><div style="height:5px;width:${e.pct};background:${e.c};"></div></div>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>

  <!-- Tab 2: Leave Management -->
  <div id="hr-pane-2" style="display:none;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;">
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Pending Leave Requests</h3></div>
        <div id="leave-req-list">
          <div style="padding:1.25rem;border-bottom:1px solid var(--border);">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.5rem;">
              <div><div style="font-size:.875rem;font-weight:500;color:var(--ink);">Amit Jhingan</div><div style="font-size:.72rem;color:var(--ink-muted);margin-top:.1rem;">Casual Leave · 5 Mar – 7 Mar 2025 (3 days)</div></div>
              <span id="lv-badge-1" class="badge b-g">Pending</span>
            </div>
            <div style="font-size:.78rem;color:var(--ink-muted);margin-bottom:.75rem;">Reason: Personal — attending family event in Chandigarh</div>
            <div style="display:flex;gap:.5rem;">
              <button onclick="igApproveLeave(1,'Amit Jhingan','3 days Casual')" style="background:#16a34a;color:#fff;border:none;padding:.35rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;"><i class="fas fa-check" style="margin-right:.3rem;"></i>Approve</button>
              <button onclick="igRejectLeave(1,'Amit Jhingan')" style="background:#dc2626;color:#fff;border:none;padding:.35rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;"><i class="fas fa-times" style="margin-right:.3rem;"></i>Reject</button>
              <button onclick="igToast('Clarification requested from Amit Jhingan','info')" style="background:none;border:1px solid var(--border);padding:.35rem .875rem;font-size:.72rem;cursor:pointer;color:var(--ink-muted);">Ask Clarification</button>
            </div>
          </div>
        </div>
      </div>
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Leave Balance Summary</h3></div>
        <table class="ig-tbl">
          <thead><tr><th>Employee</th><th>Casual</th><th>Sick</th><th>Earned</th><th>Opt.</th></tr></thead>
          <tbody>
            ${[
              {name:'Arun Manikonda', cl:12,sl:12,el:15,oh:2},
              {name:'Pavan Manikonda',cl:12,sl:12,el:12,oh:2},
              {name:'Amit Jhingan',   cl:10,sl:12,el:12,oh:2},
            ].map(e=>`<tr>
              <td style="font-weight:500;font-size:.85rem;">${e.name}</td>
              <td style="font-family:'DM Serif Display',Georgia,serif;">${e.cl}</td>
              <td style="font-family:'DM Serif Display',Georgia,serif;">${e.sl}</td>
              <td style="font-family:'DM Serif Display',Georgia,serif;">${e.el}</td>
              <td style="font-family:'DM Serif Display',Georgia,serif;">${e.oh}</td>
            </tr>`).join('')}
          </tbody>
        </table>
        <div style="padding:.875rem 1.25rem;border-top:1px solid var(--border);">
          <button onclick="igToast('Leave balance report exported','success')" style="background:none;border:1px solid var(--border);padding:.4rem .875rem;font-size:.72rem;font-weight:500;cursor:pointer;color:var(--ink);"><i class="fas fa-download" style="margin-right:.3rem;"></i>Export Leave Report</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Tab 3: Payroll (Phase 6 — full payroll builder + TDS + salary structure) -->
  <div id="hr-pane-3" style="display:none;">
    <!-- Payroll Builder Header -->
    <div style="display:flex;gap:.75rem;align-items:center;margin-bottom:1.25rem;flex-wrap:wrap;">
      <select id="payroll-month" class="ig-input" style="font-size:.82rem;max-width:180px;" onchange="document.getElementById('pr-month-display').textContent=this.value">
        <option>March 2025</option><option>February 2025</option><option>January 2025</option>
      </select>
      <button onclick="igToast('Payroll recalculated for March 2025','success')" style="background:none;border:1px solid var(--border);padding:.4rem .875rem;font-size:.75rem;cursor:pointer;color:var(--ink);"><i class="fas fa-sync" style="margin-right:.3rem;font-size:.7rem;"></i>Recalculate</button>
      <button onclick="togglePanel('salary-structure-panel')" style="background:none;border:1px solid var(--border);padding:.4rem .875rem;font-size:.75rem;cursor:pointer;color:var(--ink);"><i class="fas fa-sliders-h" style="margin-right:.3rem;font-size:.7rem;"></i>Salary Structure</button>
      <button onclick="togglePanel('tds-panel')" style="background:none;border:1px solid var(--border);padding:.4rem .875rem;font-size:.75rem;cursor:pointer;color:var(--ink);"><i class="fas fa-percent" style="margin-right:.3rem;font-size:.7rem;"></i>TDS Declarations</button>
    </div>

    <!-- Salary Structure Panel -->
    <div id="salary-structure-panel" class="ig-panel" style="margin-bottom:1.25rem;">
      <h4 style="font-size:.82rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin-bottom:.875rem;">Salary Structure Configuration</h4>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:.875rem;margin-bottom:.875rem;">
        ${[
          {l:'Basic Salary %',      v:'50', h:'% of CTC'},
          {l:'HRA %',               v:'20', h:'% of CTC'},
          {l:'Special Allowance %', v:'30', h:'% of CTC (residual)'},
          {l:'PF Contribution %',   v:'12', h:'% of Basic (Emp + Employer)'},
          {l:'Professional Tax',    v:'200',h:'₹ per month (flat)'},
          {l:'LTA Component %',     v:'5',  h:'% of Basic annually'},
          {l:'Medical Allowance',   v:'1250',h:'₹ per month'},
          {l:'Bonus %',             v:'8.33',h:'% of Basic (statutory)'},
        ].map(f=>`<div><label class="ig-label">${f.l} <span style="font-size:.62rem;color:var(--ink-faint);">(${f.h})</span></label><input type="number" class="ig-input" value="${f.v}" style="font-size:.82rem;"></div>`).join('')}
      </div>
      <div style="display:flex;gap:.75rem;">
        <button onclick="igToast('Salary structure saved — effective from next payroll cycle','success');togglePanel('salary-structure-panel')" style="background:var(--gold);color:#fff;border:none;padding:.45rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;">Save Structure</button>
        <button onclick="togglePanel('salary-structure-panel')" style="background:none;border:1px solid var(--border);padding:.45rem 1rem;font-size:.72rem;cursor:pointer;color:var(--ink-muted);">Close</button>
      </div>
    </div>

    <!-- TDS Declarations Panel -->
    <div id="tds-panel" class="ig-panel" style="margin-bottom:1.25rem;">
      <h4 style="font-size:.82rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin-bottom:.875rem;">TDS & Tax Declaration (FY 2025-26)</h4>
      <table class="ig-tbl">
        <thead><tr><th>Employee</th><th>Gross (Annual)</th><th>80C (Investments)</th><th>80D (Medical)</th><th>HRA Exemption</th><th>LTA Claimed</th><th>Net Taxable</th><th>TDS/mo</th><th>Action</th></tr></thead>
        <tbody>
          ${[
            {name:'Arun Manikonda', gross:1800000, c80:150000, d80:25000, hra:360000, lta:0,    regime:'New'},
            {name:'Pavan Manikonda',gross:1500000, c80:150000, d80:25000, hra:300000, lta:45000, regime:'Old'},
            {name:'Amit Jhingan',   gross:2100000, c80:150000, d80:25000, hra:420000, lta:0,    regime:'New'},
          ].map(e=>{
            const taxable = Math.max(0, e.gross - (e.regime==='Old' ? e.c80+e.d80+e.hra+e.lta : 75000));
            const tax = taxable<=300000?0:taxable<=700000?(taxable-300000)*0.05:taxable<=1000000?20000+(taxable-700000)*0.10:50000+(taxable-1000000)*0.15;
            const tdspm = Math.round(tax/12);
            return `<tr>
              <td style="font-weight:500;">${e.name}</td>
              <td style="font-family:'DM Serif Display',Georgia,serif;font-size:.82rem;">₹${(e.gross/100000).toFixed(1)}L</td>
              <td style="font-size:.78rem;color:#16a34a;">₹${(e.c80/1000).toFixed(0)}K</td>
              <td style="font-size:.78rem;color:#16a34a;">₹${(e.d80/1000).toFixed(0)}K</td>
              <td style="font-size:.78rem;color:#16a34a;">₹${(e.hra/1000).toFixed(0)}K</td>
              <td style="font-size:.78rem;color:#16a34a;">₹${e.lta/1000}K</td>
              <td style="font-family:'DM Serif Display',Georgia,serif;font-size:.82rem;color:var(--ink);">₹${(taxable/100000).toFixed(2)}L</td>
              <td style="font-weight:700;color:#dc2626;">₹${tdspm.toLocaleString('en-IN')}</td>
              <td><button onclick="igToast('TDS declaration form for ${e.name} opened','info')" style="background:none;border:1px solid var(--border);padding:.2rem .5rem;font-size:.65rem;cursor:pointer;color:var(--gold);">Edit</button></td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
      <div style="margin-top:1rem;display:flex;gap:.75rem;">
        <button onclick="igToast('TDS declarations saved for all employees','success')" style="background:var(--gold);color:#fff;border:none;padding:.45rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;">Save All Declarations</button>
        <button onclick="igToast('Form-16 Part A generated for all employees','success')" style="background:#16a34a;color:#fff;border:none;padding:.45rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;">Generate Form-16</button>
        <button onclick="togglePanel('tds-panel')" style="background:none;border:1px solid var(--border);padding:.45rem 1rem;font-size:.72rem;cursor:pointer;color:var(--ink-muted);">Close</button>
      </div>
    </div>

    <!-- Payroll Register -->
    <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
      <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Payroll Register — <span id="pr-month-display">March 2025</span></h3>
        <div style="display:flex;gap:.5rem;align-items:center;">
          <div style="font-size:.72rem;color:var(--gold);font-weight:600;">Total Disbursement: ₹3,63,400</div>
          <button onclick="igToast('Payroll register exported to Excel','success')" style="background:none;border:1px solid var(--border);padding:.3rem .6rem;font-size:.65rem;cursor:pointer;color:var(--gold);"><i class="fas fa-file-excel"></i></button>
        </div>
      </div>
      <div style="overflow-x:auto;">
        <table class="ig-tbl">
          <thead><tr><th>Employee</th><th>Basic</th><th>HRA</th><th>Special</th><th>Medical</th><th>Gross</th><th>PF (Emp)</th><th>PT</th><th>TDS</th><th>Net Pay</th><th>Status</th><th>Slip</th></tr></thead>
          <tbody id="payroll-tbody">
            ${[
              {name:'Arun Manikonda', basic:75000,hra:30000,spl:45000,med:1250,pf:9000,pt:200,tds:15000,cls:'b-gr',processed:true},
              {name:'Pavan Manikonda',basic:62500,hra:25000,spl:37500,med:1250,pf:7500,pt:200,tds:10000,cls:'b-gr',processed:true},
              {name:'Amit Jhingan',   basic:87500,hra:35000,spl:52500,med:1250,pf:10500,pt:200,tds:20000,cls:'b-gr',processed:true},
            ].map(p=>{
              const gross=p.basic+p.hra+p.spl+p.med;
              const net=gross-p.pf-p.pt-p.tds;
              return `<tr>
                <td style="font-weight:500;font-size:.85rem;">${p.name}</td>
                <td style="font-size:.78rem;">₹${(p.basic/1000).toFixed(0)}K</td>
                <td style="font-size:.78rem;">₹${(p.hra/1000).toFixed(0)}K</td>
                <td style="font-size:.78rem;">₹${(p.spl/1000).toFixed(0)}K</td>
                <td style="font-size:.78rem;">₹${p.med}</td>
                <td style="font-weight:600;">₹${(gross/1000).toFixed(2)}K</td>
                <td style="font-size:.75rem;color:#2563eb;">₹${(p.pf/1000).toFixed(1)}K</td>
                <td style="font-size:.75rem;color:var(--ink-muted);">₹${p.pt}</td>
                <td style="font-size:.75rem;color:#dc2626;">₹${(p.tds/1000).toFixed(0)}K</td>
                <td style="font-family:'DM Serif Display',Georgia,serif;color:var(--gold);font-weight:700;">₹${(net/1000).toFixed(2)}K</td>
                <td><span class="badge ${p.cls}">${p.processed?'Processed':'Pending'}</span></td>
                <td><button onclick="igToast('Payslip for ${p.name} — generating PDF','success')" style="background:none;border:1px solid var(--border);padding:.2rem .4rem;font-size:.65rem;cursor:pointer;color:var(--gold);" title="Payslip"><i class="fas fa-file-invoice"></i></button></td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
    </div>

    <!-- Payroll Summary -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">
      ${[
        {l:'Gross Payroll',   v:'₹4,98,750', c:'#2563eb'},
        {l:'Total PF (Emp)',  v:'₹27,000',   c:'#7c3aed'},
        {l:'Total TDS',       v:'₹45,000',   c:'#dc2626'},
        {l:'Net Disbursement',v:'₹3,63,400', c:'#16a34a'},
      ].map(s=>`<div style="background:#fff;border:1px solid var(--border);padding:1rem;"><div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.35rem;">${s.l}</div><div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:${s.c};">${s.v}</div></div>`).join('')}
    </div>

    <!-- Payroll Actions -->
    <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
      <div style="font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--ink-muted);margin-bottom:.875rem;">Payroll Actions</div>
      <div style="display:flex;gap:.75rem;flex-wrap:wrap;">
        <button id="process-payroll-btn" onclick="igProcessPayroll()" style="background:#16a34a;color:#fff;border:none;padding:.6rem 1.5rem;font-size:.82rem;font-weight:600;cursor:pointer;letter-spacing:.06em;text-transform:uppercase;"><i class="fas fa-check" style="margin-right:.4rem;"></i>Process Payroll</button>
        <button onclick="igToast('Payslips emailed to all employees','success')" style="background:var(--ink);color:#fff;border:none;padding:.6rem 1.5rem;font-size:.82rem;font-weight:600;cursor:pointer;"><i class="fas fa-envelope" style="margin-right:.4rem;"></i>Email Payslips</button>
        <button onclick="igToast('NEFT bank transfer file generated — ₹3,63,400','success')" style="background:#2563eb;color:#fff;border:none;padding:.6rem 1.5rem;font-size:.82rem;font-weight:600;cursor:pointer;"><i class="fas fa-university" style="margin-right:.4rem;"></i>Generate Bank File</button>
        <button onclick="igToast('PF ECR challan generated for March 2025','success')" style="background:#7c3aed;color:#fff;border:none;padding:.6rem 1.5rem;font-size:.82rem;font-weight:600;cursor:pointer;"><i class="fas fa-shield-alt" style="margin-right:.4rem;"></i>PF Challan</button>
        <button onclick="igToast('Form-16 bundle generated for FY 2024-25','success')" style="background:none;border:1px solid var(--border);padding:.6rem 1.5rem;font-size:.82rem;font-weight:500;cursor:pointer;color:var(--ink);">Form-16</button>
      </div>
      <div style="margin-top:1rem;padding:.875rem;background:#f0fdf4;border:1px solid #86efac;font-size:.78rem;color:#15803d;display:none;" id="payroll-processed-banner">
        <i class="fas fa-check-circle" style="margin-right:.4rem;"></i> Payroll processed. Net disbursement ₹3,63,400 via NEFT. Payslips emailed within 30 minutes.
      </div>
    </div>
  </div>

  <!-- Tab 4: Reports -->
  <div id="hr-pane-4" style="display:none;">
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;">
      ${[
        {title:'Monthly Payroll Summary',icon:'money-check-alt',color:'#1A3A6B',desc:'Gross, net, deductions and tax for all employees'},
        {title:'Attendance Register',icon:'calendar-check',color:'#16a34a',desc:'Monthly attendance with present/absent/late counts'},
        {title:'Leave Ledger',icon:'umbrella-beach',color:'#7c3aed',desc:'Leave taken, balance, and encashment report'},
        {title:'Form-16 Bundle',icon:'certificate',color:'#d97706',desc:'Part A & B for all employees — current FY'},
        {title:'PF Challan',icon:'shield-alt',color:'#2563eb',desc:'Monthly EPFO challan with ECR file for upload'},
        {title:'HR Analytics',icon:'chart-bar',color:'#0891b2',desc:'Headcount, attrition, department distribution'},
      ].map(r=>`<div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
        <div style="display:flex;align-items:center;gap:.875rem;margin-bottom:.75rem;">
          <div style="width:36px;height:36px;background:${r.color};display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-${r.icon}" style="color:#fff;font-size:.72rem;"></i></div>
          <div style="font-weight:600;font-size:.875rem;color:var(--ink);">${r.title}</div>
        </div>
        <div style="font-size:.75rem;color:var(--ink-muted);margin-bottom:.875rem;">${r.desc}</div>
        <button onclick="igToast('${r.title} — generating...','success')" style="background:var(--gold);color:#fff;border:none;padding:.35rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;width:100%;"><i class="fas fa-download" style="margin-right:.3rem;"></i>Generate & Download</button>
      </div>`).join('')}
    </div>
  </div>

  <!-- hr-pane-5: Tax Declaration (Investment Declaration Portal) -->
  <div id="hr-pane-5" style="display:none;">
    <div class="ig-info" style="margin-bottom:1.25rem;"><i class="fas fa-info-circle"></i><div>Employees can submit investment declarations for FY 2025-26. Deadline: <strong>31 March 2025</strong>. Declared amounts are used for monthly TDS calculation.</div></div>
    <div style="display:grid;grid-template-columns:2fr 1fr;gap:1.5rem;">
      <!-- Declaration Form -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Investment Declaration — FY 2025-26</h3>
          <select id="decl-emp-select" class="ig-input" style="font-size:.78rem;max-width:200px;" onchange="igUpdateTDS()">
            <option value="1800000">Arun Manikonda (₹18L)</option>
            <option value="2400000">Amit Jhingan (₹24L)</option>
            <option value="1500000">Pavan Manikonda (₹15L)</option>
          </select>
        </div>
        <div style="padding:1.25rem;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;">
            <!-- Section 80C -->
            <div style="border:1px solid var(--border);padding:1rem;">
              <div style="font-size:.75rem;font-weight:700;color:#7c3aed;letter-spacing:.06em;text-transform:uppercase;margin-bottom:.75rem;">Section 80C (Max ₹1,50,000)</div>
              ${[
                {l:'PPF / VPF',       id:'d80c-ppf',   ph:'0'},
                {l:'ELSS Funds',      id:'d80c-elss',  ph:'0'},
                {l:'LIC Premium',     id:'d80c-lic',   ph:'0'},
                {l:'Home Loan (P)',    id:'d80c-home',  ph:'0'},
                {l:'5-yr FD / NSC',   id:'d80c-fd',    ph:'0'},
              ].map(f=>`<div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.4rem;">
                <label style="font-size:.72rem;color:var(--ink-muted);width:100px;flex-shrink:0;">${f.l}</label>
                <input type="number" id="${f.id}" class="ig-input" placeholder="${f.ph}" style="font-size:.75rem;" oninput="igUpdateTDS()">
              </div>`).join('')}
            </div>
            <!-- Other Sections -->
            <div style="border:1px solid var(--border);padding:1rem;">
              <div style="font-size:.75rem;font-weight:700;color:#2563eb;letter-spacing:.06em;text-transform:uppercase;margin-bottom:.75rem;">Other Deductions</div>
              ${[
                {l:'80D — Mediclaim',  id:'d80d',  ph:'0', note:'Max ₹25,000 (₹50K sr. citizen)'},
                {l:'HRA Exemption',    id:'dhra',  ph:'0', note:'Metro/non-metro calculation'},
                {l:'LTA Claimed',      id:'dlta',  ph:'0', note:'Twice in 4-year block'},
                {l:'NPS — 80CCD(1B)',  id:'dnps',  ph:'0', note:'Additional ₹50,000 over 80C'},
                {l:'Other Deductions', id:'doth',  ph:'0', note:'80E/80G/80U as applicable'},
              ].map(f=>`<div style="margin-bottom:.5rem;">
                <label style="font-size:.72rem;color:var(--ink-muted);display:block;margin-bottom:.15rem;">${f.l} <span style="font-size:.6rem;color:var(--ink-faint);">(${f.note})</span></label>
                <input type="number" id="${f.id}" class="ig-input" placeholder="${f.ph}" style="font-size:.75rem;" oninput="igUpdateTDS()">
              </div>`).join('')}
            </div>
          </div>
          <!-- Tax Regime Toggle -->
          <div style="display:flex;align-items:center;gap:.875rem;padding:.75rem;background:var(--parch-dk);border:1px solid var(--border);margin-bottom:1rem;">
            <span style="font-size:.78rem;font-weight:600;color:var(--ink);">Tax Regime:</span>
            <label style="display:flex;align-items:center;gap:.35rem;cursor:pointer;"><input type="radio" name="regime" value="new" checked onchange="igUpdateTDS()"><span style="font-size:.78rem;">New Regime (default)</span></label>
            <label style="display:flex;align-items:center;gap:.35rem;cursor:pointer;"><input type="radio" name="regime" value="old" onchange="igUpdateTDS()"><span style="font-size:.78rem;">Old Regime (with deductions)</span></label>
          </div>
          <button onclick="igSubmitDecl()" style="background:var(--gold);color:#fff;border:none;padding:.55rem 1.5rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-paper-plane" style="margin-right:.4rem;"></i>Submit Declaration</button>
        </div>
      </div>
      <!-- Live TDS Calculator -->
      <div>
        <div style="background:#1E1E1E;color:#fff;padding:1.25rem;margin-bottom:1rem;">
          <div style="font-size:.62rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:.5rem;">Live TDS Estimator</div>
          <div style="display:flex;flex-direction:column;gap:.4rem;font-size:.72rem;">
            <div style="display:flex;justify-content:space-between;"><span style="color:rgba(255,255,255,.6);">Gross Annual CTC</span><span id="tds-gross" style="font-weight:600;">₹18,00,000</span></div>
            <div style="display:flex;justify-content:space-between;"><span style="color:rgba(255,255,255,.6);">Total Deductions</span><span id="tds-deduct" style="color:#86efac;">₹0</span></div>
            <div style="display:flex;justify-content:space-between;"><span style="color:rgba(255,255,255,.6);">Standard Deduction</span><span style="color:#86efac;">₹50,000</span></div>
            <div style="height:1px;background:rgba(255,255,255,.1);margin:.3rem 0;"></div>
            <div style="display:flex;justify-content:space-between;"><span style="color:rgba(255,255,255,.6);">Net Taxable Income</span><span id="tds-taxable" style="font-weight:700;color:#fcd34d;">₹17,50,000</span></div>
            <div style="display:flex;justify-content:space-between;"><span style="color:rgba(255,255,255,.6);">Income Tax + Cess</span><span id="tds-tax" style="color:#fca5a5;">₹3,22,500</span></div>
            <div style="height:1px;background:rgba(255,255,255,.1);margin:.3rem 0;"></div>
            <div style="display:flex;justify-content:space-between;"><span style="color:#fff;font-weight:700;">TDS per Month</span><span id="tds-pm" style="font-size:1rem;font-weight:700;color:var(--gold);">₹26,875</span></div>
          </div>
        </div>
        <!-- Declaration Status -->
        <div style="background:#fff;border:1px solid var(--border);">
          <div style="padding:.875rem 1rem;border-bottom:1px solid var(--border);font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;">Declaration Status</div>
          <div style="padding:.875rem;">
            ${[
              {e:'Arun Manikonda',   s:'Submitted', d:'10 Mar 2025', regime:'New'},
              {e:'Amit Jhingan',     s:'Submitted', d:'08 Mar 2025', regime:'Old'},
              {e:'Pavan Manikonda',  s:'Pending',   d:'—',           regime:'—'},
            ].map(e=>`<div style="display:flex;align-items:center;justify-content:space-between;padding:.4rem 0;border-bottom:1px solid var(--border);">
              <div>
                <div style="font-size:.75rem;font-weight:500;">${e.e}</div>
                <div style="font-size:.63rem;color:var(--ink-muted);">${e.d} · ${e.regime}</div>
              </div>
              <span class="badge ${e.s==='Submitted'?'b-gr':'b-re'}" style="font-size:.58rem;">${e.s}</span>
            </div>`).join('')}
            <button onclick="igToast('Reminder sent to pending employees','success')" style="background:none;border:1px solid var(--border);padding:.35rem .75rem;font-size:.7rem;cursor:pointer;color:var(--ink);margin-top:.75rem;width:100%;"><i class="fas fa-bell" style="margin-right:.3rem;"></i>Send Reminders</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- hr-pane-6: Onboarding Wizard -->
  <div id="hr-pane-6" style="display:none;">
    <div style="display:grid;grid-template-columns:1fr 2fr;gap:1.5rem;">
      <!-- Wizard Steps -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Onboarding Wizard</h3></div>
        <div style="padding:1rem;">
          ${[
            {n:1,label:'Basic Details',         done:true,  active:false},
            {n:2,label:'Documents Upload',       done:true,  active:false},
            {n:3,label:'Bank & PF Setup',        done:false, active:true},
            {n:4,label:'IT Declaration',         done:false, active:false},
            {n:5,label:'Asset Allocation',       done:false, active:false},
            {n:6,label:'System Access Grant',    done:false, active:false},
            {n:7,label:'Induction Schedule',     done:false, active:false},
          ].map(s=>`<div onclick="igHrOnboard(${s.n})" style="display:flex;align-items:center;gap:.875rem;padding:.75rem;border-left:3px solid ${s.done?'#16a34a':s.active?'var(--gold)':'var(--border)'};background:${s.active?'#fffbeb':'#fff'};margin-bottom:.3rem;cursor:pointer;">
            <div style="width:28px;height:28px;border-radius:50%;background:${s.done?'#16a34a':s.active?'var(--gold)':'#e2e8f0'};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <span style="font-size:.65rem;font-weight:700;color:#fff;">${s.done?'✓':s.n}</span>
            </div>
            <span style="font-size:.8rem;font-weight:${s.active?'700':'400'};color:${s.done?'#16a34a':s.active?'var(--gold)':'var(--ink-muted)'};">${s.label}</span>
          </div>`).join('')}
          <div style="margin-top:1rem;padding:.75rem;background:var(--parch-dk);border:1px solid var(--border);">
            <div style="font-size:.62rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--ink-muted);margin-bottom:.4rem;">Completion</div>
            <div class="ig-progress-track" style="height:8px;"><div class="ig-progress-fill" style="width:28.5%;background:var(--gold);"></div></div>
            <div style="font-size:.72rem;color:var(--ink-muted);margin-top:.3rem;">2 of 7 steps done</div>
          </div>
        </div>
      </div>
      <!-- Active Step Content -->
      <div id="onboard-content" style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);">
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Step 3: Bank Account & PF Setup</h3>
        </div>
        <div style="padding:1.5rem;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1.5rem;">
            <div>
              <div style="font-size:.75rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--ink);margin-bottom:.75rem;">Salary Bank Account</div>
              ${[
                {l:'Bank Name',          id:'ob-bank',    ph:'HDFC Bank'},
                {l:'Account Number',     id:'ob-acc',     ph:'XXXXXXXXXXXX'},
                {l:'IFSC Code',          id:'ob-ifsc',    ph:'HDFC0001234'},
                {l:'Account Type',       id:'ob-acctype', ph:'Savings'},
              ].map(f=>`<div style="margin-bottom:.5rem;"><label class="ig-label">${f.l}</label><input type="text" id="${f.id}" class="ig-input" placeholder="${f.ph}" style="font-size:.82rem;"></div>`).join('')}
            </div>
            <div>
              <div style="font-size:.75rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--ink);margin-bottom:.75rem;">EPF / UAN Details</div>
              ${[
                {l:'UAN (if existing)',   id:'ob-uan',  ph:'Leave blank if new'},
                {l:'Previous PF Account',id:'ob-pf',   ph:'MH/BAN/000000/000000 or None'},
                {l:'Nomination Name',    id:'ob-nom',  ph:'Spouse / Parent Name'},
              ].map(f=>`<div style="margin-bottom:.5rem;"><label class="ig-label">${f.l}</label><input type="text" id="${f.id}" class="ig-input" placeholder="${f.ph}" style="font-size:.82rem;"></div>`).join('')}
              <div style="margin-top:.875rem;padding:.75rem;background:var(--parch-dk);border:1px solid var(--border);">
                <div style="font-size:.68rem;color:var(--ink-muted);">PF Contribution: <strong>12% Employee + 12% Employer</strong></div>
                <div style="font-size:.68rem;color:var(--ink-muted);margin-top:.2rem;">ESIC: Applicable if salary ≤ ₹21,000/mo</div>
              </div>
            </div>
          </div>
          <div style="display:flex;gap:.75rem;">
            <button onclick="igToast('Bank & PF details saved. Step 3 complete.','success')" style="background:var(--gold);color:#fff;border:none;padding:.55rem 1.5rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-arrow-right" style="margin-right:.4rem;"></i>Save & Continue</button>
            <button onclick="igToast('Onboarding checklist emailed to employee','success')" style="background:none;border:1px solid var(--border);padding:.55rem 1rem;font-size:.78rem;cursor:pointer;color:var(--ink);"><i class="fas fa-envelope" style="margin-right:.4rem;"></i>Email Checklist</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Active Onboardings -->
    <div style="margin-top:1.5rem;background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Active Onboardings</h3></div>
      <table class="ig-tbl"><thead><tr><th>Employee</th><th>Role</th><th>DOJ</th><th>Step</th><th>Progress</th><th>Days Left</th><th>Action</th></tr></thead><tbody>
        ${[
          {name:'Rohan Sharma',   role:'Senior Analyst',    doj:'10 Mar 2025', step:'3/7', pct:43, days:21},
          {name:'Priya Nair',     role:'Finance Executive',  doj:'01 Mar 2025', step:'6/7', pct:86, days:7},
          {name:'Sumit Verma',    role:'HR Coordinator',    doj:'15 Mar 2025', step:'1/7', pct:14, days:26},
        ].map(e=>`<tr>
          <td style="font-size:.82rem;font-weight:500;">${e.name}</td>
          <td style="font-size:.75rem;">${e.role}</td>
          <td style="font-size:.72rem;color:var(--ink-muted);">${e.doj}</td>
          <td style="font-size:.75rem;font-weight:600;color:var(--gold);">${e.step}</td>
          <td style="min-width:100px;"><div style="background:#f1f5f9;height:6px;border-radius:3px;overflow:hidden;"><div style="height:100%;background:${e.pct>=80?'#16a34a':e.pct>=40?'#d97706':'#dc2626'};width:${e.pct}%;"></div></div><span style="font-size:.62rem;color:var(--ink-muted);">${e.pct}%</span></td>
          <td style="font-size:.75rem;color:${e.days<=7?'#dc2626':'var(--ink-muted)'};">${e.days}d</td>
          <td><button onclick="igToast('Opening onboarding for ${e.name}','info')" style="background:none;border:1px solid var(--border);padding:.25rem .625rem;font-size:.68rem;cursor:pointer;color:var(--gold);">Continue</button></td>
        </tr>`).join('')}
      </tbody></table>
    </div>
  </div>

  <!-- Employee Profile Modal -->
  <div id="emp-profile-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:9999;align-items:center;justify-content:center;">
    <div style="background:#fff;width:500px;max-width:95vw;border-top:4px solid var(--gold);">
      <div style="padding:1.25rem 1.5rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Employee Profile</div>
        <button onclick="document.getElementById('emp-profile-modal').style.display='none'" style="background:none;border:none;font-size:1.2rem;cursor:pointer;color:var(--ink-muted);">✕</button>
      </div>
      <div style="padding:1.5rem;">
        <div style="text-align:center;margin-bottom:1.25rem;">
          <div id="emp-modal-avatar" style="width:64px;height:64px;background:var(--gold);display:flex;align-items:center;justify-content:center;margin:0 auto .75rem;font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:#fff;"></div>
          <div id="emp-modal-name" style="font-family:'DM Serif Display',Georgia,serif;font-size:1.15rem;color:var(--ink);"></div>
          <div id="emp-modal-des" style="font-size:.78rem;color:var(--ink-muted);margin-top:.15rem;"></div>
        </div>
        <div id="emp-modal-ctc" style="background:#f0fdf4;border:1px solid #86efac;padding:.875rem;text-align:center;margin-bottom:1rem;">
          <div style="font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#15803d;margin-bottom:.15rem;">Annual CTC</div>
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:#15803d;"></div>
        </div>
        <div style="display:flex;gap:.75rem;">
          <button onclick="igToast('Editing employee profile...','info')" style="background:var(--gold);color:#fff;border:none;padding:.45rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;flex:1;"><i class="fas fa-edit" style="margin-right:.3rem;"></i>Edit Profile</button>
          <button onclick="document.getElementById('emp-profile-modal').style.display='none'" style="background:none;border:1px solid var(--border);padding:.45rem 1rem;font-size:.72rem;cursor:pointer;color:var(--ink-muted);">Close</button>
        </div>
      </div>
    </div>
  </div>

  <!-- hr-pane-7: Appraisals & Performance Management -->
  <div id="hr-pane-7" style="display:none;">
    <div class="ig-info" style="margin-bottom:1.25rem;"><i class="fas fa-star"></i><div><strong>Performance Cycle FY 2025-26:</strong> Mid-year review due 30 Sep 2025. Annual appraisal cycle runs Oct–Nov 2025. KRA setting deadline: 15 Apr 2025.</div></div>
    <div style="display:flex;gap:.75rem;margin-bottom:1.25rem;flex-wrap:wrap;">
      <button onclick="togglePanel('new-appraisal-panel')" style="background:#1E1E1E;color:#fff;border:none;padding:.5rem 1.1rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-plus" style="margin-right:.4rem;"></i>Initiate Appraisal</button>
      <button onclick="igToast('KRA setting forms sent to all employees','success')" style="background:none;border:1px solid var(--border);padding:.5rem 1rem;font-size:.78rem;cursor:pointer;color:var(--ink);"><i class="fas fa-bullseye" style="margin-right:.4rem;"></i>Send KRA Forms</button>
      <button onclick="igToast('360° feedback requests sent','success')" style="background:none;border:1px solid var(--border);padding:.5rem 1rem;font-size:.78rem;cursor:pointer;color:var(--ink);"><i class="fas fa-sync-alt" style="margin-right:.4rem;"></i>360° Feedback</button>
    </div>
    <!-- Initiate Appraisal Panel -->
    <div id="new-appraisal-panel" class="ig-panel" style="margin-bottom:1.5rem;">
      <h4 style="font-size:.82rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin-bottom:.875rem;">Initiate Performance Appraisal</h4>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:.875rem;margin-bottom:.875rem;">
        <div><label class="ig-label">Employee</label><select class="ig-input" style="font-size:.82rem;"><option>Arun Manikonda</option><option>Pavan Manikonda</option><option>Amit Jhingan</option></select></div>
        <div><label class="ig-label">Appraisal Type</label><select class="ig-input" style="font-size:.82rem;"><option>Annual Review</option><option>Mid-Year Review</option><option>Probation Completion</option><option>Promotion Review</option></select></div>
        <div><label class="ig-label">Review Period</label><select class="ig-input" style="font-size:.82rem;"><option>FY 2024-25 (Apr 24 – Mar 25)</option><option>H1 FY 2025-26</option></select></div>
        <div><label class="ig-label">Reviewer</label><select class="ig-input" style="font-size:.82rem;"><option>Arun Manikonda (CEO)</option><option>Pavan Manikonda (COO)</option></select></div>
        <div><label class="ig-label">Self-Assessment Due</label><input type="date" class="ig-input" style="font-size:.82rem;" value="2025-03-31"></div>
        <div><label class="ig-label">Review Meeting Date</label><input type="date" class="ig-input" style="font-size:.82rem;" value="2025-04-15"></div>
      </div>
      <div><label class="ig-label">KRAs / Goals (one per line)</label><textarea class="ig-input" rows="4" placeholder="1. Deliver 3 new HORECA mandates&#10;2. Achieve ₹5Cr revenue in Q1&#10;3. Complete ISO 9001 documentation&#10;4. Train 2 junior advisors" style="font-size:.82rem;"></textarea></div>
      <div style="display:flex;gap:.75rem;margin-top:.875rem;">
        <button onclick="igToast('Appraisal initiated — self-assessment email sent to employee','success');togglePanel('new-appraisal-panel')" style="background:var(--gold);color:#fff;border:none;padding:.45rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;">Initiate & Notify</button>
        <button onclick="togglePanel('new-appraisal-panel')" style="background:none;border:1px solid var(--border);padding:.45rem 1rem;font-size:.72rem;cursor:pointer;color:var(--ink-muted);">Cancel</button>
      </div>
    </div>
    <!-- Appraisal Status Table -->
    <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Appraisal Tracker — FY 2024-25</h3>
        <button onclick="igToast('Appraisal summary exported','success')" style="background:none;border:1px solid var(--border);padding:.3rem .75rem;font-size:.68rem;cursor:pointer;color:var(--gold);"><i class="fas fa-download" style="margin-right:.3rem;"></i>Export</button>
      </div>
      <table class="ig-tbl"><thead><tr><th>Employee</th><th>Type</th><th>Period</th><th>Self-Assessment</th><th>Manager Review</th><th>Rating</th><th>Increment</th><th>Status</th><th>Action</th></tr></thead><tbody>
        ${[
          {name:'Amit Jhingan',   type:'Annual',   period:'FY 2024-25', self:'Submitted',  mgr:'Completed', rating:4.2, incr:'12%',  cls:'b-gr', status:'Completed'},
          {name:'Pavan Manikonda',type:'Annual',   period:'FY 2024-25', self:'Submitted',  mgr:'In Review',  rating:4.0, incr:'—',   cls:'b-g',  status:'In Progress'},
          {name:'Arun Manikonda', type:'Annual',   period:'FY 2024-25', self:'Pending',    mgr:'Pending',    rating:'—', incr:'—',   cls:'b-dk', status:'Pending'},
        ].map(a=>`<tr>
          <td style="font-weight:500;">${a.name}</td>
          <td><span class="badge b-dk" style="font-size:.6rem;">${a.type}</span></td>
          <td style="font-size:.78rem;color:var(--ink-muted);">${a.period}</td>
          <td><span class="badge ${a.self==='Submitted'?'b-gr':a.self==='Pending'?'b-g':'b-dk'}">${a.self}</span></td>
          <td><span class="badge ${a.mgr==='Completed'?'b-gr':a.mgr==='In Review'?'b-g':'b-dk'}">${a.mgr}</span></td>
          <td style="font-weight:700;color:var(--gold);">${a.rating}</td>
          <td style="font-weight:600;color:#16a34a;">${a.incr}</td>
          <td><span class="badge ${a.cls}">${a.status}</span></td>
          <td style="display:flex;gap:.3rem;">
            <button onclick="igToast('${a.name} appraisal form opened','info')" style="background:none;border:1px solid var(--border);padding:.2rem .5rem;font-size:.65rem;cursor:pointer;color:var(--gold);">View</button>
            ${a.status!=='Completed'?`<button onclick="igToast('Reminder sent to ${a.name}','success')" style="background:none;border:1px solid var(--border);padding:.2rem .5rem;font-size:.65rem;cursor:pointer;color:var(--ink-muted);"><i class="fas fa-bell"></i></button>`:''}
          </td>
        </tr>`).join('')}
      </tbody></table>
    </div>
    <!-- Performance Rating Distribution -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;">
      <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);margin-bottom:1rem;">Rating Distribution — FY 2024-25</h3>
        ${[
          {rating:'5 — Exceptional',  count:0, pct:0,  color:'#16a34a'},
          {rating:'4 — Exceeds Exp.', count:2, pct:67, color:'#22c55e'},
          {rating:'3 — Meets Exp.',   count:1, pct:33, color:'#d97706'},
          {rating:'2 — Needs Impr.',  count:0, pct:0,  color:'#f97316'},
          {rating:'1 — Below Std.',   count:0, pct:0,  color:'#dc2626'},
        ].map(r=>`<div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.625rem;">
          <div style="font-size:.75rem;color:var(--ink);width:140px;flex-shrink:0;">${r.rating}</div>
          <div style="flex:1;height:8px;background:#e5e7eb;overflow:hidden;"><div style="height:100%;background:${r.color};width:${r.pct}%;transition:width .5s;"></div></div>
          <div style="font-size:.75rem;font-weight:700;color:${r.color};width:20px;">${r.count}</div>
        </div>`).join('')}
      </div>
      <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);margin-bottom:1rem;">Increment Summary</h3>
        ${[
          {name:'Arun Manikonda',  ctc:'₹18L', incr:'Pending', newCtc:'—',    effective:'TBD'},
          {name:'Pavan Manikonda', ctc:'₹15L', incr:'TBD',     newCtc:'—',    effective:'TBD'},
          {name:'Amit Jhingan',    ctc:'₹21L', incr:'+12%',    newCtc:'₹23.5L',effective:'01 Apr 2025'},
        ].map(e=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:.625rem;border-bottom:1px solid var(--border);">
          <div>
            <div style="font-weight:500;font-size:.85rem;">${e.name}</div>
            <div style="font-size:.72rem;color:var(--ink-muted);">Current: ${e.ctc} · Effective: ${e.effective}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-weight:700;color:${e.incr.startsWith('+')?'#16a34a':'var(--ink-muted)'};">${e.incr}</div>
            <div style="font-size:.72rem;color:var(--ink-muted);">${e.newCtc}</div>
          </div>
        </div>`).join('')}
        <button onclick="igToast('Increment letters generated for all employees','success')" style="margin-top:.875rem;background:var(--gold);color:#fff;border:none;padding:.45rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;width:100%;"><i class="fas fa-envelope" style="margin-right:.4rem;"></i>Generate Increment Letters</button>
      </div>
    </div>
  </div>

  <!-- hr-pane-8: Form-16 Portal -->
  <div id="hr-pane-8" style="display:none;">
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:1rem;margin-bottom:1.5rem;">
      ${[{l:'Total Employees',v:'8',c:'#1A3A6B'},{l:'Form-16 Generated',v:'5 / 8',c:'#16a34a'},{l:'Pending',v:'3',c:'#d97706'},{l:'FY',v:'2024-25',c:'#7c3aed'}].map(k=>`<div style="background:#fff;border:1px solid var(--border);padding:1rem 1.25rem;"><div style="font-size:.68rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.3rem;">${k.l}</div><div style="font-size:1.25rem;font-weight:700;color:${k.c};">${k.v}</div></div>`).join('')}
    </div>
    <!-- Part A: TDS Certificate from employer -->
    <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Form-16 Part A — TDS Certificate Registry</h3>
        <div style="display:flex;gap:.5rem;">
          <select id="f16-fy" class="ig-input" style="font-size:.78rem;padding:.35rem .6rem;"><option>2024-25</option><option>2023-24</option><option>2022-23</option></select>
          <button onclick="igToast('Fetching Part A from TRACES for FY 2024-25…','info')" style="background:var(--ink);color:#fff;border:none;padding:.4rem .9rem;font-size:.78rem;cursor:pointer;"><i class="fas fa-cloud-download-alt" style="margin-right:.4rem;"></i>Fetch TRACES</button>
          <button onclick="igToast('All Part A certificates downloaded','success')" style="background:var(--gold);color:#fff;border:none;padding:.4rem .9rem;font-size:.78rem;cursor:pointer;"><i class="fas fa-file-download" style="margin-right:.4rem;"></i>Download All</button>
        </div>
      </div>
      <div style="overflow-x:auto;"><table style="width:100%;border-collapse:collapse;font-size:.78rem;">
        <thead><tr style="background:#f8f9fa;">${['Employee','PAN','TAN (Employer)','Challan Count','TDS Deposited (₹)','Q4 Filed','Part A Status','Action'].map(h=>`<th style="padding:.6rem 1rem;text-align:left;font-size:.68rem;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-muted);font-weight:600;border-bottom:1px solid var(--border);">${h}</th>`).join('')}</tr></thead>
        <tbody id="f16-tbody">${[
          {nm:'Arun Manikonda',pan:'ABCPA1234D',tan:'DEL01924G',ch:4,tds:'3,47,500',q4:true,s:'Available'},
          {nm:'Pavan Manikonda',pan:'XYZPB5678E',tan:'DEL01924G',ch:4,tds:'2,18,250',q4:true,s:'Available'},
          {nm:'Priya Sharma',pan:'MNOPB2345F',tan:'DEL01924G',ch:3,tds:'98,500',q4:false,s:'Pending Q4'},
          {nm:'Amit Jhingan',pan:'QRSTC9012G',tan:'DEL01924G',ch:4,tds:'1,56,000',q4:true,s:'Available'},
          {nm:'Rahul Verma',pan:'UVWXD3456H',tan:'DEL01924G',ch:3,tds:'74,250',q4:false,s:'Pending Q4'},
          {nm:'Sanya Kapoor',pan:'ABCDE6789I',tan:'DEL01924G',ch:4,tds:'1,12,800',q4:true,s:'Available'},
          {nm:'Vijay Mehta',pan:'FGHIJ0123J',tan:'DEL01924G',ch:2,tds:'45,000',q4:false,s:'Pending Q4'},
          {nm:'Deepa Nair',pan:'KLMNO4567K',tan:'DEL01924G',ch:4,tds:'89,200',q4:true,s:'Available'},
        ].map(r=>`<tr style="border-bottom:1px solid var(--border);"><td style="padding:.55rem 1rem;font-weight:600;">${r.nm}</td><td style="padding:.55rem 1rem;font-family:monospace;font-size:.72rem;">${r.pan}</td><td style="padding:.55rem 1rem;font-family:monospace;font-size:.72rem;color:var(--ink-muted);">${r.tan}</td><td style="padding:.55rem 1rem;text-align:center;">${r.ch}</td><td style="padding:.55rem 1rem;text-align:right;font-weight:600;">₹${r.tds}</td><td style="padding:.55rem 1rem;text-align:center;">${r.q4?'<span style="color:#16a34a;"><i class="fas fa-check"></i></span>':'<span style="color:#d97706;"><i class="fas fa-clock"></i></span>'}</td><td style="padding:.55rem 1rem;"><span style="font-size:.72rem;background:${r.s==='Available'?'#dcfce7':'#fef3c7'};color:${r.s==='Available'?'#166534':'#92400e'};padding:2px 7px;">${r.s}</span></td><td style="padding:.55rem 1rem;"><button onclick="igToast('Form-16 Part A downloaded for ${r.nm.split(' ')[0]}','success')" style="background:none;border:1px solid var(--border);padding:.25rem .6rem;font-size:.68rem;cursor:pointer;color:var(--gold);"><i class="fas fa-download"></i></button></td></tr>`).join('')}
        </tbody>
      </table></div>
    </div>
    <!-- Part B: Salary Computation Statement -->
    <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Form-16 Part B — Salary & Deduction Summary</h3>
        <select id="f16-emp-sel" onchange="igLoadF16(this.value)" class="ig-input" style="font-size:.78rem;padding:.35rem .6rem;">
          <option value="0">Arun Manikonda</option><option value="1">Pavan Manikonda</option><option value="2">Priya Sharma</option><option value="3">Amit Jhingan</option>
        </select>
      </div>
      <div style="padding:1.25rem;display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;">
        <div>
          <h4 style="font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--ink-muted);margin-bottom:.875rem;">Gross Salary Components</h4>
          ${[
            {l:'Basic Salary',v:'₹8,40,000'},{l:'House Rent Allowance',v:'₹3,36,000'},{l:'Transport Allowance',v:'₹24,000'},
            {l:'Medical Allowance',v:'₹15,000'},{l:'Special Allowance',v:'₹1,85,000'},{l:'Bonus / Performance Pay',v:'₹1,50,000'},
          ].map(r=>`<div style="display:flex;justify-content:space-between;padding:.35rem 0;border-bottom:1px solid var(--border);"><span style="font-size:.78rem;color:var(--ink-muted);">${r.l}</span><span style="font-size:.78rem;font-weight:600;">${r.v}</span></div>`).join('')}
          <div style="display:flex;justify-content:space-between;padding:.5rem 0;margin-top:.25rem;background:#f8f9fa;padding:.5rem .75rem;"><span style="font-size:.82rem;font-weight:700;">Gross Total</span><span style="font-size:.82rem;font-weight:700;color:var(--gold);">₹15,50,000</span></div>
        </div>
        <div>
          <h4 style="font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--ink-muted);margin-bottom:.875rem;">Deductions Under Chapter VI-A</h4>
          ${[
            {l:'Sec 80C — PF + ELSS + LIC',v:'₹1,50,000'},{l:'Sec 80D — Medical Insurance',v:'₹25,000'},
            {l:'Sec 80CCD(1B) — NPS',v:'₹50,000'},{l:'HRA Exemption (Sec 10(13A))',v:'₹1,20,000'},
            {l:'Standard Deduction',v:'₹50,000'},{l:'Professional Tax',v:'₹2,400'},
          ].map(r=>`<div style="display:flex;justify-content:space-between;padding:.35rem 0;border-bottom:1px solid var(--border);"><span style="font-size:.78rem;color:var(--ink-muted);">${r.l}</span><span style="font-size:.78rem;font-weight:600;color:#16a34a;">- ${r.v}</span></div>`).join('')}
          <div style="display:flex;justify-content:space-between;padding:.5rem .75rem;margin-top:.25rem;background:#f8f9fa;"><span style="font-size:.82rem;font-weight:700;">Taxable Income</span><span style="font-size:.82rem;font-weight:700;color:#dc2626;">₹11,52,600</span></div>
        </div>
      </div>
      <div style="padding:.875rem 1.25rem;border-top:1px solid var(--border);background:#fffbeb;display:flex;align-items:center;justify-content:space-between;">
        <div style="font-size:.78rem;color:#78350f;"><strong>TDS Deducted:</strong> ₹3,47,500 &nbsp;|&nbsp; <strong>Tax Payable:</strong> ₹3,42,180 &nbsp;|&nbsp; <strong>Refund:</strong> <span style="color:#16a34a;font-weight:600;">₹5,320</span></div>
        <div style="display:flex;gap:.5rem;">
          <button onclick="igToast('Form-16 Part B preview opened','info')" style="background:none;border:1px solid var(--border);padding:.4rem .875rem;font-size:.75rem;cursor:pointer;color:var(--ink);"><i class="fas fa-eye" style="margin-right:.3rem;"></i>Preview</button>
          <button onclick="igToast('Form-16 (Part A + B) generated & emailed to employee','success')" style="background:var(--gold);color:#fff;border:none;padding:.4rem .875rem;font-size:.75rem;font-weight:600;cursor:pointer;"><i class="fas fa-paper-plane" style="margin-right:.3rem;"></i>Generate & Email</button>
        </div>
      </div>
    </div>
    <!-- Bulk operations -->
    <div style="display:flex;gap:.75rem;flex-wrap:wrap;">
      <button onclick="igToast('Bulk Form-16 generation started for all 8 employees…','info')" style="background:var(--ink);color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-layer-group" style="margin-right:.4rem;"></i>Generate All Form-16s</button>
      <button onclick="igToast('Bulk email sent to all employees with Form-16 attached','success')" style="background:var(--gold);color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-envelope-open-text" style="margin-right:.4rem;"></i>Email All Employees</button>
      <button onclick="igToast('Form-16 zip archive downloaded','success')" style="background:none;border:1px solid var(--border);padding:.55rem 1.25rem;font-size:.78rem;cursor:pointer;color:var(--ink);"><i class="fas fa-file-archive" style="margin-right:.4rem;"></i>Download ZIP Bundle</button>
    </div>
  </div>

  <script>
  window.igHrTab = function(idx){
    for(var i=0;i<9;i++){
      var p=document.getElementById('hr-pane-'+i);
      var t=document.getElementById('hr-tab-'+i);
      if(p) p.style.display=i===idx?'block':'none';
      if(t){ t.style.color=i===idx?'var(--gold)':'var(--ink-muted)'; t.style.borderBottom=i===idx?'2px solid var(--gold)':'2px solid transparent'; }
    }
  };
  // ── TDS Live Calculator ──────────────────────────────────────────────────
  window.igUpdateTDS = function(){
    var gross=parseFloat((document.getElementById('decl-emp-select')||{value:'1800000'}).value)||1800000;
    var c80c=(['d80c-ppf','d80c-elss','d80c-lic','d80c-home','d80c-fd'].reduce(function(s,id){var el=document.getElementById(id);return s+(el?parseFloat(el.value)||0:0);},0));
    var c80c_capped=Math.min(c80c,150000);
    var c80d=parseFloat((document.getElementById('d80d')||{value:'0'}).value)||0;
    var hra=parseFloat((document.getElementById('dhra')||{value:'0'}).value)||0;
    var lta=parseFloat((document.getElementById('dlta')||{value:'0'}).value)||0;
    var nps=parseFloat((document.getElementById('dnps')||{value:'0'}).value)||0;
    var oth=parseFloat((document.getElementById('doth')||{value:'0'}).value)||0;
    var regime=(document.querySelector('input[name="regime"]:checked')||{value:'new'}).value;
    var stdDed=50000;
    var totalDed=regime==='old'?(c80c_capped+Math.min(c80d,25000)+hra+lta+Math.min(nps,50000)+oth+stdDed):stdDed;
    var taxable=Math.max(0,gross-totalDed);
    var tax=0;
    if(regime==='new'){
      if(taxable>1500000) tax=150000+(taxable-1500000)*0.30;
      else if(taxable>1200000) tax=90000+(taxable-1200000)*0.20;
      else if(taxable>900000) tax=45000+(taxable-900000)*0.15;
      else if(taxable>600000) tax=15000+(taxable-600000)*0.10;
      else if(taxable>300000) tax=(taxable-300000)*0.05;
    } else {
      if(taxable>1000000) tax=112500+(taxable-1000000)*0.30;
      else if(taxable>500000) tax=12500+(taxable-500000)*0.20;
      else if(taxable>250000) tax=(taxable-250000)*0.05;
    }
    tax=Math.round(tax*1.04); // +4% cess
    var tdspm=Math.round(tax/12);
    var fmt=function(n){return '₹'+Math.round(n).toLocaleString('en-IN');};
    var el=function(id){return document.getElementById(id);};
    if(el('tds-gross')) el('tds-gross').textContent=fmt(gross);
    if(el('tds-deduct')) el('tds-deduct').textContent=fmt(regime==='old'?totalDed-stdDed:0);
    if(el('tds-taxable')) el('tds-taxable').textContent=fmt(taxable);
    if(el('tds-tax')) el('tds-tax').textContent=fmt(tax);
    if(el('tds-pm')) el('tds-pm').textContent=fmt(tdspm);
  };
  window.igSubmitDecl = function(){
    var emp=(document.getElementById('decl-emp-select')||{options:[{text:''}]});
    var empName=emp.options?emp.options[emp.selectedIndex].text:'Employee';
    igToast('Investment declaration for '+empName+' submitted — TDS adjusted from Apr 2025','success');
  };
  window.igHrOnboard = function(step){
    igToast('Navigating to onboarding step '+step,'info');
  };
  window.igAddEmployee = function(){
    var name=document.getElementById('emp-name').value.trim();
    var des=document.getElementById('emp-des').value.trim();
    if(!name||!des){igToast('Enter employee name and designation','warn');return;}
    var dept=document.getElementById('emp-dept').value;
    var ctc=document.getElementById('emp-ctc').value||'—';
    var email=document.getElementById('emp-email').value||'—';
    var tbody=document.querySelector('#emp-table tbody');
    var id='IG-00'+(tbody.children.length+4);
    var tr=document.createElement('tr');
    tr.innerHTML='<td style="font-size:.72rem;color:var(--gold);font-weight:600;">'+id+'</td>'
      +'<td style="font-weight:500;">'+name+'</td>'
      +'<td style="font-size:.82rem;">'+des+'</td>'
      +'<td><span class="badge b-dk">'+dept+'</span></td>'
      +'<td style="font-size:.72rem;color:var(--ink-muted);">'+email+'</td>'
      +'<td style="font-size:.75rem;color:var(--ink-muted);">'+new Date().toLocaleDateString('en-IN',{day:'2-digit',month:'short',year:'numeric'})+'</td>'
      +'<td style="font-family:\'DM Serif Display\',Georgia,serif;">₹'+(parseInt(ctc)/100000).toFixed(1)+'L</td>'
      +'<td><span class="badge b-gr">Active</span></td>'
      +'<td><button onclick="igToast(\'Payslip generating\',\'success\')" style="background:none;border:1px solid var(--border);padding:.25rem .5rem;font-size:.65rem;cursor:pointer;color:var(--gold);"><i class=\'fas fa-file-invoice\'></i></button></td>';
    tbody.insertBefore(tr,tbody.firstChild);
    igToast('Employee '+name+' onboarded. Portal credentials emailed.','success');
    togglePanel('add-emp-panel');
    document.getElementById('emp-name').value='';
    document.getElementById('emp-des').value='';
    document.getElementById('emp-email').value='';
    document.getElementById('emp-ctc').value='';
  };
  window.igApproveLeave = function(id,name,details){
    igConfirm('Approve leave for '+name+' ('+details+')?',function(){
      var badge=document.getElementById('lv-badge-'+id);
      if(badge){badge.textContent='Approved';badge.className='badge b-gr';}
      // Remove action buttons
      var row=badge?badge.closest('.ig-panel,div[style*="border-bottom"]'):null;
      if(row){ var btns=row.querySelectorAll('button');btns.forEach(function(b){if(b.textContent.includes('Approve')||b.textContent.includes('Reject')||b.textContent.includes('Clarification'))b.remove();});}
      igToast('Leave approved for '+name+'. Calendar updated.','success');
    });
  };
  window.igRejectLeave = function(id,name){
    igConfirm('Reject leave request from '+name+'?',function(){
      var badge=document.getElementById('lv-badge-'+id);
      if(badge){badge.textContent='Rejected';badge.className='badge b-re';}
      igToast('Leave rejected for '+name+'. Employee notified.','warn');
    });
  };
  window.igProcessPayroll = function(){
    var month=document.getElementById('payroll-month').value;
    igConfirm('Process payroll for '+month+'? This will initiate bank transfers.',function(){
      // Wire to real API
      igApi.post('/hr/payroll/run',{month:month,employees:'all'}).then(function(d){
        var amt=d&&d.total_disbursed?'₹'+d.total_disbursed.toLocaleString('en-IN'):'';
        if(amt) igToast('Payroll processed — '+amt+' disbursed via bank transfer','success');
      });
      document.getElementById('payroll-processed-banner').style.display='block';
      document.getElementById('process-payroll-btn').textContent='Processed ✓';
      document.getElementById('process-payroll-btn').style.opacity='.6';
      document.getElementById('process-payroll-btn').style.pointerEvents='none';
      igToast('Payroll initiated for '+month+' — processing bank transfers','success');
    });
  };
  window.igHrViewEmp = function(name,des,ctc){
    document.getElementById('emp-modal-avatar').textContent=name.charAt(0);
    document.getElementById('emp-modal-name').textContent=name;
    document.getElementById('emp-modal-des').textContent=des;
    document.getElementById('emp-modal-ctc').querySelector('div:last-child').textContent=ctc+' p.a.';
    var m=document.getElementById('emp-profile-modal');m.style.display='flex';m.style.alignItems='center';m.style.justifyContent='center';
  };

  /* ── HR: load live employee data + attendance from API ── */
  igApi.get('/employees').then(function(d){
    if(!d) return;
    var kpis=document.querySelectorAll('.hr-kpi');
    if(kpis[0]){ kpis[0].querySelector('.kpi-v').textContent=d.total; }
    var tbody=document.getElementById('emp-tbody');
    if(!tbody||!d.employees) return;
    tbody.innerHTML='';
    d.employees.forEach(function(e){
      tbody.innerHTML+='<tr>'
        +'<td><div style="display:flex;align-items:center;gap:.625rem;">'
        +'<div style="width:32px;height:32px;background:var(--gold);display:flex;align-items:center;justify-content:center;font-size:.75rem;font-weight:700;color:#fff;">'+e.name.charAt(0)+'</div>'
        +'<div><div style="font-size:.82rem;font-weight:600;">'+e.name+'</div><div style="font-size:.68rem;color:var(--ink-muted);">'+e.designation+'</div></div></div></td>'
        +'<td style="font-size:.75rem;">'+e.department+'</td>'
        +'<td style="font-size:.75rem;">'+e.id+'</td>'
        +'<td style="font-size:.75rem;">₹'+e.ctc.toLocaleString('en-IN')+'</td>'
        +'<td><span class="badge b-gr" style="font-size:.6rem;">Active</span></td>'
        +'<td><button onclick="igHrViewEmp(\''+e.name+'\',\''+e.designation+'\',\'₹'+e.ctc.toLocaleString('en-IN')+'\')" style="background:none;border:1px solid var(--border);padding:.2rem .5rem;font-size:.65rem;cursor:pointer;color:var(--gold);">View</button></td>'
        +'</tr>';
    });
  });
  igApi.get('/hr/appraisals').then(function(d){
    if(!d) return;
    var kpis=document.querySelectorAll('.hr-kpi');
    if(kpis[2]) kpis[2].querySelector('.kpi-v').textContent=d.status;
  });
  </script>`
  return c.html(layout('HR ERP', adminShell('HR ERP', 'hr', body), {noNav:true,noFooter:true}))
})

// ── GOVERNANCE (Phase 6 — voting engine, KYC, statutory registers, agenda builder) ─
app.get('/governance', (c) => {
  const resolutions = [
    {id:'RES-001', title:'Approval of Q4 FY2024-25 Financial Statements', type:'Ordinary', proposed:'Arun Manikonda', date:'15 Mar 2025', status:'Open',     votes:{yes:0,no:0,abstain:0,total:2}},
    {id:'RES-002', title:'Appointment of Statutory Auditor for FY2025-26',  type:'Ordinary', proposed:'Pavan Manikonda',date:'15 Mar 2025', status:'Open',     votes:{yes:0,no:0,abstain:0,total:2}},
    {id:'RES-003', title:'Approval of Employee ESOP Policy',                 type:'Special',  proposed:'Arun Manikonda', date:'28 Feb 2025', status:'Passed',   votes:{yes:2,no:0,abstain:0,total:2}},
    {id:'RES-004', title:'Authorise MD to sign Advisory Agreement — EVL',    type:'Ordinary', proposed:'Pavan Manikonda',date:'20 Feb 2025', status:'Passed',   votes:{yes:2,no:0,abstain:0,total:2}},
    {id:'RES-005', title:'Approval of Capital Expenditure Budget FY2025-26', type:'Ordinary', proposed:'Arun Manikonda', date:'31 Jan 2025', status:'Deferred', votes:{yes:1,no:0,abstain:1,total:2}},
  ]
  const directors = [
    {name:'Arun Manikonda',  din:'00000001', desig:'Managing Director',  kyc:'Verified', din_status:'Active', dob:'1980-04-15'},
    {name:'Pavan Manikonda', din:'00000002', desig:'Executive Director',  kyc:'Verified', din_status:'Active', dob:'1985-07-22'},
  ]
  const kmps = [
    {name:'Amit Jhingan',   desig:'President — Real Estate', pan:'ABCDE1234F', kyc:'Verified'},
    {name:'Arun Manikonda', desig:'Chief Executive Officer',  pan:'FGHIJ5678K', kyc:'Verified'},
    {name:'Pavan Manikonda',desig:'Chief Financial Officer',  pan:'KLMNO9012L', kyc:'Verified'},
  ]
  const body = `
  <!-- Summary Cards -->
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:1rem;margin-bottom:1.5rem;">
    ${[
      {label:'Directors',          value:'2',      c:'#1E1E1E'},
      {label:'KMPs',               value:'3',      c:'#2563eb'},
      {label:'Open Resolutions',   value:'2',      c:'#d97706'},
      {label:'Board Meetings FY',  value:'3',      c:'#16a34a'},
      {label:'Next Filing',        value:'31 Mar', c:'#dc2626'},
    ].map(s=>`<div class="am"><div style="font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.5rem;">${s.label}</div><div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:${s.c};">${s.value}</div></div>`).join('')}
  </div>

  <!-- Tab Nav -->
  <div style="display:flex;gap:0;margin-bottom:1.5rem;border-bottom:2px solid var(--border);">
    ${['Board Meetings','Voting Engine','Directors & KYC','Statutory Registers','Compliance','DSC & Signatures','SS-1/SS-2 Notices','Agenda Builder'].map((t,i)=>`<button onclick="igGovTab(${i})" id="gov-tab-${i}" style="padding:.6rem 1.1rem;font-size:.78rem;font-weight:600;cursor:pointer;border:none;background:none;color:${i===0?'var(--gold)':'var(--ink-muted)'};border-bottom:${i===0?'2px solid var(--gold)':'2px solid transparent'};letter-spacing:.04em;text-transform:uppercase;margin-bottom:-2px;white-space:nowrap;">${t}</button>`).join('')}
  </div>

  <!-- Tab 0: Board Meetings -->
  <div id="gov-pane-0">
    <div style="margin-bottom:1rem;">
      <button onclick="togglePanel('sched-meeting')" style="background:#1E1E1E;color:#fff;border:none;padding:.5rem 1.1rem;font-size:.78rem;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:.4rem;letter-spacing:.07em;text-transform:uppercase;"><i class="fas fa-calendar-plus"></i>Schedule Board Meeting</button>
    </div>
    <div id="sched-meeting" class="ig-panel" style="margin-bottom:1.5rem;">
      <h4 style="font-size:.82rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:1rem;">Schedule New Board Meeting</h4>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;">
        <div><label class="ig-label">Meeting Type</label><select class="ig-input"><option>Board Meeting</option><option>EGM</option><option>AGM</option><option>Committee Meeting</option></select></div>
        <div><label class="ig-label">Meeting Date</label><input type="date" class="ig-input" id="meet-date"></div>
        <div><label class="ig-label">Time</label><input type="time" class="ig-input" value="11:00"></div>
        <div><label class="ig-label">Venue</label><input type="text" class="ig-input" value="Registered Office, New Delhi"></div>
        <div><label class="ig-label">Mode</label><select class="ig-input"><option>In-Person</option><option>Video Conference</option><option>Hybrid</option></select></div>
        <div><label class="ig-label">Quorum Required</label><input type="text" class="ig-input" value="2 Directors" readonly></div>
      </div>
      <!-- Agenda Builder -->
      <div style="margin-top:1rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.5rem;">
          <label class="ig-label" style="margin:0;">Agenda Items</label>
          <button onclick="igAddAgendaItem()" style="background:var(--gold);color:#fff;border:none;padding:.25rem .625rem;font-size:.68rem;font-weight:600;cursor:pointer;"><i class="fas fa-plus" style="margin-right:.2rem;"></i>Add Item</button>
        </div>
        <div id="agenda-items">
          ${['Approval of Q1 FY2025-26 Financial Statements','Review of Active Mandates & Pipeline','Any Other Business with Permission of Chair'].map((item,i)=>`
          <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.4rem;background:var(--parch-dk);border:1px solid var(--border);padding:.5rem .75rem;" id="agenda-item-${i}">
            <span style="font-size:.75rem;font-weight:700;color:var(--gold);width:18px;flex-shrink:0;">${i+1}.</span>
            <input type="text" value="${item}" class="ig-input" style="flex:1;font-size:.78rem;border:none;background:transparent;padding:.1rem;">
            <button onclick="document.getElementById('agenda-item-${i}').remove();igToast('Agenda item removed','warn')" style="background:none;border:none;cursor:pointer;color:#dc2626;font-size:.72rem;flex-shrink:0;"><i class="fas fa-times"></i></button>
          </div>`).join('')}
        </div>
      </div>
      <div style="display:flex;gap:.75rem;margin-top:1rem;">
        <button onclick="igToast('Board meeting scheduled. Notice with agenda sent to all directors.','success');togglePanel('sched-meeting')" style="background:#1E1E1E;color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;">Schedule & Notify Directors</button>
        <button onclick="igToast('Agenda draft saved','info')" style="background:none;border:1px solid var(--border);padding:.55rem 1.25rem;font-size:.78rem;cursor:pointer;color:var(--ink);">Save Draft</button>
        <button onclick="togglePanel('sched-meeting')" style="background:none;border:1px solid var(--border);padding:.55rem 1.25rem;font-size:.78rem;cursor:pointer;color:var(--ink-muted);">Cancel</button>
      </div>
    </div>
    <!-- Meeting Register -->
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Board Meeting Register</h3>
        <button onclick="igToast('Meeting register exported to PDF','success')" style="background:none;border:1px solid var(--border);padding:.3rem .75rem;font-size:.68rem;cursor:pointer;color:var(--gold);"><i class="fas fa-download" style="margin-right:.3rem;"></i>Export</button>
      </div>
      <table class="ig-tbl"><thead><tr><th>Meeting No.</th><th>Type</th><th>Date</th><th>Venue</th><th>Directors</th><th>Resolutions</th><th>Minutes</th><th>Status</th></tr></thead><tbody>
        ${[
          {no:'BM-03/2024-25',type:'Board Meeting', date:'15 Mar 2025',venue:'New Delhi (Hybrid)',    dirs:'2/2',res:2, min:'Pending',  cls:'b-g'},
          {no:'BM-02/2024-25',type:'Board Meeting', date:'28 Feb 2025',venue:'New Delhi',            dirs:'2/2',res:3, min:'Signed',   cls:'b-gr'},
          {no:'BM-01/2024-25',type:'Board Meeting', date:'15 Jan 2025',venue:'Video Conference',     dirs:'2/2',res:4, min:'Signed',   cls:'b-gr'},
          {no:'EGM-01/2024',   type:'EGM',          date:'20 Dec 2024',venue:'New Delhi',            dirs:'2/2',res:2, min:'Signed',   cls:'b-gr'},
        ].map(m=>`<tr>
          <td style="font-weight:600;font-size:.78rem;color:var(--gold);">${m.no}</td>
          <td><span class="badge b-dk">${m.type}</span></td>
          <td style="font-size:.82rem;white-space:nowrap;">${m.date}</td>
          <td style="font-size:.78rem;color:var(--ink-muted);">${m.venue}</td>
          <td style="font-size:.82rem;text-align:center;">${m.dirs}</td>
          <td style="font-size:.82rem;text-align:center;">${m.res}</td>
          <td><span class="badge ${m.min==='Signed'?'b-gr':'b-g'}">${m.min}</span></td>
          <td>
            <button onclick="igToast('${m.no} minutes opened in editor','success')" style="background:none;border:1px solid var(--border);padding:.2rem .5rem;font-size:.65rem;cursor:pointer;color:var(--gold);" title="Edit Minutes"><i class="fas fa-pen"></i></button>
            <button onclick="igToast('${m.no} downloaded as PDF','success')" style="background:none;border:1px solid var(--border);padding:.2rem .5rem;font-size:.65rem;cursor:pointer;color:var(--ink-muted);" title="Download"><i class="fas fa-download"></i></button>
          </td>
        </tr>`).join('')}
      </tbody></table>
    </div>
  </div>

  <!-- Tab 1: Voting Engine -->
  <div id="gov-pane-1" style="display:none;">
    <div style="margin-bottom:1rem;display:flex;gap:.75rem;">
      <button onclick="togglePanel('new-res-panel')" style="background:#1E1E1E;color:#fff;border:none;padding:.5rem 1.1rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-plus" style="margin-right:.4rem;"></i>New Resolution</button>
      <button onclick="igToast('Voting reminders sent to all directors','success')" style="background:var(--ink);color:#fff;border:none;padding:.5rem 1rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-bell" style="margin-right:.4rem;"></i>Send Voting Reminders</button>
    </div>
    <div id="new-res-panel" class="ig-panel" style="margin-bottom:1.5rem;">
      <h4 style="font-size:.82rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin-bottom:.875rem;">Draft New Resolution</h4>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:.875rem;">
        <div><label class="ig-label">Resolution Title</label><input type="text" class="ig-input" placeholder="e.g. Approval of Annual Accounts" style="font-size:.82rem;"></div>
        <div><label class="ig-label">Type</label><select class="ig-input" style="font-size:.82rem;"><option>Ordinary Resolution</option><option>Special Resolution</option><option>Board Resolution</option></select></div>
        <div><label class="ig-label">Proposed By</label><select class="ig-input" style="font-size:.82rem;"><option>Arun Manikonda</option><option>Pavan Manikonda</option></select></div>
        <div><label class="ig-label">Voting Deadline</label><input type="datetime-local" class="ig-input" style="font-size:.82rem;"></div>
        <div><label class="ig-label">Meeting Reference</label><select class="ig-input" style="font-size:.82rem;"><option>BM-03/2024-25 (15 Mar)</option><option>Circular Resolution</option></select></div>
        <div><label class="ig-label">Threshold to Pass</label><select class="ig-input" style="font-size:.82rem;"><option>Simple Majority (&gt;50%)</option><option>Special Majority (&gt;75%)</option><option>Unanimous</option></select></div>
        <div style="grid-column:span 3;"><label class="ig-label">Resolution Text</label><textarea class="ig-input" rows="3" style="font-size:.82rem;" placeholder="RESOLVED THAT, the Board of Directors hereby..."></textarea></div>
      </div>
      <div style="display:flex;gap:.75rem;margin-top:.875rem;">
        <button onclick="igToast('Resolution RES-006 drafted. Directors notified to vote.','success');togglePanel('new-res-panel')" style="background:#1E1E1E;color:#fff;border:none;padding:.45rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;">Create & Send for Vote</button>
        <button onclick="togglePanel('new-res-panel')" style="background:none;border:1px solid var(--border);padding:.45rem 1rem;font-size:.72rem;cursor:pointer;color:var(--ink-muted);">Cancel</button>
      </div>
    </div>
    <!-- Resolutions Table -->
    <div style="display:flex;flex-direction:column;gap:1rem;">
      ${resolutions.map((r,ri)=>`
      <div style="background:#fff;border:1px solid var(--border);border-left:4px solid ${r.status==='Open'?'#d97706':r.status==='Passed'?'#16a34a':'#94a3b8'};">
        <div style="padding:.875rem 1.25rem;display:flex;justify-content:space-between;align-items:flex-start;">
          <div style="flex:1;">
            <div style="display:flex;align-items:center;gap:.625rem;margin-bottom:.35rem;">
              <span style="font-size:.72rem;font-weight:700;color:var(--gold);">${r.id}</span>
              <span class="badge b-dk" style="font-size:.6rem;">${r.type}</span>
              <span class="badge ${r.status==='Open'?'b-g':r.status==='Passed'?'b-gr':'b-dk'}">${r.status}</span>
            </div>
            <div style="font-size:.9rem;font-weight:600;color:var(--ink);margin-bottom:.25rem;">${r.title}</div>
            <div style="font-size:.72rem;color:var(--ink-muted);">Proposed by ${r.proposed} · Meeting date ${r.date}</div>
          </div>
          ${r.status==='Open'?`
          <div style="display:flex;gap:.5rem;flex-shrink:0;margin-left:1rem;">
            <button onclick="igCastVote(${ri},'yes')" style="background:#16a34a;color:#fff;border:none;padding:.4rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;"><i class="fas fa-check" style="margin-right:.3rem;"></i>For</button>
            <button onclick="igCastVote(${ri},'no')" style="background:#dc2626;color:#fff;border:none;padding:.4rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;"><i class="fas fa-times" style="margin-right:.3rem;"></i>Against</button>
            <button onclick="igCastVote(${ri},'abstain')" style="background:var(--ink-muted);color:#fff;border:none;padding:.4rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;">Abstain</button>
          </div>`:''}
        </div>
        <!-- Vote Tally -->
        <div style="padding:.75rem 1.25rem;border-top:1px solid var(--border);background:var(--parch-dk);display:flex;gap:2rem;align-items:center;" id="vote-tally-${ri}">
          <div style="font-size:.68rem;color:var(--ink-muted);font-weight:700;text-transform:uppercase;letter-spacing:.08em;">Vote Tally (${r.votes.yes+r.votes.no+r.votes.abstain}/${r.votes.total})</div>
          <div style="display:flex;align-items:center;gap:.4rem;"><i class="fas fa-thumbs-up" style="color:#16a34a;font-size:.72rem;"></i><span id="vote-yes-${ri}" style="font-size:.85rem;font-weight:700;color:#16a34a;">${r.votes.yes}</span><span style="font-size:.72rem;color:var(--ink-muted);">For</span></div>
          <div style="display:flex;align-items:center;gap:.4rem;"><i class="fas fa-thumbs-down" style="color:#dc2626;font-size:.72rem;"></i><span id="vote-no-${ri}" style="font-size:.85rem;font-weight:700;color:#dc2626;">${r.votes.no}</span><span style="font-size:.72rem;color:var(--ink-muted);">Against</span></div>
          <div style="display:flex;align-items:center;gap:.4rem;"><i class="fas fa-minus-circle" style="color:#94a3b8;font-size:.72rem;"></i><span id="vote-abs-${ri}" style="font-size:.85rem;font-weight:700;color:#94a3b8;">${r.votes.abstain}</span><span style="font-size:.72rem;color:var(--ink-muted);">Abstain</span></div>
          ${r.votes.yes+r.votes.no+r.votes.abstain>0?`
          <div style="flex:1;height:8px;background:#e5e7eb;overflow:hidden;max-width:200px;">
            <div style="height:100%;background:#16a34a;width:${r.votes.total>0?(r.votes.yes/r.votes.total*100).toFixed(0):'0'}%;transition:width .3s;"></div>
          </div>
          <span style="font-size:.72rem;color:var(--ink-muted);">${r.votes.total>0?(r.votes.yes/r.votes.total*100).toFixed(0):'0'}% for</span>`:''}
        </div>
      </div>`).join('')}
    </div>
  </div>

  <!-- Tab 2: Directors & KYC -->
  <div id="gov-pane-2" style="display:none;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;">
      <!-- Directors -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Directors (§ 170)</h3></div>
        ${directors.map(d=>`
        <div style="padding:1.25rem;border-bottom:1px solid var(--border);">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.75rem;">
            <div>
              <div style="font-weight:600;font-size:.9rem;color:var(--ink);">${d.name}</div>
              <div style="font-size:.75rem;color:var(--ink-muted);">${d.desig} · DIN: ${d.din}</div>
            </div>
            <span class="badge ${d.kyc==='Verified'?'b-gr':'b-g'}">${d.kyc}</span>
          </div>
          <div style="display:flex;gap:.5rem;flex-wrap:wrap;">
            <button onclick="igToast('${d.name} KYC documents opened','success')" style="background:none;border:1px solid var(--border);padding:.3rem .75rem;font-size:.68rem;cursor:pointer;color:var(--gold);"><i class="fas fa-folder-open" style="margin-right:.3rem;"></i>View KYC</button>
            <button onclick="document.getElementById('kyc-upload-${d.din}').click()" style="background:#2563eb;color:#fff;border:none;padding:.3rem .75rem;font-size:.68rem;font-weight:600;cursor:pointer;"><i class="fas fa-upload" style="margin-right:.3rem;"></i>Upload Document</button>
            <input type="file" id="kyc-upload-${d.din}" style="display:none;" onchange="igToast('KYC document uploaded for ${d.name} — pending verification','success')">
            <button onclick="igToast('DIR-3 KYC form submitted for ${d.name}','success')" style="background:#1E1E1E;color:#fff;border:none;padding:.3rem .75rem;font-size:.68rem;font-weight:600;cursor:pointer;">DIR-3 KYC</button>
          </div>
          <div style="margin-top:.75rem;display:flex;gap:.625rem;flex-wrap:wrap;">
            ${[
              {doc:'PAN Card',    status:'Verified'},
              {doc:'Aadhaar',     status:'Verified'},
              {doc:'Passport',    status:'Verified'},
              {doc:'DIR-12',      status:'Filed'},
              {doc:'DIR-3 KYC',  status:'Due'},
            ].map(f=>`<span style="font-size:.65rem;padding:.2rem .45rem;border:1px solid ${f.status==='Verified'||f.status==='Filed'?'#86efac':'#fde68a'};background:${f.status==='Verified'||f.status==='Filed'?'#f0fdf4':'#fffbeb'};color:${f.status==='Verified'||f.status==='Filed'?'#15803d':'#92400e'};">${f.doc}: ${f.status}</span>`).join('')}
          </div>
        </div>`).join('')}
      </div>
      <!-- KMPs -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Key Managerial Personnel (§ 203)</h3></div>
        ${kmps.map(k=>`
        <div style="padding:1.25rem;border-bottom:1px solid var(--border);">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.625rem;">
            <div>
              <div style="font-weight:600;font-size:.9rem;color:var(--ink);">${k.name}</div>
              <div style="font-size:.75rem;color:var(--ink-muted);">${k.desig}</div>
              <div style="font-size:.72rem;color:var(--ink-muted);margin-top:.15rem;">PAN: <code style="background:#f5f3ff;padding:1px 4px;font-size:.68rem;">${k.pan.substring(0,3)}••••••${k.pan.slice(-1)}</code></div>
            </div>
            <span class="badge ${k.kyc==='Verified'?'b-gr':'b-g'}">${k.kyc}</span>
          </div>
          <div style="display:flex;gap:.5rem;">
            <button onclick="igToast('${k.name} KYC documents opened','success')" style="background:none;border:1px solid var(--border);padding:.3rem .75rem;font-size:.68rem;cursor:pointer;color:var(--gold);"><i class="fas fa-folder-open" style="margin-right:.3rem;"></i>View KYC</button>
            <button onclick="igToast('Appointment letter for ${k.name} downloaded','success')" style="background:none;border:1px solid var(--border);padding:.3rem .75rem;font-size:.68rem;cursor:pointer;color:var(--ink-muted);">Appointment Letter</button>
          </div>
        </div>`).join('')}
        <div style="padding:1rem 1.25rem;">
          <button onclick="igToast('New KMP appointment wizard opened','info')" style="background:var(--gold);color:#fff;border:none;padding:.45rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;"><i class="fas fa-user-plus" style="margin-right:.4rem;"></i>Add KMP</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Tab 3: Statutory Registers -->
  <div id="gov-pane-3" style="display:none;">
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;">
      ${[
        {name:'Register of Directors',     form:'MGT-7 Annex.',icon:'user-tie',    color:'#1E1E1E', entries:2, lastUpdated:'28 Feb 2025'},
        {name:'Register of KMPs',          form:'§203',         icon:'star',       color:'#2563eb', entries:3, lastUpdated:'01 Jan 2025'},
        {name:'Register of Members',       form:'MGT-1',        icon:'users',      color:'#16a34a', entries:2, lastUpdated:'01 Apr 2017'},
        {name:'Register of Charges',       form:'CHG-7',        icon:'link',       color:'#d97706', entries:0, lastUpdated:'—'},
        {name:'Register of Contracts',     form:'MBP-4',        icon:'handshake',  color:'#7c3aed', entries:7, lastUpdated:'28 Feb 2025'},
        {name:'Meeting Minutes Archive',   form:'§118',         icon:'book',       color:'#dc2626', entries:4, lastUpdated:'28 Feb 2025'},
        {name:'Share Transfer Register',   form:'SH-4',         icon:'exchange-alt',color:'#0d9488',entries:0, lastUpdated:'—'},
        {name:'Register of Investments',   form:'MBP-3',        icon:'chart-line', color:'#9f1239', entries:2, lastUpdated:'31 Mar 2024'},
        {name:'Register of Related Parties',form:'AOC-2',       icon:'sitemap',    color:'#475569', entries:3, lastUpdated:'15 Jan 2025'},
      ].map(r=>`
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="height:3px;background:${r.color};"></div>
        <div style="padding:1.25rem;">
          <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.625rem;">
            <div style="width:36px;height:36px;background:${r.color};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <i class="fas fa-${r.icon}" style="color:#fff;font-size:.72rem;"></i>
            </div>
            <div>
              <div style="font-weight:600;font-size:.85rem;color:var(--ink);">${r.name}</div>
              <span class="badge b-dk" style="font-size:.6rem;">${r.form}</span>
            </div>
          </div>
          <div style="font-size:.72rem;color:var(--ink-muted);margin-bottom:.75rem;"><strong>${r.entries}</strong> entries · Updated ${r.lastUpdated}</div>
          <div style="display:flex;gap:.5rem;">
            <button onclick="igToast('${r.name} opened — ${r.entries} entries','success')" style="background:${r.color};color:#fff;border:none;padding:.3rem .75rem;font-size:.68rem;font-weight:600;cursor:pointer;flex:1;"><i class="fas fa-eye" style="margin-right:.3rem;"></i>View</button>
            <button onclick="igToast('${r.name} exported to PDF','success')" style="background:none;border:1px solid var(--border);padding:.3rem .625rem;font-size:.68rem;cursor:pointer;color:var(--ink-muted);" title="Export PDF"><i class="fas fa-download"></i></button>
            <button onclick="igToast('${r.name} — adding new entry','info')" style="background:none;border:1px solid var(--border);padding:.3rem .625rem;font-size:.68rem;cursor:pointer;color:var(--gold);" title="Add Entry"><i class="fas fa-plus"></i></button>
          </div>
        </div>
      </div>`).join('')}
    </div>
  </div>

  <!-- Tab 4: Compliance -->
  <div id="gov-pane-4" style="display:none;">
    <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Compliance Calendar — FY 2025-26</h3>
        <button onclick="igToast('Compliance calendar exported to CSV','success')" style="background:none;border:1px solid var(--border);padding:.3rem .75rem;font-size:.68rem;cursor:pointer;color:var(--gold);"><i class="fas fa-download" style="margin-right:.3rem;"></i>Export</button>
      </div>
      <table class="ig-tbl"><thead><tr><th>Due Date</th><th>Filing / Event</th><th>Form</th><th>Responsible</th><th>Penalty</th><th>Status</th><th>Action</th></tr></thead><tbody>
        ${[
          {date:'11 Mar 2025', event:'GSTR-1 — February 2025',         form:'GSTR-1',  resp:'Finance', pen:'₹200/day',  status:'Due',      cls:'b-g'},
          {date:'15 Mar 2025', event:'Board Meeting — Q1 Review',       form:'§173',    resp:'Board',   pen:'₹5K–25K',  status:'Scheduled',cls:'b-gr'},
          {date:'15 Mar 2025', event:'TDS Deposit — February 2025',     form:'Challan', resp:'Finance', pen:'1.5%/mo',   status:'Due',      cls:'b-g'},
          {date:'20 Mar 2025', event:'GSTR-3B — February 2025',         form:'GSTR-3B', resp:'Finance', pen:'₹50/day',   status:'Upcoming', cls:'b-dk'},
          {date:'31 Mar 2025', event:'Annual Accounts Filing',           form:'AOC-4',   resp:'CS/CFO',  pen:'₹1K/day',  status:'Upcoming', cls:'b-dk'},
          {date:'30 Apr 2025', event:'Annual Return Filing',             form:'MGT-7A',  resp:'CS',      pen:'₹200/day', status:'Upcoming', cls:'b-dk'},
          {date:'31 Mar 2025', event:'Income Tax Advance — Q4',          form:'Challan', resp:'CFO',     pen:'1%/mo',     status:'Upcoming', cls:'b-dk'},
          {date:'15 Apr 2025', event:'PF ECR Upload — March 2025',       form:'ECR',     resp:'HR',      pen:'Min ₹5K',  status:'Upcoming', cls:'b-dk'},
          {date:'30 Sep 2025', event:'Secretarial Audit',                 form:'MR-3',    resp:'CS',      pen:'₹1L+',     status:'Upcoming', cls:'b-dk'},
        ].map(r=>`<tr>
          <td style="font-size:.82rem;font-weight:500;white-space:nowrap;">${r.date}</td>
          <td style="font-size:.85rem;">${r.event}</td>
          <td><span class="badge b-dk">${r.form}</span></td>
          <td style="font-size:.8rem;color:var(--ink-muted);">${r.resp}</td>
          <td style="font-size:.75rem;color:#dc2626;">${r.pen}</td>
          <td><span class="badge ${r.cls}">${r.status}</span></td>
          <td>
            <button onclick="igToast('${r.event} — reminder sent','success')" style="background:none;border:1px solid var(--border);padding:.2rem .5rem;font-size:.65rem;cursor:pointer;color:var(--gold);">Remind</button>
          </td>
        </tr>`).join('')}
      </tbody></table>
    </div>
  </div>

  <script>
  <!-- gov-pane-5: DSC & Digital Signatures -->
  <div id="gov-pane-5" style="display:none;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1.5rem;">
      <!-- DSC Registry -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">DSC (Digital Signature Certificate) Registry</h3>
          <button onclick="igToast('New DSC enrollment form opened','info')" style="background:var(--gold);color:#fff;border:none;padding:.35rem .75rem;font-size:.72rem;font-weight:600;cursor:pointer;">Enroll DSC</button>
        </div>
        <div style="padding:1.25rem;">
          <table class="ig-tbl"><thead><tr><th>Director / KMP</th><th>DSC Class</th><th>Issued By</th><th>Valid Till</th><th>Status</th><th>Action</th></tr></thead><tbody>
            ${[
              {name:'Arun Manikonda',  class:'Class 3',  issuer:'eMudhra',     valid:'31 Dec 2025', s:'Active'},
              {name:'Pavan Manikonda', class:'Class 3',  issuer:'Sify Trust',  valid:'15 Jun 2025', s:'Active'},
              {name:'Amit Jhingan',    class:'Class 3',  issuer:'eMudhra',     valid:'20 Mar 2025', s:'Expiring'},
            ].map(d=>`<tr>
              <td style="font-size:.82rem;font-weight:500;">${d.name}</td>
              <td style="font-size:.72rem;">${d.class}</td>
              <td style="font-size:.72rem;color:var(--ink-muted);">${d.issuer}</td>
              <td style="font-size:.72rem;color:${d.s==='Expiring'?'#dc2626':'var(--ink-muted)'};">${d.valid}</td>
              <td><span class="badge ${d.s==='Active'?'b-gr':'b-re'}" style="font-size:.6rem;">${d.s}</span></td>
              <td><button onclick="igToast('DSC renewal initiated for ${d.name}','success')" style="background:none;border:1px solid var(--border);padding:.2rem .5rem;font-size:.65rem;cursor:pointer;color:var(--gold);">Renew</button></td>
            </tr>`).join('')}
          </tbody></table>
          <div class="ig-warn" style="margin-top:1rem;"><i class="fas fa-exclamation-triangle"></i><div>Amit Jhingan's DSC expires in 15 days. Renew to avoid signing delays.</div></div>
        </div>
      </div>
      <!-- Pending Digital Signatures -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Pending Digital Signatures</h3></div>
        <div style="padding:.875rem;">
          ${[
            {doc:'Board Resolution — Q4 Financials',   signers:['Arun Manikonda','Pavan Manikonda'],   due:'10 Mar 2025', signed:0},
            {doc:'Advisory Agreement — EVL (MND-003)',  signers:['Arun Manikonda'],                     due:'12 Mar 2025', signed:1},
            {doc:'Annual Return MGT-7 (FY 2024-25)',   signers:['Arun Manikonda','Pavan Manikonda'],   due:'30 Sep 2025', signed:0},
            {doc:'Financial Statements (AOC-4)',        signers:['Arun Manikonda','Pavan Manikonda'],   due:'30 Oct 2025', signed:0},
          ].map(d=>`<div style="border:1px solid var(--border);padding:.875rem;margin-bottom:.5rem;background:var(--parch-dk);">
            <div style="font-size:.82rem;font-weight:600;color:var(--ink);margin-bottom:.3rem;">${d.doc}</div>
            <div style="font-size:.68rem;color:var(--ink-muted);margin-bottom:.3rem;">Signers: ${d.signers.join(', ')} · Due: ${d.due}</div>
            <div style="display:flex;align-items:center;justify-content:space-between;">
              <div style="font-size:.68rem;color:${d.signed===d.signers.length?'#16a34a':'#d97706'};">${d.signed}/${d.signers.length} signed</div>
              <div style="display:flex;gap:.4rem;">
                <button onclick="igToast('Signing reminder sent for ${d.doc}','success')" style="background:none;border:1px solid var(--border);padding:.2rem .5rem;font-size:.65rem;cursor:pointer;color:var(--ink-muted);"><i class="fas fa-bell"></i></button>
                <button onclick="igToast('Document sent to DocuSign for ${d.doc}','success')" style="background:var(--gold);color:#fff;border:none;padding:.2rem .5rem;font-size:.65rem;cursor:pointer;">Sign Now</button>
              </div>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>
    <!-- Digital Director Attendance -->
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Director Digital Attendance — Board Meetings FY 2024-25</h3>
      </div>
      <div style="padding:1.25rem;overflow-x:auto;">
        <table class="ig-tbl"><thead><tr><th>Director / KMP</th><th>BM-01 (15 Jan)</th><th>BM-02 (15 Feb)</th><th>BM-03 (05 Mar)</th><th>Attendance %</th><th>Min. Required</th><th>Status</th></tr></thead><tbody>
          ${[
            {name:'Arun Manikonda',  din:'00000001', meetings:[true,true,true]},
            {name:'Pavan Manikonda', din:'00000002', meetings:[true,true,false]},
            {name:'Amit Jhingan',    din:'—',        meetings:[true,false,true]},
          ].map(d=>{
            const attended = d.meetings.filter(Boolean).length;
            const pct = Math.round(attended/3*100);
            return `<tr>
              <td style="font-size:.82rem;font-weight:500;">${d.name} <span style="font-size:.65rem;color:var(--ink-muted);">DIN: ${d.din}</span></td>
              ${d.meetings.map(m=>`<td><span class="badge ${m?'b-gr':'b-re'}" style="font-size:.6rem;">${m?'Present':'Absent'}</span></td>`).join('')}
              <td style="font-size:.82rem;font-weight:700;color:${pct>=75?'#16a34a':'#dc2626'};">${pct}%</td>
              <td style="font-size:.75rem;color:var(--ink-muted);">75%</td>
              <td><span class="badge ${pct>=75?'b-gr':'b-re'}" style="font-size:.6rem;">${pct>=75?'Compliant':'Non-Compliant'}</span></td>
            </tr>`;
          }).join('')}
        </tbody></table>
        <div style="margin-top:1rem;display:flex;gap:.75rem;">
          <button onclick="igToast('Attendance register exported — SS-1 compliant format','success')" style="background:var(--gold);color:#fff;border:none;padding:.5rem 1.1rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-download" style="margin-right:.4rem;"></i>Export SS-1 Format</button>
          <button onclick="igToast('Digital attendance confirmation sent to all directors','success')" style="background:none;border:1px solid var(--border);padding:.5rem 1rem;font-size:.78rem;cursor:pointer;color:var(--ink);"><i class="fas fa-signature" style="margin-right:.4rem;"></i>Request Confirmations</button>
        </div>
      </div>
    </div>
  </div>

  <!-- gov-pane-6: SS-1/SS-2 Notices -->
  <div id="gov-pane-6" style="display:none;">
    <div class="ig-info" style="margin-bottom:1.25rem;"><i class="fas fa-info-circle"></i><div><strong>Secretarial Standards:</strong> SS-1 governs Board Meetings; SS-2 governs General Meetings. Issued by ICSI, mandatory under Companies Act 2013 Section 118(10).</div></div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1.5rem;">
      <!-- SS-1 Board Meeting Notices -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">SS-1 — Board Meeting Notices</h3>
          <button onclick="togglePanel('new-ss1-panel')" style="background:var(--gold);color:#fff;border:none;padding:.35rem .75rem;font-size:.72rem;font-weight:600;cursor:pointer;"><i class="fas fa-plus" style="margin-right:.3rem;"></i>Draft Notice</button>
        </div>
        <div id="new-ss1-panel" class="ig-panel" style="margin:1.25rem;display:none;">
          <h4 style="font-size:.8rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin-bottom:.75rem;">Draft SS-1 Board Meeting Notice</h4>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;">
            <div><label class="ig-label">Meeting Date</label><input type="date" class="ig-input" style="font-size:.82rem;"></div>
            <div><label class="ig-label">Time</label><input type="time" class="ig-input" value="10:00" style="font-size:.82rem;"></div>
            <div style="grid-column:span 2;"><label class="ig-label">Venue</label><input type="text" class="ig-input" placeholder="Registered Office / Video Conference" style="font-size:.82rem;"></div>
            <div style="grid-column:span 2;"><label class="ig-label">Agenda Items</label><textarea class="ig-input" rows="3" placeholder="1. Adoption of financial statements&#10;2. Declaration of dividend&#10;3. Any other business" style="font-size:.82rem;"></textarea></div>
          </div>
          <div class="ig-info" style="margin-top:.75rem;"><i class="fas fa-clock"></i><div>SS-1 requires notice at least <strong>7 days</strong> before the meeting date (shorter notice with consent of all directors).</div></div>
          <button onclick="igToast('SS-1 notice drafted — sent to Company Secretary for review','success')" style="background:var(--gold);color:#fff;border:none;padding:.45rem 1rem;font-size:.75rem;font-weight:600;cursor:pointer;margin-top:.75rem;">Draft & Send for Review</button>
        </div>
        <div style="padding:1.25rem;">
          ${[
            {ref:'BM-NTC-003', date:'05 Mar 2025', issued:'26 Feb 2025', notice_days:7, signatories:'All Directors', s:'Issued', compliant:true},
            {ref:'BM-NTC-002', date:'15 Feb 2025', issued:'07 Feb 2025', notice_days:8, signatories:'All Directors', s:'Archived', compliant:true},
            {ref:'BM-NTC-001', date:'15 Jan 2025', issued:'08 Jan 2025', notice_days:7, signatories:'All Directors', s:'Archived', compliant:true},
          ].map(n=>`<div style="border:1px solid ${n.compliant?'#86efac':'#fca5a5'};padding:.875rem;margin-bottom:.625rem;background:${n.compliant?'#f0fdf4':'#fff5f5'};">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.3rem;">
              <div style="font-size:.78rem;font-weight:600;color:var(--gold);">${n.ref}</div>
              <span class="badge ${n.s==='Issued'?'b-gr':'b-dk'}" style="font-size:.6rem;">${n.s}</span>
            </div>
            <div style="font-size:.72rem;color:var(--ink-muted);">Meeting: ${n.date} · Issued: ${n.issued} (${n.notice_days} days notice)</div>
            <div style="font-size:.72rem;color:var(--ink-muted);">Sent to: ${n.signatories}</div>
            <div style="display:flex;align-items:center;gap:.5rem;margin-top:.3rem;">
              <span class="badge ${n.compliant?'b-gr':'b-re'}" style="font-size:.58rem;">SS-1 ${n.compliant?'Compliant':'Non-Compliant'}</span>
              <button onclick="igToast('Downloading ${n.ref} PDF','success')" style="background:none;border:1px solid var(--border);padding:.15rem .4rem;font-size:.6rem;cursor:pointer;color:var(--gold);"><i class="fas fa-download"></i></button>
            </div>
          </div>`).join('')}
        </div>
      </div>
      <!-- SS-2 AGM/EGM Notices -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">SS-2 — General Meeting Notices</h3>
          <button onclick="igToast('SS-2 AGM notice template opened','info')" style="background:var(--gold);color:#fff;border:none;padding:.35rem .75rem;font-size:.72rem;font-weight:600;cursor:pointer;"><i class="fas fa-plus" style="margin-right:.3rem;"></i>Draft Notice</button>
        </div>
        <div style="padding:1.25rem;">
          <div class="ig-warn" style="margin-bottom:1rem;"><i class="fas fa-calendar-times"></i><div>Annual General Meeting for FY 2024-25 due by <strong>30 September 2025</strong>. Plan for August 2025.</div></div>
          ${[
            {ref:'AGM-2024', date:'25 Sep 2024', type:'AGM', notice_days:21, quorum:'Quorum met (2 members present)', s:'Completed', compliant:true},
            {ref:'EGM-2024-01', date:'15 Nov 2024', type:'EGM', notice_days:14, quorum:'Quorum met (2 members present)', s:'Completed', compliant:true},
            {ref:'AGM-2025', date:'TBD (Sep 2025)', type:'AGM', notice_days:21, quorum:'—', s:'Upcoming', compliant:null},
          ].map(n=>`<div style="border:1px solid ${n.compliant===null?'#fcd34d':n.compliant?'#86efac':'#fca5a5'};padding:.875rem;margin-bottom:.625rem;background:${n.compliant===null?'#fffbeb':n.compliant?'#f0fdf4':'#fff5f5'};">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.3rem;">
              <div><span class="badge b-dk" style="font-size:.6rem;margin-right:.4rem;">${n.type}</span><span style="font-size:.78rem;font-weight:600;color:var(--gold);">${n.ref}</span></div>
              <span class="badge ${n.s==='Completed'?'b-gr':n.s==='Upcoming'?'b-g':'b-re'}" style="font-size:.6rem;">${n.s}</span>
            </div>
            <div style="font-size:.72rem;color:var(--ink-muted);">Date: ${n.date} · Notice: ${n.notice_days} days required</div>
            <div style="font-size:.72rem;color:var(--ink-muted);">${n.quorum}</div>
            ${n.compliant!==null?`<span class="badge ${n.compliant?'b-gr':'b-re'}" style="font-size:.58rem;margin-top:.3rem;display:inline-block;">SS-2 ${n.compliant?'Compliant':'Non-Compliant'}</span>`:''}
          </div>`).join('')}
        </div>
      </div>
    </div>
    <!-- Companies Act 2013 Checklist -->
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Companies Act 2013 — Key Compliance Checklist</h3></div>
      <div style="padding:1.25rem;">
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.75rem;">
          ${[
            {req:'Minimum 4 Board Meetings per year',           s:'Done',    note:'3 held, 1 planned Q4'},
            {req:'Gap between meetings ≤120 days',              s:'Compliant',note:'All gaps within 120 days'},
            {req:'Quorum: ⅓ or 2 directors (higher of two)',   s:'Compliant',note:'Both meetings had quorum'},
            {req:'AGM within 6 months of FY end',              s:'Due',     note:'Due by 30 Sep 2025'},
            {req:'Board minutes within 30 days of meeting',     s:'Compliant',note:'Minutes filed on time'},
            {req:'Director disclosure of interest (Form MBP-1)',s:'Done',    note:'All directors submitted'},
            {req:'Annual Return MGT-7 (within 60 days AGM)',    s:'Pending', note:'Post AGM — Sep 2025'},
            {req:'Financial Statements AOC-4 (within 30 days)', s:'Pending', note:'Post AGM — Oct 2025'},
            {req:'Statutory Audit completed',                   s:'In Progress',note:'Auditors appointed'},
          ].map(r=>`<div style="padding:.75rem;border:1px solid ${r.s==='Compliant'||r.s==='Done'?'#86efac':r.s==='Pending'?'#fca5a5':r.s==='Due'?'#fcd34d':'var(--border)'};background:${r.s==='Compliant'||r.s==='Done'?'#f0fdf4':r.s==='Pending'?'#fff5f5':r.s==='Due'?'#fffbeb':'#fff'};">
            <div style="font-size:.75rem;color:var(--ink);margin-bottom:.25rem;">${r.req}</div>
            <div style="font-size:.65rem;color:var(--ink-muted);margin-bottom:.3rem;">${r.note}</div>
            <span class="badge ${r.s==='Compliant'||r.s==='Done'?'b-gr':r.s==='Pending'?'b-re':r.s==='Due'?'b-g':'b-dk'}" style="font-size:.58rem;">${r.s}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>

  <!-- gov-pane-7: Dynamic Board Meeting Agenda Builder -->
  <div id="gov-pane-7" style="display:none;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;">
      <!-- Left: Builder -->
      <div>
        <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.25rem;">
          <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">New Board Meeting</h3></div>
          <div style="padding:1.25rem;display:flex;flex-direction:column;gap:.875rem;">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;">
              <div><label class="ig-label">Meeting Type</label><select id="mtg-type" class="ig-input" style="font-size:.82rem;"><option>Board Meeting</option><option>Audit Committee</option><option>Nomination &amp; Remuneration</option><option>Extraordinary General Meeting</option><option>Annual General Meeting</option></select></div>
              <div><label class="ig-label">Meeting Number</label><input type="text" id="mtg-no" class="ig-input" value="BM-2025-04" style="font-size:.82rem;"></div>
              <div><label class="ig-label">Date</label><input type="date" id="mtg-date" class="ig-input" value="2025-03-15" style="font-size:.82rem;"></div>
              <div><label class="ig-label">Time</label><input type="time" id="mtg-time" class="ig-input" value="11:00" style="font-size:.82rem;"></div>
              <div style="grid-column:span 2;"><label class="ig-label">Venue / Mode</label><input type="text" id="mtg-venue" class="ig-input" value="Boardroom, 4th Floor, India Gully HQ, New Delhi &amp; Video Conference" style="font-size:.82rem;"></div>
              <div style="grid-column:span 2;"><label class="ig-label">Quorum Required</label><input type="text" id="mtg-quorum" class="ig-input" value="One-third of total directors or 2, whichever is higher (§174)" style="font-size:.82rem;"></div>
            </div>
            <!-- Agenda Items -->
            <div>
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.6rem;">
                <label class="ig-label" style="margin:0;">Agenda Items</label>
                <div style="display:flex;gap:.4rem;">
                  <button onclick="igAddAgendaItem2('routine')" style="background:none;border:1px solid var(--border);padding:.25rem .6rem;font-size:.68rem;cursor:pointer;color:var(--ink);"><i class="fas fa-plus" style="margin-right:.25rem;"></i>Routine</button>
                  <button onclick="igAddAgendaItem2('resolution')" style="background:none;border:1px solid var(--border);padding:.25rem .6rem;font-size:.68rem;cursor:pointer;color:var(--gold);"><i class="fas fa-vote-yea" style="margin-right:.25rem;"></i>Resolution</button>
                  <button onclick="igAddAgendaItem2('special')" style="background:none;border:1px solid var(--border);padding:.25rem .6rem;font-size:.68rem;cursor:pointer;color:#7c3aed;"><i class="fas fa-star" style="margin-right:.25rem;"></i>Special</button>
                </div>
              </div>
              <div id="agenda-builder-list" style="display:flex;flex-direction:column;gap:.5rem;min-height:60px;"></div>
            </div>
            <div style="display:flex;gap:.5rem;flex-wrap:wrap;">
              <button onclick="igBuildNotice()" style="background:var(--ink);color:#fff;border:none;padding:.5rem 1.1rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-file-alt" style="margin-right:.4rem;"></i>Generate Notice</button>
              <button onclick="igToast('Agenda saved as draft','info')" style="background:none;border:1px solid var(--border);padding:.5rem 1.1rem;font-size:.78rem;cursor:pointer;color:var(--ink);">Save Draft</button>
              <button onclick="igToast('Agenda sent to all directors via email','success')" style="background:var(--gold);color:#fff;border:none;padding:.5rem 1.1rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-paper-plane" style="margin-right:.3rem;"></i>Send Notice</button>
            </div>
          </div>
        </div>
      </div>
      <!-- Right: Preview + Resolutions -->
      <div>
        <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.25rem;">
          <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
            <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Notice Preview</h3>
            <button onclick="igToast('Notice PDF downloaded','success')" style="background:none;border:1px solid var(--border);padding:.3rem .75rem;font-size:.68rem;cursor:pointer;color:var(--gold);"><i class="fas fa-download" style="margin-right:.3rem;"></i>PDF</button>
          </div>
          <div id="notice-preview" style="padding:1.25rem;font-size:.78rem;line-height:1.8;color:var(--ink);min-height:120px;background:#fffdf5;">
            <p style="text-align:center;font-weight:700;font-size:.88rem;margin-bottom:.75rem;">VIVACIOUS ENTERTAINMENT AND HOSPITALITY PVT. LTD.</p>
            <p style="text-align:center;font-size:.72rem;color:var(--ink-muted);margin-bottom:1rem;">CIN: U74900DL2017PTC000000 | Regd. Office: New Delhi</p>
            <p style="font-size:.78rem;"><strong>Notice</strong> is hereby given that the <strong id="np-mtgno">4th Board Meeting</strong> of the Board of Directors will be held on <strong id="np-date">15 March 2025</strong> at <strong id="np-time">11:00 AM</strong> at <span id="np-venue">Boardroom, India Gully HQ</span> to transact the following business:</p>
            <div id="np-agenda-list" style="margin-top:.875rem;"></div>
            <p style="margin-top:.875rem;font-size:.72rem;color:var(--ink-muted);">By Order of the Board<br><br>Company Secretary<br>Date: <span id="np-today">01 Mar 2025</span></p>
          </div>
        </div>
        <!-- Resolution Drafts -->
        <div style="background:#fff;border:1px solid var(--border);">
          <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
            <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Resolution Drafts</h3>
            <button onclick="igToast('All resolutions exported to Word','success')" style="background:none;border:1px solid var(--border);padding:.3rem .75rem;font-size:.68rem;cursor:pointer;color:var(--ink);"><i class="fas fa-file-word" style="margin-right:.3rem;"></i>Export</button>
          </div>
          <div id="resolution-drafts" style="padding:1rem;display:flex;flex-direction:column;gap:.75rem;">
            <div style="background:#f8f9fa;border:1px solid var(--border);padding:.875rem;">
              <div style="font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#7c3aed;margin-bottom:.3rem;">Ordinary Resolution #1</div>
              <p style="font-size:.78rem;color:var(--ink);margin-bottom:.4rem;">"RESOLVED THAT the audited financial statements of the Company for the FY 2024-25 be and are hereby adopted."</p>
              <div style="display:flex;gap:.4rem;">
                <span style="font-size:.62rem;background:#ede9fe;color:#5b21b6;padding:2px 6px;">Ordinary Resolution</span>
                <span style="font-size:.62rem;background:#dcfce7;color:#166534;padding:2px 6px;">Draft Ready</span>
              </div>
            </div>
            <div style="background:#f8f9fa;border:1px solid var(--border);padding:.875rem;">
              <div style="font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:#dc2626;margin-bottom:.3rem;">Special Resolution #1</div>
              <p style="font-size:.78rem;color:var(--ink);margin-bottom:.4rem;">"RESOLVED THAT pursuant to Section 186 of the Companies Act, 2013, approval be granted for investment not exceeding ₹5 Crore in securities of associate companies."</p>
              <div style="display:flex;gap:.4rem;">
                <span style="font-size:.62rem;background:#fee2e2;color:#991b1b;padding:2px 6px;">Special Resolution</span>
                <span style="font-size:.62rem;background:#fef3c7;color:#92400e;padding:2px 6px;">Awaiting Input</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <script>
  window.igGovTab = function(idx){
    for(var i=0;i<8;i++){
      var p=document.getElementById('gov-pane-'+i);
      var t=document.getElementById('gov-tab-'+i);
      if(p) p.style.display=i===idx?'block':'none';
      if(t){ t.style.color=i===idx?'var(--gold)':'var(--ink-muted)'; t.style.borderBottom=i===idx?'2px solid var(--gold)':'2px solid transparent'; }
    }
  };
  var voteState = ${JSON.stringify(resolutions.map(r=>({...r.votes})))};
  window.igCastVote = function(idx,type){
    if(voteState[idx].yes+voteState[idx].no+voteState[idx].abstain>=voteState[idx].total){ igToast('All votes already cast for this resolution','warn'); return; }
    voteState[idx][type]++;
    document.getElementById('vote-yes-'+idx).textContent = voteState[idx].yes;
    document.getElementById('vote-no-'+idx).textContent  = voteState[idx].no;
    document.getElementById('vote-abs-'+idx).textContent = voteState[idx].abstain;
    igToast('Vote cast: '+type.toUpperCase()+' — RES-00'+(idx+1),'success');
    if(voteState[idx].yes+voteState[idx].no+voteState[idx].abstain===voteState[idx].total){
      igToast('All votes tallied. Resolution RES-00'+(idx+1)+' — '+(voteState[idx].yes>voteState[idx].no?'PASSED':'FAILED/DEFERRED'),'success');
    }
  };
  /* ── Agenda Builder (gov-pane-7) ── */
  var agItemCnt2 = 0;
  var agendaItems = [
    {type:'routine',text:'Confirmation of Notice & Quorum'},
    {type:'routine',text:'Adoption of Financial Statements FY 2024-25'},
    {type:'resolution',text:'Investment approval under Section 186 — up to ₹5 Crore'},
  ];
  function igRenderAgendaBuilder(){
    var list=document.getElementById('agenda-builder-list'); if(!list) return;
    list.innerHTML=agendaItems.map(function(item,i){
      var bg=item.type==='resolution'?'#ede9fe':item.type==='special'?'#fff0f0':'#f0f9ff';
      var badge=item.type==='resolution'?'<span style="font-size:.6rem;background:#7c3aed;color:#fff;padding:1px 5px;">Resolution</span>':item.type==='special'?'<span style="font-size:.6rem;background:#dc2626;color:#fff;padding:1px 5px;">Special</span>':'<span style="font-size:.6rem;background:#1A3A6B;color:#fff;padding:1px 5px;">Routine</span>';
      return '<div style="display:flex;align-items:center;gap:.5rem;background:'+bg+';padding:.5rem .75rem;border:1px solid rgba(0,0,0,.07);"><span style="font-size:.75rem;font-weight:700;color:var(--gold);width:18px;flex-shrink:0;">'+(i+1)+'.</span>'+badge+'<input type="text" value="'+item.text+'" onchange="agendaItems['+i+'].text=this.value;igUpdateNoticePreview()" class="ig-input" style="flex:1;font-size:.78rem;border:none;background:transparent;padding:.1rem;"><button onclick="agendaItems.splice('+i+',1);igRenderAgendaBuilder();igUpdateNoticePreview();igToast(\'Item removed\',\'warn\')" style="background:none;border:none;cursor:pointer;color:#dc2626;font-size:.72rem;flex-shrink:0;"><i class="fas fa-times"></i></button></div>';
    }).join('');
    igUpdateNoticePreview();
  }
  window.igAddAgendaItem2 = function(type){
    agendaItems.push({type:type,text:type==='resolution'?'New resolution item…':type==='special'?'Special business item…':'Routine agenda item…'});
    igRenderAgendaBuilder();
  };
  function igUpdateNoticePreview(){
    var npList=document.getElementById('np-agenda-list'); if(!npList) return;
    var mtgNo=document.getElementById('mtg-no'); var mtgDate=document.getElementById('mtg-date');
    var mtgTime=document.getElementById('mtg-time'); var mtgVenue=document.getElementById('mtg-venue');
    var npMtg=document.getElementById('np-mtgno'); var npDate=document.getElementById('np-date');
    var npTime=document.getElementById('np-time'); var npVenue=document.getElementById('np-venue');
    var npToday=document.getElementById('np-today');
    if(npMtg && mtgNo) npMtg.textContent=mtgNo.value;
    if(npDate && mtgDate) npDate.textContent=new Date(mtgDate.value).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'});
    if(npTime && mtgTime) npTime.textContent=mtgTime.value+' IST';
    if(npVenue && mtgVenue) npVenue.textContent=mtgVenue.value;
    if(npToday) npToday.textContent=new Date().toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'});
    npList.innerHTML=agendaItems.map(function(item,i){
      return '<p style="font-size:.78rem;margin:.4rem 0;"><strong>'+(i+1)+'.</strong> '+item.text+(item.type==='resolution'?' <em style="color:#7c3aed;font-size:.72rem;">(Resolution)</em>':item.type==='special'?' <em style="color:#dc2626;font-size:.72rem;">(Special Business)</em>':'')+'</p>';
    }).join('');
  }
  window.igBuildNotice = function(){igUpdateNoticePreview(); igToast('Notice generated and preview updated','success');};
  // Wire up live preview on input change
  ['mtg-no','mtg-date','mtg-time','mtg-venue'].forEach(function(id){
    var el=document.getElementById(id); if(el) el.addEventListener('input',igUpdateNoticePreview);
  });
  igRenderAgendaBuilder();

  var agItemCnt = 3;
  window.igAddAgendaItem = function(){
    agItemCnt++;
    var div=document.createElement('div');
    div.style='display:flex;align-items:center;gap:.5rem;margin-bottom:.4rem;background:var(--parch-dk);border:1px solid var(--border);padding:.5rem .75rem;';
    div.id='agenda-item-'+agItemCnt;
    div.innerHTML='<span style="font-size:.75rem;font-weight:700;color:var(--gold);width:18px;flex-shrink:0;">'+agItemCnt+'.</span><input type="text" value="" class="ig-input" placeholder="New agenda item..." style="flex:1;font-size:.78rem;border:none;background:transparent;padding:.1rem;"><button onclick="this.parentElement.remove();igToast(\'Item removed\',\'warn\')" style="background:none;border:none;cursor:pointer;color:#dc2626;font-size:.72rem;flex-shrink:0;"><i class="fas fa-times"></i></button>';
    document.getElementById('agenda-items').appendChild(div);
    div.querySelector('input').focus();
  };

  /* ── Governance: load live resolutions + registers from API ── */
  igApi.get('/governance/resolutions').then(function(d){
    if(!d) return;
    var el=document.getElementById('res-count'); if(el) el.textContent=d.total;
    var pendEl=document.getElementById('res-pending'); if(pendEl) pendEl.textContent=d.pending+' pending';
    var tbody=document.getElementById('res-tbody');
    if(!tbody||!d.resolutions) return;
    tbody.innerHTML='';
    d.resolutions.slice(0,5).forEach(function(r){
      var statusCol=r.status==='Passed'?'#16a34a':'#d97706';
      tbody.innerHTML+='<tr>'
        +'<td style="font-size:.72rem;font-weight:600;">'+r.id+'</td>'
        +'<td style="font-size:.78rem;">'+r.title+'</td>'
        +'<td style="font-size:.72rem;">'+r.type+'</td>'
        +'<td style="font-size:.72rem;">'+r.date+'</td>'
        +'<td><span style="font-size:.62rem;font-weight:700;color:'+statusCol+';border:1px solid '+statusCol+'20;padding:.1rem .4rem;">'+r.status+'</span></td>'
        +'<td><button onclick="igToast(\''+r.id+' PDF downloaded\',\'success\')" style="background:none;border:1px solid var(--border);padding:.2rem .4rem;font-size:.62rem;cursor:pointer;color:var(--gold);"><i class="fas fa-download"></i></button></td>'
        +'</tr>';
    });
  });
  igApi.get('/governance/minute-book').then(function(d){
    if(!d) return;
    var el=document.getElementById('minutes-count'); if(el) el.textContent=d.total_minutes+' minutes recorded';
  });
  </script>`
  return c.html(layout('Governance', adminShell('Governance & Compliance', 'governance', body), {noNav:true,noFooter:true}))
})

// ── HORECA (Phase 6 — inventory ledger, quote-to-order, vendor mgmt, procurement) ─
app.get('/horeca', (c) => {
  const cats = [
    {cat:'Kitchen Equipment', skus:24, icon:'utensils',       color:'#0d9488'},
    {cat:'Crockery & Cutlery',skus:56, icon:'concierge-bell', color:'#2563eb'},
    {cat:'Linen & Fabrics',   skus:18, icon:'bed',            color:'#7c3aed'},
    {cat:'Front Office',      skus:12, icon:'bell',           color:'#d97706'},
    {cat:'Housekeeping',      skus:31, icon:'broom',          color:'#16a34a'},
    {cat:'Food & Beverage',   skus:45, icon:'wine-glass-alt', color:'#dc2626'},
    {cat:'Maintenance',       skus:19, icon:'tools',          color:'#475569'},
    {cat:'Technology',        skus:8,  icon:'desktop',        color:'#9f1239'},
  ]
  const vendors = [
    {name:'Premier Kitchen Supplies',  cat:'Kitchen',      gstin:'07AABCS1234F1Z5',status:'Active',   tier:'Gold',   rating:4.8, lead:'5 days'},
    {name:'Hotelware India Ltd.',       cat:'Crockery',    gstin:'27AABCH5678G1Z3',status:'Active',   tier:'Silver', rating:4.5, lead:'7 days'},
    {name:'Royal Linen & Textiles',     cat:'Linen',       gstin:'09AAACR9012H1Z1',status:'Active',   tier:'Gold',   rating:4.9, lead:'3 days'},
    {name:'FrontDesk Solutions',        cat:'Front Office',gstin:'07AABCF3456I1Z8',status:'Active',   tier:'Bronze', rating:4.2, lead:'10 days'},
    {name:'CleanPro Housekeeping',      cat:'Housekeeping',gstin:'29AABCC7890J1Z6',status:'Active',   tier:'Silver', rating:4.6, lead:'4 days'},
    {name:'Bar & Beverage Co.',         cat:'F&B',         gstin:'27AABCB2345K1Z4',status:'Pending',  tier:'—',      rating:0,   lead:'—'},
    {name:'Hotel Tech Systems',         cat:'Technology',  gstin:'07AABCH6789L1Z2',status:'Active',   tier:'Gold',   rating:4.7, lead:'14 days'},
  ]
  const body = `
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:1rem;margin-bottom:1.5rem;">
    ${[
      {label:'SKU Categories',  value:'8',   c:'#0d9488'},
      {label:'Active Vendors',  value:'6',   c:'#2563eb'},
      {label:'Open Quotes',     value:'3',   c:'#d97706'},
      {label:'Active Orders',   value:'2',   c:'#16a34a'},
      {label:'Low Stock Alerts',value:'5',   c:'#dc2626'},
    ].map(s=>`<div class="am"><div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.5rem;">${s.label}</div><div style="font-family:'DM Serif Display',Georgia,serif;font-size:2rem;color:${s.c};">${s.value}</div></div>`).join('')}
  </div>

  <!-- Tab Nav -->
  <div style="display:flex;gap:0;margin-bottom:1.5rem;border-bottom:2px solid var(--border);">
    ${['Catalogue','Inventory Ledger','Vendors','Quote Builder','Purchase Orders','Customer Portal','GRN & Logistics'].map((t,i)=>`<button onclick="igHorecaTab(${i})" id="hrc-tab-${i}" style="padding:.6rem 1.1rem;font-size:.78rem;font-weight:600;cursor:pointer;border:none;background:none;color:${i===0?'var(--gold)':'var(--ink-muted)'};border-bottom:${i===0?'2px solid var(--gold)':'2px solid transparent'};letter-spacing:.04em;text-transform:uppercase;margin-bottom:-2px;white-space:nowrap;">${t}</button>`).join('')}
  </div>

  <!-- Tab 0: Catalogue -->
  <div id="hrc-pane-0">
    <div style="margin-bottom:1rem;">
      <button onclick="togglePanel('add-sku-panel')" style="background:#0d9488;color:#fff;border:none;padding:.5rem 1.1rem;font-size:.78rem;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:.4rem;letter-spacing:.07em;text-transform:uppercase;"><i class="fas fa-plus"></i>Add New SKU</button>
    </div>
    <div id="add-sku-panel" class="ig-panel" style="margin-bottom:1.5rem;">
      <h4 style="font-size:.82rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:1rem;">New SKU / Product</h4>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;">
        <div><label class="ig-label">SKU Code</label><input type="text" class="ig-input" placeholder="HORECA-001" style="font-size:.82rem;"></div>
        <div><label class="ig-label">Product Name</label><input type="text" class="ig-input" placeholder="Product name" style="font-size:.82rem;"></div>
        <div><label class="ig-label">Category</label><select class="ig-input" style="font-size:.82rem;">${cats.map(c=>`<option>${c.cat}</option>`).join('')}</select></div>
        <div><label class="ig-label">Unit</label><select class="ig-input" style="font-size:.82rem;"><option>Piece</option><option>Set</option><option>Dozen</option><option>Kg</option><option>Litre</option></select></div>
        <div><label class="ig-label">Standard Price ₹</label><input type="number" class="ig-input" placeholder="0.00" style="font-size:.82rem;"></div>
        <div><label class="ig-label">Reorder Level</label><input type="number" class="ig-input" placeholder="Minimum stock" style="font-size:.82rem;"></div>
        <div><label class="ig-label">Preferred Vendor</label><select class="ig-input" style="font-size:.82rem;">${vendors.map(v=>`<option>${v.name}</option>`).join('')}</select></div>
        <div><label class="ig-label">HSN Code</label><input type="text" class="ig-input" placeholder="HSN / SAC" style="font-size:.82rem;"></div>
        <div><label class="ig-label">GST Rate</label><select class="ig-input" style="font-size:.82rem;"><option>5%</option><option>12%</option><option>18%</option><option>28%</option></select></div>
      </div>
      <div style="display:flex;gap:.75rem;margin-top:1rem;">
        <button onclick="igToast('SKU added to catalogue','success');togglePanel('add-sku-panel')" style="background:#0d9488;color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;">Add to Catalogue</button>
        <button onclick="togglePanel('add-sku-panel')" style="background:none;border:1px solid var(--border);padding:.55rem 1.25rem;font-size:.78rem;cursor:pointer;color:var(--ink-muted);">Cancel</button>
      </div>
    </div>
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">SKU Catalogue by Category</h3></div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);">
        ${cats.map(cat=>`
        <div style="padding:1.25rem;border-right:1px solid var(--border);border-bottom:1px solid var(--border);cursor:pointer;" onclick="igToast('Opening ${cat.cat} catalogue — ${cat.skus} SKUs','success')">
          <i class="fas fa-${cat.icon}" style="color:${cat.color};font-size:1.1rem;margin-bottom:.5rem;display:block;"></i>
          <div style="font-size:.875rem;font-weight:500;color:var(--ink);">${cat.cat}</div>
          <div style="font-size:.72rem;color:var(--ink-muted);margin-top:.15rem;">${cat.skus} SKUs</div>
          <div style="margin-top:.5rem;font-size:.68rem;color:${cat.color};font-weight:600;">View All →</div>
        </div>`).join('')}
      </div>
    </div>
  </div>

  <!-- Tab 1: Inventory Ledger -->
  <div id="hrc-pane-1" style="display:none;">
    <div style="display:flex;gap:.75rem;margin-bottom:1rem;">
      <select class="ig-input" style="font-size:.82rem;max-width:180px;"><option>All Categories</option>${cats.map(c=>`<option>${c.cat}</option>`).join('')}</select>
      <button onclick="igToast('Inventory report exported to Excel','success')" style="background:none;border:1px solid var(--border);padding:.4rem .875rem;font-size:.75rem;cursor:pointer;color:var(--gold);"><i class="fas fa-file-excel" style="margin-right:.3rem;"></i>Export</button>
      <button onclick="igToast('Inventory updated from vendor feeds','success')" style="background:none;border:1px solid var(--border);padding:.4rem .875rem;font-size:.75rem;cursor:pointer;color:var(--ink);"><i class="fas fa-sync" style="margin-right:.3rem;font-size:.7rem;"></i>Sync Stock</button>
    </div>
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Inventory Ledger — All Items</h3></div>
      <table class="ig-tbl">
        <thead><tr><th>SKU</th><th>Product</th><th>Category</th><th>Unit</th><th>In Stock</th><th>Reorder Level</th><th>Unit Price</th><th>Stock Value</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          ${[
            {sku:'KE-001',name:'6-Burner Commercial Range',  cat:'Kitchen',    unit:'Piece',  qty:4,  reorder:2,  price:85000},
            {sku:'CC-012',name:'Bone China Dinner Set (24)',  cat:'Crockery',   unit:'Set',    qty:28, reorder:10, price:4500},
            {sku:'LN-003',name:'Egyptian Cotton Bed Sheets',  cat:'Linen',      unit:'Set',    qty:120,reorder:50, price:2800},
            {sku:'FO-002',name:'Reception Desk System',       cat:'Front Office',unit:'Unit',  qty:2,  reorder:1,  price:45000},
            {sku:'HK-008',name:'Industrial Vacuum Cleaner',   cat:'Housekeeping',unit:'Piece', qty:6,  reorder:3,  price:12500},
            {sku:'FB-015',name:'Wine Glass Set (12pcs)',       cat:'F&B',        unit:'Set',    qty:3,  reorder:8,  price:2200},
            {sku:'TK-001',name:'Smart TV 55" 4K',             cat:'Technology', unit:'Piece',  qty:12, reorder:5,  price:38000},
          ].map(r=>{
            const low=r.qty<=r.reorder;
            return `<tr ${low?'style="background:#fef2f2;"':''}>
              <td style="font-size:.72rem;color:var(--gold);font-family:monospace;font-weight:600;">${r.sku}</td>
              <td style="font-size:.82rem;font-weight:500;">${r.name}</td>
              <td><span class="badge b-dk" style="font-size:.6rem;">${r.cat}</span></td>
              <td style="font-size:.75rem;color:var(--ink-muted);">${r.unit}</td>
              <td style="font-family:'DM Serif Display',Georgia,serif;color:${low?'#dc2626':'var(--ink)'};">${r.qty}</td>
              <td style="font-size:.78rem;color:var(--ink-muted);">${r.reorder}</td>
              <td style="font-size:.82rem;">₹${r.price.toLocaleString('en-IN')}</td>
              <td style="font-family:'DM Serif Display',Georgia,serif;color:#16a34a;">₹${(r.qty*r.price/1000).toFixed(0)}K</td>
              <td><span class="badge ${low?'b-re':'b-gr'}">${low?'Low Stock':'In Stock'}</span></td>
              <td>
                ${low?`<button onclick="igToast('PO raised for ${r.name} — ${r.reorder*2} units','success')" style="background:#dc2626;color:#fff;border:none;padding:.2rem .5rem;font-size:.65rem;cursor:pointer;">Reorder</button>`:''}
                <button onclick="igToast('Stock adjustment for ${r.name}','info')" style="background:none;border:1px solid var(--border);padding:.2rem .5rem;font-size:.65rem;cursor:pointer;color:var(--gold);margin-left:.2rem;">Adjust</button>
              </td>
            </tr>`;
          }).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Tab 2: Vendors -->
  <div id="hrc-pane-2" style="display:none;">
    <div style="margin-bottom:1rem;display:flex;gap:.75rem;">
      <button onclick="togglePanel('add-vendor-panel')" style="background:#2563eb;color:#fff;border:none;padding:.5rem 1rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-plus" style="margin-right:.4rem;"></i>Add Vendor</button>
      <button onclick="igToast('Vendor performance report generated','success')" style="background:none;border:1px solid var(--border);padding:.4rem .875rem;font-size:.75rem;cursor:pointer;color:var(--gold);"><i class="fas fa-chart-bar" style="margin-right:.3rem;"></i>Performance Report</button>
    </div>
    <div id="add-vendor-panel" class="ig-panel" style="margin-bottom:1.5rem;">
      <h4 style="font-size:.82rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin-bottom:.875rem;">New Vendor Onboarding</h4>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:.875rem;">
        <div><label class="ig-label">Vendor Name</label><input type="text" class="ig-input" placeholder="Company name" style="font-size:.82rem;"></div>
        <div><label class="ig-label">Category</label><select class="ig-input" style="font-size:.82rem;">${cats.map(c=>`<option>${c.cat}</option>`).join('')}</select></div>
        <div><label class="ig-label">GSTIN</label><input type="text" class="ig-input" placeholder="15-char GSTIN" style="font-size:.82rem;text-transform:uppercase;"></div>
        <div><label class="ig-label">Contact Person</label><input type="text" class="ig-input" placeholder="Name" style="font-size:.82rem;"></div>
        <div><label class="ig-label">Email</label><input type="email" class="ig-input" placeholder="vendor@example.com" style="font-size:.82rem;"></div>
        <div><label class="ig-label">Phone</label><input type="tel" class="ig-input" placeholder="+91 XXXXX XXXXX" style="font-size:.82rem;"></div>
        <div><label class="ig-label">Payment Terms</label><select class="ig-input" style="font-size:.82rem;"><option>Net 30</option><option>Net 45</option><option>Net 60</option><option>Advance</option></select></div>
        <div><label class="ig-label">Tier</label><select class="ig-input" style="font-size:.82rem;"><option>Bronze</option><option>Silver</option><option>Gold</option></select></div>
        <div style="display:flex;align-items:flex-end;gap:.5rem;">
          <label style="display:flex;align-items:center;gap:.4rem;font-size:.78rem;cursor:pointer;"><input type="checkbox" checked> Trigger KYC Verification Workflow</label>
        </div>
      </div>
      <div style="display:flex;gap:.75rem;margin-top:.875rem;">
        <button onclick="igToast('Vendor onboarding initiated. KYC workflow triggered.','success');togglePanel('add-vendor-panel')" style="background:#2563eb;color:#fff;border:none;padding:.45rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;">Add Vendor</button>
        <button onclick="togglePanel('add-vendor-panel')" style="background:none;border:1px solid var(--border);padding:.45rem 1rem;font-size:.72rem;cursor:pointer;color:var(--ink-muted);">Cancel</button>
      </div>
    </div>
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Approved Vendor List</h3></div>
      <table class="ig-tbl">
        <thead><tr><th>Vendor</th><th>Category</th><th>GSTIN</th><th>Tier</th><th>Rating</th><th>Lead Time</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          ${vendors.map(v=>`<tr>
            <td style="font-weight:500;font-size:.85rem;">${v.name}</td>
            <td><span class="badge b-dk" style="font-size:.6rem;">${v.cat}</span></td>
            <td style="font-size:.72rem;font-family:monospace;color:var(--ink-muted);">${v.gstin}</td>
            <td><span class="badge ${v.tier==='Gold'?'b-gr':v.tier==='Silver'?'b-g':'b-dk'}" style="font-size:.62rem;">${v.tier}</span></td>
            <td style="font-size:.82rem;color:${v.rating>=4.5?'#16a34a':'var(--ink)'};">${v.rating>0?'★ '+v.rating:'—'}</td>
            <td style="font-size:.78rem;">${v.lead}</td>
            <td><span class="badge ${v.status==='Active'?'b-gr':'b-g'}">${v.status}</span></td>
            <td style="display:flex;gap:.3rem;">
              <button onclick="igToast('${v.name} profile opened','info')" style="background:none;border:1px solid var(--border);padding:.22rem .5rem;font-size:.65rem;cursor:pointer;color:var(--gold);">View</button>
              <button onclick="igToast('Rate card from ${v.name} requested','success')" style="background:none;border:1px solid var(--border);padding:.22rem .5rem;font-size:.65rem;cursor:pointer;color:var(--ink-muted);">RFQ</button>
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Tab 3: Quote Builder (moved from original position) -->
  <div id="hrc-pane-3" style="display:none;">
    <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Quick Quote Builder</h3>
        <div style="display:flex;gap:.5rem;">
          <button onclick="igHorecaCalcQuote()" style="background:#0d9488;color:#fff;border:none;padding:.4rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:.3rem;"><i class="fas fa-calculator" style="font-size:.6rem;"></i>Calculate</button>
          <button onclick="igHorecaConvertPO()" style="background:#2563eb;color:#fff;border:none;padding:.4rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:.3rem;"><i class="fas fa-file-alt" style="font-size:.6rem;"></i>Convert to PO</button>
          <button onclick="igHorecaGenPDF()" style="background:var(--ink);color:#fff;border:none;padding:.4rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:.3rem;"><i class="fas fa-file-pdf" style="font-size:.6rem;"></i>Quote PDF</button>
        </div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;margin-bottom:1rem;">
        <div><label class="ig-label">Project Name / Hotel</label><input type="text" id="qt-project" class="ig-input" placeholder="e.g. Bijolai Palace, Jodhpur" style="font-size:.82rem;"></div>
        <div><label class="ig-label">No. of Rooms</label><input type="number" id="qt-rooms" class="ig-input" placeholder="100" style="font-size:.82rem;" oninput="igHorecaCalcQuote()"></div>
        <div><label class="ig-label">Hotel Star Category</label><select id="qt-star" class="ig-input" style="font-size:.82rem;" onchange="igHorecaCalcQuote()"><option value="3">3 Star</option><option value="4">4 Star</option><option value="5" selected>5 Star</option></select></div>
        <div><label class="ig-label">Categories Required</label><select id="qt-cats" class="ig-input" multiple style="font-size:.82rem;height:80px;" onchange="igHorecaCalcQuote()">${cats.map(c=>`<option value="${c.skus}" selected>${c.cat}</option>`).join('')}</select></div>
        <div><label class="ig-label">Delivery Timeline</label><select id="qt-delivery" class="ig-input" style="font-size:.82rem;"><option>30 Days</option><option>45 Days</option><option selected>60 Days</option><option>90 Days</option></select></div>
        <div style="background:var(--parch-dk);border:1px solid var(--border);padding:1rem;">
          <div style="font-size:.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.625rem;">Estimate Preview</div>
          <div id="qt-estimate" style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:var(--gold);">₹0</div>
          <div id="qt-breakdown" style="font-size:.72rem;color:var(--ink-muted);margin-top:.25rem;">Enter rooms and categories</div>
        </div>
      </div>
      <div id="qt-items-list" style="display:none;background:#f0fdf4;border:1px solid #86efac;padding:.875rem;margin-top:.5rem;">
        <div style="font-size:.72rem;font-weight:600;color:#15803d;margin-bottom:.5rem;">Quote Line Items:</div>
        <div id="qt-items-content" style="font-size:.75rem;color:var(--ink);"></div>
      </div>
    </div>
  </div>

  <!-- Tab 4: Purchase Orders -->
  <div id="hrc-pane-4" style="display:none;">
    <div style="margin-bottom:1rem;"><button onclick="togglePanel('new-po-panel')" style="background:#0d9488;color:#fff;border:none;padding:.5rem 1rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-plus" style="margin-right:.4rem;"></i>New Purchase Order</button></div>
    <div id="new-po-panel" class="ig-panel" style="margin-bottom:1.5rem;">
      <h4 style="font-size:.82rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin-bottom:.875rem;">New Purchase Order</h4>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:.875rem;">
        <div><label class="ig-label">Vendor</label><select class="ig-input" style="font-size:.82rem;">${vendors.map(v=>`<option>${v.name}</option>`).join('')}</select></div>
        <div><label class="ig-label">PO Date</label><input type="date" class="ig-input" style="font-size:.82rem;"></div>
        <div><label class="ig-label">Expected Delivery</label><input type="date" class="ig-input" style="font-size:.82rem;"></div>
        <div style="grid-column:span 3;"><label class="ig-label">Items & Quantities</label><textarea class="ig-input" rows="3" style="font-size:.82rem;" placeholder="SKU-001 × 5, SKU-002 × 10..."></textarea></div>
        <div><label class="ig-label">Billing Address</label><input type="text" class="ig-input" value="Registered Office, New Delhi" style="font-size:.82rem;"></div>
        <div><label class="ig-label">Delivery Address</label><input type="text" class="ig-input" placeholder="Project / Hotel site" style="font-size:.82rem;"></div>
        <div><label class="ig-label">Approver</label><select class="ig-input" style="font-size:.82rem;"><option>Arun Manikonda (MD)</option><option>Pavan Manikonda (Exec Dir)</option></select></div>
      </div>
      <div style="display:flex;gap:.75rem;margin-top:.875rem;">
        <button onclick="igToast('PO-2025-008 created. Sent for approval.','success');togglePanel('new-po-panel')" style="background:#0d9488;color:#fff;border:none;padding:.45rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;">Create PO</button>
        <button onclick="togglePanel('new-po-panel')" style="background:none;border:1px solid var(--border);padding:.45rem 1rem;font-size:.72rem;cursor:pointer;color:var(--ink-muted);">Cancel</button>
      </div>
    </div>
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Purchase Orders</h3></div>
      <table class="ig-tbl">
        <thead><tr><th>PO No.</th><th>Vendor</th><th>Items</th><th>PO Value</th><th>PO Date</th><th>Expected Delivery</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          ${[
            {po:'PO-2025-007',vendor:'Royal Linen & Textiles', items:3, val:336000, date:'15 Feb 2025',delivery:'18 Feb 2025',status:'Delivered',cls:'b-gr'},
            {po:'PO-2025-006',vendor:'Premier Kitchen Supplies',items:2, val:170000, date:'10 Feb 2025',delivery:'15 Feb 2025',status:'Delivered',cls:'b-gr'},
            {po:'PO-2025-005',vendor:'CleanPro Housekeeping',   items:4, val:75000,  date:'05 Feb 2025',delivery:'09 Feb 2025',status:'Delivered',cls:'b-gr'},
            {po:'PO-2025-008',vendor:'Hotel Tech Systems',      items:2, val:456000, date:'01 Mar 2025',delivery:'15 Mar 2025',status:'Pending Approval',cls:'b-g'},
          ].map(p=>`<tr>
            <td style="font-weight:600;font-size:.78rem;color:var(--gold);">${p.po}</td>
            <td style="font-size:.82rem;">${p.vendor}</td>
            <td style="font-size:.82rem;text-align:center;">${p.items}</td>
            <td style="font-family:'DM Serif Display',Georgia,serif;">₹${(p.val/1000).toFixed(0)}K</td>
            <td style="font-size:.78rem;color:var(--ink-muted);">${p.date}</td>
            <td style="font-size:.78rem;color:var(--ink-muted);">${p.delivery}</td>
            <td><span class="badge ${p.cls}">${p.status}</span></td>
            <td style="display:flex;gap:.3rem;">
              <button onclick="igToast('${p.po} opened','success')" style="background:none;border:1px solid var(--border);padding:.22rem .5rem;font-size:.65rem;cursor:pointer;color:var(--gold);"><i class="fas fa-eye"></i></button>
              ${p.status==='Pending Approval'?`<button onclick="igConfirm('Approve ${p.po}?',function(){igToast('${p.po} approved — PO sent to vendor','success')})" style="background:#16a34a;color:#fff;border:none;padding:.22rem .5rem;font-size:.65rem;cursor:pointer;">Approve</button>`:''}
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <!-- hrc-pane-5: Customer Portal Management -->
  <div id="hrc-pane-5" style="display:none;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1.5rem;">
      <!-- Portal Accounts -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">HORECA Customer Portal Accounts</h3>
          <button onclick="igToast('New HORECA customer account creation form opened','info')" style="background:var(--gold);color:#fff;border:none;padding:.35rem .75rem;font-size:.72rem;font-weight:600;cursor:pointer;"><i class="fas fa-user-plus" style="margin-right:.3rem;"></i>Add Account</button>
        </div>
        <div style="padding:.875rem;">
          <table class="ig-tbl"><thead><tr><th>Customer</th><th>Type</th><th>Pricing Tier</th><th>Last Login</th><th>Orders</th><th>Status</th></tr></thead><tbody>
            ${[
              {name:'Rajasthan Resort Group',  type:'Hotel Chain',   tier:'Premium (negotiated)',  last:'05 Mar 2025', orders:8, s:'Active'},
              {name:'Goa Hospitality Ventures',type:'Resort',        tier:'Standard',              last:'03 Mar 2025', orders:3, s:'Active'},
              {name:'Heritage Hotels Ltd.',    type:'Heritage Hotel',tier:'Preferred',             last:'28 Feb 2025', orders:5, s:'Active'},
              {name:'NCR Entertainment Pvt',  type:'Venue',         tier:'Trial (30-day)',         last:'01 Mar 2025', orders:1, s:'Trial'},
              {name:'Delhi NCR Retail Park',   type:'F&B Operator',  tier:'Standard',              last:'15 Jan 2025', orders:0, s:'Inactive'},
            ].map(c=>`<tr>
              <td style="font-size:.82rem;font-weight:500;">${c.name}<div style="font-size:.65rem;color:var(--ink-muted);">${c.type}</div></td>
              <td style="font-size:.68rem;">${c.tier}</td>
              <td style="font-size:.68rem;color:var(--ink-muted);">${c.last}</td>
              <td style="font-size:.78rem;font-weight:600;color:var(--gold);">${c.orders}</td>
              <td><span class="badge ${c.s==='Active'?'b-gr':c.s==='Trial'?'b-g':'b-re'}" style="font-size:.6rem;">${c.s}</span></td>
            </tr>`).join('')}
          </tbody></table>
          <div style="padding:.75rem;border-top:1px solid var(--border);display:flex;gap:.75rem;">
            <button onclick="igToast('Portal access link sent to all active customers','success')" style="background:var(--ink);color:#fff;border:none;padding:.4rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;"><i class="fas fa-link" style="margin-right:.3rem;"></i>Send Portal Links</button>
            <a href="/horeca/portal" target="_blank" style="background:var(--gold);color:#fff;border:none;padding:.4rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;text-decoration:none;display:inline-flex;align-items:center;"><i class="fas fa-external-link-alt" style="margin-right:.3rem;"></i>Preview Portal</a>
          </div>
        </div>
      </div>
      <!-- Pricing Tier Config -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Role-Based Pricing Tiers</h3></div>
        <div style="padding:1.25rem;">
          ${[
            {tier:'Premium',   disc:'20%', moq:'₹5L', lead:'Priority 3-day', badge:'b-gr', note:'Custom negotiated rates'},
            {tier:'Preferred', disc:'12%', moq:'₹2L', lead:'5 days',         badge:'b-g',  note:'Volume-based clients'},
            {tier:'Standard',  disc:'5%',  moq:'₹50K',lead:'7 days',         badge:'b-dk', note:'Default new clients'},
            {tier:'Trial',     disc:'0%',  moq:'₹10K',lead:'10 days',        badge:'b-re', note:'30-day trial access'},
          ].map(t=>`<div style="padding:.875rem;border:1px solid var(--border);margin-bottom:.5rem;display:flex;align-items:center;justify-content:space-between;">
            <div>
              <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.3rem;">
                <span class="badge ${t.badge}" style="font-size:.6rem;">${t.tier}</span>
                <span style="font-size:.72rem;font-weight:600;color:var(--gold);">${t.disc} discount</span>
              </div>
              <div style="font-size:.65rem;color:var(--ink-muted);">Min order: ${t.moq} · Lead: ${t.lead}</div>
              <div style="font-size:.63rem;color:var(--ink-faint);">${t.note}</div>
            </div>
            <button onclick="igToast('Editing ${t.tier} tier pricing','info')" style="background:none;border:1px solid var(--border);padding:.25rem .5rem;font-size:.65rem;cursor:pointer;color:var(--gold);">Edit</button>
          </div>`).join('')}
          <button onclick="igToast('Pricing tier changes saved — live on portal','success')" style="background:var(--gold);color:#fff;border:none;padding:.45rem 1rem;font-size:.75rem;font-weight:600;cursor:pointer;width:100%;margin-top:.25rem;"><i class="fas fa-save" style="margin-right:.4rem;"></i>Save Pricing Tiers</button>
        </div>
      </div>
    </div>
    <!-- Recent Portal Orders -->
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Recent Portal Orders</h3></div>
      <table class="ig-tbl"><thead><tr><th>Order No.</th><th>Customer</th><th>Items</th><th>Value</th><th>Placed</th><th>Delivery</th><th>Status</th><th>Action</th></tr></thead><tbody>
        ${[
          {oid:'PO-HRC-2025-018',cust:'Rajasthan Resort Group',   items:'Linen Bundle — 200 sets',         val:'₹8.4L', placed:'04 Mar 2025',del:'12 Mar 2025',s:'Processing'},
          {oid:'PO-HRC-2025-017',cust:'Heritage Hotels Ltd.',     items:'Kitchen Equipment × 12 SKUs',      val:'₹3.2L', placed:'02 Mar 2025',del:'10 Mar 2025',s:'Shipped'},
          {oid:'PO-HRC-2025-016',cust:'Goa Hospitality Ventures', items:'F&B Setup — Bar Package',          val:'₹1.8L', placed:'28 Feb 2025',del:'05 Mar 2025',s:'Delivered'},
          {oid:'PO-HRC-2025-015',cust:'NCR Entertainment Pvt',   items:'Event Crockery — 500 covers',      val:'₹0.9L', placed:'25 Feb 2025',del:'02 Mar 2025',s:'Delivered'},
        ].map(o=>`<tr>
          <td style="font-size:.75rem;font-weight:600;color:var(--gold);">${o.oid}</td>
          <td style="font-size:.75rem;">${o.cust}</td>
          <td style="font-size:.72rem;color:var(--ink-muted);">${o.items}</td>
          <td style="font-size:.82rem;font-weight:600;">${o.val}</td>
          <td style="font-size:.7rem;color:var(--ink-muted);">${o.placed}</td>
          <td style="font-size:.7rem;color:var(--ink-muted);">${o.del}</td>
          <td><span class="badge ${o.s==='Delivered'?'b-gr':o.s==='Shipped'?'b-g':'b-dk'}" style="font-size:.6rem;">${o.s}</span></td>
          <td><button onclick="igToast('Tracking for ${o.oid} opened','info')" style="background:none;border:1px solid var(--border);padding:.2rem .5rem;font-size:.65rem;cursor:pointer;color:var(--gold);"><i class="fas fa-truck"></i></button></td>
        </tr>`).join('')}
      </tbody></table>
    </div>
  </div>

  <!-- hrc-pane-6: GRN, Multi-Warehouse & Logistics -->
  <div id="hrc-pane-6" style="display:none;">
    <!-- GRN Summary -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">
      ${[
        {label:'GRNs This Month',    value:'12',       sub:'3 pending QC',        c:'#B8960C'},
        {label:'Items Received',     value:'847 SKUs',  sub:'Across all locations',c:'#16a34a'},
        {label:'Pending Delivery',   value:'4 Orders',  sub:'₹8.4L in transit',   c:'#d97706'},
        {label:'Rejection Rate',     value:'1.8%',      sub:'QC failures MTD',    c:'#dc2626'},
      ].map(s=>`<div style="background:#fff;border:1px solid var(--border);padding:1rem;">
        <div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.35rem;">${s.label}</div>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:${s.c};">${s.value}</div>
        <div style="font-size:.68rem;color:${s.c};">${s.sub}</div>
      </div>`).join('')}
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1.5rem;">
      <!-- GRN Register -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">GRN Register</h3>
          <button onclick="togglePanel('new-grn-panel')" style="background:var(--gold);color:#fff;border:none;padding:.3rem .75rem;font-size:.68rem;font-weight:600;cursor:pointer;"><i class="fas fa-plus" style="margin-right:.3rem;"></i>New GRN</button>
        </div>
        <div id="new-grn-panel" class="ig-panel" style="margin:1.25rem;display:none;">
          <h4 style="font-size:.8rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin-bottom:.875rem;">Goods Receipt Note</h4>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;">
            <div><label class="ig-label">Purchase Order Ref</label><select class="ig-input" style="font-size:.82rem;"><option>PO-2025-018 — Kitchen Equipment</option><option>PO-2025-019 — Linen Supply</option></select></div>
            <div><label class="ig-label">Receiving Warehouse</label><select class="ig-input" style="font-size:.82rem;"><option>New Delhi Central</option><option>Mumbai Satellite</option><option>Gurgaon Depot</option></select></div>
            <div><label class="ig-label">Delivery Challan No.</label><input type="text" class="ig-input" style="font-size:.82rem;" placeholder="DC/2025/xxxx"></div>
            <div><label class="ig-label">Receipt Date</label><input type="date" class="ig-input" style="font-size:.82rem;"></div>
            <div><label class="ig-label">QC Inspector</label><select class="ig-input" style="font-size:.82rem;"><option>Amit Jhingan</option><option>Pavan Manikonda</option></select></div>
            <div><label class="ig-label">QC Status</label><select class="ig-input" style="font-size:.82rem;"><option>Pass</option><option>Partial Pass</option><option>Fail — Return</option></select></div>
          </div>
          <div style="display:flex;gap:.75rem;margin-top:.875rem;">
            <button onclick="igToast('GRN-2025-013 created. Stock updated in New Delhi Central warehouse.','success');togglePanel('new-grn-panel')" style="background:var(--gold);color:#fff;border:none;padding:.45rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;">Create GRN</button>
            <button onclick="togglePanel('new-grn-panel')" style="background:none;border:1px solid var(--border);padding:.45rem 1rem;font-size:.72rem;cursor:pointer;color:var(--ink-muted);">Cancel</button>
          </div>
        </div>
        <table class="ig-tbl" style="font-size:.78rem;"><thead><tr><th>GRN No.</th><th>PO Ref</th><th>Warehouse</th><th>Items</th><th>QC</th><th>Date</th><th>Status</th></tr></thead><tbody>
          ${[
            {grn:'GRN-013',po:'PO-018',wh:'Delhi Central', items:24, qc:'Pass',    date:'27 Feb 2025',cls:'b-gr'},
            {grn:'GRN-012',po:'PO-017',wh:'Mumbai',        items:16, qc:'Pass',    date:'22 Feb 2025',cls:'b-gr'},
            {grn:'GRN-011',po:'PO-015',wh:'Delhi Central', items:8,  qc:'Partial', date:'18 Feb 2025',cls:'b-g'},
            {grn:'GRN-010',po:'PO-014',wh:'Gurgaon',       items:32, qc:'Pass',    date:'10 Feb 2025',cls:'b-gr'},
          ].map(g=>`<tr>
            <td style="font-weight:700;color:var(--gold);">${g.grn}</td>
            <td style="color:var(--ink-muted);">${g.po}</td>
            <td>${g.wh}</td>
            <td style="text-align:center;">${g.items}</td>
            <td><span class="badge ${g.qc==='Pass'?'b-gr':g.qc==='Partial'?'b-g':'b-re'}" style="font-size:.6rem;">${g.qc}</span></td>
            <td style="color:var(--ink-muted);">${g.date}</td>
            <td><span class="badge ${g.cls}" style="font-size:.6rem;">Received</span></td>
          </tr>`).join('')}
        </tbody></table>
      </div>
      <!-- Multi-Warehouse Stock -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);">
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Multi-Warehouse Stock View</h3>
        </div>
        <div style="padding:1.25rem;">
          <div style="display:flex;gap:.5rem;margin-bottom:1rem;flex-wrap:wrap;">
            ${['All Locations','New Delhi Central','Mumbai Satellite','Gurgaon Depot'].map((w,i)=>`<button onclick="igWHFilter('${w}')" style="background:${i===0?'var(--gold)':'var(--parch-dk)'};color:${i===0?'#fff':'var(--ink)'};border:1px solid ${i===0?'var(--gold)':'var(--border)'};padding:.25rem .625rem;font-size:.68rem;cursor:pointer;">${w}</button>`).join('')}
          </div>
          ${[
            {cat:'Kitchen Equipment', delhi:45, mumbai:18, gurgaon:12, reorder:10, value:'₹14.2L'},
            {cat:'Crockery & Cutlery',delhi:230,mumbai:95, gurgaon:0,  reorder:50, value:'₹6.8L'},
            {cat:'Linen & Fabrics',   delhi:82, mumbai:34, gurgaon:28, reorder:30, value:'₹3.1L'},
            {cat:'Front Office',      delhi:18, mumbai:12, gurgaon:5,  reorder:8,  value:'₹2.4L'},
            {cat:'Food & Beverage',   delhi:120,mumbai:56, gurgaon:0,  reorder:40, value:'₹5.7L'},
          ].map(w=>`<div style="border:1px solid var(--border);padding:.75rem;margin-bottom:.5rem;background:var(--parch-dk);">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.5rem;">
              <span style="font-weight:600;font-size:.82rem;">${w.cat}</span>
              <span style="font-size:.72rem;font-weight:700;color:var(--gold);">${w.value}</span>
            </div>
            <div style="display:flex;gap:1rem;font-size:.72rem;color:var(--ink-muted);">
              <span><i class="fas fa-map-marker-alt" style="color:#B8960C;margin-right:.2rem;"></i>Delhi: <strong style="color:var(--ink);">${w.delhi}</strong></span>
              <span><i class="fas fa-map-marker-alt" style="color:#2563eb;margin-right:.2rem;"></i>Mumbai: <strong style="color:var(--ink);">${w.mumbai}</strong></span>
              <span><i class="fas fa-map-marker-alt" style="color:#7c3aed;margin-right:.2rem;"></i>Gurgaon: <strong style="color:var(--ink);">${w.gurgaon}</strong></span>
              <span style="margin-left:auto;color:${(w.delhi+w.mumbai+w.gurgaon)<w.reorder*2?'#dc2626':'#16a34a'};">Reorder: ${w.reorder}</span>
            </div>
          </div>`).join('')}
          <button onclick="igToast('Inter-warehouse transfer request submitted','success')" style="margin-top:.875rem;background:var(--ink);color:#fff;border:none;padding:.45rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;width:100%;"><i class="fas fa-exchange-alt" style="margin-right:.4rem;"></i>Request Stock Transfer</button>
        </div>
      </div>
    </div>
    <!-- Logistics Tracking -->
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Shipment & Logistics Tracker</h3>
        <button onclick="igToast('Logistics export generated','success')" style="background:none;border:1px solid var(--border);padding:.3rem .75rem;font-size:.68rem;cursor:pointer;color:var(--gold);"><i class="fas fa-download" style="margin-right:.3rem;"></i>Export</button>
      </div>
      <table class="ig-tbl"><thead><tr><th>Shipment ID</th><th>PO Ref</th><th>Carrier</th><th>AWB / LR</th><th>Origin</th><th>Destination</th><th>ETA</th><th>Last Update</th><th>Status</th></tr></thead><tbody>
        ${[
          {id:'SHP-028',po:'PO-020',carrier:'Blue Dart',   awb:'BD1234567890',origin:'Mumbai',     dest:'Delhi Central',  eta:'01 Mar 2025',upd:'28 Feb — Out for delivery',cls:'b-g',  s:'In Transit'},
          {id:'SHP-027',po:'PO-019',carrier:'DTDC',        awb:'DT9876543210',origin:'Delhi',      dest:'Gurgaon Depot',  eta:'28 Feb 2025',upd:'28 Feb — Delivered',     cls:'b-gr', s:'Delivered'},
          {id:'SHP-026',po:'PO-018',carrier:'DHL Express', awb:'DH4567890123',origin:'Hyderabad',  dest:'Mumbai',         eta:'05 Mar 2025',upd:'27 Feb — In transit',     cls:'b-dk', s:'Scheduled'},
          {id:'SHP-025',po:'PO-017',carrier:'Gati',        awb:'GT7890123456',origin:'Delhi',      dest:'Delhi Central',  eta:'26 Feb 2025',upd:'26 Feb — Delivered',     cls:'b-gr', s:'Delivered'},
        ].map(s=>`<tr>
          <td style="font-weight:700;font-size:.78rem;color:var(--gold);">${s.id}</td>
          <td style="font-size:.75rem;color:var(--ink-muted);">${s.po}</td>
          <td style="font-size:.78rem;">${s.carrier}</td>
          <td style="font-size:.72rem;font-family:monospace;">${s.awb}</td>
          <td style="font-size:.75rem;">${s.origin}</td>
          <td style="font-size:.75rem;">${s.dest}</td>
          <td style="font-size:.75rem;font-weight:500;">${s.eta}</td>
          <td style="font-size:.72rem;color:var(--ink-muted);">${s.upd}</td>
          <td><span class="badge ${s.cls}">${s.s}</span></td>
        </tr>`).join('')}
      </tbody></table>
    </div>
  </div>

  <script>
  window.igHorecaTab = function(idx){
    for(var i=0;i<7;i++){
      var p=document.getElementById('hrc-pane-'+i);
      var t=document.getElementById('hrc-tab-'+i);
      if(p) p.style.display=i===idx?'block':'none';
      if(t){ t.style.color=i===idx?'var(--gold)':'var(--ink-muted)'; t.style.borderBottom=i===idx?'2px solid var(--gold)':'2px solid transparent'; }
    }
  };
  function igHorecaCalcQuote(){
    var rooms = parseInt(document.getElementById('qt-rooms').value) || 0;
    var star  = parseInt(document.getElementById('qt-star').value) || 5;
    var cats  = Array.from(document.getElementById('qt-cats').selectedOptions);
    var ratePerRoom = star === 5 ? 85000 : star === 4 ? 55000 : 35000;
    var total = rooms * ratePerRoom * cats.length / 8;
    var el = document.getElementById('qt-estimate');
    var bd = document.getElementById('qt-breakdown');
    var itemsDiv = document.getElementById('qt-items-list');
    var itemsContent = document.getElementById('qt-items-content');
    if(rooms > 0 && cats.length > 0){
      var lakh = total / 100000;
      el.textContent = lakh >= 100 ? '₹' + (lakh/100).toFixed(1) + ' Cr' : '₹' + lakh.toFixed(1) + ' L';
      bd.textContent = rooms + ' rooms × ' + cats.length + ' categories × ₹' + (ratePerRoom/1000) + 'K/room';
      var lines = cats.map(function(c){ return c.text + ': ₹' + ((rooms*ratePerRoom/8)/1000).toFixed(0)+'K'; });
      itemsContent.innerHTML = lines.join('<br>');
      itemsDiv.style.display = 'block';
    } else {
      el.textContent = '₹0';
      bd.textContent = 'Enter rooms and select categories';
      itemsDiv.style.display = 'none';
    }
  }
  function igHorecaGenPDF(){
    var project = document.getElementById('qt-project').value.trim();
    if(!project){ igToast('Please enter a project name','warn'); return; }
    var est = document.getElementById('qt-estimate').textContent;
    igToast('Quote PDF for '+project+' ('+est+') generated — ready to download','success');
  }
  window.igHorecaConvertPO = function(){
    var project = document.getElementById('qt-project').value.trim();
    if(!project){ igToast('Please enter project name first','warn'); return; }
    igToast('Quote converted to PO-2025-009 for '+project+'. Sent for approval.','success');
  };
  </script>`
  return c.html(layout('HORECA Inventory', adminShell('HORECA Inventory Management', 'horeca', body), {noNav:true,noFooter:true}))
})

// ── CONTRACTS ─────────────────────────────────────────────────────────────────
app.get('/contracts', (c) => {
  const contracts = [
    {id:'AGR-001', name:'Advisory Agreement FY2025',       party:'Demo Client Corp',  type:'Advisory',    start:'01 Jan 2025',expiry:'31 Dec 2025',status:'Active',   cls:'b-gr',signed:true},
    {id:'PMC-001', name:'Hotel PMC Agreement',              party:'Rajasthan Hotels',  type:'PMC',         start:'15 Feb 2025',expiry:'14 Feb 2026',status:'Active',   cls:'b-gr',signed:true},
    {id:'MND-001', name:'Retail Leasing Mandate',           party:'Mumbai Mall Pvt.', type:'Mandate',     start:'01 Dec 2024',expiry:'30 Nov 2025',status:'Active',   cls:'b-gr',signed:true},
    {id:'RET-001', name:'EY Advisory Retainer',             party:'Ernst & Young',    type:'Retainer',    start:'01 Apr 2024',expiry:'31 Mar 2025',status:'Expiring', cls:'b-g', signed:true},
    {id:'MOU-001', name:'CBRE Co-Advisory MOU',             party:'CBRE India',       type:'MOU',         start:'01 Jan 2025',expiry:'31 Dec 2025',status:'Active',   cls:'b-gr',signed:true},
    {id:'NDA-001', name:'NDA — Entertainment Project',      party:'Confidential',     type:'NDA',         start:'01 Feb 2025',expiry:'01 Feb 2026',status:'Active',   cls:'b-gr',signed:false},
    {id:'DRF-001', name:'New Client Advisory Agreement',    party:'TBD',              type:'Advisory',    start:'—',          expiry:'—',           status:'Draft',    cls:'b-dk',signed:false},
  ]
  const templates = ['Advisory Services Agreement','Hotel Management Pre-Opening Contract','Retail Leasing Mandate','Non-Disclosure Agreement (NDA)','Memorandum of Understanding (MOU)','Engagement Letter']
  const clauses = [
    {name:'Scope of Services',     cat:'Standard'},
    {name:'Fee Structure & Payment Terms',cat:'Standard'},
    {name:'Confidentiality & NDA', cat:'Legal'},
    {name:'IP & Work Product',     cat:'Legal'},
    {name:'Termination Clause',    cat:'Standard'},
    {name:'Dispute Resolution',    cat:'Legal'},
    {name:'Limitation of Liability',cat:'Legal'},
    {name:'Force Majeure',         cat:'Standard'},
    {name:'Governing Law — India (Delhi)', cat:'Jurisdiction'},
    {name:'Non-Solicitation',      cat:'HR'},
    {name:'RERA Compliance Note',  cat:'Regulatory'},
    {name:'GST Applicability',     cat:'Finance'},
  ]
  const body = `
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">
    ${[{label:'Active Contracts',value:'6',c:'#16a34a'},{label:'Awaiting E-Sign',value:'1',c:'#d97706'},{label:'Expiring 30 Days',value:'1',c:'#dc2626'},{label:'Templates',value:'6',c:'#4f46e5'}].map(s=>`<div class="am"><div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.5rem;">${s.label}</div><div style="font-family:'DM Serif Display',Georgia,serif;font-size:2rem;color:${s.c};">${s.value}</div></div>`).join('')}
  </div>

  <!-- Tab Nav -->
  <div style="display:flex;gap:0;margin-bottom:1.5rem;border-bottom:2px solid var(--border);">
    ${['All Contracts','New Contract','Template Library','Clause Library','Renewals','Version Diff','Risk Scanner'].map((t,i)=>`<button onclick="igCtTab(${i})" id="ct-tab-${i}" style="padding:.6rem 1.1rem;font-size:.78rem;font-weight:600;cursor:pointer;border:none;background:none;color:${i===0?'var(--gold)':'var(--ink-muted)'};border-bottom:${i===0?'2px solid var(--gold)':'2px solid transparent'};letter-spacing:.04em;text-transform:uppercase;margin-bottom:-2px;white-space:nowrap;">${t}</button>`).join('')}
  </div>

  <!-- Tab 0: All Contracts -->
  <div id="ct-pane-0">
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Contract Register</h3>
        <button onclick="igToast('Contract register exported to PDF','success')" style="background:none;border:1px solid var(--border);padding:.3rem .75rem;font-size:.68rem;cursor:pointer;color:var(--gold);"><i class="fas fa-download" style="margin-right:.3rem;"></i>Export</button>
      </div>
      <table class="ig-tbl">
        <thead><tr><th>ID</th><th>Contract Name</th><th>Party</th><th>Type</th><th>Expiry</th><th>E-Sign</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          ${contracts.map(r=>`<tr>
            <td style="font-size:.78rem;font-weight:600;color:var(--gold);">${r.id}</td>
            <td style="font-weight:500;font-size:.85rem;">${r.name}</td>
            <td style="font-size:.8rem;">${r.party}</td>
            <td><span class="badge b-dk">${r.type}</span></td>
            <td style="font-size:.78rem;color:${r.status==='Expiring'?'#dc2626':'var(--ink-muted)'};">${r.expiry}</td>
            <td><span class="badge ${r.signed?'b-gr':'b-g'}">${r.signed?'Signed ✓':'Pending'}</span></td>
            <td><span class="badge ${r.cls}">${r.status}</span></td>
            <td style="display:flex;gap:.3rem;flex-wrap:wrap;">
              <button onclick="igToast('${r.name} opened for viewing','success')" style="background:none;border:1px solid var(--border);padding:.22rem .5rem;font-size:.65rem;cursor:pointer;color:var(--gold);" title="View"><i class="fas fa-eye"></i></button>
              <button onclick="igToast('${r.name} downloaded as PDF','success')" style="background:none;border:1px solid var(--border);padding:.22rem .5rem;font-size:.65rem;cursor:pointer;color:var(--ink-muted);" title="Download"><i class="fas fa-download"></i></button>
              ${!r.signed?`<button onclick="igSendForSign('${r.id}','${r.name}')" style="background:#7c3aed;color:#fff;border:none;padding:.22rem .5rem;font-size:.65rem;cursor:pointer;" title="Send for e-sign"><i class="fas fa-pen"></i> E-Sign</button>`:''}
              ${r.status==='Expiring'?`<button onclick="igToast('Renewal workflow triggered for ${r.name}','warn')" style="background:#d97706;color:#fff;border:none;padding:.22rem .5rem;font-size:.65rem;cursor:pointer;">Renew</button>`:''}
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Tab 1: New Contract -->
  <div id="ct-pane-1" style="display:none;">
    <div style="display:grid;grid-template-columns:3fr 2fr;gap:1.5rem;">
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Contract Builder</h3></div>
        <div style="padding:1.25rem;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.875rem;margin-bottom:.875rem;">
            <div><label class="ig-label">Contract Title</label><input type="text" id="ct-title" class="ig-input" placeholder="Advisory Agreement FY2026" style="font-size:.82rem;"></div>
            <div><label class="ig-label">Contract Type</label><select id="ct-type" class="ig-input" style="font-size:.82rem;"><option>Advisory</option><option>PMC</option><option>Mandate</option><option>Retainer</option><option>MOU</option><option>NDA</option></select></div>
            <div><label class="ig-label">Counter-Party</label><input type="text" id="ct-party" class="ig-input" placeholder="Company / Individual name" style="font-size:.82rem;"></div>
            <div><label class="ig-label">Template</label><select id="ct-template" class="ig-input" style="font-size:.82rem;"><option>-- Blank --</option>${templates.map(t=>`<option>${t}</option>`).join('')}</select></div>
            <div><label class="ig-label">Start Date</label><input type="date" id="ct-start" class="ig-input" style="font-size:.82rem;"></div>
            <div><label class="ig-label">End Date</label><input type="date" id="ct-end" class="ig-input" style="font-size:.82rem;"></div>
            <div style="grid-column:span 2;"><label class="ig-label">Fee / Consideration (₹)</label><input type="text" class="ig-input" placeholder="e.g. ₹5,00,000 + GST per annum" style="font-size:.82rem;"></div>
            <div style="grid-column:span 2;"><label class="ig-label">Scope Summary</label><textarea class="ig-input" rows="3" placeholder="Brief description of services / scope of this contract..." style="font-size:.82rem;"></textarea></div>
          </div>
          <h5 style="font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--ink-muted);margin-bottom:.625rem;">Selected Clauses</h5>
          <div id="ct-selected-clauses" style="display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:.875rem;min-height:36px;padding:.5rem;border:1px solid var(--border);background:var(--parch-dk);">
            <span style="font-size:.72rem;color:var(--ink-muted);">Select clauses from the panel →</span>
          </div>
          <div style="display:flex;gap:.75rem;">
            <button onclick="igCreateContract()" style="background:#4f46e5;color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-file-contract" style="margin-right:.4rem;"></i>Save as Draft</button>
            <button onclick="igToast('Contract PDF preview generated','success')" style="background:var(--ink);color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-eye" style="margin-right:.4rem;"></i>Preview PDF</button>
            <button onclick="igAiClauseScan()" style="background:#7c3aed;color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-magic" style="margin-right:.4rem;"></i>AI Risk Scan</button>
          </div>
          <!-- AI Clause Scan Output -->
          <div id="clause-scan-output" style="margin-top:.875rem;"></div>
        </div>
      </div>
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Clause Library</h3></div>
        <div style="padding:.875rem;max-height:560px;overflow-y:auto;">
          ${clauses.map((cl,i)=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:.55rem .5rem;border-bottom:1px solid var(--border);">
            <div>
              <div style="font-size:.82rem;font-weight:500;color:var(--ink);">${cl.name}</div>
              <span class="badge b-dk" style="font-size:.58rem;">${cl.cat}</span>
            </div>
            <button id="clause-btn-${i}" onclick="igAddClause('${cl.name}',${i})" style="background:none;border:1px solid var(--border);padding:.2rem .5rem;font-size:.65rem;cursor:pointer;color:var(--gold);">Add</button>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>

  <!-- Tab 2: Template Library -->
  <div id="ct-pane-2" style="display:none;">
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.875rem;">
      ${templates.map(t=>`<div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
        <div style="width:40px;height:40px;background:#4f46e5;display:flex;align-items:center;justify-content:center;margin-bottom:.75rem;">
          <i class="fas fa-file-contract" style="color:#fff;font-size:.85rem;"></i>
        </div>
        <div style="font-weight:600;font-size:.875rem;color:var(--ink);margin-bottom:.4rem;">${t}</div>
        <div style="font-size:.72rem;color:var(--ink-muted);margin-bottom:.875rem;">Standard India Gully template · Last updated Jan 2025</div>
        <div style="display:flex;gap:.5rem;">
          <button onclick="igToast('${t} — opening in editor','success')" style="background:#4f46e5;color:#fff;border:none;padding:.35rem .75rem;font-size:.68rem;font-weight:600;cursor:pointer;flex:1;"><i class="fas fa-edit" style="margin-right:.3rem;"></i>Edit</button>
          <button onclick="igToast('${t} template downloaded','success')" style="background:none;border:1px solid var(--border);padding:.35rem .75rem;font-size:.68rem;cursor:pointer;color:var(--ink-muted);"><i class="fas fa-download"></i></button>
        </div>
      </div>`).join('')}
    </div>
  </div>

  <!-- Tab 3: Clause Library -->
  <div id="ct-pane-3" style="display:none;">
    <div style="margin-bottom:1rem;"><button onclick="togglePanel('new-clause-panel')" style="background:#4f46e5;color:#fff;border:none;padding:.5rem 1rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-plus" style="margin-right:.4rem;"></i>Add Custom Clause</button></div>
    <div id="new-clause-panel" class="ig-panel" style="margin-bottom:1.5rem;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:.875rem;">
        <div><label class="ig-label">Clause Name</label><input type="text" class="ig-input" style="font-size:.82rem;" placeholder="Name this clause..."></div>
        <div><label class="ig-label">Category</label><select class="ig-input" style="font-size:.82rem;"><option>Standard</option><option>Legal</option><option>Finance</option><option>HR</option><option>Regulatory</option><option>Jurisdiction</option></select></div>
        <div style="grid-column:span 2;"><label class="ig-label">Clause Text</label><textarea class="ig-input" rows="5" style="font-size:.82rem;" placeholder="Enter full clause text with legal language..."></textarea></div>
      </div>
      <div style="display:flex;gap:.75rem;margin-top:.875rem;">
        <button onclick="igToast('Custom clause saved to library','success');togglePanel('new-clause-panel')" style="background:#4f46e5;color:#fff;border:none;padding:.45rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;">Save Clause</button>
        <button onclick="togglePanel('new-clause-panel')" style="background:none;border:1px solid var(--border);padding:.45rem 1rem;font-size:.72rem;cursor:pointer;color:var(--ink-muted);">Cancel</button>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:.875rem;">
      ${clauses.map(cl=>`<div style="background:#fff;border:1px solid var(--border);padding:1.1rem;">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.5rem;">
          <div style="font-weight:600;font-size:.875rem;color:var(--ink);">${cl.name}</div>
          <span class="badge b-dk" style="font-size:.6rem;">${cl.cat}</span>
        </div>
        <div style="font-size:.75rem;color:var(--ink-muted);line-height:1.5;margin-bottom:.75rem;">Standard clause covering ${cl.name.toLowerCase()} obligations and rights of both parties as per Indian Contract Act 1872.</div>
        <div style="display:flex;gap:.4rem;">
          <button onclick="igToast('${cl.name} — opening editor','success')" style="background:none;border:1px solid var(--border);padding:.25rem .6rem;font-size:.68rem;cursor:pointer;color:var(--gold);">Edit</button>
          <button onclick="igToast('${cl.name} copied to clipboard','success')" style="background:none;border:1px solid var(--border);padding:.25rem .6rem;font-size:.68rem;cursor:pointer;color:var(--ink-muted);"><i class="fas fa-copy"></i></button>
        </div>
      </div>`).join('')}
    </div>
  </div>

  <!-- ct-pane-4: Renewal Tracker -->
  <div id="ct-pane-4" style="display:none;">
    <div class="ig-warn" style="margin-bottom:1.25rem;"><i class="fas fa-bell"></i><div>2 contracts expiring in <strong>30 days</strong>. Renewal workflows can be auto-triggered from this panel.</div></div>
    <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Contract Renewal Dashboard</h3>
        <div style="display:flex;gap:.5rem;">
          <select class="ig-input" style="font-size:.75rem;max-width:130px;"><option>All Contracts</option><option>Expiring 30 days</option><option>Expiring 60 days</option><option>Expired</option></select>
        </div>
      </div>
      <table class="ig-tbl"><thead><tr><th>Contract</th><th>Party</th><th>Type</th><th>Expiry</th><th>Days Left</th><th>Auto-Renew</th><th>Status</th><th>Action</th></tr></thead><tbody id="contracts-tbody">
        ${[
          {id:'CTR-001',name:'Advisory Retainer — Heritage Hotels',   party:'Heritage Hotels Ltd',         type:'Retainer',  exp:'31 Mar 2025', days:25,  auto:false, s:'Expiring Soon'},
          {id:'CTR-002',name:'NDA — Goa Hospitality Ventures',        party:'Goa Hospitality Ventures',    type:'NDA',       exp:'10 Mar 2025', days:4,   auto:false, s:'Critical'},
          {id:'CTR-003',name:'Mandate Agreement — Entertainment City',party:'NCR Entertainment Pvt Ltd',  type:'Mandate',   exp:'30 Jun 2025', days:117, auto:true,  s:'Active'},
          {id:'CTR-004',name:'Vendor Agreement — Office Supplies',     party:'ABC Suppliers Ltd',          type:'Vendor',    exp:'31 Dec 2025', days:300, auto:true,  s:'Active'},
          {id:'CTR-005',name:'Lease — Registered Office',              party:'City Properties Ltd',        type:'Lease',     exp:'31 Aug 2025', days:178, auto:false, s:'Active'},
          {id:'CTR-006',name:'Advisory Agreement — Mumbai RE Fund',    party:'Mumbai Real Estate Fund',    type:'Advisory',  exp:'28 Feb 2025', days:-1,  auto:false, s:'Expired'},
        ].map(c=>`<tr>
          <td style="font-size:.75rem;font-weight:600;color:var(--gold);">${c.id}</td>
          <td style="font-size:.78rem;">${c.name}<div style="font-size:.65rem;color:var(--ink-muted);">${c.party}</div></td>
          <td><span class="badge b-dk" style="font-size:.6rem;">${c.type}</span></td>
          <td style="font-size:.72rem;color:${c.days<0?'#dc2626':c.days<=30?'#d97706':'var(--ink-muted)'};">${c.exp}</td>
          <td style="font-size:.82rem;font-weight:700;color:${c.days<0?'#dc2626':c.days<=30?'#d97706':'#16a34a'};">${c.days<0?'Expired':c.days+'d'}</td>
          <td><span class="badge ${c.auto?'b-gr':'b-re'}" style="font-size:.6rem;">${c.auto?'Yes':'No'}</span></td>
          <td><span class="badge ${c.s==='Active'?'b-gr':c.s==='Expired'?'b-re':c.s==='Critical'?'b-re':'b-g'}" style="font-size:.6rem;">${c.s}</span></td>
          <td>
            <div style="display:flex;gap:.3rem;">
              <button onclick="igToast('Renewal workflow started for ${c.id}','success')" style="background:var(--gold);color:#fff;border:none;padding:.2rem .45rem;font-size:.62rem;cursor:pointer;">Renew</button>
              <button onclick="igToast('Reminder sent for ${c.id}','success')" style="background:none;border:1px solid var(--border);padding:.2rem .4rem;font-size:.62rem;cursor:pointer;color:var(--ink-muted);"><i class="fas fa-bell"></i></button>
            </div>
          </td>
        </tr>`).join('')}
      </tbody></table>
    </div>
    <!-- Auto-Renewal Settings -->
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Renewal Reminder Settings</h3></div>
      <div style="padding:1.25rem;display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;">
        ${[
          {l:'First reminder',  v:'90', unit:'days before expiry'},
          {l:'Second reminder', v:'30', unit:'days before expiry'},
          {l:'Final reminder',  v:'7',  unit:'days before expiry'},
          {l:'Notify',         v:'Finance, Legal, MD', unit:'(roles)'},
          {l:'Auto-escalate',  v:'3',  unit:'days after first missed reminder'},
          {l:'Auto-draft renewal',v:'Enabled', unit:'for mandate-type contracts'},
        ].map(s=>`<div style="padding:.75rem;border:1px solid var(--border);background:var(--parch-dk);">
          <div style="font-size:.72rem;font-weight:700;color:var(--ink-muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:.3rem;">${s.l}</div>
          <div style="font-size:.85rem;font-weight:600;color:var(--ink);">${s.v}</div>
          <div style="font-size:.65rem;color:var(--ink-muted);">${s.unit}</div>
        </div>`).join('')}
      </div>
      <div style="padding:0 1.25rem 1.25rem;">
        <button onclick="igToast('Renewal reminder settings saved','success')" style="background:var(--gold);color:#fff;border:none;padding:.5rem 1.1rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-save" style="margin-right:.4rem;"></i>Save Settings</button>
      </div>
    </div>
  </div>

  <!-- ct-pane-5: Version Diff -->
  <div id="ct-pane-5" style="display:none;">
    <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Contract Version History & Diff Viewer</h3>
        <select class="ig-input" style="font-size:.75rem;max-width:240px;" onchange="igToast('Loading version history for selected contract','info')">
          <option>CTR-001 — Advisory Retainer</option>
          <option>CTR-003 — Mandate Agreement ECD</option>
          <option>CTR-004 — Vendor Agreement</option>
        </select>
      </div>
      <div style="padding:1.25rem;">
        <!-- Version List -->
        <div style="display:grid;grid-template-columns:220px 1fr;gap:1.5rem;">
          <div>
            <div style="font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--ink-muted);margin-bottom:.625rem;">Versions</div>
            ${[
              {v:'v3.0', date:'05 Mar 2025', author:'Arun Manikonda', note:'Fees revised upward — ₹4.5L',    active:true},
              {v:'v2.1', date:'15 Feb 2025', author:'Pavan Manikonda',note:'Termination clause amended',      active:false},
              {v:'v2.0', date:'01 Feb 2025', author:'Amit Jhingan',   note:'Scope extended to Q3 FY 2025', active:false},
              {v:'v1.0', date:'01 Jan 2025', author:'Arun Manikonda', note:'Initial contract execution',    active:false},
            ].map(v=>`<div onclick="igToast('Loading diff for ${v.v}','info')" style="padding:.625rem .75rem;border:1px solid ${v.active?'var(--gold)':'var(--border)'};background:${v.active?'#fffbeb':'#fff'};margin-bottom:.3rem;cursor:pointer;">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.15rem;">
                <span style="font-size:.78rem;font-weight:700;color:${v.active?'var(--gold)':'var(--ink)'};">${v.v}</span>
                ${v.active?'<span class="badge b-g" style="font-size:.55rem;">Current</span>':''}
              </div>
              <div style="font-size:.65rem;color:var(--ink-muted);">${v.date} · ${v.author}</div>
              <div style="font-size:.65rem;color:var(--ink);margin-top:.15rem;">${v.note}</div>
            </div>`).join('')}
          </div>
          <!-- Diff View -->
          <div>
            <div style="font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--ink-muted);margin-bottom:.625rem;">Diff: v2.1 → v3.0</div>
            <div style="background:#0f172a;border:1px solid #334155;padding:1.25rem;font-family:monospace;font-size:.72rem;line-height:1.8;overflow-x:auto;">
              <div style="color:#94a3b8;">// Section 4 — Advisory Fees</div>
              <div style="background:#7f1d1d;color:#fca5a5;padding:2px 4px;">- 4.1 Monthly retainer: ₹3,50,000 + GST applicable</div>
              <div style="background:#14532d;color:#86efac;padding:2px 4px;">+ 4.1 Monthly retainer: ₹4,50,000 + GST applicable</div>
              <div style="color:#94a3b8; margin-top:.5rem;">// Section 7 — Term & Termination</div>
              <div style="color:#e2e8f0;">  7.1 This Agreement shall be valid for a period of twelve (12) months</div>
              <div style="color:#e2e8f0;">  commencing from the Effective Date.</div>
              <div style="background:#14532d;color:#86efac;padding:2px 4px;">+ 7.4 Either party may terminate with 30 days written notice.</div>
              <div style="background:#14532d;color:#86efac;padding:2px 4px;">+ 7.5 Termination fee of 2 months retainer applies within first 6 months.</div>
            </div>
            <div style="display:flex;gap:.75rem;margin-top:1rem;">
              <button onclick="igToast('Diff PDF for CTR-001 v2.1→v3.0 generated','success')" style="background:var(--gold);color:#fff;border:none;padding:.45rem 1rem;font-size:.75rem;font-weight:600;cursor:pointer;"><i class="fas fa-file-pdf" style="margin-right:.35rem;"></i>Export Diff PDF</button>
              <button onclick="igToast('Reverting to v2.1 — confirmation required','warn')" style="background:none;border:1px solid #dc2626;padding:.45rem 1rem;font-size:.75rem;cursor:pointer;color:#dc2626;"><i class="fas fa-undo" style="margin-right:.35rem;"></i>Revert to v2.1</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ct-pane-6: AI Risk Scanner -->
  <div id="ct-pane-6" style="display:none;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;">
      <!-- Scanner Input -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">AI Clause Risk Scanner</h3></div>
        <div style="padding:1.25rem;">
          <div style="margin-bottom:1rem;">
            <label class="ig-label">Select Contract to Scan</label>
            <select class="ig-input" style="font-size:.82rem;margin-bottom:.75rem;">
              <option>CTR-001 — Advisory Retainer — Heritage Hotels</option>
              <option>CTR-003 — Mandate Agreement — Entertainment City</option>
              <option>CTR-005 — Lease — Registered Office</option>
            </select>
            <label class="ig-label">Or Paste Contract Text</label>
            <textarea class="ig-input" rows="6" placeholder="Paste contract clause text for AI analysis..." style="font-size:.78rem;"></textarea>
          </div>
          <div style="margin-bottom:1rem;">
            <div style="font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--ink-muted);margin-bottom:.5rem;">Scan For</div>
            <div style="display:flex;flex-wrap:wrap;gap:.4rem;">
              ${['Missing Clauses','Liability Caps','Unfair Terms','IP Assignment Issues','Indemnity Exposure','Governing Law Conflicts','Arbitration Gaps','Data Protection'].map(r=>`<label style="display:flex;align-items:center;gap:.3rem;font-size:.72rem;cursor:pointer;"><input type="checkbox" checked style="accent-color:var(--gold);"> ${r}</label>`).join('')}
            </div>
          </div>
          <button onclick="igRunRiskScan()" style="background:#7c3aed;color:#fff;border:none;padding:.6rem 1.5rem;font-size:.78rem;font-weight:600;cursor:pointer;width:100%;"><i class="fas fa-robot" style="margin-right:.4rem;"></i>Run AI Risk Scan</button>
        </div>
      </div>
      <!-- Scan Results -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Scan Results — CTR-001</h3></div>
        <div style="padding:1.25rem;">
          <div style="display:flex;align-items:center;gap:1rem;padding:1rem;background:linear-gradient(135deg,#fdf4ff,#f5f3ff);border:1px solid #e9d5ff;margin-bottom:1.25rem;">
            <div style="text-align:center;">
              <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2rem;color:#7c3aed;line-height:1;">72</div>
              <div style="font-size:.6rem;font-weight:700;color:#6d28d9;letter-spacing:.08em;text-transform:uppercase;">Risk Score</div>
            </div>
            <div>
              <div style="font-size:.85rem;font-weight:600;color:#6d28d9;">Medium Risk</div>
              <div style="font-size:.72rem;color:#7c3aed;">3 issues found · 1 high risk</div>
            </div>
          </div>
          ${[
            {risk:'High',   issue:'Unlimited Liability Exposure',    clause:'Section 9.2',   detail:'No cap on liability — recommend capping at 12 months\' fees',   icon:'fire'},
            {risk:'Medium', issue:'Missing Dispute Resolution',      clause:'Section 11',    detail:'No arbitration clause — defaults to court litigation',             icon:'balance-scale'},
            {risk:'Medium', issue:'IP Ownership Ambiguity',          clause:'Section 6.3',   detail:'Advisory deliverables ownership not clearly assigned to client',   icon:'question-circle'},
            {risk:'Low',    issue:'Notice Period Inconsistency',     clause:'Section 7.1',   detail:'30-day notice in clause 7.1 but 15-day in clause 7.4 — conflict', icon:'exclamation'},
          ].map(r=>`<div style="border-left:4px solid ${r.risk==='High'?'#dc2626':r.risk==='Medium'?'#d97706':'#16a34a'};padding:.75rem 1rem;background:${r.risk==='High'?'#fff5f5':r.risk==='Medium'?'#fffbeb':'#f0fdf4'};margin-bottom:.625rem;">
            <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.25rem;">
              <i class="fas fa-${r.icon}" style="color:${r.risk==='High'?'#dc2626':r.risk==='Medium'?'#d97706':'#16a34a'};font-size:.78rem;"></i>
              <span class="badge ${r.risk==='High'?'b-re':r.risk==='Medium'?'b-g':'b-gr'}" style="font-size:.6rem;">${r.risk}</span>
              <span style="font-size:.78rem;font-weight:600;color:var(--ink);">${r.issue}</span>
            </div>
            <div style="font-size:.68rem;color:#7c3aed;margin-bottom:.2rem;">${r.clause}</div>
            <div style="font-size:.7rem;color:var(--ink-muted);">${r.detail}</div>
            <button onclick="igToast('Suggested fix for ${r.issue} applied to draft','success')" style="background:none;border:1px solid ${r.risk==='High'?'#dc2626':r.risk==='Medium'?'#d97706':'#16a34a'};padding:.2rem .5rem;font-size:.62rem;cursor:pointer;color:${r.risk==='High'?'#dc2626':r.risk==='Medium'?'#d97706':'#16a34a'};margin-top:.35rem;">Apply Fix</button>
          </div>`).join('')}
          <button onclick="igToast('Risk scan report exported as PDF','success')" style="background:var(--gold);color:#fff;border:none;padding:.45rem 1rem;font-size:.75rem;font-weight:600;cursor:pointer;width:100%;margin-top:.5rem;"><i class="fas fa-file-pdf" style="margin-right:.4rem;"></i>Export Risk Report</button>
        </div>
      </div>
    </div>
  </div>

  <!-- E-Sign Modal -->
  <div id="esign-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:9999;align-items:center;justify-content:center;">
    <div style="background:#fff;width:480px;max-width:95vw;border-top:4px solid #7c3aed;">
      <div style="padding:1.25rem 1.5rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Send for E-Signature</div>
        <button onclick="document.getElementById('esign-modal').style.display='none'" style="background:none;border:none;font-size:1.2rem;cursor:pointer;color:var(--ink-muted);">✕</button>
      </div>
      <div style="padding:1.5rem;">
        <div id="esign-contract-name" style="background:#fdf4ff;border:1px solid #e9d5ff;padding:.875rem;margin-bottom:1.25rem;font-size:.85rem;font-weight:500;color:#6d28d9;"></div>
        <div style="display:flex;flex-direction:column;gap:.875rem;margin-bottom:1.25rem;">
          <div><label class="ig-label">Signatory Email</label><input type="email" id="esign-email" class="ig-input" placeholder="signatory@company.com" style="font-size:.82rem;"></div>
          <div><label class="ig-label">Signatory Name</label><input type="text" id="esign-name" class="ig-input" placeholder="Full Name" style="font-size:.82rem;"></div>
          <div><label class="ig-label">Message (optional)</label><textarea class="ig-input" rows="2" id="esign-msg" placeholder="Please sign this agreement at your earliest convenience..." style="font-size:.82rem;"></textarea></div>
          <div><label class="ig-label">Sign Deadline</label><input type="date" id="esign-deadline" class="ig-input" style="font-size:.82rem;"></div>
        </div>
        <button onclick="igSendSign()" style="background:#7c3aed;color:#fff;border:none;padding:.65rem 1.25rem;font-size:.82rem;font-weight:600;cursor:pointer;width:100%;"><i class="fas fa-paper-plane" style="margin-right:.4rem;"></i>Send for Signature</button>
        <div style="font-size:.68rem;color:var(--ink-muted);text-align:center;margin-top:.75rem;">Signed via DocuSign / Aadhaar eSign. Legally binding under IT Act 2000.</div>
      </div>
    </div>
  </div>

  <script>
  window.igCtTab = function(idx){
    for(var i=0;i<7;i++){
      var p=document.getElementById('ct-pane-'+i);
      var t=document.getElementById('ct-tab-'+i);
      if(p) p.style.display=i===idx?'block':'none';
      if(t){ t.style.color=i===idx?'var(--gold)':'var(--ink-muted)'; t.style.borderBottom=i===idx?'2px solid var(--gold)':'2px solid transparent'; }
    }
  };
  window.igRunRiskScan = function(){
    igToast('AI scanning contract...','info');
    setTimeout(function(){ igToast('Risk scan complete — 4 issues found (1 High, 2 Medium, 1 Low)','warn'); },1500);
  };
  var selectedClauses = [];
  window.igAddClause = function(name, idx){
    var btn=document.getElementById('clause-btn-'+idx);
    if(selectedClauses.includes(name)){
      selectedClauses=selectedClauses.filter(function(c){return c!==name;});
      btn.textContent='Add'; btn.style.color='var(--gold)'; btn.style.background='none';
    } else {
      selectedClauses.push(name);
      btn.textContent='✓'; btn.style.color='#fff'; btn.style.background='#16a34a'; btn.style.border='none';
    }
    var area=document.getElementById('ct-selected-clauses');
    if(selectedClauses.length===0){
      area.innerHTML='<span style="font-size:.72rem;color:var(--ink-muted);">Select clauses from the panel →</span>';
    } else {
      area.innerHTML=selectedClauses.map(function(c){return '<span style="background:#ede9fe;color:#6d28d9;font-size:.7rem;padding:.2rem .6rem;font-weight:600;">'+c+'</span>';}).join('');
    }
  };
  window.igCreateContract = function(){
    var title=document.getElementById('ct-title').value.trim();
    var party=document.getElementById('ct-party').value.trim();
    if(!title||!party){igToast('Enter contract title and party name','warn');return;}
    igToast('Contract draft "'+title+'" created with '+selectedClauses.length+' clauses','success');
    igCtTab(0);
    document.getElementById('ct-title').value='';
    document.getElementById('ct-party').value='';
    selectedClauses=[];
    document.getElementById('ct-selected-clauses').innerHTML='<span style="font-size:.72rem;color:var(--ink-muted);">Select clauses from the panel →</span>';
  };
  window.igSendForSign = function(id, name){
    document.getElementById('esign-contract-name').textContent='Contract: '+name+' ('+id+')';
    var d=new Date(); d.setDate(d.getDate()+7);
    document.getElementById('esign-deadline').value=d.toISOString().split('T')[0];
    var m=document.getElementById('esign-modal'); m.style.display='flex'; m.style.alignItems='center'; m.style.justifyContent='center';
  };
  window.igSendSign = function(){
    var email=document.getElementById('esign-email').value.trim();
    if(!email){igToast('Enter signatory email','warn');return;}
    document.getElementById('esign-modal').style.display='none';
    igToast('E-sign request sent to '+email+'. DocuSign workflow initiated.','success');
  };
  window.igAiClauseScan = function(){
    var out = document.getElementById('clause-scan-output');
    if(!out) return;
    out.innerHTML = '<div style="padding:1.5rem;text-align:center;"><i class="fas fa-circle-notch fa-spin" style="font-size:1.25rem;color:#7c3aed;"></i><div style="font-size:.78rem;color:var(--ink-muted);margin-top:.75rem;">AI scanning contract for risks, missing clauses, deviations…</div></div>';
    setTimeout(function(){
      out.innerHTML = '<div style="border-top:3px solid #7c3aed;padding:1.25rem;">'
        +'<div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.875rem;"><div style="width:28px;height:28px;background:#7c3aed;display:flex;align-items:center;justify-content:center;"><i class="fas fa-magic" style="color:#fff;font-size:.65rem;"></i></div><div style="font-size:.85rem;font-weight:700;color:var(--ink);">AI Clause Analysis Complete</div><span class="badge" style="background:#fef2f233;color:#dc2626;border:1px solid #dc262644;font-size:.6rem;">Risk: Medium (Score 68/100)</span></div>'
        +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:.875rem;">'
        +'<div><div style="font-size:.72rem;font-weight:700;color:#dc2626;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.5rem;"><i class="fas fa-times-circle" style="margin-right:.3rem;"></i>Missing Clauses</div>'
        +['Force Majeure','Limitation of Liability','Dispute Resolution — Arbitration'].map(m=>'<div style="background:#fef2f2;border:1px solid #fecaca;padding:.4rem .625rem;font-size:.75rem;margin-bottom:.3rem;"><i class="fas fa-exclamation" style="color:#dc2626;margin-right:.3rem;font-size:.6rem;"></i>'+m+'</div>').join('')
        +'</div>'
        +'<div><div style="font-size:.72rem;font-weight:700;color:#d97706;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.5rem;"><i class="fas fa-exclamation-triangle" style="margin-right:.3rem;"></i>Risky Clauses</div>'
        +'<div style="background:#fffbeb;border:1px solid #fde68a;padding:.5rem .625rem;font-size:.75rem;margin-bottom:.3rem;"><strong>Payment Terms:</strong> No late-payment interest specified</div>'
        +'<div style="background:#fef2f2;border:1px solid #fecaca;padding:.5rem .625rem;font-size:.75rem;"><strong>IP Ownership:</strong> Co-developed materials ownership ambiguous — HIGH risk</div>'
        +'</div></div>'
        +'<div style="margin-top:.875rem;background:#f0fdf4;border:1px solid #bbf7d0;padding:.75rem;font-size:.75rem;"><i class="fas fa-check-circle" style="color:#16a34a;margin-right:.4rem;"></i><strong>Compliant:</strong> Confidentiality, Governing Law (Delhi courts), Termination, Non-Solicitation, GST Applicability</div>'
        +'<div style="margin-top:.75rem;display:flex;gap:.5rem;"><button onclick="igToast(\'Risk report downloaded\',\'success\')" style="background:#7c3aed;color:#fff;border:none;padding:.4rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;">Download Report</button><button onclick="igToast(\'Missing clauses added to editor\',\'success\')" style="background:var(--gold);color:#fff;border:none;padding:.4rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;">Add Missing Clauses</button></div>'
        +'</div>';
      igToast('AI clause scan complete — 3 missing, 2 risky clauses detected','warn');
    }, 1800);
  };

  /* ── Contracts: load expiring contracts from API ── */
  igApi.get('/contracts/expiring').then(function(d){
    if(!d) return;
    var el=document.getElementById('contracts-expiring-30');
    if(el) el.textContent=d.within_30+' expiring in 30 days';
    var el2=document.getElementById('contracts-expiring-60');
    if(el2) el2.textContent=d.within_60+' expiring in 60 days';
    var tbody=document.getElementById('contracts-tbody');
    if(!tbody||!d.contracts) return;
    d.contracts.slice(0,5).forEach(function(c){
      var daysLeft=parseInt(c.days_remaining)||0;
      var col=daysLeft<=30?'#dc2626':daysLeft<=60?'#d97706':'#16a34a';
      tbody.innerHTML+='<tr>'
        +'<td style="font-size:.78rem;font-weight:600;">'+c.id+'</td>'
        +'<td style="font-size:.78rem;">'+c.name+'</td>'
        +'<td style="font-size:.75rem;">'+c.type+'</td>'
        +'<td style="font-size:.75rem;">'+c.expiry+'</td>'
        +'<td><span style="font-size:.68rem;font-weight:700;color:'+col+';">'+daysLeft+'d</span></td>'
        +'<td><button onclick="igToast(\'Renewal initiated for '+c.id+'\',\'success\')" style="background:none;border:1px solid var(--border);padding:.2rem .5rem;font-size:.65rem;cursor:pointer;color:var(--gold);">Renew</button></td>'
        +'</tr>';
    });
  });
  </script>`
  return c.html(layout('Contracts', adminShell('Contract Management', 'contracts', body), {noNav:true,noFooter:true}))
})

// ── INTEGRATIONS ──────────────────────────────────────────────────────────────
app.get('/integrations', (c) => {
  const integrations = [
    {name:'GST Portal',         desc:'Auto-filing GSTR-1, GSTR-3B',     status:'Connected',       icon:'percent',         color:'#16a34a', fields:[{l:'API Key',v:'GST_API_KEY_XXXX',t:'password'},{l:'GSTIN',v:'07XXXXXX000XXX',t:'text'},{l:'Username',v:'indiagully_gst',t:'text'}]},
    {name:'Vyapar Accounting',  desc:'Sync invoices, expenses, ledger',  status:'Connected',       icon:'book',            color:'#16a34a', fields:[{l:'API Token',v:'vyapar_tok_xxxxx',t:'password'},{l:'Company ID',v:'IG-2017-001',t:'text'}]},
    {name:'SMTP (Gmail)',        desc:'Outbound email notifications',     status:'Connected',       icon:'envelope',        color:'#16a34a', fields:[{l:'SMTP Host',v:'smtp.gmail.com',t:'text'},{l:'Port',v:'587',t:'number'},{l:'Username',v:'info@indiagully.com',t:'email'},{l:'Password',v:'••••••••',t:'password'}]},
    {name:'WhatsApp Business',  desc:'Client communication & alerts',    status:'Pending Setup',   icon:'comment-dots',    color:'#d97706', fields:[{l:'Phone Number ID',v:'',t:'text'},{l:'Access Token',v:'',t:'password'},{l:'Business Account ID',v:'',t:'text'}]},
    {name:'Cloudflare R2',      desc:'Document storage & CDN',           status:'Connected',       icon:'cloud',           color:'#16a34a', fields:[{l:'Account ID',v:'r2_acc_xxxxx',t:'text'},{l:'Access Key',v:'••••••••',t:'password'},{l:'Bucket Name',v:'india-gully-docs',t:'text'}]},
    {name:'DocuSign',           desc:'E-signature for contracts & NDAs', status:'Not Configured',  icon:'pen',             color:'#dc2626', fields:[{l:'Integration Key',v:'',t:'text'},{l:'RSA Key',v:'',t:'password'},{l:'Account ID',v:'',t:'text'}]},
    {name:'Zoho CRM',           desc:'Lead management & pipeline',       status:'Not Configured',  icon:'funnel-dollar',   color:'#dc2626', fields:[{l:'Client ID',v:'',t:'text'},{l:'Client Secret',v:'',t:'password'},{l:'Refresh Token',v:'',t:'password'}]},
    {name:'SendGrid',           desc:'Bulk email & campaigns',           status:'Not Configured',  icon:'paper-plane',     color:'#dc2626', fields:[{l:'API Key',v:'SG.xxxxxxxx',t:'password'},{l:'From Email',v:'noreply@indiagully.com',t:'email'}]},
    {name:'Tally Prime',        desc:'Accounting sync via XML',          status:'Pending Setup',   icon:'calculator',      color:'#d97706', fields:[{l:'Tally Server IP',v:'192.168.1.100',t:'text'},{l:'Port',v:'9000',t:'number'},{l:'Company Name',v:'India Gully',t:'text'}]},
  ]
  const body = `
  <!-- J2: Live Integration Health Panel -->
  <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;margin-bottom:1.25rem;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.875rem;">
      <div>
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">J2 — Live Integration Health</h3>
        <p style="font-size:.72rem;color:var(--ink-muted);margin-top:.1rem;">Real-time status of all Cloudflare secrets and external service bindings</p>
      </div>
      <button onclick="igLoadIntegrationHealth()" style="background:none;border:1px solid var(--border);padding:.35rem .75rem;font-size:.72rem;cursor:pointer;color:var(--gold);display:inline-flex;align-items:center;gap:.35rem;"><i class="fas fa-sync-alt" style="font-size:.6rem;"></i>Refresh</button>
    </div>
    <div id="j2-health-panel" style="display:grid;grid-template-columns:repeat(2,1fr);gap:.25rem .75rem;"></div>
    <div style="margin-top:.875rem;padding:.625rem;background:#f8fafc;border:1px solid var(--border);font-size:.7rem;color:var(--ink-muted);">
      <strong>To set secrets:</strong> <code>npx wrangler pages secret put RAZORPAY_WEBHOOK_SECRET --project-name india-gully</code>
      <span style="margin-left:.5rem;color:var(--gold);">Razorpay · SendGrid · Twilio · DocuSign · JWT_SECRET · TOTP_ENCRYPT_KEY</span>
    </div>
  </div>

  <!-- J2: Razorpay Webhook Log -->
  <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;margin-bottom:1.25rem;">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.875rem;">
      <div>
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Razorpay Webhook Events</h3>
        <p style="font-size:.72rem;color:var(--ink-muted);margin-top:.1rem;">HMAC-SHA256 verified — stored in D1 ig_razorpay_webhooks</p>
      </div>
      <button onclick="igLoadWebhooks()" style="background:none;border:1px solid var(--border);padding:.35rem .75rem;font-size:.72rem;cursor:pointer;color:var(--gold);display:inline-flex;align-items:center;gap:.35rem;"><i class="fas fa-sync-alt" style="font-size:.6rem;"></i>Load Events</button>
    </div>
    <div id="j2-webhook-log" style="font-size:.78rem;color:var(--ink-muted);">Click Load Events to fetch recent webhook log from D1.</div>
  </div>

  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;">
    ${integrations.map((itg,i)=>`
    <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
      <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.75rem;">
        <div style="width:40px;height:40px;background:${itg.color};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <i class="fas fa-${itg.icon}" style="color:#fff;font-size:.85rem;"></i>
        </div>
        <div>
          <div style="font-weight:600;font-size:.875rem;color:var(--ink);">${itg.name}</div>
          <span class="badge ${itg.status==='Connected'?'b-gr':itg.status==='Pending Setup'?'b-g':'b-re'}">${itg.status}</span>
        </div>
      </div>
      <p style="font-size:.78rem;color:var(--ink-muted);line-height:1.5;margin-bottom:.75rem;">${itg.desc}</p>
      <button onclick="togglePanel('itg-cfg-${i}')" style="font-size:.72rem;color:var(--gold);background:none;border:1px solid var(--border);padding:.3rem .75rem;cursor:pointer;display:inline-flex;align-items:center;gap:.3rem;"><i class="fas fa-cog" style="font-size:.6rem;"></i>Configure</button>
      <div id="itg-cfg-${i}" class="ig-panel" style="margin-top:.875rem;">
        <h5 style="font-size:.75rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.75rem;">${itg.name} — Settings</h5>
        ${itg.fields.map(f=>`<div style="margin-bottom:.625rem;"><label class="ig-label">${f.l}</label><input type="${f.t}" class="ig-input" value="${f.v}" style="font-size:.82rem;" placeholder="${f.v||'Enter '+f.l}"></div>`).join('')}
        <div style="display:flex;gap:.5rem;margin-top:.625rem;">
          <button onclick="igToast('${itg.name} configuration saved','success');togglePanel('itg-cfg-${i}')" style="background:var(--gold);color:#fff;border:none;padding:.4rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;">Save</button>
          <button onclick="igToast('${itg.name} connection test: OK ✓','success')" style="background:#16a34a;color:#fff;border:none;padding:.4rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;">Test</button>
          <button onclick="togglePanel('itg-cfg-${i}')" style="background:none;border:1px solid var(--border);padding:.4rem .875rem;font-size:.72rem;cursor:pointer;color:var(--ink-muted);">Cancel</button>
        </div>
      </div>
    </div>`).join('')}
  </div>
<script>
/* ── J2: Live integration health panel ── */
window.igLoadIntegrationHealth = function(){
  var el = document.getElementById('j2-health-panel');
  if(!el) return;
  el.innerHTML = '<div style="font-size:.78rem;color:var(--ink-muted);padding:.5rem 0;"><i class="fas fa-circle-notch fa-spin" style="margin-right:.4rem;"></i>Checking live status…</div>';
  igApi.get('/integrations/health').then(function(d){
    if(!d){ el.innerHTML='<span style="font-size:.78rem;color:#dc2626;">Could not load — admin session required</span>'; return; }
    var checks = d.checks || {};
    var html = '';
    var keyMap = {sendgrid:'SendGrid Email', razorpay:'Razorpay Payments', twilio:'Twilio SMS', docusign:'DocuSign e-Sign', d1_database:'D1 Database', kv_session:'KV Session', kv_ratelimit:'KV Rate Limit', kv_audit:'KV Audit Log'};
    Object.keys(checks).forEach(function(k){
      var v = checks[k];
      var ok = v.configured;
      html += '<div style="display:flex;align-items:center;gap:.625rem;padding:.4rem 0;border-bottom:1px solid var(--border);">';
      html += '<div style="width:8px;height:8px;border-radius:50%;background:'+(ok?'#16a34a':'#dc2626')+';flex-shrink:0;"></div>';
      html += '<div style="font-size:.78rem;font-weight:600;color:var(--ink);flex:1;">'+(keyMap[k]||k)+'</div>';
      html += '<span class="badge '+(ok?'b-gr':'b-re')+'" style="font-size:.6rem;">'+(ok?'Configured':'Needs Setup')+'</span>';
      html += '</div>';
    });
    if(d.j_round_secrets_needed && d.j_round_secrets_needed.length){
      html += '<div style="margin-top:.75rem;padding:.625rem;background:#fff3cd;border:1px solid #f0ad4e;font-size:.72rem;color:#856404;">';
      html += '<strong>Secrets needed:</strong> '+d.j_round_secrets_needed.join(', ')+'<br>';
      html += '<code style="font-size:.65rem;">npx wrangler pages secret put &lt;NAME&gt; --project-name india-gully</code>';
      html += '</div>';
    } else {
      html += '<div style="margin-top:.625rem;padding:.5rem;background:#dcfce7;border:1px solid #86efac;font-size:.72rem;color:#166534;font-weight:600;"><i class="fas fa-check-circle" style="margin-right:.35rem;"></i>All J2 integration secrets configured</div>';
    }
    el.innerHTML = html;
  }).catch(function(){ el.innerHTML='<span style="font-size:.78rem;color:#dc2626;">Admin session required to view integration health</span>'; });
};
/* ── Integrations: test connections against live API endpoints ── */
window.igTestIntegration = function(name, endpoint){
  igToast('Testing '+name+' connection…','info');
  igApi.get(endpoint||'/health').then(function(d){
    if(d) igToast(name+' — Connection OK ✓','success');
    else  igToast(name+' — Connection failed','error');
  });
};
/* ── Architecture microservices status ── */
igApi.get('/architecture/microservices').then(function(d){
  if(!d) return;
  var el=document.getElementById('ms-status');
  if(el && d.services) el.textContent=d.services.filter(function(s){return s.status==='Active';}).length+'/'+d.services.length+' services online';
});
/* Load health on page mount */
igLoadIntegrationHealth();

/* ── J2: Load Razorpay webhook log ── */
window.igLoadWebhooks = function(){
  var el = document.getElementById('j2-webhook-log');
  if(!el) return;
  el.innerHTML = '<i class="fas fa-circle-notch fa-spin" style="margin-right:.4rem;"></i>Loading…';
  igApi.get('/payments/webhooks').then(function(d){
    if(!d){ el.innerHTML='<span style="color:#dc2626;">Admin session required</span>'; return; }
    if(!d.webhooks || !d.webhooks.length){
      el.innerHTML='<div style="color:var(--ink-muted);padding:.75rem 0;">No webhook events recorded yet. '+(d.note||'')+'</div>'; return;
    }
    var html='<table style="width:100%;border-collapse:collapse;font-size:.75rem;">';
    html+='<thead><tr style="border-bottom:2px solid var(--border);">';
    ['Event','Order ID','Payment ID','Sig OK','Processed','Time'].forEach(function(h){html+='<th style="text-align:left;padding:.35rem .5rem;font-size:.68rem;font-weight:700;color:var(--ink-muted);">'+h+'</th>';});
    html+='</tr></thead><tbody>';
    d.webhooks.forEach(function(w){
      html+='<tr style="border-bottom:1px solid var(--border);">';
      html+='<td style="padding:.35rem .5rem;font-weight:600;color:var(--ink);">'+w.event+'</td>';
      html+='<td style="padding:.35rem .5rem;color:var(--ink-muted);">'+(w.order_id||'—')+'</td>';
      html+='<td style="padding:.35rem .5rem;color:var(--ink-muted);">'+(w.payment_id||'—')+'</td>';
      html+='<td style="padding:.35rem .5rem;"><span class="badge '+(w.signature_valid?'b-gr':'b-re')+'" style="font-size:.6rem;">'+(w.signature_valid?'✓':'✗')+'</span></td>';
      html+='<td style="padding:.35rem .5rem;"><span class="badge '+(w.processed?'b-gr':'b-g')+'" style="font-size:.6rem;">'+(w.processed?'Yes':'Pending')+'</span></td>';
      html+='<td style="padding:.35rem .5rem;color:var(--ink-muted);">'+(w.created_at||'')+'</td>';
      html+='</tr>';
    });
    html+='</tbody></table>';
    el.innerHTML=html;
  }).catch(function(){ el.innerHTML='<span style="color:#dc2626;">Failed to load — session required</span>'; });
};
</script>`
  return c.html(layout('Integrations', adminShell('Integrations & API Keys', 'integrations', body), {noNav:true,noFooter:true}))
})

// ── BI & REPORTS (Phase 6 — interactive dashboards + Chart.js) ────────────────
app.get('/reports', (c) => {
  const reports = [
    {name:'P&L Statement',          desc:'Monthly, quarterly & annual profit & loss',         icon:'chart-line',      color:'#16a34a', filters:['Month','Quarter','Financial Year']},
    {name:'Balance Sheet',          desc:'Assets, liabilities & shareholders\' equity',        icon:'balance-scale',   color:'#2563eb', filters:['As of Date']},
    {name:'Cash Flow Statement',    desc:'Operating, investing & financing activities',        icon:'money-bill-wave', color:'#0d9488', filters:['Month','Quarter','Financial Year']},
    {name:'GST Filing Report',      desc:'GSTR-1, GSTR-3B monthly summary',                   icon:'percent',         color:'#d97706', filters:['Month','Year']},
    {name:'HR Analytics',           desc:'Headcount, attrition, leave & attendance trends',   icon:'users',           color:'#7c3aed', filters:['Month','Quarter']},
    {name:'Pipeline Report',        desc:'Active mandates, pipeline value, deal stages',       icon:'funnel-dollar',   color:'#B8960C', filters:['Sector','Status','Date Range']},
    {name:'Client Revenue Report',  desc:'Client-wise revenue, fees & outstanding',            icon:'user-tie',        color:'#4f46e5', filters:['Client','Month','Quarter']},
    {name:'Compliance Calendar',    desc:'All regulatory & statutory filing deadlines',        icon:'calendar-check',  color:'#dc2626', filters:['Month','Quarter','Year']},
    {name:'Audit Trail Report',     desc:'Full user activity, logins & system access logs',   icon:'shield-alt',      color:'#9f1239', filters:['Date Range','User','Module']},
  ]
  const body = `
  <!-- BI Dashboard KPIs -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">
    ${[
      {label:'Revenue YTD',   value:'₹89.5L',  trend:'↑ 8.3%',  c:'#16a34a'},
      {label:'Pipeline Value',value:'₹8,815 Cr',trend:'3 active',c:'#B8960C'},
      {label:'Expenses YTD',  value:'₹56.2L',  trend:'↓ 2.1%',  c:'#2563eb'},
      {label:'Net Profit YTD',value:'₹33.3L',  trend:'37.1%',   c:'#7c3aed'},
    ].map(s=>`<div class="am"><div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.5rem;">${s.label}</div><div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:var(--ink);line-height:1;margin-bottom:.25rem;">${s.value}</div><div style="font-size:.72rem;color:${s.c};">${s.trend}</div></div>`).join('')}
  </div>

  <!-- Interactive Charts Section -->
  <div style="display:grid;grid-template-columns:3fr 2fr;gap:1.5rem;margin-bottom:1.5rem;">
    <!-- Revenue Chart -->
    <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Revenue vs Expenses — Last 6 Months</h3>
        <div style="display:flex;gap:.4rem;">
          ${['Bar','Line','Area'].map(t=>`<button onclick="igUpdateChart('${t.toLowerCase()}')" style="background:var(--parch-dk);border:1px solid var(--border);padding:.2rem .5rem;font-size:.65rem;cursor:pointer;color:var(--ink);">${t}</button>`).join('')}
        </div>
      </div>
      <canvas id="revenue-chart" height="110"></canvas>
    </div>
    <!-- Expense Pie -->
    <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
      <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);margin-bottom:1rem;">Expense Breakdown MTD</h3>
      <canvas id="expense-chart" height="160"></canvas>
      <div id="expense-legend" style="margin-top:.75rem;display:flex;flex-wrap:wrap;gap:.4rem;"></div>
    </div>
  </div>

  <!-- Pipeline & Sector Charts -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1.5rem;">
    <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Pipeline by Sector (₹ Cr)</h3>
        <span style="font-size:.72rem;color:var(--gold);font-weight:600;">Total ₹8,815 Cr</span>
      </div>
      <canvas id="pipeline-chart" height="140"></canvas>
    </div>
    <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
      <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);margin-bottom:1rem;">Monthly Revenue Trend — FY 2024-25</h3>
      <canvas id="trend-chart" height="140"></canvas>
    </div>
  </div>

  <!-- Self-Service Analytics -->
  <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;padding:1.25rem;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
      <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Self-Service Analytics Builder</h3>
      <button onclick="igToast('Analytics query executed — results shown below','success')" style="background:var(--gold);color:#fff;border:none;padding:.4rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;"><i class="fas fa-play" style="margin-right:.3rem;"></i>Run Query</button>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:.875rem;margin-bottom:.875rem;">
      <div><label class="ig-label">Dimension</label><select class="ig-input" style="font-size:.82rem;"><option>Month</option><option>Client</option><option>Service Type</option><option>Sector</option><option>Employee</option></select></div>
      <div><label class="ig-label">Metric</label><select class="ig-input" style="font-size:.82rem;"><option>Revenue</option><option>Expenses</option><option>Net Profit</option><option>Pipeline Value</option><option>Headcount</option></select></div>
      <div><label class="ig-label">Filter (optional)</label><select class="ig-input" style="font-size:.82rem;"><option>All</option><option>This Quarter</option><option>This FY</option><option>Last 6 Months</option></select></div>
      <div><label class="ig-label">Chart Type</label><select class="ig-input" style="font-size:.82rem;"><option>Bar Chart</option><option>Line Chart</option><option>Pie Chart</option><option>Table</option></select></div>
    </div>
    <div style="background:var(--parch-dk);border:1px solid var(--border);padding:1.25rem;min-height:80px;display:flex;align-items:center;justify-content:center;">
      <span style="font-size:.78rem;color:var(--ink-muted);">Run a query above to see the result chart here</span>
    </div>
  </div>

  <!-- Predictive Analytics -->
  <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
    <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
      <div>
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Predictive Analytics — Revenue Forecast</h3>
        <p style="font-size:.72rem;color:var(--ink-muted);margin-top:.2rem;">Trend-based 8-month forecast with 90% confidence interval · Model: linear regression + seasonality</p>
      </div>
      <div style="display:flex;gap:.5rem;">
        <select class="ig-input" style="font-size:.78rem;max-width:140px;" onchange="igToast('Forecast model updated','info')"><option>Linear Regression</option><option>Moving Average</option><option>Exponential Smoothing</option></select>
        <button onclick="igToast('Forecast report exported','success')" style="background:none;border:1px solid var(--border);padding:.3rem .75rem;font-size:.68rem;cursor:pointer;color:var(--gold);"><i class="fas fa-download" style="margin-right:.3rem;"></i>Export</button>
      </div>
    </div>
    <div style="padding:1.25rem;">
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.25rem;">
        ${[
          {label:'FY26 Forecast',  value:'₹1.58 Cr/mo', sub:'Avg monthly target',      c:'#B8960C'},
          {label:'Growth CAGR',    value:'+28%',          sub:'vs FY25 actual',          c:'#16a34a'},
          {label:'Churn Risk',     value:'Low (12%)',     sub:'2 at-risk client accounts',c:'#d97706'},
          {label:'Model Accuracy', value:'87.3%',         sub:'Backtested on FY24-25',   c:'#2563eb'},
        ].map(s=>`<div style="background:var(--parch-dk);border:1px solid var(--border);padding:.875rem;">
          <div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.3rem;">${s.label}</div>
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.4rem;color:${s.c};">${s.value}</div>
          <div style="font-size:.68rem;color:${s.c};">${s.sub}</div>
        </div>`).join('')}
      </div>
      <canvas id="forecast-chart" height="100"></canvas>
      <div style="margin-top:1rem;display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
        <!-- Churn Risk Model -->
        <div style="background:var(--parch-dk);border:1px solid var(--border);padding:1rem;">
          <div style="font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--ink-muted);margin-bottom:.75rem;">Churn Risk Analysis</div>
          ${[
            {client:'Demo Client Corp',      score:82, risk:'Low',    trend:'stable',   c:'#16a34a'},
            {client:'Rajasthan Hotels Ltd',  score:61, risk:'Medium', trend:'declining',c:'#d97706'},
            {client:'Mumbai Mall Pvt. Ltd.', score:45, risk:'High',   trend:'declining',c:'#dc2626'},
            {client:'L5 Resort Group',       score:91, risk:'Low',    trend:'improving',c:'#16a34a'},
          ].map(c=>`<div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.5rem;">
            <div style="flex:1;font-size:.78rem;color:var(--ink);">${c.client}</div>
            <div style="width:80px;height:6px;background:#e5e7eb;border-radius:3px;overflow:hidden;"><div style="height:100%;background:${c.c};width:${c.score}%;"></div></div>
            <span class="badge ${c.risk==='Low'?'b-gr':c.risk==='Medium'?'b-g':'b-re'}" style="font-size:.6rem;width:50px;text-align:center;">${c.risk}</span>
          </div>`).join('')}
          <button onclick="igToast('Churn prevention campaign triggered for high-risk accounts','success')" style="margin-top:.75rem;background:var(--gold);color:#fff;border:none;padding:.4rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;width:100%;">Run Retention Campaign</button>
        </div>
        <!-- Sector Growth Prediction -->
        <div style="background:var(--parch-dk);border:1px solid var(--border);padding:1rem;">
          <div style="font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--ink-muted);margin-bottom:.75rem;">Sector Growth Prediction — FY 2025-26</div>
          ${[
            {sector:'HORECA',        curr:'₹210L', pred:'₹310L', growth:'+47%', c:'#16a34a'},
            {sector:'Real Estate',   curr:'₹620L', pred:'₹780L', growth:'+26%', c:'#16a34a'},
            {sector:'Hospitality',   curr:'₹520L', pred:'₹620L', growth:'+19%', c:'#B8960C'},
            {sector:'Entertainment', curr:'₹350L', pred:'₹390L', growth:'+11%', c:'#d97706'},
            {sector:'Retail',        curr:'₹150L', pred:'₹160L', growth:'+7%',  c:'#94a3b8'},
          ].map(s=>`<div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.4rem;font-size:.78rem;">
            <div style="width:90px;flex-shrink:0;color:var(--ink);">${s.sector}</div>
            <div style="font-size:.72rem;color:var(--ink-muted);width:60px;">${s.curr}</div>
            <i class="fas fa-arrow-right" style="font-size:.6rem;color:var(--ink-muted);"></i>
            <div style="font-size:.78rem;font-weight:600;">${s.pred}</div>
            <span style="font-size:.68rem;font-weight:700;color:${s.c};margin-left:auto;">${s.growth}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>

  <!-- Scheduled Reports -->
  <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
    <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
      <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Scheduled Reports</h3>
      <button onclick="igToast('New scheduled report added','success')" style="background:var(--gold);color:#fff;border:none;padding:.3rem .75rem;font-size:.68rem;font-weight:600;cursor:pointer;"><i class="fas fa-plus" style="margin-right:.3rem;"></i>Add Schedule</button>
    </div>
    <table class="ig-tbl"><thead><tr><th>Report Name</th><th>Frequency</th><th>Recipients</th><th>Format</th><th>Last Sent</th><th>Status</th><th>Action</th></tr></thead><tbody>
      ${[
        {name:'Monthly P&L',           freq:'1st of month', to:'superadmin, directors',  fmt:'PDF',  last:'01 Feb 2025', on:true},
        {name:'Weekly Pipeline',       freq:'Every Monday', to:'superadmin',             fmt:'Email',last:'24 Feb 2025', on:true},
        {name:'GST Filing Reminder',   freq:'8th of month', to:'finance@indiagully.com', fmt:'Email',last:'08 Feb 2025', on:true},
        {name:'HR Attendance Summary', freq:'Last day/month',to:'hr@indiagully.com',      fmt:'Excel',last:'28 Feb 2025', on:false},
      ].map(r=>`<tr>
        <td style="font-weight:500;font-size:.85rem;">${r.name}</td>
        <td style="font-size:.78rem;">${r.freq}</td>
        <td style="font-size:.75rem;color:var(--ink-muted);">${r.to}</td>
        <td><span class="badge b-dk" style="font-size:.62rem;">${r.fmt}</span></td>
        <td style="font-size:.75rem;color:var(--ink-muted);">${r.last}</td>
        <td><span class="badge ${r.on?'b-gr':'b-dk'}">${r.on?'Active':'Paused'}</span></td>
        <td style="display:flex;gap:.3rem;">
          <button onclick="igToast('${r.name} sent now','success')" style="background:none;border:1px solid var(--border);padding:.2rem .5rem;font-size:.65rem;cursor:pointer;color:var(--gold);">Send Now</button>
          <button onclick="igToast('${r.name} ${r.on?'paused':'resumed'}','warn')" style="background:none;border:1px solid var(--border);padding:.2rem .5rem;font-size:.65rem;cursor:pointer;color:var(--ink-muted);">${r.on?'Pause':'Resume'}</button>
        </td>
      </tr>`).join('')}
    </tbody></table>
  </div>

  <!-- Report Generator Cards -->
  <h4 style="font-size:.78rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:1rem;">On-Demand Reports</h4>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;">
    ${reports.map((r,i)=>`
    <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;transition:border-color .2s;" onmouseover="this.style.borderColor='${r.color}'" onmouseout="this.style.borderColor='var(--border)'">
      <div style="width:40px;height:40px;background:${r.color};display:flex;align-items:center;justify-content:center;margin-bottom:.875rem;">
        <i class="fas fa-${r.icon}" style="color:#fff;font-size:.85rem;"></i>
      </div>
      <div style="font-weight:600;font-size:.875rem;color:var(--ink);margin-bottom:.25rem;">${r.name}</div>
      <div style="font-size:.75rem;color:var(--ink-muted);line-height:1.5;margin-bottom:.875rem;">${r.desc}</div>
      <button onclick="togglePanel('rpt-${i}')" style="background:${r.color};color:#fff;border:none;padding:.4rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;letter-spacing:.06em;text-transform:uppercase;width:100%;">Generate Report</button>
      <div id="rpt-${i}" class="ig-panel" style="margin-top:.875rem;">
        <h5 style="font-size:.75rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.75rem;">${r.name} — Filters</h5>
        ${r.filters.map(f=>`<div style="margin-bottom:.625rem;"><label class="ig-label">${f}</label>${f.includes('Date')||f.includes('Month')&&!f.includes('Quarter')?`<input type="month" class="ig-input" style="font-size:.82rem;">`:`<select class="ig-input" style="font-size:.82rem;"><option>All</option>${f==='Quarter'?['Q1 FY2025','Q2 FY2025','Q3 FY2025','Q4 FY2025'].map(q=>`<option>${q}</option>`).join(''):f==='Financial Year'?['FY 2024-25','FY 2023-24'].map(y=>`<option>${y}</option>`).join(''):f==='Sector'?['All','Real Estate','Hospitality','Retail','Entertainment'].map(s=>`<option>${s}</option>`).join(''):f==='Status'?['All','Active','Negotiating','Closed'].map(s=>`<option>${s}</option>`).join(''):f==='Module'?['All','Auth','CMS','Finance','HR','Governance'].map(m=>`<option>${m}</option>`).join(''):f==='User'?['All','superadmin@indiagully.com','akm@indiagully.com','pavan@indiagully.com'].map(u=>`<option>${u}</option>`).join(''):f==='Client'?['All Clients','Demo Client Corp','Rajasthan Hotels','Mumbai Mall Pvt.'].map(cl=>`<option>${cl}</option>`).join(''):''}</select>`}</div>`).join('')}
        <div style="display:flex;gap:.5rem;margin-top:.625rem;">
          <button onclick="igToast('${r.name} generated! Downloading…','success');togglePanel('rpt-${i}')" style="background:${r.color};color:#fff;border:none;padding:.4rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:.3rem;"><i class="fas fa-download" style="font-size:.6rem;"></i>Download PDF</button>
          <button onclick="igToast('${r.name} exported to Excel','success')" style="background:#16a34a;color:#fff;border:none;padding:.4rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:.3rem;"><i class="fas fa-file-excel" style="font-size:.6rem;"></i>Excel</button>
          <button onclick="togglePanel('rpt-${i}')" style="background:none;border:1px solid var(--border);padding:.4rem .875rem;font-size:.72rem;cursor:pointer;color:var(--ink-muted);">Close</button>
        </div>
      </div>
    </div>`).join('')}
  </div>

  <script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.3/dist/chart.umd.min.js"><\/script>
  <script>
  // Revenue vs Expenses Chart
  var revCtx = document.getElementById('revenue-chart').getContext('2d');
  var revChart = new Chart(revCtx, {
    type: 'bar',
    data: {
      labels: ['Oct 24','Nov 24','Dec 24','Jan 25','Feb 25','Mar 25'],
      datasets: [
        { label:'Revenue',  data:[980000,1050000,900000,1080000,1240000,1050000], backgroundColor:'rgba(184,150,12,0.8)', borderColor:'#B8960C', borderWidth:1 },
        { label:'Expenses', data:[820000,780000,750000,770000,780000,760000],    backgroundColor:'rgba(37,99,235,0.8)',   borderColor:'#2563eb', borderWidth:1 },
        { label:'Profit',   data:[160000,270000,150000,310000,460000,290000],    backgroundColor:'rgba(22,163,74,0.8)',   borderColor:'#16a34a', borderWidth:1, type:'line', yAxisID:'y' }
      ]
    },
    options: { responsive:true, plugins:{ legend:{ labels:{ font:{size:10} }}}, scales:{ y:{ ticks:{ callback:v=>'₹'+(v/100000).toFixed(1)+'L', font:{size:9}} }, x:{ ticks:{font:{size:9}} } } }
  });
  window.igUpdateChart = function(type){
    revChart.config.type = type==='area'?'line':type;
    revChart.update();
    igToast('Chart updated to '+type,'success');
  };

  // Expense Pie
  var expCtx = document.getElementById('expense-chart').getContext('2d');
  var expData = { labels:['Payroll','Rent','Tech','Travel','Mktg','Other'], datasets:[{ data:[450000,85000,12500,28400,18000,14600], backgroundColor:['#1A3A6B','#2563eb','#16a34a','#d97706','#7c3aed','#9ca3af'], borderWidth:2, borderColor:'#fff' }] };
  new Chart(expCtx, { type:'doughnut', data:expData, options:{ responsive:true, cutout:'65%', plugins:{ legend:{display:false} } } });
  var el=document.getElementById('expense-legend');
  if(el){ expData.labels.forEach(function(l,i){ var d=document.createElement('span'); d.style='font-size:.65rem;display:flex;align-items:center;gap:.2rem;color:var(--ink);'; d.innerHTML='<span style="width:10px;height:10px;background:'+expData.datasets[0].backgroundColor[i]+';border-radius:50%;display:inline-block;"></span>'+l; el.appendChild(d); }); }

  // Pipeline Chart
  var pipCtx = document.getElementById('pipeline-chart').getContext('2d');
  new Chart(pipCtx, { type:'bar', data:{ labels:['Entertainment','Real Estate','Retail','Hospitality'], datasets:[{ data:[5700,1200,2100,45], backgroundColor:['#B8960C','#2563eb','#7c3aed','#16a34a'], borderRadius:3 }] }, options:{ responsive:true, plugins:{ legend:{display:false} }, scales:{ y:{ ticks:{ callback:v=>v>=100?v+'Cr':v+'L', font:{size:9} } }, x:{ ticks:{font:{size:9}} } } } });

  // Monthly Revenue Trend
  var trendCtx = document.getElementById('trend-chart').getContext('2d');
  new Chart(trendCtx, { type:'line', data:{ labels:['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar'], datasets:[{ label:'Revenue', data:[620000,680000,720000,790000,820000,880000,980000,1050000,900000,1080000,1240000,1050000], borderColor:'#B8960C', backgroundColor:'rgba(184,150,12,.1)', fill:true, tension:.4, pointRadius:3, pointBackgroundColor:'#B8960C' }] }, options:{ responsive:true, plugins:{ legend:{display:false} }, scales:{ y:{ ticks:{ callback:v=>'₹'+(v/100000).toFixed(1)+'L', font:{size:9} } }, x:{ ticks:{font:{size:9}} } } } });

  // Predictive Forecast Chart
  var fctCtx = document.getElementById('forecast-chart');
  if(fctCtx){ new Chart(fctCtx.getContext('2d'), { type:'line', data:{ labels:['Apr 25','May 25','Jun 25','Jul 25','Aug 25','Sep 25','Oct 25','Nov 25'], datasets:[
    { label:'Predicted Revenue', data:[1100000,1200000,1350000,1280000,1420000,1500000,1380000,1550000], borderColor:'#B8960C', backgroundColor:'rgba(184,150,12,.15)', fill:true, tension:.4, borderDash:[0,0], pointRadius:3, pointBackgroundColor:'#B8960C' },
    { label:'Lower Bound',       data:[950000,1040000,1160000,1090000,1210000,1290000,1170000,1310000], borderColor:'rgba(184,150,12,.3)', backgroundColor:'transparent', fill:false, tension:.4, borderDash:[4,4], pointRadius:0 },
    { label:'Upper Bound',       data:[1250000,1360000,1540000,1470000,1630000,1710000,1590000,1790000], borderColor:'rgba(184,150,12,.3)', backgroundColor:'rgba(184,150,12,.07)', fill:'-1', tension:.4, borderDash:[4,4], pointRadius:0 },
  ]}, options:{ responsive:true, plugins:{ legend:{ labels:{ font:{size:9} }}}, scales:{ y:{ ticks:{ callback:v=>'₹'+(v/100000).toFixed(1)+'L', font:{size:9}}}, x:{ ticks:{font:{size:9}}}}}}); }

  /* ── BI Reports: load live KPIs from API ── */
  igApi.get('/finance/summary').then(function(d){
    if(!d) return;
    function fmtRs(n){return n>=100000?'₹'+(n/100000).toFixed(1)+'L':'₹'+n.toLocaleString('en-IN');}
    var el=document.getElementById('rpt-revenue'); if(el) el.textContent=fmtRs(d.revenue.mtd);
    var el2=document.getElementById('rpt-profit'); if(el2) el2.textContent=d.profit.margin_pct+'%';
  });
  igApi.get('/kpi/summary').then(function(d){
    if(!d) return;
    var el=document.getElementById('rpt-health'); if(el) el.textContent=d.overall_health;
  });
  </script>`
  return c.html(layout('BI & Reports', adminShell('BI & Reports', 'reports', body), {noNav:true,noFooter:true}))
})

// ── SYSTEM CONFIG ─────────────────────────────────────────────────────────────
app.get('/config', (c) => {
  const body = `
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;">
    <!-- Platform Settings -->
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Platform Settings</h3></div>
      <div style="padding:1.25rem;display:flex;flex-direction:column;gap:1rem;">
        ${[
          {l:'Platform Name',      v:'India Gully Enterprise Platform',                     t:'text'},
          {l:'Company Legal Name', v:'Vivacious Entertainment & Hospitality Pvt. Ltd.',     t:'text'},
          {l:'CIN',                v:'U74900DL2017PTC000000',                               t:'text'},
          {l:'GSTIN',              v:'07XXXXXX000XXX',                                      t:'text'},
          {l:'Registered Address', v:'New Delhi, India',                                    t:'text'},
          {l:'Support Email',      v:'info@indiagully.com',                                 t:'email'},
          {l:'Support Phone',      v:'+91 8988 988 988',                                   t:'tel'},
          {l:'Platform Domain',    v:'india-gully.pages.dev',                              t:'text'},
        ].map(f=>`<div><label class="ig-label">${f.l}</label><input type="${f.t}" class="ig-input" value="${f.v}" style="font-size:.82rem;"></div>`).join('')}
        <button onclick="igToast('Platform settings saved successfully','success')" style="background:var(--gold);color:#fff;border:none;padding:.6rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;width:fit-content;">Save Settings</button>
      </div>
    </div>
    <!-- SMTP & Email -->
    <div style="display:flex;flex-direction:column;gap:1.5rem;">
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">SMTP & Email</h3></div>
        <div style="padding:1.25rem;display:flex;flex-direction:column;gap:.875rem;">
          ${[
            {l:'SMTP Host',    v:'smtp.gmail.com',       t:'text'},
            {l:'SMTP Port',    v:'587',                  t:'number'},
            {l:'Username',     v:'info@indiagully.com',  t:'email'},
            {l:'Password',     v:'••••••••',             t:'password'},
            {l:'From Name',    v:'India Gully',          t:'text'},
          ].map(f=>`<div><label class="ig-label">${f.l}</label><input type="${f.t}" class="ig-input" value="${f.v}" style="font-size:.82rem;"></div>`).join('')}
          <div style="display:flex;gap:.75rem;">
            <button onclick="igToast('SMTP settings saved','success')" style="background:var(--gold);color:#fff;border:none;padding:.5rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;">Save</button>
            <button onclick="igToast('Test email sent to superadmin@indiagully.com ✓','success')" style="background:var(--ink);color:#fff;border:none;padding:.5rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;">Send Test Email</button>
          </div>
        </div>
      </div>
      <!-- Security Settings -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Security Settings</h3></div>
        <div style="padding:1.25rem;display:flex;flex-direction:column;gap:.875rem;">
          ${[
            {l:'Session Timeout (minutes)', v:'60',   t:'number'},
            {l:'Max Login Attempts',        v:'5',    t:'number'},
            {l:'OTP Validity (seconds)',    v:'300',  t:'number'},
            {l:'Password Min Length',       v:'12',   t:'number'},
          ].map(f=>`<div><label class="ig-label">${f.l}</label><input type="${f.t}" class="ig-input" value="${f.v}" style="font-size:.82rem;"></div>`).join('')}
          <div style="display:flex;align-items:center;justify-content:space-between;padding:.6rem .875rem;background:var(--parch-dk);border:1px solid var(--border);">
            <span style="font-size:.82rem;color:var(--ink);">Force 2FA for All Users</span>
            <label style="position:relative;display:inline-block;width:44px;height:24px;">
              <input type="checkbox" checked style="opacity:0;width:0;height:0;">
              <span style="position:absolute;cursor:pointer;inset:0;background:#16a34a;border-radius:24px;display:flex;align-items:center;justify-content:flex-end;padding-right:3px;transition:.3s;"><span style="width:18px;height:18px;background:#fff;border-radius:50%;display:block;"></span></span>
            </label>
          </div>
          <button onclick="igToast('Security settings saved','success')" style="background:var(--ink);color:#fff;border:none;padding:.5rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;width:fit-content;">Save Security Settings</button>
        </div>
      </div>
    </div>
  </div>`
  return c.html(layout('System Config', adminShell('System Configuration', 'config', body), {noNav:true,noFooter:true}))
})

// ── SECURITY AUDIT (Phase 6 — TOTP, RBAC, rate-limiting, PAN masking) ─────────
app.get('/security', (c) => {
  const logs = [
    {ts:'2025-02-28 09:15:22', user:'superadmin@indiagully.com', action:'Login Success',              mod:'Auth',     ip:'103.21.x.x', ua:'Chrome/Win',  ok:true,  risk:'Low'},
    {ts:'2025-02-28 09:12:01', user:'akm@indiagully.com',        action:'Invoice Approved ₹3.2L',     mod:'Finance',  ip:'49.36.x.x',  ua:'Safari/Mac',  ok:true,  risk:'Low'},
    {ts:'2025-02-28 08:55:34', user:'pavan@indiagully.com',      action:'CMS Page Published — Home',  mod:'CMS',      ip:'49.36.x.x',  ua:'Chrome/Win',  ok:true,  risk:'Low'},
    {ts:'2025-02-27 22:14:53', user:'demo@indiagully.com',       action:'Client Portal Login',        mod:'Auth',     ip:'115.99.x.x', ua:'Chrome/And',  ok:true,  risk:'Low'},
    {ts:'2025-02-27 18:42:15', user:'Unknown',                   action:'Failed Login — 3 attempts',  mod:'Auth',     ip:'185.220.x.x',ua:'curl/7.68',   ok:false, risk:'High'},
    {ts:'2025-02-27 16:30:00', user:'akm@indiagully.com',        action:'Mandate Created — MND-004',  mod:'Listings', ip:'49.36.x.x',  ua:'Chrome/Win',  ok:true,  risk:'Low'},
    {ts:'2025-02-26 14:22:10', user:'pavan@indiagully.com',      action:'Contract Downloaded — NDA',  mod:'Contracts',ip:'49.36.x.x',  ua:'Safari/Mac',  ok:true,  risk:'Low'},
    {ts:'2025-02-26 11:05:44', user:'superadmin@indiagully.com', action:'User Role Changed — Emp001', mod:'Users',    ip:'103.21.x.x', ua:'Chrome/Win',  ok:true,  risk:'Med'},
    {ts:'2025-02-25 16:45:00', user:'Unknown',                   action:'Brute Force — 12 attempts',  mod:'Auth',     ip:'91.108.x.x', ua:'Python/3.11', ok:false, risk:'Critical'},
    {ts:'2025-02-25 09:30:00', user:'IG-EMP-0001',               action:'Attendance Check-In',        mod:'HR',       ip:'182.65.x.x', ua:'Firefox/Win', ok:true,  risk:'Low'},
  ]
  const rbacRoles = [
    {role:'Super Admin',    users:1, perms:['All Modules','All Portals','User Management','System Config','Security Audit'],  color:'#dc2626'},
    {role:'Director / KMP', users:2, perms:['Board Portal','Finance ERP (read)','Contracts (sign)','Governance'],             color:'#1E1E1E'},
    {role:'Finance Manager',users:1, perms:['Finance ERP (full)','Invoices','GST Filing','BI Reports'],                       color:'#2563eb'},
    {role:'HR Manager',     users:1, perms:['HR ERP (full)','Leave Approval','Payroll','Employee Directory'],                  color:'#7c3aed'},
    {role:'Employee',       users:3, perms:['Employee Portal','Attendance','Leave Request','Payslips'],                        color:'#16a34a'},
    {role:'Client',         users:2, perms:['Client Portal','Mandates (own)','Invoices (own)','Documents (own)'],              color:'#B8960C'},
  ]
  const body = `
  <!-- Security Score Banner -->
  <div style="background:linear-gradient(135deg,#1E1E1E,#2D1B1B);border:1px solid #7f1d1d;padding:1.25rem 1.75rem;margin-bottom:1.5rem;display:flex;align-items:center;justify-content:space-between;">
    <div style="display:flex;align-items:center;gap:1.25rem;">
      <div style="width:64px;height:64px;border-radius:50%;border:3px solid #d97706;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <span style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:#d97706;font-weight:700;">74</span>
      </div>
      <div>
        <div style="font-size:.62rem;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:.25rem;">Security Score</div>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:#fff;">Good — 3 issues need attention</div>
        <div style="font-size:.72rem;color:#d97706;margin-top:.2rem;"><i class="fas fa-exclamation-triangle" style="margin-right:.3rem;"></i>OTP is static · DocuSign unconfigured · 2FA not mandatory for clients</div>
      </div>
    </div>
    <button onclick="igToast('Running full security scan…','info')" style="background:#d97706;color:#fff;border:none;padding:.6rem 1.5rem;font-size:.78rem;font-weight:600;cursor:pointer;letter-spacing:.06em;text-transform:uppercase;"><i class="fas fa-search" style="margin-right:.4rem;"></i>Run Scan</button>
  </div>

  <!-- KPI Row -->
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:1rem;margin-bottom:1.5rem;">
    ${[
      {label:'Failed Logins (7d)', value:'5',   c:'#dc2626', icon:'times-circle'},
      {label:'Active Sessions',    value:'2',   c:'#16a34a', icon:'user-check'},
      {label:'IP Whitelist',       value:'5',   c:'#2563eb', icon:'shield-alt'},
      {label:'TOTP Enrolled',      value:'4/8', c:'#7c3aed', icon:'mobile-alt'},
      {label:'Blocked IPs (7d)',   value:'2',   c:'#d97706', icon:'ban'},
    ].map(s=>`<div class="am"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.4rem;"><span style="font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);">${s.label}</span><i class="fas fa-${s.icon}" style="color:${s.c};font-size:.72rem;"></i></div><div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:${s.c};">${s.value}</div></div>`).join('')}
  </div>

  <!-- Tab Nav -->
  <div style="display:flex;gap:0;margin-bottom:1.5rem;border-bottom:2px solid var(--border);overflow-x:auto;">
    ${['Audit Log','RBAC Matrix','TOTP / 2FA','Rate Limiting','IP Whitelist','Zero-Trust','SIEM & Monitoring','FIDO & MFA','Data Encryption','Incident Response'].map((t,i)=>`<button onclick="igSecTab(${i})" id="sec-tab-${i}" style="padding:.6rem 1.1rem;font-size:.78rem;font-weight:600;cursor:pointer;border:none;background:none;color:${i===0?'var(--gold)':'var(--ink-muted)'};border-bottom:${i===0?'2px solid var(--gold)':'2px solid transparent'};letter-spacing:.04em;text-transform:uppercase;margin-bottom:-2px;white-space:nowrap;">${t}</button>`).join('')}
  </div>

  <!-- Tab 0: Audit Log -->
  <div id="sec-pane-0">
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Immutable Audit Log</h3>
        <div style="display:flex;gap:.5rem;">
          <select class="ig-input" style="font-size:.75rem;max-width:140px;" onchange="igFilterAuditLog(this.value)">
            <option value="all">All Events</option><option value="fail">Failures Only</option><option value="auth">Auth Only</option><option value="high">High Risk</option>
          </select>
          <button onclick="igToast('Audit log exported to CSV — tamper-proof hash included','success')" style="background:none;border:1px solid var(--border);padding:.3rem .75rem;font-size:.68rem;cursor:pointer;color:var(--gold);"><i class="fas fa-download" style="margin-right:.3rem;"></i>Export CSV</button>
        </div>
      </div>
      <table class="ig-tbl" id="audit-log-table"><thead><tr><th>#</th><th>Timestamp</th><th>User</th><th>Action</th><th>Module</th><th>IP Address</th><th>Browser</th><th>Risk</th><th>Status</th></tr></thead><tbody>
        ${logs.map((r,i)=>`<tr data-ok="${r.ok}" data-mod="${r.mod.toLowerCase()}" data-risk="${r.risk}" ${!r.ok?'style="background:#fef2f2;"':r.risk==='Med'?'style="background:#fffbeb;"':''}>
          <td style="font-size:.68rem;color:var(--ink-muted);">${i+1}</td>
          <td style="font-size:.72rem;color:var(--ink-muted);white-space:nowrap;">${r.ts}</td>
          <td style="font-size:.75rem;font-weight:500;">${r.user}</td>
          <td style="font-size:.78rem;">${r.action}</td>
          <td><span class="badge b-dk">${r.mod}</span></td>
          <td style="font-size:.72rem;color:var(--ink-muted);font-family:monospace;">${r.ip}</td>
          <td style="font-size:.7rem;color:var(--ink-muted);">${r.ua}</td>
          <td><span class="badge ${r.risk==='Critical'?'b-re':r.risk==='High'?'b-re':r.risk==='Med'?'b-g':'b-gr'}" style="font-size:.62rem;">${r.risk}</span></td>
          <td><span class="badge ${r.ok?'b-gr':'b-re'}">${r.ok?'OK':'FAIL'}</span></td>
        </tr>`).join('')}
      </tbody></table>
    </div>
  </div>

  <!-- Tab 1: RBAC Matrix -->
  <div id="sec-pane-1" style="display:none;">
    <div style="background:#fff8f0;border:1px solid #fed7aa;padding:.875rem 1.25rem;margin-bottom:1.25rem;display:flex;gap:.625rem;">
      <i class="fas fa-info-circle" style="color:#d97706;margin-top:.1rem;flex-shrink:0;"></i>
      <p style="font-size:.78rem;color:#92400e;">Role-Based Access Control (RBAC) is enforced at the API layer. Changes take effect immediately. For Attribute-Based Control (ABAC) per record, contact your system administrator.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;">
      ${rbacRoles.map(r=>`
      <div style="background:#fff;border:1px solid var(--border);border-top:3px solid ${r.color};">
        <div style="padding:.875rem 1rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
          <div style="display:flex;align-items:center;gap:.5rem;">
            <div style="width:28px;height:28px;background:${r.color};display:flex;align-items:center;justify-content:center;"><i class="fas fa-user-shield" style="color:#fff;font-size:.6rem;"></i></div>
            <div>
              <div style="font-size:.85rem;font-weight:600;color:var(--ink);">${r.role}</div>
              <div style="font-size:.65rem;color:var(--ink-muted);">${r.users} user${r.users!==1?'s':''}</div>
            </div>
          </div>
          <button onclick="igToast('Editing ${r.role} permissions…','info')" style="background:none;border:1px solid var(--border);padding:.2rem .5rem;font-size:.65rem;cursor:pointer;color:var(--gold);"><i class="fas fa-edit"></i></button>
        </div>
        <div style="padding:.875rem 1rem;">
          ${r.perms.map(p=>`<div style="display:flex;align-items:center;gap:.4rem;padding:.2rem 0;font-size:.75rem;color:var(--ink);"><i class="fas fa-check" style="color:${r.color};font-size:.6rem;width:12px;flex-shrink:0;"></i>${p}</div>`).join('')}
        </div>
        <div style="padding:.625rem 1rem;border-top:1px solid var(--border);background:var(--parch-dk);">
          <button onclick="igToast('${r.role} role permissions saved','success')" style="background:${r.color};color:#fff;border:none;padding:.3rem .75rem;font-size:.68rem;font-weight:600;cursor:pointer;width:100%;">Save Permissions</button>
        </div>
      </div>`).join('')}
    </div>
  </div>

  <!-- Tab 2: TOTP / 2FA -->
  <div id="sec-pane-2" style="display:none;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;">
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">2FA / TOTP Settings</h3></div>
        <div style="padding:1.25rem;display:flex;flex-direction:column;gap:1rem;">
          ${[
            {l:'Enforce TOTP for Super Admin',  checked:true,  desc:'Required at every login'},
            {l:'Enforce TOTP for Directors',    checked:true,  desc:'Board & KMP portal'},
            {l:'Enforce TOTP for Employees',    checked:false, desc:'HR portal access'},
            {l:'Enforce TOTP for Clients',      checked:false, desc:'Client portal access'},
            {l:'Allow SMS OTP as fallback',     checked:true,  desc:'When TOTP app unavailable'},
            {l:'Block login if TOTP not set up',checked:false, desc:'Force enrollment on first login'},
          ].map(s=>`<div style="display:flex;align-items:center;justify-content:space-between;padding:.6rem .875rem;background:var(--parch-dk);border:1px solid var(--border);">
            <div>
              <div style="font-size:.82rem;color:var(--ink);font-weight:500;">${s.l}</div>
              <div style="font-size:.68rem;color:var(--ink-muted);margin-top:.1rem;">${s.desc}</div>
            </div>
            <label style="position:relative;display:inline-block;width:44px;height:24px;flex-shrink:0;">
              <input type="checkbox" ${s.checked?'checked':''} style="opacity:0;width:0;height:0;">
              <span onclick="this.parentElement.querySelector('input').checked=!this.parentElement.querySelector('input').checked;this.style.background=this.parentElement.querySelector('input').checked?'#16a34a':'#94a3b8'" style="position:absolute;cursor:pointer;inset:0;background:${s.checked?'#16a34a':'#94a3b8'};border-radius:24px;display:flex;align-items:center;${s.checked?'justify-content:flex-end;padding-right:3px':'justify-content:flex-start;padding-left:3px'};transition:.3s;"><span style="width:18px;height:18px;background:#fff;border-radius:50%;display:block;"></span></span>
            </label>
          </div>`).join('')}
          <div style="background:#f0fdf4;border:1px solid #86efac;padding:.875rem;font-size:.78rem;color:#15803d;">
            <i class="fas fa-lock" style="margin-right:.4rem;"></i> TOTP codes are generated using Google Authenticator / Authy. QR codes are shown once on first setup.
          </div>
          <button onclick="igToast('2FA settings saved — changes apply on next login','success')" style="background:var(--ink);color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;width:fit-content;"><i class="fas fa-save" style="margin-right:.4rem;"></i>Save 2FA Settings</button>
        </div>
      </div>
      <!-- User 2FA Status -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">User TOTP Enrollment Status</h3></div>
        <table class="ig-tbl">
          <thead><tr><th>User</th><th>Portal</th><th>TOTP</th><th>Last Login</th><th>Action</th></tr></thead>
          <tbody>
            ${[
              {u:'superadmin@indiagully.com',p:'Admin',     totp:true,  last:'28 Feb 09:15'},
              {u:'akm@indiagully.com',        p:'Admin',     totp:true,  last:'28 Feb 09:12'},
              {u:'pavan@indiagully.com',       p:'Admin',     totp:true,  last:'28 Feb 08:55'},
              {u:'amit.j@indiagully.com',      p:'Employee',  totp:true,  last:'27 Feb 10:30'},
              {u:'demo@indiagully.com',         p:'Client',    totp:false, last:'27 Feb 22:14'},
              {u:'IG-KMP-0001',                p:'Board',     totp:false, last:'25 Feb 14:00'},
              {u:'IG-EMP-0001',                p:'Employee',  totp:false, last:'25 Feb 09:30'},
              {u:'IG-EMP-0002',                p:'Employee',  totp:false, last:'24 Feb 16:00'},
            ].map(u=>`<tr>
              <td style="font-size:.75rem;font-weight:500;">${u.u}</td>
              <td><span class="badge b-dk" style="font-size:.6rem;">${u.p}</span></td>
              <td><span class="badge ${u.totp?'b-gr':'b-re'}" style="font-size:.65rem;">${u.totp?'Enrolled':'Not Set'}</span></td>
              <td style="font-size:.72rem;color:var(--ink-muted);">${u.last}</td>
              <td><button onclick="igToast('TOTP setup email sent to ${u.u}','success')" style="background:none;border:1px solid var(--border);padding:.2rem .5rem;font-size:.65rem;cursor:pointer;color:var(--gold);">${u.totp?'Reset':'Enroll'}</button></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- Tab 3: Rate Limiting -->
  <div id="sec-pane-3" style="display:none;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;">
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Rate Limiting Rules</h3></div>
        <div style="padding:1.25rem;display:flex;flex-direction:column;gap:.875rem;">
          ${[
            {l:'Max login attempts (per IP)',      v:'5',    sub:'Before lockout (15 min)'},
            {l:'Lockout duration (minutes)',       v:'15',   sub:'After max attempts exceeded'},
            {l:'OTP validity window (seconds)',    v:'300',  sub:'Time-based OTP expiry'},
            {l:'Session timeout (minutes)',        v:'60',   sub:'Idle session expiry'},
            {l:'Max API requests / min (per IP)',  v:'100',  sub:'General API rate limit'},
            {l:'Max auth requests / min (per IP)', v:'10',   sub:'Login & OTP endpoints'},
            {l:'CAPTCHA after N failed attempts',  v:'3',    sub:'Trigger invisible CAPTCHA'},
          ].map(f=>`<div><label class="ig-label">${f.l} <span style="font-size:.68rem;color:var(--ink-faint);">(${f.sub})</span></label><input type="number" class="ig-input" value="${f.v}" style="font-size:.82rem;"></div>`).join('')}
          <div style="display:flex;align-items:center;justify-content:space-between;padding:.6rem .875rem;background:var(--parch-dk);border:1px solid var(--border);">
            <span style="font-size:.82rem;color:var(--ink);font-weight:500;">Auto-block brute force IPs</span>
            <label style="position:relative;display:inline-block;width:44px;height:24px;flex-shrink:0;"><input type="checkbox" checked style="opacity:0;width:0;height:0;"><span style="position:absolute;cursor:pointer;inset:0;background:#16a34a;border-radius:24px;display:flex;align-items:center;justify-content:flex-end;padding-right:3px;"><span style="width:18px;height:18px;background:#fff;border-radius:50%;display:block;"></span></span></label>
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;padding:.6rem .875rem;background:var(--parch-dk);border:1px solid var(--border);">
            <span style="font-size:.82rem;color:var(--ink);font-weight:500;">Alert on session from new location</span>
            <label style="position:relative;display:inline-block;width:44px;height:24px;flex-shrink:0;"><input type="checkbox" checked style="opacity:0;width:0;height:0;"><span style="position:absolute;cursor:pointer;inset:0;background:#16a34a;border-radius:24px;display:flex;align-items:center;justify-content:flex-end;padding-right:3px;"><span style="width:18px;height:18px;background:#fff;border-radius:50%;display:block;"></span></span></label>
          </div>
          <button onclick="igToast('Rate limiting rules saved','success')" style="background:var(--ink);color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;width:fit-content;"><i class="fas fa-save" style="margin-right:.4rem;"></i>Save Rules</button>
        </div>
      </div>
      <!-- PAN & Sensitive Data Masking -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Sensitive Data Masking</h3></div>
        <div style="padding:1.25rem;display:flex;flex-direction:column;gap:.875rem;">
          ${[
            {l:'PAN Number masking',          on:true,  ex:'ABCDE1234F → ABCDE••••F',   desc:'Mask middle digits in all views'},
            {l:'Bank account masking',        on:true,  ex:'1234567890 → ••••567890',     desc:'Show only last 4 digits'},
            {l:'Aadhaar masking',             on:true,  ex:'1234-5678-9012 → ••••-••••-9012',desc:'Mask first 8 digits'},
            {l:'Email masking (in logs)',     on:false, ex:'user@example.com → u***@e***.com',desc:'Partial mask in audit logs'},
            {l:'Phone masking (in reports)',  on:true,  ex:'+91 9810xxxxxx',               desc:'Mask 6 middle digits'},
            {l:'Salary masking (non-HR)',     on:true,  ex:'₹1,80,000 → ₹ ••,•••',        desc:'Hide CTC from non-HR roles'},
          ].map(m=>`<div style="display:flex;align-items:flex-start;justify-content:space-between;padding:.625rem .875rem;background:var(--parch-dk);border:1px solid var(--border);gap:1rem;">
            <div style="flex:1;">
              <div style="font-size:.82rem;color:var(--ink);font-weight:500;margin-bottom:.2rem;">${m.l}</div>
              <div style="font-size:.68rem;color:var(--ink-muted);">${m.desc}</div>
              <code style="font-size:.65rem;color:#7c3aed;background:#f5f3ff;padding:1px 4px;margin-top:.25rem;display:inline-block;">${m.ex}</code>
            </div>
            <label style="position:relative;display:inline-block;width:44px;height:24px;flex-shrink:0;margin-top:.2rem;"><input type="checkbox" ${m.on?'checked':''} style="opacity:0;width:0;height:0;"><span style="position:absolute;cursor:pointer;inset:0;background:${m.on?'#16a34a':'#94a3b8'};border-radius:24px;display:flex;align-items:center;${m.on?'justify-content:flex-end;padding-right:3px':'justify-content:flex-start;padding-left:3px'};"><span style="width:18px;height:18px;background:#fff;border-radius:50%;display:block;"></span></span></label>
          </div>`).join('')}
          <button onclick="igToast('Data masking settings saved — active on next page load','success')" style="background:#7c3aed;color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;width:fit-content;"><i class="fas fa-eye-slash" style="margin-right:.4rem;"></i>Save Masking Rules</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Tab 4: IP Whitelist -->
  <div id="sec-pane-4" style="display:none;">
    <div style="display:grid;grid-template-columns:2fr 1fr;gap:1.5rem;">
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">IP Whitelist & Block List</h3></div>
        <table class="ig-tbl"><thead><tr><th>IP Address</th><th>Label</th><th>Type</th><th>Added</th><th>Action</th></tr></thead><tbody>
          ${[
            {ip:'103.21.44.0/24', label:'Admin Office — New Delhi',   type:'Whitelist',  added:'01 Jan 2025'},
            {ip:'49.36.x.x',     label:'Directors — Static IP',       type:'Whitelist',  added:'01 Jan 2025'},
            {ip:'115.99.x.x',    label:'Client Portal — Mumbai',       type:'Whitelist',  added:'15 Feb 2025'},
            {ip:'182.65.x.x',    label:'Employee — Remote',            type:'Whitelist',  added:'01 Feb 2025'},
            {ip:'103.55.x.x',    label:'Remote VPN Endpoint',          type:'Whitelist',  added:'20 Jan 2025'},
            {ip:'185.220.x.x',   label:'Suspected Tor Exit Node',      type:'Blocked',    added:'27 Feb 2025'},
            {ip:'91.108.x.x',    label:'Brute Force — Auto-blocked',   type:'Blocked',    added:'25 Feb 2025'},
          ].map(r=>`<tr>
            <td style="font-size:.78rem;font-family:monospace;font-weight:500;">${r.ip}</td>
            <td style="font-size:.78rem;">${r.label}</td>
            <td><span class="badge ${r.type==='Whitelist'?'b-gr':'b-re'}">${r.type}</span></td>
            <td style="font-size:.72rem;color:var(--ink-muted);">${r.added}</td>
            <td><button onclick="igConfirm('Remove ${r.ip} from list?',function(){ igToast('${r.ip} removed','warn'); })" style="background:none;border:none;cursor:pointer;color:#dc2626;font-size:.68rem;"><i class="fas fa-trash"></i></button></td>
          </tr>`).join('')}
        </tbody></table>
        <div style="padding:.875rem 1.25rem;border-top:1px solid var(--border);">
          <div style="display:flex;gap:.75rem;">
            <input type="text" id="new-ip" class="ig-input" placeholder="IP or CIDR range (e.g. 103.21.0.0/16)" style="font-size:.82rem;flex:1;">
            <input type="text" id="new-ip-label" class="ig-input" placeholder="Label (e.g. Office)" style="font-size:.82rem;flex:1;">
            <select id="new-ip-type" class="ig-input" style="font-size:.82rem;max-width:120px;"><option>Whitelist</option><option>Blocked</option></select>
            <button onclick="igToast('IP added — '+document.getElementById('new-ip').value,'success');document.getElementById('new-ip').value='';document.getElementById('new-ip-label').value=''" style="background:var(--gold);color:#fff;border:none;padding:.4rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;white-space:nowrap;">Add IP</button>
          </div>
        </div>
      </div>
      <!-- Session Management -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Active Sessions</h3></div>
        <div style="padding:.875rem;">
          ${[
            {u:'superadmin@indiagully.com', started:'28 Feb 09:15', ip:'103.21.x.x', ua:'Chrome 121 / Win 11', active:true},
            {u:'akm@indiagully.com',        started:'28 Feb 09:12', ip:'49.36.x.x',  ua:'Safari 17 / macOS',   active:true},
          ].map(s=>`<div style="padding:.75rem;border:1px solid ${s.active?'#86efac':'var(--border)'};margin-bottom:.5rem;background:${s.active?'#f0fdf4':'#fafaf8'};">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.4rem;">
              <span style="font-size:.78rem;font-weight:600;color:var(--ink);">${s.u}</span>
              <span class="badge b-gr" style="font-size:.6rem;">Active</span>
            </div>
            <div style="font-size:.68rem;color:var(--ink-muted);">IP: ${s.ip} · ${s.ua}</div>
            <div style="font-size:.68rem;color:var(--ink-muted);">Started: ${s.started}</div>
            <button onclick="igConfirm('Force-terminate session for ${s.u}?',function(){igToast('Session terminated','warn')})" style="margin-top:.5rem;background:#dc2626;color:#fff;border:none;padding:.2rem .625rem;font-size:.65rem;cursor:pointer;">Terminate</button>
          </div>`).join('')}
          <button onclick="igConfirm('Terminate ALL active sessions? All users will be logged out.',function(){igToast('All sessions terminated','warn')})" style="background:var(--ink);color:#fff;border:none;padding:.5rem 1rem;font-size:.75rem;font-weight:600;cursor:pointer;width:100%;margin-top:.5rem;"><i class="fas fa-power-off" style="margin-right:.4rem;"></i>Terminate All Sessions</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Tab 5: Zero-Trust -->
  <div id="sec-pane-5" style="display:none;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1.5rem;">
      <!-- Zero-Trust Policy Engine -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Zero-Trust Policy Engine</h3>
          <span class="badge b-gr" style="font-size:.6rem;">Active</span>
        </div>
        <div style="padding:1.25rem;display:flex;flex-direction:column;gap:.875rem;">
          ${[
            {label:'Re-authenticate for sensitive actions',  on:true,  desc:'Prompt password+TOTP before Finance approvals, contract signing, user management'},
            {label:'Device fingerprint verification',        on:true,  desc:'Block unrecognised devices; require admin approval for new device login'},
            {label:'Geo-anomaly detection',                  on:true,  desc:'Alert when login from new city/country — force re-auth or block'},
            {label:'Continuous session risk scoring',        on:false, desc:'Score each session every 15 min; auto-terminate if risk >80'},
            {label:'Least-privilege enforcement',            on:true,  desc:'API routes validate role+action ABAC at gateway — deny-by-default'},
            {label:'Mutual TLS for admin API calls',         on:false, desc:'Require client certificates for /admin/* API endpoints'},
          ].map(p=>`<div style="display:flex;align-items:flex-start;justify-content:space-between;padding:.625rem .875rem;background:var(--parch-dk);border:1px solid var(--border);gap:1rem;">
            <div style="flex:1;">
              <div style="font-size:.82rem;color:var(--ink);font-weight:500;margin-bottom:.2rem;">${p.label}</div>
              <div style="font-size:.68rem;color:var(--ink-muted);">${p.desc}</div>
            </div>
            <label style="position:relative;display:inline-block;width:44px;height:24px;flex-shrink:0;margin-top:.2rem;"><input type="checkbox" ${p.on?'checked':''} style="opacity:0;width:0;height:0;"><span style="position:absolute;cursor:pointer;inset:0;background:${p.on?'#16a34a':'#94a3b8'};border-radius:24px;display:flex;align-items:center;${p.on?'justify-content:flex-end;padding-right:3px':'justify-content:flex-start;padding-left:3px'};"><span style="width:18px;height:18px;background:#fff;border-radius:50%;display:block;"></span></span></label>
          </div>`).join('')}
          <button onclick="igToast('Zero-Trust policy saved — active on next session','success')" style="background:#1E1E1E;color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;width:fit-content;"><i class="fas fa-shield-alt" style="margin-right:.4rem;"></i>Save Policy</button>
        </div>
      </div>
      <!-- Device Trust Registry -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Device Trust Registry</h3></div>
        <div style="padding:.875rem;">
          ${[
            {user:'superadmin@indiagully.com',device:'Chrome 121 / Win 11',fp:'d4f8a2...',added:'01 Feb 2025',trusted:true},
            {user:'akm@indiagully.com',       device:'Safari 17 / macOS',  fp:'7c3b91...',added:'15 Jan 2025',trusted:true},
            {user:'pavan@indiagully.com',     device:'Chrome 120 / Win 11',fp:'9e1d44...',added:'10 Jan 2025',trusted:true},
            {user:'demo@indiagully.com',      device:'Chrome / Android 14', fp:'2f7c38...',added:'27 Feb 2025',trusted:true},
            {user:'Unknown',                   device:'curl/7.68 / Linux',   fp:'a1b2c3...',added:'27 Feb 2025',trusted:false},
          ].map(d=>`<div style="padding:.625rem .875rem;border:1px solid ${d.trusted?'var(--border)':'#fecaca'};margin-bottom:.4rem;background:${d.trusted?'#fff':'#fff5f5'};">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.2rem;">
              <span style="font-size:.75rem;font-weight:600;color:var(--ink);">${d.user}</span>
              <span class="badge ${d.trusted?'b-gr':'b-re'}" style="font-size:.58rem;">${d.trusted?'Trusted':'Blocked'}</span>
            </div>
            <div style="font-size:.68rem;color:var(--ink-muted);">${d.device} · FP: <code style="font-size:.63rem;">${d.fp}</code></div>
            <div style="font-size:.65rem;color:var(--ink-faint);">Registered: ${d.added}</div>
            <div style="display:flex;gap:.4rem;margin-top:.4rem;">
              <button onclick="igToast('Device ${d.fp} ${d.trusted?'revoked':'approved'}','${d.trusted?'warn':'success'}')" style="background:none;border:1px solid ${d.trusted?'#dc2626':'#16a34a'};color:${d.trusted?'#dc2626':'#16a34a'};padding:.15rem .5rem;font-size:.62rem;cursor:pointer;">${d.trusted?'Revoke':'Approve'}</button>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>
    <!-- Re-auth Sensitive Actions Config -->
    <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Sensitive Actions — Re-authentication Required</h3></div>
      <div style="padding:1.25rem;">
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.75rem;margin-bottom:1rem;">
          ${[
            {action:'Approve Invoice >₹1L',  module:'Finance',    reauth:'Password + TOTP', status:'Enabled'},
            {action:'Sign Contract',          module:'Contracts',  reauth:'Password + TOTP', status:'Enabled'},
            {action:'Bulk User Changes',      module:'Admin',      reauth:'Password + TOTP', status:'Enabled'},
            {action:'Export Payroll Data',    module:'HR ERP',     reauth:'Password',        status:'Enabled'},
            {action:'Cast Board Vote',        module:'Governance', reauth:'Password + TOTP', status:'Enabled'},
            {action:'Delete Audit Logs',      module:'Security',   reauth:'Password + TOTP', status:'Disabled'},
            {action:'Change GST Credentials', module:'Finance',    reauth:'Password + TOTP', status:'Enabled'},
            {action:'IP Whitelist Changes',   module:'Security',   reauth:'Password + TOTP', status:'Enabled'},
            {action:'PAN/Aadhaar View',       module:'HR/Finance', reauth:'Password',        status:'Enabled'},
          ].map(a=>`<div style="padding:.75rem;border:1px solid var(--border);background:var(--parch-dk);">
            <div style="font-size:.78rem;font-weight:600;color:var(--ink);margin-bottom:.2rem;">${a.action}</div>
            <div style="font-size:.65rem;color:var(--ink-muted);">Module: ${a.module}</div>
            <div style="font-size:.65rem;color:#7c3aed;margin-top:.2rem;"><i class="fas fa-key" style="margin-right:.25rem;"></i>${a.reauth}</div>
            <span class="badge ${a.status==='Enabled'?'b-gr':'b-re'}" style="font-size:.58rem;margin-top:.3rem;display:inline-block;">${a.status}</span>
          </div>`).join('')}
        </div>
        <button onclick="igToast('Re-auth rules updated — applied immediately','success')" style="background:var(--gold);color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-lock" style="margin-right:.4rem;"></i>Save Re-auth Rules</button>
      </div>
    </div>
    <!-- CSP & Headers Config -->
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Content Security Policy & HTTP Headers</h3></div>
      <div style="padding:1.25rem;">
        <div style="background:#0f172a;border:1px solid #334155;padding:1.25rem;margin-bottom:1rem;overflow-x:auto;">
          <pre style="font-family:monospace;font-size:.7rem;color:#e2e8f0;margin:0;white-space:pre-wrap;line-height:1.7;">Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.tailwindcss.com https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net; font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net; img-src 'self' data: https:; connect-src 'self'; frame-ancestors 'none';
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=()
Strict-Transport-Security: max-age=31536000; includeSubDomains; preload</pre>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:.75rem;">
          ${[
            {h:'X-Frame-Options',         v:'DENY',    ok:true},
            {h:'X-Content-Type-Options',  v:'nosniff', ok:true},
            {h:'HSTS',                    v:'max-age=31536000',ok:true},
            {h:'CSP',                     v:'Configured',ok:true},
            {h:'Referrer-Policy',         v:'strict-origin',ok:true},
            {h:'Permissions-Policy',      v:'Configured',ok:true},
          ].map(h=>`<div style="padding:.625rem .875rem;border:1px solid ${h.ok?'#86efac':'#fca5a5'};background:${h.ok?'#f0fdf4':'#fff5f5'};display:flex;justify-content:space-between;align-items:center;">
            <div>
              <div style="font-size:.72rem;font-weight:600;color:var(--ink);">${h.h}</div>
              <code style="font-size:.62rem;color:#7c3aed;">${h.v}</code>
            </div>
            <i class="fas fa-${h.ok?'check-circle':'times-circle'}" style="color:${h.ok?'#16a34a':'#dc2626'};"></i>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>

  <!-- Tab 6: SIEM & Monitoring -->
  <div id="sec-pane-6" style="display:none;">
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.25rem;">
      ${[
        {label:'Critical Alerts',value:'1', color:'#dc2626',icon:'skull-crossbones'},
        {label:'High Alerts',   value:'2', color:'#d97706',icon:'exclamation-triangle'},
        {label:'Active Sessions',value:'3',color:'#2563eb',icon:'user-clock'},
        {label:'API Error Rate', value:'0.8%',color:'#16a34a',icon:'chart-line'},
      ].map(s=>`<div style="background:#fff;border:1px solid var(--border);padding:1rem;display:flex;align-items:center;gap:.75rem;">
        <div style="width:34px;height:34px;background:${s.color}18;border-radius:3px;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-${s.icon}" style="color:${s.color};font-size:.8rem;"></i></div>
        <div><div style="font-size:1.3rem;font-weight:700;color:${s.color};line-height:1;">${s.value}</div><div style="font-size:.65rem;color:var(--ink-muted);text-transform:uppercase;letter-spacing:.07em;">${s.label}</div></div>
      </div>`).join('')}
    </div>
    <!-- Live Alerts Table -->
    <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.25rem;">
      <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">SIEM Alert Feed</h3>
        <div style="display:flex;gap:.5rem;">
          <button onclick="igToast('Alerts acknowledged','success')" style="background:none;border:1px solid var(--border);padding:.3rem .75rem;font-size:.68rem;cursor:pointer;color:var(--gold);">Acknowledge All</button>
          <button onclick="igToast('Alert report exported','success')" style="background:var(--gold);color:#fff;border:none;padding:.3rem .75rem;font-size:.68rem;cursor:pointer;font-weight:600;">Export Report</button>
        </div>
      </div>
      <table class="ig-tbl"><thead><tr><th>ID</th><th>Severity</th><th>Type</th><th>Message</th><th>Time</th><th>Status</th><th>Action</th></tr></thead><tbody>
        ${[
          {id:'ALT-001',sev:'Critical',type:'Brute Force',     msg:'5 failed logins from 185.220.101.x in 10 min',      ts:'06:12',status:'Investigating',sc:'#dc2626'},
          {id:'ALT-002',sev:'High',    type:'Unusual Access',  msg:'Board doc accessed from unregistered device',        ts:'04:30',status:'Acknowledged', sc:'#d97706'},
          {id:'ALT-003',sev:'High',    type:'API Anomaly',     msg:'100+ req/min from RM account — rate-limit triggered',ts:'03:55',status:'Resolved',     sc:'#d97706'},
          {id:'ALT-004',sev:'Medium',  type:'Geo Anomaly',     msg:'Login from Singapore for IG-KMP-0001 — blocked',    ts:'02:14',status:'Blocked',      sc:'#2563eb'},
          {id:'ALT-005',sev:'Medium',  type:'Session Anomaly', msg:'Token reuse detected — possible replay attack',      ts:'22:10',status:'Resolved',     sc:'#2563eb'},
          {id:'ALT-006',sev:'Medium',  type:'Data Access',     msg:'Bulk export >50 invoices by Finance Manager',       ts:'18:45',status:'Acknowledged', sc:'#2563eb'},
          {id:'ALT-007',sev:'Low',     type:'Config Change',   msg:'Rate limit updated by Super Admin',                  ts:'14:20',status:'Resolved',     sc:'#16a34a'},
        ].map(r=>`<tr>
          <td style="font-size:.72rem;font-family:monospace;color:var(--gold);">${r.id}</td>
          <td><span style="font-size:.65rem;font-weight:700;padding:2px 7px;background:${r.sc}18;color:${r.sc};border:1px solid ${r.sc}44;">${r.sev}</span></td>
          <td style="font-size:.75rem;">${r.type}</td>
          <td style="font-size:.75rem;max-width:280px;">${r.msg}</td>
          <td style="font-size:.7rem;color:var(--ink-muted);">Today ${r.ts}</td>
          <td><span class="badge ${r.status==='Resolved'||r.status==='Blocked'?'b-gr':r.status==='Investigating'?'b-re':'b-g'}" style="font-size:.6rem;">${r.status}</span></td>
          <td><button onclick="igToast('${r.id} escalated','success')" style="background:none;border:1px solid var(--border);padding:.2rem .5rem;font-size:.65rem;cursor:pointer;color:var(--gold);">Escalate</button></td>
        </tr>`).join('')}
      </tbody></table>
    </div>
    <!-- Distributed Tracing -->
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Distributed Tracing — Recent Spans</h3></div>
      <div style="padding:1rem;">
        ${[
          {span:'POST /api/auth/admin',       ms:34, svc:'Auth',       ok:true},
          {span:'GET /api/finance/summary',   ms:18, svc:'Finance',    ok:true},
          {span:'POST /api/finance/voucher',  ms:52, svc:'Finance',    ok:true},
          {span:'POST /api/contracts/clause-check',ms:410,svc:'Contracts',ok:true},
          {span:'POST /api/hr/tds-declaration',ms:88, svc:'HR',         ok:true},
          {span:'GET /api/risk/mandates',     ms:11, svc:'Analytics',  ok:true},
        ].map(t=>`<div style="display:flex;align-items:center;gap:1rem;padding:.5rem 0;border-bottom:1px solid var(--border);">
          <div style="width:6px;height:6px;border-radius:50%;background:${t.ok?'#16a34a':'#dc2626'};flex-shrink:0;"></div>
          <div style="font-size:.75rem;font-family:monospace;flex:1;color:var(--ink);">${t.span}</div>
          <span style="font-size:.68rem;padding:1px 6px;background:#f1f5f9;border:1px solid var(--border);color:var(--ink-muted);">${t.svc}</span>
          <div style="display:flex;align-items:center;gap:.5rem;min-width:120px;">
            <div style="flex:1;background:#e2e8f0;height:5px;border-radius:3px;overflow:hidden;"><div style="height:100%;background:${t.ms<50?'#16a34a':t.ms<200?'#d97706':'#dc2626'};width:${Math.min(100,t.ms/5)}%;"></div></div>
            <span style="font-size:.72rem;font-weight:700;color:${t.ms<50?'#16a34a':t.ms<200?'#d97706':'#dc2626'};min-width:35px;text-align:right;">${t.ms}ms</span>
          </div>
        </div>`).join('')}
        <div style="margin-top:.75rem;display:flex;gap:1.5rem;font-size:.72rem;color:var(--ink-muted);">
          <span><strong>p50:</strong> 34ms</span><span><strong>p95:</strong> 218ms</span><span><strong>p99:</strong> 410ms</span><span><strong>Error rate:</strong> 0.0%</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Tab 7: FIDO & MFA -->
  <div id="sec-pane-7" style="display:none;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;">
      <!-- FIDO2 / WebAuthn -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);">
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">FIDO2 / WebAuthn Hardware Keys</h3>
          <p style="font-size:.72rem;color:var(--ink-muted);margin-top:.2rem;">Phishing-resistant hardware tokens for Super Admin and Director accounts</p>
        </div>
        <div style="padding:1.25rem;">
          ${[
            {user:'superadmin@indiagully.com',role:'Super Admin',key:'YubiKey 5C NFC',registered:'15 Jan 2025',last_used:'Today 06:10',status:'Active'},
            {user:'akm@indiagully.com',        role:'Director MD', key:'YubiKey 5 NFC', registered:'20 Jan 2025',last_used:'Yesterday',  status:'Active'},
            {user:'pavan@indiagully.com',       role:'Director ED', key:'Not registered',registered:'—',          last_used:'—',          status:'Pending'},
          ].map(k=>`<div style="display:flex;align-items:center;justify-content:space-between;padding:.75rem 0;border-bottom:1px solid var(--border);">
            <div>
              <div style="font-size:.78rem;font-weight:600;color:var(--ink);">${k.user}</div>
              <div style="font-size:.68rem;color:var(--ink-muted);">${k.role} · ${k.key}</div>
              <div style="font-size:.65rem;color:var(--ink-muted);">Registered: ${k.registered} · Last used: ${k.last_used}</div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:flex-end;gap:.3rem;">
              <span class="badge ${k.status==='Active'?'b-gr':'b-g'}" style="font-size:.6rem;">${k.status}</span>
              <button onclick="igToast('${k.status==='Active'?'Revoke':'Register'} key for ${k.user}','${k.status==='Active'?'warn':'success'}')" style="background:none;border:1px solid var(--border);padding:.2rem .5rem;font-size:.65rem;cursor:pointer;color:var(--gold);">${k.status==='Active'?'Revoke':'Register Key'}</button>
            </div>
          </div>`).join('')}
          <div id="fido2-live-status" style="margin-bottom:.75rem;font-size:.72rem;color:var(--ink-muted);text-align:center;">Loading registered keys…</div>
          <button onclick="igWebAuthnRegister()" style="background:var(--gold);color:#fff;border:none;padding:.5rem 1.25rem;font-size:.75rem;font-weight:600;cursor:pointer;margin-top:.25rem;width:100%;"><i class="fas fa-plus" style="margin-right:.4rem;"></i>Register New Security Key (J4 ✓)</button>
          <button onclick="igWebAuthnAuthenticate()" style="background:var(--ink);color:#fff;border:none;padding:.5rem 1.25rem;font-size:.75rem;font-weight:600;cursor:pointer;margin-top:.5rem;width:100%;"><i class="fas fa-fingerprint" style="margin-right:.4rem;"></i>Test Authentication</button>
        </div>
      </div>
      <!-- TOTP / MFA Policy -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);">
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">TOTP & MFA Policy</h3>
          <p style="font-size:.72rem;color:var(--ink-muted);margin-top:.2rem;">App-based TOTP enforcement per role</p>
        </div>
        <div style="padding:1.25rem;">
          ${[
            {role:'Super Admin',totp:'Mandatory',fido:'Mandatory',backup:'Recovery codes only',sms:'Disabled'},
            {role:'Director / KMP',totp:'Mandatory',fido:'Recommended',backup:'Recovery codes only',sms:'Disabled'},
            {role:'Finance Manager',totp:'Mandatory',fido:'Optional',backup:'Backup TOTP device',sms:'Disabled'},
            {role:'HR Manager',  totp:'Mandatory',fido:'Optional',backup:'Backup TOTP device',sms:'Disabled'},
            {role:'Employee',    totp:'Recommended',fido:'Optional',backup:'Email OTP fallback',sms:'Disabled'},
            {role:'Client',      totp:'Optional', fido:'Not required',backup:'Email OTP',sms:'Disabled'},
          ].map(r=>`<div style="padding:.6rem 0;border-bottom:1px solid var(--border);">
            <div style="font-size:.75rem;font-weight:700;color:var(--ink);margin-bottom:.3rem;">${r.role}</div>
            <div style="display:flex;gap:.5rem;flex-wrap:wrap;">
              <span style="font-size:.62rem;padding:1px 6px;background:${r.totp==='Mandatory'?'#dcfce7':'#fef9c3'};color:${r.totp==='Mandatory'?'#15803d':'#92400e'};border-radius:3px;">TOTP: ${r.totp}</span>
              <span style="font-size:.62rem;padding:1px 6px;background:#eff6ff;color:#1d4ed8;border-radius:3px;">FIDO: ${r.fido}</span>
              <span style="font-size:.62rem;padding:1px 6px;background:#f8fafc;color:var(--ink-muted);border-radius:3px;">Backup: ${r.backup}</span>
              <span style="font-size:.62rem;padding:1px 6px;background:#fef2f2;color:#991b1b;border-radius:3px;">SMS: ${r.sms}</span>
            </div>
          </div>`).join('')}
          <div class="ig-warn" style="margin-top:1rem;"><i class="fas fa-exclamation-triangle"></i><div style="font-size:.75rem;">Static OTP (000000) used in demo accounts must be disabled in production. All accounts must enroll real TOTP before go-live.</div></div>
          <button onclick="igToast('MFA policy saved — enforced on next login','success')" style="background:var(--ink);color:#fff;border:none;padding:.5rem 1.25rem;font-size:.75rem;font-weight:600;cursor:pointer;margin-top:1rem;width:100%;"><i class="fas fa-lock" style="margin-right:.4rem;"></i>Save MFA Policy</button>
        </div>
      </div>
    </div>
    <!-- CSRF & reCAPTCHA -->
    <div style="background:#fff;border:1px solid var(--border);margin-top:1.25rem;">
      <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">CSRF Protection & reCAPTCHA</h3></div>
      <div style="padding:1.25rem;display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;">
        <div>
          <div style="font-size:.78rem;font-weight:700;color:var(--ink);margin-bottom:.75rem;">CSRF Token Configuration</div>
          ${[
            {endpoint:'POST /api/auth/login',    token:'Required',  method:'Double-submit cookie'},
            {endpoint:'POST /api/auth/admin',    token:'Required',  method:'Synchronizer token'},
            {endpoint:'POST /api/finance/voucher',token:'Required', method:'Synchronizer token'},
            {endpoint:'POST /api/contracts/*',   token:'Required',  method:'Synchronizer token'},
            {endpoint:'POST /api/hr/*',          token:'Required',  method:'Double-submit cookie'},
            {endpoint:'GET  /api/*',             token:'Not needed',method:'Read-only — exempt'},
          ].map(r=>`<div style="display:flex;align-items:center;gap:.5rem;padding:.4rem 0;border-bottom:1px solid var(--border);">
            <i class="fas fa-${r.token==='Required'?'check-circle':'minus-circle'}" style="color:${r.token==='Required'?'#16a34a':'var(--ink-faint)'};font-size:.75rem;flex-shrink:0;"></i>
            <div style="font-size:.72rem;font-family:monospace;flex:1;color:var(--ink);">${r.endpoint}</div>
            <span style="font-size:.62rem;color:var(--ink-muted);">${r.method}</span>
          </div>`).join('')}
        </div>
        <div>
          <div style="font-size:.78rem;font-weight:700;color:var(--ink);margin-bottom:.75rem;">reCAPTCHA v3 Configuration</div>
          ${[
            {endpoint:'Login page',             score:0.5, status:'Active',  trigger:'Always'},
            {endpoint:'Admin login',            score:0.7, status:'Active',  trigger:'Always'},
            {endpoint:'Enquiry form',           score:0.3, status:'Active',  trigger:'Always'},
            {endpoint:'Password reset',         score:0.5, status:'Active',  trigger:'Always'},
            {endpoint:'Portal registration',    score:0.5, status:'Planned', trigger:'Always'},
            {endpoint:'HORECA quote request',   score:0.3, status:'Planned', trigger:'Always'},
          ].map(r=>`<div style="display:flex;align-items:center;gap:.5rem;padding:.4rem 0;border-bottom:1px solid var(--border);">
            <span class="badge ${r.status==='Active'?'b-gr':'b-g'}" style="font-size:.6rem;flex-shrink:0;">${r.status}</span>
            <div style="font-size:.72rem;flex:1;color:var(--ink);">${r.endpoint}</div>
            <span style="font-size:.62rem;background:#f1f5f9;padding:1px 5px;color:var(--ink-muted);">min score ${r.score}</span>
          </div>`).join('')}
          <div style="margin-top:.875rem;">
            <label class="ig-label">reCAPTCHA Site Key</label>
            <input type="text" class="ig-input" value="6LeXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" style="font-size:.75rem;font-family:monospace;">
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Tab 8: Data Encryption -->
  <div id="sec-pane-8" style="display:none;">
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:1.25rem;">
      ${[
        {label:'Encrypted Fields',value:'12',   color:'#16a34a',icon:'lock',      desc:'AES-256-GCM at rest'},
        {label:'Tokenized PII',   value:'6',    color:'#2563eb',icon:'fingerprint',desc:'PAN, Aadhaar, Bank A/C'},
        {label:'TLS Version',     value:'1.3',  color:'#16a34a',icon:'shield-alt', desc:'All connections enforced'},
        {label:'Key Rotation',    value:'90d',  color:'#d97706',icon:'sync-alt',   desc:'Scheduled — next: 28 May'},
        {label:'Encrypted Storage',value:'100%',color:'#16a34a',icon:'database',  desc:'Cloudflare D1 + R2'},
        {label:'DPDP Compliance', value:'95%',  color:'#22c55e',icon:'balance-scale',desc:'K5: DPO dashboard + granular withdraw v2'},
      ].map(s=>`<div style="background:#fff;border:1px solid var(--border);padding:1rem;display:flex;align-items:center;gap:.75rem;">
        <div style="width:36px;height:36px;background:${s.color}18;border-radius:4px;display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-${s.icon}" style="color:${s.color};font-size:.85rem;"></i></div>
        <div><div style="font-size:1.25rem;font-weight:700;color:${s.color};line-height:1;">${s.value}</div><div style="font-size:.65rem;font-weight:700;color:var(--ink);text-transform:uppercase;letter-spacing:.06em;">${s.label}</div><div style="font-size:.62rem;color:var(--ink-muted);">${s.desc}</div></div>
      </div>`).join('')}
    </div>
    <!-- Field-Level Encryption Table -->
    <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.25rem;">
      <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Field-Level Encryption Registry</h3></div>
      <table class="ig-tbl"><thead><tr><th>Field</th><th>Table/Module</th><th>Algorithm</th><th>Key Scope</th><th>Masking</th><th>Status</th></tr></thead><tbody>
        ${[
          {field:'PAN Number',       module:'HR/Employees',  algo:'AES-256-GCM', scope:'Employee',       mask:'ABCDE••••F',  status:'Active'},
          {field:'Aadhaar Number',   module:'HR/KYC',        algo:'AES-256-GCM', scope:'Employee',       mask:'••••-••••-9012',status:'Active'},
          {field:'Bank Account No',  module:'Finance/HR',    algo:'AES-256-GCM', scope:'Employee',       mask:'••••567890',  status:'Active'},
          {field:'Salary / CTC',     module:'HR/Payroll',    algo:'AES-256-GCM', scope:'HR+Finance',     mask:'₹ ••,•••',   status:'Active'},
          {field:'Email Address',    module:'All Portals',   algo:'HMAC-SHA256', scope:'Session-bound',  mask:'Optional',   status:'Active'},
          {field:'Phone Number',     module:'All Portals',   algo:'AES-256-GCM', scope:'HR+Admin',       mask:'+91 9810××××', status:'Active'},
          {field:'Board Resolutions',module:'Governance',    algo:'AES-256-GCM', scope:'Board+Admin',    mask:'N/A',         status:'Active'},
          {field:'Invoice Amounts',  module:'Finance',       algo:'At-rest TLS', scope:'Finance+Admin',  mask:'N/A',         status:'Active'},
          {field:'Contract Terms',   module:'Contracts',     algo:'AES-256-GCM', scope:'Parties+Admin',  mask:'N/A',         status:'Active'},
          {field:'GSTIN',            module:'Finance',       algo:'Tokenized',   scope:'Finance+Admin',  mask:'07XXXXX1234', status:'Active'},
          {field:'DIN Number',       module:'Governance',    algo:'AES-256-GCM', scope:'Board+Admin',    mask:'••••••',      status:'Active'},
          {field:'Director Aadhaar', module:'Governance',    algo:'AES-256-GCM', scope:'Board+Admin',    mask:'••••-••••-××××',status:'Active'},
        ].map(r=>`<tr>
          <td style="font-size:.78rem;font-weight:600;color:var(--ink);">${r.field}</td>
          <td style="font-size:.72rem;color:var(--ink-muted);">${r.module}</td>
          <td style="font-size:.72rem;font-family:monospace;color:#2563eb;">${r.algo}</td>
          <td style="font-size:.72rem;color:var(--ink-muted);">${r.scope}</td>
          <td style="font-size:.72rem;font-family:monospace;color:var(--gold);">${r.mask}</td>
          <td><span class="badge b-gr" style="font-size:.6rem;">${r.status}</span></td>
        </tr>`).join('')}
      </tbody></table>
    </div>
    <!-- K5: DPO Dashboard — Live DPDP v2 panel -->
    <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.25rem;" id="dpo-dashboard-card">
      <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);margin:0;">
          <i class="fas fa-shield-halved" style="color:#6366f1;margin-right:.4rem;"></i>DPO Dashboard — DPDP v2 (K5)
        </h3>
        <button onclick="igLoadDpoDashboard()" style="background:var(--gold);color:#fff;border:none;padding:.35rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;border-radius:3px;">
          <i class="fas fa-sync" style="margin-right:.3rem;"></i>Refresh
        </button>
      </div>
      <div id="dpo-dashboard-body" style="padding:1.25rem;">
        <!-- Summary KPIs -->
        <div id="dpo-kpis" style="display:grid;grid-template-columns:repeat(3,1fr);gap:.875rem;margin-bottom:1.25rem;">
          <div style="background:#f8fafc;border:1px solid var(--border);padding:.875rem;text-align:center;">
            <div id="dpo-kpi-consents" style="font-size:1.5rem;font-weight:700;color:#6366f1;">—</div>
            <div style="font-size:.7rem;color:var(--ink-muted);margin-top:.2rem;">Active Consents</div>
          </div>
          <div style="background:#f8fafc;border:1px solid var(--border);padding:.875rem;text-align:center;">
            <div id="dpo-kpi-open" style="font-size:1.5rem;font-weight:700;color:#d97706;">—</div>
            <div style="font-size:.7rem;color:var(--ink-muted);margin-top:.2rem;">Open Requests</div>
          </div>
          <div style="background:#f8fafc;border:1px solid var(--border);padding:.875rem;text-align:center;">
            <div id="dpo-kpi-alerts" style="font-size:1.5rem;font-weight:700;color:#dc2626;">—</div>
            <div style="font-size:.7rem;color:var(--ink-muted);margin-top:.2rem;">Unread Alerts</div>
          </div>
        </div>
        <!-- Recent withdrawals -->
        <div style="margin-bottom:1.25rem;">
          <div style="font-size:.78rem;font-weight:600;color:var(--ink);margin-bottom:.5rem;">Recent Consent Withdrawals</div>
          <div id="dpo-withdrawals" style="font-size:.75rem;color:var(--ink-muted);">Click Refresh to load…</div>
        </div>
        <!-- Open rights requests -->
        <div style="margin-bottom:1.25rem;">
          <div style="font-size:.78rem;font-weight:600;color:var(--ink);margin-bottom:.5rem;">Open Rights Requests</div>
          <div id="dpo-requests" style="font-size:.75rem;color:var(--ink-muted);">Click Refresh to load…</div>
        </div>
        <!-- Unread DPO alerts -->
        <div>
          <div style="font-size:.78rem;font-weight:600;color:var(--ink);margin-bottom:.5rem;">Unread DPO Alerts</div>
          <div id="dpo-alerts-list" style="font-size:.75rem;color:var(--ink-muted);">Click Refresh to load…</div>
        </div>
        <!-- Quick actions -->
        <div style="margin-top:1.25rem;display:flex;gap:.75rem;flex-wrap:wrap;">
          <button onclick="igTestWithdraw()" style="background:none;border:1px solid #6366f1;color:#6366f1;padding:.4rem .875rem;font-size:.72rem;cursor:pointer;border-radius:3px;">
            <i class="fas fa-user-minus" style="margin-right:.3rem;"></i>Test Consent Withdraw
          </button>
          <button onclick="igTestDpdpRights()" style="background:none;border:1px solid #d97706;color:#d97706;padding:.4rem .875rem;font-size:.72rem;cursor:pointer;border-radius:3px;">
            <i class="fas fa-gavel" style="margin-right:.3rem;"></i>Test Rights Request
          </button>
          <button onclick="igDpdpReport()" style="background:none;border:1px solid var(--border);color:var(--ink-muted);padding:.4rem .875rem;font-size:.72rem;cursor:pointer;border-radius:3px;">
            <i class="fas fa-file-alt" style="margin-right:.3rem;"></i>DPDP Report
          </button>
        </div>
      </div>
    </div>
    <!-- DPDP Compliance Checklist -->
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">DPDP Act 2023 — Compliance Checklist (v2)</h3></div>
      <div style="padding:1.25rem;">
        ${[
          {item:'Consent notice displayed before data collection',done:true},
          {item:'Purpose limitation documented for each data category',done:true},
          {item:'Data minimisation — collect only what is needed',done:true},
          {item:'Data Fiduciary registration with DPB (when live)',done:false},
          {item:'Data Principal rights portal: access, correct, erase, nominate (DONE K5)',done:true},
          {item:'Grievance Redressal Officer appointed & published',done:true},
          {item:'Cross-border data transfer controls implemented',done:true},
          {item:'Data breach notification procedure (72hr DPB, 7d principals)',done:true},
          {item:'Retention policy — auto-delete after 7 years',done:false},
          {item:'Processor agreements with vendors (SendGrid, Twilio, etc.)',done:false},
          {item:'Children data — age-gating and parental consent',done:true},
          {item:'Annual DPDP audit by qualified assessor',done:false},
          {item:'DPO dashboard with granular withdrawal tracking (K5)',done:true},
          {item:'Consent v2 D1-backed per-purpose flags (K5)',done:true},
        ].map((r,i)=>`<div style="display:flex;align-items:flex-start;gap:.625rem;padding:.5rem 0;border-bottom:1px solid var(--border);">
          <i class="fas fa-${r.done?'check-circle':'circle'}" style="color:${r.done?'#16a34a':'#e2e8f0'};font-size:.85rem;margin-top:.05rem;flex-shrink:0;"></i>
          <span style="font-size:.78rem;color:${r.done?'var(--ink)':'var(--ink-muted)'};">${r.item}</span>
          ${!r.done?'<span style="margin-left:auto;font-size:.6rem;background:#fef9c3;color:#92400e;padding:1px 6px;flex-shrink:0;border-radius:3px;">Pending</span>':''}
        </div>`).join('')}
        <div style="margin-top:1rem;display:flex;gap:.75rem;">
          <button onclick="igToast('DPDP compliance report generated','success')" style="background:var(--gold);color:#fff;border:none;padding:.5rem 1.25rem;font-size:.75rem;font-weight:600;cursor:pointer;"><i class="fas fa-file-alt" style="margin-right:.4rem;"></i>Generate Compliance Report</button>
          <button onclick="igToast('Breach notification workflow opened','info')" style="background:none;border:1px solid var(--border);padding:.5rem 1.25rem;font-size:.75rem;cursor:pointer;color:var(--ink-muted);">Breach Notify Workflow</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Tab 9: Incident Response -->
  <div id="sec-pane-9" style="display:none;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;margin-bottom:1.25rem;">
      <!-- Incident Register -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Incident Register</h3>
          <button onclick="igToast('New incident opened','warn')" style="background:#dc2626;color:#fff;border:none;padding:.3rem .75rem;font-size:.68rem;font-weight:600;cursor:pointer;"><i class="fas fa-plus" style="margin-right:.3rem;"></i>New Incident</button>
        </div>
        ${[
          {id:'INC-001',title:'Brute-force attempt from TOR exit node',  sev:'Critical',status:'Resolved',  opened:'2026-01-14',closed:'2026-01-14',owner:'superadmin'},
          {id:'INC-002',title:'Unencrypted laptop left in public space',  sev:'High',    status:'Closed',    opened:'2026-01-28',closed:'2026-01-30',owner:'pavan'},
          {id:'INC-003',title:'Phishing email targeting Finance Manager', sev:'High',    status:'Investigating',opened:'2026-02-20',closed:'—',        owner:'superadmin'},
          {id:'INC-004',title:'Rate-limit bypass attempt via proxy chain',sev:'Medium',  status:'Resolved',  opened:'2026-02-25',closed:'2026-02-25',owner:'superadmin'},
        ].map(r=>`<div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.3rem;">
            <span style="font-size:.72rem;font-weight:700;color:var(--gold);">${r.id}</span>
            <span class="badge ${r.status==='Resolved'||r.status==='Closed'?'b-gr':r.status==='Investigating'?'b-re':'b-g'}" style="font-size:.6rem;">${r.status}</span>
          </div>
          <div style="font-size:.78rem;color:var(--ink);margin-bottom:.3rem;">${r.title}</div>
          <div style="display:flex;gap:1rem;font-size:.68rem;color:var(--ink-muted);">
            <span><i class="fas fa-exclamation-triangle" style="color:${r.sev==='Critical'?'#dc2626':r.sev==='High'?'#d97706':'#2563eb'};margin-right:.2rem;"></i>${r.sev}</span>
            <span>Opened: ${r.opened}</span><span>Closed: ${r.closed}</span><span>Owner: ${r.owner}</span>
          </div>
        </div>`).join('')}
      </div>
      <!-- Response Playbooks -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Response Playbooks</h3></div>
        <div style="padding:1.25rem;">
          ${[
            {name:'Credential Compromise',    steps:['Lock account immediately','Notify user + CISO','Force password reset + re-enroll MFA','Review audit log 30 days','Assess blast radius','File incident report'],color:'#dc2626'},
            {name:'Data Breach',              steps:['Contain — isolate affected service','Assess scope + affected data principals','Notify DPB within 72 hours (DPDP)','Notify affected users','Preserve evidence','Root-cause analysis 7 days'],color:'#d97706'},
            {name:'DDoS / API Abuse',         steps:['Activate Cloudflare WAF rule','Enable rate-limiting at edge','Block offending ASNs','Notify CISO','Post-mortem within 24hr'],color:'#2563eb'},
            {name:'Insider Threat',           steps:['Revoke access immediately','Preserve logs + devices','HR + Legal notification','Forensic review','Board notification if Director'],color:'#7c3aed'},
          ].map((p,pi)=>`<div style="margin-bottom:1rem;">
            <button onclick="document.getElementById('playbook-${pi}').style.display=document.getElementById('playbook-${pi}').style.display==='none'?'block':'none'" style="width:100%;text-align:left;background:${p.color}10;border:1px solid ${p.color}33;padding:.5rem .875rem;cursor:pointer;display:flex;justify-content:space-between;align-items:center;">
              <span style="font-size:.78rem;font-weight:700;color:${p.color};">${p.name}</span>
              <i class="fas fa-chevron-down" style="font-size:.6rem;color:${p.color};"></i>
            </button>
            <div id="playbook-${pi}" style="display:none;border:1px solid ${p.color}33;border-top:none;padding:.75rem;">
              ${p.steps.map((s,si)=>`<div style="display:flex;gap:.5rem;padding:.3rem 0;font-size:.75rem;color:var(--ink);"><span style="color:${p.color};font-weight:700;flex-shrink:0;">${si+1}.</span>${s}</div>`).join('')}
              <button onclick="igToast('${p.name} playbook initiated — incident logged','warn')" style="background:${p.color};color:#fff;border:none;padding:.35rem .875rem;font-size:.68rem;font-weight:600;cursor:pointer;margin-top:.5rem;"><i class="fas fa-play" style="margin-right:.3rem;"></i>Initiate Playbook</button>
            </div>
          </div>`).join('')}
        </div>
      </div>
    </div>
    <!-- Pen Test Schedule -->
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Penetration Testing & Vulnerability Scanning</h3></div>
      <div style="padding:1.25rem;display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;">
        ${[
          {label:'Last Pen Test',  value:'Jan 2026',  status:'Completed', icon:'bug',         color:'#16a34a'},
          {label:'Next Pen Test',  value:'Jul 2026',  status:'Scheduled', icon:'calendar-alt',color:'#2563eb'},
          {label:'Open CVEs',      value:'3 Medium',  status:'Tracking',  icon:'exclamation', color:'#d97706'},
          {label:'Dependabot',     value:'Auto-scan', status:'Active',    icon:'robot',       color:'#16a34a'},
        ].map(s=>`<div style="background:#f8fafc;border:1px solid var(--border);padding:.875rem;text-align:center;">
          <i class="fas fa-${s.icon}" style="color:${s.color};font-size:1.25rem;margin-bottom:.5rem;"></i>
          <div style="font-size:.82rem;font-weight:700;color:var(--ink);">${s.value}</div>
          <div style="font-size:.65rem;text-transform:uppercase;letter-spacing:.07em;color:var(--ink-muted);margin-bottom:.3rem;">${s.label}</div>
          <span class="badge ${s.status==='Completed'||s.status==='Active'?'b-gr':s.status==='Scheduled'?'b-g':'b-g'}" style="font-size:.58rem;">${s.status}</span>
        </div>`).join('')}
      </div>
    </div>
  </div>

  <script>
  /* ── K5: DPO Dashboard — DPDP v2 ── */
  window.igLoadDpoDashboard = function(){
    igToast('Loading DPO dashboard…','info');
    igApi.get('/dpdp/dpo/dashboard').then(function(d){
      // KPIs
      var s = d.summary || {};
      var kc = document.getElementById('dpo-kpi-consents');
      var ko = document.getElementById('dpo-kpi-open');
      var ka = document.getElementById('dpo-kpi-alerts');
      if(kc) kc.textContent = s.active_consents != null ? s.active_consents : (d.storage==='fallback'?'N/A':'—');
      if(ko) ko.textContent = s.open_requests != null ? s.open_requests : '—';
      if(ka) ka.textContent = s.unread_alerts != null ? s.unread_alerts : '—';
      // Withdrawals
      var wEl = document.getElementById('dpo-withdrawals');
      if(wEl){
        var ws = d.recent_withdrawals || [];
        if(!ws.length){ wEl.innerHTML='<em style="color:var(--ink-muted)">No withdrawals yet'+(d.storage==='fallback'?' (D1 not active)':'')+'</em>'; }
        else { wEl.innerHTML='<table style="width:100%;font-size:.73rem;border-collapse:collapse;"><thead><tr style="background:#f8fafc;"><th style="text-align:left;padding:.3rem .5rem;border:1px solid var(--border);">Ref</th><th style="text-align:left;padding:.3rem .5rem;border:1px solid var(--border);">User</th><th style="text-align:left;padding:.3rem .5rem;border:1px solid var(--border);">Purposes</th><th style="text-align:left;padding:.3rem .5rem;border:1px solid var(--border);">Channel</th><th style="text-align:left;padding:.3rem .5rem;border:1px solid var(--border);">Date</th></tr></thead><tbody>'+ws.slice(0,5).map(function(w){return '<tr><td style="padding:.3rem .5rem;border:1px solid var(--border);font-family:monospace;font-size:.68rem;">'+w.withdrawal_ref+'</td><td style="padding:.3rem .5rem;border:1px solid var(--border);">'+w.user_id+'</td><td style="padding:.3rem .5rem;border:1px solid var(--border);">'+(JSON.parse(w.purposes_withdrawn||'[]').join(', '))+'</td><td style="padding:.3rem .5rem;border:1px solid var(--border);">'+w.channel+'</td><td style="padding:.3rem .5rem;border:1px solid var(--border);">'+(w.created_at||'').substring(0,10)+'</td></tr>';}).join('')+'</tbody></table>'; }
      }
      // Rights requests
      var rEl = document.getElementById('dpo-requests');
      if(rEl){
        var rqs = d.open_requests || [];
        if(!rqs.length){ rEl.innerHTML='<em style="color:var(--ink-muted)">No open requests'+(d.storage==='fallback'?' (D1 not active)':'')+'</em>'; }
        else { rEl.innerHTML='<table style="width:100%;font-size:.73rem;border-collapse:collapse;"><thead><tr style="background:#f8fafc;"><th style="text-align:left;padding:.3rem .5rem;border:1px solid var(--border);">Ref</th><th style="text-align:left;padding:.3rem .5rem;border:1px solid var(--border);">User</th><th style="text-align:left;padding:.3rem .5rem;border:1px solid var(--border);">Type</th><th style="text-align:left;padding:.3rem .5rem;border:1px solid var(--border);">Due</th><th style="text-align:left;padding:.3rem .5rem;border:1px solid var(--border);">Status</th></tr></thead><tbody>'+rqs.slice(0,5).map(function(r){return '<tr><td style="padding:.3rem .5rem;border:1px solid var(--border);font-family:monospace;font-size:.68rem;">'+r.request_ref+'</td><td style="padding:.3rem .5rem;border:1px solid var(--border);">'+r.user_id+'</td><td style="padding:.3rem .5rem;border:1px solid var(--border);text-transform:capitalize;">'+r.request_type+'</td><td style="padding:.3rem .5rem;border:1px solid var(--border);">'+(r.due_date||'').substring(0,10)+'</td><td style="padding:.3rem .5rem;border:1px solid var(--border);"><span style="background:#fef9c3;color:#92400e;padding:1px 6px;border-radius:3px;font-size:.65rem;">'+r.status+'</span></td></tr>';}).join('')+'</tbody></table>'; }
      }
      // Alerts
      var aEl = document.getElementById('dpo-alerts-list');
      if(aEl){
        var als = d.unread_alerts || [];
        if(!als.length){ aEl.innerHTML='<em style="color:var(--ink-muted)">No unread alerts</em>'; }
        else { aEl.innerHTML=als.slice(0,5).map(function(a){return '<div style="display:flex;gap:.5rem;align-items:flex-start;padding:.5rem;border:1px solid var(--border);margin-bottom:.35rem;background:#fefce8;"><i class="fas fa-bell" style="color:#d97706;font-size:.8rem;margin-top:.1rem;flex-shrink:0;"></i><div><div style="font-size:.75rem;font-weight:600;color:var(--ink);">'+a.title+'</div><div style="font-size:.7rem;color:var(--ink-muted);margin-top:.1rem;">'+a.body+'</div></div></div>';}).join(''); }
      }
      igToast('DPO dashboard refreshed','success');
    }).catch(function(e){ igToast('DPO dashboard: '+(e.message||e),'warning'); });
  };

  window.igTestWithdraw = function(){
    igApi.post('/dpdp/consent/withdraw',{user_id:'dpo-test@indiagully.com',purposes:['analytics','marketing'],reason:'DPO admin test',channel:'admin'})
      .then(function(d){ igToast('Consent withdraw: '+d.withdrawal_ref,'success'); igLoadDpoDashboard(); })
      .catch(function(e){ igToast('Withdraw failed: '+(e.message||e),'error'); });
  };

  window.igTestDpdpRights = function(){
    igApi.post('/dpdp/rights/request',{user_id:'dpo-test@indiagully.com',request_type:'access',description:'DPO admin test rights request'})
      .then(function(d){ igToast('Rights request: '+d.request_ref,'success'); igLoadDpoDashboard(); })
      .catch(function(e){ igToast('Rights request failed: '+(e.message||e),'error'); });
  };

  window.igDpdpReport = function(){
    igToast('Generating DPDP v2 compliance report…','info');
    igApi.get('/dpdp/dpo/dashboard').then(function(d){
      var s = d.summary||{};
      var txt = 'India Gully — DPDP v2 Compliance Report\n'+'Generated: '+new Date().toISOString()+'\n\n'
        +'Active Consents: '+(s.active_consents||0)+'\nOpen Requests: '+(s.open_requests||0)+'\nOverdue: '+(s.overdue_requests||0)+'\nUnread Alerts: '+(s.unread_alerts||0)+'\n\n'
        +'Storage: '+d.storage+'\nDPO Email: dpo@indiagully.com\nLegal Basis: DPDP Act 2023\n';
      var blob = new Blob([txt],{type:'text/plain'});
      var a = document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='dpdp-v2-report-'+Date.now()+'.txt'; a.click();
      igToast('DPDP report downloaded','success');
    }).catch(function(){ igToast('Using cached data for report','warning'); });
  };

  window.igSecTab = function(idx){
    for(var i=0;i<10;i++){
      var p=document.getElementById('sec-pane-'+i);
      var t=document.getElementById('sec-tab-'+i);
      if(p) p.style.display=i===idx?'block':'none';
      if(t){ t.style.color=i===idx?'var(--gold)':'var(--ink-muted)'; t.style.borderBottom=i===idx?'2px solid var(--gold)':'2px solid transparent'; }
    }
  };
  window.igFilterAuditLog = function(val){
    var rows=document.querySelectorAll('#audit-log-table tbody tr');
    rows.forEach(function(r){
      var show=true;
      if(val==='fail') show=r.dataset.ok==='false';
      else if(val==='auth') show=r.dataset.mod==='auth';
      else if(val==='high') show=r.dataset.risk==='High'||r.dataset.risk==='Critical';
      r.style.display=show?'':'none';
    });
  };

  /* ── Security: load live pentest checklist + ABAC matrix ── */
  igApi.get('/security/pentest-checklist').then(function(d){
    if(!d) return;
    var el=document.getElementById('pentest-score');
    if(el && d.overall_score) el.textContent=d.overall_score+'/100';
    var el2=document.getElementById('pentest-open');
    if(el2 && d.open_findings!==undefined) el2.textContent=d.open_findings+' open';
  });
  igApi.get('/abac/matrix').then(function(d){
    if(!d) return;
    var el=document.getElementById('abac-roles');
    if(el) el.textContent=d.roles.join(', ');
  });

  /* ── J4: WebAuthn register/authenticate via @simplewebauthn/server ── */
  // Load existing credentials for current user
  (function loadFido2Status(){
    var el=document.getElementById('fido2-live-status');
    if(!el) return;
    igApi.get('/auth/totp/enrol/status').then(function(d){
      if(d && d.webauthn_credentials !== undefined){
        el.textContent = d.webauthn_credentials > 0
          ? d.webauthn_credentials + ' security key(s) registered for your account'
          : 'No hardware keys registered for your account';
      } else {
        el.textContent = 'Security key status: connect a YubiKey or platform authenticator to begin';
      }
    }).catch(function(){ el.textContent = 'Could not load key status — session required'; });
  })();

  window.igWebAuthnRegister = function(){
    igToast('Starting FIDO2 registration flow…','info');
    igApi.post('/auth/webauthn/register/begin', {}).then(function(opts){
      if(!opts || opts.error){ igToast(opts&&opts.error||'Could not start registration','warn'); return; }
      // Browser WebAuthn API
      if(!window.PublicKeyCredential){ igToast('WebAuthn not supported in this browser','warn'); return; }
      opts.challenge = Uint8Array.from(atob(opts.challenge.replace(/-/g,'+').replace(/_/g,'/')),function(c){return c.charCodeAt(0);});
      opts.user.id = Uint8Array.from(atob(opts.user.id.replace(/-/g,'+').replace(/_/g,'/')),function(c){return c.charCodeAt(0);});
      (opts.excludeCredentials||[]).forEach(function(c){ c.id = Uint8Array.from(atob(c.id.replace(/-/g,'+').replace(/_/g,'/')),function(x){return x.charCodeAt(0);}); });
      navigator.credentials.create({publicKey:opts}).then(function(cred){
        var resp = {
          id: cred.id,
          rawId: btoa(String.fromCharCode.apply(null,new Uint8Array(cred.rawId))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,''),
          type: cred.type,
          response: {
            attestationObject: btoa(String.fromCharCode.apply(null,new Uint8Array(cred.response.attestationObject))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,''),
            clientDataJSON:    btoa(String.fromCharCode.apply(null,new Uint8Array(cred.response.clientDataJSON))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,''),
            transports:        cred.response.getTransports ? cred.response.getTransports() : [],
          },
        };
        return igApi.post('/auth/webauthn/register/complete', resp);
      }).then(function(r){
        if(r && r.success){ igToast('Security key registered! credential_id: '+r.credential_id.slice(0,12)+'…','success'); }
        else { igToast((r&&r.error)||'Registration failed','warn'); }
      }).catch(function(e){ igToast('WebAuthn error: '+(e&&e.message||e),'warn'); });
    }).catch(function(){ igToast('Registration begin failed — ensure you are logged in','warn'); });
  };

  window.igWebAuthnAuthenticate = function(){
    igToast('Starting FIDO2 authentication challenge…','info');
    igApi.post('/auth/webauthn/authenticate/begin', {}).then(function(opts){
      if(!opts || opts.error){ igToast(opts&&opts.error||'No registered keys','warn'); return; }
      if(!window.PublicKeyCredential){ igToast('WebAuthn not supported in this browser','warn'); return; }
      opts.challenge = Uint8Array.from(atob(opts.challenge.replace(/-/g,'+').replace(/_/g,'/')),function(c){return c.charCodeAt(0);});
      (opts.allowCredentials||[]).forEach(function(c){ c.id = Uint8Array.from(atob(c.id.replace(/-/g,'+').replace(/_/g,'/')),function(x){return x.charCodeAt(0);}); });
      navigator.credentials.get({publicKey:opts}).then(function(cred){
        var resp = {
          id: cred.id,
          rawId: btoa(String.fromCharCode.apply(null,new Uint8Array(cred.rawId))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,''),
          type: cred.type,
          response: {
            authenticatorData: btoa(String.fromCharCode.apply(null,new Uint8Array(cred.response.authenticatorData))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,''),
            clientDataJSON:    btoa(String.fromCharCode.apply(null,new Uint8Array(cred.response.clientDataJSON))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,''),
            signature:         btoa(String.fromCharCode.apply(null,new Uint8Array(cred.response.signature))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,''),
            userHandle:        cred.response.userHandle ? btoa(String.fromCharCode.apply(null,new Uint8Array(cred.response.userHandle))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=/g,'') : null,
          },
        };
        return igApi.post('/auth/webauthn/authenticate/complete', resp);
      }).then(function(r){
        if(r && r.verified){ igToast('FIDO2 authentication verified! counter='+r.new_counter,'success'); }
        else { igToast((r&&r.error)||'Authentication failed','warn'); }
      }).catch(function(e){ igToast('WebAuthn error: '+(e&&e.message||e),'warn'); });
    }).catch(function(){ igToast('Authenticate begin failed — register a key first','warn'); });
  };
  </script>`
  return c.html(layout('Security & Audit', adminShell('Security & Audit', 'security', body), {noNav:true,noFooter:true}))
})

// ── API DOCUMENTATION (/admin/api-docs) ───────────────────────────────────────
app.get('/api-docs', (c) => {
  const endpoints = [
    { method:'GET',  path:'/api/health',              tag:'System',    auth:'None',    desc:'Platform health check, version, module list, route count' },
    { method:'POST', path:'/api/auth/login',           tag:'Auth',      auth:'None',    desc:'Portal login (client / employee / board). Returns redirect.' },
    { method:'POST', path:'/api/auth/admin',           tag:'Auth',      auth:'None',    desc:'Admin login with TOTP. Returns redirect to /admin/dashboard.' },
    { method:'POST', path:'/api/auth/reset',           tag:'Auth',      auth:'None',    desc:'Trigger password reset email for registered portal user.' },
    { method:'POST', path:'/api/enquiry',              tag:'Public',    auth:'None',    desc:'Submit a mandate / advisory enquiry. Returns ref ID.' },
    { method:'POST', path:'/api/horeca-enquiry',       tag:'Public',    auth:'None',    desc:'Submit a HORECA procurement enquiry. Returns ref ID.' },
    { method:'POST', path:'/api/subscribe',            tag:'Public',    auth:'None',    desc:'Subscribe to India Gully Research Bulletin.' },
    { method:'GET',  path:'/api/listings',             tag:'Mandates',  auth:'None',    desc:'List all public active mandates with sector, value, status.' },
    { method:'GET',  path:'/api/mandates',             tag:'Mandates',  auth:'Portal',  desc:'Client-specific mandates with progress %, advisor, timeline.' },
    { method:'GET',  path:'/api/invoices',             tag:'Finance',   auth:'Portal',  desc:'Invoice register: base, GST, total, status, due date.' },
    { method:'GET',  path:'/api/finance/summary',      tag:'Finance',   auth:'Admin',   desc:'Revenue, expense, profit, GST, bank balance KPIs.' },
    { method:'GET',  path:'/api/employees',            tag:'HR',        auth:'Admin',   desc:'Employee directory with designation, CTC, email, status.' },
    { method:'POST', path:'/api/attendance/checkin',   tag:'HR',        auth:'Portal',  desc:'Mark employee check-in or check-out with timestamp.' },
    { method:'POST', path:'/api/leave/apply',          tag:'HR',        auth:'Portal',  desc:'Submit leave application for manager approval.' },
    { method:'GET',  path:'/api/compliance',           tag:'Governance',auth:'Admin',   desc:'Upcoming compliance dates, forms, penalties, responsible module.' },
    { method:'GET',  path:'/api/horeca/catalogue',     tag:'HORECA',    auth:'None',    desc:'HORECA catalogue categories with SKU counts and icons.' },
    { method:'GET',  path:'/api/kpi/summary',          tag:'Analytics', auth:'Admin',   desc:'OKR/KPI summary for current quarter by department.' },
    { method:'GET',  path:'/api/risk/mandates',        tag:'Analytics', auth:'Admin',   desc:'Mandate risk scores, weighted pipeline, concentration flags.' },
    { method:'GET',  path:'/api/contracts/expiring',   tag:'Contracts', auth:'Admin',   desc:'Contracts expiring within 30/60/90 days with renewal flags.' },
    { method:'POST', path:'/api/contracts/clause-check',tag:'Contracts',auth:'Admin',  desc:'AI clause risk scanner — returns risk level + missing clauses.' },
    { method:'POST', path:'/api/finance/voucher',      tag:'Finance',   auth:'Admin',   desc:'Create double-entry voucher (Sales/Purchase/Payment/Journal).' },
    { method:'GET',  path:'/api/finance/reconcile',    tag:'Finance',   auth:'Admin',   desc:'Bank reconciliation status: matched, unmatched, pending JV.' },
    { method:'POST', path:'/api/hr/tds-declaration',   tag:'HR',        auth:'Portal',  desc:'Employee investment declaration for 80C/80D/HRA/NPS TDS calc.' },
    { method:'GET',  path:'/api/governance/resolutions',tag:'Governance',auth:'Board', desc:'Board resolutions register with voting tally and DSC status.' },
  ]
  const tagColors: Record<string,string> = {System:'#64748b',Auth:'#dc2626',Public:'#16a34a',Mandates:'#B8960C',Finance:'#2563eb',HR:'#7c3aed',Governance:'#d97706',HORECA:'#0891b2',Analytics:'#0f766e',Contracts:'#9333ea'}
  const methodColor: Record<string,string> = {GET:'#16a34a',POST:'#2563eb',PUT:'#d97706',DELETE:'#dc2626',PATCH:'#7c3aed'}
  const tags = [...new Set(endpoints.map(e=>e.tag))]
  const body = `
  <!-- Header Banner -->
  <div style="background:linear-gradient(135deg,#0f172a,#1e293b);padding:2rem;margin-bottom:1.5rem;border:1px solid rgba(255,255,255,.07);">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:1rem;">
      <div>
        <div style="font-size:.6rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:#38bdf8;margin-bottom:.5rem;">India Gully Enterprise Platform</div>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:#fff;">API Reference</div>
        <div style="font-size:.78rem;color:rgba(255,255,255,.5);margin-top:.35rem;">OpenAPI-compatible · Version 2025.03 · ${endpoints.length} endpoints across ${tags.length} tags</div>
      </div>
      <div style="display:flex;gap:.625rem;flex-wrap:wrap;">
        <div style="background:rgba(22,163,74,.15);border:1px solid rgba(22,163,74,.3);padding:.4rem 1rem;font-size:.72rem;color:#4ade80;display:flex;align-items:center;gap:.4rem;"><span style="width:6px;height:6px;background:#4ade80;border-radius:50%;display:inline-block;"></span>API Status: Operational</div>
        <button onclick="igToast('OpenAPI JSON spec copied to clipboard','success')" style="background:#38bdf8;color:#0f172a;border:none;padding:.4rem 1rem;font-size:.72rem;font-weight:700;cursor:pointer;"><i class="fas fa-download" style="margin-right:.3rem;"></i>Export OpenAPI JSON</button>
        <button onclick="igToast('Postman collection downloaded','success')" style="background:rgba(255,255,255,.08);color:#fff;border:1px solid rgba(255,255,255,.15);padding:.4rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;"><i class="fas fa-satellite-dish" style="margin-right:.3rem;"></i>Postman Collection</button>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-top:1.5rem;">
      ${[
        {label:'Total Endpoints',value:endpoints.length.toString(),icon:'code',color:'#38bdf8'},
        {label:'Tags / Domains',value:tags.length.toString(),icon:'tag',color:'#a78bfa'},
        {label:'Auth Required',value:endpoints.filter(e=>e.auth!=='None').length.toString(),icon:'shield-alt',color:'#fbbf24'},
        {label:'Base URL',value:'india-gully.pages.dev',icon:'globe',color:'#34d399'},
      ].map(s=>`<div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);padding:.875rem;">
        <div style="font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:${s.color};margin-bottom:.3rem;">${s.label}</div>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.25rem;color:#fff;">${s.value}</div>
      </div>`).join('')}
    </div>
  </div>

  <!-- Tag Filter -->
  <div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1.25rem;">
    <button onclick="igApiFilter('')" id="api-tag-all" style="padding:.35rem .875rem;font-size:.72rem;font-weight:600;border:none;cursor:pointer;background:#0f172a;color:#fff;">All</button>
    ${tags.map(t=>`<button onclick="igApiFilter('${t}')" id="api-tag-${t}" style="padding:.35rem .875rem;font-size:.72rem;font-weight:600;border:none;cursor:pointer;background:${tagColors[t]||'#64748b'}22;color:${tagColors[t]||'#64748b'};border:1px solid ${tagColors[t]||'#64748b'}44;">${t}</button>`).join('')}
    <input type="text" placeholder="🔍 Search endpoints..." oninput="igApiSearch(this.value)" style="margin-left:auto;border:1px solid var(--border);padding:.35rem .75rem;font-size:.78rem;min-width:200px;">
  </div>

  <!-- Endpoint List -->
  <div id="api-endpoint-list">
    ${endpoints.map((e,i)=>`
    <div class="api-endpoint-row" data-tag="${e.tag}" style="background:#fff;border:1px solid var(--border);margin-bottom:.5rem;overflow:hidden;">
      <div onclick="igApiToggle(${i})" style="display:flex;align-items:center;gap:.75rem;padding:.875rem 1.25rem;cursor:pointer;">
        <span style="background:${methodColor[e.method]||'#64748b'};color:#fff;font-size:.6rem;font-weight:800;letter-spacing:.1em;padding:.2rem .55rem;min-width:42px;text-align:center;flex-shrink:0;">${e.method}</span>
        <code style="font-size:.82rem;color:var(--ink);font-weight:600;flex:1;">${e.path}</code>
        <span style="background:${tagColors[e.tag]||'#64748b'}22;color:${tagColors[e.tag]||'#64748b'};font-size:.6rem;font-weight:700;padding:.2rem .5rem;letter-spacing:.08em;text-transform:uppercase;flex-shrink:0;">${e.tag}</span>
        <span style="background:${e.auth==='None'?'#f0fdf4':'#fff7ed'};color:${e.auth==='None'?'#15803d':'#9a3412'};border:1px solid ${e.auth==='None'?'#bbf7d0':'#fed7aa'};font-size:.6rem;font-weight:600;padding:.2rem .5rem;flex-shrink:0;">${e.auth==='None'?'Public':e.auth}</span>
        <i class="fas fa-chevron-down" id="api-arr-${i}" style="color:var(--ink-muted);font-size:.6rem;flex-shrink:0;transition:transform .2s;"></i>
      </div>
      <div id="api-detail-${i}" style="display:none;border-top:1px solid var(--border);background:#f8fafc;padding:1.25rem;">
        <div style="margin-bottom:.875rem;"><span style="font-size:.68rem;font-weight:700;color:var(--ink-muted);letter-spacing:.1em;text-transform:uppercase;">Description</span><div style="font-size:.85rem;color:var(--ink);margin-top:.3rem;">${e.desc}</div></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
          <div>
            <span style="font-size:.68rem;font-weight:700;color:var(--ink-muted);letter-spacing:.1em;text-transform:uppercase;">Request</span>
            <div style="background:#0f172a;color:#e2e8f0;font-size:.75rem;font-family:monospace;padding:.875rem;margin-top:.4rem;border-radius:2px;">
              ${e.method} ${e.path}<br>
              Content-Type: application/json<br>
              ${e.auth!=='None'?'Authorization: Bearer {token}':'// No auth required'}
            </div>
          </div>
          <div>
            <span style="font-size:.68rem;font-weight:700;color:var(--ink-muted);letter-spacing:.1em;text-transform:uppercase;">Response (200)</span>
            <div style="background:#0f172a;color:#e2e8f0;font-size:.75rem;font-family:monospace;padding:.875rem;margin-top:.4rem;border-radius:2px;">
              {<br>
              &nbsp;&nbsp;"success": true,<br>
              ${e.tag==='Finance'?'&nbsp;&nbsp;"data": { ... },':''}
              ${e.tag==='Auth'?'&nbsp;&nbsp;"redirect": "/portal/...",':''}
              ${e.tag==='HR'?'&nbsp;&nbsp;"ref": "LV-XXXXX",':''}
              &nbsp;&nbsp;"timestamp": "2025-03-05T..."<br>
              }
            </div>
          </div>
        </div>
        <div style="margin-top:.875rem;display:flex;gap:.5rem;">
          <button onclick="igToast('Try It: ${e.method} ${e.path} → 200 OK (demo)','success')" style="background:#0f172a;color:#38bdf8;border:1px solid #38bdf833;padding:.35rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;"><i class="fas fa-play" style="margin-right:.3rem;font-size:.6rem;"></i>Try it</button>
          <button onclick="igToast('cURL command copied','success')" style="background:none;border:1px solid var(--border);padding:.35rem .875rem;font-size:.72rem;cursor:pointer;color:var(--ink-muted);"><i class="fas fa-terminal" style="margin-right:.3rem;font-size:.6rem;"></i>cURL</button>
        </div>
      </div>
    </div>`).join('')}
  </div>

  <!-- Versioning & Rate Limits -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;margin-top:1.5rem;">
    <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
      <div style="font-size:.82rem;font-weight:700;color:var(--ink);margin-bottom:.875rem;letter-spacing:.06em;text-transform:uppercase;">Rate Limits</div>
      ${[
        {endpoint:'Auth endpoints',limit:'5 req/min per IP',action:'429 + lockout 15 min'},
        {endpoint:'Public enquiry',limit:'10 req/hour per IP',action:'429 response'},
        {endpoint:'Admin APIs',limit:'100 req/min',action:'429 + audit log'},
        {endpoint:'Portal APIs',limit:'60 req/min per session',action:'429 response'},
      ].map(r=>`<div style="display:flex;align-items:flex-start;gap:.625rem;padding:.5rem 0;border-bottom:1px solid var(--border);">
        <i class="fas fa-tachometer-alt" style="color:#d97706;font-size:.7rem;margin-top:.2rem;flex-shrink:0;"></i>
        <div style="flex:1;">
          <div style="font-size:.78rem;font-weight:600;color:var(--ink);">${r.endpoint}</div>
          <div style="font-size:.68rem;color:var(--ink-muted);">${r.limit} · ${r.action}</div>
        </div>
      </div>`).join('')}
    </div>
    <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
      <div style="font-size:.82rem;font-weight:700;color:var(--ink);margin-bottom:.875rem;letter-spacing:.06em;text-transform:uppercase;">Versioning & Changelog</div>
      ${[
        {v:'2025.03',date:'05 Mar 2025',change:'Sales Force Engine, CMS v2, Phase 6 all modules live'},
        {v:'2025.02',date:'28 Feb 2025',change:'BI dashboards, HORECA inventory+vendor, Finance e-invoice'},
        {v:'2025.01',date:'15 Feb 2025',change:'HR payroll builder, Governance voting engine, KYC upload'},
        {v:'2024.12',date:'01 Jan 2025',change:'Client portal, Employee portal, Board portal initial release'},
      ].map(v=>`<div style="display:flex;align-items:flex-start;gap:.625rem;padding:.5rem 0;border-bottom:1px solid var(--border);">
        <span style="background:#0f172a;color:#38bdf8;font-size:.6rem;font-weight:800;padding:.15rem .45rem;flex-shrink:0;border-radius:2px;">${v.v}</span>
        <div style="flex:1;">
          <div style="font-size:.72rem;color:var(--ink);">${v.change}</div>
          <div style="font-size:.62rem;color:var(--ink-muted);">${v.date}</div>
        </div>
      </div>`).join('')}
    </div>
  </div>

  <!-- GraphQL Playground -->
  <div style="background:#fff;border:1px solid var(--border);margin-top:1.5rem;">
    <div style="background:linear-gradient(135deg,#0f172a,#1e293b);padding:1.25rem;display:flex;align-items:center;justify-content:space-between;">
      <div>
        <div style="font-size:.6rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#e879f9;margin-bottom:.3rem;">GraphQL</div>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:#fff;">Interactive GraphQL Playground</div>
        <div style="font-size:.72rem;color:rgba(255,255,255,.4);margin-top:.2rem;">Endpoint: <code style="color:#a78bfa;">https://india-gully.pages.dev/api/graphql</code> · Schema Version 2025.03</div>
      </div>
      <div style="display:flex;gap:.5rem;">
        <span style="background:rgba(168,85,247,.2);border:1px solid rgba(168,85,247,.4);color:#d8b4fe;font-size:.7rem;padding:.3rem .75rem;">Schema: v2025.03</span>
        <button onclick="igToast('GraphQL schema SDL downloaded','success')" style="background:#7c3aed;color:#fff;border:none;padding:.4rem .9rem;font-size:.72rem;font-weight:700;cursor:pointer;"><i class="fas fa-download" style="margin-right:.3rem;"></i>Download SDL</button>
      </div>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:0;border-top:1px solid var(--border);">
      <!-- Query Editor -->
      <div style="border-right:1px solid var(--border);">
        <div style="padding:.625rem 1rem;background:#f8f9fa;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
          <span style="font-size:.72rem;font-weight:700;color:#7c3aed;letter-spacing:.08em;text-transform:uppercase;">Query Editor</span>
          <div style="display:flex;gap:.4rem;">
            <button onclick="igGqlRun()" style="background:#7c3aed;color:#fff;border:none;padding:.3rem .75rem;font-size:.72rem;font-weight:600;cursor:pointer;"><i class="fas fa-play" style="margin-right:.3rem;font-size:.6rem;"></i>Run Query</button>
            <button onclick="igGqlPrettify()" style="background:none;border:1px solid var(--border);padding:.3rem .6rem;font-size:.68rem;cursor:pointer;color:var(--ink-muted);" title="Prettify"><i class="fas fa-magic"></i></button>
          </div>
        </div>
        <textarea id="gql-editor" style="width:100%;min-height:280px;font-family:monospace;font-size:.78rem;background:#0f172a;color:#e2e8f0;border:none;padding:1rem;resize:vertical;outline:none;line-height:1.7;">query GetFinanceSummary {
  financeSummary {
    revenueYTD
    expensesYTD
    netProfit
    gstPayable
  }
}

query GetEmployees($dept: String) {
  employees(department: $dept) {
    id
    name
    designation
    ctc
    status
  }
}

mutation CreateInvoice($input: InvoiceInput!) {
  createInvoice(input: $input) {
    id
    irn
    total
    status
  }
}</textarea>
        <!-- Variables -->
        <div style="padding:.5rem 1rem;background:#f8f9fa;border-top:1px solid var(--border);font-size:.68rem;font-weight:700;color:var(--ink-muted);text-transform:uppercase;letter-spacing:.08em;">Query Variables</div>
        <textarea id="gql-vars" style="width:100%;height:80px;font-family:monospace;font-size:.75rem;background:#0f172a;color:#a78bfa;border:none;padding:.875rem;resize:vertical;outline:none;">{ "dept": "Finance" }</textarea>
      </div>
      <!-- Response Panel -->
      <div>
        <div style="padding:.625rem 1rem;background:#f8f9fa;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
          <span style="font-size:.72rem;font-weight:700;color:#16a34a;letter-spacing:.08em;text-transform:uppercase;">Response</span>
          <button onclick="document.getElementById('gql-response').textContent='// Run a query to see results'" style="background:none;border:none;cursor:pointer;font-size:.68rem;color:var(--ink-muted);" title="Clear"><i class="fas fa-times"></i></button>
        </div>
        <pre id="gql-response" style="min-height:380px;font-family:monospace;font-size:.75rem;background:#0f172a;color:#4ade80;margin:0;padding:1rem;overflow:auto;line-height:1.7;">// Click "Run Query" to execute against demo schema
// Auth header required for protected fields:
// Authorization: Bearer {your-token}

// Available types:
// Query { financeSummary, employees, invoices, compliance, mandates }
// Mutation { createInvoice, applyLeave, createVoucher }
// Subscription { onInvoiceApproved, onLeaveApproved } (coming soon)</pre>
      </div>
    </div>
    <!-- Schema Explorer -->
    <div style="border-top:1px solid var(--border);padding:1.25rem;">
      <div style="font-size:.78rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--ink-muted);margin-bottom:.875rem;">Schema Types</div>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap;">
        ${['Query','Mutation','FinanceSummary','Employee','Invoice','LeaveRequest','Compliance','Mandate','Voucher','Contract','BoardResolution'].map(t=>`<button onclick="igGqlLoadType('${t}')" style="background:rgba(124,58,237,.1);color:#7c3aed;border:1px solid rgba(124,58,237,.3);padding:.3rem .75rem;font-size:.72rem;cursor:pointer;font-weight:500;">${t}</button>`).join('')}
      </div>
    </div>
  </div>

  <script>
  window.igApiToggle = function(idx){
    var d=document.getElementById('api-detail-'+idx);
    var a=document.getElementById('api-arr-'+idx);
    if(d.style.display==='none'){ d.style.display='block'; if(a) a.style.transform='rotate(180deg)'; }
    else { d.style.display='none'; if(a) a.style.transform=''; }
  };
  window.igApiFilter = function(tag){
    document.querySelectorAll('.api-endpoint-row').forEach(function(r){
      r.style.display=(!tag||r.dataset.tag===tag)?'block':'none';
    });
  };
  window.igApiSearch = function(q){
    q=q.toLowerCase();
    document.querySelectorAll('.api-endpoint-row').forEach(function(r){
      r.style.display=r.textContent.toLowerCase().includes(q)?'block':'none';
    });
  };
  // ── GraphQL playground helpers ──
  var gqlSchemas = {
    'Query':'type Query {\\n  financeSummary: FinanceSummary\\n  employees(department: String): [Employee]\\n  invoices(status: String): [Invoice]\\n  compliance: [ComplianceItem]\\n  mandates: [Mandate]\\n}',
    'Mutation':'type Mutation {\\n  createInvoice(input: InvoiceInput!): Invoice\\n  applyLeave(input: LeaveInput!): LeaveRequest\\n  createVoucher(input: VoucherInput!): Voucher\\n}',
    'FinanceSummary':'type FinanceSummary {\\n  revenueYTD: Float\\n  expensesYTD: Float\\n  netProfit: Float\\n  gstPayable: Float\\n  bankBalance: Float\\n}',
    'Employee':'type Employee {\\n  id: ID!\\n  name: String!\\n  designation: String\\n  department: String\\n  ctc: Float\\n  status: String\\n}',
    'Invoice':'type Invoice {\\n  id: ID!\\n  client: String\\n  amount: Float\\n  gst: Float\\n  total: Float\\n  irn: String\\n  status: String\\n  dueDate: String\\n}',
  };
  var gqlDemoResponses = {
    'financeSummary':'{\n  "data": {\n    "financeSummary": {\n      "revenueYTD": 8950000,\n      "expensesYTD": 5620000,\n      "netProfit": 3330000,\n      "gstPayable": 142000\n    }\n  }\n}',
    'employees':'{\n  "data": {\n    "employees": [\n      {"id":"IG-EMP-0001","name":"Arun Manikonda","designation":"CEO","ctc":3500000,"status":"Active"},\n      {"id":"IG-EMP-0002","name":"Pavan Manikonda","designation":"COO","ctc":2800000,"status":"Active"}\n    ]\n  }\n}',
    'default':'{\n  "data": {\n    "result": "Demo response — connect to live GraphQL endpoint for real data"\n  },\n  "extensions": {\n    "tracing": {"version":2025,"duration_ms":12}\n  }\n}',
  };
  window.igGqlRun = function(){
    var q=document.getElementById('gql-editor')?.value||'';
    var resp=document.getElementById('gql-response');
    if(!resp) return;
    var key='default';
    if(q.includes('financeSummary')) key='financeSummary';
    else if(q.includes('employees')) key='employees';
    resp.textContent='// Executing...\n';
    setTimeout(function(){ resp.textContent=gqlDemoResponses[key]||gqlDemoResponses['default']; resp.style.color='#4ade80'; },600);
    igToast('GraphQL query executed (demo mode)','success');
  };
  window.igGqlPrettify = function(){
    var ed=document.getElementById('gql-editor'); if(!ed) return;
    igToast('Query prettified','info');
  };
  window.igGqlLoadType = function(type){
    var resp=document.getElementById('gql-response'); if(!resp) return;
    resp.style.color='#a78bfa';
    resp.textContent=gqlSchemas[type]||'# Schema for '+type+' not yet defined in demo';
    igToast('Schema type '+type+' loaded','info');
  };
  </script>`
  return c.html(layout('API Reference', adminShell('API Reference', 'api-docs', body), {noNav:true,noFooter:true}))
})

// ── KPI / OKR TRACKER (/admin/kpi) ────────────────────────────────────────────
app.get('/kpi', (c) => {
  const okrs = [
    { dept:'Finance',    obj:'Achieve ₹15 Cr revenue in FY 2025',     progress:82, owner:'Arun Manikonda',
      krs:[
        {label:'Advisory revenue MTD',      target:'₹12.4L/mo',  actual:'₹12.4L', pct:100},
        {label:'Invoice collection rate',   target:'>90%',         actual:'87%',    pct:87},
        {label:'EBITDA margin',             target:'>35%',         actual:'37.1%',  pct:100},
        {label:'GST compliance — on time',  target:'100%',         actual:'100%',   pct:100},
      ], color:'#2563eb' },
    { dept:'Sales',      obj:'Close ₹25 Cr in new engagements FY25',  progress:70, owner:'Amit Jhingan',
      krs:[
        {label:'Pipeline value',            target:'₹50 Cr+',      actual:'₹52.4 Cr',pct:100},
        {label:'Lead to proposal rate',     target:'>50%',         actual:'43%',    pct:86},
        {label:'Proposals won',             target:'6 deals',      actual:'3 deals',pct:50},
        {label:'Avg deal closure time',     target:'<90 days',     actual:'104 days',pct:87},
      ], color:'#B8960C' },
    { dept:'HR',         obj:'Hire 5 key roles, 0% attrition FY25',   progress:60, owner:'Pavan Manikonda',
      krs:[
        {label:'Positions filled',          target:'5',            actual:'2',      pct:40},
        {label:'Employee satisfaction NPS', target:'>40',          actual:'52',     pct:100},
        {label:'Training hours/employee',   target:'40h/yr',       actual:'28h',    pct:70},
        {label:'Payroll accuracy',          target:'100%',         actual:'100%',   pct:100},
      ], color:'#7c3aed' },
    { dept:'Governance', obj:'100% statutory compliance, 4 board mtgs',progress:75, owner:'Arun Manikonda',
      krs:[
        {label:'Board meetings held',       target:'4/year',       actual:'2',      pct:50},
        {label:'ROC filings on time',       target:'100%',         actual:'100%',   pct:100},
        {label:'Resolutions passed',        target:'12',           actual:'7',      pct:58},
        {label:'DSC validity',              target:'All valid',    actual:'All valid',pct:100},
      ], color:'#16a34a' },
    { dept:'HORECA',     obj:'₹2 Cr HORECA revenue, 3 new hotel clients',progress:55, owner:'Amit Jhingan',
      krs:[
        {label:'Active hotel clients',      target:'3',            actual:'1',      pct:33},
        {label:'HORECA revenue YTD',        target:'₹2 Cr',        actual:'₹85L',   pct:43},
        {label:'PO conversion rate',        target:'>60%',         actual:'78%',    pct:100},
        {label:'Vendor onboarding',         target:'20 vendors',   actual:'14',     pct:70},
      ], color:'#d97706' },
  ]
  const body = `
  <!-- Overall OKR Health -->
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:1rem;margin-bottom:1.5rem;">
    ${okrs.map(o=>`<div style="background:#fff;border:1px solid var(--border);border-top:3px solid ${o.color};padding:1rem;">
      <div style="font-size:.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.35rem;">${o.dept}</div>
      <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:${o.color};line-height:1;margin-bottom:.5rem;">${o.progress}%</div>
      <div style="background:#f1f5f9;height:6px;border-radius:3px;overflow:hidden;">
        <div style="height:100%;background:${o.color};width:${o.progress}%;border-radius:3px;transition:width .6s;"></div>
      </div>
      <div style="font-size:.65rem;color:var(--ink-muted);margin-top:.35rem;">Progress to objective</div>
    </div>`).join('')}
  </div>

  <!-- Department OKR Cards -->
  ${okrs.map(o=>`
  <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.25rem;">
    <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);background:${o.color}08;display:flex;align-items:center;justify-content:space-between;">
      <div style="display:flex;align-items:center;gap:.75rem;">
        <div style="width:32px;height:32px;background:${o.color};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <i class="fas fa-${o.dept==='Finance'?'chart-bar':o.dept==='Sales'?'handshake':o.dept==='HR'?'user-friends':o.dept==='Governance'?'gavel':'boxes'}" style="color:#fff;font-size:.7rem;"></i>
        </div>
        <div>
          <div style="font-size:.85rem;font-weight:700;color:var(--ink);">${o.dept} — ${o.obj}</div>
          <div style="font-size:.68rem;color:var(--ink-muted);">Owner: ${o.owner} · FY 2024-25</div>
        </div>
      </div>
      <div style="text-align:right;">
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:${o.color};">${o.progress}%</div>
        <div style="font-size:.62rem;color:${o.progress>=80?'#16a34a':o.progress>=60?'#d97706':'#dc2626'};">${o.progress>=80?'On Track':o.progress>=60?'At Risk':'Behind'}</div>
      </div>
    </div>
    <div style="overflow-x:auto;">
      <table class="ig-tbl">
        <thead><tr><th>Key Result</th><th>Target</th><th>Actual</th><th>Progress</th><th>Status</th></tr></thead>
        <tbody>
          ${o.krs.map(k=>`<tr>
            <td style="font-size:.82rem;">${k.label}</td>
            <td style="font-size:.78rem;color:var(--ink-muted);">${k.target}</td>
            <td style="font-size:.82rem;font-weight:600;color:${o.color};">${k.actual}</td>
            <td>
              <div style="display:flex;align-items:center;gap:.5rem;">
                <div style="background:#f1f5f9;height:6px;border-radius:3px;overflow:hidden;width:80px;">
                  <div style="height:100%;background:${k.pct>=80?'#16a34a':k.pct>=60?'#d97706':'#dc2626'};width:${k.pct}%;"></div>
                </div>
                <span style="font-size:.72rem;font-weight:700;color:${k.pct>=80?'#16a34a':k.pct>=60?'#d97706':'#dc2626'};">${k.pct}%</span>
              </div>
            </td>
            <td><span class="badge ${k.pct>=80?'b-gr':k.pct>=60?'b-g':'b-re'}" style="font-size:.6rem;">${k.pct>=80?'On Track':k.pct>=60?'At Risk':'Behind'}</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>`).join('')}

  <!-- Add OKR -->
  <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;margin-top:1.25rem;">
    <div style="font-size:.82rem;font-weight:700;color:var(--ink);margin-bottom:.875rem;letter-spacing:.06em;text-transform:uppercase;">Add New OKR / Key Result</div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.875rem;">
      <div><label class="ig-label">Department</label><select class="ig-input" style="font-size:.82rem;"><option>Finance</option><option>Sales</option><option>HR</option><option>Governance</option><option>HORECA</option><option>Technology</option></select></div>
      <div style="grid-column:span 2;"><label class="ig-label">Objective</label><input type="text" class="ig-input" style="font-size:.82rem;" placeholder="e.g. Achieve 100% compliance across all statutory filings"></div>
      <div><label class="ig-label">Key Result / KPI</label><input type="text" id="okr-kr" class="ig-input" style="font-size:.82rem;" placeholder="e.g. GSTR-1 filed on time"></div>
      <div><label class="ig-label">Target</label><input type="text" id="okr-target" class="ig-input" style="font-size:.82rem;" placeholder="e.g. 100% or ₹5 Cr"></div>
      <div><label class="ig-label">Owner</label><select class="ig-input" style="font-size:.82rem;"><option>Arun Manikonda</option><option>Pavan Manikonda</option><option>Amit Jhingan</option></select></div>
    </div>
    <button onclick="igToast('OKR added to tracking dashboard','success')" style="background:var(--gold);color:#fff;border:none;padding:.5rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;margin-top:.875rem;"><i class="fas fa-plus" style="margin-right:.35rem;"></i>Add Key Result</button>
  </div>
<script>
/* ── KPI: load live KPI summary from API ── */
igApi.get('/kpi/summary').then(function(d){
  if(!d) return;
  var el=document.getElementById('kpi-health');
  if(el) el.textContent='Overall: '+d.overall_health+' · '+d.quarter;
});
igApi.get('/finance/summary').then(function(d){
  if(!d) return;
  var el=document.getElementById('kpi-rev-live');
  if(el) el.textContent='₹'+(d.revenue.mtd/100000).toFixed(1)+'L MTD';
});
</script>`
  return c.html(layout('KPI & OKR Tracker', adminShell('KPI & OKR Tracker', 'kpi', body), {noNav:true,noFooter:true}))
})

// ── MANDATE RISK SCORING (/admin/risk) ────────────────────────────────────────
app.get('/risk', (c) => {
  const mandates = [
    { id:'MND-001', name:'Entertainment Destination — Maharashtra', sector:'Entertainment', value:'₹4,500 Cr', score:72, factors:{regulatory:65,counterparty:80,timeline:70,financial:72,legal:75}, trend:'stable',   assigned:'Arun Manikonda' },
    { id:'MND-002', name:'Retail Leasing — Mumbai MMR',             sector:'Real Estate',   value:'₹2,100 Cr', score:88, factors:{regulatory:90,counterparty:85,timeline:95,financial:88,legal:82}, trend:'improving', assigned:'Amit Jhingan' },
    { id:'MND-003', name:'Heritage Hotel Portfolio — Rajasthan',    sector:'Hospitality',   value:'₹620 Cr',   score:61, factors:{regulatory:70,counterparty:55,timeline:60,financial:62,legal:58}, trend:'declining', assigned:'Arun Manikonda' },
    { id:'MND-004', name:'Luxury Resort Rollout — Rajasthan+Goa',   sector:'Hospitality',   value:'₹350 Cr',   score:79, factors:{regulatory:82,counterparty:78,timeline:75,financial:80,legal:80}, trend:'stable',    assigned:'Amit Jhingan' },
    { id:'MND-005', name:'Entertainment City — Delhi NCR',           sector:'Entertainment', value:'₹1,200 Cr', score:55, factors:{regulatory:45,counterparty:60,timeline:55,financial:58,legal:58}, trend:'declining', assigned:'Arun Manikonda' },
    { id:'MND-006', name:'Desi Brand — Retail Expansion',           sector:'Retail',        value:'₹45 Cr',    score:91, factors:{regulatory:95,counterparty:90,timeline:92,financial:88,legal:90}, trend:'improving', assigned:'Pavan Manikonda' },
  ]
  const riskBand = (s: number) => s>=80?{label:'Low Risk',c:'#16a34a'}:s>=65?{label:'Medium',c:'#d97706'}:{label:'High Risk',c:'#dc2626'}
  const body = `
  <!-- Risk Portfolio Summary -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">
    ${[
      {label:'Portfolio Value',     value:'₹8,815 Cr', sub:'6 active mandates', c:'#B8960C', icon:'chart-bar'},
      {label:'Low Risk',            value:mandates.filter(m=>m.score>=80).length.toString(), sub:'Score ≥80', c:'#16a34a', icon:'check-circle'},
      {label:'Medium Risk',         value:mandates.filter(m=>m.score>=65&&m.score<80).length.toString(), sub:'Score 65–79', c:'#d97706', icon:'exclamation-triangle'},
      {label:'High Risk',           value:mandates.filter(m=>m.score<65).length.toString(), sub:'Score <65 — action required', c:'#dc2626', icon:'fire'},
    ].map(s=>`<div style="background:#fff;border:1px solid var(--border);padding:1.1rem;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.5rem;">
        <div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);">${s.label}</div>
        <div style="width:28px;height:28px;background:${s.c};display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-${s.icon}" style="color:#fff;font-size:.6rem;"></i></div>
      </div>
      <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:${s.c};line-height:1;margin-bottom:.2rem;">${s.value}</div>
      <div style="font-size:.68rem;color:var(--ink-muted);">${s.sub}</div>
    </div>`).join('')}
  </div>

  <!-- Risk Score Cards -->
  <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:1.25rem;margin-bottom:1.5rem;">
    ${mandates.map(m=>{
      const rb = riskBand(m.score)
      return `<div style="background:#fff;border:1px solid var(--border);border-left:4px solid ${rb.c};">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;align-items:flex-start;justify-content:space-between;">
          <div>
            <div style="font-size:.72rem;font-weight:700;color:var(--gold);margin-bottom:.2rem;">${m.id} · ${m.sector}</div>
            <div style="font-size:.85rem;font-weight:600;color:var(--ink);">${m.name}</div>
            <div style="font-size:.68rem;color:var(--ink-muted);margin-top:.15rem;">₹ Value: ${m.value} · Owner: ${m.assigned}</div>
          </div>
          <div style="text-align:right;flex-shrink:0;margin-left:1rem;">
            <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2rem;color:${rb.c};line-height:1;">${m.score}</div>
            <div style="font-size:.6rem;font-weight:700;color:${rb.c};letter-spacing:.08em;text-transform:uppercase;">${rb.label}</div>
            <div style="font-size:.62rem;color:${m.trend==='improving'?'#16a34a':m.trend==='declining'?'#dc2626':'#64748b'};margin-top:.2rem;"><i class="fas fa-${m.trend==='improving'?'arrow-up':m.trend==='declining'?'arrow-down':'minus'}" style="font-size:.55rem;margin-right:.2rem;"></i>${m.trend}</div>
          </div>
        </div>
        <div style="padding:.875rem 1.25rem;">
          ${Object.entries(m.factors).map(([k,v])=>`<div style="display:flex;align-items:center;gap:.625rem;margin-bottom:.4rem;">
            <div style="font-size:.68rem;color:var(--ink-muted);width:90px;flex-shrink:0;text-transform:capitalize;">${k}</div>
            <div style="flex:1;background:#f1f5f9;height:5px;border-radius:3px;overflow:hidden;">
              <div style="height:100%;background:${v>=80?'#16a34a':v>=65?'#d97706':'#dc2626'};width:${v}%;"></div>
            </div>
            <div style="font-size:.68rem;font-weight:700;color:${v>=80?'#16a34a':v>=65?'#d97706':'#dc2626'};width:28px;text-align:right;">${v}</div>
          </div>`).join('')}
          <div style="display:flex;gap:.5rem;margin-top:.75rem;">
            <button onclick="igToast('Risk report for ${m.id} generated','success')" style="background:var(--gold);color:#fff;border:none;padding:.3rem .75rem;font-size:.68rem;font-weight:600;cursor:pointer;"><i class="fas fa-file-alt" style="margin-right:.3rem;"></i>Report</button>
            <button onclick="igToast('Mitigation plan opened for ${m.id}','success')" style="background:none;border:1px solid ${rb.c};color:${rb.c};padding:.3rem .75rem;font-size:.68rem;font-weight:600;cursor:pointer;">Mitigate</button>
          </div>
        </div>
      </div>`
    }).join('')}
  </div>

  <!-- Concentration Risk -->
  <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
    <div style="font-size:.85rem;font-weight:700;color:var(--ink);margin-bottom:1rem;letter-spacing:.06em;text-transform:uppercase;">Sector Concentration Risk</div>
    ${[
      {sector:'Entertainment',pct:65,value:'₹5,700 Cr',risk:'High Concentration',rc:'#dc2626'},
      {sector:'Real Estate',  pct:24,value:'₹2,100 Cr',risk:'Moderate',rc:'#d97706'},
      {sector:'Hospitality',  pct:11,value:'₹970 Cr',  risk:'Acceptable',rc:'#16a34a'},
      {sector:'Retail',       pct:1, value:'₹45 Cr',   risk:'Low',rc:'#16a34a'},
    ].map(s=>`<div style="margin-bottom:.875rem;">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:.3rem;">
        <span style="font-size:.78rem;font-weight:600;color:var(--ink);">${s.sector}</span>
        <div style="display:flex;align-items:center;gap:.75rem;">
          <span style="font-size:.72rem;font-weight:700;color:var(--gold);">${s.value} (${s.pct}%)</span>
          <span class="badge" style="background:${s.rc}22;color:${s.rc};border:1px solid ${s.rc}44;font-size:.58rem;">${s.risk}</span>
        </div>
      </div>
      <div style="background:#f1f5f9;height:10px;border-radius:3px;overflow:hidden;">
        <div style="height:100%;background:${s.rc};width:${s.pct}%;border-radius:3px;"></div>
      </div>
    </div>`).join('')}
    <div class="ig-warn" style="margin-top:1rem;"><i class="fas fa-exclamation-triangle"></i><div>Entertainment sector represents 65% of portfolio. Recommended max concentration: 40%. Consider diversification into Healthcare Real Estate or Infrastructure Advisory.</div></div>
  </div>
<script>
/* ── Risk: load live mandate risk data from API ── */
igApi.get('/risk/mandates').then(function(d){
  if(!d) return;
  var el=document.getElementById('risk-portfolio'); if(el) el.textContent=d.total_portfolio;
  var el2=document.getElementById('risk-high'); if(el2) el2.textContent=d.risk_distribution.high+' high risk';
  var el3=document.getElementById('risk-low');  if(el3) el3.textContent=d.risk_distribution.low+' low risk';
});
</script>`
  return c.html(layout('Mandate Risk Dashboard', adminShell('Risk Dashboard', 'risk', body), {noNav:true,noFooter:true}))
})

export default app
