#!/usr/bin/env bash
# ============================================================================
# K2 — India Gully Live Secrets Setup
# ============================================================================
# Sets live Razorpay, SendGrid and Twilio secrets on Cloudflare Pages.
# Run AFTER receiving live API keys from each provider.
#
# Usage: bash scripts/set-secrets.sh
#
# Environment variables you can pre-set to avoid interactive prompts:
#   RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET, RAZORPAY_WEBHOOK_SECRET
#   SENDGRID_API_KEY
#   TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_FROM_NUMBER
#   JWT_SECRET, TOTP_ENCRYPT_KEY
#   DOCUSIGN_API_KEY, DOCUSIGN_ACCOUNT_ID
# ============================================================================
set -e

PROJECT="india-gully"
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${CYAN}══════════════════════════════════════════════════════════════"
echo " India Gully — Live Secrets Setup (K2)"
echo -e "══════════════════════════════════════════════════════════════${NC}"

# Helper: set a secret interactively or from env var
set_secret() {
  local NAME="$1"
  local PROMPT="$2"
  local ENV_VAR="$3"
  local VALUE="${!ENV_VAR}"

  if [ -n "$VALUE" ]; then
    echo "$VALUE" | npx wrangler pages secret put "$NAME" --project-name "$PROJECT" 2>&1 | grep -v "^$"
    echo -e "${GREEN}  ✅ $NAME set from environment.${NC}"
  else
    echo ""
    echo -e "${YELLOW}  Enter $PROMPT (leave blank to skip):${NC}"
    read -rs VALUE
    if [ -n "$VALUE" ]; then
      echo "$VALUE" | npx wrangler pages secret put "$NAME" --project-name "$PROJECT" 2>&1 | grep -v "^$"
      echo -e "${GREEN}  ✅ $NAME set.${NC}"
    else
      echo -e "${YELLOW}  ⚠  $NAME skipped.${NC}"
    fi
  fi
}

# ── Section 1: Platform Secrets ────────────────────────────────────────────
echo ""
echo -e "${YELLOW}▶ Platform Secrets${NC}"
set_secret "JWT_SECRET"         "JWT signing secret (min 32 chars)"     "JWT_SECRET"
set_secret "TOTP_ENCRYPT_KEY"   "TOTP encryption key (32 hex chars)"    "TOTP_ENCRYPT_KEY"

# ── Section 2: Razorpay ────────────────────────────────────────────────────
echo ""
echo -e "${YELLOW}▶ Razorpay (Payment Gateway)${NC}"
echo "   Get from: https://dashboard.razorpay.com/app/keys"
set_secret "RAZORPAY_KEY_ID"         "Razorpay Key ID (rzp_live_...)"        "RAZORPAY_KEY_ID"
set_secret "RAZORPAY_KEY_SECRET"     "Razorpay Key Secret"                   "RAZORPAY_KEY_SECRET"
set_secret "RAZORPAY_WEBHOOK_SECRET" "Razorpay Webhook Secret"               "RAZORPAY_WEBHOOK_SECRET"

# ── Section 3: SendGrid ───────────────────────────────────────────────────
echo ""
echo -e "${YELLOW}▶ SendGrid (Transactional Email)${NC}"
echo "   Get from: https://app.sendgrid.com/settings/api_keys"
set_secret "SENDGRID_API_KEY"    "SendGrid API Key (SG.xxx...)"          "SENDGRID_API_KEY"

# ── Section 4: Twilio ─────────────────────────────────────────────────────
echo ""
echo -e "${YELLOW}▶ Twilio (SMS OTP)${NC}"
echo "   Get from: https://console.twilio.com"
set_secret "TWILIO_ACCOUNT_SID"  "Twilio Account SID (ACxxx...)"         "TWILIO_ACCOUNT_SID"
set_secret "TWILIO_AUTH_TOKEN"   "Twilio Auth Token"                     "TWILIO_AUTH_TOKEN"
set_secret "TWILIO_FROM_NUMBER"  "Twilio From Number (e.g. +14155552671)" "TWILIO_FROM_NUMBER"

# ── Section 5: DocuSign ───────────────────────────────────────────────────
echo ""
echo -e "${YELLOW}▶ DocuSign (e-Signatures — optional)${NC}"
set_secret "DOCUSIGN_API_KEY"     "DocuSign Integration Key"              "DOCUSIGN_API_KEY"
set_secret "DOCUSIGN_ACCOUNT_ID"  "DocuSign Account ID"                   "DOCUSIGN_ACCOUNT_ID"

# ── Section 6: GST ───────────────────────────────────────────────────────
echo ""
echo -e "${YELLOW}▶ GST Portal (optional)${NC}"
set_secret "GST_GSP_API_KEY"     "GST GSP API Key"                       "GST_GSP_API_KEY"

# ── Verify secrets list ───────────────────────────────────────────────────
echo ""
echo -e "${YELLOW}▶ Current secrets on $PROJECT:${NC}"
npx wrangler pages secret list --project-name "$PROJECT" 2>&1

echo ""
echo -e "${CYAN}══════════════════════════════════════════════════════════════"
echo " ✅ K2 Complete — Secrets configured on Cloudflare Pages."
echo ""
echo " Next steps:"
echo "   1. Test live payment: POST /api/payments/create-order"
echo "   2. Test live email OTP: POST /api/auth/otp/send"
echo "   3. Test SMS OTP: POST /api/auth/otp/send (phone)"
echo "   4. Check integration health: GET /api/integrations/health"
echo -e "══════════════════════════════════════════════════════════════${NC}"
