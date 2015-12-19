import { cloneDeep } from 'lodash';

export default (rules, unordered) => {
  const races = cloneDeep(unordered);
  races.sort((a, b) => {
    for (const rule of rules) {
      if (a[rule.key] === b[rule.key]) {
        continue;
      }
      if (rule.order === 'asc') {
        return a[rule.key] < b[rule.key] ? -1 : 1;
      }
      if (rule.order === 'desc') {
        return a[rule.key] > b[rule.key] ? -1 : 1;
      }
    }
    return 0;
  });
  return races;
};
