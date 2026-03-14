import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

const POSITIONS = [
  {
    id:       'transaction-advisory-analyst',
    dept:     'Transaction Advisory',
    deptColor:'#1A3A6B',
    title:    'Analyst — Transaction Advisory & Investments',
    type:     'Full-Time',
    location: 'New Delhi (Hybrid)',
    exp:      '0–2 years',
    tags:     ['Real Estate', 'Financial Modelling', 'Advisory'],
    summary:  'Support senior advisors on live real estate and hospitality transaction mandates. Build financial models, prepare Information Memoranda, coordinate due diligence and manage client data rooms.',
    responsibilities: [
      'Financial modelling — DCF, IRR, Cap Rate — for hospitality and commercial assets',
      'Drafting Information Memoranda, teasers and investment decks',
      'Coordinating due diligence with lawyers, valuers and technical advisors',
      'Market research: cap rates, demand studies, competitive landscape reports',
      'Managing secure data rooms and coordinating NDA / EOI processes',
      'Supporting deal execution from mandate origination through to closing',
    ],
    requirements: [
      'MBA / CA / CFA or BBA / B.Com with strong academic record',
      'Excellent financial modelling skills (Excel/Google Sheets)',
      'Strong written communication — ability to draft investment-grade documents',
      'Passion for real estate, hospitality or cross-sector advisory',
      'Attention to detail and ability to manage multiple mandates simultaneously',
      'Prior internship in IB, PE, real estate or advisory is a plus',
    ],
    apply: true,
  },
  {
    id:       'horeca-procurement-executive',
    dept:     'HORECA Procurement',
    deptColor:'#15803d',
    title:    'Executive — HORECA Procurement & Supply Chain',
    type:     'Full-Time',
    location: 'New Delhi / Pan-India Travel',
    exp:      '2–5 years',
    tags:     ['HORECA', 'Procurement', 'Vendor Management'],
    summary:  'Drive end-to-end HORECA procurement for hotel pre-opening and renovation mandates. Manage vendor relationships, RFQ processes, PO execution and quality assurance across FF&E, OS&E, kitchen and uniform categories.',
    responsibilities: [
      'End-to-end procurement management for hotel pre-opening projects (40–200 keys)',
      'Vendor identification, RFQ preparation and competitive evaluation',
      'Negotiating pricing, delivery terms and quality commitments with vendors',
      'PO placement, delivery tracking and on-site quality inspection',
      'Coordinating logistics and last-mile delivery to Tier 2 / 3 locations',
      'Maintaining India Gully\'s vendor panel and product specification library',
      'Client communication: weekly procurement status reports',
    ],
    requirements: [
      '2–5 years in hospitality procurement, F&B supply chain or HORECA sales',
      'Knowledge of FF&E, OS&E, kitchen equipment, linen and uniform categories',
      'Strong negotiation skills and a network of qualified hotel suppliers',
      'Comfort with pan-India travel (30–40% travel expected)',
      'Proficiency in procurement software / Excel; ERP familiarity is a plus',
      'Hotel pre-opening experience preferred',
    ],
    apply: true,
  },
  {
    id:       'business-development-manager',
    dept:     'Business Development',
    deptColor:'#B8960C',
    title:    'Manager — Business Development (Mandates & Clients)',
    type:     'Full-Time',
    location: 'New Delhi + Client Locations',
    exp:      '4–8 years',
    tags:     ['Business Development', 'Real Estate', 'Client Management'],
    summary:  'Drive mandate origination and client development for India Gully\'s transaction advisory, HORECA and hospitality services. Own the BD pipeline, deepen existing client relationships and build new ones across family offices, developers, hotel owners and institutional investors.',
    responsibilities: [
      'Identifying and originating new advisory mandates — asset sales, acquisitions, advisory retainers',
      'Building and managing relationships with hotel owners, developers, family offices and PE investors',
      'Leading pitch presentations and mandate proposals',
      'Cross-selling India Gully\'s services (HORECA, real estate, hospitality advisory)',
      'Managing the CRM pipeline and converting inbound enquiries',
      'Representing India Gully at industry events, conferences and networking forums',
    ],
    requirements: [
      '4–8 years in real estate advisory, hotel brokerage, investment banking or related sectors',
      'Existing relationships with hotel owners, developers or investors is a strong plus',
      'Strong presentation and interpersonal skills',
      'Track record of mandate origination or deal sourcing',
      'MBA / CFA / CA qualification preferred',
      'Hunger to work in a lean, high-performance boutique advisory environment',
    ],
    apply: true,
  },
  {
    id:       'digital-marketing-executive',
    dept:     'Marketing & Communications',
    deptColor:'#7C3AED',
    title:    'Executive — Digital Marketing & Content',
    type:     'Full-Time',
    location: 'New Delhi (Hybrid)',
    exp:      '1–3 years',
    tags:     ['Digital Marketing', 'Content', 'SEO'],
    summary:  'Own India Gully\'s digital marketing — website content, LinkedIn presence, insights publication, SEO and performance campaigns. Translate complex advisory services into compelling content for investors, hotel owners and HORECA operators.',
    responsibilities: [
      'Managing and updating India Gully\'s website and digital platforms',
      'Creating long-form research content (insights articles, case studies, sector reports)',
      'LinkedIn strategy and content calendar management',
      'SEO optimisation — on-page, technical, and link building',
      'Email marketing for mandate alerts, HORECA promotions and research bulletins',
      'Coordinating photoshoots and videography for mandate listings and company content',
    ],
    requirements: [
      '1–3 years in digital marketing, content marketing or editorial roles',
      'Strong writing skills — comfortable with financial and business content',
      'SEO proficiency (keyword research, on-page, analytics)',
      'LinkedIn organic growth experience preferred',
      'Familiarity with website CMS and basic web analytics (GA4)',
      'Interest in real estate, hospitality or financial services sectors',
    ],
    apply: true,
  },
  {
    id:       'research-intern',
    dept:     'Research & Analytics',
    deptColor:'#065F46',
    title:    'Research Intern — Real Estate & Hospitality',
    type:     'Internship (3–6 months)',
    location: 'New Delhi (In-Office)',
    exp:      'Student / Fresh Graduate',
    tags:     ['Internship', 'Research', 'Hospitality'],
    summary:  'Join India Gully\'s research team to support market intelligence, competitive analysis and content creation for India\'s real estate, hospitality and HORECA sectors. Ideal for students preparing for a career in advisory, investment banking or hospitality management.',
    responsibilities: [
      'Industry research: hotel supply pipeline, occupancy trends, retail market data',
      'Building financial models and comparables databases',
      'Drafting research notes, market summaries and sector briefs',
      'Assisting with data collection for active advisory mandates',
      'Contributing to India Gully\'s Insights content platform',
    ],
    requirements: [
      'Currently enrolled in MBA / BBA / B.Com / Hotel Management / Economics programme',
      'Strong analytical skills and comfort with data',
      'Excellent written English',
      'Interest in real estate, hospitality or investment advisory',
      'Proactive, self-driven attitude — this is a startup, everyone pitches in',
    ],
    apply: true,
  },
]

app.get('/', (c) => {
  const content = `

<!-- ══ HERO ══════════════════════════════════════════════════════════════ -->\n
<div class="hero-dk">
  <div class="hero-dk-grid"></div>
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse 70% 90% at 30% 60%,rgba(184,150,12,.04) 0%,transparent 60%);pointer-events:none;"></div>
  <div style="position:absolute;bottom:0;left:0;right:0;height:120px;background:linear-gradient(to bottom,transparent,var(--ink));pointer-events:none;"></div>
  <div class="wrap" style="position:relative;">
    <div style="max-width:820px;" class="fu">
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;">
        <div style="width:40px;height:1px;background:linear-gradient(90deg,var(--gold),transparent);"></div>
        <span style="font-size:.6rem;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);">Join Us</span>
      </div>
      <h1 class="h1" style="margin-bottom:1.75rem;">Careers at<br><em style="color:var(--gold);font-style:italic;">India Gully</em></h1>
      <p class="lead-lt" style="max-width:640px;margin-bottom:2.5rem;">We are a lean, high-performance advisory firm operating at the intersection of real estate, hospitality, retail and HORECA. We look for people with intellectual curiosity, commercial hunger and the ability to get things done — regardless of background.</p>
      <div style="display:flex;gap:1rem;flex-wrap:wrap;">
        <a href="#open-positions" class="btn btn-g">View Open Positions</a>
        <a href="/contact" style="display:inline-flex;align-items:center;gap:.5rem;font-size:.78rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.55);text-decoration:none;padding:.75rem 0;transition:color .2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.55)'">
          <i class="fas fa-envelope" style="font-size:.65rem;"></i>Send Speculative CV
        </a>
      </div>
    </div>
  </div>
</div>

<!-- ══ WHY INDIA GULLY ═══════════════════════════════════════════════════ -->\n
<div style="background:var(--bg);padding:4.5rem 0;border-bottom:1px solid var(--border);">
  <div class="wrap">
    <div style="text-align:center;margin-bottom:3rem;">
      <p style="font-size:.6rem;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:.5rem;">The India Gully Difference</p>
      <h2 class="h2" style="margin:0;">Why Work With Us?</h2>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:2rem;">
      ${[
        { icon:'rocket', color:'#B8960C', title:'Exposure from Day One', desc:'At a boutique advisory firm, there are no silos. You will work directly on live mandates — client-facing, deal-active — from your first month.' },
        { icon:'chart-network', color:'#1A3A6B', title:'Rare Multi-Vertical Exposure', desc:'Very few advisors operate across Real Estate, Hospitality, Retail, Entertainment, Debt and HORECA simultaneously. India Gully does. Your breadth here will be exceptional.' },
        { icon:'users', color:'#15803d', title:'Direct Mentorship', desc:'Work directly with our MD, ED and Presidents. No layers of bureaucracy. Feedback is real-time, growth is merit-based, and accountability is personal.' },
        { icon:'map-marked-alt', color:'#7C3AED', title:'Pan-India Exposure', desc:'From Lutyens\' Delhi to hill stations in Himachal Pradesh, to Tier 2 cities building their first branded hotel — your geography will be genuinely pan-India.' },
        { icon:'handshake', color:'#B8960C', title:'Network That Opens Doors', desc:'India Gully\'s network spans hotel owners, institutional PE investors, family offices, developers and international hotel brands. Being here puts you at the centre of it.' },
        { icon:'seedling', color:'#065F46', title:'Celebrating Desiness', desc:'India Gully is a proudly Indian firm celebrating Indian enterprise. We believe the best advisory for Indian clients comes from people who understand India deeply.' },
      ].map(s => `
      <div style="padding:2rem;border:1px solid var(--border-lt);transition:all .28s;" onmouseover="this.style.borderColor='rgba(184,150,12,.3)';this.style.background='rgba(184,150,12,.02)'" onmouseout="this.style.borderColor='var(--border-lt)';this.style.background='transparent'">
        <div style="width:44px;height:44px;background:${s.color}18;border:1px solid ${s.color}30;display:flex;align-items:center;justify-content:center;margin-bottom:1.25rem;">
          <i class="fas fa-${s.icon}" style="color:${s.color};font-size:.95rem;"></i>
        </div>
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.08rem;color:var(--ink);margin-bottom:.625rem;">${s.title}</h3>
        <p style="font-size:.82rem;color:var(--ink-muted);line-height:1.75;margin:0;">${s.desc}</p>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- ══ OPEN POSITIONS ════════════════════════════════════════════════════ -->\n
<div class="sec-pd" id="open-positions">
  <div class="wrap">
    <div style="margin-bottom:3rem;">
      <p style="font-size:.6rem;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:.5rem;">Current Openings</p>
      <h2 class="h2" style="margin:0;">${POSITIONS.length} Open Positions</h2>
    </div>

    ${POSITIONS.map((pos, idx) => `
    <!-- Position: ${pos.id} -->
    <div class="career-card reveal" style="border:1px solid var(--border-lt);margin-bottom:1.5rem;overflow:hidden;transition:all .28s;"
         onmouseover="this.style.borderColor='rgba(184,150,12,.3)';this.style.boxShadow='0 8px 32px rgba(0,0,0,.07)'"
         onmouseout="this.style.borderColor='var(--border-lt)';this.style.boxShadow='none'">
      <!-- Header row -->
      <div style="padding:1.75rem 2rem;display:flex;align-items:flex-start;justify-content:space-between;gap:1.5rem;flex-wrap:wrap;cursor:pointer;" onclick="toggleCareer('career-${idx}')">
        <div style="flex:1;min-width:200px;">
          <div style="display:flex;align-items:center;gap:.625rem;margin-bottom:.625rem;flex-wrap:wrap;">
            <span style="background:${pos.deptColor};color:#fff;font-size:.56rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:.2rem .65rem;">${pos.dept}</span>
            <span style="background:rgba(10,10,10,.05);border:1px solid var(--border);color:var(--ink-soft);font-size:.56rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;padding:.2rem .55rem;"><i class="fas fa-map-marker-alt" style="margin-right:.25rem;font-size:.5rem;"></i>${pos.location}</span>
            <span style="background:rgba(22,163,74,.08);border:1px solid rgba(22,163,74,.2);color:#15803d;font-size:.56rem;font-weight:600;letter-spacing:.08em;text-transform:uppercase;padding:.2rem .55rem;"><i class="fas fa-clock" style="margin-right:.25rem;font-size:.5rem;"></i>${pos.type}</span>
          </div>
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.2rem;color:var(--ink);margin-bottom:.5rem;line-height:1.2;">${pos.title}</h3>
          <p style="font-size:.8rem;color:var(--ink-muted);line-height:1.65;margin:0;">${pos.summary}</p>
        </div>
        <div style="display:flex;flex-direction:column;align-items:flex-end;gap:.5rem;flex-shrink:0;">
          <div style="font-size:.65rem;color:var(--ink-soft);white-space:nowrap;"><i class="fas fa-briefcase" style="color:var(--gold);margin-right:.3rem;font-size:.6rem;"></i>${pos.exp}</div>
          <div id="career-toggle-${idx}" style="font-size:.65rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--gold);display:flex;align-items:center;gap:.35rem;">View Details <i class="fas fa-chevron-down" style="font-size:.55rem;transition:transform .22s;"></i></div>
        </div>
      </div>

      <!-- Expandable details -->
      <div id="career-${idx}" style="display:none;border-top:1px solid var(--border-lt);padding:1.75rem 2rem;">
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:2rem;margin-bottom:1.75rem;">
          <div>
            <p style="font-size:.62rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);margin-bottom:.875rem;">Responsibilities</p>
            <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.5rem;">
              ${pos.responsibilities.map(r => `<li style="font-size:.82rem;color:var(--ink-soft);line-height:1.65;display:flex;gap:.625rem;"><i class="fas fa-chevron-right" style="color:var(--gold);font-size:.55rem;margin-top:.35rem;flex-shrink:0;"></i><span>${r}</span></li>`).join('')}
            </ul>
          </div>
          <div>
            <p style="font-size:.62rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);margin-bottom:.875rem;">Requirements</p>
            <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:.5rem;">
              ${pos.requirements.map(r => `<li style="font-size:.82rem;color:var(--ink-soft);line-height:1.65;display:flex;gap:.625rem;"><i class="fas fa-check" style="color:#15803d;font-size:.55rem;margin-top:.35rem;flex-shrink:0;"></i><span>${r}</span></li>`).join('')}
            </ul>
          </div>
        </div>
        <div style="display:flex;gap:.875rem;flex-wrap:wrap;align-items:center;">
          <button onclick="igApplyPosition('${pos.id}','${pos.title}')"
                  style="padding:.75rem 2rem;background:var(--ink);color:#fff;border:none;cursor:pointer;font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;transition:background .22s;display:flex;align-items:center;gap:.5rem;"
                  onmouseover="this.style.background='var(--gold)'" onmouseout="this.style.background='var(--ink)'">
            <i class="fas fa-paper-plane" style="font-size:.65rem;"></i>Apply Now
          </button>
          <a href="mailto:careers@indiagully.com?subject=Application: ${pos.title}" style="padding:.75rem 1.5rem;border:1px solid var(--border);font-size:.72rem;font-weight:600;color:var(--ink-soft);text-decoration:none;transition:all .2s;display:flex;align-items:center;gap:.4rem;" onmouseover="this.style.borderColor='var(--ink)';this.style.color='var(--ink)'" onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--ink-soft)'">
            <i class="fas fa-envelope" style="font-size:.6rem;"></i>Email CV
          </a>
        </div>
      </div>
    </div>`).join('')}
  </div>
</div>

<!-- ══ APPLY MODAL ════════════════════════════════════════════════════════ -->\n
<div id="apply-modal" style="display:none;position:fixed;inset:0;z-index:9000;background:rgba(6,6,6,.88);backdrop-filter:blur(12px);align-items:center;justify-content:center;padding:1rem;">
  <div style="width:100%;max-width:520px;background:#fff;overflow:hidden;box-shadow:0 40px 100px rgba(0,0,0,.6);max-height:90vh;overflow-y:auto;">
    <div style="background:var(--ink);padding:1.5rem 1.75rem;display:flex;align-items:center;justify-content:space-between;position:sticky;top:0;z-index:10;">
      <div style="display:flex;align-items:center;gap:.875rem;">
        <div style="width:40px;height:40px;background:var(--gold);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <i class="fas fa-paper-plane" style="color:#fff;font-size:.9rem;"></i>
        </div>
        <div>
          <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.05rem;color:#fff;margin-bottom:.1rem;">Apply — India Gully</h3>
          <p style="font-size:.63rem;color:rgba(255,255,255,.4);" id="apply-pos-label"></p>
        </div>
      </div>
      <button onclick="document.getElementById('apply-modal').style.display='none'"
              style="width:32px;height:32px;border:1px solid rgba(255,255,255,.15);background:transparent;color:rgba(255,255,255,.5);cursor:pointer;display:flex;align-items:center;justify-content:center;"
              onmouseover="this.style.background='rgba(255,255,255,.08)'" onmouseout="this.style.background='transparent'">
        <i class="fas fa-times"></i>
      </button>
    </div>
    <div style="padding:1.5rem 1.75rem;">
      <div style="display:flex;flex-direction:column;gap:.625rem;margin-bottom:1.25rem;">
        <div>
          <label style="display:block;font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.25rem;">Full Name *</label>
          <input id="apply-name" type="text" placeholder="Your full name" autocomplete="name"
                 style="width:100%;box-sizing:border-box;border:1px solid var(--border);padding:.6rem .875rem;font-size:.875rem;color:var(--ink);font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s;"
                 onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='var(--border)'">
        </div>
        <div>
          <label style="display:block;font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.25rem;">Email Address *</label>
          <input id="apply-email" type="email" placeholder="your@email.com" autocomplete="email"
                 style="width:100%;box-sizing:border-box;border:1px solid var(--border);padding:.6rem .875rem;font-size:.875rem;color:var(--ink);font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s;"
                 onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='var(--border)'">
        </div>
        <div>
          <label style="display:block;font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.25rem;">Phone / WhatsApp *</label>
          <input id="apply-phone" type="tel" placeholder="+91 98XXX XXXXX" autocomplete="tel"
                 style="width:100%;box-sizing:border-box;border:1px solid var(--border);padding:.6rem .875rem;font-size:.875rem;color:var(--ink);font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s;"
                 onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='var(--border)'">
        </div>
        <div>
          <label style="display:block;font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.25rem;">LinkedIn Profile</label>
          <input id="apply-linkedin" type="url" placeholder="https://linkedin.com/in/yourname"
                 style="width:100%;box-sizing:border-box;border:1px solid var(--border);padding:.6rem .875rem;font-size:.875rem;color:var(--ink);font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s;"
                 onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='var(--border)'">
        </div>
        <div>
          <label style="display:block;font-size:.6rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.25rem;">Cover Note *</label>
          <textarea id="apply-cover" rows="4" placeholder="Tell us what excites you about this role and why India Gully."
                    style="width:100%;box-sizing:border-box;border:1px solid var(--border);padding:.6rem .875rem;font-size:.875rem;color:var(--ink);font-family:'DM Sans',sans-serif;outline:none;resize:vertical;transition:border-color .2s;"
                    onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='var(--border)'"></textarea>
        </div>
      </div>
      <div id="apply-err" style="display:none;background:#fef2f2;border:1px solid #fecaca;padding:.5rem .75rem;margin-bottom:.875rem;font-size:.75rem;color:#dc2626;">
        <i class="fas fa-exclamation-circle" style="margin-right:.35rem;"></i><span id="apply-err-msg">Please fill all required fields.</span>
      </div>
      <div id="apply-success" style="display:none;background:#f0fdf4;border:1px solid #bbf7d0;padding:.875rem;margin-bottom:.875rem;font-size:.8rem;color:#166534;line-height:1.6;"></div>
      <button id="apply-submit" onclick="igSubmitApplication()"
              style="width:100%;padding:.8rem;background:var(--ink);color:#fff;border:none;cursor:pointer;font-size:.75rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;transition:background .22s;display:flex;align-items:center;justify-content:center;gap:.5rem;"
              onmouseover="this.style.background='var(--gold)'" onmouseout="this.style.background='var(--ink)'">
        <i class="fas fa-paper-plane" style="font-size:.65rem;"></i>Submit Application
      </button>
      <p style="font-size:.62rem;color:var(--ink-faint);margin-top:.75rem;text-align:center;line-height:1.6;">We review every application personally. If we see a fit, expect a call within 5–7 business days. careers@indiagully.com · CIN: U74999DL2017PTC323237</p>
    </div>
  </div>
</div>

<!-- ══ CULTURE / VALUES CTA ══════════════════════════════════════════════ -->\n
<div style="background:var(--ink);padding:4.5rem 0;border-top:1px solid rgba(255,255,255,.06);">
  <div class="wrap" style="text-align:center;">
    <p style="font-size:.6rem;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);margin-bottom:.875rem;">Don't See the Right Role?</p>
    <h2 class="h2" style="color:#fff;margin-bottom:1.25rem;max-width:580px;margin-left:auto;margin-right:auto;">We Always Want to Hear from Exceptional People</h2>
    <p style="color:rgba(255,255,255,.55);max-width:520px;margin:0 auto 2.25rem;line-height:1.85;">Send your CV and a short note on what you would bring to India Gully. We will keep your profile on file and reach out when the right opportunity emerges. careers@indiagully.com</p>
    <div style="display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;">
      <a href="mailto:careers@indiagully.com" class="btn btn-g"><i class="fas fa-envelope" style="margin-right:.5rem;font-size:.72rem;"></i>Email Your CV</a>
      <a href="/about" style="display:inline-flex;align-items:center;gap:.5rem;font-size:.78rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:rgba(255,255,255,.45);text-decoration:none;padding:.75rem 0;transition:color .2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.45)'">
        <i class="fas fa-users" style="font-size:.65rem;"></i>Meet the Team
      </a>
    </div>
  </div>
</div>

<style>
@media(max-width:900px){
  .career-card > div:first-child { flex-direction:column!important; }
  #open-positions .reveal > div:first-child > div > div[style*="grid-template-columns:1fr 1fr"] { grid-template-columns:1fr!important; }
}
</style>

<script>
var _applyPosId = '', _applyPosTitle = '';

function toggleCareer(id) {
  var el = document.getElementById(id);
  var idx = id.replace('career-','');
  var toggle = document.getElementById('career-toggle-' + idx);
  if (!el) return;
  var isOpen = el.style.display !== 'none';
  el.style.display = isOpen ? 'none' : 'block';
  if (toggle) {
    toggle.innerHTML = isOpen
      ? 'View Details <i class="fas fa-chevron-down" style="font-size:.55rem;transition:transform .22s;"></i>'
      : 'Hide Details <i class="fas fa-chevron-up" style="font-size:.55rem;"></i>';
  }
}

function igApplyPosition(id, title) {
  _applyPosId = id;
  _applyPosTitle = title;
  var modal = document.getElementById('apply-modal');
  var label = document.getElementById('apply-pos-label');
  if (label) label.textContent = title;
  var errEl = document.getElementById('apply-err');
  var succEl = document.getElementById('apply-success');
  var subBtn = document.getElementById('apply-submit');
  if (errEl) errEl.style.display = 'none';
  if (succEl) { succEl.style.display = 'none'; succEl.innerHTML = ''; }
  if (subBtn) { subBtn.style.display = ''; subBtn.disabled = false; subBtn.innerHTML = '<i class="fas fa-paper-plane" style="font-size:.65rem;"></i> Submit Application'; }
  if (modal) modal.style.display = 'flex';
}

function igSubmitApplication() {
  var name = document.getElementById('apply-name').value.trim();
  var email = document.getElementById('apply-email').value.trim();
  var phone = document.getElementById('apply-phone').value.trim();
  var cover = document.getElementById('apply-cover').value.trim();
  var linkedin = document.getElementById('apply-linkedin').value.trim();
  var errEl = document.getElementById('apply-err');
  var errMsg = document.getElementById('apply-err-msg');
  var succEl = document.getElementById('apply-success');
  var subBtn = document.getElementById('apply-submit');

  if (!name || !email || !/^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$/.test(email)) {
    if (errMsg) errMsg.textContent = 'Please enter your full name and a valid email address.';
    if (errEl) errEl.style.display = 'block';
    return;
  }
  if (!cover) {
    if (errMsg) errMsg.textContent = 'Please include a short cover note.';
    if (errEl) errEl.style.display = 'block';
    return;
  }
  if (errEl) errEl.style.display = 'none';
  if (subBtn) { subBtn.disabled = true; subBtn.innerHTML = '<i class="fas fa-spinner fa-spin" style="font-size:.65rem;margin-right:.4rem;"></i>Submitting...'; subBtn.style.background = 'var(--ink-muted)'; }

  fetch('/api/enquiry', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name,
      email: email,
      phone: phone,
      message: 'Career Application — ' + _applyPosTitle + '\\n\\nCover Note: ' + cover + (linkedin ? '\\n\\nLinkedIn: ' + linkedin : ''),
      source: 'careers_page',
      position_id: _applyPosId,
    })
  })
  .then(function(r){ return r.json(); })
  .then(function(d){
    if (subBtn) subBtn.style.display = 'none';
    if (succEl) {
      succEl.style.display = 'block';
      succEl.innerHTML = '<i class="fas fa-check-circle" style="margin-right:.5rem;color:#16a34a;"></i><strong>Application received!</strong> We\'ll review your profile and be in touch at <strong>' + email + '</strong> if we see a fit. Ref: ' + (d.ref || 'IG-APP-' + Date.now());
    }
  })
  .catch(function(){
    if (subBtn) { subBtn.disabled = false; subBtn.innerHTML = '<i class="fas fa-paper-plane" style="font-size:.65rem;"></i> Submit Application'; subBtn.style.background = 'var(--ink)'; subBtn.onmouseover = function(){this.style.background='var(--gold)'}; subBtn.onmouseout = function(){this.style.background='var(--ink)'}; }
    if (errEl) { errEl.style.display = 'block'; if(errMsg) errMsg.textContent = 'Network error. Please email careers@indiagully.com directly.'; }
  });
}

// Close modal on backdrop click
document.getElementById('apply-modal').addEventListener('click', function(e){
  if (e.target === this) this.style.display = 'none';
});
</script>
`

  return c.html(layout('Careers — Join India Gully', content, {
    description: 'Join India Gully\'s high-performance advisory team. We are hiring across Transaction Advisory, HORECA Procurement, Business Development and Research. Celebrating Desiness since 2017.',
    canonical: 'https://india-gully.pages.dev/careers',
    ogImage: 'https://india-gully.pages.dev/static/og.jpg',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      hiringOrganization: {
        '@type': 'Organization',
        name: 'India Gully',
        sameAs: 'https://india-gully.pages.dev',
        logo: 'https://india-gully.pages.dev/assets/logo-white.png'
      },
      jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressLocality: 'New Delhi', addressCountry: 'IN' } },
      employmentType: 'FULL_TIME',
      description: 'Multiple openings across Transaction Advisory, HORECA Procurement, Business Development and Research at India Gully.'
    }
  }))
})

export default app
