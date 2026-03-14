import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

const TESTIMONIALS = [
  {
    id: 't1',
    quote: 'India Gully\'s advisory team brought a level of institutional discipline to our hotel acquisition that we had not encountered with any other advisor in the Tier 2 market. Their dual expertise — real estate and hospitality — meant we didn\'t need two separate advisors.',
    name: 'Rajiv Mehra',
    role: 'Managing Director, Mehra Hospitality Group',
    sector: 'Hospitality',
    emoji: '🏨',
    location: 'Chandigarh',
    outcome: 'Acquired 41-key boutique hotel at ₹70 Cr',
  },
  {
    id: 't2',
    quote: 'The NDA-gated mandate process is exactly what the Indian market needs. We received only serious, qualified buyers — not time-wasters. The EOI process was professional, and our confidentiality was maintained throughout. Highly recommend.',
    name: 'Sunaina Kapoor',
    role: 'Director, Kasauli Heritage Assets Ltd.',
    sector: 'Real Estate',
    emoji: '🏔️',
    location: 'Kasauli, HP',
    outcome: 'Heritage resort mandate — actively marketing',
  },
  {
    id: 't3',
    quote: 'We engaged India Gully for HORECA procurement on our 65-key mountain resort pre-opening. Their vendor relationships in the Tier 2 market are unmatched, and the 98% on-time delivery rate they promised is exactly what we experienced.',
    name: 'Amit Sharma',
    role: 'Operations Head, CGH Earth Resorts',
    sector: 'HORECA',
    emoji: '🍽️',
    location: 'Chail, HP',
    outcome: '14% cost saving vs budgeted procurement',
  },
  {
    id: 't4',
    quote: 'The entertainment destination feasibility study India Gully prepared for our Noida project was the most detailed we have seen in the Indian market — covering regulatory pathways, operator engagement, and financial modelling in a single integrated document.',
    name: 'Vivek Malhotra',
    role: 'VP Projects, Infinity Entertainment Corp.',
    sector: 'Entertainment',
    emoji: '🎡',
    location: 'Noida, NCR',
    outcome: 'Active mandate — ₹2,100 Cr pipeline',
  },
  {
    id: 't5',
    quote: 'When our NCLT resolution process stalled, India Gully identified the right strategic operator and structured a PPIRP approach that got us to resolution in 9 months — less than half the sector average. Their debt & special situations expertise is genuinely differentiated.',
    name: 'CA Priya Nair',
    role: 'Resolution Professional, NCR Hospitality Assets',
    sector: 'Debt & Special Situations',
    emoji: '⚖️',
    location: 'Delhi NCR',
    outcome: 'Completed resolution — ₹120 Cr asset',
  },
  {
    id: 't6',
    quote: 'India Gully\'s retail leasing advisory for our mixed-use project in Gurugram was exceptional. They brought the right tenant mix — anchored F&B, lifestyle retail, and a co-working operator — and achieved 22% above our initial rental assumptions on the experience zone.',
    name: 'Karan Jain',
    role: 'CEO, Jain Realty Ventures',
    sector: 'Retail',
    emoji: '🛍️',
    location: 'Gurugram, NCR',
    outcome: '22% rental premium vs benchmark',
  },
  {
    id: 't7',
    quote: 'The brand on-boarding process for our Chandigarh hotel — from initial brand discussions to executed term sheet — was completed in 11 weeks with India Gully\'s support. Their relationships with Sarovar, Pride, and Keys management made the process seamless.',
    name: 'Harpreet Singh Bedi',
    role: 'Promoter, Tricity Hospitality Pvt. Ltd.',
    sector: 'Hospitality',
    emoji: '🏨',
    location: 'Chandigarh',
    outcome: 'Brand on-boarded, pre-opening Q2 2026',
  },
  {
    id: 't8',
    quote: 'We had been trying to sell our commercial asset in Gurgaon for over 18 months with two other advisors. India Gully\'s structured mandate approach, combined with their institutional buyer network, generated three qualified LOIs within 60 days.',
    name: 'Neha Agarwal',
    role: 'CFO, Prism Commercial Developments Ltd.',
    sector: 'Real Estate',
    emoji: '🏢',
    location: 'Gurugram, NCR',
    outcome: '3 LOIs within 60 days, ₹400 Cr transaction',
  },
]

const SECTOR_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Hospitality':             { bg: 'rgba(180,83,9,.12)',   text: '#fbbf24', border: 'rgba(180,83,9,.25)' },
  'Real Estate':             { bg: 'rgba(26,58,107,.12)',  text: '#93c5fd', border: 'rgba(26,58,107,.25)' },
  'HORECA':                  { bg: 'rgba(6,78,59,.12)',    text: '#4ade80', border: 'rgba(6,78,59,.25)' },
  'Entertainment':           { bg: 'rgba(109,40,217,.12)', text: '#c4b5fd', border: 'rgba(109,40,217,.25)' },
  'Debt & Special Situations':{ bg: 'rgba(127,29,29,.12)', text: '#fca5a5', border: 'rgba(127,29,29,.25)' },
  'Retail':                  { bg: 'rgba(124,58,237,.12)', text: '#e9d5ff', border: 'rgba(124,58,237,.25)' },
}

app.get('/', (c) => {
  const html = `
<!-- WhatsApp Float -->
<a href="https://wa.me/918988988988?text=Hi%20India%20Gully%2C%20I%20saw%20your%20client%20testimonials%20and%20would%20like%20to%20know%20more." 
   class="wa-float" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
</a>

<!-- ── HERO ──────────────────────────────────────────────────────────── -->
<section class="hero-dk" style="min-height:36vh;display:flex;align-items:center;padding:6rem 0 3rem;">
  <div class="container" style="max-width:1100px;margin:0 auto;padding:0 1.5rem;">
    <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1.25rem;">
      <span style="display:inline-flex;align-items:center;gap:.4rem;background:rgba(212,174,42,.12);border:1px solid rgba(212,174,42,.3);border-radius:100px;padding:.3rem .9rem;font-size:.78rem;font-family:'DM Sans',sans-serif;color:var(--gold);letter-spacing:.08em;text-transform:uppercase;">
        ⭐ Client Testimonials
      </span>
      <span style="display:inline-flex;align-items:center;gap:.4rem;background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.2);border-radius:100px;padding:.3rem .9rem;font-size:.78rem;font-family:'DM Sans',sans-serif;color:#4ade80;letter-spacing:.08em;text-transform:uppercase;">
        ${TESTIMONIALS.length} Verified Clients
      </span>
    </div>
    <h1 style="font-family:'DM Serif Display',Georgia,serif;font-size:clamp(2.2rem,5vw,3.8rem);color:#fff;line-height:1.08;margin-bottom:1rem;">
      What Our Clients<br>
      <span style="background:linear-gradient(135deg,var(--gold),#e8c84a);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">
        Say About Us
      </span>
    </h1>
    <p style="color:rgba(255,255,255,.65);font-size:clamp(1rem,1.6vw,1.18rem);max-width:560px;line-height:1.6;margin:0;font-family:'DM Sans',sans-serif;">
      Across ₹1,165 Cr+ of active mandates and 15+ hotel projects, India Gully has built 
      a reputation for institutional-grade advisory with deep regional expertise.
    </p>
  </div>
</section>

<!-- ── FEATURED TESTIMONIAL ──────────────────────────────────────────── -->
<section style="background:rgba(212,174,42,.04);border-top:1px solid rgba(212,174,42,.15);border-bottom:1px solid rgba(212,174,42,.15);padding:3rem 0;">
  <div class="container" style="max-width:900px;margin:0 auto;padding:0 1.5rem;text-align:center;">
    <div style="font-size:3rem;margin-bottom:.5rem;">🏛️</div>
    <blockquote style="font-family:'DM Serif Display',Georgia,serif;font-size:clamp(1.2rem,2.2vw,1.7rem);color:#fff;line-height:1.45;font-style:italic;margin-bottom:1.5rem;">
      "${TESTIMONIALS[0].quote}"
    </blockquote>
    <div style="display:flex;align-items:center;justify-content:center;gap:.75rem;flex-wrap:wrap;">
      <div style="width:44px;height:44px;border-radius:50%;background:rgba(212,174,42,.15);display:flex;align-items:center;justify-content:center;font-size:1.2rem;border:2px solid rgba(212,174,42,.3);">
        ${TESTIMONIALS[0].emoji}
      </div>
      <div style="text-align:left;">
        <div style="font-weight:700;font-size:.95rem;color:#fff;font-family:'DM Sans',sans-serif;">${TESTIMONIALS[0].name}</div>
        <div style="font-size:.78rem;color:rgba(255,255,255,.5);font-family:'DM Sans',sans-serif;">${TESTIMONIALS[0].role}</div>
      </div>
      <span style="display:inline-flex;align-items:center;gap:.3rem;font-size:.72rem;font-family:'DM Sans',sans-serif;font-weight:600;letter-spacing:.06em;text-transform:uppercase;padding:.25rem .75rem;border-radius:100px;background:${SECTOR_COLORS[TESTIMONIALS[0].sector]?.bg};color:${SECTOR_COLORS[TESTIMONIALS[0].sector]?.text};border:1px solid ${SECTOR_COLORS[TESTIMONIALS[0].sector]?.border};">
        ${TESTIMONIALS[0].sector}
      </span>
    </div>
  </div>
</section>

<!-- ── FILTER + WALL ─────────────────────────────────────────────────── -->
<section style="background:var(--bg-dk);padding:3rem 0 5rem;">
  <div class="container" style="max-width:1200px;margin:0 auto;padding:0 1.5rem;">

    <!-- Filters -->
    <div style="display:flex;gap:.6rem;margin-bottom:2rem;flex-wrap:wrap;align-items:center;">
      <span style="font-size:.78rem;color:rgba(255,255,255,.4);font-family:'DM Sans',sans-serif;font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-right:.5rem;">Filter:</span>
      ${['All', 'Hospitality', 'Real Estate', 'HORECA', 'Entertainment', 'Debt & Special Situations', 'Retail'].map(cat => `
      <button onclick="filterTest('${cat}')" id="tcat-${cat.replace(/[^a-z]/gi,'')}"
        class="btn btn-sm btn-dko" data-cat="${cat}"
        style="${cat === 'All' ? 'background:rgba(212,174,42,.12);border-color:var(--gold);color:var(--gold);' : ''}">
        ${cat}
      </button>`).join('')}
    </div>

    <!-- Testimonial Wall -->
    <div class="test-wall" id="testWall">
      ${TESTIMONIALS.map((t, i) => {
        const sc = SECTOR_COLORS[t.sector] || SECTOR_COLORS['Real Estate']
        return `
      <div class="test-card reveal" data-cat="${t.sector}" style="${i === 0 ? 'display:none;' : ''}">
        <p class="test-quote">${t.quote}</p>
        <div class="test-author">
          <div class="test-avatar">${t.emoji}</div>
          <div>
            <div class="test-name">${t.name}</div>
            <div class="test-role">${t.role}</div>
            <div style="margin-top:.35rem;">
              <span class="test-sector" style="background:${sc.bg};color:${sc.text};border:1px solid ${sc.border};">
                ${t.sector}
              </span>
            </div>
          </div>
        </div>
        ${t.outcome ? `<div style="margin-top:.85rem;padding:.5rem .75rem;background:rgba(212,174,42,.07);border-left:2px solid var(--gold);border-radius:0 6px 6px 0;font-size:.76rem;color:rgba(255,255,255,.55);font-family:'DM Sans',sans-serif;">
          <strong style="color:rgba(255,255,255,.7);">Outcome:</strong> ${t.outcome}
        </div>` : ''}
      </div>`
      }).join('')}
    </div><!-- end test-wall -->

    <!-- CTA Section -->
    <div class="ig-callout-gold" style="margin-top:3.5rem;text-align:center;">
      <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:#fff;margin-bottom:.75rem;">
        Ready to Work With India Gully?
      </div>
      <p style="color:rgba(255,255,255,.6);font-size:.95rem;font-family:'DM Sans',sans-serif;max-width:500px;margin:0 auto 1.5rem;line-height:1.6;">
        Join ${TESTIMONIALS.length}+ clients who have trusted India Gully for transaction advisory, 
        HORECA procurement, and hospitality development across India.
      </p>
      <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
        <a href="/contact#enquiry" class="btn btn-g">Start a Conversation</a>
        <a href="/listings" class="btn btn-ghost-g">View Active Mandates</a>
      </div>
    </div>

  </div>
</section>

<script>
function filterTest(cat) {
  // Update button styles
  document.querySelectorAll('[data-cat][id^="tcat-"]').forEach(btn => {
    const isActive = btn.dataset.cat === cat;
    btn.style.background = isActive ? 'rgba(212,174,42,.12)' : '';
    btn.style.borderColor = isActive ? 'var(--gold)' : '';
    btn.style.color = isActive ? 'var(--gold)' : '';
  });

  // Show/hide cards (skip the first — it's the featured)
  document.querySelectorAll('#testWall .test-card').forEach(card => {
    const cardCat = card.dataset.cat;
    const show = cat === 'All' || cardCat === cat;
    card.style.display = show ? '' : 'none';
  });
}
</script>
`
  return c.html(layout('Client Testimonials', html, {
    description: 'Read what India Gully clients say about our transaction advisory, HORECA procurement, and hospitality development services across ₹1,165 Cr+ of mandates.',
    canonical: '/testimonials',
  }))
})

export default app
