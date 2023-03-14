# Rugo Shared

Shared modules between Rugo's services.

## Permission

Allow handle policies and permissions.

### Concept

Some part of Rugo Platform requires user's permissions to access. We call user's permissions is `perms`.

When you travel across some services, you receive an identity field into an object called `passport`.

At the end of the service (or action) you want to access, a security gate will check your `passport` and decide that you can access or not.

### `perms`

Each user after authentication will take their permissions from data storage. Format:

```js
const perms = [
  {
    rule: 'value',
  },
];
```

When `value` can be:

- specific value.
<!-- - functional value with `$gt`, `$lt`, `$gte`, `$lte`, `$eq`, `$neq`, `$regex`. -->
- wildcard value `*`.

### `passport`

After check your permissions with infomation data, you will receive:

```js
const passport = {
  rule: 'widest value range',
};
```

Your `passport` is your first matched permission in `perm`.

E.g.

```js
const passport = {
  spaceId: '*',
  tableName: '456',
  rowId: { $in: ['441', '223'] },
  userId: '789',
};
```
