-- ============================================================================
-- India Gully Enterprise Platform — I-Round Migration
-- Migration: 0002_i_round_users_totp_otp.sql
-- Created:   2026-03-01
-- Purpose:   Migrate USER_STORE to D1, add TOTP enrolment, OTP delivery log,
--            WebAuthn credentials, rate-limit persistence, CSP nonce cache
-- ============================================================================

-- ── TOTP Device Enrolment ─────────────────────────────────────────────────────
-- Stores per-user TOTP devices (one user can have multiple devices)
CREATE TABLE IF NOT EXISTS ig_totp_devices (
  id              INTEGER  PRIMARY KEY AUTOINCREMENT,
  user_id         INTEGER  NOT NULL REFERENCES ig_users(id) ON DELETE CASCADE,
  device_name     TEXT     NOT NULL DEFAULT 'Authenticator App',
  secret_enc      TEXT     NOT NULL,  -- Base32 secret, AES-256-GCM encrypted at rest
  algorithm       TEXT     NOT NULL DEFAULT 'SHA1',   -- SHA1|SHA256|SHA512
  digits          INTEGER  NOT NULL DEFAULT 6,
  period          INTEGER  NOT NULL DEFAULT 30,       -- seconds
  confirmed       INTEGER  NOT NULL DEFAULT 0,        -- 1 after first successful verify
  last_used       DATETIME,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_totp_user ON ig_totp_devices(user_id);

-- ── WebAuthn / FIDO2 Credentials ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ig_webauthn_credentials (
  id                INTEGER  PRIMARY KEY AUTOINCREMENT,
  user_id           INTEGER  NOT NULL REFERENCES ig_users(id) ON DELETE CASCADE,
  credential_id     TEXT     UNIQUE NOT NULL,  -- base64url
  public_key        TEXT     NOT NULL,          -- COSE-encoded public key, base64url
  counter           INTEGER  NOT NULL DEFAULT 0,
  device_type       TEXT     NOT NULL DEFAULT 'platform',   -- platform|cross-platform
  device_name       TEXT     NOT NULL DEFAULT 'Security Key',
  transports        TEXT,                        -- JSON array: ["internal","usb","nfc","ble"]
  aaguid            TEXT,
  backed_up         INTEGER  NOT NULL DEFAULT 0,
  last_used         DATETIME,
  created_at        DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_webauthn_user ON ig_webauthn_credentials(user_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_webauthn_cred_id ON ig_webauthn_credentials(credential_id);

-- ── WebAuthn Registration Challenges (ephemeral, TTL 5 min) ───────────────────
CREATE TABLE IF NOT EXISTS ig_webauthn_challenges (
  id              INTEGER  PRIMARY KEY AUTOINCREMENT,
  user_id         INTEGER  NOT NULL REFERENCES ig_users(id) ON DELETE CASCADE,
  challenge       TEXT     NOT NULL,  -- base64url random bytes
  type            TEXT     NOT NULL DEFAULT 'registration', -- registration|authentication
  expires_at      DATETIME NOT NULL,
  used            INTEGER  NOT NULL DEFAULT 0,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_webauthn_ch_user ON ig_webauthn_challenges(user_id);

-- ── OTP Delivery Log (email + SMS) ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ig_otp_log (
  id              INTEGER  PRIMARY KEY AUTOINCREMENT,
  identifier      TEXT     NOT NULL,  -- email or phone
  channel         TEXT     NOT NULL DEFAULT 'email',  -- email|sms
  purpose         TEXT     NOT NULL DEFAULT 'password_reset', -- password_reset|login_otp|verify_email
  otp_hash        TEXT     NOT NULL,  -- PBKDF2 of OTP (never store plaintext)
  otp_salt        TEXT     NOT NULL,
  attempts        INTEGER  NOT NULL DEFAULT 0,
  max_attempts    INTEGER  NOT NULL DEFAULT 3,
  delivered       INTEGER  NOT NULL DEFAULT 0,  -- 1 = delivery confirmed
  delivery_id     TEXT,               -- SendGrid message_id or Twilio SID
  expires_at      DATETIME NOT NULL,
  used_at         DATETIME,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_otp_identifier ON ig_otp_log(identifier, purpose);
CREATE INDEX IF NOT EXISTS idx_otp_expires ON ig_otp_log(expires_at);

-- ── Rate Limit Persistence (D1 fallback when KV unavailable) ─────────────────
CREATE TABLE IF NOT EXISTS ig_rate_limits (
  key             TEXT     PRIMARY KEY,  -- ip:portal or identifier:portal
  attempts        INTEGER  NOT NULL DEFAULT 0,
  locked_until    DATETIME,
  last_attempt    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ── User Preferences & Settings ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS ig_user_preferences (
  user_id         INTEGER  PRIMARY KEY REFERENCES ig_users(id) ON DELETE CASCADE,
  theme           TEXT     NOT NULL DEFAULT 'light',   -- light|dark|system
  language        TEXT     NOT NULL DEFAULT 'en',      -- en|hi
  timezone        TEXT     NOT NULL DEFAULT 'Asia/Kolkata',
  notifications   TEXT     NOT NULL DEFAULT '{"email":true,"sms":false,"push":false}',
  totp_enrolled   INTEGER  NOT NULL DEFAULT 0,
  webauthn_enrolled INTEGER NOT NULL DEFAULT 0,
  recovery_email  TEXT,               -- backup email for account recovery
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ── Seed: Migrate USER_STORE → ig_users ──────────────────────────────────────
-- Passwords are PBKDF2-SHA256 (100k iterations). TOTP secrets are Base32.
-- In production: totp_secret_enc column holds AES-256-GCM encrypted secret.
-- For local development: plain Base32 secret stored (acceptable for dev only).

-- Add totp_secret_enc column if not exists (production encrypted storage)
ALTER TABLE ig_users ADD COLUMN totp_secret_enc TEXT;
ALTER TABLE ig_users ADD COLUMN is_demo         INTEGER NOT NULL DEFAULT 0;
ALTER TABLE ig_users ADD COLUMN totp_demo_pin   TEXT    NOT NULL DEFAULT '';
ALTER TABLE ig_users ADD COLUMN mfa_required    INTEGER NOT NULL DEFAULT 1;

-- Super Admin
INSERT OR IGNORE INTO ig_users
  (identifier, password_hash, password_salt, totp_secret, totp_secret_enc,
   role, portal, dashboard_url, is_active, mfa_required, is_demo, totp_demo_pin)
VALUES
  ('superadmin@indiagully.com',
   '531e7f8d58df22dc04f4883380c7def8ea1f7a548938d62065d46cf1c011ec1c',
   'ig-salt-admin-v3-2026',
   'JBSWY3DPEHPK3PXP',
   NULL,                          -- prod: AES-GCM(JBSWY3DPEHPK3PXP, KMS_KEY)
   'Super Admin', 'admin', '/admin/dashboard',
   1, 1, 0, '');

-- Demo Client
INSERT OR IGNORE INTO ig_users
  (identifier, password_hash, password_salt, totp_secret, totp_secret_enc,
   role, portal, dashboard_url, is_active, mfa_required, is_demo, totp_demo_pin)
VALUES
  ('demo@indiagully.com',
   '3a7f1c9e2b5d8f4a6c0e3b7d1f5a8c2e4b6d9f1c3a7e0b4d8f2a5c9e1b3d7f',
   'ig-salt-client-v3-2026',
   'JBSWY3DPEHPK3PXQ',
   NULL,
   'Client', 'client', '/portal/client/dashboard',
   1, 1, 1, '282945');

-- Demo Employee
INSERT OR IGNORE INTO ig_users
  (identifier, password_hash, password_salt, totp_secret, totp_secret_enc,
   role, portal, dashboard_url, is_active, mfa_required, is_demo, totp_demo_pin)
VALUES
  ('IG-EMP-0001',
   '7b3e9a1d5f2c8e4b0d6f3a9c1e7b5d2f8a4c6e0b3d9f1a5c7e2b4d8f0a3c6e',
   'ig-salt-emp-v3-2026',
   'JBSWY3DPEHPK3PXR',
   NULL,
   'Employee', 'employee', '/portal/employee/dashboard',
   1, 1, 1, '374816');

-- Demo Board/KMP
INSERT OR IGNORE INTO ig_users
  (identifier, password_hash, password_salt, totp_secret, totp_secret_enc,
   role, portal, dashboard_url, is_active, mfa_required, is_demo, totp_demo_pin)
VALUES
  ('IG-KMP-0001',
   '1d8f4c2a7e5b3f9c6a1d4b8e2f5c9a3d7b1f4e8c2a6d9f3b1e5c8a2d7f4b9e',
   'ig-salt-board-v3-2026',
   'JBSWY3DPEHPK3PXS',
   NULL,
   'Board', 'board', '/portal/board/dashboard',
   1, 1, 1, '591203');

-- QA Automation (no TOTP, demo mode only)
INSERT OR IGNORE INTO ig_users
  (identifier, password_hash, password_salt, totp_secret, totp_secret_enc,
   role, portal, dashboard_url, is_active, mfa_required, is_demo, totp_demo_pin)
VALUES
  ('qa@indiagully.com',
   'b4e8f2a6c0d4f8b2e6a0c4d8f2a6b0e4c8d2f6a0b4e8c2d6f0a4b8e2c6d0f4',
   'ig-salt-qa-v3-2026',
   'JBSWY3DPEHPK3PXT',
   NULL,
   'Client', 'client', '/portal/client/dashboard',
   1, 0, 1, '000000');

-- ── Seed: Default user preferences ───────────────────────────────────────────
INSERT OR IGNORE INTO ig_user_preferences (user_id)
SELECT id FROM ig_users;

-- ── Seed: TOTP device records for all users ───────────────────────────────────
INSERT OR IGNORE INTO ig_totp_devices (user_id, device_name, secret_enc, confirmed)
SELECT id, 'Authenticator App (Provisioned)', totp_secret, 1
FROM ig_users WHERE totp_secret IS NOT NULL AND totp_secret != '';
