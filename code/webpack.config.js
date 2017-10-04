const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const serverConfig = {
  entry: ['./src/index.js'],
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['airbnb'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: 'null-loader',
      },
      {
        test: /\.css$/,
        use: 'null-loader',
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

const clientConfig = {
  devtool: 'source-map',
  entry: ['whatwg-fetch', 'babel-polyfill', './src/client/'],
  output: {
    publicPath: '/static/',
    path: path.resolve(__dirname, 'dist/public/static'),
    filename: 'client.bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['airbnb'],
          },
        },
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?minetype=application/font-woff',
        options: {
          limit: 10000,
        },
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: 'file-loader',
      },
      { test: /\.(jpg|png)$/,
        loader: 'url-loader',
        options: {
          limit: 25000,
        },
      },
    ],
  },
  plugins: [
    // Make react understand we are in production mode
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    // this makes webpacks -p flag redundant. Optimizes and minimizes
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
      },
    }),
    new ExtractTextPlugin('styles.css'),
    new CopyWebpackPlugin([
      { from: '../static/*', to: '.' },
    ]),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

module.exports = [serverConfig, clientConfig];
