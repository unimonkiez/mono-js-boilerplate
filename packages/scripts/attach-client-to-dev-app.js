const path = require('path');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const getWebpackConfig = require('./get-webpack-config');

module.exports = ({
  app,
  build,
}) => {
  const outputDir = __dirname;
  const webpackConfig = getWebpackConfig(Object.assign(
    {},
    build.params,
    {
      isClient: true,
      isWebpackDevServer: true,
      isProd: false,
      bail: false,
      outputDir,
    },
  ));

  const webpackCompiler = webpack(webpackConfig);
  const webpackDevMiddlewareInstance = webpackMiddleware(
    webpackCompiler,
    {
      publicPath: '',
      noInfo: false,
      quiet: false,
    },
  );
  const webpackHotMiddlewareInstance = webpackHotMiddleware(webpackCompiler, {
    log: console.log,
    heartbeat: 3 * 1000,
  });

  app.use(webpackDevMiddlewareInstance);
  app.use(webpackHotMiddlewareInstance);
  app.use((req, res, next) => {
    if ((req.method === 'GET' || req.method === 'HEAD') && req.accepts('html')) {
      const index = webpackDevMiddlewareInstance.fileSystem.readFileSync(path.join(outputDir, 'index.html'));
      res.end(index);
    } else {
      next();
    }
  });
  // webpackDevMiddlewareInstance.waitUntilValid(cb);
};
