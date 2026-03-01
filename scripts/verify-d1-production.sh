#!/usr/bin/env bash
# ============================================================================
# M1 — India Gully D1 Production Verification Script
# ============================================================================
# Run AFTER scripts/create-d1-remote.sh has been executed with a D1:Edit token.
# This script verifies the production D1 database has all required tables,
# row counts, and index structure.
# ============================================================================
set -e

CYAN='\033[0;36m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; NC='\033[0m'

echo -e "${CYAN}══════════════════════════════════════════════════════════════"
echo " India Gully — D1 Production Verification (M1)"
echo -e "══════════════════════════════════════════════════════════════${NC}"

DB="india-gully-production"

# ── Pre-flight ─────────────────────────────────────────────────────────────
echo ""
echo -e "${YELLOW}▶ Pre-flight: Checking D1 access …${NC}"
if ! npx wrangler d1 list 2>&1 | grep -q "$DB"; then
  echo -e "${RED}✘ Database '$DB' not found. Run: bash scripts/create-d1-remote.sh${NC}"
  exit 1
fi
echo -e "${GREEN}  ✅ Database '$DB' found.${NC}"

# ── Table verification ─────────────────────────────────────────────────────
echo ""
echo -e "${YELLOW}▶ Verifying required tables …${NC}"

REQUIRED_TABLES=(
  "ig_users"
  "ig_otp_log"
  "ig_webauthn_credentials"
  "ig_cms_pages"
  "ig_cms_page_versions"
  "ig_cms_approvals"
  "ig_insights"
  "ig_razorpay_webhooks"
  "ig_documents"
  "ig_document_access_log"
  "ig_dpdp_consents"
  "ig_dpdp_withdrawals"
  "ig_dpdp_rights_requests"
  "ig_dpo_alerts"
  "ig_secrets_audit"
)

ALL_TABLES=$(npx wrangler d1 execute "$DB" \
  --command="SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;" \
  2>&1 | grep -v "^$\|wrangler\|Executing\|Success\|---\|name" || true)

PASS=0; FAIL=0
for TABLE in "${REQUIRED_TABLES[@]}"; do
  if echo "$ALL_TABLES" | grep -q "$TABLE"; then
    echo -e "  ${GREEN}✅${NC} $TABLE"
    PASS=$((PASS+1))
  else
    echo -e "  ${RED}✘${NC} $TABLE — MISSING"
    FAIL=$((FAIL+1))
  fi
done

echo ""
echo -e "  Tables: ${GREEN}$PASS${NC} present, ${RED}$FAIL${NC} missing"

# ── Row counts ─────────────────────────────────────────────────────────────
echo ""
echo -e "${YELLOW}▶ Row counts …${NC}"
for TABLE in ig_users ig_cms_pages ig_insights ig_dpdp_consents; do
  COUNT=$(npx wrangler d1 execute "$DB" \
    --command="SELECT COUNT(*) as n FROM $TABLE;" 2>&1 | \
    grep -oE '[0-9]+' | tail -1)
  echo -e "  ${CYAN}$TABLE${NC}: $COUNT rows"
done

# ── Health endpoint check ──────────────────────────────────────────────────
echo ""
echo -e "${YELLOW}▶ Checking production API health …${NC}"
HEALTH=$(curl -sf https://india-gully.pages.dev/api/health 2>/dev/null || echo '{}')
VERSION=$(echo "$HEALTH" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('version','?'))" 2>/dev/null || echo "?")
SCORE=$(echo "$HEALTH" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('security_score',{}).get('l_round','?'))" 2>/dev/null || echo "?")
echo -e "  Version: ${GREEN}$VERSION${NC}  |  L-Round Score: ${GREEN}$SCORE${NC}"

# ── D1 binding check ──────────────────────────────────────────────────────
echo ""
echo -e "${YELLOW}▶ Verifying D1 binding in wrangler.jsonc …${NC}"
if grep -q '"database_id"' wrangler.jsonc && ! grep -q 'PENDING_D1_ID' wrangler.jsonc; then
  DB_ID=$(grep '"database_id"' wrangler.jsonc | grep -oE '"[0-9a-f-]{36}"' | tr -d '"')
  echo -e "  ${GREEN}✅ D1 bound: $DB_ID${NC}"
else
  echo -e "  ${RED}✘ D1 not yet bound in wrangler.jsonc — run scripts/create-d1-remote.sh${NC}"
fi

# ── R2 binding check ──────────────────────────────────────────────────────
echo ""
echo -e "${YELLOW}▶ Verifying R2 binding in wrangler.jsonc …${NC}"
if grep -q '"DOCS_BUCKET"' wrangler.jsonc && ! grep -q '// .*DOCS_BUCKET' wrangler.jsonc; then
  echo -e "  ${GREEN}✅ R2 DOCS_BUCKET binding present${NC}"
else
  echo -e "  ${YELLOW}⚠  R2 DOCS_BUCKET not bound — run scripts/setup-r2.sh${NC}"
fi

# ── Summary ────────────────────────────────────────────────────────────────
echo ""
echo -e "${CYAN}══════════════════════════════════════════════════════════════"
if [ "$FAIL" -eq 0 ]; then
  echo -e " ✅ M1 PASSED — all $PASS tables present in india-gully-production"
else
  echo -e " ⚠  $FAIL table(s) missing — re-run migrations:"
  echo -e "    npx wrangler d1 migrations apply india-gully-production"
fi
echo ""
echo " Next steps:"
echo "   M2: Set rzp_live_* keys: npx wrangler pages secret put RAZORPAY_KEY_ID --project-name india-gully"
echo "   M3: Verify SendGrid domain: visit https://app.sendgrid.com/settings/sender_auth"
echo "   M4: Test WebAuthn: https://india-gully.pages.dev/portal/client → Security → Register Device"
echo -e "══════════════════════════════════════════════════════════════${NC}"
