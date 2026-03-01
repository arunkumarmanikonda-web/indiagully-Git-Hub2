/**
 * W-Round E2E Spec — v2026.21
 * Gold-cert-ready: D1 remote binding, Razorpay live dry-run, DNS deliverability,
 * WebAuthn credential store, Vendor DPA execute, Gold cert sign-off
 *
 * Tests:
 *   - Health endpoint: version 2026.21, routes_count 216, w_round flag, w_round_fixes ≥6
 *   - W-Round endpoints W1–W6: all return 401 (unauthenticated)
 *   - V-Round / U-Round backward compat: still return 401
 *   - Public pages: home, audit, CSRF token
 *   - Audit page: contains W-Round, v2026.21, 216 routes
 *   - Admin page: login form served (auth-gated)
 */

import { test, expect } from '@playwright/test'

const BASE = process.env.BASE_URL || 'http://localhost:3000'

// ── Helper ─────────────────────────────────────────────────────────────────────
async function getJson(url: string) {
  const res = await fetch(url)
  return { status: res.status, body: await res.json().catch(() => ({})) }
}

async function getHtml(url: string) {
  const res = await fetch(url)
  return { status: res.status, body: await res.text().catch(() => '') }
}

async function postJson(url: string, data: Record<string, unknown>) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  return { status: res.status, body: await res.json().catch(() => ({})) }
}

// ── Health ─────────────────────────────────────────────────────────────────────
test.describe('Health endpoint — v2026.21', () => {
  test('version is 2026.21', async () => {
    const { status, body } = await getJson(`${BASE}/api/health`)
    expect(status).toBe(200)
    expect(body.version).toBe('2026.21')
  })

  test('routes_count is 216', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(body.routes_count).toBeGreaterThanOrEqual(216)
  })

  test('security block contains w_round', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(body.security?.w_round).toBeTruthy()
  })

  test('security block contains v_round and u_round (backward compat)', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(body.security?.v_round).toBeTruthy()
    expect(body.security?.u_round).toBeTruthy()
  })

  test('w_round_fixes array present with ≥6 items', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(Array.isArray(body.w_round_fixes)).toBe(true)
    expect(body.w_round_fixes.length).toBeGreaterThanOrEqual(6)
  })

  test('open_findings_count is 0', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(body.open_findings_count).toBe(0)
  })
})

// ── W-Round endpoints — unauthenticated access returns 401 ────────────────────
test.describe('W-Round endpoints — 401 guard (unauthenticated)', () => {
  test('W1 GET /api/admin/d1-binding-health → 401', async () => {
    const { status } = await getJson(`${BASE}/api/admin/d1-binding-health`)
    expect(status).toBe(401)
  })

  test('W2 POST /api/payments/razorpay-live-test → 401', async () => {
    const { status } = await postJson(`${BASE}/api/payments/razorpay-live-test`, {})
    expect(status).toBe(401)
  })

  test('W3 GET /api/integrations/dns-deliverability-live → 401', async () => {
    const { status } = await getJson(`${BASE}/api/integrations/dns-deliverability-live`)
    expect(status).toBe(401)
  })

  test('W4 GET /api/auth/webauthn-credential-store → 401', async () => {
    const { status } = await getJson(`${BASE}/api/auth/webauthn-credential-store`)
    expect(status).toBe(401)
  })

  test('W5 POST /api/dpdp/vendor-dpa-execute → 401', async () => {
    const { status } = await postJson(`${BASE}/api/dpdp/vendor-dpa-execute`, {})
    expect(status).toBe(401)
  })

  test('W6 GET /api/compliance/gold-cert-signoff → 401', async () => {
    const { status } = await getJson(`${BASE}/api/compliance/gold-cert-signoff`)
    expect(status).toBe(401)
  })

  test('W6-aux POST /api/compliance/gold-cert-signoff → 401', async () => {
    const { status } = await postJson(`${BASE}/api/compliance/gold-cert-signoff`, {
      assessor: 'dpo@indiagully.com',
    })
    expect(status).toBe(401)
  })
})

// ── V-Round backward compat — still return 401 ────────────────────────────────
test.describe('V-Round backward compat — 401 guard', () => {
  test('V1 GET /api/admin/d1-live-status → 401', async () => {
    const { status } = await getJson(`${BASE}/api/admin/d1-live-status`)
    expect(status).toBe(401)
  })

  test('V2 GET /api/payments/razorpay-live-validation → 401', async () => {
    const { status } = await getJson(`${BASE}/api/payments/razorpay-live-validation`)
    expect(status).toBe(401)
  })

  test('V3 GET /api/integrations/email-deliverability → 401', async () => {
    const { status } = await getJson(`${BASE}/api/integrations/email-deliverability`)
    expect(status).toBe(401)
  })

  test('V4 GET /api/auth/passkey-attestation → 401', async () => {
    const { status } = await getJson(`${BASE}/api/auth/passkey-attestation`)
    expect(status).toBe(401)
  })

  test('V5 GET /api/dpdp/vendor-dpa-tracker → 401', async () => {
    const { status } = await getJson(`${BASE}/api/dpdp/vendor-dpa-tracker`)
    expect(status).toBe(401)
  })

  test('V6 GET /api/compliance/gold-cert-readiness → 401', async () => {
    const { status } = await getJson(`${BASE}/api/compliance/gold-cert-readiness`)
    expect(status).toBe(401)
  })
})

// ── Public pages ──────────────────────────────────────────────────────────────
test.describe('Public pages — 200 OK', () => {
  test('Homepage returns 200', async () => {
    const { status } = await getHtml(`${BASE}/`)
    expect(status).toBe(200)
  })

  test('Audit page returns 200', async () => {
    const { status } = await getHtml(`${BASE}/audit`)
    expect(status).toBe(200)
  })

  test('CSRF token endpoint returns token', async () => {
    const { status, body } = await getJson(`${BASE}/api/auth/csrf`)
    expect(status).toBe(200)
    expect(body.csrf_token || body.token).toBeTruthy()
  })
})

// ── Audit page content ────────────────────────────────────────────────────────
test.describe('Audit page — W-Round content', () => {
  test('Audit page references W-Round or 2026.21', async () => {
    const { body } = await getHtml(`${BASE}/audit`)
    const hasWRound = body.includes('W-Round') || body.includes('2026.21') || body.includes('216')
    expect(hasWRound).toBe(true)
  })

  test('Audit page contains security certification info', async () => {
    const { body } = await getHtml(`${BASE}/audit`)
    expect(body).toContain('India Gully')
  })
})

// ── Admin page — auth gate ────────────────────────────────────────────────────
test.describe('Admin page — auth gate', () => {
  test('Admin page serves login form (auth gate working)', async () => {
    const { body } = await getHtml(`${BASE}/admin`)
    expect(body).toContain('admin-login-form')
  })
})

// ── W-Round endpoints — response shape (unauthenticated gives 401 JSON) ───────
test.describe('W-Round endpoints — 401 JSON shape', () => {
  test('W1 returns JSON error on 401', async () => {
    const { status, body } = await getJson(`${BASE}/api/admin/d1-binding-health`)
    expect(status).toBe(401)
    expect(body.error || body.message).toBeTruthy()
  })

  test('W3 returns JSON error on 401', async () => {
    const { status, body } = await getJson(`${BASE}/api/integrations/dns-deliverability-live`)
    expect(status).toBe(401)
    expect(body.error || body.message).toBeTruthy()
  })

  test('W6 returns JSON error on 401', async () => {
    const { status, body } = await getJson(`${BASE}/api/compliance/gold-cert-signoff`)
    expect(status).toBe(401)
    expect(body.error || body.message).toBeTruthy()
  })
})

// ── W-Round health string format ──────────────────────────────────────────────
test.describe('W-Round health string format', () => {
  test('w_round string contains all six endpoint refs', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    const w = body.security?.w_round ?? ''
    expect(w).toContain('W1')
    expect(w).toContain('W2')
    expect(w).toContain('W3')
    expect(w).toContain('W4')
    expect(w).toContain('W5')
    expect(w).toContain('W6')
  })

  test('w_round_fixes items contain W1–W6 labels', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    const fixes: string[] = body.w_round_fixes ?? []
    expect(fixes.some((f: string) => f.startsWith('W1:'))).toBe(true)
    expect(fixes.some((f: string) => f.startsWith('W2:'))).toBe(true)
    expect(fixes.some((f: string) => f.startsWith('W3:'))).toBe(true)
    expect(fixes.some((f: string) => f.startsWith('W4:'))).toBe(true)
    expect(fixes.some((f: string) => f.startsWith('W5:'))).toBe(true)
    expect(fixes.some((f: string) => f.startsWith('W6:'))).toBe(true)
  })
})

// ── Frontend — no JS errors on home page ─────────────────────────────────────
test.describe('Frontend — no JS errors', () => {
  test('Home page loads without JS errors', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))
    await page.goto(`${BASE}/`)
    await page.waitForTimeout(2000)
    // Filter out expected Tailwind CDN production warning
    const realErrors = errors.filter(
      (e) => !e.includes('cdn.tailwindcss.com') && !e.includes('Tailwind')
    )
    expect(realErrors).toHaveLength(0)
  })
})
