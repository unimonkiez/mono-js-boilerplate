const webpack = require('webpack');
const getWebpackConfig = require('./get-webpack-config');

module.exports = class Build {
  constructor(params) {
    this.params = params;
  }

  async run(params) {
    return this._runWeback(
      {
        isWatching: false,
      },
      params,
    );
  }

  watch(watchConfig, params) {
    return this._runWeback(
      Object.assign(
        {
          isWatching: true,
        },
        watchConfig,
      ),
      params,
    );
  }

  async _runWeback(
    {
      isWatching = false,
      isLog = true,
      cb: watchCb = (() => {}),
    },
    params,
  ) {
    const {
      rootPath,
      isClient,
      entry,
      outputDir,
      version,
      isProd,
    } = Object.assign({}, this.params, params);

    await new Promise((res, rej) => {
      const webpackConfig = getWebpackConfig({
        isClient,
        isProd,
        bail: !isWatching,
        rootPath,
        version,
        entry,
        outputDir,
      });

      const cb = (err, stats) => {
        if (err) {
          if (isLog) {
            // eslint-disable-next-line no-console
            console.warn('[webpack log]', err);
          }
          if (!isWatching) {
            process.exit(1);
          }
          rej(err);
        } else {
          if (isLog) {
            // eslint-disable-next-line no-console
            console.log('[webpack log]', stats.toString());
          }
          res();
        }

        if (isWatching) {
          watchCb(err);
        }
      };

      if (isWatching) {
        webpack(webpackConfig).watch({}, cb);
      } else {
        webpack(webpackConfig, cb);
      }
    });
  }
};
