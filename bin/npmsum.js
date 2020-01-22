#!/usr/bin/env node

const npmsum = require("..");

(async () => {
  const args = process.argv.slice(2);
  const key = args.length === 1 ? args[0] : args;
  const stats = await npmsum(key);
  console.log(stats);
})();
