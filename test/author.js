const tap = require("tap");
const npmtotal = require("..");

(async () => {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const stats = await npmtotal("maddhruv", {
    startDate: yesterday.toJSON().slice(0, 10)
  });
  tap.ok(stats);
  tap.ok(stats.sum);
  tap.ok(!isNaN(stats.sum));
  tap.ok(stats.stats);
  tap.ok(Array.isArray(stats.stats));
})();
