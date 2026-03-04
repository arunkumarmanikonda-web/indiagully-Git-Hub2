import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

// ── SHARED SALES SHELL ────────────────────────────────────────────────────────
function salesShell(pageTitle: string, active: string, body: string) {
  const nav = [
    { id:'dashboard',  icon:'tachometer-alt', label:'Dashboard',     badge:'' },
    { id:'leads',      icon:'funnel-dollar',  label:'Leads & CRM',   badge:'5' },
    { id:'pipeline',   icon:'stream',         label:'Pipeline',      badge:'' },
    { id:'quotes',     icon:'file-invoice',   label:'Quotes & Est.', badge:'2' },
    { id:'engagements',icon:'handshake',      label:'Engagements',   badge:'' },
    { id:'tasks',      icon:'tasks',          label:'Tasks',         badge:'3' },
    { id:'analytics',  icon:'chart-line',     label:'Analytics',     badge:'' },
    { id:'commission', icon:'percentage',      label:'Commission',    badge:'' },
  ]
  return `
<div style="display:flex;height:100vh;overflow:hidden;background:#f7f7f7;">
  <aside style="width:220px;flex-shrink:0;background:#0f172a;display:flex;flex-direction:column;overflow-y:auto;">
    <a href="/admin/sales/dashboard" style="padding:1rem 1.25rem;border-bottom:1px solid rgba(255,255,255,.07);display:block;flex-shrink:0;">
      <!-- LOGO: official white-text lockup — read-only, no crop, no AI, lossless -->
      <img src="/assets/logo-white.png"
           alt="India Gully"
           height="28"
           style="height:28px;width:auto;max-width:180px;object-fit:contain;object-position:left center;display:block;"
           draggable="false"
           decoding="async">
      <div style="font-size:.5rem;letter-spacing:.2em;text-transform:uppercase;color:#38bdf8;margin-top:4px;">Sales Force Engine</div>
    </a>
    <nav style="flex:1;padding:.5rem;">
      <div style="font-size:.55rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.6);padding:.5rem .75rem .25rem;">Sales</div>
      ${nav.map(i=>`<a href="/admin/sales/${i.id==='dashboard'?'dashboard':i.id}" style="display:flex;align-items:center;gap:.625rem;padding:.55rem .75rem;font-size:.78rem;color:${active===i.id?'#38bdf8':'rgba(255,255,255,.6)'};background:${active===i.id?'rgba(56,189,248,.1)':'none'};border-left:${active===i.id?'2px solid #38bdf8':'2px solid transparent'};text-decoration:none;margin-bottom:.1rem;">
        <i class="fas fa-${i.icon}" style="width:14px;font-size:.68rem;text-align:center;"></i>${i.label}
        ${i.badge?`<span style="margin-left:auto;background:#dc2626;color:#fff;font-size:.55rem;font-weight:700;padding:1px 5px;border-radius:8px;">${i.badge}</span>`:''}
      </a>`).join('')}
      <div style="font-size:.55rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:rgba(255,255,255,.6);padding:.75rem .75rem .25rem;">Back</div>
      <a href="/admin/dashboard" style="display:flex;align-items:center;gap:.625rem;padding:.55rem .75rem;font-size:.78rem;color:rgba(255,255,255,.4);text-decoration:none;">
        <i class="fas fa-arrow-left" style="width:14px;font-size:.68rem;text-align:center;"></i>Admin Console
      </a>
    </nav>
  </aside>
  <main style="flex:1;overflow-y:auto;display:flex;flex-direction:column;">
    <div style="background:#fff;border-bottom:1px solid var(--border);padding:.875rem 1.75rem;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
      <div>
        <div style="font-size:.62rem;color:var(--ink-muted);letter-spacing:.08em;text-transform:uppercase;margin-bottom:.15rem;">
          <a href="/admin/dashboard" style="color:var(--ink-muted);text-decoration:none;">Admin</a>
          <i class="fas fa-chevron-right" style="font-size:.5rem;margin:0 .35rem;"></i>
          <a href="/admin/sales/dashboard" style="color:var(--ink-muted);text-decoration:none;">Sales Force</a>
          <i class="fas fa-chevron-right" style="font-size:.5rem;margin:0 .35rem;"></i>
          <span style="color:var(--ink);">${pageTitle}</span>
        </div>
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--ink);">${pageTitle}</h2>
      </div>
      <div style="display:flex;align-items:center;gap:.75rem;">
        <button onclick="igToast('Sales report generated','success')" style="background:#0f172a;color:#fff;border:none;padding:.45rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;"><i class="fas fa-download" style="margin-right:.35rem;"></i>Export</button>
        <div style="width:32px;height:32px;background:#0f172a;display:flex;align-items:center;justify-content:center;">
          <i class="fas fa-chart-line" style="color:#38bdf8;font-size:.72rem;"></i>
        </div>
      </div>
    </div>
    <div style="flex:1;padding:1.75rem;overflow-y:auto;">${body}</div>
  </main>
</div>`
}

// ── SALES DASHBOARD ───────────────────────────────────────────────────────────
app.get('/dashboard', (c) => {
  const body = `
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">
    ${[
      {label:'Total Leads',        value:'18',        sub:'5 new this week',    icon:'funnel-dollar',  c:'#2563eb'},
      {label:'Pipeline Value',     value:'₹52.4 Cr',  sub:'Across 8 deals',     icon:'stream',         c:'#B8960C'},
      {label:'Quotes Sent',        value:'6',         sub:'2 awaiting response', icon:'file-invoice',   c:'#7c3aed'},
      {label:'Won This Quarter',   value:'₹8.7 Cr',   sub:'3 engagements',      icon:'trophy',         c:'#16a34a'},
    ].map(s=>`<div style="background:#fff;border:1px solid var(--border);padding:1.1rem;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.75rem;">
        <div style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);">${s.label}</div>
        <div style="width:28px;height:28px;background:${s.c};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <i class="fas fa-${s.icon}" style="color:#fff;font-size:.6rem;"></i>
        </div>
      </div>
      <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:var(--ink);line-height:1;margin-bottom:.25rem;">${s.value}</div>
      <div style="font-size:.68rem;color:${s.c};">${s.sub}</div>
    </div>`).join('')}
  </div>

  <div style="display:grid;grid-template-columns:2fr 1fr;gap:1.25rem;margin-bottom:1.5rem;">
    <!-- Pipeline Kanban -->
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Active Pipeline</h3>
        <a href="/admin/sales/pipeline" style="font-size:.72rem;color:var(--gold);">Full View →</a>
      </div>
      <div style="overflow-x:auto;padding:.875rem;">
        <div style="display:grid;grid-template-columns:repeat(5,160px);gap:.75rem;min-width:860px;">
          ${['Enquiry','Qualifying','Proposal','Negotiation','Close'].map((stage,si)=>{
            const deals = [
              [{name:'Boutique Hotel Brand',val:'₹4.5 Cr',co:'Heritage Hotels',age:'2d'},{name:'Retail Expansion',val:'₹1.2 Cr',co:'Desi Brands Ltd',age:'5d'}],
              [{name:'Entertainment City PMC',val:'₹18 Cr',co:'NCR Ventures',age:'8d'}],
              [{name:'HORECA Supply — 200 rooms',val:'₹85 L',co:'Rajasthan Resorts',age:'12d'},{name:'Advisory Retainer',val:'₹60 L',co:'Mumbai RE Fund',age:'3d'}],
              [{name:'Luxury Resort Feasibility',val:'₹2.1 Cr',co:'Goa Hospitality',age:'18d'}],
              [{name:'Mandate — Leasing',val:'₹3.8 Cr',co:'Mumbai Mall Corp',age:'21d'}],
            ][si]||[]
            return `<div>
              <div style="font-size:.65rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--ink-muted);margin-bottom:.5rem;border-bottom:2px solid ${['#2563eb','#d97706','#7c3aed','#dc2626','#16a34a'][si]};padding-bottom:.35rem;">${stage}</div>
              ${deals.map(d=>`<div style="background:#f8fafc;border:1px solid var(--border);border-left:3px solid ${['#2563eb','#d97706','#7c3aed','#dc2626','#16a34a'][si]};padding:.625rem;margin-bottom:.5rem;cursor:pointer;" onclick="igToast('${d.name} — opening deal','success')">
                <div style="font-size:.75rem;font-weight:600;color:var(--ink);margin-bottom:.2rem;">${d.name}</div>
                <div style="font-size:.68rem;color:var(--ink-muted);">${d.co}</div>
                <div style="display:flex;justify-content:space-between;margin-top:.4rem;">
                  <span style="font-size:.72rem;font-weight:700;color:var(--gold);">${d.val}</span>
                  <span style="font-size:.6rem;color:var(--ink-muted);">${d.age} ago</span>
                </div>
              </div>`).join('')}
            </div>`}).join('')}
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Recent Activity</h3>
      </div>
      <div style="padding:.5rem 0;">
        ${[
          {icon:'envelope',     color:'#2563eb', msg:'Enquiry received: HORECA Supply',           time:'10 min ago'},
          {icon:'file-invoice', color:'#7c3aed', msg:'Quote QT-2025-006 sent to Rajasthan Resorts',time:'1h ago'},
          {icon:'check-circle', color:'#16a34a', msg:'Engagement confirmed: Advisory Retainer',   time:'3h ago'},
          {icon:'phone',        color:'#d97706', msg:'Call scheduled: NCR Ventures — 15 Mar',     time:'5h ago'},
          {icon:'handshake',    color:'#16a34a', msg:'NDA signed: Goa Hospitality',               time:'1d ago'},
          {icon:'clock',        color:'#dc2626', msg:'Follow-up overdue: Mumbai RE Fund',         time:'2d ago'},
        ].map(a=>`<div style="display:flex;gap:.625rem;padding:.625rem 1.25rem;border-bottom:1px solid var(--border);">
          <div style="width:24px;height:24px;background:${a.color};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <i class="fas fa-${a.icon}" style="color:#fff;font-size:.55rem;"></i>
          </div>
          <div>
            <div style="font-size:.75rem;color:var(--ink);line-height:1.3;">${a.msg}</div>
            <div style="font-size:.62rem;color:var(--ink-muted);margin-top:.15rem;">${a.time}</div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </div>

  <!-- Conversion Funnel -->
  <div style="background:#fff;border:1px solid var(--border);">
    <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);">
      <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Conversion Funnel — FY 2025</h3>
    </div>
    <div style="padding:1.25rem;display:grid;grid-template-columns:repeat(5,1fr);gap:1rem;">
      ${[
        {stage:'Enquiry',    count:42, pct:100, c:'#2563eb'},
        {stage:'Qualified',  count:28, pct:67,  c:'#d97706'},
        {stage:'Proposal',   count:18, pct:43,  c:'#7c3aed'},
        {stage:'Negotiation',count:9,  pct:21,  c:'#dc2626'},
        {stage:'Won',        count:6,  pct:14,  c:'#16a34a'},
      ].map(f=>`<div style="text-align:center;">
        <div style="height:${Math.max(30,f.pct*1.4)}px;background:${f.c};margin-bottom:.5rem;display:flex;align-items:center;justify-content:center;">
          <span style="font-size:.75rem;font-weight:700;color:#fff;">${f.count}</span>
        </div>
        <div style="font-size:.68rem;font-weight:600;color:var(--ink);">${f.stage}</div>
        <div style="font-size:.62rem;color:var(--ink-muted);">${f.pct}%</div>
      </div>`).join('')}
    </div>
  </div>
<script>
/* ── Sales Dashboard: load live data from API ── */
(function(){
  if(typeof igApi==='undefined') return;
  igApi.get('/sales/commission/summary').then(function(d){
    if(!d) return;
    var el=document.getElementById('sales-commission-total');
    if(el) el.textContent='₹'+(d.total_payable/100000).toFixed(1)+'L';
    var el2=document.getElementById('sales-commission-period');
    if(el2) el2.textContent=d.period;
  });
  igApi.get('/mandates').then(function(d){
    if(!d) return;
    var el=document.getElementById('sales-pipeline-val');
    if(el) el.textContent=d.pipeline_value;
    var el2=document.getElementById('sales-active-mandates');
    if(el2) el2.textContent=d.active+' active mandates';
  });
})();
</script>`
  return c.html(layout('Sales Dashboard', salesShell('Sales Dashboard', 'dashboard', body), {noNav:true,noFooter:true}))
})

// ── LEADS & CRM ───────────────────────────────────────────────────────────────
app.get('/leads', (c) => {
  const leads = [
    {id:'LD-001',name:'Heritage Hotels Ltd',     contact:'Ravi Sharma',     email:'ravi@heritage.co',   phone:'+91 98100 XXXXX',vertical:'Hospitality', source:'Website',   status:'Qualified', value:'₹4.5 Cr',  assigned:'Amit Jhingan', date:'01 Mar 2026',score:82},
    {id:'LD-002',name:'NCR Entertainment Pvt',   contact:'Priya Mehta',     email:'priya@ncrvent.com',  phone:'+91 99990 XXXXX',vertical:'Entertainment',source:'Referral',  status:'Proposal',  value:'₹18 Cr',   assigned:'Arun Manikonda',date:'25 Feb 2026',score:91},
    {id:'LD-003',name:'Desi Brands Pvt Ltd',     contact:'Vivek Agarwal',   email:'vivek@desibrands.in',phone:'+91 97110 XXXXX',vertical:'Retail',      source:'LinkedIn',   status:'Enquiry',   value:'₹1.2 Cr',  assigned:'Pavan Manikonda',date:'22 Feb 2026',score:65},
    {id:'LD-004',name:'Rajasthan Resort Group',  contact:'Suresh Patel',    email:'suresh@rrg.com',     phone:'+91 94000 XXXXX',vertical:'HORECA',       source:'Website',   status:'Negotiation',value:'₹85 L',   assigned:'Amit Jhingan', date:'15 Feb 2026',score:78},
    {id:'LD-005',name:'Goa Hospitality Ventures',contact:'Alicia Fernandes',email:'alicia@goahv.com',   phone:'+91 93770 XXXXX',vertical:'Hospitality', source:'Event',     status:'Proposal',  value:'₹2.1 Cr',  assigned:'Arun Manikonda',date:'10 Feb 2026',score:74},
    {id:'LD-006',name:'Mumbai RE Fund',          contact:'Arjun Kapoor',    email:'arjun@mumbairef.com',phone:'+91 98201 XXXXX',vertical:'Real Estate',  source:'Cold Call', status:'Overdue',   value:'₹60 L',    assigned:'Pavan Manikonda',date:'01 Feb 2026',score:55},
    {id:'LD-007',name:'Tata Hotels Advisory',    contact:'Neha Singh',      email:'neha@tata.com',      phone:'+91 91230 XXXXX',vertical:'Hospitality', source:'Referral',  status:'New',       value:'₹6.2 Cr',  assigned:'Unassigned',  date:'05 Mar 2026',score:70},
    {id:'LD-008',name:'Delhi NCR Retail Park',   contact:'Mohit Batra',     email:'mohit@dncrrp.com',   phone:'+91 89000 XXXXX',vertical:'Real Estate',  source:'Website',   status:'New',       value:'₹9.5 Cr',  assigned:'Unassigned',  date:'04 Mar 2026',score:68},
  ]
  const statusColor: Record<string,string> = {New:'#2563eb',Enquiry:'#d97706',Qualified:'#7c3aed',Proposal:'#B8960C',Negotiation:'#dc2626',Overdue:'#dc2626',Won:'#16a34a',Lost:'#94a3b8'}
  const body = `
  <!-- Filters & Add Lead -->
  <div style="display:flex;gap:.75rem;align-items:center;margin-bottom:1.25rem;flex-wrap:wrap;">
    <div style="flex:1;min-width:200px;"><input type="text" class="ig-input" placeholder="🔍  Search leads, companies, contacts..." style="font-size:.82rem;" oninput="igFilterLeads(this.value)"></div>
    <select class="ig-input" id="lead-vert-filter" style="font-size:.78rem;width:auto;" onchange="igFilterLeads()">
      <option value="">All Verticals</option>
      <option>Real Estate</option><option>Retail</option><option>Hospitality</option><option>Entertainment</option><option>HORECA</option>
    </select>
    <select class="ig-input" id="lead-status-filter" style="font-size:.78rem;width:auto;" onchange="igFilterLeads()">
      <option value="">All Statuses</option>
      <option>New</option><option>Enquiry</option><option>Qualified</option><option>Proposal</option><option>Negotiation</option><option>Overdue</option>
    </select>
    <button onclick="togglePanel('new-lead-panel')" style="background:var(--gold);color:#fff;border:none;padding:.5rem 1.1rem;font-size:.78rem;font-weight:600;cursor:pointer;white-space:nowrap;"><i class="fas fa-plus" style="margin-right:.4rem;"></i>New Lead</button>
  </div>

  <!-- New Lead Panel -->
  <div id="new-lead-panel" class="ig-panel" style="margin-bottom:1.25rem;">
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.875rem;">
      <div><label class="ig-label">Company Name *</label><input type="text" id="nl-company" class="ig-input" style="font-size:.82rem;" placeholder="Company / Individual"></div>
      <div><label class="ig-label">Contact Person *</label><input type="text" id="nl-contact" class="ig-input" style="font-size:.82rem;" placeholder="Full name"></div>
      <div><label class="ig-label">Email *</label><input type="email" id="nl-email" class="ig-input" style="font-size:.82rem;" placeholder="contact@company.com"></div>
      <div><label class="ig-label">Phone</label><input type="text" id="nl-phone" class="ig-input" style="font-size:.82rem;" placeholder="+91 XXXXX XXXXX"></div>
      <div><label class="ig-label">Vertical</label><select id="nl-vert" class="ig-input" style="font-size:.82rem;"><option>Real Estate</option><option>Retail</option><option>Hospitality</option><option>Entertainment</option><option>HORECA</option><option>Debt & Special</option></select></div>
      <div><label class="ig-label">Source</label><select id="nl-src" class="ig-input" style="font-size:.82rem;"><option>Website</option><option>Referral</option><option>LinkedIn</option><option>Event</option><option>Cold Call</option><option>Other</option></select></div>
      <div><label class="ig-label">Estimated Value (₹)</label><input type="text" id="nl-val" class="ig-input" style="font-size:.82rem;" placeholder="e.g. 2,50,00,000"></div>
      <div><label class="ig-label">Assign To</label><select id="nl-assign" class="ig-input" style="font-size:.82rem;"><option>Arun Manikonda</option><option>Pavan Manikonda</option><option>Amit Jhingan</option><option>Unassigned</option></select></div>
      <div><label class="ig-label">Status</label><select id="nl-status" class="ig-input" style="font-size:.82rem;"><option>New</option><option>Enquiry</option><option>Qualified</option></select></div>
      <div style="grid-column:span 3;"><label class="ig-label">Notes</label><textarea id="nl-notes" class="ig-input" rows="2" style="font-size:.82rem;" placeholder="Key details about the lead, source context, initial discussions..."></textarea></div>
    </div>
    <div style="display:flex;gap:.75rem;margin-top:.875rem;">
      <button onclick="igAddLead()" style="background:var(--gold);color:#fff;border:none;padding:.5rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-plus" style="margin-right:.35rem;"></i>Add Lead</button>
      <button onclick="togglePanel('new-lead-panel')" style="background:none;border:1px solid var(--border);padding:.5rem 1.25rem;font-size:.78rem;cursor:pointer;color:var(--ink-muted);">Cancel</button>
    </div>
  </div>

  <!-- Lead Score Legend -->
  <div style="display:flex;gap:.75rem;align-items:center;margin-bottom:.875rem;font-size:.68rem;color:var(--ink-muted);">
    <span>Lead Score:</span>
    ${[{r:'80-100',c:'#16a34a',l:'Hot'},{r:'60-79',c:'#d97706',l:'Warm'},{r:'0-59',c:'#94a3b8',l:'Cold'}].map(s=>`<span style="display:flex;align-items:center;gap:.3rem;"><span style="width:8px;height:8px;background:${s.c};border-radius:50%;display:inline-block;"></span>${s.l} (${s.r})</span>`).join('')}
  </div>

  <!-- Leads Table -->
  <div style="background:#fff;border:1px solid var(--border);" id="leads-table-wrap">
    <table class="ig-tbl" id="leads-table">
      <thead><tr><th>ID</th><th>Company</th><th>Contact</th><th>Vertical</th><th>Source</th><th>Est. Value</th><th>Score</th><th>Assigned</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
      <tbody id="leads-tbody">
        ${leads.map(l=>`<tr data-company="${l.name.toLowerCase()}" data-vertical="${l.vertical.toLowerCase()}" data-status="${l.status.toLowerCase()}">
          <td style="font-size:.72rem;font-weight:700;color:var(--gold);">${l.id}</td>
          <td>
            <div style="font-size:.82rem;font-weight:600;color:var(--ink);">${l.name}</div>
            <div style="font-size:.68rem;color:var(--ink-muted);">${l.email}</div>
          </td>
          <td>
            <div style="font-size:.78rem;">${l.contact}</div>
            <div style="font-size:.65rem;color:var(--ink-muted);">${l.phone}</div>
          </td>
          <td><span class="badge b-dk" style="font-size:.6rem;">${l.vertical}</span></td>
          <td style="font-size:.75rem;">${l.source}</td>
          <td style="font-size:.82rem;font-weight:700;color:var(--gold);">${l.value}</td>
          <td>
            <div style="display:flex;align-items:center;gap:.35rem;">
              <div style="width:36px;height:6px;background:#e2e8f0;border-radius:3px;overflow:hidden;">
                <div style="height:100%;background:${l.score>=80?'#16a34a':l.score>=60?'#d97706':'#94a3b8'};width:${l.score}%;"></div>
              </div>
              <span style="font-size:.72rem;font-weight:700;color:${l.score>=80?'#16a34a':l.score>=60?'#d97706':'#94a3b8'};">${l.score}</span>
            </div>
          </td>
          <td style="font-size:.75rem;">${l.assigned}</td>
          <td><span class="badge" style="background:${statusColor[l.status]||'#64748b'}22;color:${statusColor[l.status]||'#64748b'};border:1px solid ${statusColor[l.status]||'#64748b'}44;font-size:.6rem;">${l.status}</span></td>
          <td style="font-size:.72rem;color:var(--ink-muted);">${l.date}</td>
          <td style="display:flex;gap:.3rem;flex-wrap:wrap;">
            <button onclick="igViewLead('${l.id}','${l.name}','${l.status}','${l.value}','${l.assigned}')" style="background:none;border:1px solid var(--border);padding:.22rem .5rem;font-size:.62rem;cursor:pointer;color:var(--gold);" title="View"><i class="fas fa-eye"></i></button>
            <button onclick="igMoveLead('${l.id}','${l.name}')" style="background:none;border:1px solid var(--border);padding:.22rem .5rem;font-size:.62rem;cursor:pointer;color:#7c3aed;" title="Move Stage"><i class="fas fa-arrow-right"></i></button>
            <button onclick="igToast('Quote created for ${l.name}','success')" style="background:var(--gold);color:#fff;border:none;padding:.22rem .5rem;font-size:.62rem;cursor:pointer;" title="Create Quote"><i class="fas fa-file-invoice"></i></button>
          </td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>

  <!-- Lead Detail Modal -->
  <div id="lead-detail-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:9999;align-items:center;justify-content:center;">
    <div style="background:#fff;width:620px;max-width:95vw;max-height:90vh;overflow-y:auto;border-top:4px solid var(--gold);">
      <div style="padding:1.25rem 1.5rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);" id="ldm-title">Lead Detail</div>
        <button onclick="document.getElementById('lead-detail-modal').style.display='none'" style="background:none;border:none;font-size:1.2rem;cursor:pointer;color:var(--ink-muted);">✕</button>
      </div>
      <div style="padding:1.5rem;" id="ldm-body"></div>
    </div>
  </div>

  <!-- Move Stage Modal -->
  <div id="lead-move-modal" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:9999;align-items:center;justify-content:center;">
    <div style="background:#fff;width:400px;max-width:95vw;border-top:4px solid #7c3aed;">
      <div style="padding:1.25rem 1.5rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
        <div style="font-weight:600;font-size:.9rem;color:var(--ink);" id="lmm-title">Move Lead Stage</div>
        <button onclick="document.getElementById('lead-move-modal').style.display='none'" style="background:none;border:none;font-size:1.2rem;cursor:pointer;color:var(--ink-muted);">✕</button>
      </div>
      <div style="padding:1.5rem;">
        <label class="ig-label">Move to Stage</label>
        <select id="lmm-stage" class="ig-input" style="font-size:.82rem;margin-bottom:1rem;">
          <option>Enquiry</option><option>Qualifying</option><option>Proposal</option><option>Negotiation</option><option>Won</option><option>Lost</option>
        </select>
        <label class="ig-label">Notes on Stage Change</label>
        <textarea class="ig-input" rows="3" style="font-size:.82rem;margin-bottom:1rem;" placeholder="Reason or next steps..."></textarea>
        <button onclick="igConfirmMove()" style="background:#7c3aed;color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;width:100%;">Move Stage</button>
      </div>
    </div>
  </div>

  <script>
  var igCurrentLead = '';
  /* HTML escape helper */
function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');}

window.igAddLead = function(){
    var co=document.getElementById('nl-company').value.trim();
    var ct=document.getElementById('nl-contact').value.trim();
    var em=document.getElementById('nl-email').value.trim();
    if(!co||!ct||!em){igToast('Company, contact, and email are required','warn');return;}
    var id='LD-0'+(Math.floor(Math.random()*900)+100);
    var vert=document.getElementById('nl-vert').value;
    var status=document.getElementById('nl-status').value;
    var val=document.getElementById('nl-val').value||'TBD';
    var assign=document.getElementById('nl-assign').value;
    var score=Math.floor(Math.random()*30+50);
    var tbody=document.getElementById('leads-tbody');
    var row=document.createElement('tr');
    row.innerHTML='<td style="font-size:.72rem;font-weight:700;color:var(--gold);">'+esc(id)+'</td><td><div style="font-size:.82rem;font-weight:600;">'+esc(co)+'</div><div style="font-size:.68rem;color:var(--ink-muted);">'+esc(em)+'</div></td><td><div style="font-size:.78rem;">'+esc(ct)+'</div></td><td><span class="badge b-dk" style="font-size:.6rem;">'+esc(vert)+'</span></td><td style="font-size:.75rem;">Manual</td><td style="font-size:.82rem;font-weight:700;color:var(--gold);">₹'+esc(val)+'</td><td style="font-size:.72rem;font-weight:700;color:#d97706;">'+esc(score)+'</td><td style="font-size:.75rem;">'+esc(assign)+'</td><td><span class="badge b-g">'+esc(status)+'</span></td><td style="font-size:.72rem;color:var(--ink-muted);">Today</td><td><button onclick="igToast(\'Lead opened\',\'success\')" style="background:none;border:1px solid var(--border);padding:.22rem .5rem;font-size:.62rem;cursor:pointer;color:var(--gold);"><i class="fas fa-eye"></i></button></td>';
    tbody.insertBefore(row, tbody.firstChild);
    igToast('Lead '+id+' created for '+co,'success');
    togglePanel('new-lead-panel');
    ['nl-company','nl-contact','nl-email','nl-phone','nl-val','nl-notes'].forEach(function(id){document.getElementById(id).value='';});
  };
  window.igViewLead = function(id,name,status,value,assigned){
    document.getElementById('ldm-title').textContent='Lead: '+name+' ('+id+')';
    document.getElementById('ldm-body').innerHTML='<div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;">'
      +'<div style="background:#f8fafc;padding:.875rem;border:1px solid var(--border);"><div style="font-size:.62rem;text-transform:uppercase;letter-spacing:.08em;color:var(--ink-muted);margin-bottom:.25rem;">Status</div><span class="badge b-g">'+status+'</span></div>'
      +'<div style="background:#f8fafc;padding:.875rem;border:1px solid var(--border);"><div style="font-size:.62rem;text-transform:uppercase;letter-spacing:.08em;color:var(--ink-muted);margin-bottom:.25rem;">Est. Value</div><div style="font-family:\'DM Serif Display\',serif;font-size:1.25rem;color:var(--gold);">'+value+'</div></div>'
      +'<div style="background:#f8fafc;padding:.875rem;border:1px solid var(--border);"><div style="font-size:.62rem;text-transform:uppercase;letter-spacing:.08em;color:var(--ink-muted);margin-bottom:.25rem;">Assigned To</div><div style="font-size:.82rem;font-weight:600;">'+assigned+'</div></div>'
      +'<div style="background:#f8fafc;padding:.875rem;border:1px solid var(--border);"><div style="font-size:.62rem;text-transform:uppercase;letter-spacing:.08em;color:var(--ink-muted);margin-bottom:.25rem;">Next Step</div><div style="font-size:.82rem;">Schedule discovery call</div></div>'
      +'</div>'
      +'<div style="margin-bottom:1rem;"><label class="ig-label">Add Activity Note</label><textarea class="ig-input" rows="3" style="font-size:.82rem;" placeholder="Log a call, meeting, email or note..."></textarea></div>'
      +'<div style="display:flex;gap:.75rem;">'
      +'<button onclick="igToast(\'Quote created for '+name+'\',\'success\');document.getElementById(\'lead-detail-modal\').style.display=\'none\'" style="background:var(--gold);color:#fff;border:none;padding:.5rem 1.1rem;font-size:.75rem;font-weight:600;cursor:pointer;"><i class=\'fas fa-file-invoice\' style=\'margin-right:.35rem;\'></i>Create Quote</button>'
      +'<button onclick="igToast(\'Note saved\',\'success\')" style="background:#2563eb;color:#fff;border:none;padding:.5rem 1.1rem;font-size:.75rem;font-weight:600;cursor:pointer;"><i class=\'fas fa-save\' style=\'margin-right:.35rem;\'></i>Save Note</button>'
      +'<button onclick="document.getElementById(\'lead-detail-modal\').style.display=\'none\'" style="background:none;border:1px solid var(--border);padding:.5rem 1.1rem;font-size:.75rem;cursor:pointer;color:var(--ink-muted);">Close</button>'
      +'</div>';
    var m=document.getElementById('lead-detail-modal'); m.style.display='flex'; m.style.alignItems='center'; m.style.justifyContent='center';
  };
  window.igMoveLead = function(id,name){
    igCurrentLead = name;
    document.getElementById('lmm-title').textContent='Move: '+name;
    var m=document.getElementById('lead-move-modal'); m.style.display='flex'; m.style.alignItems='center'; m.style.justifyContent='center';
  };
  window.igConfirmMove = function(){
    var stage=document.getElementById('lmm-stage').value;
    document.getElementById('lead-move-modal').style.display='none';
    igToast(igCurrentLead+' moved to '+stage,'success');
  };
  window.igFilterLeads = function(query){
    var q=(query||document.querySelector('#leads-table-wrap input')?.value||'').toLowerCase();
    var vert=(document.getElementById('lead-vert-filter')?.value||'').toLowerCase();
    var stat=(document.getElementById('lead-status-filter')?.value||'').toLowerCase();
    var rows=document.querySelectorAll('#leads-tbody tr');
    rows.forEach(function(row){
      var co=row.getAttribute('data-company')||'';
      var ve=row.getAttribute('data-vertical')||'';
      var st=row.getAttribute('data-status')||'';
      var show=(!q||co.includes(q))&&(!vert||ve.includes(vert))&&(!stat||st.includes(stat));
      row.style.display=show?'':'none';
    });
  };
  </script>`
  return c.html(layout('Leads & CRM', salesShell('Leads & CRM', 'leads', body), {noNav:true,noFooter:true}))
})

// ── QUOTE BUILDER ─────────────────────────────────────────────────────────────
app.get('/quotes', (c) => {
  const quotes = [
    {id:'QT-2026-001',client:'Heritage Hotels Ltd',    vertical:'Hospitality', title:'Pre-Opening PMC Services',    base:3800000,gst:684000,total:4484000,valid:'31 Mar 2026',status:'Accepted', version:'v2'},
    {id:'QT-2026-002',client:'NCR Entertainment Pvt', vertical:'Entertainment',title:'Feasibility Study & Advisory',  base:1500000,gst:270000,total:1770000,valid:'15 Mar 2026',status:'Pending',  version:'v1'},
    {id:'QT-2026-003',client:'Rajasthan Resort Group',vertical:'HORECA',       title:'HORECA Supply — 200 Rooms',     base:7200000,gst:1296000,total:8496000,valid:'20 Mar 2026',status:'Draft',    version:'v1'},
    {id:'QT-2026-004',client:'Goa Hospitality Ventures',vertical:'Hospitality',title:'Luxury Resort Feasibility',     base:1800000,gst:324000,total:2124000,valid:'30 Mar 2026',status:'Pending',  version:'v2'},
    {id:'QT-2025-005',client:'Mumbai RE Fund',         vertical:'Real Estate',  title:'Advisory Retainer FY 2025-26', base:500000, gst:90000, total:590000, valid:'01 Apr 2025',status:'Draft',    version:'v1'},
    {id:'QT-2025-006',client:'Desi Brands Pvt Ltd',    vertical:'Retail',       title:'15-City Retail Expansion PMC', base:1000000,gst:180000,total:1180000,valid:'10 Apr 2025',status:'Sent',     version:'v1'},
  ]
  const statusColor: Record<string,string> = {Accepted:'#16a34a',Pending:'#d97706',Draft:'#64748b',Sent:'#2563eb',Rejected:'#dc2626',Expired:'#94a3b8'}
  const body = `
  <!-- Summary Cards -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">
    ${[
      {label:'Total Quotes',  value:'6',        c:'#2563eb'},
      {label:'Total Value',   value:'₹17.7 Cr', c:'#B8960C'},
      {label:'Acceptance Rate',value:'17%',     c:'#16a34a'},
      {label:'Avg Quote Size', value:'₹2.9 Cr', c:'#7c3aed'},
    ].map(s=>`<div style="background:#fff;border:1px solid var(--border);padding:1rem;"><div style="font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.4rem;">${s.label}</div><div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:${s.c};line-height:1;">${s.value}</div></div>`).join('')}
  </div>

  <!-- Tab Bar -->
  <div style="display:flex;gap:0;margin-bottom:1.25rem;border-bottom:2px solid var(--border);">
    ${['Quote Register','New Quote','Quote Templates'].map((t,i)=>`<button onclick="igQtTab(${i})" id="qt-tab-${i}" style="padding:.6rem 1.1rem;font-size:.78rem;font-weight:600;cursor:pointer;border:none;background:none;color:${i===0?'var(--gold)':'var(--ink-muted)'};border-bottom:${i===0?'2px solid var(--gold)':'2px solid transparent'};letter-spacing:.04em;text-transform:uppercase;margin-bottom:-2px;">${t}</button>`).join('')}
  </div>

  <!-- Tab 0: Quote Register -->
  <div id="qt-pane-0">
    <div style="background:#fff;border:1px solid var(--border);">
      <table class="ig-tbl">
        <thead><tr><th>ID</th><th>Client</th><th>Vertical</th><th>Description</th><th>Base (₹)</th><th>GST (18%)</th><th>Total</th><th>Valid Until</th><th>Ver.</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          ${quotes.map(q=>`<tr>
            <td style="font-size:.72rem;font-weight:700;color:var(--gold);">${q.id}</td>
            <td style="font-size:.82rem;font-weight:500;">${q.client}</td>
            <td><span class="badge b-dk" style="font-size:.58rem;">${q.vertical}</span></td>
            <td style="font-size:.78rem;">${q.title}</td>
            <td style="font-size:.78rem;">₹${(q.base/100000).toFixed(1)}L</td>
            <td style="font-size:.75rem;color:var(--ink-muted);">₹${(q.gst/100000).toFixed(1)}L</td>
            <td style="font-size:.82rem;font-weight:700;color:var(--gold);">₹${(q.total/100000).toFixed(1)}L</td>
            <td style="font-size:.72rem;color:${new Date(q.valid.split(' ').reverse().join('-'))<new Date()?'#dc2626':'var(--ink-muted)'};">${q.valid}</td>
            <td><span class="badge b-dk" style="font-size:.58rem;">${q.version}</span></td>
            <td><span class="badge" style="background:${statusColor[q.status]}22;color:${statusColor[q.status]};border:1px solid ${statusColor[q.status]}44;font-size:.6rem;">${q.status}</span></td>
            <td style="display:flex;gap:.3rem;flex-wrap:wrap;">
              <button onclick="igToast('${q.id} PDF downloaded','success')" style="background:none;border:1px solid var(--border);padding:.22rem .5rem;font-size:.62rem;cursor:pointer;color:var(--ink-muted);" title="Download PDF"><i class="fas fa-download"></i></button>
              <button onclick="igToast('New version v${parseInt(q.version.replace('v',''))+1} created for ${q.id}','success')" style="background:none;border:1px solid var(--border);padding:.22rem .5rem;font-size:.62rem;cursor:pointer;color:#7c3aed;" title="New Version"><i class="fas fa-code-branch"></i></button>
              ${q.status==='Draft'||q.status==='Pending'?`<button onclick="igToast('${q.id} sent to ${q.client}','success')" style="background:#2563eb;color:#fff;border:none;padding:.22rem .5rem;font-size:.62rem;cursor:pointer;" title="Send"><i class="fas fa-paper-plane"></i></button>`:''}
              ${q.status==='Accepted'?`<button onclick="igToast('Converting ${q.id} to engagement','success')" style="background:#16a34a;color:#fff;border:none;padding:.22rem .5rem;font-size:.62rem;cursor:pointer;" title="Convert to Engagement"><i class="fas fa-arrow-right"></i></button>`:''}
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>
  </div>

  <!-- Tab 1: New Quote Builder -->
  <div id="qt-pane-1" style="display:none;">
    <div style="display:grid;grid-template-columns:3fr 2fr;gap:1.25rem;">
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Quote Builder</h3></div>
        <div style="padding:1.25rem;">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.875rem;margin-bottom:1rem;">
            <div><label class="ig-label">Client / Lead *</label><select id="qt-client" class="ig-input" style="font-size:.82rem;"><option>Heritage Hotels Ltd</option><option>NCR Entertainment Pvt</option><option>Desi Brands Pvt Ltd</option><option>Rajasthan Resort Group</option><option>Goa Hospitality Ventures</option><option>New Client...</option></select></div>
            <div><label class="ig-label">Vertical</label><select id="qt-vert" class="ig-input" style="font-size:.82rem;"><option>Real Estate</option><option>Retail</option><option>Hospitality</option><option>Entertainment</option><option>HORECA</option><option>Debt & Special</option></select></div>
            <div style="grid-column:span 2;"><label class="ig-label">Quote Title *</label><input type="text" id="qt-title" class="ig-input" placeholder="e.g. Advisory Services for Hotel Pre-Opening" style="font-size:.82rem;"></div>
            <div><label class="ig-label">Valid Until</label><input type="date" id="qt-valid" class="ig-input" style="font-size:.82rem;"></div>
            <div><label class="ig-label">Payment Terms</label><select id="qt-terms" class="ig-input" style="font-size:.82rem;"><option>50% advance, 50% on delivery</option><option>Monthly retainer</option><option>Milestone-based</option><option>100% advance</option><option>Net 30</option></select></div>
            <div style="grid-column:span 2;"><label class="ig-label">Scope Summary</label><textarea id="qt-scope" class="ig-input" rows="3" style="font-size:.82rem;" placeholder="Brief description of services included in this quote..."></textarea></div>
          </div>
          <!-- Line Items -->
          <h5 style="font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--ink-muted);margin-bottom:.625rem;">Line Items</h5>
          <div id="qt-line-items">
            <div class="qt-row" style="display:grid;grid-template-columns:3fr 1fr 1fr;gap:.5rem;margin-bottom:.5rem;align-items:center;">
              <input type="text" class="ig-input qt-desc" placeholder="Service description" style="font-size:.78rem;">
              <input type="number" class="ig-input qt-qty" placeholder="Qty" value="1" style="font-size:.78rem;" oninput="igQtCalc()">
              <input type="number" class="ig-input qt-rate" placeholder="Rate (₹)" style="font-size:.78rem;" oninput="igQtCalc()">
            </div>
          </div>
          <button onclick="igQtAddRow()" style="background:none;border:1px dashed var(--border);padding:.35rem .75rem;font-size:.72rem;cursor:pointer;color:var(--gold);width:100%;margin-bottom:1rem;"><i class="fas fa-plus" style="margin-right:.35rem;"></i>Add Line Item</button>
          <div style="display:flex;gap:.75rem;">
            <button onclick="igCreateQuote()" style="background:var(--gold);color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-save" style="margin-right:.35rem;"></i>Save as Draft</button>
            <button onclick="igToast('Quote preview generated','success')" style="background:#2563eb;color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-eye" style="margin-right:.35rem;"></i>Preview PDF</button>
          </div>
        </div>
      </div>
      <!-- Live Estimate Panel -->
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Live Estimate</h3></div>
        <div style="padding:1.25rem;" id="qt-preview">
          <div style="border:1px solid var(--border);padding:1.25rem;margin-bottom:1rem;">
            <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.25rem;color:var(--ink);margin-bottom:.25rem;" id="qt-prev-title">Quote Title</div>
            <div style="font-size:.72rem;color:var(--ink-muted);" id="qt-prev-client">Client</div>
          </div>
          <table style="width:100%;font-size:.78rem;border-collapse:collapse;margin-bottom:1rem;" id="qt-summary-table">
            <tr><td style="padding:.3rem 0;color:var(--ink-muted);">Subtotal</td><td style="text-align:right;font-weight:600;" id="qt-sub">₹0</td></tr>
            <tr><td style="padding:.3rem 0;color:var(--ink-muted);">GST @ 18% (SAC 998313)</td><td style="text-align:right;" id="qt-gst-amt">₹0</td></tr>
            <tr style="border-top:2px solid var(--ink);font-weight:700;"><td style="padding:.5rem 0;">Total Payable</td><td style="text-align:right;font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--gold);" id="qt-total">₹0</td></tr>
          </table>
          <div style="background:#fdf4ff;border:1px solid #e9d5ff;padding:.75rem;font-size:.72rem;color:#6d28d9;">
            <i class="fas fa-info-circle" style="margin-right:.35rem;"></i>
            18% GST applies per SAC 998313 (Management Consulting Services). Reverse charge not applicable.
          </div>
          <div style="margin-top:1rem;">
            <label class="ig-label">Discount (%)</label>
            <input type="number" id="qt-disc" class="ig-input" placeholder="0" min="0" max="100" style="font-size:.82rem;" oninput="igQtCalc()">
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Tab 2: Templates -->
  <div id="qt-pane-2" style="display:none;">
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.875rem;">
      ${['Advisory Services Retainer','Hotel Pre-Opening PMC','Retail Leasing Mandate','Entertainment Feasibility Study','HORECA Supply Quote','Debt Advisory & Restructuring'].map((t,i)=>`<div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
        <div style="width:36px;height:36px;background:${['#B8960C','#2563eb','#16a34a','#7c3aed','#d97706','#dc2626'][i]};display:flex;align-items:center;justify-content:center;margin-bottom:.75rem;">
          <i class="fas fa-file-invoice" style="color:#fff;font-size:.75rem;"></i>
        </div>
        <div style="font-weight:600;font-size:.875rem;color:var(--ink);margin-bottom:.35rem;">${t}</div>
        <div style="font-size:.72rem;color:var(--ink-muted);margin-bottom:.875rem;">Standard India Gully template with pre-filled scope, clauses, and line items</div>
        <button onclick="igQtTab(1);igToast('Template loaded: ${t}','success')" style="background:var(--gold);color:#fff;border:none;padding:.4rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;width:100%;">Use Template</button>
      </div>`).join('')}
    </div>
  </div>

  <!-- Tab 3: E-Sign Workflow -->
  <div id="qt-pane-3" style="display:none;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;">
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Send Quote for E-Signature</h3></div>
        <div style="padding:1.25rem;display:flex;flex-direction:column;gap:.875rem;">
          <div><label class="ig-label">Select Quote</label>
            <select id="esign-qt-sel" class="ig-input" style="font-size:.82rem;">
              ${quotes.filter(q=>q.status!=='Draft').map(q=>`<option value="${q.id}">${q.id} \u2014 ${q.client} (${q.status})</option>`).join('')}
            </select>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.75rem;">
            <div><label class="ig-label">Signatory Name</label><input type="text" id="esign-sig-name" class="ig-input" placeholder="Full legal name" style="font-size:.82rem;"></div>
            <div><label class="ig-label">Signatory Email</label><input type="email" id="esign-sig-email" class="ig-input" placeholder="signatory@company.com" style="font-size:.82rem;"></div>
            <div><label class="ig-label">Signatory Role</label><input type="text" id="esign-sig-role" class="ig-input" placeholder="CEO / Director / MD" style="font-size:.82rem;"></div>
            <div><label class="ig-label">Sign Deadline</label><input type="date" id="esign-qt-deadline" class="ig-input" style="font-size:.82rem;"></div>
          </div>
          <div><label class="ig-label">Message to Signatory</label><textarea class="ig-input" id="esign-qt-msg" rows="3" style="font-size:.82rem;" placeholder="Please review and sign the attached quote at your earliest convenience..."></textarea></div>
          <div style="background:#f0fdf4;border:1px solid #86efac;padding:.75rem;font-size:.75rem;color:#166534;">
            <i class="fas fa-shield-alt" style="margin-right:.35rem;"></i>Signatures legally binding under IT Act 2000. DSC or Aadhaar OTP e-sign link sent to signatory.
          </div>
          <div style="display:flex;gap:.5rem;flex-wrap:wrap;">
            <button onclick="igSendESign()" style="background:var(--gold);color:#fff;border:none;padding:.55rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;"><i class="fas fa-signature" style="margin-right:.35rem;"></i>Send for E-Sign</button>
            <button onclick="igToast('E-sign reminder sent to signatory','info')" style="background:none;border:1px solid var(--border);padding:.55rem 1.1rem;font-size:.78rem;cursor:pointer;color:var(--ink);"><i class="fas fa-bell" style="margin-right:.35rem;"></i>Remind</button>
          </div>
        </div>
      </div>
      <div style="background:#fff;border:1px solid var(--border);">
        <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);"><h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">E-Sign Status Tracker</h3></div>
        <div style="padding:0;">
          <table style="width:100%;border-collapse:collapse;font-size:.78rem;">
            <thead><tr style="background:#f8f9fa;">${['Quote','Signatory','Sent','Deadline','Status'].map(h=>`<th style="padding:.6rem 1rem;text-align:left;font-size:.68rem;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-muted);font-weight:600;border-bottom:1px solid var(--border);">${h}</th>`).join('')}</tr></thead>
            <tbody>${[
              {qt:'QT-2026-001',sig:'Rajiv Arora, Heritage Hotels',sent:'22 Feb 2026',dl:'28 Feb 2026',s:'Signed'},
              {qt:'QT-2026-002',sig:'Meera Rajan, NCR Entertainment',sent:'25 Feb 2026',dl:'05 Mar 2026',s:'Viewed'},
              {qt:'QT-2026-004',sig:'Sunita Bhatt, Goa Ventures',sent:'27 Feb 2026',dl:'10 Mar 2026',s:'Sent'},
              {qt:'QT-2026-006',sig:'Rajeev Pillai, Desi Brands',sent:'01 Mar 2026',dl:'12 Mar 2026',s:'Sent'},
            ].map(r=>`<tr style="border-bottom:1px solid var(--border);"><td style="padding:.55rem 1rem;font-weight:700;color:var(--gold);font-size:.72rem;">${r.qt}</td><td style="padding:.55rem 1rem;font-size:.75rem;">${r.sig}</td><td style="padding:.55rem 1rem;color:var(--ink-muted);">${r.sent}</td><td style="padding:.55rem 1rem;color:var(--ink-muted);">${r.dl}</td><td style="padding:.55rem 1rem;"><span style="font-size:.68rem;background:${r.s==='Signed'?'#dcfce7':r.s==='Viewed'?'#fef3c7':'#eff6ff'};color:${r.s==='Signed'?'#166534':r.s==='Viewed'?'#92400e':'#1e40af'};padding:2px 7px;">${r.s}</span></td></tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- Tab 4: Version History -->
  <div id="qt-pane-4" style="display:none;">
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Quote Version History</h3>
        <select class="ig-input" style="font-size:.78rem;padding:.35rem .6rem;" onchange="igToast('Loaded history for: '+this.options[this.selectedIndex].text,'info')">
          ${quotes.map(q=>`<option value="${q.id}">${q.id} \u2014 ${q.client}</option>`).join('')}
        </select>
      </div>
      <div>
        <table style="width:100%;border-collapse:collapse;font-size:.78rem;">
          <thead><tr style="background:#f8f9fa;">${['Version','Date','Changed By','Total Value','Key Changes','Actions'].map(h=>`<th style="padding:.6rem 1rem;text-align:left;font-size:.68rem;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-muted);font-weight:600;border-bottom:1px solid var(--border);">${h}</th>`).join('')}</tr></thead>
          <tbody>${[
            {ver:'v2',dt:'22 Feb 2026',by:'Arun Manikonda',val:'\u20b944.8L',note:'PMC scope expanded; 5% discount applied',curr:true},
            {ver:'v1',dt:'15 Feb 2026',by:'Pavan Manikonda',val:'\u20b938.0L',note:'Initial quote — basic PMC scope',curr:false},
          ].map(r=>`<tr style="border-bottom:1px solid var(--border);${r.curr?'background:#fffdf5;':''}"><td style="padding:.55rem 1rem;"><span style="font-weight:700;color:var(--gold);">${r.ver}</span>${r.curr?' <span style="font-size:.6rem;background:#B8960C22;color:#B8960C;padding:1px 5px;">Current</span>':''}</td><td style="padding:.55rem 1rem;color:var(--ink-muted);">${r.dt}</td><td style="padding:.55rem 1rem;">${r.by}</td><td style="padding:.55rem 1rem;font-weight:600;">${r.val}</td><td style="padding:.55rem 1rem;font-size:.75rem;color:var(--ink-muted);">${r.note}</td><td style="padding:.55rem 1rem;display:flex;gap:.3rem;"><button onclick="igToast('${r.ver} PDF downloaded','success')" style="background:none;border:1px solid var(--border);padding:.22rem .5rem;font-size:.62rem;cursor:pointer;color:var(--ink-muted);" title="Download"><i class="fas fa-download"></i></button>${!r.curr?'<button onclick="igToast(\'Version diff report generated\',\'info\')" style="background:none;border:1px solid var(--border);padding:.22rem .5rem;font-size:.62rem;cursor:pointer;color:#7c3aed;" title="Diff"><i class="fas fa-exchange-alt"></i></button>':''}</td></tr>`).join('')}
          </tbody>
        </table>
        <div style="padding:.875rem 1.25rem;border-top:1px solid var(--border);display:flex;gap:.5rem;">
          <button onclick="igToast('New version v3 branched from current draft','success')" style="background:var(--ink);color:#fff;border:none;padding:.45rem 1rem;font-size:.75rem;font-weight:600;cursor:pointer;"><i class="fas fa-code-branch" style="margin-right:.35rem;"></i>Branch New Version</button>
          <button onclick="igToast('Version diff report exported','success')" style="background:none;border:1px solid var(--border);padding:.45rem 1rem;font-size:.75rem;cursor:pointer;color:var(--ink);"><i class="fas fa-file-alt" style="margin-right:.35rem;"></i>Export Diff</button>
        </div>
      </div>
    </div>
  </div>

  <script>
  window.igQtTab = function(idx){
    for(var i=0;i<5;i++){
      var p=document.getElementById('qt-pane-'+i);
      var t=document.getElementById('qt-tab-'+i);
      if(p) p.style.display=i===idx?'block':'none';
      if(t){ t.style.color=i===idx?'var(--gold)':'var(--ink-muted)'; t.style.borderBottom=i===idx?'2px solid var(--gold)':'2px solid transparent'; }
    }
  };
      if(t){ t.style.color=i===idx?'var(--gold)':'var(--ink-muted)'; t.style.borderBottom=i===idx?'2px solid var(--gold)':'2px solid transparent'; }
    }
  };
  window.igQtAddRow = function(){
    var container=document.getElementById('qt-line-items');
    var row=document.createElement('div');
    row.className='qt-row';
    row.style.cssText='display:grid;grid-template-columns:3fr 1fr 1fr;gap:.5rem;margin-bottom:.5rem;align-items:center;';
    row.innerHTML='<input type="text" class="ig-input qt-desc" placeholder="Service description" style="font-size:.78rem;"><input type="number" class="ig-input qt-qty" placeholder="Qty" value="1" style="font-size:.78rem;" oninput="igQtCalc()"><input type="number" class="ig-input qt-rate" placeholder="Rate (₹)" style="font-size:.78rem;" oninput="igQtCalc()">';
    container.appendChild(row);
  };
  window.igQtCalc = function(){
    var rows=document.querySelectorAll('.qt-row');
    var sub=0;
    rows.forEach(function(r){
      var qty=parseFloat(r.querySelector('.qt-qty')?.value)||0;
      var rate=parseFloat(r.querySelector('.qt-rate')?.value)||0;
      sub+=qty*rate;
    });
    var disc=parseFloat(document.getElementById('qt-disc')?.value)||0;
    var discAmt=sub*disc/100;
    var net=sub-discAmt;
    var gst=net*0.18;
    var total=net+gst;
    var fmt=function(n){return'₹'+(n>=100000?(n/100000).toFixed(2)+'L':(n/1000).toFixed(1)+'K');};
    var s=document.getElementById('qt-sub'); if(s) s.textContent=fmt(net);
    var g=document.getElementById('qt-gst-amt'); if(g) g.textContent=fmt(gst);
    var t=document.getElementById('qt-total'); if(t) t.textContent=fmt(total);
    var cl=document.getElementById('qt-client');
    if(cl) cl.textContent=document.getElementById('qt-client')?.selectedOptions?.[0]?.text||'Client';
    var ptitle=document.getElementById('qt-prev-title');
    if(ptitle) ptitle.textContent=document.getElementById('qt-title')?.value||'Quote Title';
  };
  window.igCreateQuote = function(){
    var title=document.getElementById('qt-title').value.trim();
    var client=document.getElementById('qt-client')?.selectedOptions?.[0]?.text||'';
    if(!title||!client){igToast('Enter quote title and select client','warn');return;}
    var id='QT-2025-00'+(Math.floor(Math.random()*90)+10);
    igToast('Quote '+id+' created for '+client,'success');
    igQtTab(0);
  };
  window.igSendESign = function(){
    var name=document.getElementById('esign-sig-name')?.value.trim();
    var email=document.getElementById('esign-sig-email')?.value.trim();
    var qt=document.getElementById('esign-qt-sel')?.value;
    if(!name||!email){igToast('Enter signatory name and email','warn');return;}
    igToast('E-sign request sent for '+qt+' to '+email+' — secure link valid 72 hrs','success');
  };
  </script>`
  return c.html(layout('Quotes & Estimates', salesShell('Quotes & Estimates', 'quotes', body), {noNav:true,noFooter:true}))
})

// ── PIPELINE VIEW ─────────────────────────────────────────────────────────────
app.get('/pipeline', (c) => {
  const stages = [
    {name:'Enquiry',     color:'#2563eb', deals:[{name:'Tata Hotels Advisory',val:'₹6.2 Cr',days:2,vert:'Hospitality'},{name:'Delhi NCR Retail Park',val:'₹9.5 Cr',days:3,vert:'Real Estate'},{name:'Boutique Hotel Brand',val:'₹4.5 Cr',days:5,vert:'Hospitality'}]},
    {name:'Qualifying',  color:'#d97706', deals:[{name:'Desi Brands Pvt Ltd',val:'₹1.2 Cr',days:8,vert:'Retail'}]},
    {name:'Proposal',    color:'#7c3aed', deals:[{name:'NCR Entertainment Pvt',val:'₹18 Cr',days:12,vert:'Entertainment'},{name:'Goa Hospitality',val:'₹2.1 Cr',days:15,vert:'Hospitality'}]},
    {name:'Negotiation', color:'#dc2626', deals:[{name:'Rajasthan Resort Group',val:'₹85 L',days:18,vert:'HORECA'},{name:'Mumbai RE Fund',val:'₹60 L',days:22,vert:'Real Estate'}]},
    {name:'Won',         color:'#16a34a', deals:[{name:'Heritage Hotels Advisory',val:'₹4.5 Cr',days:28,vert:'Hospitality'}]},
  ]
  const body = `
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">
    ${[
      {label:'Total Pipeline',value:'₹47.2 Cr',c:'#B8960C'},
      {label:'Active Deals',  value:'9',        c:'#2563eb'},
      {label:'Won This Month',value:'₹4.5 Cr',  c:'#16a34a'},
      {label:'Avg Deal Age',  value:'14 days',  c:'#7c3aed'},
    ].map(s=>`<div style="background:#fff;border:1px solid var(--border);padding:1rem;"><div style="font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.4rem;">${s.label}</div><div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:${s.c};line-height:1;">${s.value}</div></div>`).join('')}
  </div>

  <!-- Kanban Board -->
  <div style="overflow-x:auto;padding-bottom:1rem;">
    <div style="display:grid;grid-template-columns:repeat(5,minmax(200px,1fr));gap:1rem;min-width:1100px;">
      ${stages.map(s=>`<div>
        <div style="padding:.625rem .875rem;background:${s.color};color:#fff;display:flex;justify-content:space-between;align-items:center;margin-bottom:.625rem;">
          <span style="font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;">${s.name}</span>
          <span style="background:rgba(255,255,255,.25);padding:1px 8px;font-size:.65rem;font-weight:700;">${s.deals.length}</span>
        </div>
        <div>
          ${s.deals.map(d=>`<div style="background:#fff;border:1px solid var(--border);border-left:3px solid ${s.color};padding:.875rem;margin-bottom:.625rem;cursor:pointer;" onclick="igToast('${d.name} — deal opened','success')">
            <div style="font-size:.82rem;font-weight:600;color:var(--ink);margin-bottom:.3rem;">${d.name}</div>
            <span class="badge b-dk" style="font-size:.55rem;margin-bottom:.5rem;">${d.vert}</span>
            <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--gold);margin-top:.35rem;">${d.val}</div>
            <div style="font-size:.62rem;color:var(--ink-muted);margin-top:.35rem;display:flex;justify-content:space-between;">
              <span><i class="fas fa-clock" style="margin-right:.25rem;"></i>${d.days}d in stage</span>
              <button onclick="event.stopPropagation();igToast('Moving deal','success')" style="background:none;border:1px solid ${s.color};padding:1px 6px;font-size:.58rem;cursor:pointer;color:${s.color};">Move →</button>
            </div>
          </div>`).join('')}
          <div style="border:2px dashed var(--border);padding:.75rem;text-align:center;font-size:.68rem;color:var(--ink-muted);cursor:pointer;" onclick="igToast('Add deal to ${s.name}','info')">
            <i class="fas fa-plus" style="display:block;font-size:.875rem;margin-bottom:.25rem;color:${s.color};"></i>Add Deal
          </div>
        </div>
      </div>`).join('')}
    </div>
  </div>`
  return c.html(layout('Sales Pipeline', salesShell('Sales Pipeline', 'pipeline', body), {noNav:true,noFooter:true}))
})

// ── ENGAGEMENTS ───────────────────────────────────────────────────────────────
app.get('/engagements', (c) => {
  const engagements = [
    {id:'ENG-001',client:'Demo Client Corp',   title:'Advisory Retainer 2026',       vertical:'Real Estate',  start:'01 Jan 2026',end:'31 Dec 2026',value:'₹6.0 Cr',status:'Active',   progress:25,pm:'Amit Jhingan'},
    {id:'ENG-002',client:'Rajasthan Hotels',   title:'Hotel Pre-Opening PMC',         vertical:'Hospitality',  start:'15 Feb 2026',end:'14 Feb 2027',value:'₹45 L',  status:'Active',   progress:45,pm:'Arun Manikonda'},
    {id:'ENG-003',client:'Entertainment Vent.',title:'Entertainment Feasibility',     vertical:'Entertainment',start:'01 Mar 2025',end:'31 Aug 2026',value:'₹4.5 Cr',status:'Active',   progress:20,pm:'Arun Manikonda'},
    {id:'ENG-004',client:'Mumbai Mall Corp',   title:'Retail Leasing Mandate',        vertical:'Real Estate',  start:'01 Dec 2024',end:'30 Nov 2026',value:'₹2.1 Cr',status:'Active',   progress:75,pm:'Amit Jhingan'},
    {id:'ENG-005',client:'EY India',           title:'Advisory Retainer (Concluded)', vertical:'Advisory',     start:'01 Apr 2024',end:'31 Mar 2025',value:'₹3.5 Cr',status:'Completed',progress:100,pm:'Pavan Manikonda'},
  ]
  const body = `
  <div style="background:#fff;border:1px solid var(--border);">
    <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
      <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Active Engagements</h3>
      <button onclick="igToast('New engagement wizard opened','success')" style="background:var(--gold);color:#fff;border:none;padding:.4rem .875rem;font-size:.72rem;font-weight:600;cursor:pointer;"><i class="fas fa-plus" style="margin-right:.35rem;"></i>New Engagement</button>
    </div>
    <table class="ig-tbl">
      <thead><tr><th>ID</th><th>Client</th><th>Engagement</th><th>Vertical</th><th>PM</th><th>Period</th><th>Value</th><th>Progress</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody>
        ${engagements.map(e=>`<tr>
          <td style="font-size:.72rem;font-weight:700;color:var(--gold);">${e.id}</td>
          <td style="font-size:.82rem;font-weight:500;">${e.client}</td>
          <td style="font-size:.78rem;">${e.title}</td>
          <td><span class="badge b-dk" style="font-size:.58rem;">${e.vertical}</span></td>
          <td style="font-size:.75rem;">${e.pm}</td>
          <td style="font-size:.72rem;color:var(--ink-muted);">${e.start} – ${e.end}</td>
          <td style="font-size:.82rem;font-weight:700;color:var(--gold);">${e.value}</td>
          <td>
            <div style="background:#e2e8f0;height:6px;border-radius:3px;width:80px;overflow:hidden;margin-bottom:2px;">
              <div style="height:100%;background:${e.progress===100?'#16a34a':e.progress>50?'#B8960C':'#2563eb'};width:${e.progress}%;"></div>
            </div>
            <div style="font-size:.62rem;color:var(--ink-muted);">${e.progress}%</div>
          </td>
          <td><span class="badge ${e.status==='Active'?'b-gr':'b-dk'}">${e.status}</span></td>
          <td style="display:flex;gap:.3rem;">
            <button onclick="igToast('${e.id} opened','success')" style="background:none;border:1px solid var(--border);padding:.22rem .5rem;font-size:.62rem;cursor:pointer;color:var(--gold);" title="View"><i class="fas fa-eye"></i></button>
            <button onclick="igToast('Invoice raised for ${e.id}','success')" style="background:#16a34a;color:#fff;border:none;padding:.22rem .5rem;font-size:.62rem;cursor:pointer;" title="Raise Invoice"><i class="fas fa-file-invoice"></i></button>
          </td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>`
  return c.html(layout('Engagements', salesShell('Engagements', 'engagements', body), {noNav:true,noFooter:true}))
})

// ── TASKS ─────────────────────────────────────────────────────────────────────
app.get('/tasks', (c) => {
  const tasks = [
    {id:'TSK-001',title:'Send Q1 proposal to NCR Entertainment',       due:'10 Mar 2025',priority:'High',  status:'Overdue',  assigned:'Arun Manikonda',  eng:'ENG-003'},
    {id:'TSK-002',title:'Follow up on Rajasthan Resort HORECA quote',  due:'12 Mar 2026',priority:'High',  status:'Pending',  assigned:'Amit Jhingan',    eng:'ENG-002'},
    {id:'TSK-003',title:'Prepare feasibility data pack — Entertainment',due:'15 Mar 2026',priority:'Medium',status:'In Progress',assigned:'Pavan Manikonda',eng:'ENG-003'},
    {id:'TSK-004',title:'Client call — Mumbai RE Fund retainer renewal',due:'15 Mar 2026',priority:'Medium',status:'Pending',  assigned:'Pavan Manikonda', eng:'ENG-001'},
    {id:'TSK-005',title:'Submit NDA to Tata Hotels',                    due:'18 Mar 2026',priority:'High',  status:'Pending',  assigned:'Arun Manikonda',  eng:'LD-007'},
    {id:'TSK-006',title:'Update client portal — mandate progress 75%', due:'20 Mar 2026',priority:'Low',   status:'Pending',  assigned:'Amit Jhingan',    eng:'ENG-004'},
    {id:'TSK-007',title:'Quarterly performance review — all mandates', due:'31 Mar 2026',priority:'Medium',status:'Pending',  assigned:'Arun Manikonda',  eng:'All'},
  ]
  const body = `
  <div style="display:flex;gap:.75rem;align-items:center;margin-bottom:1.25rem;">
    <div style="flex:1;"><input type="text" class="ig-input" placeholder="🔍  Search tasks..." style="font-size:.82rem;"></div>
    <select class="ig-input" style="font-size:.78rem;width:auto;"><option>All Priorities</option><option>High</option><option>Medium</option><option>Low</option></select>
    <select class="ig-input" style="font-size:.78rem;width:auto;"><option>All Statuses</option><option>Pending</option><option>In Progress</option><option>Overdue</option><option>Done</option></select>
    <button onclick="togglePanel('new-task-panel')" style="background:var(--gold);color:#fff;border:none;padding:.5rem 1.1rem;font-size:.78rem;font-weight:600;cursor:pointer;white-space:nowrap;"><i class="fas fa-plus" style="margin-right:.4rem;"></i>New Task</button>
  </div>

  <div id="new-task-panel" class="ig-panel" style="margin-bottom:1.25rem;">
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.875rem;">
      <div style="grid-column:span 2;"><label class="ig-label">Task Title *</label><input type="text" id="nt-title" class="ig-input" style="font-size:.82rem;" placeholder="Describe the task..."></div>
      <div><label class="ig-label">Due Date</label><input type="date" id="nt-due" class="ig-input" style="font-size:.82rem;"></div>
      <div><label class="ig-label">Priority</label><select id="nt-pri" class="ig-input" style="font-size:.82rem;"><option>High</option><option>Medium</option><option>Low</option></select></div>
      <div><label class="ig-label">Assign To</label><select id="nt-assign" class="ig-input" style="font-size:.82rem;"><option>Arun Manikonda</option><option>Pavan Manikonda</option><option>Amit Jhingan</option></select></div>
      <div><label class="ig-label">Related Engagement</label><input type="text" id="nt-eng" class="ig-input" style="font-size:.82rem;" placeholder="ENG-001 or LD-007"></div>
    </div>
    <div style="display:flex;gap:.75rem;margin-top:.875rem;">
      <button onclick="igAddTask()" style="background:var(--gold);color:#fff;border:none;padding:.5rem 1.25rem;font-size:.78rem;font-weight:600;cursor:pointer;">Add Task</button>
      <button onclick="togglePanel('new-task-panel')" style="background:none;border:1px solid var(--border);padding:.5rem 1.25rem;font-size:.78rem;cursor:pointer;color:var(--ink-muted);">Cancel</button>
    </div>
  </div>

  <div style="background:#fff;border:1px solid var(--border);">
    <table class="ig-tbl">
      <thead><tr><th>ID</th><th>Task</th><th>Due Date</th><th>Priority</th><th>Assigned</th><th>Engagement</th><th>Status</th><th>Actions</th></tr></thead>
      <tbody id="tasks-tbody">
        ${tasks.map(t=>`<tr>
          <td style="font-size:.72rem;font-weight:700;color:var(--gold);">${t.id}</td>
          <td style="font-size:.82rem;font-weight:500;">${t.title}</td>
          <td style="font-size:.75rem;color:${t.status==='Overdue'?'#dc2626':'var(--ink-muted)'};">${t.due}</td>
          <td><span class="badge" style="background:${t.priority==='High'?'#fef2f2':t.priority==='Medium'?'#fffbeb':'#f0fdf4'};color:${t.priority==='High'?'#dc2626':t.priority==='Medium'?'#d97706':'#16a34a'};border:1px solid ${t.priority==='High'?'#fecaca':t.priority==='Medium'?'#fde68a':'#bbf7d0'};font-size:.6rem;">${t.priority}</span></td>
          <td style="font-size:.75rem;">${t.assigned}</td>
          <td style="font-size:.72rem;color:var(--gold);">${t.eng}</td>
          <td><span class="badge ${t.status==='Overdue'?'b-re':t.status==='In Progress'?'b-g':'b-dk'}" style="font-size:.6rem;">${t.status}</span></td>
          <td style="display:flex;gap:.3rem;">
            <button onclick="igToast('${t.id} marked as Done','success');this.closest('tr').style.opacity='.5'" style="background:#16a34a;color:#fff;border:none;padding:.22rem .5rem;font-size:.62rem;cursor:pointer;" title="Mark Done"><i class="fas fa-check"></i></button>
            <button onclick="igToast('${t.id} reassigned','success')" style="background:none;border:1px solid var(--border);padding:.22rem .5rem;font-size:.62rem;cursor:pointer;color:var(--gold);" title="Edit"><i class="fas fa-edit"></i></button>
          </td>
        </tr>`).join('')}
      </tbody>
    </table>
  </div>

  <script>
  window.igAddTask = function(){
    var title=document.getElementById('nt-title').value.trim();
    var due=document.getElementById('nt-due').value;
    var pri=document.getElementById('nt-pri').value;
    var assign=document.getElementById('nt-assign').value;
    var eng=document.getElementById('nt-eng').value||'—';
    if(!title){igToast('Enter task title','warn');return;}
    var id='TSK-'+(Math.floor(Math.random()*900)+100);
    var tbody=document.getElementById('tasks-tbody');
    var row=document.createElement('tr');
    row.innerHTML='<td style="font-size:.72rem;font-weight:700;color:var(--gold);">'+esc(id)+'</td><td style="font-size:.82rem;font-weight:500;">'+esc(title)+'</td><td style="font-size:.75rem;">'+esc(due)+'</td><td><span class="badge b-g">'+esc(pri)+'</span></td><td style="font-size:.75rem;">'+esc(assign)+'</td><td style="font-size:.72rem;color:var(--gold);">'+esc(eng)+'</td><td><span class="badge b-dk">Pending</span></td><td><button onclick="igToast(\'Done\',\'success\');this.closest(\'tr\').style.opacity=\'.5\'" style="background:#16a34a;color:#fff;border:none;padding:.22rem .5rem;font-size:.62rem;cursor:pointer;"><i class=\'fas fa-check\'></i></button></td>';
    tbody.insertBefore(row, tbody.firstChild);
    igToast('Task '+id+' created','success');
    togglePanel('new-task-panel');
    document.getElementById('nt-title').value='';
  };
  </script>`
  return c.html(layout('Tasks', salesShell('Tasks', 'tasks', body), {noNav:true,noFooter:true}))
})

// ── SALES ANALYTICS ───────────────────────────────────────────────────────────
app.get('/analytics', (c) => {
  const body = `
  <!-- KPI Grid -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">
    ${[
      {label:'Revenue Won FY25',     value:'₹18.5 Cr', sub:'vs ₹12.2 Cr FY24 (+51%)', c:'#16a34a'},
      {label:'Pipeline Value',       value:'₹47.2 Cr', sub:'Weighted: ₹28.3 Cr',      c:'#B8960C'},
      {label:'Conversion Rate',      value:'14%',       sub:'6 won of 42 enquiries',   c:'#2563eb'},
      {label:'Avg Deal Size',        value:'₹3.1 Cr',   sub:'Up from ₹2.0 Cr FY24',   c:'#7c3aed'},
    ].map(s=>`<div style="background:#fff;border:1px solid var(--border);padding:1.1rem;">
      <div style="font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.4rem;">${s.label}</div>
      <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:${s.c};line-height:1;margin-bottom:.25rem;">${s.value}</div>
      <div style="font-size:.68rem;color:${s.c};">${s.sub}</div>
    </div>`).join('')}
  </div>

  <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;margin-bottom:1.25rem;">
    <!-- Revenue by Vertical -->
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Revenue by Vertical — FY 2025</h3>
      </div>
      <div style="padding:1.25rem;">
        ${[
          {name:'Real Estate',  val:620,  pct:33, c:'#B8960C'},
          {name:'Hospitality',  val:520,  pct:28, c:'#2563eb'},
          {name:'Entertainment',val:350,  pct:19, c:'#7c3aed'},
          {name:'HORECA',       val:210,  pct:11, c:'#d97706'},
          {name:'Retail',       val:150,  pct:8,  c:'#16a34a'},
        ].map(v=>`<div style="margin-bottom:.875rem;">
          <div style="display:flex;justify-content:space-between;margin-bottom:.25rem;font-size:.78rem;">
            <span style="font-weight:500;color:var(--ink);">${v.name}</span>
            <span style="font-weight:700;color:var(--gold);">₹${v.val}L · ${v.pct}%</span>
          </div>
          <div style="background:#f1f5f9;height:8px;border-radius:4px;overflow:hidden;">
            <div style="height:100%;background:${v.c};width:${v.pct*3.03}%;border-radius:4px;"></div>
          </div>
        </div>`).join('')}
      </div>
    </div>
    <!-- Monthly Trend -->
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Monthly Revenue Trend</h3>
      </div>
      <div style="padding:1.25rem;">
        ${[
          {m:'Oct 24',v:85,  t:98},
          {m:'Nov 24',v:92,  t:110},
          {m:'Dec 24',v:124, t:110},
          {m:'Jan 25',v:108, t:115},
          {m:'Feb 25',v:124, t:120},
          {m:'Mar 25',v:140, t:130},
        ].map(d=>`<div style="display:flex;align-items:center;gap:.625rem;margin-bottom:.625rem;">
          <div style="font-size:.72rem;color:var(--ink-muted);width:45px;flex-shrink:0;">${d.m}</div>
          <div style="flex:1;background:#f1f5f9;height:20px;border-radius:2px;overflow:hidden;position:relative;">
            <div style="position:absolute;left:0;top:0;height:100%;background:#B8960C;width:${d.v/1.5}%;border-radius:2px;"></div>
            <div style="position:absolute;left:0;top:50%;transform:translateY(-50%);height:2px;background:rgba(37,99,235,.4);width:${d.t/1.5}%;"></div>
          </div>
          <div style="font-size:.72rem;font-weight:700;color:var(--gold);width:45px;text-align:right;">₹${d.v}L</div>
        </div>`).join('')}
        <div style="font-size:.65rem;color:var(--ink-muted);margin-top:.5rem;display:flex;gap:.875rem;">
          <span style="display:flex;align-items:center;gap:.3rem;"><span style="width:8px;height:8px;background:#B8960C;display:inline-block;"></span>Revenue</span>
          <span style="display:flex;align-items:center;gap:.3rem;"><span style="width:8px;height:2px;background:#2563eb;display:inline-block;"></span>Target</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Lead Source & Team Performance -->
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;">
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Lead Sources</h3>
      </div>
      <div style="padding:1.25rem;">
        ${[{src:'Referral',pct:38,n:16},{src:'Website',pct:29,n:12},{src:'LinkedIn',pct:17,n:7},{src:'Events',pct:10,n:4},{src:'Cold Call',pct:6,n:3}].map(s=>`<div style="display:flex;align-items:center;gap:.625rem;margin-bottom:.625rem;">
          <div style="font-size:.75rem;color:var(--ink);width:80px;flex-shrink:0;">${s.src}</div>
          <div style="flex:1;background:#f1f5f9;height:14px;border-radius:3px;overflow:hidden;"><div style="height:100%;background:var(--gold);width:${s.pct}%;"></div></div>
          <div style="font-size:.72rem;font-weight:700;color:var(--gold);width:40px;text-align:right;">${s.pct}%</div>
          <div style="font-size:.65rem;color:var(--ink-muted);width:20px;">(${s.n})</div>
        </div>`).join('')}
      </div>
    </div>
    <div style="background:#fff;border:1px solid var(--border);">
      <div style="padding:.875rem 1.25rem;border-bottom:1px solid var(--border);">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Team Performance</h3>
      </div>
      <div style="padding:1.25rem;">
        ${[
          {name:'Arun Manikonda',  role:'MD',          leads:18, won:3, rev:'₹8.7 Cr'},
          {name:'Amit Jhingan',    role:'President',   leads:14, won:2, rev:'₹6.3 Cr'},
          {name:'Pavan Manikonda', role:'Exec Director',leads:10, won:1, rev:'₹3.5 Cr'},
        ].map(p=>`<div style="background:#f8fafc;border:1px solid var(--border);padding:.875rem;margin-bottom:.625rem;">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;">
            <div>
              <div style="font-size:.82rem;font-weight:600;color:var(--ink);">${p.name}</div>
              <div style="font-size:.68rem;color:var(--ink-muted);">${p.role}</div>
            </div>
            <div style="text-align:right;">
              <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--gold);">${p.rev}</div>
              <div style="font-size:.62rem;color:var(--ink-muted);">${p.leads} leads · ${p.won} won</div>
            </div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </div>`
  return c.html(layout('Sales Analytics', salesShell('Sales Analytics', 'analytics', body), {noNav:true,noFooter:true}))
})

// ── COMMISSION ENGINE ──────────────────────────────────────────────────────────
app.get('/commission', (c) => {
  const body = `
  <div class="ig-info" style="margin-bottom:1.25rem;"><i class="fas fa-info-circle"></i><div><strong>Commission Engine:</strong> Calculates advisory fees, success fees and incentives. Commissions are auto-linked to invoices and payroll. All rates are configured per engagement type and seniority band.</div></div>

  <!-- Commission KPIs -->
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">
    ${[
      {label:'Total Earned FY25',     value:'₹42.6L',  sub:'Across all employees',  c:'#16a34a'},
      {label:'Pending Payout',        value:'₹8.2L',   sub:'Awaiting invoice close', c:'#d97706'},
      {label:'Avg Commission Rate',   value:'2.8%',    sub:'Of deal value',          c:'#B8960C'},
      {label:'Deals Commissioned',    value:'6',       sub:'Closed this FY',         c:'#7c3aed'},
    ].map(s=>`<div style="background:#fff;border:1px solid var(--border);padding:1.1rem;">
      <div style="font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.4rem;">${s.label}</div>
      <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:${s.c};line-height:1;margin-bottom:.25rem;">${s.value}</div>
      <div style="font-size:.68rem;color:${s.c};">${s.sub}</div>
    </div>`).join('')}
  </div>

  <!-- Commission Rate Matrix -->
  <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
    <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
      <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Commission Rate Matrix</h3>
      <button onclick="igToast('Commission rates saved','success')" style="background:var(--gold);color:#fff;border:none;padding:.35rem .75rem;font-size:.68rem;font-weight:600;cursor:pointer;"><i class="fas fa-save" style="margin-right:.3rem;"></i>Save Rates</button>
    </div>
    <div style="overflow-x:auto;">
      <table class="ig-tbl"><thead><tr><th>Service Type</th><th>Retainer Fee Rate</th><th>Success Fee Rate</th><th>Min. Deal Size</th><th>Clawback Period</th><th>Split Rule</th></tr></thead><tbody>
        ${[
          {type:'Real Estate Advisory',    ret:'5%',  succ:'2.5%', min:'₹5 Cr',   clawback:'6 mo', split:'70% lead / 30% support'},
          {type:'Hospitality Advisory',    ret:'5%',  succ:'3.0%', min:'₹3 Cr',   clawback:'6 mo', split:'70% lead / 30% support'},
          {type:'Retail & Leasing',        ret:'4%',  succ:'2.0%', min:'₹2 Cr',   clawback:'3 mo', split:'80% lead / 20% support'},
          {type:'Debt & Special Situations',ret:'3%', succ:'1.5%', min:'₹10 Cr',  clawback:'12 mo',split:'60% lead / 40% support'},
          {type:'Entertainment Advisory',  ret:'5%',  succ:'3.5%', min:'₹1 Cr',   clawback:'3 mo', split:'75% lead / 25% support'},
          {type:'HORECA Solutions',        ret:'8%',  succ:'—',    min:'₹25L',    clawback:'1 mo', split:'100% account manager'},
        ].map(r=>`<tr>
          <td style="font-weight:600;font-size:.82rem;">${r.type}</td>
          <td style="color:#2563eb;font-weight:600;">${r.ret}</td>
          <td style="color:#16a34a;font-weight:600;">${r.succ}</td>
          <td style="font-size:.78rem;">${r.min}</td>
          <td style="font-size:.75rem;color:var(--ink-muted);">${r.clawback}</td>
          <td style="font-size:.75rem;color:var(--ink-muted);">${r.split}</td>
        </tr>`).join('')}
      </tbody></table>
    </div>
  </div>

  <!-- Commission Ledger -->
  <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
    <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
      <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Commission Ledger — FY 2024-25</h3>
      <div style="display:flex;gap:.5rem;">
        <button onclick="igToast('Commission ledger exported to Excel','success')" style="background:none;border:1px solid var(--border);padding:.3rem .75rem;font-size:.68rem;cursor:pointer;color:var(--gold);"><i class="fas fa-file-excel" style="margin-right:.3rem;"></i>Export</button>
        <button onclick="togglePanel('new-comm-panel')" style="background:#1E1E1E;color:#fff;border:none;padding:.35rem .75rem;font-size:.68rem;font-weight:600;cursor:pointer;"><i class="fas fa-plus" style="margin-right:.3rem;"></i>Manual Entry</button>
      </div>
    </div>
    <div id="new-comm-panel" class="ig-panel" style="margin:1.25rem;display:none;">
      <h4 style="font-size:.8rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;margin-bottom:.875rem;">Add Commission Entry</h4>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr 1fr;gap:.875rem;">
        <div><label class="ig-label">Employee</label><select class="ig-input" style="font-size:.82rem;"><option>Arun Manikonda</option><option>Pavan Manikonda</option><option>Amit Jhingan</option></select></div>
        <div><label class="ig-label">Engagement</label><select class="ig-input" style="font-size:.82rem;"><option>ENG-001 — L5 Resort HORECA</option><option>ENG-002 — Rajasthan Hotel</option><option>ENG-003 — Mumbai Retail</option></select></div>
        <div><label class="ig-label">Deal Value (₹)</label><input type="number" class="ig-input" style="font-size:.82rem;" placeholder="e.g. 50000000" id="comm-deal-val" oninput="igCalcComm()"></div>
        <div><label class="ig-label">Rate (%)</label><input type="number" class="ig-input" style="font-size:.82rem;" value="2.5" id="comm-rate" oninput="igCalcComm()"></div>
        <div><label class="ig-label">Type</label><select class="ig-input" style="font-size:.82rem;"><option>Success Fee</option><option>Retainer Commission</option><option>Bonus Incentive</option></select></div>
        <div><label class="ig-label">Calculated Commission (₹)</label><input type="text" class="ig-input" id="comm-calc" style="font-size:.82rem;background:#f8f9fa;" readonly></div>
        <div><label class="ig-label">Payout Date</label><input type="date" class="ig-input" style="font-size:.82rem;"></div>
        <div><label class="ig-label">Status</label><select class="ig-input" style="font-size:.82rem;"><option>Pending</option><option>Approved</option><option>Paid</option></select></div>
      </div>
      <div style="display:flex;gap:.75rem;margin-top:.875rem;">
        <button onclick="igToast('Commission entry saved — pending approval','success');togglePanel('new-comm-panel')" style="background:var(--gold);color:#fff;border:none;padding:.45rem 1rem;font-size:.72rem;font-weight:600;cursor:pointer;">Save Entry</button>
        <button onclick="togglePanel('new-comm-panel')" style="background:none;border:1px solid var(--border);padding:.45rem 1rem;font-size:.72rem;cursor:pointer;color:var(--ink-muted);">Cancel</button>
      </div>
    </div>
    <table class="ig-tbl"><thead><tr><th>Ref</th><th>Employee</th><th>Engagement</th><th>Type</th><th>Deal Value</th><th>Rate</th><th>Commission</th><th>Payout Date</th><th>Status</th><th>Action</th></tr></thead><tbody>
      ${[
        {ref:'COM-001',emp:'Arun Manikonda',   eng:'ENG-001 — L5 Resort',   type:'Success Fee',       deal:'₹15 Cr',   rate:'2.5%',amt:'₹37.5L',date:'28 Feb 2026',cls:'b-gr',s:'Paid'},
        {ref:'COM-002',emp:'Amit Jhingan',     eng:'ENG-003 — Mumbai Retail',type:'Retainer Comm.',    deal:'₹3.5 Cr',  rate:'5.0%',amt:'₹17.5L',date:'15 Mar 2026',cls:'b-g', s:'Pending'},
        {ref:'COM-003',emp:'Pavan Manikonda',  eng:'ENG-002 — Raj. Hotel',   type:'Success Fee',       deal:'₹8 Cr',    rate:'3.0%',amt:'₹24L',  date:'30 Mar 2026',cls:'b-g', s:'Pending'},
        {ref:'COM-004',emp:'Arun Manikonda',   eng:'ENG-005 — Debt Mandate', type:'Bonus Incentive',   deal:'₹22 Cr',   rate:'1.5%',amt:'₹33L',  date:'01 Apr 2026',cls:'b-dk',s:'Approved'},
      ].map(r=>`<tr>
        <td style="font-weight:700;font-size:.78rem;color:var(--gold);">${r.ref}</td>
        <td style="font-size:.82rem;">${r.emp}</td>
        <td style="font-size:.75rem;color:var(--ink-muted);">${r.eng}</td>
        <td><span class="badge b-dk" style="font-size:.6rem;">${r.type}</span></td>
        <td style="font-family:'DM Serif Display',Georgia,serif;font-size:.85rem;">${r.deal}</td>
        <td style="font-size:.78rem;color:#2563eb;font-weight:600;">${r.rate}</td>
        <td style="font-family:'DM Serif Display',Georgia,serif;font-weight:700;color:var(--gold);">${r.amt}</td>
        <td style="font-size:.75rem;white-space:nowrap;">${r.date}</td>
        <td><span class="badge ${r.cls}">${r.s}</span></td>
        <td style="display:flex;gap:.3rem;">
          ${r.s==='Pending'?`<button onclick="igToast('${r.ref} approved — will be added to payroll','success')" style="background:#16a34a;color:#fff;border:none;padding:.2rem .5rem;font-size:.65rem;cursor:pointer;">Approve</button>`:''}
          <button onclick="igToast('${r.ref} details opened','info')" style="background:none;border:1px solid var(--border);padding:.2rem .5rem;font-size:.65rem;cursor:pointer;color:var(--ink-muted);"><i class="fas fa-eye"></i></button>
        </td>
      </tr>`).join('')}
    </tbody></table>
  </div>

  <!-- Lead Auto-Assignment Rules -->
  <div style="background:#fff;border:1px solid var(--border);">
    <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;">
      <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:var(--ink);">Lead Auto-Assignment Rules</h3>
      <button onclick="igToast('Assignment rules saved','success')" style="background:var(--gold);color:#fff;border:none;padding:.35rem .75rem;font-size:.68rem;font-weight:600;cursor:pointer;"><i class="fas fa-save" style="margin-right:.3rem;"></i>Save Rules</button>
    </div>
    <div style="padding:1.25rem;">
      <div class="ig-info" style="margin-bottom:1rem;"><i class="fas fa-robot"></i><div>Leads are auto-assigned based on vertical expertise and current workload. Assign rules below control the routing logic.</div></div>
      <table class="ig-tbl"><thead><tr><th>Vertical / Source</th><th>Primary Assignee</th><th>Backup Assignee</th><th>SLA (Response)</th><th>Round-Robin</th><th>Status</th></tr></thead><tbody>
        ${[
          {vert:'Real Estate',  primary:'Arun Manikonda',  backup:'Pavan Manikonda', sla:'2h',  rr:false, on:true},
          {vert:'Hospitality',  primary:'Pavan Manikonda', backup:'Arun Manikonda',  sla:'4h',  rr:false, on:true},
          {vert:'HORECA',       primary:'Amit Jhingan',    backup:'Pavan Manikonda', sla:'1h',  rr:false, on:true},
          {vert:'Entertainment',primary:'Arun Manikonda',  backup:'Amit Jhingan',    sla:'4h',  rr:true,  on:true},
          {vert:'Debt',         primary:'Arun Manikonda',  backup:'—',               sla:'24h', rr:false, on:true},
          {vert:'Website Forms',primary:'',                backup:'',                sla:'30m', rr:true,  on:true},
        ].map(r=>`<tr>
          <td style="font-weight:600;font-size:.82rem;">${r.vert}</td>
          <td><select class="ig-input" style="font-size:.75rem;padding:.15rem .35rem;border:1px solid var(--border);"><option>${r.primary||'Select...'}</option><option>Arun Manikonda</option><option>Pavan Manikonda</option><option>Amit Jhingan</option></select></td>
          <td><select class="ig-input" style="font-size:.75rem;padding:.15rem .35rem;border:1px solid var(--border);"><option>${r.backup||'None'}</option><option>Arun Manikonda</option><option>Pavan Manikonda</option><option>Amit Jhingan</option><option>None</option></select></td>
          <td><input type="text" class="ig-input" value="${r.sla}" style="font-size:.75rem;padding:.15rem .35rem;max-width:60px;border:1px solid var(--border);"></td>
          <td><input type="checkbox" ${r.rr?'checked':''} onchange="igToast('Round-robin ${r.rr?'disabled':'enabled'} for ${r.vert}','info')"></td>
          <td><span class="badge ${r.on?'b-gr':'b-dk'}">${r.on?'Active':'Off'}</span></td>
        </tr>`).join('')}
      </tbody></table>
    </div>
  </div>

  <script>
  window.igCalcComm = function(){
    var deal = parseFloat(document.getElementById('comm-deal-val').value)||0;
    var rate = parseFloat(document.getElementById('comm-rate').value)||0;
    var comm = (deal * rate / 100);
    var el = document.getElementById('comm-calc');
    if(el) el.value = '₹' + comm.toLocaleString('en-IN');
  };
  /* ── Commission: load live data from API ── */
  if(typeof igApi !== 'undefined'){
    igApi.get('/sales/commission/summary').then(function(d){
      if(!d) return;
      var el=document.getElementById('sales-comm-total'); if(el) el.textContent='₹'+(d.total_payable/100000).toFixed(1)+'L';
      var el2=document.getElementById('sales-comm-pending'); if(el2) el2.textContent='₹'+(d.pending_payout/100000).toFixed(1)+'L pending';
      var el3=document.getElementById('sales-comm-period'); if(el3) el3.textContent=d.period;
    });
  }
  window.igAssignLead = function(leadId, vertical){
    igApi.post('/sales/lead/assign',{lead_id:leadId, vertical:vertical||'General'}).then(function(d){
      if(d && d.assigned_to) igToast(leadId+' assigned to '+d.assigned_to,'success');
      else igToast(leadId+' assignment queued','info');
    });
  };
  </script>`
  return c.html(layout('Commission Engine', salesShell('Commission Engine', 'commission', body), {noNav:true,noFooter:true}))
})

export default app
