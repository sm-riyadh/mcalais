import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import merge from 'webpack-merge'
import common from './webpack.common.js'
import { resolve } from 'path'

export default merge(common, {
	mode: 'production',
	plugins: [ new CleanWebpackPlugin() ],
	output: {
		path: resolve(__dirname, 'build'),
		filename: 'index.js',
	},
})
