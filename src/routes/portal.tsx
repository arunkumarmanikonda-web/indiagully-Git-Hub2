import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

// ── PORTAL SELECTION ──────────────────────────────────────────────────────────
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
      <a href="/" style="font-size:.78rem;color:rgba(255,255,255,.3);">
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
  idLabel: string; idPlaceholder: string; demoId: string; demoPass: string; demoOtp?: string; error?: string
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
      <div style="background:#fffbeb;border-bottom:1px solid #fde68a;padding:.875rem 1.5rem;display:flex;gap:.6rem;">
        <i class="fas fa-key" style="color:#d97706;font-size:.75rem;margin-top:.15rem;flex-shrink:0;"></i>
        <div>
          <p style="font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#92400e;margin-bottom:.3rem;">Demo Access</p>
          <p style="font-size:.75rem;color:#78350f;line-height:1.7;">
            <strong>${opts.idLabel}:</strong> <code style="background:#fef3c7;padding:1px 5px;font-size:.72rem;">${opts.demoId}</code><br>
            <strong>Password:</strong> <code style="background:#fef3c7;padding:1px 5px;font-size:.72rem;">${opts.demoPass}</code>
            ${opts.demoOtp ? `<br><strong>OTP/2FA:</strong> <code style="background:#fef3c7;padding:1px 5px;font-size:.72rem;">${opts.demoOtp}</code>` : ''}
          </p>
        </div>
      </div>
      ${errorBanner}
      <div style="padding:2rem;">
        <form method="POST" action="/api/auth/login" style="display:flex;flex-direction:column;gap:1.1rem;">
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
            <label class="ig-label">OTP / 2FA Code <span style="color:var(--ink-faint);font-weight:400;">(optional for demo)</span></label>
            <input type="text" name="otp" class="ig-input" placeholder="6-digit code" maxlength="6" inputmode="numeric">
          </div>
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <label style="display:flex;align-items:center;gap:.4rem;cursor:pointer;font-size:.75rem;color:var(--ink-soft);">
              <input type="checkbox" name="remember" style="accent-color:var(--gold);">Remember this device
            </label>
            <a href="/portal/reset?portal=${opts.portal}" style="font-size:.75rem;color:var(--gold);">Forgot password?</a>
          </div>
          <button type="submit" style="width:100%;padding:.875rem;background:${opts.accentColor};color:#fff;font-size:.78rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;border:none;cursor:pointer;">
            <i class="fas fa-sign-in-alt" style="margin-right:.5rem;"></i>Secure Login
          </button>
        </form>
        <p style="text-align:center;font-size:.68rem;color:var(--ink-faint);margin-top:.875rem;">Authorised users only. All access is logged and monitored.</p>
      </div>
    </div>
    <div style="text-align:center;margin-top:1.5rem;">
      <a href="/portal" style="font-size:.78rem;color:rgba(255,255,255,.3);">
        <i class="fas fa-arrow-left" style="font-size:.6rem;"></i> Back to Portal Selection
      </a>
    </div>
  </div>
</div>`
}

// ── LOGIN PAGES ───────────────────────────────────────────────────────────────
app.get('/client', (c) => {
  const error = c.req.query('error') || ''
  return c.html(layout('Client Portal', loginPage({
    portal:'client', title:'Client Portal', subtitle:'Advisory Services Platform',
    accentColor:'#B8960C', icon:'user-tie',
    idLabel:'Client ID or Email', idPlaceholder:'your@email.com',
    demoId:'demo@indiagully.com', demoPass:'Client@IG2024', demoOtp:'000000', error
  }), { noNav:true, noFooter:true }))
})

app.get('/employee', (c) => {
  const error = c.req.query('error') || ''
  return c.html(layout('Employee Portal', loginPage({
    portal:'employee', title:'Employee Portal', subtitle:'HR & Operations Platform',
    accentColor:'#1A3A6B', icon:'users',
    idLabel:'Employee ID', idPlaceholder:'IG-EMP-XXXX',
    demoId:'IG-EMP-0001', demoPass:'Emp@IG2024', demoOtp:'000000', error
  }), { noNav:true, noFooter:true }))
})

app.get('/board', (c) => {
  const error = c.req.query('error') || ''
  return c.html(layout('Board & KMP Portal', loginPage({
    portal:'board', title:'Board & KMP Portal', subtitle:'Governance & Compliance Platform',
    accentColor:'#1E1E1E', icon:'gavel',
    idLabel:'Director DIN or KMP ID', idPlaceholder:'DIN XXXXXXXX or IG-KMP-XXXX',
    demoId:'IG-KMP-0001', demoPass:'Board@IG2024', demoOtp:'000000', error
  }), { noNav:true, noFooter:true }))
})

// ── PASSWORD RESET ────────────────────────────────────────────────────────────
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
        <form method="POST" action="/api/auth/reset" style="display:flex;flex-direction:column;gap:1rem;">
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
  return c.html(layout('Password Reset', content, { noNav:true, noFooter:true }))
})

// ═════════════════════════════════════════════════════════════════════════════
// ── CLIENT PORTAL ─────────────────────────────────────────────────────────────
// ═════════════════════════════════════════════════════════════════════════════

function clientShell(pageTitle: string, active: string, body: string) {
  const nav = [
    { id:'dashboard',  icon:'tachometer-alt', label:'Dashboard'      },
    { id:'mandates',   icon:'file-contract',  label:'My Mandates'    },
    { id:'proposals',  icon:'file-alt',       label:'Proposals'      },
    { id:'invoices',   icon:'receipt',        label:'Invoices & GST' },
    { id:'documents',  icon:'folder-open',    label:'Documents'      },
    { id:'messages',   icon:'comments',       label:'Messages'       },
    { id:'profile',    icon:'user-cog',       label:'My Profile'     },
  ]
  return `
<div style="display:flex;height:100vh;overflow:hidden;background:#f7f7f7;">
  <aside style="width:240px;flex-shrink:0;background:var(--ink);display:flex;flex-direction:column;min-height:100vh;">
    <a href="/portal/client/dashboard" style="padding:1.25rem;border-bottom:1px solid rgba(255,255,255,.07);display:block;">
      <div class="f-serif" style="color:#fff;font-size:.95rem;letter-spacing:.06em;">INDIA GULLY</div>
      <div style="font-size:.55rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-top:2px;">Client Portal</div>
    </a>
    <nav style="flex:1;padding:.75rem;overflow-y:auto;">
      ${nav.map(i => `
      <a href="/portal/client/${i.id === 'dashboard' ? 'dashboard' : i.id}" class="sb-lk ${active === i.id ? 'on' : ''}">
        <i class="fas fa-${i.icon}" style="width:16px;font-size:.75rem;text-align:center;"></i>${i.label}
      </a>`).join('')}
    </nav>
    <div style="padding:.75rem;border-top:1px solid rgba(255,255,255,.07);">
      <a href="/portal" class="sb-lk" style="color:#ef4444 !important;"><i class="fas fa-sign-out-alt" style="width:16px;font-size:.75rem;text-align:center;"></i>Sign Out</a>
    </div>
  </aside>
  <main style="flex:1;overflow-y:auto;display:flex;flex-direction:column;">
    <div style="background:#fff;border-bottom:1px solid var(--border);padding:1rem 2rem;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
      <div>
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.2rem;color:var(--ink);">${pageTitle}</h2>
        <p style="font-size:.72rem;color:var(--ink-muted);">Client Portal · India Gully Enterprise Platform</p>
      </div>
      <div style="width:34px;height:34px;background:var(--gold);display:flex;align-items:center;justify-content:center;">
        <span style="font-family:'DM Serif Display',Georgia,serif;font-size:.8rem;color:#fff;font-weight:700;">CL</span>
      </div>
    </div>
    <div style="flex:1;padding:2rem;overflow-y:auto;">${body}</div>
  </main>
</div>`
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
            <tr><td style="font-size:.85rem;font-weight:500;">Retail Leasing – Mumbai</td><td style="font-size:.8rem;color:var(--ink-muted);">Real Estate</td><td><span class="badge b-gr">Active</span></td><td style="font-family:'DM Serif Display',Georgia,serif;color:var(--gold);">₹2,100 Cr</td></tr>
            <tr><td style="font-size:.85rem;font-weight:500;">Hotel Pre-Opening PMC</td><td style="font-size:.8rem;color:var(--ink-muted);">Hospitality</td><td><span class="badge b-g">In Progress</span></td><td style="font-family:'DM Serif Display',Georgia,serif;color:var(--gold);">₹45 Cr</td></tr>
            <tr><td style="font-size:.85rem;font-weight:500;">Entertainment Feasibility</td><td style="font-size:.8rem;color:var(--ink-muted);">Entertainment</td><td><span class="badge b-bl">Review</span></td><td style="font-family:'DM Serif Display',Georgia,serif;color:var(--gold);">₹4,500 Cr</td></tr>
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
            <tr><td style="font-size:.82rem;">INV-2025-001</td><td style="font-family:'DM Serif Display',Georgia,serif;color:var(--gold);">₹2.5L</td><td><span class="badge b-gr">Paid</span></td></tr>
            <tr><td style="font-size:.82rem;">INV-2025-002</td><td style="font-family:'DM Serif Display',Georgia,serif;color:var(--gold);">₹1.8L</td><td><span class="badge b-g">Due</span></td></tr>
            <tr><td style="font-size:.82rem;">INV-2025-003</td><td style="font-family:'DM Serif Display',Georgia,serif;color:var(--gold);">₹3.2L</td><td><span class="badge b-dk">Draft</span></td></tr>
          </tbody>
        </table>
      </div>
    </div>`
  return c.html(layout('Client Dashboard', clientShell('Dashboard', 'dashboard', body), { noNav:true, noFooter:true }))
})

app.get('/client/mandates', (c) => {
  const body = `
    <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">All Mandates</h3>
        <a href="/contact" style="background:var(--gold);color:#fff;padding:.35rem .875rem;font-size:.72rem;font-weight:600;letter-spacing:.07em;text-transform:uppercase;">+ Submit New</a>
      </div>
      <table class="ig-tbl">
        <thead><tr><th>Mandate ID</th><th>Project Name</th><th>Sector</th><th>Value</th><th>Advisor</th><th>Start Date</th><th>Status</th></tr></thead>
        <tbody>
          ${[
            { id:'MND-001', name:'Retail Leasing — Mumbai',      sector:'Real Estate',   value:'₹2,100 Cr', advisor:'Amit Jhingan',   start:'01 Jan 2025', status:'Active',      cls:'b-gr' },
            { id:'MND-002', name:'Hotel Pre-Opening PMC',        sector:'Hospitality',   value:'₹45 Cr',    advisor:'Arun Manikonda', start:'15 Feb 2025', status:'In Progress', cls:'b-g'  },
            { id:'MND-003', name:'Entertainment Feasibility',    sector:'Entertainment', value:'₹4,500 Cr', advisor:'Arun Manikonda', start:'01 Mar 2025', status:'Review',      cls:'b-bl' },
          ].map(m => `
          <tr>
            <td style="font-size:.78rem;font-weight:600;color:var(--gold);">${m.id}</td>
            <td style="font-weight:500;">${m.name}</td>
            <td><span class="badge b-dk">${m.sector}</span></td>
            <td style="font-family:'DM Serif Display',Georgia,serif;color:var(--gold);">${m.value}</td>
            <td style="font-size:.82rem;">${m.advisor}</td>
            <td style="font-size:.78rem;color:var(--ink-muted);">${m.start}</td>
            <td><span class="badge ${m.cls}">${m.status}</span></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>`
  return c.html(layout('My Mandates', clientShell('My Mandates', 'mandates', body), { noNav:true, noFooter:true }))
})

app.get('/client/proposals', (c) => {
  const body = `
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Proposals & Engagement Letters</h3>
      </div>
      <table class="ig-tbl">
        <thead><tr><th>Document</th><th>Type</th><th>Date Sent</th><th>Valid Until</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          ${[
            { doc:'Advisory Proposal — Q1 2025',     type:'Proposal',           sent:'01 Jan 2025', valid:'31 Mar 2025', status:'Accepted',  cls:'b-gr' },
            { doc:'Hotel PMC Engagement Letter',      type:'Engagement Letter',  sent:'10 Feb 2025', valid:'10 Mar 2025', status:'Signed',    cls:'b-gr' },
            { doc:'Entertainment Feasibility Scope',  type:'Scope Letter',       sent:'20 Feb 2025', valid:'20 Mar 2025', status:'Pending',   cls:'b-g'  },
            { doc:'Revised Fee Proposal — FY 2026',   type:'Proposal',           sent:'25 Feb 2025', valid:'25 Mar 2025', status:'Under Review', cls:'b-bl' },
          ].map(p => `
          <tr>
            <td style="font-weight:500;">${p.doc}</td>
            <td><span class="badge b-dk">${p.type}</span></td>
            <td style="font-size:.78rem;color:var(--ink-muted);">${p.sent}</td>
            <td style="font-size:.78rem;color:var(--ink-muted);">${p.valid}</td>
            <td><span class="badge ${p.cls}">${p.status}</span></td>
            <td><a href="#" onclick="alert('Document viewer in Phase 2');return false;" style="font-size:.72rem;color:var(--gold);">View PDF</a></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>`
  return c.html(layout('Proposals', clientShell('Proposals', 'proposals', body), { noNav:true, noFooter:true }))
})

app.get('/client/invoices', (c) => {
  const body = `
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:1.5rem;">
      ${[
        { label:'Total Billed',   value:'₹7.5L',  color:'var(--gold)' },
        { label:'Amount Paid',    value:'₹2.5L',  color:'#16a34a'    },
        { label:'Amount Due',     value:'₹5.0L',  color:'#dc2626'    },
      ].map(s => `
      <div class="am">
        <div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.5rem;">${s.label}</div>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2rem;color:${s.color};">${s.value}</div>
      </div>`).join('')}
    </div>
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Invoice History</h3>
      </div>
      <table class="ig-tbl">
        <thead><tr><th>Invoice #</th><th>Description</th><th>Amount</th><th>GST</th><th>Total</th><th>Due Date</th><th>Status</th><th>Download</th></tr></thead>
        <tbody>
          ${[
            { inv:'INV-2025-001', desc:'Advisory Retainer — Jan 2025',   amt:'₹2.12L', gst:'₹0.38L', total:'₹2.5L',  due:'15 Feb 2025', status:'Paid',    cls:'b-gr' },
            { inv:'INV-2025-002', desc:'Hotel PMC — Phase 1',             amt:'₹1.53L', gst:'₹0.27L', total:'₹1.8L',  due:'28 Feb 2025', status:'Overdue', cls:'b-re' },
            { inv:'INV-2025-003', desc:'Entertainment Feasibility Study', amt:'₹2.71L', gst:'₹0.49L', total:'₹3.2L',  due:'31 Mar 2025', status:'Draft',   cls:'b-dk' },
          ].map(r => `
          <tr>
            <td style="font-weight:600;font-size:.82rem;color:var(--gold);">${r.inv}</td>
            <td style="font-size:.82rem;">${r.desc}</td>
            <td style="font-family:'DM Serif Display',Georgia,serif;">${r.amt}</td>
            <td style="font-size:.78rem;color:var(--ink-muted);">${r.gst}</td>
            <td style="font-family:'DM Serif Display',Georgia,serif;font-weight:600;">${r.total}</td>
            <td style="font-size:.78rem;color:var(--ink-muted);">${r.due}</td>
            <td><span class="badge ${r.cls}">${r.status}</span></td>
            <td><a href="#" onclick="alert('PDF download in Phase 2');return false;" style="font-size:.72rem;color:var(--gold);"><i class="fas fa-download"></i></a></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>`
  return c.html(layout('Invoices & GST', clientShell('Invoices & GST', 'invoices', body), { noNav:true, noFooter:true }))
})

app.get('/client/documents', (c) => {
  const body = `
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
        <a href="#" onclick="alert('Document folder in Phase 2');return false;" style="margin-left:auto;font-size:.72rem;color:var(--gold);">Open →</a>
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
            { name:'Advisory Agreement FY2025.pdf',      type:'Contract',   by:'Arun Manikonda', date:'01 Jan 2025', size:'1.2 MB'  },
            { name:'Hotel PMC Scope Letter.pdf',          type:'Letter',     by:'Arun Manikonda', date:'10 Feb 2025', size:'0.8 MB'  },
            { name:'Market Research Report Q4 2024.pdf', type:'Report',     by:'India Gully',    date:'15 Jan 2025', size:'4.5 MB'  },
            { name:'INV-2025-001 with GST.pdf',          type:'Invoice',    by:'Finance Team',   date:'15 Jan 2025', size:'0.3 MB'  },
          ].map(d => `
          <tr>
            <td style="font-weight:500;font-size:.85rem;"><i class="fas fa-file-pdf" style="color:#dc2626;margin-right:.4rem;font-size:.7rem;"></i>${d.name}</td>
            <td><span class="badge b-dk">${d.type}</span></td>
            <td style="font-size:.8rem;">${d.by}</td>
            <td style="font-size:.78rem;color:var(--ink-muted);">${d.date}</td>
            <td style="font-size:.78rem;color:var(--ink-muted);">${d.size}</td>
            <td><a href="#" onclick="alert('Document viewer in Phase 2');return false;" style="font-size:.72rem;color:var(--gold);">Download</a></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>`
  return c.html(layout('Documents', clientShell('Documents', 'documents', body), { noNav:true, noFooter:true }))
})

app.get('/client/messages', (c) => {
  const body = `
    <div style="display:grid;grid-template-columns:1fr 2fr;gap:1.5rem;height:calc(100vh - 200px);">
      <div style="background:#fff;border:1px solid var(--border);overflow-y:auto;">
        <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);font-size:.82rem;font-weight:600;color:var(--ink);">Conversations</div>
        ${[
          { name:'Arun Manikonda', role:'Managing Director', msg:'Please review the updated proposal...', time:'10:30 AM', unread:1, color:'#B8960C' },
          { name:'Amit Jhingan',   role:'President, Real Estate', msg:'Site visit confirmed for Thursday...', time:'Yesterday', unread:0, color:'#4f46e5' },
          { name:'Finance Team',   role:'Billing & Accounts', msg:'Invoice INV-2025-002 is due...', time:'2 days ago', unread:0, color:'#16a34a' },
        ].map(c => `
        <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);cursor:pointer;display:flex;gap:.75rem;" onmouseover="this.style.background='var(--parch-dk)'" onmouseout="this.style.background='transparent'">
          <div style="width:36px;height:36px;background:${c.color};display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:'DM Serif Display',Georgia,serif;color:#fff;font-size:.8rem;">${c.name[0]}</div>
          <div style="flex:1;min-width:0;">
            <div style="display:flex;justify-content:space-between;margin-bottom:.15rem;">
              <span style="font-size:.82rem;font-weight:600;color:var(--ink);">${c.name}</span>
              <span style="font-size:.68rem;color:var(--ink-muted);">${c.time}</span>
            </div>
            <div style="font-size:.72rem;color:var(--ink-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${c.msg}</div>
          </div>
          ${c.unread ? `<div style="width:18px;height:18px;background:var(--gold);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.6rem;color:#fff;font-weight:700;flex-shrink:0;">${c.unread}</div>` : ''}
        </div>`).join('')}
      </div>
      <div style="background:#fff;border:1px solid var(--border);display:flex;flex-direction:column;">
        <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:.75rem;">
          <div style="width:36px;height:36px;background:#B8960C;display:flex;align-items:center;justify-content:center;font-family:'DM Serif Display',Georgia,serif;color:#fff;">A</div>
          <div>
            <div style="font-size:.875rem;font-weight:600;color:var(--ink);">Arun Manikonda</div>
            <div style="font-size:.72rem;color:var(--ink-muted);">Managing Director · akm@indiagully.com</div>
          </div>
        </div>
        <div style="flex:1;padding:1.25rem;overflow-y:auto;display:flex;flex-direction:column;gap:1rem;">
          <div style="display:flex;gap:.75rem;">
            <div style="width:30px;height:30px;background:#B8960C;display:flex;align-items:center;justify-content:center;font-family:'DM Serif Display',Georgia,serif;color:#fff;font-size:.75rem;flex-shrink:0;">A</div>
            <div style="background:var(--parch-dk);padding:.75rem 1rem;max-width:75%;">
              <p style="font-size:.85rem;color:var(--ink);line-height:1.6;">Good morning! Please review the updated Q1 2025 proposal I've shared in your Documents section. Looking forward to your feedback.</p>
              <span style="font-size:.68rem;color:var(--ink-muted);">10:30 AM · 27 Feb 2025</span>
            </div>
          </div>
          <div style="display:flex;gap:.75rem;flex-direction:row-reverse;">
            <div style="width:30px;height:30px;background:var(--ink);display:flex;align-items:center;justify-content:center;font-family:'DM Serif Display',Georgia,serif;color:var(--gold);font-size:.75rem;flex-shrink:0;">C</div>
            <div style="background:var(--ink);padding:.75rem 1rem;max-width:75%;">
              <p style="font-size:.85rem;color:#fff;line-height:1.6;">Thank you, I will review it today and share my comments by EOD.</p>
              <span style="font-size:.68rem;color:rgba(255,255,255,.4);">11:15 AM · 27 Feb 2025</span>
            </div>
          </div>
        </div>
        <div style="padding:.875rem 1.25rem;border-top:1px solid var(--border);display:flex;gap:.75rem;">
          <input type="text" class="ig-input" placeholder="Type a message..." style="flex:1;">
          <button onclick="alert('Message sent!')" style="background:var(--gold);color:#fff;border:none;padding:.6rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;white-space:nowrap;">Send</button>
        </div>
      </div>
    </div>`
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
          <p style="font-size:.72rem;color:var(--ink-muted);">Member since: Jan 2025</p>
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
          <button onclick="alert('Profile edit in Phase 2')" style="background:var(--gold);color:#fff;border:none;padding:.6rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;width:fit-content;margin-top:.5rem;">Edit Profile</button>
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
    { id:'dashboard',  icon:'tachometer-alt',  label:'Dashboard'       },
    { id:'attendance', icon:'calendar-check',  label:'Attendance'      },
    { id:'leave',      icon:'umbrella-beach',  label:'Leave'           },
    { id:'payslips',   icon:'money-check-alt', label:'Payslips'        },
    { id:'form16',     icon:'file-invoice',    label:'Form-16'         },
    { id:'policies',   icon:'book-open',       label:'Policies'        },
    { id:'directory',  icon:'address-book',    label:'Directory'       },
    { id:'profile',    icon:'user-cog',        label:'My Profile'      },
  ]
  return `
<div style="display:flex;height:100vh;overflow:hidden;background:#f7f7f7;">
  <aside style="width:240px;flex-shrink:0;background:#1A3A6B;display:flex;flex-direction:column;min-height:100vh;">
    <a href="/portal/employee/dashboard" style="padding:1.25rem;border-bottom:1px solid rgba(255,255,255,.1);display:block;">
      <div class="f-serif" style="color:#fff;font-size:.95rem;letter-spacing:.06em;">INDIA GULLY</div>
      <div style="font-size:.55rem;letter-spacing:.2em;text-transform:uppercase;color:#93c5fd;margin-top:2px;">Employee Portal</div>
    </a>
    <nav style="flex:1;padding:.75rem;overflow-y:auto;">
      ${nav.map(i => `
      <a href="/portal/employee/${i.id === 'dashboard' ? 'dashboard' : i.id}" class="sb-lk ${active === i.id ? 'on' : ''}">
        <i class="fas fa-${i.icon}" style="width:16px;font-size:.75rem;text-align:center;"></i>${i.label}
      </a>`).join('')}
    </nav>
    <div style="padding:.75rem;border-top:1px solid rgba(255,255,255,.1);">
      <a href="/portal" class="sb-lk" style="color:#ef4444 !important;"><i class="fas fa-sign-out-alt" style="width:16px;font-size:.75rem;text-align:center;"></i>Sign Out</a>
    </div>
  </aside>
  <main style="flex:1;overflow-y:auto;display:flex;flex-direction:column;">
    <div style="background:#fff;border-bottom:1px solid var(--border);padding:1rem 2rem;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
      <div>
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.2rem;color:var(--ink);">${pageTitle}</h2>
        <p style="font-size:.72rem;color:var(--ink-muted);">Employee Portal · India Gully</p>
      </div>
      <div style="width:34px;height:34px;background:#1A3A6B;display:flex;align-items:center;justify-content:center;">
        <span style="font-family:'DM Serif Display',Georgia,serif;font-size:.8rem;color:#fff;font-weight:700;">EE</span>
      </div>
    </div>
    <div style="flex:1;padding:2rem;overflow-y:auto;">${body}</div>
  </main>
</div>`
}

app.get('/employee/dashboard', (c) => {
  const body = `
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem;margin-bottom:2rem;">
      ${[
        { label:'Leave Balance',     value:'12',  sub:'Days available',   icon:'umbrella-beach',  color:'#1A3A6B' },
        { label:'Attendance MTD',    value:'96%', sub:'Present this month', icon:'calendar-check', color:'#16a34a' },
        { label:'Pending Approvals', value:'1',   sub:'Leave pending',    icon:'clock',           color:'#d97706' },
        { label:'Payroll Month',     value:'Feb', sub:'2025 — Processed', icon:'money-check-alt', color:'#7c3aed' },
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
        { date:'27 Feb 2025', title:'Q1 2025 Performance Reviews — Schedule Released',     type:'HR' },
        { date:'20 Feb 2025', title:'Office Closure — Holi 2025 (14th March)',             type:'Holiday' },
        { date:'15 Feb 2025', title:'Updated Travel & Expense Reimbursement Policy',       type:'Policy' },
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
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:1.5rem;">
      ${[
        { label:'Present Days (Feb)', value:'18', color:'#16a34a' },
        { label:'Absent Days',        value:'1',  color:'#dc2626' },
        { label:'Attendance %',       value:'95%',color:'#2563eb' },
      ].map(s => `
      <div class="am">
        <div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.5rem;">${s.label}</div>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2rem;color:${s.color};">${s.value}</div>
      </div>`).join('')}
    </div>
    <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">February 2025 Attendance Log</h3>
        <div style="display:flex;gap:.5rem;align-items:center;">
          <button onclick="alert('Checked in at ' + new Date().toLocaleTimeString())" style="background:#1A3A6B;color:#fff;border:none;padding:.35rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;">Check In</button>
          <button onclick="alert('Checked out at ' + new Date().toLocaleTimeString())" style="background:var(--ink);color:#fff;border:none;padding:.35rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;">Check Out</button>
        </div>
      </div>
      <table class="ig-tbl">
        <thead><tr><th>Date</th><th>Day</th><th>Check In</th><th>Check Out</th><th>Hours</th><th>Status</th></tr></thead>
        <tbody>
          ${[
            { date:'27 Feb', day:'Thu', in:'09:12 AM', out:'07:14 PM', hrs:'10h 2m',  ok:true  },
            { date:'26 Feb', day:'Wed', in:'09:05 AM', out:'06:55 PM', hrs:'9h 50m',  ok:true  },
            { date:'25 Feb', day:'Tue', in:'09:22 AM', out:'07:05 PM', hrs:'9h 43m',  ok:true  },
            { date:'24 Feb', day:'Mon', in:'09:00 AM', out:'06:30 PM', hrs:'9h 30m',  ok:true  },
            { date:'22 Feb', day:'Sat', in:'—',        out:'—',        hrs:'—',       ok:false },
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
    </div>`
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
            <select class="ig-input">
              <option>Casual Leave</option>
              <option>Sick Leave</option>
              <option>Earned Leave</option>
            </select>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;">
            <div>
              <label class="ig-label">From Date</label>
              <input type="date" class="ig-input" value="2025-03-10">
            </div>
            <div>
              <label class="ig-label">To Date</label>
              <input type="date" class="ig-input" value="2025-03-12">
            </div>
          </div>
          <div>
            <label class="ig-label">Reason</label>
            <textarea class="ig-input" rows="3" placeholder="Brief reason for leave..."></textarea>
          </div>
          <button onclick="alert('Leave application submitted! Reference: LV-2025-' + Math.floor(Math.random()*1000))" style="background:#1A3A6B;color:#fff;border:none;padding:.7rem 1.5rem;font-size:.78rem;font-weight:600;cursor:pointer;width:fit-content;">Submit Application</button>
        </div>
      </div>
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);">
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Leave History</h3>
        </div>
        <table class="ig-tbl">
          <thead><tr><th>Dates</th><th>Type</th><th>Days</th><th>Status</th></tr></thead>
          <tbody>
            ${[
              { dates:'10–12 Jan 2025', type:'Casual',  days:'3', status:'Approved',  cls:'b-gr' },
              { dates:'25 Jan 2025',    type:'Sick',    days:'1', status:'Approved',  cls:'b-gr' },
              { dates:'14 Mar 2025',    type:'Optional',days:'1', status:'Approved',  cls:'b-gr' },
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
    </div>`
  return c.html(layout('Leave', empShell('Leave Management', 'leave', body), { noNav:true, noFooter:true }))
})

app.get('/employee/payslips', (c) => {
  const body = `
    <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Payslip History</h3>
      </div>
      <table class="ig-tbl">
        <thead><tr><th>Month</th><th>Gross Salary</th><th>Deductions</th><th>TDS</th><th>Net Pay</th><th>Status</th><th>Download</th></tr></thead>
        <tbody>
          ${[
            { month:'February 2025', gross:'₹1,25,000', ded:'₹12,500', tds:'₹8,500', net:'₹1,04,000', status:'Processed', cls:'b-gr' },
            { month:'January 2025',  gross:'₹1,25,000', ded:'₹12,500', tds:'₹8,500', net:'₹1,04,000', status:'Processed', cls:'b-gr' },
            { month:'December 2024', gross:'₹1,25,000', ded:'₹12,500', tds:'₹8,500', net:'₹1,04,000', status:'Processed', cls:'b-gr' },
            { month:'November 2024', gross:'₹1,25,000', ded:'₹12,500', tds:'₹8,500', net:'₹1,04,000', status:'Processed', cls:'b-gr' },
          ].map(p => `
          <tr>
            <td style="font-weight:500;">${p.month}</td>
            <td style="font-family:'DM Serif Display',Georgia,serif;">${p.gross}</td>
            <td style="font-size:.82rem;color:var(--ink-muted);">${p.ded}</td>
            <td style="font-size:.82rem;color:var(--ink-muted);">${p.tds}</td>
            <td style="font-family:'DM Serif Display',Georgia,serif;color:var(--gold);">${p.net}</td>
            <td><span class="badge ${p.cls}">${p.status}</span></td>
            <td><a href="#" onclick="alert('Payslip PDF download in Phase 2');return false;" style="font-size:.72rem;color:var(--gold);"><i class="fas fa-download"></i> PDF</a></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>`
  return c.html(layout('Payslips', empShell('Payslips', 'payslips', body), { noNav:true, noFooter:true }))
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
            <td><a href="#" onclick="alert('Form-16 download in Phase 2');return false;" style="font-size:.72rem;color:var(--gold);"><i class="fas fa-download"></i> Download</a></td>
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
        { name:'Employee Handbook 2025',               category:'HR',       updated:'01 Jan 2025', icon:'book-open' },
        { name:'Code of Conduct Policy',               category:'Compliance', updated:'01 Jan 2025', icon:'gavel'    },
        { name:'Travel & Expense Policy',              category:'Finance',  updated:'15 Feb 2025', icon:'plane'    },
        { name:'Leave Policy',                         category:'HR',       updated:'01 Jan 2025', icon:'calendar' },
        { name:'IT & Data Security Policy',            category:'IT',       updated:'01 Jan 2025', icon:'shield-alt' },
        { name:'Anti-Harassment & POSH Policy',        category:'Compliance', updated:'01 Jan 2025', icon:'users'   },
        { name:'Performance Review Process',           category:'HR',       updated:'27 Feb 2025', icon:'chart-bar' },
        { name:'Grievance Redressal Policy',           category:'HR',       updated:'01 Jan 2025', icon:'comments' },
      ].map(p => `
      <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;display:flex;align-items:center;gap:1rem;">
        <div style="width:40px;height:40px;background:#1A3A6B;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <i class="fas fa-${p.icon}" style="color:#fff;font-size:.8rem;"></i>
        </div>
        <div style="flex:1;">
          <div style="font-weight:500;font-size:.875rem;color:var(--ink);">${p.name}</div>
          <div style="font-size:.72rem;color:var(--ink-muted);margin-top:.15rem;">Updated: ${p.updated} · <span class="badge b-dk" style="font-size:.6rem;">${p.category}</span></div>
        </div>
        <a href="#" onclick="alert('Policy document in Phase 2');return false;" style="font-size:.72rem;color:var(--gold);white-space:nowrap;"><i class="fas fa-eye"></i> View</a>
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
          <a href="tel:${e.phone.replace(/\s/g,'')}" style="font-size:.75rem;color:var(--ink-muted);"><i class="fas fa-phone" style="margin-right:.35rem;font-size:.65rem;"></i>${e.phone}</a>
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
          <button onclick="alert('Profile edit in Phase 2')" style="background:#1A3A6B;color:#fff;border:none;padding:.6rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;width:fit-content;margin-top:.5rem;">Edit Profile</button>
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
    { id:'voting',     icon:'vote-yea',       label:'Voting'          },
    { id:'registers',  icon:'book',           label:'Statutory Reg.'  },
    { id:'packs',      icon:'file-alt',       label:'Board Packs'     },
    { id:'finance',    icon:'chart-bar',      label:'Finance Reports' },
    { id:'compliance', icon:'shield-alt',     label:'Compliance'      },
  ]
  return `
<div style="display:flex;height:100vh;overflow:hidden;background:#f7f7f7;">
  <aside style="width:240px;flex-shrink:0;background:#1E1E1E;display:flex;flex-direction:column;min-height:100vh;">
    <a href="/portal/board/dashboard" style="padding:1.25rem;border-bottom:1px solid rgba(255,255,255,.07);display:block;">
      <div class="f-serif" style="color:#fff;font-size:.95rem;letter-spacing:.06em;">INDIA GULLY</div>
      <div style="font-size:.55rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-top:2px;">Board & KMP</div>
    </a>
    <nav style="flex:1;padding:.75rem;overflow-y:auto;">
      ${nav.map(i => `
      <a href="/portal/board/${i.id === 'dashboard' ? 'dashboard' : i.id}" class="sb-lk ${active === i.id ? 'on' : ''}">
        <i class="fas fa-${i.icon}" style="width:16px;font-size:.75rem;text-align:center;"></i>${i.label}
      </a>`).join('')}
    </nav>
    <div style="padding:.75rem;border-top:1px solid rgba(255,255,255,.07);">
      <a href="/portal" class="sb-lk" style="color:#ef4444 !important;"><i class="fas fa-sign-out-alt" style="width:16px;font-size:.75rem;text-align:center;"></i>Sign Out</a>
    </div>
  </aside>
  <main style="flex:1;overflow-y:auto;display:flex;flex-direction:column;">
    <div style="background:#fff;border-bottom:1px solid var(--border);padding:1rem 2rem;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
      <div>
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.2rem;color:var(--ink);">${pageTitle}</h2>
        <p style="font-size:.72rem;color:var(--ink-muted);">Board & KMP Portal · Governance & Compliance</p>
      </div>
      <div style="width:34px;height:34px;background:#1E1E1E;display:flex;align-items:center;justify-content:center;">
        <i class="fas fa-gavel" style="color:var(--gold);font-size:.75rem;"></i>
      </div>
    </div>
    <div style="flex:1;padding:2rem;overflow-y:auto;">${body}</div>
  </main>
</div>`
}

app.get('/board/dashboard', (c) => {
  const body = `
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem;margin-bottom:2rem;">
      ${[
        { label:'Next Board Meeting', value:'Mar 15', sub:'2025 — Scheduled',    icon:'calendar',    color:'#1E1E1E' },
        { label:'Pending Resolutions',value:'2',      sub:'For director approval', icon:'vote-yea',  color:'#d97706' },
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
        { date:'15 Mar 2025', event:'Board Meeting — Q1 Review',           status:'Scheduled', cls:'b-gr' },
        { date:'31 Mar 2025', event:'Annual Accounts Filing (Form AOC-4)', status:'Due',       cls:'b-g'  },
        { date:'30 Jun 2025', event:'Annual Return Filing (Form MGT-7)',   status:'Upcoming',  cls:'b-dk' },
        { date:'30 Sep 2025', event:'Secretarial Audit (Form MR-3)',       status:'Upcoming',  cls:'b-dk' },
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
        <button onclick="alert('Schedule meeting in Phase 2')" style="background:#1E1E1E;color:#fff;border:none;padding:.35rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;">+ Schedule Meeting</button>
      </div>
      <table class="ig-tbl">
        <thead><tr><th>Meeting No.</th><th>Type</th><th>Date & Time</th><th>Venue</th><th>Quorum</th><th>Minutes</th><th>Status</th></tr></thead>
        <tbody>
          ${[
            { no:'BM-2025-03', type:'Board Meeting',   date:'15 Mar 2025 · 11:00 AM', venue:'Registered Office, New Delhi', quorum:'2/2',   minutes:'Pending',   cls:'b-g'  },
            { no:'BM-2025-02', type:'Board Meeting',   date:'15 Jan 2025 · 11:00 AM', venue:'Registered Office, New Delhi', quorum:'2/2',   minutes:'Approved',  cls:'b-gr' },
            { no:'BM-2025-01', type:'EGM',             date:'05 Jan 2025 · 10:00 AM', venue:'Video Conference',             quorum:'2/2',   minutes:'Approved',  cls:'b-gr' },
            { no:'BM-2024-04', type:'Board Meeting',   date:'15 Oct 2024 · 11:00 AM', venue:'Registered Office, New Delhi', quorum:'2/2',   minutes:'Approved',  cls:'b-gr' },
          ].map(m => `
          <tr>
            <td style="font-weight:600;font-size:.82rem;color:var(--gold);">${m.no}</td>
            <td><span class="badge b-dk">${m.type}</span></td>
            <td style="font-size:.82rem;">${m.date}</td>
            <td style="font-size:.8rem;color:var(--ink-muted);">${m.venue}</td>
            <td style="font-size:.82rem;">${m.quorum}</td>
            <td><span class="badge ${m.cls}">${m.minutes}</span></td>
            <td><a href="#" onclick="alert('Meeting pack in Phase 2');return false;" style="font-size:.72rem;color:var(--gold);">View Pack</a></td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>`
  return c.html(layout('Board Meetings', boardShell('Board Meetings', 'meetings', body), { noNav:true, noFooter:true }))
})

app.get('/board/voting', (c) => {
  const body = `
    <div style="display:flex;flex-direction:column;gap:1.25rem;">
      <h3 style="font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);">Pending Resolutions — Action Required</h3>
      ${[
        {
          res:'RES-2025-003', title:'Approval of Q1 2025 Financial Statements',
          desc:'Board resolution to approve standalone and consolidated financial statements for the quarter ended 31 December 2024.',
          date:'15 Mar 2025', type:'Ordinary Resolution',
        },
        {
          res:'RES-2025-004', title:'Re-appointment of M/s Pipara & Co. as Statutory Auditors',
          desc:'Board resolution to recommend re-appointment of Pipara & Co. as statutory auditors for FY 2025-26 to the shareholders.',
          date:'15 Mar 2025', type:'Special Resolution',
        },
      ].map(r => `
      <div style="background:#fff;border:1px solid #fde68a;">
        <div style="background:#fffbeb;padding:1rem 1.25rem;border-bottom:1px solid #fde68a;display:flex;justify-content:space-between;align-items:flex-start;">
          <div>
            <span style="font-size:.72rem;font-weight:600;color:#92400e;">${r.res}</span>
            <span style="margin-left:.75rem;font-size:.68rem;background:#fef3c7;color:#92400e;padding:1px 6px;border-radius:2px;font-weight:600;">${r.type}</span>
          </div>
          <span style="font-size:.72rem;color:var(--ink-muted);">Meeting: ${r.date}</span>
        </div>
        <div style="padding:1.25rem;">
          <h4 style="font-size:.95rem;font-weight:600;color:var(--ink);margin-bottom:.5rem;">${r.title}</h4>
          <p style="font-size:.82rem;color:var(--ink-muted);line-height:1.65;margin-bottom:1.25rem;">${r.desc}</p>
          <div style="display:flex;gap:.75rem;">
            <button onclick="alert('Vote FOR resolution ${r.res} recorded at ' + new Date().toLocaleTimeString())" style="background:#16a34a;color:#fff;border:none;padding:.6rem 1.5rem;font-size:.78rem;font-weight:600;cursor:pointer;flex:1;letter-spacing:.06em;text-transform:uppercase;"><i class="fas fa-check" style="margin-right:.4rem;"></i>Vote For</button>
            <button onclick="alert('Vote AGAINST resolution ${r.res} recorded at ' + new Date().toLocaleTimeString())" style="background:#dc2626;color:#fff;border:none;padding:.6rem 1.5rem;font-size:.78rem;font-weight:600;cursor:pointer;flex:1;letter-spacing:.06em;text-transform:uppercase;"><i class="fas fa-times" style="margin-right:.4rem;"></i>Vote Against</button>
            <button onclick="alert('Abstained from resolution ${r.res} recorded at ' + new Date().toLocaleTimeString())" style="background:var(--parch-dk);color:var(--ink);border:1px solid var(--border);padding:.6rem 1.5rem;font-size:.78rem;font-weight:600;cursor:pointer;letter-spacing:.06em;text-transform:uppercase;">Abstain</button>
          </div>
        </div>
      </div>`).join('')}
      <h3 style="font-size:.7rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);margin-top:.5rem;">Passed Resolutions</h3>
      <div style="background:#fff;border:1px solid var(--border);">
        <table class="ig-tbl">
          <thead><tr><th>Resolution #</th><th>Title</th><th>Date</th><th>Type</th><th>Result</th></tr></thead>
          <tbody>
            ${[
              { res:'RES-2025-001', title:'Approval of Audited Accounts FY 2024', date:'05 Jan 2025', type:'Ordinary', result:'Passed Unanimously' },
              { res:'RES-2025-002', title:'Board Fee Revision for FY 2025',        date:'15 Jan 2025', type:'Ordinary', result:'Passed Unanimously' },
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
    </div>`
  return c.html(layout('Voting', boardShell('Voting & Resolutions', 'voting', body), { noNav:true, noFooter:true }))
})

app.get('/board/registers', (c) => {
  const body = `
    <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;">
      ${[
        { name:'Register of Directors (MGT-7)',        desc:'Names, DINs, shareholding, appointments & resignations',           entries:2,  updated:'15 Jan 2025' },
        { name:'Register of KMPs',                     desc:'KMP details, appointment dates, remuneration',                     entries:3,  updated:'15 Jan 2025' },
        { name:'Register of Members',                  desc:'Shareholder names, addresses, shareholding pattern',               entries:2,  updated:'05 Jan 2025' },
        { name:'Register of Charges (CHG-7)',          desc:'All charges created, modified or satisfied',                       entries:0,  updated:'01 Jan 2025' },
        { name:'Register of Contracts (AOC-2)',        desc:'Related party transactions requiring board approval',              entries:4,  updated:'15 Feb 2025' },
        { name:'Register of Investments',              desc:'All investments made by the company',                              entries:0,  updated:'01 Jan 2025' },
      ].map(reg => `
      <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
        <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:.75rem;">
          <h4 style="font-size:.875rem;font-weight:600;color:var(--ink);line-height:1.4;">${reg.name}</h4>
          <span style="font-size:.68rem;font-weight:600;color:var(--gold);white-space:nowrap;margin-left:.5rem;">${reg.entries} entries</span>
        </div>
        <p style="font-size:.78rem;color:var(--ink-muted);line-height:1.5;margin-bottom:.875rem;">${reg.desc}</p>
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:.72rem;color:var(--ink-faint);">Last updated: ${reg.updated}</span>
          <a href="#" onclick="alert('Statutory register viewer in Phase 2');return false;" style="font-size:.72rem;color:var(--gold);">View Register →</a>
        </div>
      </div>`).join('')}
    </div>`
  return c.html(layout('Statutory Registers', boardShell('Statutory Registers', 'registers', body), { noNav:true, noFooter:true }))
})

app.get('/board/packs', (c) => {
  const body = `
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Board Meeting Packs & Minutes</h3>
      </div>
      <table class="ig-tbl">
        <thead><tr><th>Meeting</th><th>Date</th><th>Documents Included</th><th>Status</th><th>Action</th></tr></thead>
        <tbody>
          ${[
            { meeting:'BM-2025-03 — March Board Meeting', date:'15 Mar 2025', docs:'Agenda, Q1 Financials, Resolutions Draft', status:'Upcoming', cls:'b-g' },
            { meeting:'BM-2025-02 — January Board Meeting', date:'15 Jan 2025', docs:'Minutes, Financial Statements, Audit Report', status:'Final',    cls:'b-gr' },
            { meeting:'BM-2025-01 — January EGM',           date:'05 Jan 2025', docs:'EGM Notice, Proxy Form, Voting Results',    status:'Final',    cls:'b-gr' },
          ].map(p => `
          <tr>
            <td style="font-weight:500;">${p.meeting}</td>
            <td style="font-size:.78rem;color:var(--ink-muted);">${p.date}</td>
            <td style="font-size:.8rem;color:var(--ink-muted);">${p.docs}</td>
            <td><span class="badge ${p.cls}">${p.status}</span></td>
            <td><a href="#" onclick="alert('Board pack PDF in Phase 2');return false;" style="font-size:.72rem;color:var(--gold);"><i class="fas fa-download"></i> Download Pack</a></td>
          </tr>`).join('')}
        </tbody>
      </table>
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
          `<a href="#" onclick="alert('${r} in Phase 2');return false;" style="background:var(--parch-dk);border:1px solid var(--border);padding:.5rem 1rem;font-size:.78rem;font-weight:500;color:var(--ink);display:flex;align-items:center;gap:.4rem;"><i class="fas fa-file-pdf" style="color:#dc2626;font-size:.7rem;"></i>${r}</a>`
        ).join('')}
      </div>
    </div>`
  return c.html(layout('Finance Reports', boardShell('Finance Reports', 'finance', body), { noNav:true, noFooter:true }))
})

app.get('/board/compliance', (c) => {
  const body = `
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Annual Compliance Calendar — FY 2025-26</h3>
      </div>
      <table class="ig-tbl">
        <thead><tr><th>Due Date</th><th>Filing / Event</th><th>Form / Act</th><th>Responsible</th><th>Penalty if Missed</th><th>Status</th></tr></thead>
        <tbody>
          ${[
            { date:'15 Mar 2025', event:'Board Meeting — Q1 2025',           form:'Companies Act §173',  resp:'Board', penalty:'₹5,000–25,000',    status:'Scheduled', cls:'b-gr' },
            { date:'31 Mar 2025', event:'Annual Accounts Filing',            form:'AOC-4',               resp:'CFO/CS', penalty:'₹1,000/day',      status:'Due',       cls:'b-g'  },
            { date:'30 Apr 2025', event:'Annual Return Filing',              form:'MGT-7A',              resp:'CS',     penalty:'₹200/day',        status:'Upcoming',  cls:'b-dk' },
            { date:'30 Jun 2025', event:'Income Tax Return',                 form:'ITR-6',               resp:'CFO',    penalty:'₹5,000',          status:'Upcoming',  cls:'b-dk' },
            { date:'31 Jul 2025', event:'Filing of Financial Statements',   form:'AOC-4 XBRL',          resp:'CS',     penalty:'₹1,000/day',      status:'Upcoming',  cls:'b-dk' },
            { date:'30 Sep 2025', event:'Secretarial Audit',                 form:'MR-3',                resp:'CS',     penalty:'₹1,00,000+',      status:'Upcoming',  cls:'b-dk' },
            { date:'30 Nov 2025', event:'MSME Payment Compliance Report',    form:'Specified Form',       resp:'CFO',    penalty:'N/A',             status:'Upcoming',  cls:'b-dk' },
            { date:'31 Dec 2025', event:'Board Meeting — Q3 2025',           form:'Companies Act §173',  resp:'Board',  penalty:'₹5,000–25,000',   status:'Upcoming',  cls:'b-dk' },
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

export default app
