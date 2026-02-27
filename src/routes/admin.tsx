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
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.875rem;">
            <div><label class="ig-label">Page Title / H1</label><input type="text" class="ig-input" value="${p.page.replace(' Page','')}" style="font-size:.875rem;"></div>
            <div><label class="ig-label">URL Slug</label><input type="text" class="ig-input" value="${p.slug}" style="font-size:.875rem;"></div>
          </div>
          <div><label class="ig-label">Meta Title (SEO)</label><input type="text" class="ig-input" value="${p.page.replace(' Page','')} — India Gully · Celebrating Desiness" style="font-size:.82rem;"></div>
          <div><label class="ig-label">Meta Description</label><textarea class="ig-input" rows="2" style="font-size:.82rem;min-height:60px;">India Gully — ${p.page.replace(' Page','')} section. Advisory services across Real Estate, Retail, Hospitality and Entertainment.</textarea></div>
          <div><label class="ig-label">Hero Headline</label><input type="text" class="ig-input" value="Celebrating Desiness" style="font-size:.875rem;"></div>
          <div><label class="ig-label">Hero Subheading</label><textarea class="ig-input" rows="2" style="font-size:.82rem;min-height:60px;">India's premier multi-vertical advisory firm across Real Estate, Retail, Hospitality and Entertainment.</textarea></div>
          <div><label class="ig-label">Page Body Content (HTML allowed)</label><textarea class="ig-input" rows="4" style="font-size:.78rem;font-family:monospace;min-height:80px;" placeholder="<p>Page content here...</p>"></textarea></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.875rem;">
            <div><label class="ig-label">OG Image URL</label><input type="text" class="ig-input" value="https://india-gully.pages.dev/static/og.jpg" style="font-size:.78rem;"></div>
            <div><label class="ig-label">Status</label><select class="ig-input" style="font-size:.82rem;"><option>Published</option><option>Draft</option><option>Scheduled</option></select></div>
          </div>
          <div style="background:#fffbeb;border:1px solid #fde68a;padding:.75rem;font-size:.75rem;color:#78350f;display:flex;align-items:center;gap:.5rem;">
            <i class="fas fa-info-circle" style="color:#d97706;"></i>
            Last saved by <strong>${p.editor}</strong> on ${p.lastEdit}. Changes will go live immediately on save.
          </div>
          <div style="display:flex;gap:.75rem;">
            <button onclick="igCmsSave(${i},'${p.page}')" style="background:var(--gold);color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:.4rem;"><i class="fas fa-save" style="font-size:.65rem;"></i>Publish Changes</button>
            <button onclick="igToast('${p.page} saved as draft','success')" style="background:var(--ink);color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;">Save Draft</button>
            <a href="${p.slug}" target="_blank" style="display:inline-flex;align-items:center;gap:.3rem;font-size:.78rem;color:var(--ink-muted);padding:.55rem 1.25rem;border:1px solid var(--border);">Preview <i class="fas fa-external-link-alt" style="font-size:.6rem;"></i></a>
            <button onclick="togglePanel('cms-panel-${i}')" style="background:none;border:1px solid var(--border);padding:.55rem 1.25rem;font-size:.78rem;cursor:pointer;color:var(--ink-muted);">Close</button>
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
  </div>
  <script>
  function igCmsSave(idx, pageName){
    var btn = event.currentTarget;
    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin" style="margin-right:.4rem;font-size:.65rem;"></i>Publishing…';
    btn.disabled = true;
    setTimeout(function(){
      btn.innerHTML = '<i class="fas fa-check" style="margin-right:.4rem;font-size:.65rem;"></i>Published ✓';
      btn.style.background = '#15803d';
      igToast(pageName + ' published successfully. Changes are now live.', 'success');
      setTimeout(function(){
        btn.innerHTML = '<i class="fas fa-save" style="margin-right:.4rem;font-size:.65rem;"></i>Publish Changes';
        btn.style.background = 'var(--gold)';
        btn.disabled = false;
        togglePanel('cms-panel-'+idx);
      }, 2500);
    }, 1200);
  }
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
    <h4 style="font-size:.82rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;margin-bottom:1rem;">New Invoice — <span id="inv-num-preview">INV-2025-004</span></h4>
    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:1rem;">
      <div><label class="ig-label">Client Name</label><select class="ig-input"><option>Demo Client Corp</option><option>Rajasthan Hotels Pvt Ltd</option><option>Mumbai Mall Pvt Ltd</option></select></div>
      <div><label class="ig-label">Invoice Date</label><input type="date" class="ig-input" id="inv-date" value="2025-02-27"></div>
      <div><label class="ig-label">Due Date</label><input type="date" class="ig-input" id="inv-due" value="2025-03-27"></div>
      <div style="grid-column:span 3"><label class="ig-label">Description of Services</label><input type="text" class="ig-input" id="inv-desc" placeholder="Advisory Retainer — Feb 2025"></div>
      <div><label class="ig-label">Amount (excl. GST) ₹</label><input type="number" class="ig-input" placeholder="0.00" id="inv-amt" oninput="var a=parseFloat(this.value)||0;document.getElementById('inv-gst').value=(a*0.18).toFixed(2);document.getElementById('inv-total').value=(a*1.18).toFixed(2);document.getElementById('inv-cgst').textContent='₹'+(a*0.09).toFixed(2);document.getElementById('inv-sgst').textContent='₹'+(a*0.09).toFixed(2);document.getElementById('inv-total-disp').textContent='₹'+(a*1.18).toFixed(2);"></div>
      <div><label class="ig-label">GST @ 18% ₹</label><input type="number" class="ig-input" id="inv-gst" placeholder="0.00" readonly></div>
      <div><label class="ig-label">Total Amount ₹</label><input type="number" class="ig-input" id="inv-total" placeholder="0.00" readonly style="font-weight:700;color:var(--gold);"></div>
      <div><label class="ig-label">HSN/SAC Code</label><input type="text" class="ig-input" value="998313" placeholder="998313"></div>
      <div><label class="ig-label">Payment Terms</label><select class="ig-input"><option>Net 30 Days</option><option>Net 15 Days</option><option>Immediate</option></select></div>
      <div style="padding:1rem;background:var(--parch-dk);border:1px solid var(--border);">
        <div style="font-size:.65rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.5rem;">GST Breakup</div>
        <div style="font-size:.78rem;color:var(--ink-muted);">CGST (9%): <span id="inv-cgst" style="color:var(--ink);font-weight:600;">₹0.00</span></div>
        <div style="font-size:.78rem;color:var(--ink-muted);">SGST (9%): <span id="inv-sgst" style="color:var(--ink);font-weight:600;">₹0.00</span></div>
        <div style="font-size:.82rem;color:var(--ink);font-weight:600;margin-top:.3rem;border-top:1px solid var(--border);padding-top:.3rem;">Total: <span id="inv-total-disp">₹0.00</span></div>
      </div>
    </div>
    <div style="display:flex;gap:.75rem;margin-top:1rem;">
      <button onclick="igCreateInvoice()" style="background:var(--gold);color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-paper-plane" style="margin-right:.4rem;"></i>Create & Send Invoice</button>
      <button onclick="igToast('Draft saved as '+document.getElementById(\'inv-num-preview\').textContent,'success')" style="background:var(--ink);color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;">Save as Draft</button>
      <button onclick="togglePanel('new-inv-panel')" style="background:none;border:1px solid var(--border);padding:.55rem 1.25rem;font-size:.78rem;cursor:pointer;color:var(--ink-muted);">Cancel</button>
    </div>
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1.5rem;">
    <!-- Invoices -->
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Invoice Register</h3></div>
      <table class="ig-tbl" id="inv-register-table"><thead><tr><th>Invoice</th><th>Client</th><th>Amount</th><th>Due</th><th>Status</th><th>Action</th></tr></thead><tbody>
        ${[
          {inv:'INV-2025-001',client:'Demo Client',amount:'₹2.5L',due:'15 Mar',status:'Paid',   cls:'b-gr'},
          {inv:'INV-2025-002',client:'Demo Client',amount:'₹1.8L',due:'28 Feb',status:'Overdue',cls:'b-re'},
          {inv:'INV-2025-003',client:'Pending Corp',amount:'₹3.2L',due:'31 Mar',status:'Draft', cls:'b-dk'},
        ].map(r=>`<tr id="inv-row-${r.inv.replace(/-/g,'_')}">
          <td style="font-size:.82rem;font-weight:500;color:var(--gold);">${r.inv}</td>
          <td style="font-size:.8rem;">${r.client}</td>
          <td style="font-family:'DM Serif Display',Georgia,serif;">${r.amount}</td>
          <td style="font-size:.78rem;color:var(--ink-muted);">${r.due}</td>
          <td id="status-${r.inv.replace(/-/g,'_')}"><span class="badge ${r.cls}">${r.status}</span></td>
          <td>
            <button onclick="igToast('${r.inv} PDF generated — simulating download','success')" style="background:none;border:none;cursor:pointer;font-size:.72rem;color:var(--gold);padding:0;margin-right:.5rem;"><i class="fas fa-download"></i></button>
            ${r.status!=='Paid'?`<button onclick="igMarkPaid('${r.inv.replace(/-/g,'_')}')" style="background:none;border:none;cursor:pointer;font-size:.68rem;color:#16a34a;padding:0;">Mark Paid</button>`:''}
          </td>
        </tr>`).join('')}
      </tbody></table>
    </div>
    <!-- GST -->
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">GST Summary — Feb 2025</h3>
        <button onclick="igConfirm('File GSTR-3B for February 2025? This action is irreversible.',function(){ igToast('GSTR-3B filed successfully for February 2025','success'); this.textContent='Filed ✓'; })" style="background:#16a34a;color:#fff;border:none;padding:.3rem .75rem;font-size:.68rem;font-weight:600;cursor:pointer;">File GSTR-3B</button>
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
  </div>
  <script>
  var igInvCounter = 4;
  function igUpdateInvNum(){
    var n = 'INV-2025-00'+igInvCounter;
    var el = document.getElementById('inv-num-preview');
    if(el) el.textContent = n;
    return n;
  }
  function igCreateInvoice(){
    var desc = document.getElementById('inv-desc').value.trim();
    var amt  = document.getElementById('inv-amt').value;
    if(!desc){ igToast('Please enter a description of services','warn'); return; }
    if(!amt || parseFloat(amt) <= 0){ igToast('Please enter a valid invoice amount','warn'); return; }
    var num = igUpdateInvNum();
    igInvCounter++;
    igToast(num+' created & emailed to client','success');
    togglePanel('new-inv-panel');
    // Add to table
    var tbody = document.querySelector('#inv-register-table tbody');
    var tr = document.createElement('tr');
    tr.id = 'inv-row-'+num.replace(/-/g,'_');
    var total = (parseFloat(amt)*1.18).toFixed(0);
    var totalLakh = (total/100000).toFixed(1);
    var due = document.getElementById('inv-due').value;
    var dueFmt = due ? new Date(due).toLocaleDateString('en-IN',{day:'numeric',month:'short'}) : '—';
    tr.innerHTML = '<td style="font-size:.82rem;font-weight:500;color:var(--gold);">'+num+'</td>'
      +'<td style="font-size:.8rem;">'+document.querySelector(\'#new-inv-panel select\').value+'</td>'
      +'<td style="font-family:\'DM Serif Display\',Georgia,serif;">₹'+totalLakh+'L</td>'
      +'<td style="font-size:.78rem;color:var(--ink-muted);">'+dueFmt+'</td>'
      +'<td id="status-'+num.replace(/-/g,'_')+'"><span class="badge b-g">Sent</span></td>'
      +'<td><button onclick="igMarkPaid(\''+num.replace(/-/g,'_')+'\')" style="background:none;border:none;cursor:pointer;font-size:.68rem;color:#16a34a;padding:0;">Mark Paid</button></td>';
    tbody.insertBefore(tr, tbody.firstChild);
    // Reset form
    document.getElementById('inv-desc').value='';
    document.getElementById('inv-amt').value='';
    document.getElementById('inv-gst').value='';
    document.getElementById('inv-total').value='';
    igUpdateInvNum();
  }
  function igMarkPaid(invId){
    igConfirm('Mark this invoice as Paid? This will update the ledger.',function(){
      var cell = document.getElementById('status-'+invId);
      if(cell){ cell.innerHTML = '<span class="badge b-gr">Paid</span>'; }
      // Remove the mark paid button
      var row = document.getElementById('inv-row-'+invId);
      if(row){ var btn = row.querySelector('[onclick*="igMarkPaid"]'); if(btn) btn.remove(); }
      igToast('Invoice marked as Paid. Ledger updated.','success');
    });
  }
  igUpdateInvNum();
  </script>`
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
      <div style="display:flex;gap:.5rem;">
        <button onclick="igHorecaCalcQuote()" style="background:#0d9488;color:#fff;border:none;padding:.4rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:.3rem;"><i class="fas fa-calculator" style="font-size:.6rem;"></i>Calculate Estimate</button>
        <button onclick="igHorecaGenPDF()" style="background:var(--ink);color:#fff;border:none;padding:.4rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:.3rem;"><i class="fas fa-file-pdf" style="font-size:.6rem;"></i>Generate Quote PDF</button>
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
  <script>
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
      el.textContent = lakh >= 100 ? '₹'+(lakh/100).toFixed(2)+' Cr' : '₹'+lakh.toFixed(1)+'L';
      bd.textContent = rooms+' rooms · '+cats.length+' categories · '+star+' Star standard';
      itemsDiv.style.display = 'block';
      itemsContent.innerHTML = cats.map(function(c){
        var catTotal = rooms * ratePerRoom / 8;
        var catLakh = (catTotal/100000).toFixed(1);
        return '<div style="display:flex;justify-content:space-between;padding:.2rem 0;border-bottom:1px solid #d1fae5;">'+
          '<span>'+c.text+'</span><span style="font-weight:600;">₹'+catLakh+'L</span></div>';
      }).join('')+'<div style="display:flex;justify-content:space-between;padding:.4rem 0;font-weight:700;font-size:.82rem;"><span>TOTAL (excl. GST)</span><span style="color:var(--gold);">'+el.textContent+'</span></div>';
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
  </script>`
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
