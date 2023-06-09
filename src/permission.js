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

export const getPassport = function (perms, info) {
  const matchedPerm = getMatchPerm(perms, info);
  if (!matchedPerm) return matchedPerm;

  const perm = { ...matchedPerm };
  for (const key in info) delete perm[key];
  return perm;
};

export const toFilters = function (perm, exclude) {
  const filters = {};

  for (const rule in perm) {
    const value = perm[rule];

    if (exclude.indexOf(rule) !== -1) continue;

    if (value === WIDECARD_VALUE) continue;

    filters[rule] = value;
  }

  return filters;
};
