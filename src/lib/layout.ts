// Master Layout Component — India Gully Enterprise Platform
export function layout(title: string, content: string, opts?: { 
  description?: string
  ogImage?: string
  bodyClass?: string
  noNav?: boolean
}) {
  const desc = opts?.description || 'India Gully — Celebrating Desiness. India\'s premier multi-vertical advisory firm across Real Estate, Retail, Hospitality, Entertainment, Debt & HORECA Solutions.'
  const ogImg = opts?.ogImage || 'https://india-gully.pages.dev/assets/og-image.jpg'
  return `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="${desc}">
<meta property="og:title" content="${title} — India Gully">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${ogImg}">
<meta property="og:type" content="website">
<meta name="twitter:card" content="summary_large_image">
<title>${title} — India Gully</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.5.0/css/all.min.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet">
<script>
  tailwind.config = {
    theme: {
      extend: {
        colors: {
          gold: { DEFAULT: '#C5A028', light: '#D4B445', dark: '#9E7E1A', pale: '#F7F3E9' },
          ig: { dark: '#1A1A1A', mid: '#2D2D2D', charcoal: '#3C3C3C', cream: '#F7F3E9', creamdark: '#EDE8D8', border: '#E8E4D8' }
        },
        fontFamily: {
          serif: ['Playfair Display', 'Georgia', 'serif'],
          display: ['Cormorant Garamond', 'Georgia', 'serif'],
          sans: ['Inter', 'system-ui', 'sans-serif'],
        }
      }
    }
  }
</script>
<style>
  :root { --gold: #C5A028; --dark: #1A1A1A; }
  body { font-family: 'Inter', sans-serif; background: #FAFAF7; color: #1A1A1A; }
  .font-serif { font-family: 'Playfair Display', serif; }
  .font-display { font-family: 'Cormorant Garamond', serif; }
  
  /* NAV */
  .nav-scrolled { background: rgba(26,26,26,0.97) !important; box-shadow: 0 2px 24px rgba(0,0,0,0.3); }
  
  /* GOLD ACCENT LINE */
  .gold-line::before { content:''; display:block; width:48px; height:3px; background:var(--gold); margin-bottom:1rem; }
  .gold-line-center::before { content:''; display:block; width:48px; height:3px; background:var(--gold); margin: 0 auto 1rem auto; }
  
  /* BUTTONS */
  .btn-gold { background:var(--gold); color:#fff; padding:.75rem 2rem; font-weight:600; letter-spacing:.05em; text-transform:uppercase; font-size:.875rem; transition:all .25s; border:2px solid var(--gold); }
  .btn-gold:hover { background:transparent; color:var(--gold); }
  .btn-outline-gold { border:2px solid var(--gold); color:var(--gold); padding:.75rem 2rem; font-weight:600; letter-spacing:.05em; text-transform:uppercase; font-size:.875rem; transition:all .25s; background:transparent; }
  .btn-outline-gold:hover { background:var(--gold); color:#fff; }
  .btn-dark { background:var(--dark); color:#fff; padding:.75rem 2rem; font-weight:600; letter-spacing:.05em; text-transform:uppercase; font-size:.875rem; transition:all .25s; border:2px solid var(--dark); }
  .btn-dark:hover { background:transparent; color:var(--dark); }
  
  /* CARD HOVER */
  .card-hover { transition:all .3s cubic-bezier(.4,0,.2,1); }
  .card-hover:hover { transform:translateY(-4px); box-shadow:0 20px 60px rgba(0,0,0,.12); }
  
  /* HERO */
  .hero-gradient { background: linear-gradient(135deg, #1A1A1A 0%, #2D2D2D 40%, #1A1A1A 100%); }
  .text-gold { color: var(--gold); }
  .bg-gold { background: var(--gold); }
  .border-gold { border-color: var(--gold); }
  
  /* SECTION DIVIDER */
  .section-divider { width:80px; height:2px; background:linear-gradient(90deg,var(--gold),transparent); }
  
  /* SCROLLBAR */
  ::-webkit-scrollbar { width:6px; }
  ::-webkit-scrollbar-track { background:#f1f1f1; }
  ::-webkit-scrollbar-thumb { background:var(--gold); border-radius:3px; }
  
  /* BADGE */
  .badge { display:inline-block; padding:.25rem .75rem; font-size:.75rem; font-weight:600; letter-spacing:.08em; text-transform:uppercase; border-radius:2px; }
  .badge-gold { background:rgba(197,160,40,.12); color:var(--gold); border:1px solid rgba(197,160,40,.3); }
  .badge-dark { background:rgba(26,26,26,.08); color:#1A1A1A; border:1px solid rgba(26,26,26,.15); }
  .badge-green { background:rgba(34,197,94,.1); color:#15803d; border:1px solid rgba(34,197,94,.2); }
  
  /* PORTAL CARD */
  .portal-card { background:#fff; border:1px solid #E8E4D8; transition:all .3s; cursor:pointer; }
  .portal-card:hover { border-color:var(--gold); box-shadow:0 8px 32px rgba(197,160,40,.15); transform:translateY(-2px); }
  
  /* LISTING CARD */
  .listing-card { background:#fff; border:1px solid #E8E4D8; overflow:hidden; transition:all .3s; }
  .listing-card:hover { border-color:var(--gold); box-shadow:0 12px 48px rgba(0,0,0,.1); }
  
  /* TABLE */
  .ig-table th { background:#1A1A1A; color:#fff; font-size:.75rem; letter-spacing:.1em; text-transform:uppercase; padding:.875rem 1rem; }
  .ig-table td { padding:.875rem 1rem; border-bottom:1px solid #E8E4D8; }
  .ig-table tr:hover td { background:#F7F3E9; }
  
  /* FORM */
  .ig-input { width:100%; border:1px solid #D4CEBC; padding:.875rem 1rem; background:#fff; font-size:.9rem; outline:none; transition:border-color .2s; font-family:'Inter',sans-serif; }
  .ig-input:focus { border-color:var(--gold); }
  .ig-label { display:block; font-size:.75rem; font-weight:600; letter-spacing:.08em; text-transform:uppercase; color:#5C5C5C; margin-bottom:.375rem; }
  
  /* FADE IN ANIMATION */
  @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
  .fade-up { animation:fadeUp .6s ease both; }
  .fade-up-2 { animation:fadeUp .6s ease .1s both; }
  .fade-up-3 { animation:fadeUp .6s ease .2s both; }
  
  /* NAVBAR HEIGHT */
  .nav-height { height:80px; }
  
  /* TIMELINE */
  .timeline-item::before { content:''; position:absolute; left:-1.25rem; top:.375rem; width:10px; height:10px; border-radius:50%; background:var(--gold); }
  
  /* METRICS */
  .metric-card { background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.1); padding:1.5rem; }
  
  /* ACCORDION */
  .accordion-content { max-height:0; overflow:hidden; transition:max-height .35s ease; }
  .accordion-content.open { max-height:800px; }
  
  /* PRINT */
  @media print { nav, footer, .no-print { display:none !important; } }
</style>
</head>
<body class="${opts?.bodyClass || ''}">
${opts?.noNav ? '' : navHTML()}
<main>
${content}
</main>
${footerHTML()}
<script>
// Navbar scroll behavior
const nav = document.getElementById('mainNav');
if (nav) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('nav-scrolled', window.scrollY > 60);
  });
}
// Mobile menu
const menuBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}
// Accordion
document.querySelectorAll('.accordion-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector('.accordion-icon');
    content.classList.toggle('open');
    if (icon) icon.style.transform = content.classList.contains('open') ? 'rotate(45deg)' : '';
  });
});
// Portal login
function showLoginModal(portalType) {
  document.getElementById('loginModal').classList.remove('hidden');
  document.getElementById('loginPortalType').textContent = portalType;
  document.getElementById('loginPortalField').value = portalType;
}
function closeLoginModal() {
  document.getElementById('loginModal').classList.add('hidden');
}
// Form submissions
document.querySelectorAll('.ig-form').forEach(form => {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    const orig = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-circle-notch fa-spin mr-2"></i>Sending...';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check mr-2"></i>Submitted';
      btn.classList.add('bg-green-600');
      setTimeout(() => { btn.innerHTML = orig; btn.disabled = false; btn.classList.remove('bg-green-600'); }, 3000);
    }, 1500);
  });
});
</script>
</body>
</html>`
}

function navHTML() {
  return `
<nav id="mainNav" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" style="background:rgba(26,26,26,0.95); backdrop-filter:blur(12px);">
  <div class="max-w-7xl mx-auto px-6 flex items-center justify-between nav-height">
    <!-- LOGO -->
    <a href="/" class="flex items-center gap-3 group flex-shrink-0">
      <div class="relative">
        <svg width="38" height="44" viewBox="0 0 38 44" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 2C10 2 3 9 3 18C3 24 6.5 29.5 12 32.5L9 42H29L26 32.5C31.5 29.5 35 24 35 18C35 9 28 2 19 2Z" fill="none" stroke="#C5A028" stroke-width="1.5"/>
          <path d="M22 8C18 8 15 10.5 14 14C13.2 16.8 14.5 19 17 20.5L14 26C16 27 18 27.5 19 27.5C22 27.5 25 26 26.5 23.5C28 21 27.5 18 25 16.5L27 12C25.5 9.5 24 8 22 8Z" fill="#C5A028" opacity="0.9"/>
          <path d="M16 14.5C17.5 13 20 13 21 14.5C22 16 21 18.5 19 19.5L17 22C15.5 20.5 14.5 18 15 16C15.2 15.4 15.6 14.9 16 14.5Z" fill="#1A1A1A"/>
        </svg>
      </div>
      <div class="leading-tight">
        <div class="font-serif text-xl font-bold text-white tracking-wide group-hover:text-gold transition-colors">INDIA GULLY</div>
        <div class="text-xs text-gold tracking-widest uppercase font-medium" style="letter-spacing:.18em;">Celebrating Desiness</div>
      </div>
    </a>
    
    <!-- DESKTOP NAV -->
    <div class="hidden lg:flex items-center gap-1">
      <a href="/" class="nav-link text-gray-300 hover:text-white text-sm font-medium px-4 py-2 transition-colors tracking-wide">Home</a>
      <a href="/about" class="nav-link text-gray-300 hover:text-white text-sm font-medium px-4 py-2 transition-colors tracking-wide">About</a>
      
      <!-- Services Dropdown -->
      <div class="relative group">
        <button class="nav-link text-gray-300 hover:text-white text-sm font-medium px-4 py-2 transition-colors tracking-wide flex items-center gap-1">
          Services <i class="fas fa-chevron-down text-xs opacity-60 group-hover:text-gold transition-all group-hover:rotate-180 duration-300"></i>
        </button>
        <div class="absolute top-full left-0 w-72 bg-ig-dark border border-gray-700 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-2xl" style="margin-top:4px;">
          <a href="/services#real-estate" class="flex items-center gap-3 px-5 py-3 text-gray-300 hover:bg-gray-800 hover:text-gold transition-colors text-sm"><span class="text-base">🏛️</span> Real Estate Advisory</a>
          <a href="/services#retail" class="flex items-center gap-3 px-5 py-3 text-gray-300 hover:bg-gray-800 hover:text-gold transition-colors text-sm"><span class="text-base">🛍️</span> Retail & Leasing</a>
          <a href="/services#hospitality" class="flex items-center gap-3 px-5 py-3 text-gray-300 hover:bg-gray-800 hover:text-gold transition-colors text-sm"><span class="text-base">🏨</span> Hospitality</a>
          <a href="/services#entertainment" class="flex items-center gap-3 px-5 py-3 text-gray-300 hover:bg-gray-800 hover:text-gold transition-colors text-sm"><span class="text-base">🎡</span> Entertainment</a>
          <a href="/services#debt" class="flex items-center gap-3 px-5 py-3 text-gray-300 hover:bg-gray-800 hover:text-gold transition-colors text-sm"><span class="text-base">⚖️</span> Debt & Special Situations</a>
          <div class="border-t border-gray-700 mt-1 pt-1">
            <a href="/horeca" class="flex items-center gap-3 px-5 py-3 text-gray-300 hover:bg-gray-800 hover:text-gold transition-colors text-sm"><span class="text-base">🍽️</span> HORECA Solutions</a>
          </div>
        </div>
      </div>
      
      <a href="/listings" class="nav-link text-gray-300 hover:text-white text-sm font-medium px-4 py-2 transition-colors tracking-wide">Mandates</a>
      <a href="/insights" class="nav-link text-gray-300 hover:text-white text-sm font-medium px-4 py-2 transition-colors tracking-wide">Insights</a>
      <a href="/contact" class="nav-link text-gray-300 hover:text-white text-sm font-medium px-4 py-2 transition-colors tracking-wide">Contact</a>
    </div>
    
    <!-- CTA + PORTALS -->
    <div class="hidden lg:flex items-center gap-3">
      <!-- Portal Dropdown -->
      <div class="relative group">
        <button class="flex items-center gap-2 text-gray-400 hover:text-gold text-sm font-medium transition-colors px-3 py-2 border border-gray-700 hover:border-gold">
          <i class="fas fa-lock text-xs"></i> Portals <i class="fas fa-chevron-down text-xs opacity-60"></i>
        </button>
        <div class="absolute right-0 top-full w-56 bg-ig-dark border border-gray-700 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-2xl" style="margin-top:4px;">
          <a href="/portal/client" class="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-gold text-sm transition-colors"><i class="fas fa-user-tie w-4 text-gold"></i> Client Portal</a>
          <a href="/portal/employee" class="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-gold text-sm transition-colors"><i class="fas fa-users w-4 text-gold"></i> Employee Portal</a>
          <a href="/portal/board" class="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-gold text-sm transition-colors"><i class="fas fa-gavel w-4 text-gold"></i> Board & KMP Portal</a>
          <div class="border-t border-gray-700 my-1"></div>
          <a href="/admin" class="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-gold text-sm transition-colors"><i class="fas fa-shield-alt w-4 text-gold"></i> Super Admin</a>
        </div>
      </div>
      <a href="/contact" class="btn-gold text-xs">Submit Mandate</a>
    </div>
    
    <!-- MOBILE MENU BUTTON -->
    <button id="mobileMenuBtn" class="lg:hidden text-white p-2">
      <i class="fas fa-bars text-xl"></i>
    </button>
  </div>
  
  <!-- MOBILE MENU -->
  <div id="mobileMenu" class="hidden lg:hidden bg-ig-dark border-t border-gray-700">
    <div class="px-6 py-4 space-y-1">
      <a href="/" class="block py-3 text-gray-300 hover:text-gold border-b border-gray-800 text-sm">Home</a>
      <a href="/about" class="block py-3 text-gray-300 hover:text-gold border-b border-gray-800 text-sm">About</a>
      <a href="/services" class="block py-3 text-gray-300 hover:text-gold border-b border-gray-800 text-sm">Services</a>
      <a href="/horeca" class="block py-3 text-gray-300 hover:text-gold border-b border-gray-800 text-sm">HORECA Solutions</a>
      <a href="/listings" class="block py-3 text-gray-300 hover:text-gold border-b border-gray-800 text-sm">Mandates & Listings</a>
      <a href="/insights" class="block py-3 text-gray-300 hover:text-gold border-b border-gray-800 text-sm">Insights</a>
      <a href="/contact" class="block py-3 text-gray-300 hover:text-gold border-b border-gray-800 text-sm">Contact</a>
      <div class="pt-3 space-y-2">
        <a href="/portal/client" class="block py-2 text-gold text-sm"><i class="fas fa-lock mr-2"></i>Client Portal</a>
        <a href="/portal/employee" class="block py-2 text-gold text-sm"><i class="fas fa-lock mr-2"></i>Employee Portal</a>
        <a href="/portal/board" class="block py-2 text-gold text-sm"><i class="fas fa-lock mr-2"></i>Board & KMP Portal</a>
        <a href="/admin" class="block py-2 text-gold text-sm"><i class="fas fa-shield-alt mr-2"></i>Super Admin</a>
      </div>
    </div>
  </div>
</nav>
<div style="height:80px;"></div>`
}

function footerHTML() {
  return `
<footer class="bg-ig-dark text-gray-400">
  <!-- TOP FOOTER -->
  <div class="border-t" style="border-color:rgba(197,160,40,.3);">
    <div class="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
      <!-- Brand -->
      <div class="lg:col-span-1">
        <div class="flex items-center gap-3 mb-5">
          <svg width="32" height="38" viewBox="0 0 38 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 8C18 8 15 10.5 14 14C13.2 16.8 14.5 19 17 20.5L14 26C16 27 18 27.5 19 27.5C22 27.5 25 26 26.5 23.5C28 21 27.5 18 25 16.5L27 12C25.5 9.5 24 8 22 8Z" fill="#C5A028" opacity="0.9"/>
          </svg>
          <div>
            <div class="font-serif text-white font-bold text-lg">INDIA GULLY</div>
            <div class="text-xs text-gold tracking-widest">Celebrating Desiness</div>
          </div>
        </div>
        <p class="text-sm leading-relaxed text-gray-500 mb-5">India's premier multi-vertical advisory firm. Strategy, transactions and enablement across Real Estate, Retail, Hospitality and Entertainment.</p>
        <div class="text-xs text-gray-600">
          <div class="mb-1">Vivacious Entertainment and Hospitality Pvt. Ltd.</div>
          <div class="mb-1">New Delhi, India</div>
          <div>CIN: U74900DL2017PTC000000</div>
        </div>
      </div>
      
      <!-- Services -->
      <div>
        <h4 class="text-white text-sm font-semibold tracking-widest uppercase mb-5" style="letter-spacing:.12em;">Advisory Verticals</h4>
        <ul class="space-y-2">
          <li><a href="/services#real-estate" class="text-sm hover:text-gold transition-colors flex items-center gap-2"><i class="fas fa-chevron-right text-xs text-gold"></i>Real Estate</a></li>
          <li><a href="/services#retail" class="text-sm hover:text-gold transition-colors flex items-center gap-2"><i class="fas fa-chevron-right text-xs text-gold"></i>Retail & Leasing</a></li>
          <li><a href="/services#hospitality" class="text-sm hover:text-gold transition-colors flex items-center gap-2"><i class="fas fa-chevron-right text-xs text-gold"></i>Hospitality</a></li>
          <li><a href="/services#entertainment" class="text-sm hover:text-gold transition-colors flex items-center gap-2"><i class="fas fa-chevron-right text-xs text-gold"></i>Entertainment</a></li>
          <li><a href="/services#debt" class="text-sm hover:text-gold transition-colors flex items-center gap-2"><i class="fas fa-chevron-right text-xs text-gold"></i>Debt & Special Situations</a></li>
          <li><a href="/horeca" class="text-sm hover:text-gold transition-colors flex items-center gap-2"><i class="fas fa-chevron-right text-xs text-gold"></i>HORECA Solutions</a></li>
        </ul>
      </div>
      
      <!-- Links -->
      <div>
        <h4 class="text-white text-sm font-semibold tracking-widest uppercase mb-5" style="letter-spacing:.12em;">Platform</h4>
        <ul class="space-y-2">
          <li><a href="/listings" class="text-sm hover:text-gold transition-colors flex items-center gap-2"><i class="fas fa-chevron-right text-xs text-gold"></i>Active Mandates</a></li>
          <li><a href="/insights" class="text-sm hover:text-gold transition-colors flex items-center gap-2"><i class="fas fa-chevron-right text-xs text-gold"></i>Insights & Research</a></li>
          <li><a href="/contact" class="text-sm hover:text-gold transition-colors flex items-center gap-2"><i class="fas fa-chevron-right text-xs text-gold"></i>Submit Mandate</a></li>
          <li><a href="/about" class="text-sm hover:text-gold transition-colors flex items-center gap-2"><i class="fas fa-chevron-right text-xs text-gold"></i>About Us</a></li>
          <li><a href="/portal/client" class="text-sm hover:text-gold transition-colors flex items-center gap-2"><i class="fas fa-lock text-xs text-gold"></i>Client Portal</a></li>
          <li><a href="/portal/employee" class="text-sm hover:text-gold transition-colors flex items-center gap-2"><i class="fas fa-lock text-xs text-gold"></i>Employee Portal</a></li>
          <li><a href="/portal/board" class="text-sm hover:text-gold transition-colors flex items-center gap-2"><i class="fas fa-lock text-xs text-gold"></i>Board & KMP Portal</a></li>
        </ul>
      </div>
      
      <!-- Contact -->
      <div>
        <h4 class="text-white text-sm font-semibold tracking-widest uppercase mb-5" style="letter-spacing:.12em;">Contact</h4>
        <ul class="space-y-3 text-sm">
          <li class="flex items-start gap-3">
            <i class="fas fa-map-marker-alt text-gold mt-0.5 w-4"></i>
            <span>New Delhi, India</span>
          </li>
          <li class="flex items-center gap-3">
            <i class="fas fa-phone text-gold w-4"></i>
            <a href="tel:+919810889134" class="hover:text-gold transition-colors">+91 98108 89134</a>
          </li>
          <li class="flex items-center gap-3">
            <i class="fas fa-envelope text-gold w-4"></i>
            <a href="mailto:info@indiagully.com" class="hover:text-gold transition-colors">info@indiagully.com</a>
          </li>
        </ul>
        
        <div class="mt-6">
          <h5 class="text-white text-xs font-semibold tracking-widest uppercase mb-3">Leadership</h5>
          <div class="space-y-1.5 text-xs">
            <div><span class="text-gray-500">MD:</span> <a href="mailto:akm@indiagully.com" class="hover:text-gold transition-colors">akm@indiagully.com</a></div>
            <div><span class="text-gray-500">ED:</span> <a href="mailto:pavan@indiagully.com" class="hover:text-gold transition-colors">pavan@indiagully.com</a></div>
            <div><span class="text-gray-500">Real Estate:</span> <a href="mailto:amit.jhingan@indiagully.com" class="hover:text-gold transition-colors">amit.jhingan@indiagully.com</a></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <!-- BOTTOM BAR -->
  <div class="border-t border-gray-800">
    <div class="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3">
      <div class="text-xs text-gray-600">
        © 2024 Vivacious Entertainment and Hospitality Pvt. Ltd. All rights reserved. | India Gully™ is a registered brand.
      </div>
      <div class="flex items-center gap-5 text-xs">
        <a href="/legal/privacy" class="hover:text-gold transition-colors">Privacy Policy</a>
        <a href="/legal/terms" class="hover:text-gold transition-colors">Terms of Use</a>
        <a href="/legal/disclaimer" class="hover:text-gold transition-colors">Disclaimer</a>
        <span class="text-gray-700">|</span>
        <span class="text-gray-600">GSTIN: 07XXXXXX000XXX</span>
      </div>
    </div>
  </div>
</footer>`
}
