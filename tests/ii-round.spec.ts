import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:3000'

// ── Health Gate ──────────────────────────────────────────────────────────────
test('II-0: health gate — version 2026.33, routes ≥ 288, ii_round present, 0 findings', async ({ request }) => {
  const r = await request.get(`${BASE}/api/health`)
  expect(r.status()).toBe(200)
  const d = await r.json()
  expect(d.version).toBe('2026.33')
  expect(d.routes_count).toBeGreaterThanOrEqual(288)
  expect(d.security?.ii_round).toBeTruthy()
  expect(d.ii_round_fixes?.length).toBeGreaterThanOrEqual(6)
  expect(d.open_findings_count).toBe(0)
})

// ── II1 — Contract Registry ──────────────────────────────────────────────────
test('II-1a: GET /api/legal/contract-registry returns 401 without session', async ({ request }) => {
  const r = await request.get(`${BASE}/api/legal/contract-registry`)
  expect(r.status()).toBe(401)
})

test('II-1b: contract-registry fixture present in health', async ({ request }) => {
  const r = await request.get(`${BASE}/api/health`)
  const d = await r.json()
  const fix = d.ii_round_fixes?.find((f: any) => f.id === 'II1')
  expect(fix).toBeDefined()
  expect(fix.endpoint).toContain('contract-registry')
})

// ── II2 — Litigation Tracker ─────────────────────────────────────────────────
test('II-2a: GET /api/legal/litigation-tracker returns 401 without session', async ({ request }) => {
  const r = await request.get(`${BASE}/api/legal/litigation-tracker`)
  expect(r.status()).toBe(401)
})

test('II-2b: litigation-tracker fixture present in health', async ({ request }) => {
  const r = await request.get(`${BASE}/api/health`)
  const d = await r.json()
  const fix = d.ii_round_fixes?.find((f: any) => f.id === 'II2')
  expect(fix).toBeDefined()
  expect(fix.endpoint).toContain('litigation-tracker')
})

// ── II3 — NDA Compliance ─────────────────────────────────────────────────────
test('II-3a: GET /api/legal/nda-compliance returns 401 without session', async ({ request }) => {
  const r = await request.get(`${BASE}/api/legal/nda-compliance`)
  expect(r.status()).toBe(401)
})

test('II-3b: nda-compliance fixture present in health', async ({ request }) => {
  const r = await request.get(`${BASE}/api/health`)
  const d = await r.json()
  const fix = d.ii_round_fixes?.find((f: any) => f.id === 'II3')
  expect(fix).toBeDefined()
  expect(fix.endpoint).toContain('nda-compliance')
})

// ── II4 — Regulatory Filings ─────────────────────────────────────────────────
test('II-4a: GET /api/compliance/regulatory-filings returns 401 without session', async ({ request }) => {
  const r = await request.get(`${BASE}/api/compliance/regulatory-filings`)
  expect(r.status()).toBe(401)
})

test('II-4b: regulatory-filings fixture present in health', async ({ request }) => {
  const r = await request.get(`${BASE}/api/health`)
  const d = await r.json()
  const fix = d.ii_round_fixes?.find((f: any) => f.id === 'II4')
  expect(fix).toBeDefined()
  expect(fix.endpoint).toContain('regulatory-filings')
})

// ── II5 — Data Processing Agreements ────────────────────────────────────────
test('II-5a: GET /api/dpdp/data-processing-agreements returns 401 without session', async ({ request }) => {
  const r = await request.get(`${BASE}/api/dpdp/data-processing-agreements`)
  expect(r.status()).toBe(401)
})

test('II-5b: data-processing-agreements fixture present in health', async ({ request }) => {
  const r = await request.get(`${BASE}/api/health`)
  const d = await r.json()
  const fix = d.ii_round_fixes?.find((f: any) => f.id === 'II5')
  expect(fix).toBeDefined()
  expect(fix.endpoint).toContain('data-processing-agreements')
})

// ── II6 — IP Portfolio ───────────────────────────────────────────────────────
test('II-6a: GET /api/legal/ip-portfolio returns 401 without session', async ({ request }) => {
  const r = await request.get(`${BASE}/api/legal/ip-portfolio`)
  expect(r.status()).toBe(401)
})

test('II-6b: ip-portfolio fixture present in health', async ({ request }) => {
  const r = await request.get(`${BASE}/api/health`)
  const d = await r.json()
  const fix = d.ii_round_fixes?.find((f: any) => f.id === 'II6')
  expect(fix).toBeDefined()
  expect(fix.endpoint).toContain('ip-portfolio')
})

// ── Backward Compatibility ───────────────────────────────────────────────────
test('II-back-1: /api/finance/erp-dashboard still 401', async ({ request }) => {
  const r = await request.get(`${BASE}/api/finance/erp-dashboard`)
  expect(r.status()).toBe(401)
})

test('II-back-2: /api/compliance/sebi-disclosure-tracker still 401', async ({ request }) => {
  const r = await request.get(`${BASE}/api/compliance/sebi-disclosure-tracker`)
  expect(r.status()).toBe(401)
})

test('II-back-3: /api/governance/board-analytics still 401', async ({ request }) => {
  const r = await request.get(`${BASE}/api/governance/board-analytics`)
  expect(r.status()).toBe(401)
})

test('II-back-4: /api/compliance/maturity-scorecard still 401', async ({ request }) => {
  const r = await request.get(`${BASE}/api/compliance/maturity-scorecard`)
  expect(r.status()).toBe(401)
})

// ── Audit Page ───────────────────────────────────────────────────────────────
test('II-audit-1: audit page loads and shows II-Round', async ({ page }) => {
  await page.goto(`${BASE}/audit`)
  await expect(page.locator('body')).toContainText('II-Round')
})

test('II-audit-2: audit page shows version 2026.33', async ({ page }) => {
  await page.goto(`${BASE}/audit`)
  await expect(page.locator('body')).toContainText('2026.33')
})

test('II-audit-3: audit page shows 288 endpoints', async ({ page }) => {
  await page.goto(`${BASE}/audit`)
  await expect(page.locator('body')).toContainText('288')
})

test('II-audit-4: audit page contains IIO4 operator action', async ({ page }) => {
  await page.goto(`${BASE}/audit`)
  await expect(page.locator('body')).toContainText('IIO4')
})

test('II-audit-5: audit page contains legal or contract reference', async ({ page }) => {
  await page.goto(`${BASE}/audit`)
  const body = await page.locator('body').textContent()
  const hasLegal = body?.toLowerCase().includes('contract') || body?.toLowerCase().includes('legal')
  expect(hasLegal).toBe(true)
})

// ── Admin Panel ──────────────────────────────────────────────────────────────
test('II-admin-1: admin page contains igContractRegistry function', async ({ page }) => {
  await page.goto(`${BASE}/admin`)
  const content = await page.content()
  expect(content).toContain('igContractRegistry')
})

test('II-admin-2: admin page contains igLitigationTracker function', async ({ page }) => {
  await page.goto(`${BASE}/admin`)
  const content = await page.content()
  expect(content).toContain('igLitigationTracker')
})

test('II-admin-3: admin page contains II-Round buttons section', async ({ page }) => {
  await page.goto(`${BASE}/admin`)
  const content = await page.content()
  expect(content).toContain('II-Round')
})

test('II-admin-4: admin page contains igNdaCompliance function', async ({ page }) => {
  await page.goto(`${BASE}/admin`)
  const content = await page.content()
  expect(content).toContain('igNdaCompliance')
})

test('II-admin-5: admin page contains igRegulatoryFilings function', async ({ page }) => {
  await page.goto(`${BASE}/admin`)
  const content = await page.content()
  expect(content).toContain('igRegulatoryFilings')
})

test('II-admin-6: admin page contains igDataProcessingAgreements function', async ({ request, page }) => {
  await page.goto(`${BASE}/admin`)
  const content = await page.content()
  expect(content).toContain('igDataProcessingAgreements')
})

test('II-admin-7: admin page contains igIpPortfolio function', async ({ page }) => {
  await page.goto(`${BASE}/admin`)
  const content = await page.content()
  expect(content).toContain('igIpPortfolio')
})
