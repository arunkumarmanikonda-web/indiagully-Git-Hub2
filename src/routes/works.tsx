import { Hono } from 'hono'
import { layout } from '../lib/layout'
import { TRACK_RECORD } from '../lib/constants'

const app = new Hono()

// ── COMPLETED WORKS / TRACK RECORD ────────────────────────────────────────────
app.get('/', (c) => {

  const verticals = [
    {
      id: 'real-estate',
      name: 'Real Estate',
      icon: 'building',
      color: '#1A3A6B',
      bg: 'rgba(26,58,107,.08)',
      border: 'rgba(26,58,107,.2)',
      data: TRACK_RECORD.realEstate,
      summary: '₹2,000+ Cr in transactions across South Delhi, Jaipur, Noida & Lutyens\' Delhi.',
      images: [
        'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
      ],
    },
    {
      id: 'retail-leasing',
      name: 'Retail & Leasing',
      icon: 'store',
      color: '#B8960C',
      bg: 'rgba(184,150,12,.08)',
      border: 'rgba(184,150,12,.2)',
      data: TRACK_RECORD.retailLeasing,
      summary: '1,40,000+ sq ft leased across premium destinations in Noida, Delhi & Gurugram.',
      images: [
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
        'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80',
      ],
    },
    {
      id: 'hospitality',
      name: 'Hospitality',
      icon: 'hotel',
      color: '#065F46',
      bg: 'rgba(6,95,70,.08)',
      border: 'rgba(6,95,70,.2)',
      data: TRACK_RECORD.hospitality,
      summary: '9 PMC & signage projects across Noida, Jim Corbett, Gurugram, Tamil Nadu & Aerocity.',
      images: [
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
      ],
    },
    {
      id: 'entertainment',
      name: 'Entertainment',
      icon: 'ticket-alt',
      color: '#7C3AED',
      bg: 'rgba(124,58,237,.08)',
      border: 'rgba(124,58,237,.2)',
      data: TRACK_RECORD.entertainment,
      summary: '₹1,350+ Cr transactions including Adlabs Imagica due diligence & ECL divestment with EY.',
      images: [
        'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
        'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80',
      ],
    },
    {
      id: 'debt',
      name: 'Debt & Special Situations',
      icon: 'balance-scale',
      color: '#92400E',
      bg: 'rgba(146,64,14,.08)',
      border: 'rgba(146,64,14,.2)',
      data: TRACK_RECORD.debt,
      summary: '₹1,350+ Cr structured advisory including joint divestment with EY.',
      images: [
        'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
      ],
    },
    {
      id: 'horeca',
      name: 'HORECA Solutions',
      icon: 'utensils',
      color: '#C2410C',
      bg: 'rgba(194,65,12,.08)',
      border: 'rgba(194,65,12,.2)',
      data: TRACK_RECORD.horeca,
      summary: '9 major HORECA supply mandates including Mahindra Holidays, Accor, Regenta & Cygnett.',
      images: [
        'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
        'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80',
      ],
    },
  ]

  const totalDeals = Object.values(TRACK_RECORD).reduce((s, v) => s + v.length, 0)

  const content = `

<!-- ══ HERO ═══════════════════════════════════════════════════════════════ -->
<div style="background:var(--ink);padding:7rem 0 5rem;position:relative;overflow:hidden;">
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.045) 1px,transparent 1px);background-size:72px 72px;pointer-events:none;"></div>
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse 60% 80% at 20% 50%,rgba(184,150,12,.05) 0%,transparent 70%);pointer-events:none;"></div>
  <div class="wrap" style="position:relative;">
    <div style="max-width:820px;" class="fu">
      <div class="gr-lt"></div>
      <p class="eyebrow" style="margin-bottom:.875rem;">Our Portfolio</p>
      <h1 class="h1" style="margin-bottom:1.5rem;">Completed Works &amp;<br><em style="color:var(--gold);font-style:italic;">Track Record</em></h1>
      <p class="lead-lt" style="max-width:640px;margin-bottom:2.5rem;">A portfolio of landmark transactions, project management mandates, leasing assignments and HORECA supply partnerships executed across India's premier hospitality, real estate, retail and entertainment sectors. Every project reflects India Gully's commitment to institutional rigour and client-first delivery.</p>
      <div style="display:flex;flex-wrap:wrap;gap:.75rem;">
        <button onclick="filterVertical('all')" data-filter="all" class="vert-btn active"
                style="padding:.42rem 1.1rem;font-size:.72rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;border:1px solid var(--gold);background:var(--gold);color:#fff;cursor:pointer;transition:all .2s;">All Verticals</button>
        ${verticals.map(v => `
        <button onclick="filterVertical('${v.id}')" data-filter="${v.id}" class="vert-btn"
                style="padding:.42rem 1.1rem;font-size:.72rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;border:1px solid rgba(255,255,255,.18);background:transparent;color:rgba(255,255,255,.5);cursor:pointer;transition:all .2s;">${v.name}</button>`).join('')}
      </div>
    </div>
  </div>
</div>

<!-- ══ SUMMARY STATS ═════════════════════════════════════════════════════ -->
<div style="background:var(--ink-mid);border-bottom:1px solid rgba(255,255,255,.06);">
  <div class="wrap" style="padding-top:0;padding-bottom:0;">
    <div style="display:grid;grid-template-columns:repeat(4,1fr);border-left:1px solid rgba(255,255,255,.06);">
      ${[
        { n: '₹2,000 Cr+', l: 'Transactions Advised' },
        { n: String(totalDeals) + '+',   l: 'Mandates Delivered' },
        { n: '6',           l: 'Verticals Covered' },
        { n: 'Pan-India',   l: 'Geographic Reach' },
      ].map(s => `
      <div style="padding:2rem 1.75rem;border-right:1px solid rgba(255,255,255,.06);text-align:center;">
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2.25rem;color:var(--gold);line-height:1;margin-bottom:.4rem;">${s.n}</div>
        <div style="font-size:.62rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.6);">${s.l}</div>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- ══ VERTICAL SECTIONS ═════════════════════════════════════════════════ -->
<div class="sec-pd" style="padding-top:4rem;">
  <div class="wrap">

    ${verticals.map(v => `
    <!-- ── VERTICAL: ${v.name} ──────────────────────────────── -->
    <div class="vertical-section" data-vertical="${v.id}"
         style="margin-bottom:4rem;padding-bottom:4rem;border-bottom:1px solid var(--border);">

      <!-- Vertical header -->
      <div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:2rem;flex-wrap:wrap;gap:1rem;">
        <div style="display:flex;align-items:center;gap:1rem;">
          <div style="width:48px;height:48px;background:${v.bg};border:1px solid ${v.border};display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <i class="fas fa-${v.icon}" style="color:${v.color};font-size:1.1rem;"></i>
          </div>
          <div>
            <div style="font-size:.62rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.2rem;">Vertical Track Record</div>
            <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:var(--ink);line-height:1.1;">${v.name}</h2>
            <p style="font-size:.82rem;color:var(--ink-muted);margin-top:.3rem;">${v.summary}</p>
          </div>
        </div>
        <div style="background:${v.bg};border:1px solid ${v.border};padding:.4rem .9rem;flex-shrink:0;">
          <span style="font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${v.color};">${v.data.length} Projects Delivered</span>
        </div>
      </div>

      <!-- Project cards grid -->
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.25rem;">
        ${v.data.map((p: any, idx: number) => `
        <div class="card" style="padding:1.5rem;animation:fadeUp .5s ease ${idx * 0.06}s both;">
          <!-- Type badge -->
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.875rem;flex-wrap:wrap;gap:.3rem;">
            <span style="background:${v.bg};color:${v.color};border:1px solid ${v.border};font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:.2rem .6rem;">${p.type}</span>
            ${p.value ? `<span style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:${v.color};">${p.value}</span>` : ''}
          </div>
          <!-- Title -->
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.05rem;color:var(--ink);line-height:1.3;margin-bottom:.5rem;">${p.title}</h3>
          <!-- Location -->
          <p style="font-size:.68rem;letter-spacing:.06em;color:var(--ink-muted);display:flex;align-items:center;gap:.3rem;margin-bottom:.75rem;">
            <i class="fas fa-map-marker-alt" style="color:${v.color};font-size:.58rem;"></i>${p.location}
          </p>
          <!-- Description -->
          <p style="font-size:.8rem;color:var(--ink-soft);line-height:1.7;">${p.desc}</p>
          <!-- Tags -->
          ${p.tags && p.tags.length > 0 ? `
          <div style="display:flex;flex-wrap:wrap;gap:.3rem;margin-top:.875rem;">
            ${p.tags.slice(0,3).map((t: string) => `<span style="background:rgba(17,17,17,.04);color:var(--ink-soft);border:1px solid var(--border);font-size:.58rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;padding:.15rem .45rem;">${t}</span>`).join('')}
          </div>` : ''}
        </div>`).join('')}
      </div>
    </div>`).join('')}

    <!-- CTA footer -->
    <div style="text-align:center;padding-top:2rem;">
      <p style="font-size:.82rem;color:var(--ink-muted);margin-bottom:1.5rem;max-width:560px;margin-left:auto;margin-right:auto;line-height:1.8;">
        Interested in a specific vertical or looking to engage India Gully for your next mandate? Our team is available for qualified inquiries.
      </p>
      <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
        <a href="/listings" class="btn btn-g">View Active Mandates</a>
        <a href="/contact" class="btn btn-dko">Speak to Our Team</a>
      </div>
    </div>

  </div>
</div>

<script>
function filterVertical(id) {
  // Update buttons
  document.querySelectorAll('.vert-btn').forEach(function(b) {
    var isActive = b.dataset.filter === id;
    b.style.borderColor  = isActive ? 'var(--gold)' : 'rgba(255,255,255,.18)';
    b.style.background   = isActive ? 'var(--gold)' : 'transparent';
    b.style.color        = isActive ? '#fff' : 'rgba(255,255,255,.5)';
  });
  // Filter sections
  document.querySelectorAll('.vertical-section').forEach(function(sec) {
    sec.style.display = (id === 'all' || sec.dataset.vertical === id) ? 'block' : 'none';
  });
}
</script>

`

  return c.html(layout('Track Record — Completed Works', content, {
    description: "India Gully's completed works and track record — landmark transactions, PMC projects, retail leasing and HORECA supply mandates across Real Estate, Hospitality, Entertainment, Retail and HORECA verticals."
  }))
})

export default app
