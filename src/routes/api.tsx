import { Hono } from 'hono'

const app = new Hono()

// ── AUTH LOGIN ────────────────────────────────────────────────────────────────
// Demo credentials check — in production replace with D1 database lookup + bcrypt

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
    if (!creds) {
      return c.html(errorRedirect(`/portal/${portal}`, 'Invalid portal selection.'))
    }

    const idOk   = identifier?.trim().toLowerCase() === creds.id.toLowerCase()
    const passOk = password === creds.pass
    const otpOk  = !otp || otp === '' || otp === creds.otp  // OTP optional for demo

    if (!idOk || !passOk) {
      return c.html(errorRedirect(`/portal/${portal}`, 'Invalid credentials. Please check the demo access details above.'))
    }

    if (otp && otp.length > 0 && otp !== creds.otp) {
      return c.html(errorRedirect(`/portal/${portal}`, 'Invalid OTP / 2FA code. Use 000000 for demo access.'))
    }

    // Successful login — redirect to dashboard
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

    if (!ok) {
      return c.html(errorRedirect('/admin', 'Invalid admin credentials or 2FA code.'))
    }

    return c.redirect('/admin/dashboard', 302)
  } catch (err) {
    return c.html(errorRedirect('/admin', 'Authentication failed. Please try again.'))
  }
})

app.post('/auth/reset', async (c) => {
  try {
    const body = await c.req.parseBody()
    const { portal, email } = body as Record<string, string>
    // In production this would send an email
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
  version: '2024.12',
  timestamp: new Date().toISOString(),
  routes: [
    'GET /',
    'GET /about',
    'GET /services',
    'GET /horeca',
    'GET /listings',
    'GET /listings/:id',
    'GET /insights',
    'GET /insights/:id',
    'GET /contact',
    'GET /portal',
    'GET /portal/client',
    'GET /portal/client/dashboard',
    'GET /portal/employee',
    'GET /portal/employee/dashboard',
    'GET /portal/board',
    'GET /portal/board/dashboard',
    'GET /admin',
    'GET /admin/dashboard',
    'POST /api/enquiry',
    'POST /api/horeca-enquiry',
    'POST /api/subscribe',
    'GET /api/health',
  ]
}))

// ── MANDATE ENQUIRY ───────────────────────────────────────────────────────────
app.post('/enquiry', async (c) => {
  try {
    const body = await c.req.parseBody()
    const { name, email, phone, org, type, message, mandate, sectors, nda_consent } = body as Record<string, string>

    if (!name || !email) {
      return c.json({ success: false, error: 'Name and email are required' }, 400)
    }

    // Log enquiry (in production, save to D1 and send email)
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

    if (!name || !email) {
      return c.json({ success: false, error: 'Name and email are required' }, 400)
    }

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

    if (!email) {
      return c.json({ success: false, error: 'Email is required' }, 400)
    }

    console.log('[SUBSCRIBE]', { name, email, timestamp: new Date().toISOString() })

    return c.json({
      success: true,
      message: 'You have been subscribed to the India Gully Research Bulletin.',
    })
  } catch (err) {
    return c.json({ success: false, error: 'Subscription failed' }, 500)
  }
})

// ── LISTINGS API ──────────────────────────────────────────────────────────────
app.get('/listings', (c) => c.json({
  total: 6,
  pipeline_value: '₹8,815 Cr',
  listings: [
    { id:'entertainment-maharashtra', title:'Integrated Entertainment Destination', location:'Maharashtra', value:'₹4,500 Cr', sector:'Entertainment', status:'Active' },
    { id:'retail-hub-mumbai', title:'Entertainment & Retail Hub', location:'Mumbai MMR', value:'₹2,100 Cr', sector:'Real Estate', status:'Active' },
    { id:'heritage-rajasthan', title:'6-Property Heritage Hotel Portfolio', location:'Rajasthan', value:'₹620 Cr', sector:'Heritage', status:'Under Negotiation' },
    { id:'luxury-resorts-pan-india', title:'5-Property Luxury Resort Rollout', location:'Rajasthan · Goa · Kerala', value:'₹350 Cr', sector:'Hospitality', status:'Feasibility' },
    { id:'entertainment-ncr-bhutani', title:'Entertainment City — Delhi NCR', location:'Noida, Delhi NCR', value:'₹1,200 Cr+', sector:'Entertainment', status:'Active' },
    { id:'desi-brand-retail', title:'Desi Brand — 15-City Retail Expansion', location:'Tier 1 & 2 Cities', value:'₹45 Cr', sector:'Retail', status:'Active' },
  ]
}))

export default app
