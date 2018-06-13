const path = require('path')

module.exports = {
  contentBase: path.resolve('./app'),
  historyApiFallback: false,
  port: 3000,
  host: '0.0.0.0',
  hot: false,
  stats: {
    colors: true,
    hash: false,
    version: false,
    timings: false,
    assets: false,
    chunks: false,
    modules: false,
    reasons: false,
    children: false,
    source: false,
    errors: true,
    errorDetails: false,
    warnings: false,
    publicPath: false
  }
}
