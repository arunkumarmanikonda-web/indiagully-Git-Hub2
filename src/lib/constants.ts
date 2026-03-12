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
    photo: '/static/team/arun-manikonda.jpg',
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
    photo: '/static/team/pavan-manikonda.jpg',
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
    photo: '/static/team/amit-jhingan.png',
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
  { name: 'Ernst & Young',   abbr: 'EY',        logo: '/static/partners/ey.jpg',              color: '#FFE600', textColor: '#2E2E2E', sub: 'Transaction Advisory & Assurance',  logoBg: '#fff' },
  { name: 'CBRE',            abbr: 'CBRE',       logo: '/static/partners/cbre.png',            color: '#006A4D', textColor: '#fff',    sub: 'Real Estate & Capital Markets',     logoBg: '#fff' },
  { name: 'ANAROCK',         abbr: 'ANAROCK',    logo: '/static/partners/anarock.jpg',         color: '#E4003A', textColor: '#fff',    sub: 'Property Consultants',              logoBg: '#fff' },
  { name: 'Pipara & Co LLP', abbr: 'PIPARA',     logo: '/static/partners/pipara-co.png',       color: '#1A5276', textColor: '#fff',    sub: 'Chartered Accountants',             logoBg: '#fff' },
  { name: 'Resurgent India', abbr: 'RESURGENT',  logo: '/static/partners/resurgent-india.png', color: '#F4A900', textColor: '#1e3a5f', sub: 'Investment Banking',                logoBg: '#fff' },
]

// ── LISTINGS ────────────────────────────────────────────────────────────────
// Updated 10 March 2026 — sourced from Hospitality Mandates Portfolio Excel
// IMAGES: Only original project images from source URLs. NO generic stock photos.
export const LISTINGS = [
  // ── 1. Prism Tower, Gurgaon (JLL Listed) ─────────────────────────────────
  {
    id: 'prism-tower-gurgaon',
    title: 'Prism Tower — Mixed-Use Hospitality & Commercial',
    subtitle: 'Grade-A Mixed-Use · Part of 4-Star Hotel Property · Gurugram',
    location: 'Gurgaon-Faridabad Road, Gwalpahari, Gurugram',
    locationShort: 'Gwalpahari, Gurugram',
    sector: 'Real Estate',
    sectorColor: '#1A3A6B',
    value: '₹400 Cr',
    valueUSD: 'USD ~48 Mn',
    status: 'Reference Transaction – Due Diligence Stage',
    statusType: 'negotiation',
    mandateType: 'Asset Acquisition Advisory',
    entity: 'Confidential (JLL Listed)',
    source: 'https://property.jll.co.in/listings/prism-tower-gurgaon-faridabad-road-baliawas-bandhwari',
    desc: 'Institutional-grade mixed-use commercial building on Gurgaon-Faridabad Road, part of a 4-star hotel property. 312 keys. Located within 10 km of Sikanderpur Metro with excellent road connectivity. REIT-listing potential.',
    longDesc: `100% Asset Acquisition Opportunity — Institutional-grade mixed-use commercial building on Gurgaon-Faridabad Road, forming part of a 4-star hotel property complex in Gwalpahari, Gurugram.\n\nThe asset is located within 10 km of Sikanderpur Metro Station with excellent road connectivity to all major Gurugram micro-markets. 5-star hotels, hospitals, and malls are within a 2 km radius. The property offers multiple exit strategies including REIT listing potential or a strata sale model.\n\nIdeal for institutional investors seeking core+ returns. India Gully is advising on the acquisition process and due diligence. Currently at the reference transaction – due diligence stage.`,
    images: [
      // Source: JLL Listing — property.jll.co.in (Prism Tower, Gurgaon-Faridabad Road)
      // Images served via Akamai-protected JLL CDN — available only after NDA execution
      // No images shown publicly; full gallery accessible post-NDA
    ],
    coverImage: null,
    specs: {
      'Entity': 'Confidential (JLL Listed)',
      'Location': 'Gurgaon-Faridabad Road, Gwalpahari, Gurugram',
      'Asset Classification': 'Mixed-Use Hospitality & Commercial',
      'Room Inventory': '312 Keys',
      'Metro Connectivity': '10 km from Sikanderpur Metro Station',
      'Investment Scale': '₹400 Crore',
      'Transaction Type': '100% Asset Acquisition',
      'Exit Strategies': 'REIT Listing / Strata Sale',
      'Deal Status': 'Reference Transaction – Due Diligence Stage',
      'IG Contact': 'Arun Manikonda',
    },
    highlights: [
      { icon: 'hotel', value: '312 Keys', label: 'Room Inventory' },
      { icon: 'rupee-sign', value: '₹400 Cr', label: 'Asset Value' },
      { icon: 'subway', value: '10 km', label: 'Metro Connectivity' },
      { icon: 'chart-line', value: 'REIT Grade', label: 'Exit Potential' },
    ],
    tags: ['Mixed-Use', 'Hospitality', 'Gurugram', 'REIT-Grade', 'Due Diligence'],
    highlight: true,
    contact: 'akm@indiagully.com',
    contactName: 'Arun Manikonda',
    contactPhone: '+91 98108 89134',
    nda: true,
  },

  // ── 2. Belcibo Hospitality Platform, Delhi NCR & Goa ────────────────────
  {
    id: 'belcibo-hospitality-platform',
    title: 'Belcibo Hospitality Platform',
    subtitle: 'Multi-Brand F&B Platform · Delhi NCR & Goa · Active Fundraise',
    location: 'Delhi NCR & Goa',
    locationShort: 'Delhi NCR & Goa',
    sector: 'Hospitality',
    sectorColor: '#B8960C',
    value: '₹100 Cr',
    valueUSD: 'USD ~12 Mn',
    status: 'Open for Investment – Active Fundraise',
    statusType: 'active',
    mandateType: 'Growth Equity Advisory',
    entity: 'Belcibo Hospitality',
    source: 'Proprietary Sourcing — India Gully',
    desc: 'Scalable multi-brand F&B platform operating across Delhi NCR and Goa. Growth equity mandate seeking strategic capital partner for pan-India rollout. Brands include Informal, Imperfecto, Khubani, Habibi, Begum, Noor, Imperfecto Boutique.',
    longDesc: `Growth Equity Investment Opportunity — Belcibo Hospitality is a scalable multi-brand F&B platform operating across Delhi NCR and Goa markets. The group operates 15+ outlets across its branded portfolio.\n\nBrands include: Informal, Imperfecto, Imperfecto Boutique, Khubani, Habibi, Begum, and Noor — covering the full spectrum from casual dining to premium experiential F&B.\n\nThe platform is seeking a strategic capital partner to accelerate brand portfolio expansion. Strong unit economics with a proven operational playbook ready for pan-India rollout. India Gully is the exclusive growth equity advisor.`,
    images: [
      // Source: Belcibo brand portfolio — Imperfecto, Informal, Khubani, Habibi, Begum, Noor
      // Proprietary brand imagery — shared exclusively under NDA
      // Full brand gallery and portfolio deck provided post-NDA execution
    ],
    specs: {
      'Platform': 'Belcibo Hospitality',
      'Markets': 'Delhi NCR & Goa',
      'Brands': 'Informal, Imperfecto, Khubani, Habibi, Begum, Noor, Imperfecto Boutique',
      'Outlets': '15+ Operating Outlets',
      'Asset Classification': 'Multi-Brand F&B Platform',
      'Transaction Type': 'Growth Equity Investment',
      'Investment Scale': '₹100 Crore',
      'Deal Status': 'Open for Investment – Active Fundraise',
      'IG Contact': 'Arun Manikonda',
    },
    highlights: [
      { icon: 'utensils', value: '15+ Outlets', label: 'Operating Brands' },
      { icon: 'rupee-sign', value: '₹100 Cr', label: 'Growth Capital' },
      { icon: 'map-marked-alt', value: 'NCR & Goa', label: 'Markets' },
      { icon: 'chart-line', value: 'Pan-India', label: 'Rollout Potential' },
    ],
    tags: ['F&B', 'Multi-Brand', 'Growth Equity', 'Delhi NCR', 'Goa', 'Hospitality'],
    highlight: true,
    contact: 'akm@indiagully.com',
    contactName: 'Arun Manikonda',
    contactPhone: '+91 98108 89134',
    nda: true,
  },

  // ── 3. Hotel Rajshree & Spa, Chandigarh ──────────────────────────────────
  {
    id: 'hotel-rajshree-chandigarh',
    title: 'Hotel Rajshree & Spa',
    subtitle: 'Boutique Hotel with Spa & Wellness · 41 Keys · Chandigarh',
    location: 'Industrial Area Phase I, Chandigarh',
    locationShort: 'Chandigarh',
    sector: 'Hospitality',
    sectorColor: '#065F46',
    value: '₹70 Cr',
    valueUSD: 'USD ~8.4 Mn',
    status: 'Asset Sale – Actively Marketing',
    statusType: 'active',
    mandateType: 'Asset Sale Advisory',
    entity: 'Rajshree Hotels Pvt. Ltd.',
    source: 'https://hotelrajshreechandigarh.com/',
    desc: "Fully operational boutique hotel & spa in Chandigarh's prime Industrial Area Phase I, near Tribune Chowk. 41 keys. Full amenities including premium spa, restaurant, bar & conference. Strong RevPAR with brand affiliation upside.",
    longDesc: `Stabilised Asset Sale — Rajshree Hotels Pvt. Ltd. is offering this fully operational boutique hotel and spa in Chandigarh's prime Industrial Area Phase I, conveniently located near Tribune Chowk.\n\nThe property features 41 well-appointed rooms including Super Deluxe, Family Suites, and Honeymoon Suites. Full amenities include a premium spa, in-house restaurant, bar, conference facilities, free WiFi, and complimentary parking.\n\nThe hotel demonstrates strong RevPAR performance with significant potential for brand affiliation upgrade. Attractive entry point for investors seeking cash-yielding hospitality assets with wellness positioning. India Gully holds the seller mandate and is actively marketing to qualified buyers.`,
    images: [
      // Source: hotelrajshreechandigarh.com — official hotel website images
      'https://hotelrajshreechandigarh.com/wp-content/uploads/2025/12/IMG_1157-1-scaled-1.webp',
      'https://hotelrajshreechandigarh.com/wp-content/uploads/2025/12/Hotel-Rajshree-5-scaled-e1765525431558.webp',
      'https://hotelrajshreechandigarh.com/wp-content/uploads/2025/12/facade-1024x585.webp',
      'https://hotelrajshreechandigarh.com/wp-content/uploads/2026/01/IMG_6649-Copy-1024x768.webp',
      'https://hotelrajshreechandigarh.com/wp-content/uploads/2025/12/super-deluxe-room-768x1024.webp',
      'https://hotelrajshreechandigarh.com/wp-content/uploads/2025/12/Family-Suite-768x1024.webp',
      'https://hotelrajshreechandigarh.com/wp-content/uploads/2025/12/IMG_6565-1-1024x768.webp',
    ],
    specs: {
      'Entity': 'Rajshree Hotels Pvt. Ltd.',
      'Location': 'Industrial Area Phase I, Chandigarh',
      'Asset Classification': 'Boutique Hotel with Spa & Wellness',
      'Room Inventory': '41 Keys',
      'Room Types': 'Super Deluxe, Family Suites, Honeymoon Suites',
      'Amenities': 'Spa, Restaurant, Bar, Conference, WiFi, Parking',
      'Investment Scale': '₹70 Crore',
      'Deal Status': 'Asset Sale – Actively Marketing',
      'IG Contact': 'Amit Jhingan',
    },
    highlights: [
      { icon: 'hotel', value: '41 Keys', label: 'Room Inventory' },
      { icon: 'rupee-sign', value: '₹70 Cr', label: 'Asset Value' },
      { icon: 'spa', value: 'Premium Spa', label: 'Wellness Amenity' },
      { icon: 'map-marker-alt', value: 'Chandigarh', label: 'Location' },
    ],
    tags: ['Boutique Hotel', 'Spa & Wellness', 'Chandigarh', 'Asset Sale', 'Operational'],
    highlight: false,
    contact: 'amit.jhingan@indiagully.com',
    contactName: 'Amit Jhingan',
    contactPhone: '+91 98999 93543',
    nda: true,
  },

  // ── 4. WelcomHeritage Santa Roza, Kasauli ────────────────────────────────
  {
    id: 'welcomheritage-santa-roza-kasauli',
    title: 'WelcomHeritage Santa Roza, Kasauli',
    subtitle: 'Luxury Heritage Resort · 44 Keys · ITC WelcomHeritage · Kasauli',
    location: 'Mauza Kot, Kasauli, Himachal Pradesh',
    locationShort: 'Kasauli, Himachal Pradesh',
    sector: 'Heritage Hospitality',
    sectorColor: '#92400E',
    value: '₹45 Cr',
    valueUSD: 'USD ~5.4 Mn',
    status: 'Asset Sale – Seller Mandated',
    statusType: 'active',
    mandateType: 'Asset Sale Advisory',
    entity: 'ITC WelcomHeritage – Santa Roza',
    source: 'https://www.welcomheritagehotels.in/hotel-details/santa-roza-kasauli/',
    desc: "Established luxury heritage resort under ITC WelcomHeritage brand across 2 acres in scenic Kasauli at pine forest elevation. Victorian-themed architecture. 44 keys. Nirvana restaurant, Aviary bar, spa & plunge pool.",
    longDesc: `Heritage Asset Divestiture — WelcomHeritage Santa Roza is an established luxury heritage resort under the ITC WelcomHeritage brand, sprawled across 2 acres in scenic Kasauli at pine forest elevation with Victorian-themed architecture and British-era charm.\n\nRoom categories include Deluxe (280 sq.ft.), Suites (340 sq.ft.), Cottages (420 sq.ft.), and Family Suites (1,180 sq.ft.). Premium amenities include Nirvana multi-cuisine restaurant, Aviary bar with woodland views, Milo's garden café, state-of-the-art fitness centre, spa, and plunge pool.\n\nBenefits from Himachal Pradesh tourism incentives and tax subsidies. Located 15–16 km from Mall Road and local attractions. India Gully holds the seller mandate on behalf of ITC WelcomHeritage.`,
    images: [
      // Source: welcomheritagehotels.in — official ITC WelcomHeritage hotel website images
      'https://www.welcomheritagehotels.in/app/uploaded_files/hotel_gallery/-web%20Banner%20245527.jpg',
      'https://www.welcomheritagehotels.in/app/uploaded_files/hotel_gallery/-Internal%20banner86510.jpg',
      'https://www.welcomheritagehotels.in/app/uploaded_files/hotel_room/-Deluxe%20Room30613.jpg',
      'https://www.welcomheritagehotels.in/app/uploaded_files/hotel_room/-Suite%20Bedroom21608.jpg',
      'https://www.welcomheritagehotels.in/app/uploaded_files/hotel_room/-Suite%20Living%20Room34714.jpg',
    ],
    specs: {
      'Entity': 'ITC WelcomHeritage – Santa Roza',
      'Location': 'Mauza Kot, Kasauli, Himachal Pradesh',
      'Asset Classification': 'Luxury Heritage Resort',
      'Land Area': '2 Acres',
      'Room Inventory': '44 Keys',
      'Room Types': 'Deluxe (280 sqft), Suites (340 sqft), Cottages (420 sqft), Family Suites (1,180 sqft)',
      'Amenities': 'Nirvana Restaurant, Aviary Bar, Milo\'s Café, Spa, Plunge Pool, Fitness Centre',
      'Investment Scale': '₹45 Crore',
      'HP Tourism Benefits': 'Tax Incentives & Subsidies Applicable',
      'Distance': '15–16 km from Mall Road, Kasauli',
      'Deal Status': 'Asset Sale – Seller Mandated',
      'IG Contact': 'Amit Jhingan',
    },
    highlights: [
      { icon: 'hotel', value: '44 Keys', label: 'Room Inventory' },
      { icon: 'rupee-sign', value: '₹45 Cr', label: 'Asset Value' },
      { icon: 'leaf', value: '2 Acres', label: 'Estate Area' },
      { icon: 'crown', value: 'ITC Brand', label: 'WelcomHeritage' },
    ],
    tags: ['Heritage Resort', 'ITC WelcomHeritage', 'Kasauli', 'Himachal Pradesh', 'Asset Sale'],
    highlight: true,
    contact: 'amit.jhingan@indiagully.com',
    contactName: 'Amit Jhingan',
    contactPhone: '+91 98999 93543',
    nda: true,
  },

  // ── 5. Heritage Hotel Structure, Jaipur ──────────────────────────────────
  {
    id: 'heritage-hotel-jaipur',
    title: 'Heritage Hotel Structure — Jaipur',
    subtitle: 'Construction-Complete Structure · 43 Keys · Rajasthan Tourism Corridor',
    location: 'Jaipur, Rajasthan',
    locationShort: 'Jaipur, Rajasthan',
    sector: 'Hospitality',
    sectorColor: '#7C3AED',
    value: '₹20 Cr',
    valueUSD: 'USD ~2.4 Mn',
    status: 'Structure Sale – Ready for Fit-Out',
    statusType: 'feasibility',
    mandateType: 'Structure Sale Advisory',
    entity: 'Belcibo (Proprietary Sourcing)',
    source: 'Proprietary Sourcing — India Gully / Belcibo',
    desc: "43-key hospitality structure in Jaipur's tourism corridor. Construction-complete and ready for interior fit-out. Significant cost savings versus greenfield development. Quick market entry in Rajasthan's heritage tourism sector.",
    longDesc: `Structure Sale Opportunity — A 43-key hospitality structure in Jaipur's tourism corridor that is construction-complete and ready for interior fit-out. This represents a significant cost-saving entry point versus ground-up development.\n\nThe structure is suitable for operators or investors seeking quick market entry in Rajasthan's heritage tourism market — one of India's most resilient and high-ADR leisure segments.\n\nIndia Gully (represented by Belcibo) holds the sale mandate. Suitable for hospitality operators, boutique hotel brands, or asset-light operators seeking swift fit-out and operations commencement.`,
    images: [
      // Source: Proprietary — Jaipur hospitality structure (Belcibo portfolio)
      // Structure images are shared under NDA only — available post-NDA execution
    ],
    specs: {
      'Entity': 'Belcibo (Proprietary Sourcing)',
      'Location': 'Jaipur, Rajasthan',
      'Asset Classification': 'Hospitality Structure',
      'Room Inventory': '43 Keys',
      'Construction Status': 'Complete – Ready for Interior Fit-Out',
      'Investment Scale': '₹20 Crore',
      'Opportunity Type': 'Significant Cost Saving vs Greenfield',
      'Tourism Market': 'Rajasthan Heritage Tourism Corridor',
      'Deal Status': 'Structure Sale – Ready for Fit-Out',
      'IG Contact': 'Amit Jhingan',
    },
    highlights: [
      { icon: 'building', value: '43 Keys', label: 'Room Inventory' },
      { icon: 'rupee-sign', value: '₹20 Cr', label: 'Asset Value' },
      { icon: 'tools', value: 'Fit-Out Ready', label: 'Construction Complete' },
      { icon: 'map-marker-alt', value: 'Jaipur', label: 'Location' },
    ],
    tags: ['Hospitality Structure', 'Jaipur', 'Heritage Tourism', 'Rajasthan', 'Structure Sale'],
    highlight: false,
    contact: 'amit.jhingan@indiagully.com',
    contactName: 'Amit Jhingan',
    contactPhone: '+91 98999 93543',
    nda: true,
  },

  // ── 6. Maple Resort Chail, Himachal Pradesh ───────────────────────────────
  {
    id: 'maple-resort-chail',
    title: 'Maple Resort Chail',
    subtitle: 'Boutique Mountain Resort · 30 Keys · 2,515m Elevation · Himachal Pradesh',
    location: 'Chail, Himachal Pradesh (2,515m elevation)',
    locationShort: 'Chail, Himachal Pradesh',
    sector: 'Hospitality',
    sectorColor: '#065F46',
    value: '₹30 Cr',
    valueUSD: 'USD ~3.6 Mn',
    status: 'Asset Sale – Owner Direct',
    statusType: 'active',
    mandateType: 'Asset Sale Advisory',
    entity: 'Mapple Resorts Pvt. Ltd.',
    source: 'https://www.mapleresorts.in/',
    desc: 'Premium boutique mountain resort with 30 keys perched at 2,515 metres. Pine and maple forests with panoramic mountain views. Near Chail Palace, historic cricket ground & Kali Ka Tibba. Immediate cash flows.',
    longDesc: `Operational Leisure Asset — Maple Resort Chail is a premium boutique mountain resort with 30 keys (Suites, Executive, and Super Deluxe rooms) perched at 2,515 metres in the Himalayas. Surrounded by pine and maple forests with panoramic mountain views.\n\nFull amenities include a multi-cuisine restaurant, private balconies, free WiFi, parking, elevator, mini bar, AC/heating, and a pet-friendly policy. Strategically located near Chail Palace (4 km), the historic Chail Cricket Ground (highest in the world), and Kali Ka Tibba temple.\n\nThe property has an established guest base with strong leisure and wellness tourism demand. Offers immediate cash flows with upside potential from brand affiliation or digital OTA growth. India Gully advises on behalf of the owner.`,
    images: [
      // Source: mapleresorts.in — official Maple Resort Chail website images
      'https://www.mapleresorts.in/img/about/new-left1.jpg',
      'https://www.mapleresorts.in/img/about/new-right1.jpg',
      'https://www.mapleresorts.in/img/about/Refined-left1.jpg',
      'https://www.mapleresorts.in/img/about/Refined-left2.jpg',
      'https://www.mapleresorts.in/img/family-1-new.jpg',
      'https://www.mapleresorts.in/img/executive-new.jpg',
      'https://www.mapleresorts.in/img/deluxe-1-new.jpg',
    ],
    specs: {
      'Entity': 'Mapple Resorts Pvt. Ltd.',
      'Location': 'Chail, Himachal Pradesh',
      'Altitude': '2,515 metres above sea level',
      'Asset Classification': 'Boutique Mountain Resort',
      'Room Inventory': '30 Keys',
      'Room Types': 'Suites, Executive Rooms, Super Deluxe Rooms',
      'Amenities': 'Multi-Cuisine Restaurant, Private Balconies, WiFi, Elevator, Mini Bar, Pet-Friendly',
      'Nearby Attractions': 'Chail Palace (4km), Historic Cricket Ground, Kali Ka Tibba Temple',
      'Investment Scale': '₹30 Crore',
      'Deal Status': 'Asset Sale – Owner Direct',
      'IG Contact': 'Amit Jhingan',
    },
    highlights: [
      { icon: 'hotel', value: '30 Keys', label: 'Room Inventory' },
      { icon: 'rupee-sign', value: '₹30 Cr', label: 'Asset Value' },
      { icon: 'mountain', value: '2,515m', label: 'Altitude' },
      { icon: 'leaf', value: 'Pine Forest', label: 'Setting' },
    ],
    tags: ['Boutique Resort', 'Mountain Resort', 'Chail', 'Himachal Pradesh', 'Asset Sale'],
    highlight: false,
    contact: 'amit.jhingan@indiagully.com',
    contactName: 'Amit Jhingan',
    contactPhone: '+91 98999 93543',
    nda: true,
  },

  // ── 7. Ambience Tower, Shalimar Bagh, North Delhi (JLL Listed) ────────────
  {
    id: 'ambience-tower-north-delhi',
    title: 'Ambience Tower — Grade-A Adaptive Reuse',
    subtitle: 'Grade-A Commercial Tower · North Delhi · Conversion-Ready · Rohini',
    location: 'Shalimar Bagh, Rohini, North Delhi',
    locationShort: 'Rohini, North Delhi',
    sector: 'Real Estate',
    sectorColor: '#1A3A6B',
    value: '₹350 Cr',
    valueUSD: 'USD ~42 Mn',
    status: 'Conversion Opportunity – Technical Feasibility Complete',
    statusType: 'feasibility',
    mandateType: 'Adaptive Reuse Advisory',
    entity: 'Ambience Group (JLL Listed)',
    source: 'https://property.jll.co.in/listings/ambience-tower-shalimar-bagh-plot-no-10-b-block-community-centre',
    desc: "Grade-A commercial tower by Ambience Group in Rohini, North Delhi. 0.6 km from Rohini West Metro Station. Conversion-ready for hospitality or hybrid hotel-office use. Technical feasibility complete.",
    longDesc: `Adaptive Reuse Opportunity — Ambience Tower is a Grade-A commercial tower developed by Ambience Pvt Ltd in Rohini, North Delhi. With excellent metro connectivity at just 0.6 km from Rohini West Metro Station, the asset enjoys strong accessibility to all major Delhi NCR micro-markets.\n\n5-star hotels, hospitals, and malls are within a 2–5 km radius. The asset is conversion-ready for hospitality or hybrid hotel-office use, with technical feasibility already completed.\n\nIdeal for developers or hotel operators seeking a value-add repositioning play in an established North Delhi location. India Gully advises on behalf of the vendor (JLL co-listed mandate).`,
    images: [
      // Source: JLL Listed Property — Ambience Tower, Shalimar Bagh, Rohini, North Delhi
      // JLL CDN Akamai-protected — images available post-NDA execution only
    ],
    specs: {
      'Entity': 'Ambience Group (JLL Listed)',
      'Location': 'Shalimar Bagh, Rohini, North Delhi',
      'Asset Classification': 'Grade-A Commercial Tower (Adaptive Reuse)',
      'Metro Connectivity': '0.6 km from Rohini West Metro Station',
      'Nearby Infrastructure': '5-Star Hotels, Hospitals, Malls within 2–5 km',
      'Conversion Use': 'Hospitality / Hybrid Hotel-Office',
      'Technical Feasibility': 'Complete',
      'Investment Scale': '₹350 Crore',
      'Deal Status': 'Conversion Opportunity – Technical Feasibility Complete',
      'IG Contact': 'Arun Manikonda',
    },
    highlights: [
      { icon: 'building', value: 'Grade-A', label: 'Asset Class' },
      { icon: 'rupee-sign', value: '₹350 Cr', label: 'Asset Value' },
      { icon: 'subway', value: '0.6 km', label: 'Metro Distance' },
      { icon: 'tools', value: 'Feasibility Done', label: 'Conversion Ready' },
    ],
    tags: ['Commercial Tower', 'Adaptive Reuse', 'North Delhi', 'Rohini', 'Grade-A', 'Metro'],
    highlight: false,
    contact: 'akm@indiagully.com',
    contactName: 'Arun Manikonda',
    contactPhone: '+91 98108 89134',
    nda: true,
  },

  // ── 8. Sawasdee JLG Galleria — Mixed-Use Hotel & Mall, Noida ──────────────
  {
    id: 'sawasdee-jlg-noida',
    title: 'Sawasdee JLG Galleria — Mixed-Use Hotel & Mall',
    subtitle: 'Structure-Ready · 114 Keys + Retail Mall · Noida · Outright Sale',
    location: 'Noida, Uttar Pradesh',
    locationShort: 'Noida, NCR',
    sector: 'Real Estate',
    sectorColor: '#7C3AED',
    value: '₹150 Cr',
    valueUSD: 'USD ~18 Mn',
    status: 'Outright Sale – Negotiation Ready',
    statusType: 'active',
    mandateType: 'Transaction Advisory',
    entity: 'Sawasdee JLG Galleria',
    source: 'Proprietary Sourcing — India Gully',
    desc: "Structure-ready 114-key hotel integrated with retail mall in Noida's commercial corridor. Independent access and operational flexibility. Multiple revenue streams from hospitality-retail integrated development.",
    longDesc: `Mixed-Use Development Opportunity — Sawasdee JLG Galleria is a structure-ready 114-key hotel integrated with a retail mall in Noida's commercial corridor. The development offers independent access and operational flexibility for the hotel component.\n\nThe asset represents an attractive entry for investors seeking integrated hospitality-retail assets with multiple revenue streams. The hotel and mall components are separately operable, providing flexibility in operation or management of each vertical.\n\nProprietary sourcing by India Gully. The asset is negotiation-ready for qualified buyers. Suitable for hospitality operators, retail developers, or institutional investors seeking mixed-use integrated assets in NCR.`,
    images: [
      // Source: Proprietary — Sawasdee JLG Galleria, Noida (India Gully mandate)
      // Proprietary project images — shared under NDA only
    ],
    specs: {
      'Entity': 'Sawasdee JLG Galleria',
      'Location': 'Noida, Uttar Pradesh',
      'Asset Classification': 'Mall + Hotel (Integrated)',
      'Room Inventory': '114 Keys',
      'Development Status': 'Structure-Ready',
      'Hotel Access': 'Independent Access from Mall Component',
      'Investment Scale': '₹150 Crore',
      'Deal Status': 'Outright Sale – Negotiation Ready',
      'IG Contact': 'Arun Manikonda',
    },
    highlights: [
      { icon: 'hotel', value: '114 Keys', label: 'Room Inventory' },
      { icon: 'rupee-sign', value: '₹150 Cr', label: 'Asset Value' },
      { icon: 'store', value: 'Retail Mall', label: 'Integrated Component' },
      { icon: 'map-marker-alt', value: 'Noida', label: 'Location' },
    ],
    tags: ['Mixed-Use', 'Hotel & Mall', 'Noida', 'NCR', 'Structure-Ready', 'Outright Sale'],
    highlight: false,
    contact: 'akm@indiagully.com',
    contactName: 'Arun Manikonda',
    contactPhone: '+91 98108 89134',
    nda: true,
  },
]

// ── TRACK RECORD ─────────────────────────────────────────────────────────────
// Completed works by vertical — sourced from Vertical Track Record Portfolio (March 2026)
export const TRACK_RECORD = {
  realEstate: [
    {
      title: '800 Sq. Yard Asset Takeover & Strata Sale — Anand Lok, New Delhi',
      value: '₹65 Cr+',
      type: 'Asset Acquisition & Strata Sale',
      desc: 'Executed a strategic acquisition of a prime South Delhi property, successfully managing the complete takeover valued at ₹50+ Crores. Delivered an exceptional ₹65+ Crores exit within a 6-month turnaround, demonstrating superior deal structuring and market timing expertise.',
      location: 'Anand Lok, South Delhi',
      tags: ['Asset Acquisition', 'Strata Sale', 'South Delhi'],
    },
    {
      title: 'Jaipur Resort Mandate — Premium Leisure Asset Sale',
      value: '₹20 Cr+',
      type: 'Transaction Advisory',
      desc: "Advised on the successful divestment of a well-positioned resort property in Jaipur's hospitality corridor. Achieved a transaction value of ₹20+ Crores through targeted investor outreach and comprehensive deal documentation.",
      location: 'Jaipur, Rajasthan',
      tags: ['Resort Sale', 'Jaipur', 'Transaction Advisory'],
    },
    {
      title: 'Entertainment City Limited — Landmark Divestment Transaction',
      value: '₹1,350 Cr+',
      type: 'Joint Transaction Advisory (with EY)',
      desc: 'Served as Joint Transaction Advisors alongside EY for the 100% divestment of Entertainment City Limited. Managed end-to-end transaction advisory, complex stakeholder negotiations, deal documentation and multi-party due diligence for this landmark ₹1,350+ Crore transaction.',
      location: 'Entertainment City, Noida',
      tags: ['Divestment', 'Entertainment', 'EY Partnership', 'Major Transaction'],
    },
    {
      title: "Lutyens' Delhi Prime Property — Ultra-Premium Residential",
      value: '₹100 Cr+',
      type: 'Residential Advisory',
      desc: "Facilitated the acquisition of an exclusive 1,600 Sq. Yard property in Lutyens' Delhi, India's most prestigious residential enclave. A landmark high-net-worth transaction in one of the country's most restricted real estate markets.",
      location: "Lutyens' Delhi, New Delhi",
      tags: ["Lutyens' Delhi", 'Ultra-Premium', 'Residential'],
    },
    {
      title: 'Greater Kailash-1 Premium Asset — High-Value Residential Deal',
      value: '₹60 Cr+',
      type: 'Residential Advisory',
      desc: "Concluded the sale of a 1,000 Sq. Yard premium property in South Delhi's sought-after GK-1 locality. Transaction value exceeded ₹60+ Crores, demonstrating deep market knowledge of South Delhi premium residential.",
      location: 'Greater Kailash-1, South Delhi',
      tags: ['GK-1', 'Residential', 'South Delhi'],
    },
  ],
  retailLeasing: [
    {
      title: 'Imperfecto Shor — Golf Course Road, Gurugram',
      value: 'Premium F&B Space',
      type: 'Retail Leasing',
      desc: "Secured prime F&B retail space for this popular nightlife and dining destination on Gurugram's prestigious Golf Course Road, ensuring optimal visibility and footfall for the brand's flagship outlet.",
      location: 'Golf Course Road, Gurugram',
      tags: ['F&B', 'Gurugram', 'Golf Course Road'],
    },
    {
      title: 'Khubani at Hyatt Andaz Delhi — 42,000 Sq. Ft. Premium Dining',
      value: '42,000 Sq. Ft.',
      type: 'Hospitality Leasing',
      desc: 'Negotiated and executed leasing for a signature 27,000 + 15,000 Sq. Ft. restaurant space within the iconic Hyatt Andaz property, positioning Khubani as a landmark culinary destination in the capital.',
      location: 'Hyatt Andaz, New Delhi',
      tags: ['Premium Dining', 'Hyatt Andaz', 'Fine Dining'],
    },
    {
      title: 'Begum & Noor at Entertainment City — 22,000 Sq. Ft. Lifestyle F&B',
      value: '22,000 Sq. Ft.',
      type: 'Entertainment Leasing',
      desc: 'Facilitated the leasing of a substantial 22,000 Sq. Ft. space for this premium dining and entertainment concept, strategically positioned within Entertainment City, Noida.',
      location: 'Entertainment City, Noida',
      tags: ['F&B', 'Entertainment City', 'Lifestyle Dining'],
    },
    {
      title: 'Sutra at Entertainment City — 15,000 Sq. Ft. Experiential Dining',
      value: '15,000 Sq. Ft.',
      type: 'Entertainment Leasing',
      desc: "Secured a 15,000 Sq. Ft. prime location for Sutra's immersive dining experience, contributing to Entertainment City's vibrant F&B ecosystem.",
      location: 'Entertainment City, Noida',
      tags: ['Experiential Dining', 'Entertainment City'],
    },
    {
      title: 'Impulse at Gardens Galleria — 9,000 Sq. Ft. Contemporary Lounge',
      value: '9,000 Sq. Ft.',
      type: 'Mall Leasing',
      desc: "Executed leasing for a 9,000 Sq. Ft. premium space at Gardens Galleria, establishing Impulse as a key anchor in Noida's premier mall.",
      location: 'Gardens Galleria, Noida',
      tags: ['Lounge', 'Gardens Galleria', 'Noida'],
    },
    {
      title: 'Dearie at Gardens Galleria — 9,000 Sq. Ft. Upscale Café',
      value: '9,000 Sq. Ft.',
      type: 'Mall Leasing',
      desc: 'Negotiated favorable lease terms for a 9,000 Sq. Ft. space, enabling Dearie to establish its refined café concept in a high-footfall mall environment.',
      location: 'Gardens Galleria, Noida',
      tags: ['Café', 'Gardens Galleria', 'Upscale'],
    },
    {
      title: 'Maricham at Gardens Galleria — 7,000 Sq. Ft. Fine Dining',
      value: '7,000 Sq. Ft.',
      type: 'Mall Leasing',
      desc: "Secured strategic positioning for Maricham's 7,000 Sq. Ft. kebab and grill specialty restaurant within the mall's premium dining zone.",
      location: 'Gardens Galleria, Noida',
      tags: ['Fine Dining', 'Gardens Galleria', 'Specialty Restaurant'],
    },
    {
      title: 'Clinique at Gardens Galleria — 6,000 Sq. Ft. Beauty & Wellness',
      value: '6,000 Sq. Ft.',
      type: 'Mall Leasing',
      desc: "Facilitated leasing of 6,000 Sq. Ft. for Clinique's retail presence, enhancing the mall's premium beauty and lifestyle offering.",
      location: 'Gardens Galleria, Noida',
      tags: ['Beauty', 'Wellness', 'Clinique', 'Gardens Galleria'],
    },
    {
      title: 'Big Boys Lounge at Gardens Galleria — 10,000 Sq. Ft. Entertainment',
      value: '10,000 Sq. Ft.',
      type: 'Mall Leasing',
      desc: 'Executed leasing for a spacious 10,000 Sq. Ft. entertainment and gaming lounge, adding a unique experiential dimension to the mall.',
      location: 'Gardens Galleria, Noida',
      tags: ['Entertainment', 'Gaming', 'Gardens Galleria'],
    },
    {
      title: 'Rosia at AIPL Joy Street, Gurugram',
      value: 'Prime Retail Space',
      type: 'Retail Leasing',
      desc: "Secured prime retail frontage for Rosia at AIPL Joy Street, Gurugram's emerging lifestyle and dining destination.",
      location: 'AIPL Joy Street, Gurugram',
      tags: ['Retail', 'Gurugram', 'AIPL Joy Street'],
    },
    {
      title: 'Turnkey Project — Peach Tree, Faridabad',
      value: 'Turnkey Advisory',
      type: 'Turnkey Leasing & Fit-Out',
      desc: "Delivered comprehensive turnkey leasing and fit-out advisory for Peach Tree's Faridabad location, managing the complete retail establishment from lease negotiation through fit-out execution.",
      location: 'Faridabad, Haryana',
      tags: ['Turnkey', 'Faridabad', 'Fit-Out Advisory'],
    },
  ],
  hospitality: [
    {
      title: 'PMC — Turnkey Project: Fern Residency, Noida',
      value: 'Turnkey PMC',
      type: 'Project Management Consultancy',
      desc: 'Delivered end-to-end Project Management Consultancy for the turnkey development of Fern Residency in Noida. Managed complete project lifecycle from design coordination through construction supervision to successful operational handover, ensuring brand compliance and quality standards.',
      location: 'Noida, Delhi NCR',
      tags: ['PMC', 'Fern Residency', 'Turnkey', 'Noida'],
    },
    {
      title: 'PMC — Turnkey Project: Regenta Central, Noida',
      value: 'Turnkey PMC',
      type: 'Project Management Consultancy',
      desc: "Executed comprehensive PMC services for Regenta Central's Noida property, overseeing all aspects of hotel development including interior fit-out, MEP coordination, and pre-opening preparations to deliver a market-ready hospitality asset.",
      location: 'Noida, Delhi NCR',
      tags: ['PMC', 'Regenta Central', 'Noida'],
    },
    {
      title: 'PMC — Cygnett Inn, Jim Corbett National Park',
      value: 'Turnkey PMC',
      type: 'Project Management Consultancy',
      desc: 'Provided full-spectrum project management for this scenic wilderness retreat at Jim Corbett National Park. Coordinated eco-sensitive construction practices, wildlife zone compliance, and resort-grade amenity development.',
      location: 'Jim Corbett National Park, Uttarakhand',
      tags: ['PMC', 'Cygnett Inn', 'Jim Corbett', 'Eco-Tourism'],
    },
    {
      title: 'PMC — Turnkey Project: Maricham Kabab Estate',
      value: 'Turnkey PMC',
      type: 'Project Management Consultancy',
      desc: 'Managed the complete turnkey development of Maricham Kabab Estate, a specialty dining destination. Oversaw concept-to-completion delivery including kitchen design, interiors, MEP and operational set-up.',
      location: 'Delhi NCR',
      tags: ['PMC', 'Maricham', 'F&B', 'Kabab Estate'],
    },
    {
      title: 'Complete Internal Signage Plan & Design — Grand Hyatt, Gurugram',
      value: 'Signage & Design',
      type: 'Brand & Design Advisory',
      desc: 'Conceptualised and executed the comprehensive internal signage and wayfinding system for Grand Hyatt Gurugram. Delivered brand-aligned signage integrating luxury aesthetic with functional guest navigation.',
      location: 'Grand Hyatt, Gurugram',
      tags: ['Signage', 'Grand Hyatt', 'Gurugram', 'Brand Design'],
    },
    {
      title: 'External & Internal Signage — Leisure Hotels, Vrindavan',
      value: 'Signage & Design',
      type: 'Brand & Design Advisory',
      desc: "Designed and implemented a complete signage ecosystem for Leisure Hotels' Vrindavan property. Created cohesive external branding and internal wayfinding aligned with the property's devotional tourism positioning.",
      location: 'Vrindavan, Uttar Pradesh',
      tags: ['Signage', 'Leisure Hotels', 'Vrindavan'],
    },
    {
      title: 'PMC — Habibi at Andaz Aerocity, Delhi',
      value: 'Turnkey PMC',
      type: 'Restaurant PMC',
      desc: 'Provided specialised PMC services for Habibi restaurant within the prestigious Andaz Aerocity property. Managed fit-out coordination, compliance management and pre-opening advisory.',
      location: 'Andaz Aerocity, New Delhi',
      tags: ['PMC', 'Habibi', 'Andaz', 'Aerocity'],
    },
    {
      title: 'PMC — Hosur Hotel & Hills',
      value: 'Turnkey PMC',
      type: 'Project Management Consultancy',
      desc: 'Delivered comprehensive project management consultancy for this hill-station hospitality development in Hosur. Supervised construction quality, timeline management, and brand compliance for this greenfield hotel project.',
      location: 'Hosur, Tamil Nadu',
      tags: ['PMC', 'Hosur', 'Greenfield', 'Hill Station Hotel'],
    },
    {
      title: 'PMC — Yella Hills Resort, Yelagiri',
      value: 'Turnkey PMC',
      type: 'Project Management Consultancy',
      desc: 'Executed end-to-end PMC for Yella Hills Resort in the scenic Yelagiri hills of Tamil Nadu. Managed sustainable construction practices and resort amenity development for this leisure destination.',
      location: 'Yelagiri, Tamil Nadu',
      tags: ['PMC', 'Yella Hills', 'Yelagiri', 'Resort PMC'],
    },
  ],
  entertainment: [
    {
      title: 'Due Diligence — Entertainment City Limited for Adlabs Imagica',
      value: '₹500 Cr Transaction',
      type: 'Client-Side Due Diligence (SPOC)',
      desc: "Served as the dedicated Client-Side Single Point of Contact for comprehensive due diligence in Entertainment City Limited's evaluation of Adlabs Imagica acquisition. Coordinated financial, legal, operational, and technical assessments for this ₹500 Crore entertainment sector transaction.",
      location: 'Adlabs Imagica, Maharashtra',
      tags: ['Due Diligence', 'Adlabs Imagica', 'Entertainment City', '₹500 Cr'],
    },
    {
      title: 'Entertainment City Limited — 100% Divestment (Joint with EY)',
      value: '₹1,350 Cr+',
      type: 'Joint Transaction Advisory',
      desc: 'Partnered with EY as Joint Transaction Advisors for the complete 100% divestment of Entertainment City Limited. Managed complex stakeholder negotiations, structured deal documentation, and coordinated multi-party due diligence for this landmark ₹1,350+ Crore transaction.',
      location: 'Entertainment City, Noida',
      tags: ['Divestment', 'EY', 'Entertainment City', 'Major Transaction', '₹1,350 Cr+'],
    },
    {
      title: 'Worlds of Wonder Park — Post-COVID Re-opening & Lease',
      value: '10-Acre Waterpark',
      type: 'Operational Revival & Lease Advisory',
      desc: "Orchestrated the strategic re-opening of India's premier waterpark following COVID-19 closure. Managed lease negotiations and operational revival planning for this 10-acre world-class attraction at Entertainment City, Noida, restoring it as NCR's flagship family entertainment destination.",
      location: 'Entertainment City, Noida',
      tags: ['Worlds of Wonder', 'Waterpark', 'Entertainment City', 'Post-COVID Revival'],
    },
  ],
  debt: [
    {
      title: 'Entertainment City Limited — 100% Divestment as Joint Transaction Advisors alongside EY',
      value: '₹1,350 Cr+',
      type: 'Joint Transaction Advisory',
      desc: 'Partnered with EY as Joint Transaction Advisors for the complete 100% divestment of Entertainment City Limited. Managed complex stakeholder negotiations, structured deal documentation, and coordinated multi-party due diligence for this landmark ₹1,350+ Crore transaction in the entertainment and real estate sector.',
      location: 'Entertainment City, Noida',
      tags: ['Debt Advisory', 'Special Situations', 'EY', '₹1,350 Cr+'],
    },
  ],
  horeca: [
    {
      title: 'HORECA Supplies — Mahindra Holidays & Resorts India Ltd.',
      value: 'Pan-India Supply',
      type: 'HORECA Procurement',
      desc: "Established strategic HORECA supply partnership with Mahindra Holidays & Resorts India Limited, one of India's largest leisure hospitality companies. Delivered comprehensive F&B equipment, kitchen solutions, and operational supplies across their pan-India resort network.",
      location: 'Multiple Locations, Pan-India',
      tags: ['Mahindra Holidays', 'HORECA', 'Resort Supply', 'Pan-India'],
    },
    {
      title: 'HORECA Supplies — Sterling Holidays & Resorts Ltd.',
      value: 'Multi-Location',
      type: 'HORECA Procurement',
      desc: 'Secured multi-location HORECA supply contract with Sterling Holidays & Resorts, providing end-to-end hospitality equipment and consumables across their diverse portfolio of leisure destinations nationwide.',
      location: 'Multiple Locations, Pan-India',
      tags: ['Sterling Holidays', 'HORECA', 'Resort Supply'],
    },
    {
      title: 'HORECA Supplies — CGH Earth Hotels',
      value: 'Eco-Luxury Supply',
      type: 'HORECA Procurement',
      desc: "Partnered with CGH Earth, the renowned eco-luxury hospitality brand, to supply premium HORECA products aligned with their sustainability ethos. Delivered curated solutions meeting international eco-luxury standards.",
      location: 'Kerala & South India',
      tags: ['CGH Earth', 'Eco-Luxury', 'HORECA', 'Sustainability'],
    },
    {
      title: 'HORECA Supplies — Accor Hotels (Novotel), Bengaluru',
      value: 'International Standard',
      type: 'HORECA Procurement',
      desc: 'Executed HORECA supply mandate for Novotel Bengaluru, part of the global Accor hospitality network. Provided international-standard kitchen equipment, tableware, and OS&E supplies.',
      location: 'Bengaluru, Karnataka',
      tags: ['Novotel', 'Accor', 'HORECA', 'Bengaluru'],
    },
    {
      title: 'HORECA Supplies — Escapade Resorts | Marari Beach Resort, Alleppey',
      value: 'Beach Resort Supply',
      type: 'HORECA Procurement',
      desc: "Delivered tailored HORECA solutions for Marari Beach Resort in Kerala's backwaters, supplying beach resort-specific equipment and operational supplies to international hospitality standards.",
      location: 'Alleppey, Kerala',
      tags: ['Marari Beach Resort', 'HORECA', 'Kerala', 'Beach Resort'],
    },
    {
      title: 'HORECA Supplies — Coastal Resorts India Ltd. | Brunton Boatyard, Kochi',
      value: 'Heritage Supply',
      type: 'HORECA Procurement',
      desc: 'Provided specialised HORECA supplies for the heritage Brunton Boatyard property in Fort Kochi. Sourced period-appropriate and premium hospitality products befitting this iconic heritage property.',
      location: 'Fort Kochi, Kerala',
      tags: ['Brunton Boatyard', 'HORECA', 'Heritage', 'Kochi'],
    },
    {
      title: 'HORECA Supplies — Regenta Hotels (Multiple Locations)',
      value: 'Pan-India Framework',
      type: 'HORECA Procurement',
      desc: "Established pan-India HORECA supply framework with Regenta Hotels, Royal Orchid's mid-scale brand. Delivered standardised hospitality equipment across their expanding network of properties.",
      location: 'Multiple Locations, Pan-India',
      tags: ['Regenta Hotels', 'Royal Orchid', 'HORECA', 'Pan-India'],
    },
    {
      title: 'HORECA Supplies — Cygnett Hotels (Multiple Locations)',
      value: 'Multi-City Supply',
      type: 'HORECA Procurement',
      desc: 'Secured comprehensive HORECA supply agreement with Cygnett Hotels & Resorts, supporting their rapid expansion across tier-2 and tier-3 cities with standardised hospitality supplies.',
      location: 'Multiple Tier-2/3 Cities',
      tags: ['Cygnett Hotels', 'HORECA', 'Tier-2', 'Tier-3'],
    },
    {
      title: 'HORECA Supplies — Park Inn by Radisson, Delhi',
      value: 'International Standard',
      type: 'HORECA Procurement',
      desc: "Executed HORECA supply mandate for Park Inn by Radisson Delhi, meeting Radisson Hotel Group's international procurement standards. Delivered complete kitchen equipment, FF&E and OS&E supplies.",
      location: 'New Delhi',
      tags: ['Park Inn', 'Radisson', 'HORECA', 'Delhi'],
    },
  ],
}
