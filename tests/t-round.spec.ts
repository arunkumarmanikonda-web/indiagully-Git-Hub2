/**
 * T-Round Playwright E2E Spec — v2026.18
 * India Gully Enterprise Platform
 * 
 * Covers:
 *  [1] Health gate (version, routes, t_round, open_findings)
 *  [2] T-Round endpoints T1–T6 return 401 (not 404)
 *  [3] S-Round backward compat — still 401
 *  [4] R-Round backward compat — still 401
 *  [5] Audit page (T-Round, v2026.18, U-Round roadmap)
 *  [6] Public pages (home, csrf-token)
 *  [7] Admin dashboard contains T-Round buttons
 *  [8] DPDP public endpoints
 */

import { test, expect } from '@playwright/test'

const BASE = process.env.BASE_URL || 'http://localhost:3000'

// Helper
async function apiGet(request: any, path: string) {
  return request.get(`${BASE}${path}`)
}

// ─── [1] Health Gate ──────────────────────────────────────────────────────────
test.describe('[1] Health Gate', () => {
  test('version is 2026.18', async ({ request }) => {
    const resp = await apiGet(request, '/api/health')
    expect(resp.status()).toBe(200)
    const d = await resp.json()
    expect(d.version).toBe('2026.18')
  })
  test('routes_count is 200', async ({ request }) => {
    const resp = await apiGet(request, '/api/health')
    const d = await resp.json()
    expect(d.routes_count).toBe(200)
  })
  test('t_round present in security block', async ({ request }) => {
    const resp = await apiGet(request, '/api/health')
    const d = await resp.json()
    expect(JSON.stringify(d.security)).toContain('t_round')
  })
  test('s_round still present (backward compat)', async ({ request }) => {
    const resp = await apiGet(request, '/api/health')
    const d = await resp.json()
    expect(JSON.stringify(d.security)).toContain('s_round')
  })
  test('open_findings_count is 0', async ({ request }) => {
    const resp = await apiGet(request, '/api/health')
    const d = await resp.json()
    expect(d.open_findings_count).toBe(0)
  })
})

// ─── [2] T-Round Endpoints (T1–T6) ───────────────────────────────────────────
test.describe('[2] T-Round Endpoints (expect 401)', () => {
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
      const resp = await apiGet(request, ep)
      expect(resp.status()).toBe(401)
    })
  }
})

// ─── [3] S-Round Backward Compat ─────────────────────────────────────────────
test.describe('[3] S-Round Backward Compat (expect 401)', () => {
  const endpoints = [
    '/api/admin/live-config',
    '/api/payments/gateway-status',
    '/api/integrations/stack-health',
    '/api/auth/session-analytics',
    '/api/dpdp/consent-analytics',
    '/api/compliance/gap-analysis',
  ]
  for (const ep of endpoints) {
    test(`${ep} → 401`, async ({ request }) => {
      const resp = await apiGet(request, ep)
      expect(resp.status()).toBe(401)
    })
  }
})

// ─── [4] R-Round Backward Compat ─────────────────────────────────────────────
test.describe('[4] R-Round Backward Compat (expect 401)', () => {
  const endpoints = [
    '/api/admin/infra-status',
    '/api/payments/razorpay-health',
    '/api/integrations/email-health',
  ]
  for (const ep of endpoints) {
    test(`${ep} → 401`, async ({ request }) => {
      const resp = await apiGet(request, ep)
      expect(resp.status()).toBe(401)
    })
  }
})

// ─── [5] Audit Page ───────────────────────────────────────────────────────────
test.describe('[5] Audit Page', () => {
  test('audit page returns 200', async ({ request }) => {
    const resp = await apiGet(request, '/audit')
    expect(resp.status()).toBe(200)
  })
  test('audit page contains T-Round', async ({ request }) => {
    const resp = await apiGet(request, '/audit')
    expect(await resp.text()).toContain('T-Round')
  })
  test('audit page contains v2026.18', async ({ request }) => {
    const resp = await apiGet(request, '/audit')
    expect(await resp.text()).toContain('2026.18')
  })
  test('audit page contains U-Round roadmap', async ({ request }) => {
    const resp = await apiGet(request, '/audit')
    expect(await resp.text()).toContain('U-Round')
  })
  test('audit page shows 200 routes', async ({ request }) => {
    const resp = await apiGet(request, '/audit')
    expect(await resp.text()).toContain('200')
  })
})

// ─── [6] Public Pages ─────────────────────────────────────────────────────────
test.describe('[6] Public Pages', () => {
  test('home page 200', async ({ request }) => {
    const resp = await apiGet(request, '/')
    expect(resp.status()).toBe(200)
  })
  test('csrf-token 200', async ({ request }) => {
    const resp = await apiGet(request, '/api/auth/csrf-token')
    expect(resp.status()).toBe(200)
  })
})

// ─── [7] Admin Dashboard T-Round Buttons ─────────────────────────────────────
test.describe('[7] Admin Dashboard T-Round Buttons', () => {
  test('admin page contains T-Round button references', async ({ request }) => {
    const resp = await apiGet(request, '/admin')
    const html = await resp.text()
    // Check that T-Round JS handlers are embedded
    const hasT = html.includes('igGoLiveChecklist') || html.includes('go-live-checklist') ||
                 html.includes('T-Round') || html.includes('igTransactionLog')
    expect(hasT).toBeTruthy()
  })
})

// ─── [8] DPDP & Compliance ────────────────────────────────────────────────────
test.describe('[8] DPDP & Compliance', () => {
  test('DPDP consent-banner accessible', async ({ request }) => {
    const resp = await apiGet(request, '/api/dpdp/consent-banner')
    expect([200, 401, 403]).toContain(resp.status())
  })
  test('compliance/cert-registry 401', async ({ request }) => {
    const resp = await apiGet(request, '/api/compliance/cert-registry')
    expect(resp.status()).toBe(401)
  })
})
