// @flow

const levels: Array<string> = ['R', 'D', 'C', 'B', 'A', 'P', 'P'];

function effectiveLevelToClass(level: number): string {
  const index = Math.floor((level) / 4);

  return levels[index];
}

function realLevelToClass(level: number): string {
  const index = Math.floor((level - 1) / 4);

  return levels[index];
}

export default function levelToClass(level: number, effective: boolean = false): string {
  return effective ? effectiveLevelToClass(level) : realLevelToClass(level);
}

export function levelToClassNumber(level: number): number {
  return Math.floor((level) / 4);
}

export function classToLevel(className: string): number {
  const index = levels.findIndex((item) => item === className);

  if (index === -1) {
    return 0;
  }

  return (index * 4) + 1;
}

export function classToClassNumber(className: string): number {
  const level = classToLevel(className);
  return levelToClassNumber(level);
}
