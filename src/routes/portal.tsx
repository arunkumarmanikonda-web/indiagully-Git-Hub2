import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

function loginPage(opts: {
  portal: string
  title: string
  subtitle: string
  accentColor: string
  icon: string
  idLabel: string
  idPlaceholder: string
}) {
  return `
<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;background:linear-gradient(135deg,#050505,#111);position:relative;overflow:hidden;">
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.04) 1px,transparent 1px);background-size:60px 60px;pointer-events:none;"></div>

  <div style="position:relative;width:100%;max-width:420px;">
    <!-- Logo -->
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

    <!-- Card -->
    <div style="background:#fff;box-shadow:0 40px 100px rgba(0,0,0,.6);">
      <!-- Header bar -->
      <div style="height:4px;background:${opts.accentColor};"></div>

      <!-- Header content -->
      <div style="padding:2.25rem 2.25rem 1.75rem;text-align:center;background:#fafafa;border-bottom:1px solid var(--border);">
        <div style="width:56px;height:56px;background:${opts.accentColor};display:flex;align-items:center;justify-content:center;margin:0 auto .875rem;">
          <i class="fas fa-${opts.icon}" style="color:#fff;font-size:1.25rem;"></i>
        </div>
        <h1 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.35rem;color:var(--ink);margin-bottom:.25rem;">${opts.title}</h1>
        <p style="font-size:.78rem;color:var(--ink-muted);">${opts.subtitle}</p>
        <p style="font-size:.65rem;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-faint);margin-top:.35rem;">India Gully Enterprise Platform</p>
      </div>

      <!-- Form -->
      <div style="padding:2rem 2.25rem 2.25rem;">
        <form class="ig-form" method="POST" action="/api/auth/login" style="display:flex;flex-direction:column;gap:1rem;">
          <input type="hidden" name="portal" value="${opts.portal}">

          <div>
            <label class="ig-lbl">${opts.idLabel}</label>
            <input type="text" name="identifier" class="ig-inp" required placeholder="${opts.idPlaceholder}" autocomplete="username">
          </div>

          <div>
            <label class="ig-lbl">Password</label>
            <input type="password" name="password" class="ig-inp" required placeholder="••••••••••••" autocomplete="current-password">
          </div>

          <div>
            <label class="ig-lbl">OTP / 2FA Code <span style="color:var(--ink-faint);font-weight:400;text-transform:none;letter-spacing:0;">(if enabled)</span></label>
            <input type="text" name="otp" class="ig-inp" placeholder="6-digit code" maxlength="6" autocomplete="one-time-code" inputmode="numeric">
          </div>

          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:.25rem;">
            <label style="display:flex;align-items:center;gap:.45rem;cursor:pointer;">
              <input type="checkbox" name="remember" style="accent-color:var(--gold);">
              <span style="font-size:.75rem;color:var(--ink-muted);">Remember this device</span>
            </label>
            <a href="/portal/reset?portal=${opts.portal}" style="font-size:.75rem;color:var(--gold);">Forgot password?</a>
          </div>

          <button type="submit" class="btn" style="background:${opts.accentColor};color:#fff;border-color:${opts.accentColor};width:100%;justify-content:center;padding:.8rem;margin-top:.25rem;">
            <i class="fas fa-sign-in-alt" style="margin-right:.5rem;"></i>Secure Login
          </button>
        </form>

        <div style="margin-top:1.5rem;padding-top:1.5rem;border-top:1px solid var(--border);text-align:center;">
          <p style="font-size:.72rem;color:var(--ink-faint);margin-bottom:.625rem;">Authorised users only. All access is logged and monitored.</p>
          <div style="display:flex;align-items:center;justify-content:center;gap:1.25rem;font-size:.72rem;color:var(--ink-faint);">
            <span><i class="fas fa-lock" style="color:#15803d;margin-right:.3rem;"></i>256-bit TLS</span>
            <span><i class="fas fa-shield-alt" style="color:var(--gold);margin-right:.3rem;"></i>RBAC</span>
            <span><i class="fas fa-eye" style="color:#1d4ed8;margin-right:.3rem;"></i>Audit Log</span>
          </div>
        </div>
      </div>
    </div>

    <div style="margin-top:1.5rem;text-align:center;">
      <a href="/" style="font-size:.78rem;color:rgba(255,255,255,.35);transition:color .2s;" onmouseover="this.style.color='rgba(255,255,255,.6)'" onmouseout="this.style.color='rgba(255,255,255,.35)'">
        <i class="fas fa-arrow-left" style="margin-right:.4rem;font-size:.65rem;"></i>Return to India Gully Website
      </a>
    </div>
  </div>
</div>`
}

// ── PORTAL SELECTION ─────────────────────────────────────────────────────────
app.get('/', (c) => {
  const content = `
<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:3rem 1.5rem;background:linear-gradient(135deg,#050505,#111);position:relative;">
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.04) 1px,transparent 1px);background-size:60px 60px;pointer-events:none;"></div>

  <div style="position:relative;width:100%;max-width:960px;">
    <div style="text-align:center;margin-bottom:3.5rem;">
      <a href="/" style="display:inline-flex;align-items:center;gap:.75rem;margin-bottom:2.5rem;">
        <svg width="28" height="34" viewBox="0 0 38 46" fill="none">
          <path d="M19 2C9 2 2 9.5 2 19.5C2 26.5 5.8 32.5 11.5 36L9 44H29L26.5 36C32.2 32.5 36 26.5 36 19.5C36 9.5 29 2 19 2Z" stroke="#B8960C" stroke-width="1.5" fill="none"/>
          <path d="M23 8.5C18.5 8.5 15 11.5 14 15.5C13.2 18.5 14.5 21 17 22.5L14.5 27.5C16.5 28.5 18 29 19.5 29C22.5 29 25.5 27.5 27 25C28.5 22.5 28 19.5 25.5 18L27.5 13C26 10 24.5 8.5 23 8.5Z" fill="#B8960C"/>
          <ellipse cx="20" cy="18" rx="3" ry="4" fill="#111"/>
        </svg>
        <div>
          <div class="f-serif" style="color:#fff;font-size:1rem;letter-spacing:.06em;">INDIA GULLY</div>
          <div style="font-size:.48rem;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);">Celebrating Desiness</div>
        </div>
      </a>
      <h1 style="font-family:'DM Serif Display',Georgia,serif;font-size:2.5rem;color:#fff;margin-bottom:.75rem;">Enterprise Portal</h1>
      <p style="font-size:.9rem;color:rgba(255,255,255,.4);max-width:480px;margin:0 auto .875rem;">Select your authorised portal to continue. All access is encrypted, role-based and fully audited.</p>
      <div style="display:flex;align-items:center;justify-content:center;gap:1.5rem;font-size:.72rem;color:rgba(255,255,255,.3);">
        <span><i class="fas fa-lock" style="color:var(--gold);margin-right:.35rem;"></i>Encrypted</span>
        <span><i class="fas fa-shield-alt" style="color:var(--gold);margin-right:.35rem;"></i>Role-Based</span>
        <span><i class="fas fa-eye" style="color:var(--gold);margin-right:.35rem;"></i>Audit Trail</span>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;">
      ${[
        { href:'/portal/client',   icon:'user-tie',   color:'#B8960C', name:'Client Portal',      desc:'Proposals, contracts, invoices, GST documents, deliverables', who:'For: Clients & Advisory Partners' },
        { href:'/portal/employee', icon:'users',       color:'#1A3A6B', name:'Employee Portal',    desc:'Attendance, leave, payslips, Form-16, policies, directory',    who:'For: India Gully Employees' },
        { href:'/portal/board',    icon:'gavel',       color:'#111111', name:'Board & KMP Portal', desc:'Board meetings, voting, minutes, financial dashboards, director docs', who:'For: Directors & KMPs' },
        { href:'/admin',           icon:'shield-alt',  color:'#6B1A1A', name:'Super Admin',        desc:'CMS, workflows, ERP, permissions, branding, integrations',      who:'Restricted: Administrators Only' },
      ].map(p => `
      <a href="${p.href}" class="pc">
        <div style="height:3px;background:${p.color};"></div>
        <div style="padding:1.5rem;">
          <div style="width:44px;height:44px;background:${p.color};display:flex;align-items:center;justify-content:center;margin-bottom:1rem;">
            <i class="fas fa-${p.icon}" style="color:#fff;font-size:.95rem;"></i>
          </div>
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.05rem;color:var(--ink);margin-bottom:.5rem;">${p.name}</h3>
          <p style="font-size:.75rem;color:var(--ink-muted);line-height:1.6;margin-bottom:.875rem;">${p.desc}</p>
          <p style="font-size:.68rem;font-weight:600;color:var(--ink-faint);">${p.who}</p>
        </div>
        <div style="padding:.875rem 1.5rem;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
          <span style="font-size:.72rem;font-weight:600;color:var(--gold);letter-spacing:.06em;text-transform:uppercase;"><i class="fas fa-lock" style="margin-right:.35rem;font-size:.6rem;"></i>Secure Login</span>
          <i class="fas fa-arrow-right" style="color:var(--ink-faint);font-size:.65rem;"></i>
        </div>
      </a>
      `).join('')}
    </div>

    <div style="margin-top:2rem;text-align:center;">
      <a href="/" style="font-size:.78rem;color:rgba(255,255,255,.25);transition:color .2s;" onmouseover="this.style.color='rgba(255,255,255,.5)'" onmouseout="this.style.color='rgba(255,255,255,.25)'">
        <i class="fas fa-arrow-left" style="margin-right:.4rem;font-size:.65rem;"></i>Return to India Gully Website
      </a>
    </div>
  </div>
</div>`
  return c.html(layout('Enterprise Portal', content, { noNav: true }))
})

// ── CLIENT PORTAL ─────────────────────────────────────────────────────────────
app.get('/client', (c) => {
  return c.html(layout('Client Portal', loginPage({
    portal: 'client', title: 'Client Portal', subtitle: 'Advisory Services Platform',
    accentColor: '#B8960C', icon: 'user-tie',
    idLabel: 'Client ID or Email', idPlaceholder: 'Client ID / your@email.com',
  }), { noNav: true }))
})

// ── EMPLOYEE PORTAL ───────────────────────────────────────────────────────────
app.get('/employee', (c) => {
  return c.html(layout('Employee Portal', loginPage({
    portal: 'employee', title: 'Employee Portal', subtitle: 'HR & Operations Platform',
    accentColor: '#1A3A6B', icon: 'users',
    idLabel: 'Employee ID', idPlaceholder: 'IG-EMP-XXXX',
  }), { noNav: true }))
})

// ── BOARD & KMP PORTAL ────────────────────────────────────────────────────────
app.get('/board', (c) => {
  return c.html(layout('Board & KMP Portal', loginPage({
    portal: 'board', title: 'Board & KMP Portal', subtitle: 'Governance & Compliance Platform',
    accentColor: '#111111', icon: 'gavel',
    idLabel: 'Director DIN / KMP ID', idPlaceholder: 'DIN XXXXXXXX or IG-KMP-XXXX',
  }), { noNav: true }))
})

// ── PASSWORD RESET ────────────────────────────────────────────────────────────
app.get('/reset', (c) => {
  const portal = c.req.query('portal') || 'client'
  const content = `
<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;padding:2rem;background:linear-gradient(135deg,#050505,#111);">
  <div style="width:100%;max-width:400px;">
    <div style="background:#fff;box-shadow:0 40px 100px rgba(0,0,0,.5);">
      <div style="height:3px;background:var(--gold);"></div>
      <div style="padding:2rem 2rem 1.5rem;text-align:center;border-bottom:1px solid var(--border);">
        <div style="width:48px;height:48px;background:var(--gold);display:flex;align-items:center;justify-content:center;margin:0 auto .875rem;">
          <i class="fas fa-key" style="color:#fff;font-size:1rem;"></i>
        </div>
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.25rem;color:var(--ink);margin-bottom:.25rem;">Reset Password</h2>
        <p style="font-size:.78rem;color:var(--ink-muted);">Enter your registered email for reset instructions.</p>
      </div>
      <div style="padding:1.75rem 2rem 2rem;">
        <form class="ig-form" method="POST" action="/api/auth/reset" style="display:flex;flex-direction:column;gap:1rem;">
          <input type="hidden" name="portal" value="${portal}">
          <div>
            <label class="ig-lbl">Registered Email Address</label>
            <input type="email" name="email" class="ig-inp" required placeholder="your@email.com">
          </div>
          <button type="submit" class="btn btn-g" style="width:100%;justify-content:center;">Send Reset Instructions</button>
        </form>
        <div style="margin-top:1.25rem;text-align:center;">
          <a href="/portal/${portal}" style="font-size:.75rem;color:var(--gold);">Back to Login</a>
        </div>
      </div>
    </div>
    <div style="margin-top:1.5rem;text-align:center;">
      <a href="/" style="font-size:.78rem;color:rgba(255,255,255,.3);" onmouseover="this.style.color='rgba(255,255,255,.6)'" onmouseout="this.style.color='rgba(255,255,255,.3)'">
        <i class="fas fa-arrow-left" style="margin-right:.4rem;font-size:.65rem;"></i>Return to India Gully
      </a>
    </div>
  </div>
</div>`
  return c.html(layout('Password Reset', content, { noNav: true }))
})

// ── CLIENT DASHBOARD ──────────────────────────────────────────────────────────
app.get('/client/dashboard', (c) => {
  return c.html(layout('Client Dashboard', clientDashboard(), { noNav: true, bodyClass: 'bg-gray-50' }))
})

function clientDashboard() {
  return `
<div style="display:flex;height:100vh;overflow:hidden;">
  <!-- SIDEBAR -->
  <aside style="width:240px;flex-shrink:0;background:#0C0C0C;display:flex;flex-direction:column;min-height:100vh;">
    <div style="padding:1.25rem;border-bottom:1px solid rgba(255,255,255,.07);">
      <div class="f-serif" style="color:#fff;font-size:.9rem;letter-spacing:.05em;">INDIA GULLY</div>
      <div style="font-size:.55rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-top:2px;">Client Portal</div>
    </div>
    <nav style="flex:1;padding:.75rem .625rem;overflow-y:auto;">
      <div class="sb-sec">Navigation</div>
      ${[
        { icon:'tachometer-alt', label:'Dashboard', on:true  },
        { icon:'file-contract',  label:'My Mandates', on:false },
        { icon:'file-alt',       label:'Proposals',  on:false },
        { icon:'receipt',        label:'Invoices & GST', on:false },
        { icon:'folder-open',    label:'Documents',  on:false },
        { icon:'comments',       label:'Messages',   on:false },
        { icon:'user-cog',       label:'My Profile', on:false },
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

  <!-- MAIN -->
  <main style="flex:1;overflow-y:auto;background:#F4F4F2;">
    <!-- Top bar -->
    <div style="background:#fff;border-bottom:1px solid var(--border);padding:.875rem 2rem;display:flex;align-items:center;justify-content:space-between;">
      <div>
        <h1 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.25rem;color:var(--ink);">Dashboard</h1>
        <p style="font-size:.72rem;color:var(--ink-faint);">Welcome back. Last login: Today, 09:32 AM IST</p>
      </div>
      <div style="display:flex;align-items:center;gap:.875rem;">
        <button style="background:none;border:none;cursor:pointer;padding:.4rem;position:relative;color:var(--ink-muted);">
          <i class="fas fa-bell" style="font-size:.9rem;"></i>
          <span style="position:absolute;top:2px;right:2px;width:7px;height:7px;background:var(--gold);border-radius:50%;"></span>
        </button>
        <div style="width:34px;height:34px;background:var(--ink);display:flex;align-items:center;justify-content:center;">
          <span style="font-size:.65rem;font-weight:700;color:var(--gold);">CL</span>
        </div>
      </div>
    </div>

    <div style="padding:2rem;">
      <!-- Stats -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:2rem;">
        ${[
          { label:'Active Mandates',   value:'3',  icon:'file-contract', c:'var(--gold)' },
          { label:'Pending Invoices',  value:'2',  icon:'receipt',       c:'#1d4ed8' },
          { label:'Documents Shared',  value:'14', icon:'folder-open',   c:'#15803d' },
          { label:'Open Messages',     value:'1',  icon:'comments',      c:'#7c3aed' },
        ].map(s => `
        <div class="am">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.875rem;">
            <span style="font-size:.68rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);">${s.label}</span>
            <div style="width:32px;height:32px;background:${s.c};display:flex;align-items:center;justify-content:center;">
              <i class="fas fa-${s.icon}" style="color:#fff;font-size:.7rem;"></i>
            </div>
          </div>
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2.5rem;color:var(--ink);line-height:1;">${s.value}</div>
        </div>
        `).join('')}
      </div>

      <!-- Tables row -->
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.5rem;">
        <div style="background:#fff;border:1px solid var(--border);">
          <div style="padding:1.25rem 1.5rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
            <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Active Mandates</h3>
            <a href="#" style="font-size:.72rem;color:var(--gold);">View All</a>
          </div>
          <table class="ig-tbl">
            <thead><tr><th>Mandate</th><th>Status</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td style="font-size:.85rem;font-weight:500;">Retail Leasing – Mumbai</td><td><span class="badge b-gr">Active</span></td><td style="color:var(--gold);font-weight:700;font-size:.85rem;">₹2,100 Cr</td></tr>
              <tr><td style="font-size:.85rem;font-weight:500;">Hotel Pre-Opening PMC</td><td><span class="badge b-g">In Progress</span></td><td style="color:var(--gold);font-weight:700;font-size:.85rem;">₹45 Cr</td></tr>
              <tr><td style="font-size:.85rem;font-weight:500;">Entertainment Feasibility</td><td><span class="badge b-dk">Review</span></td><td style="color:var(--gold);font-weight:700;font-size:.85rem;">₹4,500 Cr</td></tr>
            </tbody>
          </table>
        </div>

        <div style="background:#fff;border:1px solid var(--border);">
          <div style="padding:1.25rem 1.5rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
            <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Recent Invoices</h3>
            <a href="#" style="font-size:.72rem;color:var(--gold);">View All</a>
          </div>
          <table class="ig-tbl">
            <thead><tr><th>Invoice</th><th>Date</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td style="font-size:.82rem;">INV-2024-001</td><td style="font-size:.82rem;color:var(--ink-faint);">Dec 15</td><td style="color:var(--gold);font-weight:700;font-size:.82rem;">₹2.5L</td><td><span class="badge b-gr">Paid</span></td></tr>
              <tr><td style="font-size:.82rem;">INV-2024-002</td><td style="font-size:.82rem;color:var(--ink-faint);">Dec 20</td><td style="color:var(--gold);font-weight:700;font-size:.82rem;">₹1.8L</td><td><span class="badge b-g">Due</span></td></tr>
              <tr><td style="font-size:.82rem;">INV-2024-003</td><td style="font-size:.82rem;color:var(--ink-faint);">Jan 5</td><td style="color:var(--gold);font-weight:700;font-size:.82rem;">₹3.2L</td><td><span class="badge b-dk">Pending</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</div>`
}

export default app
