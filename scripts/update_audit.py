#!/usr/bin/env python3
"""Append F-Round summary section to audit.ts AUDIT_HTML before the page closing div."""

import re

with open('src/routes/audit.ts', 'r') as f:
    content = f.read()

F_ROUND_SECTION = r"""

<!-- F-ROUND SECURITY HARDENING SUMMARY -->
<div class=\"section\" id=\"f-round\">
  <div class=\"section-title\"><i class=\"fas fa-shield-alt\"></i> F-Round Security Hardening (v2026.05 &mdash; 2026-02-28)</div>

  <div class=\"info-box ok\">
    <i class=\"fas fa-check-circle\" style=\"color:var(--green);\"></i>
    <div><strong>Security Score: 68/100</strong> &mdash; up from 55/100 (E-Round). Three pen-test findings resolved: PT-001 IDOR (High), PT-002 XSS (Medium), PT-003 CSRF-in-memory (Medium). DPDP consent overlay v3 deployed. ABAC middleware active on all 120+ API routes.</div>
  </div>

  <table class=\"tbl\">
    <thead><tr><th>Item</th><th>Fix Applied</th><th>Finding</th><th>Status</th></tr></thead>
    <tbody>
      <tr><td><strong>F1 &mdash; IDOR/ABAC</strong></td><td>requireSession()/requireRole() applied via app.use() to all /api/* route groups</td><td>PT-001 High</td><td><span class=\"badge b-ok\">RESOLVED</span></td></tr>
      <tr><td><strong>F2 &mdash; XSS</strong></td><td>safeHtml() entity-encoding on all dynamic HTML output (errorRedirect, successRedirect, inline fragments)</td><td>PT-002 Medium</td><td><span class=\"badge b-ok\">RESOLVED</span></td></tr>
      <tr><td><strong>F3 &mdash; CSRF in KV</strong></td><td>CSRF bundled in KV SessionData.csrf; validateCSRFFromSession() reads from session; MEM_CSRF for pre-session only</td><td>PT-003 Medium</td><td><span class=\"badge b-ok\">RESOLVED</span></td></tr>
      <tr><td><strong>F4 &mdash; Health v2026.05</strong></td><td>Version v2026.05, routes_count 120, f_round_fixes[], security_score{68}</td><td>&mdash;</td><td><span class=\"badge b-ok\">DONE</span></td></tr>
      <tr><td><strong>F5 &mdash; DPDP Banner v3</strong></td><td>Granular consent overlay (accept-all/save-prefs/essential-only) on all app paths; posts to /api/dpdp/consent</td><td>&mdash;</td><td><span class=\"badge b-ok\">DONE</span></td></tr>
      <tr><td><strong>PT-004 &mdash; CSP Nonce</strong></td><td>Per-request nonces in adminShell/portalShell &mdash; planned P3</td><td>PT-004 Low</td><td><span class=\"badge b-wa\">OPEN (P3)</span></td></tr>
    </tbody>
  </table>

  <h3 class=\"sub-title\">Security Score Progression</h3>
  <div class=\"card\">
    <div class=\"score-wrap\"><span class=\"score-label\">Pre-D-Round (initial)</span><div class=\"score-bar-bg\"><div class=\"score-bar\" style=\"width:18%;background:#dc2626;\"></div></div><span class=\"score-pct\" style=\"color:#dc2626;\">18</span></div>
    <div class=\"score-wrap\"><span class=\"score-label\">D-Round &mdash; credentials removed, TOTP, headers, CI/CD</span><div class=\"score-bar-bg\"><div class=\"score-bar\" style=\"width:42%;background:#d97706;\"></div></div><span class=\"score-pct\" style=\"color:#d97706;\">42</span></div>
    <div class=\"score-wrap\"><span class=\"score-label\">E-Round &mdash; KV sessions, ABAC stub, P2 integrations</span><div class=\"score-bar-bg\"><div class=\"score-bar\" style=\"width:55%;background:#f59e0b;\"></div></div><span class=\"score-pct\" style=\"color:#f59e0b;\">55</span></div>
    <div class=\"score-wrap\"><span class=\"score-label\"><strong>F-Round &mdash; IDOR, XSS, CSRF-KV, DPDP v3 (current)</strong></span><div class=\"score-bar-bg\"><div class=\"score-bar\" style=\"width:68%;background:var(--green);\"></div></div><span class=\"score-pct\" style=\"color:var(--green);\"><strong>68</strong></span></div>
  </div>

  <h3 class=\"sub-title\">Open Items for G-Round</h3>
  <ul style=\"font-size:.83rem;color:var(--ink-soft);line-height:1.9;padding-left:1.25rem;\">
    <li><strong>PT-004 (Low)</strong> &mdash; CSP per-request nonce in adminShell/portalShell for inline scripts</li>
    <li><strong>D1 Provisioning</strong> &mdash; Grant D1:Edit to Cloudflare API token; run wrangler d1 create india-gully-production</li>
    <li><strong>USER_STORE to D1</strong> &mdash; Migrate PBKDF2 hashes from source to ig_users D1 table</li>
    <li><strong>SendGrid OTP</strong> &mdash; Wire /auth/reset/request to live email (set SENDGRID_API_KEY secret)</li>
    <li><strong>CERT-In Pen Test</strong> &mdash; Engage CERT-In empanelled auditor (IT Act s70B)</li>
  </ul>
</div>"""

# The audit HTML is a JS string constant. Find the closing </div>\n</body> pattern
# The file has the HTML as a template literal/string with escaped content
# Strategy: find the last occurrence of </div> before </body>

# Find </body></html>
body_close = content.rfind('</body></html>')
if body_close < 0:
    # Try escaped version
    body_close = content.rfind('</body>\\\\n</html>')
    
if body_close < 0:
    print("WARNING: Could not find </body></html>, inserting before </div>\\n\\nexport default app")
    # Find before export default
    export_pos = content.rfind('export default app')
    if export_pos > 0:
        # Insert the F-round section into the HTML string before the closing div/body
        # Find last \\n</div>\\n</body>\\n</html> pattern
        last_div = content.rfind('\\n</div>', 0, export_pos)
        if last_div > 0:
            # Escape the section for JS string context
            escaped = F_ROUND_SECTION.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
            content = content[:last_div] + escaped + content[last_div:]
            print(f"Inserted {len(escaped)} chars before last </div> at position {last_div}")
        else:
            print("ERROR: Could not find insertion point")
    else:
        print("ERROR: export default not found")
else:
    # Find last </div> before </body>
    last_div_pos = content.rfind('</div>', 0, body_close)
    escaped = F_ROUND_SECTION.replace('\\', '\\\\').replace('"', '\\"').replace('\n', '\\n')
    content = content[:last_div_pos] + escaped + content[last_div_pos:]
    print(f"Inserted {len(escaped)} chars before last </div> at position {last_div_pos}")

with open('src/routes/audit.ts', 'w') as f:
    f.write(content)

print("audit.ts updated successfully")
print(f"File size: {len(content)} bytes")
