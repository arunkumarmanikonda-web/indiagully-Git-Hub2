import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

// ── SHARED SHELL ──────────────────────────────────────────────────────────────
function adminShell(pageTitle: string, active: string, body: string) {
  const S = [
    { id:'dashboard',    icon:'tachometer-alt',  label:'Dashboard',      g:'Main'     },
    { id:'cms',          icon:'globe',           label:'CMS',            g:'Main'     },
    { id:'users',        icon:'users',           label:'Users',          g:'Main'     },
    { id:'workflows',    icon:'sitemap',         label:'Workflows',      g:'Main'     },
    { id:'finance',      icon:'chart-bar',       label:'Finance ERP',    g:'ERP'      },
    { id:'hr',           icon:'user-friends',    label:'HR ERP',         g:'ERP'      },
    { id:'governance',   icon:'gavel',           label:'Governance',     g:'ERP'      },
    { id:'horeca',       icon:'boxes',           label:'HORECA',         g:'ERP'      },
    { id:'contracts',    icon:'file-signature',  label:'Contracts',      g:'ERP'      },
    { id:'integrations', icon:'plug',            label:'Integrations',   g:'Platform' },
    { id:'reports',      icon:'chart-pie',       label:'BI & Reports',   g:'Platform' },
    { id:'config',       icon:'cog',             label:'System Config',  g:'Platform' },
    { id:'security',     icon:'shield-alt',      label:'Security Audit', g:'Platform' },
  ]
  const nav = ['Main','ERP','Platform'].map(g =>
    `<div class="sb-sec">${g}</div>` +
    S.filter(s => s.g === g).map(s =>
      `<a href="/admin/${s.id==='dashboard'?'dashboard':s.id}" class="sb-lk ${active===s.id?'on':''}">
        <i class="fas fa-${s.icon}" style="width:16px;font-size:.72rem;text-align:center;"></i>${s.label}
      </a>`
    ).join('')
  ).join('')
  return `
<div style="display:flex;height:100vh;overflow:hidden;background:#f7f7f7;">
  <aside style="width:220px;flex-shrink:0;background:#0A0A0A;display:flex;flex-direction:column;overflow-y:auto;">
    <a href="/admin/dashboard" style="padding:1.25rem;border-bottom:1px solid rgba(255,255,255,.07);display:block;flex-shrink:0;">
      <div class="f-serif" style="color:#fff;font-size:.85rem;letter-spacing:.07em;">INDIA GULLY</div>
      <div style="font-size:.5rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-top:2px;">Super Admin</div>
    </a>
    <nav style="flex:1;padding:.5rem;">${nav}</nav>
    <div style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07);flex-shrink:0;">
      <a href="/admin" class="sb-lk" style="color:#ef4444;"><i class="fas fa-sign-out-alt" style="width:16px;font-size:.72rem;text-align:center;"></i>Sign Out</a>
    </div>
  </aside>
  <main style="flex:1;overflow-y:auto;display:flex;flex-direction:column;">
    <div style="background:#fff;border-bottom:1px solid var(--border);padding:.875rem 1.75rem;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
      <div>
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--ink);">${pageTitle}</h2>
        <p style="font-size:.68rem;color:var(--ink-muted);">India Gully Enterprise · Super Admin Console</p>
      </div>
      <div style="display:flex;align-items:center;gap:.75rem;">
        <span style="font-size:.7rem;color:var(--ink-muted);">superadmin@indiagully.com</span>
        <div style="width:32px;height:32px;background:#6B1A1A;display:flex;align-items:center;justify-content:center;">
          <i class="fas fa-shield-alt" style="color:var(--gold);font-size:.75rem;"></i>
        </div>
      </div>
    </div>
    <div style="flex:1;padding:1.75rem;overflow-y:auto;">${body}</div>
  </main>
</div>`
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
      <div style="background:#fffbeb;border-bottom:1px solid #fde68a;padding:.875rem 1.5rem;display:flex;gap:.6rem;">
        <i class="fas fa-key" style="color:#d97706;font-size:.75rem;margin-top:.15rem;flex-shrink:0;"></i>
        <div><p style="font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#92400e;margin-bottom:.3rem;">Demo Access</p>
        <p style="font-size:.75rem;color:#78350f;line-height:1.7;"><strong>Username:</strong> <code style="background:#fef3c7;padding:1px 5px;font-size:.72rem;">superadmin@indiagully.com</code><br><strong>Password:</strong> <code style="background:#fef3c7;padding:1px 5px;font-size:.72rem;">Admin@IG2024!</code><br><strong>2FA Code:</strong> <code style="background:#fef3c7;padding:1px 5px;font-size:.72rem;">000000</code></p></div>
      </div>
      ${eb}
      <div style="padding:2rem;">
        <form method="POST" action="/api/auth/admin" style="display:flex;flex-direction:column;gap:1.1rem;">
          <div><label class="ig-label">Admin Username</label><input type="text" name="username" class="ig-input" required placeholder="admin@indiagully.com" autocomplete="off"></div>
          <div><label class="ig-label">Admin Password</label><input type="password" name="password" class="ig-input" required placeholder="••••••••••••••••"></div>
          <div><label class="ig-label">2FA Authentication Code</label><input type="text" name="totp" class="ig-input" required placeholder="6-digit TOTP" maxlength="6" autocomplete="off" inputmode="numeric"></div>
          <button type="submit" style="width:100%;padding:.875rem;background:#6B1A1A;color:#fff;font-size:.78rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:none;cursor:pointer;"><i class="fas fa-shield-alt" style="margin-right:.5rem;"></i>Authenticate & Enter</button>
        </form>
        <p style="text-align:center;font-size:.68rem;color:#ef4444;margin-top:1rem;">Unauthorised access is a criminal offence under IT Act 2000.</p>
      </div>
    </div>
    <div style="text-align:center;margin-top:1.5rem;"><a href="/portal" style="font-size:.78rem;color:rgba(255,255,255,.3);"><i class="fas fa-arrow-left" style="font-size:.6rem;"></i> Back to Portal Selection</a></div>
  </div>
</div>`
  return c.html(layout('Super Admin', content, { noNav:true, noFooter:true }))
})

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
app.get('/dashboard', (c) => {
  const body = `
  <div style="margin-bottom:1.5rem;">
    <h3 style="font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:1rem;">Finance Overview</h3>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;">
      ${[
        {label:'Revenue MTD',  value:'₹12.4L', trend:'↑ +8.3%',         icon:'chart-line', c:'#16a34a'},
        {label:'Receivables',  value:'₹34.8L', trend:'3 invoices due',   icon:'receipt',    c:'#d97706'},
        {label:'GST Payable',  value:'₹2.1L',  trend:'CGST+SGST',       icon:'percent',    c:'#dc2626'},
        {label:'Bank Balance', value:'₹56.2L', trend:'3 accounts',       icon:'university', c:'#2563eb'},
      ].map(s=>`<div class="am"><div style="display:flex;justify-content:space-between;margin-bottom:.625rem;"><span style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);">${s.label}</span><i class="fas fa-${s.icon}" style="color:${s.c};font-size:.7rem;"></i></div><div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:var(--ink);line-height:1;margin-bottom:.3rem;">${s.value}</div><div style="font-size:.7rem;color:${s.c};">${s.trend}</div></div>`).join('')}
    </div>
  </div>
  <div style="margin-bottom:1.5rem;">
    <h3 style="font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:1rem;">HR Overview</h3>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;">
      ${[
        {label:'Total Headcount',    value:'3',   trend:'Active employees',  icon:'users'},
        {label:"Today's Attendance", value:'3',   trend:'100% present',      icon:'check-circle'},
        {label:'Leave Pending',      value:'0',   trend:'No pending leaves', icon:'calendar'},
        {label:'Payroll Status',     value:'Feb', trend:'2025 — Processed',  icon:'money-bill'},
      ].map(s=>`<div class="am"><div style="display:flex;justify-content:space-between;margin-bottom:.625rem;"><span style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);">${s.label}</span><i class="fas fa-${s.icon}" style="color:var(--ink-faint);font-size:.7rem;"></i></div><div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:var(--ink);line-height:1;margin-bottom:.3rem;">${s.value}</div><div style="font-size:.7rem;color:var(--ink-muted);">${s.trend}</div></div>`).join('')}
    </div>
  </div>
  <h3 style="font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:1rem;">Platform Modules</h3>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.75rem;">
    ${[
      {id:'cms',        icon:'globe',          label:'CMS',           desc:'Edit website content, banners, SEO',    color:'#B8960C'},
      {id:'users',      icon:'users',          label:'User Management',desc:'Create, manage users & assign roles',  color:'#2563eb'},
      {id:'finance',    icon:'chart-bar',      label:'Finance ERP',   desc:'Vouchers, GST, P&L, reconciliation',   color:'#16a34a'},
      {id:'hr',         icon:'user-friends',   label:'HR ERP',        desc:'Payroll, attendance, leave, TDS',      color:'#d97706'},
      {id:'governance', icon:'gavel',          label:'Governance',    desc:'Board meetings, minutes, registers',   color:'#dc2626'},
      {id:'horeca',     icon:'boxes',          label:'HORECA',        desc:'SKUs, catalogue, quotes, procurement', color:'#0d9488'},
      {id:'contracts',  icon:'file-signature', label:'Contracts',     desc:'Templates, clause library, e-sign',   color:'#4f46e5'},
      {id:'security',   icon:'shield-alt',     label:'Security Audit',desc:'Access logs, RBAC, IP whitelist',      color:'#9f1239'},
    ].map(m=>`<a href="/admin/${m.id}" style="background:#fff;border:1px solid var(--border);padding:1.25rem;display:block;text-decoration:none;transition:border-color .2s,box-shadow .2s;" onmouseover="this.style.borderColor='${m.color}';this.style.boxShadow='0 4px 16px rgba(0,0,0,.07)'" onmouseout="this.style.borderColor='var(--border)';this.style.boxShadow='none'"><div style="width:36px;height:36px;background:${m.color};display:flex;align-items:center;justify-content:center;margin-bottom:.875rem;"><i class="fas fa-${m.icon}" style="color:#fff;font-size:.75rem;"></i></div><div style="font-size:.85rem;font-weight:600;color:var(--ink);margin-bottom:.25rem;">${m.label}</div><div style="font-size:.72rem;color:var(--ink-muted);line-height:1.5;">${m.desc}</div></a>`).join('')}
  </div>
  <div style="background:#fff;border:1px solid var(--border);">
    <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
      <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Recent Audit Log</h3>
      <a href="/admin/security" style="font-size:.72rem;color:var(--gold);">View Full Log →</a>
    </div>
    <table class="ig-tbl"><thead><tr><th>Timestamp</th><th>User</th><th>Action</th><th>Module</th><th>IP</th><th>Status</th></tr></thead>
    <tbody>
      ${[
        {ts:'2025-02-27 09:15', user:'superadmin@indiagully.com', action:'Login',           mod:'Auth',    ip:'103.21.x.x', ok:true},
        {ts:'2025-02-27 09:12', user:'akm@indiagully.com',        action:'Invoice Approved',mod:'Finance', ip:'49.36.x.x',  ok:true},
        {ts:'2025-02-27 08:55', user:'pavan@indiagully.com',      action:'Page Edit — Home',mod:'CMS',     ip:'49.36.x.x',  ok:true},
        {ts:'2025-02-26 18:42', user:'Unknown',                   action:'Failed Login',    mod:'Auth',    ip:'185.x.x.x',  ok:false},
        {ts:'2025-02-26 16:30', user:'akm@indiagully.com',        action:'Mandate Created', mod:'Listings',ip:'49.36.x.x',  ok:true},
      ].map(r=>`<tr><td style="font-size:.75rem;color:var(--ink-muted);">${r.ts}</td><td style="font-size:.78rem;font-weight:500;">${r.user}</td><td style="font-size:.78rem;">${r.action}</td><td><span class="badge b-dk">${r.mod}</span></td><td style="font-size:.72rem;color:var(--ink-muted);">${r.ip}</td><td><span class="badge ${r.ok?'b-gr':'b-re'}">${r.ok?'OK':'FAIL'}</span></td></tr>`).join('')}
    </tbody></table>
  </div>`
  return c.html(layout('Admin Dashboard', adminShell('Dashboard Overview', 'dashboard', body), {noNav:true,noFooter:true}))
})

// ── CMS ───────────────────────────────────────────────────────────────────────
app.get('/cms', (c) => {
  const pages = [
    {page:'Home Page',     slug:'/',         lastEdit:'27 Feb 2025', editor:'pavan@indiagully.com'},
    {page:'About Page',    slug:'/about',    lastEdit:'25 Feb 2025', editor:'akm@indiagully.com'},
    {page:'Services Page', slug:'/services', lastEdit:'20 Feb 2025', editor:'pavan@indiagully.com'},
    {page:'HORECA Page',   slug:'/horeca',   lastEdit:'18 Feb 2025', editor:'pavan@indiagully.com'},
    {page:'Listings Page', slug:'/listings', lastEdit:'26 Feb 2025', editor:'akm@indiagully.com'},
    {page:'Contact Page',  slug:'/contact',  lastEdit:'15 Feb 2025', editor:'pavan@indiagully.com'},
  ]
  const body = `
  <!-- Page Cards -->
  <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;margin-bottom:1.5rem;">
    ${pages.map((p,i)=>`
    <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:.75rem;">
        <div>
          <div style="font-weight:600;font-size:.9rem;color:var(--ink);">${p.page}</div>
          <div style="font-size:.72rem;color:var(--ink-muted);margin-top:.15rem;">Slug: <code style="background:var(--parch-dk);padding:1px 4px;">${p.slug}</code></div>
        </div>
        <span class="badge b-gr">Published</span>
      </div>
      <div style="font-size:.72rem;color:var(--ink-faint);margin-bottom:.875rem;">Last edited ${p.lastEdit} · ${p.editor}</div>
      <div style="display:flex;gap:.75rem;">
        <button onclick="togglePanel('cms-panel-${i}')" style="background:var(--gold);color:#fff;border:none;padding:.4rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;letter-spacing:.06em;text-transform:uppercase;">Edit Content</button>
        <a href="${p.slug}" target="_blank" style="display:inline-flex;align-items:center;gap:.3rem;font-size:.72rem;color:var(--ink-muted);padding:.4rem .875rem;border:1px solid var(--border);">Preview <i class="fas fa-external-link-alt" style="font-size:.6rem;"></i></a>
      </div>
      <div id="cms-panel-${i}" class="ig-panel" style="margin-top:1rem;">
        <h4 style="font-size:.82rem;font-weight:700;color:var(--ink);margin-bottom:1rem;letter-spacing:.06em;text-transform:uppercase;">${p.page} — Content Editor</h4>
        <div style="display:flex;flex-direction:column;gap:.875rem;">
          <div><label class="ig-label">Page Title / H1</label><input type="text" class="ig-input" value="${p.page}" style="font-size:.875rem;"></div>
          <div><label class="ig-label">Meta Description</label><textarea class="ig-input" rows="2" style="font-size:.82rem;min-height:60px;">India Gully — ${p.page.replace(' Page','')} section. Advisory services across Real Estate, Retail, Hospitality and Entertainment.</textarea></div>
          <div><label class="ig-label">Hero Headline</label><input type="text" class="ig-input" value="Celebrating Desiness" style="font-size:.875rem;"></div>
          <div><label class="ig-label">Hero Subheading</label><textarea class="ig-input" rows="2" style="font-size:.82rem;min-height:60px;">India's premier multi-vertical advisory firm across Real Estate, Retail, Hospitality and Entertainment.</textarea></div>
          <div style="display:flex;gap:.75rem;">
            <button onclick="igToast('${p.page} saved successfully ✓','success');togglePanel('cms-panel-${i}')" style="background:var(--gold);color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;">Save Changes</button>
            <button onclick="igToast('Draft saved','success')" style="background:var(--ink);color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;">Save Draft</button>
            <button onclick="togglePanel('cms-panel-${i}')" style="background:none;border:1px solid var(--border);padding:.55rem 1.25rem;font-size:.78rem;cursor:pointer;color:var(--ink-muted);">Cancel</button>
          </div>
        </div>
      </div>
    </div>`).join('')}
  </div>
  <!-- SEO Table -->
  <div style="background:#fff;border:1px solid var(--border);">
    <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
      <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">SEO & Meta Tags</h3>
      <button onclick="igToast('All SEO tags saved','success')" style="background:var(--gold);color:#fff;border:none;padding:.35rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;letter-spacing:.06em;text-transform:uppercase;">Save All</button>
    </div>
    <table class="ig-tbl"><thead><tr><th>Page</th><th>Title</th><th>Keywords</th><th>OG Image</th><th>Actions</th></tr></thead><tbody>
      ${[
        {page:'Home',     title:'India Gully — Celebrating Desiness',        kw:'real estate advisory, hospitality consulting, India'},
        {page:'About',    title:'About India Gully — Leadership & Mission',   kw:'Arun Manikonda, India Gully team, advisory firm'},
        {page:'Listings', title:'Active Mandates — India Gully',              kw:'investment mandates, ₹10000 Cr pipeline, India'},
        {page:'HORECA',   title:'HORECA Solutions — India Gully',             kw:'hotel procurement, restaurant supplies, HORECA India'},
      ].map(r=>`<tr>
        <td style="font-weight:500;">${r.page}</td>
        <td><input type="text" value="${r.title}" style="border:1px solid var(--border);padding:.35rem .5rem;font-size:.78rem;width:100%;"></td>
        <td><input type="text" value="${r.kw}" style="border:1px solid var(--border);padding:.35rem .5rem;font-size:.78rem;width:100%;"></td>
        <td><span style="font-size:.72rem;color:var(--gold);">og.jpg</span></td>
        <td><button onclick="igToast('SEO for ${r.page} saved','success')" style="background:var(--gold);color:#fff;border:none;padding:.3rem .6rem;font-size:.68rem;font-weight:600;cursor:pointer;">Save</button></td>
      </tr>`).join('')}
    </tbody></table>
  </div>`
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
      <div><label class="ig-label">Full Name</label><input type="text" class="ig-input" placeholder="Full Name"></div>
      <div><label class="ig-label">Email Address</label><input type="email" class="ig-input" placeholder="user@indiagully.com"></div>
      <div><label class="ig-label">Role</label><select class="ig-input"><option>Client</option><option>Employee</option><option>KMP</option><option>Director</option><option>Admin</option></select></div>
      <div><label class="ig-label">Portal Access</label><select class="ig-input"><option>Client</option><option>Employee</option><option>Board & KMP</option><option>Admin</option></select></div>
      <div><label class="ig-label">Temporary Password</label><input type="text" class="ig-input" value="TempPass@2025!" readonly></div>
      <div><label class="ig-label">Force Password Reset?</label><select class="ig-input"><option>Yes — on first login</option><option>No</option></select></div>
    </div>
    <div style="display:flex;gap:.75rem;margin-top:1rem;">
      <button onclick="igToast('User created! Welcome email sent.','success');togglePanel('add-user-panel')" style="background:var(--gold);color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;">Create User</button>
      <button onclick="togglePanel('add-user-panel')" style="background:none;border:1px solid var(--border);padding:.55rem 1.25rem;font-size:.78rem;cursor:pointer;color:var(--ink-muted);">Cancel</button>
    </div>
  </div>

  <!-- User Table -->
  <div style="background:#fff;border:1px solid var(--border);">
    <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">All Users</h3></div>
    <table class="ig-tbl"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Portal</th><th>Last Login</th><th>Status</th><th>Actions</th></tr></thead><tbody>
    ${users.map((u,i)=>`<tr>
      <td style="font-weight:500;">${u.name}</td>
      <td style="font-size:.8rem;">${u.email}</td>
      <td><span class="badge b-dk">${u.role}</span></td>
      <td style="font-size:.8rem;color:var(--ink-muted);">${u.portal}</td>
      <td style="font-size:.78rem;color:var(--ink-muted);">${u.login}</td>
      <td><span class="badge ${u.active?'b-gr':'b-re'}">${u.active?'Active':'Inactive'}</span></td>
      <td style="display:flex;gap:.5rem;flex-wrap:wrap;">
        <button onclick="togglePanel('edit-user-${i}')" style="background:none;border:1px solid var(--border);padding:.25rem .6rem;font-size:.68rem;cursor:pointer;color:var(--gold);">Edit</button>
        <button onclick="igConfirm('Send password reset email to ${u.email}?',function(){ igToast('Reset email sent to ${u.email}','success'); })" style="background:none;border:1px solid var(--border);padding:.25rem .6rem;font-size:.68rem;cursor:pointer;color:var(--ink-muted);">Reset PW</button>
        ${u.active?`<button onclick="igConfirm('Deactivate ${u.name}?',function(){ igToast('${u.name} deactivated','warn'); })" style="background:none;border:1px solid #fecaca;padding:.25rem .6rem;font-size:.68rem;cursor:pointer;color:#dc2626;">Deactivate</button>`:''}
      </td>
    </tr>
    <tr id="edit-user-${i}" style="display:none;"><td colspan="7" style="background:var(--parch-dk);padding:1.25rem;">
      <h4 style="font-size:.78rem;font-weight:700;letter-spacing:.07em;text-transform:uppercase;margin-bottom:.875rem;">Edit — ${u.name}</h4>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:.875rem;">
        <div><label class="ig-label">Full Name</label><input type="text" class="ig-input" value="${u.name}" style="font-size:.82rem;"></div>
        <div><label class="ig-label">Email</label><input type="email" class="ig-input" value="${u.email}" style="font-size:.82rem;"></div>
        <div><label class="ig-label">Role</label><select class="ig-input" style="font-size:.82rem;"><option ${u.role==='Super Admin'?'selected':''}>Super Admin</option><option ${u.role==='Director'?'selected':''}>Director</option><option ${u.role==='KMP'?'selected':''}>KMP</option><option ${u.role==='Client'?'selected':''}>Client</option><option ${u.role==='Employee'?'selected':''}>Employee</option></select></div>
      </div>
      <div style="display:flex;gap:.75rem;margin-top:.875rem;">
        <button onclick="igToast('User ${u.name} updated','success');this.closest('tr').style.display='none'" style="background:var(--gold);color:#fff;border:none;padding:.45rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;">Save Changes</button>
        <button onclick="this.closest('tr').style.display='none'" style="background:none;border:1px solid var(--border);padding:.45rem 1rem;font-size:.72rem;cursor:pointer;color:var(--ink-muted);">Cancel</button>
      </div>
    </td></tr>`).join('')}
    </tbody></table>
  </div>`
  return c.html(layout('User Management', adminShell('User Management', 'users', body), {noNav:true,noFooter:true}))
})

// ── WORKFLOWS ─────────────────────────────────────────────────────────────────
app.get('/workflows', (c) => {
  const WF = [
    {id:'wf0', name:'Invoice Approval',      steps:['Submit Invoice','Finance Review','Director Approval','GST Filing','Archive'],    trigger:'Amount > ₹50,000', active:true},
    {id:'wf1', name:'Mandate Onboarding',    steps:['Enquiry Received','KYC Verification','NDA Execution','Engagement Letter','Active'],trigger:'New client enquiry', active:true},
    {id:'wf2', name:'Leave Approval',        steps:['Employee Request','Reporting Manager','HR Confirmation','Attendance Update'],      trigger:'Leave request submitted', active:true},
    {id:'wf3', name:'Contract Renewal',      steps:['Auto Alert 30d','Legal Review','Director Sign','Archive'],                         trigger:'30 days before expiry', active:false},
    {id:'wf4', name:'Vendor Onboarding',     steps:['Vendor Request','Compliance Check','Finance Approval','Active Vendor'],            trigger:'New vendor form', active:true},
    {id:'wf5', name:'Board Resolution',      steps:['Draft Resolution','Director Review','Vote','File with ROC'],                       trigger:'Board meeting scheduled', active:true},
  ]
  const body = `
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;">
    ${WF.map((w,i)=>`
    <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
      <div style="display:flex;justify-content:space-between;margin-bottom:.75rem;">
        <h4 style="font-size:.875rem;font-weight:600;color:var(--ink);">${w.name}</h4>
        <span class="badge ${w.active?'b-gr':'b-re'}">${w.active?'Active':'Paused'}</span>
      </div>
      <!-- Step visual -->
      <div style="display:flex;gap:.2rem;margin-bottom:.75rem;flex-wrap:wrap;">
        ${w.steps.map((s,si)=>`<span style="font-size:.62rem;background:${w.active?'#dbeafe':'#f1f5f9'};color:${w.active?'#1d4ed8':'#475569'};padding:2px 6px;border-radius:2px;">${si+1}. ${s}</span>`).join('')}
      </div>
      <p style="font-size:.72rem;color:var(--ink-faint);margin-bottom:.875rem;">Trigger: ${w.trigger}</p>
      <div style="display:flex;gap:.5rem;">
        <button onclick="togglePanel('wf-edit-${i}')" style="font-size:.72rem;background:none;border:1px solid var(--border);padding:.3rem .75rem;cursor:pointer;color:var(--gold);">Edit Flow</button>
        <button onclick="igConfirm('${w.active?'Pause':'Activate'} the ${w.name} workflow?',function(){ igToast('${w.name} ${w.active?'paused':'activated'}','${w.active?'warn':'success'}'); })" style="font-size:.72rem;background:none;border:1px solid var(--border);padding:.3rem .75rem;cursor:pointer;color:var(--ink-muted);">${w.active?'Pause':'Activate'}</button>
      </div>
      <div id="wf-edit-${i}" class="ig-panel" style="margin-top:.875rem;">
        <label class="ig-label">Workflow Name</label>
        <input type="text" class="ig-input" value="${w.name}" style="font-size:.82rem;margin-bottom:.75rem;">
        <label class="ig-label">Trigger Condition</label>
        <input type="text" class="ig-input" value="${w.trigger}" style="font-size:.82rem;margin-bottom:.75rem;">
        <label class="ig-label">SLA (hours per step)</label>
        <input type="number" class="ig-input" value="24" style="font-size:.82rem;margin-bottom:.875rem;">
        <div style="display:flex;gap:.5rem;">
          <button onclick="igToast('Workflow ${w.name} saved','success');togglePanel('wf-edit-${i}')" style="background:var(--gold);color:#fff;border:none;padding:.4rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;">Save</button>
          <button onclick="togglePanel('wf-edit-${i}')" style="background:none;border:1px solid var(--border);padding:.4rem .875rem;font-size:.72rem;cursor:pointer;color:var(--ink-muted);">Cancel</button>
        </div>
      </div>
    </div>`).join('')}
  </div>`
  return c.html(layout('Workflows', adminShell('Workflow Engine', 'workflows', body), {noNav:true,noFooter:true}))
})

// ── FINANCE ERP ───────────────────────────────────────────────────────────────
app.get('/finance', (c) => {
  const body = `
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">
    ${[{label:'Revenue MTD',value:'₹12.4L',trend:'↑ +8.3%',c:'#16a34a'},{label:'Expenses MTD',value:'₹7.8L',trend:'↓ -2.1%',c:'#dc2626'},{label:'Net Profit',value:'₹4.6L',trend:'37.1% margin',c:'#2563eb'},{label:'GST Liability',value:'₹2.1L',trend:'Due 20 Mar',c:'#d97706'}].map(s=>`<div class="am"><div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.5rem;">${s.label}</div><div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:var(--ink);line-height:1;margin-bottom:.3rem;">${s.value}</div><div style="font-size:.7rem;color:${s.c};">${s.trend}</div></div>`).join('')}
  </div>

  <!-- New Invoice Panel -->
  <div style="margin-bottom:1rem;">
    <button onclick="togglePanel('new-inv-panel')" style="background:var(--gold);color:#fff;border:none;padding:.5rem 1.1rem;font-size:.78rem;font-weight:600;cursor:pointer;letter-spacing:.07em;text-transform:uppercase;display:inline-flex;align-items:center;gap:.4rem;"><i class="fas fa-plus"></i>Create New Invoice</button>
  </div>
  <div id="new-inv-panel" class="ig-panel" style="margin-bottom:1.5rem;">
    <h4 style="font-size:.82rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:1rem;">New Invoice</h4>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;">
      <div><label class="ig-label">Client Name</label><select class="ig-input"><option>Demo Client Corp</option><option>Rajasthan Hotels Pvt Ltd</option><option>Mumbai Mall Pvt Ltd</option></select></div>
      <div><label class="ig-label">Invoice Date</label><input type="date" class="ig-input" value="2025-02-27"></div>
      <div><label class="ig-label">Due Date</label><input type="date" class="ig-input" value="2025-03-27"></div>
      <div><label class="ig-label">Description</label><input type="text" class="ig-input" placeholder="Advisory Retainer — Feb 2025"></div>
      <div><label class="ig-label">Amount (excl. GST) ₹</label><input type="number" class="ig-input" placeholder="0.00" id="inv-amt" oninput="document.getElementById('inv-gst').value=(this.value*0.18).toFixed(2);document.getElementById('inv-total').value=(this.value*1.18).toFixed(2)"></div>
      <div><label class="ig-label">GST @ 18% ₹</label><input type="number" class="ig-input" id="inv-gst" placeholder="0.00" readonly></div>
      <div><label class="ig-label">Total Amount ₹</label><input type="number" class="ig-input" id="inv-total" placeholder="0.00" readonly style="font-weight:700;color:var(--gold);"></div>
      <div><label class="ig-label">HSN/SAC Code</label><input type="text" class="ig-input" value="998313" placeholder="998313"></div>
      <div><label class="ig-label">Payment Terms</label><select class="ig-input"><option>Net 30 Days</option><option>Net 15 Days</option><option>Immediate</option></select></div>
    </div>
    <div style="display:flex;gap:.75rem;margin-top:1rem;">
      <button onclick="igToast('Invoice INV-2025-00'+(Math.floor(Math.random()*9)+4)+' created & emailed to client','success');togglePanel('new-inv-panel')" style="background:var(--gold);color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;">Create & Send Invoice</button>
      <button onclick="igToast('Draft saved','success')" style="background:var(--ink);color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;">Save as Draft</button>
      <button onclick="togglePanel('new-inv-panel')" style="background:none;border:1px solid var(--border);padding:.55rem 1.25rem;font-size:.78rem;cursor:pointer;color:var(--ink-muted);">Cancel</button>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1.5rem;">
    <!-- Invoices -->
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Invoice Register</h3></div>
      <table class="ig-tbl"><thead><tr><th>Invoice</th><th>Client</th><th>Amount</th><th>Due</th><th>Status</th><th>Action</th></tr></thead><tbody>
        ${[
          {inv:'INV-2025-001',client:'Demo Client',amount:'₹2.5L',due:'15 Mar',status:'Paid',   cls:'b-gr'},
          {inv:'INV-2025-002',client:'Demo Client',amount:'₹1.8L',due:'28 Feb',status:'Overdue',cls:'b-re'},
          {inv:'INV-2025-003',client:'Pending Corp',amount:'₹3.2L',due:'31 Mar',status:'Draft', cls:'b-dk'},
        ].map(r=>`<tr>
          <td style="font-size:.82rem;font-weight:500;color:var(--gold);">${r.inv}</td>
          <td style="font-size:.8rem;">${r.client}</td>
          <td style="font-family:'DM Serif Display',Georgia,serif;">${r.amount}</td>
          <td style="font-size:.78rem;color:var(--ink-muted);">${r.due}</td>
          <td><span class="badge ${r.cls}">${r.status}</span></td>
          <td>
            <button onclick="igToast('Invoice ${r.inv} PDF generated','success')" style="background:none;border:none;cursor:pointer;font-size:.72rem;color:var(--gold);padding:0;"><i class="fas fa-download"></i></button>
            ${r.status!=='Paid'?`<button onclick="igConfirm('Mark ${r.inv} as Paid?',function(){ igToast('${r.inv} marked as Paid','success'); })" style="background:none;border:none;cursor:pointer;font-size:.68rem;color:#16a34a;padding:0;margin-left:.5rem;">Mark Paid</button>`:''}
          </td>
        </tr>`).join('')}
      </tbody></table>
    </div>
    <!-- GST -->
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">GST Summary — Feb 2025</h3>
        <button onclick="igToast('GSTR-3B filed for February 2025','success')" style="background:#16a34a;color:#fff;border:none;padding:.3rem .75rem;font-size:.68rem;font-weight:600;cursor:pointer;">File GSTR-3B</button>
      </div>
      <div style="padding:1.25rem;">
        ${[
          {label:'CGST Collected',  value:'₹1.05L',c:'#16a34a'},
          {label:'SGST Collected',  value:'₹1.05L',c:'#16a34a'},
          {label:'CGST Paid (ITC)', value:'₹0.82L',c:'#dc2626'},
          {label:'SGST Paid (ITC)', value:'₹0.82L',c:'#dc2626'},
          {label:'Net GST Payable', value:'₹0.46L',c:'#d97706'},
        ].map(g=>`<div style="display:flex;justify-content:space-between;padding:.625rem 0;border-bottom:1px solid var(--border);"><span style="font-size:.82rem;color:var(--ink-muted);">${g.label}</span><span style="font-family:'DM Serif Display',Georgia,serif;color:${g.c};">${g.value}</span></div>`).join('')}
        <button onclick="igToast('GSTR-1 report downloaded','success')" style="margin-top:1rem;background:var(--ink);color:#fff;border:none;padding:.45rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;display:block;width:100%;"><i class="fas fa-download" style="margin-right:.4rem;"></i>Download GSTR-1 Report</button>
      </div>
    </div>
  </div>

  <!-- Financial Reports -->
  <div style="background:#fff;border:1px solid var(--border);padding:1rem 1.25rem;">
    <h4 style="font-size:.78rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.875rem;">Financial Reports</h4>
    <div style="display:flex;gap:.75rem;flex-wrap:wrap;">
      ${['P&L Statement','Balance Sheet','Cash Flow','Bank Reconciliation','TDS Certificates','Expense Report'].map(r=>
        `<button onclick="igToast('${r} generated — check Downloads','success')" style="background:var(--parch-dk);border:1px solid var(--border);padding:.5rem 1rem;font-size:.78rem;font-weight:500;color:var(--ink);cursor:pointer;display:flex;align-items:center;gap:.4rem;"><i class="fas fa-file-alt" style="color:var(--gold);font-size:.7rem;"></i>${r}</button>`
      ).join('')}
    </div>
  </div>`
  return c.html(layout('Finance ERP', adminShell('Finance ERP', 'finance', body), {noNav:true,noFooter:true}))
})

// ── HR ERP ────────────────────────────────────────────────────────────────────
app.get('/hr', (c) => {
  const body = `
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">
    ${[{label:'Total Employees',value:'3',c:'#2563eb'},{label:'Present Today',value:'3',c:'#16a34a'},{label:'On Leave',value:'0',c:'#d97706'},{label:'Payroll Due',value:'Mar',c:'#7c3aed'}].map(s=>`<div class="am"><div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.5rem;">${s.label}</div><div style="font-family:'DM Serif Display',Georgia,serif;font-size:2rem;color:${s.c};">${s.value}</div></div>`).join('')}
  </div>
  <div style="display:grid;grid-template-columns:2fr 1fr;gap:1.5rem;margin-bottom:1.5rem;">
    <!-- Employee table -->
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Employee Directory</h3>
        <button onclick="togglePanel('add-emp-panel')" style="background:var(--gold);color:#fff;border:none;padding:.3rem .75rem;font-size:.68rem;font-weight:600;cursor:pointer;">+ Add Employee</button>
      </div>
      <div id="add-emp-panel" class="ig-panel" style="margin:.5rem 1rem;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;">
          <div><label class="ig-label">Full Name</label><input type="text" class="ig-input" placeholder="Full Name" style="font-size:.82rem;"></div>
          <div><label class="ig-label">Designation</label><input type="text" class="ig-input" placeholder="Job Title" style="font-size:.82rem;"></div>
          <div><label class="ig-label">Department</label><select class="ig-input" style="font-size:.82rem;"><option>Leadership</option><option>Operations</option><option>Advisory</option><option>Finance</option><option>HR</option></select></div>
          <div><label class="ig-label">Date of Joining</label><input type="date" class="ig-input" style="font-size:.82rem;"></div>
          <div><label class="ig-label">Employee Email</label><input type="email" class="ig-input" placeholder="emp@indiagully.com" style="font-size:.82rem;"></div>
          <div><label class="ig-label">CTC (Annual ₹)</label><input type="number" class="ig-input" placeholder="1200000" style="font-size:.82rem;"></div>
        </div>
        <div style="display:flex;gap:.75rem;margin-top:.875rem;">
          <button onclick="igToast('Employee added. Credentials emailed.','success');togglePanel('add-emp-panel')" style="background:var(--gold);color:#fff;border:none;padding:.45rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;">Save Employee</button>
          <button onclick="togglePanel('add-emp-panel')" style="background:none;border:1px solid var(--border);padding:.45rem 1rem;font-size:.72rem;cursor:pointer;color:var(--ink-muted);">Cancel</button>
        </div>
      </div>
      <table class="ig-tbl"><thead><tr><th>Employee</th><th>Designation</th><th>Dept</th><th>Join Date</th><th>Status</th><th>Action</th></tr></thead><tbody>
        ${[
          {name:'Arun Manikonda', des:'Managing Director',    dept:'Leadership', join:'01 Apr 2017'},
          {name:'Pavan Manikonda',des:'Executive Director',   dept:'Operations', join:'01 Apr 2017'},
          {name:'Amit Jhingan',   des:'President, Real Estate',dept:'Advisory',  join:'01 Jan 2020'},
        ].map(e=>`<tr>
          <td style="font-weight:500;">${e.name}</td>
          <td style="font-size:.82rem;">${e.des}</td>
          <td><span class="badge b-dk">${e.dept}</span></td>
          <td style="font-size:.78rem;color:var(--ink-muted);">${e.join}</td>
          <td><span class="badge b-gr">Active</span></td>
          <td>
            <button onclick="igToast('Payslip for ${e.name} generated','success')" style="background:none;border:1px solid var(--border);padding:.25rem .6rem;font-size:.68rem;cursor:pointer;color:var(--gold);">Payslip</button>
          </td>
        </tr>`).join('')}
      </tbody></table>
    </div>
    <!-- Leave Requests -->
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Leave Requests</h3></div>
      <div style="padding:1.5rem;text-align:center;"><i class="fas fa-check-circle" style="color:#16a34a;font-size:2.5rem;display:block;margin-bottom:.75rem;"></i><p style="font-size:.875rem;font-weight:500;color:var(--ink);">No Pending Requests</p><p style="font-size:.78rem;color:var(--ink-muted);margin-top:.25rem;">All leave requests are cleared</p></div>
    </div>
  </div>
  <!-- Payroll Run -->
  <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
    <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);margin-bottom:1rem;">Run Payroll — March 2025</h3>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:1rem;">
      ${[
        {name:'Arun Manikonda', gross:'₹1,50,000',tds:'₹15,000',pf:'₹18,000',net:'₹1,17,000'},
        {name:'Pavan Manikonda',gross:'₹1,25,000',tds:'₹10,000',pf:'₹15,000',net:'₹1,00,000'},
        {name:'Amit Jhingan',  gross:'₹1,75,000',tds:'₹20,000',pf:'₹21,000',net:'₹1,34,000'},
      ].map(p=>`<div style="background:var(--parch-dk);border:1px solid var(--border);padding:1rem;">
        <div style="font-weight:600;font-size:.875rem;color:var(--ink);margin-bottom:.5rem;">${p.name}</div>
        <div style="font-size:.75rem;color:var(--ink-muted);line-height:1.8;">Gross: <strong>${p.gross}</strong><br>TDS: ${p.tds} · PF: ${p.pf}<br>Net Pay: <strong style="color:var(--gold);">${p.net}</strong></div>
      </div>`).join('')}
    </div>
    <div style="display:flex;gap:.75rem;flex-wrap:wrap;">
      <button onclick="igToast('Payroll for March 2025 processed. Bank transfer initiated.','success')" style="background:#16a34a;color:#fff;border:none;padding:.6rem 1.5rem;font-size:.82rem;font-weight:600;cursor:pointer;letter-spacing:.06em;text-transform:uppercase;"><i class="fas fa-check" style="margin-right:.4rem;"></i>Process Payroll</button>
      <button onclick="igToast('Payslips sent to all employees','success')" style="background:var(--ink);color:#fff;border:none;padding:.6rem 1.5rem;font-size:.82rem;font-weight:600;cursor:pointer;">Email Payslips</button>
      <button onclick="igToast('Attendance report downloaded','success')" style="background:none;border:1px solid var(--border);padding:.6rem 1.5rem;font-size:.82rem;font-weight:500;cursor:pointer;color:var(--ink);"><i class="fas fa-download" style="margin-right:.4rem;"></i>Attendance Report</button>
      <button onclick="igToast('Form-16 bundle generated for all employees','success')" style="background:none;border:1px solid var(--border);padding:.6rem 1.5rem;font-size:.82rem;font-weight:500;cursor:pointer;color:var(--ink);">Generate Form-16</button>
    </div>
  </div>`
  return c.html(layout('HR ERP', adminShell('HR ERP', 'hr', body), {noNav:true,noFooter:true}))
})

// ── GOVERNANCE ────────────────────────────────────────────────────────────────
app.get('/governance', (c) => {
  const body = `
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">
    ${[{label:'Directors',value:'2',c:'#1E1E1E'},{label:'KMPs',value:'3',c:'#2563eb'},{label:'Pending Resolutions',value:'2',c:'#d97706'},{label:'Next Filing',value:'31 Mar',c:'#dc2626'}].map(s=>`<div class="am"><div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.5rem;">${s.label}</div><div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:${s.c};">${s.value}</div></div>`).join('')}
  </div>

  <!-- Schedule Meeting -->
  <div style="margin-bottom:1rem;">
    <button onclick="togglePanel('sched-meeting')" style="background:#1E1E1E;color:#fff;border:none;padding:.5rem 1.1rem;font-size:.78rem;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:.4rem;letter-spacing:.07em;text-transform:uppercase;"><i class="fas fa-calendar-plus"></i>Schedule Board Meeting</button>
  </div>
  <div id="sched-meeting" class="ig-panel" style="margin-bottom:1.5rem;">
    <h4 style="font-size:.82rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:1rem;">Schedule New Board Meeting</h4>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;">
      <div><label class="ig-label">Meeting Type</label><select class="ig-input"><option>Board Meeting</option><option>EGM</option><option>AGM</option><option>Committee Meeting</option></select></div>
      <div><label class="ig-label">Meeting Date</label><input type="date" class="ig-input"></div>
      <div><label class="ig-label">Time</label><input type="time" class="ig-input" value="11:00"></div>
      <div><label class="ig-label">Venue</label><input type="text" class="ig-input" placeholder="Registered Office, New Delhi" value="Registered Office, New Delhi"></div>
      <div><label class="ig-label">Mode</label><select class="ig-input"><option>In-Person</option><option>Video Conference</option><option>Hybrid</option></select></div>
      <div><label class="ig-label">Quorum Required</label><input type="text" class="ig-input" value="2 Directors" readonly></div>
    </div>
    <div><label class="ig-label" style="margin-top:.75rem;">Agenda Items</label><textarea class="ig-input" rows="3" placeholder="1. Approval of Q1 Financial Statements&#10;2. Review of Active Mandates&#10;3. Any Other Business"></textarea></div>
    <div style="display:flex;gap:.75rem;margin-top:1rem;">
      <button onclick="igToast('Board meeting scheduled. Notice sent to all directors.','success');togglePanel('sched-meeting')" style="background:#1E1E1E;color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;">Schedule & Notify Directors</button>
      <button onclick="togglePanel('sched-meeting')" style="background:none;border:1px solid var(--border);padding:.55rem 1.25rem;font-size:.78rem;cursor:pointer;color:var(--ink-muted);">Cancel</button>
    </div>
  </div>

  <!-- Compliance Calendar -->
  <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
    <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;">
      <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Compliance Calendar</h3>
      <button onclick="igToast('Compliance calendar exported to CSV','success')" style="background:none;border:1px solid var(--border);padding:.3rem .75rem;font-size:.68rem;cursor:pointer;color:var(--gold);"><i class="fas fa-download" style="margin-right:.3rem;"></i>Export</button>
    </div>
    <table class="ig-tbl"><thead><tr><th>Due Date</th><th>Filing / Event</th><th>Form</th><th>Responsible</th><th>Penalty</th><th>Status</th><th>Action</th></tr></thead><tbody>
      ${[
        {date:'15 Mar 2025', event:'Board Meeting — Q1 Review',     form:'§173',   resp:'Board', pen:'₹5K–25K', status:'Scheduled',cls:'b-gr'},
        {date:'31 Mar 2025', event:'Annual Accounts Filing',        form:'AOC-4',  resp:'CS/CFO',pen:'₹1K/day',status:'Due',      cls:'b-g'},
        {date:'30 Apr 2025', event:'Annual Return Filing',          form:'MGT-7A', resp:'CS',    pen:'₹200/day',status:'Upcoming', cls:'b-dk'},
        {date:'30 Jun 2025', event:'Income Tax Return',             form:'ITR-6',  resp:'CFO',   pen:'₹5,000',  status:'Upcoming', cls:'b-dk'},
        {date:'30 Sep 2025', event:'Secretarial Audit',             form:'MR-3',   resp:'CS',    pen:'₹1L+',    status:'Upcoming', cls:'b-dk'},
      ].map(r=>`<tr>
        <td style="font-size:.82rem;font-weight:500;white-space:nowrap;">${r.date}</td>
        <td style="font-size:.85rem;">${r.event}</td>
        <td><span class="badge b-dk">${r.form}</span></td>
        <td style="font-size:.8rem;color:var(--ink-muted);">${r.resp}</td>
        <td style="font-size:.75rem;color:#dc2626;">${r.pen}</td>
        <td><span class="badge ${r.cls}">${r.status}</span></td>
        <td><button onclick="igToast('${r.event} — reminder sent to responsible party','success')" style="background:none;border:1px solid var(--border);padding:.2rem .5rem;font-size:.65rem;cursor:pointer;color:var(--gold);">Remind</button></td>
      </tr>`).join('')}
    </tbody></table>
  </div>

  <!-- Statutory Registers -->
  <div style="background:#fff;border:1px solid var(--border);padding:1rem 1.25rem;">
    <h4 style="font-size:.78rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.875rem;">Statutory Registers</h4>
    <div style="display:flex;gap:.75rem;flex-wrap:wrap;">
      ${['Register of Directors','Register of KMPs','Register of Members','Register of Charges','Register of Contracts','Meeting Minutes Archive'].map(r=>
        `<button onclick="igToast('${r} opened for viewing','success')" style="background:var(--parch-dk);border:1px solid var(--border);padding:.5rem 1rem;font-size:.78rem;font-weight:500;color:var(--ink);cursor:pointer;display:flex;align-items:center;gap:.4rem;"><i class="fas fa-book" style="color:#1E1E1E;font-size:.7rem;"></i>${r}</button>`
      ).join('')}
    </div>
  </div>`
  return c.html(layout('Governance', adminShell('Governance & Compliance', 'governance', body), {noNav:true,noFooter:true}))
})

// ── HORECA ────────────────────────────────────────────────────────────────────
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
  const body = `
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">
    ${[{label:'SKU Categories',value:'8',c:'#0d9488'},{label:'Active Vendors',value:'14',c:'#2563eb'},{label:'Open Quotes',value:'3',c:'#d97706'},{label:'Orders This Mo.',value:'7',c:'#16a34a'}].map(s=>`<div class="am"><div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.5rem;">${s.label}</div><div style="font-family:'DM Serif Display',Georgia,serif;font-size:2rem;color:${s.c};">${s.value}</div></div>`).join('')}
  </div>

  <!-- Add SKU Panel -->
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
      <div><label class="ig-label">Preferred Vendor</label><input type="text" class="ig-input" placeholder="Vendor name" style="font-size:.82rem;"></div>
    </div>
    <div style="display:flex;gap:.75rem;margin-top:1rem;">
      <button onclick="igToast('SKU added to catalogue','success');togglePanel('add-sku-panel')" style="background:#0d9488;color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;">Add to Catalogue</button>
      <button onclick="togglePanel('add-sku-panel')" style="background:none;border:1px solid var(--border);padding:.55rem 1.25rem;font-size:.78rem;cursor:pointer;color:var(--ink-muted);">Cancel</button>
    </div>
  </div>

  <!-- Category Grid -->
  <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
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

  <!-- Quote Builder -->
  <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;">
      <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Quick Quote Builder</h3>
      <button onclick="igToast('Quote PDF generated and ready to send','success')" style="background:#0d9488;color:#fff;border:none;padding:.4rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;">Generate Quote PDF</button>
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
      <div><label class="ig-label">Project Name / Hotel</label><input type="text" class="ig-input" placeholder="e.g. Bijolai Palace, Jodhpur" style="font-size:.82rem;"></div>
      <div><label class="ig-label">No. of Rooms</label><input type="number" class="ig-input" placeholder="100" style="font-size:.82rem;"></div>
      <div><label class="ig-label">Categories Required</label><select class="ig-input" multiple style="font-size:.82rem;height:80px;">${cats.map(c=>`<option>${c.cat}</option>`).join('')}</select></div>
      <div><label class="ig-label">Delivery Timeline</label><select class="ig-input" style="font-size:.82rem;"><option>30 Days</option><option>45 Days</option><option>60 Days</option><option>90 Days</option></select></div>
    </div>
  </div>`
  return c.html(layout('HORECA Inventory', adminShell('HORECA Inventory Management', 'horeca', body), {noNav:true,noFooter:true}))
})

// ── CONTRACTS ─────────────────────────────────────────────────────────────────
app.get('/contracts', (c) => {
  const contracts = [
    {id:'AGR-001', name:'Advisory Agreement FY2025',       party:'Demo Client Corp',  type:'Advisory',    start:'01 Jan 2025',expiry:'31 Dec 2025',status:'Active',   cls:'b-gr'},
    {id:'PMC-001', name:'Hotel PMC Agreement',              party:'Rajasthan Hotels',  type:'PMC',         start:'15 Feb 2025',expiry:'14 Feb 2026',status:'Active',   cls:'b-gr'},
    {id:'MND-001', name:'Retail Leasing Mandate',           party:'Mumbai Mall Pvt.', type:'Mandate',     start:'01 Dec 2024',expiry:'30 Nov 2025',status:'Active',   cls:'b-gr'},
    {id:'RET-001', name:'EY Advisory Retainer',             party:'Ernst & Young',    type:'Retainer',    start:'01 Apr 2024',expiry:'31 Mar 2025',status:'Expiring', cls:'b-g'},
    {id:'MOU-001', name:'CBRE Co-Advisory MOU',             party:'CBRE India',       type:'MOU',         start:'01 Jan 2025',expiry:'31 Dec 2025',status:'Active',   cls:'b-gr'},
    {id:'NDA-001', name:'NDA — Entertainment Project',      party:'Confidential',     type:'NDA',         start:'01 Feb 2025',expiry:'01 Feb 2026',status:'Active',   cls:'b-gr'},
  ]
  const templates = ['Advisory Services Agreement','Hotel Management Pre-Opening Contract','Retail Leasing Mandate','Non-Disclosure Agreement (NDA)','Memorandum of Understanding (MOU)','Engagement Letter']
  const body = `
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">
    ${[{label:'Active Contracts',value:'6',c:'#16a34a'},{label:'Drafts',value:'2',c:'#d97706'},{label:'Expiring 30 Days',value:'1',c:'#dc2626'},{label:'Templates',value:'6',c:'#4f46e5'}].map(s=>`<div class="am"><div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.5rem;">${s.label}</div><div style="font-family:'DM Serif Display',Georgia,serif;font-size:2rem;color:${s.c};">${s.value}</div></div>`).join('')}
  </div>

  <!-- New Contract -->
  <div style="margin-bottom:1rem;">
    <button onclick="togglePanel('new-contract-panel')" style="background:#4f46e5;color:#fff;border:none;padding:.5rem 1.1rem;font-size:.78rem;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:.4rem;letter-spacing:.07em;text-transform:uppercase;"><i class="fas fa-plus"></i>New Contract</button>
  </div>
  <div id="new-contract-panel" class="ig-panel" style="margin-bottom:1.5rem;">
    <h4 style="font-size:.82rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:1rem;">Create New Contract</h4>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;">
      <div><label class="ig-label">Contract Title</label><input type="text" class="ig-input" placeholder="Contract name" style="font-size:.82rem;"></div>
      <div><label class="ig-label">Party Name</label><input type="text" class="ig-input" placeholder="Counter-party name" style="font-size:.82rem;"></div>
      <div><label class="ig-label">Contract Type</label><select class="ig-input" style="font-size:.82rem;"><option>Advisory</option><option>PMC</option><option>Mandate</option><option>Retainer</option><option>MOU</option><option>NDA</option></select></div>
      <div><label class="ig-label">Start Date</label><input type="date" class="ig-input" style="font-size:.82rem;"></div>
      <div><label class="ig-label">End Date</label><input type="date" class="ig-input" style="font-size:.82rem;"></div>
      <div><label class="ig-label">Use Template</label><select class="ig-input" style="font-size:.82rem;"><option>-- Select Template --</option>${templates.map(t=>`<option>${t}</option>`).join('')}</select></div>
    </div>
    <div style="display:flex;gap:.75rem;margin-top:1rem;">
      <button onclick="igToast('Contract draft created. Sent for review.','success');togglePanel('new-contract-panel')" style="background:#4f46e5;color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;">Create Draft</button>
      <button onclick="togglePanel('new-contract-panel')" style="background:none;border:1px solid var(--border);padding:.55rem 1.25rem;font-size:.78rem;cursor:pointer;color:var(--ink-muted);">Cancel</button>
    </div>
  </div>

  <!-- Contract Table -->
  <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
    <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Active Contracts</h3></div>
    <table class="ig-tbl"><thead><tr><th>ID</th><th>Contract Name</th><th>Party</th><th>Type</th><th>Expiry</th><th>Status</th><th>Actions</th></tr></thead><tbody>
      ${contracts.map(r=>`<tr>
        <td style="font-size:.78rem;font-weight:600;color:var(--gold);">${r.id}</td>
        <td style="font-weight:500;font-size:.85rem;">${r.name}</td>
        <td style="font-size:.8rem;">${r.party}</td>
        <td><span class="badge b-dk">${r.type}</span></td>
        <td style="font-size:.78rem;color:var(--ink-muted);">${r.expiry}</td>
        <td><span class="badge ${r.cls}">${r.status}</span></td>
        <td style="display:flex;gap:.4rem;flex-wrap:wrap;">
          <button onclick="igToast('${r.name} PDF opened','success')" style="background:none;border:1px solid var(--border);padding:.22rem .55rem;font-size:.65rem;cursor:pointer;color:var(--gold);"><i class="fas fa-eye"></i> View</button>
          <button onclick="igToast('${r.name} downloaded','success')" style="background:none;border:1px solid var(--border);padding:.22rem .55rem;font-size:.65rem;cursor:pointer;color:var(--ink-muted);"><i class="fas fa-download"></i></button>
          ${r.status==='Expiring'?`<button onclick="igToast('Renewal workflow triggered for ${r.name}','warn')" style="background:#d97706;color:#fff;border:none;padding:.22rem .55rem;font-size:.65rem;cursor:pointer;">Renew</button>`:''}
        </td>
      </tr>`).join('')}
    </tbody></table>
  </div>

  <!-- Template Library -->
  <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
    <h4 style="font-size:.78rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.875rem;">Template Library</h4>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.75rem;">
      ${templates.map(t=>`<div style="background:var(--parch-dk);border:1px solid var(--border);padding:1rem;display:flex;align-items:center;justify-content:space-between;">
        <span style="font-size:.82rem;font-weight:500;color:var(--ink);">${t}</span>
        <div style="display:flex;gap:.4rem;">
          <button onclick="igToast('${t} template opened for editing','success')" style="background:none;border:1px solid var(--border);padding:.22rem .55rem;font-size:.65rem;cursor:pointer;color:var(--gold);">Edit</button>
          <button onclick="igToast('${t} downloaded','success')" style="background:none;border:1px solid var(--border);padding:.22rem .55rem;font-size:.65rem;cursor:pointer;color:var(--ink-muted);"><i class="fas fa-download"></i></button>
        </div>
      </div>`).join('')}
    </div>
  </div>`
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
  </div>`
  return c.html(layout('Integrations', adminShell('Integrations & API Keys', 'integrations', body), {noNav:true,noFooter:true}))
})

// ── BI & REPORTS ──────────────────────────────────────────────────────────────
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
  </div>`
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

// ── SECURITY AUDIT ────────────────────────────────────────────────────────────
app.get('/security', (c) => {
  const logs = [
    {ts:'2025-02-27 09:15:22', user:'superadmin@indiagully.com', action:'Login Success',       mod:'Auth',     ip:'103.21.x.x', ua:'Chrome/Win',  ok:true},
    {ts:'2025-02-27 09:12:01', user:'akm@indiagully.com',        action:'Invoice Approved',    mod:'Finance',  ip:'49.36.x.x',  ua:'Safari/Mac',  ok:true},
    {ts:'2025-02-27 08:55:34', user:'pavan@indiagully.com',      action:'Page Edit — Home',    mod:'CMS',      ip:'49.36.x.x',  ua:'Chrome/Win',  ok:true},
    {ts:'2025-02-26 22:14:53', user:'demo@indiagully.com',       action:'Client Login',        mod:'Auth',     ip:'115.99.x.x', ua:'Chrome/And',  ok:true},
    {ts:'2025-02-26 18:42:15', user:'Unknown',                   action:'Failed Login (x2)',   mod:'Auth',     ip:'185.x.x.x',  ua:'curl/7.68',   ok:false},
    {ts:'2025-02-26 16:30:00', user:'akm@indiagully.com',        action:'Mandate Created',     mod:'Listings', ip:'49.36.x.x',  ua:'Chrome/Win',  ok:true},
    {ts:'2025-02-25 14:22:10', user:'pavan@indiagully.com',      action:'Contract Uploaded',   mod:'Contracts',ip:'49.36.x.x',  ua:'Safari/Mac',  ok:true},
    {ts:'2025-02-25 11:05:44', user:'superadmin@indiagully.com', action:'User Role Changed',   mod:'Users',    ip:'103.21.x.x', ua:'Chrome/Win',  ok:true},
    {ts:'2025-02-24 09:30:00', user:'emp@indiagully.com',        action:'Employee Login',      mod:'Auth',     ip:'182.65.x.x', ua:'Firefox/Win', ok:true},
    {ts:'2025-02-23 16:45:00', user:'Unknown',                   action:'Brute Force Attempt', mod:'Auth',     ip:'91.x.x.x',   ua:'Python/3.11', ok:false},
  ]
  const body = `
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">
    ${[{label:'Failed Logins (7d)',value:'3',c:'#dc2626'},{label:'Active Sessions',value:'1',c:'#16a34a'},{label:'IP Whitelist',value:'5',c:'#2563eb'},{label:'2FA Users',value:'8',c:'#7c3aed'}].map(s=>`<div class="am"><div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.5rem;">${s.label}</div><div style="font-family:'DM Serif Display',Georgia,serif;font-size:2rem;color:${s.c};">${s.value}</div></div>`).join('')}
  </div>
  <div style="display:grid;grid-template-columns:3fr 1fr;gap:1.5rem;">
    <!-- Audit Log -->
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Full Audit Log</h3>
        <button onclick="igToast('Audit log exported to CSV','success')" style="background:none;border:1px solid var(--border);padding:.3rem .75rem;font-size:.68rem;cursor:pointer;color:var(--gold);"><i class="fas fa-download" style="margin-right:.3rem;"></i>Export CSV</button>
      </div>
      <table class="ig-tbl"><thead><tr><th>Timestamp</th><th>User</th><th>Action</th><th>Module</th><th>IP</th><th>Browser</th><th>Status</th></tr></thead><tbody>
        ${logs.map(r=>`<tr ${!r.ok?'style="background:#fef2f2;"':''}>
          <td style="font-size:.72rem;color:var(--ink-muted);white-space:nowrap;">${r.ts}</td>
          <td style="font-size:.78rem;font-weight:500;">${r.user}</td>
          <td style="font-size:.78rem;">${r.action}</td>
          <td><span class="badge b-dk">${r.mod}</span></td>
          <td style="font-size:.72rem;color:var(--ink-muted);">${r.ip}</td>
          <td style="font-size:.72rem;color:var(--ink-muted);">${r.ua}</td>
          <td><span class="badge ${r.ok?'b-gr':'b-re'}">${r.ok?'OK':'FAIL'}</span></td>
        </tr>`).join('')}
      </tbody></table>
    </div>
    <!-- IP Whitelist -->
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">IP Whitelist</h3></div>
      <div style="padding:1.25rem;">
        ${['103.21.x.x — Admin Office','49.36.x.x — Directors','115.99.x.x — Client A','182.65.x.x — Employee A','103.55.x.x — Remote VPN'].map(ip=>`
        <div style="display:flex;justify-content:space-between;align-items:center;padding:.5rem 0;border-bottom:1px solid var(--border);">
          <span style="font-size:.78rem;color:var(--ink);">${ip}</span>
          <button onclick="igConfirm('Remove this IP from whitelist?',function(){ igToast('IP removed','warn'); })" style="background:none;border:none;cursor:pointer;color:#dc2626;font-size:.65rem;"><i class="fas fa-times"></i></button>
        </div>`).join('')}
        <div style="margin-top:.875rem;">
          <input type="text" class="ig-input" placeholder="Add new IP address" style="font-size:.82rem;margin-bottom:.5rem;">
          <button onclick="igToast('IP added to whitelist','success')" style="background:var(--gold);color:#fff;border:none;padding:.4rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;width:100%;">Add IP</button>
        </div>
      </div>
    </div>
  </div>`
  return c.html(layout('Security & Audit', adminShell('Security & Audit', 'security', body), {noNav:true,noFooter:true}))
})

export default app
