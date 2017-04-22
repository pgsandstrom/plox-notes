const webpack = require('webpack'); // eslint-disable-line import/no-extraneous-dependencies
const path = require('path');

module.exports = {
  // devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:8080', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    'react-hot-loader/patch',
    'whatwg-fetch', 'babel-polyfill', './src/'],
  output: { path: path.join(__dirname, '/assets/'), publicPath: '/assets/', filename: 'bundle_dev.js' },
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
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
        ],
      },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'url-loader?limit=10000&minetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, use: 'file-loader' },
      { test: /\.eot$/, use: 'file-loader' },
      { test: /\.svg$/, use: 'file-loader' },
      { test: /\.(jpg|png)$/, use: 'url-loader?limit=25000' },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        USE_FAKE_DATA: process.argv.includes('--env.fake-data'),
      },
    }),
  ],
  performance: {
    hints: false,
  },
  devServer: {
    proxy: {
      '/api/v1/**/*': {
        changeOrigin: true,
        secure: false,
        target: 'http://localhost:8088',
      },
    },
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true,
    inline: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
