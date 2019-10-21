const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const path = require('path')

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	watch: true,
	plugins: [ new CleanWebpackPlugin() ],
	devServer: {
		contentBase: './dev_build',
	},
	output: {
		path: path.resolve(__dirname, 'dev_build'),
		filename: 'index.js',
	},
})
