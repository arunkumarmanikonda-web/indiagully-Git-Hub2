/**
 * BB-Round E2E Spec — v2026.26
 * Governance Intelligence & Operational Continuity
 *
 * Tests:
 *   - Health: version 2026.26, routes_count 246, bb_round flag, open_findings 0
 *   - BB-Round endpoints BB1–BB6: all return 401 unauthenticated
 *   - AA-Round & Z-Round backward compat: all still return 401
 *   - bb_round_fixes present with ≥6 items
 *   - Public pages: home, audit, CSRF token, admin login
 *   - Audit page: contains BB-Round, v2026.26, 246 routes
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
test.describe('Health endpoint — v2026.26', () => {
  test('version is 2026.26', async () => {
    const { status, body } = await getJson(`${BASE}/api/health`)
    expect(status).toBe(200)
    expect(body.version).toBe('2026.26')
  })

  test('routes_count is at least 246', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(body.routes_count).toBeGreaterThanOrEqual(246)
  })

  test('security block contains bb_round', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(body.security?.bb_round).toBeTruthy()
  })

  test('security block contains aa_round, z_round, y_round', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(body.security?.aa_round).toBeTruthy()
    expect(body.security?.z_round).toBeTruthy()
    expect(body.security?.y_round).toBeTruthy()
  })

  test('open_findings_count is 0', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(body.open_findings_count).toBe(0)
  })

  test('bb_round_fixes has at least 6 items', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(Array.isArray(body.bb_round_fixes)).toBe(true)
    expect(body.bb_round_fixes.length).toBeGreaterThanOrEqual(6)
  })

  test('aa_round_fixes has at least 6 items (backward compat)', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(Array.isArray(body.aa_round_fixes)).toBe(true)
    expect(body.aa_round_fixes.length).toBeGreaterThanOrEqual(6)
  })
})

// ── BB-Round endpoints (all 401 unauthenticated) ─────────────────────────────
test.describe('BB-Round endpoints — require auth', () => {
  const endpoints = [
    ['/api/governance/board-analytics',  'BB1'],
    ['/api/hr/payroll-compliance',        'BB2'],
    ['/api/contracts/sla-dashboard',      'BB3'],
    ['/api/auth/identity-lifecycle',      'BB4'],
    ['/api/dpdp/data-residency',          'BB5'],
    ['/api/compliance/bcp-status',        'BB6'],
  ] as const

  for (const [path, label] of endpoints) {
    test(`${label} ${path} returns 401`, async () => {
      const { status } = await getJson(`${BASE}${path}`)
      expect(status).toBe(401)
    })
  }
})

// ── AA-Round backward compat (all still 401) ─────────────────────────────────
test.describe('AA-Round backward compat', () => {
  const endpoints = [
    '/api/finance/cashflow-forecast',
    '/api/payments/fraud-signals',
    '/api/integrations/api-gateway-metrics',
    '/api/auth/zero-trust-scorecard',
    '/api/dpdp/data-map',
    '/api/compliance/risk-heatmap',
  ]

  for (const path of endpoints) {
    test(`${path} returns 401`, async () => {
      const { status } = await getJson(`${BASE}${path}`)
      expect(status).toBe(401)
    })
  }
})

// ── Z-Round backward compat ───────────────────────────────────────────────────
test.describe('Z-Round backward compat', () => {
  const endpoints = [
    '/api/admin/capacity-forecast',
    '/api/payments/chargeback-report',
    '/api/compliance/continuous-monitoring',
  ]

  for (const path of endpoints) {
    test(`${path} returns 401`, async () => {
      const { status } = await getJson(`${BASE}${path}`)
      expect(status).toBe(401)
    })
  }
})

// ── Public pages ──────────────────────────────────────────────────────────────
test.describe('Public pages', () => {
  test('home page returns 200 with India Gully', async () => {
    const { status, body } = await getHtml(`${BASE}/`)
    expect(status).toBe(200)
    expect(body).toContain('India Gully')
  })

  test('CSRF token returns 200', async () => {
    const { status } = await getJson(`${BASE}/api/auth/csrf-token`)
    expect(status).toBe(200)
  })

  test('admin login page returns 200', async () => {
    const { status, body } = await getHtml(`${BASE}/admin`)
    expect(status).toBe(200)
    expect(body).toContain('login')
  })

  test('audit page returns 200', async () => {
    const { status, body } = await getHtml(`${BASE}/audit`)
    expect(status).toBe(200)
    expect(body).toContain('India Gully')
  })
})

// ── Audit page content ────────────────────────────────────────────────────────
test.describe('Audit page — BB-Round content', () => {
  test('audit page contains BB-Round', async () => {
    const { body } = await getHtml(`${BASE}/audit`)
    expect(body).toContain('BB-Round')
  })

  test('audit page shows version 2026.26', async () => {
    const { body } = await getHtml(`${BASE}/audit`)
    expect(body).toContain('2026.26')
  })

  test('audit page shows 246 endpoints', async () => {
    const { body } = await getHtml(`${BASE}/audit`)
    expect(body).toContain('246')
  })

  test('audit page mentions board-analytics', async () => {
    const { body } = await getHtml(`${BASE}/audit`)
    expect(body).toContain('board-analytics')
  })

  test('audit page mentions bcp-status', async () => {
    const { body } = await getHtml(`${BASE}/audit`)
    expect(body).toContain('bcp-status')
  })
})

// ── Frontend checks ───────────────────────────────────────────────────────────
test.describe('Frontend — no CSP / JS errors', () => {
  test('home page has no strict-dynamic CSP blocking', async ({ page }) => {
    const errors: string[] = []
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()) })
    await page.goto(`${BASE}/`)
    await page.waitForLoadState('networkidle')
    const csp = errors.filter(e => e.includes('Content Security Policy') && e.includes('strict-dynamic'))
    expect(csp.length).toBe(0)
  })

  test('home page has no uncaught JavaScript errors', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', e => errors.push(e.message))
    await page.goto(`${BASE}/`)
    await page.waitForLoadState('networkidle')
    expect(errors.length).toBe(0)
  })
})
