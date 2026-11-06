function finite(value: number, min = -Number.MAX_VALUE, max = Number.MAX_VALUE): number {
  if (typeof value !== 'number' || !Number.isFinite(value))
    throw new TypeError('Expected finite number');
  if (value < min || value > max) throw new RangeError('Number outside supported bounds');
  return value;
}
function integer(value: number, min = 0, max = 1000000): number {
  if (!Number.isSafeInteger(value)) throw new RangeError('Expected safe integer');
  return finite(value, min, max);
}
function probability(p: number): void {
  finite(p, 0, 1);
}
function logChoose(n: number, k: number): number {
  if (k < 0 || k > n) return -Infinity;
  k = Math.min(k, n - k);
  let sum = 0;
  for (let i = 1; i <= k; i++) sum += Math.log(n - k + i) - Math.log(i);
  return sum;
}
export function binomialPmf(k: number, n: number, p: number): number {
  integer(k, 0, 10000);
  integer(n, 0, 10000);
  probability(p);
  if (k > n) return 0;
  if (p === 0) return k === 0 ? 1 : 0;
  if (p === 1) return k === n ? 1 : 0;
  return Math.exp(logChoose(n, k) + k * Math.log(p) + (n - k) * Math.log1p(-p));
}
export function binomialMoments(n: number, p: number): { mean: number; variance: number } {
  integer(n, 0, 10000);
  probability(p);
  return { mean: n * p, variance: n * p * (1 - p) };
}
