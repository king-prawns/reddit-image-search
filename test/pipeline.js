/* eslint-env node */

const ora = require('ora')();

const start = spinner => msg =>
  Promise.resolve(spinner.start(msg));

const succeed = spinner => msg =>
  () => spinner.succeed(msg);

const error = spinner => (e) => {
  spinner.fail(e.message);

  process.exitCode = 1;
};

module.exports = {
  start   : start(ora),
  succeed : succeed(ora),
  error   : error(ora)
};
