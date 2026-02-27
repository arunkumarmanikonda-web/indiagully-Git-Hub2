import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

// Route imports
import homeRoute from './routes/home'
import aboutRoute from './routes/about'
import servicesRoute from './routes/services'
import horecaRoute from './routes/horeca'
import listingsRoute from './routes/listings'
import insightsRoute from './routes/insights'
import contactRoute from './routes/contact'
import portalRoute from './routes/portal'
import adminRoute from './routes/admin'
import apiRoute from './routes/api'

const app = new Hono()

app.use('/api/*', cors())
app.use('/static/*', serveStatic({ root: './' }))
app.use('/assets/*', serveStatic({ root: './' }))

// Mount routes
app.route('/', homeRoute)
app.route('/about', aboutRoute)
app.route('/services', servicesRoute)
app.route('/horeca', horecaRoute)
app.route('/listings', listingsRoute)
app.route('/insights', insightsRoute)
app.route('/contact', contactRoute)
app.route('/portal', portalRoute)
app.route('/admin', adminRoute)
app.route('/api', apiRoute)

export default app
