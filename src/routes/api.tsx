import { Hono } from 'hono'

const app = new Hono()

// Health check
app.get('/health', (c) => {
  return c.json({ 
    status: 'operational', 
    platform: 'India Gully Enterprise Platform',
    version: '2024.12',
    timestamp: new Date().toISOString()
  })
})

// Enquiry submission
app.post('/enquiry', async (c) => {
  try {
    const body = await c.req.parseBody()
    const enquiryData = {
      id: `ENQ-${Date.now()}`,
      type: body.type || body.enquiry_type || 'general',
      name: body.name,
      email: body.email,
      phone: body.phone,
      org: body.org,
      message: body.message,
      vertical: body.vertical,
      mandate: body.premandate || body.mandate,
      service: body.preservice || body.service,
      scale: body.scale,
      timestamp: new Date().toISOString(),
    }
    
    // In production: store to D1, send notification email
    console.log('New enquiry:', JSON.stringify(enquiryData))
    
    return c.json({ 
      success: true, 
      id: enquiryData.id,
      message: 'Enquiry received. We will respond within 1 business day.',
    })
  } catch (err) {
    return c.json({ success: false, error: 'Submission failed. Please try again.' }, 500)
  }
})

// Subscribe
app.post('/subscribe', async (c) => {
  try {
    const body = await c.req.parseBody()
    return c.json({ success: true, message: 'Subscribed to India Gully Insights.' })
  } catch (err) {
    return c.json({ success: false, error: 'Subscription failed.' }, 500)
  }
})

// Insight access request
app.post('/insight-request', async (c) => {
  try {
    const body = await c.req.parseBody()
    return c.json({ success: true, message: 'Access request received.' })
  } catch (err) {
    return c.json({ success: false, error: 'Request failed.' }, 500)
  }
})

// Auth - Login (stub)
app.post('/auth/login', async (c) => {
  try {
    const body = await c.req.parseBody()
    const portal = body.portal as string
    
    // In production: validate credentials against D1, issue JWT, set session
    // For demo: always redirect to appropriate dashboard
    const dashboards: Record<string, string> = {
      client: '/portal/client/dashboard',
      employee: '/portal/employee',
      board: '/portal/board',
    }
    
    return c.json({ 
      success: false, 
      error: 'Authentication system requires backend database configuration. Please contact admin@indiagully.com',
      redirect: dashboards[portal] || '/portal'
    }, 401)
  } catch (err) {
    return c.json({ success: false, error: 'Login failed.' }, 500)
  }
})

// Auth - Admin (stub)
app.post('/auth/admin', async (c) => {
  return c.json({ success: false, error: 'Admin authentication requires secure backend configuration.' }, 401)
})

// Auth - Reset (stub)
app.post('/auth/reset', async (c) => {
  try {
    const body = await c.req.parseBody()
    return c.json({ success: true, message: `Password reset instructions sent to ${body.email}` })
  } catch (err) {
    return c.json({ success: false, error: 'Reset failed.' }, 500)
  }
})

// CMS Content API (GET)
app.get('/cms/content/:key', (c) => {
  const key = c.req.param('key')
  // In production: fetch from D1 CMS table
  return c.json({ key, value: null, updated: null })
})

// CMS Content API (POST) - Admin only
app.post('/cms/content', async (c) => {
  // In production: validate admin JWT, update D1 CMS table, invalidate cache
  return c.json({ success: false, error: 'Authentication required.' }, 401)
})

// Finance API (protected)
app.get('/finance/summary', (c) => {
  return c.json({ success: false, error: 'Authentication required.' }, 401)
})

// HR API (protected)
app.get('/hr/employees', (c) => {
  return c.json({ success: false, error: 'Authentication required.' }, 401)
})

// Governance API (protected)
app.get('/governance/meetings', (c) => {
  return c.json({ success: false, error: 'Authentication required.' }, 401)
})

// HORECA Quote API
app.post('/horeca/quote', async (c) => {
  try {
    const body = await c.req.parseBody()
    const quoteId = `QT-${Date.now()}`
    return c.json({ 
      success: true, 
      quoteId,
      message: 'Quote request received. Our HORECA team will revert within 24 hours.',
    })
  } catch (err) {
    return c.json({ success: false, error: 'Quote submission failed.' }, 500)
  }
})

export default app
