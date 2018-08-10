const { generateDtsBundle } = require('dts-bundle-generator');
const path = require('path');

const dts = generateDtsBundle(path.resolve(__dirname, 'packages', 'server', 'src', 'schema', 'index.ts'));

console.log('DTS GENERATED SUCCESFULLY');
