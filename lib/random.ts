export function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
