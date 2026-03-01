/**
 * R-Round E2E Playwright spec — India Gully Enterprise Platform v2026.16
 *
 * Covers:
 *  R1: GET  /api/admin/infra-status              — consolidated infra dashboard
 *  R2: GET  /api/payments/razorpay-health        — live Razorpay API probe
 *  R3: GET  /api/integrations/email-health       — end-to-end email health
 *  R4: GET  /api/auth/webauthn/credential-store  — D1 credential store status
 *  R5: GET  /api/dpdp/dpa-tracker               — DPA execution tracker
 *  R6: GET  /api/compliance/cert-registry        — compliance certificate registry
 *
 * Health gate: v2026.16 · 190 routes · score 100/100 · 0 open findings
 */

import { test, expect } from '@playwright/test'

const BASE = process.env.BASE_URL || 'http://localhost:3000'

// ─── Suite 1: Health gate ─────────────────────────────────────────────────────
test.describe('R-Round Health Gate', () => {
  test('version is 2026.16', async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`)
    expect(res.status()).toBe(200)
    const d = await res.json()
    expect(d.version).toBe('2026.16')
  })

  test('routes_count >= 190', async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`)
    const d = await res.json()
    expect(d.routes_count).toBeGreaterThanOrEqual(190)
  })

  test('security.r_round includes "100"', async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`)
    const d = await res.json()
    expect(d.security?.r_round).toContain('100')
  })

  test('security.q_round still present', async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`)
    const d = await res.json()
    expect(d.security?.q_round).toContain('100')
  })

  test('open_findings_count is 0', async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`)
    const d = await res.json()
    expect(d.open_findings_count).toBe(0)
  })

  test('r_round_fixes has 6 entries and first mentions R1', async ({ request }) => {
    const res = await request.get(`${BASE}/api/health`)
    const d = await res.json()
    expect(Array.isArray(d.r_round_fixes)).toBe(true)
    expect(d.r_round_fixes.length).toBe(6)
    expect(d.r_round_fixes[0]).toContain('R1')
  })
})

// ─── Suite 2: R1 Infra Status (auth-gated) ───────────────────────────────────
test.describe('R1 /api/admin/infra-status', () => {
  test('returns 401 without session', async ({ request }) => {
    const res = await request.get(`${BASE}/api/admin/infra-status`)
    expect(res.status()).toBe(401)
  })
})

// ─── Suite 3: R2 Razorpay Health (auth-gated) ────────────────────────────────
test.describe('R2 /api/payments/razorpay-health', () => {
  test('returns 401 without session', async ({ request }) => {
    const res = await request.get(`${BASE}/api/payments/razorpay-health`)
    expect(res.status()).toBe(401)
  })
})

// ─── Suite 4: R3 Email Health (auth-gated) ───────────────────────────────────
test.describe('R3 /api/integrations/email-health', () => {
  test('returns 401 without session', async ({ request }) => {
    const res = await request.get(`${BASE}/api/integrations/email-health`)
    expect(res.status()).toBe(401)
  })
})

// ─── Suite 5: R4 Credential Store (auth-gated) ───────────────────────────────
test.describe('R4 /api/auth/webauthn/credential-store', () => {
  test('returns 401 without session', async ({ request }) => {
    const res = await request.get(`${BASE}/api/auth/webauthn/credential-store`)
    expect(res.status()).toBe(401)
  })
})

// ─── Suite 6: R5 DPA Tracker (auth-gated) ────────────────────────────────────
test.describe('R5 /api/dpdp/dpa-tracker', () => {
  test('returns 401 without session', async ({ request }) => {
    const res = await request.get(`${BASE}/api/dpdp/dpa-tracker`)
    expect(res.status()).toBe(401)
  })
})

// ─── Suite 7: R6 Cert Registry (auth-gated) ──────────────────────────────────
test.describe('R6 /api/compliance/cert-registry', () => {
  test('returns 401 without session', async ({ request }) => {
    const res = await request.get(`${BASE}/api/compliance/cert-registry`)
    expect(res.status()).toBe(401)
  })
})

// ─── Suite 8: Q-Round backward compatibility ─────────────────────────────────
test.describe('Q-Round backward compatibility', () => {
  test('Q1 secrets-status returns 401', async ({ request }) => {
    const res = await request.get(`${BASE}/api/admin/secrets-status`)
    expect(res.status()).toBe(401)
  })

  test('Q3 dns-health returns 401', async ({ request }) => {
    const res = await request.get(`${BASE}/api/integrations/dns-health`)
    expect(res.status()).toBe(401)
  })

  test('Q5 dfr-submit returns 401', async ({ request }) => {
    const res = await request.post(`${BASE}/api/dpdp/dfr-submit`, { data: { confirm: false } })
    expect(res.status()).toBe(401)
  })

  test('Q6 audit-certificate returns 401', async ({ request }) => {
    const res = await request.get(`${BASE}/api/compliance/audit-certificate`)
    expect(res.status()).toBe(401)
  })
})

// ─── Suite 9: P-Round backward compatibility ─────────────────────────────────
test.describe('P-Round backward compatibility', () => {
  test('P1 d1-token-wizard returns 401', async ({ request }) => {
    const res = await request.get(`${BASE}/api/admin/d1-token-wizard`)
    expect(res.status()).toBe(401)
  })

  test('P6 audit-signoff returns 401', async ({ request }) => {
    const res = await request.get(`${BASE}/api/compliance/audit-signoff`)
    expect(res.status()).toBe(401)
  })
})

// ─── Suite 10: O-Round backward compatibility ────────────────────────────────
test.describe('O-Round backward compatibility', () => {
  test('O1 production-readiness returns 401', async ({ request }) => {
    const res = await request.get(`${BASE}/api/admin/production-readiness`)
    expect(res.status()).toBe(401)
  })

  test('O5 processor-agreements returns 401', async ({ request }) => {
    const res = await request.get(`${BASE}/api/dpdp/processor-agreements`)
    expect(res.status()).toBe(401)
  })
})

// ─── Suite 11: Audit page content ────────────────────────────────────────────
test.describe('Audit page — R-Round content', () => {
  test('audit page loads with 200', async ({ request }) => {
    const res = await request.get(`${BASE}/audit`)
    expect(res.status()).toBe(200)
  })

  test('audit page contains R-Round', async ({ request }) => {
    const res = await request.get(`${BASE}/audit`)
    expect(await res.text()).toContain('R-Round')
  })

  test('audit page contains v2026.16', async ({ request }) => {
    const res = await request.get(`${BASE}/audit`)
    expect(await res.text()).toContain('2026.16')
  })

  test('audit page contains S-Round roadmap', async ({ request }) => {
    const res = await request.get(`${BASE}/audit`)
    expect(await res.text()).toContain('S-Round')
  })

  test('audit page shows 190 routes', async ({ request }) => {
    const res = await request.get(`${BASE}/audit`)
    expect(await res.text()).toContain('190')
  })
})

// ─── Suite 12: DPDP public endpoints ─────────────────────────────────────────
test.describe('DPDP public endpoints', () => {
  test('consent/withdraw returns WD- reference', async ({ request }) => {
    const res = await request.post(`${BASE}/api/dpdp/consent/withdraw`, {
      data: { user_id: 'r-round-test@indiagully.com', purpose: 'analytics' },
    })
    expect(res.status()).toBe(200)
    const d = await res.json()
    expect(d.withdrawal_reference || d.reference || JSON.stringify(d)).toContain('WD-')
  })

  test('rights/request returns RR- reference', async ({ request }) => {
    const res = await request.post(`${BASE}/api/dpdp/rights/request`, {
      data: { user_id: 'r-round-test@indiagully.com', request_type: 'access' },
    })
    expect(res.status()).toBe(200)
    const d = await res.json()
    expect(d.request_reference || d.reference || JSON.stringify(d)).toContain('RR-')
  })
})
