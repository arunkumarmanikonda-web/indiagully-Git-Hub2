import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

app.get('/', (c) => {
  const html = `
<!-- ── VALUATION HERO ───────────────────────────────────────────────── -->
<section class="hero-dk" style="min-height:38vh;display:flex;align-items:center;padding:calc(6rem - var(--nav-h)) 0 3rem;">
  <div class="container" style="max-width:1100px;margin:0 auto;padding:0 1.5rem;">
    <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1.25rem;">
      <span style="display:inline-flex;align-items:center;gap:.4rem;background:rgba(212,174,42,.12);border:1px solid rgba(212,174,42,.3);border-radius:100px;padding:.3rem .9rem;font-size:.78rem;font-family:'DM Sans',sans-serif;color:var(--gold);letter-spacing:.08em;text-transform:uppercase;">
        <span style="width:6px;height:6px;border-radius:50%;background:var(--gold);animation:pulse 2s infinite;"></span>
        Free Tool · Advisory Grade
      </span>
    </div>
    <h1 style="font-family:'DM Serif Display',Georgia,serif;font-size:clamp(2.2rem,5vw,3.8rem);color:#fff;line-height:1.08;margin-bottom:1rem;">
      Property Valuation<br>
      <span style="background:linear-gradient(135deg,var(--gold),#e8c84a);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">
        Calculator
      </span>
    </h1>
    <p style="color:rgba(255,255,255,.65);font-size:clamp(1rem,1.6vw,1.18rem);max-width:540px;line-height:1.6;margin-bottom:0;font-family:'DM Sans',sans-serif;">
      Three industry-standard methodologies in one tool — Income Capitalisation, 
      Discounted Cash Flow, and Revenue-Based valuation. Built on India Gully's 
      active advisory intelligence across ₹1,165 Cr+ of mandates.
    </p>
  </div>
</section>

<!-- ── METHODOLOGY TABS ─────────────────────────────────────────────── -->
<section style="background:#0c0c18;padding:3rem 0 5rem;">
  <div class="container" style="max-width:1100px;margin:0 auto;padding:0 1.5rem;">

    <!-- Method Switcher -->
    <div style="display:flex;gap:.75rem;margin-bottom:2.5rem;flex-wrap:wrap;">
      <button id="tab-cap" onclick="switchTab('cap')"
        class="val-tab active"
        style="background:rgba(212,174,42,.12);border:1.5px solid var(--gold);color:var(--gold);">
        📊 Income Capitalisation
      </button>
      <button id="tab-dcf" onclick="switchTab('dcf')"
        class="val-tab"
        style="background:rgba(255,255,255,.04);border:1.5px solid rgba(255,255,255,.12);color:rgba(255,255,255,.6);">
        📈 Discounted Cash Flow
      </button>
      <button id="tab-rev" onclick="switchTab('rev')"
        class="val-tab"
        style="background:rgba(255,255,255,.04);border:1.5px solid rgba(255,255,255,.12);color:rgba(255,255,255,.6);">
        🏨 Revenue Method
      </button>
    </div>

    <div class="val-grid">

      <!-- ── LEFT: CALCULATORS ──────────────────────────────────────── -->
      <div>

        <!-- Income Capitalisation -->
        <div id="panel-cap" class="val-card">
          <h2 class="val-card-title">Income Capitalisation Method</h2>
          <p class="val-card-sub">Ideal for stabilised income-producing assets: commercial, retail, and operating hotels with a track record.</p>
          <div class="val-form-grid">
            <div class="val-field">
              <label>Net Operating Income (₹ Lakhs / yr)</label>
              <input type="number" id="cap-noi" value="120" min="0" step="5" class="val-input" oninput="calcCap()">
            </div>
            <div class="val-field">
              <label>Capitalisation Rate (%)</label>
              <input type="number" id="cap-rate" value="8.5" min="1" max="20" step="0.25" class="val-input" oninput="calcCap()">
            </div>
            <div class="val-field">
              <label>Vacancy Allowance (%)</label>
              <input type="number" id="cap-vac" value="8" min="0" max="40" step="1" class="val-input" oninput="calcCap()">
            </div>
            <div class="val-field">
              <label>Capital Expenditure Reserve (%)</label>
              <input type="number" id="cap-capex" value="3" min="0" max="15" step="0.5" class="val-input" oninput="calcCap()">
            </div>
          </div>

          <!-- Cap Rate Benchmarks -->
          <div style="margin:1.25rem 0;padding:1rem;background:rgba(212,174,42,.06);border:1px solid rgba(212,174,42,.15);border-radius:10px;">
            <div style="font-size:.72rem;font-family:'DM Sans',sans-serif;color:var(--gold);font-weight:600;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.7rem;">
              India Gully Cap Rate Benchmarks (2026)
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:.5rem;">
              ${[
                ['Grade-A Commercial', '7.0–8.5%'],
                ['Branded Hotel', '8.5–10.5%'],
                ['Shopping Mall', '8.0–9.5%'],
                ['Service Apartment', '9.0–11.0%'],
                ['Tier 2 Hotel', '10.0–12.5%'],
                ['Heritage Resort', '9.5–11.5%'],
              ].map(([label, rate]) => `
              <div style="background:rgba(255,255,255,.04);border-radius:6px;padding:.4rem .6rem;">
                <div style="font-size:.7rem;color:rgba(255,255,255,.5);font-family:'DM Sans',sans-serif;">${label}</div>
                <div style="font-size:.82rem;font-weight:600;color:#e8c84a;font-family:'DM Sans',sans-serif;">${rate}</div>
              </div>`).join('')}
            </div>
          </div>

          <div id="cap-result" class="val-result" style="display:none;"></div>
          <button onclick="calcCap()" class="btn btn-g" style="width:100%;margin-top:.5rem;">Calculate Valuation</button>
        </div>

        <!-- DCF Panel -->
        <div id="panel-dcf" class="val-card" style="display:none;">
          <h2 class="val-card-title">Discounted Cash Flow (DCF)</h2>
          <p class="val-card-sub">For development projects, pre-stabilised assets, or where detailed cash flow projection is needed. Standard 10-year hold period.</p>
          <div class="val-form-grid">
            <div class="val-field">
              <label>Year 1 Net Operating Income (₹ Lakhs)</label>
              <input type="number" id="dcf-noi" value="80" min="0" step="5" class="val-input" oninput="calcDCF()">
            </div>
            <div class="val-field">
              <label>Annual NOI Growth Rate (%)</label>
              <input type="number" id="dcf-growth" value="6" min="0" max="20" step="0.5" class="val-input" oninput="calcDCF()">
            </div>
            <div class="val-field">
              <label>Discount Rate / WACC (%)</label>
              <input type="number" id="dcf-discount" value="13" min="5" max="30" step="0.5" class="val-input" oninput="calcDCF()">
            </div>
            <div class="val-field">
              <label>Terminal Cap Rate (%)</label>
              <input type="number" id="dcf-termcap" value="9.5" min="3" max="20" step="0.25" class="val-input" oninput="calcDCF()">
            </div>
          </div>

          <!-- WACC Benchmarks -->
          <div style="margin:1.25rem 0;padding:1rem;background:rgba(26,58,107,.12);border:1px solid rgba(26,58,107,.25);border-radius:10px;">
            <div style="font-size:.72rem;font-family:'DM Sans',sans-serif;color:#5b8def;font-weight:600;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.7rem;">
              Typical Discount Rates (India Real Estate, 2026)
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:.5rem;">
              ${[
                ['Institutional / REIT', '11–13%'],
                ['PE Real Estate Fund', '13–16%'],
                ['Family Office', '14–18%'],
                ['Promoter Equity', '16–22%'],
                ['NRI Investor', '13–17%'],
                ['JV / Platform', '12–15%'],
              ].map(([label, rate]) => `
              <div style="background:rgba(255,255,255,.04);border-radius:6px;padding:.4rem .6rem;">
                <div style="font-size:.7rem;color:rgba(255,255,255,.5);font-family:'DM Sans',sans-serif;">${label}</div>
                <div style="font-size:.82rem;font-weight:600;color:#5b8def;font-family:'DM Sans',sans-serif;">${rate}</div>
              </div>`).join('')}
            </div>
          </div>

          <div id="dcf-result" class="val-result" style="display:none;"></div>
          <button onclick="calcDCF()" class="btn btn-g" style="width:100%;margin-top:.5rem;">Calculate DCF Value</button>
        </div>

        <!-- Revenue Method Panel -->
        <div id="panel-rev" class="val-card" style="display:none;">
          <h2 class="val-card-title">Revenue Method (Hotels &amp; F&amp;B)</h2>
          <p class="val-card-sub">Specifically designed for operating hotels and restaurant/F&B businesses. Uses Gross Revenue Multiplier (GRM) and EBITDA multiple approaches.</p>
          <div class="val-form-grid">
            <div class="val-field">
              <label>Total Keys / Rooms</label>
              <input type="number" id="rev-keys" value="41" min="1" step="1" class="val-input" oninput="calcRev()">
            </div>
            <div class="val-field">
              <label>Average Daily Rate — ADR (₹)</label>
              <input type="number" id="rev-adr" value="4800" min="500" step="100" class="val-input" oninput="calcRev()">
            </div>
            <div class="val-field">
              <label>Annual Occupancy Rate (%)</label>
              <input type="number" id="rev-occ" value="72" min="20" max="100" step="1" class="val-input" oninput="calcRev()">
            </div>
            <div class="val-field">
              <label>F&amp;B Revenue as % of Room Revenue</label>
              <input type="number" id="rev-fnb" value="35" min="0" max="150" step="5" class="val-input" oninput="calcRev()">
            </div>
            <div class="val-field">
              <label>EBITDA Margin (%)</label>
              <input type="number" id="rev-ebitda" value="28" min="5" max="60" step="1" class="val-input" oninput="calcRev()">
            </div>
            <div class="val-field">
              <label>EBITDA Multiple (×)</label>
              <input type="number" id="rev-mult" value="8" min="3" max="20" step="0.5" class="val-input" oninput="calcRev()">
            </div>
          </div>

          <!-- Hotel Benchmarks -->
          <div style="margin:1.25rem 0;padding:1rem;background:rgba(34,94,56,.12);border:1px solid rgba(34,94,56,.3);border-radius:10px;">
            <div style="font-size:.72rem;font-family:'DM Sans',sans-serif;color:#4caf50;font-weight:600;letter-spacing:.08em;text-transform:uppercase;margin-bottom:.7rem;">
              India Hotel EBITDA Multiple Benchmarks (2026)
            </div>
            <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:.5rem;">
              ${[
                ['Luxury (5-star)', '12–16×'],
                ['Upper-Upscale (4-star)', '9–12×'],
                ['Upscale (Branded)', '7–10×'],
                ['Mid-Scale', '6–8×'],
                ['Economy', '5–7×'],
                ['Boutique / Heritage', '8–12×'],
              ].map(([label, rate]) => `
              <div style="background:rgba(255,255,255,.04);border-radius:6px;padding:.4rem .6rem;">
                <div style="font-size:.7rem;color:rgba(255,255,255,.5);font-family:'DM Sans',sans-serif;">${label}</div>
                <div style="font-size:.82rem;font-weight:600;color:#4caf50;font-family:'DM Sans',sans-serif;">${rate}</div>
              </div>`).join('')}
            </div>
          </div>

          <div id="rev-result" class="val-result" style="display:none;"></div>
          <button onclick="calcRev()" class="btn btn-g" style="width:100%;margin-top:.5rem;">Calculate Hotel Value</button>
        </div>

      </div><!-- end left col -->

      <!-- ── RIGHT: ADVISORY PANEL ──────────────────────────────────── -->
      <div>

        <!-- Advisory CTA -->
        <div class="val-advisory" style="background:linear-gradient(145deg,rgba(212,174,42,.1),rgba(212,174,42,.03));border:1.5px solid rgba(212,174,42,.25);border-radius:16px;padding:1.75rem;margin-bottom:1.5rem;">
          <div style="display:flex;align-items:center;gap:.6rem;margin-bottom:1rem;">
            <span style="font-size:1.6rem;">🏛️</span>
            <div>
              <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:#fff;">Expert Valuation Advisory</div>
              <div style="font-size:.78rem;color:rgba(255,255,255,.5);font-family:'DM Sans',sans-serif;">India Gully Transaction Advisory</div>
            </div>
          </div>
          <p style="color:rgba(255,255,255,.65);font-size:.88rem;font-family:'DM Sans',sans-serif;line-height:1.6;margin-bottom:1.25rem;">
            This calculator provides indicative valuations. For formal valuation opinions, 
            transaction advisory, or institutional-grade reports, engage India Gully's 
            advisory team — active across ₹1,165 Cr+ of live mandates.
          </p>
          <a href="/contact#enquiry" class="btn btn-g" style="display:block;text-align:center;text-decoration:none;margin-bottom:.6rem;">
            Request Valuation Advisory
          </a>
          <a href="/listings" style="display:block;text-align:center;text-decoration:none;border:1.5px solid rgba(255,255,255,.25);color:rgba(255,255,255,.75);padding:.65rem 1.5rem;font-size:.82rem;font-weight:600;letter-spacing:.06em;font-family:'DM Sans',sans-serif;transition:all .2s;" onmouseover="this.style.background='rgba(255,255,255,.08)';this.style.color='#fff'" onmouseout="this.style.background='transparent';this.style.color='rgba(255,255,255,.75)'">
            View Active Mandates
          </a>
        </div>

        <!-- Quick Reference: Key Definitions -->
        <div class="val-card" style="margin-bottom:1.5rem;">
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1rem;color:#fff;margin-bottom:1rem;">Key Definitions</h3>
          ${[
            ['NOI', 'Net Operating Income — gross revenue minus operating expenses, before debt service and depreciation.'],
            ['Cap Rate', 'Capitalisation Rate — NOI divided by property value. Lower cap rates indicate premium pricing / lower risk.'],
            ['WACC', 'Weighted Average Cost of Capital — blended cost of equity and debt, used as DCF discount rate.'],
            ['RevPAR', 'Revenue Per Available Room — ADR × Occupancy. The primary hotel performance metric.'],
            ['EBITDA', 'Earnings Before Interest, Tax, Depreciation & Amortisation — operating profit before non-cash charges.'],
            ['GRM', 'Gross Revenue Multiplier — property value divided by gross annual revenue.'],
          ].map(([term, def]) => `
          <div style="border-bottom:1px solid rgba(255,255,255,.06);padding:.75rem 0;display:grid;grid-template-columns:80px 1fr;gap:.75rem;align-items:start;">
            <span style="font-weight:700;font-size:.82rem;color:var(--gold);font-family:'DM Sans',sans-serif;">${term}</span>
            <span style="font-size:.82rem;color:rgba(255,255,255,.6);font-family:'DM Sans',sans-serif;line-height:1.5;">${def}</span>
          </div>`).join('')}
        </div>

        <!-- Disclaimer -->
        <div style="background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:1rem;font-size:.76rem;color:rgba(255,255,255,.4);font-family:'DM Sans',sans-serif;line-height:1.6;">
          <strong style="color:rgba(255,255,255,.6);">Disclaimer:</strong> Valuations provided by this tool are indicative estimates based on the inputs provided and India Gully's market intelligence. They do not constitute formal valuation opinions, certified appraisals, or investment advice. Actual values depend on specific property characteristics, legal title, physical inspection, and prevailing market conditions. For formal valuations, please engage a RICS-certified valuer or India Gully's transaction advisory team.
        </div>

      </div><!-- end right col -->
    </div><!-- end val-grid -->

    <!-- India Gully Market Intelligence Strip -->
    <div class="ig-callout-gold" style="margin-top:3rem;">
      <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.15rem;color:#fff;margin-bottom:.6rem;">
        India Gully's Active Market Intelligence
      </div>
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:1rem;margin-top:1rem;">
        ${[
          ['₹1,165 Cr+', 'Active mandate pipeline'],
          ['8 active', 'Live transaction mandates'],
          ['₹2,100 Cr', 'Entertainment advisory'],
          ['15+', 'Hotel projects advised'],
          ['6 verticals', 'Cross-sector coverage'],
          ['Pan-India', 'Advisory footprint'],
        ].map(([val, label]) => `
        <div style="text-align:center;">
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:var(--gold);">${val}</div>
          <div style="font-size:.78rem;color:rgba(255,255,255,.55);font-family:'DM Sans',sans-serif;margin-top:.2rem;">${label}</div>
        </div>`).join('')}
      </div>
    </div>

  </div><!-- end container -->
</section>

<style>
.val-tab {
  padding:.55rem 1.2rem;
  border-radius:8px;
  font-size:.88rem;
  font-family:'DM Sans',sans-serif;
  font-weight:600;
  cursor:pointer;
  transition:all .2s;
  letter-spacing:.02em;
}
.val-tab:hover {
  opacity:.85;
  transform:translateY(-1px);
}
.val-form-grid {
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:1rem;
  margin-bottom:1rem;
}
@media(max-width:600px){ .val-form-grid { grid-template-columns:1fr; } }
.val-field label {
  display:block;
  font-size:.78rem;
  font-family:'DM Sans',sans-serif;
  color:rgba(255,255,255,.6);
  font-weight:500;
  margin-bottom:.4rem;
  letter-spacing:.02em;
}
.val-input {
  width:100%;
  background:rgba(255,255,255,.06);
  border:1.5px solid rgba(255,255,255,.12);
  border-radius:8px;
  padding:.6rem .85rem;
  font-size:.95rem;
  font-family:'DM Sans',sans-serif;
  color:#fff;
  outline:none;
  transition:border-color .2s;
  box-sizing:border-box;
}
.val-input:focus { border-color:var(--gold); background:rgba(212,174,42,.06); }
.val-result {
  background:linear-gradient(135deg,rgba(212,174,42,.12),rgba(212,174,42,.04));
  border:1.5px solid rgba(212,174,42,.3);
  border-radius:12px;
  padding:1.25rem 1.5rem;
  margin:1rem 0;
  font-family:'DM Sans',sans-serif;
}
.val-result-main {
  font-family:'DM Serif Display',Georgia,serif;
  font-size:2rem;
  color:var(--gold);
  line-height:1;
  margin-bottom:.3rem;
}
.val-result-label {
  font-size:.8rem;
  color:rgba(255,255,255,.5);
  font-weight:500;
  text-transform:uppercase;
  letter-spacing:.08em;
}
.val-result-breakdown {
  margin-top:.75rem;
  padding-top:.75rem;
  border-top:1px solid rgba(212,174,42,.15);
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(140px,1fr));
  gap:.5rem;
}
.val-result-item {
  font-size:.78rem;
  color:rgba(255,255,255,.5);
  line-height:1.5;
}
.val-result-item strong { color:rgba(255,255,255,.8); display:block; font-size:.88rem; }
</style>

<script>
function switchTab(tab) {
  ['cap','dcf','rev'].forEach(t => {
    const btn = document.getElementById('tab-'+t);
    const panel = document.getElementById('panel-'+t);
    const isActive = t === tab;
    panel.style.display = isActive ? 'block' : 'none';
    if(isActive) {
      btn.style.background = 'rgba(212,174,42,.12)';
      btn.style.borderColor = 'var(--gold)';
      btn.style.color = 'var(--gold)';
    } else {
      btn.style.background = 'rgba(255,255,255,.04)';
      btn.style.borderColor = 'rgba(255,255,255,.12)';
      btn.style.color = 'rgba(255,255,255,.6)';
    }
  });
}

function fmtL(val) {
  if(val >= 100) return '₹' + (val/100).toFixed(2) + ' Cr';
  return '₹' + val.toFixed(2) + ' L';
}

function calcCap() {
  const noi = parseFloat(document.getElementById('cap-noi').value) || 0;
  const rate = parseFloat(document.getElementById('cap-rate').value) || 8.5;
  const vac = parseFloat(document.getElementById('cap-vac').value) || 0;
  const capex = parseFloat(document.getElementById('cap-capex').value) || 0;
  
  const effectiveNOI = noi * (1 - vac/100) * (1 - capex/100);
  const value = effectiveNOI / (rate/100);
  const yieldCheck = (noi / value * 100).toFixed(2);
  
  const el = document.getElementById('cap-result');
  el.style.display = 'block';
  el.innerHTML = \`
    <div class="val-result-label">Indicated Valuation</div>
    <div class="val-result-main">\${fmtL(value)}</div>
    <div style="font-size:.82rem;color:rgba(255,255,255,.5);font-family:'DM Sans',sans-serif;margin-top:.2rem;">
      Gross yield: \${yieldCheck}% · Effective NOI: \${fmtL(effectiveNOI)}/yr
    </div>
    <div class="val-result-breakdown">
      <div class="val-result-item"><strong>\${fmtL(noi)}</strong>Gross NOI/yr</div>
      <div class="val-result-item"><strong>\${rate}%</strong>Cap Rate Applied</div>
      <div class="val-result-item"><strong>\${fmtL(noi * vac/100)}</strong>Vacancy Deduction</div>
      <div class="val-result-item"><strong>\${fmtL(noi * capex/100)}</strong>CapEx Reserve</div>
    </div>
  \`;
}

function calcDCF() {
  const noi0 = parseFloat(document.getElementById('dcf-noi').value) || 0;
  const g = parseFloat(document.getElementById('dcf-growth').value)/100 || 0.06;
  const r = parseFloat(document.getElementById('dcf-discount').value)/100 || 0.13;
  const termCap = parseFloat(document.getElementById('dcf-termcap').value)/100 || 0.095;
  
  let pv = 0;
  let yr10noi = 0;
  for(let i=1; i<=10; i++){
    const noi_i = noi0 * Math.pow(1+g, i);
    pv += noi_i / Math.pow(1+r, i);
    if(i===10) yr10noi = noi_i;
  }
  const terminalValue = (yr10noi * (1+g)) / termCap;
  const pvTerminal = terminalValue / Math.pow(1+r, 10);
  const total = pv + pvTerminal;
  const tvPct = (pvTerminal/total*100).toFixed(0);
  
  const el = document.getElementById('dcf-result');
  el.style.display = 'block';
  el.innerHTML = \`
    <div class="val-result-label">DCF Indicated Value</div>
    <div class="val-result-main">\${fmtL(total)}</div>
    <div style="font-size:.82rem;color:rgba(255,255,255,.5);font-family:'DM Sans',sans-serif;margin-top:.2rem;">
      PV of cashflows: \${fmtL(pv)} · Terminal value contribution: \${tvPct}%
    </div>
    <div class="val-result-breakdown">
      <div class="val-result-item"><strong>\${fmtL(pv)}</strong>PV Cashflows (10yr)</div>
      <div class="val-result-item"><strong>\${fmtL(pvTerminal)}</strong>PV Terminal Value</div>
      <div class="val-result-item"><strong>\${fmtL(yr10noi)}</strong>Year 10 NOI</div>
      <div class="val-result-item"><strong>\${(r*100).toFixed(1)}%</strong>Discount Rate</div>
    </div>
  \`;
}

function calcRev() {
  const keys = parseInt(document.getElementById('rev-keys').value) || 40;
  const adr = parseFloat(document.getElementById('rev-adr').value) || 4800;
  const occ = parseFloat(document.getElementById('rev-occ').value)/100 || 0.72;
  const fnbPct = parseFloat(document.getElementById('rev-fnb').value)/100 || 0.35;
  const ebitdaMargin = parseFloat(document.getElementById('rev-ebitda').value)/100 || 0.28;
  const multiple = parseFloat(document.getElementById('rev-mult').value) || 8;
  
  const roomRevDay = keys * adr * occ;
  const roomRevAnnual = roomRevDay * 365 / 100000; // in Lakhs
  const fnbRev = roomRevAnnual * fnbPct;
  const totalRev = roomRevAnnual + fnbRev;
  const ebitda = totalRev * ebitdaMargin;
  const value = ebitda * multiple;
  const revpar = (adr * occ).toFixed(0);
  const valuePerKey = (value / keys).toFixed(2);
  
  const el = document.getElementById('rev-result');
  el.style.display = 'block';
  el.innerHTML = \`
    <div class="val-result-label">Hotel Asset Value</div>
    <div class="val-result-main">\${fmtL(value)}</div>
    <div style="font-size:.82rem;color:rgba(255,255,255,.5);font-family:'DM Sans',sans-serif;margin-top:.2rem;">
      RevPAR: ₹\${revpar} · Value per key: \${fmtL(parseFloat(valuePerKey))} · EBITDA: \${fmtL(ebitda)}/yr
    </div>
    <div class="val-result-breakdown">
      <div class="val-result-item"><strong>\${fmtL(roomRevAnnual)}</strong>Room Revenue/yr</div>
      <div class="val-result-item"><strong>\${fmtL(fnbRev)}</strong>F&B Revenue/yr</div>
      <div class="val-result-item"><strong>\${fmtL(ebitda)}</strong>EBITDA/yr</div>
      <div class="val-result-item"><strong>\${multiple}×</strong>EBITDA Multiple</div>
    </div>
  \`;
}

// Auto-calculate on page load
calcCap();
</script>
`
  return c.html(layout('Property Valuation Calculator', html, {
    description: 'Free interactive property valuation calculator using Income Capitalisation, DCF, and Revenue methods. Built on India Gully\'s active ₹1,165 Cr+ advisory intelligence across hotels, commercial, and retail real estate.',
    canonical: '/valuation',
    ogImage: 'https://hotelrajshreechandigarh.com/wp-content/uploads/2025/12/Hotel-Rajshree-5-scaled-e1765525431558.webp',
  }))
})

export default app
