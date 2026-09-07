const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('Verifying footer legal documents...');

const projectRoot = path.resolve(__dirname, '..');
const docs = [
  'privacy-policy.pdf',
  'terms-of-service.pdf',
  'cookie-policy.pdf'
];

// Check public/documents
for (const doc of docs) {
  const filePath = path.join(projectRoot, 'public', 'documents', doc);
  assert(fs.existsSync(filePath), `Missing ${filePath}`);
  const stat = fs.statSync(filePath);
  assert(stat.size > 1000, `File ${filePath} is unexpectedly small: ${stat.size} bytes`);
  const buffer = fs.readFileSync(filePath);
  assert(buffer.subarray(0, 5).toString() === '%PDF-', `${filePath} does not start with %PDF- header`);
  console.log(`✓ public/documents/${doc} is a valid PDF (${stat.size} bytes)`);
}

// Check public/assets
for (const doc of docs) {
  const filePath = path.join(projectRoot, 'public', 'assets', doc);
  assert(fs.existsSync(filePath), `Missing ${filePath}`);
  const stat = fs.statSync(filePath);
  assert(stat.size > 1000, `File ${filePath} is unexpectedly small: ${stat.size} bytes`);
  console.log(`✓ public/assets/${doc} is present (${stat.size} bytes)`);
}

// Check assets
for (const doc of docs) {
  const filePath = path.join(projectRoot, 'assets', doc);
  assert(fs.existsSync(filePath), `Missing ${filePath}`);
  const stat = fs.statSync(filePath);
  assert(stat.size > 1000, `File ${filePath} is unexpectedly small: ${stat.size} bytes`);
  console.log(`✓ assets/${doc} is present (${stat.size} bytes)`);
}

// Check App.tsx links
const appCode = fs.readFileSync(path.join(projectRoot, 'App.tsx'), 'utf8');
assert(appCode.includes('/documents/privacy-policy.pdf'), 'App.tsx missing link to privacy-policy.pdf');
assert(appCode.includes('/documents/terms-of-service.pdf'), 'App.tsx missing link to terms-of-service.pdf');
assert(appCode.includes('/documents/cookie-policy.pdf'), 'App.tsx missing link to cookie-policy.pdf');
assert(appCode.includes('target="_blank"'), 'App.tsx missing target="_blank"');
assert(appCode.includes('rel="noopener noreferrer"'), 'App.tsx missing rel="noopener noreferrer"');

console.log('All footer document assertions passed successfully!');
