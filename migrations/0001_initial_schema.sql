-- ============================================================================
-- India Gully Enterprise Platform — Initial D1 Schema
-- Migration: 0001_initial_schema.sql
-- Created:   2026-02-28
-- ============================================================================

-- ── Users & Auth ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ig_users (
  id            INTEGER  PRIMARY KEY AUTOINCREMENT,
  identifier    TEXT     UNIQUE NOT NULL,          -- email or employee ID
  password_hash TEXT     NOT NULL,                  -- PBKDF2(SHA-256) hex
  password_salt TEXT     NOT NULL,                  -- per-user random salt
  totp_secret   TEXT,                               -- encrypted Base32 secret
  totp_enabled  INTEGER  NOT NULL DEFAULT 1,        -- 0=off, 1=on
  role          TEXT     NOT NULL DEFAULT 'Client', -- Super Admin|Client|Employee|Board
  portal        TEXT     NOT NULL DEFAULT 'client', -- admin|client|employee|board
  dashboard_url TEXT     NOT NULL DEFAULT '/portal/client/dashboard',
  is_active     INTEGER  NOT NULL DEFAULT 1,
  last_login    DATETIME,
  failed_attempts INTEGER NOT NULL DEFAULT 0,
  locked_until  DATETIME,
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_users_identifier ON ig_users(identifier);
CREATE INDEX IF NOT EXISTS idx_users_portal ON ig_users(portal);

-- ── Sessions ─────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ig_sessions (
  session_id    TEXT     PRIMARY KEY,               -- 64-char hex token
  user_id       INTEGER  NOT NULL REFERENCES ig_users(id) ON DELETE CASCADE,
  portal        TEXT     NOT NULL,
  csrf_token    TEXT     NOT NULL,
  ip_address    TEXT,
  user_agent    TEXT,
  expires_at    DATETIME NOT NULL,
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_sessions_user ON ig_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_expires ON ig_sessions(expires_at);

-- ── Password Reset OTPs ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ig_password_resets (
  id            INTEGER  PRIMARY KEY AUTOINCREMENT,
  email         TEXT     NOT NULL,
  otp_hash      TEXT     NOT NULL,                  -- PBKDF2 hash of OTP
  portal        TEXT     NOT NULL DEFAULT 'client',
  expires_at    DATETIME NOT NULL,
  used          INTEGER  NOT NULL DEFAULT 0,
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_resets_email ON ig_password_resets(email);

-- ── Audit Log ────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ig_audit_log (
  id            INTEGER  PRIMARY KEY AUTOINCREMENT,
  event_type    TEXT     NOT NULL,  -- AUTH_LOGIN|AUTH_FAIL|DATA_ACCESS|ADMIN_ACTION|etc.
  user_id       INTEGER  REFERENCES ig_users(id),
  user_email    TEXT,
  portal        TEXT,
  ip_address    TEXT,
  user_agent    TEXT,
  resource      TEXT,               -- URL or resource identifier
  action        TEXT,               -- GET|POST|UPDATE|DELETE
  status        TEXT    NOT NULL DEFAULT 'SUCCESS', -- SUCCESS|FAILURE|BLOCKED
  details       TEXT,               -- JSON blob for extra context
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_audit_user ON ig_audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_event ON ig_audit_log(event_type);
CREATE INDEX IF NOT EXISTS idx_audit_created ON ig_audit_log(created_at);

-- ── DPDP Consent ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ig_dpdp_consents (
  id            INTEGER  PRIMARY KEY AUTOINCREMENT,
  user_id       TEXT     NOT NULL,                  -- data principal identifier
  purposes      TEXT     NOT NULL,                  -- JSON array of purposes
  consent_given INTEGER  NOT NULL DEFAULT 1,
  ip_address    TEXT,
  consent_version TEXT   NOT NULL DEFAULT '1.0',
  valid_until   DATETIME,
  withdrawn_at  DATETIME,
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_consent_user ON ig_dpdp_consents(user_id);

-- ── DPDP Rights Requests ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ig_dpdp_rights (
  id            INTEGER  PRIMARY KEY AUTOINCREMENT,
  ref           TEXT     UNIQUE NOT NULL,
  user_id       TEXT     NOT NULL,
  action        TEXT     NOT NULL,  -- access|correct|erase|nominate
  status        TEXT     NOT NULL DEFAULT 'Received',
  details       TEXT,
  ip_address    TEXT,
  deadline      DATETIME,
  resolved_at   DATETIME,
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ── Statutory Registers ───────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ig_statutory_registers (
  id            INTEGER  PRIMARY KEY AUTOINCREMENT,
  register_type TEXT     NOT NULL,  -- members|directors|charges|contracts|shares
  entry_date    DATE     NOT NULL,
  folio         TEXT,
  name          TEXT     NOT NULL,
  details       TEXT,               -- JSON blob for type-specific fields
  status        TEXT     NOT NULL DEFAULT 'Active',
  created_by    INTEGER  REFERENCES ig_users(id),
  approved_by   INTEGER  REFERENCES ig_users(id),
  approved_at   DATETIME,
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_registers_type ON ig_statutory_registers(register_type);
CREATE INDEX IF NOT EXISTS idx_registers_date ON ig_statutory_registers(entry_date);

-- ── Finance Invoices ──────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ig_invoices (
  id              INTEGER  PRIMARY KEY AUTOINCREMENT,
  invoice_number  TEXT     UNIQUE NOT NULL,
  client_name     TEXT     NOT NULL,
  client_gstin    TEXT,
  amount_gross    REAL     NOT NULL,
  gst_rate        REAL     NOT NULL DEFAULT 18,
  amount_gst      REAL     NOT NULL,
  amount_net      REAL     NOT NULL,
  irn             TEXT,              -- IRP-generated IRN
  status          TEXT     NOT NULL DEFAULT 'Draft', -- Draft|Sent|Paid|Overdue|Cancelled
  due_date        DATE,
  paid_date       DATE,
  created_by      INTEGER  REFERENCES ig_users(id),
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_invoices_status ON ig_invoices(status);
CREATE INDEX IF NOT EXISTS idx_invoices_due ON ig_invoices(due_date);

-- ── HR Employees ──────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ig_employees (
  id              INTEGER  PRIMARY KEY AUTOINCREMENT,
  employee_id     TEXT     UNIQUE NOT NULL,          -- IG-EMP-XXXX
  name            TEXT     NOT NULL,
  email           TEXT     UNIQUE NOT NULL,
  department      TEXT     NOT NULL,
  designation     TEXT     NOT NULL,
  joining_date    DATE     NOT NULL,
  ctc_annual      REAL,
  pf_uan          TEXT,              -- masked in API responses
  esic_number     TEXT,              -- masked in API responses
  pan             TEXT,              -- masked in API responses
  is_active       INTEGER  NOT NULL DEFAULT 1,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ── Governance Resolutions ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ig_resolutions (
  id              INTEGER  PRIMARY KEY AUTOINCREMENT,
  resolution_no   TEXT     UNIQUE NOT NULL,
  meeting_type    TEXT     NOT NULL,  -- Board|AGM|EGM|Committee
  meeting_date    DATE     NOT NULL,
  subject         TEXT     NOT NULL,
  resolution_text TEXT     NOT NULL,
  proposed_by     TEXT,
  seconded_by     TEXT,
  votes_for       INTEGER  NOT NULL DEFAULT 0,
  votes_against   INTEGER  NOT NULL DEFAULT 0,
  votes_abstain   INTEGER  NOT NULL DEFAULT 0,
  status          TEXT     NOT NULL DEFAULT 'Pending', -- Pending|Passed|Failed|Withdrawn
  roc_filing_ref  TEXT,              -- ROC reference after filing
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_resolutions_meeting ON ig_resolutions(meeting_type, meeting_date);
CREATE INDEX IF NOT EXISTS idx_resolutions_status ON ig_resolutions(status);

-- ── GST Filings ───────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ig_gst_filings (
  id              INTEGER  PRIMARY KEY AUTOINCREMENT,
  return_type     TEXT     NOT NULL,  -- GSTR-1|GSTR-3B|GSTR-9|GSTR-9C
  period          TEXT     NOT NULL,  -- YYYY-MM
  gstin           TEXT     NOT NULL,
  tax_liability   REAL     NOT NULL DEFAULT 0,
  status          TEXT     NOT NULL DEFAULT 'Draft', -- Draft|Filed|Late|Pending
  arn             TEXT,               -- Acknowledgement Reference Number
  filed_at        DATETIME,
  due_date        DATE,
  penalty         REAL     NOT NULL DEFAULT 0,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ── EPFO ECR Filings ─────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ig_epfo_filings (
  id              INTEGER  PRIMARY KEY AUTOINCREMENT,
  period          TEXT     NOT NULL,  -- YYYY-MM
  total_eps_wages REAL     NOT NULL DEFAULT 0,
  employee_pf     REAL     NOT NULL DEFAULT 0,
  employer_pf     REAL     NOT NULL DEFAULT 0,
  eps             REAL     NOT NULL DEFAULT 0,
  edli            REAL     NOT NULL DEFAULT 0,
  challan_no      TEXT,
  status          TEXT     NOT NULL DEFAULT 'Pending', -- Pending|Paid|Filed
  filed_at        DATETIME,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);
