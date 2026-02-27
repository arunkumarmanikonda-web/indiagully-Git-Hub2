import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

// Portal selection
app.get('/', (c) => {
  const content = `
<div style="min-height:100vh;background:linear-gradient(135deg,#080808 0%,#141414 100%);display:flex;align-items:center;justify-content:center;padding:5rem 1.5rem;">
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.04) 1px,transparent 1px);background-size:64px 64px;pointer-events:none;"></div>
  <div style="position:relative;width:100%;max-width:1100px;">
    <div style="text-align:center;margin-bottom:3.5rem;">
      <a href="/" style="display:inline-flex;align-items:center;gap:.75rem;margin-bottom:2.5rem;">
        <svg width="28" height="34" viewBox="0 0 38 46" fill="none">
          <path d="M19 2C9 2 2 9.5 2 19.5C2 26.5 5.8 32.5 11.5 36L9 44H29L26.5 36C32.2 32.5 36 26.5 36 19.5C36 9.5 29 2 19 2Z" stroke="#B8960C" stroke-width="1.5" fill="none"/>
          <path d="M23 8.5C18.5 8.5 15 11.5 14 15.5C13.2 18.5 14.5 21 17 22.5L14.5 27.5C16.5 28.5 18 29 19.5 29C22.5 29 25.5 27.5 27 25C28.5 22.5 28 19.5 25.5 18L27.5 13C26 10 24.5 8.5 23 8.5Z" fill="#B8960C"/>
        </svg>
        <div style="line-height:1;">
          <div class="f-serif" style="color:#fff;font-size:1rem;letter-spacing:.07em;">INDIA GULLY</div>
          <div style="font-size:.48rem;letter-spacing:.24em;text-transform:uppercase;color:var(--gold);margin-top:3px;">Enterprise Platform</div>
        </div>
      </a>
      <h1 style="font-family:'DM Serif Display',Georgia,serif;font-size:2.5rem;color:#fff;margin-bottom:.75rem;">Select Your Portal</h1>
      <p style="font-size:.875rem;color:rgba(255,255,255,.4);">Authorised users only. All access is logged, timestamped and monitored.</p>
      <div style="display:flex;align-items:center;justify-content:center;gap:1.5rem;margin-top:1rem;font-size:.72rem;color:rgba(255,255,255,.25);">
        <span><i class="fas fa-lock" style="color:var(--gold);margin-right:.35rem;"></i>256-bit TLS</span>
        <span><i class="fas fa-shield-alt" style="color:var(--gold);margin-right:.35rem;"></i>RBAC Enforced</span>
        <span><i class="fas fa-eye" style="color:var(--gold);margin-right:.35rem;"></i>Full Audit Trail</span>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem;">
      ${[
        { href:'/portal/client',   icon:'user-tie',  color:'#B8960C', name:'Client Portal',      desc:'Proposals, contracts, invoices, GST documents, deliverables and mandate updates.', who:'Clients & Advisory Partners' },
        { href:'/portal/employee', icon:'users',     color:'#1A3A6B', name:'Employee Portal',    desc:'Attendance, leave, payslips, Form-16, policies, HR documents and company directory.', who:'India Gully Employees' },
        { href:'/portal/board',    icon:'gavel',     color:'#2D2D2D', name:'Board & KMP Portal', desc:'Board meeting packs, voting, statutory registers, director documents and financial dashboards.', who:'Directors & KMPs' },
        { href:'/admin',           icon:'shield-alt',color:'#6B3A1A', name:'Super Admin',        desc:'CMS, user management, workflows, Finance ERP, HR ERP, governance and system configuration.', who:'Authorised Administrators' },
      ].map(p => `
      <a href="${p.href}" class="pc" style="display:block;overflow:hidden;">
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
      <a href="/" style="font-size:.78rem;color:rgba(255,255,255,.3);display:inline-flex;align-items:center;gap:.5rem;transition:color .2s;" onmouseover="this.style.color='rgba(255,255,255,.6)'" onmouseout="this.style.color='rgba(255,255,255,.3)'">
        <i class="fas fa-arrow-left" style="font-size:.6rem;"></i>Return to India Gully Website
      </a>
    </div>
  </div>
</div>`
  return c.html(layout('Enterprise Portal', content, { noNav: true, noFooter: true }))
})

// ── PORTAL LOGIN HELPER ────────────────────────────────────────────────────
function loginPage(opts: {
  portal: string
  title: string
  subtitle: string
  accentColor: string
  icon: string
  idLabel: string
  idPlaceholder: string
  demoId: string
  demoPass: string
  demoOtp?: string
  error?: string
}) {
  const errorBanner = opts.error ? `
  <div style="background:#fef2f2;border-bottom:1px solid #fecaca;padding:.875rem 1.5rem;display:flex;gap:.6rem;align-items:flex-start;">
    <i class="fas fa-exclamation-circle" style="color:#dc2626;font-size:.75rem;margin-top:.15rem;flex-shrink:0;"></i>
    <p style="font-size:.78rem;color:#991b1b;">${opts.error}</p>
  </div>` : ''
  return `
<div style="min-height:100vh;background:linear-gradient(135deg,#080808 0%,#141414 100%);display:flex;align-items:center;justify-content:center;padding:2rem 1.5rem;">
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.04) 1px,transparent 1px);background-size:64px 64px;pointer-events:none;"></div>
  <div style="position:relative;width:100%;max-width:440px;">

    <div style="background:#fff;overflow:hidden;box-shadow:0 40px 100px rgba(0,0,0,.5);">
      <!-- Header -->
      <div style="background:${opts.accentColor};padding:2.25rem;text-align:center;">
        <div style="width:56px;height:56px;background:rgba(255,255,255,.15);display:flex;align-items:center;justify-content:center;margin:0 auto .875rem;">
          <i class="fas fa-${opts.icon}" style="color:#fff;font-size:1.35rem;"></i>
        </div>
        <h1 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:#fff;margin-bottom:.25rem;">${opts.title}</h1>
        <p style="font-size:.78rem;color:rgba(255,255,255,.65);">${opts.subtitle}</p>
        <p style="font-size:.62rem;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-top:.5rem;">India Gully Enterprise Platform</p>
      </div>

      <!-- Demo credentials banner -->
      <div style="background:#fffbeb;border-bottom:1px solid #fde68a;padding:.875rem 1.5rem;display:flex;gap:.6rem;align-items:flex-start;">
        <i class="fas fa-key" style="color:#d97706;font-size:.75rem;margin-top:.15rem;flex-shrink:0;"></i>
        <div>
          <p style="font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#92400e;margin-bottom:.3rem;">Demo Access Credentials</p>
          <p style="font-size:.75rem;color:#78350f;line-height:1.7;"><strong>${opts.idLabel}:</strong> <code style="background:#fef3c7;padding:1px 5px;border-radius:2px;font-size:.72rem;">${opts.demoId}</code><br>
          <strong>Password:</strong> <code style="background:#fef3c7;padding:1px 5px;border-radius:2px;font-size:.72rem;">${opts.demoPass}</code>${opts.demoOtp ? `<br><strong>OTP/2FA:</strong> <code style="background:#fef3c7;padding:1px 5px;border-radius:2px;font-size:.72rem;">${opts.demoOtp}</code>` : ''}</p>
        </div>
      </div>
      ${errorBanner}

      <!-- Form -->
      <div style="padding:2rem;">
        <form class="ig-form" method="POST" action="/api/auth/login" style="display:flex;flex-direction:column;gap:1.1rem;">
          <input type="hidden" name="portal" value="${opts.portal}">
          <div>
            <label class="ig-label">${opts.idLabel}</label>
            <input type="text" name="identifier" class="ig-input" required placeholder="${opts.idPlaceholder}" autocomplete="username">
          </div>
          <div>
            <label class="ig-label">Password</label>
            <input type="password" name="password" class="ig-input" required placeholder="••••••••••••" autocomplete="current-password">
          </div>
          <div>
            <label class="ig-label">OTP / 2FA Code <span style="color:var(--ink-faint);font-weight:400;">(if enabled)</span></label>
            <input type="text" name="otp" class="ig-input" placeholder="6-digit code" maxlength="6" inputmode="numeric">
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <label style="display:flex;align-items:center;gap:.4rem;cursor:pointer;font-size:.75rem;color:var(--ink-soft);">
              <input type="checkbox" name="remember" style="accent-color:var(--gold);">
              Remember this device
            </label>
            <a href="/portal/reset?portal=${opts.portal}" style="font-size:.75rem;color:var(--gold);">Forgot password?</a>
          </div>
          <button type="submit" style="width:100%;padding:.875rem;background:${opts.accentColor};color:#fff;font-size:.78rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:none;cursor:pointer;transition:opacity .2s;" onmouseover="this.style.opacity='.85'" onmouseout="this.style.opacity='1'">
            <i class="fas fa-sign-in-alt" style="margin-right:.5rem;"></i>Secure Login
          </button>
        </form>

        <div style="margin-top:1.5rem;padding-top:1.25rem;border-top:1px solid var(--border);display:flex;justify-content:center;gap:1.5rem;flex-wrap:wrap;">
          <div style="display:flex;align-items:center;gap:.4rem;font-size:.7rem;color:var(--ink-faint);">
            <i class="fas fa-lock" style="color:#22c55e;font-size:.6rem;"></i>256-bit TLS
          </div>
          <div style="display:flex;align-items:center;gap:.4rem;font-size:.7rem;color:var(--ink-faint);">
            <i class="fas fa-shield-alt" style="color:var(--gold);font-size:.6rem;"></i>RBAC Enforced
          </div>
          <div style="display:flex;align-items:center;gap:.4rem;font-size:.7rem;color:var(--ink-faint);">
            <i class="fas fa-eye" style="color:#60a5fa;font-size:.6rem;"></i>Audit Logged
          </div>
        </div>
        <p style="text-align:center;font-size:.68rem;color:var(--ink-faint);margin-top:.875rem;">Authorised users only. All access is logged and monitored.</p>
      </div>
    </div>

    <div style="text-align:center;margin-top:1.5rem;">
      <a href="/portal" style="font-size:.78rem;color:rgba(255,255,255,.3);display:inline-flex;align-items:center;gap:.5rem;transition:color .2s;" onmouseover="this.style.color='rgba(255,255,255,.6)'" onmouseout="this.style.color='rgba(255,255,255,.3)'">
        <i class="fas fa-arrow-left" style="font-size:.6rem;"></i>Back to Portal Selection
      </a>
    </div>
  </div>
</div>`
}

app.get('/client', (c) => {
  const error = c.req.query('error') || ''
  return c.html(layout('Client Portal', loginPage({
    portal: 'client', title: 'Client Portal', subtitle: 'Advisory Services Platform',
    accentColor: '#B8960C', icon: 'user-tie',
    idLabel: 'Client ID or Email', idPlaceholder: 'Client ID or your@email.com',
    demoId: 'demo@indiagully.com',
    demoPass: 'Client@IG2024',
    demoOtp: '000000',
    error,
  }), { noNav: true, noFooter: true }))
})

app.get('/employee', (c) => {
  const error = c.req.query('error') || ''
  return c.html(layout('Employee Portal', loginPage({
    portal: 'employee', title: 'Employee Portal', subtitle: 'HR & Operations Platform',
    accentColor: '#1A3A6B', icon: 'users',
    idLabel: 'Employee ID', idPlaceholder: 'IG-EMP-XXXX',
    demoId: 'IG-EMP-0001',
    demoPass: 'Emp@IG2024',
    demoOtp: '000000',
    error,
  }), { noNav: true, noFooter: true }))
})

app.get('/board', (c) => {
  const error = c.req.query('error') || ''
  return c.html(layout('Board & KMP Portal', loginPage({
    portal: 'board', title: 'Board & KMP Portal', subtitle: 'Governance & Compliance Platform',
    accentColor: '#1E1E1E', icon: 'gavel',
    idLabel: 'Director DIN or KMP ID', idPlaceholder: 'DIN XXXXXXXX or IG-KMP-XXXX',
    demoId: 'IG-KMP-0001',
    demoPass: 'Board@IG2024',
    demoOtp: '000000',
    error,
  }), { noNav: true, noFooter: true }))
})

// Password reset
app.get('/reset', (c) => {
  const portal = c.req.query('portal') || 'client'
  const content = `
<div style="min-height:100vh;background:linear-gradient(135deg,#080808,#141414);display:flex;align-items:center;justify-content:center;padding:2rem;">
  <div style="width:100%;max-width:400px;">
    <div style="background:#fff;overflow:hidden;box-shadow:0 40px 100px rgba(0,0,0,.5);">
      <div style="background:var(--ink);padding:2rem;text-align:center;">
        <div style="width:48px;height:48px;background:var(--gold);display:flex;align-items:center;justify-content:center;margin:0 auto .875rem;">
          <i class="fas fa-key" style="color:#fff;"></i>
        </div>
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:#fff;margin-bottom:.25rem;">Reset Password</h2>
        <p style="font-size:.78rem;color:rgba(255,255,255,.45);">Enter your registered email to receive reset instructions.</p>
      </div>
      <div style="padding:2rem;">
        <form class="ig-form" method="POST" action="/api/auth/reset" style="display:flex;flex-direction:column;gap:1rem;">
          <input type="hidden" name="portal" value="${portal}">
          <div>
            <label class="ig-label">Registered Email Address</label>
            <input type="email" name="email" class="ig-input" required placeholder="your@email.com">
          </div>
          <button type="submit" class="btn btn-g" style="width:100%;justify-content:center;">Send Reset Instructions</button>
        </form>
        <div style="margin-top:1rem;text-align:center;">
          <a href="/portal/${portal}" style="font-size:.78rem;color:var(--gold);">Back to Login</a>
        </div>
      </div>
    </div>
  </div>
</div>`
  return c.html(layout('Password Reset', content, { noNav: true, noFooter: true }))
})

// Client Dashboard stub
app.get('/client/dashboard', (c) => {
  return c.html(layout('Client Dashboard', clientDashboard(), { noNav: true, noFooter: true, bodyClass: 'bg-gray-50' }))
})

function clientDashboard() {
  return `
<div style="display:flex;height:100vh;overflow:hidden;background:#f7f7f7;">
  <!-- SIDEBAR -->
  <aside style="width:240px;flex-shrink:0;background:var(--ink);display:flex;flex-direction:column;min-height:100vh;">
    <div style="padding:1.25rem;border-bottom:1px solid rgba(255,255,255,.07);">
      <div class="f-serif" style="color:#fff;font-size:.95rem;letter-spacing:.06em;">INDIA GULLY</div>
      <div style="font-size:.55rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-top:2px;">Client Portal</div>
    </div>
    <nav style="flex:1;padding:.75rem;overflow-y:auto;">
      ${[
        { icon:'tachometer-alt',  label:'Dashboard',       active:true  },
        { icon:'file-contract',   label:'My Mandates',     active:false },
        { icon:'file-alt',        label:'Proposals',       active:false },
        { icon:'receipt',         label:'Invoices & GST',  active:false },
        { icon:'folder-open',     label:'Documents',       active:false },
        { icon:'comments',        label:'Messages',        active:false },
        { icon:'user-cog',        label:'My Profile',      active:false },
      ].map(item => `
      <a href="#" class="sb-lk ${item.active ? 'on' : ''}">
        <i class="fas fa-${item.icon}" style="width:16px;font-size:.75rem;text-align:center;"></i>${item.label}
      </a>`).join('')}
    </nav>
    <div style="padding:.75rem;border-top:1px solid rgba(255,255,255,.07);">
      <a href="/" class="sb-lk"><i class="fas fa-sign-out-alt" style="width:16px;font-size:.75rem;text-align:center;"></i>Sign Out</a>
    </div>
  </aside>

  <!-- MAIN -->
  <main style="flex:1;overflow-y:auto;">
    <!-- Top bar -->
    <div style="background:#fff;border-bottom:1px solid var(--border);padding:1rem 2rem;display:flex;align-items:center;justify-content:space-between;">
      <div>
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.25rem;color:var(--ink);">Dashboard</h2>
        <p style="font-size:.72rem;color:var(--ink-muted);">Welcome back. Last login: Today, 09:32 AM IST</p>
      </div>
      <div style="display:flex;align-items:center;gap:.875rem;">
        <button style="position:relative;background:none;border:none;cursor:pointer;color:var(--ink-muted);">
          <i class="fas fa-bell"></i>
          <span style="position:absolute;top:0;right:-1px;width:7px;height:7px;background:var(--gold);border-radius:50%;"></span>
        </button>
        <div style="width:34px;height:34px;background:var(--ink);display:flex;align-items:center;justify-content:center;">
          <span style="font-family:'DM Serif Display',Georgia,serif;font-size:.8rem;color:var(--gold);font-weight:700;">CL</span>
        </div>
      </div>
    </div>

    <!-- Content -->
    <div style="padding:2rem;">
      <!-- Stats Row -->
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem;margin-bottom:2rem;">
        ${[
          { label:'Active Mandates',  value:'3',  icon:'file-contract', color:'var(--gold)' },
          { label:'Pending Invoices', value:'2',  icon:'receipt',       color:'#2563eb' },
          { label:'Documents Shared', value:'14', icon:'folder-open',   color:'#16a34a' },
          { label:'Open Messages',    value:'1',  icon:'comments',      color:'#9333ea' },
        ].map(s => `
        <div class="am">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.875rem;">
            <span style="font-size:.65rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-muted);">${s.label}</span>
            <div style="width:32px;height:32px;background:${s.color};display:flex;align-items:center;justify-content:center;">
              <i class="fas fa-${s.icon}" style="color:#fff;font-size:.65rem;"></i>
            </div>
          </div>
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2.5rem;line-height:1;color:var(--ink);">${s.value}</div>
        </div>
        `).join('')}
      </div>

      <!-- Tables Row -->
      <div style="display:grid;grid-template-columns:3fr 2fr;gap:1.5rem;">
        <div style="background:#fff;border:1px solid var(--border);">
          <div style="padding:1.1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
            <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Active Mandates</h3>
            <a href="#" style="font-size:.72rem;color:var(--gold);">View All</a>
          </div>
          <table class="ig-tbl">
            <thead><tr><th>Mandate</th><th>Sector</th><th>Status</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td style="font-size:.85rem;font-weight:500;">Retail Leasing – Mumbai</td><td style="font-size:.8rem;color:var(--ink-muted);">Real Estate</td><td><span class="badge b-gr">Active</span></td><td style="font-family:'DM Serif Display',Georgia,serif;color:var(--gold);">₹2,100 Cr</td></tr>
              <tr><td style="font-size:.85rem;font-weight:500;">Hotel Pre-Opening PMC</td><td style="font-size:.8rem;color:var(--ink-muted);">Hospitality</td><td><span class="badge b-g">In Progress</span></td><td style="font-family:'DM Serif Display',Georgia,serif;color:var(--gold);">₹45 Cr</td></tr>
              <tr><td style="font-size:.85rem;font-weight:500;">Entertainment Feasibility</td><td style="font-size:.8rem;color:var(--ink-muted);">Entertainment</td><td><span class="badge b-bl">Review</span></td><td style="font-family:'DM Serif Display',Georgia,serif;color:var(--gold);">₹4,500 Cr</td></tr>
            </tbody>
          </table>
        </div>
        <div style="background:#fff;border:1px solid var(--border);">
          <div style="padding:1.1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
            <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Recent Invoices</h3>
            <a href="#" style="font-size:.72rem;color:var(--gold);">View All</a>
          </div>
          <table class="ig-tbl">
            <thead><tr><th>Invoice</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              <tr><td style="font-size:.82rem;">INV-2024-001</td><td style="font-family:'DM Serif Display',Georgia,serif;color:var(--gold);font-size:.95rem;">₹2.5L</td><td><span class="badge b-gr">Paid</span></td></tr>
              <tr><td style="font-size:.82rem;">INV-2024-002</td><td style="font-family:'DM Serif Display',Georgia,serif;color:var(--gold);font-size:.95rem;">₹1.8L</td><td><span class="badge b-g">Due</span></td></tr>
              <tr><td style="font-size:.82rem;">INV-2024-003</td><td style="font-family:'DM Serif Display',Georgia,serif;color:var(--gold);font-size:.95rem;">₹3.2L</td><td><span class="badge b-dk">Pending</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>
</div>`
}

// Employee Dashboard
app.get('/employee/dashboard', (c) => {
  return c.html(layout('Employee Portal', employeeDashboard(), { noNav: true, noFooter: true }))
})

function employeeDashboard() {
  return `
<div style="display:flex;height:100vh;overflow:hidden;background:#f7f7f7;">
  <aside style="width:240px;flex-shrink:0;background:#1A3A6B;display:flex;flex-direction:column;min-height:100vh;">
    <div style="padding:1.25rem;border-bottom:1px solid rgba(255,255,255,.1);">
      <div class="f-serif" style="color:#fff;font-size:.95rem;letter-spacing:.06em;">INDIA GULLY</div>
      <div style="font-size:.55rem;letter-spacing:.2em;text-transform:uppercase;color:#93c5fd;margin-top:2px;">Employee Portal</div>
    </div>
    <nav style="flex:1;padding:.75rem;overflow-y:auto;">
      ${[
        { icon:'tachometer-alt',  label:'Dashboard',     active:true  },
        { icon:'calendar-check',  label:'Attendance',    active:false },
        { icon:'umbrella-beach',  label:'Leave',         active:false },
        { icon:'money-check-alt', label:'Payslips',      active:false },
        { icon:'file-invoice',    label:'Form-16',       active:false },
        { icon:'book-open',       label:'Policies',      active:false },
        { icon:'address-book',    label:'Directory',     active:false },
        { icon:'user-cog',        label:'My Profile',    active:false },
      ].map(item => `
      <a href="#" class="sb-lk ${item.active ? 'on' : ''}">
        <i class="fas fa-${item.icon}" style="width:16px;font-size:.75rem;text-align:center;"></i>${item.label}
      </a>`).join('')}
    </nav>
    <div style="padding:.75rem;border-top:1px solid rgba(255,255,255,.1);">
      <a href="/" class="sb-lk"><i class="fas fa-sign-out-alt" style="width:16px;font-size:.75rem;text-align:center;"></i>Sign Out</a>
    </div>
  </aside>
  <main style="flex:1;overflow-y:auto;">
    <div style="background:#fff;border-bottom:1px solid var(--border);padding:1rem 2rem;display:flex;align-items:center;justify-content:space-between;">
      <div>
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.25rem;color:var(--ink);">Employee Dashboard</h2>
        <p style="font-size:.72rem;color:var(--ink-muted);">Welcome back. Today: ${new Date().toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'})}</p>
      </div>
      <div style="width:34px;height:34px;background:#1A3A6B;display:flex;align-items:center;justify-content:center;">
        <span style="font-family:'DM Serif Display',Georgia,serif;font-size:.8rem;color:#fff;font-weight:700;">EE</span>
      </div>
    </div>
    <div style="padding:2rem;">
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem;margin-bottom:2rem;">
        ${[
          { label:'Leave Balance',     value:'12',    sub:'Days available',      icon:'umbrella-beach', color:'#1A3A6B' },
          { label:'Attendance MTD',    value:'96%',   sub:'Present days',        icon:'calendar-check', color:'#16a34a' },
          { label:'Pending Approvals', value:'1',     sub:'Leave pending',       icon:'clock',          color:'#d97706' },
          { label:'Payroll Month',     value:'Feb',   sub:'2025 — Processed',    icon:'money-check-alt',color:'#7c3aed' },
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
      <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);margin-bottom:1rem;">Recent Notices</h3>
        ${[
          { date:'27 Feb 2025', title:'Q1 2025 Performance Reviews — Schedule Released',      type:'HR' },
          { date:'20 Feb 2025', title:'Office Closure — Holi 2025 (14th March)',              type:'Holiday' },
          { date:'15 Feb 2025', title:'Updated Travel & Expense Reimbursement Policy',        type:'Policy' },
        ].map(n => `
        <div style="padding:.875rem 0;border-bottom:1px solid var(--border);display:flex;gap:1rem;align-items:flex-start;">
          <span style="font-size:.68rem;color:var(--ink-muted);white-space:nowrap;margin-top:.15rem;">${n.date}</span>
          <div>
            <span style="font-size:.85rem;font-weight:500;color:var(--ink);">${n.title}</span>
            <span style="margin-left:.5rem;font-size:.65rem;background:#dbeafe;color:#1d4ed8;padding:1px 6px;border-radius:2px;font-weight:600;">${n.type}</span>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </main>
</div>`
}

// Board & KMP Dashboard
app.get('/board/dashboard', (c) => {
  return c.html(layout('Board & KMP Portal', boardDashboard(), { noNav: true, noFooter: true }))
})

function boardDashboard() {
  return `
<div style="display:flex;height:100vh;overflow:hidden;background:#f7f7f7;">
  <aside style="width:240px;flex-shrink:0;background:#1E1E1E;display:flex;flex-direction:column;min-height:100vh;">
    <div style="padding:1.25rem;border-bottom:1px solid rgba(255,255,255,.07);">
      <div class="f-serif" style="color:#fff;font-size:.95rem;letter-spacing:.06em;">INDIA GULLY</div>
      <div style="font-size:.55rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-top:2px;">Board & KMP</div>
    </div>
    <nav style="flex:1;padding:.75rem;overflow-y:auto;">
      ${[
        { icon:'tachometer-alt', label:'Dashboard',       active:true  },
        { icon:'gavel',          label:'Board Meetings',  active:false },
        { icon:'vote-yea',       label:'Voting',          active:false },
        { icon:'book',           label:'Statutory Reg.',  active:false },
        { icon:'file-alt',       label:'Board Packs',     active:false },
        { icon:'chart-bar',      label:'Finance Reports', active:false },
        { icon:'shield-alt',     label:'Compliance',      active:false },
      ].map(item => `
      <a href="#" class="sb-lk ${item.active ? 'on' : ''}">
        <i class="fas fa-${item.icon}" style="width:16px;font-size:.75rem;text-align:center;"></i>${item.label}
      </a>`).join('')}
    </nav>
    <div style="padding:.75rem;border-top:1px solid rgba(255,255,255,.07);">
      <a href="/" class="sb-lk"><i class="fas fa-sign-out-alt" style="width:16px;font-size:.75rem;text-align:center;"></i>Sign Out</a>
    </div>
  </aside>
  <main style="flex:1;overflow-y:auto;">
    <div style="background:#fff;border-bottom:1px solid var(--border);padding:1rem 2rem;display:flex;align-items:center;justify-content:space-between;">
      <div>
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.25rem;color:var(--ink);">Board & KMP Dashboard</h2>
        <p style="font-size:.72rem;color:var(--ink-muted);">Governance & Compliance · India Gully Enterprise Platform</p>
      </div>
      <div style="width:34px;height:34px;background:#1E1E1E;display:flex;align-items:center;justify-content:center;">
        <i class="fas fa-gavel" style="color:var(--gold);font-size:.75rem;"></i>
      </div>
    </div>
    <div style="padding:2rem;">
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem;margin-bottom:2rem;">
        ${[
          { label:'Next Board Meeting', value:'Mar 15',  sub:'2025 — Scheduled',       icon:'calendar',   color:'#1E1E1E' },
          { label:'Pending Resolutions',value:'2',       sub:'For approval',            icon:'vote-yea',   color:'#d97706' },
          { label:'Open Compliance',    value:'0',       sub:'All compliant',           icon:'check-circle',color:'#16a34a' },
          { label:'DIN Status',         value:'Active',  sub:'All directors valid',     icon:'id-card',    color:'#2563eb' },
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
      <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);margin-bottom:1rem;">Upcoming Compliance Calendar</h3>
        ${[
          { date:'15 Mar 2025', event:'Board Meeting — Q1 Review',                    status:'Scheduled' },
          { date:'31 Mar 2025', event:'Annual Accounts Filing (Form AOC-4)',           status:'Due' },
          { date:'30 Jun 2025', event:'Annual Return Filing (Form MGT-7)',             status:'Upcoming' },
          { date:'30 Sep 2025', event:'Secretarial Audit (Form MR-3)',                 status:'Upcoming' },
        ].map(n => `
        <div style="padding:.875rem 0;border-bottom:1px solid var(--border);display:flex;gap:1rem;align-items:center;">
          <span style="font-size:.72rem;color:var(--ink-muted);white-space:nowrap;min-width:90px;">${n.date}</span>
          <span style="font-size:.85rem;color:var(--ink);flex:1;">${n.event}</span>
          <span style="font-size:.68rem;padding:2px 8px;border-radius:2px;font-weight:600;background:${n.status==='Scheduled'?'#dcfce7':n.status==='Due'?'#fef9c3':'#f1f5f9'};color:${n.status==='Scheduled'?'#166534':n.status==='Due'?'#854d0e':'#475569'};">${n.status}</span>
        </div>`).join('')}
      </div>
    </div>
  </main>
</div>`
}

export default app
