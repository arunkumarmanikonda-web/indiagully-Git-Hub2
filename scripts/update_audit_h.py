import re

with open('src/routes/audit.ts', 'r') as f:
    content = f.read()

H_ROUND_HTML = '''
    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <!-- H-ROUND  ·  v2026.06-H  ·  Security Score 78/100                  -->
    <!-- ═══════════════════════════════════════════════════════════════════ -->
    <div style="background:#fff;border:1px solid var(--border);margin-bottom:1.5rem;">
      <div style="background:linear-gradient(135deg,#0c1a0c,#1a2e1a);padding:1.25rem 1.75rem;display:flex;justify-content:space-between;align-items:center;">
        <div>
          <div style="font-size:.6rem;letter-spacing:.2em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:.3rem;">Audit Round</div>
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:1.25rem;color:#fff;">H-Round · v2026.06-H</div>
          <div style="font-size:.72rem;color:rgba(255,255,255,.5);margin-top:.15rem;">TOTP Base32 Fix · Session Guards · Real API Wiring</div>
        </div>
        <div style="text-align:right;">
          <div style="font-family:'DM Serif Display',Georgia,serif;font-size:2.5rem;color:#22c55e;line-height:1;">78</div>
          <div style="font-size:.62rem;color:rgba(255,255,255,.4);letter-spacing:.1em;text-transform:uppercase;">/100 Security Score</div>
        </div>
      </div>
      <div style="padding:1.5rem 1.75rem;">
        <!-- Score progression -->
        <div style="margin-bottom:1.5rem;">
          <div style="font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.875rem;">Score Progression</div>
          <div style="display:flex;flex-direction:column;gap:.5rem;">
            ${[
              {round:'D-Round', score:42, w:'18%', c:'#dc2626'},
              {round:'E-Round', score:55, w:'42%', c:'#d97706'},
              {round:'F-Round', score:68, w:'55%', c:'#d97706'},
              {round:'G-Round', score:72, w:'68%', c:'#d97706'},
              {round:'H-Round', score:78, w:'78%', c:'#22c55e'},
            ].map(r=>`
            <div style="display:flex;align-items:center;gap:.75rem;">
              <span style="font-size:.7rem;color:var(--ink-muted);width:60px;flex-shrink:0;">${r.round}</span>
              <div style="flex:1;background:#f1f5f9;height:8px;border-radius:4px;overflow:hidden;">
                <div style="height:100%;background:${r.c};width:${r.w};border-radius:4px;"></div>
              </div>
              <span style="font-size:.78rem;font-weight:700;color:${r.c};width:36px;">${r.score}</span>
            </div>`).join('')}
          </div>
        </div>

        <!-- H-Round findings resolved -->
        <div style="margin-bottom:1.5rem;">
          <div style="font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.875rem;">H-Round Fixes</div>
          <table class="ig-tbl">
            <thead><tr><th>ID</th><th>Finding</th><th>Severity</th><th>Fix Applied</th><th>Status</th></tr></thead>
            <tbody>
              <tr>
                <td style="font-weight:700;color:var(--gold);">H1</td>
                <td>TOTP RFC 6238 Base32 bug — server used TextEncoder (wrong UTF-8 bytes) instead of Base32 decode; client auto-fill generated codes that never matched authenticator apps</td>
                <td><span class="badge b-re">CRITICAL</span></td>
                <td>Added <code>base32Decode()</code> to server <code>computeHOTP()</code> in api.tsx; updated client-side TOTP auto-fill in admin.tsx with matching <code>b32decode()</code></td>
                <td><span class="badge b-gr">Resolved</span></td>
              </tr>
              <tr>
                <td style="font-weight:700;color:var(--gold);">H2</td>
                <td>No server-side session guard on admin and portal sub-routes — all dashboard pages accessible without authentication</td>
                <td><span class="badge b-re">HIGH</span></td>
                <td>Added <code>app.use('/*')</code> middleware in admin.tsx and portal.tsx; unauthenticated requests redirect to login with error message; public paths whitelisted</td>
                <td><span class="badge b-gr">Resolved</span></td>
              </tr>
              <tr>
                <td style="font-weight:700;color:var(--gold);">H3</td>
                <td>Admin portal pages fully static — no real data from backend; all actions were toast stubs; Finance/HR/Governance/Contracts/BI/Security/KPI/Risk/Integrations showed hardcoded data</td>
                <td><span class="badge b-g">MEDIUM</span></td>
                <td>Added <code>window.igApi</code> fetch client to adminShell; wired all admin pages to real API endpoints (/api/finance/summary, /api/invoices, /api/employees, /api/governance/resolutions, /api/contracts/expiring, /api/kpi/summary, /api/risk/mandates, /api/security/pentest-checklist, /api/abac/matrix, /api/architecture/microservices); sign-out wired to POST /api/auth/logout</td>
                <td><span class="badge b-gr">Resolved</span></td>
              </tr>
              <tr>
                <td style="font-weight:700;color:var(--gold);">H4</td>
                <td>Admin login TOTP auto-fill also used TextEncoder — codes generated by client never matched server (or authenticator app)</td>
                <td><span class="badge b-re">CRITICAL</span></td>
                <td>Replaced TextEncoder with proper Base32 decode in client-side <code>computeHOTP()</code> in admin login page; now generates codes matching both server and RFC 6238 authenticator apps</td>
                <td><span class="badge b-gr">Resolved</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Open I-Round items -->
        <div>
          <div style="font-size:.72rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-muted);margin-bottom:.875rem;">Open Items → I-Round</div>
          <table class="ig-tbl">
            <thead><tr><th>ID</th><th>Item</th><th>Priority</th></tr></thead>
            <tbody>
              <tr><td>I1</td><td>PT-004 — CSP per-request nonce on inline scripts</td><td><span class="badge b-g">Low</span></td></tr>
              <tr><td>I2</td><td>D1 provisioning — create <code>india-gully-production</code> D1, migrate USER_STORE hashes</td><td><span class="badge b-re">High</span></td></tr>
              <tr><td>I3</td><td>Self-service TOTP enrolment — QR code + WebAuthn/FIDO2</td><td><span class="badge b-g">Medium</span></td></tr>
              <tr><td>I4</td><td>SendGrid OTP — integrate with /auth/reset/request</td><td><span class="badge b-g">Medium</span></td></tr>
              <tr><td>I5</td><td>SMS-OTP fallback — Twilio/MSG91 for Indian compliance</td><td><span class="badge b-g">Medium</span></td></tr>
              <tr><td>I6</td><td>CERT-In penetration test engagement per IT Act §70B</td><td><span class="badge b-re">High</span></td></tr>
              <tr><td>I7</td><td>Insights section — populate with real case studies & thought-leadership</td><td><span class="badge b-g">Low</span></td></tr>
              <tr><td>I8</td><td>Playwright regression suite — auth, NDA gate, forms, mandate pages, TOTP</td><td><span class="badge b-g">Medium</span></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
'''

# Insert before last </div>
idx = content.rfind('</div>')
if idx == -1:
    print("ERROR: Could not find closing </div>")
    exit(1)

new_content = content[:idx] + H_ROUND_HTML + content[idx:]

with open('src/routes/audit.ts', 'w') as f:
    f.write(new_content)

print(f"audit.ts updated successfully. Size: {len(new_content)} bytes")
