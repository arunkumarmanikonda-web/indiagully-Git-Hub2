#!/usr/bin/env bash
# ============================================================================
# J3 — India Gully D1 Remote Deployment Script
# ============================================================================
# PRE-REQUISITE: Your Cloudflare API token must have the D1:Edit permission.
#
# To add it:
#   1. Visit https://dash.cloudflare.com/profile/api-tokens
#   2. Click "Edit" on the token used for wrangler
#   3. Under "Account" permissions, add "D1 → Edit"
#   4. Save the token
#   5. Run this script: bash scripts/create-d1-remote.sh
# ============================================================================
set -e

echo "══════════════════════════════════════════════════════════════"
echo " India Gully — D1 Remote Deployment (J3)"
echo "══════════════════════════════════════════════════════════════"

# ── Step 1: Create the production D1 database ──────────────────────────────
echo ""
echo "▶ Step 1: Creating D1 database india-gully-production …"
DB_CREATE_OUTPUT=$(npx wrangler d1 create india-gully-production 2>&1)
echo "$DB_CREATE_OUTPUT"

# Extract the database_id from wrangler output
DB_UUID=$(echo "$DB_CREATE_OUTPUT" | grep -E '"database_id":|database_id:' | grep -oE '[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}' | head -1)

if [ -z "$DB_UUID" ]; then
  echo ""
  echo "⚠  Could not extract database_id automatically."
  echo "   Please paste the database_id from the output above:"
  read -r DB_UUID
fi

echo ""
echo "✅ Database UUID: $DB_UUID"

# ── Step 2: Patch wrangler.jsonc with real database_id ─────────────────────
echo ""
echo "▶ Step 2: Patching wrangler.jsonc with real database_id …"

# Uncomment d1_databases block and replace PENDING_D1_ID
python3 - "$DB_UUID" <<'PYEOF'
import sys, re

uuid = sys.argv[1]
with open('wrangler.jsonc', 'r') as f:
    content = f.read()

# Uncomment the d1_databases block
content = content.replace(
    '  // "d1_databases": [\n  //   {\n  //     "binding": "DB",\n  //     "database_name": "india-gully-production",\n  //     "database_id": "PENDING_D1_ID"\n  //   }\n  // ],',
    f'  "d1_databases": [\n    {{\n      "binding": "DB",\n      "database_name": "india-gully-production",\n      "database_id": "{uuid}"\n    }}\n  ],'
)

with open('wrangler.jsonc', 'w') as f:
    f.write(content)

print(f"  wrangler.jsonc updated with database_id={uuid}")
PYEOF

# ── Step 3: Apply migrations to the remote D1 database ─────────────────────
echo ""
echo "▶ Step 3: Applying migrations to remote D1 database …"
npx wrangler d1 migrations apply india-gully-production
echo "✅ All migrations applied to production D1."

# ── Step 4: Seed seed.sql if it exists ──────────────────────────────────────
if [ -f "seed.sql" ]; then
  echo ""
  echo "▶ Step 4: Seeding production data …"
  npx wrangler d1 execute india-gully-production --file=./seed.sql
  echo "✅ Seed data applied."
fi

# ── Step 5: Rebuild & deploy ─────────────────────────────────────────────────
echo ""
echo "▶ Step 5: Building project …"
npm run build

echo ""
echo "▶ Step 6: Deploying to Cloudflare Pages …"
npx wrangler pages deploy dist --project-name india-gully

echo ""
echo "══════════════════════════════════════════════════════════════"
echo " ✅ J3 Complete — india-gully-production D1 is live!"
echo "    DB UUID : $DB_UUID"
echo "    To verify:"
echo "    npx wrangler d1 execute india-gully-production --command=\"SELECT COUNT(*) FROM ig_users\""
echo "══════════════════════════════════════════════════════════════"
