import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

// Admin Login
app.get('/', (c) => {
  const content = `
<div style="min-height:100vh;background:linear-gradient(135deg,#050505 0%,#100808 50%,#050505 100%);display:flex;align-items:center;justify-content:center;padding:2rem;">
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.03) 1px,transparent 1px);background-size:48px 48px;pointer-events:none;"></div>
  <div style="position:relative;width:100%;max-width:400px;">

    <div style="background:#fff;overflow:hidden;box-shadow:0 40px 100px rgba(0,0,0,.8);">
      <!-- Header -->
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

      <!-- Demo credentials -->
      <div style="background:#fffbeb;border-bottom:1px solid #fde68a;padding:.875rem 1.5rem;display:flex;gap:.6rem;align-items:flex-start;">
        <i class="fas fa-key" style="color:#d97706;font-size:.75rem;margin-top:.15rem;flex-shrink:0;"></i>
        <div>
          <p style="font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#92400e;margin-bottom:.3rem;">Demo Access Credentials</p>
          <p style="font-size:.75rem;color:#78350f;line-height:1.7;"><strong>Username:</strong> <code style="background:#fef3c7;padding:1px 5px;border-radius:2px;font-size:.72rem;">superadmin@indiagully.com</code><br>
          <strong>Password:</strong> <code style="background:#fef3c7;padding:1px 5px;border-radius:2px;font-size:.72rem;">Admin@IG2024!</code><br>
          <strong>2FA Code:</strong> <code style="background:#fef3c7;padding:1px 5px;border-radius:2px;font-size:.72rem;">000000</code></p>
        </div>
      </div>

      <!-- Form -->
      <div style="padding:2rem;">
        <form class="ig-form" method="POST" action="/api/auth/admin" style="display:flex;flex-direction:column;gap:1.1rem;">
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
          <button type="submit" style="width:100%;padding:.875rem;background:#6B1A1A;color:#fff;font-size:.78rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:none;cursor:pointer;transition:opacity .2s;" onmouseover="this.style.opacity='.85'" onmouseout="this.style.opacity='1'">
            <i class="fas fa-shield-alt" style="margin-right:.5rem;"></i>Authenticate & Enter
          </button>
        </form>

        <div style="margin-top:1.5rem;padding-top:1.25rem;border-top:1px solid var(--border);text-align:center;">
          <p style="font-size:.68rem;color:var(--ink-muted);line-height:1.65;margin-bottom:.35rem;">All admin actions are logged with timestamp, IP and user identity.</p>
          <p style="font-size:.68rem;color:#ef4444;">Unauthorised access is a criminal offence under IT Act 2000.</p>
        </div>
      </div>
    </div>

    <div style="text-align:center;margin-top:1.5rem;">
      <a href="/portal" style="font-size:.78rem;color:rgba(255,255,255,.3);display:inline-flex;align-items:center;gap:.5rem;transition:color .2s;" onmouseover="this.style.color='rgba(255,255,255,.6)'" onmouseout="this.style.color='rgba(255,255,255,.3)'">
        <i class="fas fa-arrow-left" style="font-size:.6rem;"></i>Back to Portal Selection
      </a>
    </div>
  </div>
</div>`
  return c.html(layout('Super Admin', content, { noNav: true, noFooter: true }))
})

// Admin Dashboard
app.get('/dashboard', (c) => {
  return c.html(layout('Admin Dashboard', adminDashboard(), { noNav: true, noFooter: true, bodyClass: 'bg-gray-100' }))
})

function adminDashboard() {
  const MODULES = [
    { icon:'globe',         label:'CMS',                 desc:'Edit all website content, banners, meta tags, SEO',    color:'#B8960C' },
    { icon:'users',         label:'User Management',      desc:'Create, manage, deactivate users & assign roles',      color:'#2563eb' },
    { icon:'sitemap',       label:'Workflow Engine',      desc:'Approval flows, escalations, SLA triggers',            color:'#7c3aed' },
    { icon:'chart-bar',     label:'Finance ERP',          desc:'Vouchers, GST, P&L, Balance Sheet, reconciliation',    color:'#16a34a' },
    { icon:'user-friends',  label:'HR ERP',               desc:'Payroll, attendance, leave, TDS, Form-16',             color:'#d97706' },
    { icon:'gavel',         label:'Governance',           desc:'Board meetings, minutes, statutory registers',         color:'#dc2626' },
    { icon:'boxes',         label:'HORECA Inventory',     desc:'SKUs, catalogue, quotes, procurement workflow',        color:'#0d9488' },
    { icon:'file-signature',label:'Contracts',            desc:'Templates, clause library, e-sign abstraction',        color:'#4f46e5' },
    { icon:'plug',          label:'Integrations',         desc:'Vyapar, GST Portal, SMTP, WhatsApp, API keys',         color:'#ea580c' },
    { icon:'chart-pie',     label:'BI & Reports',         desc:'Board dashboards, finance, HR, sales analytics',       color:'#db2777' },
    { icon:'cog',           label:'System Config',        desc:'Branding, SMTP, storage, environment settings',        color:'#475569' },
    { icon:'shield-alt',    label:'Security & Audit',     desc:'Access logs, RBAC matrix, IP whitelist, SOC',          color:'#9f1239' },
  ]

  return `
<div style="display:flex;height:100vh;overflow:hidden;background:#f7f7f7;">
  <!-- SIDEBAR -->
  <aside style="width:220px;flex-shrink:0;background:#0A0A0A;display:flex;flex-direction:column;min-height:100vh;">
    <div style="padding:1.25rem;border-bottom:1px solid rgba(255,255,255,.07);">
      <div class="f-serif" style="color:#fff;font-size:.85rem;letter-spacing:.07em;">INDIA GULLY</div>
      <div style="font-size:.5rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-top:2px;">Super Admin</div>
    </div>
    <nav style="flex:1;padding:.5rem;overflow-y:auto;">
      <div class="sb-sec">Main</div>
      ${[
        { icon:'tachometer-alt','label':'Dashboard',     active:true  },
        { icon:'globe',         'label':'CMS',           active:false },
        { icon:'users',         'label':'Users',         active:false },
        { icon:'sitemap',       'label':'Workflows',     active:false },
      ].map(i => `<a href="#" class="sb-lk ${i.active?'on':''}"><i class="fas fa-${i.icon}" style="width:16px;font-size:.72rem;text-align:center;"></i>${i.label}</a>`).join('')}
      <div class="sb-sec">ERP</div>
      ${[
        { icon:'chart-bar',    'label':'Finance ERP'   },
        { icon:'user-friends', 'label':'HR ERP'        },
        { icon:'gavel',        'label':'Governance'    },
        { icon:'boxes',        'label':'HORECA'        },
        { icon:'file-signature','label':'Contracts'    },
      ].map(i => `<a href="#" class="sb-lk"><i class="fas fa-${i.icon}" style="width:16px;font-size:.72rem;text-align:center;"></i>${i.label}</a>`).join('')}
      <div class="sb-sec">Platform</div>
      ${[
        { icon:'plug',        'label':'Integrations'  },
        { icon:'chart-pie',   'label':'BI & Reports'  },
        { icon:'cog',         'label':'System Config' },
        { icon:'shield-alt',  'label':'Security Audit'},
      ].map(i => `<a href="#" class="sb-lk"><i class="fas fa-${i.icon}" style="width:16px;font-size:.72rem;text-align:center;"></i>${i.label}</a>`).join('')}
    </nav>
    <div style="padding:.5rem;border-top:1px solid rgba(255,255,255,.07);">
      <a href="/" class="sb-lk"><i class="fas fa-sign-out-alt" style="width:16px;font-size:.72rem;text-align:center;"></i>Sign Out</a>
    </div>
  </aside>

  <!-- MAIN -->
  <main style="flex:1;overflow-y:auto;">
    <!-- Topbar -->
    <div style="background:#fff;border-bottom:1px solid var(--border);padding:.875rem 1.75rem;display:flex;align-items:center;justify-content:space-between;">
      <div>
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.15rem;color:var(--ink);">Admin Dashboard</h2>
        <p style="font-size:.68rem;color:var(--ink-muted);">India Gully Enterprise Platform · Super Admin Console</p>
      </div>
      <div style="display:flex;align-items:center;gap:.75rem;">
        <span style="font-size:.7rem;color:var(--ink-muted);">Last login: Today, 09:15 AM</span>
        <div style="width:32px;height:32px;background:#6B1A1A;display:flex;align-items:center;justify-content:center;">
          <i class="fas fa-shield-alt" style="color:var(--gold);font-size:.75rem;"></i>
        </div>
      </div>
    </div>

    <div style="padding:1.75rem;">
      <!-- Finance Row -->
      <div style="margin-bottom:1.5rem;">
        <h3 style="font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:1rem;">Finance Overview</h3>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;">
          ${[
            { label:'Revenue MTD',    value:'₹12.4L',   trend:'+8.3%',  up:true,  icon:'chart-line' },
            { label:'Receivables',    value:'₹34.8L',   trend:'3 invoices', up:null, icon:'receipt' },
            { label:'GST Payable',    value:'₹2.1L',    trend:'CGST+SGST',  up:null, icon:'percent' },
            { label:'Bank Balance',   value:'₹56.2L',   trend:'3 accounts', up:null, icon:'university' },
          ].map(s => `
          <div class="am">
            <div style="display:flex;justify-content:space-between;margin-bottom:.625rem;">
              <span style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);">${s.label}</span>
              <i class="fas fa-${s.icon}" style="color:var(--ink-faint);font-size:.7rem;"></i>
            </div>
            <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:var(--ink);line-height:1;margin-bottom:.3rem;">${s.value}</div>
            <div style="font-size:.7rem;color:${s.up===true?'#16a34a':s.up===false?'#dc2626':'var(--ink-muted)'};">${s.up===true?'↑ ':s.up===false?'↓ '+'':''}${s.trend}</div>
          </div>`).join('')}
        </div>
      </div>

      <!-- HR Row -->
      <div style="margin-bottom:1.5rem;">
        <h3 style="font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:1rem;">HR Overview</h3>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;">
          ${[
            { label:'Total Headcount',  value:'3',   trend:'Active employees',  icon:'users' },
            { label:"Today's Attendance", value:'3',   trend:'100% present',     icon:'check-circle' },
            { label:'Leave Pending',    value:'0',   trend:'No pending leaves', icon:'calendar' },
            { label:'Payroll Status',   value:'Dec', trend:'Processed',         icon:'money-bill' },
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

      <!-- MODULE GRID -->
      <h3 style="font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:1rem;">Platform Modules</h3>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.75rem;">
        ${MODULES.map(m => `
        <a href="#${m.label.toLowerCase().replace(/\s+&?\s*/g,'-')}" style="background:#fff;border:1px solid var(--border);padding:1.25rem;display:block;transition:border-color .2s,box-shadow .2s;text-decoration:none;" onmouseover="this.style.borderColor='${m.color}';this.style.boxShadow='0 4px 16px rgba(0,0,0,.07)'" onmouseout="this.style.borderColor='var(--border)';this.style.boxShadow='none'">
          <div style="width:36px;height:36px;background:${m.color};display:flex;align-items:center;justify-content:center;margin-bottom:.875rem;">
            <i class="fas fa-${m.icon}" style="color:#fff;font-size:.75rem;"></i>
          </div>
          <div style="font-size:.85rem;font-weight:600;color:var(--ink);margin-bottom:.25rem;">${m.label}</div>
          <div style="font-size:.72rem;color:var(--ink-muted);line-height:1.5;">${m.desc}</div>
        </a>
        `).join('')}
      </div>

      <!-- Audit Log -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Recent Audit Log</h3>
          <a href="#" style="font-size:.72rem;color:var(--gold);">View Full Log</a>
        </div>
        <table class="ig-tbl">
          <thead><tr><th>Timestamp</th><th>User</th><th>Action</th><th>Module</th><th>IP</th><th>Status</th></tr></thead>
          <tbody>
            ${[
              { ts:'2024-12-27 09:15:22', user:'admin@indiagully.com', action:'Login',            mod:'Auth',    ip:'103.21.x.x', ok:true  },
              { ts:'2024-12-27 09:12:01', user:'akm@indiagully.com',   action:'Invoice Approved', mod:'Finance', ip:'49.36.x.x',  ok:true  },
              { ts:'2024-12-27 08:55:34', user:'pavan@indiagully.com', action:'Page Edit — Home', mod:'CMS',     ip:'49.36.x.x',  ok:true  },
              { ts:'2024-12-26 18:42:15', user:'Unknown',              action:'Failed Login',     mod:'Auth',    ip:'185.x.x.x',  ok:false },
              { ts:'2024-12-26 16:30:00', user:'akm@indiagully.com',   action:'Mandate Created',  mod:'Listings',ip:'49.36.x.x',  ok:true  },
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
      </div>
    </div>
  </main>
</div>`
}

export default app
