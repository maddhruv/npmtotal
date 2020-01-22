const _ = require("lodash");
const fetch = require("isomorphic-fetch");

const startDate = new Date();
startDate.setFullYear(startDate.getFullYear() - 1);

const defaultOptions = {
  /** packages to exclude */
  exclude: [],
  /** date from to count downloads, defaults to a year later */
  startDate: startDate.toJSON().slice(0, 10),
  /** date till count download, defaults to today */
  endDate: new Date().toJSON().slice(0, 10)
};

/**
 * @function npmtotal - npm download stats
 * @param {string | array} author - author name as string or packages as array
 * @param {*} [options=defaultOptions]
 * @returns array of packages and downloads
 */
function npmtotal(key, options) {
  if (!key) {
    throw new Error("`key` is a required filed for `npmtotal`");
  }
  const { exclude, startDate, endDate } = { ...options, ...defaultOptions };

  let url;

  if (typeof key === "string") {
    url = `https://npm-stat.com/api/download-counts?author=${key}&from=${startDate}&until=${endDate}`;
  } else {
    url = `https://npm-stat.com/api/download-counts?package=${key.join(
      ","
    )}&from=${startDate}&until=${endDate}`;
  }

  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(url);
      const data = await res.json();

      let stats = [];

      const packages = _.omit(data, exclude);

      for (let [package, downloads] of Object.entries(packages)) {
        stats.push([package, _.sum(Object.values(downloads))]);
      }

      resolve({
        stats,
        sum:
          _.sumBy(stats, function(o) {
            return o[1];
          }) || 0
      });
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = npmtotal;
