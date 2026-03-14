import { Hono } from 'hono'
import { layout } from '../lib/layout'
import { LISTINGS } from '../lib/constants'

const app = new Hono()

// ── HELPER: sector color ──────────────────────────────────────────────────────
function sectorPill(sector: string, color: string) {
  return `<span style="display:inline-flex;align-items:center;gap:.3rem;font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;background:${color}22;color:${color};border:1px solid ${color}44;padding:.22rem .6rem;border-radius:4px;">${sector}</span>`
}

// ── INVESTOR RELATIONS PAGE ───────────────────────────────────────────────────
app.get('/', (c) => {

  // Active mandates for the pipeline table (filter for currently active/fundraise)
  const activeMandates = LISTINGS.filter((l: any) =>
    ['active', 'negotiation', 'listed'].includes(l.statusType) ||
    l.status?.toLowerCase().includes('active') ||
    l.status?.toLowerCase().includes('open') ||
    l.status?.toLowerCase().includes('fundraise')
  )

  // Portfolio summary stats
  const totalPipeline = '₹1,165 Cr+'
  const sectors = ['Real Estate', 'Hospitality', 'Retail', 'Entertainment', 'Debt & Special']

  const content = `
<!-- ══ HERO ══════════════════════════════════════════════════════════════════ -->
<div style="background:linear-gradient(135deg,#060608 0%,#0a0a10 60%,#111118 100%);padding:calc(7rem - var(--nav-h)) 0 5rem;position:relative;overflow:hidden;">
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.04) 1px,transparent 1px);background-size:72px 72px;pointer-events:none;"></div>
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse 60% 55% at 50% 100%,rgba(184,150,12,.08) 0%,transparent 65%);pointer-events:none;"></div>
  <div class="wrap" style="position:relative;text-align:center;">
    <div class="gr-c"></div>
    <p class="eyebrow-lt" style="margin-bottom:1.25rem;">Investor Relations</p>
    <h1 class="h2-lt" style="max-width:720px;margin:0 auto 1.5rem;">Institutional-Grade Mandates.<br>Transaction-Backed Advisory.</h1>
    <p style="font-size:1rem;line-height:1.9;color:rgba(255,255,255,.55);max-width:580px;margin:0 auto 2.5rem;">India Gully is India's premier multi-vertical advisory firm — advising on ₹1,165 Cr+ of active mandates across Real Estate, Hospitality, Retail, Entertainment and Debt verticals.</p>
    <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
      <a href="#pipeline" class="btn btn-g" style="min-width:200px;justify-content:center;">View Active Pipeline</a>
      <a href="#nda-request" class="btn btn-go" style="min-width:200px;justify-content:center;border-color:rgba(184,150,12,.4);color:rgba(184,150,12,.9);">Request Information</a>
    </div>
  </div>
</div>

<!-- ══ KEY METRICS ═══════════════════════════════════════════════════════════ -->
<div style="background:#0a0a10;border-bottom:1px solid rgba(255,255,255,.07);">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:repeat(5,1fr);border-left:1px solid rgba(255,255,255,.07);">
      ${[
        { n: '₹1,165 Cr+', l: 'Active Pipeline',     sub: 'Across all verticals' },
        { n: '₹2,000 Cr+', l: 'Transactions Advised', sub: 'Since inception 2017' },
        { n: '15+',         l: 'Hotel Mandates',       sub: 'Pre-opening & acquisition' },
        { n: '8',           l: 'Active Mandates',       sub: 'Open to qualified investors' },
        { n: '5',           l: 'Verticals',             sub: 'Real Estate · Hospitality · Retail · Entertainment · Debt' },
      ].map(s => `
      <div style="padding:2rem 1.5rem;border-right:1px solid rgba(255,255,255,.07);text-align:center;">
        <div class="count-up" data-target="${s.n}" style="font-family:'DM Serif Display',Georgia,serif;font-size:2.2rem;color:var(--gold);letter-spacing:-.03em;line-height:1.1;">${s.n}</div>
        <div style="font-size:.65rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.5);margin-top:.5rem;">${s.l}</div>
        <div style="font-size:.62rem;color:rgba(255,255,255,.3);margin-top:.2rem;">${s.sub}</div>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- ══ WHY INVEST ══════════════════════════════════════════════════════════ -->
<div class="sec-pc" style="padding-top:6rem;padding-bottom:6rem;">
  <div class="wrap">
    <div style="text-align:center;max-width:640px;margin:0 auto 4rem;">
      <div class="gr-c"></div>
      <p class="eyebrow" style="margin-bottom:1rem;">The India Gully Advantage</p>
      <h2 class="h2">Why Partner With Us</h2>
      <p class="lead" style="font-size:.95rem;margin-top:1rem;">We source, structure and advise on mandates that institutional investors and family offices typically access only through Big-4 firms — at a fraction of the cost and with deeper sector relationships.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;" class="mob-stack">
      ${[
        { icon:'search-dollar', color:'#B8960C', title:'Proprietary Deal Flow', desc:'Our mandates are sourced directly through developer relationships, not databases. Every listing represents an active engagement with a motivated seller or fundraising entity.' },
        { icon:'shield-alt',    color:'#065F46', title:'NDA-Protected Process', desc:'All investor conversations are protected by mutual NDA from the first interaction. Information Memoranda released only to verified investors.' },
        { icon:'handshake',     color:'#1A3A6B', title:'EY & CBRE Co-Advisory', desc:'Complex transactions benefit from our co-advisory relationships with EY and CBRE — providing institutional underwriting depth and credibility to both sides.' },
        { icon:'map-marked-alt',color:'#7C3AED', title:'Pan-India Presence', desc:'Active mandates in Delhi NCR, Chandigarh, Kasauli, Jaipur, Noida, Gurugram, Mumbai and Kerala — covering Tier 1 to 3 markets.' },
        { icon:'file-contract', color:'#B8960C', title:'Structured IM & Data Room', desc:'Each mandate includes a full Information Memorandum, financial model, legal diligence summary and virtual data room — ready for institutional review.' },
        { icon:'clock',         color:'#065F46', title:'24h Advisory Response', desc:'Qualified investors receive responses within 24 hours. Our team of 3 senior advisors handles all investor enquiries personally.' },
      ].map((c, ci) => `
      <div class="feature-card reveal" style="transition-delay:${ci*0.07}s;padding:1.75rem;">
        <div style="width:42px;height:42px;background:${c.color}18;border:1px solid ${c.color}33;display:flex;align-items:center;justify-content:center;border-radius:8px;margin-bottom:1.25rem;">
          <i class="fas fa-${c.icon}" style="color:${c.color};font-size:.9rem;"></i>
        </div>
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.05rem;color:var(--ink);margin-bottom:.625rem;line-height:1.25;">${c.title}</h3>
        <p style="font-size:.83rem;line-height:1.8;color:var(--ink-soft);">${c.desc}</p>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- ══ ACTIVE PIPELINE ════════════════════════════════════════════════════ -->
<div class="sec-pd" id="pipeline" style="padding-top:6rem;padding-bottom:6rem;">
  <div class="wrap">
    <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:3rem;flex-wrap:wrap;gap:1.5rem;">
      <div>
        <div class="gr"></div>
        <p class="eyebrow" style="margin-bottom:.875rem;">Active Pipeline</p>
        <h2 class="h2">Current Investment<br>Opportunities</h2>
      </div>
      <div style="max-width:380px;text-align:right;">
        <p class="body" style="margin-bottom:1rem;">All mandates are subject to mutual NDA. Indicative values shown; full financial details released post-NDA execution.</p>
        <a href="/listings" class="btn btn-sm btn-dko">View All Mandates</a>
      </div>
    </div>

    <!-- Sector filter pills for pipeline -->
    <div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:2rem;">
      ${['All','Real Estate','Hospitality','Heritage Hospitality','Mixed-Use'].map((s,i) => `
      <button onclick="filterInvest('${s}')" data-isector="${s}"
        class="isect-btn${i===0?' ia':''}"
        style="padding:.38rem 1rem;font-size:.65rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;border:1px solid ${i===0?'var(--gold)':'var(--border)'};background:${i===0?'var(--gold)':'transparent'};color:${i===0?'#fff':'var(--ink-muted)'};cursor:pointer;transition:all .2s;border-radius:2px;"
        onmouseover="if(!this.classList.contains('ia')){this.style.borderColor='var(--gold)';this.style.color='var(--gold)'}"
        onmouseout="if(!this.classList.contains('ia')){this.style.borderColor='var(--border)';this.style.color='var(--ink-muted)'}">${s}</button>
      `).join('')}
    </div>
    <div id="investGrid" style="display:grid;grid-template-columns:repeat(2,1fr);gap:1.25rem;" class="mob-stack">
      ${LISTINGS.slice(0, 6).map((l: any) => `
      <div class="mandate-card reveal" data-sector="${l.sector}" style="background:var(--parch);border:1px solid var(--border);overflow:hidden;transition:all .25s;">
        <!-- Card header with sector color -->
        <div style="padding:1.25rem 1.5rem;background:${l.sectorColor || '#0a0a0a'};position:relative;overflow:hidden;">
          <div style="position:absolute;top:0;right:0;width:80px;height:80px;background:rgba(255,255,255,.04);border-radius:50%;transform:translate(20px,-20px);"></div>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.6rem;">
            ${sectorPill(l.sector, '#fff')}
            <span style="font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.5);">NDA Required</span>
          </div>
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.05rem;color:#fff;line-height:1.3;margin-bottom:.3rem;">${l.title}</h3>
          <p style="font-size:.72rem;color:rgba(255,255,255,.6);">${l.locationShort || l.location}</p>
        </div>
        <!-- Card body -->
        <div style="padding:1.25rem 1.5rem;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.875rem;flex-wrap:wrap;gap:.5rem;">
            <div>
              <div style="font-size:.58rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.2rem;">Indicative Value</div>
              <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.45rem;color:var(--ink);letter-spacing:-.02em;">${l.value}</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:.58rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.2rem;">Mandate Type</div>
              <div style="font-size:.78rem;font-weight:600;color:var(--ink);">${l.mandateType || 'Transaction Advisory'}</div>
            </div>
          </div>
          <p style="font-size:.8rem;line-height:1.75;color:var(--ink-soft);margin-bottom:1rem;">${l.desc.substring(0, 120)}…</p>
          <div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-bottom:1rem;">
            ${(l.tags || []).slice(0, 3).map((t: string) => `<span style="font-size:.58rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;background:var(--parch-dk);color:var(--ink-muted);padding:.2rem .5rem;border-radius:3px;">${t}</span>`).join('')}
          </div>
          <div style="display:flex;gap:.625rem;align-items:center;padding-top:.875rem;border-top:1px solid var(--border);">
            <a href="/listings/${l.id}" class="btn btn-g" style="font-size:.68rem;padding:.45rem 1rem;flex:1;text-align:center;justify-content:center;">View Mandate</a>
            <a href="#nda-request" class="btn btn-sm btn-dko" style="font-size:.68rem;padding:.45rem 1rem;">Request NDA</a>
          </div>
        </div>
      </div>`).join('')}
    </div>

    <div style="text-align:center;margin-top:2.5rem;">
      <a href="/listings" class="btn btn-dk" style="min-width:240px;justify-content:center;">
        <i class="fas fa-th-list" style="margin-right:.5rem;"></i>View All ${LISTINGS.length} Active Mandates
      </a>
    </div>
  </div>
</div>

<!-- ══ TRACK RECORD ════════════════════════════════════════════════════════ -->
<div class="diff-section" style="padding:6rem 0;position:relative;overflow:hidden;">
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse 55% 60% at 50% 50%,rgba(184,150,12,.07) 0%,transparent 65%);pointer-events:none;"></div>
  <div class="wrap" style="position:relative;">
    <div style="text-align:center;margin-bottom:4rem;">
      <div class="gr-c"></div>
      <p class="eyebrow-lt" style="margin-bottom:1rem;">Track Record</p>
      <h2 class="h2-lt">Proven Execution.<br>₹2,000+ Cr Advised.</h2>
      <p style="font-size:.95rem;color:rgba(255,255,255,.55);max-width:520px;margin:.875rem auto 0;line-height:1.8;">A selection of landmark transactions across sectors, anchoring our credibility as India's institutional advisory partner.</p>
    </div>

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.08);" class="mob-stack-bg">
      ${[
        { sector:'Entertainment', value:'₹1,350 Cr+', deal:'Entertainment City Limited Divestment', location:'Noida', co:'Joint advisory with EY', year:'2022', icon:'ticket-alt', color:'#B8960C' },
        { sector:'Real Estate',   value:'₹400 Cr',    deal:'Prism Tower Mixed-Use Acquisition',    location:'Gurugram', co:'Asset acquisition advisory', year:'2025', icon:'building', color:'#1A3A6B' },
        { sector:'Hospitality',   value:'₹415 Cr',    deal:'Boutique Hotel Platform Rollout',       location:'Chandigarh · Delhi NCR', co:'15+ hotel pre-openings', year:'2017–26', icon:'hotel', color:'#065F46' },
        { sector:'Retail',        value:'₹1,40,000 Sq Ft', deal:'Premium Retail & F&B Leasing',  location:'Gardens Galleria · Hyatt Andaz · AIPL Joy Street', co:'30+ brand placements', year:'2019–26', icon:'store', color:'#7C3AED' },
        { sector:'HORECA',        value:'15+ Properties', deal:'End-to-End HORECA Procurement',   location:'Pan-India', co:'Mahindra · Accor · CGH Earth', year:'2020–26', icon:'utensils', color:'#B8960C' },
        { sector:'Debt',          value:'Ongoing',    deal:'Debt & Special Situations Advisory',  location:'Delhi NCR · Mumbai', co:'Distressed asset resolution', year:'2023–26', icon:'balance-scale', color:'#DC2626' },
      ].map((t, ti) => `
      <div style="background:rgba(255,255,255,.03);padding:2.25rem 2rem;transition:background .2s;" onmouseover="this.style.background='rgba(255,255,255,.06)'" onmouseout="this.style.background='rgba(255,255,255,.03)'">
        <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1.25rem;">
          <div style="width:38px;height:38px;background:${t.color}22;border:1px solid ${t.color}44;display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;">
            <i class="fas fa-${t.icon}" style="color:${t.color};font-size:.8rem;"></i>
          </div>
          <span style="font-size:.58rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:${t.color};">${t.sector}</span>
        </div>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.6rem;color:var(--gold);letter-spacing:-.02em;margin-bottom:.5rem;">${t.value}</div>
        <h4 style="font-family:'DM Serif Display',Georgia,serif;font-size:.95rem;color:#fff;line-height:1.3;margin-bottom:.5rem;">${t.deal}</h4>
        <p style="font-size:.72rem;color:rgba(255,255,255,.4);margin-bottom:.25rem;"><i class="fas fa-map-marker-alt" style="color:var(--gold);font-size:.6rem;margin-right:.3rem;"></i>${t.location}</p>
        <p style="font-size:.72rem;color:rgba(255,255,255,.35);">${t.co} · ${t.year}</p>
      </div>`).join('')}
    </div>

    <div style="text-align:center;margin-top:2.5rem;">
      <a href="/works" style="font-size:.78rem;color:rgba(184,150,12,.8);text-decoration:none;display:inline-flex;align-items:center;gap:.4rem;" onmouseover="this.style.color='#D4AE2A'" onmouseout="this.style.color='rgba(184,150,12,.8)'">
        Full Track Record <i class="fas fa-arrow-right" style="font-size:.65rem;"></i>
      </a>
    </div>
  </div>
</div>

<!-- ══ NDA REQUEST FORM ══════════════════════════════════════════════════ -->
<div class="sec-wh" id="nda-request" style="padding-top:6rem;padding-bottom:6rem;">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:start;" class="mob-stack">

      <!-- LEFT: Info -->
      <div>
        <div class="gr"></div>
        <p class="eyebrow" style="margin-bottom:1rem;">Investor Enquiry</p>
        <h2 class="h2" style="margin-bottom:1.5rem;">Request an<br>Information Pack</h2>
        <p class="lead" style="font-size:.9375rem;margin-bottom:2rem;">Qualified investors receive a full Information Memorandum, financial summary and data-room access within 24 hours of NDA execution.</p>

        <div style="display:flex;flex-direction:column;gap:1.25rem;margin-bottom:2.5rem;">
          ${[
            { icon:'clock', title:'24h Turnaround', desc:'Information pack dispatched within one business day of NDA execution.' },
            { icon:'file-contract', title:'Full IM Included', desc:'Detailed Information Memorandum with financial model, valuation and deal structure.' },
            { icon:'shield-alt', title:'Mutual NDA Protection', desc:'All information shared under a mutual NDA. Your identity is protected.' },
            { icon:'user-tie', title:'Senior Advisor Assigned', desc:'Arun Kumar Manikonda (MD) or Pavan Manikonda (ED) handles all investor communications personally.' },
          ].map(i => `
          <div style="display:flex;gap:.875rem;align-items:flex-start;">
            <div style="width:36px;height:36px;background:rgba(184,150,12,.08);border:1px solid rgba(184,150,12,.2);display:flex;align-items:center;justify-content:center;border-radius:6px;flex-shrink:0;">
              <i class="fas fa-${i.icon}" style="color:var(--gold);font-size:.78rem;"></i>
            </div>
            <div>
              <div style="font-size:.85rem;font-weight:700;color:var(--ink);margin-bottom:.2rem;">${i.title}</div>
              <div style="font-size:.78rem;color:var(--ink-soft);line-height:1.65;">${i.desc}</div>
            </div>
          </div>`).join('')}
        </div>

        <!-- Contact shortcuts -->
        <div style="display:flex;gap:.625rem;flex-wrap:wrap;">
          <a href="https://wa.me/918988988988?text=Hi%20India%20Gully%2C%20I%20am%20an%20investor%20and%20would%20like%20to%20receive%20an%20information%20pack%20on%20your%20active%20mandates." target="_blank" rel="noopener"
             class="btn btn-g" style="font-size:.72rem;padding:.55rem 1.25rem;display:inline-flex;align-items:center;gap:.4rem;">
            <i class="fab fa-whatsapp"></i>WhatsApp Arun
          </a>
          <a href="tel:+919810889134" class="btn btn-sm btn-dko" style="font-size:.72rem;padding:.55rem 1.25rem;">
            <i class="fas fa-phone-alt" style="margin-right:.3rem;font-size:.68rem;"></i>+91 98108 89134
          </a>
        </div>
      </div>

      <!-- RIGHT: Form -->
      <div style="background:var(--parch);border:1px solid var(--border);padding:2.5rem;">
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.35rem;color:var(--ink);margin-bottom:.5rem;">Investor Information Request</h3>
        <p style="font-size:.78rem;color:var(--ink-muted);margin-bottom:2rem;">Complete the form below. All enquiries are kept strictly confidential.</p>
        <form class="ig-form" action="/api/enquiry" method="POST" style="display:flex;flex-direction:column;gap:1rem;">
          <input type="hidden" name="type" value="investor_ir">
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
            <div>
              <label class="ig-lbl">Full Name *</label>
              <input type="text" name="name" class="ig-inp" required placeholder="Rajesh Kumar">
            </div>
            <div>
              <label class="ig-lbl">Organisation *</label>
              <input type="text" name="company" class="ig-inp" required placeholder="Family Office / Fund Name">
            </div>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
            <div>
              <label class="ig-lbl">Email Address *</label>
              <input type="email" name="email" class="ig-inp" required placeholder="you@example.com">
            </div>
            <div>
              <label class="ig-lbl">Phone / WhatsApp</label>
              <input type="tel" name="phone" class="ig-inp" placeholder="+91 98XXX XXXXX">
            </div>
          </div>
          <div>
            <label class="ig-lbl">Investor Type *</label>
            <select name="investor_type" class="ig-inp" required>
              <option value="">— Select —</option>
              <option>Family Office</option>
              <option>UHNI / HNI</option>
              <option>Private Equity Fund</option>
              <option>Real Estate Fund</option>
              <option>Hospitality Fund</option>
              <option>Corporate Investor</option>
              <option>NBFC / Finance Company</option>
              <option>Other Institutional</option>
            </select>
          </div>
          <div>
            <label class="ig-lbl">Sector Interest</label>
            <div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.35rem;">
              ${sectors.map(s => `<label style="display:inline-flex;align-items:center;gap:.35rem;font-size:.75rem;color:var(--ink-soft);cursor:pointer;"><input type="checkbox" name="sectors" value="${s}" style="accent-color:var(--gold);"> ${s}</label>`).join('')}
            </div>
          </div>
          <div>
            <label class="ig-lbl">Ticket Size (Indicative)</label>
            <select name="ticket_size" class="ig-inp">
              <option value="">— Prefer not to say —</option>
              <option>Below ₹10 Cr</option>
              <option>₹10 Cr – ₹50 Cr</option>
              <option>₹50 Cr – ₹100 Cr</option>
              <option>₹100 Cr – ₹250 Cr</option>
              <option>₹250 Cr – ₹500 Cr</option>
              <option>Above ₹500 Cr</option>
            </select>
          </div>
          <div>
            <label class="ig-lbl">Specific Mandate Interest</label>
            <textarea name="message" class="ig-inp" rows="3" placeholder="Mention any specific mandates or sectors you'd like more information on. We will match you with the most relevant opportunities."></textarea>
          </div>
          <div style="display:flex;align-items:flex-start;gap:.5rem;">
            <input type="checkbox" name="nda_consent" id="nda-consent-ir" required style="margin-top:.2rem;accent-color:var(--gold);flex-shrink:0;">
            <label for="nda-consent-ir" style="font-size:.72rem;color:var(--ink-soft);line-height:1.6;cursor:pointer;">I agree to execute a mutual NDA with India Gully (Vivacious Entertainment and Hospitality Pvt. Ltd.) prior to receiving any confidential information.</label>
          </div>
          <button type="submit" class="btn btn-g" style="width:100%;justify-content:center;padding:.9rem;font-size:.8rem;">
            <i class="fas fa-paper-plane" style="margin-right:.5rem;"></i>Submit Investor Enquiry
          </button>
          <p style="font-size:.68rem;color:var(--ink-faint);text-align:center;"><i class="fas fa-lock" style="color:var(--gold);font-size:.6rem;margin-right:.3rem;"></i>Your information is never shared. All responses protected by NDA.</p>
        </form>
      </div>

    </div>
  </div>
</div>

<!-- ══ LEADERSHIP ══════════════════════════════════════════════════════════ -->
<div class="sec-dk diff-section" style="padding:6rem 0;">
  <div class="wrap" style="text-align:center;">
    <div class="gr-c"></div>
    <p class="eyebrow-lt" style="margin-bottom:1rem;">Your Advisory Partners</p>
    <h2 class="h2-lt" style="margin-bottom:3rem;">Speak Directly With Leadership</h2>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;max-width:900px;margin:0 auto;" class="mob-stack">
      ${[
        { name:'Arun Kumar Manikonda', title:'Managing Director', ph:'+91 98108 89134', em:'akm@indiagully.com', wa:'918988988988', init:'AK', color:'#B8960C', note:'Primary investor contact. EY co-advisory lead.' },
        { name:'Pavan Kumar Manikonda', title:'Executive Director', ph:'+91 62825 56067', em:'pavan@indiagully.com', wa:'916282556067', init:'PK', color:'#065F46', note:'HORECA & Hospitality mandates.' },
        { name:'Amit Jhingan', title:'President, Real Estate', ph:'+91 98999 93543', em:'amit.jhingan@indiagully.com', wa:'919899993543', init:'AJ', color:'#1A3A6B', note:'Real Estate & Retail mandates.' },
      ].map(p => `
      <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);padding:1.75rem;border-radius:2px;">
        <div style="width:56px;height:56px;background:${p.color};display:flex;align-items:center;justify-content:center;border-radius:50%;margin:0 auto 1rem;font-family:'DM Serif Display',Georgia,serif;font-size:1.2rem;color:#fff;font-weight:400;">${p.init}</div>
        <h4 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:#fff;margin-bottom:.2rem;">${p.name}</h4>
        <p style="font-size:.68rem;color:rgba(184,150,12,.8);font-weight:600;letter-spacing:.06em;text-transform:uppercase;margin-bottom:.5rem;">${p.title}</p>
        <p style="font-size:.72rem;color:rgba(255,255,255,.4);margin-bottom:1rem;font-style:italic;">${p.note}</p>
        <div style="display:flex;flex-direction:column;gap:.4rem;">
          <a href="tel:${p.ph.replace(/\s/g,'')}" style="font-size:.72rem;color:rgba(255,255,255,.6);text-decoration:none;display:flex;align-items:center;gap:.4rem;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.6)'"><i class="fas fa-phone" style="color:var(--gold);width:14px;font-size:.65rem;"></i>${p.ph}</a>
          <a href="mailto:${p.em}" style="font-size:.72rem;color:rgba(255,255,255,.6);text-decoration:none;display:flex;align-items:center;gap:.4rem;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.6)'"><i class="fas fa-envelope" style="color:var(--gold);width:14px;font-size:.65rem;"></i>${p.em}</a>
          <a href="https://wa.me/${p.wa}?text=Hi%2C%20I%20am%20an%20investor%20and%20would%20like%20to%20discuss%20India%20Gully's%20active%20mandates." target="_blank" rel="noopener" style="font-size:.72rem;color:#4ade80;text-decoration:none;display:flex;align-items:center;gap:.4rem;" onmouseover="this.style.color='#86efac'" onmouseout="this.style.color='#4ade80'"><i class="fab fa-whatsapp" style="width:14px;font-size:.72rem;"></i>WhatsApp</a>
        </div>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- ══ LEGAL DISCLAIMER ════════════════════════════════════════════════════ -->
<div class="sec-pd" style="padding-top:3rem;padding-bottom:3rem;">
  <div class="wrap-sm">
    <div style="background:rgba(184,150,12,.06);border:1px solid rgba(184,150,12,.2);padding:1.5rem;">
      <p style="font-size:.7rem;line-height:1.85;color:var(--ink-muted);">
        <strong style="color:var(--ink);">Important Disclaimer:</strong> The information presented on this page is indicative only and does not constitute a solicitation or offer to buy or sell any securities. All investment opportunities are subject to full due diligence, execution of a mutual Non-Disclosure Agreement, and regulatory compliance. Past performance is not indicative of future results. India Gully (Vivacious Entertainment and Hospitality Pvt. Ltd., CIN: U74999DL2017PTC323237) acts as a transaction advisory firm and does not provide investment advice as defined under SEBI regulations. Investors should seek independent legal, financial and tax advice before making any investment decision. All values and pipeline figures are indicative and based on current advisory engagements.
      </p>
    </div>
  </div>
</div>

<script>
function filterInvest(sector) {
  var cards = document.querySelectorAll('#investGrid .mandate-card');
  var btns = document.querySelectorAll('.isect-btn');
  btns.forEach(function(b) {
    var active = b.dataset.isector === sector;
    b.classList.toggle('ia', active);
    b.style.borderColor = active ? 'var(--gold)' : 'var(--border)';
    b.style.background  = active ? 'var(--gold)' : 'transparent';
    b.style.color       = active ? '#fff' : 'var(--ink-muted)';
  });
  cards.forEach(function(c) {
    var match = sector === 'All' || c.dataset.sector === sector;
    c.style.display = match ? 'block' : 'none';
  });
}
</script>
`
  return c.html(layout('Investor Relations — Active Pipeline & Mandates', content, {
    description: 'India Gully Investor Relations — ₹1,165 Cr+ active advisory pipeline across Real Estate, Hospitality, Retail, Entertainment and Debt. Institutional-grade mandates. Request Information Memorandum.',
    canonical: 'https://india-gully.pages.dev/invest',
    ogImage: 'https://india-gully.pages.dev/static/og-invest.jpg',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Investor Relations — India Gully',
      url: 'https://india-gully.pages.dev/invest',
      description: 'Active investment mandates and advisory pipeline for qualified institutional investors and family offices.',
      publisher: {
        '@type': 'Organization',
        name: 'India Gully',
        legalName: 'Vivacious Entertainment and Hospitality Pvt. Ltd.',
        url: 'https://india-gully.pages.dev',
        telephone: '+918988988988',
        email: 'info@indiagully.com'
      }
    }
  }))
})

export default app
