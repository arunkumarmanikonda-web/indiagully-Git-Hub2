// India Gully — Master Data Constants
// All brand tokens, team, verticals, listings — single source of truth

export const BRAND = {
  gold: '#B8960C',
  goldLight: '#D4AE2A',
  goldDark: '#8A6E08',
  dark: '#111111',
  darkMid: '#1E1E1E',
  warmWhite: '#FAFAF7',
  cream: '#FAF8F3',
  creamDark: '#F2EDE3',
  border: '#E4DECE',
}

export const META = {
  company: 'India Gully',
  legalName: 'Vivacious Entertainment and Hospitality Pvt. Ltd.',
  tagline: 'Celebrating Desiness',
  taglineFull: 'Celebrating Desiness Across Every Vertical',
  cin: 'U74999DL2017PTC323237',
  gstin: '07AAGCV0867P1ZN',
  address: 'New Delhi, India',
  email: 'info@indiagully.com',
  phone: '+91 8988 988 988',
  website: 'https://indiagully.com',
}

export const TEAM = [
  {
    id: 'arun-manikonda',
    name: 'Arun Manikonda',
    title: 'Managing Director',
    designation: 'Director on Board & KMP',
    phone: '+91 98108 89134',
    email: 'akm@indiagully.com',
    initials: 'AM',
    // Professional portrait — verified Unsplash ID
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80',
    bio: 'Founding Director with 20+ years across hospitality, real estate and entertainment. Leads all strategic advisory mandates and institutional client relationships.',
  },
  {
    id: 'pavan-manikonda',
    name: 'Pavan Manikonda',
    title: 'Executive Director',
    designation: 'Director on Board & KMP',
    phone: '+91 6282556067',
    email: 'pavan@indiagully.com',
    initials: 'PM',
    // Professional portrait — verified Unsplash ID
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    bio: 'Drives operations and business development across HORECA, hotel management and new vertical expansion. Board Director and KMP.',
  },
  {
    id: 'amit-jhingan',
    name: 'Amit Jhingan',
    title: 'President, Real Estate',
    designation: 'KMP (Not a Director)',
    phone: '+91 9899993543',
    email: 'amit.jhingan@indiagully.com',
    initials: 'AJ',
    // Professional portrait — verified Unsplash ID
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80',
    bio: 'Chief Marketing Officer and Real Estate Vertical Head. Specialist in retail leasing, commercial transactions, entertainment city advisory and investor-grade deal structuring.',
  },
]

export const VERTICALS = [
  { id: 'real-estate', name: 'Real Estate', icon: '🏛️', desc: 'Transaction advisory, site selection & asset management across commercial and hospitality real estate.' },
  { id: 'retail', name: 'Retail & Leasing', icon: '🛍️', desc: 'Leasing strategy, brand mix, fit-out coordination and anchor structuring for malls and mixed-use destinations.' },
  { id: 'hospitality', name: 'Hospitality', icon: '🏨', desc: 'Hotel management, brand on-boarding, pre-opening, PMC and feasibility for hotels across India.' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎡', desc: 'Theme parks, FECs, indoor & outdoor entertainment destinations — concept to commissioning.' },
  { id: 'debt-special', name: 'Debt & Special Situations', icon: '⚖️', desc: 'Structured debt advisory, distressed asset resolution and special situation mandates.' },
  { id: 'horeca', name: 'HORECA Solutions', icon: '🍽️', desc: 'End-to-end FF&E, OS&E, kitchen equipment, linen and tableware procurement for hotels and F&B.' },
]

export const STATS = [
  { value: '₹10,000 Cr+', label: 'Advisory Pipeline' },
  { value: '15+', label: 'Hotel Projects' },
  { value: '30+', label: 'Retail Brands' },
  { value: '20+', label: 'Hospitality Brand Partnerships' },
  { value: 'Pan-India', label: 'Presence' },
]

// ── BRAND LOGOS ─────────────────────────────────────────────────────────────
// All logos are inline SVG — zero external dependencies, always visible.
// Each svg field is a complete <svg>…</svg> string ready to embed in HTML.

// Helper to make a branded SVG wordmark tile
// bg=brand colour, text=display name, textColor=text colour, size=font scale
function svgLogo(name: string, bg: string, textColor: string, fontSize = 11): string {
  const escaped = name.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  // Split long names into two lines at a natural break
  const words = name.split(' ')
  let line1 = name, line2 = ''
  if (words.length >= 3 && name.length > 12) {
    const mid = Math.ceil(words.length / 2)
    line1 = words.slice(0, mid).join(' ')
    line2 = words.slice(mid).join(' ')
  } else if (words.length === 2 && name.length > 14) {
    line1 = words[0]; line2 = words[1]
  }
  const l1e = line1.replace(/&/g, '&amp;')
  const l2e = line2.replace(/&/g, '&amp;')
  const y1 = line2 ? '44%' : '58%'
  return `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="48" viewBox="0 0 120 48"><rect width="120" height="48" fill="${bg}"/><text x="60" y="${y1}" font-family="Georgia,serif" font-size="${fontSize}" font-weight="700" fill="${textColor}" text-anchor="middle" dominant-baseline="middle" letter-spacing="0.5">${l1e}</text>${line2 ? `<text x="60" y="72%" font-family="Georgia,serif" font-size="${fontSize}" font-weight="700" fill="${textColor}" text-anchor="middle" dominant-baseline="middle" letter-spacing="0.5">${l2e}</text>` : ''}</svg>`
}

function svgToDataUri(svg: string): string {
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)
}

// Hospitality brands — proper brand colours
export const HOSPITALITY_BRANDS = [
  { name: 'Marriott',        svg: svgToDataUri(svgLogo('MARRIOTT',        '#8B0000', '#fff', 11)),  color: '#8B0000', cat: 'Global Chain' },
  { name: 'Radisson',        svg: svgToDataUri(svgLogo('RADISSON',        '#003DA5', '#fff', 11)),  color: '#003DA5', cat: 'Global Chain' },
  { name: 'IHG Hotels',      svg: svgToDataUri(svgLogo('IHG',             '#006399', '#fff', 14)),  color: '#006399', cat: 'Global Chain' },
  { name: 'Taj Hotels',      svg: svgToDataUri(svgLogo('TAJ HOTELS',      '#1A1A1A', '#C9A84C', 10)), color: '#1A1A1A', cat: 'Indian Luxury' },
  { name: 'ITC Hotels',      svg: svgToDataUri(svgLogo('ITC HOTELS',      '#2C5F2E', '#FFD700', 10)), color: '#2C5F2E', cat: 'Indian Luxury' },
  { name: 'Lemon Tree',      svg: svgToDataUri(svgLogo('LEMON TREE',      '#F5A623', '#fff', 10)),  color: '#F5A623', cat: 'Midscale' },
  { name: 'Cygnett Hotels',  svg: svgToDataUri(svgLogo('CYGNETT',         '#1A3A6B', '#fff', 11)),  color: '#1A3A6B', cat: 'Midscale' },
  { name: 'Regenta / Royal Orchid', svg: svgToDataUri(svgLogo('REGENTA',  '#6B1A1A', '#fff', 11)), color: '#6B1A1A', cat: 'Midscale' },
  { name: 'Sarovar Hotels',  svg: svgToDataUri(svgLogo('SAROVAR',         '#C0392B', '#fff', 11)),  color: '#C0392B', cat: 'Midscale' },
  { name: 'Pride Hotels',    svg: svgToDataUri(svgLogo('PRIDE HOTELS',    '#B8960C', '#fff', 10)),  color: '#B8960C', cat: 'Midscale' },
  { name: 'Keys Hotels',     svg: svgToDataUri(svgLogo('KEYS HOTELS',     '#1A6B3A', '#fff', 10)),  color: '#1A6B3A', cat: 'Economy' },
  { name: 'Louvre Hotels',   svg: svgToDataUri(svgLogo('LOUVRE HOTELS',   '#2C3E50', '#E8C96C', 10)), color: '#2C3E50', cat: 'Economy' },
]

// Retail brand relationships
export const RETAIL_BRANDS = [
  { name: 'Big Bazaar',   svg: svgToDataUri(svgLogo('BIG BAZAAR',  '#E21D26', '#fff', 10)),   cat: 'Anchor' },
  { name: 'Lifestyle',    svg: svgToDataUri(svgLogo('LIFESTYLE',   '#1A1A1A', '#fff', 10)),    cat: 'Anchor' },
  { name: 'Max Fashion',  svg: svgToDataUri(svgLogo('MAX',         '#E63946', '#fff', 16)),    cat: 'Fashion' },
  { name: 'Westside',     svg: svgToDataUri(svgLogo('WESTSIDE',    '#2C2C2C', '#fff', 10)),    cat: 'Fashion' },
  { name: 'H&M',          svg: svgToDataUri(svgLogo('H&M',         '#E50010', '#fff', 16)),    cat: 'Fashion' },
  { name: 'Zara',         svg: svgToDataUri(svgLogo('ZARA',        '#1A1A1A', '#fff', 14)),    cat: 'Fashion' },
  { name: "McDonald's",   svg: svgToDataUri(svgLogo("McDONALD'S",  '#FFC72C', '#DA291C', 9)),  cat: 'F&B' },
  { name: 'KFC',          svg: svgToDataUri(svgLogo('KFC',         '#F40027', '#fff', 16)),    cat: 'F&B' },
  { name: 'Subway',       svg: svgToDataUri(svgLogo('SUBWAY',      '#009B48', '#FFC709', 11)), cat: 'F&B' },
  { name: 'Starbucks',    svg: svgToDataUri(svgLogo('STARBUCKS',   '#00704A', '#fff', 10)),    cat: 'F&B' },
  { name: "Domino's",     svg: svgToDataUri(svgLogo("DOMINO'S",    '#006491', '#fff', 10)),    cat: 'F&B' },
  { name: 'Pizza Hut',    svg: svgToDataUri(svgLogo('PIZZA HUT',   '#EE3124', '#fff', 11)),    cat: 'F&B' },
]

// Transaction Advisory partners
export const ADVISORY_PARTNERS = [
  { name: 'Ernst & Young',   abbr: 'EY',        svg: svgToDataUri(svgLogo('EY',        '#FFE600', '#2E2E2E', 22)), color: '#FFE600', textColor: '#2E2E2E', sub: 'Transaction Advisory & Assurance' },
  { name: 'CBRE',            abbr: 'CBRE',       svg: svgToDataUri(svgLogo('CBRE',      '#003087', '#fff', 18)),    color: '#003087', textColor: '#fff',    sub: 'Real Estate & Capital Markets' },
  { name: 'ANAROCK',         abbr: 'ANAROCK',    svg: svgToDataUri(svgLogo('ANAROCK',   '#E4003A', '#fff', 12)),    color: '#E4003A', textColor: '#fff',    sub: 'Property Consultants' },
  { name: 'Pipara & Co',     abbr: 'PIPARA',     svg: svgToDataUri(svgLogo('PIPARA',    '#1A5276', '#fff', 13)),    color: '#1A5276', textColor: '#fff',    sub: 'Chartered Accountants' },
  { name: 'Resurgent India', abbr: 'RESURGENT',  svg: svgToDataUri(svgLogo('RESURGENT', '#1E8449', '#fff', 11)),   color: '#1E8449', textColor: '#fff',    sub: 'Investment Banking' },
]

// ── LISTINGS ────────────────────────────────────────────────────────────────
// Each listing has: id, title, location, sector, value, status, badge,
// desc (short), longDesc, images[], specs{}, highlights[], tags[], highlight
// images use Unsplash for realistic property photography
export const LISTINGS = [
  {
    id: 'entertainment-maharashtra',
    title: 'Integrated Entertainment Destination',
    subtitle: 'World-Class Theme Park + Luxury Hotel + Retail Mall',
    location: 'Maharashtra, India',
    locationShort: 'Maharashtra',
    sector: 'Entertainment',
    sectorColor: '#7C3AED',
    value: '₹4,500 Cr',
    valueUSD: 'USD ~540 Mn',
    status: 'Active Mandate · Exclusive',
    statusType: 'active',
    mandateType: 'Exclusive Transaction Advisory',
    desc: 'Mega integrated entertainment destination combining a world-class theme park, luxury hotel tower, F&B street and retail mall across 200+ acres in Maharashtra. Phase 1 approved — first-of-its-kind project in India.',
    longDesc: `India's most ambitious integrated entertainment destination — a landmark 200+ acre project in Maharashtra that brings together a world-class theme park, a luxury branded hotel, a curated F&B street and a premium retail mall under one master plan.\n\nPhase 1 is approved and shovel-ready. The project is positioned as India's answer to global destination parks, targeting both domestic and international family tourism. The development model layers entertainment, hospitality and retail for a proven mixed-revenue format with strong yield resilience.\n\nIndia Gully holds an exclusive transaction advisory mandate and is seeking a marquee co-developer, institutional investor or PE fund to partner on this transformational project.`,
    images: [
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
      'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1200&q=80',
    ],
    specs: {
      'Total Land Area': '200+ Acres',
      'Project Components': 'Theme Park, Hotel Tower, Retail Mall, F&B Street',
      'Phase 1 Status': 'Approved & Shovel-Ready',
      'Investment Scale': '₹4,500 Crore (USD ~540 Mn)',
      'Mandate Type': 'Exclusive Transaction Advisory',
      'Target Investor': 'PE Fund / Co-Developer / Strategic',
      'Return Profile': 'Mixed-use blended yield',
      'Development Horizon': '5–7 Years (Phase 1: 3 Years)',
    },
    highlights: [
      { icon: 'landmark', value: '200+ Acres', label: 'Total Land' },
      { icon: 'hotel', value: '₹4,500 Cr', label: 'Investment Scale' },
      { icon: 'check-circle', value: 'Phase 1', label: 'Approved' },
      { icon: 'users', value: 'Excl. Mandate', label: 'India Gully Advisory' },
    ],
    tags: ['Theme Park', 'Hotel Tower', 'Retail Mall', 'F&B', 'Maharashtra'],
    highlight: true,
    contact: 'akm@indiagully.com',
    contactName: 'Arun Manikonda',
    contactPhone: '+91 98108 89134',
    nda: true,
  },
  {
    id: 'retail-hub-mumbai',
    title: 'Entertainment & Retail Hub',
    subtitle: '800,000 sq ft · 85% Pre-Leased · Mumbai MMR',
    location: 'Mumbai Metropolitan Region',
    locationShort: 'Mumbai MMR',
    sector: 'Real Estate',
    sectorColor: '#1A3A6B',
    value: '₹2,100 Cr',
    valueUSD: 'USD ~252 Mn',
    status: 'Active Mandate · Exclusive',
    statusType: 'active',
    mandateType: 'Exclusive Transaction Advisory',
    desc: 'Premium entertainment and retail hub in Mumbai MMR. 800,000 sq ft GLA, 85% pre-leased with marquee anchor tenants. Cap rate 8.5%+ with strong institutional yield profile.',
    longDesc: `An institutional-grade entertainment and retail hub in Mumbai's Metropolitan Region — 800,000 sq ft of gross leasable area with 85% pre-leasing already secured with marquee anchors across entertainment, fashion and F&B.\n\nThe asset delivers a cap rate of 8.5%+ at current rental levels with significant upside on mark-to-market lease renewals. The retail mix is carefully curated — entertainment anchors drive footfall, inline fashion and F&B convert to spend.\n\nThis is a fully de-risked, income-producing asset opportunity for a core-plus real estate fund, REIT or institutional buyer. India Gully holds the exclusive transaction advisory mandate.`,
    images: [
      'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1200&q=80',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80',
    ],
    specs: {
      'Gross Leasable Area': '800,000 sq ft',
      'Pre-Leased': '85% (as of mandate date)',
      'Cap Rate': '8.5%+ (on committed rentals)',
      'Investment Scale': '₹2,100 Crore (USD ~252 Mn)',
      'Tenant Mix': 'Entertainment + Fashion + F&B',
      'Location': 'Mumbai Metropolitan Region',
      'Asset Type': 'Core-Plus Income Asset',
      'Transaction Structure': 'Outright / JV / Preferred Equity',
    },
    highlights: [
      { icon: 'building', value: '800,000', label: 'Sq Ft GLA' },
      { icon: 'percentage', value: '85%', label: 'Pre-Leased' },
      { icon: 'chart-line', value: '8.5%+', label: 'Cap Rate' },
      { icon: 'map-marker-alt', value: 'Mumbai MMR', label: 'Location' },
    ],
    tags: ['Retail', 'Entertainment', 'Income Asset', 'Mumbai', 'REIT-Grade'],
    highlight: true,
    contact: 'amit.jhingan@indiagully.com',
    contactName: 'Amit Jhingan',
    contactPhone: '+91 98999 93543',
    nda: true,
  },
  {
    id: 'heritage-rajasthan',
    title: '6-Property Heritage Hotel Portfolio',
    subtitle: 'Palaces, Havelis & Colonial Estates · Rajasthan',
    location: 'Rajasthan, India',
    locationShort: 'Rajasthan',
    sector: 'Heritage Hospitality',
    sectorColor: '#92400E',
    value: '₹620 Cr',
    valueUSD: 'USD ~74 Mn',
    status: 'Under Negotiation',
    statusType: 'negotiation',
    mandateType: 'Transaction Advisory',
    desc: 'Six heritage hotel properties across Rajasthan — palaces, havelis and colonial estates. 480 keys, 72% TTM occupancy. Rare portfolio acquisition for hospitality-focused investors and HNI family offices.',
    longDesc: `A rare, once-in-a-generation opportunity to acquire a portfolio of six operating heritage hotels across Rajasthan's most coveted leisure destinations — covering heritage palaces, century-old havelis and colonial-era estates.\n\nThe portfolio operates with 480 keys and a trailing twelve-month (TTM) occupancy of 72%, driven by the sustained surge in inbound and domestic heritage tourism. The properties are positioned in the luxury-heritage segment with premium ADR profiles.\n\nThe acquisition can be structured as a full portfolio buyout or asset-by-asset. A marquee international operator flag is available for the right buyer. Suitable for hospitality-focused PE funds, sovereign wealth vehicles or high-conviction family offices.`,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
      'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
    ],
    specs: {
      'Number of Properties': '6 Hotels',
      'Total Keys / Rooms': '480 Rooms',
      'TTM Occupancy': '72%',
      'Property Types': 'Palace, Haveli, Colonial Estate',
      'Location Coverage': 'Jaipur, Jodhpur, Udaipur, Jaisalmer',
      'Investment Scale': '₹620 Crore (USD ~74 Mn)',
      'Transaction Type': 'Portfolio / Asset-by-Asset',
      'Operator Flag': 'Available for luxury brand flag',
    },
    highlights: [
      { icon: 'hotel', value: '6 Props', label: 'Heritage Properties' },
      { icon: 'key', value: '480', label: 'Keys / Rooms' },
      { icon: 'chart-bar', value: '72%', label: 'TTM Occupancy' },
      { icon: 'map-marker-alt', value: 'Rajasthan', label: 'Location' },
    ],
    tags: ['Heritage Hotels', 'Palaces', 'Havelis', 'Rajasthan', 'Portfolio Acquisition'],
    highlight: false,
    contact: 'akm@indiagully.com',
    contactName: 'Arun Manikonda',
    contactPhone: '+91 98108 89134',
    nda: true,
  },
  {
    id: 'luxury-resorts-pan-india',
    title: '5-Property Luxury Resort Rollout',
    subtitle: 'Rajasthan · Goa · Kerala · Marriott Flag',
    location: 'Rajasthan, Goa & Kerala',
    locationShort: 'Pan-India Leisure',
    sector: 'Hospitality',
    sectorColor: '#065F46',
    value: '₹350 Cr',
    valueUSD: 'USD ~42 Mn',
    status: 'Feasibility Stage',
    statusType: 'feasibility',
    mandateType: 'Development Advisory',
    desc: '5 luxury resort properties across Rajasthan, Goa and Kerala. 320 keys. Projected IRR 22–26% with Marriott flag under active negotiation. Two sites shovel-ready.',
    longDesc: `A five-property luxury resort rollout targeting India's three premier leisure destinations — Rajasthan (heritage + desert), Goa (beach) and Kerala (backwaters + wellness).\n\n320 total keys across the five sites. Two sites are shovel-ready with approvals in hand. Marriott International flag is under active negotiation for three properties — the remaining two will carry independent boutique positioning.\n\nProjected IRR of 22–26% based on current market rental data and construction cost assumptions. The opportunity is structured for a development-focused investor to co-promote with the existing landowner, with India Gully providing the full hospitality advisory and brand management layer.`,
    images: [
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
      'https://images.unsplash.com/photo-1506059612708-99d6c258160e?w=1200&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80',
      'https://images.unsplash.com/photo-1609766418204-94aae0ecfdfc?w=1200&q=80',
    ],
    specs: {
      'Number of Properties': '5 Luxury Resorts',
      'Total Keys': '320 Keys',
      'Locations': 'Rajasthan, Goa, Kerala',
      'Shovel-Ready Sites': '2 of 5',
      'Brand Flag': 'Marriott (under negotiation) + Boutique',
      'Projected IRR': '22–26%',
      'Investment Scale': '₹350 Crore (USD ~42 Mn)',
      'Structure': 'Co-Promoter / JV with Landowner',
    },
    highlights: [
      { icon: 'hotel', value: '5 Resorts', label: 'Properties' },
      { icon: 'key', value: '320', label: 'Keys' },
      { icon: 'chart-line', value: '22–26%', label: 'Projected IRR' },
      { icon: 'star', value: 'Marriott', label: 'Flag (Negotiating)' },
    ],
    tags: ['Luxury Resort', 'Marriott', 'Goa', 'Kerala', 'Rajasthan', 'Greenfield'],
    highlight: false,
    contact: 'akm@indiagully.com',
    contactName: 'Arun Manikonda',
    contactPhone: '+91 98108 89134',
    nda: true,
  },
  {
    id: 'entertainment-ncr-bhutani',
    title: 'Entertainment City — Delhi NCR',
    subtitle: '1.5 Mn sq ft GLA · Entertainment City Limited · Noida',
    location: 'Noida, Delhi NCR',
    locationShort: 'Noida, NCR',
    sector: 'Entertainment',
    sectorColor: '#7C3AED',
    value: '₹1,200 Cr+',
    valueUSD: 'USD ~144 Mn+',
    status: 'Co-Advisory · Exclusive',
    statusType: 'active',
    mandateType: 'Co-Advisory (Exclusive)',
    desc: '1.5 Mn sq ft entertainment city in Noida NCR co-advised with Entertainment City Limited. High-footfall location adjacent to upcoming metro corridor. Largest entertainment-led mixed-use in NCR.',
    longDesc: `India Gully co-advises with Entertainment City Limited on this landmark 1.5 million square foot entertainment city in Noida, Delhi NCR, positioned as the region's largest entertainment-led mixed-use development.\n\nThe site sits adjacent to an upcoming metro corridor, giving it exceptional connectivity to Delhi NCR's 22 million+ population catchment. The development integrates indoor and outdoor entertainment, a multiplex, F&B destination, branded hotels and a curated retail component.\n\nInvestment is sought from entertainment-sector operators, international attraction brands, hospitality companies and co-development PE capital. Entertainment City Limited brings a strong developer pedigree and balance sheet to the partnership.`,
    images: [
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1200&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80',
      'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1200&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
    ],
    specs: {
      'GLA': '1.5 Million sq ft',
      'Location': 'Noida, Delhi NCR',
      'Project Partner': 'Entertainment City Limited',
      'Investment Scale': '₹1,200 Crore+ (USD ~144 Mn+)',
      'Components': 'Entertainment + Multiplex + Hotel + Retail',
      'Connectivity': 'Adjacent to Upcoming Metro Corridor',
      'Mandate': 'Co-Advisory (Exclusive)',
      'Population Catchment': 'Delhi NCR — 22 Mn+',
    },
    highlights: [
      { icon: 'building', value: '1.5 Mn', label: 'Sq Ft GLA' },
      { icon: 'handshake', value: 'ECL', label: 'Project Partner' },
      { icon: 'subway', value: 'Metro', label: 'Adjacent Corridor' },
      { icon: 'users', value: '22 Mn+', label: 'NCR Catchment' },
    ],
    tags: ['Entertainment City', 'Delhi NCR', 'Entertainment City Limited', 'Mixed-Use', 'Metro Connectivity'],
    highlight: true,
    contact: 'amit.jhingan@indiagully.com',
    contactName: 'Amit Jhingan',
    contactPhone: '+91 98999 93543',
    nda: true,
  },
  {
    id: 'desi-brand-retail',
    title: 'Desi Brand — 15-City Retail Expansion',
    subtitle: 'Pan-India Franchise Roll-Out · Tier 1 & 2 Cities',
    location: 'Pan-India (Tier 1 & 2 Cities)',
    locationShort: 'Pan-India',
    sector: 'Retail',
    sectorColor: '#B8960C',
    value: '₹45 Cr',
    valueUSD: 'USD ~5.4 Mn',
    status: 'Active Mandate',
    statusType: 'active',
    mandateType: 'Retail Expansion Advisory',
    desc: 'Pan-India retail franchise expansion for Desi Brand across 15 Tier-1 and Tier-2 cities. Store size 1,200–2,500 sq ft. Proven 36-month payback. Strong unit economics.',
    longDesc: `India Gully is the exclusive retail expansion advisor for this Desi Brand — a differentiated, India-centric consumer retail concept targeting both Tier-1 metros and fast-growing Tier-2 cities.\n\nThe mandate covers 15 cities with a store size format of 1,200–2,500 sq ft. Unit economics are well-validated: the brand has a proven 36-month payback period at existing stores, strong same-store sales growth and a franchise model that is fully documented and replicable.\n\nIndia Gully is actively working to identify and execute the right retail leasing locations, negotiate favourable lease structures, manage fit-out coordination and support franchisee onboarding. Suitable for mall developers with space to offer, franchisee investors and retail-focused family offices looking for a high-conviction consumer brand exposure.`,
    images: [
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80',
      'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1200&q=80',
      'https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=1200&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
    ],
    specs: {
      'Target Cities': '15 Tier-1 & Tier-2 Cities',
      'Store Size': '1,200 – 2,500 sq ft per store',
      'Investment Per Store': '₹2.5 – 4 Cr (capex)',
      'Total Mandate Size': '₹45 Crore capex deployment',
      'Payback Period': '36 Months (proven)',
      'Franchise Model': 'Fully Documented & Ready',
      'Advisory Scope': 'Site Selection, Leasing, Fit-Out, Onboarding',
      'Target Investor': 'Franchisee / Mall Developer / Family Office',
    },
    highlights: [
      { icon: 'map-marked-alt', value: '15 Cities', label: 'Target Markets' },
      { icon: 'store', value: '1,200–2,500', label: 'Sq Ft Per Store' },
      { icon: 'clock', value: '36 Months', label: 'Proven Payback' },
      { icon: 'rupee-sign', value: '₹45 Cr', label: 'Total Capex' },
    ],
    tags: ['Retail Franchise', 'Desi Brand', 'Pan-India', 'Tier-1 & 2', 'Consumer Retail'],
    highlight: false,
    contact: 'amit.jhingan@indiagully.com',
    contactName: 'Amit Jhingan',
    contactPhone: '+91 98999 93543',
    nda: false,
  },
]
