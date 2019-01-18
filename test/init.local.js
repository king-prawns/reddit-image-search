/* eslint-env node */

const createTestCafe = require('testcafe');

let testcafe = null;

createTestCafe('localhost', 1337, 1338)
  .then((tc) => {
    testcafe = tc;
    const runner = testcafe.createRunner();

    return runner
      .startApp('npm run httpserver', 3000)
      .src(['test/fixture/p1.js'])
      .browsers(['chrome -incognito'])
      .run({
        skipJsErrors     : true,
        quarantineMode   : false,
        selectorTimeout  : 15000,
        assertionTimeout : 15000,
        pageLoadTimeout  : 15000,
        speed            : 1,
        debugMode        : false
      });
  })
  .then((failedCount) => {
    console.log(`Tests failed: ${failedCount}`);
    testcafe.close();
  });
