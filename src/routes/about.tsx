import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

app.get('/', (c) => {
  const content = `

<!-- ABOUT HERO -->
<div style="background:var(--ink);padding:7rem 0 5rem;position:relative;overflow:hidden;">
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.05) 1px,transparent 1px);background-size:72px 72px;"></div>
  <div class="wrap" style="position:relative;">
    <div style="max-width:740px;" class="fu">
      <div class="gr-lt"></div>
      <p class="eyebrow" style="margin-bottom:.875rem;">About India Gully</p>
      <h1 class="h1" style="margin-bottom:1.5rem;">Celebrating<br><em style="color:var(--gold);font-style:italic;">Desiness</em><br><span style="font-size:.6em;font-weight:300;color:rgba(255,255,255,.5);">Since 2017.</span></h1>
      <p class="lead-lt" style="max-width:580px;">Vivacious Entertainment and Hospitality Pvt. Ltd. — a Delhi-based, multi-vertical enterprise advisory firm operating across Hospitality, Retail, Real Estate and Entertainment with a distinctly Indian identity.</p>
    </div>
  </div>
</div>

<!-- VISION & MISSION -->
<div class="sec-wh">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:start;">
      <div>
        <div class="gr"></div>
        <p class="eyebrow" style="margin-bottom:.75rem;">Our Purpose</p>
        <h2 class="h2" style="margin-bottom:2.5rem;">Vision &amp; Mission</h2>

        <div style="border-left:3px solid var(--gold);padding:1.5rem 1.75rem;background:var(--parch);margin-bottom:1.5rem;">
          <p class="eyebrow" style="margin-bottom:.75rem;">Vision</p>
          <p style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--ink);line-height:1.65;font-style:italic;">"To be India's most respected diversified advisory enterprise — creating extraordinary experiences in hospitality and entertainment while delivering unmatched strategic value to our clients and stakeholders."</p>
        </div>

        <div style="border-left:3px solid var(--ink-soft);padding:1.5rem 1.75rem;background:var(--parch);">
          <p style="font-size:.68rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.75rem;">Mission</p>
          <p style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--ink);line-height:1.65;font-style:italic;">"To combine deep sector expertise with operational excellence and global best practices, enabling our clients and ventures to achieve sustainable, scalable growth that benefits all stakeholders."</p>
        </div>
      </div>

      <div>
        <div class="gr"></div>
        <p class="eyebrow" style="margin-bottom:.75rem;">Core Values</p>
        <h2 class="h2" style="margin-bottom:2.5rem;">The Principles<br>That Guide Us</h2>

        <div style="display:flex;flex-direction:column;gap:0;">
          ${[
            { icon:'⚖️', name:'Integrity',   desc:'Transparent, ethical conduct in every engagement. We act in the best interests of our clients and maintain the highest standards of professional ethics.' },
            { icon:'🏆', name:'Excellence',  desc:'Relentless pursuit of the highest standards in everything we do — from mandate delivery to client communication and internal governance.' },
            { icon:'🤝', name:'Partnership', desc:'Long-term relationships built on trust, shared objectives and sustained value creation for clients, partners and communities we operate in.' },
            { icon:'💡', name:'Innovation',  desc:'Embracing new ideas, methodologies and technologies to solve complex challenges and create differentiated outcomes.' },
          ].map(v => `
          <div style="display:flex;gap:1.25rem;padding:1.5rem 0;border-bottom:1px solid var(--border);align-items:flex-start;" onmouseover="this.style.background='var(--parch)'" onmouseout="this.style.background='transparent'">
            <span style="font-size:1.5rem;flex-shrink:0;">${v.icon}</span>
            <div>
              <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--ink);margin-bottom:.35rem;">${v.name}</h3>
              <p class="body">${v.desc}</p>
            </div>
          </div>
          `).join('')}
        </div>
      </div>
    </div>
  </div>
</div>

<!-- JOURNEY / TIMELINE -->
<div class="sec-pd">
  <div class="wrap">
    <div style="text-align:center;max-width:560px;margin:0 auto 3.5rem;">
      <div class="gr-c"></div>
      <p class="eyebrow" style="margin-bottom:.75rem;">Our Story</p>
      <h2 class="h2">A Legacy of<br>Innovation</h2>
    </div>

    <div style="position:relative;max-width:900px;margin:0 auto;">
      <div style="position:absolute;left:50%;top:0;bottom:0;width:1px;background:var(--border);transform:translateX(-50%);"></div>

      ${[
        { year:'2017', desc:'Incorporated as Vivacious Entertainment and Hospitality Pvt. Ltd. in New Delhi. Commenced advisory operations across Hospitality and Entertainment sectors with founding team.' },
        { year:'2018', desc:'Launched hotel management and pre-opening consultancy vertical. First mandates executed for Cygnett, Regenta and Radisson brand properties across North India.' },
        { year:'2019', desc:'Expanded into Real Estate consulting and Retail Leasing strategy — building a truly diversified advisory practice across four complementary verticals.' },
        { year:'2020', desc:'HORECA Supplies vertical launched. Providing end-to-end FF&E, OS&E and kitchen procurement for hotel pre-openings and renovations across India.' },
        { year:'2021', desc:'Launched India Gully brand identity, celebrating Desiness. Deepened retail leasing practice with 30+ brand relationships across fashion, F&B and entertainment.' },
        { year:'2023', desc:'Greenfield hotel projects in Hosur, Shirdi and Goa underway. Entertainment destination advisory scaled to ₹4,500 Cr pipeline. Debt & Special Situations vertical established.' },
        { year:'2024', desc:'Digital transformation initiative. India Gully Enterprise Platform (ERP) — integrated advisory management, governance and HORECA procurement system launched.' },
      ].map((t,i) => `
      <div style="display:grid;grid-template-columns:1fr 40px 1fr;gap:0;margin-bottom:2rem;align-items:center;">
        ${i%2===0 ? `
        <div style="padding-right:2.5rem;text-align:right;">
          <div class="card card-lift" style="padding:1.5rem;display:inline-block;text-align:left;max-width:340px;">
            <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2rem;color:var(--gold);line-height:1;margin-bottom:.5rem;">${t.year}</div>
            <p class="body">${t.desc}</p>
          </div>
        </div>
        <div style="display:flex;justify-content:center;">
          <div style="width:14px;height:14px;background:var(--gold);border:3px solid #fff;border-radius:50%;position:relative;z-index:1;box-shadow:0 0 0 3px var(--border);"></div>
        </div>
        <div></div>
        ` : `
        <div></div>
        <div style="display:flex;justify-content:center;">
          <div style="width:14px;height:14px;background:var(--gold);border:3px solid #fff;border-radius:50%;position:relative;z-index:1;box-shadow:0 0 0 3px var(--border);"></div>
        </div>
        <div style="padding-left:2.5rem;">
          <div class="card card-lift" style="padding:1.5rem;max-width:340px;">
            <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2rem;color:var(--gold);line-height:1;margin-bottom:.5rem;">${t.year}</div>
            <p class="body">${t.desc}</p>
          </div>
        </div>
        `}
      </div>
      `).join('')}
    </div>
  </div>
</div>

<!-- LEADERSHIP TEAM -->
<div class="sec-wh" id="leadership">
  <div class="wrap">
    <div style="text-align:center;max-width:600px;margin:0 auto 3.5rem;">
      <div class="gr-c"></div>
      <p class="eyebrow" style="margin-bottom:.75rem;">Our People</p>
      <h2 class="h2">Board &amp; Key Managerial<br>Personnel</h2>
      <p class="lead" style="margin-top:1rem;">Our leadership operates under the Companies Act, 2013 governance framework with full compliance to ICSI secretarial standards.</p>
    </div>

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;max-width:1000px;margin:0 auto;">
      ${[
        { name:'Arun Manikonda',  title:'Managing Director',       role:'Director on Board & KMP',        phone:'+91 8988 988 988', email:'akm@indiagully.com',          init:'AM', photo:'https://www.genspark.ai/api/files/s/gUf0JwAa', bio:"Arun leads India Gully's strategic direction and client relationships, bringing deep expertise in multi-vertical enterprise advisory across hospitality, retail and real estate. As Managing Director and Director on Board, he oversees all major mandates and institutional partnerships." },
        { name:'Pavan Manikonda', title:'Executive Director',       role:'Director on Board & KMP',        phone:'+91 6282556067', email:'pavan@indiagully.com',        init:'PM', photo:'https://www.genspark.ai/api/files/s/Q3swImT2', bio:"Pavan drives operational excellence and business development across India Gully's advisory verticals. As Executive Director and Director on Board, he leads execution across hospitality management, brand on-boarding and project delivery mandates." },
        { name:'Amit Jhingan',    title:'President, Real Estate',   role:'Key Managerial Personnel (KMP)', phone:'+91 9899993543', email:'amit.jhingan@indiagully.com', init:'AJ', photo:'https://www.genspark.ai/api/files/s/LQZueDyt', bio:"Amit leads India Gully's Real Estate advisory vertical — overseeing transaction advisory mandates, investment sales, asset management and real estate brokerage across commercial, hospitality and mixed-use assets nationwide." },
      ].map(p => `
      <div class="card" style="overflow:hidden;">
        <div style="background:var(--ink);padding:0;text-align:center;position:relative;overflow:hidden;">
          <div style="position:relative;width:100%;height:220px;overflow:hidden;">
            <img src="${p.photo}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover;object-position:center top;display:block;transition:transform .4s;" 
                 onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'"
                 onerror="this.onerror=null;this.style.display='none';this.nextElementSibling.style.display='flex';">
            <div style="display:none;width:100%;height:220px;background:var(--ink);align-items:center;justify-content:center;">
              <div style="width:80px;height:80px;background:var(--gold);display:flex;align-items:center;justify-content:center;">
                <span style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:#fff;font-weight:700;">${p.init}</span>
              </div>
            </div>
            <div style="position:absolute;inset:0;background:linear-gradient(to bottom,transparent 50%,rgba(0,0,0,.75) 100%);pointer-events:none;"></div>
            <div style="position:absolute;bottom:0;left:0;right:0;padding:1.25rem;text-align:center;">
              <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:#fff;margin-bottom:.2rem;text-shadow:0 1px 4px rgba(0,0,0,.5);">${p.name}</h3>
              <p style="font-size:.78rem;color:var(--gold);margin-bottom:.15rem;">${p.title}</p>
              <p style="font-size:.65rem;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.5);">${p.role}</p>
            </div>
          </div>
        </div>
        <div style="padding:1.5rem;">
          <p class="body" style="margin-bottom:1.25rem;">${p.bio}</p>
          <div style="display:flex;flex-direction:column;gap:.4rem;">
            <a href="tel:${p.phone}" style="display:flex;align-items:center;gap:.5rem;font-size:.775rem;color:var(--ink-muted);transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-muted)'"><i class="fas fa-phone" style="width:14px;color:var(--gold);font-size:.65rem;"></i>${p.phone}</a>
            <a href="mailto:${p.email}" style="display:flex;align-items:center;gap:.5rem;font-size:.775rem;color:var(--ink-muted);transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-muted)'"><i class="fas fa-envelope" style="width:14px;color:var(--gold);font-size:.65rem;"></i>${p.email}</a>
          </div>
        </div>
      </div>
      `).join('')}
    </div>

    <div style="margin-top:3rem;background:var(--parch);border:1px solid var(--border);padding:1.25rem 1.5rem;max-width:700px;margin:3rem auto 0;text-align:center;">
      <p style="font-size:.75rem;color:var(--ink-muted);line-height:1.7;"><i class="fas fa-shield-alt" style="color:var(--gold);margin-right:.5rem;"></i><strong style="color:var(--ink);">Governance Note:</strong> India Gully operates under full compliance with the Companies Act, 2013. All Directors hold valid DIN per MCA records. Board meetings, minutes and statutory registers are maintained per ICSI Secretarial Standards SS-1 and SS-2.</p>
    </div>
  </div>
</div>

<!-- COMPANY INFORMATION -->
<div class="sec-dk">
  <div class="wrap">
    <div class="gr-lt"></div>
    <p class="eyebrow-lt" style="margin-bottom:.75rem;">Legal &amp; Regulatory</p>
    <h2 class="h2-lt" style="margin-bottom:3rem;">Company Information</h2>

    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(255,255,255,.06);">
      ${[
        { label:'Legal Name',       value:'Vivacious Entertainment and Hospitality Pvt. Ltd.' },
        { label:'Brand',            value:'India Gully™' },
        { label:'CIN',              value:'U74900DL2017PTC000000' },
        { label:'Incorporation',    value:'2017, New Delhi, India' },
        { label:'Registered Office',value:'New Delhi, India' },
        { label:'GSTIN',            value:'07AABCV1234F1Z5' },
        { label:'Type',             value:'Private Limited Company' },
        { label:'ROC',              value:'Registrar of Companies, NCT of Delhi & Haryana' },
        { label:'Compliance',       value:'Companies Act, 2013 · ICSI SS-1 & SS-2' },
      ].map(item => `
      <div style="padding:1.5rem;background:rgba(255,255,255,.02);border-right:1px solid rgba(255,255,255,.04);transition:background .2s;" onmouseover="this.style.background='rgba(255,255,255,.04)'" onmouseout="this.style.background='rgba(255,255,255,.02)'">
        <div class="caption-lt" style="margin-bottom:.35rem;">${item.label}</div>
        <div style="font-size:.875rem;font-weight:500;color:#fff;">${item.value}</div>
      </div>
      `).join('')}
    </div>
  </div>
</div>

`
  return c.html(layout('About India Gully', content, {
    description: "About India Gully — Celebrating Desiness since 2017. Leadership, vision, values and the story behind India's premier multi-vertical advisory firm."
  }))
})

export default app
