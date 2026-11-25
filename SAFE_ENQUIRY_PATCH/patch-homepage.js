// Usage: node patch-homepage.js /path/to/index.html
const fs = require('node:fs');
const path = process.argv[2];
if (!path) { console.error('Usage: node patch-homepage.js <index.html>'); process.exit(2); }
let html = fs.readFileSync(path, 'utf8');
const replacements = [
 ['Document upload is available only after AKONDO GLOBAL WORLD approves your request.', 'Documents are not collected through this website. Contact our team for next steps after enquiry review.'],
 ['If approved, you receive a private, time-limited upload link by email. If we cannot help, we send a polite decline instead.', 'Our team contacts you directly after review. Online document upload is currently disabled; do not email passports or identity documents.'],
 ['Wait for our approval before uploading documents.', 'Do not submit sensitive files through this website or ordinary email.'],
 ['Approval before documents', 'Manual review first'],
 ['No passport upload in the first step', 'No online passport upload is enabled'],
 ['Send enquiry securely →', 'Send enquiry →'],
 ['Your enquiry is forwarded to our email for manual review. This site does not intentionally save enquiries to its own database.', 'Your enquiry is emailed for manual review. The website does not offer document upload. Avoid including sensitive details.']
];
let changed = 0;
for (const [before, after] of replacements) { if (html.includes(before)) { html = html.replace(before, after); changed++; } }
if (changed < 5) { console.error('Patch aborted: expected source phrases not found; only', changed, 'matched.'); process.exit(1); }
fs.writeFileSync(path, html); console.log('Homepage safety copy patched. Replacements:', changed);
