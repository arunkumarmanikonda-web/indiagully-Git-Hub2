import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

const ARTICLES = [
  {
    id: 'india-hospitality-2024',
    category: 'Hospitality',
    date: 'December 2024',
    title: 'India Hospitality Market Outlook 2024–2025',
    excerpt: 'India\'s hospitality sector is experiencing unprecedented growth, driven by domestic travel resurgence, infrastructure investment and international brand expansion. We examine key demand drivers, market dynamics and investment opportunities across segments.',
    tags: ['Hospitality','Market Research','Investment'],
    readTime: '8 min read',
  },
  {
    id: 'entertainment-destinations-india',
    category: 'Entertainment',
    date: 'November 2024',
    title: 'The Rise of Integrated Entertainment Destinations in India',
    excerpt: 'India\'s entertainment real estate sector is entering a transformational phase — with ₹15,000+ Cr of integrated entertainment destinations in planning or execution. We analyse the structural drivers, developer strategies and investment thesis.',
    tags: ['Entertainment','Real Estate','Trends'],
    readTime: '12 min read',
  },
  {
    id: 'horeca-procurement-strategy',
    category: 'HORECA',
    date: 'October 2024',
    title: 'HORECA Procurement Strategy for New Hotel Openings',
    excerpt: 'Pre-opening FF&E and OS&E procurement is one of the most complex and often underestimated challenges in hotel development. We outline a structured approach to specification, vendor management and timeline control.',
    tags: ['HORECA','Hotel Management','Operations'],
    readTime: '6 min read',
  },
  {
    id: 'debt-special-situations-hospitality',
    category: 'Debt & Special Situations',
    date: 'September 2024',
    title: 'Distressed Hotel Assets: Opportunities in the IBC Landscape',
    excerpt: 'The IBC/NCLT process has created a pipeline of distressed hospitality assets offering compelling entry valuations for strategic investors. We outline the acquisition framework, due diligence approach and value-creation thesis.',
    tags: ['Debt','IBC','Hospitality','Special Situations'],
    readTime: '10 min read',
  },
  {
    id: 'retail-leasing-malls-india',
    category: 'Retail',
    date: 'August 2024',
    title: 'Mall Leasing Strategy in the Experience Economy',
    excerpt: 'India\'s retail malls are evolving from pure shopping destinations to integrated experience hubs — requiring a fundamental rethinking of tenant mix, space allocation and lease structures. We explore what\'s working and what\'s not.',
    tags: ['Retail','Leasing','Consumer Trends'],
    readTime: '9 min read',
  },
  {
    id: 'greenfield-hotel-development',
    category: 'Hospitality',
    date: 'July 2024',
    title: 'Greenfield Hotel Development in Tier 2 & 3 India',
    excerpt: 'Branded hotel supply in India\'s Tier 2 and Tier 3 cities remains significantly undersupplied relative to growing demand. We analyse demand fundamentals, brand positioning considerations and the project economics in this high-potential segment.',
    tags: ['Hospitality','Greenfield','Real Estate'],
    readTime: '11 min read',
  },
]

app.get('/', (c) => {
  const content = `

<!-- INSIGHTS HERO -->
<div style="background:var(--ink);padding:7rem 0 5rem;position:relative;overflow:hidden;">
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.05) 1px,transparent 1px);background-size:72px 72px;"></div>
  <div class="wrap" style="position:relative;">
    <div style="max-width:680px;" class="fu">
      <div class="gr-lt"></div>
      <p class="eyebrow" style="margin-bottom:.875rem;">Insights &amp; Research</p>
      <h1 class="h1" style="margin-bottom:1.5rem;">Thought Leadership<br><em style="color:var(--gold);font-style:italic;">from the Field</em></h1>
      <p class="lead-lt" style="max-width:540px;">Market research, sector analysis and operational insights from India Gully's advisory practice — drawn from active mandates across hospitality, real estate, retail and entertainment.</p>
    </div>
  </div>
</div>

<!-- FEATURED ARTICLE -->
<div class="sec-wh">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:3fr 2fr;gap:4rem;align-items:center;padding-bottom:3.5rem;border-bottom:1px solid var(--border);margin-bottom:3.5rem;">
      <div>
        <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1.25rem;">
          <span class="badge b-g">${ARTICLES[0].category}</span>
          <span class="caption">${ARTICLES[0].date} · ${ARTICLES[0].readTime}</span>
        </div>
        <h2 class="h2" style="margin-bottom:1.25rem;">${ARTICLES[0].title}</h2>
        <p class="lead" style="margin-bottom:2rem;">${ARTICLES[0].excerpt}</p>
        <div style="display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:1.75rem;">
          ${ARTICLES[0].tags.map(t => `<span class="badge b-dk">${t}</span>`).join('')}
        </div>
        <a href="/insights/${ARTICLES[0].id}" class="btn btn-g">Read Full Article</a>
      </div>
      <div style="background:var(--parch);border:1px solid var(--border);padding:2.5rem;text-align:center;">
        <div style="font-size:3rem;margin-bottom:1rem;">🏨</div>
        <p style="font-family:'DM Serif Display',Georgia,serif;font-size:1.25rem;color:var(--ink);font-style:italic;line-height:1.5;">"Understanding India's hospitality market requires depth that only comes from being present across every segment."</p>
        <div style="width:32px;height:1.5px;background:var(--gold);margin:1.25rem auto;"></div>
        <p class="caption">India Gully Research, 2024</p>
      </div>
    </div>

    <!-- ARTICLES GRID -->
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;">
      ${ARTICLES.slice(1).map(a => `
      <article class="card card-lift" style="display:flex;flex-direction:column;">
        <div style="padding:1.75rem;flex:1;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1.25rem;">
            <span class="badge b-g">${a.category}</span>
            <span class="caption">${a.readTime}</span>
          </div>
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.15rem;color:var(--ink);line-height:1.3;margin-bottom:.875rem;">${a.title}</h3>
          <p class="body" style="font-size:.83rem;margin-bottom:1.25rem;flex:1;">${a.excerpt}</p>
          <div style="display:flex;flex-wrap:wrap;gap:.35rem;margin-bottom:1.25rem;">
            ${a.tags.map(t => `<span class="badge b-dk">${t}</span>`).join('')}
          </div>
        </div>
        <div style="padding:0 1.75rem 1.75rem;">
          <div style="display:flex;align-items:center;justify-content:space-between;padding-top:1.25rem;border-top:1px solid var(--border);">
            <span class="caption">${a.date}</span>
            <a href="/insights/${a.id}" style="font-size:.75rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:var(--gold);display:flex;align-items:center;gap:.3rem;transition:gap .2s;" onmouseover="this.style.gap='.6rem'" onmouseout="this.style.gap='.3rem'">Read <i class="fas fa-arrow-right" style="font-size:.6rem;"></i></a>
          </div>
        </div>
      </article>
      `).join('')}
    </div>
  </div>
</div>

<!-- SUBSCRIBE -->
<div class="sec-pd">
  <div class="wrap">
    <div style="background:var(--ink);padding:4rem;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;">
      <div>
        <div class="gr-lt"></div>
        <p class="eyebrow" style="margin-bottom:.75rem;">Stay Informed</p>
        <h2 class="h2-lt" style="margin-bottom:1rem;">Subscribe to<br>India Gully Insights</h2>
        <p class="lead-lt" style="font-size:.9rem;">Receive our sector research, market updates and mandate alerts directly — for qualified investors, developers and industry professionals.</p>
      </div>
      <div>
        <form class="ig-form" method="POST" action="/api/subscribe" style="display:flex;flex-direction:column;gap:1rem;">
          <div>
            <label class="ig-lbl" style="color:rgba(255,255,255,.3);">Your Name</label>
            <input type="text" name="name" class="ig-input" required placeholder="Full name">
          </div>
          <div>
            <label class="ig-lbl" style="color:rgba(255,255,255,.3);">Email Address *</label>
            <input type="email" name="email" class="ig-input" required placeholder="your@email.com">
          </div>
          <div>
            <label class="ig-lbl" style="color:rgba(255,255,255,.3);">Professional Role</label>
            <select name="role" class="ig-input">
              <option value="">Select your role</option>
              <option>Developer / Promoter</option>
              <option>Institutional Investor</option>
              <option>Family Office</option>
              <option>Hotel / Hospitality Professional</option>
              <option>Retail Brand / Operator</option>
              <option>Advisor / Consultant</option>
              <option>Other</option>
            </select>
          </div>
          <button type="submit" class="btn btn-g" style="width:100%;justify-content:center;">
            <i class="fas fa-paper-plane" style="margin-right:.5rem;"></i>Subscribe to Insights
          </button>
          <p style="font-size:.68rem;color:rgba(255,255,255,.2);line-height:1.6;">By subscribing you agree to receive occasional research updates and mandate alerts from India Gully. We respect your privacy and you can unsubscribe at any time.</p>
        </form>
      </div>
    </div>
  </div>
</div>

`
  return c.html(layout('Insights & Research', content, {
    description: 'India Gully Insights — thought leadership, market research and sector analysis across hospitality, real estate, retail and entertainment.'
  }))
})

// Article detail
app.get('/:id', (c) => {
  const id = c.req.param('id')
  const article = ARTICLES.find(a => a.id === id)
  if (!article) return c.redirect('/insights')

  const content = `
<div style="background:var(--ink);padding:7rem 0 4rem;position:relative;overflow:hidden;">
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.05) 1px,transparent 1px);background-size:72px 72px;"></div>
  <div class="wrap" style="position:relative;max-width:820px;">
    <a href="/insights" style="display:inline-flex;align-items:center;gap:.5rem;font-size:.78rem;color:rgba(255,255,255,.4);margin-bottom:2rem;transition:color .2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.4)'">
      <i class="fas fa-arrow-left" style="font-size:.65rem;"></i> Back to Insights
    </a>
    <div class="fu">
      <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1.25rem;">
        <span class="badge b-g">${article.category}</span>
        <span class="caption-lt">${article.date} · ${article.readTime}</span>
      </div>
      <h1 style="font-family:'DM Serif Display',Georgia,serif;font-size:clamp(2rem,4vw,3rem);color:#fff;line-height:1.15;margin-bottom:1.25rem;">${article.title}</h1>
      <p class="lead-lt">${article.excerpt}</p>
    </div>
  </div>
</div>

<div class="sec-wh">
  <div class="wrap" style="max-width:820px;">
    <div style="background:var(--parch);border:1px solid var(--border);padding:1.5rem;margin-bottom:2.5rem;display:flex;align-items:center;gap:1rem;">
      <i class="fas fa-lock" style="color:var(--gold);font-size:1.25rem;flex-shrink:0;"></i>
      <div>
        <p style="font-size:.85rem;font-weight:600;color:var(--ink);margin-bottom:.2rem;">Full Article — Qualified Access</p>
        <p style="font-size:.78rem;color:var(--ink-muted);">This article is available in full to qualified investors, developers and industry professionals. Subscribe or contact us to access.</p>
      </div>
      <a href="/insights#subscribe" class="btn btn-g" style="flex-shrink:0;font-size:.72rem;">Gain Access</a>
    </div>

    <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:var(--ink);font-style:italic;line-height:1.55;padding:2rem;background:var(--parch);border-left:3px solid var(--gold);margin-bottom:2.5rem;">
      "${article.excerpt}"
    </div>

    <div style="display:flex;flex-wrap:wrap;gap:.5rem;margin-bottom:2.5rem;">
      ${article.tags.map(t => `<span class="badge b-g">${t}</span>`).join('')}
    </div>

    <div style="padding-top:2.5rem;border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1rem;">
      <div style="font-size:.78rem;color:var(--ink-muted);">Published by <strong style="color:var(--ink);">India Gully Research</strong> · ${article.date}</div>
      <a href="/contact" class="btn btn-dk" style="font-size:.72rem;">Discuss With Our Team</a>
    </div>
  </div>
</div>
`
  return c.html(layout(article.title, content, {
    description: article.excerpt
  }))
})

export default app
