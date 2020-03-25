const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATH_DIST = resolve(__dirname, '..', '..', 'dist');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-flow'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.svg$/,
        use: 'svg-sprite-loader',
        include: [
          resolve(__dirname, '..', '..', 'src', 'assets'),
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            limit: 5120,
            name: 'images/[name]-[hash].[ext]',
          },
        }],
        exclude: [
          resolve(__dirname, 'src', 'assets', 'images'),
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'fonts/',
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', 'svg']
  },
  output: {
    path: PATH_DIST,
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    port: 9001,
    contentBase: './public',
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      // favicon: resolve(__dirname, '..', '..', 'public', 'fav.png'),
      template: resolve(__dirname, '..', '..', 'public', 'index.html'),
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true,
        caseSensitive: true,
        collapseWhitespace: true,
      },
    })
  ]
};
