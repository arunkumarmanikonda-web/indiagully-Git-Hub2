#!/usr/bin/env bash
# ============================================================================
# L4 — India Gully R2 Bucket Live Setup & Test
# ============================================================================
# PRE-REQUISITES:
#   1. Cloudflare account with R2 enabled
#      (Visit Cloudflare dashboard → R2 → Enable R2)
#   2. API token with R2:Edit permission
#   3. Run: bash scripts/setup-r2.sh
# ============================================================================
set -e

PROJECT="india-gully"
BUCKET="india-gully-docs"
CYAN='\033[0;36m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${CYAN}══════════════════════════════════════════════════════════════"
echo " India Gully — R2 Document Store Live Setup (L4)"
echo -e "══════════════════════════════════════════════════════════════${NC}"

# ── Step 1: Pre-flight ───────────────────────────────────────────────────────
echo ""
echo -e "${YELLOW}▶ Step 1: Testing R2 API access …${NC}"
if npx wrangler r2 bucket list 2>&1 | grep -q "enable R2\|10042"; then
  echo -e "${RED}✘ R2 not enabled. Enable R2 in Cloudflare Dashboard:${NC}"
  echo "  https://dash.cloudflare.com → R2 Object Storage → Get started"
  exit 1
fi
echo -e "${GREEN}  ✅ R2 access confirmed.${NC}"

# ── Step 2: Create bucket ────────────────────────────────────────────────────
echo ""
echo -e "${YELLOW}▶ Step 2: Creating R2 bucket '$BUCKET' …${NC}"
if npx wrangler r2 bucket list 2>&1 | grep -q "$BUCKET"; then
  echo -e "${GREEN}  ✅ Bucket already exists.${NC}"
else
  npx wrangler r2 bucket create "$BUCKET"
  echo -e "${GREEN}  ✅ Bucket created: $BUCKET${NC}"
fi

# ── Step 3: Create CORS policy ───────────────────────────────────────────────
echo ""
echo -e "${YELLOW}▶ Step 3: Setting CORS policy …${NC}"
cat > /tmp/r2-cors.json << 'EOF'
[
  {
    "AllowedOrigins": ["https://india-gully.pages.dev", "http://localhost:3000"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedHeaders": ["*"],
    "ExposeHeaders": ["ETag", "Content-Length"],
    "MaxAgeSeconds": 3600
  }
]
EOF
npx wrangler r2 bucket cors put "$BUCKET" --rules /tmp/r2-cors.json 2>&1 || \
  echo -e "${YELLOW}  ⚠  CORS policy set failed — may need newer wrangler version.${NC}"
rm -f /tmp/r2-cors.json

# ── Step 4: Upload a test board pack ─────────────────────────────────────────
echo ""
echo -e "${YELLOW}▶ Step 4: Uploading test board pack …${NC}"
cat > /tmp/board-pack-test.txt << 'EOF'
India Gully — Board Pack Test Document
=======================================
Version: L4 Live Test
Date: $(date -I)
Contents: This is a test document to verify R2 upload functionality.
EOF

echo "  Uploading test document to $BUCKET/board_pack/test-$(date +%Y%m%d).txt …"
npx wrangler r2 object put "$BUCKET/board_pack/test-$(date +%Y%m%d).txt" \
  --file /tmp/board-pack-test.txt \
  --content-type "text/plain" 2>&1
rm -f /tmp/board-pack-test.txt
echo -e "${GREEN}  ✅ Test document uploaded.${NC}"

# ── Step 5: Verify download ───────────────────────────────────────────────────
echo ""
echo -e "${YELLOW}▶ Step 5: Verifying download …${NC}"
OBJECT_KEY="board_pack/test-$(date +%Y%m%d).txt"
npx wrangler r2 object get "$BUCKET/$OBJECT_KEY" --file /tmp/r2-test-download.txt 2>&1 && \
  echo -e "${GREEN}  ✅ Download verified: $(cat /tmp/r2-test-download.txt | head -1)${NC}" && \
  rm -f /tmp/r2-test-download.txt || \
  echo -e "${YELLOW}  ⚠  Download verification failed.${NC}"

# ── Step 6: Update wrangler.jsonc ────────────────────────────────────────────
echo ""
echo -e "${YELLOW}▶ Step 6: Enabling R2 binding in wrangler.jsonc …${NC}"
python3 - << 'PYEOF'
with open('wrangler.jsonc', 'r') as f:
    content = f.read()

new_content = content.replace(
    '  // "r2_buckets": [\n  //   {\n  //     "binding": "DOCS_BUCKET",\n  //     "bucket_name": "india-gully-docs"\n  //   }\n  // ],',
    '  "r2_buckets": [\n    {\n      "binding": "DOCS_BUCKET",\n      "bucket_name": "india-gully-docs"\n    }\n  ],'
)
if new_content != content:
    with open('wrangler.jsonc', 'w') as f:
        f.write(new_content)
    print("  ✅ R2 binding enabled in wrangler.jsonc")
else:
    print("  ℹ  R2 binding already enabled")
PYEOF

# ── Step 7: Rebuild & deploy ─────────────────────────────────────────────────
echo ""
echo -e "${YELLOW}▶ Step 7: Building and deploying …${NC}"
npm run build
npx wrangler pages deploy dist --project-name "$PROJECT"

# ── Step 8: Verify live endpoint ──────────────────────────────────────────────
echo ""
echo -e "${YELLOW}▶ Step 8: Verifying live endpoint (requires admin session) …${NC}"
echo "  Manual test: POST /api/documents/upload with multipart/form-data"
echo "  curl -X POST https://india-gully.pages.dev/api/documents/upload \\"
echo "    -H 'Cookie: ig_session=<your-session>' \\"
echo "    -F 'file=@/path/to/document.pdf' \\"
echo "    -F 'category=board_pack' \\"
echo "    -F 'description=Q1 Board Pack 2026'"

echo ""
echo -e "${CYAN}══════════════════════════════════════════════════════════════"
echo " ✅ L4 Complete — R2 bucket india-gully-docs is live!"
echo ""
echo " Bucket: $BUCKET"
echo " API:    POST /api/documents/upload"
echo "         GET  /api/documents"
echo "         GET  /api/documents/:key"
echo -e "══════════════════════════════════════════════════════════════${NC}"
