/**
 * India Gully Enterprise Platform v2026.13-O
 * O-Round Playwright E2E Specification
 *
 * Coverage:
 *   O1: GET /api/admin/production-readiness — go-live wizard (Super Admin)
 *   O2: POST /api/payments/validate-keys   — Razorpay key format validator
 *   O3: GET /api/integrations/sendgrid/test-deliverability — deliverability probe
 *   O4: GET /api/auth/webauthn/challenge-log — challenge event log (Super Admin)
 *   O5: GET /api/dpdp/processor-agreements — DPA tracker (Super Admin)
 *   O6: GET /api/compliance/audit-progress — live audit progress tracker
 */
import { test, expect } from '@playwright/test'

const BASE = process.env.BASE_URL || 'https://india-gully.pages.dev'

// ── Health Suite ─────────────────────────────────────────────────────────────
test.describe('O-Round Health Gates', () => {
  test('version is 2026.13', async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`)
    const body = await res.json()
    expect(body.version).toBe('2026.13')
  })
  test('routes_count >= 175', async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`)
    const body = await res.json()
    expect(body.routes_count).toBeGreaterThanOrEqual(175)
  })
  test('o_round security score is 100', async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`)
    const body = await res.json()
    expect(body.security.o_round).toContain('100')
  })
  test('open_findings_count is 0', async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`)
    const body = await res.json()
    expect(body.open_findings_count).toBe(0)
  })
  test('o_round_fixes has 6 items', async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`)
    const body = await res.json()
    expect(Array.isArray(body.o_round_fixes)).toBe(true)
    expect(body.o_round_fixes.length).toBe(6)
  })
  test('o_round_fixes contains O1 production-readiness', async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`)
    const body = await res.json()
    expect(body.o_round_fixes.join('\n')).toContain('O1')
  })
})

// ── O1: Production Readiness Wizard ─────────────────────────────────────────
test.describe('O1: Production Readiness Wizard', () => {
  test('GET /api/admin/production-readiness returns 401 without session', async ({ request }) => {
    const res = await request.get(`${BASE}/api/admin/production-readiness`)
    expect(res.status()).toBe(401)
  })
})

// ── O2: Razorpay Key Validator ────────────────────────────────────────────────
test.describe('O2: Razorpay Key Validator', () => {
  test('POST /api/payments/validate-keys returns 401 without session', async ({ request }) => {
    const res = await request.post(`${BASE}/api/payments/validate-keys`, { data: {} })
    expect(res.status()).toBe(401)
  })
})

// ── O3: SendGrid Deliverability ───────────────────────────────────────────────
test.describe('O3: SendGrid Deliverability Probe', () => {
  test('GET /api/integrations/sendgrid/test-deliverability returns 401', async ({ request }) => {
    const res = await request.get(`${BASE}/api/integrations/sendgrid/test-deliverability`)
    expect(res.status()).toBe(401)
  })
})

// ── O4: WebAuthn Challenge Log ────────────────────────────────────────────────
test.describe('O4: WebAuthn Challenge Log', () => {
  test('GET /api/auth/webauthn/challenge-log returns 401 without session', async ({ request }) => {
    const res = await request.get(`${BASE}/api/auth/webauthn/challenge-log`)
    expect(res.status()).toBe(401)
  })
})

// ── O5: Processor Agreements ─────────────────────────────────────────────────
test.describe('O5: DPDP Processor Agreements', () => {
  test('GET /api/dpdp/processor-agreements returns 401 without session', async ({ request }) => {
    const res = await request.get(`${BASE}/api/dpdp/processor-agreements`)
    expect(res.status()).toBe(401)
  })
})

// ── O6: Audit Progress ───────────────────────────────────────────────────────
test.describe('O6: Compliance Audit Progress', () => {
  test('GET /api/compliance/audit-progress returns 401 without session', async ({ request }) => {
    const res = await request.get(`${BASE}/api/compliance/audit-progress`)
    expect(res.status()).toBe(401)
  })
})

// ── N-Round endpoints backward compat ────────────────────────────────────────
test.describe('N-Round backward compatibility', () => {
  test('POST /api/payments/live-test returns 401', async ({ request }) => {
    const res = await request.post(`${BASE}/api/payments/live-test`, { data: {} })
    expect(res.status()).toBe(401)
  })
  test('GET /api/integrations/sendgrid/dns-guide returns 401', async ({ request }) => {
    const res = await request.get(`${BASE}/api/integrations/sendgrid/dns-guide`)
    expect(res.status()).toBe(401)
  })
  test('GET /api/auth/webauthn/devices returns 401', async ({ request }) => {
    const res = await request.get(`${BASE}/api/auth/webauthn/devices`)
    expect(res.status()).toBe(401)
  })
  test('GET /api/dpdp/dfr-readiness returns 401', async ({ request }) => {
    const res = await request.get(`${BASE}/api/dpdp/dfr-readiness`)
    expect(res.status()).toBe(401)
  })
  test('GET /api/compliance/annual-audit returns 401', async ({ request }) => {
    const res = await request.get(`${BASE}/api/compliance/annual-audit`)
    expect(res.status()).toBe(401)
  })
})

// ── Audit page O-Round content ───────────────────────────────────────────────
test.describe('Audit Page O-Round Content', () => {
  test('audit page loads (200)', async ({ request }) => {
    const res = await request.get(`${BASE}/audit`)
    expect(res.status()).toBe(200)
  })
  test('audit shows O-Round', async ({ request }) => {
    const res = await request.get(`${BASE}/audit`)
    const body = await res.text()
    expect(body).toContain('O-Round')
  })
  test('audit shows 2026.13', async ({ request }) => {
    const res = await request.get(`${BASE}/audit`)
    const body = await res.text()
    expect(body).toContain('2026.13')
  })
  test('audit shows P-Round roadmap', async ({ request }) => {
    const res = await request.get(`${BASE}/audit`)
    const body = await res.text()
    expect(body).toContain('P-Round')
  })
  test('audit shows score 100', async ({ request }) => {
    const res = await request.get(`${BASE}/audit`)
    const body = await res.text()
    expect(body).toContain('100')
  })
})

// ── DPDP public endpoints ─────────────────────────────────────────────────────
test.describe('DPDP Public Endpoints', () => {
  test('consent withdraw returns WD- reference', async ({ request }) => {
    const res = await request.post(`${BASE}/api/dpdp/consent/withdraw`, {
      data: { user_id: 'o-playwright@indiagully.com', purpose: 'analytics' },
    })
    const body = await res.json()
    expect(body.withdrawal_ref || '').toMatch(/^WD-/)
  })
  test('rights request returns RR- reference', async ({ request }) => {
    const res = await request.post(`${BASE}/api/dpdp/rights/request`, {
      data: { user_id: 'o-playwright@indiagully.com', request_type: 'access', description: 'O-round' },
    })
    const body = await res.json()
    expect(body.request_ref || '').toMatch(/^RR-/)
  })
})
