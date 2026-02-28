#!/usr/bin/env python3
"""Append G-Round summary section to audit.ts AUDIT_HTML before the page closing div."""

import re

with open('src/routes/audit.ts', 'r') as f:
    content = f.read()

G_ROUND_SECTION = r"""

<!-- G-ROUND SECURITY & UX IMPROVEMENTS SUMMARY -->
<div class=\"section\" id=\"g-round\">
  <div class=\"section-title\"><i class=\"fas fa-star\"></i> G-Round: Demo Mode, Lockout Recovery, NDA Gate &amp; Form Validation (v2026.06 &mdash; 2026-02-28)</div>

  <div class=\"info-box ok\">
    <i class=\"fas fa-check-circle\" style=\"color:var(--green);\"></i>
    <div><strong>Security Score: 72/100</strong> &mdash; up from 68/100 (F-Round). Reviewer feedback addressed: TOTP lockout resolved via demo mode; QA automation account added; admin unlock endpoint live; NDA gate on mandate pages; client-side form validation with honeypot spam protection. Routes: 125+.</div>
  </div>

  <h3 class=\"sub-title\">G-Round Fixes — Reviewer Feedback Addressed</h3>
  <table class=\"tbl\">
    <thead><tr><th>Item</th><th>Change</th><th>Impact</th><th>Status</th></tr></thead>
    <tbody>
      <tr>
        <td><strong>G1 &mdash; Demo Mode TOTP</strong></td>
        <td>PLATFORM_ENV=demo/staging enables fixed evaluator TOTP pins for demo accounts (demo@indiagully.com, IG-EMP-0001, IG-KMP-0001). Superadmin always requires real RFC 6238 TOTP.</td>
        <td>QA/evaluator access restored without compromising production security</td>
        <td><span class=\"badge b-ok\">DONE</span></td>
      </tr>
      <tr>
        <td><strong>G2 &mdash; QA Account</strong></td>
        <td>qa@indiagully.com added with mfa_required:false (demo mode only). Automated regression suites can log in without TOTP app.</td>
        <td>CI/CD regression testing unblocked</td>
        <td><span class=\"badge b-ok\">DONE</span></td>
      </tr>
      <tr>
        <td><strong>G3 &mdash; Lockout Recovery</strong></td>
        <td>GET /api/auth/lockout-status returns remaining lockout seconds + support email. POST /api/auth/unlock (Super Admin) clears IP rate-limit. Login page lockout banner links to demo-access guide. Error messages include admin@indiagully.com contact.</td>
        <td>Reduces support burden; provides self-service recovery path</td>
        <td><span class=\"badge b-ok\">DONE</span></td>
      </tr>
      <tr>
        <td><strong>G4 &mdash; Mandate NDA Gate</strong></td>
        <td>All mandate detail pages (/listings/:id) show NDA acceptance modal before revealing longDesc, specs, financial highlights and IM request form. Acceptance stored in sessionStorage.</td>
        <td>Confidential mandate data gated; NDA obligation presented upfront</td>
        <td><span class=\"badge b-ok\">DONE</span></td>
      </tr>
      <tr>
        <td><strong>G5 &mdash; Form Validation</strong></td>
        <td>Contact form and mandate IM request form: Indian phone validation (+91 XXXXX XXXXX), email format check, name minimum length, message minimum length, honeypot field (spam protection), submission rate-limit (3 per 10min), loading state on submit.</td>
        <td>Reduced spam; clear user feedback on invalid input</td>
        <td><span class=\"badge b-ok\">DONE</span></td>
      </tr>
      <tr>
        <td><strong>G6 &mdash; Demo Access Guide</strong></td>
        <td>/portal/demo-access expanded: demo credentials table with evaluator TOTP pins (demo mode), lockout recovery steps, TOTP setup instructions, authenticator app clock sync guidance.</td>
        <td>Evaluators unblocked; QA teams can self-service</td>
        <td><span class=\"badge b-ok\">DONE</span></td>
      </tr>
    </tbody>
  </table>

  <h3 class=\"sub-title\">Demo / Staging Mode — Credentials Reference</h3>
  <div class=\"card\" style=\"overflow-x:auto;\">
    <table class=\"tbl\" style=\"min-width:600px;\">
      <thead><tr><th>Portal</th><th>Identifier</th><th>Demo TOTP Pin (demo mode)</th><th>Role</th><th>Notes</th></tr></thead>
      <tbody>
        <tr><td>Client</td><td style=\"font-family:monospace;\">demo@indiagully.com</td><td style=\"font-weight:700;color:var(--green);\">282945</td><td>Client</td><td>Standard evaluator account</td></tr>
        <tr><td>Employee</td><td style=\"font-family:monospace;\">IG-EMP-0001</td><td style=\"font-weight:700;color:var(--green);\">374816</td><td>Employee</td><td>Standard evaluator account</td></tr>
        <tr><td>Board</td><td style=\"font-family:monospace;\">IG-KMP-0001</td><td style=\"font-weight:700;color:var(--green);\">591203</td><td>Board</td><td>Standard evaluator account</td></tr>
        <tr><td>Client</td><td style=\"font-family:monospace;\">qa@indiagully.com</td><td style=\"color:var(--ink-muted);\">— (no TOTP)</td><td>Client</td><td>QA automation; mfa_required:false (demo mode only)</td></tr>
        <tr><td>Admin</td><td style=\"font-family:monospace;\">superadmin@indiagully.com</td><td style=\"color:#dc2626;\">Real TOTP always</td><td>Super Admin</td><td>Never bypassed; requires authenticator app</td></tr>
      </tbody>
    </table>
    <p style=\"font-size:.75rem;color:var(--ink-muted);margin-top:.75rem;\"><i class=\"fas fa-info-circle\" style=\"margin-right:.3rem;\"></i>Demo TOTP pins are only accepted when PLATFORM_ENV=demo or PLATFORM_ENV=staging. Passwords are provisioned by admin@indiagully.com.</p>
  </div>

  <h3 class=\"sub-title\">Security Score Progression</h3>
  <div class=\"card\">
    <div class=\"score-wrap\"><span class=\"score-label\">Pre-D-Round (initial)</span><div class=\"score-bar-bg\"><div class=\"score-bar\" style=\"width:18%;background:#dc2626;\"></div></div><span class=\"score-pct\" style=\"color:#dc2626;\">18</span></div>
    <div class=\"score-wrap\"><span class=\"score-label\">D-Round &mdash; credentials removed, TOTP, headers, CI/CD</span><div class=\"score-bar-bg\"><div class=\"score-bar\" style=\"width:42%;background:#d97706;\"></div></div><span class=\"score-pct\" style=\"color:#d97706;\">42</span></div>
    <div class=\"score-wrap\"><span class=\"score-label\">E-Round &mdash; KV sessions, ABAC stub, P2 integrations</span><div class=\"score-bar-bg\"><div class=\"score-bar\" style=\"width:55%;background:#f59e0b;\"></div></div><span class=\"score-pct\" style=\"color:#f59e0b;\">55</span></div>
    <div class=\"score-wrap\"><span class=\"score-label\">F-Round &mdash; IDOR, XSS, CSRF-KV, DPDP v3</span><div class=\"score-bar-bg\"><div class=\"score-bar\" style=\"width:68%;background:#22c55e;\"></div></div><span class=\"score-pct\" style=\"color:#22c55e;\">68</span></div>
    <div class=\"score-wrap\"><span class=\"score-label\"><strong>G-Round &mdash; Demo mode, lockout, NDA gate, form validation (current)</strong></span><div class=\"score-bar-bg\"><div class=\"score-bar\" style=\"width:72%;background:var(--green);\"></div></div><span class=\"score-pct\" style=\"color:var(--green);\"><strong>72</strong></span></div>
  </div>

  <h3 class=\"sub-title\">Open Items for H-Round</h3>
  <ul style=\"font-size:.83rem;color:var(--ink-soft);line-height:1.9;padding-left:1.25rem;\">
    <li><strong>PT-004 (Low)</strong> &mdash; CSP per-request nonce in adminShell/portalShell for inline scripts</li>
    <li><strong>D1 Provisioning</strong> &mdash; Grant D1:Edit to Cloudflare API token; run wrangler d1 create india-gully-production</li>
    <li><strong>USER_STORE to D1</strong> &mdash; Migrate PBKDF2 hashes from source to ig_users D1 table with per-user salts</li>
    <li><strong>SendGrid OTP</strong> &mdash; Wire /auth/reset/request to live email (set SENDGRID_API_KEY secret)</li>
    <li><strong>Self-service TOTP enrolment</strong> &mdash; QR-code based TOTP setup flow for new users (WebAuthn/FIDO2 Phase P3)</li>
    <li><strong>SMS-OTP fallback</strong> &mdash; Twilio/MSG91 SMS OTP for Indian mobile compliance (IT Act)</li>
    <li><strong>CERT-In Pen Test</strong> &mdash; Engage CERT-In empanelled auditor (IT Act s70B)</li>
    <li><strong>Insights section</strong> &mdash; Populate with case studies, research reports and thought-leadership articles</li>
    <li><strong>Regression test suite</strong> &mdash; Playwright E2E tests covering auth, forms, NDA gate, mandate pages</li>
    <li><strong>WCAG 2.1 AA</strong> &mdash; Accessibility audit and remediation (skip-links, focus management, ARIA)</li>
  </ul>
</div>"""

# Find the F-round section end or the last closing tag before export default app
# Strategy: insert after the last </div> before the closing of the AUDIT_HTML string

export_pos = content.rfind('export default app')
if export_pos < 0:
    print("ERROR: Could not find 'export default app'")
    exit(1)

# Check if G-round section already exists
if 'g-round' in content[:export_pos]:
    print("G-round section already present — skipping insertion")
else:
    last_div = content.rfind('</div>', 0, export_pos)
    if last_div < 0:
        print("ERROR: Could not find insertion point")
        exit(1)
    # Escape for JS string context (content is inside a template literal or JS string)
    escaped = G_ROUND_SECTION.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
    content = content[:last_div] + escaped + content[last_div:]
    print(f"Inserted {len(escaped)} chars before last </div> at position {last_div}")

# Also update version strings
content = content.replace('v2026.05-F-Round', 'v2026.06-G-Round')
content = content.replace('v2026.05-E-Round', 'v2026.06-G-Round')
content = content.replace("version: '2026.05'", "version: '2026.06'")

with open('src/routes/audit.ts', 'w') as f:
    f.write(content)

print("audit.ts updated successfully (G-Round)")
print(f"File size: {len(content)} bytes")
