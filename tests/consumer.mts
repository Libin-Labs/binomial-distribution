import { binomialPmf } from '@lp-labs/binomial-distribution';
if (Math.abs(binomialPmf(2, 4, 0.5) - 0.375) > 1e-12) throw new Error('Probability');
// @ts-expect-error invalid argument must be rejected by declarations
binomialPmf('2', 4, 0.5);
