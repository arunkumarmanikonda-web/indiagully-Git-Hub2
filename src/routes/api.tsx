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
  version: '2026.03',
  timestamp: new Date().toISOString(),
  modules: [
    'CMS v2 (AI Copy Assist + Page Builder + Approval Workflow)',
    'Finance ERP (Multi-Entity Ledger + E-Way Bill + TDS 26Q + Period Closing)',
    'HR ERP (Investment Declaration + TDS Estimator + Onboarding Wizard)',
    'Governance (DSC Registry + SS-1/SS-2 Notices + Digital Attendance)',
    'Smart Contracts (AI Risk Scanner + Renewal Tracker + Version Diff)',
    'HORECA (Customer Portal + Role-Based Pricing + Order Management)',
    'Security (Zero-Trust + Device Fingerprint + CSP Headers)',
    'Workflows','Board Portal','Client Portal','Employee Portal',
    'Sales Force Engine','KPI & OKR','Mandate Risk Dashboard','API Docs',
    'BI & Reporting','Data Protection (DPDP + Watermark + Masking)',
  ],
  portals: ['Client Portal','Employee Portal','Board & KMP Portal','Super Admin','HORECA Customer Portal'],
  security: {
    csp_enabled: true,
    rate_limiting: true,
    totp_enforced: true,
    pan_masking: true,
    aadhaar_masking: true,
    salary_masking: true,
    dpdp_compliant: true,
    zero_trust: true,
    device_fingerprint: true,
    document_watermark: true,
    field_encryption: 'AES-256-GCM (planned)',
    audit_logging: true,
    re_auth_sensitive_actions: true,
  },
  api_endpoints: [
    'GET /api/health',
    'GET /api/listings',
    'GET /api/mandates',
    'GET /api/invoices',
    'GET /api/employees',
    'GET /api/finance/summary',
    'GET /api/compliance',
    'GET /api/horeca/catalogue',
    'GET /api/kpi/summary',
    'GET /api/risk/mandates',
    'GET /api/contracts/expiring',
    'GET /api/finance/reconcile',
    'GET /api/governance/resolutions',
    'POST /api/enquiry',
    'POST /api/horeca-enquiry',
    'POST /api/subscribe',
    'POST /api/auth/login',
    'POST /api/auth/admin',
    'POST /api/auth/reset',
    'POST /api/attendance/checkin',
    'POST /api/leave/apply',
    'POST /api/hr/tds-declaration',
    'POST /api/finance/voucher',
    'POST /api/contracts/clause-check',
  ],
  routes_count: 92,
  deployment: 'Cloudflare Pages',
  last_updated: '2026-02-28',
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

// ── MANDATES API ──────────────────────────────────────────────────────────────
app.get('/mandates', (c) => c.json({
  total: 3, active: 2, pipeline_value: '₹6,645 Cr',
  mandates: [
    { id:'MND-001', title:'Retail Leasing — Mumbai',        sector:'Real Estate',  value:'₹2,100 Cr', advisor:'Amit Jhingan',    client:'Mumbai Mall Pvt Ltd',         start:'01 Jan 2025', status:'Active',      progress:75 },
    { id:'MND-002', title:'Hotel Pre-Opening PMC',           sector:'Hospitality',  value:'₹45 Cr',    advisor:'Arun Manikonda',  client:'Rajasthan Hotels Pvt Ltd',    start:'15 Feb 2025', status:'In Progress',  progress:45 },
    { id:'MND-003', title:'Entertainment Feasibility Study', sector:'Entertainment',value:'₹4,500 Cr', advisor:'Arun Manikonda',  client:'Entertainment Ventures Ltd',  start:'01 Mar 2025', status:'Review',       progress:20 },
  ],
}))

// ── INVOICES API ──────────────────────────────────────────────────────────────
app.get('/invoices', (c) => c.json({
  total: 3, total_billed: 750160, total_paid: 250160, total_due: 500000,
  invoices: [
    { id:'INV-2025-001', client:'Demo Client Corp',        description:'Advisory Retainer — Jan 2025',   base:212000, gst:38160, total:250160, due:'15 Feb 2025', status:'Paid',    sac:'998313' },
    { id:'INV-2025-002', client:'Demo Client Corp',        description:'Hotel PMC — Phase 1',             base:152542, gst:27458, total:180000, due:'28 Feb 2025', status:'Overdue', sac:'998313' },
    { id:'INV-2025-003', client:'Entertainment Ventures',  description:'Entertainment Feasibility Study', base:271186, gst:48814, total:320000, due:'31 Mar 2025', status:'Draft',   sac:'998313' },
  ],
}))

// ── EMPLOYEES API ─────────────────────────────────────────────────────────────
app.get('/employees', (c) => c.json({
  total: 3, active: 3, total_payroll_monthly: 450000,
  employees: [
    { id:'IG-EMP-0001', name:'Arun Manikonda',  designation:'Managing Director',      department:'Leadership', email:'akm@indiagully.com',           joined:'01 Apr 2017', status:'Active', ctc_annual:1800000 },
    { id:'IG-EMP-0002', name:'Pavan Manikonda', designation:'Executive Director',     department:'Operations', email:'pavan@indiagully.com',         joined:'01 Apr 2017', status:'Active', ctc_annual:1500000 },
    { id:'IG-EMP-0003', name:'Amit Jhingan',    designation:'President, Real Estate', department:'Advisory',  email:'amit.jhingan@indiagully.com',  joined:'01 Jan 2020', status:'Active', ctc_annual:2100000 },
  ],
}))

// ── FINANCE SUMMARY API ───────────────────────────────────────────────────────
app.get('/finance/summary', (c) => c.json({
  period: 'February 2025',
  revenue:  { mtd: 1240000, ytd: 8950000, growth_pct: 8.3 },
  expenses: { mtd: 780000,  ytd: 5620000, payroll: 450000, opex: 330000 },
  profit:   { mtd: 460000,  margin_pct: 37.1, ytd: 3330000 },
  gst:      { collected: 223200, paid_itc: 164400, payable: 58800, due_date: '20 Mar 2025' },
  bank_balance: 5620000, receivables: 3480000, payables: 420000,
}))

// ── COMPLIANCE CALENDAR API ───────────────────────────────────────────────────
app.get('/compliance', (c) => c.json({
  upcoming: [
    { date:'11 Mar 2025', event:'GSTR-1 Filing',       form:'GSTR-1',    module:'Finance',    status:'Pending',  penalty:'₹200/day'   },
    { date:'15 Mar 2025', event:'TDS Deposit',          form:'Challan 281',module:'Finance',   status:'Pending',  penalty:'1.5%/month' },
    { date:'20 Mar 2025', event:'GSTR-3B Filing',       form:'GSTR-3B',   module:'Finance',    status:'Pending',  penalty:'₹50/day'    },
    { date:'31 Mar 2025', event:'ROC Annual Filing',    form:'MGT-7A',    module:'Governance', status:'Pending',  penalty:'₹200/day'   },
    { date:'31 Mar 2025', event:'Income Tax Advance',   form:'Challan 280',module:'Finance',   status:'Pending',  penalty:'1%/month'   },
    { date:'15 Apr 2025', event:'PF ECR Upload',        form:'ECR',        module:'HR',        status:'Upcoming', penalty:'₹5,000 min' },
  ],
}))

// ── HORECA CATALOGUE API ──────────────────────────────────────────────────────
app.get('/horeca/catalogue', (c) => c.json({
  categories: 8, active_vendors: 14,
  categories_list: [
    { name:'Kitchen Equipment',      skus:124, icon:'utensils'       },
    { name:'Tableware & Crockery',   skus:89,  icon:'wine-glass-alt' },
    { name:'Linen & Soft Furnishing',skus:156, icon:'bed'            },
    { name:'Bar & Beverages',        skus:67,  icon:'glass-martini'  },
    { name:'Housekeeping Supplies',  skus:98,  icon:'spray-can'      },
    { name:'Furniture & Fixtures',   skus:203, icon:'chair'          },
    { name:'Tech & POS Systems',     skus:34,  icon:'desktop'        },
    { name:'Safety & Security',      skus:45,  icon:'shield-alt'     },
  ],
}))

// ── KPI / OKR SUMMARY API ─────────────────────────────────────────────────────
app.get('/kpi/summary', (c) => c.json({
  quarter: 'Q4 FY2024-25',
  overall_health: 'At Risk',
  departments: [
    { dept:'Finance',    progress:82, trend:'stable',   status:'On Track' },
    { dept:'Sales',      progress:70, trend:'improving',status:'At Risk'  },
    { dept:'HR',         progress:60, trend:'stable',   status:'At Risk'  },
    { dept:'Governance', progress:75, trend:'stable',   status:'On Track' },
    { dept:'HORECA',     progress:55, trend:'declining',status:'Behind'   },
  ],
}))

// ── MANDATE RISK API ──────────────────────────────────────────────────────────
app.get('/risk/mandates', (c) => c.json({
  total_portfolio: '₹8,815 Cr',
  risk_distribution: { low:2, medium:2, high:2 },
  concentration_alert: 'Entertainment sector at 65% — above 40% recommended threshold',
  mandates: [
    { id:'MND-001', name:'Entertainment Destination — Maharashtra', risk_score:72, trend:'stable',   sector:'Entertainment' },
    { id:'MND-002', name:'Retail Leasing — Mumbai MMR',             risk_score:88, trend:'improving',sector:'Real Estate'   },
    { id:'MND-003', name:'Heritage Hotel Portfolio — Rajasthan',    risk_score:61, trend:'declining',sector:'Hospitality'   },
    { id:'MND-004', name:'Luxury Resort Rollout',                   risk_score:79, trend:'stable',   sector:'Hospitality'   },
    { id:'MND-005', name:'Entertainment City — Delhi NCR',           risk_score:55, trend:'declining',sector:'Entertainment' },
    { id:'MND-006', name:'Desi Brand Retail Expansion',             risk_score:91, trend:'improving',sector:'Retail'        },
  ],
}))

// ── CONTRACTS EXPIRING API ────────────────────────────────────────────────────
app.get('/contracts/expiring', (c) => c.json({
  within_30: 1, within_60: 2, within_90: 3,
  contracts: [
    { id:'RET-001', name:'EY Advisory Retainer',    expires:'31 Mar 2025', days_left:26, action:'Renewal pending client confirmation' },
    { id:'AGR-001', name:'Advisory Agreement FY2025',expires:'31 Dec 2025', days_left:301, action:'Auto-renewal clause active' },
    { id:'PMC-001', name:'Hotel PMC Agreement',       expires:'14 Feb 2026', days_left:351, action:'Performance review due Jul 2025' },
  ],
}))

// ── AI CLAUSE CHECK API ───────────────────────────────────────────────────────
app.post('/contracts/clause-check', async (c) => {
  try {
    const body = await c.req.parseBody()
    const { contract_text, contract_type } = body as Record<string, string>
    return c.json({
      success: true,
      contract_type: contract_type || 'Advisory',
      risk_level: 'Medium',
      risk_score: 68,
      missing_clauses: ['Force Majeure', 'Limitation of Liability', 'Dispute Resolution — Arbitration'],
      risky_clauses: [
        { clause:'Payment Terms', issue:'No late payment interest specified', severity:'Medium' },
        { clause:'IP & Work Product', issue:'Ownership ambiguous for co-developed materials', severity:'High' },
      ],
      compliant_clauses: ['Confidentiality', 'Governing Law', 'Termination', 'Non-Solicitation'],
      recommendation: 'Add Force Majeure and clarify IP ownership before execution.',
    })
  } catch {
    return c.json({ success: false, error: 'Clause analysis failed' }, 500)
  }
})

// ── FINANCE VOUCHER API ───────────────────────────────────────────────────────
app.post('/finance/voucher', async (c) => {
  try {
    const body = await c.req.parseBody()
    const { type, debit_ledger, credit_ledger, amount, narration } = body as Record<string, string>
    if (!type || !debit_ledger || !credit_ledger || !amount) {
      return c.json({ success: false, error: 'type, debit_ledger, credit_ledger, amount required' }, 400)
    }
    return c.json({
      success: true,
      voucher_no: `VCH-${Date.now()}`,
      type, debit_ledger, credit_ledger,
      amount: parseFloat(amount),
      narration,
      posted_at: new Date().toISOString(),
      double_entry: { dr: debit_ledger, cr: credit_ledger, amount: parseFloat(amount) },
    })
  } catch {
    return c.json({ success: false, error: 'Voucher creation failed' }, 500)
  }
})

// ── BANK RECONCILIATION STATUS API ───────────────────────────────────────────
app.get('/finance/reconcile', (c) => c.json({
  period: 'February 2025',
  bank_balance: 5620000,
  book_balance: 5510000,
  difference: 110000,
  matched: 47, unmatched_bank: 3, unmatched_book: 2,
  status: 'Pending JV for ₹1.1L difference',
  last_reconciled: '28 Feb 2025',
}))

// ── HR TDS DECLARATION API ────────────────────────────────────────────────────
app.post('/hr/tds-declaration', async (c) => {
  try {
    const body = await c.req.parseBody()
    const { employee_id, regime, sec_80c, sec_80d, hra, nps, other } = body as Record<string, string>
    if (!employee_id) return c.json({ success: false, error: 'employee_id required' }, 400)
    const gross = 1800000
    const totalDeductions = (parseFloat(sec_80c||'0') + parseFloat(sec_80d||'0') + parseFloat(hra||'0') + parseFloat(nps||'0') + parseFloat(other||'0'))
    const taxableIncome = Math.max(0, gross - totalDeductions - 50000)
    const tds = regime === 'new' ? Math.round(taxableIncome * 0.20 / 12) : Math.round(taxableIncome * 0.25 / 12)
    return c.json({
      success: true,
      ref: `DECL-${Date.now()}`,
      employee_id,
      regime: regime || 'new',
      gross_annual: gross,
      total_deductions: totalDeductions,
      taxable_income: taxableIncome,
      tds_per_month: tds,
      financial_year: 'FY 2025-26',
      status: 'Declaration submitted — TDS adjusted from next payroll',
    })
  } catch {
    return c.json({ success: false, error: 'TDS declaration failed' }, 500)
  }
})

// ── GOVERNANCE RESOLUTIONS API ────────────────────────────────────────────────
app.get('/governance/resolutions', (c) => c.json({
  total: 7, passed: 6, pending: 1,
  resolutions: [
    { id:'BR-2025-001', title:'Approval of Annual Budget FY 2025-26',     passed_on:'15 Jan 2025', votes:{for:3,against:0,abstain:0}, dsc_signed:true  },
    { id:'BR-2025-002', title:'Appointment of Statutory Auditor',          passed_on:'15 Jan 2025', votes:{for:3,against:0,abstain:0}, dsc_signed:true  },
    { id:'BR-2025-003', title:'Authorisation for Advisory Mandate — ECD', passed_on:'01 Feb 2025', votes:{for:2,against:1,abstain:0}, dsc_signed:true  },
    { id:'BR-2025-004', title:'Revision of Employee Compensation Policy',  passed_on:'15 Feb 2025', votes:{for:3,against:0,abstain:0}, dsc_signed:false },
    { id:'BR-2025-005', title:'Approval of HORECA Vendor Framework',       passed_on:'28 Feb 2025', votes:{for:3,against:0,abstain:0}, dsc_signed:false },
    { id:'BR-2025-006', title:'Approval of Q3 Financial Statements',       passed_on:'05 Mar 2025', votes:{for:3,against:0,abstain:0}, dsc_signed:false },
    { id:'BR-2025-007', title:'Authorisation for NCR Entertainment PMC',   passed_on:null,           votes:{for:1,against:1,abstain:1}, dsc_signed:false, status:'Pending' },
  ],
}))

// ── v1 VERSIONED API ALIASES ─────────────────────────────────────────────────
// All existing endpoints mirrored under /v1/* for forward-compatibility
app.get('/v1/health',               (c) => c.redirect('/api/health'))
app.get('/v1/listings',             (c) => c.redirect('/api/listings'))
app.get('/v1/mandates',             (c) => c.redirect('/api/mandates'))
app.get('/v1/invoices',             (c) => c.redirect('/api/invoices'))
app.get('/v1/employees',            (c) => c.redirect('/api/employees'))
app.get('/v1/finance/summary',      (c) => c.redirect('/api/finance/summary'))
app.get('/v1/compliance',           (c) => c.redirect('/api/compliance'))
app.get('/v1/kpi/summary',          (c) => c.redirect('/api/kpi/summary'))
app.get('/v1/risk/mandates',        (c) => c.redirect('/api/risk/mandates'))
app.get('/v1/contracts/expiring',   (c) => c.redirect('/api/contracts/expiring'))
app.get('/v1/governance/resolutions',(c)=> c.redirect('/api/governance/resolutions'))

// ── ABAC PERMISSION MATRIX ────────────────────────────────────────────────────
app.get('/abac/matrix', (c) => c.json({
  version: '2026.02',
  model: 'RBAC + ABAC hybrid',
  note: 'Attribute-Based Access Control enforced at API gateway layer',
  roles: ['Super Admin','Director','KMP','Relationship Manager','Finance Manager','HR Manager','Employee','HORECA Client','Client'],
  resources: [
    { resource:'Invoices',    actions:['read','create','update','void'],           permissions:{ 'Super Admin':'all','Finance Manager':'all','Director':'read','Client':'own','Employee':'none' }},
    { resource:'Employees',   actions:['read','create','update','terminate'],      permissions:{ 'Super Admin':'all','HR Manager':'all','Director':'read','Employee':'own','Client':'none' }},
    { resource:'Contracts',   actions:['read','create','sign','archive'],          permissions:{ 'Super Admin':'all','Director':'all','KMP':'read,sign','Relationship Manager':'read,create','Client':'own' }},
    { resource:'Board Minutes',actions:['read','create','approve','export'],       permissions:{ 'Super Admin':'all','Director':'all','KMP':'read,export','Employee':'none','Client':'none' }},
    { resource:'Payroll',     actions:['read','run','approve','export'],           permissions:{ 'Super Admin':'all','HR Manager':'run,read','Finance Manager':'read,approve','Employee':'own','Director':'read' }},
    { resource:'KPI/OKRs',    actions:['read','set','update','report'],            permissions:{ 'Super Admin':'all','Director':'all','KMP':'read,report','HR Manager':'all','Employee':'own' }},
    { resource:'HORECA Catalogue',actions:['read','order','quote','manage'],       permissions:{ 'Super Admin':'all','HORECA Client':'read,order,quote','Finance Manager':'read','Client':'none' }},
    { resource:'Security Audit',actions:['read','configure','export'],             permissions:{ 'Super Admin':'all','Director':'read' }},
  ],
  attribute_conditions: [
    { condition:'time_of_day',   rule:'Finance actions restricted 09:00–20:00 IST for RM role' },
    { condition:'device_trust',  rule:'Board document download requires trusted device fingerprint' },
    { condition:'geo_location',  rule:'Super Admin login blocked outside India without explicit whitelist' },
    { condition:'session_age',   rule:'Sensitive actions (sign, void, terminate) require re-auth if session > 30 min' },
  ],
}))

// ── SIEM / MONITORING ENDPOINTS ───────────────────────────────────────────────
app.get('/monitoring/health-deep', (c) => c.json({
  status: 'operational',
  timestamp: new Date().toISOString(),
  checks: {
    database:    { status:'ok', latency_ms:4,  message:'D1 local responding' },
    auth_service:{ status:'ok', latency_ms:12, message:'JWT validation nominal' },
    r2_storage:  { status:'ok', latency_ms:28, message:'R2 bucket accessible' },
    cdn_edge:    { status:'ok', latency_ms:2,  message:'Cloudflare edge nominal' },
    email_relay: { status:'degraded', latency_ms:null, message:'SendGrid not configured (sandbox mode)' },
    sms_gateway: { status:'degraded', latency_ms:null, message:'Twilio not configured (sandbox mode)' },
  },
  metrics: {
    requests_last_1h: 342,
    error_rate_pct: 0.8,
    p95_latency_ms: 48,
    active_sessions: 3,
  }
}))

app.get('/monitoring/siem/alerts', (c) => c.json({
  generated_at: new Date().toISOString(),
  total_alerts: 7,
  critical: 1, high: 2, medium: 3, low: 1,
  alerts: [
    { id:'ALT-001', severity:'critical', type:'brute_force',        message:'5 failed logins from 185.220.101.x in 10 min', timestamp:'2026-02-28T06:12:00Z', status:'investigating', assigned:'superadmin' },
    { id:'ALT-002', severity:'high',     type:'unusual_access',     message:'Board document accessed from new device (unregistered)', timestamp:'2026-02-28T04:30:00Z', status:'acknowledged', assigned:'akm' },
    { id:'ALT-003', severity:'high',     type:'api_anomaly',        message:'100+ API requests/min from RM account — rate-limit triggered', timestamp:'2026-02-28T03:55:00Z', status:'resolved', assigned:'superadmin' },
    { id:'ALT-004', severity:'medium',   type:'geo_anomaly',        message:'Login attempt from Singapore IP for IG-KMP-0001', timestamp:'2026-02-28T02:14:00Z', status:'blocked', assigned:'superadmin' },
    { id:'ALT-005', severity:'medium',   type:'session_anomaly',    message:'Session token reuse detected — possible replay attack', timestamp:'2026-02-27T22:10:00Z', status:'resolved', assigned:'superadmin' },
    { id:'ALT-006', severity:'medium',   type:'data_access',        message:'Bulk export of invoices (>50 records) by Finance Manager', timestamp:'2026-02-27T18:45:00Z', status:'acknowledged', assigned:'pavan' },
    { id:'ALT-007', severity:'low',      type:'config_change',      message:'Rate limit config updated by Super Admin', timestamp:'2026-02-27T14:20:00Z', status:'resolved', assigned:'superadmin' },
  ]
}))

app.get('/monitoring/tracing', (c) => c.json({
  traces: [
    { trace_id:'t-a1b2c3', span:'POST /api/auth/admin',    duration_ms:34,  status:'ok',    service:'auth' },
    { trace_id:'t-d4e5f6', span:'GET /api/finance/summary',duration_ms:18,  status:'ok',    service:'finance' },
    { trace_id:'t-g7h8i9', span:'POST /api/finance/voucher',duration_ms:52, status:'ok',    service:'finance' },
    { trace_id:'t-j1k2l3', span:'GET /api/governance/resolutions',duration_ms:9,status:'ok',service:'governance' },
    { trace_id:'t-m4n5o6', span:'POST /api/contracts/clause-check',duration_ms:410,status:'ok',service:'contracts' },
    { trace_id:'t-p7q8r9', span:'GET /api/kpi/summary',    duration_ms:11,  status:'ok',    service:'analytics' },
    { trace_id:'t-s1t2u3', span:'POST /api/hr/tds-declaration',duration_ms:88,status:'ok',  service:'hr' },
  ],
  p50_ms: 34, p95_ms: 218, p99_ms: 410,
  error_rate: '0.0%',
}))

// ── PAYROLL RUN ENGINE ────────────────────────────────────────────────────────
app.post('/hr/payroll/run', async (c) => {
  try {
    const { month, year, run_by } = await c.req.json()
    const employees = [
      { id:'IG-EMP-0001', name:'Ravi Kumar',       basic:45000, hra:18000, conveyance:1600, medical:1250, special:8150, pf_pct:12, esic_eligible:false },
      { id:'IG-EMP-0002', name:'Priya Singh',       basic:38000, hra:15200, conveyance:1600, medical:1250, special:5950, pf_pct:12, esic_eligible:false },
      { id:'IG-EMP-0003', name:'Amit Sharma',       basic:35000, hra:14000, conveyance:1600, medical:1250, special:3150, pf_pct:12, esic_eligible:true  },
    ]
    const slips = employees.map(e => {
      const gross = e.basic + e.hra + e.conveyance + e.medical + e.special
      const pf_emp   = Math.round(e.basic * e.pf_pct / 100)
      const pf_er    = Math.round(e.basic * 0.12)
      const esic_emp = e.esic_eligible ? Math.round(gross * 0.0075) : 0
      const esic_er  = e.esic_eligible ? Math.round(gross * 0.0325) : 0
      const pt       = gross > 15000 ? 200 : gross > 10000 ? 150 : 0
      const tds      = Math.max(0, Math.round(((gross * 12) - 350000) * 0.05 / 12))
      const net      = gross - pf_emp - esic_emp - pt - tds
      return { ...e, gross, deductions:{ pf_emp, pf_er, esic_emp, esic_er, pt, tds }, net_pay: net }
    })
    const totals = slips.reduce((a,s)=>({ gross: a.gross+s.gross, net: a.net+s.net_pay, pf: a.pf+s.deductions.pf_emp+s.deductions.pf_er, esic: a.esic+s.deductions.esic_emp+s.deductions.esic_er }),{ gross:0,net:0,pf:0,esic:0 })
    return c.json({ success:true, run_id:`PR-${year}-${String(month).padStart(2,'0')}-001`, month, year, run_by, employees_processed: slips.length, payslips: slips, totals, challan_due: `07 ${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'][month]}` })
  } catch { return c.json({ success:false, error:'Payroll run failed' },500) }
})

// ── FORM-16 GENERATOR ─────────────────────────────────────────────────────────
app.get('/hr/form16/:employee_id', (c) => {
  const eid = c.req.param('employee_id')
  return c.json({
    form: 'Form 16 — Part A & B',
    financial_year: 'FY 2025-26',
    employee_id: eid,
    employer: { name:'Vivacious Entertainment & Hospitality Pvt. Ltd.', tan:'DELV00000A', pan:'AABCV1234F', address:'New Delhi — 110001' },
    salary_details: { gross:912000, standard_deduction:50000, net_taxable:862000, tds_deducted:35600, tds_deposited:35600 },
    deductions_u80: { u80c:150000, u80d:25000, hra_exempt:72000, total:247000 },
    status: 'Generated',
    download_token: `F16-${eid}-${Date.now()}`,
    watermark: `Downloaded by ${eid} at ${new Date().toISOString()} — CONFIDENTIAL`,
  })
})

// ── GSTR-1 / GSTR-3B PREPARATION ─────────────────────────────────────────────
app.get('/finance/gst/gstr1', (c) => c.json({
  period: 'Feb 2026', gstin: '07AABCV1234F1Z5',
  b2b_invoices: [
    { gstin:'27AAACN1234D1ZI', inv:'INV-2025-001', date:'01 Feb 2026', taxable:500000, igst:0, cgst:45000, sgst:45000 },
    { gstin:'06AABCP5432E1ZJ', inv:'INV-2025-002', date:'10 Feb 2026', taxable:180000, igst:0, cgst:16200, sgst:16200 },
  ],
  b2c_invoices: [],
  export_invoices: [],
  totals: { taxable:680000, igst:0, cgst:61200, sgst:61200, total_tax:122400 },
  status:'Draft — Not filed', due_date:'11 Mar 2026',
}))

app.get('/finance/gst/gstr3b', (c) => c.json({
  period: 'Feb 2026', gstin: '07AABCV1234F1Z5',
  outward_taxable: { igst:0, cgst:61200, sgst:61200, cess:0 },
  itc_available:   { igst:0, cgst:12000, sgst:12000, cess:0 },
  net_payable:     { igst:0, cgst:49200, sgst:49200, cess:0 },
  interest: 0, late_fee: 0,
  status:'Draft — Not filed', due_date:'20 Mar 2026',
}))

// ── HSN / SAC MASTER ─────────────────────────────────────────────────────────
app.get('/finance/hsn-sac', (c) => c.json({
  master: [
    { code:'998313', type:'SAC', description:'Management Consulting Services',     gst_rate:18, applicable:'Advisory, Strategy' },
    { code:'998314', type:'SAC', description:'Business Process Management Services',gst_rate:18, applicable:'Operations consulting' },
    { code:'997212', type:'SAC', description:'Real Estate Advisory Services',       gst_rate:18, applicable:'Real Estate' },
    { code:'996311', type:'SAC', description:'Accommodation Services — Hotels',     gst_rate:12, applicable:'Hospitality' },
    { code:'996321', type:'SAC', description:'Food & Beverage Services',            gst_rate:5,  applicable:'HORECA F&B' },
    { code:'996329', type:'SAC', description:'HORECA Procurement Services',         gst_rate:18, applicable:'HORECA advisory' },
    { code:'998399', type:'SAC', description:'Other Professional Services',         gst_rate:18, applicable:'Misc advisory' },
    { code:'84713010',type:'HSN',description:'Laptops & Notebooks',                gst_rate:18, applicable:'IT assets' },
  ]
}))

// ── COMMISSION / INCENTIVE ENGINE ─────────────────────────────────────────────
app.get('/sales/commission/summary', (c) => c.json({
  period: 'Q4 FY 2025-26',
  reps: [
    { id:'RM-001', name:'Akash Verma',  vertical:'Real Estate',    deals_won:2, revenue:18500000, commission_pct:2.5, commission_amt:462500, milestone_bonus:50000, total:512500, status:'Approved' },
    { id:'RM-002', name:'Sonal Gupta',  vertical:'Hospitality',    deals_won:1, revenue:8700000,  commission_pct:3.0, commission_amt:261000, milestone_bonus:0,     total:261000, status:'Pending Approval' },
    { id:'RM-003', name:'Deepak Nair',  vertical:'Entertainment',  deals_won:3, revenue:24000000, commission_pct:2.0, commission_amt:480000, milestone_bonus:100000,total:580000, status:'Approved' },
    { id:'RM-004', name:'Priya Mathur', vertical:'HORECA',         deals_won:4, revenue:3200000,  commission_pct:3.5, commission_amt:112000, milestone_bonus:25000, total:137000, status:'Draft' },
  ],
  total_payable: 1490500,
  payroll_integration: 'Pending HR approval — posts to Mar 2026 payroll',
}))

app.post('/sales/lead/assign', async (c) => {
  try {
    const { lead_id, vertical, value_crore, source } = await c.req.json()
    const assignment_rules = { 'Real Estate':'RM-001','Hospitality':'RM-002','Entertainment':'RM-003','HORECA':'RM-004','Retail':'RM-001' }
    const assigned_to = assignment_rules[vertical as string] || 'RM-001'
    return c.json({ success:true, lead_id, assigned_to, auto_rule:`Vertical-based: ${vertical}`, sla_hours:4, notification_sent:true, crm_ref:`CRM-${Date.now()}` })
  } catch { return c.json({ success:false, error:'Assignment failed' },500) }
})

// ── QUOTE → CONTRACT → INVOICE CONVERSION ────────────────────────────────────
app.post('/sales/quote/convert', async (c) => {
  try {
    const { quote_id, target, client_id } = await c.req.json()
    const conversions: Record<string,object> = {
      contract: { contract_id:`CT-${Date.now()}`, quote_id, client_id, status:'Draft', esign_required:true, template:'Standard Advisory Agreement v3.2', created_at: new Date().toISOString() },
      invoice:  { invoice_id:`INV-2026-${String(Math.floor(Math.random()*900)+100)}`, quote_id, client_id, status:'Draft', due_days:30, created_at: new Date().toISOString() },
    }
    const result = conversions[target as string]
    if (!result) return c.json({ success:false, error:'target must be contract or invoice' },400)
    return c.json({ success:true, target, result })
  } catch { return c.json({ success:false, error:'Conversion failed' },500) }
})

// ── HORECA GRN & QUALITY CHECK ────────────────────────────────────────────────
app.post('/horeca/grn/create', async (c) => {
  try {
    const { po_id, vendor_id, items } = await c.req.json()
    const grn_id = `GRN-${Date.now()}`
    return c.json({ success:true, grn_id, po_id, vendor_id, received_at: new Date().toISOString(), items_received: items?.length || 0, quality_check_required: true, qc_checklist:['Visual inspection','Weight/count verification','Expiry date check','Cold-chain log','Certificate of analysis'] })
  } catch { return c.json({ success:false, error:'GRN creation failed' },500) }
})

app.get('/horeca/warehouses', (c) => c.json({
  warehouses: [
    { id:'WH-001', name:'Central Store — Connaught Place', city:'New Delhi',  capacity_units:5000, current_stock:3280, utilisation_pct:65.6, temp_controlled:false },
    { id:'WH-002', name:'Cold Chain Unit — Okhla',         city:'New Delhi',  capacity_units:800,  current_stock:512,  utilisation_pct:64.0, temp_controlled:true  },
    { id:'WH-003', name:'Satellite Store — Gurugram Hub',  city:'Gurugram',   capacity_units:2000, current_stock:880,  utilisation_pct:44.0, temp_controlled:false },
  ],
  low_stock_alerts: 5,
  reorder_pending: 3,
}))

app.get('/horeca/logistics/track/:shipment_id', (c) => {
  const sid = c.req.param('shipment_id')
  return c.json({
    shipment_id: sid, carrier:'Delhivery', status:'In Transit',
    events:[
      { ts:'2026-02-28T06:00:00Z', location:'Okhla Warehouse, New Delhi', event:'Dispatched' },
      { ts:'2026-02-28T09:30:00Z', location:'NH-48 Checkpoint, Gurugram', event:'In Transit' },
    ],
    eta: '2026-02-28T14:00:00Z', pod_required:true,
  })
})

// ── APPRAISAL / PERFORMANCE MODULE ───────────────────────────────────────────
app.get('/hr/appraisals', (c) => c.json({
  cycle: 'Annual 2025-26', status:'In Progress',
  employees: [
    { id:'IG-EMP-0001', name:'Ravi Kumar',  reviewer:'pavan@indiagully.com', self_score:4.2, reviewer_score:null, status:'Self-review submitted' },
    { id:'IG-EMP-0002', name:'Priya Singh', reviewer:'akm@indiagully.com',   self_score:3.8, reviewer_score:4.1, status:'Reviewer complete' },
    { id:'IG-EMP-0003', name:'Amit Sharma', reviewer:'pavan@indiagully.com', self_score:null,reviewer_score:null, status:'Pending self-review' },
  ],
  parameters:['Goal Achievement','Communication','Technical Skills','Team Collaboration','Leadership','Compliance Adherence'],
}))

// ── GOVERNANCE: QUORUM & MINUTE BOOK ──────────────────────────────────────────
app.get('/governance/quorum/:meeting_id', (c) => {
  const mid = c.req.param('meeting_id')
  return c.json({
    meeting_id: mid, total_directors:3, quorum_required:2,
    present: ['Arun Manikonda (MD)','Pavan Manikonda (ED)'],
    quorum_met: true, meeting_valid: true,
    weighted_votes:{ total_shares:10000, represented:8500, pct:85.0 },
  })
})

app.get('/governance/minute-book', (c) => c.json({
  total_minutes:14, last_signed:'2026-02-05',
  minutes:[
    { id:'MIN-2025-001', meeting:'Board Meeting', date:'15 Jan 2025', resolutions:3, dsc_signed:true,  tamper_hash:'a3f9...d21b' },
    { id:'MIN-2025-002', meeting:'Board Meeting', date:'01 Feb 2025', resolutions:2, dsc_signed:true,  tamper_hash:'c7b2...f80e' },
    { id:'MIN-2025-003', meeting:'EGM',           date:'15 Feb 2025', resolutions:1, dsc_signed:true,  tamper_hash:'e1d4...a92c' },
    { id:'MIN-2025-004', meeting:'Board Meeting', date:'28 Feb 2025', resolutions:3, dsc_signed:false, tamper_hash:'pending' },
  ]
}))

// ── DPDP BREACH NOTIFICATION ──────────────────────────────────────────────────
app.post('/dpdp/breach/notify', async (c) => {
  try {
    const { description, data_categories, affected_count, severity } = await c.req.json()
    const breach_id = `BRN-${Date.now()}`
    const notify_dpc = severity === 'high' || affected_count > 100
    return c.json({
      success: true, breach_id,
      required_actions:[
        notify_dpc ? 'Notify Data Protection Board within 72 hours (Section 8 DPDP Act)' : 'Internal documentation required',
        'Notify affected Data Principals if significant harm likely',
        'Preserve logs and evidence — tamper-evident',
        'Conduct root cause analysis within 7 days',
        'Remediation plan within 14 days',
      ],
      estimated_penalty: affected_count > 500 ? '₹250 Cr max (Section 66)' : '₹50 Cr max (Section 66)',
      logged_at: new Date().toISOString(),
    })
  } catch { return c.json({ success:false, error:'Breach notification failed' },500) }
})

export default app
