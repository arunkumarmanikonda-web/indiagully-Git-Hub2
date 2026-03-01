/**
 * FF-Round E2E spec — v2026.30
 * Total routes: 270
 * Security flag: ff_round
 * Open findings: 0
 *
 * FF-Round endpoints (all return 401 unauthenticated):
 *   FF1  GET /api/hr/workforce-analytics
 *   FF2  GET /api/hr/attrition-risk
 *   FF3  GET /api/hr/training-effectiveness
 *   FF4  GET /api/admin/org-health-score
 *   FF5  GET /api/dpdp/employee-data-audit
 *   FF6  GET /api/compliance/labour-law-tracker
 */

import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:3000'

test('health: version=2026.30, routes>=270, ff_round present', async ({ request }) => {
  const r = await request.get(`${BASE}/api/health`)
  expect(r.status()).toBe(200)
  const d = await r.json()
  expect(d.version).toBe('2026.30')
  expect(d.routes_count).toBeGreaterThanOrEqual(270)
  expect(d).toHaveProperty('security.ff_round')
  expect(d).toHaveProperty('security.ee_round')
  expect(d).toHaveProperty('security.dd_round')
  expect(d).toHaveProperty('security.z_round')
  expect(d.open_findings).toBe(0)
})

test('health: ff_round_fixes has >= 6 items', async ({ request }) => {
  const r = await request.get(`${BASE}/api/health`)
  const d = await r.json()
  expect(Array.isArray(d.ff_round_fixes)).toBeTruthy()
  expect(d.ff_round_fixes.length).toBeGreaterThanOrEqual(6)
})

test('health: security_score.ff_round = 100', async ({ request }) => {
  const r = await request.get(`${BASE}/api/health`)
  const d = await r.json()
  expect(d.security_score?.ff_round).toBe(100)
})

test('FF1 GET /api/hr/workforce-analytics → 401', async ({ request }) => {
  expect((await request.get(`${BASE}/api/hr/workforce-analytics`)).status()).toBe(401)
})

test('FF2 GET /api/hr/attrition-risk → 401', async ({ request }) => {
  expect((await request.get(`${BASE}/api/hr/attrition-risk`)).status()).toBe(401)
})

test('FF3 GET /api/hr/training-effectiveness → 401', async ({ request }) => {
  expect((await request.get(`${BASE}/api/hr/training-effectiveness`)).status()).toBe(401)
})

test('FF4 GET /api/admin/org-health-score → 401', async ({ request }) => {
  expect((await request.get(`${BASE}/api/admin/org-health-score`)).status()).toBe(401)
})

test('FF5 GET /api/dpdp/employee-data-audit → 401', async ({ request }) => {
  expect((await request.get(`${BASE}/api/dpdp/employee-data-audit`)).status()).toBe(401)
})

test('FF6 GET /api/compliance/labour-law-tracker → 401', async ({ request }) => {
  expect((await request.get(`${BASE}/api/compliance/labour-law-tracker`)).status()).toBe(401)
})

// Backward compatibility
test('EE1 GET /api/product/feature-adoption → 401', async ({ request }) => {
  expect((await request.get(`${BASE}/api/product/feature-adoption`)).status()).toBe(401)
})

test('EE6 GET /api/compliance/innovation-pipeline → 401', async ({ request }) => {
  expect((await request.get(`${BASE}/api/compliance/innovation-pipeline`)).status()).toBe(401)
})

test('DD1 GET /api/vendors/risk-scorecard → 401', async ({ request }) => {
  expect((await request.get(`${BASE}/api/vendors/risk-scorecard`)).status()).toBe(401)
})

test('CC1 GET /api/finance/tax-analytics → 401', async ({ request }) => {
  expect((await request.get(`${BASE}/api/finance/tax-analytics`)).status()).toBe(401)
})

test('BB1 GET /api/governance/board-analytics → 401', async ({ request }) => {
  expect((await request.get(`${BASE}/api/governance/board-analytics`)).status()).toBe(401)
})

test('AA1 GET /api/finance/cashflow-forecast → 401', async ({ request }) => {
  expect((await request.get(`${BASE}/api/finance/cashflow-forecast`)).status()).toBe(401)
})

test('Z1 GET /api/admin/capacity-forecast → 401', async ({ request }) => {
  expect((await request.get(`${BASE}/api/admin/capacity-forecast`)).status()).toBe(401)
})

test('Z6 GET /api/compliance/continuous-monitoring → 401', async ({ request }) => {
  expect((await request.get(`${BASE}/api/compliance/continuous-monitoring`)).status()).toBe(401)
})

test('audit page contains FF-Round, 2026.30, 270', async ({ page }) => {
  await page.goto(`${BASE}/audit`)
  const body = await page.content()
  expect(body).toContain('FF-Round')
  expect(body).toContain('2026.30')
  expect(body).toContain('270')
})

test('CSRF token endpoint returns 200', async ({ request }) => {
  const r = await request.get(`${BASE}/api/auth/csrf-token`)
  expect(r.status()).toBe(200)
  expect((await r.json())).toHaveProperty('csrf_token')
})

test('admin login page has no JS errors', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', e => errors.push(e.message))
  await page.goto(`${BASE}/admin/login`)
  expect(errors.length).toBe(0)
})

test('no CSP violations on home page', async ({ page }) => {
  const violations: string[] = []
  page.on('console', msg => {
    if (msg.type() === 'error' && msg.text().includes('Content Security Policy')) violations.push(msg.text())
  })
  await page.goto(BASE)
  expect(violations.length).toBe(0)
})
