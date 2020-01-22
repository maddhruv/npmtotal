# npmtotal

Find your npm download statistics bu author or packages, can be used as a [CLI](#cli) or [Module](#module)

## Installation

`npm i npmtotal -g`

or

`npm i npmtotal`
when consuming as a [module](#module)

## Usage

### CLI

For npm `author`

> `npx npmtotal author`

and for npm `packages`

> `npx npmtotal package1 package2 ...`

### Module

```js
const npmtotal = require("npmtotal");

// author
(async () => {
  console.log(await npmtotal("maddhruv"));
})();

// packages
(async () => {
  console.log(await npmtotal(["npmtotal", "post-merge-install"]));
})();
```

The returned object is of this structure.

```js
{
  stats: [
    [String(packageName), Number(downloads)]
  ],
  sum: Number(totalDownloads)
}
```

#### Options

You can pass several options as the second param.

| Option      | Description                       | Default value |
| ----------- | --------------------------------- | ------------- |
| `exclude`   | an array of packages to exclude   | []            |
| `startDate` | start date for counting downloads | _today - 1_   |
| `endDate`   | end date for counting downloads   | _today_       |

### Related

- [npm-statistics](https://github.com/cleartax/npm-statistics) - NPM Download Stats updated daily with badge and readme update