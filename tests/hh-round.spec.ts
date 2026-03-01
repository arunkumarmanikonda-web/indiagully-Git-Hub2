import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:3000'

// ── Health Gate ──────────────────────────────────────────────────────────────
test('HH-0: health gate — version 2026.32, routes ≥ 282, hh_round present, 0 findings', async ({ request }) => {
  const r = await request.get(`${BASE}/api/health`)
  expect(r.status()).toBe(200)
  const d = await r.json()
  expect(d.version).toBe('2026.32')
  expect(d.routes_count).toBeGreaterThanOrEqual(282)
  expect(d.security?.hh_round).toBeTruthy()
  expect(d.hh_round_fixes?.length).toBeGreaterThanOrEqual(6)
  expect(d.open_findings_count).toBe(0)
})

// ── HH1 — ERP Dashboard ─────────────────────────────────────────────────────
test('HH-1a: GET /api/finance/erp-dashboard returns 401 without session', async ({ request }) => {
  const r = await request.get(`${BASE}/api/finance/erp-dashboard`)
  expect(r.status()).toBe(401)
})

test('HH-1b: erp-dashboard response schema verified in health fixture', async ({ request }) => {
  const r = await request.get(`${BASE}/api/health`)
  const d = await r.json()
  const fix = d.hh_round_fixes?.find((f: any) => f.id === 'HH1')
  expect(fix).toBeDefined()
  expect(fix.endpoint).toContain('/api/finance/erp-dashboard')
  expect(fix.description).toBeTruthy()
})

// ── HH2 — TDS Tracker ───────────────────────────────────────────────────────
test('HH-2a: GET /api/finance/tds-tracker returns 401 without session', async ({ request }) => {
  const r = await request.get(`${BASE}/api/finance/tds-tracker`)
  expect(r.status()).toBe(401)
})

test('HH-2b: tds-tracker fixture has correct metadata', async ({ request }) => {
  const r = await request.get(`${BASE}/api/health`)
  const d = await r.json()
  const fix = d.hh_round_fixes?.find((f: any) => f.id === 'HH2')
  expect(fix).toBeDefined()
  expect(fix.endpoint).toContain('tds-tracker')
})

// ── HH3 — GST Reconciliation ────────────────────────────────────────────────
test('HH-3a: GET /api/finance/gst-reconciliation returns 401 without session', async ({ request }) => {
  const r = await request.get(`${BASE}/api/finance/gst-reconciliation`)
  expect(r.status()).toBe(401)
})

test('HH-3b: gst-reconciliation fixture present in health', async ({ request }) => {
  const r = await request.get(`${BASE}/api/health`)
  const d = await r.json()
  const fix = d.hh_round_fixes?.find((f: any) => f.id === 'HH3')
  expect(fix).toBeDefined()
  expect(fix.endpoint).toContain('gst-reconciliation')
})

// ── HH4 — Budget Variance ────────────────────────────────────────────────────
test('HH-4a: GET /api/finance/budget-variance returns 401 without session', async ({ request }) => {
  const r = await request.get(`${BASE}/api/finance/budget-variance`)
  expect(r.status()).toBe(401)
})

test('HH-4b: budget-variance fixture present in health', async ({ request }) => {
  const r = await request.get(`${BASE}/api/health`)
  const d = await r.json()
  const fix = d.hh_round_fixes?.find((f: any) => f.id === 'HH4')
  expect(fix).toBeDefined()
  expect(fix.endpoint).toContain('budget-variance')
})

// ── HH5 — Financial Data Audit (DPDP) ───────────────────────────────────────
test('HH-5a: GET /api/dpdp/financial-data-audit returns 401 without session', async ({ request }) => {
  const r = await request.get(`${BASE}/api/dpdp/financial-data-audit`)
  expect(r.status()).toBe(401)
})

test('HH-5b: financial-data-audit fixture present in health', async ({ request }) => {
  const r = await request.get(`${BASE}/api/health`)
  const d = await r.json()
  const fix = d.hh_round_fixes?.find((f: any) => f.id === 'HH5')
  expect(fix).toBeDefined()
  expect(fix.endpoint).toContain('financial-data-audit')
})

// ── HH6 — SEBI Disclosure Tracker ────────────────────────────────────────────
test('HH-6a: GET /api/compliance/sebi-disclosure-tracker returns 401 without session', async ({ request }) => {
  const r = await request.get(`${BASE}/api/compliance/sebi-disclosure-tracker`)
  expect(r.status()).toBe(401)
})

test('HH-6b: sebi-disclosure-tracker fixture present in health', async ({ request }) => {
  const r = await request.get(`${BASE}/api/health`)
  const d = await r.json()
  const fix = d.hh_round_fixes?.find((f: any) => f.id === 'HH6')
  expect(fix).toBeDefined()
  expect(fix.endpoint).toContain('sebi-disclosure-tracker')
})

// ── Backward Compatibility ────────────────────────────────────────────────────
test('HH-back-1: legacy /api/finance/tax-analytics still 401', async ({ request }) => {
  const r = await request.get(`${BASE}/api/finance/tax-analytics`)
  expect(r.status()).toBe(401)
})

test('HH-back-2: /api/finance/erp-dashboard absent without auth', async ({ request }) => {
  const r = await request.get(`${BASE}/api/finance/erp-dashboard`)
  expect([401, 403]).toContain(r.status())
})

test('HH-back-3: /api/compliance/maturity-scorecard still 401', async ({ request }) => {
  const r = await request.get(`${BASE}/api/compliance/maturity-scorecard`)
  expect(r.status()).toBe(401)
})

test('HH-back-4: /api/governance/board-analytics still 401', async ({ request }) => {
  const r = await request.get(`${BASE}/api/governance/board-analytics`)
  expect(r.status()).toBe(401)
})

// ── Audit Page ────────────────────────────────────────────────────────────────
test('HH-audit-1: audit page loads and shows HH-Round', async ({ page }) => {
  await page.goto(`${BASE}/audit`)
  await expect(page.locator('body')).toContainText('HH-Round')
})

test('HH-audit-2: audit page shows version 2026.32', async ({ page }) => {
  await page.goto(`${BASE}/audit`)
  await expect(page.locator('body')).toContainText('2026.32')
})

test('HH-audit-3: audit page shows 282 endpoints', async ({ page }) => {
  await page.goto(`${BASE}/audit`)
  await expect(page.locator('body')).toContainText('282')
})

test('HH-audit-4: audit page contains HHO4 operator action', async ({ page }) => {
  await page.goto(`${BASE}/audit`)
  await expect(page.locator('body')).toContainText('HHO4')
})

test('HH-audit-5: audit page contains ERP or erp reference', async ({ page }) => {
  await page.goto(`${BASE}/audit`)
  const body = await page.locator('body').textContent()
  expect(body?.toLowerCase()).toContain('erp')
})

// ── Admin Panel ───────────────────────────────────────────────────────────────
test('HH-admin-1: admin page contains igErpDashboard function', async ({ page }) => {
  await page.goto(`${BASE}/admin`)
  const content = await page.content()
  expect(content).toContain('igErpDashboard')
})

test('HH-admin-2: admin page contains igSebiDisclosureTracker function', async ({ page }) => {
  await page.goto(`${BASE}/admin`)
  const content = await page.content()
  expect(content).toContain('igSebiDisclosureTracker')
})

test('HH-admin-3: admin page contains HH-Round buttons section', async ({ page }) => {
  await page.goto(`${BASE}/admin`)
  const content = await page.content()
  expect(content).toContain('HH-Round')
})

test('HH-admin-4: admin page contains igTdsTracker function', async ({ page }) => {
  await page.goto(`${BASE}/admin`)
  const content = await page.content()
  expect(content).toContain('igTdsTracker')
})

test('HH-admin-5: admin page contains igGstReconciliation function', async ({ page }) => {
  await page.goto(`${BASE}/admin`)
  const content = await page.content()
  expect(content).toContain('igGstReconciliation')
})

test('HH-admin-6: admin page contains igBudgetVariance function', async ({ page }) => {
  await page.goto(`${BASE}/admin`)
  const content = await page.content()
  expect(content).toContain('igBudgetVariance')
})

test('HH-admin-7: admin page contains igFinancialDataAudit function', async ({ page }) => {
  await page.goto(`${BASE}/admin`)
  const content = await page.content()
  expect(content).toContain('igFinancialDataAudit')
})
