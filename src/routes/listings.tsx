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

  const content = `

<!-- ══ HERO ══════════════════════════════════════════════════════════════ -->
<div class="hero-dk">
  <div class="hero-dk-grid"></div>
  <div class="hero-dk-radial"></div>
  <!-- Bottom gradient fade -->
  <div style="position:absolute;bottom:0;left:0;right:0;height:120px;background:linear-gradient(to bottom,transparent,var(--ink));pointer-events:none;"></div>

  <div class="wrap" style="position:relative;">
    <div style="max-width:820px;" class="fu">
      <!-- Eyebrow with number -->
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;">
        <div style="width:40px;height:1px;background:linear-gradient(90deg,var(--gold),transparent);"></div>
        <span style="font-size:.6rem;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);">Investment Opportunities</span>
      </div>
      <h1 class="h1" style="margin-bottom:1.75rem;">Active<br><em style="font-style:italic;color:var(--gold);">Mandates</em></h1>
      <p class="lead-lt" style="max-width:620px;margin-bottom:3rem;">Institutional-grade investment mandates across India's premier asset classes. All opportunities are exclusive to India Gully's advisory pipeline and strictly subject to NDA. Information Memoranda available to qualified investors, family offices and institutional buyers upon request.</p>
      <!-- Filter buttons -->
      <div style="display:flex;flex-wrap:wrap;gap:.625rem;">
        ${['All Mandates','Hospitality','Real Estate','Heritage Hospitality','Mixed-Use'].map((f,i) => `
        <button onclick="filterMandates('${f}')" data-filter="${f}" class="filter-btn${i===0?' active':''}"
                style="padding:.5rem 1.2rem;font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;border:1px solid ${i===0?'var(--gold)':'rgba(255,255,255,.15)'};background:${i===0?'var(--gold)':'rgba(255,255,255,.03)'};color:${i===0?'#fff':'rgba(255,255,255,.45)'};cursor:pointer;transition:all .22s;backdrop-filter:blur(4px);"
                onmouseover="if(this.dataset.filter!=='All Mandates'&&!this.classList.contains('active')){this.style.borderColor='rgba(184,150,12,.5)';this.style.color='rgba(255,255,255,.8)'}"
                onmouseout="if(!this.classList.contains('active')){this.style.borderColor='rgba(255,255,255,.15)';this.style.color='rgba(255,255,255,.45)'}">${f}</button>
        `).join('')}
      </div>
    </div>
  </div>
</div>

<!-- ══ PIPELINE STATS ═══════════════════════════════════════════════════ -->
<div style="background:var(--ink-mid);border-bottom:1px solid rgba(255,255,255,.05);">
  <div class="wrap" style="padding-top:0;padding-bottom:0;">
    <div id="pipelineStats">
      ${[
        { n:'₹1,165 Cr+', l:'Total Pipeline Value',         icon:'chart-bar' },
        { n:'8',           l:'Active Mandates',              icon:'folder-open' },
        { n:'5',           l:'Asset Classes',                icon:'layer-group' },
        { n:'NDA Required', l:'All Mandates · Exclusive',   icon:'lock' },
      ].map((s, si) => `
      <div style="padding:2.5rem 2rem;border-right:1px solid rgba(255,255,255,.05);text-align:center;position:relative;overflow:hidden;transition:all .22s;cursor:default;group" onmouseover="this.style.background='rgba(184,150,12,.05)';this.querySelector('.ps-top').style.opacity='1'" onmouseout="this.style.background='transparent';this.querySelector('.ps-top').style.opacity='0'">
        <div class="ps-top" style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent);opacity:0;transition:opacity .3s;"></div>
        <i class="fas fa-${s.icon}" style="font-size:.75rem;color:rgba(184,150,12,.45);margin-bottom:.75rem;display:block;"></i>
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2.6rem;color:var(--gold);line-height:1;margin-bottom:.55rem;letter-spacing:-.03em;">${s.n}</div>
        <div style="font-size:.58rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.45);">${s.l}</div>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- ══ MANDATE CARDS ═════════════════════════════════════════════════════ -->
<div class="sec-pd" style="padding-top:4.5rem;">
  <div class="wrap">

    <!-- Grid of cards -->
    <div id="mandatesGrid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;">
      ${LISTINGS.map((l: any, idx: number) => {
        const ss = statusStyle(l.statusType)
        const hasImages = l.images && l.images.length > 0
        return `
      <!-- MANDATE CARD: ${l.id} -->
      <a href="/listings/${l.id}" data-sector="${l.sector}" class="mandate-card ed-card"
         style="display:block;text-decoration:none;animation:fadeUp .6s cubic-bezier(.4,0,.2,1) ${idx * 0.07}s both;box-shadow:0 1px 3px rgba(0,0,0,.04);">

        <!-- IMAGE / NDA PLACEHOLDER -->
        <div class="ed-card-img" style="position:relative;height:240px;background:#0e0e18;">
          ${hasImages
            ? `<img src="${l.images[0]}" alt="${l.title}" style="width:100%;height:100%;object-fit:cover;" loading="lazy">`
            : `<div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(135deg,#0d0d1a 0%,#16162a 100%);">
                <div style="width:60px;height:60px;background:rgba(184,150,12,.12);border:1px solid rgba(184,150,12,.28);display:flex;align-items:center;justify-content:center;margin-bottom:1rem;">
                  <i class="fas fa-lock" style="color:var(--gold);font-size:1.2rem;"></i>
                </div>
                <div style="font-size:.62rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.4);">Images Under NDA</div>
                <div style="font-size:.58rem;color:rgba(255,255,255,.22);margin-top:.35rem;">Available post-NDA execution</div>
              </div>`
          }
          <!-- Gradient overlay for images -->
          ${hasImages ? `<div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(3,3,10,.75) 0%,rgba(3,3,10,.2) 50%,transparent 100%);"></div>` : ''}
          <!-- Sector pill -->
          <div style="position:absolute;top:1.1rem;left:1.1rem;">
            <span style="background:${l.sectorColor};color:#fff;font-size:.57rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;padding:.26rem .7rem;">${l.sector}</span>
          </div>
          <!-- NDA badge (always shown for NDA mandates) -->
          ${l.nda ? `<div style="position:absolute;top:1.1rem;right:1.1rem;background:rgba(0,0,0,.55);backdrop-filter:blur(6px);padding:.2rem .6rem;display:flex;align-items:center;gap:.35rem;border:1px solid rgba(184,150,12,.35);">
            <i class="fas fa-lock" style="font-size:.48rem;color:var(--gold);"></i>
            <span style="font-size:.56rem;color:rgba(255,255,255,.8);letter-spacing:.08em;font-weight:700;text-transform:uppercase;">NDA</span>
          </div>` : ''}
          <!-- Value overlay (images only) -->
          ${hasImages ? `
          <div style="position:absolute;bottom:1.1rem;left:1.1rem;right:1.1rem;display:flex;align-items:flex-end;justify-content:space-between;">
            <div>
              <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.9rem;color:#fff;line-height:1;text-shadow:0 2px 12px rgba(0,0,0,.7);">${l.value}</div>
              ${l.valueUSD ? `<div style="font-size:.58rem;color:rgba(255,255,255,.5);margin-top:.1rem;">${l.valueUSD}</div>` : ''}
            </div>
            ${hasImages ? `<div style="background:rgba(0,0,0,.4);backdrop-filter:blur(6px);padding:.2rem .55rem;display:flex;align-items:center;gap:.3rem;border:1px solid rgba(255,255,255,.15);">
              <i class="fas fa-images" style="font-size:.48rem;color:rgba(255,255,255,.5);"></i>
              <span style="font-size:.56rem;color:rgba(255,255,255,.6);letter-spacing:.06em;">${l.images.length} photos · NDA required for detail</span>
            </div>` : ''}
          </div>` : ''}
        </div>

        <!-- CONTENT -->
        <div style="padding:1.875rem;background:#fff;position:relative;">
          <!-- Gold top accent strip -->
          <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,${l.sectorColor},transparent);opacity:.5;"></div>
          <!-- Status + location row -->
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:1rem;flex-wrap:wrap;gap:.4rem;">
            <span style="background:${ss.bg};color:${ss.text};border:1px solid ${ss.border};font-size:.57rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:.22rem .65rem;">${l.status}</span>
            <span style="font-size:.67rem;color:var(--ink-muted);display:flex;align-items:center;gap:.3rem;"><i class="fas fa-map-marker-alt" style="color:var(--gold);font-size:.53rem;"></i>${l.locationShort}</span>
          </div>
          <!-- Title block -->
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.2rem;color:var(--ink);line-height:1.2;margin-bottom:.3rem;">${l.title}</h3>
          <p style="font-size:.72rem;color:var(--gold);font-weight:600;letter-spacing:.04em;margin-bottom:.875rem;">${l.subtitle}</p>
          <!-- Description (truncated) -->
          <p style="font-size:.825rem;color:var(--ink-muted);line-height:1.75;margin-bottom:1.25rem;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;">${l.desc}</p>
          <!-- Key metrics -->
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-bottom:1.25rem;">
            ${l.highlights.slice(0,2).map((h: any) => `
            <div class="mandate-highlight">
              <div style="font-size:.55rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.3rem;">${h.label}</div>
              <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--gold);line-height:1;">${h.value}</div>
            </div>`).join('')}
          </div>
          <!-- Tags -->
          <div style="display:flex;flex-wrap:wrap;gap:.35rem;margin-bottom:1.25rem;">
            ${l.tags.slice(0,3).map((t: string) => `<span style="background:rgba(10,10,10,.04);color:var(--ink-soft);border:1px solid var(--border);font-size:.58rem;font-weight:600;letter-spacing:.07em;text-transform:uppercase;padding:.17rem .5rem;">${t}</span>`).join('')}
          </div>
          <!-- CTA row -->
          <div style="display:flex;align-items:center;justify-content:space-between;padding-top:1rem;border-top:1px solid var(--border-lt);">
            <span style="font-size:.67rem;color:var(--gold);font-weight:700;letter-spacing:.1em;text-transform:uppercase;display:flex;align-items:center;gap:.4rem;">
              <i class="fas fa-file-signature" style="font-size:.6rem;"></i>View Mandate
            </span>
            <div style="display:flex;align-items:center;gap:.35rem;font-size:.6rem;color:var(--ink-faint);">
              ${l.nda ? `<i class="fas fa-lock" style="font-size:.52rem;color:var(--gold);"></i><span style="color:var(--gold);font-weight:600;">NDA Required</span>` : `<i class="fas fa-unlock" style="font-size:.52rem;"></i><span>Open Mandate</span>`}
            </div>
          </div>
        </div>
      </a>`
      }).join('')}
    </div>

    <!-- Footer note -->
    <div style="text-align:center;margin-top:4rem;padding:2rem;border:1px solid var(--border);background:rgba(184,150,12,.02);">
      <div style="width:40px;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent);margin:0 auto .875rem;"></div>
      <p style="font-size:.78rem;color:var(--ink-muted);margin-bottom:1.25rem;max-width:640px;margin-left:auto;margin-right:auto;line-height:1.8;"><i class="fas fa-shield-alt" style="color:var(--gold);margin-right:.4rem;"></i>All mandates are strictly by NDA · Information Memoranda available to qualified investors · Click any mandate to accept NDA terms and submit your Expression of Interest (EOI)</p>
      <a href="/contact" class="btn btn-g">Submit a Mandate Enquiry</a>
    </div>
  </div>
</div>

<style>
@media(max-width:900px){#mandatesGrid{grid-template-columns:repeat(2,1fr)!important;}}
@media(max-width:560px){#mandatesGrid{grid-template-columns:1fr!important;}#pipelineStats{grid-template-columns:repeat(2,1fr)!important;}}
/* Filter active state */
.filter-btn.active{border-color:var(--gold)!important;background:var(--gold)!important;color:#fff!important;}
</style>

<script>
function filterMandates(sector) {
  var cards = document.querySelectorAll('.mandate-card');
  var btns  = document.querySelectorAll('.filter-btn');
  btns.forEach(function(b) {
    var isActive = b.dataset.filter === sector;
    b.classList.toggle('active', isActive);
    b.style.borderColor  = isActive ? 'var(--gold)' : 'rgba(255,255,255,.15)';
    b.style.background   = isActive ? 'var(--gold)' : 'rgba(255,255,255,.03)';
    b.style.color        = isActive ? '#fff' : 'rgba(255,255,255,.45)';
  });
  cards.forEach(function(card) {
    var match = sector === 'All Mandates' || card.dataset.sector === sector;
    card.style.display = match ? 'block' : 'none';
  });
}
</script>

`
  return c.html(layout('Active Mandates', content, {
    description: 'India Gully active mandates, institutional-grade investment opportunities across Real Estate, Hospitality, Entertainment and Retail. All opportunities subject to NDA.'
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

  const hasImages = l.images && l.images.length > 0

  // ── NDA GATE MODAL ─────────────────────────────────────────────────────────
  // Full legal NDA with identity collection. Shown on every visit unless already
  // accepted in this session (keyed by mandate ID in sessionStorage).
  // After acceptance, user sees full mandate details and can submit EOI.
  const ndaModal = l.nda ? `
<!-- ══════════════════════════════════════════════════════════════════════
     NDA GATE — MANDATORY BEFORE VIEWING ANY MANDATE DETAIL
     Collects: Full Name · Email · Organisation
     Terms: Full NDA obligations listed clearly
     Storage: sessionStorage['ig_nda_${l.id}'] = JSON (name, email, org, ts)
═══════════════════════════════════════════════════════════════════════ -->
<div id="nda-gate" style="position:fixed;inset:0;z-index:9000;display:flex;align-items:center;justify-content:center;padding:1rem;background:rgba(6,6,6,.92);backdrop-filter:blur(14px);overflow-y:auto;">
  <div style="width:100%;max-width:560px;background:#fff;overflow:hidden;box-shadow:0 40px 100px rgba(0,0,0,.7);my:auto;">

    <!-- Modal header (dark) -->
    <div style="background:var(--ink);padding:1.75rem 2rem;display:flex;align-items:center;gap:1rem;">
      <div style="width:48px;height:48px;background:var(--gold);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
        <i class="fas fa-file-contract" style="color:#fff;font-size:1.1rem;"></i>
      </div>
      <div>
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.3rem;color:#fff;line-height:1.2;margin-bottom:.15rem;">Non-Disclosure Agreement</h2>
        <p style="font-size:.72rem;color:rgba(255,255,255,.45);letter-spacing:.04em;">Please read and accept before viewing this confidential mandate</p>
      </div>
    </div>

    <!-- Mandate identity banner -->
    <div style="background:#fffbeb;border-bottom:1px solid #fde68a;padding:.875rem 1.5rem;display:flex;align-items:center;gap:.625rem;">
      <i class="fas fa-exclamation-triangle" style="color:#d97706;font-size:.85rem;flex-shrink:0;"></i>
      <p style="font-size:.8rem;color:#78350f;line-height:1.6;margin:0;">
        <strong>${l.title}</strong> — ${l.location}<br>
        <span style="font-size:.72rem;color:#92400e;">Confidential Information · Exclusive India Gully Advisory Mandate · ${l.value} · ${l.status}</span>
      </p>
    </div>

    <div style="padding:1.5rem 1.75rem;">

      <!-- Identity collection form -->
      <div style="margin-bottom:1.25rem;">
        <p style="font-size:.65rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.875rem;">Your Details (required to proceed)</p>
        <div style="display:flex;flex-direction:column;gap:.625rem;">
          <div>
            <label style="display:block;font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.25rem;">Full Name *</label>
            <input id="nda-name" type="text" placeholder="e.g. Rajesh Kumar" required autocomplete="name"
                   style="width:100%;box-sizing:border-box;border:1px solid var(--border);padding:.65rem .875rem;font-size:.875rem;color:var(--ink);font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s;background:#fafaf7;"
                   onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='var(--border)'">
          </div>
          <div>
            <label style="display:block;font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.25rem;">Email Address *</label>
            <input id="nda-email" type="email" placeholder="your@email.com" required autocomplete="email"
                   style="width:100%;box-sizing:border-box;border:1px solid var(--border);padding:.65rem .875rem;font-size:.875rem;color:var(--ink);font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s;background:#fafaf7;"
                   onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='var(--border)'">
          </div>
          <div>
            <label style="display:block;font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.25rem;">Phone / WhatsApp *</label>
            <input id="nda-phone" type="tel" placeholder="+91 98XXX XXXXX" required autocomplete="tel"
                   style="width:100%;box-sizing:border-box;border:1px solid var(--border);padding:.65rem .875rem;font-size:.875rem;color:var(--ink);font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s;background:#fafaf7;"
                   onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='var(--border)'">
          </div>
          <div>
            <label style="display:block;font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.25rem;">Organisation / Fund *</label>
            <input id="nda-org" type="text" placeholder="e.g. XYZ Family Office / ABC Fund" required autocomplete="organization"
                   style="width:100%;box-sizing:border-box;border:1px solid var(--border);padding:.65rem .875rem;font-size:.875rem;color:var(--ink);font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s;background:#fafaf7;"
                   onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='var(--border)'">
          </div>
        </div>
      </div>

      <!-- NDA Terms Box -->
      <div style="border:1px solid var(--border);background:var(--parch);margin-bottom:1.25rem;">
        <div style="padding:.75rem 1rem;border-bottom:1px solid var(--border);background:#fff;display:flex;align-items:center;gap:.5rem;">
          <i class="fas fa-balance-scale" style="color:var(--gold);font-size:.85rem;"></i>
          <p style="font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--ink);margin:0;">Non-Disclosure Agreement — Key Obligations</p>
        </div>
        <div style="padding:1rem;max-height:180px;overflow-y:auto;font-size:.75rem;color:var(--ink-soft);line-height:1.85;">
          <p style="margin-bottom:.625rem;font-size:.72rem;color:var(--ink-muted);">This Agreement is entered into between you ("Recipient") and <strong>India Gully (Vivacious Entertainment and Hospitality Pvt. Ltd.)</strong> ("Discloser") with respect to the confidential mandate identified above. By clicking "I Accept & Proceed", you agree to the following terms:</p>
          <ol style="padding-left:1.25rem;margin:0;display:flex;flex-direction:column;gap:.5rem;">
            <li><strong>Confidentiality Obligation:</strong> All information disclosed about this mandate — including financial projections, legal structure, counterparty identity, advisory analysis, deal terms, and supporting documentation — is strictly confidential and proprietary to the Discloser.</li>
            <li><strong>Limited Use:</strong> You agree to use this information solely for the purpose of evaluating a potential investment or transaction in connection with this specific mandate. No other use is permitted.</li>
            <li><strong>Non-Disclosure:</strong> You shall not disclose, reproduce, publish, distribute, or communicate any part of this information to any third party without the prior written consent of India Gully.</li>
            <li><strong>Exclusivity:</strong> India Gully holds exclusive advisory rights over this mandate. Any direct approach to the underlying asset owner, seller, or counterparty — bypassing India Gully — constitutes a material breach of this agreement and shall be subject to a claim for advisory fees and damages.</li>
            <li><strong>Duration:</strong> These obligations shall survive for a period of <strong>3 (three) years</strong> from the date of acceptance, regardless of whether a transaction is completed.</li>
            <li><strong>Jurisdiction:</strong> This agreement shall be governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in New Delhi, India.</li>
            <li><strong>Legal Consequences:</strong> Breach of this NDA may result in injunctive relief, recovery of damages, and/or legal proceedings under the Indian Contract Act 1872, the Information Technology Act 2000, and applicable intellectual property laws.</li>
            <li><strong>Electronic Acceptance:</strong> By clicking "I Accept & Proceed", you acknowledge that this constitutes a legally binding electronic acceptance equivalent to a signed agreement.</li>
          </ol>
        </div>
      </div>

      <!-- Consent checkbox -->
      <label style="display:flex;align-items:flex-start;gap:.625rem;cursor:pointer;margin-bottom:1.25rem;padding:.875rem;background:#fffbeb;border:1px solid #fde68a;">
        <input type="checkbox" id="nda-check" style="accent-color:var(--gold);margin-top:.15rem;flex-shrink:0;width:16px;height:16px;">
        <span style="font-size:.78rem;color:var(--ink);line-height:1.65;font-weight:500;">
          I have read, understood, and agree to be bound by the Non-Disclosure Agreement terms above. I confirm that I am a qualified investor, family office, institutional buyer, or professional advisor evaluating this opportunity in good faith, and that the information I have provided is accurate.
        </span>
      </label>

      <!-- Error message -->
      <div id="nda-error" style="display:none;background:#fef2f2;border:1px solid #fecaca;padding:.625rem .875rem;margin-bottom:1rem;font-size:.75rem;color:#dc2626;">
        <i class="fas fa-exclamation-circle" style="margin-right:.4rem;"></i>
        <span id="nda-error-msg">Please fill all required fields and accept the NDA.</span>
      </div>

      <!-- Action buttons -->
      <div style="display:flex;gap:.875rem;">
        <a href="/listings" style="flex:1;padding:.875rem;border:1px solid var(--border);text-align:center;font-size:.75rem;font-weight:600;color:var(--ink-soft);text-decoration:none;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:.4rem;" onmouseover="this.style.borderColor='var(--ink)'" onmouseout="this.style.borderColor='var(--border)'">
          <i class="fas fa-arrow-left" style="font-size:.62rem;"></i>Back to Mandates
        </a>
        <button id="nda-accept" onclick="igAcceptNDA('${l.id}')"
                style="flex:2;padding:.875rem;background:var(--ink);color:#fff;border:none;cursor:pointer;font-size:.78rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:.5rem;"
                onmouseover="this.style.background='var(--gold)'" onmouseout="this.style.background='var(--ink)'">
          <i class="fas fa-file-signature" style="font-size:.72rem;"></i>I Accept &amp; Proceed to Mandate
        </button>
      </div>

      <p style="font-size:.65rem;color:var(--ink-faint);margin-top:.875rem;text-align:center;line-height:1.6;">Your acceptance is recorded with timestamp and will be shared with India Gully's advisory team. India Gully · CIN: U74999DL2017PTC323237</p>
    </div>
  </div>
</div>

<style>
#nda-gate { transition: opacity .35s; }
#nda-name:focus,#nda-email:focus,#nda-org:focus { border-color: var(--gold)!important; box-shadow:0 0 0 3px rgba(184,150,12,.1); }
</style>

<script>
(function(){
  var KEY = 'ig_nda_${l.id}';
  var gate = document.getElementById('nda-gate');
  // Already accepted in this session?
  try {
    var stored = sessionStorage.getItem(KEY);
    if (stored) {
      var d = JSON.parse(stored);
      if (d && d.accepted) {
        if (gate) gate.style.display = 'none';
        // Pre-fill EOI form with stored name/email/phone/org
        setTimeout(function(){
          var en = document.getElementById('eoi-name');  if(en && d.name)  en.value = d.name;
          var ee = document.getElementById('eoi-email'); if(ee && d.email) ee.value = d.email;
          var ep = document.getElementById('eoi-phone'); if(ep && d.phone) ep.value = d.phone;
          var eo = document.getElementById('eoi-org');   if(eo && d.org)   eo.value = d.org;
        }, 100);
      }
    }
  } catch(e) {}
  // Enable/disable accept button based on checkbox (checkbox state)
  var check = document.getElementById('nda-check');
  if (check) {
    check.addEventListener('change', function() {
      // no-op: validation happens on click
    });
  }
})();

function igAcceptNDA(mandateId) {
  var nameVal  = (document.getElementById('nda-name')  || {value:''}).value.trim();
  var emailVal = (document.getElementById('nda-email') || {value:''}).value.trim();
  var phoneVal = (document.getElementById('nda-phone') || {value:''}).value.trim();
  var orgVal   = (document.getElementById('nda-org')   || {value:''}).value.trim();
  var checked  = document.getElementById('nda-check') && document.getElementById('nda-check').checked;

  var errEl  = document.getElementById('nda-error');
  var errMsg = document.getElementById('nda-error-msg');

  function showErr(msg) {
    if (errMsg) errMsg.textContent = msg;
    if (errEl)  errEl.style.display = 'block';
    errEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  if (!nameVal || nameVal.length < 2) { showErr('Please enter your full name (at least 2 characters).'); return; }
  if (!emailVal || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(emailVal)) { showErr('Please enter a valid email address.'); return; }
  if (!phoneVal || phoneVal.length < 7) { showErr('Please enter a valid phone / WhatsApp number.'); return; }
  if (!orgVal || orgVal.length < 2) { showErr('Please enter your organisation or fund name.'); return; }
  if (!checked) { showErr('You must read and accept the NDA terms before proceeding.'); return; }

  if (errEl) errEl.style.display = 'none';

  // Store acceptance with details
  try {
    sessionStorage.setItem('ig_nda_' + mandateId, JSON.stringify({
      accepted: true, name: nameVal, email: emailVal, phone: phoneVal, org: orgVal, ts: new Date().toISOString()
    }));
  } catch(e) {}

  // Pre-fill EOI form
  setTimeout(function(){
    var en = document.getElementById('eoi-name');  if(en) en.value = nameVal;
    var ee = document.getElementById('eoi-email'); if(ee) ee.value = emailVal;
    var ep = document.getElementById('eoi-phone'); if(ep) ep.value = phoneVal;
    var eo = document.getElementById('eoi-org');   if(eo) eo.value = orgVal;
  }, 350);

  // Dismiss gate with animation
  var gate = document.getElementById('nda-gate');
  if (gate) {
    gate.style.opacity = '0';
    setTimeout(function(){ gate.style.display = 'none'; }, 350);
  }

  // Send NDA acceptance log to API (fire-and-forget)
  try {
    fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'nda_acceptance',
        mandate: mandateId,
        mandateTitle: '${l.title}',
        name: nameVal, email: emailVal, phone: phoneVal, org: orgVal,
        ts: new Date().toISOString()
      })
    }).catch(function(){});
  } catch(e) {}
}
</script>` : ''

  const content = `
${ndaModal}

<!-- ══ DETAIL HERO ══════════════════════════════════════════════════════ -->
<div style="background:var(--ink);position:relative;overflow:hidden;">
  <!-- Full-bleed image carousel or NDA placeholder -->
  <div class="detail-car" style="position:relative;height:65vh;min-height:480px;max-height:700px;overflow:hidden;background:#111;">
    ${hasImages ? `
    <div class="detail-track" style="display:flex;height:100%;transition:transform .85s cubic-bezier(.77,0,.175,1);">
      ${(l.images || []).map((img: string, i: number) => `
      <div style="flex:0 0 100%;position:relative;overflow:hidden;">
        <img src="${img}" alt="${l.title}, image ${i+1}"
             style="width:100%;height:100%;object-fit:cover;transform:scale(1.04);transition:transform 10s ease-out;cursor:zoom-in;"
             class="detail-img" loading="${i === 0 ? 'eager' : 'lazy'}"
             onclick="igLightboxOpen(${JSON.stringify(l.images)}, ${i})">
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
    <button id="dPrev" style="position:absolute;top:50%;left:1.5rem;transform:translateY(-50%);width:44px;height:44px;border:1px solid rgba(255,255,255,.25);background:rgba(0,0,0,.3);backdrop-filter:blur(8px);color:#fff;font-size:.85rem;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:10;transition:all .2s;" onmouseover="this.style.background='var(--gold)';this.style.borderColor='var(--gold)'" onmouseout="this.style.background='rgba(0,0,0,.3)';this.style.borderColor='rgba(255,255,255,.25)'"><i class="fas fa-chevron-left"></i></button>
    <button id="dNext" style="position:absolute;top:50%;right:1.5rem;transform:translateY(-50%);width:44px;height:44px;border:1px solid rgba(255,255,255,.25);background:rgba(0,0,0,.3);backdrop-filter:blur(8px);color:#fff;font-size:.85rem;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:10;transition:all .2s;" onmouseover="this.style.background='var(--gold)';this.style.borderColor='var(--gold)'" onmouseout="this.style.background='rgba(0,0,0,.3)';this.style.borderColor='rgba(255,255,255,.25)'"><i class="fas fa-chevron-right"></i></button>

    <!-- Photo count -->
    <div style="position:absolute;top:1.25rem;right:1.5rem;background:rgba(0,0,0,.45);backdrop-filter:blur(8px);padding:.3rem .75rem;z-index:10;display:flex;align-items:center;gap:.4rem;">
      <i class="fas fa-images" style="color:var(--gold);font-size:.65rem;"></i>
      <span id="photoCount" style="font-size:.68rem;color:#fff;letter-spacing:.08em;">1 / ${(l.images||[]).length}</span>
    </div>
    ` : `
    <!-- NDA image placeholder -->
    <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(135deg,#0d0d1a 0%,#1a1a2e 100%);">
      <div style="text-align:center;max-width:400px;padding:2rem;">
        <div style="width:72px;height:72px;background:rgba(184,150,12,.15);border:1px solid rgba(184,150,12,.3);display:flex;align-items:center;justify-content:center;margin:0 auto 1.5rem;">
          <i class="fas fa-lock" style="color:var(--gold);font-size:1.75rem;"></i>
        </div>
        <p style="font-size:.68rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:.5rem;">Confidential Mandate</p>
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:#fff;line-height:1.2;margin-bottom:.75rem;">${l.title}</h3>
        <p style="font-size:.8rem;color:rgba(255,255,255,.4);line-height:1.7;">Property images and detailed documentation are available exclusively to investors who have accepted the NDA and submitted their Expression of Interest.</p>
      </div>
    </div>
    `}

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

    <!-- Breadcrumb + Actions bar -->
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2rem;flex-wrap:wrap;gap:.75rem;">
      <nav aria-label="Breadcrumb" style="display:flex;align-items:center;gap:.4rem;font-size:.72rem;color:var(--ink-muted);">
        <a href="/" style="color:var(--ink-muted);transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-muted)'">Home</a>
        <i class="fas fa-chevron-right" style="font-size:.5rem;opacity:.4;"></i>
        <a href="/listings" style="color:var(--ink-muted);transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-muted)'">Mandates</a>
        <i class="fas fa-chevron-right" style="font-size:.5rem;opacity:.4;"></i>
        <span style="color:var(--ink-soft);">${l.title}</span>
      </nav>
      <div style="display:flex;gap:.625rem;align-items:center;">
        <button onclick="window.print()" class="no-print" style="display:inline-flex;align-items:center;gap:.4rem;padding:.38rem .875rem;font-size:.68rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;border:1px solid var(--border);background:#fff;color:var(--ink-muted);cursor:pointer;transition:all .2s;" onmouseover="this.style.borderColor='var(--gold)';this.style.color='var(--gold)'" onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--ink-muted)'">
          <i class="fas fa-print" style="font-size:.6rem;"></i>Print / Save PDF
        </button>
        <button onclick="navigator.share ? navigator.share({title:'${l.title}',url:window.location.href}) : navigator.clipboard.writeText(window.location.href).then(()=>igToast('Link copied!','success'))" class="no-print" style="display:inline-flex;align-items:center;gap:.4rem;padding:.38rem .875rem;font-size:.68rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;border:1px solid var(--border);background:#fff;color:var(--ink-muted);cursor:pointer;transition:all .2s;" onmouseover="this.style.borderColor='var(--gold)';this.style.color='var(--gold)'" onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--ink-muted)'">
          <i class="fas fa-share-alt" style="font-size:.6rem;"></i>Share
        </button>
      </div>
    </div>

    <div class="listing-detail-grid">

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
        <div class="highlights-grid">
          ${l.highlights.map((h: any) => `
          <div style="background:#fff;border:1px solid var(--border);padding:1.5rem 1.25rem;text-align:center;">
            <div style="width:36px;height:36px;background:var(--ink);display:flex;align-items:center;justify-content:center;margin:0 auto .875rem;">
              <i class="fas fa-${h.icon}" style="color:var(--gold);font-size:.72rem;"></i>
            </div>
            <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.35rem;color:var(--gold);line-height:1;margin-bottom:.3rem;">${h.value}</div>
            <div style="font-size:.65rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);">${h.label}</div>
          </div>`).join('')}
        </div>

        <!-- Full spec sheet -->
        <div style="margin-bottom:2.5rem;" id="specSheet">
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
        <div style="display:flex;flex-wrap:wrap;gap:.45rem;margin-bottom:2rem;">
          ${l.tags.map((t: string) => `
          <span style="background:rgba(184,150,12,.08);color:var(--gold);border:1px solid rgba(184,150,12,.2);font-size:.65rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:.22rem .65rem;">${t}</span>`).join('')}
        </div>

        <!-- ══ EOI SECTION (main body) ══════════════════════════════════ -->
        <div id="eoi-section" style="background:var(--ink);padding:2.5rem;margin-bottom:2rem;border:1px solid rgba(184,150,12,.2);">
          <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;">
            <div style="width:44px;height:44px;background:var(--gold);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <i class="fas fa-handshake" style="color:#fff;font-size:1rem;"></i>
            </div>
            <div>
              <p style="font-size:.62rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:.15rem;">NDA Accepted · Next Step</p>
              <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.4rem;color:#fff;line-height:1.2;">Submit Expression of Interest (EOI)</h3>
            </div>
          </div>
          <p style="font-size:.82rem;color:rgba(255,255,255,.5);line-height:1.75;margin-bottom:1.75rem;">Having accepted the NDA, please submit your Expression of Interest. Our advisory team will review your profile and revert within 24 business hours with the Information Memorandum and next steps for this mandate.</p>

          <!-- EOI SUCCESS PANEL (hidden until submission) -->
          <div id="eoi-success-panel" style="display:none;">
            <div style="position:relative;overflow:hidden;background:linear-gradient(135deg,#0a1628 0%,#0f2040 50%,#0a1628 100%);border:1px solid rgba(184,150,12,.25);padding:2.5rem 2rem;">
              <!-- Gold accent line top -->
              <div style="position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,transparent,var(--gold),var(--gold),transparent);"></div>
              <!-- Radial glow -->
              <div style="position:absolute;top:-60px;right:-60px;width:200px;height:200px;background:radial-gradient(circle,rgba(184,150,12,.08) 0%,transparent 70%);pointer-events:none;"></div>

              <div style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:1.5rem;">
                <!-- Success icon -->
                <div style="width:72px;height:72px;background:linear-gradient(135deg,rgba(184,150,12,.2),rgba(184,150,12,.08));border:2px solid rgba(184,150,12,.4);display:flex;align-items:center;justify-content:center;border-radius:50%;position:relative;">
                  <i class="fas fa-check" style="color:var(--gold);font-size:1.75rem;"></i>
                  <div style="position:absolute;inset:-4px;border-radius:50%;border:1px solid rgba(184,150,12,.15);animation:pulse-ring 2.5s ease-out infinite;"></div>
                </div>

                <!-- Headline -->
                <div>
                  <p style="font-size:.58rem;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:rgba(184,150,12,.65);margin-bottom:.5rem;">Expression of Interest Received</p>
                  <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.6rem;color:#fff;line-height:1.15;margin-bottom:.75rem;">Your EOI has been submitted<br>successfully.</h3>
                  <p style="font-size:.85rem;color:rgba(255,255,255,.55);line-height:1.75;max-width:460px;">India Gully's advisory team has received your Expression of Interest for <strong style="color:#fff;" id="eoi-success-mandate"></strong>. Your reference number is below.</p>
                </div>

                <!-- Reference card -->
                <div style="background:rgba(184,150,12,.08);border:1px solid rgba(184,150,12,.25);padding:1.1rem 2rem;width:100%;max-width:380px;">
                  <p style="font-size:.58rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(184,150,12,.5);margin-bottom:.4rem;">Reference Number</p>
                  <div id="eoi-success-ref" style="font-family:'DM Serif Display',Georgia,serif;font-size:1.3rem;color:var(--gold);letter-spacing:.04em;"></div>
                  <p id="eoi-success-ts" style="font-size:.62rem;color:rgba(255,255,255,.3);margin-top:.3rem;"></p>
                </div>

                <!-- Next steps -->
                <div style="width:100%;max-width:480px;">
                  <p style="font-size:.62rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.3);margin-bottom:1rem;">What happens next</p>
                  <div style="display:flex;flex-direction:column;gap:.75rem;text-align:left;">
                    ${[
                      { step:'01', icon:'envelope', title:'Acknowledgement Email', desc:'A confirmation has been sent to your registered email. Save your reference number.' },
                      { step:'02', icon:'user-tie', title:'Advisory Review', desc:'Our transaction advisory team reviews your profile and investor credentials within 24 business hours.' },
                      { step:'03', icon:'file-contract', title:'Information Memorandum', desc:'Qualified investors receive the full IM covering asset details, financials, legal structure, and transaction process.' },
                      { step:'04', icon:'handshake', title:'Management Presentation', desc:'Short-listed investors are invited to a management presentation and site visit.' },
                    ].map(s => `
                    <div style="display:flex;gap:.875rem;align-items:flex-start;padding:.75rem;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.05);">
                      <div style="width:32px;height:32px;background:rgba(184,150,12,.1);border:1px solid rgba(184,150,12,.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
                        <i class="fas fa-${s.icon}" style="color:var(--gold);font-size:.65rem;"></i>
                      </div>
                      <div>
                        <div style="font-size:.65rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.5);margin-bottom:.2rem;">Step ${s.step} · ${s.title}</div>
                        <p style="font-size:.78rem;color:rgba(255,255,255,.45);line-height:1.6;margin:0;">${s.desc}</p>
                      </div>
                    </div>`).join('')}
                  </div>
                </div>

                <!-- Contact details -->
                <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);padding:1.1rem 1.5rem;width:100%;max-width:480px;">
                  <p style="font-size:.6rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.3);margin-bottom:.625rem;">Direct Advisory Contact</p>
                  <div style="display:flex;flex-wrap:wrap;gap:1.25rem;align-items:center;">
                    <div style="display:flex;align-items:center;gap:.5rem;">
                      <i class="fas fa-user-tie" style="color:var(--gold);font-size:.7rem;width:14px;text-align:center;"></i>
                      <span style="font-size:.82rem;color:rgba(255,255,255,.65);" id="eoi-advisor-name">Arun Manikonda, MD</span>
                    </div>
                    <a href="tel:+918988988988" style="display:flex;align-items:center;gap:.5rem;color:rgba(255,255,255,.55);font-size:.78rem;text-decoration:none;transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='rgba(255,255,255,.55)'">
                      <i class="fas fa-phone" style="color:var(--gold);font-size:.65rem;width:14px;text-align:center;"></i>+91 8988 988 988
                    </a>
                    <a href="mailto:akm@indiagully.com" style="display:flex;align-items:center;gap:.5rem;color:rgba(255,255,255,.55);font-size:.78rem;text-decoration:none;transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='rgba(255,255,255,.55)'">
                      <i class="fas fa-envelope" style="color:var(--gold);font-size:.65rem;width:14px;text-align:center;"></i>akm@indiagully.com
                    </a>
                  </div>
                </div>

                <!-- Action buttons -->
                <div style="display:flex;gap:.875rem;flex-wrap:wrap;justify-content:center;">
                  <a href="/listings" style="display:inline-flex;align-items:center;gap:.5rem;padding:.75rem 1.75rem;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.05);color:rgba(255,255,255,.65);text-decoration:none;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;transition:all .22s;" onmouseover="this.style.background='rgba(255,255,255,.1)';this.style.borderColor='rgba(255,255,255,.3)'" onmouseout="this.style.background='rgba(255,255,255,.05)';this.style.borderColor='rgba(255,255,255,.15)'">
                    <i class="fas fa-arrow-left" style="font-size:.62rem;"></i>View More Mandates
                  </a>
                  <a href="/insights" style="display:inline-flex;align-items:center;gap:.5rem;padding:.75rem 1.75rem;background:var(--gold);color:#fff;text-decoration:none;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;transition:background .22s;" onmouseover="this.style.background='#a37a08'" onmouseout="this.style.background='var(--gold)'">
                    <i class="fas fa-newspaper" style="font-size:.62rem;"></i>Read Sector Insights
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- EOI FORM -->
          <div id="eoi-form-wrap">
          <div id="eoi-form" style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;">
            <div>
              <label style="display:block;font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-bottom:.3rem;">Full Name *</label>
              <input id="eoi-name" type="text" placeholder="Your full name" autocomplete="name"
                     style="width:100%;box-sizing:border-box;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);padding:.72rem .9rem;font-size:.85rem;color:#fff;font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s;"
                     onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='rgba(255,255,255,.1)'">
            </div>
            <div>
              <label style="display:block;font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-bottom:.3rem;">Email Address *</label>
              <input id="eoi-email" type="email" placeholder="your@email.com" autocomplete="email"
                     style="width:100%;box-sizing:border-box;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);padding:.72rem .9rem;font-size:.85rem;color:#fff;font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s;"
                     onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='rgba(255,255,255,.1)'">
            </div>
            <div>
              <label style="display:block;font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-bottom:.3rem;">Organisation / Fund *</label>
              <input id="eoi-org" type="text" placeholder="Fund / Family Office / Developer" autocomplete="organization"
                     style="width:100%;box-sizing:border-box;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);padding:.72rem .9rem;font-size:.85rem;color:#fff;font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s;"
                     onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='rgba(255,255,255,.1)'">
            </div>
            <div>
              <label style="display:block;font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-bottom:.3rem;">Phone / WhatsApp *</label>
              <input id="eoi-phone" type="tel" placeholder="+91 XXXXX XXXXX" autocomplete="tel"
                     style="width:100%;box-sizing:border-box;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);padding:.72rem .9rem;font-size:.85rem;color:#fff;font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s;"
                     onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='rgba(255,255,255,.1)'">
            </div>
            <div style="grid-column:1/-1;">
              <label style="display:block;font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-bottom:.3rem;">Ticket Size / Investment Capacity</label>
              <input id="eoi-ticket" type="text" placeholder="e.g. ₹50 Cr – ₹100 Cr"
                     style="width:100%;box-sizing:border-box;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);padding:.72rem .9rem;font-size:.85rem;color:#fff;font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s;"
                     onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='rgba(255,255,255,.1)'">
            </div>
            <div style="grid-column:1/-1;">
              <label style="display:block;font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-bottom:.3rem;">Investor Type *</label>
              <select id="eoi-investor-type"
                      style="width:100%;box-sizing:border-box;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);padding:.72rem .9rem;font-size:.85rem;color:#fff;font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s;appearance:none;"
                      onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='rgba(255,255,255,.1)'">
                <option value="" style="background:#111;color:#fff;">Select investor type</option>
                <option value="Family Office" style="background:#111;color:#fff;">Family Office</option>
                <option value="Institutional Fund" style="background:#111;color:#fff;">Institutional Fund / PE</option>
                <option value="HNI / UHNI" style="background:#111;color:#fff;">HNI / UHNI Individual</option>
                <option value="Developer / Operator" style="background:#111;color:#fff;">Developer / Hotel Operator</option>
                <option value="Corporate" style="background:#111;color:#fff;">Corporate / Strategic Buyer</option>
                <option value="REIT / InvIT" style="background:#111;color:#fff;">REIT / InvIT</option>
                <option value="Other" style="background:#111;color:#fff;">Other</option>
              </select>
            </div>
            <div style="grid-column:1/-1;">
              <label style="display:block;font-size:.6rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-bottom:.3rem;">Brief Note / Interest Statement</label>
              <textarea id="eoi-message" rows="3" placeholder="Please describe your investment thesis, timeline, and specific interest in this mandate…"
                        style="width:100%;box-sizing:border-box;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);padding:.72rem .9rem;font-size:.85rem;color:#fff;font-family:'DM Sans',sans-serif;outline:none;resize:vertical;min-height:90px;transition:border-color .2s;"
                        onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='rgba(255,255,255,.1)'"></textarea>
            </div>
            <div style="grid-column:1/-1;">
              <label style="display:flex;align-items:flex-start;gap:.5rem;cursor:pointer;">
                <input type="checkbox" id="eoi-confirm" style="accent-color:var(--gold);margin-top:.15rem;flex-shrink:0;">
                <span style="font-size:.72rem;color:rgba(255,255,255,.6);line-height:1.65;">I confirm I have accepted the NDA and understand that this EOI submission does not constitute a binding offer. I authorise India Gully to contact me regarding this mandate. *</span>
              </label>
            </div>
            <!-- Error message -->
            <div id="eoi-err" style="display:none;grid-column:1/-1;background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.3);padding:.625rem .875rem;font-size:.75rem;color:#fca5a5;">
              <i class="fas fa-exclamation-circle" style="margin-right:.4rem;"></i><span id="eoi-err-msg">Please fill all required fields.</span>
            </div>
            <div style="grid-column:1/-1;">
              <button id="eoi-submit-btn" onclick="igSubmitEOI()"
                      style="width:100%;display:flex;align-items:center;justify-content:center;gap:.625rem;padding:1rem;background:var(--gold);color:#fff;border:none;cursor:pointer;font-size:.82rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;transition:background .22s;"
                      onmouseover="this.style.background='#a37a08'" onmouseout="this.style.background='var(--gold)'">
                <i class="fas fa-paper-plane" style="font-size:.72rem;"></i>Submit Expression of Interest — ${l.title}
              </button>
            </div>
          </div>
          </div>

          <script>
          (function(){
            var style = document.createElement('style');
            style.textContent = '@keyframes pulse-ring { 0% { transform: scale(1); opacity: .5; } 100% { transform: scale(1.35); opacity: 0; } }';
            document.head.appendChild(style);
          })();
          function igSubmitEOI() {
            var name = (document.getElementById('eoi-name')||{}).value||'';
            var email = (document.getElementById('eoi-email')||{}).value||'';
            var org   = (document.getElementById('eoi-org')||{}).value||'';
            var phone = (document.getElementById('eoi-phone')||{}).value||'';
            var ticket = (document.getElementById('eoi-ticket')||{}).value||'';
            var itype = (document.getElementById('eoi-investor-type')||{}).value||'';
            var msg   = (document.getElementById('eoi-message')||{}).value||'';
            var conf  = document.getElementById('eoi-confirm');
            var errEl = document.getElementById('eoi-err');
            var errMsg = document.getElementById('eoi-err-msg');

            name = name.trim(); email = email.trim(); org = org.trim(); phone = phone.trim();

            if (!name || name.length < 2) { if(errMsg)errMsg.textContent='Please enter your full name.'; if(errEl)errEl.style.display='block'; return; }
            if (!email || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$/.test(email)) { if(errMsg)errMsg.textContent='Please enter a valid email address.'; if(errEl)errEl.style.display='block'; return; }
            if (!org || org.length < 2) { if(errMsg)errMsg.textContent='Please enter your organisation or fund name.'; if(errEl)errEl.style.display='block'; return; }
            if (!conf || !conf.checked) { if(errMsg)errMsg.textContent='Please confirm you have accepted the NDA.'; if(errEl)errEl.style.display='block'; return; }
            if (errEl) errEl.style.display = 'none';

            var btn = document.getElementById('eoi-submit-btn');
            if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-circle-notch fa-spin" style="font-size:.72rem;"></i>&nbsp;&nbsp;Submitting EOI…'; btn.style.background = 'rgba(184,150,12,.5)'; }

            fetch('/api/enquiry', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                type: 'eoi',
                mandate: '${l.id}',
                mandateTitle: '${l.title}',
                mandateValue: '${l.value}',
                mandateContact: '${l.contact || 'akm@indiagully.com'}',
                mandateContactName: '${l.contactName || 'Arun Manikonda'}',
                name: name, email: email, org: org, phone: phone,
                ticketSize: ticket, investorType: itype,
                message: msg,
                source: 'listing_eoi',
              })
            })
            .then(function(r){ return r.json(); })
            .then(function(d){
              // Show premium success panel
              var formWrap = document.getElementById('eoi-form-wrap');
              var panel = document.getElementById('eoi-success-panel');
              var refEl = document.getElementById('eoi-success-ref');
              var tsEl = document.getElementById('eoi-success-ts');
              var mandateEl = document.getElementById('eoi-success-mandate');
              if (formWrap) formWrap.style.display = 'none';
              if (panel) panel.style.display = 'block';
              if (refEl) refEl.textContent = d.ref || 'IG-EOI-' + Date.now();
              if (tsEl) tsEl.textContent = 'Submitted: ' + new Date().toLocaleString('en-IN', {timeZone:'Asia/Kolkata'}) + ' IST';
              if (mandateEl) mandateEl.textContent = '${l.title}';
              // Scroll to success panel
              if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
            })
            .catch(function(){
              if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-paper-plane" style="font-size:.72rem;"></i>&nbsp;&nbsp;Submit Expression of Interest — ${l.title}'; btn.style.background = 'var(--gold)'; }
              if (errMsg) errMsg.textContent = 'Network error. Please email akm@indiagully.com or call +91 8988 988 988.';
              if (errEl) errEl.style.display = 'block';
            });
          }
          </script>
        </div>

      </div>

      <!-- ── RIGHT SIDEBAR ────────────────────────────────── -->
      <div class="listing-detail-sidebar">

        <!-- Advisory Contact -->
        <div style="background:#fff;border:1px solid var(--border);padding:1.5rem;margin-bottom:1.25rem;">
          <p style="font-size:.62rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.875rem;">Advisory Contact</p>
          <div style="display:flex;align-items:center;gap:.875rem;margin-bottom:.875rem;">
            <div style="width:44px;height:44px;background:var(--ink);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <span style="font-family:'DM Serif Display',Georgia,serif;font-size:.9rem;color:var(--gold);font-weight:700;">${l.contactName?.split(' ').map((w: string)=>w[0]).join('')||'IG'}</span>
            </div>
            <div>
              <div style="font-size:.9rem;font-weight:600;color:var(--ink);">${l.contactName || 'India Gully Advisory'}</div>
              <div style="font-size:.72rem;color:var(--ink-muted);">Transaction Advisory</div>
            </div>
          </div>
          <div style="display:flex;flex-direction:column;gap:.5rem;">
            <a href="tel:${(l.contactPhone||'+918988988988').replace(/[\s+]/g,'').replace(/^0/,'+91')}" style="font-size:.8rem;color:var(--ink-soft);display:flex;align-items:center;gap:.5rem;transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-soft)'">
              <i class="fas fa-phone" style="color:var(--gold);width:14px;font-size:.65rem;"></i>${l.contactPhone || '+91 8988 988 988'}
            </a>
            <a href="mailto:${l.contact || 'info@indiagully.com'}" style="font-size:.8rem;color:var(--ink-soft);display:flex;align-items:center;gap:.5rem;transition:color .2s;" onmouseover="this.style.color='var(--gold)'" onmouseout="this.style.color='var(--ink-soft)'">
              <i class="fas fa-envelope" style="color:var(--gold);width:14px;font-size:.65rem;"></i>${l.contact || 'info@indiagully.com'}
            </a>
          </div>
        </div>

        <!-- NDA accepted status badge -->
        <div id="nda-status-badge" style="background:#f0fdf4;border:1px solid #bbf7d0;padding:1rem 1.25rem;margin-bottom:1.25rem;display:none;">
          <div style="display:flex;align-items:center;gap:.5rem;">
            <i class="fas fa-check-circle" style="color:#16a34a;font-size:1rem;"></i>
            <div>
              <p style="font-size:.72rem;font-weight:700;color:#15803d;margin-bottom:.1rem;">NDA Accepted</p>
              <p style="font-size:.68rem;color:#166534;" id="nda-badge-name">Viewing as verified investor</p>
            </div>
          </div>
        </div>

        <!-- Mandate quick facts -->
        <div style="background:var(--parch);border:1px solid var(--border);padding:1.25rem;margin-bottom:1.25rem;">
          <p style="font-size:.62rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.875rem;">Mandate Details</p>
          <div style="display:flex;flex-direction:column;gap:.6rem;">
            <div style="display:flex;justify-content:space-between;font-size:.78rem;border-bottom:1px solid var(--border);padding-bottom:.5rem;">
              <span style="color:var(--ink-muted);">Mandate Type</span>
              <span style="color:var(--ink);font-weight:600;">${l.mandateType}</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:.78rem;border-bottom:1px solid var(--border);padding-bottom:.5rem;">
              <span style="color:var(--ink-muted);">Asset Value</span>
              <span style="color:var(--gold);font-weight:700;">${l.value}</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:.78rem;border-bottom:1px solid var(--border);padding-bottom:.5rem;">
              <span style="color:var(--ink-muted);">NDA Required</span>
              <span style="color:${l.nda?'#B8960C':'#15803d'};font-weight:600;">${l.nda ? 'Yes — Executed' : 'No'}</span>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:.78rem;">
              <span style="color:var(--ink-muted);">Advisor</span>
              <span style="color:var(--ink);font-weight:600;">India Gully</span>
            </div>
          </div>
        </div>

        <!-- Quick EOI prompt -->
        <div style="background:var(--ink);padding:1.5rem;text-align:center;">
          <i class="fas fa-file-signature" style="color:var(--gold);font-size:1.75rem;margin-bottom:.875rem;display:block;"></i>
          <h4 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:#fff;margin-bottom:.5rem;">Ready to Proceed?</h4>
          <p style="font-size:.75rem;color:rgba(255,255,255,.45);line-height:1.65;margin-bottom:1.25rem;">Scroll down to submit your Expression of Interest and receive the Information Memorandum within 24 hours.</p>
          <a href="#eoi-section" onclick="document.getElementById('eoi-section').scrollIntoView({behavior:'smooth'});return false;" class="btn btn-g" style="width:100%;display:block;text-align:center;padding:.875rem;text-decoration:none;">
            <i class="fas fa-arrow-down" style="margin-right:.4rem;font-size:.7rem;"></i>Submit EOI
          </a>
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
        const xHasImg = x.images && x.images.length > 0
        return `
      <a href="/listings/${x.id}" style="display:block;background:#fff;border:1px solid var(--border);overflow:hidden;transition:all .25s;text-decoration:none;"
         onmouseover="this.style.borderColor='var(--gold)';this.style.boxShadow='0 8px 28px rgba(0,0,0,.08)'" onmouseout="this.style.borderColor='var(--border)';this.style.boxShadow='none'">
        <div style="height:160px;overflow:hidden;position:relative;background:#1a1a1a;">
          ${xHasImg
            ? `<img src="${x.images[0]}" alt="${x.title}" style="width:100%;height:100%;object-fit:cover;" loading="lazy">
               <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.5),transparent);"></div>`
            : `<div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(135deg,#111 0%,#1a1a2e 100%);">
                <i class="fas fa-lock" style="color:var(--gold);font-size:1.5rem;margin-bottom:.5rem;"></i>
                <span style="font-size:.6rem;color:rgba(255,255,255,.4);letter-spacing:.1em;text-transform:uppercase;">Images Under NDA</span>
              </div>`
          }
          <div style="position:absolute;bottom:.75rem;left:.875rem;">
            <span style="background:${x.sectorColor};color:#fff;font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:.2rem .55rem;">${x.sector}</span>
          </div>
        </div>
        <div style="padding:1.1rem;">
          <h4 style="font-family:'DM Serif Display',Georgia,serif;font-size:.975rem;color:var(--ink);margin-bottom:.25rem;line-height:1.3;">${x.title}</h4>
          <p style="font-size:.72rem;color:var(--ink-muted);margin-bottom:.625rem;">${x.locationShort}</p>
          <div style="display:flex;align-items:center;justify-content:space-between;">
            <span style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:var(--gold);">${x.value}</span>
            <span style="font-size:.65rem;color:var(--gold);font-weight:600;text-transform:uppercase;letter-spacing:.08em;">View + EOI →</span>
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
  // Show NDA accepted badge if already accepted
  try {
    var stored = sessionStorage.getItem('ig_nda_${l.id}');
    if (stored) {
      var d = JSON.parse(stored);
      if (d && d.accepted) {
        var badge = document.getElementById('nda-status-badge');
        var badgeName = document.getElementById('nda-badge-name');
        if (badge) badge.style.display = 'block';
        if (badgeName && d.name) badgeName.textContent = 'Viewing as ' + d.name;
      }
    }
  } catch(e) {}

  function initCarousel() {
    var detailCur = 0;
    var detailTrack = document.querySelector('.detail-track');
    var detailTotal = ${(l.images || []).length};
    var dDots = document.querySelectorAll('.d-dot');
    var dImgs = document.querySelectorAll('.detail-img');
    var dCount = document.getElementById('photoCount');

    if (!detailTrack || detailTotal < 2) return;

    if(dImgs[0]) dImgs[0].style.transform = 'scale(1)';

    window.detailGo = function(n) {
      if(dImgs[detailCur]) dImgs[detailCur].style.transform = 'scale(1.04)';
      if(dDots[detailCur]) { dDots[detailCur].style.width = '10px'; dDots[detailCur].style.background = 'rgba(255,255,255,.35)'; }

      detailCur = ((n % detailTotal) + detailTotal) % detailTotal;
      detailTrack.style.transform = 'translateX(-'+(detailCur*100)+'%)';

      if(dImgs[detailCur]) dImgs[detailCur].style.transform = 'scale(1)';
      if(dDots[detailCur]) { dDots[detailCur].style.width = '36px'; dDots[detailCur].style.background = 'var(--gold)'; }
      if(dCount) dCount.textContent = (detailCur+1) + ' / ' + detailTotal;
    };

    var prevBtn = document.getElementById('dPrev');
    var nextBtn = document.getElementById('dNext');
    if(prevBtn) prevBtn.onclick = function(){ window.detailGo(detailCur-1); };
    if(nextBtn) nextBtn.onclick = function(){ window.detailGo(detailCur+1); };

    var dTimer = setInterval(function(){ window.detailGo(detailCur+1); }, 5000);
    detailTrack.addEventListener('mouseenter', function(){ clearInterval(dTimer); });
    detailTrack.addEventListener('mouseleave', function(){ dTimer = setInterval(function(){ window.detailGo(detailCur+1); }, 5000); });

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
    description: `${listing.title}, ${listing.location}, ${listing.value}, India Gully exclusive transaction advisory mandate.`,
    ogImage: (listing as any).images?.[0],
    canonical: `https://india-gully.pages.dev/listings/${listing.id}`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'RealEstateListing',
          name: listing.title,
          description: `${listing.desc} — ${listing.location} — ${listing.value}`,
          address: { '@type': 'PostalAddress', addressLocality: listing.location, addressCountry: 'IN' },
          url: `https://india-gully.pages.dev/listings/${listing.id}`,
          image: (listing as any).images?.[0] || 'https://india-gully.pages.dev/static/og.jpg',
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://india-gully.pages.dev/' },
            { '@type': 'ListItem', position: 2, name: 'Mandates', item: 'https://india-gully.pages.dev/listings' },
            { '@type': 'ListItem', position: 3, name: listing.title, item: `https://india-gully.pages.dev/listings/${listing.id}` },
          ]
        }
      ]
    }
  }))
})

export default app
