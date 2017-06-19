const { resolve } = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: {
    main: resolve(__dirname, '../src/index.jsx'),
    vendor: [ 'react', 'react-dom' ]
  },
  output: {
    path: resolve(__dirname, '../build'),
    filename: '[chunkhash].js',
  },
  resolve: {
    extensions: [ '.js', '.jsx', '.styl' ]
  },
  module: {
    rules: [
      {
        test: /.jsx$/,
        use: [ 'babel-loader' ]
      },
      {
        test: /.pug$/,
        use: [ 'pug-loader' ]
      },
      {
        test: /.styl$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: [ autoprefixer ]
              }
            },
            'stylus-loader'
          ]
        })
      },
      {
        test: /.(jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[sha512:hash:base64:8].[ext]',
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: [ 'vendor', 'manifest' ]
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false
    }),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../src/templates/index.pug'),
      minify: {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        removeComments: true,
        useShortDoctype: true
      }
    }),
    new CopyWebpackPlugin([
      {
        from: resolve(__dirname, '../src/react.ico')
      }
    ]),
    new ExtractTextPlugin({
      filename: '[contenthash].css'
    })
  ]
}
