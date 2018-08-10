const path = require('path');

module.exports = ({
  app,
  build,
}) => {
  let serverModule;

  const outputDir = path.resolve(__dirname, 'dist');
  const appPath = path.resolve(outputDir, 'app');


  build.watch(
    {
      cb: async (err) => {
        if (!err) {
          // Will import the app after it is compiled by webpack
          // eslint-disable-next-line global-require,import/no-unresolved,import/no-dynamic-require
          const nextServerModule = require(appPath);
          delete require.cache[require.resolve(appPath)];

          if (serverModule) {
            await serverModule.disconnect();
          }
          await nextServerModule.connect();

          serverModule = nextServerModule;
        } else {
          serverModule = undefined;
        }
      },
    },
    {
      outputDir,
      isProd: false,
    },
  );

  app.use((req, res, next) => {
    if (serverModule) {
      serverModule.app(req, res, next);
    } else {
      // eslint-disable-next-line no-console
      console.log('Server not connected yet! (check build)');
    }
  });
};
