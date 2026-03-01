/**
 * U-Round Playwright E2E Spec — v2026.19
 * India Gully Enterprise Platform
 *
 * Covers:
 *  [1] Health gate (version, routes, u_round, open_findings)
 *  [2] U-Round endpoints U1–U6 return 401 (not 404)
 *  [3] T-Round backward compat — still 401
 *  [4] S-Round backward compat — still 401
 *  [5] R-Round backward compat — still 401
 *  [6] Audit page (U-Round, v2026.19, V-Round roadmap)
 *  [7] Public pages (home, csrf-token)
 *  [8] Admin source contains U-Round handlers
 */

import { test, expect } from '@playwright/test'

const BASE = process.env.BASE_URL || 'http://localhost:3000'

async function apiGet(request: any, path: string) {
  return request.get(`${BASE}${path}`)
}

// ─── [1] Health Gate ──────────────────────────────────────────────────────────
test.describe('[1] Health Gate', () => {
  test('version is 2026.19', async ({ request }) => {
    const resp = await apiGet(request, '/api/health')
    expect(resp.status()).toBe(200)
    const d = await resp.json()
    expect(d.version).toBe('2026.19')
  })
  test('routes_count is 205', async ({ request }) => {
    const d = await (await apiGet(request, '/api/health')).json()
    expect(d.routes_count).toBe(205)
  })
  test('u_round present in security block', async ({ request }) => {
    const d = await (await apiGet(request, '/api/health')).json()
    expect(JSON.stringify(d.security)).toContain('u_round')
  })
  test('t_round still present (backward compat)', async ({ request }) => {
    const d = await (await apiGet(request, '/api/health')).json()
    expect(JSON.stringify(d.security)).toContain('t_round')
  })
  test('s_round still present (backward compat)', async ({ request }) => {
    const d = await (await apiGet(request, '/api/health')).json()
    expect(JSON.stringify(d.security)).toContain('s_round')
  })
  test('open_findings_count is 0', async ({ request }) => {
    const d = await (await apiGet(request, '/api/health')).json()
    expect(d.open_findings_count).toBe(0)
  })
})

// ─── [2] U-Round Endpoints (U1–U6) ───────────────────────────────────────────
test.describe('[2] U-Round Endpoints (expect 401)', () => {
  const endpoints = [
    '/api/admin/d1-schema-status',
    '/api/payments/live-key-status',
    '/api/integrations/dns-deliverability',
    '/api/auth/webauthn-registry',
    '/api/dpdp/dpa-status',
    '/api/compliance/gold-cert-status',
  ]
  for (const ep of endpoints) {
    test(`${ep} → 401`, async ({ request }) => {
      const resp = await apiGet(request, ep)
      expect(resp.status()).toBe(401)
    })
  }
})

// ─── [3] T-Round Backward Compat ─────────────────────────────────────────────
test.describe('[3] T-Round Backward Compat (expect 401)', () => {
  const endpoints = [
    '/api/admin/go-live-checklist',
    '/api/payments/transaction-log',
    '/api/integrations/webhook-health',
    '/api/auth/mfa-status',
    '/api/dpdp/dpo-summary',
    '/api/compliance/risk-register',
  ]
  for (const ep of endpoints) {
    test(`${ep} → 401`, async ({ request }) => {
      expect((await apiGet(request, ep)).status()).toBe(401)
    })
  }
})

// ─── [4] S-Round Backward Compat ─────────────────────────────────────────────
test.describe('[4] S-Round Backward Compat (expect 401)', () => {
  const endpoints = [
    '/api/admin/live-config',
    '/api/payments/gateway-status',
    '/api/integrations/stack-health',
    '/api/dpdp/consent-analytics',
    '/api/compliance/gap-analysis',
  ]
  for (const ep of endpoints) {
    test(`${ep} → 401`, async ({ request }) => {
      expect((await apiGet(request, ep)).status()).toBe(401)
    })
  }
})

// ─── [5] R-Round Backward Compat ─────────────────────────────────────────────
test.describe('[5] R-Round Backward Compat (expect 401)', () => {
  for (const ep of ['/api/admin/infra-status', '/api/payments/razorpay-health']) {
    test(`${ep} → 401`, async ({ request }) => {
      expect((await apiGet(request, ep)).status()).toBe(401)
    })
  }
})

// ─── [6] Audit Page ───────────────────────────────────────────────────────────
test.describe('[6] Audit Page', () => {
  test('audit page returns 200', async ({ request }) => {
    expect((await apiGet(request, '/audit')).status()).toBe(200)
  })
  test('audit contains U-Round', async ({ request }) => {
    expect(await (await apiGet(request, '/audit')).text()).toContain('U-Round')
  })
  test('audit contains v2026.19', async ({ request }) => {
    expect(await (await apiGet(request, '/audit')).text()).toContain('2026.19')
  })
  test('audit contains V-Round roadmap', async ({ request }) => {
    expect(await (await apiGet(request, '/audit')).text()).toContain('V-Round')
  })
  test('audit shows 205 routes', async ({ request }) => {
    expect(await (await apiGet(request, '/audit')).text()).toContain('205')
  })
})

// ─── [7] Public Pages ─────────────────────────────────────────────────────────
test.describe('[7] Public Pages', () => {
  test('home page 200', async ({ request }) => {
    expect((await apiGet(request, '/')).status()).toBe(200)
  })
  test('csrf-token 200', async ({ request }) => {
    expect((await apiGet(request, '/api/auth/csrf-token')).status()).toBe(200)
  })
})

// ─── [8] Admin Source contains U-Round handlers ───────────────────────────────
test.describe('[8] Admin Source (U-Round handler presence)', () => {
  test('compliance cert-registry 401', async ({ request }) => {
    expect((await apiGet(request, '/api/compliance/cert-registry')).status()).toBe(401)
  })
  test('DPDP banner accessible', async ({ request }) => {
    const status = (await apiGet(request, '/api/dpdp/consent-banner')).status()
    expect([200, 401, 403]).toContain(status)
  })
})
