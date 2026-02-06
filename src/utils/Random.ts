export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateTillDifferent(min: number, max: number, value: Set<number>): number {
    let newValue = getRandomInt(min, max);
    while (value.has(newValue)) {
        newValue = getRandomInt(min, max);
    }
    return newValue;
}
