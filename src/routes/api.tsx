import { Hono } from 'hono'

const app = new Hono()

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
