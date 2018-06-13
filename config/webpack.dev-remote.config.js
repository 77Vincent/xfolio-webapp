const webpack = require('webpack')
const merge = require('webpack-merge')

const devServer = require('./webpack.base-dev.config')
const webpackConfigBase = require('./webpack.base.config')

const target = 'https://www.xfolio.cn'

Object.assign(devServer, {
  proxy: {
    '/api': { target, changeOrigin: true },
    '/doc': { target, changeOrigin: true },
    '/resources': { target, changeOrigin: true }
  }
})

module.exports = merge(webpackConfigBase, {
  plugins: [
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('dev-remote'),
      IS_DEVELOPMENT: true,
    })
  ],
  devServer
})
