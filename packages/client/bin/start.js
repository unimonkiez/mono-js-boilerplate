const createApp = require('server/create-app');
const serverBuild = require('server/bin/build');
const attachClientToDevApp = require('scripts/attach-client-to-dev-app');
const attachServerToDevApp = require('scripts/attach-server-to-dev-app');
const clientBuild = require('./build');

const app = createApp();

attachServerToDevApp({
  app,
  build: serverBuild,
});

attachClientToDevApp({
  app,
  build: clientBuild,
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
