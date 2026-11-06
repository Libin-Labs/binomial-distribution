import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('analytic fixture', () => {
  assert.ok(Math.abs(api.binomialPmf(2, 4, 0.5) - 0.375) < 1e-12);
});
test('support endpoints', () => {
  assert.equal(api.binomialPmf(0, 0, 0.7), 1);
  assert.equal(api.binomialPmf(3, 2, 0.5), 0);
  assert.equal(api.binomialPmf(0, 4, 0), 1);
  assert.equal(api.binomialPmf(4, 4, 1), 1);
});
test('normalization', () => {
  for (let n = 1; n <= 30; n++) {
    let sum = 0;
    for (let k = 0; k <= n; k++) sum += api.binomialPmf(k, n, 0.3);
    assert.ok(Math.abs(sum - 1) < 1e-12);
  }
});
test('moments', () => {
  assert.deepEqual(api.binomialMoments(10, 0.5), { mean: 5, variance: 2.5 });
});
test('invalid ranges', () => {
  assert.throws(() => api.binomialPmf(-1, 2, 0.5));
  assert.throws(() => api.binomialPmf(1, 2, 2));
});
test('types and nonfinite', () => {
  assert.throws(() => api.binomialPmf('2', 4, 0.5));
});
