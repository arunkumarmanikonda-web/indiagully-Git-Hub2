import { Hono } from 'hono'
import { layout } from '../lib/layout'
import { LISTINGS } from '../lib/constants'

const app = new Hono()

// ── PIPELINE DATA ─────────────────────────────────────────────────────────────
// Sector breakdown for donut chart
const SECTOR_DATA = [
  { sector: 'Real Estate',          value: 900, color: '#1A3A6B', pct: 77.3 },
  { sector: 'Hospitality',          value: 245, color: '#065F46', pct: 21.1 },
  { sector: 'Debt & Special',       value: 20,  color: '#b91c1c', pct: 1.7  },
]

// Status stages
const STAGE_CONFIG: Record<string, { label: string; color: string; icon: string; order: number }> = {
  active:      { label: 'Active Fundraise',    color: '#16a34a', icon: 'rocket',         order: 1 },
  negotiation: { label: 'Due Diligence',        color: '#B8960C', icon: 'handshake',      order: 2 },
  feasibility: { label: 'Feasibility Stage',   color: '#7C3AED', icon: 'microscope',     order: 3 },
  listed:      { label: 'Listed',              color: '#0369a1', icon: 'list',           order: 4 },
  completed:   { label: 'Completed',           color: '#6B7280', icon: 'check-circle',   order: 5 },
}

// Deal size buckets for waterfall
const DEAL_BUCKETS = [
  { label: '₹0–50 Cr',    min: 0,   max: 50,   count: 0, total: 0, color: '#16a34a' },
  { label: '₹50–100 Cr',  min: 50,  max: 100,  count: 0, total: 0, color: '#0369a1' },
  { label: '₹100–200 Cr', min: 100, max: 200,  count: 0, total: 0, color: '#7C3AED' },
  { label: '₹200 Cr+',    min: 200, max: 99999,count: 0, total: 0, color: '#B8960C' },
]

// Helper: parse value string to number (₹400 Cr → 400)
function parseValue(v: string): number {
  const m = v.match(/[\d,]+/)
  return m ? parseFloat(m[0].replace(/,/g, '')) : 0
}

// Populate deal buckets from LISTINGS
const listings = LISTINGS as any[]
for (const l of listings) {
  const val = parseValue(l.value || '0')
  for (const b of DEAL_BUCKETS) {
    if (val > b.min && val <= b.max) { b.count++; b.total += val; break }
  }
}

// ── PIPELINE PAGE ─────────────────────────────────────────────────────────────
app.get('/', (c) => {

  // Group mandates by stage
  const grouped: Record<string, any[]> = {}
  for (const l of listings) {
    const st = (l.statusType || 'listed') as string
    if (!grouped[st]) grouped[st] = []
    grouped[st].push(l)
  }

  // Sector aggregation
  const bySector: Record<string, { count: number; total: number }> = {}
  for (const l of listings) {
    const s = l.sector || 'Other'
    if (!bySector[s]) bySector[s] = { count: 0, total: 0 }
    bySector[s].count++
    bySector[s].total += parseValue(l.value || '0')
  }

  // Donut chart segments (SVG)
  const total = SECTOR_DATA.reduce((sum, s) => sum + s.value, 0)
  const CIRCUMFERENCE = 2 * Math.PI * 54  // radius 54
  let offset = 0
  const donutSegments = SECTOR_DATA.map(s => {
    const dash = (s.value / total) * CIRCUMFERENCE
    const gap  = CIRCUMFERENCE - dash
    const seg  = `<circle cx="64" cy="64" r="54" fill="none" stroke="${s.color}" stroke-width="20"
      stroke-dasharray="${dash.toFixed(2)} ${gap.toFixed(2)}"
      stroke-dashoffset="${(-offset).toFixed(2)}"
      style="transition:stroke-dashoffset .4s;"/>`
    offset += dash
    return seg
  }).join('')

  // Stage pipeline timeline
  const stageOrder = ['active', 'negotiation', 'feasibility', 'listed', 'completed']

  const content = `
<style>
/* ── Pipeline Dashboard ─────────────────────────────────────── */
.pip-hero{background:linear-gradient(135deg,#060608 0%,#0a0a12 60%,#111118 100%);padding:calc(7rem - var(--nav-h)) 0 4rem;position:relative;overflow:hidden;}
.pip-grid-bg{position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.04) 1px,transparent 1px);background-size:72px 72px;pointer-events:none;}
.pip-glow{position:absolute;inset:0;background:radial-gradient(ellipse 70% 60% at 50% 100%,rgba(184,150,12,.08) 0%,transparent 60%);pointer-events:none;}

.pip-kpi-grid{display:grid;grid-template-columns:repeat(5,1fr);border-left:1px solid rgba(255,255,255,.07);}
.pip-kpi{padding:2rem 1.5rem;border-right:1px solid rgba(255,255,255,.07);text-align:center;transition:background .22s;}
.pip-kpi:hover{background:rgba(184,150,12,.04);}
.pip-kpi-n{font-family:'DM Serif Display',Georgia,serif;font-size:2rem;color:var(--gold);line-height:1;margin-bottom:.45rem;letter-spacing:-.03em;}
.pip-kpi-l{font-size:.58rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.42);}

/* Timeline */
.pip-timeline{position:relative;padding-left:2.5rem;}
.pip-timeline::before{content:'';position:absolute;left:.75rem;top:0;bottom:0;width:2px;background:linear-gradient(to bottom,var(--gold),rgba(184,150,12,.1));}
.pip-stage{position:relative;margin-bottom:2.5rem;}
.pip-stage-dot{position:absolute;left:-1.875rem;top:.2rem;width:16px;height:16px;border-radius:50%;border:2px solid var(--gold);background:var(--ink);display:flex;align-items:center;justify-content:center;}
.pip-stage-dot::after{content:'';width:6px;height:6px;border-radius:50%;background:var(--gold);}
.pip-stage-head{display:flex;align-items:center;gap:.875rem;margin-bottom:1rem;}
.pip-stage-badge{font-size:.6rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;padding:.28rem .75rem;border:1px solid;border-radius:20px;}
.pip-stage-count{font-size:.7rem;color:var(--ink-faint);background:rgba(10,10,10,.04);border:1px solid var(--border);padding:.2rem .55rem;border-radius:10px;}
.pip-mandate-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:1rem;}
.pip-mandate-card{background:#fff;border:1px solid var(--border);padding:1.25rem;position:relative;transition:all .25s;overflow:hidden;cursor:pointer;text-decoration:none;display:block;}
.pip-mandate-card::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;}
.pip-mandate-card:hover{box-shadow:0 8px 28px rgba(0,0,0,.1);border-color:rgba(184,150,12,.3);transform:translateY(-2px);}
.pip-mandate-card-title{font-family:'DM Serif Display',Georgia,serif;font-size:.92rem;color:var(--ink);line-height:1.25;margin-bottom:.35rem;}
.pip-mandate-card-loc{font-size:.68rem;color:var(--ink-muted);display:flex;align-items:center;gap:.3rem;margin-bottom:.5rem;}
.pip-mandate-card-val{font-size:.82rem;font-weight:700;color:var(--gold);}

/* Donut chart */
.pip-donut-wrap{position:relative;width:128px;height:128px;margin:0 auto 1.5rem;}
.pip-donut-wrap svg{transform:rotate(-90deg);}
.pip-donut-center{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;}

/* Waterfall bars */
.pip-wf-bar{height:200px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;position:relative;}
.pip-wf-fill{width:100%;transition:height .6s ease;position:relative;}
.pip-wf-val{position:absolute;top:-1.6rem;left:0;right:0;text-align:center;font-size:.68rem;font-weight:700;color:var(--ink);}

/* Sector legend */
.pip-sector-row{display:flex;align-items:center;gap:.75rem;padding:.625rem 0;border-bottom:1px solid var(--border);}
.pip-sector-row:last-child{border-bottom:none;}
.pip-sector-dot{width:10px;height:10px;flex-shrink:0;border-radius:2px;}
.pip-sector-name{font-size:.78rem;font-weight:600;color:var(--ink);flex:1;}
.pip-sector-val{font-size:.75rem;color:var(--gold);font-weight:700;}
.pip-sector-pct{font-size:.65rem;color:var(--ink-faint);min-width:35px;text-align:right;}

/* NDA CTA */
.pip-nda-cta{background:linear-gradient(135deg,var(--ink) 0%,#1a1a2e 100%);border:1px solid rgba(184,150,12,.2);padding:2.5rem;text-align:center;position:relative;overflow:hidden;}
.pip-nda-cta::before{content:'';position:absolute;top:-60px;right:-60px;width:200px;height:200px;background:radial-gradient(circle,rgba(184,150,12,.1),transparent 60%);pointer-events:none;}

@media(max-width:860px){
  .pip-kpi-grid{grid-template-columns:repeat(3,1fr);}
  .pip-mandate-grid{grid-template-columns:1fr;}
}
@media(max-width:580px){
  .pip-kpi-grid{grid-template-columns:repeat(2,1fr);}
  .pip-timeline{padding-left:1.75rem;}
}
</style>

<!-- ══ PIPELINE HERO ══════════════════════════════════════════════════════════ -->
<div class="pip-hero">
  <div class="pip-grid-bg"></div>
  <div class="pip-glow"></div>
  <div class="wrap" style="position:relative;">
    <div style="text-align:center;max-width:780px;margin:0 auto;" class="fu">
      <div style="display:inline-flex;align-items:center;gap:.875rem;background:rgba(184,150,12,.1);border:1px solid rgba(184,150,12,.22);padding:.4rem 1.1rem;margin-bottom:1.75rem;">
        <span style="width:8px;height:8px;background:#16a34a;border-radius:50%;animation:pulse 2s infinite;display:block;"></span>
        <span style="font-size:.62rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);">Live Investor Pipeline</span>
      </div>
      <h1 style="font-family:'DM Serif Display',Georgia,serif;font-size:clamp(2.2rem,5vw,3.5rem);color:#fff;line-height:1.1;margin-bottom:1.25rem;">₹1,165 Cr+ Active<br><em style="color:var(--gold);font-style:italic;">Advisory Pipeline</em></h1>
      <p style="font-size:1rem;color:rgba(255,255,255,.55);line-height:1.85;max-width:620px;margin:0 auto 2.5rem;">India Gully's live mandate pipeline across Real Estate, Hospitality, Debt & Special Situations — updated continuously from active advisory engagements.</p>
      <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
        <a href="#timeline" class="btn btn-g" style="min-width:180px;justify-content:center;"><i class="fas fa-stream" style="margin-right:.5rem;font-size:.72rem;"></i>View Timeline</a>
        <a href="#analytics" class="btn btn-go" style="min-width:180px;justify-content:center;border-color:rgba(184,150,12,.4);color:rgba(184,150,12,.9);"><i class="fas fa-chart-pie" style="margin-right:.5rem;font-size:.72rem;"></i>Analytics</a>
        <a href="/listings" class="btn btn-dko" style="min-width:180px;justify-content:center;"><i class="fas fa-list" style="margin-right:.5rem;font-size:.72rem;"></i>All Mandates</a>
      </div>
    </div>
  </div>
</div>

<!-- ══ KPI METRICS ═════════════════════════════════════════════════════════════ -->
<div style="background:#0a0a10;border-bottom:1px solid rgba(255,255,255,.07);">
  <div class="wrap" style="padding:0;">
    <div class="pip-kpi-grid">
      ${[
        { n: '₹1,165 Cr+', l: 'Active Pipeline',         sub: 'Total advisory value' },
        { n: `${listings.length}`,  l: 'Active Mandates',  sub: 'Open to qualified investors' },
        { n: '5',           l: 'Sectors',                  sub: 'Diversified verticals' },
        { n: '8+',          l: 'Years',                    sub: 'Advisory track record' },
        { n: '₹2,000 Cr+',  l: 'Transactions Advised',     sub: 'Since inception 2017' },
      ].map(s => `
      <div class="pip-kpi">
        <div class="pip-kpi-n">${s.n}</div>
        <div class="pip-kpi-l">${s.l}</div>
        <div style="font-size:.58rem;color:rgba(255,255,255,.3);margin-top:.2rem;">${s.sub}</div>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- ══ ANALYTICS SECTION ══════════════════════════════════════════════════════ -->
<div class="sec-wh" id="analytics" style="padding-top:5rem;padding-bottom:5rem;">
  <div class="wrap">
    <div style="text-align:center;margin-bottom:3.5rem;" class="fu">
      <p style="font-size:.62rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:.75rem;">Portfolio Analytics</p>
      <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:2rem;color:var(--ink);margin-bottom:.75rem;">Pipeline at a Glance</h2>
      <p style="font-size:.9rem;color:var(--ink-muted);max-width:520px;margin:0 auto;">Sector diversification, deal-size distribution and stage breakdown across all active mandates.</p>
    </div>

    <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:2rem;" class="mob-stack">

      <!-- ── SECTOR DONUT ── -->
      <div style="background:var(--parch);border:1px solid var(--border);padding:2rem;">
        <p style="font-size:.62rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:1.5rem;display:flex;align-items:center;gap:.4rem;"><i class="fas fa-chart-pie" style="color:var(--gold);"></i>Sector Mix</p>
        <!-- SVG Donut -->
        <div class="pip-donut-wrap">
          <svg viewBox="0 0 128 128" width="128" height="128">
            ${donutSegments}
            <circle cx="64" cy="64" r="44" fill="var(--parch)"/>
          </svg>
          <div class="pip-donut-center">
            <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--gold);line-height:1;">₹${total}Cr</div>
            <div style="font-size:.55rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-top:.2rem;">Pipeline</div>
          </div>
        </div>
        <!-- Legend -->
        <div>
          ${SECTOR_DATA.map(s => `
          <div class="pip-sector-row">
            <div class="pip-sector-dot" style="background:${s.color};"></div>
            <div class="pip-sector-name">${s.sector}</div>
            <div class="pip-sector-val">₹${s.value} Cr</div>
            <div class="pip-sector-pct">${s.pct}%</div>
          </div>`).join('')}
        </div>
      </div>

      <!-- ── DEAL SIZE WATERFALL ── -->
      <div style="background:var(--parch);border:1px solid var(--border);padding:2rem;">
        <p style="font-size:.62rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:1.5rem;display:flex;align-items:center;gap:.4rem;"><i class="fas fa-chart-bar" style="color:var(--gold);"></i>Deal Size Distribution</p>
        <!-- Bar chart -->
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:.5rem;align-items:end;height:200px;margin-bottom:1rem;">
          ${DEAL_BUCKETS.map(b => {
            const maxCount = Math.max(...DEAL_BUCKETS.map(x => x.count), 1)
            const heightPct = b.count > 0 ? Math.max(12, (b.count / maxCount) * 100) : 4
            return `<div class="pip-wf-bar">
              <div class="pip-wf-fill" style="height:${heightPct}%;background:${b.color};position:relative;">
                ${b.count > 0 ? `<div class="pip-wf-val">${b.count}</div>` : ''}
              </div>
            </div>`
          }).join('')}
        </div>
        <!-- X axis labels -->
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:.5rem;margin-top:.5rem;">
          ${DEAL_BUCKETS.map(b => `<div style="font-size:.56rem;font-weight:600;color:var(--ink-muted);text-align:center;line-height:1.3;">${b.label}</div>`).join('')}
        </div>
        <!-- Legend note -->
        <p style="font-size:.68rem;color:var(--ink-faint);margin-top:1.25rem;text-align:center;line-height:1.5;">Numbers show mandate count per ticket-size bucket</p>
      </div>

      <!-- ── STAGE BREAKDOWN ── -->
      <div style="background:var(--parch);border:1px solid var(--border);padding:2rem;">
        <p style="font-size:.62rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:1.5rem;display:flex;align-items:center;gap:.4rem;"><i class="fas fa-layer-group" style="color:var(--gold);"></i>Stage Breakdown</p>
        <div style="display:flex;flex-direction:column;gap:.75rem;">
          ${stageOrder.map(st => {
            const cfg = STAGE_CONFIG[st]
            const items = grouped[st] || []
            if (!items.length) return ''
            const total = items.reduce((s: number, l: any) => s + parseValue(l.value || '0'), 0)
            return `
            <div style="display:flex;align-items:center;gap:.875rem;padding:.875rem;border:1px solid var(--border);background:#fff;transition:all .2s;" onmouseover="this.style.borderColor='${cfg.color}44'" onmouseout="this.style.borderColor='var(--border)'">
              <div style="width:32px;height:32px;background:${cfg.color}18;border:1px solid ${cfg.color}33;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                <i class="fas fa-${cfg.icon}" style="color:${cfg.color};font-size:.68rem;"></i>
              </div>
              <div style="flex:1;min-width:0;">
                <div style="font-size:.75rem;font-weight:600;color:var(--ink);">${cfg.label}</div>
                <div style="font-size:.62rem;color:var(--ink-faint);margin-top:.15rem;">${items.length} mandate${items.length > 1 ? 's' : ''} · ₹${total} Cr</div>
              </div>
              <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.25rem;color:${cfg.color};font-weight:700;">${items.length}</div>
            </div>`
          }).join('')}
        </div>
      </div>

    </div>
  </div>
</div>

<!-- ══ PIPELINE TIMELINE ══════════════════════════════════════════════════════ -->
<div style="background:var(--bg-2);padding:5rem 0;" id="timeline">
  <div class="wrap">
    <div style="text-align:center;margin-bottom:3.5rem;" class="fu">
      <p style="font-size:.62rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:.75rem;">Mandate Status Timeline</p>
      <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:2rem;color:var(--ink);margin-bottom:.75rem;">Active Pipeline by Stage</h2>
      <p style="font-size:.9rem;color:var(--ink-muted);max-width:520px;margin:0 auto;">Each mandate progresses through our advisory process — from initial listing through due diligence to transaction close.</p>
    </div>

    <div class="pip-timeline">
      ${stageOrder.map(st => {
        const cfg = STAGE_CONFIG[st]
        const items = grouped[st] || []
        if (!items.length) return ''
        return `
        <div class="pip-stage">
          <div class="pip-stage-dot" style="border-color:${cfg.color};background:var(--bg-2);">
            <i class="fas fa-${cfg.icon}" style="color:${cfg.color};font-size:.45rem;position:absolute;"></i>
          </div>
          <div class="pip-stage-head">
            <span class="pip-stage-badge" style="color:${cfg.color};border-color:${cfg.color}44;background:${cfg.color}12;">${cfg.label}</span>
            <span class="pip-stage-count">${items.length} Mandate${items.length > 1 ? 's' : ''}</span>
            <span style="font-size:.68rem;color:var(--ink-faint);">₹${items.reduce((s: number, l: any) => s + parseValue(l.value || '0'), 0)} Cr total</span>
          </div>
          <div class="pip-mandate-grid">
            ${items.map((l: any) => `
            <a href="/listings/${l.id}" class="pip-mandate-card" style="--accent:${cfg.color};">
              <div style="position:absolute;left:0;top:0;bottom:0;width:3px;background:${cfg.color};"></div>
              <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:.5rem;margin-bottom:.625rem;">
                <div>
                  <div class="pip-mandate-card-title">${l.title}</div>
                  <div class="pip-mandate-card-loc"><i class="fas fa-map-marker-alt" style="color:${cfg.color};font-size:.55rem;"></i>${l.location || ''}</div>
                </div>
                <div style="flex-shrink:0;background:${cfg.color}14;border:1px solid ${cfg.color}30;padding:.3rem .55rem;text-align:center;">
                  <div class="pip-mandate-card-val">${l.value}</div>
                  <div style="font-size:.55rem;color:var(--ink-faint);letter-spacing:.06em;">${l.valueUSD || ''}</div>
                </div>
              </div>
              <div style="display:flex;align-items:center;gap:.5rem;flex-wrap:wrap;">
                <span style="font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;background:${cfg.color}12;color:${cfg.color};border:1px solid ${cfg.color}30;padding:.15rem .5rem;">${l.sector}</span>
                <span style="font-size:.62rem;color:var(--ink-faint);">${l.mandateType || 'Advisory'}</span>
                <span style="margin-left:auto;font-size:.62rem;color:${cfg.color};font-weight:600;"><i class="fas fa-arrow-right" style="font-size:.55rem;"></i></span>
              </div>
            </a>`).join('')}
          </div>
        </div>`
      }).join('')}
    </div>
  </div>
</div>

<!-- ══ NDA REQUEST CTA ════════════════════════════════════════════════════════ -->
<div class="sec-pc" style="padding-top:5rem;padding-bottom:5rem;" id="nda-request">
  <div class="wrap">
    <div class="pip-nda-cta">
      <div style="position:absolute;bottom:-40px;left:-40px;width:160px;height:160px;background:radial-gradient(circle,rgba(184,150,12,.06),transparent 65%);pointer-events:none;"></div>
      <div style="position:relative;">
        <div style="display:inline-flex;align-items:center;gap:.5rem;background:rgba(184,150,12,.12);border:1px solid rgba(184,150,12,.25);padding:.35rem .9rem;margin-bottom:1.5rem;">
          <i class="fas fa-shield-alt" style="color:var(--gold);font-size:.7rem;"></i>
          <span style="font-size:.62rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);">NDA-Protected Access</span>
        </div>
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:clamp(1.6rem,3vw,2.25rem);color:#fff;margin-bottom:1rem;max-width:560px;margin-left:auto;margin-right:auto;">Access Full Investment<br>Memoranda & Teaser Decks</h2>
        <p style="font-size:.9rem;color:rgba(255,255,255,.5);line-height:1.85;max-width:500px;margin:0 auto 2rem;">Qualified investors, family offices and PE funds may request detailed IMs, financial models and site data under India Gully's standard mutual NDA framework.</p>
        <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;margin-bottom:2rem;">
          <a href="/listings" class="btn btn-g" style="min-width:200px;justify-content:center;"><i class="fas fa-file-contract" style="margin-right:.5rem;font-size:.72rem;"></i>View & Accept NDA</a>
          <a href="/contact?service=Investor+Relations" class="btn btn-go" style="min-width:200px;justify-content:center;border-color:rgba(184,150,12,.4);color:rgba(184,150,12,.9);"><i class="fas fa-envelope" style="margin-right:.5rem;font-size:.72rem;"></i>Direct Enquiry</a>
        </div>
        <div style="display:flex;gap:2rem;justify-content:center;flex-wrap:wrap;">
          ${[
            { icon: 'building', text: 'Institutional-grade IMs available' },
            { icon: 'lock',     text: 'Mutual NDA framework — all mandates' },
            { icon: 'user-tie', text: 'Direct advisor access post-NDA' },
          ].map(f => `
          <div style="display:flex;align-items:center;gap:.5rem;">
            <i class="fas fa-${f.icon}" style="color:var(--gold);font-size:.75rem;"></i>
            <span style="font-size:.72rem;color:rgba(255,255,255,.45);">${f.text}</span>
          </div>`).join('')}
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ══ DISCLOSURE ═════════════════════════════════════════════════════════════ -->
<div style="background:#f8f5ef;border-top:1px solid var(--border);padding:2rem 0;">
  <div class="wrap" style="max-width:860px;text-align:center;">
    <p style="font-size:.68rem;color:var(--ink-faint);line-height:1.75;"><strong style="color:var(--ink-soft);">Pipeline Disclosure:</strong> Mandate values reflect advisory engagement scopes and indicative transaction sizes. Actual transaction values may differ. This page is for qualified investor use only and does not constitute a public offer or solicitation. All mandates are subject to NDA and India Gully's standard engagement terms. India Gully is registered under MCA: CIN U74999DL2017PTC323237 · GSTIN 07AAGCV0867P1ZN.</p>
  </div>
</div>

<style>@keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}</style>
`

  return c.html(layout('Investor Pipeline Dashboard — India Gully', content, {
    description: 'India Gully\'s live investor pipeline dashboard — ₹1,165 Cr+ in active advisory mandates across Real Estate, Hospitality, Retail, Entertainment and Debt verticals. NDA-protected access available.',
    canonical: 'https://india-gully.pages.dev/pipeline',
    ogImage: 'https://india-gully.pages.dev/static/og-listings.jpg',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Investor Pipeline Dashboard — India Gully',
      description: 'Live advisory pipeline of ₹1,165 Cr+ across Real Estate, Hospitality, and Debt verticals.',
      url: 'https://india-gully.pages.dev/pipeline',
      publisher: { '@type': 'Organization', name: 'India Gully', url: 'https://india-gully.pages.dev' }
    }
  }))
})

export default app
