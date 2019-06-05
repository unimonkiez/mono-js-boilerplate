const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const TsDeclarationWebpackPlugin = require('ts-declaration-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const defaultExtensions = ['.js', '.jsx', '.ts', '.tsx'];

const getWebpackConfig = ({
  entry,
  outputDir,
  isClient = true,
  isWebpackDevServer = false,
  isProd = true,
  bail = false,
  rootPath = process.cwd(),
  version = 'VERSION',
} = {}) => {
  const entryPrefix = `app${isProd ? '.min' : ''}`;
  const entries = typeof entry === 'string' ? { [entryPrefix]: entry } : entry;

  const deviceExtensions = defaultExtensions.map(extension => `.web${extension}`);
  const baseExtensions = []
    .concat(deviceExtensions)
    .concat(defaultExtensions);
  const buildExtensions = baseExtensions.map(extension => `.${isProd ? 'prod' : 'dev'}${extension}`);
  const extensions = []
    .concat(buildExtensions)
    .concat(baseExtensions);

  const babelBase = {
    loader: 'babel-loader',
    options: {
      presets: [
        ['@babel/preset-env', isClient ? {
          targets: {
            browsers: [
              'last 2 Chrome versions',
              'last 2 Firefox versions',
              'last 2 iOS versions',
              'last 2 ChromeAndroid versions',
            ],
          },
        } : {
          targets: {
            node: 'current',
          },
        }],
      ],
      plugins: [
        '@babel/plugin-transform-runtime',
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
      ],
    },
  };

  const webpackEntries = Object.keys(entries).reduce((obj, entryKey) => Object.assign(
    {},
    obj,
    {
      [entryKey]: []
        .concat(isWebpackDevServer ? ['webpack-hot-middleware/client'] : [])
        .concat(entries[entryKey]),
    },
  ), {});

  const moduleNameByRelativePath = Object.keys(entries)
    .map(entryKey => entries[entryKey])
    .reduce((obj, entryPath) => Object.assign({}, obj, {
      [path.relative(rootPath, entryPath).split(path.sep).join('/').replace(path.extname(entryPath), '')]: path.basename(entryPath, path.extname(entryPath)),
    }), {});

  return ({
    bail,
    mode: isProd ? 'production' : 'development',
    devtool: 'source-map',
    target: isClient ? undefined : 'node',
    node: isClient ? undefined : {
      __dirname: false,
      __filename: false,
    },
    entry: webpackEntries,
    output: {
      path: outputDir,
      filename: '[name].js',
      libraryTarget: 'umd',
    },
    plugins: [
      new VueLoaderPlugin(),
      // new TsDeclarationWebpackPlugin(),
      new webpack.DefinePlugin(Object.assign({
        __PROD__: isClient ? JSON.stringify(isProd) : 'process.env.NODE_ENV',
        __DEV__: isClient ? JSON.stringify(!isProd) : '!process.env.NODE_ENV',
        __DEVSERVER__: JSON.stringify(isWebpackDevServer),
        __DEVTOOLS__: JSON.stringify(isWebpackDevServer),
        __VERSION__: JSON.stringify(version),
      }, isClient ? {
        'process.env': {
          NODE_ENV: JSON.stringify(isProd ? 'production' : 'development'),
        },
      } : {})),
    ]
      .concat(isClient ? [
        new HtmlWebpackPlugin({
          minify: {},
          template: path.join(rootPath, 'src', 'web', 'index.html'),
          inject: 'body',
        }),
      ] : [])
      .concat(isWebpackDevServer ? [
        new webpack.HotModuleReplacementPlugin(),
      ] : []),
    optimization: {
      minimize: isProd,
    },
    module: {
      rules: []
        .concat([
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [babelBase],
          },
          {
            test: /\.jsx$/,
            exclude: /node_modules/,
            use: [
              Object.assign(
                {},
                babelBase,
                {
                  options: Object.assign(
                    {},
                    babelBase.options,
                    {
                      presets: []
                        .concat(babelBase.options.presets)
                        .concat('@babel/preset-react'),
                      plugins: babelBase.options.plugins
                        .concat(isWebpackDevServer ? ['react-hot-loader/babel'] : []),
                    },
                  ),
                },
              ),
            ],
          },
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: [
              Object.assign(
                {},
                babelBase,
                {
                  options: Object.assign(
                    {},
                    babelBase.options,
                    {
                      presets: []
                        .concat(babelBase.options.presets)
                        .concat('@babel/preset-typescript'),
                    },
                  ),
                },
              ),
            ],
          },
          {
            test: /\.tsx$/,
            exclude: /node_modules/,
            use: [
              Object.assign(
                {},
                babelBase,
                {
                  options: Object.assign(
                    {},
                    babelBase.options,
                    {
                      presets: []
                        .concat(babelBase.options.presets)
                        .concat([
                          '@babel/preset-react',
                          '@babel/preset-typescript',
                        ]),
                      plugins: babelBase.options.plugins
                        .concat(isWebpackDevServer ? ['react-hot-loader/babel'] : []),
                    },
                  ),
                },
              ),
            ],
          },
          {
            test: /\.vue$/,
            use: [
              {
                loader: 'vue-loader',
              },
            ],
          },
          {
            test: /\.css$/,
            use: [
              {
                loader: 'vue-style-loader',
              },
              {
                loader: 'css-loader',
              },
            ],
          },
          {
            test: /\.html$/,
            use: [
              {
                loader: 'html-loader',
                options: {
                  attrs: [
                    'img:src',
                    'link:href',
                  ],
                },
              },
            ],
          },
          {
            test: /\.ttf$/,
            use: [
              {
                loader: 'ttf-loader',
                options: {
                  name: './font/[hash].[ext]',
                },
              },
            ],
          },
          {
            test: /\.svg$/,
            use: [
              {
                loader: path.resolve(__dirname, 'loader', 'svg'),
              },
              {
                loader: 'raw-loader',
              },
            ],
          },
          {
            test: /\.pem$/,
            use: [
              {
                loader: 'raw-loader',
              },
            ],
          },
          {
            test: /\.mp3$/,
            use: [
              {
                loader: path.resolve(__dirname, 'loader', 'sound'),
              },
              {
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: './asset/[hash].[ext]',
                },
              },
            ],
          },
          {
            test: /\.(gif|png|jpg)$/,
            issuer: /\.html$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: './asset/[hash].[ext]',
                },
              },
            ],
          },
          {
            test: /\.(gif|png|jpg)$/,
            issuer: file => (!/\.html$/.test(file)),
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 10000,
                  name: './asset/[hash].[ext]',
                },
              },
            ],
          },
        ]),
    },
    resolve: {
      extensions,
      modules: [
        rootPath,
        path.resolve(__dirname, 'node_modules'), // package's node_modules
        path.resolve(__dirname, '..', '..', 'node_modules'), // root's node_modules
      ],
    },
    externals: []
      .concat(isClient ? [] : [nodeExternals({ modulesDir: path.join(__dirname, '..', '..', 'node_modules') })])
      .concat((context, request, callback) => {
        if (!path.isAbsolute(request)) {
          const relativeRequest = path.join(path.relative(rootPath, context), request)
            .replace('./', '')
            .replace(/\..+$/, '');

          const exportedModule = moduleNameByRelativePath[relativeRequest];
          if (exportedModule) {
            return callback(null, `commonjs ./${exportedModule}`);
          }
        }

        callback();
        return undefined;
      }),
  });
};


module.exports = getWebpackConfig;
