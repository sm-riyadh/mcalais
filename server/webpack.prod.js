const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const { resolve } = require('path')

module.exports = merge(common, {
  mode: 'production',
  plugins: [new CleanWebpackPlugin()],
  output: {
    path: resolve(__dirname, 'build'),
    filename: 'index.js',
  },
})
