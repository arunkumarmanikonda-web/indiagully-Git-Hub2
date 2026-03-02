import { test, expect } from '@playwright/test'
const BASE = process.env.BASE_URL || 'http://localhost:3000'
test.describe('LL-Round: Product & Engineering Intelligence (v2026.36)', () => {
  test('health gate: v2026.36, routes>=306, findings=0', async({request})=>{
    const d=await(await request.get(`${BASE}/api/health`)).json()
    expect(d.version).toBe('2026.36'); expect(d.routes_count).toBeGreaterThanOrEqual(306)
    expect(d.open_findings_count).toBe(0); expect(d.ll_round_fixes?.length).toBeGreaterThanOrEqual(6)
  })
  test('ll_round in security with score 100', async({request})=>{
    const d=await(await request.get(`${BASE}/api/health`)).json()
    expect(d.security?.ll_round).toBeDefined(); expect(d.security?.security_score?.ll_round).toBe(100)
  })
  for(const ep of['/api/product/roadmap-status','/api/product/sprint-velocity','/api/engineering/tech-debt','/api/engineering/incident-log','/api/dpdp/product-data-privacy','/api/compliance/sla-compliance']){
    test(`${ep} → 401`, async({request})=>{ expect((await request.get(`${BASE}${ep}`)).status()).toBe(401) })
  }
  test('audit page has LL markers', async({page})=>{
    await page.goto(`${BASE}/audit`); const b=await page.content()
    expect(b).toContain('LL-Round'); expect(b).toContain('2026.36'); expect(b).toContain('306'); expect(b).toContain('LLO4')
  })
  test('previous rounds intact aa-kk', async({request})=>{
    const d=await(await request.get(`${BASE}/api/health`)).json()
    for(const r of['aa','bb','cc','dd','ee','ff','gg','hh','ii','jj','kk','ll']) expect(d[`${r}_round_fixes`]).toBeTruthy()
  })
})
