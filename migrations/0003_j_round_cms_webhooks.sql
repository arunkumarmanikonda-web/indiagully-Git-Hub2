-- ============================================================================
-- India Gully Enterprise Platform — J-Round Migration
-- Migration: 0003_j_round_cms_webhooks.sql
-- Created:   2026-03-01
-- Purpose:   CMS pages D1 storage (J1), Razorpay webhook log (J2),
--            WebAuthn counter updates support, insights cache table
-- ============================================================================

-- ── CMS Pages ────────────────────────────────────────────────────────────────
-- Stores all CMS-managed pages with version history tracking
CREATE TABLE IF NOT EXISTS ig_cms_pages (
  id              INTEGER  PRIMARY KEY AUTOINCREMENT,
  slug            TEXT     UNIQUE NOT NULL,           -- URL slug e.g. '/', '/about'
  title           TEXT     NOT NULL,
  meta_title      TEXT,                               -- SEO title
  meta_desc       TEXT,                               -- SEO description
  og_image        TEXT,                               -- Open Graph image URL
  hero_headline   TEXT,
  hero_subheading TEXT,
  body_html       TEXT,                               -- Rich HTML body
  status          TEXT     NOT NULL DEFAULT 'draft',  -- draft|pending|published|archived
  version         INTEGER  NOT NULL DEFAULT 1,
  author          TEXT     NOT NULL DEFAULT 'system',
  approved_by     TEXT,
  approved_at     DATETIME,
  published_at    DATETIME,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_cms_pages_slug   ON ig_cms_pages(slug);
CREATE INDEX IF NOT EXISTS idx_cms_pages_status ON ig_cms_pages(status);

-- ── CMS Page Versions (audit history) ────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ig_cms_page_versions (
  id          INTEGER  PRIMARY KEY AUTOINCREMENT,
  page_id     INTEGER  NOT NULL REFERENCES ig_cms_pages(id) ON DELETE CASCADE,
  version     INTEGER  NOT NULL,
  title       TEXT     NOT NULL,
  body_html   TEXT,
  status      TEXT     NOT NULL,
  changed_by  TEXT     NOT NULL,
  change_note TEXT,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_cms_versions_page ON ig_cms_page_versions(page_id);

-- ── CMS Approval Queue ────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ig_cms_approvals (
  id            INTEGER  PRIMARY KEY AUTOINCREMENT,
  page_id       INTEGER  NOT NULL REFERENCES ig_cms_pages(id) ON DELETE CASCADE,
  approval_ref  TEXT     UNIQUE NOT NULL,             -- APR-XXXXXX
  change_note   TEXT     NOT NULL,
  submitted_by  TEXT     NOT NULL,
  status        TEXT     NOT NULL DEFAULT 'pending',  -- pending|approved|rejected
  reviewed_by   TEXT,
  reviewed_at   DATETIME,
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_cms_approvals_page   ON ig_cms_approvals(page_id);
CREATE INDEX IF NOT EXISTS idx_cms_approvals_status ON ig_cms_approvals(status);

-- ── Razorpay Webhook Log (J2) ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ig_razorpay_webhooks (
  id              INTEGER  PRIMARY KEY AUTOINCREMENT,
  event           TEXT     NOT NULL,                  -- payment.captured, payment.failed, etc.
  payload_json    TEXT     NOT NULL,                  -- raw webhook body
  order_id        TEXT,
  payment_id      TEXT,
  signature_valid INTEGER  NOT NULL DEFAULT 0,        -- 1=verified, 0=unverified
  processed       INTEGER  NOT NULL DEFAULT 0,        -- 1=processed
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_webhooks_order   ON ig_razorpay_webhooks(order_id);
CREATE INDEX IF NOT EXISTS idx_webhooks_payment ON ig_razorpay_webhooks(payment_id);
CREATE INDEX IF NOT EXISTS idx_webhooks_event   ON ig_razorpay_webhooks(event);

-- ── Insights Articles Cache (J5) ─────────────────────────────────────────────
-- D1-backed article store for dynamic CMS-driven Insights section
CREATE TABLE IF NOT EXISTS ig_insights (
  id          INTEGER  PRIMARY KEY AUTOINCREMENT,
  slug        TEXT     UNIQUE NOT NULL,
  category    TEXT     NOT NULL,
  date_label  TEXT     NOT NULL,                      -- Human display: 'March 2026'
  title       TEXT     NOT NULL,
  excerpt     TEXT     NOT NULL,
  body_html   TEXT,                                   -- Full article body
  tags        TEXT     NOT NULL DEFAULT '[]',         -- JSON array
  read_time   TEXT     NOT NULL DEFAULT '5 min read',
  status      TEXT     NOT NULL DEFAULT 'published',  -- draft|published
  author      TEXT     NOT NULL DEFAULT 'India Gully Advisory',
  view_count  INTEGER  NOT NULL DEFAULT 0,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_insights_slug     ON ig_insights(slug);
CREATE INDEX IF NOT EXISTS idx_insights_category ON ig_insights(category);
CREATE INDEX IF NOT EXISTS idx_insights_status   ON ig_insights(status);

-- ── Seed CMS pages (initial published state) ──────────────────────────────────
INSERT OR IGNORE INTO ig_cms_pages (slug, title, meta_title, meta_desc, status, author, published_at) VALUES
  ('/',         'Home Page',     'India Gully — Celebrating Desiness',                  'India Gully — Premier multi-vertical advisory across Real Estate, Retail, Hospitality & Entertainment. ₹10,000 Cr+ active mandates.', 'published', 'system', CURRENT_TIMESTAMP),
  ('/about',    'About Page',    'About India Gully — Advisory Firm New Delhi',          'India Gully: Multi-vertical advisory firm. Vision, leadership team, company timeline and governance.', 'published', 'system', CURRENT_TIMESTAMP),
  ('/services', 'Services Page', 'Advisory Services — Real Estate, Retail, Hospitality', 'India Gully advisory services across 5 verticals: Real Estate, Retail, Hospitality, Entertainment, Debt & Special Situations.', 'published', 'system', CURRENT_TIMESTAMP),
  ('/horeca',   'HORECA Page',   'HORECA Solutions — India Gully',                       'HORECA procurement and supply solutions for hotels, restaurants and catering across India.', 'published', 'system', CURRENT_TIMESTAMP),
  ('/listings', 'Listings Page', 'Active Mandates — India Gully',                        'India Gully active mandates: ₹8,815 Cr pipeline across Real Estate, Hospitality and Retail sectors.', 'published', 'system', CURRENT_TIMESTAMP),
  ('/contact',  'Contact Page',  'Contact India Gully — Advisory Enquiries',             'Submit mandate enquiry, advisory brief or partnership proposal to India Gully.', 'draft', 'system', NULL);

-- ── Seed Insights articles ────────────────────────────────────────────────────
INSERT OR IGNORE INTO ig_insights (slug, category, date_label, title, excerpt, tags, read_time, status, author) VALUES
  ('india-realty-2026-outlook', 'Real Estate', 'February 2026',
   'India Real Estate 2026: Commercial & Hospitality Convergence',
   'As hybrid work reshapes demand for Grade-A office space, India''s commercial real estate is converging with hospitality-grade amenities. We examine the structural drivers, market dynamics across 8 key cities, and the investment thesis for developers navigating this new paradigm.',
   '["Real Estate","Commercial","Hospitality","2026"]', '10 min read', 'published', 'Arun Manikonda'),

  ('entertainment-zone-regulatory-india', 'Entertainment', 'January 2026',
   'Navigating the Entertainment Zone Regulatory Landscape in India',
   'India''s entertainment real estate sector sits at the intersection of multiple regulatory frameworks — town planning, fire safety, excise and consumer protection laws. We map the regulatory landscape across key states and outline a compliance-first development strategy.',
   '["Entertainment","Regulatory","Real Estate","Compliance"]', '8 min read', 'published', 'India Gully Advisory'),

  ('horeca-tier2-supply-chain', 'HORECA', 'December 2025',
   'Building Resilient HORECA Supply Chains in Tier 2 India',
   'The rapid expansion of branded hospitality into Tier 2 and Tier 3 cities is exposing critical gaps in HORECA supply chains. We analyse the challenges, from vendor fragmentation to cold-chain infrastructure, and present a framework for building resilient, scalable procurement operations.',
   '["HORECA","Supply Chain","Tier 2","Operations"]', '7 min read', 'published', 'India Gully Advisory'),

  ('ibc-distressed-hospitality-2025', 'Debt & Special Situations', 'November 2025',
   'IBC 2025 Update: Hospitality Asset Resolution Trends',
   'The 2025 IBC amendment and NCLT capacity expansion have accelerated resolution timelines for distressed hospitality assets. We track 18 months of case data, identify emerging buyer profiles, and map the post-resolution value-creation playbook for strategic acquirers.',
   '["IBC","NCLT","Distressed Assets","Hospitality","Debt"]', '12 min read', 'published', 'India Gully Advisory'),

  ('mall-mixed-use-integration', 'Retail', 'October 2025',
   'The Mall-Hotel-Office Trinity: Mixed-Use Integration in Indian Retail Real Estate',
   'India''s leading mall developers are pivoting from pure retail to mixed-use destinations. We study five live projects across NCR, Mumbai and Bengaluru — examining the lease structure innovations, anchor tenant strategies, and financial models that make mixed-use work.',
   '["Retail","Mixed-Use","Real Estate","Mall","Office"]', '9 min read', 'published', 'India Gully Advisory'),

  ('greenfield-midscale-hotels', 'Hospitality', 'September 2025',
   'The Greenfield Mid-Scale Hotel Opportunity: Project Economics for 2025–27',
   'Mid-scale branded hotel development in India offers one of the most compelling risk-adjusted returns in the real estate spectrum. We model the economics for 80-key and 120-key projects across 12 Tier 2 cities, covering land costs, construction timelines, brand fee structures and stabilised RevPAR projections.',
   '["Hospitality","Greenfield","Hotel","Investment","Tier 2"]', '11 min read', 'published', 'Arun Manikonda');
