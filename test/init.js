/* eslint-env node */

const createTestCafe = require('testcafe');

let testcafe = null;

createTestCafe('localhost', 1337, 1338)
  .then((tc) => {
    testcafe = tc;
    const runner = testcafe.createRunner();

    return runner
      .src(['test/fixture/p0.js'])
      .browsers(['chrome', 'firefox', 'safari'])
      .run();
  })
  .then((failedCount) => {
    console.log(`Tests failed: ${failedCount}`);
    testcafe.close();
  });
