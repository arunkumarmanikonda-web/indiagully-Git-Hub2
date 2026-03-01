/**
 * Z-Round E2E Spec — v2026.24
 * Advanced Resilience & Continuous Compliance
 *
 * Tests:
 *   - Health endpoint: version 2026.24, routes_count 234, z_round flag, open_findings 0
 *   - Z-Round endpoints Z1–Z6: all return 401 unauthenticated
 *   - Y-Round & X-Round backward compat: all still return 401
 *   - z_round_fixes present with ≥6 items
 *   - Public pages: home, audit, CSRF token, admin login
 *   - Audit page: contains Z-Round, v2026.24, 234 routes
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

// ── Health endpoint ────────────────────────────────────────────────────────────
test.describe('Health endpoint — v2026.24', () => {
  test('version is 2026.24', async () => {
    const { status, body } = await getJson(`${BASE}/api/health`)
    expect(status).toBe(200)
    expect(body.version).toBe('2026.24')
  })

  test('routes_count is at least 234', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(body.routes_count).toBeGreaterThanOrEqual(234)
  })

  test('security block contains z_round', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(body.security?.z_round).toBeTruthy()
  })

  test('security block contains y_round, x_round, w_round', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(body.security?.y_round).toBeTruthy()
    expect(body.security?.x_round).toBeTruthy()
    expect(body.security?.w_round).toBeTruthy()
  })

  test('open_findings_count is 0', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(body.open_findings_count).toBe(0)
  })

  test('z_round_fixes array has ≥6 items', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(Array.isArray(body.z_round_fixes)).toBe(true)
    expect(body.z_round_fixes.length).toBeGreaterThanOrEqual(6)
  })

  test('y_round_fixes still present with ≥6 items', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(Array.isArray(body.y_round_fixes)).toBe(true)
    expect(body.y_round_fixes.length).toBeGreaterThanOrEqual(6)
  })

  test('security_score includes z_round = 100', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(body.security_score?.z_round).toBe(100)
  })

  test('security_score includes y_round and x_round = 100', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(body.security_score?.y_round).toBe(100)
    expect(body.security_score?.x_round).toBe(100)
  })
})

// ── Z-Round endpoints (unauthenticated → 401) ─────────────────────────────────
test.describe('Z-Round endpoints — expect 401 unauthenticated', () => {
  const zEndpoints = [
    { id: 'Z1', path: '/api/admin/capacity-forecast' },
    { id: 'Z2', path: '/api/payments/chargeback-report' },
    { id: 'Z3', path: '/api/integrations/webhook-health' },
    { id: 'Z4', path: '/api/auth/privilege-audit' },
    { id: 'Z5', path: '/api/dpdp/breach-simulation' },
    { id: 'Z6', path: '/api/compliance/continuous-monitoring' },
  ]

  for (const { id, path } of zEndpoints) {
    test(`${id}: GET ${path} → 401`, async () => {
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
    '/api/integrations/integration-status-board',
    '/api/auth/session-security-report',
    '/api/dpdp/audit-trail-export',
    '/api/compliance/policy-registry',
  ]
  for (const path of yEndpoints) {
    test(`GET ${path} → 401`, async () => {
      const res = await fetch(`${BASE}${path}`)
      expect(res.status).toBe(401)
    })
  }
})

// ── X-Round backward compat ────────────────────────────────────────────────────
test.describe('X-Round backward compat — expect 401', () => {
  const xEndpoints = [
    '/api/admin/operator-checklist',
    '/api/payments/live-transaction-summary',
    '/api/integrations/deliverability-score',
    '/api/auth/mfa-coverage',
    '/api/dpdp/compliance-score',
    '/api/compliance/certification-history',
  ]
  for (const path of xEndpoints) {
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
test.describe('Audit page — Z-Round content', () => {
  test('contains Z-Round', async () => {
    const { body } = await getHtml(`${BASE}/audit`)
    expect(body).toContain('Z-Round')
  })

  test('contains v2026.24', async () => {
    const { body } = await getHtml(`${BASE}/audit`)
    expect(body).toContain('2026.24')
  })

  test('shows 234 routes', async () => {
    const { body } = await getHtml(`${BASE}/audit`)
    expect(body).toContain('234')
  })

  test('contains capacity-forecast', async () => {
    const { body } = await getHtml(`${BASE}/audit`)
    expect(body).toContain('capacity-forecast')
  })

  test('contains continuous-monitoring', async () => {
    const { body } = await getHtml(`${BASE}/audit`)
    expect(body).toContain('continuous-monitoring')
  })
})

// ── Admin page ────────────────────────────────────────────────────────────────
test.describe('Admin page — Z-Round handlers', () => {
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
