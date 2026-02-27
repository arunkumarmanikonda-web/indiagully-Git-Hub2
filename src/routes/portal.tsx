import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

function portalLogin(portal: string, title: string, subtitle: string, color: string, icon: string, fields: string[]) {
  return `
  <section class="min-h-screen flex items-center justify-center py-16" style="background:linear-gradient(135deg,#0D0D0D,#1A1A1A);">
    <div class="absolute inset-0 opacity-5" style="background-image:linear-gradient(rgba(197,160,40,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(197,160,40,.3) 1px,transparent 1px);background-size:60px 60px;"></div>
    <div class="relative max-w-md w-full mx-4">
      <!-- Portal Card -->
      <div class="bg-white" style="box-shadow:0 40px 100px rgba(0,0,0,.5);">
        <!-- Header -->
        <div class="p-8 text-center" style="background:${color};">
          <div class="w-16 h-16 bg-white bg-opacity-20 flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-${icon} text-white text-2xl"></i>
          </div>
          <div class="text-white font-serif text-2xl font-bold mb-1">${title}</div>
          <div class="text-white text-opacity-80 text-sm">${subtitle}</div>
          <div class="text-white text-opacity-60 text-xs mt-2 uppercase tracking-widest">India Gully Enterprise Platform</div>
        </div>
        
        <!-- Form -->
        <div class="p-8">
          <form class="ig-form space-y-5" method="POST" action="/api/auth/login">
            <input type="hidden" name="portal" value="${portal}">
            
            ${fields.map(f => {
              if (f === 'id') return `
              <div>
                <label class="ig-label">${portal === 'employee' ? 'Employee ID' : portal === 'board' ? 'Director DIN / KMP ID' : 'Client ID / Email'}</label>
                <input type="text" name="${f}" class="ig-input" required placeholder="${portal === 'employee' ? 'IG-EMP-XXXX' : portal === 'board' ? 'DIN / IG-KMP-XXXX' : 'Client ID or Email'}">
              </div>`
              if (f === 'email') return `
              <div>
                <label class="ig-label">Email Address</label>
                <input type="email" name="email" class="ig-input" required placeholder="your@email.com">
              </div>`
              if (f === 'password') return `
              <div>
                <label class="ig-label">Password</label>
                <input type="password" name="password" class="ig-input" required placeholder="••••••••••••">
              </div>`
              if (f === 'otp') return `
              <div>
                <label class="ig-label">OTP / 2FA Code</label>
                <input type="text" name="otp" class="ig-input" placeholder="6-digit code (if enabled)" maxlength="6">
              </div>`
              return ''
            }).join('')}
            
            <div class="flex items-center justify-between text-sm">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" name="remember" class="accent-gold">
                <span class="text-gray-500 text-xs">Remember this device</span>
              </label>
              <a href="/portal/reset?portal=${portal}" class="text-xs text-gold hover:underline">Forgot password?</a>
            </div>
            
            <button type="submit" class="w-full py-3 font-semibold text-white text-sm uppercase tracking-wider transition-all" style="background:${color}; letter-spacing:.1em;">
              <i class="fas fa-sign-in-alt mr-2"></i>Secure Login
            </button>
          </form>
          
          <div class="mt-6 pt-6 border-t border-ig-border space-y-3 text-center">
            <p class="text-xs text-gray-400">Authorised users only. All access is logged and monitored.</p>
            <div class="flex items-center justify-center gap-4 text-xs">
              <div class="flex items-center gap-1.5 text-gray-400">
                <i class="fas fa-lock text-green-500 text-xs"></i>
                <span>256-bit TLS</span>
              </div>
              <div class="flex items-center gap-1.5 text-gray-400">
                <i class="fas fa-shield-alt text-gold text-xs"></i>
                <span>RBAC Enforced</span>
              </div>
              <div class="flex items-center gap-1.5 text-gray-400">
                <i class="fas fa-eye text-blue-400 text-xs"></i>
                <span>Audit Logged</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Back Link -->
      <div class="mt-6 text-center">
        <a href="/" class="text-gray-600 hover:text-white text-sm transition-colors flex items-center justify-center gap-2">
          <i class="fas fa-arrow-left text-xs"></i>Return to India Gully Website
        </a>
      </div>
    </div>
  </section>`
}

// Portal selection page
app.get('/', (c) => {
  const content = `
  <section class="min-h-screen py-16 flex items-center" style="background:linear-gradient(135deg,#0D0D0D,#1A1A1A);">
    <div class="absolute inset-0 opacity-5" style="background-image:linear-gradient(rgba(197,160,40,.3) 1px,transparent 1px),linear-gradient(90deg,rgba(197,160,40,.3) 1px,transparent 1px);background-size:60px 60px;"></div>
    <div class="relative max-w-5xl mx-auto px-6 w-full">
      <div class="text-center mb-14">
        <div class="font-serif text-4xl font-bold text-white mb-3">India Gully Enterprise Portal</div>
        <p class="text-gray-500">Select your authorised portal to continue. All access is logged and monitored.</p>
        <div class="flex items-center justify-center gap-3 mt-4 text-xs text-gray-600">
          <span><i class="fas fa-lock text-gold mr-1"></i>Encrypted Access</span>
          <span class="text-gray-700">|</span>
          <span><i class="fas fa-shield-alt text-gold mr-1"></i>Role-Based Permissions</span>
          <span class="text-gray-700">|</span>
          <span><i class="fas fa-eye text-gold mr-1"></i>Full Audit Trail</span>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        ${[
          { href:'/portal/client', icon:'user-tie', color:'#C5A028', name:'Client Portal', desc:'Proposals, contracts, invoices, deliverables, GST documents', who:'For: Clients & Advisory Partners' },
          { href:'/portal/employee', icon:'users', color:'#1A3A6B', name:'Employee Portal', desc:'Attendance, leave, payslips, Form-16, policies, directory', who:'For: India Gully Employees' },
          { href:'/portal/board', icon:'gavel', color:'#1A1A1A', name:'Board & KMP Portal', desc:'Board meetings, voting, financials, director documents, minutes', who:'For: Directors & KMPs' },
          { href:'/admin', icon:'shield-alt', color:'#6B3A1A', name:'Super Admin', desc:'CMS, workflows, permissions, branding, ERP configuration', who:'For: Authorised Administrators' },
        ].map(p => `
        <a href="${p.href}" class="portal-card block overflow-hidden group">
          <div class="h-2" style="background:${p.color};"></div>
          <div class="p-6">
            <div class="w-12 h-12 flex items-center justify-center mb-4" style="background:${p.color};">
              <i class="fas fa-${p.icon} text-white text-lg"></i>
            </div>
            <h3 class="font-serif text-lg font-bold text-ig-dark mb-2 group-hover:text-gold transition-colors">${p.name}</h3>
            <p class="text-gray-500 text-xs leading-relaxed mb-3">${p.desc}</p>
            <p class="text-xs text-gray-400 font-medium">${p.who}</p>
          </div>
          <div class="px-6 pb-5">
            <div class="flex items-center gap-2 text-xs text-gold font-semibold">
              <i class="fas fa-lock text-xs"></i>
              <span>Secure Login</span>
              <i class="fas fa-arrow-right text-xs ml-auto group-hover:translate-x-1 transition-transform"></i>
            </div>
          </div>
        </a>
        `).join('')}
      </div>
      
      <div class="mt-10 text-center">
        <a href="/" class="text-gray-600 hover:text-white text-sm transition-colors flex items-center justify-center gap-2">
          <i class="fas fa-arrow-left text-xs"></i>Return to India Gully Website
        </a>
      </div>
    </div>
  </section>`
  return c.html(layout('Enterprise Portal', content, { noNav: true }))
})

// Client Portal
app.get('/client', (c) => {
  const content = portalLogin('client', 'Client Portal', 'Advisory Services Platform', '#C5A028', 'user-tie', ['id', 'password', 'otp'])
  return c.html(layout('Client Portal', content, { noNav: true }))
})

// Employee Portal
app.get('/employee', (c) => {
  const content = portalLogin('employee', 'Employee Portal', 'HR & Operations Platform', '#1A3A6B', 'users', ['id', 'password', 'otp'])
  return c.html(layout('Employee Portal', content, { noNav: true }))
})

// Board & KMP Portal
app.get('/board', (c) => {
  const content = portalLogin('board', 'Board & KMP Portal', 'Governance & Compliance Platform', '#1A1A1A', 'gavel', ['id', 'password', 'otp'])
  return c.html(layout('Board & KMP Portal', content, { noNav: true }))
})

// Portal Reset
app.get('/reset', (c) => {
  const portal = c.req.query('portal') || 'client'
  const content = `
  <section class="min-h-screen flex items-center justify-center py-16" style="background:linear-gradient(135deg,#0D0D0D,#1A1A1A);">
    <div class="relative max-w-md w-full mx-4">
      <div class="bg-white" style="box-shadow:0 40px 100px rgba(0,0,0,.5);">
        <div class="p-8 text-center bg-ig-dark">
          <div class="w-12 h-12 bg-gold mx-auto flex items-center justify-center mb-4">
            <i class="fas fa-key text-white"></i>
          </div>
          <h2 class="font-serif text-2xl font-bold text-white">Reset Password</h2>
          <p class="text-gray-400 text-sm mt-1">Enter your registered email to receive reset instructions.</p>
        </div>
        <div class="p-8">
          <form class="ig-form space-y-4" method="POST" action="/api/auth/reset">
            <input type="hidden" name="portal" value="${portal}">
            <div>
              <label class="ig-label">Registered Email Address</label>
              <input type="email" name="email" class="ig-input" required placeholder="your@email.com">
            </div>
            <button type="submit" class="btn-gold w-full">Send Reset Instructions</button>
          </form>
          <div class="mt-4 text-center"><a href="/portal/${portal}" class="text-xs text-gold hover:underline">Back to Login</a></div>
        </div>
      </div>
    </div>
  </section>`
  return c.html(layout('Password Reset', content, { noNav: true }))
})

// Dashboard stubs (post-login)
app.get('/client/dashboard', (c) => {
  return c.html(layout('Client Dashboard', clientDashboard(), { noNav: true, bodyClass: 'bg-gray-50' }))
})

function clientDashboard() {
  return `
  <div class="flex h-screen overflow-hidden bg-gray-50">
    <!-- SIDEBAR -->
    <aside class="w-64 flex-shrink-0 bg-ig-dark flex flex-col" style="min-height:100vh;">
      <div class="p-5 border-b border-gray-800">
        <div class="font-serif text-white font-bold">India Gully</div>
        <div class="text-xs text-gold tracking-widest">Client Portal</div>
      </div>
      <nav class="flex-1 p-4 space-y-1 overflow-y-auto">
        ${[
          { icon:'tachometer-alt', label:'Dashboard', active:true },
          { icon:'file-contract', label:'My Mandates', active:false },
          { icon:'file-alt', label:'Proposals', active:false },
          { icon:'receipt', label:'Invoices & GST', active:false },
          { icon:'folder-open', label:'Documents', active:false },
          { icon:'comments', label:'Messages', active:false },
          { icon:'user-cog', label:'My Profile', active:false },
        ].map(item => `
        <a href="#" class="flex items-center gap-3 px-3 py-2.5 text-sm ${item.active ? 'bg-gold text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'} transition-colors">
          <i class="fas fa-${item.icon} w-4 text-center text-sm"></i>${item.label}
        </a>
        `).join('')}
      </nav>
      <div class="p-4 border-t border-gray-800">
        <a href="/" class="flex items-center gap-2 text-xs text-gray-500 hover:text-white transition-colors">
          <i class="fas fa-sign-out-alt"></i> Sign Out
        </a>
      </div>
    </aside>
    
    <!-- MAIN CONTENT -->
    <main class="flex-1 overflow-y-auto">
      <!-- Top Bar -->
      <div class="bg-white border-b border-ig-border px-8 py-4 flex items-center justify-between">
        <div>
          <h1 class="font-serif text-xl font-bold text-ig-dark">Dashboard</h1>
          <p class="text-xs text-gray-400">Welcome back. Last login: Today, 09:32 AM IST</p>
        </div>
        <div class="flex items-center gap-3">
          <button class="relative p-2 text-gray-400 hover:text-gold transition-colors">
            <i class="fas fa-bell"></i>
            <span class="absolute top-1 right-1 w-2 h-2 bg-gold rounded-full"></span>
          </button>
          <div class="w-8 h-8 bg-ig-dark flex items-center justify-center">
            <span class="text-gold font-bold text-xs">CL</span>
          </div>
        </div>
      </div>
      
      <!-- Dashboard Content -->
      <div class="p-8">
        <!-- Stats Row -->
        <div class="grid grid-cols-4 gap-6 mb-8">
          ${[
            { label:'Active Mandates', value:'3', icon:'file-contract', color:'bg-gold' },
            { label:'Pending Invoices', value:'2', icon:'receipt', color:'bg-blue-600' },
            { label:'Documents Shared', value:'14', icon:'folder-open', color:'bg-green-600' },
            { label:'Open Messages', value:'1', icon:'comments', color:'bg-purple-600' },
          ].map(s => `
          <div class="bg-white border border-ig-border p-5">
            <div class="flex items-center justify-between mb-3">
              <div class="text-xs text-gray-400 uppercase tracking-wider">${s.label}</div>
              <div class="w-8 h-8 ${s.color} flex items-center justify-center">
                <i class="fas fa-${s.icon} text-white text-xs"></i>
              </div>
            </div>
            <div class="font-serif text-3xl font-bold text-ig-dark">${s.value}</div>
          </div>
          `).join('')}
        </div>
        
        <!-- Recent Activity -->
        <div class="grid lg:grid-cols-2 gap-8">
          <div class="bg-white border border-ig-border">
            <div class="p-5 border-b border-ig-border flex items-center justify-between">
              <h3 class="font-serif font-bold text-ig-dark">Active Mandates</h3>
              <a href="#" class="text-xs text-gold hover:underline">View All</a>
            </div>
            <div class="ig-table overflow-x-auto">
              <table class="w-full">
                <thead><tr><th class="text-left">Mandate</th><th class="text-left">Status</th><th class="text-left">Value</th></tr></thead>
                <tbody>
                  <tr><td class="font-medium text-sm">Retail Leasing – Mumbai</td><td><span class="badge badge-green text-xs">Active</span></td><td class="text-gold font-semibold text-sm">₹2,100 Cr</td></tr>
                  <tr><td class="font-medium text-sm">Hotel Pre-Opening PMC</td><td><span class="badge badge-gold text-xs">In Progress</span></td><td class="text-gold font-semibold text-sm">₹45 Cr</td></tr>
                  <tr><td class="font-medium text-sm">Entertainment Feasibility</td><td><span class="badge badge-dark text-xs">Review</span></td><td class="text-gold font-semibold text-sm">₹4,500 Cr</td></tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div class="bg-white border border-ig-border">
            <div class="p-5 border-b border-ig-border flex items-center justify-between">
              <h3 class="font-serif font-bold text-ig-dark">Recent Invoices</h3>
              <a href="#" class="text-xs text-gold hover:underline">View All</a>
            </div>
            <div class="ig-table overflow-x-auto">
              <table class="w-full">
                <thead><tr><th class="text-left">Invoice</th><th class="text-left">Date</th><th class="text-left">Amount</th><th class="text-left">Status</th></tr></thead>
                <tbody>
                  <tr><td class="text-sm">INV-2024-001</td><td class="text-sm text-gray-400">Dec 15</td><td class="text-gold font-semibold text-sm">₹2.5L</td><td><span class="badge badge-green text-xs">Paid</span></td></tr>
                  <tr><td class="text-sm">INV-2024-002</td><td class="text-sm text-gray-400">Dec 20</td><td class="text-gold font-semibold text-sm">₹1.8L</td><td><span class="badge badge-gold text-xs">Due</span></td></tr>
                  <tr><td class="text-sm">INV-2024-003</td><td class="text-sm text-gray-400">Jan 5</td><td class="text-gold font-semibold text-sm">₹3.2L</td><td><span class="badge badge-dark text-xs">Pending</span></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>`
}

export default app
