# Safety patch for Vercel enquiry website

This is a review-only overlay; it does not alter the public main branch or deploy automatically. Copy the patch files to the Vercel project root only after reviewing. The ready-to-extract full package is attached in the ChatGPT session as `AKONDO_GLOBAL_SAFE_ENQUIRY_WEBSITE_2026-11-25.zip`.

## Security changes
- `api/submit-documents.js`: POST returns 503 before file parsing; upload disabled.
- `api/review-enquiry.js`: returns 410; automated review links disabled.
- `api/submit-enquiry.js`: manual-review email only, no approve/decline/upload link.
- `upload.html`: safety notice, no form or file input.
- package removes formidable dependency.
- Run `node patch-homepage.js <path-to-index.html>` to update existing homepage messaging. It refuses to patch unless expected text exists.

## Test
Node syntax and API smoke test were run locally against the complete package; 3/3 checks passed. Vercel and Resend live tests are not done. Do not collect passport/NID/bank documents. The full package is enquiry-only and not production-verified.
