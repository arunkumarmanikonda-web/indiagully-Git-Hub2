#!/usr/bin/env bash
# ============================================================================
# K1 — India Gully D1 Remote Deployment Script (K-Round enhanced)
# ============================================================================
# PRE-REQUISITE: Your Cloudflare API token must have D1:Edit permission.
#
# To add D1:Edit to your token:
#   1. Visit https://dash.cloudflare.com/profile/api-tokens
#   2. Find the token used by wrangler (CLOUDFLARE_API_TOKEN)
#   3. Click "Edit" → under Account permissions add "D1 → Edit"
#   4. Save the token and re-export: export CLOUDFLARE_API_TOKEN=<new-token>
#   5. Run: bash scripts/create-d1-remote.sh
#
# What this script does:
#   1. Creates production D1 database india-gully-production
#   2. Patches wrangler.jsonc with the real database_id
#   3. Applies all 4 migrations (0001–0004)
#   4. Seeds initial data
#   5. Rebuilds and deploys to Cloudflare Pages
# ============================================================================
set -e

CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${CYAN}══════════════════════════════════════════════════════════════"
echo " India Gully — D1 Remote Deployment (K-Round)"
echo "══════════════════════════════════════════════════════════════${NC}"

# ── Pre-flight check ───────────────────────────────────────────────────────
echo ""
echo -e "${YELLOW}▶ Pre-flight: Checking Cloudflare authentication …${NC}"
npx wrangler whoami 2>&1 | grep -E "logged in|Account Name" || {
  echo -e "${RED}✘ Not authenticated. Set CLOUDFLARE_API_TOKEN and retry.${NC}"
  exit 1
}

# Test D1 access
echo "  Testing D1 API access …"
if npx wrangler d1 list 2>&1 | grep -q "Authentication error\|permission\|forbidden"; then
  echo -e "${RED}✘ D1 permission denied. Add D1:Edit to your API token.${NC}"
  echo "  Visit: https://dash.cloudflare.com/profile/api-tokens"
  exit 1
fi
echo -e "${GREEN}  ✅ D1 access confirmed.${NC}"

# ── Step 1: Create or reuse production D1 database ─────────────────────────
echo ""
echo -e "${YELLOW}▶ Step 1: Creating D1 database india-gully-production …${NC}"

# Check if database already exists
EXISTING=$(npx wrangler d1 list 2>&1 | grep "india-gully-production" | grep -oE '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}' | head -1)

if [ -n "$EXISTING" ]; then
  DB_UUID="$EXISTING"
  echo -e "${GREEN}  ✅ Database already exists: $DB_UUID${NC}"
else
  DB_CREATE_OUTPUT=$(npx wrangler d1 create india-gully-production 2>&1)
  echo "$DB_CREATE_OUTPUT"
  DB_UUID=$(echo "$DB_CREATE_OUTPUT" | grep -oE '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}' | head -1)
  if [ -z "$DB_UUID" ]; then
    echo ""
    echo -e "${YELLOW}  Could not auto-extract database_id. Paste it here:${NC}"
    read -r DB_UUID
  fi
  echo -e "${GREEN}  ✅ Database created: $DB_UUID${NC}"
fi

# ── Step 2: Patch wrangler.jsonc ───────────────────────────────────────────
echo ""
echo -e "${YELLOW}▶ Step 2: Patching wrangler.jsonc with database_id …${NC}"

python3 - "$DB_UUID" <<'PYEOF'
import sys, re, json

uuid = sys.argv[1]
with open('wrangler.jsonc', 'r') as f:
    content = f.read()

# Try to uncomment d1_databases block and replace PENDING_D1_ID
new_content = content.replace(
    '  // "d1_databases": [\n  //   {\n  //     "binding": "DB",\n  //     "database_name": "india-gully-production",\n  //     "database_id": "PENDING_D1_ID"\n  //   }\n  // ],',
    f'  "d1_databases": [\n    {{\n      "binding": "DB",\n      "database_name": "india-gully-production",\n      "database_id": "{uuid}"\n    }}\n  ],'
)

if new_content == content:
    # Already uncommented — just replace the UUID if PENDING_D1_ID
    new_content = re.sub(r'"database_id":\s*"PENDING_D1_ID"', f'"database_id": "{uuid}"', content)

if new_content == content:
    print(f"  ⚠  wrangler.jsonc already configured or pattern not found — verify manually.")
else:
    with open('wrangler.jsonc', 'w') as f:
        f.write(new_content)
    print(f"  ✅ wrangler.jsonc updated with database_id={uuid}")
PYEOF

# ── Step 2b: Patch wrangler.jsonc for R2 if not yet enabled ───────────────
echo ""
echo -e "${YELLOW}▶ Step 2b: Enabling R2 DOCS_BUCKET binding …${NC}"
python3 - <<'PYEOF'
with open('wrangler.jsonc', 'r') as f:
    content = f.read()

new_content = content.replace(
    '  // "r2_buckets": [\n  //   {\n  //     "binding": "DOCS_BUCKET",\n  //     "bucket_name": "india-gully-docs"\n  //   }\n  // ],',
    '  "r2_buckets": [\n    {\n      "binding": "DOCS_BUCKET",\n      "bucket_name": "india-gully-docs"\n    }\n  ],'
)
if new_content != content:
    with open('wrangler.jsonc', 'w') as f:
        f.write(new_content)
    print("  ✅ R2 DOCS_BUCKET binding enabled in wrangler.jsonc")
else:
    print("  ℹ  R2 binding already enabled or pattern not found")
PYEOF

# ── Step 3: Apply all migrations ──────────────────────────────────────────
echo ""
echo -e "${YELLOW}▶ Step 3: Applying all migrations to remote D1 …${NC}"
npx wrangler d1 migrations apply india-gully-production
echo -e "${GREEN}  ✅ All migrations applied (0001–0004).${NC}"

# ── Step 4: Seed production data ──────────────────────────────────────────
if [ -f "seed.sql" ]; then
  echo ""
  echo -e "${YELLOW}▶ Step 4: Seeding production data …${NC}"
  npx wrangler d1 execute india-gully-production --file=./seed.sql
  echo -e "${GREEN}  ✅ Seed data applied.${NC}"
fi

# ── Step 5: Create R2 bucket ──────────────────────────────────────────────
echo ""
echo -e "${YELLOW}▶ Step 5: Creating R2 bucket india-gully-docs …${NC}"
if npx wrangler r2 bucket list 2>&1 | grep -q "india-gully-docs"; then
  echo -e "${GREEN}  ✅ R2 bucket already exists.${NC}"
else
  npx wrangler r2 bucket create india-gully-docs 2>&1 || echo -e "${YELLOW}  ⚠  R2 bucket creation failed — enable R2 in Cloudflare dashboard first.${NC}"
fi

# ── Step 6: Verify D1 tables ──────────────────────────────────────────────
echo ""
echo -e "${YELLOW}▶ Step 6: Verifying D1 schema …${NC}"
TABLE_COUNT=$(npx wrangler d1 execute india-gully-production --command="SELECT COUNT(*) as n FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE 'd1_%';" 2>&1 | grep -oE '[0-9]+' | tail -1)
echo -e "${GREEN}  ✅ Tables created: $TABLE_COUNT${NC}"

# ── Step 7: Rebuild & deploy ──────────────────────────────────────────────
echo ""
echo -e "${YELLOW}▶ Step 7: Building project …${NC}"
npm run build

echo ""
echo -e "${YELLOW}▶ Step 8: Deploying to Cloudflare Pages …${NC}"
npx wrangler pages deploy dist --project-name india-gully

echo ""
echo -e "${CYAN}══════════════════════════════════════════════════════════════"
echo -e " ✅ K1 Complete — india-gully-production D1 is live!"
echo -e "    DB UUID : $DB_UUID"
echo -e "    Tables  : $TABLE_COUNT"
echo ""
echo " To verify:"
echo "   npx wrangler d1 execute india-gully-production --command=\"SELECT name FROM sqlite_master WHERE type='table'\""
echo "   npx wrangler d1 execute india-gully-production --command=\"SELECT COUNT(*) FROM ig_users\""
echo -e "══════════════════════════════════════════════════════════════${NC}"
