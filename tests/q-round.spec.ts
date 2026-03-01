/**
 * Q-Round E2E Playwright spec — India Gully Enterprise Platform v2026.15
 *
 * Covers:
 *  Q1: GET  /api/admin/secrets-status             — live Cloudflare secrets health
 *  Q2: GET  /api/payments/receipt/:id             — Razorpay receipt generator
 *  Q3: GET  /api/integrations/dns-health          — aggregate DNS health check (DoH)
 *  Q4: POST /api/auth/webauthn/register-guided    — guided FIDO2 registration
 *  Q5: POST /api/dpdp/dfr-submit                  — DFR submission package
 *  Q6: GET  /api/compliance/audit-certificate     — compliance certificate generator
 *
 * Health gate: v2026.15 · 185 routes · score 100/100 · 0 open findings
 */

import { test, expect } from '@playwright/test'

const BASE = process.env.BASE_URL || 'http://localhost:3000'

// ─── Suite 1: Health gate ─────────────────────────────────────────────────────
test.describe('Q-Round Health Gate', () => {
  test('version is 2026.15', async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`)
    expect(res.status()).toBe(200)
    const d = await res.json()
    expect(d.version).toBe('2026.15')
  })

  test('routes_count >= 185', async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`)
    const d = await res.json()
    expect(d.routes_count).toBeGreaterThanOrEqual(185)
  })

  test('security.q_round includes "100"', async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`)
    const d = await res.json()
    expect(d.security?.q_round).toContain('100')
  })

  test('security.p_round includes "100"', async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`)
    const d = await res.json()
    expect(d.security?.p_round).toContain('100')
  })

  test('open_findings_count is 0', async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`)
    const d = await res.json()
    expect(d.open_findings_count).toBe(0)
  })

  test('q_round_fixes has 6 entries', async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`)
    const d = await res.json()
    expect(Array.isArray(d.q_round_fixes)).toBe(true)
    expect(d.q_round_fixes.length).toBe(6)
    expect(d.q_round_fixes[0]).toContain('Q1')
  })
})

// ─── Suite 2: Q1 Secrets Status (auth-gated) ─────────────────────────────────
test.describe('Q1 /api/admin/secrets-status', () => {
  test('returns 401 without session', async ({ request }) => {
    const res = await request.get(`${BASE}/api/admin/secrets-status`)
    expect(res.status()).toBe(401)
  })
})

// ─── Suite 3: Q2 Receipt Generator (auth-gated) ──────────────────────────────
test.describe('Q2 /api/payments/receipt/:id', () => {
  test('returns 401 without session', async ({ request }) => {
    const res = await request.get(`${BASE}/api/payments/receipt/order_test123`)
    expect(res.status()).toBe(401)
  })
})

// ─── Suite 4: Q3 DNS Health (auth-gated) ─────────────────────────────────────
test.describe('Q3 /api/integrations/dns-health', () => {
  test('returns 401 without session', async ({ request }) => {
    const res = await request.get(`${BASE}/api/integrations/dns-health`)
    expect(res.status()).toBe(401)
  })
})

// ─── Suite 5: Q4 WebAuthn Register Guided (auth-gated) ───────────────────────
test.describe('Q4 /api/auth/webauthn/register-guided', () => {
  test('returns 401 without session (POST)', async ({ request }) => {
    const res = await request.post(`${BASE}/api/auth/webauthn/register-guided`, {
      data: { action: 'begin' },
    })
    expect(res.status()).toBe(401)
  })

  test('returns 401 for status action without session', async ({ request }) => {
    const res = await request.post(`${BASE}/api/auth/webauthn/register-guided`, {
      data: { action: 'status' },
    })
    expect(res.status()).toBe(401)
  })
})

// ─── Suite 6: Q5 DFR Submit (auth-gated) ─────────────────────────────────────
test.describe('Q5 /api/dpdp/dfr-submit', () => {
  test('returns 401 without session (POST)', async ({ request }) => {
    const res = await request.post(`${BASE}/api/dpdp/dfr-submit`, {
      data: { confirm: false },
    })
    expect(res.status()).toBe(401)
  })
})

// ─── Suite 7: Q6 Audit Certificate (auth-gated) ──────────────────────────────
test.describe('Q6 /api/compliance/audit-certificate', () => {
  test('returns 401 without session', async ({ request }) => {
    const res = await request.get(`${BASE}/api/compliance/audit-certificate`)
    expect(res.status()).toBe(401)
  })
})

// ─── Suite 8: P-Round backward compatibility ─────────────────────────────────
test.describe('P-Round backward compatibility', () => {
  test('P1 d1-token-wizard returns 401', async ({ request }) => {
    const res = await request.get(`${BASE}/api/admin/d1-token-wizard`)
    expect(res.status()).toBe(401)
  })

  test('P2 live-order-test returns 401', async ({ request }) => {
    const res = await request.post(`${BASE}/api/payments/live-order-test`)
    expect(res.status()).toBe(401)
  })

  test('P3 dns-validate returns 401', async ({ request }) => {
    const res = await request.get(`${BASE}/api/integrations/sendgrid/dns-validate`)
    expect(res.status()).toBe(401)
  })

  test('P5 dfr-finalise returns 401', async ({ request }) => {
    const res = await request.get(`${BASE}/api/dpdp/dfr-finalise`)
    expect(res.status()).toBe(401)
  })

  test('P6 audit-signoff returns 401', async ({ request }) => {
    const res = await request.get(`${BASE}/api/compliance/audit-signoff`)
    expect(res.status()).toBe(401)
  })
})

// ─── Suite 9: O-Round backward compatibility ─────────────────────────────────
test.describe('O-Round backward compatibility', () => {
  test('O1 production-readiness returns 401', async ({ request }) => {
    const res = await request.get(`${BASE}/api/admin/production-readiness`)
    expect(res.status()).toBe(401)
  })

  test('O5 processor-agreements returns 401', async ({ request }) => {
    const res = await request.get(`${BASE}/api/dpdp/processor-agreements`)
    expect(res.status()).toBe(401)
  })

  test('O6 audit-progress returns 401', async ({ request }) => {
    const res = await request.get(`${BASE}/api/compliance/audit-progress`)
    expect(res.status()).toBe(401)
  })
})

// ─── Suite 10: Audit page content ────────────────────────────────────────────
test.describe('Audit page content', () => {
  test('audit page loads with 200', async ({ request }) => {
    const res = await request.get(`${BASE}/audit`)
    expect(res.status()).toBe(200)
  })

  test('audit page contains Q-Round', async ({ request }) => {
    const res = await request.get(`${BASE}/audit`)
    const body = await res.text()
    expect(body).toContain('Q-Round')
  })

  test('audit page contains v2026.15', async ({ request }) => {
    const res = await request.get(`${BASE}/audit`)
    const body = await res.text()
    expect(body).toContain('2026.15')
  })

  test('audit page contains R-Round roadmap', async ({ request }) => {
    const res = await request.get(`${BASE}/audit`)
    const body = await res.text()
    expect(body).toContain('R-Round')
  })

  test('audit page shows 185 routes', async ({ request }) => {
    const res = await request.get(`${BASE}/audit`)
    const body = await res.text()
    expect(body).toContain('185')
  })
})

// ─── Suite 11: DPDP public endpoints ─────────────────────────────────────────
test.describe('DPDP public endpoints', () => {
  test('consent/withdraw returns WD- reference', async ({ request }) => {
    const res = await request.post(`${BASE}/api/dpdp/consent/withdraw`, {
      data: { user_id: 'q-round-test@indiagully.com', purpose: 'analytics' },
    })
    expect(res.status()).toBe(200)
    const d = await res.json()
    expect(d.withdrawal_reference || d.reference || JSON.stringify(d)).toContain('WD-')
  })

  test('rights/request returns RR- reference', async ({ request }) => {
    const res = await request.post(`${BASE}/api/dpdp/rights/request`, {
      data: { user_id: 'q-round-test@indiagully.com', request_type: 'access' },
    })
    expect(res.status()).toBe(200)
    const d = await res.json()
    expect(d.request_reference || d.reference || JSON.stringify(d)).toContain('RR-')
  })
})
