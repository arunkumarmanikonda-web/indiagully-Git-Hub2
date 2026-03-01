-- ============================================================================
-- India Gully Enterprise Platform — K-Round Migration
-- Migration: 0004_k_round_r2_dpdp_v2.sql
-- Created:   2026-03-01
-- Purpose:   R2 document metadata store (K3), DPDP consent v2 (K5),
--            secrets audit trail, DPO dashboard tables
-- ============================================================================

-- ── R2 Document Metadata ──────────────────────────────────────────────────────
-- Tracks files stored in the india-gully-docs R2 bucket
CREATE TABLE IF NOT EXISTS ig_documents (
  id              INTEGER  PRIMARY KEY AUTOINCREMENT,
  r2_key          TEXT     UNIQUE NOT NULL,            -- R2 object key
  file_name       TEXT     NOT NULL,
  file_size       INTEGER  NOT NULL DEFAULT 0,         -- bytes
  mime_type       TEXT     NOT NULL DEFAULT 'application/octet-stream',
  category        TEXT     NOT NULL DEFAULT 'general', -- board_pack|contract|employee|general
  entity_type     TEXT,                                -- user|mandate|client
  entity_id       TEXT,                                -- linked entity ID
  uploaded_by     TEXT     NOT NULL DEFAULT 'system',
  description     TEXT,
  is_nda_gated    INTEGER  NOT NULL DEFAULT 0,         -- 1 = requires signed NDA
  expires_at      DATETIME,                            -- null = no expiry
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_docs_category     ON ig_documents(category);
CREATE INDEX IF NOT EXISTS idx_docs_entity        ON ig_documents(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_docs_uploaded_by  ON ig_documents(uploaded_by);

-- ── R2 Document Access Log ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ig_document_access_log (
  id           INTEGER  PRIMARY KEY AUTOINCREMENT,
  doc_id       INTEGER  NOT NULL REFERENCES ig_documents(id) ON DELETE CASCADE,
  accessed_by  TEXT     NOT NULL,
  access_type  TEXT     NOT NULL DEFAULT 'view',       -- view|download|share
  ip_hash      TEXT,                                   -- SHA-256 of client IP (privacy-safe)
  user_agent   TEXT,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_doc_access_doc    ON ig_document_access_log(doc_id);
CREATE INDEX IF NOT EXISTS idx_doc_access_user   ON ig_document_access_log(accessed_by);

-- ── DPDP Consent v2 ───────────────────────────────────────────────────────────
-- Granular per-purpose consent tracking (DPDP Act 2023 §6)
CREATE TABLE IF NOT EXISTS ig_dpdp_consents (
  id               INTEGER  PRIMARY KEY AUTOINCREMENT,
  user_id          TEXT     NOT NULL,                  -- email or user identifier
  session_id       TEXT,                               -- optional session at consent time
  consent_version  TEXT     NOT NULL DEFAULT '2026-03-01',
  -- Granular consent flags (1=given, 0=withdrawn, null=not asked)
  consent_essential   INTEGER NOT NULL DEFAULT 1,      -- always required
  consent_analytics   INTEGER NOT NULL DEFAULT 0,
  consent_marketing   INTEGER NOT NULL DEFAULT 0,
  consent_third_party INTEGER NOT NULL DEFAULT 0,
  -- Consent metadata
  consent_method   TEXT     NOT NULL DEFAULT 'banner', -- banner|api|implicit
  ip_hash          TEXT,                               -- SHA-256 of IP
  user_agent       TEXT,
  legal_basis      TEXT     NOT NULL DEFAULT 'explicit_consent', -- DPDP §6
  is_minor         INTEGER  NOT NULL DEFAULT 0,        -- DPDP §9 — child consent
  guardian_id      TEXT,                               -- if is_minor=1
  -- Timestamps
  given_at         DATETIME DEFAULT CURRENT_TIMESTAMP,
  expires_at       DATETIME,                           -- null = indefinite
  withdrawn_at     DATETIME,
  last_updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_dpdp_consents_user     ON ig_dpdp_consents(user_id);
CREATE INDEX IF NOT EXISTS idx_dpdp_consents_version  ON ig_dpdp_consents(consent_version);
CREATE INDEX IF NOT EXISTS idx_dpdp_consents_withdrawn ON ig_dpdp_consents(withdrawn_at);

-- ── DPDP Consent Withdrawal Log ───────────────────────────────────────────────
-- Immutable record of every consent withdrawal (DPDP §6(7) — right to withdraw)
CREATE TABLE IF NOT EXISTS ig_dpdp_withdrawals (
  id               INTEGER  PRIMARY KEY AUTOINCREMENT,
  withdrawal_ref   TEXT     UNIQUE NOT NULL,           -- WD-XXXXXXXX
  user_id          TEXT     NOT NULL,
  consent_id       INTEGER  REFERENCES ig_dpdp_consents(id),
  purposes_withdrawn TEXT   NOT NULL,                  -- JSON array
  reason           TEXT,                               -- optional user reason
  channel          TEXT     NOT NULL DEFAULT 'api',    -- api|email|support
  processed_by     TEXT     NOT NULL DEFAULT 'system',
  notified_dpo     INTEGER  NOT NULL DEFAULT 0,        -- 1 = DPO notified
  dpo_notified_at  DATETIME,
  legal_effect     TEXT     NOT NULL DEFAULT 'immediate',
  created_at       DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_withdrawals_user   ON ig_dpdp_withdrawals(user_id);
CREATE INDEX IF NOT EXISTS idx_withdrawals_ref    ON ig_dpdp_withdrawals(withdrawal_ref);

-- ── DPDP Rights Requests ──────────────────────────────────────────────────────
-- Tracks data subject rights requests (access, correct, erase, nominate, grievance)
CREATE TABLE IF NOT EXISTS ig_dpdp_rights_requests (
  id              INTEGER  PRIMARY KEY AUTOINCREMENT,
  request_ref     TEXT     UNIQUE NOT NULL,            -- RR-XXXXXXXX
  user_id         TEXT     NOT NULL,
  request_type    TEXT     NOT NULL,                   -- access|correct|erase|nominate|grievance
  description     TEXT,
  status          TEXT     NOT NULL DEFAULT 'pending', -- pending|in_review|fulfilled|rejected
  assigned_to     TEXT     NOT NULL DEFAULT 'dpo@indiagully.com',
  priority        TEXT     NOT NULL DEFAULT 'normal',  -- urgent|normal|low
  sla_days        INTEGER  NOT NULL DEFAULT 30,        -- DPDP §12 — 30 day SLA
  due_date        DATETIME,
  fulfilled_at    DATETIME,
  rejection_reason TEXT,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_rights_user    ON ig_dpdp_rights_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_rights_type    ON ig_dpdp_rights_requests(request_type);
CREATE INDEX IF NOT EXISTS idx_rights_status  ON ig_dpdp_rights_requests(status);
CREATE INDEX IF NOT EXISTS idx_rights_due     ON ig_dpdp_rights_requests(due_date);

-- ── DPO Dashboard Alerts ──────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ig_dpo_alerts (
  id           INTEGER  PRIMARY KEY AUTOINCREMENT,
  alert_type   TEXT     NOT NULL,                      -- sla_breach|withdrawal|new_request|breach
  severity     TEXT     NOT NULL DEFAULT 'info',       -- critical|warning|info
  title        TEXT     NOT NULL,
  body         TEXT     NOT NULL,
  entity_ref   TEXT,                                   -- related RR- or WD- ref
  is_read      INTEGER  NOT NULL DEFAULT 0,
  read_by      TEXT,
  read_at      DATETIME,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_dpo_alerts_unread  ON ig_dpo_alerts(is_read);
CREATE INDEX IF NOT EXISTS idx_dpo_alerts_type    ON ig_dpo_alerts(alert_type);

-- ── Secrets Audit Trail ───────────────────────────────────────────────────────
-- Tracks when secrets/env vars are rotated (K2 compliance)
CREATE TABLE IF NOT EXISTS ig_secrets_audit (
  id           INTEGER  PRIMARY KEY AUTOINCREMENT,
  secret_name  TEXT     NOT NULL,
  action       TEXT     NOT NULL DEFAULT 'rotate',     -- set|rotate|revoke
  performed_by TEXT     NOT NULL DEFAULT 'system',
  reason       TEXT,
  created_at   DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ── Seed: Initial DPDP alert for DPO ─────────────────────────────────────────
INSERT OR IGNORE INTO ig_dpo_alerts (alert_type, severity, title, body) VALUES
  ('new_request', 'info', 'K-Round: DPDP v2 Active',
   'Granular consent withdrawal and DPO dashboard are now active as of 2026-03-01. All consent records are being tracked in D1 with full audit trail per DPDP Act 2023.');
