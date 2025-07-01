export function evaluateRisk(amount: number, email: string): number {
  let score = 0;
  if (amount > 1000) score += 0.3;
  if (email.endsWith('.ru') || email.includes('test.com')) score += 0.3;
  return Math.min(1, score);
}
