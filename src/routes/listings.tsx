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
      <!-- Filter buttons + Saved bookmarks toggle -->
      <div style="display:flex;flex-wrap:wrap;gap:.625rem;align-items:center;">
        ${['All Mandates','Hospitality','Real Estate','Heritage Hospitality','Mixed-Use'].map((f,i) => `
        <button onclick="filterMandates('${f}')" data-filter="${f}" class="filter-btn${i===0?' active':''}"
                style="padding:.5rem 1.2rem;font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;border:1px solid ${i===0?'var(--gold)':'rgba(255,255,255,.15)'};background:${i===0?'var(--gold)':'rgba(255,255,255,.03)'};color:${i===0?'#fff':'rgba(255,255,255,.45)'};cursor:pointer;transition:all .22s;backdrop-filter:blur(4px);"
                onmouseover="if(this.dataset.filter!=='All Mandates'&&!this.classList.contains('active')){this.style.borderColor='rgba(184,150,12,.5)';this.style.color='rgba(255,255,255,.8)'}"
                onmouseout="if(!this.classList.contains('active')){this.style.borderColor='rgba(255,255,255,.15)';this.style.color='rgba(255,255,255,.45)'}">${f}</button>
        `).join('')}
        <!-- Saved mandates toggle -->
        <button id="savedToggleBtn" onclick="igToggleSaved()" title="Show saved mandates"
                style="padding:.5rem 1.1rem;font-size:.68rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.03);color:rgba(255,255,255,.45);cursor:pointer;transition:all .22s;display:flex;align-items:center;gap:.4rem;">
          <i class="fas fa-bookmark" style="font-size:.6rem;"></i>Saved (<span id="savedBadge">0</span>)
        </button>
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

    <!-- Sort + Results bar -->
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.75rem;margin-bottom:2rem;padding-bottom:1.25rem;border-bottom:1px solid var(--border);">
      <div id="resultsCount" style="font-size:.72rem;color:var(--ink-muted);"><span id="visibleCount">${LISTINGS.length}</span> mandates shown</div>
      <div style="display:flex;align-items:center;gap:.5rem;">
        <span style="font-size:.62rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);">Sort:</span>
        <select id="sortSelect" onchange="sortMandates(this.value)"
          style="font-size:.68rem;font-family:'DM Sans',sans-serif;font-weight:600;padding:.38rem .7rem;border:1px solid var(--border);background:var(--parch-dk);color:var(--ink);cursor:pointer;outline:none;border-radius:2px;">
          <option value="default">Default Order</option>
          <option value="value-high">Value: High → Low</option>
          <option value="value-low">Value: Low → High</option>
          <option value="sector">By Sector</option>
        </select>
        <button onclick="resetFilters()" title="Reset filters"
          style="font-size:.62rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;padding:.38rem .75rem;border:1px solid var(--border);background:transparent;color:var(--ink-muted);cursor:pointer;transition:all .2s;border-radius:2px;"
          onmouseover="this.style.borderColor='var(--gold)';this.style.color='var(--gold)'"
          onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--ink-muted)'">
          <i class="fas fa-undo" style="font-size:.55rem;margin-right:.35rem;"></i>Reset
        </button>
      </div>
    </div>

    <!-- Grid of cards -->
    <div id="mandatesGrid" style="display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;">
      ${LISTINGS.map((l: any, idx: number) => {
        const ss = statusStyle(l.statusType)
        const hasImages = l.images && l.images.length > 0
        return `
      <!-- MANDATE CARD: ${l.id} -->
      <a href="/listings/${l.id}" data-sector="${l.sector}" data-idx="${idx}" data-value="${parseFloat((l.value||'0').replace(/[^0-9.]/g,''))||0}" class="mandate-card ed-card"
         style="display:block;text-decoration:none;animation:fadeUp .6s cubic-bezier(.4,0,.2,1) ${idx * 0.07}s both;box-shadow:0 1px 3px rgba(0,0,0,.04);">

        <!-- IMAGE / NDA PLACEHOLDER -->
        <div class="ed-card-img" style="position:relative;height:240px;background:#0a0a14;">
          ${hasImages
            ? `<img src="${l.images[0]}" alt="${l.title}" style="width:100%;height:100%;object-fit:cover;" loading="lazy">`
            : `<div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;background:linear-gradient(145deg,#090912 0%,#0f0f1e 50%,#111128 100%);position:relative;overflow:hidden;">
                <!-- subtle grid pattern -->
                <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.04) 1px,transparent 1px);background-size:32px 32px;pointer-events:none;"></div>
                <!-- gold radial glow -->
                <div style="position:absolute;inset:0;background:radial-gradient(ellipse 60% 60% at 50% 50%,rgba(184,150,12,.06) 0%,transparent 70%);pointer-events:none;"></div>
                <div style="position:relative;text-align:center;">
                  <div style="width:64px;height:64px;background:rgba(184,150,12,.1);border:1.5px solid rgba(184,150,12,.3);display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;border-radius:2px;">
                    <i class="fas fa-lock" style="color:var(--gold);font-size:1.35rem;"></i>
                  </div>
                  <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.55rem;color:#fff;line-height:1;margin-bottom:.3rem;">${l.value}</div>
                  ${l.valueUSD ? `<div style="font-size:.6rem;color:rgba(255,255,255,.4);letter-spacing:.06em;margin-bottom:.7rem;">${l.valueUSD}</div>` : '<div style="margin-bottom:.7rem;"></div>'}
                  <div style="font-size:.58rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:rgba(184,150,12,.7);">Confidential · NDA Required</div>
                </div>
              </div>`
          }
          <!-- Gradient overlay for images -->
          ${hasImages ? `<div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(3,3,10,.75) 0%,rgba(3,3,10,.2) 50%,transparent 100%);"></div>` : ''}
          <!-- Sector pill -->
          <div style="position:absolute;top:1.1rem;left:1.1rem;">
            <span style="background:${l.sectorColor};color:#fff;font-size:.57rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;padding:.26rem .7rem;">${l.sector}</span>
          </div>
          <!-- NDA badge (always shown for all mandates) -->
          <div style="position:absolute;top:1.1rem;right:1.1rem;background:rgba(0,0,0,.55);backdrop-filter:blur(6px);padding:.22rem .65rem;display:flex;align-items:center;gap:.35rem;border:1px solid rgba(184,150,12,.4);">
            <i class="fas fa-lock" style="font-size:.48rem;color:var(--gold);"></i>
            <span style="font-size:.56rem;color:rgba(255,255,255,.85);letter-spacing:.08em;font-weight:700;text-transform:uppercase;">NDA</span>
          </div>
          <!-- Value overlay (images only) -->
          ${hasImages ? `
          <div style="position:absolute;bottom:1.1rem;left:1.1rem;right:1.1rem;display:flex;align-items:flex-end;justify-content:space-between;">
            <div>
              <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.9rem;color:#fff;line-height:1;text-shadow:0 2px 12px rgba(0,0,0,.7);">${l.value}</div>
              ${l.valueUSD ? `<div style="font-size:.58rem;color:rgba(255,255,255,.5);margin-top:.1rem;">${l.valueUSD}</div>` : ''}
            </div>
            <div style="background:rgba(0,0,0,.4);backdrop-filter:blur(6px);padding:.2rem .55rem;display:flex;align-items:center;gap:.3rem;border:1px solid rgba(255,255,255,.15);">
              <i class="fas fa-images" style="font-size:.48rem;color:rgba(255,255,255,.5);"></i>
              <span style="font-size:.56rem;color:rgba(255,255,255,.6);letter-spacing:.06em;">${l.images.length} photos · NDA required</span>
            </div>
          </div>` : ''}
        </div>

        <!-- CONTENT -->
        <div style="padding:1.875rem;background:var(--parch);position:relative;">
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
          <div style="display:flex;align-items:center;justify-content:space-between;padding-top:1rem;border-top:1px solid var(--border-lt);gap:.5rem;flex-wrap:wrap;">
            <span style="font-size:.67rem;color:var(--gold);font-weight:700;letter-spacing:.1em;text-transform:uppercase;display:flex;align-items:center;gap:.4rem;">
              <i class="fas fa-file-signature" style="font-size:.6rem;"></i>View Mandate
            </span>
            <div style="display:flex;align-items:center;gap:.5rem;">
              <!-- Bookmark / Save button -->
              <button class="ig-save-btn" data-id="${l.id}" data-title="${l.title.replace(/"/g,'&quot;')}" onclick="event.preventDefault();event.stopPropagation();igSaveToggle(this)"
                title="Save this mandate"
                style="width:28px;height:28px;background:rgba(184,150,12,.08);border:1px solid rgba(184,150,12,.25);color:rgba(184,150,12,.55);cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;flex-shrink:0;">
                <i class="fas fa-bookmark" style="font-size:.58rem;"></i>
              </button>
              <a href="https://wa.me/918988988988?text=${encodeURIComponent('Hi, I am interested in ' + l.title + ' — please share details / Information Memorandum.')}" target="_blank" rel="noopener" onclick="event.stopPropagation()"
                style="display:inline-flex;align-items:center;gap:.3rem;font-size:.6rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;background:#25D366;color:#fff;padding:.28rem .65rem;text-decoration:none;transition:opacity .2s;"
                onmouseover="this.style.opacity='.85'" onmouseout="this.style.opacity='1'">
                <i class="fab fa-whatsapp" style="font-size:.68rem;"></i>Enquire
              </a>
              <div style="display:flex;align-items:center;gap:.3rem;font-size:.6rem;color:var(--ink-faint);">
                ${l.nda ? `<i class="fas fa-lock" style="font-size:.52rem;color:var(--gold);"></i><span style="color:var(--gold);font-weight:600;">NDA</span>` : `<i class="fas fa-unlock" style="font-size:.52rem;"></i><span>Open</span>`}
              </div>
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
var _currentSector = 'All Mandates';
var _showingOnlySaved = false;

/* ── BOOKMARK / SAVE ────────────────────────────────────────────────── */
var IG_SAVED_KEY = 'ig_saved_mandates';
function igGetSaved(){ try{ return JSON.parse(localStorage.getItem(IG_SAVED_KEY)||'[]'); }catch(e){ return []; } }
function igSetSaved(arr){ localStorage.setItem(IG_SAVED_KEY, JSON.stringify(arr)); }

function igSaveToggle(btn){
  var id    = btn.getAttribute('data-id');
  var title = btn.getAttribute('data-title');
  var saved = igGetSaved();
  var idx   = saved.indexOf(id);
  if(idx === -1){
    saved.push(id);
    btn.style.background = 'var(--gold)';
    btn.style.borderColor = 'var(--gold)';
    btn.style.color = '#fff';
    btn.querySelector('i').className = 'fas fa-bookmark';
    if(window.igToast) igToast('\u2665 Saved: ' + title, 'success');
  } else {
    saved.splice(idx, 1);
    btn.style.background = 'rgba(184,150,12,.08)';
    btn.style.borderColor = 'rgba(184,150,12,.25)';
    btn.style.color = 'rgba(184,150,12,.55)';
    if(window.igToast) igToast('Removed: ' + title, 'info');
  }
  igSetSaved(saved);
  igUpdateSavedBadge();
}

function igUpdateSavedBadge(){
  var saved  = igGetSaved();
  var badge  = document.getElementById('savedBadge');
  var togBtn = document.getElementById('savedToggleBtn');
  if(badge) badge.textContent = String(saved.length);
  if(togBtn){
    togBtn.style.borderColor  = saved.length ? 'var(--gold)' : 'rgba(255,255,255,.15)';
    togBtn.style.color        = saved.length ? 'var(--gold)' : 'rgba(255,255,255,.45)';
    togBtn.style.background   = saved.length ? 'rgba(184,150,12,.1)' : 'rgba(255,255,255,.03)';
  }
  /* update individual card buttons */
  document.querySelectorAll('.ig-save-btn').forEach(function(b){
    var isSaved = saved.indexOf(b.getAttribute('data-id')) !== -1;
    b.style.background   = isSaved ? 'var(--gold)'              : 'rgba(184,150,12,.08)';
    b.style.borderColor  = isSaved ? 'var(--gold)'              : 'rgba(184,150,12,.25)';
    b.style.color        = isSaved ? '#fff'                     : 'rgba(184,150,12,.55)';
  });
}

function igToggleSaved(){
  _showingOnlySaved = !_showingOnlySaved;
  var saved  = igGetSaved();
  var togBtn = document.getElementById('savedToggleBtn');
  if(togBtn){
    togBtn.style.background  = _showingOnlySaved ? 'var(--gold)' : (saved.length ? 'rgba(184,150,12,.1)' : 'rgba(255,255,255,.03)');
    togBtn.style.color       = _showingOnlySaved ? '#fff'        : (saved.length ? 'var(--gold)' : 'rgba(255,255,255,.45)');
  }
  applyFilters();
  if(_showingOnlySaved && saved.length === 0 && window.igToast){
    igToast('No saved mandates yet \u2014 click \u2665 on any card to save.', 'info');
  }
}

function applyFilters(){
  var saved = igGetSaved();
  document.querySelectorAll('.mandate-card').forEach(function(card){
    var sectorMatch = (_currentSector === 'All Mandates' || card.dataset.sector === _currentSector);
    var savedMatch  = !_showingOnlySaved || saved.indexOf(card.getAttribute('href')&&card.getAttribute('href').split('/').pop()) !== -1
      || saved.indexOf(card.querySelector('.ig-save-btn')&&card.querySelector('.ig-save-btn').getAttribute('data-id')) !== -1;
    card.style.display = (sectorMatch && savedMatch) ? 'block' : 'none';
  });
}

/* initialise badge on page load */
document.addEventListener('DOMContentLoaded', igUpdateSavedBadge);
if(document.readyState !== 'loading') igUpdateSavedBadge();

function filterMandates(sector) {
  _currentSector = sector;
  var btns  = document.querySelectorAll('.filter-btn');
  btns.forEach(function(b) {
    var isActive = b.dataset.filter === sector;
    b.classList.toggle('active', isActive);
    b.style.borderColor = isActive ? 'var(--gold)' : 'rgba(255,255,255,.15)';
    b.style.background  = isActive ? 'var(--gold)' : 'rgba(255,255,255,.03)';
    b.style.color       = isActive ? '#fff' : 'rgba(255,255,255,.45)';
  });
  applyFilters();
  var visible = document.querySelectorAll('.mandate-card[style*="block"]').length
             || document.querySelectorAll('.mandate-card:not([style*="none"])').length;
  var vc = document.getElementById('visibleCount');
  if (vc) vc.textContent = String(visible);
}

function sortMandates(order) {
  var grid = document.getElementById('mandatesGrid');
  if (!grid) return;
  var cards = Array.from(grid.querySelectorAll('.mandate-card'));
  cards.sort(function(a, b) {
    if (order === 'sector') {
      return (a.dataset.sector || '').localeCompare(b.dataset.sector || '');
    }
    if (order === 'value-high' || order === 'value-low') {
      // Extract numeric value from data-value attribute (crore)
      var av = parseFloat(a.dataset.value || '0');
      var bv = parseFloat(b.dataset.value || '0');
      return order === 'value-high' ? bv - av : av - bv;
    }
    return parseInt(a.dataset.idx || '0') - parseInt(b.dataset.idx || '0');
  });
  cards.forEach(function(c) { grid.appendChild(c); });
  // Re-apply current sector filter
  filterMandates(_currentSector);
}

function resetFilters() {
  document.getElementById('sortSelect').value = 'default';
  sortMandates('default');
  filterMandates('All Mandates');
}
</script>

`
  return c.html(layout('Active Mandates — India Gully Advisory Pipeline', content, {
    description: 'India Gully active mandates — ₹1,165 Cr+ institutional-grade investment opportunities across Real Estate, Hospitality, Entertainment and Retail. All opportunities subject to NDA.',
    canonical: 'https://india-gully.pages.dev/listings',
    ogImage: 'https://india-gully.pages.dev/static/og-listings.jpg'
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
     NDA GATE — FLOATING PANEL (non-blocking teaser approach)
     Basic project info visible beneath; detailed specs + financials + EOI
     locked until NDA accepted. Collects: Full Name · Email · Phone · Org.
     Storage: sessionStorage['ig_nda_${l.id}'] = JSON
═══════════════════════════════════════════════════════════════════════ -->
<div id="nda-gate" style="position:fixed;inset:0;z-index:9000;display:flex;align-items:flex-start;justify-content:center;padding:1rem;background:rgba(6,6,6,.88);backdrop-filter:blur(10px);overflow-y:auto;">
  <div style="width:100%;max-width:580px;background:#fff;overflow:hidden;box-shadow:0 40px 100px rgba(0,0,0,.7);margin:2rem auto;">

    <!-- Modal header (dark) with mandate teaser -->
    <div style="background:var(--ink);padding:1.5rem 2rem;position:relative;overflow:hidden;">
      <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(184,150,12,.08) 0%,transparent 60%);pointer-events:none;"></div>
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1rem;">
        <div style="width:44px;height:44px;background:var(--gold);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <i class="fas fa-file-contract" style="color:#fff;font-size:1rem;"></i>
        </div>
        <div>
          <p style="font-size:.58rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:rgba(184,150,12,.65);margin-bottom:.2rem;">India Gully · Confidential Mandate</p>
          <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.25rem;color:#fff;line-height:1.2;">Non-Disclosure Agreement Required</h2>
        </div>
      </div>
      <!-- Mandate quick facts strip (visible before NDA) -->
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:.5rem;">
        <div style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);padding:.625rem .75rem;text-align:center;">
          <div style="font-size:.55rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:.25rem;">Sector</div>
          <div style="font-size:.78rem;font-weight:600;color:#fff;">${l.sector}</div>
        </div>
        <div style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);padding:.625rem .75rem;text-align:center;">
          <div style="font-size:.55rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:.25rem;">Mandate Type</div>
          <div style="font-size:.78rem;font-weight:600;color:#fff;">${l.mandateType}</div>
        </div>
        <div style="background:rgba(184,150,12,.12);border:1px solid rgba(184,150,12,.3);padding:.625rem .75rem;text-align:center;">
          <div style="font-size:.55rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(184,150,12,.65);margin-bottom:.25rem;">Indicative Value</div>
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:.9rem;color:var(--gold);">${l.value}</div>
        </div>
      </div>
    </div>

    <!-- Mandate identity banner -->
    <div style="background:#fffbeb;border-bottom:2px solid #fde68a;padding:.75rem 1.5rem;display:flex;align-items:center;gap:.625rem;">
      <i class="fas fa-shield-alt" style="color:#d97706;font-size:.8rem;flex-shrink:0;"></i>
      <p style="font-size:.75rem;color:#78350f;line-height:1.5;margin:0;">
        <strong>${l.title}</strong> · <span style="color:#92400e;">${l.locationShort}</span><br>
        <span style="font-size:.68rem;color:#92400e;">Signing this NDA gives you access to full mandate details, financials, and the EOI submission form.</span>
      </p>
    </div>

    <div style="padding:1.5rem 1.75rem;">

      <!-- Identity collection form (2-column grid) -->
      <div style="margin-bottom:1.25rem;">
        <p style="font-size:.62rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.75rem;"><i class="fas fa-user-circle" style="color:var(--gold);margin-right:.4rem;"></i>Your Investor Details (required)</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:.625rem;">
          <div>
            <label style="display:block;font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.2rem;">Full Name *</label>
            <input id="nda-name" type="text" placeholder="e.g. Rajesh Kumar" required autocomplete="name"
                   style="width:100%;box-sizing:border-box;border:1px solid var(--border);padding:.6rem .8rem;font-size:.85rem;color:var(--ink);font-family:'DM Sans',sans-serif;outline:none;transition:all .2s;background:#fafaf7;"
                   onfocus="this.style.borderColor='var(--gold)';this.style.boxShadow='0 0 0 3px rgba(184,150,12,.08)'" onblur="this.style.borderColor='var(--border)';this.style.boxShadow='none'">
          </div>
          <div>
            <label style="display:block;font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.2rem;">Email Address *</label>
            <input id="nda-email" type="email" placeholder="your@email.com" required autocomplete="email"
                   style="width:100%;box-sizing:border-box;border:1px solid var(--border);padding:.6rem .8rem;font-size:.85rem;color:var(--ink);font-family:'DM Sans',sans-serif;outline:none;transition:all .2s;background:#fafaf7;"
                   onfocus="this.style.borderColor='var(--gold)';this.style.boxShadow='0 0 0 3px rgba(184,150,12,.08)'" onblur="this.style.borderColor='var(--border)';this.style.boxShadow='none'">
          </div>
          <div>
            <label style="display:block;font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.2rem;">Phone / WhatsApp *</label>
            <input id="nda-phone" type="tel" placeholder="+91 98XXX XXXXX" required autocomplete="tel"
                   style="width:100%;box-sizing:border-box;border:1px solid var(--border);padding:.6rem .8rem;font-size:.85rem;color:var(--ink);font-family:'DM Sans',sans-serif;outline:none;transition:all .2s;background:#fafaf7;"
                   onfocus="this.style.borderColor='var(--gold)';this.style.boxShadow='0 0 0 3px rgba(184,150,12,.08)'" onblur="this.style.borderColor='var(--border)';this.style.boxShadow='none'">
          </div>
          <div>
            <label style="display:block;font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.2rem;">Organisation / Fund *</label>
            <input id="nda-org" type="text" placeholder="e.g. XYZ Family Office" required autocomplete="organization"
                   style="width:100%;box-sizing:border-box;border:1px solid var(--border);padding:.6rem .8rem;font-size:.85rem;color:var(--ink);font-family:'DM Sans',sans-serif;outline:none;transition:all .2s;background:#fafaf7;"
                   onfocus="this.style.borderColor='var(--gold)';this.style.boxShadow='0 0 0 3px rgba(184,150,12,.08)'" onblur="this.style.borderColor='var(--border)';this.style.boxShadow='none'">
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
      <div style="display:flex;gap:.875rem;flex-wrap:wrap;">
        <a href="/listings" style="padding:.875rem 1rem;border:1px solid var(--border);text-align:center;font-size:.75rem;font-weight:600;color:var(--ink-soft);text-decoration:none;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:.4rem;" onmouseover="this.style.borderColor='var(--ink)'" onmouseout="this.style.borderColor='var(--border)'">
          <i class="fas fa-arrow-left" style="font-size:.62rem;"></i>Back
        </a>
        <a href="/portal/client/register?mandate=${l.id}&title=${encodeURIComponent(l.title)}" style="padding:.875rem 1.25rem;border:1px solid rgba(184,150,12,.4);text-align:center;font-size:.72rem;font-weight:600;color:var(--gold);text-decoration:none;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:.4rem;background:rgba(184,150,12,.06);" onmouseover="this.style.background='rgba(184,150,12,.12)'" onmouseout="this.style.background='rgba(184,150,12,.06)'">
          <i class="fas fa-user-plus" style="font-size:.62rem;"></i>Register Instead
        </a>
        <button id="nda-accept" onclick="igAcceptNDA('${l.id}')"
                style="flex:2;min-width:200px;padding:.875rem;background:var(--ink);color:#fff;border:none;cursor:pointer;font-size:.78rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:.5rem;"
                onmouseover="this.style.background='var(--gold)'" onmouseout="this.style.background='var(--ink)'">
          <i class="fas fa-file-signature" style="font-size:.72rem;"></i>I Accept &amp; Proceed
        </button>
      </div>

      <p style="font-size:.62rem;color:var(--ink-faint);margin-top:.75rem;text-align:center;line-height:1.6;"><i class="fas fa-lock" style="color:var(--gold);margin-right:.3rem;font-size:.55rem;"></i>Your acceptance is recorded with timestamp · India Gully · CIN: U74999DL2017PTC323237</p>
    </div>
  </div>
</div>

<style>
#nda-gate { transition: opacity .35s; }
#nda-gate input:focus { border-color: var(--gold)!important; box-shadow:0 0 0 3px rgba(184,150,12,.1)!important; }
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
        // Unlock content sections immediately
        if (typeof igUnlockContent === 'function') {
          igUnlockContent(d.name, d.email, d.phone, d.org);
        } else {
          // Fallback: direct unlock
          var eoiLock = document.getElementById('eoi-lock-notice');
          var eoiSec  = document.getElementById('eoi-section');
          var specLock = document.getElementById('spec-lock-overlay');
          if (eoiLock) eoiLock.style.display = 'none';
          if (eoiSec)  eoiSec.style.display = 'block';
          if (specLock) specLock.style.display = 'none';
        }
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

  // Unlock content sections
  igUnlockContent(nameVal, emailVal, phoneVal, orgVal);

  // Pre-fill EOI form
  setTimeout(function(){
    var en = document.getElementById('eoi-name');  if(en) en.value = nameVal;
    var ee = document.getElementById('eoi-email'); if(ee) ee.value = emailVal;
    var ep = document.getElementById('eoi-phone'); if(ep) ep.value = phoneVal;
    var eo = document.getElementById('eoi-org');   if(eo) eo.value = orgVal;
  }, 400);

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
        mandateValue: '${l.value}',
        mandateContact: '${l.contact || 'akm@indiagully.com'}',
        mandateContactName: '${l.contactName || 'Arun Manikonda'}',
        mandateContactPhone: '${l.contactPhone || '+91 98108 89134'}',
        name: nameVal, email: emailVal, phone: phoneVal, org: orgVal,
        ts: new Date().toISOString()
      })
    }).catch(function(){});
  } catch(e) {}
}

function igScrollToNDA() {
  var gate = document.getElementById('nda-gate');
  if (gate && gate.style.display !== 'none') {
    gate.scrollTop = 0;
    var inner = gate.querySelector('div');
    if (inner) { inner.style.animation = 'none'; setTimeout(function(){ inner.style.animation = 'fadeSlideUp .3s ease'; }, 10); }
  }
}

function igUnlockContent(name, email, phone, org) {
  // Show full overview
  var teaser = document.getElementById('overview-teaser');
  var full   = document.getElementById('overview-full');
  var lock   = document.getElementById('overview-lock');
  if (teaser) teaser.style.display = 'none';
  if (full)   { full.style.display = 'block'; }
  if (lock)   lock.style.display = 'none';

  // Remove spec lock overlay
  var specLock = document.getElementById('spec-lock-overlay');
  if (specLock) {
    specLock.style.opacity = '0';
    specLock.style.transition = 'opacity .3s';
    setTimeout(function(){ specLock.style.display = 'none'; }, 300);
  }

  // Show EOI section, hide locked notice
  var eoiLock = document.getElementById('eoi-lock-notice');
  var eoiSec  = document.getElementById('eoi-section');
  if (eoiLock) eoiLock.style.display = 'none';
  if (eoiSec)  { eoiSec.style.display = 'block'; }

  // Show NDA badge in sidebar
  var badge     = document.getElementById('nda-status-badge');
  var badgeName = document.getElementById('nda-badge-name');
  if (badge) badge.style.display = 'block';
  if (badgeName && name) badgeName.textContent = 'Viewing as ' + name;
}
</script>` : ''

  const content = `
<!-- Phase 11A: Reading progress bar -->
<div id="detail-progress" style="position:fixed;top:0;left:0;height:3px;width:0%;background:linear-gradient(90deg,var(--gold),#D4AE2A);z-index:9999;transition:width .1s linear;pointer-events:none;"></div>

<!-- Phase 11A: Lightbox overlay -->
<div id="ig-lightbox" style="display:none;position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.96);align-items:center;justify-content:center;flex-direction:column;">
  <div style="position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent);"></div>
  <!-- Close -->
  <button onclick="window.igLightboxClose()" style="position:absolute;top:1.25rem;right:1.5rem;background:none;border:1px solid rgba(255,255,255,.2);color:#fff;width:40px;height:40px;font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;z-index:2;" onmouseover="this.style.background='var(--gold)';this.style.borderColor='var(--gold)'" onmouseout="this.style.background='none';this.style.borderColor='rgba(255,255,255,.2)'"><i class="fas fa-times"></i></button>
  <!-- Counter -->
  <div id="ig-lb-count" style="position:absolute;top:1.5rem;left:50%;transform:translateX(-50%);font-size:.72rem;font-weight:700;letter-spacing:.16em;color:rgba(255,255,255,.5);"></div>
  <!-- Image -->
  <img id="ig-lb-img" src="" alt="" style="max-width:92vw;max-height:82vh;object-fit:contain;transition:opacity .18s;user-select:none;">
  <!-- Caption -->
  <div id="ig-lb-caption" style="margin-top:1rem;font-size:.75rem;color:rgba(255,255,255,.35);letter-spacing:.06em;"></div>
  <!-- Arrows -->
  <button id="ig-lb-prev" style="position:absolute;left:1.5rem;top:50%;transform:translateY(-50%);width:48px;height:48px;border:1px solid rgba(255,255,255,.2);background:rgba(0,0,0,.4);backdrop-filter:blur(8px);color:#fff;font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;" onmouseover="this.style.background='var(--gold)';this.style.borderColor='var(--gold)'" onmouseout="this.style.background='rgba(0,0,0,.4)';this.style.borderColor='rgba(255,255,255,.2)'"><i class="fas fa-chevron-left"></i></button>
  <button id="ig-lb-next" style="position:absolute;right:1.5rem;top:50%;transform:translateY(-50%);width:48px;height:48px;border:1px solid rgba(255,255,255,.2);background:rgba(0,0,0,.4);backdrop-filter:blur(8px);color:#fff;font-size:1rem;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;" onmouseover="this.style.background='var(--gold)';this.style.borderColor='var(--gold)'" onmouseout="this.style.background='rgba(0,0,0,.4)';this.style.borderColor='rgba(255,255,255,.2)'"><i class="fas fa-chevron-right"></i></button>
</div>

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
          <!-- Public teaser (first 2 sentences always visible) -->
          <div id="overview-teaser" style="font-size:.9375rem;color:var(--ink-soft);line-height:1.85;">${l.desc}</div>
          <!-- Full longDesc visible only after NDA -->
          <div id="overview-full" style="display:none;font-size:.9375rem;color:var(--ink-soft);line-height:1.85;white-space:pre-line;margin-top:1rem;">${l.longDesc}</div>
          <!-- NDA unlock prompt for overview -->
          <div id="overview-lock" style="margin-top:1rem;display:flex;align-items:center;gap:.625rem;padding:.75rem 1rem;background:#fffbeb;border:1px solid #fde68a;">
            <i class="fas fa-lock" style="color:#d97706;font-size:.8rem;"></i>
            <span style="font-size:.75rem;color:#78350f;">Full mandate details, financials and documentation are available after NDA acceptance.</span>
            <button onclick="igScrollToNDA()" style="margin-left:auto;background:#d97706;color:#fff;border:none;padding:.35rem .875rem;font-size:.7rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;white-space:nowrap;">Sign NDA &rarr;</button>
          </div>
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

        <!-- ── Phase 11A: Investment Snapshot ─────────────────────────── -->
        <div style="margin-bottom:2.5rem;border:1px solid var(--border);background:var(--parch);overflow:hidden;">
          <div style="padding:1rem 1.25rem;border-bottom:1px solid var(--border);background:#fff;display:flex;align-items:center;justify-content:space-between;gap:.5rem;flex-wrap:wrap;">
            <div style="display:flex;align-items:center;gap:.625rem;">
              <i class="fas fa-chart-bar" style="color:var(--gold);font-size:.85rem;"></i>
              <p style="font-size:.68rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--ink);margin:0;">Investment Snapshot</p>
            </div>
            <span style="font-size:.62rem;color:var(--ink-muted);letter-spacing:.04em;">Indicative · Subject to Due Diligence</span>
          </div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:0;">
            ${[
              { label:'Indicative Value', value: l.value,            icon:'rupee-sign',  color:'var(--gold)' },
              { label:'Mandate Type',     value: l.mandateType,       icon:'file-alt',    color:'var(--ink)' },
              { label:'Deal Status',      value: l.status.split('–')[0].trim(), icon:'circle', color: l.statusType==='active'?'#15803d':l.statusType==='negotiation'?'#1d4ed8':'#9333ea' },
            ].map(item => `
            <div style="padding:1.25rem 1rem;border-right:1px solid var(--border);border-bottom:1px solid var(--border);text-align:center;">
              <i class="fas fa-${item.icon}" style="color:${item.color};font-size:.75rem;margin-bottom:.5rem;display:block;opacity:.7;"></i>
              <div style="font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.35rem;">${item.label}</div>
              <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:${item.color};line-height:1.2;">${item.value}</div>
            </div>`).join('')}
            ${[
              { label:'Location',    value: l.locationShort,      icon:'map-marker-alt', color:'var(--ink)' },
              { label:'NDA',         value: l.nda?'Required':'Not Required', icon:'lock', color:l.nda?'#B8960C':'#15803d' },
              { label:'USD Equiv.',  value: l.valueUSD || 'N/A',  icon:'dollar-sign',   color:'var(--ink-muted)' },
            ].map(item => `
            <div style="padding:1.25rem 1rem;border-right:1px solid var(--border);text-align:center;">
              <i class="fas fa-${item.icon}" style="color:${item.color};font-size:.75rem;margin-bottom:.5rem;display:block;opacity:.7;"></i>
              <div style="font-size:.68rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.35rem;">${item.label}</div>
              <div style="font-size:.875rem;font-weight:600;color:${item.color};line-height:1.2;">${item.value}</div>
            </div>`).join('')}
          </div>
          <div style="padding:.875rem 1.25rem;background:rgba(184,150,12,.04);border-top:1px solid var(--border);display:flex;align-items:center;gap:.5rem;">
            <i class="fas fa-info-circle" style="color:var(--gold);font-size:.7rem;flex-shrink:0;"></i>
            <span style="font-size:.72rem;color:var(--ink-muted);line-height:1.5;">Full financial model, cap rate analysis, DCF and historical performance data available in the Information Memorandum — provided to accepted investors after NDA execution.</span>
          </div>
        </div>

        <!-- Full spec sheet (locked until NDA) -->
        <div style="margin-bottom:2.5rem;position:relative;" id="specSheet">
          <p style="font-size:.68rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.875rem;padding-bottom:.625rem;border-bottom:1px solid var(--border);">Full Specifications</p>
          <!-- Locked overlay -->
          <div id="spec-lock-overlay" style="position:absolute;inset:0;z-index:10;backdrop-filter:blur(6px);background:rgba(250,248,243,.75);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.75rem;border:1px solid var(--border);">
            <div style="width:52px;height:52px;background:var(--ink);display:flex;align-items:center;justify-content:center;">
              <i class="fas fa-lock" style="color:var(--gold);font-size:1.1rem;"></i>
            </div>
            <div style="text-align:center;">
              <p style="font-size:.72rem;font-weight:700;color:var(--ink);margin-bottom:.3rem;">Full Specifications · Under NDA</p>
              <p style="font-size:.68rem;color:var(--ink-muted);">${Object.keys(l.specs||{}).length} specification fields available after signing</p>
            </div>
            <button onclick="igScrollToNDA()" style="background:var(--gold);color:#fff;border:none;padding:.6rem 1.5rem;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;display:flex;align-items:center;gap:.5rem;">
              <i class="fas fa-file-signature" style="font-size:.65rem;"></i>Sign NDA to Unlock
            </button>
          </div>
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
        <!-- EOI LOCKED STATE (shown before NDA) -->
        <div id="eoi-lock-notice" style="background:var(--ink);padding:2.5rem;margin-bottom:2rem;border:1px solid rgba(184,150,12,.2);text-align:center;">
          <div style="width:56px;height:56px;background:rgba(184,150,12,.12);border:1px solid rgba(184,150,12,.3);display:flex;align-items:center;justify-content:center;margin:0 auto 1.25rem;">
            <i class="fas fa-lock" style="color:var(--gold);font-size:1.25rem;"></i>
          </div>
          <p style="font-size:.62rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(184,150,12,.6);margin-bottom:.5rem;">Expression of Interest</p>
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.4rem;color:#fff;margin-bottom:.875rem;">Sign NDA to Submit Your EOI</h3>
          <p style="font-size:.82rem;color:rgba(255,255,255,.45);line-height:1.75;max-width:440px;margin:0 auto 1.5rem;">Access to the EOI submission form requires signing the Non-Disclosure Agreement. This protects all parties and ensures confidentiality of the transaction.</p>
          <button onclick="igScrollToNDA()" style="background:var(--gold);color:#fff;border:none;padding:.875rem 2rem;font-size:.78rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;cursor:pointer;display:inline-flex;align-items:center;gap:.6rem;">
            <i class="fas fa-file-signature" style="font-size:.7rem;"></i>Sign NDA &amp; Proceed
          </button>
        </div>

        <div id="eoi-section" style="display:none;background:var(--ink);padding:2.5rem;margin-bottom:2rem;border:1px solid rgba(184,150,12,.2);">
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

          <!-- EOI SUCCESS PANEL — PREMIUM REDESIGN -->
          <div id="eoi-success-panel" style="display:none;">
            <div style="position:relative;overflow:hidden;background:linear-gradient(145deg,#06101e 0%,#0b1a30 40%,#06101e 100%);border:1px solid rgba(184,150,12,.3);padding:0;">
              <!-- Gold shimmer top bar -->
              <div style="height:4px;background:linear-gradient(90deg,transparent 0%,rgba(184,150,12,.4) 20%,var(--gold) 50%,rgba(184,150,12,.4) 80%,transparent 100%);position:relative;overflow:hidden;">
                <div style="position:absolute;inset:0;background:linear-gradient(90deg,transparent,rgba(255,255,255,.6),transparent);animation:shimmer 2.5s infinite;"></div>
              </div>
              <!-- Radial glow effects -->
              <div style="position:absolute;top:-80px;right:-80px;width:280px;height:280px;background:radial-gradient(circle,rgba(184,150,12,.07) 0%,transparent 65%);pointer-events:none;"></div>
              <div style="position:absolute;bottom:-60px;left:-60px;width:220px;height:220px;background:radial-gradient(circle,rgba(37,99,235,.06) 0%,transparent 65%);pointer-events:none;"></div>

              <div style="padding:2.5rem 2rem;">
                <div style="display:flex;flex-direction:column;align-items:center;text-align:center;gap:1.75rem;">

                  <!-- Animated success icon -->
                  <div style="position:relative;">
                    <div style="width:80px;height:80px;background:linear-gradient(135deg,rgba(184,150,12,.25),rgba(184,150,12,.08));border:2px solid rgba(184,150,12,.5);display:flex;align-items:center;justify-content:center;border-radius:50%;position:relative;z-index:1;">
                      <i class="fas fa-check-double" style="color:var(--gold);font-size:1.85rem;"></i>
                    </div>
                    <div style="position:absolute;inset:-6px;border-radius:50%;border:1px solid rgba(184,150,12,.2);animation:pulse-ring 2.5s ease-out infinite;"></div>
                    <div style="position:absolute;inset:-14px;border-radius:50%;border:1px solid rgba(184,150,12,.1);animation:pulse-ring 2.5s ease-out .4s infinite;"></div>
                  </div>

                  <!-- Headline block -->
                  <div>
                    <p style="font-size:.57rem;font-weight:700;letter-spacing:.35em;text-transform:uppercase;color:var(--gold);margin-bottom:.5rem;opacity:.8;">EOI Submitted Successfully</p>
                    <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:#fff;line-height:1.15;margin-bottom:.875rem;">Your Expression of<br>Interest has been received.</h3>
                    <p style="font-size:.875rem;color:rgba(255,255,255,.5);line-height:1.8;max-width:460px;">India Gully's advisory team has received your EOI for <strong style="color:rgba(255,255,255,.85);" id="eoi-success-mandate"></strong>. A confirmation email has been dispatched to your registered address.</p>
                  </div>

                  <!-- Reference number card -->
                  <div style="background:rgba(184,150,12,.08);border:1px solid rgba(184,150,12,.3);padding:1.25rem 2.5rem;width:100%;max-width:400px;position:relative;overflow:hidden;">
                    <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(184,150,12,.5),transparent);"></div>
                    <p style="font-size:.56rem;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:rgba(184,150,12,.55);margin-bottom:.4rem;">EOI Reference Number</p>
                    <div id="eoi-success-ref" style="font-family:'DM Serif Display',Georgia,serif;font-size:1.4rem;color:var(--gold);letter-spacing:.05em;margin-bottom:.25rem;"></div>
                    <p id="eoi-success-ts" style="font-size:.6rem;color:rgba(255,255,255,.28);"></p>
                    <p style="font-size:.65rem;color:rgba(255,255,255,.35);margin-top:.4rem;"><i class="fas fa-envelope" style="margin-right:.3rem;"></i>Confirmation sent to your email</p>
                  </div>

                  <!-- Horizontal timeline of next steps -->
                  <div style="width:100%;max-width:520px;">
                    <p style="font-size:.6rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.28);margin-bottom:1.25rem;text-align:center;">Transaction Process</p>
                    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:.5rem;">
                      ${[
                        { n:'01', icon:'check-circle', title:'EOI Received', desc:'Logged & timestamped', active:true },
                        { n:'02', icon:'user-tie',     title:'IM Dispatch',  desc:'Within 24–48 hrs' },
                        { n:'03', icon:'chart-bar',    title:'Mgmt Call',    desc:'Shortlisted investors' },
                        { n:'04', icon:'handshake',    title:'Site Visit',   desc:'Final qualified buyers' },
                      ].map(s => `
                      <div style="text-align:center;padding:.875rem .5rem;background:${s.active ? 'rgba(184,150,12,.1)' : 'rgba(255,255,255,.03)'};border:1px solid ${s.active ? 'rgba(184,150,12,.3)' : 'rgba(255,255,255,.06)'};">
                        <div style="width:28px;height:28px;background:${s.active ? 'var(--gold)' : 'rgba(255,255,255,.08)'};border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto .5rem;">
                          <i class="fas fa-${s.icon}" style="font-size:.55rem;color:${s.active ? '#fff' : 'rgba(255,255,255,.4)'}"></i>
                        </div>
                        <div style="font-size:.58rem;font-weight:700;letter-spacing:.05em;color:${s.active ? 'var(--gold)' : 'rgba(255,255,255,.45)'};margin-bottom:.2rem;">${s.title}</div>
                        <div style="font-size:.57rem;color:rgba(255,255,255,.3);">${s.desc}</div>
                      </div>`).join('')}
                    </div>
                  </div>

                  <!-- Advisory contact card -->
                  <div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);padding:1.25rem 1.75rem;width:100%;max-width:520px;">
                    <p style="font-size:.58rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.28);margin-bottom:.875rem;">Your Dedicated Advisory Contact</p>
                    <div style="display:flex;align-items:center;gap:1rem;flex-wrap:wrap;">
                      <div style="width:44px;height:44px;background:var(--ink-mid);border:1px solid rgba(184,150,12,.3);display:flex;align-items:center;justify-content:center;border-radius:50%;flex-shrink:0;">
                        <span style="font-family:'DM Serif Display',Georgia,serif;font-size:.85rem;color:var(--gold);" id="eoi-advisor-initials">AK</span>
                      </div>
                      <div style="flex:1;">
                        <div style="font-size:.9rem;color:#fff;font-weight:600;" id="eoi-advisor-name">Advisory Team</div>
                        <div style="font-size:.7rem;color:rgba(255,255,255,.4);">Transaction Advisory · India Gully</div>
                      </div>
                      <div style="display:flex;gap:.625rem;flex-wrap:wrap;">
                        <a id="eoi-advisor-phone-link" href="tel:+918988988988" style="display:inline-flex;align-items:center;gap:.4rem;background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);padding:.45rem .875rem;font-size:.72rem;color:rgba(255,255,255,.7);text-decoration:none;transition:all .2s;" onmouseover="this.style.borderColor='var(--gold)';this.style.color='var(--gold)'" onmouseout="this.style.borderColor='rgba(255,255,255,.12)';this.style.color='rgba(255,255,255,.7)'">
                          <i class="fas fa-phone" style="font-size:.6rem;color:var(--gold);"></i><span id="eoi-advisor-phone-text">Call</span>
                        </a>
                        <a id="eoi-advisor-wa-link" href="https://wa.me/918988988988?text=Hi%2C%20I%20have%20submitted%20an%20EOI%20for%20${encodeURIComponent(l.title)}" target="_blank" style="display:inline-flex;align-items:center;gap:.4rem;background:#25D366;border:1px solid #22c55e;padding:.45rem .875rem;font-size:.72rem;color:#fff;text-decoration:none;transition:background .2s;" onmouseover="this.style.background='#1eb659'" onmouseout="this.style.background='#25D366'">
                          <i class="fab fa-whatsapp" style="font-size:.75rem;"></i>WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>

                  <!-- CTA buttons -->
                  <div style="display:flex;gap:.875rem;flex-wrap:wrap;justify-content:center;width:100%;">
                    <a href="/listings" style="display:inline-flex;align-items:center;gap:.5rem;padding:.75rem 1.5rem;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.05);color:rgba(255,255,255,.65);text-decoration:none;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;transition:all .22s;" onmouseover="this.style.background='rgba(255,255,255,.1)';this.style.borderColor='rgba(255,255,255,.3)'" onmouseout="this.style.background='rgba(255,255,255,.05)';this.style.borderColor='rgba(255,255,255,.15)'">
                      <i class="fas fa-arrow-left" style="font-size:.62rem;"></i>More Mandates
                    </a>
                    <a href="/insights" style="display:inline-flex;align-items:center;gap:.5rem;padding:.75rem 1.5rem;background:var(--gold);color:#fff;text-decoration:none;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;transition:background .22s;" onmouseover="this.style.background='#a37a08'" onmouseout="this.style.background='var(--gold)'">
                      <i class="fas fa-newspaper" style="font-size:.62rem;"></i>Market Insights
                    </a>
                    <a href="/horeca/catalogue" style="display:inline-flex;align-items:center;gap:.5rem;padding:.75rem 1.5rem;border:1px solid rgba(184,150,12,.3);background:rgba(184,150,12,.07);color:rgba(255,255,255,.65);text-decoration:none;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;transition:all .22s;" onmouseover="this.style.background='rgba(184,150,12,.15)'" onmouseout="this.style.background='rgba(184,150,12,.07)'">
                      <i class="fas fa-utensils" style="font-size:.62rem;color:var(--gold);"></i>HORECA Catalogue
                    </a>
                  </div>
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
            style.textContent = '@keyframes pulse-ring{0%{transform:scale(1);opacity:.5}100%{transform:scale(1.35);opacity:0}}'
              + '@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}'
              + '@keyframes fadeSlideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}';
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
                mandateContactPhone: '${l.contactPhone || '+91 98108 89134'}',
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
              var advisorNameEl = document.getElementById('eoi-advisor-name');
              var advisorInitialsEl = document.getElementById('eoi-advisor-initials');
              var advisorPhoneLink = document.getElementById('eoi-advisor-phone-link');
              var advisorPhoneText = document.getElementById('eoi-advisor-phone-text');
              var advisorWaLink = document.getElementById('eoi-advisor-wa-link');

              if (formWrap) formWrap.style.display = 'none';
              if (panel) { panel.style.display = 'block'; panel.style.animation = 'fadeSlideUp .5s ease both'; }
              if (refEl) refEl.textContent = d.ref || 'IG-EOI-' + Date.now();
              if (tsEl) tsEl.textContent = 'Submitted: ' + new Date().toLocaleString('en-IN', {timeZone:'Asia/Kolkata',dateStyle:'medium',timeStyle:'short'}) + ' IST';
              if (mandateEl) mandateEl.textContent = '${l.title}';
              // Populate advisor details from listing data
              var aName = '${l.contactName || 'Arun Manikonda'}';
              var aPhone = '${l.contactPhone || '+91 98108 89134'}';
              var aEmail = '${l.contact || 'akm@indiagully.com'}';
              var initials = aName.split(' ').map(function(w){ return w[0]; }).join('').slice(0,2);
              if (advisorNameEl) advisorNameEl.textContent = aName + ', Transaction Advisory';
              if (advisorInitialsEl) advisorInitialsEl.textContent = initials;
              if (advisorPhoneLink) advisorPhoneLink.href = 'tel:' + aPhone.replace(/\\s/g,'');
              if (advisorPhoneText) advisorPhoneText.textContent = aPhone;
              var waPhone = aPhone.replace(/[^\\d]/g,'');
              if (advisorWaLink) advisorWaLink.href = 'https://wa.me/' + waPhone + '?text=Hi%20' + encodeURIComponent(aName.split(' ')[0]) + '%2C%20I%20have%20submitted%20an%20EOI%20for%20${encodeURIComponent(l.title)}%20(Ref%3A%20' + encodeURIComponent(d.ref||'') + ')';
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

        <!-- Social Proof: View Counter + Weekly Viewers Badge -->
        <div id="ig-social-proof" style="background:linear-gradient(135deg,rgba(184,150,12,.07),rgba(184,150,12,.02));border:1px solid rgba(184,150,12,.22);padding:.875rem 1.1rem;margin-bottom:1.25rem;display:flex;align-items:center;justify-content:space-between;gap:.75rem;">
          <div style="display:flex;align-items:center;gap:.55rem;">
            <div style="position:relative;width:28px;height:28px;flex-shrink:0;">
              <svg width="28" height="28" viewBox="0 0 28 28" style="transform:rotate(-90deg)">
                <circle cx="14" cy="14" r="11" fill="none" stroke="rgba(184,150,12,.15)" stroke-width="2.5"/>
                <circle id="ig-view-ring" cx="14" cy="14" r="11" fill="none" stroke="var(--gold)" stroke-width="2.5"
                  stroke-dasharray="69.11" stroke-dashoffset="69.11" stroke-linecap="round" style="transition:stroke-dashoffset 1.4s ease;"/>
              </svg>
              <i class="fas fa-eye" style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:.48rem;color:var(--gold);"></i>
            </div>
            <div>
              <div style="font-size:.72rem;font-weight:700;color:var(--ink);line-height:1.2;" id="ig-view-count">— </div>
              <div style="font-size:.58rem;color:var(--ink-muted);letter-spacing:.04em;">views this week</div>
            </div>
          </div>
          <div id="ig-viewer-badge" style="display:none;background:rgba(184,150,12,.12);border:1px solid rgba(184,150,12,.3);padding:.3rem .6rem;text-align:center;">
            <div style="font-size:.6rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--gold);" id="ig-viewer-count">—</div>
            <div style="font-size:.52rem;color:var(--ink-muted);margin-top:.1rem;">investors interested</div>
          </div>
        </div>

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
          <p style="font-size:.75rem;color:rgba(255,255,255,.45);line-height:1.65;margin-bottom:1.25rem;">Submit your Expression of Interest and receive the Information Memorandum within 24 hours.</p>
          <a href="#eoi-section" onclick="(function(){ var s=sessionStorage.getItem('ig_nda_${l.id}'); if(s&&JSON.parse(s).accepted){ document.getElementById('eoi-section').scrollIntoView({behavior:'smooth'}); } else { igScrollToNDA(); } })(); return false;" class="btn btn-g" style="width:100%;display:block;text-align:center;padding:.875rem;text-decoration:none;margin-bottom:.75rem;">
            <i class="fas fa-arrow-down" style="margin-right:.4rem;font-size:.7rem;"></i>Submit EOI
          </a>
          <!-- WhatsApp quick connect -->
          <a href="https://wa.me/918988988988?text=${encodeURIComponent('Hi, I am interested in ' + l.title + ' (' + l.value + ') — please share the Information Memorandum and schedule a call.')}" target="_blank" rel="noopener"
            style="display:flex;align-items:center;justify-content:center;gap:.5rem;padding:.65rem;font-size:.68rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;background:#25D366;color:#fff;text-decoration:none;transition:background .2s;margin-bottom:.75rem;"
            onmouseover="this.style.background='#1eb659'" onmouseout="this.style.background='#25D366'">
            <i class="fab fa-whatsapp" style="font-size:.8rem;"></i>WhatsApp Enquiry
          </a>
          <!-- Share row -->
          <div style="display:flex;justify-content:center;gap:.5rem;padding-top:.75rem;border-top:1px solid rgba(255,255,255,.07);">
            <span style="font-size:.58rem;color:rgba(255,255,255,.3);align-self:center;margin-right:.2rem;text-transform:uppercase;letter-spacing:.1em;">Share</span>
            <a href="https://twitter.com/intent/tweet?url=https://india-gully.pages.dev/listings/${l.id}&text=${encodeURIComponent(l.title + ' — Active Mandate, India Gully Advisory')}" target="_blank" rel="noopener" title="Share on X/Twitter"
               style="width:30px;height:30px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.6);text-decoration:none;transition:all .2s;"
               onmouseover="this.style.background='rgba(255,255,255,.12)';this.style.color='#fff'" onmouseout="this.style.background='rgba(255,255,255,.06)';this.style.color='rgba(255,255,255,.6)'">
              <i class="fab fa-x-twitter" style="font-size:.62rem;"></i>
            </a>
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://india-gully.pages.dev/listings/${l.id}" target="_blank" rel="noopener" title="Share on LinkedIn"
               style="width:30px;height:30px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.6);text-decoration:none;transition:all .2s;"
               onmouseover="this.style.background='#0A66C2';this.style.color='#fff'" onmouseout="this.style.background='rgba(255,255,255,.06)';this.style.color='rgba(255,255,255,.6)'">
              <i class="fab fa-linkedin-in" style="font-size:.62rem;"></i>
            </a>
            <a href="https://wa.me/?text=${encodeURIComponent(l.title + ' — Active Mandate https://india-gully.pages.dev/listings/' + l.id)}" target="_blank" rel="noopener" title="Share on WhatsApp"
               style="width:30px;height:30px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.6);text-decoration:none;transition:all .2s;"
               onmouseover="this.style.background='#25D366';this.style.color='#fff'" onmouseout="this.style.background='rgba(255,255,255,.06)';this.style.color='rgba(255,255,255,.6)'">
              <i class="fab fa-whatsapp" style="font-size:.62rem;"></i>
            </a>
            <button onclick="navigator.clipboard&&navigator.clipboard.writeText('https://india-gully.pages.dev/listings/${l.id}').then(function(){igToast('Link copied!','success')}).catch(function(){})" title="Copy link"
               style="width:30px;height:30px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.6);cursor:pointer;transition:all .2s;"
               onmouseover="this.style.background='rgba(255,255,255,.12)';this.style.color='#fff'" onmouseout="this.style.background='rgba(255,255,255,.06)';this.style.color='rgba(255,255,255,.6)'">
              <i class="fas fa-link" style="font-size:.62rem;"></i>
            </button>
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
        const xHasImg = x.images && x.images.length > 0
        return `
      <a href="/listings/${x.id}" style="display:block;background:var(--parch);border:1px solid var(--border);overflow:hidden;transition:all .25s;text-decoration:none;"
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
        // Ensure content is unlocked on page load (DOMContentLoaded fired by now)
        var eoiLock  = document.getElementById('eoi-lock-notice');
        var eoiSec   = document.getElementById('eoi-section');
        var specLock = document.getElementById('spec-lock-overlay');
        var teaser   = document.getElementById('overview-teaser');
        var full     = document.getElementById('overview-full');
        var oLock    = document.getElementById('overview-lock');
        if (eoiLock)  eoiLock.style.display  = 'none';
        if (eoiSec)   eoiSec.style.display   = 'block';
        if (specLock) specLock.style.display  = 'none';
        if (teaser)   teaser.style.display    = 'none';
        if (full)     full.style.display      = 'block';
        if (oLock)    oLock.style.display     = 'none';
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

  // ── Phase 11B: Track page view ─────────────────────────────────────────
  try {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'pageview', page: '/listings/${l.id}', ref: document.referrer })
    }).catch(function(){});
  } catch(e) {}

  // ── Phase 15C: Social proof view counter + investor badge ─────────────
  (function(){
    var seed = '${l.id}'.split('').reduce(function(a,c){ return a + c.charCodeAt(0); }, 0);
    var rng  = function(min, max){ seed = (seed * 1664525 + 1013904223) & 0xffffffff; return min + (Math.abs(seed) % (max - min + 1)); };
    var views    = rng(42, 210);
    var interest = rng(3, 18);
    var ring     = document.getElementById('ig-view-ring');
    var vc       = document.getElementById('ig-view-count');
    var vb       = document.getElementById('ig-viewer-badge');
    var vbc      = document.getElementById('ig-viewer-count');
    // Animate ring after 600ms
    setTimeout(function(){
      if(ring){
        var circ = 69.11;
        var pct  = Math.min(views / 250, 0.92);
        ring.style.strokeDashoffset = String(circ - circ * pct);
      }
      if(vc){
        var target = views;
        var start  = 0;
        var dur    = 1200;
        var t0     = performance.now();
        var step   = function(now){
          var p = Math.min((now - t0) / dur, 1);
          vc.textContent = String(Math.round(p * target));
          if(p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
      if(vb && vbc){ vb.style.display = 'block'; vbc.textContent = String(interest); }
    }, 600);
  })();

  // ── Phase 11A: Reading progress bar ───────────────────────────────────
  var progBar = document.getElementById('detail-progress');
  if (progBar) {
    window.addEventListener('scroll', function() {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
      progBar.style.width = pct + '%';
    }, { passive: true });
  }

  // ── Phase 11A: Lightbox ────────────────────────────────────────────────
  window.igLightboxOpen = function(images, startIdx) {
    var cur = startIdx || 0;
    var total = images.length;
    var lb = document.getElementById('ig-lightbox');
    if (!lb) return;
    var lbImg = document.getElementById('ig-lb-img');
    var lbCount = document.getElementById('ig-lb-count');
    var lbCaption = document.getElementById('ig-lb-caption');
    function gotoSlide(n) {
      cur = ((n % total) + total) % total;
      if (lbImg) { lbImg.style.opacity = '0'; setTimeout(function(){ lbImg.src = images[cur]; lbImg.style.opacity = '1'; }, 180); }
      if (lbCount) lbCount.textContent = (cur+1) + ' / ' + total;
      if (lbCaption) lbCaption.textContent = '${l.title} · Image ' + (cur+1);
    }
    gotoSlide(cur);
    lb.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    lb.onclick = function(e){ if(e.target===lb) window.igLightboxClose(); };
    document.getElementById('ig-lb-prev').onclick = function(){ gotoSlide(cur-1); };
    document.getElementById('ig-lb-next').onclick = function(){ gotoSlide(cur+1); };
    var _kh = function(e){
      if(e.key==='ArrowLeft') gotoSlide(cur-1);
      else if(e.key==='ArrowRight') gotoSlide(cur+1);
      else if(e.key==='Escape') window.igLightboxClose();
    };
    document.addEventListener('keydown', _kh);
    lb._removeKey = function(){ document.removeEventListener('keydown', _kh); };
    // Touch swipe
    var lbTx = 0;
    lb.addEventListener('touchstart', function(e){ lbTx = e.touches[0].clientX; }, {passive:true});
    lb.addEventListener('touchend', function(e){ var dx = e.changedTouches[0].clientX - lbTx; if(Math.abs(dx)>40) gotoSlide(cur+(dx<0?1:-1)); }, {passive:true});
  };
  window.igLightboxClose = function() {
    var lb = document.getElementById('ig-lightbox');
    if (lb) lb.style.display = 'none';
    document.body.style.overflow = '';
    if (lb && lb._removeKey) lb._removeKey();
  };
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
