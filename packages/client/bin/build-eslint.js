const getBuildEslint = require('scripts/get-build-eslint');
const build = require('./build');

module.exports = getBuildEslint({
  build,
});
