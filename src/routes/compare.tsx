import { Hono } from 'hono'
import { layout } from '../lib/layout'
import { LISTINGS } from '../lib/constants'

const app = new Hono()

// Compact listing data for compare tool (no longDesc, no images)
const COMPARE_DATA = (LISTINGS as any[]).map(l => ({
  id:           l.id,
  title:        l.title,
  subtitle:     l.subtitle,
  location:     l.locationShort || l.location,
  sector:       l.sector,
  sectorColor:  l.sectorColor || '#B8960C',
  value:        l.value,
  valueUSD:     l.valueUSD || '',
  status:       l.status,
  statusType:   l.statusType,
  mandateType:  l.mandateType || '—',
  tags:         (l.tags || []).slice(0, 4),
  highlights:   (l.highlights || []).slice(0, 4),
  specs:        l.specs || {},
  nda:          !!l.nda,
  contact:      l.contactName || 'India Gully Team',
}))

app.get('/', (c) => {
  // Pre-selected IDs from query params e.g. ?a=hotel-rajshree-chandigarh&b=...
  const idA = c.req.query('a') || ''
  const idB = c.req.query('b') || ''
  const idC = c.req.query('c') || ''

  const listingJSON = JSON.stringify(COMPARE_DATA)

  const html = `
<!-- WhatsApp Float -->
<a href="https://wa.me/918988988988?text=Hi%20India%20Gully%2C%20I%20would%20like%20to%20compare%20mandates%20and%20discuss%20an%20investment."
   class="wa-float" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
</a>

<!-- ── HERO ──────────────────────────────────────────────────────────── -->
<section class="hero-dk" style="min-height:32vh;display:flex;align-items:center;padding:calc(5.5rem - var(--nav-h)) 0 2.5rem;">
  <div class="container" style="max-width:1200px;margin:0 auto;padding:0 1.5rem;">
    <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1rem;">
      <span style="display:inline-flex;align-items:center;gap:.4rem;background:rgba(212,174,42,.12);border:1px solid rgba(212,174,42,.3);border-radius:100px;padding:.3rem .9rem;font-size:.78rem;font-family:'DM Sans',sans-serif;color:var(--gold);letter-spacing:.08em;text-transform:uppercase;">
        ⚖️ Mandate Comparison
      </span>
      <span style="display:inline-flex;align-items:center;gap:.4rem;background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.2);border-radius:100px;padding:.3rem .9rem;font-size:.78rem;font-family:'DM Sans',sans-serif;color:#4ade80;letter-spacing:.08em;text-transform:uppercase;">
        Compare up to 3 mandates
      </span>
    </div>
    <h1 style="font-family:'DM Serif Display',Georgia,serif;font-size:clamp(2rem,4.5vw,3.4rem);color:#fff;line-height:1.1;margin-bottom:.85rem;">
      Side-by-Side<br>
      <span style="background:linear-gradient(135deg,var(--gold),#e8c84a);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">
        Mandate Analysis
      </span>
    </h1>
    <p style="color:rgba(255,255,255,.6);font-size:clamp(.9rem,1.5vw,1.1rem);max-width:520px;line-height:1.6;margin:0;font-family:'DM Sans',sans-serif;">
      Select up to three active mandates to compare side-by-side on value, sector, 
      location, highlights, and specifications. NDA required for full details.
    </p>
  </div>
</section>

<!-- ── SELECTOR BAR ─────────────────────────────────────────────────── -->
<section style="background:rgba(255,255,255,.025);border-top:1px solid rgba(255,255,255,.07);border-bottom:1px solid rgba(255,255,255,.07);padding:1.5rem 0;">
  <div class="container" style="max-width:1200px;margin:0 auto;padding:0 1.5rem;">
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;" id="selectorGrid">
      ${['A','B','C'].map((slot, i) => `
      <div>
        <div style="font-size:.7rem;font-family:'DM Sans',sans-serif;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:.5rem;">
          Mandate ${slot}
        </div>
        <select id="sel${slot}" onchange="updateCompare()" class="cmp-sel">
          <option value="">— Select a mandate —</option>
          ${COMPARE_DATA.map(l => `<option value="${l.id}" ${[idA,idB,idC][i] === l.id ? 'selected' : ''}>${l.title} (${l.value})</option>`).join('')}
        </select>
      </div>`).join('')}
    </div>
    <div style="margin-top:1rem;display:flex;gap:.75rem;flex-wrap:wrap;align-items:center;">
      <button onclick="clearAll()" class="btn btn-sm btn-dko">✕ Clear All</button>
      <button onclick="shareCompare()" class="btn btn-sm btn-dko">🔗 Share This Comparison</button>
      <span id="cmpCount" style="font-size:.78rem;color:rgba(255,255,255,.4);font-family:'DM Sans',sans-serif;"></span>
    </div>
  </div>
</section>

<!-- ── COMPARE TABLE ─────────────────────────────────────────────────── -->
<section style="background:var(--bg-dk);padding:2.5rem 0 5rem;">
  <div class="container" style="max-width:1200px;margin:0 auto;padding:0 1.5rem;">

    <!-- Empty state -->
    <div id="emptyState" style="text-align:center;padding:5rem 1rem;">
      <div style="font-size:3rem;margin-bottom:1rem;">⚖️</div>
      <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.8rem;color:#fff;margin-bottom:.75rem;">Select Mandates to Compare</h2>
      <p style="color:rgba(255,255,255,.5);font-size:.95rem;font-family:'DM Sans',sans-serif;max-width:440px;margin:0 auto 2rem;line-height:1.6;">
        Choose 2 or 3 mandates from the dropdowns above to see a detailed side-by-side analysis.
      </p>
      <a href="/listings" class="btn btn-g">Browse All Mandates →</a>
    </div>

    <!-- Comparison grid (shown when ≥1 selected) -->
    <div id="compareOutput" style="display:none;">

      <!-- Header cards row -->
      <div id="cmpHeaders" class="cmp-grid"></div>

      <!-- Metrics rows -->
      <div id="cmpRows"></div>

      <!-- CTA row -->
      <div id="cmpCTA" style="margin-top:2rem;padding:1.5rem;background:linear-gradient(135deg,rgba(212,174,42,.08),rgba(212,174,42,.03));border:1px solid rgba(212,174,42,.2);border-radius:14px;text-align:center;">
        <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.15rem;color:#fff;margin-bottom:.5rem;">Ready to proceed with a mandate?</div>
        <p style="color:rgba(255,255,255,.55);font-size:.85rem;font-family:'DM Sans',sans-serif;margin-bottom:1rem;">India Gully's team will walk you through the NDA process and full mandate details.</p>
        <div style="display:flex;gap:.75rem;justify-content:center;flex-wrap:wrap;">
          <a href="/contact#enquiry" class="btn btn-g">Submit Enquiry</a>
          <a href="/listings" class="btn btn-dko">View All Mandates</a>
        </div>
      </div>

    </div>
  </div>
</section>

<style>
.cmp-sel {
  width:100%;background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.1);
  border-radius:10px;padding:.65rem .9rem;font-size:.88rem;font-family:'DM Sans',sans-serif;
  color:#fff;outline:none;cursor:pointer;transition:border-color .2s;
}
.cmp-sel:focus { border-color:var(--gold); }
.cmp-sel option { background:#1a1a2e;color:#fff; }
.cmp-grid { display:grid; gap:1rem; }
.cmp-grid.cols-1 { grid-template-columns:1fr; }
.cmp-grid.cols-2 { grid-template-columns:repeat(2,1fr); }
.cmp-grid.cols-3 { grid-template-columns:repeat(3,1fr); }
@media(max-width:700px){ .cmp-grid.cols-2,.cmp-grid.cols-3 { grid-template-columns:1fr; } }
.cmp-header-card {
  background:rgba(255,255,255,.03);border:1.5px solid rgba(255,255,255,.09);
  border-radius:14px;padding:1.5rem;
}
.cmp-header-card.winner { border-color:rgba(212,174,42,.4); background:rgba(212,174,42,.05); }
.cmp-row {
  display:grid;gap:0;margin-bottom:.5rem;
  border:1px solid rgba(255,255,255,.07);border-radius:10px;overflow:hidden;
}
.cmp-row-label {
  background:rgba(255,255,255,.04);padding:.7rem 1rem;
  font-size:.72rem;font-weight:700;color:rgba(255,255,255,.5);font-family:'DM Sans',sans-serif;
  letter-spacing:.08em;text-transform:uppercase;border-bottom:1px solid rgba(255,255,255,.07);
}
.cmp-row-cells { display:grid; gap:0; }
.cmp-row-cells.cols-1 { grid-template-columns:1fr; }
.cmp-row-cells.cols-2 { grid-template-columns:repeat(2,1fr); }
.cmp-row-cells.cols-3 { grid-template-columns:repeat(3,1fr); }
.cmp-cell {
  padding:.75rem 1rem;font-size:.88rem;color:rgba(255,255,255,.75);
  font-family:'DM Sans',sans-serif;border-right:1px solid rgba(255,255,255,.05);
}
.cmp-cell:last-child { border-right:none; }
.cmp-cell.highlight { color:var(--gold);font-weight:700; }
.cmp-cell.best { background:rgba(212,174,42,.07); }
@media(max-width:700px){
  .cmp-row-cells.cols-2,.cmp-row-cells.cols-3 { grid-template-columns:1fr; }
}
</style>

<script>
const LISTINGS_DATA = ${listingJSON};
const PRE = {a:'${idA}',b:'${idB}',c:'${idC}'};

function getSelected() {
  return ['A','B','C']
    .map(s => document.getElementById('sel'+s)?.value)
    .filter(Boolean)
    .map(id => LISTINGS_DATA.find(l => l.id === id))
    .filter(Boolean);
}

function fmtVal(v) {
  if(!v) return '<span style="color:rgba(255,255,255,.25);">—</span>';
  return v;
}

function statusColor(type) {
  if(type === 'active')      return '#4ade80';
  if(type === 'negotiation') return '#fbbf24';
  return '#93c5fd';
}

function updateCompare() {
  const selected = getSelected();
  const cols = selected.length;

  const empty = document.getElementById('emptyState');
  const output = document.getElementById('compareOutput');
  const countEl = document.getElementById('cmpCount');

  if(cols === 0) {
    empty.style.display = 'block';
    output.style.display = 'none';
    countEl.textContent = '';
    return;
  }
  empty.style.display = 'none';
  output.style.display = 'block';
  countEl.textContent = cols + ' mandate' + (cols > 1 ? 's' : '') + ' selected';

  const colClass = 'cols-' + cols;

  // ── Header cards
  const hdrs = document.getElementById('cmpHeaders');
  hdrs.className = 'cmp-grid ' + colClass;
  hdrs.innerHTML = selected.map((l, i) => \`
    <div class="cmp-header-card \${i===0 && cols>1 ? 'winner':''}" style="border-top:3px solid \${l.sectorColor||'var(--gold)'};">
      <div style="font-size:.68rem;font-family:'DM Sans',sans-serif;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:.5rem;">
        Mandate \${String.fromCharCode(65+i)}
      </div>
      <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.05rem;color:#fff;line-height:1.3;margin-bottom:.4rem;">\${l.title}</div>
      <div style="font-size:.78rem;color:rgba(255,255,255,.5);font-family:'DM Sans',sans-serif;margin-bottom:.75rem;">\${l.subtitle}</div>
      <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.7rem;color:var(--gold);margin-bottom:.3rem;">\${l.value}</div>
      \${l.valueUSD ? \`<div style="font-size:.72rem;color:rgba(255,255,255,.4);font-family:'DM Sans',sans-serif;">\${l.valueUSD}</div>\` : ''}
      <div style="margin-top:.75rem;display:flex;flex-wrap:wrap;gap:.35rem;">
        \${l.tags.map(t=>\`<span style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:4px;padding:.15rem .45rem;font-size:.66rem;font-family:'DM Sans',sans-serif;color:rgba(255,255,255,.5);">\${t}</span>\`).join('')}
      </div>
      <div style="margin-top:1rem;display:flex;gap:.5rem;">
        <a href="/listings/\${l.id}" style="flex:1;text-align:center;padding:.45rem;background:rgba(212,174,42,.1);border:1px solid rgba(212,174,42,.25);border-radius:7px;font-size:.75rem;font-family:'DM Sans',sans-serif;color:var(--gold);text-decoration:none;font-weight:600;">View Mandate</a>
        <a href="/contact?mandate=\${l.id}" style="flex:1;text-align:center;padding:.45rem;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:7px;font-size:.75rem;font-family:'DM Sans',sans-serif;color:rgba(255,255,255,.6);text-decoration:none;">Enquire</a>
      </div>
    </div>
  \`).join('');

  // ── Data rows
  const rows = [
    { label: 'Location',      key: 'location' },
    { label: 'Sector',        key: 'sector' },
    { label: 'Mandate Type',  key: 'mandateType' },
    { label: 'Status',        key: 'status', color: true },
    { label: 'NDA Required',  key: 'nda', bool: true },
    { label: 'IG Contact',    key: 'contact' },
  ];

  // Highlight rows
  const specs1 = Object.entries(selected[0].specs || {}).slice(0,8);

  const rowsEl = document.getElementById('cmpRows');
  let html = '';

  // Standard rows
  rows.forEach(r => {
    html += \`<div class="cmp-row">
      <div class="cmp-row-label">\${r.label}</div>
      <div class="cmp-row-cells \${colClass}">\${
        selected.map(l => {
          let val = l[r.key];
          if(r.bool) val = val ? '✅ Yes' : '❌ No';
          if(r.color && l.statusType) {
            val = \`<span style="color:\${statusColor(l.statusType)};">\${val}</span>\`;
          }
          return \`<div class="cmp-cell">\${fmtVal(val)}</div>\`;
        }).join('')
      }</div>
    </div>\`;
  });

  // Key Highlights grid
  html += \`<div style="margin:1.25rem 0 .5rem;font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.4);font-family:'DM Sans',sans-serif;">Key Highlights</div>\`;
  html += \`<div class="cmp-grid \${colClass}" style="margin-bottom:1rem;">\${
    selected.map(l => \`
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:.5rem;">
        \${l.highlights.map(h => \`
          <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.07);border-radius:8px;padding:.6rem .75rem;">
            <div style="font-size:.88rem;font-weight:700;color:var(--gold);font-family:'DM Sans',sans-serif;">\${h.value}</div>
            <div style="font-size:.68rem;color:rgba(255,255,255,.45);font-family:'DM Sans',sans-serif;margin-top:.15rem;">\${h.label}</div>
          </div>
        \`).join('')}
      </div>
    \`).join('')}
  </div>\`;

  // Spec rows (from first listing's keys, match across others)
  if(cols >= 2 && specs1.length > 0) {
    html += \`<div style="margin:1.25rem 0 .5rem;font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.4);font-family:'DM Sans',sans-serif;">Specifications</div>\`;
    specs1.forEach(([key]) => {
      const vals = selected.map(l => (l.specs || {})[key] || '—');
      html += \`<div class="cmp-row">
        <div class="cmp-row-label">\${key}</div>
        <div class="cmp-row-cells \${colClass}">\${
          vals.map((v,i) => \`<div class="cmp-cell \${i===0?'best':''}">\${fmtVal(v)}</div>\`).join('')
        }</div>
      </div>\`;
    });
  }

  rowsEl.innerHTML = html;

  // Update URL
  const ids = selected.map(l => l.id);
  const params = new URLSearchParams();
  ['a','b','c'].forEach((p,i) => { if(ids[i]) params.set(p, ids[i]); });
  window.history.replaceState({}, '', '/compare?' + params.toString());
}

function clearAll() {
  ['A','B','C'].forEach(s => { document.getElementById('sel'+s).value = ''; });
  updateCompare();
}

function shareCompare() {
  navigator.clipboard.writeText(window.location.href)
    .then(() => alert('Comparison link copied to clipboard!'))
    .catch(() => prompt('Copy this link:', window.location.href));
}

// Init on load
updateCompare();
</script>
`
  return c.html(layout('Mandate Comparison Tool', html, {
    description: 'Compare up to 3 India Gully active mandates side-by-side. Analyse location, sector, value, highlights and specifications in one view.',
    canonical: '/compare',
  }))
})

export default app
