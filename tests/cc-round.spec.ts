/**
 * CC-Round E2E Spec — v2026.27
 * Analytics Intelligence & Operational Metrics
 *
 * Tests:
 *   - Health: version 2026.27, routes_count 252, cc_round flag, open_findings 0
 *   - CC-Round endpoints CC1–CC6: all return 401 unauthenticated
 *   - BB-Round & AA-Round backward compat: all still return 401
 *   - cc_round_fixes present with ≥6 items
 *   - Public pages: home, audit, CSRF token, admin login
 *   - Audit page: contains CC-Round, v2026.27, 252 routes
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
test.describe('Health endpoint — v2026.27', () => {
  test('version is 2026.27', async () => {
    const { status, body } = await getJson(`${BASE}/api/health`)
    expect(status).toBe(200)
    expect(body.version).toBe('2026.27')
  })

  test('routes_count is at least 252', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(body.routes_count).toBeGreaterThanOrEqual(252)
  })

  test('security block contains cc_round', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(body.security?.cc_round).toBeTruthy()
  })

  test('security block contains bb_round, aa_round, z_round', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(body.security?.bb_round).toBeTruthy()
    expect(body.security?.aa_round).toBeTruthy()
    expect(body.security?.z_round).toBeTruthy()
  })

  test('open_findings_count is 0', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(body.open_findings_count).toBe(0)
  })

  test('cc_round_fixes has at least 6 items', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(Array.isArray(body.cc_round_fixes)).toBe(true)
    expect(body.cc_round_fixes.length).toBeGreaterThanOrEqual(6)
  })

  test('bb_round_fixes has at least 6 items (backward compat)', async () => {
    const { body } = await getJson(`${BASE}/api/health`)
    expect(Array.isArray(body.bb_round_fixes)).toBe(true)
    expect(body.bb_round_fixes.length).toBeGreaterThanOrEqual(6)
  })
})

// ── CC-Round endpoints (all 401 unauthenticated) ──────────────────────────────
test.describe('CC-Round endpoints — require auth', () => {
  const endpoints = [
    ['/api/finance/tax-analytics',                'CC1'],
    ['/api/payments/revenue-analytics',           'CC2'],
    ['/api/integrations/observability-dashboard', 'CC3'],
    ['/api/auth/access-pattern-report',           'CC4'],
    ['/api/dpdp/consent-analytics',               'CC5'],
    ['/api/compliance/maturity-scorecard',         'CC6'],
  ] as const

  for (const [path, label] of endpoints) {
    test(`${label} ${path} returns 401`, async () => {
      const { status } = await getJson(`${BASE}${path}`)
      expect(status).toBe(401)
    })
  }
})

// ── BB-Round backward compat ──────────────────────────────────────────────────
test.describe('BB-Round backward compat', () => {
  const endpoints = [
    '/api/governance/board-analytics',
    '/api/hr/payroll-compliance',
    '/api/contracts/sla-dashboard',
    '/api/auth/identity-lifecycle',
    '/api/dpdp/data-residency',
    '/api/compliance/bcp-status',
  ]

  for (const path of endpoints) {
    test(`${path} returns 401`, async () => {
      const { status } = await getJson(`${BASE}${path}`)
      expect(status).toBe(401)
    })
  }
})

// ── AA-Round backward compat ──────────────────────────────────────────────────
test.describe('AA-Round backward compat', () => {
  const endpoints = [
    '/api/finance/cashflow-forecast',
    '/api/payments/fraud-signals',
    '/api/compliance/risk-heatmap',
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
test.describe('Audit page — CC-Round content', () => {
  test('audit page contains CC-Round', async () => {
    const { body } = await getHtml(`${BASE}/audit`)
    expect(body).toContain('CC-Round')
  })

  test('audit page shows version 2026.27', async () => {
    const { body } = await getHtml(`${BASE}/audit`)
    expect(body).toContain('2026.27')
  })

  test('audit page shows 252 endpoints', async () => {
    const { body } = await getHtml(`${BASE}/audit`)
    expect(body).toContain('252')
  })

  test('audit page mentions tax-analytics', async () => {
    const { body } = await getHtml(`${BASE}/audit`)
    expect(body).toContain('tax-analytics')
  })

  test('audit page mentions maturity-scorecard', async () => {
    const { body } = await getHtml(`${BASE}/audit`)
    expect(body).toContain('maturity-scorecard')
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
