/* eslint-env node */

const path = require('path');
const fs = require('fs-extra');
const { start, succeed, error } = require('./pipeline');

const root = path.resolve(__dirname, '..');
const MODULES = path.join(root, 'node_modules');
const BOWER = path.join(root, 'bower_components');

const symSinon = path.join(MODULES, 'sinonjs/sinon.js');
const symAsync = path.join(MODULES, 'async/lib/async.js');

start('Preparing WCT playground')
  .then(() => fs.remove(BOWER))
  .then(() => fs.ensureSymlink(MODULES, BOWER))
  .then(() => fs.remove(symSinon))
  .then(() => fs.ensureSymlink(
    path.join(MODULES, 'sinon/pkg/sinon.js'),
    symSinon
  ))
  .then(() => fs.remove(symAsync))
  .then(() => fs.ensureSymlink(
    path.join(MODULES, 'async/dist/async.js'),
    symAsync
  ))
  .then(succeed('WCT prepared'))
  .catch(error);
