const levels = ['R', 'D', 'C', 'B', 'A', 'P'];

export default function levelToClass(level, effective = false) {
  return effective ? effectiveLevelToClass(level) : realLevelToClass(level);
}

function effectiveLevelToClass(level) {
  const index = Math.floor((level) / 4);

  return levels[index];
}

function realLevelToClass(level) {
  const index = Math.floor((level - 1) / 4);

  return levels[index];
}

export function levelToClassNumber(level) {
  return Math.floor((level) / 4);
}
