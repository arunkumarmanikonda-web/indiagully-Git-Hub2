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
  { value: '₹1,165 Cr+', label: 'Active Mandate Pipeline' },
  { value: '15+', label: 'Hotel Projects' },
  { value: '30+', label: 'Retail Brands' },
  { value: '20+', label: 'Hospitality Brand Partnerships' },
  { value: 'Pan-India', label: 'Presence' },
]

// ── BRAND LOGOS ─────────────────────────────────────────────────────────────
// Premium inline-SVG brand logo tiles — zero external CDN dependency.
// Design: brand-accurate colours + bold wordmark + subtle accent shape.
// Width=160 Height=64 for wider display in brand marquees.

function svgToDataUri(svg: string): string {
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)
}

// Build a brand wordmark SVG with icon accent
// bg=fill, fg=text, accent=decorative color, label=display text, sub=subtitle, iconPath=optional small path
function bsvg(opts: {
  bg: string; fg: string; accent?: string
  label: string; sub?: string
  fs?: number; fw?: string; ff?: string
  ls?: string; shape?: string // shape = extra SVG element
}): string {
  const { bg, fg, accent = fg, label, sub, fs = 13, fw = '700', ff = 'Arial,Helvetica,sans-serif', ls = '1', shape = '' } = opts
  const lbl = label.replace(/&/g, '&amp;').replace(/</g, '&lt;')
  const subLine = sub ? sub.replace(/&/g, '&amp;').replace(/</g, '&lt;') : ''
  const y1 = sub ? '42%' : '54%'
  return `<svg xmlns="http://www.w3.org/2000/svg" width="160" height="64" viewBox="0 0 160 64">\
<rect width="160" height="64" fill="${bg}"/>\
${shape}\
<text x="80" y="${y1}" font-family="${ff}" font-size="${fs}" font-weight="${fw}" fill="${fg}" text-anchor="middle" dominant-baseline="middle" letter-spacing="${ls}">${lbl}</text>\
${sub ? `<text x="80" y="68%" font-family="${ff}" font-size="7" font-weight="400" fill="${accent}" text-anchor="middle" dominant-baseline="middle" letter-spacing="1.5">${subLine}</text>` : ''}\
</svg>`
}

// ── HOSPITALITY BRANDS ─────────────────────────────────────────────────────
// Categories: Global Chains · Indian Luxury · Midscale India · Economy/Budget
// Brands India Gully actively works with for hotel on-boarding, management contracts & acquisitions

export const HOSPITALITY_BRANDS: Array<{ name: string; svg: string; color: string; cat: string; catColor: string }> = [

  // ── GLOBAL CHAINS (operating extensively in India) ──
  {
    name: 'Marriott Bonvoy', color: '#8B0000', cat: 'Global Chain', catColor: '#8B0000',
    svg: svgToDataUri(bsvg({
      bg: '#8B0000', fg: '#FFFFFF', accent: '#FFD7A0',
      label: 'MARRIOTT', sub: 'BONVOY',
      fs: 14, ls: '2',
      shape: '<rect x="12" y="28" width="136" height="1" fill="rgba(255,215,160,.3)"/><polygon points="80,8 87,18 73,18" fill="rgba(255,215,160,.4)"/>'
    }))
  },
  {
    name: 'Radisson Hotels', color: '#003DA5', cat: 'Global Chain', catColor: '#003DA5',
    svg: svgToDataUri(bsvg({
      bg: '#003DA5', fg: '#FFFFFF', accent: '#7EC8E3',
      label: 'RADISSON', sub: 'HOTELS & RESORTS',
      fs: 14, ls: '1.5',
      shape: '<rect x="12" y="56" width="40" height="2" fill="#7EC8E3" rx="1"/>'
    }))
  },
  {
    name: 'IHG Hotels & Resorts', color: '#006399', cat: 'Global Chain', catColor: '#006399',
    svg: svgToDataUri(bsvg({
      bg: '#006399', fg: '#FFFFFF', accent: '#A8D8EA',
      label: 'IHG', sub: 'HOTELS & RESORTS',
      fs: 22, ls: '3', fw: '900',
      shape: '<circle cx="24" cy="32" r="10" fill="rgba(168,216,234,.15)"/><circle cx="136" cy="32" r="10" fill="rgba(168,216,234,.15)"/>'
    }))
  },
  {
    name: 'Hyatt Hotels', color: '#1D2B4F', cat: 'Global Chain', catColor: '#1D2B4F',
    svg: svgToDataUri(bsvg({
      bg: '#1D2B4F', fg: '#FFFFFF', accent: '#E8C96C',
      label: 'HYATT', sub: 'HOTELS & RESORTS',
      fs: 16, ls: '3', fw: '800',
      shape: '<rect x="12" y="8" width="2" height="48" fill="rgba(232,201,108,.25)"/><rect x="146" y="8" width="2" height="48" fill="rgba(232,201,108,.25)"/>'
    }))
  },
  {
    name: 'Accor Hotels', color: '#B01C2E', cat: 'Global Chain', catColor: '#B01C2E',
    svg: svgToDataUri(bsvg({
      bg: '#B01C2E', fg: '#FFFFFF', accent: '#FFD7A0',
      label: 'ACCOR', sub: 'IBIS · NOVOTEL · MERCURE',
      fs: 15, ls: '2.5',
      shape: '<rect x="60" y="8" width="40" height="3" fill="rgba(255,215,160,.35)" rx="1.5"/>'
    }))
  },
  {
    name: 'Wyndham Hotels', color: '#002A5C', cat: 'Global Chain', catColor: '#002A5C',
    svg: svgToDataUri(bsvg({
      bg: '#002A5C', fg: '#FFFFFF', accent: '#F0A500',
      label: 'WYNDHAM', sub: 'HOTELS & RESORTS',
      fs: 13, ls: '1.5',
      shape: '<path d="M 12 32 Q 80 16 148 32" stroke="rgba(240,165,0,.3)" stroke-width="1.5" fill="none"/>'
    }))
  },

  // ── INDIAN LUXURY ──
  {
    name: 'Taj Hotels', color: '#1A1A1A', cat: 'Indian Luxury', catColor: '#C9A84C',
    svg: svgToDataUri(bsvg({
      bg: '#1A1A1A', fg: '#C9A84C', accent: '#C9A84C',
      label: 'TAJ', sub: 'HOTELS · RESORTS · PALACES',
      fs: 20, ls: '4', fw: '700', ff: 'Georgia,serif',
      shape: '<rect x="12" y="56" width="136" height="1" fill="rgba(201,168,76,.3)"/><rect x="42" y="58" width="76" height="1" fill="rgba(201,168,76,.5)"/>'
    }))
  },
  {
    name: 'ITC Hotels', color: '#1A4D2E', cat: 'Indian Luxury', catColor: '#FFD700',
    svg: svgToDataUri(bsvg({
      bg: '#1A4D2E', fg: '#FFD700', accent: '#FFD700',
      label: 'ITC', sub: 'HOTELS · LUXURY COLLECTION',
      fs: 20, ls: '4', fw: '800',
      shape: '<rect x="12" y="8" width="136" height="1.5" fill="rgba(255,215,0,.3)"/>'
    }))
  },
  {
    name: 'The Leela Palaces', color: '#1B1B2F', cat: 'Indian Luxury', catColor: '#D4AF37',
    svg: svgToDataUri(bsvg({
      bg: '#1B1B2F', fg: '#D4AF37', accent: '#D4AF37',
      label: 'THE LEELA', sub: 'PALACES · HOTELS · RESORTS',
      fs: 13, ls: '1.5', fw: '700', ff: 'Georgia,serif',
      shape: '<polygon points="80,6 84,14 76,14" fill="rgba(212,175,55,.3)"/>'
    }))
  },
  {
    name: 'Oberoi Hotels', color: '#2C1A0E', cat: 'Indian Luxury', catColor: '#D4AF37',
    svg: svgToDataUri(bsvg({
      bg: '#2C1A0E', fg: '#D4AF37', accent: '#D4AF37',
      label: 'OBEROI', sub: 'HOTELS & RESORTS',
      fs: 14, ls: '2', fw: '700', ff: 'Georgia,serif',
      shape: '<rect x="40" y="8" width="80" height="1" fill="rgba(212,175,55,.35)"/><rect x="40" y="55" width="80" height="1" fill="rgba(212,175,55,.35)"/>'
    }))
  },
  {
    name: 'WelcomHeritage', color: '#3D1C1C', cat: 'Indian Luxury', catColor: '#E8C84A',
    svg: svgToDataUri(bsvg({
      bg: '#3D1C1C', fg: '#E8C84A', accent: '#E8C84A',
      label: 'WELCOMHERITAGE', sub: 'BY ITC HOTELS',
      fs: 10, ls: '1', fw: '700',
      shape: '<path d="M 30 32 L 35 22 L 40 32 L 45 22 L 50 32" stroke="rgba(232,200,74,.3)" stroke-width="1" fill="none"/>'
    }))
  },

  // ── MIDSCALE INDIA ──
  {
    name: 'Lemon Tree Hotels', color: '#F5A623', cat: 'Midscale', catColor: '#F5A623',
    svg: svgToDataUri(bsvg({
      bg: '#F5A623', fg: '#1A1A1A', accent: '#1A1A1A',
      label: 'LEMON TREE', sub: 'HOTELS',
      fs: 13, ls: '1',
      shape: '<circle cx="18" cy="14" r="8" fill="rgba(26,26,26,.15)"/><circle cx="18" cy="14" r="5" fill="rgba(26,26,26,.2)"/>'
    }))
  },
  {
    name: 'Sarovar Hotels', color: '#C0392B', cat: 'Midscale', catColor: '#C0392B',
    svg: svgToDataUri(bsvg({
      bg: '#C0392B', fg: '#FFFFFF', accent: '#FFD7A0',
      label: 'SAROVAR', sub: 'HOTELS & RESORTS',
      fs: 13, ls: '1.5',
      shape: '<path d="M 20 40 Q 80 20 140 40" stroke="rgba(255,215,160,.3)" stroke-width="2" fill="none"/>'
    }))
  },
  {
    name: 'Pride Hotels', color: '#B8960C', cat: 'Midscale', catColor: '#B8960C',
    svg: svgToDataUri(bsvg({
      bg: '#B8960C', fg: '#FFFFFF', accent: '#fff',
      label: 'PRIDE', sub: 'HOTELS & RESORTS',
      fs: 15, ls: '2',
      shape: '<polygon points="80,6 86,16 74,16" fill="rgba(255,255,255,.25)"/>'
    }))
  },
  {
    name: 'Fortune Hotels', color: '#1A3A6B', cat: 'Midscale', catColor: '#F0A500',
    svg: svgToDataUri(bsvg({
      bg: '#1A3A6B', fg: '#F0A500', accent: '#F0A500',
      label: 'FORTUNE', sub: 'HOTELS · PARK INN',
      fs: 13, ls: '1.5',
      shape: '<rect x="12" y="30" width="136" height="1" fill="rgba(240,165,0,.2)"/>'
    }))
  },
  {
    name: 'Cygnett Hotels', color: '#1A3A6B', cat: 'Midscale', catColor: '#7EC8E3',
    svg: svgToDataUri(bsvg({
      bg: '#1A3A6B', fg: '#FFFFFF', accent: '#7EC8E3',
      label: 'CYGNETT', sub: 'HOTELS & RESORTS',
      fs: 13, ls: '1',
      shape: '<path d="M 30 44 Q 50 28 70 44 Q 90 28 110 44" stroke="rgba(126,200,227,.35)" stroke-width="1.5" fill="none"/>'
    }))
  },
  {
    name: 'Regenta by Royal Orchid', color: '#6B1A1A', cat: 'Midscale', catColor: '#E8C84A',
    svg: svgToDataUri(bsvg({
      bg: '#6B1A1A', fg: '#FFFFFF', accent: '#E8C84A',
      label: 'REGENTA', sub: 'BY ROYAL ORCHID',
      fs: 13, ls: '1.5',
      shape: '<path d="M 20 20 Q 80 8 140 20" stroke="rgba(232,200,74,.3)" stroke-width="1.5" fill="none"/>'
    }))
  },
  {
    name: 'Nile Hospitality', color: '#1A4A6B', cat: 'Midscale', catColor: '#4FC3F7',
    svg: svgToDataUri(bsvg({
      bg: '#1A4A6B', fg: '#FFFFFF', accent: '#4FC3F7',
      label: 'NILE', sub: 'HOSPITALITY',
      fs: 16, ls: '3', fw: '800',
      shape: '<path d="M 12 44 Q 40 32 68 44 Q 96 56 124 44 Q 136 38 148 44" stroke="rgba(79,195,247,.4)" stroke-width="2" fill="none"/>'
    }))
  },

  // ── ECONOMY / BUDGET ──
  {
    name: 'Keys Hotels', color: '#1A6B3A', cat: 'Economy', catColor: '#6EE7B7',
    svg: svgToDataUri(bsvg({
      bg: '#1A6B3A', fg: '#FFFFFF', accent: '#6EE7B7',
      label: 'KEYS', sub: 'SELECT · PRIME · LITE',
      fs: 16, ls: '3',
      shape: '<circle cx="145" cy="20" r="7" fill="none" stroke="rgba(110,231,183,.4)" stroke-width="1.5"/><line x1="145" y1="20" x2="145" y2="30" stroke="rgba(110,231,183,.4)" stroke-width="1.5"/><line x1="141" y1="25" x2="149" y2="25" stroke="rgba(110,231,183,.4)" stroke-width="1.5"/>'
    }))
  },
  {
    name: 'Treebo Hotels', color: '#E91E63', cat: 'Economy', catColor: '#fff',
    svg: svgToDataUri(bsvg({
      bg: '#E91E63', fg: '#FFFFFF', accent: '#fff',
      label: 'TREEBO', sub: 'HOTELS',
      fs: 14, ls: '1.5',
      shape: '<path d="M 20 40 L 24 28 L 28 40" stroke="rgba(255,255,255,.4)" stroke-width="1.5" fill="none"/><line x1="16" y1="40" x2="32" y2="40" stroke="rgba(255,255,255,.4)" stroke-width="1.5"/>'
    }))
  },
  {
    name: 'OYO Rooms', color: '#EF3340', cat: 'Economy', catColor: '#fff',
    svg: svgToDataUri(bsvg({
      bg: '#EF3340', fg: '#FFFFFF', accent: '#fff',
      label: 'OYO', sub: 'HOTELS & HOMES',
      fs: 18, ls: '3', fw: '900',
      shape: '<rect x="12" y="56" width="136" height="2" fill="rgba(255,255,255,.2)" rx="1"/>'
    }))
  },
]

// ── RETAIL BRANDS ──────────────────────────────────────────────────────────
// Categorised by industry best-practice mall/retail mix:
//   F&B | Anchor Retail | Cinema | Fashion & Apparel | Accessories & Beauty | Electronics
// Brands India Gully works with for leasing advisory, brand on-boarding & tenant mix

export const RETAIL_BRANDS: Array<{ name: string; svg: string; color: string; cat: string; catColor: string; catIcon: string }> = [

  // ── F&B ──
  {
    name: "McDonald's", color: '#DA291C', cat: 'F&B', catColor: '#FFC72C', catIcon: 'fa-burger',
    svg: svgToDataUri(bsvg({
      bg: '#DA291C', fg: '#FFC72C', accent: '#FFC72C',
      label: "McDONALD'S", sub: 'FOOD & BEVERAGE',
      fs: 11, ls: '1', fw: '900',
      shape: '<path d="M 62 46 Q 62 30 70 24 Q 78 18 80 24 Q 82 18 90 24 Q 98 30 98 46" stroke="#FFC72C" stroke-width="3" fill="none" stroke-linecap="round"/>'
    }))
  },
  {
    name: 'KFC', color: '#F40027', cat: 'F&B', catColor: '#fff', catIcon: 'fa-drumstick-bite',
    svg: svgToDataUri(bsvg({
      bg: '#F40027', fg: '#FFFFFF', accent: '#fff',
      label: 'KFC', sub: "KENTUCKY FRIED CHICKEN",
      fs: 22, ls: '4', fw: '900',
      shape: '<rect x="12" y="54" width="136" height="2" fill="rgba(255,255,255,.25)" rx="1"/>'
    }))
  },
  {
    name: 'Burger King', color: '#F5821F', cat: 'F&B', catColor: '#501E10', catIcon: 'fa-burger',
    svg: svgToDataUri(bsvg({
      bg: '#F5821F', fg: '#501E10', accent: '#501E10',
      label: 'BURGER', sub: 'KING',
      fs: 16, ls: '2', fw: '900',
      shape: '<path d="M 20 20 Q 80 12 140 20" stroke="rgba(80,30,16,.35)" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M 20 44 Q 80 52 140 44" stroke="rgba(80,30,16,.35)" stroke-width="3" fill="none" stroke-linecap="round"/>'
    }))
  },
  {
    name: 'Subway', color: '#009B48', cat: 'F&B', catColor: '#FFC709', catIcon: 'fa-sandwich',
    svg: svgToDataUri(bsvg({
      bg: '#009B48', fg: '#FFC709', accent: '#FFC709',
      label: 'SUBWAY', sub: 'EAT FRESH',
      fs: 14, ls: '2', fw: '900',
      shape: '<path d="M 12 48 L 148 48" stroke="rgba(255,199,9,.3)" stroke-width="2"/>'
    }))
  },
  {
    name: 'Starbucks', color: '#00704A', cat: 'F&B', catColor: '#CBA258', catIcon: 'fa-mug-hot',
    svg: svgToDataUri(bsvg({
      bg: '#00704A', fg: '#FFFFFF', accent: '#CBA258',
      label: 'STARBUCKS', sub: 'COFFEE',
      fs: 12, ls: '1',
      shape: '<circle cx="80" cy="14" r="8" fill="none" stroke="rgba(203,162,88,.5)" stroke-width="1.5"/><circle cx="80" cy="14" r="4" fill="rgba(203,162,88,.25)"/>'
    }))
  },
  {
    name: "Domino's Pizza", color: '#006491', cat: 'F&B', catColor: '#E31837', catIcon: 'fa-pizza-slice',
    svg: svgToDataUri(bsvg({
      bg: '#006491', fg: '#FFFFFF', accent: '#E31837',
      label: "DOMINO'S", sub: 'PIZZA',
      fs: 13, ls: '1.5',
      shape: '<rect x="12" y="56" width="60" height="3" fill="#E31837" rx="1.5"/>'
    }))
  },
  {
    name: 'Pizza Hut', color: '#EE3124', cat: 'F&B', catColor: '#fff', catIcon: 'fa-pizza-slice',
    svg: svgToDataUri(bsvg({
      bg: '#EE3124', fg: '#FFFFFF', accent: '#fff',
      label: 'PIZZA HUT', sub: 'RESTAURANTS',
      fs: 13, ls: '1',
      shape: '<path d="M 55 14 Q 80 6 105 14 L 100 20 Q 80 12 60 20 Z" fill="rgba(255,255,255,.2)"/>'
    }))
  },
  {
    name: "Dunkin'", color: '#FF671F', cat: 'F&B', catColor: '#DA1884', catIcon: 'fa-circle-dot',
    svg: svgToDataUri(bsvg({
      bg: '#FF671F', fg: '#FFFFFF', accent: '#DA1884',
      label: "DUNKIN'", sub: 'DONUTS & COFFEE',
      fs: 13, ls: '1',
      shape: '<circle cx="18" cy="32" r="10" fill="none" stroke="rgba(218,24,132,.5)" stroke-width="2.5"/><circle cx="18" cy="32" r="4" fill="rgba(218,24,132,.4)"/>'
    }))
  },
  {
    name: 'Barbeque Nation', color: '#8B1A1A', cat: 'F&B', catColor: '#F5A623', catIcon: 'fa-fire',
    svg: svgToDataUri(bsvg({
      bg: '#8B1A1A', fg: '#F5A623', accent: '#F5A623',
      label: 'BARBEQUE', sub: 'NATION',
      fs: 13, ls: '1', fw: '800',
      shape: '<path d="M 20 38 Q 22 28 24 38 Q 26 28 28 38" stroke="rgba(245,166,35,.5)" stroke-width="1.5" fill="none"/>'
    }))
  },
  {
    name: "Haldiram's", color: '#D4721E', cat: 'F&B', catColor: '#fff', catIcon: 'fa-bowl-food',
    svg: svgToDataUri(bsvg({
      bg: '#D4721E', fg: '#FFFFFF', accent: '#fff',
      label: "HALDIRAM'S", sub: 'SINCE 1937',
      fs: 12, ls: '1',
      shape: '<path d="M 40 54 Q 80 44 120 54" stroke="rgba(255,255,255,.3)" stroke-width="1.5" fill="none"/>'
    }))
  },

  // ── ANCHOR RETAIL & HYPERMARKET ──
  {
    name: 'D-Mart', color: '#1A4B8E', cat: 'Anchor Retail', catColor: '#E8000D', catIcon: 'fa-store',
    svg: svgToDataUri(bsvg({
      bg: '#1A4B8E', fg: '#FFFFFF', accent: '#E8000D',
      label: 'D MART', sub: 'EVERYDAY LOW PRICES',
      fs: 15, ls: '2', fw: '900',
      shape: '<rect x="12" y="8" width="8" height="48" fill="rgba(232,0,13,.6)" rx="2"/>'
    }))
  },
  {
    name: 'Reliance Retail', color: '#0B316A', cat: 'Anchor Retail', catColor: '#E53935', catIcon: 'fa-store',
    svg: svgToDataUri(bsvg({
      bg: '#0B316A', fg: '#FFFFFF', accent: '#E53935',
      label: 'RELIANCE', sub: 'RETAIL · FRESH · SMART',
      fs: 13, ls: '1.5',
      shape: '<path d="M 20 32 Q 40 20 60 32 Q 80 44 100 32 Q 120 20 140 32" stroke="rgba(229,57,53,.4)" stroke-width="1.5" fill="none"/>'
    }))
  },
  {
    name: "Spencer's Retail", color: '#E31837', cat: 'Anchor Retail', catColor: '#fff', catIcon: 'fa-store',
    svg: svgToDataUri(bsvg({
      bg: '#E31837', fg: '#FFFFFF', accent: '#fff',
      label: "SPENCER'S", sub: 'HYPER · DAILY',
      fs: 12, ls: '1',
      shape: '<rect x="12" y="56" width="80" height="2" fill="rgba(255,255,255,.3)" rx="1"/>'
    }))
  },
  {
    name: 'More Retail', color: '#0054A5', cat: 'Anchor Retail', catColor: '#FFC107', catIcon: 'fa-store',
    svg: svgToDataUri(bsvg({
      bg: '#0054A5', fg: '#FFFFFF', accent: '#FFC107',
      label: 'MORE', sub: 'SUPERMARKET · HYPERMARKET',
      fs: 16, ls: '3', fw: '800',
      shape: '<circle cx="140" cy="18" r="8" fill="rgba(255,193,7,.2)"/>'
    }))
  },
  {
    name: 'Lifestyle Stores', color: '#1A1A1A', cat: 'Anchor Retail', catColor: '#D4AF37', catIcon: 'fa-store',
    svg: svgToDataUri(bsvg({
      bg: '#1A1A1A', fg: '#FFFFFF', accent: '#D4AF37',
      label: 'LIFESTYLE', sub: 'DEPARTMENT STORE',
      fs: 12, ls: '1.5',
      shape: '<rect x="12" y="56" width="136" height="1" fill="rgba(212,175,55,.4)"/>'
    }))
  },

  // ── CINEMA / ENTERTAINMENT ANCHOR ──
  {
    name: 'PVR INOX', color: '#C8001C', cat: 'Cinema', catColor: '#FFD700', catIcon: 'fa-film',
    svg: svgToDataUri(bsvg({
      bg: '#C8001C', fg: '#FFFFFF', accent: '#FFD700',
      label: 'PVR INOX', sub: 'CINEMAS',
      fs: 14, ls: '2', fw: '900',
      shape: '<path d="M 20 22 L 26 14 L 26 30 Z" fill="rgba(255,215,0,.4)"/><path d="M 30 22 L 36 14 L 36 30 Z" fill="rgba(255,215,0,.3)"/>'
    }))
  },
  {
    name: 'Cinépolis', color: '#E30613', cat: 'Cinema', catColor: '#fff', catIcon: 'fa-film',
    svg: svgToDataUri(bsvg({
      bg: '#E30613', fg: '#FFFFFF', accent: '#fff',
      label: 'CINÉPOLIS', sub: 'CINEMAS',
      fs: 13, ls: '1.5',
      shape: '<path d="M 18 32 Q 18 18 28 18 Q 38 18 38 32 Q 38 46 28 46 Q 18 46 18 32 M 24 32 Q 24 24 28 24 Q 32 24 32 32 Q 32 40 28 40 Q 24 40 24 32" fill="rgba(255,255,255,.2)"/>'
    }))
  },
  {
    name: 'Miraj Cinemas', color: '#1A1A6B', cat: 'Cinema', catColor: '#F0C040', catIcon: 'fa-film',
    svg: svgToDataUri(bsvg({
      bg: '#1A1A6B', fg: '#F0C040', accent: '#F0C040',
      label: 'MIRAJ', sub: 'CINEMAS',
      fs: 15, ls: '2',
      shape: '<path d="M 20 42 L 26 12 L 32 42" stroke="rgba(240,192,64,.4)" stroke-width="1.5" fill="none"/>'
    }))
  },

  // ── FASHION & APPAREL ──
  {
    name: 'H&M', color: '#E50010', cat: 'Fashion & Apparel', catColor: '#fff', catIcon: 'fa-shirt',
    svg: svgToDataUri(bsvg({
      bg: '#E50010', fg: '#FFFFFF', accent: '#fff',
      label: 'H&M', sub: 'FASHION & QUALITY',
      fs: 22, ls: '3', fw: '900',
      shape: ''
    }))
  },
  {
    name: 'Zara', color: '#1A1A1A', cat: 'Fashion & Apparel', catColor: '#D4AF37', catIcon: 'fa-shirt',
    svg: svgToDataUri(bsvg({
      bg: '#1A1A1A', fg: '#FFFFFF', accent: '#D4AF37',
      label: 'ZARA', sub: 'INDITEX GROUP',
      fs: 18, ls: '5', fw: '700',
      shape: '<rect x="12" y="56" width="136" height="1" fill="rgba(255,255,255,.15)"/>'
    }))
  },
  {
    name: 'Uniqlo', color: '#E00012', cat: 'Fashion & Apparel', catColor: '#fff', catIcon: 'fa-shirt',
    svg: svgToDataUri(bsvg({
      bg: '#E00012', fg: '#FFFFFF', accent: '#fff',
      label: 'UNIQLO', sub: 'MADE FOR ALL',
      fs: 14, ls: '2', fw: '900',
      shape: '<rect x="12" y="8" width="136" height="3" fill="rgba(255,255,255,.2)" rx="1.5"/>'
    }))
  },
  {
    name: 'Marks & Spencer', color: '#1A1A1A', cat: 'Fashion & Apparel', catColor: '#D4AF37', catIcon: 'fa-shirt',
    svg: svgToDataUri(bsvg({
      bg: '#1A1A1A', fg: '#FFFFFF', accent: '#D4AF37',
      label: 'M&S', sub: 'MARKS & SPENCER',
      fs: 20, ls: '3', fw: '700',
      shape: '<rect x="12" y="56" width="136" height="1" fill="rgba(212,175,55,.4)"/>'
    }))
  },
  {
    name: 'Westside', color: '#2C2C2C', cat: 'Fashion & Apparel', catColor: '#D4AF37', catIcon: 'fa-shirt',
    svg: svgToDataUri(bsvg({
      bg: '#2C2C2C', fg: '#FFFFFF', accent: '#D4AF37',
      label: 'WESTSIDE', sub: 'TATA ENTERPRISE',
      fs: 12, ls: '1.5',
      shape: '<rect x="12" y="8" width="60" height="2" fill="rgba(212,175,55,.4)" rx="1"/>'
    }))
  },
  {
    name: 'Max Fashion', color: '#E63946', cat: 'Fashion & Apparel', catColor: '#fff', catIcon: 'fa-shirt',
    svg: svgToDataUri(bsvg({
      bg: '#E63946', fg: '#FFFFFF', accent: '#fff',
      label: 'MAX', sub: 'FASHION',
      fs: 20, ls: '4', fw: '900',
      shape: '<rect x="12" y="56" width="136" height="2" fill="rgba(255,255,255,.25)" rx="1"/>'
    }))
  },
  {
    name: 'FabIndia', color: '#8B2500', cat: 'Fashion & Apparel', catColor: '#F5D78E', catIcon: 'fa-shirt',
    svg: svgToDataUri(bsvg({
      bg: '#8B2500', fg: '#F5D78E', accent: '#F5D78E',
      label: 'FABINDIA', sub: 'SINCE 1960',
      fs: 12, ls: '1.5', fw: '700', ff: 'Georgia,serif',
      shape: '<path d="M 20 44 Q 40 32 60 44 Q 80 56 100 44 Q 120 32 140 44" stroke="rgba(245,215,142,.3)" stroke-width="1" fill="none"/>'
    }))
  },
  {
    name: 'Manyavar', color: '#7B0C2D', cat: 'Fashion & Apparel', catColor: '#D4AF37', catIcon: 'fa-person',
    svg: svgToDataUri(bsvg({
      bg: '#7B0C2D', fg: '#D4AF37', accent: '#D4AF37',
      label: 'MANYAVAR', sub: 'CELEBRATE LIFE',
      fs: 12, ls: '1', fw: '700', ff: 'Georgia,serif',
      shape: '<rect x="12" y="8" width="136" height="1.5" fill="rgba(212,175,55,.3)"/><rect x="12" y="54" width="136" height="1.5" fill="rgba(212,175,55,.3)"/>'
    }))
  },
  {
    name: 'BIBA', color: '#E8374A', cat: 'Fashion & Apparel', catColor: '#fff', catIcon: 'fa-person-dress',
    svg: svgToDataUri(bsvg({
      bg: '#E8374A', fg: '#FFFFFF', accent: '#fff',
      label: 'BIBA', sub: 'INDIAN ETHNIC WEAR',
      fs: 18, ls: '4', fw: '800',
      shape: '<circle cx="140" cy="14" r="6" fill="rgba(255,255,255,.15)"/>'
    }))
  },

  // ── ACCESSORIES & JEWELLERY & BEAUTY ──
  {
    name: 'Tanishq', color: '#1A1A1A', cat: 'Accessories & Beauty', catColor: '#D4AF37', catIcon: 'fa-gem',
    svg: svgToDataUri(bsvg({
      bg: '#1A1A1A', fg: '#D4AF37', accent: '#D4AF37',
      label: 'TANISHQ', sub: 'TATA JEWELLERY',
      fs: 12, ls: '1.5', fw: '700', ff: 'Georgia,serif',
      shape: '<polygon points="80,6 83,14 91,14 85,19 87,27 80,22 73,27 75,19 69,14 77,14" fill="rgba(212,175,55,.25)"/>'
    }))
  },
  {
    name: 'Nykaa', color: '#FC2779', cat: 'Accessories & Beauty', catColor: '#fff', catIcon: 'fa-spray-can-sparkles',
    svg: svgToDataUri(bsvg({
      bg: '#FC2779', fg: '#FFFFFF', accent: '#fff',
      label: 'NYKAA', sub: 'BEAUTY & FASHION',
      fs: 14, ls: '2',
      shape: '<circle cx="140" cy="14" r="7" fill="rgba(255,255,255,.15)"/><circle cx="140" cy="14" r="3.5" fill="rgba(255,255,255,.2)"/>'
    }))
  },
  {
    name: 'Sephora', color: '#1A1A1A', cat: 'Accessories & Beauty', catColor: '#fff', catIcon: 'fa-spray-can-sparkles',
    svg: svgToDataUri(bsvg({
      bg: '#1A1A1A', fg: '#FFFFFF', accent: '#fff',
      label: 'SEPHORA', sub: 'BEAUTY',
      fs: 13, ls: '2',
      shape: '<rect x="12" y="30" width="60" height="1.5" fill="rgba(255,255,255,.2)" rx="0.75"/>'
    }))
  },
  {
    name: "L'Oréal Paris", color: '#1B1464', cat: 'Accessories & Beauty', catColor: '#FFD700', catIcon: 'fa-spray-can',
    svg: svgToDataUri(bsvg({
      bg: '#1B1464', fg: '#FFD700', accent: '#FFD700',
      label: "L'ORÉAL", sub: 'PARIS',
      fs: 14, ls: '1.5', fw: '700',
      shape: '<rect x="12" y="56" width="136" height="1.5" fill="rgba(255,215,0,.35)" rx="0.75"/>'
    }))
  },

  // ── ELECTRONICS & LIFESTYLE ──
  {
    name: 'Croma', color: '#00B000', cat: 'Electronics', catColor: '#fff', catIcon: 'fa-mobile-screen',
    svg: svgToDataUri(bsvg({
      bg: '#00B000', fg: '#FFFFFF', accent: '#fff',
      label: 'CROMA', sub: 'TATA ELECTRONICS',
      fs: 14, ls: '2',
      shape: '<rect x="12" y="8" width="136" height="2" fill="rgba(255,255,255,.2)" rx="1"/>'
    }))
  },
  {
    name: 'Reliance Digital', color: '#0066CC', cat: 'Electronics', catColor: '#E53935', catIcon: 'fa-mobile-screen',
    svg: svgToDataUri(bsvg({
      bg: '#0066CC', fg: '#FFFFFF', accent: '#E53935',
      label: 'RELIANCE', sub: 'DIGITAL',
      fs: 12, ls: '1.5',
      shape: '<circle cx="140" cy="18" r="8" fill="rgba(229,57,53,.2)"/>'
    }))
  },
  {
    name: 'Samsung', color: '#1428A0', cat: 'Electronics', catColor: '#fff', catIcon: 'fa-mobile-screen',
    svg: svgToDataUri(bsvg({
      bg: '#1428A0', fg: '#FFFFFF', accent: '#fff',
      label: 'SAMSUNG', sub: 'EXPERIENCE STORE',
      fs: 12, ls: '1.5',
      shape: '<path d="M 40 52 Q 80 44 120 52" stroke="rgba(255,255,255,.25)" stroke-width="1.5" fill="none"/>'
    }))
  },
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
