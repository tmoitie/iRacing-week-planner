// @flow

const levels: Array<string> = ['R', 'D', 'C', 'B', 'A', 'P', 'P'];

export default function levelToClass(level: number, effective: boolean = false): string {
  return effective ? effectiveLevelToClass(level) : realLevelToClass(level);
}

function effectiveLevelToClass(level: number): string {
  const index = Math.floor((level) / 4);

  return levels[index];
}

function realLevelToClass(level: number): string {
  const index = Math.floor((level - 1) / 4);

  return levels[index];
}

export function levelToClassNumber(level: number): number {
  return Math.floor((level) / 4);
}
