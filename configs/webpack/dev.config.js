const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');

module.exports = merge(baseConfig, {
  plugins: [
      new webpack.DefinePlugin({
          "API_BASE_URL": JSON.stringify('http://dev.extract.mskcc.org:8000/'),
          "SOCKET_BASE_URL": JSON.stringify('ws://dev.extract.mskcc.org:8000/socket'),
      }),
  ],
});
