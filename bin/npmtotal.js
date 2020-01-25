#!/usr/bin/env node
const Progressbar = require("progress");
const { table } = require("table");
const { argv } = require("yargs").array("packages");
const npmsum = require("..");

(async () => {
  const pbar = new Progressbar("Fetching npm downloads for you: :bar", {
    total: 100,
    complete: "~"
  });

  const key = argv.author || argv.packages;

  if (!key) {
    console.error("Please pass either author or packages field");
    process.exit(1);
  }

  pbar.tick(1);

  setInterval(() => pbar.tick(), 500);

  const stats = await npmsum(key, {
    startDate: argv.startDate,
    endDate: argv.endDate
  });

  pbar.tick(100);

  console.log(table([["Name", "Downloads"], ...stats.stats]));

  console.log(`Total Downloads: ${stats.sum}`);

  process.exit(0);
})();
