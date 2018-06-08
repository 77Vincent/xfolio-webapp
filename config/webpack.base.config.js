const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const lessToJs = require('less-vars-to-js')

const resolve = path.resolve
const themeVariables = lessToJs(fs.readFileSync(resolve('./app/theme.less'), 'utf8'))

const webpackConfigBase = {
  entry: {
    client: resolve('./app/index.jsx'),
  },
  output: {
    path: resolve('./build'),
    filename: 'build.[hash:4].js',
    chunkFilename: 'chunks/[name].[hash:4].js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
    },
  },
  resolveLoader: {
    moduleExtensions: ['-loader'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        options: {
          plugins: [
            ['import', {libraryName: 'antd', style: true}],
          ],
        },
      },
      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style',
          use: [
            {loader: 'css', options: {sourceMap: false}},
          ],
        }),
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style',
          use: [
            {
              loader: 'css',
              options: {sourceMap: false},
            },
            {
              loader: 'less',
              options: {
                javascriptEnabled: true,
                sourceMap: false,
                modifyVars: themeVariables,
              },
            },
          ],
        }),
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        options: {
          limit: 8192,
          name: 'img/[name].[hash:4].[ext]',
        },
      },
      {
        test: /\.(woff|eot|ttf|svg|gif)$/,
        loader: 'url',
        options: {
          limit: 8192,
          name: 'font/[name].[hash:4].[ext]',
        },
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      Log: resolve(__dirname, '../app/utils/Log.js'),
    }),
    // 在打包前先移除build文件夹
    new CleanWebpackPlugin(['build'], {
      root: resolve(),
      verbose: true,
      dry: false,
    }),
    // 提取css
    new ExtractTextPlugin('build.[hash:4].css'),
    // 将打包后的资源注入到html文件内    
    new HtmlWebpackPlugin({
      template: resolve('./app/index.html'),
    }),
  ],
}

module.exports = webpackConfigBase
