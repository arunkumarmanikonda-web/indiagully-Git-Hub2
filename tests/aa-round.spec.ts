/**
 * AA-Round E2E Spec — v2026.25
 * Financial Intelligence & Risk Operations
 *
 * Tests:
 *   - Health: version 2026.25, routes_count 240, aa_round flag, open_findings 0
 *   - AA-Round endpoints AA1–AA6: all return 401 unauthenticated
 *   - Z-Round & Y-Round backward compat: all still return 401
 *   - aa_round_fixes present with ≥6 items
 *   - Public pages: home, audit, CSRF token, admin login
 *   - Audit page: contains AA-Round, v2026.25, 240 routes
 *   - Frontend: no CSP errors, no JS errors
 */

import { test, expect } from '@playwright/test'

const BASE = process.env.BASE_URL || 'http://localhost:3000'

async function getJson(url: string) {
  const res = await fetch(url)
  return { status: res.status, body: await res.json().catch(() => ({})) }
}

async function getHtml(url: string) {
  const res = await fetch(url)
  return { status: res.status, body: await res.text().catch(() => '') }
}

// ── Health endpoint ───────────────────────────────────────────────────────────
test.describe('Health endpoint — v2026.25', () => {
  test('version is 2026.25', async () => {
    const { status, body } = await getJson(`${BASE}/api/health`)
    expect(status).toBe(200)
    expect(body.version).toBe('2026.25')
  })

  test('routes_count is at least 240', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(body.routes_count).toBeGreaterThanOrEqual(240)
  })

  test('security block contains aa_round', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(body.security?.aa_round).toBeTruthy()
  })

  test('security block contains z_round, y_round, x_round', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(body.security?.z_round).toBeTruthy()
    expect(body.security?.y_round).toBeTruthy()
    expect(body.security?.x_round).toBeTruthy()
  })

  test('open_findings_count is 0', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(body.open_findings_count).toBe(0)
  })

  test('aa_round_fixes array has ≥6 items', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(Array.isArray(body.aa_round_fixes)).toBe(true)
    expect(body.aa_round_fixes.length).toBeGreaterThanOrEqual(6)
  })

  test('z_round_fixes still present with ≥6 items', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(Array.isArray(body.z_round_fixes)).toBe(true)
    expect(body.z_round_fixes.length).toBeGreaterThanOrEqual(6)
  })

  test('security_score includes aa_round = 100', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(body.security_score?.aa_round).toBe(100)
  })

  test('security_score includes z_round and y_round = 100', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(body.security_score?.z_round).toBe(100)
    expect(body.security_score?.y_round).toBe(100)
  })
})

// ── AA-Round endpoints (unauthenticated → 401) ────────────────────────────────
test.describe('AA-Round endpoints — expect 401 unauthenticated', () => {
  const aaEndpoints = [
    { id: 'AA1', path: '/api/finance/cashflow-forecast' },
    { id: 'AA2', path: '/api/payments/fraud-signals' },
    { id: 'AA3', path: '/api/integrations/api-gateway-metrics' },
    { id: 'AA4', path: '/api/auth/zero-trust-scorecard' },
    { id: 'AA5', path: '/api/dpdp/data-map' },
    { id: 'AA6', path: '/api/compliance/risk-heatmap' },
  ]

  for (const { id, path } of aaEndpoints) {
    test(`${id}: GET ${path} → 401`, async () => {
      const res = await fetch(`${BASE}${path}`)
      expect(res.status).toBe(401)
    })
  }
})

// ── Z-Round backward compat ────────────────────────────────────────────────────
test.describe('Z-Round backward compat — expect 401', () => {
  const zEndpoints = [
    '/api/admin/capacity-forecast',
    '/api/payments/chargeback-report',
    '/api/integrations/webhook-health',
    '/api/auth/privilege-audit',
    '/api/dpdp/breach-simulation',
    '/api/compliance/continuous-monitoring',
  ]
  for (const path of zEndpoints) {
    test(`GET ${path} → 401`, async () => {
      const res = await fetch(`${BASE}${path}`)
      expect(res.status).toBe(401)
    })
  }
})

// ── Y-Round backward compat ────────────────────────────────────────────────────
test.describe('Y-Round backward compat — expect 401', () => {
  const yEndpoints = [
    '/api/admin/platform-health-dashboard',
    '/api/payments/reconciliation-report',
    '/api/compliance/policy-registry',
  ]
  for (const path of yEndpoints) {
    test(`GET ${path} → 401`, async () => {
      const res = await fetch(`${BASE}${path}`)
      expect(res.status).toBe(401)
    })
  }
})

// ── Public pages ──────────────────────────────────────────────────────────────
test.describe('Public pages', () => {
  test('Home page returns 200 with India Gully', async () => {
    const { status, body } = await getHtml(`${BASE}/`)
    expect(status).toBe(200)
    expect(body).toContain('India Gully')
  })

  test('CSRF token returns 200', async () => {
    const { status, body } = await getJson(`${BASE}/api/auth/csrf-token`)
    expect(status).toBe(200)
    expect(body.csrf_token).toBeTruthy()
  })

  test('Admin page returns 200 with login form', async () => {
    const { status, body } = await getHtml(`${BASE}/admin`)
    expect(status).toBe(200)
    expect(body).toContain('admin-login-form')
  })

  test('Listings page returns 200', async () => {
    const { status } = await getHtml(`${BASE}/listings`)
    expect(status).toBe(200)
  })

  test('Audit page returns 200', async () => {
    const { status } = await getHtml(`${BASE}/audit`)
    expect(status).toBe(200)
  })
})

// ── Audit page ────────────────────────────────────────────────────────────────
test.describe('Audit page — AA-Round content', () => {
  test('contains AA-Round', async () => {
    const { body } = await getHtml(`${BASE}/audit`)
    expect(body).toContain('AA-Round')
  })

  test('contains v2026.25', async () => {
    const { body } = await getHtml(`${BASE}/audit`)
    expect(body).toContain('2026.25')
  })

  test('shows 240 routes', async () => {
    const { body } = await getHtml(`${BASE}/audit`)
    expect(body).toContain('240')
  })

  test('contains cashflow-forecast', async () => {
    const { body } = await getHtml(`${BASE}/audit`)
    expect(body).toContain('cashflow-forecast')
  })

  test('contains risk-heatmap', async () => {
    const { body } = await getHtml(`${BASE}/audit`)
    expect(body).toContain('risk-heatmap')
  })
})

// ── Admin page ────────────────────────────────────────────────────────────────
test.describe('Admin page — AA-Round handlers', () => {
  test('Admin page returns login form (auth gate)', async () => {
    const { status, body } = await getHtml(`${BASE}/admin`)
    expect(status).toBe(200)
    expect(body).toContain('admin-login-form')
  })
})

// ── Frontend ──────────────────────────────────────────────────────────────────
test.describe('Frontend — CSP and JS errors', () => {
  test('Home page CSP has no strict-dynamic', async ({ page }) => {
    const response = await page.goto(`${BASE}/`)
    const csp = response?.headers()['content-security-policy'] || ''
    expect(csp).not.toContain('strict-dynamic')
  })

  test('Home page loads without JS errors', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', err => errors.push(err.message))
    await page.goto(`${BASE}/`)
    await page.waitForTimeout(2000)
    const real = errors.filter(e => !e.includes('cdn.tailwindcss.com'))
    expect(real).toHaveLength(0)
  })
})
