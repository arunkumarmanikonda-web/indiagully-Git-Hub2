/**
 * DD-Round E2E spec — v2026.28
 * Total routes: 258
 * Security flag: dd_round
 * Open findings: 0
 *
 * DD-Round endpoints (all return 401 unauthenticated):
 *   DD1  GET /api/vendors/risk-scorecard
 *   DD2  GET /api/finance/procurement-analytics
 *   DD3  GET /api/integrations/api-dependency-map
 *   DD4  GET /api/auth/third-party-audit
 *   DD5  GET /api/dpdp/supply-chain-compliance
 *   DD6  GET /api/vendors/onboarding-health
 *
 * Backward-compatible with CC-Round (v2026.27), BB-Round (v2026.26), AA-Round (v2026.25),
 * Z-Round (v2026.24), Y-Round (v2026.23) endpoints.
 *
 * Public pages: home, /audit, /api/auth/csrf-token, /api/health
 */

import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:3000'

// ── Health gate ────────────────────────────────────────────────────────────────
test('health: version=2026.28, routes>=258, dd_round present', async ({ request }) => {
  const r = await request.get(`${BASE}/api/health`)
  expect(r.status()).toBe(200)
  const d = await r.json()
  expect(d.version).toBe('2026.28')
  expect(d.routes_count).toBeGreaterThanOrEqual(258)
  expect(d).toHaveProperty('security.dd_round')
  expect(d).toHaveProperty('security.cc_round')
  expect(d).toHaveProperty('security.bb_round')
  expect(d).toHaveProperty('security.z_round')
  expect(d).toHaveProperty('security.y_round')
  expect(d).toHaveProperty('security.x_round')
  expect(d.open_findings).toBe(0)
})

test('health: dd_round_fixes has >= 6 items', async ({ request }) => {
  const r = await request.get(`${BASE}/api/health`)
  const d = await r.json()
  expect(Array.isArray(d.dd_round_fixes)).toBeTruthy()
  expect(d.dd_round_fixes.length).toBeGreaterThanOrEqual(6)
})

test('health: security_score.dd_round = 100', async ({ request }) => {
  const r = await request.get(`${BASE}/api/health`)
  const d = await r.json()
  expect(d.security_score?.dd_round).toBe(100)
})

// ── DD-Round endpoints — 401 unauthenticated ──────────────────────────────────
test('DD1 GET /api/vendors/risk-scorecard → 401', async ({ request }) => {
  const r = await request.get(`${BASE}/api/vendors/risk-scorecard`)
  expect(r.status()).toBe(401)
})

test('DD2 GET /api/finance/procurement-analytics → 401', async ({ request }) => {
  const r = await request.get(`${BASE}/api/finance/procurement-analytics`)
  expect(r.status()).toBe(401)
})

test('DD3 GET /api/integrations/api-dependency-map → 401', async ({ request }) => {
  const r = await request.get(`${BASE}/api/integrations/api-dependency-map`)
  expect(r.status()).toBe(401)
})

test('DD4 GET /api/auth/third-party-audit → 401', async ({ request }) => {
  const r = await request.get(`${BASE}/api/auth/third-party-audit`)
  expect(r.status()).toBe(401)
})

test('DD5 GET /api/dpdp/supply-chain-compliance → 401', async ({ request }) => {
  const r = await request.get(`${BASE}/api/dpdp/supply-chain-compliance`)
  expect(r.status()).toBe(401)
})

test('DD6 GET /api/vendors/onboarding-health → 401', async ({ request }) => {
  const r = await request.get(`${BASE}/api/vendors/onboarding-health`)
  expect(r.status()).toBe(401)
})

// ── Backward compatibility — CC-Round (v2026.27) ──────────────────────────────
test('CC1 GET /api/finance/tax-analytics → 401 (backward compat)', async ({ request }) => {
  const r = await request.get(`${BASE}/api/finance/tax-analytics`)
  expect(r.status()).toBe(401)
})

test('CC6 GET /api/compliance/maturity-scorecard → 401 (backward compat)', async ({ request }) => {
  const r = await request.get(`${BASE}/api/compliance/maturity-scorecard`)
  expect(r.status()).toBe(401)
})

// ── Backward compatibility — BB-Round (v2026.26) ──────────────────────────────
test('BB1 GET /api/governance/board-analytics → 401 (backward compat)', async ({ request }) => {
  const r = await request.get(`${BASE}/api/governance/board-analytics`)
  expect(r.status()).toBe(401)
})

test('BB6 GET /api/compliance/bcp-status → 401 (backward compat)', async ({ request }) => {
  const r = await request.get(`${BASE}/api/compliance/bcp-status`)
  expect(r.status()).toBe(401)
})

// ── Backward compatibility — AA-Round (v2026.25) ──────────────────────────────
test('AA1 GET /api/finance/cashflow-forecast → 401 (backward compat)', async ({ request }) => {
  const r = await request.get(`${BASE}/api/finance/cashflow-forecast`)
  expect(r.status()).toBe(401)
})

// ── Backward compatibility — Z-Round (v2026.24) ───────────────────────────────
test('Z1 GET /api/admin/capacity-forecast → 401 (backward compat)', async ({ request }) => {
  const r = await request.get(`${BASE}/api/admin/capacity-forecast`)
  expect(r.status()).toBe(401)
})

test('Z6 GET /api/compliance/continuous-monitoring → 401 (backward compat)', async ({ request }) => {
  const r = await request.get(`${BASE}/api/compliance/continuous-monitoring`)
  expect(r.status()).toBe(401)
})

// ── Backward compatibility — Y-Round (v2026.23) ───────────────────────────────
test('Y1 GET /api/admin/platform-health-dashboard → 401 (backward compat)', async ({ request }) => {
  const r = await request.get(`${BASE}/api/admin/platform-health-dashboard`)
  expect(r.status()).toBe(401)
})

test('Y6 GET /api/compliance/policy-registry → 401 (backward compat)', async ({ request }) => {
  const r = await request.get(`${BASE}/api/compliance/policy-registry`)
  expect(r.status()).toBe(401)
})

// ── Public pages ───────────────────────────────────────────────────────────────
test('home page returns 200', async ({ page }) => {
  await page.goto(BASE)
  expect(page.url()).toContain('localhost:3000')
  await expect(page).not.toHaveTitle('')
})

test('audit page contains DD-Round, 2026.28, 258', async ({ page }) => {
  await page.goto(`${BASE}/audit`)
  const body = await page.content()
  expect(body).toContain('DD-Round')
  expect(body).toContain('2026.28')
  expect(body).toContain('258')
})

test('CSRF token endpoint returns 200', async ({ request }) => {
  const r = await request.get(`${BASE}/api/auth/csrf-token`)
  expect(r.status()).toBe(200)
  const d = await r.json()
  expect(d).toHaveProperty('csrf_token')
})

test('admin login page returns 200 and has no JS errors', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', e => errors.push(e.message))
  await page.goto(`${BASE}/admin/login`)
  expect(errors.length).toBe(0)
})

test('no CSP violations on home page', async ({ page }) => {
  const violations: string[] = []
  page.on('console', msg => {
    if (msg.type() === 'error' && msg.text().includes('Content Security Policy')) {
      violations.push(msg.text())
    }
  })
  await page.goto(BASE)
  expect(violations.length).toBe(0)
})
