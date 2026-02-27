import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

app.get('/', (c) => {
  const content = `
  <section class="min-h-screen flex items-center justify-center py-16" style="background:linear-gradient(135deg,#0A0A0A,#1A0A0A,#0A0A0A);">
    <div class="absolute inset-0 opacity-5" style="background-image:linear-gradient(rgba(197,160,40,.2) 1px,transparent 1px),linear-gradient(90deg,rgba(197,160,40,.2) 1px,transparent 1px);background-size:40px 40px;"></div>
    <div class="relative max-w-md w-full mx-4">
      <div class="bg-white" style="box-shadow:0 40px 100px rgba(0,0,0,.8);">
        <!-- Header -->
        <div class="p-8 text-center" style="background:linear-gradient(135deg,#1A0A0A,#2D0A0A);">
          <div class="w-16 h-16 flex items-center justify-center mx-auto mb-4" style="background:rgba(197,160,40,.2);border:2px solid rgba(197,160,40,.4);">
            <i class="fas fa-shield-alt text-gold text-2xl"></i>
          </div>
          <div class="text-white font-serif text-2xl font-bold mb-1">Super Admin Console</div>
          <div class="text-xs text-gray-400 uppercase tracking-widest mt-2">India Gully Enterprise Platform</div>
          <div class="flex items-center justify-center gap-3 mt-4 text-xs">
            <span class="text-red-400 font-semibold uppercase tracking-wider">⚠ Restricted Access</span>
          </div>
        </div>
        
        <!-- Login Form -->
        <div class="p-8">
          <form class="ig-form space-y-5" method="POST" action="/api/auth/admin">
            <div>
              <label class="ig-label">Admin Username</label>
              <input type="text" name="username" class="ig-input" required placeholder="admin@indiagully.com" autocomplete="off">
            </div>
            <div>
              <label class="ig-label">Admin Password</label>
              <input type="password" name="password" class="ig-input" required placeholder="••••••••••••••••">
            </div>
            <div>
              <label class="ig-label">2FA Authentication Code</label>
              <input type="text" name="totp" class="ig-input" required placeholder="6-digit TOTP" maxlength="6" autocomplete="off">
            </div>
            <button type="submit" class="w-full py-3 font-semibold text-white text-sm uppercase tracking-wider transition-all" style="background:#6B3A1A;letter-spacing:.1em;">
              <i class="fas fa-shield-alt mr-2"></i>Authenticate & Enter
            </button>
          </form>
          
          <div class="mt-6 pt-5 border-t border-ig-border space-y-2 text-xs text-center text-gray-400">
            <p>All admin actions are logged with timestamp, IP and user identity.</p>
            <p>Unauthorised access is a criminal offence under IT Act 2000.</p>
          </div>
        </div>
      </div>
      
      <div class="mt-6 text-center">
        <a href="/" class="text-gray-600 hover:text-white text-sm transition-colors flex items-center justify-center gap-2">
          <i class="fas fa-arrow-left text-xs"></i>Return to India Gully Website
        </a>
      </div>
    </div>
  </section>`
  return c.html(layout('Super Admin', content, { noNav: true }))
})

// Admin Dashboard
app.get('/dashboard', (c) => {
  return c.html(layout('Admin Dashboard', adminDashboard(), { noNav: true, bodyClass: 'bg-gray-100' }))
})

function adminDashboard() {
  const modules = [
    { icon:'globe', label:'CMS', desc:'Edit all website content, banners, SEO', color:'bg-gold', link:'#cms' },
    { icon:'users', label:'User Management', desc:'Create, manage & deactivate users', color:'bg-blue-700', link:'#users' },
    { icon:'sitemap', label:'Workflow Engine', desc:'Approval flows, escalations, triggers', color:'bg-purple-700', link:'#workflows' },
    { icon:'chart-bar', label:'Finance ERP', desc:'Vouchers, GST, P&L, Balance Sheet', color:'bg-green-700', link:'#finance' },
    { icon:'user-friends', label:'HR ERP', desc:'Payroll, attendance, leave, TDS', color:'bg-yellow-700', link:'#hr' },
    { icon:'gavel', label:'Governance', desc:'Board meetings, minutes, registers', color:'bg-red-800', link:'#governance' },
    { icon:'boxes', label:'HORECA Inventory', desc:'SKUs, quotes, procurement', color:'bg-teal-700', link:'#horeca' },
    { icon:'file-signature', label:'Contracts', desc:'Templates, clauses, e-sign', color:'bg-indigo-700', link:'#contracts' },
    { icon:'plug', label:'Integrations', desc:'Vyapar, GST Portal, email, WhatsApp', color:'bg-orange-700', link:'#integrations' },
    { icon:'chart-pie', label:'BI & Reports', desc:'Board dashboards, finance, HR analytics', color:'bg-pink-700', link:'#bi' },
    { icon:'cog', label:'System Config', desc:'Branding, SMTP, storage, API keys', color:'bg-gray-700', link:'#config' },
    { icon:'shield-alt', label:'Security & Audit', desc:'Access logs, permissions, RBAC matrix', color:'bg-red-700', link:'#security' },
  ]
  
  return `
  <div class="flex h-screen overflow-hidden">
    <!-- SIDEBAR -->
    <aside class="w-64 flex-shrink-0 flex flex-col" style="background:#0A0A0A;min-height:100vh;">
      <div class="p-5 border-b border-gray-900">
        <div class="flex items-center gap-2">
          <i class="fas fa-shield-alt text-gold"></i>
          <div>
            <div class="font-serif text-white font-bold text-sm">Super Admin</div>
            <div class="text-xs text-gray-500">India Gully Platform</div>
          </div>
        </div>
      </div>
      
      <nav class="flex-1 p-3 overflow-y-auto">
        <div class="text-xs text-gray-600 uppercase tracking-widest px-3 py-2 mb-1">Platform</div>
        ${[
          { i:'tachometer-alt', l:'Dashboard', active:true },
          { i:'globe', l:'CMS Editor', active:false },
          { i:'users', l:'User Management', active:false },
          { i:'sitemap', l:'Workflows', active:false },
        ].map(n => `<a href="#" class="flex items-center gap-3 px-3 py-2 text-xs ${n.active ? 'bg-gold text-white' : 'text-gray-500 hover:text-white hover:bg-gray-900'} transition-colors mb-0.5">${n.i ? `<i class="fas fa-${n.i} w-3.5"></i>` : ''}${n.l}</a>`).join('')}
        
        <div class="text-xs text-gray-600 uppercase tracking-widest px-3 py-2 mb-1 mt-3">ERP</div>
        ${[
          { i:'chart-bar', l:'Finance ERP', active:false },
          { i:'user-friends', l:'HR ERP', active:false },
          { i:'gavel', l:'Governance', active:false },
          { i:'boxes', l:'HORECA Mgmt', active:false },
          { i:'file-signature', l:'Contracts', active:false },
        ].map(n => `<a href="#" class="flex items-center gap-3 px-3 py-2 text-xs text-gray-500 hover:text-white hover:bg-gray-900 transition-colors mb-0.5"><i class="fas fa-${n.i} w-3.5"></i>${n.l}</a>`).join('')}
        
        <div class="text-xs text-gray-600 uppercase tracking-widest px-3 py-2 mb-1 mt-3">System</div>
        ${[
          { i:'chart-pie', l:'BI & Reports', active:false },
          { i:'plug', l:'Integrations', active:false },
          { i:'cog', l:'System Config', active:false },
          { i:'shield-alt', l:'Security', active:false },
        ].map(n => `<a href="#" class="flex items-center gap-3 px-3 py-2 text-xs text-gray-500 hover:text-white hover:bg-gray-900 transition-colors mb-0.5"><i class="fas fa-${n.i} w-3.5"></i>${n.l}</a>`).join('')}
      </nav>
      
      <div class="p-3 border-t border-gray-900">
        <a href="/" class="flex items-center gap-2 text-xs text-gray-600 hover:text-white transition-colors px-3 py-2">
          <i class="fas fa-sign-out-alt"></i>Logout
        </a>
      </div>
    </aside>
    
    <!-- MAIN -->
    <main class="flex-1 overflow-y-auto bg-gray-100">
      <!-- Top Bar -->
      <div class="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 class="font-serif text-xl font-bold text-ig-dark">Admin Dashboard</h1>
          <p class="text-xs text-gray-400">India Gully Enterprise Platform · v2024.12</p>
        </div>
        <div class="flex items-center gap-3 text-sm">
          <span class="badge badge-green text-xs">All Systems Operational</span>
          <div class="w-8 h-8 bg-gold flex items-center justify-center">
            <span class="text-white text-xs font-bold">SA</span>
          </div>
        </div>
      </div>
      
      <div class="p-8">
        <!-- System Health -->
        <div class="grid grid-cols-6 gap-4 mb-8">
          ${[
            { l:'Website', v:'Online', c:'green' },
            { l:'Client Portal', v:'Active', c:'green' },
            { l:'Employee Portal', v:'Active', c:'green' },
            { l:'Board Portal', v:'Active', c:'green' },
            { l:'Finance ERP', v:'Synced', c:'green' },
            { l:'CMS Cache', v:'Valid', c:'green' },
          ].map(s => `
          <div class="bg-white border border-gray-200 p-4 text-center">
            <div class="text-xs text-gray-400 mb-1">${s.l}</div>
            <div class="flex items-center justify-center gap-1.5">
              <div class="w-2 h-2 rounded-full bg-${s.c}-500"></div>
              <span class="text-xs font-semibold text-${s.c}-600">${s.v}</span>
            </div>
          </div>
          `).join('')}
        </div>
        
        <!-- Quick Stats -->
        <div class="grid grid-cols-4 gap-6 mb-8">
          ${[
            { l:'Total Enquiries', v:'47', icon:'envelope', color:'bg-gold' },
            { l:'Active Users', v:'12', icon:'users', color:'bg-blue-600' },
            { l:'Open Workflows', v:'8', icon:'tasks', color:'bg-purple-600' },
            { l:'Pending Approvals', v:'3', icon:'check-circle', color:'bg-orange-600' },
          ].map(s => `
          <div class="bg-white border border-gray-200 p-5">
            <div class="flex items-center justify-between mb-3">
              <div class="text-xs text-gray-400 uppercase tracking-wider">${s.l}</div>
              <div class="w-8 h-8 ${s.color} flex items-center justify-center">
                <i class="fas fa-${s.icon} text-white text-xs"></i>
              </div>
            </div>
            <div class="font-serif text-3xl font-bold text-ig-dark">${s.v}</div>
          </div>
          `).join('')}
        </div>
        
        <!-- Module Grid -->
        <h2 class="font-serif text-2xl font-bold text-ig-dark mb-6">Platform Modules</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          ${modules.map(m => `
          <a href="${m.link}" class="bg-white border border-gray-200 p-5 hover:border-gold hover:shadow-lg transition-all group cursor-pointer block">
            <div class="w-10 h-10 ${m.color} flex items-center justify-center mb-3">
              <i class="fas fa-${m.icon} text-white text-sm"></i>
            </div>
            <h3 class="font-semibold text-ig-dark text-sm mb-1 group-hover:text-gold transition-colors">${m.label}</h3>
            <p class="text-gray-400 text-xs leading-tight">${m.desc}</p>
          </a>
          `).join('')}
        </div>
        
        <!-- Recent Activity Log -->
        <div class="bg-white border border-gray-200">
          <div class="p-5 border-b border-gray-200 flex items-center justify-between">
            <h3 class="font-serif font-bold text-ig-dark">Recent System Activity</h3>
            <span class="text-xs text-gray-400">Audit Log</span>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full ig-table">
              <thead><tr><th>Time</th><th>User</th><th>Action</th><th>Module</th><th>IP</th><th>Status</th></tr></thead>
              <tbody>
                ${[
                  { time:'09:42', user:'akm@indiagully.com', action:'Login', module:'Board Portal', ip:'103.x.x.x', status:'Success' },
                  { time:'09:38', user:'info@indiagully.com', action:'New Enquiry', module:'Contact Form', ip:'122.x.x.x', status:'Received' },
                  { time:'09:25', user:'admin', action:'CMS Update', module:'Home Page', ip:'localhost', status:'Published' },
                  { time:'09:15', user:'pavan@indiagully.com', action:'Login', module:'Employee Portal', ip:'117.x.x.x', status:'Success' },
                  { time:'08:55', user:'amit.jhingan@indiagully.com', action:'Document View', module:'Client Portal', ip:'103.x.x.x', status:'Logged' },
                ].map(row => `
                <tr>
                  <td class="text-xs text-gray-400">${row.time}</td>
                  <td class="text-xs font-medium text-ig-dark">${row.user}</td>
                  <td class="text-xs">${row.action}</td>
                  <td class="text-xs text-gray-500">${row.module}</td>
                  <td class="text-xs text-gray-400">${row.ip}</td>
                  <td><span class="badge badge-green text-xs">${row.status}</span></td>
                </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
        
        <!-- CMS Quick Edit Panel -->
        <div id="cms" class="mt-8 bg-white border border-gray-200">
          <div class="p-5 border-b border-gray-200">
            <h3 class="font-serif font-bold text-ig-dark flex items-center gap-2"><i class="fas fa-globe text-gold"></i> CMS — Quick Content Edit</h3>
          </div>
          <div class="p-6">
            <div class="grid md:grid-cols-2 gap-6">
              ${[
                { section:'Hero Tagline', value:'Celebrating Desiness Across Every Vertical', field:'hero_tagline' },
                { section:'Hero Subtitle', value:'India\'s premier multi-vertical advisory firm', field:'hero_subtitle' },
                { section:'About Blurb', value:'Born and built in India — multi-vertical enterprise advisory firm', field:'about_blurb' },
                { section:'Contact CTA', value:'Submit Mandate or Service Enquiry', field:'contact_cta' },
              ].map(f => `
              <div>
                <label class="ig-label">${f.section}</label>
                <div class="flex gap-2">
                  <input type="text" name="${f.field}" class="ig-input flex-1 text-sm" value="${f.value}">
                  <button class="btn-gold px-4 py-2 text-xs flex-shrink-0">Save</button>
                </div>
              </div>
              `).join('')}
            </div>
            <div class="mt-6 flex gap-3">
              <button class="btn-gold">Publish All Changes</button>
              <button class="btn-outline-gold">Preview Changes</button>
              <button class="btn-dark">Rollback to Last Version</button>
            </div>
          </div>
        </div>
        
        <!-- Finance ERP Panel -->
        <div id="finance" class="mt-8 bg-white border border-gray-200">
          <div class="p-5 border-b border-gray-200">
            <h3 class="font-serif font-bold text-ig-dark flex items-center gap-2"><i class="fas fa-chart-bar text-green-600"></i> Finance ERP — Quick Overview</h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              ${[
                { l:'Total Revenue MTD', v:'₹12.4L', trend:'+18%' },
                { l:'Outstanding Receivables', v:'₹5.1L', trend:'-5%' },
                { l:'GST Payable', v:'₹2.2L', trend:'' },
                { l:'Bank Balance', v:'₹28.7L', trend:'+3%' },
              ].map(m => `
              <div class="bg-ig-cream border border-ig-border p-4">
                <div class="text-xs text-gray-400 mb-1">${m.l}</div>
                <div class="font-serif text-2xl font-bold text-ig-dark">${m.v}</div>
                ${m.trend ? `<div class="text-xs text-green-600 mt-1">${m.trend} MoM</div>` : ''}
              </div>
              `).join('')}
            </div>
            <div class="flex gap-3">
              <button class="btn-gold text-xs">Create Voucher</button>
              <button class="btn-outline-gold text-xs">View P&L</button>
              <button class="btn-dark text-xs">GST Report</button>
              <button class="btn-dark text-xs">Trial Balance</button>
            </div>
          </div>
        </div>
        
        <!-- HR ERP Panel -->
        <div id="hr" class="mt-8 bg-white border border-gray-200">
          <div class="p-5 border-b border-gray-200">
            <h3 class="font-serif font-bold text-ig-dark flex items-center gap-2"><i class="fas fa-user-friends text-yellow-600"></i> HR ERP — Quick Overview</h3>
          </div>
          <div class="p-6">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              ${[
                { l:'Total Employees', v:'24', icon:'users' },
                { l:'Present Today', v:'21', icon:'check-circle' },
                { l:'Leave Requests', v:'3', icon:'calendar' },
                { l:'Pending Payroll', v:'Dec 2024', icon:'money-bill' },
              ].map(m => `
              <div class="bg-ig-cream border border-ig-border p-4">
                <div class="text-xs text-gray-400 mb-2">${m.l}</div>
                <div class="font-serif text-2xl font-bold text-ig-dark">${m.v}</div>
              </div>
              `).join('')}
            </div>
            <div class="flex gap-3">
              <button class="btn-gold text-xs">Add Employee</button>
              <button class="btn-outline-gold text-xs">Run Payroll</button>
              <button class="btn-dark text-xs">Attendance Report</button>
              <button class="btn-dark text-xs">Form-16 Status</button>
            </div>
          </div>
        </div>
        
        <!-- Governance Panel -->
        <div id="governance" class="mt-8 bg-white border border-gray-200">
          <div class="p-5 border-b border-gray-200">
            <h3 class="font-serif font-bold text-ig-dark flex items-center gap-2"><i class="fas fa-gavel text-red-700"></i> Governance — Board & Compliance</h3>
          </div>
          <div class="p-6">
            <div class="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 class="font-semibold text-ig-dark text-sm mb-3">Upcoming Board Events</h4>
                ${[
                  { type:'Board Meeting', date:'Jan 10, 2025', status:'Scheduled' },
                  { type:'AGM (Annual)', date:'Mar 30, 2025', status:'Planned' },
                  { type:'ROC Filing MBP-1', date:'Dec 31, 2024', status:'Due' },
                ].map(e => `
                <div class="flex items-center justify-between py-2 border-b border-ig-border text-sm">
                  <span class="font-medium text-ig-dark">${e.type}</span>
                  <span class="text-gray-400 text-xs">${e.date}</span>
                  <span class="badge badge-gold text-xs">${e.status}</span>
                </div>
                `).join('')}
              </div>
              <div>
                <h4 class="font-semibold text-ig-dark text-sm mb-3">Director KYC Status</h4>
                ${[
                  { name:'Arun Manikonda', din:'XXXXXXXX', status:'Current' },
                  { name:'Pavan Manikonda', din:'XXXXXXXX', status:'Current' },
                ].map(d => `
                <div class="flex items-center justify-between py-2 border-b border-ig-border text-sm">
                  <span class="font-medium text-ig-dark">${d.name}</span>
                  <span class="text-xs text-gray-400">DIN: ${d.din}</span>
                  <span class="badge badge-green text-xs">${d.status}</span>
                </div>
                `).join('')}
              </div>
            </div>
            <div class="flex gap-3">
              <button class="btn-gold text-xs">Call Board Meeting</button>
              <button class="btn-outline-gold text-xs">Create Agenda</button>
              <button class="btn-dark text-xs">ROC Tracker</button>
              <button class="btn-dark text-xs">Minute Book</button>
            </div>
          </div>
        </div>
        
      </div>
    </main>
  </div>`
}

export default app
