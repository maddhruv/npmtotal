#!/usr/bin/env node
const cliProgress = require("cli-progress");
const npmsum = require("..");

(async () => {
  const pbar = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  );

  pbar.start(100, 0);
  const args = process.argv.slice(2);
  const key = args.length === 1 ? args[0] : args;
  pbar.update(10);

  const stats = await npmsum(key);
  pbar.update(100);

  console.log(stats);
  pbar.stop();
})();
