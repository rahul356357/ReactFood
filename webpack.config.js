/* eslint-disable max-len */
const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const DashboardPlugin = require('webpack-dashboard/plugin');

const __APP_ENV__ = process.env.APP_ENV;
const __APP_PUBLIC_PATH__ = process.env.APP_PUBLIC_PATH;
const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  cache: !isProd,
  mode: 'development',
  entry: {
    main: './src/index.js',
    vendor: ['./src/vendor/modules.js'],
  },

  output: {
    path: path.resolve('./build'),
    publicPath: __APP_PUBLIC_PATH__,
    filename: isProd ? 'js/[name].[chunkhash:8].js' : 'js/[name].js',
    chunkFilename: isProd ? 'js/[name].[chunkhash:8].js' : 'js/[name].js',
  },

  module: {
    rules: isProd ? [
      { test: /\.js$/, exclude: /node_modules/, use: ['babel-loader'] },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.(gif|png|jpe?g|svg|ico)$/i, use: [{ loader: 'file-loader', options: { name: 'images/[name].[hash:8].[ext]' } }] },
      { test: /\.(woff(2)?|ttf|otf|eot)(\?[a-z0-9=&.]+)?$/, use: [{ loader: 'url-loader', options: { limit: 1000, name: 'fonts/[name].[hash:8].[ext]' } }] },
    ] : [
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.js$/, exclude: /node_modules/, use: [{ loader: 'babel-loader', options: { cacheDirectory: true } }] },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(gif|png|jpe?g|svg|ico)$/i, use: [{ loader: 'file-loader', options: { name: 'images/[name].[ext]' } }] },
      { test: /\.(woff(2)?|ttf|otf|eot)(\?[a-z0-9=&.]+)?$/, use: [{ loader: 'url-loader', options: { limit: 1000, name: 'fonts/[name].[ext]' } }] },
    ],
  },

  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new CleanWebpackPlugin(['./build']),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isProd ? '"production"' : '"development"',
      __APP_ENV__: JSON.stringify(__APP_ENV__),
      __LOCAL__: __APP_ENV__ === 'local',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
    ...(isProd ? [
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false,
      }),
      new webpack.HashedModuleIdsPlugin(),
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        compress: {
          screw_ie8: true,
          warnings: false,
        },
        mangle: {
          screw_ie8: true,
        },
        output: {
          comments: false,
          screw_ie8: true,
        },
      }),
      new SWPrecacheWebpackPlugin({
        cacheId: 'pms',
        filename: 'serviceWorker.js',
        staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
        dontCacheBustUrlsMatching: /./,
        minify: true,
      }),
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        openAnalyzer: false,
        reportFilename: 'bundle-analysis.html',
      }),
    ] : [
      new webpack.NamedModulesPlugin(),
      new DashboardPlugin(),
    ]),
  ],

  devtool: isProd ? 'hidden-source-map' : 'inline-source-map',

  devServer: {
    contentBase: path.resolve('./build'),
    headers: { 'Access-Control-Allow-Origin': '*' },
    overlay: true,
    disableHostCheck: true,
    proxy: {
      '/': 'http://localhost:3000/',
    },
    quiet: true,
  },
};
