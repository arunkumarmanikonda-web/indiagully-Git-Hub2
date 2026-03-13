import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

app.get('/', (c) => {
  const content = `

<!-- ABOUT HERO -->
<div class="hero-dk">
  <div class="hero-dk-grid"></div>
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse 55% 65% at 75% 50%,rgba(184,150,12,.06) 0%,transparent 55%);pointer-events:none;"></div>
  <div style="position:absolute;bottom:0;left:0;right:0;height:120px;background:linear-gradient(to bottom,transparent,var(--ink));pointer-events:none;"></div>
  <!-- Floating year accent -->
  <div class="hero-dk-num">2017</div>
  <div class="wrap" style="position:relative;">
    <div style="max-width:820px;" class="fu">
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.75rem;">
        <div style="width:40px;height:1px;background:linear-gradient(90deg,var(--gold),transparent);"></div>
        <span style="font-size:.6rem;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);">About India Gully</span>
      </div>
      <h1 class="h1" style="margin-bottom:1.75rem;">Celebrating<br><em style="color:var(--gold);font-style:italic;">Desiness</em><br><span style="font-size:.5em;font-weight:300;color:rgba(255,255,255,.38);letter-spacing:-.01em;">Since 2017.</span></h1>
      <p class="lead-lt" style="max-width:600px;margin-bottom:2.5rem;">Vivacious Entertainment and Hospitality Pvt. Ltd. A Delhi-based, multi-vertical enterprise advisory firm operating across Hospitality, Retail, Real Estate and Entertainment with a distinctly Indian identity.</p>
      <!-- Quick stats -->
      <div style="display:flex;flex-wrap:wrap;gap:2.5rem;">
        ${[{n:"2017",l:"Founded"},{n:"₹2,000 Cr+",l:"Transacted"},{n:"6",l:"Verticals"},{n:"Pan-India",l:"Presence"}].map(s=>`<div><div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:#fff;line-height:1;">${s.n}</div><div style="font-size:.6rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:rgba(184,150,12,.7);margin-top:.25rem;">${s.l}</div></div>`).join('')}
      </div>
    </div>
  </div>
</div>

<!-- VISION & MISSION -->
<div class="sec-wh" style="padding-top:7rem;">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:start;" class="mob-stack">
      <div class="reveal-l">
        <div class="gr"></div>
        <p class="eyebrow" style="margin-bottom:.875rem;">Our Purpose</p>
        <h2 class="h2" style="margin-bottom:3rem;">Vision &amp; Mission</h2>

        <div style="border-left:3px solid var(--gold);padding:1.75rem 2rem;background:linear-gradient(135deg,rgba(184,150,12,.04),transparent);margin-bottom:1.75rem;position:relative;">
          <div style="position:absolute;top:1.5rem;left:-3px;width:3px;height:40px;background:linear-gradient(180deg,var(--gold),var(--gold-lt));"></div>
          <p style="font-size:.6rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--gold);margin-bottom:.75rem;">Vision</p>
          <p style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--ink);line-height:1.7;font-style:italic;">"To be India's most respected diversified advisory enterprise, creating extraordinary experiences in hospitality and entertainment while delivering unmatched strategic value to our clients and stakeholders."</p>
        </div>

        <div style="border-left:3px solid var(--border);padding:1.75rem 2rem;background:var(--parch);">
          <p style="font-size:.6rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.75rem;">Mission</p>
          <p style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--ink);line-height:1.7;font-style:italic;">"To combine deep sector expertise with operational excellence and global best practices, enabling our clients and ventures to achieve sustainable, scalable growth that benefits all stakeholders."</p>
        </div>
      </div>

      <div class="reveal-r">
        <div class="gr"></div>
        <p class="eyebrow" style="margin-bottom:.875rem;">Core Values</p>
        <h2 class="h2" style="margin-bottom:3rem;">The Principles<br>That Guide Us</h2>

        <div style="display:flex;flex-direction:column;gap:0;">
          ${[
            { icon:'⚖️', name:'Integrity',   desc:'Transparent, ethical conduct in every engagement. We act in the best interests of our clients and maintain the highest standards of professional ethics.' },
            { icon:'🏆', name:'Excellence',  desc:'Relentless pursuit of the highest standards in everything we do, from mandate delivery to client communication and internal governance.' },
            { icon:'🤝', name:'Partnership', desc:'Long-term relationships built on trust, shared objectives and sustained value creation for clients, partners and communities we operate in.' },
            { icon:'💡', name:'Innovation',  desc:'Embracing new ideas, methodologies and technologies to solve complex challenges and create differentiated outcomes.' },
          ].map(v => `
          <div style="display:flex;gap:1.5rem;padding:1.75rem 0;border-bottom:1px solid var(--border);align-items:flex-start;transition:background .2s;" onmouseover="this.style.background='rgba(184,150,12,.02)'" onmouseout="this.style.background='transparent'">
            <span style="font-size:1.6rem;flex-shrink:0;width:40px;text-align:center;">${v.icon}</span>
            <div>
              <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--ink);margin-bottom:.4rem;">${v.name}</h3>
              <p style="font-size:.875rem;color:var(--ink-soft);line-height:1.8;">${v.desc}</p>
            </div>
          </div>
          `).join('')}
        </div>
      </div>
    </div>
  </div>
</div>

<!-- JOURNEY / TIMELINE -->
<div class="sec-pd" style="padding-top:7rem;">
  <div class="wrap">
    <div style="text-align:center;max-width:580px;margin:0 auto 5rem;">
      <div class="gr-c"></div>
      <p class="eyebrow" style="margin-bottom:.875rem;">Our Story</p>
      <h2 class="h2">A Legacy of<br>Innovation</h2>
      <p class="lead" style="margin-top:1.25rem;">Seven years of building India's most trusted multi-vertical advisory practice.</p>
    </div>

    <div style="position:relative;max-width:920px;margin:0 auto;">
      <!-- Centre line -->
      <div style="position:absolute;left:50%;top:0;bottom:0;width:1px;background:linear-gradient(180deg,var(--gold-line),var(--border),transparent);transform:translateX(-50%);"></div>

      ${[
        { year:'2017', desc:'Incorporated as Vivacious Entertainment and Hospitality Pvt. Ltd. in New Delhi. Commenced advisory operations across Hospitality and Entertainment sectors with founding team.' },
        { year:'2018', desc:'Launched hotel management and pre-opening consultancy vertical. First mandates executed for Cygnett, Regenta and Radisson brand properties across North India.' },
        { year:'2019', desc:'Expanded into Real Estate consulting and Retail Leasing strategy, building a truly diversified advisory practice across four complementary verticals.' },
        { year:'2020', desc:'HORECA Supplies vertical launched. Providing end-to-end FF&E, OS&E and kitchen procurement for hotel pre-openings and renovations across India.' },
        { year:'2021', desc:'Launched India Gully brand identity, celebrating Desiness. Deepened retail leasing practice with 30+ brand relationships across fashion, F&B and entertainment.' },
        { year:'2023', desc:'Scaled hospitality transaction advisory with high-value asset sales and acquisitions across Delhi NCR, Chandigarh and Himachal Pradesh. Debt & Special Situations vertical established. Advisory pipeline crosses ₹1,000 Cr+.' },
        { year:'2024', desc:'Digital transformation initiative. India Gully Enterprise Platform (ERP), integrated advisory management, governance and HORECA procurement system launched.' },
      ].map((t,i) => `
      <div style="display:grid;grid-template-columns:1fr 44px 1fr;gap:0;margin-bottom:2.5rem;align-items:center;">
        ${i%2===0 ? `
        <div style="padding-right:3rem;text-align:right;">
          <div class="card card-lift reveal-l" style="padding:1.75rem;display:inline-block;text-align:left;max-width:360px;">
            <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2.25rem;color:var(--gold);line-height:1;margin-bottom:.625rem;">${t.year}</div>
            <p style="font-size:.875rem;color:var(--ink-soft);line-height:1.8;">${t.desc}</p>
          </div>
        </div>
        <div style="display:flex;justify-content:center;position:relative;z-index:1;">
          <div style="width:16px;height:16px;background:var(--gold);border:3px solid #fff;border-radius:50%;box-shadow:0 0 0 3px var(--gold-line);"></div>
        </div>
        <div></div>
        ` : `
        <div></div>
        <div style="display:flex;justify-content:center;position:relative;z-index:1;">
          <div style="width:16px;height:16px;background:var(--gold);border:3px solid #fff;border-radius:50%;box-shadow:0 0 0 3px var(--gold-line);"></div>
        </div>
        <div style="padding-left:3rem;">
          <div class="card card-lift reveal-r" style="padding:1.75rem;max-width:360px;">
            <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2.25rem;color:var(--gold);line-height:1;margin-bottom:.625rem;">${t.year}</div>
            <p style="font-size:.875rem;color:var(--ink-soft);line-height:1.8;">${t.desc}</p>
          </div>
        </div>
        `}
      </div>
      `).join('')}
    </div>
  </div>
</div>

<!-- LEADERSHIP TEAM -->
<div class="sec-wh" id="leadership" style="padding-top:7rem;">
  <div class="wrap">
    <div style="text-align:center;max-width:600px;margin:0 auto 4.5rem;">
      <div class="gr-c"></div>
      <p class="eyebrow" style="margin-bottom:.875rem;">Our People</p>
      <h2 class="h2">Board &amp; Key Managerial<br>Personnel</h2>
      <p class="lead" style="margin-top:1.25rem;">Three decades of combined experience spanning hospitality, real estate, retail and entertainment.</p>
    </div>

    <div class="team-grid" style="max-width:1080px;margin:0 auto;">
      ${[
        { name:'Arun Manikonda',  title:'Managing Director',       role:'Director on Board & KMP',        phone:'+91 98108 89134', email:'akm@indiagully.com',          init:'AM', photo:'/static/team/arun-manikonda.jpg', bio:"Arun leads India Gully's strategic direction and client relationships, bringing deep expertise in multi-vertical enterprise advisory across hospitality, retail and real estate. As Managing Director and Director on Board, he oversees all major mandates and institutional partnerships." },
        { name:'Pavan Manikonda', title:'Executive Director',       role:'Director on Board & KMP',        phone:'+91 6282556067', email:'pavan@indiagully.com',        init:'PM', photo:'/static/team/pavan-manikonda.jpg', bio:"Pavan drives operational excellence and business development across India Gully's advisory verticals. As Executive Director and Director on Board, he leads execution across hospitality management, brand on-boarding and project delivery mandates." },
        { name:'Amit Jhingan',    title:'President, Real Estate',   role:'Key Managerial Personnel (KMP)', phone:'+91 9899993543', email:'amit.jhingan@indiagully.com', init:'AJ', photo:'/static/team/amit-jhingan.png', bio:"Amit leads India Gully's Real Estate advisory vertical, overseeing transaction advisory mandates, investment sales, asset management and real estate brokerage across commercial, hospitality and mixed-use assets nationwide." },
      ].map((p, pi) => `
      <div class="feature-card reveal" style="overflow:hidden;transition-delay:${pi*0.12}s;">
        <!-- Photo area -->
        <div style="background:var(--ink);position:relative;overflow:hidden;">
          <div style="position:relative;width:100%;height:240px;overflow:hidden;">
            <img src="${p.photo}" alt="${p.name}"
                 style="width:100%;height:100%;object-fit:cover;object-position:center top;display:block;transition:transform .5s ease;"
                 onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'"
                 onerror="this.style.display='none';this.nextElementSibling.style.display='flex';">
            <div style="display:none;width:100%;height:240px;background:var(--ink-mid);align-items:center;justify-content:center;">
              <div style="width:80px;height:80px;background:linear-gradient(135deg,var(--gold),var(--gold-lt));display:flex;align-items:center;justify-content:center;">
                <span style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:#fff;">${p.init}</span>
              </div>
            </div>
            <!-- Gradient overlay -->
            <div style="position:absolute;inset:0;background:linear-gradient(to bottom,transparent 45%,rgba(0,0,0,.8) 100%);pointer-events:none;"></div>
            <!-- Name overlay on image -->
            <div style="position:absolute;bottom:0;left:0;right:0;padding:1.5rem;text-align:center;">
              <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.2rem;color:#fff;margin-bottom:.2rem;text-shadow:0 1px 6px rgba(0,0,0,.5);">${p.name}</h3>
              <p style="font-size:.78rem;color:var(--gold);margin-bottom:.12rem;">${p.title}</p>
              <p style="font-size:.62rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.45);">${p.role}</p>
            </div>
          </div>
        </div>
        <!-- Content -->
        <div style="padding:1.75rem;">
          <!-- Bio -->
          <p style="font-size:.875rem;color:var(--ink-soft);line-height:1.85;margin-bottom:1.5rem;">${p.bio}</p>
          <!-- Contact -->
          <div style="display:flex;flex-direction:column;gap:.5rem;padding-top:1.25rem;border-top:1px solid var(--border);">
            <a href="tel:${p.phone}" style="display:flex;align-items:center;gap:.65rem;font-size:.78rem;color:var(--ink-muted);transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-muted)'">
              <div style="width:28px;height:28px;background:var(--parch);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-phone" style="color:var(--gold);font-size:.58rem;"></i></div>${p.phone}
            </a>
            <a href="mailto:${p.email}" style="display:flex;align-items:center;gap:.65rem;font-size:.78rem;color:var(--ink-muted);transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-muted)'">
              <div style="width:28px;height:28px;background:var(--parch);border:1px solid var(--border);display:flex;align-items:center;justify-content:center;flex-shrink:0;"><i class="fas fa-envelope" style="color:var(--gold);font-size:.58rem;"></i></div>${p.email}
            </a>
          </div>
        </div>
      </div>
      `).join('')}
    </div>

    <div style="margin-top:3.5rem;background:var(--parch);border:1px solid var(--border);padding:1.5rem 2rem;max-width:700px;margin:3.5rem auto 0;text-align:center;">
      <p style="font-size:.8rem;color:var(--ink-muted);line-height:1.75;"><i class="fas fa-envelope" style="color:var(--gold);margin-right:.5rem;"></i>To connect with our leadership directly, reach us at <a href="mailto:info@indiagully.com" style="color:var(--gold);font-weight:600;">info@indiagully.com</a> or call <strong style="color:var(--ink);">+91 8988 988 988</strong>.</p>
    </div>
  </div>
</div>

<!-- COMPANY INFORMATION -->
<div class="sec-dk" style="padding-top:7rem;">
  <div class="wrap">
    <div style="display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:3.5rem;flex-wrap:wrap;gap:2rem;">
      <div>
        <div class="gr-lt"></div>
        <p class="eyebrow-lt" style="margin-bottom:.875rem;">Legal &amp; Regulatory</p>
        <h2 class="h2-lt">Company Information</h2>
      </div>
      <div style="max-width:360px;">
        <p style="font-size:.82rem;color:rgba(255,255,255,.4);line-height:1.8;">Incorporated in 2017 under the Companies Act 2013. ROC: NCT of Delhi &amp; Haryana. All advisory mandates governed by applicable laws of India.</p>
      </div>
    </div>

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(255,255,255,.05);">
      ${[
        { label:'Legal Name',       value:'Vivacious Entertainment and Hospitality Pvt. Ltd.' },
        { label:'Brand',            value:'India Gully™' },
        { label:'CIN',              value:'U74999DL2017PTC323237' },
        { label:'Incorporation',    value:'2017, New Delhi, India' },
        { label:'Registered Office',value:'New Delhi, India' },
        { label:'GSTIN',            value:'07AAGCV0867P1ZN' },
        { label:'Type',             value:'Private Limited Company' },
        { label:'ROC',              value:'Registrar of Companies, NCT of Delhi & Haryana' },
        { label:'Compliance',       value:'Companies Act, 2013 · ICSI SS-1 & SS-2' },
      ].map((item, ii) => `
      <div style="padding:1.75rem 1.5rem;background:rgba(255,255,255,.025);transition:all .22s;position:relative;overflow:hidden;cursor:default;" onmouseover="this.style.background='rgba(255,255,255,.05)'" onmouseout="this.style.background='rgba(255,255,255,.025)'">
        <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,var(--gold),transparent);opacity:.4;"></div>
        <div style="font-size:.58rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(184,150,12,.55);margin-bottom:.625rem;">${item.label}</div>
        <div style="font-size:.9rem;font-weight:500;color:#fff;line-height:1.4;">${item.value}</div>
      </div>
      `).join('')}
    </div>
  </div>
</div>

<!-- ══ BY THE NUMBERS ════════════════════════════════════════════════════ -->\n
<div style="background:var(--bg);padding:4.5rem 0;border-top:1px solid var(--border);">
  <div class="wrap">
    <div style="text-align:center;margin-bottom:3rem;">
      <p style="font-size:.6rem;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:.5rem;">Quantified Impact</p>
      <h2 class="h2" style="margin:0;">India Gully By The Numbers</h2>
    </div>
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem;">
      ${[
        { n:'₹1,165 Cr+', label:'Active Pipeline', sub:'8 mandates across 5 asset classes', icon:'chart-bar', color:'#B8960C' },
        { n:'₹2,000 Cr+', label:'Transactions Advised', sub:'Including ₹1,350 Cr+ Entertainment City mandate', icon:'trophy', color:'#1A3A6B' },
        { n:'1,40,000 sq ft', label:'Retail Leased', sub:'Across Delhi NCR and Gurugram', icon:'store', color:'#15803d' },
        { n:'15+', label:'Hotel Projects', sub:'PMC, pre-opening & HORECA supply', icon:'hotel', color:'#7C3AED' },
        { n:'500+ SKUs', label:'HORECA Catalogue', sub:'FF&E, OS&E, kitchen, linen, uniforms', icon:'utensils', color:'#B8960C' },
        { n:'₹50 Cr+', label:'Procurement Managed', sub:'Cumulative HORECA procurement value', icon:'truck', color:'#065F46' },
        { n:'30+', label:'Retail Brands', sub:'Brand partnerships in NCR & Gurugram', icon:'tag', color:'#1A3A6B' },
        { n:'8+', label:'Years', sub:'Established 2017, incorporated in Delhi', icon:'calendar-alt', color:'#B8960C' },
      ].map(s => `
      <div class="reveal" style="padding:2rem;border:1px solid var(--border-lt);text-align:center;transition:all .28s;position:relative;overflow:hidden;" onmouseover="this.style.borderColor='rgba(184,150,12,.3)';this.style.transform='translateY(-4px)'" onmouseout="this.style.borderColor='var(--border-lt)';this.style.transform='translateY(0)'">
        <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,${s.color},transparent);opacity:0;transition:opacity .3s;" class="num-top"></div>
        <i class="fas fa-${s.icon}" style="font-size:1.1rem;color:${s.color};margin-bottom:1rem;display:block;"></i>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.85rem;color:${s.color};line-height:1;margin-bottom:.5rem;letter-spacing:-.02em;">${s.n}</div>
        <div style="font-size:.72rem;font-weight:700;color:var(--ink);letter-spacing:.04em;margin-bottom:.35rem;">${s.label}</div>
        <p style="font-size:.72rem;color:var(--ink-muted);line-height:1.55;margin:0;">${s.sub}</p>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- ══ RECOGNITION & MEDIA ═══════════════════════════════════════════════ -->\n
<div style="background:#fff;padding:4.5rem 0;border-top:1px solid var(--border);">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start;">
      <div>
        <p style="font-size:.6rem;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:.875rem;">Recognition</p>
        <h2 class="h2" style="margin-bottom:2rem;">What Sets India Gully Apart</h2>
        <div style="display:flex;flex-direction:column;gap:1.25rem;">
          ${[
            { icon:'star', color:'#B8960C', title:'India\'s Only Multi-Vertical Boutique', desc:'We operate simultaneously across Real Estate, Retail, Hospitality, Entertainment, Debt & HORECA — a breadth matched by no other boutique advisory firm in India.' },
            { icon:'shield-alt', color:'#1A3A6B', title:'Institutional Rigour, Boutique Service', desc:'Every mandate receives the same financial rigour applied at tier-1 investment banks, combined with the direct personal accountability of a boutique advisor.' },
            { icon:'hands-helping', color:'#15803d', title:'Source-to-Close Advisory', desc:'From mandate origination through due diligence, NDA management, EOI, IM preparation and deal closing — we own the full process.' },
            { icon:'map-marked-alt', color:'#7C3AED', title:'Pan-India Network', desc:'From Lutyens\' Delhi to Kasauli, from Chandigarh to Aerocity — India Gully\'s network spans the full geography of Indian hospitality and real estate.' },
          ].map(s => `
          <div style="display:flex;gap:1rem;align-items:flex-start;padding:1.25rem;border:1px solid var(--border-lt);transition:all .22s;" onmouseover="this.style.borderColor='rgba(184,150,12,.25)';this.style.background='rgba(184,150,12,.02)'" onmouseout="this.style.borderColor='var(--border-lt)';this.style.background='transparent'">
            <div style="width:40px;height:40px;background:${s.color}15;border:1px solid ${s.color}25;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <i class="fas fa-${s.icon}" style="color:${s.color};font-size:.85rem;"></i>
            </div>
            <div>
              <div style="font-family:'DM Serif Display',Georgia,serif;font-size:.98rem;color:var(--ink);margin-bottom:.3rem;">${s.title}</div>
              <p style="font-size:.8rem;color:var(--ink-muted);line-height:1.65;margin:0;">${s.desc}</p>
            </div>
          </div>`).join('')}
        </div>
      </div>
      <div>
        <p style="font-size:.6rem;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:.875rem;">Marquee Mandates</p>
        <h2 class="h2" style="margin-bottom:2rem;">Selected Highlights</h2>
        <div style="display:flex;flex-direction:column;gap:1rem;">
          ${[
            { value:'₹1,350 Cr+', title:'Entertainment City Limited Divestment', desc:'Joint advisory mandate with EY for India\'s largest entertainment sector transaction — full due diligence, IBC process and asset restructuring advisory.', sector:'Entertainment', color:'#7C3AED' },
            { value:'₹400 Cr', title:'Prism Tower, Gurugram', desc:'312-key mixed-use hospitality & commercial asset advisory mandate. REIT-grade exit potential. 10 km metro connectivity. Active transaction.', sector:'Real Estate', color:'#1A3A6B' },
            { value:'₹70 Cr', title:'Hotel Rajshree & Spa, Chandigarh', desc:'41-key boutique hotel — full HORECA procurement refresh, operational enhancement and active asset sale advisory.', sector:'Hospitality', color:'#15803d' },
            { value:'₹45 Cr', title:'WelcomHeritage Santa Roza, Kasauli', desc:'44-key luxury heritage resort under ITC WelcomHeritage brand. End-to-end transaction advisory and investor outreach.', sector:'Heritage Hospitality', color:'#B8960C' },
            { value:'₹30 Cr', title:'Maple Resort Chail, Himachal Pradesh', desc:'30-key boutique mountain resort at 2,515 metres. Owner-direct advisory and active buyer outreach for premium mountain hospitality asset.', sector:'Hospitality', color:'#065F46' },
          ].map(m => `
          <div style="padding:1.25rem;border:1px solid var(--border-lt);display:flex;gap:1rem;align-items:flex-start;transition:all .22s;" onmouseover="this.style.borderColor='rgba(184,150,12,.25)'" onmouseout="this.style.borderColor='var(--border-lt)'">
            <div style="flex-shrink:0;text-align:right;min-width:80px;">
              <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.05rem;color:${m.color};line-height:1;">${m.value}</div>
              <span style="background:${m.color};color:#fff;font-size:.52rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:.15rem .45rem;display:inline-block;margin-top:.3rem;">${m.sector}</span>
            </div>
            <div style="flex:1;">
              <div style="font-family:'DM Serif Display',Georgia,serif;font-size:.9rem;color:var(--ink);margin-bottom:.3rem;line-height:1.2;">${m.title}</div>
              <p style="font-size:.75rem;color:var(--ink-muted);line-height:1.6;margin:0;">${m.desc}</p>
            </div>
          </div>`).join('')}
          <a href="/listings" style="display:flex;align-items:center;justify-content:center;gap:.5rem;padding:.875rem;background:var(--ink);color:#fff;text-decoration:none;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;transition:background .22s;" onmouseover="this.style.background='var(--gold)'" onmouseout="this.style.background='var(--ink)'">
            <i class="fas fa-folder-open" style="font-size:.65rem;"></i>View All Active Mandates
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

`
  return c.html(layout('About India Gully', content, {
    description: "About India Gully. Celebrating Desiness since 2017. Leadership, vision, values and the story behind India's premier multi-vertical advisory firm."
  }))
})

export default app
