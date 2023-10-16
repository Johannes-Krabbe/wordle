// TypeScript
class SeededRNG {
  private seed: number;
  constructor(seed: number) {
    this.seed = seed % 2147483647;
    if (this.seed <= 0) this.seed += 2147483646;
  }

  // Park-Miller pseudo-random number generator
  next() {
    return (this.seed = (this.seed * 16807) % 2147483647);
  }

  // Generate a pseudo-random number between 0 (inclusive) and 1 (exclusive)
  nextFloat() {
    return (this.next() - 1) / 2147483646;
  }
}

export function getSeededRandomNumber(n: number): number {
  // Use the current date as the seed to make the "random" number
  // consistent throughout the day
  const today = new Date();
  const seed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();

  const rng = new SeededRNG(seed);
  const randomNumber = rng.nextFloat();

  // Scale the number to the desired range
  return Math.floor(randomNumber * n);
}
