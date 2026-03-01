import { test, expect } from '@playwright/test'

const BASE = 'http://localhost:3000'

// ── Health Gate ──────────────────────────────────────────────────────────────
test('JJ-0: health gate — version 2026.34, routes ≥ 294, jj_round present, 0 findings', async ({ request }) => {
  const r = await request.get(`${BASE}/api/health`)
  expect(r.status()).toBe(200)
  const d = await r.json()
  expect(d.version).toBe('2026.34')
  expect(d.routes_count).toBeGreaterThanOrEqual(294)
  expect(d.security?.jj_round).toBeTruthy()
  expect(d.jj_round_fixes?.length).toBeGreaterThanOrEqual(6)
  expect(d.open_findings_count).toBe(0)
})

// ── JJ1 — Vulnerability Scan ─────────────────────────────────────────────────
test('JJ-1a: GET /api/security/vulnerability-scan returns 401 without session', async ({ request }) => {
  const r = await request.get(`${BASE}/api/security/vulnerability-scan`)
  expect(r.status()).toBe(401)
})
test('JJ-1b: vulnerability-scan fixture present in health', async ({ request }) => {
  const r = await request.get(`${BASE}/api/health`)
  const d = await r.json()
  const fix = d.jj_round_fixes?.find((f: any) => f.id === 'JJ1')
  expect(fix).toBeDefined()
  expect(fix.endpoint).toContain('vulnerability-scan')
})

// ── JJ2 — Penetration Test Report ────────────────────────────────────────────
test('JJ-2a: GET /api/security/penetration-test-report returns 401 without session', async ({ request }) => {
  const r = await request.get(`${BASE}/api/security/penetration-test-report`)
  expect(r.status()).toBe(401)
})
test('JJ-2b: penetration-test-report fixture present in health', async ({ request }) => {
  const r = await request.get(`${BASE}/api/health`)
  const d = await r.json()
  const fix = d.jj_round_fixes?.find((f: any) => f.id === 'JJ2')
  expect(fix).toBeDefined()
  expect(fix.endpoint).toContain('penetration-test-report')
})

// ── JJ3 — Cloud Cost Optimisation ────────────────────────────────────────────
test('JJ-3a: GET /api/infra/cloud-cost-optimisation returns 401 without session', async ({ request }) => {
  const r = await request.get(`${BASE}/api/infra/cloud-cost-optimisation`)
  expect(r.status()).toBe(401)
})
test('JJ-3b: cloud-cost-optimisation fixture present in health', async ({ request }) => {
  const r = await request.get(`${BASE}/api/health`)
  const d = await r.json()
  const fix = d.jj_round_fixes?.find((f: any) => f.id === 'JJ3')
  expect(fix).toBeDefined()
  expect(fix.endpoint).toContain('cloud-cost-optimisation')
})

// ── JJ4 — Access Review ──────────────────────────────────────────────────────
test('JJ-4a: GET /api/security/access-review returns 401 without session', async ({ request }) => {
  const r = await request.get(`${BASE}/api/security/access-review`)
  expect(r.status()).toBe(401)
})
test('JJ-4b: access-review fixture present in health', async ({ request }) => {
  const r = await request.get(`${BASE}/api/health`)
  const d = await r.json()
  const fix = d.jj_round_fixes?.find((f: any) => f.id === 'JJ4')
  expect(fix).toBeDefined()
  expect(fix.endpoint).toContain('access-review')
})

// ── JJ5 — Security Controls Audit ────────────────────────────────────────────
test('JJ-5a: GET /api/dpdp/security-controls-audit returns 401 without session', async ({ request }) => {
  const r = await request.get(`${BASE}/api/dpdp/security-controls-audit`)
  expect(r.status()).toBe(401)
})
test('JJ-5b: security-controls-audit fixture present in health', async ({ request }) => {
  const r = await request.get(`${BASE}/api/health`)
  const d = await r.json()
  const fix = d.jj_round_fixes?.find((f: any) => f.id === 'JJ5')
  expect(fix).toBeDefined()
  expect(fix.endpoint).toContain('security-controls-audit')
})

// ── JJ6 — ISO 27001 Tracker ──────────────────────────────────────────────────
test('JJ-6a: GET /api/compliance/iso27001-tracker returns 401 without session', async ({ request }) => {
  const r = await request.get(`${BASE}/api/compliance/iso27001-tracker`)
  expect(r.status()).toBe(401)
})
test('JJ-6b: iso27001-tracker fixture present in health', async ({ request }) => {
  const r = await request.get(`${BASE}/api/health`)
  const d = await r.json()
  const fix = d.jj_round_fixes?.find((f: any) => f.id === 'JJ6')
  expect(fix).toBeDefined()
  expect(fix.endpoint).toContain('iso27001-tracker')
})

// ── Backward Compatibility ────────────────────────────────────────────────────
test('JJ-back-1: /api/legal/contract-registry still 401', async ({ request }) => {
  const r = await request.get(`${BASE}/api/legal/contract-registry`)
  expect(r.status()).toBe(401)
})
test('JJ-back-2: /api/finance/erp-dashboard still 401', async ({ request }) => {
  const r = await request.get(`${BASE}/api/finance/erp-dashboard`)
  expect(r.status()).toBe(401)
})
test('JJ-back-3: /api/governance/board-analytics still 401', async ({ request }) => {
  const r = await request.get(`${BASE}/api/governance/board-analytics`)
  expect(r.status()).toBe(401)
})
test('JJ-back-4: /api/compliance/maturity-scorecard still 401', async ({ request }) => {
  const r = await request.get(`${BASE}/api/compliance/maturity-scorecard`)
  expect(r.status()).toBe(401)
})

// ── Audit Page ────────────────────────────────────────────────────────────────
test('JJ-audit-1: audit page shows JJ-Round', async ({ page }) => {
  await page.goto(`${BASE}/audit`)
  await expect(page.locator('body')).toContainText('JJ-Round')
})
test('JJ-audit-2: audit page shows version 2026.34', async ({ page }) => {
  await page.goto(`${BASE}/audit`)
  await expect(page.locator('body')).toContainText('2026.34')
})
test('JJ-audit-3: audit page shows 294 endpoints', async ({ page }) => {
  await page.goto(`${BASE}/audit`)
  await expect(page.locator('body')).toContainText('294')
})
test('JJ-audit-4: audit page contains JJO4 operator action', async ({ page }) => {
  await page.goto(`${BASE}/audit`)
  await expect(page.locator('body')).toContainText('JJO4')
})
test('JJ-audit-5: audit page contains security or vuln reference', async ({ page }) => {
  await page.goto(`${BASE}/audit`)
  const body = await page.locator('body').textContent()
  expect(body?.toLowerCase()).toMatch(/vuln|security|iso/i)
})

// ── Admin Panel ────────────────────────────────────────────────────────────────
test('JJ-admin-1: admin page contains igVulnerabilityScan', async ({ page }) => {
  await page.goto(`${BASE}/admin`)
  expect(await page.content()).toContain('igVulnerabilityScan')
})
test('JJ-admin-2: admin page contains igPentestReport', async ({ page }) => {
  await page.goto(`${BASE}/admin`)
  expect(await page.content()).toContain('igPentestReport')
})
test('JJ-admin-3: admin page contains JJ-Round section', async ({ page }) => {
  await page.goto(`${BASE}/admin`)
  expect(await page.content()).toContain('JJ-Round')
})
test('JJ-admin-4: admin page contains igCloudCostOptimisation', async ({ page }) => {
  await page.goto(`${BASE}/admin`)
  expect(await page.content()).toContain('igCloudCostOptimisation')
})
test('JJ-admin-5: admin page contains igAccessReview', async ({ page }) => {
  await page.goto(`${BASE}/admin`)
  expect(await page.content()).toContain('igAccessReview')
})
test('JJ-admin-6: admin page contains igSecurityControlsAudit', async ({ page }) => {
  await page.goto(`${BASE}/admin`)
  expect(await page.content()).toContain('igSecurityControlsAudit')
})
test('JJ-admin-7: admin page contains igIso27001Tracker', async ({ page }) => {
  await page.goto(`${BASE}/admin`)
  expect(await page.content()).toContain('igIso27001Tracker')
})
