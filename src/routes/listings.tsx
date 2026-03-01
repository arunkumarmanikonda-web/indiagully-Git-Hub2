import { Hono } from 'hono'
import { layout } from '../lib/layout'
import { LISTINGS } from '../lib/constants'

const app = new Hono()

// ── STATUS BADGE CONFIG ────────────────────────────────────────────────────
function statusStyle(type: string) {
  const map: Record<string, { bg: string; text: string; border: string }> = {
    active:      { bg: 'rgba(184,150,12,.12)', text: '#B8960C', border: 'rgba(184,150,12,.3)' },
    negotiation: { bg: 'rgba(37,99,235,.1)',   text: '#1d4ed8', border: 'rgba(37,99,235,.25)' },
    feasibility: { bg: 'rgba(22,163,74,.08)',  text: '#15803d', border: 'rgba(22,163,74,.2)'  },
  }
  return map[type] || map.active
}

// ── LISTINGS INDEX ─────────────────────────────────────────────────────────
app.get('/', (c) => {

  // Pipeline totals
  const total = LISTINGS.reduce((s, l) => {
    const v = parseFloat((l.value || '').replace(/[₹,Cr+\s]/g,''))
    return s + (isNaN(v) ? 0 : v)
  }, 0)

  const content = `

<!-- ══ HERO ══════════════════════════════════════════════════════════════ -->
<div style="background:var(--ink);padding:7rem 0 5rem;position:relative;overflow:hidden;">
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.045) 1px,transparent 1px);background-size:72px 72px;pointer-events:none;"></div>
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse 55% 70% at 70% 40%,rgba(184,150,12,.04) 0%,transparent 60%);pointer-events:none;"></div>
  <div class="wrap" style="position:relative;">
    <div style="max-width:800px;" class="fu">
      <div class="gr-lt"></div>
      <p class="eyebrow" style="margin-bottom:.875rem;">Investment Opportunities</p>
      <h1 class="h1" style="margin-bottom:1.5rem;">Active<br><em style="color:var(--gold);font-style:italic;">Mandates</em></h1>
      <p class="lead-lt" style="max-width:580px;margin-bottom:2.5rem;">Institutional-grade investment mandates across India's premier asset classes. All opportunities are exclusive to India Gully's advisory pipeline and subject to NDA. Information Memoranda available to qualified investors, family offices and institutional buyers upon request.</p>
      <div style="display:flex;flex-wrap:wrap;gap:.75rem;">
        ${['All Mandates','Entertainment','Real Estate','Hospitality','Retail'].map((f,i) => `
        <button onclick="filterMandates('${f}')" data-filter="${f}" class="filter-btn${i===0?' active':''}" style="padding:.42rem 1.1rem;font-size:.72rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;border:1px solid ${i===0?'var(--gold)':'rgba(255,255,255,.18)'};background:${i===0?'var(--gold)':'transparent'};color:${i===0?'#fff':'rgba(255,255,255,.5)'};cursor:pointer;transition:all .2s;">${f}</button>
        `).join('')}
      </div>
    </div>
  </div>
</div>

<!-- ══ PIPELINE STATS ═══════════════════════════════════════════════════ -->
<div style="background:var(--ink-mid);border-bottom:1px solid rgba(255,255,255,.06);">
  <div class="wrap" style="padding-top:0;padding-bottom:0;">
    <div style="display:grid;grid-template-columns:repeat(4,1fr);border-left:1px solid rgba(255,255,255,.06);">
      ${[
        { n:'₹8,815 Cr+', l:'Total Pipeline Value' },
        { n:'6',          l:'Active Mandates' },
        { n:'5',          l:'Asset Classes' },
        { n:'NDA Required', l:'All Mandates · Exclusive' },
      ].map(s => `
      <div style="padding:2rem 1.75rem;border-right:1px solid rgba(255,255,255,.06);text-align:center;">
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2.25rem;color:var(--gold);line-height:1;margin-bottom:.4rem;">${s.n}</div>
        <div style="font-size:.62rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.6);">${s.l}</div>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- ══ MANDATE CARDS ═════════════════════════════════════════════════════ -->
<div class="sec-pd" style="padding-top:4rem;">
  <div class="wrap">

    <!-- Grid of cards -->
    <div id="mandatesGrid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.75rem;">
      ${LISTINGS.map((l: any, idx: number) => {
        const ss = statusStyle(l.statusType)
        const img = l.images?.[0] || 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80'
        return `
      <!-- MANDATE CARD: ${l.id} -->
      <a href="/listings/${l.id}" data-sector="${l.sector}" class="mandate-card"
         style="display:block;background:#fff;border:1px solid var(--border);overflow:hidden;transition:border-color .25s,box-shadow .3s,transform .3s;text-decoration:none;animation:fadeUp .55s ease ${idx * 0.08}s both;"
         onmouseover="this.style.borderColor='var(--gold)';this.style.boxShadow='0 20px 60px rgba(0,0,0,.12)';this.style.transform='translateY(-4px)'"
         onmouseout="this.style.borderColor='var(--border)';this.style.boxShadow='none';this.style.transform='translateY(0)'">

        <!-- IMAGE with status badge -->
        <div style="position:relative;height:220px;overflow:hidden;background:#1a1a1a;">
          <img src="${img}" alt="${l.title}" style="width:100%;height:100%;object-fit:cover;transition:transform 6s ease;" loading="lazy"
               onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'">
          <!-- Dark overlay gradient -->
          <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(5,5,5,.7) 0%,rgba(5,5,5,.1) 60%,transparent 100%);"></div>
          <!-- Sector pill (top-left) -->
          <div style="position:absolute;top:1rem;left:1rem;">
            <span style="background:${l.sectorColor};color:#fff;font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:.28rem .7rem;">${l.sector}</span>
          </div>
          <!-- Value (bottom-left) -->
          <div style="position:absolute;bottom:1rem;left:1rem;">
            <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:#fff;line-height:1;text-shadow:0 1px 8px rgba(0,0,0,.5);">${l.value}</div>
            <div style="font-size:.6rem;color:rgba(255,255,255,.6);letter-spacing:.1em;">${l.valueUSD || ''}</div>
          </div>
          <!-- Image count (bottom-right) -->
          <div style="position:absolute;bottom:1rem;right:1rem;display:flex;align-items:center;gap:.3rem;background:rgba(0,0,0,.45);padding:.22rem .6rem;backdrop-filter:blur(4px);">
            <i class="fas fa-images" style="font-size:.55rem;color:rgba(255,255,255,.65);"></i>
            <span style="font-size:.6rem;color:rgba(255,255,255,.65);">${(l.images||[]).length} photos</span>
          </div>
        </div>

        <!-- CONTENT -->
        <div style="padding:1.5rem;">
          <!-- Status + Location row -->
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:.875rem;flex-wrap:wrap;gap:.4rem;">
            <span style="background:${ss.bg};color:${ss.text};border:1px solid ${ss.border};font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:.22rem .65rem;">${l.status}</span>
            <span style="font-size:.7rem;color:var(--ink-muted);display:flex;align-items:center;gap:.3rem;"><i class="fas fa-map-marker-alt" style="color:var(--gold);font-size:.55rem;"></i>${l.locationShort}</span>
          </div>

          <!-- Title -->
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.2rem;color:var(--ink);line-height:1.25;margin-bottom:.4rem;">${l.title}</h3>
          <p style="font-size:.75rem;color:var(--gold);font-weight:500;margin-bottom:.875rem;">${l.subtitle}</p>

          <!-- Description -->
          <p style="font-size:.825rem;color:var(--ink-muted);line-height:1.7;margin-bottom:1.25rem;">${l.desc}</p>

          <!-- Key metrics row -->
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:.625rem;margin-bottom:1.25rem;">
            ${l.highlights.slice(0,2).map((h: any) => `
            <div style="background:var(--parch);border:1px solid var(--border);padding:.75rem;">
              <div style="font-size:.6rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.25rem;">${h.label}</div>
              <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--gold);line-height:1;">${h.value}</div>
            </div>`).join('')}
          </div>

          <!-- Tags -->
          <div style="display:flex;flex-wrap:wrap;gap:.35rem;margin-bottom:1.25rem;">
            ${l.tags.slice(0,4).map((t: string) => `<span style="background:rgba(17,17,17,.05);color:var(--ink-soft);border:1px solid var(--border);font-size:.62rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;padding:.18rem .55rem;">${t}</span>`).join('')}
          </div>

          <!-- CTA row -->
          <div style="display:flex;align-items:center;justify-content:space-between;padding-top:1rem;border-top:1px solid var(--border);">
            <span style="font-size:.72rem;color:var(--gold);font-weight:600;letter-spacing:.06em;text-transform:uppercase;display:flex;align-items:center;gap:.4rem;">
              <i class="fas fa-file-alt" style="font-size:.65rem;"></i>View Full Details
            </span>
            <span style="font-size:.65rem;color:var(--ink-faint);display:flex;align-items:center;gap:.3rem;">
              ${l.nda ? `<i class="fas fa-lock" style="font-size:.55rem;color:var(--gold);"></i>NDA Required` : `<i class="fas fa-unlock" style="font-size:.55rem;"></i>Open`}
            </span>
          </div>
        </div>
      </a>`
      }).join('')}
    </div>

    <!-- Footer note -->
    <div style="text-align:center;margin-top:3.5rem;padding-top:2.5rem;border-top:1px solid var(--border);">
      <p style="font-size:.78rem;color:var(--ink-muted);margin-bottom:1.25rem;max-width:600px;margin-left:auto;margin-right:auto;line-height:1.8;">All mandates are strictly by NDA · Information Memoranda available to qualified investors · Please contact our advisory team to execute NDA and access deal documentation</p>
      <a href="/contact" class="btn btn-g">Submit a Mandate Enquiry</a>
    </div>
  </div>
</div>

<script>
function filterMandates(sector) {
  var cards = document.querySelectorAll('.mandate-card');
  var btns  = document.querySelectorAll('.filter-btn');
  btns.forEach(function(b) {
    var isActive = b.dataset.filter === sector;
    b.style.borderColor  = isActive ? 'var(--gold)' : 'rgba(255,255,255,.18)';
    b.style.background   = isActive ? 'var(--gold)' : 'transparent';
    b.style.color        = isActive ? '#fff' : 'rgba(255,255,255,.5)';
  });
  cards.forEach(function(card) {
    var match = sector === 'All Mandates' || card.dataset.sector === sector;
    card.style.display = match ? 'block' : 'none';
  });
}
</script>

`
  return c.html(layout('Active Mandates', content, {
    description: 'India Gully active mandates — institutional-grade investment opportunities across Real Estate, Hospitality, Entertainment and Retail. All opportunities subject to NDA.'
  }))
})

// ── INDIVIDUAL MANDATE DETAIL ──────────────────────────────────────────────
app.get('/:id', (c) => {
  const id = c.req.param('id')
  const listing = LISTINGS.find((l: any) => l.id === id)
  if (!listing) return c.redirect('/listings')
  const l = listing as any

  // Other mandates for the "More Mandates" section
  const others = LISTINGS.filter((x: any) => x.id !== id).slice(0, 3)
  const ss = statusStyle(l.statusType)

  // G4: NDA acceptance modal — shown if listing requires NDA and user hasn't accepted
  // Acceptance stored in sessionStorage keyed by mandate ID.
  // Only the hero image is visible before acceptance; all sensitive detail is blurred/hidden.
  const ndaModal = l.nda ? `
<!-- ══ NDA GATE MODAL — G4 ═══════════════════════════════════════════ -->
<div id="nda-gate" style="position:fixed;inset:0;z-index:9000;display:flex;align-items:center;justify-content:center;padding:1.5rem;background:rgba(8,8,8,.88);backdrop-filter:blur(12px);">
  <div style="width:100%;max-width:520px;background:#fff;overflow:hidden;box-shadow:0 40px 100px rgba(0,0,0,.6);">
    <div style="background:var(--ink);padding:2rem;text-align:center;">
      <div style="width:52px;height:52px;background:var(--gold);display:flex;align-items:center;justify-content:center;margin:0 auto .875rem;">
        <i class="fas fa-file-contract" style="color:#fff;font-size:1.15rem;"></i>
      </div>
      <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.4rem;color:#fff;margin-bottom:.35rem;">Confidential Mandate</h2>
      <p style="font-size:.75rem;color:rgba(255,255,255,.45);">NDA acceptance required to view full details</p>
    </div>
    <div style="padding:1.75rem;">
      <div style="background:#fffbeb;border:1px solid #fde68a;padding:.875rem 1rem;margin-bottom:1.25rem;font-size:.78rem;color:#78350f;line-height:1.7;">
        <i class="fas fa-exclamation-triangle" style="margin-right:.4rem;color:#d97706;"></i>
        <strong>${l.title}</strong> is subject to a mutual Non-Disclosure Agreement. The Information Memorandum, financial projections, legal documentation and full mandate details are only accessible to qualified investors who have accepted NDA obligations.
      </div>
      <div style="border:1px solid var(--border);padding:1rem;margin-bottom:1.25rem;max-height:160px;overflow-y:auto;font-size:.75rem;color:var(--ink-soft);line-height:1.8;">
        <p style="font-weight:700;margin-bottom:.5rem;color:var(--ink);">Non-Disclosure Agreement — Key Obligations</p>
        <ol style="padding-left:1.25rem;margin:0;">
          <li>All information disclosed about this mandate, including financial data, legal structure, counterparty details and advisory analysis, is strictly confidential.</li>
          <li>You agree not to disclose, reproduce, distribute or use this information for any purpose other than evaluating a potential investment.</li>
          <li>This obligation survives termination of any potential transaction and shall continue for a period of 3 years.</li>
          <li>India Gully Advisory LLP retains exclusive mandate rights. Any direct approach to the underlying counterparty is a breach of this agreement.</li>
          <li>Breach of this NDA may result in legal action under the Indian Contract Act 1872 and applicable information-technology laws.</li>
        </ol>
      </div>
      <label style="display:flex;align-items:flex-start;gap:.625rem;cursor:pointer;margin-bottom:1.25rem;">
        <input type="checkbox" id="nda-check" style="accent-color:var(--gold);margin-top:.2rem;flex-shrink:0;">
        <span style="font-size:.78rem;color:var(--ink-soft);line-height:1.6;">
          I have read and agree to be bound by the Non-Disclosure Agreement obligations above. I confirm I am a qualified investor, family office or institutional buyer evaluating this opportunity in good faith.
        </span>
      </label>
      <div style="display:flex;gap:.875rem;">
        <a href="/listings" style="flex:1;padding:.875rem;border:1px solid var(--border);text-align:center;font-size:.75rem;font-weight:600;color:var(--ink-soft);text-decoration:none;transition:all .2s;" onmouseover="this.style.borderColor='var(--ink)'" onmouseout="this.style.borderColor='var(--border)'">
          <i class="fas fa-arrow-left" style="margin-right:.4rem;font-size:.65rem;"></i>Back to Mandates
        </a>
        <button id="nda-accept" onclick="igAcceptNDA('${l.id}')" disabled
                style="flex:2;padding:.875rem;background:#ccc;color:#fff;border:none;cursor:not-allowed;font-size:.78rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;transition:all .2s;">
          <i class="fas fa-file-signature" style="margin-right:.5rem;font-size:.72rem;"></i>Accept &amp; View Mandate
        </button>
      </div>
    </div>
  </div>
</div>
<style>#nda-gate{transition:opacity .3s;}#nda-blurred{transition:filter .5s,opacity .5s;}</style>
<script>
(function(){
  var KEY='ig_nda_${l.id}';
  var gate=document.getElementById('nda-gate');
  var check=document.getElementById('nda-check');
  var btn=document.getElementById('nda-accept');
  // Already accepted in this session?
  if(sessionStorage.getItem(KEY)==='accepted'){if(gate){gate.style.display='none';}}
  // Enable accept button only when checkbox is ticked
  if(check&&btn){check.addEventListener('change',function(){
    btn.disabled=!check.checked;
    btn.style.background=check.checked?'var(--ink)':'#ccc';
    btn.style.cursor=check.checked?'pointer':'not-allowed';
  });}
})();
function igAcceptNDA(mandateId){
  sessionStorage.setItem('ig_nda_'+mandateId,'accepted');
  var gate=document.getElementById('nda-gate');
  if(gate){gate.style.opacity='0';setTimeout(function(){gate.style.display='none';},300);}
}
</script>` : ''

  const content = `
${ndaModal}

<!-- ══ DETAIL HERO ══════════════════════════════════════════════════════ -->
<div style="background:var(--ink);position:relative;overflow:hidden;">
  <!-- Full-bleed image carousel -->
  <div class="detail-car" style="position:relative;height:65vh;min-height:480px;max-height:700px;overflow:hidden;">
    <div class="detail-track" style="display:flex;height:100%;transition:transform .85s cubic-bezier(.77,0,.175,1);">
      ${(l.images || []).map((img: string, i: number) => `
      <div style="flex:0 0 100%;position:relative;overflow:hidden;">
        <img src="${img}" alt="${l.title} — image ${i+1}"
             style="width:100%;height:100%;object-fit:cover;transform:scale(1.04);transition:transform 10s ease-out;"
             class="detail-img" loading="${i === 0 ? 'eager' : 'lazy'}">
        <div style="position:absolute;inset:0;background:linear-gradient(to right,rgba(0,0,0,.7) 0%,rgba(0,0,0,.3) 50%,rgba(0,0,0,.15) 100%);"></div>
        <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.6) 0%,transparent 50%);"></div>
      </div>`).join('')}
    </div>

    <!-- Thumbnail strip -->
    <div style="position:absolute;bottom:1.25rem;left:50%;transform:translateX(-50%);display:flex;gap:.5rem;z-index:10;">
      ${(l.images || []).map((_: string, i: number) => `
      <button onclick="window.detailGo(${i})" data-dslide="${i}" class="d-dot"
              style="width:${i===0?'36px':'10px'};height:10px;border-radius:5px;background:${i===0?'var(--gold)':'rgba(255,255,255,.35)'};border:none;cursor:pointer;transition:all .3s;padding:0;"></button>`).join('')}
    </div>

    <!-- Arrows -->
    <button id="dPrev" data-prev="1" style="position:absolute;top:50%;left:1.5rem;transform:translateY(-50%);width:44px;height:44px;border:1px solid rgba(255,255,255,.25);background:rgba(0,0,0,.3);backdrop-filter:blur(8px);color:#fff;font-size:.85rem;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:10;transition:all .2s;" onmouseover="this.style.background='var(--gold)';this.style.borderColor='var(--gold)'" onmouseout="this.style.background='rgba(0,0,0,.3)';this.style.borderColor='rgba(255,255,255,.25)'"><i class="fas fa-chevron-left"></i></button>
    <button id="dNext" data-next="1" style="position:absolute;top:50%;right:1.5rem;transform:translateY(-50%);width:44px;height:44px;border:1px solid rgba(255,255,255,.25);background:rgba(0,0,0,.3);backdrop-filter:blur(8px);color:#fff;font-size:.85rem;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:10;transition:all .2s;" onmouseover="this.style.background='var(--gold)';this.style.borderColor='var(--gold)'" onmouseout="this.style.background='rgba(0,0,0,.3)';this.style.borderColor='rgba(255,255,255,.25)'"><i class="fas fa-chevron-right"></i></button>

    <!-- Photo count -->
    <div style="position:absolute;top:1.25rem;right:1.5rem;background:rgba(0,0,0,.45);backdrop-filter:blur(8px);padding:.3rem .75rem;z-index:10;display:flex;align-items:center;gap:.4rem;">
      <i class="fas fa-images" style="color:var(--gold);font-size:.65rem;"></i>
      <span id="photoCount" style="font-size:.68rem;color:#fff;letter-spacing:.08em;">1 / ${(l.images||[]).length}</span>
    </div>

    <!-- Back link -->
    <a href="/listings" style="position:absolute;top:1.25rem;left:1.5rem;z-index:10;display:inline-flex;align-items:center;gap:.5rem;font-size:.75rem;color:rgba(255,255,255,.7);background:rgba(0,0,0,.35);backdrop-filter:blur(8px);padding:.35rem .875rem;transition:color .2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.7)'">
      <i class="fas fa-arrow-left" style="font-size:.6rem;"></i>All Mandates
    </a>
  </div>

  <!-- Title bar below image -->
  <div class="wrap" style="padding-top:2.5rem;padding-bottom:2.5rem;">
    <div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:1.5rem;">
      <div>
        <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:.875rem;flex-wrap:wrap;">
          <span style="background:${l.sectorColor};color:#fff;font-size:.62rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;padding:.28rem .75rem;">${l.sector}</span>
          <span style="background:${ss.bg};color:${ss.text};border:1px solid ${ss.border};font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:.28rem .7rem;">${l.status}</span>
          <span style="font-size:.75rem;color:rgba(255,255,255,.4);display:flex;align-items:center;gap:.35rem;"><i class="fas fa-map-marker-alt" style="color:var(--gold);font-size:.6rem;"></i>${l.location}</span>
        </div>
        <h1 style="font-family:'DM Serif Display',Georgia,serif;font-size:clamp(1.75rem,4vw,3rem);color:#fff;line-height:1.1;margin-bottom:.5rem;">${l.title}</h1>
        <p style="font-size:1rem;color:var(--gold);font-weight:400;">${l.subtitle}</p>
      </div>
      <div style="text-align:right;flex-shrink:0;">
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:3rem;color:var(--gold);line-height:1;">${l.value}</div>
        <div style="font-size:.72rem;color:rgba(255,255,255,.65);margin-top:.2rem;">${l.valueUSD || ''}</div>
        <div style="font-size:.62rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.55);margin-top:.35rem;">${l.mandateType}</div>
      </div>
    </div>
  </div>
</div>

<!-- ══ DETAIL BODY ════════════════════════════════════════════════════════ -->
<div class="sec-pd" style="padding-top:3rem;">
  <div class="wrap">
    <div style="display:grid;grid-template-columns:1fr 380px;gap:3.5rem;align-items:start;">

      <!-- ── LEFT COLUMN ──────────────────────────────────── -->
      <div>

        <!-- Overview -->
        <div style="margin-bottom:2.5rem;">
          <div class="gr" style="margin-bottom:1rem;"></div>
          <p class="eyebrow" style="margin-bottom:.6rem;">Mandate Overview</p>
          <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:var(--ink);margin-bottom:1.25rem;">${l.title}</h2>
          <div style="font-size:.9375rem;color:var(--ink-soft);line-height:1.85;white-space:pre-line;">${l.longDesc}</div>
        </div>

        <!-- 4-metric highlights -->
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1px;background:var(--border);margin-bottom:2.5rem;">
          ${l.highlights.map((h: any) => `
          <div style="background:#fff;padding:1.5rem 1.25rem;text-align:center;">
            <div style="width:36px;height:36px;background:var(--ink);display:flex;align-items:center;justify-content:center;margin:0 auto .875rem;">
              <i class="fas fa-${h.icon}" style="color:var(--gold);font-size:.72rem;"></i>
            </div>
            <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.35rem;color:var(--gold);line-height:1;margin-bottom:.3rem;">${h.value}</div>
            <div style="font-size:.65rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);">${h.label}</div>
          </div>`).join('')}
        </div>

        <!-- Full spec sheet — Sotheby's style table -->
        <div style="margin-bottom:2.5rem;">
          <p style="font-size:.68rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.875rem;padding-bottom:.625rem;border-bottom:1px solid var(--border);">Full Specifications</p>
          <table style="width:100%;border-collapse:collapse;">
            ${Object.entries(l.specs || {}).map(([key, val]: [string, any], i: number) => `
            <tr style="border-bottom:1px solid ${i % 2 === 0 ? 'var(--border)' : 'transparent'};">
              <td style="padding:.875rem 1rem;font-size:.75rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-muted);width:42%;background:${i%2===0?'var(--parch)':'#fff'};">${key}</td>
              <td style="padding:.875rem 1rem;font-size:.875rem;color:var(--ink);font-weight:500;background:${i%2===0?'var(--parch)':'#fff'};">${val}</td>
            </tr>`).join('')}
          </table>
        </div>

        <!-- Tags -->
        <div style="display:flex;flex-wrap:wrap;gap:.45rem;margin-bottom:1rem;">
          ${l.tags.map((t: string) => `
          <span style="background:rgba(184,150,12,.08);color:var(--gold);border:1px solid rgba(184,150,12,.2);font-size:.65rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:.22rem .65rem;">${t}</span>`).join('')}
        </div>

      </div>

      <!-- ── RIGHT SIDEBAR ────────────────────────────────── -->
      <div style="position:sticky;top:calc(var(--nav-h) + 1.5rem);display:flex;flex-direction:column;gap:1.25rem;">

        <!-- Express Interest Form -->
        <div style="background:var(--ink);overflow:hidden;">
          <div style="background:var(--gold);padding:1.25rem 1.5rem;">
            <p style="font-size:.65rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.7);margin-bottom:.2rem;">Exclusive Mandate</p>
            <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.25rem;color:#fff;line-height:1.2;">Request Information Memorandum</h3>
          </div>
          <div style="padding:1.5rem;">
            <p style="font-size:.78rem;color:rgba(255,255,255,.45);line-height:1.7;margin-bottom:1.25rem;">Submit your details below. Our advisory team will verify your profile and revert within 24 hours with NDA documentation.</p>
            <form class="ig-form" method="POST" action="/api/enquiry" style="display:flex;flex-direction:column;gap:.875rem;">
              <input type="hidden" name="mandate" value="${l.id}">
              <input type="hidden" name="mandateTitle" value="${l.title}">
              <div>
                <label style="display:block;font-size:.62rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.65);margin-bottom:.3rem;">Full Name *</label>
                <input type="text" name="name" required placeholder="Your name"
                       style="width:100%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);padding:.72rem .9rem;font-size:.85rem;color:#fff;font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s;"
                       onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='rgba(255,255,255,.1)'">
              </div>
              <div>
                <label style="display:block;font-size:.62rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.65);margin-bottom:.3rem;">Email Address *</label>
                <input type="email" name="email" required placeholder="your@email.com"
                       style="width:100%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);padding:.72rem .9rem;font-size:.85rem;color:#fff;font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s;"
                       onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='rgba(255,255,255,.1)'">
              </div>
              <div>
                <label style="display:block;font-size:.62rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.65);margin-bottom:.3rem;">Organisation</label>
                <input type="text" name="org" placeholder="Fund / Family Office / Developer"
                       style="width:100%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);padding:.72rem .9rem;font-size:.85rem;color:#fff;font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s;"
                       onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='rgba(255,255,255,.1)'">
              </div>
              <div>
                <label style="display:block;font-size:.62rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.65);margin-bottom:.3rem;">Phone</label>
                <input type="tel" name="phone" placeholder="+91 XXXXX XXXXX"
                       style="width:100%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);padding:.72rem .9rem;font-size:.85rem;color:#fff;font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s;"
                       onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='rgba(255,255,255,.1)'">
              </div>
              <div>
                <label style="display:block;font-size:.62rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.65);margin-bottom:.3rem;">Brief Note</label>
                <textarea name="message" rows="3" placeholder="Investor profile, ticket size, timeline…"
                          style="width:100%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);padding:.72rem .9rem;font-size:.85rem;color:#fff;font-family:'DM Sans',sans-serif;outline:none;resize:vertical;min-height:80px;transition:border-color .2s;"
                          onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='rgba(255,255,255,.1)'"></textarea>
              </div>
              <label style="display:flex;align-items:flex-start;gap:.5rem;cursor:pointer;">
                <input type="checkbox" name="nda" required style="accent-color:var(--gold);margin-top:.15rem;flex-shrink:0;">
                <span style="font-size:.72rem;color:rgba(255,255,255,.65);line-height:1.6;">I agree to execute a mutual NDA before accessing the Information Memorandum *</span>
              </label>
              <button type="submit" class="btn btn-g" style="width:100%;justify-content:center;padding:.875rem;">
                <i class="fas fa-paper-plane" style="margin-right:.5rem;font-size:.7rem;"></i>Request IM & NDA
              </button>
            </form>
<script>
/* G5: IM request form — phone validation + honeypot */
(function(){
  var f = document.querySelector('.ig-form');
  if(!f) return;
  function phoneOk(v){ var c=v.replace(/[\\s\\-().]/g,''); return /^(\\+91|0)?[6-9]\\d{9}$/.test(c)||/^\\+\\d{7,15}$/.test(c); }
  function showE(inp,msg){ var id='fe-'+inp.name; var e=document.getElementById(id); if(e)e.remove(); var p=document.createElement('p'); p.id=id; p.style.cssText='font-size:.68rem;color:#fca5a5;margin-top:.25rem;'; p.textContent=msg; inp.parentNode.appendChild(p); inp.style.borderColor='#ef4444'; }
  function clearE(inp){ var e=document.getElementById('fe-'+inp.name); if(e)e.remove(); inp.style.borderColor='rgba(255,255,255,.1)'; }
  /* Honeypot */
  var hp=document.createElement('input'); hp.type='text'; hp.name='ig_hp2'; hp.tabIndex=-1; hp.autocomplete='off'; hp.style.cssText='position:absolute;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;'; f.appendChild(hp);
  f.addEventListener('submit',function(e){
    if(hp.value){e.preventDefault();return;}
    var ok=true;
    var nameInp=f.querySelector('[name=name]'); if(nameInp){clearE(nameInp);if(nameInp.value.trim().length<2){showE(nameInp,'Enter at least 2 characters.');ok=false;}}
    var emailInp=f.querySelector('[name=email]'); if(emailInp){clearE(emailInp);if(!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(emailInp.value.trim())){showE(emailInp,'Enter a valid email address.');ok=false;}}
    var phInp=f.querySelector('[name=phone]'); if(phInp&&phInp.value.trim()){clearE(phInp);if(!phoneOk(phInp.value.trim())){showE(phInp,'Enter a valid Indian mobile (+91 XXXXX XXXXX) or international number.');ok=false;}}
    if(!ok){e.preventDefault();return;}
    var btn=f.querySelector('button[type=submit]'); if(btn){btn.disabled=true;btn.innerHTML='<i class="fas fa-circle-notch fa-spin" style="margin-right:.5rem;"></i>Sending…';}
  });
  var phInp2=f.querySelector('[name=phone]'); if(phInp2){phInp2.addEventListener('blur',function(){if(phInp2.value.trim()&&!phoneOk(phInp2.value.trim())){showE(phInp2,'Enter a valid Indian mobile (+91 XXXXX XXXXX) or international number.');}else{clearE(phInp2);}});}
})();
</script>
          </div>
        </div>

        <!-- Advisory Contact -->
        <div style="background:#fff;border:1px solid var(--border);padding:1.25rem;">
          <p style="font-size:.62rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.875rem;">Advisory Contact</p>
          <div style="display:flex;align-items:center;gap:.875rem;margin-bottom:.875rem;">
            <div style="width:40px;height:40px;background:var(--ink);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <span style="font-family:'DM Serif Display',Georgia,serif;font-size:.85rem;color:var(--gold);font-weight:700;">${l.contactName?.split(' ').map((w: string)=>w[0]).join('')||'IG'}</span>
            </div>
            <div>
              <div style="font-size:.875rem;font-weight:600;color:var(--ink);">${l.contactName || 'India Gully Advisory'}</div>
              <div style="font-size:.72rem;color:var(--ink-muted);">Transaction Advisory</div>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:.5rem;">
            <a href="tel:+918988988988" style="font-size:.78rem;color:var(--ink-soft);display:flex;align-items:center;gap:.5rem;transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-soft)'">
              <i class="fas fa-phone" style="color:var(--gold);width:14px;font-size:.65rem;"></i>+91 8988 988 988
            </a>
            <a href="mailto:${l.contact || 'info@indiagully.com'}" style="font-size:.78rem;color:var(--ink-soft);display:flex;align-items:center;gap:.5rem;transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-soft)'">
              <i class="fas fa-envelope" style="color:var(--gold);width:14px;font-size:.65rem;"></i>${l.contact || 'info@indiagully.com'}
            </a>
          </div>
        </div>

        <!-- Mandate quick facts -->
        <div style="background:var(--parch);border:1px solid var(--border);padding:1.25rem;">
          <p style="font-size:.62rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.875rem;">Mandate Details</p>
          <div style="display:flex;flex-direction:column;gap:.6rem;">
            <div style="display:flex;justify-content:space-between;font-size:.78rem;border-bottom:1px solid var(--border);padding-bottom:.5rem;">
              <span style="color:var(--ink-muted);">Mandate Type</span>
              <span style="color:var(--ink);font-weight:600;">${l.mandateType}</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:.78rem;border-bottom:1px solid var(--border);padding-bottom:.5rem;">
              <span style="color:var(--ink-muted);">NDA Required</span>
              <span style="color:${l.nda?'#B8960C':'#15803d'};font-weight:600;">${l.nda ? 'Yes' : 'No'}</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:.78rem;">
              <span style="color:var(--ink-muted);">Advisor</span>
              <span style="color:var(--ink);font-weight:600;">India Gully</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</div>

<!-- ══ MORE MANDATES ══════════════════════════════════════════════════════ -->
<div class="sec-wh" style="padding-top:3rem;padding-bottom:3.5rem;">
  <div class="wrap">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2rem;">
      <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:var(--ink);">More Active Mandates</h2>
      <a href="/listings" class="btn btn-dko" style="font-size:.72rem;">View All Mandates</a>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;">
      ${others.map((x: any) => {
        const ximg = x.images?.[0] || 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80'
        return `
      <a href="/listings/${x.id}" style="display:block;background:#fff;border:1px solid var(--border);overflow:hidden;transition:all .25s;text-decoration:none;"
         onmouseover="this.style.borderColor='var(--gold)';this.style.boxShadow='0 8px 28px rgba(0,0,0,.08)'" onmouseout="this.style.borderColor='var(--border)';this.style.boxShadow='none'">
        <div style="height:160px;overflow:hidden;position:relative;">
          <img src="${ximg}" alt="${x.title}" style="width:100%;height:100%;object-fit:cover;" loading="lazy">
          <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.5),transparent);"></div>
          <div style="position:absolute;bottom:.75rem;left:.875rem;">
            <span style="background:${x.sectorColor};color:#fff;font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:.2rem .55rem;">${x.sector}</span>
          </div>
        </div>
        <div style="padding:1.1rem;">
          <h4 style="font-family:'DM Serif Display',Georgia,serif;font-size:.975rem;color:var(--ink);margin-bottom:.25rem;line-height:1.3;">${x.title}</h4>
          <p style="font-size:.72rem;color:var(--ink-muted);margin-bottom:.625rem;">${x.locationShort}</p>
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <span style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--gold);">${x.value}</span>
            <span style="font-size:.65rem;color:var(--gold);font-weight:600;text-transform:uppercase;letter-spacing:.08em;">View →</span>
          </div>
        </div>
      </a>`
      }).join('')}
    </div>
  </div>
</div>

<!-- Carousel JS -->
<script>
(function() {
  function initCarousel() {
    var detailCur = 0;
    var detailTrack = document.querySelector('.detail-track');
    var detailTotal = ${(l.images || []).length};
    var dDots = document.querySelectorAll('.d-dot');
    var dImgs = document.querySelectorAll('.detail-img');
    var dCount = document.getElementById('photoCount');

    if (!detailTrack || detailTotal < 2) return;

    // Auto-activate first image Ken Burns
    if(dImgs[0]) dImgs[0].style.transform = 'scale(1)';

    window.detailGo = function(n) {
      if(dImgs[detailCur]) dImgs[detailCur].style.transform = 'scale(1.04)';
      if(dDots[detailCur]) { dDots[detailCur].style.width = '10px'; dDots[detailCur].style.background = 'rgba(255,255,255,.35)'; }

      detailCur = ((n % detailTotal) + detailTotal) % detailTotal;
      detailTrack.style.transform = 'translateX(-'+(detailCur*100)+'%)';

      // Ken Burns on active slide
      if(dImgs[detailCur]) dImgs[detailCur].style.transform = 'scale(1)';
      if(dDots[detailCur]) { dDots[detailCur].style.width = '36px'; dDots[detailCur].style.background = 'var(--gold)'; }
      if(dCount) dCount.textContent = (detailCur+1) + ' / ' + detailTotal;
    };

    // Arrow buttons
    var prevBtn = document.getElementById('dPrev');
    var nextBtn = document.getElementById('dNext');
    if(prevBtn) prevBtn.onclick = function(){ window.detailGo(detailCur-1); };
    if(nextBtn) nextBtn.onclick = function(){ window.detailGo(detailCur+1); };

    // Auto-advance every 5s
    var dTimer = setInterval(function(){ window.detailGo(detailCur+1); }, 5000);
    detailTrack.addEventListener('mouseenter', function(){ clearInterval(dTimer); });
    detailTrack.addEventListener('mouseleave', function(){ dTimer = setInterval(function(){ window.detailGo(detailCur+1); }, 5000); });

    // Touch swipe
    var dtx = 0;
    detailTrack.addEventListener('touchstart', function(e){ dtx = e.touches[0].clientX; }, {passive:true});
    detailTrack.addEventListener('touchend', function(e){ var dx = e.changedTouches[0].clientX - dtx; if(Math.abs(dx) > 40) window.detailGo(detailCur + (dx < 0 ? 1 : -1)); }, {passive:true});
  }

  if(document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousel);
  } else {
    initCarousel();
  }
})();
</script>
`

  return c.html(layout(listing.title, content, {
    description: `${listing.title} — ${listing.location} — ${listing.value} — India Gully exclusive transaction advisory mandate.`,
    ogImage: listing.images?.[0],
  }))
})

export default app
