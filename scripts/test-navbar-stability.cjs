const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('Verifying comprehensive Navbar fixed position and stability...');

const navPath = path.resolve(__dirname, '..', 'components', 'Navbar.tsx');
const navContent = fs.readFileSync(navPath, 'utf8');

const appPath = path.resolve(__dirname, '..', 'App.tsx');
const appContent = fs.readFileSync(appPath, 'utf8');

// 1. Verify Navbar is rendered directly at root level, outside of flex document-flow in App.tsx
assert(appContent.indexOf('<Navbar') < appContent.indexOf('<div className="flex flex-col min-h-screen relative z-10">'),
  'Navbar in App.tsx is not mounted at root viewport level above scrolling document flow');
console.log('✓ Verified Navbar is mounted at root viewport level in App.tsx');

// 2. Verify no Framer Motion transforms or will-change on the fixed header
assert(!navContent.includes('variants={navVariants}'), 'Navbar still uses transform variants');
assert(!navContent.includes('transform-gpu'), 'Navbar still uses transform-gpu');
assert(!navContent.includes('will-change-[transform'), 'Navbar still uses will-change transform');
console.log('✓ Verified no transform matrices or transform-gpu on fixed header container');

// 3. Verify clean fixed positioning with pointer-events-none on outer container and pointer-events-auto on inner
assert(navContent.includes('fixed top-0 left-0 right-0 z-[100] px-4 md:px-8 py-4 pointer-events-none'),
  'Navbar container missing fixed top-0 pointer-events-none classes');
assert(navContent.includes('pointer-events-auto'),
  'Navbar inner pill missing pointer-events-auto');
console.log('✓ Verified fixed top-0 pointer-events configuration');

// 4. Verify no dynamic padding transitions on scroll
assert(!navContent.includes("scrolled ? 'py-4' : 'py-8'"), 'Navbar still contains scroll-based dynamic padding');
assert(!navContent.includes("transition-[padding]"), 'Navbar still contains transition-[padding]');
console.log('✓ Verified no dynamic padding transitions or jumps on scroll');

console.log('All Navbar absolute stability assertions passed successfully!');
