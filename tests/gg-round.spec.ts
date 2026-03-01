/**
 * GG-Round E2E spec — v2026.31
 * Total routes: 276 | Security flag: gg_round | Open findings: 0
 */
import { test, expect } from '@playwright/test'
const BASE = 'http://localhost:3000'

test('health: version=2026.31, routes>=276, gg_round present', async ({ request }) => {
  const r = await request.get(`${BASE}/api/health`)
  expect(r.status()).toBe(200)
  const d = await r.json()
  expect(d.version).toBe('2026.31')
  expect(d.routes_count).toBeGreaterThanOrEqual(276)
  expect(d).toHaveProperty('security.gg_round')
  expect(d).toHaveProperty('security.ff_round')
  expect(d).toHaveProperty('security.ee_round')
  expect(d).toHaveProperty('security.z_round')
  expect(d.open_findings).toBe(0)
})

test('health: gg_round_fixes >= 6', async ({ request }) => {
  const d = await (await request.get(`${BASE}/api/health`)).json()
  expect(Array.isArray(d.gg_round_fixes)).toBeTruthy()
  expect(d.gg_round_fixes.length).toBeGreaterThanOrEqual(6)
})

test('health: security_score.gg_round = 100', async ({ request }) => {
  const d = await (await request.get(`${BASE}/api/health`)).json()
  expect(d.security_score?.gg_round).toBe(100)
})

test('GG1 GET /api/crm/customer-health-scores → 401', async ({ request }) => {
  expect((await request.get(`${BASE}/api/crm/customer-health-scores`)).status()).toBe(401)
})
test('GG2 GET /api/crm/revenue-forecast → 401', async ({ request }) => {
  expect((await request.get(`${BASE}/api/crm/revenue-forecast`)).status()).toBe(401)
})
test('GG3 GET /api/crm/support-analytics → 401', async ({ request }) => {
  expect((await request.get(`${BASE}/api/crm/support-analytics`)).status()).toBe(401)
})
test('GG4 GET /api/crm/nps-cohort-analysis → 401', async ({ request }) => {
  expect((await request.get(`${BASE}/api/crm/nps-cohort-analysis`)).status()).toBe(401)
})
test('GG5 GET /api/dpdp/customer-data-lifecycle → 401', async ({ request }) => {
  expect((await request.get(`${BASE}/api/dpdp/customer-data-lifecycle`)).status()).toBe(401)
})
test('GG6 GET /api/compliance/consumer-protection-tracker → 401', async ({ request }) => {
  expect((await request.get(`${BASE}/api/compliance/consumer-protection-tracker`)).status()).toBe(401)
})

// Backward compat
test('FF1 /api/hr/workforce-analytics → 401', async ({ request }) => {
  expect((await request.get(`${BASE}/api/hr/workforce-analytics`)).status()).toBe(401)
})
test('FF6 /api/compliance/labour-law-tracker → 401', async ({ request }) => {
  expect((await request.get(`${BASE}/api/compliance/labour-law-tracker`)).status()).toBe(401)
})
test('EE1 /api/product/feature-adoption → 401', async ({ request }) => {
  expect((await request.get(`${BASE}/api/product/feature-adoption`)).status()).toBe(401)
})
test('DD1 /api/vendors/risk-scorecard → 401', async ({ request }) => {
  expect((await request.get(`${BASE}/api/vendors/risk-scorecard`)).status()).toBe(401)
})
test('AA1 /api/finance/cashflow-forecast → 401', async ({ request }) => {
  expect((await request.get(`${BASE}/api/finance/cashflow-forecast`)).status()).toBe(401)
})
test('Z1 /api/admin/capacity-forecast → 401', async ({ request }) => {
  expect((await request.get(`${BASE}/api/admin/capacity-forecast`)).status()).toBe(401)
})

test('audit page contains GG-Round, 2026.31, 276', async ({ page }) => {
  await page.goto(`${BASE}/audit`)
  const body = await page.content()
  expect(body).toContain('GG-Round')
  expect(body).toContain('2026.31')
  expect(body).toContain('276')
})

test('CSRF token returns 200 with token', async ({ request }) => {
  const r = await request.get(`${BASE}/api/auth/csrf-token`)
  expect(r.status()).toBe(200)
  expect(await r.json()).toHaveProperty('csrf_token')
})

test('admin login has no JS errors', async ({ page }) => {
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
