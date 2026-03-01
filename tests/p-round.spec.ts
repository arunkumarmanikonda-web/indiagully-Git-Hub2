/**
 * India Gully Enterprise Platform v2026.14-P
 * P-Round Playwright E2E Specification
 *
 * Coverage:
 *   P1: GET /api/admin/d1-token-wizard       — D1:Edit token wizard (Super Admin)
 *   P2: POST /api/payments/live-order-test   — Live Razorpay order test (Super Admin)
 *   P3: GET /api/integrations/sendgrid/dns-validate — DNS CNAME/DKIM live lookup (Super Admin)
 *   P4: GET /api/auth/webauthn/passkey-guide — FIDO2 passkey registration guide (session)
 *   P5: GET /api/dpdp/dfr-finalise           — DFR 12/12 final checklist (Super Admin)
 *   P6: GET /api/compliance/audit-signoff    — Assessor sign-off form (Super Admin)
 */
import { test, expect } from '@playwright/test'

const BASE = process.env.BASE_URL || 'https://india-gully.pages.dev'

// ── Health Suite ─────────────────────────────────────────────────────────────
test.describe('P-Round Health Gates', () => {
  test('version is 2026.14', async ({ request }) => {
    const res  = await request.get(`${BASE}/api/health`)
    const body = await res.json()
    expect(body.version).toBe('2026.14')
  })
  test('routes_count >= 180', async ({ request }) => {
    const res  = await request.get(`${BASE}/api/health`)
    const body = await res.json()
    expect(body.routes_count).toBeGreaterThanOrEqual(180)
  })
  test('p_round security entry present', async ({ request }) => {
    const res  = await request.get(`${BASE}/api/health`)
    const body = await res.json()
    expect(body.security.p_round).toContain('100')
  })
  test('open_findings_count is 0', async ({ request }) => {
    const res  = await request.get(`${BASE}/api/health`)
    const body = await res.json()
    expect(body.open_findings_count).toBe(0)
  })
  test('p_round_fixes has 6 items', async ({ request }) => {
    const res  = await request.get(`${BASE}/api/health`)
    const body = await res.json()
    expect(Array.isArray(body.p_round_fixes)).toBe(true)
    expect(body.p_round_fixes.length).toBe(6)
  })
  test('p_round_fixes[0] mentions P1 d1-token-wizard', async ({ request }) => {
    const res  = await request.get(`${BASE}/api/health`)
    const body = await res.json()
    expect(body.p_round_fixes[0]).toContain('P1')
  })
})

// ── P1: D1 Token Wizard ──────────────────────────────────────────────────────
test.describe('P1: D1 Token Wizard', () => {
  test('GET /api/admin/d1-token-wizard returns 401 without session', async ({ request }) => {
    const res = await request.get(`${BASE}/api/admin/d1-token-wizard`)
    expect(res.status()).toBe(401)
  })
})

// ── P2: Live Order Test ──────────────────────────────────────────────────────
test.describe('P2: Live Order Test', () => {
  test('POST /api/payments/live-order-test returns 401 without session', async ({ request }) => {
    const res = await request.post(`${BASE}/api/payments/live-order-test`, { data: {} })
    expect(res.status()).toBe(401)
  })
})

// ── P3: DNS Validate ─────────────────────────────────────────────────────────
test.describe('P3: SendGrid DNS Validate', () => {
  test('GET /api/integrations/sendgrid/dns-validate returns 401', async ({ request }) => {
    const res = await request.get(`${BASE}/api/integrations/sendgrid/dns-validate`)
    expect(res.status()).toBe(401)
  })
})

// ── P4: Passkey Guide ────────────────────────────────────────────────────────
test.describe('P4: WebAuthn Passkey Guide', () => {
  test('GET /api/auth/webauthn/passkey-guide returns 401 without session', async ({ request }) => {
    const res = await request.get(`${BASE}/api/auth/webauthn/passkey-guide`)
    expect(res.status()).toBe(401)
  })
})

// ── P5: DFR Finalise ─────────────────────────────────────────────────────────
test.describe('P5: DPDP DFR Finalise', () => {
  test('GET /api/dpdp/dfr-finalise returns 401 without session', async ({ request }) => {
    const res = await request.get(`${BASE}/api/dpdp/dfr-finalise`)
    expect(res.status()).toBe(401)
  })
})

// ── P6: Audit Sign-Off ───────────────────────────────────────────────────────
test.describe('P6: Compliance Audit Sign-Off', () => {
  test('GET /api/compliance/audit-signoff returns 401 without session', async ({ request }) => {
    const res = await request.get(`${BASE}/api/compliance/audit-signoff`)
    expect(res.status()).toBe(401)
  })
})

// ── O-Round backward compatibility ───────────────────────────────────────────
test.describe('O-Round backward compatibility', () => {
  test('GET /api/admin/production-readiness returns 401', async ({ request }) => {
    const res = await request.get(`${BASE}/api/admin/production-readiness`)
    expect(res.status()).toBe(401)
  })
  test('POST /api/payments/validate-keys returns 401', async ({ request }) => {
    const res = await request.post(`${BASE}/api/payments/validate-keys`, { data: {} })
    expect(res.status()).toBe(401)
  })
  test('GET /api/compliance/audit-progress returns 401', async ({ request }) => {
    const res = await request.get(`${BASE}/api/compliance/audit-progress`)
    expect(res.status()).toBe(401)
  })
  test('GET /api/dpdp/processor-agreements returns 401', async ({ request }) => {
    const res = await request.get(`${BASE}/api/dpdp/processor-agreements`)
    expect(res.status()).toBe(401)
  })
})

// ── Audit Page P-Round Content ───────────────────────────────────────────────
test.describe('Audit Page P-Round Content', () => {
  test('audit page loads (200)', async ({ request }) => {
    const res = await request.get(`${BASE}/audit`)
    expect(res.status()).toBe(200)
  })
  test('audit shows P-Round', async ({ request }) => {
    const body = await (await request.get(`${BASE}/audit`)).text()
    expect(body).toContain('P-Round')
  })
  test('audit shows 2026.14', async ({ request }) => {
    const body = await (await request.get(`${BASE}/audit`)).text()
    expect(body).toContain('2026.14')
  })
  test('audit shows Q-Round roadmap', async ({ request }) => {
    const body = await (await request.get(`${BASE}/audit`)).text()
    expect(body).toContain('Q-Round')
  })
  test('audit shows 180 routes or endpoints', async ({ request }) => {
    const body = await (await request.get(`${BASE}/audit`)).text()
    expect(body).toMatch(/180/)
  })
})

// ── DPDP Public Endpoints ─────────────────────────────────────────────────────
test.describe('DPDP Public Endpoints', () => {
  test('consent withdraw returns WD- reference', async ({ request }) => {
    const res  = await request.post(`${BASE}/api/dpdp/consent/withdraw`, {
      data: { user_id: 'p-playwright@indiagully.com', purpose: 'analytics' },
    })
    const body = await res.json()
    expect(body.withdrawal_ref || '').toMatch(/^WD-/)
  })
  test('rights request returns RR- reference', async ({ request }) => {
    const res  = await request.post(`${BASE}/api/dpdp/rights/request`, {
      data: { user_id: 'p-playwright@indiagully.com', request_type: 'access', description: 'P-round' },
    })
    const body = await res.json()
    expect(body.request_ref || '').toMatch(/^RR-/)
  })
})
