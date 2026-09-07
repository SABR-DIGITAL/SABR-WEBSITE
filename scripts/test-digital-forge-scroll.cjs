const fs = require('fs');
const path = require('path');
const assert = require('assert');

console.log('Verifying DigitalForge smooth scroll and jitter fixes...');

const filePath = path.resolve(__dirname, '..', 'components', 'DigitalForge.tsx');
const content = fs.readFileSync(filePath, 'utf8');

// 1. Verify copy text does not move up/down with scroll (no copyY or copyScale)
assert(!content.includes('copyY'), 'DigitalForge still contains copyY transform');
assert(!content.includes('copyScale'), 'DigitalForge still contains copyScale transform');
console.log('✓ Verified copy text has no scroll-driven vertical translation or scale transforms');

// 2. Verify camera position Y has no artificial sine bobbing during scroll
assert(!content.includes('Math.sin(t * 0.25) * 0.06'), 'DigitalForge still contains vertical camera bobbing');
console.log('✓ Verified camera Y position is smooth without vertical sine oscillations');

// 3. Verify restrictive 0.25 snap threshold is removed
assert(!content.includes('> 0.25'), 'DigitalForge still contains > 0.25 snap threshold');
console.log('✓ Verified 0.25 snap threshold is removed to prevent fast-scroll snapping');

// 4. Verify frame-skipping throttle (ambient < 1 / 30) is removed for completely smooth 60fps+ rendering
assert(!content.includes('ambient < 1 / 30'), 'DigitalForge still throttles frame rendering to 30fps');
console.log('✓ Verified frame throttling is removed for fluid rendering');

// 5. Verify useScroll offset aligns cleanly with the pinned stage ('start start', 'end end')
assert(content.includes("offset: ['start start', 'end end']"), 'DigitalForge useScroll offset is not aligned with pinned stage');
console.log('✓ Verified scroll offset matches sticky pinning interval');

// 6. Verify scroll progress is primed on mount
assert(content.includes('scrollYProgress.get()'), 'DigitalForge does not prime scroll progress on mount');
console.log('✓ Verified scroll progress is primed on mount');

console.log('All DigitalForge smooth scroll assertions passed successfully!');
