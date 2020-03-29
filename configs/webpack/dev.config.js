const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
  plugins: [
      new webpack.DefinePlugin({
          "API_KEY": JSON.stringify('617b87e7a1575ed6b0ef5ef49c2e995ed1768e9ea0921078ce9b4d30d6da4fe4'),
          "SOCKET_BASE_URL": JSON.stringify('wss://streamer.cryptocompare.com/v2'),
          "API_BASE_URL": JSON.stringify('https://min-api.cryptocompare.com'),
      }),
  ],
});
