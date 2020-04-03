const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
  plugins: [
      new webpack.DefinePlugin({
          "API_KEY": JSON.stringify('f6368a7aaf178dc5d7839c11a94039c2af9f973e31e5127cbef353e0858d6281'),
          "SOCKET_BASE_URL": JSON.stringify('wss://streamer.cryptocompare.com/v2'),
          "API_BASE_URL": JSON.stringify('https://min-api.cryptocompare.com'),
      }),
  ],
});
