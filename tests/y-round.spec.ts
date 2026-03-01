/**
 * Y-Round E2E Spec — v2026.23
 * Compliance Automation & Live Monitoring
 *
 * Tests:
 *   - Health endpoint: version 2026.23, routes_count 228, y_round flag, open_findings 0
 *   - Y-Round endpoints Y1–Y6: all return 401 unauthenticated
 *   - X-Round & W-Round backward compat: all still return 401
 *   - y_round_fixes present with ≥6 items
 *   - Public pages: home, audit, CSRF token, admin login
 *   - Audit page: contains Y-Round, v2026.23, 228 routes
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
test.describe('Health endpoint — v2026.23', () => {
  test('version is 2026.23', async () => {
    const { status, body } = await getJson(`${BASE}/api/health`)
    expect(status).toBe(200)
    expect(body.version).toBe('2026.23')
  })

  test('routes_count is at least 228', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(body.routes_count).toBeGreaterThanOrEqual(228)
  })

  test('security block contains y_round', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(body.security?.y_round).toBeTruthy()
  })

  test('security block contains x_round, w_round, v_round', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(body.security?.x_round).toBeTruthy()
    expect(body.security?.w_round).toBeTruthy()
    expect(body.security?.v_round).toBeTruthy()
  })

  test('open_findings_count is 0', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(body.open_findings_count).toBe(0)
  })

  test('y_round_fixes array has ≥6 items', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(Array.isArray(body.y_round_fixes)).toBe(true)
    expect(body.y_round_fixes.length).toBeGreaterThanOrEqual(6)
  })

  test('x_round_fixes still present with ≥6 items', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(Array.isArray(body.x_round_fixes)).toBe(true)
    expect(body.x_round_fixes.length).toBeGreaterThanOrEqual(6)
  })

  test('security_score includes y_round = 100', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(body.security_score?.y_round).toBe(100)
  })

  test('security_score includes x_round and w_round = 100', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(body.security_score?.x_round).toBe(100)
    expect(body.security_score?.w_round).toBe(100)
  })
})

// ── Y-Round endpoints (unauthenticated → 401) ─────────────────────────────────
test.describe('Y-Round endpoints — expect 401 unauthenticated', () => {
  const yEndpoints = [
    { id: 'Y1', path: '/api/admin/platform-health-dashboard' },
    { id: 'Y2', path: '/api/payments/reconciliation-report' },
    { id: 'Y3', path: '/api/integrations/integration-status-board' },
    { id: 'Y4', path: '/api/auth/session-security-report' },
    { id: 'Y5', path: '/api/dpdp/audit-trail-export' },
    { id: 'Y6', path: '/api/compliance/policy-registry' },
  ]

  for (const { id, path } of yEndpoints) {
    test(`${id}: GET ${path} → 401`, async () => {
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

// ── W-Round backward compat ────────────────────────────────────────────────────
test.describe('W-Round backward compat — expect 401', () => {
  const wEndpoints = [
    { path: '/api/admin/d1-binding-health',           method: 'GET'  },
    { path: '/api/integrations/dns-deliverability-live', method: 'GET' },
    { path: '/api/auth/webauthn-credential-store',    method: 'GET'  },
    { path: '/api/compliance/gold-cert-signoff',      method: 'GET'  },
  ]
  for (const { path, method } of wEndpoints) {
    test(`${method} ${path} → 401`, async () => {
      const res = await fetch(`${BASE}${path}`, { method })
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
test.describe('Audit page — Y-Round content', () => {
  test('contains Y-Round', async () => {
    const { body } = await getHtml(`${BASE}/audit`)
    expect(body).toContain('Y-Round')
  })

  test('contains v2026.23', async () => {
    const { body } = await getHtml(`${BASE}/audit`)
    expect(body).toContain('2026.23')
  })

  test('shows 228 routes', async () => {
    const { body } = await getHtml(`${BASE}/audit`)
    expect(body).toContain('228')
  })

  test('contains platform-health-dashboard', async () => {
    const { body } = await getHtml(`${BASE}/audit`)
    expect(body).toContain('platform-health-dashboard')
  })

  test('contains policy-registry', async () => {
    const { body } = await getHtml(`${BASE}/audit`)
    expect(body).toContain('policy-registry')
  })
})

// ── Admin page ────────────────────────────────────────────────────────────────
test.describe('Admin page — Y-Round handlers', () => {
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
