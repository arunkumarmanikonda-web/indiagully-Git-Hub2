import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

// ── ADMIN LOGIN ───────────────────────────────────────────────────────────────
app.get('/', (c) => {
  const content = `
<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;background:linear-gradient(135deg,#080004,#0F000A,#080808);position:relative;overflow:hidden;">
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.03) 1px,transparent 1px);background-size:40px 40px;pointer-events:none;"></div>

  <div style="position:relative;width:100%;max-width:400px;">
    <div style="text-align:center;margin-bottom:2rem;">
      <a href="/" style="display:inline-flex;align-items:center;gap:.75rem;">
        <svg width="26" height="32" viewBox="0 0 38 46" fill="none">
          <path d="M19 2C9 2 2 9.5 2 19.5C2 26.5 5.8 32.5 11.5 36L9 44H29L26.5 36C32.2 32.5 36 26.5 36 19.5C36 9.5 29 2 19 2Z" stroke="#B8960C" stroke-width="1.5" fill="none"/>
          <path d="M23 8.5C18.5 8.5 15 11.5 14 15.5C13.2 18.5 14.5 21 17 22.5L14.5 27.5C16.5 28.5 18 29 19.5 29C22.5 29 25.5 27.5 27 25C28.5 22.5 28 19.5 25.5 18L27.5 13C26 10 24.5 8.5 23 8.5Z" fill="#B8960C"/>
          <ellipse cx="20" cy="18" rx="3" ry="4" fill="#111"/>
        </svg>
        <div>
          <div class="f-serif" style="color:#fff;font-size:.9rem;letter-spacing:.06em;">INDIA GULLY</div>
          <div style="font-size:.48rem;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);">Celebrating Desiness</div>
        </div>
      </a>
    </div>

    <div style="background:#fff;box-shadow:0 40px 100px rgba(0,0,0,.85);">
      <div style="height:3px;background:linear-gradient(90deg,#6B1A1A,#B8960C);"></div>
      <div style="padding:2.25rem 2.25rem 1.75rem;text-align:center;background:#fafafa;border-bottom:1px solid var(--border);">
        <div style="width:56px;height:56px;background:linear-gradient(135deg,#6B1A1A,#8B2A2A);display:flex;align-items:center;justify-content:center;margin:0 auto .875rem;border:2px solid rgba(184,150,12,.3);">
          <i class="fas fa-shield-alt" style="color:var(--gold);font-size:1.25rem;"></i>
        </div>
        <h1 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.35rem;color:var(--ink);margin-bottom:.25rem;">Super Admin Console</h1>
        <p style="font-size:.78rem;color:var(--ink-muted);">India Gully Enterprise Platform</p>
        <div style="margin-top:.75rem;padding:.35rem .75rem;background:rgba(220,38,38,.06);border:1px solid rgba(220,38,38,.2);display:inline-flex;align-items:center;gap:.4rem;">
          <i class="fas fa-exclamation-triangle" style="color:#dc2626;font-size:.65rem;"></i>
          <span style="font-size:.68rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#dc2626;">Restricted Access</span>
        </div>
      </div>

      <div style="padding:2rem 2.25rem 2.25rem;">
        <form class="ig-form" method="POST" action="/api/auth/admin" style="display:flex;flex-direction:column;gap:1rem;">
          <div>
            <label class="ig-lbl">Admin Username</label>
            <input type="text" name="username" class="ig-inp" required placeholder="admin@indiagully.com" autocomplete="off">
          </div>
          <div>
            <label class="ig-lbl">Admin Password</label>
            <input type="password" name="password" class="ig-inp" required placeholder="••••••••••••••••" autocomplete="off">
          </div>
          <div>
            <label class="ig-lbl">2FA / TOTP Code</label>
            <input type="text" name="totp" class="ig-inp" required placeholder="6-digit TOTP" maxlength="6" autocomplete="off" inputmode="numeric">
          </div>
          <button type="submit" class="btn" style="background:linear-gradient(135deg,#6B1A1A,#8B2A2A);color:#fff;border-color:transparent;width:100%;justify-content:center;padding:.8rem;margin-top:.25rem;">
            <i class="fas fa-shield-alt" style="margin-right:.5rem;"></i>Authenticate &amp; Enter
          </button>
        </form>

        <div style="margin-top:1.5rem;padding-top:1.5rem;border-top:1px solid var(--border);text-align:center;">
          <p style="font-size:.7rem;color:var(--ink-faint);margin-bottom:.3rem;">All admin actions are logged with timestamp, IP and identity.</p>
          <p style="font-size:.7rem;color:var(--ink-faint);">Unauthorised access is a criminal offence under IT Act 2000.</p>
        </div>
      </div>
    </div>

    <div style="margin-top:1.5rem;text-align:center;">
      <a href="/" style="font-size:.78rem;color:rgba(255,255,255,.25);" onmouseover="this.style.color='rgba(255,255,255,.5)'" onmouseout="this.style.color='rgba(255,255,255,.25)'">
        <i class="fas fa-arrow-left" style="margin-right:.4rem;font-size:.65rem;"></i>Return to India Gully Website
      </a>
    </div>
  </div>
</div>`
  return c.html(layout('Super Admin', content, { noNav: true }))
})

// ── ADMIN DASHBOARD ───────────────────────────────────────────────────────────
app.get('/dashboard', (c) => {
  return c.html(layout('Admin Dashboard', adminDashboard(), { noNav: true, bodyClass: '' }))
})

function adminDashboard() {
  const modules = [
    { icon:'globe',         label:'CMS',                desc:'Edit content, banners, SEO meta',      color:'#B8960C', link:'#cms' },
    { icon:'users',         label:'User Management',    desc:'Create, manage & deactivate users',     color:'#1A3A6B', link:'#users' },
    { icon:'sitemap',       label:'Workflow Engine',    desc:'Approval flows, escalations, triggers', color:'#6B3A8B', link:'#workflows' },
    { icon:'chart-bar',     label:'Finance ERP',        desc:'Vouchers, GST, P&L, Balance Sheet',    color:'#15803d', link:'#finance' },
    { icon:'user-friends',  label:'HR ERP',             desc:'Payroll, attendance, leave, TDS',       color:'#1d4ed8', link:'#hr' },
    { icon:'gavel',         label:'Governance',         desc:'Board meetings, minutes, registers',    color:'#7c3aed', link:'#governance' },
    { icon:'boxes',         label:'HORECA Inventory',   desc:'SKUs, quotes, procurement pipeline',    color:'#0891b2', link:'#horeca' },
    { icon:'file-signature',label:'Contracts',          desc:'Templates, clauses, e-sign workflow',   color:'#d97706', link:'#contracts' },
    { icon:'plug',          label:'Integrations',       desc:'Vyapar, GST Portal, email, WhatsApp',   color:'#dc2626', link:'#integrations' },
    { icon:'chart-pie',     label:'BI & Reports',       desc:'Board dashboards, finance, HR analytics',color:'#be185d', link:'#bi' },
    { icon:'cog',           label:'System Config',      desc:'Branding, SMTP, storage, API keys',     color:'#374151', link:'#config' },
    { icon:'shield-alt',    label:'Security & Audit',   desc:'Access logs, RBAC matrix, permissions', color:'#991b1b', link:'#security' },
  ]

  return `
<div style="display:flex;height:100vh;overflow:hidden;">
  <!-- SIDEBAR -->
  <aside style="width:240px;flex-shrink:0;background:#0C0C0C;display:flex;flex-direction:column;min-height:100vh;">
    <div style="padding:1.25rem;border-bottom:1px solid rgba(255,255,255,.07);">
      <div class="f-serif" style="color:#fff;font-size:.9rem;letter-spacing:.05em;">INDIA GULLY</div>
      <div style="font-size:.5rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-top:2px;">Super Admin</div>
    </div>
    <nav style="flex:1;padding:.75rem .625rem;overflow-y:auto;">
      <div class="sb-sec">Platform</div>
      ${[
        { icon:'tachometer-alt', label:'Dashboard',       on:true  },
        { icon:'globe',          label:'CMS',             on:false },
        { icon:'file-contract',  label:'Mandates',        on:false },
        { icon:'chart-bar',      label:'Finance ERP',     on:false },
        { icon:'user-friends',   label:'HR ERP',          on:false },
        { icon:'gavel',          label:'Governance',      on:false },
        { icon:'boxes',          label:'HORECA',          on:false },
        { icon:'chart-pie',      label:'BI & Reports',    on:false },
      ].map(item => `
      <a href="#" class="sb-lk ${item.on ? 'on' : ''}">
        <i class="fas fa-${item.icon}" style="width:16px;text-align:center;font-size:.8rem;"></i>${item.label}
      </a>
      `).join('')}
      <div class="sb-sec">System</div>
      ${[
        { icon:'users',      label:'User Management', on:false },
        { icon:'plug',       label:'Integrations',    on:false },
        { icon:'cog',        label:'Config',          on:false },
        { icon:'shield-alt', label:'Security & Audit',on:false },
      ].map(item => `
      <a href="#" class="sb-lk ${item.on ? 'on' : ''}">
        <i class="fas fa-${item.icon}" style="width:16px;text-align:center;font-size:.8rem;"></i>${item.label}
      </a>
      `).join('')}
    </nav>
    <div style="padding:.875rem .625rem;border-top:1px solid rgba(255,255,255,.07);">
      <a href="/" class="sb-lk"><i class="fas fa-sign-out-alt" style="width:16px;text-align:center;font-size:.8rem;"></i>Sign Out</a>
    </div>
  </aside>

  <!-- MAIN CONTENT -->
  <main style="flex:1;overflow-y:auto;background:#F2F2F0;">
    <!-- Top bar -->
    <div style="background:#fff;border-bottom:1px solid var(--border);padding:.875rem 2rem;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:10;">
      <div>
        <h1 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.25rem;color:var(--ink);">Admin Dashboard</h1>
        <p style="font-size:.7rem;color:var(--ink-faint);">India Gully Enterprise Platform · Last sync: 2 min ago</p>
      </div>
      <div style="display:flex;align-items:center;gap:.875rem;">
        <div style="background:rgba(21,128,61,.08);border:1px solid rgba(21,128,61,.2);padding:.3rem .75rem;display:flex;align-items:center;gap:.4rem;">
          <div style="width:6px;height:6px;background:#15803d;border-radius:50%;"></div>
          <span style="font-size:.72rem;color:#15803d;font-weight:600;">All Systems Live</span>
        </div>
        <div style="width:34px;height:34px;background:linear-gradient(135deg,#6B1A1A,#8B2A2A);display:flex;align-items:center;justify-content:center;">
          <i class="fas fa-shield-alt" style="color:var(--gold);font-size:.7rem;"></i>
        </div>
      </div>
    </div>

    <div style="padding:2rem;">
      <!-- Finance KPIs -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:2rem;">
        ${[
          { label:'Revenue MTD',      value:'₹28.4L', sub:'↑ 12% vs last month', c:'var(--gold)' },
          { label:'Receivables',      value:'₹14.2L', sub:'3 invoices outstanding', c:'#1d4ed8' },
          { label:'GST Liability',    value:'₹4.1L',  sub:'Due by 20th Jan', c:'#dc2626' },
          { label:'Bank Balance',     value:'₹67.8L', sub:'All accounts · HDFC', c:'#15803d' },
        ].map(s => `
        <div class="am">
          <div style="font-size:.68rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.625rem;">${s.label}</div>
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:${s.c};line-height:1;margin-bottom:.3rem;">${s.value}</div>
          <div style="font-size:.72rem;color:var(--ink-faint);">${s.sub}</div>
        </div>
        `).join('')}
      </div>

      <!-- HR KPIs -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:2rem;">
        ${[
          { label:'Total Headcount', value:'24',   sub:'3 on leave today',       c:'var(--ink)' },
          { label:'Attendance Today',value:'91%',  sub:'22 present, 2 absent',   c:'#15803d' },
          { label:'Payroll This Month',value:'₹18.5L', sub:'Processed on 1st',  c:'#7c3aed' },
          { label:'Open Requisitions',value:'2',   sub:'1 real estate, 1 admin', c:'#d97706' },
        ].map(s => `
        <div class="am">
          <div style="font-size:.68rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.625rem;">${s.label}</div>
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:${s.c};line-height:1;margin-bottom:.3rem;">${s.value}</div>
          <div style="font-size:.72rem;color:var(--ink-faint);">${s.sub}</div>
        </div>
        `).join('')}
      </div>

      <!-- MODULE GRID -->
      <div style="margin-bottom:2rem;">
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.15rem;color:var(--ink);margin-bottom:1rem;">Platform Modules</h2>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:.875rem;">
          ${modules.map(m => `
          <a href="${m.link}" style="background:#fff;border:1px solid var(--border);padding:1.25rem;display:flex;flex-direction:column;gap:.625rem;transition:border-color .2s,box-shadow .2s;cursor:pointer;" onmouseover="this.style.borderColor='${m.color}';this.style.boxShadow='0 4px 16px rgba(0,0,0,.08)'" onmouseout="this.style.borderColor='var(--border)';this.style.boxShadow='none'">
            <div style="width:36px;height:36px;background:${m.color};display:flex;align-items:center;justify-content:center;">
              <i class="fas fa-${m.icon}" style="color:#fff;font-size:.75rem;"></i>
            </div>
            <div>
              <div style="font-size:.85rem;font-weight:600;color:var(--ink);margin-bottom:.2rem;">${m.label}</div>
              <div style="font-size:.72rem;color:var(--ink-faint);">${m.desc}</div>
            </div>
          </a>
          `).join('')}
        </div>
      </div>

      <!-- RECENT ACTIVITY & GOVERNANCE ALERTS -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;">
        <!-- Audit Log -->
        <div style="background:#fff;border:1px solid var(--border);">
          <div style="padding:1rem 1.5rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
            <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:.95rem;color:var(--ink);">Recent Audit Log</h3>
            <span style="font-size:.68rem;color:var(--ink-faint);">Live</span>
          </div>
          <div style="padding:.5rem 0;">
            ${[
              { user:'admin',       action:'CMS: Updated homepage hero banner',          time:'2 min ago',  type:'edit' },
              { user:'portal/client', action:'Login: CL-001 from 103.x.x.x',           time:'14 min ago', type:'login' },
              { user:'hr-admin',    action:'Payroll: January payroll approved',          time:'1 hr ago',   type:'approve' },
              { user:'admin',       action:'User: akm@indiagully.com profile updated',   time:'3 hr ago',   type:'edit' },
              { user:'portal/board', action:'Board Meeting BM-2024-04 minutes uploaded', time:'5 hr ago',   type:'upload' },
            ].map(log => `
            <div style="padding:.625rem 1.5rem;border-bottom:1px solid var(--border);display:flex;align-items:flex-start;gap:.75rem;">
              <div style="width:6px;height:6px;border-radius:50%;background:${log.type==='login'?'#15803d':log.type==='approve'?'var(--gold)':log.type==='upload'?'#1d4ed8':'var(--ink-faint)'};margin-top:.35rem;flex-shrink:0;"></div>
              <div style="flex:1;min-width:0;">
                <div style="font-size:.78rem;color:var(--ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${log.action}</div>
                <div style="font-size:.68rem;color:var(--ink-faint);">${log.user} · ${log.time}</div>
              </div>
            </div>
            `).join('')}
          </div>
        </div>

        <!-- Governance Alerts -->
        <div style="background:#fff;border:1px solid var(--border);">
          <div style="padding:1rem 1.5rem;border-bottom:1px solid var(--border);">
            <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:.95rem;color:var(--ink);">Governance &amp; Compliance</h3>
          </div>
          <div style="padding:.5rem 0;">
            ${[
              { icon:'check-circle', c:'#15803d', label:'Board Meeting BM-2024-04',            sub:'Minutes signed & uploaded · Jan 10' },
              { icon:'clock',        c:'#d97706', label:'AGM 2024 — 30 days to deadline',       sub:'Documents in preparation · Due Mar 31' },
              { icon:'check-circle', c:'#15803d', label:'MBP-1 & DIR-8 Declarations',          sub:'All 3 directors current · Dec 2024' },
              { icon:'exclamation',  c:'#dc2626', label:'GST Filing — GSTR-1 Due Jan 11',       sub:'Invoices: 12 confirmed, 2 pending' },
              { icon:'check-circle', c:'#15803d', label:'TDS Challans — Q3 FY25',               sub:'Filed Dec 31 · ₹1.2L deposited' },
            ].map(a => `
            <div style="padding:.75rem 1.5rem;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:.875rem;">
              <i class="fas fa-${a.icon}" style="color:${a.c};font-size:.85rem;flex-shrink:0;"></i>
              <div>
                <div style="font-size:.8rem;font-weight:500;color:var(--ink);">${a.label}</div>
                <div style="font-size:.7rem;color:var(--ink-faint);">${a.sub}</div>
              </div>
            </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  </main>
</div>`
}

export default app
