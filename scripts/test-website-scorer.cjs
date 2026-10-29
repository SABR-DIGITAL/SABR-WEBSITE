const assert = require('assert');

console.log('Testing Website Scoring logic...');

async function runTest() {
  const { scoreWebsite } = await import('../api/scanner');

  const result = await scoreWebsite('https://example.com');
  console.log('Result for https://example.com:', result);

  assert(typeof result.overall === 'number', 'overall score must be a number');
  assert(result.overall >= 0 && result.overall <= 100, 'overall score must be between 0 and 100');
  assert(typeof result.performance === 'number', 'performance score must be a number');
  assert(typeof result.mobileUx === 'number', 'mobileUx score must be a number');
  assert(typeof result.seo === 'number', 'seo score must be a number');
  assert(typeof result.aiGeo === 'number', 'aiGeo score must be a number');

  assert(['Optimal', 'Fair', 'Needs Attention'].includes(result.badges.performance), 'performance badge valid');
  assert(['Optimal', 'Fair', 'Needs Attention'].includes(result.badges.mobileUx), 'mobileUx badge valid');
  assert(['Optimal', 'Fair', 'Needs Attention'].includes(result.badges.seo), 'seo badge valid');
  assert(['Optimal', 'Fair', 'Needs Attention'].includes(result.badges.aiGeo), 'aiGeo badge valid');
  assert(['Optimal', 'Fair', 'Needs Attention'].includes(result.badges.overall), 'overall badge valid');

  console.log('✓ All website scoring engine tests passed!');
}

runTest().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});
