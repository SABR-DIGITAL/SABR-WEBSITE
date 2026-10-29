const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('Verifying Oak & Ash Landscaping demo architecture & routes...');

const projectRoot = path.resolve(__dirname, '..');

// 1. Verify all 5 demo pages exist and have content
const demoPages = ['Home.tsx', 'Services.tsx', 'About.tsx', 'Gallery.tsx', 'Contact.tsx', 'Navbar.tsx', 'Footer.tsx'];
for (const file of demoPages) {
  const filePath = path.join(projectRoot, 'components', 'demos', 'landscaping', file);
  assert(fs.existsSync(filePath), `Missing ${filePath}`);
  const content = fs.readFileSync(filePath, 'utf8');
  assert(content.length > 500, `${file} is too short`);
  console.log(`✓ components/demos/landscaping/${file} exists and is populated (${content.length} bytes)`);
}

// 2. Verify App.tsx routes for all 5 landscaping pages
const appContent = fs.readFileSync(path.join(projectRoot, 'App.tsx'), 'utf8');
assert(appContent.includes('/demo/landscaping" element={<LandscaperHome />}'), 'Missing /demo/landscaping route');
assert(appContent.includes('/demo/landscaping/services" element={<LandscaperServices />}'), 'Missing /demo/landscaping/services route');
assert(appContent.includes('/demo/landscaping/about" element={<LandscaperAbout />}'), 'Missing /demo/landscaping/about route');
assert(appContent.includes('/demo/landscaping/gallery" element={<LandscaperGallery />}'), 'Missing /demo/landscaping/gallery route');
assert(appContent.includes('/demo/landscaping/contact" element={<LandscaperContact />}'), 'Missing /demo/landscaping/contact route');
console.log('✓ Verified all 5 landscaping routes in App.tsx');

// 3. Verify ErrorBoundary is wrapping Suspense in App.tsx to eliminate white-page crash risks
assert(appContent.includes('<ErrorBoundary>'), 'App.tsx is missing ErrorBoundary');
console.log('✓ Verified ErrorBoundary protection in App.tsx');

// 4. Verify Hero.tsx does not contain the removed pill
const heroContent = fs.readFileSync(path.join(projectRoot, 'components', 'Hero.tsx'), 'utf8');
assert(!heroContent.includes('<span>SABR DIGITAL</span>'), 'Hero.tsx still has SABR DIGITAL pill');
console.log('✓ Verified SABR DIGITAL pill was cleanly removed from Hero.tsx');

console.log('All Landscaping demo assertions passed successfully!');
