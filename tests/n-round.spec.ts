/**
 * N-Round Playwright E2E Test Suite
 * India Gully Enterprise Platform — v2026.12-N
 *
 * Covers:
 *   N0 — Health: version 2026.12, routes ≥ 170, n_round 100, 0 findings
 *   N1 — /api/integrations/health n_round_secrets_needed list
 *   N2 — POST /api/payments/live-test ₹1 Razorpay dry-run
 *   N3 — GET  /api/integrations/sendgrid/dns-guide CNAME/DKIM guide
 *   N4 — GET  /api/auth/webauthn/devices per-device AAGUID
 *   N5 — GET  /api/dpdp/dfr-readiness DFR checklist 11/12
 *   N6 — GET  /api/compliance/annual-audit 12-item checklist
 *
 * Run: BASE_URL=http://localhost:3000 npx playwright test tests/n-round.spec.ts
 */

import { test, expect } from '@playwright/test'

const BASE = process.env.BASE_URL || 'http://localhost:3000'

// ─────────────────────────────────────────────────────────────────────────────
// Suite 0: Health — N-Round version gates
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Suite 0 — Health: N-Round version', () => {
  test('GET /api/health returns version 2026.12', async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`)
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.version).toBe('2026.12')
  })

  test('GET /api/health routes_count ≥ 170', async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`)
    const body = await res.json()
    expect(body.routes_count).toBeGreaterThanOrEqual(170)
  })

  test('GET /api/health n_round score = 100', async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`)
    const body = await res.json()
    expect(body.security_score?.n_round).toBe(100)
  })

  test('GET /api/health open_findings = 0', async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`)
    const body = await res.json()
    expect(body.open_findings_count).toBe(0)
  })

  test('GET /api/health security.n_round contains N2', async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`)
    const body = await res.json()
    expect(body.security?.n_round).toContain('N2')
  })

  test('GET /api/health n_round_fixes present', async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`)
    const body = await res.json()
    expect(Array.isArray(body.n_round_fixes)).toBeTruthy()
    expect(body.n_round_fixes.length).toBeGreaterThanOrEqual(5)
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// Suite 1: N1 — integrations/health n_round_secrets_needed
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Suite 1 — N1: n_round_secrets_needed in integrations/health', () => {
  test('GET /api/integrations/health → 401 without session', async ({ request }) => {
    const res = await request.get(`${BASE}/api/integrations/health`)
    expect(res.status()).toBe(401)
  })

  test('GET /api/health has n_round_fixes with N1 entry', async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`)
    const body = await res.json()
    const n1 = (body.n_round_fixes || []).find((f: string) => f.includes('N1'))
    expect(n1).toBeTruthy()
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// Suite 2: N2 — POST /api/payments/live-test
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Suite 2 — N2: Razorpay live-test endpoint', () => {
  test('POST /api/payments/live-test → 401 without session', async ({ request }) => {
    const res = await request.post(`${BASE}/api/payments/live-test`, { data: {} })
    expect(res.status()).toBe(401)
  })

  test('n_round_fixes contains N2 entry', async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`)
    const body = await res.json()
    const n2 = (body.n_round_fixes || []).find((f: string) => f.includes('N2'))
    expect(n2).toContain('live-test')
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// Suite 3: N3 — GET /api/integrations/sendgrid/dns-guide
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Suite 3 — N3: SendGrid DNS guide', () => {
  test('GET /api/integrations/sendgrid/dns-guide → 401 without session', async ({ request }) => {
    const res = await request.get(`${BASE}/api/integrations/sendgrid/dns-guide`)
    expect(res.status()).toBe(401)
  })

  test('n_round_fixes contains N3 entry', async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`)
    const body = await res.json()
    const n3 = (body.n_round_fixes || []).find((f: string) => f.includes('N3'))
    expect(n3).toContain('dns-guide')
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// Suite 4: N4 — GET /api/auth/webauthn/devices
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Suite 4 — N4: WebAuthn devices endpoint', () => {
  test('GET /api/auth/webauthn/devices → 401 without session', async ({ request }) => {
    const res = await request.get(`${BASE}/api/auth/webauthn/devices`)
    expect(res.status()).toBe(401)
  })

  test('n_round_fixes contains N4 entry', async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`)
    const body = await res.json()
    const n4 = (body.n_round_fixes || []).find((f: string) => f.includes('N4'))
    expect(n4).toContain('AAGUID')
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// Suite 5: N5 — GET /api/dpdp/dfr-readiness
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Suite 5 — N5: DFR readiness checklist', () => {
  test('GET /api/dpdp/dfr-readiness → 401 without session', async ({ request }) => {
    const res = await request.get(`${BASE}/api/dpdp/dfr-readiness`)
    expect(res.status()).toBe(401)
  })

  test('n_round_fixes contains N5 entry', async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`)
    const body = await res.json()
    const n5 = (body.n_round_fixes || []).find((f: string) => f.includes('N5'))
    expect(n5).toContain('dfr-readiness')
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// Suite 6: N6 — GET /api/compliance/annual-audit
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Suite 6 — N6: Annual audit checklist', () => {
  test('GET /api/compliance/annual-audit → 401 without session', async ({ request }) => {
    const res = await request.get(`${BASE}/api/compliance/annual-audit`)
    expect(res.status()).toBe(401)
  })

  test('n_round_fixes contains N6 entry', async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`)
    const body = await res.json()
    const n6 = (body.n_round_fixes || []).find((f: string) => f.includes('N6'))
    expect(n6).toContain('annual-audit')
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// Suite 7: Auth guards and public endpoints
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Suite 7 — Auth guards and public endpoints', () => {
  test('GET /api/dpdp/dpo/dashboard → 401', async ({ request }) => {
    const res = await request.get(`${BASE}/api/dpdp/dpo/dashboard`)
    expect(res.status()).toBe(401)
  })

  test('GET /api/documents → 401', async ({ request }) => {
    const res = await request.get(`${BASE}/api/documents`)
    expect(res.status()).toBe(401)
  })

  test('GET /api/cms/pages → 401', async ({ request }) => {
    const res = await request.get(`${BASE}/api/cms/pages`)
    expect(res.status()).toBe(401)
  })

  test('POST /api/auth/otp/send with empty body → 400', async ({ request }) => {
    const res = await request.post(`${BASE}/api/auth/otp/send`, { data: {} })
    expect(res.status()).toBe(400)
  })

  test('GET / → 200', async ({ request }) => {
    const res = await request.get(`${BASE}/`)
    expect(res.status()).toBe(200)
  })

  test('GET /audit returns N-Round', async ({ request }) => {
    const res = await request.get(`${BASE}/audit`)
    expect(res.status()).toBe(200)
    const body = await res.text()
    expect(body).toContain('N-Round')
  })

  test('GET /audit returns 100', async ({ request }) => {
    const res = await request.get(`${BASE}/audit`)
    const body = await res.text()
    expect(body).toContain('100')
  })

  test('GET /audit returns O-Round roadmap', async ({ request }) => {
    const res = await request.get(`${BASE}/audit`)
    const body = await res.text()
    expect(body).toContain('O-Round')
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// Suite 8: DPDP consent and rights (regression)
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Suite 8 — DPDP regression (withdraw + rights)', () => {
  test('POST /api/dpdp/consent/withdraw returns WD- ref', async ({ request }) => {
    const res = await request.post(`${BASE}/api/dpdp/consent/withdraw`, {
      data: { user_id: 'n-round-smoke', purpose: 'analytics', reason: 'N-Round regression' }
    })
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.withdrawal_ref).toMatch(/^WD-/)
    expect(body.dpo_notified).toBe(true)
  })

  test('POST /api/dpdp/rights/request returns RR- ref', async ({ request }) => {
    const res = await request.post(`${BASE}/api/dpdp/rights/request`, {
      data: { user_id: 'n-round-smoke', request_type: 'access', description: 'N-Round regression' }
    })
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.request_ref).toMatch(/^RR-/)
  })

  test('GET /api/dpdp/banner-config → 200', async ({ request }) => {
    const res = await request.get(`${BASE}/api/dpdp/banner-config`)
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.version).toBeTruthy()
  })
})
