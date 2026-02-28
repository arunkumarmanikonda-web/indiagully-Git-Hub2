import { Hono } from 'hono'

const app = new Hono()

// ── AUTH LOGIN ────────────────────────────────────────────────────────────────
const DEMO_CREDENTIALS: Record<string, { id: string; pass: string; otp: string; dashboard: string }> = {
  client:   { id: 'demo@indiagully.com', pass: 'Client@IG2024',  otp: '000000', dashboard: '/portal/client/dashboard'   },
  employee: { id: 'IG-EMP-0001',         pass: 'Emp@IG2024',     otp: '000000', dashboard: '/portal/employee/dashboard' },
  board:    { id: 'IG-KMP-0001',         pass: 'Board@IG2024',   otp: '000000', dashboard: '/portal/board/dashboard'    },
}

app.post('/auth/login', async (c) => {
  try {
    const body = await c.req.parseBody()
    const { portal, identifier, password, otp } = body as Record<string, string>
    const creds = DEMO_CREDENTIALS[portal]
    if (!creds) return c.html(errorRedirect(`/portal/${portal}`, 'Invalid portal selection.'))
    const idOk   = identifier?.trim().toLowerCase() === creds.id.toLowerCase()
    const passOk = password === creds.pass
    if (!idOk || !passOk) return c.html(errorRedirect(`/portal/${portal}`, 'Invalid credentials. Please check the demo access details above.'))
    if (otp && otp.length > 0 && otp !== creds.otp) return c.html(errorRedirect(`/portal/${portal}`, 'Invalid OTP / 2FA code. Use 000000 for demo access.'))
    return c.redirect(creds.dashboard, 302)
  } catch (err) {
    return c.html(errorRedirect('/portal', 'Login failed. Please try again.'))
  }
})

app.post('/auth/admin', async (c) => {
  try {
    const body = await c.req.parseBody()
    const { username, password, totp } = body as Record<string, string>
    const ok = username?.trim().toLowerCase() === 'superadmin@indiagully.com'
             && password === 'Admin@IG2024!'
             && (totp === '000000' || !totp)
    if (!ok) return c.html(errorRedirect('/admin', 'Invalid admin credentials or 2FA code.'))
    return c.redirect('/admin/dashboard', 302)
  } catch (err) {
    return c.html(errorRedirect('/admin', 'Authentication failed. Please try again.'))
  }
})

app.post('/auth/reset', async (c) => {
  try {
    const body = await c.req.parseBody()
    const { portal, email } = body as Record<string, string>
    return c.html(successRedirect(`/portal/${portal || 'client'}`, 'Password reset instructions have been sent to your registered email address.'))
  } catch {
    return c.html(errorRedirect('/portal', 'Reset request failed.'))
  }
})

function errorRedirect(backUrl: string, msg: string): string {
  return `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0;url=${backUrl}?error=${encodeURIComponent(msg)}">
  <script>
    sessionStorage.setItem('ig_auth_error', ${JSON.stringify(msg)});
    window.location.href = ${JSON.stringify(backUrl)};
  </script>
  </head><body style="font-family:sans-serif;padding:2rem;background:#111;color:#fff;text-align:center;">
    <p style="color:#ef4444;margin-bottom:1rem;">⚠ ${msg}</p>
    <a href="${backUrl}" style="color:#B8960C;">← Go Back</a>
  </body></html>`
}

function successRedirect(backUrl: string, msg: string): string {
  return `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="3;url=${backUrl}">
  </head><body style="font-family:sans-serif;padding:2rem;background:#111;color:#fff;text-align:center;">
    <p style="color:#22c55e;margin-bottom:1rem;">✓ ${msg}</p>
    <p style="color:rgba(255,255,255,.5);font-size:.875rem;">Redirecting you back in 3 seconds...</p>
    <a href="${backUrl}" style="color:#B8960C;">← Go Back</a>
  </body></html>`
}

// ── HEALTH ───────────────────────────────────────────────────────────────────
app.get('/health', (c) => c.json({
  status: 'ok',
  platform: 'India Gully Enterprise Platform',
  version: '2025.02',
  timestamp: new Date().toISOString(),
  modules: ['CMS','Finance ERP','HR ERP','Governance','HORECA','Contracts','Workflows','Security'],
  portals: ['Client','Employee','Board','Super Admin'],
  routes_count: 60,
}))

// ── MANDATE ENQUIRY ───────────────────────────────────────────────────────────
app.post('/enquiry', async (c) => {
  try {
    const body = await c.req.parseBody()
    const { name, email, phone, org, type, message, mandate, sectors, nda_consent } = body as Record<string, string>
    if (!name || !email) return c.json({ success: false, error: 'Name and email are required' }, 400)
    console.log('[ENQUIRY]', { name, email, phone, org, type, mandate, timestamp: new Date().toISOString() })
    return c.json({
      success: true,
      message: 'Enquiry received. Our team will respond within 24 business hours.',
      ref: `IG-ENQ-${Date.now()}`,
    })
  } catch (err) {
    return c.json({ success: false, error: 'Failed to process enquiry' }, 500)
  }
})

// ── HORECA ENQUIRY ────────────────────────────────────────────────────────────
app.post('/horeca-enquiry', async (c) => {
  try {
    const body = await c.req.parseBody()
    const { name, email, phone, org, project_type, details } = body as Record<string, string>
    if (!name || !email) return c.json({ success: false, error: 'Name and email are required' }, 400)
    console.log('[HORECA]', { name, email, org, project_type, timestamp: new Date().toISOString() })
    return c.json({
      success: true,
      message: 'HORECA enquiry received. Our procurement team will prepare a scope within 48 hours.',
      ref: `IG-HORECA-${Date.now()}`,
    })
  } catch (err) {
    return c.json({ success: false, error: 'Failed to process HORECA enquiry' }, 500)
  }
})

// ── NEWSLETTER SUBSCRIBE ──────────────────────────────────────────────────────
app.post('/subscribe', async (c) => {
  try {
    const body = await c.req.parseBody()
    const { name, email } = body as Record<string, string>
    if (!email) return c.json({ success: false, error: 'Email is required' }, 400)
    console.log('[SUBSCRIBE]', { name, email, timestamp: new Date().toISOString() })
    return c.json({ success: true, message: 'You have been subscribed to the India Gully Research Bulletin.' })
  } catch (err) {
    return c.json({ success: false, error: 'Subscription failed' }, 500)
  }
})

// ── LISTINGS API ──────────────────────────────────────────────────────────────
app.get('/listings', (c) => c.json({
  total: 6,
  pipeline_value: '₹8,815 Cr',
  listings: [
    { id:'entertainment-maharashtra', title:'Integrated Entertainment Destination', location:'Maharashtra',       value:'₹4,500 Cr', sector:'Entertainment', status:'Active'           },
    { id:'retail-hub-mumbai',         title:'Entertainment & Retail Hub',           location:'Mumbai MMR',        value:'₹2,100 Cr', sector:'Real Estate',   status:'Active'           },
    { id:'heritage-rajasthan',        title:'6-Property Heritage Hotel Portfolio',  location:'Rajasthan',         value:'₹620 Cr',   sector:'Heritage',      status:'Under Negotiation'},
    { id:'luxury-resorts-pan-india',  title:'5-Property Luxury Resort Rollout',     location:'Rajasthan · Goa',   value:'₹350 Cr',   sector:'Hospitality',   status:'Feasibility'      },
    { id:'entertainment-ncr-bhutani', title:'Entertainment City — Delhi NCR',       location:'Noida, Delhi NCR',  value:'₹1,200 Cr+',sector:'Entertainment', status:'Active'           },
    { id:'desi-brand-retail',         title:'Desi Brand — 15-City Retail Expansion',location:'Tier 1 & 2 Cities',value:'₹45 Cr',    sector:'Retail',        status:'Active'           },
  ]
}))

// ── MANDATES API ──────────────────────────────────────────────────────────────
app.get('/mandates', (c) => c.json({
  total: 3,
  mandates: [
    { id:'MND-001', title:'Retail Leasing — Mumbai', sector:'Real Estate', value:'₹2,100 Cr', advisor:'Amit Jhingan',  status:'Active',      progress:75, start:'01 Jan 2025', milestones:['Agreement Signed','NDA Executed','Site Visits Complete','Term Sheet Pending','Close'] },
    { id:'MND-002', title:'Hotel Pre-Opening PMC',   sector:'Hospitality', value:'₹45 Cr',    advisor:'Arun Manikonda',status:'In Progress', progress:45, start:'15 Feb 2025', milestones:['Agreement Signed','Kickoff Meeting','Vendor Onboarding','PMC Handover','Close'] },
    { id:'MND-003', title:'Entertainment Feasibility',sector:'Entertainment',value:'₹4,500 Cr',advisor:'Arun Manikonda',status:'Review',     progress:20, start:'01 Mar 2025', milestones:['Agreement Signed','Data Collection','Draft Report','Final Report','Presentation'] },
  ]
}))

// ── INVOICES API ──────────────────────────────────────────────────────────────
app.get('/invoices', (c) => {
  const { client } = c.req.query()
  return c.json({
    summary: { total_billed: 750160, amount_paid: 250160, amount_due: 500000, overdue: 180000 },
    invoices: [
      { id:'INV-2025-001', desc:'Advisory Retainer — Jan 2025',    base:212000, gst:38160, total:250160, due:'2025-02-15', status:'Paid',    paid_on:'2025-02-14' },
      { id:'INV-2025-002', desc:'Hotel PMC — Phase 1',              base:152542, gst:27458, total:180000, due:'2025-02-28', status:'Overdue', paid_on:null         },
      { id:'INV-2025-003', desc:'Entertainment Feasibility Study',  base:271186, gst:48814, total:320000, due:'2025-03-31', status:'Draft',   paid_on:null         },
    ]
  })
})

// ── EMPLOYEES API ─────────────────────────────────────────────────────────────
app.get('/employees', (c) => {
  // In production: require auth token
  return c.json({
    total: 3,
    employees: [
      { id:'IG-0001', name:'Arun Manikonda',  designation:'Managing Director',     dept:'Leadership', email:'akm@indiagully.com',   status:'Active', ctc_annual:1800000 },
      { id:'IG-0002', name:'Pavan Manikonda', designation:'Executive Director',    dept:'Operations', email:'pavan@indiagully.com', status:'Active', ctc_annual:1500000 },
      { id:'IG-0003', name:'Amit Jhingan',    designation:'President, Real Estate',dept:'Advisory',   email:'amit.j@indiagully.com',status:'Active', ctc_annual:2100000 },
    ]
  })
})

// ── FINANCE SUMMARY API ───────────────────────────────────────────────────────
app.get('/finance/summary', (c) => {
  const { period } = c.req.query()
  const p = period || 'feb-2025'
  return c.json({
    period: p,
    revenue: { total: 1240000, mtd_growth: 0.083 },
    expenses: { total: 780000, mtd_change: -0.021 },
    net_profit: { total: 460000, margin: 0.371 },
    gst: { cgst_collected: 111600, sgst_collected: 111600, itc_available: 82000, net_payable: 141200, due_date: '2025-03-20' },
    bank_balance: 5620000,
    receivables: 3480000,
  })
})

// ── ATTENDANCE API ────────────────────────────────────────────────────────────
app.post('/attendance/checkin', async (c) => {
  try {
    const body = await c.req.parseBody()
    const { employee_id, type } = body as Record<string, string>
    if (!employee_id || !type) return c.json({ success: false, error: 'employee_id and type required' }, 400)
    const now = new Date()
    return c.json({
      success: true,
      employee_id,
      type,
      timestamp: now.toISOString(),
      time: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true }),
      ref: `ATT-${Date.now()}`,
    })
  } catch {
    return c.json({ success: false, error: 'Attendance marking failed' }, 500)
  }
})

// ── LEAVE API ─────────────────────────────────────────────────────────────────
app.post('/leave/apply', async (c) => {
  try {
    const body = await c.req.parseBody()
    const { employee_id, type, from, to, reason } = body as Record<string, string>
    if (!employee_id || !type || !from || !to) return c.json({ success: false, error: 'All fields required' }, 400)
    return c.json({
      success: true,
      ref: `LV-${Date.now()}`,
      status: 'Pending Approval',
      message: 'Leave application submitted. Manager notified.',
    })
  } catch {
    return c.json({ success: false, error: 'Leave application failed' }, 500)
  }
})

export default app
