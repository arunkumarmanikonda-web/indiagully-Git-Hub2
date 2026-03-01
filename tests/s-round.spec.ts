import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:3000'

// ── Suite 1: Health Gate ──────────────────────────────────────────────────────
test.describe('S-Round Health Gate', () => {
  test('version is 2026.17', async ({ request }) => {
    const r = await request.get(`${BASE}/api/health`)
    const d = await r.json()
    expect(d.version).toBe('2026.17')
  })

  test('routes_count is 195', async ({ request }) => {
    const r = await request.get(`${BASE}/api/health`)
    const d = await r.json()
    expect(d.routes_count).toBeGreaterThanOrEqual(195)
  })

  test('s_round score is 100', async ({ request }) => {
    const r = await request.get(`${BASE}/api/health`)
    const d = await r.json()
    expect(d.security_score?.s_round).toBe(100)
  })

  test('open_findings_count is 0', async ({ request }) => {
    const r = await request.get(`${BASE}/api/health`)
    const d = await r.json()
    expect(d.open_findings_count).toBe(0)
  })

  test('s_round_fixes array present with 6 entries', async ({ request }) => {
    const r = await request.get(`${BASE}/api/health`)
    const d = await r.json()
    expect(Array.isArray(d.s_round_fixes)).toBe(true)
    expect(d.s_round_fixes.length).toBeGreaterThanOrEqual(6)
  })
})

// ── Suite 2: S1 Live Config ───────────────────────────────────────────────────
test.describe('S1 GET /api/admin/live-config', () => {
  test('returns 401 without session', async ({ request }) => {
    const r = await request.get(`${BASE}/api/admin/live-config`)
    expect(r.status()).toBe(401)
  })

  test('endpoint path is correctly registered', async ({ request }) => {
    const r = await request.get(`${BASE}/api/admin/live-config`)
    // 401 means route exists and is guarded
    expect(r.status()).not.toBe(404)
  })
})

// ── Suite 3: S2 Gateway Status ────────────────────────────────────────────────
test.describe('S2 GET /api/payments/gateway-status', () => {
  test('returns 401 without session', async ({ request }) => {
    const r = await request.get(`${BASE}/api/payments/gateway-status`)
    expect(r.status()).toBe(401)
  })

  test('endpoint path is correctly registered', async ({ request }) => {
    const r = await request.get(`${BASE}/api/payments/gateway-status`)
    expect(r.status()).not.toBe(404)
  })
})

// ── Suite 4: S3 Stack Health ──────────────────────────────────────────────────
test.describe('S3 GET /api/integrations/stack-health', () => {
  test('returns 401 without session', async ({ request }) => {
    const r = await request.get(`${BASE}/api/integrations/stack-health`)
    expect(r.status()).toBe(401)
  })

  test('endpoint path is correctly registered', async ({ request }) => {
    const r = await request.get(`${BASE}/api/integrations/stack-health`)
    expect(r.status()).not.toBe(404)
  })
})

// ── Suite 5: S4 Session Analytics ────────────────────────────────────────────
test.describe('S4 GET /api/auth/session-analytics', () => {
  test('returns 401 without session', async ({ request }) => {
    const r = await request.get(`${BASE}/api/auth/session-analytics`)
    expect(r.status()).toBe(401)
  })

  test('endpoint path is correctly registered', async ({ request }) => {
    const r = await request.get(`${BASE}/api/auth/session-analytics`)
    expect(r.status()).not.toBe(404)
  })
})

// ── Suite 6: S5 Consent Analytics ────────────────────────────────────────────
test.describe('S5 GET /api/dpdp/consent-analytics', () => {
  test('returns 401 without session', async ({ request }) => {
    const r = await request.get(`${BASE}/api/dpdp/consent-analytics`)
    expect(r.status()).toBe(401)
  })

  test('endpoint path is correctly registered', async ({ request }) => {
    const r = await request.get(`${BASE}/api/dpdp/consent-analytics`)
    expect(r.status()).not.toBe(404)
  })
})

// ── Suite 7: S6 Gap Analysis ──────────────────────────────────────────────────
test.describe('S6 GET /api/compliance/gap-analysis', () => {
  test('returns 401 without session', async ({ request }) => {
    const r = await request.get(`${BASE}/api/compliance/gap-analysis`)
    expect(r.status()).toBe(401)
  })

  test('endpoint path is correctly registered', async ({ request }) => {
    const r = await request.get(`${BASE}/api/compliance/gap-analysis`)
    expect(r.status()).not.toBe(404)
  })
})

// ── Suite 8: R-Round Backward Compat ─────────────────────────────────────────
test.describe('R-Round Backward Compatibility', () => {
  const rEndpoints = [
    '/api/admin/infra-status',
    '/api/payments/razorpay-health',
    '/api/integrations/email-health',
    '/api/auth/webauthn/credential-store',
    '/api/dpdp/dpa-tracker',
    '/api/compliance/cert-registry',
  ]

  for (const ep of rEndpoints) {
    test(`${ep} still returns 401`, async ({ request }) => {
      const r = await request.get(`${BASE}${ep}`)
      expect(r.status()).toBe(401)
    })
  }
})

// ── Suite 9: Q-Round Backward Compat ─────────────────────────────────────────
test.describe('Q-Round Backward Compatibility', () => {
  const qEndpoints = [
    '/api/admin/secrets-status',
    '/api/integrations/dns-health',
    '/api/compliance/audit-certificate',
  ]

  for (const ep of qEndpoints) {
    test(`${ep} still returns 401`, async ({ request }) => {
      const r = await request.get(`${BASE}${ep}`)
      expect(r.status()).toBe(401)
    })
  }
})

// ── Suite 10: Audit Page Verification ────────────────────────────────────────
test.describe('Audit Page — S-Round Content', () => {
  test('audit page returns 200', async ({ request }) => {
    const r = await request.get(`${BASE}/audit`)
    expect(r.status()).toBe(200)
  })

  test('audit page contains S-Round', async ({ request }) => {
    const r = await request.get(`${BASE}/audit`)
    const body = await r.text()
    expect(body).toContain('S-Round')
  })

  test('audit page shows v2026.17', async ({ request }) => {
    const r = await request.get(`${BASE}/audit`)
    const body = await r.text()
    expect(body).toContain('2026.17')
  })

  test('audit page shows T-Round roadmap', async ({ request }) => {
    const r = await request.get(`${BASE}/audit`)
    const body = await r.text()
    expect(body).toContain('T-Round')
  })

  test('audit page shows 195 routes', async ({ request }) => {
    const r = await request.get(`${BASE}/audit`)
    const body = await r.text()
    expect(body).toContain('195')
  })
})

// ── Suite 11: DPDP Public Endpoints ──────────────────────────────────────────
test.describe('DPDP Public Endpoints', () => {
  test('consent withdraw returns WD- reference', async ({ request }) => {
    const r = await request.post(`${BASE}/api/dpdp/consent/withdraw`, {
      data: { user_id: 'stest@example.com', purpose: 'all' },
    })
    const d = await r.json()
    expect(d.reference_id || d.withdrawal_id || JSON.stringify(d)).toContain('WD-')
  })

  test('rights request returns RR- reference', async ({ request }) => {
    const r = await request.post(`${BASE}/api/dpdp/rights/request`, {
      data: { user_id: 'stest@example.com', request_type: 'access' },
    })
    const d = await r.json()
    expect(JSON.stringify(d)).toContain('RR-')
  })
})
