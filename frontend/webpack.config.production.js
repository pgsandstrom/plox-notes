const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: ['whatwg-fetch', 'babel-polyfill', './src/entry.jsx'],
  output: { path: path.join(__dirname, '/assets/'), filename: 'bundle_prod.js' },
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
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      { test: /\.woff$/, use: 'url-loader?limit=10000&minetype=application/font-woff' },
      { test: /\.ttf$/, use: 'file-loader' },
      { test: /\.eot$/, use: 'file-loader' },
      { test: /\.svg$/, use: 'file-loader' },
      { test: /\.png$/, use: 'url-loader?mimetype=image/png' },
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
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
