const { generateDtsBundle } = require('dts-bundle-generator');
const path = require('path');

const dts = generateDtsBundle(path.resolve(__dirname, 'packages', 'client', 'src', 'app.ts'));

console.log('DTS GENERATED SUCCESFULLY');
