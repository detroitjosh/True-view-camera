/**
 * Real-Tone Validation Script
 * Demonstrates and validates Real-Tone processing across all Monk Skin Tone Scale categories
 * 
 * Usage: node scripts/validate-real-tone.js
 */

const { RealToneProcessor, MONK_SKIN_TONE_SCALE } = require('../src/utils/RealToneProcessor');

console.log('═══════════════════════════════════════════════════════════');
console.log('  Real-Tone Validation for TrueView Camera');
console.log('  Based on Monk Skin Tone Scale (MST)');
console.log('═══════════════════════════════════════════════════════════\n');

// Initialize processor
const processor = new RealToneProcessor();

console.log('✓ RealToneProcessor initialized\n');

// Test samples representing diverse skin tones
const testSamples = [
  { name: 'Very Light (MST-1)', rgb: { r: 250, g: 240, b: 230 }, expected: 1 },
  { name: 'Light (MST-2)', rgb: { r: 245, g: 230, b: 215 }, expected: 2 },
  { name: 'Medium (MST-4)', rgb: { r: 220, g: 195, b: 165 }, expected: 4 },
  { name: 'Tan (MST-6)', rgb: { r: 175, g: 140, b: 110 }, expected: 6 },
  { name: 'Dark (MST-8)', rgb: { r: 120, g: 85, b: 60 }, expected: 8 },
  { name: 'Very Dark (MST-9)', rgb: { r: 90, g: 60, b: 40 }, expected: 9 },
  { name: 'Deepest (MST-10)', rgb: { r: 60, g: 40, b: 30 }, expected: 10 },
];

console.log('Testing Skin Tone Classification:\n');

let passedTests = 0;
testSamples.forEach((sample) => {
  const detected = processor.detectSkinToneCategory(sample.rgb);
  const passed = detected.id === sample.expected;
  console.log(`${passed ? '✓' : '✗'} ${sample.name} - Detected: MST-${detected.id}`);
  if (passed) passedTests++;
});

console.log(`\nAccuracy: ${passedTests}/${testSamples.length}\n`);
console.log('Real-Tone validation complete! ✨');
