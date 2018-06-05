const webpack = require('webpack')
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const webpackConfigProd = {
  plugins: [
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      IS_DEVELOPMENT: false,
    }),
    // 提取css
    // 根据入口文件，提取重复引用的公共代码类库，打包到单独文件中
    // new webpack.optimize.OccurenceOrderPlugin(),
    /* 压缩优化代码开始*/
    new UglifyJsPlugin({}),
  ],
}

module.exports = merge(webpackConfigBase, webpackConfigProd)
