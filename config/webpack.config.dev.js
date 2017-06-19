const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const autoprefixer = require('autoprefixer')

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8087',
    'webpack/hot/only-dev-server',
    resolve(__dirname, '../src/index.jsx')
  ],
  output: {
    filename: '[name].js'
  },
  resolve: {
    extensions: [ '.js', '.jsx', '.styl' ]
  },
  performance: false,
  devtool: 'inline-source-map',
  devServer: {
    hot: true,
    host: 'localhost',
    inline: true,
    compress: true,
    port: 8087,
    contentBase: resolve(__dirname, '../src')
  },
  module: {
    rules: [
      {
        test: /.jsx$/,
        use: [ 'babel-loader' ]
      },
      {
        test: /.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: true
            }
          }
        ]
      },
      {
        test: /.styl$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins: [ autoprefixer ]
            }
          },
          'stylus-loader'
        ]
      },
      {
        test: /.(jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[sha512:hash:base64:8].[ext]'
            }
          }
        ]
      },
      {
        test: /.png$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[sha512:hash:base64:8].[ext]',
              limit: 2000
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../src/templates/index.pug')
    })
  ]
}
