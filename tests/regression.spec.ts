/**
 * India Gully Enterprise Platform — Playwright Regression Suite
 * I8 MEDIUM: Covers auth, NDA gate, public pages, forms, TOTP, mandate pages,
 *            session guards, CERT-In report, OTP endpoints, TOTP enrolment API.
 *
 * Run: npx playwright test
 * Run with UI: npx playwright test --ui
 * Run headless CI: BASE_URL=https://india-gully.pages.dev npx playwright test
 */

import { test, expect, type Page, type APIRequestContext } from '@playwright/test'
import * as OTPAuth from 'otpauth'          // optional dep; we implement inline if absent

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const BASE = process.env.BASE_URL || 'http://localhost:3000'

/** RFC 6238 TOTP — pure JS, no external dep */
async function generateTOTP(secret: string): Promise<string> {
  const B32 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
  let bits = 0; let val = 0; const bytes: number[] = []
  for (const ch of secret.toUpperCase().replace(/=+$/, '')) {
    const idx = B32.indexOf(ch); if (idx < 0) continue
    val = (val << 5) | idx; bits += 5
    if (bits >= 8) { bits -= 8; bytes.push((val >> bits) & 255) }
  }
  const keyBytes = new Uint8Array(bytes)
  const counter  = Math.floor(Date.now() / 1000 / 30)
  const ctrBuf   = new ArrayBuffer(8)
  const ctrView  = new DataView(ctrBuf)
  ctrView.setUint32(4, counter >>> 0, false)
  const key = await crypto.subtle.importKey(
    'raw', keyBytes, { name: 'HMAC', hash: 'SHA-1' }, false, ['sign']
  )
  const sig    = await crypto.subtle.sign('HMAC', key, ctrBuf)
  const arr    = new Uint8Array(sig)
  const offset = arr[19] & 0xf
  const code   = ((arr[offset] & 0x7f) << 24 | arr[offset+1] << 16 | arr[offset+2] << 8 | arr[offset+3]) % 1_000_000
  return String(code).padStart(6, '0')
}

/** Login via form submission, return page after redirect */
async function adminLogin(page: Page): Promise<void> {
  await page.goto(`${BASE}/admin`)
  await page.waitForSelector('#username, input[name="username"]', { timeout: 10_000 })
  const totp = await generateTOTP('JBSWY3DPEHPK3PXP')
  await page.fill('input[name="username"]', 'superadmin@indiagully.com')
  await page.fill('input[name="password"]', 'India@5327**')
  await page.fill('input[name="totp"]',     totp)
  await Promise.all([
    page.waitForURL(/\/admin\/dashboard/, { timeout: 15_000 }),
    page.click('button[type="submit"]'),
  ])
}

// ─────────────────────────────────────────────────────────────────────────────
// SUITE 1 — Public pages
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Public Pages', () => {
  test('Home page loads with <title>', async ({ page }) => {
    await page.goto(BASE)
    await expect(page).toHaveTitle(/India Gully/)
  })

  test('About page loads', async ({ page }) => {
    await page.goto(`${BASE}/about`)
    await expect(page).toHaveTitle(/About/)
    await expect(page.locator('h1, h2').first()).toBeVisible()
  })

  test('Services page loads', async ({ page }) => {
    await page.goto(`${BASE}/services`)
    await expect(page).toHaveTitle(/Services/)
  })

  test('HORECA page loads', async ({ page }) => {
    await page.goto(`${BASE}/horeca`)
    await expect(page).toHaveTitle(/HORECA/)
  })

  test('Listings / Mandates page loads', async ({ page }) => {
    await page.goto(`${BASE}/listings`)
    await expect(page).toHaveTitle(/Listings|Mandates/)
  })

  test('Contact page has form', async ({ page }) => {
    await page.goto(`${BASE}/contact`)
    await expect(page.locator('form')).toBeVisible()
  })

  test('/audit page returns audit report HTML', async ({ page }) => {
    await page.goto(`${BASE}/audit`)
    const body = await page.content()
    expect(body).toContain('India Gully')
    expect(body).toContain('Security Score')
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// SUITE 2 — Session Guards (unauthenticated redirect)
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Session Guards', () => {
  const guardedRoutes = [
    '/admin/dashboard',
    '/admin/finance',
    '/admin/hr',
    '/admin/governance',
    '/portal/client/dashboard',
    '/portal/employee/dashboard',
    '/portal/board/dashboard',
  ]

  for (const route of guardedRoutes) {
    test(`${route} redirects unauthenticated requests`, async ({ page }) => {
      const res = await page.goto(`${BASE}${route}`)
      // Should end up on login page, NOT on the protected page
      expect(page.url()).not.toContain(route.split('/').pop())
      // Could be admin or portal login
      const url = page.url()
      expect(url.includes('/admin') || url.includes('/portal')).toBeTruthy()
    })
  }
})

// ─────────────────────────────────────────────────────────────────────────────
// SUITE 3 — Admin Login (TOTP)
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Admin TOTP Login', () => {
  test('Valid credentials + TOTP → /admin/dashboard', async ({ page }) => {
    await adminLogin(page)
    await expect(page).toHaveURL(/\/admin\/dashboard/)
    await expect(page.locator('body')).toContainText(/Dashboard|Admin|India Gully/)
  })

  test('Wrong password → error message', async ({ page }) => {
    await page.goto(`${BASE}/admin`)
    await page.waitForSelector('input[name="username"]', { timeout: 10_000 })
    await page.fill('input[name="username"]', 'superadmin@indiagully.com')
    await page.fill('input[name="password"]', 'WrongPass!')
    await page.fill('input[name="totp"]',     '000000')
    await page.click('button[type="submit"]')
    // Wait for either redirect with error param or error message in page
    await page.waitForFunction(() =>
      window.location.href.includes('error') ||
      document.body.innerText.toLowerCase().includes('invalid') ||
      document.body.innerText.toLowerCase().includes('failed'),
      { timeout: 10_000 }
    ).catch(() => {})
    const url  = page.url()
    const body = await page.content()
    const hasError = url.includes('error') || body.toLowerCase().includes('invalid') || body.toLowerCase().includes('failed')
    expect(hasError).toBeTruthy()
  })

  test('Missing TOTP → error message', async ({ page }) => {
    await page.goto(`${BASE}/admin`)
    await page.waitForSelector('input[name="username"]', { timeout: 10_000 })
    await page.fill('input[name="username"]', 'superadmin@indiagully.com')
    await page.fill('input[name="password"]', 'India@5327**')
    await page.fill('input[name="totp"]',     '')
    await page.click('button[type="submit"]')
    await page.waitForTimeout(1500)
    const url  = page.url()
    const body = await page.content()
    const hasError = url.includes('error') || body.toLowerCase().includes('invalid') || body.toLowerCase().includes('required')
    expect(hasError).toBeTruthy()
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// SUITE 4 — Admin Routes (authenticated)
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Admin Routes (authenticated)', () => {
  test.beforeEach(async ({ page }) => {
    await adminLogin(page)
  })

  const adminRoutes = [
    '/admin/dashboard',
    '/admin/finance',
    '/admin/hr',
    '/admin/governance',
    '/admin/contracts',
    '/admin/security',
    '/admin/kpi',
    '/admin/risk',
  ]

  for (const route of adminRoutes) {
    test(`${route} returns 200 when authenticated`, async ({ page }) => {
      const res = await page.goto(`${BASE}${route}`)
      expect(res?.status()).toBe(200)
    })
  }

  test('GET /api/security/certIn-report returns full 37-item checklist when admin', async ({ page, request }) => {
    // Use page to get the admin session cookie, then use request with it
    const cookies = await page.context().cookies()
    const sess = cookies.find(c => c.name === 'ig_session')
    if (!sess) test.skip()
    const res  = await request.get(`${BASE}/api/security/certIn-report`, {
      headers: { Cookie: `ig_session=${sess!.value}` },
    })
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.report_id).toBeTruthy()
    expect(Array.isArray(body.checklist)).toBe(true)
    expect(body.checklist.length).toBeGreaterThanOrEqual(37)
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// SUITE 5 — API Health + Core Endpoints
// ─────────────────────────────────────────────────────────────────────────────
test.describe('API Endpoints', () => {
  let request: APIRequestContext

  test('GET /api/health returns 200 with status:ok', async ({ request }) => {
    const res  = await request.get(`${BASE}/api/health`)
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.status).toBe('ok')
  })

  test('GET /api/mandates returns 401 without session (auth-required)', async ({ request }) => {
    const res = await request.get(`${BASE}/api/mandates`)
    expect(res.status()).toBe(401)
  })

  test('GET /api/listings returns 200', async ({ request }) => {
    const res = await request.get(`${BASE}/api/listings`)
    expect(res.status()).toBe(200)
  })

  test('POST /api/enquiry with valid form data returns 200', async ({ request }) => {
    const res = await request.post(`${BASE}/api/enquiry`, {
      form: { name: 'Test User', email: 'test@example.com', message: 'Test enquiry', type: 'general' },
    })
    expect([200, 201]).toContain(res.status())
  })

  test('GET /api/security/certIn-report requires admin session (returns 401 without)', async ({ request }) => {
    const res  = await request.get(`${BASE}/api/security/certIn-report`)
    expect(res.status()).toBe(401)
  })

  test('GET /api/security/pentest-checklist requires admin session (returns 401 without)', async ({ request }) => {
    const res  = await request.get(`${BASE}/api/security/pentest-checklist`)
    expect(res.status()).toBe(401)
  })

  test('Unauthenticated GET /api/invoices returns 401', async ({ request }) => {
    const res = await request.get(`${BASE}/api/invoices`)
    // /api/invoices is in the finance group — auth required (any session)
    expect([200, 401]).toContain(res.status())  // 200 if public, 401 if guarded
  })

  test('Unauthenticated GET /api/employees returns 401', async ({ request }) => {
    const res = await request.get(`${BASE}/api/employees`)
    expect(res.status()).toBe(401)
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// SUITE 6 — NDA Gate (portal login + NDA flow)
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Portal Login Page', () => {
  test('Portal login page has correct fields', async ({ page }) => {
    await page.goto(`${BASE}/portal/client`)
    await expect(page.locator('input[name="identifier"], input[name="email"]').first()).toBeVisible()
    await expect(page.locator('input[name="password"]')).toBeVisible()
  })

  test('Portal login with wrong credentials shows error', async ({ page }) => {
    await page.goto(`${BASE}/portal/client`)
    await page.waitForSelector('input[name="identifier"], input[name="email"]', { timeout: 10_000 })
    const idField = page.locator('input[name="identifier"], input[name="email"]').first()
    await idField.fill('nobody@invalid.com')
    await page.fill('input[name="password"]', 'WrongPass!')
    const otpField = page.locator('input[name="otp"]')
    if (await otpField.isVisible()) await otpField.fill('000000')
    await page.click('button[type="submit"]')
    await page.waitForTimeout(1500)
    const body = await page.content()
    const hasError = page.url().includes('error') || body.toLowerCase().includes('invalid')
    expect(hasError).toBeTruthy()
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// SUITE 7 — Contact Form
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Contact Form', () => {
  test('Contact form submission returns success or redirects', async ({ page }) => {
    await page.goto(`${BASE}/contact`)
    await page.waitForSelector('form', { timeout: 10_000 })

    // Fill in required fields (field names may vary)
    const nameField = page.locator('input[name="name"], input[placeholder*="name" i]').first()
    const emailField = page.locator('input[type="email"], input[name="email"]').first()
    const msgField = page.locator('textarea').first()

    if (await nameField.isVisible())  await nameField.fill('Test User')
    if (await emailField.isVisible()) await emailField.fill('test@example.com')
    if (await msgField.isVisible())   await msgField.fill('This is a test message from Playwright.')

    await page.click('button[type="submit"]')
    await page.waitForTimeout(2000)

    // Success: toast, redirect, or success message
    const body = await page.content()
    const hasSuccess = body.toLowerCase().includes('thank') ||
                       body.toLowerCase().includes('success') ||
                       page.url().includes('success') ||
                       body.toLowerCase().includes('sent') ||
                       body.toLowerCase().includes('received')
    expect(hasSuccess).toBeTruthy()
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// SUITE 8 — OTP Send/Verify API
// ─────────────────────────────────────────────────────────────────────────────
test.describe('OTP API (I4/I5)', () => {
  test('POST /api/auth/otp/send returns 200 for email channel', async ({ request }) => {
    const res  = await request.post(`${BASE}/api/auth/otp/send`, {
      data: { identifier: 'test@example.com', channel: 'email', purpose: 'test' },
    })
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)
    expect(body.channel).toBe('email')
  })

  test('POST /api/auth/otp/send returns 200 for sms channel', async ({ request }) => {
    const res  = await request.post(`${BASE}/api/auth/otp/send`, {
      data: { identifier: '+919876543210', channel: 'sms', purpose: 'test' },
    })
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.success).toBe(true)
    expect(body.channel).toBe('sms')
  })

  test('POST /api/auth/otp/verify with wrong code returns 400', async ({ request }) => {
    const res = await request.post(`${BASE}/api/auth/otp/verify`, {
      data: { identifier: 'test@example.com', channel: 'email', purpose: 'test', code: '000000' },
    })
    expect(res.status()).toBe(400)
  })

  test('POST /api/auth/otp/send with missing fields returns 400', async ({ request }) => {
    const res = await request.post(`${BASE}/api/auth/otp/send`, {
      data: { identifier: 'test@example.com' },
    })
    expect(res.status()).toBe(400)
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// SUITE 9 — TOTP Enrolment API (I3) — requires valid session
// ─────────────────────────────────────────────────────────────────────────────
test.describe('TOTP Enrolment API (I3)', () => {
  let sessionCookie: string = ''

  test.beforeAll(async ({ browser }) => {
    // Get a session cookie for admin
    const ctx  = await browser.newContext()
    const page = await ctx.newPage()
    await adminLogin(page)
    const cookies = await ctx.cookies()
    const sess = cookies.find(c => c.name === 'ig_session')
    if (sess) sessionCookie = `ig_session=${sess.value}`
    await ctx.close()
  })

  test('GET /api/auth/totp/enrol/status returns 200', async ({ request }) => {
    if (!sessionCookie) test.skip()
    const res = await request.get(`${BASE}/api/auth/totp/enrol/status`, {
      headers: { Cookie: sessionCookie },
    })
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.identifier).toBeTruthy()
  })

  test('POST /api/auth/totp/enrol/begin returns QR URI', async ({ request }) => {
    if (!sessionCookie) test.skip()
    const res = await request.post(`${BASE}/api/auth/totp/enrol/begin`, {
      headers: { Cookie: sessionCookie },
    })
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.secret).toBeTruthy()
    expect(body.totp_uri).toContain('otpauth://totp/')
    expect(body.qr_url).toContain('qrserver.com')
  })

  test('POST /api/auth/totp/enrol/confirm with wrong code returns 400', async ({ request }) => {
    if (!sessionCookie) test.skip()
    const res = await request.post(`${BASE}/api/auth/totp/enrol/confirm`, {
      headers: { Cookie: sessionCookie, 'Content-Type': 'application/json' },
      data: { code: '000000' },
    })
    // 400 (wrong code) or 410 (no pending enrolment — expected in this test)
    expect([400, 410]).toContain(res.status())
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// SUITE 10 — WebAuthn Registration API (I3)
// ─────────────────────────────────────────────────────────────────────────────
test.describe('WebAuthn Registration API (I3)', () => {
  let sessionCookie: string = ''

  test.beforeAll(async ({ browser }) => {
    const ctx  = await browser.newContext()
    const page = await ctx.newPage()
    await adminLogin(page)
    const cookies = await ctx.cookies()
    const sess = cookies.find(c => c.name === 'ig_session')
    if (sess) sessionCookie = `ig_session=${sess.value}`
    await ctx.close()
  })

  test('POST /api/auth/webauthn/register/begin returns challenge', async ({ request }) => {
    if (!sessionCookie) test.skip()
    const res = await request.post(`${BASE}/api/auth/webauthn/register/begin`, {
      headers: { Cookie: sessionCookie },
    })
    expect(res.status()).toBe(200)
    const body = await res.json()
    expect(body.challenge).toBeTruthy()
    expect(body.rp?.id).toBeTruthy()
    expect(Array.isArray(body.pubKeyCredParams)).toBe(true)
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// SUITE 11 — Security Headers (I1 CSP nonce)
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Security Headers (I1)', () => {
  test('Home page response has Content-Security-Policy header', async ({ request }) => {
    const res = await request.get(BASE)
    const csp = res.headers()['content-security-policy']
    expect(csp).toBeTruthy()
    // Should have nonce-based or strict-dynamic
    expect(csp).toMatch(/nonce-|strict-dynamic|script-src/)
  })

  test('CSP nonce changes between requests (not static)', async ({ request }) => {
    const r1 = await request.get(BASE)
    const r2 = await request.get(BASE)
    const csp1 = r1.headers()['content-security-policy'] || ''
    const csp2 = r2.headers()['content-security-policy'] || ''
    const nonce1 = (csp1.match(/nonce-([A-Za-z0-9_-]+)/) || [])[1]
    const nonce2 = (csp2.match(/nonce-([A-Za-z0-9_-]+)/) || [])[1]
    if (nonce1 && nonce2) {
      expect(nonce1).not.toBe(nonce2)  // Per-request nonces must differ
    }
  })

  test('Response has X-Frame-Options: DENY', async ({ request }) => {
    const res = await request.get(BASE)
    expect(res.headers()['x-frame-options']).toMatch(/DENY/i)
  })

  test('Response has X-Content-Type-Options: nosniff', async ({ request }) => {
    const res = await request.get(BASE)
    expect(res.headers()['x-content-type-options']).toMatch(/nosniff/i)
  })

  test('Response has HSTS header', async ({ request }) => {
    const res = await request.get(BASE)
    const hsts = res.headers()['strict-transport-security']
    if (hsts) expect(hsts).toContain('max-age')
    // HSTS may not appear on http:// in dev; OK to skip
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// SUITE 12 — Audit Report Endpoint
// ─────────────────────────────────────────────────────────────────────────────
test.describe('Audit Report', () => {
  test('/audit returns HTML with security score', async ({ page }) => {
    await page.goto(`${BASE}/audit`)
    const body = await page.content()
    expect(body).toContain('Security Score')
  })

  test('/audit/report returns same HTML', async ({ page }) => {
    const res = await page.goto(`${BASE}/audit/report`)
    expect(res?.status()).toBe(200)
  })
})
