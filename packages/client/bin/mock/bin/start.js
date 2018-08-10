const createApp = require('server/create-app');
const attachClientToDevApp = require('scripts/attach-client-to-dev-app');
const attachServerToDevApp = require('scripts/attach-server-to-dev-app');
const build = require('../../build');
const mockBuild = require('./build');

const app = createApp();

attachServerToDevApp({
  app,
  build: mockBuild,
});

attachClientToDevApp({
  app,
  build,
});

const port = 8080;
const start = () => {
  app.listen(port, (err) => {
    if (err) {
      throw err;
    }
    console.log(`Listening at localhost:${port}`);
  });
};

start();
