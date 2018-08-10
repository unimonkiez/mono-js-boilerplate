const attachServerToDevApp = require('scripts/attach-server-to-dev-app');
const build = require('./build');
const createApp = require('../create-app');

const app = createApp();

attachServerToDevApp({
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
