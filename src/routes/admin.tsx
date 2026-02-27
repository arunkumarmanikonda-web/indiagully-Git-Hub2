import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

// ── SHARED ADMIN SHELL ────────────────────────────────────────────────────────
function adminShell(pageTitle: string, activeSection: string, bodyHtml: string) {
  const SECTIONS = [
    { id:'dashboard',   icon:'tachometer-alt',  label:'Dashboard',      group:'Main'      },
    { id:'cms',         icon:'globe',           label:'CMS',            group:'Main'      },
    { id:'users',       icon:'users',           label:'Users',          group:'Main'      },
    { id:'workflows',   icon:'sitemap',         label:'Workflows',      group:'Main'      },
    { id:'finance',     icon:'chart-bar',       label:'Finance ERP',    group:'ERP'       },
    { id:'hr',          icon:'user-friends',    label:'HR ERP',         group:'ERP'       },
    { id:'governance',  icon:'gavel',           label:'Governance',     group:'ERP'       },
    { id:'horeca',      icon:'boxes',           label:'HORECA',         group:'ERP'       },
    { id:'contracts',   icon:'file-signature',  label:'Contracts',      group:'ERP'       },
    { id:'integrations',icon:'plug',            label:'Integrations',   group:'Platform'  },
    { id:'reports',     icon:'chart-pie',       label:'BI & Reports',   group:'Platform'  },
    { id:'config',      icon:'cog',             label:'System Config',  group:'Platform'  },
    { id:'security',    icon:'shield-alt',      label:'Security Audit', group:'Platform'  },
  ]
  const groups = ['Main','ERP','Platform']
  const nav = groups.map(g => {
    const items = SECTIONS.filter(s => s.group === g)
    return `<div class="sb-sec">${g}</div>` + items.map(s =>
      `<a href="/admin/${s.id === 'dashboard' ? 'dashboard' : s.id}" class="sb-lk ${activeSection === s.id ? 'on' : ''}">
        <i class="fas fa-${s.icon}" style="width:16px;font-size:.72rem;text-align:center;"></i>${s.label}
      </a>`
    ).join('')
  }).join('')

  return `
<div style="display:flex;height:100vh;overflow:hidden;background:#f7f7f7;">
  <aside style="width:220px;flex-shrink:0;background:#0A0A0A;display:flex;flex-direction:column;min-height:100vh;overflow-y:auto;">
    <a href="/admin/dashboard" style="padding:1.25rem;border-bottom:1px solid rgba(255,255,255,.07);display:block;">
      <div class="f-serif" style="color:#fff;font-size:.85rem;letter-spacing:.07em;">INDIA GULLY</div>
      <div style="font-size:.5rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-top:2px;">Super Admin</div>
    </a>
    <nav style="flex:1;padding:.5rem;">${nav}</nav>
    <div style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07);">
      <a href="/admin" class="sb-lk" style="color:#ef4444 !important;"><i class="fas fa-sign-out-alt" style="width:16px;font-size:.72rem;text-align:center;"></i>Sign Out</a>
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
    <div style="flex:1;padding:1.75rem;overflow-y:auto;">${bodyHtml}</div>
  </main>
</div>`
}

// ── LOGIN ─────────────────────────────────────────────────────────────────────
app.get('/', (c) => {
  const error = c.req.query('error') || ''
  const errorBanner = error ? `
  <div style="background:#fef2f2;border-bottom:1px solid #fecaca;padding:.875rem 1.5rem;display:flex;gap:.6rem;align-items:flex-start;">
    <i class="fas fa-exclamation-circle" style="color:#dc2626;font-size:.75rem;margin-top:.15rem;flex-shrink:0;"></i>
    <p style="font-size:.78rem;color:#991b1b;">${error}</p>
  </div>` : ''
  const content = `
<div style="min-height:100vh;background:linear-gradient(135deg,#050505 0%,#100808 50%,#050505 100%);display:flex;align-items:center;justify-content:center;padding:2rem;">
  <div style="position:relative;width:100%;max-width:400px;">
    <div style="background:#fff;overflow:hidden;box-shadow:0 40px 100px rgba(0,0,0,.8);">
      <div style="background:linear-gradient(135deg,#180808,#2D0808);padding:2.25rem;text-align:center;">
        <div style="width:56px;height:56px;background:rgba(184,150,12,.15);border:1.5px solid rgba(184,150,12,.3);display:flex;align-items:center;justify-content:center;margin:0 auto .875rem;">
          <i class="fas fa-shield-alt" style="color:var(--gold);font-size:1.35rem;"></i>
        </div>
        <h1 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:#fff;margin-bottom:.25rem;">Super Admin Console</h1>
        <p style="font-size:.62rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.35);margin-top:.25rem;">India Gully Enterprise Platform</p>
        <div style="margin-top:.875rem;display:inline-flex;align-items:center;gap:.4rem;background:rgba(220,38,38,.15);border:1px solid rgba(220,38,38,.3);padding:.3rem .75rem;">
          <i class="fas fa-exclamation-triangle" style="color:#ef4444;font-size:.6rem;"></i>
          <span style="font-size:.62rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#ef4444;">Restricted Access</span>
        </div>
      </div>
      <div style="background:#fffbeb;border-bottom:1px solid #fde68a;padding:.875rem 1.5rem;display:flex;gap:.6rem;align-items:flex-start;">
        <i class="fas fa-key" style="color:#d97706;font-size:.75rem;margin-top:.15rem;flex-shrink:0;"></i>
        <div>
          <p style="font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#92400e;margin-bottom:.3rem;">Demo Access</p>
          <p style="font-size:.75rem;color:#78350f;line-height:1.7;">
            <strong>Username:</strong> <code style="background:#fef3c7;padding:1px 5px;font-size:.72rem;">superadmin@indiagully.com</code><br>
            <strong>Password:</strong> <code style="background:#fef3c7;padding:1px 5px;font-size:.72rem;">Admin@IG2024!</code><br>
            <strong>2FA Code:</strong> <code style="background:#fef3c7;padding:1px 5px;font-size:.72rem;">000000</code>
          </p>
        </div>
      </div>
      ${errorBanner}
      <div style="padding:2rem;">
        <form method="POST" action="/api/auth/admin" style="display:flex;flex-direction:column;gap:1.1rem;">
          <div>
            <label class="ig-label">Admin Username</label>
            <input type="text" name="username" class="ig-input" required placeholder="admin@indiagully.com" autocomplete="off">
          </div>
          <div>
            <label class="ig-label">Admin Password</label>
            <input type="password" name="password" class="ig-input" required placeholder="••••••••••••••••">
          </div>
          <div>
            <label class="ig-label">2FA Authentication Code</label>
            <input type="text" name="totp" class="ig-input" required placeholder="6-digit TOTP" maxlength="6" autocomplete="off" inputmode="numeric">
          </div>
          <button type="submit" style="width:100%;padding:.875rem;background:#6B1A1A;color:#fff;font-size:.78rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:none;cursor:pointer;">
            <i class="fas fa-shield-alt" style="margin-right:.5rem;"></i>Authenticate & Enter
          </button>
        </form>
        <div style="margin-top:1.25rem;text-align:center;">
          <p style="font-size:.68rem;color:#ef4444;">Unauthorised access is a criminal offence under IT Act 2000.</p>
        </div>
      </div>
    </div>
    <div style="text-align:center;margin-top:1.5rem;">
      <a href="/portal" style="font-size:.78rem;color:rgba(255,255,255,.3);">
        <i class="fas fa-arrow-left" style="font-size:.6rem;"></i> Back to Portal Selection
      </a>
    </div>
  </div>
</div>`
  return c.html(layout('Super Admin', content, { noNav: true, noFooter: true }))
})

// ── DASHBOARD HOME ────────────────────────────────────────────────────────────
app.get('/dashboard', (c) => {
  const body = `
    <!-- Finance Row -->
    <div style="margin-bottom:1.5rem;">
      <h3 style="font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:1rem;">Finance Overview</h3>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;">
        ${[
          { label:'Revenue MTD',   value:'₹12.4L', trend:'↑ +8.3% vs last month',  icon:'chart-line', c:'#16a34a' },
          { label:'Receivables',   value:'₹34.8L', trend:'3 pending invoices',      icon:'receipt',    c:'#d97706' },
          { label:'GST Payable',   value:'₹2.1L',  trend:'CGST + SGST combined',    icon:'percent',    c:'#dc2626' },
          { label:'Bank Balance',  value:'₹56.2L', trend:'Across 3 accounts',       icon:'university', c:'#2563eb' },
        ].map(s => `
        <div class="am">
          <div style="display:flex;justify-content:space-between;margin-bottom:.625rem;">
            <span style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);">${s.label}</span>
            <i class="fas fa-${s.icon}" style="color:${s.c};font-size:.7rem;"></i>
          </div>
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:var(--ink);line-height:1;margin-bottom:.3rem;">${s.value}</div>
          <div style="font-size:.7rem;color:var(--ink-muted);">${s.trend}</div>
        </div>`).join('')}
      </div>
    </div>
    <!-- HR Row -->
    <div style="margin-bottom:1.5rem;">
      <h3 style="font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:1rem;">HR Overview</h3>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;">
        ${[
          { label:'Total Headcount',    value:'3',   trend:'Active employees',   icon:'users'         },
          { label:"Today's Attendance", value:'3',   trend:'100% present',       icon:'check-circle'  },
          { label:'Leave Pending',      value:'0',   trend:'No pending leaves',  icon:'calendar'      },
          { label:'Payroll Status',     value:'Feb', trend:'2025 — Processed',   icon:'money-bill'    },
        ].map(s => `
        <div class="am">
          <div style="display:flex;justify-content:space-between;margin-bottom:.625rem;">
            <span style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);">${s.label}</span>
            <i class="fas fa-${s.icon}" style="color:var(--ink-faint);font-size:.7rem;"></i>
          </div>
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:var(--ink);line-height:1;margin-bottom:.3rem;">${s.value}</div>
          <div style="font-size:.7rem;color:var(--ink-muted);">${s.trend}</div>
        </div>`).join('')}
      </div>
    </div>
    <!-- Quick Access Modules -->
    <h3 style="font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:1rem;">Platform Modules</h3>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.75rem;">
      ${[
        { id:'cms',         icon:'globe',           label:'CMS',            desc:'Edit website content, banners, SEO',             color:'#B8960C' },
        { id:'users',       icon:'users',           label:'User Management', desc:'Create, manage users & assign roles',           color:'#2563eb' },
        { id:'finance',     icon:'chart-bar',       label:'Finance ERP',    desc:'Vouchers, GST, P&L, reconciliation',             color:'#16a34a' },
        { id:'hr',          icon:'user-friends',    label:'HR ERP',         desc:'Payroll, attendance, leave, TDS',                color:'#d97706' },
        { id:'governance',  icon:'gavel',           label:'Governance',     desc:'Board meetings, minutes, registers',             color:'#dc2626' },
        { id:'horeca',      icon:'boxes',           label:'HORECA',         desc:'SKUs, catalogue, quotes, procurement',           color:'#0d9488' },
        { id:'contracts',   icon:'file-signature',  label:'Contracts',      desc:'Templates, clause library, e-sign',              color:'#4f46e5' },
        { id:'security',    icon:'shield-alt',      label:'Security Audit', desc:'Access logs, RBAC, IP whitelist',                color:'#9f1239' },
      ].map(m => `
      <a href="/admin/${m.id}" style="background:#fff;border:1px solid var(--border);padding:1.25rem;display:block;text-decoration:none;transition:border-color .2s,box-shadow .2s;" onmouseover="this.style.borderColor='${m.color}';this.style.boxShadow='0 4px 16px rgba(0,0,0,.07)'" onmouseout="this.style.borderColor='var(--border)';this.style.boxShadow='none'">
        <div style="width:36px;height:36px;background:${m.color};display:flex;align-items:center;justify-content:center;margin-bottom:.875rem;">
          <i class="fas fa-${m.icon}" style="color:#fff;font-size:.75rem;"></i>
        </div>
        <div style="font-size:.85rem;font-weight:600;color:var(--ink);margin-bottom:.25rem;">${m.label}</div>
        <div style="font-size:.72rem;color:var(--ink-muted);line-height:1.5;">${m.desc}</div>
      </a>`).join('')}
    </div>
    <!-- Audit Log -->
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Recent Audit Log</h3>
        <a href="/admin/security" style="font-size:.72rem;color:var(--gold);">View Full Log →</a>
      </div>
      <table class="ig-tbl">
        <thead><tr><th>Timestamp</th><th>User</th><th>Action</th><th>Module</th><th>IP</th><th>Status</th></tr></thead>
        <tbody>
          ${[
            { ts:'2025-02-27 09:15:22', user:'superadmin@indiagully.com', action:'Login',            mod:'Auth',     ip:'103.21.x.x', ok:true  },
            { ts:'2025-02-27 09:12:01', user:'akm@indiagully.com',        action:'Invoice Approved', mod:'Finance',  ip:'49.36.x.x',  ok:true  },
            { ts:'2025-02-27 08:55:34', user:'pavan@indiagully.com',      action:'Page Edit — Home', mod:'CMS',      ip:'49.36.x.x',  ok:true  },
            { ts:'2025-02-26 18:42:15', user:'Unknown',                   action:'Failed Login',     mod:'Auth',     ip:'185.x.x.x',  ok:false },
            { ts:'2025-02-26 16:30:00', user:'akm@indiagully.com',        action:'Mandate Created',  mod:'Listings', ip:'49.36.x.x',  ok:true  },
          ].map(r => `
          <tr>
            <td style="font-size:.75rem;color:var(--ink-muted);white-space:nowrap;">${r.ts}</td>
            <td style="font-size:.78rem;font-weight:500;">${r.user}</td>
            <td style="font-size:.78rem;">${r.action}</td>
            <td><span class="badge b-dk">${r.mod}</span></td>
            <td style="font-size:.72rem;color:var(--ink-muted);">${r.ip}</td>
            <td><span class="badge ${r.ok ? 'b-gr' : 'b-re'}">${r.ok ? 'Success' : 'Failed'}</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>`
  return c.html(layout('Admin Dashboard', adminShell('Dashboard Overview', 'dashboard', body), { noNav: true, noFooter: true }))
})

// ── CMS ───────────────────────────────────────────────────────────────────────
app.get('/cms', (c) => {
  const body = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1.5rem;">
      ${[
        { page:'Home Page',       lastEdit:'27 Feb 2025', editor:'pavan@indiagully.com',  status:'Published' },
        { page:'About Page',      lastEdit:'25 Feb 2025', editor:'akm@indiagully.com',    status:'Published' },
        { page:'Services Page',   lastEdit:'20 Feb 2025', editor:'pavan@indiagully.com',  status:'Published' },
        { page:'HORECA Page',     lastEdit:'18 Feb 2025', editor:'pavan@indiagully.com',  status:'Published' },
        { page:'Listings Page',   lastEdit:'26 Feb 2025', editor:'akm@indiagully.com',    status:'Published' },
        { page:'Contact Page',    lastEdit:'15 Feb 2025', editor:'pavan@indiagully.com',  status:'Published' },
      ].map(p => `
      <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;display:flex;align-items:center;justify-content:space-between;">
        <div>
          <div style="font-weight:600;font-size:.9rem;color:var(--ink);margin-bottom:.2rem;">${p.page}</div>
          <div style="font-size:.72rem;color:var(--ink-muted);">Last edited ${p.lastEdit} by ${p.editor}</div>
        </div>
        <div style="display:flex;align-items:center;gap:.75rem;">
          <span class="badge b-gr">${p.status}</span>
          <a href="#" onclick="alert('CMS editor coming in Phase 2');return false;" style="font-size:.72rem;color:var(--gold);font-weight:600;">Edit →</a>
        </div>
      </div>`).join('')}
    </div>
    <div style="background:#fff;border:1px solid var(--border);padding:1.5rem;">
      <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);margin-bottom:1rem;">SEO & Meta Tags</h3>
      <table class="ig-tbl">
        <thead><tr><th>Page</th><th>Title</th><th>Description</th><th>Action</th></tr></thead>
        <tbody>
          ${[
            { page:'Home', title:'India Gully — Celebrating Desiness', desc:'India\'s premier multi-vertical advisory firm...' },
            { page:'About', title:'About India Gully', desc:'Leadership team and company overview...' },
            { page:'Listings', title:'Active Mandates — India Gully', desc:'₹10,000 Cr+ advisory pipeline...' },
          ].map(r => `
          <tr>
            <td style="font-weight:500;">${r.page}</td>
            <td style="font-size:.8rem;">${r.title}</td>
            <td style="font-size:.8rem;color:var(--ink-muted);">${r.desc.substring(0,40)}…</td>
            <td><a href="#" onclick="alert('SEO editor in Phase 2');return false;" style="font-size:.72rem;color:var(--gold);">Edit</a></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>`
  return c.html(layout('CMS', adminShell('Content Management System', 'cms', body), { noNav: true, noFooter: true }))
})

// ── USERS ─────────────────────────────────────────────────────────────────────
app.get('/users', (c) => {
  const body = `
    <div style="display:flex;gap:1rem;margin-bottom:1.5rem;">
      ${[
        { label:'Total Users',    value:'8',  color:'#2563eb' },
        { label:'Active',         value:'7',  color:'#16a34a' },
        { label:'Admin Users',    value:'1',  color:'#d97706' },
        { label:'Deactivated',    value:'1',  color:'#dc2626' },
      ].map(s => `
      <div class="am" style="flex:1;">
        <div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.5rem;">${s.label}</div>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2rem;color:${s.color};">${s.value}</div>
      </div>`).join('')}
    </div>
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">All Users</h3>
        <button onclick="alert('Add User form in Phase 2')" style="background:var(--gold);color:#fff;border:none;padding:.45rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;letter-spacing:.07em;text-transform:uppercase;">
          <i class="fas fa-plus" style="margin-right:.4rem;"></i>Add User
        </button>
      </div>
      <table class="ig-tbl">
        <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Portal</th><th>Last Login</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          ${[
            { name:'Super Admin',   email:'superadmin@indiagully.com', role:'Super Admin', portal:'Admin',    login:'27 Feb 2025', active:true  },
            { name:'Arun Manikonda',email:'akm@indiagully.com',        role:'Director',    portal:'Board/Client', login:'26 Feb 2025', active:true },
            { name:'Pavan Manikonda',email:'pavan@indiagully.com',     role:'Director',    portal:'Board',    login:'26 Feb 2025', active:true  },
            { name:'Amit Jhingan',  email:'amit.jhingan@indiagully.com',role:'KMP',        portal:'Board',    login:'25 Feb 2025', active:true  },
            { name:'Demo Client',   email:'demo@indiagully.com',       role:'Client',      portal:'Client',   login:'27 Feb 2025', active:true  },
            { name:'Demo Employee', email:'emp@indiagully.com',        role:'Employee',    portal:'Employee', login:'24 Feb 2025', active:true  },
            { name:'Demo KMP',      email:'kmp@indiagully.com',        role:'KMP',         portal:'Board',    login:'20 Feb 2025', active:true  },
            { name:'Ex Employee',   email:'ex.emp@indiagully.com',     role:'Employee',    portal:'Employee', login:'01 Jan 2025', active:false },
          ].map(u => `
          <tr>
            <td style="font-weight:500;">${u.name}</td>
            <td style="font-size:.8rem;">${u.email}</td>
            <td><span class="badge b-dk">${u.role}</span></td>
            <td style="font-size:.8rem;color:var(--ink-muted);">${u.portal}</td>
            <td style="font-size:.78rem;color:var(--ink-muted);">${u.login}</td>
            <td><span class="badge ${u.active ? 'b-gr' : 'b-re'}">${u.active ? 'Active' : 'Inactive'}</span></td>
            <td>
              <a href="#" onclick="alert('Edit user in Phase 2');return false;" style="font-size:.72rem;color:var(--gold);margin-right:.75rem;">Edit</a>
              <a href="#" onclick="alert('Reset password sent');return false;" style="font-size:.72rem;color:var(--ink-muted);">Reset PW</a>
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>`
  return c.html(layout('User Management', adminShell('User Management', 'users', body), { noNav: true, noFooter: true }))
})

// ── WORKFLOWS ─────────────────────────────────────────────────────────────────
app.get('/workflows', (c) => {
  const body = `
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:1.5rem;">
      ${[
        { name:'Invoice Approval',     steps:'Submit → Finance Review → Director Approval → GST Filing', triggers:'Amount > ₹50,000', active:true  },
        { name:'Mandate Onboarding',   steps:'Enquiry → KYC → NDA → Engagement Letter → Activation',    triggers:'New client form',  active:true  },
        { name:'Leave Approval',       steps:'Employee → Reporting Manager → HR → Confirmed',            triggers:'Leave request',    active:true  },
        { name:'Contract Renewal',     steps:'Draft → Legal Review → Director Sign → Archive',           triggers:'30 days before exp', active:false },
        { name:'New Vendor Onboarding',steps:'Request → Compliance Check → Finance Approval → Active',   triggers:'Vendor form',      active:true  },
        { name:'Board Resolution',     steps:'Draft → Director Review → Vote → File with ROC',           triggers:'Board meeting',    active:true  },
      ].map(w => `
      <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:.75rem;">
          <h4 style="font-size:.875rem;font-weight:600;color:var(--ink);">${w.name}</h4>
          <span class="badge ${w.active ? 'b-gr' : 'b-re'}">${w.active ? 'Active' : 'Paused'}</span>
        </div>
        <p style="font-size:.75rem;color:var(--ink-muted);line-height:1.6;margin-bottom:.5rem;">${w.steps}</p>
        <p style="font-size:.68rem;color:var(--ink-faint);">Trigger: ${w.triggers}</p>
        <div style="margin-top:.875rem;padding-top:.875rem;border-top:1px solid var(--border);display:flex;gap:.75rem;">
          <a href="#" onclick="alert('Workflow editor in Phase 2');return false;" style="font-size:.72rem;color:var(--gold);">Edit Flow</a>
          <a href="#" onclick="alert(this.textContent + ' workflow ' + (${w.active ? 'false' : 'true'} ? 'activated' : 'paused'));return false;" style="font-size:.72rem;color:var(--ink-muted);">${w.active ? 'Pause' : 'Activate'}</a>
        </div>
      </div>`).join('')}
    </div>`
  return c.html(layout('Workflows', adminShell('Workflow Engine', 'workflows', body), { noNav: true, noFooter: true }))
})

// ── FINANCE ERP ───────────────────────────────────────────────────────────────
app.get('/finance', (c) => {
  const body = `
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">
      ${[
        { label:'Revenue MTD',   value:'₹12.4L',  trend:'↑ +8.3%',    color:'#16a34a' },
        { label:'Expenses MTD',  value:'₹7.8L',   trend:'↓ -2.1%',    color:'#dc2626' },
        { label:'Net Profit',    value:'₹4.6L',   trend:'37.1% margin', color:'#2563eb' },
        { label:'GST Liability', value:'₹2.1L',   trend:'Due 20 Mar',  color:'#d97706' },
      ].map(s => `
      <div class="am">
        <div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.5rem;">${s.label}</div>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:var(--ink);line-height:1;margin-bottom:.3rem;">${s.value}</div>
        <div style="font-size:.7rem;color:${s.color};">${s.trend}</div>
      </div>`).join('')}
    </div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;margin-bottom:1.5rem;">
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;">
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Recent Invoices</h3>
          <button onclick="alert('New invoice in Phase 2')" style="background:var(--gold);color:#fff;border:none;padding:.3rem .75rem;font-size:.68rem;font-weight:600;cursor:pointer;">+ New</button>
        </div>
        <table class="ig-tbl">
          <thead><tr><th>Invoice #</th><th>Client</th><th>Amount</th><th>Due Date</th><th>Status</th></tr></thead>
          <tbody>
            ${[
              { inv:'INV-2025-001', client:'Demo Client',  amount:'₹2.5L',  due:'15 Mar 2025', status:'Paid',    cls:'b-gr' },
              { inv:'INV-2025-002', client:'Demo Client',  amount:'₹1.8L',  due:'28 Feb 2025', status:'Overdue', cls:'b-re' },
              { inv:'INV-2025-003', client:'Pending Corp', amount:'₹3.2L',  due:'31 Mar 2025', status:'Draft',   cls:'b-dk' },
            ].map(r => `
            <tr>
              <td style="font-size:.82rem;font-weight:500;">${r.inv}</td>
              <td style="font-size:.8rem;">${r.client}</td>
              <td style="font-family:'DM Serif Display',Georgia,serif;color:var(--gold);">${r.amount}</td>
              <td style="font-size:.78rem;color:var(--ink-muted);">${r.due}</td>
              <td><span class="badge ${r.cls}">${r.status}</span></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);">
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">GST Summary</h3>
        </div>
        <div style="padding:1.25rem;">
          ${[
            { label:'CGST Collected',   value:'₹1.05L', color:'#16a34a' },
            { label:'SGST Collected',   value:'₹1.05L', color:'#16a34a' },
            { label:'CGST Paid',        value:'₹0.82L', color:'#dc2626' },
            { label:'SGST Paid',        value:'₹0.82L', color:'#dc2626' },
            { label:'Net GST Payable',  value:'₹0.46L', color:'#d97706' },
          ].map(g => `
          <div style="display:flex;justify-content:space-between;padding:.625rem 0;border-bottom:1px solid var(--border);">
            <span style="font-size:.82rem;color:var(--ink-muted);">${g.label}</span>
            <span style="font-family:'DM Serif Display',Georgia,serif;color:${g.color};">${g.value}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>
    <div style="background:#fff;border:1px solid var(--border);padding:1rem 1.25rem;">
      <div style="display:flex;gap:1rem;flex-wrap:wrap;">
        ${['P&L Statement', 'Balance Sheet', 'Cash Flow', 'Bank Reconciliation', 'TDS Reports', 'GST Filing'].map(r =>
          `<a href="#" onclick="alert('${r} report in Phase 2');return false;" style="background:var(--parch-dk);border:1px solid var(--border);padding:.5rem 1rem;font-size:.78rem;font-weight:500;color:var(--ink);display:flex;align-items:center;gap:.4rem;"><i class="fas fa-file-alt" style="color:var(--gold);font-size:.7rem;"></i>${r}</a>`
        ).join('')}
      </div>
    </div>`
  return c.html(layout('Finance ERP', adminShell('Finance ERP', 'finance', body), { noNav: true, noFooter: true }))
})

// ── HR ERP ────────────────────────────────────────────────────────────────────
app.get('/hr', (c) => {
  const body = `
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">
      ${[
        { label:'Total Employees', value:'3',   color:'#2563eb' },
        { label:'Present Today',   value:'3',   color:'#16a34a' },
        { label:'On Leave',        value:'0',   color:'#d97706' },
        { label:'Payroll Due',     value:'Mar', color:'#7c3aed' },
      ].map(s => `
      <div class="am">
        <div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.5rem;">${s.label}</div>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2rem;color:${s.color};">${s.value}</div>
      </div>`).join('')}
    </div>
    <div style="display:grid;grid-template-columns:2fr 1fr;gap:1.5rem;margin-bottom:1.5rem;">
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;">
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Employee Directory</h3>
          <button onclick="alert('Add employee in Phase 2')" style="background:var(--gold);color:#fff;border:none;padding:.3rem .75rem;font-size:.68rem;font-weight:600;cursor:pointer;">+ Add</button>
        </div>
        <table class="ig-tbl">
          <thead><tr><th>Employee</th><th>Designation</th><th>Dept</th><th>Join Date</th><th>Status</th></tr></thead>
          <tbody>
            ${[
              { name:'Arun Manikonda',  designation:'Managing Director',  dept:'Leadership', join:'01 Apr 2017', active:true  },
              { name:'Pavan Manikonda', designation:'Executive Director',  dept:'Operations', join:'01 Apr 2017', active:true  },
              { name:'Amit Jhingan',    designation:'President, Real Estate', dept:'Advisory', join:'01 Jan 2020', active:true },
            ].map(e => `
            <tr>
              <td style="font-weight:500;">${e.name}</td>
              <td style="font-size:.82rem;">${e.designation}</td>
              <td><span class="badge b-dk">${e.dept}</span></td>
              <td style="font-size:.78rem;color:var(--ink-muted);">${e.join}</td>
              <td><span class="badge ${e.active ? 'b-gr' : 'b-re'}">${e.active ? 'Active' : 'Inactive'}</span></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);">
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Leave Requests</h3>
        </div>
        <div style="padding:1.25rem;text-align:center;padding-top:3rem;">
          <i class="fas fa-check-circle" style="color:#16a34a;font-size:2.5rem;margin-bottom:.75rem;display:block;"></i>
          <p style="font-size:.875rem;font-weight:500;color:var(--ink);">No Pending Requests</p>
          <p style="font-size:.78rem;color:var(--ink-muted);margin-top:.25rem;">All leave requests are cleared</p>
        </div>
      </div>
    </div>
    <div style="background:#fff;border:1px solid var(--border);padding:1rem 1.25rem;">
      <div style="display:flex;gap:1rem;flex-wrap:wrap;">
        ${['Run Payroll', 'Payslip Archive', 'Form-16 Generator', 'Attendance Report', 'TDS Calculation', 'Policies Library'].map(r =>
          `<a href="#" onclick="alert('${r} in Phase 2');return false;" style="background:var(--parch-dk);border:1px solid var(--border);padding:.5rem 1rem;font-size:.78rem;font-weight:500;color:var(--ink);display:flex;align-items:center;gap:.4rem;"><i class="fas fa-cog" style="color:#1A3A6B;font-size:.7rem;"></i>${r}</a>`
        ).join('')}
      </div>
    </div>`
  return c.html(layout('HR ERP', adminShell('HR ERP', 'hr', body), { noNav: true, noFooter: true }))
})

// ── GOVERNANCE ────────────────────────────────────────────────────────────────
app.get('/governance', (c) => {
  const body = `
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">
      ${[
        { label:'Directors',        value:'2',        color:'#1E1E1E' },
        { label:'KMPs',             value:'3',        color:'#2563eb' },
        { label:'Pending Resolutions', value:'2',     color:'#d97706' },
        { label:'Next Filing Due',  value:'31 Mar',   color:'#dc2626' },
      ].map(s => `
      <div class="am">
        <div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.5rem;">${s.label}</div>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:${s.color};">${s.value}</div>
      </div>`).join('')}
    </div>
    <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Compliance Calendar</h3>
      </div>
      <table class="ig-tbl">
        <thead><tr><th>Due Date</th><th>Filing / Event</th><th>Form</th><th>Responsible</th><th>Status</th></tr></thead>
        <tbody>
          ${[
            { date:'15 Mar 2025', event:'Board Meeting — Q1 Review',        form:'—',       resp:'Directors',   status:'Scheduled', cls:'b-gr' },
            { date:'31 Mar 2025', event:'Annual Accounts Filing',            form:'AOC-4',   resp:'CS',          status:'Due',       cls:'b-g'  },
            { date:'30 Apr 2025', event:'Annual Return',                     form:'MGT-7',   resp:'CS',          status:'Upcoming',  cls:'b-dk' },
            { date:'30 Jun 2025', event:'Income Tax Return',                 form:'ITR-6',   resp:'CFO',         status:'Upcoming',  cls:'b-dk' },
            { date:'30 Sep 2025', event:'Secretarial Audit',                 form:'MR-3',    resp:'CS',          status:'Upcoming',  cls:'b-dk' },
          ].map(r => `
          <tr>
            <td style="font-size:.82rem;white-space:nowrap;font-weight:500;">${r.date}</td>
            <td style="font-size:.85rem;">${r.event}</td>
            <td><span class="badge b-dk">${r.form}</span></td>
            <td style="font-size:.8rem;color:var(--ink-muted);">${r.resp}</td>
            <td><span class="badge ${r.cls}">${r.status}</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
    <div style="background:#fff;border:1px solid var(--border);padding:1rem 1.25rem;">
      <div style="display:flex;gap:1rem;flex-wrap:wrap;">
        ${['Board Meeting Minutes', 'Director Register', 'Shareholder Register', 'Charge Register', 'Board Resolutions', 'Company Documents'].map(r =>
          `<a href="#" onclick="alert('${r} document viewer in Phase 2');return false;" style="background:var(--parch-dk);border:1px solid var(--border);padding:.5rem 1rem;font-size:.78rem;font-weight:500;color:var(--ink);display:flex;align-items:center;gap:.4rem;"><i class="fas fa-file-alt" style="color:#1E1E1E;font-size:.7rem;"></i>${r}</a>`
        ).join('')}
      </div>
    </div>`
  return c.html(layout('Governance', adminShell('Governance & Compliance', 'governance', body), { noNav: true, noFooter: true }))
})

// ── HORECA MODULE ─────────────────────────────────────────────────────────────
app.get('/horeca', (c) => {
  const body = `
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">
      ${[
        { label:'SKU Categories',  value:'8',    color:'#0d9488' },
        { label:'Active Vendors',  value:'14',   color:'#2563eb' },
        { label:'Open Quotes',     value:'3',    color:'#d97706' },
        { label:'Orders This Mo.', value:'7',    color:'#16a34a' },
      ].map(s => `
      <div class="am">
        <div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.5rem;">${s.label}</div>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2rem;color:${s.color};">${s.value}</div>
      </div>`).join('')}
    </div>
    <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">SKU Categories</h3>
        <button onclick="alert('Add SKU in Phase 2')" style="background:#0d9488;color:#fff;border:none;padding:.3rem .75rem;font-size:.68rem;font-weight:600;cursor:pointer;">+ Add SKU</button>
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0;">
        ${[
          { cat:'Kitchen Equipment',  skus:24, icon:'utensils'       },
          { cat:'Crockery & Cutlery', skus:56, icon:'concierge-bell' },
          { cat:'Linen & Fabrics',    skus:18, icon:'bed'            },
          { cat:'Front Office',       skus:12, icon:'bell'           },
          { cat:'Housekeeping',       skus:31, icon:'broom'          },
          { cat:'Food & Beverage',    skus:45, icon:'wine-glass-alt' },
          { cat:'Maintenance',        skus:19, icon:'tools'          },
          { cat:'Technology',         skus:8,  icon:'desktop'        },
        ].map(cat => `
        <div style="padding:1.25rem;border-right:1px solid var(--border);border-bottom:1px solid var(--border);">
          <i class="fas fa-${cat.icon}" style="color:#0d9488;font-size:1.1rem;margin-bottom:.5rem;display:block;"></i>
          <div style="font-size:.85rem;font-weight:500;color:var(--ink);margin-bottom:.2rem;">${cat.cat}</div>
          <div style="font-size:.72rem;color:var(--ink-muted);">${cat.skus} SKUs</div>
        </div>`).join('')}
      </div>
    </div>`
  return c.html(layout('HORECA Inventory', adminShell('HORECA Inventory Management', 'horeca', body), { noNav: true, noFooter: true }))
})

// ── CONTRACTS ─────────────────────────────────────────────────────────────────
app.get('/contracts', (c) => {
  const body = `
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">
      ${[
        { label:'Active Contracts',  value:'6',  color:'#16a34a' },
        { label:'Drafts',            value:'2',  color:'#d97706' },
        { label:'Expiring 30 Days',  value:'1',  color:'#dc2626' },
        { label:'Templates',         value:'8',  color:'#4f46e5' },
      ].map(s => `
      <div class="am">
        <div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.5rem;">${s.label}</div>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2rem;color:${s.color};">${s.value}</div>
      </div>`).join('')}
    </div>
    <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Active Contracts</h3>
        <button onclick="alert('New contract in Phase 2')" style="background:#4f46e5;color:#fff;border:none;padding:.3rem .75rem;font-size:.68rem;font-weight:600;cursor:pointer;">+ New Contract</button>
      </div>
      <table class="ig-tbl">
        <thead><tr><th>Contract Name</th><th>Party</th><th>Type</th><th>Start</th><th>Expiry</th><th>Status</th></tr></thead>
        <tbody>
          ${[
            { name:'Advisory Agreement',     party:'Demo Client Corp', type:'Advisory',    start:'01 Jan 2025', expiry:'31 Dec 2025', status:'Active'  },
            { name:'Hotel PMC Agreement',     party:'Rajasthan Hotels', type:'PMC',         start:'15 Feb 2025', expiry:'14 Feb 2026', status:'Active'  },
            { name:'Retail Leasing Mandate',  party:'Mumbai Mall Pvt.', type:'Mandate',     start:'01 Dec 2024', expiry:'30 Nov 2025', status:'Active'  },
            { name:'EY Advisory Retainer',    party:'Ernst & Young',    type:'Retainer',    start:'01 Apr 2024', expiry:'31 Mar 2025', status:'Expiring' },
            { name:'CBRE Co-Advisory MOU',    party:'CBRE India',       type:'MOU',         start:'01 Jan 2025', expiry:'31 Dec 2025', status:'Active'  },
            { name:'NDA — Entertainment Proj',party:'Confidential',     type:'NDA',         start:'01 Feb 2025', expiry:'01 Feb 2026', status:'Active'  },
          ].map(r => `
          <tr>
            <td style="font-weight:500;font-size:.85rem;">${r.name}</td>
            <td style="font-size:.8rem;">${r.party}</td>
            <td><span class="badge b-dk">${r.type}</span></td>
            <td style="font-size:.78rem;color:var(--ink-muted);">${r.start}</td>
            <td style="font-size:.78rem;color:var(--ink-muted);">${r.expiry}</td>
            <td><span class="badge ${r.status === 'Active' ? 'b-gr' : r.status === 'Expiring' ? 'b-g' : 'b-dk'}">${r.status}</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>`
  return c.html(layout('Contracts', adminShell('Contract Management', 'contracts', body), { noNav: true, noFooter: true }))
})

// ── INTEGRATIONS ──────────────────────────────────────────────────────────────
app.get('/integrations', (c) => {
  const body = `
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;">
      ${[
        { name:'GST Portal',        desc:'Auto-filing GSTR-1, GSTR-3B via API',  status:'Connected',    icon:'percent',          color:'#16a34a' },
        { name:'Vyapar Accounting', desc:'Sync invoices, expenses, ledger',       status:'Connected',    icon:'book',             color:'#16a34a' },
        { name:'SMTP (Gmail)',       desc:'Outbound email notifications',          status:'Connected',    icon:'envelope',         color:'#16a34a' },
        { name:'WhatsApp Business', desc:'Client communication & alerts',         status:'Pending',      icon:'comment-dots',     color:'#d97706' },
        { name:'Cloudflare R2',     desc:'Document storage & CDN',                status:'Connected',    icon:'cloud',            color:'#16a34a' },
        { name:'DocuSign',          desc:'E-signature for contracts & NDAs',      status:'Not Configured', icon:'pen',            color:'#dc2626' },
        { name:'Zoho CRM',          desc:'Lead management & pipeline',            status:'Not Configured', icon:'funnel-dollar',  color:'#dc2626' },
        { name:'Tally Prime',       desc:'Accounting sync via XML',               status:'Pending',      icon:'calculator',       color:'#d97706' },
        { name:'SendGrid',          desc:'Bulk email & marketing campaigns',      status:'Not Configured', icon:'paper-plane',    color:'#dc2626' },
      ].map(i => `
      <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
        <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.75rem;">
          <div style="width:40px;height:40px;background:${i.color};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <i class="fas fa-${i.icon}" style="color:#fff;font-size:.85rem;"></i>
          </div>
          <div>
            <div style="font-weight:600;font-size:.875rem;color:var(--ink);">${i.name}</div>
            <span class="badge ${i.status === 'Connected' ? 'b-gr' : i.status === 'Pending' ? 'b-g' : 'b-re'}">${i.status}</span>
          </div>
        </div>
        <p style="font-size:.78rem;color:var(--ink-muted);line-height:1.5;margin-bottom:.75rem;">${i.desc}</p>
        <a href="#" onclick="alert('Integration config for ${i.name} in Phase 2');return false;" style="font-size:.72rem;color:var(--gold);">Configure →</a>
      </div>`).join('')}
    </div>`
  return c.html(layout('Integrations', adminShell('Integrations & API Keys', 'integrations', body), { noNav: true, noFooter: true }))
})

// ── BI & REPORTS ──────────────────────────────────────────────────────────────
app.get('/reports', (c) => {
  const body = `
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:1.5rem;">
      ${[
        { name:'P&L Statement',        desc:'Monthly, quarterly & annual P&L',      icon:'chart-line',  color:'#16a34a' },
        { name:'Balance Sheet',        desc:'Assets, liabilities & net worth',       icon:'balance-scale', color:'#2563eb' },
        { name:'Cash Flow Statement',  desc:'Operating, investing & financing',      icon:'money-bill-wave', color:'#0d9488' },
        { name:'GST Filing Report',    desc:'GSTR-1, GSTR-3B, annual return',        icon:'percent',     color:'#d97706' },
        { name:'HR Analytics',         desc:'Headcount, attrition, leave trends',    icon:'users',       color:'#7c3aed' },
        { name:'Pipeline Report',      desc:'Active mandates, values, stages',       icon:'funnel-dollar', color:'#B8960C' },
        { name:'Client Report',        desc:'Client-wise revenue & deliverables',    icon:'user-tie',    color:'#4f46e5' },
        { name:'Compliance Calendar',  desc:'All regulatory & statutory deadlines',  icon:'calendar-check', color:'#dc2626' },
        { name:'Audit Trail Report',   desc:'Full user activity & system logs',      icon:'shield-alt',  color:'#9f1239' },
      ].map(r => `
      <a href="#" onclick="alert('${r.name} report generation in Phase 2');return false;" style="background:#fff;border:1px solid var(--border);padding:1.25rem;display:block;text-decoration:none;transition:border-color .2s;" onmouseover="this.style.borderColor='${r.color}'" onmouseout="this.style.borderColor='var(--border)'">
        <div style="width:40px;height:40px;background:${r.color};display:flex;align-items:center;justify-content:center;margin-bottom:.875rem;">
          <i class="fas fa-${r.icon}" style="color:#fff;font-size:.85rem;"></i>
        </div>
        <div style="font-weight:600;font-size:.875rem;color:var(--ink);margin-bottom:.25rem;">${r.name}</div>
        <div style="font-size:.75rem;color:var(--ink-muted);line-height:1.5;">${r.desc}</div>
        <div style="margin-top:.75rem;font-size:.72rem;color:${r.color};font-weight:600;">Generate Report →</div>
      </a>`).join('')}
    </div>`
  return c.html(layout('BI & Reports', adminShell('BI & Reports', 'reports', body), { noNav: true, noFooter: true }))
})

// ── SYSTEM CONFIG ─────────────────────────────────────────────────────────────
app.get('/config', (c) => {
  const body = `
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;">
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);">
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Platform Settings</h3>
        </div>
        <div style="padding:1.25rem;display:flex;flex-direction:column;gap:1rem;">
          ${[
            { label:'Platform Name',        value:'India Gully Enterprise Platform'  },
            { label:'Company Legal Name',   value:'Vivacious Entertainment & Hospitality Pvt. Ltd.' },
            { label:'CIN',                  value:'U74900DL2017PTC000000'            },
            { label:'GSTIN',               value:'07XXXXXX000XXX'                    },
            { label:'Registered Address',  value:'New Delhi, India'                 },
            { label:'Platform Domain',     value:'india-gully.pages.dev'            },
          ].map(s => `
          <div style="display:flex;flex-direction:column;gap:.25rem;">
            <label style="font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);">${s.label}</label>
            <div style="font-size:.875rem;color:var(--ink);background:var(--parch-dk);padding:.5rem .75rem;border:1px solid var(--border);">${s.value}</div>
          </div>`).join('')}
          <button onclick="alert('Platform settings editor in Phase 2')" style="background:var(--gold);color:#fff;border:none;padding:.6rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;margin-top:.5rem;width:fit-content;">Save Changes</button>
        </div>
      </div>
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);">
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">SMTP & Notifications</h3>
        </div>
        <div style="padding:1.25rem;display:flex;flex-direction:column;gap:1rem;">
          ${[
            { label:'SMTP Host',        value:'smtp.gmail.com',   type:'text'     },
            { label:'SMTP Port',        value:'587',              type:'number'   },
            { label:'From Email',       value:'info@indiagully.com', type:'email' },
            { label:'From Name',        value:'India Gully',      type:'text'     },
          ].map(f => `
          <div>
            <label class="ig-label">${f.label}</label>
            <input type="${f.type}" class="ig-input" value="${f.value}" style="font-size:.82rem;">
          </div>`).join('')}
          <div style="display:flex;align-items:center;justify-content:space-between;padding:.75rem;background:var(--parch-dk);border:1px solid var(--border);">
            <span style="font-size:.82rem;color:var(--ink);">SMTP Status</span>
            <span class="badge b-gr">Connected</span>
          </div>
          <button onclick="alert('Test email sent to superadmin@indiagully.com')" style="background:var(--ink);color:#fff;border:none;padding:.6rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;width:fit-content;">Send Test Email</button>
        </div>
      </div>
    </div>`
  return c.html(layout('System Config', adminShell('System Configuration', 'config', body), { noNav: true, noFooter: true }))
})

// ── SECURITY AUDIT ────────────────────────────────────────────────────────────
app.get('/security', (c) => {
  const body = `
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">
      ${[
        { label:'Failed Logins (7d)', value:'2',  color:'#dc2626' },
        { label:'Active Sessions',    value:'1',  color:'#16a34a' },
        { label:'IP Whitelist',       value:'5',  color:'#2563eb' },
        { label:'2FA Users',          value:'8',  color:'#7c3aed' },
      ].map(s => `
      <div class="am">
        <div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.5rem;">${s.label}</div>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2rem;color:${s.color};">${s.value}</div>
      </div>`).join('')}
    </div>
    <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Full Audit Log</h3>
      </div>
      <table class="ig-tbl">
        <thead><tr><th>Timestamp</th><th>User</th><th>Action</th><th>Module</th><th>IP Address</th><th>User Agent</th><th>Status</th></tr></thead>
        <tbody>
          ${[
            { ts:'2025-02-27 09:15:22', user:'superadmin@indiagully.com', action:'Login Success',      mod:'Auth',     ip:'103.21.x.x', ua:'Chrome/Win', ok:true  },
            { ts:'2025-02-27 09:12:01', user:'akm@indiagully.com',        action:'Invoice Approved',   mod:'Finance',  ip:'49.36.x.x',  ua:'Safari/Mac', ok:true  },
            { ts:'2025-02-27 08:55:34', user:'pavan@indiagully.com',      action:'Page Edit — Home',   mod:'CMS',      ip:'49.36.x.x',  ua:'Chrome/Win', ok:true  },
            { ts:'2025-02-26 22:14:53', user:'demo@indiagully.com',       action:'Client Login',       mod:'Auth',     ip:'115.99.x.x', ua:'Chrome/And', ok:true  },
            { ts:'2025-02-26 18:42:15', user:'Unknown',                   action:'Failed Login',       mod:'Auth',     ip:'185.x.x.x',  ua:'curl/7.68',  ok:false },
            { ts:'2025-02-26 18:41:02', user:'Unknown',                   action:'Failed Login',       mod:'Auth',     ip:'185.x.x.x',  ua:'curl/7.68',  ok:false },
            { ts:'2025-02-26 16:30:00', user:'akm@indiagully.com',        action:'Mandate Created',    mod:'Listings', ip:'49.36.x.x',  ua:'Chrome/Win', ok:true  },
          ].map(r => `
          <tr>
            <td style="font-size:.72rem;color:var(--ink-muted);white-space:nowrap;">${r.ts}</td>
            <td style="font-size:.78rem;font-weight:500;">${r.user}</td>
            <td style="font-size:.78rem;">${r.action}</td>
            <td><span class="badge b-dk">${r.mod}</span></td>
            <td style="font-size:.72rem;color:var(--ink-muted);">${r.ip}</td>
            <td style="font-size:.72rem;color:var(--ink-muted);">${r.ua}</td>
            <td><span class="badge ${r.ok ? 'b-gr' : 'b-re'}">${r.ok ? 'OK' : 'FAIL'}</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>`
  return c.html(layout('Security & Audit', adminShell('Security & Audit', 'security', body), { noNav: true, noFooter: true }))
})

export default app
