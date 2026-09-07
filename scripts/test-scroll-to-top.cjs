const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('Verifying "Take me to the top" button implementation in footer...');

const projectRoot = path.resolve(__dirname, '..');
const appPath = path.join(projectRoot, 'App.tsx');
const appContent = fs.readFileSync(appPath, 'utf8');

// 1. Check ArrowUp import from lucide-react
assert(
  appContent.includes("import { ArrowUp } from 'lucide-react';") ||
  appContent.includes("ArrowUp") && appContent.includes("'lucide-react'"),
  'App.tsx should import ArrowUp from lucide-react'
);
console.log('✓ ArrowUp icon is imported from lucide-react');

// 2. Check scrollToTop implementation
assert(
  appContent.includes("scrollToTop = () =>") &&
  appContent.includes("window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })"),
  'App.tsx should implement smooth scrollToTop function'
);
console.log('✓ Smooth scrollToTop function is defined');

// 3. Check presence within the non-demo footer
const footerIndex = appContent.indexOf('<footer');
const footerEndIndex = appContent.indexOf('</footer>');
assert(footerIndex !== -1 && footerEndIndex !== -1, 'Footer element not found in App.tsx');

const isDemoConditionIndex = appContent.lastIndexOf('!isDemo', footerIndex);
assert(isDemoConditionIndex !== -1, 'Footer should be guarded by !isDemo condition');
console.log('✓ Footer is conditionally rendered for all SABR site pages (!isDemo)');

const footerSection = appContent.substring(footerIndex, footerEndIndex);

// 4. Check button is located within the footer
assert(
  footerSection.includes('Take me to the top'),
  'Footer does not contain "Take me to the top" text'
);
assert(
  footerSection.includes('aria-label="Take me to the top"'),
  'Footer button should have aria-label="Take me to the top"'
);
assert(
  footerSection.includes('onClick={scrollToTop}'),
  'Footer button does not wire up onClick={scrollToTop}'
);
console.log('✓ "Take me to the top" button is present inside the footer with onClick and aria-label');

// 5. Ensure the button is not sticky
const buttonSnippetMatch = footerSection.match(/<button[^>]*>[\s\S]*?Take me to the top[\s\S]*?<\/button>/);
assert(buttonSnippetMatch, 'Could not find button snippet in footer');
const buttonSnippet = buttonSnippetMatch[0];

assert(!buttonSnippet.includes('fixed'), 'Button must not be sticky/fixed');
assert(!buttonSnippet.includes('sticky'), 'Button must not be sticky');
console.log('✓ Button is confirmed non-sticky (uses natural footer document flow)');

console.log('All "Take me to the top" button assertions passed successfully!');
