import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

const ARTICLES = [
  {
    id: 'india-entertainment-destinations-2024',
    category: 'Entertainment',
    title: 'The Rise of Integrated Entertainment Destinations in India',
    excerpt: 'India\'s entertainment real estate sector is witnessing a structural shift — from standalone multiplexes to fully integrated, experiential destinations that combine theme parks, retail, F&B and hospitality.',
    author: 'Arun Manikonda',
    date: 'December 2024',
    readTime: '8 min read',
    featured: true,
  },
  {
    id: 'hotel-brand-selection-guide',
    category: 'Hospitality',
    title: 'Choosing the Right Hotel Brand: A Developer\'s Guide',
    excerpt: 'Brand selection is one of the most consequential decisions in hotel development. The wrong brand choice can cost 200-400 bps in RevPAR and impair asset value at exit.',
    author: 'Pavan Manikonda',
    date: 'November 2024',
    readTime: '10 min read',
    featured: true,
  },
  {
    id: 'mall-leasing-strategy-india',
    category: 'Retail',
    title: 'Mall Leasing Strategy in Post-COVID India: What\'s Changed',
    excerpt: 'The Indian mall sector has undergone fundamental restructuring since 2020. Landlords who adapt their leasing strategy, brand mix and revenue models will outperform peers significantly.',
    author: 'Amit Jhingan',
    date: 'October 2024',
    readTime: '7 min read',
    featured: true,
  },
  {
    id: 'heritage-hotel-unlocking-value',
    category: 'Heritage & Hospitality',
    title: 'Unlocking Value in India\'s Heritage Hotel Portfolio',
    excerpt: 'India\'s heritage hotel segment — palaces, havelis and colonial estates — remains significantly undervalued versus international peers. We analyse the structural opportunity and advisory framework.',
    author: 'Arun Manikonda',
    date: 'September 2024',
    readTime: '9 min read',
    featured: false,
  },
  {
    id: 'horeca-procurement-excellence',
    category: 'HORECA',
    title: 'Procurement Excellence in Hotel Pre-Openings',
    excerpt: 'FF&E and OS&E procurement is the most frequently under-planned element of a hotel pre-opening. Cost overruns of 15-40% are common. Here is how to avoid them.',
    author: 'Pavan Manikonda',
    date: 'August 2024',
    readTime: '6 min read',
    featured: false,
  },
  {
    id: 'debt-special-situations-india',
    category: 'Debt & Special Situations',
    title: 'Special Situations in Indian Real Estate: The IBC Opportunity',
    excerpt: 'The Insolvency and Bankruptcy Code has created a unique window for distressed asset acquisition in Indian real estate and hospitality. A systematic framework for investors.',
    author: 'Amit Jhingan',
    date: 'July 2024',
    readTime: '12 min read',
    featured: false,
  },
]

app.get('/', (c) => {
  const [featured, ...rest] = ARTICLES
  const content = `

<!-- INSIGHTS HERO -->
<div style="background:var(--ink);padding:7rem 0 5rem;position:relative;overflow:hidden;">
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.05) 1px,transparent 1px);background-size:72px 72px;"></div>
  <div class="wrap" style="position:relative;">
    <div style="max-width:640px;" class="fu">
      <div class="gr-lt"></div>
      <p class="eyebrow" style="margin-bottom:.875rem;">Insights &amp; Research</p>
      <h1 class="h1" style="margin-bottom:1.5rem;">Thought Leadership<br><em style="color:var(--gold);font-style:italic;">by Practitioners</em></h1>
      <p class="lead-lt" style="max-width:520px;">Market insights, sector analysis and advisory perspectives from India Gully's leadership — grounded in live transaction experience across every vertical we operate in.</p>
    </div>
  </div>
</div>

<!-- FEATURED ARTICLE -->
<div class="sec-wh">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:1.4fr 1fr;gap:4rem;align-items:center;border:1px solid var(--border);padding:3rem;">
      <div>
        <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1.5rem;">
          <span class="badge b-g">Featured</span>
          <span class="eyebrow">${featured.category}</span>
        </div>
        <h2 class="h2" style="margin-bottom:1.25rem;">${featured.title}</h2>
        <p class="lead" style="margin-bottom:1.75rem;">${featured.excerpt}</p>
        <div style="display:flex;align-items:center;gap:1.5rem;margin-bottom:1.75rem;">
          <div style="display:flex;align-items:center;gap:.5rem;">
            <div style="width:32px;height:32px;background:var(--ink);display:flex;align-items:center;justify-content:center;">
              <span style="font-size:.65rem;font-weight:700;color:var(--gold);">AM</span>
            </div>
            <span style="font-size:.8rem;color:var(--ink-soft);">${featured.author}</span>
          </div>
          <span class="caption">${featured.date} · ${featured.readTime}</span>
        </div>
        <a href="/insights/${featured.id}" class="btn btn-dk">Read Article</a>
      </div>
      <div style="background:var(--parch-dk);height:280px;display:flex;align-items:center;justify-content:center;">
        <div style="text-align:center;">
          <div style="font-size:4rem;margin-bottom:.75rem;">🎡</div>
          <div style="font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);">${featured.category}</div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ALL ARTICLES -->
<div class="sec-pd">
  <div class="wrap">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:3rem;flex-wrap:wrap;gap:1rem;">
      <div>
        <div class="gr"></div>
        <h2 class="h2">Latest Perspectives</h2>
      </div>
      <div style="display:flex;gap:.5rem;flex-wrap:wrap;">
        ${['All','Hospitality','Real Estate','Retail','Entertainment','HORECA'].map((cat,i) => `
        <button onclick="filterArticles('${cat.toLowerCase()}')" id="ac-${cat.toLowerCase()}" class="btn ${i===0?'btn-dk':'btn-dko'}" style="padding:.4rem .9rem;font-size:.7rem;">${cat}</button>
        `).join('')}
      </div>
    </div>

    <div id="articleGrid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;">
      ${rest.map(a => `
      <article class="card card-lift art-card" data-cat="${a.category.toLowerCase()}" style="overflow:hidden;">
        <div style="background:var(--parch-dk);height:160px;display:flex;align-items:center;justify-content:center;">
          <div style="text-align:center;">
            <div style="font-size:2.5rem;margin-bottom:.5rem;">${a.category === 'Hospitality' ? '🏨' : a.category === 'Retail' ? '🛍️' : a.category === 'HORECA' ? '🍳' : a.category === 'Debt & Special Situations' ? '⚖️' : '🏛️'}</div>
            <span class="eyebrow">${a.category}</span>
          </div>
        </div>
        <div style="padding:1.5rem;">
          <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.875rem;">
            <span class="badge b-g">${a.category}</span>
            <span class="caption">${a.readTime}</span>
          </div>
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--ink);margin-bottom:.625rem;line-height:1.25;">${a.title}</h3>
          <p class="body" style="font-size:.8rem;margin-bottom:1.25rem;">${a.excerpt}</p>
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <div>
              <div style="font-size:.78rem;font-weight:600;color:var(--ink);">${a.author}</div>
              <div class="caption">${a.date}</div>
            </div>
            <a href="/insights/${a.id}" class="btn btn-go" style="padding:.4rem .875rem;font-size:.7rem;">Read</a>
          </div>
        </div>
      </article>
      `).join('')}
    </div>
  </div>
</div>

<!-- SUBSCRIBE -->
<div class="sec-dk">
  <div class="wrap" style="display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;">
    <div>
      <div class="gr-lt"></div>
      <p class="eyebrow" style="margin-bottom:.75rem;">Stay Informed</p>
      <h2 class="h2-lt" style="margin-bottom:1rem;">Subscribe to<br>India Gully Insights</h2>
      <p class="lead-lt">Receive our sector research, deal updates and market commentary directly in your inbox — curated for investors, developers and operators.</p>
    </div>
    <form class="ig-form" method="POST" action="/api/subscribe" style="display:flex;flex-direction:column;gap:1rem;">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:.875rem;">
        <div>
          <label class="ig-lbl" style="color:rgba(255,255,255,.4);">Name</label>
          <input type="text" name="name" class="ig-input" required placeholder="Your name" style="background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.1);color:#fff;">
        </div>
        <div>
          <label class="ig-lbl" style="color:rgba(255,255,255,.4);">Organisation</label>
          <input type="text" name="org" class="ig-input" placeholder="Company name" style="background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.1);color:#fff;">
        </div>
      </div>
      <div>
        <label class="ig-lbl" style="color:rgba(255,255,255,.4);">Email Address *</label>
        <input type="email" name="email" class="ig-input" required placeholder="your@email.com" style="background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.1);color:#fff;">
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:.5rem;">
        ${['Hospitality','Real Estate','Retail','Entertainment','HORECA','Debt & Special'].map(cat => `
        <label style="display:flex;align-items:center;gap:.4rem;font-size:.75rem;color:rgba(255,255,255,.45);cursor:pointer;">
          <input type="checkbox" name="topics" value="${cat}" style="accent-color:var(--gold);"> ${cat}
        </label>
        `).join('')}
      </div>
      <button type="submit" class="btn btn-g" style="width:100%;justify-content:center;">
        <i class="fas fa-paper-plane" style="margin-right:.5rem;"></i>Subscribe to Insights
      </button>
      <p style="font-size:.68rem;color:rgba(255,255,255,.2);">No spam. Unsubscribe anytime. Your data is never shared.</p>
    </form>
  </div>
</div>

<script>
function filterArticles(cat){
  var cards = document.querySelectorAll('.art-card');
  var btns  = document.querySelectorAll('[id^="ac-"]');
  btns.forEach(function(b){ b.classList.remove('btn-dk'); b.classList.add('btn-dko'); });
  var active = document.getElementById('ac-'+cat);
  if(active){ active.classList.add('btn-dk'); active.classList.remove('btn-dko'); }
  cards.forEach(function(card){
    if(cat==='all' || card.dataset.cat.includes(cat)){
      card.style.display='';
    } else {
      card.style.display='none';
    }
  });
}
</script>
`
  return c.html(layout('Insights & Research', content, {
    description: "India Gully Insights — thought leadership, sector research and market commentary across Real Estate, Retail, Hospitality, Entertainment and HORECA by India's leading advisory firm."
  }))
})

// Article stub
app.get('/:id', (c) => {
  const id = c.req.param('id')
  const article = ARTICLES.find(a => a.id === id)
  if (!article) return c.redirect('/insights')

  const content = `
<div style="background:var(--ink);padding:7rem 0 5rem;position:relative;overflow:hidden;">
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.04) 1px,transparent 1px);background-size:72px 72px;"></div>
  <div class="wrap" style="position:relative;max-width:900px;">
    <a href="/insights" style="display:inline-flex;align-items:center;gap:.5rem;font-size:.78rem;color:rgba(255,255,255,.4);margin-bottom:2rem;transition:color .2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.4)'"><i class="fas fa-arrow-left" style="font-size:.65rem;"></i>All Insights</a>
    <span class="badge b-g" style="margin-bottom:1rem;display:inline-block;">${article.category}</span>
    <h1 class="h1" style="margin-bottom:1.25rem;">${article.title}</h1>
    <div style="display:flex;align-items:center;gap:1.5rem;">
      <div style="display:flex;align-items:center;gap:.5rem;">
        <div style="width:32px;height:32px;background:var(--gold);display:flex;align-items:center;justify-content:center;">
          <span style="font-size:.6rem;font-weight:800;color:#fff;">${article.author.split(' ').map(n=>n[0]).join('')}</span>
        </div>
        <span style="font-size:.8rem;color:rgba(255,255,255,.55);">${article.author}</span>
      </div>
      <span class="caption-lt">${article.date} · ${article.readTime}</span>
    </div>
  </div>
</div>
<div class="sec-wh">
  <div class="wrap" style="max-width:760px;margin:0 auto;">
    <p class="lead" style="font-size:1.15rem;margin-bottom:2.5rem;padding-bottom:2.5rem;border-bottom:1px solid var(--border);">${article.excerpt}</p>
    <div style="background:var(--parch);border:1px solid var(--border);padding:2rem;text-align:center;">
      <i class="fas fa-lock" style="color:var(--gold);font-size:1.5rem;margin-bottom:.875rem;display:block;"></i>
      <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.35rem;color:var(--ink);margin-bottom:.75rem;">Full Article Access</h3>
      <p class="body" style="max-width:480px;margin:0 auto 1.5rem;">This research article is available to registered subscribers. Subscribe to India Gully Insights for full access to all research and market commentary.</p>
      <div style="display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap;">
        <a href="/insights#subscribe" class="btn btn-g">Subscribe for Access</a>
        <a href="/contact" class="btn btn-dko">Contact for Enquiries</a>
      </div>
    </div>
  </div>
</div>
`
  return c.html(layout(article.title, content, {
    description: `${article.title} — ${article.excerpt}`
  }))
})

export default app
