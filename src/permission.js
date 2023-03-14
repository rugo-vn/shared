import { WIDECARD_VALUE } from './constants.js';

const execFn = function (op, left, right) {
  switch (op.trim().toLowerCase()) {
    case '$eq':
      return left === right;

    case '$neq':
      return left !== right;

    case '$lt':
      return left < right;

    case '$lte':
      return left <= right;

    case '$gt':
      return left > right;

    case '$gte':
      return left >= right;

    case '$in':
      return Array.isArray(right) ? right.indexOf(left) !== -1 : false;
  }

  return false;
};

export const checkPermInfo = function (perm, info) {
  for (const rule in info) {
    const ruleValue = perm[rule];
    const infoValue = info[rule];

    if (ruleValue === WIDECARD_VALUE) continue;

    if (ruleValue && typeof ruleValue === 'object') {
      const fn = Object.keys(ruleValue)[0];
      const fnValue = ruleValue[fn];

      if (execFn(fn, infoValue, fnValue)) continue;
    }

    if (ruleValue === infoValue) continue;

    return false;
  }

  return true;
};

export const getMatchPerm = function (perms, info) {
  for (const perm of perms) {
    if (checkPermInfo(perm, info)) return perm;
  }

  return null;
};
