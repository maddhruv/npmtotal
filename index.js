const mergeWith = require("lodash/mergeWith");
const omit = require("lodash/omit");
const sumBy = require("lodash/sumBy");
const sum = require("lodash/sum");
const reverse = require("lodash/reverse");
const sortBy = require("lodash/sortBy");
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
  const { exclude, startDate, endDate } = mergeWith(
    {},
    defaultOptions,
    options
  );

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

      const packages = omit(data, exclude);

      for (let [package, downloads] of Object.entries(packages)) {
        stats.push([package, sum(Object.values(downloads))]);
      }

      stats = reverse(
        sortBy(stats, [
          function(o) {
            return o[1];
          }
        ])
      );

      resolve({
        stats,
        sum:
          sumBy(stats, function(o) {
            return o[1];
          }) || 0
      });
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = npmtotal;
