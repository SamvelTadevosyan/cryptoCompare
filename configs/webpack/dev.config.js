const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');
console.log('Log ::: JSON.stringify(\'8d00294f60fa96ccecf972183e2a9646522c6f5c4f4a995fea6a9b7fff7c7629\') ::: ', JSON.stringify('8d00294f60fa96ccecf972183e2a9646522c6f5c4f4a995fea6a9b7fff7c7629'));
module.exports = merge(baseConfig, {
  plugins: [
      new webpack.DefinePlugin({
          "API_KEY": JSON.stringify('8d00294f60fa96ccecf972183e2a9646522c6f5c4f4a995fea6a9b7fff7c7629'),
          "SOCKET_BASE_URL": JSON.stringify('wss://streamer.cryptocompare.com/v2'),
          "API_BASE_URL": JSON.stringify('https://min-api.cryptocompare.com'),
      }),
  ],
});
