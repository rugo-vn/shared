import { expect } from 'chai';
import { checkPermInfo, getMatchPerm } from '../src/permission.js';

describe('Rugo Permission test', () => {
  /* confirm all info properties are macth with perm */
  it('should check information with perm', async () => {
    const info = {
      a: 'b',
      c: 'd',
      e: 'f',
      g: 'h',
      i: 10,
      j: 'k',
    };

    const perm = {
      a: 'b',
      c: 'd',
      e: '*',
      g: '*',
      i: { $gt: 5 },
      j: { $in: ['l', 'n', 'k'] },
    };

    expect(checkPermInfo(perm, info)).to.be.eq(true);
  });

  it('should match first perm', async () => {
    const info = { a: 'b', c: 'ke' };
    const perms = [
      { a: 'c', c: 'd' },
      { a: { $in: ['d', 'b'] }, c: '*' },
    ];

    expect(getMatchPerm(perms, info)).to.be.deep.eq(perms[1]);
  });

  it('should get filters from passport', () => {
    const info = {
      spaceId: 'demo',
      tableName: 'test',
    };

    const perms = [
      {
        spaceId: '*',
        tableName: '*',
        id: { $in: ['123', '456'] },
        user: '456',
      },
    ];

    const passport = getMatchPerm(perms, info);
    const filters = {};
    for (const rule in passport) {
      const value = passport[rule];

      if (['spaceId', 'tableName'].indexOf(rule) !== -1) continue;

      filters[rule] = value;
    }

    expect(filters).to.has.property('user', '456');
  });
});
