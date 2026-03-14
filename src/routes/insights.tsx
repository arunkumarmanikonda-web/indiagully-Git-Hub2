import { Hono } from 'hono'
import { layout } from '../lib/layout'

const app = new Hono()

// ── ARTICLE IMAGES — India Gully project images only ──────────────────────
// All images sourced from active India Gully mandate properties only.
// No generic stock / Unsplash images used.
const CAT_IMAGES: Record<string, string> = {
  // Hotel Rajshree & Spa, Chandigarh — Real Estate / Commercial article header
  'Real Estate':             'https://hotelrajshreechandigarh.com/wp-content/uploads/2025/12/Hotel-Rajshree-5-scaled-e1765525431558.webp',
  // WelcomHeritage Santa Roza, Kasauli — Heritage & Entertainment context
  'Entertainment':           'https://www.welcomheritagehotels.in/wp-content/uploads/2024/09/santa-roza-overview.jpg',
  // Hotel Rajshree interior — HORECA / F&B procurement context
  'HORECA':                  'https://hotelrajshreechandigarh.com/wp-content/uploads/2025/12/IMG_1157-1-scaled-1.webp',
  // Maple Resort Chail — mountain asset, suitable for Debt / Special Situations
  'Debt & Special Situations':'https://www.mapleresorts.in/images/slider/maple-resort-chail-1.jpg',
  // Maple Resort exterior — Retail / leasing context
  'Retail':                  'https://www.mapleresorts.in/images/slider/maple-resort-chail-2.jpg',
  // WelcomHeritage Santa Roza — Hospitality article header
  'Hospitality':             'https://www.welcomheritagehotels.in/wp-content/uploads/2024/09/santa-roza-room.jpg',
}

// ── ARTICLES ─────────────────────────────────────────────────────────────────
const ARTICLES = [
  {
    id: 'india-realty-2026-outlook',
    category: 'Real Estate',
    date: 'February 2026',
    title: 'India Real Estate 2026: Commercial & Hospitality Convergence',
    excerpt: 'As hybrid work reshapes demand for Grade-A office space, India\'s commercial real estate is converging with hospitality-grade amenities. We examine the structural drivers, market dynamics across 8 key cities, and the investment thesis for developers navigating this new paradigm.',
    tags: ['Real Estate', 'Commercial', 'Hospitality', '2026'],
    readTime: '10 min read',
    body: `
<h2>Executive Summary</h2>
<p>India's commercial real estate sector is undergoing its most profound structural transformation since the IT-services boom of the early 2000s. The convergence of hybrid work patterns, elevated employee experience expectations, and capital-efficient development strategies is creating a new asset class: the <strong>Hospitality-Grade Office</strong>.</p>
<p>This report, based on India Gully's active advisory mandates across Delhi NCR, Mumbai, Bengaluru, Hyderabad, Pune, Chennai, Chandigarh, and Jaipur, identifies five structural drivers and presents an investment framework for developers and institutional investors in 2026.</p>

<h2>1. The Hybrid Work Structural Shift</h2>
<p>India's corporate occupier base has stabilised at a <strong>3.2-day average office week</strong> — a figure that has remained unchanged since Q2 2024. This equilibrium is driving a fundamental rethinking of space allocation:</p>
<ul>
  <li><strong>Densification fatigue</strong>: Occupiers are reversing the open-plan squeeze of 2015–2019. Average workspace per employee has risen from 80 sq ft to 110 sq ft in Grade-A developments.</li>
  <li><strong>Experience premium</strong>: 78% of India's top 200 companies now have formal employee experience mandates, translating into budget for higher-quality, hospitality-grade work environments.</li>
  <li><strong>Location recalibration</strong>: CBD and Grade-A suburban micro-markets are outperforming peripheral business parks on both occupancy and rental growth.</li>
</ul>

<h2>2. Hospitality-Grade Amenities as Standard</h2>
<p>The most significant operational change we are observing across active mandates is the normalisation of hotel-quality amenities in commercial developments. India Gully's advisory work on three Grade-A developments in 2025 incorporated specifications previously reserved for five-star hotels:</p>
<ul>
  <li>Concierge-level reception and visitor management</li>
  <li>In-house restaurant and barista-quality café operations</li>
  <li>Fitness and wellness facilities with booking systems</li>
  <li>High-quality landscaped terraces and break-out spaces</li>
  <li>Premium hotel-standard toilet and locker facilities</li>
</ul>
<p>The incremental construction cost of these specifications runs at ₹180–250 per sq ft over baseline — recoverable through a 12–18% rental premium over the project lifecycle.</p>

<h2>3. Mixed-Use as Value Creator</h2>
<p>Our analysis of 14 recent commercial transactions confirms that mixed-use schemes (office + hospitality + retail) achieve 22–35% higher capital values per sq ft versus standalone commercial. The operating hotel component, even at modest 70% occupancy, generates yield on cost of 8.5–11.5% in Tier-1 cities.</p>
<p>Key cities showing the strongest mixed-use office-hospitality convergence in our pipeline: <strong>Delhi NCR (Gurugram, Aerocity), Hyderabad (HITEC City), Bengaluru (Whitefield)</strong>.</p>

<h2>4. Investment Thesis for 2026</h2>
<p>India Gully recommends a <strong>hospitality-anchored mixed-use strategy</strong> for Grade-A commercial development in 2026, underpinned by:</p>
<ol>
  <li>Positioning hotel component (100–180 keys) as the amenity anchor, not a separate P&L</li>
  <li>Securing food and beverage brand partners at pre-commitment stage</li>
  <li>Designing for flexibility: floors convertible between office, serviced apartment and hotel use</li>
  <li>Partnering with experience operators (co-working, managed offices) for 15–25% of GLA</li>
</ol>

<h2>5. Market Outlook by City</h2>
<p><strong>Delhi NCR</strong>: Aerocity and Central Delhi corridors are commanding ₹8,500–10,500 per sq ft for hospitality-grade office. Demand driven by MNCs, PSUs and financial services.</p>
<p><strong>Mumbai (BKC)</strong>: Premium plateaued at ₹22,000–28,000 per sq ft for Grade-A. Mixed-use with boutique hotel commands 18% premium; supply constrained.</p>
<p><strong>Bengaluru (Whitefield/ORR)</strong>: IT sector-led demand recovery. New supply incorporating hospitality amenities is pre-leased 12–18 months in advance.</p>
<p><strong>Hyderabad</strong>: Strong government support for IT-hospitality mixed-use. Land cost advantage enables better yield; recommended priority market for 2026.</p>

<h2>Conclusion</h2>
<p>The convergence of hospitality and commercial real estate in India is not a trend — it is a structural reconfiguration of how Grade-A office is conceived, built, and operated. Developers who embed hospitality-grade thinking at the design stage will achieve superior rental yields, faster lease-up, and stronger capital values. India Gully's advisory practice is positioned to support developers and investors navigating this convergence across all major markets.</p>
`,
  },
  {
    id: 'entertainment-zone-regulatory-india',
    category: 'Entertainment',
    date: 'January 2026',
    title: 'Navigating the Entertainment Zone Regulatory Landscape in India',
    excerpt: 'India\'s entertainment real estate sector sits at the intersection of multiple regulatory frameworks, town planning, fire safety, excise and consumer protection laws. We map the regulatory landscape across key states and outline a compliance-first development strategy.',
    tags: ['Entertainment', 'Regulatory', 'Real Estate', 'Compliance'],
    readTime: '8 min read',
    body: `
<h2>Introduction</h2>
<p>India's entertainment real estate sector — encompassing theme parks, family entertainment centres (FECs), waterparks, gaming zones, multiplex-anchored destination retail, and integrated entertainment destinations — operates at the intersection of <strong>six distinct regulatory frameworks</strong>. Navigating this complexity is one of the primary risks for promoters and investors.</p>
<p>India Gully, as transaction advisor and development consultant across hospitality, real estate, and entertainment mandates, has developed a proprietary regulatory mapping framework that we outline in this article.</p>

<h2>The Six Regulatory Layers</h2>
<h3>Layer 1: Town Planning & Land Use</h3>
<p>Entertainment destinations require land classified for <strong>Commercial / Public-Semi-Public (PSP)</strong> use under the relevant Development Control Regulations (DCR). In many states, a change-of-use (CoU) or special zone designation is required. Timeline: 6–24 months depending on state and political environment.</p>
<p>Key states with progressive entertainment zone policies: Maharashtra (integrated entertainment zones under D-MRT corridor), Rajasthan (tourism and entertainment special areas), Uttar Pradesh (film city and entertainment destination policy).</p>

<h3>Layer 2: Fire Safety & Building Permits</h3>
<p>Entertainment destinations draw large crowds and require compliance with the National Building Code (NBC) 2016, state fire department approvals, and occupancy certificates. For indoor entertainment, additional sprinkler, smoke control, and crowd management specifications apply. Non-compliance is the single largest cause of enforcement actions and closures.</p>

<h3>Layer 3: Excise and F&B Licensing</h3>
<p>Mixed-use entertainment destinations incorporating restaurants, bars, and event spaces are subject to state excise policy. Licensing timelines vary from 3 months (Goa) to 18+ months (Delhi, Maharashtra for bar licenses). F&B is typically the highest-margin component of an entertainment destination — regulatory delays here directly impact revenue projections.</p>

<h3>Layer 4: Consumer Protection & Safety</h3>
<p>Amusement rides, waterpark attractions, and mechanised entertainment are subject to the Consumer Protection Act 2019, state amusement rules, and Indian Standard codes for ride safety. Annual inspections, third-party safety audits, and public liability insurance are mandatory.</p>

<h3>Layer 5: Labour & Employment</h3>
<p>Entertainment destinations are intensive employment hubs. Compliance with Shops & Establishments Acts, minimum wage notifications (state-specific), ESIC/EPF, and the Contract Labour Act requires dedicated HR-legal capacity. Seasonal workforce management adds complexity.</p>

<h3>Layer 6: Intellectual Property & Content Licensing</h3>
<p>IP-anchored entertainment (licensed characters, branded experiences) requires formal licensing agreements from IP holders. These are increasingly international transactions requiring RBI FEMA compliance for royalty payments.</p>

<h2>State-Wise Regulatory Environment</h2>
<p><strong>Maharashtra</strong>: Most progressive policy environment. D-MRT entertainment zones, streamlined clearances via Single Window. Maharashtra is a priority market for entertainment destination investment given its regulatory maturity and consumer base.</p>
<p><strong>Uttar Pradesh</strong>: Strong political will for entertainment investment. YEIDA (Yamuna Expressway Authority) proactively allocates land for entertainment destinations. Our active mandate includes coordination with YEIDA for land designation.</p>
<p><strong>Rajasthan</strong>: Tourism-led entertainment policy. Heritage-experiential entertainment is a designated priority sector. Faster clearances via RIPS 2022.</p>
<p><strong>Delhi NCR</strong>: Most complex. Multiple authorities (DDA, GNIDA, Haryana DGTCP) with overlapping jurisdiction. Recommend 18-month regulatory buffer for any new entertainment project.</p>

<h2>Compliance-First Development Strategy</h2>
<p>India Gully recommends a <strong>regulatory-first development sequencing</strong> for all entertainment destination projects:</p>
<ol>
  <li>Engage regulatory counsel and state industry facilitation body at project inception (before land acquisition)</li>
  <li>Obtain in-principle land use and zoning clearance before committing to design development</li>
  <li>Conduct pre-application meetings with fire, excise, and safety authorities</li>
  <li>Build 20% regulatory timeline buffer into project financing structure</li>
  <li>Appoint dedicated compliance officer for all ongoing statutory requirements</li>
</ol>

<h2>Conclusion</h2>
<p>Entertainment real estate in India offers exceptional returns but demands a compliance-first approach that most developers underestimate. India Gully's end-to-end advisory, from concept through regulatory clearance to operations, is designed to de-risk this complexity and accelerate time-to-revenue for our clients.</p>
`,
  },
  {
    id: 'horeca-tier2-supply-chain',
    category: 'HORECA',
    date: 'December 2025',
    title: 'Building Resilient HORECA Supply Chains in Tier 2 India',
    excerpt: 'The rapid expansion of branded hospitality into Tier 2 and Tier 3 cities is exposing critical gaps in HORECA supply chains. We analyse the challenges, from vendor fragmentation to cold-chain infrastructure, and present a framework for building resilient, scalable procurement operations.',
    tags: ['HORECA', 'Supply Chain', 'Tier 2', 'Operations'],
    readTime: '7 min read',
    body: `
<h2>The Tier 2 Hospitality Expansion Wave</h2>
<p>India's branded hospitality sector is in the midst of its most aggressive geographic expansion since the mid-2000s. Every major hotel brand — Marriott, Radisson, IHG, Lemon Tree, Cygnett, Regenta — has active development pipelines extending into Tier 2 and Tier 3 cities. India Gully, with active hotel management and HORECA supply mandates across Chandigarh, Kasauli, Chail, Jaipur, Jodhpur, Coimbatore, and Kochi, is uniquely positioned to observe the supply chain challenges this expansion creates.</p>

<h2>The Problem: Vendor Fragmentation</h2>
<p>The core challenge in Tier 2 HORECA procurement is <strong>vendor fragmentation</strong>. Unlike metro markets where multiple specialist suppliers compete for hotel contracts, Tier 2 cities typically have:</p>
<ul>
  <li>1–3 FF&E suppliers with limited hospitality-grade inventory</li>
  <li>No specialist OS&E (Operating Supplies and Equipment) distributors</li>
  <li>Limited kitchen equipment service networks</li>
  <li>Fragmented linen and uniform supply, often requiring metro-based procurement</li>
  <li>Cold chain infrastructure gaps for perishable F&B supplies</li>
</ul>
<p>The result: pre-opening procurement costs in Tier 2 run 18–25% higher than equivalent metro specifications, largely driven by logistics, handling, and the absence of local competitive pricing.</p>

<h2>India Gully's Procurement Framework</h2>
<p>Based on 15+ hotel supply mandates, India Gully has developed a <strong>Hub-and-Spoke Procurement Model</strong> for Tier 2 hotel pre-openings:</p>

<h3>Phase 1: Specification and Vendor Identification (Months 1–3)</h3>
<p>Working from brand standards, we develop a <strong>master SKU list</strong> covering all FF&E, OS&E, kitchen, linen, and amenities categories. For each SKU, we identify three supplier tiers: metro-based specialists, regional distributors, and local alternatives. This three-tier approach ensures resilience against single-vendor failure.</p>

<h3>Phase 2: Consolidated Procurement and Logistics (Months 4–8)</h3>
<p>India Gully aggregates orders across multiple hotel pre-openings to achieve <strong>volume-based pricing</strong>. Our vendor network of 50+ qualified suppliers means we can negotiate consolidated pricing even for a single 80-key hotel. Logistics coordination — critical in hilly or remotely-located properties — is handled through our logistics partners with experience in last-mile delivery to difficult locations.</p>

<h3>Phase 3: Delivery, Snagging, and Handover (Months 8–11)</h3>
<p>On-site receiving, inspection against specification, snagging resolution, and completion certificate issuance. India Gully's site teams are present at all major deliveries to ensure brand standard compliance before handover.</p>

<h2>Cold Chain: The Critical Gap</h2>
<p>F&B supply chain in Tier 2 hotels is particularly challenging. Fresh produce, proteins, and specialty ingredients required by branded hotel restaurants often cannot be sourced locally to brand standards. India Gully's F&B procurement advisory service establishes <strong>regular delivery schedules</strong> from approved metro-based suppliers, reducing over-ordering and waste while maintaining brand standards.</p>
<p>For hotels in hill stations (Kasauli, Chail, Mussoorie), India Gully has developed specialised cold chain protocols including all-weather vehicle requirements, alternative route planning, and emergency buffer stock specifications.</p>

<h2>Key Metrics: India Gully HORECA Performance</h2>
<ul>
  <li><strong>500+ SKUs</strong> in our verified product catalogue</li>
  <li><strong>₹50 Cr+</strong> procurement managed across 15+ hotel properties</li>
  <li><strong>50+ vendors</strong> in our qualified supply network</li>
  <li><strong>98.2% on-time delivery rate</strong> across 2024–25 mandates</li>
  <li><strong>Average 14% cost saving</strong> versus promoter self-procurement</li>
</ul>

<h2>Conclusion</h2>
<p>The Tier 2 hospitality expansion wave will continue. Developers who anticipate supply chain complexity and partner with experienced HORECA procurement advisors from project inception will achieve faster pre-opening timelines, lower procurement costs, and higher brand standards compliance. India Gully's HORECA practice is designed precisely for this challenge.</p>
`,
  },
  {
    id: 'ibc-distressed-hospitality-2025',
    category: 'Debt & Special Situations',
    date: 'November 2025',
    title: 'IBC 2025 Update: Hospitality Asset Resolution Trends',
    excerpt: 'The 2025 IBC amendment and NCLT capacity expansion have accelerated resolution timelines for distressed hospitality assets. We track 18 months of case data, identify emerging buyer profiles, and map the post-resolution value-creation playbook for strategic acquirers.',
    tags: ['IBC', 'NCLT', 'Distressed Assets', 'Hospitality', 'Debt'],
    readTime: '12 min read',
    body: `
<h2>IBC 2025: What Has Changed</h2>
<p>The Insolvency and Bankruptcy Code (Amendment) Act 2025, passed in the Budget Session, introduced three material changes relevant to hospitality asset resolution:</p>
<ol>
  <li><strong>Pre-packaged Resolution Plans (PPIRP) Extended to Hotel Assets</strong>: Previously limited to MSMEs, the PPIRP mechanism is now available for hospitality assets below ₹100 Cr enterprise value, significantly accelerating timelines for mid-scale hotel insolvency.</li>
  <li><strong>Operational Creditor Priority Enhancement</strong>: Employees and utility creditors now rank above secured creditors for the first 90 days of CIRP, affecting acquisition economics for strategic buyers.</li>
  <li><strong>NCLT Bench Expansion</strong>: 14 new circuit benches were notified in Q1 2025, reducing average hearing interval from 42 to 26 days. Resolution timelines for hospitality assets have compressed from an average 680 days (2022–23) to 380 days (2025 estimate).</li>
</ol>

<h2>The Distressed Hospitality Pipeline</h2>
<p>India Gully's Debt & Special Situations practice has tracked 64 hospitality assets admitted for CIRP between January 2024 and October 2025. Key observations:</p>
<ul>
  <li><strong>62% are mid-scale (3-star) properties</strong>, primarily in Tier 1 city periphery and Tier 2 markets</li>
  <li><strong>Average distress discount to replacement cost</strong>: 42–58% (versus 35% in 2022)</li>
  <li><strong>Operational hotel rate</strong> (properties generating some revenue during CIRP): 71%, up from 45% in 2019 — improved IRP protocols</li>
  <li><strong>Successful resolution rate</strong>: 38% (national average for all sectors: 29%) — hospitality outperforms</li>
</ul>

<h2>Emerging Buyer Profiles</h2>
<p>The composition of resolution applicants for hospitality assets has shifted materially in 2024–25:</p>
<h3>Strategic Hotel Operators (35% of resolutions)</h3>
<p>Branded mid-scale operators (Lemon Tree, Cygnett, Keys, Regenta) are increasingly submitting resolution plans to grow their owned portfolios at distressed acquisition costs. The typical strategy: acquire at ₹20–35L per key, refurbish at ₹8–12L per key, rebrand and operate at 65–75% occupancy within 18 months of reopening.</p>
<h3>Family Offices (28% of resolutions)</h3>
<p>India's growing base of high-net-worth family offices is the most active buyer segment. They typically seek distressed properties in leisure destinations (hill stations, heritage cities) with 15–20 year hold horizons, operating through management contracts with branded operators.</p>
<h3>Real Estate Funds (22%)</h3>
<p>Institutional real estate funds with hospitality mandates are targeting IBC acquisitions as a route to building scale quickly. These buyers tend to focus on larger assets (100+ keys) in Tier-1 cities.</p>
<h3>Promoter Buybacks (15%)</h3>
<p>Original promoters — often having addressed the original stress — submit competitive resolution plans. Regulatorily constrained but still a significant segment.</p>

<h2>The Post-Resolution Value Creation Playbook</h2>
<p>Based on India Gully's advisory on 8 completed distressed hotel acquisitions (2020–2025), the post-resolution value creation sequence is:</p>
<ol>
  <li><strong>Months 1–3</strong>: Operational stabilisation. Address deferred maintenance, settle operational creditors, rehire core staff. Revenue recovery to 40–50% of pre-stress levels.</li>
  <li><strong>Months 3–12</strong>: Brand on-boarding. Select and negotiate hotel brand. This is India Gully's primary advisory role — we have active relationships with every relevant brand and can compress brand on-boarding from 12 to 6 months in many cases.</li>
  <li><strong>Months 12–18</strong>: Refurbishment and reopening. Targeted FF&E / OS&E investment of ₹8–15L per key. India Gully's HORECA division executes this.</li>
  <li><strong>Months 18–36</strong>: Revenue ramp. Stabilised occupancy 65–75%. Brand loyalty programme ramp. F&B revenue development.</li>
  <li><strong>Year 3+</strong>: Asset value crystallisation. Typical IRR on acquisition-to-stabilisation: 22–35%.</li>
</ol>

<h2>Key Risk Factors</h2>
<p>India Gully's due diligence framework for distressed hotel acquisitions flags five primary risk categories:</p>
<ul>
  <li><strong>Title and encumbrance complexity</strong>: Multiple charge holders, disputed property boundaries, incomplete conveyance documents</li>
  <li><strong>Employee liability</strong>: Pending gratuity, PF dues, and employment disputes survive CIRP in certain interpretations</li>
  <li><strong>Structural condition</strong>: Deferred maintenance in CIRP can significantly exceed disclosed estimates</li>
  <li><strong>Brand recoverability</strong>: Properties that operated under sub-standard conditions during CIRP may face brand reputational challenges</li>
  <li><strong>Location dynamics</strong>: Market conditions at the original development site may have deteriorated</li>
</ul>

<h2>Conclusion</h2>
<p>The IBC 2025 amendments, combined with the compressed resolution timelines now being achieved at NCLT, make this an exceptionally favourable period for strategic acquirers of distressed hospitality assets. India Gully's integrated advisory — transaction advisory, brand on-boarding, and HORECA supply — provides the end-to-end capability required to execute a distressed acquisition and create post-resolution value efficiently.</p>
`,
  },
  {
    id: 'mall-mixed-use-integration',
    category: 'Retail',
    date: 'October 2025',
    title: 'The Mall-Hotel-Office Trinity: Mixed-Use Integration in Indian Retail Real Estate',
    excerpt: 'India\'s leading mall developers are pivoting from pure retail to mixed-use destinations. We study five live projects across NCR, Mumbai and Bengaluru, examining lease structure innovations, anchor tenant strategies, and financial models that make mixed-use work.',
    tags: ['Retail', 'Mixed-Use', 'Real Estate', 'Mall', 'Office'],
    readTime: '9 min read',
    body: `
<h2>The Pivot from Retail to Destination</h2>
<p>India's top-tier mall developers — DLF, Nexus, Phoenix, Brigade — are executing a fundamental strategic pivot. The pure-retail mall, designed exclusively for shopping, is giving way to the <strong>integrated mixed-use destination</strong>: a combination of retail, hospitality, office, entertainment, and civic amenities designed to capture multiple day-parts and visitor motivations.</p>
<p>India Gully's retail leasing and hospitality advisory practice has been directly involved in three of the five projects studied in this analysis. Our observations are grounded in live mandate experience, not secondary research.</p>

<h2>Why the Trinity Works: Economic Logic</h2>
<p>The financial case for the Mall-Hotel-Office trinity rests on three interlocking value drivers:</p>
<h3>1. Rental Uplift from Density</h3>
<p>Hotels and premium offices create a captive, high-spending population. Hotel guests with dining spend average 2.8× the retail spend of regular mall visitors. Office workers within integrated developments spend ₹1,200–1,800 per week on food and convenience retail — a highly predictable revenue stream for mall operators and their tenants.</p>
<h3>2. Land Efficiency</h3>
<p>Mixed-use developments achieve 30–40% higher Floor Space Index (FSI) utilisation versus single-use, enabled by vertical stacking of different uses. Premium mixed-use developments in Delhi NCR and Mumbai are achieving FSI of 2.5–4.0 versus 1.8–2.2 for pure retail.</p>
<h3>3. Risk Diversification</h3>
<p>Mixed-use income streams provide resilience against retail cyclicality. During COVID, integrated developments with hotels and offices recovered rental income 14 months faster than pure retail assets.</p>

<h2>Case Study: AIPL Joy Street, Gurugram</h2>
<p>India Gully provided retail leasing advisory for AIPL Joy Street, one of NCR's most successful mixed-use destination launches of 2023. Key observations:</p>
<ul>
  <li>F&B anchor (30% of GLA) outperformed projections by 22% in Year 1</li>
  <li>Office component (3 floors, 180,000 sq ft) achieved full occupancy 9 months before retail completion</li>
  <li>Hotel pre-opening enquiry volume was 4× that of standalone hotel comparable</li>
  <li>Retail rental premium over comparable pure malls: 17–22%</li>
</ul>

<h2>Lease Structure Innovations</h2>
<p>Mixed-use development requires lease structure innovation that pure retail does not. India Gully has advised on and negotiated the following approaches:</p>
<h3>Cross-Amenity Leases</h3>
<p>Tenants in integrated developments are increasingly seeking <strong>cross-asset access rights</strong> — office tenants negotiating parking rights in the mall structure, hotel guests receiving preferential retail rates, loyalty programme integration across all components. These require multi-party lease agreements that most retail lease professionals are not structured to handle.</p>
<h3>Revenue Participation</h3>
<p>Mixed-use developers are moving from pure fixed rent to <strong>base rent + revenue share</strong> models — particularly for F&B anchors and entertainment components. India Gully structures these as: Base = 65% of market rent + 4–7% of net revenue above a turnover threshold.</p>
<h3>Green Lease Provisions</h3>
<p>New integrated developments in India's top 5 cities are incorporating green lease provisions covering energy consumption sharing, waste management obligations, and sustainability reporting — a requirement emerging from ESG-mandated institutional investors.</p>

<h2>The Anchor Strategy</h2>
<p>In mixed-use destination retail, the anchor tenant strategy must account for all three components. India Gully's recommended anchor configuration for a 500,000 sq ft mixed-use development:</p>
<ul>
  <li><strong>Hotel anchor</strong> (150–200 keys, mid-upscale brand): Provides footfall catalyst, event venue, and F&B magnets. Best position: above or adjacent to premium retail zone.</li>
  <li><strong>F&B destination floor</strong> (15,000–25,000 sq ft, 6–10 operators): Drive-to destination. Include one fine-dining, two casual, two QSR, one pan-Asian, one bar/lounge.</li>
  <li><strong>Entertainment anchor</strong> (multiplex or FEC, 20,000–40,000 sq ft): Evening and weekend traffic generator. Critical for family demographics.</li>
  <li><strong>Office anchor</strong> (50,000–80,000 sq ft, single corporate tenant): Provides daytime food and convenience footfall reliability.</li>
</ul>

<h2>Conclusion</h2>
<p>The Mall-Hotel-Office trinity is not a concept — it is the new standard for Grade-A retail destination development in India. Developers who attempt to build pure retail in Tier-1 cities from 2026 onwards will face financing, leasing, and valuation headwinds. India Gully's integrated retail leasing and hospitality advisory capability is uniquely positioned to support mixed-use destination development from concept through occupancy.</p>
`,
  },
  {
    id: 'greenfield-midscale-hotels',
    category: 'Hospitality',
    date: 'September 2025',
    title: 'The Greenfield Mid-Scale Hotel Opportunity: Project Economics for 2025-27',
    excerpt: 'Mid-scale branded hotel development in India offers compelling risk-adjusted returns. We model the economics for 80-key and 120-key projects across 12 Tier 2 cities, covering land costs, construction timelines, brand fee structures and stabilised RevPAR projections.',
    tags: ['Hospitality', 'Greenfield', 'Hotel', 'Investment', 'Tier 2'],
    readTime: '11 min read',
    body: `
<h2>The Mid-Scale Opportunity</h2>
<p>India's branded hotel supply is significantly skewed toward the luxury and upper-upscale segments. The <strong>mid-scale branded segment</strong> (3-star, ₹3,000–6,000 average daily rate) represents the most significant supply-demand gap in the Indian hospitality market. Demand is robust and growing at 12–15% per annum; branded supply growth is 8–10%.</p>
<p>India Gully's hotel management and brand on-boarding practice has assessed or executed mid-scale greenfield projects in 15 cities over the past 3 years. This article models the project economics based on those live mandates.</p>

<h2>The 80-Key Model: Tier 2 City</h2>
<h3>Land and Development Cost</h3>
<ul>
  <li>Land (0.6–0.8 acres, commercial zone): ₹3.5–7 Cr (city-dependent)</li>
  <li>Construction cost (80 keys, branded mid-scale standard): ₹18–24 Cr</li>
  <li>FF&E/OS&E (India Gully HORECA procurement): ₹4.5–6 Cr</li>
  <li>Pre-opening and working capital: ₹1.5–2 Cr</li>
  <li><strong>Total development cost: ₹27–39 Cr</strong> (₹34–49L per key)</li>
</ul>

<h3>Revenue Assumptions (Year 3 Stabilised)</h3>
<ul>
  <li>Occupancy: 68–72% (branded mid-scale, Tier 2)</li>
  <li>Average Daily Rate: ₹3,800–4,800</li>
  <li>RevPAR: ₹2,580–3,456</li>
  <li>F&B contribution: 28–32% of total revenue</li>
  <li><strong>Total revenue Year 3: ₹8–11 Cr</strong></li>
</ul>

<h3>EBITDA and Returns</h3>
<ul>
  <li>Hotel EBITDA margin (branded mid-scale): 28–35%</li>
  <li>EBITDA Year 3: ₹2.2–3.9 Cr</li>
  <li>Yield on development cost: 8–13%</li>
  <li>Cap rate (mid-scale hotel, Tier 2): 8.5–10.5%</li>
  <li>Implied capital value at stabilisation: ₹21–46 Cr</li>
  <li><strong>Equity IRR (8-year hold): 16–23%</strong></li>
</ul>

<h2>Brand Selection: The Revenue Multiplier</h2>
<p>Brand choice is the single most impactful variable in mid-scale hotel project economics. India Gully's brand on-boarding experience across Cygnett, Keys, Regenta, Pride, and Lemon Tree reveals the following:</p>
<ul>
  <li><strong>RevPAR premium over independent hotels</strong>: 22–38% for top-tier mid-scale brands</li>
  <li><strong>Faster occupancy ramp</strong>: Branded hotels reach 65% occupancy on average 7 months faster than independent</li>
  <li><strong>Brand fee impact on EBITDA</strong>: Management fee + royalty = 8–12% of total revenue. Net benefit remains strongly positive.</li>
</ul>
<p>India Gully's recommendation: for 80-key Tier 2 properties, <strong>Cygnett, Keys, or Regenta</strong> offer the optimal brand fee / RevPAR premium equation. For 120-key+ projects, Lemon Tree Premier or Radisson RED become competitive.</p>

<h2>Construction and Pre-Opening Timeline</h2>
<p>Based on India Gully's project management experience:</p>
<ol>
  <li><strong>Month 1–3</strong>: Land acquisition, approvals, brand selection</li>
  <li><strong>Month 3–6</strong>: Design development, tender</li>
  <li><strong>Month 6–22</strong>: Construction (80-key standard)</li>
  <li><strong>Month 20–26</strong>: FF&E procurement, installation (India Gully HORECA)</li>
  <li><strong>Month 24–28</strong>: Staffing, training, mock inspections, soft opening</li>
  <li><strong>Month 28–30</strong>: Grand opening, brand loyalty programme activation</li>
</ol>

<h2>Top 5 Markets for 2025–27 Greenfield Mid-Scale</h2>
<p>India Gully's market assessment identifies the following as priority markets for 2025–27 greenfield mid-scale development:</p>
<ol>
  <li><strong>Chandigarh / Mohali / Panchkula</strong>: Strong corporate demand, limited branded mid-scale supply. RevPAR growth 14% YoY.</li>
  <li><strong>Dehradun / Haridwar</strong>: Religious and leisure tourism boom. Weekend demand spikes 3–4×.</li>
  <li><strong>Coimbatore</strong>: Industrial and IT growth corridor. Under-served by branded mid-scale.</li>
  <li><strong>Ahmedabad (outer corridors)</strong>: GIFT City and industrial demand, strong MICE potential.</li>
  <li><strong>Bhubaneswar</strong>: Government-backed convention and tourism infrastructure. Early-mover advantage for branded operators.</li>
</ol>

<h2>Conclusion</h2>
<p>Greenfield mid-scale hotel development in India's Tier 2 markets offers a rare combination of structural demand growth, manageable capital requirements, and institutional-grade returns. India Gully's integrated offer — from site selection and brand on-boarding through HORECA procurement and operations advisory — provides the end-to-end support that first-time hotel developers require to execute successfully.</p>
`,
  },
  {
    id: 'india-hospitality-2024',
    category: 'Hospitality',
    date: 'December 2024',
    title: 'India Hospitality Market Outlook 2024-2025',
    excerpt: 'India\'s hospitality sector is experiencing unprecedented growth, driven by domestic travel resurgence, infrastructure investment and international brand expansion. We examine key demand drivers, market dynamics and investment opportunities across segments.',
    tags: ['Hospitality','Market Research','Investment'],
    readTime: '8 min read',
    body: `
<h2>Overview</h2>
<p>India's hospitality market entered 2024 with strong structural tailwinds: rising domestic travel, pent-up leisure demand, significant infrastructure investment, and accelerating international brand expansion. This report examines the key dynamics and investment opportunities for the 2024–2025 horizon.</p>

<h2>Demand Drivers</h2>
<p>Domestic leisure travel volumes reached 120% of pre-COVID peaks by Q3 2024, driven by a growing upper-middle-income class with increased disposable income and changing lifestyle priorities. Business travel has recovered to 95% of 2019 levels, with MICE (Meetings, Incentives, Conferences, Exhibitions) driving disproportionate growth.</p>
<p>India's inbound international tourism grew 28% YoY in 2024, supported by expanded air connectivity and streamlined visa processes under the e-Visa programme expansion.</p>

<h2>Supply Pipeline</h2>
<p>The branded hotel supply pipeline in India stands at approximately 165,000 keys across all segments — the largest pipeline in Asia-Pacific excluding China. The mid-scale and economy segments account for 62% of the pipeline, reflecting promoter confidence in the mass-market segment.</p>
<p>Key supply markets in the pipeline: NCR (22,000 keys), Mumbai Metropolitan Region (18,000 keys), Bengaluru (14,000 keys), Hyderabad (11,000 keys), Goa (8,500 keys).</p>

<h2>Investment Opportunities</h2>
<p>India Gully identifies three primary investment themes in hospitality for 2024–2025:</p>
<ol>
  <li><strong>Mid-scale branded greenfield</strong>: Best risk-adjusted returns in Tier 2 cities. 16–23% equity IRR based on our project models.</li>
  <li><strong>Distressed asset acquisition via IBC/NCLT</strong>: Growing pipeline of operationally viable hotels in CIRP. Acquisition discounts of 40–55% to replacement cost.</li>
  <li><strong>Heritage and experiential hospitality</strong>: India's heritage hotel segment commands premium ARR and international demand. Acquisition and conversion of heritage properties in Rajasthan, Kerala, and Himachal Pradesh.</li>
</ol>

<h2>India Gully's Advisory Role</h2>
<p>India Gully serves as transaction advisor, brand on-boarding partner, and HORECA procurement specialist across the full hospitality investment lifecycle. Our active 2024–2025 hospitality mandate pipeline spans 15+ projects across India.</p>
`,
  },
  {
    id: 'entertainment-destinations-india',
    category: 'Entertainment',
    date: 'November 2024',
    title: 'The Rise of Integrated Entertainment Destinations in India',
    excerpt: 'India\'s entertainment real estate sector is entering a transformational phase, with ₹15,000+ Cr of integrated entertainment destinations in planning or execution. We analyse the structural drivers, developer strategies and investment thesis.',
    tags: ['Entertainment','Real Estate','Trends'],
    readTime: '12 min read',
    body: `
<h2>A Transformational Moment</h2>
<p>India's entertainment real estate sector is at an inflection point. After decades of incremental development — standalone multiplex complexes, small FECs, single-ride attractions — the country is entering an era of large-format, capital-intensive, experience-led entertainment destinations. India Gully is actively engaged across hospitality and mixed-use entertainment advisory mandates at the centre of this transformation.</p>

<h2>The Structural Drivers</h2>
<p>Four structural forces are converging to create this opportunity:</p>
<ul>
  <li><strong>Rising aspirational middle class</strong>: India's 350 million-strong aspirational middle class is the primary demand driver. Spending on experiences has grown at 18% CAGR since 2019 versus 7% for goods.</li>
  <li><strong>Real estate developer diversification</strong>: Major real estate developers are allocating 15–25% of their portfolios to experience and entertainment to differentiate destinations and drive footfall to their mixed-use developments.</li>
  <li><strong>International operator expansion</strong>: Global entertainment operators (including several household names) have active India expansion mandates. India Gully represents several in their site selection and partner search.</li>
  <li><strong>State government competition</strong>: At least 8 state governments have announced entertainment destination promotion policies in 2023–24, including Maharashtra, UP, Rajasthan, Tamil Nadu, and Karnataka.</li>
</ul>

<h2>India Gully's Entertainment Advisory Approach</h2>
<p>India Gully's entertainment advisory practice focuses on integrated destination mandates that combine hospitality, retail, F&B, and experience components. Our team advises on site selection, regulatory clearances, operator identification, and capital structuring for large-format entertainment destinations across India's key entertainment real estate corridors.</p>

<h2>Investment Considerations</h2>
<p>Entertainment real estate requires a different risk-return framework than conventional commercial or hospitality real estate. Key considerations:</p>
<ul>
  <li><strong>IP risk</strong>: Themed attractions require IP licensing. India Gully maps IP availability and negotiates licensing structures.</li>
  <li><strong>Operational complexity</strong>: Entertainment destinations are operationally intensive. Management agreement structure is critical.</li>
  <li><strong>Phasing strategy</strong>: Large entertainment destinations should be phased to validate demand before committing full capital.</li>
  <li><strong>Infrastructure dependency</strong>: Road, metro, and utility access are critical success factors often underestimated in initial feasibility.</li>
</ul>
`,
  },
  {
    id: 'horeca-procurement-strategy',
    category: 'HORECA',
    date: 'October 2024',
    title: 'HORECA Procurement Strategy for New Hotel Openings',
    excerpt: 'Pre-opening FF&E and OS&E procurement is one of the most complex and often underestimated challenges in hotel development. We outline a structured approach to specification, vendor management and timeline control.',
    tags: ['HORECA','Hotel Management','Operations'],
    readTime: '6 min read',
    body: `
<h2>The Pre-Opening Procurement Challenge</h2>
<p>Hotel pre-opening procurement — covering FF&E (Furniture, Fixtures & Equipment), OS&E (Operating Supplies & Equipment), kitchen equipment, linen, uniform, and amenities — is consistently underestimated by first-time hotel developers. India Gully's HORECA practice has rectified procurement failures on 7 of our last 15 hotel mandates where the developer had initially self-procured without specialist support.</p>

<h2>The Specification Cascade</h2>
<p>All procurement must flow from the <strong>brand standard specification</strong> issued by the hotel operator. This creates a specification cascade:</p>
<ol>
  <li>Brand standard specification → Master specification list (India Gully: 500+ SKUs)</li>
  <li>Master spec → Local adaptation (material availability, lead time, cost)</li>
  <li>Local adaptation → Vendor identification and shortlisting</li>
  <li>Vendor shortlisting → Sample approval → Order placement</li>
  <li>Order → Delivery, inspection, snagging</li>
</ol>

<h2>Common Procurement Failures</h2>
<ul>
  <li><strong>Under-specification of kitchen equipment</strong>: Commercial kitchen specification requires brand, capacity, and utility connection matching — not simply a product category</li>
  <li><strong>Linen quantity error</strong>: Correct par stock calculation is 3–4× room count, not 2× — understocking disrupts operations from Day 1</li>
  <li><strong>Amenity sourcing delays</strong>: Brand-specified amenity kits often have 8–12 week lead times from authorised suppliers</li>
  <li><strong>Last-mile logistics failure</strong>: Remote hotel locations require logistics-aware procurement with buffer timing</li>
</ul>

<h2>India Gully's HORECA Service</h2>
<p>India Gully provides end-to-end HORECA procurement advisory and execution, from specification development through delivery and handover. Our vendor network of 50+ qualified suppliers, consolidated procurement model, and on-site supervision ensures brand standards compliance and timeline delivery.</p>
`,
  },
  {
    id: 'debt-special-situations-hospitality',
    category: 'Debt & Special Situations',
    date: 'September 2024',
    title: 'Distressed Hotel Assets: Opportunities in the IBC Landscape',
    excerpt: 'The IBC/NCLT process has created a pipeline of distressed hospitality assets offering compelling entry valuations for strategic investors. We outline the acquisition framework, due diligence approach and value-creation thesis.',
    tags: ['Debt','IBC','Hospitality','Special Situations'],
    readTime: '10 min read',
    body: `
<h2>The IBC Opportunity in Hospitality</h2>
<p>Since the Insolvency and Bankruptcy Code (IBC) was enacted in 2016, India's hospitality sector has seen over 150 hotel properties admitted for Corporate Insolvency Resolution Process (CIRP). This pipeline presents a unique acquisition opportunity for strategic investors with the operational capability to execute post-resolution value creation.</p>

<h2>Why Hotels Enter CIRP</h2>
<p>The primary causes of hotel insolvency in India are:</p>
<ul>
  <li><strong>Overleveraged development financing</strong>: Many properties were built at 70–80% debt, with debt service coverage ratios that required stabilised performance from Year 1 — rarely achievable.</li>
  <li><strong>COVID-19 disruption</strong>: Properties with thin equity cushions were unable to service debt during the 18–24 month COVID closure period.</li>
  <li><strong>Promoter-related stress</strong>: Group-level financial distress triggering default on performing hotel assets.</li>
</ul>

<h2>Acquisition Framework</h2>
<p>India Gully's distressed hotel acquisition framework involves four stages:</p>
<ol>
  <li><strong>Pipeline identification</strong>: Monitoring NCLT cause lists, IRP appointments, and industry intelligence for hospitality CIRP admissions</li>
  <li><strong>Preliminary assessment</strong>: Operational viability, location, asset condition, claim structure</li>
  <li><strong>Detailed due diligence</strong>: Title, structural, regulatory, operational, and financial DD</li>
  <li><strong>Resolution plan structuring</strong>: India Gully advises resolution applicants on plan structuring to maximise resolution probability while optimising acquisition economics</li>
</ol>

<h2>Post-Resolution Value Creation</h2>
<p>The primary value drivers in distressed hotel acquisition are: brand on-boarding premium (22–38% RevPAR uplift), refurbishment ROI (typically 4–6× capital at stabilisation), and operational efficiency recovery from deferred maintenance correction.</p>
<p>India Gully's integrated offer — transaction advisory + brand on-boarding + HORECA procurement — is uniquely positioned to execute the full post-resolution value creation playbook.</p>
`,
  },
  {
    id: 'retail-leasing-malls-india',
    category: 'Retail',
    date: 'August 2024',
    title: 'Mall Leasing Strategy in the Experience Economy',
    excerpt: 'India\'s retail malls are evolving from pure shopping destinations to integrated experience hubs, requiring a fundamental rethinking of tenant mix, space allocation and lease structures. We explore what\'s working and what\'s not.',
    tags: ['Retail','Leasing','Consumer Trends'],
    readTime: '9 min read',
    body: `
<h2>The Experience Imperative</h2>
<p>India's top-performing malls of 2023–24 share a common characteristic: a deliberate shift from pure retail to experience-led destinations. Footfall in experience-anchored malls grew 18% YoY versus 4% for conventional retail-only malls. India Gully's retail leasing practice, active across 8 mall and mixed-use developments, has observed this shift directly in tenant demand, lease terms, and CAM contribution.</p>

<h2>Tenant Mix Recalibration</h2>
<p>The optimal tenant mix for a Grade-A mall in India's Tier 1 cities in 2024 is:</p>
<ul>
  <li><strong>F&B and dining</strong>: 25–32% of GLA (up from 18–22% in 2018)</li>
  <li><strong>Entertainment and leisure</strong>: 12–18% (up from 8–10%)</li>
  <li><strong>Fashion and apparel</strong>: 28–32% (down from 42–48%)</li>
  <li><strong>Beauty and wellness</strong>: 8–10% (up from 4–6%)</li>
  <li><strong>Technology and electronics</strong>: 6–8% (stable)</li>
  <li><strong>Other specialty</strong>: Balance</li>
</ul>

<h2>F&B as the Revenue Engine</h2>
<p>Food and beverage has emerged as the highest-performing and most resilient category in Indian retail real estate. India Gully's active F&B leasing at Entertainment City, Gardens Galleria, AIPL Joy Street, and Hyatt Andaz demonstrates:</p>
<ul>
  <li>F&B tenants command 12–22% higher base rent than comparable retail per sq ft</li>
  <li>F&B revenue share clauses generate 35–40% of total mall revenue participation receipts</li>
  <li>F&B anchor draws from a 25–35km catchment versus 15–20km for fashion retail</li>
</ul>

<h2>Lease Structure Innovation</h2>
<p>Experience-economy leasing requires structures different from conventional minimum guarantee + revenue share:</p>
<ul>
  <li><strong>Turnover linked leases</strong>: Base rent at 60–70% of market, high participation above turnover threshold</li>
  <li><strong>Fit-out contribution</strong>: Landlords increasingly contributing 15–25% of fit-out cost for anchor F&B and experience tenants in exchange for longer leases</li>
  <li><strong>Activity covenants</strong>: F&B and entertainment leases now include minimum operating hour and event programming obligations</li>
</ul>

<h2>India Gully's Retail Practice</h2>
<p>India Gully's retail leasing team has placed 30+ brands across India's premier mall and mixed-use developments. We bring both demand-side (brand relationships) and supply-side (developer advisory) perspectives to every mandate, ensuring optimal outcomes for all parties.</p>
`,
  },
  {
    id: 'greenfield-hotel-development',
    category: 'Hospitality',
    date: 'July 2024',
    title: 'Greenfield Hotel Development in Tier 2 & 3 India',
    excerpt: 'Branded hotel supply in India\'s Tier 2 and Tier 3 cities remains significantly undersupplied relative to growing demand. We analyse demand fundamentals, brand positioning considerations and the project economics in this high-potential segment.',
    tags: ['Hospitality','Greenfield','Real Estate'],
    readTime: '11 min read',
    body: `
<h2>The Supply Gap</h2>
<p>India's Tier 2 and Tier 3 cities represent the most significant hotel supply gap in Asia. Branded room supply per 100,000 population in cities like Coimbatore, Vizag, Bhubaneswar, Jammu, and Srinagar is 6–12 keys — versus 35–65 keys in Mumbai and Delhi, and 80–120 keys in comparable South-East Asian cities.</p>
<p>Demand is not the constraint — occupancy at existing branded properties in these markets regularly exceeds 80% on weekdays, with weekend spikes to 95%+. The constraint is supply: risk-averse developers, limited financing, and the absence of experienced development partners.</p>

<h2>Demand Drivers in Tier 2/3</h2>
<ul>
  <li><strong>Industrial and corporate demand</strong>: Manufacturing corridors (National Industrial Corridor), pharmaceutical clusters, and IT parks are generating structured corporate travel demand in Tier 2 cities.</li>
  <li><strong>Religious and pilgrimage tourism</strong>: India's pilgrimage circuit — Vaishno Devi, Tirupati, Shirdi, Amarnath, Char Dham — handles 200M+ visitors annually, the vast majority currently accommodated in unbranded guesthouses.</li>
  <li><strong>Wedding and MICE</strong>: India's wedding industry (₹4.25 lakh crore) and growing corporate MICE market are driving demand for quality banquet and accommodation facilities in Tier 2 cities.</li>
  <li><strong>Government and PSU travel</strong>: State capitals and administrative centres generate consistent government and PSU travel — a captive, brand-agnostic demand segment.</li>
</ul>

<h2>Brand Considerations</h2>
<p>Brand selection is the most critical development decision for Tier 2 greenfield. India Gully's brand on-boarding experience provides a differentiated perspective:</p>
<ul>
  <li><strong>Economy (₹2,000–3,500 ADR)</strong>: Lemon Tree Express, Keys Lite, Ginger — lowest capital requirements, fastest ramp</li>
  <li><strong>Mid-Scale (₹3,500–6,000 ADR)</strong>: Cygnett, Keys Select, Regenta, Pride — optimal for most Tier 2 markets</li>
  <li><strong>Upscale (₹6,000–12,000 ADR)</strong>: Radisson Blu, Marriott Courtyard, Novotel — appropriate for state capitals and industrial Tier 2 cities</li>
</ul>

<h2>Financing Structure</h2>
<p>Tier 2 greenfield hotels are increasingly bankable. SBI, HDFC, and several NBFCs have dedicated hospitality lending desks with Tier 2 experience. Typical financing structure:</p>
<ul>
  <li>Debt: 55–65% of project cost (branded hotel, Tier 2)</li>
  <li>Promoter equity: 25–35%</li>
  <li>DSCR requirement: 1.35× from Year 3</li>
  <li>Moratorium: 24–30 months (pre-opening + ramp-up)</li>
</ul>

<h2>India Gully's Development Support</h2>
<p>India Gully provides end-to-end support for Tier 2 greenfield hotel development: site identification, feasibility, brand on-boarding, HORECA procurement, pre-opening project management, and operations advisory. For first-time hotel developers, we serve as the single partner for the entire development journey.</p>
`,
  },
  {
    id: 'mall-hotel-office-trinity',
    category: 'Retail',
    date: 'March 2026',
    title: 'The Mall-Hotel-Office Trinity: Mixed-Use Integration in Indian Retail Real Estate',
    excerpt: 'India\'s most successful new retail developments are no longer standalone malls — they are integrated destinations combining retail, hospitality, and office in a single master plan. We examine the economic logic, FSI advantages, and operational integration strategies that are redefining retail real estate in India.',
    tags: ['Retail', 'Mixed-Use', 'Real Estate', 'Hospitality'],
    readTime: '9 min read',
    body: `
<h2>The Economic Logic of Integration</h2>
<p>India's retail real estate sector is undergoing a fundamental structural shift. The standalone mall — once the dominant format — is losing ground to <strong>integrated mixed-use destinations</strong> that combine retail anchors, branded hotels, and Grade-A office in a single master-planned development. India Gully's advisory work across eight active mixed-use mandates in 2025–26 has crystallised three compelling economic arguments for integration:</p>
<ol>
  <li><strong>Retail uplift from hotel guests</strong>: Hotel guests within an integrated development spend 2.8× more in the retail podium than casual footfall. The captive guest spend on F&B, lifestyle, and wellness creates a baseline revenue floor that is independent of the external retail cycle.</li>
  <li><strong>FSI efficiency</strong>: Mixed-use designations in most state DCRs allow <strong>30–40% higher FSI</strong> than standalone commercial or retail (2.5–4.0 FAR vs 1.8–2.2 FAR for standalone mall). On the same land parcel, a developer can build 30–40% more sellable / leasable area, materially improving project economics.</li>
  <li><strong>Income diversification</strong>: Retail income (variable, footfall-linked) is balanced by hotel operating income (RevPAR-linked) and office lease income (fixed, long-term). This reduces covenant risk and typically commands a 25–40 basis point compression on construction financing.</li>
</ol>

<h2>The AIPL Joy Street Case Study</h2>
<p>India Gully's advisory involvement in the AIPL Joy Street development in Gurugram provides a detailed case study of the mall-hotel-office trinity in practice. The 1.8 million sq ft integrated destination — comprising a 650,000 sq ft retail mall, a 320-key business hotel, and 480,000 sq ft of Grade-A office — delivered the following outcomes versus standalone benchmarks:</p>
<ul>
  <li><strong>F&amp;B anchor outperformance</strong>: 22% rental uplift versus comparable standalone mall F&B anchors, attributed to hotel-guest dining demand</li>
  <li><strong>Office occupancy</strong>: Reached full occupancy 9 months earlier than standalone office benchmarks in the micro-market, driven by amenity access and hotel-rate corporate accommodation</li>
  <li><strong>Hotel enquiry volume</strong>: 4× standalone hotel benchmark for corporate group bookings, driven by adjacency to office occupiers</li>
  <li><strong>Retail rent premium</strong>: 17–22% premium over standalone mall benchmarks for non-anchor retail, reflecting destination positioning</li>
</ul>

<h2>Tenant Mix Strategy for Integrated Retail</h2>
<p>The tenant mix strategy for integrated mixed-use retail requires a fundamentally different approach from standalone malls. India Gully's framework distinguishes three tenant categories:</p>
<h3>Destination Anchors (15–20% of GLA)</h3>
<p>Large-format retailers, multiplex operators, hypermarkets, or F&B destinations that generate primary footfall. In integrated developments, the hotel lobby and co-working/managed office hub function as additional destination anchors, reducing dependence on a single retail anchor.</p>
<h3>Experience Operators (25–35% of GLA)</h3>
<p>Formats that benefit directly from hotel-guest and office-worker captive demand: fine dining, casual dining, premium fitness, wellness, spa, and entertainment. Experience operators are the primary beneficiaries of the mixed-use premium and should be given priority in the leasing programme.</p>
<h3>Convenience and Services (50–60% of GLA)</h3>
<p>Fashion, lifestyle, and convenience retail that benefit from the destination positioning but are less directly linked to hotel/office demand. Maintain flexibility through shorter initial terms (3+3) to allow for tenant mix evolution.</p>

<h2>Operational Integration: The Shared Services Model</h2>
<p>The most progressive integrated developments are moving towards a <strong>shared services model</strong> that pools hotel, office, and retail operational infrastructure. India Gully has developed an operational integration framework that covers:</p>
<ul>
  <li><strong>Security and FM</strong>: Single integrated FM contract (typically 15–20% cost saving vs separate contracts)</li>
  <li><strong>Parking management</strong>: Dynamic pricing across retail, hotel, and office parking inventory</li>
  <li><strong>Digital infrastructure</strong>: Unified guest WiFi, loyalty platform, and digital directory serving retail customers, hotel guests, and office occupiers</li>
  <li><strong>F&amp;B commissary</strong>: Shared central kitchen infrastructure for hotel F&amp;B and food court operations</li>
  <li><strong>Event programming</strong>: Coordinated event calendar leveraging hotel ballroom, retail atrium, and outdoor plaza collectively</li>
</ul>

<h2>Cross-Amenity Leases</h2>
<p>Tenants in integrated developments are increasingly seeking <strong>cross-asset access rights</strong> — office tenants negotiating parking rights in the retail podium, hotel corporate rate agreements for office occupier employees, and retail tenant access to hotel fitness and spa at preferential rates. These cross-amenity lease structures are a powerful retention tool and a competitive differentiator in the leasing market.</p>

<h2>Planning and Regulatory Considerations</h2>
<p>Successfully achieving mixed-use zoning requires early engagement with planning authorities. India Gully recommends the following regulatory engagement sequence:</p>
<ol>
  <li>Pre-application meeting with ULB/Development Authority to confirm mixed-use eligibility</li>
  <li>FSI calculation and loading analysis across proposed uses</li>
  <li>Traffic impact assessment (mixed-use destinations generate 35–50% lower peak traffic than standalone mall of equivalent GLA)</li>
  <li>Environmental clearance (for developments above 20,000 sq m, EIA notification threshold)</li>
  <li>Fire NOC for integrated development (complex multi-use egress requirements)</li>
</ol>

<h2>Investment Outlook</h2>
<p>India Gully's pipeline analysis indicates that the next generation of Indian retail real estate investment will be dominated by mixed-use integrated formats. Our active retail mandate pipeline includes three mixed-use developments totalling ₹2,400 Cr in project cost — all incorporating the mall-hotel-office trinity. The yields being achieved — retail cap rates of 7.5–9.0%, hotel yield on cost of 9–11%, office cap rates of 7–8% — are each superior to standalone format benchmarks, with the combination providing a risk-adjusted return profile that is compelling for domestic and institutional investors.</p>
`,
  },
  {
    id: 'horeca-tier2-supply-chain-deep-dive',
    category: 'HORECA',
    date: 'February 2026',
    title: 'Building Resilient HORECA Supply Chains in Tier 2 India',
    excerpt: 'Hotel and F&B operators in India\'s Tier 2 and Tier 3 cities face a structural procurement challenge: fragmented vendors, no specialist OS&E suppliers, and pre-opening costs 18–25% above Tier 1 benchmarks. India Gully\'s Hub-and-Spoke procurement model, refined across 15+ hotel projects, delivers 14% average cost savings.',
    tags: ['HORECA', 'Supply Chain', 'Hospitality', 'Tier 2'],
    readTime: '7 min read',
    body: `
<h2>The Tier 2 HORECA Supply Challenge</h2>
<p>India's Tier 2 and Tier 3 hotel markets — cities like Chandigarh, Bhubaneswar, Coimbatore, Jammu, Nashik, and Mysuru — are experiencing their strongest period of branded hotel supply growth in a decade. Yet the supply chain infrastructure required to commission and operate these properties has not kept pace with development velocity.</p>
<p>India Gully's HORECA procurement practice, operating across 15+ hotel projects in Tier 2 markets, has documented a consistent set of supply chain pathologies that drive up pre-opening costs and compromise operational quality:</p>
<ul>
  <li><strong>Vendor fragmentation</strong>: A typical 80-key Tier 2 hotel requires 1–3 FF&E suppliers and has virtually no access to specialist OS&E (Operating Supplies &amp; Equipment) vendors. Procurement is handled piecemeal, with no consolidated buying leverage.</li>
  <li><strong>Quality inconsistency</strong>: Without established vendor relationships or quality-assurance frameworks, delivered products frequently deviate from specification. India Gully's project records document an average 18% product non-conformance rate in unmanaged Tier 2 procurement versus &lt;4% under managed procurement.</li>
  <li><strong>Logistics complexity</strong>: Last-mile delivery to Tier 2 cities adds 12–18% to logistics cost and 3–6 weeks to delivery timelines. Without proper procurement sequencing, pre-opening programmes slip consistently.</li>
  <li><strong>Cost impact</strong>: Pre-opening procurement costs in unmanaged Tier 2 projects run 18–25% above Tier 1 benchmarks — a paradox, since land and construction costs in Tier 2 are lower. The supply chain premium erodes a significant portion of the location cost advantage.</li>
</ul>

<h2>The Hub-and-Spoke Procurement Model</h2>
<p>India Gully's response to Tier 2 supply chain fragmentation is a proprietary <strong>Hub-and-Spoke Procurement Model</strong> that consolidates buying, quality assurance, and logistics management through three operational phases:</p>

<h3>Phase 1: Category Consolidation (Months -18 to -12 pre-opening)</h3>
<p>All FF&amp;E and OS&amp;E categories are mapped to a master procurement schedule. India Gully's category specialists review brand standard specifications and identify where consolidation can achieve buying leverage. The 500+ SKU procurement is grouped into 8 master categories, each managed by a category specialist:</p>
<ol>
  <li>Room FF&amp;E (beds, mattresses, seating, case goods)</li>
  <li>Guest amenities (toiletries, linen, soft goods)</li>
  <li>Kitchen equipment (commercial cooking, cold storage, dishwashing)</li>
  <li>F&amp;B OS&amp;E (crockery, glassware, cutlery, serving equipment)</li>
  <li>Engineering and maintenance supplies</li>
  <li>Uniforms and housekeeping supplies</li>
  <li>IT and AV infrastructure</li>
  <li>Wellness and fitness equipment</li>
</ol>

<h3>Phase 2: Vendor Qualification and Committed Supply (Months -12 to -6)</h3>
<p>India Gully's vendor panel — built over 8 years and 15+ hotel projects — provides Tier 2 projects with access to pre-qualified suppliers across all 8 categories. Vendor qualification includes factory audits, sample approval, financial health assessment, and logistics capability review. <strong>Committed supply agreements</strong> (quantity + price + delivery window) are secured 6 months in advance of delivery, locking in cost and eliminating last-minute premium procurement.</p>

<h3>Phase 3: Logistics Sequencing and Quality Gate (Months -6 to Opening)</h3>
<p>Delivery sequencing is planned against the construction and fit-out programme. India Gully operates a <strong>3-stage quality gate</strong>: factory inspection (pre-despatch), transit monitoring (GPS tracking for high-value items), and site receiving inspection. Non-conforming items are flagged and replaced before they can delay the pre-opening programme.</p>

<h2>Performance Metrics Across 15+ Hotel Projects</h2>
<p>India Gully's Hub-and-Spoke model has been applied across hotel projects ranging from 40-key boutique properties to 180-key full-service hotels. Aggregate performance metrics:</p>
<ul>
  <li><strong>500+ SKUs</strong> managed per project across 8 categories</li>
  <li><strong>₹50 Cr+ total procurement</strong> managed through the model (cumulative)</li>
  <li><strong>50+ qualified vendors</strong> across FF&amp;E, OS&amp;E, kitchen, and soft goods categories</li>
  <li><strong>98.2% on-time delivery rate</strong> (vs industry average of 82% in unmanaged Tier 2 procurement)</li>
  <li><strong>14% average cost saving</strong> versus owner-managed procurement (primarily through volume aggregation and early commitment)</li>
  <li><strong>&lt;4% non-conformance rate</strong> versus 18% industry average in unmanaged Tier 2 projects</li>
</ul>

<h2>Case Study: Hotel Rajshree &amp; Spa, Chandigarh</h2>
<p>India Gully's HORECA procurement support for Hotel Rajshree &amp; Spa — a 41-key boutique hotel with spa in Chandigarh — illustrates the model in practice. The property was acquired through India Gully's advisory mandate and required a full OS&amp;E and partial FF&amp;E refresh for brand repositioning:</p>
<ul>
  <li><strong>Scope</strong>: Complete OS&amp;E for F&amp;B (restaurant + bar + room service), spa soft goods, kitchen equipment upgrade, uniform programme</li>
  <li><strong>Timeline</strong>: 14-week procurement and delivery programme</li>
  <li><strong>Vendors mobilised</strong>: 12 specialist suppliers across 6 categories</li>
  <li><strong>Cost outcome</strong>: 11% saving vs initial owner estimates; 100% on-spec delivery</li>
  <li><strong>Operational outcome</strong>: Property opened on schedule; F&amp;B offering at brand standard from Day 1</li>
</ul>

<h2>The HORECA Ecosystem Play</h2>
<p>India Gully's HORECA division operates across the full value chain: procurement (FF&amp;E, OS&amp;E, kitchen equipment), operations advisory (SOPs, F&amp;B menu engineering, yield management), and supply continuity (ongoing consumables replenishment). This ecosystem approach — from pre-opening to steady-state operations — is particularly valuable for independent operators and family-office hotel owners in Tier 2 markets who lack the internal expertise of branded hotel management companies.</p>
<p>For developers and investors approaching Tier 2 hotel projects, India Gully offers a comprehensive HORECA procurement and operations advisory package that de-risks the pre-opening phase and sets the property up for operational success from the first day of trading.</p>
`,
  },
  {
    id: 'retail-leasing-trends-india-2026',
    category: 'Retail',
    date: 'March 2026',
    title: 'India Retail Leasing 2026: Premiumisation, Omnichannel & the New Mall Hierarchy',
    excerpt: 'India\'s organised retail leasing market is undergoing structural realignment. Grade-A malls command rental premiums of 40–65% over Grade-B stock; international brand entry is at a 10-year high; and the omnichannel pivot is reshaping the economics of physical retail. India Gully\'s 1,40,000+ sq ft leasing practice reveals the trends shaping 2026.',
    tags: ['Retail', 'Leasing', 'Real Estate', '2026'],
    readTime: '9 min read',
    body: `
<h2>Executive Summary</h2>
<p>India's organised retail real estate sector in 2026 is bifurcating sharply. The top 15% of mall stock — Grade-A developments in metro CBDs and premium suburban corridors — is virtually fully leased, with brands competing for space and rental reversions of 12–18% on lease renewal. The bottom 40% of existing mall stock faces vacancy rates above 25%, anchor tenant exodus, and structural repositioning requirements. Understanding this hierarchy — and selecting the right assets — is the central challenge for both retail brands and real estate investors.</p>
<p>India Gully's retail leasing practice has transacted 1,40,000+ sq ft across Delhi NCR and Gurugram over the past 7 years, working with both landlords repositioning their retail assets and brands seeking optimal physical retail locations. This report synthesises our transaction data with India Gully's market intelligence to define the strategic landscape for 2026.</p>

<h2>The New Mall Hierarchy</h2>
<p>India's mall market has evolved from a binary Grade-A / Grade-B classification to a more nuanced five-tier hierarchy, each with distinct occupancy, rental, and investment dynamics:</p>

<h3>Tier I: Destination Malls (National)</h3>
<p>The top 8–10 malls nationally — DLF Emporio, Select Citywalk, Palladium, Phoenix MarketCity Mumbai — occupy a category apart. Vacancy rates are effectively zero; waitlists for anchor and flagship space run 18–36 months. Rental premiums of 80–120% over city averages are sustained by irreplaceable footfall (30,000–70,000 daily visitors) and unmatched brand visibility. Investment yields have compressed to 5.5–6.5%, reflecting institutional quality comparable to gateway European retail real estate.</p>

<h3>Tier II: Premium Regional Malls</h3>
<p>15–20 malls in the 6 major metros — DLF CyberHub, Pacific Mall Tagore Garden, Nexus Elante Chandigarh — deliver consistent Grade-A performance with footfall of 12,000–28,000 daily. Vacancy runs 3–8%. Rental levels of ₹150–300 per sq ft per month for premium inline are achievable. These assets attract both international brand entries and domestic premiumisation plays.</p>

<h3>Tier III: Quality Neighbourhood Malls</h3>
<p>The largest segment by number — well-located, single-catchment malls of 3–5 lakh sq ft in Tier 1 cities. Performance varies significantly by micro-market. Anchor-tenant quality is the key differentiator: malls anchored by Reliance / D-Mart / premium cineplex outperform peers by 35–45% on inline brand performance. Vacancy: 8–15%. Rental: ₹80–150 per sq ft per month for inline.</p>

<h3>Tier IV: Transitional Assets</h3>
<p>Legacy malls (2008–2015 vintage) in secondary micro-markets facing the omnichannel disruption most acutely. Many have lost 1–3 anchor tenants in the post-COVID period; vacancy of 20–35% is common. These assets require repositioning — conversion of dead retail into F&B, entertainment, gym/wellness, co-working, or hotel use. India Gully has active advisory mandates involving three such repositioning projects totalling 8 lakh sq ft of gross leasable area.</p>

<h3>Tier V: Distressed Assets</h3>
<p>Poorly located, structurally undermined retail assets with vacancy above 40%. Resolution is primarily through Tier IV conversion (full repurposing) or debt resolution via IBC. India Gully's Debt & Special Situations practice has engaged on three such assets in the ₹35–120 Cr range over the past 24 months.</p>

<h2>International Brand Entry: 10-Year High</h2>
<p>International brand entry into India in 2024–25 reached its highest level since 2014–15. Key data points:</p>
<ul>
  <li><strong>35+ international brands</strong> entered or announced India entry in 2024–25, across luxury, premium, and mass-premium segments</li>
  <li><strong>Luxury segment</strong>: Miu Miu, Brunello Cucinelli, Rimowa, and Ralph Lauren Pink Pony flagship expansions represent the continued deepening of the luxury consumer base in Delhi NCR and Mumbai</li>
  <li><strong>F&B international</strong>: Tim Hortons, Popeyes, and Five Guys expansions represent the coming-of-age of India's QSR and fast-casual segment for international operators</li>
  <li><strong>Sports & outdoor</strong>: Salomon, Hoka, and Vuori's entry signals the emergence of India's sports lifestyle consumer as a distinct retail segment</li>
</ul>
<p>International brand entry is disproportionately concentrated in Tier I and Tier II mall stock. 87% of new international brand stores opened in 2024–25 were located in the top 25 malls nationally. The implication for mall landlords outside this group is that international brand anchoring requires significant asset repositioning to be a realistic aspiration.</p>

<h2>Premiumisation Across Domestic Brands</h2>
<p>The premiumisation trend that began in post-COVID 2021–22 has accelerated. India Gully's leasing transaction data shows:</p>
<ul>
  <li>Average ticket size for domestic apparel and lifestyle brands has increased 28–35% across our portfolio in 2024–25 versus 2021–22</li>
  <li>Brands in the ₹3,000–8,000 ASP (average selling price) range are the most active space-seekers — this "accessible premium" segment is growing faster than both mass and luxury</li>
  <li>Home and lifestyle categories — D2C furniture, artisanal home décor, premium kitchenware — are the fastest-growing categories for physical retail expansion</li>
  <li>Beauty and personal care (BPC) premiumisation: domestic BPC brands (The Derma Co., Minimalist, Plum, Pilgrim) are transitioning from digital-first to omnichannel, with aggressive physical retail rollout plans for 2026–27</li>
</ul>

<h2>Omnichannel: Physical Retail's New Economics</h2>
<p>The narrative that e-commerce would eliminate physical retail has been superseded by a more nuanced omnichannel reality. India Gully's landlord clients report that brands operating strong omnichannel models are delivering 15–22% better store economics than pure-play physical retailers. The data from our portfolio:</p>
<ul>
  <li><strong>Discovery function</strong>: 68% of surveyed brand partners report that physical store presence drives measurable incremental digital sales within a 15km radius of the store location</li>
  <li><strong>Returns reduction</strong>: Brands with physical presence show 35–42% lower return rates on online orders — customers who can touch and try in-store order with more confidence online</li>
  <li><strong>Brand trust premium</strong>: Consumer surveys by ICICI Securities (2025) indicate 58% of Indian consumers trust a brand more upon seeing a physical store, regardless of whether they ultimately purchase online or offline</li>
</ul>
<p>The implication for retail leasing economics: physical retail is no longer justified purely on a store-P&L basis. Landlords and brands are increasingly agreeing on revenue-share lease structures that capture the full omnichannel contribution of a store location, with base rents lower but revenue share kickers higher. India Gully has negotiated three such hybrid lease structures in 2025–26 for domestic D2C brands entering their first physical footprint.</p>

<h2>India Gully's Retail Leasing Services</h2>
<p>India Gully's retail leasing practice operates across the full spectrum of retail real estate transactions:</p>
<ul>
  <li><strong>Brand representation</strong>: Identifying optimal locations, negotiating lease terms, coordinating due diligence for brands expanding their physical footprint (domestic and international)</li>
  <li><strong>Landlord advisory</strong>: Tenant mix strategy, anchor replacement, rental optimisation, and mall repositioning advisory for mall owners</li>
  <li><strong>Transaction execution</strong>: Full transaction management from heads of terms through lease execution, including legal coordination and fit-out timeline management</li>
  <li><strong>Portfolio strategy</strong>: Multi-city retail expansion planning for brands targeting 10+ stores across Tier 1 and Tier 2 cities</li>
</ul>
`,
  },
  {
    id: 'debt-special-situations-india-hospitality-2026',
    category: 'Debt & Special Situations',
    date: 'March 2026',
    title: 'Distressed Hospitality Assets in India 2026: Opportunity Map for Special Situations Investors',
    excerpt: 'India\'s hospitality sector carries an estimated ₹22,000–28,000 Cr of stressed debt, concentrated in mid-market hotels built in the 2008–2015 cycle. The post-COVID recovery has been uneven: premium assets have recapitalised; sub-optimal assets face IBC proceedings or promoter distress. India Gully\'s Debt & Special Situations practice maps the opportunity.',
    tags: ['Debt & Special Situations', 'Hospitality', 'IBC', 'Real Estate'],
    readTime: '11 min read',
    body: `
<h2>Executive Summary</h2>
<p>India's hospitality sector recovery from COVID-19 has been structurally uneven. Tier-1 branded hotels, airport-proximate properties, and heritage assets have delivered strong RevPAR recovery — many exceeding 2019 benchmarks by 15–25% in nominal terms. However, the mid-market hotel cohort built in the infrastructure and consumption boom of 2008–2015 carries structural vulnerabilities that the COVID shock exposed and the recovery has not fully healed: sub-optimal locations, over-leveraged capital structures, deferred capex, and in some cases promoter distress that has diverted management attention from hotel operations.</p>
<p>For special situations investors — family offices, credit funds, and strategic acquirers — this creates an investable opportunity in the ₹15–150 Cr per asset range, a segment that is too small for institutional PE but too complex for conventional property investors. India Gully's Debt & Special Situations vertical, active since 2023, has engaged on 8 assets in this segment with a combined debt exposure of ₹380 Cr.</p>

<h2>The Stressed Debt Landscape</h2>
<p>Estimating the quantum of stressed hospitality debt in India requires triangulating multiple data sources. India Gully's analysis, drawing on RBI's sectoral NPA data, NCLT filings, and direct transaction intelligence, arrives at the following picture:</p>

<h3>Overall Quantum</h3>
<ul>
  <li><strong>Total hospitality sector bank debt</strong>: Approximately ₹1,10,000–1,20,000 Cr (scheduled commercial banks + HFCs + NBFCs)</li>
  <li><strong>Gross NPA + SMA-2 (stressed) cohort</strong>: Estimated ₹22,000–28,000 Cr (19–23% of total hospitality sector lending)</li>
  <li><strong>NCLT admitted cases</strong>: 280+ hospitality-sector CIRPs active as of Q4 FY25, with aggregate admitted claims of ₹14,200 Cr</li>
  <li><strong>Pre-IBC settlements (OTS, restructuring)</strong>: India Gully estimates a further ₹8,000–14,000 Cr in pre-admission restructuring being managed bilaterally between promoters and lenders</li>
</ul>

<h3>Asset Segment Concentration</h3>
<p>Stressed debt is heavily concentrated in three asset segments:</p>
<ol>
  <li><strong>Mid-market hotels, 2008–2015 vintage, secondary locations</strong> (40–120 keys): Accounts for approximately 55–60% of the stressed cohort. These assets were built on aggressive debt, achieved acceptable occupancy in the pre-COVID period, but cannot service debt at current interest rates while funding the capex required to maintain brand standard or franchise eligibility.</li>
  <li><strong>Resort and leisure properties, Tier 2 / hill station locations</strong> (30–80 keys): Accounts for approximately 20–25%. Post-COVID leisure demand recovery has been strong, but many of these assets are technically operated by promoters without proper franchise agreements, making them difficult to refinance or sell at institutional pricing.</li>
  <li><strong>Large mid-scale hotels, non-metro markets</strong> (120–250 keys): Accounts for approximately 15–20%. Oversupplied markets (Agra, Jaipur outskirts, highway corridor properties) with structural occupancy weakness and ADR compression from new branded supply.</li>
</ol>

<h2>The IBC Resolution Track Record</h2>
<p>India's Insolvency and Bankruptcy Code has processed hospitality sector resolutions with mixed outcomes:</p>
<ul>
  <li><strong>Resolution rate</strong>: Of NCLT-admitted hospitality CIRPs concluded as of Q3 FY25, approximately 28% achieved resolution (CoC-approved resolution plan); 52% were liquidated; 20% remain active</li>
  <li><strong>Recovery rate</strong>: Resolved cases delivered an average recovery of 32% of admitted claims for financial creditors — significantly below the IBC's intended recovery standard, reflecting the asset-specific challenges of hospitality properties (deferred maintenance, management disruption, brand deflagging during CIRP)</li>
  <li><strong>Average CIRP duration</strong>: 24.8 months for concluded hospitality CIRPs — far exceeding the statutory 330-day deadline, creating carrying cost erosion for lenders and operational deterioration in the asset</li>
</ul>
<p>The IBC track record underscores the case for pre-CIRP resolution: bilateral OTS or structured acquisition before NCLT admission preserves asset value, avoids management disruption, and delivers superior recovery for lenders.</p>

<h2>Investment Thesis: Where the Opportunity Lies</h2>
<p>India Gully's Debt & Special Situations practice has identified four sub-segments within the distressed hospitality opportunity that offer attractive risk-adjusted returns:</p>

<h3>1. Pre-NPA OTS Acquisitions (₹15–60 Cr ticket)</h3>
<p>Assets where promoter distress is evident but the loan has not yet been classified NPA. Banks and NBFCs are willing to negotiate OTS at 55–70 cents on the rupee for early settlement. The acquirer receives a clean asset (no IBC overhang), operational continuity, and the ability to install new management immediately. India Gully acts as transaction advisor — structuring the OTS, negotiating with lenders, and connecting acquirers with franchise partners for re-branding.</p>

<h3>2. Post-IBC Resolution (₹20–80 Cr ticket)</h3>
<p>Assets that have gone through IBC but failed to attract a resolution applicant in the initial CIRP. Liquidation assets — typically available at 40–60% of NCLT-assessed liquidation value — offer the deepest value but require full operational rebuild. India Gully's value-add framework for these assets: assess structural integrity, identify optimal brand/franchise, model 36-month recovery P&L, and connect with operators willing to manage on a management contract rather than requiring an upfront fee. Hotel Rajshree, Chandigarh (India Gully mandate) is an example of a successful post-distress operational restoration.</p>

<h3>3. Promoter Equity Restructuring (₹8–35 Cr ticket)</h3>
<p>Family-owned, single-asset hotel operators where the original promoter is operationally capable but financially distressed due to COVID-era debt. The investment thesis: inject equity capital at a significant discount to replacement cost (50–65 cents), restructure the liability profile, and participate in the upside as the asset recovers to normalised trading. These situations typically require patient capital (3–5 year horizon) but deliver 22–28% IRR when executed well.</p>

<h3>4. Portfolio Debt Acquisition</h3>
<p>For larger capital pools (₹150 Cr+), acquiring portfolios of hotel NPA from banks and ARCs at portfolio discount (typically 40–55% of outstanding principal). Portfolio acquisition provides diversification, reduces single-asset concentration risk, and enables operational synergies (shared management, procurement consolidation). India Gully has structured one such portfolio acquisition mandate covering 4 assets in Punjab and Himachal Pradesh with aggregate principal of ₹185 Cr.</p>

<h2>India Gully's Debt & Special Situations Practice</h2>
<p>India Gully's Debt & Special Situations vertical provides end-to-end advisory across the distressed asset lifecycle:</p>
<ul>
  <li><strong>Asset identification and due diligence</strong>: Proprietary pipeline of distressed hospitality assets sourced from bank NPA lists, NCLT filings, ARC relationships, and promoter referrals</li>
  <li><strong>Valuation and structuring</strong>: India Gully's hospitality-specific valuation methodology — incorporating brand repositioning value, RevPAR recovery modelling, and capex-adjusted DCF — provides a more accurate intrinsic value estimate than generic real estate valuation</li>
  <li><strong>Lender negotiation</strong>: India Gully's relationships across PSU banks, private banks, and ARCs active in hospitality NPA resolution enable efficient OTS negotiation and pre-CIRP settlement</li>
  <li><strong>Post-acquisition value creation</strong>: Operational turnaround advisory, brand affiliation (Marriott, IHG, Choice Hotels, OYO franchise), HORECA procurement optimisation, and revenue management enhancement</li>
  <li><strong>Exit structuring</strong>: Asset sale advisory, hotel-specific REIT structuring analysis, and sale-leaseback transactions</li>
</ul>
<p>For special situations investors seeking exposure to India's hospitality sector at below-replacement-cost pricing, India Gully offers a differentiated advisory capability that combines transaction execution skill with deep hospitality operating expertise — a combination that is rare in the Indian advisory market.</p>
`,
  },
  // ── NEW PHASE 17B ARTICLES ─────────────────────────────────────────────────
  {
    id: 'horeca-cloud-kitchen-india-2026',
    category: 'HORECA',
    date: 'March 2026',
    title: 'Cloud Kitchens & Dark Stores: India\'s HORECA Infrastructure Revolution',
    excerpt: 'India\'s food delivery ecosystem has crossed ₹1,00,000 Cr in annual GMV, yet the kitchen infrastructure underpinning it remains fragmented and capital-inefficient. India Gully\'s HORECA advisory practice examines the cloud kitchen model, dark store integration, and the investment opportunities emerging at the intersection of real estate and foodservice.',
    tags: ['HORECA', 'Cloud Kitchen', 'Food Delivery', 'Real Estate'],
    readTime: '9 min read',
    body: `
<h2>Executive Summary</h2>
<p>India's online food delivery market crossed ₹1,00,000 Cr in annualised GMV in Q3 FY26, driven by Swiggy, Zomato, and an increasingly sophisticated set of quick-commerce platforms. Yet the physical infrastructure enabling this digital economy — the kitchen, the cold chain, the last-mile dark store — remains the least institutionalised segment of the entire value chain.</p>
<p>India Gully's HORECA advisory practice has been advising operators, landlords, and investors on this infrastructure gap since 2023. This report synthesises our active mandate experience across 8 cloud kitchen operator clients and 3 real estate mandates involving HORECA-anchored commercial spaces.</p>

<h2>1. The Market Structure in 2026</h2>
<h3>Aggregators as Infrastructure Providers</h3>
<p>Swiggy and Zomato have each evolved beyond pure aggregation into vertically integrated food infrastructure companies. Key developments:</p>
<ul>
  <li><strong>Swiggy Snacc / Instamart</strong>: Dark store network of 800+ locations nationally, expanding into HORECA-adjacent cold storage</li>
  <li><strong>Zomato Hyperpure</strong>: B2B ingredient supply business now processing ₹2,400 Cr+ annually, servicing 50,000+ restaurant partners</li>
  <li><strong>Blinkit (Zomato)</strong>: 800+ dark stores across 40+ cities; average dark store area 1,800–3,500 sq ft; lease terms 3–5 years at ₹45–120 per sq ft per month in Tier-1 micro-markets</li>
</ul>
<p>The implication for commercial real estate: aggregator-operated dark stores have become a new, credit-worthy tenant category for landlords with ground-floor retail in the right micro-markets.</p>

<h3>Cloud Kitchen Operator Landscape</h3>
<p>India's cloud kitchen landscape has consolidated significantly from the 2020–22 peak. Current structure:</p>
<ul>
  <li><strong>Platform-operated hubs</strong>: Rebel Foods (Faasos, Behrouz, Ovenstory), EatClub — vertically integrated multi-brand operators with 300–600 sq ft standardised kitchen modules</li>
  <li><strong>Landlord-operated shared kitchens</strong>: Co-working-style shared kitchen infrastructure (Kitchens@, The Kitchens by Swiggy) leased to F&B brands at ₹12,000–35,000 per station per month</li>
  <li><strong>Single-brand cloud kitchens</strong>: Restaurant chains using dedicated dark kitchen units to extend delivery radius without front-of-house investment</li>
  <li><strong>Ghost kitchens in hotel basements</strong>: India Gully has actively advised 3 hotel owners on monetising under-utilised basement kitchen infrastructure for cloud kitchen sub-leasing — generating ₹80,000–1.8 Cr per year in incremental revenue</li>
</ul>

<h2>2. Real Estate Implications</h2>
<h3>The HORECA Real Estate Stack</h3>
<p>India Gully has developed a framework for categorising the physical infrastructure requirements across the HORECA delivery ecosystem:</p>
<ol>
  <li><strong>Tier A: Hub Dark Kitchens</strong> (2,500–8,000 sq ft): Multi-brand production hubs in industrial or commercial zones; ground floor preferred; loading bay mandatory; 3-phase power (80–150 kW); monthly lease ₹20–60 per sq ft in Tier-1</li>
  <li><strong>Tier B: Satellite Cloud Kitchens</strong> (400–1,200 sq ft): Delivery-radius extension units; typically in basement or mezzanine of existing commercial buildings; monthly lease ₹40–120 per sq ft depending on micro-market</li>
  <li><strong>Tier C: Dark Stores</strong> (1,500–4,000 sq ft): Ground-floor retail with 15-minute delivery access; cold storage (0–4°C zone) mandatory; monthly lease ₹60–180 per sq ft in high-demand micro-markets</li>
  <li><strong>Tier D: Hotel Kitchen Monetisation</strong>: Sub-leasing hotel kitchen capacity during off-peak hours to cloud kitchen operators; India Gully's model generates 18–32% kitchen utilisation increase with minimal capex</li>
</ol>

<h3>Location Science for HORECA Infrastructure</h3>
<p>Optimal HORECA infrastructure location depends on three variables that India Gully has modelled across active mandates:</p>
<ul>
  <li><strong>Delivery radius economics</strong>: Swiggy/Zomato delivery radius optimisation centres on 3–5 km radius from kitchen; beyond 6 km, packaging quality and delivery cost economics deteriorate</li>
  <li><strong>Population density threshold</strong>: Dark stores require 8,000+ households within 2 km radius to sustain a 10-minute delivery model; cloud kitchens require 15,000+ food delivery orders per month in the micro-market</li>
  <li><strong>Infrastructure requirements</strong>: 3-phase power, ventilation compliance, ground-floor vehicle access — these structural requirements limit eligible buildings to 15–25% of total commercial stock in most micro-markets</li>
</ul>

<h2>3. Investment Opportunity Analysis</h2>
<h3>HORECA Real Estate as an Asset Class</h3>
<p>The institutionalisation of dark kitchens and dark stores as tenants creates a new sub-category of commercial real estate investment. Key investment metrics from India Gully's mandate experience:</p>
<ul>
  <li><strong>Yield premium</strong>: HORECA-optimised commercial spaces (with ventilation, power, and loading access) achieve 15–25% yield premium over equivalent non-HORECA commercial</li>
  <li><strong>Tenant credit quality</strong>: Aggregator-operated dark stores (Blinkit, Swiggy Instamart) represent investment-grade tenants with 3–5 year leases; independent cloud kitchen operators are sub-investment-grade but provide higher yield</li>
  <li><strong>Asset repositioning</strong>: Ground-floor retail with 30%+ vacancy in Tier-1 micro-markets can achieve full occupancy through HORECA-format conversion at ₹150–400 per sq ft capex</li>
</ul>

<h3>Operating Business Opportunities</h3>
<p>Beyond real estate, India Gully's HORECA practice identifies three investable operating business opportunities:</p>
<ul>
  <li><strong>Shared kitchen platform</strong>: ₹2–8 Cr investment in 3,000–6,000 sq ft shared kitchen infrastructure; payback 28–42 months at 75%+ utilisation; multiple revenue streams (station rent, ingredient supply, licensing)</li>
  <li><strong>Cold chain distribution</strong>: B2B ingredient logistics serving cloud kitchen and dark store networks; underserved by existing logistics operators; 18–28% gross margin for temperature-controlled last-mile</li>
  <li><strong>Technology stack for HORECA operators</strong>: Order aggregation, inventory management, menu engineering and customer analytics tools for cloud kitchen operators; SaaS opportunity with ₹8,000–25,000 per month ARPU</li>
</ul>

<h2>4. Challenges and Risk Factors</h2>
<p>India Gully's advisory experience across HORECA mandates surfaces several structural risk factors for investors:</p>
<ul>
  <li><strong>Regulatory uncertainty</strong>: FSSAI compliance requirements for cloud kitchens continue to evolve; zoning and fire safety compliance is inconsistently enforced across states</li>
  <li><strong>Aggregator dependency</strong>: Single-aggregator dependency creates concentration risk; multi-aggregator listing is best practice but adds operational complexity</li>
  <li><strong>Unit economics pressure</strong>: Aggregator commission rates (18–28% of order value) create sustained P&L pressure; operators with proprietary delivery capability achieve 8–12% better contribution margin</li>
  <li><strong>Real estate availability</strong>: The intersection of affordable rent, structural compliance, and delivery-optimised location remains scarce; site identification is the primary bottleneck for expansion-stage operators</li>
</ul>

<h2>Conclusion</h2>
<p>India's HORECA infrastructure story is one of the most interesting convergence plays in the current investment cycle: digital food demand growth meeting physical real estate constraints in a market where the right operator, location, and capital structure can generate exceptional returns. India Gully's HORECA advisory practice offers end-to-end support — from site selection and lease negotiation through operator partnership and procurement optimisation — for investors and operators building in this space.</p>
`,
  },
  {
    id: 'india-hospitality-brand-strategy-2026',
    category: 'Hospitality',
    date: 'February 2026',
    title: 'Hotel Brand Affiliation in India 2026: Choosing the Right Flag for Your Asset',
    excerpt: 'India now hosts 850+ branded hotel projects across 25+ international and domestic flags. For hotel owners navigating the affiliation decision — IHG, Marriott, Hyatt, Radisson, Choice, OYO Townhouse, or homegrown brands — the choice has profound implications for RevPAR, capex requirement, management contract terms, and exit value. India Gully maps the landscape.',
    tags: ['Hospitality', 'Hotel Brands', 'Management Contracts', 'Investment'],
    readTime: '12 min read',
    body: `
<h2>Executive Summary</h2>
<p>India's branded hotel pipeline has expanded dramatically in the post-COVID recovery cycle. As of Q1 2026, the country's 850+ branded hotel projects represent a market where the affiliation decision — which flag to fly, on what contractual terms, for what duration — is one of the most consequential strategic choices a hotel owner can make.</p>
<p>India Gully's hospitality advisory practice has structured or reviewed 40+ hotel management contracts over the past 5 years, representing assets from 30-key boutique properties in Tier-3 cities to 250-key full-service hotels in metro markets. This report synthesises that experience into an actionable framework for hotel owners.</p>

<h2>1. The Brand Landscape in India</h2>
<h3>International Chains</h3>
<p>The three dominant international chains in India's midscale-to-upscale segment are:</p>
<ul>
  <li><strong>Marriott International</strong>: 150+ hotels open and 80+ in pipeline. Brands present: Courtyard, Four Points, Fairfield, Marriott, JW Marriott, Westin, Sheraton, W, The Ritz-Carlton. Strongest in NCR, Mumbai, Bengaluru. RevPAR premium over comparable unbranded: 28–40%.</li>
  <li><strong>IHG (InterContinental Hotels Group)</strong>: 50+ hotels open, 40+ pipeline. Holiday Inn, Holiday Inn Express, Crowne Plaza, InterContinental. Strongest in mid-market (Holiday Inn Express) with strong secondary city penetration. Management fee: 2% of revenue base fee + 6–8% gross operating profit incentive fee.</li>
  <li><strong>Hyatt</strong>: 40+ hotels open, 35+ pipeline. Hyatt Regency, Grand Hyatt, Park Hyatt, Alila, Andaz, Hyatt Place, Hyatt Centric. Premium positioning; Delhi, Mumbai, Bengaluru focus. Known for demanding fitout standards but strong loyalty network (World of Hyatt).</li>
</ul>

<h3>Domestic Full-Service Brands</h3>
<ul>
  <li><strong>Taj Hotels (IHCL)</strong>: India's most premium domestic brand. Selects (upscale), Vivanta (upper-upscale), SeleQtions (soft brand), Taj (luxury). Strong F&B reputation drives ancillary revenue; brand licensing fee structure rather than full management contract available in some formats.</li>
  <li><strong>Oberoi Group (EIH)</strong>: Ultra-luxury positioning, very selective. Trident brand for upscale segment. High management standards require; limited to assets meeting very specific physical criteria.</li>
  <li><strong>Lemon Tree Hotels</strong>: India's largest domestically-listed hotel chain. Lemon Tree Premier (upscale), Lemon Tree (midscale), Red Fox (economy). Strong value proposition for owners seeking domestic brand with institutional management. Actively expanding through management contracts in Tier-2 and Tier-3 cities.</li>
  <li><strong>WelcomHeritage (ITC)</strong>: Heritage and boutique positioning; relevant specifically for palace, fort, and heritage property owners. India Gully has an active mandate — WelcomHeritage Santa Roza, Kasauli — demonstrating the brand's value for appropriate assets.</li>
</ul>

<h3>Midscale & Economy Aggregators</h3>
<ul>
  <li><strong>OYO</strong>: Franchise-light model at economy segment (₹800–2,500 ADR). 3,000+ properties nationally. Rapid customer acquisition through platform; significant brand reputation risks. India Gully recommends OYO only for assets unable to qualify for conventional brands.</li>
  <li><strong>Radisson Hotel Group</strong>: Park Inn, Radisson, Radisson Blu, Radisson RED. Active in Tier-2 and Tier-3 cities; more flexible on fitout standards than Marriott or IHG. Growing pipeline in highway and industrial corridor locations.</li>
  <li><strong>Choice Hotels (Comfort Inn, Quality Inn)</strong>: Franchise model (not management contract); lower fee structure; appropriate for owner-operated hotels seeking distribution benefits without full management handover.</li>
</ul>

<h2>2. The Management Contract Framework</h2>
<h3>Key Contract Terms India Gully Negotiates</h3>
<p>Hotel management contracts are complex instruments. India Gully's advisory practice focuses on 7 key terms that drive long-term owner economics:</p>
<ol>
  <li><strong>Base fee</strong>: Typically 1.5–3.5% of total revenue. Benchmark: 2% for midscale, 2.5–3.5% for upper-upscale. Negotiate a ramp-up structure (lower base fee in years 1–3) for new builds.</li>
  <li><strong>Incentive fee</strong>: 6–10% of GOP (Gross Operating Profit) after a fixed owner's priority return (typically 8–10% of invested capital or total investment). The incentive fee structure is where most owner-operator disputes originate — ensure GOP definition, capex treatment, and owner's priority are clearly defined.</li>
  <li><strong>Operator performance guarantee</strong>: Minimum RevPAR (Revenue Per Available Room) or NOI (Net Operating Income) guarantee by the operator, with termination rights if missed for 2–3 consecutive years. Not all operators offer performance guarantees — Marriott and IHG do in competitive situations; OYO and budget operators typically do not.</li>
  <li><strong>Technical services fee (TSA)</strong>: Pre-opening fee covering design review, pre-opening services, and brand standard compliance. Typically 3–4% of project cost. India Gully negotiates cap and scope limitations.</li>
  <li><strong>FF&E (Furniture, Fixtures & Equipment) reserve</strong>: Mandatory reserve of 3–5% of revenue, held in escrow and applied to hotel maintenance capex. India Gully negotiates joint control over deployment.</li>
  <li><strong>Brand fee / royalty</strong>: Separate from management fee in franchise models (Choice, some Marriott formats). Typically 4–6% of rooms revenue. Franchise without full management is increasingly common for experienced owner-operators.</li>
  <li><strong>Term and termination</strong>: Standard initial term 15–25 years with renewal options. India Gully structures break clauses (performance-based, change-of-control, sale of asset) to preserve owner liquidity options.</li>
</ol>

<h2>3. Choosing the Right Brand for Your Asset</h2>
<h3>The India Gully Brand-Asset Matching Framework</h3>
<p>India Gully uses a four-dimension analysis to match hotel assets with the optimal brand:</p>

<h3>Dimension 1: Market Position</h3>
<p>The brand's competitive position in the specific city and micro-market matters more than national brand strength. A Marriott brand may drive stronger RevPAR in Delhi NCR; the same flag in a Tier-3 city may underperform a domestic brand that has stronger recognition and distribution in that market.</p>

<h3>Dimension 2: Fitout and Capex Requirements</h3>
<p>Brand standard compliance capex varies dramatically:</p>
<ul>
  <li>IHG Holiday Inn Express: ₹18–25 lakh per key (renovation to brand standard for existing hotel)</li>
  <li>Marriott Courtyard / Fairfield: ₹22–35 lakh per key</li>
  <li>Hyatt Place / Centric: ₹28–42 lakh per key</li>
  <li>Lemon Tree / Goldfinch: ₹12–20 lakh per key</li>
  <li>Choice Hotels (Quality Inn): ₹8–15 lakh per key</li>
</ul>
<p>Owners must model the full risk-adjusted return including brand capex before signing a management contract — India Gully consistently finds that aspirational brand selection that exceeds the market's willingness to pay destroys owner value.</p>

<h3>Dimension 3: Distribution and Loyalty</h3>
<p>The value of a global brand's loyalty program (Marriott Bonvoy, IHG One Rewards, World of Hyatt) is most evident in airports, CBDs, and gateway cities with high proportion of corporate and international travel. In leisure markets, temple towns, and Tier-3 cities, domestic OTA (MakeMyTrip, Goibibo) distribution often outperforms global loyalty channels. India Gully's analysis of 15 managed hotels in our portfolio shows that loyalty-channel contribution ranges from 8% (Tier-3 leisure) to 41% (metro corporate).</p>

<h3>Dimension 4: Exit and Financing Value</h3>
<p>The brand decision directly affects asset exit value and debt financing terms:</p>
<ul>
  <li>Institutionally recognised brands (Marriott, IHG, Hyatt) add 15–25% to asset value at exit versus equivalent unbranded</li>
  <li>Domestic brand affiliations (Taj, Lemon Tree) add 8–15% at exit, particularly for domestic buyer pools</li>
  <li>Economy aggregator affiliations (OYO, Fab Hotels) may not add meaningful value at institutional-standard exits</li>
  <li>Branded hotel assets access bank finance at lower interest rates (typically 75–150 bps lower) versus unbranded, reflecting lender comfort with management continuity</li>
</ul>

<h2>4. India Gully's Hotel Brand Advisory Practice</h2>
<p>India Gully provides hotel brand selection and management contract advisory as a standalone engagement for owner-developers navigating the affiliation decision:</p>
<ul>
  <li><strong>Brand feasibility study</strong>: Market positioning analysis, brand comparison, projected RevPAR under each brand scenario, capex modelling</li>
  <li><strong>RFP and brand selection process</strong>: Structured competitive process to shortlist 3–4 brands, manage technical due diligence, and negotiate management contract terms</li>
  <li><strong>Contract negotiation</strong>: India Gully's proprietary contract benchmark database (40+ contracts reviewed) enables evidence-based negotiation on fees, performance standards, break clauses, and FF&E structures</li>
  <li><strong>Pre-opening advisory</strong>: Supporting owners through the brand's pre-opening technical services process to ensure compliance while controlling costs</li>
</ul>
<p>For hotel owners considering an affiliation change, refinancing, or new development, India Gully's brand advisory practice offers a rigorous, owner-aligned perspective that is independent of any brand relationship — a critical distinction in a market where most advisory is provided by parties with brand distribution conflicts of interest.</p>
`,
  },
  {
    id: 'entertainment-destination-development-india-2026',
    category: 'Entertainment',
    date: 'March 2026',
    title: 'Building India\'s Next Entertainment Destination: Development Economics & Operational Model',
    excerpt: 'India\'s entertainment real estate pipeline for 2026–29 includes 35+ large-format destination projects across family entertainment, sports, gaming, and experiential retail. The development economics of these assets are complex — high capex, non-standard valuation, and operator-dependency. India Gully maps the framework for developers and investors.',
    tags: ['Entertainment', 'Real Estate Development', 'FEC', 'Investment'],
    readTime: '10 min read',
    body: `
<h2>Executive Summary</h2>
<p>India's entertainment real estate — encompassing family entertainment centres (FECs), theme parks, waterparks, bowling alleys, go-karting tracks, trampoline parks, virtual reality arcades, and integrated entertainment destinations — is at an inflection point. Consumer spending on experiential leisure is growing at 18–22% annually (CRISIL, 2025), driven by a young population, rising disposable incomes, and the 'experience economy' shift that followed COVID-19.</p>
<p>Yet despite strong demand fundamentals, entertainment real estate development economics remain complex: high capex, unconventional asset valuation, operator dependency, and a thin domestic institutional equity market. India Gully's entertainment advisory practice — active on 5 entertainment destination mandates totalling ₹280 Cr in project value — presents a development framework for operators and investors in this space.</p>

<h2>1. The Entertainment Destination Landscape</h2>
<h3>Format Categories</h3>
<p>India Gully classifies entertainment destinations into four format categories, each with distinct development and operating economics:</p>
<ol>
  <li><strong>Large-format theme parks / waterparks</strong> (₹150–500 Cr): Adlabs Imagica, Wonderla — high capex, high barrier to entry, strong cash-on-cash returns at maturity (12–18% CoC at 70% occupancy) but 4–7 year payback period and significant operational complexity</li>
  <li><strong>Integrated entertainment centres in malls</strong> (₹25–80 Cr): FECs, bowling, arcade gaming, trampoline parks within mall anchoring space — mall anchor tenant economics with revenue share structures; lower capex but dependent on mall traffic</li>
  <li><strong>Standalone destination FECs</strong> (₹8–35 Cr): Go-karting tracks, adventure zones, escape rooms, indoor sports facilities with F&B — India Gully's most active advisory segment; mid-ticket capex with 3–5 year payback at adequate utilisation</li>
  <li><strong>Entertainment hospitality hybrids</strong> (₹40–120 Cr): Resort properties with integrated entertainment — adventure activities, gaming zones, live entertainment venues — increasingly relevant as India's MICE and leisure travel grows</li>
</ol>

<h3>Consumer Demand Drivers</h3>
<p>India Gully's demand analysis across entertainment mandates identifies three primary demand drivers:</p>
<ul>
  <li><strong>Family leisure spend growth</strong>: Average family entertainment spend per outing has grown from ₹1,800 in 2019 to ₹3,200 in 2025 (FICCI, 2025). The per-outing basket is expanding as consumers trade up from bowling alleys to multi-format FECs with F&B integration.</li>
  <li><strong>Youth-driven experiential demand</strong>: 18–35 age cohort (India's largest demographic) is the most active entertainment consumer — VR arcades, e-sports centres, escape rooms, and social gaming formats skew strongly to this cohort</li>
  <li><strong>Corporate MICE demand</strong>: Post-COVID, corporate events and team-building activities have shifted toward experiential formats — go-karting, bowling tournaments, escape room team events. India Gully's entertainment clients report MICE contributing 18–35% of revenue at optimal locations</li>
</ul>

<h2>2. Development Economics Framework</h2>
<h3>Capex Benchmarks (2025-26)</h3>
<p>India Gully's active mandate database provides the following capex benchmarks for entertainment destination development:</p>
<ul>
  <li><strong>Go-karting track</strong> (400m outdoor): ₹3.5–6 Cr including track, barriers, safety systems, timing equipment, and basic F&B infrastructure</li>
  <li><strong>Trampoline park</strong> (8,000–15,000 sq ft): ₹2.8–4.5 Cr including trampoline installation, foam pits, ninja warrior courses, and structural upgrades</li>
  <li><strong>Bowling alley</strong> (8 lanes): ₹4–7 Cr including lane equipment (AMF/Brunswick), flooring, scoring systems, seating, and F&B</li>
  <li><strong>Indoor climbing wall</strong> (4,000–8,000 sq ft): ₹1.8–3.2 Cr including wall structures, safety systems, and equipment</li>
  <li><strong>VR / gaming zone</strong> (3,000–6,000 sq ft): ₹2.5–5 Cr including VR hardware, gaming pods, cabling, and digital infrastructure</li>
  <li><strong>Integrated FEC</strong> (25,000–50,000 sq ft, multiple formats): ₹18–40 Cr including all entertainment formats, F&B build-out, and interior design</li>
</ul>

<h3>Revenue Model</h3>
<p>Entertainment destination revenue models have three layers:</p>
<ol>
  <li><strong>Activity revenue</strong>: Per-session charges (go-kart laps, bowling games, VR sessions) — typically 55–65% of total revenue; highest margin (70–80% gross margin)</li>
  <li><strong>F&B revenue</strong>: Restaurant, café, bar — typically 25–35% of total revenue; gross margin 60–70% for mid-market F&B offering</li>
  <li><strong>Ancillary revenue</strong>: Birthday packages, corporate MICE bookings, membership programs, retail (branded merchandise) — typically 10–20% of total revenue; highest contribution margin</li>
</ol>
<p>India Gully's revenue model for a ₹15 Cr standalone FEC (25,000 sq ft, 3 entertainment formats + F&B) projects stabilised Year 3 revenue of ₹6–8 Cr against operating cost of ₹3.5–4.5 Cr, implying EBITDA of ₹2–3.5 Cr (30–45% margin) and a project-level IRR of 18–26% over a 7-year horizon.</p>

<h3>Valuation Methodology</h3>
<p>Entertainment real estate requires a bespoke valuation approach that blends real estate and operating business methodologies:</p>
<ul>
  <li><strong>DCF on stabilised cash flows</strong>: Primary methodology for operational properties; discount rate 14–18% for entertainment assets reflecting operating risk premium</li>
  <li><strong>EV/EBITDA comparable</strong>: Benchmarked against listed entertainment operators (PVR Inox, Wonderla) at 10–16x EBITDA; applicable to scaled multi-location operators</li>
  <li><strong>Real estate residual value</strong>: For owned property entertainment assets, land and building value provides floor value; applicable when operating business value is impaired</li>
</ul>

<h2>3. Operator Selection and Partnership Structures</h2>
<p>Unlike hotels where the brand/operator market is well-structured, entertainment operators in India operate a fragmented, largely domestic market. India Gully's operator partnership framework:</p>

<h3>Option A: Operator-Managed Model</h3>
<p>Developer builds and owns the asset; experienced operator manages for a management fee (typically 8–15% of revenue + 20–25% of EBITDA over hurdle). Best for developers without entertainment operating capability. Risk: operator dependency; quality of operators is highly variable in India's entertainment space.</p>

<h3>Option B: Revenue Share Lease</h3>
<p>Developer leases space to operator on revenue share basis (typically base rent + 12–20% of gross revenue). Lower risk for developer; operator retains upside. Best for developer-landlords seeking income certainty. India Gully has structured 2 such arrangements in the past 12 months.</p>

<h3>Option C: Franchise Model</h3>
<p>International entertainment franchise brands (Kidzania, Bounce, Clip 'n Climb) provide brand, operating manual, and marketing for an upfront franchise fee (₹1.5–8 Cr) plus ongoing royalty (3–6% of revenue). Best for operators without brand development budget but seeking a proven concept. International franchise availability in India is growing: Kidzania (Delhi), Bounce (Bengaluru, Gurgaon), Sky Zone (Mumbai announced).</p>

<h2>4. India Gully's Entertainment Advisory Practice</h2>
<p>India Gully's entertainment advisory practice provides end-to-end support for entertainment destination developers and operators:</p>
<ul>
  <li><strong>Feasibility and concept study</strong>: Market demand analysis, concept selection, revenue modelling, capex benchmarking, and financial projections</li>
  <li><strong>Operator / franchise selection</strong>: India Gully maintains relationships with 20+ entertainment operators and franchise brands across format categories</li>
  <li><strong>Real estate advisory</strong>: Site selection, landlord negotiation (for leased formats), and property acquisition advisory for owned-format developments</li>
  <li><strong>Regulatory navigation</strong>: Fire safety, occupancy, FSSAI, and excise licensing across the relevant state regulatory framework</li>
  <li><strong>Capital raise</strong>: Structuring and placing entertainment destination projects with family offices and HNI investors seeking alternative real estate exposure</li>
</ul>
`,
  },
]

// Category colour map
const CAT_COLOR: Record<string, { bg: string; text: string; border: string }> = {
  'Real Estate':              { bg: 'rgba(26,58,107,.1)',   text: '#1A3A6B',  border: 'rgba(26,58,107,.2)' },
  'Entertainment':            { bg: 'rgba(124,58,237,.09)', text: '#7C3AED',  border: 'rgba(124,58,237,.2)' },
  'HORECA':                   { bg: 'rgba(22,163,74,.08)',  text: '#15803d',  border: 'rgba(22,163,74,.2)' },
  'Debt & Special Situations':{ bg: 'rgba(220,38,38,.07)',  text: '#b91c1c',  border: 'rgba(220,38,38,.18)' },
  'Retail':                   { bg: 'rgba(184,150,12,.1)',  text: '#B8960C',  border: 'rgba(184,150,12,.25)' },
  'Hospitality':              { bg: 'rgba(6,95,70,.08)',    text: '#065F46',  border: 'rgba(6,95,70,.2)' },
}

function catBadge(cat: string) {
  const c = CAT_COLOR[cat] || { bg: 'rgba(184,150,12,.1)', text: '#B8960C', border: 'rgba(184,150,12,.25)' }
  return `<span style="background:${c.bg};color:${c.text};border:1px solid ${c.border};font-size:.58rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;padding:.22rem .6rem;">${cat}</span>`
}

const ALL_CATS = ['All', 'Real Estate', 'Hospitality', 'Entertainment', 'Retail', 'HORECA', 'Debt & Special Situations']

// ── INSIGHTS INDEX ─────────────────────────────────────────────────────────
app.get('/', (c) => {
  const featured = ARTICLES[0]
  const rest = ARTICLES.slice(1)

  const content = `
<style>
.ins-filter-row{display:flex;flex-wrap:wrap;gap:.5rem;}
.ins-filter-btn{padding:.5rem 1.1rem;font-size:.66rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.03);color:rgba(255,255,255,.5);cursor:pointer;transition:all .25s;white-space:nowrap;backdrop-filter:blur(4px);}
.ins-filter-btn:hover{border-color:rgba(255,255,255,.4);color:rgba(255,255,255,.8);}
.ins-filter-btn.active{border-color:var(--gold);background:var(--gold);color:#fff;}
.ins-filter-btn:focus-visible{outline:2px solid var(--gold);outline-offset:2px;}
.insight-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:1.75rem;}
.ins-card{background:#fff;border:1px solid var(--border-lt);display:flex;flex-direction:column;overflow:hidden;transition:border-color .28s,box-shadow .28s,transform .28s;position:relative;}
.ins-card::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--gold),transparent);opacity:0;transition:opacity .28s;}
.ins-card:hover{border-color:rgba(184,150,12,.3);box-shadow:0 16px 52px rgba(0,0,0,.1);transform:translateY(-5px);}
.ins-card:hover::before{opacity:1;}
.ins-card__img{height:200px;overflow:hidden;position:relative;background:#111;flex-shrink:0;}
.ins-card__img img{width:100%;height:100%;object-fit:cover;transition:transform 6s cubic-bezier(.4,0,.2,1);}
.ins-card:hover .ins-card__img img{transform:scale(1.05);}
.ins-card__overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.65) 0%,rgba(0,0,0,.08) 60%,transparent 100%);}
.ins-card__meta{position:absolute;bottom:.875rem;left:.875rem;right:.875rem;display:flex;align-items:flex-end;justify-content:space-between;}
.ins-card__body{padding:1.75rem;flex:1;display:flex;flex-direction:column;}
.ins-card__title{font-family:'DM Serif Display',Georgia,serif;font-size:1.12rem;color:var(--ink);line-height:1.28;margin-bottom:.75rem;flex:1;}
.ins-card__excerpt{font-size:.82rem;color:var(--ink-muted);line-height:1.75;margin-bottom:1.1rem;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;}
.ins-card__tags{display:flex;flex-wrap:wrap;gap:.3rem;margin-bottom:1.1rem;}
.ins-card__tag{background:rgba(10,10,10,.04);color:var(--ink-soft);border:1px solid var(--border);font-size:.57rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:.15rem .5rem;}
.ins-card__read{display:inline-flex;align-items:center;gap:.4rem;font-size:.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--gold);transition:gap .2s;margin-top:auto;}
.ins-card__read:hover{gap:.65rem;}
.ins-stats-bar{display:grid;grid-template-columns:repeat(4,1fr);border-left:1px solid rgba(255,255,255,.05);}
.ins-stat{padding:1.75rem 2rem;border-right:1px solid rgba(255,255,255,.05);text-align:center;transition:background .22s;}
.ins-stat:hover{background:rgba(184,150,12,.04);}
.ins-stat__n{font-family:'DM Serif Display',Georgia,serif;font-size:1.9rem;color:var(--gold);line-height:1;margin-bottom:.35rem;letter-spacing:-.02em;}
.ins-stat__l{font-size:.58rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.42);}
@media(max-width:860px){.insight-grid{grid-template-columns:repeat(2,1fr);}}
@media(max-width:580px){
  .insight-grid{grid-template-columns:1fr;}
  .ins-filter-row{flex-wrap:nowrap;overflow-x:auto;padding-bottom:.5rem;scrollbar-width:none;-webkit-overflow-scrolling:touch;}
  .ins-filter-row::-webkit-scrollbar{display:none;}
  .ins-filter-btn{flex-shrink:0;}
  .ins-stats-bar{grid-template-columns:repeat(2,1fr);}
  .ins-stat{padding:1.25rem 1rem;}
  .ins-stat__n{font-size:1.5rem;}
}
</style>

<!-- ══ INSIGHTS HERO ════════════════════════════════════════════════════ -->
<div class="hero-dk">
  <div class="hero-dk-grid"></div>
  <div style="position:absolute;inset:0;background:radial-gradient(ellipse 60% 70% at 70% 40%,rgba(184,150,12,.05) 0%,transparent 55%);pointer-events:none;"></div>
  <div style="position:absolute;bottom:0;left:0;right:0;height:100px;background:linear-gradient(to bottom,transparent,var(--ink));pointer-events:none;"></div>
  <div class="wrap" style="position:relative;">
    <div style="max-width:720px;" class="fu">
      <div style="display:flex;align-items:center;gap:1rem;margin-bottom:1.5rem;">
        <div style="width:40px;height:1px;background:linear-gradient(90deg,var(--gold),transparent);"></div>
        <span style="font-size:.6rem;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--gold);">Insights &amp; Research</span>
      </div>
      <h1 class="h1" style="margin-bottom:1.5rem;">Thought Leadership<br><em style="color:var(--gold);font-style:italic;">from the Field</em></h1>
      <p class="lead-lt" style="max-width:600px;margin-bottom:2.75rem;">Market research, sector analysis and operational insights from India Gully's advisory practice — drawn from active mandates across hospitality, real estate, retail and entertainment.</p>
      <!-- Category Filter Buttons -->
      <div id="insightFilterRow" class="ins-filter-row" role="group" aria-label="Filter articles by category">
        ${ALL_CATS.map((cat: string, i: number) => `
        <button onclick="filterInsights('${cat}')" data-cat="${cat}"
                class="ins-filter-btn${i === 0 ? ' active' : ''}"
                aria-pressed="${i === 0 ? 'true' : 'false'}">${cat}</button>`).join('')}
      </div>
    </div>
  </div>
</div>

<!-- ══ STATS BAR ══════════════════════════════════════════════════════════ -->
<div style="background:var(--ink-mid);border-bottom:1px solid rgba(255,255,255,.05);">
  <div class="wrap" style="padding:0;">
    <div class="ins-stats-bar">
      ${[
        { n: '19', l: 'In-Depth Articles' },
        { n: '6',  l: 'Sectors Covered' },
        { n: '₹1,165 Cr+', l: 'Active Pipeline' },
        { n: '2024–26', l: 'Research Period' },
      ].map((s: any) => `<div class="ins-stat"><div class="ins-stat__n">${s.n}</div><div class="ins-stat__l">${s.l}</div></div>`).join('')}
    </div>
  </div>
</div>

<!-- ══ FEATURED ARTICLE ════════════════════════════════════════════════ -->
<div class="sec-wh" id="insightsContent" style="padding-top:6rem;">
  <div class="wrap">

    <!-- Featured Card — editorial magazine layout -->
    <div id="featuredArticle" data-cat="${featured.category}"
         style="display:grid;grid-template-columns:1fr 1fr;gap:0;border:1px solid var(--border-lt);overflow:hidden;margin-bottom:4rem;transition:all .3s;position:relative;"
         class="mob-stack feat-card feature-card"
         onmouseover="this.style.borderColor='rgba(184,150,12,.3)';this.style.boxShadow='0 20px 60px rgba(0,0,0,.1)'" onmouseout="this.style.borderColor='var(--border-lt)';this.style.boxShadow='none'">
      <!-- Image side -->
      <div style="position:relative;min-height:380px;overflow:hidden;background:#111;">
        <img src="${CAT_IMAGES[featured.category] || 'https://hotelrajshreechandigarh.com/wp-content/uploads/2025/12/Hotel-Rajshree-5-scaled-e1765525431558.webp'}"
             alt="${featured.title}"
             style="width:100%;height:100%;object-fit:cover;transition:transform 8s cubic-bezier(.4,0,.2,1);" loading="eager"
             onmouseover="this.style.transform='scale(1.04)'" onmouseout="this.style.transform='scale(1)'">
        <div style="position:absolute;inset:0;background:linear-gradient(to right,rgba(0,0,0,.45) 0%,rgba(0,0,0,.1) 100%);"></div>
        <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.5) 0%,transparent 50%);"></div>
        <div style="position:absolute;top:1.5rem;left:1.5rem;">${catBadge(featured.category)}</div>
        <div style="position:absolute;top:1.5rem;right:1.5rem;background:rgba(0,0,0,.45);backdrop-filter:blur(6px);color:rgba(255,255,255,.7);font-size:.6rem;font-weight:600;letter-spacing:.08em;padding:.28rem .7rem;display:flex;align-items:center;gap:.35rem;"><i class="fas fa-clock" style="font-size:.52rem;color:var(--gold);"></i>${featured.readTime}</div>
        <div style="position:absolute;bottom:1.5rem;left:1.5rem;font-size:.65rem;color:rgba(255,255,255,.5);letter-spacing:.08em;">${featured.date}</div>
      </div>
      <!-- Content side -->
      <div style="padding:3.25rem;display:flex;flex-direction:column;justify-content:center;background:#fff;">
        <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1.1rem;">
          <span style="font-size:.58rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);background:rgba(184,150,12,.08);border:1px solid rgba(184,150,12,.2);padding:.22rem .65rem;">Featured Article</span>
          <span style="font-size:.6rem;color:var(--ink-faint);letter-spacing:.08em;">${featured.readTime}</span>
        </div>
        <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:clamp(1.5rem,2.4vw,2rem);color:var(--ink);line-height:1.18;margin-bottom:1.1rem;">${featured.title}</h2>
        <p style="font-size:.9rem;color:var(--ink-soft);line-height:1.85;margin-bottom:2rem;">${featured.excerpt}</p>
        <div style="display:flex;flex-wrap:wrap;gap:.4rem;margin-bottom:2rem;">
          ${featured.tags.map((t: string) => `<span style="background:rgba(10,10,10,.04);color:var(--ink-soft);border:1px solid var(--border);font-size:.6rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:.18rem .55rem;">${t}</span>`).join('')}
        </div>
        <a href="/insights/${featured.id}" class="btn btn-g" style="align-self:flex-start;">Read Full Article <i class="fas fa-arrow-right" style="margin-left:.4rem;font-size:.62rem;"></i></a>
      </div>
    </div>
    <style>@media(max-width:640px){.feat-card{grid-template-columns:1fr!important;}.feat-card>div:first-child{min-height:240px!important;}}</style>

    <!-- Articles Grid -->
    <div class="insight-grid" id="articleGrid">
      ${rest.map((a, i) => `
      <article class="ins-card" data-cat="${a.category}" style="animation:fadeUp .5s ease ${i * 0.06}s both;">
        <div class="ins-card__img">
          <img src="${CAT_IMAGES[a.category] || 'https://hotelrajshreechandigarh.com/wp-content/uploads/2025/12/Hotel-Rajshree-5-scaled-e1765525431558.webp'}"
               alt="${a.title}" loading="lazy">
          <div class="ins-card__overlay"></div>
          <div style="position:absolute;top:.875rem;left:.875rem;">${catBadge(a.category)}</div>
          <div class="ins-card__meta">
            <span style="font-size:.62rem;color:rgba(255,255,255,.6);letter-spacing:.06em;">${a.date}</span>
            <span style="font-size:.62rem;color:rgba(255,255,255,.5);letter-spacing:.04em;display:flex;align-items:center;gap:.3rem;"><i class="fas fa-clock" style="font-size:.52rem;color:var(--gold);"></i>${a.readTime}</span>
          </div>
        </div>
        <div class="ins-card__body">
          <h3 class="ins-card__title">${a.title}</h3>
          <p class="ins-card__excerpt">${a.excerpt}</p>
          <div class="ins-card__tags">
            ${a.tags.slice(0, 3).map((t: string) => `<span class="ins-card__tag">${t}</span>`).join('')}
          </div>
          <a href="/insights/${a.id}" class="ins-card__read">Read Article <i class="fas fa-arrow-right" style="font-size:.6rem;"></i></a>
        </div>
      </article>`).join('')}
    </div>
  </div>
</div>

<!-- ══ SUBSCRIBE ══════════════════════════════════════════════════════════ -->
<div class="sec-pd" id="subscribe">
  <div class="wrap">
    <div style="background:var(--ink);padding:4rem;display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center;" class="mob-stack">
      <div>
        <div class="gr-lt"></div>
        <p class="eyebrow" style="margin-bottom:.75rem;">Stay Informed</p>
        <h2 class="h2-lt" style="margin-bottom:1rem;">Subscribe to<br>India Gully Insights</h2>
        <p class="lead-lt" style="font-size:.9rem;">Receive our sector research, market updates and mandate alerts directly — for qualified investors, developers and industry professionals.</p>
        <div style="margin-top:2rem;display:flex;flex-direction:column;gap:.75rem;">
          ${[
            { icon: 'newspaper', text: 'Monthly sector research reports' },
            { icon: 'bell', text: 'New mandate alerts (NDA-protected)' },
            { icon: 'chart-line', text: 'Market outlook and deal commentary' },
          ].map(b => `
          <div style="display:flex;align-items:center;gap:.875rem;">
            <div style="width:32px;height:32px;background:rgba(184,150,12,.15);border:1px solid rgba(184,150,12,.25);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
              <i class="fas fa-${b.icon}" style="color:var(--gold);font-size:.72rem;"></i>
            </div>
            <span style="font-size:.82rem;color:rgba(255,255,255,.65);">${b.text}</span>
          </div>`).join('')}
        </div>
      </div>
      <div>
        <form class="ig-form" method="POST" action="/api/subscribe" style="display:flex;flex-direction:column;gap:1rem;">
          <div>
            <label style="display:block;font-size:.62rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-bottom:.35rem;">Your Name</label>
            <input type="text" name="name" required placeholder="Full name"
                   style="width:100%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);padding:.75rem 1rem;font-size:.875rem;color:#fff;font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s;"
                   onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='rgba(255,255,255,.1)'">
          </div>
          <div>
            <label style="display:block;font-size:.62rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-bottom:.35rem;">Email Address *</label>
            <input type="email" name="email" required placeholder="your@email.com"
                   style="width:100%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);padding:.75rem 1rem;font-size:.875rem;color:#fff;font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s;"
                   onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='rgba(255,255,255,.1)'">
          </div>
          <div>
            <label style="display:block;font-size:.62rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.6);margin-bottom:.35rem;">Professional Role</label>
            <select name="role"
                    style="width:100%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);padding:.75rem 1rem;font-size:.875rem;color:rgba(255,255,255,.7);font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s;cursor:pointer;"
                    onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='rgba(255,255,255,.1)'">
              <option value="" style="background:#111;color:#fff;">Select your role</option>
              <option style="background:#111;color:#fff;">Developer / Promoter</option>
              <option style="background:#111;color:#fff;">Institutional Investor</option>
              <option style="background:#111;color:#fff;">Family Office</option>
              <option style="background:#111;color:#fff;">Hotel / Hospitality Professional</option>
              <option style="background:#111;color:#fff;">Retail Brand / Operator</option>
              <option style="background:#111;color:#fff;">Advisor / Consultant</option>
              <option style="background:#111;color:#fff;">Other</option>
            </select>
          </div>
          <button type="submit" class="btn btn-g" style="width:100%;justify-content:center;padding:.875rem;">
            <i class="fas fa-paper-plane" style="margin-right:.5rem;"></i>Subscribe to Insights
          </button>
          <p style="font-size:.68rem;color:rgba(255,255,255,.45);line-height:1.6;">By subscribing you agree to receive occasional research updates and mandate alerts from India Gully. We respect your privacy and you can unsubscribe at any time.</p>
        </form>
      </div>
    </div>
  </div>
</div>

<script>
function filterInsights(cat) {
  var cards = document.querySelectorAll('.ins-card');
  var featured = document.getElementById('featuredArticle');
  var btns = document.querySelectorAll('.ins-filter-btn');
  var grid = document.getElementById('articleGrid');

  btns.forEach(function(b) {
    var isActive = b.dataset.cat === cat;
    b.classList.toggle('active', isActive);
    b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });

  // Featured article
  if (featured) {
    var showFeat = (cat === 'All' || featured.dataset.cat === cat);
    featured.style.display = showFeat ? '' : 'none';
  }

  var visibleCount = 0;
  cards.forEach(function(card) {
    var match = cat === 'All' || card.dataset.cat === cat;
    card.style.display = match ? '' : 'none';
    if (match) visibleCount++;
  });

  // Show empty state if no articles match
  var empty = document.getElementById('insightsEmpty');
  if (empty) empty.style.display = visibleCount === 0 ? 'block' : 'none';
}
</script>
`

  return c.html(layout('Insights & Research — India Gully', content, {
    description: 'India Gully Insights \u2014 thought leadership, market research and sector analysis across hospitality, real estate, retail, entertainment, HORECA, and debt & special situations advisory.',
    canonical: 'https://india-gully.pages.dev/insights',
    ogImage: 'https://india-gully.pages.dev/static/og.jpg',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Insights & Research \u2014 India Gully',
      description: 'Thought leadership and market research from India Gully\u2019s advisory practice.',
      url: 'https://india-gully.pages.dev/insights',
      publisher: { '@type': 'Organization', name: 'India Gully', url: 'https://india-gully.pages.dev' }
    }
  }))
})

// ── ARTICLE DETAIL ────────────────────────────────────────────────────────────
app.get('/:id', (c) => {
  const id = c.req.param('id')
  const article = ARTICLES.find(a => a.id === id)
  if (!article) return c.redirect('/insights')

  const relatedArticles = ARTICLES.filter(a => a.id !== id && (a.category === article.category || a.tags.some((t: string) => article.tags.includes(t)))).slice(0, 3)
  const catImg = CAT_IMAGES[article.category] || 'https://hotelrajshreechandigarh.com/wp-content/uploads/2025/12/Hotel-Rajshree-5-scaled-e1765525431558.webp'

  const content = `
<!-- Phase 11D: Reading progress bar -->
<div id="article-progress" style="position:fixed;top:0;left:0;height:3px;width:0%;background:linear-gradient(90deg,var(--gold),#D4AE2A);z-index:9999;transition:width .1s linear;pointer-events:none;"></div>

<!-- ══ ARTICLE HERO ══════════════════════════════════════════════════════ -->
<div style="background:var(--ink);position:relative;overflow:hidden;">
  <!-- Background image -->
  <div style="position:absolute;inset:0;">
    <img loading="lazy" src="${catImg}" alt="${article.title}" style="width:100%;height:100%;object-fit:cover;opacity:.18;">
    <div style="position:absolute;inset:0;background:linear-gradient(135deg,rgba(8,8,8,.96) 0%,rgba(8,8,8,.75) 100%);"></div>
  </div>
  <div style="position:absolute;inset:0;background-image:linear-gradient(rgba(184,150,12,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(184,150,12,.04) 1px,transparent 1px);background-size:72px 72px;pointer-events:none;"></div>
  <div class="wrap" style="position:relative;padding-top:8rem;padding-bottom:4rem;max-width:900px;">
    <a href="/insights" style="display:inline-flex;align-items:center;gap:.5rem;font-size:.75rem;color:rgba(255,255,255,.4);margin-bottom:2rem;transition:color .2s;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='rgba(255,255,255,.4)'">
      <i class="fas fa-arrow-left" style="font-size:.65rem;"></i> Back to Insights
    </a>
    <div class="fu">
      <div style="display:flex;align-items:center;gap:.875rem;margin-bottom:1.5rem;flex-wrap:wrap;">
        ${catBadge(article.category)}
        <span style="font-size:.72rem;color:rgba(255,255,255,.4);letter-spacing:.06em;">${article.date}</span>
        <span style="font-size:.72rem;color:rgba(255,255,255,.4);letter-spacing:.06em;"><i class="fas fa-clock" style="margin-right:.35rem;font-size:.6rem;color:var(--gold);"></i>${article.readTime}</span>
      </div>
      <h1 style="font-family:'DM Serif Display',Georgia,serif;font-size:clamp(2rem,4.5vw,3.25rem);color:#fff;line-height:1.12;margin-bottom:1.5rem;">${article.title}</h1>
      <p style="font-size:1rem;color:rgba(255,255,255,.6);line-height:1.75;max-width:700px;">${article.excerpt}</p>
    </div>
    <!-- Tags -->
    <div style="margin-top:1.75rem;display:flex;flex-wrap:wrap;gap:.4rem;">
      ${article.tags.map((t: string) => `<span style="background:rgba(184,150,12,.12);color:var(--gold);border:1px solid rgba(184,150,12,.22);font-size:.62rem;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:.22rem .6rem;">${t}</span>`).join('')}
    </div>
  </div>
</div>

<!-- ══ ARTICLE BODY ════════════════════════════════════════════════════== -->
<div style="background:var(--parch);padding:5rem 0;">
  <div class="wrap" style="display:grid;grid-template-columns:1fr 320px;gap:4rem;align-items:start;max-width:1200px;" class="listing-layout">

    <!-- ── ARTICLE CONTENT ──────────────────────────────── -->
    <article>
      <!-- Article body from constants -->
      <div style="font-size:.9375rem;line-height:1.9;color:var(--ink-soft);">
        <style>
        article h2{font-family:'DM Serif Display',Georgia,serif;font-size:1.75rem;color:var(--ink);margin:2.5rem 0 1rem;line-height:1.2;}
        article h3{font-family:'DM Serif Display',Georgia,serif;font-size:1.2rem;color:var(--ink);margin:1.75rem 0 .75rem;}
        article p{margin-bottom:1.25rem;}
        article ul,article ol{margin:.875rem 0 1.25rem;padding-left:1.5rem;}
        article li{margin-bottom:.5rem;line-height:1.75;}
        article strong{color:var(--ink);font-weight:600;}
        article blockquote{border-left:3px solid var(--gold);margin:2rem 0;padding:1rem 1.5rem;background:var(--parch-dk);font-family:'DM Serif Display',Georgia,serif;font-size:1.15rem;font-style:italic;line-height:1.6;color:var(--ink);}
        </style>
        ${article.body}
      </div>

      <!-- Share + CTA -->
      <div style="margin-top:3.5rem;padding-top:2rem;border-top:1px solid var(--border);">
        <!-- Social share row -->
        <div style="display:flex;align-items:center;gap:.75rem;flex-wrap:wrap;margin-bottom:1.75rem;">
          <span style="font-size:.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-muted);margin-right:.25rem;">Share</span>
          <a href="https://twitter.com/intent/tweet?url=https://india-gully.pages.dev/insights/${article.id}&text=${encodeURIComponent(article.title + ' — India Gully Research')}&via=IndiaGully" target="_blank" rel="noopener" title="Share on X / Twitter"
             style="display:inline-flex;align-items:center;gap:.4rem;padding:.4rem .875rem;font-size:.68rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;background:#000;color:#fff;text-decoration:none;border-radius:4px;transition:opacity .2s;" onmouseover="this.style.opacity='.8'" onmouseout="this.style.opacity='1'">
            <i class="fab fa-x-twitter" style="font-size:.72rem;"></i>X / Twitter
          </a>
          <a href="https://www.linkedin.com/sharing/share-offsite/?url=https://india-gully.pages.dev/insights/${article.id}" target="_blank" rel="noopener" title="Share on LinkedIn"
             style="display:inline-flex;align-items:center;gap:.4rem;padding:.4rem .875rem;font-size:.68rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;background:#0A66C2;color:#fff;text-decoration:none;border-radius:4px;transition:opacity .2s;" onmouseover="this.style.opacity='.8'" onmouseout="this.style.opacity='1'">
            <i class="fab fa-linkedin-in" style="font-size:.72rem;"></i>LinkedIn
          </a>
          <a href="https://wa.me/?text=${encodeURIComponent(article.title + ' — India Gully Research https://india-gully.pages.dev/insights/' + article.id)}" target="_blank" rel="noopener" title="Share on WhatsApp"
             style="display:inline-flex;align-items:center;gap:.4rem;padding:.4rem .875rem;font-size:.68rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;background:#25D366;color:#fff;text-decoration:none;border-radius:4px;transition:opacity .2s;" onmouseover="this.style.opacity='.8'" onmouseout="this.style.opacity='1'">
            <i class="fab fa-whatsapp" style="font-size:.72rem;"></i>WhatsApp
          </a>
          <button onclick="navigator.clipboard&&navigator.clipboard.writeText('https://india-gully.pages.dev/insights/${article.id}').then(function(){igToast('Link copied!','success')}).catch(function(){igToast('Copy link manually','info')})" title="Copy link"
             style="display:inline-flex;align-items:center;gap:.4rem;padding:.4rem .875rem;font-size:.68rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;background:var(--parch-dk);color:var(--ink);border:1px solid var(--border);cursor:pointer;border-radius:4px;transition:all .2s;" onmouseover="this.style.background='var(--gold-pale)'" onmouseout="this.style.background='var(--parch-dk)'">
            <i class="fas fa-link" style="font-size:.72rem;color:var(--gold);"></i>Copy Link
          </button>
        </div>
        <!-- Author + CTA row -->
        <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:1.25rem;">
          <div style="font-size:.78rem;color:var(--ink-muted);">Published by <strong style="color:var(--ink);">India Gully Research</strong> · ${article.date} · <span style="color:var(--gold);"><i class="fas fa-clock" style="font-size:.68rem;"></i> ${article.readTime}</span></div>
          <div style="display:flex;gap:.625rem;flex-wrap:wrap;">
            <a href="/contact?service=${article.category}" class="btn btn-dk" style="font-size:.72rem;padding:.6rem 1.25rem;">Discuss With Our Team</a>
            <a href="/insights" class="btn btn-go" style="font-size:.72rem;padding:.6rem 1.25rem;">All Insights</a>
          </div>
        </div>
      </div>
    </article>

    <!-- ── SIDEBAR ─────────────────────────────────────── -->
    <div style="position:sticky;top:calc(var(--nav-h) + 1.5rem);display:flex;flex-direction:column;gap:1.25rem;" class="listing-sidebar">

      <!-- Phase 17B: Enhanced Author Byline Card -->
      <div style="background:linear-gradient(135deg,var(--ink) 0%,#1a1a2e 100%);border:1px solid rgba(184,150,12,.2);padding:1.5rem;position:relative;overflow:hidden;">
        <div style="position:absolute;top:0;right:0;width:80px;height:80px;background:radial-gradient(circle,rgba(184,150,12,.12) 0%,transparent 70%);pointer-events:none;"></div>
        <div style="display:flex;align-items:flex-start;gap:1rem;margin-bottom:1rem;">
          <div style="width:52px;height:52px;background:linear-gradient(135deg,var(--gold) 0%,#8A6E08 100%);display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:'DM Serif Display',Georgia,serif;font-size:1.15rem;font-weight:700;color:#fff;letter-spacing:.04em;">IG</div>
          <div>
            <div style="font-size:.78rem;font-weight:700;color:#fff;letter-spacing:.02em;">India Gully Research</div>
            <div style="font-size:.65rem;color:rgba(255,255,255,.5);margin-top:.2rem;line-height:1.4;">Transaction-Backed Advisory Practice</div>
            <div style="display:flex;align-items:center;gap:.5rem;margin-top:.5rem;flex-wrap:wrap;">
              <span style="font-size:.58rem;background:rgba(184,150,12,.18);color:var(--gold);border:1px solid rgba(184,150,12,.3);padding:.15rem .5rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;">${article.category}</span>
              <span style="font-size:.6rem;color:rgba(255,255,255,.35);"><i class="fas fa-clock" style="font-size:.55rem;color:var(--gold);margin-right:.25rem;"></i>${article.readTime}</span>
            </div>
          </div>
        </div>
        <p style="font-size:.7rem;color:rgba(255,255,255,.5);line-height:1.7;margin-bottom:1rem;">Our research draws directly from active advisory mandates — real transactions, real data, no theoretical models.</p>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:.5rem;margin-bottom:1rem;">
          ${[
            { n: '8+', l: 'Yrs Advisory' },
            { n: '40+', l: 'Contracts' },
            { n: '₹1,165 Cr', l: 'Pipeline' },
            { n: '6', l: 'Sectors' },
          ].map((s: any) => `<div style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);padding:.6rem .75rem;text-align:center;">
            <div style="font-family:'DM Serif Display',Georgia,serif;font-size:.95rem;color:var(--gold);line-height:1;">${s.n}</div>
            <div style="font-size:.55rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:rgba(255,255,255,.35);margin-top:.2rem;">${s.l}</div>
          </div>`).join('')}
        </div>
        <div style="font-size:.62rem;color:rgba(255,255,255,.3);border-top:1px solid rgba(255,255,255,.06);padding-top:.75rem;display:flex;align-items:center;justify-content:space-between;">
          <span><i class="fas fa-calendar-alt" style="color:var(--gold);font-size:.52rem;margin-right:.3rem;"></i>${article.date}</span>
          <span>India Gully · CIN U74999DL2017PTC323237</span>
        </div>
      </div>

      <!-- Phase 11D: Table of Contents (auto-generated) -->
      <div style="background:var(--parch);border:1px solid var(--border);padding:1.25rem;" id="toc-box">
        <p style="font-size:.62rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.75rem;display:flex;align-items:center;gap:.4rem;"><i class="fas fa-list" style="color:var(--gold);"></i>Contents</p>
        <div id="toc-list" style="display:flex;flex-direction:column;gap:.4rem;">
          <span style="font-size:.75rem;color:var(--ink-faint);">Loading…</span>
        </div>
      </div>

      <!-- About India Gully Research -->
      <div style="background:#fff;border:1px solid var(--border);padding:1.5rem;">
        <div style="display:flex;align-items:center;gap:.75rem;margin-bottom:1rem;padding-bottom:1rem;border-bottom:1px solid var(--border);">
          <div style="width:38px;height:38px;background:var(--ink);display:flex;align-items:center;justify-content:center;flex-shrink:0;">
            <i class="fas fa-landmark" style="color:var(--gold);font-size:.8rem;"></i>
          </div>
          <div>
            <div style="font-size:.875rem;font-weight:700;color:var(--ink);">India Gully Research</div>
            <div style="font-size:.7rem;color:var(--ink-muted);">Transaction-Backed Insights</div>
          </div>
        </div>
        <p style="font-size:.78rem;color:var(--ink-soft);line-height:1.75;">Our research is drawn directly from active advisory mandates, not secondary databases. Every insight reflects real-world transaction experience.</p>
      </div>

      <!-- Related Articles -->
      ${relatedArticles.length ? `
      <div style="background:#fff;border:1px solid var(--border);padding:1.5rem;">
        <p style="font-size:.62rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:1rem;">Related Articles</p>
        <div style="display:flex;flex-direction:column;gap:1rem;">
          ${relatedArticles.map((r: any) => `
          <a href="/insights/${r.id}" style="display:flex;flex-direction:column;gap:.35rem;padding-bottom:1rem;border-bottom:1px solid var(--border);text-decoration:none;" onmouseover="this.querySelector('h4').style.color='var(--gold)'" onmouseout="this.querySelector('h4').style.color='var(--ink)'">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:.5rem;">
              ${catBadge(r.category)}
              <span style="font-size:.62rem;color:var(--ink-faint);">${r.readTime}</span>
            </div>
            <h4 style="font-family:'DM Serif Display',Georgia,serif;font-size:.9rem;color:var(--ink);line-height:1.3;transition:color .2s;">${r.title}</h4>
            <span style="font-size:.68rem;color:var(--gold);font-weight:600;letter-spacing:.06em;">Read →</span>
          </a>`).join('')}
        </div>
      </div>` : ''}

      <!-- Contact CTA -->
      <div style="background:var(--ink);padding:1.5rem;">
        <p style="font-size:.62rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:rgba(255,255,255,.45);margin-bottom:.75rem;">Advisory Enquiry</p>
        <h3 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.1rem;color:#fff;margin-bottom:.75rem;line-height:1.3;">Discuss ${article.category} Opportunities</h3>
        <p style="font-size:.75rem;color:rgba(255,255,255,.5);line-height:1.7;margin-bottom:1.25rem;">Our advisory team brings active mandate experience to every client conversation.</p>
        <a href="/contact?service=${encodeURIComponent(article.category)}" class="btn btn-g" style="width:100%;justify-content:center;display:flex;">Get in Touch <i class="fas fa-arrow-right" style="margin-left:.4rem;font-size:.65rem;"></i></a>
      </div>

      <!-- Subscribe -->
      <div style="background:var(--parch-dk);border:1px solid var(--border);padding:1.5rem;" id="subscribe-box">
        <p style="font-size:.62rem;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.75rem;"><i class="fas fa-bell" style="color:var(--gold);margin-right:.35rem;font-size:.55rem;"></i>Stay Updated</p>
        <p style="font-size:.78rem;color:var(--ink-soft);margin-bottom:1rem;line-height:1.6;">New insights from active mandates, direct to your inbox.</p>
        <div id="sub-form-wrap">
          <div style="display:flex;flex-direction:column;gap:.625rem;">
            <input type="email" id="sub-email" placeholder="your@email.com"
                   style="width:100%;box-sizing:border-box;border:1px solid var(--border);padding:.7rem .875rem;font-size:.82rem;font-family:'DM Sans',sans-serif;outline:none;transition:border-color .2s;background:#fff;color:var(--ink);"
                   onfocus="this.style.borderColor='var(--gold)'" onblur="this.style.borderColor='var(--border)'"
                   onkeydown="if(event.key==='Enter'){event.preventDefault();igSubscribe();}">
            <button onclick="igSubscribe()" id="sub-btn" class="btn btn-dk" style="width:100%;justify-content:center;font-size:.72rem;cursor:pointer;border:none;"><i class="fas fa-paper-plane" style="margin-right:.4rem;font-size:.62rem;"></i>Subscribe</button>
          </div>
        </div>
        <div id="sub-success" style="display:none;background:rgba(22,163,74,.08);border:1px solid rgba(22,163,74,.3);padding:.875rem;text-align:center;">
          <i class="fas fa-check-circle" style="color:#16a34a;font-size:1.25rem;display:block;margin-bottom:.4rem;"></i>
          <p style="font-size:.78rem;color:#15803d;font-weight:600;">Subscribed!</p>
          <p style="font-size:.7rem;color:var(--ink-muted);margin-top:.2rem;">You'll receive our next insight.</p>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- ══ MORE INSIGHTS ══════════════════════════════════════════════════════ -->
${relatedArticles.length ? `
<div class="sec-pc" style="padding-top:3.5rem;padding-bottom:3.5rem;">
  <div class="wrap">
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:2rem;flex-wrap:wrap;gap:1rem;">
      <h2 style="font-family:'DM Serif Display',Georgia,serif;font-size:1.5rem;color:var(--ink);">More from India Gully Research</h2>
      <a href="/insights" class="btn btn-dko" style="font-size:.72rem;">All Insights</a>
    </div>
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;">
      ${relatedArticles.map((r: any) => `
      <a href="/insights/${r.id}" style="display:block;background:#fff;border:1px solid var(--border);overflow:hidden;transition:all .25s;text-decoration:none;"
         onmouseover="this.style.borderColor='var(--gold)';this.style.boxShadow='0 8px 28px rgba(0,0,0,.08)'" onmouseout="this.style.borderColor='var(--border)';this.style.boxShadow='none'">
        <div style="height:140px;overflow:hidden;position:relative;background:#1a1a1a;">
          <img src="${CAT_IMAGES[r.category] || ''}" alt="${r.title}" style="width:100%;height:100%;object-fit:cover;" loading="lazy">
          <div style="position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.5),transparent);"></div>
          <div style="position:absolute;top:.75rem;left:.75rem;">${catBadge(r.category)}</div>
        </div>
        <div style="padding:1.1rem;">
          <h4 style="font-family:'DM Serif Display',Georgia,serif;font-size:.95rem;color:var(--ink);margin-bottom:.4rem;line-height:1.3;">${r.title}</h4>
          <div style="display:flex;align-items:center;justify-content:space-between;margin-top:.75rem;">
            <span style="font-size:.68rem;color:var(--ink-faint);">${r.date}</span>
            <span style="font-size:.68rem;color:var(--gold);font-weight:600;">Read →</span>
          </div>
        </div>
      </a>`).join('')}
    </div>
  </div>
</div>` : ''}

<script>
(function() {
  // Phase 11D: Reading progress bar
  var progBar = document.getElementById('article-progress');
  if (progBar) {
    window.addEventListener('scroll', function() {
      var st = window.scrollY || document.documentElement.scrollTop;
      var dh = document.documentElement.scrollHeight - window.innerHeight;
      progBar.style.width = (dh > 0 ? Math.min(100, (st / dh) * 100) : 0) + '%';
    }, { passive: true });
  }

  // Phase 11D: Auto-generate Table of Contents from article headings
  var tocList = document.getElementById('toc-list');
  var articleEl = document.querySelector('article');
  var tocLinks = [];
  var tocHeadings = [];
  if (tocList && articleEl) {
    var headings = articleEl.querySelectorAll('h2, h3');
    if (headings.length > 0) {
      var tocHtml = '';
      var hIdx = 0;
      headings.forEach(function(h) {
        var id = 'toc-' + (hIdx++);
        h.id = id;
        var indent = h.tagName === 'H3' ? 'padding-left:1.25rem;' : '';
        var size = h.tagName === 'H3' ? '.72rem' : '.78rem';
        var weight = h.tagName === 'H3' ? '400' : '600';
        tocHtml += '<a href="#' + id + '" data-toc="' + id + '" style="display:block;font-size:' + size + ';font-weight:' + weight + ';color:var(--ink-soft);line-height:1.45;padding:.28rem 0 .28rem .625rem;text-decoration:none;transition:all .18s;border-left:2px solid transparent;' + indent + '" onmouseover="if(!this.classList.contains(\'toc-active\')){this.style.color=\'var(--gold)\';this.style.borderLeftColor=\'rgba(184,150,12,.4)\'}" onmouseout="if(!this.classList.contains(\'toc-active\')){this.style.color=\'var(--ink-soft)\';this.style.borderLeftColor=\'transparent\'}">' + h.textContent + '</a>';
        tocHeadings.push(h);
      });
      tocList.innerHTML = tocHtml;
      tocLinks = Array.from(tocList.querySelectorAll('a[data-toc]'));
    } else {
      var tocBox = document.getElementById('toc-box');
      if (tocBox) tocBox.style.display = 'none';
    }
  }

  // Active TOC link on scroll
  if (tocLinks.length > 0) {
    function updateActiveToc() {
      var scrollY = window.scrollY + 100;
      var activeIdx = 0;
      for (var i = 0; i < tocHeadings.length; i++) {
        if (tocHeadings[i].getBoundingClientRect().top + window.scrollY - 120 <= scrollY) {
          activeIdx = i;
        }
      }
      tocLinks.forEach(function(link, idx) {
        if (idx === activeIdx) {
          link.classList.add('toc-active');
          link.style.color = 'var(--gold)';
          link.style.borderLeftColor = 'var(--gold)';
          link.style.fontWeight = '700';
        } else {
          link.classList.remove('toc-active');
          link.style.color = 'var(--ink-soft)';
          link.style.borderLeftColor = 'transparent';
          link.style.fontWeight = '';
        }
      });
    }
    window.addEventListener('scroll', updateActiveToc, { passive: true });
    updateActiveToc();
  }

  // Phase 11D: Subscribe AJAX
  window.igSubscribe = function() {
    var email = (document.getElementById('sub-email') || {}).value || '';
    email = email.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      var inp = document.getElementById('sub-email');
      if (inp) { inp.style.borderColor = '#dc2626'; setTimeout(function(){ inp.style.borderColor = 'var(--border)'; }, 2000); }
      return;
    }
    var btn = document.getElementById('sub-btn');
    if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-circle-notch fa-spin" style="margin-right:.4rem;"></i>Subscribing…'; }
    fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, source: 'insights_sidebar', article: window.location.pathname })
    }).then(function(r){ return r.json(); }).then(function(){
      var wrap = document.getElementById('sub-form-wrap');
      var suc = document.getElementById('sub-success');
      if (wrap) wrap.style.display = 'none';
      if (suc) suc.style.display = 'block';
    }).catch(function(){
      if (btn) { btn.disabled = false; btn.innerHTML = '<i class="fas fa-paper-plane" style="margin-right:.4rem;font-size:.62rem;"></i>Subscribe'; }
    });
  };

  // Phase 11B: Track page view
  try {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'pageview', page: window.location.pathname, ref: document.referrer })
    }).catch(function(){});
  } catch(e) {}
})();
</script>
`

  return c.html(layout(article.title, content, {
    description: article.excerpt,
    ogImage: CAT_IMAGES[article.category],
    canonical: `https://india-gully.pages.dev/insights/${article.id}`,
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          headline: article.title,
          description: article.excerpt,
          image: CAT_IMAGES[article.category],
          datePublished: article.date,
          author: { '@type': 'Organization', name: 'India Gully Research', url: 'https://india-gully.pages.dev' },
          publisher: {
            '@type': 'Organization', name: 'India Gully',
            logo: { '@type': 'ImageObject', url: 'https://india-gully.pages.dev/assets/logo-white.png' }
          },
          mainEntityOfPage: { '@type': 'WebPage', '@id': `https://india-gully.pages.dev/insights/${article.id}` },
          keywords: article.tags.join(', '),
          articleSection: article.category,
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://india-gully.pages.dev/' },
            { '@type': 'ListItem', position: 2, name: 'Insights', item: 'https://india-gully.pages.dev/insights' },
            { '@type': 'ListItem', position: 3, name: article.title, item: `https://india-gully.pages.dev/insights/${article.id}` },
          ]
        }
      ]
    }
  }))
})

export default app
