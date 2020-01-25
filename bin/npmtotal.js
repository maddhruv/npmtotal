#!/usr/bin/env node
const cliProgress = require("cli-progress");
const { table } = require("table");
const { argv } = require("yargs").array("packages");
const npmsum = require("..");

(async () => {
  const pbar = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.shades_classic
  );

  const key = argv.author || argv.packages;

  if (!key) {
    console.error("Please pass either author or packages field");
    process.exit(1);
  }

  pbar.start(100, 0);

  pbar.update(10);

  const stats = await npmsum(key);

  pbar.update(100);

  pbar.stop();

  console.log(table([["Name", "Downloads"], ...stats.stats]));

  console.log(`Total Downloads: ${stats.sum}`);

  process.exit(0);
})();
