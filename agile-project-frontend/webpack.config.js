// module.exports = {
// 	entry: './src/app.js',
// 	output: {
// 		filename: './dist/bundle.js'
// 	}
// }


// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
	// entry: ['babel-polyfill', './src/js/app.js'],
	// output: {
	// 	path: path.resolve(__dirname, 'dist'),
	// 	filename: './dist/bundle.js'
	// },
	// devServer: {
	// 	contentBase: './dist'
	// },
	// plugins: [
	// 	new HtmlWebpackPlugin({
	// 		filename: 'index.html',
	// 		template: './index.html'
	// 	})
	// ],
	// module: {
	// 	rules: [
	// 		{
	// 			test: /\.js$/,
	// 			exclude: /node_modules/,
	// 			use: {
	// 				loader: 'babel-loader'
	// 			}
	// 		}
	// 	]
	// }
// };

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: ['babel-polyfill', './src/js/index.js'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'js/bundle.js'
	},
	devServer: {
		contentBase: './dist'
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: './src/index.html'
		})
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	}
};
