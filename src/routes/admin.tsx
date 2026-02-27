import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

// ── ADMIN LOGIN ──────────────────────────────────────────────────────────────
app.get('/', (c) => {
  const content = `
  <div style="min-height:100vh;background:#080808;display:flex;align-items:center;justify-content:center;padding:2rem">
    <div style="width:100%;max-width:420px">

      <div style="text-align:center;margin-bottom:2.5rem">
        <div style="display:inline-flex;align-items:center;justify-content:center;width:52px;height:52px;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.25);margin-bottom:1.5rem">
          <i class="fas fa-shield-alt" style="color:#ef4444;font-size:1.1rem"></i>
        </div>
        <div style="font-size:.62rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(239,68,68,.6);margin-bottom:1.25rem">SUPER ADMIN — RESTRICTED ACCESS</div>
        <h1 class="f-serif" style="font-size:1.75rem;color:#fff;font-weight:400;margin-bottom:.625rem">Admin Console</h1>
        <p style="font-size:.8rem;color:rgba(255,255,255,.3);line-height:1.7">India Gully Enterprise Platform. Authorised personnel only. All access is logged and monitored.</p>
      </div>

      <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);padding:2.5rem">
        <form id="adminForm" onsubmit="handleAdmin(event)" style="display:flex;flex-direction:column;gap:1.25rem">
          <div>
            <label class="ig-label" style="color:rgba(255,255,255,.35)">Admin Username</label>
            <input type="text" id="adminUser" class="ig-input" placeholder="admin" style="background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.1);color:#fff" required>
          </div>
          <div>
            <label class="ig-label" style="color:rgba(255,255,255,.35)">Password</label>
            <input type="password" id="adminPass" class="ig-input" placeholder="••••••••••••" style="background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.1);color:#fff" required>
          </div>
          <div>
            <label class="ig-label" style="color:rgba(255,255,255,.35)">TOTP Code (6-digit)</label>
            <input type="text" id="adminOtp" class="ig-input" placeholder="000000" maxlength="6" style="background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.1);color:#fff;letter-spacing:.25em;font-size:1.1rem" required>
          </div>
          <div id="adminErr" style="display:none;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3);padding:.75rem;font-size:.8rem;color:#fca5a5;text-align:center"></div>
          <button type="submit" id="adminBtn" class="btn btn-gold" style="justify-content:center;padding:.875rem">
            <i class="fas fa-shield-alt" style="margin-right:.5rem;font-size:.75rem"></i>Access Admin Console
          </button>
        </form>
      </div>

      <p style="text-align:center;font-size:.72rem;color:rgba(255,255,255,.18);margin-top:1.25rem">
        Unauthorised access is a criminal offence under the IT Act, 2000 · All sessions are logged<br>
        <a href="/portal" style="color:rgba(255,255,255,.25);text-decoration:none">← Back to Portal Hub</a>
      </p>
    </div>
  </div>

  <script>
  function handleAdmin(e) {
    e.preventDefault();
    var btn = document.getElementById('adminBtn');
    var err = document.getElementById('adminErr');
    err.style.display = 'none';
    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin" style="margin-right:.5rem"></i>Verifying…';
    btn.disabled = true;
    setTimeout(function() {
      var u = document.getElementById('adminUser').value;
      var p = document.getElementById('adminPass').value;
      var o = document.getElementById('adminOtp').value;
      if(u && p.length >= 4 && o.length === 6) {
        window.location.href = '/admin/dashboard';
      } else {
        err.textContent = 'Invalid credentials. Access denied.';
        err.style.display = 'block';
        btn.innerHTML = '<i class="fas fa-shield-alt" style="margin-right:.5rem;font-size:.75rem"></i>Access Admin Console';
        btn.disabled = false;
      }
    }, 1400);
  }
  </script>
  `
  return c.html(layout('Super Admin', content, { noNav: true, noFooter: true, bodyClass: '' }))
})

// ── ADMIN DASHBOARD ──────────────────────────────────────────────────────────
app.get('/dashboard', (c) => {
  const content = `
  <div style="display:flex;min-height:100vh;background:#0A0A0A">

    <!-- SIDEBAR -->
    <aside style="width:256px;background:#111;border-right:1px solid rgba(255,255,255,.07);flex-shrink:0;display:flex;flex-direction:column;overflow-y:auto">
      <div style="padding:1.5rem;border-bottom:1px solid rgba(255,255,255,.07)">
        <div class="f-serif" style="color:#fff;font-size:.95rem;letter-spacing:.06em">INDIA GULLY</div>
        <div style="font-size:.5rem;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-top:2px">Super Admin Console</div>
        <div style="font-size:.6rem;color:rgba(239,68,68,.5);margin-top:.5rem;font-weight:600;letter-spacing:.1em">● LIVE ENVIRONMENT</div>
      </div>

      <nav style="flex:1;padding:1rem .75rem">
        <div class="sidebar-section">Content</div>
        <a class="sidebar-link active" onclick="showModule('cms')"    href="#"><i class="fas fa-edit"            style="width:16px;font-size:.8rem"></i>CMS & Content</a>
        <a class="sidebar-link"        onclick="showModule('users')"  href="#"><i class="fas fa-users-cog"       style="width:16px;font-size:.8rem"></i>User Management</a>
        <a class="sidebar-link"        onclick="showModule('workflow')"href="#"><i class="fas fa-project-diagram"style="width:16px;font-size:.8rem"></i>Workflows & Approvals</a>

        <div class="sidebar-section">Finance ERP</div>
        <a class="sidebar-link"        onclick="showModule('finance')" href="#"><i class="fas fa-chart-line"     style="width:16px;font-size:.8rem"></i>Finance Dashboard</a>
        <a class="sidebar-link"        href="#"                                ><i class="fas fa-receipt"        style="width:16px;font-size:.8rem"></i>Vouchers & GL</a>
        <a class="sidebar-link"        href="#"                                ><i class="fas fa-percent"        style="width:16px;font-size:.8rem"></i>GST Reports</a>
        <a class="sidebar-link"        href="#"                                ><i class="fas fa-file-invoice-dollar" style="width:16px;font-size:.8rem"></i>Invoices & Payments</a>

        <div class="sidebar-section">HR ERP</div>
        <a class="sidebar-link"        onclick="showModule('hr')"      href="#"><i class="fas fa-user-friends"  style="width:16px;font-size:.8rem"></i>HR Dashboard</a>
        <a class="sidebar-link"        href="#"                                ><i class="fas fa-calendar-check" style="width:16px;font-size:.8rem"></i>Attendance & Leave</a>
        <a class="sidebar-link"        href="#"                                ><i class="fas fa-money-check-alt"style="width:16px;font-size:.8rem"></i>Payroll & TDS</a>

        <div class="sidebar-section">Governance</div>
        <a class="sidebar-link"        onclick="showModule('gov')"     href="#"><i class="fas fa-gavel"          style="width:16px;font-size:.8rem"></i>Governance</a>
        <a class="sidebar-link"        href="#"                                ><i class="fas fa-scroll"         style="width:16px;font-size:.8rem"></i>Board Meetings</a>
        <a class="sidebar-link"        href="#"                                ><i class="fas fa-vote-yea"        style="width:16px;font-size:.8rem"></i>Resolutions</a>

        <div class="sidebar-section">Platform</div>
        <a class="sidebar-link"        href="#"                                ><i class="fas fa-utensils"       style="width:16px;font-size:.8rem"></i>HORECA Catalogue</a>
        <a class="sidebar-link"        href="#"                                ><i class="fas fa-file-contract"  style="width:16px;font-size:.8rem"></i>Contracts</a>
        <a class="sidebar-link"        onclick="showModule('bi')"      href="#"><i class="fas fa-chart-pie"      style="width:16px;font-size:.8rem"></i>BI & Reports</a>
        <a class="sidebar-link"        href="#"                                ><i class="fas fa-plug"           style="width:16px;font-size:.8rem"></i>Integrations</a>
        <a class="sidebar-link"        href="#"                                ><i class="fas fa-lock"           style="width:16px;font-size:.8rem"></i>Security & Audit</a>
        <a class="sidebar-link"        href="#"                                ><i class="fas fa-cog"            style="width:16px;font-size:.8rem"></i>System Config</a>
      </nav>

      <div style="padding:1rem;border-top:1px solid rgba(255,255,255,.07)">
        <a href="/admin" class="sidebar-link" style="font-size:.72rem"><i class="fas fa-sign-out-alt" style="width:16px"></i>Sign Out</a>
      </div>
    </aside>

    <!-- MAIN AREA -->
    <div style="flex:1;display:flex;flex-direction:column;min-width:0">

      <!-- Top Bar -->
      <header style="background:#111;border-bottom:1px solid rgba(255,255,255,.07);padding:.875rem 1.75rem;display:flex;align-items:center;justify-content:space-between;flex-shrink:0">
        <div style="display:flex;align-items:center;gap:1.5rem">
          <h1 id="moduleTitle" style="font-size:.95rem;font-weight:600;color:#fff">Admin Dashboard</h1>
          <span id="moduleDesc" style="font-size:.72rem;color:rgba(255,255,255,.3)">India Gully Enterprise Platform v2024.12</span>
        </div>
        <div style="display:flex;align-items:center;gap:1rem">
          <button style="background:none;border:1px solid rgba(255,255,255,.1);color:rgba(255,255,255,.5);padding:.4rem .875rem;font-size:.72rem;cursor:pointer;font-family:inherit" onmouseover="this.style.borderColor='var(--gold)';this.style.color='var(--gold)'" onmouseout="this.style.borderColor='rgba(255,255,255,.1)';this.style.color='rgba(255,255,255,.5)'">
            <i class="fas fa-bell" style="margin-right:.375rem"></i>Alerts (3)
          </button>
          <div style="width:32px;height:32px;background:var(--gold);display:flex;align-items:center;justify-content:center">
            <span style="font-size:.7rem;font-weight:700;color:#fff">SA</span>
          </div>
        </div>
      </header>

      <!-- MODULE CONTENT -->
      <div style="flex:1;overflow:auto;padding:2rem">

        <!-- ── DEFAULT / OVERVIEW ── -->
        <div id="mod-default">

          <!-- KPI Row -->
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:1rem;margin-bottom:2rem">
            ${[
              { icon:'fa-chart-line',         val:'₹42.3 Cr',  lab:'Revenue YTD',         trend:'+18% YOY',  color:'rgba(184,150,12,.15)' },
              { icon:'fa-file-invoice-dollar', val:'₹12.8 Cr',  lab:'Outstanding AR',      trend:'6 invoices', color:'rgba(239,68,68,.12)' },
              { icon:'fa-users',               val:'18',         lab:'Active Employees',    trend:'3 joining',  color:'rgba(59,130,246,.1)' },
              { icon:'fa-folder-open',         val:'6',          lab:'Active Mandates',     trend:'₹8,815 Cr',  color:'rgba(22,163,74,.1)' },
            ].map(s => `
            <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);padding:1.5rem">
              <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:1rem">
                <div style="width:38px;height:38px;background:${s.color};border:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:center">
                  <i class="fas ${s.icon}" style="color:var(--gold);font-size:.8rem"></i>
                </div>
                <span style="font-size:.68rem;color:rgba(255,255,255,.3);font-weight:500">${s.trend}</span>
              </div>
              <div class="f-serif" style="font-size:1.75rem;color:#fff;font-weight:400">${s.val}</div>
              <div style="font-size:.72rem;color:rgba(255,255,255,.35);margin-top:.25rem;letter-spacing:.06em">${s.lab}</div>
            </div>
            `).join('')}
          </div>

          <!-- Finance + HR Row -->
          <div style="display:grid;grid-template-columns:1.5fr 1fr;gap:1.5rem;margin-bottom:2rem" class="admin-2col">

            <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07)">
              <div style="padding:1.25rem 1.5rem;border-bottom:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:space-between">
                <h2 style="font-size:.875rem;font-weight:600;color:#fff">Finance Overview</h2>
                <span class="badge badge-green">Live</span>
              </div>
              <div style="padding:1.5rem;display:grid;grid-template-columns:1fr 1fr;gap:1rem">
                ${[
                  { lab:'Revenue MTD',     val:'₹4.2 Cr' },
                  { lab:'Receivables',      val:'₹12.8 Cr' },
                  { lab:'GST Liability',    val:'₹1.1 Cr' },
                  { lab:'Bank Balance',     val:'₹8.4 Cr' },
                ].map(f => `
                <div style="padding:1rem;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.05)">
                  <div style="font-size:.68rem;color:rgba(255,255,255,.28);text-transform:uppercase;letter-spacing:.1em;margin-bottom:.375rem">${f.lab}</div>
                  <div class="f-serif" style="font-size:1.25rem;color:var(--gold);font-weight:400">${f.val}</div>
                </div>
                `).join('')}
              </div>
            </div>

            <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07)">
              <div style="padding:1.25rem 1.5rem;border-bottom:1px solid rgba(255,255,255,.07)">
                <h2 style="font-size:.875rem;font-weight:600;color:#fff">HR Overview</h2>
              </div>
              <div style="padding:1.5rem;display:flex;flex-direction:column;gap:.875rem">
                ${[
                  { lab:'Headcount',        val:'18' },
                  { lab:'Attendance Today', val:'16/18' },
                  { lab:'Leave Requests',   val:'2 Pending' },
                  { lab:'Next Payroll',     val:'Jan 1, 2025' },
                ].map(h => `
                <div style="display:flex;justify-content:space-between;align-items:center;padding-bottom:.875rem;border-bottom:1px solid rgba(255,255,255,.05)">
                  <span style="font-size:.8rem;color:rgba(255,255,255,.4)">${h.lab}</span>
                  <span style="font-size:.85rem;font-weight:600;color:#fff">${h.val}</span>
                </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- CMS Quick Edit -->
          <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);margin-bottom:1.5rem">
            <div style="padding:1.25rem 1.5rem;border-bottom:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:space-between">
              <h2 style="font-size:.875rem;font-weight:600;color:#fff">CMS Quick Edit</h2>
              <span style="font-size:.72rem;color:rgba(255,255,255,.3)">Zero-code content management</span>
            </div>
            <div style="padding:1.5rem;display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:.875rem">
              ${[
                { page:'Homepage Hero', status:'Published', lastEdit:'Dec 20, 2024' },
                { page:'About Page', status:'Published', lastEdit:'Dec 18, 2024' },
                { page:'Active Mandates', status:'Published', lastEdit:'Dec 15, 2024' },
                { page:'Services Pages', status:'Published', lastEdit:'Dec 12, 2024' },
                { page:'HORECA Catalogue', status:'Published', lastEdit:'Dec 10, 2024' },
                { page:'Insights / Blog', status:'Published', lastEdit:'Dec 8, 2024' },
              ].map(p => `
              <div style="padding:1rem;border:1px solid rgba(255,255,255,.07);display:flex;align-items:center;justify-content:space-between">
                <div>
                  <div style="font-size:.82rem;color:#fff;font-weight:500">${p.page}</div>
                  <div style="font-size:.68rem;color:rgba(255,255,255,.25);margin-top:.2rem">${p.lastEdit}</div>
                </div>
                <button style="font-size:.68rem;font-weight:600;letter-spacing:.08em;color:var(--gold);background:none;border:1px solid rgba(184,150,12,.3);padding:.3rem .75rem;cursor:pointer;text-transform:uppercase;font-family:inherit" onmouseover="this.style.background='var(--gold)';this.style.color='#fff'" onmouseout="this.style.background='none';this.style.color='var(--gold)'">Edit</button>
              </div>
              `).join('')}
            </div>
          </div>

          <!-- Audit Log -->
          <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07)">
            <div style="padding:1.25rem 1.5rem;border-bottom:1px solid rgba(255,255,255,.07)">
              <h2 style="font-size:.875rem;font-weight:600;color:#fff">Audit Log — Recent Activity</h2>
            </div>
            <div style="overflow-x:auto">
              <table class="ig-table">
                <thead><tr><th>Timestamp</th><th>User</th><th>Module</th><th>Action</th><th>IP</th></tr></thead>
                <tbody>
                  ${[
                    ['2024-12-20 14:32:11','akm@indiagully.com','Mandate CMS','Updated mandate status: Entertainment Maharashtra → Phase 2','103.x.x.x'],
                    ['2024-12-20 11:18:44','admin','Finance ERP','Invoice IG-2024-0041 created for Demo Client','182.x.x.x'],
                    ['2024-12-19 16:05:22','pavan@indiagully.com','HR ERP','Approved leave request — Emp ID: IG-EMP-0012','103.x.x.x'],
                    ['2024-12-19 09:45:03','admin','System Config','RBAC policy updated — Board Portal access rules modified','182.x.x.x'],
                    ['2024-12-18 18:22:51','amit.jhingan@indiagully.com','Mandate CMS','New mandate enquiry received — Heritage Portfolio Rajasthan','59.x.x.x'],
                  ].map(([ts, user, mod, action, ip]) => `
                  <tr>
                    <td class="caption" style="font-family:monospace">${ts}</td>
                    <td style="font-size:.8rem;color:var(--gold)">${user}</td>
                    <td><span class="badge badge-dark">${mod}</span></td>
                    <td style="font-size:.8rem;color:rgba(255,255,255,.7)">${action}</td>
                    <td class="caption" style="font-family:monospace">${ip}</td>
                  </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>

  <script>
  function showModule(mod) {
    // In a real implementation, this would show different module panels
    var titles = {
      cms: 'CMS & Content Management',
      users: 'User Management & RBAC',
      workflow: 'Workflows & Approvals',
      finance: 'Finance ERP',
      hr: 'HR ERP',
      gov: 'Governance & Compliance',
      bi: 'BI & Reporting',
    };
    if(titles[mod]) {
      document.getElementById('moduleTitle').textContent = titles[mod];
    }
    // Mark active
    document.querySelectorAll('.sidebar-link').forEach(function(l){ l.classList.remove('active'); });
    event.currentTarget.classList.add('active');
    event.preventDefault();
  }
  </script>

  <style>
  @media(max-width:900px){ .admin-2col{grid-template-columns:1fr!important} }
  </style>
  `
  return c.html(layout('Admin Dashboard', content, { noNav: true, noFooter: true }))
})

export default app
